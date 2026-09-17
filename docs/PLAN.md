# Xianxia ARPG Development Plan

Version: 0.1
Status: C0 bootstrap in progress
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
- 3 active skills + dodge on the right
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
- GitHub Pages for phone playtest after Pages is enabled

## MVP content budget
- 2 selectable player visuals: male/female
- 3 normal enemy archetypes
- 1 boss
- 3 active skills + dodge + auto basic attack
- 1 continuous region
- 2–3 NPCs
- 3–5 short random events
- 2 realms and a compact material set

## Milestones
### C0 — Vertical foundation
- responsive 9:16 shell
- male/female select
- touch joystick
- auto basic attack nearest target
- placeholder 3-skill + dodge layout
- CI build validation

### C1 — Combat foundation
- dodge state + i-frames
- 3 active skill interfaces
- melee/ranged/charger enemy roles
- damage, telegraph, death and respawn
- portrait readability pass

### C2 — Cultivation skeleton
- spirit/progression resource
- materials
- realm state
- breakthrough requirements
- breakthrough trial
- meaningful power jump

### C3 — Continuous map + NPC layer
- settlement and danger gradient
- NPC interactions
- merchant/elder loop
- encounter regions
- short events

### C4 — Art identity
- male/female player sprites
- enemy families and boss art
- environment kit
- ink-wash UI/VFX accents
- skill/item/cultivation icons

### C5 — Full MVP loop
- boss
- 15–30 minute pacing
- save/resume
- mobile performance profiling
- device QC and go/revise decision

## Current validation question
Does portrait movement plus auto basic attack free enough thumb bandwidth for active skills and dodge while still feeling like an action RPG rather than an idle game?

## Out of scope until MVP proves itself
Large procedural worlds, sect simulation, deep relationships, large crafting trees, online accounts, multiplayer, monetization, many realms, and content multiplication before the core loop is fun.
