from pathlib import Path

path = Path('src/scenes/GameScene.ts')
text = path.read_text()

old = "import { createPlayerProfile, type PlayerGender, type PlayerProfile } from '../game/playerProfile';\nimport { WORLD, isSettlementY, zoneAt, type WorldZoneId } from '../game/worldConfig';"
new = "import { NPCS, type NpcDefinition } from '../game/npcConfig';\nimport { createPlayerProfile, type PlayerGender, type PlayerProfile } from '../game/playerProfile';\nimport { WORLD, isSettlementY, zoneAt, type WorldZoneId } from '../game/worldConfig';"
assert old in text
text = text.replace(old, new, 1)

old = "interface FlyingSwordState {\n  node: Phaser.GameObjects.Container;\n  target: EnemyState;\n  angle: number;\n  expiresAt: number;\n  nextTrailAt: number;\n}\n\ntype CombatButtonKey = 'dodge' | 'skill';"
new = "interface FlyingSwordState {\n  node: Phaser.GameObjects.Container;\n  target: EnemyState;\n  angle: number;\n  expiresAt: number;\n  nextTrailAt: number;\n}\n\ninterface NpcState {\n  def: NpcDefinition;\n  node: Phaser.GameObjects.Container;\n}\n\ntype CombatButtonKey = 'dodge' | 'skill';"
assert old in text
text = text.replace(old, new, 1)

old = "  private cooldowns: Cooldowns = { dodge: 0, skill: 0 };\n  private buttonLabels: Partial<Record<CombatButtonKey, Phaser.GameObjects.Text>> = {};"
new = "  private cooldowns: Cooldowns = { dodge: 0, skill: 0 };\n  private buttonLabels: Partial<Record<CombatButtonKey, Phaser.GameObjects.Text>> = {};\n  private npcs: NpcState[] = [];\n  private nearestNpc: NpcState | null = null;\n  private interactionButton!: Phaser.GameObjects.Rectangle;\n  private interactionLabel!: Phaser.GameObjects.Text;\n  private dialoguePanel!: Phaser.GameObjects.Rectangle;\n  private dialogueText!: Phaser.GameObjects.Text;\n  private dialogueHideAt = 0;"
assert old in text
text = text.replace(old, new, 1)

old = "    this.add.text(this.player.x, this.player.y, this.profile.gender === 'male' ? 'NAM' : 'NỮ', {\n      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff', fontStyle: 'bold',\n    }).setOrigin(0.5).setName('playerLabel').setDepth(11);\n\n    this.cameras.main.startFollow(this.player, true, 0.11, 0.11);"
new = "    this.add.text(this.player.x, this.player.y, this.profile.gender === 'male' ? 'NAM' : 'NỮ', {\n      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff', fontStyle: 'bold',\n    }).setOrigin(0.5).setName('playerLabel').setDepth(11);\n\n    this.createNpcs();\n    this.cameras.main.startFollow(this.player, true, 0.11, 0.11);"
assert old in text
text = text.replace(old, new, 1)

old = "    this.createBreakthroughUi(width);\n    this.spawnEncounter();\n    this.createJoystick(125, height - 145);"
new = "    this.createBreakthroughUi(width);\n    this.createInteractionUi(width, height);\n    this.spawnEncounter();\n    this.createJoystick(125, height - 145);"
assert old in text
text = text.replace(old, new, 1)

old = "    this.syncPlayerPresentation();\n    this.refreshCooldownLabels(time);\n    this.refreshZoneHud();"
new = "    this.syncPlayerPresentation();\n    this.refreshCooldownLabels(time);\n    this.refreshZoneHud();\n    this.updateNpcInteraction(time);"
assert old in text
text = text.replace(old, new, 1)

marker = "  private createHud(width: number): void {"
assert marker in text
methods = r'''  private createNpcs(): void {
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

'''
text = text.replace(marker, methods + marker, 1)

path.write_text(text)
