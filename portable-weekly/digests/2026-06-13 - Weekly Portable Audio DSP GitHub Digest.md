# 2026-06-13 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [tiagolr/ripplerx](https://github.com/tiagolr/ripplerx) | 560 | 2026-06-09 | JUCE synth | Refactor | Returning - Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples. |
| 2 | [lluisestape-upc/Synth1.0](https://github.com/lluisestape-upc/Synth1.0) | 3 | 2026-06-07 | JUCE synth | Refactor | New - Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos. |
| 3 | [bseverns/seedBox](https://github.com/bseverns/seedBox) | 3 | 2026-05-15 | Teensy reference | Direct | New - Granular voice and buffer scheduling make it a useful stress test for MCU memory and voice budgeting. |
| 4 | [filipeborato/borato-morphium](https://github.com/filipeborato/borato-morphium) | 0 | 2026-06-13 | JUCE synth | Refactor | New - Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples. |
| 5 | [mdt516/voxGenesis](https://github.com/mdt516/voxGenesis) | 0 | 2026-06-10 | JUCE synth | Refactor | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 6 | [cescofors75/RedMaster-DaisySeed64MB](https://github.com/cescofors75/RedMaster-DaisySeed64MB) | 0 | 2026-06-10 | Daisy reference | Direct | New - Compact FM and drum/synth voices provide character algorithms for embedded voice slots. |
| 7 | [SpotlightKid/cookiecutter-dpf-faust](https://github.com/SpotlightKid/cookiecutter-dpf-faust) | 12 | 2024-11-11 | Faust effect | Direct | New - Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later. |
| 8 | [electro-smith/Daisy-Juce-Example](https://github.com/electro-smith/Daisy-Juce-Example) | 26 | 2025-05-29 | Daisy reference | Direct | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 9 | [alexph10/bedridden](https://github.com/alexph10/bedridden) | 0 | 2026-05-28 | JUCE synth | Refactor | New - The implementation provides reusable DSP building blocks that can seed firmware tests or library modules. |
| 10 | [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 8 | 2024-11-01 | Wavetable synth | Refactor | New - Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos. |

---

## Highlights & Port Ideas

**1. [tiagolr/ripplerx](https://github.com/tiagolr/ripplerx)** Stars 560 - pushed 2026-06-09 - Portability Refactor
> A physically modeled synth

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: src/PluginProcessor.cpp, src/PluginProcessor.h, src/dsp/Comb.h, src/dsp/Envelope.cpp.

Added value: Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples.

Port idea: Extract one voice path first, cap voices and buffers, then map modulation controls to Daisy Seed or Teensy 4.1.

**2. [lluisestape-upc/Synth1.0](https://github.com/lluisestape-upc/Synth1.0)** Stars 3 - pushed 2026-06-07 - Portability Refactor
> Polyphonic wavetable VST3 synthesizer built with JUCE 8

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/PluginProcessor.cpp, Source/PluginProcessor.h, Source/SynthSound.h, Source/SynthVoice.h.

Added value: Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos.

Port idea: Extract the wavetable oscillator and table-generation path, then cap table size for internal SRAM or external memory.

**3. [bseverns/seedBox](https://github.com/bseverns/seedBox)** Stars 3 - pushed 2026-05-15 - Portability Direct
> Audio seeds grow and develop

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: examples/05_live_granular/src/main.cpp, src/AudioMemoryBudget.h, src/app/AudioRuntimeState.cpp, src/app/AudioRuntimeState.h.

Added value: Granular voice and buffer scheduling make it a useful stress test for MCU memory and voice budgeting.

Port idea: Port one grain engine with fixed grain count and statically sized buffers before adding modulation.

**4. [filipeborato/borato-morphium](https://github.com/filipeborato/borato-morphium)** Stars 0 - pushed 2026-06-13 - Portability Refactor
> Sound Matter Synthesizer - experimental JUCE synth (VST3/AU/CLAP/Standalone) that shapes energy sources as physical matter

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/Core/MorphiumVoice.cpp, Source/Core/MorphiumVoice.h, Source/DSP/BasicMatterProcessor.cpp, Source/DSP/BasicMatterProcessor.h.

Added value: Physical-modeling resonator code gives a distinctive voice type not covered by basic embedded examples.

Port idea: Extract one voice path first, cap voices and buffers, then map modulation controls to Daisy Seed or Teensy 4.1.

**5. [mdt516/voxGenesis](https://github.com/mdt516/voxGenesis)** Stars 0 - pushed 2026-06-10 - Portability Refactor
> a synth made with the JUCE framework

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/DSP/customADSR.cpp, Source/DSP/customADSR.h, Source/DSP/customOscillator.cpp, Source/DSP/customOscillator.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**6. [cescofors75/RedMaster-DaisySeed64MB](https://github.com/cescofors75/RedMaster-DaisySeed64MB)** Stars 0 - pushed 2026-06-10 - Portability Direct
> RED808 Daisy Seed 64MB firmware — STM32H750 audio DSP for the RED808 drum machine

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: DaisySeed/synth/fm2op.h, DaisySeed/synth/sh101.h, DaisySeed/synth/tb303.h, DaisySeed/synth/tr505.h.

Added value: Compact FM and drum/synth voices provide character algorithms for embedded voice slots.

Port idea: Port one voice at a time, freeze allocation, and expose the smallest useful parameter set on hardware controls.

**7. [SpotlightKid/cookiecutter-dpf-faust](https://github.com/SpotlightKid/cookiecutter-dpf-faust)** Stars 12 - pushed 2024-11-11 - Portability Direct
> A cookiecutter project template for DISTRHO Plugin Framework (DPF) audio effect plugins using FAUST.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: {{ cookiecutter.repo_name }}/faust/arch/generic.cpp, {{ cookiecutter.repo_name }}/faust/arch/generic.hpp, {{ cookiecutter.repo_name }}/faust/{{ cookiecutter.plugin_name|lower }}.dsp.

Added value: Faust DSP gives a clean route to generated C++ kernels with board-specific control and audio I/O added later.

Port idea: Generate a small C++ DSP class from the Faust code and wrap it in a Daisy or Teensy audio callback with fixed parameters.

**8. [electro-smith/Daisy-Juce-Example](https://github.com/electro-smith/Daisy-Juce-Example)** Stars 26 - pushed 2025-05-29 - Portability Direct
> Example of building an audio plugin using JUCE and DaisySP

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: plugin/source/PluginProcessor.cpp, plugin/source/PluginProcessor.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**9. [alexph10/bedridden](https://github.com/alexph10/bedridden)** Stars 0 - pushed 2026-05-28 - Portability Refactor
> experimental instrument synth

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: src/PluginProcessor.cpp, src/PluginProcessor.h, src/dsp/Algorithm.h, src/dsp/BBSound.h.

Added value: The implementation provides reusable DSP building blocks that can seed firmware tests or library modules.

Port idea: Lift the smallest filter, oscillator, or utility block into a Teensy/Daisy test patch before attempting the whole project.

**10. [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer)** Stars 8 - pushed 2024-11-01 - Portability Refactor
> Wavetable Synthesizer is an Android app created as a journey to overcome my own fears of C++. This project combines Kotlin, Jetpack Compose, and C++ through the Java Native Interface (JNI) to explore real-time audio processing in a mobile environment.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: app/src/main/cpp/include/audio/AudioPlayer.h, app/src/main/cpp/include/audio/AudioSource.h, app/src/main/cpp/include/audio/OboeAudioPlayer.h, app/src/main/cpp/include/wavetable/WatableFactory.h.

Added value: Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos.

Port idea: Extract the wavetable oscillator and table-generation path, then cap table size for internal SRAM or external memory.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [NO CHANGE] [magnetophon/DigiDrie](https://github.com/magnetophon/DigiDrie) | 2026-05-18 | No change |
| [NO CHANGE] [jpcima/fverb](https://github.com/jpcima/fverb) | 2022-01-10 | No change |
| [NO CHANGE] [ampactor-labs/sonido](https://github.com/ampactor-labs/sonido) | 2026-06-03 | No change |
| [UPDATED] [shawlty/Daisy-Eurorack-Audio-Module](https://github.com/shawlty/Daisy-Eurorack-Audio-Module) | 2026-06-08 | Updated |
| [NO CHANGE] [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 2026-01-20 | No change |
| [NO CHANGE] [GizzZmo/DSP4Guitar](https://github.com/GizzZmo/DSP4Guitar) | 2026-06-03 | No change |
| [NO CHANGE] [GameCult/AquaSynth](https://github.com/GameCult/AquaSynth) | 2026-06-03 | No change |
| [UPDATED] [hadencain/granular-synthesizer](https://github.com/hadencain/granular-synthesizer) | 2026-06-07 | Updated |
| [NO CHANGE] [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 2026-06-04 | No change |
| [NO CHANGE] [yakunliu-aimusic/Simple_Delay_Plugin](https://github.com/yakunliu-aimusic/Simple_Delay_Plugin) | 2026-06-03 | No change |

---

*Generated: 13 June 2026 - GitHub REST API - 18/18 queries successful - ~187 unique non-fork repos evaluated*
