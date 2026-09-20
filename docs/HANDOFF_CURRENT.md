# Current Project Handoff

Snapshot: 2026-09-20 18:18 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn V2-A Healer water + bridge production proof
Active branch: `proof/healer-water-bridge-a`

## Verified repo/runtime state

- `main` at proof start: `74b34625d90a3480dd503af57bc3469002290f83`.
- Visible deployed build during final ground/path Phone QC: `BUILD 74b3462`.
- The runtime path-rhythm candidate itself came from merged PR #75 / merge commit `3ecba627ec8d3b824cd2bb7eeed73f0a6c47cbdc`; commits after it on main were documentation-only.
- PR #75 `Tune V2-A path rhythm after phone QC` is merged.
- Current proof branch was created from `74b34625` after Phone QC acceptance of the tuned ground/path.
- Live QC URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/`.
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

History:

- PR #74 restored the accepted ground kit onto V2-A.
- First Phone QC on build `392d5a7` found the road too dominant at 0.65x, a possible center-groove impression, and a weak Healer branch.
- PR #75 made only a small reversible rhythm tune: slimmer/lighter spine, softer guide, stronger Healer branch, quieter non-Healer forecourts.
- No new art, topology, gameplay, collision, NPC, hitbox or timing change was made.

Final Phone QC evidence on 2026-09-20:

- **0.65x PASS**: main road no longer dominates the village; Elder-left → Merchant-right → Healer-left rhythm and negative space remain readable; no dark-ribbon or central-groove impression is blocking composition.
- **1.0x PASS**: Healer branch reads clearly into the Dược Sư pocket without becoming a second dominant road; movement corridor remains readable.

Decision: **Ground/path P0 = PHONE_PASS. Do not reopen or regenerate this layer without a new concrete Phone-QC problem.**

## Current production proof

Asset ID: `ENV-HEALER-WATER-BRIDGE-A`

Purpose:

- establish the first production-quality natural/functional landmark for the Dược Sư pocket;
- replace only the current water + simple bridge blockout;
- support healer/garden identity without turning the settlement into a traversal puzzle.

Current runtime blockout in `src/scenes/VillageTopologyQcScene.ts`:

- pond around `(235, 1430)`, roughly `285 × 170`;
- shallow stream extension around `(365, 1490)`, roughly `250 × 80`;
- simple bridge around `(350, 1448)`, roughly `140 × 36`, slight rotation;
- herb beds remain blockout-only and are explicitly outside this proof.

Proof scope:

- small irregular shallow pond/stream language;
- one simple humble wooden footbridge;
- painterly restrained xianxia treatment;
- muted settlement-compatible values;
- readable at portrait phone scale;
- off the critical spine;
- no gameplay collision or traversal mechanic change.

Out of scope until this proof passes:

- herb beds / drying racks / medicine props;
- broad Healer activity kit;
- field/agriculture kit;
- topology changes;
- gameplay hitbox/timing changes.

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
- Remote Desktop Commander: explicitly prohibited by user.

## Exact next actions

1. Produce the smallest isolated production candidate for `ENV-HEALER-WATER-BRIDGE-A`: water/shore language + one simple bridge only.
2. Integrate that candidate into the existing Healer blockout footprint without changing topology/gameplay.
3. Deploy and Phone QC at 1.0x first, then 0.65x context. Expand only if PASS.

## PASS gate for ENV-HEALER-WATER-BRIDGE-A

The proof passes only if:

- the water reads immediately as modest village pond/stream, not a large scenic lake;
- the bridge reads as a simple poor-frontier wooden footbridge, not a hero landmark;
- water/bridge visually belongs to the accepted settlement art;
- the Dược Sư pocket becomes clearer without stealing hierarchy from Elder/Merchant;
- the critical path remains visually obvious;
- player movement/readability remains clean at 1.0x;
- composition remains balanced at 0.65x;
- Phone QC says PASS.

## Resume sentence

Resume on branch `proof/healer-water-bridge-a`: V2-A topology, massing, accepted-art context, QC zoom, and ground/path P0 are all Phone PASS. Do not touch accepted road/house/merchant art. The next smallest task is one isolated `ENV-HEALER-WATER-BRIDGE-A` production proof using the existing Healer water/bridge blockout footprint, then runtime integration and Phone QC before any healer/activity expansion.
