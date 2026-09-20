# Level Blockout and Player Flow

## 1. Why blockout exists

Blockout is the stage where the team proves the shape of the experience before expensive art decisions make change painful. Epic's level-design documentation explicitly frames blockout as a fast, playable rough draft focused on layout, scale, sight lines, movement and function rather than polished detail.

For this project, “blockout” does not have to mean gray 3D cubes. It means **cheap representations with correct spatial meaning**.

In a 2D top-down game, blockout can use:

- colored rectangles or simple sprites for buildings;
- broad painterly or geometric route masks;
- zone overlays;
- placeholder landmarks;
- simple circles/rectangles for interaction and encounter footprints;
- rough terrain boundaries;
- debug labels for design only.

The important property is reversibility.

## 2. Start from player actions

Before drawing roads or placing houses, list the actions that must happen in the space.

Examples:

- enter from wilderness;
- recognize the safe settlement;
- meet the elder;
- visit merchant;
- visit healer;
- cross the village efficiently;
- optionally explore a side yard;
- leave toward the next combat zone.

The level should make these actions possible, readable and appropriately paced.

Do not begin with “we need six houses.” Begin with “what does the player do here, in what order, and how much freedom should they have?”

## 3. Topology before geometry

Topology describes relationships before exact measurements.

Useful structures include:

- **linear spine** — easy to understand, low exploration;
- **spine with branches** — strong main route with optional pockets;
- **loop** — multiple routes reconnect, good for revisits;
- **hub and spokes** — central anchor with distinct functional zones;
- **braided route** — two or more parallel ways that rejoin;
- **gated branch** — visible destination unlocked later.

A village can combine these. For example, an entry spine can widen into a small hub, with merchant and healer branches, then narrow again toward the exit.

Select topology based on intended player behavior, not on visual novelty.

## 4. Critical path and optional space

Define the minimum route a player must understand.

Then classify other spaces:

- **critical** — required for progression;
- **supporting** — improves services/readability but can be skipped;
- **optional** — exploration/reward/story flavor;
- **scenic** — visible but not necessarily reachable.

This prevents every corner from competing for attention.

A critical route should usually have stronger continuity than optional branches. Branches can use narrower ground treatment, less contrast, smaller landmarks or more local enclosure.

## 5. Nodes, edges, thresholds and transitions

Useful spatial concepts:

- **node** — a place where the player stops, decides, interacts or changes direction;
- **edge** — a boundary that shapes movement, such as fence, vegetation, cliff, water or building mass;
- **threshold** — a moment of entering another zone, such as gate, bridge, narrowing road or change in ground treatment;
- **transition** — the buffer between identities.

Do not rely on invisible boundaries when the environment can communicate the change naturally.

For a settlement, thresholds might include:

- path changing from wilderness dirt to maintained village route;
- a gate or pair of lantern posts;
- denser building edges;
- a change in ambient props;
- a small forecourt before a major NPC area.

## 6. Blockout metrics

Set rough metrics early so every zone uses the same spatial language.

Measure relative to a stable reference, usually player footprint or player visual height.

Track at least:

- player visual height/width;
- player collision footprint;
- comfortable route width;
- combat-capable route width;
- interaction clearance around NPCs;
- standard house footprint range;
- landmark footprint range;
- prop clearance from critical movement;
- minimum screen-space separation between focal objects.

Exact project values belong in the Xianxia ARPG Playbook and map design files. The generic principle is consistency.

## 7. Movement flow is not just a road

A route can be technically open and still feel bad.

Check:

- Does the player constantly collide with decorative objects?
- Does the shortest path cut awkwardly through yards or behind buildings?
- Are service NPCs positioned where approach feels natural?
- Are turns readable before the player reaches them?
- Do large props hide the next route in a way that is intentional rather than accidental?
- Does the camera reveal new information at a satisfying rate?

Movement flow is the combined result of geometry, visual cues and camera framing.

## 8. Compression and release

Spatial pacing can be created by changing width and density.

Examples:

- narrow approach → open village forecourt;
- dense houses → quiet healer garden;
- open road → framed elder courtyard;
- settlement exit → wider dangerous wilderness.

This gives the player a felt sense of progression even without cutscenes.

For portrait mobile, compression should not become visual suffocation. Always test under the actual HUD.

## 9. Encounter and safe-space compatibility

Even when art work must not alter gameplay, environment planning should understand gameplay requirements.

Mark areas as:

- safe interaction space;
- traversal-only space;
- combat-capable space;
- scripted encounter space;
- transition buffer.

A decorative redesign must not accidentally turn a safe interaction node into a cluttered obstacle field or create visual ambiguity about settlement safety.

## 10. Iterate before polishing

Blockout is successful when it answers design questions cheaply.

A good iteration loop:

1. sketch topology;
2. place rough masses and route;
3. run in engine;
4. walk the actual path on phone;
5. record confusion, awkward scale, dead space and clutter;
6. change the blockout, not the final art;
7. repeat until the route and zone relationships feel stable.

Only then lock asset-production scope.

## 11. Blockout pass gates

Do not enter final environment-art production until:

- all required player actions fit the map;
- critical route is understandable;
- optional branches are distinguishable from required path;
- scale feels believable on phone;
- major interaction nodes have enough clearance;
- every major zone has a spatial identity;
- landmarks are assigned, even if still placeholders;
- no final asset is being used to hide a topology problem.

## 12. Project implication

For Thanh Vân Thôn and future maps, the next full environment redesign should first produce a **schematic map/blockout artifact** showing route, zones, landmarks, building masses, open areas and transition boundaries. Production props should be planned after that artifact is accepted, not before.

## 13. Source basis

Primary references are listed in `SOURCE_REFERENCES.md`, especially Epic's `Project Setup and Level Blockout`, GDC `Level Design Fundamentals & Techniques`, and the Level Design Book's blockout guidance.