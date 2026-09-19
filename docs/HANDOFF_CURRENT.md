# Current Project Handoff

Snapshot: 2026-09-19
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Verified `main`: `0bcbbeb101ae06e311def5d8100507e724dc9700`
Visible build shorthand: `BUILD 0bcbbeb`
Current milestone: C4.2 production-art correction

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

PR #39 (`C4.2 Phase 1: integrate settlement production houses`) was merged to `main`.

Runtime house files are under:

```text
public/assets/c4/environment/settlement/
  env_house_thatch_a.png
  env_house_tile_a.png
  env_house_hall_a.png
  env_house_thatch_b.png
```

The runtime now preloads/render these textures and uses fail-loud `HOUSE TEX MISS` diagnostics instead of silently falling back to procedural houses.

## Current unfinished state

The house integration is **not phone-passed**.

Observed live symptom:

- production houses render as black blocks on phone/live build.

Best-supported technical diagnosis:

- integrated house PNGs are palette/indexed PNGs (`color type 3`);
- the known-good direction is true RGBA PNG (`color type 6`, Pillow mode `RGBA`, real alpha channel);
- this matches the class of failure previously solved for the flying-sword texture.

No gameplay/layout redesign is required to test this diagnosis.

## Current branch truth

### `main`

- `0bcbbeb101ae06e311def5d8100507e724dc9700`
- contains PR #39 house integration;
- still contains the black-rendering production-house assets.

### `fix/settlement-house-rgba`

At last verification:

- based on current `main`;
- ahead of `main` with staging/workflow commits;
- no PR exists for it;
- no merge/deploy has occurred;
- runtime house PNGs have not actually been replaced by a finished fix.

Known branch contents include staging/proof material such as:

```text
.asset_stage_rgba/env_house_hall_a.part0
.asset_stage_rgba/env_house_hall_a.part1
.asset_stage_rgba/env_house_thatch_a.part0
.github/workflows/convert-settlement-house-rgba.yml
```

The Hall verification workflow expects, among other properties:

- PNG signature;
- bit depth 8;
- color type 6;
- Pillow mode `RGBA`;
- Hall dimensions 128 × 89;
- alpha extrema 0–255.

Interpretation: this branch contains technical staging/proof machinery, not a completed runtime repair.

### `fix/settlement-hall-direct-proof`

At last verification:

- identical to `main`;
- no useful delta;
- no completed proof.

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

Do not wait indefinitely or retry the same opaque operation without checking whether it partially succeeded.

### PC / Work / Drive bridge approaches

These introduced synchronization ambiguity and duplicate-write risk. They are not the preferred first repair path.

## Locked decisions relevant to this task

- Preserve approved settlement composition/layout.
- Do not alter collision or gameplay for this technical texture proof.
- Use a minimal one-Hall proof before converting all house assets.
- Production art must be technically normalized and validated in runtime, not merely generated.
- Phone result is the acceptance authority.

## Exact next actions

1. Re-verify live GitHub state before writing: `main`, active house-fix branches, and any PR created after this snapshot.
2. Continue from a clean branch based on current `main` unless a newer branch already contains a clean runtime Hall replacement.
3. Replace only `public/assets/c4/environment/settlement/env_house_hall_a.png` with a verified true-RGBA runtime PNG; keep code/layout/gameplay unchanged for the proof.
4. Build/deploy and confirm a new visible Build ID.
5. Phone-QC Hall rendering.
6. Only after Hall PASS, convert/install the other three house PNGs and re-check all six placements.

## PASS gate for the Hall proof

Do not expand the fix until all are true:

- Hall file is a valid 8-bit true-RGBA PNG with transparency;
- project build passes;
- deployment completes;
- visible Build ID proves the new bundle is loaded;
- Hall does not show `HOUSE TEX MISS`;
- Hall does not render as a black/white rectangle;
- no dirty alpha edge is visible;
- house scale still reads correctly against player/NPC;
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

Use `DECISION_LOG.md`, current code/Git history, and this handoff to resolve those conflicts until the stale files are corrected.

## After the house fix

Continue C4.2 before broad gameplay expansion:

- finish environment production quality beyond the house proof;
- validate minimum viable animation pipeline;
- then expand production art to female player, ranged enemy, charger enemy, NPCs, and remaining biome assets.

After visual readability stabilizes, return to deferred C3 combat-pressure and enemy-distribution tuning.

C5 later adds boss, save/resume, 15–30 minute end-to-end pacing, mobile performance profiling, and final device QC.

## Resume sentence

Verify whether GitHub has advanced beyond `0bcbbeb`; if not, start with a clean one-Hall true-RGBA runtime proof and do not batch-convert the remaining settlement houses until that Hall passes phone QC.
