# C4.2 Art Production Checkpoint

Version: 1.0
Status: Direction locked before asset production

## Purpose
This document is the durable source of truth for the C4.2 art correction pass. Chat is used to explore and decide. The repository records the decisions that production must follow.

## Locked visual direction
- 2D xianxia presentation with a visual feel broadly comparable to the restrained, painterly cultivation-game space represented by Tale of Immortal / 鬼谷八荒, while keeping all characters, creatures, environments, UI, writing and assets original.
- Camera remains the current top-down, slightly angled presentation.
- Art should balance beauty with combat readability on a portrait phone screen.
- Anime influence: moderate. Characters can be elegant and stylized, but the game should not read as a generic high-anime title.
- Overall mood: subdued ancient-fantasy palette built from earth, ink and jade.
- Player fantasy: cool, restrained sword cultivator.
- Enemy families: a mix of mutated beasts and corrupted spirits / shadow entities.
- NPCs: clearly individualized at gameplay distance, but not final-polish portrait quality.
- Actor detail target: balanced. Enough costume and form detail to feel authored, while remaining readable at mobile scale.

## Asset sourcing strategy
Hybrid, original-first.

### Authored/original assets are required for
- male player
- female player
- three normal enemy archetypes
- key NPCs
- flying sword
- core combat VFX
- cultivation / breakthrough VFX
- hero environment landmarks

### Supporting assets may use library/procedural sources when useful
- minor grass/stone/ground scatter
- subtle texture overlays
- secondary decorative props

Any library asset must be license-safe, stylistically compatible and recolored/processed when necessary so the game does not look like a collage of packs.

## C4.2 quality target
"Pretty enough to feel like a real game and support serious playtesting, but not final polish."

The pass must stop once it achieves:
1. no longer visibly developer-placeholder quality;
2. strong xianxia identity;
3. clear combat readability;
4. enough visual cohesion for later gameplay/balance tuning to be meaningful.

## C4.2 visual scope
Included:
- player art correction
- enemy art correction
- flying-sword art and core VFX
- NPC art pass
- environment palette correction
- limited authored environment sample/kit
- minimum viable animation

Deferred:
- final UI/icon polish
- final boss art
- large animation libraries
- detailed facial animation
- full 8-direction animation sets
- final cinematic effects

## Animation strategy
Hybrid animation.

### Direction count
Four directions: up, down, left, right.

### Player minimum viable animation
- idle
- run
- dodge
- equipped skill action

### Enemy minimum viable animation
Each archetype must have a distinct movement/attack language rather than sharing a generic set.

Melee:
- idle
- move
- attack tell / strike cue

Ranged:
- idle
- move
- cast / fire tell

Charger:
- idle
- move
- wind-up
- charge

### NPC animation
- restrained idle motion only in this pass

### Flying sword / combat VFX
- launch
- trail
- impact
- dodge afterimage
- skill accent
- trial / breakthrough aura

Routine locomotion should favor efficient cutout/bone-style motion. Important combat actions can use bespoke frame changes and VFX so they do not look like paper-doll puppetry.

## Character direction
### Male player
- cool sword cultivator
- compact, clean silhouette
- restrained robe layering
- controlled hair / topknot rhythm
- elegant rather than bulky

### Female player
- same combat readability and power profile as male
- elegant sword cultivator silhouette
- controlled robe and hair motion
- avoid overly decorative "dress-up" treatment that hurts gameplay readability

## Enemy direction
### Melee
Physical beast-corruption emphasis. Low aggressive center of mass, broad forward pressure, claws/horns or corrupted anatomy.

### Ranged
Spirit/shadow emphasis. Narrower vertical silhouette with clear casting focus such as talisman, orb, hand-sign or spirit flame.

### Charger
Beast + demonic-spirit hybrid. Heavy front mass and a wind-up silhouette that communicates impact before the charge begins.

## NPC direction
### Mặc Trưởng Lão
Reserved elder cultivator. Calm authority, reduced saturation, immediately readable as a mentor figure.

### Thanh Dược Sư
Cleaner and slightly lighter value structure, medicinal cues, calm restorative identity.

### Lục Chưởng Quầy
Practical merchant silhouette, more grounded fabrics and accessories, clearly non-combat.

## Environment palette targets
### Thanh Vân Thôn
Warm earth, old timber, quiet gray-green accents, clean negative space.

### Thanh Vân Hoang Nguyên
Dry earth, faded grass, muted ochre dust, sparse visual rhythm.

### Linh Lâm
Moss, dark jade, layered desaturated greens, denser vertical forms.

### U Minh Cốc
Cool gray-violet, dead jade, broken stone, shadowed spirit accents.

## First art test pack
Production begins with a small approval pack before scaling.

Actors:
- male player
- female player
- melee enemy
- ranged enemy
- charger enemy
- one NPC representative

Combat:
- flying sword
- sword trail
- sword impact
- skill accent
- dodge afterimage

Environment:
- one compact environment sample combining ground, vegetation/stone and one authored landmark treatment

## Approval order
1. Lock player and enemy visual language.
2. Lock core palette and value contrast at phone scale.
3. Verify minimum viable animation reads in the current camera.
4. Integrate the accepted test pack into the game.
5. Only then expand the asset family to all NPC/environment variants.

## Known gameplay debt intentionally not solved by this pass
- enemies currently connect hits too rarely, so challenge is low;
- enemy placement feels too regular and encounter-like.

These remain recorded for the gameplay-tuning pass after C4.2 readability stabilizes.
