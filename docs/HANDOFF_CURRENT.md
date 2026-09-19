# Current Project Handoff

Snapshot: 2026-09-19
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 production-art correction

## Snapshot semantics

Functional/gameplay baseline at the moment the current blocker was captured:

`0bcbbeb101ae06e311def5d8100507e724dc9700` (`BUILD 0bcbbeb`)

That commit contains PR #39, the settlement production-house integration and the black-rendering bug described below.

PR #40 later merged the cross-chat documentation system only. Therefore live `main` is expected to be newer than `0bcbbeb` even if no gameplay/asset fix has happened.

**Always verify live `main`, open PRs, and relevant branches before acting. Do not treat the baseline SHA above as a permanent current-main pointer.**

## Current objective

Fix the settlement production-house black-render bug with the smallest possible proof: replace only the Hall runtime PNG with a verified true-RGBA asset, deploy it, and confirm on phone that the black block disappears before touching the remaining three house assets.

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

### Settlement house integration

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

## Current unfinished state

The production-house integration is **not phone-passed**.

Observed symptom:

- production houses render as black blocks on phone/live build.

Best-supported diagnosis:

- integrated house PNGs are palette/indexed PNGs (`color type 3`);
- the known-good runtime direction is true RGBA PNG (`color type 6`, Pillow mode `RGBA`, real alpha channel);
- this matches the class of failure previously solved for the flying-sword texture.

No gameplay/layout redesign is required to test this diagnosis.

## Branch truth at the snapshot

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

The Hall verification workflow expected:

- PNG signature;
- bit depth 8;
- color type 6;
- Pillow mode `RGBA`;
- Hall dimensions 128 × 89;
- alpha extrema 0–255.

Interpretation: technical staging/proof machinery, not a completed runtime repair.

### `fix/settlement-hall-direct-proof`

At last verification:

- identical to the functional baseline;
- no useful delta;
- no completed proof.

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

### Direct `create_blob` path

A Hall image blob attempt previously hung at the blob-creation step.

Do not retry the same opaque write without first checking whether anything partially succeeded.

### PC / Work / Drive bridge approaches

These introduced synchronization ambiguity and duplicate-write risk. They are not the preferred first repair path.

## Locked decisions relevant to this task

- Preserve approved settlement composition/layout.
- Do not alter collision or gameplay for this technical texture proof.
- Use a minimal one-Hall proof before converting all house assets.
- Production art must be technically normalized and validated in runtime, not merely generated.
- Phone result is the acceptance authority.

## Exact next actions

1. Re-verify live GitHub state: current `main`, open PRs, `fix/settlement-house-rgba`, `fix/settlement-hall-direct-proof`, and any newer Hall-fix branch.
2. If no clean runtime proof already exists, create/continue a clean branch from verified current `main`.
3. Replace only `public/assets/c4/environment/settlement/env_house_hall_a.png` with a verified true-RGBA runtime PNG; keep code/layout/gameplay unchanged.
4. Build/deploy and confirm a new visible Build ID.
5. Phone-QC Hall rendering.
6. Only after Hall PASS, convert/install the other three house PNGs and re-check all six placements.

## PASS gate for the Hall proof

Do not expand the fix until all are true:

- Hall is a valid 8-bit true-RGBA PNG with transparency;
- project build passes;
- deployment completes;
- visible Build ID proves the new bundle is loaded;
- Hall does not show `HOUSE TEX MISS`;
- Hall does not render as a black/white rectangle;
- no dirty alpha edge is visible;
- scale still reads correctly against player/NPC;
- user confirms the result on phone.

## Final settlement phone gate

After scaling the proven fix to all four house assets:

- all six house placements show production art;
- no `HOUSE TEX MISS`;
- no black/white rectangles;
- no dirty alpha edges;
- believable scale;
- central route remains readable;
- repeated variants are acceptable at normal phone zoom.

## Known stale/conflicting docs

The following older wording must not override newer merged decisions:

- `README.md` still describes auto basic attack and three active skills + dodge.
- `docs/ART_BIBLE.md` still contains old auto-attack / Skill+Dodge-only control wording.
- `docs/PLAN.md` has a lower C4.2 paragraph that still mentions a 620 ms attack cooldown even though the newer locked value is 800 ms.
- older C4.2 registry status tables may lag behind later execution work.

Use `DECISION_LOG.md`, current code/Git history, and this handoff to resolve those conflicts until those source docs are cleaned up.

## After the house fix

Continue C4.2 before broad gameplay expansion:

- finish environment production quality beyond the house proof;
- validate minimum viable animation pipeline;
- expand production art to female player, ranged enemy, charger enemy, NPCs, and remaining biome assets.

After visual readability stabilizes, return to deferred C3 combat-pressure and enemy-distribution tuning.

C5 later adds boss, save/resume, 15–30 minute end-to-end pacing, mobile performance profiling, and final device QC.

## Resume sentence

Verify live GitHub state first; if no newer clean fix exists, continue with a one-Hall true-RGBA runtime proof and do not batch-convert the remaining settlement houses until that Hall passes phone QC.
