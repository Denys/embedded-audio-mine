# Daisy + Teensy Watch — 2026-09-30

## Executive summary

Three items clear today's evidence and anti-repeat bar:

1. **jonwaterschoot/TouchVink — PASS** — new Daisy Seed / Synthux Simple Touch feedback instrument with flashable v0.2 firmware, portable host-testable DSP, bidirectional USB MIDI, OLED UI, SysEx telemetry and an interactive browser manual.
2. **mcbronkowitch/fireflow — PASS / MATERIAL UPDATE** — previously surfaced on 2026-08-18; now outside the 30-day block and materially advanced into measured Daisy Patch Submodule hardware/CPU work, a real panel-scan coupon and a decided four-layer Rev-A routing method.
3. **hermetic-modular/alchemy-sdk v0.12.0 — FOUNDATION_UPDATE** — tagged 2026-09-29 with real-time/control-plane fixes: rollover-safe timing, USB diagnostics, runtime descriptor refresh, trigger detection, corrected codec-CV scaling and stricter calibration validation.

No fresh Teensy project cleared the same source/build/licence/update-significance threshold. Current PJRC Audio Projects activity was inspected, but the surfaced phase-distortion and I2S/audio discussions did not resolve to a second newly released, reusable project with stronger primary evidence.

## Pre-flight / discovery audit

- Profile: `daily_broad`
- Repository main inspected at `08f0ec56e6e27d1d8a1cb543efa11dec34ae643d`
- Rules/state inspected: `README.md`, `AGENTS.md`, `rules/digest-rules-v0.3.md`, `rules/hidden-gems-discovery-protocol.md`, `rules/common-anti-repeat-policy.md`, `data/prompt-evolution-state.yaml`, source registry, publication/selected/common anti-repeat CSVs, recent watch state and relevant Codex-weekly history
- Recent unmerged watch findings from 2026-09-25 through 2026-09-29 were treated as fallback anti-repeat evidence
- Source surfaces attempted: Electro-Smith Daisy Community, PJRC Audio Projects, GitHub, Hackaday.io, Synthux, GitLab, Codeberg, SourceHut and lines/community searches
- Source classes: specialist forums, repositories, maker/project hubs, vendor/community project pages and alternative forges
- Query families: current-forum activity, fresh repository/release/commit searches, artifact/build/licence verification, lineage/update comparison
- Candidate pool: >10 plausible candidates
- Additional independent Daisy, Teensy, maker and alternative-host lanes were searched after publishable candidates appeared
- Codeberg and SourceHut direct discovery remained tool-limited; neither produced a verified candidate
- Registry additions: none. The reusable source surfaces used today were already known ecosystem/domain classes and did not justify a new page-level registry row
- Stop rule: satisfied after additional independent batches produced no further item that beat the promoted set

## 1. jonwaterschoot/TouchVink — PASS

**What it is**

A new feedback instrument for the Synthux Simple Touch / Daisy Seed, inspired by Jaap Vink's self-regulating feedback patches. The loop combines a variable delay, ring modulation, reverb, envelope-controlled VCA, distortion, noise/oscillator excitation and an onset-driven sample-and-hold steering path.

**Fresh evidence**

The project appeared 2026-09-29. v0.2 adds:

- bidirectional USB MIDI with note, pad, poly-aftertouch and CC mappings;
- soft pickup when MIDI owns a physical control;
- SysEx state/meter telemetry;
- optional 128×32 SSD1306 UI;
- an interactive browser manual that runs the same control semantics in simulation and mirrors a connected device;
- release-binary distribution instead of the obsolete v0.1 binary in-tree.

The repository is MIT licensed; DaisySP-LGPL `ReverbSc` retains LGPL licensing.

**Implementation highlights**

- Portable `dsp/engine.*` separated from libDaisy-specific hardware code.
- Desktop renderer: `make -C host && ./host/render`.
- Five host stress/listening scenarios are documented as running without NaN/runaway.
- Delay range is approximately 2 ms to 1.9 s.
- Loop gain can intentionally exceed unity; an envelope follower drives an inverse-gain VCA to keep the feedback loop bounded.
- Feedback memory has explicit clamps and DC/tape-bandwidth conditioning.
- Slow parameter work is decimated to every 16 samples.
- Firmware fits the 128 kB internal flash only narrowly: the current plan reports about 127.6 kB with USB MIDI + OLED, with control/UI code compiled `-Os` and DSP at `-O2`.
- Source build is explicit: recursive clone → `make libs` → `make` → DFU flash. A release binary is also intended for flash.daisy.audio.

**Hardware / electronics**

The target Synthux Simple Touch platform supplies a Daisy Seed, twelve capacitive touch pads, stereo input/output, six trim pots, two faders and two switches. TouchVink's hardware layer adds MPR121 pressure/velocity handling and an optional SSD1306 on the touch I2C bus. It does not publish a new custom PCB; hardware completeness belongs to the underlying Synthux platform.

**Why it matters**

The useful idea is not just another feedback synth. It demonstrates a compact embedded product split where the same control/state model exists on the pedal, over MIDI/SysEx and in a browser manual. That is directly reusable for Custom Pedals editor/manual/test tooling.

**Adaptation ideas**

- Reuse the browser-manual/device-mirror pattern for Multi-Delay parameter pages and diagnostics.
- Study the feedback AGC loop as a musically bounded alternative to a blunt limiter for freeze/self-oscillation modes.
- Reuse the physical-control pickup semantics for preset/MIDI ownership.
- Keep the portable DSP/host-renderer boundary as a model for algorithm regression before hardware flashing.

**Caveats / verification gaps**

- The author explicitly states v0.2 is **not yet tested on hardware**.
- OLED + MIDI + control code is extremely close to the 128 kB BOOT_NONE ceiling.
- The plan still requires CPU-load measurement; ReverbSc is expected to be the heaviest block.
- The display redraw may block the control loop for up to about 14 ms and still needs pad-latency validation on hardware.
- TRS MIDI is intentionally opt-in because the pinned libDaisy path has a documented UART-error risk with floating input.

**Primary sources**

- https://github.com/jonwaterschoot/TouchVink
- https://github.com/jonwaterschoot/TouchVink/commit/b6f082eac84e28017f9f229a6e0015ff99a040c9
- https://github.com/jonwaterschoot/TouchVink/blob/main/docs/PLAN.md
- https://www.synthux.academy/store/simple-touch-2

## 2. mcbronkowitch/fireflow — PASS / MATERIAL UPDATE

**Why the repeat is allowed**

FireFlow was recorded as a REF_PASS in the 2026-08-18 weekly-income lane. That block expired in September, and the project has changed materially: the portable engine now has extensive real-hardware timing data, the Patch-Submodule hardware effort has moved through a fabricated/measured test coupon, and on 2026-09-29 the Rev-A routing strategy was experimentally compared and fixed to a four-layer approach.

**Implementation / verification highlights**

- One portable engine runs in desktop renderer, VCV Rack and the future embedded shell; the repo reports 1011 deterministic Doctest cases.
- DSP now includes synth, granular sampler, wavetable, physical/resonator BODY, BBD and FEED engines plus shared modulation/reverb/dynamics.
- Real Daisy timing evidence is kept under `bench/` and `docs/bench/`.
- The project explicitly distinguishes Seed and Patch Submodule performance instead of pretending the same MCU headline makes them timing-identical.
- A selected BBD workload is reported around 96.91% of one audio block at `-O3`; another engine worst case on the Patch Submodule is still reported above deadline.
- Hardware bring-up uses a real coupon containing the intended muxes, shift registers, pots and reference dividers; multiple measurement rounds cover settling, crosstalk, codec tone, conversion wait and pot behavior.
- The first part of panel scanning is built and measured on that coupon.

**Fresh hardware change — 2026-09-29**

The project ran like-for-like routing experiments for Rev A and selected its own router on a **four-layer** stack. The measured winning run reported zero unresolved connections after plane fill, 36 router vias, 1733 mm routing and about 6.2 s execution. The surrounding commits add keepout/rule-area handling, plane stitching, proof gates, determinism checks and recorded failure modes rather than hiding red runs.

**Why it matters**

This is now more than a DSP concept. It is a useful reference for joining algorithm admission, benchmark evidence, generated hardware, PCB proof tooling and incremental coupon validation before committing to a dense control surface.

**Adaptation ideas**

- Borrow the benchmark discipline for worst-case Multi-FX graph admission.
- Reuse the coupon-first approach for UI mux/ADC/display/control validation before a full pedal carrier revision.
- Study the PCB proof/generation workflow as a regression gate around mechanically dense control boards.

**Caveats / verification gaps**

- The final M6 hardware is still not fabricated as a complete product.
- The repo itself reports one Patch-Submodule worst-case engine at about 102.27% average / 108.62% maximum, so the complete engine set does not yet fit every theoretical operating point.
- Intended ITCM placement currently does not link at the optimization level the project wants to ship.
- Several sound constants remain first-pass/by-ear values awaiting final hardware listening.

**Primary sources**

- https://github.com/mcbronkowitch/fireflow
- https://github.com/mcbronkowitch/fireflow/commit/f9ed2a4caa6795da5da40be5e683f261e207bb55
- https://github.com/mcbronkowitch/fireflow/commit/b5b5c636fd3173cd544cde7e0b79fa9da97c7a49

## 3. hermetic-modular/alchemy-sdk v0.12.0 — FOUNDATION_UPDATE

Tagged 2026-09-29. This is commercial/platform infrastructure, so it stays out of the community ranking lanes.

**Material changes**

- **Control-loop timebase:** fixes a reported ~50 ms stutter every ~21 s caused by raw counter wrap assumptions; new `TickTimebase` provides rollover-safe microsecond timing.
- **USB diagnostics:** bounded non-blocking log records plus typed live gauges; audio callbacks may publish scalar state while string formatting remains on the control/main side.
- **Host lifecycle:** HostLink can now run without a dummy preset store.
- **Runtime descriptor refresh:** firmware can rebuild and republish descriptor metadata while connected, with CRC/length-based host discovery and stable-storage constraints.
- **Selector consistency:** firmware, LED rings and browser now share the same selection bins.
- **Codec input triggers:** J1/J2 trigger detection is rebuilt around positive transitions with hysteresis/ringing rejection and an atomic edge latch.
- **J9/J10 CV conversion:** polarity/gain corrected for the Seed2-DFM DC-coupled codec output path.
- **Calibration:** stronger reference/noise/saturation/isolation/sweep/range checks plus post-write verification.

**Why it matters**

The rollover bug and ISR-safe diagnostics are exactly the class of control-plane defects that do not appear in a five-minute synth demo and then spend months impersonating random audio glitches.

**Adaptation**

Use the timebase, diagnostics/telemetry and descriptor-refresh patterns as references for Custom Pedals control-plane instrumentation and long-soak validation.

**Caveats**

- SDK remains beta and APIs/on-disk formats may change before a stable release.
- Codec CV conversion is circuit-derived, not per-board calibrated.
- The hardware/SDK belongs to Hermetic Modular's platform; this is a framework reference rather than a generic Daisy BSP recommendation.

**Primary sources**

- https://github.com/hermetic-modular/alchemy-sdk
- https://github.com/hermetic-modular/alchemy-sdk/commit/3f40b663297708c987c28bf36065c4d1047de375
- https://github.com/hermetic-modular/alchemy-sdk/blob/main/CHANGELOG.md

## HOLD / rejected

- **B1narySolutions/realtime-nam-seed3** — HOLD despite strong A2-Lite performance documentation and current setup/tooling work: no explicit root licence was verified.
- **FrankBoesing/ESP-beatsy-Audio-Library** — HOLD: fresh Teensy-Audio-style API port to ESP32/ES8388, but explicitly WIP and no root licence was verified.
- **rainybit-code/spore** — no alert: 2026-09-29 activity is a libDaisy/DaisySP submodule refresh, not a new product/architecture change.
- **eclectricat/reduc-6** — no alert: current change is README maintenance; underlying POC is interesting but not a fresh material delta.
- **Soundpauli/TŒRN** — not repeated: surfaced on 2026-09-28 and no additional material delta clears the fallback anti-repeat window.
- **tacertain/TeensyAudio-rs** — not repeated: surfaced on 2026-09-29; no commit newer than the biquad/ladder work already reported.
- **csabakeszegh/nam-pedal** — rejected as a fresh candidate: repository history is from February and points back to the existing TONE3000 lineage.
- **Current PJRC phase-distortion / I2S threads** — discovery signals only; no second newly released canonical project with equivalent source/build/licence evidence.

## Tracker rows

```csv
jonwaterschoot/TouchVink,PASS,2026-09-30,2026-09-30,2026-10-30,published,"Fresh Daisy Seed/Synthux Simple Touch feedback instrument: v0.2 source + release-binary path, portable host-rendered DSP, self-regulating feedback AGC, USB MIDI/SysEx/OLED and interactive browser manual; MIT code plus LGPL ReverbSc; compiles but explicitly not yet hardware-tested"
mcbronkowitch/fireflow,PASS,2026-08-18,2026-09-30,2026-10-30,published,"Material update since Aug REF_PASS: portable engine plus extensive Daisy timing evidence, measured Patch-Submodule control coupon, panel-scan bring-up and 2026-09-29 four-layer Rev-A routing/proof workflow; MIT; complete M6 hardware still unbuilt and some worst-case DSP workloads remain over deadline"
hermetic-modular/alchemy-sdk,FOUNDATION_UPDATE,2026-09-21,2026-09-30,2026-10-30,published,"v0.12.0 2026-09-29: rollover-safe control-loop timing fixing ~50 ms/21 s stutter, bounded USB diagnostics/gauges, runtime descriptor refresh, selector consistency, codec-trigger and CV-scaling fixes and stronger calibration validation; MIT, beta platform infrastructure"
```
