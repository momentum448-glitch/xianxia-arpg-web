# Current Project Handoff

Snapshot: 2026-09-22 10:00 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn V2-A environment production
Continuity branch: `docs/field-edge-b-phone-pass`
Next production decision: run a structured discovery round before choosing the next proof.

## Verified repo/runtime state

- Current reviewed runtime lineage: `de30ae78a631101fe5fbd4a393e17e70c29dfbb6` (`BUILD de30ae7`).
- PR #95 `Repair Field Edge B runtime asset` merged.
- PR #95 replaced the incomplete/corrupt Field Edge B runtime WebP with a verified RGBA WebP and removed the temporary runtime canvas-cleanup workaround.
- CI PASS and GitHub Pages deploy PASS for `de30ae7`.
- Phone QC at 1.0x + 0.65x confirms Field Edge B renders correctly with transparency and no black matte.
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

## Locked environment layers

### Ground/path P0 — PHONE PASS

Accepted runtime kit:

```text
public/assets/c4/environment/settlement/env_settlement_path_seg_a.png
public/assets/c4/environment/settlement/env_settlement_path_seg_b.png
public/assets/c4/environment/settlement/env_settlement_ground_patch_a.png
public/assets/c4/environment/settlement/env_settlement_forecourt_a.png
```

Do not reopen/regenerate without a new concrete Phone-QC problem.

### Healer water + bridge — PHONE PASS

Asset ID: `ENV-HEALER-WATER-BRIDGE-A`

Canonical runtime asset:

```text
public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp
```

Accepted presentation: display `440 × 247`, subtle warm tint + alpha `0.96`; bridge crosses the narrow water gap and connects both banks; 1.0x + 0.65x PASS.

### Healer activity kit — PHONE PASS

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

Accepted Phone-QC presentation:

- herb garden display `205 × 126`, final center `(125, 1335)` on the green left edge of the Healer house;
- herb asset keeps the accepted runtime geometry mask;
- drying/work cluster display `112 × 124`, center `(548, 1340)`;
- water/bridge unchanged;
- 1.0x + 0.65x PASS.

### Field edge kit — PHONE PASS

Asset ID: `ENV-FIELD-EDGE-KIT-B`

Canonical runtime asset:

```text
public/assets/c4/environment/settlement/env_field_edge_kit_b.webp
```

Runtime scene:

```text
src/scenes/VillageTopologyQcFieldEdgeScene.ts
```

Accepted Phone-QC presentation on `BUILD de30ae7`:

- field-edge B uses the accepted southern footprint centered around `(1210, 1620)`;
- display `320 × 180`, alpha `0.96`, ground depth `-14`;
- direct render from the canonical RGBA WebP, no runtime canvas cleanup;
- 1.0x: reads as humble cultivated rows / poor frontier agriculture and blends with painterly village art;
- 0.65x: remains subordinate to houses/player and keeps the southern exit route visually open;
- no black matte, no missing texture, no sticker-like hard rectangle.

Decision: **`ENV-FIELD-EDGE-KIT-B = PHONE_PASS`. Preserve art, binary, footprint, scale and placement.**

`ENV-FIELD-EDGE-KIT-A` is rejected/superseded by B and must not be restored.

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

Healer + field:

```text
env_healer_water_bridge_a.webp
env_healer_herb_bed_a.webp
env_healer_drying_props_a.webp
env_field_edge_kit_b.webp
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
- Field Edge A looked tile-like and was rejected on art/style.
- Early Field Edge B binary transport produced black matte; runtime flood-cleanup then removed the asset entirely on phone. Final fix was to replace the runtime file with a verified RGBA WebP and render it directly. Do not restore the runtime cleanup workaround.
- Remote Desktop Commander: prohibited for this project workflow.

## Exact next action

Do **not** automatically choose NPC art or another environment kit just because placeholders remain. The previous project decision explicitly requires discovery before selecting the next substantial proof.

Next step:

1. Merge this continuity sync.
2. Run one structured discovery round for the next production target.
3. Compare only the highest-impact candidate directions (e.g. NPC identity, remaining settlement polish/promotion, or another zone) against current milestone goals and blockers.
4. Choose one small reversible proof.
5. Only then create the next branch and implement.

## Pass gate for next selection

- target solves a concrete milestone need;
- does not reopen locked V2-A / ground / merchant / healer / field-edge decisions;
- proof can be isolated and Phone-QC tested before expansion;
- no broad batch generation while a core uncertainty remains.

## Resume sentence

Resume after `ENV-FIELD-EDGE-KIT-B = PHONE_PASS` on `BUILD de30ae7`. Preserve all accepted V2-A topology, ground/path, Merchant Kit B, Healer Water+Bridge, Healer Activity Kit A and Field Edge Kit B. Do not restore Field Edge A or the temporary Field Edge runtime cleanup workaround. The next action is a structured discovery round to choose the next production proof, not automatic implementation.
