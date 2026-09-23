import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import {
  promoteLockedSettlementV2A,
  SETTLEMENT_V2A_PRELOADS,
} from '../game/settlementV2AProduction';
import { WORLD } from '../game/worldConfig';
import { GameScene } from './GameScene';

const QC_ZOOM_LEVELS = [1, 0.8, 0.65, 0.5] as const;

export class ProductionGameScene extends GameScene {
  private qcZoomIndex = 0;
  private qcZoomLabel?: Phaser.GameObjects.Text;
  private qcHudCamera?: Phaser.Cameras.Scene2D.Camera;
  private readonly qcClassifiedObjects = new Set<Phaser.GameObjects.GameObject>();

  preload(): void {
    super.preload();
    for (const [key, path] of SETTLEMENT_V2A_PRELOADS) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    super.create();
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (settlement) promoteLockedSettlementV2A(this, settlement);

    this.qcZoomIndex = 0;
    this.qcClassifiedObjects.clear();
    this.createQcZoomUi();
    this.refreshQcCameraFilters();
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
    this.refreshQcCameraFilters();
  }

  private createQcZoomUi(): void {
    const { width, height } = this.scale;

    const buttonX = width - 96;
    const buttonY = 205;
    const button = this.add.rectangle(buttonX, buttonY, 170, 52, 0x5b4b39, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.82)
      .setScrollFactor(0)
      .setDepth(130)
      .setInteractive({ useHandCursor: true });

    this.qcZoomLabel = this.add.text(buttonX, buttonY, 'ZOOM · 1.0x', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#fff4d8',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(131);

    button.on('pointerdown', () => this.cycleQcZoom());

    // Keep the gameplay HUD and touch controls at native screen scale while only
    // the world camera zooms for visual QC. Newly spawned world VFX/enemies are
    // classified during update so they never become part of the HUD camera.
    this.qcHudCamera = this.cameras.add(0, 0, width, height, false, 'production-qc-ui');
    this.qcHudCamera.setBackgroundColor('rgba(0,0,0,0)');
  }

  private cycleQcZoom(): void {
    this.qcZoomIndex = (this.qcZoomIndex + 1) % QC_ZOOM_LEVELS.length;
    const zoom = QC_ZOOM_LEVELS[this.qcZoomIndex];
    this.cameras.main.setZoom(zoom);
    this.qcZoomLabel?.setText(`ZOOM · ${this.qcZoomLabelFor(zoom)}`);
  }

  private qcZoomLabelFor(zoom: number): string {
    if (zoom === 1) return '1.0x';
    if (zoom === 0.8) return '0.8x';
    if (zoom === 0.65) return '0.65x';
    return '0.5x';
  }

  private refreshQcCameraFilters(): void {
    const hudCamera = this.qcHudCamera;
    if (!hudCamera) return;

    for (const child of this.children.list) {
      if (this.qcClassifiedObjects.has(child)) continue;

      const candidate = child as Phaser.GameObjects.GameObject & {
        scrollFactorX?: number;
        scrollFactorY?: number;
      };
      const fixedToScreen = candidate.scrollFactorX === 0 && candidate.scrollFactorY === 0;

      if (fixedToScreen) this.cameras.main.ignore(child);
      else hudCamera.ignore(child);

      this.qcClassifiedObjects.add(child);
    }
  }
}
