import Phaser from 'phaser';
import { c4AssetUrl } from '../game/art/assetManifest';
import { applySettlementCohesionPassA } from '../game/settlementCohesionPassA';
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
  private qcUiToggleLabel?: Phaser.GameObjects.Text;
  private qcHudCamera?: Phaser.Cameras.Scene2D.Camera;
  private qcControlsCamera?: Phaser.Cameras.Scene2D.Camera;
  private qcUiVisible = true;
  private readonly qcClassifiedObjects = new Set<Phaser.GameObjects.GameObject>();
  private readonly qcControlObjects = new Set<Phaser.GameObjects.GameObject>();
  private readonly qcWorldTextVisibility = new Map<Phaser.GameObjects.Text, boolean>();

  preload(): void {
    super.preload();
    for (const [key, path] of SETTLEMENT_V2A_PRELOADS) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    super.create();
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (settlement) {
      promoteLockedSettlementV2A(this, settlement);
      applySettlementCohesionPassA(this, settlement);
    }

    this.qcZoomIndex = 0;
    this.qcUiVisible = true;
    this.qcClassifiedObjects.clear();
    this.qcControlObjects.clear();
    this.qcWorldTextVisibility.clear();
    this.createQcControls();
    this.refreshQcCameraFilters();
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
    this.refreshQcCameraFilters();
    if (!this.qcUiVisible) this.captureAndHideWorldTextLabels();
  }

  private createQcControls(): void {
    const { width, height } = this.scale;
    const buttonX = width - 96;

    const zoomButton = this.add.rectangle(buttonX, 205, 170, 52, 0x5b4b39, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.82)
      .setScrollFactor(0)
      .setDepth(130)
      .setInteractive({ useHandCursor: true });

    this.qcZoomLabel = this.add.text(buttonX, 205, 'ZOOM · 1.0x', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#fff4d8',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(131);

    const uiButton = this.add.rectangle(buttonX, 267, 170, 48, 0x46554c, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.82)
      .setScrollFactor(0)
      .setDepth(130)
      .setInteractive({ useHandCursor: true });

    this.qcUiToggleLabel = this.add.text(buttonX, 267, 'ẨN UI', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#fff4d8',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(131);

    this.qcControlObjects.add(zoomButton);
    this.qcControlObjects.add(this.qcZoomLabel);
    this.qcControlObjects.add(uiButton);
    this.qcControlObjects.add(this.qcUiToggleLabel);

    zoomButton.on('pointerdown', () => this.cycleQcZoom());
    uiButton.on('pointerdown', () => this.setQcUiVisible(!this.qcUiVisible));

    // The world, gameplay HUD, and persistent QC controls each get their own camera.
    // This lets QC hide every gameplay overlay while keeping ZOOM / UI controls
    // available to restore the view without changing gameplay state.
    this.qcHudCamera = this.cameras.add(0, 0, width, height, false, 'production-qc-ui');
    this.qcHudCamera.setBackgroundColor('rgba(0,0,0,0)');
    this.qcControlsCamera = this.cameras.add(0, 0, width, height, false, 'production-qc-controls');
    this.qcControlsCamera.setBackgroundColor('rgba(0,0,0,0)');
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

  private setQcUiVisible(visible: boolean): void {
    this.qcUiVisible = visible;
    this.qcHudCamera?.setVisible(visible);
    this.qcUiToggleLabel?.setText(visible ? 'ẨN UI' : 'HIỆN UI');

    if (visible) this.restoreWorldTextLabels();
    else this.captureAndHideWorldTextLabels();
  }

  private captureAndHideWorldTextLabels(): void {
    const visit = (object: Phaser.GameObjects.GameObject): void => {
      if (this.qcControlObjects.has(object)) return;

      if (object instanceof Phaser.GameObjects.Text) {
        const fixedToScreen = object.scrollFactorX === 0 && object.scrollFactorY === 0;
        if (fixedToScreen) return;
        if (!this.qcWorldTextVisibility.has(object)) {
          this.qcWorldTextVisibility.set(object, object.visible);
        }
        object.setVisible(false);
        return;
      }

      if (object instanceof Phaser.GameObjects.Container) {
        for (const nested of object.list) visit(nested);
      }
    };

    for (const child of this.children.list) visit(child);
  }

  private restoreWorldTextLabels(): void {
    for (const [text, wasVisible] of this.qcWorldTextVisibility) {
      if (text.active) text.setVisible(wasVisible);
    }
    this.qcWorldTextVisibility.clear();
  }

  private refreshQcCameraFilters(): void {
    const hudCamera = this.qcHudCamera;
    const controlsCamera = this.qcControlsCamera;
    if (!hudCamera || !controlsCamera) return;

    for (const child of this.children.list) {
      if (this.qcClassifiedObjects.has(child)) continue;

      const candidate = child as Phaser.GameObjects.GameObject & {
        scrollFactorX?: number;
        scrollFactorY?: number;
      };
      const fixedToScreen = candidate.scrollFactorX === 0 && candidate.scrollFactorY === 0;

      if (this.qcControlObjects.has(child)) {
        this.cameras.main.ignore(child);
        hudCamera.ignore(child);
      } else if (fixedToScreen) {
        this.cameras.main.ignore(child);
        controlsCamera.ignore(child);
      } else {
        hudCamera.ignore(child);
        controlsCamera.ignore(child);
      }

      this.qcClassifiedObjects.add(child);
    }
  }
}
