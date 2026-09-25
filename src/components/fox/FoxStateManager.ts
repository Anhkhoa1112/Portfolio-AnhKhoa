/**
 * @file FoxStateManager.ts
 * @description Lightweight state machine controller for the Digital Fox Spirit
 * @phase Phase 5 — Random Idle System (Task P5-T01)
 * @invariants INV-13, INV-14
 */

import { FoxStateName } from "./types";

export interface FoxStateContext {
  currentState: FoxStateName;
  previousState: FoxStateName;
  stateTime: number;       // Elapsed seconds inside current state
  stateDuration: number;   // Expected or max duration in seconds (-1 for indefinite)
}

export function createFoxStateContext(): FoxStateContext {
  return {
    currentState: "IDLE",
    previousState: "IDLE",
    stateTime: 0,
    stateDuration: -1,
  };
}

/**
 * Transitions the state context to a new state without memory allocation.
 */
export function transitionFoxState(
  ctx: FoxStateContext,
  nextState: FoxStateName,
  duration = -1
): void {
  if (ctx.currentState === nextState) return;

  ctx.previousState = ctx.currentState;
  ctx.currentState = nextState;
  ctx.stateTime = 0;
  ctx.stateDuration = duration;
}

/**
 * Updates state machine logic in-place per animation frame.
 * @param ctx Reusable state context ref
 * @param dt Delta time in seconds
 * @param proximity Cursor proximity weight [0..1]
 * @param isHovered True if cursor is hovering the companion
 * @param isEventActive True if random idle scheduler has an active event
 * @param reducedMotion True if reduced motion is requested
 */
export function updateFoxStateManager(
  ctx: FoxStateContext,
  dt: number,
  proximity: number,
  isHovered: boolean,
  isEventActive: boolean,
  reducedMotion: boolean,
  flourishPhase?: "INACTIVE" | "ANTICIPATION" | "FLOURISH" | "SETTLE"
): void {
  if (reducedMotion) {
    if (ctx.currentState !== "IDLE") {
      transitionFoxState(ctx, "IDLE");
    }
    return;
  }

  ctx.stateTime += dt;

  // Flourish state overrides if flourish is active
  if (flourishPhase && flourishPhase !== "INACTIVE") {
    if (flourishPhase === "ANTICIPATION") {
      if (isHovered || proximity >= 0.25) {
        // User interrupted anticipation
        transitionFoxState(ctx, "LOOK_AT_CURSOR");
        return;
      }
      transitionFoxState(ctx, "ANTICIPATION");
      return;
    } else if (flourishPhase === "FLOURISH") {
      transitionFoxState(ctx, "FLOURISH");
      return;
    } else if (flourishPhase === "SETTLE") {
      transitionFoxState(ctx, "SETTLE", 1.2);
      return;
    }
  }

  // Determine target state based on inputs and current state
  switch (ctx.currentState) {
    case "IDLE": {
      if (isHovered || proximity >= 0.45) {
        transitionFoxState(ctx, "CURSOR_DETECTED", 0.5);
      } else if (proximity > 0.15) {
        transitionFoxState(ctx, "CURSOR_DETECTED", 0.8);
      } else if (isEventActive) {
        transitionFoxState(ctx, "IDLE_VARIATION");
      }
      break;
    }

    case "CURSOR_DETECTED": {
      // User is approaching — escalate to active look or return
      if (isHovered || proximity >= 0.45) {
        transitionFoxState(ctx, "LOOK_AT_CURSOR");
      } else if (proximity < 0.12 && !isHovered) {
        transitionFoxState(ctx, "SETTLE", 1.0);
      }
      break;
    }

    case "LOOK_AT_CURSOR": {
      // User moved away
      if (!isHovered && proximity < 0.15) {
        transitionFoxState(ctx, "SETTLE", 1.2);
      }
      break;
    }

    case "IDLE_VARIATION": {
      // If user starts interacting, interrupt variation immediately
      if (isHovered || proximity >= 0.25) {
        transitionFoxState(ctx, "CURSOR_DETECTED", 0.4);
      } else if (!isEventActive) {
        // Event ended naturally
        transitionFoxState(ctx, "IDLE");
      }
      break;
    }

    case "ANTICIPATION":
    case "FLOURISH": {
      if (isHovered || proximity >= 0.25) {
        transitionFoxState(ctx, "LOOK_AT_CURSOR");
      }
      break;
    }

    case "SETTLE": {
      if (isHovered || proximity >= 0.25) {
        transitionFoxState(ctx, "LOOK_AT_CURSOR");
      } else if (ctx.stateTime >= ctx.stateDuration) {
        transitionFoxState(ctx, "IDLE");
      }
      break;
    }

    default:
      transitionFoxState(ctx, "IDLE");
      break;
  }
}
