# C4.2 Execution Log

This log records completed execution checkpoints. The execution source of truth remains `docs/C4_2_PRODUCTION_PLAN.md`.

## 2026-09-18 — Phase 0 inventory/gap audit

Status: PASS

Checks performed:
- repository root inspected;
- no `public/` directory exists yet;
- repository code search found no `.png` references;
- repository code search found no `assetManifest` implementation;
- therefore no previously generated image has yet become a verified runtime art asset in the repository.

Interpretation:
- previous concept boards and compilation sheets remain `REFERENCE_ONLY`;
- male player remains `DESIGN_PASS`, not `ISOLATED_READY`;
- melee enemy remains `DESIGN_PASS`, not `ISOLATED_READY`;
- remaining actor/VFX/environment concepts remain `REFERENCE_ONLY` unless separately promoted by QC;
- there is no binary production asset to reuse, so no hidden duplicate asset work exists inside the repo.

Next single deliverable:
- Asset ID `PLY-M-BASE`;
- create an isolated transparent runtime-usable male player asset from the already accepted design;
- save the real production binary under the planned `public/assets/c4/actors/player/male/` path;
- only after that file is technically verified may `PLY-M-BASE` advance from `DESIGN_PASS` to `ISOLATED_READY`.

Anti-duplication reminder:
- do not create another presentation board for `PLY-M-BASE`;
- do not redesign the male player unless a future QC decision explicitly marks it `REVISE`;
- generate only the missing production deliverable.

## 2026-09-18 — Male player runtime integration

Status: INTEGRATED / phone QC pending

Completed:
- accepted male player art exported as a transparent runtime PNG;
- runtime asset path registered through the C4 manifest;
- scale/pivot configuration centralized under `src/game/art/`;
- GameScene uses the production texture while preserving the invisible gameplay hitbox;
- minimum runtime animation implemented for idle, run, ATK response, dodge and skill.

Phone QC remains required before `PHONE_PASS`.

## 2026-09-18 — Melee enemy runtime candidate

Status: PHONE_PASS

Completed:
- old isolated candidate bytes were confirmed unavailable and were not silently treated as recovered;
- a fresh isolated transparent melee candidate was technically exported from the current melee reference without HUD/map/text;
- runtime file prepared at `public/assets/c4/actors/enemies/melee/en_melee_idle_s.png`;
- source normalized to 136×160 indexed PNG for mobile-safe texture size while preserving transparency;
- melee scale/pivot and runtime animation tuning added centrally;
- truncated PNG upload was diagnosed and replaced with the complete binary;
- visible Build ID and per-build C4 asset cache-busting were added for reliable phone QC;
- user confirmed the production melee texture renders cleanly on phone after the temporary readability ellipse was removed.

Result:
- `EN-MELEE-BASE` advances to `PHONE_PASS`;
- ground shadow remains;
- non-trial readability ring is removed;
- AI, hitbox, damage and combat timing remain unchanged.

## 2026-09-18 — Flying sword + restrained VFX candidate

Status: PHONE_PASS

Completed:
- `FX-SWORD` isolated as a single transparent PNG and integrated through the central manifest;
- a binary corruption / black-block render issue was diagnosed and repaired;
- launch, trail and impact were re-enabled one layer at a time and phone-QC'd independently;
- user confirmed launch cue, trail readability and impact feedback all pass on phone;
- homing, contact damage, no-pierce behavior, attack range, projectile speed and combat timing remain unchanged.

Result:
- `FX-SWORD`, launch, Realm 1 trail and impact complete the Phase 1 phone gate;
- current VFX remain intentionally restrained, with impact the brightest moment.

## 2026-09-18 — Settlement runtime layout proof

Status: LAYOUT_PASS

Completed:
- old geometric house placeholders were replaced by a dedicated settlement environment module;
- warm-paper ground variation, central travel path, sparse fences/trees/stones and six house placements were tested live;
- no new collision was added, so the art proof does not alter movement/gameplay;
- user confirmed the settlement layout and density are acceptable.

Decision:
- keep this approved placement/layout;
- do not revisit village composition while replacing house visuals with production textures.

## 2026-09-19 — Settlement production house assets

Status: INTEGRATED candidate / phone QC pending

Completed:
- four approved production house assets were isolated and normalized as transparent PNGs;
- runtime files live under `public/assets/c4/environment/settlement/`:
  - `env_house_thatch_a.png`;
  - `env_house_tile_a.png`;
  - `env_house_hall_a.png`;
  - `env_house_thatch_b.png`;
- finalized files were verified for PNG signature, expected dimensions and transparency before integration;
- all four paths were registered in the central C4 manifest with per-build cache busting;
- GameScene preloads the four house textures;
- `environmentVisuals.ts` now renders the approved settlement house placements from real textures instead of procedural house geometry;
- missing textures fail visibly with `HOUSE TEX MISS` rather than silently falling back to code houses;
- surrounding runtime proof props remain temporary and intentionally subdued until the house phone QC passes.

Phone QC gate:
- all six house placements show production art, not `HOUSE TEX MISS`;
- no black/white rectangle or dirty alpha edge;
- house scale is believable relative to player/NPC;
- central route remains readable and uncluttered;
- duplicated house variants are acceptable at normal phone zoom.
