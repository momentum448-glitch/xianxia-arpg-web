# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: READY_FOR_WORK
Repo-write permission: WORK
Return condition: Work deploys **Proof D1 — selective occlusion/sway expansion to the Elder pocket and southeast pocket only** and returns build/QC evidence. Do not roll out map-wide or add wind/water VFX until D1 Phone PASS.
Snapshot: 2026-09-29
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified current main before this continuity update: `91b28c3487f10459c0420bfeadc5470c7c985220`
Proof C1 functional runtime: PR #139 / `9e564bc8f4b539697dc5e5f57741ba1eb610fd6f`
Proof C1 handoff/docs: PR #140 / `91b28c3`
Accepted Collision Proof B: B1/B2A/B2B1/B2B2 PHONE_PASS
Relevant execution PR: none

## Phone PASS just recorded

User Android QC reports **Proof C1 PASS** on live `BUILD 9e564bc`.

Therefore **Proof C1 = PHONE_PASS**.

Accepted C1 baseline:

- Healer tree canopy foreground ordering behaves correctly front/back;
- canopy-only sway is subtle; trunk/base remains visually rooted;
- Healer house roof/eave foreground ordering behaves correctly;
- accepted tree/house collision is unchanged;
- Healer interaction, wooden bridge and B2B2 stepping stones remain accepted;
- original tree/house binaries remain unchanged; C1 uses runtime-derived layers only.

Preserve `ARCH-HEALER-C1-SELECTIVE-OCCLUSION` behavior unless a concrete regression appears.

## Current objective

Execute **Proof D1 — selective rollout to two additional pockets only**.

Question:

> Does the C1 selective-occlusion pattern remain convincing and stable when reused on different accepted tree/house art, flip states and map positions, without causing synchronized “breathing trees,” depth flicker or any collision regression?

This is still a controlled rollout, not the final map-wide polish pass.

## Locked Proof D1 targets

### Target A — Elder pocket

Existing tree:

- visual anchor approximately **(270, 7815)**;
- accepted trunk collider **(270, 7808)** radius 21;
- accepted source tree `public/assets/c4/environment/settlement/env_tree_village_a.png`;
- current display width 185, unflipped, alpha 0.96.

Existing Elder hall:

- visual anchor approximately **(470, 7775)**;
- accepted grounded collider `left 370, right 570, top 7723, bottom 7762`;
- accepted source `public/assets/c4/environment/settlement/env_house_hall_a.png`;
- current display width 315.

Required behavior:

- tree canopy can foreground the player only when the player is spatially behind the tree;
- tree trunk/base remains fixed;
- use subtle canopy-only sway comparable to C1, but not phase-locked with other animated trees;
- Elder hall roof/eave foreground only when the player is on the visually behind/upper side;
- no whole-building fade.

### Target B — Southeast pocket

Existing tree:

- visual anchor approximately **(1230, 8525)**;
- accepted trunk collider **(1230, 8518)** radius 19;
- same accepted tree source;
- current display width 168, flipped, alpha 0.76.

Existing southeast tile house:

- visual anchor approximately **(1275, 8685)**;
- accepted grounded collider `left 1170, right 1380, top 8633, bottom 8672`;
- accepted source `public/assets/c4/environment/settlement/env_house_tile_a.png`;
- current display width 310, flipped.

Why these two pockets:

- Elder is a high-value hero/NPC pocket and exercises a different house asset plus larger tree scale.
- Southeast is close to the newly accepted stepping-stone route and exercises flipped tree/house presentation.
- Together they test reuse better than duplicating the Healer case everywhere at once.

## Exact Work brief — Proof D1 only

1. VERIFY exact current source pixels, placements and flip/scale state for all four target visuals before splitting anything.
   - recover/use the existing accepted runtime assets;
   - do not regenerate them;
   - derive sensible canopy/roof cut lines from each asset rather than copying Healer source-Y values blindly.

2. Reuse/generalize the proven C1 architecture only as much as necessary.
   - It is acceptable to refactor `settlementC1Occlusion.ts` into a small reusable selective-occlusion helper if that reduces duplication.
   - Healer C1 behavior must remain functionally and visually equivalent.
   - Do not introduce a global/per-pixel occlusion engine.

3. Add canopy foreground + subtle canopy-only sway to the **Elder tree** and **southeast tree** only.
   - trunk/base stays fixed;
   - keep amplitude in the restrained C1 neighborhood (roughly <= ±0.65° unless VERIFY shows a slightly smaller value reads better);
   - offset animation phase/timing so nearby trees do not sway in perfect synchronization;
   - no translation, bounce, gust particles or trunk rocking.

4. Add selective roof/eave foreground to the **Elder hall** and **southeast tile house** only.
   - player behind/upper side: appropriate roof/eave may foreground;
   - player front/lower side: player remains in front;
   - no whole-building fade;
   - collision remains tied only to the accepted grounded footprint.

5. Preserve exactly:
   - Healer C1 accepted behavior;
   - all B1/B2A/B2B1/B2B2 collision/crossing geometry;
   - player foot radius/offset, movement substeps, axis sliding and dodge behavior;
   - NPC positions/radii/interactions;
   - combat hitboxes/timing;
   - baked terrain plate/topology;
   - source art binaries and existing scales/anchors.

6. Do not add in D1:
   - occlusion to entry/background trees;
   - occlusion to Merchant stall/cart/goods;
   - southwest house/tree rollout;
   - map-wide tree sway;
   - wind particles;
   - water animation/VFX;
   - new collision;
   - new props;
   - gameplay changes.

7. If runtime derivative textures or helper architecture change materially, update `ASSET_REGISTRY.md` with exact lineage/state. Do not create new binary art unless technically necessary; runtime-derived canvas layers are preferred.

## Work self-VERIFY before deploy

- Elder tree: front/back ordering from multiple approach angles; trunk fixed; sway subtle.
- Elder hall: back/front roof/eave ordering with no popping.
- Southeast tree: flipped presentation front/back ordering; trunk fixed; sway subtle and not synchronized with Elder/Healer.
- Southeast tile house: flipped roof/eave ordering correct on both sides.
- Confirm accepted grounded collision data is unchanged.
- Regression smoke: Healer C1, all three NPC interactions, wooden bridge and stepping stones.
- At 0.5x hidden UI, check the three animated tree canopies together for visual rhythm: movement should feel ambient, not coordinated.
- Build, deploy and verify the live build badge.

## Required Work return format

Return in one message:

1. QC link;
2. build ID;
3. implementation/refactor summary;
4. exact target split/threshold/depth logic;
5. derivative runtime texture IDs or asset-registry changes;
6. concise self-QC result;
7. the **“Anh cần QC — Proof D1”** checklist below.

Do not return a bare link.

## Anh cần QC — Proof D1

Use **1.0x**, UI visible for interaction checks. Then use **0.5x, UI hidden** briefly for whole-village motion rhythm.

1. **Elder pocket**
   - walk behind/in front of the Elder tree and Elder hall;
   - PASS: canopy and roof/eave foreground only when spatially appropriate; no flicker or obvious popping;
   - FAIL: player is always above/below the art, ordering jitters, or the house occludes incorrectly.

2. **Southeast pocket**
   - walk around the southeast tree and tile house from both sides;
   - PASS: flipped assets behave naturally; tree/roof ordering matches player position;
   - FAIL: flip causes reversed/broken occlusion, or player disappears incorrectly.

3. **Tree motion hierarchy**
   - observe Healer + Elder + southeast tree canopies at 0.5x for several seconds;
   - PASS: subtle independent motion gives life without drawing attention; trunks stay rooted;
   - FAIL: trees sway in lockstep, wobble too much, or the settlement appears to “breathe.”

4. **Collision independence**
   - push against Elder tree/hall and southeast tree/house bases;
   - PASS: collision feels exactly as before and canopy/roof pixels add no invisible walls;
   - FAIL: footprint changes, snagging appears, or visual split affects movement.

5. **Regression smoke**
   - briefly check Healer C1, NPC interaction, wooden bridge and southeast stepping stones;
   - PASS: all accepted behavior remains intact;
   - FAIL: D1 breaks the proven C1 or collision/crossing baseline.

**Already accepted unless regression appears:** Terrain Proof A, NPC re-block, Collision Proof B, B2B2, Healer C1.

**Not being judged:** remaining trees/buildings, Merchant-stall occlusion, southwest rollout, wind particles, water VFX, final map-wide polish.

## PASS gate

Proof D1 is PHONE PASS when all five checks above pass on Android.

After D1 PASS, Design decides the final **required-object rollout** versus leaving low-value/background objects static, then separately evaluates whether restrained wind/water VFX are worth a small D2 proof. Do not automatically animate every tree.

## Failed paths / cautions

- Do not regenerate accepted art to obtain cutouts.
- Do not blindly reuse Healer split coordinates on different images.
- Do not animate trunks/bases.
- Do not phase-lock all tree sway.
- Do not expand to low-value/background trees just because the helper supports it.
- Do not add per-pixel occlusion or whole-house fading.
- Do not mix D1 with water/wind VFX or new gameplay.

## Resume sentence

Resume from live Proof C1 `BUILD 9e564bc` with **C1 PHONE_PASS** and transfer state `READY_FOR_WORK`. Execute **Proof D1 only**: reuse the accepted selective-occlusion architecture for the Elder tree + hall and southeast tree + tile house, preserve collision/gameplay/source art, keep canopy sway subtle and de-synchronized, deploy, self-QC, and return the five-item Phone-QC checklist.
