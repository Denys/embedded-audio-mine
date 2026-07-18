# Embedded Audio Mine — 2026-07-18 — link-first review

> Review-only rewrite of the canonical 2026-07-18 digest. This is not a second publication record. It applies the new rule that every project title links to the canonical project page and every description exposes the best available hardware-evidence subpage inline.

## Ranked projects

### 1. [Mini Synth](https://ocw.cs.pub.ro/courses/pm/prj2026/bianca.popa1106/mihai.brisculescu) — **PASS**

[Mini Synth hardware and bring-up evidence](https://ocw.cs.pub.ro/courses/pm/prj2026/bianca.popa1106/mihai.brisculescu#hardware-design) shows a current, physically assembled Teensy 4.0 instrument on a single custom PCB with 25 keys, joystick, pots, OLED, SD, battery/power circuitry, a UDA1334A stereo DAC and two MAX98357A speaker amplifiers. The same page documents the first-board jack-detect failure and its 10 kΩ pull-down correction. The public firmware adds an eight-voice Teensy Audio graph, cooperative non-blocking control loop and a roughly 440 KB DMAMEM looper. Editable KiCad PCB source and a project-level licence remain unverified, so this is a hardware-development **PASS**, not a clean derivative base.

**Sources:** [main project page](https://ocw.cs.pub.ro/courses/pm/prj2026/bianca.popa1106/mihai.brisculescu) · [hardware/schematic/BOM evidence](https://ocw.cs.pub.ro/courses/pm/prj2026/bianca.popa1106/mihai.brisculescu#hardware-design) · [firmware repository](https://github.com/MidsoftEntertainment/MiniSynth-public) · [main firmware sketch](https://github.com/MidsoftEntertainment/MiniSynth-public/blob/main/MiniSynth.ino) **(+2 additional source pages)**

### 2. [Brume](https://brume.aftertone.co/) — **PASS**

[Brume reference-hardware evidence](https://brume.aftertone.co/docs.html#hardware-compatibility) defines a reproducible Compute Module 5, CM5 IO/carrier and touchscreen appliance rather than a custom PCB. The instrument provides four parts, 24 voices, FM/harmonic/timbral/granular engines, a Rust real-time runtime, Lua extension layer and USB audio/MIDI bridge. Its value is the unusual product architecture: sound engine, UI, deployment and DAW appliance can be validated before committing to custom electronics. The source-repository location and current multichannel USB-stem status still require independent resolution.

**Sources:** [main project page](https://brume.aftertone.co/) · [reference-hardware compatibility](https://brume.aftertone.co/docs.html#hardware-compatibility) · [developer/build guide](https://brume.aftertone.co/develop.html) · [reference manual](https://brume.aftertone.co/docs.html) **(+2 additional source pages)**

### 3. [Dodepan](https://github.com/TuriSc/Dodepan) — **PASS**

[Dodepan hardware evidence](https://github.com/TuriSc/Dodepan/tree/main/hardware) shows a real RP2350 instrument rather than another rectangular collection of knobs. Twelve capacitive pads and an MPU-6050 map tapping and motion into velocity, pitch bend and filter control; local PRA32-U-derived synthesis, scales, presets and an event looper complete the instrument. The hardware package includes schematic material, Gerbers/drills, BOM, assembly guidance and printable enclosure assets. Editable PCB source and the exact hardware scope of the MIT licence remain unclear, but the physical and conceptual value is sufficient for a robust **PASS**.

**Sources:** [main repository](https://github.com/TuriSc/Dodepan) · [hardware evidence](https://github.com/TuriSc/Dodepan/tree/main/hardware) · [assembly guide](https://github.com/TuriSc/Dodepan/tree/main/hardware/assembly%20guide) · [schematic PDF](https://github.com/TuriSc/Dodepan/blob/main/hardware/Dodepan-schematic.pdf) · [author project index](https://turiscandurra.com/circuits) **(+3 additional source pages)**

## HOLD / watchlist

### [Diapasonix](https://github.com/TuriSc/Diapasonix) — **HOLD**

[Diapasonix hardware evidence](https://github.com/TuriSc/Diapasonix/tree/main/hardware) shows a working RP2350 capacitive string-layout instrument using two MPR121 controllers, AMY synthesis, effects, OLED, battery hardware and an OpenSCAD enclosure. It remains HOLD because the author explicitly describes the design as an early prototype and expects major fretboard/component changes; editable PCB source was not verified.

**Sources:** [main repository](https://github.com/TuriSc/Diapasonix) · [hardware evidence](https://github.com/TuriSc/Diapasonix/tree/main/hardware) · [schematic PDF](https://github.com/TuriSc/Diapasonix/blob/main/hardware/Diapasonix-schematic.pdf) · [author project index](https://turiscandurra.com/circuits) **(+2 additional source pages)**

### [Samplotron](https://github.com/jakubthedeveloper/Samplotron) — **HOLD**

[Samplotron physical-hardware evidence](https://hackaday.io/project/205253-samplotron-an-open-source-esp32-hardware-sampler) shows a current ESP32 standalone MIDI sampler with ES8388 audio, SD storage, OLED, two encoders and a module-based physical build. The firmware is unusually solid: 32 voices, deterministic oldest-voice stealing, RAM/stream classification, FreeRTOS task separation, prebuilt binaries and detailed technical documentation. No custom editable PCB source was found, and the current ground-loop mitigation uses an audio transformer plus isolated DC/DC module, so it remains a strong module-integration HOLD rather than a hardware-source PASS.

**Sources:** [main repository](https://github.com/jakubthedeveloper/Samplotron) · [physical build page](https://hackaday.io/project/205253-samplotron-an-open-source-esp32-hardware-sampler) · [technical documentation](https://github.com/jakubthedeveloper/Samplotron/blob/main/docs/documentation.md) · [Hackaday feature](https://hackaday.com/2026/03/19/simple-midi-sample-player-runs-on-esp32/) **(+2 additional platform sources)**

### [Puke Studio](https://puke.studio/) — **HOLD**

[Puke embedded-target and export evidence](https://puke.studio/) describes a node-based audio environment that generates microcontroller firmware, C++ projects and desktop plug-ins under an AGPL/commercial dual-licensing model. It remains HOLD because the linked source repository and the current list of supported hardware targets could not be inspected reliably. No dedicated hardware-evidence subpage was verified.

**Sources:** [main project and export evidence](https://puke.studio/)

### [The Masterpiece](https://guthman.gatech.edu/2026-finalists) — **HOLD**

[Masterpiece instrument evidence](https://guthman.gatech.edu/2026-finalists) describes an open-source accessibility instrument with nine pressure-sensitive zones, polyphonic synthesis, looping, RFID key cards and textured interfaces. The concept is exactly the sort of unusual interaction model the recalibrated mine should retain, but no primary repository, schematic, firmware or reproducible hardware package was located.

**Sources:** [Georgia Tech finalist page](https://guthman.gatech.edu/2026-finalists) · [Wired competition report](https://www.wired.com/story/georgia-tech-guthman-musical-instrument-competition-2026) **(+1 independent source)**

## Evaluation questionnaire

1. **[Mini Synth](https://ocw.cs.pub.ro/courses/pm/prj2026/bianca.popa1106/mihai.brisculescu):** A = correct #1/PASS · B = below Dodepan · C = REF_PASS until editable EDA/licence · D = STRONG_PASS because current physical evidence compensates · E = other
2. **[Brume](https://brume.aftertone.co/):** A = correct unusual-concept PASS · B = REF_PASS without custom electronics · C = HOLD until source/USB claims resolve · D = rank #1 for architecture · E = other
3. **[Dodepan](https://github.com/TuriSc/Dodepan):** A = robust PASS · B = rank #1 for interface originality · C = REF_PASS due unverified PCB source · D = HOLD until licensing/output stage improve · E = other
4. **Physical hardware without editable EDA:** A = PASS when current, built, unusual and reproducible · B = REF_PASS maximum · C = HOLD until EDA appears · D = case-by-case · E = other
5. **Unusual-concept weighting:** A = boost without quota · B = require one unusual project · C = unusual wins when evidence is comparable · D = editable electronics remains dominant · E = other
6. **Age gate:** A = reject unless meaningfully updated · B = old exceptional work may be REF_PASS · C = source completeness overrides age · D = age is only a penalty · E = other
7. **Module-based devices:** A = PASS for coherent reproducible instruments · B = REF_PASS maximum without custom PCB · C = require meaningful audio/control/power/mechanical integration · D = HOLD only · E = other
8. **Next run:** A = unusual physical interfaces · B = protocols/DAW/code generation · C = current editable hardware · D = analog/hybrid ecosystems · E = balanced mix

**Compact answer format:** `1A 2C 3B 4D 5C 6B 7C 8E`, followed by optional notes.
