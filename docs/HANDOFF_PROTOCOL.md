# Xianxia ARPG — Cross-Chat Handoff Protocol

This protocol exists so Chat 2, Chat 3, and future conversations can continue the same project without rediscovery, duplicated work, or accidental regressions.

## 1. When a handoff is required

Create/update a handoff when any of these is true:

- the current conversation has become long enough that earlier implementation details are hard to recover;
- the user plans to open a new chat;
- a complex debugging session used multiple branches, PRs, workflows, or asset-transfer attempts;
- a milestone/gate has just passed or failed;
- a risky operation was stopped while partially complete;
- the exact resume point would not be obvious from `main` alone.

Do not wait until context is already lost.

## 2. Stable context vs volatile state

Do not dump the entire project into every handoff.

### Stable information belongs in:

- `AGENTS.md` — assistant operating instructions;
- `docs/PROJECT_CONTEXT.md` — durable product/architecture context;
- `docs/DECISION_LOG.md` — locked/superseded decisions;
- milestone/art source docs.

### Volatile information belongs in:

- `docs/HANDOFF_CURRENT.md` — current objective, exact repo state, active branches/PRs, blockers, next proof.

This separation keeps future handoffs small and useful.

## 3. Required handoff fields

Every `HANDOFF_CURRENT.md` update must answer all of these.

### A. Snapshot identity

- date/time or date;
- repository;
- verified `main` commit/build;
- relevant active branch;
- relevant PR number/status, if any.

### B. Current objective

One sentence describing what is being proved/fixed/built now.

Bad:

> Continue art work.

Good:

> Replace only `env_house_hall_a.png` with a verified true-RGBA runtime PNG and confirm on phone that the black-block render disappears before converting the other house assets.

### C. Verified completed work

Only list things supported by merged code, branch state, PR state, build output, or explicit phone QC.

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
- diagnosis: integrated PNGs are indexed/palette files while the known-good runtime direction is true RGBA.

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
- no `HOUSE TEX MISS`;
- phone screenshot/playtest confirms no black block.

### J. Documents known to be stale

If a source file contains superseded wording, name it so the next chat does not accidentally use it as current truth.

## 4. Handoff creation procedure

At handoff time:

1. Read current `HANDOFF_CURRENT.md`.
2. Inspect live GitHub state instead of relying on chat memory.
3. Verify `main`, active branch, open PRs, and recent commits relevant to the work.
4. Update `HANDOFF_CURRENT.md` with facts.
5. Append changed durable decisions to `DECISION_LOG.md`.
6. Correct stale source docs when practical.
7. Commit the documentation update to a focused branch/PR or include it in the current work PR when appropriate.
8. Tell the user the handoff is ready and identify the exact resume point.

## 5. New-chat startup procedure

When the user opens Chat 3 or later in the same project, the new assistant should:

1. Read `AGENTS.md`.
2. Read `docs/HANDOFF_CURRENT.md`.
3. Read `docs/DECISION_LOG.md`.
4. Read `docs/PROJECT_CONTEXT.md`.
5. Read milestone-specific docs only as needed.
6. Verify live GitHub state.
7. Reconcile any commits/PRs newer than the handoff snapshot.
8. Continue from the recorded next action without re-asking locked decisions.

The new chat should not require the user to paste the entire previous conversation.

## 6. Rules for long debugging/tool sessions

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

## 7. Template for `HANDOFF_CURRENT.md`

```markdown
# Current Project Handoff

Snapshot: YYYY-MM-DD
Repo: owner/repo
Verified main: <sha> / BUILD <id>
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

## 8. Handoff quality test

A handoff passes only if a new assistant can continue without asking the user:

- what repo is active;
- what the current build is;
- what was already attempted;
- which design decision is current;
- what exact next action to take;
- how to know that action passed.

If the next chat must reconstruct these from hundreds of chat messages, the handoff failed.
