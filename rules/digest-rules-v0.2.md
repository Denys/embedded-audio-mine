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
- Exception:
  - new release
  - new firmware asset
  - major architectural update
  - major DSP addition
  - new supported hardware
  - major documentation/build improvements

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
