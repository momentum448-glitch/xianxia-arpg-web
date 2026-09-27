import Phaser from 'phaser';
import { createPlayerVisual } from '../game/actorVisuals';
import type { PlayerGender } from '../game/playerProfile';

interface ChoiceView {
  card: Phaser.GameObjects.Rectangle;
  visual: Phaser.GameObjects.Container;
  selectedText: Phaser.GameObjects.Text;
}

export class CharacterSelectScene extends Phaser.Scene {
  private selectedGender: PlayerGender = 'male';
  private choices = {} as Record<PlayerGender, ChoiceView>;
  private selectionSummary!: Phaser.GameObjects.Text;

  constructor() {
    super('CharacterSelect');
  }

  create(): void {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#efe6d2');

    this.add.text(width / 2, 92, 'SƠ NHẬP TIÊN ĐỒ', {
      fontFamily: 'serif',
      fontSize: '42px',
      color: '#2b2b25',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 148, 'Chọn thân phận khởi đầu', {
      fontFamily: 'sans-serif',
      fontSize: '22px',
      color: '#5c5b50',
    }).setOrigin(0.5);

    const cardY = height * 0.48;
    this.choices.male = this.createChoice(
      width * 0.29,
      cardY,
      'NAM',
      'male',
      'Kiếm tu thanh lãnh\nNgoại hình nam',
    );
    this.choices.female = this.createChoice(
      width * 0.71,
      cardY,
      'NỮ',
      'female',
      'Kiếm tu thanh nhã\nNgoại hình nữ',
    );

    this.selectionSummary = this.add.text(width / 2, height - 220, '', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#5f594d',
      align: 'center',
    }).setOrigin(0.5);

    const startButton = this.add.rectangle(width / 2, height - 135, Math.min(390, width * 0.62), 74, 0x4d5e50, 0.96)
      .setStrokeStyle(3, 0xd8c9a8, 0.95)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height - 135, 'BẮT ĐẦU HÀNH TRÌNH', {
      fontFamily: 'serif',
      fontSize: '22px',
      color: '#f6edd9',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    startButton.on('pointerdown', () => {
      this.scene.start('Game', { gender: this.selectedGender });
    });

    this.add.text(width / 2, height - 62, 'Nam / Nữ dùng cùng chỉ số chiến đấu khởi đầu', {
      fontFamily: 'sans-serif',
      fontSize: '15px',
      color: '#777264',
    }).setOrigin(0.5);

    this.refreshSelection();
  }

  private createChoice(
    x: number,
    y: number,
    label: string,
    gender: PlayerGender,
    description: string,
  ): ChoiceView {
    const { width, height } = this.scale;
    const cardWidth = Math.min(260, width * 0.38);
    const cardHeight = Math.min(480, height * 0.46);
    const card = this.add.rectangle(x, y, cardWidth, cardHeight, 0xf8f1df, 0.97)
      .setStrokeStyle(3, 0x8f8774, 0.55)
      .setInteractive({ useHandCursor: true });

    this.add.rectangle(x, y - cardHeight * 0.34, cardWidth - 24, cardHeight * 0.46, 0xe7dcc5, 0.62);

    const visual = createPlayerVisual(this, gender, x, y - cardHeight * 0.31)
      .setScale(gender === 'male' ? 1.72 : 1.9)
      .setDepth(5);

    this.add.text(x, y + cardHeight * 0.19, label, {
      fontFamily: 'serif',
      fontSize: '30px',
      color: '#24241f',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(6);

    this.add.text(x, y + cardHeight * 0.31, description, {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#5b574d',
      align: 'center',
      lineSpacing: 5,
    }).setOrigin(0.5).setDepth(6);

    const selectedText = this.add.text(x, y - cardHeight * 0.44, 'ĐÃ CHỌN', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#f6edd9',
      fontStyle: 'bold',
      backgroundColor: '#4d5e50',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setDepth(7);

    card.on('pointerdown', () => {
      this.selectedGender = gender;
      this.refreshSelection();
    });

    return { card, visual, selectedText };
  }

  private refreshSelection(): void {
    for (const gender of ['male', 'female'] as PlayerGender[]) {
      const choice = this.choices[gender];
      const selected = gender === this.selectedGender;
      choice.card.setStrokeStyle(selected ? 6 : 3, selected ? 0x4d5e50 : 0x8f8774, selected ? 0.95 : 0.55);
      choice.visual.setAlpha(selected ? 1 : 0.7);
      choice.selectedText.setVisible(selected);
    }

    this.selectionSummary.setText(
      this.selectedGender === 'male'
        ? 'Đã chọn: Nam • kiếm tu thanh lãnh'
        : 'Đã chọn: Nữ • kiếm tu thanh nhã',
    );
  }
}
