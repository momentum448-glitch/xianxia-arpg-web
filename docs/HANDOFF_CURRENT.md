# Current Project Handoff

Snapshot: 2026-09-21 09:10 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn V2-A environment production
Active continuity branch: `docs/healer-activity-phone-pass`
Next production proof: `ENV-FIELD-EDGE-KIT-A`

## Verified repo/runtime state

- Current `main`: `c327fb2f0679cf1b4d300b1dd5342b337f4d5d8b`.
- Current main tree is `a84762be793590cc0d18ee3e83d16e481e8fefb4`, the same runtime tree that was Phone-QC reviewed on build `c45288c`; the later administrative cleanup did not change game files.
- PR #87 `Move healer herb garden to left pocket` is merged.
- CI and GitHub Pages for the reviewed runtime passed.
- V2-A topology, spatial massing, accepted-art context, QC zoom, Ground/Path P0, Healer Water+Bridge, and Healer Activity Kit are all Phone PASS.
- Live QC URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/`.
- Do not use Remote Desktop Commander. Use GitHub + Drive connectors and Phone QC.

## Locked Thanh Vân Thôn direction

- Poor, humble frontier village near wilderness.
- Light hub: important early, less dominant later.
- Clear main spine + a few small branches.
- Compact authored slice that implies a larger village at the edges.
- Modest stream/pond + simple bridge + field/garden language, not a traversal puzzle.
- Selected footprint: **V2-A, 1600 × 1800**. V2-B 1600 × 3200 is rejected unless explicitly reopened.
- North → south hierarchy: frontier threshold → Elder west → Merchant east → Healer west → residential/field fringe + route out.

## Ground/path P0 — PHONE PASS

Accepted runtime kit:

```text
public/assets/c4/environment/settlement/env_settlement_path_seg_a.png
public/assets/c4/environment/settlement/env_settlement_path_seg_b.png
public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png
public/assets/c4/environment/settlement/env_settlement_forecourt_a.png
```

Do not reopen/regenerate without a new concrete Phone-QC problem.

## Healer water + bridge — PHONE PASS

Asset ID: `ENV-HEALER-WATER-BRIDGE-A`

Canonical runtime asset:

```text
public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp
```

Accepted presentation:

- display `440 × 247`;
- subtle warm tint + alpha `0.96`;
- bridge crosses the narrow water gap and connects both banks;
- 1.0x scale/readability PASS;
- 0.65x hierarchy PASS.

Do not regenerate or retune without a new concrete Phone-QC problem.

## Healer activity kit — PHONE PASS

Asset ID: `ENV-HEALER-ACTIVITY-KIT-A`

Canonical runtime assets:

```text
public/assets/c4/environment/settlement/env_healer_herb_bed_a.webp
public/assets/c4/environment/settlement/env_healer_drying_props_a.webp
```

Runtime scene:

```text
src/scenes/VillageTopologyQcHealerActivityScene.ts
```

Accepted Phone-QC presentation on build `c45288c`:

- herb garden display `205 × 126`, final center `(125, 1335)` on the green left edge of the Healer house;
- herb asset keeps the runtime geometry mask that removes the source matte/edge fragments;
- drying/work cluster display `112 × 124`, center `(548, 1340)`;
- 1.0x: garden placement and healer work-language read naturally;
- 0.65x: pocket remains open, main spine remains clear, Healer house retains hierarchy;
- water/bridge remains unchanged and PASS.

Decision: **`ENV-HEALER-ACTIVITY-KIT-A = PHONE_PASS`. Preserve art, placement, scale and runtime mask.**

## Next production proof — FIELD EDGE

Asset ID: `ENV-FIELD-EDGE-KIT-A`

Purpose:

- make the southern residential/agriculture fringe imply a larger working village beyond the authored slice;
- add agricultural edge language without creating another hero landmark;
- preserve the critical route, healer pocket, residential houses and gameplay space.

Proof-first scope:

- one small representative field-edge cluster only;
- low cultivated rows / earthen boundary language suitable for a poor frontier village;
- no large building, no new water feature, no dense prop pile;
- no topology/path/house/gameplay/hitbox/timing changes.

Working assumption: start with a humble dry-field/vegetable-row edge treatment rather than a bright rice-paddy feature, because the water landmark is already owned by the Healer pocket. This is reversible and must be judged in runtime.

Pass gate:

- isolated proof reads as agriculture at phone scale;
- 1.0x: field edge feels grounded and subordinate to houses/player;
- 0.65x: it extends the village visually without stealing hierarchy or blocking the exit route;
- no sticker/matte artifacts;
- Phone QC says PASS before expansion.

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

Healer:

```text
env_healer_water_bridge_a.webp
env_healer_herb_bed_a.webp
env_healer_drying_props_a.webp
```

## Runtime/gameplay constraints that must not regress

- Mobile browser portrait 9:16.
- Manual `ATK + SKILL + NÉ` combat in production runtime.
- One flying sword per attack press.
- Base attack range 205 + future bonus.
- Base cooldown 800 ms through `basicAttackSpeedPct`.
- Settlement safe zone and NPC interaction remain intact.
- Third-Kiếp-Ảnh projectile cleanup freeze fix must not regress.
- Environment proofs must not alter gameplay hitboxes or timing.

## Failed / rejected paths to avoid

- V2-B 3200-height village: rejected by Phone QC.
- Mixed old-art macro proof / giant zone ellipses: diagnostic only.
- Repeated `house + tree + fence + rock + lamp` stamping: rejected workflow.
- Broad asset generation before topology/composition proof: rejected workflow.
- Regenerating DESIGN_PASS / PHONE_PASS art for layout/scale problems: prohibited.
- Water/bridge PNG transport caused black/missing art; validated WebP runtime path fixed it.
- Herb-bed corrupt WebP caused Phaser missing texture; fixed with valid WebP.
- Herb-bed source matte/edge fragments are handled by the accepted runtime geometry mask; do not re-open unless Phone QC exposes a concrete issue.
- Remote Desktop Commander: prohibited for this project workflow.

## Exact next actions

1. Merge this continuity sync.
2. Create `proof/field-edge-kit-a` from verified current `main`.
3. Make one isolated `ENV-FIELD-EDGE-KIT-A` representative asset/cluster, not a broad kit.
4. Self-QC technical transparency/crop/style before runtime integration.
5. Integrate only the smallest southern field-edge proof.
6. CI/build/deploy.
7. Phone QC at **1.0x first**, then **0.65x**.
8. Expand only after PASS.

## Resume sentence

Resume after Healer Activity Phone PASS: preserve all accepted V2-A topology/ground/merchant/healer layers. `ENV-HEALER-ACTIVITY-KIT-A` is locked at herb garden `(125,1335)` + drying cluster `(548,1340)` on reviewed build `c45288c`. The next proof is `ENV-FIELD-EDGE-KIT-A`, one humble agriculture-edge cluster only; prove it in isolation and runtime before any broader field expansion.
