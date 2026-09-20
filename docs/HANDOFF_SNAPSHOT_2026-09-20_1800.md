# Thanh Vân Thôn Handoff Snapshot — 2026-09-20 18:00 (+07)

This snapshot is a durable cross-chat continuation record. Read together with `AGENTS.md`, `docs/DISCOVERY_DECISION_PROTOCOL.md`, `docs/HANDOFF_CURRENT.md`, `docs/ASSET_REGISTRY.md`, `docs/PROJECT_SOURCES.md`, `docs/DECISION_LOG.md`, `docs/PROJECT_CONTEXT.md`, and relevant environment docs.

## CONTEXT

Project: `momentum448-glitch/xianxia-arpg-web`

Current focus: rebuild Thanh Vân Thôn using the new environment/level-design workflow rather than ad-hoc prop placement.

Locked village fantasy:
- poor, humble frontier village beside wilderness;
- light hub, important early but less dominant later;
- clear main spine with a few branches;
- compact playable slice that implies a larger village at the edges;
- modest water/garden/agriculture language, not a traversal puzzle.

## CODE STATE

Verified current `main` at handoff:
- `3ecba627ec8d3b824cd2bb7eeed73f0a6c47cbdc`
- merge commit for PR #75: `Tune V2-A path rhythm after phone QC`
- CI on main: PASS
- GitHub Pages deploy for main: PASS
- live QC URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/`

Recent sequence:
- PR #69: topology comparison V2-A 1800 vs V2-B 3200
- user selected V2-A
- PR #71: V2-A spatial massing, Phone QC PASS
- PR #72: accepted-art context restore, visual/context compatibility judged PASS from user screenshots
- PR #73: QC zoom tool, levels 1.0 / 0.8 / 0.65, Phone QC PASS
- PR #74: restore accepted ground/path kit to V2-A
- Phone QC on build `392d5a7`: hierarchy still good, but road too visually dominant at 0.65x and Healer branch too weak
- user approved a small path-rhythm revision
- PR #75 implemented that revision and merged to main at `3ecba62`

Primary QC scene:
- `src/scenes/VillageTopologyQcScene.ts`

## DECISIONS

Locked topology:
- V2-A footprint = `1600 × 1800`
- V2-B 3200 height rejected unless user explicitly reopens it
- north → south sequence:
  1. frontier threshold
  2. Elder pocket, west-biased
  3. Merchant pocket, east-biased
  4. Healer + water/garden pocket, west-biased
  5. residential/field fringe and route out

Locked workflow:
- CLEAN topology → Phone QC
- spatial massing → Phone QC
- CONTEXT restore with accepted art → Phone QC
- identify asset gaps
- produce only one needed proof at a time
- integrate → Phone QC → expand

Locked QC tool:
- debug camera zoom cycles `1.0x → 0.8x → 0.65x → 1.0x`
- zoom affects world only; HUD remains screen-space
- camera follows player
- zoom tool is for test/QC only

Path-rhythm revision in PR #75:
- slim main path pieces by roughly 10–15%
- lower path opacity / ground patch visual weight
- soften debug route-guide line
- strengthen only the Healer branch
- slightly reduce forecourt dominance outside Healer
- no topology, gameplay, collision, NPC interaction, or timing changes

## ASSETS

Do not regenerate accepted assets.

Accepted houses:
- `env_house_thatch_a.png`
- `env_house_tile_a.png`
- `env_house_hall_a.png`
- `env_house_thatch_b.png`

Accepted general props:
- `env_tree_village_a.png`
- `env_fence_village_a.png`
- `env_rockgrass_village_a.png`
- `env_lanternpost_village_a.png`

Accepted Merchant Kit B, Phone PASS lineage:
- `env_merchant_stall_b.png`
- `env_merchant_cart_b.png`
- `env_merchant_goods_b.png`
- `env_merchant_sign_b.png`
- accepted display widths: stall 270 / cart 180 / goods 135 / sign 60

Accepted ground/path kit reused by V2-A proof:
- `env_settlement_path_seg_a.png`
- `env_settlement_path_seg_b.png`
- `env_settlement_ground_patch_a.png`
- `env_settlement_forecourt_a.png`

Current blockout-only gaps, not production-approved yet:
- Healer pond/stream
- simple bridge
- herb beds / healer activity props
- field/agriculture language

## PHONE QC STATE

Passed:
- V2-A topology over V2-B
- V2-A spatial massing
- accepted-art context compatibility
- QC camera zoom behavior and usefulness
- merchant scale/composition from earlier build lineage

Awaiting Phone QC:
- PR #75 / build `3ecba62` path-rhythm revision

Do not mark ground/path P0 PHONE PASS until user checks `3ecba62` at both 0.65x and 1.0x.

## FAILED / REJECTED PATHS

- V2-B 3200 height: rejected by user
- old-art mixed macro proof: too visually noisy to judge topology
- giant zone ellipses: useful diagnostic, poor final composition tool
- repeated `house + tree + fence + rock + lamp` stamping: rejected workflow
- ad-hoc asset-by-asset village building before topology: rejected workflow
- regenerating accepted art to solve scale/layout: prohibited
- Remote Desktop Commander: explicitly prohibited by user

## EXACT NEXT ACTION

1. Open live build `3ecba62` on phone.
2. At `0.65x`, verify the main road no longer dominates the whole composition and the village still reads as Elder-left → Merchant-right → Healer-left with healthy negative space.
3. At `1.0x`, verify the Healer branch is now readable and joins the Dược Sư pocket naturally.
4. If PASS, lock ground/path P0 and update `DECISION_LOG`, `ASSET_REGISTRY`, and `HANDOFF_CURRENT`.
5. Then begin the next proof only: Healer water + simple bridge. Do not broaden into full Healer prop production yet.

## PASS GATE

Ground/path P0 passes only if:
- path reads as natural village ground, not a dark continuous ribbon;
- no central groove/debug-line impression remains;
- Healer branch is visible without becoming a second dominant road;
- Elder / Merchant / Healer hierarchy remains readable at 0.65x;
- movement corridor remains readable at 1.0x;
- Phone QC says PASS.

## RESUME SENTENCE

Resume from main `3ecba62`: V2-A topology, massing, context restore, and QC zoom are already accepted; PR #75 has already tuned road rhythm after the user's 0.65x feedback, and the immediate gate is Phone QC of that tuned road before producing the first new Healer water/bridge asset proof.
