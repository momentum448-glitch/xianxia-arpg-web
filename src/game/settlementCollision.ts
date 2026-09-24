// Settlement collision: accepted B1 Healer pocket plus gated B2A grounded static footprints.
// World coordinates align with settlementV2AProduction (settlement top = 7200).
// Art remains separate; none of these shapes alter combat or NPC hit checks.
type Point = readonly [number, number];
type Footprint =
  | { kind: 'box'; left: number; right: number; top: number; bottom: number }
  | { kind: 'circle'; x: number; y: number; radius: number }
  | { kind: 'segment'; from: Point; to: Point; halfWidth: number }
  | { kind: 'water'; vertices: readonly Point[] };

export const HEALER_B1_FOOT_RADIUS = 11;
// The player container is centered on the control rectangle. Its visible
// contact shadow/feet sit 31 units below that center (actorVisuals.ts).
const FOOT_OFFSET_Y = 31;
const STEP_LENGTH = 5;

// The bridge is a separate walkable crossing through otherwise continuous
// water. Endpoints follow the actual plank deck in the 440 × 247 runtime
// placement at (445, 8510); only the small foot contact disk may overhang.
export const HEALER_B1_BRIDGE = {
  from: [414, 8482] as Point,
  to: [488, 8540] as Point,
  halfWidth: 18,
} as const;

// Only the grounded lower mass of the house blocks; the roof and front forecourt do not.
export const HEALER_B1_FOOTPRINTS: readonly Footprint[] = [
  { kind: 'box', left: 366, right: 566, top: 8298, bottom: 8337 },
  // Tree art is 168 wide at (255, 8365); only its trunk/base blocks.
  { kind: 'circle', x: 255, y: 8358, radius: 19 },
  // Narrow functional fence to the east of the house, including its posts.
  { kind: 'segment', from: [615, 8346], to: [746, 8370], halfWidth: 7 },
  // The creek approaches from the west. These deliberately inset banks use
  // simple polygons, leaving ground detail and the visual canopy traversable.
  { kind: 'water', vertices: [
    [96, 8322], [154, 8338], [238, 8378], [325, 8410],
    [390, 8443], [393, 8458], [382, 8473], [365, 8475],
    [350, 8468], [285, 8445], [191, 8404], [96, 8364],
  ] },
  // The pond on the west side of the existing wooden bridge.
  { kind: 'water', vertices: [
    [234, 8509], [284, 8479], [350, 8468], [380, 8484],
    [390, 8499], [386, 8517], [400, 8532], [420, 8545],
    [396, 8577], [324, 8593], [254, 8574], [224, 8544],
  ] },
  // The short adjacent creek east of the bridge.
  { kind: 'water', vertices: [
    [474, 8469], [506, 8448], [556, 8435], [622, 8442],
    [651, 8460], [640, 8488], [603, 8506], [548, 8519],
    [525, 8530], [515, 8514], [512, 8498],
  ] },
  // Join pond and creek under the bridge. Previously their missing space
  // included visible cyan water just east of the northern planks. The bridge
  // corridor below, rather than this polygon's absence, now opens the path.
  { kind: 'water', vertices: [
    [382, 8475], [418, 8458], [463, 8454], [506, 8448],
    [532, 8463], [531, 8493], [552, 8521], [524, 8540],
    [474, 8541], [421, 8535], [392, 8525], [380, 8500],
  ] },
];

// B2A uses only visually grounded shapes from the active V2A placements.
// House boxes sit on the lower base; tree circles cover trunk contact only.
// Fence follows its narrow authored plank line. No B2A water or crop collision is added.
export const SETTLEMENT_B2A_FOOTPRINTS: readonly Footprint[] = [
  // Elder hall runtime anchor: (470, 7775), display width 315.
  { kind: 'box', left: 370, right: 570, top: 7723, bottom: 7762 },
  // Elder tree runtime ground anchor: (270, 7815), display width 185.
  { kind: 'circle', x: 270, y: 7808, radius: 21 },
  // Elder functional fence, runtime anchor (660, 7815), width 195, unflipped.
  { kind: 'segment', from: [590, 7791], to: [730, 7815], halfWidth: 7 },

  // Merchant stall runtime ground anchor: (1060, 8050), display width 270.
  { kind: 'box', left: 990, right: 1130, top: 8019, bottom: 8045 },
  // Merchant cart runtime ground anchor: (1310, 8060), display width 180.
  { kind: 'box', left: 1240, right: 1380, top: 8034, bottom: 8059 },
  // Merchant-side reachable tree ground anchor: (1340, 7860), width 165.
  { kind: 'circle', x: 1340, y: 7853, radius: 19 },

  // Southwest thatch house runtime anchor: (295, 8765), display width 292.
  { kind: 'box', left: 195, right: 395, top: 8713, bottom: 8752 },
  // Southeast tile house runtime anchor: (1275, 8685), display width 310.
  { kind: 'box', left: 1170, right: 1380, top: 8633, bottom: 8672 },
  // Southeast reachable tree ground anchor: (1230, 8525), width 168.
  { kind: 'circle', x: 1230, y: 8518, radius: 19 },
  // The southwest tree anchor lies fully inside the accepted B1 pond blocker;
  // adding another footprint there would duplicate the already-tested water collision.
];

function segmentDistanceSquared(px: number, py: number, from: Point, to: Point): number {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared ? Math.max(0, Math.min(1,
    ((px - from[0]) * dx + (py - from[1]) * dy) / lengthSquared)) : 0;
  const x = from[0] + t * dx;
  const y = from[1] + t * dy;
  return (px - x) ** 2 + (py - y) ** 2;
}

function insidePolygon(x: number, y: number, vertices: readonly Point[]): boolean {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i, i += 1) {
    const a = vertices[i];
    const b = vertices[j];
    if ((a[1] > y) !== (b[1] > y)
      && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) {
      inside = !inside;
    }
  }
  return inside;
}

export function isHealerB1Blocked(x: number, y: number): boolean {
  // Broad phase confines the accepted B1 water/Healer geometry to its pocket.
  if (x < 60 || x > 770 || y < 8275 || y > 8620) return false;
  const r = HEALER_B1_FOOT_RADIUS;
  for (const shape of HEALER_B1_FOOTPRINTS) {
    if (shape.kind === 'box') {
      const closestX = Math.max(shape.left, Math.min(x, shape.right));
      const closestY = Math.max(shape.top, Math.min(y, shape.bottom));
      if ((x - closestX) ** 2 + (y - closestY) ** 2 < r * r) return true;
    } else if (shape.kind === 'circle') {
      if ((x - shape.x) ** 2 + (y - shape.y) ** 2
        < (r + shape.radius) ** 2) return true;
    } else if (shape.kind === 'segment') {
      if (segmentDistanceSquared(x, y, shape.from, shape.to)
        < (r + shape.halfWidth) ** 2) return true;
    } else {
      const touchesWater = insidePolygon(x, y, shape.vertices)
        || shape.vertices.some((point, index) => segmentDistanceSquared(
          x, y, point, shape.vertices[(index + 1) % shape.vertices.length],
        ) < r * r);
      if (touchesWater && segmentDistanceSquared(
        x, y, HEALER_B1_BRIDGE.from, HEALER_B1_BRIDGE.to,
      ) > HEALER_B1_BRIDGE.halfWidth ** 2) return true;
    }
  }
  return false;
}

export function isSettlementBlocked(x: number, y: number): boolean {
  if (isHealerB1Blocked(x, y)) return true;

  const r = HEALER_B1_FOOT_RADIUS;
  for (const shape of SETTLEMENT_B2A_FOOTPRINTS) {
    if (shape.kind === 'box') {
      const closestX = Math.max(shape.left, Math.min(x, shape.right));
      const closestY = Math.max(shape.top, Math.min(y, shape.bottom));
      if ((x - closestX) ** 2 + (y - closestY) ** 2 < r * r) return true;
    } else if (shape.kind === 'circle') {
      if ((x - shape.x) ** 2 + (y - shape.y) ** 2
        < (r + shape.radius) ** 2) return true;
    } else if (shape.kind === 'segment') {
      if (segmentDistanceSquared(x, y, shape.from, shape.to)
        < (r + shape.halfWidth) ** 2) return true;
    }
  }
  return false;
}

export function moveWithSettlementCollision(
  x: number, y: number, dx: number, dy: number,
  edgePadding: number, worldWidth: number, worldHeight: number,
): Point {
  const clampX = (value: number): number =>
    Math.max(edgePadding, Math.min(worldWidth - edgePadding, value));
  const clampY = (value: number): number =>
    Math.max(edgePadding, Math.min(worldHeight - edgePadding, value));
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / STEP_LENGTH));
  const stepX = dx / steps;
  const stepY = dy / steps;

  for (let step = 0; step < steps; step += 1) {
    const nextX = clampX(x + stepX);
    const nextY = clampY(y + stepY);
    if (!isSettlementBlocked(nextX, nextY + FOOT_OFFSET_Y)) {
      x = nextX;
      y = nextY;
      continue;
    }
    // Resolve each axis independently so diagonal movement slides along
    // a house wall, fence, or bank instead of stopping on first contact.
    if (!isSettlementBlocked(nextX, y + FOOT_OFFSET_Y)) x = nextX;
    if (!isSettlementBlocked(x, nextY + FOOT_OFFSET_Y)) y = nextY;
  }
  return [x, y];
}
