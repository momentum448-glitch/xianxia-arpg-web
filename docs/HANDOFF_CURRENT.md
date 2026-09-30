# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: NONE_WHILE_WAITING_QC
Return condition: Android Phone QC of **Proof D1**. If all five checks pass, Design records PHONE_PASS and decides the next required-object rollout. Work must not begin more production while waiting.
Snapshot: 2026-09-30
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified functional main: `b8cfc86ed6ba3afc0ab808ad1e9c52cadd46517b` (PR #142)
Live QC: `https://momentum448-glitch.github.io/xianxia-arpg-web/?qc=b8cfc86` — visible `BUILD b8cfc86`
CI: PR run #36663189096 PASS; main run #36663256930 PASS; Pages run #36663257069 PASS.
Proof C1 PHONE_PASS: PR #139 / `9e564bc8f4b539697dc5e5f57741ba1eb610fd6f`.
Accepted Collision Proof B: B1/B2A/B2B1/B2B2 PHONE_PASS.

## Current objective

Evaluate **Proof D1 — selective occlusion/sway at the Elder and southeast pockets only** on Android. This controlled rollout tests different house assets, scales and flip states. D1 is deployed and awaits the five Phone-QC checks below; it is not yet PHONE_PASS.

## Deployed implementation

- `src/game/settlementC1Occlusion.ts` now parameterizes the proven C1 pair. The Healer tree/house specification is identical to its PHONE_PASS values, texture keys and visual behavior.
- Elder tree `(270,7815)` retains 185 px, unflipped, alpha 0.96. Its source-y 112 pivot has a four-pixel seam; only canopy rotates ±0.55° over 7.1 s, phase 1.7. Its canopy foregrounds at depth 12 near x±132 / y(7570,7920) when player foot is behind y=7808. The hall `(470,7775)` retains 315 px, unflipped, alpha 1; the roof/eave derivative cuts at source y=150 and appears near x±195 / y(7505,7830) when foot is behind y=7743.
- Southeast tree `(1230,8525)` retains 168 px, flipped, alpha 0.76. Its source-y 112 pivot has the same seam; only canopy rotates ±0.48° over 5.7 s, phase 3.3. Its canopy foregrounds near x±122 / y(8305,8625) when foot is behind y=8518. Tile house `(1275,8685)` retains 310 px, flipped, alpha 0.82; roof/eave derivative cuts at source y=112 and appears near x±190 / y(8435,8740) when foot is behind y=8653.
- Thresholds use ±6 world-unit hysteresis. Player visual depth remains 11, world base -3, conditional foreground 12. The existing player foot is actor center +31.
- Runtime-only derivatives: `prod-d1-elder-tree-base`, `prod-d1-elder-tree-canopy`, `prod-d1-elder-house-roof`, `prod-d1-southeast-tree-base`, `prod-d1-southeast-tree-canopy`, `prod-d1-southeast-house-roof`. Exact source hashes and lineage are in `docs/ASSET_REGISTRY.md`; no binary art changed.
- The accepted tree circles, house boxes, crossings, NPCs, combat, player movement and baked terrain remain untouched in the PR diff.

## Work verification and limits

- Source dimensions/cuts/flip/scale/alpha checked against the three accepted PNGs; pixel compositions inspected for front/back upper house overlays. Local TypeScript/Vite build and `git diff --check` passed.
- PR #142 contained exactly four expected files: selective-occlusion helper, placement wiring, scene type/property and Asset Registry. GitHub CI and Pages passed. The live page reached the character-selection screen, entered the settlement, showed `BUILD b8cfc86` and had no game console error; a Chrome extension metadata error was unrelated to game code.
- Desktop cloud-browser controls could not provide reliable sustained traversal of all front/back paths, so the ordered Android checks below remain authoritative. Do not infer Phone PASS from the desktop source/boot checks.

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

Proof D1 becomes PHONE_PASS only when all five Android checks pass. Then Design decides the final **required-object rollout** versus leaving low-value/background objects static, and separately whether restrained wind/water VFX merit a small D2 proof. Do not automatically animate every tree.

## Scope and cautions

No entry/background trees, Merchant stall/cart/goods, southwest tree/house, map-wide sway, wind particles, water VFX, new props, collision or gameplay changes in D1. Do not regenerate accepted art or add per-pixel occlusion or whole-house fading. Preserve the PHONE_PASS Healer C1 and all Collision Proof B geometry.

## Resume sentence

Resume at `WAIT_QC` on live `BUILD b8cfc86`. Ask the user to perform the five Proof D1 Android checks above. If PASS, record the result and have Design lock the next exact proof before transferring `READY_FOR_WORK`; if REVISE, hand back only the observed failing case. Work must not continue production until that gate.
