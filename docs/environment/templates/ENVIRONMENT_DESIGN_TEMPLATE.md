# Environment Design Template

> Copy this file for a new map/major area. Resolve only the decisions that materially affect the design. Use `ASK / ASSUME / VERIFY` from `DISCOVERY_DECISION_PROTOCOL.md`.

## 1. Identity

- Map / area name:
- Milestone:
- Owner document:
- Current runtime baseline:
- Related Asset IDs:

## 2. One-sentence purpose

What is this place for in the game?

`[Write one sentence.]`

## 3. Player fantasy and emotional target

- What should the player feel on first entry?
- What should change by the time they leave?
- What xianxia/world theme is expressed here?

## 4. Required player actions

List only actions the space must support.

- [ ] enter / transition
- [ ] traverse
- [ ] talk / interact
- [ ] shop / heal / upgrade
- [ ] combat
- [ ] event / breakthrough
- [ ] explore optional branch
- [ ] collect resource
- [ ] exit toward next region
- [ ] other:

## 5. Topology

Chosen topology:

- linear spine
- spine + branches
- loop
- hub + spokes
- braided route
- gated branch
- hybrid:

Why this topology fits the intended player behavior:

`[Explain.]`

### Connection sketch

```text
[ENTRY]
   |
[ZONE A] -- [OPTIONAL]
   |
[ZONE B]
   |
[EXIT]
```

Replace with the real relationship diagram.

## 6. Critical path

- Entry:
- Required nodes in order:
- Exit:
- Approximate traversal intent:
- Where should the player slow down?
- Where should the player move quickly?

## 7. Optional branches

| Branch | Player reward/purpose | Visual cue | Rejoin point | Required? |
|---|---|---|---|---|
| | | | | |

## 8. Zones

| Zone | Function | Expected action | Landmark/focal idea | Density | Notes |
|---|---|---|---|---|---|
| | | | | | |

Create a `ZONE_COMPOSITION_TEMPLATE.md` document for each high-value zone.

## 9. Thresholds / transitions

For each major zone transition, define how the environment communicates the change.

| From → To | Route change | Ground cue | Edge/framing cue | Landmark reveal |
|---|---|---|---|---|
| | | | | |

## 10. Scale metrics

VERIFY these from current runtime before finalizing.

- Player visual height:
- Player body width:
- Player collision footprint:
- Actual visible world area on representative phone:
- Comfortable main-route width:
- Combat-capable clearing width:
- NPC interaction clearance:
- Standard house display/footprint range:
- Landmark range:
- Structural prop range:
- Supporting prop range:

Reference screenshots/build:

`[Build ID / screenshots.]`

## 11. Movement / gameplay constraints

- Safe zones:
- Combat zones:
- No-clutter lanes:
- Interaction pockets:
- Camera reveal requirements:
- Occlusion risks:
- Existing hitbox/timing constraints that art must not change:

## 12. Wayfinding plan

### Global cue

How does the player know where this region sits in the journey?

### Local zone cues

| Zone | Primary cue | Secondary cue | Ground/path cue |
|---|---|---|---|
| | | | |

### Critical-path relay

Describe the sequence of local anchors visible as the player moves.

## 13. Density / negative-space plan

- Densest zone:
- Quietest zone:
- Areas that must remain deliberately open:
- UI-heavy screen regions to protect:
- Density transitions:

## 14. Environmental storytelling

For each major zone:

`inhabitant → repeated activity → tools/materials → traces of use → optional history/world cue`

| Zone | Inhabitant/activity | Evidence cluster | Historical/world cue |
|---|---|---|---|
| | | | |

## 15. Asset kit inventory

### Existing accepted assets

| Asset ID / file | Role | Allowed zones | Scale/flip notes | QC state |
|---|---|---|---|---|
| | | | | |

### Missing assets

Use `ASSET_KIT_PLANNING_TEMPLATE.md` before production.

| Need | Why existing kit cannot solve it | Priority | Proof first? |
|---|---|---|---|
| | | | |

## 16. Repetition control

- Hero assets and max local frequency:
- Structural repeated assets:
- Props requiring variants:
- Assets safe to flip:
- Assets unsafe to rotate/flip:
- Repetition patterns explicitly forbidden:

## 17. Blockout plan

What cheap shapes/placeholders will prove the map before art?

- route mask:
- building masses:
- landmarks:
- zone overlays:
- interaction footprints:
- combat clearings:

## 18. Representative Phone QC views

List the screenshots that must pass.

1. Entry / first read:
2. Major zone A:
3. Major zone B:
4. Branch / transition:
5. Exit:
6. Combat/interaction view if applicable:

## 19. Risks

Classify each as ASK / ASSUME / VERIFY.

| Type | Risk / unknown | Why it matters | Resolution task |
|---|---|---|---|
| | | | |

## 20. Pass gates

### Blockout PASS

- [ ] required actions fit
- [ ] critical path readable
- [ ] scale plausible on phone
- [ ] interaction/combat clearance sufficient
- [ ] zones spatially distinct

### Composition PASS

- [ ] focal hierarchy clear
- [ ] negative space intentional
- [ ] UI does not hide critical cues
- [ ] repetition controlled
- [ ] player silhouette readable

### Production PASS

- [ ] required assets technically normalized
- [ ] runtime uses intended assets
- [ ] sequential Phone QC passes
- [ ] gameplay/hitbox/timing unchanged unless intentionally revised
- [ ] registry/handoff updated

## 21. Locked decisions from this document

Record only decisions accepted by user/evidence. Promote durable constraints to `DECISION_LOG.md`.

- 

## 22. Exact next action

`[One small reversible proof with one clear validation question.]`