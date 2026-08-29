# 2026-08-01 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1410 | 2026-08-01 | DSP library | Refactor | Re-entry: updated - Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer. |
| 2 | [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy) | 75 | 2026-03-12 | Daisy reference | Direct | Returning - Board-proven C++ modules give a practical reference for envelopes, drums, filters, and effects on MCU audio blocks. |
| 3 | [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 50 | 2022-04-14 | Faust effect | Direct | Returning - The Faust core models a Small-Stone-style four-all-pass phaser with color-dependent sweep ranges, feedback bass cut, and a stereo LFO phase offset. |
| 4 | [DirektDSP/PedalSuite](https://github.com/DirektDSP/PedalSuite) | 1 | 2026-07-31 | JUCE effect | Refactor | New - Electrica combines MPM/Cycfi-Q pitch tracking, onset detection, PolyBLEP voices, envelopes, filtering, and drive as an unusual audio-to-synth reference. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 5 | [ShmKnd/Patina](https://github.com/ShmKnd/Patina) | 3 | 2026-07-08 | DSP library | Direct | Returning - Patina exposes standard-library-only BBD, compander, tube, ladder-filter, tape, spring/plate-reverb, and power-sag circuit models under MIT. |
| 6 | [Arperture/Maru-Mori-Groovebox](https://github.com/Arperture/Maru-Mori-Groovebox) | 0 | 2026-07-28 | JUCE synth | Refactor | New - Its single-clock groovebox core combines acid/bass voices, one-shot drums, pads, ladder filtering, sequencing, and send effects in a compact instrument architecture. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 7 | [cescofors75/RedMaster-DaisySeed64MB](https://github.com/cescofors75/RedMaster-DaisySeed64MB) | 0 | 2026-07-30 | Daisy reference | Direct | Returning - The Daisy firmware packages 2-op FM, SH-101, TB-303, TR-505/808/909, and wavetable voices as concrete standalone drum-machine modules. License metadata is absent, so treat it as reference-only until terms are clarified. |
| 8 | [Makeph/cinderwave](https://github.com/Makeph/cinderwave) | 2 | 2026-07-23 | Filters | Direct | New - Cinderwave separates a host-testable C++17 acid voice—oscillator, ladder filter, envelopes, and sequencer—from its RP2040 hardware layer. |
| 9 | [zwaseem5/AudioPluginTool](https://github.com/zwaseem5/AudioPluginTool) | 0 | 2026-07-21 | Filters | Refactor | New - The small MIT DSP folder contributes a vocoder, pitch tracker, tremolo, and clipper with a Python regression suite rather than only plugin glue. |
| 10 | [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer) | 8 | 2024-11-01 | Wavetable synth | Refactor | Returning - Its native C++ wavetable factory and oscillator are already separated from the Kotlin UI through a narrow Oboe/JNI audio layer. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1410 - pushed 2026-08-01 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable q_lib headers are separable from q_io audio-device, stream, and file code, but templates and memory behavior still need Cortex-M7 profiling. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/fx/envelope.hpp, q_lib/include/q/fx/ladder.hpp.

Added value: Q's q_lib contributes reusable biquads, delay lines, envelopes, oscillators, and pitch utilities without requiring its q_io device layer.

Port idea: Start with q_lib biquad, delay, envelope, and oscillator headers; replace q_io with fixed board callbacks and benchmark template size plus denormal behavior.

**2. [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy)** Stars 75 - pushed 2026-03-12 - Portability Direct
> DaisySP Audio DSP Library for the Teensy 4

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: DaisySP/Effects/chorus.cpp, DaisySP/Effects/chorus.h, DaisySP/Effects/flanger.cpp, DaisySP/Effects/flanger.h.

Added value: Board-proven C++ modules give a practical reference for envelopes, drums, filters, and effects on MCU audio blocks.

Port idea: Use the module as a baseline callback implementation, then adapt parameter scaling and memory use to the target hardware.

**3. [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser)** Stars 50 - pushed 2022-04-14 - Portability Direct
> A classic analog phaser effect, made with DPF and Faust

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: dsp/stone_phaser.dsp, dsp/stone_phaser_stereo.dsp, tools/chirpsynth/chirpsynth.dsp.

Added value: The Faust core models a Small-Stone-style four-all-pass phaser with color-dependent sweep ranges, feedback bass cut, and a stereo LFO phase offset.

Port idea: Generate the mono Faust kernel first, keep the four all-pass stages and feedback HPF, then add the stereo phase-offset path only after profiling.

**4. [DirektDSP/PedalSuite](https://github.com/DirektDSP/PedalSuite)** Stars 1 - pushed 2026-07-31 - Portability Refactor
> JUCE 7 monorepo: 4 audio effect plugins (Mechanica, Hydraulica, Pneumatica, Electrica) — VST3, CLAP, AU, Standalone

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Electrica/source/DSP/Core/CycfiQPitchDetector.h, Electrica/source/DSP/Core/ElectricaDSPProcessor.h, Electrica/source/DSP/Core/FFTPeakDetector.h, Electrica/source/DSP/Core/GeneratedDictionaries.h.

Added value: Electrica combines MPM/Cycfi-Q pitch tracking, onset detection, PolyBLEP voices, envelopes, filtering, and drive as an unusual audio-to-synth reference. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Extract the mono MPM or Cycfi-Q tracker and one PolyBLEP voice; drop FFT/polyphonic dictionary modes and replace JUCE buffers with fixed analysis windows.

**5. [ShmKnd/Patina](https://github.com/ShmKnd/Patina)** Stars 3 - pushed 2026-07-08 - Portability Direct
> Patina is a general-purpose analog-modeling DSP library that emulates BBD delays, companders, tone circuits, tube amplifiers, and more — using **only the C++17 standard library**. No JUCE, no Boost, no external dependencies.Showcase:https://payhip.com/b/DNMHg

Why it ports: The DSP is organized as C++17 standard-library headers under dsp/, while JUCE and Pure Data integrations are optional apps or bindings. Evidence: dsp/circuits/bbd/BbdClock.h, dsp/circuits/bbd/BbdFeedback.h, dsp/circuits/bbd/BbdNoise.h, dsp/circuits/bbd/BbdPipeline.h.

Added value: Patina exposes standard-library-only BBD, compander, tube, ladder-filter, tape, spring/plate-reverb, and power-sag circuit models under MIT.

Port idea: Port one header-only chain such as BBD clock/noise/feedback plus compander, disable oversampling first, and allocate the delay line statically for the target memory budget.

**6. [Arperture/Maru-Mori-Groovebox](https://github.com/Arperture/Maru-Mori-Groovebox)** Stars 0 - pushed 2026-07-28 - Portability Refactor
> Psybient groovebox synth (CBL-inspired): bass + acid + drums + pads, one clock, send FX. Standalone/VST3/AU from one JUCE codebase.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/PluginProcessor.cpp, Source/PluginProcessor.h, Source/engine/dsp/AmbientADSR.h, Source/engine/dsp/DefaultKit.h.

Added value: Its single-clock groovebox core combines acid/bass voices, one-shot drums, pads, ladder filtering, sequencing, and send effects in a compact instrument architecture. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Extract the acid voice and clock/sequencer first, keep one-shot samples in external flash or SDRAM, and add pads and send effects only after CPU profiling.

**7. [cescofors75/RedMaster-DaisySeed64MB](https://github.com/cescofors75/RedMaster-DaisySeed64MB)** Stars 0 - pushed 2026-07-30 - Portability Direct
> RED808 Daisy Seed 64MB firmware — STM32H750 audio DSP for the RED808 drum machine

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: DaisySeed/synth/fm2op.h, DaisySeed/synth/sh101.h, DaisySeed/synth/tb303.h, DaisySeed/synth/tr505.h.

Added value: The Daisy firmware packages 2-op FM, SH-101, TB-303, TR-505/808/909, and wavetable voices as concrete standalone drum-machine modules. License metadata is absent, so treat it as reference-only until terms are clarified.

Port idea: Reuse one synth header at a time inside a minimal Daisy callback, then replace the project's 64 MB assumptions with explicit internal-versus-external memory budgets.

**8. [Makeph/cinderwave](https://github.com/Makeph/cinderwave)** Stars 2 - pushed 2026-07-23 - Portability Direct
> Open-hardware acid groovebox — RP2040 firmware plus a portable, host-testable C++17 DSP core (oscillators, ladder filter, envelopes, sequencer).

Why it ports: DSP evidence is already visible in portable source paths with little host/UI coupling. Evidence: include/cinderwave/envelope.h, include/cinderwave/filter.h, include/cinderwave/oscillator.h, include/cinderwave/synth.h.

Added value: Cinderwave separates a host-testable C++17 acid voice—oscillator, ladder filter, envelopes, and sequencer—from its RP2040 hardware layer.

Port idea: Compile the portable core unchanged on Cortex-M7, substitute the board audio/control layer, and raise oversampling or voice count only after cycle measurements.

**9. [zwaseem5/AudioPluginTool](https://github.com/zwaseem5/AudioPluginTool)** Stars 0 - pushed 2026-07-21 - Portability Refactor
> Real-time C++/JUCE audio effects plugin (gain, filters, tremolo, vocoder) with a Python DSP test suite

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: Source/DSP/Clipper.h, Source/DSP/PitchTracker.h, Source/DSP/Tremolo.h, Source/DSP/Vocoder.h.

Added value: The small MIT DSP folder contributes a vocoder, pitch tracker, tremolo, and clipper with a Python regression suite rather than only plugin glue.

Port idea: Start with tremolo and clipper, then bound the vocoder bands and pitch-analysis window before replacing JUCE buffers with fixed blocks.

**10. [Carrieukie/WavetableSynthesizer](https://github.com/Carrieukie/WavetableSynthesizer)** Stars 8 - pushed 2024-11-01 - Portability Refactor
> Wavetable Synthesizer is an Android app created as a journey to overcome my own fears of C++. This project combines Kotlin, Jetpack Compose, and C++ through the Java Native Interface (JNI) to explore real-time audio processing in a mobile environment.

Why it ports: Reusable DSP is present, but JUCE, VST, Android, or plugin wrappers need separating before firmware use. Evidence: app/src/main/cpp/include/audio/AudioPlayer.h, app/src/main/cpp/include/audio/AudioSource.h, app/src/main/cpp/include/audio/OboeAudioPlayer.h, app/src/main/cpp/include/wavetable/WatableFactory.h.

Added value: Its native C++ wavetable factory and oscillator are already separated from the Kotlin UI through a narrow Oboe/JNI audio layer.

Port idea: Keep the wavetable factory and oscillator, replace Oboe/JNI with the board callback, and cap table count and resolution to the available SRAM.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-08-01 | Updated |
| [UPDATED] [nabsei/montagem-808](https://github.com/nabsei/montagem-808) | 2026-07-21 | Updated |
| [NO CHANGE] [bseverns/seedBox](https://github.com/bseverns/seedBox) | 2026-07-03 | No change |
| [NO CHANGE] [mgandhi27/wave-shield-dsp](https://github.com/mgandhi27/wave-shield-dsp) | 2026-07-17 | No change |
| [NO CHANGE] [Thorwegian/libsynth](https://github.com/Thorwegian/libsynth) | 2026-07-16 | No change |
| [NO CHANGE] [Ic3zy/rt-biquad-filter](https://github.com/Ic3zy/rt-biquad-filter) | 2026-07-12 | No change |
| [NO CHANGE] [Its-Abacus/A-VST](https://github.com/Its-Abacus/A-VST) | 2026-07-16 | No change |
| [NO CHANGE] [vdgbcrypto/moog-sub37-clone](https://github.com/vdgbcrypto/moog-sub37-clone) | 2026-07-16 | No change |
| [NO CHANGE] [vdgbcrypto/gabber-kick-generator](https://github.com/vdgbcrypto/gabber-kick-generator) | 2026-07-16 | No change |
| [NO CHANGE] [vdgbcrypto/tb303-juce](https://github.com/vdgbcrypto/tb303-juce) | 2026-07-13 | No change |

---

*Generated: 01 August 2026 - GitHub REST API - 18/18 queries successful - ~186 unique non-fork repos evaluated*
