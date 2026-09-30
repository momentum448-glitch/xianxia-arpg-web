import Phaser from 'phaser';

// Scene-local canvas derivatives only. Source PNGs and collision stay unchanged.
const WORLD_DEPTH = -3;
const PLAYER_FOREGROUND_DEPTH = 12; // player visual is at depth 11
const DEPTH_HYSTERESIS = 6;

export interface SettlementSelectiveOcclusion {
  update(playerFootX: number, playerFootY: number, time: number): void;
}

interface PairSpec {
  key: string;
  treeTexture: string;
  houseTexture: string;
  treeX: number;
  treeGroundY: number;
  houseX: number;
  houseGroundY: number;
  treeWidth: number;
  treeFlipX: boolean;
  treeAlpha: number;
  treePivotSourceY: number;
  treeNearX: number;
  treeNearAbove: number;
  treeNearBelow: number;
  swayDegrees: number;
  swayPeriodMs: number;
  swayPhase: number;
  houseWidth: number;
  houseFlipX: boolean;
  houseAlpha: number;
  roofSourceBottom: number;
  houseNearX: number;
  houseNearAbove: number;
  houseNearBelow: number;
}

function sourceImage(scene: Phaser.Scene, key: string): CanvasImageSource & {
  width: number;
  height: number;
} {
  return scene.textures.get(key).getSourceImage() as CanvasImageSource & {
    width: number;
    height: number;
  };
}

function copyWithVerticalCut(
  scene: Phaser.Scene,
  key: string,
  source: CanvasImageSource & { width: number; height: number },
  keepTop: boolean,
  cutY: number,
): void {
  if (scene.textures.exists(key)) return;
  const texture = scene.textures.createCanvas(key, source.width, source.height);
  if (!texture) throw new Error(`Selective occlusion could not create ${key}`);
  const context = texture.getContext();
  context.clearRect(0, 0, source.width, source.height);
  context.drawImage(source, 0, 0);
  if (keepTop) context.clearRect(0, cutY, source.width, source.height - cutY);
  else context.clearRect(0, 0, source.width, cutY);
  texture.refresh();
}

function addGroundedImage(
  scene: Phaser.Scene, texture: string, x: number, groundY: number,
  width: number, flipX = false, alpha = 1,
): Phaser.GameObjects.Image {
  const image = scene.add.image(x, groundY, texture)
    .setOrigin(0.5, 1)
    .setFlipX(flipX)
    .setAlpha(alpha)
    .setDepth(WORLD_DEPTH);
  image.setDisplaySize(width, width * image.height / image.width);
  return image;
}

function behindWithHysteresis(
  playerFootY: number, threshold: number, wasBehind: boolean,
): boolean {
  return wasBehind
    ? playerFootY <= threshold + DEPTH_HYSTERESIS
    : playerFootY < threshold - DEPTH_HYSTERESIS;
}

function createPair(scene: Phaser.Scene, spec: PairSpec): SettlementSelectiveOcclusion {
  const {
    treeTexture, houseTexture, treeX, treeGroundY, houseX, houseGroundY,
  } = spec;
  const treeBaseKey = `prod-${spec.key}-tree-base`;
  const treeCanopyKey = `prod-${spec.key}-tree-canopy`;
  const roofKey = `prod-${spec.key}-house-roof`;
  const treeSource = sourceImage(scene, treeTexture);
  const houseSource = sourceImage(scene, houseTexture);

  // Four source pixels overlap at the pivot. The lower trunk stays rooted.
  copyWithVerticalCut(scene, treeBaseKey, treeSource, false, spec.treePivotSourceY - 2);
  copyWithVerticalCut(scene, treeCanopyKey, treeSource, true, spec.treePivotSourceY + 2);
  copyWithVerticalCut(scene, roofKey, houseSource, true, spec.roofSourceBottom);

  // Base art retains the exact old scale, flip, alpha and world depth.
  addGroundedImage(scene, houseTexture, houseX, houseGroundY,
    spec.houseWidth, spec.houseFlipX, spec.houseAlpha);
  const roof = addGroundedImage(scene, roofKey, houseX, houseGroundY,
    spec.houseWidth, spec.houseFlipX, spec.houseAlpha)
    .setDepth(PLAYER_FOREGROUND_DEPTH)
    .setVisible(false);
  addGroundedImage(scene, treeBaseKey, treeX, treeGroundY,
    spec.treeWidth, spec.treeFlipX, spec.treeAlpha);
  const canopy = addGroundedImage(scene, treeCanopyKey, treeX, treeGroundY,
    spec.treeWidth, spec.treeFlipX, spec.treeAlpha);

  // Pivot at the canopy/trunk junction, not at the ground. At angle zero the
  // canopy pixels line up exactly with the fixed base and accepted tree art.
  const scale = spec.treeWidth / treeSource.width;
  canopy.setOrigin(0.5, spec.treePivotSourceY / treeSource.height);
  canopy.setPosition(treeX, treeGroundY - (treeSource.height - spec.treePivotSourceY) * scale);

  let treeBehind = false;
  let houseBehind = false;
  let canopyInFront = false;
  let roofVisible = false;
  return {
    update(playerFootX: number, playerFootY: number, time: number): void {
      // Physical contacts forbid the player from standing at either center.
      // Both thresholds lie within those existing grounded blockers, and the
      // small hysteresis prevents flicker when walking around their sides.
      treeBehind = behindWithHysteresis(playerFootY, treeGroundY - 7, treeBehind);
      houseBehind = behindWithHysteresis(playerFootY, houseGroundY - 32, houseBehind);
      const nearTree = Math.abs(playerFootX - treeX) < spec.treeNearX
        && playerFootY > treeGroundY - spec.treeNearAbove
        && playerFootY < treeGroundY + spec.treeNearBelow;
      const nearHouse = Math.abs(playerFootX - houseX) < spec.houseNearX
        && playerFootY > houseGroundY - spec.houseNearAbove
        && playerFootY < houseGroundY + spec.houseNearBelow;
      const nextCanopyInFront = treeBehind && nearTree;
      if (nextCanopyInFront !== canopyInFront) {
        canopy.setDepth(nextCanopyInFront ? PLAYER_FOREGROUND_DEPTH : WORLD_DEPTH);
        canopyInFront = nextCanopyInFront;
      }
      // When the player is in front, the original unsplit house is the only
      // visible copy. This keeps its accepted alpha edges exactly as before.
      const nextRoofVisible = houseBehind && nearHouse;
      if (nextRoofVisible !== roofVisible) {
        roof.setVisible(nextRoofVisible);
        roofVisible = nextRoofVisible;
      }

      canopy.setAngle(spec.swayDegrees * Math.sin(
        time * Math.PI * 2 / spec.swayPeriodMs + spec.swayPhase,
      ));
    },
  };
}

type Placement = Pick<PairSpec,
  'treeTexture' | 'houseTexture' | 'treeX' | 'treeGroundY' | 'houseX' | 'houseGroundY'>;

export function createHealerC1Occlusion(
  scene: Phaser.Scene, placement: Placement,
): SettlementSelectiveOcclusion {
  return createPair(scene, {
    key: 'c1-healer', ...placement,
    treeWidth: 168, treeFlipX: true, treeAlpha: 0.92,
    treePivotSourceY: 112, treeNearX: 122, treeNearAbove: 220, treeNearBelow: 100,
    swayDegrees: 0.65, swayPeriodMs: 6400, swayPhase: 0,
    houseWidth: 292, houseFlipX: false, houseAlpha: 1,
    roofSourceBottom: 126, houseNearX: 180, houseNearAbove: 250, houseNearBelow: 50,
  });
}

export function createElderD1Occlusion(
  scene: Phaser.Scene, placement: Placement,
): SettlementSelectiveOcclusion {
  return createPair(scene, {
    key: 'd1-elder', ...placement,
    treeWidth: 185, treeFlipX: false, treeAlpha: 0.96,
    treePivotSourceY: 112, treeNearX: 132, treeNearAbove: 245, treeNearBelow: 105,
    swayDegrees: 0.55, swayPeriodMs: 7100, swayPhase: 1.7,
    houseWidth: 315, houseFlipX: false, houseAlpha: 1,
    roofSourceBottom: 150, houseNearX: 195, houseNearAbove: 270, houseNearBelow: 55,
  });
}

export function createSoutheastD1Occlusion(
  scene: Phaser.Scene, placement: Placement,
): SettlementSelectiveOcclusion {
  return createPair(scene, {
    key: 'd1-southeast', ...placement,
    treeWidth: 168, treeFlipX: true, treeAlpha: 0.76,
    treePivotSourceY: 112, treeNearX: 122, treeNearAbove: 220, treeNearBelow: 100,
    swayDegrees: 0.48, swayPeriodMs: 5700, swayPhase: 3.3,
    houseWidth: 310, houseFlipX: true, houseAlpha: 0.82,
    roofSourceBottom: 112, houseNearX: 190, houseNearAbove: 250, houseNearBelow: 55,
  });
}
