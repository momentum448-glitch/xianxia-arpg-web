import Phaser from 'phaser';
import { PLAYER_RUNTIME_ANIMATION } from '../game/art/animationConfig';
import { C4_ASSETS, c4AssetUrl } from '../game/art/assetManifest';
import { createEnemyVisual, createFlyingSwordVisual, createPlayerVisual } from '../game/actorVisuals';
import { createSettlementEnvironment, SETTLEMENT_GROUND_TEXTURES, SETTLEMENT_HOUSE_TEXTURES } from '../game/environmentVisuals';
import { COMBAT, type EnemyKind } from '../game/combatConfig';
import {
  CULTIVATION,
  canBreakthrough,
  flyingSwordDamageForRealm,
  maxHpForRealm,
  realmName,
  skillDamageForRealm,
} from '../game/cultivationConfig';
import { NPCS, type NpcDefinition } from '../game/npcConfig';
import { moveWithSettlementCollision } from '../game/settlementCollision';
import { BOSS_GATE, ENCOUNTERS, WORLD_EVENTS, type EncounterDefinition, type WorldEventDefinition } from '../game/regionContentConfig';
import { createPlayerProfile, type PlayerGender, type PlayerProfile } from '../game/playerProfile';
import { basicAttackCooldownMsForProfile, basicAttackRangeForProfile } from '../game/playerStats';
import { WORLD, isSettlementY, zoneAt, type WorldZoneId } from '../game/worldConfig';

interface EnemyState {
  kind: EnemyKind;
  node: Phaser.GameObjects.Arc;
  hp: number;
  maxHp: number;
  nextActionAt: number;
  phase: 'chase' | 'windup' | 'charge' | 'recover';
  phaseUntil: number;
  chargeX: number;
  chargeY: number;
  chargeHit: boolean;
  trial: boolean;
  encounterId: string | null;
  damageMultiplier: number;
  visual: Phaser.GameObjects.Container;
}

interface FlyingSwordState {
  node: Phaser.GameObjects.Container;
  target: EnemyState | null;
  angle: number;
  expiresAt: number;
  nextTrailAt: number;
  originX: number;
  originY: number;
  maxTravelDistance: number | null;
}

interface NpcState {
  def: NpcDefinition;
  node: Phaser.GameObjects.Container;
}

interface WorldEventState {
  def: WorldEventDefinition;
  node: Phaser.GameObjects.Container;
  triggered: boolean;
}

const SWORD_VFX_QC = { launch: true, trail: true, impact: true } as const;

type CombatButtonKey = 'attack' | 'dodge' | 'skill';

interface Cooldowns {
  attack: number;
  dodge: number;
  skill: number;
}

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private playerVisual!: Phaser.GameObjects.Container;
  private profile!: PlayerProfile;
  private enemies: EnemyState[] = [];
  private flyingSwords: FlyingSwordState[] = [];
  private moveX = 0;
  private moveY = 0;
  private facingX = 0;
  private facingY = -1;
  private joystickPointerId: number | null = null;
  private joystickBase!: Phaser.GameObjects.Arc;
  private joystickNub!: Phaser.GameObjects.Arc;
  private actionLockedUntil = 0;
  private attackAnimStartedAt = 0;
  private attackAnimUntil = 0;
  private skillAnimStartedAt = 0;
  private skillAnimUntil = 0;
  private playerVisualFacingSign = 1;
  private dodgeUntil = 0;
  private invulnerableUntil = 0;
  private dodgeX = 0;
  private dodgeY = -1;
  private playerHp = COMBAT.player.maxHp;
  private dead = false;
  private respawnX = WORLD.playerSpawn.x;
  private respawnY = WORLD.playerSpawn.y;
  private hpText!: Phaser.GameObjects.Text;
  private spiritText!: Phaser.GameObjects.Text;
  private materialText!: Phaser.GameObjects.Text;
  private zoneText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private breakthroughButton!: Phaser.GameObjects.Rectangle;
  private breakthroughLabel!: Phaser.GameObjects.Text;
  private breakthroughTrialActive = false;
  private breakthroughTrialKills = 0;
  private currentZoneId: WorldZoneId | null = null;
  private cooldowns: Cooldowns = { attack: 0, dodge: 0, skill: 0 };
  private buttonLabels: Partial<Record<CombatButtonKey, Phaser.GameObjects.Text>> = {};
  private npcs: NpcState[] = [];
  private nearestNpc: NpcState | null = null;
  private interactionButton!: Phaser.GameObjects.Rectangle;
  private interactionLabel!: Phaser.GameObjects.Text;
  private dialoguePanel!: Phaser.GameObjects.Rectangle;
  private dialogueText!: Phaser.GameObjects.Text;
  private dialogueHideAt = 0;
  private worldEvents: WorldEventState[] = [];

  constructor() {
    super('Game');
  }

  init(data: { gender?: PlayerGender }): void {
    this.profile = createPlayerProfile(data.gender ?? 'male');
  }

  preload(): void {
    if (!this.textures.exists('c4-player-male-idle-s')) {
      this.load.image('c4-player-male-idle-s', c4AssetUrl(C4_ASSETS.playerMaleIdleSouth));
    }
    if (!this.textures.exists('c4-enemy-melee-idle-s')) {
      this.load.image('c4-enemy-melee-idle-s', c4AssetUrl(C4_ASSETS.enemyMeleeIdleSouth));
    }
    if (!this.textures.exists('c4-flying-sword-r1')) {
      this.load.image('c4-flying-sword-r1', c4AssetUrl(C4_ASSETS.flyingSwordR1));
    }

    const settlementHouseAssets = [
      [SETTLEMENT_HOUSE_TEXTURES.thatchA, C4_ASSETS.settlementHouseThatchA],
      [SETTLEMENT_HOUSE_TEXTURES.tileA, C4_ASSETS.settlementHouseTileA],
      [SETTLEMENT_HOUSE_TEXTURES.hallA, C4_ASSETS.settlementHouseHallA],
      [SETTLEMENT_HOUSE_TEXTURES.thatchB, C4_ASSETS.settlementHouseThatchB],
    ] as const;
    for (const [key, path] of settlementHouseAssets) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }

    const settlementGroundAssets = [
      [SETTLEMENT_GROUND_TEXTURES.pathA, C4_ASSETS.settlementPathSegA],
      [SETTLEMENT_GROUND_TEXTURES.pathB, C4_ASSETS.settlementPathSegB],
      [SETTLEMENT_GROUND_TEXTURES.patchA, C4_ASSETS.settlementGroundPatchA],
      [SETTLEMENT_GROUND_TEXTURES.forecourtA, C4_ASSETS.settlementForecourtA],
    ] as const;
    for (const [key, path] of settlementGroundAssets) {
      if (!this.textures.exists(key)) this.load.image(key, c4AssetUrl(path));
    }
  }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#d9d0b7');
    this.cameras.main.setBounds(0, 0, WORLD.width, WORLD.height);

    this.createWorldShell();
    this.createHud(width);

    this.respawnX = WORLD.playerSpawn.x;
    this.respawnY = WORLD.playerSpawn.y;
    this.player = this.add.rectangle(this.respawnX, this.respawnY, 58, 78, 0x000000, 0.001)
      .setStrokeStyle(0, 0x000000, 0)
      .setDepth(10);
    this.playerVisual = createPlayerVisual(
      this,
      this.profile.gender,
      this.respawnX,
      this.respawnY,
    );

    this.createNpcs();
    this.createRegionContent();
    this.cameras.main.startFollow(this.player, true, 0.11, 0.11);
    this.cameras.main.setDeadzone(150, 280);

    this.createBreakthroughUi(width);
    this.createInteractionUi(width, height);
    this.spawnAllEncounters();
    this.createJoystick(125, height - 145);
    this.createCombatButtons(width, height);
    this.bindTouchControls();
    this.refreshHud();
    this.refreshZoneHud();
  }

  update(time: number, delta: number): void {
    if (!this.dead) {
      this.updatePlayer(time, delta);
      this.updateEnemies(time, delta);
      this.syncEnemyVisuals();
      this.updateFlyingSwords(time, delta);
    }

    this.syncPlayerPresentation();
    this.refreshCooldownLabels(time);
    this.refreshZoneHud();
    this.updateNpcInteraction(time);
    this.updateWorldEvents();
  }

  private createWorldShell(): void {
    for (const zone of WORLD.zones) {
      const zoneHeight = zone.yMax - zone.yMin;
      this.add.rectangle(
        WORLD.width / 2,
        zone.yMin + zoneHeight / 2,
        WORLD.width,
        zoneHeight,
        zone.fill,
      ).setDepth(-10);

      this.add.text(WORLD.width / 2, zone.yMin + 90, zone.name, {
        fontFamily: 'serif', fontSize: '34px', color: '#49483f', fontStyle: 'bold',
      }).setOrigin(0.5).setAlpha(0.45).setDepth(-7);
    }

    this.add.rectangle(WORLD.width / 2, WORLD.height / 2, 170, WORLD.height, 0xe8dec4, 0.42)
      .setDepth(-8);

    const boundaryY = WORLD.safeBoundaryY;
    this.add.rectangle(WORLD.width / 2, boundaryY, WORLD.width - 80, 10, 0x7a6a50, 0.55)
      .setDepth(-5);
    this.add.text(WORLD.width / 2, boundaryY + 42, 'THANH VÂN THÔN • AN TOÀN', {
      fontFamily: 'serif', fontSize: '23px', color: '#6d5b43', fontStyle: 'bold',
    }).setOrigin(0.5).setAlpha(0.8).setDepth(-4);

    const settlement = WORLD.zones.find((zone) => zone.id === 'settlement')!;
    const plains = WORLD.zones.find((zone) => zone.id === 'plains')!;
    const forest = WORLD.zones.find((zone) => zone.id === 'forest')!;
    const danger = WORLD.zones.find((zone) => zone.id === 'danger')!;

    createSettlementEnvironment(this, settlement);

    for (let i = 0; i < 24; i += 1) {
      const columns = 6;
      const xStep = (WORLD.width - 300) / (columns - 1);
      const x = 150 + (i % columns) * xStep + (i % 2) * 34;
      const rows = Math.ceil(24 / columns);
      const row = Math.floor(i / columns);
      const yStep = (forest.yMax - forest.yMin - 520) / Math.max(1, rows - 1);
      const y = forest.yMin + 260 + row * yStep + (i % 3) * 70;
      this.add.circle(x, y, 54, 0x6f805c, 0.38).setDepth(-6);
      this.add.circle(x + 26, y - 24, 40, 0x657754, 0.3).setDepth(-6);
    }

    for (let i = 0; i < 18; i += 1) {
      const columns = 5;
      const xStep = (WORLD.width - 320) / (columns - 1);
      const x = 160 + (i % columns) * xStep;
      const row = Math.floor(i / columns);
      const y = danger.yMin + 240 + row * 470 + (i % 2) * 85;
      this.add.polygon(x, y, [0, -48, 40, -14, 31, 40, -26, 48, -45, 2], 0x6e6b62, 0.35)
        .setDepth(-6);
    }

    for (let i = 0; i < 16; i += 1) {
      const x = 140 + (i % 5) * ((WORLD.width - 280) / 4);
      const row = Math.floor(i / 5);
      const y = plains.yMin + 340 + row * 610 + (i % 2) * 95;
      this.add.ellipse(x, y, 86, 34, 0x8b865f, 0.2).setDepth(-7);
    }
  }

  private createRegionContent(): void {
    this.worldEvents = WORLD_EVENTS.map((def) => {
      const ring = this.add.circle(0, 0, 44, def.color, 0.16).setStrokeStyle(4, def.color, 0.8);
      const core = this.add.circle(0, 0, 13, def.color, 0.72);
      const label = this.add.text(0, -64, def.name, {
        fontFamily: 'serif', fontSize: '18px', color: '#403b32', fontStyle: 'bold',
        backgroundColor: '#eee4ccbb', padding: { x: 7, y: 4 },
      }).setOrigin(0.5, 1);
      const node = this.add.container(def.x, def.y, [ring, core, label]).setDepth(6);
      this.tweens.add({ targets: ring, scale: 1.18, alpha: 0.05, duration: 1200, yoyo: true, repeat: -1 });
      return { def, node, triggered: false };
    });

    const gate = this.add.container(BOSS_GATE.x, BOSS_GATE.y).setDepth(5);
    const left = this.add.rectangle(-72, 28, 28, 128, 0x5b554d, 0.72);
    const right = this.add.rectangle(72, 28, 28, 128, 0x5b554d, 0.72);
    const lintel = this.add.rectangle(0, -34, 176, 28, 0x5b554d, 0.72);
    const seal = this.add.circle(0, 24, 40, 0x8f705f, 0.15).setStrokeStyle(5, 0x8f705f, 0.72);
    const label = this.add.text(0, 112, `${BOSS_GATE.name}
CỔ MÔN • PHONG ẤN`, {
      fontFamily: 'serif', fontSize: '19px', color: '#443e38', fontStyle: 'bold', align: 'center',
      backgroundColor: '#ded4c0cc', padding: { x: 9, y: 5 },
    }).setOrigin(0.5);
    gate.add([left, right, lintel, seal, label]);
  }

  private updateWorldEvents(): void {
    if (this.dead || this.breakthroughTrialActive) return;
    for (const event of this.worldEvents) {
      if (event.triggered) continue;
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, event.def.x, event.def.y);
      if (distance <= event.def.radius) this.triggerWorldEvent(event);
    }
  }

  private triggerWorldEvent(event: WorldEventState): void {
    if (event.triggered) return;
    event.triggered = true;
    event.node.setAlpha(0.28);

    if (event.def.id === 'spirit-spring') {
      const beforeHp = this.playerHp;
      this.playerHp = Math.min(maxHpForRealm(this.profile.realm), this.playerHp + 2);
      this.profile.spirit = Math.min(this.profile.maxSpirit, this.profile.spirit + 12);
      this.refreshHud();
      this.statusText.setText(`Linh Tuyền • +12 Linh Khí${this.playerHp > beforeHp ? ' • +2 Sinh lực' : ''}`);
      this.time.delayedCall(2200, () => { if (!this.dead) this.statusText.setText(''); });
      return;
    }

    if (event.def.id === 'herb-cache') {
      this.profile.essence += 1;
      this.refreshHud();
      this.statusText.setText('Dược Thảo Ẩn • +1 Tinh Hoa');
      this.time.delayedCall(2200, () => { if (!this.dead) this.statusText.setText(''); });
      return;
    }

    this.statusText.setText('U Minh Bi rung chuyển • Tà ảnh xuất hiện');
    this.spawnEnemy('melee', this.player.x - 165, this.player.y - 180, false, null, 1.45, 1.2);
    this.spawnEnemy('ranged', this.player.x + 185, this.player.y - 145, false, null, 1.4, 1.25);
    this.spawnEnemy('charger', this.player.x + 30, this.player.y + 205, false, null, 1.55, 1.3);
    this.time.delayedCall(2400, () => { if (!this.dead) this.statusText.setText(''); });
  }

  private createNpcs(): void {
    this.npcs = NPCS.map((def) => {
      const shadow = this.add.ellipse(0, 30, 62, 22, 0x332f2a, 0.18);
      const robe = this.add.rectangle(0, 8, 48, 66, def.color, 0.95).setStrokeStyle(3, 0xf0e2c6, 0.7);
      const head = this.add.circle(0, -34, 19, 0xd9b58e).setStrokeStyle(2, 0x665447, 0.8);
      const label = this.add.text(0, -78, `${def.name}\n${def.role}`, {
        fontFamily: 'serif', fontSize: '18px', color: '#3f3a31', fontStyle: 'bold', align: 'center',
        backgroundColor: '#eee4ccbb', padding: { x: 7, y: 4 },
      }).setOrigin(0.5, 1);
      const node = this.add.container(def.x, def.y, [shadow, robe, head, label]).setDepth(8);
      return { def, node };
    });
  }

  private createInteractionUi(width: number, height: number): void {
    this.interactionButton = this.add.rectangle(width / 2, height - 310, 220, 64, 0x5c513f, 0.94)
      .setStrokeStyle(3, 0xe9d6ad, 0.9)
      .setScrollFactor(0)
      .setDepth(125)
      .setInteractive({ useHandCursor: true });
    this.interactionLabel = this.add.text(width / 2, height - 310, 'TƯƠNG TÁC', {
      fontFamily: 'sans-serif', fontSize: '17px', color: '#fff1d2', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(126);
    this.interactionButton.on('pointerdown', () => this.interactWithNearestNpc());
    this.interactionButton.setVisible(false).disableInteractive();
    this.interactionLabel.setVisible(false);

    this.dialoguePanel = this.add.rectangle(width / 2, 292, width - 42, 126, 0xeee5cf, 0.96)
      .setStrokeStyle(3, 0x6b675b, 0.5)
      .setScrollFactor(0)
      .setDepth(124)
      .setVisible(false);
    this.dialogueText = this.add.text(width / 2, 292, '', {
      fontFamily: 'serif', fontSize: '18px', color: '#39362f', align: 'center',
      wordWrap: { width: width - 78 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(125).setVisible(false);
  }

  private updateNpcInteraction(time: number): void {
    if (this.dialogueHideAt > 0 && time >= this.dialogueHideAt) {
      this.dialogueHideAt = 0;
      this.dialoguePanel.setVisible(false);
      this.dialogueText.setVisible(false);
    }

    let nextNpc: NpcState | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    if (!this.dead && !this.breakthroughTrialActive && isSettlementY(this.player.y)) {
      for (const npc of this.npcs) {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.node.x, npc.node.y);
        if (distance <= npc.def.interactionRadius && distance < bestDistance) {
          bestDistance = distance;
          nextNpc = npc;
        }
      }
    }

    if (nextNpc === this.nearestNpc) return;
    this.nearestNpc = nextNpc;
    if (!nextNpc) {
      this.interactionButton.setVisible(false).disableInteractive();
      this.interactionLabel.setVisible(false);
      return;
    }

    this.interactionLabel.setText(`TƯƠNG TÁC\n${nextNpc.def.role}`);
    this.interactionButton.setVisible(true).setInteractive({ useHandCursor: true });
    this.interactionLabel.setVisible(true);
  }

  private interactWithNearestNpc(): void {
    const npc = this.nearestNpc;
    if (!npc || this.dead || this.breakthroughTrialActive) return;

    if (npc.def.id === 'elder') {
      if (this.profile.realm === 2) {
        this.showNpcDialogue(`${npc.def.name}: Trúc Cơ đã ổn định. Hãy tiến sâu về Linh Lâm, đừng để khí tức yên quá lâu.`);
        return;
      }
      if (canBreakthrough(this.profile.realm, this.profile.spirit, this.profile.essence)) {
        this.showNpcDialogue(`${npc.def.name}: Khí tức đã viên mãn. Con có thể bắt đầu ĐỘT PHÁ ngay khi sẵn sàng.`);
        return;
      }
      const missingSpirit = Math.max(0, CULTIVATION.realm1.breakthroughSpirit - this.profile.spirit);
      const missingEssence = Math.max(0, CULTIVATION.realm1.breakthroughEssence - this.profile.essence);
      this.showNpcDialogue(`${npc.def.name}: Muốn phá cảnh, còn thiếu ${missingSpirit} Linh Khí và ${missingEssence} Tinh Hoa.`);
      return;
    }

    if (npc.def.id === 'healer') {
      const maxHp = maxHpForRealm(this.profile.realm);
      const restored = maxHp - this.playerHp;
      this.playerHp = maxHp;
      this.invulnerableUntil = Math.max(this.invulnerableUntil, this.time.now + 600);
      this.refreshHud();
      this.showNpcDialogue(
        restored > 0
          ? `${npc.def.name}: Khí huyết đã điều hòa. Sinh lực hồi phục hoàn toàn.`
          : `${npc.def.name}: Mạch tượng ổn định, không cần dùng thêm dược.`,
      );
      return;
    }

    this.showNpcDialogue(
      `${npc.def.name}: Đường hàng qua Linh Lâm còn chưa yên. Khi tuyến đường thông suốt, quầy dược và phù sẽ mở.`,
    );
  }

  private showNpcDialogue(message: string): void {
    this.dialogueText.setText(message).setVisible(true);
    this.dialoguePanel.setVisible(true);
    this.dialogueHideAt = this.time.now + 3400;
  }

  private createHud(width: number): void {
    this.add.rectangle(width / 2, 86, width - 24, 150, 0xeee5cf, 0.86)
      .setStrokeStyle(2, 0x6b675b, 0.36)
      .setScrollFactor(0)
      .setDepth(90);

    this.add.text(28, 20, 'Thanh Vân Ngoại Vực', {
      fontFamily: 'serif', fontSize: '25px', color: '#262922', fontStyle: 'bold',
    }).setScrollFactor(0).setDepth(100);

    this.zoneText = this.add.text(width - 28, 26, '', {
      fontFamily: 'serif', fontSize: '18px', color: '#544c3e', fontStyle: 'bold', align: 'right',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);

    this.hpText = this.add.text(28, 58, '', {
      fontFamily: 'sans-serif', fontSize: '17px', color: '#5b302c', fontStyle: 'bold',
    }).setScrollFactor(0).setDepth(100);

    this.spiritText = this.add.text(28, 84, '', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#394038',
    }).setScrollFactor(0).setDepth(100);

    this.materialText = this.add.text(28, 109, '', {
      fontFamily: 'sans-serif', fontSize: '15px', color: '#665741',
    }).setScrollFactor(0).setDepth(100);

    this.statusText = this.add.text(width / 2, 154, '', {
      fontFamily: 'sans-serif', fontSize: '17px', color: '#554c3c', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);
  }

  private refreshZoneHud(): void {
    const zone = zoneAt(this.player?.y ?? WORLD.playerSpawn.y);
    if (zone.id === this.currentZoneId) return;
    this.currentZoneId = zone.id;
    this.zoneText.setText(zone.id === 'settlement' ? `${zone.name}\nAN TOÀN` : zone.name);
  }

  private updatePlayer(time: number, delta: number): void {
    let vx = this.moveX;
    let vy = this.moveY;
    let speed = COMBAT.player.moveSpeed;

    if (time < this.dodgeUntil) {
      vx = this.dodgeX;
      vy = this.dodgeY;
      speed = COMBAT.player.dodgeSpeed;
    } else if (Math.hypot(vx, vy) > 0.05) {
      this.facingX = vx;
      this.facingY = vy;
    }

    const [nextX, nextY] = moveWithSettlementCollision(
      this.player.x, this.player.y,
      vx * speed * delta / 1000, vy * speed * delta / 1000,
      WORLD.edgePadding, WORLD.width, WORLD.height,
    );
    this.player.setPosition(nextX, nextY);

    this.player.setStrokeStyle(0, 0x000000, 0);
  }

  private performBasicAttack(): void {
    const now = this.time.now;
    if (this.dead || (isSettlementY(this.player.y) && !this.breakthroughTrialActive)) return;
    if (now < this.cooldowns.attack || now < this.actionLockedUntil || now < this.dodgeUntil) return;

    const attackRange = basicAttackRangeForProfile(this.profile);
    const target = this.getNearestEnemy(attackRange);
    this.cooldowns.attack = now + basicAttackCooldownMsForProfile(this.profile);
    this.attackAnimStartedAt = now;
    this.attackAnimUntil = now + PLAYER_RUNTIME_ANIMATION.attack.durationMs;

    if (target) this.faceTarget(target);
    this.spawnFlyingSword(target, now, attackRange);
  }

  private spawnFlyingSword(target: EnemyState | null, time: number, untargetedRange: number): void {
    if (target && !target.node.active) return;

    const angle = target
      ? Math.atan2(target.node.y - this.player.y, target.node.x - this.player.x)
      : Math.atan2(this.facingY, this.facingX);
    const sword = createFlyingSwordVisual(
      this,
      this.player.x,
      this.player.y,
      this.profile.realm,
    )
      .setRotation(angle)
      .setScale(this.profile.realm === 2 ? 1.08 : 0.94);

    if (SWORD_VFX_QC.launch) {
      const launchColor = this.profile.realm === 2 ? 0xc9efe5 : 0xe3eadf;
      const launchHalo = this.add.ellipse(this.player.x, this.player.y, 56, 22, launchColor, 0.32)
        .setRotation(angle)
        .setDepth(17);
      const launchCore = this.add.circle(this.player.x, this.player.y, 9, launchColor, 0.82).setDepth(18);
      this.tweens.add({ targets: launchHalo, scaleX: 2.4, scaleY: 1.65, alpha: 0, duration: 180, onComplete: () => launchHalo.destroy() });
      this.tweens.add({ targets: launchCore, scale: 2.1, alpha: 0, duration: 145, onComplete: () => launchCore.destroy() });
    }

    this.flyingSwords.push({
      node: sword,
      target,
      angle,
      expiresAt: time + COMBAT.player.flyingSwordLifetimeMs,
      nextTrailAt: time,
      originX: this.player.x,
      originY: this.player.y,
      maxTravelDistance: target ? null : untargetedRange,
    });
  }

  private updateFlyingSwords(time: number, delta: number): void {
    const dt = delta / 1000;

    for (let i = this.flyingSwords.length - 1; i >= 0; i -= 1) {
      const sword = this.flyingSwords[i];
      if (!sword) continue;
      if (time >= sword.expiresAt || (sword.target && !sword.target.node.active)) {
        this.destroyFlyingSword(i);
        continue;
      }

      if (sword.target) {
        const desiredAngle = Math.atan2(sword.target.node.y - sword.node.y, sword.target.node.x - sword.node.x);
        const angleDelta = Phaser.Math.Angle.Wrap(desiredAngle - sword.angle);
        const maxTurn = COMBAT.player.flyingSwordTurnRateRadPerSec * dt;
        sword.angle += Phaser.Math.Clamp(angleDelta, -maxTurn, maxTurn);
      }

      sword.node.x += Math.cos(sword.angle) * COMBAT.player.flyingSwordSpeed * dt;
      sword.node.y += Math.sin(sword.angle) * COMBAT.player.flyingSwordSpeed * dt;
      sword.node.setRotation(sword.angle);

      if (SWORD_VFX_QC.trail && time >= sword.nextTrailAt) {
        sword.nextTrailAt = time + COMBAT.player.flyingSwordTrailIntervalMs;
        this.emitFlyingSwordTrail(sword);
      }

      const contactTarget = sword.target ?? this.enemies.find((enemy) =>
        enemy.node.active
        && Phaser.Math.Distance.Between(sword.node.x, sword.node.y, enemy.node.x, enemy.node.y)
          <= COMBAT.player.flyingSwordHitRadius
      ) ?? null;

      if (contactTarget) {
        const targetDistance = Phaser.Math.Distance.Between(
          sword.node.x, sword.node.y, contactTarget.node.x, contactTarget.node.y,
        );
        if (targetDistance <= COMBAT.player.flyingSwordHitRadius) {
          const hitX = contactTarget.node.x;
          const hitY = contactTarget.node.y;
          const originX = sword.node.x;
          const originY = sword.node.y;

          this.destroyFlyingSword(i);
          this.damageEnemy(
            contactTarget,
            flyingSwordDamageForRealm(this.profile.realm),
            0xf2e4b8,
            5,
            originX,
            originY,
          );
          if (SWORD_VFX_QC.impact) {
            const impactColor = this.profile.realm === 2 ? 0xc9efe5 : 0xe5eee3;
            const impactRing = this.add.circle(hitX, hitY, 12, impactColor, 0.08)
              .setStrokeStyle(3, impactColor, 0.78)
              .setDepth(20);
            const impactCore = this.add.circle(hitX, hitY, 6, impactColor, 0.72).setDepth(21);
            this.tweens.add({ targets: impactRing, scale: 2.35, alpha: 0, duration: 165, onComplete: () => impactRing.destroy() });
            this.tweens.add({ targets: impactCore, scale: 1.75, alpha: 0, duration: 95, onComplete: () => impactCore.destroy() });
          }
          continue;
        }
      }

      if (sword.maxTravelDistance !== null) {
        const travelled = Phaser.Math.Distance.Between(sword.originX, sword.originY, sword.node.x, sword.node.y);
        if (travelled >= sword.maxTravelDistance) this.destroyFlyingSword(i);
      }
    }
  }

  private emitFlyingSwordTrail(sword: FlyingSwordState): void {
    const length = this.profile.realm === 2 ? 48 : 42;
    const tailX = sword.node.x - Math.cos(sword.angle) * length;
    const tailY = sword.node.y - Math.sin(sword.angle) * length;
    const color = this.profile.realm === 2 ? 0xc9efe5 : 0xdfe9df;
    const outer = this.add.line(0, 0, sword.node.x, sword.node.y, tailX, tailY, color, 0.16)
      .setOrigin(0, 0).setLineWidth(this.profile.realm === 2 ? 8 : 7).setDepth(16);
    const core = this.add.line(0, 0, sword.node.x, sword.node.y, tailX, tailY, color, this.profile.realm === 2 ? 0.62 : 0.5)
      .setOrigin(0, 0).setLineWidth(this.profile.realm === 2 ? 3 : 2).setDepth(17);

    this.tweens.add({ targets: outer, alpha: 0, duration: 145, onComplete: () => outer.destroy() });
    this.tweens.add({ targets: core, alpha: 0, duration: 120, onComplete: () => core.destroy() });
  }

  private destroyFlyingSword(index: number): void {
    const sword = this.flyingSwords[index];
    if (!sword) return;
    sword.node.destroy(true);
    this.flyingSwords.splice(index, 1);
  }

  private clearFlyingSwords(): void {
    for (const sword of this.flyingSwords) sword.node.destroy(true);
    this.flyingSwords = [];
  }

  private updateEnemies(time: number, delta: number): void {
    for (const enemy of this.enemies) {
      if (!enemy.node.active) continue;
      const distance = this.distanceToPlayer(enemy);

      if (!enemy.trial) {
        if (isSettlementY(this.player.y)) {
          enemy.node.y = Math.min(enemy.node.y, WORLD.safeBoundaryY - 54);
          enemy.nextActionAt = Math.max(enemy.nextActionAt, time + 300);
          continue;
        }
        if (distance > 570) continue;
      }

      if (enemy.kind === 'melee') {
        this.updateMelee(enemy, distance, time, delta);
      } else if (enemy.kind === 'ranged') {
        this.updateRanged(enemy, distance, time, delta);
      } else {
        this.updateCharger(enemy, distance, time, delta);
      }
    }
  }

  private updateMelee(enemy: EnemyState, distance: number, time: number, delta: number): void {
    const cfg = COMBAT.enemy.melee;
    if (distance > cfg.attackRange) {
      this.moveEnemyToward(enemy, cfg.speed, delta);
      return;
    }
    if (time < enemy.nextActionAt) return;

    enemy.nextActionAt = time + cfg.cooldownMs;
    const warning = this.add.circle(enemy.node.x, enemy.node.y, 48, 0xb95745, 0.14)
      .setStrokeStyle(4, 0xb95745, 0.65);
    this.tweens.add({ targets: warning, scale: 1.35, alpha: 0, duration: 260, onComplete: () => warning.destroy() });
    this.time.delayedCall(240, () => {
      if (!enemy.node.active || this.dead) return;
      if (this.distanceToPlayer(enemy) <= cfg.attackRange + 18) this.damagePlayer(Math.max(1, Math.round(cfg.damage * enemy.damageMultiplier)), enemy);
    });
  }

  private updateRanged(enemy: EnemyState, distance: number, time: number, delta: number): void {
    const cfg = COMBAT.enemy.ranged;
    if (distance > cfg.preferredRange + 45) this.moveEnemyToward(enemy, cfg.speed, delta);
    if (distance < cfg.preferredRange - 55) this.moveEnemyAway(enemy, cfg.speed, delta);
    if (time < enemy.nextActionAt || distance > 360) return;

    enemy.nextActionAt = time + cfg.cooldownMs;
    const targetX = this.player.x;
    const targetY = this.player.y;
    const telegraph = this.add.line(0, 0, enemy.node.x, enemy.node.y, targetX, targetY, 0xb46d58, 0.48)
      .setOrigin(0, 0).setLineWidth(3);
    this.tweens.add({ targets: telegraph, alpha: 0, duration: 330, onComplete: () => telegraph.destroy() });

    this.time.delayedCall(320, () => {
      if (!enemy.node.active || this.dead) return;
      const orb = this.add.circle(enemy.node.x, enemy.node.y, 11, 0xb46d58, 0.95).setDepth(16);
      this.tweens.add({
        targets: orb,
        x: targetX,
        y: targetY,
        duration: 360,
        ease: 'Linear',
        onComplete: () => {
          if (!this.dead && Phaser.Math.Distance.Between(this.player.x, this.player.y, targetX, targetY) < 48) {
            this.damagePlayer(Math.max(1, Math.round(cfg.damage * enemy.damageMultiplier)), enemy);
          }
          orb.destroy();
        },
      });
    });
  }

  private updateCharger(enemy: EnemyState, distance: number, time: number, delta: number): void {
    const cfg = COMBAT.enemy.charger;

    if (enemy.phase === 'windup') {
      if (time >= enemy.phaseUntil) {
        enemy.phase = 'charge';
        enemy.phaseUntil = time + 480;
        enemy.chargeHit = false;
        enemy.node.setFillStyle(0x8a6940);
      }
      return;
    }

    if (enemy.phase === 'charge') {
      enemy.node.x += enemy.chargeX * cfg.chargeSpeed * delta / 1000;
      enemy.node.y += enemy.chargeY * cfg.chargeSpeed * delta / 1000;
      this.clampEnemyToWorld(enemy);
      if (!enemy.chargeHit && this.distanceToPlayer(enemy) < 48) {
        enemy.chargeHit = true;
        this.damagePlayer(Math.max(1, Math.round(cfg.damage * enemy.damageMultiplier)), enemy);
      }
      if (time >= enemy.phaseUntil) {
        enemy.phase = 'recover';
        enemy.phaseUntil = time + 420;
        enemy.node.setFillStyle(this.enemyColor('charger'));
      }
      return;
    }

    if (enemy.phase === 'recover') {
      if (time >= enemy.phaseUntil) {
        enemy.phase = 'chase';
        enemy.nextActionAt = time + cfg.cooldownMs;
      }
      return;
    }

    if (distance < 315 && time >= enemy.nextActionAt) {
      const dx = this.player.x - enemy.node.x;
      const dy = this.player.y - enemy.node.y;
      const mag = Math.max(1, Math.hypot(dx, dy));
      enemy.chargeX = dx / mag;
      enemy.chargeY = dy / mag;
      enemy.phase = 'windup';
      enemy.phaseUntil = time + cfg.windupMs;
      const line = this.add.line(
        0, 0,
        enemy.node.x, enemy.node.y,
        enemy.node.x + enemy.chargeX * 250,
        enemy.node.y + enemy.chargeY * 250,
        0xc77c42, 0.55,
      ).setOrigin(0, 0).setLineWidth(5);
      this.tweens.add({ targets: line, alpha: 0.08, duration: cfg.windupMs, onComplete: () => line.destroy() });
      return;
    }

    this.moveEnemyToward(enemy, cfg.speed, delta);
  }

  private clearEnemies(): void {
    for (const enemy of this.enemies) {
      if (enemy.visual.active) enemy.visual.destroy(true);
      if (enemy.node.active) enemy.node.destroy();
    }
    this.enemies = [];
  }

  private spawnAllEncounters(): void {
    this.clearFlyingSwords();
    this.clearEnemies();
    for (const encounter of ENCOUNTERS) this.spawnEncounterDefinition(encounter);
  }

  private spawnEncounterDefinition(encounter: EncounterDefinition): void {
    for (const enemy of encounter.enemies) {
      this.spawnEnemy(
        enemy.kind,
        encounter.x + enemy.dx,
        encounter.y + enemy.dy,
        false,
        encounter.id,
        enemy.hpMultiplier,
        enemy.damageMultiplier,
      );
    }
  }

  private activeEncounterEnemyCount(encounterId: string): number {
    return this.enemies.reduce(
      (count, enemy) => count + (enemy.node.active && enemy.encounterId === encounterId ? 1 : 0),
      0,
    );
  }

  private spawnBreakthroughTrial(): void {
    this.clearFlyingSwords();
    this.clearEnemies();
    const x = this.player.x;
    const y = this.player.y;
    this.spawnEnemy('melee', x - 190, y - 245, true);
    this.spawnEnemy('ranged', x + 190, y - 210, true);
    this.spawnEnemy('charger', x + 245, y + 40, true);
  }

  private spawnEnemy(
    kind: EnemyKind,
    x: number,
    y: number,
    trial = false,
    encounterId: string | null = null,
    hpMultiplier = 1,
    damageMultiplier = 1,
  ): void {
    const cfg = COMBAT.enemy[kind];
    const clampedX = Phaser.Math.Clamp(x, WORLD.edgePadding, WORLD.width - WORLD.edgePadding);
    const maxY = trial ? WORLD.height - WORLD.edgePadding : WORLD.safeBoundaryY - 70;
    const clampedY = Phaser.Math.Clamp(y, WORLD.edgePadding, maxY);
    const node = this.add.circle(
      clampedX,
      clampedY,
      kind === 'charger' ? 35 : 31,
      0x000000,
      0.001,
    ).setStrokeStyle(0, 0x000000, 0).setDepth(9);
    const visual = createEnemyVisual(this, kind, clampedX, clampedY, trial);
    const hp = Math.max(1, Math.ceil(cfg.hp * hpMultiplier));
    this.enemies.push({
      kind,
      node,
      visual,
      hp,
      maxHp: hp,
      nextActionAt: this.time.now + 700,
      phase: 'chase',
      phaseUntil: 0,
      chargeX: 0,
      chargeY: 0,
      chargeHit: false,
      trial,
      encounterId,
      damageMultiplier,
    });
  }

  private enemyColor(kind: EnemyKind): number {
    if (kind === 'melee') return 0x80554b;
    if (kind === 'ranged') return 0x536747;
    return 0x695579;
  }

  private getNearestEnemy(maxRange: number): EnemyState | null {
    let best: EnemyState | null = null;
    let bestDistance = maxRange;
    for (const enemy of this.enemies) {
      if (!enemy.node.active) continue;
      const distance = this.distanceToPlayer(enemy);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = enemy;
      }
    }
    return best;
  }

  private activeEnemyCount(): number {
    return this.enemies.reduce((count, enemy) => count + (enemy.node.active ? 1 : 0), 0);
  }

  private damageEnemy(
    enemy: EnemyState,
    damage: number,
    color: number,
    width: number,
    originX = this.player.x,
    originY = this.player.y,
  ): void {
    if (!enemy.node.active) return;
    const fx = this.add.line(0, 0, originX, originY, enemy.node.x, enemy.node.y, color, 0.95)
      .setOrigin(0, 0).setLineWidth(width).setDepth(19);
    this.tweens.add({ targets: fx, alpha: 0, duration: 150, onComplete: () => fx.destroy() });

    enemy.hp -= damage;
    enemy.visual.setScale(1.14);
    this.tweens.add({ targets: enemy.visual, scale: 1, duration: 120 });
    if (enemy.hp <= 0) this.killEnemy(enemy);
  }

  private killEnemy(enemy: EnemyState): void {
    if (!enemy.node.active) return;
    enemy.visual.destroy(true);
    enemy.node.destroy();

    if (this.breakthroughTrialActive) {
      this.breakthroughTrialKills += 1;
      this.statusText.setText(`Đột phá • Kiếp ảnh ${this.breakthroughTrialKills}/3`);
      if (this.breakthroughTrialKills >= 3) this.completeBreakthrough();
      return;
    }

    this.profile.spirit = Math.min(
      this.profile.maxSpirit,
      this.profile.spirit + CULTIVATION.rewards.spiritPerKill,
    );
    this.profile.essence += CULTIVATION.rewards.essencePerKill;
    this.refreshHud();

    const encounterId = enemy.encounterId;
    if (encounterId && this.activeEncounterEnemyCount(encounterId) === 0) {
      this.time.delayedCall(CULTIVATION.encounterRespawnMs, () => {
        if (this.dead || this.breakthroughTrialActive || this.activeEncounterEnemyCount(encounterId) > 0) return;
        const encounter = ENCOUNTERS.find((entry) => entry.id === encounterId);
        if (encounter) this.spawnEncounterDefinition(encounter);
      });
    }
  }

  private createBreakthroughUi(width: number): void {
    this.breakthroughButton = this.add.rectangle(width / 2, 205, 250, 62, 0x654c35, 0.92)
      .setStrokeStyle(3, 0xe5cf9c, 0.95)
      .setDepth(120)
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });
    this.breakthroughLabel = this.add.text(width / 2, 205, 'ĐỘT PHÁ\n50 Linh Khí + 3 Tinh Hoa', {
      fontFamily: 'serif', fontSize: '17px', color: '#fff1cd', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5).setDepth(121).setScrollFactor(0);

    this.breakthroughButton.on('pointerdown', () => this.startBreakthroughTrial());
    this.breakthroughButton.setVisible(false).disableInteractive();
    this.breakthroughLabel.setVisible(false);
  }

  private refreshBreakthroughUi(): void {
    const ready = !this.dead
      && !this.breakthroughTrialActive
      && canBreakthrough(this.profile.realm, this.profile.spirit, this.profile.essence);

    this.breakthroughButton.setVisible(ready);
    this.breakthroughLabel.setVisible(ready);
    if (ready) this.breakthroughButton.setInteractive({ useHandCursor: true });
    else this.breakthroughButton.disableInteractive();
  }

  private startBreakthroughTrial(): void {
    if (this.dead || this.breakthroughTrialActive) return;
    if (!canBreakthrough(this.profile.realm, this.profile.spirit, this.profile.essence)) return;

    this.breakthroughTrialActive = true;
    this.breakthroughTrialKills = 0;
    this.refreshBreakthroughUi();
    this.statusText.setText('Đột phá bắt đầu • Hạ 3 Kiếp Ảnh');

    const aura = this.add.circle(this.player.x, this.player.y, 58, 0xd8c27d, 0.1)
      .setStrokeStyle(5, 0xd8c27d, 0.75)
      .setDepth(14);
    this.tweens.add({ targets: aura, scale: 3.2, alpha: 0, duration: 650, onComplete: () => aura.destroy() });

    this.spawnBreakthroughTrial();
  }

  private completeBreakthrough(): void {
    if (!this.breakthroughTrialActive || this.profile.realm !== 1) return;

    this.breakthroughTrialActive = false;
    this.breakthroughTrialKills = 0;
    this.profile.realm = 2;
    this.profile.spirit = 0;
    this.profile.essence = Math.max(0, this.profile.essence - CULTIVATION.realm1.breakthroughEssence);
    this.profile.maxSpirit = CULTIVATION.realm2.maxSpirit;
    this.playerHp = maxHpForRealm(this.profile.realm);
    this.invulnerableUntil = this.time.now + 1200;
    this.clearFlyingSwords();

    const ascension = this.add.circle(this.player.x, this.player.y, 64, 0xc7eee3, 0.16)
      .setStrokeStyle(7, 0xdff9ef, 0.85)
      .setDepth(15);
    this.tweens.add({ targets: ascension, scale: 4.2, alpha: 0, duration: 900, onComplete: () => ascension.destroy() });

    this.statusText.setText('TRÚC CƠ THÀNH • Phi kiếm +1 sát thương • Sinh lực +2');
    this.refreshHud();
    this.time.delayedCall(1200, () => {
      if (!this.dead) {
        this.statusText.setText('');
        this.spawnAllEncounters();
      }
    });
  }

  private damagePlayer(damage: number, source?: EnemyState): void {
    const now = this.time.now;
    if (this.dead || now < this.invulnerableUntil) return;
    if (source && !source.trial && isSettlementY(this.player.y)) return;

    this.playerHp = Math.max(0, this.playerHp - damage);
    this.invulnerableUntil = now + 380;
    this.cameras.main.shake(90, 0.008);
    this.refreshHud();
    if (source?.node.active) source.nextActionAt = Math.max(source.nextActionAt, now + 180);
    if (this.playerHp <= 0) this.die();
  }

  private die(): void {
    if (this.dead) return;
    this.dead = true;
    if (this.breakthroughTrialActive) {
      this.breakthroughTrialActive = false;
      this.breakthroughTrialKills = 0;
    }
    this.clearFlyingSwords();
    this.moveX = 0;
    this.moveY = 0;
    this.player.setAlpha(0.35);
    this.playerVisual.setAlpha(0.35);
    this.statusText.setText('Trọng thương... đang hồi phục');
    this.refreshBreakthroughUi();
    this.time.delayedCall(1200, () => this.respawn());
  }

  private respawn(): void {
    this.dead = false;
    this.clearFlyingSwords();
    this.playerHp = maxHpForRealm(this.profile.realm);
    this.player.setPosition(this.respawnX, this.respawnY).setAlpha(1);
    this.playerVisual.setPosition(this.respawnX, this.respawnY).setAlpha(1);
    this.cooldowns.attack = this.time.now + 300;
    this.actionLockedUntil = 0;
    this.attackAnimStartedAt = 0;
    this.attackAnimUntil = 0;
    this.skillAnimStartedAt = 0;
    this.skillAnimUntil = 0;
    this.dodgeUntil = 0;
    this.invulnerableUntil = this.time.now + 900;
    this.statusText.setText('');
    this.spawnAllEncounters();
    this.refreshHud();
    this.refreshZoneHud();
  }

  private startDodge(): void {
    const now = this.time.now;
    if (this.dead || now < this.cooldowns.dodge || now < this.dodgeUntil) return;
    const mag = Math.hypot(this.moveX, this.moveY);
    this.dodgeX = mag > 0.1 ? this.moveX / mag : this.facingX;
    this.dodgeY = mag > 0.1 ? this.moveY / mag : this.facingY;
    this.dodgeUntil = now + COMBAT.player.dodgeDurationMs;
    this.invulnerableUntil = now + COMBAT.player.iframeMs;
    this.actionLockedUntil = this.dodgeUntil;
    this.cooldowns.dodge = now + COMBAT.player.dodgeCooldownMs;
    this.emitDodgeMotionCue();
    this.time.delayedCall(58, () => {
      if (!this.dead && this.time.now < this.dodgeUntil) this.emitDodgeMotionCue();
    });
  }

  private emitDodgeMotionCue(): void {
    const cfg = PLAYER_RUNTIME_ANIMATION.dodge;
    const headX = this.player.x - this.dodgeX * 8;
    const headY = this.player.y - 18 - this.dodgeY * 8;
    const tailX = this.player.x - this.dodgeX * cfg.trailLengthPx;
    const tailY = this.player.y - 18 - this.dodgeY * cfg.trailLengthPx;
    const streak = this.add.line(
      0, 0, headX, headY, tailX, tailY, 0xd7e7dc, cfg.trailAlpha,
    ).setOrigin(0, 0).setLineWidth(cfg.trailWidthPx).setDepth(9);
    this.tweens.add({
      targets: streak,
      alpha: 0,
      duration: cfg.trailDurationMs,
      onComplete: () => streak.destroy(),
    });
  }

  private castCleave(): void {
    const now = this.time.now;
    if (!this.canCast(now, this.cooldowns.skill)) return;
    this.cooldowns.skill = now + COMBAT.skills.cleaveCooldownMs;
    this.skillAnimStartedAt = now;
    this.skillAnimUntil = now + PLAYER_RUNTIME_ANIMATION.skill.durationMs;
    this.actionLockedUntil = this.skillAnimUntil;

    const facingAngle = Math.atan2(this.facingY, this.facingX);
    const halfArc = COMBAT.skills.cleaveArcDeg * Math.PI / 360;
    for (const enemy of this.enemies) {
      if (!enemy.node.active) continue;
      const distance = this.distanceToPlayer(enemy);
      if (distance > COMBAT.skills.cleaveRange) continue;
      const enemyAngle = Math.atan2(enemy.node.y - this.player.y, enemy.node.x - this.player.x);
      const diff = Math.abs(Phaser.Math.Angle.Wrap(enemyAngle - facingAngle));
      if (diff <= halfArc) {
        this.damageEnemy(enemy, skillDamageForRealm(this.profile.realm), 0xe7d49a, 12);
      }
    }

    const pulse = this.add.circle(this.player.x, this.player.y, 52, 0xe7d49a, 0.1)
      .setStrokeStyle(5, 0xe7d49a, 0.7)
      .setDepth(13);
    this.tweens.add({ targets: pulse, scale: 2.7, alpha: 0, duration: 240, onComplete: () => pulse.destroy() });
  }

  private canCast(now: number, readyAt: number): boolean {
    return !this.dead && now >= readyAt && now >= this.actionLockedUntil && now >= this.dodgeUntil;
  }

  private faceTarget(enemy: EnemyState): void {
    const dx = enemy.node.x - this.player.x;
    const dy = enemy.node.y - this.player.y;
    const mag = Math.max(1, Math.hypot(dx, dy));
    this.facingX = dx / mag;
    this.facingY = dy / mag;
  }

  private moveEnemyToward(enemy: EnemyState, speed: number, delta: number): void {
    const dx = this.player.x - enemy.node.x;
    const dy = this.player.y - enemy.node.y;
    const mag = Math.max(1, Math.hypot(dx, dy));
    enemy.node.x += dx / mag * speed * delta / 1000;
    enemy.node.y += dy / mag * speed * delta / 1000;
    this.clampEnemyToWorld(enemy);
  }

  private moveEnemyAway(enemy: EnemyState, speed: number, delta: number): void {
    const dx = enemy.node.x - this.player.x;
    const dy = enemy.node.y - this.player.y;
    const mag = Math.max(1, Math.hypot(dx, dy));
    enemy.node.x += dx / mag * speed * delta / 1000;
    enemy.node.y += dy / mag * speed * delta / 1000;
    this.clampEnemyToWorld(enemy);
  }

  private clampEnemyToWorld(enemy: EnemyState): void {
    enemy.node.x = Phaser.Math.Clamp(enemy.node.x, WORLD.edgePadding, WORLD.width - WORLD.edgePadding);
    const maxY = enemy.trial ? WORLD.height - WORLD.edgePadding : WORLD.safeBoundaryY - 54;
    enemy.node.y = Phaser.Math.Clamp(enemy.node.y, WORLD.edgePadding, maxY);
  }

  private distanceToPlayer(enemy: EnemyState): number {
    return Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.node.x, enemy.node.y);
  }

  private createJoystick(x: number, y: number): void {
    this.joystickBase = this.add.circle(x, y, 86, 0x242923, 0.16)
      .setStrokeStyle(3, 0x33372f, 0.45)
      .setScrollFactor(0)
      .setDepth(110);
    this.joystickNub = this.add.circle(x, y, 40, 0x4e5a4d, 0.62)
      .setScrollFactor(0)
      .setDepth(111);
  }

  private bindTouchControls(): void {
    this.input.addPointer(3);
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
    this.createCombatButton('attack', width - 132, height - 158, 80, 'ATK', () => this.performBasicAttack());
    this.createCombatButton('skill', width - 248, height - 286, 52, 'SKILL', () => this.castCleave());
    this.createCombatButton('dodge', width - 68, height - 292, 52, 'NÉ', () => this.startDodge());

    this.add.text(width - 158, height - 382, 'ATK: Phi Kiếm • SKILL: Trảm Kích', {
      fontFamily: 'sans-serif', fontSize: '15px', color: '#4b4a42', align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(110);
  }

  private createCombatButton(
    key: CombatButtonKey,
    x: number,
    y: number,
    radius: number,
    label: string,
    action: () => void,
  ): void {
    const circle = this.add.circle(x, y, radius, 0x343a33, 0.78)
      .setStrokeStyle(3, 0xded3b8, 0.85)
      .setScrollFactor(0)
      .setDepth(112)
      .setInteractive({ useHandCursor: true });
    circle.on('pointerdown', action);
    const text = this.add.text(x, y, label, {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#f7efdc', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(113);
    this.buttonLabels[key] = text;
  }

  private refreshCooldownLabels(time: number): void {
    const names: Record<CombatButtonKey, string> = { attack: 'ATK', dodge: 'NÉ', skill: 'SKILL' };
    for (const key of Object.keys(this.cooldowns) as CombatButtonKey[]) {
      const label = this.buttonLabels[key];
      if (!label) continue;
      const remaining = this.cooldowns[key] - time;
      label.setText(remaining > 0 ? `${names[key]}\n${(remaining / 1000).toFixed(1)}` : names[key]);
    }
  }

  private syncPlayerPresentation(): void {
    const now = this.time.now;
    const moving = Math.hypot(this.moveX, this.moveY) > 0.08;
    let offsetX = 0;
    let offsetY = 0;
    let rotation = 0;
    let scaleX = 1;
    let scaleY = 1;

    if (this.facingX < -0.2) this.playerVisualFacingSign = -1;
    else if (this.facingX > 0.2) this.playerVisualFacingSign = 1;

    if (!this.dead && now < this.dodgeUntil) {
      const cfg = PLAYER_RUNTIME_ANIMATION.dodge;
      const horizontal = Math.abs(this.dodgeX) >= Math.abs(this.dodgeY);
      scaleX = horizontal ? 1 + cfg.stretchScale : 1 - cfg.stretchScale * 0.28;
      scaleY = horizontal ? 1 - cfg.stretchScale * 0.28 : 1 + cfg.stretchScale;
      rotation = this.dodgeX * cfg.tiltRad;
    } else if (!this.dead && now < this.skillAnimUntil) {
      const cfg = PLAYER_RUNTIME_ANIMATION.skill;
      const progress = Phaser.Math.Clamp((now - this.skillAnimStartedAt) / cfg.durationMs, 0, 1);
      const pulse = Math.sin(progress * Math.PI);
      const directionSign = Math.abs(this.facingX) > 0.15 ? Math.sign(this.facingX) : this.playerVisualFacingSign;
      offsetX = this.facingX * cfg.forwardPx * pulse;
      offsetY = this.facingY * cfg.forwardPx * pulse - cfg.liftPx * pulse;
      scaleX = 1 + cfg.pulseScale * pulse;
      scaleY = 1 - cfg.pulseScale * 0.42 * pulse;
      rotation = directionSign * cfg.tiltRad * pulse;
    } else if (!this.dead && now < this.attackAnimUntil) {
      const cfg = PLAYER_RUNTIME_ANIMATION.attack;
      const progress = Phaser.Math.Clamp((now - this.attackAnimStartedAt) / cfg.durationMs, 0, 1);
      const pulse = Math.sin(progress * Math.PI);
      offsetX = this.facingX * cfg.forwardPx * pulse;
      offsetY = this.facingY * cfg.forwardPx * pulse;
      scaleX = 1 + cfg.pulseScale * pulse;
      scaleY = 1 - cfg.pulseScale * 0.35 * pulse;
      rotation = this.facingX * cfg.tiltRad * pulse;
    } else if (!this.dead && moving) {
      const cfg = PLAYER_RUNTIME_ANIMATION.run;
      const phase = (now % cfg.cycleMs) / cfg.cycleMs * Math.PI * 2;
      const step = Math.sin(phase);
      const bounce = Math.abs(step);
      offsetY = -bounce * cfg.bobPx;
      scaleX = 1 + bounce * cfg.squashScale;
      scaleY = 1 - bounce * cfg.squashScale * 0.65;
      rotation = this.facingX * cfg.leanRad + Math.cos(phase) * cfg.leanRad * 0.24;
    } else if (!this.dead) {
      const cfg = PLAYER_RUNTIME_ANIMATION.idle;
      const phase = (now % cfg.cycleMs) / cfg.cycleMs * Math.PI * 2;
      const breath = Math.sin(phase);
      offsetY = breath * cfg.bobPx;
      scaleX = 1 - breath * cfg.breatheScale * 0.45;
      scaleY = 1 + breath * cfg.breatheScale;
      rotation = breath * cfg.swayRad;
    }

    this.playerVisual
      .setPosition(this.player.x + offsetX, this.player.y + offsetY)
      .setScale(this.playerVisualFacingSign * scaleX, scaleY)
      .setRotation(rotation);

    const invulnerable = now < this.invulnerableUntil;
    this.playerVisual.setAlpha(this.dead ? 0.35 : invulnerable ? 0.78 : 1);
  }

  private syncEnemyVisuals(): void {
    for (const enemy of this.enemies) {
      if (!enemy.node.active || !enemy.visual.active) continue;
      enemy.visual.setPosition(enemy.node.x, enemy.node.y);
    }
  }

  private refreshHud(): void {
    this.hpText.setText(`Sinh lực ${this.playerHp}/${maxHpForRealm(this.profile.realm)}`);
    this.spiritText.setText(`${realmName(this.profile.realm)} • Linh khí ${this.profile.spirit}/${this.profile.maxSpirit}`);
    this.materialText.setText(
      this.profile.realm === 1
        ? `Tinh Hoa ${this.profile.essence} • Đột phá cần 50 Linh Khí + 3 Tinh Hoa`
        : `Tinh Hoa ${this.profile.essence} • Cảnh giới Trúc Cơ đã ổn định`,
    );
    this.refreshBreakthroughUi();
  }
}
