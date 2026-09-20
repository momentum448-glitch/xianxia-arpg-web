import Phaser from 'phaser';

const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 1800;
const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 1280;

interface Point {
  x: number;
  y: number;
}

export class VillageTopologyQcScene extends Phaser.Scene {
  private worldLayer!: Phaser.GameObjects.Container;
  private guideLayer!: Phaser.GameObjects.Container;
  private player!: Phaser.GameObjects.Container;
  private guideButtonLabel!: Phaser.GameObjects.Text;
  private guidesVisible = true;
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
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.worldLayer = this.add.container(0, 0);
    this.guideLayer = this.add.container(0, 0);

    this.buildMassing();
    this.createPlayerMarker();
    this.createHud();
    this.createJoystick();
    this.bindInput();

    this.cameras.main.startFollow(this.player, true, 0.14, 0.14);
    this.cameras.main.setDeadzone(150, 310);
  }

  update(_time: number, delta: number): void {
    const speed = 315;
    this.player.x = Phaser.Math.Clamp(
      this.player.x + this.moveX * speed * delta / 1000,
      62,
      WORLD_WIDTH - 62,
    );
    this.player.y = Phaser.Math.Clamp(
      this.player.y + this.moveY * speed * delta / 1000,
      58,
      WORLD_HEIGHT - 58,
    );
  }

  private buildMassing(): void {
    const base = this.add.rectangle(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT / 2,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      0xe7dcc2,
      1,
    ).setDepth(-30);
    this.worldLayer.add(base);

    this.addEdgeMassing();
    this.addMainSpine();
    this.addEntryMassing();
    this.addElderMassing();
    this.addMerchantMassing();
    this.addHealerMassing();
    this.addResidentialFieldMassing();
    this.addZoneGuides();
  }

  private addMainSpine(): void {
    const spine: Point[] = [
      { x: 800, y: 80 },
      { x: 770, y: 285 },
      { x: 690, y: 505 },
      { x: 820, y: 690 },
      { x: 940, y: 850 },
      { x: 835, y: 1045 },
      { x: 690, y: 1235 },
      { x: 810, y: 1430 },
      { x: 940, y: 1590 },
      { x: 800, y: 1780 },
    ];

    const road = this.add.graphics().setDepth(-20);
    road.lineStyle(132, 0xc9b487, 0.24);
    road.beginPath();
    spine.forEach((point, index) => {
      if (index === 0) road.moveTo(point.x, point.y);
      else road.lineTo(point.x, point.y);
    });
    road.strokePath();

    road.lineStyle(3, 0x8a7556, 0.42);
    road.beginPath();
    spine.forEach((point, index) => {
      if (index === 0) road.moveTo(point.x, point.y);
      else road.lineTo(point.x, point.y);
    });
    road.strokePath();
    this.worldLayer.add(road);

    const transitionHints = [
      { x: 790, y: 645, w: 210, r: -0.05 },
      { x: 835, y: 1055, w: 205, r: 0.07 },
      { x: 785, y: 1435, w: 195, r: -0.04 },
    ];
    for (const hint of transitionHints) {
      this.worldLayer.add(
        this.add.ellipse(hint.x, hint.y, hint.w, 44, 0x9b896b, 0.10)
          .setRotation(hint.r)
          .setDepth(-19),
      );
    }
  }

  private addEntryMassing(): void {
    const wood = 0x765f48;
    const stone = 0x746f64;

    this.worldLayer.add([
      this.add.rectangle(520, 165, 290, 30, wood, 0.38).setRotation(-0.08).setDepth(-12),
      this.add.rectangle(1085, 170, 305, 30, wood, 0.38).setRotation(0.07).setDepth(-12),
      this.add.rectangle(955, 185, 28, 105, stone, 0.42).setRotation(0.05).setDepth(-11),
      this.add.rectangle(475, 235, 145, 95, 0x77775f, 0.16).setRotation(-0.10).setDepth(-16),
      this.add.rectangle(1130, 245, 170, 105, 0x77775f, 0.16).setRotation(0.08).setDepth(-16),
    ]);
  }

  private addElderMassing(): void {
    const building = 0x6c625a;
    const wall = 0x756d61;
    const foliage = 0x6d755e;

    this.worldLayer.add([
      this.add.rectangle(350, 430, 290, 150, building, 0.42).setRotation(-0.02).setDepth(-10),
      this.add.rectangle(335, 535, 250, 32, wall, 0.30).setRotation(0.03).setDepth(-11),
      this.add.rectangle(560, 580, 190, 28, wall, 0.26).setRotation(-0.08).setDepth(-11),
      this.add.ellipse(190, 420, 250, 210, foliage, 0.18).setDepth(-15),
      this.add.ellipse(270, 345, 180, 150, foliage, 0.13).setDepth(-15),
      this.add.ellipse(505, 505, 245, 145, 0xb49d76, 0.12).setDepth(-17),
    ]);

    this.addPrimitiveTree(185, 440, 72, 0.30);
    this.addPrimitiveTree(285, 365, 58, 0.24);
    this.addPrimitiveTree(600, 390, 50, 0.19);
  }

  private addMerchantMassing(): void {
    const building = 0x7d664f;
    const commerce = 0x8b7054;
    const stock = 0x7d735d;

    this.worldLayer.add([
      this.add.rectangle(1215, 790, 315, 175, building, 0.46).setRotation(0.02).setDepth(-10),
      this.add.rectangle(1080, 870, 210, 58, commerce, 0.36).setRotation(-0.04).setDepth(-9),
      this.add.rectangle(1370, 900, 150, 86, stock, 0.34).setRotation(0.06).setDepth(-9),
      this.add.rectangle(1005, 800, 34, 140, 0x6e5a43, 0.44).setRotation(-0.03).setDepth(-8),
      this.add.ellipse(1110, 930, 500, 210, 0xb89d72, 0.10).setDepth(-18),
    ]);

    this.addPrimitiveTree(1450, 760, 65, 0.18);
    this.addPrimitiveTree(1330, 690, 48, 0.14);
  }

  private addHealerMassing(): void {
    const building = 0x65746c;
    const garden = 0x788066;
    const water = 0x66888a;

    this.worldLayer.add([
      this.add.rectangle(350, 1195, 255, 145, building, 0.40).setRotation(-0.03).setDepth(-10),
      this.add.ellipse(230, 1350, 275, 165, water, 0.25).setRotation(-0.08).setDepth(-16),
      this.add.ellipse(350, 1420, 250, 82, water, 0.17).setRotation(0.10).setDepth(-16),
      this.add.rectangle(350, 1370, 135, 34, 0x715b45, 0.46).setRotation(0.12).setDepth(-9),
      this.add.rectangle(520, 1200, 170, 34, garden, 0.28).setRotation(0.06).setDepth(-12),
      this.add.rectangle(550, 1255, 195, 34, garden, 0.25).setRotation(-0.03).setDepth(-12),
      this.add.rectangle(510, 1310, 155, 34, garden, 0.22).setRotation(0.05).setDepth(-12),
    ]);

    this.addPrimitiveTree(160, 1180, 58, 0.20);
    this.addPrimitiveTree(610, 1155, 48, 0.17);
  }

  private addResidentialFieldMassing(): void {
    const building = 0x756852;
    const field = 0x8d8d61;

    // Edge houses imply a larger settlement without becoming a hero focal point.
    this.worldLayer.add([
      this.add.rectangle(80, 1560, 230, 150, building, 0.18).setRotation(-0.03).setDepth(-14),
      this.add.rectangle(1530, 1510, 250, 165, building, 0.18).setRotation(0.05).setDepth(-14),
      this.add.rectangle(1430, 1695, 220, 145, building, 0.15).setRotation(-0.04).setDepth(-14),
      this.add.rectangle(180, 1730, 250, 140, building, 0.14).setRotation(0.04).setDepth(-14),
    ]);

    const rows = [
      { x: 355, y: 1600, w: 330, r: -0.08 },
      { x: 390, y: 1665, w: 365, r: -0.04 },
      { x: 1215, y: 1590, w: 320, r: 0.07 },
      { x: 1190, y: 1658, w: 360, r: 0.04 },
    ];
    for (const row of rows) {
      this.worldLayer.add(
        this.add.ellipse(row.x, row.y, row.w, 46, field, 0.18)
          .setRotation(row.r)
          .setDepth(-15),
      );
    }

    this.addPrimitiveTree(120, 1445, 58, 0.16);
    this.addPrimitiveTree(1490, 1385, 64, 0.16);
  }

  private addEdgeMassing(): void {
    const foliage = 0x7b8067;
    const masses = [
      { x: 75, y: 260, w: 190, h: 310, r: -0.04 },
      { x: 1515, y: 360, w: 210, h: 340, r: 0.05 },
      { x: 80, y: 830, w: 210, h: 400, r: 0.02 },
      { x: 1525, y: 1080, w: 220, h: 420, r: -0.03 },
    ];
    for (const mass of masses) {
      this.worldLayer.add(
        this.add.ellipse(mass.x, mass.y, mass.w, mass.h, foliage, 0.08)
          .setRotation(mass.r)
          .setDepth(-25),
      );
    }
  }

  private addPrimitiveTree(x: number, y: number, radius: number, alpha: number): void {
    const crown = this.add.circle(x, y - radius * 0.45, radius, 0x63705c, alpha).setDepth(-9);
    const trunk = this.add.rectangle(x, y + radius * 0.35, radius * 0.28, radius * 0.95, 0x6f5b47, alpha * 0.8)
      .setDepth(-10);
    this.worldLayer.add([trunk, crown]);
  }

  private addZoneGuides(): void {
    const zones = [
      { label: 'Z0 · LỐI VÀO', x: 800, y: 95, tint: 0x68645b },
      { label: 'Z1 · TRƯỞNG LÃO', x: 430, y: 280, tint: 0x665a78 },
      { label: 'Z2 · THƯƠNG NHÂN', x: 1180, y: 610, tint: 0x8a6a4a },
      { label: 'Z3 · DƯỢC SƯ + NƯỚC', x: 415, y: 1010, tint: 0x4f7771 },
      { label: 'Z4 · RUỘNG / DÂN CƯ', x: 1160, y: 1465, tint: 0x73784f },
    ];

    for (const zone of zones) {
      const tag = this.add.text(zone.x, zone.y, zone.label, {
        fontFamily: 'sans-serif',
        fontSize: '20px',
        color: '#403b34',
        fontStyle: 'bold',
        backgroundColor: '#f0e7d3e8',
        padding: { x: 9, y: 5 },
      }).setOrigin(0.5).setDepth(5);
      const dot = this.add.circle(zone.x, zone.y + 34, 10, zone.tint, 0.72)
        .setStrokeStyle(2, 0xf0e3c7, 0.7)
        .setDepth(5);
      this.guideLayer.add([tag, dot]);
    }

    const openSpaceNotes = [
      { x: 760, y: 705, text: 'KHOẢNG THỞ' },
      { x: 810, y: 1070, text: 'KHOẢNG THỞ' },
      { x: 790, y: 1450, text: 'KHOẢNG THỞ' },
    ];
    for (const note of openSpaceNotes) {
      const label = this.add.text(note.x, note.y, note.text, {
        fontFamily: 'sans-serif',
        fontSize: '15px',
        color: '#716654',
        fontStyle: 'bold',
        backgroundColor: '#eee5d0b8',
        padding: { x: 6, y: 3 },
      }).setOrigin(0.5).setDepth(4);
      this.guideLayer.add(label);
    }
  }

  private createPlayerMarker(): void {
    const shadow = this.add.ellipse(0, 30, 60, 22, 0x3c382f, 0.16);
    const body = this.add.circle(0, 0, 24, 0x334b55, 0.96)
      .setStrokeStyle(4, 0xf0e3c7, 0.9);
    const facing = this.add.triangle(0, -34, -9, 8, 9, 8, 0, -9, 0xe9d4a6, 0.95);
    this.player = this.add.container(800, 285, [shadow, body, facing]).setDepth(20);
  }

  private createHud(): void {
    this.add.rectangle(VIEW_WIDTH / 2, 88, VIEW_WIDTH - 24, 152, 0xeee5cf, 0.95)
      .setStrokeStyle(2, 0x6b675b, 0.38)
      .setScrollFactor(0)
      .setDepth(100);

    this.add.text(24, 20, 'V2-A · SPATIAL MASSING', {
      fontFamily: 'serif',
      fontSize: '25px',
      color: '#2b2b27',
      fontStyle: 'bold',
    }).setScrollFactor(0).setDepth(101);

    this.add.text(24, 56, '1600 × 1800 · primitive only · không production art', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#5a554b',
    }).setScrollFactor(0).setDepth(101);

    const instruction = this.add.text(24, 89, 'QC: khối công trình · framing · khoảng trống · đường chính · UI occlusion', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#625a4e',
      wordWrap: { width: 430 },
    }).setScrollFactor(0).setDepth(101);

    const button = this.add.rectangle(VIEW_WIDTH - 112, 90, 188, 70, 0x46554c, 0.96)
      .setStrokeStyle(2, 0xe7d6b7, 0.72)
      .setScrollFactor(0)
      .setDepth(102)
      .setInteractive({ useHandCursor: true });

    this.guideButtonLabel = this.add.text(VIEW_WIDTH - 112, 90, 'ẨN NHÃN', {
      fontFamily: 'sans-serif',
      fontSize: '17px',
      color: '#fff4d8',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(103);

    button.on('pointerdown', () => {
      this.guidesVisible = !this.guidesVisible;
      this.guideLayer.setVisible(this.guidesVisible);
      this.guideButtonLabel.setText(this.guidesVisible ? 'ẨN NHÃN' : 'HIỆN NHÃN');
    });

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
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#514c43',
      fontStyle: 'bold',
      backgroundColor: '#eee5cfcc',
      padding: { x: 5, y: 3 },
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
      const distance = Phaser.Math.Distance.Between(
        pointer.x,
        pointer.y,
        this.joystickX,
        this.joystickY,
      );
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
