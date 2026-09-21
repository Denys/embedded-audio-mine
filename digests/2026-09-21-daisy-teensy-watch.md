# Embedded Audio Mine — Daisy / Teensy watch — 2026-09-21

## Executive summary

One item clears the alert bar: **basscheffers/VERBtrix**, a newly published MIT Teensy 4.x stereo reverb library with a host-testable DSP core, a drop-in Teensy Audio `AudioStream` wrapper, an 8-line modulated FDN, 6-point Lagrange interpolation, frequency-dependent RT60 control, freeze, presets, and actual offline measurement/parameter-sweep harnesses. The Teensy-side CPU figure in its README is an estimate, not a measurement verified in this run, so treat the architecture and host validation as the immediate value and profile it on hardware before adopting it.

No Daisy item from the current search beat the threshold. `rainybit-code/spore` remains technically strong, but its 2026-09-07 v0.5.1 release is explicitly a libDaisy maintenance bump with no functional firmware change. `chrisades/Ceres` is fresh and active but currently only a hardware/control skeleton with a silent audio callback. Several fresh PJRC forum threads are promising but source-thin.

## Pre-flight / discovery audit

- Rules/state inspected: `README.md`, `AGENTS.md`, `rules/digest-rules-v0.3.md`, `rules/hidden-gems-discovery-protocol.md`, `rules/common-anti-repeat-policy.md`, `data/prompt-evolution-state.yaml`, canonical daily publication state, common anti-repeat index, and recent Codex weekly history through 2026-09-15.
- Hard anti-repeat check: `VERBtrix` had no hit in repository publication/selection state; `t-dsp/t-dsp_software` is blocked by the 2026-09-15 Codex weekly publication window.
- Search surfaces: PJRC Audio Projects and Blog Project Submission, Electro-Smith forum searches, GitHub current repositories/commits, Hackaday.io, GitLab, synth-diy archives, plus Codeberg attempted but blocked by the web fetcher.
- Query families: platform/current-activity, host-specific forum discovery, and artifact/repository verification.
- Plausible candidates inspected: 10+ including VERBtrix, Spore, Ceres, T-DSP, Cranberry Synth, TeensyMixSynth, Mixtee, Teensy 8x8 TDM board, Audio Node Studio, NOMAD, and fresh PJRC audio/tutorial threads.
- Stop condition: after the first qualifying item, additional independent GitHub/non-GitHub lanes produced no second candidate with comparable current evidence and reuse value.

## Ranked entries

### 1) basscheffers/VERBtrix — **STRONG_PASS**

**Technical summary:**

A Teensy 4.0/4.1 stereo reverb library designed as a normal Teensy Audio object (`AudioStream`, 2-in/2-out) with the DSP split into an Arduino-independent float core. The repository was created 2026-09-17 and was still being updated on 2026-09-18.

**Why it matters:**

The useful part is not another collection of hall presets. The code exposes a fairly serious reverb architecture in a form that can be tested on a host and then embedded: 4 series input allpasses feeding an 8-line modulated FDN, 8x8 Hadamard feedback mixing, per-line bass/high shelves derived from target decay, in-loop diffusion, early taps, and fractional delay handled with 6-point Lagrange interpolation. That is directly relevant to Teensy Audio and also a useful reference for Daisy FDN/diffused-delay work.

**Implementation highlights:**

- Teensy Audio drop-in wrapper plus portable `VintageReverbCore`.
- ~268 kB float delay memory; external memory can be supplied explicitly on Teensy 4.1.
- 8 modulated tank lines with 6-point Lagrange reads.
- Frequency-dependent RT60 control and bounded in-loop shelving.
- Freeze, bypass/reset, smoothing, 8 space types and 32 named presets.
- Host-side `test_reverb.cpp`, `param_sweep.cpp`, and `ir_dump.cpp` are present; the README reports RT60, stability, echo-density, stereo-correlation and parameter-change checks.
- Explicit MIT license.

**Hardware/electronics notes:**

No custom hardware is required beyond Teensy 4.x audio I/O; the library is intended to sit inside the existing Teensy Audio Library graph. The 268 kB state allocation is meaningful for larger graphs. The default heap allocation can be replaced with caller-provided memory/`EXTMEM` on Teensy 4.1.

**Platform relevance:**

- **Teensy 4.x:** immediate fit.
- **Daisy:** the Arduino-independent core is a useful port/reference candidate, but the Teensy wrapper and memory strategy are not directly portable.

**Adaptation ideas:**

1. Port only the core to a Daisy host harness and compare decay/CPU against `DAFX_2_Daisy_lib` and DaisySP reverb candidates.
2. Reuse the offline RT60/stability/parameter-sweep methodology as a regression harness for the Multi-Delay pedal's future diffusion/FDN lane.
3. Benchmark 6-point Lagrange versus cheaper interpolation in a feedback loop instead of deciding from one-pass frequency response.

**Quick engineering assessment:**

Unusually good reference value for a brand-new small repo because the architecture, wrapper boundary, license, examples and test harness are all visible. The project-reported measurements are useful evidence, but were not rerun here. The README's projected **10–15% Teensy CPU load is only an estimate**; measure callback usage and overruns on a Teensy 4.x before using it in a multi-effect graph.

**Caveats / verification gaps:**

- Host tests were inspected, not executed in this watch run.
- No independent Teensy CPU/overrun measurement was verified.
- No tagged GitHub release asset was required for promotion; installation is source/library based.
- Long-decay/freeze behavior should be rechecked with the actual Teensy sample/block configuration and memory placement.

**Primary sources:**

- https://github.com/basscheffers/VERBtrix
- https://forum.pjrc.com/ — current Audio Projects listing: `New Reverb Published by me`

---

## HOLD / watchlist

| Item | Lane | Reason / promotion trigger |
|---|---:|---|
| PJRC `NOMAD - Cyberpunk2077 inspired guitar project` | HOLD | Fresh forum/blog activity, but no source repository or primary firmware/hardware artifacts were verified. Promote when source/build/hardware evidence is public. |
| PJRC `Audio Node Studio` | HOLD | Current forum activity but no canonical source repository resolved in this run. |
| PJRC PCM5102A 60 kHz tutorial thread | HOLD | Fresh and potentially useful, but code/measurement details were not retrievable enough to verify the engineering claim. |
| chrisades/Ceres | HOLD | Fresh Daisy Seed + Synthux Touch2 repo, GPL-3.0 and build skeleton present, but current `AudioCallback` outputs silence and touch handlers are placeholders. Promote after actual synthesis/DSP lands. |
| rainybit-code/spore | HOLD | Strong Daisy/Hothouse firmware, but latest v0.5.1 (2026-09-07) explicitly says the libDaisy bump causes no functional firmware change; not a meaningful update for this watch. |

## Rejected / not promoted

| Project/source group | Decision | Reason |
|---|---:|---|
| t-dsp/t-dsp_software | DUPLICATE | Published in Codex weekly on 2026-09-15; 30-day hard anti-repeat block applies absent a newer material update. |
| phjanderson/TeensyMixSynth | REJECT | Last main commit is 2025-05-25; no current update. |
| NeiroCash/TeensyMixer | REJECT | Current development is a Teensy-driven Windows application-volume control surface, not an embedded audio signal path. |
| openaudiotools/mixtee | HOLD / prior | Already recorded as HOLD on 2026-08-31 and still pre-prototype; no verified material revision promoted it today. |

## Tracker update row

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
basscheffers/VERBtrix,STRONG_PASS,2026-09-21,2026-09-21,2026-10-21,published,New MIT Teensy 4.x stereo modulated-FDN reverb library with portable float core 6-point Lagrange fractional delays frequency-dependent RT60 freeze and host RT60/stability/parameter-sweep test harness; hardware CPU estimate remains unverified
```
