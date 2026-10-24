# 2026-10-24 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1444 | 2026-10-22 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [madrona-labs/madronalib](https://github.com/madrona-labs/madronalib) | 335 | 2026-10-17 | DSP library | Stretch | Returning - Madronalib's mature MIT source/DSP layer combines vectorized filters, delays, generators, routing, resampling and approximation math behind one header-only include, separately from its RtAudio and VST examples. |
| 3 | [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp) | 278 | 2026-10-20 | DSP library | Refactor | Returning - The MIT C++11 headers combine fractional/multi-tap delay, cubic curves, envelope utilities, multirate helpers, FFT/STFT and spectral-processing primitives behind small independent includes. |
| 4 | [hasenbanck/resampler](https://github.com/hasenbanck/resampler) | 33 | 2026-10-10 | DSP library | Refactor | Returning - The dual-licensed Rust crate provides both a 16-64 sample-latency polyphase FIR and a mixed-radix FFT resampler, with f32 scalar and ARM NEON kernels plus explicit no_std support. |
| 5 | [CuteDSP/RSCuteDSP](https://github.com/CuteDSP/RSCuteDSP) | 26 | 2026-06-17 | DSP library | Refactor | Returning - The MIT Rust port exposes Signalsmith-derived delays, filters, FFT/STFT, convolution, time stretching, phase rotation and room-spacing blocks in one library with generic f32-capable APIs. |
| 6 | [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 19 | 2026-10-13 | DSP library | Refactor | Re-entry: updated - The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile. |
| 7 | [SpotlightKid/adt](https://github.com/SpotlightKid/adt) | 21 | 2024-12-28 | Faust effect | Stretch | Returning - The MIT Faust kernel creates four-voice automatic double tracking from independent delay, pitch and pan spreads plus wet filtering, with generated standalone C++ separated from its DPF plugin wrapper. |
| 8 | [tpt-solutions/tpt-dsp](https://github.com/tpt-solutions/tpt-dsp) | 0 | 2026-10-20 | DSP library | Refactor | Returning - The dual-licensed Rust core provides no_std scalar filters, FFT/DCT/Hilbert, ring buffers and caller-buffer processing, while the adjacent audio crate supplies concrete FM, wavetable, subtractive, waveshaper, delay and EQ references. |
| 9 | [Ion3rik/JonssonicDSP](https://github.com/Ion3rik/JonssonicDSP) | 11 | 2026-03-06 | DSP library | Refactor | Returning - JonssonicDSP's MIT header set exposes scalar TPT/SVF filters, waveshaping, oversampling, modulated delays and a configurable feedback-delay-network reverb with readable per-sample APIs. |
| 10 | [khenderson20/sonic-forge-dsp](https://github.com/khenderson20/sonic-forge-dsp) | 1 | 2026-05-10 | DSP library | Direct | Returning - The MIT C++17 modules provide PolyBLEP oscillators, a Cytomic/Zavalishin ZDF state-variable filter, third-order Lagrange fractional delay, a Buchla-style wavefolder, smoothing, and 61 host tests without runtime dependencies. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1444 - pushed 2026-10-22 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [madrona-labs/madronalib](https://github.com/madrona-labs/madronalib)** Stars 335 - pushed 2026-10-17 - Portability Stretch
> Madronalib: a C++ framework for DSP applications.

Why it ports: The header-only DSP layer is cleanly separated, but its four-lane math backend selects SSE4.1 or NEON with no Cortex-M7 scalar fallback and many processors own dynamic vectors. Evidence: source/DSP/MLDSPFilters.h, source/DSP/MLDSPDelays.h, source/DSP/MLDSPResampling.h, source/DSP/MLDSPGens.h.

Added value: Madronalib's mature MIT source/DSP layer combines vectorized filters, delays, generators, routing, resampling and approximation math behind one header-only include, separately from its RtAudio and VST examples.

Port idea: Implement a four-lane scalar float backend for MLDSPMathSIMD, then extract one filter-plus-delay chain with fixed buffers; leave matrix, networking, dynamic graph and FFT support out of the first Cortex-M7 build.

**3. [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp)** Stars 278 - pushed 2026-10-20 - Portability Refactor
> GitHub mirror of Signalsmith Audio's C++ DSP support library

Why it ports: The C++11 headers are host-independent, but delay and spectral classes own dynamic storage at setup; firmware should select small modules and replace those buffers with bounded caller-owned memory. Evidence: curves.h, include/signalsmith-dsp/curves.h, delay.h, include/signalsmith-dsp/delay.h.

Added value: The MIT C++11 headers combine fractional/multi-tap delay, cubic curves, envelope utilities, multirate helpers, FFT/STFT and spectral-processing primitives behind small independent includes.

Port idea: Start with delay.h plus envelopes.h, provide caller-owned fixed storage for the delay, and defer FFT/spectral modules until SRAM and cycle budgets are measured.

**4. [hasenbanck/resampler](https://github.com/hasenbanck/resampler)** Stars 33 - pushed 2026-10-10 - Portability Refactor
> Resampler optimized for audio

Why it ports: The crate has no_std, scalar and NEON implementations and preallocated processing buffers, but it still requires alloc/Vec/Arc and its NEON kernel targets AArch64 rather than Cortex-M7. Evidence: src/resampler_fir.rs, src/fir/neon.rs, src/window.rs.

Added value: The dual-licensed Rust crate provides both a 16-64 sample-latency polyphase FIR and a mixed-radix FFT resampler, with f32 scalar and ARM NEON kernels plus explicit no_std support.

Port idea: Start with the FIR path and scalar convolution, prebuild its 32-128 tap tables off the audio callback, replace alloc-owned buffers with a board arena, and benchmark the existing AArch64 NEON kernel only as an algorithm reference.

**5. [CuteDSP/RSCuteDSP](https://github.com/CuteDSP/RSCuteDSP)** Stars 26 - pushed 2026-06-17 - Portability Refactor
> A Rust library for audio and signal processing

Why it ports: Useful scalar modules are host-independent, but the advertised no_std build retains unconditional std references and most delay, spectral and spatial processors depend on alloc-backed Vec storage. Evidence: src/delay.rs, src/filters.rs, src/stretch.rs, src/convolver.rs.

Added value: The MIT Rust port exposes Signalsmith-derived delays, filters, FFT/STFT, convolution, time stretching, phase rotation and room-spacing blocks in one library with generic f32-capable APIs.

Port idea: Extract the delay and biquad modules first, replace Vec storage with fixed-capacity buffers, repair unconditional std constants/imports in the advertised no_std build, and defer STFT, convolution and time stretching until memory profiling passes.

**6. [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark)** Stars 19 - pushed 2026-10-13 - Portability Refactor
> Header-only C++20 audio DSP for real-time and offline processing. Filters, effects, analog circuit models, automatic dynamics, stereo tools, analysis and EBU R128 metering. Dependency-free DSP core with optional VST3, CLAP and Audio Unit adapters.

Why it ports: Individual header models keep allocation in prepare(), but C++20, dynamic setup storage, calibration work, and optional heavyweight processors require a deliberately small firmware subset. Evidence: Effects/TapeMachine.h, Effects/TubePreamp.h, Effects/TransformerModel.h, Core/AudioBuffer.h.

Added value: The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile.

Port idea: Port one TransformerModel or TubePreamp block, preallocate its channel state, start at 1x oversampling, and leave convolution, phase-vocoder, and 64-grain processors out of the firmware build.

**7. [SpotlightKid/adt](https://github.com/SpotlightKid/adt)** Stars 21 - pushed 2024-12-28 - Portability Stretch
> Automatic double tracking plugin (not only) for vocals

Why it ports: Faust separates the DSP cleanly, but the generated four-voice pitch/delay engine reserves about 2.25 MiB of float delay storage, exceeding internal Daisy Seed and Teensy 4.x memory. Evidence: faust/adt.dsp, plugins/adt/ADT.cpp.

Added value: The MIT Faust kernel creates four-voice automatic double tracking from independent delay, pitch and pan spreads plus wet filtering, with generated standalone C++ separated from its DPF plugin wrapper.

Port idea: Regenerate a two-voice float kernel with much smaller pitch/delay maxima and fixed controls; the checked-in four-voice C++ reserves 589,824 floats (about 2.25 MiB) before other state, so it cannot use internal Daisy/Teensy RAM unchanged.

**8. [tpt-solutions/tpt-dsp](https://github.com/tpt-solutions/tpt-dsp)** Stars 0 - pushed 2026-10-20 - Portability Refactor
> Pure-Rust, real-time-safe DSP framework — zero-allocation audio/RF/control processing for desktop, WebAssembly, and no_std embedded targets. Dual-licensed MIT/Apache-2.0.

Why it ports: tpt-dsp-core genuinely builds no_std with a stable scalar fallback, but the synth/effect crate still relies on std, Vec and Box, so only core primitives are direct and musical blocks need fixed-storage rewrites. Evidence: tpt-dsp-core/src/filters.rs, tpt-dsp-core/src/ring.rs, tpt-dsp-core/src/simd_scalar.rs, tpt-dsp-audio/src/oscillator.rs.

Added value: The dual-licensed Rust core provides no_std scalar filters, FFT/DCT/Hilbert, ring buffers and caller-buffer processing, while the adjacent audio crate supplies concrete FM, wavetable, subtractive, waveshaper, delay and EQ references.

Port idea: Start with tpt-dsp-core --no-default-features and its scalar backend on thumbv7em; port one oscillator or waveshaper from tpt-dsp-audio to fixed arrays instead of bringing over its Vec/Box graph and convolution reverb.

**9. [Ion3rik/JonssonicDSP](https://github.com/Ion3rik/JonssonicDSP)** Stars 11 - pushed 2026-03-06 - Portability Refactor
> A Modular Realtime C++ Audio DSP Library.

Why it ports: Processing is scalar and host-independent, but channels, delay lines, oversamplers, matrices and some pointer helpers use dynamic vectors that must become bounded firmware storage. Evidence: include/jonssonic/models/reverb/feedback_delay_network.h, include/jonssonic/core/oversampling/oversampler.h, include/jonssonic/core/nonlinear/wave_shaper.h, include/jonssonic/core/filters/state_variable_filter.h.

Added value: JonssonicDSP's MIT header set exposes scalar TPT/SVF filters, waveshaping, oversampling, modulated delays and a configurable feedback-delay-network reverb with readable per-sample APIs.

Port idea: Freeze one mono or stereo SVF-plus-FDN configuration, replace prepare-time std::vector storage and pointer-vector helpers with fixed arrays, and omit the FFT utility layer.

**10. [khenderson20/sonic-forge-dsp](https://github.com/khenderson20/sonic-forge-dsp)** Stars 1 - pushed 2026-05-10 - Portability Direct
> A high-performance, real-time C++ Digital Signal Processing (DSP) library designed for modular synthesis and low-latency audio applications.

Why it ports: Oscillator, ZDF filter, waveshaper and smoother have fixed processing state and zero runtime dependencies; only the vector-owned DelayLine needs caller-provided storage or omission. Evidence: include/sonicforge/oscillator.hpp, include/sonicforge/state_variable_filter.hpp, include/sonicforge/delayline.hpp, include/sonicforge/waveshaper.hpp.

Added value: The MIT C++17 modules provide PolyBLEP oscillators, a Cytomic/Zavalishin ZDF state-variable filter, third-order Lagrange fractional delay, a Buchla-style wavefolder, smoothing, and 61 host tests without runtime dependencies.

Port idea: Port the oscillator, SVF, waveshaper, and smoother directly; give DelayLine a caller-owned fixed buffer before enabling it, and map atomic parameter setters to control-rate updates.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-10-22 | Updated |
| [NO CHANGE] [thestk/stk](https://github.com/thestk/stk) | 2025-03-29 | No change |
| [NO CHANGE] [SamiPerttu/fundsp](https://github.com/SamiPerttu/fundsp) | 2026-03-03 | No change |
| [NO CHANGE] [Chowdhury-DSP/ChowMatrix](https://github.com/Chowdhury-DSP/ChowMatrix) | 2022-07-16 | No change |
| [NO CHANGE] [Chowdhury-DSP/ChowKick](https://github.com/Chowdhury-DSP/ChowKick) | 2023-01-16 | No change |
| [NO CHANGE] [hollance/mda-plugins-juce](https://github.com/hollance/mda-plugins-juce) | 2026-02-25 | No change |
| [NO CHANGE] [Signalsmith-Audio/basics](https://github.com/Signalsmith-Audio/basics) | 2026-09-30 | No change |
| [NO CHANGE] [PaulBatchelor/Soundpipe](https://github.com/PaulBatchelor/Soundpipe) | 2024-01-14 | No change |
| [UPDATED] [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 2026-10-13 | Updated |
| [NO CHANGE] [atbran/aeriform](https://github.com/atbran/aeriform) | 2026-09-26 | No change |

---

*Generated: 24 October 2026 - GitHub REST API - 35/35 queries successful - ~214 unique non-fork repos evaluated*
