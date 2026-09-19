export const C4_ASSETS = {
  playerMaleIdleSouth: 'assets/c4/actors/player/male/ply_m_idle_s.png',
  enemyMeleeIdleSouth: 'assets/c4/actors/enemies/melee/en_melee_idle_s.png',
  flyingSwordR1: 'assets/c4/vfx/sword/fx_sword_r1.png',
  settlementHouseThatchA: 'assets/c4/environment/settlement/env_house_thatch_a.png',
  settlementHouseTileA: 'assets/c4/environment/settlement/env_house_tile_a.png',
  settlementHouseHallA: 'assets/c4/environment/settlement/env_house_hall_a.png',
  settlementHouseThatchB: 'assets/c4/environment/settlement/env_house_thatch_b.png',
} as const;

export type C4AssetKey = keyof typeof C4_ASSETS;

export function c4AssetUrl(path: string): string {
  const url = new URL(path, document.baseURI);
  url.searchParams.set('v', __BUILD_ID__);
  return url.toString();
}
