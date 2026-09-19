# ARPG Project Instructions for AI / Future Chats

This file is the entry point for any new ChatGPT conversation, coding agent, or assistant working on this repository.

## 1. Mandatory startup order

Before proposing or changing anything, read these files in order:

1. `AGENTS.md` — operating instructions.
2. `docs/HANDOFF_CURRENT.md` — latest verified working state and exact resume point.
3. `docs/ASSET_REGISTRY.md` — canonical identity/location/QC state of important assets.
4. `docs/PROJECT_SOURCES.md` — which non-runtime references must survive across ChatGPT chats.
5. `docs/DECISION_LOG.md` — durable decisions and what they supersede.
6. `docs/PROJECT_CONTEXT.md` — stable product/architecture context.
7. The milestone-specific source documents relevant to the task, especially:
   - `docs/PLAN.md`
   - `docs/C4_2_PRODUCTION_PLAN.md`
   - `docs/C4_2_EXECUTION_LOG.md`
   - `docs/ART_PRODUCTION_QC.md`
   - `docs/ART_BIBLE.md`

Then verify live GitHub state before acting:

- current `main` commit;
- open PRs;
- active branch relevant to the handoff;
- whether the previous operation already partially succeeded.

For asset work, also verify the exact Asset ID and byte/reference location before generating or replacing anything.

Never assume the chat snapshot is newer than GitHub.

## 2. Source-of-truth hierarchy

When information conflicts, use this order:

1. Actual code/runtime assets on the verified current branch and merged Git history.
2. `docs/HANDOFF_CURRENT.md` for the latest cross-chat working state.
3. `docs/ASSET_REGISTRY.md` for asset identity, canonical location, backup/source location, and QC state.
4. `docs/DECISION_LOG.md` for durable product/technical decisions.
5. Milestone execution logs/plans for task-specific details.
6. `docs/PROJECT_CONTEXT.md` and `docs/PLAN.md` for broader project context.
7. ChatGPT Project Sources for visual/source references identified by the Asset Registry.
8. Older chat messages, raw Library search results, old README wording, or stale status tables.

Do not let an older document or similarly named image silently override a newer merged/registered decision.

## 3. Working rules

- This is an original xianxia/cultivation ARPG. Do not copy protected assets, writing, map, UI, characters, or other IP from reference games.
- GitHub is the durable project source of truth for code and runtime production assets. Production-critical decisions must not live only in chat.
- ChatGPT Library/Images is a discovery pool, not sufficient canonical storage for a locked asset.
- When an asset becomes project-critical (`DESIGN_PASS`, approved style anchor, clean source needed for runtime, etc.), promote it to a durable shared location according to `docs/PROJECT_SOURCES.md` and register it in `docs/ASSET_REGISTRY.md`.
- Do not regenerate a `DESIGN_PASS` asset because the current chat cannot immediately see it. Recover the registered asset first.
- Do not re-ask decisions already locked in `DECISION_LOG.md` unless the user explicitly wants to reconsider them.
- Prefer small, reversible changes with one clear validation question.
- Phone QC is authoritative for controls, readability, scale, VFX, travel pacing, and combat density.
- Keep gameplay hitboxes/timing independent from visual-art integration unless a gameplay change is explicitly requested.
- Before every write, inspect the relevant repo/branch/file state.
- Never repeat a failed or stuck operation blindly. Check whether it partially succeeded first.
- If a tool operation appears stuck for roughly 5–10 minutes with no state change, checkpoint actual repo state and switch method instead of waiting indefinitely.
- Do not broaden scope while a blocking proof is unresolved. Prove one minimal asset/path/interaction first, then scale the solution.

## 4. Communication / decision style

For unclear problems, focus on at most 5–7 high-impact decisions per round. State low-impact assumptions explicitly instead of asking endless questions.

Separate:

- what the user must decide;
- what can be temporarily assumed;
- what can be measured or tested directly.

When the user has already provided enough information, execute rather than re-confirming.

## 5. Branch / PR discipline

- Start risky or non-trivial work from a branch based on verified current `main` unless an existing branch is clearly the correct continuation point.
- Keep each proof/fix focused.
- Use PR descriptions to record the validation target and what is intentionally unchanged.
- Do not merge temporary debug/staging baggage unless it is intentionally part of the final solution.

## 6. Asset continuity discipline

Every important asset must have two legs:

1. the binary/reference is stored somewhere the next chat can actually recover it (GitHub runtime path, ChatGPT Project Sources, or a verified Drive asset-vault file); and
2. `docs/ASSET_REGISTRY.md` identifies the exact asset, location, status, technical identity, QC result, and next action.

For runtime assets, GitHub is canonical.

For accepted but pre-runtime references, Project Sources and/or verified Drive backup preserve visual/binary continuity.

Never treat a thumbnail, vague Library result, or assistant-generated board name as enough to distinguish canonical vs rejected versions.

## 7. Handoff discipline

When a conversation becomes long, before moving to a new chat, or after a complex milestone/debug session:

1. Follow `docs/HANDOFF_PROTOCOL.md`.
2. Update `docs/HANDOFF_CURRENT.md` with verified repository facts.
3. Append any new durable decision to `docs/DECISION_LOG.md`.
4. Update `docs/ASSET_REGISTRY.md` for every asset created, accepted, rejected, technically reworked, or promoted during the session.
5. Ensure every critical non-runtime asset needed by the next chat is available in Project Sources or another registered durable backup/source.
6. Update affected source docs if they now contain stale/conflicting statements.
7. Make the exact next action and required Asset IDs explicit so the next chat can resume without rediscovery.

A handoff is not complete if it only says what was discussed. It must say what actually exists in GitHub, what exact assets survive the chat boundary, and what has or has not passed validation.

## 8. Definition of a good resume

A new chat should be able to answer these within a few minutes of reading the repo:

- What are we building?
- Which decisions are locked?
- What is already complete?
- What is the exact current blocker/objective?
- Which branch/PR/commit contains the latest work?
- Which Asset IDs are required now?
- Where are the exact canonical/reference bytes for those assets?
- Which versions passed design, technical, runtime, and phone QC?
- What approaches already failed and should not be repeated?
- What is the next smallest proof?
- What evidence is required to call it PASS?

If any of these are unclear, improve the project docs/asset registry before accumulating more chat-only context.
