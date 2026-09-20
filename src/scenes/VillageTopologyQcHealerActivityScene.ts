import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import { VillageTopologyQcA4Scene } from './VillageTopologyQcA4Scene';

const HEALER_HERB_TEX = 'qc-healer-herb-bed-a';
const HEALER_DRYING_TEX = 'qc-healer-drying-props-a';
const HEALER_HERB_PATH = 'assets/c4/environment/settlement/env_healer_herb_bed_a.webp';
const HEALER_DRYING_PATH = 'assets/c4/environment/settlement/env_healer_drying_props_a.webp';

interface VillageQcLayers {
  contextLayer: Phaser.GameObjects.Container;
  hudLayer: Phaser.GameObjects.Container;
  guideLayer: Phaser.GameObjects.Container;
  player: Phaser.GameObjects.Container;
}

export class VillageTopologyQcHealerActivityScene extends VillageTopologyQcA4Scene {
  preload(): void {
    super.preload();
    if (!this.textures.exists(HEALER_HERB_TEX)) {
      this.load.image(HEALER_HERB_TEX, c4AssetUrl(HEALER_HERB_PATH));
    }
    if (!this.textures.exists(HEALER_DRYING_TEX)) {
      this.load.image(HEALER_DRYING_TEX, c4AssetUrl(HEALER_DRYING_PATH));
    }
  }

  create(): void {
    super.create();
    this.replaceHealerActivityBlockout();
    this.refreshActivityQcCopy();
  }

  private activityLayers(): VillageQcLayers {
    return this as unknown as VillageQcLayers;
  }

  private replaceHealerActivityBlockout(): void {
    const { contextLayer } = this.activityLayers();

    const herbBlockouts = [
      { x: 535, y: 1370 },
      { x: 555, y: 1420 },
      { x: 520, y: 1470 },
    ];

    for (const child of [...contextLayer.list]) {
      if (!(child instanceof Phaser.GameObjects.Rectangle)) continue;
      if (herbBlockouts.some((target) => Math.abs(child.x - target.x) < 1 && Math.abs(child.y - target.y) < 1)) {
        child.destroy();
      }
    }

    // Phone QC composition revise: the herb garden belongs on the greener left edge of the healer house,
    // not on the right side of the water pocket. Preserve accepted art, scale and mask; move position only.
    const herbBedX = 125;
    const herbBedY = 1335;
    const herbBedWidth = 205;
    const herbBedHeight = 126;
    const herbBed = this.add.image(herbBedX, herbBedY, HEALER_HERB_TEX)
      .setOrigin(0.5)
      .setDisplaySize(herbBedWidth, herbBedHeight)
      .setDepth(herbBedY)
      .setAlpha(0.95);

    // The source proof contains a pale rectangular matte plus two detached edge fragments.
    // Keep the accepted artwork and crop only those transport artifacts at runtime.
    // Normalized polygon follows the actual herb-bed footprint, so scale/placement stay locked.
    const footprint = [
      [0.20, 0.10],
      [0.35, 0.02],
      [0.53, 0.00],
      [0.68, 0.07],
      [0.81, 0.17],
      [0.91, 0.31],
      [0.95, 0.49],
      [0.92, 0.66],
      [0.85, 0.79],
      [0.74, 0.90],
      [0.60, 0.98],
      [0.43, 1.00],
      [0.29, 0.95],
      [0.16, 0.87],
      [0.07, 0.74],
      [0.04, 0.58],
      [0.06, 0.42],
      [0.11, 0.29],
      [0.17, 0.21],
    ] as const;
    const maskGraphics = this.make.graphics({}, false);
    const left = herbBedX - herbBedWidth / 2;
    const top = herbBedY - herbBedHeight / 2;
    maskGraphics.fillStyle(0xffffff, 1);
    maskGraphics.beginPath();
    footprint.forEach(([nx, ny], index) => {
      const x = left + nx * herbBedWidth;
      const y = top + ny * herbBedHeight;
      if (index === 0) maskGraphics.moveTo(x, y);
      else maskGraphics.lineTo(x, y);
    });
    maskGraphics.closePath();
    maskGraphics.fillPath();
    herbBed.setMask(maskGraphics.createGeometryMask());

    const dryingProps = this.add.image(548, 1340, HEALER_DRYING_TEX)
      .setOrigin(0.5)
      .setDisplaySize(112, 124)
      .setDepth(1340)
      .setAlpha(0.95);

    contextLayer.add([herbBed, dryingProps]);
  }

  private refreshActivityQcCopy(): void {
    const { hudLayer, guideLayer } = this.activityLayers();

    const replacements = new Map<string, string>([
      ['V2-A · HEALER WATER + BRIDGE A4 TUNE', 'V2-A · HEALER ACTIVITY KIT A · GARDEN POS'],
      ['ground/path locked · A4 12% smaller · softer hierarchy', 'water/bridge locked · herb garden moved to healer-left edge'],
      ['QC: 0.65x cụm nước bớt hút mắt? 1.0x cầu/nước vẫn đủ rõ?', 'QC: vườn bên trái nhà Dược Sư đã hợp lý? 0.65x pocket còn thoáng?'],
      ['NƯỚC + CẦU: A4 TUNE · RUỘNG: BLOCKOUT', 'NƯỚC + CẦU: PASS · HEALER ACTIVITY: POSITION REVISE'],
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
}
