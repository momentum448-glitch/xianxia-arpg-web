# Xianxia ARPG — ChatGPT Project Sources Manifest

This document defines what should live in the ChatGPT Project's shared Sources so Chat 2, Chat 3, and later chats can see the same important references without depending on one conversation's attachment history.

## 1. Intended project structure

Conceptually, maintain the project as:

```text
ARPG PROJECT
│
├── Project Instructions
│   └── point new chats to AGENTS.md / handoff startup order
│
├── Sources
│   ├── current handoff / state docs
│   ├── project context / decision docs
│   ├── asset registry
│   ├── workflow / QC docs
│   ├── approved visual references
│   └── important source assets not yet safely canonical in GitHub
│
├── Chat 1
│   └── discovery + foundation + early production history
│
├── Chat 2
│   └── current continuation / production
│
└── Chat 3+
    └── resume from shared Sources + live GitHub verification
```

The UI does not need literal filesystem folders for this model to work. The important property is that the files are added to **Project Sources**, so all chats in the project can reuse them.

## 2. Why Sources exist when GitHub already exists

GitHub is canonical for code and runtime production assets.

Project Sources solve a different problem:

- visual references that a future assistant must *see*, not merely know by filename;
- accepted concept/source images that are not yet runtime-ready;
- style anchors;
- handoff/state docs that should be immediately available in every project chat;
- workflow/reference material that should not require hunting through chat history.

Do not make Project Sources the only home of runtime assets. Runtime truth still belongs in GitHub.

## 3. Minimum persistent Sources pack

Keep these documents available to future chats:

- `AGENTS.md` or an equivalent saved project instruction summary;
- `docs/HANDOFF_CURRENT.md`;
- `docs/PROJECT_CONTEXT.md`;
- `docs/DECISION_LOG.md`;
- `docs/ASSET_REGISTRY.md`;
- `docs/HANDOFF_PROTOCOL.md`;
- `docs/ART_BIBLE.md`;
- `docs/ART_PRODUCTION_QC.md` when active art work continues.

If project file-count limits become tight, prioritize the first six plus current visual anchors.

## 4. Asset promotion policy

Promote an asset into Project Sources when any of these is true:

- the user accepted its visual design;
- it is the canonical style reference for future generations;
- it is needed to preserve character/environment identity;
- it is a clean source file needed to reconstruct a runtime asset;
- losing access to it would force regeneration or re-approval.

Do not promote every draft/reject.

### Required examples for current ARPG phase

The following classes should be in Sources if their exact files are available:

- accepted male player visual/reference;
- accepted melee enemy visual/reference;
- accepted flying-sword source/reference if distinct from the runtime PNG;
- accepted settlement four-house source sheet/reference;
- clean Hall repair source candidate;
- any future female/ranged/charger/NPC design once it reaches `DESIGN_PASS`.

Each promoted source must also have a record in `ASSET_REGISTRY.md`.

## 5. Naming convention in Project Sources

Use a globally clear prefix so Library search does not mix ARPG assets with other projects:

```text
ARPG__DOC__HANDOFF_CURRENT.md
ARPG__DOC__PROJECT_CONTEXT.md
ARPG__DOC__ASSET_REGISTRY.md
ARPG__REF__style_master__v001.png
ARPG__REF__player_male_design_pass__v001.png
ARPG__REF__melee_enemy_design_pass__v001.png
ARPG__REF__settlement_house_set_design_pass__v001.png
ARPG__SRC__env_house_hall_a_clean__v001.png
```

Rules:

- `REF` = visual/reference anchor, not runtime truth;
- `SRC` = clean source binary intended for technical/runtime preparation;
- `DOC` = project continuity document;
- version suffixes are allowed in Project Sources for human disambiguation;
- runtime GitHub filenames continue using the project's lowercase snake_case convention without version numbers.

## 6. Library vs Project Sources

ChatGPT Library stores uploaded/generated files and makes them reusable, but Library is cross-project and can become crowded.

Therefore:

- **Library = warehouse / discovery pool**;
- **Project Sources = curated ARPG working shelf**;
- **GitHub = runtime/code source of truth**;
- **Drive asset vault = byte-preserving backup/transfer path when useful**.

An important asset should not remain only in Library after it becomes a locked project reference.

## 7. Current Drive asset vault

A verified ARPG binary vault already exists in Google Drive and should remain registered as a durable backup/source path:

```text
20_RUNTIME_READY
├── 00_INBOX
├── 10_QC_PASS
└── 90_ARCHIVE_REJECT
```

Verified IDs on 2026-09-19:

- `20_RUNTIME_READY`: `1pwArqr68G-3o9iXdffpDb8bMUyuR9-2f`
- `00_INBOX`: `1XM05mGrxcjcwCTJXEC-rkE-z4GK2v8wY`
- `10_QC_PASS`: `1AzY928GT097WptHw7kHy4uuqTozChY7W`
- `90_ARCHIVE_REJECT`: `1EEO5QVs2F6YkBC7p266X82S4HgzOnsXW`

Current important source in `10_QC_PASS`:

- `env_house_hall_a.png`
- Asset ID: `ENV-HOUSE-HALL-A-CLEAN`
- Drive file ID: `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`
- verified size: `22,633` bytes

Recommended Project Sources setup:

- add/link the `20_RUNTIME_READY` Drive folder as a project source when the UI supports connected Drive sources;
- still promote the most important visual anchors individually into Project Sources when visual comparison is frequent;
- never infer PASS merely from a file being present in the Drive vault. `ASSET_REGISTRY.md` remains the status authority.

## 8. Source manifest entry format

For every critical Project Source, add or update the corresponding `ASSET_REGISTRY.md` entry with:

```text
Asset ID:
Project Source name:
Role: REF | SRC | DOC
Design/QC status:
Canonical runtime path (if any):
Drive backup (if any):
Byte size / SHA-256 (if known):
Supersedes / derived from:
Next action:
```

This prevents two files with similar thumbnails from being confused in later chats.

## 9. Handoff synchronization

Before moving to a new chat:

1. Update `HANDOFF_CURRENT.md` from verified live repo state.
2. Update `DECISION_LOG.md` for new durable decisions.
3. Update `ASSET_REGISTRY.md` for every asset created/accepted/rejected/promoted in the session.
4. Ensure every critical non-runtime source asset is available in Project Sources or a verified Drive backup.
5. Remove/avoid obsolete Project Source copies when they could confuse the next chat; archive only when a rejected/older version is still diagnostically important.
6. In `HANDOFF_CURRENT.md`, name the exact Asset IDs required by the next action.

The handoff is complete only when both **context** and **required binary/reference assets** survive the chat boundary.

## 10. New-chat startup asset check

After reading the normal startup docs, the new chat must check `ASSET_REGISTRY.md` and ask itself:

- Which Asset IDs are needed for the immediate next action?
- Where are their canonical/reference bytes?
- Are they in GitHub, Project Sources, or Drive?
- Is there more than one plausible copy?
- Which one passed design/technical/phone QC?

If the exact required asset cannot be identified, stop before regenerating it. First recover or reconcile the existing accepted asset.
