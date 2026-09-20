# Current Project Handoff

Snapshot: 2026-09-20
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 settlement production-art / environment identity

## Live code state at snapshot

- `main`: `56b9359e8c6aeea972ae994b314537aabb2bb7bb` (`BUILD 56b9359`)
- Latest merged work: PR #63, `Scale merchant area to world size and clear lower house`
- PR #63 CI: PASS
- GitHub Pages build/deploy: PASS
- Phone QC on Android: PASS for the current merchant-area scale/layout shown in build `56b9359`
- Relevant merged branch: `fix/merchant-world-scale-house-clear`
- Current live URL: `https://momentum448-glitch.github.io/xianxia-arpg-web/`

Always verify live GitHub before the next implementation step because this snapshot can age.

## Current user instruction / work mode

Implementation is intentionally paused. The user asked to save the current state first, then run a structured discovery round on several open design points before continuing production.

Do **not** begin NPC production art, enemy expansion, or broad settlement redesign until the discovery round is complete enough to identify the next smallest proof.

Do not use Remote Desktop Commander. Continue with GitHub + Drive connectors and Phone QC.

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

## C4.2 settlement state

### Houses

The accepted four-house set is now functioning in runtime. Earlier black/corrupt-binary issues were repaired through exact-source recovery rather than redesign.

Important continuity facts:

- Hall clean source was installed and phone-validated.
- Thatch B was recovered from the accepted four-house source sheet, normalized, installed, and phone-validated.
- Current settlement screenshots show all production houses rendering correctly.
- House placement/scale has since been refined in context with ground/path/props.
- Do not reopen the old “black house blocker” unless current runtime evidence shows a regression.

### Ground/path

- Settlement now uses painterly ground/path segments rather than a ruler-straight lane.
- Roads are organic, irregular, curved, with branch/courtyard behavior.
- Ground/path is a modular-hybrid composition, not one flattened background.
- Current route remains readable on phone.

### Base production props

Production props currently integrated and phone-accepted as a visual kit:

- tree
- wooden fence
- rock/grass patch
- lantern post

These are intentionally varied in placement/scale/flip and should not be repeated as a mechanical house-by-house formula.

### Merchant area / Lục Chưởng Quầy

Merchant identity proof is now PHONE PASS on build `56b9359`.

Canonical V2 runtime files:

```text
public/assets/c4/environment/settlement/env_merchant_stall_b.png
public/assets/c4/environment/settlement/env_merchant_cart_b.png
public/assets/c4/environment/settlement/env_merchant_goods_b.png
public/assets/c4/environment/settlement/env_merchant_sign_b.png
```

Current world-scale display widths in `SettlementPropsProofScene`:

- stall: 270
- cart: 180
- goods: 135
- sign: 60

Phone QC result:

- no halo/black-background blocker;
- stall/cart/goods no longer read as mini props;
- merchant zone reads clearly as a trading area;
- path/player readability preserved;
- user explicitly accepted the result.

One visual simplification was also locked for this proof:

- remove the lower tile-roof house at `x=1210, top+1090` in the active proof scene;
- keep the existing grounding wash so the cleared footprint blends with terrain;
- this is a composition choice, not a gameplay-space change.

## Important runtime architecture note

`src/main.ts` currently registers:

```text
CharacterSelectScene
SettlementPropsProofScene
```

`SettlementPropsProofScene` extends `GameScene` and currently layers the settlement production-prop/merchant proof work over normal gameplay. Future work must verify whether a new proof belongs here or whether the project should graduate the accepted work back into the normal `GameScene` path before wider production expansion.

This is a useful discovery topic; do not assume the proof-scene architecture should remain permanent.

## Asset continuity

See `docs/ASSET_REGISTRY.md` and `docs/PROJECT_SOURCES.md`.

Merchant V2 Drive backups in `20_RUNTIME_READY/10_QC_PASS`:

- `env_merchant_stall_b.png` → Drive ID `1zIpOgs_JTTUJXeaTdDDn2SgO4dZuJdL4`
- `env_merchant_cart_b.png` → Drive ID `1xftok68r_D_f_sl1Sjmcx8InHQ9zWB0T`
- `env_merchant_goods_b.png` → Drive ID `1okipyi9GsU2BWGlS4XZapuzqPBEFUOqX`
- `env_merchant_sign_b.png` → Drive ID `1_ta2f0wNJD6hH2eJgqtIlqJiBYumJco4`

Older accepted/recovered settlement sources remain in Drive and are recorded in the registry/source manifest.

## Failed / obsolete paths not to repeat blindly

- Do not regenerate accepted house or merchant assets just to change runtime scale.
- Do not treat generated concept/composition images as runtime assets.
- Do not repeat chunked/base64 staging for PNG transport when a direct verified Drive→GitHub path exists.
- Do not use salvage output from corrupt PNGs as production art.
- Do not use workflow-only validation as proof that the actual runtime is using the intended bytes.
- Do not reintroduce uniform “house + tree + fence + rock + lamp” repetition across every settlement screen.
- Do not use Remote Desktop Commander.

## Current quality assessment

The settlement has moved from placeholder/procedural composition to a coherent painterly production direction. The most obvious remaining placeholder-quality elements are the NPC visuals themselves, but NPC production is **not automatically the next task** because the user explicitly requested a discovery round before continuing.

## Discovery pause: open topics

The next chat/round should identify the highest-impact open design questions before implementation. Candidate areas include:

- whether the current settlement proof architecture should be promoted into the normal runtime scene now or remain a proof layer longer;
- how distinct each NPC functional zone should become before NPC character art is produced;
- NPC visual scale/style/animation scope versus static production sprites;
- what minimum settlement completion gate should be reached before moving to ranged/charger enemies or other biomes;
- whether additional environmental variation is needed or current density is already sufficient for MVP.

Use the ASK / ASSUME / VERIFY protocol and only ask the 5–7 highest-impact questions.

## Exact next action

1. Start a structured discovery round with the user, not implementation.
2. Separate ASK / ASSUME / VERIFY.
3. Verify any code/asset/runtime facts directly instead of asking the user.
4. When discovery is sufficiently clear, choose one small reversible proof.
5. Only then create a branch and resume production.

## Current PASS gate

The current settlement/merchant snapshot itself is accepted. Do not modify build `56b9359` merely to “polish more” unless the discovery round identifies a concrete problem or the user asks for a revision.

## Resume sentence

Resume from `main` build `56b9359`: settlement ground/houses/base props and the world-scaled Lục Chưởng Quầy merchant vignette are phone-accepted; implementation is paused by user request, so run structured discovery first and do not start NPC production until the next proof is deliberately chosen.
