# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: READY_FOR_WORK
Repo-write permission: WORK
Return condition: Work deploys **Proof B2B1 — full-creek collision audit/expansion only** and returns the build/QC link with the exact focused Phone-QC checklist below. B2B2 crossing art and Proof C remain blocked until B2B1 Phone PASS.
Snapshot: 2026-09-26
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified current main before this continuity update: `920ae9fabf5f881f62eacf5cfb49b0e9cdde51cc`
B2A.1 functional runtime: PR #130 / `b9cd497b6df5fb2176983f7019e81dd3c5c7e083`
B2A.1 docs handoff: PR #131 / `920ae9f`
Open relevant execution PR: none
Unrelated open PR: #4

## Phone PASS just recorded

User Android QC reports all three B2A.1 checks PASS:

- Merchant goods pile blocks at the grounded mass and does not create an oversized invisible box.
- The removed Merchant-route `rockGrass` is gone with no invisible collider left behind.
- Merchant remains reachable and interaction behaves normally.

Therefore **B2A = PHONE_PASS**.

Preserve:

- all accepted B1/B1.1 Healer collision;
- all accepted Elder / Merchant / southern static B2A collision;
- Merchant goods capsule added in PR #130;
- removal of only the Merchant route rock at about `(840,8090)`;
- player foot radius 11 at control center +31 Y;
- 5-unit movement substeps, axis sliding, dodge protection, world bounds;
- NPC anchors/radii and combat timing.

## Current objective

Execute **Proof B2B1 — full-creek collision audit/expansion only**.

Question:

> Can all remaining visible creek/water in the Thanh Vân Thôn playable slice be blocked consistently, using the proven simplified-water approach, while preserving the accepted route and existing Healer bridge?

This proof adds **water collision only**. It does not add stepping-stone/ford art yet.

## Exact Work brief — B2B1 only

1. VERIFY the actual visible water body from the current baked terrain plate and current runtime composition.
   - do not infer the creek only from old docs;
   - inspect the accepted live composition / asset and existing B1 water geometry.

2. Extend simplified inset water collision to the remaining reachable visible creek/water outside the accepted Healer B1 pocket.
   - water is blocked by default;
   - use a small number of readable polygons/segments, not pixel tracing;
   - bank collision should sit close to the visible water edge without creating large invisible margins.

3. Preserve the accepted Healer B1 water + explicit bridge corridor exactly unless refactoring produces demonstrably equivalent geometry.

4. Preserve all B2A static colliders and B2A.1 Merchant changes exactly.

5. Keep the existing Healer bridge as the **only authored crossing for B2B1**.
   - do not create invisible ford gaps;
   - do not add stepping stones, new bridge art or new crossing sprites in this proof.

6. Before implementation, VERIFY route connectivity with full water blocking.
   - if the accepted Elder → Merchant → Healer → southern route remains reachable through existing dry ground / bridge, proceed;
   - if full water blocking disconnects an accepted required route and a new visual crossing is necessary, **RETURN_TO_DESIGN** instead of leaving an invisible walkable-water gap or inventing new crossing art.

7. Preserve movement feel.
   - normal diagonal movement must slide along banks;
   - dodge must not tunnel through water;
   - no sticky sawtooth shoreline made from excessive micro-polygons.

8. Do not change:
   - terrain art;
   - houses/trees/props/NPC positions;
   - interaction radii/semantics;
   - combat hitboxes/timing;
   - enemy collision/pathfinding;
   - occlusion / Y-depth behavior;
   - tree motion;
   - water VFX/slowdown/damage.

## Work self-VERIFY before deploy

- probe representative points along every newly blocked visible creek section;
- test at least one diagonal bank slide per new section;
- test dodge toward new water blockers;
- verify the Healer bridge still crosses both directions and does not leak sideways;
- verify all three NPCs and the southern fringe remain reachable;
- verify no dry road/field area is accidentally blocked;
- build, deploy, inspect the live build badge.

## Required Work return format

Return in one message:

1. QC link;
2. build ID;
3. concise list of newly covered water sections;
4. whether route-connectivity VERIFY passed without requiring a new crossing;
5. the **“Anh cần QC — B2B1”** checklist below.

Do not return a bare link.

## Anh cần QC — B2B1

Use **1.0x**, UI visible.

1. **Remaining creek banks**
   - walk into the visible creek/water at several points outside the Dược Sư pocket, especially east/southeast water;
   - PASS: player stops near the visible bank and cannot stand in water;
   - FAIL: any obvious visible water remains walkable or the invisible margin blocks far out on dry ground.

2. **Bank slide + dodge**
   - walk diagonally along at least two newly blocked banks and dodge directly toward water;
   - PASS: movement slides naturally and dodge never tunnels into water;
   - FAIL: sticky/jittery banks, snagging on tiny geometry, or dodge appears inside/across water.

3. **Existing Dược Sư bridge regression**
   - cross the wooden bridge both directions and push sideways near the deck;
   - PASS: crossing remains smooth and adjacent water remains blocked;
   - FAIL: bridge becomes blocked or the old water leak returns.

4. **Full route connectivity**
   - travel Trưởng Lão → Thương Nhân → Dược Sư → southern fringe;
   - PASS: all accepted destinations remain reachable without walking through visible water;
   - FAIL: new water collision cuts an accepted route or forces an impossible detour.

5. **Dry-ground false positives**
   - move along nearby roads/field edges beside the creek;
   - PASS: dry ground remains freely traversable;
   - FAIL: invisible water collision spills onto road/field in a noticeable way.

**Already accepted unless regression appears:** B2A houses/trees/fences/merchant goods, NPC interaction, current bridge, combat movement.

**Not being judged:** new ford/stepping-stone visuals, additional crossings, roof/tree occlusion, tree sway, enemy pathfinding, water VFX.

## B2B1 PASS gate

B2B1 is PHONE PASS when all five checks above pass on Android and route connectivity remains intact.

## Planned next proof

### B2B2 — one authored crossing

Only after B2B1 Phone PASS:

- choose one useful non-bridge crossing location based on actual route/composition;
- create or recover one visually clear shallow ford / stepping-stone crossing;
- make only that visible crossing walkable through the blocked creek;
- Phone QC it before considering a second crossing.

If one additional crossing proves sufficient for route/composition, do not add a second merely to hit a count.

### Proof C — Occlusion + tree motion

Only after B2B2 passes:

- one near-road tree: trunk collision + canopy occlusion + subtle wind sway;
- one building roof/eave occlusion case;
- Phone QC before expansion.

## Failed paths / cautions

- Do not use broad accidental gaps between water polygons. That caused the historical Healer water leak.
- Do not pixel-trace the creek.
- Do not create an invisible walkable ford with no visual cue.
- Do not combine B2B1 water blocking with crossing art, occlusion or VFX.
- Do not reopen accepted static collision just because the water module is being generalized.

## Resume sentence

Resume from verified live `main 920ae9f` with transfer state `READY_FOR_WORK`: **B2A is PHONE_PASS**. Execute **B2B1 full-creek collision audit/expansion only**. Preserve the existing Healer bridge as the sole crossing for this proof, verify route connectivity before coding, deploy, and return the build with the five-item B2B1 Phone-QC checklist. If full blocking requires a new visual crossing to preserve the accepted route, return `RETURN_TO_DESIGN` instead of inventing an invisible gap.
