export type WorldZoneId = 'settlement' | 'plains' | 'forest' | 'danger';

export interface WorldZone {
  id: WorldZoneId;
  name: string;
  yMin: number;
  yMax: number;
  fill: number;
}

export const WORLD = {
  width: 1600,
  height: 9000,
  edgePadding: 72,
  safeBoundaryY: 7200,
  playerSpawn: { x: 800, y: 8150 },
  encounterCenter: { x: 800, y: 6100 },
  zones: [
    { id: 'danger', name: 'U Minh Cốc', yMin: 0, yMax: 2200, fill: 0xb8b29d },
    { id: 'forest', name: 'Linh Lâm', yMin: 2200, yMax: 4600, fill: 0xc3ccb0 },
    // Plains and settlement share the same paper as the legacy corridor so the
    // old straight-road rectangle is visually neutral while authored painterly
    // path decals define the approach into Thanh Vân Thôn.
    { id: 'plains', name: 'Thanh Vân Hoang Nguyên', yMin: 4600, yMax: 7200, fill: 0xe8dec4 },
    { id: 'settlement', name: 'Thanh Vân Thôn', yMin: 7200, yMax: 9000, fill: 0xe8dec4 },
  ] satisfies WorldZone[],
};

export function zoneAt(y: number): WorldZone {
  return WORLD.zones.find((zone) => y >= zone.yMin && y < zone.yMax) ?? WORLD.zones[WORLD.zones.length - 1];
}

export function isSettlementY(y: number): boolean {
  return y >= WORLD.safeBoundaryY;
}
