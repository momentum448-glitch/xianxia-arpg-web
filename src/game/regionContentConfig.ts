import type { EnemyKind } from './combatConfig';
import type { WorldZoneId } from './worldConfig';

export interface EncounterEnemyDefinition {
  kind: EnemyKind;
  dx: number;
  dy: number;
  hpMultiplier: number;
  damageMultiplier: number;
}

export interface EncounterDefinition {
  id: string;
  zone: Exclude<WorldZoneId, 'settlement'>;
  name: string;
  x: number;
  y: number;
  enemies: EncounterEnemyDefinition[];
}

export interface WorldEventDefinition {
  id: 'spirit-spring' | 'herb-cache' | 'ominous-stele';
  zone: Exclude<WorldZoneId, 'settlement'>;
  name: string;
  x: number;
  y: number;
  radius: number;
  color: number;
}

export const ENCOUNTERS: EncounterDefinition[] = [
  {
    id: 'plains-patrol',
    zone: 'plains',
    name: 'Du Yêu Hoang Nguyên',
    x: 800,
    y: 6100,
    enemies: [
      { kind: 'melee', dx: -190, dy: 80, hpMultiplier: 1, damageMultiplier: 1 },
      { kind: 'ranged', dx: 145, dy: -100, hpMultiplier: 1, damageMultiplier: 1 },
      { kind: 'charger', dx: 240, dy: 155, hpMultiplier: 1, damageMultiplier: 1 },
    ],
  },
  {
    id: 'forest-pack',
    zone: 'forest',
    name: 'Linh Lâm Yêu Quần',
    x: 820,
    y: 3450,
    enemies: [
      { kind: 'melee', dx: -230, dy: 110, hpMultiplier: 1.2, damageMultiplier: 1.05 },
      { kind: 'melee', dx: 130, dy: 160, hpMultiplier: 1.2, damageMultiplier: 1.05 },
      { kind: 'ranged', dx: 210, dy: -120, hpMultiplier: 1.15, damageMultiplier: 1.1 },
      { kind: 'charger', dx: -80, dy: -185, hpMultiplier: 1.2, damageMultiplier: 1.1 },
    ],
  },
  {
    id: 'danger-guard',
    zone: 'danger',
    name: 'U Minh Thủ Vực',
    x: 790,
    y: 1180,
    enemies: [
      { kind: 'melee', dx: -260, dy: 130, hpMultiplier: 1.45, damageMultiplier: 1.2 },
      { kind: 'melee', dx: 240, dy: 140, hpMultiplier: 1.45, damageMultiplier: 1.2 },
      { kind: 'ranged', dx: -180, dy: -150, hpMultiplier: 1.35, damageMultiplier: 1.25 },
      { kind: 'ranged', dx: 170, dy: -160, hpMultiplier: 1.35, damageMultiplier: 1.25 },
      { kind: 'charger', dx: 0, dy: 220, hpMultiplier: 1.55, damageMultiplier: 1.3 },
    ],
  },
];

export const WORLD_EVENTS: WorldEventDefinition[] = [
  { id: 'spirit-spring', zone: 'plains', name: 'Linh Tuyền', x: 1180, y: 5350, radius: 110, color: 0x8fb9aa },
  { id: 'herb-cache', zone: 'forest', name: 'Dược Thảo Ẩn', x: 390, y: 2920, radius: 110, color: 0x8fa36c },
  { id: 'ominous-stele', zone: 'danger', name: 'U Minh Bi', x: 1210, y: 720, radius: 125, color: 0x76627d },
];

export const BOSS_GATE = {
  x: 800,
  y: 220,
  name: 'Phong Ấn Cổ Môn',
} as const;
