import Phaser from 'phaser';
import { C4_ASSETS, c4AssetUrl } from '../game/art/assetManifest';

const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 1800;
const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 1280;
const ZOOM_LEVELS = [1, 0.8, 0.65] as const;

type GroundMaskMode = 'path-a' | 'path-b' | 'patch' | 'forecourt';

const TEX = {
  houseThatchA: 'qc-house-thatch-a',
  houseTileA: 'qc-house-tile-a',
  houseHallA: 'qc-house-hall-a',
  houseThatchB: 'qc-house-thatch-b',
  tree: 'qc-tree-a',
  treeRuntime: 'qc-tree-a-runtime',
  fence: 'qc-fence-a',
  rockGrass: 'qc-rockgrass-a',
  lantern: 'qc-lantern-a',
  merchantStall: 'qc-merchant-stall-b',
  merchantCart: 'qc-merchant-cart-b',
  merchantGoods: 'qc-merchant-goods-b',
  merchantSign: 'qc-merchant-sign-b',
  pathA: 'qc-path-a',
  pathB: 'qc-path-b',
  groundPatch: 'qc-ground-patch-a',
  forecourt: 'qc-forecourt-a',
  pathARuntime: 'qc-path-a-masked',
  pathBRuntime: 'qc-path-b-masked',
  groundPatchRuntime: 'qc-ground-patch-a-masked',
  forecourtRuntime: 'qc-forecourt-a-masked',
} as const;

interface Point {
  x: number;
  y: number;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export class VillageTopologyQcScene extends Phaser.Scene {
  private contextLayer!: Phaser.GameObjects.Container;
  private guideLayer!: Phaser.GameObjects.Container;
  private hudLayer!: Phaser.GameObjects.Container;
  private player!: Phaser.GameObjects.Container;
  private uiCamera!: Phaser.Cameras.Scene2D.Camera;
  private guideButtonLabel!: Phaser.GameObjects.Text;
  private zoomButtonLabel!: Phaser.GameObjects.Text;
  private guidesVisible = true;
  private zoomIndex = 0;
  private moveX = 0;
  private moveY = 0;
  private joystickPointerId: number | null = null;
  private readonly joystickX = 118;
  private readonly joystickY = VIEW_HEIGHT - 138;
  private joystickNub!: Phaser.GameObjects.Arc;

  constructor() {
    super('VillageTopologyQc');
  }

  preload(): void {
    const assets = [
      [TEX.houseThatchA, C4_ASSETS.settlementHouseThatchA],
      [TEX.houseTileA, C4_ASSETS.settlementHouseTileA],
      [TEX.houseHallA, C4_ASSETS.settlementHouseHallA],
      [TEX.houseThatchB, C4_ASSETS.settlementHouseThatchB],
      [TEX.tree, C4_ASSETS.settlementTreeA],
      [TEX.fence, C4_ASSETS.settlementFenceA],
      [TEX.rockGrass, C4_ASSETS.settlementRockGrassA],
      [TEX.lantern, C4_ASSETS.settlementLanternPostA],
      [TEX.merchantStall, C4_ASSETS.settlementMerchantStallB],
      [TEX.merchantCart, C4_ASSETS.settlementMerchantCartB],
      [TEX.merchantGoods, C4_ASSETS.settlementMerchantGoodsB],
      [TEX.merchantSign, C4_ASSETS.settlementMerchantSignB],
      [TEX.pathA, C4_ASSETS.settlementPathSegA],
      [TEX.pathB, C4_ASSETS.settlementPathSegB],
      [TEX.groundPatch, C4_ASSETS.settlementGroundPatchA],
      [TEX.forecourt, C4_ASSETS.settlementForecourtA],
    ] as const;

    for (const [key, path] of assets) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#ded4ba');
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.contextLayer = this.add.container(0, 0);
    this.guideLayer = this.add.container(0, 0);
    this.hudLayer = this.add.container(0, 0);

    this.prepareTreeRuntimeTexture();
    this.prepareGroundRuntimeTextures();
    this.buildContext();
    this.createPlayerMarker();
    this.createHud();
    this.createJoystick();
    this.configureUiCamera();
    this.bindInput();

    this.cameras.main.startFollow(this.player, true, 0.14, 0.14);
    this.cameras.main.setDeadzone(150, 310);
  }

  update(_time: number, delta: number): void {
    const speed = 315;
    this.player.x = Phaser.Math.Clamp(
      this.player.x + this.moveX * speed * delta / 1000,
      62,
      WORLD_WIDTH - 62,
    );
    this.player.y = Phaser.Math.Clamp(
      this.player.y + this.moveY * speed * delta / 1000,
      58,
      WORLD_HEIGHT - 58,
    );
  }

  private buildContext(): void {
    const base = this.add.rectangle(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT / 2,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      0xe7dcc2,
      1,
    ).setDepth(-30);
    this.contextLayer.add(base);

    this.addMainSpine();
    this.addEntryContext();
    this.addElderContext();
    this.addMerchantContext();
    this.addHealerContext();
    this.addResidentialContext();
    this.addContextGuides();
  }

  private addMainSpine(): void {
    const spine: Point[] = [
      { x: 800, y: 80 },
      { x: 770, y: 285 },
      { x: 690, y: 505 },
      { x: 820, y: 690 },
      { x: 940, y: 850 },
      { x: 835, y: 1045 },
      { x: 690, y: 1235 },
      { x: 810, y: 1430 },
      { x: 940, y: 1590 },
      { x: 800, y: 1780 },
    ];

    const patches = [
      { x: 780, y: 530, w: 370, r: -0.02, flip: false, alpha: 0.22 },
      { x: 875, y: 930, w: 395, r: 0.03, flip: true, alpha: 0.25 },
      { x: 760, y: 1320, w: 370, r: -0.03, flip: false, alpha: 0.23 },
      { x: 860, y: 1645, w: 345, r: 0.03, flip: true, alpha: 0.21 },
    ] as const;
    for (const patch of patches) {
      this.addGroundImage(
        TEX.groundPatchRuntime,
        patch.x,
        patch.y,
        patch.w,
        patch.r,
        patch.flip,
        patch.alpha,
      );
    }

    const pathPieces = [
      { texture: TEX.pathARuntime, x: 800, y: 105, w: 218, r: -0.03, flip: false },
      { texture: TEX.pathBRuntime, x: 765, y: 285, w: 222, r: 0.08, flip: true },
      { texture: TEX.pathARuntime, x: 700, y: 475, w: 226, r: -0.12, flip: true },
      { texture: TEX.pathBRuntime, x: 805, y: 665, w: 230, r: -0.14, flip: false },
      { texture: TEX.pathARuntime, x: 925, y: 850, w: 226, r: 0.06, flip: false },
      { texture: TEX.pathBRuntime, x: 850, y: 1035, w: 222, r: 0.12, flip: true },
      { texture: TEX.pathARuntime, x: 705, y: 1220, w: 218, r: -0.08, flip: false },
      { texture: TEX.pathBRuntime, x: 790, y: 1405, w: 220, r: -0.08, flip: false },
      { texture: TEX.pathARuntime, x: 925, y: 1585, w: 222, r: 0.10, flip: true },
      { texture: TEX.pathBRuntime, x: 820, y: 1745, w: 212, r: -0.05, flip: true },
    ] as const;
    for (const piece of pathPieces) {
      this.addGroundImage(piece.texture, piece.x, piece.y, piece.w, piece.r, piece.flip, 0.74);
    }

    const branches = [
      { texture: TEX.pathARuntime, x: 520, y: 545, w: 176, r: 1.24, flip: true, alpha: 0.68 },
      { texture: TEX.pathBRuntime, x: 1080, y: 885, w: 180, r: -1.24, flip: false, alpha: 0.68 },
      { texture: TEX.pathARuntime, x: 510, y: 1285, w: 208, r: 1.22, flip: false, alpha: 0.80 },
      { texture: TEX.pathBRuntime, x: 1070, y: 1660, w: 165, r: -1.24, flip: true, alpha: 0.62 },
    ] as const;
    for (const branch of branches) {
      this.addGroundImage(
        branch.texture,
        branch.x,
        branch.y,
        branch.w,
        branch.r,
        branch.flip,
        branch.alpha,
      );
    }

    const forecourts = [
      { x: 350, y: 585, w: 295, r: -0.04, flip: false, alpha: 0.62 },
      { x: 1210, y: 990, w: 320, r: 0.04, flip: true, alpha: 0.72 },
      { x: 350, y: 1335, w: 310, r: -0.03, flip: true, alpha: 0.70 },
      { x: 1190, y: 1700, w: 275, r: 0.04, flip: false, alpha: 0.44 },
    ] as const;
    for (const forecourt of forecourts) {
      this.addGroundImage(
        TEX.forecourtRuntime,
        forecourt.x,
        forecourt.y,
        forecourt.w,
        forecourt.r,
        forecourt.flip,
        forecourt.alpha,
      );
    }

    const routeGuide = this.add.graphics();
    routeGuide.lineStyle(2, 0x7d684f, 0.18);
    routeGuide.beginPath();
    spine.forEach((point, index) => {
      if (index === 0) routeGuide.moveTo(point.x, point.y);
      else routeGuide.lineTo(point.x, point.y);
    });
    routeGuide.strokePath();
    this.guideLayer.add(routeGuide);
  }

  private addEntryContext(): void {
    this.addAsset(TEX.fence, 505, 255, 205, false, 0.94);
    this.addAsset(TEX.fence, 1090, 250, 205, true, 0.92);
    this.addAsset(TEX.lantern, 835, 260, 76, false, 0.96);
    this.addAsset(this.treeTexture(), 150, 330, 178, false, 0.88);
    this.addAsset(this.treeTexture(), 1460, 355, 184, true, 0.86);
  }

  private addElderContext(): void {
    this.addAsset(TEX.houseHallA, 350, 555, 315, false, 1);
    this.addAsset(this.treeTexture(), 150, 575, 185, false, 0.96);
    this.addAsset(TEX.fence, 540, 595, 195, false, 0.94);
    this.addAsset(TEX.rockGrass, 535, 510, 120, false, 0.92);
    this.addAsset(TEX.lantern, 615, 570, 74, false, 0.96);
    this.addAsset(TEX.rockGrass, 235, 650, 105, true, 0.82);
  }

  private addMerchantContext(): void {
    this.addAsset(TEX.merchantStall, 1210, 925, 270, false, 1);
    this.addAsset(TEX.merchantSign, 1040, 900, 60, false, 1);
    this.addAsset(TEX.merchantGoods, 1325, 975, 135, false, 1);
    this.addAsset(TEX.merchantCart, 1460, 935, 180, false, 1);
    this.addAsset(this.treeTexture(), 1490, 735, 165, false, 0.86);
    this.addAsset(TEX.rockGrass, 990, 965, 118, true, 0.84);
    this.addAsset(TEX.lantern, 990, 845, 72, false, 0.94);
  }

  private addHealerContext(): void {
    this.addAsset(TEX.houseThatchB, 350, 1295, 292, false, 1);
    this.addAsset(this.treeTexture(), 135, 1310, 168, true, 0.92);
    this.addAsset(TEX.fence, 565, 1315, 182, true, 0.91);
    this.addAsset(TEX.rockGrass, 540, 1225, 112, true, 0.9);
    this.addAsset(TEX.lantern, 615, 1265, 72, false, 0.94);

    const pond = this.add.ellipse(235, 1430, 285, 170, 0x66888a, 0.22)
      .setRotation(-0.08)
      .setStrokeStyle(3, 0x55797a, 0.38)
      .setDepth(-12);
    const stream = this.add.ellipse(365, 1490, 250, 80, 0x66888a, 0.14)
      .setRotation(0.10)
      .setDepth(-13);
    const bridge = this.add.rectangle(350, 1448, 140, 36, 0x715b45, 0.55)
      .setRotation(0.12)
      .setDepth(1448);
    this.contextLayer.add([pond, stream, bridge]);

    const herbBeds = [
      { x: 535, y: 1370, w: 175, r: 0.05 },
      { x: 555, y: 1420, w: 190, r: -0.03 },
      { x: 520, y: 1470, w: 160, r: 0.04 },
    ];
    for (const bed of herbBeds) {
      this.contextLayer.add(
        this.add.rectangle(bed.x, bed.y, bed.w, 30, 0x788066, 0.22)
          .setRotation(bed.r)
          .setDepth(-11),
      );
    }
  }

  private addResidentialContext(): void {
    this.addAsset(TEX.houseThatchA, 75, 1750, 292, false, 0.84);
    this.addAsset(TEX.houseTileA, 1535, 1665, 310, true, 0.82);
    this.addAsset(this.treeTexture(), 120, 1540, 155, false, 0.74);
    this.addAsset(this.treeTexture(), 1490, 1505, 168, true, 0.76);
    this.addAsset(TEX.fence, 430, 1695, 175, false, 0.82);
    this.addAsset(TEX.fence, 1190, 1690, 175, true, 0.82);

    const fieldRows = [
      { x: 380, y: 1595, w: 330, r: -0.08 },
      { x: 400, y: 1650, w: 365, r: -0.04 },
      { x: 1210, y: 1585, w: 325, r: 0.07 },
      { x: 1190, y: 1640, w: 360, r: 0.04 },
    ];
    for (const row of fieldRows) {
      this.contextLayer.add(
        this.add.ellipse(row.x, row.y, row.w, 44, 0x8d8d61, 0.16)
          .setRotation(row.r)
          .setDepth(-15),
      );
    }
  }

  private addContextGuides(): void {
    const zones = [
      { label: 'LỐI VÀO', x: 800, y: 115 },
      { label: 'TRƯỞNG LÃO', x: 350, y: 330 },
      { label: 'THƯƠNG NHÂN', x: 1210, y: 650 },
      { label: 'DƯỢC SƯ + NƯỚC', x: 350, y: 1080 },
      { label: 'MÉP DÂN CƯ / RUỘNG', x: 1120, y: 1490 },
    ];

    for (const zone of zones) {
      const tag = this.add.text(zone.x, zone.y, zone.label, {
        fontFamily: 'sans-serif',
        fontSize: '19px',
        color: '#403b34',
        fontStyle: 'bold',
        backgroundColor: '#f0e7d3dc',
        padding: { x: 9, y: 5 },
      }).setOrigin(0.5).setDepth(18000);
      this.guideLayer.add(tag);
    }

    const notes = [
      { x: 770, y: 700, text: 'KHOẢNG THỞ GIỮA Z1 / Z2' },
      { x: 820, y: 1080, text: 'KHOẢNG THỞ GIỮA Z2 / Z3' },
      { x: 250, y: 1515, text: 'NƯỚC + RUỘNG: BLOCKOUT' },
    ];
    for (const note of notes) {
      const label = this.add.text(note.x, note.y, note.text, {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#716654',
        fontStyle: 'bold',
        backgroundColor: '#eee5d0bd',
        padding: { x: 6, y: 3 },
      }).setOrigin(0.5).setDepth(18000);
      this.guideLayer.add(label);
    }
  }

  private addAsset(
    texture: string,
    x: number,
    groundY: number,
    width: number,
    flipX = false,
    alpha = 1,
  ): Phaser.GameObjects.Image {
    const image = this.add.image(x, groundY, texture)
      .setOrigin(0.5, 1)
      .setFlipX(flipX)
      .setAlpha(alpha)
      .setDepth(groundY);
    const ratio = image.height > 0 && image.width > 0 ? image.height / image.width : 1;
    image.setDisplaySize(width, width * ratio);
    this.contextLayer.add(image);
    return image;
  }

  private addGroundImage(
    texture: string,
    x: number,
    y: number,
    width: number,
    rotation = 0,
    flipX = false,
    alpha = 0.85,
  ): Phaser.GameObjects.Image {
    const image = this.add.image(x, y, texture)
      .setOrigin(0.5)
      .setRotation(rotation)
      .setAlpha(alpha);
    const scale = image.width > 0 ? width / image.width : 1;
    image.setScale(flipX ? -scale : scale, scale);
    this.contextLayer.add(image);
    return image;
  }

  private treeTexture(): string {
    return this.textures.exists(TEX.treeRuntime) ? TEX.treeRuntime : TEX.tree;
  }

  private prepareTreeRuntimeTexture(): void {
    if (this.textures.exists(TEX.treeRuntime) || !this.textures.exists(TEX.tree)) return;

    const source = this.textures.get(TEX.tree).getSourceImage() as CanvasImageSource & {
      width: number;
      height: number;
    };
    const width = source.width;
    const height = source.height;
    const target = this.textures.createCanvas(TEX.treeRuntime, width, height);
    if (!target) return;

    const context = target.getContext();
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);

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

  private prepareGroundRuntimeTextures(): void {
    this.createMaskedGroundTexture(TEX.pathA, TEX.pathARuntime, 'path-a');
    this.createMaskedGroundTexture(TEX.pathB, TEX.pathBRuntime, 'path-b');
    this.createMaskedGroundTexture(TEX.groundPatch, TEX.groundPatchRuntime, 'patch');
    this.createMaskedGroundTexture(TEX.forecourt, TEX.forecourtRuntime, 'forecourt');
  }

  private createMaskedGroundTexture(sourceKey: string, outputKey: string, mode: GroundMaskMode): void {
    if (this.textures.exists(outputKey) || !this.textures.exists(sourceKey)) return;

    const source = this.textures.get(sourceKey).getSourceImage() as CanvasImageSource & {
      width: number;
      height: number;
    };
    const width = source.width;
    const height = source.height;
    const target = this.textures.createCanvas(outputKey, width, height);
    if (!target) return;

    const context = target.getContext();
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alphaIndex = (y * width + x) * 4 + 3;
        const originalAlpha = pixels[alphaIndex] / 255;
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
        pixels[alphaIndex] = maskedAlpha < 0.035 ? 0 : Math.round(maskedAlpha * 255);
      }
    }

    context.putImageData(imageData, 0, 0);
    target.refresh();
  }

  private createPlayerMarker(): void {
    const shadow = this.add.ellipse(0, 30, 60, 22, 0x3c382f, 0.16);
    const body = this.add.circle(0, 0, 24, 0x334b55, 0.96)
      .setStrokeStyle(4, 0xf0e3c7, 0.9);
    const facing = this.add.triangle(0, -34, -9, 8, 9, 8, 0, -9, 0xe9d4a6, 0.95);
    this.player = this.add.container(800, 285, [shadow, body, facing]).setDepth(20000);
  }

  private createHud(): void {
    const panel = this.add.rectangle(VIEW_WIDTH / 2, 106, VIEW_WIDTH - 24, 188, 0xeee5cf, 0.95)
      .setStrokeStyle(2, 0x6b675b, 0.38)
      .setDepth(30000);
    const title = this.add.text(24, 20, 'V2-A · PATH RHYTHM TUNE', {
      fontFamily: 'serif',
      fontSize: '25px',
      color: '#2b2b27',
      fontStyle: 'bold',
    }).setDepth(30001);
    const subtitle = this.add.text(24, 56, 'accepted art · slimmer spine · healer branch stronger', {
      fontFamily: 'sans-serif',
      fontSize: '15px',
      color: '#5a554b',
    }).setDepth(30001);
    const instruction = this.add.text(24, 89, 'QC: 0.65x đường bớt chiếm mắt? 1.0x nhánh Dược Sư còn rõ?', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#625a4e',
      wordWrap: { width: 430 },
    }).setDepth(30001);

    const guideButton = this.add.rectangle(VIEW_WIDTH - 112, 69, 188, 52, 0x46554c, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.72)
      .setDepth(30002)
      .setInteractive({ useHandCursor: true });
    this.guideButtonLabel = this.add.text(VIEW_WIDTH - 112, 69, 'ẨN NHÃN', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#fff4d8',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5).setDepth(30003);

    const zoomButton = this.add.rectangle(VIEW_WIDTH - 112, 139, 188, 52, 0x5b4b39, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.72)
      .setDepth(30002)
      .setInteractive({ useHandCursor: true });
    this.zoomButtonLabel = this.add.text(VIEW_WIDTH - 112, 139, 'ZOOM · 1.0x', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#fff4d8',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5).setDepth(30003);

    guideButton.on('pointerdown', () => {
      this.guidesVisible = !this.guidesVisible;
      this.guideLayer.setVisible(this.guidesVisible);
      this.guideButtonLabel.setText(this.guidesVisible ? 'ẨN NHÃN' : 'HIỆN NHÃN');
    });
    zoomButton.on('pointerdown', () => this.cycleZoom());

    this.hudLayer.add([
      panel,
      title,
      subtitle,
      instruction,
      guideButton,
      this.guideButtonLabel,
      zoomButton,
      this.zoomButtonLabel,
    ]);
  }

  private createJoystick(): void {
    const ring = this.add.circle(this.joystickX, this.joystickY, 86, 0x4f5a51, 0.08)
      .setStrokeStyle(3, 0x4f5a51, 0.48)
      .setDepth(30005);
    this.joystickNub = this.add.circle(this.joystickX, this.joystickY, 38, 0x4f5a51, 0.42)
      .setDepth(30006);
    const label = this.add.text(this.joystickX, this.joystickY + 108, 'DI CHUYỂN', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#514c43',
      fontStyle: 'bold',
      backgroundColor: '#eee5cfcc',
      padding: { x: 5, y: 3 },
    }).setOrigin(0.5).setDepth(30006);
    this.hudLayer.add([ring, this.joystickNub, label]);
  }

  private configureUiCamera(): void {
    this.uiCamera = this.cameras.add(0, 0, VIEW_WIDTH, VIEW_HEIGHT, false, 'qc-ui');
    this.uiCamera.setBackgroundColor('rgba(0,0,0,0)');
    this.cameras.main.ignore(this.hudLayer);
    this.uiCamera.ignore([this.contextLayer, this.guideLayer, this.player]);
  }

  private cycleZoom(): void {
    this.zoomIndex = (this.zoomIndex + 1) % ZOOM_LEVELS.length;
    const zoom = ZOOM_LEVELS[this.zoomIndex];
    this.cameras.main.setZoom(zoom);
    const label = zoom === 1 ? '1.0x' : zoom === 0.8 ? '0.8x' : '0.65x';
    this.zoomButtonLabel.setText(`ZOOM · ${label}`);
  }

  private bindInput(): void {
    const radius = 105;
    const updateJoystick = (pointer: Phaser.Input.Pointer): void => {
      const dx = pointer.x - this.joystickX;
      const dy = pointer.y - this.joystickY;
      const length = Math.hypot(dx, dy);
      const capped = Math.min(radius, length);
      const nx = length > 0 ? dx / length : 0;
      const ny = length > 0 ? dy / length : 0;
      this.moveX = nx * Math.min(1, length / 45);
      this.moveY = ny * Math.min(1, length / 45);
      this.joystickNub.setPosition(
        this.joystickX + nx * capped * 0.62,
        this.joystickY + ny * capped * 0.62,
      );
    };

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const distance = Phaser.Math.Distance.Between(
        pointer.x,
        pointer.y,
        this.joystickX,
        this.joystickY,
      );
      if (distance > radius) return;
      this.joystickPointerId = pointer.id;
      updateJoystick(pointer);
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointerId !== pointer.id) return;
      updateJoystick(pointer);
    });

    const release = (pointer: Phaser.Input.Pointer): void => {
      if (this.joystickPointerId !== pointer.id) return;
      this.joystickPointerId = null;
      this.moveX = 0;
      this.moveY = 0;
      this.joystickNub.setPosition(this.joystickX, this.joystickY);
    };

    this.input.on('pointerup', release);
    this.input.on('pointerupoutside', release);
  }
}
