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

// Entrance/work-edge anchors for the current A1 pocket placements in settlementV2AProduction.
// NPC nodes use these coordinates for both rendering and nearest-NPC interaction checks.
export const NPCS: NpcDefinition[] = [
  {
    id: 'elder',
    name: 'Mặc Trưởng Lão',
    role: 'Trưởng lão',
    x: 490,
    y: 7828,
    color: 0x65566f,
    interactionRadius: 155,
  },
  {
    id: 'merchant',
    name: 'Lục Chưởng Quầy',
    role: 'Thương nhân',
    x: 1045,
    y: 8082,
    color: 0x826447,
    interactionRadius: 155,
  },
  {
    id: 'healer',
    name: 'Thanh Dược Sư',
    role: 'Dược sư',
    x: 490,
    y: 8382,
    color: 0x4f7163,
    interactionRadius: 155,
  },
];
