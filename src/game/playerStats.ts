import { COMBAT } from './combatConfig';
import type { PlayerProfile } from './playerProfile';

export function basicAttackRangeForProfile(profile: PlayerProfile): number {
  return Math.max(
    0,
    COMBAT.player.baseBasicAttackRange + profile.combatBonuses.basicAttackRange,
  );
}

export function basicAttackCooldownMsForProfile(profile: PlayerProfile): number {
  const speedMultiplier = Math.max(0.1, 1 + profile.combatBonuses.basicAttackSpeedPct / 100);
  return Math.max(120, Math.round(COMBAT.player.baseBasicAttackCooldownMs / speedMultiplier));
}
