# Xianxia ARPG — Discovery & Decision Protocol

Purpose: when a problem is still ambiguous, do not jump straight to a complete solution. First reduce uncertainty, identify the few decisions that can materially change the solution, and close them in a structured way.

This protocol applies to product, gameplay, UX, art, technical architecture, pipeline, tooling, debugging strategy, and production planning.

It does **not** authorize re-asking decisions already locked in `docs/DECISION_LOG.md` or facts already established in `docs/HANDOFF_CURRENT.md`, `docs/ASSET_REGISTRY.md`, current code, or verified GitHub state.

## 1. Decide whether discovery is actually needed

Use discovery when one or more of these are true:

- the real problem or desired outcome is unclear;
- multiple plausible solution directions have materially different consequences;
- important constraints, actors, or current-state facts are unknown;
- a foundational decision must be made before implementation is sensible;
- a conclusion depends on research, measurement, runtime evidence, phone QC, or an experiment.

Do **not** start a discovery round when:

- the task is already well-defined;
- the user already made the relevant decision;
- the answer can be verified directly from code/data/tools;
- the next action is an already-recorded handoff step;
- the ambiguity is low-impact and can safely be handled with a stated working assumption.

When enough is known, execute instead of asking for more confirmation.

## 2. First frame the problem

Before proposing a complete solution, identify internally and, when useful, state:

1. **Real problem** — what actually needs to be solved, not merely the first proposed implementation.
2. **Actors / affected objects** — player, developer workflow, runtime asset, combat system, production pipeline, etc.
3. **Desired outcome** — the observable result that would count as success.
4. **Material unknowns / assumptions** — uncertainties that could change the direction of the solution.
5. **Foundational decisions** — choices that must be locked before deeper work is worth doing.

## 3. Organize discovery into six groups

Use only the groups that are relevant. Do not mechanically ask questions from every group.

### A. Problem and outcome definition

Questions that clarify:

- what problem is being solved;
- for whom / for what system;
- what success looks like;
- what is explicitly out of scope.

### B. Current state, pain, and constraints

Clarify:

- what exists now;
- what is failing or unsatisfactory;
- technical/product/art constraints;
- dependencies, deadlines, platform/device constraints;
- already-proven or already-failed approaches.

Prefer inspecting repo, tools, logs, assets, and runtime evidence instead of asking the user for facts that can be checked directly.

### C. Decision questions

For each high-impact decision, present:

- the decision to make;
- 2–4 realistic options when alternatives matter;
- important consequences/trade-offs of each;
- a preliminary recommendation and why;
- what the user actually needs to choose.

Avoid fake choices where one option is obviously unusable.

### D. Assumptions and risks to validate

State working assumptions explicitly.

For each material assumption, identify whether it:

- is safe enough to use temporarily;
- needs later validation;
- blocks implementation until verified.

### E. Research / data / experiment questions

Some questions should not be answered by opinion.

Mark them as requiring evidence, then define a concrete task such as:

- inspect current code/Git history;
- compare branches/PRs;
- measure runtime behavior;
- perform a phone QC test;
- inspect the exact asset binary;
- run a minimal prototype;
- research current external documentation.

Do not ask the user to decide something that should first be measured.

### F. Expansion questions

Only raise secondary improvements, extensions, or future opportunities after the core problem is sufficiently clear.

Do not let interesting future scope derail the current decision.

## 4. Question budget

In a single discovery round, prioritize **at most 5–7 questions or decisions with the highest leverage**.

Do not dump a long questionnaire on the user.

For lower-impact unknowns:

- choose a reasonable temporary assumption;
- label it as a working assumption;
- continue.

If a later answer invalidates the assumption, revise it explicitly.

## 5. Mandatory distinction: ASK / ASSUME / VERIFY

Every unresolved point should conceptually fall into one of these buckets:

### ASK — user decision required

Use when the answer reflects preference, product intent, creative direction, acceptable trade-off, or business priority that the assistant should not invent.

### ASSUME — safe working assumption

Use when the detail is low-impact, reversible, and does not justify blocking progress.

State the assumption clearly.

### VERIFY — evidence required

Use when the answer should come from code, data, repository state, an asset, external documentation, experiment, build, device test, or phone QC.

Perform the verification with available tools whenever possible instead of asking the user.

## 6. End-of-round synthesis

After each meaningful discovery round, summarize five things:

1. **Established facts** — what is now known.
2. **Locked decisions** — what has been decided this round.
3. **Working assumptions** — temporary assumptions still in use.
4. **Open issues** — unresolved items that still matter.
5. **Next action** — the smallest sensible next step.

If a decision is durable, append it to `docs/DECISION_LOG.md`.

If it changes the current execution state, update `docs/HANDOFF_CURRENT.md` when appropriate.

If it changes asset identity/status, update `docs/ASSET_REGISTRY.md`.

## 7. Recommended interaction shape

For an unclear problem, prefer a compact interaction like:

```text
What we are solving
- ...

What I can verify myself
- ...

Decisions I need from you (max 5–7)
1. Decision ...
   A. ... → consequence
   B. ... → consequence
   Recommendation: ...

Working assumptions
- ...

After your answers
- I will ...
```

Do not use this template mechanically when a simpler conversation would be clearer.

## 8. Relationship to existing project rules

Priority rules:

- locked decisions are not reopened unless the user explicitly wants to reconsider them;
- live GitHub/runtime evidence beats memory;
- phone QC is authoritative for mobile UX/readability/scale/VFX/art runtime;
- for asset questions, recover the registered accepted asset before regenerating it;
- minimal proof before broad rollout;
- when the problem becomes clear, stop discovery and execute.

The goal is not to ask more questions. The goal is to spend questions only where they materially improve the decision.