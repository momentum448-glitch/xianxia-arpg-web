import Phaser from 'phaser';
import type { PlayerGender } from '../game/playerProfile';

export class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelect');
  }

  create(): void {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#efe6d2');

    this.add.text(width / 2, 120, 'SƠ NHẬP TIÊN ĐỒ', {
      fontFamily: 'serif',
      fontSize: '44px',
      color: '#2b2b25',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 182, 'Chọn thân phận khởi đầu', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#5c5b50',
    }).setOrigin(0.5);

    this.createChoice(width * 0.3, height * 0.48, 'NAM', 'male', '#425b52');
    this.createChoice(width * 0.7, height * 0.48, 'NỮ', 'female', '#785560');

    this.add.text(width / 2, height - 110, 'Prototype • art thật sẽ thay placeholder', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#777264',
    }).setOrigin(0.5);
  }

  private createChoice(x: number, y: number, label: string, gender: PlayerGender, color: string): void {
    const card = this.add.rectangle(x, y, 250, 430, 0xf8f1df, 0.96)
      .setStrokeStyle(4, 0x403d34)
      .setInteractive({ useHandCursor: true });

    this.add.circle(x, y - 55, 72, Number.parseInt(color.slice(1), 16));
    this.add.text(x, y + 95, label, {
      fontFamily: 'serif',
      fontSize: '34px',
      color: '#24241f',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    card.on('pointerdown', () => {
      this.scene.start('Game', { gender });
    });
  }
}
