# Current Project Handoff

Snapshot: 2026-09-20
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 settlement environment design / Thanh Vân Thôn macro blockout

## Verified repo/runtime state

- Accepted runtime/art baseline: `56b9359e8c6aeea972ae994b314537aabb2bb7bb` (`BUILD 56b9359`), from PR #63.
- Merchant-area scale/layout on that build: Android Phone QC PASS.
- Environment/level-design knowledge base merged later in PR #65; documentation-only.
- Main before this design-doc branch: `ccda05053014b2c64e58ad402c7c434992d31acf`.
- Current design branch: `docs/thanh-van-thon-design-v1`.
- Do not use Remote Desktop Commander. Use GitHub + Drive connectors and Phone QC.

## Current user direction

The user approved a structured redesign of Thanh Vân Thôn at map level before more broad art production.

Locked V1 choices:

- village identity: **poor, humble frontier village near wilderness**;
- role: **light hub**, important early and less dominant later;
- navigation: **clear main spine + a few small side lanes/optional branches**;
- perceived scale: **compact playable slice that implies a larger village through edge composition**;
- terrain: **modest stream/pond + simple bridge + field/garden language**, without turning the village into a traversal puzzle.

Do not reopen these choices unless the user asks.

## New Thanh Vân Thôn design documents

Read before implementing village layout changes:

```text
docs/environment/maps/THANH_VAN_THON_ENVIRONMENT_DESIGN_V1.md
docs/environment/maps/THANH_VAN_THON_MACRO_SCHEMATIC_V1.md
```

They use the project environment system:

```text
docs/environment/README.md
docs/environment/XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md
```

## Verified settlement metrics used by V1

- World: `1600 × 9000`.
- Settlement: world `y=7200..9000` → local `1600 × 1800`.
- Portrait viewport: `720 × 1280`; one viewport covers about 71% of village height.
- Player spawn: world `(800,8150)` → local `(800,950)`.
- Player visual height: `112`.
- Player collision rectangle: `58 × 78`.
- NPC interaction radius: `155`.
- Mặc Trưởng Lão: local `(650,400)`.
- Lục Chưởng Quầy: local `(955,860)`.
- Thanh Dược Sư: local `(650,1310)`.
- Existing house display widths: roughly `275..347`.
- Merchant Phone-PASS widths: stall `270`, cart `180`, goods `135`, sign `60`.
- Current environment art does not provide navigation collision; player is clamped only by world edges.

Important design consequence: because the portrait camera is tall relative to the 1800-high settlement, zones must be separated through **lateral offset, framing, activity and density**, not only vertical distance.

## Thanh Vân Thôn V1 topology

Chosen topology: **spine + branches**.

Macro sequence north to south:

1. frontier threshold;
2. Elder court, west-center;
3. Merchant crossroads, east-center;
4. Healer garden / water branch, west-center;
5. quiet residential / field fringe with edge dressing.

The merchant area remains the accepted visual anchor. Do not regenerate or rescale its accepted V2 assets.

Water belongs near the healer/agricultural branch and should not cross the critical north-south route in the first proof.

## Current art/runtime state that must not regress

- Mobile browser portrait 9:16.
- Manual `ATK + SKILL + NÉ` combat.
- One flying sword per attack press.
- Base attack range 205 + future bonus.
- Base attack cooldown 800ms through `basicAttackSpeedPct`.
- Settlement safe zone and NPC interaction remain intact.
- Third-Kiếp-Ảnh projectile cleanup freeze fix must not regress.
- Production art direction: restrained ink-wash, moderate anime, muted earth/ink/jade, phone readability first.
- Art integration must not alter gameplay hitboxes/timing unless explicitly requested.

## Existing settlement assets that remain accepted

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

Merchant V2 Drive backups remain recorded in `PROJECT_SOURCES.md` / `ASSET_REGISTRY.md`.

## Important proof-scene architecture

`src/main.ts` currently runs:

```text
CharacterSelectScene
SettlementPropsProofScene
```

`SettlementPropsProofScene` extends `GameScene` and overlays the accepted settlement prop/merchant proof.

Before broad production expansion, VERIFY whether accepted proof work should eventually graduate into the normal runtime scene. For the next macro blockout, using the proof scene is acceptable if it keeps the experiment isolated and reversible.

## Failed / forbidden paths

- Do not regenerate DESIGN_PASS houses/merchant assets for layout or scale issues.
- Do not return to `house + tree + fence + rock + lamp` stamping.
- Do not generate a broad prop kit before the macro blockout proves a real need.
- Do not use corrupt-PNG salvage output.
- Do not repeat opaque chunked/base64 PNG staging when verified source transport exists.
- Do not treat concept/mockup images as runtime assets.
- Do not change gameplay hitboxes/timing during environment art proof.
- Do not use Remote Desktop Commander.

## Current ASSUME / VERIFY

### ASSUME

Keep current player spawn `(800,8150)` for the first macro blockout. Moving spawn is a separate gameplay/pacing decision and should only be raised if Phone QC shows the opening read is weak.

### VERIFY in next proof

- whether west/east staggering is enough to make Elder/Merchant/Healer read as separate zones;
- whether existing house/prop assets are sufficient to imply residential scale;
- whether one small healer-side water feature improves logic without hurting route readability;
- whether world-edge dressing looks believable despite no environment collision;
- whether accepted proof architecture is still the best temporary place for this test.

## Exact next action

Create a **runtime macro blockout proof** from the accepted settlement baseline:

- preserve the current merchant Phone-PASS cluster;
- add only cheap/reversible diagnostic composition for the V1 topology;
- prove north threshold, Elder quiet pocket, healer water/agriculture branch, and residential edge massing;
- use placeholders/existing assets only;
- create no new production PNGs yet;
- deploy and require Phone QC.

### Blockout validation question

**Does Thanh Vân Thôn read on phone as a humble frontier village with a clear main spine, three distinct functional pockets, modest natural terrain, and the suggestion of a larger settlement without becoming cluttered?**

## PASS gate before new village asset production

Do not create new water/bridge/herb/residential production art until the blockout proves:

- critical route is immediately readable;
- Merchant remains clear and unchanged in quality;
- Elder and Healer have distinct spatial identity;
- water is useful and non-obstructive;
- edge dressing creates scale without demanding many full houses;
- Phone QC says the macro composition works.

## Resume sentence

Resume from accepted runtime/art build `56b9359` plus Thanh Vân Thôn V1 design docs: poor frontier village, light hub, spine + small branches, compact playable slice with larger-village illusion, healer-side modest water/agriculture; next action is a reversible runtime macro blockout before any new village production asset.