# Asset Kit Planning Template

> Use only after the map/zone need is understood. Do not use this template to generate a random catalogue of props.

## 1. Context

- Parent map:
- Zone(s) served:
- Related design doc:
- Current runtime baseline:
- Existing accepted kit:

## 2. Problem to solve

What composition, repetition, storytelling or structural need cannot be solved cleanly with the current kit?

`[Describe the exact gap.]`

## 3. Existing assets audit

| Asset ID / runtime file | Role | Current QC | Can solve part of need? | Limitation |
|---|---|---|---|---|
| | | | | |

## 4. Proposed kit

Classify each requested asset.

| Proposed Asset ID | Role | Functional reason | Zone permission | Priority |
|---|---|---|---|---|
| | hero / structural / functional / filler / ground | | | |

## 5. Variant justification

For each proposed variant, state why cheaper variation methods are insufficient.

| Asset / variant | Why omission/spacing/scale/flip cannot solve it | New silhouette/perspective needed? |
|---|---|---|
| | | |

## 6. Visual requirements

For the kit as a whole:

- perspective:
- palette/value range:
- painterly detail level:
- edge softness:
- contact/grounding convention:
- alpha/background requirement:
- lighting/shadow convention:
- xianxia specificity:
- prohibited visual traits:

## 7. Runtime scale plan

Do not infer from source pixels.

| Asset | Runtime role | Reference | Candidate display range | Final after Phone QC |
|---|---|---|---|---|
| | | player / house / existing prop | | |

## 8. Orientation rules

| Asset | Horizontal flip allowed? | Rotation allowed? | Perspective notes |
|---|---:|---:|---|
| | | | |

## 9. Repetition budget

| Asset | Expected local frequency | Repetition risk | Variation method |
|---|---|---|---|
| | | | |

## 10. Technical requirements

For each production asset:

- file format: PNG unless another format is deliberately chosen;
- full decode required;
- RGBA required when transparency is expected;
- no black/white matte;
- crop close enough for predictable placement;
- source resolution sufficient for intended runtime scale;
- no baked UI/text unless the text is intentionally part of the world asset;
- canonical lowercase snake_case runtime filename;
- source/backup stored durably when project-critical;
- Asset Registry entry if identity matters across chats.

## 11. Proof order

Which single asset or smallest cluster proves the kit?

1. proof asset/cluster:
2. runtime location:
3. exact validation question:
4. Phone QC screenshot needed:

Do not produce the full family before this proof passes unless the assets must be generated as one inseparable source sheet and can still be isolated individually.

## 12. Production statuses

Track separately:

| Asset | Design | Technical | Integrated | Phone |
|---|---|---|---|---|
| | NOT_STARTED / DESIGN_PASS / REVISE | ISOLATED_READY / TECH_REWORK | INTEGRATED | PHONE_PASS / REVISE |

## 13. Source continuity

For each important asset:

- Asset ID:
- canonical runtime path:
- original/reference source:
- Project Source name if promoted:
- Drive backup ID if used:
- dimensions:
- byte size:
- SHA-256 if important:
- derived-from / supersedes:

## 14. Integration constraints

- hitboxes/timing that must not change:
- route/interaction clearance to preserve:
- depth/origin convention:
- preload/manifest location:
- build/cache-busting notes:
- proof scene vs normal runtime scene:

## 15. QC plan

### Isolated asset QC

- [ ] design matches zone need
- [ ] silhouette readable
- [ ] perspective consistent
- [ ] alpha clean
- [ ] resolution adequate

### Runtime QC

- [ ] correct asset loaded
- [ ] correct display scale
- [ ] grounding clean
- [ ] no halo/matte
- [ ] no gameplay regression

### Zone QC

- [ ] kit solves original design gap
- [ ] no new repetition formula appears
- [ ] visual hierarchy preserved
- [ ] phone sequence passes

## 16. Rejection / archive notes

Record rejected variants and why only when the information will prevent future repetition of a failed path.

## 17. Expansion decision

After the proof:

- PASS / REVISE / REJECT / TECH_REWORK:
- Parameters now locked:
- Parameters still flexible:
- Next smallest action: