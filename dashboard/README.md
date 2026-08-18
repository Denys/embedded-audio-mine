# Embedded Audio Mine - Porting Radar

Local React dashboard for triaging the repository's current published, selected, shared anti-repeat, and ranked-digest records.

## Run

```bash
npm install
npm run dev
```

The data snapshot is rebuilt before `dev` and `build` from the canonical repository files one level above this folder. `src/data/projects.json` is intentionally generated and ignored rather than checked in, so a repository update cannot leave another deceptively fresh-looking stale snapshot behind.

Focused data validation can run without installing dashboard packages:

```bash
npm run check:data
```

## Canonical data inputs

- `../data/published-repo-log.csv`
- `../data/selected-projects.csv`
- `../data/common-anti-repeat-index.csv`
- ranked entries in `../digests/*.md`
- canonical Analog Audio Mine publication rows in `../digests/*-analog-audio-mine.md`
- `../codex-weekly/data/repo_feature_history.json`
- `../codex-weekly/data/runs/digest_*.json`

Historical `published-repo-log*.csv` snapshots are intentionally not unioned into the dashboard. The current canonical tracker already contains their surviving publication state, and re-reading snapshots can manufacture duplicate or stale records. Ranked digest headings are retained so tracker drift does not hide a published repository, while unranked GitHub links embedded in prose or source lists are treated as evidence rather than promoted to project rows.

## Provenance semantics

The dashboard keeps the canonical anti-repeat ownership model unchanged:

- `webgpt_daily` and `codex_weekly` remain the tracker streams used by the common anti-repeat index;
- Analog Audio Mine is represented separately as `analog_weekly` **digest provenance**, because it is a task-specific hardware lane that shares the WebGPT publication/anti-repeat state rather than introducing a third canonical anti-repeat stream.

This lets recovered Analog digests remain visible without silently rewriting the publication model. The UI labels tracker ownership and digest provenance separately.

## Classification filters

The generated snapshot adds evidence-derived facets for:

- repository type;
- hardware design evidence such as schematic, editable EDA, PCB/Gerbers, BOM, panel/enclosure, calibration/test, and open-hardware evidence;
- MCU/platform, including Daisy/STM32H7, Teensy, RP2040/RP2350, ESP32, STM32, Raspberry Pi/SBC, FPGA, and analog/no-MCU records;
- language/framework, including C++, C, Rust, Python, Arduino, PlatformIO, Faust, JUCE, libDaisy/DaisySP, Teensy Audio, LV2, VST, and related stacks;
- implemented or documented audio functions/effects such as delay, reverb, modulation, drive, dynamics, filtering, synthesis, sequencing, MIDI/CV, and sampling/looping.

These classifications are conservative pattern-based inferences from canonical tracker notes, digest summaries, tags, platform fields, and Codex representative-file evidence. Every record carries `classificationConfidence` and `classificationGaps`; the UI exposes low-confidence records explicitly rather than silently filling missing source evidence.
