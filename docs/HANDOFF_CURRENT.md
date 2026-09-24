# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: NONE_WHILE_WAITING_QC
Return condition: user/DESIGN_CHAT performs quick Android Phone QC for NPC Re-block A and records PASS/REVISE. Collision Proof B remains blocked until that gate passes.

Snapshot: 2026-09-24
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified runtime main after NPC Re-block A: `7e8eff66ae5ff01733242fb3ac221f0b9f4645eb`
Latest functional terrain runtime lineage: PR #107 / `b1a4e9b076b521891c80100f22603d79443b934b`
Latest NPC placement runtime: PR #115 merged, branch `work/npc-reblock-a`.
Verified live NPC Re-block badge before this docs-only handoff sync: `BUILD 7e8eff6`.
CI run #35999392051 PASS; Pages run #35999455158 PASS.
Open relevant execution PR: none
Unrelated old open PR: #4
Runtime changes are complete. This docs-only handoff returns ownership for quick Phone QC.

## Current objective

NPC Re-block A is deployed and awaits quick Android Phone QC. Proof A — Baked Terrain Plate V1 is PHONE PASS; do not start Collision Proof B until the new NPC positions pass.

The user and DESIGN_CHAT deliberately changed the settlement production architecture after reviewing Terrain Proof V2 and a stronger whole-map visual target. The new architecture aims for the coherence of one illustrated village while preserving real game collision, occlusion, animation and dynamic actors.

## Locked visual target

### ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V2

- Status: `REFERENCE_ONLY`; current preferred visual north-star.
- Drive path: `/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v002.png`
- Drive file ID: `1DSycLIlv2Y1prvkcvhElOs_Apc12dd4A`
- Canonical architecture spec: `docs/environment/THANH_VAN_THON_ILLUSTRATED_WORLD_HYBRID.md`
- Use for terrain/material/atmosphere, stream-field integration and whole-map coherence.
- Do not treat the image as a pixel-perfect coordinate blueprint when it conflicts with accepted A1 topology.

V1 north-star remains historical only.

## Locked architecture — Illustrated World Hybrid

### Bake into Layer 0

- soil / earth;
- worn paths;
- creek / water surface;
- cultivation / field ground;
- low grass / weeds;
- tiny stones / pebbles;
- low ground shadows;
- distant or off-playable decorative trees/scenery.

### Keep separate as static runtime objects

- major houses / buildings;
- near-player trees;
- bridges;
- large collision-important rocks;
- functional fences / gates;
- any static prop that benefits from depth sorting, occlusion, animation or future interaction.

### Keep dynamic

- player;
- NPCs;
- enemies;
- loot;
- projectiles;
- gameplay interactables / quest objects.

### Collision philosophy

Collision is independent from art pixels.

- house: ground footprint, not roof silhouette;
- tree: trunk/base only, not canopy;
- rock: grounded lower mass;
- fence: narrow segment/rect/capsule;
- water: simplified inset polygon.

Do not trace decorative pixels.

### Occlusion philosophy

- prefer Y-depth sorting for separate near objects;
- use selective foreground canopy / roof / eave / gate-top cutouts where needed;
- do not build one huge per-pixel mask system;
- only split objects that materially improve player-in-world depth.

### Tree animation philosophy

- distant/off-playable trees may be baked;
- important near-player trees remain separate;
- future first wind proof may use subtle canopy sway (roughly ±0.7°, ±1 px, 2.5–4 s yoyo);
- do not block Proof A on animation/VFX.

### Water traversal philosophy

- pond and creek blocked by default;
- authored crossing through bridge plus 1–2 ford / stepping-stone crossings;
- water collision implementation is **not part of Proof A**;
- no new slowdown/splash/combat mechanics during the foundation proofs.

## Locked prior state that must survive

- portrait mobile 9:16;
- V2-A / A1 compact Thanh Vân Thôn topology;
- Elder / Merchant / Healer functional pocket positions;
- current route/gameplay semantics;
- manual `ATK + SKILL + NÉ`;
- combat hitboxes/timing;
- NPC interaction semantics;
- accepted house / Merchant / Healer / Field Edge visual identity where compatible;
- QC zoom `1.0 / 0.8 / 0.65 / 0.5` and `ẨN UI / HIỆN UI`.

Changing rendering architecture does **not** reopen topology.

## Existing Terrain V2

### ENV-SETTLEMENT-TERRAIN-UNDERLAY-V2

- Runtime: `public/assets/c4/environment/settlement/env_settlement_terrain_wholemap_v2.png`
- Integrated in PR #107.
- Runtime commit: `b1a4e9b076b521891c80100f22603d79443b934b`
- Technical gate: PASS.
- It demonstrated that painterly terrain is directionally better than V1 SVG.
- It was **not promoted to final Phone PASS** before the architecture pivot.
- Preserve as historical/visual evidence; do not keep polishing it as the final solution.

## Completed execution scope — Work Proof A only

Read:

1. `AGENTS.md`
2. `docs/DISCOVERY_DECISION_PROTOCOL.md`
3. this file
4. `docs/ASSET_REGISTRY.md`
5. `docs/PROJECT_SOURCES.md`
6. `docs/DECISION_LOG.md`
7. `docs/PROJECT_CONTEXT.md`
8. `docs/environment/THANH_VAN_THON_ILLUSTRATED_WORLD_HYBRID.md`

The delivery followed this scope:

1. Verify current `main`, relevant branch/PR state, latest commit and whether any prior operation partially succeeded.
2. Take execution ownership and create one focused branch.
3. Produce **Baked Terrain Plate V1**, aligned to the accepted 1600 × 1800 A1 settlement footprint.
4. Use `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V2` as the primary visual/material target.
5. Bake only Layer-0 scenery: terrain, path, creek surface, field/cultivation ground, low vegetation, tiny stones/shadows and distant/off-playable decorative scenery.
6. Keep major houses, near-player trees, bridges, NPCs and other collision/occlusion-critical objects out of the baked plate.
7. Do **not** implement new collision or occlusion yet.
8. Integrate the plate reversibly behind existing static/dynamic runtime objects.
9. Ensure no baked duplicate of a separate major object is visible.
10. Build, deploy and verify the real result.
11. Update `ASSET_REGISTRY`, `HANDOFF_CURRENT`, and affected source/decision records.
12. Return QC link + build ID + exact runtime asset path/metadata.
13. Stop. Do not start Collision Proof B until user/DESIGN_CHAT Phone-QC Proof A.

If a suitable painterly terrain source cannot be produced/recovered while respecting A1 and north-star V2, set `RETURN_TO_DESIGN` instead of substituting geometric SVG shapes or generic procedural filler.

## Proof A execution evidence — technical delivery and Phone PASS

- Runtime asset: `public/assets/c4/environment/settlement/env_settlement_baked_terrain_plate_v1.png`.
- PNG RGB, 1182 × 1330, 3,604,739 bytes; SHA-256 `d223b8005eed5de278e82f54b8c85eff5b66f742289ca30960f18f0ed4c60c96`. Displayed at 1600 × 1800.
- Runtime lineage: PR #110 integrated the plate, PR #111 tried a renderer gradient, PR #112 replaced that ineffective gradient with compatible alpha bands at the north edge. Runtime `main` commit `2b3e5cd5ad2b1705ecea34fe064143efb597daf0`.
- CI for PR #112: PASS; Pages run [#35994886058](https://github.com/momentum448-glitch/xianxia-arpg-web/actions/runs/35994886058): PASS. Live badge verified `BUILD 2b3e5cd` before this documentation sync.
- QC URL: https://momentum448-glitch.github.io/xianxia-arpg-web/
- Desktop browser self-check at 0.5x with gameplay UI hidden: painterly ground, routes and lower creek load; houses, near trees and accepted Healer bridge remain separate; hard horizontal plate seam was removed. At 1.0x the hero pockets remain in their accepted positions.
- Android Phone QC was completed by the user on `BUILD 93c76f4` (docs-only badge over the same functional Proof A runtime lineage). DESIGN_CHAT re-reviewed the supplied 0.5x hidden-UI screenshots and accepts Proof A as **PHONE PASS**: the settlement reads as one authored rural landscape, the baked terrain materially improves cohesion, and no blocker-level seam/duplication/regression is visible.
- No collision/occlusion, water traversal, interaction-radius/semantics, combat timing or A1 topology change. Do not start Proof B before NPC Re-block A Phone QC.

## Proof A PASS result

**PASS.** Phone screenshots satisfy the intended Proof A gate. The following criteria remain the accepted baseline:

- 0.5x + hidden UI reads as one authored rural landscape, not a collage;
- terrain / creek / fields approach north-star V2 material and atmosphere;
- houses and accepted pockets sit naturally in the scene rather than appearing pasted onto unrelated ground;
- there are no obvious seams, giant procedural blobs or flat-paper voids;
- no major house, near-player tree, bridge or NPC is duplicated into the baked layer;
- A1 topology and route remain unchanged;
- gameplay / interaction / combat behavior remains unchanged;
- Android rendering/performance is stable.

## NPC Re-block A — exact Work brief

Reason:

- current Elder / Merchant / Healer placeholders read too vertically aligned along the central route;
- they should visually belong to their functional pocket rather than look like route markers.

Locked placement intent:

- **Elder:** move from the central-road alignment to a natural standing point at / just outside the Elder hall entrance/forecourt.
- **Merchant:** place at the merchant stall/shopfront working edge, visually tied to stall/cart/goods rather than the central road.
- **Healer:** place at the Healer house entrance / herb-work edge, visually tied to the house/garden/drying area rather than the central road.
- deliberately stagger all three so they do not form one vertical line.

Runtime rules:

- this user request explicitly permits changing each NPC's world position / interaction anchor;
- move the interaction anchor with the NPC so visual and interaction positions remain coherent;
- preserve each existing interaction radius and interaction semantics unless a concrete bug requires otherwise;
- do not change NPC identity/art in this pass;
- do not move houses, hero pockets, path topology, terrain plate or accepted environment props;
- do not start collision/occlusion/water-blocking Proof B yet;
- keep main route and door approaches unobstructed.

VERIFY in code/runtime instead of guessing:

1. locate the actual current Elder / Merchant / Healer NPC spawn and interaction definitions;
2. inspect the rendered entrance/forecourt anchors against current A1 pocket offsets;
3. choose the smallest coordinate changes that attach each NPC to its corresponding pocket;
4. build/deploy and verify interaction still triggers at the visible NPC.

QC gate:

- at 0.5x, the three NPCs no longer read as a vertical line;
- each NPC clearly belongs to its own functional pocket;
- at 1.0x, each NPC stands naturally near the intended entrance/work area;
- NPCs do not block the main road or doorway;
- interaction triggers at the visible NPC with the existing radius/behavior;
- no terrain/topology/combat regression.

After this micro-pass is PHONE PASS, return to the planned **Proof B — Collision Foundation**.

## NPC Re-block A execution evidence — Phone QC pending

- Runtime: `src/game/npcConfig.ts`; PR #115; runtime commit `7e8eff66ae5ff01733242fb3ac221f0b9f4645eb`.
- Elder anchor: `(490, 7828)`, at the Elder hall entrance/forecourt.
- Merchant anchor: `(1045, 8082)`, at the merchant stall working edge.
- Healer anchor: `(490, 8382)`, at the Healer house/herb-work entrance edge.
- Interaction radius remains `155` for all three. Rendering and nearest-NPC interaction use the same live container position; dialogue/interaction semantics are unchanged.
- CI #35999392051 PASS; Pages #35999455158 PASS; live badge `BUILD 7e8eff6`.
- Desktop browser check at 0.5x hidden UI confirms the NPCs belong to their three pockets and no longer read as a central vertical row. At 1.0x, the characters sit immediately in front of their associated house/shop areas.
- Interaction smoke check: moving within range of the repositioned Merchant and Healer shows the matching `TƯƠNG TÁC Thương nhân` and `TƯƠNG TÁC Dược sĩ` prompts. Code-level shared-anchor check confirms all NPCs move with the same trigger point; Elder retains the same `155` radius.
- QC URL: https://momentum448-glitch.github.io/xianxia-arpg-web/
- Android Phone QC for this new runtime has not yet been performed. Confirm all three locations at 1.0x, staggered pocket placement at 0.5x hidden UI, door/road clearance, and interaction at the visible NPC before marking this micro-pass PASS or starting Proof B.



## Planned later proofs — do not execute yet

### Proof B — Collision Foundation

After Proof A **and NPC Re-block A** pass:

- simplified house/tree/rock/fence/water ground-footprint collision;
- water blocked by default;
- bridge + 1–2 ford/stepping-stone authored crossings.

### Proof C — Occlusion + tree motion

After B passes:

- one near-road tree with trunk collision + canopy occlusion;
- one building roof/eave occlusion case;
- one minimal tree-sway case;
- Phone QC before expansion.

### Proof D — Expansion / polish

After A–C pass:

- scale proven patterns to required objects;
- restrained wind/water VFX;
- final edge/agriculture polish.

## Failed / superseded paths

Do not repeat:

- Terrain V1 geometric SVG blobs;
- scatter-prop cohesion as a substitute for terrain composition;
- baking every house/tree/NPC into one immutable background;
- using full visual roof/canopy silhouettes as collision;
- letting the player walk through all water;
- implementing all collision/occlusion/VFX layers in one unvalidated mega-pass;
- reopening A1 topology merely because the art pipeline changed.

## Resume sentence

Resume from verified runtime `main 7e8eff6` with transfer state `WAIT_QC`. Review **NPC Re-block A** at https://momentum448-glitch.github.io/xianxia-arpg-web/ (live badge `BUILD 7e8eff6` before this docs-only sync), record Android PASS/REVISE, and keep Collision Proof B blocked until PASS.