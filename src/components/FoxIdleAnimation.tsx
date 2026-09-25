"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createFoxTailUniforms,
  applyFoxTailShader,
  type FoxTailUniforms,
} from "./fox/FoxTailShader";
import {
  computeFoxBreathing,
  computeFoxWeightShift,
  computeFoxSway,
  computeFoxProximityWeight,
  computeFoxClickBounce,
  FOX_BREATHING_CONFIG,
  FOX_WEIGHT_SHIFT_CONFIG,
  FOX_SWAY_CONFIG,
  FOX_CURSOR_LOOK_CONFIG,
  FOX_PROXIMITY_CONFIG,
  FOX_CLICK_BOUNCE_CONFIG,
} from "./fox/FoxBodyController";
import {
  createFoxStateContext,
  updateFoxStateManager,
  type FoxStateContext,
} from "./fox/FoxStateManager";
import {
  createFoxSchedulerOutput,
  updateFoxIdleScheduler,
  type FoxSchedulerOutput,
} from "./fox/FoxIdleEventScheduler";
import {
  createFoxFlourishState,
  updateFoxFlourish,
  type FoxFlourishState,
} from "./fox/FoxFlourishController";
import {
  FOX_PERFORMANCE_TIERS,
  createFpsSafetyState,
  updateFpsSafetyMonitor,
  type PerformanceTierConfig,
  type FpsSafetyState,
} from "./fox/FoxPerformanceManager";

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
  /** Whether the companion is currently hovered by cursor */
  isHovered?: boolean;
  /** Incremented counter or timestamp when user clicks/taps the companion */
  clickTrigger?: number;
  /** Capability-based performance tier configuration (Phase 7) */
  tierConfig?: PerformanceTierConfig;
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
 * - Layer 5: Cursor Tracking Polish — responsive, smooth gaze tracking
 * - Layer 6: Subtle Hover Response — gentle lift and increased tail physics
 * - Layer 7: Reduced Motion Support — respects prefers-reduced-motion
 * - Layer 8: Random Idle Event Scheduler & FSM — organic deep breath, tail flick, ear twitch, alert look
 * - Layer 9: Special Rare Flourish — anticipation crouch -> majestic expansion -> damped settle
 * - Layer 10: Performance Optimization & FPS Safety Watchdog (Phase 7)
 */
export const FoxIdleAnimation: React.FC<FoxIdleAnimationProps> = ({
  children,
  enabled = true,
  breathingIntensity = 1.0,
  floatingIntensity = 1.0,
  swayIntensity = 0.5, // Subtle root sway to let independent tail physics shine
  tailIntensity = 1.0,
  isHovered = false,
  clickTrigger = 0,
  tierConfig = FOX_PERFORMANCE_TIERS.HIGH,
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

  // Global mouse position & proximity tracking
  const mouseClientRef = useRef({ clientX: -9999, clientY: -9999 });
  const currentLookRef = useRef({ yaw: 0, pitch: 0 });
  const hoverProgressRef = useRef(0);
  const lastClickTimeRef = useRef(-999);
  const prevClickTriggerRef = useRef(clickTrigger);

  // Random Idle Behavior Scheduler & State Machine (Layer 8)
  const stateContextRef = useRef<FoxStateContext>(createFoxStateContext());
  const schedulerRef = useRef<FoxSchedulerOutput>(createFoxSchedulerOutput());
  // Special Rare Flourish Controller (Layer 9 - Phase 6)
  const flourishRef = useRef<FoxFlourishState>(createFoxFlourishState());
  // FPS Safety Watchdog (Layer 10 - Phase 7)
  const fpsSafetyRef = useRef<FpsSafetyState>(createFpsSafetyState());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseClientRef.current.clientX = e.clientX;
      mouseClientRef.current.clientY = e.clientY;
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

  useFrame(({ clock }, delta) => {
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
      hoverProgressRef.current = 0;
      currentLookRef.current = { yaw: 0, pitch: 0 };
      if (uniformsRef.current) {
        uniformsRef.current.uFoxTime.value = 0;
        uniformsRef.current.uTailIntensity.value = 0;
      }
      return;
    }

    const t = clock.elapsedTime;

    // ════════════════════════════════════════════════
    // LAYER 7: CLICK / TAP PLAYFUL BOUNCE
    // ════════════════════════════════════════════════
    // LAYER 10: FPS SAFETY WATCHDOG (Phase 7 - Task P7-T04)
    // ════════════════════════════════════════════════
    updateFpsSafetyMonitor(fpsSafetyRef.current, t, delta);

    // ════════════════════════════════════════════════
    // LAYER 7: CLICK / TAP PLAYFUL BOUNCE
    // Dynamic spring response when user interacts
    // ════════════════════════════════════════════════
    if (clickTrigger && clickTrigger > prevClickTriggerRef.current) {
      prevClickTriggerRef.current = clickTrigger;
      lastClickTimeRef.current = t;
    }
    const clickBounce = computeFoxClickBounce(t - lastClickTimeRef.current);

    // ════════════════════════════════════════════════
    // LAYER 6: SUBTLE HOVER REACTION PROGRESS
    // Smooth dampening without abrupt jumps
    // ════════════════════════════════════════════════
    const targetHover = isHovered ? 1.0 : 0.0;
    hoverProgressRef.current = THREE.MathUtils.lerp(
      hoverProgressRef.current,
      targetHover,
      0.06
    );
    const hoverVal = hoverProgressRef.current;
    const hoverLiftY = hoverVal * 0.025; // Gentle 2-3 pixel rise
    const hoverTilt = hoverVal * 0.035;  // Subtle attentive ear/head tilt

    // ════════════════════════════════════════════════
    // LAYER 5: PROXIMITY-BASED CURSOR TRACKING
    // Fox turns head towards cursor when approached, rests when far
    // ════════════════════════════════════════════════
    const foxScreenX = typeof window !== "undefined" ? window.innerWidth - 160 : 0;
    const foxScreenY = typeof window !== "undefined" ? window.innerHeight - 170 : 0;

    let targetYaw = 0;
    let targetPitch = 0;
    let proximity = 0;

    if (tierConfig.cursorTracking) {
      proximity = computeFoxProximityWeight(
        mouseClientRef.current.clientX,
        mouseClientRef.current.clientY,
        foxScreenX,
        foxScreenY
      );

      const dirX = typeof window !== "undefined"
        ? (mouseClientRef.current.clientX - foxScreenX) / (window.innerWidth * 0.4)
        : 0;
      const dirY = typeof window !== "undefined"
        ? -(mouseClientRef.current.clientY - foxScreenY) / (window.innerHeight * 0.4)
        : 0;

      targetYaw = Math.max(-1, Math.min(1, dirX)) * FOX_CURSOR_LOOK_CONFIG.maxLookYaw * proximity;
      targetPitch = Math.max(-1, Math.min(1, dirY)) * FOX_CURSOR_LOOK_CONFIG.maxLookPitch * proximity;
    }

    currentLookRef.current.yaw = THREE.MathUtils.lerp(
      currentLookRef.current.yaw,
      targetYaw,
      FOX_CURSOR_LOOK_CONFIG.lerpFactor
    );
    currentLookRef.current.pitch = THREE.MathUtils.lerp(
      currentLookRef.current.pitch,
      targetPitch,
      FOX_CURSOR_LOOK_CONFIG.lerpFactor
    );

    const isInteracting = isHovered || clickBounce > 0.001 || proximity > 0.45;

    // ════════════════════════════════════════════════
    // LAYER 9: SPECIAL RARE FLOURISH CONTROLLER (Phase 6)
    // Anticipation (crouch) -> Flourish (expand + 2.45x tail fan) -> Settle
    // ════════════════════════════════════════════════
    const isFlourishActive = updateFoxFlourish(
      flourishRef.current,
      t,
      isInteracting,
      reducedMotion || !tierConfig.flourish
    );
    const flourish = flourishRef.current;

    // ════════════════════════════════════════════════
    // LAYER 8: RANDOM IDLE BEHAVIOR SCHEDULER & STATE MACHINE
    // Periodic organic events (Ear Twitch, Tail Flick, Head Turn, Deep Breath)
    // ════════════════════════════════════════════════
    const dt = Math.min(delta, 0.1);
    // When flourish is active, suppress regular idle events
    updateFoxIdleScheduler(
      schedulerRef.current,
      t,
      isInteracting || isFlourishActive,
      reducedMotion || !tierConfig.randomEvents
    );
    const sched = schedulerRef.current;

    updateFoxStateManager(
      stateContextRef.current,
      dt,
      proximity,
      isHovered,
      sched.activeEvent !== "NONE",
      reducedMotion,
      flourish.phase
    );

    // ════════════════════════════════════════════════
    // LAYER 4: GPU TAIL SHADER UPDATE
    // Zero CPU vertex work — simply update the time uniform
    // ════════════════════════════════════════════════
    if (uniformsRef.current) {
      uniformsRef.current.uFoxTime.value = t;
      // When hovered, tails sway with more lively elegance (+25%); temporary boost on click, tail flick, or flourish
      const clickTailBoost = clickBounce > 0.001 ? 1.35 : 1.0;
      const baseTailInt = tierConfig.tailAnimation ? tailIntensity : 0.0;
      uniformsRef.current.uTailIntensity.value =
        baseTailInt *
        (1.0 + hoverVal * 0.25) *
        clickTailBoost *
        sched.tailMultiplier *
        flourish.tailMultiplier;
    }

    // ════════════════════════════════════════════════
    // LAYER 1: BIOLOGICAL ASYMMETRIC BREATHING
    // Natural diaphragm rise and rib expansion via FoxBodyController + Deep Breath event
    // ════════════════════════════════════════════════
    const effectiveBreathing = tierConfig.breathing ? breathingIntensity : 0.0;
    const breath = computeFoxBreathing(t, FOX_BREATHING_CONFIG, effectiveBreathing);

    // ════════════════════════════════════════════════
    // LAYER 2: ORGANIC WEIGHT SHIFT & FLOATING
    // Gentle weight transfer between paws + levitation
    // ════════════════════════════════════════════════
    const floatOffsetY = Math.sin(t * (Math.PI * 2) / 5.4) * 0.055 * floatingIntensity;
    const weightShift = tierConfig.weightShift
      ? computeFoxWeightShift(t, FOX_WEIGHT_SHIFT_CONFIG, 1.0)
      : { shiftX: 0, shiftZ: 0, tiltZ: 0 };

    // ════════════════════════════════════════════════
    // LAYER 3: POSTURAL SWAY
    // Multi-frequency organic sway while subordinate to tails
    // ════════════════════════════════════════════════
    const sway = computeFoxSway(t, FOX_SWAY_CONFIG, swayIntensity);

    // Apply root transforms with click bounce, scheduler blends, & flourish transforms
    const scaleBounce = 1.0 + clickBounce;
    groupRef.current.scale.set(
      baseScale.current.x * (breath.scaleXZ + sched.extraScaleXZ + flourish.extraScaleXZ) * scaleBounce,
      baseScale.current.y * (breath.scaleY + sched.extraScaleY + flourish.extraScaleY) * scaleBounce,
      baseScale.current.z * (breath.scaleXZ + sched.extraScaleXZ + flourish.extraScaleXZ) * scaleBounce
    );
    groupRef.current.position.set(
      basePosition.current.x + weightShift.shiftX,
      basePosition.current.y + floatOffsetY + breath.liftY + hoverLiftY + sched.extraLiftY + flourish.extraLiftY + clickBounce * 0.03,
      basePosition.current.z + weightShift.shiftZ
    );
    groupRef.current.rotation.set(
      baseRotation.current.x + sway.pitch + currentLookRef.current.pitch + sched.lookPitchOffset + flourish.lookPitchOffset - hoverTilt * 0.5,
      baseRotation.current.y + sway.yaw + currentLookRef.current.yaw + sched.lookYawOffset + flourish.lookYawOffset,
      baseRotation.current.z + sway.roll + weightShift.tiltZ + hoverTilt + sched.lookRollOffset
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default FoxIdleAnimation;
