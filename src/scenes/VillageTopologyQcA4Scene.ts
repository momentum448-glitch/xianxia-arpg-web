import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import { VillageTopologyQcScene } from './VillageTopologyQcScene';

// Thin QC-only integration layer: preserve the PHONE_PASS village scene and replace water/bridge blockout only.
const HEALER_WATER_BRIDGE_TEX = 'qc-healer-water-bridge-a4';
const HEALER_WATER_BRIDGE_RUNTIME_TEX = 'qc-healer-water-bridge-a4-rgba';
const HEALER_WATER_BRIDGE_PATH = 'assets/c4/environment/settlement/env_healer_water_bridge_a.png';

export class VillageTopologyQcA4Scene extends VillageTopologyQcScene {
  preload(): void {
    super.preload();
    if (!this.textures.exists(HEALER_WATER_BRIDGE_TEX)) {
      this.load.image(HEALER_WATER_BRIDGE_TEX, c4AssetUrl(HEALER_WATER_BRIDGE_PATH));
    }
  }

  create(): void {
    super.create();
    this.prepareHealerWaterBridgeRuntimeTexture();
    this.replaceHealerWaterBridgeBlockout();
    this.refreshQcCopy();
    this.focusHealerPocket();
  }

  private prepareHealerWaterBridgeRuntimeTexture(): void {
    if (
      this.textures.exists(HEALER_WATER_BRIDGE_RUNTIME_TEX)
      || !this.textures.exists(HEALER_WATER_BRIDGE_TEX)
    ) return;

    const source = this.textures.get(HEALER_WATER_BRIDGE_TEX).getSourceImage() as CanvasImageSource & {
      width: number;
      height: number;
    };
    const width = source.width;
    const height = source.height;
    const target = this.textures.createCanvas(HEALER_WATER_BRIDGE_RUNTIME_TEX, width, height);
    if (!target) return;

    const context = target.getContext();
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);

    // Some mobile/WebGL paths displayed the indexed PNG's transparent palette as opaque black.
    // Rebuild it as a canvas RGBA texture and only clear edge-connected transparent/near-black pixels.
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
        pixels[offset] <= 14
        && pixels[offset + 1] <= 14
        && pixels[offset + 2] <= 14
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

  private replaceHealerWaterBridgeBlockout(): void {
    const targets = [
      { x: 235, y: 1430 },
      { x: 365, y: 1490 },
      { x: 350, y: 1448 },
    ];

    for (const child of [...this.children.list]) {
      if (!(child instanceof Phaser.GameObjects.Shape)) continue;
      if (targets.some((target) => Math.abs(child.x - target.x) < 1 && Math.abs(child.y - target.y) < 1)) {
        child.destroy();
      }
    }

    const texture = this.textures.exists(HEALER_WATER_BRIDGE_RUNTIME_TEX)
      ? HEALER_WATER_BRIDGE_RUNTIME_TEX
      : HEALER_WATER_BRIDGE_TEX;
    const waterBridge = this.add.image(325, 1455, texture)
      .setOrigin(0.5)
      .setDisplaySize(500, 281)
      .setDepth(1320);

    const contextLayer = (this as unknown as {
      contextLayer: Phaser.GameObjects.Container;
    }).contextLayer;
    contextLayer.add(waterBridge);
  }

  private refreshQcCopy(): void {
    for (const child of this.children.list) {
      if (!(child instanceof Phaser.GameObjects.Text)) continue;

      if (child.text === 'V2-A · PATH RHYTHM TUNE') {
        child.setText('V2-A · HEALER WATER + BRIDGE A4');
      } else if (child.text === 'accepted art · slimmer spine · healer branch stronger') {
        child.setText('ground/path locked · painterly water + humble crossing');
      } else if (child.text === 'QC: 0.65x đường bớt chiếm mắt? 1.0x nhánh Dược Sư còn rõ?') {
        child.setText('QC: cầu có nối đúng hai bờ? 1.0x hợp scale? 0.65x có lấn hierarchy?');
      } else if (child.text === 'NƯỚC + RUỘNG: BLOCKOUT') {
        child.setText('NƯỚC + CẦU: A4 · RUỘNG: BLOCKOUT');
      }
    }
  }

  private focusHealerPocket(): void {
    const player = this.children.list.find(
      (child): child is Phaser.GameObjects.Container =>
        child instanceof Phaser.GameObjects.Container && child.depth === 20000,
    );
    player?.setPosition(650, 1425);
  }
}
