# Current Project Handoff

Snapshot: 2026-09-23 14:25 (+07)
Project: ARPG / Xianxia ARPG Web
Repository: `momentum448-glitch/xianxia-arpg-web`
Current milestone: C4.2 / Thanh Vân Thôn production integration and whole-map composition
Current reviewed runtime: `63d75ba82e9a78e86290437e96054b322c914dd2` (`BUILD 63d75ba`)
Current branch for continuity sync: `docs/topology-a1-phone-pass`

## Verified repo/runtime state

- PR #97 promoted accepted Thanh Vân Thôn V2-A layers from QC-only architecture into the production game flow.
- PR #98 added production QC zoom presets `1.0x → 0.8x → 0.65x → 0.5x`.
- PR #99 added `ẨN UI / HIỆN UI` QC controls while preserving persistent zoom controls.
- PR #100 Cohesion Pass A was a useful diagnostic but did not solve the whole-map structure; its additive prop layer is no longer active.
- User explicitly reopened whole-map topology while preserving internal hero-pocket composition.
- PR #101 applied Topology Revision A: compacted the active village mass, moved Elder/Merchant/Healer pockets as intact units, and moved NPC interaction nodes with their pockets without changing interaction radius.
- PR #102 applied Topology Tune A1: strengthened the three hero-pocket branches, added a subtle north-entry ground transition, and pulled the southern residential/agricultural fringe inward.
- CI PASS and GitHub Pages deploy PASS for `63d75ba`.
- Phone QC screenshots on Android at 0.65x with UI hidden show the compact settlement reads coherently across Elder, Merchant, Healer and the southern fringe.

## Locked whole-map result

### ENV-SETTLEMENT-LAYOUT — PHONE PASS

Accepted production implementation:

```text
src/game/settlementV2AProduction.ts
src/game/npcConfig.ts
src/scenes/ProductionGameScene.ts
```

Current accepted production lineage:

```text
BUILD 63d75ba
PR #101 Topology Revision A
PR #102 Topology Tune A1
```

Locked intent:

- V2-A remains the selected `1600 × 1800` settlement footprint.
- Elder / Merchant / Healer internal pocket composition remains preserved.
- Whole-map topology now uses a compact zig-zag rhythm around the main spine rather than three isolated POIs.
- Three hero-pocket branches must remain readable but subordinate to the main spine.
- North entry keeps a light threshold transition rather than a new POI.
- Southern residential + agriculture fringe is intentionally pulled inward so it reads as one village edge.
- Do not re-enable Cohesion Pass A's additive scatter layer merely to fill negative space.
- Do not reopen topology or hero-pocket placement without a new concrete Phone-QC problem.

## Locked environment assets

Preserve all previously accepted runtime assets:

- Ground/path P0 — `PHONE_PASS`
- Merchant Kit B — `PHONE_PASS`
- `ENV-HEALER-WATER-BRIDGE-A` — `PHONE_PASS`
- `ENV-HEALER-ACTIVITY-KIT-A` — `PHONE_PASS`
- `ENV-FIELD-EDGE-KIT-B` — `PHONE_PASS`
- `ENV-HOUSE-SET-A` — `PHONE_PASS`
- base village tree/fence/rock/lantern kit — `PHONE_PASS`

Field Edge A remains rejected/superseded.

## Production QC utilities

Production runtime currently includes:

- zoom presets: `1.0x / 0.8x / 0.65x / 0.5x`;
- `ẨN UI / HIỆN UI`;
- QC controls remain visible when gameplay UI/world labels are hidden.

These are QC utilities only; they do not change production gameplay intent.

## Runtime/gameplay constraints that must not regress

- Mobile browser portrait 9:16.
- Manual `ATK + SKILL + NÉ`.
- One flying sword per ATK press.
- Base attack range 205 + future bonus.
- Base cooldown 800 ms through `basicAttackSpeedPct`.
- Settlement safe zone and NPC interaction remain intact.
- Environment/art passes do not change gameplay hitboxes or timing unless explicitly requested.
- NPC interaction radius remains unchanged by the topology revision.

## Failed / superseded paths to avoid

- V2-B 1600 × 3200 settlement.
- Giant zone ellipses / mixed old-art macro proof.
- Repeating `house + tree + fence + rock + lamp` stamps.
- Cohesion Pass A scatter-prop strategy as a substitute for whole-map structure.
- Regenerating accepted hero-pocket art for layout problems.
- Restoring Field Edge A.
- Restoring temporary Field Edge canvas-cleanup workarounds.
- Reopening accepted topology without a new Phone-QC problem.

## Exact next action

The largest remaining visual prototype signal is the NPC placeholder layer.

Next action:

1. Run a short structured discovery round for **NPC identity production**.
2. Define a minimal proof for one NPC first, not all three.
3. Prefer an NPC whose visual identity gives the strongest settlement readability gain.
4. Preserve settlement topology, pocket art, interaction coordinates/radius and gameplay logic.
5. Isolate → integrate → deploy → Phone QC before expanding to the other NPCs.

## Pass gate for the next proof

- NPC reads clearly at 1.0x phone gameplay scale.
- Fits the established xianxia painterly/anime visual language.
- Role can be inferred visually without relying only on a text label.
- Does not alter interaction radius, gameplay state or accepted settlement composition.
- Proof is small and reversible.

## Resume sentence

Resume from `BUILD 63d75ba`: Thanh Vân Thôn V2-A whole-map topology, Topology Revision A + Tune A1, is accepted and should remain locked. Preserve all PHONE_PASS environment assets and QC utilities. Next run a short NPC-identity discovery round and prove one NPC before expanding.
