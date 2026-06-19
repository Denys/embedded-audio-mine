# Embedded Audio Mine — Visual Hardware / Open-Hardware Digest — 2026-06-19

## Persistence note

This digest is the corrected saved Markdown snapshot for the 2026-06-19 visual hardware mining pass.

It supersedes the earlier chat draft that mixed newly discovered candidates, previously published projects, and HOLD items too tightly. Previously published projects are preserved below as benchmarks and honorable mentions, but are not re-ranked as new entries.

Ranked entries below are publication candidates and should be tracked via `data/published-repo-log.append-2026-06-19.csv` or merged into `data/published-repo-log.csv` when regenerating the common anti-repeat index.

## Pre-flight state

- Rules inspected: `README.md`, `rules/digest-rules-v0.2.md`, `rules/common-anti-repeat-policy.md`.
- Anti-repeat sources inspected: `data/published-repo-log.csv`, `data/common-anti-repeat-index.csv`.
- Search focus: buildable visually strong open-hardware embedded-audio projects with real hardware files, case/panel/enclosure evidence, practical controls, and audio-device relevance.
- User-feedback emphasis: open-source hardware only; prefer standalone devices and projects with solid control surfaces; do not re-promote already-published projects; keep prior published projects and honorable mentions visible.
- Verification status: several candidates still require deeper license/mechanical-file verification before being treated as fully production-safe.

## Executive summary

Active replacements should be: **Plinky**, **OTTO**, **norns-shield**, **Zynthian HW + case**, **AudCalc**, **LeetAI**, **Winterbloom Big Honking Button**, **Winterbloom Sol**, **Winterbloom Castor & Pollux**, **preenfm3**, and **preenfm2**.

Already-published items were moved out of the active ranking and preserved as previous-published benchmarks: `GuitarML/FunBox`, `Befaco/Oneiroi`, `rheslip/2HPico-Eurorack-Module-Hardware`, `Befaco/VCMC`, `balazsbencs/daisy-multifx-pedal`, and `kooliha/Ouroboros_Loop_Station`.

## Ranked entries

### 1) Plinky — **STRONG_PASS**

**Technical summary:** 8-voice touch synthesizer with open hardware and software, performance touch surface, firmware releases, and visible product-form hardware.

**Why it matters:** Strong reference for making a compact embedded synth feel like an instrument instead of a dev board. The touch keyboard/control surface is the reusable part.

**Implementation highlights:**
- Repo exposes `hw`, `imgs`, `sw`, bootloader, release binaries, and UF2/bin firmware artifacts.
- README states both hardware and software were open-sourced.
- Useful study target for capacitive/touch UI, embedded synth UX, and compact PCB-front-panel integration.

**Hardware/electronics notes:**
- Hardware folder and image assets are present.
- Full production suitability depends on reading the exact license and checking fabrication outputs.

**Platform relevance:** embedded standalone synth / touch control surface.

**Adaptation ideas:**
- Use as benchmark for a thin desktop synth or controller with high perceived UI density.
- Reuse control-surface philosophy rather than cloning the synth.

**Quick engineering assessment:** Best visual/control-surface candidate of the pass.

**Caveats / verification gaps:** License wording requires full read before commercial derivative assumptions.

**Sources:**
- https://github.com/plinkysynth/plinky_public

---

### 2) OTTO + OTTO-hardware — **STRONG_PASS**

**Technical summary:** Open-source digital hardware synth/groovebox/FX processor concept with companion hardware repo containing board files, render assets, and mechanical alignment files.

**Why it matters:** One of the best controls-rich standalone inspirations: screen, grid, encoders, key matrix, keyboard-like performance surface, Pi/STM32 split, audio codec, line I/O, headphone, mic amp, and speaker amp.

**Implementation highlights:**
- Hardware repo includes board folders for DAC, main, and power boards.
- Includes image assets and a DXF alignment file.
- GPL-3.0 license surfaced in repo.
- Control surface: 40 function keys, 4 clickable encoders, TFT display, keyboard section.

**Hardware/electronics notes:**
- SGTL5000 codec path.
- Dedicated DC/LiPo power board concept.
- Audio I/O includes line, headphone, mic amp, and speaker amp blocks.

**Platform relevance:** Raspberry Pi + STM32F103 standalone embedded audio workstation/groovebox pattern.

**Adaptation ideas:**
- Study UI matrix partitioning and board split.
- Good reference for a larger “hardware product” with Pi-class compute and MCU scan/control layer.

**Quick engineering assessment:** Highest-value controls-rich standalone hardware architecture, but not low-risk as a first build.

**Caveats / verification gaps:** Project is WIP; treat as architecture/mechanical inspiration before relying on build reproducibility.

**Sources:**
- https://github.com/bitfieldaudio/OTTO
- https://github.com/cester-ino/OTTO-hardware

---

### 3) monome norns-shield — **STRONG_PASS**

**Technical summary:** Minimal open-source Raspberry Pi audio shield for the norns ecosystem with codec, encoders, buttons, OLED, BOM, CAD, Eagle files, images, and schematic.

**Why it matters:** Excellent example of restrained instrument design: very few controls, but coherent interaction and clean mechanical package.

**Implementation highlights:**
- Repo contains BOM, CAD, Eagle files, image assets, license, and schematic PDF.
- Uses OLED, 3 encoders, and 3 buttons.
- Pi shield format with audio codec and line I/O.

**Hardware/electronics notes:**
- CS4270/CS4271 codec family.
- Stereo line input/output.
- Mechanical BOM includes standoffs, spacers, and screws.

**Platform relevance:** Raspberry Pi embedded audio appliance / norns ecosystem.

**Adaptation ideas:**
- Strong reference for a minimalist desktop audio device with scriptable DSP/synthesis backend.
- Useful mechanical pattern for small sandwich-style appliances.

**Quick engineering assessment:** Very complete, mechanically credible, and visually disciplined.

**Caveats / verification gaps:** No battery, no dedicated headphone amp, and monome notes that the project is no longer directly supported.

**Sources:**
- https://github.com/monome/norns-shield

---

### 4) Zynthian hardware + case — **STRONG_PASS**

**Technical summary:** Open hardware/case ecosystem for a Raspberry Pi synth/effects workstation with PCB/schematic/parts/pin-assignment resources and multiple enclosure manufacturing approaches.

**Why it matters:** Best pass candidate for studying product-level case strategy around a Pi-based audio workstation.

**Implementation highlights:**
- Hardware repository includes PCB, scheme, parts, and pin-assignment resources.
- Case repository includes 3D-print, aluminum, laser-cut, steel, CNC, photo, and render assets.
- CC-BY-SA 4.0 license surfaced in the case repository.

**Hardware/electronics notes:**
- Strong mechanical evidence across multiple enclosure technologies.
- Useful for assessing manufacturability tradeoffs: 3D print vs laser-cut vs aluminum vs CNC/steel.

**Platform relevance:** Raspberry Pi standalone synth/effects workstation.

**Adaptation ideas:**
- Case-system reference for a future desktop synth or embedded audio appliance.
- Good model for separating electronics repo and enclosure repo.

**Quick engineering assessment:** Strong visual/mechanical reference, less hidden but still highly reusable.

**Caveats / verification gaps:** Need exact hardware-board license verification for each board generation before commercial reuse.

**Sources:**
- https://github.com/zynthian/zynthian-hw
- https://github.com/zynthian/zynthian-case

---

### 5) jonbro/Audcalc — **STRONG_PASS**

**Technical summary:** RP2040 pocket groovebox with enclosure, hardware KiCad project, images, firmware, build guide, and MIT license.

**Why it matters:** Good compact standalone groovebox reference with real mechanical and board evidence, not only firmware.

**Implementation highlights:**
- Repo includes enclosure, hardware, images, firmware, and guide folders.
- KiCad hardware project and BOM notes are present.
- Uses OLED, pots, audio/MIDI jacks, and battery-related hardware.

**Hardware/electronics notes:**
- Compact pocket-device mechanical packaging.
- Useful for small battery/USB powered instrument thinking.

**Platform relevance:** RP2040 standalone groovebox / pocket synth class.

**Adaptation ideas:**
- Adapt hardware layout/control density ideas for a small sampler/groovebox.
- Study battery/mechanical compromise in a compact audio device.

**Quick engineering assessment:** One of the strongest “hidden but buildable-looking” standalone candidates.

**Caveats / verification gaps:** Needs detailed audio path and enclosure tolerance review before build confidence.

**Sources:**
- https://github.com/jonbro/Audcalc

---

### 6) vonkonow/LeetAI — **PASS**

**Technical summary:** Portable ESP32-S2 synthesizer concept with enclosure, firmware, hardware, assets, MIT license, TFT display, magnetic encoders, RGB keys, DAC, USB MIDI, ESP-NOW sync, and LiPo power.

**Why it matters:** Very strong visual/UX concept for a handheld synth/control device, even if prototype maturity must be checked.

**Implementation highlights:**
- Repo exposes assets, enclosure, firmware, and hardware folders.
- MIT license surfaced.
- UI includes 16 RGB keys, TFT display, and two magnetic encoders.

**Hardware/electronics notes:**
- DAC and LiPo-powered portable architecture.
- Interesting ESP-NOW sync angle for distributed/portable devices.

**Platform relevance:** ESP32-S2 handheld/portable synth.

**Adaptation ideas:**
- Study compact key grid and encoder/display placement.
- Use as visual concept anchor for a portable MIDI/audio device.

**Quick engineering assessment:** Strong concept and source structure; lower confidence than AudCalc due prototype/product maturity.

**Caveats / verification gaps:** Needs deeper check of BOM completeness, audio quality, and actual build reports.

**Sources:**
- https://github.com/vonkonow/LeetAI

---

### 7) Winterbloom Big Honking Button — **PASS**

**Technical summary:** Eurorack sampler/performance module with faceplate, firmware, hardware, samples, user guide, MIT code license, and CC-BY-SA hardware licensing.

**Why it matters:** Good open-hardware Eurorack example with clear faceplate and performance-centered control concept.

**Implementation highlights:**
- Repo includes faceplate, firmware, hardware, samples, and user guide folders.
- Code license: MIT.
- Hardware license: CC-BY-SA 4.0.

**Hardware/electronics notes:**
- Strong panel evidence.
- Performance-button ergonomics are the main reusable idea.

**Platform relevance:** Eurorack sampler/performance module.

**Adaptation ideas:**
- Use as study reference for one-big-control UI in a module or pedal.
- Consider translating the concept into a standalone sample trigger box.

**Quick engineering assessment:** Strong open-source packaging discipline.

**Caveats / verification gaps:** Verify firmware target and audio path details before practical adaptation.

**Sources:**
- https://github.com/wntrblm/Big_Honking_Button

---

### 8) Winterbloom Sol — **PASS**

**Technical summary:** Open-source CircuitPython MIDI-to-CV Eurorack module with firmware, hardware, user guide, MIT code license, and CC-BY-SA hardware licensing.

**Why it matters:** Good CV/MIDI interface reference with open hardware and clean docs structure.

**Implementation highlights:**
- Repo includes firmware, hardware, and user guide folders.
- Code license: MIT.
- Hardware license: CC-BY-SA 4.0.

**Hardware/electronics notes:**
- Relevant for MIDI-to-CV scaling, Eurorack I/O, calibration, and module front-panel design.

**Platform relevance:** Eurorack MIDI/CV utility.

**Adaptation ideas:**
- Reuse as reference for MIDI/CV expansion board or standalone CV utility.
- Study docs and calibration approach.

**Quick engineering assessment:** Less visually spectacular than Plinky/OTTO, but cleaner as open-source hardware evidence.

**Caveats / verification gaps:** Need detailed schematic review for precision/output protection conclusions.

**Sources:**
- https://github.com/wntrblm/Sol

---

### 9) Winterbloom Castor & Pollux — **PASS**

**Technical summary:** Juno-inspired Eurorack dual oscillator with KiCad mainboard, jackboard, panel, programming board, firmware, factory setup/calibration scripts, and user guide.

**Why it matters:** Strong analog/digital hybrid module reference with multiple board partitions and explicit panel files.

**Implementation highlights:**
- Hardware folders include mainboard, jackboard, panel, and programming board design files.
- Firmware and factory setup/calibration scripts are present.
- User guide included.

**Hardware/electronics notes:**
- Useful board-partitioning reference for a dense Eurorack oscillator.
- Calibration and factory scripts are particularly valuable for production thinking.

**Platform relevance:** Eurorack oscillator / analog-digital hybrid module.

**Adaptation ideas:**
- Study split-board architecture and calibration workflow.
- Useful reference for future oscillator/control product, not necessarily direct cloning.

**Quick engineering assessment:** Strong hardware-source candidate, but license must be read file-level before assuming redistribution/commercial safety.

**Caveats / verification gaps:** License file requires deeper read; do not classify as fully commercially reusable yet.

**Sources:**
- https://github.com/wntrblm/Castor_and_Pollux

---

### 10) Ixox/preenfm3 — **PASS**

**Technical summary:** Standalone FM synth with bootloader, docs, firmware, hardware, libraries, scripts, and release binaries.

**Why it matters:** Good standalone FM synth reference with real device architecture and mature firmware/hardware split.

**Implementation highlights:**
- Repo exposes bootloader, docs, firmware, hardware, libraries, and scripts.
- README states it contains sources for the preenfm3 bootloader and firmware.
- Release binaries available.

**Hardware/electronics notes:**
- Good reference for a mature DIY FM synth hardware/software ecosystem.

**Platform relevance:** Standalone digital synth / FM engine.

**Adaptation ideas:**
- Study UI/workflow architecture for menu-driven synths.
- Useful comparison point against Teensy/Daisy/RP2040 synth architectures.

**Quick engineering assessment:** Strong project, but not promoted above Plinky/OTTO/norns because license and case evidence need fuller read.

**Caveats / verification gaps:** License and enclosure/case details require deeper verification.

**Sources:**
- https://github.com/Ixox/preenfm3

---

### 11) Ixox/preenfm2 — **PASS**

**Technical summary:** Older standalone FM synth reference with compiled firmware, source code, PCB/MCU board hardware files, and case files.

**Why it matters:** Still useful as a full-stack synth-device reference, especially for case/PCB structure across generations.

**Implementation highlights:**
- Firmware/source and hardware resources present.
- Hardware includes PCB, MCU board, and case files.

**Hardware/electronics notes:**
- Useful for comparing older and newer preenFM hardware packaging approaches.

**Platform relevance:** Standalone FM synth.

**Adaptation ideas:**
- Use as a legacy reference for FM synth productization and enclosure evolution.

**Quick engineering assessment:** Useful but lower priority than preenfm3 unless old hardware/case style is specifically relevant.

**Caveats / verification gaps:** Older project; check part availability and license before relying on it.

**Sources:**
- https://github.com/Ixox/preenfm2

---

## Previously published projects retained as benchmarks

| Project | Previous status | Keep as | Reason |
|---|---|---|---|
| `GuitarML/FunBox` | Published | Previous pedal benchmark | Already in published log; do not re-rank as new. |
| `Befaco/Oneiroi` | Published | Previous Eurorack benchmark | Already in common/published anti-repeat set. |
| `rheslip/2HPico-Eurorack-Module-Hardware` | Published | Previous RP2350 Eurorack benchmark | Already published recently. |
| `Befaco/VCMC` | Published | Previous CV/MIDI control benchmark | Already published recently. |
| `balazsbencs/daisy-multifx-pedal` | Published | Previous Daisy pedal benchmark | Already published recently. |
| `kooliha/Ouroboros_Loop_Station` | Published | Previous looper benchmark | Already published recently. |

## HOLD / watchlist

| Item | Category | Lane | Reason |
|---|---|---:|---|
| Pi-Stomp Core | Pedal / stompbox | HOLD | Strong pedal-platform evidence, but raw HW source/Gerbers/license not verified in opened page. |
| Samplotron | Standalone sampler | HOLD | Good firmware/audio/photo evidence; no clear license/HW-source gate in opened repo view. |
| MeeBlip anode | Standalone hybrid MIDI synth | HOLD | Firmware/hardware/GPL visible, but mechanical/enclosure evidence weak in opened view. |
| MinimumViableSynth | Controls-rich synth panel | HOLD | Excellent ECAD/front-panel/MCAD/control-surface study, but standalone hardware is future phase. |
| Pico-2-Groovebox | Standalone groovebox | HOLD | Strong technically, but anti-repeat/previous seed status needs deeper check before publication. |
| Twisty 2 MIDI Controller | Controls-rich controller | HOLD | Beautiful controller HW, enclosure/STL/KiCad/Gerbers; primarily MIDI control, not audio device. |

## Rejected / not promoted

| Project/source group | Decision | Reason |
|---|---:|---|
| Mutable Instruments / pichenettes derivatives | Reject | Too obvious and explicitly excluded by visual-hardware prompt. |
| Bastl/MI obvious classics | Reject/reference only | Useful visual references but not hidden discoveries. |
| Spark Synth hardware | Reject for active list | Explicit CC-BY-NC-SA 4.0; non-commercial licenses are excluded by the prompt. |
| PCBWay/OSH Park/order-page-only leads | Reject | Order page alone is not enough without raw source/Gerbers/license. |
| Generic MIDI controllers | Reject/HOLD | Must have audio-device or instrument relevance, not only generic MIDI control. |
| Breadboard-only synth sketches | Reject | No mechanical/product evidence. |

## Tracker update rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
plinkysynth/plinky_public,STRONG_PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Touch synth; hw/imgs/sw/UF2/bin; hardware and software open-sourced; license file needs full read"
bitfieldaudio/OTTO + cester-ino/OTTO-hardware,STRONG_PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Controls-rich Pi/STM32 groovebox hardware; DAC/main/power boards; SGTL5000; GPL-3.0; WIP"
monome/norns-shield,STRONG_PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Pi audio shield; BOM/CAD/Eagle/images/schematic; CS4270/CS4271; GPL-3.0; unsupported but complete"
zynthian/zynthian-hw + zynthian/zynthian-case,STRONG_PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Standalone Pi synth/effects platform; PCBs/schemes/parts/pin assignment plus 3D/aluminum/laser/CNC case assets"
jonbro/Audcalc,STRONG_PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Pocket RP2040 groovebox; enclosure/hardware/images/firmware/guide; KiCad BOM; MIT"
vonkonow/LeetAI,PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Portable ESP32-S2 synth ensemble; enclosure/hardware/firmware/assets; MIT; concept prototype"
wntrblm/Big_Honking_Button,PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Eurorack sampler/performance module; faceplate/hardware/firmware/samples/user guide; MIT code + CC-BY-SA hardware"
wntrblm/Sol,PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Open-source CircuitPython MIDI-to-CV Eurorack module; firmware/hardware/user guide; MIT code + CC-BY-SA hardware"
wntrblm/Castor_and_Pollux,PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Juno-inspired Eurorack dual oscillator; KiCad mainboard/jackboard/panel/programming board; license file requires read"
Ixox/preenfm3,PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"Standalone FM synth; bootloader/docs/firmware/hardware/libs/scripts/releases; license/case details need final verification"
Ixox/preenfm2,PASS,2026-06-19,2026-06-19,2026-07-19,published_candidate,"preenFM2 firmware/source plus PCB/MCU board/case hardware files; older reference"
```

## Optional selected-projects additions

```csv
project,url,status,origin,platforms,tags,why_selected,similarity_anchor_notes,link_status,notes
Plinky,https://github.com/plinkysynth/plinky_public,selected,digest_ranked,embedded-touch-synth,"touch-ui,standalone,open-hardware,performance-surface",Compact touch-synth hardware with strong visual/control-surface value,Similarity anchor for thin expressive synth UI,verified,"License wording needs final read"
OTTO Hardware,https://github.com/cester-ino/OTTO-hardware,selected,digest_ranked,Raspberry Pi + STM32,"groovebox,controls-rich,codec,display,key-matrix",Controls-rich standalone hardware architecture with DAC/main/power boards,Similarity anchor for product-scale groovebox control layout,verified,"WIP; use as architecture reference"
norns-shield,https://github.com/monome/norns-shield,selected,digest_ranked,Raspberry Pi,"audio-shield,minimal-ui,codec,mechanical-bom",Minimal instrument UI and complete Pi audio shield mechanics,Similarity anchor for compact audio appliance,verified,"Unsupported by monome now"
AudCalc,https://github.com/jonbro/Audcalc,selected,digest_ranked,RP2040,"groovebox,pocket-device,enclosure,kicad",Compact RP2040 groovebox with enclosure and hardware files,Similarity anchor for small standalone groovebox,verified,"Audio path details need deeper review"
LeetAI,https://github.com/vonkonow/LeetAI,selected,digest_ranked,ESP32-S2,"portable-synth,rgb-keys,encoders,tft,enclosure",Portable controls-rich synth concept with enclosure and MIT license,Similarity anchor for handheld synth UI,verified,"Prototype maturity needs checking"
```
