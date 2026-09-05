# 2026-09-05 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1421 | 2026-09-02 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [thestk/stk](https://github.com/thestk/stk) | 1232 | 2025-03-29 | Physical modeling | Refactor | Returning - STK's MIT C++ classes cover mature digital-waveguide and modal instruments including clarinet tone-hole/vent geometry, plucked strings, modal bars, and a two-dimensional waveguide mesh. |
| 3 | [SamiPerttu/fundsp](https://github.com/SamiPerttu/fundsp) | 1205 | 2026-03-03 | DSP library | Refactor | Returning - FunDSP provides Apache-licensed no_std Rust AudioNode graphs, stack-backed fixed-arity processing, analytic linear-network responses, and a broad oscillator/filter/envelope toolkit. |
| 4 | [Chowdhury-DSP/ChowMatrix](https://github.com/Chowdhury-DSP/ChowMatrix) | 332 | 2022-07-16 | Time-domain effects | Refactor | Returning - The BSD delay core combines modulated variable interpolation, diffusion, pitch/reverse modes, feedback filtering, and nonlinear processing as independently visible DSP blocks. |
| 5 | [hollance/mda-plugins-juce](https://github.com/hollance/mda-plugins-juce) | 196 | 2026-02-25 | JUCE synth | Refactor | Returning - The MIT collection exposes heavily commented classic MDA algorithms, including JX10 and DX10 synth voices, EPiano, RezFilter, SubSynth, dynamics, delay, and spectral-free effects. |
| 6 | [Chowdhury-DSP/ChowKick](https://github.com/Chowdhury-DSP/ChowKick) | 195 | 2023-01-16 | Physical modeling | Refactor | Returning - The BSD source separates a pulse shaper, trigger, output filter, and resonant kick circuit with selectable nonlinear tanh feedback corrections derived from old drum-machine models. |
| 7 | [Signalsmith-Audio/basics](https://github.com/Signalsmith-Audio/basics) | 113 | 2026-08-26 | Time-domain effects | Refactor | Returning - The MIT reusable headers supply a Hilbert/Bode frequency shifter, Householder FDN reverb, chorus, limiter, analyser, and crunch effect behind configure/process/reset interfaces. |
| 8 | [PaulBatchelor/Soundpipe](https://github.com/PaulBatchelor/Soundpipe) | 64 | 2024-01-14 | DSP library | Refactor | Returning - Soundpipe's MIT C modules offer single-sample callbacks for physical-model percussion, Moog ladder, pluck, variable delay, granular and Csound/Faust-derived effects with independent create/init/compute lifecycles. |
| 9 | [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 50 | 2022-04-14 | Faust effect | Direct | Returning - The Faust core models a Small-Stone-style four-all-pass phaser with color-dependent sweep ranges, feedback bass cut, and a stereo LFO phase offset. |
| 10 | [atbran/aeriform](https://github.com/atbran/aeriform) | 0 | 2026-09-05 | Physical modeling | Stretch | New - AERIFORM's MIT DSP layer combines dual exciters, PolyBLEP/chaotic/noise and physical sources with three cross-fed resonators, bounded feedback, fixed 12-mode banks, and allocation-free 2x/4x IIR oversampling. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1421 - pushed 2026-09-02 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [thestk/stk](https://github.com/thestk/stk)** Stars 1232 - pushed 2025-03-29 - Portability Refactor
> The Synthesis ToolKit in C++: portable audio processing and algorithmic synthesis classes.

Why it ports: Instrument tick functions are platform-independent C++, but many delay classes allocate during construction and STK's file, socket, mutex, RtAudio, and RtMidi layers must be left out. Evidence: include/BlowHole.h, include/Mesh2D.h, include/ModalBar.h, include/Plucked.h.

Added value: STK's MIT C++ classes cover mature digital-waveguide and modal instruments including clarinet tone-hole/vent geometry, plucked strings, modal bars, and a two-dimensional waveguide mesh.

Port idea: Extract one instrument such as BlowHole or ModalBar, replace StkError/file and RtAudio hooks, pre-size every delay at setup, and run the single-sample tick path in the board callback.

**3. [SamiPerttu/fundsp](https://github.com/SamiPerttu/fundsp)** Stars 1205 - pushed 2026-03-03 - Portability Refactor
> Rust library for audio processing and synthesis with static and dynamic graph systems.

Why it ports: The crate explicitly supports no_std and stack AudioNode graphs, but some nodes require alloc and its 64-sample block path assumes wide SIMD that is not a Cortex-M7 drop-in. Evidence: src/audionode.rs, src/biquad.rs, src/delay.rs, src/filter.rs.

Added value: FunDSP provides Apache-licensed no_std Rust AudioNode graphs, stack-backed fixed-arity processing, analytic linear-network responses, and a broad oscillator/filter/envelope toolkit.

Port idea: Build a no_std static AudioNode graph with default features disabled, keep 32-bit scalar tick processing first, and exclude AudioUnit, files, FFT convolution, heap-backed buffers, and explicit wide SIMD.

**4. [Chowdhury-DSP/ChowMatrix](https://github.com/Chowdhury-DSP/ChowMatrix)** Stars 332 - pushed 2022-07-16 - Portability Refactor
> Matrix delay effect built from a growable tree of independently controlled delay lines.

Why it ports: Individual delay, diffusion, feedback, and distortion processors are separable, while the growable recursive node graph and multi-mode delay store are unsuitable for a fixed MCU build. Evidence: src/dsp/Delay/DelayProc.cpp, src/dsp/Delay/DelayProc.h, src/dsp/Delay/VariableDelay.cpp, src/dsp/Delay/VariableDelay.h.

Added value: The BSD delay core combines modulated variable interpolation, diffusion, pitch/reverse modes, feedback filtering, and nonlinear processing as independently visible DSP blocks.

Port idea: Freeze one or two DelayProc nodes into a fixed topology, keep one interpolation mode, allocate each delay from a measured static arena, and omit the recursive editor-controlled node tree.

**5. [hollance/mda-plugins-juce](https://github.com/hollance/mda-plugins-juce)** Stars 196 - pushed 2026-02-25 - Portability Refactor
> Commented JUCE implementations of the classic MDA synth and effect algorithms.

Why it ports: The algorithms are readable and modest, but most DSP state and rendering lives inside JUCE AudioProcessor implementations and the legacy code lacks parameter dezippering. Evidence: JX10/Source/PluginProcessor.cpp, DX10/Source/PluginProcessor.cpp, EPiano/Source/PluginProcessor.cpp, RezFilter/Source/PluginProcessor.cpp.

Added value: The MIT collection exposes heavily commented classic MDA algorithms, including JX10 and DX10 synth voices, EPiano, RezFilter, SubSynth, dynamics, delay, and spectral-free effects.

Port idea: Start with the JX10 voice or RezFilter loop, move DSP state out of AudioProcessor, replace JUCE MIDI/buffers with fixed callbacks, and add parameter dezippering omitted by the legacy code.

**6. [Chowdhury-DSP/ChowKick](https://github.com/Chowdhury-DSP/ChowKick)** Stars 195 - pushed 2023-01-16 - Portability Refactor
> Kick synthesizer based on creative modelling of old-school drum machine circuits.

Why it ports: The kick stages are clean DSP classes, but they currently depend on JUCE/chowdsp buffers, smoothed parameters, and XSIMD nonlinear vector math. Evidence: src/dsp/PulseShaper.cpp, src/dsp/PulseShaper.h, src/dsp/ResonantFilter.cpp, src/dsp/ResonantFilter.h.

Added value: The BSD source separates a pulse shaper, trigger, output filter, and resonant kick circuit with selectable nonlinear tanh feedback corrections derived from old drum-machine models.

Port idea: Extract the scalar pulse-plus-resonant-filter chain, replace JUCE/chowdsp parameter blocks and XSIMD vectors, and update pitch, tightness, and bounce only at control rate.

**7. [Signalsmith-Audio/basics](https://github.com/Signalsmith-Audio/basics)** Stars 113 - pushed 2026-08-26 - Portability Refactor
> Reusable MIT C++ chorus, crunch, frequency shifter, limiter, analyser, and reverb classes.

Why it ports: Effects are exposed as reusable C++ headers, but delay-backed modules allocate at configure time and frequency shifting/reverb pull in separate Hilbert or DSP submodules. Evidence: include/signalsmith-basics/chorus.h, include/signalsmith-basics/crunch.h, include/signalsmith-basics/freq-shifter.h, include/signalsmith-basics/limiter.h.

Added value: The MIT reusable headers supply a Hilbert/Bode frequency shifter, Householder FDN reverb, chorus, limiter, analyser, and crunch effect behind configure/process/reset interfaces.

Port idea: Port chorus or limiter first, replace configure-time dynamic storage with bounded arrays, then budget the eight-line FDN and leave analyser/STFT modules out of the first firmware build.

**8. [PaulBatchelor/Soundpipe](https://github.com/PaulBatchelor/Soundpipe)** Stars 64 - pushed 2024-01-14 - Portability Refactor
> A lightweight C music DSP library with independent single-sample processing modules.

Why it ports: Module compute functions are compact scalar C, but the create/init lifecycle uses heap allocation and the full library includes file, FFT, convolution, and desktop audio dependencies. Evidence: modules/drip.c, modules/moogladder.c, modules/pareq.c, modules/phasor.c.

Added value: Soundpipe's MIT C modules offer single-sample callbacks for physical-model percussion, Moog ladder, pluck, variable delay, granular and Csound/Faust-derived effects with independent create/init/compute lifecycles.

Port idea: Select one module such as drip or moogladder, replace create/init malloc with caller-owned structs and buffers, and omit file, FFT, Paulstretch, convolution, and JACK modules.

**9. [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser)** Stars 50 - pushed 2022-04-14 - Portability Direct
> A classic analog phaser effect, made with DPF and Faust

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: dsp/stone_phaser.dsp, dsp/stone_phaser_stereo.dsp, tools/chirpsynth/chirpsynth.dsp.

Added value: The Faust core models a Small-Stone-style four-all-pass phaser with color-dependent sweep ranges, feedback bass cut, and a stereo LFO phase offset.

Port idea: Generate the mono Faust kernel first, keep the four all-pass stages and feedback HPF, then add the stereo phase-offset path only after profiling.

**10. [atbran/aeriform](https://github.com/atbran/aeriform)** Stars 0 - pushed 2026-09-05 - Portability Stretch
> Oscillator-free physical-modelling synth with dual exciters and a three-resonator feedback network.

Why it ports: Its per-sample DSP is bounded and separated from JUCE, but the full 8-16 voice, dual-exciter, three-resonator, effects and 2x/4x configuration is too large; a reduced mono voice is the realistic target. Evidence: Source/DSP/Exciters/ComplexOsc.h, Source/DSP/Exciters/PhysicalExciters.h, Source/DSP/ModalResonator.h, Source/DSP/Oversampler.h.

Added value: AERIFORM's MIT DSP layer combines dual exciters, PolyBLEP/chaotic/noise and physical sources with three cross-fed resonators, bounded feedback, fixed 12-mode banks, and allocation-free 2x/4x IIR oversampling.

Port idea: Port one exciter into one 5-12 mode resonator at 1x, retain the finite/energy governor, and add a second resonator or oversampling only after SRAM and cycle measurements.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-09-02 | Updated |
| [NO CHANGE] [RustAudio/dasp](https://github.com/RustAudio/dasp) | 2026-01-12 | No change |
| [NO CHANGE] [Themaister/libfmsynth](https://github.com/Themaister/libfmsynth) | 2020-06-28 | No change |
| [NO CHANGE] [Signalsmith-Audio/dsp](https://github.com/Signalsmith-Audio/dsp) | 2026-08-23 | No change |
| [NO CHANGE] [Chowdhury-DSP/chowdsp_wdf](https://github.com/Chowdhury-DSP/chowdsp_wdf) | 2026-07-03 | No change |
| [NO CHANGE] [PaulBatchelor/sndkit](https://github.com/PaulBatchelor/sndkit) | 2025-01-23 | No change |
| [NO CHANGE] [Signalsmith-Audio/elliptic-blep](https://github.com/Signalsmith-Audio/elliptic-blep) | 2025-08-21 | No change |
| [NO CHANGE] [averagenative/0xSYNTH](https://github.com/averagenative/0xSYNTH) | 2026-04-18 | No change |
| [NO CHANGE] [marcecj/faust_mbstereophony](https://github.com/marcecj/faust_mbstereophony) | 2013-06-07 | No change |
| [NO CHANGE] [daleonov/SpringReverb](https://github.com/daleonov/SpringReverb) | 2025-09-14 | No change |

---

*Generated: 05 September 2026 - GitHub REST API - 20/20 queries successful - ~193 unique non-fork repos evaluated*
