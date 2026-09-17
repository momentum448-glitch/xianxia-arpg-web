# Xianxia ARPG Development Plan

Version: 0.3
Status: C1 combat foundation deployed for mobile QC
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
- Right thumb has only 2 combat buttons: one equipped Skill + Dodge
- The Skill button represents the currently equipped active technique, not multiple simultaneous skill buttons
- Male/female player choice at start
- Shared combat profile and timing schema for both identities
- 2 cultivation realms in MVP, with 1–2 breakthrough moments
- Breakthrough requires spirit/progress + materials + a short trial
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
- 1 equipped active skill slot + dodge + auto basic attack
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
Status: Core combat implemented and deployed; phone control QC in progress

Implemented:
- dodge state + i-frames + cooldown
- one visible equipped Skill button, currently mapped to frontal Cleave
- melee/ranged/charger enemy roles with distinct behaviors
- telegraphs for melee strike, ranged shot and charger wind-up
- player HP, damage, temporary invulnerability, death and respawn
- enemy defeat rewards spirit
- cooldown readout directly on portrait combat buttons
- combat tuning centralized in `src/game/combatConfig.ts`
- GitHub Pages mobile playtest deployment

Control rule:
- lower-left: movement joystick
- lower-right: Dodge + Skill only
- basic attack: automatic
- no extra combat buttons may be added without revisiting this locked UX decision

C1 acceptance questions:
- Can movement + auto attack + one active skill + dodge feel active enough rather than idle?
- Are two large right-thumb buttons comfortable and unambiguous on a real portrait phone?
- Does auto attack preserve enough agency when positioning and dodge timing matter?
- Are enemy telegraphs readable on a real portrait phone without visual overload?

### C2 — Cultivation skeleton
Status: Planned

- spirit/progression resource
- materials
- realm state
- breakthrough requirements
- breakthrough trial
- meaningful power jump
- technique/equipped-skill choice becomes part of progression rather than additional combat buttons

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

### C5 — Full MVP loop
Status: Planned

- boss
- 15–30 minute pacing
- save/resume
- mobile performance profiling
- device QC and go/revise decision

## Current validation question
Does portrait movement plus auto basic attack, one active Skill button and Dodge create enough tactical agency while keeping the right thumb simple?

## Working assumptions
- Placeholder geometric visuals remain intentional through C1.
- Combat behavior is manually simulated rather than physics-driven until the core feel stabilizes.
- Tuning values are provisional and should change from phone playtest evidence rather than desktop feel alone.
- Cleave is the temporary equipped skill for C1; the progression layer will later determine which technique occupies the single Skill slot.

## Out of scope until MVP proves itself
Large procedural worlds, sect simulation, deep relationships, large crafting trees, online accounts, multiplayer, monetization, many realms, and content multiplication before the core loop is fun.
