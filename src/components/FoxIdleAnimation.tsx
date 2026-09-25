"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createFoxTailUniforms,
  applyFoxTailShader,
  type FoxTailUniforms,
} from "./fox/FoxTailShader";

export interface FoxIdleAnimationProps {
  children: React.ReactNode;
  enabled?: boolean;
  /** Scale factor for breathing intensity (default: 1.0) */
  breathingIntensity?: number;
  /** Scale factor for subtle floating height (default: 1.0) */
  floatingIntensity?: number;
  /** Scale factor for root-level posture sway (default: 0.5 - subtle to keep focus on tails) */
  swayIntensity?: number;
  /** Scale factor for GPU-based independent tail deformation (default: 1.0) */
  tailIntensity?: number;
}

/**
 * Procedural Living Idle Animation Controller for the Digital Fox Spirit.
 *
 * Architecture:
 * - Layer 1: Body Breathing — subtle scale cycle (~3.8s period)
 * - Layer 2: Subtle Floating — vertical levitation (~5.4s period)
 * - Layer 3: Posture Sway — gentle root-level micro-rotation (calibrated to not mask tails)
 * - Layer 4: Independent 3-Tail GPU Deformation — Three.js MeshStandardMaterial onBeforeCompile
 *   with precomputed geometry attributes (zero CPU per-frame overhead)
 * - Layer 5: Reduced Motion Support — respects prefers-reduced-motion
 */
export const FoxIdleAnimation: React.FC<FoxIdleAnimationProps> = ({
  children,
  enabled = true,
  breathingIntensity = 1.0,
  floatingIntensity = 1.0,
  swayIntensity = 0.5, // Reduced default root sway to let independent tail physics shine
  tailIntensity = 1.0,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Base transforms for root-level animation
  const baseScale = useRef<THREE.Vector3 | null>(null);
  const basePosition = useRef<THREE.Vector3 | null>(null);
  const baseRotation = useRef<THREE.Euler | null>(null);

  // GPU Tail Shader uniforms
  const uniformsRef = useRef<FoxTailUniforms>(createFoxTailUniforms(tailIntensity));
  const isShaderAppliedRef = useRef(false);

  // Accessibility: prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  // Global mouse position for cursor tracking
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentLookRef = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on screen coordinates
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Synchronize tail intensity with uniforms
  useEffect(() => {
    if (!uniformsRef.current) return;
    const effectiveIntensity = enabled && !reducedMotion ? tailIntensity : 0.0;
    uniformsRef.current.uTailIntensity.value = effectiveIntensity;
  }, [enabled, reducedMotion, tailIntensity]);

  // Capture base transforms once group mounts
  useEffect(() => {
    if (groupRef.current && !baseScale.current) {
      baseScale.current = groupRef.current.scale.clone();
      basePosition.current = groupRef.current.position.clone();
      baseRotation.current = groupRef.current.rotation.clone();
    }
  }, []);

  // Initialize GPU tail shader on the 3D hierarchy
  const initShader = () => {
    if (!groupRef.current || isShaderAppliedRef.current) return;

    let foundMesh = false;
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        foundMesh = true;
      }
    });

    if (foundMesh) {
      const result = applyFoxTailShader(groupRef.current, uniformsRef.current);
      isShaderAppliedRef.current = true;
      if (process.env.NODE_ENV !== "production") {
        console.log("[FoxIdleAnimation] GPU Tail Shader Applied:", result);
      }
    }
  };

  useEffect(() => {
    initShader();
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Capture base transforms if not yet captured
    if (!baseScale.current || !basePosition.current || !baseRotation.current) {
      baseScale.current = groupRef.current.scale.clone();
      basePosition.current = groupRef.current.position.clone();
      baseRotation.current = groupRef.current.rotation.clone();
      return;
    }

    // Lazy shader initialization if meshes were loaded asynchronously
    if (!isShaderAppliedRef.current) {
      initShader();
    }

    // Static when disabled or reduced-motion
    if (!enabled || reducedMotion) {
      groupRef.current.scale.copy(baseScale.current);
      groupRef.current.position.copy(basePosition.current);
      groupRef.current.rotation.copy(baseRotation.current);
      if (uniformsRef.current) {
        uniformsRef.current.uFoxTime.value = 0;
        uniformsRef.current.uTailIntensity.value = 0;
      }
      return;
    }

    const t = clock.elapsedTime;

    // ════════════════════════════════════════════════
    // LAYER 4: GPU TAIL SHADER UPDATE
    // Zero CPU vertex work — simply update the time uniform
    // ════════════════════════════════════════════════
    if (uniformsRef.current) {
      uniformsRef.current.uFoxTime.value = t;
      uniformsRef.current.uTailIntensity.value = tailIntensity;
    }

    // ════════════════════════════════════════════════
    // LAYER 1: BODY BREATHING (~3.8s period)
    // ════════════════════════════════════════════════
    const breathFreq = (Math.PI * 2) / 3.8;
    const breathPhase = t * breathFreq;
    const breathExp = Math.sin(breathPhase) * 0.5 + Math.sin(breathPhase * 2) * 0.08;

    const breathScaleY = 1 + breathExp * 0.007 * breathingIntensity;
    const breathScaleXZ = 1 + breathExp * 0.0045 * breathingIntensity;
    const breathLiftY = breathExp * 0.0028 * breathingIntensity;

    // ════════════════════════════════════════════════
    // LAYER 2: SUBTLE FLOATING (~5.4s period)
    // ════════════════════════════════════════════════
    const floatOffsetY = Math.sin(t * (Math.PI * 2) / 5.4) * 0.026 * floatingIntensity;

    // ════════════════════════════════════════════════
    // LAYER 3: POSTURE SWAY (Reduced intensity so root doesn't mask tails)
    // ════════════════════════════════════════════════
    const swayYaw =
      (Math.sin(t * 0.28) * 0.004 + Math.sin(t * 0.11 + 1.2) * 0.002) * swayIntensity;
    const swayRoll =
      (Math.sin(t * 0.32 + 2.1) * 0.0022 + Math.sin(t * 0.14) * 0.001) * swayIntensity;
    const swayPitch =
      (Math.sin(t * 0.36) * 0.002 + Math.sin(t * 0.18 + 0.8) * 0.001) * swayIntensity;

    // ════════════════════════════════════════════════
    // LAYER 5: CURSOR TRACKING POLISH
    // ════════════════════════════════════════════════
    // Maximum rotation in radians (~2 to 4 degrees)
    const maxLookYaw = 0.06; // ~3.4 degrees
    const maxLookPitch = 0.04; // ~2.3 degrees

    currentLookRef.current.yaw = THREE.MathUtils.lerp(
      currentLookRef.current.yaw,
      mouseRef.current.x * maxLookYaw,
      0.05
    );
    currentLookRef.current.pitch = THREE.MathUtils.lerp(
      currentLookRef.current.pitch,
      mouseRef.current.y * maxLookPitch,
      0.05
    );

    // Apply root transforms
    groupRef.current.scale.set(
      baseScale.current.x * breathScaleXZ,
      baseScale.current.y * breathScaleY,
      baseScale.current.z * breathScaleXZ
    );
    groupRef.current.position.set(
      basePosition.current.x,
      basePosition.current.y + floatOffsetY + breathLiftY,
      basePosition.current.z
    );
    groupRef.current.rotation.set(
      baseRotation.current.x + swayPitch + currentLookRef.current.pitch,
      baseRotation.current.y + swayYaw + currentLookRef.current.yaw,
      baseRotation.current.z + swayRoll
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default FoxIdleAnimation;
