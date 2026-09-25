# Daisy + Teensy Watch — 2026-09-25

## Executive summary
Three independent Daisy projects and one foundation update clear the bar:
1. GSNautilus/ammonite v0.2.0 — **STRONG_PASS**
2. vdo/mulhverb — **PASS**
3. skngh/RidgeField — **PASS**
4. daisyaudio/libDaisy Seed3 DevKits #717 — **FOUNDATION_UPDATE**

No fresh Teensy item cleared the same fresh-change + primary-source + licence bar. PJRC Audio Projects is active, but the currently surfaced reverb/phase-distortion threads did not resolve to a newly published licensed source artifact strong enough to promote.

## Discovery / anti-repeat
Inspected current README/AGENTS/rules, published/selected/common anti-repeat state, source registry, the 2026-09-21 and 2026-09-23 Daisy/Teensy watch digests, and current Codex-weekly history. PZD (2026-09-21) and Ceres (2026-09-23) remain hard-blocked absent a new material update.

Searched Electro-Smith forum, PJRC forum, GitHub current-push/release/commit lanes, Hackaday, Synthux, GitLab, Codeberg and SourceHut. Candidate pool exceeded 10 leads. No new reusable low-SEO source hub was found; qualifying discoveries were project repositories.

## 1. GSNautilus/ammonite v0.2.0 — STRONG_PASS
Published 2026-09-24. The release adds a Windows VST3/CLAP target around the same portable engine used by Daisy Seed3 firmware and still carries a ready-to-flash 118,300-byte `ammonite.bin` (SHA-256 `23c204b19562de5af4c11594468290822e9b31678e02f0c28b1eebbb284bf34e`).

Engineering value:
- portable C++14 musical engine separated from the Daisy shell;
- exact-engine PC simulator and 193 headless checks;
- v0.2.0 DAW tempo/bar/playhead sync, 169 automatable parameters, state/multi-instance and 44.1–192 kHz host tests;
- three arpeggiated voices with independent synthesis/modulation and stereo echo;
- Daisy Web Programmer binary plus reproducible source build.

Hardware is intentionally simple: Seed3, round GC9A01 SPI display, 12 pots, stereo output and 3D-printed enclosure on breadboard wiring.

**Adaptation:** use the shared embedded/desktop engine pattern for Multi-Delay host regression and deterministic transport testing.

**Caveats:** Seed CPU load remains a TODO; hardware is breadboard-level; ReverbSc is LGPL-2.1 while project code is MIT.

Sources: https://github.com/GSNautilus/ammonite · https://github.com/GSNautilus/ammonite/releases/tag/v0.2.0

## 2. vdo/mulhverb — PASS
Fresh Daisy Patch SM CloudSeed adaptation, first published 2026-09-21 with a material 2026-09-24 update.

Engineering value:
- native 48 kHz stereo late network: six active lines/channel, four modulated allpasses/line;
- static storage, no audio-path heap;
- Size changes use 80 ms crossfades between fixed base read positions;
- freeze glides modulated heads to fixed integer taps, excludes new input, uses unity loop gain and bypasses absorption, then glides back;
- host tests, UBSan, upstream comparison, spectral analysis and DWT-style timing evidence;
- earlier flashed six-line variants recorded zero misses/late callbacks in their logged live windows, with live maxima in the mid-80% range of the 320,000-cycle / 32-frame budget.

**Adaptation:** strong reference for Multi-Delay FREEZE/diffusion transitions and callback-deadline instrumentation.

**Caveat:** newest Chaos/reseed HEAD passes host checks but is explicitly not yet flashed/measured; CPU stress margin remains tight.

Sources: https://github.com/vdo/mulhverb · https://github.com/vdo/mulhverb/blob/main/VALIDATION.md

## 3. skngh/RidgeField — PASS
New 2026-09-24 Daisy Seed guitar pedal ecosystem: guitar-side XIAO ESP32-C3 → BLE → pedal-side XIAO ESP32-C3 → 115200-baud UART/DMA → Daisy DSP.

Evidence includes editable KiCad main/server boards, BOM, pick-and-place, Gerbers, FreeCAD, STLs and a 1590B drilling template. Daisy runs at 48 kHz / 4-sample blocks with delay, pitch shift, bitcrusher and reverb/saturation; QSPI stores LDR calibration.

**Why it matters:** radio/network work is kept off the DSP MCU behind a bounded framed UART transport.

**Adaptation:** good wireless editor/control partition reference; improve it with coherent frame snapshots/sequence counters and stricter RF/analog return-current design.

**Caveat:** the author explicitly reports audible wireless/data-transfer beeps, excess HF noise and a missing output LPF in V1. Treat those as release blockers, not charming prototype personality.

Source: https://github.com/skngh/RidgeField

## Foundation update — daisyaudio/libDaisy
Commit `facb66c76b5482918741695f4268b0185e474644` merged 2026-09-24. Seed3 DevKits #717 adds Eurorack/Pedal/Desktop devkit sources and templates, `DigitalControl` debouncing for non-GPIO objects, and CMake integration. The attempted C++17 change was reverted; resulting code stays C++14.

Source: https://github.com/daisyaudio/libDaisy/commit/facb66c76b5482918741695f4268b0185e474644

## HOLD / rejected
- **ideocentric/caryatid — HOLD:** boards are physically in hand and inspection exposed a real J13 facing/extraction hazard, but README still says none has been powered. Recheck after powered bring-up.
- **jagnat/daisy_pot — HOLD:** fresh dev-PCB checkpoint/PolyBLEP work, but no README/licence; latest commit explicitly says first dev PCB has no inputs.
- **ryanthomasdonald/toslink-audio-transport — HOLD:** useful Teensy transport remains without explicit repository licence.
- **PJRC current reverb / phase-distortion threads — HOLD:** fresh forum signal, unresolved canonical newly licensed source/release.
- **bbw1081/DaisySeed-MultiFXPedal — no re-promotion:** 2026-09-24 activity is TODO-list churn, not a material DSP/hardware/build update.
- **hexeguitar/hexefx_audiolib_F32 — no re-promotion:** strong Teensy reference, but latest repository commit is 2025-05-26.
