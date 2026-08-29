# 2026-05-16 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [Wasted-Audio/hvcc](https://github.com/Wasted-Audio/hvcc) | 396 | 2026-05-13 | Patch compiler | Refactor | NEW - compiler route gives firmware teams a real path from PD patches to static C/C++ DSP. |
| 2 | [igorski/MWEngine](https://github.com/igorski/MWEngine) | 277 | 2026-03-14 | DSP library | Refactor | NEW - Android host code needs removal, but the MIT C++ DSP/effect core is visible. |
| 3 | [marcel-licence/ML_SynthTools](https://github.com/marcel-licence/ML_SynthTools) | 234 | 2026-03-19 | Synth toolkit | Direct | NEW - embedded-friendly synth modules with current activity and concrete effect code. |
| 4 | [magnetophon/VoiceOfFaust](https://github.com/magnetophon/VoiceOfFaust) | 121 | 2025-08-09 | Faust synth | Stretch | NEW - Faust source is portable, but pitch/follower processing makes this a high-value stretch. |
| 5 | [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy) | 72 | 2026-03-12 | Teensy reference | Direct | NEW - useful bridge evidence for DaisySP-class algorithms on Teensy 4.x and Pico 2. |
| 6 | [isabelgk/airfx](https://github.com/isabelgk/airfx) | 62 | 2024-06-24 | Effect collection | Refactor | NEW - wrapper-heavy, but per-effect C++ files make selective MCU extraction realistic. |
| 7 | [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser) | 50 | 2022-04-14 | Faust effect | Direct | NEW - compact Faust phaser is one of the cleanest effect-port targets this week. |
| 8 | [Jacajack/stm32-faust-synth](https://github.com/Jacajack/stm32-faust-synth) | 35 | 2024-11-22 | Faust synth | Direct | NEW - messy but valuable STM32 proof that Faust synth kernels can live on small MCUs. |
| 9 | [anushkadas-coder/DCO6_synthesizer](https://github.com/anushkadas-coder/DCO6_synthesizer) | 2 | 2026-05-07 | JUCE synth | Refactor | NEW - low-star beta, but real separated synth-engine files make it more than a GUI shell. |
| 10 | [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark) | 2 | 2026-05-05 | DSP framework | Refactor | NEW - header-only MIT DSP blocks are promising if the C++20/toolchain footprint stays under control. |

---

## Highlights & Port Ideas

**1. [Wasted-Audio/hvcc](https://github.com/Wasted-Audio/hvcc)** Stars 396 - pushed 2026-05-13 - Portability Refactor
> Pure Data patch compiler whose generated C/C++ path can turn desktop patch ideas into firmware-sized DSP kernels.

Why it ports: The repo is Python tooling, but its `ir2c` templates include plain C signal objects such as biquad and delay, so the useful output is separable from the desktop design tool.

Added value: It adds a practical bridge from musician-friendly Pure Data prototyping to static C/C++ code for Daisy, Teensy, or STM32 targets.

Port idea: Use hvcc offline to compile a small Pure Data synth or effect, then keep only the generated C core plus board-specific audio and parameter glue.

---

**2. [igorski/MWEngine](https://github.com/igorski/MWEngine)** Stars 277 - pushed 2026-03-14 - Portability Refactor
> Android-first C++ audio engine with sequencing, synthesis, channel processing, and effect-chain code.

Why it ports: The useful C++ DSP lives under `mwengine/src/main/cpp`, but Android drivers, Java/Kotlin API, and engine scheduling must be stripped away.

Added value: It offers tempo-aware sequencing, pitch-shifted sample playback, synthesis, and effect-chain architecture beyond stock embedded examples.

Port idea: Extract one channel/effect-chain path or a small synth voice to Teensy 4.1, replacing Android I/O with a fixed audio callback.

---

**3. [marcel-licence/ML_SynthTools](https://github.com/marcel-licence/ML_SynthTools)** Stars 234 - pushed 2026-03-19 - Portability Direct
> Arduino synth module library with oscillator, chorus, delay, codec, and board-support code already close to embedded form.

Why it ports: The source tree exposes modules such as `ml_chorus`, `ml_delay`, `audio_module`, and board codec headers without requiring a plugin host.

Added value: It gives Daisy or Teensy work a ready menu of synth blocks and board patterns rather than a single demo patch.

Port idea: Lift oscillator/effect modules into a Daisy voice or compare its Arduino-style module API against Teensy Audio objects.

---

**4. [magnetophon/VoiceOfFaust](https://github.com/magnetophon/VoiceOfFaust)** Stars 121 - pushed 2025-08-09 - Portability Stretch
> Faust project that turns monophonic input into vocoder, FM, Karplus-Strong, and related follower synth voices.

Why it ports: The `.dsp` files are directly inspectable, but the external pitch tracker and vocoder-style processing make a whole port too costly for a first pass.

Added value: A vocal-controlled synth/follower engine would add a much more distinctive embedded instrument than another oscillator-filter voice.

Port idea: Start with one lightweight Faust follower voice on Daisy Seed, then replace or simplify pitch tracking before attempting vocoder variants.

---

**5. [rheslip/DaisySP_Teensy](https://github.com/rheslip/DaisySP_Teensy)** Stars 72 - pushed 2026-03-12 - Portability Direct
> Teensy 4.x and Pico 2 port of DaisySP that documents CPU expectations and embedded integration tradeoffs.

Why it ports: The repo carries DaisySP source in a Teensy/Pico-oriented layout, with README notes on Teensy 4.x CPU cost and optional framework use.

Added value: It is not novel DSP, but it is a high-value portability reference for moving Daisy-style algorithms across MCU audio stacks.

Port idea: Use it as a regression reference when porting desktop DSP blocks into a Teensy or Pico-style callback and memory model.

---

**6. [isabelgk/airfx](https://github.com/isabelgk/airfx)** Stars 62 - pushed 2024-06-24 - Portability Refactor
> More than 150 Airwindows-derived effects wrapped as Max/MSP externals with per-effect C++ source files.

Why it ports: The Airwindows DSP is present in individual `source/objects/...` C++ files, but Max Min wrapper code must be removed.

Added value: It exposes a broad shelf of reverbs, delays, filters, compressors, and saturation blocks that can be ported one at a time.

Port idea: Choose one low-memory delay, biquad, or saturation object and rewrite the Max object boundary as a Daisy or Teensy processor class.

---

**7. [jpcima/stone-phaser](https://github.com/jpcima/stone-phaser)** Stars 50 - pushed 2022-04-14 - Portability Direct
> Small Stone-style phaser implemented in Faust with generated C++ plugin code alongside the source DSP.

Why it ports: The repo includes `dsp/stone_phaser.dsp` and generated `StonePhaserDsp` files, so the effect core is easy to separate from DPF packaging.

Added value: A good phaser with color and feedback controls adds a compact, musically useful modulation effect beyond basic chorus/flanger blocks.

Port idea: Compile the Faust DSP for a fixed stereo Daisy effect and map rate, depth, color, and feedback to four hardware controls.

---

**8. [Jacajack/stm32-faust-synth](https://github.com/Jacajack/stm32-faust-synth)** Stars 35 - pushed 2024-11-22 - Portability Direct
> STM32F405 Faust synth prototype with wavetable, FM, noise, panel, and generated integration code.

Why it ports: It already proves Faust integration on an STM32F4-class board, with `.dsp` files and hardware-facing C/C++ code in one small project.

Added value: Even if messy, it is a concrete reference for using Faust as the design source for MCU synth firmware.

Port idea: Reuse the Faust-to-board integration pattern for Daisy Seed while swapping the F4 board layer for libDaisy audio and controls.

---

**9. [anushkadas-coder/DCO6_synthesizer](https://github.com/anushkadas-coder/DCO6_synthesizer)** Stars 2 - pushed 2026-05-07 - Portability Refactor
> Recent JUCE/VST3 polyphonic synth with a visible `SynthEngine` split for DCO, ADSR, ladder filter, chorus, and delay.

Why it ports: The code is still a JUCE plugin, but `Source/SynthEngine` separates the synth blocks enough to justify a focused extraction pass.

Added value: The combination of DCO voice, 4-pole ladder filter, and BBD-style chorus is a practical embedded polysynth feature set.

Port idea: Port a mono or 2-voice subset first, dropping FFT analysis and rebuilding voice allocation and smoothing for a fixed MCU audio callback.

---

**10. [CristianMoresi/DSPark](https://github.com/CristianMoresi/DSPark)** Stars 2 - pushed 2026-05-05 - Portability Refactor
> New MIT header-only C++20 DSP framework with filters, oscillators, envelopes, processor chains, FFT, reverb, and dynamics.

Why it ports: The project is dependency-light and header-only, but C++20, SIMD, FFT, and larger effect modules need toolchain and memory triage.

Added value: Its clean module set could seed a compact embedded utility layer faster than extracting blocks from a plugin repo.

Port idea: Start with `Oscillator`, `EnvelopeGenerator`, `Biquad`, `LadderFilter`, and `ProcessorChain`, leaving FFT/reverb/SIMD paths disabled until profiling.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [surge-synthesizer/surge](https://github.com/surge-synthesizer/surge) | 2026-05-05 | Updated |
| [NO CHANGE] [asb2m10/dexed](https://github.com/asb2m10/dexed) | 2026-03-19 | No change |
| [NO CHANGE] [avaneev/r8brain-free-src](https://github.com/avaneev/r8brain-free-src) | 2026-03-12 | No change |
| [NO CHANGE] [Chowdhury-DSP/BYOD](https://github.com/Chowdhury-DSP/BYOD) | 2025-08-14 | No change |
| [NO CHANGE] [Themaister/libfmsynth](https://github.com/Themaister/libfmsynth) | 2020-06-28 | No change |
| [NO CHANGE] [Chowdhury-DSP/ChowMatrix](https://github.com/Chowdhury-DSP/ChowMatrix) | 2022-07-16 | No change |
| [NO CHANGE] [midilab/jc303](https://github.com/midilab/jc303) | 2026-04-07 | No change |
| [NO CHANGE] [dimtass/DSP-Cpp-filters](https://github.com/dimtass/DSP-Cpp-filters) | 2025-11-03 | No change |
| [NO CHANGE] [Chowdhury-DSP/ChowKick](https://github.com/Chowdhury-DSP/ChowKick) | 2023-01-16 | No change |
| [UPDATED] [surge-synthesizer/sst-filters](https://github.com/surge-synthesizer/sst-filters) | 2026-05-07 | Updated |

*Generated: 16 May 2026 - GitHub REST API via Python TLS fallback after Windows curl Schannel failure - 18/18 queries successful - 177 unique non-fork repos evaluated; 26 evidence-gathered candidates; previous-status refresh used commits.atom fallback after anonymous core API limit*
