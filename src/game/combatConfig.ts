export type EnemyKind = 'melee' | 'ranged' | 'charger';

export const COMBAT = {
  player: {
    maxHp: 8,
    moveSpeed: 250,
    baseBasicAttackRange: 205,
    baseBasicAttackCooldownMs: 800,
    flyingSwordSpeed: 560,
    flyingSwordTurnRateRadPerSec: 4.2,
    flyingSwordLifetimeMs: 850,
    flyingSwordHitRadius: 32,
    flyingSwordTrailIntervalMs: 42,
    dodgeSpeed: 520,
    dodgeDurationMs: 150,
    dodgeCooldownMs: 720,
    iframeMs: 190,
  },
  skills: {
    cleaveCooldownMs: 2800,
    cleaveRange: 145,
    cleaveArcDeg: 115,
    projectileCooldownMs: 3600,
    projectileRange: 320,
    guardCooldownMs: 5200,
    guardDurationMs: 700,
  },
  enemy: {
    melee: { hp: 3, speed: 72, attackRange: 62, damage: 1, cooldownMs: 950 },
    ranged: { hp: 3, speed: 48, preferredRange: 215, damage: 1, cooldownMs: 1450 },
    charger: { hp: 4, speed: 58, damage: 2, windupMs: 650, chargeSpeed: 360, cooldownMs: 2200 },
  },
};
