import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import { VillageTopologyQcScene } from './VillageTopologyQcScene';

// Thin QC-only integration layer: preserve the PHONE_PASS village scene and replace water/bridge blockout only.
const HEALER_WATER_BRIDGE_TEX = 'qc-healer-water-bridge-a4-webp';
const HEALER_WATER_BRIDGE_PATH = 'assets/c4/environment/settlement/env_healer_water_bridge_a.webp';

interface VillageQcLayers {
  contextLayer: Phaser.GameObjects.Container;
  hudLayer: Phaser.GameObjects.Container;
  guideLayer: Phaser.GameObjects.Container;
  player: Phaser.GameObjects.Container;
}

export class VillageTopologyQcA4Scene extends VillageTopologyQcScene {
  preload(): void {
    super.preload();
    if (!this.textures.exists(HEALER_WATER_BRIDGE_TEX)) {
      this.load.image(HEALER_WATER_BRIDGE_TEX, c4AssetUrl(HEALER_WATER_BRIDGE_PATH));
    }
  }

  create(): void {
    super.create();
    this.replaceHealerWaterBridgeBlockout();
    this.refreshQcCopy();
    this.focusHealerPocket();
  }

  private qcLayers(): VillageQcLayers {
    return this as unknown as VillageQcLayers;
  }

  private replaceHealerWaterBridgeBlockout(): void {
    if (!this.textures.exists(HEALER_WATER_BRIDGE_TEX)) return;

    const { contextLayer } = this.qcLayers();
    const targets = [
      { x: 235, y: 1430 },
      { x: 365, y: 1490 },
      { x: 350, y: 1448 },
    ];

    // The accepted village scene stores world art inside contextLayer, not scene.children.
    // Remove only the old pond/stream/bridge diagnostic shapes at their locked coordinates.
    for (const child of [...contextLayer.list]) {
      if (!(child instanceof Phaser.GameObjects.Shape)) continue;
      if (targets.some((target) => Math.abs(child.x - target.x) < 1 && Math.abs(child.y - target.y) < 1)) {
        child.destroy();
      }
    }

    const waterBridge = this.add.image(325, 1455, HEALER_WATER_BRIDGE_TEX)
      .setOrigin(0.5)
      .setDisplaySize(500, 281);
    contextLayer.add(waterBridge);
  }

  private refreshQcCopy(): void {
    const { hudLayer, guideLayer } = this.qcLayers();

    const replacements = new Map<string, string>([
      ['V2-A · PATH RHYTHM TUNE', 'V2-A · HEALER WATER + BRIDGE A4'],
      ['accepted art · slimmer spine · healer branch stronger', 'ground/path locked · painterly water + humble crossing'],
      ['QC: 0.65x đường bớt chiếm mắt? 1.0x nhánh Dược Sư còn rõ?', 'QC: cầu có nối đúng hai bờ? 1.0x hợp scale? 0.65x có lấn hierarchy?'],
      ['NƯỚC + RUỘNG: BLOCKOUT', 'NƯỚC + CẦU: A4 · RUỘNG: BLOCKOUT'],
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

  private focusHealerPocket(): void {
    const { player } = this.qcLayers();
    player?.setPosition(650, 1425);
  }
}
