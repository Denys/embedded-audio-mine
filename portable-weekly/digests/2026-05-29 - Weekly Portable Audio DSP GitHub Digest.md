# 2026-05-29 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [MTG/essentia](https://github.com/MTG/essentia) | 3579 | 2026-05-20 | DSP library | Stretch | New - Useful as a reference for embedded onset, rhythm, tonal, and level-analysis control signals rather than as a whole synth/effect port. |
| 2 | [kfrlib/kfr](https://github.com/kfrlib/kfr) | 1876 | 2026-04-08 | Filters | Refactor | New - Strong reference implementations for biquads, FIR/IIR filters, oscillators, waveshaping, and sample-rate conversion can improve embedded DSP tests and comparisons. |
| 3 | [cycfi/q](https://github.com/cycfi/q) | 1386 | 2026-05-06 | DSP library | Direct | Returning - Adds a coherent portable set of effects, envelopes, math helpers, and audio-rate utilities beyond single-demo embedded examples. |
| 4 | [electro-smith/DaisySP](https://github.com/electro-smith/DaisySP) | 1164 | 2025-05-29 | Daisy reference | Direct | New - Best used as the portability baseline for judging whether computer-first code adds anything beyond stock Daisy/Teensy blocks. |
| 5 | [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src) | 699 | 2026-05-25 | DSP library | Refactor | Returning - High-quality sample-rate conversion is valuable for sample playback, offline asset prep, and rate-bridging tests on embedded audio devices. |
| 6 | [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 555 | 2026-05-27 | Faust synth | Refactor | New - The useful payoff is modern wavetable/FM effect design and filter code, not the web DAW shell. |
| 7 | [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 187 | 2025-11-03 | Filters | Direct | Returning - Useful for comparing simple biquad variants and coefficient handling against embedded library filters. |
| 8 | [kayrockscreenprinting/ultramaster_kr106](https://github.com/kayrockscreenprinting/ultramaster_kr106) | 173 | 2026-05-07 | JUCE synth | Refactor | Returning - The Juno-style oscillator, chorus, VCF, VCA, and envelope headers offer a focused synth-voice extraction target. |
| 9 | [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 33 | 2020-04-08 | Faust effect | Direct | New - Good compact source material for generated filters, soft clipping, and experimental effect structures on MCU audio. |
| 10 | [grahamwhaley/DSPham](https://github.com/grahamwhaley/DSPham) | 37 | 2025-03-03 | Teensy reference | Direct | New - Practical reference for a Teensy audio processor with dynamic filtering rather than a desktop-to-MCU transplant. |

---

## Highlights & Port Ideas

**1. [MTG/essentia](https://github.com/MTG/essentia)** Stars 3579 - pushed 2026-05-20 - Portability Stretch
> C++ library for audio and music analysis, description and synthesis, including Python bindings

Why it ports: The reusable C++ algorithms are real, but the full library is analysis-scale and AGPL/Python/third-party heavy, so only narrow kernels are realistic firmware targets. Evidence: src/algorithms/rhythm/onsetdetection.cpp, src/algorithms/rhythm/beattrackermultifeature.cpp, src/algorithms/extractor/tonalextractor.cpp, src/algorithms/audioproblems/truepeakdetector.cpp.

Added value: Useful as a reference for embedded onset, rhythm, tonal, and level-analysis control signals rather than as a whole synth/effect port.

Port idea: Prototype one detector, such as onset or true-peak, as a fixed-buffer sidechain utility on Teensy 4.1 before considering any larger Essentia subsystem.

**2. [kfrlib/kfr](https://github.com/kfrlib/kfr)** Stars 1876 - pushed 2026-04-08 - Portability Refactor
> Fast, modern C++ DSP framework, FFT, Sample Rate Conversion, FIR/IIR/Biquad Filters (SSE, AVX, AVX-512, ARM NEON, RISC-V RVV)

Why it ports: The DSP headers are well separated, but the project leans on desktop SIMD and GPL licensing, so firmware use should be selective and reference-driven. Evidence: include/kfr/dsp/biquad.hpp, include/kfr/dsp/fir.hpp, include/kfr/dsp/iir.hpp, include/kfr/dsp/sample_rate_conversion.hpp.

Added value: Strong reference implementations for biquads, FIR/IIR filters, oscillators, waveshaping, and sample-rate conversion can improve embedded DSP tests and comparisons.

Port idea: Lift or reimplement one scalar filter/SRC block and benchmark it against DaisySP or Teensy Audio before touching the larger KFR framework.

**3. [cycfi/q](https://github.com/cycfi/q)** Stars 1386 - pushed 2026-05-06 - Portability Direct
> C++ Library for Audio Digital Signal Processing

Why it ports: Header-oriented C++ DSP lives under q_lib/include/q/fx with little UI or plugin coupling in the core paths. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/waveshaper.hpp.

Added value: Adds a coherent portable set of effects, envelopes, math helpers, and audio-rate utilities beyond single-demo embedded examples.

Port idea: Start with q::fx delay or envelope in a Daisy callback, then decide whether its fixed-point/math helpers fit the target toolchain.

**4. [electro-smith/DaisySP](https://github.com/electro-smith/DaisySP)** Stars 1164 - pushed 2025-05-29 - Portability Direct
> A Powerful DSP Library in C++

Why it ports: The library is already organized as small C++ DSP modules for embedded audio callbacks. Evidence: Source/Control/adsr.cpp, Source/Drums/synthbassdrum.cpp, Source/Effects/chorus.cpp, Source/Filters/svf.cpp.

Added value: Best used as the portability baseline for judging whether computer-first code adds anything beyond stock Daisy/Teensy blocks.

Port idea: Use its oscillator, envelope, drum, and effect modules as reference tests when porting higher-level synth or effect algorithms from this digest.

**5. [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src)** Stars 699 - pushed 2026-05-25 - Portability Refactor
> High-quality pro audio resampler / sample rate conversion header-only C++ library. Very fast, for both audio resampling and time-series interpolation.

Why it ports: The C++ resampler is separated and header-friendly, but quality settings, filter length, and buffering need MCU-specific limits. Evidence: CDSPResampler.h, CDSPFIRFilter.h, CDSPFracInterpolator.h, CDSPSincFilterGen.h.

Added value: High-quality sample-rate conversion is valuable for sample playback, offline asset prep, and rate-bridging tests on embedded audio devices.

Port idea: Constrain filter length and channel count, then test one mono conversion path on Teensy 4.1 with fixed input/output blocks.

**6. [Ameobea/web-synth](https://github.com/Ameobea/web-synth)** Stars 555 - pushed 2026-05-27 - Portability Refactor
> Browser-based DAW and audio synthesis platform with dozens of effects, synths, and modules

Why it ports: The browser app is not portable as a system, but Rust DSP and wavetable/FM effect modules are separable enough for algorithm extraction. Evidence: engine/dsp/src/filters/biquad.rs, engine/dsp/src/oscillator.rs, engine/wavetable/src/fm/effects/chorus.rs, engine/wavetable/src/fm/effects/wavefolder.rs.

Added value: The useful payoff is modern wavetable/FM effect design and filter code, not the web DAW shell.

Port idea: Translate one oscillator or wavefolder module into C++ for Daisy/Teensy and ignore the browser, database, and worklet infrastructure.

**7. [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters)** Stars 187 - pushed 2025-11-03 - Portability Direct
> DSP C++ audio filters

Why it ports: Small C++ filter headers make this a direct firmware-reference target with little host structure to remove. Evidence: lib/biquad.h, lib/biquad_modified.h, lib/filter_common.h, src/main.cpp.

Added value: Useful for comparing simple biquad variants and coefficient handling against embedded library filters.

Port idea: Port the biquad header into a Teensy Audio test object and measure coefficient update behavior under modulation.

**8. [kayrockscreenprinting/ultramaster_kr106](https://github.com/kayrockscreenprinting/ultramaster_kr106)** Stars 173 - pushed 2026-05-07 - Portability Refactor
> Linux, Osx & Windows JUCE port of Ultramaster Group's classic 2001 software synth

Why it ports: The JUCE project has a clear Source/DSP core, but firmware use still needs plugin-state, preset, and host assumptions removed. Evidence: Source/DSP/KR106Oscillators.h, Source/DSP/KR106VCF.h, Source/DSP/KR106Chorus.h, Source/DSP/KR106ADSR.h.

Added value: The Juno-style oscillator, chorus, VCF, VCA, and envelope headers offer a focused synth-voice extraction target.

Port idea: Extract one mono voice with oscillator, ADSR, VCF, and chorus disabled at first, then add chorus after CPU and RAM are measured.

**9. [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects)** Stars 33 - pushed 2020-04-08 - Portability Direct
> At the crossroads of programming your own audio effects, and letting your audio effects be programmed for you.

Why it ports: The Faust scripts are small DSP sources that can generate C++ kernels without keeping the experiment scripts or plugin wrappers. Evidence: faust_scripts/evolve_struct.dsp, faust_scripts/evolve_struct_FIR_filter.dsp, faust_scripts/evolve_struct_Soft-clip.dsp, faust_scripts/Two-pole-test.dsp.

Added value: Good compact source material for generated filters, soft clipping, and experimental effect structures on MCU audio.

Port idea: Generate C++ from one Faust effect, wrap it as a mono Daisy/Teensy block, and hard-code a few controls before exposing CV/MIDI.

**10. [grahamwhaley/DSPham](https://github.com/grahamwhaley/DSPham)** Stars 37 - pushed 2025-03-03 - Portability Direct
> A Teensy based DSP audio processor

Why it ports: This is already Teensy-oriented Arduino code with project-specific dynamic filter files. Evidence: DSPham.ino, dspfilter.h, dynamicFilters.cpp, dynamicFilters.h.

Added value: Practical reference for a Teensy audio processor with dynamic filtering rather than a desktop-to-MCU transplant.

Port idea: Use the dynamic filter code as a Teensy baseline, then compare a Daisy port only after the control-rate update model is clear.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [Wasted-Audio/hvcc](https://github.com/Wasted-Audio/hvcc) | 2026-05-29 | Updated |
| [NO FRESH DATA] [igorski/MWEngine](https://github.com/igorski/MWEngine) | 2026-05-16 | No fresh data |
| [UPDATED] [marcel-licence/ML_SynthTools](https://github.com/marcel-licence/ML_SynthTools) | 2026-05-17 | Updated |
| [NO CHANGE] [magnetophon/VoiceOfFaust](https://github.com/magnetophon/VoiceOfFaust) | 2025-08-09 | No change |
| [NO CHANGE] [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy) | 2026-03-12 | No change |
| [NO CHANGE] [isabelgk/airfx](https://github.com/isabelgk/airfx) | 2024-06-24 | No change |
| [NO CHANGE] [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 2022-04-14 | No change |
| [NO CHANGE] [Jacajack/stm32-faust-synth](https://github.com/Jacajack/stm32-faust-synth) | 2024-11-22 | No change |
| [NO CHANGE] [anushkadas-coder/DCO6_synthesizer](https://github.com/anushkadas-coder/DCO6_synthesizer) | 2026-05-07 | No change |
| [NO CHANGE] [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 2026-05-05 | No change |

---

*Generated: 29 May 2026 - GitHub REST API - 18/18 queries successful - ~183 unique non-fork repos evaluated*
