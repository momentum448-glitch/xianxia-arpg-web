import Phaser from 'phaser';
import { SETTLEMENT_V2A_TEXTURES } from './settlementV2AProduction';
import type { WorldZone } from './worldConfig';

const COHESION_GROUND = {
  pathA: 'c4-settlement-path-a-masked',
  pathB: 'c4-settlement-path-b-masked',
  patch: 'c4-settlement-ground-patch-a-masked',
  forecourt: 'c4-settlement-forecourt-a-masked',
} as const;

function addGround(
  scene: Phaser.Scene,
  texture: string,
  x: number,
  y: number,
  width: number,
  rotation = 0,
  flipX = false,
  alpha = 0.3,
  depth = -7.05,
): void {
  const image = scene.add.image(x, y, texture)
    .setOrigin(0.5)
    .setRotation(rotation)
    .setAlpha(alpha)
    .setDepth(depth);
  const scale = image.width > 0 ? width / image.width : 1;
  image.setScale(flipX ? -scale : scale, scale);
}

function addProp(
  scene: Phaser.Scene,
  texture: string,
  x: number,
  groundY: number,
  width: number,
  flipX = false,
  alpha = 0.75,
  depth = -3.4,
): void {
  const image = scene.add.image(x, groundY, texture)
    .setOrigin(0.5, 1)
    .setFlipX(flipX)
    .setAlpha(alpha)
    .setDepth(depth);
  const ratio = image.width > 0 ? image.height / image.width : 1;
  image.setDisplaySize(width, width * ratio);
}

/**
 * Whole-map cohesion proof for Thanh Van Thon.
 *
 * This pass is deliberately additive and decorative only: it does not move locked
 * hero pockets, change gameplay collision, or introduce new runtime assets. The
 * only validation question is whether the settlement reads as one village at 0.5x.
 */
export function applySettlementCohesionPassA(scene: Phaser.Scene, zone: WorldZone): void {
  const top = zone.yMin;

  // Low-contrast ground washes bridge the large blank gaps between accepted pockets.
  const washes = [
    { texture: COHESION_GROUND.patch, x: 575, y: 760, w: 310, r: -0.05, flip: false, alpha: 0.18 },
    { texture: COHESION_GROUND.patch, x: 1050, y: 1120, w: 330, r: 0.08, flip: true, alpha: 0.19 },
    { texture: COHESION_GROUND.patch, x: 610, y: 1510, w: 300, r: -0.07, flip: true, alpha: 0.19 },
    { texture: COHESION_GROUND.patch, x: 1285, y: 1380, w: 310, r: 0.04, flip: false, alpha: 0.17 },
    { texture: COHESION_GROUND.forecourt, x: 610, y: 690, w: 220, r: -0.06, flip: false, alpha: 0.28 },
    { texture: COHESION_GROUND.forecourt, x: 1035, y: 1115, w: 230, r: 0.05, flip: true, alpha: 0.28 },
    { texture: COHESION_GROUND.forecourt, x: 625, y: 1450, w: 235, r: -0.03, flip: true, alpha: 0.30 },
    { texture: COHESION_GROUND.forecourt, x: 1115, y: 1530, w: 220, r: 0.05, flip: false, alpha: 0.24 },
  ] as const;
  for (const wash of washes) {
    addGround(scene, wash.texture, wash.x, top + wash.y, wash.w, wash.r, wash.flip, wash.alpha, -7.08);
  }

  // Secondary lanes make each POI visibly belong to the central village spine.
  const lanes = [
    { texture: COHESION_GROUND.pathA, x: 615, y: 690, w: 180, r: 1.03, flip: true, alpha: 0.48 },
    { texture: COHESION_GROUND.pathB, x: 1015, y: 1105, w: 195, r: -1.02, flip: false, alpha: 0.50 },
    { texture: COHESION_GROUND.pathA, x: 615, y: 1430, w: 190, r: 1.08, flip: false, alpha: 0.52 },
    { texture: COHESION_GROUND.pathB, x: 1050, y: 1545, w: 190, r: -1.02, flip: true, alpha: 0.46 },
  ] as const;
  for (const lane of lanes) {
    addGround(scene, lane.texture, lane.x, top + lane.y, lane.w, lane.r, lane.flip, lane.alpha, -7.02);
  }

  const tree = scene.textures.exists(SETTLEMENT_V2A_TEXTURES.treeRuntime)
    ? SETTLEMENT_V2A_TEXTURES.treeRuntime
    : SETTLEMENT_V2A_TEXTURES.tree;

  // Small edge clusters turn isolated markers into a readable settlement boundary.
  addProp(scene, tree, 95, top + 920, 150, false, 0.72);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.fence, 250, top + 1010, 150, false, 0.66);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 265, top + 915, 95, false, 0.72);

  addProp(scene, tree, 1480, top + 1190, 150, true, 0.72);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.fence, 1360, top + 1260, 155, true, 0.70);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 1305, top + 1170, 95, true, 0.74);

  addProp(scene, tree, 1455, top + 1395, 135, false, 0.60);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.fence, 1350, top + 1455, 145, true, 0.62);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 1270, top + 1410, 90, false, 0.68);

  // Tiny roadside accents soften the long central ribbon without creating new POIs.
  addProp(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 690, top + 790, 82, true, 0.64, -3.6);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 930, top + 1180, 86, false, 0.66, -3.6);
  addProp(scene, SETTLEMENT_V2A_TEXTURES.rockGrass, 680, top + 1515, 88, true, 0.64, -3.6);
}
