export const PLAYER_RUNTIME_ANIMATION = {
  idle: {
    cycleMs: 1200,
    bobPx: 1.4,
    breatheScale: 0.009,
    swayRad: 0.006,
  },
  run: {
    cycleMs: 280,
    bobPx: 3.2,
    leanRad: 0.035,
    squashScale: 0.016,
  },
  attack: {
    durationMs: 140,
    forwardPx: 3.2,
    pulseScale: 0.026,
    tiltRad: 0.045,
  },
  dodge: {
    stretchScale: 0.085,
    tiltRad: 0.11,
    trailLengthPx: 72,
    trailWidthPx: 11,
    trailAlpha: 0.22,
    trailDurationMs: 150,
  },
  skill: {
    durationMs: 230,
    forwardPx: 4.2,
    liftPx: 2.5,
    pulseScale: 0.045,
    tiltRad: 0.14,
  },
} as const;
