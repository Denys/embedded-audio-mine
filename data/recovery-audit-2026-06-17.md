# Embedded Audio Mine — Recovery audit — 2026-06-17

## Scope

Checked Embedded Audio Mine project-chat context after the last fully persisted daily digest (`2026-06-08`) and recovered missing digest outputs where enough ranked-entry context was available.

## Recovered digest files

| File | Status | Notes |
|---|---:|---|
| `digests/2026-06-09.md` | recovered | Ranked set and lanes recovered. Original detailed source prose not fully available. |
| `digests/2026-06-10.md` | recovered | Original chat produced digest but no GitHub commit. |
| `digests/2026-06-13.md` | recovered | Control-surface / extension-board mining digest. |
| `digests/2026-06-15.md` | recovered | MIDI controller digest. Corrected `westlicht/performer+performer-hardware` lane to PASS. |
| `digests/2026-06-16-audio-mining-for-midi.md` | recovered | Custom MIDI/controller mining digest from `Audio Mining for MIDI`. |

`digests/2026-06-13-recovery-note.md` remains as an audit note from the earlier partial repair; the canonical recovered file is now `digests/2026-06-13.md`.

## Tracker / anti-repeat files

Created or corrected:

- `data/published-repo-log.append-2026-06-09-to-2026-06-16.csv`
- `data/published-repo-log.append-2026-06-15-recovered.csv`
- `data/common-anti-repeat-index.append-2026-06-09-10.csv`
- `data/common-anti-repeat-index.append-2026-06-13-16.csv`
- `data/selected-projects.csv`

Important: the direct full-file replacement of canonical `data/published-repo-log.csv` was blocked by the connector/safety layer during this repair pass. Therefore, the recovered rows are stored in append files and in committed digest files. They should be treated as hard anti-repeat evidence until the canonical CSV is consolidated manually or with a local script.

## Canonical consolidation still pending

Pending manual/local consolidation:

1. Append all rows from `data/published-repo-log.append-2026-06-09-to-2026-06-16.csv` into `data/published-repo-log.csv`.
2. Merge rows from `data/common-anti-repeat-index.append-2026-06-09-10.csv` and `data/common-anti-repeat-index.append-2026-06-13-16.csv` into `data/common-anti-repeat-index.csv`.
3. Remove or archive superseded append files after consolidation if desired.

## Selected-project additions

`data/selected-projects.csv` was updated with recovered controller/portability anchors including:

- `NickCulbertson/Mini-Teensy-Synth`
- `newdigate/teensy-eurorack`
- `newdigate/teensy-audio-display-components`
- `16n-faderbank/16n`
- `16n-faderbank/16nx`
- `shanteacontrols/OpenDeck`
- `DMME-NL/RP2040-DSP-Public` as watch/unverified

## Caveats

Several recovered digests preserve ranked-entry/lane context but not the full original source block. Any fabrication, porting, or source-level claim should be re-checked from primary repositories before use.
