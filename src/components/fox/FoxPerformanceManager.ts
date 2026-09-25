/**
 * @file FoxPerformanceManager.ts
 * @description Capability-based performance tier detection and FPS safety monitoring
 * @phase Phase 7 — Performance Optimization (Tasks P7-T02, P7-T03, P7-T04)
 * @invariants INV-13, INV-14
 */

export type FoxPerformanceTier = "HIGH" | "MEDIUM" | "LOW" | "REDUCED_MOTION";

export interface PerformanceTierConfig {
  tier: FoxPerformanceTier;
  breathing: boolean;
  weightShift: boolean;
  tailAnimation: boolean;
  tailSecondaryMotion: boolean;
  cursorTracking: boolean;
  randomEvents: boolean;
  flourish: boolean;
  dpr: [number, number];
}

export const FOX_PERFORMANCE_TIERS: Record<FoxPerformanceTier, PerformanceTierConfig> = {
  HIGH: {
    tier: "HIGH",
    breathing: true,
    weightShift: true,
    tailAnimation: true,
    tailSecondaryMotion: true,
    cursorTracking: true,
    randomEvents: true,
    flourish: true,
    dpr: [1, 1.75],
  },
  MEDIUM: {
    tier: "MEDIUM",
    breathing: true,
    weightShift: true,
    tailAnimation: true,
    tailSecondaryMotion: true,
    cursorTracking: true,
    randomEvents: true,
    flourish: false,
    dpr: [1, 1.5],
  },
  LOW: {
    tier: "LOW",
    breathing: true,
    weightShift: false,
    tailAnimation: true,
    tailSecondaryMotion: false,
    cursorTracking: false,
    randomEvents: false,
    flourish: false,
    dpr: [1, 1.0],
  },
  REDUCED_MOTION: {
    tier: "REDUCED_MOTION",
    breathing: false,
    weightShift: false,
    tailAnimation: false,
    tailSecondaryMotion: false,
    cursorTracking: false,
    randomEvents: false,
    flourish: false,
    dpr: [1, 1.0],
  },
};

/**
 * Detects performance tier based on device capability (accessibility, input pointer, and viewport).
 * Order of priority:
 * 1. prefers-reduced-motion: reduce -> REDUCED_MOTION
 * 2. pointer: coarse AND width < 768 -> LOW (mobile phones)
 * 3. pointer: coarse AND width >= 768 -> MEDIUM (tablets / touch devices)
 * 4. default -> HIGH (desktop)
 */
export function detectFoxPerformanceTier(): FoxPerformanceTier {
  if (typeof window === "undefined") return "HIGH";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "REDUCED_MOTION";
  }

  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  if (isCoarse) {
    if (window.innerWidth < 768) {
      return "LOW";
    }
    return "MEDIUM";
  }

  return "HIGH";
}

/**
 * Zero-allocation rolling FPS safety monitor (Task P7-T04).
 * Logs diagnostic warning only if sustained FPS < 24 for > 3.0 seconds.
 */
export interface FpsSafetyState {
  frameCount: number;
  lastSampleTime: number;
  currentFps: number;
  lowFpsDuration: number;
  warningLogged: boolean;
}

export function createFpsSafetyState(): FpsSafetyState {
  return {
    frameCount: 0,
    lastSampleTime: 0,
    currentFps: 60,
    lowFpsDuration: 0,
    warningLogged: false,
  };
}

export function updateFpsSafetyMonitor(
  state: FpsSafetyState,
  currentTime: number,
  delta: number
): void {
  state.frameCount++;

  // Sample every 0.5s
  if (state.lastSampleTime === 0) {
    state.lastSampleTime = currentTime;
    return;
  }

  const elapsed = currentTime - state.lastSampleTime;
  if (elapsed >= 0.5) {
    state.currentFps = Math.round(state.frameCount / elapsed);
    state.frameCount = 0;
    state.lastSampleTime = currentTime;

    if (state.currentFps < 24) {
      state.lowFpsDuration += elapsed;
      if (state.lowFpsDuration >= 3.0 && !state.warningLogged) {
        state.warningLogged = true;
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[DigitalFox] FPS safety notice: Sustained frame rate at ${state.currentFps} FPS.`
          );
        }
      }
    } else {
      state.lowFpsDuration = 0;
    }
  }
}
