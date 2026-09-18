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

Status: ISOLATED_READY / INTEGRATED candidate / phone QC pending

Completed:
- `FX-SWORD` isolated as a single 163×74 RGBA transparent PNG;
- asset registered under `public/assets/c4/vfx/sword/fx_sword_r1.png`;
- flying sword texture uses centralized manifest and art scale configuration;
- procedural sword remains a safe fallback if the texture is unavailable;
- launch feedback upgraded to a short white-jade halo/core flash;
- trail upgraded to a restrained two-layer white-jade streak;
- impact upgraded to a brief bright core + expanding ring;
- homing, contact damage, no-pierce behavior, attack range, projectile speed and combat timing are unchanged.

Phone QC required before promotion:
- flying sword must read clearly as a sword at full speed;
- no baked rectangle/background or dirty alpha edge;
- launch/trail remain subtle enough not to obscure enemies;
- impact is the brightest moment;
- Realm 1 stays restrained while Realm 2 can read slightly brighter/jade-tinted.

Next action:
- CI + Pages deploy;
- phone QC on the exact Build ID;
- if PASS, proceed to the Phase 1 settlement ground + minimal village props proof.
