from pathlib import Path

p = Path('src/scenes/GameScene.ts')
s = p.read_text()

repls = []

repls.append((
"import Phaser from 'phaser';\nimport { COMBAT, type EnemyKind } from '../game/combatConfig';",
"import Phaser from 'phaser';\nimport { createEnemyVisual, createFlyingSwordVisual, createPlayerVisual } from '../game/actorVisuals';\nimport { COMBAT, type EnemyKind } from '../game/combatConfig';"
))

repls.append((
"  damageMultiplier: number;\n}",
"  damageMultiplier: number;\n  visual: Phaser.GameObjects.Container;\n}"
))

repls.append((
"export class GameScene extends Phaser.Scene {\n  private player!: Phaser.GameObjects.Rectangle;",
"export class GameScene extends Phaser.Scene {\n  private player!: Phaser.GameObjects.Rectangle;\n  private playerVisual!: Phaser.GameObjects.Container;"
))

old_player = """    const playerColor = this.profile.gender === 'male' ? 0x425b52 : 0x785560;
    this.respawnX = WORLD.playerSpawn.x;
    this.respawnY = WORLD.playerSpawn.y;
    this.player = this.add.rectangle(this.respawnX, this.respawnY, 58, 78, playerColor)
      .setStrokeStyle(3, 0xf6ead0)
      .setDepth(10);

    this.add.text(this.player.x, this.player.y, this.profile.gender === 'male' ? 'NAM' : 'NỮ', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5).setName('playerLabel').setDepth(11);
"""
new_player = """    this.respawnX = WORLD.playerSpawn.x;
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
"""
repls.append((old_player, new_player))

old_sword = """    const angle = Math.atan2(target.node.y - this.player.y, target.node.x - this.player.x);
    const blade = this.add.rectangle(10, 0, 30, 6, 0xf6edd5).setStrokeStyle(1, 0x6b6e65);
    const tip = this.add.triangle(30, 0, 0, -6, 12, 0, 0, 6, 0xf6edd5).setStrokeStyle(1, 0x6b6e65);
    const guard = this.add.rectangle(-7, 0, 5, 16, 0xb89b62);
    const hilt = this.add.rectangle(-14, 0, 12, 5, 0x6d4c35);
    const sword = this.add.container(this.player.x, this.player.y, [blade, tip, guard, hilt])
      .setRotation(angle)
      .setDepth(18)
      .setScale(this.profile.realm === 2 ? 1.06 : 0.92);
"""
new_sword = """    const angle = Math.atan2(target.node.y - this.player.y, target.node.x - this.player.x);
    const sword = createFlyingSwordVisual(
      this,
      this.player.x,
      this.player.y,
      this.profile.realm,
    )
      .setRotation(angle)
      .setScale(this.profile.realm === 2 ? 1.08 : 0.94);
"""
repls.append((old_sword, new_sword))

old_enemy = """    const node = this.add.circle(
      clampedX,
      clampedY,
      kind === 'charger' ? 35 : 31,
      trial ? 0x77564d : this.enemyColor(kind),
    ).setStrokeStyle(trial ? 5 : 3, trial ? 0xd7b36d : 0x332f2a).setDepth(9);
    const hp = Math.max(1, Math.ceil(cfg.hp * hpMultiplier));
    this.enemies.push({
      kind,
      node,
"""
new_enemy = """    const node = this.add.circle(
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
"""
repls.append((old_enemy, new_enemy))

repls.append((
"    enemy.hp -= damage;\n    enemy.node.setScale(1.17);\n    this.tweens.add({ targets: enemy.node, scale: 1, duration: 120 });",
"    enemy.hp -= damage;\n    enemy.visual.setScale(1.14);\n    this.tweens.add({ targets: enemy.visual, scale: 1, duration: 120 });"
))

repls.append((
"    if (!enemy.node.active) return;\n    enemy.node.destroy();\n\n    if (this.breakthroughTrialActive)",
"    if (!enemy.node.active) return;\n    enemy.visual.destroy(true);\n    enemy.node.destroy();\n\n    if (this.breakthroughTrialActive)"
))

old_clear = """  private clearEnemies(): void {
    for (const enemy of this.enemies) {
      if (enemy.node.active) enemy.node.destroy();
    }
    this.enemies = [];
  }
"""
new_clear = """  private clearEnemies(): void {
    for (const enemy of this.enemies) {
      if (enemy.visual.active) enemy.visual.destroy(true);
      if (enemy.node.active) enemy.node.destroy();
    }
    this.enemies = [];
  }
"""
repls.append((old_clear, new_clear))

repls.append((
"      this.updateEnemies(time, delta);\n      this.updateAutoAttack(time);",
"      this.updateEnemies(time, delta);\n      this.syncEnemyVisuals();\n      this.updateAutoAttack(time);"
))

old_sync = """  private syncPlayerPresentation(): void {
    const label = this.children.getByName('playerLabel') as Phaser.GameObjects.Text | null;
    label?.setPosition(this.player.x, this.player.y);
  }
"""
new_sync = """  private syncPlayerPresentation(): void {
    this.playerVisual.setPosition(this.player.x, this.player.y);
    const invulnerable = this.time.now < this.invulnerableUntil;
    this.playerVisual.setAlpha(this.dead ? 0.35 : invulnerable ? 0.78 : 1);
  }

  private syncEnemyVisuals(): void {
    for (const enemy of this.enemies) {
      if (!enemy.node.active || !enemy.visual.active) continue;
      enemy.visual.setPosition(enemy.node.x, enemy.node.y);
    }
  }
"""
repls.append((old_sync, new_sync))

repls.append((
"    this.player.setAlpha(0.35);\n    this.statusText.setText('Trọng thương... đang hồi phục');",
"    this.player.setAlpha(0.35);\n    this.playerVisual.setAlpha(0.35);\n    this.statusText.setText('Trọng thương... đang hồi phục');"
))

repls.append((
"    this.player.setPosition(this.respawnX, this.respawnY).setAlpha(1);\n    this.nextAttackAt",
"    this.player.setPosition(this.respawnX, this.respawnY).setAlpha(1);\n    this.playerVisual.setPosition(this.respawnX, this.respawnY).setAlpha(1);\n    this.nextAttackAt"
))

for old, new in repls:
    count = s.count(old)
    if count != 1:
        raise SystemExit(f'expected exactly one match, got {count}: {old[:100]!r}')
    s = s.replace(old, new)

p.write_text(s)
