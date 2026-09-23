# Xianxia ARPG — Cross-Chat Handoff Protocol

This protocol exists so Chat 2, Chat 3, and future conversations can continue the same project without rediscovery, duplicated work, missing assets, or accidental regressions.

## 1. When a handoff is required

Create/update a handoff when any of these is true:

- the current conversation has become long enough that earlier implementation details are hard to recover;
- the user plans to open a new chat;
- a complex debugging session used multiple branches, PRs, workflows, asset-transfer attempts, or binary/source files;
- a milestone/gate has just passed or failed;
- a risky operation was stopped while partially complete;
- the exact resume point would not be obvious from `main` alone;
- a critical asset was generated/accepted/technically repaired and losing it would force regeneration or re-approval.

Do not wait until context or assets are already lost.

## 2. Stable context vs volatile state

Do not dump the entire project into every handoff.

### Stable information belongs in:

- `AGENTS.md` — assistant operating instructions;
- `docs/PROJECT_CONTEXT.md` — durable product/architecture context;
- `docs/DECISION_LOG.md` — locked/superseded decisions;
- `docs/ASSET_REGISTRY.md` — durable asset identity/location/QC state;
- `docs/PROJECT_SOURCES.md` — rules for shared ChatGPT Project Sources;
- milestone/art source docs.

### Volatile information belongs in:

- `docs/HANDOFF_CURRENT.md` — current objective, exact repo state, active branches/PRs, blockers, asset IDs needed now, next proof.

This separation keeps future handoffs small and useful.

## 3. Required handoff fields

Every `HANDOFF_CURRENT.md` update must answer all of these.

### A0. Ownership / transfer state

Every handoff must explicitly record:

- **Current owner:** `DESIGN_CHAT` or `WORK`;
- **Transfer state:** one of `DESIGN_ACTIVE`, `WAIT_QC`, `READY_FOR_WORK`, `WORK_EXECUTING`, `RETURN_TO_DESIGN`;
- **Repo-write permission:** which conversation is currently allowed to write;
- **Return condition:** what evidence/question transfers ownership back.

Rules:

- only one conversation may own repo writes at a time;
- `WAIT_QC` means no Work continuation until the user provides QC evidence;
- `READY_FOR_WORK` means the design/decision owner has closed the important ASK items and Work may execute the exact next action;
- if Work hits a new high-impact ASK, switch to `RETURN_TO_DESIGN` rather than inventing a product/art decision;
- every ownership transfer starts by reconciling live GitHub state against the handoff.

### A. Snapshot identity

- date/time or date;
- repository;
- functional baseline/build if useful;
- relevant active branch;
- relevant PR number/status, if any.

### B. Current objective

One sentence describing what is being proved/fixed/built now.

Bad:

> Continue art work.

Good:

> Replace only `env_house_hall_a.png` with the registered clean Hall source, deploy it, and confirm on phone that the black-block render disappears before converting the other house assets.

### C. Verified completed work

Only list things supported by merged code, branch state, PR state, build output, technical QC, or explicit phone QC.

Do not call something complete because a tool appeared to run.

### D. Exact unfinished state

Record:

- what exists;
- what does not exist;
- whether files were actually changed;
- whether a PR was opened/merged;
- whether deploy happened;
- whether phone QC happened.

Avoid vague phrases such as “almost done.”

### E. Active blockers

State the observed symptom and the best-supported diagnosis separately.

Example:

- symptom: settlement houses render as black blocks;
- diagnosis: current runtime house binaries are broken/truncated; a clean registered Hall source exists outside the repo and must be installed/verified end-to-end.

### F. Failed / non-working paths

Record methods already tried, especially ones that hung, corrupted data, or created operational ambiguity.

For each, state why it should not be repeated blindly.

### G. Decisions changed during this chat

If a durable product/technical decision changed, also append it to `DECISION_LOG.md`.

Do not make `HANDOFF_CURRENT.md` the only place where a new locked decision exists.

### H. Exact next actions

Give 1–3 smallest actions, in order.

The first action should usually be a verification step if repo state may have changed.

### I. PASS gate

State the observable evidence required to advance.

Examples:

- build passes;
- Pages deploy completes;
- build ID changes;
- exact runtime binary matches expected source/hash/size;
- no `HOUSE TEX MISS`;
- phone screenshot/playtest confirms no black block.

### J. Documents known to be stale

If a source file contains superseded wording, name it so the next chat does not accidentally use it as current truth.

### K. Asset continuity section — mandatory for visual/binary work

For every asset needed by the next chat, record:

- stable Asset ID from `ASSET_REGISTRY.md`;
- filename/path;
- role: runtime / source / reference;
- current status (`DESIGN_PASS`, `ISOLATED_READY`, `TECH_REWORK`, `PHONE_PASS`, etc.);
- where the exact bytes/reference live now: GitHub, Project Sources, Drive, or other registered durable storage;
- expected byte size/hash/dimensions when known;
- which similar/rejected copies must not be used;
- exact next action for that asset.

A handoff that preserves text but loses the required source asset is a failed handoff.

## 4. Asset continuity protocol

### 4.1 Promote critical assets out of Library-only state

ChatGPT Library/Images can retain generated/uploaded files, but it is a cross-project warehouse. Once an asset matters to the ARPG, it must be promoted according to `docs/PROJECT_SOURCES.md` and recorded in `docs/ASSET_REGISTRY.md`.

Promote when an asset becomes:

- `DESIGN_PASS`;
- an approved style/reference anchor;
- a clean source needed to reconstruct runtime art;
- a canonical character/environment identity reference;
- technically important enough that regeneration would risk losing user approval.

### 4.2 Runtime assets

Runtime production truth belongs in GitHub.

Project Sources/Drive can preserve the source/reference, but the project must not call an asset `INTEGRATED` or `PHONE_PASS` until the runtime bytes are actually in GitHub and validated in the deployed game.

### 4.3 Two-leg test

Every critical asset must pass both:

1. **Binary/reference leg:** exact bytes/reference survive outside the chat.
2. **Registry leg:** `ASSET_REGISTRY.md` identifies the exact asset/version/location/QC state.

If either leg is missing, fix asset continuity before opening the next chat.

## 5. Handoff creation procedure

At handoff time:

1. Read current `HANDOFF_CURRENT.md`.
2. Inspect live GitHub state instead of relying on chat memory.
3. Verify `main`, active branch, open PRs, and recent commits relevant to the work.
4. Inventory assets created/accepted/rejected/repaired during this chat.
5. Update `ASSET_REGISTRY.md` with canonical identity/location/QC state.
6. Ensure all critical non-runtime assets needed later are in Project Sources or a verified registered backup/source such as Drive.
7. Update `HANDOFF_CURRENT.md` with verified facts and the exact Asset IDs required next.
8. Append changed durable decisions to `DECISION_LOG.md`.
9. Correct stale source docs when practical.
10. Commit the documentation update to a focused branch/PR or include it in the current work PR when appropriate.
11. Tell the user the handoff is ready and identify the exact resume point.

## 6. New-chat startup procedure

When the user opens Chat 3 or later in the same project, the new assistant should:

1. Read `AGENTS.md`.
2. Read `docs/HANDOFF_CURRENT.md`.
3. Read `docs/ASSET_REGISTRY.md`.
4. Read `docs/PROJECT_SOURCES.md`.
5. Read `docs/DECISION_LOG.md`.
6. Read `docs/PROJECT_CONTEXT.md`.
7. Read milestone-specific docs only as needed.
8. Verify live GitHub state.
9. Reconcile any commits/PRs newer than the handoff snapshot.
10. Resolve the exact Asset IDs and source/runtime bytes required by the immediate next action.
11. Continue from the recorded next action without re-asking locked decisions or regenerating accepted assets.

The new chat should not require the user to paste the entire previous conversation or rediscover accepted images.

## 7. Rules for long debugging/tool sessions

### Checkpoint before retry

If an operation looks stuck, first inspect whether it actually created a branch, commit, blob, file, workflow run, or PR.

Never issue the same write again merely because the UI spinner is still visible.

### Timebox opaque operations

If no meaningful state change appears after roughly 5–10 minutes:

- stop treating the spinner as evidence of progress;
- checkpoint actual repo state;
- record the failed method if relevant;
- switch to a smaller or more observable route.

### Minimal proof first

For asset/binary/rendering bugs:

- prove one asset;
- deploy it;
- phone-QC it;
- only then batch the rest.

For gameplay changes:

- prove one interaction/encounter/stat behavior before multiplying content.

## 8. Template for `HANDOFF_CURRENT.md`

```markdown
# Current Project Handoff

Current owner: DESIGN_CHAT | WORK
Transfer state: DESIGN_ACTIVE | WAIT_QC | READY_FOR_WORK | WORK_EXECUTING | RETURN_TO_DESIGN
Repo-write permission: DESIGN_CHAT | WORK | NONE_WHILE_WAITING_QC
Return condition: <evidence/question that returns ownership>

Snapshot: YYYY-MM-DD
Repo: owner/repo
Functional baseline/build: <sha/build if relevant>
Active branch: <branch or none>
PR: <number/status or none>

## Current objective
<one precise sentence>

## Verified completed state
- ...

## Current unfinished state
- ...

## Blocker / diagnosis
- Symptom: ...
- Best-supported diagnosis: ...

## Assets required to resume
- Asset ID: ...
  - Role: runtime | source | reference
  - Status: ...
  - Exact location: GitHub | Project Sources | Drive
  - File/path: ...
  - Size/hash/dimensions: ...
  - Do not use: ...

## Do not repeat blindly
- <method>: <why>

## Locked decisions relevant to this task
- ...

## Exact next actions
1. ...
2. ...
3. ...

## PASS gate
- ...

## Known stale docs / conflicts
- ...

## Resume sentence
<single sentence telling the next chat exactly where to start>
```

## 9. Handoff quality test

A handoff passes only if a new assistant can continue without asking the user:

- what repo is active;
- what the current functional build/blocker is;
- what was already attempted;
- which design decision is current;
- which exact Asset IDs are needed;
- where their exact bytes/reference files are stored;
- which copy is canonical vs rejected/experimental;
- what exact next action to take;
- how to know that action passed.

If the next chat must reconstruct any of these from hundreds of chat messages or search the Library by thumbnail guesswork, the handoff failed.
