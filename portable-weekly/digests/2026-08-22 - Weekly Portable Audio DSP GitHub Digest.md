# 2026-08-22 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1417 | 2026-08-22 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 566 | 2026-08-13 | Faust synth | Direct | Re-entry: updated - Its standalone Faust sources include a stereo quadrature-LFO flanger and a three-band diode-ladder distortion, offering effect kernels beyond the browser DAW. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 3 | [odoare/Mechanodd](https://github.com/odoare/Mechanodd) | 29 | 2026-08-20 | Physical modeling | Stretch | New - Mechanodd contains dispersive bidirectional waveguide strings and bounded modal banks for plates, membranes, and beams, plus explicit feedback-loop DC/finite guards. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 4 | [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 13 | 2026-08-22 | DSP library | Refactor | New - The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile. |
| 5 | [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 4 | 2026-08-17 | JUCE synth | Refactor | Returning - Its MIT DSP folder includes a fixed-pool procedural drum engine covering 16 percussion types plus a stereo fixed-array analog delay, independent of the optional sample ROMpler. |
| 6 | [Erick-vital/chord-synth](https://github.com/Erick-vital/chord-synth) | 0 | 2026-08-22 | JUCE synth | Refactor | New - The source separates diatonic degree mapping, extensions, inversions, voicing styles, live re-voicing, and a 16-voice dual-oscillator engine into testable music and DSP modules. |
| 7 | [aar75/Eighty](https://github.com/aar75/Eighty) | 0 | 2026-08-17 | JUCE synth | Refactor | New - Its two voice models provide a CS-80 dual resonant HP/LP state-variable filter, a JP-8 IR3109-style four-stage ladder with ADAA feedback saturation, and PolyBLEP oscillators. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 8 | [EsionHsrahLatigid/BinGrave](https://github.com/EsionHsrahLatigid/BinGrave) | 0 | 2026-08-16 | JUCE effect | Stretch | New - The JUCE-independent core implements a fixed 2048-point radix-2 STFT spectral delay with per-bin phase propagation, deterministic spread, bounded feedback, freeze, and finite guards. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 9 | [Ic3zy/rt-biquad-filter](https://github.com/Ic3zy/rt-biquad-filter) | 0 | 2026-08-04 | DSP library | Direct | Returning - The MIT C99 header packages RBJ low/high shelves, peaking EQ, automatic graphic-band Q, stereo state, and epsilon-gated coefficient updates for amplifier-style tone controls. |
| 10 | [zolaski333/EngineLab](https://github.com/zolaski333/EngineLab) | 0 | 2026-08-22 | JUCE synth | Stretch | New - EngineLab synthesizes exhaust from cylinder pressure through acoustic duct and radiation models with an allocation-free callback, a distinctive physical-modeling source absent from stock embedded libraries. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1417 - pushed 2026-08-22 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/hilbert_quadrature.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [Ameobea/web-synth](https://github.com/Ameobea/web-synth)** Stars 566 - pushed 2026-08-13 - Portability Direct
> Browser-based DAW and audio synthesis platform with dozens of effects, synths, and modules

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: engine/engine/static/flanger.dsp, engine/engine/static/rain.dsp, src/graphEditor/nodes/CustomAudio/MultibandDiodeLadderDistortion/dsp.faust.

Added value: Its standalone Faust sources include a stereo quadrature-LFO flanger and a three-band diode-ladder distortion, offering effect kernels beyond the browser DAW. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Compile one Faust effect at a time to C++, replace web controls with fixed parameters, and begin with the flanger before budgeting the three-band ladder path.

**3. [odoare/Mechanodd](https://github.com/odoare/Mechanodd)** Stars 29 - pushed 2026-08-20 - Portability Stretch
> Polyphonic physical-modelling synthesizer

Why it ports: The resonator algorithms are bounded, but JUCE DSP types, per-voice instantiation, an 8-voice feedback matrix, and effects chains make only a reduced single-resonator port prudent. Evidence: Source/Resonators/WaveguideResonator.cpp, Source/Resonators/WaveguideResonator.h, Source/Resonators/ModalResonator.cpp, Source/Resonators/ModalResonator.h.

Added value: Mechanodd contains dispersive bidirectional waveguide strings and bounded modal banks for plates, membranes, and beams, plus explicit feedback-loop DC/finite guards. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Extract one mono waveguide or 8-16-mode resonator, replace JUCE DelayLine/parameter classes with fixed storage, and defer the 8-voice feedback matrix and four-slot effects chains.

**4. [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark)** Stars 13 - pushed 2026-08-22 - Portability Refactor
> Header-only audio DSP framework in pure C++20, zero dependencies. 90+ real-time processors, physical analog models, EBU R128 metering.

Why it ports: Individual header models keep allocation in prepare(), but C++20, dynamic setup storage, calibration work, and optional heavyweight processors require a deliberately small firmware subset. Evidence: Effects/TapeMachine.h, Effects/TubePreamp.h, Effects/TransformerModel.h, Core/AudioBuffer.h.

Added value: The MIT, header-only C++20 library exposes setup-thread-allocated tape, Koren triode/tone-stack, and Jiles-Atherton transformer models and ships an exceptions-free embedded profile.

Port idea: Port one TransformerModel or TubePreamp block, preallocate its channel state, start at 1x oversampling, and leave convolution, phase-vocoder, and 64-grain processors out of the firmware build.

**5. [synthalorian/open-synth](https://github.com/synthalorian/open-synth)** Stars 4 - pushed 2026-08-17 - Portability Refactor
> 🎹 Open-source synthesizer — JUCE 8/C++20 engine, sample ROMpler, 5,600 presets. Standalone + VST3 + CLAP. This is the wave.

Why it ports: The procedural drum and delay sources are separable from JUCE and the sample ROMpler, but their voice count and per-sample transcendental math need an MCU-specific pass. Evidence: dsp/drum_synth.cpp, dsp/fx_analog_delay.cpp.

Added value: Its MIT DSP folder includes a fixed-pool procedural drum engine covering 16 percussion types plus a stereo fixed-array analog delay, independent of the optional sample ROMpler.

Port idea: Extract the procedural drum pool and one stereo delay, cap simultaneous voices, replace per-sample exp/pow calls with tables or recurrences, and omit the filesystem-backed sample layer.

**6. [Erick-vital/chord-synth](https://github.com/Erick-vital/chord-synth)** Stars 0 - pushed 2026-08-22 - Portability Refactor
> Sintetizador polifónico de acordes diatónicos en C++20 con JUCE. Formatos Standalone y plugin VST3 para FL Studio con motor armónico, arpegiador y cadena de efectos DSP realtime-safe.

Why it ports: Harmony and voicing logic use bounded containers, but the current voices, filter, chorus, reverb, and tempo delay are coupled to JUCE types. Evidence: src/music/DiatonicChordVoicer.cpp, src/music/DiatonicChordVoicer.h, src/dsp/ChordVoice.cpp, src/dsp/ChordVoice.h.

Added value: The source separates diatonic degree mapping, extensions, inversions, voicing styles, live re-voicing, and a 16-voice dual-oscillator engine into testable music and DSP modules.

Port idea: Keep the fixed-size diatonic voicer and four to eight dual-oscillator voices, replace JUCE SynthesiserVoice/FX wrappers, and map the seven degree triggers to hardware buttons or MIDI.

**7. [aar75/Eighty](https://github.com/aar75/Eighty)** Stars 0 - pushed 2026-08-17 - Portability Refactor
> Dual-engine CS-80 / Jupiter-8 synth plugin (JUCE) — standalone, VST3, AU

Why it ports: The PolyBLEP oscillator and two filter models are compact headers, while the 16-voice engine, dynamic buffers, JUCE integration, and oversampling must be left behind. Evidence: Source/DSP/CS80Filter.h, Source/DSP/JP8Filter.h, Source/DSP/Oscillator.h, Source/DSP/SynthEngine.h.

Added value: Its two voice models provide a CS-80 dual resonant HP/LP state-variable filter, a JP-8 IR3109-style four-stage ladder with ADAA feedback saturation, and PolyBLEP oscillators. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Extract one mono oscillator-plus-filter voice first, disable engine-wide oversampling and the 16-voice allocator, then benchmark the CS-80 and JP-8 filters separately on Cortex-M7.

**8. [EsionHsrahLatigid/BinGrave](https://github.com/EsionHsrahLatigid/BinGrave)** Stars 0 - pushed 2026-08-16 - Portability Stretch
> Spectral delay and bin-fracture audio effect for JUCE.

Why it ports: The core is fixed-size and JUCE-independent, but its 64 x 1025 x 12-byte spectral history exceeds 0.75 MB before FFT, overlap-add, dry-delay, and snapshot storage. Evidence: Source/dsp/FixedFft.cpp, Source/dsp/FixedFft.h, Source/dsp/StftEngine.cpp, Source/dsp/StftEngine.h.

Added value: The JUCE-independent core implements a fixed 2048-point radix-2 STFT spectral delay with per-bin phase propagation, deterministic spread, bounded feedback, freeze, and finite guards. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Reduce the FFT to 512 or 1024 points and the 64-frame history to a measured external-memory budget; the current history alone is about 0.75 MB before FFT and overlap buffers.

**9. [Ic3zy/rt-biquad-filter](https://github.com/Ic3zy/rt-biquad-filter)** Stars 0 - pushed 2026-08-04 - Portability Direct
> low-latency digital biquad filter library written in pure C for real-time audio processing and DSP pipelines.

Why it ports: The C99 sample path uses precomputed coefficients and no allocation or transcendental math; only its init-time heap ownership should become caller-provided static state. Evidence: include/rt_biquad.h.

Added value: The MIT C99 header packages RBJ low/high shelves, peaking EQ, automatic graphic-band Q, stereo state, and epsilon-gated coefficient updates for amplifier-style tone controls.

Port idea: Replace its init-time calloc ownership with caller-supplied band/state structs, keep coefficient updates at control rate, and run the multiply-accumulate-only sample path in the callback.

**10. [zolaski333/EngineLab](https://github.com/zolaski333/EngineLab)** Stars 0 - pushed 2026-08-22 - Portability Stretch
> Four-stroke engine simulator and real-time audio synth (C++20/JUCE) whose exhaust sound comes from simulated cylinder pressure through a physical duct network, not samples. ECU tuner, exhaust graph editor, 16-engine catalogue, measurement harnesses.

Why it ports: The allocation-free audio path is separable, but the full multi-cylinder C++20/JUCE model and optional convolution are too large; only a reduced fixed acoustic path is realistic. Evidence: src/audio/include/enginelab/audio/AcousticExhaustNetwork.hpp, src/audio/include/enginelab/audio/DuctWallLoss.hpp, src/audio/include/enginelab/audio/PipeRadiationModel.hpp, src/audio/src/RealtimeEngineAudio.cpp.

Added value: EngineLab synthesizes exhaust from cylinder pressure through acoustic duct and radiation models with an allocation-free callback, a distinctive physical-modeling source absent from stock embedded libraries.

Port idea: Keep one cylinder-pressure exciter and one fixed duct/radiation path, remove JUCE, JSON, convolution and graph editing, and profile the reduced C++20 core as a mono 48 kHz voice.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-08-22 | Updated |
| [UPDATED] [Ameobea/web-synth](https://github.com/Ameobea/web-synth) | 2026-08-13 | Updated |
| [NO FRESH DATA] [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 2026-08-08 | No fresh data |
| [NO CHANGE] [Signalsmith-Audio/hilbert-iir](https://github.com/Signalsmith-Audio/hilbert-iir) | 2026-01-20 | No change |
| [NO CHANGE] [jatinchowdhury18/CrossroadsEffects](https://github.com/jatinchowdhury18/CrossroadsEffects) | 2020-04-08 | No change |
| [NO CHANGE] [jpcima/fverb](https://github.com/jpcima/fverb) | 2022-01-10 | No change |
| [NO CHANGE] [clovesrodrigues/AUDIO_DSP](https://github.com/clovesrodrigues/AUDIO_DSP) | 2026-08-04 | No change |
| [NO CHANGE] [boblark/DSP_TeensyAudio_F32](https://github.com/boblark/DSP_TeensyAudio_F32) | 2020-06-16 | No change |
| [UPDATED] [YSYourSoftware/YourSound](https://github.com/YSYourSoftware/YourSound) | 2026-08-17 | Updated |
| [NO CHANGE] [Lef-F/arcturus](https://github.com/Lef-F/arcturus) | 2026-04-26 | No change |

---

*Generated: 22 August 2026 - GitHub REST API - 20/20 queries successful - ~191 unique non-fork repos evaluated*
