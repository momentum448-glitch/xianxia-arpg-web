import Phaser from 'phaser';
import { C4_ASSETS, c4AssetUrl } from '../game/art/assetManifest';
import { WORLD } from '../game/worldConfig';
import { GameScene } from './GameScene';

const PROP_TEXTURES = {
  tree: 'c4-settlement-prop-tree-a',
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
    this.createSettlementPropsProof();
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

    this.addProp(PROP_TEXTURES.tree, 1440, top + 400, 190, -4.1, false, 0.96);
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
