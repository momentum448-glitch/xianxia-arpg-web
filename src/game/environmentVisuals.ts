import Phaser from 'phaser';
import type { WorldZone } from './worldConfig';

const SETTLEMENT = {
  warmPaper: 0xe3d5b5,
  path: 0xd7c59f,
  pathEdge: 0xb9a57e,
  oldWood: 0x765f43,
  darkWood: 0x514538,
  roof: 0x625548,
  roofLight: 0x8c775c,
  plaster: 0xcab58e,
  stone: 0x8d8878,
  moss: 0x7b8065,
  foliage: 0x65745d,
  foliageDark: 0x4f5f50,
  lantern: 0xc99158,
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

function addHouse(
  scene: Phaser.Scene,
  x: number,
  y: number,
  scale: number,
  flip = false,
): void {
  const shadow = scene.add.ellipse(0, 30, 208, 74, 0x322d27, 0.1);
  const wall = scene.add.rectangle(0, 16, 156, 96, SETTLEMENT.plaster, 0.78)
    .setStrokeStyle(3, SETTLEMENT.oldWood, 0.42);
  const roof = scene.add.polygon(0, -34, [
    -98, 20,
    -70, -35,
    70, -35,
    98, 20,
    68, 42,
    -68, 42,
  ], SETTLEMENT.roof, 0.9)
    .setStrokeStyle(3, SETTLEMENT.darkWood, 0.5);
  const ridge = scene.add.rectangle(0, -67, 126, 8, SETTLEMENT.roofLight, 0.75);
  const porch = scene.add.rectangle(0, 68, 106, 18, SETTLEMENT.oldWood, 0.58);
  const door = scene.add.rectangle(flip ? 28 : -28, 32, 34, 54, SETTLEMENT.darkWood, 0.74);
  const window = scene.add.rectangle(flip ? -34 : 34, 14, 28, 24, 0xe7d8b5, 0.34)
    .setStrokeStyle(2, SETTLEMENT.oldWood, 0.5);
  const lantern = scene.add.circle(flip ? -62 : 62, 34, 7, SETTLEMENT.lantern, 0.62)
    .setStrokeStyle(2, SETTLEMENT.darkWood, 0.45);

  scene.add.container(x, y, [shadow, wall, roof, ridge, porch, door, window, lantern])
    .setScale(scale)
    .setDepth(-3);
}

function addFence(scene: Phaser.Scene, x: number, y: number, width: number): void {
  const postCount = Math.max(3, Math.round(width / 54));
  const spacing = width / (postCount - 1);
  for (let i = 0; i < postCount; i += 1) {
    scene.add.rectangle(x - width / 2 + i * spacing, y, 8, 38, SETTLEMENT.oldWood, 0.46)
      .setDepth(-4);
  }
  scene.add.rectangle(x, y - 8, width, 7, SETTLEMENT.oldWood, 0.4).setDepth(-4);
  scene.add.rectangle(x, y + 8, width, 7, SETTLEMENT.oldWood, 0.34).setDepth(-4);
}

function addTreeCluster(scene: Phaser.Scene, x: number, y: number, scale: number): void {
  const shadow = scene.add.ellipse(0, 28, 92, 30, 0x2c3029, 0.08);
  const trunk = scene.add.rectangle(0, 10, 14, 54, SETTLEMENT.oldWood, 0.55);
  const crownA = scene.add.circle(-18, -18, 34, SETTLEMENT.foliageDark, 0.42);
  const crownB = scene.add.circle(16, -24, 40, SETTLEMENT.foliage, 0.42);
  const crownC = scene.add.circle(0, -47, 30, SETTLEMENT.foliage, 0.34);
  scene.add.container(x, y, [shadow, trunk, crownA, crownB, crownC])
    .setScale(scale)
    .setDepth(-4);
}

function addStonePatch(scene: Phaser.Scene, x: number, y: number, flip = false): void {
  const direction = flip ? -1 : 1;
  scene.add.ellipse(x, y, 62, 24, SETTLEMENT.stone, 0.14).setDepth(-6);
  scene.add.ellipse(x + 32 * direction, y + 8, 34, 18, SETTLEMENT.stone, 0.12).setDepth(-6);
  scene.add.ellipse(x - 24 * direction, y - 8, 26, 14, SETTLEMENT.moss, 0.12).setDepth(-6);
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

  for (let i = 0; i < 8; i += 1) {
    const y = top + 110 + i * 225;
    const wobble = i % 3 === 0 ? -18 : i % 3 === 1 ? 14 : 0;
    scene.add.ellipse(centerX + wobble, y, 242 + (i % 2) * 24, 176, SETTLEMENT.path, 0.16)
      .setDepth(-7);
    if (i % 2 === 0) {
      scene.add.ellipse(centerX + wobble + 70, y + 32, 98, 46, SETTLEMENT.pathEdge, 0.06)
        .setDepth(-7);
    }
  }

  addHouse(scene, 365, top + 390, 1.0, false);
  addHouse(scene, 1240, top + 455, 1.04, true);
  addHouse(scene, 420, top + 1000, 1.08, true);
  addHouse(scene, 1210, top + 1090, 0.96, false);
  addHouse(scene, 390, top + 1520, 0.9, false);
  addHouse(scene, 1200, top + 1560, 0.92, true);

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
    scene.add.circle(mark.x + 32, mark.y - 6, 9, SETTLEMENT.oldWood, 0.28).setDepth(-5);
  }
}
