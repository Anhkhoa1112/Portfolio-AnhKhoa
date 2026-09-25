"use client";

import React, { useState, useEffect, Suspense, Component, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { FoxIdleAnimation } from "./FoxIdleAnimation";
import {
  detectFoxPerformanceTier,
  FOX_PERFORMANCE_TIERS,
  type FoxPerformanceTier,
  type PerformanceTierConfig,
} from "./fox/FoxPerformanceManager";

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
  isHovered?: boolean;
  clickTrigger?: number;
  tierConfig?: PerformanceTierConfig;
}

/**
 * Inner 3D Fox Model component using React Three Fiber, Drei useGLTF,
 * and procedural FoxIdleAnimation controller.
 */
export function FoxModel({
  scale = 1.3,
  position = [0, 0, 0],
  rotation = [0, -0.65, 0],
  idleAnimation = true,
  isHovered = false,
  clickTrigger = 0,
  tierConfig,
}: FoxModelProps) {
  const { scene } = useGLTF(FOX_MODEL_PATH);

  // Preserve and configure original materials/textures and shadows
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Fine-tune material roughness floor to eliminate harsh plastic shine while keeping metallic luster
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat && mat.isMeshStandardMaterial) {
          mat.roughness = Math.max(mat.roughness ?? 0.4, 0.42);
          mat.needsUpdate = true;
        }
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
        <FoxIdleAnimation
          enabled={idleAnimation}
          isHovered={isHovered}
          clickTrigger={clickTrigger}
          tierConfig={tierConfig}
        >
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
  scale = 1.3,
  position = [0, 0, 0],
  rotation,
  className = "",
  companion = true,
  idleAnimation = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [tier, setTier] = useState<FoxPerformanceTier>("HIGH");

  const handleClick = () => {
    setClickCount((c) => c + 1);
  };

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const updateTier = () => {
        setTier(detectFoxPerformanceTier());
      };
      updateTier();
      window.addEventListener("resize", updateTier, { passive: true });
      return () => window.removeEventListener("resize", updateTier);
    }
  }, []);

  const tierConfig = FOX_PERFORMANCE_TIERS[tier];
  const defaultRotation: [number, number, number] = rotation ?? [0, -0.65, 0];
  const fallback = companion ? <FoxCompanionLoadingFallback /> : <FoxFullLoadingFallback />;

  // Avoid SSR / hydration mismatch for WebGL canvas
  if (!isMounted) {
    if (!companion) return fallback;
    return (
      <aside
        aria-label="Digital Fox Companion"
        className={`fixed right-3 bottom-3 sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-6 z-30 pointer-events-none select-none
                   w-[105px] h-[125px] min-[480px]:w-[125px] min-[480px]:h-[150px] sm:w-[220px] sm:h-[260px] lg:w-[300px] lg:h-[340px] xl:w-[320px] xl:h-[360px]
                   hidden min-[360px]:block overflow-visible ${className}`}
      >
        {fallback}
      </aside>
    );
  }

  const canvasContent = (
    <WebGLErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, -0.02, 1.76], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={tierConfig.dpr}
        style={{
          pointerEvents: "auto",
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Calibrated PBR lighting with natural hemisphere fill and crisp rim light */}
        <hemisphereLight args={["#cce7ff", "#181424", 0.9]} />
        <ambientLight intensity={0.6} />
        {/* Main key light */}
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
        {/* Soft fill light */}
        <directionalLight position={[-4, 3, 2]} intensity={0.9} color="#e0f2fe" />
        {/* Rim / kicker light behind fox for fur & 3-tail silhouette definition against dark backdrop */}
        <directionalLight position={[-3, 4, -5]} intensity={2.2} color="#a5f3fc" />
        {/* Front-under bounce */}
        <directionalLight position={[0, -2, 3]} intensity={0.4} color="#fef08a" />

        <Suspense fallback={null}>
          <FoxModel
            scale={scale}
            position={position}
            rotation={defaultRotation}
            idleAnimation={idleAnimation}
            isHovered={isHovered}
            clickTrigger={clickCount}
            tierConfig={tierConfig}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );

  if (companion) {
    return (
      <aside
        role="button"
        tabIndex={0}
        aria-label="Digital Fox Companion — Click to interact"
        onClick={handleClick}
        onTouchStart={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        className={`fixed right-3 bottom-3 sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-6 z-30 pointer-events-auto select-none
                   w-[105px] h-[125px] min-[480px]:w-[125px] min-[480px]:h-[150px] sm:w-[220px] sm:h-[260px] lg:w-[300px] lg:h-[340px] xl:w-[320px] xl:h-[360px]
                   hidden min-[360px]:block overflow-visible cursor-pointer transition-transform duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-2xl ${className}`}
      >
        {/* Subtle ambient soft glow beneath the fox */}
        <div className="absolute inset-x-6 bottom-4 h-20 -z-10 rounded-full bg-cyan-500/[0.07] blur-2xl pointer-events-none" />
        {canvasContent}
      </aside>
    );
  }

  return (
    <div
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative w-full h-full pointer-events-auto select-none ${className}`}
    >
      {canvasContent}
    </div>
  );
};

export default DigitalFox;
