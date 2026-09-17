# Xianxia ARPG Development Plan

Version: 0.5
Status: C2 cultivation skeleton implemented on feature branch, CI validation next
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
- Auto basic attack is represented as exactly one visible flying sword per attack cycle
- Flying sword uses light homing to follow the locked target, then deals damage on contact
- Right thumb has only 2 combat buttons: one equipped Skill + Dodge
- The Skill button represents the currently equipped active technique, not multiple simultaneous skill buttons
- Male/female player choice at start
- Shared combat profile and timing schema for both identities
- 2 cultivation realms in MVP, with meaningful breakthrough moments
- Breakthrough requires spirit/progress + materials + a short trial
- C2 first breakthrough: 50 Linh Khí + 3 Tinh Hoa -> defeat 3 Kiếp Ảnh -> Trúc Cơ
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
- multiple techniques may exist as progression/build choices, but only one active skill button is exposed during combat
- 1 continuous region
- 2–3 NPCs
- 3–5 short random events
- 2 realms and a compact material set

## Milestones
### C0 — Vertical foundation
Status: Complete, CI validated

- responsive 9:16 shell
- male/female select
- touch joystick
- auto basic attack nearest target
- initial combat HUD shell
- CI build validation

### C1 — Combat foundation
Status: Complete enough for continued mobile QC

Implemented:
- dodge state + i-frames + cooldown
- one visible equipped Skill button, currently mapped to frontal Cleave
- melee/ranged/charger enemy roles with distinct behaviors
- telegraphs for melee strike, ranged shot and charger wind-up
- player HP, damage, temporary invulnerability, death and respawn
- cooldown readout directly on portrait combat buttons
- auto basic attack rendered as one visible flying sword with light homing, trail, travel time and impact damage
- GitHub Pages mobile playtest deployment

Control rule:
- lower-left: movement joystick
- lower-right: Dodge + Skill only
- basic attack: automatic flying sword
- no extra combat buttons may be added without revisiting this locked UX decision

Flying-sword rule:
- one sword per basic-attack cycle
- locks the nearest valid enemy at launch
- turns gradually toward that target instead of snapping instantly
- damage occurs only on contact, not at launch
- no multi-target piercing in C1

### C2 — Cultivation skeleton
Status: Implemented on feature branch, CI/device validation next

Implemented:
- Linh Khí progression resource
- Tinh Hoa breakthrough material
- repeated encounter waves so progression can be earned without intentional death/reset
- realm state: Luyện Khí -> Trúc Cơ
- first breakthrough requirement: 50 Linh Khí + 3 Tinh Hoa
- breakthrough CTA appears in the upper-center progression HUD, not in the right-thumb combat controls
- short breakthrough trial: defeat 3 visually marked Kiếp Ảnh
- death during the trial cancels the attempt but does not consume materials in the prototype
- successful breakthrough consumes 3 Tinh Hoa and resets Linh Khí for the new realm
- meaningful power jump on Trúc Cơ:
  - max HP 8 -> 10
  - flying sword damage 1 -> 2
  - Trảm Kích damage 2 -> 3
  - stronger flying-sword visual trail
- cultivation tuning centralized in `src/game/cultivationConfig.ts`
- hidden legacy skill cooldown state removed so code now matches the locked one-Skill HUD

C2 acceptance questions:
- Is one normal three-enemy wave enough setup before the first breakthrough, or does it arrive too quickly?
- Does the breakthrough CTA feel like progression rather than another combat button?
- Is the 3-enemy trial readable and satisfying on a phone?
- Is the Trúc Cơ power increase immediately noticeable through damage, HP, and VFX?
- Should failed breakthroughs eventually consume a resource, or remain retry-friendly for MVP?

### C3 — Continuous map + NPC layer
Status: Planned

- settlement and danger gradient
- NPC interactions
- merchant/elder loop
- encounter regions
- short events

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
Can the player understand and enjoy this compact loop on a phone without opening a complex menu:

fight -> gain Linh Khí/Tinh Hoa -> meet requirements -> start breakthrough -> defeat Kiếp Ảnh -> visibly become stronger?

## Working assumptions
- Placeholder geometric visuals remain intentional through C2.
- Combat behavior is manually simulated rather than physics-driven until the core feel stabilizes.
- Tuning values are provisional and should change from phone playtest evidence rather than desktop feel alone.
- Cleave remains the temporary equipped Skill; later progression chooses which technique occupies the single Skill slot.
- Flying-sword art is procedural placeholder geometry until the art pass.
- C2 breakthrough failure is deliberately forgiving so QC focuses on clarity and feel rather than punishment balance.

## Out of scope until MVP proves itself
Large procedural worlds, sect simulation, deep relationships, large crafting trees, online accounts, multiplayer, monetization, many realms, and content multiplication before the core loop is fun.
