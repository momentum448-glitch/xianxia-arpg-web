# Xianxia ARPG Development Plan

Version: 1.0
Status: C4.2 production test pack in progress; Stage A player approved, Stage B melee active
Source of truth: this repository

## Product goal
Build an original mobile-first portrait browser ARPG inspired by the structure and progression rhythm of cultivation sandbox/action RPGs, without copying their IP, assets, writing, maps, or UI.

Target MVP session: 15–30 minutes.

Core loop:
explore -> fight -> collect spirit/resources -> interact/upgrade -> breakthrough -> enter dangerous zone -> boss.

## Locked decisions
- Mobile browser first, portrait 9:16
- Real-time top-down action combat
- One continuous open-map-lite region
- Dense route: settlement -> wilderness -> forest -> danger zone -> boss
- Virtual joystick lower-left
- Basic attack is manual via a dedicated `ATK` button and targets the nearest valid enemy in range
- Basic attack range resolves through a profile-derived stat: base 205 + build bonus, so future equipment/cultivation/talent paths can extend range
- Each `ATK` press launches exactly one visible flying sword when a valid target is available
- Flying sword uses light homing and deals damage on contact
- Right thumb combat cluster has 3 buttons: `ATK` + one equipped Skill + Dodge
- `ATK` is the largest central combat button; Skill and Dodge are smaller satellite buttons
- Manual basic attack base cooldown is 800 ms and resolves through an attack-speed build stat
- Pressing `ATK` without a target still launches a straight flying sword capped by current basic-attack range
- NPC interaction uses a contextual proximity button and does not add a combat button
- Male/female player choice at start
- Character select shows both character previews, selected-card highlight, short identity copy, and explicit start confirmation
- 2 cultivation realms in MVP with meaningful breakthrough moments
- Breakthrough requires spirit/progress + materials + a short trial
- First breakthrough: 50 Linh Khí + 3 Tinh Hoa -> defeat 3 Kiếp Ảnh -> Trúc Cơ
- 2–3 NPCs, merchant/elder function, 3–5 short events
- Single-player, local/offline save for MVP
- Original 2D xianxia art with restrained ink-wash influence
- Public GitHub repository

## Technology
- Phaser 3.90
- TypeScript 5.9
- Vite 7.1
- GitHub Actions for build validation
- GitHub Pages for phone playtest

## MVP content budget
- 2 selectable player visuals: male/female
- 3 normal enemy archetypes
- 1 boss
- 1 equipped active skill slot + dodge + manual flying-sword basic attack
- 1 continuous region
- 2–3 NPCs
- 3–5 short random events
- 2 realms and a compact material set

## Milestones
### C0 — Vertical foundation
Status: Complete

- responsive 9:16 shell
- male/female select
- touch joystick
- basic HUD and CI validation

### C1 — Combat foundation
Status: Complete enough for continued mobile QC

Implemented:
- flying-sword basic attack with travel time, light homing and impact damage
- one equipped Skill button, currently Trảm Kích
- Dodge with i-frames
- melee/ranged/charger enemy roles and telegraphs
- HP, damage, death and respawn
- original right-thumb UX at C1: Skill + Dodge only; superseded during C4.2 by manual `ATK` control

### C2 — Cultivation skeleton
Status: Complete and phone-QC passed for the core loop

Implemented:
- Linh Khí + Tinh Hoa progression
- repeat encounter waves
- Luyện Khí -> Trúc Cơ
- 50 Linh Khí + 3 Tinh Hoa breakthrough gate
- 3 Kiếp Ảnh breakthrough trial
- Trúc Cơ power jump: HP 8 -> 10, flying sword 1 -> 2 damage, Trảm Kích 2 -> 3 damage
- breakthrough runtime freeze hotfix: projectile cleanup is re-entrancy safe when the third Kiếp Ảnh dies

### C3 — Continuous map + NPC layer
Status: Structurally complete; gameplay tuning debt recorded for later pass

#### C3.1 — Continuous world shell
Status: Complete and phone-QC passed

Implemented:
- expanded 1600 x 9000 world with camera follow
- portrait-first vertical route across four continuous zones:
  - Thanh Vân Thôn
  - Thanh Vân Hoang Nguyên
  - Linh Lâm
  - U Minh Cốc
- screen-space HUD/joystick/Skill/Dodge remain fixed while the world scrolls
- safe settlement boundary; normal enemies cannot enter or damage the player inside the settlement
- distance-based aggro so enemies do not march to the village gate before the player approaches
- breakthrough trial spawns around the player's current world position and remains an explicit exception to settlement safety
- placeholder houses, road, forest and danger-zone landmarks establish navigation before the art pass
- world layout tuning centralized in `src/game/worldConfig.ts`
- phone feedback accepted after world scale and biome travel distances were expanded

#### C3.2 — NPC interaction layer
Status: Complete and phone-QC passed

Implemented:
- three settlement NPCs defined in `src/game/npcConfig.ts`
- Mặc Trưởng Lão gives realm-aware breakthrough guidance and reports missing Linh Khí/Tinh Hoa
- Thanh Dược Sư restores the player to full HP inside the settlement
- Lục Chưởng Quầy establishes the merchant shell without introducing inventory/economy yet
- contextual `TƯƠNG TÁC` button appears only inside NPC proximity and disappears when leaving range
- dialogue overlay is screen-space UI and auto-dismisses
- NPC interaction is suppressed during death and breakthrough trials
- right-thumb combat UX remains exactly Skill + Dodge

#### C3.3 — Encounter regions + short events
Status: Structural phone-QC accepted; challenge/distribution tuning deferred

Implemented:
- biome encounter definitions centralized in `src/game/regionContentConfig.ts`
- Thanh Vân Hoang Nguyên encounter: 3 standard enemies
- Linh Lâm encounter: 4 enemies with moderately increased HP
- U Minh Cốc encounter: 5 enemies with the highest HP scaling and stronger heavy-hit pressure
- each authored encounter respawns independently after its own group is cleared
- ambient groups remain dormant until the player approaches, preserving travel pacing
- three one-time world events:
  - Linh Tuyền: restores up to 2 HP and grants 12 Linh Khí
  - Dược Thảo Ẩn: grants 1 Tinh Hoa
  - U Minh Bi: triggers a stronger three-enemy ambush
- event markers visibly dim after activation
- placeholder `Phong Ấn Cổ Môn` placed at the top of U Minh Cốc as the future boss gate
- combat controls, NPC interaction and breakthrough flow remain unchanged

Recorded phone feedback to revisit after C4 readability stabilizes:
- overall combat challenge is too low because normal enemies rarely connect hits against a moving player;
- enemy placement feels too regular and encounter-clustered across the long map;
- later tuning should improve pursuit/tracking, attack coverage, multi-enemy pressure and more organic patrol/ambush/resource-guard distributions.

### C4 — Art identity
Status: In progress

Art direction source of truth: `docs/ART_BIBLE.md`.
Art production/QC source of truth: `docs/ART_PRODUCTION_QC.md`.

#### C4.1 — Readable actor silhouette foundation
Status: Complete and merged

Implemented:
- male/female player rectangle replaced visually by an original layered xianxia silhouette while retaining the same invisible gameplay hitbox;
- melee/ranged/charger circular placeholders replaced visually by distinct authored role silhouettes while retaining existing hitboxes and combat timing;
- breakthrough trial enemies reuse role silhouettes with pale amber spiritual treatment;
- flying sword upgraded to a longer readable blade with guard, ridge and realm-sensitive qi aura;
- gameplay collision bodies remain separate from visuals so art QC does not contaminate C3 combat-balance evidence;
- `docs/ART_BIBLE.md` locks silhouette, palette, readability and future asset rules.

Phone result:
- role readability improved;
- visual quality still looked too much like dev art, triggering the C4.2 correction pass.

#### C4.2 — Production art correction + minimum viable animation
Status: In progress

Control revision during C4.2:
- auto basic attack removed at user request;
- dedicated `ATK` button fires one flying sword toward the nearest valid target in range;
- basic-attack cooldown remains 620 ms;
- Skill and Dodge behavior are unchanged.

Locked direction:
- 2D xianxia, ancient/ink-wash mood, moderate anime influence;
- muted earth, ink and jade palette;
- player = cool, elegant sword cultivator;
- enemies = mix of corrupted beasts and spectral/evil-spirit forms;
- environment = painterly but deliberately less dense for gameplay readability;
- VFX = pale white-jade, restrained, strongest at impact;
- hybrid animation pipeline, four directions;
- player minimum animation set: idle, run, dodge, skill;
- enemy minimum animation set: idle, move, attack tell.

Production-test sequence:
1. Male player isolated production asset — PASS
2. Melee enemy isolated production asset — ACTIVE
3. Flying sword + launch/trail/impact VFX
4. Settlement/plains environment sample
5. Minimum viable animation validation
6. In-game integration with current hitboxes/timing unchanged
7. Phone QC
8. Only after test pack passes: expand to female player, ranged, charger, NPCs and remaining biomes

Important rule:
- generated concept boards are reference only;
- an image is not a game-ready asset until it is isolated, technically usable, normalized, and validated in-game;
- every art generation step must end in PASS / REVISE / REJECT and an explicit next action.

#### C4.3 — VFX/UI finish
Status: Planned after C4.2 production test passes

- broader qi and breakthrough polish
- final enemy telegraph treatment
- boss gate art
- skill/item/cultivation icons
- phone readability pass under real combat density

### C5 — Full MVP loop
Status: Planned

- boss
- 15–30 minute pacing
- save/resume
- post-C4 combat challenge and encounter-distribution tuning
- mobile performance profiling
- device QC and go/revise decision

## Current validation question
Can the C4.2 production test pack make the game look like a coherent real product on a phone while preserving combat readability and the gameplay evidence already gathered in C3?

## Working assumptions
- World route is authored rather than procedural for MVP.
- Combat remains manually simulated until feel stabilizes.
- Merchant economy stays deferred until the exploration/combat route proves fun enough to justify another progression layer.
- C2 breakthrough may be started anywhere; its trial temporarily overrides settlement safety and restores authored biome encounters afterward.
- C3.3 events are one-time per current run; persistence comes with the save/resume milestone.
- Combat challenge and enemy-distribution feedback from C3.3 is deliberately deferred until C4 actor readability is stable.
- Tuning should follow phone evidence rather than desktop feel.

## Out of scope until MVP proves itself
Large procedural worlds, sect simulation, deep relationships, large crafting trees, online accounts, multiplayer, monetization, many realms, and content multiplication before the core loop is fun.
