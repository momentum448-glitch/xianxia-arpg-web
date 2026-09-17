export type PlayerGender = 'male' | 'female';

export interface PlayerProfile {
  gender: PlayerGender;
  realm: 1 | 2;
  spirit: number;
  maxSpirit: number;
}

export function createPlayerProfile(gender: PlayerGender): PlayerProfile {
  return {
    gender,
    realm: 1,
    spirit: 0,
    maxSpirit: 100,
  };
}
