# Weekly Analog Audio Mine — 2026-08-03

Three projects cleared the promotion threshold. The most relevant discovery is Len Popp’s SSI2131 VCO: a genuinely reusable modern analog oscillator with editable source, calibration guidance, explicit licensing, and a useful warning about a broken older board revision. The Arduino Mini Amplifier is exceptionally complete and certified but tied to obsolete audio ICs. CHAIR ILSE is a well-documented educational analog voice whose deliberately uncompensated oscillators limit serious pitch use.

The pinned b:art Dual SSI2130 VCO Core was used only as a similarity anchor. No promoted project appears in the publication log, common anti-repeat index, or the prior four weekly analog digests.

## Ranked discoveries

### 1. Len42/Synth VCO-2131 — PASS

**Lane:** Modern SSI analog VCO  
**Canonical:** [VCO-2131 source](https://github.com/Len42/Synth/tree/main/modules/VCO-2131) · [personal project hub](https://lenp.net/synth/) · [SSI2131 manufacturer page](https://www.soundsemiconductor.com/)

#### Documented facts

- The module is a 10 HP SSI2131-based analog VCO with saw, triangle, pulse/square and divided sub-oscillator outputs; pitch, modulation, PWM and sync inputs; coarse/fine tuning; and a ±2-octave switch.
- The author claims 1 V/octave tracking across ten octaves and publishes a separate calibration procedure. Sound Semiconductor describes the SSI2131 itself as a temperature-stable ten-octave VCO core with buffered triangle, saw and variable-pulse outputs.
- Current editable KiCad sources, schematics, Gerbers, a drilling template, BOM material and a finished-module photograph are public. The project-level license is CC BY 4.0.
- It is a three-board stack. A jumper can select the Eurorack bus CV line, and the circuit uses a 16-pin power connector without depending on the rack’s +5 V rail.
- The README explicitly warns that the linked OSH Park middle board is an older revision on which the sub-oscillator does not work. The repository source, not that shared-board link, is the revision authority.
- The published BOM uses the SSI2131, TL074 stages, an HCS74 divider, a 2.5 V LM4040 reference, local positive and negative 5 V regulation, precision 0.1% resistors in critical control paths and a precision timing capacitor.
- On 2026-08-03, the SSI2131 remained listed by Sound Semiconductor and in stock at specialist suppliers [Cabintech](https://cabintechglobal.com/ssi2131) and [Electrokit](https://www.electrokit.com/ssi2131-sop-16-voltage-controlled-oscillator).

#### Engineering assessment and inference

- This is the closest fresh companion to the b:art SSI2130 anchor. The SSI2131 trades the 2130’s expanded feature set for a compact, lower-cost core while preserving optional scale and high-frequency trims suitable for automated calibration.
- The precision reference, local regulation and tight summing resistors are appropriate. The more likely tracking limits are reference drift, ground error between the three boards, control-pot thermal gradients, timing-capacitor stability and the calibration method rather than the IC’s nominal exponential converter.
- A ten-octave claim should not be read as ten measured octaves. No frequency-error plot, thermal chamber sweep, phase-noise result or waveform-distortion sweep was found.
- The 16-pin bus-CV option is convenient but can import shared-bus resistance, connector offsets and digital-module noise into the pitch node. Test bus and front-panel pitch inputs separately.
- A stacked design concentrates analog nodes, switched logic and panel wiring. Verify sub-oscillator edge coupling into the ramp core, PWM feedthrough, ground impedance and regulator thermal rise.

#### Parts and assembly

- SSI2131 is current and obtainable but remains a specialist-source SOIC part. The rest of the active circuitry and passives are ordinary.
- Assembly burden is moderate-to-high: fine-pitch analog IC, three aligned PCBs, numerous panel controls and a multi-step V/octave calibration.
- Do not order the obsolete OSH Park middle-board revision.

#### Adaptation ideas

- Add MCU-driven DAC trims and frequency capture for automatic scale, offset and high-frequency correction.
- Store calibration coefficients with board-revision ID and CRC, following the production discipline seen in Winterbloom Castor & Pollux.
- Produce a single-board test carrier to compare SSI2131 and SSI2130 cores under identical reference, temperature and load conditions.
- Add test points for pitch summing, reference, integrator/ramp and sub-divider clocks, plus a switchable bus-CV isolation buffer.

#### Unresolved assumptions

- The current Gerbers, schematic and BOM must be revision-correlated before fabrication.
- Independent ten-octave tracking, warm-up drift, high-frequency compensation and sync-recovery measurements remain missing.
- No conducted-noise or cross-module bus-CV testing was located.

---

### 2. dilshan/arduino-mini-amp — PASS

**Lane:** Digitally controlled analog stereo amplifier  
**Canonical:** [source repository](https://github.com/dilshan/arduino-mini-amp) · [OSHWA LK000018](https://certification.oshwa.org/lk000018.html)

#### Documented facts

- This is a complete stereo amplifier combining a Philips TDA8425 I²C analog audio processor, Yamaha YDA138 class-D 2 × 10 W power stage, Arduino Nano/ATmega328P control, AC6939 Bluetooth module, line input, speaker/headphone modes and a 16-band display analyzer buffered by an NE5532.
- Firmware recalls volume, tone and stereo-mode settings from EEPROM. The hardware accepts 12 V and derives multiple local rails.
- The repository includes public circuit/design files, firmware, documentation, a built prototype, manufacturing releases and Gerbers. It has 29 commits and an orderable PCB reference.
- Version 1.0.0 was OSHWA-certified as LK000018 on 2025-10-24. Hardware is CERN-OHL-W-2.0, firmware MIT and documentation CC BY 4.0.
- The project does not publish a full audio measurement suite in the material reviewed.

#### Engineering assessment and inference

- The separation between analog audio processing and software control is a useful reference for presettable preamps, mixers and effects. The EEPROM recall path is directly adaptable to digitally controlled routing and gain.
- The critical layout problem is return-current management: the class-D bridge, LCD/Arduino activity, Bluetooth radio and I²C edges share a chassis with high-gain analog processing and spectrum-analysis nodes. Star/plane partitioning, short power loops and deliberate codec/processor reference routing matter more than nominal schematic separation.
- At full power, thermal copper, connector rating, supply droop and speaker-return paths require validation. Headphone switching must not expose headphones or the analog processor to class-D common-mode energy.
- The spectrum analyzer can become a noise injector if sampling/display updates are synchronous with sensitive audio states. Measure idle tones, I²C-correlated spurs, Bluetooth RF demodulation and class-D residual at line and headphone outputs.

#### Parts and assembly

- The central weakness is lifecycle. TDA8425 is listed as obsolete/discontinued, and the YDA138 and AC6939 are legacy or module-market parts with limited authorized-channel confidence. Treat marketplace stock as finite and counterfeit-prone.
- Arduino Nano, NE5532, passives and display hardware are easy to source. Assembly is moderate because the design mixes through-hole control hardware, modules, power audio and several voltage domains.

#### Adaptation ideas

- Retain the control/UI architecture while replacing the TDA8425 with a current audio processor, codec plus DSP, or PGA/VCA building blocks.
- Substitute a current class-D stage with documented EMI and output-filter guidance.
- Add production tests for THD+N, SNR, frequency response, stereo separation, tone curves, maximum unclipped output and thermal shutdown.
- Version the EEPROM schema and add safe defaults if recalled data or an I²C peripheral fails.

#### Unresolved assumptions

- The design files and release Gerbers need a revision-by-revision manufacturing audit.
- No independent power, EMC, thermal or audio-performance measurements were found.
- Long-term availability of TDA8425, YDA138 and the exact Bluetooth module is not assured.

---

### 3. chairaudio/ILSE revision 4 — REF_PASS

**Lane:** Minimal educational analog synth voice  
**Canonical:** [source repository](https://github.com/chairaudio/ILSE) · [revision-4 build instructions](https://discourse.chair.audio/t/ilse-build-instructions-for-revision-4/151/3) · [university course lineage](https://www.uni-weimar.de/kunst-und-gestaltung/wiki/IFD:Analog_Circuits_and_Interfaces_WS20_21/introduction_to_electronics)

#### Documented facts

- ILSE is a 10 HP analog monophonic voice with two sawtooth oscillators, a resonant bridged-T low-pass filter, triangle LFO, oscillator mixer/detune, level control, external filter input, 1 V/octave input, gate and exponential filter-CV input.
- Its compact oscillator integrates the exponential converter into the saw core. The author explicitly says it is not temperature compensated and advises against stage use where exact, reliable pitch matters.
- The project includes a public PDF schematic, editable KiCad mainboard/front-panel sources, iBOM, build instructions, simulation links, three tagged releases and photographs/renderings. Revision 4 is the current documented build path.
- It was developed for educational use and tied to university electronics course material.
- Schematic and PCB sources are CC BY-NC-SA 4.0. Branding and the cat graphic are separately reserved.

#### Engineering assessment and inference

- ILSE succeeds as an educational architecture because every block is legible and the part count is low. It is not a precision VCO platform.
- The uncompensated exponential cores will produce pitch drift with ambient and self-heating. Two oscillators on one narrow panel can also warm differently as settings and loading change, turning intended detune into time-varying error.
- The bridged-T filter is attractive for low cost but needs cutoff-range, resonance-yield and control-feedthrough characterization. Supply/reference movement can modulate both oscillator and filter simultaneously.
- Revision tags and an iBOM reduce fabrication ambiguity, but measurements and a formal calibration procedure are absent.

#### Parts and assembly

- The topology avoids specialist synth ICs and appears to rely mostly on common analog components, which lowers sourcing risk.
- Through-hole/panel assembly remains moderate. Revision matching between PCB, panel, iBOM and build guide is essential.
- The noncommercial license prevents unrestricted commercial reuse.

#### Adaptation ideas

- Add a matched transistor pair, tempco strategy and two-point or table-based digital tuning correction.
- Convert the voice into a low-cost teaching board with buffered test points at each oscillator, mixer, filter and envelope/control node.
- Add an inexpensive MCU frequency counter and DAC trim while keeping the analog audio path visible.
- Characterize bridged-T filter cutoff, Q, distortion and noise across supply and temperature.

#### Unresolved assumptions

- Exact output headroom, V/octave span, warm-up behavior and filter resonance limits were not measured in the reviewed material.
- The gate-to-level-control implementation needs bench verification for bleed, click and release behavior.
- No emissions, reverse-power or sustained thermal test evidence was found.

## HOLD, rejected and duplicate items

| Item | Decision | Reason |
|---|---|---|
| Len42/Synth VCA-4 | HOLD / family depth | Explicit CC BY 4.0, editable KiCad, Gerbers and a built four-channel SSI2164 VCA are strong. Held to avoid two rankings from one family and because no noise, feedthrough, CV-law, offset or crosstalk measurements were found. |
| TOILmodular 12-stage phaser | HOLD / license lineage | Excellent built LM13700 topology with selectable stage taps, separate direct/feedback outputs, schematic, BOM, Gerbers and GPL-3.0 repository license. Upstream MFOS material is explicitly non-commercial, so the derivative licensing is unresolved; editable EDA is also absent. |
| TOILmodular OTA VCF and VC Panner | HOLD | Built and well documented with schematics/BOM/Gerbers, but no editable EDA and the same upstream-lineage issue. |
| Greenface Labs Thor’s Arsenal | HOLD / scope and license clarity | Strong current KiCad/JLC manufacturing bundle, assembly docs, code and real products; useful eight-channel ±10 V programmable CV engine. Output bandwidth is limited to 100 Hz, and the site-level public-domain declaration should be reconciled with the repository’s GPL file. |
| Something Modular ORBITAL/APOGEE/VOYAGER/AMP | HOLD / primary-artifact gate | Useful current 3340 VCO, SSI2164 filter, ladder filter and VCA pages with manuals, BOMs, assembly instructions and electrical specifications. Public schematics and an explicit reusable hardware license were not located. |
| amesser-group Modular Synth VCO (GitLab) | HOLD / access and evidence | Fresh 2026 digitally cored VCO lead on a non-GitHub forge, but the research fetcher could not inspect its schematic, source package or license. |
| Sandelinos LM13700 dual VCA | HOLD / degraded and license | Previously strong built project with measurements and KiCad, but no license was found and the primary page now returns HTTP 402. |
| MFOS-derived projects generally | HOLD / noncommercial | MFOS publishes extensive schematics and build notes but explicitly limits free use to non-commercial purposes; derivative repositories need careful rights reconciliation. |
| b:art Dual SSI2130 VCO Core | Anchor only | Already selected manually and intentionally not treated as a new discovery. |
| PolyUAnalog, Erica DIY, DIYSynthMNL saturation, Free Modular analog set, Moduleur, Ambika, Solisynth, Castor & Pollux, Neptune, Bleep double MS-20 and littleBits archive | Duplicate / anti-repeat | Published in the previous three analog runs and still inside the 30-day window. |

## Discovery audit

| Requirement | Result |
|---|---|
| Profile | `weekly_deep` |
| Candidate pool | 21 project-level candidates inspected |
| Distinct domains | More than 35 |
| Outside GitHub | Over 80% of searched domains |
| Source classes | Forums, personal engineering sites, project hubs, alternative forges, self-hosted archives, academic pages, manufacturer hubs, datasheets, certification records and repository hosts |
| Query families | License-led, SSI/OTA/topology-led, alternative-forge, personal-site lineage, forum/community, OSHWA/certification and manufacturer/lifecycle validation |
| Post-shortlist lane 1 | Codeberg, SourceHut, Bitbucket, GitLab and self-hosted-forge search; found a fresh GitLab VCO but no additional inspectable promotable package |
| Post-shortlist lane 2 | SSI2131/SSI2164/TDA8425/YDA138 manufacturer and distributor validation; confirmed current SSI availability and the amplifier’s legacy-parts risk |
| Due registry pages | 53 dynamic rows revalidated and dated 2026-08-03 |
| Status changes | Sandelinos LM13700 VCA changed `active` → `degraded` after HTTP 402; all other statuses retained |
| Access failures | Codeberg and SourceHut robots-blocked; Mod Wiggler and SDIY returned 403; FreeStompboxes remained blocked; DIYStompboxes, DMME and ElectroSmash remained degraded/unavailable to direct fetch |
| Stop condition | Minimum coverage was exceeded; both independent post-shortlist lanes produced no fourth project that cleared schematic, licensing, artifact and anti-repeat gates |

Searched sources included GitLab, Codeberg, SourceHut, Bitbucket, Hackaday.io, Mod Wiggler, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, LMNC, SDIY, MFOS, Len’s Stuff, Greenface Labs, CHAIR Audio, Something Modular, TOILmodular, North Coast, NLC, Barton, Kassutronics, Lantertronics, David Haillant, Winterbloom, Bleep Sound, AI Synthesis, DIYSynthMNL, Sound Semiconductor, ALFA RPAR, NXP, TI, Princeton, Spin Semiconductor, OSHWA and specialist component suppliers.

## Registry persistence

`data/hidden-gems-source-registry.csv` was updated through GitHub and read back byte-for-byte after commit [`0f6b26c`](https://github.com/Denys/embedded-audio-mine/commit/0f6b26c086c68f512a5c334be0deafaaac950bc0).

Six rows were added:

1. Len’s Stuff homebrew Eurorack designs
2. Greenface Labs open-source synthesizer designs
3. Something Modular DIY Eurorack modules
4. Arduino Mini Amplifier OSHWA record LK000018
5. ILSE revision-4 build instructions
6. TOILmodular 12-stage LM13700 phaser

No digest, publication tracker or selected-project file was written to the repository.

## Proposed publication-tracker rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
Len42/Synth:modules/VCO-2131,PASS,2026-08-03,2026-08-03,2026-09-02,published,CC-BY-4.0 SSI2131 analog VCO with editable KiCad Gerbers BOM calibration 10-octave claim built evidence and explicit obsolete-middle-board warning
dilshan/arduino-mini-amp,PASS,2026-08-03,2026-08-03,2026-09-02,published,OSHWA-certified CERN-OHL-W mixed-signal stereo amplifier with TDA8425 analog processing YDA138 class-D power Arduino control firmware Gerbers and build evidence; legacy IC sourcing risk
chairaudio/ILSE,REF_PASS,2026-08-03,2026-08-03,2026-09-02,published,CC-BY-NC-SA educational dual-VCO bridged-T VCF LFO synth voice with editable KiCad iBOM tagged revision-4 build and explicit uncompensated-pitch caveat
```

## Proposed selected-project rows

```csv
project,url,status,origin,platforms,tags,why_selected,similarity_anchor_notes,link_status,notes
Len42/Synth:VCO-2131,https://github.com/Len42/Synth/tree/main/modules/VCO-2131,selected,digest_ranked,SSI2131,"analog-vco,ssi2131,one-volt-per-octave,kicad,calibration,open-hardware","Rare complete CC-BY modern SSI2131 VCO with editable sources calibration guidance built evidence and an unusually useful revision warning","Use beside the b:art SSI2130 anchor to compare modern SSI VCO cores and add DAC trims automated tuning thermal tests and revision-safe calibration data",verified,"Do not use the obsolete OSH Park middle-board revision; independently verify the ten-octave claim"
dilshan/arduino-mini-amp,https://github.com/dilshan/arduino-mini-amp,selected,digest_ranked,"ATmega328P,TDA8425,YDA138","analog-audio-processor,class-d,bluetooth,preset-control,oshwa,cern-ohl","Complete certified digitally controlled analog amplifier architecture with firmware manufacturing files and real build evidence","Mine for current-component replacements and reusable preset gain tone routing UI and production-test patterns",verified,"Hardware CERN-OHL-W-2.0; TDA8425 is obsolete and YDA138/AC6939 sourcing needs redesign"
```

## Next-run search debt

- Fabricate or independently measure the current VCO-2131 revision: tracking error versus octave and temperature, warm-up, sync recovery, waveform THD and bus-CV susceptibility.
- Reconcile the VCO-2131 Gerbers/BOM against the broken OSH Park middle-board revision before any order.
- Map current replacements for TDA8425 and YDA138 while preserving the Arduino Mini Amplifier’s control and preset architecture.
- Inspect the fresh `amesser-group/modular-vco` GitLab repository through a browser-capable path and verify its schematic, license and build state.
- Ask for or locate formal hardware licensing for Something Modular; APOGEE and ORBITAL could promote if the primary circuit source is public.
- Resolve TOILmodular versus MFOS rights before treating the 12-stage phaser as reusable hardware; separately characterize stage-switch pops, CV feedthrough, noise and feedback stability.
- Retry Codeberg, SourceHut, FreeStompboxes, DIYStompboxes, DMME, ElectroSmash and Sandelinos with browser-capable access.
