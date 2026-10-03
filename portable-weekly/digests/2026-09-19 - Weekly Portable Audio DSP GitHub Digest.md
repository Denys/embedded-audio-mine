# 2026-09-19 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1422 | 2026-09-17 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [madrona-labs/madronalib](https://github.com/madrona-labs/madronalib) | 336 | 2026-09-16 | DSP library | Stretch | New - Madronalib's mature MIT source/DSP layer combines vectorized filters, delays, generators, routing, resampling and approximation math behind one header-only include, separately from its RtAudio and VST examples. |
| 3 | [CuteDSP/RSCuteDSP](https://github.com/CuteDSP/RSCuteDSP) | 25 | 2026-06-17 | DSP library | Refactor | New - The MIT Rust port exposes Signalsmith-derived delays, filters, FFT/STFT, convolution, time stretching, phase rotation and room-spacing blocks in one library with generic f32-capable APIs. |
| 4 | [hasenbanck/resampler](https://github.com/hasenbanck/resampler) | 33 | 2026-08-10 | DSP library | Refactor | New - The dual-licensed Rust crate provides both a 16-64 sample-latency polyphase FIR and a mixed-radix FFT resampler, with f32 scalar and ARM NEON kernels plus explicit no_std support. |
| 5 | [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 33 | 2020-04-08 | Faust effect | Direct | Returning - Crossroads evolves gain-and-delay effect topologies offline and emits Faust, making it a useful source of generated comb, FIR, soft-clip, and delay structures rather than a runtime dependency. |
| 6 | [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 5 | 2026-09-16 | JUCE synth | Refactor | Returning - Its Apache-licensed DSP folder includes a fixed-pool procedural drum engine covering 16 percussion types plus a stereo fixed-array analog delay, independent of the optional sample ROMpler. |
| 7 | [SpotlightKid/adt](https://github.com/SpotlightKid/adt) | 20 | 2024-12-28 | Faust effect | Stretch | New - The MIT Faust kernel creates four-voice automatic double tracking from independent delay, pitch and pan spreads plus wet filtering, with generated standalone C++ separated from its DPF plugin wrapper. |
| 8 | [tpt-solutions/tpt-dsp](https://github.com/tpt-solutions/tpt-dsp) | 0 | 2026-09-15 | DSP library | Refactor | New - The dual-licensed Rust core provides no_std scalar filters, FFT/DCT/Hilbert, ring buffers and caller-buffer processing, while the adjacent audio crate supplies concrete FM, wavetable, subtractive, waveshaper, delay and EQ references. |
| 9 | [Ion3rik/JonssonicDSP](https://github.com/Ion3rik/JonssonicDSP) | 11 | 2026-03-06 | DSP library | Refactor | New - JonssonicDSP's MIT header set exposes scalar TPT/SVF filters, waveshaping, oversampling, modulated delays and a configurable feedback-delay-network reverb with readable per-sample APIs. |
| 10 | [xikxp1/bs2b](https://github.com/xikxp1/bs2b) | 1 | 2026-07-13 | DSP library | Refactor | New - This MIT Rust crate implements Bauer stereo-to-binaural crossfeed with reference-vector tests, streaming state, no_std support and allocation-free frame processing, a useful headphone block absent from stock embedded audio libraries. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1422 - pushed 2026-09-17 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [madrona-labs/madronalib](https://github.com/madrona-labs/madronalib)** Stars 336 - pushed 2026-09-16 - Portability Stretch
> Madronalib: a C++ framework for DSP applications.

Why it ports: The header-only DSP layer is cleanly separated, but its four-lane math backend selects SSE4.1 or NEON with no Cortex-M7 scalar fallback and many processors own dynamic vectors. Evidence: source/DSP/MLDSPFilters.h, source/DSP/MLDSPDelays.h, source/DSP/MLDSPResampling.h, source/DSP/MLDSPGens.h.

Added value: Madronalib's mature MIT source/DSP layer combines vectorized filters, delays, generators, routing, resampling and approximation math behind one header-only include, separately from its RtAudio and VST examples.

Port idea: Implement a four-lane scalar float backend for MLDSPMathSIMD, then extract one filter-plus-delay chain with fixed buffers; leave matrix, networking, dynamic graph and FFT support out of the first Cortex-M7 build.

**3. [CuteDSP/RSCuteDSP](https://github.com/CuteDSP/RSCuteDSP)** Stars 25 - pushed 2026-06-17 - Portability Refactor
> A Rust library for audio and signal processing

Why it ports: Useful scalar modules are host-independent, but the advertised no_std build retains unconditional std references and most delay, spectral and spatial processors depend on alloc-backed Vec storage. Evidence: src/delay.rs, src/filters.rs, src/stretch.rs, src/convolver.rs.

Added value: The MIT Rust port exposes Signalsmith-derived delays, filters, FFT/STFT, convolution, time stretching, phase rotation and room-spacing blocks in one library with generic f32-capable APIs.

Port idea: Extract the delay and biquad modules first, replace Vec storage with fixed-capacity buffers, repair unconditional std constants/imports in the advertised no_std build, and defer STFT, convolution and time stretching until memory profiling passes.

**4. [hasenbanck/resampler](https://github.com/hasenbanck/resampler)** Stars 33 - pushed 2026-08-10 - Portability Refactor
> Resampler optimized for audio

Why it ports: The crate has no_std, scalar and NEON implementations and preallocated processing buffers, but it still requires alloc/Vec/Arc and its NEON kernel targets AArch64 rather than Cortex-M7. Evidence: src/resampler_fir.rs, src/fir/neon.rs, src/window.rs.

Added value: The dual-licensed Rust crate provides both a 16-64 sample-latency polyphase FIR and a mixed-radix FFT resampler, with f32 scalar and ARM NEON kernels plus explicit no_std support.

Port idea: Start with the FIR path and scalar convolution, prebuild its 32-128 tap tables off the audio callback, replace alloc-owned buffers with a board arena, and benchmark the existing AArch64 NEON kernel only as an algorithm reference.

**5. [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects)** Stars 33 - pushed 2020-04-08 - Portability Direct
> At the crossroads of programming your own audio effects, and letting your audio effects be programmed for you.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: faust_scripts/Two-pole-test.dsp, faust_scripts/bench.dsp, faust_scripts/evolve_struct.dsp, faust_scripts/evolve_struct_FIR_filter.dsp.

Added value: Crossroads evolves gain-and-delay effect topologies offline and emits Faust, making it a useful source of generated comb, FIR, soft-clip, and delay structures rather than a runtime dependency.

Port idea: Run the genetic search on a computer, keep only the emitted Faust topology, then compile that fixed kernel for the MCU and bound every evolved delay.

**6. [synthalorian/open-synth](https://github.com/synthalorian/open-synth)** Stars 5 - pushed 2026-09-16 - Portability Refactor
> 🎹 Open-source synthesizer — JUCE 8/C++20 engine, sample ROMpler, 5,600 presets. Standalone + VST3 + CLAP. This is the wave.

Why it ports: The procedural drum and delay sources are separable from JUCE and the sample ROMpler, but their voice count and per-sample transcendental math need an MCU-specific pass. Evidence: dsp/drum_synth.cpp, dsp/fx_analog_delay.cpp.

Added value: Its Apache-licensed DSP folder includes a fixed-pool procedural drum engine covering 16 percussion types plus a stereo fixed-array analog delay, independent of the optional sample ROMpler.

Port idea: Extract the procedural drum pool and one stereo delay, cap simultaneous voices, replace per-sample exp/pow calls with tables or recurrences, and omit the filesystem-backed sample layer.

**7. [SpotlightKid/adt](https://github.com/SpotlightKid/adt)** Stars 20 - pushed 2024-12-28 - Portability Stretch
> Automatic double tracking plugin (not only) for vocals

Why it ports: Faust separates the DSP cleanly, but the generated four-voice pitch/delay engine reserves about 2.25 MiB of float delay storage, exceeding internal Daisy Seed and Teensy 4.x memory. Evidence: faust/adt.dsp, plugins/adt/ADT.cpp.

Added value: The MIT Faust kernel creates four-voice automatic double tracking from independent delay, pitch and pan spreads plus wet filtering, with generated standalone C++ separated from its DPF plugin wrapper.

Port idea: Regenerate a two-voice float kernel with much smaller pitch/delay maxima and fixed controls; the checked-in four-voice C++ reserves 589,824 floats (about 2.25 MiB) before other state, so it cannot use internal Daisy/Teensy RAM unchanged.

**8. [tpt-solutions/tpt-dsp](https://github.com/tpt-solutions/tpt-dsp)** Stars 0 - pushed 2026-09-15 - Portability Refactor
> Pure-Rust, real-time-safe DSP framework — zero-allocation audio/RF/control processing for desktop, WebAssembly, and no_std embedded targets. Dual-licensed MIT/Apache-2.0.

Why it ports: tpt-dsp-core genuinely builds no_std with a stable scalar fallback, but the synth/effect crate still relies on std, Vec and Box, so only core primitives are direct and musical blocks need fixed-storage rewrites. Evidence: tpt-dsp-core/src/filters.rs, tpt-dsp-core/src/ring.rs, tpt-dsp-core/src/simd_scalar.rs, tpt-dsp-audio/src/oscillator.rs.

Added value: The dual-licensed Rust core provides no_std scalar filters, FFT/DCT/Hilbert, ring buffers and caller-buffer processing, while the adjacent audio crate supplies concrete FM, wavetable, subtractive, waveshaper, delay and EQ references.

Port idea: Start with tpt-dsp-core --no-default-features and its scalar backend on thumbv7em; port one oscillator or waveshaper from tpt-dsp-audio to fixed arrays instead of bringing over its Vec/Box graph and convolution reverb.

**9. [Ion3rik/JonssonicDSP](https://github.com/Ion3rik/JonssonicDSP)** Stars 11 - pushed 2026-03-06 - Portability Refactor
> A Modular Realtime C++ Audio DSP Library.

Why it ports: Processing is scalar and host-independent, but channels, delay lines, oversamplers, matrices and some pointer helpers use dynamic vectors that must become bounded firmware storage. Evidence: include/jonssonic/models/reverb/feedback_delay_network.h, include/jonssonic/core/oversampling/oversampler.h, include/jonssonic/core/nonlinear/wave_shaper.h, include/jonssonic/core/filters/state_variable_filter.h.

Added value: JonssonicDSP's MIT header set exposes scalar TPT/SVF filters, waveshaping, oversampling, modulated delays and a configurable feedback-delay-network reverb with readable per-sample APIs.

Port idea: Freeze one mono or stereo SVF-plus-FDN configuration, replace prepare-time std::vector storage and pointer-vector helpers with fixed arrays, and omit the FFT utility layer.

**10. [xikxp1/bs2b](https://github.com/xikxp1/bs2b)** Stars 1 - pushed 2026-07-13 - Portability Refactor
> A modern Rust implementation of the Bauer stereophonic-to-binaural (bs2b) crossfeed DSP

Why it ports: The no_std frame path has tiny fixed state and no allocation, but all coefficients and hot-path processing are f64, which needs an f32 specialization for Cortex-M7 throughput. Evidence: src/lib.rs.

Added value: This MIT Rust crate implements Bauer stereo-to-binaural crossfeed with reference-vector tests, streaming state, no_std support and allocation-free frame processing, a useful headphone block absent from stock embedded audio libraries.

Port idea: Specialize the coefficient, state and process_frame path to f32 for Cortex-M7, preserve the C-reference golden vectors, and expose the three documented crossfeed profiles as fixed hardware presets.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [NO FRESH DATA] [micknoise/Maximilian](https://github.com/micknoise/Maximilian) | 2026-09-12 | No fresh data |
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-09-17 | Updated |
| [NO FRESH DATA] [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 2026-09-12 | No fresh data |
| [NO FRESH DATA] [hamiltonkibbe/FxDSP](https://github.com/hamiltonkibbe/FxDSP) | 2026-09-12 | No fresh data |
| [NO FRESH DATA] [analogcode/606-Inspired-Synth-Drums](https://github.com/analogcode/606-Inspired-Synth-Drums) | 2026-09-12 | No fresh data |
| [NO CHANGE] [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 2026-01-20 | No change |
| [NO FRESH DATA] [libraz/libsonare](https://github.com/libraz/libsonare) | 2026-09-12 | No fresh data |
| [NO CHANGE] [keithhetrick/bellweather-audio-core](https://github.com/keithhetrick/bellweather-audio-core) | 2026-09-11 | No change |
| [NO CHANGE] [jpcima/fverb](https://github.com/jpcima/fverb) | 2022-01-10 | No change |
| [NO FRESH DATA] [charCulbert/chardsp](https://github.com/charCulbert/chardsp) | 2026-09-12 | No fresh data |

---

*Generated: 19 September 2026 - GitHub REST API - 27/27 queries successful - ~192 unique non-fork repos evaluated*
