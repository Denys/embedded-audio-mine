# Portable Weekly Audio DSP Lane

This lane archives the weekly search for computer-first synths, effects, and reusable DSP that can realistically be ported to Daisy Seed or Teensy 4.x firmware.

## Contents

| Path | Purpose |
|---|---|
| `digests/YYYY-MM-DD - Weekly Portable Audio DSP GitHub Digest.md` | Complete weekly Markdown archive |
| `codex-prompt-weekly-portable-audio-dsp-digest.md` | Current research, ranking, rotation, and publication runbook |
| `data/repo_feature_history.json` | Long-term repeat-frequency state |
| `data/latest_results.json` | Latest ranked Top 10 payload |
| `data/run_state.json` | Latest run metadata |
| `data/runs/digest_YYYY-MM-DD.json` | Per-run selected-repository payload |
| `data/runs/diff_YYYY-MM-DD.json` | Per-run delta against the previous digest |

The portable lane is separate from `codex-weekly/`: its source candidates begin as desktop or reusable DSP code, and its main judgment is extraction cost and added value on Daisy Seed or Teensy 4.x.

A run is complete only after the Markdown and JSON state are committed to the default branch and the remote files are verified.
