export type WorldZoneId = 'settlement' | 'plains' | 'forest' | 'danger';

export interface WorldZone {
  id: WorldZoneId;
  name: string;
  yMin: number;
  yMax: number;
  fill: number;
}

export const WORLD = {
  width: 1080,
  height: 4300,
  edgePadding: 54,
  safeBoundaryY: 3370,
  playerSpawn: { x: 540, y: 3820 },
  encounterCenter: { x: 540, y: 2860 },
  zones: [
    { id: 'danger', name: 'U Minh Cốc', yMin: 0, yMax: 1050, fill: 0xb8b29d },
    { id: 'forest', name: 'Linh Lâm', yMin: 1050, yMax: 2200, fill: 0xc3ccb0 },
    { id: 'plains', name: 'Thanh Vân Hoang Nguyên', yMin: 2200, yMax: 3370, fill: 0xd6cfad },
    { id: 'settlement', name: 'Thanh Vân Thôn', yMin: 3370, yMax: 4300, fill: 0xe3d5b5 },
  ] satisfies WorldZone[],
};

export function zoneAt(y: number): WorldZone {
  return WORLD.zones.find((zone) => y >= zone.yMin && y < zone.yMax) ?? WORLD.zones[WORLD.zones.length - 1];
}

export function isSettlementY(y: number): boolean {
  return y >= WORLD.safeBoundaryY;
}
