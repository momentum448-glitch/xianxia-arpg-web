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

    // Canonical B runtime asset now has valid alpha; render it directly.
    const fieldEdge = this.add.image(1210, 1620, FIELD_EDGE_TEX)
      .setOrigin(0.5)
      .setDisplaySize(320, 180)
      .setDepth(-14)
      .setAlpha(0.96);

    contextLayer.add(fieldEdge);
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
