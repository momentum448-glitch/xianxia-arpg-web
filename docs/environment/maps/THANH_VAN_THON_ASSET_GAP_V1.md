# Thanh Vân Thôn — Asset Gap Analysis V1

Status: CONTEXT-QC SYNTHESIS
Date: 2026-09-20
Parent design: `docs/environment/maps/THANH_VAN_THON_ENVIRONMENT_DESIGN_V1.md`
Context proof baseline: `7a7f412`
QC zoom tool baseline: `992071e`

## Summary

Zoomed Phone QC confirms V2-A still reads as three distinct service pockets inside a compact village: Elder west/quiet, Merchant east/dense, Healer west/green, with residential scale implied at the edges. The main remaining visual uncertainty is the ground/path layer and the primitive-only terrain/activity gaps.

## Existing accepted kit audit

| Existing asset | Decision |
|---|---|
| House Hall / Thatch / Tile variants | reuse; no regeneration |
| Village tree / fence / rock-grass / lantern | reuse with omission and spacing variation |
| Merchant Kit B | preserve PHONE-PASS composition and scale |
| Path A / B | re-author onto V2-A before declaring a new road asset gap |
| Ground patch / forecourt | reuse in V2-A context proof |

## Gap priorities

### P0 — V2-A path / ground re-authoring

This is an integration gap, not a new-art request. The current context proof still shows a schematic route. Reuse accepted Path A/B + ground patch + forecourt on the locked V2-A spine and branches.

Phone gate: the critical route reads naturally at 1.0x and the negative-space rhythm still reads at 0.65x.

### P1 — Healer water edge / irrigation pond

Replace the current primitive ellipse with one modest painterly irrigation pond / water-edge solution. Keep it off the main spine. No large river.

### P1 — Small healer footbridge

Replace the current rectangle with a worn plank or simple stone footbridge. It is local infrastructure, not a hero landmark.

### P1/P2 — Herb cultivation / drying evidence

Prefer one reusable herb-bed strip plus one healer-specific drying/storage cue instead of many tiny props.

### P2 — Rural field / garden strip

Low-contrast edge ground for the south/side larger-village illusion. It must stay visually quieter than service zones.

### P2 — Domestic utility trace

One compact woodpile / jars / baskets type cluster to break the repeated house-tree-fence language.

### P3 conditional — Elder authority cue

The Hall + quiet forecourt already reads strongly. Only add a weathered stone, bench, or village marker if later QC shows one more cue is necessary.

### Deferred — Extra house variants

Current accepted houses already create partial edge compounds. No new house variant is justified yet.

## Proof order

1. Proof A: accepted path + ground on V2-A. No new PNG.
2. Proof B: healer water + bridge minimal terrain pair.
3. Proof C: healer herb activity.
4. Field/garden edge strip.
5. One domestic utility cluster.
6. Elder cue only if still needed.

## Explicit non-gaps

Do not regenerate or expand Merchant Kit B, accepted houses, tree, fence, lantern, rock-grass, V2-A footprint, zone alternation, or the QC zoom tool because of the current screenshots.

## Exact next action

Build Proof A by restoring the accepted painterly path/ground kit onto the locked V2-A route. Keep production asset bytes unchanged. Deploy for Phone QC before creating water, bridge, herb, field, or domestic assets.
