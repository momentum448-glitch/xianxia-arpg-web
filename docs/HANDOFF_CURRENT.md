# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: NONE_WHILE_WAITING_QC
Return condition: Android Phone QC of B2A.1. If the three checks below pass, mark B2A PHONE_PASS and prepare the B2B handoff; do not automatically start production.
Snapshot: 2026-09-26
Repository: `momentum448-glitch/xianxia-arpg-web`

## Current objective

Evaluate **B2A.1 — Merchant goods collision + route-rock cleanup**. The runtime fix is merged in PR #130, functional commit `b9cd497b6df5fb2176983f7019e81dd3c5c7e083`.

## Verified repository state

- Execution began from real main `9ef377f8408efa9676a308b79d6ed3ca7ce38aec` (PR #129), superseding stale c1d14ab/c02cec7 handoff headers.
- Runtime branch: `work/b2a1-merchant-collision`; PR #130 merged. No unfinished runtime changes.
- Runtime baseline for this documentation checkpoint: main `b9cd497`.
- PR CI #36248890815 PASS. Main CI #36248929947 and Pages #36248929928 PASS. Live badge verified `BUILD b9cd497` at https://momentum448-glitch.github.io/xianxia-arpg-web/?qc=b9cd497.
- Unrelated PR #4 remains untouched.
- This docs-only checkpoint may advance the live build badge while retaining the same B2A.1 runtime. Verify real main and Pages before continuing.

## Implemented / self-VERIFY

- `src/game/settlementCollision.ts`: one capsule footprint from `(1132,8076)` to `(1218,8076)`, half-width 12, under the lower Merchant crates/baskets. It excludes upper stacks and transparent/shadow margins, with rounded ends for sliding.
- Grounding was checked against canonical `env_merchant_goods_b.png`: RGBA 380 × 382, alpha bounds `(9,62)–(377,360)`, display width 135, bottom-center anchor `(1175,8100)`. No binary/art change.
- `src/game/settlementV2AProduction.ts`: removed only the Merchant `rockGrass` at `(840,8090)`, width 118. No replacement prop or collider was added.
- Local TypeScript/Vite build PASS. Four directional 78-unit dodge probes stop outside the goods; diagonal contact advances along the rounded edge; paths around the goods and the former rock location remain open. Merchant approach `(1045,8113)` is clear.
- Compared every accepted B1/B2A shape and the full movement resolver with the baseline: unchanged except the one added footprint. A 5-unit whole-settlement grid comparison confines changed collision results to the goods region.
- Runtime display/interaction check: live desktop 1.0x on `b9cd497` loaded correctly; former route rock absent, route traversed, Merchant interaction prompt appeared. Player reached the goods from the south/east and pushing north at the lower pile stopped without walking through. Dialogue response was not conclusively observed in the cloud browser; retain it in the Phone-QC checklist.
- Android Phone QC is pending. Do not mark B2A PHONE_PASS from desktop or coordinate tests.

## Locked accepted state

- Illustrated World Hybrid Proof A terrain, A1 topology and NPC Re-block A are PHONE_PASS.
- B1/B1.1 Healer house/tree/fence/water/bridge collision is PHONE_PASS on `fce1ca2`, functional runtime `ea86424`.
- B2A Android review accepted all other tested behavior; only Merchant goods pass-through and the route rock required B2A.1.
- Preserve player foot radius 11 at control center +31 Y, 5-unit substeps, axis sliding, world bounds, dodge protection and combat timing.
- NPC anchors/radii: Elder `(490,7828)`, Merchant `(1045,8082)`, Healer `(490,8382)`; radius 155.
- B2B water expansion/ford art and Proof C occlusion/tree motion remain blocked pending this Phone PASS.

## Anh cần QC — B2A.1

Use **1.0x**, UI visible.

1. **Merchant goods**
   - walk directly into the large goods pile from multiple sides and try diagonal movement / dodge;
   - PASS: player cannot walk through the grounded pile, but can slide around it without an oversized invisible box;
   - FAIL: player still clips through, gets blocked far outside the visible pile, or sticks on corners.

2. **Main route where the rock was**
   - walk Elder ↔ Merchant through the former rock location;
   - PASS: the decorative rock is gone and the route reads cleaner / remains fully open;
   - FAIL: the rock remains, a replacement obstruction appears, or an invisible collider remains behind.

3. **Merchant interaction regression**
   - circle stall/cart/goods and approach Thương Nhân;
   - PASS: Merchant remains reachable and interaction works normally;
   - FAIL: the new goods collider blocks the NPC/shopfront or changes interaction behavior.

**Already accepted unless regression appears:** Elder, southern houses, tree-base/fence collision, Healer B1 water/bridge, diagonal/dodge behavior elsewhere.

**Not being judged:** B2B full-creek collision, ford/stepping stones, occlusion, tree sway, enemy collision/pathfinding, water VFX.

## B2A.1 PASS gate

If these three checks pass on Android, mark **B2A = PHONE_PASS** and advance to B2B.


## Assets required / continuity

- `ENV-MERCHANT-KIT-B`: canonical goods `public/assets/c4/environment/settlement/env_merchant_goods_b.png`; stall/cart/sign in the same folder. Art remains DESIGN/TECH/RUNTIME/PHONE_PASS; B2A.1 collision is INTEGRATED, Phone QC pending.
- `ENV-SETTLEMENT-PROP-KIT-A`: canonical `env_rockgrass_village_a.png` remains in GitHub; only one Merchant placement was removed. Other props retain accepted state.
- `ENV-SETTLEMENT-BAKED-TERRAIN-PLATE-V1`: canonical `env_settlement_baked_terrain_plate_v1.png`, PHONE_PASS, unchanged.
- Runtime GitHub assets remain canonical; existing Drive backups stay registered in ASSET_REGISTRY and PROJECT_SOURCES. No generated/replaced asset or Library-only dependency.

## Failed paths / cautions

- Do not use full sprite rectangles as collision or alter accepted B1 bridge geometry.
- A first route probe began inside the already accepted stall blocker; corrected to a clear starting point. This was a test-fixture error, not a movement regression.
- Repo has no lockfile: use `npm install` as CI does, not `npm ci`.
- Local Vite on 0.0.0.0 hit an interface-enumeration error; 127.0.0.1 works. Local Playwright browser executable was unavailable; use the cloud browser for live UI QC.
- Direct git push has no credentials. Connected GitHub API successfully committed the reviewed changes. An initial automated review questioned documentation publication; verified that the file is already public and user/AGENTS instructions explicitly require its update, then the authorized update succeeded.
- Historical B1 bridge leak: broad gaps between water polygons allowed walking on water. The accepted fix uses continuous water plus an explicit narrow bridge corridor. Preserve it.

## Exact next action / resume

1. Verify live main/build and this handoff before writes.
2. Obtain Android results for the three B2A.1 checks above.
3. PASS → record B2A PHONE_PASS and return to design for B2B; FAIL → revise only the demonstrated regression. Do not reopen accepted terrain/topology or start B2B/Proof C now.

## Known stale historical documents

Older architecture/playbook/production-log text may still say B1 or B2A is the immediate task. This handoff, the latest Decision Log entries and actual merged runtime take priority. Earlier handoff history is recoverable from Git history before PR #130.
