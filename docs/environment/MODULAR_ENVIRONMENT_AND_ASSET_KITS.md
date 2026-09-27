# Modular Environment and Asset Kits

## 1. Goal

A modular environment kit should let a small set of assets produce many believable compositions without making the world look copied and pasted.

The purpose is not maximum randomness. It is **controlled recombination under a shared visual and spatial grammar**.

## 2. Why modularity matters

Modular construction supports:

- faster iteration;
- smaller art scope;
- easier replacement and technical repair;
- consistent style;
- reusable functional language;
- localized variation without rebuilding the whole map.

Epic's world-building guidance explicitly recommends modular thinking for repeatable architecture and props. Unity's 2D tooling similarly treats world building as combinations of reusable tiles/sprites rather than one monolithic image.

For this project, the locked direction is already modular-hybrid: painterly shared ground/path layers plus modular houses, trees, props and NPCs.

## 3. Asset kit layers

Plan a kit in layers instead of as a flat list.

### A. Hero assets

Low-frequency, identity-heavy assets.

Examples:

- village hall;
- ancient tree;
- shrine;
- boss seal;
- unique bridge.

Hero assets should not be used as filler.

### B. Structural modules

Define space or functional areas.

Examples:

- houses;
- merchant stall;
- fence segments;
- gates;
- large vegetation masses;
- terraces;
- route-edge modules.

### C. Functional props

Explain what happens in a zone.

Examples:

- cart and goods for merchant;
- herb rack for healer;
- stone table for elder;
- weapon rack for guard area.

### D. Filler props

Add local variation and grounding.

Examples:

- jars;
- baskets;
- woodpile;
- rocks;
- grass patches;
- weeds;
- small debris.

### E. Ground integration assets

Prevent modular objects from floating on an empty surface.

Examples:

- worn path segment;
- forecourt wash;
- dirt/grass blend;
- contact patch;
- footprint/wheel rut;
- stone edging.

## 4. Asset family design

A good family provides meaningful variation, not arbitrary duplication.

A tree family might include:

- broad old tree;
- narrow upright tree;
- small secondary tree;
- stump/young tree if functionally useful.

A fence family might include:

- long intact segment;
- short segment;
- broken segment;
- gate/opening;
- second perspective direction if required by the camera.

Before authoring a variant, state which repetition or composition problem it solves.

## 5. Kit design should follow map needs

Do not generate a giant prop catalogue before topology and zones are known.

Recommended sequence:

1. block out the map;
2. identify repeated spatial/functional needs;
3. list assets already available;
4. identify the smallest missing families;
5. create one proof asset or cluster;
6. integrate and Phone QC;
7. only then expand the family.

This protects against producing attractive assets that have no useful placement role.

## 6. Variation methods

Use variation methods in this order, from cheapest to most expensive:

1. omission;
2. unequal spacing;
3. different clustering;
4. safe scale variation;
5. safe horizontal flip;
6. different ground treatment;
7. different neighboring props;
8. partial overlap/occlusion;
9. authored variant;
10. new hero asset.

Do not rotate baked 3/4 art unless the source was designed for rotation.

## 7. Avoid the “kit dump”

A kit dump happens when the environment tries to show every available prop in each zone.

Symptoms:

- every house gets a tree, fence, lamp and rock;
- every viewport has similar density;
- repeated objects appear at similar offsets;
- zone identity disappears because the same kit is everywhere.

Fix by assigning **prop permissions by zone**.

Example:

| Prop family | Merchant | Healer | Elder | Residential |
|---|---:|---:|---:|---:|
| cart/goods | high | none | none | low |
| herb racks | none | high | none | low |
| old stone/tree | low | low | high | low |
| domestic jars/wood | medium | medium | low | high |
| lantern | medium | medium | low | low-medium |

The table is a design constraint, not a spawn probability table.

## 8. Hero-to-filler ratio

When too many hero-like assets are visible together, the scene loses hierarchy.

Use hero objects sparingly and let supporting/filler assets form quiet connective tissue.

A practical check:

- if removing half the props improves clarity without harming identity, density was too high;
- if removing one unique object destroys zone identity, that object may be functioning correctly as a landmark.

## 9. Naming and metadata

Every production asset family should record:

- Asset ID;
- role: hero / structural / functional / filler / ground;
- canonical runtime filename;
- source/backup location;
- perspective/orientation;
- allowed flip;
- scale range;
- alpha/background requirements;
- grounding convention;
- design/technical/runtime/Phone QC status;
- repetition notes;
- zones allowed.

Use `ASSET_REGISTRY.md` for important identity assets and the map's asset-kit plan for local composition rules.

## 10. Technical normalization

A design-pass sprite is not runtime-ready until technical checks pass.

Check:

- full image decode;
- RGBA/transparency where required;
- no baked black/white matte unless intentional;
- crop bounds are reasonable;
- no large invisible margins;
- source resolution supports intended display size;
- predictable origin/depth behavior;
- asset path and cache-busting work in deployment.

The settlement house and tree failures are project evidence that technical normalization is part of environment production, not an afterthought.

## 11. Kit expansion gate

Do not scale an asset family across the map until:

- one representative asset/cluster renders correctly;
- scale is accepted on phone;
- alpha/grounding is clean;
- perspective is compatible;
- one real zone composition works;
- repetition risk is understood;
- the kit has a clear zone-specific role.

## 12. Project adaptation

For this Xianxia ARPG, favor **small, authored modular kits** over procedural scatter. The map is authored and relatively compact; intentional placement gives better storytelling and phone readability than high-entropy random distribution.

Procedural or rule-based helpers can later assist placement, but they should enforce authored grammar rather than invent composition blindly.

## 13. Source basis

See `SOURCE_REFERENCES.md`, especially Epic's modular-world guidance and Unity's 2D Tilemap/SpriteShape workflow references.