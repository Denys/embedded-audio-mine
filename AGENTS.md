# Embedded Audio Mine Agent Instructions

## Operating model

- Keep the WebGPT daily stream and the Codex weekly stream parallel.
- Do not merge WebGPT daily digests into the Codex weekly format.
- Do not merge Codex weekly Top 10 digests into the WebGPT daily format.
- WebGPT daily outputs live under `digests/` and use `data/published-repo-log.csv` plus `data/selected-projects.csv`.
- Codex weekly outputs live under `codex-weekly/` and use `codex-weekly/data/repo_feature_history.json` plus the run JSON files under `codex-weekly/data/runs/`.
- Analog Audio Mine weekly is a task-specific hardware lane that shares source memory and anti-repeat evidence but keeps its own broader analog/mixed-signal scope.

## Mandatory current rules

Before substantial discovery/ranking work, read the applicable current rules and state:

- `rules/digest-rules-v0.3.md` for new WebGPT daily runs;
- `rules/analog-audio-mine-weekly.md` for Analog Audio Mine weekly runs;
- `rules/hidden-gems-discovery-protocol.md` for both;
- `rules/common-anti-repeat-policy.md` for publication checks;
- `rules/feedback-tuning-loop.md` for self-improvement and the interactive questionnaire;
- `data/prompt-evolution-state.yaml` for compact mutable research state;
- `rules/standalone-open-hardware-daily.md` when the daily focus is standalone open hardware.

`rules/digest-rules-v0.2.md` is historical rule state. Do not silently use it as the current daily rule when v0.3 exists.

## Cross-stream checks

Before publishing or selecting a project in either stream, check all relevant state:

- `data/common-anti-repeat-index.csv`
- `data/published-repo-log.csv`
- `data/selected-projects.csv`
- `codex-weekly/data/repo_feature_history.json`
- the newest committed Markdown digest in `digests/`
- the newest committed Markdown digest in `codex-weekly/digests/`

Published entries in either stream are hard anti-repeat evidence. They block the same repo or resource for 30 days unless there is a meaningful update such as a new release, firmware asset, hardware target, DSP addition, architecture change, source/license clarification, or build/documentation improvement.

Selected-project entries are soft evidence. Use them to spot duplicates, related infrastructure, watch items, and similarity anchors. Do not treat a selected-project row as a published digest entry unless the same resource is also present in a publication tracker or ranked digest entry.

Candidate and recheck rows in `data/prompt-evolution-state.yaml` are also soft research state only. They never establish publication.

## Common index

`data/common-anti-repeat-index.csv` is the shared cross-check index. It is derived from the canonical stream-specific records and should be refreshed after either stream changes published or selected state.

If `data/common-anti-repeat-index.csv` disagrees with a canonical source file, trust the canonical source file and regenerate the common index.

## Selection discipline

- Prefer source evidence from actual repository files, schematics, EDA files, BOMs, build files, licenses, releases, and measurements over names, descriptions, topics, README claims, photos, or store pages.
- Track near-duplicates and closely related infrastructure even when they are not exact repo repeats.
- If a candidate is similar to a recent item from the other stream, either hold it or explain the new implementation value that makes it worth publishing.
- Do not force the requested digest size when the evidence bar is not met.
- Keep decisions ranked, concise, and useful for embedded-audio firmware, DSP, hardware, or UI reuse.
- For strict standalone-open-hardware daily runs, Eurorack-only modules and generic carriers belong in bonus/reference lanes rather than ranked standalone positions.
- Famous canonical projects may remain useful anchors, but completeness alone does not make them hidden-gem discoveries.

## Feedback and prompt evolution

Every normal digest should apply `rules/feedback-tuning-loop.md`:

- show previous explicit questionnaire feedback and how it changed the run;
- end with a concise prompt-improvement delta;
- attach a 6–8 question multiple-choice tuning questionnaire;
- update `data/prompt-evolution-state.yaml` when writes are authorized.

Do not let prompt evolution weaken source verification or leak task-specific gates across streams. In particular, the daily standalone profile must not narrow the weekly analog mine, which intentionally allows Eurorack, reusable subassemblies, and manufacturer reference designs.