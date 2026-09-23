# Embedded Audio Mine — Daisy / Teensy Watch — 2026-09-23

## Executive summary

One new project clears the alert bar: **chrisades/Ceres v0.1 — STRONG_PASS**.

Ceres is a newly released Daisy Seed + Synthux Touch2/SimpleTouch performance synth with a ready-to-flash binary, reproducible libDaisy/DaisySP Make build, GPL-3.0 source, MPR121 pressure-sensitive touch handling, dual custom wavetable oscillators, phase-distortion/wavefold control and a compact 12-pad / 8-knob / 2-switch UI. The v0.1 release was published on **2026-09-22** and ships `Ceres.bin` (93,152 bytes, SHA-256 `da156783c339fe19d78684c52e55f9ee004db8b28c37144709dde290ced66575`).

No Teensy project in this pass cleared the same freshness + source/licence/build bar. The strongest fresh Teensy transport project is held because its repository has no explicit licence. `ideocentric/caryatid` is also worth watching as unusually disciplined Daisy carrier-board engineering, but the author explicitly states that the first five boards have not yet been powered, so promoting it as validated hardware would be premature.

## Previous questionnaire feedback applied

None recorded in `data/prompt-evolution-state.yaml`.

## Pre-flight / discovery audit

- **Profile:** `daily_broad`, narrowed by the active Daisy/Teensy watch request rather than the repository's ordinary standalone-hardware daily focus.
- **Rules/state inspected:** `README.md`, `AGENTS.md`, `rules/digest-rules-v0.3.md`, `rules/hidden-gems-discovery-protocol.md`, `rules/common-anti-repeat-policy.md`, `data/prompt-evolution-state.yaml`, publication/selected/common anti-repeat state, the 2026-09-21 Daisy/Teensy watch digest, and the 2026-09-22 Codex weekly digest.
- **Anti-repeat result:** no canonical or derived hard/soft record was found for `chrisades/Ceres`. The previous watch item `Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper` remains blocked through 2026-10-21.
- **Source classes searched:** specialist forums, code/release hosts, maker/project pages, vendor/community project pages, and alternative repository hosts.
- **Domains / surfaces searched:** Electro-Smith Daisy forum, PJRC/Teensy forum, GitHub, Hackaday.io, Synthux community/news, GitLab, Codeberg and SourceHut. Codeberg/SourceHut were blocked by robots in the available web path and were not treated as verified evidence.
- **Query families:** current forum/activity scans; platform + feature searches for Daisy Seed/Touch2 and Teensy 4.x audio; release/commit searches; artifact/build/licence verification.
- **Candidate pool:** 10+ plausible leads screened, including Ceres, caryatid, TOSLINK Audio Transport, TeensyMixer, KeySynth, ML_SynthTools updates, EarthPedal, OndaKit, the fresh PJRC reverb lead, and older Hackaday Daisy projects.
- **Stop-rule evidence:** after Ceres qualified, independent Teensy, hardware-carrier, maker/project and alternative-host lanes were continued; they produced no second candidate with equal freshness and evidence quality.
- **Registry additions:** none. Synthux news was evaluated as a reusable community surface, but this watch run did not mutate the source registry because the alerted item was independently verified at its primary release/source repository.
- **Questionnaire:** omitted for this non-interactive condition-watch run.

## Ranked entries

### 1) [chrisades/Ceres v0.1](https://github.com/chrisades/Ceres/releases/tag/v0.1) — **STRONG_PASS**

**Technical summary:**

A tactile Daisy Seed synthesizer targeting Synthux Touch2/SimpleTouch. It combines two custom wavetable oscillators with independently triggered AD envelopes, a touch ADSR, phase-distortion/wavefold control, a custom two-phase `TrillClock`, scale/octave mapping and pressure-derived touch response from the MPR121 controller.

**What is new:**

- repository created 2026-08-31 and actively pushed on 2026-09-22;
- first tagged release **v0.1** published 2026-09-22;
- release contains ready-to-flash `Ceres.bin` (93,152 bytes) with published SHA-256 digest;
- source, Makefile, GPL-3.0 licence, libDaisy/DaisySP submodule structure and direct DFU/build instructions are present.

**Implementation highlights:**

- Daisy Seed + DaisySP at **48 kHz**, **4-sample audio blocks**;
- MPR121 filtered/baseline data is converted to a normalized pressure value with configurable threshold and smoothing behaviour;
- two `WavetableOsc` instances share generated wavetable state and are driven by a custom trilling clock plus two `AdEnv` envelopes;
- touch pads select scale degree, scale, octave and output level; eight pots map directly to oscillator frequency, trill widths/shape/distance/rate and waveform morph/fold semantics;
- source build path is explicit: recursive clone, build libDaisy/DaisySP, then `make`; programming path uses `make program-dfu` or the Daisy web programmer with the release binary.

**Hardware / electronics notes:**

This is a **firmware/instrument finding**, not a new hardware design. It relies on the existing Daisy Seed and Synthux Touch2/SimpleTouch control surface. The useful electrical detail in the application is the MPR121 capacitive-touch integration and pressure estimation rather than a reusable codec/power/front-end schematic.

**Why it matters:**

The value is the combination of a genuinely flashable release and a compact expressive control model. The MPR121 pressure heuristic, scale/octave state handling and separation between low-rate control state and the audio callback are directly reusable patterns for touch-driven synths or compact controller surfaces. The release is tiny enough to audit without digging through a lifestyle brand's entire monorepo, a minor miracle in 2026.

**Adaptation ideas:**

1. Reuse the pressure-from-baseline approach as a starting point for velocity/aftertouch-like macro control on a custom capacitive panel, then characterize drift and per-pad calibration properly.
2. Extract the `TrillClock` + dual-envelope topology as a modulation primitive for ratchets, tremolo bursts, delay feedback chopping or dual-head modulation.
3. Treat its 4-sample block configuration as a profiling target rather than a recommendation: measure callback p99.9/max and UI/I2C contention before borrowing that latency setting for a larger effect graph.
4. Mine the Touch2 mapping as a reference for dense no-menu firmware variants on Daisy Field/Pod-class targets.

**Quick engineering assessment:**

High immediate firmware value, low hardware novelty. The build and flash paths are real and source-level architecture is inspectable. Promotion is based on the new v0.1 binary/source release, not on popularity or README presentation.

**Caveats / verification gaps:**

- firmware was not compiled or flashed in this watch run;
- the README's final binary-name note still says `ZoscTouch.bin` while the Makefile target and release asset are `Ceres`, suggesting a stale documentation fragment rather than a build blocker;
- no CPU-load, callback-overrun, latency, noise or audio-quality measurements are published/verified here;
- MPR121 pressure mapping uses global thresholds/constants; production use would need per-pad calibration, environmental drift testing and touch false-trigger characterization;
- the repository is GPL-3.0, so code reuse into a closed firmware product needs licence-compatible architecture or a clean-room reimplementation of the ideas.

**Primary sources:**

- Repository: https://github.com/chrisades/Ceres
- v0.1 release: https://github.com/chrisades/Ceres/releases/tag/v0.1
- Source: https://github.com/chrisades/Ceres/blob/main/Ceres.cpp
- Build file: https://github.com/chrisades/Ceres/blob/main/Makefile
- Touch2 platform: https://www.synthux.academy/store/simple-touch-2

---

## HOLD / watchlist

| Item | Lane | Reason / smallest promotion action |
|---|---:|---|
| [ideocentric/caryatid](https://github.com/ideocentric/caryatid) | REF_PASS / HOLD | Excellent CERN-OHL-S Daisy carrier with bq24074 power-path charging, 18650 holder, TPS61023 5 V boost, dual audio-in configuration, generated pin map and unusually disciplined ADR/sourcing/integration docs. Author explicitly states five boards are ordered but **none has been powered yet**. Promote after first bring-up evidence and audio/power measurements. |
| [ryanthomasdonald/toslink-audio-transport](https://github.com/ryanthomasdonald/toslink-audio-transport) | HOLD | Fresh Teensy 4.1 16 MB PSRAM / microSD / S/PDIF-TOSLINK gapless transport with a concrete hardware recipe and rolling-buffer architecture, pushed 2026-09-22. Repository currently exposes **no explicit licence**, so reuse status is unresolved. Promote after licence + deeper implementation verification. |
| PJRC “New Reverb Published by me” thread | HOLD | Fresh Audio Projects thread exists, but the available forum surface did not expose enough primary artifact detail to verify canonical source, build path, licence and exact algorithm/release delta. Resolve the actual library/repository before promotion. |
| OndaKit | HOLD | Synthux now describes a browser visual DSP patch builder for Touch2/Daisy Seed with future Teensy ambitions, but public source/licence/export-build evidence still did not clear the promotion gate. |

## Rejected / not promoted

| Project/source group | Decision | Reason |
|---|---:|---|
| `marcel-licence/ML_SynthTools` latest commits | REJECT update | September 20 changes mainly touch ESP32 audio-kit/I2S and WAV helpers; no material Teensy/Daisy architecture update justified a repeat alert. |
| `NeiroCash/TeensyMixer` | REJECT scope | Current project is principally a Teensy-backed Windows application-volume controller over USB serial; not an embedded audio signal-processing project despite the word “mixer”. |
| `MilanMarocchi/teensy_nam_pedal` | REJECT freshness | Interesting Teensy NAM/Blackaddr pedal work, but repository last push was 2026-07-13; no fresh material update for this watch window. |
| Older Hackaday Daisy projects | REJECT freshness | Useful historical builds, but no current material update. |
| `ovelhaaa/EarthPedal` fork activity | REJECT evidence | Recent fork push exists, but no verified material delta over the upstream GuitarML Earth project was established in this run. |

## Tracker update rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
chrisades/Ceres,STRONG_PASS,2026-09-23,2026-09-23,2026-10-23,published,https://github.com/chrisades/Ceres ; v0.1 published 2026-09-22 with ready-to-flash Ceres.bin GPL-3.0 source recursive libDaisy/DaisySP Make build MPR121 pressure touch dual wavetable oscillators custom TrillClock and 48 kHz 4-sample callback; Synthux Touch2/SimpleTouch hardware dependency; no CPU/audio measurements verified
```

## Prompt improvement for next run

- Keep fresh forum posts as discovery signals only until the linked implementation artifact is resolved.
- Recheck Ceres only for a material release after its 30-day block through 2026-10-23.
- Revisit caryatid after first powered-board bring-up; its documentation quality is already high enough that measurements, not more prose, are the gating evidence.
- Continue a targeted Teensy Audio Projects follow-through lane for new floating-point, multichannel and transport code with explicit repository licences.
