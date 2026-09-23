# Current Project Handoff

Current owner: DESIGN_CHAT
Transfer state: READY_FOR_WORK
Repo-write permission: WORK
Return condition: Work deploys Terrain Proof V2 and returns a QC link/build, or Work encounters a new high-impact ASK/design ambiguity and marks RETURN_TO_DESIGN.

Snapshot: 2026-09-23
Repository: `momentum448-glitch/xianxia-arpg-web`
Current main: `f987be1c2edf39988534879d32ba7451fb67e671`
Phone/runtime build: `BUILD 1823667`
Relevant merged PR: #104 — Thanh Van Thon whole-map terrain proof V1
Open relevant execution PR: none
Unrelated old open PR: #4
CI: PASS
GitHub Pages deploy: PASS

## Current objective

Execute **Whole-map Terrain Proof V2** after Phone QC rejected V1's vector-looking terrain treatment. Preserve the accepted map skeleton and good V1 structural choices, but replace the terrain treatment with a painterly, natural, mobile-readable result.

## Verified completed state

- Production flow is `CharacterSelect → Production Game`.
- QC utilities are available in production: zoom `1.0x / 0.8x / 0.65x / 0.5x` and `ẨN UI / HIỆN UI`.
- Thanh Vân Thôn compact topology, Topology Revision A + Tune A1, remains accepted/locked.
- Elder / Merchant / Healer internal pocket composition remains accepted and should not be regenerated for this terrain pass.
- Existing Phone-PASS environment assets remain canonical: houses, Merchant Kit B, Healer Water+Bridge A, Healer Activity Kit A, Field Edge Kit B, Ground/Path P0 and base prop kit.
- User and DESIGN_CHAT completed a new whole-map discovery round and locked a stronger terrain/environment direction.
- North-star reference `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1` is durably stored in Drive.
- `ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1` is integrated in production and deployed through PR #104.
- Phone QC of V1 at 0.5x + UI hidden is **REVISE**.
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
- Status: `REVISE` after Phone QC
- Runtime file: `public/assets/c4/environment/settlement/env_settlement_terrain_wholemap_v1.svg`
- Runtime integration: `src/game/settlementV2AProduction.ts`
- Preload integration: `src/scenes/ProductionGameScene.ts`
- Build: `1823667`
- PR: #104
- Technical gate: PASS
- Phone gate: REVISE

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

## Phone-QC findings for V1

What worked and should be preserved:

- removing the purposeless floating fences improved logic;
- the overall idea of a secondary stream in the lower half is useful;
- accepted A1 topology / hero-pocket hierarchy still reads correctly;
- the stream belongs in the lower map rather than becoming a new central axis.

Why V1 failed:

1. **Macro edge shapes look procedural/vectorial.** Large pale-green circular/rounded masses are visibly geometric and read as overlay masks instead of terrain.
2. **Stream color/fidelity is mismatched.** The stream is too cyan/clean and visually detached from the painterly village art.
3. **Water geometry is too regular.** Width and banks feel generated from a broad stroke rather than a natural creek.
4. **Healer pond → stream join is hard and synthetic.** A rectangular/strip-like transition is visible instead of a believable wet bank/channel.
5. **Ground still reads too flat.** Despite added variation, the village floor still lacks enough painterly soil, grass-edge and worn-ground language to feel like one continuous place.
6. **Southern fringe is structurally better, but the underlay art does not yet blend with the accepted field/house assets.**

This is an **art-treatment failure, not a topology failure**. Do not reopen A1 topology or accepted hero-pocket placement.

## Exact execution brief for Work — Terrain Proof V2

1. Start from verified current `main` and create a focused branch.
2. Preserve:
   - A1 topology and all hero-pocket placement;
   - current stream *role* and lower-map direction concept;
   - fence cleanup;
   - all PHONE_PASS houses/pockets/field assets;
   - gameplay, collision, NPC coordinates/radii and combat logic.
3. Replace the V1 vector-looking terrain treatment with a painterly terrain layer:
   - **do not use large circular/elliptical macro masks**;
   - **do not fake the fix with more scattered props**;
   - prefer a raster/painterly terrain source or natural irregular decals that visually match the accepted environment art;
   - if Work cannot access an image-generation/art-production path, return `RETURN_TO_DESIGN` instead of substituting another geometric SVG proof.
4. Stream V2:
   - muted jade/earthy water closer to the healer pond palette;
   - irregular width and meander;
   - softer, broken natural banks;
   - blend the Healer pond into the creek with a believable outlet/wet-bank transition;
   - keep water subordinate to the main spine and hero buildings.
5. Ground V2:
   - irregular worn-earth patches, subtle soil value changes and grass/weed edges;
   - strongest detail around used village spaces, lighter detail in quiet negative space;
   - no giant tonal blobs that reveal their construction.
6. Village edge V2:
   - use natural brush/grass/low earth/rock/tree framing;
   - avoid a hard perimeter;
   - do not create a repetitive prop ring.
7. Integrate one reversible V2 proof only, build, deploy and verify.
8. Update `ASSET_REGISTRY`, `HANDOFF_CURRENT` and any decision/source records affected by the new asset.

## V2 PASS gate

Phone QC must show:

- at 0.5x + UI hidden, no obvious circular/vector terrain masks;
- whole village reads as one continuous rural landscape;
- stream looks naturally embedded in the ground and visually matches the healer pond;
- pond → stream join is believable;
- stream remains secondary to road/buildings;
- southern field/residential edge blends into the same terrain language;
- ground feels materially richer without becoming noisy;
- no accepted pocket/topology/gameplay regression.


## Do not repeat blindly

- Do not solve whole-map cohesion by re-enabling Cohesion Pass A scatter props.
- Do not regenerate accepted hero-pocket assets for terrain problems.
- Do not flatten the north-star image into a single runtime background.
- Do not add more fence/trees/rocks merely to fill blank areas before this terrain proof is judged.
- Do not jump to NPC identity while this proof is unresolved.
- Do not let DESIGN_CHAT and Work edit the repo concurrently.

## Exact next action

Work executes **Terrain Proof V2** from the brief above, then returns the deployed build/link for Phone QC. Do not broaden scope beyond terrain/water/edge treatment.

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

Resume from `main f987be1` with transfer state `READY_FOR_WORK`: Terrain Proof V1 on `BUILD 1823667` is REVISE because its SVG/vector terrain treatment reads artificial on phone. Execute one painterly Terrain Proof V2 that preserves A1 topology, hero pockets, fence cleanup and gameplay, then deploy and return for Phone QC.