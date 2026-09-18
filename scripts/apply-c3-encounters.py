from pathlib import Path

path = Path('src/scenes/GameScene.ts')
text = path.read_text()

def replace(old: str, new: str) -> None:
    global text
    if old not in text:
        raise SystemExit(f'pattern not found:\n{old[:180]}')
    text = text.replace(old, new, 1)

replace(
"import { NPCS, type NpcDefinition } from '../game/npcConfig';\n",
"import { NPCS, type NpcDefinition } from '../game/npcConfig';\nimport { BOSS_GATE, ENCOUNTERS, WORLD_EVENTS, type EncounterDefinition, type WorldEventDefinition } from '../game/regionContentConfig';\n",
)

replace(
"  trial: boolean;\n}\n\ninterface FlyingSwordState",
"  trial: boolean;\n  encounterId: string | null;\n  damageMultiplier: number;\n}\n\ninterface FlyingSwordState",
)

replace(
"interface NpcState {\n  def: NpcDefinition;\n  node: Phaser.GameObjects.Container;\n}\n\ntype CombatButtonKey",
"interface NpcState {\n  def: NpcDefinition;\n  node: Phaser.GameObjects.Container;\n}\n\ninterface WorldEventState {\n  def: WorldEventDefinition;\n  node: Phaser.GameObjects.Container;\n  triggered: boolean;\n}\n\ntype CombatButtonKey",
)

replace(
"  private dialogueHideAt = 0;\n",
"  private dialogueHideAt = 0;\n  private worldEvents: WorldEventState[] = [];\n",
)

replace(
"    this.createNpcs();\n    this.cameras.main.startFollow",
"    this.createNpcs();\n    this.createRegionContent();\n    this.cameras.main.startFollow",
)

replace(
"    this.createInteractionUi(width, height);\n    this.spawnEncounter();\n",
"    this.createInteractionUi(width, height);\n    this.spawnAllEncounters();\n",
)

replace(
"    this.refreshZoneHud();\n    this.updateNpcInteraction(time);\n",
"    this.refreshZoneHud();\n    this.updateNpcInteraction(time);\n    this.updateWorldEvents();\n",
)

needle = "  private createNpcs(): void {\n"
insert = """  private createRegionContent(): void {
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
    const label = this.add.text(0, 112, `${BOSS_GATE.name}\nCỔ MÔN • PHONG ẤN`, {
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

"""
text = text.replace(needle, insert + needle, 1)

old_spawn = """  private spawnEncounter(): void {
    this.clearFlyingSwords();
    this.clearEnemies();
    const { x, y } = WORLD.encounterCenter;
    this.spawnEnemy('melee', x - 190, y + 80);
    this.spawnEnemy('ranged', x + 145, y - 100);
    this.spawnEnemy('charger', x + 240, y + 155);
  }
"""
new_spawn = """  private spawnAllEncounters(): void {
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
"""
replace(old_spawn, new_spawn)

replace(
"  private spawnEnemy(kind: EnemyKind, x: number, y: number, trial = false): void {\n",
"  private spawnEnemy(\n    kind: EnemyKind,\n    x: number,\n    y: number,\n    trial = false,\n    encounterId: string | null = null,\n    hpMultiplier = 1,\n    damageMultiplier = 1,\n  ): void {\n",
)

replace(
"    const hp = cfg.hp;\n",
"    const hp = Math.max(1, Math.ceil(cfg.hp * hpMultiplier));\n",
)

replace(
"      chargeHit: false,\n      trial,\n    });\n",
"      chargeHit: false,\n      trial,\n      encounterId,\n      damageMultiplier,\n    });\n",
)

replace("this.damagePlayer(cfg.damage, enemy);", "this.damagePlayer(Math.max(1, Math.ceil(cfg.damage * enemy.damageMultiplier)), enemy);")
replace("this.damagePlayer(cfg.damage, enemy);", "this.damagePlayer(Math.max(1, Math.ceil(cfg.damage * enemy.damageMultiplier)), enemy);")
replace("this.damagePlayer(cfg.damage, enemy);", "this.damagePlayer(Math.max(1, Math.ceil(cfg.damage * enemy.damageMultiplier)), enemy);")

old_kill_tail = """    if (this.activeEnemyCount() === 0) {
      this.time.delayedCall(CULTIVATION.encounterRespawnMs, () => {
        if (!this.dead && !this.breakthroughTrialActive && this.activeEnemyCount() === 0) {
          this.spawnEncounter();
        }
      });
    }
"""
new_kill_tail = """    const encounterId = enemy.encounterId;
    if (encounterId && this.activeEncounterEnemyCount(encounterId) === 0) {
      this.time.delayedCall(CULTIVATION.encounterRespawnMs, () => {
        if (this.dead || this.breakthroughTrialActive || this.activeEncounterEnemyCount(encounterId) > 0) return;
        const encounter = ENCOUNTERS.find((entry) => entry.id === encounterId);
        if (encounter) this.spawnEncounterDefinition(encounter);
      });
    }
"""
replace(old_kill_tail, new_kill_tail)

replace("        this.spawnEncounter();\n", "        this.spawnAllEncounters();\n")
replace("    this.spawnEncounter();\n    this.refreshHud();\n", "    this.spawnAllEncounters();\n    this.refreshHud();\n")

path.write_text(text)
