# Digest Rules v0.3

## Main philosophy

This is a discovery engine, not a popularity feed.

Primary goal:

- discover hidden embedded-audio DSP, firmware, hardware, and UI ideas with strong adaptation value;
- prefer evidence-rich, buildable, non-obvious projects over famous or merely well-presented ones;
- preserve enough state that each run starts better informed than the previous one.

## Mandatory read order

Before candidate ranking, inspect:

1. `README.md`
2. `AGENTS.md`
3. this rule file
4. `rules/hidden-gems-discovery-protocol.md`
5. `rules/common-anti-repeat-policy.md`
6. `rules/feedback-tuning-loop.md`
7. `data/prompt-evolution-state.yaml`
8. `data/hidden-gems-source-registry.csv`
9. `data/published-repo-log.csv`
10. `data/selected-projects.csv`
11. `data/common-anti-repeat-index.csv`
12. recent daily digests and relevant Codex weekly history

When the active daily focus is standalone open hardware, also apply:

- `rules/standalone-open-hardware-daily.md`

If repository state and the mutable state disagree, repository publication trackers/digests win for publication truth; explicit current user feedback wins for preferences.

## Lane definitions

| Lane | Meaning |
|---|---|
| `STRONG_PASS` | Ready-to-flash/build or nearly immediate engineering value with strong evidence |
| `PASS` | Buildable/adaptable project with credible source and implementation path |
| `REF_PASS` | Algorithm/reference/UI/architecture value worth adapting |
| `HOLD` | Interesting but blocked, repeated, unclear, source-thin, or low-confidence |
| `FOUNDATION_UPDATE` | Manufacturer/core infrastructure update only |

## Hidden-gems discovery gate

Execute `rules/hidden-gems-discovery-protocol.md` with the `daily_broad` profile before ranking.

Start every run by:

- revalidating due dynamic resources;
- discovering low-SEO blogs, forums, project hubs, self-hosted pages, alternative repository hosts, and manufacturer/reference pages;
- updating the source registry when writes are authorized;
- satisfying the search-profile coverage and stopping rule before final selection.

Do not stop at the first publishable 3–5 candidates.

## Source priority

Prefer:

1. independent/community projects and personal engineering sites;
2. non-GitHub repositories and self-hosted project pages;
3. specialist forum discoveries verified against primary artifacts;
4. Daisy/PJRC/community builds with real source and hardware evidence;
5. DSP/UI/reference architectures with direct adaptation value;
6. manufacturer/core libraries only for meaningful `FOUNDATION_UPDATE` items.

GitHub is a source lane, not the default universe.

## Anti-repeat logic

Apply `rules/common-anti-repeat-policy.md` before publishing.

- Do not repeat the same repo/resource for 30 days.
- Check hard published evidence across both streams.
- Check soft selected/reference evidence without treating it as an automatic publication block.
- Treat renamed repos, mirrors, forks, and obvious same-project resource URLs as potential duplicates.

Override the 30-day block only for a material update such as:

- new release or firmware asset;
- new board/hardware target;
- new DSP/synthesis feature;
- major architecture change;
- source/license clarification that changes reuse value;
- substantial build, calibration, measurement, or documentation improvement.

Stars, README polish, topic changes, or generic activity are not meaningful updates.

## Selected projects reference

`data/selected-projects.csv` is a curated reference layer, not the publication tracker.

It may contain:

- ranked digest projects;
- manually selected inspirations;
- related infrastructure;
- similarity anchors;
- watch items.

Only canonical publication trackers and ranked committed digests count as hard publication evidence.

## Quality rules

- Never force category symmetry.
- Prefer 2+ lanes only when quality naturally supports them.
- 3–5 ranked items are preferred, not mandatory.
- A shorter digest is better than filler.
- Avoid generic beginner projects and stale/no-context repositories.
- Avoid obvious/famous classics when the task is discovery-oriented unless a material new implementation angle exists.
- Inspect repository files, hardware artifacts, licenses, manifests/build files, releases, and primary docs before making implementation claims.
- Separate documented fact, engineering inference, and unresolved assumption.
- Do not use generated diagrams, photos, or README prose as proof of hardware maturity.

Prefer projects with:

- unusual architecture;
- strong DSP or mixed-signal value;
- reusable UI/control ideas;
- modular routing or reusable submodule boundaries;
- complete hardware/build evidence;
- performance-oriented workflows;
- independent or low-SEO provenance.

## Novelty scoring

| Score | Meaning |
|---:|---|
| 3 | likely obscure/new to the user or hidden outside common feeds |
| 2 | ecosystem-known but unusual or independently valuable |
| 1 | common/foundation knowledge |

A famous complete project should not automatically outrank a less-famous project with comparable engineering quality.

## Ranking dimensions

Base model:

`utility × novelty × adaptability`

Supporting factors:

- build credibility;
- flashability;
- hardware completeness;
- control-surface/UI value;
- source quality;
- architectural uniqueness;
- community/build evidence;
- update significance;
- user/project relevance.

When the standalone open-hardware profile is active, use the additional gates and weighting in `rules/standalone-open-hardware-daily.md`.

## Candidate evidence checklist

For serious candidates verify as applicable:

- source availability and actual repository/file depth;
- build instructions and dependency/toolchain state;
- prebuilt artifacts when available;
- schematic, editable PCB, BOM, fabrication files, panel/enclosure;
- audio I/O, codec/DAC/ADC and analog front end;
- power, grounding, protection and calibration notes;
- UI/control architecture and preset model;
- firmware source, boot/update path and real-time architecture;
- measurements, test notes and build reports;
- explicit license status;
- current activity/release state;
- representative project image when useful.

If a critical artifact is missing, HOLD rather than inventing completeness.

## Daily output contract

Start with:

### Executive summary

State the strongest findings, important exclusions, and whether the quality bar forced a shorter digest.

### Previous questionnaire feedback applied

If prior explicit answers exist in `data/prompt-evolution-state.yaml`, list the exact ranking/search/evidence changes applied. If none exist, say `none recorded`.

### Pre-flight / discovery audit

Include:

- profile used;
- rules/state inspected;
- anti-repeat sources inspected;
- domains/source classes searched;
- query families;
- candidate-pool size;
- source-registry revalidations/additions;
- blocked/dead/moved sources;
- stop-rule evidence;
- next-run search debt.

### Ranked entries

For each ranked item include:

1. Project/resource and lane.
2. Technical summary.
3. Why it matters.
4. Implementation highlights.
5. Hardware/electronics notes when present.
6. Platform relevance.
7. Adaptation ideas.
8. Quick engineering assessment.
9. Caveats and verification gaps.
10. Primary sources.

Use the standalone profile's additional fields when active.

### Bonus findings

Use for technically strong items outside the active ranked scope, such as Eurorack hardware during a strict standalone run.

### HOLD / watchlist

State the exact blocker and the smallest verification action that could promote the item.

### Rejected / not promoted

Include important discarded, duplicate, too-obvious, source-thin, or license-blocked candidates. Grouping by reason is encouraged.

### Analysed resources

List serious sources/search surfaces inspected, including sources that produced no ranked item.

### Tracker updates

Generate tracker rows only for actual ranked entries. Until a repository write succeeds, label them `proposed tracker rows`, not `published` state.

Optional selected-project rows may be generated for exceptional anchors/watch items, but they remain soft evidence.

### Prompt improvement for next run

Apply `rules/feedback-tuning-loop.md`.

### Feedback / Tuning Questionnaire

Attach the 6–8 question interactive questionnaire defined by `rules/feedback-tuning-loop.md`.

## Persistence rules

When writes are authorized:

- save the canonical digest Markdown;
- update canonical publication trackers only for actual ranked/published entries;
- update `data/prompt-evolution-state.yaml` for explicit feedback, recheck queues, and search debt;
- update the hidden-gems registry for discovery-source changes;
- regenerate the common anti-repeat index when canonical published/selected state changes.

Never claim persistence, publication, commit, merge, or verification unless it actually completed.