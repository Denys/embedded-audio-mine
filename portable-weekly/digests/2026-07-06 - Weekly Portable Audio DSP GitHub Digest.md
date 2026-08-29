# 2026-07-06 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1402 | 2026-07-06 | DSP library | Refactor | Returning - The filter code provides concrete coefficients and structures for embedded EQ, crossover, and tone-control modules. |
| 2 | [electro-smith/DaisySP](https://github.com/electro-smith/DaisySP) | 1184 | 2025-05-29 | Daisy reference | Direct | Returning - Board-proven C++ modules give a practical reference for envelopes, drums, filters, and effects on MCU audio blocks. |
| 3 | [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src) | 710 | 2026-05-25 | DSP library | Stretch | Returning - High-quality sample-rate conversion is useful for wavetable import, offline asset prep, and mismatched-rate firmware tools. |
| 4 | [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 561 | 2026-06-30 | Faust synth | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 5 | [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 187 | 2025-11-03 | Filters | Refactor | Returning - The filter code provides concrete coefficients and structures for embedded EQ, crossover, and tone-control modules. |
| 6 | [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 34 | 2020-04-08 | Faust effect | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 7 | [jpcima/fverb](https://github.com/jpcima/fverb) | 18 | 2022-01-10 | Faust effect | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 8 | [okk-otsu/wav-audio-processor](https://github.com/okk-otsu/wav-audio-processor) | 0 | 2026-07-02 | Filters | Direct | New - The filter code provides concrete coefficients and structures for embedded EQ, crossover, and tone-control modules. |
| 9 | [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 52 | 2026-01-20 | Filters | Refactor | Returning - A compact Hilbert IIR is a useful primitive for phase shifters, single-sideband effects, and analytic-signal experiments. |
| 10 | [GareBear99/Instrudio](https://github.com/GareBear99/Instrudio) | 4 | 2026-07-01 | JUCE synth | Refactor | New - Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1402 - pushed 2026-07-06 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: q_io/include/q_io/audio_device.hpp, q_io/include/q_io/audio_file.hpp, q_io/include/q_io/audio_stream.hpp, q_io/src/audio_device.cpp.

Added value: The filter code provides concrete coefficients and structures for embedded EQ, crossover, and tone-control modules.

Port idea: Lift one filter family into a Teensy/Daisy block, replace any file or CLI paths with fixed coefficient tables, and profile denormal behavior.

**2. [electro-smith/DaisySP](https://github.com/electro-smith/DaisySP)** Stars 1184 - pushed 2025-05-29 - Portability Direct
> A Powerful DSP Library in C++

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: Source/Control/adsr.cpp, Source/Control/adsr.h, Source/Drums/synthbassdrum.cpp, Source/Drums/synthbassdrum.h.

Added value: Board-proven C++ modules give a practical reference for envelopes, drums, filters, and effects on MCU audio blocks.

Port idea: Use the module as a baseline callback implementation, then adapt parameter scaling and memory use to the target hardware.

**3. [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src)** Stars 710 - pushed 2026-05-25 - Portability Stretch
> High-quality pro audio resampler / sample rate conversion header-only C++ library. Very fast, for both audio resampling and time-series interpolation.

Why it ports: The algorithm is useful, but host coupling or resource pressure makes the MCU route a larger rewrite. Evidence: CDSPBlockConvolver.h, CDSPFIRFilter.h, CDSPFracInterpolator.h, CDSPHBDownsampler.h.

Added value: High-quality sample-rate conversion is useful for wavetable import, offline asset prep, and mismatched-rate firmware tools.

Port idea: Extract the smallest fixed-ratio converter path first, then benchmark CPU and buffer use before adding arbitrary ratios.

**4. [Ameobea/web-synth](https://github.com/Ameobea/web-synth)** Stars 561 - pushed 2026-06-30 - Portability Direct
> Browser-based DAW and audio synthesis platform with dozens of effects, synths, and modules

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: engine/engine/static/flanger.dsp, engine/engine/static/rain.dsp, src/graphEditor/nodes/CustomAudio/MultibandDiodeLadderDistortion/dsp.faust.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**5. [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters)** Stars 187 - pushed 2025-11-03 - Portability Refactor
> DSP C++ audio filters

Why it ports: Reusable DSP is present, but project structure needs extraction before firmware use. Evidence: lib/biquad.h, lib/biquad_modified.h, lib/filter_common.h, lib/filter_includes.h.

Added value: The filter code provides concrete coefficients and structures for embedded EQ, crossover, and tone-control modules.

Port idea: Lift one filter family into a Teensy/Daisy block, replace any file or CLI paths with fixed coefficient tables, and profile denormal behavior.

**6. [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects)** Stars 34 - pushed 2020-04-08 - Portability Direct
> At the crossroads of programming your own audio effects, and letting your audio effects be programmed for you.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: faust_scripts/Two-pole-test.dsp, faust_scripts/bench.dsp, faust_scripts/evolve_struct.dsp, faust_scripts/evolve_struct_FIR_filter.dsp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**7. [jpcima/fverb](https://github.com/jpcima/fverb)** Stars 18 - pushed 2022-01-10 - Portability Direct
> Plugin version of reverb effect to include in sfizz

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: fverb.dsp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**8. [okk-otsu/wav-audio-processor](https://github.com/okk-otsu/wav-audio-processor)** Stars 0 - pushed 2026-07-02 - Portability Direct
> C++20 WAV audio processor with a modular filter pipeline.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: include/sound_core/factory/FilterFactory.h, include/sound_core/filters/AbstractGeneratorFilter.h, include/sound_core/filters/AmGeneratorFilter.h, include/sound_core/filters/AmplFilter.h.

Added value: The filter code provides concrete coefficients and structures for embedded EQ, crossover, and tone-control modules.

Port idea: Lift one filter family into a Teensy/Daisy block, replace any file or CLI paths with fixed coefficient tables, and profile denormal behavior.

**9. [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir)** Stars 52 - pushed 2026-01-20 - Portability Refactor
> IIR Hilbert filter: short, dependency-free, header-only C++

Why it ports: Reusable DSP is present, but project structure needs extraction before firmware use. Evidence: design/main.cpp, design/plot.h, design/simple-fft.h, hilbert.h.

Added value: A compact Hilbert IIR is a useful primitive for phase shifters, single-sideband effects, and analytic-signal experiments.

Port idea: Port the header-only filter into a fixed-block test patch and validate phase response against the design utility.

**10. [GareBear99/Instrudio](https://github.com/GareBear99/Instrudio)** Stars 4 - pushed 2026-07-01 - Portability Refactor
> 4 free VST3/AU synth plugins — physically modeled violin, piano, harp & bongos. Native JUCE DSP. MIDI input. Themed UI. Single-source-of-truth architecture.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Instrudio_v2/plugin/Source/BongoVoice.h, Instrudio_v2/plugin/Source/HarpVoice.h, Instrudio_v2/plugin/Source/PianoVoice.h, Instrudio_v2/plugin/Source/PluginProcessor.cpp.

Added value: Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples.

Port idea: Extract one voice path first, cap voices and buffers, then map modulation controls to Daisy Seed or Teensy 4.1.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [NO CHANGE] [LeonidaFx50c02/juceSynth](https://github.com/LeonidaFx50c02/juceSynth) | 2026-06-23 | No change |
| [NO CHANGE] [newdigate/teensy-audio-x86-stubs](https://github.com/newdigate/teensy-audio-x86-stubs) | 2026-06-25 | No change |
| [NO CHANGE] [SpotlightKid/dpf-faust-project-template](https://github.com/SpotlightKid/dpf-faust-project-template) | 2026-03-02 | No change |
| [NO CHANGE] [boblark/DSP_TeensyAudio_F32](https://github.com/boblark/DSP_TeensyAudio_F32) | 2020-06-16 | No change |
| [NO CHANGE] [Ketose333/HyperFrame](https://github.com/Ketose333/HyperFrame) | 2026-06-24 | No change |
| [NO CHANGE] [ShmKnd/Patina](https://github.com/ShmKnd/Patina) | 2026-04-15 | No change |
| [UPDATED] [OriolFreixa/tmf_additive_synth](https://github.com/OriolFreixa/tmf_additive_synth) | 2026-07-04 | Updated |
| [UPDATED] [TTeuber/GestureSynth](https://github.com/TTeuber/GestureSynth) | 2026-07-06 | Updated |
| [NO CHANGE] [valentindush/toneflx-lite-vst](https://github.com/valentindush/toneflx-lite-vst) | 2026-06-02 | No change |
| [NO CHANGE] [mariusz96/blue-synthesiser](https://github.com/mariusz96/blue-synthesiser) | 2021-12-03 | No change |

---

*Generated: 06 July 2026 - GitHub REST API - 18/18 queries successful - ~192 unique non-fork repos evaluated*
