"use client";

import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// Register custom Three.js geometry & material for the lanyard ribbon
extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = "/assets/kartu.glb";
const BAND_TEXTURE_PATH = "/assets/bandd.png?v=3";
const BAND_TEXTURE_RED_PATH = "/assets/bandd_red.png?v=3";
const CARD_TEXTURE_PATH = "/assets/card_texture.png?v=3";
const CARD_TEXTURE_RED_PATH = "/assets/card_texture_red.png?v=3";

// Preload assets
useGLTF.preload(GLTF_PATH);
useTexture.preload(BAND_TEXTURE_PATH);
useTexture.preload(BAND_TEXTURE_RED_PATH);
useTexture.preload(CARD_TEXTURE_PATH);
useTexture.preload(CARD_TEXTURE_RED_PATH);

interface BandProps {
  isFlipped?: boolean;
  onFlipTrigger?: (callback: () => void) => void;
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  colorScheme?: "cyan" | "red";
}

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  isMobile = false,
  isFlipped = false,
  onFlipTrigger,
  colorScheme = "cyan",
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = useRef(new THREE.Vector3());
  const ang = useRef(new THREE.Vector3());
  const quat = useRef(new THREE.Quaternion());
  const euler = useRef(new THREE.Euler());
  const dir = useRef(new THREE.Vector3());

  const segmentProps: any = {
    type: "dynamic",
    canSleep: false,
    colliders: false,
    angularDamping: 3.5,
    linearDamping: 3.5,
  };

  const { nodes, materials }: any = useGLTF(GLTF_PATH);
  const bandTextureCyan = useTexture(BAND_TEXTURE_PATH);
  const bandTextureRed = useTexture(BAND_TEXTURE_RED_PATH);
  const cardTextureCyan = useTexture(CARD_TEXTURE_PATH);
  const cardTextureRed = useTexture(CARD_TEXTURE_RED_PATH);

  // Configure texture parameters
  [bandTextureCyan, bandTextureRed].forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  });

  [cardTextureCyan, cardTextureRed].forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.flipY = false;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  });

  const bandTexture = colorScheme === "red" ? bandTextureRed : bandTextureCyan;
  const cardTexture = colorScheme === "red" ? cardTextureRed : cardTextureCyan;

  const { width, height } = useThree((state) => state.size);

  // Procedurally remap UVs for front face and back face independently
  const cardGeometry = useMemo(() => {
    const geom = nodes.card.geometry.clone();
    geom.computeBoundingBox();
    geom.computeVertexNormals();
    const bb = geom.boundingBox;
    const pos = geom.attributes.position;
    const norm = geom.attributes.normal;
    const uvs = new Float32Array(2 * pos.count);

    for (let i = 0; i < pos.count; i++) {
      const normX = (pos.getX(i) - bb.min.x) / (bb.max.x - bb.min.x);
      const normY = (pos.getY(i) - bb.min.y) / (bb.max.y - bb.min.y);
      const nz = norm.getZ(i);

      if (nz < -0.1) {
        // BACK FACE OF CARD: Map to right half of texture [0.5, 1.0]
        // Invert X so back text, barcode, and QR code read normally from left to right
        uvs[2 * i] = 0.5 + (1 - normX) * 0.5;
        uvs[2 * i + 1] = 1 - normY;
      } else {
        // FRONT FACE OF CARD: Map to left half of texture [0.0, 0.5]
        uvs[2 * i] = normX * 0.5;
        uvs[2 * i + 1] = 1 - normY;
      }
    }

    geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return geom;
  }, [nodes.card.geometry]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  // Rope joints: 1 unit length for natural suspension
  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1]);
  // Attached to clip of card
  useSphericalJoint(j3 as any, card as any, [[0, 0, 0], [0, 1.45, 0]]);

  // Target angle: 0 for front, Math.PI (180 deg) for back face
  const targetAngleY = isFlipped ? Math.PI : 0;

  // React to isFlipped state change with a dynamic spin impulse
  useEffect(() => {
    if (card.current) {
      card.current.wakeUp();
      card.current.applyTorqueImpulse({ x: 0, y: isFlipped ? 18 : -18, z: 0 }, true);
    }
  }, [isFlipped]);

  // Physical torque spin trigger for flipping between front and back
  useEffect(() => {
    if (onFlipTrigger) {
      onFlipTrigger(() => {
        if (card.current) {
          card.current.wakeUp();
          card.current.applyTorqueImpulse({ x: 0, y: 18, z: 0 }, true);
        }
      });
    }
  }, [onFlipTrigger]);

  // Cursor feedback on hover & drag
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      // Unproject pointer across screen
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.current.copy(vec.current).sub(state.camera.position).normalize();
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      (card.current as any).setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref: any) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation() as any);
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation() as any);

      band.current.geometry.setPoints(curve.getPoints(32));

      ang.current.copy(card.current.angvel() as any);
      const q = card.current.rotation() as any;
      quat.current.set(q.x, q.y, q.z, q.w);
      euler.current.setFromQuaternion(quat.current, "YXZ");
      const currentYaw = euler.current.y;

      // Smooth restorative spring to target face (front = 0 vs back = PI)
      let diffY = currentYaw - targetAngleY;
      diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));

      (card.current as any).setAngvel(
        {
          x: ang.current.x,
          y: ang.current.y - diffY * 3.2,
          z: ang.current.z,
        },
        true
      );
    }
  });

  curve.curveType = "chordal";
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Anchor fixed at top: [isMobile ? 0 : 0.8, isMobile ? 4.3 : 4.0, 0] matching Davin's proportion */}
      <group position={[isMobile ? 0 : 0.8, isMobile ? 4.3 : 4.0, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          {/* Medium, balanced size collider matching Davin */}
          <CuboidCollider args={[0.85, 1.12, 0.01]} />
          <group
            scale={isMobile ? 2.75 : 2.2}
            position={[0, isMobile ? -1.35 : -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              const clickOffset = new THREE.Vector3()
                .copy(e.point)
                .sub(vec.current.copy(card.current!.translation() as any));
              setDragged(clickOffset);
            }}
          >
            {/* Front & Back remapped 3D Card Mesh with tuned PVC laminate material */}
            <mesh geometry={cardGeometry} scale={[1.125, 1, 1]}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={0.35}
                clearcoatRoughness={0.25}
                roughness={0.38}
                metalness={0.12}
              />
            </mesh>
            {/* Lanyard metal clip and clamp */}
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard Ribbon Mesh */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandTexture}
          repeat={isMobile ? [-3, 1] : [-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

interface Card3DLanyardProps {
  isFlipped?: boolean;
  onFlipTrigger?: (callback: () => void) => void;
  className?: string;
  colorScheme?: "cyan" | "red";
}

export default function Card3DLanyard({
  isFlipped = false,
  onFlipTrigger,
  className = "",
  colorScheme = "cyan",
}: Card3DLanyardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`relative w-full h-[640px] sm:h-[660px] lg:h-[700px] overflow-visible ${className}`}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 12.2 : 13], fov: isMobile ? 29 : 27 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ pointerEvents: "auto", background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={Math.PI * 0.9} />

        <Suspense fallback={null}>
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band
              key={`${isMobile ? "mobile" : "desktop"}-${colorScheme}`}
              isMobile={isMobile}
              isFlipped={isFlipped}
              onFlipTrigger={onFlipTrigger}
              colorScheme={colorScheme}
            />
          </Physics>

          {/* Environment Studio Lightformers matching Davin's exact setup */}
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={2.5}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={2.5}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={4}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
