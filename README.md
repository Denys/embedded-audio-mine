# Embedded Audio Mine

Digging for golden ideas in embedded audio firmware, DSP algorithms, UI architectures, and buildable/open audio hardware.

This repository stores the working data for recurring embedded-audio and analog/mixed-signal discovery digests.

## Repository shape

This repository holds two parallel discovery streams:

| Stream | Archive | State | Role |
|---|---|---|---|
| WebGPT daily | `digests/YYYY-MM-DD.md` | `data/published-repo-log.csv`, `data/selected-projects.csv`, `data/prompt-evolution-state.yaml` | Short daily discovery digests, curated selected/reference projects, and compact next-run research state |
| Codex weekly | `codex-weekly/digests/YYYY-MM-DD.md` | `codex-weekly/data/repo_feature_history.json`, `codex-weekly/data/runs/` | GitHub-heavy weekly Top 10 digests with stricter repeat history |
| Analog Audio Mine weekly | task-specific weekly output | `data/hidden-gems-source-registry.csv`, shared anti-repeat state, `data/prompt-evolution-state.yaml` | Deep open-source analog/mixed-signal hardware mining |
| Shared cross-check | none | `data/common-anti-repeat-index.csv` | Derived index for checking both publication streams before publication |

Do not combine the WebGPT daily and Codex weekly digest formats. Use them as parallel evidence sources that watch each other's published and selected projects.

The Analog Audio Mine is a task-specific hardware lane. It shares discovery memory, anti-repeat evidence, and feedback state, but its scope remains broader than a daily standalone-hardware search: Eurorack, reusable subassemblies, and manufacturer reference designs remain valid there.

## Purpose

The goal is not to collect popular repos. The goal is to mine hidden, useful, adaptable projects from:

- Daisy and PJRC / Teensy forums
- GitHub, GitLab, Codeberg, SourceHut, and self-hosted repositories
- specialist forums and maker/project sites
- personal engineering blogs and legacy archives
- project release/download pages
- manufacturer datasheets, app notes, evaluation boards, and design files
- DSP/UI/reference architectures and visual audio graph/codegen tools

## Research-control files

Current operating rules and mutable state:

```text
AGENTS.md
rules/digest-rules-v0.3.md
rules/analog-audio-mine-weekly.md
rules/hidden-gems-discovery-protocol.md
rules/common-anti-repeat-policy.md
rules/feedback-tuning-loop.md
rules/standalone-open-hardware-daily.md
data/prompt-evolution-state.yaml
```

`rules/digest-rules-v0.2.md` is retained as historical rule state. New daily runs should use the latest rule file, currently v0.3.

The prompt-evolution state is compact mutable research state, not publication truth. Candidate/recheck rows there never count as published projects.

## Hidden-gems source registry

Both streams share a persistent page-level source registry:

```text
data/hidden-gems-source-registry.csv
```

Every run must begin with the discovery and revalidation workflow in:

```text
rules/hidden-gems-discovery-protocol.md
```

The registry records low-SEO blogs, forum sections, project hubs, alternative repository hosts, self-hosted downloads, archives, manufacturer document hubs, application notes, and other repeatable discovery pages. It is source memory, not a publication tracker. Update it on every run; preserve blocked, moved, degraded, and dead pages as history.

## Digest archive

Full WebGPT daily digest Markdown snapshots are stored in:

```text
digests/YYYY-MM-DD.md
```

The scheduled ChatGPT task should save each future daily digest there and update `data/published-repo-log.csv` with actual ranked/published items.

Full Codex weekly digest Markdown snapshots are stored in:

```text
codex-weekly/digests/YYYY-MM-DD.md
```

The Codex weekly lane should update `codex-weekly/data/repo_feature_history.json`, `codex-weekly/data/latest_results.json`, `codex-weekly/data/run_state.json`, and the per-run JSON files under `codex-weekly/data/runs/`.

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
| `STRONG_PASS` | Ready-to-flash/build or nearly immediate engineering value |
| `PASS` | Buildable/adaptable embedded project with plausible compile/flash/build path |
| `REF_PASS` | Reference/algorithm/UI/architecture value worth adapting |
| `HOLD` | Interesting but blocked, repeated, unclear, or low-confidence |
| `FOUNDATION_UPDATE` | Manufacturer/core-library/reference-design update only |

## Core rules

- Main digest size: 3–5 items when quality supports it; never force filler.
- Prefer at least 2 lanes only when natural.
- Do not repeat the same repo/resource for 30 days unless there is a meaningful update.
- Before publishing in either stream, check `data/common-anti-repeat-index.csv` plus the other stream's canonical state.
- Treat published records as hard anti-repeat evidence and selected-project records as soft watch/reference evidence.
- Prefer independent/community projects and forum-hidden discoveries.
- GitHub must not dominate the discovery budget.
- Binary firmware is not mandatory for PASS.
- Algorithm/reference value is allowed when adaptation value is strong.
- For hardware claims, inspect actual source artifacts and license text; a photo, README, or store page is not sufficient proof.
- When the daily focus is standalone open hardware, apply `rules/standalone-open-hardware-daily.md`: strict open-HW evidence, strict standalone semantics, strong physical-control weighting, Eurorack as bonus/reference only, and obvious/famous classics as reference rather than discovery slots.
- Every digest uses the self-improvement and interactive questionnaire loop in `rules/feedback-tuning-loop.md` unless explicitly disabled.

## Ranking model

```text
utility × novelty × adaptability
```

with supporting factors:

- flashability/buildability
- build credibility
- hardware completeness
- control-surface/UI value
- community/build evidence
- architectural uniqueness
- source quality
- update significance
- user/project relevance

For standalone open-hardware daily runs, give additional weight to:

```text
hardware completeness × standalone usefulness × control-surface value
```

This additional weighting never replaces the anti-repeat, license, or primary-artifact gates.