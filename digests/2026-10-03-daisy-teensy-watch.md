# Daisy + Teensy Watch — 2026-10-03

## Executive summary

Two findings clear the evidence and anti-repeat gates:

1. **CHOMPI-Club/CHOMPI — STRONG_PASS** — the production CHOMPI Mk1 sampler has been released as a complete MIT source bundle. The canonical repository was committed on **2026-09-29** and the public open-source announcement landed on **2026-09-30**.
2. **Wasted-Audio/hvcc — FOUNDATION_UPDATE** — merged commit **1e9cb4ce63d7cedf5dc0b0e3de303423a34b39a5** on **2026-10-01** fixes generated audio initialization for Daisy Seed 1.1; the fix has hardware-reporter validation and a regression test, but is not yet in a tagged hvcc/plugdata release.

No current PJRC/Teensy project produced a second independent publishable release. Recent T-DSP, FireFlow, TouchVink, Alchemy SDK and TeensyAudio-rs activity was checked against the prior watch state and either had already been reported or did not add a new material delta.

## 1. CHOMPI-Club/CHOMPI — STRONG_PASS

**Verified event**

- Canonical source commit: [a73d732 — CHOMPI Open Source Bundle](https://github.com/CHOMPI-Club/CHOMPI/commit/a73d732613da684e4de844619b690776f0f50ccf), 2026-09-29.
- Official open-source page: [CHOMPI Open Source](https://www.chompiclub.com/opensource), public release announced 2026-09-30.
- Canonical repository: [CHOMPI-Club/CHOMPI](https://github.com/CHOMPI-Club/CHOMPI).

**What changed**

A discontinued commercial Daisy instrument is now available as a one-commit production-source archive rather than only as binaries and product documentation. The bundle contains:

- **TAPE 2.0:** seven-voice 48 kHz/16-bit stereo SD-streaming sampler, varispeed playback, SDRAM sample buffer and tape looper, delay/reverb, TRS + USB MIDI;
- **TEMPO 1.0:** two independent eight-voice engines (chromatic + 16-slice), pattern generators, master-clocked playback;
- **WAVE 1.0 beta:** eight-voice wavetable synth, per-voice filter/envelope, delay/reverb/compression/saturation, two LFOs, 32-step sequencer, presets and TRS/USB MIDI;
- CHOMPI-specific bootloader v6.4 beta, factory card profiles, samples/settings;
- production Rev4 schematic, BOM, editable EAGLE schematic/board, Gerbers/drill/v-score package, centroid/CPL data;
- six PCB enclosure-panel designs plus DXF laser-cut profiles.

**Build / hardware evidence**

The root build guide names exact compilers: GCC 10.3.1 for TAPE/WAVE and GCC 13.3.1 for TEMPO, then `make` from each `code/src`. Output is `CHOMPI.bin`; the normal update path copies it to microSD for the Daisy bootloader to program QSPI. DFU bootloader installation and ST-Link/OpenOCD/GDB debugging are also documented.

The hardware is not generic Seed firmware: Rev4 uses **Daisy Seed2 DFM + a second PCM3060 codec**, MP2722 Li-ion charger, microSD, MEMS mic, five 3.5 mm jacks, 28 hot-swap keys, six encoders and 35 RGB LEDs. Each firmware vendors a CHOMPI-specific libDaisy 5.4.0 adaptation; replacing it with stock libDaisy breaks build or MIDI/timer behavior.

**Why it is worth examining**

This is unusually complete product-level evidence: real shipped hardware, three substantial firmware personalities, field-update/boot infrastructure, storage architecture, mechanical files and the exact manufacturing package. The most reusable parts for embedded DSP are the SD-streaming/SDRAM boundary, sampler/looper routing, per-firmware card schemas, boot/update workflow and dense control-surface organization.

**Concrete relevance to Custom Pedals / Daisy Field**

Use CHOMPI as a reference for a long-delay/looper storage pipeline and robust SD-card firmware handoff. On Daisy Field, port only the portable DSP/storage layer behind a new hardware abstraction; **Field compatibility is not established** because CHOMPI targets Seed2 DFM, a second PCM3060 and a modified libDaisy fork. A sensible first experiment is a host test of the circular/streaming layer, followed by a Field build that substitutes Field I/O and validates callback deadline, SD worst-case latency and SDRAM headroom.

**Caveats**

- MIT covers functional hardware/firmware; CHOMPI name, logos, artwork and trade dress are excluded.
- It is explicitly a static discontinuation archive with no promised updates/support.
- TAPE reports only **376 bytes of SRAM region headroom**; modification requires deliberate feature/code relocation.
- WAVE and bootloader v6.4 are beta.
- Author build instructions and production use were inspected; this run did not independently compile, flash or fabricate the bundle.

## 2. Wasted-Audio/hvcc — FOUNDATION_UPDATE

**Verified event**

- [Commit 1e9cb4c](https://github.com/Wasted-Audio/hvcc/commit/1e9cb4ce63d7cedf5dc0b0e3de303423a34b39a5), merged 2026-10-01.
- [Issue/PR #423](https://github.com/Wasted-Audio/hvcc/issues/423), closed after merge.
- [Daisy forum hardware report](https://community.daisy.audio/t/bug-with-daisy-seed-1-1-and-heavy-compiler-and-no-sound-should-be-fixed-in-next-hvcc-build/9801), 2026-10-01.

**What changed**

Generated Daisy code had assumed the usual codec data-line direction. Seed 1.1 routes the codec data lines differently, so plugdata/hvcc projects could flash successfully and run their UI while Patch audio channels 1–2 remained silent. The merged change adjusts Seed 1.1 codec initialization; hvcc's develop changelog lists a Seed 1.1 codec-initialization regression test.

**Why it matters**

This is a useful failure-mode reminder: “firmware flashed and controls work” is not a valid audio bring-up result across Daisy revisions. Generated BSP code must carry revision-specific codec/SAI routing and CI must exercise that board variant.

**Concrete relevance to Custom Pedals / Daisy Field**

Before using plugdata/hvcc on the Field, identify the installed Seed revision and run a four-channel audio smoke test. Do not assume this Seed 1.1 fix applies to every Field revision. The transferable engineering action is to add board-ID + codec/SAI configuration to the bench record and verify left/right input/output after every generated-toolchain update.

**Caveats**

- GPL-3.0 toolchain.
- Fix is merged on develop but **not yet present in a tagged hvcc or plugdata release**.
- Hardware confirmation is from the reporting user/maintainer thread; it was not reproduced in this run.

## HOLD / not repeated

- **Electro-Smith Seed3 desktop/pedal/Eurorack Dev Kits** — announcement verified 2026-09-29; desktop and Eurorack were stated available, pedal ETA 3–4 weeks. HOLD from ranked publication because the inspected official pages did not expose the claimed complete KiCad/BOM source bundles strongly enough for artifact-level verification.
- **mcbronkowitch/fireflow** — Oct 2 fabrication exports and fab guards are substantive, but the repo was alerted Sep 30 and still has no fabricated/powered Rev-A board; wait for physical bring-up.
- **t-dsp/t-dsp_software** — no commit newer than the Oct 2 controller/MPE work already reported.
- **jonwaterschoot/TouchVink** — no material firmware/hardware delta after the already reported v0.2; latest work is chroma-key/web-manual presentation.
- **hermetic-modular/alchemy-sdk** — no commit after v0.12.0 already reported.
- **tacertain/TeensyAudio-rs** — no commit after the Sep 28 DSP kernels already reported.
- **bkshepherd/DaisySeedProjects** — Sept 26–27 dual-echo/autosave/UI work is outside this run's fresh overlap and had no new Oct 1–3 commit; not backfilled.
- **PC-1 Daisy sampler build thread** — source repository remains private; schematic discussion alone does not clear the source gate.
- **TMANTsmith/daisy** — promising Rust BSP discovery, but the canonical GitHub endpoint returned 404 during direct verification.

## Discovery audit

- Profile: `daily_broad`
- Run date: 2026-10-03 Europe/Zurich; 30-day cutoff: 2026-09-03; fresh overlap searched from 2026-10-01.
- Exa search volume: **155 returned results** across five workstreams: Daisy forum, PJRC/Teensy forum, GitHub/release discovery, non-GitHub/alternative-host discovery, and targeted primary-page verification.
- Distinct domains included community.daisy.audio, forum.pjrc.com, github.com, pjrc.com, chompiclub.com, pedalpcb.com, synthux.academy, hackaday.io, codeberg.org, sr.ht and t-dsp.com.
- Source classes: specialist forums, repository hosts, project/vendor pages, maker/build-log sites and alternative forges.
- Candidate pool exceeded 10; two consecutive targeted batches after the first qualifying lead produced no additional independent project that beat the promotion bar.
- Revalidated: PJRC Audio Projects forum index, active, 2026-10-03.
- New source-registry entry: CHOMPI Open Source official project page.
- Exa connection and retrieval succeeded; no rate-limit/auth blocker.

## Prompt improvement for next run

- Keep commit/release date verification separate from search-index dates.
- Recheck hvcc only when a tagged release or plugdata bundle contains the fix.
- Recheck FireFlow only after fabricated-board or powered bring-up evidence.
- Resolve the official Seed3 Dev Kit CAD download locations before promoting the kit family.
- Continue treating a flashed UI with silent audio as a board-variant bring-up failure, not a successful build.

Questionnaire omitted because this is a non-interactive scheduled run.
