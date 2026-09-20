import Phaser from 'phaser';
import { C4_ASSETS, c4AssetUrl } from '../game/art/assetManifest';
import { SETTLEMENT_HOUSE_TEXTURES } from '../game/environmentVisuals';
import { WORLD } from '../game/worldConfig';
import { GameScene } from './GameScene';

const PROP_TEXTURES = {
  tree: 'c4-settlement-prop-tree-a',
  treeRuntime: 'c4-settlement-prop-tree-a-rgba-runtime',
  fence: 'c4-settlement-prop-fence-a',
  rockGrass: 'c4-settlement-prop-rockgrass-a',
  lanternPost: 'c4-settlement-prop-lanternpost-a',
  merchantCart: 'c4-settlement-merchant-cart-b',
  merchantGoods: 'c4-settlement-merchant-goods-b',
  merchantSign: 'c4-settlement-merchant-sign-b',
  merchantStall: 'c4-settlement-merchant-stall-b',
} as const;

export class SettlementPropsProofScene extends GameScene {
  preload(): void {
    super.preload();

    const props = [
      [PROP_TEXTURES.tree, C4_ASSETS.settlementTreeA],
      [PROP_TEXTURES.fence, C4_ASSETS.settlementFenceA],
      [PROP_TEXTURES.rockGrass, C4_ASSETS.settlementRockGrassA],
      [PROP_TEXTURES.lanternPost, C4_ASSETS.settlementLanternPostA],
      [PROP_TEXTURES.merchantCart, C4_ASSETS.settlementMerchantCartB],
      [PROP_TEXTURES.merchantGoods, C4_ASSETS.settlementMerchantGoodsB],
      [PROP_TEXTURES.merchantSign, C4_ASSETS.settlementMerchantSignB],
      [PROP_TEXTURES.merchantStall, C4_ASSETS.settlementMerchantStallB],
    ] as const;

    for (const [key, path] of props) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    super.create();
    this.removeMerchantLowerHouse();
    this.prepareTreeRuntimeTexture();
    this.createSettlementPropsExpansion();
    this.createMerchantAreaProof();
    this.createVillageMacroBlockoutProof();
  }

  private removeMerchantLowerHouse(): void {
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (!settlement) return;

    const targetX = 1210;
    const targetY = settlement.yMin + 1090;
    for (const child of [...this.children.list]) {
      if (
        child instanceof Phaser.GameObjects.Image
        && child.texture.key === SETTLEMENT_HOUSE_TEXTURES.tileA
        && Phaser.Math.Distance.Between(child.x, child.y, targetX, targetY) < 4
      ) {
        child.destroy();
        break;
      }
    }
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

    const trees = [
      { x: 175, y: top + 325, w: 178, flip: false },
      { x: 1440, y: top + 400, w: 190, flip: false },
      { x: 175, y: top + 905, w: 168, flip: true },
      // Keep the merchant forecourt open; the former east-side tree here made
      // the cart and stall read as overlapping stamps on phone.
      { x: 185, y: top + 1510, w: 160, flip: true },
      { x: 1420, y: top + 1550, w: 172, flip: false },
    ] as const;
    for (const tree of trees) {
      this.addProp(treeTexture, tree.x, tree.y, tree.w, -4.1, tree.flip, 0.96);
    }

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

  private createMerchantAreaProof(): void {
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (!settlement) return;
    const top = settlement.yMin;

    // Scale against the accepted settlement houses rather than treating the
    // merchant kit as small decorative props. The cleared lower-house footprint
    // gives the vignette room to read as a real trading area on phone.
    this.addProp(PROP_TEXTURES.merchantStall, 1140, top + 965, 270, -2.60, false, 1, 0);
    this.addProp(PROP_TEXTURES.merchantSign, 1018, top + 930, 60, -2.54, false, 1, 0);
    this.addProp(PROP_TEXTURES.merchantGoods, 1235, top + 1080, 135, -2.56, false, 1, 0);
    this.addProp(PROP_TEXTURES.merchantCart, 1370, top + 970, 180, -2.63, false, 1, 0);
  }

  private createVillageMacroBlockoutProof(): void {
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (!settlement) return;
    const top = settlement.yMin;

    // Diagnostic-only macro blockout for Thanh Vân Thôn V1.
    // Keep these cheap shapes behind gameplay/production sprites so Phone QC can
    // judge village structure before any new production PNG is commissioned.
    const wood = 0x76634c;
    const stone = 0x827c6c;
    const water = 0x6f8d8c;
    const field = 0x9b9469;
    const soil = 0xb79a72;

    // Z0 frontier threshold: two rough side fences + one modest marker. This is
    // intentionally not a grand gate because the village is poor/frontier.
    this.add.rectangle(560, top + 145, 285, 24, wood, 0.22)
      .setRotation(-0.08)
      .setDepth(-5.7);
    this.add.rectangle(1060, top + 155, 300, 24, wood, 0.22)
      .setRotation(0.07)
      .setDepth(-5.7);
    this.add.rectangle(940, top + 185, 22, 86, stone, 0.24)
      .setRotation(0.06)
      .setDepth(-5.6);

    // Z3 healer branch: a small pond/irrigation pocket sits off the main spine.
    // The water remains local to the lower-west village rather than cutting the
    // critical north-south route.
    this.add.ellipse(405, top + 1435, 310, 185, water, 0.16)
      .setRotation(-0.08)
      .setDepth(-6.2);
    this.add.ellipse(520, top + 1510, 250, 82, water, 0.13)
      .setRotation(0.14)
      .setDepth(-6.15);
    this.add.ellipse(620, top + 1545, 190, 58, water, 0.11)
      .setRotation(0.18)
      .setDepth(-6.1);

    // A tiny branch footbridge tests whether rural water helps the healer pocket
    // without becoming a route puzzle. It is not on the critical spine.
    this.add.rectangle(535, top + 1488, 142, 46, wood, 0.48)
      .setRotation(0.14)
      .setDepth(-5.4);
    for (let i = -3; i <= 3; i += 1) {
      this.add.rectangle(535 + i * 19, top + 1488 + i * 2.5, 4, 44, 0x4f4233, 0.34)
        .setRotation(0.14)
        .setDepth(-5.3);
    }

    // Z4 field/residential fringe: quiet edge rows imply more households and
    // working land beyond the few authored hero clusters.
    const fieldRows = [
      { x: 210, y: top + 1690, w: 300, r: -0.08 },
      { x: 235, y: top + 1750, w: 330, r: -0.05 },
      { x: 1390, y: top + 1665, w: 285, r: 0.08 },
      { x: 1365, y: top + 1730, w: 320, r: 0.05 },
    ] as const;
    for (const row of fieldRows) {
      this.add.ellipse(row.x, row.y, row.w, 44, field, 0.13)
        .setRotation(row.r)
        .setDepth(-7.1);
      this.add.ellipse(row.x, row.y + 18, row.w * 0.88, 18, soil, 0.11)
        .setRotation(row.r)
        .setDepth(-7);
    }

    // Partial low-contrast edge masses are intentionally clipped by the world
    // edge. They test perceived village scale without adding more hero houses.
    this.add.rectangle(85, top + 720, 170, 150, wood, 0.07)
      .setRotation(-0.05)
      .setDepth(-8);
    this.add.rectangle(1515, top + 520, 170, 160, wood, 0.07)
      .setRotation(0.06)
      .setDepth(-8);
    this.add.rectangle(70, top + 1640, 210, 130, wood, 0.06)
      .setRotation(0.03)
      .setDepth(-8);
    this.add.rectangle(1530, top + 1570, 220, 145, wood, 0.06)
      .setRotation(-0.04)
      .setDepth(-8);
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
    shadowAlpha = 0.07,
  ): Phaser.GameObjects.Image {
    const source = this.textures.get(texture).getSourceImage() as { width: number; height: number };
    const scale = displayWidth / source.width;
    const displayHeight = source.height * scale;

    if (shadowAlpha > 0) {
      this.add.ellipse(
        x,
        groundY + 3,
        displayWidth * 0.62,
        Math.max(12, displayHeight * 0.09),
        0x3f392f,
        shadowAlpha,
      ).setDepth(depth - 0.15);
    }

    const image = this.add.image(x, groundY, texture)
      .setOrigin(0.5, 1)
      .setAlpha(alpha)
      .setDepth(depth);
    image.setScale(flipX ? -scale : scale, scale);
    return image;
  }
}
