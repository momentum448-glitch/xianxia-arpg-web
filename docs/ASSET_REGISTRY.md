# Xianxia ARPG — Asset Registry

This is the durable registry for project-critical visual/binary assets. Chat history, image-generation history, and ChatGPT Library are discovery locations, not canonical production storage by themselves.

## 1. Two-leg rule

Every important asset must have two independent legs before it can be considered handoff-safe:

1. **Binary leg** — the actual file exists in a durable location that a future chat can access: preferably the GitHub repo for runtime assets; otherwise ChatGPT Project Sources or the verified Google Drive asset vault while the file is still pre-runtime/reference material.
2. **Registry leg** — this file records the stable Asset ID, purpose, status, canonical filename/path, source/backup location, technical identity, QC state, and next action.

An asset mentioned only in chat, or visible only in Images/Library without a registry entry, is **NOT handoff-safe**.

## 2. Storage hierarchy

Use this order.

### A. Runtime/production assets

Canonical storage: GitHub repository under `public/assets/...`.

A production asset is not complete until the exact bytes used by the runtime are in GitHub and validated in-game.

### B. Accepted source/reference assets not yet production-ready

Preferred durable storage:

- ChatGPT Project Sources, when the exact image/file is useful for future visual reference; and/or
- Google Drive project asset vault for byte-preserving backup/transfer.

These files remain non-production until normalized and integrated into the repo.

### C. ChatGPT Library / Images

Treat Library/Images as a **discovery pool**, not the only source of truth. When an asset becomes important, promote it into Project Sources and/or Drive and add it here.

## 3. Required registry fields

For each important asset record:

- Asset ID
- human description / purpose
- current status
- canonical runtime filename/path, if any
- Project Source filename, if promoted there
- Drive file/folder ID or URL, if used as backup/source
- expected byte size when known
- SHA-256 when known
- dimensions / format / alpha requirements when relevant
- design QC state
- technical QC state
- runtime/phone QC state
- supersedes / derived-from relationship
- exact next action

If a value is unknown, write `UNKNOWN`; do not invent it.

## 4. Status vocabulary

Use the C4 production vocabulary:

- `NOT_STARTED`
- `REFERENCE_ONLY`
- `DESIGN_PASS`
- `ISOLATED_READY`
- `ANIM_READY`
- `INTEGRATED`
- `PHONE_PASS`
- `REVISE`
- `TECH_REWORK`

A Library image can be `DESIGN_PASS` but cannot be `INTEGRATED` merely because it looks correct.

## 5. Current critical assets

### PLY-M-BASE — Male sword cultivator

- Purpose: production male player visual.
- Status: `INTEGRATED`; runtime animation proof exists.
- Runtime storage: `public/assets/c4/actors/player/male/`.
- Canonical exact file(s): verify current repo before editing registry details.
- Design state: accepted.
- Runtime state: rendering successfully.
- Phone state: production player visual has been used in phone QC; final animation quality has not been separately declared final.
- Next action: preserve during current settlement-house repair.

### EN-MELEE-BASE — Corrupted beast melee enemy

- Purpose: production melee enemy.
- Status: `PHONE_PASS`.
- Runtime path: `public/assets/c4/actors/enemies/melee/en_melee_idle_s.png`.
- Runtime/phone state: passed after preload/path/binary fixes and removal of the non-trial readability ellipse.
- Next action: preserve; do not regenerate without explicit `REVISE` decision.

### FX-SWORD — Flying sword

- Purpose: manual basic-attack projectile visual.
- Status: `PHONE_PASS`.
- Runtime path: `public/assets/c4/vfx/sword/fx_sword_r1.png`.
- Phone QC: raw sword, launch, trail, impact all passed in staged validation.
- Next action: preserve.

### ENV-SETTLEMENT-LAYOUT — Thanh Vân Thôn composition

- Purpose: settlement placement/density/layout.
- Status: `PHONE_PASS` for layout/composition proof.
- Implementation: `src/game/environmentVisuals.ts` plus world config/runtime placement.
- Important: layout PASS is independent of house binary failure.
- Next action: do not redesign during house texture repair.

### ENV-HOUSE-SET-A — Accepted four-house visual set

- Purpose: replace procedural house shapes with real production-painted village houses.
- Design status: `DESIGN_PASS`.
- Runtime set:
  - `env_house_thatch_a.png`
  - `env_house_tile_a.png`
  - `env_house_hall_a.png`
  - `env_house_thatch_b.png`
- Runtime directory: `public/assets/c4/environment/settlement/`.
- Current technical state of integrated runtime files: `TECH_REWORK` / REJECT. Existing GitHub binaries render as black rectangles and were later shown to be broken/truncated, not merely a missing-path error.
- Do not regenerate the accepted visual design unless explicitly marked `REVISE`.
- Next action: prove one clean Hall binary end-to-end first.

### ENV-HOUSE-HALL-A-CLEAN — clean Hall source candidate

- Purpose: technical repair proof for `env_house_hall_a.png`.
- Design relation: same accepted Hall design from `ENV-HOUSE-SET-A`; this is technical rework, not redesign.
- Current status: `ISOLATED_READY` as a clean source/backup candidate; not yet the runtime file in GitHub.
- Filename: `env_house_hall_a.png`.
- Durable backup/source: Google Drive `10_QC_PASS`.
- Drive file ID: `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`.
- Verified Drive metadata on 2026-09-19:
  - MIME: `image/png`
  - size: `22,633` bytes
  - parent folder ID: `1AzY928GT097WptHw7kHy4uuqTozChY7W`
- Prior handoff states the clean candidate is RGBA and Drive round-trip byte count passed; re-verify decode/hash before installing into GitHub.
- Runtime target: `public/assets/c4/environment/settlement/env_house_hall_a.png`.
- Required technical gate: full PNG decode, 8-bit true RGBA where intended, valid transparency/alpha, expected dimensions, sane byte size/hash, no truncation.
- Runtime gate: deploy one-Hall proof, verify new Build ID, Android phone confirms no black rectangle/matte/corruption.
- Next action: replace only Hall on a clean proof branch, then phone-QC before touching the remaining houses.

## 6. Project Sources promotion rule

Whenever an image/file reaches any of these states, it should be promoted from Library/Images into ChatGPT Project Sources if it is useful for visual continuity in future chats:

- `DESIGN_PASS`
- `ISOLATED_READY`
- approved style/reference anchor
- accepted concept that must not be regenerated
- a source file needed to reconstruct a runtime asset

Do not fill Project Sources with every rejected generation. Keep only current anchors and deliberately archived alternatives that matter to a future decision.

Recommended Project Sources naming:

```text
ARPG__REF__style_master__v001.png
ARPG__REF__player_male_design_pass__v001.png
ARPG__REF__melee_enemy_design_pass__v001.png
ARPG__REF__settlement_house_set_design_pass__v001.png
ARPG__SRC__env_house_hall_a_clean__v001.png
ARPG__DOC__HANDOFF_CURRENT.md
ARPG__DOC__PROJECT_CONTEXT.md
ARPG__DOC__ASSET_REGISTRY.md
```

Runtime filenames in GitHub remain lowercase snake_case without version numbers; the `ARPG__...` convention is only for Project Sources/reference storage where human disambiguation matters.

## 7. Handoff asset gate

A cross-chat handoff is not complete until the author answers:

- Which assets changed or became important in this chat?
- Are their exact binaries accessible outside this chat?
- Are all `DESIGN_PASS`/critical reference assets promoted to Project Sources or durable Drive storage?
- Are all runtime assets that matter actually in GitHub?
- Does this registry identify canonical vs rejected/experimental copies?
- Are byte size/hash/dimensions recorded where binary integrity has been a failure mode?
- Does `HANDOFF_CURRENT.md` name the exact asset(s) needed for the first next action?

If any answer is no, the handoff is incomplete.
