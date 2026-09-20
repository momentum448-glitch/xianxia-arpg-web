# Current Project Handoff

Snapshot: 2026-09-20 18:00 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn V2-A ground-path Phone QC

## Verified repo/runtime state

- Runtime/code baseline before handoff docs: `3ecba627ec8d3b824cd2bb7eeed73f0a6c47cbdc` (`BUILD 3ecba62`).
- PR #75 `Tune V2-A path rhythm after phone QC` is merged.
- Main CI for `3ecba62`: PASS.
- GitHub Pages deploy for `3ecba62`: PASS.
- Live QC URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/`.
- A documentation-only handoff snapshot was added after that runtime commit. Do not confuse later docs-only main SHA with the runtime build label.
- Do not use Remote Desktop Commander. Use GitHub + Drive connectors and Phone QC.

## Locked Thanh Vân Thôn direction

- Poor, humble frontier village near wilderness.
- Light hub: important early, less dominant later.
- Clear main spine + a few small branches.
- Compact authored slice that implies a larger village at the edges.
- Modest stream/pond + simple bridge + field/garden language, not a traversal puzzle.

## Locked topology / composition

- Selected footprint: **V2-A, 1600 × 1800**.
- Rejected comparison: V2-B, 1600 × 3200, unless user explicitly reopens it.
- North → south:
  1. frontier threshold;
  2. Elder pocket, west-biased;
  3. Merchant pocket, east-biased;
  4. Healer garden / water pocket, west-biased;
  5. residential / field fringe and route out.
- V2-A topology Phone QC: PASS.
- V2-A spatial massing build `b6b47ee`: Phone QC PASS.
- Accepted-art context restore: judged PASS from Phone QC screenshots; Elder / Merchant / Healer remain distinct and negative-space rhythm survives real art.
- Do not reopen footprint length, giant zone ellipses, or ad-hoc prop stamping unless a later Phone QC exposes a concrete problem.

## QC camera tool

Phone QC requested and accepted a debug zoom tool:

- cycle: `1.0x → 0.8x → 0.65x → 1.0x`;
- world camera zoom only;
- HUD / joystick / QC buttons stay screen-space;
- camera still follows player;
- test/QC tool only, not a gameplay camera feature.

Phone QC explicitly said zoom is OK and it materially improves full-village composition review.

## Ground/path proof state

Accepted ground kit reused, not regenerated:

```text
public/assets/c4/environment/settlement/env_settlement_path_seg_a.png
public/assets/c4/environment/settlement/env_settlement_path_seg_b.png
public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png
public/assets/c4/environment/settlement/env_settlement_forecourt_a.png
```

PR #74 restored this accepted kit onto locked V2-A topology.

Phone QC of build `392d5a7` found:

- overall village hierarchy still good;
- path too visually dominant / too thick at 0.65x;
- faint route-guide/core line could read like a groove;
- Healer/Dược Sư branch weaker than Elder/Merchant branches.

User approved a small reversible revise pass.

PR #75 implemented exactly that:

- slim main path pieces roughly 10–15%;
- lower path and ground-patch visual weight;
- soften route-guide line;
- strengthen only the Healer branch;
- slightly reduce forecourt dominance outside Healer;
- no new assets;
- no topology, gameplay, collision, NPC interaction, hitbox, or timing changes.

Current runtime build for this gate: **`3ecba62`**.

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

Accepted Merchant display widths:

```text
stall 270
cart 180
goods 135
sign 60
```

## Current asset gaps

Still blockout-only / not production-approved:

- Healer pond/stream;
- simple bridge;
- herb-bed / medicine activity props;
- field/agriculture language.

Do not start broad Healer prop production yet.

## Environment workflow gate

Current sequence:

1. purpose/fantasy — PASS;
2. topology — PASS;
3. topology Phone QC — PASS, V2-A selected;
4. spatial massing — PASS;
5. accepted-art CONTEXT compatibility — PASS;
6. QC zoom utility — PASS;
7. ground/path restore — REVISE after first phone pass;
8. ground/path rhythm tune — **CURRENT PHONE-QC GATE** on build `3ecba62`;
9. only after PASS: first new production proof = Healer water + simple bridge;
10. integrate → Phone QC → expand one proof at a time.

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
- Giant zone ellipses: diagnostic only, not a composition solution.
- Ad-hoc `house + tree + fence + rock + lamp` stamping: rejected workflow.
- Ad-hoc asset-by-asset environment production before topology: rejected workflow.
- Regenerating DESIGN_PASS / PHONE_PASS assets for scale/layout problems: prohibited.
- Remote Desktop Commander: explicitly prohibited by user.

## Exact next action

Phone QC **build `3ecba62`** before creating any new environment asset.

Check two views:

1. `0.65x`: main road no longer dominates the village; Elder-left → Merchant-right → Healer-left rhythm and negative space remain readable.
2. `1.0x`: Healer branch is clear enough to connect naturally into the Dược Sư pocket without becoming another dominant road.

If Phone QC PASS:

- lock ground/path P0;
- update continuity docs;
- start exactly one new production proof: **Healer water + simple bridge**;
- do not broaden into full healer kit until that proof passes runtime + phone.

## PASS gate

Ground/path P0 passes only if:

- path reads as natural village ground, not a dark continuous ribbon;
- no central groove/debug-line impression remains;
- Healer branch is visible without becoming visually dominant;
- Elder / Merchant / Healer hierarchy remains readable at 0.65x;
- movement corridor remains readable at 1.0x;
- Phone QC says PASS.

## Durable snapshot

A point-in-time handoff copy also exists at:

`docs/HANDOFF_SNAPSHOT_2026-09-20_1800.md`

## Resume sentence

Resume from runtime build `3ecba62`: V2-A topology, massing, accepted-art context and QC zoom are already accepted; PR #75 has already tuned road rhythm after the user's 0.65x feedback. The immediate gate is Phone QC of the tuned road before producing the first new Healer water/bridge asset proof.
