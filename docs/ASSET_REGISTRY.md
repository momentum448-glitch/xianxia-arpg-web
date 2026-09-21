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

- Purpose: settlement route, density and broad composition.
- Status: `PHONE_PASS` for V2-A topology + spatial massing + accepted-art context compatibility.
- Selected footprint: `1600 × 1800` V2-A.
- Rejected footprint: V2-B `1600 × 3200`, unless explicitly reopened.
- Primary current QC implementation: `src/scenes/VillageTopologyQcScene.ts`.
- Current art rule: modular-hybrid painterly ground/path/decal layers plus modular houses/props/NPCs.
- Road rule: organic curved/irregular routes, not ruler-straight lanes.
- Current composition hierarchy: Elder west → Merchant east → Healer west → residential/field fringe.
- Next action: preserve topology/massing/ground-path; continue with the scoped `ENV-FIELD-EDGE-KIT-A` proof only.

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

- Purpose: field/agriculture edge language that implies a larger village beyond the authored slice.
- Status: `NOT_STARTED`; now the active next proof after Healer Activity PASS.
- Proof-first target: one humble agricultural edge cluster only, using low cultivated rows / earthen boundary language appropriate to a poor frontier village.
- Working assumption: prefer a dry-field/vegetable-row edge over a bright rice-paddy landmark so the Healer water pocket retains ownership of the water motif.
- Must remain subordinate to houses/player and keep the southern exit route open.
- Next action: create one isolated representative cluster, self-QC technical transparency/crop/style, then integrate the smallest runtime proof before any broader field expansion.

## 8. Current critical non-art architecture note

### SETTLEMENT-PROOF-SCENE

- Purpose: historical/current integration path for settlement production proofs.
- Status: active implementation lineage, not a visual asset.
- Earlier file: `src/scenes/SettlementPropsProofScene.ts`.
- Current V2-A environment QC file: `src/scenes/VillageTopologyQcScene.ts`.
- Current accepted Healer proof layers: `VillageTopologyQcA4Scene.ts` → `VillageTopologyQcHealerActivityScene.ts`.
- Risk: accepted proof work eventually needs promotion back into normal `GameScene`/environment path rather than remaining permanent QC architecture.
- Next action: finish the scoped V2-A field-edge proof gate first; promotion is a later VERIFY task.

## 9. QC camera utility

### TOOL-QC-CAMERA-ZOOM

- Purpose: Phone QC at micro, zone and macro scales without changing production camera intent.
- Status: `PHONE_PASS`.
- Presets: `1.0x`, `0.8x`, `0.65x`.
- Scope: world camera only; HUD remains fixed screen-space.
- Next action: preserve while environment production continues.

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

Current exact next action: **create one isolated `ENV-FIELD-EDGE-KIT-A` proof, then integrate only the smallest southern field-edge cluster and Phone QC at 1.0x + 0.65x before expansion.**
