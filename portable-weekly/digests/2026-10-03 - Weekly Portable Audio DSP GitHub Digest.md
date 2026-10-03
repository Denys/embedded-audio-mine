# 2026-10-03 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1428 | 2026-10-03 | DSP library | Direct | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [RustAudio/dasp](https://github.com/RustAudio/dasp) | 1193 | 2026-01-12 | DSP library | Direct | Returning - The dual MIT/Apache Rust crates provide no_std frames, sample conversion, fixed or borrowed ring buffers, interpolation, RMS/peak envelopes and allocation-free slice processing as independent modules. |
| 3 | [Themaister/libfmsynth](https://github.com/Themaister/libfmsynth) | 363 | 2020-06-28 | FM synth | Refactor | Returning - The MIT C core supplies eight operators, an arbitrary 8x8 modulation matrix, per-operator envelopes, carrier selection and hard-real-time rendering with scalar and ARM NEON paths. |
| 4 | [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp) | 277 | 2026-08-23 | DSP library | Refactor | Returning - The MIT C++11 headers combine fractional/multi-tap delay, cubic curves, envelope utilities, multirate helpers, FFT/STFT and spectral-processing primitives behind small independent includes. |
| 5 | [Chowdhury-DSP/chowdsp_wdf](https://github.com/Chowdhury-DSP/chowdsp_wdf) | 188 | 2026-07-03 | DSP library | Refactor | Returning - The BSD C++14 headers provide compile-time wave-digital circuit trees, diode and diode-pair nonlinearities, R-type adaptors and selectable Wright-Omega approximations used by real pedal models. |
| 6 | [PaulBatchelor/sndkit](https://github.com/PaulBatchelor/sndkit) | 145 | 2025-01-23 | DSP library | Refactor | Returning - The MIT/Unlicense literate toolkit tangles self-contained C89 kernels and includes concrete talkbox, PADsynth, Verbity reverb and noise modules that can be extracted independently of its LIL/Graforge host. |
| 7 | [Signalsmith-Audio/elliptic-blep](https://github.com/Signalsmith-Audio/elliptic-blep) | 79 | 2025-08-21 | Core building blocks | Direct | Returning - The MIT single header implements an 11th-order elliptic BLEP for step, impulse and slope discontinuities, including optional all-pass phase compensation and predesigned coefficients. |
| 8 | [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 20 | 2026-10-02 | DSP library | Refactor | Re-entry: updated - The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile. |
| 9 | [averagenative/0xSYNTH](https://github.com/averagenative/0xSYNTH) | 5 | 2026-04-18 | Wavetable synth | Refactor | Returning - Its MIT pure-C engine separates subtractive, four-operator FM, wavetable and sampler voices from CLAP/VST3/ImGui hosts, with atomic parameters, SPSC command queues and zero allocation in the audio path. |
| 10 | [marcecj/faust_mbstereophony](https://github.com/marcecj/faust_mbstereophony) | 3 | 2013-06-07 | Faust effect | Refactor | Returning - The MIT Faust sources implement six-band Regalia-Mitra complementary banks from third-order Cauer prototypes, with static/dynamic edges and sum-versus-synthesis reconstruction variants. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1428 - pushed 2026-10-03 - Portability Direct
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [RustAudio/dasp](https://github.com/RustAudio/dasp)** Stars 1193 - pushed 2026-01-12 - Portability Direct
> The fundamentals for Digital Audio Signal Processing. Formerly `sample`.

Why it ports: The core crates explicitly support no_std, fixed arrays, borrowed slices and fixed ring buffers; graph and allocation-backed adapters can be left out of the firmware feature set. Evidence: dasp_signal/src/lib.rs, dasp_interpolate/src/lib.rs, dasp_ring_buffer/src/lib.rs, dasp_envelope/src/lib.rs.

Added value: The dual MIT/Apache Rust crates provide no_std frames, sample conversion, fixed or borrowed ring buffers, interpolation, RMS/peak envelopes and allocation-free slice processing as independent modules.

Port idea: Build only frame, sample, slice, ring_buffer and linear interpolation with --no-default-features; avoid dasp_graph and allocation-backed signal adapters, which are unnecessary in a fixed callback.

**3. [Themaister/libfmsynth](https://github.com/Themaister/libfmsynth)** Stars 363 - pushed 2020-06-28 - Portability Refactor
> A C library which implements an FM synthesizer

Why it ports: A scalar hard-real-time C renderer exists, but eight operators and an 8x8 matrix per voice are expensive, while the optimized NEON code targets ARMv7/8 rather than Cortex-M7. Evidence: src/fmsynth.c, include/fmsynth.h, src/arm/fmsynth_arm.c.

Added value: The MIT C core supplies eight operators, an arbitrary 8x8 modulation matrix, per-operator envelopes, carrier selection and hard-real-time rendering with scalar and ARM NEON paths.

Port idea: Start from the scalar C renderer with one to four voices and four operators, keep its 32-sample control updates, then benchmark whether Teensy 4 M7 scalar throughput makes the ARMv7 NEON path unnecessary.

**4. [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp)** Stars 277 - pushed 2026-08-23 - Portability Refactor
> GitHub mirror of Signalsmith Audio's C++ DSP support library

Why it ports: The C++11 headers are host-independent, but delay and spectral classes own dynamic storage at setup; firmware should select small modules and replace those buffers with bounded caller-owned memory. Evidence: curves.h, include/signalsmith-dsp/curves.h, delay.h, include/signalsmith-dsp/delay.h.

Added value: The MIT C++11 headers combine fractional/multi-tap delay, cubic curves, envelope utilities, multirate helpers, FFT/STFT and spectral-processing primitives behind small independent includes.

Port idea: Start with delay.h plus envelopes.h, provide caller-owned fixed storage for the delay, and defer FFT/spectral modules until SRAM and cycle budgets are measured.

**5. [Chowdhury-DSP/chowdsp_wdf](https://github.com/Chowdhury-DSP/chowdsp_wdf)** Stars 188 - pushed 2026-07-03 - Portability Refactor
> Chowdhury DSP Wave Digital Filters Library

Why it ports: Compile-time wdft trees avoid runtime topology allocation and XSIMD is optional, but nonlinear Omega evaluation and complex R-type circuits require deliberate model and approximation choices. Evidence: include/chowdsp_wdf/wdft/wdft.h, include/chowdsp_wdf/wdft/wdft_nonlinearities.h, include/chowdsp_wdf/math/omega.h.

Added value: The BSD C++14 headers provide compile-time wave-digital circuit trees, diode and diode-pair nonlinearities, R-type adaptors and selectable Wright-Omega approximations used by real pedal models.

Port idea: Instantiate one fixed wdft diode clipper or tone stack without XSIMD, choose a lower-order Omega approximation if needed, and update component impedances only at control rate.

**6. [PaulBatchelor/sndkit](https://github.com/PaulBatchelor/sndkit)** Stars 145 - pushed 2025-01-23 - Portability Refactor
> A collection of highly portable audio DSP algorithms, written in ANSI C using literate programming.

Why it ports: Individual C89 init/tick kernels are small and self-contained, but the repository's default graph/interpreter layer allocates and must be excluded in favor of selected caller-owned modules. Evidence: extra/talkbox/talkbox.c, extra/padsynth/padsynth.c, extra/verbity/verbity.c, extra/brown/brown.c.

Added value: The MIT/Unlicense literate toolkit tangles self-contained C89 kernels and includes concrete talkbox, PADsynth, Verbity reverb and noise modules that can be extracted independently of its LIL/Graforge host.

Port idea: Tangle or copy one sk_* init/tick kernel, move setup allocation into caller-owned state, and exclude the LIL interpreter, graph allocator and FFT-based modules from the first firmware build.

**7. [Signalsmith-Audio/elliptic-blep](https://github.com/Signalsmith-Audio/elliptic-blep)** Stars 79 - pushed 2025-08-21 - Portability Direct
> Code to accompany the ADC24 talk

Why it ports: The runtime is one MIT header with fixed pole/state counts; only the constructor's fractional-step vector should become build-time or fixed-capacity storage. Evidence: elliptic-blep.h.

Added value: The MIT single header implements an 11th-order elliptic BLEP for step, impulse and slope discontinuities, including optional all-pass phase compensation and predesigned coefficients.

Port idea: Generate the fractional-step pole table at build time or replace its setup vector with a fixed array, then use the residue path for one saw/pulse oscillator and profile the eight complex states.

**8. [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark)** Stars 20 - pushed 2026-10-02 - Portability Refactor
> Header-only audio DSP framework in pure C++20, zero dependencies. 100+ real-time processors, physical analog models, EBU R128 metering. One codebase for cross-platform audio apps - desktop, mobile, WebAssembly, embedded - and VST3/CLAP/AU plugins.

Why it ports: Individual header models keep allocation in prepare(), but C++20, dynamic setup storage, calibration work, and optional heavyweight processors require a deliberately small firmware subset. Evidence: Effects/TapeMachine.h, Effects/TubePreamp.h, Effects/TransformerModel.h, Core/AudioBuffer.h.

Added value: The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile.

Port idea: Port one TransformerModel or TubePreamp block, preallocate its channel state, start at 1x oversampling, and leave convolution, phase-vocoder, and 64-grain processors out of the firmware build.

**9. [averagenative/0xSYNTH](https://github.com/averagenative/0xSYNTH)** Stars 5 - pushed 2026-04-18 - Portability Refactor
> Multi-engine synthesizer (subtractive/FM/wavetable) — CLAP/VST3 plugin + standalone. Pure C, real-time safe.

Why it ports: The pure-C engine and host boundary are unusually clean, but the full four-engine, sampler, 15-effect and oversampling configuration must be reduced to a fixed MCU build. Evidence: src/engine/fm.c, src/engine/wavetable.c, src/engine/effects.c, src/engine/command_queue.c.

Added value: Its MIT pure-C engine separates subtractive, four-operator FM, wavetable and sampler voices from CLAP/VST3/ImGui hosts, with atomic parameters, SPSC command queues and zero allocation in the audio path.

Port idea: Compile only src/engine plus synth_api, cap polyphony and effect count, replace desktop atomics where unnecessary, and omit sampler/file recording unless external storage is planned.

**10. [marcecj/faust_mbstereophony](https://github.com/marcecj/faust_mbstereophony)** Stars 3 - pushed 2013-06-07 - Portability Refactor
> Multi-Band Stereophony is a simple multi-band effect implemented in FAUST that down-mixes a stereo signal separately per frequency band.

Why it ports: The static Faust filter bank is directly generatable, but six third-order Cauer bands and reconstruction variants need a reduced static configuration and Cortex-M7 profiling. Evidence: src/mbstereophonyd_sum.dsp, src/mbstereophonys_sum.dsp, src/rmfbd_sum.dsp, src/rmfbs_sum.dsp.

Added value: The MIT Faust sources implement six-band Regalia-Mitra complementary banks from third-order Cauer prototypes, with static/dynamic edges and sum-versus-synthesis reconstruction variants.

Port idea: Generate the static sum-reconstruction variant first, reduce the six-band bank if needed, and keep edge-frequency changes at control rate; avoid the dynamic synthesis bank until CPU profiling passes.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-10-03 | Updated |
| [NO CHANGE] [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 2026-08-13 | No change |
| [NO CHANGE] [cucuwritescode/adac](https://github.com/cucuwritescode/adac) | 2026-07-11 | No change |
| [UPDATED] [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 2026-10-02 | Updated |
| [NO CHANGE] [odoare/Mechanodd](https://github.com/odoare/Mechanodd) | 2026-08-20 | No change |
| [NO CHANGE] [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP) | 2026-09-21 | No change |
| [NO CHANGE] [Na1w/infinitedsp](https://github.com/Na1w/infinitedsp) | 2026-06-18 | No change |
| [NO CHANGE] [hulkajoshua69/GritEngine](https://github.com/hulkajoshua69/GritEngine) | 2026-09-21 | No change |
| [NO CHANGE] [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 2024-11-01 | No change |
| [NO CHANGE] [mkaudio-company/libmksim](https://github.com/mkaudio-company/libmksim) | 2026-03-08 | No change |

---

*Generated: 03 October 2026 - GitHub REST API - 35/35 queries successful - ~207 unique non-fork repos evaluated*
