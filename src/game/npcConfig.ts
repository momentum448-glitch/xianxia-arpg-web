export type NpcId = 'elder' | 'merchant' | 'healer';

export interface NpcDefinition {
  id: NpcId;
  name: string;
  role: string;
  x: number;
  y: number;
  color: number;
  interactionRadius: number;
}

export const NPCS: NpcDefinition[] = [
  {
    id: 'elder',
    name: 'Mặc Trưởng Lão',
    role: 'Trưởng lão',
    x: 650,
    y: 7600,
    color: 0x65566f,
    interactionRadius: 155,
  },
  {
    id: 'merchant',
    name: 'Lục Chưởng Quầy',
    role: 'Thương nhân',
    x: 955,
    y: 8060,
    color: 0x826447,
    interactionRadius: 155,
  },
  {
    id: 'healer',
    name: 'Thanh Dược Sư',
    role: 'Dược sư',
    x: 650,
    y: 8510,
    color: 0x4f7163,
    interactionRadius: 155,
  },
];
