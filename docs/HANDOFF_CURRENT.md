# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: READY_FOR_WORK
Repo-write permission: WORK
Return condition: Work deploys **B1.1 — bridge/water leak fix** and returns build/QC evidence plus the focused QC checklist. B2 remains blocked until B1.1 Phone PASS.

Snapshot: 2026-09-24
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified B1 functional main: `cae8a1ccaf5628ac6794a39d2abc5a3fab4e7cee`
Runtime B1 lineage: PR #118 `c3553b7` + foot-anchor fix PR #119 `1e2da44` + bridge-gap tune PR #120 `cae8a1c`.
Verified functional live badge before this documentation update: `BUILD cae8a1c`.
Main CI run #36023555367 PASS; Pages run #36023555230 PASS.
Open relevant execution PR: none; unrelated old open PR #4.

## Current objective

Execute **B1.1 — bridge/water leak fix only**. Android QC passed 6/7 B1 checks; the only failure is that the player can stand in visible water immediately beside the bridge/Healer pond crossing.

## B1 Android QC result

**REVISE, narrow scope.**

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

## Planned next steps after B1

### Proof B2 — Settlement collision expansion

Only after B1 Phone PASS:

- extend proven grounded colliders to required Elder / Merchant / southern-pocket houses, near trees, large rocks and functional fences;
- extend blocked water along the authored creek;
- create 1–2 **visually authored** ford / stepping-stone crossings before making those spots walkable;
- Phone QC the full settlement route.

### Proof C — Occlusion + one tree-motion proof

Only after B2 passes:

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

Resume from verified current GitHub state with transfer state `READY_FOR_WORK`: Proof B1 passed 6/7 Android checks, with one narrow water leak beside the Healer bridge. Execute **B1.1 — replace the overly broad polygon gap with a narrow explicit bridge walkable corridor**, deploy, and return the build with the three-item focused QC checklist. Do not start B2 until B1.1 Phone PASS.