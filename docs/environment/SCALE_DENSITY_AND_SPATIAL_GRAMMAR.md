# Scale, Density and Spatial Grammar

## 1. Why this needs its own guide

Many environment problems that look like “bad art” are actually scale or spacing problems. The Merchant V2 proof demonstrated this directly: the accepted assets were visually sound, but initially read as miniature because their scene scale was too small relative to houses, player and world context.

A project should therefore maintain a **spatial grammar**: repeatable relationships between player scale, building scale, route width, prop size, spacing and visual density.

## 2. Separate source resolution from world scale

A sprite's pixel dimensions do not define how large it should appear in the world.

Track separately:

- source pixel dimensions;
- runtime display width/height;
- relative size to player;
- collision footprint if any;
- intended visual role;
- maximum acceptable upscaling before softness becomes visible.

Do not regenerate an accepted asset simply because it is displayed at the wrong world scale. First test scene scale.

## 3. Choose stable reference metrics

Use a few stable references instead of eyeballing every object independently.

Recommended metric anchors:

- `P_vis_h` = player visual height at neutral pose;
- `P_body_w` = player readable body width;
- `P_collision` = gameplay collision footprint;
- `V_w / V_h` = visible world area under the portrait camera;
- `R_comfort` = comfortable main-route width;
- `R_combat` = minimum route/clearing width for active combat;
- `I_clear` = clearance around important NPC interaction.

Then describe environment objects as ranges relative to those anchors.

Example notation:

- small prop: `0.3–1.0 × P_vis_h`;
- cart/stall structure: several player-heights wide;
- house: large enough to read as architecture, not scenery furniture;
- landmark tree: deliberately above house/player hierarchy.

The exact ratios must be measured from the project's accepted runtime rather than copied from another game.

## 4. Scale categories

Classify assets by role so scale decisions stay coherent.

### Hero / landmark

Large, memorable, low-frequency. Examples: elder tree, hall, shrine, gate.

### Structural

Shapes spatial boundaries or functional zones. Examples: houses, market stall, fences, bridge, large tree mass.

### Supporting

Reinforces a cluster. Examples: cart, herb rack, woodpile, signboard.

### Filler / texture

Adds local richness without owning attention. Examples: rock-grass patch, baskets, jars, weeds, small stones.

If filler props become comparable in visual mass to structural objects, hierarchy breaks.

## 5. Density is not object count

Density should be judged by **visual mass and attention**, not by how many sprite instances exist.

Ten tiny baskets grouped into one market pile can read as one tertiary cluster. Three isolated high-contrast trees can make a viewport feel much denser.

Track density at three scales:

- **macro density** — how built-up or open a zone is;
- **viewport density** — how much visual information appears on one phone screen;
- **cluster density** — how tightly related props sit around a local activity.

## 6. Design with density gradients

Natural spaces rarely maintain constant density.

Useful gradients:

- settlement entry: medium → dense;
- main road: open center, denser edges;
- market: dense local vignette surrounded by breathing room;
- healer: medium-low with green/herbal cluster;
- elder: lower clutter, stronger landmark;
- transition to wilderness: built density falls while natural density rises.

A density gradient helps the player feel movement between zones.

## 7. Negative-space budgets

Reserve open area deliberately.

Common protected spaces:

- critical movement lane;
- NPC interaction radius;
- expected dodge/combat area;
- landmark silhouette buffer;
- UI-heavy lower-right area on portrait mobile;
- visual reveal corridor.

Do not spend these spaces on filler merely because they look empty in a static screenshot.

## 8. Spacing grammar

Avoid uniform spacing.

Use relationships such as:

- **clustered** — items share one function/activity;
- **paired** — two objects frame a threshold;
- **edge-bound** — fence/lantern/stone follows road or property edge;
- **satellite** — small details orbit one focal object;
- **isolated** — landmark gains emphasis through empty surroundings;
- **rhythmic irregular** — repeated edge props with unequal intervals.

The chosen spacing pattern should explain the object's purpose.

## 9. Repetition budget

Every recognizably unique asset has a repetition budget inside a short traversal segment.

Ask:

- How many times can this silhouette appear before the player notices duplication?
- Can it be flipped without breaking perspective or lighting?
- Can scale vary without becoming physically implausible?
- Does a zone-specific use reduce the feeling of repetition?
- Is a second variant cheaper than continually disguising the first?

Do not randomize blindly. Controlled repetition is more believable than noisy randomness.

## 10. Perspective and flip rules

For 3/4 painterly assets, horizontal flipping may or may not be safe. Rotation is often unsafe because perspective, roof pitch, shadow direction and visible faces are baked into the sprite.

For each asset family, record:

- flip allowed? yes/no;
- rotation allowed? usually no unless authored;
- scale range;
- grounding method;
- depth/origin convention;
- foreground-overlap risk.

This belongs in the asset kit plan.

## 11. Scale validation procedure

Before approving a new structural asset:

1. place it next to player;
2. place it next to one accepted house or structural reference;
3. view at actual phone camera scale;
4. test near HUD-covered area;
5. compare two or three plausible sizes, not one;
6. choose the size based on world role rather than source pixels;
7. record the accepted runtime display size.

If scale changes but source art does not, treat it as layout/runtime tuning, not a new art asset.

## 12. Density validation procedure

Capture representative screenshots across the route and inspect:

- repeated silhouettes;
- clusters versus isolated stamps;
- route clarity;
- focal competition;
- dead-looking voids versus intentional breathing room;
- abrupt density jumps without a zone reason;
- UI collisions;
- player readability.

Compare adjacent screenshots, not only one beautiful composition.

## 13. Project rule derived from current evidence

Current accepted Merchant V2 world-scale values are already recorded in `DECISION_LOG.md` and `HANDOFF_CURRENT.md`. Those values are examples of accepted runtime metrics, not universal multipliers for every future asset.

Future scale grammar should be measured from accepted runtime references and then documented in the map design file or Xianxia ARPG Playbook.

## 14. Source basis

See `SOURCE_REFERENCES.md`, especially Epic's emphasis on establishing standard measurements during blockout and the Level Design Book's use of player-relative metrics.