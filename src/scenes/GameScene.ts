import Phaser from 'phaser';
import { createPlayerProfile, type PlayerGender, type PlayerProfile } from '../game/playerProfile';

interface EnemyState {
  node: Phaser.GameObjects.Arc;
  hp: number;
}

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private profile!: PlayerProfile;
  private enemies: EnemyState[] = [];
  private moveX = 0;
  private moveY = 0;
  private joystickPointerId: number | null = null;
  private joystickBase!: Phaser.GameObjects.Arc;
  private joystickNub!: Phaser.GameObjects.Arc;
  private nextAttackAt = 0;
  private spiritText!: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
  }

  init(data: { gender?: PlayerGender }): void {
    this.profile = createPlayerProfile(data.gender ?? 'male');
  }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#d9d0b7');

    this.add.rectangle(width / 2, height / 2, width - 32, height - 32, 0xded5ba)
      .setStrokeStyle(3, 0x545044);

    this.add.text(28, 26, 'Thanh Vân Ngoại Vực', {
      fontFamily: 'serif', fontSize: '28px', color: '#262922', fontStyle: 'bold',
    });

    this.spiritText = this.add.text(28, 68, '', {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#394038',
    });

    const playerColor = this.profile.gender === 'male' ? 0x425b52 : 0x785560;
    this.player = this.add.rectangle(width / 2, height * 0.6, 58, 78, playerColor)
      .setStrokeStyle(3, 0xf6ead0);

    this.add.text(this.player.x, this.player.y, this.profile.gender === 'male' ? 'NAM' : 'NỮ', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5).setName('playerLabel');

    this.spawnEnemy(width * 0.28, height * 0.36, 0x80554b);
    this.spawnEnemy(width * 0.64, height * 0.32, 0x536747);
    this.spawnEnemy(width * 0.73, height * 0.5, 0x695579);

    this.createJoystick(125, height - 145);
    this.createCombatButtons(width, height);
    this.bindTouchControls();
    this.refreshHud();
  }

  update(time: number, delta: number): void {
    const speed = 260;
    this.player.x = Phaser.Math.Clamp(this.player.x + this.moveX * speed * delta / 1000, 48, this.scale.width - 48);
    this.player.y = Phaser.Math.Clamp(this.player.y + this.moveY * speed * delta / 1000, 130, this.scale.height - 250);

    const label = this.children.getByName('playerLabel') as Phaser.GameObjects.Text | null;
    label?.setPosition(this.player.x, this.player.y);

    if (time >= this.nextAttackAt) {
      const target = this.getNearestEnemy(180);
      if (target) {
        this.nextAttackAt = time + 620;
        this.autoAttack(target);
      }
    }
  }

  private spawnEnemy(x: number, y: number, color: number): void {
    const node = this.add.circle(x, y, 32, color).setStrokeStyle(3, 0x332f2a);
    this.enemies.push({ node, hp: 3 });
  }

  private getNearestEnemy(maxRange: number): EnemyState | null {
    let best: EnemyState | null = null;
    let bestDistance = maxRange;

    for (const enemy of this.enemies) {
      if (!enemy.node.active) continue;
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.node.x, enemy.node.y);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = enemy;
      }
    }

    return best;
  }

  private autoAttack(enemy: EnemyState): void {
    const fx = this.add.line(0, 0, this.player.x, this.player.y, enemy.node.x, enemy.node.y, 0xf2e4b8, 0.95)
      .setOrigin(0, 0)
      .setLineWidth(7);

    this.tweens.add({
      targets: fx,
      alpha: 0,
      duration: 150,
      onComplete: () => fx.destroy(),
    });

    enemy.hp -= 1;
    enemy.node.setScale(1.15);
    this.tweens.add({ targets: enemy.node, scale: 1, duration: 120 });

    if (enemy.hp <= 0) {
      enemy.node.destroy();
      this.profile.spirit = Math.min(this.profile.maxSpirit, this.profile.spirit + 25);
      this.refreshHud();
    }
  }

  private createJoystick(x: number, y: number): void {
    this.joystickBase = this.add.circle(x, y, 86, 0x242923, 0.16).setStrokeStyle(3, 0x33372f, 0.45);
    this.joystickNub = this.add.circle(x, y, 40, 0x4e5a4d, 0.62);
  }

  private bindTouchControls(): void {
    this.input.addPointer(2);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.x > this.scale.width * 0.48 || pointer.y < this.scale.height * 0.62) return;
      this.joystickPointerId = pointer.id;
      this.updateJoystick(pointer);
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.id === this.joystickPointerId && pointer.isDown) this.updateJoystick(pointer);
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.id !== this.joystickPointerId) return;
      this.joystickPointerId = null;
      this.moveX = 0;
      this.moveY = 0;
      this.joystickNub.setPosition(this.joystickBase.x, this.joystickBase.y);
    });
  }

  private updateJoystick(pointer: Phaser.Input.Pointer): void {
    const dx = pointer.x - this.joystickBase.x;
    const dy = pointer.y - this.joystickBase.y;
    const distance = Math.hypot(dx, dy);
    const maxDistance = 68;
    const scale = distance > maxDistance ? maxDistance / distance : 1;

    this.joystickNub.setPosition(this.joystickBase.x + dx * scale, this.joystickBase.y + dy * scale);

    if (distance < 8) {
      this.moveX = 0;
      this.moveY = 0;
      return;
    }

    this.moveX = dx / distance;
    this.moveY = dy / distance;
  }

  private createCombatButtons(width: number, height: number): void {
    const buttons = [
      { x: width - 112, y: height - 130, r: 58, label: 'NÉ' },
      { x: width - 225, y: height - 126, r: 45, label: 'I' },
      { x: width - 145, y: height - 240, r: 45, label: 'II' },
      { x: width - 260, y: height - 235, r: 45, label: 'III' },
    ];

    for (const button of buttons) {
      this.add.circle(button.x, button.y, button.r, 0x343a33, 0.78).setStrokeStyle(3, 0xded3b8, 0.85);
      this.add.text(button.x, button.y, button.label, {
        fontFamily: 'sans-serif', fontSize: '20px', color: '#f7efdc', fontStyle: 'bold',
      }).setOrigin(0.5);
    }

    this.add.text(width - 155, height - 330, 'Đánh thường: TỰ ĐỘNG', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#4b4a42',
    }).setOrigin(0.5);
  }

  private refreshHud(): void {
    this.spiritText.setText(`Luyện Khí • Linh khí ${this.profile.spirit}/${this.profile.maxSpirit}`);
  }
}
