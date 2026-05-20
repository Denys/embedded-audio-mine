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
