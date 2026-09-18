# C4 Art Production QC Loop

Version: 1.1
Status: Locked workflow for C4.2+

## Rule
No generated art output is considered complete by itself. Every art generation step must be tied to:
1. Purpose
2. QC criteria
3. Pass/fail decision
4. Explicit next step

A generated board or concept image is never treated as a game-ready asset unless it has been produced as an isolated asset with usable transparency, scale, framing and integration requirements.

## Standard loop

### 1. Generate
State what is being generated and why.

### 2. QC immediately
Always evaluate the generated result against the intended in-game use.

Minimum QC dimensions:
- art direction match
- silhouette/readability at phone scale
- consistency with accepted player/enemy/environment language
- animation suitability if the asset will be rigged/cut out
- contrast against its target biome
- VFX readability without obscuring telegraphs
- technical usability: isolation, transparency, crop, scale and pivot suitability

### 3. Decide
Every QC ends with one of:
- PASS: usable as the basis for production/integration
- REVISE: direction is right but one or more items need correction
- REJECT: do not integrate; regenerate from the accepted checkpoint

### 4. Continue
Every art result must end with the next concrete action.
Examples:
- concept PASS -> generate isolated production asset
- isolated asset PASS -> prepare animation layers / sprite frames
- animation PASS -> integrate in test scene
- in-game PASS -> expand to next actor or biome
- in-game REVISE -> change only the failing layer and retest

## C4.2 production test pack

### Accepted direction
- 2D xianxia art direction with a visual feel in the same broad family as cultivation RPGs such as Tale of Immortal, while keeping original characters, assets, world and UI.
- Moderate anime influence.
- Ancient Chinese / ink-wash mood, restrained rather than flashy.
- Muted earth, ink and jade palette.
- Main player vibe: cool, elegant sword cultivator.
- Enemies: mix of corrupted beasts and spectral/evil-spirit forms.
- Environment: painterly but deliberately less dense so combat remains legible.
- VFX: pale white-jade, bright mainly at impact moments.
- Detail level: balanced, not sparse and not overly ornate.

### Animation direction
- Hybrid pipeline.
- Four facing directions.
- Player minimum set: idle, run, dodge, skill.
- Enemy minimum set: idle, move, attack tell.
- Different enemy roles require distinct movement language.

## Current production-test sequence

### Stage A: Male player production asset
Deliverable:
- isolated player art suitable for transparent-background production
- body/clothing/hair/weapons composed so cutout animation remains possible

QC:
- clearly reads as a cool sword cultivator at phone scale
- more ancient/ink-wash than the earlier C4.1 procedural silhouette
- does not look over-detailed when reduced
- silhouette remains readable against settlement/plains values

Decision: PASS (2026-09-18 phone QC)

Accepted qualities:
- sword-cultivator identity reads clearly
- silhouette and robe language accepted
- production direction approved to continue

Next -> Stage B.

### Stage B: Melee enemy production asset
Status: Active

Deliverable:
- corrupted beast with physical mass plus evil-spirit cues

QC:
- instantly reads as melee pressure
- attack-tell posture can be exaggerated without changing base design
- strong contrast from player shape and value
- silhouette remains readable at gameplay scale without excessive ornament

Pass -> Stage C.
Revise -> regenerate melee only.

### Stage C: Flying sword + VFX production assets
Deliverable:
- isolated flying sword
- launch cue
- trail
- impact

QC:
- sword blade remains visible at gameplay speed
- VFX is pale white-jade and restrained
- impact may spike brightness briefly
- trail does not hide enemies or telegraphs

Pass -> Stage D.
Revise -> correct VFX only.

### Stage D: Settlement/plains environment sample
Deliverable:
- one small authored environment kit and test composition

QC:
- less clutter than the concept board
- clear walkable route and combat space
- player/enemy silhouettes remain readable without outlines doing all the work
- mood stays ancient, restrained and painterly

Pass -> Stage E.
Revise -> reduce clutter/value competition first.

### Stage E: In-game integration
Deliverable:
- production-test assets integrated into current mobile game build
- existing combat hitboxes/timing remain unchanged for this art test

Phone QC:
- player visual quality
- enemy recognition and attack-tell readability
- sword visibility during actual movement
- actor/background separation
- animation naturalness
- whether the game finally feels closer to a real product than a prototype

Pass -> expand to female player, ranged, charger, NPCs and remaining biomes.
Revise -> fix only the failing visual layer, then repeat in-game QC.

## Current status
Stage A male player asset: PASS.
Stage B melee enemy asset: ACTIVE.

The previous sprite-atlas-style board remains production reference only, not a usable sprite atlas.

Next action: generate and QC the isolated melee enemy production asset.
