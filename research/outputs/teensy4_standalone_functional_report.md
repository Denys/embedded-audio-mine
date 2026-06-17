# Embedded Audio Mine - Teensy 4.x standalone functional custom boards

## Executive summary
- Selected 2 items, not 3. Forcing a third would violate the category gates; the best third item is held for unclear license / incomplete firmware evidence.
- Top selected: Tympan Rev E Hardware for open mixed-signal audio I/O; MicroDexed Touch for a complete Teensy 4.1 groovebox/synth build.
- Main exclusions: official PJRC/SparkFun audio shields, generic codec/DAC boards, Eurorack-only modules, broad modular/multi-tool platforms, pure firmware, and old Teensy 3.x-era boards.
- Search limitations: Firecrawl returned weak general-web results, one Elecrow page failed with an internal tunnel/proxy error, and MicroDexed's PDF manual could not be parsed because Firecrawl rejected the file.

## Pre-flight
- Repo inspected: yes (`README.md`, `AGENTS.md`, `rules/digest-rules-v0.2.md`).
- Anti-repeat inspected: yes (`data/published-repo-log.csv`, `data/common-anti-repeat-index.csv`, `data/selected-projects.csv`, recent `digests/`, and `codex-weekly/digests/`).
- Firecrawl batches run: A-D capped broad sweep, E attempted with no durable web results, F targeted follow-up.
- Non-GitHub lanes searched: yes, PJRC forum, Hackaday, ModWiggler, Look Mum No Computer, PCBWay, Tympan forum, ProtoSupplies.

## Search coverage
| Lane | Queries | URLs found | Candidates extracted | Useful hits | Notes |
|---|---:|---:|---:|---:|---|
| A - PJRC forum | 3 | 1 | 1 | 0 |  |
| B - GitHub / GitLab / Codeberg | 3 | 10 | 10 | 0 |  |
| C - maker/project sites | 3 | 8 | 8 | 0 |  |
| D - synth/audio communities | 3 | 5 | 5 | 0 |  |
| E - general web | 0 | 0 | 0 | 0 | E lane was attempted separately; Firecrawl returned no durable web results in this run. |
| F - targeted follow-up | 11 | 42 | 32 | 2 | Used after broad lanes produced mostly official/generic/modular noise. |

## Floor list
| Candidate | Source lane | First impression | Category fit | Decision |
|---|---|---|---|---|
| [Tympan Rev E Hardware v2.0.0](https://github.com/Tympan/Tympan_Rev_E_Hardware) | targeted follow-up | Cleanest open-hardware audio I/O board match: custom Teensy 4.1 board, integrated codec, KiCad/schematic/BOM/case evidence, and credible for | fits 1.a | selected |
| [MicroDexed Touch](https://codeberg.org/dcoredump/MicroDexed-touch) | targeted follow-up | Best functional standalone synth/groovebox fit: Teensy 4.1, custom PCB route, firmware source, build/BOM evidence, and real device photos. | fits 1.a | selected |
| [Teensy 4.1 Programmable Guitar Pedal](https://hackaday.io/project/203208-teensy-41-programmable-guitar-pedal) | targeted follow-up | Strong hardware evidence: Hackaday page plus downloaded zip containing .kicad_pcb, .kicad_sch, Gerbers, footprints, and Teensy 4.1 footprint | needs more proof or belongs elsewhere | hold |
| [T-DSP open modular audio platform for Teensy 4.1](https://forum.pjrc.com/index.php?threads/t-dsp-open-source-modular-audio-platform-for-teensy-4-1-diy-audio-interface-digital-mixer-synthesizer.77722/) | targeted follow-up | Open KiCad Teensy 4.1 platform with audio interface/mixer/synth ambitions, but it is broad modular/multi-tool infrastructure and belongs in | needs more proof or belongs elsewhere | hold |
| [Teensy 4.0 Audio Toolkit and Shield](https://forum.pjrc.com/index.php?threads/teensy-4-0-audio-toolkit-and-shield-an-open-source-audio-io-project-in-kicad.60411/) | targeted follow-up | Open KiCad audio-I/O learning/prototyping shield, but not standalone: IO is primarily exposed as headers and it is a toolkit for daughterboa | needs more proof or belongs elsewhere | hold |
| [TeensyMIDIAudio](https://codeberg.org/dcoredump/TeensyMIDIAudio) | targeted follow-up | Useful historical MicroDexed-related PCB, but search evidence points to a 2018 PT8211-era board and no verified Teensy 4.x revision in this | needs more proof or belongs elsewhere | hold |
| [jenschr Teensy 4.1 KiCad example](https://github.com/jenschr/Teensy-4.1-example) | targeted follow-up | Excellent custom Teensy 4.1 KiCad reference board, MIT licensed, but not an audio/MIDI/CV functional device. | needs more proof or belongs elsewhere | hold |
| [Question about powering Teensy 4.1 and Audio shield Rev D in PCB](https://forum.pjrc.com/index.php) | PJRC forum | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. | blocked / not 1.a | rejected |
| [Teensy boards, for the uninitiated - The Contextual Electronics Forums](https://forum.contextualelectronics.com/t/teensy-boards-for-the-uninitiated/4963) | GitHub / GitLab / Codeberg | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Manufacture teensy 4.1, papilio pro and arduino due](https://forum.kicad.info/t/manufacture-teensy-4-1-papilio-pro-and-arduino-due/40696) | GitHub / GitLab / Codeberg | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [teensy-eurorack/README.md at master - GitHub](https://github.com/newdigate/teensy-eurorack/blob/master/README.md) | GitHub / GitLab / Codeberg | Anti-repeat and Eurorack-only block. | blocked / not 1.a | anti_repeat_blocked |
| [Hi, i lost my teensy 4.1 cad files, anyone as a link for the ... - Facebook](https://www.facebook.com/groups/1470129233297275/posts/4085114565132049) | GitHub / GitLab / Codeberg | official_teensy_audio_shield | blocked / not 1.a | rejected |
| [Eurorack shield for teensy 4.1 with 14 in / 16 out analog ... - GitHub](https://github.com/newdigate/teensy-eurorack) | GitHub / GitLab / Codeberg | Anti-repeat and Eurorack-only block. | blocked / not 1.a | anti_repeat_blocked |
| [Teensy Arcade Synth - PJRC](https://www.pjrc.com/2026/03) | GitHub / GitLab / Codeberg | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Experimentando con Teensy 4.0 y OLED de 2.4" \| TikTok](https://www.tiktok.com/@phazerville/video/7435817092147989790) | GitHub / GitLab / Codeberg | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [O_C T4.1 - Ornament and Crime with Teensy 4.1 - GitHub](https://github.com/PaulStoffregen/O_C_T41) | GitHub / GitLab / Codeberg | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. | blocked / not 1.a | rejected |
| [Ornament and Crime hardware overview with Phazerville on Teensy ...](https://www.facebook.com/groups/1040800816762898/posts/2052497625593207) | GitHub / GitLab / Codeberg | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. | blocked / not 1.a | rejected |
| [Teensy 4.1 Expansion Board with DC-DC Converter - Electronics-Lab](https://www.electronics-lab.com/project/teensy-4-1-expansion-board-with-dc-dc-converter) | GitHub / GitLab / Codeberg | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Arduino/Teensy based SBC \| Details - Hackaday.io](https://hackaday.io/project/21201-arduino-desktop/log/229778-arduinoteensy-based-sbc) | maker/project sites | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [OPL2 Audio Board for Arduino & Raspberry Pi - Hackaday.io](https://hackaday.io/project/18995-opl2-audio-board-for-arduino-raspberry-pi) | maker/project sites | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Prang \| Hackaday.io](https://hackaday.io/project/187010-prang) | maker/project sites | pure_firmware_hint | blocked / not 1.a | rejected |
| [Project \| Teensymoog \| Hackaday.io](https://hackaday.io/project/170474/logs) | maker/project sites | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Project \| PolyMod: modular digital synthesizer \| Hackaday.io](https://hackaday.io/project/160626/logs) | maker/project sites | eurorack_only | blocked / not 1.a | rejected |
| [Project \| PolyMod 2: modular digital synthesizer - Hackaday.io](https://hackaday.io/project/162812/logs) | maker/project sites | eurorack_only | blocked / not 1.a | rejected |
| [PolyMod: modular digital synthesizer - Hackaday.io](https://hackaday.io/project/160626-polymod-modular-digital-synthesizer) | maker/project sites | eurorack_only | blocked / not 1.a | rejected |
| [PolyMod 2: modular digital synthesizer - Hackaday.io](https://hackaday.io/project/162812-polymod-2-modular-digital-synthesizer) | maker/project sites | eurorack_only | blocked / not 1.a | rejected |
| [Can you use a Teensy 4.0 for an Ornament and Crime? - MOD ...](https://modwiggler.com/forum/viewtopic.php) | synth/audio communities | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. | blocked / not 1.a | rejected |
| [Teensy GND and AGND - MOD WIGGLER](https://www.modwiggler.com/forum/viewtopic.php) | synth/audio communities | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Thread about Ornament and Crime Teensy 4.x - Page 4 - MOD ...](https://modwiggler.com/forum/viewtopic.php?p=4263480) | synth/audio communities | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. | blocked / not 1.a | rejected |
| [Kosmo Teensy Module - Look Mum No Computer Thingies](https://lookmumnocomputer.discourse.group/t/kosmo-teensy-module/2796) | synth/audio communities | generic_breakout | blocked / not 1.a | rejected |
| [Prototyping a Midi to CV module with more functionality than existing ...](https://lookmumnocomputer.discourse.group/t/prototyping-a-midi-to-cv-module-with-more-functionality-than-existing-offerings/3797) | synth/audio communities | generic_breakout | blocked / not 1.a | rejected |
| [Using the AIC CODEC Shield as Main sound processor · Issue #67 ...](https://github.com/Tympan/Tympan_Library/issues/67) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Updated CS42448 PCB for Teensy 4.x \| Details - Hackaday.io](https://hackaday.io/project/2984-teensy-audio-library/log/187557-updated-cs42448-pcb-for-teensy-4x) | targeted follow-up | pure_firmware_hint | blocked / not 1.a | rejected |
| [Hello. A teensy 4.1 groovebox on the way. I m looking for advices ...](https://www.facebook.com/MidiBen39/videos/helloa-teensy-41-groovebox-on-the-wayi-m-looking-for-advices-about-a-dac-to-have/2019255591966499) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Blog - Copperhill Technologies](https://copperhilltech.com/blog/tag/Teensy+4.1+CAN+FD) | targeted follow-up | official_teensy_audio_shield | blocked / not 1.a | rejected |
| [How to design input conditioning circuitry for Teensy 4.1 ... - Facebook](https://www.facebook.com/groups/1470129233297275/posts/3625943011049209) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Gadget Reboot — creating electronics hobby videos \| Patreon](https://www.patreon.com/gadgetreboot/sitemap) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Wow. Teensy 4.1 \| Page 3 \| All About Circuits](https://forum.allaboutcircuits.com/threads/teensy-4-1-wow-teensy-4-1.177495/page-3) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Hello. A teensy 4.1 groovebox on the way. I m looking for advices ...](https://www.facebook.com/groups/1470129233297275/posts/4186402668336571) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Teensy Audio Projects - Sound Processing and Playback - YouTube](https://www.youtube.com/playlist) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [The Teensy Audio Station (Part 2) - Circuit Cellar](https://circuitcellar.com/research-design-hub/basics-of-design/the-teensy-audio-station) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Hello.. I have a teensy 4.1 and I want to add the audio shield. Rev ...](https://www.facebook.com/groups/1470129233297275/posts/4138825879760917) | targeted follow-up | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. | blocked / not 1.a | rejected |
| [PaulStoffregen/Audio: Teensy Audio Library - GitHub](https://github.com/PaulStoffregen/Audio) | targeted follow-up | anti_repeat_blocked | blocked / not 1.a | anti_repeat_blocked |
| [Best Practice for Integrating Teensy 4.1 in KiCAD Schematic and ...](https://forum.kicad.info/t/best-practice-for-integrating-teensy-4-1-in-kicad-schematic-and-pcb-layout/60747) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Getting Started with the Teensy - SparkFun Learn](https://learn.sparkfun.com/tutorials/getting-started-with-the-teensy/resources-and-going-further) | targeted follow-up | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. | blocked / not 1.a | rejected |
| [Teensy 4 Audio Shield (Rev D) \| For Sale at SparkFun](https://www.sparkfun.com/teensy-4-audio-shield-rev-d.html) | targeted follow-up | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. | blocked / not 1.a | rejected |
| [Simultaneous input and output Teensy 4.1 -> Audio Shield #9939](https://github.com/orgs/micropython/discussions/9939) | targeted follow-up | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. | blocked / not 1.a | rejected |
| [PJRC - Special Categories - SparkFun Electronics](https://www.sparkfun.com/special-categories/pjrc.html) | targeted follow-up | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. | blocked / not 1.a | rejected |
| [Review Request: Teensy 4.1 Hall effect mini-keyboard - Reddit](https://www.reddit.com/r/PrintedCircuitBoard/comments/1ifec3p/review_request_teensy_41_hall_effect_minikeyboard) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [PCB Design Review Request – KiCad Project (Teensy 4.1 + MIDI ...](https://www.eevblog.com/forum/beginners/pcb-design-review-request-kicad-project-(teensy-4-1-midi-controller)) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Teensy 4.1 Symbol, Footprint & 3D Model by PJRC - SnapMagic](https://www.snapeda.com/parts/Teensy%204.1/PJRC/view-part) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Midi Controller and Motor Fader Controller on Teensy 4.1 #16 - GitHub](https://github.com/tttapa/Control-Surface-Motor-Fader/issues/16) | targeted follow-up | eurorack_only | blocked / not 1.a | rejected |
| [Handmade Midi Controller with Teensy 4.1 and 4.0 - Facebook](https://www.facebook.com/groups/1470129233297275/posts/3781582808818561) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Teensy 4 MIDI controller experiment - Google Groups](https://groups.google.com/g/hermes-lite/c/69sNmReKnnY) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Teensy 4.1 USB MIDI issue - GitHub Gist](https://gist.github.com/cowboy/f764ca1c6ce163f62f06fd0140c932c6) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |
| [Expensive Notes (John) replace the internals of a MIDI Foot ...](https://www.facebook.com/groups/1470129233297275/posts/3554517981525046) | targeted follow-up | Search hit needs primary-source verification before promotion. | needs more proof or belongs elsewhere | hold |

## Selected
### 1) [Tympan Rev E Hardware v2.0.0](https://github.com/Tympan/Tympan_Rev_E_Hardware) - STRONG_PASS
**Function:** audio_io
**Standalone fit:** 0.90 - Forum states Tympan is a Teensy board with integrated audio codec and does not need an additional audio board.; GitHub repository includes electronics and case designs.
**Teensy 4.x fit:** 1.00 - Teensy 4.1
**Technical summary:** Cleanest open-hardware audio I/O board match: custom Teensy 4.1 board, integrated codec, KiCad/schematic/BOM/case evidence, and credible forum manufacturing notes.
**Why it matters:** 86.0/100 overall; strongest reusable value is hardware+firmware evidence without being an official shield.
**Implementation highlights:** GitHub README says Rev E v2 is based on Teensy 4.1 and incorporates Teensy 4.1 into Tympan's own design.; Board folder exposes KiCad PCB, schematic, project, netlist, STEP, XLSX, and library files.
**Hardware/electronics notes:** Integrated codec/audio front end; stronger mixed-signal reference than generic DAC breakout boards.; Integrated board; forum discusses manufacturing/population and attaching Teensy 4.1.
**Firmware/build notes:** source=True; build=True; releases=False
**Audio/MIDI/CV I/O:** codecs=integrated Tympan audio codec; MIDI=none verified
**Adaptation ideas:** Mine the board-level audio/power/UI decisions; reuse firmware/build structure where applicable; treat manufacturing paths separately from open-source claims.
**Quick engineering assessment:** Cleanest open-hardware audio I/O board match: custom Teensy 4.1 board, integrated codec, KiCad/schematic/BOM/case evidence, and credible forum manufacturing notes.
**Caveats / verification gaps:** Current production availability is weak; build may require self-fabrication or CircuitHub-style manufacturing.; Firmware is in the separate Tympan library, not the hardware repo.
**Sources:**
- https://github.com/Tympan/Tympan_Rev_E_Hardware
- https://github.com/Tympan/Tympan_Rev_E_Hardware/tree/master/Tympan_Rev_E
- https://forum.tympan.org/t/tympan-hardware/428
- https://circuithub.com/projects/biomurph/Tympan_Rev_E

### 2) [MicroDexed Touch](https://codeberg.org/dcoredump/MicroDexed-touch) - STRONG_PASS
**Function:** synth_voice
**Standalone fit:** 0.92 - PCBWay describes it as a DIY groovebox/synth/sequencer in a tiny box.; Repo README requires Teensy 4.1, display/touch, audio board, and storage parts for a complete build.
**Teensy 4.x fit:** 1.00 - Teensy 4.1
**Technical summary:** Best functional standalone synth/groovebox fit: Teensy 4.1, custom PCB route, firmware source, build/BOM evidence, and real device photos.
**Why it matters:** 84.0/100 overall; strongest reusable value is hardware+firmware evidence without being an official shield.
**Implementation highlights:** PCBWay shared board pages exist for MicroDexed Touch current/capacitive versions.; Project links build instructions, BOM, and manual; PCBWay records CAD/BOM update history.
**Hardware/electronics notes:** Uses PCM5102 module rather than a deeply documented custom analog front end.; Teensy 4.1 plus display/touch/storage/audio modules; power details deferred to manual.
**Firmware/build notes:** source=True; build=True; releases=True
**Audio/MIDI/CV I/O:** codecs=PCM5102 audio board/module; MIDI=USB MIDI, mini-jack/DIN MIDI adapter
**Adaptation ideas:** Mine the board-level audio/power/UI decisions; reuse firmware/build structure where applicable; treat manufacturing paths separately from open-source claims.
**Quick engineering assessment:** Best functional standalone synth/groovebox fit: Teensy 4.1, custom PCB route, firmware source, build/BOM evidence, and real device photos.
**Caveats / verification gaps:** Raw PCB source/Gerbers were not independently downloaded; PCBWay path may be manufacturing-only.; Audio electronics value is moderate because it relies on a PCM5102 module.
**Sources:**
- https://codeberg.org/dcoredump/MicroDexed-touch
- https://codeberg.org/positionhigh/MicroDexed-touch
- https://www.pcbway.com/project/shareproject/MicroDexed_Capacitive_Touch_64970fee.html
- https://www.pcbway.com/project/shareproject/MicroDexed_Touch_current_version_with_PCM5102_d643a695.html
- https://protosupplies.com/product/teensy-41-microdexed

## HOLD / watchlist
| Item | Reason held | Verification needed | What would promote it |
|---|---|---|---|
| [Teensy 4.1 Programmable Guitar Pedal](https://hackaday.io/project/203208-teensy-41-programmable-guitar-pedal) | Strong hardware evidence: Hackaday page plus downloaded zip containing .kicad_pcb, .kicad_sch, Gerbers, footprints, and Teensy 4.1 footprint. Held because no explicit license or firmware source was verified. | Primary hardware/license/standalone proof | Explicit license plus firmware/build docs. |
| [T-DSP open modular audio platform for Teensy 4.1](https://forum.pjrc.com/index.php?threads/t-dsp-open-source-modular-audio-platform-for-teensy-4-1-diy-audio-interface-digital-mixer-synthesizer.77722/) | Open KiCad Teensy 4.1 platform with audio interface/mixer/synth ambitions, but it is broad modular/multi-tool infrastructure and belongs in 1.b, not 1.a. | Primary hardware/license/standalone proof | Run under category 1.b standalone multi-tool. |
| [Teensy 4.0 Audio Toolkit and Shield](https://forum.pjrc.com/index.php?threads/teensy-4-0-audio-toolkit-and-shield-an-open-source-audio-io-project-in-kicad.60411/) | Open KiCad audio-I/O learning/prototyping shield, but not standalone: IO is primarily exposed as headers and it is a toolkit for daughterboards/custom panels. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [TeensyMIDIAudio](https://codeberg.org/dcoredump/TeensyMIDIAudio) | Useful historical MicroDexed-related PCB, but search evidence points to a 2018 PT8211-era board and no verified Teensy 4.x revision in this run. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [jenschr Teensy 4.1 KiCad example](https://github.com/jenschr/Teensy-4.1-example) | Excellent custom Teensy 4.1 KiCad reference board, MIT licensed, but not an audio/MIDI/CV functional device. | Primary hardware/license/standalone proof | Explicit license plus firmware/build docs. |
| [Teensy boards, for the uninitiated - The Contextual Electronics Forums](https://forum.contextualelectronics.com/t/teensy-boards-for-the-uninitiated/4963) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Manufacture teensy 4.1, papilio pro and arduino due](https://forum.kicad.info/t/manufacture-teensy-4-1-papilio-pro-and-arduino-due/40696) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Teensy Arcade Synth - PJRC](https://www.pjrc.com/2026/03) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Experimentando con Teensy 4.0 y OLED de 2.4" \| TikTok](https://www.tiktok.com/@phazerville/video/7435817092147989790) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Teensy 4.1 Expansion Board with DC-DC Converter - Electronics-Lab](https://www.electronics-lab.com/project/teensy-4-1-expansion-board-with-dc-dc-converter) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Arduino/Teensy based SBC \| Details - Hackaday.io](https://hackaday.io/project/21201-arduino-desktop/log/229778-arduinoteensy-based-sbc) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [OPL2 Audio Board for Arduino & Raspberry Pi - Hackaday.io](https://hackaday.io/project/18995-opl2-audio-board-for-arduino-raspberry-pi) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Project \| Teensymoog \| Hackaday.io](https://hackaday.io/project/170474/logs) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Teensy GND and AGND - MOD WIGGLER](https://www.modwiggler.com/forum/viewtopic.php) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Using the AIC CODEC Shield as Main sound processor · Issue #67 ...](https://github.com/Tympan/Tympan_Library/issues/67) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Hello. A teensy 4.1 groovebox on the way. I m looking for advices ...](https://www.facebook.com/MidiBen39/videos/helloa-teensy-41-groovebox-on-the-wayi-m-looking-for-advices-about-a-dac-to-have/2019255591966499) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [How to design input conditioning circuitry for Teensy 4.1 ... - Facebook](https://www.facebook.com/groups/1470129233297275/posts/3625943011049209) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Gadget Reboot — creating electronics hobby videos \| Patreon](https://www.patreon.com/gadgetreboot/sitemap) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Wow. Teensy 4.1 \| Page 3 \| All About Circuits](https://forum.allaboutcircuits.com/threads/teensy-4-1-wow-teensy-4-1.177495/page-3) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |
| [Hello. A teensy 4.1 groovebox on the way. I m looking for advices ...](https://www.facebook.com/groups/1470129233297275/posts/4186402668336571) | Search hit needs primary-source verification before promotion. | Primary hardware/license/standalone proof | Clear 1.a single-purpose standalone fit plus source/license/build proof. |

## Rejected / not promoted
| Item/source group | Decision | Reason |
|---|---|---|
| [official Teensy Audio Shield / Audio Adapter / PT8211 kit group](https://www.pjrc.com/store/) | rejected | Hard exclusion; not a custom independent Teensy 4.x carrier/device. |
| [generic commercial DAC/codec breakout group](https://www.sparkfun.com/teensy-4-audio-shield-rev-d.html) | rejected | A PCM/DAC/codec module alone is not a custom Teensy carrier. |
| [modular/Eurorack-only group](https://github.com/newdigate/teensy-eurorack) | rejected / anti_repeat_blocked | Requires rack/backplane/panel or already appeared in anti-repeat state. |
| pure firmware/no-PCB group | rejected | Does not satisfy custom-board requirement. |
| [Teensy 3.x-only / historical group](https://codeberg.org/dcoredump/TeensyMIDIAudio) | rejected | Historical reference only unless a verified Teensy 4.x revision exists. |
| [Question about powering Teensy 4.1 and Audio shield Rev D in PCB](https://forum.pjrc.com/index.php) | rejected | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. |
| [teensy-eurorack/README.md at master - GitHub](https://github.com/newdigate/teensy-eurorack/blob/master/README.md) | anti_repeat_blocked | Anti-repeat and Eurorack-only block. |
| [Hi, i lost my teensy 4.1 cad files, anyone as a link for the ... - Facebook](https://www.facebook.com/groups/1470129233297275/posts/4085114565132049) | rejected | official_teensy_audio_shield |
| [Eurorack shield for teensy 4.1 with 14 in / 16 out analog ... - GitHub](https://github.com/newdigate/teensy-eurorack) | anti_repeat_blocked | Anti-repeat and Eurorack-only block. |
| [O_C T4.1 - Ornament and Crime with Teensy 4.1 - GitHub](https://github.com/PaulStoffregen/O_C_T41) | rejected | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. |
| [Ornament and Crime hardware overview with Phazerville on Teensy ...](https://www.facebook.com/groups/1040800816762898/posts/2052497625593207) | rejected | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. |
| [Prang \| Hackaday.io](https://hackaday.io/project/187010-prang) | rejected | pure_firmware_hint |
| [Project \| PolyMod: modular digital synthesizer \| Hackaday.io](https://hackaday.io/project/160626/logs) | rejected | eurorack_only |
| [Project \| PolyMod 2: modular digital synthesizer - Hackaday.io](https://hackaday.io/project/162812/logs) | rejected | eurorack_only |
| [PolyMod: modular digital synthesizer - Hackaday.io](https://hackaday.io/project/160626-polymod-modular-digital-synthesizer) | rejected | eurorack_only |
| [PolyMod 2: modular digital synthesizer - Hackaday.io](https://hackaday.io/project/162812-polymod-2-modular-digital-synthesizer) | rejected | eurorack_only |
| [Can you use a Teensy 4.0 for an Ornament and Crime? - MOD ...](https://modwiggler.com/forum/viewtopic.php) | rejected | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. |
| [Thread about Ornament and Crime Teensy 4.x - Page 4 - MOD ...](https://modwiggler.com/forum/viewtopic.php?p=4263480) | rejected | Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history. |
| [Kosmo Teensy Module - Look Mum No Computer Thingies](https://lookmumnocomputer.discourse.group/t/kosmo-teensy-module/2796) | rejected | generic_breakout |
| [Prototyping a Midi to CV module with more functionality than existing ...](https://lookmumnocomputer.discourse.group/t/prototyping-a-midi-to-cv-module-with-more-functionality-than-existing-offerings/3797) | rejected | generic_breakout |
| [Updated CS42448 PCB for Teensy 4.x \| Details - Hackaday.io](https://hackaday.io/project/2984-teensy-audio-library/log/187557-updated-cs42448-pcb-for-teensy-4x) | rejected | pure_firmware_hint |
| [Blog - Copperhill Technologies](https://copperhilltech.com/blog/tag/Teensy+4.1+CAN+FD) | rejected | official_teensy_audio_shield |
| [Hello.. I have a teensy 4.1 and I want to add the audio shield. Rev ...](https://www.facebook.com/groups/1470129233297275/posts/4138825879760917) | rejected | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. |
| [PaulStoffregen/Audio: Teensy Audio Library - GitHub](https://github.com/PaulStoffregen/Audio) | anti_repeat_blocked | anti_repeat_blocked |
| [Getting Started with the Teensy - SparkFun Learn](https://learn.sparkfun.com/tutorials/getting-started-with-the-teensy/resources-and-going-further) | rejected | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. |
| [Teensy 4 Audio Shield (Rev D) \| For Sale at SparkFun](https://www.sparkfun.com/teensy-4-audio-shield-rev-d.html) | rejected | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. |
| [Simultaneous input and output Teensy 4.1 -> Audio Shield #9939](https://github.com/orgs/micropython/discussions/9939) | rejected | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. |
| [PJRC - Special Categories - SparkFun Electronics](https://www.sparkfun.com/special-categories/pjrc.html) | rejected | Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion. |
| [Midi Controller and Motor Fader Controller on Teensy 4.1 #16 - GitHub](https://github.com/tttapa/Control-Surface-Motor-Fader/issues/16) | rejected | eurorack_only |

## Tracker rows
```csv
repo_or_url,lane,first_seen,last_published,repeat_eligible_after,status,notes
https://github.com/Tympan/Tympan_Rev_E_Hardware,STRONG_PASS,2026-06-11,,2026-07-11,selected,Cleanest open-hardware audio I/O board match: custom Teensy 4.1 board, integrated codec, KiCad/schematic/BOM/case evidence, and credible forum manufacturing notes.
https://codeberg.org/dcoredump/MicroDexed-touch,STRONG_PASS,2026-06-11,,2026-07-11,selected,Best functional standalone synth/groovebox fit: Teensy 4.1, custom PCB route, firmware source, build/BOM evidence, and real device photos.
```

## Quality gates
- PASS: No official PJRC/SparkFun Teensy Audio Shield selected
- PASS: No generic breakout board selected
- PASS: Every selected candidate is standalone
- PASS: Every selected candidate is Teensy 4.x
- PASS: At least one non-GitHub lane searched
- PASS: Rejected list demonstrates selection pressure
- PASS: Primary sources used where possible
