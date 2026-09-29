# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: DESIGN_CHAT for the QC disposition; Work must not start a wider rollout or another production proof.
Return condition: user reports the five Proof C1 Android checks below; Design records PHONE_PASS or REVISE and defines the next handoff.
Snapshot: 2026-09-29
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified functional runtime main: `9e564bc8f4b539697dc5e5f57741ba1eb610fd6f` (PR #139, Proof C1)
Accepted Collision Proof B: B1/B2A/B2B1/B2B2 PHONE_PASS; B2B2 functional runtime PR #136 / `a3648f7`
Relevant execution PR: #139 merged; unrelated open PR #4

## Current gate

**Proof C1 is deployed for Android Phone QC, not yet PHONE_PASS.** Do not expand occlusion or tree motion to other objects until all five checks pass and Design records the result.

QC URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/?qc=9e564bc`
Functional runtime badge: `BUILD 9e564bc`
CI: run #36514728308 PASS. Pages: run #36514728320 PASS. The live page displayed `BUILD 9e564bc`, entered the settlement scene and showed the Healer pocket without a game console error.

## Proof C1 implementation

- One existing Healer tree at world `(255,8365)`, accepted trunk collider `(255,8358)` radius 19. Accepted `env_tree_village_a.png` is unchanged: source 160 × 198, SHA-256 `c4100456e464661fc3e06765fc8da032a8ef8ad35687b43c167c04a4ab054788`.
- Runtime canvas splits that tree near source y=112 with a 4 px shared seam. Fixed base stays at world depth -3; canopy retains 168 px flipped display width, alpha 0.92, and pivots at the split. Only the canopy sways ±0.65° in a 6.4 s cycle.
- One existing Healer house at world `(470,8350)`, accepted grounded collider x366–566 / y8298–8337. Accepted `env_house_thatch_b.png` is unchanged: source 208 × 172, 69,820 bytes, SHA-256 `71069f35aff92045dc4e64c84b5cdb936484f848c0d5d737915adfc07fba7f0f`.
- The accepted full house remains at depth -3, 292 px display width. A runtime canvas copy of its upper roof/eave portion ends at source y=126; it appears at depth 12 only when the player is behind and nearby. No whole-house fade.
- Player visual depth is 11; the foot used for sorting is player center y +31. Tree crossing threshold is foot y=8358, house threshold is foot y=8318, each with 6-unit hysteresis. The canopy foreground is gated to |foot x−255|<122 and foot y 8145–8465; roof foreground to |foot x−470|<180 and foot y 8100–8400.
- Code/Asset ID: `ARCH-HEALER-C1-SELECTIVE-OCCLUSION` in `src/game/settlementC1Occlusion.ts`. Derivatives are three runtime canvas textures only: `prod-c1-healer-tree-base`, `prod-c1-healer-tree-canopy`, `prod-c1-healer-house-roof`. No new binary asset files exist. Original tree/house and all collision, NPC, combat, terrain and crossing code/assets are unchanged.

Local verification: TypeScript/Vite build PASS, original PNG checksums unchanged, source-pixel composites checked front/back and at both sway extremes; no visible moving seam in those composites. PR #139 contained only the C1 module, its three scene integration points and the registry. Browser access to local Vite was blocked by the browser client; the live game boot and Healer area were observed. Physical behind/front movement feel and regression routes remain the authoritative Android gate.

## Anh cần QC — Proof C1

Use **1.0x**, UI visible first. Optionally use 0.5x hidden UI only for a quick whole-scene sanity check.

1. **Tree front/back readability**
   - Walk around the Healer tree, including behind its upper side and in front of its lower side.
   - PASS: canopy naturally covers the player only when the player is behind it.
   - FAIL: player is always on top, always hidden, or ordering flips/jitters unnaturally.

2. **Tree sway**
   - Stand near the test tree for several seconds.
   - PASS: canopy has subtle living motion but trunk feels rooted and the motion does not attract attention.
   - FAIL: whole tree rocks, motion is large/floaty, or tree looks detached from the ground.

3. **House roof/eave occlusion**
   - Move along both back/upper and front/lower sides of the Healer house.
   - PASS: player convincingly passes behind the relevant roof/eave only on the back side and remains in front on the front side.
   - FAIL: player disappears incorrectly, roof ordering is backwards, or there is obvious visual popping.

4. **Collision independence**
   - Push against the same Healer tree trunk and house base used in earlier proofs.
   - PASS: physical contact feels unchanged and canopy/roof pixels do not create new invisible walls.
   - FAIL: collision footprint grows/shifts or occlusion changes movement.

5. **Regression smoke**
   - Test Healer interaction, wooden bridge and southeast stepping stones briefly.
   - PASS: all behave as before.
   - FAIL: Proof C changes the accepted collision/crossing route.

**Already accepted unless regression appears:** Terrain Proof A, NPC re-block, Collision B1/B2A/B2B1/B2B2, Healer bridge, stepping stones.

**Not being judged:** occlusion for every tree/house, stronger wind animation, foliage particles, enemy pathfinding, water VFX, broader visual polish.

## After the Phone gate

Proof C1 becomes PHONE_PASS only when all five Android checks pass. Then Design decides whether the proven pattern should expand to selected trees/buildings as a separate Proof D. If C1 fails, revise only the observed visual/depth issue; do not alter collision or add a map-wide engine, whole-house fade, wind VFX, new art or gameplay changes.

## Resume sentence

Resume from functional runtime `9e564bc`, state `WAIT_QC`: B2B2 is PHONE_PASS, C1 is deployed and awaits five-item Android QC. Design evaluates the result before any Proof D work.
