# Embedded Audio Mine Agent Instructions

## Operating model

- Keep the WebGPT daily stream and the Codex weekly stream parallel.
- Do not merge WebGPT daily digests into the Codex weekly format.
- Do not merge Codex weekly Top 10 digests into the WebGPT daily format.
- WebGPT daily outputs live under `digests/` and use `data/published-repo-log.csv` plus `data/selected-projects.csv`.
- Codex weekly outputs live under `codex-weekly/` and use `codex-weekly/data/repo_feature_history.json` plus the run JSON files under `codex-weekly/data/runs/`.

## Cross-stream checks

Before publishing or selecting a project in either stream, check all relevant state:

- `data/common-anti-repeat-index.csv`
- `data/published-repo-log.csv`
- `data/selected-projects.csv`
- `codex-weekly/data/repo_feature_history.json`
- the newest committed Markdown digest in `digests/`
- the newest committed Markdown digest in `codex-weekly/digests/`

Published entries in either stream are hard anti-repeat evidence. They block the same repo or resource for 30 days unless there is a meaningful update such as a new release, firmware asset, hardware target, DSP addition, architecture change, or build/documentation improvement.

Selected-project entries are soft evidence. Use them to spot duplicates, related infrastructure, watch items, and similarity anchors. Do not treat a selected-project row as a published digest entry unless the same resource is also present in a publication tracker or ranked digest entry.

## Common index

`data/common-anti-repeat-index.csv` is the shared cross-check index. It is derived from the canonical stream-specific records and should be refreshed after either stream changes published or selected state.

If `data/common-anti-repeat-index.csv` disagrees with a canonical source file, trust the canonical source file and regenerate the common index.

## Selection discipline

- Prefer source evidence from actual repository files over names, descriptions, topics, or README claims.
- Track near-duplicates and closely related infrastructure even when they are not exact repo repeats.
- If a candidate is similar to a recent item from the other stream, either hold it or explain the new implementation value that makes it worth publishing.
- Keep decisions ranked, concise, and useful for embedded audio firmware, DSP, hardware, or UI reuse.
