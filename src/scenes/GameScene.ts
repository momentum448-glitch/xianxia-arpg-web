import Phaser from 'phaser';
import { COMBAT, type EnemyKind } from '../game/combatConfig';
import {
  CULTIVATION,
  canBreakthrough,
  flyingSwordDamageForRealm,
  maxHpForRealm,
  realmName,
  skillDamageForRealm,
} from '../game/cultivationConfig';
import { createPlayerProfile, type PlayerGender, type PlayerProfile } from '../game/playerProfile';
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
}

interface FlyingSwordState {
  node: Phaser.GameObjects.Container;
  target: EnemyState;
  angle: number;
  expiresAt: number;
  nextTrailAt: number;
}

type CombatButtonKey = 'dodge' | 'skill';

interface Cooldowns {
  dodge: number;
  skill: number;
}

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
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
  private nextAttackAt = 0;
  private actionLockedUntil = 0;
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
  private cooldowns: Cooldowns = { dodge: 0, skill: 0 };
  private buttonLabels: Partial<Record<CombatButtonKey, Phaser.GameObjects.Text>> = {};

  constructor() {
    super('Game');
  }

  init(data: { gender?: PlayerGender }): void {
    this.profile = createPlayerProfile(data.gender ?? 'male');
  }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#d9d0b7');
    this.cameras.main.setBounds(0, 0, WORLD.width, WORLD.height);

    this.createWorldShell();
    this.createHud(width);

    const playerColor = this.profile.gender === 'male' ? 0x425b52 : 0x785560;
    this.respawnX = WORLD.playerSpawn.x;
    this.respawnY = WORLD.playerSpawn.y;
    this.player = this.add.rectangle(this.respawnX, this.respawnY, 58, 78, playerColor)
      .setStrokeStyle(3, 0xf6ead0)
      .setDepth(10);

    this.add.text(this.player.x, this.player.y, this.profile.gender === 'male' ? 'NAM' : 'NỮ', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5).setName('playerLabel').setDepth(11);

    this.cameras.main.startFollow(this.player, true, 0.11, 0.11);
    this.cameras.main.setDeadzone(150, 280);

    this.createBreakthroughUi(width);
    this.spawnEncounter();
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
      this.updateAutoAttack(time);
      this.updateFlyingSwords(time, delta);
    }

    this.syncPlayerPresentation();
    this.refreshCooldownLabels(time);
    this.refreshZoneHud();
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

    const houses = [
      { x: 300, y: 3650, w: 210, h: 145 },
      { x: 780, y: 3680, w: 220, h: 155 },
      { x: 330, y: 4040, w: 230, h: 150 },
      { x: 755, y: 4050, w: 205, h: 140 },
    ];
    for (const house of houses) {
      this.add.rectangle(house.x, house.y, house.w, house.h, 0xc2a77d, 0.72)
        .setStrokeStyle(5, 0x765f43, 0.65)
        .setDepth(-3);
      this.add.triangle(house.x, house.y - house.h / 2 - 35, -120, 45, 120, 45, 0, -45, 0x75624b, 0.75)
        .setDepth(-2);
    }

    for (let i = 0; i < 14; i += 1) {
      const x = 120 + (i % 5) * 205 + (i % 2) * 28;
      const y = 1250 + Math.floor(i / 5) * 300 + (i % 3) * 45;
      this.add.circle(x, y, 46, 0x6f805c, 0.38).setDepth(-6);
      this.add.circle(x + 22, y - 20, 34, 0x657754, 0.3).setDepth(-6);
    }

    for (let i = 0; i < 10; i += 1) {
      const x = 120 + (i % 4) * 270;
      const y = 190 + Math.floor(i / 4) * 310 + (i % 2) * 65;
      this.add.polygon(x, y, [0, -42, 34, -12, 27, 35, -22, 43, -39, 2], 0x6e6b62, 0.35)
        .setDepth(-6);
    }
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

    this.player.x = Phaser.Math.Clamp(
      this.player.x + vx * speed * delta / 1000,
      WORLD.edgePadding,
      WORLD.width - WORLD.edgePadding,
    );
    this.player.y = Phaser.Math.Clamp(
      this.player.y + vy * speed * delta / 1000,
      WORLD.edgePadding,
      WORLD.height - WORLD.edgePadding,
    );

    if (time < this.invulnerableUntil) {
      this.player.setStrokeStyle(5, 0xf5e8a8);
    } else {
      this.player.setStrokeStyle(3, 0xf6ead0);
    }
  }

  private updateAutoAttack(time: number): void {
    if (isSettlementY(this.player.y) && !this.breakthroughTrialActive) return;
    if (time < this.nextAttackAt || time < this.actionLockedUntil || time < this.dodgeUntil) return;
    const target = this.getNearestEnemy(COMBAT.player.autoAttackRange);
    if (!target) return;

    this.nextAttackAt = time + COMBAT.player.autoAttackCooldownMs;
    this.faceTarget(target);
    this.spawnFlyingSword(target, time);
  }

  private spawnFlyingSword(target: EnemyState, time: number): void {
    if (!target.node.active) return;

    const angle = Math.atan2(target.node.y - this.player.y, target.node.x - this.player.x);
    const blade = this.add.rectangle(10, 0, 30, 6, 0xf6edd5).setStrokeStyle(1, 0x6b6e65);
    const tip = this.add.triangle(30, 0, 0, -6, 12, 0, 0, 6, 0xf6edd5).setStrokeStyle(1, 0x6b6e65);
    const guard = this.add.rectangle(-7, 0, 5, 16, 0xb89b62);
    const hilt = this.add.rectangle(-14, 0, 12, 5, 0x6d4c35);
    const sword = this.add.container(this.player.x, this.player.y, [blade, tip, guard, hilt])
      .setRotation(angle)
      .setDepth(18)
      .setScale(this.profile.realm === 2 ? 1.06 : 0.92);

    const launchFlash = this.add.circle(this.player.x, this.player.y, 11, 0xe7dcc0, 0.35).setDepth(17);
    this.tweens.add({ targets: launchFlash, scale: 2.2, alpha: 0, duration: 130, onComplete: () => launchFlash.destroy() });

    this.flyingSwords.push({
      node: sword,
      target,
      angle,
      expiresAt: time + COMBAT.player.flyingSwordLifetimeMs,
      nextTrailAt: time,
    });
  }

  private updateFlyingSwords(time: number, delta: number): void {
    const dt = delta / 1000;

    for (let i = this.flyingSwords.length - 1; i >= 0; i -= 1) {
      const sword = this.flyingSwords[i];
      if (!sword) continue;
      if (!sword.target.node.active || time >= sword.expiresAt) {
        this.destroyFlyingSword(i);
        continue;
      }

      const desiredAngle = Math.atan2(sword.target.node.y - sword.node.y, sword.target.node.x - sword.node.x);
      const angleDelta = Phaser.Math.Angle.Wrap(desiredAngle - sword.angle);
      const maxTurn = COMBAT.player.flyingSwordTurnRateRadPerSec * dt;
      sword.angle += Phaser.Math.Clamp(angleDelta, -maxTurn, maxTurn);

      sword.node.x += Math.cos(sword.angle) * COMBAT.player.flyingSwordSpeed * dt;
      sword.node.y += Math.sin(sword.angle) * COMBAT.player.flyingSwordSpeed * dt;
      sword.node.setRotation(sword.angle);

      if (time >= sword.nextTrailAt) {
        sword.nextTrailAt = time + COMBAT.player.flyingSwordTrailIntervalMs;
        this.emitFlyingSwordTrail(sword);
      }

      const distance = Phaser.Math.Distance.Between(
        sword.node.x, sword.node.y, sword.target.node.x, sword.target.node.y,
      );

      if (distance <= COMBAT.player.flyingSwordHitRadius) {
        const target = sword.target;
        const hitX = target.node.x;
        const hitY = target.node.y;
        const originX = sword.node.x;
        const originY = sword.node.y;

        this.destroyFlyingSword(i);
        this.damageEnemy(
          target,
          flyingSwordDamageForRealm(this.profile.realm),
          0xf2e4b8,
          5,
          originX,
          originY,
        );
        const impact = this.add.circle(hitX, hitY, 14, 0xf1e4bd, 0.32).setStrokeStyle(2, 0xf1e4bd, 0.7);
        this.tweens.add({ targets: impact, scale: 2.1, alpha: 0, duration: 150, onComplete: () => impact.destroy() });
      }
    }
  }

  private emitFlyingSwordTrail(sword: FlyingSwordState): void {
    const tailX = sword.node.x - Math.cos(sword.angle) * 28;
    const tailY = sword.node.y - Math.sin(sword.angle) * 28;
    const trail = this.add.line(
      0, 0,
      sword.node.x, sword.node.y,
      tailX, tailY,
      this.profile.realm === 2 ? 0xc9efe5 : 0xdce7dc,
      this.profile.realm === 2 ? 0.58 : 0.42,
    ).setOrigin(0, 0).setLineWidth(this.profile.realm === 2 ? 4 : 3).setDepth(17);

    this.tweens.add({ targets: trail, alpha: 0, duration: 150, onComplete: () => trail.destroy() });
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
      if (this.distanceToPlayer(enemy) <= cfg.attackRange + 18) this.damagePlayer(cfg.damage, enemy);
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
            this.damagePlayer(cfg.damage, enemy);
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
        this.damagePlayer(cfg.damage, enemy);
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
      if (enemy.node.active) enemy.node.destroy();
    }
    this.enemies = [];
  }

  private spawnEncounter(): void {
    this.clearFlyingSwords();
    this.clearEnemies();
    const { x, y } = WORLD.encounterCenter;
    this.spawnEnemy('melee', x - 190, y + 80);
    this.spawnEnemy('ranged', x + 145, y - 100);
    this.spawnEnemy('charger', x + 240, y + 155);
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

  private spawnEnemy(kind: EnemyKind, x: number, y: number, trial = false): void {
    const cfg = COMBAT.enemy[kind];
    const clampedX = Phaser.Math.Clamp(x, WORLD.edgePadding, WORLD.width - WORLD.edgePadding);
    const maxY = trial ? WORLD.height - WORLD.edgePadding : WORLD.safeBoundaryY - 70;
    const clampedY = Phaser.Math.Clamp(y, WORLD.edgePadding, maxY);
    const node = this.add.circle(
      clampedX,
      clampedY,
      kind === 'charger' ? 35 : 31,
      trial ? 0x77564d : this.enemyColor(kind),
    ).setStrokeStyle(trial ? 5 : 3, trial ? 0xd7b36d : 0x332f2a).setDepth(9);
    const hp = cfg.hp;
    this.enemies.push({
      kind,
      node,
      hp,
      maxHp: hp,
      nextActionAt: this.time.now + 700,
      phase: 'chase',
      phaseUntil: 0,
      chargeX: 0,
      chargeY: 0,
      chargeHit: false,
      trial,
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
    enemy.node.setScale(1.17);
    this.tweens.add({ targets: enemy.node, scale: 1, duration: 120 });
    if (enemy.hp <= 0) this.killEnemy(enemy);
  }

  private killEnemy(enemy: EnemyState): void {
    if (!enemy.node.active) return;
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

    if (this.activeEnemyCount() === 0) {
      this.time.delayedCall(CULTIVATION.encounterRespawnMs, () => {
        if (!this.dead && !this.breakthroughTrialActive && this.activeEnemyCount() === 0) {
          this.spawnEncounter();
        }
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
        this.spawnEncounter();
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
    this.statusText.setText('Trọng thương... đang hồi phục');
    this.refreshBreakthroughUi();
    this.time.delayedCall(1200, () => this.respawn());
  }

  private respawn(): void {
    this.dead = false;
    this.clearFlyingSwords();
    this.playerHp = maxHpForRealm(this.profile.realm);
    this.player.setPosition(this.respawnX, this.respawnY).setAlpha(1);
    this.nextAttackAt = this.time.now + 500;
    this.actionLockedUntil = 0;
    this.dodgeUntil = 0;
    this.invulnerableUntil = this.time.now + 900;
    this.statusText.setText('');
    this.spawnEncounter();
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
  }

  private castCleave(): void {
    const now = this.time.now;
    if (!this.canCast(now, this.cooldowns.skill)) return;
    this.cooldowns.skill = now + COMBAT.skills.cleaveCooldownMs;
    this.actionLockedUntil = now + 230;

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
    this.createCombatButton('dodge', width - 104, height - 128, 60, 'NÉ', () => this.startDodge());
    this.createCombatButton('skill', width - 230, height - 144, 58, 'SKILL', () => this.castCleave());

    this.add.text(width - 172, height - 238, 'Đánh thường: PHI KIẾM • Skill: Trảm Kích', {
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
    const names: Record<CombatButtonKey, string> = { dodge: 'NÉ', skill: 'SKILL' };
    for (const key of Object.keys(this.cooldowns) as CombatButtonKey[]) {
      const label = this.buttonLabels[key];
      if (!label) continue;
      const remaining = this.cooldowns[key] - time;
      label.setText(remaining > 0 ? `${names[key]}\n${(remaining / 1000).toFixed(1)}` : names[key]);
    }
  }

  private syncPlayerPresentation(): void {
    const label = this.children.getByName('playerLabel') as Phaser.GameObjects.Text | null;
    label?.setPosition(this.player.x, this.player.y);
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
