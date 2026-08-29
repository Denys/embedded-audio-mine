# 2026-08-29 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1418 | 2026-08-27 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [RustAudio/dasp](https://github.com/RustAudio/dasp) | 1185 | 2026-01-12 | DSP library | Direct | Returning - The dual MIT/Apache Rust crates provide no_std frames, sample conversion, fixed or borrowed ring buffers, interpolation, RMS/peak envelopes and allocation-free slice processing as independent modules. |
| 3 | [Themaister/libfmsynth](https://github.com/Themaister/libfmsynth) | 362 | 2020-06-28 | FM synth | Refactor | Returning - The MIT C core supplies eight operators, an arbitrary 8x8 modulation matrix, per-operator envelopes, carrier selection and hard-real-time rendering with scalar and ARM NEON paths. |
| 4 | [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp) | 274 | 2026-08-23 | DSP library | Refactor | Returning - The MIT C++11 headers combine fractional/multi-tap delay, cubic curves, envelope utilities, multirate helpers, FFT/STFT and spectral-processing primitives behind small independent includes. |
| 5 | [Chowdhury-DSP/chowdsp_wdf](https://github.com/Chowdhury-DSP/chowdsp_wdf) | 184 | 2026-07-03 | DSP library | Refactor | Returning - The BSD C++14 headers provide compile-time wave-digital circuit trees, diode and diode-pair nonlinearities, R-type adaptors and selectable Wright-Omega approximations used by real pedal models. |
| 6 | [PaulBatchelor/sndkit](https://github.com/PaulBatchelor/sndkit) | 145 | 2025-01-23 | DSP library | Refactor | Returning - The MIT/Unlicense literate toolkit tangles self-contained C89 kernels and includes concrete talkbox, PADsynth, Verbity reverb and noise modules that can be extracted independently of its LIL/Graforge host. |
| 7 | [Signalsmith-Audio/elliptic-blep](https://github.com/Signalsmith-Audio/elliptic-blep) | 79 | 2025-08-21 | Core building blocks | Direct | Returning - The MIT single header implements an 11th-order elliptic BLEP for step, impulse and slope discontinuities, including optional all-pass phase compensation and predesigned coefficients. |
| 8 | [averagenative/0xSYNTH](https://github.com/averagenative/0xSYNTH) | 4 | 2026-04-18 | DSP library | Refactor | Returning - Its MIT pure-C engine separates subtractive, four-operator FM, wavetable and sampler voices from CLAP/VST3/ImGui hosts, with atomic parameters, SPSC command queues and zero allocation in the audio path. |
| 9 | [marcecj/faust_mbstereophony](https://github.com/marcecj/faust_mbstereophony) | 3 | 2013-06-07 | Faust effect | Refactor | New - The MIT Faust sources implement six-band Regalia-Mitra complementary banks from third-order Cauer prototypes, with static/dynamic edges and sum-versus-synthesis reconstruction variants. |
| 10 | [daleonov/SpringReverb](https://github.com/daleonov/SpringReverb) | 3 | 2025-09-14 | Faust effect | Stretch | New - The Faust effect builds a spring-like tail from three eight-line Hadamard diffusion stages, prime-spaced feedback delays, low-pass loss, hard clipping and independent dwell, tone, tension and spring-spacing controls. License metadata is absent, so treat it as reference-only until terms are clarified. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1418 - pushed 2026-08-27 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [RustAudio/dasp](https://github.com/RustAudio/dasp)** Stars 1185 - pushed 2026-01-12 - Portability Direct
> Modular Rust fundamentals for digital audio signal processing.

Why it ports: The core crates explicitly support no_std, fixed arrays, borrowed slices and fixed ring buffers; graph and allocation-backed adapters can be left out of the firmware feature set. Evidence: dasp_signal/src/lib.rs, dasp_interpolate/src/lib.rs, dasp_ring_buffer/src/lib.rs, dasp_envelope/src/lib.rs.

Added value: The dual MIT/Apache Rust crates provide no_std frames, sample conversion, fixed or borrowed ring buffers, interpolation, RMS/peak envelopes and allocation-free slice processing as independent modules.

Port idea: Build only frame, sample, slice, ring_buffer and linear interpolation with --no-default-features; avoid dasp_graph and allocation-backed signal adapters, which are unnecessary in a fixed callback.

**3. [Themaister/libfmsynth](https://github.com/Themaister/libfmsynth)** Stars 362 - pushed 2020-06-28 - Portability Refactor
> Hard-real-time C FM synthesizer with arbitrary eight-operator routing.

Why it ports: A scalar hard-real-time C renderer exists, but eight operators and an 8x8 matrix per voice are expensive, while the optimized NEON code targets ARMv7/8 rather than Cortex-M7. Evidence: src/fmsynth.c, include/fmsynth.h, src/arm/fmsynth_arm.c.

Added value: The MIT C core supplies eight operators, an arbitrary 8x8 modulation matrix, per-operator envelopes, carrier selection and hard-real-time rendering with scalar and ARM NEON paths.

Port idea: Start from the scalar C renderer with one to four voices and four operators, keep its 32-sample control updates, then benchmark whether Teensy 4 M7 scalar throughput makes the ARMv7 NEON path unnecessary.

**4. [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp)** Stars 274 - pushed 2026-08-23 - Portability Refactor
> GitHub mirror of Signalsmith Audio's C++ DSP support library

Why it ports: The C++11 headers are host-independent, but delay and spectral classes own dynamic storage at setup; firmware should select small modules and replace those buffers with bounded caller-owned memory. Evidence: curves.h, include/signalsmith-dsp/curves.h, delay.h, include/signalsmith-dsp/delay.h.

Added value: The MIT C++11 headers combine fractional/multi-tap delay, cubic curves, envelope utilities, multirate helpers, FFT/STFT and spectral-processing primitives behind small independent includes.

Port idea: Start with delay.h plus envelopes.h, provide caller-owned fixed storage for the delay, and defer FFT/spectral modules until SRAM and cycle budgets are measured.

**5. [Chowdhury-DSP/chowdsp_wdf](https://github.com/Chowdhury-DSP/chowdsp_wdf)** Stars 184 - pushed 2026-07-03 - Portability Refactor
> Header-only C++ library for real-time wave-digital circuit models.

Why it ports: Compile-time wdft trees avoid runtime topology allocation and XSIMD is optional, but nonlinear Omega evaluation and complex R-type circuits require deliberate model and approximation choices. Evidence: include/chowdsp_wdf/wdft/wdft.h, include/chowdsp_wdf/wdft/wdft_nonlinearities.h, include/chowdsp_wdf/math/omega.h.

Added value: The BSD C++14 headers provide compile-time wave-digital circuit trees, diode and diode-pair nonlinearities, R-type adaptors and selectable Wright-Omega approximations used by real pedal models.

Port idea: Instantiate one fixed wdft diode clipper or tone stack without XSIMD, choose a lower-order Omega approximation if needed, and update component impedances only at control rate.

**6. [PaulBatchelor/sndkit](https://github.com/PaulBatchelor/sndkit)** Stars 145 - pushed 2025-01-23 - Portability Refactor
> Portable audio DSP algorithms written as literate ANSI C.

Why it ports: Individual C89 init/tick kernels are small and self-contained, but the repository's default graph/interpreter layer allocates and must be excluded in favor of selected caller-owned modules. Evidence: extra/talkbox/talkbox.c, extra/padsynth/padsynth.c, extra/verbity/verbity.c, extra/brown/brown.c.

Added value: The MIT/Unlicense literate toolkit tangles self-contained C89 kernels and includes concrete talkbox, PADsynth, Verbity reverb and noise modules that can be extracted independently of its LIL/Graforge host.

Port idea: Tangle or copy one sk_* init/tick kernel, move setup allocation into caller-owned state, and exclude the LIL interpreter, graph allocator and FFT-based modules from the first firmware build.

**7. [Signalsmith-Audio/elliptic-blep](https://github.com/Signalsmith-Audio/elliptic-blep)** Stars 79 - pushed 2025-08-21 - Portability Direct
> Header-only elliptic BLEP antialiasing for polynomial-segment oscillators.

Why it ports: The runtime is one MIT header with fixed pole/state counts; only the constructor's fractional-step vector should become build-time or fixed-capacity storage. Evidence: elliptic-blep.h.

Added value: The MIT single header implements an 11th-order elliptic BLEP for step, impulse and slope discontinuities, including optional all-pass phase compensation and predesigned coefficients.

Port idea: Generate the fractional-step pole table at build time or replace its setup vector with a fixed array, then use the residue path for one saw/pulse oscillator and profile the eight complex states.

**8. [averagenative/0xSYNTH](https://github.com/averagenative/0xSYNTH)** Stars 4 - pushed 2026-04-18 - Portability Refactor
> Multi-engine synthesizer with a pure-C real-time engine and separate CLAP/VST3/standalone hosts.

Why it ports: The pure-C engine and host boundary are unusually clean, but the full four-engine, sampler, 15-effect and oversampling configuration must be reduced to a fixed MCU build. Evidence: src/engine/fm.c, src/engine/wavetable.c, src/engine/effects.c, src/engine/command_queue.c.

Added value: Its MIT pure-C engine separates subtractive, four-operator FM, wavetable and sampler voices from CLAP/VST3/ImGui hosts, with atomic parameters, SPSC command queues and zero allocation in the audio path.

Port idea: Compile only src/engine plus synth_api, cap polyphony and effect count, replace desktop atomics where unnecessary, and omit sampler/file recording unless external storage is planned.

**9. [marcecj/faust_mbstereophony](https://github.com/marcecj/faust_mbstereophony)** Stars 3 - pushed 2013-06-07 - Portability Refactor
> Regalia-Mitra multi-band stereophony and complementary filter banks in Faust.

Why it ports: The static Faust filter bank is directly generatable, but six third-order Cauer bands and reconstruction variants need a reduced static configuration and Cortex-M7 profiling. Evidence: src/mbstereophonyd_sum.dsp, src/mbstereophonys_sum.dsp, src/rmfbd_sum.dsp, src/rmfbs_sum.dsp.

Added value: The MIT Faust sources implement six-band Regalia-Mitra complementary banks from third-order Cauer prototypes, with static/dynamic edges and sum-versus-synthesis reconstruction variants.

Port idea: Generate the static sum-reconstruction variant first, reduce the six-band bank if needed, and keep edge-frequency changes at control rate; avoid the dynamic synthesis bank until CPU profiling passes.

**10. [daleonov/SpringReverb](https://github.com/daleonov/SpringReverb)** Stars 3 - pushed 2025-09-14 - Portability Stretch
> Spring reverb effect written in Faust.

Why it ports: The Faust kernel is host-independent, but three eight-line diffusion stages plus eight long feedback delays require an explicit delay-memory and cycle budget on Daisy Seed or Teensy 4.1. Evidence: springreverb.dsp.

Added value: The Faust effect builds a spring-like tail from three eight-line Hadamard diffusion stages, prime-spaced feedback delays, low-pass loss, hard clipping and independent dwell, tone, tension and spring-spacing controls. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Generate static C++, compute the roughly 24 diffusion and eight feedback delay sizes at 48 kHz, then reduce N from eight to four or place delay storage in external RAM if the measured footprint is too high.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-08-27 | Updated |
| [NO CHANGE] [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 2026-08-13 | No change |
| [NO CHANGE] [odoare/Mechanodd](https://github.com/odoare/Mechanodd) | 2026-08-20 | No change |
| [UPDATED] [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 2026-08-26 | Updated |
| [NO CHANGE] [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 2026-08-17 | No change |
| [UPDATED] [Erick-vital/chord-synth](https://github.com/Erick-vital/chord-synth) | 2026-08-24 | Updated |
| [NO CHANGE] [aar75/Eighty](https://github.com/aar75/Eighty) | 2026-08-17 | No change |
| [NO CHANGE] [EsionHsrahLatigid/BinGrave](https://github.com/EsionHsrahLatigid/BinGrave) | 2026-08-16 | No change |
| [NO CHANGE] [Ic3zy/rt-biquad-filter](https://github.com/Ic3zy/rt-biquad-filter) | 2026-08-04 | No change |
| [NO FRESH DATA] [zolaski333/EngineLab](https://github.com/zolaski333/EngineLab) | 2026-08-22 | No fresh data |

---

*Generated: 29 August 2026 - GitHub REST API - 20/20 queries successful - ~192 unique non-fork repos evaluated*
