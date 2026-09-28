# Daisy + Teensy Watch — 2026-09-28

## Executive summary

One material update clears the bar today: **Soundpauli/TŒRN v3.0 — STRONG_PASS / MATERIAL UPDATE**.

The project was already ranked on 2026-07-17, so this is not a rediscovery. The repeat override is justified by **47 commits** between the July publication baseline `8f12f3c5bd7717e1e9fd99e1fb93fb1e4fa38739` and current `dd0798488dd1df735a5d40b1d4ac480d313f6eaf`, including a current rev H fabrication package and a new browser simulator. The final v3.0 commit itself only changes the version string; the meaningful update is the accumulated hardware, tooling and simulator delta.

No fresh Daisy project and no other Teensy project met the same primary-source, build, licence and update-significance threshold. Current Daisy and PJRC forum activity was searched and retained only as discovery/HOLD evidence where source maturity was insufficient.

## Pre-flight / discovery audit

- Profile: `daily_broad`
- Repository main inspected at `e9425b245ef71798d623f8c4bb96d1c7de3a329b`
- Rules/state inspected: `README.md`, `AGENTS.md`, `rules/digest-rules-v0.3.md`, `rules/hidden-gems-discovery-protocol.md`, `rules/common-anti-repeat-policy.md`, publication/selected/common anti-repeat CSVs, recent watch digests and current Codex-weekly history
- Recent unmerged watch findings from 2026-09-25 through 2026-09-27 were treated as soft/manual anti-repeat evidence to avoid duplicate alerts
- Source surfaces searched: Electro-Smith Daisy Community, PJRC/Teensy forum, GitHub, Hackaday, GitLab, Codeberg and SourceHut
- Query families: current forum activity, fresh repo/release/commit search, artifact/build/licence verification, and lineage/update comparison
- Candidate pool: >10 plausible leads
- Additional independent Daisy and Teensy lanes were searched after TŒRN qualified
- New reusable low-SEO registry page: none justified this run
- Stop rule: subsequent independent search lanes produced no second candidate that cleared the evidence threshold

## 1. Soundpauli/TŒRN v3.0 — STRONG_PASS / MATERIAL UPDATE

**What changed**

TŒRN was previously published on 2026-07-17. Comparing the then-current baseline `8f12f3c5bd7717e1e9fd99e1fb93fb1e4fa38739` with current `dd0798488dd1df735a5d40b1d4ac480d313f6eaf` shows **47 commits ahead**.

The current tree now exposes a much more complete product-development stack:

- current **rev H** carrier instead of the earlier rev-G-era state;
- editable KiCad schematic/PCB plus schematic PDF, STEP, Gerber/ODB outputs and JLCPCB production package;
- explicit BOM/CPL and a detailed first-power/bring-up procedure;
- integrated SGTL5000 codec, BQ24075 power-path/LiPo charging, USB-C, line/mic/headphone I/O, TRS MIDI and onboard mic on the carrier;
- reproducible PlatformIO Teensy 4.1 build with pinned libraries and a dependency patch script;
- new browser simulator under `standalone-tools/web-standalone/`, hosted at `sim.tyng.app`;
- browser/CLI SD transfer and sample-conversion tooling;
- expanded developer docs and operator handbook.

The 2026-09-27 commit `1c1e376d9436c34aa9bb25068ea5660e5130372b` finishes the simulator integration and updates the documentation/tool map. The later `dd0798488dd1df735a5d40b1d4ac480d313f6eaf` commit merely changes `VERSION` from v2.7 to v3.0, so the version string is not being used as evidence of architectural progress.

**Implementation highlights**

- Teensy 4.1 + SGTL5000 audio platform with external PSRAM usage.
- Eight sample voices, poly/mono synthesis, sequencer, MIDI clock/transport, recording, filters, bitcrush and reverb.
- Modified variable-playback/resampling path and DMAMEM-oriented Freeverb.
- FastLED configured to avoid interrupt contention with audio.
- USB Serial file-management path deliberately avoids exposing the SD card as USB mass storage while the audio engine owns it.
- Host-side browser simulator gives a practical route to exercise UI/state concepts without physical hardware.

**Hardware / electronics**

Rev H has unusually complete fabrication evidence for a community Teensy instrument: editable KiCad, schematic PDF, STEP, Gerbers, ODB, JLCPCB package, BOM/CPL and first-power rail checks. The build guide explicitly calls out the SGTL5000 and BQ24075 as substitution-sensitive packages, documents the JP1 power-path choice, and requires checking 5 V / 3.3 V / 1.8 V rails before inserting the Teensy or battery.

**Why it matters**

The useful update is not another synth voice. It is the movement from a strong device project toward a **reproducible product-development environment**: fabrication package + bring-up documentation + host-side simulator + browser tooling around the same embedded product.

**Adaptation ideas**

- Use the browser simulator pattern as a reference for a Custom Pedals UI/state digital twin.
- Reuse the separation between embedded audio firmware and host-side SD/sample tooling.
- Study the rev-H bring-up documentation as a template for pedal carrier EVT checklists.
- The simulator is particularly interesting for testing state machines, preset/menu semantics and control mapping before hardware is on the bench.

**Caveats / verification gaps**

- Software is MIT, but hardware is **CC BY-NC 4.0**; commercial reuse needs explicit permission.
- The current project remains partly a large Arduino multi-tab codebase, so simulator presence does not imply that the embedded DSP core itself is host-unit-testable.
- The README targets 16 MB PSRAM; actual fitted-memory configuration remains builder-dependent.
- No new independent audio-performance, callback-margin, THD+N/noise or manufacturing-yield evidence was found in this run.
- v3.0 is a version-string commit, not a release-quality proof by itself.

**Primary sources**

- https://github.com/Soundpauli/toern
- https://github.com/Soundpauli/toern/commit/1c1e376d9436c34aa9bb25068ea5660e5130372b
- https://github.com/Soundpauli/toern/commit/dd0798488dd1df735a5d40b1d4ac480d313f6eaf
- https://github.com/Soundpauli/toern/blob/main/BUILD.md
- https://github.com/Soundpauli/toern/tree/main/PCB/toern_revH
- https://sim.tyng.app/

## HOLD / not promoted

- **embe (Daisy Seed3)** — attractive 24-voice breadboard synth with effects, arpeggiator and looper, but the forum post does not yet expose reusable source/hardware artifacts or a licence.
- **PJRC phase-distortion/modulation thread** — fresh discussion, but no newly resolved canonical licensed project/release strong enough for promotion.
- **PJRC PCM5102A 60 kHz / floating-point synthesis tutorial** — technically interesting forum work, but not yet promoted as a reusable project because the current surfaced evidence is forum/tutorial-level rather than a canonical maintained source package.
- **ryanthomasdonald/toslink-audio-transport** — remains HOLD; current activity does not resolve the explicit-license gap noted on 2026-09-23.
- **Recent 2026-09-25…27 watch candidates** — not repeated absent a newer material change.

## Tracker update

The existing TŒRN publication row is updated rather than duplicated:

```csv
Soundpauli/toern,STRONG_PASS,2026-07-17,2026-09-28,2026-10-28,published,"Material update verified 2026-09-28: 47 commits since the 2026-07-17 publication; current v3.0 includes rev H production-oriented Teensy 4.1/SGTL5000 carrier with editable KiCad, JLCPCB Gerber/BOM/CPL, STEP and first-power procedure, plus a new browser simulator and expanded host-side tooling; software MIT, hardware CC BY-NC 4.0; v3.0 version bump itself is trivial, promotion is based on the accumulated hardware/tooling/simulator delta"
```
