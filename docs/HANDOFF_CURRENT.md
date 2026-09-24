# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: NONE_WHILE_WAITING_QC
Return condition: User reports Android Phone QC PASS or REVISE against the six B2A checks below. B2B and Proof C stay blocked until B2A Phone PASS.
Snapshot: 2026-09-24
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified current main: `c1d14ab74b043d4225dc5d18a4ca7cb0cdd77d1b`.
Merged B2A PRs: #126 runtime expansion → `a29e7d3bfdbd9e7d2577a4786c10e7727255ced2`; #127 Elder fence slope correction → current main `c1d14ab74b043d4225dc5d18a4ca7cb0cdd77d1b`.
Active B2A execution branch/PR: none. Unrelated open PR: #4.
Live runtime build before this docs-only handoff update: `BUILD c1d14ab`, [QC link](https://momentum448-glitch.github.io/xianxia-arpg-web/?qc=c1d14ab).
Main CI run #36035343797 PASS; Deploy Pages run #36035343787 PASS.
B1.1 functional baseline: `ea86424f582e9ddf585d5cfdbfc6ceffe3cc7203`.

## Current objective

Return merged **Proof B2A — static settlement collision expansion only** for Android Phone QC at 1.0x with UI visible. Runtime work and deploy are complete; do not make further production changes until the user reports PASS or REVISE.

## Proof B2A — implementation and Work self-QC

- Generalized the accepted B1 resolver into `src/game/settlementCollision.ts`, preserving B1 shapes and movement behavior.
- Added nine grounded B2A footprints: Elder hall base, Elder trunk and functional fence; Merchant stall, cart and nearby tree trunk; southwest house, southeast tile-roof house and reachable southeast tree trunk. The southwest tree is already fully inside the accepted B1 pond blocker, so no duplicate collider was added.
- PR #127 corrected the Elder fence line from `[590,7815]→[730,7791]` to `[590,7791]→[730,7815]` so it follows the visible plank slope.
- Preserved radius 11 at the +31 foot anchor, 5-unit movement substeps, axis sliding/dodge protection, world bounds, B1 water/bridge shapes, NPC anchors/radii and interactions, topology, art and combat. No tiny clutter, crops, flowers, extra B2A water, occlusion, ford or tree motion was added.
- Shape-center probes block for all nine additions; Elder/Merchant/Healer approach anchors remain clear. Grid-route simulation reaches all three NPCs, both southern house areas and the southern boundary; the central spine remains open.
- Live desktop check at `BUILD c1d14ab`, 1.0x with UI: scene loaded; player moved south along the open route and back into the Elder pocket; pushing north at the grounded hall/fence edge did not visibly pass through; the Elder interaction opened dialogue. The fence rendering now has the corrected slope. Earlier desktop check on `a29e7d3` also confirmed Elder and Merchant access before the one-line fence correction.
- **Android Phone QC has not happened.** Do not label B2A PHONE PASS until all six checks below pass on the user's phone.
- NPC layout/anchors from the accepted re-block remain unchanged: Elder `(490,7828)`, Merchant `(1045,8082)`, Healer `(490,8382)`; interaction radius `155`.

## Current live GitHub state

- Main: `c1d14ab74b043d4225dc5d18a4ca7cb0cdd77d1b`.
- PR #126 merged the B2A runtime expansion at `a29e7d3`; PR #127 merged the fence-line correction at `c1d14ab`.
- CI #36035343797 and Pages #36035343787 both completed successfully for current main.
- No relevant open execution PR; open PR #4 is unrelated.
- Live game badge was `BUILD c1d14ab` at the QC link above before this documentation-only update.

## B1 / B1.1 Phone PASS

User Android QC reports the focused B1.1 retest PASS on live `BUILD fce1ca2` (docs-only badge over functional B1.1 runtime `ea86424`).

Accepted B1 behavior:

- Healer house blocks at the grounded footprint without oversized invisible walls.
- Tree collision is trunk/base-only.
- Representative fence blocks without unacceptable sticky behavior.
- Healer pond/creek banks block water traversal.
- Explicit bridge corridor aligns to the visible plank deck and does not leak into adjacent visible water.
- Normal movement and dodge do not tunnel through tested B1 geometry.
- Dược Sư remains reachable and interaction remains correct.

B1 is now the canonical collision pattern for expansion. Preserve its foot radius, foot-anchor convention, movement substeps and axis-slide behavior unless B2A exposes a concrete regression.

## Historical B1 Android QC result

**Historical REVISE, superseded by B1.1 PHONE PASS.**

User Android QC on live `BUILD 5ccabed` reports:

- Healer house collision: PASS.
- Tree trunk/base collision: PASS.
- Representative fence collision: PASS.
- General pond/creek bank blocking: PASS.
- Bridge traversal: functionally passable.
- Dodge collision: PASS.
- Healer reachability/interaction: PASS.
- **Only failure:** a visible cyan water patch immediately beside the wooden bridge remains walkable; the player can stand on water there.

This does **not** invalidate the collision resolver or the other B1 shapes.

Best-supported diagnosis from current code:

- `settlementCollisionB1.ts` models the bridge by leaving a dry geometric gap between the west-pond and east-creek water polygons.
- That gap is broader / offset beyond the visible plank deck, so some adjacent visible water is unintentionally outside all water blockers.

## Exact Work brief — B1.1 only

Replace the implicit broad "missing water polygon gap" approach with an **explicit bridge walkable corridor**:

1. Keep water blocking continuous across the visible pond/creek body.
2. Define one narrow walkable bridge corridor aligned to the actual visible plank deck.
3. The bridge corridor may exempt water collision only inside the visible deck plus minimal foot-radius clearance.
4. Sideways movement off the plank deck must immediately meet water blocking.
5. Preserve the current foot-centered radius, substep movement, sliding behavior, dodge protection, house/tree/fence colliders and Healer interaction.
6. Do not change terrain art, bridge art, NPC positions, topology, combat timing, interaction radius or any unrelated collision.
7. Work must VERIFY the corridor against the actual runtime/asset, not infer it only from the current comments.
8. Self-test the exact leak spot shown in Phone QC before deploy.

Preferred implementation quality:

- make the crossing concept explicit in collision data/code rather than encoding it as a large accidental hole between water polygons;
- keep the design reusable for later B2 bridge/ford crossings;
- do not build a generic new physics framework.


## B1.1 implementation and Work self-VERIFY

- PR #123 (`ea86424`) connects the local water blocker across the previously open cyan patch and exempts one explicit narrow corridor centered on the visible bridge deck (`[414,8482]` → `[488,8540]`, half-width 18). The reported leak location near `(500,8497)` is blocked by coordinate checks; planks and two-way approach paths remain walkable.
- House/tree/fence shapes, foot radius 11, substeps, sliding, dodge resolver, NPC positions and dialogue were not modified.
- Local coordinate checks included both crossing directions, sideways pushes, direct bank approach and the reported leak point. CI and Pages passed on main.
- Live desktop 1.0x on `BUILD ea86424`: game loaded, player crossed the bridge from its south side, pushing right toward cyan water from the north end stopped movement, and Dược Sư dialogue opened. Android touch/visual margins and dodge remain for Phone QC.

## B1 implementation and Work self-VERIFY

- `src/game/settlementCollisionB1.ts`: foot-centered radius 11 at the player artwork's actual contact shadow (control center +31 Y); grounded house base, one tree trunk, narrow fence and three inset local water polygons. The southern bridge planks have an explicit walkable diagonal gap.
- `GameScene.updatePlayer` moves through at most 5 world units per substep and resolves axes independently, preserving the existing normal/dodge speed, world bounds, combat bodies/timing, NPC anchors/radii and unrelated map areas.
- Coordinate path checks exercised normal/diagonal contact with house/tree/fence/water, high-speed dodge against blockers, two-way bridge routes, and the Healer approach.
- Live desktop 1.0x QC on `BUILD cae8a1c`: game loads; bridge crossed south→north and north→south after correcting the foot contact and southern water bank; Healer prompt remains reachable. Live Healer dialogue was triggered on initial B1 runtime, and interaction code was unchanged in the two follow-up fixes.
- This is **not yet Phone PASS**. Android 1.0x judgment is required for visible bank margins, sticky corners, dodge and overall feel. Prior intermediate runtime builds `c3553b7` and `1e2da44` are superseded by `cae8a1c`.

## Verified completed / Phone PASS

- Illustrated World Hybrid Proof A / `ENV-SETTLEMENT-BAKED-TERRAIN-PLATE-V1`: PHONE PASS.
- A1 compact settlement topology: PHONE PASS and remains locked.
- NPC Re-block A: **PHONE PASS** from user Android screenshots on live `BUILD 9eb4c50`.
  - Elder runtime anchor: `(490, 7828)`.
  - Merchant runtime anchor: `(1045, 8082)`.
  - Healer runtime anchor: `(490, 8382)`.
  - Existing interaction radius `155` and dialogue/interaction semantics remain accepted.
- Current NPC arrangement no longer reads as one vertical line; each NPC belongs to its own functional pocket.

## Important verified technical fact

Current player locomotion is **manual coordinate movement** in `GameScene.updatePlayer`:

- normal move speed: `250`;
- dodge speed: `520` for `150 ms`;
- player position is currently updated directly and clamped to world bounds;
- the project is not currently using Arcade/Matter colliders for player movement.

Proof B1 should therefore prove a small custom/world collision resolver around candidate movement. Do **not** migrate the whole game to a new physics engine in this proof.

## Proof B1 scope

Use the Healer pocket because it contains several representative collision problems in one compact area.

Implement only the minimum needed to prove:

1. **Healer house footprint**
   - collider follows the grounded building footprint, not roof art;
   - player can approach the entrance naturally.

2. **One reachable near-player tree**
   - collision only around trunk/base;
   - canopy footprint must not become an invisible wall.

3. **One representative fence segment**
   - block obvious pass-through;
   - keep collider narrow and grounded.

4. **Healer pond + adjacent creek water**
   - simplified inset blocked geometry;
   - do not pixel-trace every shoreline ripple/rock;
   - player cannot walk into blocked water.

5. **Existing wooden bridge**
   - bridge remains the authored walkable gap/crossing;
   - crossing must work both directions without snagging.

## Movement/collision requirements

- use a small **foot-centered** player collision shape, not the full `58 × 78` player control rectangle;
- keep axis/shape resolution smooth enough that the player can slide along walls/banks during diagonal movement;
- **dodge must not tunnel through** house/fence/water collision;
- use movement substeps, swept checks, or another minimal equivalent if required;
- preserve world-bound clamping;
- collision affects player traversal only for this proof;
- do not change combat hitboxes, attack timing, enemy movement, NPC interaction radii, A1 topology or visual art.

## Out of scope for B1

Do not implement yet:

- whole-settlement collision expansion;
- authored ford/stepping-stone art/crossing;
- roof/tree occlusion;
- tree wind animation;
- water slowdown/splash/damage;
- new terrain/house/NPC art;
- enemy collision/pathfinding changes.

Those belong to later gates.

## Work self-VERIFY before returning

- inspect actual Healer house/tree/fence/water/bridge world coordinates from current runtime data;
- test normal movement and diagonal movement against every B1 collider;
- test dodge into house, fence and water to ensure no tunneling;
- cross bridge both directions with normal movement;
- verify Healer remains reachable and interaction still triggers;
- build + deploy + verify the live badge.

## Required Work return format

When Work returns the deployed B1 build, it must give the user **all of these in the same message**:

1. QC link;
2. build ID;
3. concise implementation summary;
4. **“Anh cần QC:” checklist below, repeated explicitly.**

Do not return a bare link.

## Anh cần QC — B1.1 focused retest

Use **1.0x**. Only three focused checks are required because the other B1 items already passed.

1. **Previously leaking water patch beside bridge**
   - walk to the exact cyan-water area shown in the failed QC screenshot;
   - PASS: player stops at the visible water edge and cannot stand on the water;
   - FAIL: any part of that same visible water remains freely walkable.

2. **Bridge deck / side escape**
   - cross the bridge both directions, then deliberately push sideways off the bridge near both ends and mid-span;
   - PASS: forward crossing stays smooth, but sideways movement cannot step from the planks into adjacent water;
   - FAIL: bridge snags, becomes too narrow, or player can leave the deck into water.

3. **Dodge + regression smoke**
   - dodge toward the repaired water edge and across the bridge; then approach Dược Sư once;
   - PASS: dodge does not tunnel into water, bridge remains usable, and Dược Sư interaction still works;
   - FAIL: dodge bypasses water, crossing breaks, or Healer becomes unreachable.

**Already accepted unless an obvious regression appears:** house, tree-base and fence collision.

**Not being judged:** B2 whole-village collision, ford/stepping-stone crossings, occlusion, tree animation, enemy collision, water VFX.

## B1 PASS gate

B1 becomes PHONE PASS when the three B1.1 focused checks above pass on Android. The previously passed house/tree/fence checks remain accepted unless regression is observed.

## Proof B2A — approved implementation scope

B2A expands **static grounded collision** across the rest of Thanh Vân Thôn. It intentionally does **not** expand the creek/water system yet.

### Technical direction

- Reuse the proven manual-movement collision resolver from B1.
- It is acceptable and preferred to generalize `settlementCollisionB1.ts` into a settlement-wide data-driven collision module if this can be done without changing proven movement behavior.
- Keep the player foot collision small and centered at the visual feet.
- Keep max movement substeps / anti-tunneling behavior equivalent to B1.
- Preserve diagonal sliding.
- Do not migrate to Arcade/Matter physics.
- Do not change enemy movement/pathfinding in this proof.

### Static collision scope

Work must VERIFY exact runtime coordinates and art footprints, then add only grounded collision for:

1. **Elder pocket**
   - Elder hall grounded base;
   - reachable near-player tree trunk/base;
   - functional fence segment(s) that plausibly intersect movement.

2. **Merchant pocket**
   - merchant stall/shop grounded footprint;
   - merchant cart grounded footprint if reachable;
   - nearby tree trunk/base;
   - any truly blocking sign/large prop only if it materially occupies the route.
   - Do not make tiny goods piles or decorative clutter into annoying micro-colliders unless visibly necessary.

3. **Southern residential / field fringe**
   - southwest house grounded base;
   - southeast tile-roof house grounded base;
   - reachable near-player trees;
   - large rock/grounded obstacle only when visually substantial;
   - no collision on low crops/flowers/field texture.

4. **Existing Healer B1**
   - preserve all accepted B1 collision exactly unless refactoring requires an equivalent representation;
   - no new water geometry outside the accepted B1 area in B2A.

### B2A guardrails

- collision follows ground contact, not roof/canopy/sprite bounds;
- doorway / shopfront / NPC approach lanes remain reachable;
- main spine and branch paths stay open;
- no collision on baked terrain texture, low grass, flowers, small pebbles or low field rows;
- avoid a forest of tiny colliders;
- do not add ford/stepping-stone crossings yet;
- do not implement occlusion, Y-depth behavior or tree animation yet;
- do not change art, topology, NPC anchors/radii, combat timing or interaction semantics.

## Anh cần QC — Proof B2A

Use **1.0x** with UI visible. Work must repeat this checklist next to the returned QC link/build.

1. **Elder hall + Elder NPC**
   - push into the hall from front/side/back and circle the nearby tree/fence;
   - PASS: grounded base/trunk/fence block naturally, entrance and Elder remain reachable;
   - FAIL: roof/canopy-sized invisible wall, doorway blocked, or player clips through the grounded base.

2. **Merchant area**
   - walk around stall, cart and nearby tree, including diagonal pushes;
   - PASS: large grounded objects block where expected, but the shopfront and Merchant interaction remain accessible;
   - FAIL: tiny goods clutter creates invisible bumps, cart/stall can be crossed, or shop access is blocked.

3. **Southern houses**
   - circle both southwest and southeast houses;
   - PASS: grounded house bases block naturally while surrounding paths remain open;
   - FAIL: player walks through houses or is kept far away by oversized rectangles.

4. **Trees / large static props**
   - test several newly-collidable trees and any large rock/prop included by Work;
   - PASS: only trunk/base or grounded mass blocks; canopy/visual overhang remains traversable where ground is clear;
   - FAIL: large invisible canopy boxes or excessive micro-collision.

5. **Diagonal slide + dodge**
   - move diagonally along house/fence edges and dodge directly toward several new colliders;
   - PASS: player slides instead of sticking and never tunnels through;
   - FAIL: sticky corners, jitter, or dodge appears on the far side.

6. **Full village route + all 3 NPCs**
   - travel Elder → Merchant → Healer → southern fringe and approach each NPC;
   - PASS: route remains open and all three interactions are reachable;
   - FAIL: any new collision accidentally closes a branch, blocks an NPC, or creates a dead pocket.

**Already accepted unless regression appears:** Healer B1 water/bridge behavior.

**Not being judged in B2A:** whole-creek water blocking, ford/stepping-stone art, occlusion/going behind roofs/canopies, tree sway, enemy collision/pathfinding, water VFX.

## B2A PASS gate

B2A is PHONE PASS when all six checks above behave naturally on Android with no route, NPC-interaction, movement-feel or combat regression.


## Planned next steps after B2A Phone PASS

### Proof B2A — Static collision expansion

Current gate is Android Phone QC for merged B2A `c1d14ab`. Do not start B2B before B2A Phone PASS. After PASS, hand ownership back for the next approved proof.

### Proof B2B — Full water + authored crossings

Only after B2A Phone PASS:

- extend blocked water along the authored creek outside the Healer B1 pocket;
- add one first **visually authored** ford / stepping-stone crossing and prove it on phone;
- add a second crossing only if the route/composition benefits from it;
- preserve the explicit-crossing rule: visible water remains blocked except where a visible bridge/ford communicates traversability.

Phone QC B2B before Proof C.

### Proof C — Occlusion + one tree-motion proof

Only after B2A + B2B pass:

- one near-road tree: trunk collision + canopy occlusion + subtle wind sway;
- one building roof/eave occlusion case;
- Phone QC before expansion.

## Do not repeat blindly

- no full visual silhouette collision for houses/trees;
- no global physics-engine migration for this proof;
- no giant invisible water rectangles;
- no whole-map collision mega-pass before B1 validation;
- no collision changes bundled with occlusion/VFX/art changes.

## Resume sentence

The B2A implementation is merged and deployed at runtime commit `c1d14ab74b043d4225dc5d18a4ca7cb0cdd77d1b`; the next action is Android Phone QC at 1.0x using the six-item checklist above. No Work repo writes or B2B/Proof C execution until the user reports PASS or REVISE.