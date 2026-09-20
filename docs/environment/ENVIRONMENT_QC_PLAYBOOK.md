# Environment QC Playbook

## 1. Purpose

Environment QC should answer one question at a time with observable evidence. It should not become a vague “does this look good?” loop.

This project already uses a proof-first art pipeline. Environment work extends it with spatial and map-level gates.

## 2. QC ladder

Use this ladder:

`design intent → topology proof → scale proof → composition proof → asset technical QC → runtime proof → sequential Phone QC → expansion`

Do not skip directly from a generated asset to broad map deployment.

## 3. Gate A — Design intent

Before implementation, record:

- zone purpose;
- required player actions;
- intended mood;
- critical path relation;
- landmark/focal idea;
- negative-space needs;
- what is explicitly out of scope.

PASS when the team can describe the zone in one or two sentences and knows what successful play/readability looks like.

## 4. Gate B — Topology / blockout

VERIFY:

- entry/exit relationships;
- critical path;
- branches;
- interaction nodes;
- safe/combat areas;
- building masses;
- route widths;
- major open spaces.

PASS when movement works before final art.

Failure examples:

- route only becomes readable after decorative lanterns are added;
- NPC has no comfortable approach space;
- a building footprint forces awkward pathing;
- side branch is invisible from normal approach.

## 5. Gate C — Scale

Place representative structural assets near:

- player;
- accepted house;
- NPC placeholder/production target;
- route edge.

Test 2–3 candidate display sizes if uncertain.

PASS when the role reads correctly on phone and no asset feels miniature, oversized or soft from excessive upscaling.

Record accepted display metrics when they become reusable references.

## 6. Gate D — Composition

Capture representative viewport(s).

Check:

- focal hierarchy;
- route clarity;
- cluster cohesion;
- negative space;
- UI occlusion;
- player readability;
- landmark framing;
- accidental repetition.

PASS when the environment reads without relying on labels and the intended focal object wins attention.

## 7. Gate E — Asset technical QC

For every new production sprite, verify:

- complete file decode;
- dimensions;
- color mode;
- transparency/alpha;
- no black/white matte;
- no truncated PNG stream;
- no large dirty margins;
- sufficient source resolution;
- correct canonical filename/path;
- registered source/backup if project-critical.

If visual design is accepted but bytes are unusable, classify as `TECH_REWORK`, not redesign.

## 8. Gate F — Runtime proof

Integrate only the smallest representative proof.

Verify:

- preload/path correct;
- correct texture actually used;
- build ID changes;
- no missing-texture fallback;
- origin/depth correct;
- scale correct;
- no gameplay collision/timing changes from art-only work;
- deployment succeeds.

PASS only after the real runtime is using the intended bytes.

Workflow logs alone do not prove the deployed game uses the asset.

## 9. Gate G — Sequential Phone QC

One screenshot is not enough for map-level acceptance.

Capture a sequence while moving through the zone.

Review:

- composition from multiple approach directions;
- repeated silhouettes;
- screen-to-screen rhythm;
- route continuity;
- player visibility;
- UI overlap;
- interaction readability;
- scale consistency;
- density transitions;
- whether props form believable activities.

PASS when the zone remains coherent across traversal, not just at one “hero angle.”

## 10. Gate H — Expansion

Only after a representative proof passes should the solution be expanded to the rest of the zone/map.

Before expansion, state:

- what exactly passed;
- which parameters are locked;
- which may vary;
- what repetition risks remain;
- what next screenshot set will validate the expanded result.

## 11. Failure classification

Use specific failure labels:

### DESIGN_REVISE

Identity, silhouette, function, mood or art direction is wrong.

### TECH_REWORK

Design is accepted but alpha, crop, encoding, resolution, file integrity or runtime transport is wrong.

### SCALE_REVISE

Asset design is fine but scene/world scale is wrong.

### COMPOSITION_REVISE

Assets are acceptable individually but grouping, spacing, hierarchy or placement is wrong.

### FLOW_REVISE

Movement, approach, route or interaction space is wrong.

### DENSITY_REVISE

Scene is too sparse, busy or repetitive at viewport level.

### RUNTIME_BUG

Code/preload/depth/cache/build behavior is wrong.

This prevents unnecessary regeneration.

## 12. Phone QC screenshot protocol

When asking the user for QC, request only evidence needed for the current gate.

Examples:

- scale proof: one screenshot showing player + asset + house reference;
- zone proof: 2–4 screenshots along a short traversal;
- path proof: entry, midpoint, branch/exit;
- repetition proof: adjacent screens containing reused modules.

Do not ask for a full-map tour when one small proof is still blocked.

## 13. Environment completion gate

A map/zone is not “done” merely because all asset slots are filled.

Minimum completion criteria:

- topology and player flow accepted;
- critical path readable;
- functional zones recognizable;
- scale grammar consistent;
- no blocking technical asset defects;
- modular repetition controlled;
- player/combat readability preserved;
- major UI occlusion issues resolved;
- runtime deployed successfully;
- representative Phone QC sequence passes;
- asset registry/handoff updated.

## 14. Regression discipline

After a PASS:

- do not polish without a concrete problem;
- do not reopen accepted asset design because another parameter is wrong;
- do not change gameplay hitboxes/timing during environment-art work unless explicitly requested;
- keep a known accepted build/commit as comparison evidence.

## 15. Project-specific precedent

Useful examples already established:

- Hall black-render bug: one clean-source proof before broad replacement.
- Thatch B: source recovery rather than regeneration.
- Tree black box: alpha technical rework.
- Merchant V2: halo cleanup then composition revision.
- Merchant world scale: accepted assets scaled up instead of regenerated.
- Lower merchant-area house: removed for composition clarity, not because the house asset was bad.

These examples should guide future diagnosis.