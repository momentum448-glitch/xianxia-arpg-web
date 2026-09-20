# Current Project Handoff

Snapshot: 2026-09-20
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 settlement production-art / environment design system

## Verified code / documentation state at snapshot

- Phone-QC/runtime baseline: `56b9359e8c6aeea972ae994b314537aabb2bb7bb` (`BUILD 56b9359`), from PR #63 `Scale merchant area to world size and clear lower house`.
- PR #63 CI: PASS.
- GitHub Pages build/deploy for that runtime baseline: PASS.
- Android Phone QC: PASS for the current merchant-area scale/layout shown in build `56b9359`.
- PR #64 refreshed continuity docs only; later documentation commits can advance `main` without changing the accepted runtime/art baseline.
- Relevant merged runtime branch: `fix/merchant-world-scale-house-clear`.
- Live URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/`.

Always query live `main`, open PRs and relevant branches before acting. Do not treat the accepted runtime build SHA as a permanent current-main pointer.

## Current user instruction / work mode

The user explicitly paused further scene/NPC production to improve the project's environment-design method first.

A reusable Environment & Level Design Knowledge Base has now been authored under `docs/environment/`. The next substantial environment task must use this design system instead of returning to ad-hoc prop-by-prop construction.

Do **not** automatically begin NPC production, enemy expansion, or another broad settlement art pass. The user wants structured exploration/design of the environment/map first.

Do not use Remote Desktop Commander. Continue with GitHub + Drive connectors and Phone QC.

## New environment / level design knowledge base

Start with:

```text
docs/environment/README.md
docs/environment/XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md
```

Supporting guides:

```text
docs/environment/ENVIRONMENT_DESIGN_FOUNDATIONS.md
docs/environment/LEVEL_BLOCKOUT_AND_PLAYER_FLOW.md
docs/environment/WAYFINDING_AND_COMPOSITION.md
docs/environment/SCALE_DENSITY_AND_SPATIAL_GRAMMAR.md
docs/environment/MODULAR_ENVIRONMENT_AND_ASSET_KITS.md
docs/environment/ENVIRONMENTAL_STORYTELLING.md
docs/environment/MOBILE_PORTRAIT_LEVEL_DESIGN.md
docs/environment/ENVIRONMENT_QC_PLAYBOOK.md
docs/environment/SOURCE_REFERENCES.md
```

Reusable templates:

```text
docs/environment/templates/ENVIRONMENT_DESIGN_TEMPLATE.md
docs/environment/templates/ZONE_COMPOSITION_TEMPLATE.md
docs/environment/templates/ASSET_KIT_PLANNING_TEMPLATE.md
```

The design-system workflow is:

`purpose → topology → zones → critical path → landmarks → scale metrics → blockout → phone flow test → composition → asset kit → one production proof → runtime/Phone QC → expansion`

External references are treated as general design principles, not locked game rules. Project-specific decisions still require `DECISION_LOG`, code/runtime evidence or Phone QC.

## Product/gameplay state that must not regress

- Browser-first, mobile-first portrait 9:16.
- World: authored continuous open-map-lite, 1600 × 9000.
- Right-thumb combat cluster: `ATK + SKILL + NÉ`.
- Basic attack is manual, one visible flying sword per press.
- Base attack range: 205 + build/profile bonus.
- Base attack cooldown: 800 ms through `basicAttackSpeedPct`.
- No-target ATK launches a straight range-capped sword.
- Active skill: Trảm Kích / Cleave.
- Dodge has cooldown + i-frames.
- No Skill II/III for MVP.
- Luyện Khí → Trúc Cơ progression remains current.
- Breakthrough requirement: 50 Linh Khí + 3 Tinh Hoa + defeat 3 Kiếp Ảnh.
- Settlement safety, NPC interaction, continuous world, and third-Kiếp-Ảnh projectile cleanup fix must not regress.

## Current art direction / production rules

- Original xianxia, restrained ink-wash influence, moderate anime influence.
- Muted earth / ink / jade palette.
- Broad readable silhouettes; phone readability first.
- Production pipeline: accepted design → isolated production asset → normalized runtime asset → integration → Phone QC → expand.
- Do not regenerate `DESIGN_PASS` assets merely because a later chat cannot see them.
- Art changes must not alter gameplay hitboxes/timing unless explicitly requested.
- Phone QC is final authority for scale, readability, VFX and runtime composition.

## Environment design rules now added

- Function before decoration.
- Design topology/flow/scale before broad asset production.
- Judge composition in actual portrait viewports, not only full-map overview.
- Protect negative space for movement, interaction, UI and focal hierarchy.
- Treat source resolution separately from world display scale.
- Use controlled modular reuse instead of visible stamping.
- Props should communicate activities and zone function, not fill quotas.
- New large map/zone work should begin from `ENVIRONMENT_DESIGN_TEMPLATE.md`.
- High-value zones should use `ZONE_COMPOSITION_TEMPLATE.md`.
- New prop families should use `ASSET_KIT_PLANNING_TEMPLATE.md` only after a real map/zone gap is identified.

## C4.2 settlement state

### Houses

The accepted four-house set is functioning in runtime. Earlier black/corrupt-binary issues were repaired through exact-source recovery rather than redesign.

Important continuity facts:

- Hall clean source was installed and phone-validated.
- Thatch B was recovered from the accepted four-house source sheet, normalized, installed, and phone-validated.
- Current settlement screenshots show production houses rendering correctly.
- House placement/scale has been refined in context with ground/path/props.
- Do not reopen the old black-house blocker without current runtime evidence of regression.

### Ground/path

- Settlement uses painterly ground/path segments rather than a ruler-straight lane.
- Roads are organic, irregular, curved, with branch/courtyard behavior.
- Ground/path is a modular-hybrid composition, not one flattened background.
- Current route remains readable on phone.

### Base production props

Production props integrated and phone-accepted as a visual kit:

- tree;
- wooden fence;
- rock/grass patch;
- lantern post.

These are intentionally varied and must not become a mechanical `house + tree + fence + rock + lamp` formula.

### Merchant area / Lục Chưởng Quầy

Merchant identity proof is PHONE PASS on build `56b9359`.

Canonical V2 runtime files:

```text
public/assets/c4/environment/settlement/env_merchant_stall_b.png
public/assets/c4/environment/settlement/env_merchant_cart_b.png
public/assets/c4/environment/settlement/env_merchant_goods_b.png
public/assets/c4/environment/settlement/env_merchant_sign_b.png
```

Accepted world display widths:

- stall: 270;
- cart: 180;
- goods: 135;
- sign: 60.

Phone QC result:

- no halo/black-background blocker;
- stall/cart/goods no longer read as mini props;
- merchant zone reads clearly as trading space;
- path/player readability preserved;
- user explicitly accepted the result.

Locked simplification:

- lower tile-roof house at `x=1210, settlement top+1090` was removed in the active proof composition to reduce clutter;
- existing grounding wash remains;
- this was a composition choice, not a gameplay-space change.

## Important runtime architecture note

`src/main.ts` currently registers:

```text
CharacterSelectScene
SettlementPropsProofScene
```

`SettlementPropsProofScene` extends `GameScene` and layers accepted settlement production-prop/merchant proof work over normal gameplay.

Before broad future environment production, VERIFY whether accepted proof work should be promoted into the normal runtime scene or whether the proof layer remains intentionally useful. A temporary proof architecture must not become permanent by accident.

## Asset continuity

See `docs/ASSET_REGISTRY.md` and `docs/PROJECT_SOURCES.md`.

Merchant V2 Drive backups in `20_RUNTIME_READY/10_QC_PASS`:

- `env_merchant_stall_b.png` → `1zIpOgs_JTTUJXeaTdDDn2SgO4dZuJdL4`
- `env_merchant_cart_b.png` → `1xftok68r_D_f_sl1Sjmcx8InHQ9zWB0T`
- `env_merchant_goods_b.png` → `1okipyi9GsU2BWGlS4XZapuzqPBEFUOqX`
- `env_merchant_sign_b.png` → `1_ta2f0wNJD6hH2eJgqtIlqJiBYumJco4`

Older accepted/recovered settlement sources remain registered in Drive/GitHub.

## Failed / obsolete paths not to repeat blindly

- Do not regenerate accepted house or merchant assets merely to change runtime scale.
- Do not treat generated concept/composition images as runtime assets.
- Do not repeat chunked/base64 staging for PNG transport when a direct verified Drive→GitHub path exists.
- Do not use salvage output from corrupt PNGs as production art.
- Do not use workflow-only validation as proof that runtime uses intended bytes.
- Do not reintroduce uniform `house + tree + fence + rock + lamp` repetition.
- Do not return to broad prop generation before map/zone purpose and composition are designed.
- Do not use Remote Desktop Commander.

## Current quality assessment

The settlement has moved from placeholder/procedural composition to a coherent painterly production direction. The largest remaining strategic problem is no longer “how do we add another prop?” but “what should the finished starting village be as a complete designed environment?”

The new knowledge base exists specifically to answer that at map level before more expensive art work.

## Discovery topics for Thanh Vân Thôn environment v1

When the user chooses to resume village design, prioritize at most 5–7 high-impact decisions. Current likely ASK topics include:

- settlement fantasy/social character: poor ordinary village, prosperous cultivation-adjacent village, or another identity;
- whether the village is a recurring home hub or mainly an opening settlement;
- desired exploration complexity versus very clear navigation;
- perceived village population/scale versus the playable footprint;
- how strongly natural terrain such as stream, pond, field, hill, bridge or cliff should shape the layout.

VERIFY rather than ask:

- current runtime/player/house scale metrics;
- actual viewport world coverage under phone camera/UI;
- current house/NPC coordinates and settlement bounds;
- route/interaction clearances;
- existing proof-scene architecture and promotion path.

## Exact next action

When the user is ready to resume map design:

1. Copy `docs/environment/templates/ENVIRONMENT_DESIGN_TEMPLATE.md` into a Thanh Vân Thôn-specific design document.
2. Run one structured discovery round for the 5–7 highest-impact product/aesthetic choices.
3. VERIFY runtime metrics from code and accepted build evidence.
4. Produce a macro schematic: topology, zones, landmarks, route, open spaces and transitions before new production art.
5. Do not generate a broad asset kit until the macro design identifies real gaps.

## Current PASS gate

The current settlement/merchant runtime snapshot itself is accepted. Do not modify build `56b9359` merely to polish more.

The environment-design knowledge base v1 is considered useful when it can answer:

- where map design begins;
- how zones/routes are structured;
- how scale and density are judged;
- how modular repetition is controlled;
- how environment communicates function/history;
- how the design moves from blockout to runtime and Phone QC.

## Resume sentence

Resume from accepted runtime/art baseline build `56b9359`: settlement ground/houses/base props and the world-scaled Lục Chưởng Quầy merchant vignette are phone-accepted; use the new `docs/environment/` knowledge base and structured discovery to design the complete Thanh Vân Thôn environment before further broad art production.