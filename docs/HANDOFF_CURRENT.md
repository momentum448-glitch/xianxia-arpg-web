# Current Project Handoff

Snapshot: 2026-09-20 22:48 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn V2-A Healer activity production proof
Active branch: `proof/healer-activity-kit-a`

## Verified repo/runtime state

- Current `main`: `6fd3477f43c390418b0254abb75bee38fc791570`.
- PR #82 `Tune Healer A4 scale and hierarchy` is merged.
- CI and GitHub Pages deployment for `6fd3477` passed.
- Ground/path P0 is `PHONE_PASS`.
- `ENV-HEALER-WATER-BRIDGE-A` is now `PHONE_PASS` after 1.0x + 0.65x Phone QC.
- Active proof branch: `proof/healer-activity-kit-a`.
- Live QC URL remains `https://momentum448-glitch.github.io/xianxia-arpg-web/`.
- Do not use Remote Desktop Commander. Use GitHub + Drive connectors and Phone QC.

## Locked Thanh Vân Thôn direction

- Poor, humble frontier village near wilderness.
- Light hub: important early, less dominant later.
- Clear main spine + a few small branches.
- Compact authored slice that implies a larger village at the edges.
- Modest stream/pond + simple bridge + field/garden language, not a traversal puzzle.

## Locked topology / composition

- Selected footprint: **V2-A, 1600 × 1800**.
- V2-B, 1600 × 3200, is rejected unless the user explicitly reopens it.
- North → south hierarchy:
  1. frontier threshold;
  2. Elder pocket, west-biased;
  3. Merchant pocket, east-biased;
  4. Healer garden / water pocket, west-biased;
  5. residential / field fringe and route out.
- V2-A topology: Phone QC PASS.
- V2-A spatial massing build `b6b47ee`: Phone QC PASS.
- Accepted-art CONTEXT compatibility: PASS.
- QC camera zoom `1.0x → 0.8x → 0.65x`: PASS as a test utility.

## Ground/path P0 — PHONE PASS

Accepted ground kit reused without regeneration:

```text
public/assets/c4/environment/settlement/env_settlement_path_seg_a.png
public/assets/c4/environment/settlement/env_settlement_path_seg_b.png
public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png
public/assets/c4/environment/settlement/env_settlement_forecourt_a.png
```

Final Phone QC:

- **0.65x PASS**: main road no longer dominates the village; Elder-left → Merchant-right → Healer-left rhythm and negative space remain readable; no dark-ribbon or central-groove impression is blocking composition.
- **1.0x PASS**: Healer branch reads clearly into the Dược Sư pocket without becoming a second dominant road; movement corridor remains readable.

Decision: **Ground/path P0 = PHONE_PASS. Do not reopen or regenerate this layer without a new concrete Phone-QC problem.**

## Healer water + bridge — PHONE PASS

Asset ID: `ENV-HEALER-WATER-BRIDGE-A`

Accepted runtime asset:

```text
public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp
```

Accepted runtime presentation on build `6fd3477`:

- display size `440 × 247`;
- warm tint + alpha `0.96`;
- bridge correctly crosses the narrow water gap and connects both banks;
- 1.0x Phone QC: scale/readability PASS;
- 0.65x Phone QC: water/bridge no longer steals hierarchy from Healer house / village spine.

Decision: **`ENV-HEALER-WATER-BRIDGE-A = PHONE_PASS`. Preserve it and do not regenerate/retune without a new concrete Phone-QC issue.**

## Current production proof

Asset ID: `ENV-HEALER-ACTIVITY-KIT-A`

Purpose:

- make the Dược Sư pocket read as a working healer/herbalist space;
- add activity language without turning the pocket into a dense prop pile;
- preserve water/bridge, house, path, topology and gameplay.

Current proof assets:

```text
public/assets/c4/environment/settlement/env_healer_herb_bed_a.webp
public/assets/c4/environment/settlement/env_healer_drying_props_a.webp
```

Current proof scene:

```text
src/scenes/VillageTopologyQcHealerActivityScene.ts
```

Proof scope:

- one compact herb garden replacing the three green herb-bed blockout strips;
- one small drying/work cluster with hanging herbs, jars/baskets/table language;
- no broad field-edge kit;
- no topology/path/house/gameplay/hitbox/timing change.

Working placement:

- herb garden around `(575, 1450)`, display `205 × 126`;
- drying/work cluster around `(548, 1340)`, display `112 × 124`.

## Current proof pass gate

`ENV-HEALER-ACTIVITY-KIT-A` passes only if:

- 1.0x: herb garden and drying/work cluster read immediately as healer activity;
- no obvious rectangular background/halo/sticker artifact;
- props remain subordinate to the Healer house and water/bridge;
- 0.65x: pocket remains legible and not cluttered;
- main spine and player movement readability remain clean;
- Phone QC says PASS.

## Accepted assets that must not be regenerated

Houses:

```text
env_house_thatch_a.png
env_house_tile_a.png
env_house_hall_a.png
env_house_thatch_b.png
```

General props:

```text
env_tree_village_a.png
env_fence_village_a.png
env_rockgrass_village_a.png
env_lanternpost_village_a.png
```

Merchant Kit B:

```text
env_merchant_stall_b.png
env_merchant_cart_b.png
env_merchant_goods_b.png
env_merchant_sign_b.png
```

Accepted Merchant display widths: stall 270, cart 180, goods 135, sign 60.

Healer water/bridge:

```text
env_healer_water_bridge_a.webp
```

## Runtime/gameplay constraints that must not regress

- Mobile browser portrait 9:16.
- Manual `ATK + SKILL + NÉ` combat in production runtime.
- One flying sword per attack press.
- Base attack range 205 + future bonus.
- Base cooldown 800 ms through `basicAttackSpeedPct`.
- Settlement safe zone and NPC interaction remain intact in production runtime.
- Third-Kiếp-Ảnh projectile cleanup freeze fix must not regress.
- Environment proof must not alter gameplay hitboxes or timing.

## Failed / rejected paths

- V2-B 3200-height village: rejected by Phone QC.
- Mixed old-art macro proof: too noisy to judge topology.
- Giant zone ellipses: diagnostic only.
- Ad-hoc `house + tree + fence + rock + lamp` stamping: rejected workflow.
- Asset-by-asset environment production before topology: rejected workflow.
- Regenerating DESIGN_PASS / PHONE_PASS assets for scale/layout problems: prohibited.
- Repeated SVG/prototype patching for water/bridge: rejected in favor of painterly raster proof.
- Healer water/bridge PNG transport caused black rectangle / missing runtime art; validated WebP path fixed this.
- Remote Desktop Commander: explicitly prohibited by user.

## Exact next actions

1. Finish wiring the current Healer activity proof assets into the proof branch.
2. CI/build the branch and merge only if clean.
3. Deploy Pages.
4. Phone QC at **1.0x first**, then **0.65x**.
5. If PASS, lock `ENV-HEALER-ACTIVITY-KIT-A = PHONE_PASS` before opening `ENV-FIELD-EDGE-KIT-A`.

## Resume sentence

Resume on `proof/healer-activity-kit-a`: V2-A topology, massing, accepted-art context, QC zoom, ground/path P0, and `ENV-HEALER-WATER-BRIDGE-A` are all Phone PASS. Preserve accepted assets. The current proof is one compact herb garden + one drying/work cluster only; finish runtime integration, CI/deploy, then Phone QC at 1.0x and 0.65x before any field-edge expansion.
