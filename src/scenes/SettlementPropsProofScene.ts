import Phaser from 'phaser';
import { C4_ASSETS, c4AssetUrl } from '../game/art/assetManifest';
import { WORLD } from '../game/worldConfig';
import { GameScene } from './GameScene';

const PROP_TEXTURES = {
  tree: 'c4-settlement-prop-tree-a',
  treeRuntime: 'c4-settlement-prop-tree-a-rgba-runtime',
  fence: 'c4-settlement-prop-fence-a',
  rockGrass: 'c4-settlement-prop-rockgrass-a',
  lanternPost: 'c4-settlement-prop-lanternpost-a',
} as const;

export class SettlementPropsProofScene extends GameScene {
  preload(): void {
    super.preload();

    const props = [
      [PROP_TEXTURES.tree, C4_ASSETS.settlementTreeA],
      [PROP_TEXTURES.fence, C4_ASSETS.settlementFenceA],
      [PROP_TEXTURES.rockGrass, C4_ASSETS.settlementRockGrassA],
      [PROP_TEXTURES.lanternPost, C4_ASSETS.settlementLanternPostA],
    ] as const;

    for (const [key, path] of props) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    super.create();
    this.prepareTreeRuntimeTexture();
    this.createSettlementPropsExpansion();
  }

  private prepareTreeRuntimeTexture(): void {
    if (this.textures.exists(PROP_TEXTURES.treeRuntime) || !this.textures.exists(PROP_TEXTURES.tree)) return;

    const source = this.textures.get(PROP_TEXTURES.tree).getSourceImage() as CanvasImageSource & {
      width: number;
      height: number;
    };
    const width = source.width;
    const height = source.height;
    const target = this.textures.createCanvas(PROP_TEXTURES.treeRuntime, width, height);
    if (!target) return;

    const context = target.getContext();
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);

    // TECH_REWORK only: normalize the accepted tree art through an RGBA canvas
    // and clear dark background components connected to the image border.
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

  private createSettlementPropsExpansion(): void {
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (!settlement) return;
    const top = settlement.yMin;

    this.removeLegacySettlementProps(top);

    const treeTexture = this.textures.exists(PROP_TEXTURES.treeRuntime)
      ? PROP_TEXTURES.treeRuntime
      : PROP_TEXTURES.tree;

    // Trees form the tall rhythm of the village, but stay outside the main
    // movement corridor and vary in scale/flip to avoid a repeated stamp look.
    const trees = [
      { x: 175, y: top + 325, w: 178, flip: false },
      { x: 1440, y: top + 400, w: 190, flip: false },
      { x: 175, y: top + 905, w: 168, flip: true },
      { x: 1435, y: top + 980, w: 176, flip: false },
      { x: 185, y: top + 1510, w: 160, flip: true },
      { x: 1420, y: top + 1550, w: 172, flip: false },
    ] as const;
    for (const tree of trees) {
      this.addProp(treeTexture, tree.x, tree.y, tree.w, -4.1, tree.flip, 0.96);
    }

    // Fences are intentionally sparse and slightly smaller than the proof
    // piece so they frame homes without closing off traversal space.
    const fences = [
      { x: 350, y: top + 650, w: 205, flip: false },
      { x: 1325, y: top + 680, w: 205, flip: false },
      { x: 330, y: top + 1260, w: 182, flip: true },
      { x: 1285, y: top + 1360, w: 194, flip: false },
      { x: 1265, y: top + 1740, w: 168, flip: true },
    ] as const;
    for (const fence of fences) {
      this.addProp(PROP_TEXTURES.fence, fence.x, fence.y, fence.w, -2.75, fence.flip, 0.96);
    }

    // Lanterns mark only selected homes and NPC-adjacent areas rather than
    // appearing beside every building.
    const lanterns = [
      { x: 535, y: top + 500, w: 78, flip: false },
      { x: 1085, y: top + 515, w: 96, flip: false },
      { x: 555, y: top + 1080, w: 72, flip: true },
      { x: 1040, y: top + 1170, w: 74, flip: false },
      { x: 1065, y: top + 1625, w: 70, flip: true },
    ] as const;
    for (const lantern of lanterns) {
      this.addProp(PROP_TEXTURES.lanternPost, lantern.x, lantern.y, lantern.w, -2.7, lantern.flip, 0.98);
    }

    // Small ground clusters break up empty paper without crowding the road.
    const rockGrass = [
      { x: 610, y: top + 350, w: 118, flip: false },
      { x: 1095, y: top + 665, w: 145, flip: false },
      { x: 585, y: top + 1160, w: 112, flip: true },
      { x: 1035, y: top + 1260, w: 124, flip: false },
      { x: 595, y: top + 1660, w: 104, flip: false },
      { x: 1015, y: top + 1500, w: 110, flip: true },
    ] as const;
    for (const patch of rockGrass) {
      this.addProp(PROP_TEXTURES.rockGrass, patch.x, patch.y, patch.w, -2.8, patch.flip, 0.94);
    }
  }

  private removeLegacySettlementProps(top: number): void {
    const treeCenters = [
      { x: 190, y: top + 310 },
      { x: 1420, y: top + 270 },
      { x: 210, y: top + 890 },
      { x: 1410, y: top + 930 },
      { x: 180, y: top + 1490 },
      { x: 1430, y: top + 1530 },
    ];
    const fenceCenters = [
      { x: 360, y: top + 650 },
      { x: 1235, y: top + 720 },
      { x: 390, y: top + 1290 },
      { x: 1190, y: top + 1370 },
    ];
    const stoneCenters = [
      { x: 610, y: top + 350 },
      { x: 1005, y: top + 610 },
      { x: 590, y: top + 1190 },
      { x: 1015, y: top + 1470 },
    ];

    for (const child of [...this.children.list]) {
      if (child instanceof Phaser.GameObjects.Container && child.depth === -4) {
        if (treeCenters.some((center) => Phaser.Math.Distance.Between(child.x, child.y, center.x, center.y) < 105)) {
          child.destroy();
        }
        continue;
      }

      if (child instanceof Phaser.GameObjects.Rectangle && child.depth === -4) {
        if (fenceCenters.some((center) => Math.abs(child.x - center.x) < 175 && Math.abs(child.y - center.y) < 65)) {
          child.destroy();
        }
        continue;
      }

      if (child instanceof Phaser.GameObjects.Ellipse && child.depth === -6) {
        if (stoneCenters.some((center) => Phaser.Math.Distance.Between(child.x, child.y, center.x, center.y) < 85)) {
          child.destroy();
        }
      }
    }
  }

  private addProp(
    texture: string,
    x: number,
    groundY: number,
    displayWidth: number,
    depth: number,
    flipX = false,
    alpha = 1,
  ): Phaser.GameObjects.Image {
    const source = this.textures.get(texture).getSourceImage() as { width: number; height: number };
    const scale = displayWidth / source.width;
    const displayHeight = source.height * scale;

    this.add.ellipse(x, groundY + 3, displayWidth * 0.62, Math.max(12, displayHeight * 0.09), 0x3f392f, 0.07)
      .setDepth(depth - 0.15);

    const image = this.add.image(x, groundY, texture)
      .setOrigin(0.5, 1)
      .setAlpha(alpha)
      .setDepth(depth);
    image.setScale(flipX ? -scale : scale, scale);
    return image;
  }
}
