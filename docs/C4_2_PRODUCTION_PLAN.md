# C4.2 Production Plan

Version: 1.0
Status: Execution source of truth
Owner: ARPG project
Last updated: 2026-09-18

## 1. Goal

Turn the accepted C4 art direction into a real, reusable, mobile-safe production pipeline and integrate it into the live game without duplicating work.

C4.2 is complete only when the game uses real production assets, minimum viable animation works in runtime, the test build is deployed to GitHub Pages, and phone QC passes.

The target is not "make many images". The target is:

`accepted art direction -> isolated production assets -> normalized runtime assets -> animation -> integration -> phone QC -> expand`.

## 2. Source-of-truth hierarchy

When documents disagree, use this order:

1. `docs/C4_2_PRODUCTION_PLAN.md` — execution order, asset registry, current status.
2. `docs/ART_PRODUCTION_QC.md` — QC rules and PASS/REVISE/REJECT logic.
3. `docs/ART_BIBLE.md` — visual language, palette, silhouette and readability rules.
4. `docs/PLAN.md` — overall project milestones.

No chat-only decision should remain the only record for a production-critical choice.

## 3. Locked decisions

### Visual direction
- 2D xianxia.
- Broad visual family similar to cultivation RPGs such as Tale of Immortal, while keeping all characters, assets, world and UI original.
- Moderate anime influence.
- Ancient/cultivation mood with restrained ink-wash influence.
- Overall palette: dark, antique, earth + ink + jade.
- Player vibe: cool, elegant sword cultivator.
- Environment: painterly but less dense than concept boards so gameplay remains readable.
- VFX: pale white-jade, restrained; strongest brightness reserved for impact moments.
- Detail level: balanced. Attractive, but not so ornate that phone-scale readability suffers.

### Asset sourcing
- Hybrid, original-first.
- Hero assets are created specifically for this game.
- External/library assets may be considered only for low-salience decorative support and only after license/style review.
- Library assets are never the source of truth for player, enemy, NPC, sword or core VFX identity.

### Animation
- Hybrid pipeline.
- Four facing directions.
- Player minimum set: idle, run, dodge, skill.
- Enemy minimum set: idle, move, attack tell; charger also needs a clear charge state.
- NPC minimum: subtle idle.
- Flying sword minimum: launch, trail, impact.
- Animation exists to improve both life and gameplay readability, not just decoration.

### Gameplay constraints preserved through art integration
- Portrait mobile-first camera remains unchanged.
- Right thumb remains exactly two combat buttons: `NÉ` and `SKILL`.
- Basic attack remains exactly one visible flying sword per cycle.
- Existing hitboxes and combat timing remain unchanged during the first art integration test.
- Known C3 gameplay debt is not tuned until art readability is stable:
  - enemies rarely connect hits against a moving player;
  - enemy distribution feels too regular/clustered.

## 4. Anti-duplication rules

These rules are mandatory.

1. Every production asset has one stable Asset ID.
2. Never regenerate an Asset ID that has reached `DESIGN_PASS` unless there is an explicit `REVISE` decision.
3. Concept boards and compilation sheets are reference only. They do not count as runtime assets.
4. A generated image counts as production only after it is isolated, technically usable, saved to the repo asset path, and recorded in the registry.
5. A PASS is written into this file before moving to the next dependent stage.
6. Never create a second "PASS board" to document approval. Text status in the repo is sufficient.
7. Before any new generation, check this registry first.
8. If an asset already exists but is technically unusable, mark it `TECH_REWORK`, do not silently regenerate it as a new design.
9. Batch work is allowed only for assets whose art direction is already locked.
10. Expansion to female/ranged/charger/NPC/full biomes must not begin integration until the core test pipeline proves that export + animation + Phaser integration works.

## 5. Asset status vocabulary

Each Asset ID must use exactly one of these states:

- `NOT_STARTED` — no useful work exists.
- `REFERENCE_ONLY` — concept/board exists, not usable in runtime.
- `DESIGN_PASS` — visual design accepted, production export not yet verified.
- `ISOLATED_READY` — transparent/isolated production file exists and is normalized.
- `ANIM_READY` — minimum animation implementation exists and passes local runtime QC.
- `INTEGRATED` — used by the actual game build.
- `PHONE_PASS` — accepted in live mobile QC.
- `REVISE` — active visual revision required.
- `TECH_REWORK` — design is accepted but export/technical preparation is unusable.

No asset can jump from `REFERENCE_ONLY` directly to `INTEGRATED`.

## 6. Current registry

### Core player
| Asset ID | Asset | Current state | Notes |
|---|---|---|---|
| `PLY-M-BASE` | Male sword cultivator | `DESIGN_PASS` | User explicitly passed the male design. Existing generated sheet is reference, not final isolated runtime file. |
| `PLY-F-BASE` | Female sword cultivator | `REFERENCE_ONLY` | Direction exists in compilation sheet; needs isolated production generation and QC. |
| `PLY-M-SKILL` | Male dedicated skill pose/frame | `REFERENCE_ONLY` | Needed only if runtime cutout/tween is insufficient. |
| `PLY-F-SKILL` | Female dedicated skill pose/frame | `NOT_STARTED` | Deferred until female base passes. |

### Enemies
| Asset ID | Asset | Current state | Notes |
|---|---|---|---|
| `EN-MELEE-BASE` | Corrupted beast melee | `DESIGN_PASS` | User accepted continuation after melee direction. Final isolated runtime file still required. |
| `EN-RANGED-BASE` | Ranged spirit/caster | `REFERENCE_ONLY` | Compilation reference only. |
| `EN-CHARGER-BASE` | Heavy charger beast | `REFERENCE_ONLY` | Compilation reference only. Wind-up readability is critical. |

### NPCs
| Asset ID | Asset | Current state | Notes |
|---|---|---|---|
| `NPC-ELDER` | Mặc Trưởng Lão | `REFERENCE_ONLY` | Must communicate elder/mentor role immediately. |
| `NPC-HEALER` | Thanh Dược Sư | `REFERENCE_ONLY` | Must communicate healer/herbalist role immediately. |
| `NPC-MERCHANT` | Lục Chưởng Quầy | `REFERENCE_ONLY` | Merchant identity, not blacksmith identity. Existing generic board reference is not authoritative. |

### Sword and combat VFX
| Asset ID | Asset | Current state | Notes |
|---|---|---|---|
| `FX-SWORD` | Flying sword blade | `REFERENCE_ONLY` | Long readable blade, no glowing missile blob. |
| `FX-SWORD-LAUNCH` | Launch cue | `REFERENCE_ONLY` | Pale white-jade. |
| `FX-SWORD-TRAIL-R1` | Realm 1 trail | `REFERENCE_ONLY` | Thin and restrained. |
| `FX-SWORD-TRAIL-R2` | Realm 2 trail | `REFERENCE_ONLY` | Slightly brighter/thicker than R1. |
| `FX-SWORD-IMPACT` | Impact | `REFERENCE_ONLY` | Brief brightness spike allowed. |
| `FX-SKILL-CLEAVE` | Trảm Kích slash | `REFERENCE_ONLY` | Must not obscure enemy telegraphs. |
| `FX-DODGE` | Dodge afterimage | `REFERENCE_ONLY` | Low-opacity, short-lived. |
| `FX-BREAKTHROUGH` | Breakthrough aura | `REFERENCE_ONLY` | Amber/jade spiritual treatment. |

### Environment
| Asset ID | Asset | Current state | Notes |
|---|---|---|---|
| `ENV-SETTLEMENT-GROUND` | Thanh Vân Thôn ground kit | `REFERENCE_ONLY` | Warm antique earth/paper, low clutter. |
| `ENV-PLAINS-GROUND` | Hoang Nguyên ground kit | `REFERENCE_ONLY` | Dry olive-earth. |
| `ENV-FOREST-GROUND` | Linh Lâm ground kit | `REFERENCE_ONLY` | Desaturated moss/jade. |
| `ENV-DANGER-GROUND` | U Minh Cốc ground kit | `REFERENCE_ONLY` | Cool gray-violet, not lava biome. |
| `ENV-PROPS-VILLAGE` | Village props | `REFERENCE_ONLY` | Houses, fence, lantern, cart, barrel, well, sign. |
| `ENV-PROPS-NATURE` | Natural props | `REFERENCE_ONLY` | Trees, bushes, rocks, flowers; controlled density. |
| `ENV-BOSS-GATE` | Phong Ấn Cổ Môn | `NOT_STARTED` | C4.3 / boss route, not needed for core pipeline proof. |

### UI
| Asset ID | Asset | Current state | Notes |
|---|---|---|---|
| `UI-SKILL` | Skill icon | `REFERENCE_ONLY` | C4.3 polish, not blocking production pipeline proof. |
| `UI-DODGE` | Dodge icon | `REFERENCE_ONLY` | C4.3 polish. |
| `UI-HUD-FINAL` | Final HUD treatment | `NOT_STARTED` | Not blocking C4.2 runtime test. |

## 7. Production file layout

Use these paths when files become production-ready:

```text
public/assets/c4/
  actors/
    player/
      male/
      female/
    enemies/
      melee/
      ranged/
      charger/
    npcs/
  vfx/
    sword/
    skill/
    dodge/
    breakthrough/
  environment/
    settlement/
    plains/
    forest/
    danger/
    props/
  ui/
```

Runtime metadata should live under:

```text
src/game/art/
  assetManifest.ts
  animationConfig.ts
  artScaleConfig.ts
```

Do not scatter art paths directly through `GameScene.ts`.

## 8. Naming convention

Examples:

```text
ply_m_idle_s.png
ply_m_idle_n.png
ply_m_idle_e.png
ply_m_idle_w.png
en_melee_base_s.png
fx_sword_r1.png
fx_sword_impact_01.png
env_settlement_ground_01.png
npc_elder_s.png
```

Rules:
- lowercase snake_case;
- direction suffixes: `n`, `s`, `e`, `w`;
- action before direction when relevant;
- no spaces;
- no version number in runtime filename; Git history is the version history.

## 9. Technical normalization rules

For every isolated runtime asset:

- transparent PNG unless a tile deliberately fills the full image;
- no baked checkerboard/background;
- no text, labels or presentation borders;
- no shadow that assumes a fixed background unless shadow is part of the actor design;
- same visual scale across directional variants;
- consistent foot/pivot location across actor variants;
- extra transparent padding is minimized but sufficient for hair/robe motion;
- source resolution can be higher, but in-game target sizes must be tested at real phone zoom;
- compression/texture size reviewed before wide rollout;
- hitboxes remain code-defined and independent of painted silhouette.

## 10. Animation implementation strategy

C4.2 uses a pragmatic hybrid approach so the project does not stall on full frame-by-frame production.

### Player
Base requirement per direction:
- one accepted base pose;
- idle: subtle runtime breathing/cloth/hair motion where possible;
- run: runtime body lean/bob plus directional pose; dedicated run frame only if needed for readability;
- dodge: short directional displacement + afterimage; dedicated pose optional;
- skill: dedicated action pose/VFX if base tween is not visually sufficient.

### Enemies
- melee: base + locomotion + exaggerated attack tell;
- ranged: base + cast tell + projectile cue;
- charger: base + strong wind-up pose + charge state;
- death can remain lightweight in C4.2 if fade/collapse is readable.

### NPCs
- subtle idle only.

### Important
Do not generate eight cosmetic frames merely because a concept board showed eight frames. Generate only frames that the runtime implementation actually needs.

## 11. Execution phases

### Phase 0 — Inventory lock and gap audit
Goal: eliminate duplicate generation.

Tasks:
- freeze this registry;
- classify all existing generated material as `REFERENCE_ONLY` or `DESIGN_PASS`;
- confirm no binary art currently in the repo can already satisfy a production Asset ID;
- create asset manifest skeleton and runtime folder structure only when first real binary asset is ready.

Exit criteria:
- every planned asset has one Asset ID and one current state;
- there is one unambiguous next missing deliverable.

### Phase 1 — Core pipeline proof
This is the highest-priority phase.

Order:
1. `PLY-M-BASE`: produce isolated, transparent, runtime-usable male player art from accepted design.
2. `EN-MELEE-BASE`: produce isolated melee art from accepted design.
3. `FX-SWORD`, `FX-SWORD-LAUNCH`, `FX-SWORD-TRAIL-R1`, `FX-SWORD-IMPACT`.
4. `ENV-SETTLEMENT-GROUND` + a minimal subset of `ENV-PROPS-VILLAGE`.
5. Normalize scale/pivot.
6. Implement minimum player/melee/sword animation behavior.
7. Integrate only this small test pack into current GameScene.
8. Deploy Pages.
9. Phone QC.

This phase must PASS before mass production.

Phone QC gate:
- male player looks substantially better than C4.1 procedural art;
- melee enemy reads instantly as melee pressure;
- flying sword remains visibly a sword at full speed;
- attack tell is readable;
- environment does not swallow actor silhouettes;
- animation feels alive enough, not puppet-like;
- frame rate and memory feel acceptable on phone;
- current hitboxes/timing still behave as before.

If FAIL: fix only the failing layer and rerun Phase 1 phone QC.

### Phase 2 — Remaining actors
Starts only after Phase 1 phone PASS.

Order:
1. `PLY-F-BASE`.
2. `EN-RANGED-BASE`.
3. `EN-CHARGER-BASE`.
4. `NPC-ELDER`.
5. `NPC-HEALER`.
6. `NPC-MERCHANT`.

QC is batched by role, but failures revise only that Asset ID.

Exit criteria:
- all actor bases `ISOLATED_READY`;
- required player/enemy animation states `ANIM_READY`.

### Phase 3 — Full combat VFX
Tasks:
- Realm 2 sword trail;
- Trảm Kích;
- dodge afterimage;
- breakthrough/trial aura;
- any ranged/charger telegraph art required by gameplay.

Exit criteria:
- combat VFX readable at full encounter density;
- no effect hides attack timing.

### Phase 4 — Biome environment rollout
Order:
1. settlement;
2. plains;
3. forest;
4. danger zone.

Each biome uses:
- ground treatment;
- limited prop family;
- landmark treatment;
- controlled empty combat space.

Do not fill the map with decorative clutter just because assets exist.

Exit criteria:
- all four zones visually distinct;
- continuous travel route remains readable;
- actor contrast holds across all zones.

### Phase 5 — Full C4.2 integration
Tasks:
- central asset manifest;
- actor visual replacement;
- enemy visual replacement;
- NPC art replacement;
- environment replacement;
- VFX replacement;
- mobile texture/performance check;
- remove obsolete C4.1 procedural visuals only after replacements are proven.

Exit criteria:
- all C4.2 required assets are `INTEGRATED`;
- build/typecheck green;
- Pages deployed.

### Phase 6 — Phone acceptance
User tests the live build.

Questions:
- does the game finally look like a real product instead of a prototype?
- are male/female readable and attractive at normal zoom?
- are melee/ranged/charger recognizable before attack?
- is charger wind-up obvious?
- is the flying sword readable in motion?
- are backgrounds attractive but sufficiently quiet?
- do animation and VFX improve feel without obscuring combat?
- is mobile performance acceptable?

PASS -> Phase 7 / gameplay tuning.
REVISE -> isolate failing visual layer and repeat phone QC.

### Phase 7 — Resume gameplay work
Only after C4.2 phone PASS:
- tune enemy hit reliability/challenge;
- make enemy distribution more organic;
- implement boss/C5 loop;
- save/resume;
- final performance pass.

## 12. Definition of Done per Asset ID

An actor Asset ID is done for C4.2 only when:
- visual design accepted;
- isolated transparent file exists;
- correct scale/pivot recorded;
- required direction/action variants exist;
- no board text/background baked into asset;
- animation state works in runtime;
- integrated build uses it;
- phone QC accepts it or the containing batch.

A VFX Asset ID is done only when:
- it is isolated;
- visibility is proven at gameplay speed;
- it does not obscure telegraphs;
- it is integrated and phone-tested.

An environment Asset ID is done only when:
- it tiles/composes without obvious seams where applicable;
- walkable/combat space remains readable;
- actor contrast is maintained;
- it is used in the actual world, not only in a mockup.

## 13. QC cadence

Do not ask the user to approve every tiny technical action.

User-facing QC checkpoints:
1. Phase 1 live phone test.
2. Remaining actor batch if a meaningful art-choice issue appears.
3. Full C4.2 live phone acceptance.

Internal QC can happen continuously without interrupting the user.

## 14. Current accepted evidence

- Male player visual direction: accepted by user.
- Melee enemy visual direction: accepted to continue.
- Female/ranged/charger/NPC/environment compilation images: reference only, not production files.
- Earlier boards that claimed PASS internally are not authoritative user approvals unless the user explicitly passed/continued that asset.

## 15. Immediate next action

Run Phase 0 gap audit against the actual repository.

Do not generate another image until the audit confirms the exact next Asset ID whose production file is missing.

Expected likely next deliverable after audit: `PLY-M-BASE` isolated transparent runtime asset, because its design is accepted but no verified production binary is currently stored in the repository.
