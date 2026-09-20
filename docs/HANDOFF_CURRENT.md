# Current Project Handoff

Snapshot: 2026-09-20 21:48 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn V2-A Healer activity production proof
Active branch: `proof/healer-activity-kit-a`

## Verified repo/runtime state

- `main`: `6fd3477f43c390418b0254abb75bee38fc791570`.
- Visible Phone-QC build accepted for Healer water/bridge: `BUILD 6fd3477`.
- PR #82 `Tune Healer A4 scale and hierarchy` merged.
- CI on `main` for `6fd3477`: PASS.
- GitHub Pages deploy for `6fd3477`: PASS.
- Live QC: `https://momentum448-glitch.github.io/xianxia-arpg-web/`.
- Do not use Remote Desktop Commander. Use GitHub / approved connectors + Phone QC.

## Locked Thanh Vân Thôn direction

- Poor, humble frontier village near wilderness.
- Light hub: important early, less dominant later.
- Clear main spine + a few small branches.
- Compact authored slice that implies a larger settlement at the edges.
- Modest stream/pond + simple bridge + field/garden language, not a traversal puzzle.
- Selected footprint: **V2-A, 1600 × 1800**.
- V2-B, 1600 × 3200, remains rejected unless explicitly reopened.

## Locked environment gates

- V2-A topology: `PHONE_PASS`.
- Spatial massing: `PHONE_PASS`.
- Accepted-art CONTEXT compatibility: `PASS`.
- QC zoom `1.0x → 0.8x → 0.65x`: `PASS` as a test utility.
- Ground/path P0: `PHONE_PASS`.
- Houses / settlement prop kit / Merchant Kit B: accepted; do not regenerate without a new concrete REVISE.

## ENV-HEALER-WATER-BRIDGE-A — PHONE PASS

Canonical runtime asset:

`public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp`

Runtime integration:

`src/scenes/VillageTopologyQcA4Scene.ts`

Accepted presentation on build `6fd3477`:

- display size about `440 × 247`;
- subtle warm tint + alpha `0.96` to keep hierarchy restrained;
- bridge crosses the narrow water gap and connects the two banks;
- water + bridge remain off the critical spine;
- no gameplay collision, hitbox or timing change.

Phone QC on 2026-09-20:

- 1.0x: PASS for scale/readability; bridge remains legible and Healer house stays the anchor.
- 0.65x: PASS for macro hierarchy; water/bridge no longer dominates the village or steals hierarchy from the Healer house / main spine.

Decision: **`ENV-HEALER-WATER-BRIDGE-A = PHONE_PASS`**. Preserve the accepted art and runtime presentation unless a new concrete Phone-QC regression appears.

Historical failed paths for this asset that must not be repeated blindly:

- early SVG/vector-looking proof was too prototype-like;
- initial bridge orientation ran along the water gap instead of crossing bank-to-bank;
- PNG transport produced an opaque black rectangle on Android/WebGL;
- alpha-cleanup workaround removed too much / did not solve the actual transport problem;
- validated WebP transport solved the runtime rendering issue;
- final runtime scale/hierarchy tune was preferred over regenerating accepted art.

## Current production proof

Asset ID: `ENV-HEALER-ACTIVITY-KIT-A`

Purpose:

- make the Dược Sư pocket read as an actively used healer / herb-processing area;
- add functional activity language without cluttering the compact V2-A composition;
- complement the already Phone-PASS water + bridge rather than competing with it.

### Proof-first scope

First isolated candidate should stay small and reversible:

- 1–2 modest herb-bed forms;
- 1 small medicine drying rack / drying mat / drying frame;
- a restrained cluster of healer-work props such as baskets, trays, jars, bundled herbs;
- painterly xianxia style consistent with accepted Thanh Vân Thôn assets;
- poor-frontier construction, practical rather than ornate;
- transparent/isolation-friendly output suitable for runtime normalization.

### Explicitly out of scope

- broad field/agriculture kit;
- full residential prop expansion;
- topology/path changes;
- changing the accepted water/bridge asset;
- gameplay collision, hitbox or combat timing changes;
- dense decorative clutter.

## Pass gate for ENV-HEALER-ACTIVITY-KIT-A

The isolated proof should proceed to runtime only if:

- it immediately reads as healer/herbal activity at phone scale;
- it belongs to the same painterly settlement family as the accepted house/water/prop art;
- construction/materials feel poor-frontier rather than prosperous or sect-like;
- silhouette remains readable without relying on text labels;
- color/value do not overpower the Healer house or water/bridge;
- props can be placed with negative space rather than requiring a dense vignette.

After isolated approval:

1. normalize into runtime-ready asset(s);
2. integrate only around the existing Healer pocket;
3. deploy;
4. Phone QC at 1.0x, then 0.65x;
5. only after PASS consider `ENV-FIELD-EDGE-KIT-A`.

## Accepted assets that must not be regenerated

- `PLY-M-BASE`
- `EN-MELEE-BASE`
- `FX-SWORD`
- `ENV-HOUSE-SET-A`
- `ENV-SETTLEMENT-PROP-KIT-A`
- `ENV-MERCHANT-KIT-B`
- `ENV-SETTLEMENT-GROUND-KIT-A`
- `ENV-HEALER-WATER-BRIDGE-A`

## Runtime/gameplay constraints that must not regress

- Mobile browser portrait 9:16.
- Manual `ATK + SKILL + NÉ` combat.
- One flying sword per attack press.
- Base attack range 205 + future bonus.
- Base cooldown 800 ms through `basicAttackSpeedPct`.
- Third-Kiếp-Ảnh projectile cleanup freeze fix must not regress.
- Environment/art work does not alter gameplay hitboxes or timing unless explicitly requested.

## Exact next action

Produce **one isolated `ENV-HEALER-ACTIVITY-KIT-A` proof** on branch `proof/healer-activity-kit-a`. Do not integrate or expand scope until the isolated candidate is visually credible enough for the next gate.

## Resume sentence

Resume from `main 6fd3477`: V2-A topology, massing, context, QC zoom, ground/path P0, houses/props/merchant, and `ENV-HEALER-WATER-BRIDGE-A` are all accepted/Phone-PASS. Active work is one isolated `ENV-HEALER-ACTIVITY-KIT-A` proof only; no field-kit expansion or topology/gameplay change before that proof passes.
