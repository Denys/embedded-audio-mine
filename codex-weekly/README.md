# Codex Weekly Embedded DSP Lane

This folder stores the Codex weekly embedded DSP and audio hardware GitHub digest lane.

It is intentionally parallel to the WebGPT daily lane in `digests/`. Do not collapse the two streams into one archive or one scoring model.

## Contents

| Path | Purpose |
|---|---|
| `digests/YYYY-MM-DD.md` | Codex weekly digest Markdown snapshots |
| `codex-prompt-weekly-dsp-digest.md` | Weekly runbook and selection procedure |
| `data/repo_feature_history.json` | Long-term Codex repeat-frequency state |
| `data/latest_results.json` | Latest Codex ranked candidate snapshot |
| `data/run_state.json` | Latest Codex run metadata |
| `data/runs/digest_YYYY-MM-DD.json` | Per-run selected Top 10 payloads |
| `data/runs/diff_YYYY-MM-DD.json` | Per-run delta against the previous Codex digest |

## Relationship to WebGPT daily

The Codex weekly lane should watch the WebGPT daily lane before publishing:

- hard anti-repeat evidence: `../data/published-repo-log.csv`
- soft selected/reference evidence: `../data/selected-projects.csv`
- shared derived index: `../data/common-anti-repeat-index.csv`
- daily Markdown archive: `../digests/`

The WebGPT daily lane should likewise watch this folder, especially `data/repo_feature_history.json` and `digests/`, before publishing a project that may overlap with Codex weekly selections.

## Imported snapshot

The Codex weekly archive is current through `2026-09-01` plus its JSON state. Future imports should keep this layout and update the shared common index after state changes.
