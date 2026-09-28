# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: DESIGN_CHAT for the QC disposition; Work must not begin Proof C or another production proof.
Return condition: user reports the five B2B2 Android checks below; Design records PHONE_PASS or REVISE and defines the next handoff.
Snapshot: 2026-09-28
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified functional main: `a3648f73972a789a93b4adc212d22b4b6c9747e7` (PR #136, B2B2 stepping stones)
B2B1 baseline: PR #133 / `cc9c7962ec019fbd5f25db153dede79482d2307c`, PHONE_PASS
Relevant execution PR: #136 merged; unrelated open PR #4

## Current gate

**B2B2 is deployed for Phone QC, not yet PHONE_PASS.** Work implemented exactly one optional stepping-stone crossing on the eastern/southeast creek. Do not start Proof C until the user reports all five checks PASS on Android and Design records that decision.

QC URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/?qc=a3648f7`
Functional runtime badge: `BUILD a3648f7`
CI: run #36378542438 PASS. Pages: run #36378542437 PASS. Live page opened successfully with `BUILD a3648f7` and the game entered the settlement scene.

## What exists in the runtime

- Asset ID `ENV-CREEK-STEPPING-STONES-A`; canonical file `public/assets/c4/environment/settlement/env_creek_stepping_stones_a.png`.
- PNG RGBA, 78 × 100 px, 8,908 bytes, SHA-256 `1631cd602b08d177fe7f11437a193f6c85a66071a970f41522f58cfaec10d2ff`.
- Five irregular muted stones, separate object over the accepted baked plate; top-left world `(1161,8498)`, display 78 × 100, depth `-6.1`.
- One water-only explicit corridor follows the stone centers from `(1174,8509)` to `(1226,8586)` with half-width 14 world units. It exempts the B2B1 water test only; the water polygons themselves and all grounded footprints remain unchanged.
- Healer wooden bridge, B1/B2A/B2B1 collision and movement resolver, NPCs, combat, topology, terrain and other art are preserved.

Local self-QC: build PASS; normal movement across both directions PASS; sideways movement and dodge meet water on both flanks; 557 sampled previously blocked points opened only inside the corridor, zero outside; 0 differences in the old bridge region; Elder, Merchant, Healer, both southern pockets, exit and both crossing approaches reachable. Local terrain/field-edge composite shows the prop aligned to the creek, but phone visual and feel remain the gate.

## Anh cần QC — B2B2

Use **1.0x**, UI visible.

1. **Visual readability**
   - Inspect the new stepping stones at the southeast creek.
   - PASS: clearly reads as a deliberate shallow crossing, fits the painterly village and stays visually modest.
   - FAIL: looks pasted-on, too bright/ornate, too regular, or unclear as a crossing.

2. **Cross both directions**
   - Walk across the stones north→south and south→north.
   - PASS: crossing is smooth and the character stays visually on/very near the stone path.
   - FAIL: invisible snag, unexpected sideways push, or route feels narrower than the visible stones.

3. **Side-water blocking**
   - At both ends and mid-crossing, deliberately steer sideways into visible water.
   - PASS: player cannot leave the stone path into adjacent water.
   - FAIL: any visible water next to the stones becomes freely walkable.

4. **Dodge**
   - Dodge across the stones, then dodge sideways toward adjacent water.
   - PASS: crossing works without tunneling and sideways dodge does not bypass water collision.
   - FAIL: dodge lands in water or jumps across a blocked bank.

5. **Regression smoke**
   - Briefly check the Healer bridge and route toward Merchant / southern fringe.
   - PASS: old bridge and full village route still behave normally.
   - FAIL: new crossing change breaks the old bridge or blocks an accepted route.

**Already accepted unless regression appears:** B1/B2A/B2B1 collision, NPC interaction, current terrain plate.

**Not being judged:** roof/tree occlusion, tree sway, enemy pathfinding, water VFX, second additional crossing.

## After the Phone gate

B2B2 becomes PHONE_PASS only if all five Android checks pass. Then Design may transfer a separately scoped **Proof C**: one near-road tree with preserved trunk collision, canopy foreground occlusion and subtle sway; one building roof/eave occlusion case; Phone QC before expansion.

If B2B2 fails, keep the failure focused on the observed visual/collision issue. Do not create a broad water hole, second crossing, second bridge, water effects or occlusion/tree motion during B2B2 repair.

## Resume sentence

Resume from live main `a3648f7`, transfer state `WAIT_QC`: B2B1 is PHONE_PASS, B2B2 is deployed and awaiting five-item Android QC. Design evaluates the user's result before any Proof C work.
