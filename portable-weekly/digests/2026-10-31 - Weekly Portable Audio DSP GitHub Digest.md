# 2026-10-31 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1447 | 2026-10-31 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [cucuwritescode/adac](https://github.com/cucuwritescode/adac) | 42 | 2026-07-11 | Faust effect | Direct | Returning - ADAC converts trained FLAMO delay, gain, filter and matrix graphs into Faust, emits integer or fractional-delay FDNs, and computes a small-gain stability certificate over the exact single-precision parameters. |
| 3 | [Na1w/infinitedsp](https://github.com/Na1w/infinitedsp) | 19 | 2026-06-18 | DSP library | Refactor | Returning - The MIT no_std Rust library combines static DSP chains with predictive ZDF ladder and TPT filters, low-memory delay/reverb variants, tape delay, formant speech, and Karplus-Strong/brass models. |
| 4 | [scjurgen/AbacDsp](https://github.com/scjurgen/AbacDsp) | 1 | 2026-10-29 | DSP library | Refactor | New - The MIT C++20 core combines Karplus-Strong strings, dispersion delays, fixed-array Schroeder diffusion, modulation and filter blocks behind a JUCE-free header layer. |
| 5 | [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 8 | 2024-11-01 | Wavetable synth | Refactor | Returning - Its native C++ wavetable factory and oscillator are already separated from the Kotlin UI through a narrow Oboe/JNI audio layer. |
| 6 | [ayutaz/tiny-formant-synth](https://github.com/ayutaz/tiny-formant-synth) | 3 | 2026-10-01 | Physical modeling | Refactor | New - The MIT single-file C++20 synth turns Japanese phonemes into impulse/noise excitation and a three-resonator Klatt-style formant cascade with focused unit tests. |
| 7 | [mkaudio-company/libmksim](https://github.com/mkaudio-company/libmksim) | 4 | 2026-03-08 | Nonlinear effects | Refactor | Returning - The MIT Rust core combines WDF passive networks with local Newton-Raphson tube, diode, transistor and op-amp models, a WIDTH=1 scalar backend, preallocated signal buffers, oversampling, and ready-made amp stages. |
| 8 | [chalkwalk/chalkwalk-tape](https://github.com/chalkwalk/chalkwalk-tape) | 0 | 2026-10-05 | Nonlinear effects | Refactor | New - The MIT C++17 library models tape as caller-owned media plus Jiles-Atherton hysteresis, bias, wavelength-derived head losses, companding and polyphase scatter/gather resampling. |
| 9 | [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP) | 2 | 2026-09-21 | DSP library | Refactor | Returning - The MIT header library separates no-allocation fuzz, tube-preamp, tone-stack, fixed-buffer spring-reverb, and static oversampling blocks from optional plugin and convolution code. |
| 10 | [xikxp1/bs2b](https://github.com/xikxp1/bs2b) | 1 | 2026-07-13 | DSP library | Refactor | Returning - This MIT Rust crate implements Bauer stereo-to-binaural crossfeed with reference-vector tests, streaming state, no_std support and allocation-free frame processing, a useful headphone block absent from stock embedded audio libraries. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1447 - pushed 2026-10-31 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [cucuwritescode/adac](https://github.com/cucuwritescode/adac)** Stars 42 - pushed 2026-07-11 - Portability Direct
> Automatic Differentiable Audio Compilation: differentiable audio graphs to real-time DSP

Why it ports: Python, PyTorch and FLAMO run only during offline training/export; the deployment artifact is a fixed Faust kernel whose delays, matrices, filters and stability verdict are explicit before firmware compilation. Evidence: src/adac/codegen/json_to_faust.py, src/adac/certificate.py, tests/integration/nice_reverb.dsp.

Added value: ADAC converts trained FLAMO delay, gain, filter and matrix graphs into Faust, emits integer or fractional-delay FDNs, and computes a small-gain stability certificate over the exact single-precision parameters.

Port idea: Train and certify a four- or eight-line FDN offline, export only the generated Faust kernel, compile it for Daisy or Teensy, and cap delay maxima to the measured internal or external memory budget.

**3. [Na1w/infinitedsp](https://github.com/Na1w/infinitedsp)** Stars 19 - pushed 2026-06-18 - Portability Refactor
> No description.

Why it ports: The core supports no_std and static dispatch, but it still requires alloc and many delay, reverb, granular and spectral modules own dynamic buffers that must become bounded firmware storage. Evidence: src/core/static_dsp_chain.rs, src/effects/filter/predictive_ladder.rs, src/effects/time/reverb.rs, src/synthesis/karplus_strong.rs.

Added value: The MIT no_std Rust library combines static DSP chains with predictive ZDF ladder and TPT filters, low-memory delay/reverb variants, tape delay, formant speech, and Karplus-Strong/brass models.

Port idea: Build no_std with one static chain, choose the low-memory delay or reverb plus one predictive ZDF or physical-model voice, replace alloc-owned buffers with a fixed arena, and omit OLA, granular, and spectral modules.

**4. [scjurgen/AbacDsp](https://github.com/scjurgen/AbacDsp)** Stars 1 - pushed 2026-10-29 - Portability Refactor
> AbacDsp is a creative DSP library for audio plugins and standalone applications. Header-only, zero-dependency C++20 building blocks, with Lua scripting designed for LLM-assisted sound design.

Why it ports: The JUCE-free headers expose bounded processing blocks and fixed AudioBuffer storage, but selected delays and strings allocate vectors at construction and the full repository includes desktop-only Lua, analysis and host layers. Evidence: src/includes/Generators/KarplusStrongString.h, src/includes/Delays/DispersionDelay.h, src/includes/Diffuser/SchroederDiffuser.h, src/includes/Audio/AudioBuffer.h.

Added value: The MIT C++20 core combines Karplus-Strong strings, dispersion delays, fixed-array Schroeder diffusion, modulation and filter blocks behind a JUCE-free header layer.

Port idea: Start with one Karplus-Strong string plus the fixed-array Schroeder diffuser, replace its construction-time vectors with fixed storage, and leave Lua, spectral analysis and JUCE examples out.

**5. [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer)** Stars 8 - pushed 2024-11-01 - Portability Refactor
> Wavetable Synthesizer is an Android app created as a journey to overcome my own fears of C++. This project combines Kotlin, Jetpack Compose, and C++ through the Java Native Interface (JNI) to explore real-time audio processing in a mobile environment.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: app/src/main/cpp/include/audio/AudioPlayer.h, app/src/main/cpp/include/audio/AudioSource.h, app/src/main/cpp/include/audio/OboeAudioPlayer.h, app/src/main/cpp/include/wavetable/WatableFactory.h.

Added value: Its native C++ wavetable factory and oscillator are already separated from the Kotlin UI through a narrow Oboe/JNI audio layer.

Port idea: Keep the wavetable factory and oscillator, replace Oboe/JNI with the board callback, and cap table count and resolution to the available SRAM.

**6. [ayutaz/tiny-formant-synth](https://github.com/ayutaz/tiny-formant-synth)** Stars 3 - pushed 2026-10-01 - Portability Refactor
> 437行のC++で日本語を喋る -- A tiny Japanese formant speech synthesizer in ~437 lines of C++

Why it ports: The three resonators and excitation generators have tiny fixed state, but the current synthesizer renders whole utterances into vectors and couples them to text parsing and WAV-file output. Evidence: formant.cpp, tests/test_resonator.cpp, tests/test_synth_source.cpp.

Added value: The MIT single-file C++20 synth turns Japanese phonemes into impulse/noise excitation and a three-resonator Klatt-style formant cascade with focused unit tests.

Port idea: Keep the three resonators, noise and impulse generators as a streaming mono voice, replace vector-built utterances with a fixed phoneme queue, and remove command-line and WAV-file output.

**7. [mkaudio-company/libmksim](https://github.com/mkaudio-company/libmksim)** Stars 4 - pushed 2026-03-08 - Portability Refactor
> Real-time SIMD-optimized analog circuit simulation for audio DSP

Why it ports: A scalar f32 backend and allocation-free process graph exist, but construction owns Vec-backed pools and the Rust core is not documented as no_std, so a fixed subset and arena are required. Evidence: src/simd/scalar.rs, src/core/buffer_pool.rs, src/components/tubes.rs, src/components/diode.rs.

Added value: The MIT Rust core combines WDF passive networks with local Newton-Raphson tube, diode, transistor and op-amp models, a WIDTH=1 scalar backend, preallocated signal buffers, oversampling, and ready-made amp stages.

Port idea: Start with ScalarFloat and one diode or triode stage plus its tone stack, replace compile-time Vec-owned pools with a fixed board arena, and defer SIMD dispatch and multi-stage oversampling until measured.

**8. [chalkwalk/chalkwalk-tape](https://github.com/chalkwalk/chalkwalk-tape)** Stars 0 - pushed 2026-10-05 - Portability Refactor
> A tape deck as a library: medium, heads, layers, seams, and a polyphase resampler that scatters as well as gathers. JUCE-free, MIT.

Why it ports: The audio path uses caller-owned medium storage and noexcept sample operations, but setup builds vector-backed Langevin/resampler tables and the double-heavy hysteresis solver needs Cortex-M7 profiling. Evidence: include/chalkwalk/tape/Medium.h, include/chalkwalk/tape/Hysteresis.h, include/chalkwalk/tape/Resampler.h, include/chalkwalk/tape/LossEffects.h.

Added value: The MIT C++17 library models tape as caller-owned media plus Jiles-Atherton hysteresis, bias, wavelength-derived head losses, companding and polyphase scatter/gather resampling.

Port idea: Port the caller-owned medium plus one head-loss or hysteresis path, replace the Langevin and resampler vectors with fixed tables, and defer a full multitrack deck until cycles and memory are measured.

**9. [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP)** Stars 2 - pushed 2026-09-21 - Portability Refactor
> Biblioteca de DSP para áudio. C++ Audio DSP library for VST/VST3 plugins, Reaper, Audacity, and OBS Studio. Processamento e edição de áudio em tempo real. ENGINE DE PROGRAMAÇÃO VST3 E ÁUDIO.

Why it ports: The reusable header core is separate and process methods avoid allocation, but C++20 features, broad configuration, and optional plugin/convolution modules should be cut from the firmware build. Evidence: CV_DSP/Effects/Chorus.hpp, CV_DSP/Effects/Flanger.hpp, CV_DSP/Effects/Phaser.hpp, CV_DSP/Filters/AllPassFilter.hpp.

Added value: The MIT header library separates no-allocation fuzz, tube-preamp, tone-stack, fixed-buffer spring-reverb, and static oversampling blocks from optional plugin and convolution code.

Port idea: Start with VintageFuzzDSP or one tube stage, disable oversampling, replace C++20-only conveniences if needed, then size spring delays explicitly before enabling reverb.

**10. [xikxp1/bs2b](https://github.com/xikxp1/bs2b)** Stars 1 - pushed 2026-07-13 - Portability Refactor
> A modern Rust implementation of the Bauer stereophonic-to-binaural (bs2b) crossfeed DSP

Why it ports: The no_std frame path has tiny fixed state and no allocation, but all coefficients and hot-path processing are f64, which needs an f32 specialization for Cortex-M7 throughput. Evidence: src/lib.rs.

Added value: This MIT Rust crate implements Bauer stereo-to-binaural crossfeed with reference-vector tests, streaming state, no_std support and allocation-free frame processing, a useful headphone block absent from stock embedded audio libraries.

Port idea: Specialize the coefficient, state and process_frame path to f32 for Cortex-M7, preserve the C-reference golden vectors, and expose the three documented crossfeed profiles as fixed hardware presets.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-10-31 | Updated |
| [UPDATED] [madrona-labs/madronalib](https://github.com/madrona-labs/madronalib) | 2026-10-30 | Updated |
| [NO CHANGE] [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp) | 2026-10-20 | No change |
| [NO CHANGE] [hasenbanck/resampler](https://github.com/hasenbanck/resampler) | 2026-10-10 | No change |
| [NO CHANGE] [CuteDSP/RSCuteDSP](https://github.com/CuteDSP/RSCuteDSP) | 2026-06-17 | No change |
| [NO CHANGE] [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 2026-10-13 | No change |
| [NO CHANGE] [SpotlightKid/adt](https://github.com/SpotlightKid/adt) | 2024-12-28 | No change |
| [NO CHANGE] [tpt-solutions/tpt-dsp](https://github.com/tpt-solutions/tpt-dsp) | 2026-10-20 | No change |
| [NO CHANGE] [Ion3rik/JonssonicDSP](https://github.com/Ion3rik/JonssonicDSP) | 2026-03-06 | No change |
| [NO CHANGE] [khenderson20/sonic-forge-dsp](https://github.com/khenderson20/sonic-forge-dsp) | 2026-05-10 | No change |

---

*Generated: 31 October 2026 - GitHub REST API - 37/37 queries successful - ~221 unique non-fork repos evaluated*
