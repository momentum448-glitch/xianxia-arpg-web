import Phaser from 'phaser';
import type { WorldZone } from './worldConfig';

export const SETTLEMENT_HOUSE_TEXTURES = {
  thatchA: 'c4-settlement-house-thatch-a',
  tileA: 'c4-settlement-house-tile-a',
  hallA: 'c4-settlement-house-hall-a',
  thatchB: 'c4-settlement-house-thatch-b',
} as const;

export const SETTLEMENT_GROUND_TEXTURES = {
  pathA: 'c4-settlement-path-a',
  pathB: 'c4-settlement-path-b',
  patchA: 'c4-settlement-ground-patch-a',
  forecourtA: 'c4-settlement-forecourt-a',
} as const;

const SETTLEMENT_GROUND_RUNTIME_TEXTURES = {
  pathA: 'c4-settlement-path-a-masked',
  pathB: 'c4-settlement-path-b-masked',
  patchA: 'c4-settlement-ground-patch-a-masked',
  forecourtA: 'c4-settlement-forecourt-a-masked',
} as const;

type SettlementHouseTexture = typeof SETTLEMENT_HOUSE_TEXTURES[keyof typeof SETTLEMENT_HOUSE_TEXTURES];
type GroundMaskMode = 'path-a' | 'path-b' | 'patch' | 'forecourt';

const SETTLEMENT = {
  warmPaper: 0xe3d5b5,
  soil: 0xc8b287,
  dryGrass: 0x9b956f,
  oldWood: 0x765f43,
  stone: 0x8d8878,
  moss: 0x7b8065,
  foliage: 0x65745d,
  foliageDark: 0x4f5f50,
} as const;

function addPaperWash(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  alpha: number,
  rotation = 0,
): void {
  scene.add.ellipse(x, y, width, height, color, alpha)
    .setRotation(rotation)
    .setDepth(-9);
}

function roughUnit(seed: number, index: number): number {
  return Math.sin(seed * 12.9898 + index * 78.233) * 0.5
    + Math.sin(seed * 4.123 + index * 19.19) * 0.25;
}

function addRoughPatch(
  scene: Phaser.Scene,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  color: number,
  alpha: number,
  seed: number,
  depth: number,
  pointsCount = 18,
): void {
  const points: Phaser.Math.Vector2[] = [];
  for (let i = 0; i < pointsCount; i += 1) {
    const angle = (i / pointsCount) * Math.PI * 2;
    const ripple = 1 + roughUnit(seed, i) * 0.16;
    points.push(new Phaser.Math.Vector2(
      x + Math.cos(angle) * radiusX * ripple,
      y + Math.sin(angle) * radiusY * ripple,
    ));
  }

  scene.add.graphics()
    .fillStyle(color, alpha)
    .fillPoints(points, true)
    .setDepth(depth);
}

function addHouseGrounding(
  scene: Phaser.Scene,
  x: number,
  y: number,
  displayWidth: number,
  flip = false,
): void {
  const direction = flip ? -1 : 1;

  addRoughPatch(scene, x, y + 50, displayWidth * 0.43, displayWidth * 0.105, 0x3f392f, 0.075, 21, -5);
  addRoughPatch(
    scene,
    x + 14 * direction,
    y + 57,
    displayWidth * 0.37,
    displayWidth * 0.078,
    SETTLEMENT.soil,
    0.15,
    31,
    -4,
  );

  const marks = [
    { dx: -0.36, dy: 0.2, rx: 0.07, ry: 0.022, color: SETTLEMENT.moss, alpha: 0.12, seed: 41 },
    { dx: 0.3, dy: 0.24, rx: 0.055, ry: 0.019, color: SETTLEMENT.dryGrass, alpha: 0.12, seed: 43 },
    { dx: -0.18, dy: 0.29, rx: 0.045, ry: 0.016, color: SETTLEMENT.stone, alpha: 0.11, seed: 47 },
    { dx: 0.4, dy: 0.15, rx: 0.038, ry: 0.014, color: SETTLEMENT.moss, alpha: 0.1, seed: 53 },
  ];

  for (const mark of marks) {
    addRoughPatch(
      scene,
      x + mark.dx * displayWidth * direction,
      y + mark.dy * displayWidth,
      mark.rx * displayWidth,
      mark.ry * displayWidth,
      mark.color,
      mark.alpha,
      mark.seed,
      -4,
      10,
    );
  }
}

function addHouse(
  scene: Phaser.Scene,
  x: number,
  y: number,
  textureKey: SettlementHouseTexture,
  displayWidth: number,
  flipX = false,
): void {
  if (!scene.textures.exists(textureKey)) {
    scene.add.rectangle(x, y, displayWidth, 150, 0xff00aa, 0.75)
      .setStrokeStyle(4, 0xffffff, 0.9)
      .setDepth(-3);
    scene.add.text(x, y, 'HOUSE TEX MISS', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: '#7a004f',
      padding: { x: 6, y: 4 },
    }).setOrigin(0.5).setDepth(-2);
    return;
  }

  const image = scene.add.image(x, y, textureKey)
    .setOrigin(0.5, 0.58)
    .setDepth(-3);
  const scale = displayWidth / image.width;
  image.setScale(flipX ? -scale : scale, scale);
}

function addFence(scene: Phaser.Scene, x: number, y: number, width: number): void {
  const postCount = Math.max(3, Math.round(width / 54));
  const spacing = width / (postCount - 1);
  for (let i = 0; i < postCount; i += 1) {
    scene.add.rectangle(x - width / 2 + i * spacing, y, 8, 38, SETTLEMENT.oldWood, 0.36)
      .setDepth(-4);
  }
  scene.add.rectangle(x, y - 8, width, 7, SETTLEMENT.oldWood, 0.3).setDepth(-4);
  scene.add.rectangle(x, y + 8, width, 7, SETTLEMENT.oldWood, 0.25).setDepth(-4);
}

function addTreeCluster(scene: Phaser.Scene, x: number, y: number, scale: number): void {
  const shadow = scene.add.ellipse(0, 28, 92, 30, 0x2c3029, 0.06);
  const trunk = scene.add.rectangle(0, 10, 14, 54, SETTLEMENT.oldWood, 0.42);
  const crownA = scene.add.circle(-18, -18, 34, SETTLEMENT.foliageDark, 0.3);
  const crownB = scene.add.circle(16, -24, 40, SETTLEMENT.foliage, 0.3);
  const crownC = scene.add.circle(0, -47, 30, SETTLEMENT.foliage, 0.24);
  scene.add.container(x, y, [shadow, trunk, crownA, crownB, crownC])
    .setScale(scale)
    .setDepth(-4);
}

function addStonePatch(scene: Phaser.Scene, x: number, y: number, flip = false): void {
  const direction = flip ? -1 : 1;
  scene.add.ellipse(x, y, 62, 24, SETTLEMENT.stone, 0.12).setDepth(-6);
  scene.add.ellipse(x + 32 * direction, y + 8, 34, 18, SETTLEMENT.stone, 0.1).setDepth(-6);
  scene.add.ellipse(x - 24 * direction, y - 8, 26, 14, SETTLEMENT.moss, 0.1).setDepth(-6);
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function createMaskedGroundTexture(
  scene: Phaser.Scene,
  sourceKey: string,
  outputKey: string,
  mode: GroundMaskMode,
): void {
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

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4 + 3;
      const originalAlpha = pixels[index] / 255;
      let mask = 1;

      if (mode === 'path-a' || mode === 'path-b') {
        const phase = mode === 'path-a' ? 0.2 : 1.3;
        const centerAmp = width * (mode === 'path-a' ? 0.052 : 0.06);
        const center = width * 0.5
          + centerAmp * Math.sin((y / height) * Math.PI * 2 * 1.15 + phase)
          + width * 0.02 * Math.sin((y / height) * Math.PI * 2 * 2.4 + phase * 0.3);
        const halfBase = width * (mode === 'path-a' ? 0.26 : 0.25);
        const halfWidth = halfBase
          + width * 0.045 * Math.sin((y / height) * Math.PI * 2 * 1.6 + phase + 0.8)
          + width * 0.016 * Math.sin((y / height) * Math.PI * 2 * 3.3 + 0.2);
        const feather = width * 0.083;
        const sideMask = clamp01((halfWidth + feather - Math.abs(x - center)) / feather);
        const fade = height * 0.18;
        const verticalMask = Math.min(clamp01(y / fade), clamp01((height - 1 - y) / fade));
        mask = sideMask * verticalMask;
      } else if (mode === 'patch') {
        const nx = (x - width * 0.5) / (width * 0.46);
        const ny = (y - height * 0.5) / (height * 0.46);
        const radius = Math.sqrt(nx * nx + ny * ny);
        mask = clamp01((1.08 - radius) / 0.12);
      } else {
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        mask = clamp01(edgeDistance / 14);
      }

      const maskedAlpha = originalAlpha * mask;
      pixels[index] = maskedAlpha < 0.035 ? 0 : Math.round(maskedAlpha * 255);
    }
  }

  context.putImageData(imageData, 0, 0);
  target.refresh();
}

function prepareSettlementGroundTextures(scene: Phaser.Scene): void {
  createMaskedGroundTexture(
    scene,
    SETTLEMENT_GROUND_TEXTURES.pathA,
    SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA,
    'path-a',
  );
  createMaskedGroundTexture(
    scene,
    SETTLEMENT_GROUND_TEXTURES.pathB,
    SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB,
    'path-b',
  );
  createMaskedGroundTexture(
    scene,
    SETTLEMENT_GROUND_TEXTURES.patchA,
    SETTLEMENT_GROUND_RUNTIME_TEXTURES.patchA,
    'patch',
  );
  createMaskedGroundTexture(
    scene,
    SETTLEMENT_GROUND_TEXTURES.forecourtA,
    SETTLEMENT_GROUND_RUNTIME_TEXTURES.forecourtA,
    'forecourt',
  );
}

function trimLegacyWorldCorridorForSettlement(scene: Phaser.Scene, zone: WorldZone): void {
  const legacyRoad = scene.children.list.find((child) =>
    child instanceof Phaser.GameObjects.Rectangle
    && child.depth === -8
    && Math.abs(child.x - 800) < 1
    && Math.abs(child.displayWidth - 170) < 1
    && child.displayHeight > zone.yMax - zone.yMin
  );

  if (!(legacyRoad instanceof Phaser.GameObjects.Rectangle)) return;

  const transitionLength = 320;
  const roadEndY = zone.yMin - transitionLength;
  legacyRoad.setPosition(800, roadEndY / 2).setDisplaySize(170, roadEndY);
}

function removeSettlementDebugWorldMarks(scene: Phaser.Scene, zone: WorldZone): void {
  const children = [...scene.children.list];
  for (const child of children) {
    if (child instanceof Phaser.GameObjects.Text) {
      const isSettlementTitle = child.text === zone.name && child.depth === -7;
      const isSafeLabel = child.text === 'THANH VÂN THÔN • AN TOÀN' && child.depth === -4;
      if (isSettlementTitle || isSafeLabel) child.destroy();
      continue;
    }

    if (
      child instanceof Phaser.GameObjects.Rectangle
      && child.depth === -5
      && Math.abs(child.y - zone.yMin) < 2
      && child.displayHeight <= 12
      && child.displayWidth > 1000
    ) {
      child.destroy();
    }
  }
}

export function createSettlementEnvironment(scene: Phaser.Scene, zone: WorldZone): void {
  const top = zone.yMin;

  trimLegacyWorldCorridorForSettlement(scene, zone);
  removeSettlementDebugWorldMarks(scene, zone);

  const washes = [
    { x: 300, y: top + 250, w: 620, h: 330, c: 0xcbb98f, a: 0.055, r: -0.08 },
    { x: 1270, y: top + 330, w: 520, h: 280, c: 0xb9b084, a: 0.05, r: 0.09 },
    { x: 330, y: top + 970, w: 560, h: 360, c: 0xc7b289, a: 0.055, r: 0.05 },
    { x: 1260, y: top + 1180, w: 620, h: 390, c: 0xb8ad86, a: 0.05, r: -0.07 },
    { x: 720, y: top + 1570, w: 760, h: 270, c: SETTLEMENT.warmPaper, a: 0.065, r: 0.03 },
  ];
  for (const wash of washes) {
    addPaperWash(scene, wash.x, wash.y, wash.w, wash.h, wash.c, wash.a, wash.r);
  }

  prepareSettlementGroundTextures(scene);

  const groundImage = (
    texture: string,
    x: number,
    y: number,
    width: number,
    rotation = 0,
    flipX = false,
    alpha = 0.9,
    depth = -7,
  ): Phaser.GameObjects.Image => {
    const image = scene.add.image(x, y, texture)
      .setOrigin(0.5)
      .setRotation(rotation)
      .setAlpha(alpha)
      .setDepth(depth);
    const scale = width / image.width;
    image.setScale(flipX ? -scale : scale, scale);
    return image;
  };

  const transitionPieces = [
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 800, y: top - 250, w: 185, r: 0.015, flip: false, alpha: 0.42 },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 792, y: top - 125, w: 208, r: -0.03, flip: true, alpha: 0.62 },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 778, y: top - 5, w: 228, r: -0.025, flip: false, alpha: 0.78 },
  ] as const;

  for (const piece of transitionPieces) {
    groundImage(piece.texture, piece.x, piece.y, piece.w, piece.r, piece.flip, piece.alpha, -7);
  }
  groundImage(SETTLEMENT_GROUND_RUNTIME_TEXTURES.patchA, 790, top - 40, 280, 0.01, false, 0.16, -8.5);

  const pathPieces = [
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 770, y: top + 85, w: 245, r: -0.03, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 715, y: top + 270, w: 250, r: 0.09, flip: true },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 760, y: top + 455, w: 255, r: -0.13, flip: true },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 855, y: top + 640, w: 260, r: -0.12, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 920, y: top + 825, w: 252, r: 0.06, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 870, y: top + 1010, w: 246, r: 0.13, flip: true },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 790, y: top + 1195, w: 242, r: -0.07, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 735, y: top + 1375, w: 248, r: 0.1, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 805, y: top + 1550, w: 250, r: -0.11, flip: true },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 850, y: top + 1715, w: 238, r: 0.05, flip: true },
  ] as const;

  for (const piece of pathPieces) {
    groundImage(piece.texture, piece.x, piece.y, piece.w, piece.r, piece.flip, 0.86, -7);
  }

  groundImage(SETTLEMENT_GROUND_RUNTIME_TEXTURES.patchA, 805, top + 520, 430, 0.02, false, 0.42, -8.5);
  groundImage(SETTLEMENT_GROUND_RUNTIME_TEXTURES.patchA, 835, top + 1080, 390, -0.03, true, 0.34, -8.5);
  groundImage(SETTLEMENT_GROUND_RUNTIME_TEXTURES.patchA, 790, top + 1515, 360, 0.04, false, 0.3, -8.5);

  const branches = [
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 575, y: top + 410, w: 178, r: 1.28, flip: true },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 1050, y: top + 455, w: 185, r: -1.22, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 650, y: top + 985, w: 190, r: 1.24, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 1045, y: top + 1080, w: 184, r: -1.26, flip: true },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathA, x: 590, y: top + 1505, w: 184, r: 1.3, flip: false },
    { texture: SETTLEMENT_GROUND_RUNTIME_TEXTURES.pathB, x: 1045, y: top + 1550, w: 188, r: -1.27, flip: true },
  ] as const;

  for (const branch of branches) {
    groundImage(branch.texture, branch.x, branch.y, branch.w, branch.r, branch.flip, 0.78, -6.5);
  }

  const forecourts = [
    { x: 410, y: top + 400, w: 300, r: -0.04, flip: false },
    { x: 1210, y: top + 445, w: 315, r: 0.04, flip: true },
    { x: 455, y: top + 995, w: 300, r: -0.03, flip: true },
    { x: 1160, y: top + 1085, w: 290, r: 0.05, flip: false },
    { x: 430, y: top + 1510, w: 285, r: -0.02, flip: false },
    { x: 1160, y: top + 1560, w: 292, r: 0.04, flip: true },
  ] as const;

  for (const forecourt of forecourts) {
    groundImage(
      SETTLEMENT_GROUND_RUNTIME_TEXTURES.forecourtA,
      forecourt.x,
      forecourt.y,
      forecourt.w,
      forecourt.r,
      forecourt.flip,
      0.8,
      -6,
    );
  }

  addHouseGrounding(scene, 365, top + 390, 325, false);
  addHouseGrounding(scene, 1240, top + 455, 347, true);
  addHouseGrounding(scene, 420, top + 1000, 325, false);
  addHouseGrounding(scene, 1210, top + 1090, 285, false);
  addHouseGrounding(scene, 390, top + 1520, 275, false);
  addHouseGrounding(scene, 1200, top + 1560, 295, false);

  addHouse(scene, 365, top + 390, SETTLEMENT_HOUSE_TEXTURES.thatchA, 325);
  addHouse(scene, 1240, top + 455, SETTLEMENT_HOUSE_TEXTURES.tileA, 347, true);
  addHouse(scene, 420, top + 1000, SETTLEMENT_HOUSE_TEXTURES.hallA, 325);
  addHouse(scene, 1210, top + 1090, SETTLEMENT_HOUSE_TEXTURES.tileA, 285);
  addHouse(scene, 390, top + 1520, SETTLEMENT_HOUSE_TEXTURES.thatchB, 275);
  addHouse(scene, 1200, top + 1560, SETTLEMENT_HOUSE_TEXTURES.hallA, 295);

  addFence(scene, 360, top + 650, 260);
  addFence(scene, 1235, top + 720, 230);
  addFence(scene, 390, top + 1290, 220);
  addFence(scene, 1190, top + 1370, 250);

  addTreeCluster(scene, 190, top + 310, 1.0);
  addTreeCluster(scene, 1420, top + 270, 0.92);
  addTreeCluster(scene, 210, top + 890, 0.82);
  addTreeCluster(scene, 1410, top + 930, 0.9);
  addTreeCluster(scene, 180, top + 1490, 0.78);
  addTreeCluster(scene, 1430, top + 1530, 0.82);

  addStonePatch(scene, 610, top + 350, false);
  addStonePatch(scene, 1005, top + 610, true);
  addStonePatch(scene, 590, top + 1190, true);
  addStonePatch(scene, 1015, top + 1470, false);
}
