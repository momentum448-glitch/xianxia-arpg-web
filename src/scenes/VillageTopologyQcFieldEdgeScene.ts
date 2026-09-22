import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import { VillageTopologyQcHealerActivityScene } from './VillageTopologyQcHealerActivityScene';

const FIELD_EDGE_TEX = 'qc-field-edge-kit-b';
const FIELD_EDGE_PATH = 'assets/c4/environment/settlement/env_field_edge_kit_b.webp';

interface VillageQcLayers {
  contextLayer: Phaser.GameObjects.Container;
  hudLayer: Phaser.GameObjects.Container;
  guideLayer: Phaser.GameObjects.Container;
  player: Phaser.GameObjects.Container;
}

export class VillageTopologyQcFieldEdgeScene extends VillageTopologyQcHealerActivityScene {
  preload(): void {
    super.preload();
    if (!this.textures.exists(FIELD_EDGE_TEX)) {
      this.load.image(FIELD_EDGE_TEX, c4AssetUrl(FIELD_EDGE_PATH));
    }
  }

  create(): void {
    super.create();
    this.replaceSouthernFieldBlockout();
    this.refreshFieldQcCopy();
    this.focusFieldEdge();
  }

  private fieldLayers(): VillageQcLayers {
    return this as unknown as VillageQcLayers;
  }

  private replaceSouthernFieldBlockout(): void {
    if (!this.textures.exists(FIELD_EDGE_TEX)) return;

    const { contextLayer } = this.fieldLayers();
    const targets = [
      { x: 1210, y: 1585 },
      { x: 1190, y: 1640 },
    ];

    // B proof keeps the accepted footprint/placement and only replaces the rejected A artwork.
    // Preserve left field blockout, route, houses, Healer pocket and gameplay space.
    for (const child of [...contextLayer.list]) {
      if (!(child instanceof Phaser.GameObjects.Shape)) continue;
      if (targets.some((target) => Math.abs(child.x - target.x) < 1 && Math.abs(child.y - target.y) < 1)) {
        child.destroy();
      }
    }

    // Keep the loader texture intact. Build a cleaned canvas under a separate key and render
    // directly from that key so Phaser never has to remove/rename the source texture at runtime.
    const renderTextureKey = this.buildEdgeConnectedDarkMatteCanvas(FIELD_EDGE_TEX);

    const fieldEdge = this.add.image(1210, 1620, renderTextureKey)
      .setOrigin(0.5)
      .setDisplaySize(320, 180)
      .setDepth(-14)
      .setAlpha(0.96);

    contextLayer.add(fieldEdge);
  }

  private buildEdgeConnectedDarkMatteCanvas(textureKey: string): string {
    const source = this.textures.get(textureKey).getSourceImage() as CanvasImageSource & {
      width: number;
      height: number;
    };
    const width = source.width;
    const height = source.height;
    const targetKey = `${textureKey}-alpha-fixed`;
    if (this.textures.exists(targetKey)) this.textures.remove(targetKey);
    const target = this.textures.createCanvas(targetKey, width, height);
    if (!target) return textureKey;

    const context = target.getContext();
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const visited = new Uint8Array(width * height);
    const queue = new Uint32Array(width * height);
    let head = 0;
    let tail = 0;

    const isBackgroundCandidate = (index: number): boolean => {
      const offset = index * 4;
      const alpha = pixels[offset + 3];
      if (alpha <= 8) return true;
      return pixels[offset] <= 40
        && pixels[offset + 1] <= 40
        && pixels[offset + 2] <= 40;
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
    return targetKey;
  }

  private refreshFieldQcCopy(): void {
    const { hudLayer, guideLayer } = this.fieldLayers();

    const replacements = new Map<string, string>([
      ['V2-A · HEALER ACTIVITY KIT A · GARDEN POS', 'V2-A · FIELD EDGE KIT B · PROOF'],
      ['water/bridge locked · herb garden moved to healer-left edge', 'healer locked · painterly field-edge B at same footprint'],
      ['QC: vườn bên trái nhà Dược Sư đã hợp lý? 0.65x pocket còn thoáng?', 'QC: 1.0x B hòa painterly? 0.65x mép làng tự nhiên, không hút mắt?'],
      ['NƯỚC + CẦU: PASS · HEALER ACTIVITY: POSITION REVISE', 'HEALER: PASS · FIELD EDGE B: PROOF'],
    ]);

    const visit = (child: Phaser.GameObjects.GameObject): void => {
      if (child instanceof Phaser.GameObjects.Text) {
        const replacement = replacements.get(child.text);
        if (replacement) child.setText(replacement);
      }
      if (child instanceof Phaser.GameObjects.Container) {
        child.list.forEach(visit);
      }
    };

    hudLayer.list.forEach(visit);
    guideLayer.list.forEach(visit);
  }

  private focusFieldEdge(): void {
    const { player } = this.fieldLayers();
    player?.setPosition(930, 1580);
  }
}
