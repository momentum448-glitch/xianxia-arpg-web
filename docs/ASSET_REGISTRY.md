# Xianxia ARPG — Asset Registry

Durable registry for project-critical visual/binary assets. GitHub runtime assets are the production source of truth; Project Sources and Drive are recovery/reference stores; ChatGPT Library is discovery only.

Status vocabulary: `NOT_STARTED`, `REFERENCE_ONLY`, `DESIGN_PASS`, `ISOLATED_READY`, `ANIM_READY`, `INTEGRATED`, `PHONE_PASS`, `REVISE`, `TECH_REWORK`.

Do not regenerate a `DESIGN_PASS` or `PHONE_PASS` asset merely because a later chat cannot see the original generation. Recover it by Asset ID.

## Core actor / VFX

### PLY-M-BASE — Male sword cultivator
- Purpose: production male player visual.
- Status: `INTEGRATED`; accepted production visual.
- Runtime: `public/assets/c4/actors/player/male/`.
- Next: preserve during environment work.

### EN-MELEE-BASE — Corrupted beast melee enemy
- Status: `PHONE_PASS`.
- Runtime: `public/assets/c4/actors/enemies/melee/en_melee_idle_s.png`.
- Next: preserve.

### FX-SWORD — Flying sword
- Status: `PHONE_PASS`.
- Runtime: `public/assets/c4/vfx/sword/fx_sword_r1.png`.
- Next: preserve.

## Settlement layout / ground

### ENV-SETTLEMENT-LAYOUT — Thanh Vân Thôn V2-A
- Status: `PHONE_PASS` for topology + spatial massing + accepted-art context.
- Footprint: `1600 × 1800`.
- V2-B `1600 × 3200`: rejected unless explicitly reopened.
- QC implementation lineage: `src/scenes/VillageTopologyQcScene.ts`.
- Hierarchy: Elder west → Merchant east → Healer west → residential/field fringe.
- Next: preserve while finishing scoped Healer proof work.

### ENV-SETTLEMENT-GROUND-KIT-A
- Status: `PHONE_PASS` asset + V2-A placement.
- Runtime:
  - `public/assets/c4/environment/settlement/env_settlement_path_seg_a.png`
  - `public/assets/c4/environment/settlement/env_settlement_path_seg_b.png`
  - `public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png`
  - `public/assets/c4/environment/settlement/env_settlement_forecourt_a.png`
- Final Phone QC: 0.65x macro hierarchy PASS; 1.0x Healer-branch readability PASS.
- Next: preserve; do not reopen without a concrete Phone-QC problem.

## Settlement houses

### ENV-HOUSE-SET-A — Accepted four-house set
- Status: `PHONE_PASS`.
- Runtime directory: `public/assets/c4/environment/settlement/`.
- Files:
  - `env_house_thatch_a.png`
  - `env_house_tile_a.png`
  - `env_house_hall_a.png`
  - `env_house_thatch_b.png`
- Design state: accepted.
- Historical black/corrupt-file blocker is resolved.
- Next: preserve; do not regenerate for scale/layout tweaks.

### ENV-HOUSE-HALL-A-CLEAN
- Status: `PHONE_PASS` source lineage.
- Runtime: `public/assets/c4/environment/settlement/env_house_hall_a.png`.
- Drive backup: `10_QC_PASS`, file ID `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`.
- Historical verified metadata: PNG RGBA, 128 × 89, 22,633 bytes, SHA-256 `f047b6d275dbce9c50c6f3a00ae236b9a489f7bd4e2182f0b42cf3f60e45304f`.
- Next: preserve.

### ENV-HOUSE-SET-A-SOURCE-SHEET
- Status: `DESIGN_PASS` source/reference.
- Drive: `ARPG__SRC__settlement_house_set_design_pass__v001.png`, file ID `1fVnIyNhJ6cLiW0OxVA5rjHDiYcwupmOS`.
- Next: preserve for recovery/continuity.

### ENV-HOUSE-THATCH-B-RECOVERED
- Status: `PHONE_PASS` lineage.
- Drive: `env_house_thatch_b_recovered_v001.png`, file ID `1hx9JYkwEx3Mf9Ow8lCP0w_XidDxMaScX`.
- Runtime target: `public/assets/c4/environment/settlement/env_house_thatch_b.png`.
- Next: preserve.

## Settlement prop kit

### ENV-SETTLEMENT-PROP-KIT-A
- Status: `PHONE_PASS`.
- Runtime:
  - `env_tree_village_a.png`
  - `env_fence_village_a.png`
  - `env_rockgrass_village_a.png`
  - `env_lanternpost_village_a.png`
  under `public/assets/c4/environment/settlement/`.
- Composition rule: do not stamp the same `tree + fence + rock + lantern` formula at every house.
- Next: preserve.

## Merchant area

### ENV-MERCHANT-KIT-B
- Status: `PHONE_PASS`.
- Runtime:
  - `env_merchant_stall_b.png`
  - `env_merchant_cart_b.png`
  - `env_merchant_goods_b.png`
  - `env_merchant_sign_b.png`
- Accepted display widths: stall 270, cart 180, goods 135, sign 60.
- Drive backups in `20_RUNTIME_READY/10_QC_PASS`:
  - stall `1zIpOgs_JTTUJXeaTdDDn2SgO4dZuJdL4`
  - cart `1xftok68r_D_f_sl1Sjmcx8InHQ9zWB0T`
  - goods `1okipyi9GsU2BWGlS4XZapuzqPBEFUOqX`
  - sign `1_ta2f0wNJD6hH2eJgqtIlqJiBYumJco4`
- Next: preserve.

## Healer pocket

### ENV-HEALER-WATER-BRIDGE-A
- Purpose: modest pond/stream + humble footbridge for Dược Sư pocket.
- **Status: `PHONE_PASS`.**
- Canonical runtime asset: `public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp`.
- Integration: `src/scenes/VillageTopologyQcA4Scene.ts`.
- Accepted runtime presentation on build `6fd3477`:
  - center around existing Healer water footprint;
  - display size about `440 × 247`;
  - subtle warm tint and alpha `0.96` to keep hierarchy restrained.
- Phone QC:
  - 1.0x PASS for scale/readability and bridge logic;
  - 0.65x PASS for macro hierarchy and main-spine readability.
- Bridge rule: crosses the narrow water gap bank-to-bank; not aligned along the gap.
- Runtime/transport note: validated WebP is the accepted path; earlier PNG/alpha workarounds caused black-rectangle or missing-art failures on Android/WebGL.
- Next: preserve. Do not regenerate or retune without a new concrete regression.

### ENV-HEALER-ACTIVITY-KIT-A
- Purpose: healer/herbal activity language around the Dược Sư pocket.
- Status: `NOT_STARTED` → **active isolated proof**.
- Active branch: `proof/healer-activity-kit-a`.
- First proof scope:
  - 1–2 modest herb-bed forms;
  - one small medicine-drying rack / drying mat / frame;
  - restrained healer-work props such as baskets, trays, jars, bundled herbs;
  - painterly poor-frontier xianxia treatment;
  - isolation-friendly/transparent output.
- Constraints:
  - must not overpower Healer house or Phone-PASS water/bridge;
  - avoid dense decorative clutter;
  - no topology/path/gameplay change.
- Next: produce one isolated visual candidate; integrate only after isolated visual gate passes.

### ENV-FIELD-EDGE-KIT-A
- Purpose: field/agriculture edge language implying a larger village beyond the playable slice.
- Status: `NOT_STARTED`.
- Next: defer until `ENV-HEALER-ACTIVITY-KIT-A` passes.

## Non-art architecture / QC

### SETTLEMENT-PROOF-SCENE
- Current V2-A QC lineage: `src/scenes/VillageTopologyQcScene.ts` and `src/scenes/VillageTopologyQcA4Scene.ts`.
- Risk: accepted proof work eventually needs promotion into normal production environment/GameScene rather than remaining permanently QC-only.
- Next: finish scoped C4.2 environment proof gates first; promotion is a later VERIFY task.

### TOOL-QC-CAMERA-ZOOM
- Status: `PHONE_PASS` as a QC utility.
- Presets: `1.0x`, `0.8x`, `0.65x`.
- World camera only; HUD stays screen-space.
- Next: preserve during environment proof work.

## Drive vault

`20_RUNTIME_READY` folder ID: `1pwArqr68G-3o9iXdffpDb8bMUyuR9-2f`

Subfolders:
- `00_INBOX`: `1XM05mGrxcjcwCTJXEC-rkE-z4GK2v8wY`
- `10_QC_PASS`: `1AzY928GT097WptHw7kHy4uuqTozChY7W`
- `90_ARCHIVE_REJECT`: `1EEO5QVs2F6YkBC7p266X82S4HgzOnsXW`

## Current exact next action

Produce one isolated `ENV-HEALER-ACTIVITY-KIT-A` candidate on branch `proof/healer-activity-kit-a`. Do not expand into field/agriculture or change the accepted water/bridge/topology/gameplay before that isolated proof is credible and approved for runtime integration.
