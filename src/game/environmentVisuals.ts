import Phaser from 'phaser';
import type { WorldZone } from './worldConfig';

export const SETTLEMENT_HOUSE_TEXTURES = {
  thatchA: 'c4-settlement-house-thatch-a',
  tileA: 'c4-settlement-house-tile-a',
  hallA: 'c4-settlement-house-hall-a',
  thatchB: 'c4-settlement-house-thatch-b',
} as const;

type SettlementHouseTexture = typeof SETTLEMENT_HOUSE_TEXTURES[keyof typeof SETTLEMENT_HOUSE_TEXTURES];

type OrganicPathNode = {
  x: number;
  y: number;
  width: number;
};

const SETTLEMENT = {
  warmPaper: 0xe3d5b5,
  path: 0xd7c59f,
  pathEdge: 0xb9a57e,
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

function addOrganicPath(
  scene: Phaser.Scene,
  nodes: OrganicPathNode[],
  samples: number,
  alpha = 0.23,
): void {
  if (nodes.length < 2) return;

  const curve = new Phaser.Curves.Spline(
    nodes.map(({ x, y }) => new Phaser.Math.Vector2(x, y)),
  );

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    const segmentFloat = t * (nodes.length - 1);
    const segmentIndex = Math.min(nodes.length - 2, Math.floor(segmentFloat));
    const localT = segmentFloat - segmentIndex;
    const width = nodes[segmentIndex].width
      + (nodes[segmentIndex + 1].width - nodes[segmentIndex].width) * localT;
    const brushHeight = Math.max(52, width * 0.25);
    const rotation = Math.atan2(tangent.y, tangent.x) - Math.PI / 2;

    scene.add.ellipse(point.x, point.y, width, brushHeight, SETTLEMENT.path, alpha)
      .setRotation(rotation)
      .setDepth(-7);

    if (i % 4 === 0) {
      const normalX = -tangent.y;
      const normalY = tangent.x;
      const side = i % 8 === 0 ? 1 : -1;
      const edgeOffset = width * 0.4 * side;
      scene.add.ellipse(
        point.x + normalX * edgeOffset,
        point.y + normalY * edgeOffset,
        width * 0.22,
        brushHeight * 0.48,
        SETTLEMENT.pathEdge,
        alpha * 0.34,
      )
        .setRotation(rotation + side * 0.12)
        .setDepth(-6);
    }

    if (i % 5 === 2) {
      const normalX = -tangent.y;
      const normalY = tangent.x;
      const side = i % 10 < 5 ? 1 : -1;
      scene.add.ellipse(
        point.x + normalX * width * 0.17 * side,
        point.y + normalY * width * 0.17 * side,
        width * 0.14,
        Math.max(15, brushHeight * 0.24),
        SETTLEMENT.soil,
        alpha * 0.28,
      )
        .setRotation(rotation - side * 0.08)
        .setDepth(-6);
    }
  }
}

function addHouseGrounding(
  scene: Phaser.Scene,
  x: number,
  y: number,
  displayWidth: number,
  flip = false,
): void {
  const direction = flip ? -1 : 1;

  scene.add.ellipse(x, y + 48, displayWidth * 0.78, displayWidth * 0.2, 0x3f392f, 0.07)
    .setDepth(-4);
  scene.add.ellipse(
    x + 14 * direction,
    y + 54,
    displayWidth * 0.64,
    displayWidth * 0.14,
    SETTLEMENT.soil,
    0.13,
  )
    .setRotation(direction * 0.035)
    .setDepth(-5);

  const marks = [
    { dx: -0.34, dy: 0.2, w: 0.14, h: 0.045, color: SETTLEMENT.moss, alpha: 0.13 },
    { dx: 0.29, dy: 0.24, w: 0.11, h: 0.038, color: SETTLEMENT.dryGrass, alpha: 0.13 },
    { dx: -0.18, dy: 0.29, w: 0.09, h: 0.032, color: SETTLEMENT.stone, alpha: 0.11 },
    { dx: 0.4, dy: 0.14, w: 0.07, h: 0.026, color: SETTLEMENT.moss, alpha: 0.1 },
  ];

  for (const mark of marks) {
    scene.add.ellipse(
      x + mark.dx * displayWidth * direction,
      y + mark.dy * displayWidth,
      mark.w * displayWidth,
      mark.h * displayWidth,
      mark.color,
      mark.alpha,
    ).setDepth(-4);
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
      fontFamily: 'monospace', fontSize: '18px', color: '#ffffff', fontStyle: 'bold',
      backgroundColor: '#7a004f', padding: { x: 6, y: 4 },
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

export function createSettlementEnvironment(scene: Phaser.Scene, zone: WorldZone): void {
  const centerX = 800;
  const top = zone.yMin;

  const washes = [
    { x: 300, y: top + 250, w: 620, h: 330, c: 0xcbb98f, a: 0.08, r: -0.08 },
    { x: 1270, y: top + 330, w: 520, h: 280, c: 0xb9b084, a: 0.07, r: 0.09 },
    { x: 330, y: top + 970, w: 560, h: 360, c: 0xc7b289, a: 0.07, r: 0.05 },
    { x: 1260, y: top + 1180, w: 620, h: 390, c: 0xb8ad86, a: 0.065, r: -0.07 },
    { x: 720, y: top + 1570, w: 760, h: 270, c: SETTLEMENT.warmPaper, a: 0.08, r: 0.03 },
  ];
  for (const wash of washes) {
    addPaperWash(scene, wash.x, wash.y, wash.w, wash.h, wash.c, wash.a, wash.r);
  }

  // Environment proof: an organic, authored route replaces the ruler-straight
  // upper settlement lane. Supporting brush marks remain low contrast so actors win.
  addPaperWash(scene, 790, top + 610, 760, 1230, SETTLEMENT.soil, 0.045, 0.02);
  addOrganicPath(scene, [
    { x: 765, y: top + 35, width: 240 },
    { x: 720, y: top + 230, width: 260 },
    { x: 835, y: top + 440, width: 300 },
    { x: 755, y: top + 650, width: 245 },
    { x: 860, y: top + 855, width: 315 },
    { x: 785, y: top + 1040, width: 270 },
    { x: 825, y: top + 1200, width: 250 },
  ], 46, 0.23);
  addOrganicPath(scene, [
    { x: 770, y: top + 390, width: 176 },
    { x: 645, y: top + 410, width: 164 },
    { x: 525, y: top + 475, width: 145 },
  ], 18, 0.18);
  addOrganicPath(scene, [
    { x: 835, y: top + 485, width: 182 },
    { x: 975, y: top + 470, width: 166 },
    { x: 1090, y: top + 505, width: 148 },
  ], 18, 0.18);

  // Keep the lower half untouched for this proof so the phone test compares one
  // deliberate environment slice instead of broadening the entire settlement at once.
  for (let i = 5; i < 8; i += 1) {
    const y = top + 110 + i * 225;
    const wobble = i % 3 === 0 ? -18 : i % 3 === 1 ? 14 : 0;
    scene.add.ellipse(centerX + wobble, y, 242 + (i % 2) * 24, 176, SETTLEMENT.path, 0.16)
      .setDepth(-7);
    if (i % 2 === 0) {
      scene.add.ellipse(centerX + wobble + 70, y + 32, 98, 46, SETTLEMENT.pathEdge, 0.06)
        .setDepth(-7);
    }
  }

  // Glue the two proof houses into the terrain with contact shadow, worn earth,
  // and sparse moss/stone marks. The house sprites themselves remain unchanged.
  addHouseGrounding(scene, 365, top + 390, 325, false);
  addHouseGrounding(scene, 1240, top + 455, 347, true);

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

  const courtyardMarks = [
    { x: 540, y: top + 770 },
    { x: 1070, y: top + 870 },
    { x: 550, y: top + 1390 },
    { x: 1060, y: top + 1320 },
  ];
  for (const mark of courtyardMarks) {
    scene.add.ellipse(mark.x, mark.y, 110, 52, SETTLEMENT.pathEdge, 0.07).setDepth(-6);
    scene.add.circle(mark.x + 32, mark.y - 6, 9, SETTLEMENT.oldWood, 0.22).setDepth(-5);
  }
}
