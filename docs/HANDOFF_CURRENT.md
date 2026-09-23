# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: WAIT_QC
Repo-write permission: NONE_WHILE_WAITING_QC
Return condition: user provides Phone-QC screenshots/observations for BUILD 1823667; DESIGN_CHAT evaluates PASS/REVISE and either continues discovery or marks READY_FOR_WORK.

Snapshot: 2026-09-23
Repository: `momentum448-glitch/xianxia-arpg-web`
Current main: `18236670a62da3b9a5347c37c2c243e0a08feda8`
Phone/runtime build: `BUILD 1823667`
Relevant merged PR: #104 — Thanh Van Thon whole-map terrain proof V1
Open relevant execution PR: none
Unrelated old open PR: #4
CI: PASS
GitHub Pages deploy: PASS

## Current objective

Phone-QC the first modular whole-map terrain proof for Thanh Vân Thôn before any further production execution.

## Verified completed state

- Production flow is `CharacterSelect → Production Game`.
- QC utilities are available in production: zoom `1.0x / 0.8x / 0.65x / 0.5x` and `ẨN UI / HIỆN UI`.
- Thanh Vân Thôn compact topology, Topology Revision A + Tune A1, remains accepted/locked.
- Elder / Merchant / Healer internal pocket composition remains accepted and should not be regenerated for this terrain pass.
- Existing Phone-PASS environment assets remain canonical: houses, Merchant Kit B, Healer Water+Bridge A, Healer Activity Kit A, Field Edge Kit B, Ground/Path P0 and base prop kit.
- User and DESIGN_CHAT completed a new whole-map discovery round and locked a stronger terrain/environment direction.
- North-star reference `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1` is durably stored in Drive.
- `ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1` is integrated in production and deployed through PR #104.
- Terrain proof changes are visual only; gameplay collision, interaction radius, combat hitbox and timing were not changed.

## Locked whole-map direction

- Preserve the accepted A1 vertical spine and hero-pocket skeleton.
- Allow strong terrain/environment composition around that skeleton.
- Village context: humble rural settlement beside agriculture and water.
- Use one secondary stream that cuts across part of the lower map and exits the village edge.
- Remove most purposeless free-standing fence scatter.
- Retain fence only where it has yard/field/property logic.
- Ground should gain moderate believable variation: worn earth, value variation, grass/soil edges and light cultivation traces.
- Frame the village with natural macro shapes: meadow/brush/low earth/tree/rock language, not a hard perimeter wall.
- Keep the playable interior readable/open for portrait mobile.
- The north-star image is a composition reference, not permission to flatten the game into one background.

## Current proof

### ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1

- Role: reference / composition north-star
- Status: `REFERENCE_ONLY`
- Drive path: `/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v001.png`
- Drive file ID: `1WzAg_jBz3J6xiNO3jbmh7fMON6wBueJR`
- Design doc: `docs/environment/THANH_VAN_THON_WHOLE_MAP_V1.md`

### ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1

- Role: runtime proof
- Status: `INTEGRATED`, Phone QC pending
- Runtime file: `public/assets/c4/environment/settlement/env_settlement_terrain_wholemap_v1.svg`
- Runtime integration: `src/game/settlementV2AProduction.ts`
- Preload integration: `src/scenes/ProductionGameScene.ts`
- Build: `1823667`
- PR: #104
- Technical gate: PASS
- Phone gate: PENDING

## What the terrain proof intentionally changes

- more varied/lived-in soil underlay;
- natural village-edge framing;
- secondary lower-map stream;
- light agricultural traces;
- removal of floating north/south decorative fence stamps.

## What it intentionally does not change

- accepted hero-pocket positions/composition;
- house/Merchant/Healer/Field Edge canonical art;
- NPC interaction coordinates/radii;
- gameplay pathfinding/collision;
- combat hitboxes/timing;
- camera gameplay intent.

## Do not repeat blindly

- Do not solve whole-map cohesion by re-enabling Cohesion Pass A scatter props.
- Do not regenerate accepted hero-pocket assets for terrain problems.
- Do not flatten the north-star image into a single runtime background.
- Do not add more fence/trees/rocks merely to fill blank areas before this terrain proof is judged.
- Do not jump to NPC identity while this proof is unresolved.
- Do not let DESIGN_CHAT and Work edit the repo concurrently.

## Exact next action

1. User opens deployed build `1823667`.
2. Phone QC at `0.5x + ẨN UI` for whole-map envelope / stream / negative-space balance.
3. Phone QC at `0.65x` for pocket continuity.
4. Capture/inspect `1.0x` around Healer-to-stream join, stream/spine crossing and southern field/residential edge.
5. DESIGN_CHAT classifies PASS / REVISE and closes any new ASK items.
6. Only after decisions are closed: set transfer state to `READY_FOR_WORK` and hand the exact implementation task to Work.

## PASS gate

- village feels naturally enclosed without a fence perimeter;
- stream makes the map more alive but remains subordinate to the route/hero pockets;
- ground no longer reads like a flat blank sheet;
- stream/water joins do not look broken at 1.0x;
- southern residential + agricultural fringe reads coherently;
- accepted hero-pocket hierarchy remains intact;
- no runtime/mobile rendering artifact;
- no gameplay or interaction regression.

## Two-conversation workflow

- DESIGN_CHAT owns discovery, decisions, Phone-QC interpretation and PASS/REVISE.
- WORK owns implementation only after transfer state becomes `READY_FOR_WORK`.
- During `WAIT_QC`, neither Work nor the design chat should broaden production implementation.
- If Work later finds a new high-impact creative/product ambiguity, it returns with `RETURN_TO_DESIGN`.
- GitHub + this handoff + registry/decision docs are shared memory.

## Resume sentence

Resume from `BUILD 1823667` with transfer state `WAIT_QC`: Whole-map Terrain Proof V1 is technically deployed and awaits Phone QC. Do not start further environment production or NPC identity until DESIGN_CHAT evaluates the proof and explicitly changes the handoff to `READY_FOR_WORK`.
