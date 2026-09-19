# Xianxia ARPG — Durable Project Context

This document contains stable context that should survive across chats. Volatile work-in-progress state belongs in `HANDOFF_CURRENT.md`.

## Product goal

Build an original mobile-first portrait browser ARPG with a xianxia/cultivation theme, real-time top-down combat, a compact continuous authored region, meaningful cultivation/breakthrough progression, and strong phone readability.

Reference games may inform broad structure and pacing only. Do not copy their IP, assets, writing, maps, UI, characters, or protected visual identity.

Target MVP session: roughly 15–30 minutes.

Core loop:

`explore → fight → collect spirit/resources → interact/upgrade → breakthrough → enter dangerous zone → boss`

## Platform and technology

- Browser game.
- Mobile-first portrait 9:16.
- Phaser 3.90.
- TypeScript 5.9.
- Vite 7.1.
- GitHub Actions for validation.
- GitHub Pages for phone playtests.
- Public repository: `momentum448-glitch/xianxia-arpg-web`.

Phone evidence takes priority over desktop impressions for control ergonomics, readability, scale, VFX, travel pacing, and combat density.

## World structure

The MVP uses one continuous authored open-map-lite region rather than a large procedural world.

Current route:

1. Thanh Vân Thôn — settlement / safe zone.
2. Thanh Vân Hoang Nguyên — plains.
3. Linh Lâm — forest.
4. U Minh Cốc — danger zone.
5. Phong Ấn Cổ Môn — future boss gate.

Current world scale: 1600 × 9000.

## Locked combat controls

Left thumb:

- virtual joystick.

Right thumb:

- `ATK` — largest central combat button;
- `SKILL` — one equipped active skill slot;
- `NÉ` — dodge with i-frames.

Historical two-button Skill + Dodge / auto-attack designs are superseded.

### Manual flying-sword basic attack

- One visible sword per `ATK` press.
- Nearest valid enemy in range is preferred.
- Targeted sword uses light homing.
- Damage occurs on contact.
- No piercing.
- Pressing ATK with no valid target still launches a straight sword.
- Straight shots are capped by current basic-attack range.
- Base range: 205 plus future build/profile bonus.
- Base cooldown: 800 ms.
- Cooldown resolves through a buildable `basicAttackSpeedPct` stat.

Current equipped skill: Trảm Kích / Cleave.

## Character selection

- Male/female selection at start.
- Both previews shown.
- Selected-card highlight.
- Short identity copy.
- Explicit start confirmation.
- Male production art exists.
- Female final production art is deferred until the C4.2 core production pipeline proves stable.

## Cultivation

MVP realms:

- Luyện Khí.
- Trúc Cơ.

First breakthrough gate:

- 50 Linh Khí.
- 3 Tinh Hoa.
- defeat 3 Kiếp Ảnh.

Current Trúc Cơ power jump:

- max HP 8 → 10;
- flying-sword damage 1 → 2;
- Trảm Kích damage 2 → 3.

Breakthrough trials may start anywhere and temporarily override ordinary settlement safety.

## NPCs and events

Settlement NPCs:

- Mặc Trưởng Lão — breakthrough guidance.
- Thanh Dược Sư — full heal to realm max HP.
- Lục Chưởng Quầy — merchant shell; inventory/economy deferred.

World events:

- Linh Tuyền — restore up to 2 HP and grant 12 Linh Khí.
- Dược Thảo Ẩn — grant 1 Tinh Hoa.
- U Minh Bi — stronger three-enemy ambush.

NPC interaction is contextual/proximity-based and is not a permanent combat button.

## Art direction

Core promise: original 2D xianxia with restrained ink-wash influence and moderate anime influence, designed for instant portrait-phone readability.

Principles:

- silhouette first;
- muted earth / ink / jade palette;
- player is the cleanest silhouette;
- environment is painterly but deliberately less dense than concept art;
- VFX are pale white-jade and restrained;
- brightest VFX moment is usually impact;
- painted visuals must not silently redefine gameplay hitboxes.

Flying sword must remain visibly a sword, not a generic glowing missile.

Settlement composition/layout that passed phone review should be preserved unless the user explicitly requests a redesign.

## Architecture rules

- Gameplay collision bodies and art visuals remain separate.
- Art paths/config should be centralized under `src/game/art/` rather than scattered through scene logic.
- World tuning belongs in dedicated config modules when practical.
- Production images are not considered finished simply because they were generated.

Production art pipeline:

`accepted direction → isolated asset → technically normalized asset → runtime integration/animation → phone QC → expand`

## Milestone summary

- C0 vertical foundation: complete.
- C1 combat foundation: complete enough and evolved into current manual-ATK design.
- C2 cultivation skeleton: complete and phone-QC passed.
- C3 continuous world + NPC + encounter/event layer: structurally complete.
- C4.1 readable silhouette foundation: complete.
- C4.2 production art correction: active.
- C4.3 VFX/UI finish: later.
- C5 full MVP loop: later, including boss, save/resume, pacing, performance, and final tuning.

## Known deferred gameplay debt

Do not lose this feedback while doing art work:

- ordinary enemies rarely connect hits reliably against a moving player;
- encounter distribution feels too regular/clustered.

Later tuning should consider stronger pursuit/tracking, attack coverage, multi-enemy pressure, and more organic patrol/ambush/resource-guard placement.

This tuning is intentionally deferred until visual readability is stable enough to judge combat fairly.

## Important fixed regression to preserve

A C2 freeze after killing the third Kiếp Ảnh was fixed by making flying-sword cleanup safe when projectile state mutates during the same update loop. Do not regress that re-entrancy/idempotency protection.

## Deliberate MVP exclusions

Until the core loop proves itself, avoid expanding into:

- large procedural worlds;
- sect simulation;
- deep relationship systems;
- large crafting trees;
- online accounts;
- multiplayer;
- monetization;
- many realms;
- large content multiplication before core combat/exploration is fun and readable.
