export const CULTIVATION = {
  realm1: {
    name: 'Luyện Khí',
    maxSpirit: 100,
    breakthroughSpirit: 50,
    breakthroughEssence: 3,
    maxHp: 8,
    flyingSwordDamage: 1,
    skillDamage: 2,
  },
  realm2: {
    name: 'Trúc Cơ',
    maxSpirit: 160,
    maxHp: 10,
    flyingSwordDamage: 2,
    skillDamage: 3,
  },
  rewards: {
    spiritPerKill: 18,
    essencePerKill: 1,
  },
  encounterRespawnMs: 900,
} as const;

export type Realm = 1 | 2;

export function realmName(realm: Realm): string {
  return realm === 1 ? CULTIVATION.realm1.name : CULTIVATION.realm2.name;
}

export function maxHpForRealm(realm: Realm): number {
  return realm === 1 ? CULTIVATION.realm1.maxHp : CULTIVATION.realm2.maxHp;
}

export function flyingSwordDamageForRealm(realm: Realm): number {
  return realm === 1 ? CULTIVATION.realm1.flyingSwordDamage : CULTIVATION.realm2.flyingSwordDamage;
}

export function skillDamageForRealm(realm: Realm): number {
  return realm === 1 ? CULTIVATION.realm1.skillDamage : CULTIVATION.realm2.skillDamage;
}

export function canBreakthrough(realm: Realm, spirit: number, essence: number): boolean {
  return realm === 1
    && spirit >= CULTIVATION.realm1.breakthroughSpirit
    && essence >= CULTIVATION.realm1.breakthroughEssence;
}
