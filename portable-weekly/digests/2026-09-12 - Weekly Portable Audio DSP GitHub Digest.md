# 2026-09-12 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [micknoise/Maximilian](https://github.com/micknoise/Maximilian) | 1699 | 2025-01-04 | DSP library | Refactor | New - Maximilian's MIT self-contained C++ core combines PolyBLEP-capable oscillators, envelopes, filters, delay/modulation, granular and atom-synthesis building blocks and already documents embedded ESP32/Pi Pico use. |
| 2 | [cycfi/q](https://github.com/cycfi/q) | 1424 | 2026-09-10 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 3 | [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 188 | 2025-11-03 | DSP library | Direct | Returning - Header-only biquads cover all-pass, shelving, Linkwitz-Riley, Butterworth, band-stop, and constant-Q EQ forms already exercised on a Cortex-M4. |
| 4 | [hamiltonkibbe/FxDSP](https://github.com/hamiltonkibbe/FxDSP) | 67 | 2020-09-30 | DSP library | Refactor | New - FxDSP's MIT C modules include diode and polynomial saturators, an optocoupler model, Linkwitz-Riley filters, metering and sample-rate conversion as independently callable processors. |
| 5 | [analogcode/606-Inspired-Synth-Drums](https://github.com/analogcode/606-Inspired-Synth-Drums) | 35 | 2026-09-09 | Virtual analog | Direct | New - The MIT header-only kit synthesizes 606-style kick, snare, clap, toms and metallic hats per sample; its hats build named partials and the clap uses short measurement-fitted FIR coloration instead of samples. |
| 6 | [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 52 | 2026-01-20 | DSP library | Direct | Returning - The dependency-free 0BSD header turns parallel complex one-pole sections into an analytic signal, enabling compact frequency shifters and single-sideband effects. |
| 7 | [libraz/libsonare](https://github.com/libraz/libsonare) | 23 | 2026-09-12 | DSP library | Stretch | New - The Apache C++17 core exposes distinct Karplus-Strong, modal, FM, additive and physical-instrument voices inside a zero-runtime-dependency engine, alongside ADAA clipping and matched-Z/filterbank references. |
| 8 | [keithhetrick/bellweather-audio-core](https://github.com/keithhetrick/bellweather-audio-core) | 1 | 2026-09-11 | DSP library | Refactor | New - The Apache C++20 core provides BS.1770 loudness, true-peak and EBU loudness-range meters with published-reference conformance tests, allocation-free process checks and a JUCE layer kept above the reusable modules. |
| 9 | [jpcima/fverb](https://github.com/jpcima/fverb) | 18 | 2022-01-10 | Faust effect | Direct | Returning - Its single Faust file implements a Dattorro-style stereo reverb with staged diffusion, modulated feedback delays, damping, and left/right decorrelation. |
| 10 | [charCulbert/chardsp](https://github.com/charCulbert/chardsp) | 0 | 2026-09-11 | DSP library | Direct | New - The ISC C++17 headers combine an elliptic BLEP oscillator correction, fractional delay, all-pass diffusion, oversampling, SVF, envelopes and fixed voice-pool primitives without a plugin framework. |

---

## Highlights & Port Ideas

**1. [micknoise/Maximilian](https://github.com/micknoise/Maximilian)** Stars 1699 - pushed 2025-01-04 - Portability Refactor
> C++ Audio and Music DSP Library

Why it ports: The self-contained src/ synthesis core is separate from platform examples, but it is monolithic, double-heavy and uses vectors/files in broader classes, so a deliberately small float/fixed-storage subset is required. Evidence: src/maximilian.h, src/maximilian.cpp, src/libs/maxiSynths.h.

Added value: Maximilian's MIT self-contained C++ core combines PolyBLEP-capable oscillators, envelopes, filters, delay/modulation, granular and atom-synthesis building blocks and already documents embedded ESP32/Pi Pico use.

Port idea: Extract maxiOsc, maxiEnvGen, one filter and the small maxiSynths voice helpers; convert hot-path doubles to float, replace vectors with fixed storage, and leave file, FFT, RtAudio, browser and openFrameworks layers out.

**2. [cycfi/q](https://github.com/cycfi/q)** Stars 1424 - pushed 2026-09-10 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**3. [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters)** Stars 188 - pushed 2025-11-03 - Portability Direct
> DSP C++ audio filters

Why it ports: The filter families are header-only sample processors and the repository documents a real-time Cortex-M4 test, leaving only callback and parameter plumbing. Evidence: lib/biquad.h, lib/so_butterworth_lpf.h, lib/so_linkwitz_riley_lpf.h, lib/so_parametric_cq_boost.h.

Added value: Header-only biquads cover all-pass, shelving, Linkwitz-Riley, Butterworth, band-stop, and constant-Q EQ forms already exercised on a Cortex-M4.

Port idea: Lift the header-only coefficient and sample functions into a fixed Daisy/Teensy block, recalculate only on parameter changes, and flush denormals.

**4. [hamiltonkibbe/FxDSP](https://github.com/hamiltonkibbe/FxDSP)** Stars 67 - pushed 2020-09-30 - Portability Refactor
> An Audio DSP Library in C

Why it ports: The implemented DSP blocks are scalar C and host-independent, but setup uses malloc and the library mixes reusable filters/saturators with FFT code and an unfinished tape processor. Evidence: FxDSP/src/DiodeSaturator.c, FxDSP/src/PolySaturator.c, FxDSP/src/Optocoupler.c, FxDSP/src/LinkwitzRileyFilter.c.

Added value: FxDSP's MIT C modules include diode and polynomial saturators, an optocoupler model, Linkwitz-Riley filters, metering and sample-rate conversion as independently callable processors.

Port idea: Start with DiodeSaturator plus Linkwitz-Riley or Optocoupler, replace init-time malloc with caller-owned structs, and omit the unfinished TapeProcess plus FFT/analyser modules.

**5. [analogcode/606-Inspired-Synth-Drums](https://github.com/analogcode/606-Inspired-Synth-Drums)** Stars 35 - pushed 2026-09-09 - Portability Direct
> Original header-only C++ code for synthesized 606-style drums without samples or a plugin wrapper.

Why it ports: Each C++14 header owns a bounded mono voice with init, trigger and single-sample process calls; only the documented heavy T-06 hat variant needs to be excluded initially. Evidence: Source/BassDrum.hpp, Source/Clap.hpp, Source/HiHats.hpp, Source/Snare.hpp.

Added value: The MIT header-only kit synthesizes 606-style kick, snare, clap, toms and metallic hats per sample; its hats build named partials and the clap uses short measurement-fitted FIR coloration instead of samples.

Port idea: Port kick, snare and the lighter MetalHiHatVoice first as fixed mono voices; keep the explicitly CPU-heavy 18-modulator T-06 hats disabled until Cortex-M7 cycle measurements pass.

**6. [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir)** Stars 52 - pushed 2026-01-20 - Portability Direct
> IIR Hilbert filter: short, dependency-free, header-only C++

Why it ports: The runtime is a short dependency-free single header parameterized by sample rate; the FFT design utility is not required on the target. Evidence: hilbert.h, include/signalsmith-hilbert/hilbert.h.

Added value: The dependency-free 0BSD header turns parallel complex one-pole sections into an analytic signal, enabling compact frequency shifters and single-sideband effects.

Port idea: Compile the float header directly in a 48 kHz callback, validate phase and amplitude against its design tool, then map the complex output into a quadrature modulator.

**7. [libraz/libsonare](https://github.com/libraz/libsonare)** Stars 23 - pushed 2026-09-12 - Portability Stretch
> Dependency-free audio engine for C++, Python, Node.js and WASM with analysis, mastering, mixing and built-in instruments.

Why it ports: The native C++ core is dependency-free and its realtime engine is allocation-free, but the repository is a full analysis/mastering/DAW stack; only one fixed physical-model voice is a prudent MCU target. Evidence: src/midi/synth/native_synth.h, src/midi/synth/ks_voice.h, src/midi/synth/modal_voice.h, src/midi/synth/percussion_voice.h.

Added value: The Apache C++17 core exposes distinct Karplus-Strong, modal, FM, additive and physical-instrument voices inside a zero-runtime-dependency engine, alongside ADAA clipping and matched-Z/filterbank references.

Port idea: Extract one NativeSynth voice such as Karplus-Strong or the modal percussion path, freeze voice count and buffers, and exclude MIR, mastering, phase-vocoder, streaming, DAW and language-binding layers.

**8. [keithhetrick/bellweather-audio-core](https://github.com/keithhetrick/bellweather-audio-core)** Stars 1 - pushed 2026-09-11 - Portability Refactor
> Open-source C++ audio-core library with BS.1770 / EBU Tech 3341 conformance tests, RT-safety primitives, and a source-built JUCE reference plugin.

Why it ports: Meter process paths are tested allocation-free and the JUCE adapter is separate, but C++20 types, multi-rate test coverage and window/state ownership need a bounded Cortex-M7 configuration. Evidence: modules/bw_dsp_metering/include/bw_dsp_metering/Bs1770Meter.h, modules/bw_dsp_metering/include/bw_dsp_metering/TruePeakMeter.h, modules/bw_dsp_metering/include/bw_dsp_metering/LoudnessRange.h, modules/bw_audio_types/include/bw_audio_types/RtSmoothedParam.h.

Added value: The Apache C++20 core provides BS.1770 loudness, true-peak and EBU loudness-range meters with published-reference conformance tests, allocation-free process checks and a JUCE layer kept above the reusable modules.

Port idea: Port Bs1770Meter and TruePeakMeter with fixed channel/window storage for a recorder or pedal meter, retain the tested coefficient tables, and omit Barometer plus JUCE adapters.

**9. [jpcima/fverb](https://github.com/jpcima/fverb)** Stars 18 - pushed 2022-01-10 - Portability Direct
> Plugin version of reverb effect to include in sfizz

Why it ports: The Dattorro-style algorithm is available as one host-independent Faust file; plugin and third-party wrapper code is not needed for generated firmware C++. Evidence: fverb.dsp, plugins/fverb/dsp/Fverb.cpp, plugins/fverb/dsp/Fverb.hpp.

Added value: Its single Faust file implements a Dattorro-style stereo reverb with staged diffusion, modulated feedback delays, damping, and left/right decorrelation.

Port idea: Generate static C++, budget the predelay and eight diffusion/tank delays at 48 kHz, then reduce maximum predelay or modulation interpolation if SRAM or cycles are tight.

**10. [charCulbert/chardsp](https://github.com/charCulbert/chardsp)** Stars 0 - pushed 2026-09-11 - Portability Direct
> C++17 header-only audio DSP

Why it ports: The DSP is a small dependency-free C++17 header set with explicit oscillator, filter, envelope, delay and voice-pool types and no desktop host in the processing path. Evidence: chardsp/chardsp_EllipticBLEP.h, chardsp/chardsp_AllpassDiffuser.h, chardsp/chardsp_FractionalDelayLine.h, chardsp/chardsp_Oversampler.h.

Added value: The ISC C++17 headers combine an elliptic BLEP oscillator correction, fractional delay, all-pass diffusion, oversampling, SVF, envelopes and fixed voice-pool primitives without a plugin framework.

Port idea: Build one EllipticBLEP oscillator through the SVF and ADSR, use fixed-capacity delay and voice storage, then add the diffuser or oversampler only after flash and cycle profiling.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-09-10 | Updated |
| [NO CHANGE] [thestk/stk](https://github.com/thestk/stk) | 2025-03-29 | No change |
| [NO CHANGE] [SamiPerttu/fundsp](https://github.com/SamiPerttu/fundsp) | 2026-03-03 | No change |
| [NO CHANGE] [Chowdhury-DSP/ChowMatrix](https://github.com/Chowdhury-DSP/ChowMatrix) | 2022-07-16 | No change |
| [NO CHANGE] [hollance/mda-plugins-juce](https://github.com/hollance/mda-plugins-juce) | 2026-02-25 | No change |
| [NO CHANGE] [Chowdhury-DSP/ChowKick](https://github.com/Chowdhury-DSP/ChowKick) | 2023-01-16 | No change |
| [NO CHANGE] [Signalsmith-Audio/basics](https://github.com/Signalsmith-Audio/basics) | 2026-08-26 | No change |
| [NO CHANGE] [PaulBatchelor/Soundpipe](https://github.com/PaulBatchelor/Soundpipe) | 2024-01-14 | No change |
| [NO CHANGE] [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 2022-04-14 | No change |
| [UPDATED] [atbran/aeriform](https://github.com/atbran/aeriform) | 2026-09-12 | Updated |

---

*Generated: 12 September 2026 - GitHub REST API - 20/20 queries successful - ~183 unique non-fork repos evaluated*

