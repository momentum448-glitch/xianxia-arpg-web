import Phaser from 'phaser';

// Proof C1 uses the accepted source pixels. These scene-local canvas textures
// split only the Healer tree and house; no source PNG or collision is changed.
const TREE_BASE_KEY = 'prod-c1-healer-tree-base';
const TREE_CANOPY_KEY = 'prod-c1-healer-tree-canopy';
const HOUSE_ROOF_KEY = 'prod-c1-healer-house-roof';
const TREE_PIVOT_SOURCE_Y = 112;
const HOUSE_ROOF_SOURCE_BOTTOM = 126;
const WORLD_DEPTH = -3;
const PLAYER_FOREGROUND_DEPTH = 12; // player visual is at depth 11
const DEPTH_HYSTERESIS = 6;

export interface HealerC1Occlusion {
  update(playerFootX: number, playerFootY: number, time: number): void;
}

interface HealerC1Placement {
  treeTexture: string;
  houseTexture: string;
  treeX: number;
  treeGroundY: number;
  houseX: number;
  houseGroundY: number;
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
  if (!texture) throw new Error(`Proof C1 could not create ${key}`);
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

export function createHealerC1Occlusion(
  scene: Phaser.Scene, placement: HealerC1Placement,
): HealerC1Occlusion {
  const { treeTexture, houseTexture, treeX, treeGroundY, houseX, houseGroundY } = placement;
  const treeSource = sourceImage(scene, treeTexture);
  const houseSource = sourceImage(scene, houseTexture);

  // Four source pixels overlap at the join. Rotation around source Y=112 is
  // under a degree, so the rooted lower trunk does not expose a moving seam.
  copyWithVerticalCut(scene, TREE_BASE_KEY, treeSource, false, TREE_PIVOT_SOURCE_Y - 2);
  copyWithVerticalCut(scene, TREE_CANOPY_KEY, treeSource, true, TREE_PIVOT_SOURCE_Y + 2);
  copyWithVerticalCut(scene, HOUSE_ROOF_KEY, houseSource, true, HOUSE_ROOF_SOURCE_BOTTOM);

  // Base art retains the exact old scale, flip, alpha and world depth.
  addGroundedImage(scene, houseTexture, houseX, houseGroundY, 292);
  const roof = addGroundedImage(scene, HOUSE_ROOF_KEY, houseX, houseGroundY, 292)
    .setDepth(PLAYER_FOREGROUND_DEPTH)
    .setVisible(false);
  addGroundedImage(scene, TREE_BASE_KEY, treeX, treeGroundY, 168, true, 0.92);
  const canopy = addGroundedImage(scene, TREE_CANOPY_KEY, treeX, treeGroundY, 168, true, 0.92);

  // Pivot at the canopy/trunk junction, not at the ground. At angle zero the
  // canopy pixels line up exactly with the fixed base and accepted tree art.
  const scale = 168 / treeSource.width;
  canopy.setOrigin(0.5, TREE_PIVOT_SOURCE_Y / treeSource.height);
  canopy.setPosition(treeX, treeGroundY - (treeSource.height - TREE_PIVOT_SOURCE_Y) * scale);

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
      const nearTree = Math.abs(playerFootX - treeX) < 122
        && playerFootY > treeGroundY - 220 && playerFootY < treeGroundY + 100;
      const nearHouse = Math.abs(playerFootX - houseX) < 180
        && playerFootY > houseGroundY - 250 && playerFootY < houseGroundY + 50;
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

      // One canopy only: ±0.65° in a 6.4 s cycle; base and collider stay fixed.
      canopy.setAngle(0.65 * Math.sin(time * Math.PI * 2 / 6400));
    },
  };
}
