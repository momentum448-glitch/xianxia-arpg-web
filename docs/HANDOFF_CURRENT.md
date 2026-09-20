# Current Project Handoff

Snapshot: 2026-09-20
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 settlement environment design / Thanh Vân Thôn CONTEXT restore

## Verified repo/runtime state

- Current main before this context branch: `b6b47ee18f04cad907e57fe1049cf3161d4ff358` (`BUILD b6b47ee`), merged PR #71.
- PR #71 is the V2-A primitive spatial-massing QC build.
- User Phone QC explicitly passed that massing on 2026-09-20: **“Pass rồi đấy”**.
- Accepted production-art baseline for settlement/merchant remains `56b9359e8c6aeea972ae994b314537aabb2bb7bb` (`BUILD 56b9359`).
- Do not use Remote Desktop Commander. Use GitHub + Drive connectors and Phone QC.

## Locked Thanh Vân Thôn direction

- Poor, humble frontier village near wilderness.
- Light hub: important early, less dominant later.
- Clear main spine + a few small branches.
- Compact authored slice that implies a larger village at the edges.
- Modest stream/pond + simple bridge + field/garden language, not a traversal puzzle.

## Locked topology and massing

- Selected footprint: **V2-A, 1600 × 1800**.
- Rejected comparison: V2-B, 1600 × 3200, unless user explicitly reopens it.
- Macro sequence north → south:
  1. frontier threshold;
  2. Elder pocket, west-biased;
  3. Merchant pocket, east-biased;
  4. Healer garden / water pocket, west-biased;
  5. residential / field fringe and route out.
- Phone QC PASS on V2-A massing build `b6b47ee` proves the compact footprint can separate zones using lateral staggering, framing, negative space and edge massing.

Do not reopen footprint length or return to giant zone ellipses unless a later Phone QC exposes a concrete problem.

## Environment workflow gate

Current workflow is:

1. purpose / fantasy — PASS;
2. topology — PASS;
3. topology-only Phone QC — PASS, V2-A selected;
4. spatial massing — PASS on `b6b47ee`;
5. accepted-art CONTEXT restore — **CURRENT GATE**;
6. identify real asset gaps;
7. produce only needed assets;
8. runtime integration;
9. Phone QC.

Do not create new village production PNGs until CONTEXT restore passes.

## Current context proof

Branch: `proof/thanh-van-thon-v2a-context`
PR: #72

The context proof restores only accepted production assets onto the V2-A massing:

- houses: Thatch A, Tile A, Hall A, Thatch B;
- general props: accepted tree, fence, rock/grass, lantern;
- Merchant Kit B at accepted world scale: stall 270, cart 180, goods 135, sign 60;
- tree uses the existing runtime RGBA normalization path to avoid the known dark-background artifact.

Still blockout-only because no production asset is approved yet:

- healer pond/stream;
- simple bridge;
- herb-bed rows;
- field rows.

No new art is generated for this proof.

## Existing accepted assets that must not be regenerated

Houses:

```text
public/assets/c4/environment/settlement/env_house_thatch_a.png
public/assets/c4/environment/settlement/env_house_tile_a.png
public/assets/c4/environment/settlement/env_house_hall_a.png
public/assets/c4/environment/settlement/env_house_thatch_b.png
```

General props:

```text
env_tree_village_a.png
env_fence_village_a.png
env_rockgrass_village_a.png
env_lanternpost_village_a.png
```

Merchant V2:

```text
env_merchant_stall_b.png
env_merchant_cart_b.png
env_merchant_goods_b.png
env_merchant_sign_b.png
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
- Mixed old-art macro proof: hard to QC because existing art obscured new topology information.
- Giant zone ellipses: diagnostic only, not a composition solution.
- Ad-hoc `house + tree + fence + rock + lamp` stamping: rejected workflow.
- Do not regenerate DESIGN_PASS / PHONE_PASS assets for layout problems.
- Do not create a broad prop kit before context proof exposes actual gaps.
- Do not use Remote Desktop Commander.

## Exact next action

Finish PR #72, verify CI + Pages deploy, then ask for Phone QC on the V2-A CONTEXT restore.

### Phone-QC pass question

**With labels hidden, does the accepted art preserve the massing hierarchy: Elder / Merchant / Healer still read as separate places, the main route stays clear, and the village still feels compact rather than cluttered?**

## PASS gate before asset-gap planning

Do not create new water / bridge / healer / residential assets until context restore proves:

- Elder, Merchant and Healer remain spatially distinct with real accepted art;
- Merchant remains readable at its accepted scale;
- accepted houses/props do not collapse the negative-space rhythm;
- main spine remains readable;
- edge houses imply a larger village without becoming focal clutter;
- phone UI does not hide a required landmark;
- Phone QC says CONTEXT passes.

## Resume sentence

Resume from V2-A topology + spatial massing Phone PASS (`b6b47ee`); PR #72 restores only accepted art onto that layout, with water/bridge/herb/field still primitive. Next gate is Phone QC of CONTEXT before producing any new environment asset.
