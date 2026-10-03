# 2026-09-26 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1425 | 2026-09-25 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 572 | 2026-08-13 | Faust synth | Direct | Returning - Its standalone Faust sources include a stereo quadrature-LFO flanger and a three-band diode-ladder distortion, offering effect kernels beyond the browser DAW. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 3 | [cucuwritescode/adac](https://github.com/cucuwritescode/adac) | 42 | 2026-07-11 | Faust effect | Direct | New - ADAC converts trained FLAMO delay, gain, filter and matrix graphs into Faust, emits integer or fractional-delay FDNs, and computes a small-gain stability certificate over the exact single-precision parameters. |
| 4 | [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 20 | 2026-09-26 | DSP library | Refactor | Returning - The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile. |
| 5 | [odoare/Mechanodd](https://github.com/odoare/Mechanodd) | 41 | 2026-08-20 | Physical modeling | Stretch | Returning - Mechanodd contains dispersive bidirectional waveguide strings and bounded modal banks for plates, membranes, and beams, plus explicit feedback-loop DC/finite guards. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 6 | [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP) | 2 | 2026-09-21 | DSP library | Refactor | Returning - The MIT header library separates no-allocation fuzz, tube-preamp, tone-stack, fixed-buffer spring-reverb, and static oversampling blocks from optional plugin and convolution code. |
| 7 | [Na1w/infinitedsp](https://github.com/Na1w/infinitedsp) | 19 | 2026-06-18 | DSP library | Refactor | New - The MIT no_std Rust library combines static DSP chains with predictive ZDF ladder and TPT filters, low-memory delay/reverb variants, tape delay, formant speech, and Karplus-Strong/brass models. |
| 8 | [hulkajoshua69/GritEngine](https://github.com/hulkajoshua69/GritEngine) | 0 | 2026-09-21 | Faust effect | Direct | New - The single Faust kernel combines prefiltered asymmetric saturation, sine wavefolding, sample-rate decimation, variable bit crushing, tone shaping, and parallel wet/dry control in one compact degradation effect. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 9 | [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 8 | 2024-11-01 | Wavetable synth | Refactor | Returning - Its native C++ wavetable factory and oscillator are already separated from the Kotlin UI through a narrow Oboe/JNI audio layer. |
| 10 | [mkaudio-company/libmksim](https://github.com/mkaudio-company/libmksim) | 3 | 2026-03-08 | Nonlinear effects | Refactor | New - The MIT Rust core combines WDF passive networks with local Newton-Raphson tube, diode, transistor and op-amp models, a WIDTH=1 scalar backend, preallocated signal buffers, oversampling, and ready-made amp stages. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1425 - pushed 2026-09-25 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [Ameobea/web-synth](https://github.com/Ameobea/web-synth)** Stars 572 - pushed 2026-08-13 - Portability Direct
> Browser-based DAW and audio synthesis platform with dozens of effects, synths, and modules

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: engine/engine/static/flanger.dsp, engine/engine/static/rain.dsp, src/graphEditor/nodes/CustomAudio/MultibandDiodeLadderDistortion/dsp.faust.

Added value: Its standalone Faust sources include a stereo quadrature-LFO flanger and a three-band diode-ladder distortion, offering effect kernels beyond the browser DAW. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Compile one Faust effect at a time to C++, replace web controls with fixed parameters, and begin with the flanger before budgeting the three-band ladder path.

**3. [cucuwritescode/adac](https://github.com/cucuwritescode/adac)** Stars 42 - pushed 2026-07-11 - Portability Direct
> Automatic Differentiable Audio Compilation: differentiable audio graphs to real-time DSP

Why it ports: Python, PyTorch and FLAMO run only during offline training/export; the deployment artifact is a fixed Faust kernel whose delays, matrices, filters and stability verdict are explicit before firmware compilation. Evidence: src/adac/codegen/json_to_faust.py, src/adac/certificate.py, tests/integration/nice_reverb.dsp.

Added value: ADAC converts trained FLAMO delay, gain, filter and matrix graphs into Faust, emits integer or fractional-delay FDNs, and computes a small-gain stability certificate over the exact single-precision parameters.

Port idea: Train and certify a four- or eight-line FDN offline, export only the generated Faust kernel, compile it for Daisy or Teensy, and cap delay maxima to the measured internal or external memory budget.

**4. [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark)** Stars 20 - pushed 2026-09-26 - Portability Refactor
> Header-only audio DSP framework in pure C++20, zero dependencies. 100+ real-time processors, physical analog models, EBU R128 metering. One codebase for cross-platform audio apps - desktop, mobile, WebAssembly, embedded - and VST3/CLAP/AU plugins.

Why it ports: Individual header models keep allocation in prepare(), but C++20, dynamic setup storage, calibration work, and optional heavyweight processors require a deliberately small firmware subset. Evidence: Effects/TapeMachine.h, Effects/TubePreamp.h, Effects/TransformerModel.h, Core/AudioBuffer.h.

Added value: The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile.

Port idea: Port one TransformerModel or TubePreamp block, preallocate its channel state, start at 1x oversampling, and leave convolution, phase-vocoder, and 64-grain processors out of the firmware build.

**5. [odoare/Mechanodd](https://github.com/odoare/Mechanodd)** Stars 41 - pushed 2026-08-20 - Portability Stretch
> Polyphonic physical-modelling synthesizer

Why it ports: The resonator algorithms are bounded, but JUCE DSP types, per-voice instantiation, an 8-voice feedback matrix, and effects chains make only a reduced single-resonator port prudent. Evidence: Source/Resonators/WaveguideResonator.cpp, Source/Resonators/WaveguideResonator.h, Source/Resonators/ModalResonator.cpp, Source/Resonators/ModalResonator.h.

Added value: Mechanodd contains dispersive bidirectional waveguide strings and bounded modal banks for plates, membranes, and beams, plus explicit feedback-loop DC/finite guards. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Extract one mono waveguide or 8-16-mode resonator, replace JUCE DelayLine/parameter classes with fixed storage, and defer the 8-voice feedback matrix and four-slot effects chains.

**6. [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP)** Stars 2 - pushed 2026-09-21 - Portability Refactor
> Biblioteca de DSP para áudio. C++ Audio DSP library for VST/VST3 plugins, Reaper, Audacity, and OBS Studio. Processamento e edição de áudio em tempo real. ENGINE DE PROGRAMAÇÃO VST3 E ÁUDIO.

Why it ports: The reusable header core is separate and process methods avoid allocation, but C++20 features, broad configuration, and optional plugin/convolution modules should be cut from the firmware build. Evidence: CV_DSP/Effects/Chorus.hpp, CV_DSP/Effects/Flanger.hpp, CV_DSP/Effects/Phaser.hpp, CV_DSP/Filters/AllPassFilter.hpp.

Added value: The MIT header library separates no-allocation fuzz, tube-preamp, tone-stack, fixed-buffer spring-reverb, and static oversampling blocks from optional plugin and convolution code.

Port idea: Start with VintageFuzzDSP or one tube stage, disable oversampling, replace C++20-only conveniences if needed, then size spring delays explicitly before enabling reverb.

**7. [Na1w/infinitedsp](https://github.com/Na1w/infinitedsp)** Stars 19 - pushed 2026-06-18 - Portability Refactor
> A modular, high-performance audio DSP library for Rust, designed for real-time synthesis and effects processing

Why it ports: The core supports no_std and static dispatch, but it still requires alloc and many delay, reverb, granular and spectral modules own dynamic buffers that must become bounded firmware storage. Evidence: src/core/static_dsp_chain.rs, src/effects/filter/predictive_ladder.rs, src/effects/time/reverb.rs, src/synthesis/karplus_strong.rs.

Added value: The MIT no_std Rust library combines static DSP chains with predictive ZDF ladder and TPT filters, low-memory delay/reverb variants, tape delay, formant speech, and Karplus-Strong/brass models.

Port idea: Build no_std with one static chain, choose the low-memory delay or reverb plus one predictive ZDF or physical-model voice, replace alloc-owned buffers with a fixed arena, and omit OLA, granular, and spectral modules.

**8. [hulkajoshua69/GritEngine](https://github.com/hulkajoshua69/GritEngine)** Stars 0 - pushed 2026-09-21 - Portability Direct
> Stereo industrial audio degradation effect in FAUST. Combines pre-filtered asymmetric saturation, sine wavefolding, sample-rate decimation, and variable bit-crushing with tone shaping and parallel wet/dry mix control.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: GritEngine.dsp.

Added value: The single Faust kernel combines prefiltered asymmetric saturation, sine wavefolding, sample-rate decimation, variable bit crushing, tone shaping, and parallel wet/dry control in one compact degradation effect. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Generate a float C++ kernel, keep the saturation, fold, decimation, and bit-depth controls at control-rate updates, and benchmark the complete mono path before enabling stereo on Cortex-M7.

**9. [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer)** Stars 8 - pushed 2024-11-01 - Portability Refactor
> Wavetable Synthesizer is an Android app created as a journey to overcome my own fears of C++. This project combines Kotlin, Jetpack Compose, and C++ through the Java Native Interface (JNI) to explore real-time audio processing in a mobile environment.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: app/src/main/cpp/include/audio/AudioPlayer.h, app/src/main/cpp/include/audio/AudioSource.h, app/src/main/cpp/include/audio/OboeAudioPlayer.h, app/src/main/cpp/include/wavetable/WatableFactory.h.

Added value: Its native C++ wavetable factory and oscillator are already separated from the Kotlin UI through a narrow Oboe/JNI audio layer.

Port idea: Keep the wavetable factory and oscillator, replace Oboe/JNI with the board callback, and cap table count and resolution to the available SRAM.

**10. [mkaudio-company/libmksim](https://github.com/mkaudio-company/libmksim)** Stars 3 - pushed 2026-03-08 - Portability Refactor
> Real-time SIMD-optimized analog circuit simulation for audio DSP

Why it ports: A scalar f32 backend and allocation-free process graph exist, but construction owns Vec-backed pools and the Rust core is not documented as no_std, so a fixed subset and arena are required. Evidence: src/simd/scalar.rs, src/core/buffer_pool.rs, src/components/tubes.rs, src/components/diode.rs.

Added value: The MIT Rust core combines WDF passive networks with local Newton-Raphson tube, diode, transistor and op-amp models, a WIDTH=1 scalar backend, preallocated signal buffers, oversampling, and ready-made amp stages.

Port idea: Start with ScalarFloat and one diode or triode stage plus its tone stack, replace compile-time Vec-owned pools with a fixed board arena, and defer SIMD dispatch and multi-stage oversampling until measured.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-09-25 | Updated |
| [UPDATED] [madrona-labs/madronalib](https://github.com/madrona-labs/madronalib) | 2026-09-22 | Updated |
| [NO CHANGE] [CuteDSP/RSCuteDSP](https://github.com/CuteDSP/RSCuteDSP) | 2026-06-17 | No change |
| [UPDATED] [hasenbanck/resampler](https://github.com/hasenbanck/resampler) | 2026-09-21 | Updated |
| [NO CHANGE] [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 2020-04-08 | No change |
| [NO CHANGE] [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 2026-09-16 | No change |
| [NO CHANGE] [SpotlightKid/adt](https://github.com/SpotlightKid/adt) | 2024-12-28 | No change |
| [UPDATED] [tpt-solutions/tpt-dsp](https://github.com/tpt-solutions/tpt-dsp) | 2026-09-22 | Updated |
| [NO CHANGE] [Ion3rik/JonssonicDSP](https://github.com/Ion3rik/JonssonicDSP) | 2026-03-06 | No change |
| [NO CHANGE] [xikxp1/bs2b](https://github.com/xikxp1/bs2b) | 2026-07-13 | No change |

---

*Generated: 26 September 2026 - GitHub REST API - 31/35 queries successful - ~210 unique non-fork repos evaluated*
