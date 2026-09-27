# Thanh Vân Thôn — Environment Design V1

Status: DISCOVERY LOCKED / DESIGN V1
Date: 2026-09-20
Runtime/art baseline: `56b9359`
Documentation baseline when drafted: `ccda050`
Owner playbook: `docs/environment/XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md`
Companion schematic: `docs/environment/maps/THANH_VAN_THON_MACRO_SCHEMATIC_V1.md`

## 1. Locked identity

User decisions for V1:

- **Village identity:** poor, humble, ordinary frontier village close to the wilderness.
- **Game role:** light hub. Important in the opening, revisited when useful, but not intended to remain the dominant hub for the whole game.
- **Navigation:** clear main route with a few small side lanes / optional branches.
- **Perceived scale:** the playable slice stays compact, but edge composition should imply a larger village beyond the directly authored gameplay space.
- **Natural terrain:** include modest water/agriculture language such as a small stream or pond, simple bridge, garden/field edges. Terrain should enrich composition without turning the village into a traversal puzzle.

These decisions define V1 and should not be reopened unless the user asks.

## 2. One-sentence purpose

**Thanh Vân Thôn is a poor frontier cultivation village that teaches the player how the world works, provides a small safe service hub, and visually prepares the transition from ordinary rural life into the dangerous cultivation wilderness.**

## 3. Emotional target

On first play, the village should feel:

- small and materially modest;
- inhabited rather than decorated;
- safe, but not wealthy or fortified;
- close enough to wilderness that rough fences, worn roads and field edges feel necessary;
- touched by cultivation culture only lightly through the Elder, healer and subtle symbolic details.

It should **not** read as:

- a prosperous sect town;
- a dense market city;
- a decorative theme park where every screen contains a hero prop;
- an empty tutorial corridor.

## 4. Verified runtime constraints

From current code:

- World: `1600 × 9000`.
- Settlement band: `y = 7200..9000`, so local settlement space is `1600 × 1800`.
- Portrait game viewport: `720 × 1280`.
- A single portrait camera can therefore cover about **71% of the settlement's vertical extent** at once (`1280 / 1800`).
- Player spawn: world `(800, 8150)` → settlement-local `(800, 950)`.
- Player runtime visual height: `112`.
- Player collision rectangle: `58 × 78`.
- NPC interaction radius: `155`.
- Existing NPC anchors:
  - Mặc Trưởng Lão: `(650, 7600)` → local `(650, 400)`.
  - Lục Chưởng Quầy: `(955, 8060)` → local `(955, 860)`.
  - Thanh Dược Sư: `(650, 8510)` → local `(650, 1310)`.
- Existing production-house display widths: approximately `275..347`.
- Accepted Merchant V2 widths: stall `270`, cart `180`, goods `135`, sign `60`.
- Current painted main-path segments are roughly `238..260` display width, with authored branches/forecourts around them.
- Player movement is clamped only by world edges. Current art objects do not themselves define blocking navigation.

### Design consequence

Because the portrait camera is tall relative to the village, **vertical spacing alone cannot create strong zone separation**. V1 must use lateral offset, framing, density and activity differences so Elder, Merchant and Healer do not collapse into one visual soup when multiple zones are inside the same camera height.

## 5. Chosen topology

**Spine + branches.**

The village uses one obvious north-south worn road as the orientation backbone. Small side paths lead to local functional pockets.

Why this fits:

- mobile portrait players can recover orientation quickly;
- the existing world progression already exits north toward Thanh Vân Hoang Nguyên;
- small branches allow exploration without creating maze friction;
- a poor village plausibly grows around one old road rather than a formal plaza grid.

## 6. Critical path

Current V1 assumes the existing player spawn remains unchanged during the first layout proof.

Critical movement:

`spawn / central village → merchant junction → elder threshold → north exit → Thanh Vân Hoang Nguyên`

The route should remain readable without map UI.

### ASSUME

Keep `WORLD.playerSpawn = (800, 8150)` for the first blockout. Moving spawn is a gameplay/pacing decision and is not required to prove the environment topology.

If later Phone QC shows the opening does not expose enough village identity, spawn relocation becomes a separate ASK rather than being silently folded into art work.

## 7. Functional zones

### Z0 — North frontier threshold

Approx local band: `y 0..260`.

Function:

- transition between safe village and wilderness;
- establish that Thanh Vân Thôn is a rough frontier settlement, not a fortified town.

Visual grammar:

- worn road entering from north;
- simple timber marker / partial fence rather than grand gate;
- sparse vegetation;
- one readable threshold cue;
- low density.

No large decorative arch is required for V1.

### Z1 — Elder court / village authority

Approx local band: `y 260..620`, west-center.

Anchor:

- existing Mặc Trưởng Lão at local `(650, 400)`.

Function:

- cultivation guidance;
- village authority;
- narrative pause before wilderness.

Visual grammar:

- quiet forecourt;
- strongest negative space among village service zones;
- one old tree or weathered stone cue;
- simple house / meeting edge;
- restrained cultivation symbolism;
- low-medium prop density.

The Elder should feel respected because of **space and placement**, not because his area is richer than the rest of the village.

### Z2 — Merchant crossroads

Approx local band: `y 620..1120`, east-center.

Anchor:

- existing Lục Chưởng Quầy at local `(955, 860)`;
- existing accepted Merchant V2 vignette.

Function:

- trade identity;
- social/activity high point;
- central orientation node.

Visual grammar:

- accepted stall/cart/goods/sign cluster;
- highest local activity density;
- clear customer/interaction pocket;
- route widens slightly or bends around the working frontage;
- functional clutter clustered as one activity, not scattered evenly.

**Preserve the current Phone-PASS merchant scale/composition as the V1 anchor.**

### Z3 — Healer garden / water branch

Approx local band: `y 1120..1520`, west-center.

Anchor:

- existing Thanh Dược Sư at local `(650, 1310)`.

Function:

- healing service;
- quiet optional branch;
- introduce agricultural/herbal life.

Visual grammar:

- herb beds / drying/storage evidence later;
- greener but still muted;
- small irrigation stream or pond edge;
- one modest plank/stone bridge on the **healer branch**, not on the critical main spine;
- medium density, calmer than merchant.

The water feature exists to explain land use and route shape. It must not become a traversal gimmick.

### Z4 — South residential / field fringe

Approx local band: `y 1450..1800` plus west/east edge dressing.

Function:

- communicate ordinary domestic life;
- make the settlement feel larger than its gameplay slice;
- visually terminate the world boundary naturally.

Visual grammar:

- small domestic clusters;
- fences, wood, jars/garden evidence later;
- crop/garden strips;
- partial compounds/roof masses at edges;
- lower visual contrast than service zones;
- no additional major gameplay landmark required.

## 8. Water and agriculture logic

V1 terrain concept:

- a **small irrigation stream / pond system** belongs to the lower village, close to the healer and gardens;
- it should sit mostly off the main critical road;
- a short bridge can connect the healer branch or a garden pocket;
- field/garden traces should appear toward the south and side edges;
- water should visually justify why some paths bend and why the healer occupies a greener pocket.

Do not add a large river across the whole settlement in V1.

## 9. Perceived-scale strategy

The user chose a compact playable slice that suggests a larger village.

Use four mechanisms:

1. **Partial edge compounds** — roofs/fences/gardens cut by the world/camera edge rather than six fully framed showcase houses.
2. **Continuation cues** — side lanes that visually continue toward domestic clusters without becoming required gameplay routes.
3. **Activity traces** — stacked wood, field strips, laundry/jars/herbs later, implying households beyond the three named NPCs.
4. **Density falloff** — central service pockets are authored in detail, while peripheral residential masses are simpler and quieter.

Do not solve perceived scale by simply adding many full-size houses.

### Important runtime risk

Current player movement is not blocked by environment art. Edge dressing must therefore avoid visually promising inaccessible alleys or solid barriers until the collision/boundary strategy is deliberately designed. The first blockout should use soft framing and world-edge composition, not fake hard walls.

## 10. Wayfinding relay

The main orientation chain should be:

`wilderness threshold → Elder quiet court → Merchant activity cluster → Healer green/water branch → residential/field fringe`

For the player's first outward journey from the current spawn, the relay is read in reverse toward the north:

`merchant/spawn → Elder → frontier threshold → plains`

Zone identity should remain readable even with text labels hidden.

## 11. Portrait composition rules for this village

Because the camera is `720 × 1280`:

- do not place all focal objects on the same x-axis;
- keep the critical road readable through the center third but let it drift laterally;
- use left/right alternation between zone focal clusters;
- one service vignette should dominate a given camera composition even if another NPC lies inside the vertical camera range;
- protect lower-left joystick and lower-right combat-control visual regions from critical navigation-only cues;
- keep interaction pockets free of large decorative sprites.

Suggested lateral rhythm:

`Elder west → Merchant east → Healer west → residential split/edge`

This uses the 1600-wide world to create separation the 1800-high settlement cannot provide vertically.

## 12. Density plan

From lowest to highest intended local density:

1. North threshold — sparse.
2. Elder court — sparse/quiet.
3. Residential fringe — irregular low-medium.
4. Healer garden — medium functional density.
5. Merchant crossroads — densest functional cluster.

Avoid uniform prop count per house.

## 13. Existing accepted asset kit

Reusable now:

- four production house variants;
- painterly path A/B;
- ground patch and forecourt;
- village tree;
- wooden fence;
- rock/grass patch;
- lantern post;
- Merchant V2 stall/cart/goods/sign.

These are enough to build a **layout/blockout proof** without producing new art.

## 14. Candidate missing assets after blockout PASS

Do not produce these yet. They are candidates only.

Priority candidates:

- simple irrigation stream / pond-edge module;
- modest plank/stone footbridge;
- herb drying rack / herb bed cluster;
- rural field/garden strip;
- domestic utility cluster such as woodpile/jars/baskets;
- one Elder-zone authority cue such as weathered stone, bench/table or village marker;
- optional low-detail edge-house/roof dressing if existing houses cannot create the scale illusion cleanly.

Merchant assets are already sufficient and should not be regenerated.

## 15. Repetition control

Forbidden pattern:

`house + tree + fence + rock + lantern` repeated as a recipe.

Use:

`zone function → required activity → structural mass → negative space → supporting traces`

Then vary through omission first.

## 16. First blockout proof

The first implementation after this design document should be deliberately cheap and reversible.

### Proof scope

- no new production PNGs;
- preserve current merchant Phone-PASS cluster;
- add temporary schematic overlays/placeholders for:
  - zone boundaries;
  - proposed water/pond footprint;
  - healer branch bridge location;
  - edge residential/field massing;
  - north threshold framing;
- use current accepted houses/props only where useful;
- do not change combat, hitboxes, NPC interaction radius or timing.

### Validation question

**Does Thanh Vân Thôn read on phone as a humble frontier village with a clear main spine, three distinct functional pockets, modest natural terrain, and the suggestion of a larger settlement without becoming cluttered?**

## 17. Phone QC views required for blockout

1. Current spawn / merchant read.
2. Looking north toward Elder and village exit.
3. Elder court at interaction distance.
4. Healer branch with water/bridge placeholder.
5. South residential/field fringe.
6. One traversal sequence proving the main route never becomes ambiguous.

## 18. Risks and resolution

| Type | Risk / unknown | Why it matters | Resolution |
|---|---|---|---|
| VERIFY | Tall portrait camera shows multiple zones at once | Can flatten hierarchy | Blockout with lateral staggering; Phone QC screenshots |
| VERIFY | Environment currently has no art collision | Edge illusion may look fake if player walks through it | Keep first proof soft; inspect later collision need separately |
| ASSUME | Keep current spawn at local `(800,950)` | Avoid hidden gameplay/pacing change | Revisit only if Phone QC says opening read is weak |
| VERIFY | Existing house/prop kit may be enough for residential edge | Avoid unnecessary asset generation | Blockout with existing kit first |
| VERIFY | Water feature may compete with path readability | Could turn calm village into noisy texture field | Use one small lower-village water system only |

## 19. V1 PASS gate

This design is ready to move into blockout when:

- village identity is locked;
- topology is locked;
- the three named NPC zones have distinct functional grammar;
- merchant Phone-PASS cluster is preserved;
- water has a purpose and does not block critical path;
- perceived-scale strategy does not require dozens of full houses;
- no new art is required just to test the layout.

All of those conditions are satisfied for V1.

## 20. Exact next action

Create a **Thanh Vân Thôn macro blockout proof** from the accepted runtime baseline. Change only environment composition/temporary proof overlays needed to test the topology above, deploy, then require Phone QC before producing any new village asset.
