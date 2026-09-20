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
- Next action: preserve topology/massing; finish ground/path Phone QC before producing new art.

### ENV-SETTLEMENT-GROUND-KIT-A

- Purpose: painterly road/ground continuity.
- Asset/design status: `PHONE_PASS` as an accepted reusable settlement ground kit from earlier settlement work.
- Current V2-A placement status: `REVISE` → revised candidate integrated on runtime build `3ecba62`; awaiting Phone QC.
- Runtime files:
  - `public/assets/c4/environment/settlement/env_settlement_path_seg_a.png`
  - `public/assets/c4/environment/settlement/env_settlement_path_seg_b.png`
  - `public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png`
  - `public/assets/c4/environment/settlement/env_settlement_forecourt_a.png`
- PR #74 restored the accepted kit onto V2-A topology.
- Phone QC of build `392d5a7` found the V2-A road too visually dominant at 0.65x, a faint center-guide/groove impression, and a weak Healer branch.
- PR #75 reused the same assets and changed placement/display rhythm only:
  - main path widths reduced roughly 10–15%;
  - path/patch visual weight reduced;
  - route-guide line softened;
  - Healer branch strengthened;
  - non-Healer forecourt dominance reduced slightly.
- No new ground PNGs were created.
- Next action: Phone QC build `3ecba62` at 0.65x and 1.0x. Mark V2-A ground/path placement `PHONE_PASS` only after user acceptance.

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
- Verified historical metadata:
  - PNG, RGBA
  - 128 × 89
  - 22,633 bytes
  - SHA-256 `f047b6d275dbce9c50c6f3a00ae236b9a489f7bd4e2182f0b42cf3f60e45304f`
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
- Phone QC:
  - tree visual accepted after runtime alpha/background repair path;
  - fence accepted;
  - rock/grass accepted;
  - lantern accepted.
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
- Canonical display widths in current proof scene:
  - stall: 270
  - cart: 180
  - goods: 135
  - sign: 60
- Drive backups in `20_RUNTIME_READY/10_QC_PASS`:
  - stall `env_merchant_stall_b.png` → `1zIpOgs_JTTUJXeaTdDDn2SgO4dZuJdL4`
  - cart `env_merchant_cart_b.png` → `1xftok68r_D_f_sl1Sjmcx8InHQ9zWB0T`
  - goods `env_merchant_goods_b.png` → `1okipyi9GsU2BWGlS4XZapuzqPBEFUOqX`
  - sign `env_merchant_sign_b.png` → `1_ta2f0wNJD6hH2eJgqtIlqJiBYumJco4`
- Phone QC result:
  - scale matches settlement world;
  - no black background / halo blocker;
  - vignette reads clearly as merchant area;
  - path/player readability preserved;
  - user explicitly accepted current result.
- Composition companion decision: the lower tile-roof house at `x=1210, settlement top+1090` is removed in the accepted earlier proof composition to reduce clutter; grounding wash remains.
- Next action: preserve. Do not generate a new merchant kit unless explicitly revised.

## 7. Current healer / agriculture asset gaps

### ENV-HEALER-WATER-BRIDGE-A

- Purpose: first new production proof for the Dược Sư pocket after V2-A ground/path passes.
- Status: `NOT_STARTED`.
- Intended scope: small pond/stream language + simple wooden bridge only.
- Constraint: off the critical spine; should support healer/garden identity without turning settlement into a traversal puzzle.
- Next action: do not start until build `3ecba62` ground/path receives Phone QC PASS.

### ENV-HEALER-ACTIVITY-KIT-A

- Purpose: herb beds / medicine-drying / healer activity language.
- Status: `NOT_STARTED`.
- Next action: defer until water/bridge proof passes.

### ENV-FIELD-EDGE-KIT-A

- Purpose: field/agriculture edge language that implies a larger village beyond the authored slice.
- Status: `NOT_STARTED`.
- Next action: defer; avoid creating a broad residential prop kit before higher-priority proofs pass.

## 8. Current critical non-art architecture note

### SETTLEMENT-PROOF-SCENE

- Purpose: historical/current integration path for settlement production props/merchant proof.
- Status: active implementation lineage, not a visual asset.
- Earlier file: `src/scenes/SettlementPropsProofScene.ts`.
- Current V2-A environment QC file: `src/scenes/VillageTopologyQcScene.ts`.
- Risk: accepted proof work eventually needs promotion back into the normal `GameScene`/environment path rather than remaining a permanent QC scene.
- Next action: finish V2-A environment proof gates first; promotion is a later VERIFY task.

## 9. QC camera utility

### TOOL-QC-CAMERA-ZOOM

- Purpose: let Phone QC inspect micro, zone and macro composition without changing production camera intent.
- Status: `PHONE_PASS` as a QC utility.
- Presets: `1.0x`, `0.8x`, `0.65x`.
- Scope: world camera only; HUD remains fixed screen-space; camera follows player.
- Important: test/QC tool, not gameplay feature.
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

Before changing chat or starting a new production branch, verify:

- exact current `main`;
- relevant PR/branch state;
- all important runtime assets are in GitHub;
- all critical source/recovery assets have a durable Drive/Project Sources location;
- this registry matches current PHONE PASS / REVISE state;
- `HANDOFF_CURRENT.md` names the exact next action and pass gate.

Current exact next action is **Phone QC runtime build `3ecba62` for the V2-A path-rhythm tune**. Do not create new healer/water/field production art until that gate passes.
