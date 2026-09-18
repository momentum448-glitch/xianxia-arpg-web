import { COMBAT } from './combatConfig';
import type { PlayerProfile } from './playerProfile';

export function basicAttackRangeForProfile(profile: PlayerProfile): number {
  return Math.max(
    0,
    COMBAT.player.baseBasicAttackRange + profile.combatBonuses.basicAttackRange,
  );
}
