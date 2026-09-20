# Environment / Level Design Source References

## 1. Purpose and evidence policy

This file records external references used to build the environment-design knowledge base. The goal is not to copy another game's maps or engine workflow. The goal is to extract transferable principles and then adapt them to this project's constraints.

Use source quality in this order where possible:

1. official engine/developer documentation;
2. GDC talks by experienced practitioners;
3. structured educational references with clear authorship;
4. secondary breakdowns only when they add a concrete useful perspective.

A source principle is not automatically a locked project rule.

## 2. Epic Games — Project Setup and Level Blockout

URL:
https://dev.epicgames.com/documentation/unreal-engine/designer-01-project-setup-and-level-blockout-in-unreal-engine

Key ideas extracted:

- block out before polished art;
- prioritize layout and playability;
- test scale, sight lines, occlusion, contrast and guiding lines;
- establish standard measurements early;
- iterate cheaply before expensive art;
- test early and often in the actual playable space.

Project adaptation:

- use simple 2D masses, route masks, zone overlays and placeholder landmarks instead of 3D gray boxes;
- establish player-relative metrics before producing more environment variants;
- require phone runtime testing for scale/readability.

## 3. Epic Games — Complete the Level / modular workflow

URL:
https://dev.epicgames.com/documentation/unreal-engine/designer-10-complete-the-level-in-unreal-engine

Key ideas extracted:

- level design changes through playtesting;
- modular work and organized assets preserve flexibility;
- design should accommodate technical limits and iteration.

Project adaptation:

- keep painterly ground/path separate from modular props/houses/NPCs;
- preserve reversible proofs and avoid flattening the village into one huge image.

## 4. Epic Games — Designing and Building Worlds / modular content

URL:
https://dev.epicgames.com/documentation/unreal-engine/designing-and-building-worlds-in-unreal-engine-for-maya-users

Key ideas extracted:

- modular construction is appropriate for repeatable architecture/props;
- consistent grid/scale thinking matters;
- repeated pieces should be designed for recombination.

Project adaptation:

- maintain asset families with role, scale range, perspective/flip rules and zone permissions;
- avoid a single prop formula repeated around every house.

## 5. GDC — Level Design Fundamentals & Techniques

URL:
https://www.gdcvault.com/play/1022456/Level-Design-Fundamentals

Speakers: Joel Burgess, Lee Perry.

Key ideas extracted from the session overview and talk framing:

- layout;
- pacing;
- difficulty balancing;
- narrative techniques;
- lessons should be adapted to different games/teams rather than copied literally.

Project adaptation:

- environment design documents should cover player flow and pacing, not just art placement;
- zone layout should be evaluated as part of the gameplay experience.

## 6. GDC — Level Design in a Day: Wayfinding & Storytelling Techniques

URL:
https://gdcvault.com/play/1022118/Level-Design-in-a-Day

Speaker: Brendon Chung.

Key ideas extracted:

- architecture can convey information;
- spatial navigation can be designed rather than explained;
- environmental detail can support narrative;
- common wayfinding pitfalls should be recognized early.

Project adaptation:

- functional zones should be recognizable without NPC labels;
- road/ground treatment, framing and local landmarks should guide a portrait-camera player.

## 7. GDC — What Happened Here? Environmental Storytelling

URL:
https://www.gdcvault.com/play/1012696/What-Happened-Here-Environmental

Speakers: Harvey Smith, Matthias Worch.

Key ideas extracted:

- environments can carry narrative information;
- players can infer implied events/history from space;
- props, texturing, lighting, composition and systems can work together;
- stronger environmental storytelling invites interpretation instead of dumping exposition.

Project adaptation:

- props should evidence activities, habits and history;
- xianxia cues should be causal and selective rather than generic decoration.

## 8. GDC — Invisible Intuition: Blockmesh and Lighting Tips to Guide Players

URL:
https://gdcvault.com/play/1025529/Level-Design-Workshop-Invisible-Intuition

Key ideas extracted:

- level flow can be guided with blockmesh/environment art/FX/audio/scripting;
- early blockmesh should produce valid playtest feedback;
- layout changes should be verified before polish.

Project adaptation:

- in 2D, route edges, ground contrast, prop framing and local reveal can perform similar guidance roles;
- do not rely on HUD arrows/text if composition can communicate the route.

## 9. Game Developer — GDC 2018 Level Design Workshop roundtable

URL:
https://www.gamedeveloper.com/design/gdc-2018-level-design-workshop-an-expert-roundtable-q-a

Useful ideas extracted:

- affordances should visually communicate possible actions;
- landmarks help orientation;
- environment around a destination can guide the eye toward it;
- visual language helps distinguish building/zone function;
- a top-down 2D example notes that distant 3D-style landmarks are less available, so pathway flooring/other cues become more important.

Project adaptation:

- Thanh Vân Thôn should use local/relay landmarks plus route treatment;
- each NPC zone should have a functional visual language.

## 10. The Level Design Book — Blockout

URL:
https://book.leveldesignbook.com/process/blockout

Key ideas extracted:

- blockout is a cheap rough draft;
- prototype foundational shapes before final art;
- metrics can use the player as a scale reference;
- playtesting scale is essential;
- modular kits can support blockout when used deliberately.

Project adaptation:

- maintain player-relative world metrics and validate them on device;
- treat scale errors as spatial problems before assuming asset-design failure.

## 11. Unity — 2D game creation workflow

URL:
https://docs.unity3d.com/6000.1/Documentation/Manual/2d-game-creation-wokflow.html

Key ideas extracted:

- 2D world building can combine Tilemaps, sprites and SpriteShape-like organic path tools;
- reusable tile/brush systems can construct levels;
- organic paths do not require one giant background image.

Project adaptation:

- this supports the project's modular-hybrid environment concept;
- Phaser implementation can use its own sprite/graphics/data structures while preserving the same design separation.

## 12. Unity — 2D Tilemap Extras / rule-based variation

Representative URL:
https://docs.unity3d.com/kr/current/Manual/com.unity.2d.tilemap.extras.html

Key ideas extracted:

- reusable brushes and rule tiles can encode placement behavior;
- random/line/group brush concepts can accelerate construction.

Project adaptation:

- future editor/helper tools may encode authored grammar such as edge placement or controlled variants;
- this is not permission for uncontrolled procedural scatter.

## 13. How to use references responsibly

When adding a new source:

1. record the URL and author/organization;
2. summarize only the principle relevant to this project;
3. state the project adaptation separately;
4. do not copy protected maps, layouts, art or text;
5. if the source is engine-specific, separate universal design lessons from implementation details;
6. verify the idea through this game's runtime and Phone QC before promoting it to a locked project rule.

## 14. Current research gaps

Possible future research, only when needed by a concrete task:

- top-down ARPG encounter-space design;
- 2D occlusion/depth conventions;
- rural settlement morphology and believable village growth patterns;
- mobile HUD/world composition studies;
- authored biome-transition techniques;
- low-cost environment animation for 2D painterly scenes;
- performance budgets for Phaser sprite-heavy environments.

Do not research these merely to expand documentation. Research should answer a project decision.