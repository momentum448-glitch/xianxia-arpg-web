import { CULTIVATION, type Realm } from './cultivationConfig';

export type PlayerGender = 'male' | 'female';

export interface PlayerCombatBonuses {
  basicAttackRange: number;
}

export interface PlayerProfile {
  gender: PlayerGender;
  realm: Realm;
  spirit: number;
  maxSpirit: number;
  essence: number;
  combatBonuses: PlayerCombatBonuses;
}

export function createPlayerProfile(gender: PlayerGender): PlayerProfile {
  return {
    gender,
    realm: 1,
    spirit: 0,
    maxSpirit: CULTIVATION.realm1.maxSpirit,
    essence: 0,
    combatBonuses: {
      basicAttackRange: 0,
    },
  };
}
