# 2026-06-27 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [LeonidaFx50c02/juceSynth](https://github.com/LeonidaFx50c02/juceSynth) | 0 | 2026-06-23 | JUCE synth | Refactor | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 2 | [newdigate/teensy-audio-x86-stubs](https://github.com/newdigate/teensy-audio-x86-stubs) | 2 | 2026-06-25 | Teensy reference | Refactor | New - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 3 | [SpotlightKid/dpf-faust-project-template](https://github.com/SpotlightKid/dpf-faust-project-template) | 10 | 2026-03-02 | Faust effect | Direct | New - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 4 | [boblark/DSP_TeensyAudio_F32](https://github.com/boblark/DSP_TeensyAudio_F32) | 1 | 2020-06-16 | Teensy reference | Direct | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 5 | [Ketose333/HyperFrame](https://github.com/Ketose333/HyperFrame) | 1 | 2026-06-24 | JUCE synth | Refactor | New - Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos. |
| 6 | [ShmKnd/Patina](https://github.com/ShmKnd/Patina) | 3 | 2026-04-15 | DSP library | Refactor | Returning - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 7 | [OriolFreixa/tmf_additive_synth](https://github.com/OriolFreixa/tmf_additive_synth) | 0 | 2026-06-26 | JUCE synth | Refactor | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 8 | [TTeuber/GestureSynth](https://github.com/TTeuber/GestureSynth) | 0 | 2026-06-24 | JUCE synth | Refactor | New - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 9 | [valentindush/toneflx-lite-vst](https://github.com/valentindush/toneflx-lite-vst) | 0 | 2026-06-02 | JUCE effect | Refactor | New - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 10 | [mariusz96/blue-synthesiser](https://github.com/mariusz96/blue-synthesiser) | 10 | 2021-12-03 | VST3 synth | Refactor | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |

---

## Highlights & Port Ideas

**1. [LeonidaFx50c02/juceSynth](https://github.com/LeonidaFx50c02/juceSynth)** Stars 0 - pushed 2026-06-23 - Portability Refactor
> A synth developed with the JUCE framework, constantly evolving to learn JUCE's potential and the basics of audio

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Engine/PluginProcessor.cpp, Engine/PluginProcessor.h, Synth/Synth.cpp, Synth/Synth.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**2. [newdigate/teensy-audio-x86-stubs](https://github.com/newdigate/teensy-audio-x86-stubs)** Stars 2 - pushed 2026-06-25 - Portability Refactor
> teensy audio library ported to linux

Why it ports: Reusable DSP is present, but project structure needs extraction before firmware use. Evidence: src/Audio.h, src/AudioControl.h, src/biquad.h, src/effect_chorus.cpp.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**3. [SpotlightKid/dpf-faust-project-template](https://github.com/SpotlightKid/dpf-faust-project-template)** Stars 10 - pushed 2026-03-02 - Portability Direct
> A project template for DISTRHO Plugin Framework (DPF) audio effect plugins using FAUST.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: template/faust/arch/generic.cpp, template/faust/arch/generic.hpp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**4. [boblark/DSP_TeensyAudio_F32](https://github.com/boblark/DSP_TeensyAudio_F32)** Stars 1 - pushed 2020-06-16 - Portability Direct
> Collected blocks for use with OpenAudio/Tympan libraries with floating point.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: src/AudioAnalyzePhase_F32.cpp, src/AudioAnalyzePhase_F32.h, src/AudioFilter90Deg_F32.cpp, src/AudioFilter90Deg_F32.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**5. [Ketose333/HyperFrame](https://github.com/Ketose333/HyperFrame)** Stars 1 - pushed 2026-06-24 - Portability Refactor
> JUCE VST3 plugin for chiptune wavetable synths

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: src/dsp/AdsrEnvelope.cpp, src/dsp/AdsrEnvelope.h, src/dsp/Bytebeat.cpp, src/dsp/Bytebeat.h.

Added value: Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos.

Port idea: Extract the wavetable oscillator and table-generation path, then cap table size for internal SRAM or external memory.

**6. [ShmKnd/Patina](https://github.com/ShmKnd/Patina)** Stars 3 - pushed 2026-04-15 - Portability Refactor
> Patina is a general-purpose analog-modeling DSP library that emulates BBD delays, companders, tone circuits, tube amplifiers, and more — using **only the C++17 standard library**. No JUCE, no Boost, no external dependencies.Showcase:https://payhip.com/b/DNMHg

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: dsp/circuits/bbd/BbdClock.h, dsp/circuits/bbd/BbdFeedback.h, dsp/circuits/bbd/BbdNoise.h, dsp/circuits/bbd/BbdPipeline.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**7. [OriolFreixa/tmf_additive_synth](https://github.com/OriolFreixa/tmf_additive_synth)** Stars 0 - pushed 2026-06-26 - Portability Refactor
> Additive synth JUCE module to work with tmf_intercept_synth

Why it ports: Reusable DSP is present, but project structure needs extraction before firmware use. Evidence: AdditiveSynth/AdditiveSynthHarmonicCollector.h, AdditiveSynth/AdditiveSynthHarmonicCollectorManager.h, AdditiveSynth/CollectorExamples/HarmonicCollectorEnFifther.h, AdditiveSynth/CollectorExamples/HarmonicCollectorOctaves.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**8. [TTeuber/GestureSynth](https://github.com/TTeuber/GestureSynth)** Stars 0 - pushed 2026-06-24 - Portability Refactor
> Gesture-driven, Juno-inspired polyphonic synthesizer plugin built from scratch in C++/JUCE — drag-to-route modulation, hand-written DSP. AU/VST3/CLAP/Standalone.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: source/Editor/ADSRGraph.cpp, source/Editor/ADSRGraph.h, source/Editor/ChorusComponent.h, source/Editor/ChorusMixComponent.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**9. [valentindush/toneflx-lite-vst](https://github.com/valentindush/toneflx-lite-vst)** Stars 0 - pushed 2026-06-02 - Portability Refactor
> effect audio vst plugin. w/ juce & cmake

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: src/PluginProcessor.cpp, src/PluginProcessor.h, src/dsp/Bitcrusher.h, src/dsp/Chorus.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**10. [mariusz96/blue-synthesiser](https://github.com/mariusz96/blue-synthesiser)** Stars 10 - pushed 2021-12-03 - Portability Refactor
> My bachelor's thesis "Sound synthesis based on audio samples as an VST3 instrument" in C++ and JUCE

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/Plugin/PluginProcessor.cpp, Source/Plugin/PluginProcessor.h, Source/Synth/ADSREnv.cpp, Source/Synth/ADSREnv.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [Wasted-Audio/hvcc](https://github.com/Wasted-Audio/hvcc) | 2026-06-27 | Updated |
| [NO CHANGE] [marcel-licence/ML_SynthTools](https://github.com/marcel-licence/ML_SynthTools) | 2026-05-17 | No change |
| [NO CHANGE] [magnetophon/VoiceOfFaust](https://github.com/magnetophon/VoiceOfFaust) | 2025-08-09 | No change |
| [NO CHANGE] [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy) | 2026-03-12 | No change |
| [NO CHANGE] [isabelgk/airfx](https://github.com/isabelgk/airfx) | 2024-06-24 | No change |
| [NO CHANGE] [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 2022-04-14 | No change |
| [NO CHANGE] [Jacajack/stm32-faust-synth](https://github.com/Jacajack/stm32-faust-synth) | 2024-11-22 | No change |
| [UPDATED] [miladjavadi/CrackedGlass](https://github.com/miladjavadi/CrackedGlass) | 2026-06-24 | Updated |
| [UPDATED] [vNemetz/digital-synth](https://github.com/vNemetz/digital-synth) | 2026-06-24 | Updated |
| [NO CHANGE] [KelseyGeiger/MIDI-Manipulator](https://github.com/KelseyGeiger/MIDI-Manipulator) | 2017-06-20 | No change |

---

*Generated: 27 June 2026 - GitHub REST API - 18/18 queries successful - ~190 unique non-fork repos evaluated*
