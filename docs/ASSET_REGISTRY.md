# Xianxia ARPG — Asset Registry

This is the durable registry for project-critical visual/binary assets. Chat history, image-generation history, and ChatGPT Library are discovery locations, not canonical production storage by themselves.

## 1. Storage / continuity rules

Every important asset needs both:

1. a durable binary/source location outside one chat; and
2. a registry record naming its Asset ID, role, status, canonical path/source, QC state and next action.

Storage hierarchy:

- GitHub runtime asset = production source of truth for the game.
- Project Sources = long-lived visual/source references useful across chats.
- Google Drive asset vault = byte-preserving backup / transfer / recovery source.
- ChatGPT Library = discovery pool only; never the only home of critical art.

Status vocabulary:

- `NOT_STARTED`
- `REFERENCE_ONLY`
- `DESIGN_PASS`
- `ISOLATED_READY`
- `ANIM_READY`
- `INTEGRATED`
- `PHONE_PASS`
- `REVISE`
- `TECH_REWORK`

Do not regenerate a `DESIGN_PASS` or `PHONE_PASS` asset merely because a later chat cannot see the original generation. Recover it by Asset ID.

## 2. Core actor / VFX assets

### PLY-M-BASE — Male sword cultivator

- Purpose: production male player visual.
- Status: `INTEGRATED`; runtime animation proof exists.
- Runtime storage: `public/assets/c4/actors/player/male/`.
- Design state: accepted.
- Runtime state: rendering successfully.
- Phone state: production player visual has been used throughout phone QC.
- Next action: preserve during environment/NPC discovery unless explicitly revised.

### EN-MELEE-BASE — Corrupted beast melee enemy

- Purpose: production melee enemy.
- Status: `PHONE_PASS`.
- Runtime path: `public/assets/c4/actors/enemies/melee/en_melee_idle_s.png`.
- Next action: preserve; do not regenerate without explicit `REVISE`.

### FX-SWORD — Flying sword

- Purpose: manual basic-attack projectile visual.
- Status: `PHONE_PASS`.
- Runtime path: `public/assets/c4/vfx/sword/fx_sword_r1.png`.
- Phone QC: blade, launch, trail and impact passed staged validation.
- Next action: preserve.

## 3. Settlement composition / ground

### ENV-SETTLEMENT-LAYOUT — Thanh Vân Thôn composition

- Purpose: production settlement route, density and whole-map composition.
- Status: `PHONE_PASS`.
- Selected footprint: `1600 × 1800` V2-A.
- Rejected footprint: V2-B `1600 × 3200`, unless explicitly reopened.
- Production implementation: `src/game/settlementV2AProduction.ts`.
- Accepted runtime lineage: PR #101 Topology Revision A + PR #102 Topology Tune A1, reviewed on `BUILD 63d75ba`.
- Phone QC: compact settlement reads coherently across Elder / Merchant / Healer / southern fringe; branches read as part of one village rather than isolated POIs.
- Locked topology rule: preserve current whole-pocket placement, route rhythm, north threshold and southern residential/agriculture fringe unless a new concrete Phone-QC problem appears.
- Hero-pocket rule: Elder / Merchant / Healer internal composition remains independently PHONE_PASS and must not be regenerated/rearranged merely to change whole-map layout.
- Cohesion Pass A additive scatter layer is superseded and should remain disabled.
- Next action: preserve the accepted topology while Terrain Proof V2 is integrated and Phone-QC'd. Do not resume the older NPC-next assumption unless the terrain proof is resolved.


### ENV-SETTLEMENT-GROUND-KIT-A

- Purpose: painterly road/ground continuity.
- Asset/design status: `PHONE_PASS` as an accepted reusable settlement ground kit.
- Current V2-A placement status: **`PHONE_PASS`** after final 0.65x + 1.0x Phone QC on 2026-09-20.
- Runtime files:
  - `public/assets/c4/environment/settlement/env_settlement_path_seg_a.png`
  - `public/assets/c4/environment/settlement/env_settlement_path_seg_b.png`
  - `public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png`
  - `public/assets/c4/environment/settlement/env_settlement_forecourt_a.png`
- PR #74 restored the accepted kit onto V2-A topology.
- First Phone QC of build `392d5a7` found the V2-A road too visually dominant at 0.65x, a faint center-guide/groove impression, and a weak Healer branch.
- PR #75 reused the same assets and changed placement/display rhythm only:
  - main path widths reduced roughly 10–15%;
  - path/patch visual weight reduced;
  - route-guide line softened;
  - Healer branch strengthened;
  - non-Healer forecourt dominance reduced slightly.
- Final Phone QC:
  - 0.65x: road no longer dominates or reads as a dark ribbon/groove; Elder → Merchant → Healer rhythm and negative space remain readable;
  - 1.0x: Healer branch is clear without becoming a second main road; movement corridor remains readable.
- No new ground PNGs were created for the tune.
- Next action: preserve. Do not reopen or regenerate without a new concrete Phone-QC problem.

## 4. Settlement houses

### ENV-HOUSE-SET-A — Accepted four-house visual set

- Purpose: production-painted Thanh Vân Thôn houses.
- Status: `PHONE_PASS` in current runtime snapshot.
- Runtime directory: `public/assets/c4/environment/settlement/`.
- Canonical runtime files:
  - `env_house_thatch_a.png`
  - `env_house_tile_a.png`
  - `env_house_hall_a.png`
  - `env_house_thatch_b.png`
- Design state: `DESIGN_PASS`.
- Technical state: clean runtime is functioning; earlier black/corrupt-file blocker is historical.
- Important: do not regenerate the accepted four-house design just to change scale/layout.
- Next action: preserve current house art unless future Phone QC identifies a concrete composition issue.

### ENV-HOUSE-HALL-A-CLEAN

- Purpose: clean technical source that repaired Hall runtime.
- Relation: same accepted Hall design from `ENV-HOUSE-SET-A`; technical recovery, not redesign.
- Status: `PHONE_PASS` as runtime source lineage.
- Drive backup: `10_QC_PASS`.
- Drive file ID: `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`.
- Filename: `env_house_hall_a.png`.
- Verified historical metadata: PNG RGBA, 128 × 89, 22,633 bytes.
- SHA-256 `f047b6d275dbce9c50c6f3a00ae236b9a489f7bd4e2182f0b42cf3f60e45304f`.
- Runtime target/path: `public/assets/c4/environment/settlement/env_house_hall_a.png`.
- Next action: preserve.

### ENV-HOUSE-SET-A-SOURCE-SHEET

- Purpose: accepted four-house source/reference sheet for recovery/continuity.
- Status: `DESIGN_PASS` source/reference.
- Drive filename: `ARPG__SRC__settlement_house_set_design_pass__v001.png`.
- Drive file ID: `1fVnIyNhJ6cLiW0OxVA5rjHDiYcwupmOS`.
- Note: Drive connector historically reported a JPEG MIME representation despite `.png` filename; treat this as a visual/source reference, not runtime bytes.
- Next action: preserve for visual continuity/recovery.

### ENV-HOUSE-THATCH-B-RECOVERED

- Purpose: technical recovery of accepted bottom-right Thatch B from the source sheet.
- Status: `PHONE_PASS` lineage.
- Drive filename: `env_house_thatch_b_recovered_v001.png`.
- Drive file ID: `1hx9JYkwEx3Mf9Ow8lCP0w_XidDxMaScX`.
- Historical normalized source metadata: PNG RGBA, 208 × 172, 69,820 bytes.
- Runtime target/path: `public/assets/c4/environment/settlement/env_house_thatch_b.png`.
- Next action: preserve; do not regenerate.

## 5. Settlement base prop kit

### ENV-SETTLEMENT-PROP-KIT-A

- Purpose: general village environmental props.
- Status: `PHONE_PASS` as a reusable visual kit.
- Runtime files:
  - `public/assets/c4/environment/settlement/env_tree_village_a.png`
  - `public/assets/c4/environment/settlement/env_fence_village_a.png`
  - `public/assets/c4/environment/settlement/env_rockgrass_village_a.png`
  - `public/assets/c4/environment/settlement/env_lanternpost_village_a.png`
- Phone QC: tree/fence/rock-grass/lantern accepted in the current settlement visual language.
- Composition rule: do not repeat the same `tree + fence + rock + lantern` formula at every house. Vary density, scale, flip and role.
- Next action: preserve current deployment during V2-A completion.

## 6. Merchant area / Lục Chưởng Quầy

### ENV-MERCHANT-KIT-B — Merchant production vignette

- Purpose: make Lục Chưởng Quầy's area read as a trading zone before the NPC itself receives production art.
- Status: `PHONE_PASS` on Android build `56b9359`.
- Design state: `DESIGN_PASS` / accepted.
- Runtime state: `PHONE_PASS`.
- Canonical runtime files:
  - `public/assets/c4/environment/settlement/env_merchant_stall_b.png`
  - `public/assets/c4/environment/settlement/env_merchant_cart_b.png`
  - `public/assets/c4/environment/settlement/env_merchant_goods_b.png`
  - `public/assets/c4/environment/settlement/env_merchant_sign_b.png`
- Canonical display widths: stall 270, cart 180, goods 135, sign 60.
- Drive backups in `20_RUNTIME_READY/10_QC_PASS`:
  - stall → `1zIpOgs_JTTUJXeaTdDDn2SgO4dZuJdL4`
  - cart → `1xftok68r_D_f_sl1Sjmcx8InHQ9zWB0T`
  - goods → `1okipyi9GsU2BWGlS4XZapuzqPBEFUOqX`
  - sign → `1_ta2f0wNJD6hH2eJgqtIlqJiBYumJco4`
- Phone QC: scale, transparency, trade identity and route readability passed.
- Composition companion decision: lower tile-roof house at `x=1210, settlement top+1090` removed in the accepted proof composition; grounding wash remains.
- Next action: preserve. Do not generate a new merchant kit unless explicitly revised.

## 7. Healer / agriculture

### ENV-HEALER-WATER-BRIDGE-A

- Purpose: production landmark for the Dược Sư pocket.
- Status: `PHONE_PASS`.
- Canonical runtime asset: `public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp`.
- Runtime presentation accepted from build `6fd3477`: display `440 × 247`, subtle warm tint + alpha `0.96`.
- Phone QC: bridge orientation/logic, 1.0x readability, and 0.65x hierarchy passed.
- Next action: preserve. Do not regenerate or retune without a new concrete Phone-QC issue.

### ENV-HEALER-ACTIVITY-KIT-A

- Purpose: herb-bed / medicine-drying / healer work-language proof.
- Status: `PHONE_PASS`.
- Canonical runtime files:
  - `public/assets/c4/environment/settlement/env_healer_herb_bed_a.webp`
  - `public/assets/c4/environment/settlement/env_healer_drying_props_a.webp`
- Runtime scene: `src/scenes/VillageTopologyQcHealerActivityScene.ts`.
- Accepted runtime presentation on reviewed build `c45288c`:
  - herb garden display `205 × 126`, final center `(125, 1335)` on the left/green edge of the Healer house;
  - herb garden uses the accepted runtime geometry mask to remove source matte/edge fragments;
  - drying/work cluster display `112 × 124`, center `(548, 1340)`;
  - Healer Water+Bridge unchanged.
- Phone QC:
  - 1.0x: placement and healer activity language PASS;
  - 0.65x: pocket openness, village hierarchy and route readability PASS.
- Important lineage:
  - earlier herb WebP transport was invalid and rendered Phaser's missing-texture rectangle;
  - valid WebP fixed decode;
  - source matte/edge fragments were then removed with the runtime geometry mask;
  - original right-side garden placement was composition-revised after user Phone QC; final accepted position is left of the Healer house.
- Next action: preserve accepted art, mask, scale and placement. Do not regenerate/tune without a new concrete Phone-QC problem.

### ENV-FIELD-EDGE-KIT-A

- Purpose: original field/agriculture edge proof for the southern village fringe.
- Status: `REVISE` / superseded by `ENV-FIELD-EDGE-KIT-B`.
- Historical result: runtime technical repair eventually rendered, but Phone QC found the art too tile-like, regular and sticker-like at 1.0x.
- Do not restore or promote A.
- Next action: none; retain only as rejected lineage if needed for history.

### ENV-FIELD-EDGE-KIT-B

- Purpose: humble agricultural fringe that implies a larger working village beyond the authored V2-A slice without becoming a hero landmark.
- Status: `PHONE_PASS` on `BUILD de30ae7` after 1.0x + 0.65x Phone QC on 2026-09-22.
- Canonical runtime asset: `public/assets/c4/environment/settlement/env_field_edge_kit_b.webp`.
- Runtime scene: `src/scenes/VillageTopologyQcFieldEdgeScene.ts`.
- Accepted runtime presentation:
  - center around `(1210, 1620)`;
  - display `320 × 180`;
  - alpha `0.96`;
  - ground depth `-14`;
  - direct render from the canonical RGBA WebP; no runtime canvas cleanup.
- Phone QC:
  - TECH: transparent runtime render PASS; no black rectangle, no missing texture, no lost art;
  - 1.0x: irregular cultivated rows, broken earthen/grass edge and muted palette blend with the village painterly language;
  - 0.65x: remains subordinate to houses/player and preserves the southern exit route and overall hierarchy.
- Important lineage:
  - an earlier B binary arrived with a black matte;
  - an edge-connected runtime cleanup removed the matte but also caused the field art to disappear on phone;
  - PR #95 replaced the incomplete runtime WebP with a verified RGBA file and removed the cleanup workaround;
  - `BUILD de30ae7` is the reviewed PASS lineage.
- Next action: preserve accepted art, binary, footprint, scale and placement. Do not regenerate/tune without a new concrete Phone-QC problem.


### ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1

- Purpose: approved whole-map visual north-star for completing Thanh Vân Thôn as one believable rural settlement.
- Status: `REFERENCE_ONLY`.
- Design direction: keep the accepted A1 vertical spine; stronger terrain composition is allowed around it; village sits beside agriculture and a secondary stream; use natural earth/grass/tree/rock framing instead of decorative fence scatter; ground should feel more lived-in while remaining mobile-readable.
- Locked discovery choices:
  - preserve current skeleton while opening terrain composition;
  - rural agriculture + stream context;
  - one secondary stream crossing part of the lower map;
  - most purposeless fences removed; functional yard/field fences retained;
  - moderate ground realism;
  - macro framing around the village while keeping the interior playable/open.
- Durable reference location: `/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v001.png`.
- Drive file ID: `1WzAg_jBz3J6xiNO3jbmh7fMON6wBueJR`.
- Role: composition reference only, not a flattened runtime background.
- Map design doc: `docs/environment/THANH_VAN_THON_WHOLE_MAP_V1.md`.
- Next action: preserve as the visual target while runtime terrain is iterated modularly.

### ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V2

- Purpose: primary visual/composition/material target for the new Illustrated World Hybrid production architecture.
- Status: `REFERENCE_ONLY`; preferred north-star, superseding V1 as the active visual target.
- Durable source: `/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v002.png`.
- Drive file ID: `1DSycLIlv2Y1prvkcvhElOs_Apc12dd4A`.
- Visual intent: one coherent painterly rural xianxia village; richer natural terrain, stronger stream/pond integration, believable edge vegetation/rocks/fields, and unified atmosphere.
- Runtime rule: reference only. Do not flatten every house/tree/NPC into one immutable background.
- Canonical architecture doc: `docs/environment/THANH_VAN_THON_ILLUSTRATED_WORLD_HYBRID.md`.
- Next action: Work uses this as the target for Proof A — Baked Terrain Plate V1.

### ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1

- Purpose: first reversible runtime proof for whole-map completion: more believable soil variation, natural village-edge framing, lower-map stream, light agricultural traces and fence cleanup.
- Status: `REVISE` after Phone QC.
- Canonical runtime asset: `public/assets/c4/environment/settlement/env_settlement_terrain_wholemap_v1.svg`.
- Runtime integration: `src/game/settlementV2AProduction.ts` + `src/scenes/ProductionGameScene.ts`.
- Runtime lineage: PR #104, merged build `1823667`.
- Technical state: CI PASS + GitHub Pages deploy PASS.
- Gameplay state: visual-only proof; no gameplay collision, interaction radius, combat hitbox or timing change.
- Fence cleanup: removes free-standing north-entry/southern decorative fence stamps; keeps functional pocket/property fences.
- Phone QC result on 2026-09-23: REVISE. Large circular/rounded macro masks read as procedural/vector overlays; stream is too cyan/regular; Healer pond→stream join is synthetic; ground remains too flat; southern fringe does not yet blend into one painterly terrain language.
- What remains valid: lower-map secondary-stream concept, fence cleanup, and accepted A1 topology/hero-pocket hierarchy.
- V1 is retained as historical REVISE lineage; its SVG is no longer loaded by production.
- Next action: review Terrain Proof V2 on phone before any further terrain art changes.


### ENV-SETTLEMENT-TERRAIN-UNDERLAY-V2

- Purpose: painterly raster terrain-only underlay replacing V1's geometric SVG treatment while keeping the accepted A1 route and hero pockets intact.
- Status: `INTEGRATED`; not promoted to final Phone PASS because the production architecture shifted to Illustrated World Hybrid after design review.
- Canonical runtime asset: `public/assets/c4/environment/settlement/env_settlement_terrain_wholemap_v2.png`.
- Metadata: PNG RGB, 1182 × 1330, 2,709,928 bytes; SHA-256 `a466cb2731c80c80bcf42294cce91ee49921e625e40a12da42c00f9b402818d0`.
- Runtime presentation: image underlay at 1600 × 1800 behind accepted modular art; preloaded through the image loader.
- Visual scope: worn warm earth, irregular grass/soil edges and one muted jade creek running beneath the accepted Healer water layer toward the east edge. No new object or pocket art.
- Runtime lineage: merged PR #107; CI run #303 PASS; GitHub Pages run #167 PASS on V2 code commit `b1a4e9b`.
- Phone QC: pending. Confirm the pond-to-creek join at 1.0x, whole-map readability at 0.5x with UI hidden, and southern-fringe continuity.
- Gameplay: visual only; no collision, interaction-radius, hitbox or timing changes.
- Next action: preserve as historical/visual evidence. Do not continue polishing it as the final settlement architecture; execute Illustrated World Hybrid Proof A instead.

### ENV-SETTLEMENT-BAKED-TERRAIN-PLATE-V1

- Purpose: Illustrated World Hybrid Proof A, one coherent baked Layer 0 beneath the existing playable village objects.
- Status: `PHONE_PASS`.
- Canonical runtime asset: `public/assets/c4/environment/settlement/env_settlement_baked_terrain_plate_v1.png`.
- Metadata: PNG RGB, 1182 × 1330, 3,604,739 bytes; SHA-256 `d223b8005eed5de278e82f54b8c85eff5b66f742289ca30960f18f0ed4c60c96`.
- Source direction: approved `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V2` in Drive; terrain-only painterly generation refined for a lower Healer creek, open route and small-scale vegetation.
- Runtime presentation: preloaded raster, displayed at 1600 × 1800 behind separate houses, near-player trees, Healer bridge, props, NPCs and actors. Legacy modular path/patch/forecourt overlays are replaced by the plate in the production scene.
- Scope: baked earth, routes, muted creek surface, fields, low grass, tiny rocks and peripheral terrain. No house, major tree, bridge, major collision prop or NPC is baked into the bitmap.
- Gameplay: visual-only; topology, collision, interactions and combat remain unchanged. Collision/occlusion extensions belong to later proof gates.
- Runtime lineage: PR #110, north-edge follow-up PR #111/#112, runtime commit `2b3e5cd`; CI PASS and Pages run #35994886058 PASS. Desktop self-check at 0.5x hidden UI verified the integrated plate and separate objects; the alpha-band north edge removes the hard seam. The old plains approach north of the plate still needs phone judgment.
- Phone QC: PASS on 2026-09-24 from user Android screenshots at live `BUILD 93c76f4` (code-identical functional Proof A runtime lineage from `2b3e5cd`). Whole-map cohesion, painterly ground continuity and mobile readability passed the Proof A gate.
- Next action: preserve terrain as-is. Run Android Phone QC for deployed NPC Re-block A before Collision Proof B.

### ARCH-SETTLEMENT-ILLUSTRATED-WORLD-HYBRID

- Purpose: production rendering/collision/occlusion architecture for Thanh Vân Thôn.
- Status: `DESIGN_PASS`.
- Canonical spec: `docs/environment/THANH_VAN_THON_ILLUSTRATED_WORLD_HYBRID.md`.
- Baked Layer 0: soil, paths, creek surface, fields/cultivation ground, low vegetation, tiny rocks/shadows, distant/off-playable scenery.
- Separate static layer: major buildings, near-player trees, bridges and collision/occlusion-critical props.
- Dynamic layer: player/NPC/enemy/loot/projectile/interactable.
- Collision: simplified invisible ground footprints; never full roof/canopy silhouettes.
- Occlusion: Y-depth sorting plus selective canopy/roof/eave foreground cutouts.
- Tree animation: important near-player trees remain separate so canopy sway/wind can be added later.
- Water: blocked by default; bridge plus 1–2 authored ford/stepping-stone crossings.
- Next action: Proof A — Baked Terrain Plate V1. Collision/occlusion expansion waits for later proof gates.

## 8. Current critical non-art architecture note

### SETTLEMENT-PROOF-SCENE

- Purpose: historical/current integration path for settlement production proofs.
- Status: active implementation lineage, not a visual asset.
- Earlier file: `src/scenes/SettlementPropsProofScene.ts`.
- Current V2-A environment QC file: `src/scenes/VillageTopologyQcScene.ts`.
- Current accepted Healer/field proof layers: `VillageTopologyQcA4Scene.ts` → `VillageTopologyQcHealerActivityScene.ts` → `VillageTopologyQcFieldEdgeScene.ts`.
- Risk: accepted proof work eventually needs promotion back into normal `GameScene`/environment path rather than remaining permanent QC architecture.
- Next action: selection of the next substantial target requires structured discovery; proof-scene promotion remains a VERIFY candidate, not an automatic next task.

## 9. QC camera utility

### TOOL-QC-CAMERA-ZOOM

- Purpose: Phone QC at micro, zone and macro scales without changing production camera intent.
- Status: `PHONE_PASS`.
- Presets: `1.0x`, `0.8x`, `0.65x`, `0.5x`.
- Companion control: `ẨN UI / HIỆN UI` hides gameplay HUD/world labels while retaining QC controls.
- Scope: world camera only; gameplay HUD/QC controls use dedicated cameras so QC zoom does not resize controls.
- Next action: preserve for production Phone QC.

## 10. Drive vault

Verified folder structure:

```text
20_RUNTIME_READY
├── 00_INBOX
├── 10_QC_PASS
└── 90_ARCHIVE_REJECT
```

IDs:

- `20_RUNTIME_READY`: `1pwArqr68G-3o9iXdffpDb8bMUyuR9-2f`
- `00_INBOX`: `1XM05mGrxcjcwCTJXEC-rkE-z4GK2v8wY`
- `10_QC_PASS`: `1AzY928GT097WptHw7kHy4uuqTozChY7W`
- `90_ARCHIVE_REJECT`: `1EEO5QVs2F6YkBC7p266X82S4HgzOnsXW`

## 11. Handoff gate

Before changing chat or starting another production branch, verify:

- exact current `main`;
- relevant PR/branch state;
- all important runtime assets are in GitHub;
- critical source/recovery assets have durable Project Sources / Drive locations when needed;
- this registry matches current PHONE PASS / REVISE state;
- `HANDOFF_CURRENT.md` names the exact next action and pass gate.

Current exact next action: **complete quick Android Phone QC for deployed NPC Re-block A, record PASS/REVISE, and keep Collision Proof B blocked until PASS.**
