export const C4_ASSETS = {
  playerMaleIdleSouth: 'assets/c4/actors/player/male/ply_m_idle_s.png',
  enemyMeleeIdleSouth: 'assets/c4/actors/enemies/melee/en_melee_idle_s.png',
} as const;

export type C4AssetKey = keyof typeof C4_ASSETS;
