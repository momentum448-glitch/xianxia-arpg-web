# Thanh Vân Thôn — Illustrated World Hybrid Architecture

Status: DESIGN LOCKED
Owner: DESIGN / DECISION chat
Date: 2026-09-24
Applies to: Thanh Vân Thôn production environment after Terrain Proof V2

## 1. Why this architecture exists

Terrain Proof V2 improved painterly continuity, but the project now deliberately shifts from "many independent environment sprites trying to look like one painting" toward an **Illustrated World Hybrid**.

Goal:

- retain the visual coherence of a single authored whole-map illustration;
- keep gameplay objects, collision, occlusion and future animation under runtime control;
- avoid flattening the entire game into one image that always renders behind the player;
- preserve the accepted A1 settlement topology and gameplay logic.

The whole-map illustration is therefore a **master art target / baked terrain source**, not a mandate to bake every house/tree/NPC into one immutable background.

## 2. Visual north-star

Asset ID: `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V2`

Role: primary visual/composition target for the Illustrated World Hybrid direction.

Durable source:

```text
/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v002.png
Drive file ID: 1DSycLIlv2Y1prvkcvhElOs_Apc12dd4A
```

This supersedes V1 as the preferred visual target.

Use it for:

- terrain material language;
- village-edge density;
- creek/pond integration;
- rural field / vegetation rhythm;
- painterly color and atmosphere;
- sense that Thanh Vân Thôn is one complete place.

Do **not** copy its exact pixel geometry when that conflicts with the accepted A1 runtime topology or gameplay readability.

## 3. Locked world-layer architecture

### Layer 0 — Baked terrain plate

Bake into the whole-map terrain/background plate:

- earth / soil;
- main and secondary worn paths;
- creek / water surface;
- rice-field / cultivation ground;
- low grass and weeds;
- tiny rocks / pebbles;
- low ground shadows;
- distant/off-playable decorative trees;
- distant non-interactive scenery;
- subtle terrain-edge framing.

The baked plate must visually feel like one continuous painting.

### Layer 1 — Static world objects

Keep important near-player objects separate:

- major houses / buildings;
- large trees near the route;
- bridges;
- large rocks with meaningful collision;
- important fences / gates;
- functional props that may need depth sorting or future interaction.

These objects may still visually match the baked painting, but they remain independent game objects.

### Layer 2 — Invisible collision

Collision is independent from art pixels.

Use simple ground-footprint colliders:

- house: collision follows the ground footprint, not the whole roof silhouette;
- tree: collision around trunk/base, not canopy;
- rock: collision around the grounded lower mass;
- fence: narrow segment/capsule/rect following the fence;
- water: simplified inset polygon following the creek/pond body.

Do not trace every pixel or decorative edge.

### Layer 3 — Dynamic world

Always separate:

- player;
- NPCs;
- enemies;
- loot;
- projectiles;
- gameplay interactables;
- quest state objects.

### Layer 4 — Foreground occlusion

Use foreground cutouts / depth-sorted parts only where they materially improve spatial believability:

- tree canopy;
- roof / eave;
- gate top;
- tall vegetation;
- large hanging props.

The player must be able to pass visually **behind** selected trees/buildings without always drawing on top.

### Layer 5 — Environmental VFX

Future-capable layer:

- wind;
- leaf particles;
- water shimmer/splash;
- fog;
- subtle lighting;
- dust.

Do not block the foundation proof on these effects.

### Layer 6 — UI / QC

Preserve current production UI and QC controls.

## 4. Tree rule

### Trees that may be baked

Bake only when they are:

- far from reachable space;
- outside practical traversal;
- purely decorative;
- never expected to animate or occlude the player.

### Trees that must remain separate

Keep separate when they are:

- near roads / houses / creek;
- reachable by the player;
- expected to hide part of the player;
- candidates for future wind animation.

Preferred tree structure:

```text
TREE_BASE / trunk
TREE_CANOPY / foreground-capable top
COLLIDER / small trunk footprint
```

Initial wind animation can later be extremely cheap:

- canopy rotation roughly ±0.7°;
- x drift roughly ±1 px;
- 2.5–4 s yoyo;
- optional shader distortion later.

Do not bake important animated trees into the terrain plate.

## 5. Building rule

Major houses/buildings stay separate from the baked terrain plate.

Reason:

- clean collision footprints;
- easier occlusion;
- future door / quest / lighting changes;
- layout remains adjustable without repainting the entire terrain.

Where needed, split visual depth:

```text
background ground/small shadow
building base / main sprite
player/NPC
roof/eave foreground cutout
```

Do not use the entire building silhouette as collision.

## 6. Water rule

Water is a visual terrain layer plus independent collision geometry.

Locked behavior:

- pond and creek are **blocked by default**;
- crossing is allowed only at authored crossings;
- use a **bridge plus 1–2 shallow ford / stepping-stone crossings** where composition supports it;
- first implementation does not add water slowdown, splash physics or new combat behavior.

Collision rule:

- water collider is inset slightly from the visible bank;
- avoid pixel-perfect shoreline tracing;
- bridge/ford areas create explicit walkable gaps/crossings.
- **Bridge crossing representation rule:** prefer continuous blocked water plus an explicit narrow walkable corridor aligned to the visible bridge deck. Do not represent a bridge by leaving a broad accidental hole between water polygons, because adjacent visible water can become walkable.

## 7. Occlusion rule

The player should not always render on top of the environment.

Use:

1. Y-depth sorting for separate near objects where sufficient;
2. foreground canopy/roof cutouts when a single sprite cannot produce convincing front/back overlap.

Avoid:

- a huge hand-painted mask covering the whole map;
- per-pixel occlusion systems;
- unnecessary foreground extraction for tiny props.

Only split the 10–20 objects that materially benefit from it.

## 8. What is locked from previous work

Preserve:

- V2-A / A1 compact village topology;
- Elder / Merchant / Healer functional pocket positions unless a later concrete gameplay issue forces change;
- portrait mobile readability;
- existing gameplay route logic;
- current combat/hitbox/timing;
- NPC interaction semantics;
- accepted visual identity of existing production buildings/pockets where compatible;
- QC zoom and UI-hide controls.

Do not reopen topology merely because the visual production method changed.

## 9. What is superseded

The previous assumption that the final settlement should remain primarily a modular sprite collage is superseded.

Terrain Proof V2 remains useful evidence for:

- painterly terrain direction;
- muted creek idea;
- scale/readability lessons.

But do not continue polishing V2 as the final architecture.

## 10. Production sequence

### Proof A — Baked Terrain Plate V1

Question:

> Can a single painterly terrain/background plate make the accepted A1 village read close to the V2 visual north-star while existing major objects remain separate?

Work scope:

- produce one 1600 × 1800-aligned terrain plate;
- bake only Layer-0 content;
- preserve major houses, near trees, bridges, NPCs and gameplay objects as separate runtime objects;
- do not add new collision yet;
- integrate reversibly behind the current static/dynamic objects;
- build/deploy and return Phone QC.

PASS gate:

- at 0.5x hidden UI, map reads as one authored rural landscape;
- no obvious seams/stamps/flat-paper gaps;
- terrain/creek/fields approach north-star V2 mood;
- existing houses/pockets no longer feel pasted onto an unrelated floor;
- no major baked object duplicates a separate runtime object;
- mobile performance and rendering remain stable.

### Proof B — Collision Foundation

Proof B is deliberately split so the new movement/collision architecture is proven in one compact zone before map-wide rollout.

#### Proof B1 — Healer-pocket collision foundation

Question:

> Can the current manually-moved player collide naturally with grounded world geometry, including water and the existing bridge, without changing combat feel or creating invisible-box frustration?

Scope:

- Healer house ground footprint;
- one reachable near-player tree trunk/base;
- one representative fence segment if it intersects plausible player movement;
- Healer pond / adjacent creek water as simplified blocked geometry;
- the existing wooden bridge as the authored walkable crossing through the blocked water.

Implementation constraints:

- current player movement is direct coordinate movement in `GameScene.updatePlayer`, not Phaser Arcade/Matter physics;
- keep the proof minimal: add a collision resolver around candidate player movement rather than migrating the project to a new physics engine;
- use a small foot-centered player collision shape, not the full 58 × 78 visual/control rectangle;
- resolve movement so the player can slide along walls/banks rather than sticking on every diagonal contact;
- prevent high-speed dodge tunneling through thin obstacles using movement substeps, swept checks, or an equivalent minimal method;
- collision geometry follows grounded footprints and slightly inset water banks, not roof/canopy/art silhouettes;
- do not add occlusion, tree motion, new water VFX, damage, slowdown or combat changes.

B1 PASS gate:

- house walls/base block movement while the entrance approach remains reachable;
- tree blocks only at trunk/base, not the canopy footprint;
- representative fence does not allow obvious pass-through and does not create sticky corner behavior;
- pond/creek cannot be entered at blocked banks;
- bridge can be crossed in both directions without invisible snags;
- the player cannot step sideways from the visible bridge deck onto adjacent visible water;
- normal diagonal movement and dodge do not tunnel through obstacles;
- Healer NPC remains reachable and interaction still triggers normally;
- no A1 topology, art, NPC, combat timing or interaction-radius regression.

#### Proof B2A — Static settlement collision expansion

Only after B1 Phone PASS:

- apply the proven grounded-collider pattern to required Elder / Merchant / southern-pocket buildings;
- add reachable near-player tree trunk/base collision;
- add only visually substantial large grounded props and functional fences;
- preserve accepted Healer B1 water/bridge collision;
- do not expand creek water, add crossings, occlusion or tree motion yet;
- Phone QC the full settlement route.

#### Proof B2B1 — Full-creek collision

Only after B2A Phone PASS:

- extend blocked water across the authored creek outside the Healer B1 pocket;
- preserve the accepted Healer bridge as the only crossing in this proof;
- verify that the accepted route remains connected before implementation;
- do not add invisible ford gaps or new crossing art;
- if route connectivity requires a new visual crossing, return to design rather than inventing one;
- Phone QC water blocking / bank feel / route connectivity.

#### Proof B2B2 — One authored crossing

Only after B2B1 Phone PASS:

- choose one useful non-bridge crossing from actual route/composition evidence;
- add one visually authored ford / stepping-stone crossing;
- make only that clearly visible crossing walkable through the blocked creek;
- Phone QC before deciding whether a second crossing is actually needed;
- do not add a second crossing merely to satisfy a nominal count.

### Proof C — Occlusion + tree motion

Only after Proof B1 + B2A + B2B1 + B2B2 collision foundation passes:

- prove one near-road tree with trunk collision + canopy occlusion;
- prove one building roof/eave occlusion case;
- add minimal tree sway to one test tree;
- Phone QC before expanding.

### Proof D — Expansion / polish

After A–C pass:

- apply occlusion and collision patterns to required objects;
- add restrained wind/water VFX;
- refine southern agricultural fringe and village edge as needed.

## 11. Work guardrails

Work may VERIFY technical details but must not silently change the locked architecture.

If Work cannot produce or recover a suitable painterly terrain source that respects the north-star and A1 layout, return `RETURN_TO_DESIGN` rather than substituting geometric SVG blobs or generic procedural noise.

Do not:

- bake NPCs;
- bake near-player animated trees;
- bake all major buildings;
- use full visual silhouettes as collision;
- let the player walk across all water;
- add new gameplay mechanics during the art architecture proof;
- recreate the old scatter-prop cohesion strategy.

## 12. Immediate next action

Proof A and NPC Re-block A are Phone PASS.

Transfer to Work as `READY_FOR_WORK` for **Proof B1 — Healer-pocket collision foundation only**.

Work must deploy B1 and return:

- QC link;
- build ID;
- exact code/data paths for the collision implementation;
- a short self-check result;
- the exact ordered Phone-QC checklist from `HANDOFF_CURRENT.md`.

B1/B1.1 and B2A/B2A.1 are now Phone PASS. Next execute B2B1 full-creek collision only. B2B2 crossing art and Proof C remain gated.
