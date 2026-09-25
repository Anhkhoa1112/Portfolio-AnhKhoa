/**
 * @file FoxIdleEventScheduler.ts
 * @description Lean random idle event scheduler for Digital Fox
 * @phase Phase 5 — Random Idle System (Tasks P5-T02, P5-T04, P5-T05, P5-T06, P5-T07)
 * @invariants INV-13, INV-14
 */

import { FoxIdleEventConfig, FoxIdleEventId } from "./types";

export const FOX_IDLE_EVENTS: FoxIdleEventConfig[] = [
  {
    id: "EAR_TWITCH",
    cooldownRangeMs: [4000, 12000],
    durationMs: 450,
    weight: 3.0,
    reducedMotion: false,
  },
  {
    id: "TAIL_FLICK",
    cooldownRangeMs: [6000, 15000],
    durationMs: 1800,
    weight: 2.5,
    reducedMotion: false,
  },
  {
    id: "HEAD_TURN",
    cooldownRangeMs: [8000, 20000],
    durationMs: 2600,
    weight: 2.0,
    reducedMotion: false,
  },
  {
    id: "DEEP_BREATH",
    cooldownRangeMs: [12000, 25000],
    durationMs: 3800,
    weight: 1.8,
    reducedMotion: false,
  },
];

export interface FoxSchedulerOutput {
  activeEvent: FoxIdleEventId;
  eventStartTime: number;
  eventDuration: number;
  nextScheduledTime: number;
  lastEventEndTime: number;

  // Active deformation & transformation offsets
  extraScaleY: number;
  extraScaleXZ: number;
  extraLiftY: number;
  tailMultiplier: number;
  lookYawOffset: number;
  lookPitchOffset: number;
  lookRollOffset: number;
}

export function createFoxSchedulerOutput(): FoxSchedulerOutput {
  return {
    activeEvent: "NONE",
    eventStartTime: -999,
    eventDuration: 0,
    // First event between 5s and 9s after page mount
    nextScheduledTime: 6.0 + Math.random() * 3.0,
    lastEventEndTime: 0,
    extraScaleY: 0,
    extraScaleXZ: 0,
    extraLiftY: 0,
    tailMultiplier: 1.0,
    lookYawOffset: 0,
    lookPitchOffset: 0,
    lookRollOffset: 0,
  };
}

/**
 * Updates idle scheduler state and evaluates mathematical curves for active events in-place.
 */
export function updateFoxIdleScheduler(
  state: FoxSchedulerOutput,
  currentTime: number,
  isInteracting: boolean,
  reducedMotion: boolean
): void {
  // Reset per-frame dynamic outputs
  state.extraScaleY = 0;
  state.extraScaleXZ = 0;
  state.extraLiftY = 0;
  state.tailMultiplier = 1.0;
  state.lookYawOffset = 0;
  state.lookPitchOffset = 0;
  state.lookRollOffset = 0;

  if (reducedMotion) {
    state.activeEvent = "NONE";
    return;
  }

  // If user is actively hovering or in close proximity, suspend idle events
  if (isInteracting) {
    if (state.activeEvent !== "NONE") {
      state.activeEvent = "NONE";
      state.lastEventEndTime = currentTime;
    }
    // Postpone next event while user is engaged
    state.nextScheduledTime = currentTime + 7.0 + Math.random() * 4.0;
    return;
  }

  // 1. Process active event progression
  if (state.activeEvent !== "NONE") {
    const elapsed = currentTime - state.eventStartTime;
    if (elapsed >= state.eventDuration) {
      // Event completed
      state.activeEvent = "NONE";
      state.lastEventEndTime = currentTime;

      // Pick next interval based on a minimum cooldown of 4.0s
      const nextDelay = 4.5 + Math.random() * 7.5;
      state.nextScheduledTime = currentTime + nextDelay;
    } else {
      // Event active — compute continuous smooth output
      computeEventCurves(state, elapsed);
      return;
    }
  }

  // 2. Trigger new event if timer expired and no other event active
  if (currentTime >= state.nextScheduledTime && state.activeEvent === "NONE") {
    const picked = selectWeightedEvent();
    state.activeEvent = picked.id;
    state.eventStartTime = currentTime;
    state.eventDuration = picked.durationMs / 1000;
    computeEventCurves(state, 0.0);
  }
}

/**
 * Weighted random event selection.
 */
function selectWeightedEvent(): FoxIdleEventConfig {
  const totalWeight = FOX_IDLE_EVENTS.reduce((acc, ev) => acc + ev.weight, 0);
  let roll = Math.random() * totalWeight;

  for (let i = 0; i < FOX_IDLE_EVENTS.length; i++) {
    const ev = FOX_IDLE_EVENTS[i];
    if (roll < ev.weight) {
      return ev;
    }
    roll -= ev.weight;
  }

  return FOX_IDLE_EVENTS[0];
}

/**
 * Pure mathematical curve evaluation for idle variations (Zero allocations).
 */
function computeEventCurves(state: FoxSchedulerOutput, elapsed: number): void {
  const progress = Math.min(1.0, elapsed / state.eventDuration);

  switch (state.activeEvent) {
    case "EAR_TWITCH": {
      // Quick double perk/twitch (450ms total)
      // Rapid oscillation damped by envelope
      const envelope = Math.sin(progress * Math.PI);
      const twitchWave = Math.sin(progress * Math.PI * 5.0);
      const perkIntensity = envelope * twitchWave;

      state.lookRollOffset = perkIntensity * 0.035; // Subtle ear/head tilt
      state.lookPitchOffset = envelope * 0.018;     // Alert upward perk
      break;
    }

    case "TAIL_FLICK": {
      // Burst of tail motion with sinusoidal waves and smooth rise/fall
      const envelope = Math.sin(progress * Math.PI);
      const wave = Math.sin(progress * Math.PI * 2.5);
      state.tailMultiplier = 1.0 + Math.max(0, wave * envelope * 0.85);
      break;
    }

    case "HEAD_TURN": {
      // Smooth inquisitive gaze shift to the side and return
      const envelope = Math.sin(progress * Math.PI);
      state.lookYawOffset = -envelope * 0.085;
      state.lookPitchOffset = envelope * 0.028;
      break;
    }

    case "DEEP_BREATH": {
      // Deep biological chest expansion (bell curve)
      const envelope = Math.pow(Math.sin(progress * Math.PI), 1.25);
      state.extraScaleY = envelope * 0.034;
      state.extraScaleXZ = envelope * 0.018;
      state.extraLiftY = envelope * 0.014;
      break;
    }

    default:
      break;
  }
}
