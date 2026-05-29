# Embedded Audio Mine — Daily digest — 2026-05-26 — chat backfill

Backfill note: `digests/2026-05-26.md` already existed in the repository with a different canonical digest when this chat archive was saved. This file preserves the earlier Daisy/Teensy-focused chat digest without overwriting the canonical 2026-05-26 file.

I applied the repo rules, excluded the committed `2026-05-20` entries from [`data/published-repo-log.csv`](https://github.com/Denys/embedded-audio-mine/blob/main/data/published-repo-log.csv), and also avoided the repos already surfaced here on **May 22, 23, 24, and 25, 2026** unless there was a meaningful update.

## 1. Daily digest markdown

### 1) [`balazsbencs/daisy-multifx-pedal`](https://github.com/balazsbencs/daisy-multifx-pedal) — **STRONG_PASS**
A very strong “ready to steal from tomorrow” Daisy pedal repo. It is a stereo Daisy Seed stompbox with a hard-defined **Modulation → Delay → Reverb** chain, **14 algorithms**, **QSPI presets**, **USB + DIN MIDI**, **tap-tempo with MIDI-clock arbitration**, and a documented **48 kHz / 48-sample / 1 ms** audio architecture. The recent May 2026 commits are not cosmetic either: they touch diffuser timing and pitch-shifter interpolation, which is exactly the kind of low-level polish that matters on embedded FX.  
Sources: repo and README: <https://github.com/balazsbencs/daisy-multifx-pedal>

### 2) [`stone-voices/vasvas`](https://github.com/stone-voices/vasvas) — **PASS**
One of the better Daisy forum finds in the “weird but reusable” lane. `vasvas` is an open noisebox/FX instrument with **dual piezo stereo input**, **Dattorro-derived reverb**, **shimmer**, **freeze**, plus public **schematic, PCB, and source**. The forum thread shows it maturing from initial reveal in **November 2025** to a more elaborate three-effect version posted on **April 6, 2026**. Adaptation value is high for contact-mic instruments, stereo effect routing, and freeze-heavy sound objects.  
Sources: GitHub: <https://github.com/stone-voices/vasvas>, Daisy forum thread: <https://forum.electro-smith.com/t/noisebox-with-fx-processor/8879>

### 3) [`joebmz98/Weasel-West-Coast-Synthesiser`](https://github.com/joebmz98/Weasel-West-Coast-Synthesiser) — **PASS**
Obscure and interesting. Despite the README’s “east coast” typo, this is clearly a **Buchla Easel-inspired Daisy synth** with a **virtual patch bay**, **wavefolder**, **dual LPGs**, **ASR envelope**, **pulsar generator**, **sample-and-hold/random voltage**, and a **5-step sequencer** routed through a **4×7 button matrix**. The reusable idea here is not just the voice architecture, but the control topology: a dense physical UI that fakes modular routing without a screen-heavy workflow. Last push was **May 14, 2026**.  
Sources: GitHub: <https://github.com/joebmz98/Weasel-West-Coast-Synthesiser>

### 4) [`hasanalpdoyduk/Teensy_Drum_Machine`](https://github.com/hasanalpdoyduk/Teensy_Drum_Machine) — **PASS**
A fresh Teensy 4.1 build from **May 13, 2026** with better-than-average implementation detail: **16-step sequencing**, **6 sampled voices**, **USB MIDI I/O**, **24 PPQ clock output**, **state-variable filtering**, **EEPROM persistence**, and a clean manager-based firmware split. It is not the strangest item today, but it scores well on utility and adaptability because it is explicit about timers, debounce, smoothing, storage, and transport behavior instead of hand-waving them away.  
Sources: GitHub: <https://github.com/hasanalpdoyduk/Teensy_Drum_Machine>

### 5) [`Farmer2K5/daisy-reverb-playground`](https://github.com/Farmer2K5/daisy-reverb-playground) — **REF_PASS**
Still worth promoting from backlog. This is not a finished pedal or instrument; it is a **modular Daisy reverb lab** with **FDN tanks**, **Schroeder/nested/modulated diffusion**, **freeze/infinite sustain behaviors**, and several example topologies. It is exactly the kind of reference repo that can seed multiple later products. Lower build credibility than the top items, but high architecture value.  
Sources: GitHub: <https://github.com/Farmer2K5/daisy-reverb-playground>

## 2. Tracker update rows for `data/published-repo-log.csv`

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
balazsbencs/daisy-multifx-pedal,STRONG_PASS,2026-05-26,2026-05-26,2026-06-25,published,Daisy Seed stereo multi-FX pedal with 14 algorithms QSPI presets MIDI clock arbitration and 1 ms block architecture
stone-voices/vasvas,PASS,2026-05-26,2026-05-26,2026-06-25,published,Daisy noisebox with dual piezo stereo input Dattorro-style reverb shimmer freeze plus schematic PCB and source
joebmz98/Weasel-West-Coast-Synthesiser,PASS,2026-05-26,2026-05-26,2026-06-25,published,Buchla-inspired Daisy synth with virtual patch bay wavefolder LPGs random voltage and dense hardware UI
hasanalpdoyduk/Teensy_Drum_Machine,PASS,2026-05-26,2026-05-26,2026-06-25,published,Teensy 4.1 drum machine with 16-step sequencer sampled voices USB MIDI clock output filter and EEPROM persistence
Farmer2K5/daisy-reverb-playground,REF_PASS,2026-05-26,2026-05-26,2026-06-25,published,Daisy reverb research playground with FDN tanks diffusion blocks freeze behaviors and example topologies
```

## 3. HOLD / watchlist items

- [`Denys/DAFX_2_Daisy_lib`](https://github.com/Denys/DAFX_2_Daisy_lib) — **HOLD / REF backlog**. Freshly updated on **May 26, 2026** and genuinely useful as a DAFX-to-DaisySP bridge, but today I favored projects with stronger field/build signal.
- [`h4yn0nnym0u5e/AudioPatcher`](https://github.com/h4yn0nnym0u5e/AudioPatcher) — **HOLD / REF backlog**. Probably the most architecturally unusual PJRC find: run-time patchable Teensy synth objects, SoundFont support, SD patch files. Great idea density, rough docs. PJRC thread: <https://forum.pjrc.com/index.php?threads/soft-patchable-synth-proof-of-concept.76665/>
- [`codewitch-honey-crisis/Prang-Pro`](https://github.com/codewitch-honey-crisis/Prang-Pro) — **HOLD**. Clever Teensy MIDI score sampler and it surfaced again in PJRC discussion, but the repo itself still looks old relative to today’s fresher candidates.
- [`class-ab/teensy-synth`](https://github.com/class-ab/teensy-synth) — **HOLD**. Surprisingly rich build report and hardware notes, but the author explicitly warns the implementation is rough, so I kept it out of the main digest.
