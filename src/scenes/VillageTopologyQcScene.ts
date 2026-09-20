import Phaser from 'phaser';

type LayoutVariant = 'A' | 'B';

interface LayoutNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tint: number;
}

interface LayoutDefinition {
  name: string;
  subtitle: string;
  height: number;
  entryY: number;
  nodes: LayoutNode[];
  spine: Array<{ x: number; y: number }>;
}

const WORLD_WIDTH = 1600;
const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 1280;

const LAYOUTS: Record<LayoutVariant, LayoutDefinition> = {
  A: {
    name: 'V2-A · COMPACT 1800',
    subtitle: 'Giữ footprint hiện tại · tối ưu cực chặt',
    height: 1800,
    entryY: 165,
    nodes: [
      { id: 'entry', label: 'LỐI VÀO', x: 800, y: 165, width: 330, height: 150, tint: 0x777064 },
      { id: 'elder', label: 'TRƯỞNG LÃO', x: 510, y: 470, width: 390, height: 260, tint: 0x665a78 },
      { id: 'merchant', label: 'THƯƠNG NHÂN', x: 1090, y: 835, width: 420, height: 280, tint: 0x8a6a4a },
      { id: 'healer', label: 'DƯỢC SƯ + NƯỚC', x: 520, y: 1240, width: 430, height: 300, tint: 0x4f7771 },
      { id: 'residential', label: 'RUỘNG / DÂN CƯ', x: 1080, y: 1600, width: 470, height: 260, tint: 0x7d8055 },
    ],
    spine: [
      { x: 800, y: 115 },
      { x: 770, y: 340 },
      { x: 690, y: 520 },
      { x: 820, y: 690 },
      { x: 930, y: 850 },
      { x: 830, y: 1040 },
      { x: 690, y: 1240 },
      { x: 810, y: 1430 },
      { x: 940, y: 1610 },
      { x: 800, y: 1770 },
    ],
  },
  B: {
    name: 'V2-B · EXPANDED 3200',
    subtitle: 'Mỗi khu có nhịp reveal riêng · khuyến nghị',
    height: 3200,
    entryY: 180,
    nodes: [
      { id: 'entry', label: 'LỐI VÀO', x: 800, y: 180, width: 330, height: 150, tint: 0x777064 },
      { id: 'elder', label: 'TRƯỞNG LÃO', x: 500, y: 720, width: 390, height: 260, tint: 0x665a78 },
      { id: 'merchant', label: 'THƯƠNG NHÂN', x: 1100, y: 1400, width: 420, height: 280, tint: 0x8a6a4a },
      { id: 'healer', label: 'DƯỢC SƯ + NƯỚC', x: 520, y: 2120, width: 430, height: 300, tint: 0x4f7771 },
      { id: 'residential', label: 'RUỘNG / DÂN CƯ', x: 1080, y: 2800, width: 470, height: 260, tint: 0x7d8055 },
    ],
    spine: [
      { x: 800, y: 110 },
      { x: 770, y: 410 },
      { x: 690, y: 710 },
      { x: 800, y: 1040 },
      { x: 930, y: 1400 },
      { x: 820, y: 1760 },
      { x: 690, y: 2120 },
      { x: 820, y: 2460 },
      { x: 950, y: 2800 },
      { x: 800, y: 3140 },
    ],
  },
};

export class VillageTopologyQcScene extends Phaser.Scene {
  private variant: LayoutVariant = 'B';
  private topologyLayer!: Phaser.GameObjects.Container;
  private player!: Phaser.GameObjects.Container;
  private modeTitle!: Phaser.GameObjects.Text;
  private modeSubtitle!: Phaser.GameObjects.Text;
  private modeButtonLabel!: Phaser.GameObjects.Text;
  private moveX = 0;
  private moveY = 0;
  private joystickPointerId: number | null = null;
  private readonly joystickX = 118;
  private readonly joystickY = VIEW_HEIGHT - 138;
  private joystickNub!: Phaser.GameObjects.Arc;

  constructor() {
    super('VillageTopologyQc');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#ded4ba');
    this.topologyLayer = this.add.container(0, 0);
    this.buildLayout('B');
    this.createPlayerMarker();
    this.createHud();
    this.createJoystick();
    this.bindInput();
    this.cameras.main.startFollow(this.player, true, 0.13, 0.13);
    this.cameras.main.setDeadzone(140, 300);
  }

  update(_time: number, delta: number): void {
    const layout = LAYOUTS[this.variant];
    const speed = 315;
    this.player.x = Phaser.Math.Clamp(
      this.player.x + this.moveX * speed * delta / 1000,
      62,
      WORLD_WIDTH - 62,
    );
    this.player.y = Phaser.Math.Clamp(
      this.player.y + this.moveY * speed * delta / 1000,
      58,
      layout.height - 58,
    );
  }

  private buildLayout(variant: LayoutVariant): void {
    this.variant = variant;
    const layout = LAYOUTS[variant];
    this.topologyLayer.removeAll(true);

    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, layout.height);

    const base = this.add.rectangle(
      WORLD_WIDTH / 2,
      layout.height / 2,
      WORLD_WIDTH,
      layout.height,
      0xe7dcc2,
      1,
    ).setDepth(-20);
    this.topologyLayer.add(base);

    const leftEdge = this.add.rectangle(105, layout.height / 2, 210, layout.height, 0x85866a, 0.07).setDepth(-19);
    const rightEdge = this.add.rectangle(WORLD_WIDTH - 105, layout.height / 2, 210, layout.height, 0x85866a, 0.07).setDepth(-19);
    this.topologyLayer.add([leftEdge, rightEdge]);

    const spine = this.add.graphics().setDepth(-10);
    spine.lineStyle(118, 0xc1aa80, 0.22);
    spine.beginPath();
    layout.spine.forEach((point, index) => {
      if (index === 0) spine.moveTo(point.x, point.y);
      else spine.lineTo(point.x, point.y);
    });
    spine.strokePath();
    spine.lineStyle(7, 0x806f55, 0.72);
    spine.beginPath();
    layout.spine.forEach((point, index) => {
      if (index === 0) spine.moveTo(point.x, point.y);
      else spine.lineTo(point.x, point.y);
    });
    spine.strokePath();
    this.topologyLayer.add(spine);

    for (const node of layout.nodes) this.addNode(node);

    const transitions = variant === 'B'
      ? [1030, 1760, 2460]
      : [680, 1040, 1430];
    for (const y of transitions) {
      const tick = this.add.rectangle(800, y, 230, 16, 0x8d806b, 0.16).setDepth(-7);
      const text = this.add.text(800, y - 26, 'KHOẢNG CHUYỂN', {
        fontFamily: 'sans-serif', fontSize: '17px', color: '#6d6252', fontStyle: 'bold',
        backgroundColor: '#eee5d0cc', padding: { x: 7, y: 3 },
      }).setOrigin(0.5, 1).setDepth(-6);
      this.topologyLayer.add([tick, text]);
    }

    const guide = this.add.text(WORLD_WIDTH / 2, layout.height - 52, 'MÉP DÂN CƯ / ĐƯỜNG RA', {
      fontFamily: 'sans-serif', fontSize: '22px', color: '#5d574b', fontStyle: 'bold',
      backgroundColor: '#eee5d0dd', padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setDepth(-5);
    this.topologyLayer.add(guide);

    if (this.modeTitle) {
      this.modeTitle.setText(layout.name);
      this.modeSubtitle.setText(layout.subtitle);
      this.modeButtonLabel.setText(variant === 'B' ? 'ĐỔI → V2-A' : 'ĐỔI → V2-B');
    }
  }

  private addNode(node: LayoutNode): void {
    const area = this.add.ellipse(node.x, node.y, node.width, node.height, node.tint, 0.14)
      .setStrokeStyle(5, node.tint, 0.72)
      .setDepth(-8);
    this.topologyLayer.add(area);

    const anchor = this.add.circle(node.x, node.y, node.id === 'entry' ? 18 : 28, node.tint, 0.88)
      .setStrokeStyle(3, 0xf0e3c7, 0.8)
      .setDepth(-5);
    this.topologyLayer.add(anchor);

    const label = this.add.text(node.x, node.y - node.height * 0.5 - 20, node.label, {
      fontFamily: 'sans-serif', fontSize: '22px', color: '#4a4338', fontStyle: 'bold',
      backgroundColor: '#f0e7d3e8', padding: { x: 9, y: 5 },
    }).setOrigin(0.5, 1).setDepth(-4);
    this.topologyLayer.add(label);

    if (node.id === 'healer') {
      const water = this.add.ellipse(node.x - 145, node.y + 40, 200, 105, 0x5b8585, 0.25)
        .setStrokeStyle(3, 0x527878, 0.58)
        .setDepth(-7);
      const bridge = this.add.rectangle(node.x - 65, node.y + 52, 115, 30, 0x745f48, 0.58)
        .setRotation(0.12)
        .setDepth(-6);
      this.topologyLayer.add([water, bridge]);
    }

    if (node.id === 'residential') {
      for (let i = -2; i <= 2; i += 1) {
        const row = this.add.rectangle(node.x + i * 70, node.y + 38, 50, 130, 0x8f875e, 0.18)
          .setRotation(i * 0.015)
          .setDepth(-7);
        this.topologyLayer.add(row);
      }
    }
  }

  private createPlayerMarker(): void {
    const shadow = this.add.ellipse(0, 30, 60, 22, 0x3c382f, 0.16);
    const body = this.add.circle(0, 0, 24, 0x334b55, 0.96).setStrokeStyle(4, 0xf0e3c7, 0.9);
    const facing = this.add.triangle(0, -34, -9, 8, 9, 8, 0, -9, 0xe9d4a6, 0.95);
    this.player = this.add.container(800, LAYOUTS.B.entryY + 150, [shadow, body, facing]).setDepth(20);
  }

  private createHud(): void {
    const panel = this.add.rectangle(VIEW_WIDTH / 2, 88, VIEW_WIDTH - 24, 152, 0xeee5cf, 0.94)
      .setStrokeStyle(2, 0x6b675b, 0.38)
      .setScrollFactor(0)
      .setDepth(100);
    this.modeTitle = this.add.text(24, 22, LAYOUTS.B.name, {
      fontFamily: 'serif', fontSize: '25px', color: '#2b2b27', fontStyle: 'bold',
    }).setScrollFactor(0).setDepth(101);
    this.modeSubtitle = this.add.text(24, 58, LAYOUTS.B.subtitle, {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#5a554b',
    }).setScrollFactor(0).setDepth(101);
    const instruction = this.add.text(24, 91, 'QC topology only: khoảng thở · nhịp reveal · đường chính · vị trí khu', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#625a4e',
      wordWrap: { width: 410 },
    }).setScrollFactor(0).setDepth(101);

    const button = this.add.rectangle(VIEW_WIDTH - 118, 91, 202, 70, 0x46554c, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.72)
      .setScrollFactor(0)
      .setDepth(102)
      .setInteractive({ useHandCursor: true });
    this.modeButtonLabel = this.add.text(VIEW_WIDTH - 118, 91, 'ĐỔI → V2-A', {
      fontFamily: 'sans-serif', fontSize: '17px', color: '#fff4d8', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(103);

    button.on('pointerdown', () => {
      const next: LayoutVariant = this.variant === 'B' ? 'A' : 'B';
      this.buildLayout(next);
      const layout = LAYOUTS[next];
      this.player.setPosition(800, layout.entryY + 150);
      this.moveX = 0;
      this.moveY = 0;
      this.joystickNub.setPosition(this.joystickX, this.joystickY);
    });

    panel.setInteractive();
    instruction.setInteractive();
  }

  private createJoystick(): void {
    this.add.circle(this.joystickX, this.joystickY, 86, 0x4f5a51, 0.08)
      .setStrokeStyle(3, 0x4f5a51, 0.48)
      .setScrollFactor(0)
      .setDepth(105);
    this.joystickNub = this.add.circle(this.joystickX, this.joystickY, 38, 0x4f5a51, 0.42)
      .setScrollFactor(0)
      .setDepth(106);
    this.add.text(this.joystickX, this.joystickY + 108, 'DI CHUYỂN', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#514c43', fontStyle: 'bold',
      backgroundColor: '#eee5cfcc', padding: { x: 5, y: 3 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(106);
  }

  private bindInput(): void {
    const radius = 105;
    const updateJoystick = (pointer: Phaser.Input.Pointer): void => {
      const dx = pointer.x - this.joystickX;
      const dy = pointer.y - this.joystickY;
      const length = Math.hypot(dx, dy);
      const capped = Math.min(radius, length);
      const nx = length > 0 ? dx / length : 0;
      const ny = length > 0 ? dy / length : 0;
      this.moveX = nx * Math.min(1, length / 45);
      this.moveY = ny * Math.min(1, length / 45);
      this.joystickNub.setPosition(
        this.joystickX + nx * capped * 0.62,
        this.joystickY + ny * capped * 0.62,
      );
    };

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.joystickX, this.joystickY);
      if (distance > radius) return;
      this.joystickPointerId = pointer.id;
      updateJoystick(pointer);
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointerId !== pointer.id) return;
      updateJoystick(pointer);
    });

    const release = (pointer: Phaser.Input.Pointer): void => {
      if (this.joystickPointerId !== pointer.id) return;
      this.joystickPointerId = null;
      this.moveX = 0;
      this.moveY = 0;
      this.joystickNub.setPosition(this.joystickX, this.joystickY);
    };
    this.input.on('pointerup', release);
    this.input.on('pointerupoutside', release);
  }
}
