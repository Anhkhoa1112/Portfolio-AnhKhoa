"use client";

import React, { useRef, useEffect, Component } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { RotateCw, Move } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { useColorScheme } from "@/src/context/ThemeContext";

// Fallback CSS Card in case WebGL is unavailable on older hardware
function CardFallback({
  isFlipped,
  onFlip,
  colorScheme = "cyan",
}: {
  isFlipped?: boolean;
  onFlip?: () => void;
  colorScheme?: "cyan" | "red";
}) {
  const { idCard } = portfolioData;
  const isRed = colorScheme === "red";

  return (
    <div
      onClick={onFlip}
      className={`relative w-full max-w-[380px] aspect-[1/1.45] mx-auto rounded-3xl bg-[#09122a] border ${
        isRed ? "border-red-500/40" : "border-cyan-500/40"
      } p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer select-none`}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span
          className={`text-xs font-mono font-bold uppercase ${
            isRed ? "text-red-400" : "text-cyan-400"
          }`}
        >
          {idCard.university}
        </span>
        <span
          className={`text-[10px] font-mono ${
            isRed ? "text-red-300" : "text-cyan-300"
          }`}
        >
          NFC ACTIVE
        </span>
      </div>
      <div
        className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden my-3 border-2 ${
          isRed ? "border-red-500/40" : "border-cyan-500/40"
        } bg-slate-900 shadow-xl`}
      >
        <Image
          src={isRed ? "/assets/card_texture_red.png" : "/assets/card_texture.png"}
          alt="Anh Khoa ID Card"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="text-center pt-2">
        <h3 className="text-base font-bold text-white uppercase tracking-wide">
          {idCard.name}
        </h3>
        <p className={`text-xs font-mono ${isRed ? "text-red-400" : "text-cyan-400"}`}>
          {idCard.title}
        </p>
      </div>
    </div>
  );
}

// Error boundary to catch any WebGL context failures gracefully
class WebGLErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn("WebGL 3D Card context failure, falling back to CSS Identity Card:", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Dynamically import the 3D Rapier Physics Canvas to prevent SSR issues
const Card3DLanyard = dynamic(() => import("./Card3DLanyard"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[560px] sm:h-[620px] lg:h-[700px] flex items-center justify-center">
      <div className="w-72 sm:w-80 aspect-[1/1.45] rounded-3xl bg-gradient-to-b from-[#0a1432]/90 to-[#060b1c]/95 border border-cyan-500/30 p-8 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl">
        <div className="w-10 h-10 rounded-full border-3 border-cyan-400 border-t-transparent animate-spin mb-4" />
        <span className="text-xs font-mono text-cyan-300 tracking-wider font-semibold">
          LOADING 3D DIGITAL IDENTITY...
        </span>
      </div>
    </div>
  ),
});

interface DeveloperCard3DProps {
  isFlipped?: boolean;
  onFlip?: () => void;
  className?: string;
}

export const DeveloperCard3D: React.FC<DeveloperCard3DProps> = ({
  isFlipped,
  onFlip,
  className = "",
}) => {
  const { colorScheme } = useColorScheme();
  const flipTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isFlipped !== undefined && flipTriggerRef.current) {
      flipTriggerRef.current();
    }
  }, [isFlipped]);

  const handleManualSpin = () => {
    if (flipTriggerRef.current) {
      flipTriggerRef.current();
    }
    if (onFlip) {
      onFlip();
    }
  };

  return (
    <div
      className={`relative z-0 flex flex-col items-center justify-center w-full h-full overflow-visible select-none pointer-events-auto ${className}`}
    >
      {/* 3D Rapier Physics Canvas wrapped in Error Boundary */}
      <WebGLErrorBoundary fallback={<CardFallback isFlipped={isFlipped} onFlip={onFlip} colorScheme={colorScheme} />}>
        <Card3DLanyard
          isFlipped={isFlipped}
          colorScheme={colorScheme}
          onFlipTrigger={(callback) => {
            flipTriggerRef.current = callback;
          }}
        />
      </WebGLErrorBoundary>

      {/* Interactive Instruction Pills below Card */}
      <div className="mt-[-16px] flex items-center justify-center gap-3 relative z-10 pointer-events-auto">
        <button
          type="button"
          onClick={handleManualSpin}
          className="text-xs font-mono text-white font-medium hover:text-cyan-300 transition-all flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a1432]/90 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] shadow-lg active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Spin Card</span>
        </button>

        <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a1432]/80 backdrop-blur-md border border-white/10">
          <Move className="w-3.5 h-3.5 text-cyan-400" />
          <span>Drag Freely</span>
        </div>
      </div>
    </div>
  );
};
