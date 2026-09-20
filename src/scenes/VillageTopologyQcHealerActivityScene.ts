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

    // One compact herb garden plus one drying/work cluster. Keep both off the main spine and below hero-house hierarchy.
    const herbBed = this.add.image(575, 1450, HEALER_HERB_TEX)
      .setOrigin(0.5)
      .setDisplaySize(205, 126)
      .setDepth(1450)
      .setAlpha(0.95);

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
      ['V2-A · HEALER WATER + BRIDGE A4 TUNE', 'V2-A · HEALER ACTIVITY KIT A'],
      ['ground/path locked · A4 12% smaller · softer hierarchy', 'water/bridge locked · herb garden + drying/work proof'],
      ['QC: 0.65x cụm nước bớt hút mắt? 1.0x cầu/nước vẫn đủ rõ?', 'QC: 0.65x pocket có quá rối? 1.0x luống + giàn phơi có đọc rõ?'],
      ['NƯỚC + CẦU: A4 TUNE · RUỘNG: BLOCKOUT', 'NƯỚC + CẦU: PASS · HEALER ACTIVITY: PROOF'],
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
