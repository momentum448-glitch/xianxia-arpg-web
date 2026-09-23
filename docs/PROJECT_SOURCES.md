# Xianxia ARPG — Project Sources Manifest

This document records durable cross-chat source/reference locations. GitHub remains canonical for code and runtime production assets. Project Sources and Drive preserve visual/source continuity so future chats do not regenerate accepted art.

## 1. Source-of-truth hierarchy

- **GitHub** = runtime/code source of truth.
- **ChatGPT Project Sources** = curated visual/reference/source shelf shared across project chats.
- **Google Drive asset vault** = byte-preserving backup / transfer / recovery path.
- **ChatGPT Library / Images** = discovery pool only; never the sole home of important art.

Important runtime assets should always exist in GitHub. Important non-runtime source/reference assets should exist in Project Sources and/or the Drive vault and be registered in `docs/ASSET_REGISTRY.md`.

## 2. Minimum persistent document pack

Keep these available to future chats:

- `AGENTS.md`
- `docs/DISCOVERY_DECISION_PROTOCOL.md`
- `docs/HANDOFF_CURRENT.md`
- `docs/ASSET_REGISTRY.md`
- `docs/PROJECT_SOURCES.md`
- `docs/DECISION_LOG.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/HANDOFF_PROTOCOL.md`
- `docs/ART_BIBLE.md`
- `docs/ART_PRODUCTION_QC.md` while C4 work is active
- `docs/environment/README.md` and `docs/environment/XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md` while map/environment work is active

## 3. Environment / level design knowledge base

The durable environment-design guidance now lives in GitHub under `docs/environment/`.

Core documents:

```text
docs/environment/README.md
docs/environment/ENVIRONMENT_DESIGN_FOUNDATIONS.md
docs/environment/LEVEL_BLOCKOUT_AND_PLAYER_FLOW.md
docs/environment/WAYFINDING_AND_COMPOSITION.md
docs/environment/SCALE_DENSITY_AND_SPATIAL_GRAMMAR.md
docs/environment/MODULAR_ENVIRONMENT_AND_ASSET_KITS.md
docs/environment/ENVIRONMENTAL_STORYTELLING.md
docs/environment/MOBILE_PORTRAIT_LEVEL_DESIGN.md
docs/environment/ENVIRONMENT_QC_PLAYBOOK.md
docs/environment/XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md
docs/environment/SOURCE_REFERENCES.md
```

Templates:

```text
docs/environment/templates/ENVIRONMENT_DESIGN_TEMPLATE.md
docs/environment/templates/ZONE_COMPOSITION_TEMPLATE.md
docs/environment/templates/ASSET_KIT_PLANNING_TEMPLATE.md
```

GitHub is the canonical source for these documents. They do not need a Drive binary backup. If ChatGPT Project Sources supports convenient document promotion, the recommended minimum environment pack is:

- `README.md`
- `XIANXIA_ARPG_ENVIRONMENT_PLAYBOOK.md`
- `ENVIRONMENT_QC_PLAYBOOK.md`
- `SOURCE_REFERENCES.md`
- the three templates

Future environment chats should consult this knowledge base before generating broad map art or prop kits.

## 4. Promotion rule

Promote an asset into Project Sources and/or the Drive vault when any of these is true:

- user accepted its visual design;
- it is a style/identity anchor;
- it is needed to reconstruct a runtime asset;
- losing it would force regeneration or re-approval;
- it reached `DESIGN_PASS`, `ISOLATED_READY`, or `PHONE_PASS` and its source bytes matter.

Do not promote every draft/reject.

Recommended Project Sources naming:

```text
ARPG__DOC__HANDOFF_CURRENT.md
ARPG__DOC__PROJECT_CONTEXT.md
ARPG__DOC__ASSET_REGISTRY.md
ARPG__REF__style_master__v001.png
ARPG__REF__player_male_design_pass__v001.png
ARPG__REF__melee_enemy_design_pass__v001.png
ARPG__REF__settlement_house_set_design_pass__v001.png
ARPG__SRC__env_house_hall_a_clean__v001.png
```

`REF` = visual/reference anchor. `SRC` = clean source used for technical/runtime preparation. `DOC` = continuity document.

## 5. Drive asset vault

Verified ARPG vault:

```text
20_RUNTIME_READY
├── 00_INBOX
├── 10_QC_PASS
└── 90_ARCHIVE_REJECT
```

Folder IDs:

- `20_RUNTIME_READY`: `1pwArqr68G-3o9iXdffpDb8bMUyuR9-2f`
- `00_INBOX`: `1XM05mGrxcjcwCTJXEC-rkE-z4GK2v8wY`
- `10_QC_PASS`: `1AzY928GT097WptHw7kHy4uuqTozChY7W`
- `90_ARCHIVE_REJECT`: `1EEO5QVs2F6YkBC7p266X82S4HgzOnsXW`

## 6. Current important settlement source assets

### Accepted settlement house source sheet

- Registry Asset ID: `ENV-HOUSE-SET-A-SOURCE-SHEET`
- Drive filename: `ARPG__SRC__settlement_house_set_design_pass__v001.png`
- Drive ID: `1fVnIyNhJ6cLiW0OxVA5rjHDiYcwupmOS`
- Role: visual/source reference for the accepted four-house set and future recovery.
- Status: `DESIGN_PASS` reference.
- Note: historical Drive connector metadata exposed this chat-origin image with JPEG MIME despite `.png` naming. Do not use that MIME ambiguity as runtime evidence.

### Clean Hall recovery source

- Registry Asset ID: `ENV-HOUSE-HALL-A-CLEAN`
- Drive filename: `env_house_hall_a.png`
- Drive ID: `1MLnoQAUL1jfuW-mQFMTxXxDb58FBpkDr`
- Verified historical metadata: PNG RGBA, 128 × 89, 22,633 bytes.
- SHA-256: `f047b6d275dbce9c50c6f3a00ae236b9a489f7bd4e2182f0b42cf3f60e45304f`
- Status: source lineage is `PHONE_PASS`; runtime canonical bytes now live in GitHub.

### Recovered Thatch B source

- Registry Asset ID: `ENV-HOUSE-THATCH-B-RECOVERED`
- Drive filename: `env_house_thatch_b_recovered_v001.png`
- Drive ID: `1hx9JYkwEx3Mf9Ow8lCP0w_XidDxMaScX`
- Historical normalized metadata: PNG RGBA, 208 × 172, 69,820 bytes.
- Status: source lineage is `PHONE_PASS`; runtime canonical bytes live in GitHub.

## 7. Merchant V2 source backups

The world-scaled merchant area accepted on Android build `56b9359` uses the following V2 assets. Runtime canonical files live in GitHub under `public/assets/c4/environment/settlement/`; Drive holds byte-preserving backups in `10_QC_PASS`.

| Asset | Runtime filename | Drive ID | Status |
|---|---|---|---|
| Stall | `env_merchant_stall_b.png` | `1zIpOgs_JTTUJXeaTdDDn2SgO4dZuJdL4` | `PHONE_PASS` |
| Cart | `env_merchant_cart_b.png` | `1xftok68r_D_f_sl1Sjmcx8InHQ9zWB0T` | `PHONE_PASS` |
| Goods | `env_merchant_goods_b.png` | `1okipyi9GsU2BWGlS4XZapuzqPBEFUOqX` | `PHONE_PASS` |
| Sign | `env_merchant_sign_b.png` | `1_ta2f0wNJD6hH2eJgqtIlqJiBYumJco4` | `PHONE_PASS` |

Do not regenerate these assets to change scene scale. Current accepted scene display widths are stall 270, cart 180, goods 135, sign 60.

## 8. Runtime-only accepted prop kit

The following general settlement props are already canonical in GitHub and phone-accepted as a reusable kit:

```text
public/assets/c4/environment/settlement/env_tree_village_a.png
public/assets/c4/environment/settlement/env_fence_village_a.png
public/assets/c4/environment/settlement/env_rockgrass_village_a.png
public/assets/c4/environment/settlement/env_lanternpost_village_a.png
```

If exact original generation/source files later become important for reconstruction or further variants, promote those exact sources into Project Sources/Drive and add their IDs to `ASSET_REGISTRY.md`. Do not regenerate merely because the source is not currently needed.

## 9. Source manifest entry format

For each future critical visual/source asset, record:

```text
Asset ID:
Project Source name:
Role: REF | SRC | DOC
Design/QC status:
Canonical runtime path (if any):
Drive backup (if any):
Byte size / SHA-256 (if known):
Supersedes / derived from:
Next action:
```

## 10. Handoff synchronization

Before moving to a new chat or pausing major production:

1. Update `HANDOFF_CURRENT.md` from verified live repo state.
2. Update `DECISION_LOG.md` for durable decisions.
3. Update `ASSET_REGISTRY.md` for every important accepted/rejected/recovered asset.
4. Ensure critical non-runtime sources survive in Project Sources or verified Drive storage.
5. Verify GitHub `main`, branch, PR and latest commit.
6. Record failed paths so the next chat does not repeat them.
7. State the exact next action and pass gate.

Current snapshot note: merchant/settlement build `56b9359` is phone-accepted. The reusable environment-design knowledge base is now part of the project, and substantial next map/environment work should use its templates before broad asset production.

## Whole-map Thanh Vân Thôn north-star

- Registry Asset ID: `ENV-SETTLEMENT-WHOLEMAP-NORTHSTAR-V1`
- Role: approved visual/composition north-star for whole-map completion; not a runtime background.
- Drive path: `/Google Drive/ARPG Asset Pipeline/00_INBOX/TVT_WHOLE_MAP_NORTH_STAR_v001.png`
- Drive file ID: `1WzAg_jBz3J6xiNO3jbmh7fMON6wBueJR`
- Related canonical design doc: `docs/environment/THANH_VAN_THON_WHOLE_MAP_V1.md`
- Runtime proof derived from the direction: `ENV-SETTLEMENT-TERRAIN-UNDERLAY-V1`
- Preserve this reference across chats so Work does not regenerate the approved whole-map direction from memory.

