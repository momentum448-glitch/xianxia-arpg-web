# Current Project Handoff

Snapshot: 2026-09-20
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 settlement environment design / Thanh Vân Thôn topology → spatial massing

## Verified repo/runtime state

- Current main before this documentation branch: `817976dd4b2c985b82bb59783b7751ceeb76466f` (`BUILD 817976d`), merged PR #69.
- PR #69 is a temporary topology-QC build, not the final game presentation.
- Accepted runtime/art baseline remains `56b9359e8c6aeea972ae994b314537aabb2bb7bb` (`BUILD 56b9359`) from PR #63 for the merchant/settlement art snapshot.
- Merchant-area scale/layout on `56b9359`: Android Phone QC PASS.
- Do not use Remote Desktop Commander. Use GitHub + Drive connectors and Phone QC.

## Locked Thanh Vân Thôn product direction

- Identity: **poor, humble frontier village near wilderness**.
- Role: **light hub**, important early and less dominant later.
- Navigation: **clear main spine + a few small side lanes/optional branches**.
- Perceived scale: **compact playable slice that implies a larger village through edge composition**.
- Terrain: **modest stream/pond + simple bridge + field/garden language**, without becoming a traversal puzzle.

Do not reopen these choices unless the user asks.

## Phone-QC topology result

PR #69 added a dedicated topology-only scene with two switchable variants:

- **V2-A:** compact `1600 × 1800` village footprint;
- **V2-B:** expanded `1600 × 3200` village footprint.

User Phone QC on 2026-09-20 explicitly selected:

> **V2-A tốt hơn**

Therefore:

- **V2-A is the locked topology direction.**
- Do not expand Thanh Vân Thôn to 3200 just to create spacing.
- Solve separation/readability inside the compact 1800 footprint through lateral staggering, framing, negative space, density and spatial massing.
- V2-B is a rejected comparison path unless the user explicitly reopens it.

## Why V2-A was selected

The compact footprint better matches the intended starting-village feel and avoids making the village unnecessarily long. The next problem is no longer footprint length. The design task is to make each functional pocket read clearly within a tall portrait viewport that sees much of the village at once.

## Current macro sequence

North to south:

1. frontier threshold;
2. Elder pocket, west-biased;
3. Merchant pocket, east-biased;
4. Healer garden / water branch, west-biased;
5. quiet residential / field fringe / route out.

The exact footprints and massing remain design variables for the next proof; the sequence and compact topology are locked.

## Verified settlement metrics

- World: `1600 × 9000`.
- Settlement: world `y=7200..9000` → local `1600 × 1800`.
- Portrait viewport: `720 × 1280`; one viewport covers about 71% of village height.
- Player visual height: `112`.
- Player collision rectangle: `58 × 78`.
- NPC interaction radius: `155`.
- Existing house display widths: roughly `275..347`.
- Merchant Phone-PASS widths: stall `270`, cart `180`, goods `135`, sign `60`.

Design consequence: vertical distance alone cannot separate zones. Each zone needs distinct lateral bias, framing, activity, foreground/background mass and negative space.

## Environment workflow now locked

For substantial map work:

1. purpose / fantasy;
2. topology;
3. topology-only Phone QC;
4. spatial massing with primitives;
5. Phone QC;
6. restore accepted production art for context compatibility;
7. identify real asset gaps;
8. produce only needed assets;
9. runtime integration;
10. Phone QC.

Do not jump from topology directly to new production PNGs.

## Next proof: V2-A spatial massing

Build a dedicated **V2-A spatial-massing proof** using primitives only.

Goals:

- retain the 1800-high footprint;
- make Elder, Merchant and Healer read as separate places despite the tall viewport;
- replace giant debug ellipses with believable mass relationships;
- test building footprints / tree masses / fences / courtyards / water / field edges as simple blocks;
- keep the main spine immediately readable;
- keep Healer water off the critical route;
- make residential/field scale mostly edge/background implication rather than a large UI-obscured focal zone;
- use no new production assets yet.

### Primary Phone-QC question

**Within the compact V2-A footprint, do the Elder, Merchant and Healer pockets now feel like separate places connected by one village, without clutter or a corridor-like map?**

## Existing accepted art that must not be regenerated

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

Accepted assets stay preserved outside the temporary primitive QC flow.

## Runtime/gameplay constraints that must not regress

- Mobile browser portrait 9:16.
- Manual `ATK + SKILL + NÉ` combat.
- One flying sword per attack press.
- Base attack range 205 + future bonus.
- Base cooldown 800 ms through `basicAttackSpeedPct`.
- Settlement safe zone and NPC interaction remain intact in production runtime.
- Third-Kiếp-Ảnh projectile cleanup freeze fix must not regress.
- Art/layout work must not alter gameplay hitboxes/timing unless explicitly requested.

## Failed / rejected paths

- **V2-B 3200-height village:** rejected by Phone QC in favor of V2-A.
- Old mixed-art macro proof: difficult to QC because accepted art obscured new blockout information.
- Giant diagnostic ellipses are useful for topology debug but are not a spatial-massing solution.
- Do not return to ad-hoc `house + tree + fence + rock + lamp` stamping.
- Do not regenerate DESIGN_PASS / PHONE_PASS assets for layout problems.
- Do not create a broad prop kit before spatial massing proves what is actually missing.
- Do not use Remote Desktop Commander.

## Exact next action

Create a reversible **V2-A spatial-massing-only runtime proof**, deploy it, and ask for Phone QC. Do not restore production art or make new PNGs until this proof passes.

## PASS gate before context restore / asset production

V2-A massing must prove:

- critical route is immediately readable;
- Elder / Merchant / Healer each have distinct spatial identity;
- zones do not rely on large debug circles to be understood;
- water improves healer/agriculture logic without blocking movement;
- residential/field edges imply more village beyond the authored slice;
- phone UI does not hide a required focal landmark;
- Phone QC says the compact layout works.

## Resume sentence

Resume from `main` build `817976d`: topology-only comparison is complete and Phone QC selected **V2-A compact 1600 × 1800** over V2-B; next action is a primitive-only V2-A spatial-massing proof before restoring accepted art or creating any new assets.
