# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: READY_FOR_WORK
Repo-write permission: WORK
Return condition: Work deploys **Proof C1 — one Healer-pocket tree occlusion + subtle canopy sway, plus one Healer-house roof/eave occlusion case** and returns build/QC evidence. Do not expand the pattern map-wide until Phone QC passes.
Snapshot: 2026-09-28
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified current main before this continuity update: `c13a7aca63611c260aff88fa1dcdc0b7a3c1c2ef`
B2B2 functional runtime: PR #136 / `a3648f73972a789a93b4adc212d22b4b6c9747e7`
B2B2 handoff/docs: PR #137 / `c13a7ac`
B2B1 baseline: PR #133 / `cc9c796`, PHONE_PASS
Relevant execution PR: none

## Phone PASS just recorded

User Android QC reports **B2B2 PASS** on live `BUILD a3648f7`.

Therefore **B2B2 = PHONE_PASS** and Collision Proof B is complete enough to move to the first occlusion/tree-motion proof.

Accepted B2B2 baseline:

- asset `ENV-CREEK-STEPPING-STONES-A`;
- canonical runtime file `public/assets/c4/environment/settlement/env_creek_stepping_stones_a.png`;
- five low-profile stones at top-left world `(1161,8498)`, display 78 × 100;
- explicit water-only corridor from approximately `(1174,8509)` to `(1226,8586)`, half-width 14;
- adjacent water remains blocked;
- Healer bridge and full village route remain accepted;
- all B1/B2A/B2B1 collision/movement behavior remains locked.

Do not reopen B2B2 unless a concrete regression appears.

## Current objective

Execute **Proof C1 — selective occlusion + one tree-motion case only**.

Question:

> Can the player convincingly pass behind one important near-player tree and one building edge, while the tree has restrained ambient motion, without changing collision, topology or making the scene visually noisy?

This is an architecture proof, not a map-wide rollout.

## Locked proof targets

Keep the proof in the already well-tested Healer pocket so collision and route variables stay controlled.

### Tree target

Use the existing Healer-pocket village tree:

- runtime visual anchor approximately **(255, 8365)**;
- accepted trunk collision center **(255, 8358)**, radius 19;
- source runtime asset: `public/assets/c4/environment/settlement/env_tree_village_a.png`.

Required visual behavior:

- trunk/base remains in the normal world layer;
- canopy may pass in front of the player only when the player is spatially behind the tree;
- when the player is in front, the player must remain visually in front;
- add **subtle canopy-only sway**, roughly within the already locked ±0.7° guidance;
- trunk/base must not visibly wobble;
- no large translation, elastic bounce or wind-gust VFX.

### Building target

Use the existing Healer house:

- runtime visual anchor approximately **(470, 8365)**;
- accepted grounded collision remains `left 366, right 566, top 8298, bottom 8337`;
- source runtime asset: `public/assets/c4/environment/settlement/env_house_thatch_b.png`.

Required visual behavior:

- player can read as passing visually behind the relevant roof/eave foreground portion when moving along the back/upper side of the house;
- player remains in front when moving along the front/lower side;
- house grounded collision stays exactly independent from roof/eave pixels;
- do not fade the whole building or introduce a global transparency system.

## Exact Work brief — Proof C1 only

1. VERIFY the current Healer tree/house pixels and live placement before choosing the split boundary.
   - Do not regenerate either accepted base asset.
   - Recover/use the exact runtime assets.
   - Small derivative transparent cutouts are allowed if needed.

2. Implement the smallest selective-occlusion pattern that satisfies the behavior above.
   - Prefer Y-depth + a foreground canopy/roof cutout.
   - Do not build a per-pixel occlusion engine.
   - Do not apply the pattern to other trees/buildings yet.

3. Add subtle sway to **only the Healer test tree canopy**.
   - keep the trunk and accepted trunk collision fixed;
   - preserve the tree's current visual scale/anchor;
   - motion should be ambient and easy to ignore during gameplay.

4. Preserve exactly:
   - all B1/B2A/B2B1/B2B2 collision and crossing geometry;
   - player foot radius, foot offset, movement substeps, axis sliding and dodge protection;
   - NPC positions/radii and interaction behavior;
   - combat hitboxes/timing;
   - baked terrain plate and topology;
   - existing Healer bridge and stepping-stone crossing.

5. Do not add:
   - map-wide occlusion;
   - sway to multiple trees;
   - roof transparency/fade systems;
   - water VFX;
   - new props;
   - enemy pathfinding changes;
   - gameplay timing/hitbox changes.

6. If derivative visual files are created:
   - give each important derivative an Asset ID;
   - record canonical runtime path, dimensions, bytes/checksum and lineage in `ASSET_REGISTRY.md`;
   - preserve the original accepted tree/house files unchanged.

## Work self-VERIFY before deploy

- walk player behind and in front of the Healer tree from multiple approach angles;
- verify canopy front/back ordering switches at a sensible grounded threshold with no rapid flicker;
- verify trunk collision is bit-for-bit / behaviorally unchanged;
- inspect canopy sway for at least several seconds and confirm trunk stays fixed;
- walk behind and in front of the Healer house/eave;
- verify roof/eave occlusion never changes the grounded collider;
- smoke-test Healer interaction, bridge and B2B2 stepping-stone crossing;
- build, deploy and verify live build badge.

## Required Work return format

Return in one message:

1. QC link;
2. build ID;
3. implementation summary;
4. any derivative Asset IDs/paths + metadata;
5. exact depth/threshold logic used for the two proof cases;
6. concise self-QC result;
7. the **“Anh cần QC — Proof C1”** checklist below.

Do not return a bare link.

## Anh cần QC — Proof C1

Use **1.0x**, UI visible first. Optionally use 0.5x hidden UI only for a quick whole-scene sanity check.

1. **Tree front/back readability**
   - walk around the Healer tree, including behind its upper side and in front of its lower side;
   - PASS: canopy naturally covers the player only when the player is behind it;
   - FAIL: player is always on top, always hidden, or ordering flips/jitters unnaturally.

2. **Tree sway**
   - stand near the test tree for several seconds;
   - PASS: canopy has subtle living motion but trunk feels rooted and the motion does not attract attention;
   - FAIL: whole tree rocks, motion is large/floaty, or tree looks detached from the ground.

3. **House roof/eave occlusion**
   - move along both back/upper and front/lower sides of the Healer house;
   - PASS: player convincingly passes behind the relevant roof/eave only on the back side and remains in front on the front side;
   - FAIL: player disappears incorrectly, roof ordering is backwards, or there is obvious visual popping.

4. **Collision independence**
   - push against the same Healer tree trunk and house base used in earlier proofs;
   - PASS: physical contact feels unchanged and canopy/roof pixels do not create new invisible walls;
   - FAIL: collision footprint grows/shifts or occlusion changes movement.

5. **Regression smoke**
   - test Healer interaction, wooden bridge and southeast stepping stones briefly;
   - PASS: all behave as before;
   - FAIL: Proof C changes the accepted collision/crossing route.

**Already accepted unless regression appears:** Terrain Proof A, NPC re-block, Collision B1/B2A/B2B1/B2B2, Healer bridge, stepping stones.

**Not being judged:** occlusion for every tree/house, stronger wind animation, foliage particles, enemy pathfinding, water VFX, broader visual polish.

## PASS gate

Proof C1 is PHONE PASS when all five checks above pass on Android.

After PASS, Design decides whether the proven pattern is safe to expand to selected important trees/buildings in **Proof D**, rather than automatically applying it everywhere.

## Failed paths / cautions

- Do not regenerate accepted tree/house art just to obtain cutouts.
- Do not make canopy collision equal to canopy pixels.
- Do not fade the whole house to solve roof overlap.
- Do not use per-pixel occlusion for this proof.
- Do not animate the trunk/base.
- Do not expand the pattern map-wide before Phone PASS.
- Do not combine this proof with new gameplay or water work.

## Resume sentence

Resume from live B2B2 `BUILD a3648f7` with **B2B2 PHONE_PASS** and transfer state `READY_FOR_WORK`. Execute **Proof C1 only** in the Healer pocket: selective canopy occlusion + subtle canopy-only sway on the existing tree near `(255,8365)`, plus one roof/eave occlusion case on the existing Healer house near `(470,8365)`. Preserve all accepted collision and gameplay. Deploy and return the five-item Phone-QC checklist.
