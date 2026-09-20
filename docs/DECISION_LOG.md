# Xianxia ARPG — Durable Decision Log

Purpose: preserve decisions that future chats must not accidentally rediscover or reverse.

Rules:

- Append new durable decisions; do not erase history.
- If a decision changes, add a new entry and explicitly mark what it supersedes.
- Chat discussion is not enough for a production-critical decision. Record it here or in the relevant source document.
- When this file conflicts with an older document, the newer decision entry wins unless live code/Git history proves otherwise.

| Date | Decision | Supersedes / Notes |
|---|---|---|
| 2026-09-17 | Use a fresh repository named `xianxia-arpg-web` as the active project. | Do not continue the older repo/project path. |
| 2026-09-17 | Mobile browser first, portrait 9:16. | Phone QC is authoritative for UX/readability. |
| 2026-09-17 | Real-time top-down combat in one continuous authored open-map-lite region. | MVP is authored rather than large/procedural. |
| 2026-09-17 | Right-thumb HUD initially reduced to one Skill + Dodge while basic attack was automatic. | Historical only; superseded by manual ATK decision below. |
| 2026-09-17 | Basic attack became a visible flying sword with travel time, light homing, contact damage, and no piercing. | Core projectile identity remains current. |
| 2026-09-18 | Remove auto basic attack and add a dedicated manual `ATK` button. | Supersedes auto attack and the two-button-only combat HUD. |
| 2026-09-18 | Right-thumb combat cluster is `ATK + SKILL + NÉ`; ATK is the largest central button. | Do not restore extra Skill II/III buttons for the MVP. |
| 2026-09-18 | Base basic-attack range is 205 plus a future build/profile bonus. | Range is a buildable stat. |
| 2026-09-18 | Base basic-attack cooldown is 800 ms and resolves through `basicAttackSpeedPct`. | Supersedes the earlier 620 ms value. |
| 2026-09-18 | Pressing ATK with no valid target still launches a straight flying sword capped by current range. | Keeps attack responsive and supports aiming/build feel. |
| 2026-09-18 | Character select shows male/female previews, selected highlight, identity copy, and explicit start confirmation. | Male production art is ahead of female art. |
| 2026-09-18 | C4 art direction: original 2D xianxia, restrained ink-wash influence, moderate anime influence, muted earth/ink/jade palette. | Original-first; reference games guide broad structure only. |
| 2026-09-18 | Production art must pass a real pipeline: isolate → normalize → integrate/animate → phone QC. | Concept boards are reference only, not runtime assets. |
| 2026-09-18 | Art integration must preserve gameplay hitboxes and combat timing unless gameplay change is explicitly requested. | Keeps C3 gameplay evidence comparable. |
| 2026-09-18 | C3 combat-pressure and enemy-distribution tuning is deferred until actor/environment readability stabilizes. | Known debt, not forgotten scope. |
| 2026-09-18 | Settlement runtime composition/density passed. Preserve the approved layout while replacing/fixing visual assets. | Do not redesign village layout during technical asset repair. |
| 2026-09-18 | Flying-sword VFX should be restrained white-jade, with impact the brightest moment. | Blade silhouette must remain readable. |
| 2026-09-19 | Settlement house black-render bug should be solved with a one-house true-RGBA proof before converting all four assets. | Minimal proof first; avoid broad binary churn. Historical repair strategy now completed. |
| 2026-09-19 | For cross-chat work, GitHub-backed handoff docs become mandatory. | New chats read `AGENTS.md` and `HANDOFF_CURRENT.md` before acting. |
| 2026-09-19 | When a problem is materially unclear, use a structured discovery-and-decision round before committing to a full solution. Limit each round to the 5–7 highest-impact questions/decisions, explicitly separate user decisions from safe assumptions and evidence that must be verified, and summarize facts/decisions/assumptions/open issues/next action after each round. | Does not reopen locked decisions or justify questions whose answers can be verified directly. See `docs/DISCOVERY_DECISION_PROTOCOL.md`. |
| 2026-09-19 | Thanh Vân Thôn environment uses a modular-hybrid composition: shared painterly ground/path/decal layers provide visual continuity while houses, trees, props and NPCs remain modular runtime objects. | Avoid both a single flattened background and isolated “sticker” assets with no ground integration. |
| 2026-09-19 | Settlement roads should be authored as organic curved routes with variable width, small branches/courtyards and irregular edges rather than a ruler-straight central lane. | Explicitly allows deliberate environment-composition refinement after the earlier “preserve layout during technical repair” rule; gameplay/collision remain unchanged unless separately requested. |
| 2026-09-19 | Final house scale is deferred until the environment ground/path/blending proof is judged on phone. The current +12% top-pair scale is a working proof, not a locked final value. | Historical intermediate state; later phone-QC settlement composition takes precedence. |
| 2026-09-20 | General village props should create varied environmental rhythm, not a repeated `house + tree + fence + rock + lamp` formula. Props may vary by density, scale, flip and functional zone while keeping the route readable. | Replaces the earlier uniform-looking expansion attempt; current production prop kit itself remains accepted. |
| 2026-09-20 | Lục Chưởng Quầy's merchant area is a distinct functional vignette built from the accepted Merchant Kit B (stall, cart, goods, sign). | The area should read as trading space even before NPC production art. |
| 2026-09-20 | Merchant props must use settlement world scale rather than the smaller initial proof scale. Current accepted display widths are stall 270, cart 180, goods 135, sign 60. | Supersedes the earlier smaller proof widths 188 / 118 / 92 / 48. Phone accepted on build `56b9359`. |
| 2026-09-20 | Remove the lower tile-roof house at `x=1210, settlement top+1090` in the active settlement proof composition to reduce visual clutter; preserve its ground wash. | Composition-only change; no gameplay-space/hitbox intent. |
| 2026-09-20 | Current merchant/settlement snapshot on build `56b9359` is accepted; do not continue polishing it without a concrete problem. | Phone QC PASS. |
| 2026-09-20 | Pause implementation after the merchant PASS and run another structured discovery round before choosing the next production proof. | Do not assume NPC production is automatically next simply because placeholders remain. |
| 2026-09-20 | Establish `docs/environment/` as the reusable Environment & Level Design Knowledge Base for future map/environment work. | General principles are separated from project adaptations and locked rules; source provenance lives in `SOURCE_REFERENCES.md`. |
| 2026-09-20 | Substantial new environment/map work should proceed from purpose/topology/zones/scale/blockout/composition before broad production-asset generation. | Use the new environment templates and proof-first Phone-QC workflow; do not return to ad-hoc prop-by-prop map construction. |

## Current locked values at a glance

- Screen: portrait 9:16.
- World: authored continuous route, 1600 × 9000.
- Combat buttons: `ATK + SKILL + NÉ`.
- Basic attack: one flying sword per press.
- Base range: 205 + build bonus.
- Base cooldown: 800 ms through attack-speed stat.
- No-target ATK: straight sword, range-capped.
- Equipped skill: Trảm Kích / Cleave.
- First breakthrough: 50 Linh Khí + 3 Tinh Hoa + 3 Kiếp Ảnh.
- MVP realms: Luyện Khí → Trúc Cơ.
- Settlement art: modular-hybrid painterly environment with organic paths.
- Merchant world-scale widths: 270 / 180 / 135 / 60 for stall / cart / goods / sign.
- Environment design: use `docs/environment/` knowledge base + map/zone/asset-kit templates before substantial new environment production.
- Phone QC beats desktop intuition for UX/art readability.
- Next action at this snapshot: structured discovery before further implementation.