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

## 2026-09-18 — PLY-M-BASE runtime integration

Asset state: `INTEGRATED`
Animation checkpoint: implemented, phone QC pending

Completed:
- accepted male player art isolated and stored as the production PNG under `public/assets/c4/actors/player/male/`;
- runtime asset manifest and scale/pivot config added;
- production sprite replaces the previous procedural male visual while the invisible gameplay hitbox stays separate;
- phone QC accepted the current display size;
- the visible white rectangle was traced to the old hitbox stroke and removed without changing collision;
- manual `ATK` control replaced auto basic attack, with buildable range and attack-speed stat hooks recorded in the main plan;
- current base attack range is 205 and untargeted presses still launch a straight flying sword;
- minimum runtime animation proof now covers idle breathing, run bob/lean, manual ATK launch response, dodge stretch/motion cue, and skill anticipation/recovery;
- animation parameters are centralized in `src/game/art/animationConfig.ts`;
- true four-direction production poses are still required before final C4.2 acceptance; this proof uses the accepted base sprite with directional mirror/lean where possible.

QC status:
- build/typecheck must remain green;
- next user-facing checkpoint is live phone animation QC;
- do not promote `PLY-M-BASE` to `PHONE_PASS` until that live QC is accepted.

Next action after animation phone PASS:
- continue with `EN-MELEE-BASE` isolation/integration; do not regenerate the accepted melee design unless QC explicitly marks it `REVISE`.
