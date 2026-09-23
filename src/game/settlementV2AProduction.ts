import Phaser from 'phaser';
import { C4_ASSETS } from './art/assetManifest';
import { SETTLEMENT_HOUSE_TEXTURES } from './environmentVisuals';
import type { WorldZone } from './worldConfig';

export const SETTLEMENT_V2A_TEXTURES = {
  tree: 'prod-v2a-tree-a',
  treeRuntime: 'prod-v2a-tree-a-runtime',
  fence: 'prod-v2a-fence-a',
  rockGrass: 'prod-v2a-rockgrass-a',
  lantern: 'prod-v2a-lantern-a',
  merchantStall: 'prod-v2a-merchant-stall-b',
  merchantCart: 'prod-v2a-merchant-cart-b',
  merchantGoods: 'prod-v2a-merchant-goods-b',
  merchantSign: 'prod-v2a-merchant-sign-b',
  healerWaterBridge: 'prod-v2a-healer-water-bridge-a',
  healerHerbBed: 'prod-v2a-healer-herb-bed-a',
  healerDrying: 'prod-v2a-healer-drying-a',
  fieldEdge: 'prod-v2a-field-edge-b',
  terrainUnderlay: 'prod-v2a-terrain-underlay-v1',
} as const;

export const SETTLEMENT_V2A_PRELOADS = [
  [SETTLEMENT_V2A_TEXTURES.tree, C4_ASSETS.settlementTreeA],
  [SETTLEMENT_V2A_TEXTURES.fence, C4_ASSETS.settlementFenceA],
  [SETTLEMENT_V2A_TEXTURES.rockGrass, C4_ASSETS.settlementRockGrassA],
  [SETTLEMENT_V2A_TEXTURES.lantern, C4_ASSETS.settlementLanternPostA],
  [SETTLEMENT_V2A_TEXTURES.merchantStall, C4_ASSETS.settlementMerchantStallB],
  [SETTLEMENT_V2A_TEXTURES.merchantCart, C4_ASSETS.settlementMerchantCartB],
  [SETTLEMENT_V2A_TEXTURES.merchantGoods, C4_ASSETS.settlementMerchantGoodsB],
  [SETTLEMENT_V2A_TEXTURES.merchantSign, C4_ASSETS.settlementMerchantSignB],
  [SETTLEMENT_V2A_TEXTURES.healerWaterBridge, C4_ASSETS.settlementHealerWaterBridgeA],
  [SETTLEMENT_V2A_TEXTURES.healerHerbBed, C4_ASSETS.settlementHealerHerbBedA],
  [SETTLEMENT_V2A_TEXTURES.healerDrying, C4_ASSETS.settlementHealerDryingPropsA],
  [SETTLEMENT_V2A_TEXTURES.fieldEdge, C4_ASSETS.settlementFieldEdgeKitB],
] as const;

export const SETTLEMENT_V2A_SVG_PRELOADS = [
  [SETTLEMENT_V2A_TEXTURES.terrainUnderlay, C4_ASSETS.settlementTerrainWholeMapV1],
] as const;

const GROUND_RUNTIME = {
  pathA: 'c4-settlement-path-a-masked',
  pathB: 'c4-settlement-path-b-masked',
  patch: 'c4-settlement-ground-patch-a-masked',
  forecourt: 'c4-settlement-forecourt-a-masked',
} as const;

// Topology Revision A moves whole accepted pockets without changing their internal composition.
// The active village mass is compressed vertically and pulled inward toward the main spine.
const TOPOLOGY_REVISION_A = {
  elder: { dx: 120, dy: 20 },
  merchant: { dx: -150, dy: -75 },
  healer: { dx: 120, dy: -145 },
  southWest: { dx: 220, dy: -185 },
  southEast: { dx: -260, dy: -180 },
  field: { dx: -85, dy: -175 },
} as const;

function removeLegacySettlementArt(scene: Phaser.Scene, zone: WorldZone): void {
  for (const child of [...scene.children.list]) {
    const candidate = child as Phaser.GameObjects.GameObject & { depth?: number; y?: number };
    const depth = candidate.depth ?? 0;
    if (depth >= 0 || depth <= -10) continue;
    const y = typeof candidate.y === 'number' ? candidate.y : Number.NEGATIVE_INFINITY;
    if (y >= zone.yMin - 4) child.destroy();
  }
}

function prepareTreeRuntimeTexture(scene: Phaser.Scene): void {
  const sourceKey = SETTLEMENT_V2A_TEXTURES.tree;
  const outputKey = SETTLEMENT_V2A_TEXTURES.treeRuntime;
  if (scene.textures.exists(outputKey) || !scene.textures.exists(sourceKey)) return;

  const source = scene.textures.get(sourceKey).getSourceImage() as CanvasImageSource & {
    width: number;
    height: number;
  };
  const width = source.width;
  const height = source.height;
  const target = scene.textures.createCanvas(outputKey, width, height);
  if (!target) return;

  const context = target.getContext();
  context.clearRect(0, 0, width, height);
  context.drawImage(source, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const isBackgroundCandidate = (index: number): boolean => {
    const offset = index * 4;
    const alpha = pixels[offset + 3];
    return alpha <= 8 || (
      pixels[offset] <= 12
      && pixels[offset + 1] <= 12
      && pixels[offset + 2] <= 12
    );
  };

  const enqueue = (x: number, y: number): void => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const index = y * width + x;
    if (visited[index] || !isBackgroundCandidate(index)) return;
    visited[index] = 1;
    queue[tail] = index;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (head < tail) {
    const index = queue[head];
    head += 1;
    const offset = index * 4;
    pixels[offset] = 0;
    pixels[offset + 1] = 0;
    pixels[offset + 2] = 0;
    pixels[offset + 3] = 0;
    const x = index % width;
    const y = Math.floor(index / width);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  context.putImageData(imageData, 0, 0);
  target.refresh();
}

function addGroundImage(
  scene: Phaser.Scene,
  texture: string,
  x: number,
  y: number,
  width: number,
  rotation = 0,
  flipX = false,
  alpha = 0.85,
): Phaser.GameObjects.Image {
  const image = scene.add.image(x, y, texture)
    .setOrigin(0.5)
    .setRotation(rotation)
    .setAlpha(alpha)
    .setDepth(-7);
  const scale = image.width > 0 ? width / image.width : 1;
  image.setScale(flipX ? -scale : scale, scale);
  return image;
}

function addAsset(
  scene: Phaser.Scene,
  texture: string,
  x: number,
  groundY: number,
  width: number,
  flipX = false,
  alpha = 1,
  depth = -3,
): Phaser.GameObjects.Image {
  const image = scene.add.image(x, groundY, texture)
    .setOrigin(0.5, 1)
    .setFlipX(flipX)
    .setAlpha(alpha)
    .setDepth(depth);
  const ratio = image.height > 0 && image.width > 0 ? image.height / image.width : 1;
  image.setDisplaySize(width, width * ratio);
  return image;
}

function addHerbGarden(scene: Phaser.Scene, top: number, dx = 0, dy = 0): void {
  const x = 125 + dx;
  const y = top + 1335 + dy;
  const width = 205;
  const height = 126;
  const herbBed = scene.add.image(x, y, SETTLEMENT_V2A_TEXTURES.healerHerbBed)
    .setOrigin(0.5)
    .setDisplaySize(width, height)
    .setDepth(-2.8)
    .setAlpha(0.95);

  const footprint = [
    [0.20, 0.10], [0.35, 0.02], [0.53, 0.00], [0.68, 0.07], [0.81, 0.17],
    [0.91, 0.31], [0.95, 0.49], [0.92, 0.66], [0.85, 0.79], [0.74, 0.90],
    [0.60, 0.98], [0.43, 1.00], [0.29, 0.95], [0.16, 0.87], [0.07, 0.74],
    [0.04, 0.58], [0.06, 0.42], [0.11, 0.29], [0.17, 0.21],
  ] as const;
  const maskGraphics = scene.make.graphics({}, false);
  const left = x - width / 2;
  const maskTop = y - height / 2;
  maskGraphics.fillStyle(0xffffff, 1);
  maskGraphics.beginPath();
  footprint.forEach(([nx, ny], index) => {
    const px = left + nx * width;
    const py = maskTop + ny * height;
    if (index === 0) maskGraphics.moveTo(px, py);
    else maskGraphics.lineTo(px, py);
  });
  maskGraphics.closePath();
  maskGraphics.fillPath();
  herbBed.setMask(maskGraphics.createGeometryMask());
}

export function promoteLockedSettlementV2A(scene: Phaser.Scene, zone: WorldZone): void {
  const top = zone.yMin;
  removeLegacySettlementArt(scene, zone);
  prepareTreeRuntimeTexture(scene);

  scene.add.rectangle(800, top + 900, 1600, 1800, 0xe7dcc2, 1).setDepth(-9.5);
  if (scene.textures.exists(SETTLEMENT_V2A_TEXTURES.terrainUnderlay)) {
    scene.add.image(800, top + 900, SETTLEMENT_V2A_TEXTURES.terrainUnderlay)
      .setOrigin(0.5)
      .setDisplaySize(1600, 1800)
      .setDepth(-8.8);
  }

  const patches = [
    // Northern threshold wash softens the empty approach without adding a new POI.
    { x: 800, y: 330, w: 340, r: 0.01, flip: true, alpha: 0.17 },
    { x: 760, y: 500, w: 390, r: -0.02, flip: false, alpha: 0.22 },
    { x: 850, y: 810, w: 410, r: 0.03, flip: true, alpha: 0.25 },
    { x: 760, y: 1115, w: 395, r: -0.03, flip: false, alpha: 0.24 },
    { x: 835, y: 1435, w: 380, r: 0.03, flip: true, alpha: 0.22 },
  ] as const;
  for (const patch of patches) {
    addGroundImage(scene, GROUND_RUNTIME.patch, patch.x, top + patch.y, patch.w, patch.r, patch.flip, patch.alpha);
  }

  const pathPieces = [
    { texture: GROUND_RUNTIME.pathA, x: 820, y: 95, w: 214, r: -0.02, flip: false },
    { texture: GROUND_RUNTIME.pathB, x: 790, y: 250, w: 218, r: 0.06, flip: true },
    { texture: GROUND_RUNTIME.pathA, x: 745, y: 410, w: 220, r: -0.10, flip: true },
    { texture: GROUND_RUNTIME.pathB, x: 760, y: 570, w: 224, r: -0.08, flip: false },
    { texture: GROUND_RUNTIME.pathA, x: 820, y: 730, w: 220, r: 0.08, flip: false },
    { texture: GROUND_RUNTIME.pathB, x: 835, y: 890, w: 220, r: 0.10, flip: true },
    { texture: GROUND_RUNTIME.pathA, x: 785, y: 1050, w: 218, r: -0.08, flip: false },
    { texture: GROUND_RUNTIME.pathB, x: 755, y: 1210, w: 218, r: -0.08, flip: false },
    { texture: GROUND_RUNTIME.pathA, x: 790, y: 1370, w: 216, r: 0.08, flip: true },
    { texture: GROUND_RUNTIME.pathB, x: 815, y: 1530, w: 212, r: -0.04, flip: true },
    { texture: GROUND_RUNTIME.pathA, x: 805, y: 1685, w: 205, r: 0.02, flip: false },
  ] as const;
  for (const piece of pathPieces) {
    addGroundImage(scene, piece.texture, piece.x, top + piece.y, piece.w, piece.r, piece.flip, 0.74);
  }

  const branches = [
    // A1: make the three hero-pocket branches read clearly at 0.5x without becoming roads of equal rank.
    { texture: GROUND_RUNTIME.pathA, x: 625, y: 575, w: 248, r: 1.18, flip: true, alpha: 0.80 },
    { texture: GROUND_RUNTIME.pathB, x: 945, y: 820, w: 225, r: -1.16, flip: false, alpha: 0.80 },
    { texture: GROUND_RUNTIME.pathA, x: 625, y: 1145, w: 248, r: 1.15, flip: false, alpha: 0.84 },
    { texture: GROUND_RUNTIME.pathB, x: 995, y: 1430, w: 200, r: -1.15, flip: true, alpha: 0.64 },
  ] as const;
  for (const branch of branches) {
    addGroundImage(scene, branch.texture, branch.x, top + branch.y, branch.w, branch.r, branch.flip, branch.alpha);
  }

  const forecourts = [
    { x: 800, y: 390, w: 245, r: 0.02, flip: true, alpha: 0.22 },
    { x: 470, y: 605, w: 295, r: -0.04, flip: false, alpha: 0.62 },
    { x: 1060, y: 915, w: 320, r: 0.04, flip: true, alpha: 0.72 },
    { x: 470, y: 1190, w: 310, r: -0.03, flip: true, alpha: 0.70 },
    { x: 1065, y: 1525, w: 275, r: 0.04, flip: false, alpha: 0.44 },
  ] as const;
  for (const forecourt of forecourts) {
    addGroundImage(scene, GROUND_RUNTIME.forecourt, forecourt.x, top + forecourt.y, forecourt.w, forecourt.r, forecourt.flip, forecourt.alpha);
  }

  const tree = scene.textures.exists(SETTLEMENT_V2A_TEXTURES.treeRuntime)
    ? SETTLEMENT_V2A_TEXTURES.treeRuntime
    : SETTLEMENT_V2A_TEXTURES.tree;

  // Whole-map V1 removes the free-standing entry fences; the natural edge now frames the threshold.
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.lantern, 835, top + 260, 76, false, 0.96);
  addAsset(scene, tree, 150, top + 330, 178, false, 0.88);
  addAsset(scene, tree, 1460, top + 355, 184, true, 0.86);

  const elder = TOPOLOGY_REVISION_A.elder;
  addAsset(scene, SETTLEMENT_HOUSE_TEXTURES.hallA, 350 + elder.dx, top + 555 + elder.dy, 315);
  addAsset(scene, tree, 150 + elder.dx, top + 575 + elder.dy, 185, false, 0.96);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.fence, 540 + elder.dx, top + 595 + elder.dy, 195, false, 0.94);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 535 + elder.dx, top + 510 + elder.dy, 120, false, 0.92);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.lantern, 615 + elder.dx, top + 570 + elder.dy, 74, false, 0.96);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 235 + elder.dx, top + 650 + elder.dy, 105, true, 0.82);

  const merchant = TOPOLOGY_REVISION_A.merchant;
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.merchantStall, 1210 + merchant.dx, top + 925 + merchant.dy, 270);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.merchantSign, 1040 + merchant.dx, top + 900 + merchant.dy, 60);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.merchantGoods, 1325 + merchant.dx, top + 975 + merchant.dy, 135);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.merchantCart, 1460 + merchant.dx, top + 935 + merchant.dy, 180);
  addAsset(scene, tree, 1490 + merchant.dx, top + 735 + merchant.dy, 165, false, 0.86);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 990 + merchant.dx, top + 965 + merchant.dy, 118, true, 0.84);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.lantern, 990 + merchant.dx, top + 845 + merchant.dy, 72, false, 0.94);

  const healer = TOPOLOGY_REVISION_A.healer;
  addAsset(scene, SETTLEMENT_HOUSE_TEXTURES.thatchB, 350 + healer.dx, top + 1295 + healer.dy, 292);
  addAsset(scene, tree, 135 + healer.dx, top + 1310 + healer.dy, 168, true, 0.92);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.fence, 565 + healer.dx, top + 1315 + healer.dy, 182, true, 0.91);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 540 + healer.dx, top + 1225 + healer.dy, 112, true, 0.90);
  addAsset(scene, SETTLEMENT_V2A_TEXTURES.lantern, 615 + healer.dx, top + 1265 + healer.dy, 72, false, 0.94);

  scene.add.image(325 + healer.dx, top + 1455 + healer.dy, SETTLEMENT_V2A_TEXTURES.healerWaterBridge)
    .setOrigin(0.5)
    .setDisplaySize(440, 247)
    .setTint(0xe8e1d8)
    .setAlpha(0.96)
    .setDepth(-6);
  addHerbGarden(scene, top, healer.dx, healer.dy);
  scene.add.image(548 + healer.dx, top + 1340 + healer.dy, SETTLEMENT_V2A_TEXTURES.healerDrying)
    .setOrigin(0.5)
    .setDisplaySize(112, 124)
    .setAlpha(0.95)
    .setDepth(-2.7);

  const southWest = TOPOLOGY_REVISION_A.southWest;
  const southEast = TOPOLOGY_REVISION_A.southEast;
  const field = TOPOLOGY_REVISION_A.field;
  addAsset(scene, SETTLEMENT_HOUSE_TEXTURES.thatchA, 75 + southWest.dx, top + 1750 + southWest.dy, 292, false, 0.84);
  addAsset(scene, SETTLEMENT_HOUSE_TEXTURES.tileA, 1535 + southEast.dx, top + 1665 + southEast.dy, 310, true, 0.82);
  addAsset(scene, tree, 120 + southWest.dx, top + 1540 + southWest.dy, 155, false, 0.74);
  addAsset(scene, tree, 1490 + southEast.dx, top + 1505 + southEast.dy, 168, true, 0.76);
  // Remove floating southern fence stamps; field/terrain edges now carry the boundary logic.

  scene.add.image(1210 + field.dx, top + 1620 + field.dy, SETTLEMENT_V2A_TEXTURES.fieldEdge)
    .setOrigin(0.5)
    .setDisplaySize(320, 180)
    .setAlpha(0.96)
    .setDepth(-7.2);
}
