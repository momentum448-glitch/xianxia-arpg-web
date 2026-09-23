# Thanh Vân Thôn — Whole-Map Completion V1

## 1. Identity

- Map / area: Thanh Vân Thôn
- Milestone: C4.2 environment production
- Owner document: this file
- Current runtime baseline before this pass: `BUILD 63d75ba` / Topology Revision A + Tune A1
- Whole-map north-star reference: `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1`
- Runtime proof asset: `ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1`

## 2. One-sentence purpose

Turn the accepted compact settlement topology into a believable lived-in frontier village by giving the ground, water and village edge a coherent natural system without flattening gameplay into one background image.

## 3. Player fantasy and emotional target

- First read: a humble cultivation village beside fields and a small stream, protected by terrain and vegetation rather than arbitrary fences.
- During traversal: the village feels inhabited, connected and grounded while the critical route remains easy to read on portrait mobile.
- Xianxia theme: ordinary rural life first, restrained cultivation atmosphere second.

## 4. Required player actions

- enter / transition
- traverse the spine and branches
- talk / interact with Elder, Merchant and Healer
- shop / service interactions
- exit toward the next region

No new combat or traversal mechanic is introduced by this terrain pass.

## 5. Topology

Locked topology: **A1 — clear vertical spine with functional pockets on both sides**.

The accepted Topology Revision A + Tune A1 remains locked. This pass changes only environmental framing and ground/water language.

## 6. Locked discovery decisions

First round:

- **1b** — preserve the current skeleton while allowing strong terrain/environment composition changes.
- **2c** — village beside agriculture + ditch/stream, with tree/low-hill framing farther out.
- **3b** — one secondary stream should animate part of the map.
- **4c + 4a** — remove most purposeless fences; retain fences only when they mark a believable yard/field/property edge.
- **5a** — more believable ground via texture, worn paths, grass edges and light/dark soil variation.
- **6c** — clear macro framing around the village while keeping the playable interior open.

Second round:

- **A1** — keep the main vertical spine.
- **B2** — the stream cuts across part of the lower map and exits the village edge.
- **C1 with light C2** — frame the village mainly with trees, grass, low earth and field edges, with a few stronger rocky/raised accents.
- **D2** — one main agricultural fringe plus light secondary cultivation traces.
- **E1** — moderate ground realism that survives mobile scale without visual noise.

## 7. North-star reference

Asset ID: `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1`

Drive location:

```text
/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v001.png
Drive file ID: 1WzAg_jBz3J6xiNO3jbmh7fMON6wBueJR
```

Status: `REFERENCE_ONLY`.

The image is a composition north-star, not a runtime background and not a requirement to copy every tree/house/rock literally.

## 8. Terrain / water plan

### Ground

- keep warm earth/paper base;
- add broad value variation rather than uniform flat beige;
- use subtle soil speckle and worn-earth patches;
- keep hero-pocket foregrounds readable.

### Stream

- starts beneath/near the accepted Healer water cluster;
- meanders through the lower half;
- exits the eastern village edge;
- remains visually shallow and secondary to the main route;
- visual only in this pass, no gameplay collision/hitbox change.

### Village edge

- macro enclosure comes from meadow/brush/low-earth masses;
- a few rock/grass accents reinforce edge logic;
- no hard perimeter wall;
- purposeless free-standing fence segments are removed.

## 9. Density / negative-space plan

- densest: Merchant + Healer functional pockets;
- quietest: northern approach;
- open areas remain between major pockets for readability;
- edge density increases toward the outer frame;
- stream and field detail stay subordinate to player / houses / NPC interactions.

## 10. Existing accepted assets

Preserve without regeneration:

- accepted houses;
- Merchant Kit B;
- Healer Water+Bridge A;
- Healer Activity Kit A;
- Field Edge Kit B;
- Ground/Path P0;
- base tree / fence / rock-grass / lantern kit.

## 11. New runtime proof

Asset ID: `ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1`

File:

```text
public/assets/c4/environment/settlement/env_settlement_terrain_wholemap_v1.svg
```

Role:

- painterly-ish terrain/decal underlay only;
- does not contain houses/NPCs;
- does not replace modular hero pockets;
- visually joins ground, stream and village envelope.

## 12. Fence cleanup

Remove free-standing fence segments that have no property/field/functional logic:

- northern floating pair near the entry;
- southern floating fringe segments that read as decorative stamps.

Keep fences that are visibly attached to Elder/Healer yards or a functional field/property edge.

## 13. Risks / validation

| Type | Item | Resolution |
|---|---|---|
| VERIFY | SVG terrain texture renders cleanly in Phaser/mobile | build + Phone QC |
| VERIFY | stream does not overpower the spine | 0.5x / 0.65x hidden-UI screenshots |
| VERIFY | stream crossing under existing path reads as a shallow ford/earth crossing, not broken topology | normal traversal screenshot |
| VERIFY | edge framing feels natural rather than vignetted | 0.5x whole-map screenshot |
| ASSUME | terrain can remain visual-only in this pass | no collision/gameplay changes |
| ASSUME | accepted hero pockets remain fixed | preserve current runtime placement |

## 14. Phone QC views

1. 0.5x + UI hidden: whole-map envelope / stream / negative-space balance.
2. 0.65x + UI hidden: pocket-to-pocket continuity.
3. 1.0x near Healer: water join and ground realism.
4. 1.0x near stream/spine crossing: no visual logic break.
5. 1.0x southern fringe: field + stream + residential edge read together.

## 15. PASS criteria

- village feels naturally enclosed without a fence perimeter;
- stream makes the map more alive but remains secondary;
- ground no longer reads as a flat blank sheet;
- hero pockets retain their accepted hierarchy;
- no new collision or interaction regression;
- no obvious SVG/texture artifact on Android;
- whole-map still reads clearly with UI hidden at 0.5x.

## 16. Exact next action

Integrate `ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1` and fence cleanup as one reversible runtime proof, deploy, then Phone QC before adding more edge detail or replacing the proof with higher-fidelity raster art.
