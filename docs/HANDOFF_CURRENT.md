# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: READY_FOR_WORK
Repo-write permission: WORK
Return condition: Work deploys **Proof B2B2 — one authored stepping-stone crossing only** and returns build/QC evidence with the focused checklist below. Proof C remains blocked until B2B2 Phone PASS.
Snapshot: 2026-09-27
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified current main before this continuity update: `82dc68e72489cf99495eaf2fa52456662b2846c5`
B2B1 functional runtime: PR #133 / `cc9c7962ec019fbd5f25db153dede79482d2307c`
B2B1 handoff/docs: PR #134 / `82dc68e`
Open relevant execution PR: none
Unrelated open PR: #4

## Phone PASS just recorded

User Android QC reports all five B2B1 checks PASS.

Therefore **B2B1 = PHONE_PASS**.

Accepted water baseline now includes:

- Healer B1 pond/creek + explicit wooden-bridge corridor;
- western map-edge inlet blocking;
- exposed creek southeast of Healer blocking;
- eastern bend / southeast outlet blocking;
- preserved dry central route;
- normal diagonal slide / dodge protection;
- full Elder → Merchant → Healer → southern route connectivity.

Preserve all B1/B2A/B2B1 geometry unless a new concrete QC regression appears.

## Current objective

Execute **Proof B2B2 — one visually authored stepping-stone crossing only**.

Question:

> Can one small, clearly readable shallow stepping-stone crossing create an intentional second water crossing without making the creek look artificial, opening walkable water beside the stones, or disturbing the accepted route?

## Locked design choice

Use **stepping stones**, not a second bridge and not an invisible ford.

Preferred crossing zone:

- eastern / southeast creek bend;
- target center approximately **(1200, 8550)** world coordinates;
- practical verification band approximately **x 1160–1235, y 8505–8590**;
- this should visually connect the main village side to the southern-east field / house pocket.

Why this location:

- B2B1 proved the map does not need a second crossing for basic connectivity, so this is an optional authored shortcut;
- it gives the southeast pocket a more natural relation to the village;
- it is visually distinct from the existing Healer wooden bridge;
- it fits the humble rural/agricultural tone better than a second constructed bridge.

## Asset target

Asset ID: `ENV-CREEK-STEPPING-STONES-A`

Role:

- one compact transparent crossing prop;
- 4–6 irregular flat stones;
- low profile, worn, muted warm-gray / earth-stained stone;
- painterly match to the current terrain plate;
- no bright white stones, shrine styling, ornate masonry or hero-landmark treatment;
- readable at 1.0x but subordinate at 0.5x.

Target runtime path:

`public/assets/c4/environment/settlement/env_creek_stepping_stones_a.png`

If Work generates a new source/binary, record exact metadata/checksum and update `ASSET_REGISTRY.md`. Runtime GitHub file becomes source of truth.

## Exact Work brief — B2B2 only

1. VERIFY the target creek section against the live baked plate / B2B1 water polygons before fixing final coordinates.
   - use the target band above as design intent;
   - small coordinate adjustment is allowed to align with the visible banks;
   - do not relocate the crossing to another pocket without returning to design.

2. Create or recover one stepping-stone asset matching the locked design.
   - transparent background;
   - no black matte;
   - no baked water/grass beyond minimal stone-edge grounding;
   - stones should form one believable shallow crossing path, not a straight ruler line.

3. Integrate the visual prop as a separate static object over the baked creek.
   - keep visual width/height only as large as needed for the visible crossing;
   - do not repaint the baked terrain plate.

4. Add **one explicit walkable crossing corridor** through the B2B1 water collision aligned to the visible stepping stones.
   - only the visible stepping-stone path may exempt water blocking;
   - adjacent visible water must stay blocked;
   - corridor should be narrow enough that sideways movement off the stones immediately meets water collision;
   - use the same explicit-crossing principle proven by the Healer bridge.

5. Preserve:
   - all accepted B2B1 water polygons;
   - Healer bridge corridor;
   - B2A static collision;
   - player foot radius / movement substeps / slide / dodge behavior;
   - NPC positions/radii;
   - combat timing/hitboxes;
   - A1 topology and current art.

6. Do not add:
   - a second new crossing;
   - a second bridge;
   - water slowdown/splash/damage;
   - occlusion/Y-depth work;
   - tree motion;
   - enemy pathfinding changes;
   - extra creek polish.

## Work self-VERIFY before deploy

- cross the stepping stones both directions with normal movement;
- push sideways off the crossing at north bank, mid-span and south bank;
- dodge toward / across the crossing;
- verify adjacent water remains blocked on both sides;
- verify the visual stones and collision corridor line up;
- verify full route and all NPCs remain reachable;
- verify existing Healer bridge is unchanged;
- build, deploy and verify live build badge.

## Required Work return format

Return in one message:

1. QC link;
2. build ID;
3. asset ID/path + metadata;
4. final crossing anchor/corridor coordinates;
5. short self-QC result;
6. the **“Anh cần QC — B2B2”** checklist below.

Do not return a bare link.

## Anh cần QC — B2B2

Use **1.0x**, UI visible.

1. **Visual readability**
   - inspect the new stepping stones at the southeast creek;
   - PASS: clearly reads as a deliberate shallow crossing, fits the painterly village and stays visually modest;
   - FAIL: looks pasted-on, too bright/ornate, too regular, or unclear as a crossing.

2. **Cross both directions**
   - walk across the stones north→south and south→north;
   - PASS: crossing is smooth and the character stays visually on/very near the stone path;
   - FAIL: invisible snag, unexpected sideways push, or route feels narrower than the visible stones.

3. **Side-water blocking**
   - at both ends and mid-crossing, deliberately steer sideways into visible water;
   - PASS: player cannot leave the stone path into adjacent water;
   - FAIL: any visible water next to the stones becomes freely walkable.

4. **Dodge**
   - dodge across the stones, then dodge sideways toward adjacent water;
   - PASS: crossing works without tunneling and sideways dodge does not bypass water collision;
   - FAIL: dodge lands in water or jumps across a blocked bank.

5. **Regression smoke**
   - briefly check the Healer bridge and route toward Merchant / southern fringe;
   - PASS: old bridge and full village route still behave normally;
   - FAIL: new crossing change breaks the old bridge or blocks an accepted route.

**Already accepted unless regression appears:** B1/B2A/B2B1 collision, NPC interaction, current terrain plate.

**Not being judged:** roof/tree occlusion, tree sway, enemy pathfinding, water VFX, second additional crossing.

## B2B2 PASS gate

B2B2 is PHONE PASS when all five checks pass on Android.

After PASS, the collision foundation is complete enough to move to **Proof C — occlusion + one tree-motion case**.

## Planned Proof C after B2B2

- one near-road tree:
  - trunk collision already preserved;
  - canopy occlusion in front of player when player passes behind;
  - subtle canopy sway;
- one building:
  - roof/eave foreground occlusion case;
- Phone QC before any expansion.

## Failed paths / cautions

- do not leave a broad hole in water collision around the new crossing;
- do not make all water walkable near the stones;
- do not use full-sprite collision for the stones;
- do not create a second crossing in the same proof;
- do not combine this with occlusion/tree-motion work.

## Resume sentence

Resume from verified live `main 82dc68e` with transfer state `READY_FOR_WORK`: **B2B1 is PHONE_PASS**. Execute **B2B2 only**: one low-profile stepping-stone crossing in the southeast creek near world `(1200,8550)`, with one explicit walkable corridor aligned to the visible stones. Deploy and return the build with the five-item Phone-QC checklist. Do not start Proof C yet.
