# Embedded Audio Mine — Daily digest — 2026-06-10

## Persistence note

This digest is the proposed canonical saved Markdown snapshot for 2026-06-10.

Ranked entries below are proposed published entries and should be tracked in `data/published-repo-log.csv` if this digest is committed. HOLD/watchlist entries are not published entries unless separately added to the tracker or committed as ranked entries.

No repository write was performed in this run.

## Pre-flight state

- Rules inspected: repository README, `rules/digest-rules-v0.2.md`, `rules/common-anti-repeat-policy.md`, uploaded digest template, and uploaded reference framework.
- Anti-repeat sources inspected: `data/published-repo-log.csv`, `data/selected-projects.csv`, `data/common-anti-repeat-index.csv`, and the latest committed digest found (`digests/2026-06-08.md`).
- Anti-repeat result: no hard-match found for today’s ranked candidates in the inspected common-index resource chunks (`modulove/MOD2`, `DADDesign-Projects/PENDAII-Hardware`, `DADDesign-Projects/PENDAII-Software`, `DADDesign-Projects/PENDA-Hardware`, `DADDesign-Projects/PENDA-Software`, `charlesvestal/CVCHothouse`, `FuzzyLotus/Phantasmagoria`, or the Daisy forum pedal prototyping board thread).
- Search focus: hidden hardware+firmware audio platforms, RP2350/Hagiwo-style Eurorack firmware, Daisy Seed pedal hardware/software platforms, low-latency Daisy effects, and source-visible pedal firmware.
- Non-GitHub sources searched: Daisy forum Projects and Examples, PJRC/Teensy Audio Projects forum, Daisy forum PSXVerb thread, Daisy forum pedal-prototyping-board thread, Cosmolab thread, Pollinator thread, Patch SM protoboard thread.
- User-feedback emphasis: hardware outranks firmware-only when comparable; avoid GitHub-only results; avoid 30-day repeats; prefer independent/community projects; avoid beginner demos unless they contain reusable engineering value.

## Ranked entries

| Rank | Project/resource | Lane | Main value |
|---:|---|---|---|
| 1 | `modulove/MOD2` | **STRONG_PASS** | RP2350/Hagiwo MOD2 Eurorack firmware collection with UF2 builds, multiple synthesis/percussion engines, source build path, and hardware target notes |
| 2 | `DADDesign-Projects/PENDAII-Hardware` + `PENDAII-Software` | **PASS** | Stereo Daisy Seed pedal platform with KiCad 9 hardware, codec framework, QSPI/SDRAM persistence, ST7789 GUI, MIDI, encoders, and analog dry path |
| 3 | `charlesvestal/CVCHothouse:PSXVerb` | **PASS** | Hothouse/Daisy Seed PlayStation SPU reverb recreation with 24 kHz internal processing, halfband resampling, SPU-style circular memory, and sub-ms dry path |
| 4 | `FuzzyLotus/Phantasmagoria` | **STRONG_PASS** | Flashable PedalPCB Terrarium/Daisy Seed spectral delay with reverse, freeze, warble, room/halo/evolution switch model, release binaries, and build-from-source path |
| 5 | Daisy Forum — Daisy Effect Pedal Prototyping Board | **REF_PASS** | Forum-hidden Daisy pedal hardware artifact: Terrarium-like bench PCB with buffers, 9 V input, Daisy DAC/LED headers, BOM/Gerber attachment, and Oopsy/Max flow |

---

## 1) modulove / MOD2 — **STRONG_PASS**

Repository:

```text
https://github.com/modulove/MOD2
```

### Technical summary

`modulove/MOD2` is a community firmware collection for Hagiwo’s MOD2 hardware module, based around a Seeed XIAO RP2350 target. The repository describes seven included firmware options: BRAIDS macro oscillator, CLAP, CLAVES, FM_DRUM, HIHAT, KICK, and VCO. It also provides prebuilt UF2 firmware downloads and an Arduino/arduino-cli build route for RP2040/RP2350 board support. Source evidence: repository overview, firmware list, UF2 flashing path, build commands, and hardware target notes. citeturn338527view0

### Why it matters

This is the strongest today because it is not another Daisy demo: it is a compact RP2350 Eurorack firmware ecosystem with immediate flashability, multiple voice classes, and enough hardware constraints to be practically reusable. The combination is useful for mining:

```text
RP2350 / XIAO
→ Eurorack-oriented controls
→ multiple firmware personalities
→ UF2 drag-and-drop deployment
→ Mutable-derived macro oscillator path
→ drum / percussion / VCO voice reuse
```

For your own Pico 2 / RP2350 audio experiments, this is a good concrete reference for packaging several firmware personalities around the same small hardware module.

### Implementation highlights

- Seven firmware personalities are listed in the README: BRAIDS, CLAP, CLAVES, FM_DRUM, HIHAT, KICK, and VCO. citeturn338527view0
- Prebuilt UF2 files are linked directly for each main firmware option, with GitHub Actions artifacts and Releases also described as firmware distribution paths. citeturn338527view0
- Flashing uses the Pico/Pico 2 BOOTSEL mass-storage flow: hold BOOTSEL, connect USB, then drag-and-drop a UF2. citeturn338527view0
- Source build path uses Arduino IDE or `arduino-cli`, Earle Philhower RP2040/RP2350 board support, and an example `seeed_xiao_rp2350` compile/upload target. citeturn338527view0
- The project has a `Firmware` directory and `Hardware` directory visible in the repo tree. citeturn338527view0
- The repo shows 71 commits and 3 releases, with latest shown as MOD2 v0.0.3 on 2025-11-17. citeturn338527view0

### Hardware/electronics notes

The firmware targets Hagiwo’s MOD2 hardware module. The README says the hardware is based on Seeeduino XIAO RP2350 and includes three potentiometers/CV inputs, PWM audio output, trigger/gate inputs, and a button input. The page points to Hagiwo’s page for hardware details and schematics, so this digest treats the repo as firmware-first with external hardware documentation rather than a fully self-contained hardware repo. citeturn338527view0

Electronics consequence: PWM audio output means you should expect low-pass filtering / level conditioning to matter more than with a dedicated I2S DAC. The useful pattern is “cheap voice module with flashable personalities,” not high-fidelity codec design.

### Platform relevance

RP2350 / RP2040 Arduino-Pico, Seeed XIAO RP2350, Eurorack controls, PWM audio, Mutable Instruments Braids-derived macro oscillator path, simple percussion voices, UF2 firmware packaging.

### Adaptation ideas

- Port the KICK/FM_DRUM/HIHAT voice logic to a Pico 2 + external PCM5102A I2S output if PWM noise is limiting.
- Use the repo as a template for a “multi-firmware voice cartridge” workflow on your Pico boards.
- Compare MOD2’s compact control surface against Daisy Seed/Patch projects: three pots/CV inputs + trigger/gate + button forces disciplined parameter mapping.
- Repackage one firmware personality into a MIDI module controlled from OXI One or Hydrasynth MIDI.
- Use the UF2 release model as a user-friendly distribution pattern for future beginner-flashable embedded audio projects.

### Quick engineering assessment

**STRONG_PASS.** It has source, multiple firmware targets, direct UF2 flashing, releases, and a concrete RP2350 hardware target. It is highly adaptable even though the external hardware documentation is not fully mirrored in the repo.

### Caveats / verification gaps

- No compile or flash test was run.
- Audio output is PWM, so audio quality and filtering must be verified before assuming pedal/synth-grade fidelity.
- Hardware schematics are referenced externally rather than fully summarized in the repo README.
- Individual firmware licenses may differ; the README explicitly says to check each firmware directory.

### Sources

- Repository and README: `https://github.com/modulove/MOD2`
- Firmware list, UF2 flashing, build path, hardware notes, releases: citeturn338527view0

---

## 2) DADDesign-Projects / PENDAII-Hardware + PENDAII-Software — **PASS**

Repositories:

```text
https://github.com/DADDesign-Projects/PENDAII-Hardware
https://github.com/DADDesign-Projects/PENDAII-Software
```

### Technical summary

PENDAII is a Daisy Seed stereo digital audio effects platform. The hardware repo contains KiCad 9.0 source files, schematics, PCB file, fabrication directory, and explicit hardware blocks for audio, power, Daisy Seed, and UI. The software repo is a Daisy Seed / STM32CubeIDE effect framework for the PENDAII stereo hardware, with codec initialization, real-time processing support, SDRAM/QSPI use, ST7789 GUI, encoders, MIDI, and tap-tempo footswitch UI. citeturn447900view0turn573038view1

### Why it matters

This is the best hardware-platform entry today. It is not only a pedal effect; it is a board+framework split that can be mined for a reusable Daisy pedal architecture:

```text
Daisy Seed
→ stereo audio hardware
→ analog dry path with digital control
→ codec framework
→ SDRAM/QSPI persistence
→ ST7789 display UI
→ encoders + footswitches + MIDI
→ effect code lives above hardware services
```

For your direction, the key value is the separation between hardware complexity and DSP code: the framework’s stated goal is to let effect development focus on signal processing while the platform handles the hardware layer. citeturn573038view1

### Implementation highlights

- PENDAII-Hardware includes KiCad 9.0 project files and separate schematic files such as `Alim_sch.kicad_sch`, `Audio_sch.kicad_sch`, `DaisySeed_sch.kicad_sch`, `UI_sch.kicad_sch`, a PCB file, a PDF schematic, a fabrication folder, and a `PIN.txt` file. citeturn447900view0
- PENDAII introduces stereo processing, digital input volume control, digitally managed dry/wet control, and a 100% analog dry path. citeturn447900view0
- General hardware features include mono/stereo input/output, two momentary footswitches, 2-inch SPI display compatible with ST7789, MIDI input, four push encoders, and three analog potentiometers. citeturn447900view0
- Software framework includes audio codec support, real-time processing, SDRAM for large volatile data, QSPI Flash for persistence/flashing utilities, ST7789 GUI support, DaisySeedGFX2, PendaUI, footswitch tap tempo, encoders, and MIDI protocol. citeturn573038view1
- The software repo includes STM32Cube project files, `Core`, `Drivers`, `Effect`, `DAD_Helpers`, `.ioc`, linker scripts, and Daisy pin spreadsheet. citeturn573038view1

### Hardware/electronics notes

Hardware evidence is strong: KiCad source, PCB, PDF schematic, power/audio/Daisy/UI sub-schematics, fabrication folder, and explicit analog-dry-path design intent. The analog dry path is important because it separates “always-safe dry signal” from DSP wet path and digitally controlled wet/dry mix. That is a good pedal design pattern when bypass, latency, or boot state must not destroy the dry path. citeturn447900view0

Likely engineering checkpoints before building:

- verify codec part and analog input/output headroom from `Audio_sch.kicad_sch`;
- inspect digital potentiometer topology for input gain and dry/wet management;
- check power filtering and Daisy analog/digital grounding boundaries;
- confirm the 2-inch ST7789 SPI display wiring and encoder interrupt/polling strategy;
- check whether fabrication files include enough BOM/assembly context.

### Platform relevance

Daisy Seed, STM32H750, STM32CubeIDE, codec-based stereo effects, ST7789 display UI, MIDI, encoders, footswitches, QSPI persistence, SDRAM buffers, pedal hardware.

### Adaptation ideas

- Use PENDAII as the hardware reference for a custom Daisy pedal carrier with a more Eurorack-like front panel.
- Lift the GUI/service architecture for Daisy Field or Daisy Seed effects where you want ST7789 + encoders + presets.
- Compare the analog dry path with Terrarium/Hothouse-style digital bypass to understand latency and failure-mode tradeoffs.
- Use the pin spreadsheet and `.ioc` as a practical Daisy Seed pin-planning example.
- Use the software framework as a scaffold for delay, reverb, or freeze effects where presets and system settings must persist independently.

### Quick engineering assessment

**PASS**, close to **STRONG_PASS** on hardware completeness. I keep it below MOD2 because there are no published releases and no compile/flash verification in this run. It still scores very high for hardware value and adaptability.

### Caveats / verification gaps

- No hardware fabrication or firmware build was verified.
- No releases are published for the hardware repo.
- The digest inspected repo-level evidence, not the detailed schematic nets.
- Exact codec and digital-pot part numbers need schematic-level inspection before BOM decisions.

### Sources

- PENDAII-Hardware: `https://github.com/DADDesign-Projects/PENDAII-Hardware`
- PENDAII-Software: `https://github.com/DADDesign-Projects/PENDAII-Software`
- Hardware files/features: citeturn447900view0
- Software framework/features: citeturn573038view1

---

## 3) charlesvestal / CVCHothouse — PSXVerb — **PASS**

Repository/resource:

```text
https://github.com/charlesvestal/CVCHothouse
https://raw.githubusercontent.com/charlesvestal/CVCHothouse/main/PSXVerb/README.md
```

### Technical summary

`PSXVerb` is a Hothouse/Daisy Seed implementation of the PlayStation 1 SPU reverb algorithm. The repo contains a `PSXVerb` directory under `charlesvestal/CVCHothouse`, and the PSXVerb README describes a 48 kHz Daisy/Hothouse implementation with 24 kHz internal reverb processing, 39-tap halfband decimation/interpolation, int16 saturating circular work area, six classic presets, knob control, and a sub-1 ms dry path. citeturn880757view1turn880757view2

### Why it matters

This is a compact study in “authentic constrained DSP” rather than generic reverb. The interesting part is the deliberate emulation of a hardware memory model:

```text
48 kHz Daisy audio I/O
→ 2:1 decimation
→ 24 kHz SPU-like reverb core
→ int16 saturating circular work buffer
→ PSX-style reflections / comb / all-pass stages
→ interpolation back to 48 kHz
```

That is valuable if you want to learn embedded effects design where memory layout, saturation behavior, rate conversion, and preset-specific work-area size are part of the sound.

### Implementation highlights

- The repository is a collection of Hothouse/Daisy Seed experiments with `PSXVerb` and `TapeScam` directories; it has 123 commits and is mostly C++. citeturn880757view1
- PSXVerb targets the Hothouse pedal platform: Daisy Seed / STM32H750, 48 kHz audio I/O, six knobs, one footswitch, two LEDs. citeturn880757view2
- The algorithm runs internally at 24 kHz via 2:1 decimation/interpolation and uses 39-tap halfband FIR filters. citeturn880757view2
- Work-area emulation uses a power-of-two circular buffer and int16 saturation. citeturn880757view2
- Build path is simple: ARM GCC, libDaisy, DaisySP, `dfu-util`, then `make` and `make program-dfu`. citeturn880757view2
- Memory figures are reported: 83,936 bytes flash, 17,012 bytes SRAM, largest work buffer around 62 kB, and 4-sample audio block size. citeturn880757view2

### Hardware/electronics notes

The hardware target is Hothouse, not a generic Daisy Seed breakout. The repo includes a root-level Hothouse hardware shim, with the DSP folders stated as MIT and the hardware shim / helpers under GPLv3 implications when linked together. That is relevant if you want to reuse the DSP core separately from the Hothouse control layer. citeturn880757view1

Electronics-side adaptation would require mapping the six knobs, bypass footswitch, LEDs, and codec path to your own carrier board or a Terrarium/Hothouse-compatible board.

### Platform relevance

Daisy Seed, Hothouse, libDaisy, DaisySP, pedal firmware, reverb DSP, halfband resampling, fixed-point-ish saturation models, circular buffers.

### Adaptation ideas

- Extract the SPU reverb core and wrap it in a Daisy Field UI to study memory/preset behavior visually.
- Compare 4-sample vs 16-sample block settings for dry-path latency and CPU headroom.
- Turn the preset selector into MIDI CC or OXI-controlled preset morphing.
- Use the halfband 48→24→48 structure for other CPU-saving effects.
- Port the circular work-area model to RP2350 or Teensy to compare cache/memory behavior.

### Quick engineering assessment

**PASS.** The source/build path and algorithm details are strong. It is not **STRONG_PASS** because the repo itself warns that much of the code was “vibe-coded,” and the mixed MIT/GPL hardware-layer licensing needs care before reuse.

### Caveats / verification gaps

- No build or flash test was run.
- No MIDI, no preset save/recall; controls are knob-only.
- Licensing is split between DSP folders and hardware shim.
- “Authentic” behavior depends on the correctness of the public PSX-SPX-derived implementation; this digest did not validate the algorithm numerically.

### Sources

- CVCHothouse repo: `https://github.com/charlesvestal/CVCHothouse`
- PSXVerb README: `https://raw.githubusercontent.com/charlesvestal/CVCHothouse/main/PSXVerb/README.md`
- Repo structure/license: citeturn880757view1
- PSXVerb algorithm/build/memory: citeturn880757view2

---

## 4) FuzzyLotus / Phantasmagoria — **STRONG_PASS**

Repository:

```text
https://github.com/FuzzyLotus/Phantasmagoria
```

### Technical summary

`Phantasmagoria` is a Daisy Seed / PedalPCB Terrarium spectral delay and echo-chamber pedal firmware. It combines spectral delay, reverse delay, room/halo behaviors, freeze, evolving frozen layers, tape-warble modulation, and 48 kHz echo-chamber reverb. The repo includes main DSP source, Terrarium hardware abstraction, Makefile, release tags, binary flashing instructions, and a build-from-source path through DaisyCloudSeed/libDaisy/DaisySP. citeturn573038view2turn573038view3turn228685view0

### Why it matters

This is a practical “flash it and play” Daisy pedal item with a stronger musical control model than the usual delay demo. The important engineering angle is that the switch system changes behavior inside one coherent delay/freezing instrument rather than simply stacking independent effects. That is useful for designing a playable pedal UI with limited controls.

### Implementation highlights

- Repo contents are minimal and inspectable: `phantasmagoria.cpp`, `terrarium.h`, `Makefile`, README, and license. citeturn573038view2
- Hardware requirements are Daisy Seed plus PedalPCB Terrarium or compatible Daisy Seed pedalboard. citeturn573038view3
- Flashing path supports downloading a `.bin` from releases and using the Daisy web flasher in Chrome/Edge. citeturn573038view3
- Build path uses DaisyCloudSeed with submodules, builds `libdaisy` and `DaisySP`, clones Phantasmagoria into the `petal` folder, then uses `make` and `make program-dfu`. citeturn573038view3
- Controls are mapped to six knobs, four switches, and two footswitches: delay time, feedback, reverb mix, tape warble depth, LFO speed, dry/wet, reverse, room, halo, evolution, bypass, and freeze. citeturn573038view2
- Latest release v2.11 reworks switches around REV/ROOM/HALO/EVOL, makes tape warble affect reverse delay, keeps freeze alive through bypass, fixes bypass transition dip, reshapes LFO speed control, and cleans output routing. citeturn228685view0

### Hardware/electronics notes

Hardware assumptions are Terrarium-style: six knobs, four toggles, two footswitches, Daisy Seed, and pedal I/O conditioning handled by the Terrarium-compatible board. The repository includes `terrarium.h`, which reduces dependency on a separate Terrarium submodule for the hardware abstraction. citeturn573038view3

From an electronics standpoint, it is not a hardware design repo; it is valuable because it maps a dense effect to a known open pedal carrier and provides a release binary path.

### Platform relevance

Daisy Seed, PedalPCB Terrarium, DaisyCloudSeed, libDaisy, DaisySP, delay/reverb/freeze DSP, pedal UI, release binary flashing.

### Adaptation ideas

- Use its switch model as a reference for your own Hydrasynth-friendly ambient pedal: switches should reshape the core instrument, not just add unrelated modes.
- Reuse the release-binary + Daisy web-flash workflow for user-facing Daisy pedal firmware.
- Port the freeze-survives-bypass idea to looper or granular code.
- Compare its Terrarium mapping against Hothouse/PENDA mappings to design a preferred six-knob pedal UI.
- Use the build layout as a reference for small self-contained Daisy pedal repos.

### Quick engineering assessment

**STRONG_PASS.** It has release binaries, beginner-friendly flashing instructions, source, Makefile, hardware abstraction, and a current release narrative. It is narrower than PENDAII, but immediately usable.

### Caveats / verification gaps

- No build/flash test was run.
- GPL-3.0 license may limit closed reuse.
- The current v2.11 release removed the old pitch-engine switch architecture; older descriptions mentioning shimmer/pitch shifting may not match the latest UI.
- Hardware files are not included because the target is Terrarium-compatible hardware.

### Sources

- Repository README: `https://github.com/FuzzyLotus/Phantasmagoria`
- Releases: `https://github.com/FuzzyLotus/Phantasmagoria/releases`
- Repo/source layout and feature/control map: citeturn573038view2turn573038view3
- Release notes: citeturn228685view0

---

## 5) Daisy Forum — Daisy Effect Pedal Prototyping Board — **REF_PASS**

Forum resource:

```text
https://forum.electro-smith.com/t/daisy-effect-pedal-prototyping-board/1196
```

### Technical summary

This is a Daisy forum hardware artifact rather than a polished GitHub project: a bench-top Daisy effects pedal PCB, described as similar to Terrarium, with guitar input/output buffers, tip-negative 9 V input, Daisy DAC and LED headers, plus an Oopsy / Max template flow for patching and flashing. The thread includes Gerber and BOM attachments, a JSON file, and a Max template; the author later notes a TL074 PCB correction. citeturn138299view3

### Why it matters

This is exactly the type of non-GitHub embedded-audio item that can be missed by repo-only search. It is not a finished commercial platform, but it gives useful pedal-carrier clues:

```text
Daisy Seed
→ guitar input/output buffers
→ 9 V pedal supply input
→ Daisy DAC headers
→ LED/control headers
→ Oopsy/Max patch-to-firmware path
→ Gerber/BOM attachment
```

For your own pedal/daisy experiments, it is a good “hardware scaffold” reference, especially if you want a breadboard/bench board before committing to a Terrarium, Hothouse, or PENDA-style layout.

### Implementation highlights

- The board is described as a bench-top PCB for Daisy effects, similar to Terrarium. citeturn138299view3
- It includes guitar input/output buffers, tip-negative 9 V input, and headers for the Daisy DACs and LEDs. citeturn138299view3
- The post links an Oopsy/Max template workflow for prototyping/flashing. citeturn138299view3
- The author added Gerbers, BOM, JSON, and a Max template, and notes a TL074 PCB error correction. citeturn138299view3

### Hardware/electronics notes

This item is hardware-heavy but evidence is thread/attachment based. The useful electronics patterns are:

- pedal-standard 9 V input;
- guitar input/output buffering;
- Daisy DAC header expansion;
- LED/control breakout;
- TL074 correction note, which is a practical reminder to verify op-amp pinout/supply orientation before fabrication.

### Platform relevance

Daisy Seed, pedal carrier PCB, Oopsy, Max/gen~, guitar buffers, 9 V pedal power, DIY firmware prototyping.

### Adaptation ideas

- Use the thread as a checklist for your own Daisy pedal carrier: input buffer, output buffer, 9 V protection/regulation, DAC headers, LED headers, controls.
- Compare it against Terrarium, Hothouse, and PENDAII to identify the minimum pedal test bench you actually need.
- Convert the Max/Oopsy mapping into a DaisySP/libDaisy C++ mapping so the same board can support both patching and firmware coding.
- Use it as a cautionary artifact: forum Gerbers can be valuable, but schematic/netlist verification is mandatory before ordering.

### Quick engineering assessment

**REF_PASS.** It is valuable as a hidden hardware reference and workflow pointer, not as a ready-to-build verified platform.

### Caveats / verification gaps

- The attachments were not downloaded or electrically verified.
- The thread asks later whether a schematic exists, and the inspected content did not provide a clear schematic source.
- The project is older and forum-attachment based; mirror/backup the files before relying on it.
- Treat TL074 correction as a warning sign that PCB review is required.

### Sources

- Daisy forum thread: `https://forum.electro-smith.com/t/daisy-effect-pedal-prototyping-board/1196`
- Board description, Oopsy/Max template, Gerber/BOM attachments and correction note: citeturn138299view3

---

## HOLD / watchlist

| Item | Lane | Reason |
|---|---:|---|
| Faselunare Cosmolab | HOLD | Promising Daisy Seed modular DSP dev kit with CV/gate/MIDI/OLED/illuminated controls and Arduino/C++/Max/gen~/PlugData/Faust ambitions, but inspected forum evidence says source/tutorial/docs were not yet online at the time of the post. citeturn138299view2 |
| Greg’s Brain dSpec | HOLD | Technically attractive Patch SM dual VCO/direct spectral synthesis module with 11 CV inputs, OLED spectrum display, downloadable binaries, and manual; held because public source/hardware files were not found in this run. citeturn829082view3turn707976view0turn425212view0 |
| The Pollinator | HOLD | Daisy drum sampler/synth has an interesting boom-bap feature set: microSD sample loading/saving, MIDI input, recording, 10-part playback, per-voice ADSR/filter/drive, metronome, and bass-drum synth; held because source/build files were not found. citeturn829082view0 |
| Patch SM Eurorack protoboard | HOLD | Useful Patch SM/OLED/encoder/CV/audio protoboard concept with schematic attachment, but Gerbers/build package were not present in inspected thread. citeturn822970view2 |
| apfaudio/eurorack-pmod-usb-soundcard | HOLD / REF candidate | Strong embedded-audio infrastructure reference: Eurorack PMOD as 8-channel USB2 sound card with 4 in / 4 out, prebuilt bitstreams, and LUNA/FPGA build notes; held because repo is archived/not maintained and points toward Tiliqua for the modern path. citeturn910869view0turn910869view1 |

## Rejected / not promoted

| Project/source group | Decision | Reason |
|---|---:|---|
| `Dylan-Hackett/Thaumazein`, `lewis1286/quad-boids-mixer`, `algomusic/M16`, `Farmer2K5/daisy-sdram-delaylines`, `glittershark/jazz` | Reject as repeats | Already ranked in the 2026-06-08 digest. fileciteturn11file0 |
| `recursinging/kxmx_bluemchen`, `Len42/dat-ting`, `ghostintranslation/motherboard+synth+ds909`, `Fora888/fully-digital-modular-hardware-synthesizer`, `heartwerktech/daisy_seed_tdm_eurorack_pmod` | Reject as repeats | Hard published in tracker with repeat eligibility after 2026-07-07. fileciteturn6file0 |
| `HolyBimBam/xiao-audio-midi-breakout-v1.0`, `ledlaux/vija-pico-synth`, `wgd-modular/loewenzahnhonig-firmware`, `alexiszbik/polyanalog`, `Electrotechnique/TSynth-Teensy4.1` | Reject as repeats | Hard published in tracker with repeat eligibility after 2026-07-03. fileciteturn5file0 |
| HothouseExamples / Orastron / ML_SynthTools / CTAG TBD / Oneiroi / VCMC / OpenWare / PicoSynth | Reject as repeats/foundation | Already published recently or better treated as foundation/reference context rather than a new daily item. fileciteturn5file0 |
| KRONOS Daisy Seed synth forum post | Reject | Interesting performance-synth concept, but inspected forum evidence did not reveal source/build artifacts and later discussion reads closer to an early sine-wave prototype. citeturn829082view1 |
| Daisy Seed guitar-pedal course | Reject | Useful learning material but closer to a tutorial/course than a reusable engineering artifact for this digest. citeturn822970view3 |
| Mutable Instruments module on Daisy forum thread | Reject / anti-repeat adjacent | Useful build-size discussion, but Mutable-on-Daisy/Patch Init territory overlaps recent/blocked Mutable-derived items; not enough new artifact value today. citeturn822970view1 |
| “Hyper efficient time stretching” Daisy forum thread | HOLD-to-reject | Algorithm sounds interesting, but inspected thread did not expose source files or build artifacts. citeturn822970view0 |

## Tracker update rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
modulove/MOD2,STRONG_PASS,2026-06-10,2026-06-10,2026-07-10,published,RP2350 Hagiwo MOD2 Eurorack firmware collection with UF2 builds BRAIDS percussion VCO voices Arduino build path and hardware target notes
DADDesign-Projects/PENDAII-Hardware+PENDAII-Software,PASS,2026-06-10,2026-06-10,2026-07-10,published,Daisy Seed stereo pedal hardware and software platform with KiCad 9 hardware codec framework SDRAM QSPI ST7789 GUI MIDI encoders footswitches and analog dry path
charlesvestal/CVCHothouse:PSXVerb,PASS,2026-06-10,2026-06-10,2026-07-10,published,Hothouse Daisy Seed PlayStation SPU reverb implementation with halfband resampling int16 circular work buffer six presets make dfu flow and memory figures
FuzzyLotus/Phantasmagoria,STRONG_PASS,2026-06-10,2026-06-10,2026-07-10,published,Daisy Seed PedalPCB Terrarium spectral delay with release binaries reverse freeze room halo evolution switch model web flashing and source build path
DaisyForum/Daisy-Effect-Pedal-Prototyping-Board,REF_PASS,2026-06-10,2026-06-10,2026-07-10,published,Forum hidden Daisy pedal prototyping PCB reference with guitar buffers 9V input Daisy DAC LED headers Oopsy Max template Gerbers BOM and TL074 correction caveat
```

## Optional selected-projects additions

```csv
project,url,status,origin,platforms,tags,why_selected,similarity_anchor_notes,link_status,notes
modulove/MOD2,https://github.com/modulove/MOD2,selected,digest_ranked,"RP2350,Pico2,Eurorack","rp2350,uf2,hagiwo,eurorack,braids,drum-synth,pwm-audio","Strong hidden RP2350 Eurorack firmware collection with multiple flashable voice personalities","Find compact RP2350/Pico2 Eurorack modules with UF2 distribution, multiple firmware personalities, and source-visible control mapping",verified,"Check per-firmware licenses and external Hagiwo hardware schematics before reuse"
DADDesign-Projects/PENDAII-Hardware+PENDAII-Software,https://github.com/DADDesign-Projects/PENDAII-Hardware,selected,digest_ranked,Daisy,"daisy-seed,pedal,stereo,codec,kicad,st7789,midi,qspi,sdram,analog-dry","Strong Daisy Seed stereo pedal hardware+software platform with KiCad files and reusable UI/persistence framework","Find projects with complete pedal carrier hardware plus firmware framework, analog dry path, display UI, encoders, MIDI and preset persistence",verified,"Software URL: https://github.com/DADDesign-Projects/PENDAII-Software"
charlesvestal/CVCHothouse:PSXVerb,https://github.com/charlesvestal/CVCHothouse,selected,digest_ranked,Daisy,"hothouse,reverb,psx,halfband,circular-buffer,low-latency","Useful authentic constrained-DSP reverb study for Daisy/Hothouse","Find effects that emulate hardware memory models, rate conversion, saturation, and low-latency pedal behavior",verified,"Watch license split between MIT DSP and GPL hardware shim"
FuzzyLotus/Phantasmagoria,https://github.com/FuzzyLotus/Phantasmagoria,selected,digest_ranked,Daisy,"terrarium,pedal,delay,freeze,reverse,reverb,release-binary","Flashable Daisy/Terrarium spectral delay with strong limited-control UI model","Find Daisy pedal projects with release binaries, musical switch architecture, and self-contained hardware abstraction",verified,"GPL-3.0; current v2.11 switch model differs from older pitch/shimmer release"
DaisyForum/Daisy-Effect-Pedal-Prototyping-Board,https://forum.electro-smith.com/t/daisy-effect-pedal-prototyping-board/1196,selected_extra,digest_ranked,Daisy,"forum,hardware,pedal,gerbers,bom,oopsy,max,prototype","Forum-hidden Daisy pedal PCB artifact worth saving as hardware scaffold reference","Find non-GitHub forum hardware artifacts with Gerbers/BOM, guitar buffers, 9V pedal power, and patching-to-firmware workflows",verified,"Verify attachments and schematic/netlist before fabrication"
```

## Suggested commit message

```text
Add Embedded Audio Mine digest for 2026-06-10
```

## Verification summary

- Repository rules and anti-repeat policy inspected.
- Current publication tracker and common anti-repeat index inspected.
- Latest committed daily digest inspected.
- Daisy forum and PJRC/Teensy forum searched as non-GitHub lanes.
- Ranked entries use at least two discovery lanes: GitHub source inspection and Daisy forum evidence.
- Hardware claims are tied to visible KiCad/file-tree/forum/source evidence where available.
- No repository commit/write was performed.
