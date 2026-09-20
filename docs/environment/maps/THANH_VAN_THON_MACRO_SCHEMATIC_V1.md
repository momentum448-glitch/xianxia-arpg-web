# Thanh Vân Thôn — Macro Schematic V1

Companion to `THANH_VAN_THON_ENVIRONMENT_DESIGN_V1.md`.

This is a **layout schematic**, not final art placement. Coordinates are settlement-local unless marked otherwise.

Settlement-local rectangle:

- width: `1600`
- height: `1800`
- world offset: `y + 7200`
- portrait viewport: `720 × 1280`

## 1. Macro map

```text
                               NORTH / PLAINS
                         world y 7200 / local y 0

    WEST EDGE                 MAIN SPINE                    EAST EDGE
 x 0───────────────x 500────────x 800────────x 1100──────────────x1600

 y 0      sparse field/brush      ↓ worn frontier road       sparse brush
          partial fence           ↓                           partial roof cue

 y 120                    [ Z0 FRONTIER THRESHOLD ]
                         timber marker / rough fence
                                 ↓

 y 300      [ Z1 ELDER COURT ]   ↓                     domestic edge mass
            old tree / stone     ↓
            quiet forecourt      ↓
            Mặc Trưởng Lão ●     ↓
                 (650,400)       ↓
                                 ↓
 y 620                           ╲
                                  ╲ main road bends east
                                   ╲
 y 780                              [ Z2 MERCHANT CROSSROADS ]
                                    Lục Chưởng Quầy ● (955,860)
                 player spawn ● (800,950)     stall / goods / cart
                                    accepted V2 cluster

 y 1080                         ╱
                               ╱ main road relaxes west
                              ╱
 y 1180        garden edge  ──┤
                              │ optional healer lane
                              │
 y 1310        [ Z3 HEALER GARDEN / WATER BRANCH ]
               Thanh Dược Sư ● (650,1310)
               herbs / modest pond-edge / irrigation ditch
                         ─── small footbridge ───

 y 1500      residential lane       ↓                 field/garden edge
             small compound         ↓                 partial roof/fence
                                    ↓
 y 1650        [ Z4 SOUTH RESIDENTIAL / FIELD FRINGE ]
               quiet domestic traces, crops, wood, jars later
               edge masses imply more households beyond play slice

 y 1800                   SOUTH WORLD BOUNDARY
                         world y 9000
```

## 2. Functional relationship diagram

```text
                      [ PLAINS / WILDERNESS ]
                              ↑
                     [ FRONTIER THRESHOLD ]
                              ↑
                       [ ELDER COURT ]
                              ↑
                       main worn spine
                              ↑
                  [ MERCHANT CROSSROADS ]
                     ↑ spawn / hub center
                     │
                     ├──────── optional side life / residential cues
                     │
                     ↓
                  main village continuation
                     │
                     ├── [ HEALER GARDEN ]
                     │       └── water + small bridge branch
                     │
                     ↓
               [ RESIDENTIAL / FIELDS ]
```

## 3. Existing anchors to preserve in first proof

| Anchor | Local position | V1 treatment |
|---|---:|---|
| Mặc Trưởng Lão | `(650, 400)` | Preserve NPC interaction anchor; redesign environment around it only |
| Lục Chưởng Quầy | `(955, 860)` | Preserve accepted merchant zone and scale |
| Thanh Dược Sư | `(650, 1310)` | Preserve interaction anchor; give distinct healer branch identity |
| Player spawn | `(800, 950)` | Preserve for first blockout proof |
| North transition | `y ≈ 0` | Keep critical route unmistakable |

## 4. Suggested V1 zone envelopes

These are composition envelopes, not collision boxes.

| Zone | Local y | Preferred x emphasis | Density |
|---|---|---|---|
| Z0 Frontier threshold | `0..260` | center | sparse |
| Z1 Elder court | `260..620` | west-center `x≈450..850` | low-medium |
| Z2 Merchant crossroads | `620..1120` | east-center `x≈850..1450` | high |
| Z3 Healer garden | `1120..1520` | west-center `x≈350..900` | medium |
| Z4 Residential/field fringe | `1450..1800` | both edges + quiet center | irregular low-medium |

The deliberate west/east alternation is important because the portrait camera sees much of the settlement vertically at once.

## 5. Main route sketch

Approximate visual centerline target for blockout only:

```text
local y     target center x
   0             800
 200             790
 400             760
 600             800
 800             900
 950             880
1100             810
1300             760
1500             790
1750             820
```

This is intentionally gentle. The road should not snake merely to look organic. Bends should correspond to functional frontage, ground use and terrain.

## 6. Water concept envelope

First proof should use a temporary shape rather than production art.

Recommended footprint:

- lower-west / healer zone only;
- irrigation ditch or narrow stream roughly `x≈350..760`, `y≈1320..1510`;
- one modest pond-like widening may sit near the healer garden;
- bridge spans only the healer branch;
- main north-south critical spine remains dry and unobstructed.

Avoid:

- a full-width river;
- multiple bridges;
- water crossing the merchant interaction pocket;
- water that makes the player guess which side contains the north exit.

## 7. Perceived-scale edge dressing

Use the world edges as implication zones:

### West edge

- partial small house/roof mass;
- field/garden strips;
- low fence and tree framing;
- domestic utility evidence later.

### East edge

- partial residential roof/fence mass north of merchant;
- merchant supply-side clutter should taper before becoming another focal zone;
- field/garden continuation toward south.

### South edge

- quiet crop/garden/fence termination;
- partial compounds beyond the immediate centerline;
- natural framing should hide the hard world limit.

Do not add additional named services merely to fill edge space.

## 8. Portrait viewport checks

### View A — spawn / merchant

Expected dominant read: merchant zone.

Secondary cues:

- road clearly continues north and south;
- healer should not visually compete even if vertically inside camera range;
- Elder should read as a quieter next anchor, not a second merchant-like cluster.

### View B — Elder

Expected dominant read: quiet authority + frontier direction.

Secondary cues:

- north exit is visually legible;
- merchant density falls away behind player;
- no grand gate silhouette that contradicts poor-village identity.

### View C — Healer

Expected dominant read: green working pocket + water/agriculture logic.

Secondary cues:

- optional branch is obvious;
- main village spine still recoverable instantly;
- bridge is local, not a route puzzle.

### View D — South fringe

Expected dominant read: ordinary households and fields continue beyond the authored hero zones.

Secondary cues:

- no new hero landmark;
- world edge should feel like a slice boundary, not the end of civilization.

## 9. Blockout implementation colors / temporary language

If using temporary runtime overlays, keep them intentionally diagnostic:

- Z0 threshold: neutral gray-brown low alpha;
- Z1 Elder: muted violet/stone low alpha;
- Z2 Merchant: warm ochre low alpha;
- Z3 Healer: muted jade low alpha;
- Z4 residential/fields: muted straw low alpha;
- water: desaturated blue-gray low alpha.

These are debug/blockout colors only and must not become production art direction.

## 10. Schematic PASS question

**Can the player move from spawn to the north exit without confusion while the village still reads as a humble place containing distinct Elder, Merchant and Healer pockets, a believable lower-village water/agriculture system, and enough edge evidence to imply more households than are directly authored?**

If yes, move to runtime blockout. If no, revise macro composition before creating any new art.
