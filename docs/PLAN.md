# Xianxia ARPG Development Plan

Version: 0.8
Status: C3.3 biome encounters + short events implemented on feature branch; CI/device validation next
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
- NPC interaction uses a contextual proximity button and does not add a combat button
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
Status: Implemented on feature branch; CI/device validation next

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

C3.3 phone acceptance questions:
- Does each biome now feel mechanically different rather than only visually different?
- Is the jump from Hoang Nguyên -> Linh Lâm -> U Minh Cốc noticeable without becoming unfair?
- Do encounter groups stay local instead of pulling across large travel distances?
- Are the three event markers readable enough to invite exploration on a phone screen?
- Does the U Minh Bi ambush feel surprising but survivable?
- Does reaching Phong Ấn Cổ Môn feel like a clear end-of-route objective?

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
Do biome-specific fights and compact exploration events turn the enlarged continuous map into a meaningful journey with a readable danger gradient toward the future boss gate?

## Working assumptions
- Placeholder geometry remains intentional through C3.
- World route is authored rather than procedural for MVP.
- Combat remains manually simulated until feel stabilizes.
- Merchant economy stays deferred until the exploration/combat route proves fun enough to justify another progression layer.
- C2 breakthrough may be started anywhere; its trial temporarily overrides settlement safety and restores authored biome encounters afterward.
- C3.3 events are one-time per current run; persistence comes with the save/resume milestone.
- Tuning should follow phone evidence rather than desktop feel.

## Out of scope until MVP proves itself
Large procedural worlds, sect simulation, deep relationships, large crafting trees, online accounts, multiplayer, monetization, many realms, and content multiplication before the core loop is fun.
