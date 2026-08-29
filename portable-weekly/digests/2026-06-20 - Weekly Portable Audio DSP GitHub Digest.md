# 2026-06-20 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [Wasted-Audio/hvcc](https://github.com/Wasted-Audio/hvcc) | 408 | 2026-06-18 | Daisy reference | Stretch | Returning - Compact FM and drum/synth voices provide character algorithms for embedded voice slots. |
| 2 | [marcel-licence/ML_SynthTools](https://github.com/marcel-licence/ML_SynthTools) | 236 | 2026-05-17 | Teensy reference | Direct | Returning - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 3 | [magnetophon/VoiceOfFaust](https://github.com/magnetophon/VoiceOfFaust) | 122 | 2025-08-09 | Faust synth | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 4 | [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy) | 74 | 2026-03-12 | Daisy reference | Direct | Returning - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 5 | [isabelgk/airfx](https://github.com/isabelgk/airfx) | 63 | 2024-06-24 | Filters | Refactor | Returning - The effect code offers a concrete block that can become a standalone pedal or module algorithm. |
| 6 | [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 50 | 2022-04-14 | Faust effect | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 7 | [Jacajack/stm32-faust-synth](https://github.com/Jacajack/stm32-faust-synth) | 35 | 2024-11-22 | Faust synth | Direct | Returning - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 8 | [miladjavadi/CrackedGlass](https://github.com/miladjavadi/CrackedGlass) | 1 | 2026-06-17 | JUCE synth | Refactor | New - Compact FM and drum/synth voices provide character algorithms for embedded voice slots. |
| 9 | [vNemetz/digital-synth](https://github.com/vNemetz/digital-synth) | 0 | 2026-06-19 | JUCE synth | Refactor | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 10 | [KelseyGeiger/MIDI-Manipulator](https://github.com/KelseyGeiger/MIDI-Manipulator) | 7 | 2017-06-20 | Physical modeling | Direct | New - Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples. |

---

## Highlights & Port Ideas

**1. [Wasted-Audio/hvcc](https://github.com/Wasted-Audio/hvcc)** Stars 408 - pushed 2026-06-18 - Portability Stretch
> The heavy compiler collection for Pure Data patches. Updated to python3 and additional generators

Why it ports: The algorithm is useful, but host coupling or resource pressure makes the MCU route a larger rewrite. Evidence: hvcc/generators/c2fmod/templates/src/{{name}}.cpp, hvcc/generators/c2unity/static/source/unity/AudioPluginInterface.h, hvcc/generators/c2unity/static/source/unity/AudioPluginUtil.cpp, hvcc/generators/c2unity/static/source/unity/AudioPluginUtil.h.

Added value: Compact FM and drum/synth voices provide character algorithms for embedded voice slots.

Port idea: Port one voice at a time, freeze allocation, and expose the smallest useful parameter set on hardware controls.

**2. [marcel-licence/ML_SynthTools](https://github.com/marcel-licence/ML_SynthTools)** Stars 236 - pushed 2026-05-17 - Portability Direct
> ML_SynthTools

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: src/RP2040_AudioPwm.cpp, src/RP2040_AudioPwm.h, src/audio_module.h, src/boards/board_audio_kit_ac101.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**3. [magnetophon/VoiceOfFaust](https://github.com/magnetophon/VoiceOfFaust)** Stars 122 - pushed 2025-08-09 - Portability Direct
> Turn your voice into a synthesizer!

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: VoiceOfFaust.dsp, followers/CZringmodFollower.dsp, followers/FMsingerFollower.dsp, followers/FMvocoderFollower.dsp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**4. [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy)** Stars 74 - pushed 2026-03-12 - Portability Direct
> DaisySP Audio DSP Library for the Teensy 4

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: DaisySP/Effects/chorus.cpp, DaisySP/Effects/chorus.h, DaisySP/Effects/flanger.cpp, DaisySP/Effects/flanger.h.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**5. [isabelgk/airfx](https://github.com/isabelgk/airfx)** Stars 63 - pushed 2024-06-24 - Portability Refactor
> Over 150 Airwindows plugins as Max/MSP externals using the Min C++ API. Contains reverbs, delays, filters, compressors, and more.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: source/objects/ambience/airfx.chorusensemble_tilde/airfx.chorusensemble_tilde.cpp, source/objects/ambience/airfx.pitchdelay_tilde/airfx.pitchdelay_tilde.cpp, source/objects/ambience/airfx.sampledelay_tilde/airfx.sampledelay_tilde.cpp, source/objects/ambience/airfx.stereochorus_tilde/airfx.stereochorus_tilde.cpp.

Added value: The effect code offers a concrete block that can become a standalone pedal or module algorithm.

Port idea: Port the core process function, replace host buffers with fixed audio blocks, and expose a small hardware parameter set.

**6. [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser)** Stars 50 - pushed 2022-04-14 - Portability Direct
> A classic analog phaser effect, made with DPF and Faust

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: dsp/architecture.cpp, dsp/architecture.hpp, dsp/stone_phaser.dsp, dsp/stone_phaser_stereo.dsp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**7. [Jacajack/stm32-faust-synth](https://github.com/Jacajack/stm32-faust-synth)** Stars 35 - pushed 2024-11-22 - Portability Direct
> STM32F405 synthesizer powered by Faust DSP

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: audio.cpp, audio.hpp, faust/noise.dsp, faust/panel.dsp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**8. [miladjavadi/CrackedGlass](https://github.com/miladjavadi/CrackedGlass)** Stars 1 - pushed 2026-06-17 - Portability Refactor
> An FM synth plugin I'm building to learn JUCE.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/Data/AdsrData.cpp, Source/Data/AdsrData.h, Source/Data/DistortionData.cpp, Source/Data/DistortionData.h.

Added value: Compact FM and drum/synth voices provide character algorithms for embedded voice slots.

Port idea: Port one voice at a time, freeze allocation, and expose the smallest useful parameter set on hardware controls.

**9. [vNemetz/digital-synth](https://github.com/vNemetz/digital-synth)** Stars 0 - pushed 2026-06-19 - Portability Refactor
> Repository for a headless digital synthesiser. Developed with JUCE & C++. Meant to run in a Raspberry Pi 3B+.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: src/AudioManipulation/AdsrEnvelope.cpp, src/AudioManipulation/AdsrEnvelope.hpp, src/AudioManipulation/StateVariableFilter.hpp, src/AudioSource/MidiManager.cpp.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**10. [KelseyGeiger/MIDI-Manipulator](https://github.com/KelseyGeiger/MIDI-Manipulator)** Stars 7 - pushed 2017-06-20 - Portability Direct
> A MIDI reader, player, and writer written in C++ using the SDL2 library (with extensions). Includes several software synths using multiple types of sound synthesis, including physical modelling. Not yet playing music.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: src/GuitarSynth.cpp, src/GuitarSynth.hpp, src/StringSynth.cpp, src/StringSynth.hpp.

Added value: Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples.

Port idea: Extract one voice path first, cap voices and buffers, then map modulation controls to Daisy Seed or Teensy 4.1.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [NO CHANGE] [tiagolr/ripplerx](https://github.com/tiagolr/ripplerx) | 2026-06-13 | No change |
| [NO CHANGE] [lluisestape-upc/Synth1.0](https://github.com/lluisestape-upc/Synth1.0) | 2026-06-07 | No change |
| [NO CHANGE] [bseverns/seedBox](https://github.com/bseverns/seedBox) | 2026-05-15 | No change |
| [NO CHANGE] [filipeborato/borato-morphium](https://github.com/filipeborato/borato-morphium) | 2026-06-13 | No change |
| [UPDATED] [mdt516/voxGenesis](https://github.com/mdt516/voxGenesis) | 2026-06-15 | Updated |
| [NO CHANGE] [cescofors75/RedMaster-DaisySeed64MB](https://github.com/cescofors75/RedMaster-DaisySeed64MB) | 2026-06-10 | No change |
| [NO CHANGE] [SpotlightKid/cookiecutter-dpf-faust](https://github.com/SpotlightKid/cookiecutter-dpf-faust) | 2024-11-11 | No change |
| [NO CHANGE] [electro-smith/Daisy-Juce-Example](https://github.com/electro-smith/Daisy-Juce-Example) | 2025-05-29 | No change |
| [NO CHANGE] [alexph10/bedridden](https://github.com/alexph10/bedridden) | 2026-05-28 | No change |
| [NO CHANGE] [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 2024-11-01 | No change |

---

*Generated: 20 June 2026 - GitHub REST API - 18/18 queries successful - ~187 unique non-fork repos evaluated*
