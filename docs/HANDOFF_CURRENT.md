# Current Project Handoff

Snapshot: 2026-09-19
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 production-art correction

## Snapshot semantics

Functional/gameplay baseline at the moment the current blocker was captured:

`0bcbbeb101ae06e311def5d8100507e724dc9700` (`BUILD 0bcbbeb`)

That commit contains PR #39, the settlement production-house integration and the black-rendering bug described below.

Documentation-only commits have advanced `main` after that functional baseline. Always verify live `main`, open PRs, and relevant branches before acting. Do not treat the baseline SHA above as a permanent current-main pointer.

## Current objective

Fix the settlement production-house black-render bug with the smallest possible proof: install only the registered clean Hall source as the Hall runtime PNG, deploy it, and confirm on Android phone that the black block disappears before touching the remaining three house assets.

## Verified completed state

### Gameplay / world

- C0 portrait foundation is complete.
- C1 combat foundation is complete enough and has evolved to manual `ATK + SKILL + NÉ` controls.
- C2 cultivation loop is complete and phone-QC passed.
- C3 continuous world, NPC interaction, biome encounters, and short events are structurally complete.
- World scale is 1600 × 9000.
- Settlement safe-zone and distance-based aggro behavior are in place.
- Third-Kiếp-Ảnh projectile cleanup freeze was fixed and must not regress.

### C4 production art

- Male player production PNG is integrated.
- Male runtime animation proof exists for idle/run/ATK/dodge/skill response.
- Melee production enemy passed phone QC after preload/path/binary/readability-ring fixes.
- Production flying sword passed layered phone QC for raw blade, launch cue, trail, and impact.
- Settlement runtime composition/density proof passed; preserve this layout.

### Settlement house design/integration

PR #39 (`C4.2 Phase 1: integrate settlement production houses`) was merged.

Runtime house files:

```text
public/assets/c4/environment/settlement/
  env_house_thatch_a.png
  env_house_tile_a.png
  env_house_hall_a.png
  env_house_thatch_b.png
```

Runtime preloads/renders these textures and exposes `HOUSE TEX MISS` instead of silently falling back to procedural houses.

The four-house visual set itself is `DESIGN_PASS`; the accepted visual design should not be regenerated merely because the current runtime binaries are bad.

## Current unfinished state

The production-house integration is **not phone-passed**.

Observed symptom:

- production houses render as black rectangles on Android/live build;
- no `HOUSE TEX MISS`, so the loader sees a texture rather than a simple missing-path 404.

Best-supported diagnosis after the previous debugging session:

- the house binaries integrated in the repo are broken/truncated/corrupt;
- palette/indexed encoding was initially suspected, but later Pillow/GitHub-Action verification produced broken data-stream evidence;
- salvage attempts were rejected because they visibly damaged/diverged from the accepted art;
- the correct route is to install a clean source binary and verify full decode/technical identity before runtime QC.

No gameplay/layout redesign is required to test this diagnosis.

## Assets required to resume

See `docs/ASSET_REGISTRY.md` for durable asset identity.

### `ENV-HOUSE-SET-A`

- Role: accepted design/reference + current broken runtime set.
- Design status: `DESIGN_PASS`.
- Runtime technical status: `TECH_REWORK` / REJECT.
- Runtime directory: `public/assets/c4/environment/settlement/`.
- Important: do not regenerate/redesign the four accepted house concepts unless explicitly marked `REVISE`.

### `ENV-HOUSE-HALL-A-CLEAN`

- Role: clean source candidate for the minimal Hall repair proof.
- Status: `ISOLATED_READY` as source/backup candidate; **not yet integrated into GitHub runtime**.
- Filename: `env_house_hall_a.png`.
- Verified durable source: Google Drive folder `10_QC_PASS`.
- Drive file ID: `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`.
- Verified Drive metadata on 2026-09-19:
  - MIME: `image/png`
  - size: `22,633` bytes
  - parent folder ID: `1AzY928GT097WptHw7kHy4uuqTozChY7W`
- Prior handoff recorded a byte-count round-trip PASS and described this source as clean RGBA.
- Before installation, re-verify full PNG decode, actual RGBA/alpha properties, expected dimensions, and hash if available.
- Runtime target: `public/assets/c4/environment/settlement/env_house_hall_a.png`.

If this exact Hall source is also promoted into ChatGPT Project Sources, record its Project Source filename in `ASSET_REGISTRY.md`.

## Branch truth at the blocker snapshot

### `fix/settlement-house-rgba`

At last verification:

- contains staging/workflow commits;
- had no PR;
- had not been merged/deployed;
- had not actually replaced the runtime house PNGs with a finished fix.

Known contents included:

```text
.asset_stage_rgba/env_house_hall_a.part0
.asset_stage_rgba/env_house_hall_a.part1
.asset_stage_rgba/env_house_thatch_a.part0
.github/workflows/convert-settlement-house-rgba.yml
```

Interpretation: technical staging/proof machinery, not a completed runtime repair. Do not merge blindly.

### `fix/settlement-hall-direct-proof`

At last verification:

- branch existed;
- no verified successful clean Hall binary write/commit had been established;
- the previous direct binary operation stalled before completion.

A newer chat must re-check both branches because GitHub may have advanced after this snapshot.

## Do not repeat blindly

### Chunked/Base64 binary staging

Problems already seen:

- truncation/corruption risk;
- many staging commits;
- difficult observability;
- operational complexity.

Only reuse if there is a clearly improved, verified reason.

### Workflow-only verification

A workflow can prove staged bytes are valid, but that is not equivalent to the game using those bytes.

Do not call the house bug fixed until the validated file is the actual runtime PNG, deployed, and phone-QC'd.

### Salvage of corrupt PNGs

Pillow truncated-image salvage was tested and rejected because output was visibly/technically damaged. Do not promote salvaged house files into production.

### Direct large `create_blob` binary transport

The Hall image blob attempt previously hung at binary creation. Do not retry the same opaque transport loop without first checking whether anything partially succeeded and without a bounded/observable method.

### PC / Work bridge as first reflex

Prior PC/Work-style bridges introduced synchronization ambiguity and duplicate-write risk. They are fallback transport options, not the first reflex.

### Important correction about Drive

Google Drive itself is **not rejected**. The clean Hall Drive copy has been verified to exist and is a useful byte-preserving source/backup. The risk was using multiple bridge mechanisms without a single canonical asset identity.

## Locked decisions relevant to this task

- Preserve approved settlement composition/layout.
- Preserve the accepted four-house visual design.
- Do not alter collision or gameplay for this technical texture proof.
- Use a minimal one-Hall proof before converting all house assets.
- Production art must be technically normalized and validated in runtime, not merely generated.
- Phone result is the acceptance authority.
- Asset continuity must follow `ASSET_REGISTRY.md` and `PROJECT_SOURCES.md` so future chats do not lose approved source images.

## Exact next actions

1. Re-verify live GitHub state: current `main`, open PRs, `fix/settlement-house-rgba`, `fix/settlement-hall-direct-proof`, and any newer Hall-fix branch.
2. Re-verify `ENV-HOUSE-HALL-A-CLEAN` from Drive ID `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`: full decode, expected PNG/RGBA/alpha properties, size/hash/dimensions; reconcile with any Project Source copy if one exists.
3. If no clean runtime proof already exists, create/continue a clean branch from verified current `main` and replace **only** `public/assets/c4/environment/settlement/env_house_hall_a.png` with this registered clean source; keep code/layout/gameplay unchanged.
4. Build/deploy and confirm a new visible Build ID.
5. Phone-QC Hall rendering.
6. Only after Hall PASS, import the other three clean house sources through the same proven path and re-check all six placements.
7. Update `ASSET_REGISTRY.md` with technical hash/size/runtime status and Project Source names as assets are promoted.

## PASS gate for the Hall proof

Do not expand the fix until all are true:

- source identity is unambiguous (`ENV-HOUSE-HALL-A-CLEAN`);
- Hall file fully decodes and passes expected PNG/RGBA/transparency checks;
- runtime GitHub file matches the validated source by recorded identity (prefer SHA-256 plus byte size);
- project build passes;
- deployment completes;
- visible Build ID proves the new bundle is loaded;
- Hall does not show `HOUSE TEX MISS`;
- Hall does not render as a black/white rectangle;
- no dirty alpha/corrupt rows are visible;
- scale still reads correctly against player/NPC;
- user confirms the result on Android phone.

## Final settlement phone gate

After scaling the proven fix to all four house assets:

- all six house placements show production art;
- no `HOUSE TEX MISS`;
- no black/white rectangles;
- no dirty alpha/corruption;
- believable scale;
- central route remains readable;
- repeated variants are acceptable at normal phone zoom;
- all four runtime asset records in `ASSET_REGISTRY.md` identify the final canonical bytes/QC state.

## Known stale/conflicting docs

The following older wording must not override newer merged decisions:

- `README.md` still describes auto basic attack and three active skills + dodge.
- `docs/ART_BIBLE.md` still contains old auto-attack / Skill+Dodge-only control wording.
- `docs/PLAN.md` has a lower C4.2 paragraph that still mentions a 620 ms attack cooldown even though the newer locked value is 800 ms.
- older C4.2 registry status tables may lag behind later execution work.

Use current code/Git history, `DECISION_LOG.md`, `ASSET_REGISTRY.md`, and this handoff to resolve those conflicts until those source docs are cleaned up.

## After the house fix

Continue C4.2 before broad gameplay expansion:

- finish environment production quality beyond the house proof;
- validate minimum viable animation pipeline;
- expand production art to female player, ranged enemy, charger enemy, NPCs, and remaining biome assets;
- promote every future `DESIGN_PASS` identity/style anchor into Project Sources and the Asset Registry as part of the approval step, not weeks later at handoff time.

After visual readability stabilizes, return to deferred C3 combat-pressure and enemy-distribution tuning.

C5 later adds boss, save/resume, 15–30 minute end-to-end pacing, mobile performance profiling, and final device QC.

## Resume sentence

Verify live GitHub state and recover the registered `ENV-HOUSE-HALL-A-CLEAN` source (Drive ID `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`); if no newer clean runtime fix exists, install that one Hall source only, deploy, and require Android phone PASS before touching the other houses.
