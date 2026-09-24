# Current Project Handoff

Current owner: WORK
Transfer state: WORK_EXECUTING
Repo-write permission: WORK_ON_PROOF_B1_BRANCH
Return condition: Work deploys **Proof B1 — Healer-pocket collision foundation**, returns build/QC evidence plus the required QC checklist, then ownership returns to DESIGN_CHAT for Phone QC.

Active branch: `proof-b1-healer-collision` (based on verified main `3ceb183f3a9a436a7e83f2b0f70b40bda3d2366c`)
Snapshot: 2026-09-24
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified current main before this continuity update: `9eb4c5086f646fcd28a119a2096ddfd13a33361c`
Functional NPC re-block runtime: PR #115 / `7e8eff66ae5ff01733242fb3ac221f0b9f4645eb`
Phone-reviewed live badge: `BUILD 9eb4c50`
Open relevant execution PR: none
Unrelated old open PR: #4

## Current objective

Execute **Proof B1 — Healer-pocket collision foundation only**.

Do not expand collision map-wide, add occlusion, animate trees, or add new water/gameplay effects in the same proof.

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

## Anh cần QC — Proof B1

Use **1.0x** for this proof. UI may stay visible because interaction must also be tested.

1. **Healer house**
   - walk directly into the front/side/back grounded wall areas;
   - PASS: player stops at the physical base but can still approach the entrance naturally;
   - FAIL: player walks through the house or is blocked far outside the visible base.

2. **Tree near Healer**
   - walk around the tree from several directions;
   - PASS: only trunk/base blocks; player can move through the visual canopy footprint where the ground is clear;
   - FAIL: a large invisible canopy-sized box blocks movement.

3. **Fence**
   - push diagonally and then parallel along the tested fence;
   - PASS: cannot pass through it, but movement slides along it without sticky corners;
   - FAIL: player crosses it or gets trapped/stutters on normal diagonal contact.

4. **Pond / creek banks**
   - try entering water at at least three different bank points;
   - PASS: blocked near the visible bank with no huge invisible margin;
   - FAIL: player walks into water or is stopped conspicuously far from the bank.

5. **Bridge**
   - cross the wooden bridge both directions with normal movement;
   - PASS: clean crossing, no invisible snag or sudden sideways push;
   - FAIL: bridge is partly blocked or lets the player escape into adjacent water.

6. **Dodge collision**
   - dodge directly toward house, fence and water;
   - PASS: dodge never tunnels through blocked geometry;
   - FAIL: high-speed dodge appears on the other side.

7. **Healer interaction / route regression**
   - approach Dược Sư after moving around the pocket and trigger interaction;
   - PASS: NPC remains reachable and interaction works at the visible NPC;
   - FAIL: new collision blocks the NPC/door/path or interaction no longer matches position.

**Not being judged in B1:** roof/canopy occlusion, tree sway, full-village collision, ford/stepping stones, enemy collision, water VFX.

## B1 PASS gate

B1 is PASS only when all seven checks above behave naturally on Android and there is no traversal/combat/interaction regression.

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

Resume from verified current GitHub state with transfer state `READY_FOR_WORK`: NPC Re-block A is PHONE PASS, and the exact next task is **Proof B1 — Healer-pocket collision foundation only**. Deploy it and return the QC link/build **with the seven-item Phone-QC checklist above**.
