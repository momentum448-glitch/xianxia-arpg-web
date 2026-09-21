import Phaser from 'phaser';
import './style.css';
import { VillageTopologyQcFieldEdgeScene } from './scenes/VillageTopologyQcFieldEdgeScene';

const buildBadge = document.createElement('div');
buildBadge.id = 'build-id';
buildBadge.textContent = `BUILD ${__BUILD_ID__}`;
document.body.appendChild(buildBadge);

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 720,
  height: 1280,
  backgroundColor: '#171914',
  scene: [VillageTopologyQcFieldEdgeScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 1280,
  },
  render: {
    antialias: true,
    roundPixels: false,
  },
};

new Phaser.Game(config);
