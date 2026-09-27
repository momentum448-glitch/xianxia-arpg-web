# Environment & Level Design Knowledge Base

Purpose: provide a reusable design system for building coherent, readable, production-friendly environments for the Xianxia ARPG instead of solving every map through ad-hoc asset placement.

This knowledge base separates three things that must not be conflated:

- **SOURCE PRINCIPLE** — a general lesson supported by external level/environment design material.
- **PROJECT ADAPTATION** — how that lesson is translated to this 2D top-down, portrait-mobile, browser ARPG.
- **LOCKED PROJECT RULE** — a decision already accepted for this project through `DECISION_LOG`, code/runtime evidence, or Phone QC.

A source principle is not automatically a project rule. A project adaptation is a working design method until runtime evidence validates or revises it.

## Reading order

For new environment work, read in this order:

1. `ENVIRONMENT_DESIGN_FOUNDATIONS.md`
2. `LEVEL_BLOCKOUT_AND_PLAYER_FLOW.md`
3. `WAYFINDING_AND_COMPOSITION.md`
4. `SCALE_DENSITY_AND_SPATIAL_GRAMMAR.md`
5. `MODULAR_ENVIRONMENT_AND_ASSET_KITS.md`
6. `ENVIRONMENTAL_STORYTELLING.md`
7. `MOBILE_PORTRAIT_LEVEL_DESIGN.md`
8. `XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md`
9. `ENVIRONMENT_QC_PLAYBOOK.md`
10. `SOURCE_REFERENCES.md` when checking provenance or researching further.

Reusable templates live in `docs/environment/templates/`.

## What each document answers

| Document | Main question |
|---|---|
| Foundations | What makes an environment coherent and readable? |
| Blockout & Player Flow | What should be designed before final art? |
| Wayfinding & Composition | How does the player understand where to go and what matters? |
| Scale, Density & Spatial Grammar | How large, close, sparse, or repeated should things be? |
| Modular Environment & Asset Kits | How do we reuse a small kit without obvious stamping? |
| Environmental Storytelling | How does a location communicate function, history, and inhabitants? |
| Mobile Portrait Level Design | What changes because the viewport is 9:16 mobile and top-down? |
| Xianxia ARPG Playbook | What rules should this specific game use day to day? |
| Environment QC Playbook | What evidence is required before expanding a proof? |
| Source References | Where did the general principles come from? |

## Default environment workflow

Use this order unless a task has a documented reason to deviate:

`purpose → player actions → topology → zones → critical path → landmarks → scale metrics → blockout → phone flow test → composition → asset kit → production art → runtime integration → Phone QC → expansion`

Do not start by generating a list of decorative assets.

## Core doctrine

### Function before decoration

Every major zone should answer:

- Why does this place exist in the world?
- Why does the player come here?
- What action or decision happens here?
- What must remain readable during movement or combat?

Decoration supports those answers. It does not substitute for them.

### Cheap decisions before expensive decisions

Topology, route width, zone relationship, scale, sight/readability and negative space should be proven with rough representations before spending time on final production art.

### Composition is viewport-relative

The world may be 1600 × 9000, but the player experiences it one portrait viewport at a time. A map can look good from a full-map overview and still fail on phone. Every important route and zone therefore needs viewport-level composition checks.

### Visual identity comes from systems, not asset count

A richer environment does not necessarily require more unique sprites. Coherence comes from hierarchy, grouping, variation, functional clustering, edge treatment, ground integration, scale consistency and controlled repetition.

### Phone QC is the final visual authority

Desktop composition, isolated asset inspection and generated mockups are intermediate evidence only. Scale, readability, overlap, UI occlusion and scene rhythm must be judged in the actual mobile runtime.

## Rules for using this knowledge base

- Do not use these guides to reopen a locked decision unless the user requests reconsideration.
- When a guide conflicts with current code or Phone-QC evidence, verify the discrepancy and update the guide rather than forcing the implementation to match stale prose.
- Keep project-specific numbers in the Xianxia ARPG Playbook or the relevant map design file, not in generic theory documents.
- Add new external references to `SOURCE_REFERENCES.md` with a note explaining what was extracted from them.
- When a principle is repeatedly validated by this project, promote it into a durable project rule in `DECISION_LOG.md` if it materially constrains future work.

## Template usage

For a new map or settlement:

1. Copy `templates/ENVIRONMENT_DESIGN_TEMPLATE.md`.
2. Define macro purpose, topology, zones and pass gates.
3. Copy `templates/ZONE_COMPOSITION_TEMPLATE.md` for each major functional zone.
4. Only after the zone plan is stable, use `templates/ASSET_KIT_PLANNING_TEMPLATE.md` to decide what art actually needs to be created.

The intended result is a repeatable environment production system, not a one-off Thanh Vân Thôn solution.