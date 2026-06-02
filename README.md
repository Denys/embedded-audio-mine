# Embedded Audio Mine

Digging for golden ideas in embedded audio firmware, DSP algorithms, UI architectures, and buildable Daisy/Teensy projects.

This repository stores the working data for a recurring embedded audio discovery digest.

## Purpose

The goal is not to collect popular repos. The goal is to mine hidden, useful, adaptable projects from:

- Daisy forum
- PJRC / Teensy forum
- GitHub
- project release pages
- DSP architecture references
- visual audio graph/codegen tools

## Digest archive

Full daily digest Markdown snapshots are stored in:

```text
digests/YYYY-MM-DD.md
```

The scheduled ChatGPT task should save each future daily digest there and update `data/published-repo-log.csv` with published items.

## Selected projects reference

Curated projects for fast future access, inspiration, and similarity-anchor searches are stored in:

```text
data/selected-projects.csv
```

This file is intentionally separate from the daily digest tracker.

- `data/published-repo-log.csv` records items actually published in daily digests and drives anti-repeat behavior.
- `data/selected-projects.csv` records especially interesting projects, related infrastructure, manual additions, and watch items.
- A selected-project entry does **not** automatically mean the project was a ranked digest entry.
- A related-infrastructure or watch entry does **not** count as published unless it is also present in `data/published-repo-log.csv` or a committed digest markdown as a ranked entry.

Suggested selected-project statuses:

| Status | Meaning |
|---|---|
| `selected` | Saved project from a ranked digest or strongly promoted source |
| `selected_extra` | Manually added project worth saving despite not being a ranked digest item |
| `related_infrastructure` | Tooling/library/support repo useful for embedded-audio work |
| `watch` | Candidate to monitor; not yet verified/promoted |

## Digest lanes

| Lane | Meaning |
|---|---|
| `STRONG_PASS` | Ready-to-flash or nearly immediate firmware value |
| `PASS` | Buildable/adaptable embedded project with plausible compile/flash path |
| `REF_PASS` | Reference/algorithm/UI/architecture value worth adapting |
| `HOLD` | Interesting but blocked, repeated, unclear, or low-confidence |
| `FOUNDATION_UPDATE` | Manufacturer/core-library update only |

## Core rules

- Main digest size: 3–5 items.
- Prefer at least 2 lanes, but never force filler.
- Do not repeat the same repo/resource for 30 days unless there is a meaningful update.
- Prefer independent/community projects and forum-hidden discoveries.
- Binary firmware is not mandatory for PASS.
- Algorithm/reference value is allowed when adaptation value is strong.

## Ranking model

```text
utility × novelty × adaptability
```

with supporting factors:

- flashability
- build credibility
- community signal
- architectural uniqueness
- source quality
- update significance
