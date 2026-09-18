# Xianxia ARPG Development Plan

Version: 0.6
Status: C3.1 continuous-world shell implemented on feature branch; CI/device validation next
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
- Auto basic attack chooses the nearest valid target in range
- Auto basic attack is exactly one visible flying sword per attack cycle
- Flying sword uses light homing and deals damage on contact
- Right thumb has only 2 combat buttons: one equipped Skill + Dodge
- Male/female player choice at start
- 2 cultivation realms in MVP with meaningful breakthrough moments
- Breakthrough requires spirit/progress + materials + a short trial
- First breakthrough: 50 Linh Khí + 3 Tinh Hoa -> defeat 3 Kiếp Ảnh -> Trúc Cơ
- 2–3 NPCs, merchant/elder function, 3–5 short events
- Single-player, local/offline save for MVP
- Original xianxia 2D/2.5D art with restrained ink-wash influence
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
- 1 equipped active skill slot + dodge + auto flying-sword basic attack
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
- auto flying-sword basic attack with travel time, light homing and impact damage
- one equipped Skill button, currently Trảm Kích
- Dodge with i-frames
- melee/ranged/charger enemy roles and telegraphs
- HP, damage, death and respawn
- locked right-thumb UX: Skill + Dodge only

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
Status: In progress

#### C3.1 — Continuous world shell
Status: Implemented on feature branch; CI/device validation next

Implemented:
- world larger than the viewport with camera follow
- portrait-first vertical route across four continuous zones:
  - Thanh Vân Thôn
  - Thanh Vân Hoang Nguyên
  - Linh Lâm
  - U Minh Cốc
- screen-space HUD/joystick/Skill/Dodge remain fixed while the world scrolls
- safe settlement boundary; normal enemies cannot enter or damage the player inside the settlement
- distance-based aggro so enemies do not march to the village gate before the player approaches
- current C2 encounter moved into the wilderness instead of spawning inside the starting screen
- breakthrough trial spawns around the player's current world position and remains an explicit exception to settlement safety
- placeholder houses, road, forest and danger-zone landmarks establish navigation before the art pass
- world layout tuning centralized in `src/game/worldConfig.ts`

C3.1 phone acceptance questions:
- Does camera follow feel stable while using the left joystick?
- Can the player immediately understand that the village is safe and that progression lies north/up the route?
- Do HUD and right-thumb controls remain visually fixed while traversing the world?
- Is the travel distance from village to first encounter long enough to feel like exploration but short enough to avoid dead walking?
- Can the player cross zone boundaries without visual/input glitches?

#### C3.2 — NPC interaction layer
Planned:
- Elder/guide interaction
- merchant shell
- one secondary NPC
- proximity interaction UI without adding combat buttons

#### C3.3 — Encounter regions + short events
Planned:
- biome-specific encounter anchors
- danger gradient by zone
- 3–5 compact random/event nodes
- route toward future boss gate

### C4 — Art identity
Status: Planned

- male/female player sprites
- enemy families and boss art
- environment kit
- ink-wash UI/VFX accents
- skill/item/cultivation icons
- replace geometric flying-sword placeholder with final xianxia sword art/VFX

### C5 — Full MVP loop
Status: Planned

- boss
- 15–30 minute pacing
- save/resume
- mobile performance profiling
- device QC and go/revise decision

## Current validation question
Does a continuous scrolling world make the existing combat/progression loop feel like a place to explore rather than a test arena, while keeping portrait controls readable and stable?

## Working assumptions
- Placeholder geometry remains intentional through C3.1.
- World route is authored rather than procedural for MVP.
- Combat remains manually simulated until feel stabilizes.
- C3.1 intentionally has only one normal encounter anchor; biome-specific encounter distribution comes in C3.3.
- C2 breakthrough may be started anywhere; its trial temporarily overrides settlement safety.
- Tuning should follow phone evidence rather than desktop feel.

## Out of scope until MVP proves itself
Large procedural worlds, sect simulation, deep relationships, large crafting trees, online accounts, multiplayer, monetization, many realms, and content multiplication before the core loop is fun.
