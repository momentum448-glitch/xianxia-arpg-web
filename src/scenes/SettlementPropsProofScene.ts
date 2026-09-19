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
    this.createSettlementPropsProof();
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

    // TECH_REWORK only: normalize the indexed PNG through an RGBA canvas and
    // clear any dark background component connected to the image border. This
    // preserves the accepted tree art while preventing the black texture block
    // seen on mobile WebGL.
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

  private createSettlementPropsProof(): void {
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (!settlement) return;
    const top = settlement.yMin;

    // Remove only the nearby geometric tree placeholder so the proof can be
    // judged against production art without changing the rest of the village.
    for (const child of [...this.children.list]) {
      if (
        child instanceof Phaser.GameObjects.Container
        && child.depth === -4
        && Phaser.Math.Distance.Between(child.x, child.y, 1420, top + 270) < 90
      ) {
        child.destroy();
      }
    }

    const treeTexture = this.textures.exists(PROP_TEXTURES.treeRuntime)
      ? PROP_TEXTURES.treeRuntime
      : PROP_TEXTURES.tree;
    this.addProp(treeTexture, 1440, top + 400, 190, -4.1, false, 0.96);
    this.addProp(PROP_TEXTURES.lanternPost, 1085, top + 515, 108, -2.7, false, 0.98);
    this.addProp(PROP_TEXTURES.rockGrass, 1095, top + 665, 155, -2.8, false, 0.94);
    this.addProp(PROP_TEXTURES.fence, 1325, top + 680, 225, -2.75, false, 0.96);
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
