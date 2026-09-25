/**
 * @file FoxFlourishController.ts
 * @description Rare special flourish animation controller for the Digital Fox Spirit
 * @phase Phase 6 — Special Flourish (Tasks P6-T01 to P6-T05)
 * @invariants INV-13, INV-14
 */

export type FlourishPhase = "INACTIVE" | "ANTICIPATION" | "FLOURISH" | "SETTLE";

export interface FoxFlourishState {
  phase: FlourishPhase;
  phaseStartTime: number;
  nextEligibleTime: number;
  hasTriggeredFirst: boolean;

  // Active transforms
  extraScaleY: number;
  extraScaleXZ: number;
  extraLiftY: number;
  tailMultiplier: number;
  lookPitchOffset: number;
  lookYawOffset: number;
}

export const FLOURISH_TIMINGS = {
  anticipationDuration: 1.0, // 0.8 - 1.2s
  flourishDuration: 2.0,     // 1.5 - 2.5s
  settleDuration: 1.2,       // 1.0 - 1.5s
  // First flourish: 45 - 65s after load
  firstMinDelay: 45.0,
  firstMaxDelay: 65.0,
  // Subsequent flourishes: 60 - 120s
  subsequentMinDelay: 65.0,
  subsequentMaxDelay: 110.0,
};

export function createFoxFlourishState(): FoxFlourishState {
  return {
    phase: "INACTIVE",
    phaseStartTime: -999,
    // First flourish scheduled after 45 - 65s
    nextEligibleTime:
      FLOURISH_TIMINGS.firstMinDelay +
      Math.random() * (FLOURISH_TIMINGS.firstMaxDelay - FLOURISH_TIMINGS.firstMinDelay),
    hasTriggeredFirst: false,
    extraScaleY: 0,
    extraScaleXZ: 0,
    extraLiftY: 0,
    tailMultiplier: 1.0,
    lookPitchOffset: 0,
    lookYawOffset: 0,
  };
}

/**
 * Updates the Flourish lifecycle in-place with zero memory allocation.
 *
 * @param state Mutable flourish state ref
 * @param currentTime Current elapsedTime in seconds
 * @param isInteracting User is hovering, clicking, or has cursor in close proximity
 * @param reducedMotion prefers-reduced-motion active
 * @returns boolean True if flourish sequence is currently active
 */
export function updateFoxFlourish(
  state: FoxFlourishState,
  currentTime: number,
  isInteracting: boolean,
  reducedMotion: boolean
): boolean {
  // Reset outputs
  state.extraScaleY = 0;
  state.extraScaleXZ = 0;
  state.extraLiftY = 0;
  state.tailMultiplier = 1.0;
  state.lookPitchOffset = 0;
  state.lookYawOffset = 0;

  if (reducedMotion) {
    state.phase = "INACTIVE";
    return false;
  }

  // ════════════════════════════════════════════════
  // INTERRUPTION LOGIC (Task P6-T05)
  // ════════════════════════════════════════════════
  if (isInteracting) {
    if (state.phase === "ANTICIPATION") {
      // Direct interrupt during anticipation: cancel immediately
      state.phase = "INACTIVE";
      const delay =
        FLOURISH_TIMINGS.subsequentMinDelay +
        Math.random() * (FLOURISH_TIMINGS.subsequentMaxDelay - FLOURISH_TIMINGS.subsequentMinDelay);
      state.nextEligibleTime = currentTime + delay;
      return false;
    } else if (state.phase === "FLOURISH") {
      // User interacted during mid-flourish: transition into settle with fast damping
      state.phase = "SETTLE";
      state.phaseStartTime = currentTime - FLOURISH_TIMINGS.settleDuration * 0.4; // fast-forward settle
    } else if (state.phase === "INACTIVE") {
      // Push next eligible time back if user is active
      if (currentTime + 20.0 > state.nextEligibleTime) {
        state.nextEligibleTime = currentTime + 30.0 + Math.random() * 20.0;
      }
      return false;
    }
  }

  // ════════════════════════════════════════════════
  // TRIGGER CHECK (Task P6-T04: Rare Event)
  // ════════════════════════════════════════════════
  if (state.phase === "INACTIVE") {
    if (currentTime >= state.nextEligibleTime && !isInteracting) {
      // Start ANTICIPATION
      state.phase = "ANTICIPATION";
      state.phaseStartTime = currentTime;
      state.hasTriggeredFirst = true;
    } else {
      return false;
    }
  }

  // ════════════════════════════════════════════════
  // PHASE STATE MACHINE & CURVES (Tasks P6-T01, P6-T02, P6-T03)
  // ════════════════════════════════════════════════
  const elapsed = currentTime - state.phaseStartTime;

  switch (state.phase) {
    case "ANTICIPATION": {
      // 0.8 - 1.2s: Body slight crouch, tail gather, head down
      if (elapsed >= FLOURISH_TIMINGS.anticipationDuration) {
        // Transition to FLOURISH
        state.phase = "FLOURISH";
        state.phaseStartTime = currentTime;
        computeFlourishCurves(state, 0.0);
      } else {
        const p = Math.min(1.0, elapsed / FLOURISH_TIMINGS.anticipationDuration);
        // Smooth ease-in into crouch
        const crouch = Math.sin(p * Math.PI * 0.5);

        state.extraScaleY = -0.032 * crouch;       // Crouch down by ~3.2%
        state.extraScaleXZ = 0.016 * crouch;       // Slight lateral spread
        state.extraLiftY = -0.012 * crouch;        // Sinks slightly downward
        state.tailMultiplier = 1.0 - 0.5 * crouch; // Tails gather inward (down to 0.5x amplitude)
        state.lookPitchOffset = -0.038 * crouch;   // Head lowers attentively
      }
      return true;
    }

    case "FLOURISH": {
      // 1.5 - 2.5s: Majestic lift, body expansion, 3-tail grand fan-out
      if (elapsed >= FLOURISH_TIMINGS.flourishDuration) {
        // Transition to SETTLE
        state.phase = "SETTLE";
        state.phaseStartTime = currentTime;
        computeSettleCurves(state, 0.0);
      } else {
        computeFlourishCurves(state, elapsed);
      }
      return true;
    }

    case "SETTLE": {
      // 1.0 - 1.5s: Damped return to neutral with no harsh snapping
      if (elapsed >= FLOURISH_TIMINGS.settleDuration) {
        // Sequence completed! Return to INACTIVE
        state.phase = "INACTIVE";
        const delay =
          FLOURISH_TIMINGS.subsequentMinDelay +
          Math.random() * (FLOURISH_TIMINGS.subsequentMaxDelay - FLOURISH_TIMINGS.subsequentMinDelay);
        state.nextEligibleTime = currentTime + delay;
        return false;
      } else {
        computeSettleCurves(state, elapsed);
        return true;
      }
    }

    default:
      return false;
  }
}

/**
 * Computes flourish expansion curves (Zero GC).
 */
function computeFlourishCurves(state: FoxFlourishState, elapsed: number): void {
  const p = Math.min(1.0, elapsed / FLOURISH_TIMINGS.flourishDuration);
  // Elegant bell-curve expansion
  const arc = Math.sin(p * Math.PI);
  const shapedArc = Math.pow(arc, 1.15);

  state.extraLiftY = shapedArc * 0.04;           // Gentle levitation lift ~4cm
  state.extraScaleY = shapedArc * 0.045;         // Majestic chest expansion +4.5%
  state.extraScaleXZ = shapedArc * 0.022;        // Harmonious girth
  state.tailMultiplier = 1.0 + shapedArc * 1.45; // Grand fan-out up to 2.45x tail waving!
  state.lookPitchOffset = shapedArc * 0.042;     // Proud gaze upward
  state.lookYawOffset = Math.sin(p * Math.PI * 2.0) * 0.032; // Regal subtle head sway
}

/**
 * Computes settle damping curves returning to neutral (Zero GC).
 */
function computeSettleCurves(state: FoxFlourishState, elapsed: number): void {
  const p = Math.min(1.0, elapsed / FLOURISH_TIMINGS.settleDuration);
  // Exponential damping curve with gentle deceleration
  const decay = Math.exp(-3.2 * p) * Math.cos(p * Math.PI * 0.5);

  state.extraLiftY = decay * 0.04;
  state.extraScaleY = decay * 0.045;
  state.extraScaleXZ = decay * 0.022;
  state.tailMultiplier = 1.0 + decay * 0.6;
  state.lookPitchOffset = decay * 0.03;
  state.lookYawOffset = decay * 0.015;
}
