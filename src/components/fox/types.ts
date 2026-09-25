/**
 * @file types.ts
 * @description Shared animation types and state interfaces for Digital Fox
 * @phase Phase 3 — Core Creature Motion
 * @invariants INV-13, INV-14
 */

export type FoxStateName =
  | "IDLE"
  | "CURSOR_DETECTED"
  | "LOOK_AT_CURSOR"
  | "IDLE_VARIATION"
  | "ANTICIPATION"
  | "FLOURISH"
  | "SETTLE";

export type FoxBehaviorState =
  | "IDLE"
  | "ALERT"
  | "SLEEPY"
  | "ANTICIPATION"
  | "FLOURISH"
  | "SETTLE";

export type FoxIdleEventId =
  | "NONE"
  | "EAR_TWITCH"
  | "TAIL_FLICK"
  | "HEAD_TURN"
  | "DEEP_BREATH";

export interface FoxIdleEventConfig {
  id: FoxIdleEventId;
  cooldownRangeMs: [number, number]; // [min, max]
  durationMs: number;
  weight: number;
  reducedMotion: boolean;
}

export type FoxPerformanceTier = "HIGH" | "MEDIUM" | "LOW" | "REDUCED_MOTION";

export interface FoxBreathingConfig {
  period: number;         // Cycle period in seconds (~3.8s)
  scaleY: number;         // Vertical expansion amplitude
  scaleXZ: number;        // Lateral expansion amplitude
  liftY: number;          // Vertical chest/body rise
  asymmetry: number;      // Asymmetric inhale/exhale factor (higher = faster inhale, slower exhale)
}

export interface FoxWeightShiftConfig {
  period: number;         // Weight shifting period in seconds (~8.0 - 12.0s)
  amplitudeX: number;     // Lateral shift along X axis (~0.015)
  amplitudeZ: number;     // Subtle front/back shift (~0.008)
  tiltZ: number;          // Subtle roll angle accompanying the shift (~0.008 rad)
}

export interface FoxSwayConfig {
  yawSpeed1: number;
  yawSpeed2: number;
  yawAmp1: number;
  yawAmp2: number;
  pitchSpeed: number;
  pitchAmp: number;
  rollSpeed: number;
  rollAmp: number;
}

export interface FoxCursorLookConfig {
  maxLookYaw: number;     // Maximum yaw in radians (~0.16 = ~9.2 deg)
  maxLookPitch: number;   // Maximum pitch in radians (~0.09 = ~5.1 deg)
  lerpFactor: number;     // Inertial smoothing speed (~0.04 - 0.06)
  returnFactor: number;   // Return-to-center lerp factor when pointer leaves
}

export interface FoxBodyMotionOutput {
  scaleY: number;
  scaleXZ: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationPitch: number;
  rotationYaw: number;
  rotationRoll: number;
}
