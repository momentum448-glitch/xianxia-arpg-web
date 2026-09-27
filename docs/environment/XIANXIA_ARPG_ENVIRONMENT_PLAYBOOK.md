# Xianxia ARPG Environment Playbook

## 1. Purpose

This is the project-specific environment design playbook. It translates the general principles in `docs/environment/` into working rules for this game:

- 2D top-down;
- browser-first;
- mobile-first portrait 9:16;
- Phaser runtime;
- authored continuous open-map-lite world;
- painterly original xianxia art direction;
- Phone QC as the final authority for scale/readability.

It does **not** replace `DECISION_LOG.md`. Locked decisions remain locked there. This file explains how to apply them.

## 2. Current environment identity

The project uses a **modular-hybrid environment**:

- painterly ground/path/decal layers provide continuity;
- houses, trees, fences, props, NPCs and interactables remain modular runtime objects;
- major compositions are authored rather than procedurally scattered;
- road/path shapes should feel organic rather than ruler-straight;
- gameplay hitboxes/timing remain independent from art integration unless explicitly changed.

This avoids two bad extremes:

1. one huge flattened background that is difficult to iterate or integrate with gameplay;
2. isolated decorative sprites floating on a blank ground plane.

## 3. Art-language rules

Environment art should stay consistent with the current C4 direction:

- restrained ink-wash influence;
- moderate anime influence;
- muted earth / ink / jade palette;
- warm paper/soil values in settlement spaces;
- broad readable silhouettes;
- painterly detail that survives phone scale;
- supernatural elements used as hierarchy, not constant decoration.

Environment assets should generally remain quieter than player, enemies, combat VFX and interaction prompts.

## 4. Map design order

For any substantial new map/zone, use this order:

1. **Purpose** — what the player must feel/do here.
2. **Topology** — how required/optional areas connect.
3. **Zones** — functional identities.
4. **Critical path** — the clearest progression route.
5. **Landmarks** — local orientation anchors.
6. **Scale metrics** — player-relative space/object relationships.
7. **Blockout** — cheap playable representation.
8. **Phone flow test** — movement/readability before art.
9. **Composition** — viewport-level hierarchy and negative space.
10. **Asset kit plan** — only the missing art actually needed.
11. **One production proof** — smallest representative asset/cluster.
12. **Runtime integration + Phone QC**.
13. **Expand only after PASS**.

Do not reverse this into `generate props → find somewhere to place them`.

## 5. Zone grammar

Every major zone should define:

- one-sentence function;
- who uses it;
- expected player action;
- focal landmark/cluster;
- path relationship;
- negative-space requirement;
- permitted prop families;
- density target;
- environmental-story evidence;
- Phone-QC views required.

A zone should not be distinguished only by a text label.

## 6. Settlement functional-zone model

The current settlement work suggests a reusable model:

### Merchant zone

Function: trade, receiving/storing/moving goods.

Visual grammar:

- stall/awning as focal structure;
- goods and cart as supporting functional props;
- sign as identity cue;
- clear customer/interaction pocket;
- near useful circulation, not isolated in decorative yard.

Current accepted example: Lục Chưởng Quầy merchant vignette in build `56b9359`.

### Healer zone

Function: collect, dry, sort, prepare and store medicine.

Potential grammar to test later, not yet locked:

- greener edge treatment;
- herb racks / baskets / ceramic storage;
- cleaner working space;
- less trade clutter than merchant;
- visually calm but active.

### Elder zone

Function: receive villagers, teach, discuss cultivation/village matters.

Potential grammar to test later, not yet locked:

- lower prop density;
- old tree / stone / symbolic anchor;
- more formal forecourt;
- strong negative space;
- visual authority without excessive ornament.

### Residential zones

Function: domestic life.

Potential grammar:

- smaller clusters;
- wood, water, jars, garden/fence evidence;
- less hero-level contrast;
- variation through omission and household activity rather than random decoration.

These healer/elder/residential details are project adaptations awaiting map-specific discovery and Phone validation. They are not locked asset lists.

## 7. Scale grammar

### 7.1 Use accepted runtime references

Do not infer world size from PNG pixel dimensions.

Reference scale should be measured from:

- production male player in runtime;
- accepted settlement houses;
- accepted merchant world-scale proof;
- actual portrait viewport.

### 7.2 Current accepted merchant display widths

Locked from Phone QC build `56b9359`:

- merchant stall: `270`;
- cart: `180`;
- goods: `135`;
- sign: `60`.

These values prove the principle that structural/functional props must match world scale. They are not universal scale multipliers.

### 7.3 New structural asset scale test

Before broad placement:

1. show asset next to player;
2. show it next to an accepted house/structural reference;
3. capture actual phone viewport;
4. compare 2–3 display sizes if uncertain;
5. choose by world role;
6. record accepted display size after Phone PASS.

If the art is good but scale is wrong, classify `SCALE_REVISE`, not `DESIGN_REVISE`.

## 8. Density grammar

Default composition target, used as a starting heuristic rather than a hard rule:

- one dominant focal idea per portrait viewport;
- one or two supporting structural masses;
- a small number of tertiary clusters;
- clear movement/interaction breathing room.

Dense functional areas may contain many sprites if they visually fuse into one coherent cluster.

Avoid uniform density. Use transitions:

- wilderness → settlement edge;
- quiet residential → active merchant;
- active service zone → calm elder area;
- settlement → dangerous frontier.

## 9. Prop grammar

### 9.1 No mechanical house formula

Locked rule: do not repeat `house + tree + fence + rock + lamp` around every house.

### 9.2 Props need functional permission

Ask:

- What activity explains this object?
- Does this zone actually need it?
- Is it structural, functional or filler?
- Has the same silhouette appeared too often recently?

### 9.3 Variation order

Prefer:

`omission → unequal spacing → clustering → safe scale variation → safe flip → different ground context → authored variant`

Do not rotate perspective-baked 3/4 assets merely to create variation.

### 9.4 Grounding

Modular props should connect to the ground through one or more of:

- painted contact detail already inside the sprite;
- shared ground wash;
- dirt/grass patch;
- believable overlap with path/vegetation edge;
- subtle project-standard contact shadow when needed.

Avoid identical gray ellipse shadows under every object.

## 10. Route grammar

Locked settlement direction:

- organic curves;
- variable width;
- small branches/courtyards;
- irregular edges;
- main route remains readable.

Roads should bend for a reason: terrain, buildings, property/activity edges, water or long-term use.

For future maps, define:

- critical route;
- optional branch hierarchy;
- transition thresholds;
- combat-capable widths;
- local landmarks that relay orientation screen by screen.

## 11. Portrait viewport grammar

Design through the phone camera.

Protect:

- top HUD zone from essential navigation-only information;
- lower-left joystick region;
- lower-right ATK/SKILL/NÉ region;
- NPC interaction pocket;
- player silhouette against busy textures.

Use the upper portion of the visible world as a reveal zone for what comes next.

Important horizontal branches require more than one cue because the screen is narrow.

## 12. Wayfinding grammar

Use a layered system:

1. ground/path continuity;
2. building/vegetation edges;
3. local landmarks;
4. functional prop clusters;
5. labels/prompts only as confirmation.

The player should not need an NPC name label to recognize merchant/healer/elder functions once production environment identity is mature.

## 13. Environmental storytelling grammar

For each zone:

`inhabitant → repeated activity → required tools/materials → traces of use → one optional history/world cue`

Examples:

- merchant: goods flow, storage, cart access, sign, worn customer area;
- healer: drying/preparation/storage, plant material, water/ceramic tools;
- elder: meeting/teaching space, quieter formal anchor;
- wilderness shrine: offerings/warding/neglect depending on story.

Xianxia cues should be selective. Ordinary objects make spiritual objects feel important.

## 14. Technical asset rules

Before runtime integration:

- full decode;
- RGBA where transparency is required;
- no black/white matte;
- crop clean enough for placement;
- source resolution sufficient for intended runtime display;
- perspective/origin/depth understood;
- asset path centralized where appropriate;
- critical source backed up/registered;
- design status separate from technical status.

Do not salvage visibly corrupt source bytes into production.

## 15. Proof architecture rule

Current runtime has used `SettlementPropsProofScene` layered over `GameScene` for settlement proofs. Before broad environment expansion, VERIFY whether accepted proof work should be promoted into the normal gameplay scene or whether the proof layer remains deliberately useful.

Do not let a temporary proof architecture silently become permanent architecture.

## 16. Map-document requirement

Before a major environment rebuild, create a map-specific design document using `templates/ENVIRONMENT_DESIGN_TEMPLATE.md`.

It should include:

- purpose;
- topology diagram/description;
- zones;
- route/branch plan;
- landmarks;
- scale metrics;
- density plan;
- asset-kit gap list;
- pass gates;
- open ASK / ASSUME / VERIFY items.

For each major zone, use `ZONE_COMPOSITION_TEMPLATE.md`.

## 17. Environment production statuses

Use clear status language:

- `REFERENCE_ONLY`;
- `DESIGN_PASS`;
- `ISOLATED_READY`;
- `TECH_REWORK`;
- `INTEGRATED`;
- `PHONE_PASS`;
- `REVISE`.

For diagnosis, also use:

- `SCALE_REVISE`;
- `COMPOSITION_REVISE`;
- `FLOW_REVISE`;
- `DENSITY_REVISE`;
- `RUNTIME_BUG`.

A scale/layout failure is not permission to regenerate accepted art.

## 18. Default Phone QC evidence

### Asset scale proof

One screenshot containing player + new asset + accepted structural reference.

### Zone composition proof

2–4 screenshots along normal traversal.

### Expanded environment proof

Sequential screenshots that expose repetition, route continuity and density transitions.

### Map completion proof

Representative entry, major zones, transitions and exit plus normal gameplay movement.

## 19. Current Thanh Vân Thôn baseline

Accepted runtime/art baseline: build `56b9359`.

Current accepted elements include:

- painterly organic ground/path treatment;
- production houses;
- base tree/fence/rock-grass/lantern prop kit;
- world-scaled Lục Chưởng Quầy merchant vignette;
- lower merchant-area tile-roof house removed for composition clarity.

Do not change this baseline merely to “polish more.” The next substantial village work should first use the environment-design process to decide what problem is being solved.

## 20. Next recommended use of this playbook

Before adding NPC production art or more village props, produce a **Thanh Vân Thôn environment design v1** from the template:

- define village fantasy and scale of settlement;
- define macro topology;
- define functional zones;
- decide whether terrain features participate strongly;
- establish player-relative scale metrics from runtime;
- map representative portrait compositions;
- identify the minimum additional asset kit.

That design work should determine whether existing runtime composition is retained, rearranged or selectively rebuilt.

## 21. Update rule

When Phone QC proves a reusable rule:

1. update the relevant generic guide if the principle is general;
2. update this playbook if the rule is project-specific;
3. append to `DECISION_LOG.md` if it materially constrains future work;
4. update map-specific design docs and asset registry as needed.

This playbook is a living design system, not a frozen style manifesto.