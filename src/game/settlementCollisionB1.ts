// Proof B1: grounded collision in the Healer pocket only. World coordinates are
// aligned with settlementV2AProduction (settlement top = 7200).
// Art remains separate; none of these shapes alter combat or NPC hit checks.
type Point = readonly [number, number];
type Footprint =
  | { kind: 'box'; left: number; right: number; top: number; bottom: number }
  | { kind: 'circle'; x: number; y: number; radius: number }
  | { kind: 'segment'; from: Point; to: Point; halfWidth: number }
  | { kind: 'water'; vertices: readonly Point[] };

export const HEALER_B1_FOOT_RADIUS = 11;
const STEP_LENGTH = 5;

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
  // The short adjacent creek east of the bridge. The dry diagonal gap
  // between the two water polygons follows the visible planks from
  // roughly (418, 8482) to (483, 8536), with room for the player's feet.
  { kind: 'water', vertices: [
    [474, 8469], [506, 8448], [556, 8435], [622, 8442],
    [651, 8460], [640, 8488], [603, 8506], [548, 8519],
    [498, 8528], [484, 8515], [482, 8498],
  ] },
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
  // Broad phase confines all new collision to this one pocket.
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
    } else if (insidePolygon(x, y, shape.vertices)
      || shape.vertices.some((point, index) => segmentDistanceSquared(
        x, y, point, shape.vertices[(index + 1) % shape.vertices.length],
      ) < r * r)) {
      return true;
    }
  }
  return false;
}

export function moveWithHealerB1Collision(
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
    if (!isHealerB1Blocked(nextX, nextY)) {
      x = nextX;
      y = nextY;
      continue;
    }
    // Resolve each axis independently so diagonal movement slides along
    // a house wall, fence, or bank instead of stopping on first contact.
    if (!isHealerB1Blocked(nextX, y)) x = nextX;
    if (!isHealerB1Blocked(x, nextY)) y = nextY;
  }
  return [x, y];
}
