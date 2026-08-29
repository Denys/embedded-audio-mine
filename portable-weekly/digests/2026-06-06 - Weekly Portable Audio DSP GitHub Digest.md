# 2026-06-06 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [magnetophon/DigiDrie](https://github.com/magnetophon/DigiDrie) | 30 | 2026-05-18 | Faust synth | Direct | New - Faust-derived synth core has clear DSP paths, but AGPL-3.0 makes direct reuse a licensing decision. |
| 2 | [jpcima/fverb](https://github.com/jpcima/fverb) | 18 | 2022-01-10 | Faust effect | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 3 | [ampactor-labs/sonido](https://github.com/ampactor-labs/sonido) | 1 | 2026-06-03 | Daisy reference | Direct | Returning - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 4 | [shawlty/Daisy-Eurorack-Audio-Module](https://github.com/shawlty/Daisy-Eurorack-Audio-Module) | 0 | 2026-06-01 | Daisy reference | Direct | New - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 5 | [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 51 | 2026-01-20 | Filters | Refactor | Returning - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 6 | [GizzZmo/DSP4Guitar](https://github.com/GizzZmo/DSP4Guitar) | 5 | 2026-06-03 | JUCE effect | Refactor | New - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 7 | [GameCult/AquaSynth](https://github.com/GameCult/AquaSynth) | 0 | 2026-06-03 | Faust synth | Direct | New - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 8 | [hadencain/granular-synthesizer](https://github.com/hadencain/granular-synthesizer) | 0 | 2026-06-05 | JUCE synth | Direct | New - The synthesis method is distinctive enough to add value beyond stock oscillator and filter examples. |
| 9 | [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 0 | 2026-06-04 | JUCE synth | Direct | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 10 | [yakunliu-aimusic/Simple_Delay_Plugin](https://github.com/yakunliu-aimusic/Simple_Delay_Plugin) | 0 | 2026-06-03 | JUCE effect | Direct | New - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |

---

## Highlights & Port Ideas

**1. [magnetophon/DigiDrie](https://github.com/magnetophon/DigiDrie)** Stars 30 - pushed 2026-05-18 - Portability Direct
> A monster monophonic synth, written in faust.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: plugin/dpf/DigiDrie/dsp/dspcore.cpp, plugin/dpf/DigiDrie/dsp/dspcore.hpp, plugin/dpf/DigiDrie/dsp/faustdsp.hpp, plugin/dpf/common/dsp/constants.hpp.

Added value: Faust-derived monophonic synth code is useful as an open-source study target; AGPL-3.0 means direct firmware reuse should stay AGPL-compatible or be treated as reference material.

Port idea: Treat the generated DSP as a reference first, or keep derivative firmware AGPL-compatible while wrapping one voice path in a Daisy or Teensy audio callback.

**2. [jpcima/fverb](https://github.com/jpcima/fverb)** Stars 18 - pushed 2022-01-10 - Portability Direct
> Plugin version of reverb effect to include in sfizz

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: plugins/fverb/dsp/Fverb.cpp, plugins/fverb/dsp/Fverb.hpp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**3. [ampactor-labs/sonido](https://github.com/ampactor-labs/sonido)** Stars 1 - pushed 2026-06-03 - Portability Direct
> Modular audio effects workstation — 30+ DSP effects, node graph, CLAP plugin, Daisy hardware export

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: crates/sonido-analysis/src/distortion.rs, crates/sonido-analysis/src/filterbank.rs, crates/sonido-cli/src/commands/process.rs, crates/sonido-core/src/biquad.rs.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**4. [shawlty/Daisy-Eurorack-Audio-Module](https://github.com/shawlty/Daisy-Eurorack-Audio-Module)** Stars 0 - pushed 2026-06-01 - Portability Direct
> Eurorack audio module built with Daisy Seed. Real-time DSP, delay, reverb, filters, OLED UI, CV control, and full hardware + firmware documentation.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: src/audio_engine.cpp, src/audio_engine.h, src/delay.cpp, src/delay.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**5. [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir)** Stars 51 - pushed 2026-01-20 - Portability Refactor
> IIR Hilbert filter: short, dependency-free, header-only C++

Why it ports: Reusable DSP is present, but plugin/app wrappers or project structure need extraction before firmware use. Evidence: design/main.cpp, design/plot.h, design/simple-fft.h, hilbert.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**6. [GizzZmo/DSP4Guitar](https://github.com/GizzZmo/DSP4Guitar)** Stars 5 - pushed 2026-06-03 - Portability Refactor
> Multi-Effect VST Plugin 🎸 A JUCE-based multi-effect VST/AU plugin with advanced signal processing.  Built With - C++ (JUCE Framework) - Real-time DSP algorithms - MIDI integration - Custom preset system - Advanced effect chaining     and more          Goals: Provide an efficient, professional-grade audio processing plug in for guitar.

Why it ports: Reusable DSP is present, but plugin/app wrappers or project structure need extraction before firmware use. Evidence: DSP4GuitarApp.h, Delay.cpp, Delay.h, Distortion.cpp.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**7. [GameCult/AquaSynth](https://github.com/GameCult/AquaSynth)** Stars 0 - pushed 2026-06-03 - Portability Direct
> C# patch DSL and Faust backend bridge for Aquarium Synth

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: patches/aquasynth-patch-cultcache.cc, tools/zyn-reference/ZynVoiceReference.cpp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**8. [hadencain/granular-synthesizer](https://github.com/hadencain/granular-synthesizer)** Stars 0 - pushed 2026-06-05 - Portability Direct
> Granular synthesis VST3 plugin built with JUCE 7

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: source/PluginProcessor.cpp, source/PluginProcessor.h, source/dsp/EffectsChain.cpp, source/dsp/EffectsChain.h.

Added value: The synthesis method is distinctive enough to add value beyond stock oscillator and filter examples.

Port idea: Extract one voice path first, cap voices and buffers, then map modulation controls to Daisy Seed or Teensy 4.1.

**9. [synthalorian/open-synth](https://github.com/synthalorian/open-synth)** Stars 0 - pushed 2026-06-04 - Portability Direct
> An open-source, cross-platform software synthesizer built with C++ and JUCE

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: dsp/arpeggiator.cpp, dsp/audio_stream.cpp, dsp/audio_stream_ffi.cpp, dsp/audio_stream_test.cpp.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**10. [yakunliu-aimusic/Simple_Delay_Plugin](https://github.com/yakunliu-aimusic/Simple_Delay_Plugin)** Stars 0 - pushed 2026-06-03 - Portability Direct
> A real-time audio processing effect plugin built upon the JUCE C++ framework for VST/AU plugin hosts.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: source/PluginProcessor.cpp, source/PluginProcessor.h, source/dsp/DelayLine.cpp, source/dsp/DelayLine.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [NO CHANGE] [MTG/essentia](https://github.com/MTG/essentia) | 2026-05-20 | No change |
| [UPDATED] [kfrlib/kfr](https://github.com/kfrlib/kfr) | 2026-06-05 | Updated |
| [NO CHANGE] [cycfi/q](https://github.com/cycfi/q) | 2026-05-06 | No change |
| [NO CHANGE] [electro-smith/DaisySP](https://github.com/electro-smith/DaisySP) | 2025-05-29 | No change |
| [NO CHANGE] [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src) | 2026-05-25 | No change |
| [UPDATED] [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 2026-06-01 | Updated |
| [NO CHANGE] [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 2025-11-03 | No change |
| [NO CHANGE] [kayrockscreenprinting/ultramaster_kr106](https://github.com/kayrockscreenprinting/ultramaster_kr106) | 2026-05-07 | No change |
| [NO CHANGE] [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 2020-04-08 | No change |
| [NO CHANGE] [grahamwhaley/DSPham](https://github.com/grahamwhaley/DSPham) | 2025-03-03 | No change |

---

*Generated: 06 June 2026 - GitHub REST API - 18/18 queries successful - ~187 unique non-fork repos evaluated*
