import { c4AssetUrl } from '../game/art/assetManifest';
import {
  promoteLockedSettlementV2A,
  SETTLEMENT_V2A_PRELOADS,
} from '../game/settlementV2AProduction';
import { WORLD } from '../game/worldConfig';
import { GameScene } from './GameScene';

export class ProductionGameScene extends GameScene {
  preload(): void {
    super.preload();
    for (const [key, path] of SETTLEMENT_V2A_PRELOADS) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    super.create();
    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement');
    if (!settlement) return;
    promoteLockedSettlementV2A(this, settlement);
  }
}
