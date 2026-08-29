# 2026-08-08 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1416 | 2026-08-02 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 563 | 2026-08-05 | Faust synth | Direct | Returning - Its standalone Faust sources include a stereo quadrature-LFO flanger and a three-band diode-ladder distortion, offering effect kernels beyond the browser DAW. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 3 | [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 188 | 2025-11-03 | Filters | Direct | Returning - Header-only biquads cover all-pass, shelving, Linkwitz-Riley, Butterworth, band-stop, and constant-Q EQ forms already exercised on a Cortex-M4. |
| 4 | [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 52 | 2026-01-20 | Filters | Direct | Returning - The dependency-free 0BSD header turns parallel complex one-pole sections into an analytic signal, enabling compact frequency shifters and single-sideband effects. |
| 5 | [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 33 | 2020-04-08 | Faust effect | Direct | Returning - Crossroads evolves gain-and-delay effect topologies offline and emits Faust, making it a useful source of generated comb, FIR, soft-clip, and delay structures rather than a runtime dependency. |
| 6 | [jpcima/fverb](https://github.com/jpcima/fverb) | 18 | 2022-01-10 | Faust effect | Direct | Returning - Its single Faust file implements a Dattorro-style stereo reverb with staged diffusion, modulated feedback delays, damping, and left/right decorrelation. |
| 7 | [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP) | 2 | 2026-08-04 | DSP library | Refactor | New - The MIT header library separates no-allocation fuzz, tube-preamp, tone-stack, fixed-buffer spring-reverb, and static oversampling blocks from optional plugin and convolution code. |
| 8 | [boblark/DSP_TeensyAudio_F32](https://github.com/boblark/DSP_TeensyAudio_F32) | 1 | 2020-06-16 | Teensy reference | Direct | Returning - Its Teensy F32 blocks include measured 90-degree FIR/Hilbert timing, phase analysis, arbitrary-coefficient FIR, and equalizer building blocks rather than only stock 16-bit audio nodes. |
| 9 | [YSYourSoftware/YourSound](https://github.com/YSYourSoftware/YourSound) | 0 | 2026-07-22 | VST3 synth | Refactor | New - The engine separates a morphable stored wavetable player, polyphony controller, ADSR state, and block renderer from its plugin and ImGui layers. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 10 | [Lef-F/arcturus](https://github.com/Lef-F/arcturus) | 0 | 2026-04-26 | Faust synth | Stretch | New - The Faust voice combines dual-oscillator hard sync, a Buchla-style wavefolder, filter-envelope poly-mod and vintage drift, while the effects file adds Juno-style chorus and tape-flutter delay. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1416 - pushed 2026-08-02 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [Ameobea/web-synth](https://github.com/Ameobea/web-synth)** Stars 563 - pushed 2026-08-05 - Portability Direct
> Browser-based DAW and audio synthesis platform with dozens of effects, synths, and modules

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: engine/engine/static/flanger.dsp, engine/engine/static/rain.dsp, src/graphEditor/nodes/CustomAudio/MultibandDiodeLadderDistortion/dsp.faust.

Added value: Its standalone Faust sources include a stereo quadrature-LFO flanger and a three-band diode-ladder distortion, offering effect kernels beyond the browser DAW. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Compile one Faust effect at a time to C++, replace web controls with fixed parameters, and begin with the flanger before budgeting the three-band ladder path.

**3. [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters)** Stars 188 - pushed 2025-11-03 - Portability Direct
> DSP C++ audio filters

Why it ports: The filter families are header-only sample processors and the repository documents a real-time Cortex-M4 test, leaving only callback and parameter plumbing. Evidence: lib/biquad.h, lib/biquad_modified.h, lib/filter_common.h, lib/filter_includes.h.

Added value: Header-only biquads cover all-pass, shelving, Linkwitz-Riley, Butterworth, band-stop, and constant-Q EQ forms already exercised on a Cortex-M4.

Port idea: Lift the header-only coefficient and sample functions into a fixed Daisy/Teensy block, recalculate only on parameter changes, and flush denormals.

**4. [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir)** Stars 52 - pushed 2026-01-20 - Portability Direct
> IIR Hilbert filter: short, dependency-free, header-only C++

Why it ports: The runtime is a short dependency-free single header parameterized by sample rate; the FFT design utility is not required on the target. Evidence: include/signalsmith-hilbert/hilbert.h.

Added value: The dependency-free 0BSD header turns parallel complex one-pole sections into an analytic signal, enabling compact frequency shifters and single-sideband effects.

Port idea: Compile the float header directly in a 48 kHz callback, validate phase and amplitude against its design tool, then map the complex output into a quadrature modulator.

**5. [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects)** Stars 33 - pushed 2020-04-08 - Portability Direct
> At the crossroads of programming your own audio effects, and letting your audio effects be programmed for you.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: faust_scripts/Two-pole-test.dsp, faust_scripts/bench.dsp, faust_scripts/evolve_struct.dsp, faust_scripts/evolve_struct_FIR_filter.dsp.

Added value: Crossroads evolves gain-and-delay effect topologies offline and emits Faust, making it a useful source of generated comb, FIR, soft-clip, and delay structures rather than a runtime dependency.

Port idea: Run the genetic search on a computer, keep only the emitted Faust topology, then compile that fixed kernel for the MCU and bound every evolved delay.

**6. [jpcima/fverb](https://github.com/jpcima/fverb)** Stars 18 - pushed 2022-01-10 - Portability Direct
> Plugin version of reverb effect to include in sfizz

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: fverb.dsp.

Added value: Its single Faust file implements a Dattorro-style stereo reverb with staged diffusion, modulated feedback delays, damping, and left/right decorrelation.

Port idea: Generate static C++, budget the predelay and eight diffusion/tank delays at 48 kHz, then reduce maximum predelay or modulation interpolation if SRAM or cycles are tight.

**7. [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP)** Stars 2 - pushed 2026-08-04 - Portability Refactor
> Biblioteca de DSP para áudio. C++ Audio DSP library for VST/VST3 plugins, Reaper, Audacity, and OBS Studio. Processamento e edição de áudio em tempo real. ENGINE DE PROGRAMAÇÃO VST3 E ÁUDIO.

Why it ports: The reusable header core is separate and process methods avoid allocation, but C++20 features, broad configuration, and optional plugin/convolution modules should be cut from the firmware build. Evidence: CV_DSP/Effects/Chorus.hpp, CV_DSP/Effects/Flanger.hpp, CV_DSP/Effects/Phaser.hpp, CV_DSP/Filters/AllPassFilter.hpp.

Added value: The MIT header library separates no-allocation fuzz, tube-preamp, tone-stack, fixed-buffer spring-reverb, and static oversampling blocks from optional plugin and convolution code.

Port idea: Start with VintageFuzzDSP or one tube stage, disable oversampling, replace C++20-only conveniences if needed, then size spring delays explicitly before enabling reverb.

**8. [boblark/DSP_TeensyAudio_F32](https://github.com/boblark/DSP_TeensyAudio_F32)** Stars 1 - pushed 2020-06-16 - Portability Direct
> Collected blocks for use with OpenAudio/Tympan libraries with floating point.

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: src/AudioAnalyzePhase_F32.cpp, src/AudioAnalyzePhase_F32.h, src/AudioFilter90Deg_F32.cpp, src/AudioFilter90Deg_F32.h.

Added value: Its Teensy F32 blocks include measured 90-degree FIR/Hilbert timing, phase analysis, arbitrary-coefficient FIR, and equalizer building blocks rather than only stock 16-bit audio nodes.

Port idea: Reuse the 90-degree FIR block and coefficient interface first; select a tap count from the published Teensy 4 timing, then adapt OpenAudio block ownership only if targeting Daisy.

**9. [YSYourSoftware/YourSound](https://github.com/YSYourSoftware/YourSound)** Stars 0 - pushed 2026-07-22 - Portability Refactor
> F.O.S.S. C++ Sound Engine

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: core/include/YourSound/IntegratedPlayers/BasicOSCPlayer.hpp, core/include/YourSound/IntegratedPlayers/ModLFO.hpp, core/src/IntegratedPlayers/BasicOSCPlayer.cpp, core/src/IntegratedPlayers/ModLFO.cpp.

Added value: The engine separates a morphable stored wavetable player, polyphony controller, ADSR state, and block renderer from its plugin and ImGui layers. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Extract BinPlayerWavetable with a fixed voice cap, move its tables into bounded flash or external RAM, and replace GUI parameter calls with control-rate messages.

**10. [Lef-F/arcturus](https://github.com/Lef-F/arcturus)** Stars 0 - pushed 2026-04-26 - Portability Stretch
> A hardware-first web synth for your Arturia KeyStep and BeatStep. Minimal computer, maximal knobs, built for the jam flow state.

Why it ports: The Faust kernels are extractable, but eight voices plus chorus, a 100,000-sample delay and four-comb reverb exceed a prudent internal-memory budget without reducing the configuration. Evidence: src/audio/effects.dsp, src/audio/synth.dsp.

Added value: The Faust voice combines dual-oscillator hard sync, a Buchla-style wavefolder, filter-envelope poly-mod and vintage drift, while the effects file adds Juno-style chorus and tape-flutter delay.

Port idea: Compile one mono voice first, keep hard sync plus wavefolder and filter, then shorten the 100,000-sample delay or move it to external memory before adding chorus, reverb, or polyphony.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-08-02 | Updated |
| [NO CHANGE] [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy) | 2026-03-12 | No change |
| [NO CHANGE] [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 2022-04-14 | No change |
| [NO CHANGE] [DirektDSP/PedalSuite](https://github.com/DirektDSP/PedalSuite) | 2026-07-31 | No change |
| [NO CHANGE] [ShmKnd/Patina](https://github.com/ShmKnd/Patina) | 2026-07-08 | No change |
| [NO CHANGE] [Arperture/Maru-Mori-Groovebox](https://github.com/Arperture/Maru-Mori-Groovebox) | 2026-07-28 | No change |
| [UPDATED] [cescofors75/RedMaster-DaisySeed64MB](https://github.com/cescofors75/RedMaster-DaisySeed64MB) | 2026-08-05 | Updated |
| [NO CHANGE] [Makeph/cinderwave](https://github.com/Makeph/cinderwave) | 2026-07-23 | No change |
| [NO CHANGE] [zwaseem5/AudioPluginTool](https://github.com/zwaseem5/AudioPluginTool) | 2026-07-21 | No change |
| [NO CHANGE] [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 2024-11-01 | No change |

---

*Generated: 08 August 2026 - GitHub REST API - 18/18 queries successful - ~187 unique non-fork repos evaluated*
