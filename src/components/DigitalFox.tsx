"use client";

import React, { useState, useEffect, Suspense, Component, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { FoxIdleAnimation } from "./FoxIdleAnimation";

const FOX_MODEL_PATH = "/models/fox.glb";

// Preload the GLB model safely in browser environment
if (typeof window !== "undefined") {
  useGLTF.preload(FOX_MODEL_PATH);
}

// WebGL Error Boundary to catch context loss or rendering errors gracefully
class WebGLErrorBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback?: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("DigitalFox WebGL rendering error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center pointer-events-none select-none">
            <span className="text-xs font-mono text-red-400 font-semibold mb-1">
              Unable to load Digital Spirit.
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              WebGL context unavailable
            </span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// Graceful loading fallback for companion mode
function FoxCompanionLoadingFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center pointer-events-none select-none">
      <div className="w-5 h-5 rounded-full border-2 border-cyan-400/80 border-t-transparent animate-spin mb-2" />
      <span className="text-[10px] font-mono text-cyan-300 tracking-wider uppercase">
        Loading Digital Spirit...
      </span>
    </div>
  );
}

// Full loading fallback for inspection / test mode
function FoxFullLoadingFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center pointer-events-none select-none">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-3" />
      <span className="text-sm font-mono text-cyan-300 tracking-wider">
        Loading Digital Spirit...
      </span>
      <span className="text-xs font-mono text-slate-500 mt-1">
        83 MB high-poly model
      </span>
    </div>
  );
}

export interface FoxModelProps {
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  idleAnimation?: boolean;
}

/**
 * Inner 3D Fox Model component using React Three Fiber, Drei useGLTF,
 * and procedural FoxIdleAnimation controller.
 */
export function FoxModel({
  scale = 1.0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  idleAnimation = true,
}: FoxModelProps) {
  const { scene } = useGLTF(FOX_MODEL_PATH);

  // Preserve and configure original materials/textures and shadows
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (process.env.NODE_ENV !== "production") {
      console.log("[DigitalFox] Scene graph nodes:", {
        nodes: scene.children.map((c) => c.name),
        meshes: scene.children.filter((c) => (c as THREE.Mesh).isMesh).map((c) => c.name),
        animations: (scene as any).animations?.length || 0,
        structure: "Single unified mesh (node_0) without bone hierarchy or morph targets.",
      });
    }
  }, [scene]);

  const resolvedScale: [number, number, number] =
    typeof scale === "number" ? [scale, scale, scale] : scale;

  return (
    <group position={position} rotation={rotation} scale={resolvedScale}>
      {/* Center component normalizes model bounds to origin */}
      <Center>
        <FoxIdleAnimation enabled={idleAnimation}>
          <primitive object={scene} />
        </FoxIdleAnimation>
      </Center>
    </group>
  );
}

export interface DigitalFoxProps {
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  className?: string;
  companion?: boolean;
  idleAnimation?: boolean;
}

/**
 * Standalone DigitalFox 3D Component with built-in procedural idle animation.
 * By default (companion=true), floats persistently at the bottom-right corner of the viewport.
 * When companion=false, fills its parent container (e.g. for /fox-test inspection).
 */
export const DigitalFox: React.FC<DigitalFoxProps> = ({
  scale = 1.0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  className = "",
  companion = true,
  idleAnimation = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fallback = companion ? <FoxCompanionLoadingFallback /> : <FoxFullLoadingFallback />;

  // Avoid SSR / hydration mismatch for WebGL canvas
  if (!isMounted) {
    if (!companion) return fallback;
    return (
      <aside
        aria-label="Digital Fox Companion"
        className={`fixed right-6 bottom-6 z-30 pointer-events-none select-none
                   w-[95px] h-[115px] sm:w-[130px] sm:h-[155px] lg:w-[170px] lg:h-[200px]
                   hidden min-[380px]:block overflow-visible ${className}`}
      >
        {fallback}
      </aside>
    );
  }

  const canvasContent = (
    <WebGLErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, 0.05, 2.3], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{
          pointerEvents: "none",
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Calibrated neutral PBR lighting for original textures and metallic/specular maps */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-5, 4, 3]} intensity={1.4} />
        <directionalLight position={[0, 4, -5]} intensity={1.2} />
        <directionalLight position={[0, -3, 3]} intensity={0.5} />

        <Suspense fallback={null}>
          <FoxModel
            scale={scale}
            position={position}
            rotation={rotation}
            idleAnimation={idleAnimation}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );

  if (companion) {
    return (
      <aside
        aria-label="Digital Fox Companion"
        className={`fixed right-6 bottom-6 z-30 pointer-events-none select-none
                   w-[95px] h-[115px] sm:w-[130px] sm:h-[155px] lg:w-[170px] lg:h-[200px]
                   hidden min-[380px]:block overflow-visible ${className}`}
      >
        {/* Subtle ambient soft glow beneath the fox */}
        <div className="absolute inset-x-2 bottom-2 h-14 -z-10 rounded-full bg-cyan-500/[0.04] blur-xl pointer-events-none" />
        {canvasContent}
      </aside>
    );
  }

  return (
    <div className={`relative w-full h-full pointer-events-none select-none ${className}`}>
      {canvasContent}
    </div>
  );
};

export default DigitalFox;
