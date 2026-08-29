# 2026-07-18 - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [cycfi/q](https://github.com/cycfi/q) | 1407 | 2026-07-13 | DSP library | Refactor | Re-entry: updated - Q adds mature C++ biquad, delay, envelope, and synth utility primitives that can seed higher-quality embedded filters and modulation blocks than another minimal example. |
| 2 | [nabsei/montagem-808](https://github.com/nabsei/montagem-808) | 1 | 2026-07-17 | JUCE synth | Refactor | New - The per-sample glide, sine/triangle blend, exponential decay, and tanh drive form a compact modern 808 bass voice with more character than a plain sine kick. |
| 3 | [bseverns/seedBox](https://github.com/bseverns/seedBox) | 3 | 2026-07-03 | Teensy reference | Direct | Returning - The granular engine is a practical Teensy reference for voice-pool sizing, grain memory limits, and live buffer scheduling rather than only desktop granular theory. |
| 4 | [mgandhi27/wave-shield-dsp](https://github.com/mgandhi27/wave-shield-dsp) | 0 | 2026-07-17 | DSP library | Refactor | New - Its value is a small no-dependency low-pass plus echo example that can be turned into a streaming block, not a ready real-time effect engine. |
| 5 | [Thorwegian/libsynth](https://github.com/Thorwegian/libsynth) | 0 | 2026-07-16 | DSP library | Direct | New - PolyBLEP oscillators plus a CEM3320/Oberheim-style stereo SVF make this a stronger subtractive-synth reference than a naïve saw/filter demo. |
| 6 | [Ic3zy/rt-biquad-filter](https://github.com/Ic3zy/rt-biquad-filter) | 0 | 2026-07-12 | DSP library | Direct | New - A tiny real-time biquad header is useful for EQ, tone-shaping, and crossover experiments when the firmware project needs a minimal C dependency. |
| 7 | [Its-Abacus/A-VST](https://github.com/Its-Abacus/A-VST) | 0 | 2026-07-16 | JUCE synth | Refactor | New - The payoff is a bundled wavetable-plus-effects voice chain: wavetable tone generation, drive, bitcrush, chorus, and delay in one extractable synth architecture. |
| 8 | [vdgbcrypto/moog-sub37-clone](https://github.com/vdgbcrypto/moog-sub37-clone) | 0 | 2026-07-16 | JUCE synth | Refactor | New - It captures a compact dual-oscillator subtractive control model with detune, mix, envelope-modulated cutoff, resonance, and VCA behavior. |
| 9 | [vdgbcrypto/gabber-kick-generator](https://github.com/vdgbcrypto/gabber-kick-generator) | 0 | 2026-07-16 | JUCE synth | Refactor | New - The pitch-decay sine body, amp envelope, selectable click source, and click envelope are a compact hardcore kick voice that maps well to a drum slot. |
| 10 | [vdgbcrypto/tb303-juce](https://github.com/vdgbcrypto/tb303-juce) | 0 | 2026-07-13 | JUCE synth | Refactor | New - The source has real 303-specific value: 16-step slide/accent patterns, PolyBLEP oscillator code, per-sample glide, and a resonant Chamberlin-style filter path. |

---

## Highlights & Port Ideas

**1. [cycfi/q](https://github.com/cycfi/q)** Stars 1407 - pushed 2026-07-13 - Portability Refactor
> C++ Library for Audio Digital Signal Processing

Why it ports: The reusable Q DSP primitives are in q_lib headers, while q_io device, file, and stream layers should stay out of firmware. Evidence: q_lib/include/q/fx/biquad.hpp, q_lib/include/q/fx/delay.hpp, q_lib/include/q/synth/envelope.hpp, q_lib/include/q/synth/oscillator.hpp.

Added value: Q adds mature C++ biquad, delay, envelope, and synth utility primitives that can seed higher-quality embedded filters and modulation blocks than another minimal example.

Port idea: Start with q_lib/include/q/fx/biquad.hpp, delay.hpp, and envelope.hpp; replace q_io with fixed board audio blocks and benchmark template size plus denormal behavior on Cortex-M7.

**2. [nabsei/montagem-808](https://github.com/nabsei/montagem-808)** Stars 1 - pushed 2026-07-17 - Portability Refactor
> One-knob 808 slide synth, the instrument at the front of the Montagem chain (JUCE, VST3/AU/Standalone)

Why it ports: The 808 voice math is concentrated in E808Processor renderBlock, but it is still wrapped in JUCE AudioProcessor, APVTS parameters, and MIDI handling. Evidence: Source/E808Processor.cpp, Source/E808Processor.h.

Added value: The per-sample glide, sine/triangle blend, exponential decay, and tanh drive form a compact modern 808 bass voice with more character than a plain sine kick.

Port idea: Extract renderBlock into a single voice class, replace JUCE smoothing and MIDI parsing with board control state, and expose Amount as glide depth plus drive on Daisy or Teensy.

**3. [bseverns/seedBox](https://github.com/bseverns/seedBox)** Stars 3 - pushed 2026-07-03 - Portability Direct
> Audio seeds grow and develop

Why it ports: Granular.cpp and AudioMemoryBudget.h already show Teensy-style DMAMEM grain pools, fixed voice limits, and explicit audio block budgeting. Evidence: src/engine/Granular.cpp, src/engine/Granular.h, src/AudioMemoryBudget.h, examples/05_live_granular/src/main.cpp.

Added value: The granular engine is a practical Teensy reference for voice-pool sizing, grain memory limits, and live buffer scheduling rather than only desktop granular theory.

Port idea: Use src/engine/Granular as the reference engine, keep the 40-voice and 2048-sample grain caps initially, then map density, size, and spray to hardware controls.

**4. [mgandhi27/wave-shield-dsp](https://github.com/mgandhi27/wave-shield-dsp)** Stars 0 - pushed 2026-07-17 - Portability Refactor
> A C++ command-line tool I built from scratch to read, process, and rewrite raw WAV audio files — no external libraries. It parses the binary file format by hand and applies custom sound effects, including a low-pass filter and an added echo/delay effect, to show real low-level systems programming skill.

Why it ports: The low-pass and echo code is plain C++, but the current design processes whole WAV data in std::vector buffers and includes parser/file flow. Evidence: wave-shield-dsp/src/dsp_effects.cpp, wave-shield-dsp/include/dsp_effects.h, wave-shield-dsp/src/wav_parser.cpp.

Added value: Its value is a small no-dependency low-pass plus echo example that can be turned into a streaming block, not a ready real-time effect engine.

Port idea: Keep dsp_effects.cpp only, replace vector-wide processing with in-place fixed audio blocks, and rework echo as a static circular buffer sized for available SRAM or PSRAM.

**5. [Thorwegian/libsynth](https://github.com/Thorwegian/libsynth)** Stars 0 - pushed 2026-07-16 - Portability Direct
> C++20 subtractive synthesizer library. Reference implementation for Noaidi FPGA synth.

Why it ports: The synth primitives are exposed as C++ headers for oscillators, ADSR, filters, frames, and modulation without a visible desktop plugin host layer. Evidence: include/dsp/oscillator.h, include/dsp/filter.h, include/dsp/adsr.h, include/dsp/frame.h.

Added value: PolyBLEP oscillators plus a CEM3320/Oberheim-style stereo SVF make this a stronger subtractive-synth reference than a naïve saw/filter demo.

Port idea: Port oscillator.h, adsr.h, and filter.h first, replace variable-length stack buffers if needed, then build one mono voice before adapting stereo and performance counters.

**6. [Ic3zy/rt-biquad-filter](https://github.com/Ic3zy/rt-biquad-filter)** Stars 0 - pushed 2026-07-12 - Portability Direct
> low-latency digital biquad filter library written in pure C for real-time audio processing and DSP pipelines.

Why it ports: The core is a single C header with coefficient/state structs and inline processing, with allocation isolated to state creation. Evidence: include/rt_biquad.h.

Added value: A tiny real-time biquad header is useful for EQ, tone-shaping, and crossover experiments when the firmware project needs a minimal C dependency.

Port idea: Allocate rt_biquad_state statically instead of calloc, compile the header as C or C++ in a Teensy/Daisy test, and validate coefficient updates outside the hot path.

**7. [Its-Abacus/A-VST](https://github.com/Its-Abacus/A-VST)** Stars 0 - pushed 2026-07-16 - Portability Refactor
> A Serum-inspired, EDM/bass-focused wavetable synth plugin (AU/VST3/Standalone) built with JUCE.

Why it ports: The DSP folder separates wavetable, distortion, bitcrush, chorus, and delay code, but the implementation still leans on JUCE dsp wrappers and plugin plumbing. Evidence: Source/DSP/Distortion/Distortion.cpp, Source/DSP/Effects/BitcrushEffect.cpp, Source/DSP/Effects/ChorusEffect.cpp, Source/DSP/Effects/DelayEffect.cpp.

Added value: The payoff is a bundled wavetable-plus-effects voice chain: wavetable tone generation, drive, bitcrush, chorus, and delay in one extractable synth architecture.

Port idea: Port the wavetable oscillator first, then replace JUCE delay/chorus/distortion helpers with fixed buffers and lookup tables sized for Daisy Seed or Teensy 4.1.

**8. [vdgbcrypto/moog-sub37-clone](https://github.com/vdgbcrypto/moog-sub37-clone)** Stars 0 - pushed 2026-07-16 - Portability Refactor
> Moog Subsequent 37-style VST3 synth clone (JUCE 8) — research specs + build. Trademark-free: original brand mark, not a Moog replica.

Why it ports: The monophonic subtractive path is visible in PluginProcessor, but oscillator, ladder filter, envelope, and parameter storage are JUCE-bound. Evidence: Source/PluginProcessor.cpp, Source/PluginProcessor.h.

Added value: It captures a compact dual-oscillator subtractive control model with detune, mix, envelope-modulated cutoff, resonance, and VCA behavior.

Port idea: Recreate the signal path with DaisySP or Teensy oscillators plus a ladder/SVF filter, then map detune, mix, cutoff, resonance, envelope amount, and ADSR to hardware controls.

**9. [vdgbcrypto/gabber-kick-generator](https://github.com/vdgbcrypto/gabber-kick-generator)** Stars 0 - pushed 2026-07-16 - Portability Refactor
> Gabber Kick Generator - JUCE 8 VST3 synth that generates gabber/hardcore kicks from scratch (pitch+amp envelope sine + transient layer)

Why it ports: The audio loop is small and per-sample, but it uses JUCE oscillator/audio buffers and APVTS parameters around the kick engine. Evidence: Source/PluginProcessor.cpp, Source/PluginProcessor.h.

Added value: The pitch-decay sine body, amp envelope, selectable click source, and click envelope are a compact hardcore kick voice that maps well to a drum slot.

Port idea: Replace the JUCE oscillator with a phase accumulator, keep pitchCoef/ampCoef/clickCoef as precomputed trigger state, and expose pitch start, decay, base note, click type, and mix.

**10. [vdgbcrypto/tb303-juce](https://github.com/vdgbcrypto/tb303-juce)** Stars 0 - pushed 2026-07-13 - Portability Refactor
> TB-303 VST3 synth plugin (JUCE 8)

Why it ports: The 303 sequencer and synth are in PluginProcessor, including pre-sized MIDI buffers, but host sync, APVTS, and JUCE processor code need removal. Evidence: Source/PluginProcessor.cpp, Source/PluginProcessor.h, Source/patterns_data.h.

Added value: The source has real 303-specific value: 16-step slide/accent patterns, PolyBLEP oscillator code, per-sample glide, and a resonant Chamberlin-style filter path.

Port idea: Extract the pattern/slide/accent state machine, PolyBLEP oscillator, and SVF coefficients into a fixed-block mono voice; replace DAW sync with MIDI clock or internal tempo.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [cycfi/q](https://github.com/cycfi/q) | 2026-07-13 | Updated |
| [NO CHANGE] [gapolli/strong-synthesizer](https://github.com/gapolli/strong-synthesizer) | 2026-07-08 | No change |
| [NO CHANGE] [OpenSoundStack/OpenDSP](https://github.com/OpenSoundStack/OpenDSP) | 2026-07-06 | No change |
| [NO CHANGE] [alphonzostudio/kintsugi-plugin](https://github.com/alphonzostudio/kintsugi-plugin) | 2026-07-05 | No change |
| [NO CHANGE] [synthalorian/open-synth](https://github.com/synthalorian/open-synth) | 2026-07-01 | No change |
| [NO CHANGE] [maxsroka/wavetable-synth](https://github.com/maxsroka/wavetable-synth) | 2026-04-20 | No change |
| [NO CHANGE] [ALH477/ai-faust-dsp-effects](https://github.com/ALH477/ai-faust-dsp-effects) | 2026-03-03 | No change |
| [NO CHANGE] [Zamyk/ZamykAudio](https://github.com/Zamyk/ZamykAudio) | 2026-06-10 | No change |
| [NO CHANGE] [khenderson20/sonic-forge-dsp](https://github.com/khenderson20/sonic-forge-dsp) | 2026-05-10 | No change |
| [UPDATED] [nicole-alassandro/faust-tone-matrix](https://github.com/nicole-alassandro/faust-tone-matrix) | 2026-07-18 | Updated |

---

*Generated: 18 July 2026 - GitHub REST API - 18/18 queries successful - ~191 unique non-fork repos evaluated*
