# Wayfinding and Composition

## 1. Purpose

Wayfinding is the player's ability to understand where they are, where they can go, and what matters without requiring constant explicit instructions. Composition is the arrangement of visual information that makes those answers legible.

The two are inseparable. A map can be topologically simple and still feel confusing if every object competes equally for attention.

## 2. The player needs three kinds of orientation

### Global orientation

“Where am I in the larger journey?”

Supported by:

- biome identity;
- settlement/wilderness boundaries;
- major landmarks;
- strong route direction;
- zone naming when appropriate.

### Local orientation

“What part of this place am I in?”

Supported by:

- functional-zone visual language;
- unique landmark props;
- distinct ground treatment;
- building types;
- density and material changes.

### Immediate action orientation

“What should I look at or do now?”

Supported by:

- NPC visibility;
- interaction affordance;
- clear path opening;
- enemy silhouettes;
- item/VFX contrast;
- focal composition.

A good environment supports all three without making every cue equally loud.

## 3. Landmarks as anchors

A landmark should be memorable enough to serve as a mental coordinate.

Landmarks can be:

- a distinctive hall;
- ancient tree;
- shrine or stone marker;
- bridge;
- market awning;
- medicinal drying rack cluster;
- unusual terrain formation;
- gate silhouette.

Not every zone needs a huge hero asset. A unique cluster can be a landmark if the combination is specific and readable.

### Landmark rules

- Give the landmark visual breathing room.
- Reduce nearby competitors.
- Use supporting objects to frame or point toward it.
- Keep its silhouette readable at actual camera scale.
- Reuse its strongest visual motif sparingly elsewhere.

## 4. Paths as visual language

A route should not depend only on collision geometry.

The player can be guided with:

- ground value/color difference;
- worn texture;
- fence/tree edges;
- building orientation;
- prop alignment;
- gaps in dense vegetation;
- repeated lanterns or stones;
- directional composition;
- increasing/decreasing density.

For 2D top-down spaces, ground treatment is especially valuable because large distant landmarks may not remain visible inside a portrait viewport. The GDC level-design roundtable explicitly notes this limitation for 2D and discusses pathway flooring as a critical-path cue.

## 5. Framing and guiding lines

Objects around a focal point can direct attention.

Examples:

- two trees create a gate-like frame around a path opening;
- fence segments converge visually toward a merchant stall;
- the road edge curves toward an elder courtyard;
- house roofs step in scale toward a larger hall;
- dark foliage surrounds a lighter interaction zone.

Guiding lines do not need literal arrows. They are relationships between edges and shapes.

## 6. Contrast budget

Every high-contrast object spends attention.

If houses, UI, NPC labels, trees, props, path texture, combat buttons and interaction prompts all use strong contrast simultaneously, the scene becomes noisy.

Reserve strong contrast for:

1. player and threats during combat;
2. current interaction target;
3. primary landmark or route cue;
4. only then decorative detail.

Background environment can still be rich, but its value and edge contrast should generally support the active layer.

## 7. Focal hierarchy per viewport

For this project, composition should be judged in portrait slices rather than only from the full map.

A useful starting target is:

- **1 primary focal idea** per viewport;
- **1–2 secondary structures**;
- a handful of tertiary details;
- enough negative space for movement and UI readability.

This is not a hard asset-count rule. A dense market can contain many small objects if they visually fuse into one cluster rather than many isolated focal points.

## 8. Avoiding the “sticker field”

A sticker field occurs when each prop reads as an independent icon on a flat background.

Symptoms:

- equal spacing;
- each object has isolated shadow/halo;
- no overlap or grouping;
- no shared ground treatment;
- unrelated orientations;
- no dominant cluster;
- props feel placed rather than used.

Fix through:

- clustering;
- overlap where perspective permits;
- shared grounding wash;
- attaching props to believable edges;
- reducing individual contrast;
- creating functional groups;
- varying spacing and omission.

The successful Merchant V2 pass is a project example: stall, cart, goods and sign became more convincing when treated as one trading vignette rather than four independent decorations.

## 9. Reveal and occlusion

Occlusion can create pacing by delaying information. It should be intentional.

Good uses:

- a house partially hides a side courtyard until approached;
- foliage frames the entrance to a branch;
- a bend reveals a landmark gradually.

Bad uses:

- a large tree hides an NPC label or combat threat;
- a roof covers the player at normal movement scale;
- HUD plus environment removes the only visible path exit.

Every large foreground-capable asset should be tested against player visibility and UI coverage.

## 10. Functional visual language

The player should learn repeated associations.

Examples:

- merchant = awning + goods + cart/sign;
- healer = herbs + racks + ceramic containers + greener edge treatment;
- elder = old tree/stone + calm forecourt + lower clutter;
- danger = darker edge, corrupted vegetation, bones/marks, stronger contrast;
- safe village = warm paper/earth values, maintained paths, domestic props.

A functional language is stronger than a text label because it continues working while the player moves.

## 11. Composition review method

For each representative viewport:

1. hide or mentally ignore text labels;
2. identify the first three things the eye notices;
3. verify they match intended priority;
4. trace the likely movement direction;
5. check whether props form clusters or isolated stamps;
6. inspect UI-covered regions;
7. check whether player silhouette survives against the environment;
8. compare adjacent screenshots for excessive repetition.

## 12. Pass gates

Wayfinding/composition is ready for production when:

- critical path can be followed without reading labels;
- each major zone has at least one recognizable visual cue;
- landmarks have supporting composition rather than competing clutter;
- no viewport has multiple accidental primary focal points;
- UI does not cover essential navigation cues;
- large props do not repeatedly obscure player/NPC/enemies;
- adjacent screens do not reveal an obvious copy-paste formula.

## 13. Source basis

See `SOURCE_REFERENCES.md`, especially Brendon Chung's GDC talk on wayfinding/storytelling, the GDC Level Design Workshop roundtable, and the `Invisible Intuition` blockmesh/lighting talk.