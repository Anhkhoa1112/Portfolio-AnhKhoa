/**
 * @file FoxBodyController.ts
 * @description Lightweight body animation config + pure functions
 * @phase Phase 3 — Core Creature Motion
 * @depends types.ts
 * @invariants INV-13, INV-14
 */

import {
  FoxBreathingConfig,
  FoxWeightShiftConfig,
  FoxSwayConfig,
  FoxCursorLookConfig,
} from "./types";

export const FOX_BREATHING_CONFIG: FoxBreathingConfig = {
  period: 3.8,        // ~3.8 seconds per full breath
  scaleY: 0.024,      // Subtle chest rise & expansion
  scaleXZ: 0.014,     // Subtle ribcage expansion
  liftY: 0.0075,      // Body translation lift
  asymmetry: 0.35,    // Inhale slightly faster, exhale slower & relaxed
};

export const FOX_WEIGHT_SHIFT_CONFIG: FoxWeightShiftConfig = {
  period: 9.6,        // Slow, organic weight transition between paws
  amplitudeX: 0.016,  // Lateral sway
  amplitudeZ: 0.006,  // Subtle forward/backward lean
  tiltZ: 0.007,       // Organic pelvic tilt with the shift
};

export const FOX_SWAY_CONFIG: FoxSwayConfig = {
  yawSpeed1: 0.28,
  yawSpeed2: 0.11,
  yawAmp1: 0.010,
  yawAmp2: 0.004,
  pitchSpeed: 0.36,
  pitchAmp: 0.005,
  rollSpeed: 0.32,
  rollAmp: 0.006,
};

export const FOX_PROXIMITY_CONFIG = {
  nearDist: 300, // Full attention threshold in pixels
  farDist: 850,  // Peripheral awareness drop-off in pixels
} as const;

export const FOX_CLICK_BOUNCE_CONFIG = {
  duration: 0.8, // Bounce duration in seconds
  amplitude: 0.055, // Max scale bounce expansion
  decay: 4.5, // Damping factor
} as const;

export const FOX_CURSOR_LOOK_CONFIG: FoxCursorLookConfig = {
  maxLookYaw: 0.16,    // ~9.2 degrees
  maxLookPitch: 0.09,  // ~5.1 degrees
  lerpFactor: 0.045,   // Smooth organic inertia
  returnFactor: 0.035, // Relaxed return to neutral
};

/**
 * Computes asymmetric biological breathing.
 * Uses a primary fundamental frequency plus a second harmonic to model
 * an active diaphragm contraction (inhale) and an elastic recoil (exhale).
 */
export function computeFoxBreathing(
  t: number,
  config: FoxBreathingConfig = FOX_BREATHING_CONFIG,
  intensity: number = 1.0
): { scaleY: number; scaleXZ: number; liftY: number } {
  const freq = (Math.PI * 2) / config.period;
  const phase = t * freq;

  // Asymmetric waveform: positive slope is steeper than negative slope
  const rawBreath = Math.sin(phase) + Math.sin(phase * 2) * config.asymmetry;
  const normalized = rawBreath * 0.75; // Normalize amplitude to roughly [-1, 1]

  return {
    scaleY: 1 + normalized * config.scaleY * intensity,
    scaleXZ: 1 + normalized * config.scaleXZ * intensity,
    liftY: normalized * config.liftY * intensity,
  };
}

/**
 * Computes subtle creature weight shifting between left and right paws.
 * Uses smooth cubic sine ease to linger at the extremes like a resting animal.
 */
export function computeFoxWeightShift(
  t: number,
  config: FoxWeightShiftConfig = FOX_WEIGHT_SHIFT_CONFIG,
  intensity: number = 1.0
): { shiftX: number; shiftZ: number; tiltZ: number } {
  const freq = (Math.PI * 2) / config.period;
  const phase = t * freq;

  // Cubic sine ease produces gentle lingering at the peak of each side
  const s = Math.sin(phase);
  const shapedShift = (s * 0.7 + Math.pow(s, 3) * 0.3);

  const secondaryZ = Math.cos(phase * 2) * 0.5;

  return {
    shiftX: shapedShift * config.amplitudeX * intensity,
    shiftZ: secondaryZ * config.amplitudeZ * intensity,
    tiltZ: -shapedShift * config.tiltZ * intensity,
  };
}

/**
 * Computes multi-frequency gentle postural sway to prevent the model from feeling static.
 */
export function computeFoxSway(
  t: number,
  config: FoxSwayConfig = FOX_SWAY_CONFIG,
  intensity: number = 1.0
): { yaw: number; pitch: number; roll: number } {
  const yaw =
    (Math.sin(t * config.yawSpeed1) * config.yawAmp1 +
      Math.sin(t * config.yawSpeed2 + 1.2) * config.yawAmp2) *
    intensity;

  const roll =
    (Math.sin(t * config.rollSpeed + 2.1) * config.rollAmp +
      Math.sin(t * 0.14) * 0.002) *
    intensity;

  const pitch =
    (Math.sin(t * config.pitchSpeed) * config.pitchAmp +
      Math.sin(t * 0.18 + 0.8) * 0.002) *
    intensity;

  return { yaw, pitch, roll };
}

/**
 * Computes proximity influence weight [0.0, 1.0] from cursor distance to Fox screen position.
 * Distances beyond farDist have 0 influence (fox rests calmly).
 * Distances within nearDist have full 1.0 influence (fox engages).
 */
export function computeFoxProximityWeight(
  cursorX: number,
  cursorY: number,
  foxScreenX: number,
  foxScreenY: number,
  nearDist: number = FOX_PROXIMITY_CONFIG.nearDist,
  farDist: number = FOX_PROXIMITY_CONFIG.farDist
): number {
  const dx = cursorX - foxScreenX;
  const dy = cursorY - foxScreenY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist >= farDist) return 0.0;
  if (dist <= nearDist) return 1.0;

  // Hermite smoothstep between farDist (0.0) and nearDist (1.0)
  const norm = (farDist - dist) / (farDist - nearDist);
  return norm * norm * (3.0 - 2.0 * norm);
}

/**
 * Computes playful damped spring bounce upon clicking/tapping the fox.
 */
export function computeFoxClickBounce(
  elapsedSeconds: number,
  duration: number = FOX_CLICK_BOUNCE_CONFIG.duration,
  amplitude: number = FOX_CLICK_BOUNCE_CONFIG.amplitude,
  decayRate: number = FOX_CLICK_BOUNCE_CONFIG.decay
): number {
  if (elapsedSeconds < 0 || elapsedSeconds >= duration) return 0.0;
  const progress = elapsedSeconds / duration;
  const decay = Math.exp(-progress * decayRate);
  const wave = Math.sin(progress * Math.PI * 3.5);
  return wave * decay * amplitude;
}
