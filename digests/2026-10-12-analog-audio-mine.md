# Weekly Analog Audio Mine — 2026-10-12

## Outcome

Four projects cleared the promotion gate. The ranking rewards source completeness, explicit licensing, physical evidence, and reusable analog value; it does not treat simulation or a readable schematic as measurement or proof of a completed build.

| Rank | Project | Lane | Core value | Principal limit |
|---:|---|---|---|---|
| 1 | [North Coast Synthesis MSK 010 Fixed Sine Bank](https://northcoastsynthesis.com/products/msk-010-fixed-sine-bank/) | **STRONG_PASS** | Production-backed, fully sourced eight-Wien-bridge analog LFO bank | No numerical THD, noise, amplitude-spread, or temperature data |
| 2 | [bubbajfett/kicad-guitar-pedals](https://github.com/bubbajfett/kicad-guitar-pedals) | **PASS** | Large CC0 set of built pedal PCBs, final Gerbers, and newly generated build documents | Per-circuit derivative lineage and electrical characterization remain uneven |
| 3 | [KamikazeVildsvin/Solstrejf](https://github.com/KamikazeVildsvin/Solstrejf) | **REF_PASS** | GPL four-voice AS3372E analog drone with a complete multi-board source architecture | Bare PCBs are documented, but an assembled working instrument is not |
| 4 | [dilshan/6ch-sound-processor](https://github.com/dilshan/6ch-sound-processor) | **PASS** | Built MIT PT2322 six-channel analog processor with firmware and desktop control | PT2322 lifecycle and quantitative audio performance are unresolved |

The pinned b:art Dual SSI2130 VCO Core remained a selected similarity anchor only.

## 1. North Coast Synthesis MSK 010 Fixed Sine Bank — STRONG_PASS

**Lane:** personal engineering/manufacturer project page plus self-hosted source archive.

**Documented facts.** The MSK 010 is an eight-output analog low-frequency sine bank. Each oscillator is a Wien bridge built around two TL074 quad JFET-input op-amps, with a 1N5229B Zener network stabilizing amplitude. Three component variants span nominal rates from roughly 16 mHz to 16 Hz. Outputs are about 10 Vpp with approximately 1 kΩ output impedance. The module runs from ±12 V, is documented for about 25 mA average and 40 mA peak per rail, and includes reverse-polarity protection. North Coast sells both kits and assembled modules.

The downloadable source archive contains GPL-3.0 licensing, editable KiCad schematic and PCB files, BOM CSVs for all frequency variants, complete manual source, DXF/IGES mechanics, photographs, and production/test material. The manual explicitly covers hardware-source redistribution obligations. Gerbers are not committed, but the editable manufacturing source is complete.

**Why it matters.** Slow, independent sine modulators are often replaced by firmware because conventional RC oscillators become awkward at multi-second periods. This design exposes the real analog constraints: multi-megaohm nodes, leakage and flux residue, op-amp bias current, Zener behavior at very low current, component matching, startup time, and settling.

**Engineering assessment.** The manual correctly warns that 5% film capacitors and 1% resistors produce several-percent frequency spread; 3% capacitors or hand matching improve grouping. Very-low-frequency oscillators can take a long time and a conspicuous transient to start. High-impedance nodes make board cleanliness and leakage first-order design variables. Zener dynamic behavior can vary by maker, so incoming inspection or sample qualification is sensible. There is no calibration mechanism.

**Inference.** The eight unsynchronized oscillators should produce useful quasi-polyrhythmic modulation, but amplitude mismatch, phase behavior, temperature coefficient, and low-frequency waveform distortion will be unit-specific. The physical layout should keep the high-impedance bridges away from board edges, fingerprints, flux, and output switching currents.

**Adaptation ideas.** Add buffered bipolar/unipolar outputs, a selectable rate family, and a digitally measured production fixture that records frequency and amplitude without placing the oscillator under MCU control. A DAC-trimmed resistance element could provide per-channel rate alignment, but its leakage, distortion, and control feedthrough must be measured against the passive network.

**Unresolved assumptions.** No analyzer data establishes THD, broadband noise, amplitude distribution, rail sensitivity, warm-up drift, or temperature stability across units. The exact shipped Gerber revision was not independently compared with the source PCB.

**Primary sources:** [project page](https://northcoastsynthesis.com/products/msk-010-fixed-sine-bank/), [construction manual](https://files.northcoastsynthesis.com/msk-010.pdf), [source archive](https://files.northcoastsynthesis.com/msk-010.zip).

## 2. bubbajfett/kicad-guitar-pedals — PASS

**Lane:** current repository source plus project build ledger.

**Documented facts.** At inspected head `7a88ad9` dated 2026-10-11, this CC0-1.0 repository contains 36 native KiCad schematics, 36 PCB layouts, hundreds of fabrication outputs, and 28 generated PDF build documents. The new update adds a Tone Machine build document. The set includes a PT2399 Deep Blue Delay, Bearhug and Engineer's Thumb compressors, DynaComp variants, Little Angel chorus, Mutron-style envelope filter, EQs, fuzzes, distortions, and overdrives. Each finished subproject includes a final Gerber set; the generated documents combine notes, schematic, board views, and BOM.

The author records that every published PCB was built and tested outside an enclosure, that multiple revisions were built for many circuits, and that a dozen boxed pedals are in regular pedalboard use. The same ledger candidly marks experimental or noisy/nonworking boards; those are not treated as verified designs here.

**Why it matters.** This is an unusually dense bridge between editable design source and reproducible fabrication. The value is less a single novel topology than a consistent mechanical/electrical corpus for comparing PT2399 delay, envelope detection, dynamics, clipping, tone shaping, bypass, grounding, and 125B enclosure integration.

**Engineering assessment.** The verified rows have strong fabrication evidence, but no common test standard covers noise, THD, headroom, bypass pop, current, frequency response, compression curves, or PT2399 clock leakage. The README notes silkscreen features below JLCPCB's recommended minimum. Some boards are explicitly works in progress, including an LM13700 DynaComp experiment, and must not inherit the verified status of the collection.

**Inference.** A shared enclosure and power convention makes cross-project reuse easier, but derivative circuits can carry undocumented component tolerances, bias assumptions, or grounding habits. CC0 clearly covers the repository's authored files; it does not automatically resolve every underlying commercial or community circuit lineage.

**Adaptation ideas.** Start with the verified PT2399 and compressor boards, add input/output protection and rail-current test points, then publish swept response, noise, headroom, clock-spur, attack/release, and transfer-curve data. A digitally switched analog matrix could recall effect order while leaving each audio path analog.

**Unresolved assumptions.** The source-to-fabricated-board correspondence was not independently netlist-compared for all 36 projects. Upstream attribution and rights need project-by-project review before commercial reuse.

**Primary sources:** [repository](https://github.com/bubbajfett/kicad-guitar-pedals), [license](https://github.com/bubbajfett/kicad-guitar-pedals/blob/master/LICENSE).

## 3. KamikazeVildsvin/Solstrejf — REF_PASS

**Lane:** alternative project mirror plus canonical repository and semiconductor source.

**Documented facts.** Solstrejf is a four-voice analog drone instrument built around four AS3372E controllable signal processors. Each voice chip integrates a two-input VCA mixer, four-pole low-pass filter with voltage-controlled resonance, final VCA, and pan/mix functions. Supporting LM324/TL072 stages perform CV summing and stereo output duties. Per-voice one-shot envelopes, frequency/amplitude/pan modulation, and a four-by-four modulation matrix connect the voices.

The GPL-3.0 repository contains eleven native KiCad schematics, four PCB layouts, eight interactive BOMs, PDFs, design-calculation notebooks, 3D models, and separate voice, front-panel, modulation-matrix, and PSU/stereo-mixer boards. The ±15 V linear supply uses a 2×15 VAC transformer; local regulators derive ±12 V and ±5 V rails. Prototype bare boards were received from PCBWay, but the documentation does not show an assembled, working instrument.

**Why it matters.** It is a rare open, whole-instrument example using the currently documented ALFA recreation of the CEM3372 family rather than another standalone VCO or generic filter. The source exposes voice replication, analog modulation distribution, power, and current-output stereo summing in one coherent design.

**Engineering assessment.** Mains transformer wiring and the linear supply require enclosure, fuse, earth, creepage, thermal, and connector review. Four high-gain resonant voice paths plus a full modulation matrix create plausible crosstalk, control-feedthrough, and ground-current problems. The stereo current-output summing stage and its approximately 15.9 kHz filtering deserve headroom and stability tests. There are no measured tracking, resonance, noise, THD, bleed, pan-law, or thermal results.

**Inference.** The architecture is credible and unusually well documented, but without an assembled build it remains a reference-quality source rather than a proven fabrication target. AS3372E availability is much narrower than commodity op-amps, so socketing, spares, and a lifecycle plan matter.

**Adaptation ideas.** Replace the one-shot control source with an MCU/DAC calibration layer for repeatable pitch, cutoff, amplitude, and pan presets; keep the analog audio path intact. Add per-voice factory-test headers and automate gain, cutoff, resonance, bleed, and stereo pan-law measurements.

**Unresolved assumptions.** The received PCB revision was not independently compared against the repository head. No completed assembly, audio demonstration, thermal test, or fault test was located.

**Primary sources:** [repository](https://github.com/KamikazeVildsvin/Solstrejf), [BoardRepo artifact index](https://boardrepo.com/kamikazevildsvin/solstrejf), [ALFA AS3372E product page](https://www.alfatriode.lv/eng/sc/AS3372E.php).

## 4. dilshan/6ch-sound-processor — PASS

**Lane:** mixed-signal analog-control repository.

**Documented facts.** This MIT-licensed 5.1-channel processor uses the PT2322 for six independently attenuated analog channels, front-left/right three-band tone control, and the chip's 3D-audio function. An Arduino Nano controls it over I²C; a Linux GTK application provides desktop control. The repository includes native KiCad schematic/PCB source, a PDF schematic, ODS/PDF BOM, PlatformIO firmware, GTK source, a finished-board photograph, and assembly video. No Gerber archive is committed, although an external PCBWay project is linked.

The PT2322 analog rail is regulated to 8 V with an LM78M08; the Nano uses 5 V. The layout labels separate analog and digital ground regions. Inputs and outputs are AC-coupled with 10 µF capacitors, while tone networks use 1% 3.3 kΩ and 6.2 kΩ resistors. 2N7002 devices provide level-interface duties.

**Why it matters.** The project is a compact example of preset-controllable analog routing and tone shaping. Unlike a codec-only carrier, the MCU controls a dedicated multichannel analog processor and includes a practical desktop UI.

**Engineering assessment.** USB/Nano return currents, I²C edges, regulator dissipation, and ground-joining strategy need direct bench verification. Large coupling capacitors and high-value bias resistors should be checked for turn-on/off pops, low-frequency corner consistency, leakage, and source/load interaction. The repository supplies no noise, THD, headroom, crosstalk, tone-response, 3D-mode, or control-step measurements and no calibration procedure.

**Inference.** The board photo and assembly video establish a real build, but not production repeatability. PT2322 sourcing is dominated by distributors and marketplace listings; without a verified current manufacturer lifecycle page, counterfeit and long-term-availability risk is material.

**Adaptation ideas.** Add saved presets, input/output muting around gain changes, USB isolation or a controlled ground strategy, and an automated six-channel analyzer fixture. A modern controller can preserve the analog signal path while adding MIDI recall and calibrated volume/tone steps.

**Unresolved assumptions.** Current PT2322 manufacturer status and second-source compatibility remain unresolved. The external fabrication project was not used as proof that its files match repository head.

**Primary sources:** [repository](https://github.com/dilshan/6ch-sound-processor), [PT2322 datasheet mirror](https://www.princeton.com.tw/Portals/0/Product/PT2322.pdf).

## HOLD, rejected, duplicate, and foundation pool

| Candidate | Disposition | Reason |
|---|---|---|
| [Randomwaves Drumboy Pro](https://github.com/Randomwaves/Drumboy-Pro) | HOLD / analog relevance | Excellent MIT KiCad, production, firmware, enclosure, and wiki package, but the analog contribution is mainly an SGTL5000 codec front end; lifecycle and quantitative audio evidence remain unresolved |
| [Randomwaves Drumboy](https://github.com/Randomwaves/Drumboy) | DUPLICATE FAMILY | Earlier/lower-control family member; Drumboy Pro supplied the stronger reference package |
| [minisystem/SIP-Modules](https://github.com/minisystem/SIP-Modules) | HOLD / license and revision | Useful analog synth building blocks, but no explicit licence was found and the author warns that versions are messy and may not be current |
| [gtfields13/PSX011_SSI2100_Demo_Board](https://github.com/gtfields13/PSX011_SSI2100_Demo_Board) | HOLD / evidence | Editable SSI2100 compressor/expander demo source is promising, but no explicit license, completed-build evidence, or measurements were verified |
| [bosco-drg/Analog-Compressor-Pedal](https://github.com/bosco-drg/Analog-Compressor-Pedal) | HOLD / unchanged | Strong KiCad and simulation work, but still no explicit reusable hardware/source license or measured transfer data |
| [openaudiotools/mixtee](https://github.com/openaudiotools/mixtee) | HOLD / pre-prototype | Excellent CERN-OHL-P architecture remains explicitly pre-prototype and incomplete |
| dmsd-lab AMP8611 / AMP3886 | HOLD / build evidence | Licensed amplifier source, but no completed build or quantitative electrical/thermal results were verified |
| Hackaday polyphonic analog-synth lead | HOLD / WIP | Current build log is incomplete and lacks a consolidated licensed primary source package |
| HardLabs NEOgHacking audio module | HOLD / license and firmware | Interesting mixed-signal carrier, but reusable hardware licensing and mature firmware were not verified |
| NLC Shaver Mystery and Macrame | HOLD / license and measurements | Public circuit documentation exists; source-package license and quantitative evidence did not clear the gate |
| DIYSynthMNL AS2164 Quad VCA | HOLD / license and PCB state | Useful AS2164 circuit lead, but licensing is absent and the PCB is documented as unfinished |
| [ohdsp/AmpTwo](https://github.com/ohdsp/AmpTwo) | HOLD / untested | TAPR-OHL fabrication source is explicit, but the author still labels the headphone amplifier untested |
| [Rabid Audio Bass Chorus](https://rabid.audio/projects/chorus-pedal/) | HOLD / pre-prototype | Calculation-rich LM13700/MN3207 design still lacks breadboard confirmation and final PCB/fabrication evidence |
| [vitoria-b/little-angel-chorus](https://github.com/vitoria-b/little-angel-chorus) | HOLD / license | Hardware-source license and derivative lineage remain unresolved |
| SSI2100, SSI2162, AS2164, AS3372E and TI LM13700 resources | FOUNDATION ONLY | Current primary component documentation informed assessment but is not open hardware |
| Windfisch analog-synth projects and other tracked September ranks | DUPLICATE | Already published or still inside the canonical 30-day window; no material revision justified an override |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned similarity anchor, not a new discovery |

## Discovery audit

### Coverage and stopping rule

- Profile: `weekly_deep`.
- Candidate pool: 22 plausible projects or foundations; four ranked.
- Domains searched or revalidated: 38 distinct domains, 32 (84%) outside GitHub. Coverage included GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SynthDIY/SDIY resources, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal sites, university pages, project mirrors, self-hosted downloads, and primary manufacturers.
- Source classes: repository hosts, alternative forges, specialist forums, personal engineering blogs, project/build hubs, self-hosted downloads, legacy archives, university/lab pages, manufacturer documents, vendor/community pages, and link directories.
- Query families: modern synth ICs and SSI21xx; LM13700/OTA/VCA/VCF; PT2399/BBD modulation; mixer/panner/compressor/preamp; drum/noise/waveshaping; digitally assisted calibration and preset routing; artifact-led EDA/BOM/Gerber/license; alternative-forge/university/personal-site and lineage queries.
- Post-shortlist lane 1 searched current Sound Semiconductor, ALFA, TI, and NXP component/design resources. It improved parts-risk assessment but produced no additional licensed built project.
- Post-shortlist lane 2 independently searched GitLab, Codeberg, SourceHut, university pages, personal sites, and self-hosted artifact indexes. It found useful HOLDs and registry sources but no additional gate-clearing item.

The minimum coverage was exceeded. Two consecutive independent post-shortlist batches produced no additional serious promotion, satisfying the diminishing-return stop rule.

### Due-source revalidation

Seventy-one due registry pages were checked and updated to `last_verified=2026-10-12`. Direct access restored `active` status for Mod Wiggler, electro-music, Codeberg's repository explorer, and the DMME DSP module page. PedalPCB stayed active through current indexed evidence despite a direct 403. DIYStompboxes stayed degraded; FreeStompboxes and SourceHut stayed blocked by the available path. The Spin Semiconductor development-board schematic and ElectroSmash Time Manipulator returned transient 502 responses, so prior evidence and status were retained rather than declaring them dead.

### Registry additions

Five reusable page-level sources were added to `data/hidden-gems-source-registry.csv`:

1. North Coast Synthesis MSK 010 official project/source page.
2. bubbajfett tested guitar-pedal PCB repository.
3. BoardRepo's low-SEO Solstrejf artifact mirror.
4. dilshan's PT2322 six-channel processor source repository.
5. Randomwaves' Drumboy Pro developer wiki.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
northcoastsynthesis/msk-010-fixed-sine-bank,STRONG_PASS,2026-10-12,2026-10-12,2026-11-11,published,GPL production-backed eight-Wien-bridge analog LFO bank with editable KiCad BOM variants mechanics manual source test guidance and commercial build evidence; no numerical THD noise amplitude-spread or thermal data
bubbajfett/kicad-guitar-pedals,PASS,2026-10-12,2026-10-12,2026-11-11,published,CC0 collection of 36 KiCad pedal boards with final Gerbers 28 generated build documents and extensive build ledger; use only verified rows and audit derivative lineage and measurements per circuit
KamikazeVildsvin/Solstrejf,REF_PASS,2026-10-12,2026-10-12,2026-11-11,published,GPL four-voice AS3372E analog drone with complete multi-board KiCad BOM notebooks and bare prototype boards; no assembled build proof or quantitative tracking noise crosstalk or thermal measurements
dilshan/6ch-sound-processor,PASS,2026-10-12,2026-10-12,2026-11-11,published,MIT built PT2322 six-channel analog processor with KiCad BOM Arduino firmware and GTK controller; no committed Gerbers calibration or measured noise THD headroom crosstalk and PT2322 lifecycle is unresolved
```

### `data/selected-projects.csv`

```csv
northcoastsynthesis/msk-010-fixed-sine-bank,https://northcoastsynthesis.com/products/msk-010-fixed-sine-bank/,selected,digest_ranked,"Analog,Eurorack,TL074,1N5229B","lfo,wien-bridge,sine,slow-modulation,kicad,mechanics,open-hardware",Production-backed source package documents the difficult leakage startup matching and low-current Zener behavior of very-slow analog sine oscillators,Add buffered bipolar outputs automated frequency/amplitude fixture data and optional low-leakage DAC trimming while measuring distortion and feedthrough,verified,GPL-3.0 hardware source; no committed Gerbers or numerical THD noise amplitude-spread and temperature data
bubbajfett/kicad-guitar-pedals,https://github.com/bubbajfett/kicad-guitar-pedals,selected,digest_ranked,"Analog,Pedal,PT2399,LM13700","delay,compressor,chorus,envelope-filter,kicad,gerbers,build-docs,cc0",Large build-tested source corpus pairs editable pedal designs with final fabrication outputs and newly generated schematic-layout-BOM documents,Instrument verified boards for noise headroom transfer curves timing and clock leakage then add digitally recalled analog routing,needs_lineage_check,CC0 source files; audit underlying derivative circuit rights and use only rows the author marks verified
KamikazeVildsvin/Solstrejf,https://github.com/KamikazeVildsvin/Solstrejf,selected,digest_ranked,"Analog,Standalone,AS3372E,TL072,LM324","drone,vcf,vca,pan,modulation-matrix,kicad,open-hardware",Complete four-voice instrument architecture shows modern AS3372E voice replication modulation distribution power and stereo summing in one source tree,Add MCU/DAC preset calibration factory test headers and measured voice tracking resonance bleed pan law and thermal characterization,verified,GPL-3.0 source with fabricated bare boards; assembled working instrument and measurements are absent
dilshan/6ch-sound-processor,https://github.com/dilshan/6ch-sound-processor,selected,digest_ranked,"Analog,Mixed-Signal,PT2322,Arduino Nano","5.1,tone-control,attenuator,preset-control,kicad,gtk,mit",Built six-channel processor is a compact reusable reference for digitally controlled analog attenuation tone shaping and routing,Add muted preset changes MIDI recall USB-ground control and automated six-channel noise headroom response and crosstalk tests,needs_lifecycle_check,MIT source; no committed Gerbers or quantitative measurements and PT2322 lifecycle is unresolved
```

Equivalent hard and soft rows were added to `data/common-anti-repeat-index.csv`. These projects are ineligible for ordinary republication through 2026-11-11 absent a material revision.

## Next-run search debt

1. Find a licensed, built SSI2100 plus SSI2162 compandor/BBD effect with editable EDA and measured tracking, clock leakage, SNR, and overload recovery.
2. Find an SSI2190 or SSI2164 mixer/panner with DAC recall and measurements for noise, crosstalk, pan law, headroom, and control feedthrough.
3. Recheck the SSI2100 demo board only after licensing, build proof, and compressor/expander curves appear.
4. Revisit Drumboy Pro only if its codec lifecycle is resolved or independent analog-input/output measurements appear.
5. Resolve SIP-Modules licensing and exact current revisions; do not infer permission from public source.
6. Continue non-GitHub searches for digitally calibrated analog VCO/VCF/drum hardware with downloadable fabrication source.

## Prompt improvement for next run

Add a mandatory `physical_evidence_class` to the candidate ledger: `production`, `assembled_prototype`, `bare_pcb`, `breadboard`, `simulation_only`, or `none`. Require the digest to state it beside `measurement_class`. This prevents a fabricated bare PCB, an assembled circuit, and a production-tested product from being described with the same word: “built.”

## Feedback / Tuning Questionnaire

1. Preferred mix next week? A) reusable circuit blocks; B) complete instruments; C) balanced.
2. Priority topology? A) VCO/VCF/VCA; B) BBD/PT2399/FV-1 effects; C) mixers/preamps/compressors; D) drums/noise/waveshapers.
3. Should repository licences such as GPL/MIT remain rankable for hardware? A) yes with scope caveats; B) `REF_PASS` only unless hardware-specific; C) hardware-specific licences only.
4. Minimum physical evidence for `PASS`? A) assembled prototype; B) bare PCB plus complete source; C) current policy based on total evidence.
5. Measurement emphasis? A) noise/THD/headroom; B) CV tracking/calibration/thermal; C) crosstalk/control feedthrough; D) equal weighting.
6. Source emphasis? A) personal/self-hosted; B) specialist forums/archives; C) alternative forges; D) universities/manufacturers.
7. Digitally assisted analog priority? A) autotune/DAC trims; B) preset routing/VCAs; C) production-test fixtures; D) BBD/delay clock and bias control.
8. Derivative circuit policy? A) rank with prominent lineage warning; B) `REF_PASS` only; C) HOLD until upstream rights are resolved.
