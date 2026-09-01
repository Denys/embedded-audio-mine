# Embedded Audio Mine - Porting Radar

Local React dashboard for triaging projects/resources surfaced by the repository's **project-discovery reports** plus their canonical publication/selection state.

The dashboard is intentionally narrower than the repository. It is not an index of every report or work product.

## Run

```bash
npm install
npm run dev
```

The data snapshot is rebuilt before `dev` and `build` from canonical repository files one level above this folder, then augmented with report-only discovery provenance. `src/data/projects.json` is intentionally generated and ignored rather than checked in, so a repository update cannot leave another deceptively fresh-looking stale snapshot behind.

Focused data validation can run without the UI:

```bash
npm run check:data
```

## Project-discovery report inputs

These are the report families that may add project provenance to the dashboard:

- WebGPT daily ranked project digests: `../digests/YYYY-MM-DD.md`
- Analog Audio Mine project reports: `../digests/*-analog-audio-mine.md`
- Codex weekly project runs/state: `../codex-weekly/data/repo_feature_history.json` and `../codex-weekly/data/runs/digest_*.json`
- Portable Weekly Audio DSP project runs: `../portable-weekly/data/runs/digest_*.json`

Canonical publication/selection state remains:

- `../data/published-repo-log.csv`
- `../data/selected-projects.csv`
- `../data/common-anti-repeat-index.csv`

Historical `published-repo-log*.csv` snapshots are intentionally not unioned into the dashboard. The current canonical tracker already contains their surviving publication state, and re-reading snapshots can manufacture duplicate or stale records.

## Explicitly excluded

The dashboard does **not** ingest unrelated artifacts merely because they are reports:

- pedal/product architecture and engineering dossiers;
- books/PDF references;
- `AGENTS*`, handoff/context files, templates, prompts, logs and raw scrape output;
- `work_products/weekly-income/*` and other income/opportunity reports;
- unpromoted candidate/floor-list rows from research output.

A project found in a specialist research report enters the dashboard when it is promoted into canonical publication/selection state or a ranked discovery-report lane. This avoids turning every research candidate into fake publication history. Humans have already invented enough ways to make a tracker lie.

## Provenance semantics

The dashboard keeps anti-repeat ownership separate from report provenance:

- `webgpt_daily` and `codex_weekly` remain canonical tracker streams;
- `analog_weekly` is discovery-report provenance sharing WebGPT publication/anti-repeat state;
- `portable_weekly` is discovery-report provenance only and does **not** silently become a new common anti-repeat stream.

This preserves `rules/common-anti-repeat-policy.md` while still making all recurring project-finding reports visible.

The Analog parser accepts both normal tracker CSV blocks with a header and legacy/headerless publication blocks such as the 2026-08-31 report, so report provenance cannot disappear merely because Markdown formatting wandered off unsupervised.

## Classification filters

The generated snapshot adds evidence-derived facets for:

- repository type;
- hardware design evidence such as schematic, editable EDA, PCB/Gerbers, BOM, panel/enclosure, calibration/test, and open-hardware evidence;
- MCU/platform, including Daisy/STM32H7, Teensy, RP2040/RP2350, ESP32, STM32, Raspberry Pi/SBC, FPGA, and analog/no-MCU records;
- language/framework, including C++, C, Rust, Python, Arduino, PlatformIO, Faust, JUCE, libDaisy/DaisySP, Teensy Audio, LV2, VST, and related stacks;
- implemented or documented audio functions/effects such as delay, reverb, modulation, drive, dynamics, filtering, synthesis, sequencing, MIDI/CV, and sampling/looping;
- discovery-report provenance, including Portable Weekly.

Portable-only records use conservative evidence inference from the weekly run's source paths, portability notes, summaries, and topic. Every record continues to carry `classificationConfidence` and `classificationGaps`; missing target-MCU proof remains visible rather than being guessed into existence.
