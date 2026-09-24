# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: NONE_WHILE_WAITING_QC
Return condition: user/DESIGN_CHAT completes Android Phone QC for Illustrated World Hybrid Proof A and records PASS/REVISE. Proof B remains blocked.

Snapshot: 2026-09-24
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified runtime main after Proof A: `2b3e5cd5ad2b1705ecea34fe064143efb597daf0`
Latest functional terrain runtime lineage: PR #107 / `b1a4e9b076b521891c80100f22603d79443b934b`
Verified live Proof A badge before this docs-only handoff sync: `BUILD 2b3e5cd`
Completed execution branch: `work/illustrated-world-hybrid-proof-a` (PR #110 merged); north edge refinements PR #111 and #112 merged.
Open relevant execution PR: none
Unrelated old open PR: #4
This documentation handoff advances `main` without runtime changes. Verify the live badge and Pages status before any later implementation.

## Current objective

Execute **Illustrated World Hybrid Proof A — Baked Terrain Plate V1**.

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

## Proof A execution evidence — technical delivery, Phone QC pending

- Runtime asset: `public/assets/c4/environment/settlement/env_settlement_baked_terrain_plate_v1.png`.
- PNG RGB, 1182 × 1330, 3,604,739 bytes; SHA-256 `d223b8005eed5de278e82f54b8c85eff5b66f742289ca30960f18f0ed4c60c96`. Displayed at 1600 × 1800.
- Runtime lineage: PR #110 integrated the plate, PR #111 tried a renderer gradient, PR #112 replaced that ineffective gradient with compatible alpha bands at the north edge. Runtime `main` commit `2b3e5cd5ad2b1705ecea34fe064143efb597daf0`.
- CI for PR #112: PASS; Pages run [#35994886058](https://github.com/momentum448-glitch/xianxia-arpg-web/actions/runs/35994886058): PASS. Live badge verified `BUILD 2b3e5cd` before this documentation sync.
- QC URL: https://momentum448-glitch.github.io/xianxia-arpg-web/
- Desktop browser self-check at 0.5x with gameplay UI hidden: painterly ground, routes and lower creek load; houses, near trees and accepted Healer bridge remain separate; hard horizontal plate seam was removed. At 1.0x the hero pockets remain in their accepted positions.
- Android Phone QC has **not** been performed and Proof A is **not** Phone PASS. Inspect 1.0x Healer pond/creek layering, 0.5x whole-map hierarchy and north approach, southern fields, and stable rendering/performance. The pre-existing plains approach north of the plate still has a soft legacy path over pale paper; decide whether that transition is acceptable on phone. Record PASS/REVISE with screenshots and exact build.
- No collision/occlusion, water traversal, combat timing, interaction or A1 topology change. Do not start Proof B before Phone QC.

## Proof A PASS gate

At Phone QC:

- 0.5x + hidden UI reads as one authored rural landscape, not a collage;
- terrain / creek / fields approach north-star V2 material and atmosphere;
- houses and accepted pockets sit naturally in the scene rather than appearing pasted onto unrelated ground;
- there are no obvious seams, giant procedural blobs or flat-paper voids;
- no major house, near-player tree, bridge or NPC is duplicated into the baked layer;
- A1 topology and route remain unchanged;
- gameplay / interaction / combat behavior remains unchanged;
- Android rendering/performance is stable.

## Planned later proofs — do not execute yet

### Proof B — Collision Foundation

After A passes:

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

Resume with transfer state `WAIT_QC`: Proof A is deployed on runtime `BUILD 2b3e5cd` (a later docs-only sync may advance the displayed badge). Run ordered Android Phone QC and record PASS/REVISE. Do not start Proof B before that gate.
