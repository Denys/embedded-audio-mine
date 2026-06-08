# Digest Rules v0.2

## Main philosophy

This is a discovery engine, not a popularity feed.

Primary goal:
- discover hidden embedded audio DSP/firmware/UI ideas with strong adaptation value.

## Lane definitions

| Lane | Meaning |
|---|---|
| STRONG_PASS | Ready-to-flash or nearly immediate use |
| PASS | Buildable/adaptable project |
| REF_PASS | Algorithm/reference/architecture value |
| HOLD | Temporarily excluded or uncertain |
| FOUNDATION_UPDATE | Manufacturer/core infrastructure update |

## Source priority

1. Independent/community projects
2. Daisy forum discoveries
3. PJRC/Teensy forum discoveries
4. DSP/UI/reference architectures
5. Manufacturer/core libraries only when meaningfully updated

## Anti-repeat logic

- Do not repeat the same repo/resource for 30 days.
- Apply the common anti-repeat policy in `rules/common-anti-repeat-policy.md` before publishing from either stream.
- Check hard published evidence across both streams, not only the current stream.
- Check soft selected/reference evidence across both streams, but do not treat it as an automatic publication block.
- Exception:
  - new release
  - new firmware asset
  - major architectural update
  - major DSP addition
  - new supported hardware
  - major documentation/build improvements

## Selected projects reference

`data/selected-projects.csv` is a curated reference layer, not the canonical digest publication tracker.

Goals:

1. Save especially interesting projects for faster future access and personal-project inspiration.
2. Preserve similarity anchors that define the kind of projects future searches should try to find.

Selected-project entries may include:

- projects from ranked digests
- manually added projects discovered around a digest
- related infrastructure and tooling
- watch items that are explicitly marked as unverified or not yet promoted

Selected-project entries do **not** automatically count as published digest items.

Only these count as published for anti-repeat exclusion:

1. `data/published-repo-log.csv`
2. committed digest markdown ranked entries
3. explicitly recorded failed-persistence fallback published entries
4. temporary chat-only published records when no committed file exists

Do not exclude a project from future ranked digests merely because it appears in `data/selected-projects.csv`, unless it is also present in the publication tracker or a ranked digest entry.

## Quality rules

- Never force category symmetry.
- Prefer 2+ lanes per digest.
- 3–5 items preferred.
- Avoid generic beginner projects.
- Avoid stale/no-context repos.
- Prefer projects with:
  - unusual architecture
  - strong DSP value
  - reusable UI ideas
  - modular routing concepts
  - performance-oriented workflows

## Novelty scoring

| Score | Meaning |
|---:|---|
| 3 | likely obscure/new to user |
| 2 | ecosystem-known but unusual |
| 1 | common/foundation knowledge |

## Ranking dimensions

- utility
- adaptability
- novelty
- build credibility
- flashability
- community signal
- architectural uniqueness
- update significance
