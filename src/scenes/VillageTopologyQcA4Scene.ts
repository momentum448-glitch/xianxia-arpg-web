import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import { VillageTopologyQcScene } from './VillageTopologyQcScene';

// Thin QC-only integration layer: preserve the PHONE_PASS village scene and replace water/bridge blockout only.
const HEALER_WATER_BRIDGE_TEX = 'qc-healer-water-bridge-a4';
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
    this.replaceHealerWaterBridgeBlockout();
    this.refreshQcCopy();
    this.focusHealerPocket();
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

    const waterBridge = this.add.image(325, 1455, HEALER_WATER_BRIDGE_TEX)
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
