# 2026-07-11 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1405 | 2026-07-09 | DSP library | Refactor | Re-entry: updated - Header-level Q DSP primitives include biquad and delay modules that can seed compact filters and time-domain effects after stripping host I/O. |
| 2 | [gapolli/strong-synthesizer](https://github.com/gapolli/strong-synthesizer) | 0 | 2026-07-08 | Virtual analog | Direct | New - The separated C++ core combines VA unison, YM2612-style FM, granular synthesis, envelopes, and filters, making it richer than another single-oscillator demo. |
| 3 | [OpenSoundStack/OpenDSP](https://github.com/OpenSoundStack/OpenDSP) | 2 | 2026-07-06 | DSP library | Direct | New - The embedded-focused C++ filter library separates analog/audio filters and IIR chains into small headers useful for firmware EQ and tone-control blocks. |
| 4 | [alphonzostudio/kintsugi-plugin](https://github.com/alphonzostudio/kintsugi-plugin) | 0 | 2026-07-05 | JUCE effect | Stretch | New - The spectral-freeze idea is useful for a distinctive effect, but the JUCE processor path needs FFT and buffer downsizing before an MCU port is credible. |
| 5 | [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 2 | 2026-07-01 | JUCE synth | Refactor | Returning - The large DSP folder exposes arpeggiator, drum, audio-stream, and synth modules that are better mined individually than ported as a full JUCE app. |
| 6 | [maxsroka/wavetable-synth](https://github.com/maxsroka/wavetable-synth) | 2 | 2026-04-20 | Wavetable synth | Refactor | New - Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos. |
| 7 | [ALH477/ai-faust-dsp-effects](https://github.com/ALH477/ai-faust-dsp-effects) | 2 | 2026-03-03 | Faust effect | Direct | New - The Faust effect set is a useful generated-DSP test corpus, with spectral, delay, and modulation patches that can be compiled one at a time and audited. |
| 8 | [Zamyk/ZamykAudio](https://github.com/Zamyk/ZamykAudio) | 1 | 2026-06-10 | DSP library | Refactor | New - ZamykAudio has reusable realtime filter code, but most repository evidence is PortAudio, file, and SDL I/O, so the value is in extracting the core ZAudio filters. |
| 9 | [khenderson20/sonic-forge-dsp](https://github.com/khenderson20/sonic-forge-dsp) | 1 | 2026-05-10 | DSP library | Direct | New - The compact delayline, oscillator, state-variable filter, and waveshaper headers form a ready MCU building-block set for modular synth voices. |
| 10 | [nicole-alassandro/faust-tone-matrix](https://github.com/nicole-alassandro/faust-tone-matrix) | 1 | 2025-01-05 | Faust synth | Direct | New - The single Faust tone-matrix patch offers a compact sequenced synth voice that can become a grid-style embedded instrument quickly. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1405 - pushed 2026-07-09 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable primitives live under `q_lib`, while the `q_io` device/file/stream paths show what should be left behind for firmware. Evidence: q_io/include/q_io/audio_device.hpp, q_io/include/q_io/audio_file.hpp, q_io/include/q_io/audio_stream.hpp, q_io/src/audio_device.cpp.

Added value: Header-level Q DSP primitives include biquad and delay modules that can seed compact filters and time-domain effects after stripping host I/O.

Port idea: Start with `q_lib/include/q/fx/biquad.hpp` or `delay.hpp`, replace `q_io` device/file streams with fixed audio blocks, then benchmark template and denormal costs on Cortex-M7.

**2. [gapolli/strong-synthesizer](https://github.com/gapolli/strong-synthesizer)** Stars 0 - pushed 2026-07-08 - Portability Direct
> A hybrid modular software synthesizer combining a low-level C++ rendering core with a real-time PySide6 GUI dashboard. Features polyphonic Virtual Analog unison, hardware-accurate Yamaha YM2612 FM emulation, and a stochastic granular engine with multi-format audio exporters.

Why it ports: `src/core` contains portable C++ headers and sources, while the PySide6 dashboard and exporters can stay on the desktop side. Evidence: src/core/include/audio_output.hpp, src/core/include/envelope.hpp, src/core/include/filter.hpp, src/core/include/granular_engine.hpp.

Added value: The separated C++ core combines VA unison, YM2612-style FM, granular synthesis, envelopes, and filters, making it richer than another single-oscillator demo.

Port idea: Ignore PySide6 and exporters; port the oscillator, FM, and granular core one voice at a time with fixed grain counts, fixed voice limits, and static buffers.

**3. [OpenSoundStack/OpenDSP](https://github.com/OpenSoundStack/OpenDSP)** Stars 2 - pushed 2026-07-06 - Portability Direct
> Real-Time and audio focused C++ DSP Library for Embedded applications

Why it ports: The small `src/filter` tree is already embedded-focused and has little host code around the audio math. Evidence: src/dsp.cpp, src/filter/analog/bandpass.h, src/filter/analog/highpass.h, src/filter/analog/lowpass.h.

Added value: The embedded-focused C++ filter library separates analog/audio filters and IIR chains into small headers useful for firmware EQ and tone-control blocks.

Port idea: Wrap the analog and audio filter classes in a Daisy or Teensy callback, add coefficient tests against desktop output, then profile block-size and denormal behavior.

**4. [alphonzostudio/kintsugi-plugin](https://github.com/alphonzostudio/kintsugi-plugin)** Stars 0 - pushed 2026-07-05 - Portability Stretch
> Spectral freeze / repair effect — JUCE audio plugin

Why it ports: The effect logic is visible in the JUCE processor, but spectral freeze usually implies FFT and buffer pressure that must be downsized before firmware use. Evidence: source/PluginProcessor.cpp, source/PluginProcessor.h.

Added value: The spectral-freeze idea is useful for a distinctive effect, but the JUCE processor path needs FFT and buffer downsizing before an MCU port is credible.

Port idea: Prototype a mono freeze with one short FFT or circular buffer, fixed window size, no GUI or preset layer, and reject it if CPU or RAM exceeds a Teensy 4.1 budget.

**5. [synthalorian/open-synth](https://github.com/synthalorian/open-synth)** Stars 2 - pushed 2026-07-01 - Portability Refactor
> An open-source, cross-platform software synthesizer built with C++ and JUCE

Why it ports: The `dsp/` modules are visible, but JUCE, app, FFI, and audio-stream layers need separating before firmware use. Evidence: dsp/arpeggiator.cpp, dsp/audio_stream.cpp, dsp/audio_stream_ffi.cpp, dsp/audio_stream_test.cpp.

Added value: The large DSP folder exposes arpeggiator, drum, audio-stream, and synth modules that are better mined individually than ported as a full JUCE app.

Port idea: Lift `dsp/drum_synth` and arpeggiator modules first, replace `audio_stream` and FFI plumbing with a board callback, and cap voices and pattern state.

**6. [maxsroka/wavetable-synth](https://github.com/maxsroka/wavetable-synth)** Stars 2 - pushed 2026-04-20 - Portability Refactor
> My synthesizer made with C++ and JUCE

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/Oscillator.cpp, Source/Oscillator.h, Source/PluginProcessor.cpp, Source/PluginProcessor.h.

Added value: Wavetable voice code offers a concrete oscillator-table path beyond stock oscillator demos.

Port idea: Extract the wavetable oscillator and table-generation path, then cap table size for internal SRAM or external memory.

**7. [ALH477/ai-faust-dsp-effects](https://github.com/ALH477/ai-faust-dsp-effects)** Stars 2 - pushed 2026-03-03 - Portability Direct
> This repository contains a collection of Digital Signal Processing (DSP) effects written in the FAUST programming language, generated by prompting various AI models. Synthetic data for training.

Why it ports: The `.dsp` files are directly generateable, but generated-by-AI patch quality needs per-patch listening and CPU checks. Evidence: v.1/chatgpt/Spectral_Maelstrom.dsp, v.1/chatgpt/Spectral_Maelstrom_Pro.dsp, v.1/claude/claude.dsp, v.1/claude/run2/reverse_warp_delay.dsp.

Added value: The Faust effect set is a useful generated-DSP test corpus, with spectral, delay, and modulation patches that can be compiled one at a time and audited.

Port idea: Compile one `.dsp` file at a time with a Faust-to-C++ flow, keep only patches with bounded delays and no oversized spectral networks, then map the surviving controls to hardware.

**8. [Zamyk/ZamykAudio](https://github.com/Zamyk/ZamykAudio)** Stars 1 - pushed 2026-06-10 - Portability Refactor
> c++ realtime audio processing library

Why it ports: Core filters exist, but PortAudio, file, and SDL I/O wrappers dominate the evidence and need to be left behind. Evidence: PortAudioIO/include/ZAudio_PortAudioIO.h, PortAudioIO/source/ZAudio_PortAudioIO.cpp, ZAudio_FileIO/include/ZAudio/FileIO.h, ZAudio_FileIO/source/FileIO.cpp.

Added value: ZamykAudio has reusable realtime filter code, but most repository evidence is PortAudio, file, and SDL I/O, so the value is in extracting the core ZAudio filters.

Port idea: Start from `ZamykAudio/include/ZAudio/AnalogFilter.h`, leave all I/O modules behind, and build a small header-only filter benchmark in a fixed-block callback.

**9. [khenderson20/sonic-forge-dsp](https://github.com/khenderson20/sonic-forge-dsp)** Stars 1 - pushed 2026-05-10 - Portability Direct
> A high-performance, real-time C++ Digital Signal Processing (DSP) library designed for modular synthesis and low-latency audio applications.

Why it ports: The header/source DSP primitives are already small and have no visible host framework in the hot path. Evidence: include/sonicforge/delayline.hpp, include/sonicforge/oscillator.hpp, include/sonicforge/state_variable_filter.hpp, include/sonicforge/waveshaper.hpp.

Added value: The compact delayline, oscillator, state-variable filter, and waveshaper headers form a ready MCU building-block set for modular synth voices.

Port idea: Port the include tree directly into a Daisy or Teensy patch, then test an oscillator to SVF to waveshaper chain with fixed block buffers.

**10. [nicole-alassandro/faust-tone-matrix](https://github.com/nicole-alassandro/faust-tone-matrix)** Stars 1 - pushed 2025-01-05 - Portability Direct
> A tone matrix synth in Faust featuring several parameters and effects

Why it ports: The single Faust `.dsp` file is directly generateable and has no visible desktop host dependency. Evidence: tone-matrix.dsp.

Added value: The single Faust tone-matrix patch offers a compact sequenced synth voice that can become a grid-style embedded instrument quickly.

Port idea: Generate C++, map matrix steps to buttons, encoders, or MIDI, then cap polyphony and effects before adding a hardware UI.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-07-09 | Updated |
| [NO CHANGE] [electro-smith/DaisySP](https://github.com/electro-smith/DaisySP) | 2025-05-29 | No change |
| [NO CHANGE] [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src) | 2026-05-25 | No change |
| [UPDATED] [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 2026-07-11 | Updated |
| [NO CHANGE] [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 2025-11-03 | No change |
| [NO CHANGE] [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 2020-04-08 | No change |
| [NO CHANGE] [jpcima/fverb](https://github.com/jpcima/fverb) | 2022-01-10 | No change |
| [NO CHANGE] [okk-otsu/wav-audio-processor](https://github.com/okk-otsu/wav-audio-processor) | 2026-07-02 | No change |
| [NO CHANGE] [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 2026-01-20 | No change |
| [NO CHANGE] [GareBear99/Instrudio](https://github.com/GareBear99/Instrudio) | 2026-07-01 | No change |

---

*Generated: 11 July 2026 - GitHub REST API - 18/18 queries successful - ~194 unique non-fork repos evaluated*
