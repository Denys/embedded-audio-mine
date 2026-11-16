# Weekly Analog Audio Mine — 2026-11-16

## Previous questionnaire feedback applied

No explicit weekly-analog questionnaire answers were recorded after the previous digest. The broad weekly scope, strict primary-artifact and licence gates, 30-day anti-repeat rule, and existing emphasis on physical and measurement evidence therefore remained unchanged.

## Outcome

Four projects cleared the promotion gate. PolyUAnalog is a long-tracked research lead whose final peer-reviewed article, raw data, and replication package now make its evidence unusually strong; it was not published in the canonical tracker during the preceding 30 days. The other three are newly verified low-SEO circuit projects. “Documented” means present in primary source files or the final article, “inference” means engineering judgment, and “unresolved” marks work that still requires measurement or build validation.

| Rank | Project | Lane | Licence scope | Physical / measurement evidence | Principal limit |
|---:|---|---|---|---|---|
| 1 | [PhysicsDptAngers/polyUAnalog](https://github.com/PhysicsDptAngers/polyUAnalog) | **STRONG_PASS / evidence completion** | MIT whole-project licence | Working 10-voice instrument, multiple board revisions, peer-reviewed electrical characterization, raw data | AS3397 single-source exposure; PWM-control residue and VCF slope discrepancy need independent characterization |
| 2 | [benjiaomodular/HackableDelay](https://github.com/benjiaomodular/HackableDelay) | **PASS** | CC BY 4.0 hardware project | Current v1.1 front/back hardware photographs and fabrication package | No noise, bandwidth, headroom, delay-time, overload, or piezo-input measurements |
| 3 | [MarkWestbroek/MusicBrain VCF8-kern](https://github.com/MarkWestbroek/MusicBrain/tree/main/hardware/schematics/musicbrain-vcf8kern) | **REF_PASS** | MIT whole-project licence | Native four-layer board, BOM and fabrication outputs; no current-board build | Revision 0.1 is explicitly waiting on bus validation before PCB order |
| 4 | [apaleslimghost/synths — Dolphins](https://github.com/apaleslimghost/synths/tree/main/eurorack/modules/dolphins) | **REF_PASS** | CERN-OHL-S-2.0 hardware; panel art CC BY-NC-SA 4.0 | Complete routed KiCad board and derivable BOM; no verified assembled module | No Gerber release, build guide, calibration, measurements, or current-revision physical proof |

The pinned b:art Dual SSI2130 VCO Core remained a selected similarity anchor only.

## 1. PhysicsDptAngers/polyUAnalog — STRONG_PASS / evidence completion

**Lane and canonical sources.** University/lab page, final open-access article, canonical repository, supplementary raw data, and ALFA manufacturer documentation. Repository head inspected: `286d26c` (2026-04-07). Final article: [Hardware 2026, 4(3), 14](https://doi.org/10.3390/hardware4030014), published 2026-07-07.

**Topology and why it matters — documented.** Each voice combines an AS3397 dual waveform converter, resonant VCF, VCA and panning VCAs with its own RP2040 or RP2350. PIO outputs discharge the two DCO timing capacitors; an ADC reads each ramp and a PI loop corrects charging-current control. Ten AS3397 control voltages come from low-pass-filtered PWM rather than a bank of DACs. A conductor board discovers voice cards and assigns notes over I²C, making the system modular from one monophonic card to the demonstrated ten-voice instrument. This is exactly the digitally assisted analog architecture the mine has been seeking: per-voice measurement, stored note setpoints, deterministic digital timing, and an analog signal path.

**Source completeness and licence — documented.** The canonical repository has an MIT licence, C++ firmware, native KiCad voice, conductor, bus, power, controller and FX designs. The final article’s supplementary package adds Gerbers, BOM, precompiled UF2 files, system photographs, `OpenData.zip`, processing scripts, and a repository snapshot. The paper documents both 1206 and 0603 voice cards plus a through-hole monophonic teaching board. Licence class: `verified_open_hardware`; scope class: `whole_project_generic`.

**Electrical and calibration assessment — documented.** The authors report DCO pitch error below 0.1 cent, note-trigger settling in two charge/discharge cycles, roughly 5 ms at A4 and up to 70 ms at low notes, about 0.8–1 ms MIDI-to-audio latency, approximately 2% THD for the dual-PWM digital oscillator, and about ±5 mV residual control ripple near a 50 kHz PWM carrier. The VCF measurement is candidly inconclusive: it produced about −12 dB/octave rather than the nominal −24 dB/octave, with a measurement floor near −50 dB, and self-oscillation began near 2.5 V rather than the datasheet’s roughly 4 V. The software stores 128 note-specific PI setpoints and could refine them while voices are idle.

**Power, layout, noise, thermal and parts risk — engineering inference.** The ±5 V, +5 V and +12 V rails, per-card PWM carriers, PIO edges, I²C traffic and analog ramp nodes demand disciplined return-current routing. The measured ±5 mV control residue is small but can become audible on filter cutoff, resonance or pan at high sensitivity; per-parameter RC constants and synchronized carriers deserve spectral testing. IDC power distribution across many voice cards creates connector-drop and shared-impedance modulation risks. AS3397 is currently purchasable, but it remains a specialist single-source SOIC/QFN part; the small package plus each card’s Pico makes assembly moderate-to-high burden. Thermal tracking is mostly moved into measurement and control, but the AS3397 and timing-capacitor environment still need multi-temperature validation.

**Adaptation ideas.** Reuse the voice card as a modern polysynth subassembly; add a quiet external DAC option for the most feedthrough-sensitive control nodes; persist factory and user calibration tables with temperature metadata; add per-voice health telemetry and automatic quarantine; and expose conductor-level preset morphing while preserving analog audio. A production test fixture could sweep pitch, cutoff, resonance, VCA gain, pan law, PWM residue and rail coupling automatically.

**Unresolved assumptions and caveats.** The article’s measurements are author measurements, not independent reproduction. The latest repository README lags the final paper and still describes several tasks as pending. Exact correspondence between every supplementary fabrication archive and the current Git tree was not independently netlist-compared. The VCF roll-off discrepancy, absolute noise floor, inter-voice crosstalk, PWM sidebands, supply current per voice, long-term drift and worst-case polyphonic rail loading remain unresolved.

**Primary sources:** [repository](https://github.com/PhysicsDptAngers/polyUAnalog), [final article and supplementary package](https://www.mdpi.com/2813-6640/4/3/14), [AS3397 product page](https://www.ericasynths.lv/as-3397d-in-soic-28-case-1-pc-2321/), [AS3397 datasheet](https://www.ericasynths.lv/media/AS3397.pdf).

## 2. benjiaomodular/HackableDelay — PASS

**Lane and canonical source.** Personal engineering ecosystem, specialist-community announcement, and canonical repository. Inspected head `f1c9493` dated 2026-08-28.

**Topology and why it matters — documented.** HackableDelay is a single-supply +9 V teaching card developed with SOMATOSONIC. It combines a piezo-oriented TL072 preamplifier, PT2399 delay, +5 V local regulation and a +4.5 V analog bias. The design is intentionally exposed as a card that can be patched or altered for art and education rather than sealed as a finished pedal. Time, feedback and wet/dry behavior are accessible enough to make it a useful PT2399 experimentation platform.

**Source completeness and licence — documented.** The CC BY 4.0 licence explicitly permits commercial sharing and adaptation with attribution. The repository carries KiCad 8 schematic, PCB and project files, PDF/PNG/SVG schematic exports, editable front/back panel graphics, HTML/XLSX BOMs, complete v1.0 and v1.1 Gerber/drill archives, current copper/mask/silkscreen SVGs, and front/back photographs of hardware. Licence class: `verified_open_hardware`; scope class: `hardware_specific`.

**Electrical assessment — documented and inferred.** The schematic clearly separates +9 V, regulated +5 V and +4.5 V bias domains. The PT2399 internal ADC/DAC and clock make delay time, bandwidth and noise inseparable; long delays will raise quantization and clock-related artifacts. The piezo input benefits from high impedance, but cable capacitance, ESD, bias recovery and strong impact transients can overload the TL072 path. No calibration is specified.

**Layout, grounding and thermal risk — engineering inference.** Single-supply bias current and digital ground return from the PT2399 can modulate the preamp reference if the 4.5 V node or regulator return is shared carelessly. Keep the piezo input, bias divider and first op-amp away from pin-6 clock control and the 5 V regulator loop; provide a clean star or split-return strategy at the supply entry. Thermal risk is low, but a linear 5 V regulator from 9 V needs dissipation margin if external loads are added. Through-hole/SMD mixed assembly and the photographed board make burden moderate.

**Adaptation ideas.** Add CV time control through a protected transistor or optocoupler around pin 6; buffer separate wet and dry outputs; add clock-bleed and overload test points; replace the fixed bias with a lower-impedance reference; or build an MCU-assisted calibration fixture that maps delay time and instability against pin-6 resistance. The format is especially suitable for a workshop card with labeled measurement pads.

**Unresolved assumptions and caveats.** The photographs establish a fabricated populated board but not a documented listening test of v1.1. There are no measurements for input impedance, maximum piezo transient, gain, delay range, bandwidth, noise, headroom, feedback onset, clock leakage, current draw or regulator temperature. BOM sourcing links are region-specific. The circuit should be treated as a hackable teaching platform, not a characterized production effect.

**Primary sources:** [repository](https://github.com/benjiaomodular/HackableDelay), [PT2399 topology index](https://www.hardlabs.io/boards/part/pt2399), [community project announcement](https://www.reddit.com/r/synthdiy/comments/1v55tuz/opensource_hackabledelay_synthcard_module/).

## 3. MarkWestbroek/MusicBrain VCF8-kern — REF_PASS

**Lane and canonical source.** Low-SEO board index plus canonical active repository. Inspected head `9d5a6e2` dated 2026-11-01; the analog card itself is revision 0.1.

**Topology and why it matters — documented.** VCF8-kern places eight SSI2140 four-pole filter cores on a 110 × 92 mm four-layer card. Each voice exposes pole signals to a 74HC4051-based selector for eight multimode combinations. Two AD5754 bipolar 16-bit DACs control cutoff, a DAC128S085 supplies modulation controls, ADR421 provides the reference, and an SPI-controlled MusicBrain card handles presets and routing. The board uses inner ground planes and deliberately places per-voice pole-mix support and decoupling on the back side.

**Source completeness and licence — documented.** The root MIT licence covers the repository. Native KiCad schematic/PCB/project files, fabrication outputs and BOM exist; HardLabs extracts 412 components from 28 distinct parts, including eight SSI2140s, nine 74HC4051s, five TL074s and two AD5754s. Documentation specifies PCBA strategy and which expensive synth ICs remain hand-soldered. Licence class: `verified_open_hardware`; scope class: `whole_project_generic`.

**Electrical and calibration assessment — documented.** SSI2140 provides the exponential cutoff path, resonance VCA and pole outputs; per-voice pole mixing is a genuinely reusable way to turn one filter IC into multiple modes under preset control. The design intends precision bipolar cutoff control and lower-resolution modulation control. However, the project plan explicitly requires a PIO-SPI slave test before ordering the backbone, and no per-channel cutoff, resonance, mode-gain or temperature calibration procedure is yet documented.

**Layout, power, noise, thermal and assembly risk — engineering inference.** Eight filter cores, two precision DACs, nine muxes and double-sided 0603 assembly create high coupling density. Reference return, DAC output settling, mux charge injection, mode-switch pops, digital SPI edges and shared resonance control are the main risks. The two internal ground planes are helpful, but star points around each pole-mix network must not be defeated by back-side assembly or connector returns. AD5754 cost and exposed-pad assembly dominate the BOM; the design is PCBA-oriented and high burden.

**Adaptation ideas.** Break out one or two SSI2140 voices as a smaller validated card; add per-channel calibration storage and automated Bode sweeps; synchronize mode changes at zero crossings; characterize pan-like morphing between pole combinations; and expose a low-noise DAC-trim API for factory cutoff/Q matching.

**Unresolved assumptions and caveats.** The current card is unbuilt. The source plan still contains open bus, front-panel and order prerequisites. No current, headroom, THD, noise, cutoff tracking, resonance consistency, mode gain, control feedthrough, switching transient, thermal drift or crosstalk result exists. HardLabs’ simulation button is artifact tooling, not physical proof. This is therefore an exceptional architecture reference, not a fabrication recommendation.

**Primary sources:** [VCF8-kern source](https://github.com/MarkWestbroek/MusicBrain/tree/main/hardware/schematics/musicbrain-vcf8kern), [board artifact index](https://www.hardlabs.io/boards/markwestbroek--musicbrain--musicbrain-vcf8kern), [SSI2140 datasheet](https://www.soundsemiconductor.com/downloads/ssi2140datasheet.pdf), [SSI2140 evaluation guide](https://www.soundsemiconductor.com/downloads/evb2140lp.pdf).

## 4. apaleslimghost/synths — Dolphins — REF_PASS

**Lane and canonical source.** Canonical hardware monorepo plus PT2399 board index. Inspected repository head `aef2b1a` dated 2026-11-01; that head’s latest change is for another instrument, not evidence of a Dolphins revision.

**Topology and why it matters — documented.** Dolphins is a large Eurorack effect with three PT2399 delay sections, four TL074s, a local L78L05 regulator, transistor control elements, three main controls and a substantial patch interface. The 127 × 128.5 mm two-layer board contains 171 components. It is a rare open hardware example of a multi-delay analog/digital hybrid rather than a single PT2399 echo cell.

**Source completeness and licence — documented.** The repository states CERN-OHL-S-2.0 for hardware, Parity Public Licence 7.0.0 for software/firmware, and CC BY-NC-SA 4.0 for artwork. Dolphins has native KiCad schematic, routed PCB and project files plus editable panel art. A complete BOM can be extracted from the source, but the repository’s documentation TODO explicitly calls for generated build guides and publishing work. No Dolphins Gerber archive, placement guide, release package or calibration document was found. Licence class: `verified_open_hardware` for the circuit board; panel artwork remains `noncommercial_or_restricted`.

**Electrical assessment — documented and inferred.** Three delay lines permit richer recursion, diffusion or multi-tap behavior than a single PT2399. Each PT2399 adds its own clock, conversion noise, bias network and supply transient; a shared 5 V regulator and two-layer return geometry therefore deserve scrutiny. The 20 connectors and three board-to-board headers make panel and ground mechanics important. No nominal levels, delay ranges, filter corner frequencies or current draw are documented.

**Layout, grounding, noise, thermal and assembly risk — engineering inference.** Unsynchronized PT2399 clocks can create intermodulation and beating products; synchronized clocks can instead create correlated spurs. The design should be tested both ways. Separate local decoupling and controlled convergence at the 5 V regulator are critical. TL074 headroom on ±12 V is ample for Eurorack, but PT2399 inputs must be attenuated and biased correctly, so overload recovery and feedback runaway are likely limiting behaviors. Assembly is high burden because of 171 parts, three PT2399s, double board interfaces and absent placement documentation.

**Adaptation ideas.** Extract one delay cell as a characterized daughterboard; add MCU- or clock-divider-assisted synchronous ratios; create selectable self/cross-feedback matrices; add per-line companding or pre/de-emphasis; and provide clock, bias, wet and feedback test pads. A revised panel can remain commercially permissive if newly authored rather than reusing the NC artwork.

**Unresolved assumptions and caveats.** No assembled Dolphins module, demonstration, independent build, current-revision Gerbers or measurements were verified. The extracted HardLabs BOM incorrectly links a BOM path under another module, so source-derived procurement must be independently regenerated. Panel licensing is more restrictive than the hardware licence. Promotion is capped at `REF_PASS` until the board is fabricated and characterized.

**Primary sources:** [Dolphins source directory](https://github.com/apaleslimghost/synths/tree/main/eurorack/modules/dolphins), [repository licence statement](https://github.com/apaleslimghost/synths), [board artifact index](https://www.hardlabs.io/boards/apaleslimghost--synths--dolphins), [PT2399 topology index](https://www.hardlabs.io/boards/part/pt2399).

## HOLD, rejected, duplicate, and foundation pool

| Candidate | Disposition | Reason |
|---|---|---|
| [storskegg/Block-PT2399](https://github.com/storskegg/Block-PT2399) | HOLD / strong reference | Apache-2.0, native KiCad and full Gerbers with unusually explicit dual-star grounding and local 7805; no build photo, build report, measurements, calibration or current-draw evidence |
| [PancakeLegend/HackSynth Dark Rabbit Chorus](https://github.com/PancakeLegend/HackSynth) | HOLD / build evidence | GPL-3.0 PT2399/TL072 chorus with KiCad and Gerbers; no current-revision physical or quantitative evidence verified |
| [soggybag/Dual-Delay](https://github.com/soggybag/Dual-Delay) | HOLD / licence and maturity | Interesting dual-PT2399 self/cross-feedback plan, but described as idea-stage and no reusable licence was verified |
| [Windfisch/analog-synth](https://github.com/Windfisch/analog-synth) | HOLD / unchanged prior lead | GPL discrete VCO/VCF/VCA with measurement tooling remains valuable; no material current revision crossed earlier incomplete-system evidence |
| [Ramon-Esteve/polyphonic-synth](https://github.com/Ramon-Esteve/polyphonic-synth) | HOLD / derivative and incomplete | MIT STM32 MIDI-CV and working VCO prototype, but VCF/VCA/polyphony remain unfinished and analog circuits derive from educational designs with separate terms |
| [Hackaday Polyphonic Analog Synthesiser](https://hackaday.io/project/205565-polyphonic-analog-synthesiser) | HOLD / WIP and licence | Deep transistor-level design log and LTspice files, but no explicit reusable hardware licence, complete editable board set or working instrument |
| [SiGNAL Modular Synthesizer](https://hackaday.io/project/203016-signal-modular-synthesizer) | HOLD / licence | SSI2131 VCO, diode VCF, PT2399 delay and built system are compelling, but only PDF circuits were verified and explicit reuse terms were not |
| [codeandrelax/PIC SimpleDigital](https://github.com/codeandrelax/PIC-SimpleDigital) | HOLD / physical evidence | MIT PIC/PT2399 digitally controlled effect with substantial board source; current build proof and quantitative characterization were not established |
| [FandSonthesizer/LongShot Delay](https://github.com/FandSonthesizer/LongShot-Delay) | HOLD / evidence | GPL PT2399 board surfaced through the topology lane; insufficient current primary build and measurement evidence |
| [kinoshita-lab/PT2399delay](https://github.com/kinoshita-lab/PT2399delay) | HOLD / evidence | Compact MIT board with editable source; no verified build package, calibration or performance evidence |
| [kanengomibako/ReincarnationChorus](https://github.com/kanengomibako/ReincarnationChorus) | HOLD / evidence | Unlicense PT2399 chorus is reusable in principle; build state and noise/bandwidth/modulation evidence were not verified |
| [rsholmes/pmf](https://gitlab.com/rsholmes/pmf) | HOLD / lineage and revision | Strong CEM3320 pole-mixing source and built v1; current revision remains unbuilt and upstream circuit-rights scope is unresolved |
| [afhinestrosa/ewi-analog-synth](https://github.com/afhinestrosa/ewi-analog-synth) | HOLD / physical evidence | MIT LM13700 breath-controlled source has KiCad, LTspice and fabrication artifacts but lacks assembled-build, calibration and measured audio/control proof |
| [F113X/2399-Digital-Delay-Line](https://github.com/F113X/2399-Digital-Delay-Line) | HOLD / licence | Public circuit source exists; explicit hardware licence and complete fabrication evidence remain unresolved |
| [gtfields13/PSX011_SSI2100_Demo_Board](https://github.com/gtfields13/PSX011_SSI2100_Demo_Board) | HOLD / licence and evidence | Modern SSI2100 BBD lead, but no reusable hardware licence, verified completed build or compressor/expander measurements |
| Rabid Audio Bass Chorus | DEAD SOURCE / HOLD | Primary page again returned HTTP 404; still lacks breadboard proof, final source, build and measurements |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned selected similarity anchor, not a discovery |
| SSI2100/2140/2160/2162/2164/2190, Coolaudio V3207/V3102 and TI LM13700 documents | FOUNDATION ONLY | Current primary component evidence informed lifecycle and risk assessment but does not establish open hardware |

## Discovery audit

### Coverage and stopping rule

- Profile: `weekly_deep`.
- Candidate pool: 21 plausible projects or manufacturer foundations; four ranked.
- Registry due pass: 113 pages across 59 domains; 58 of 59 due domains were outside GitHub (98%). Direct checks returned 106 HTTP 200 responses, two 403s, one 418, two 503s, one 402 and one 404.
- Required venues searched: GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SDIY/SynthDIY resources, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal engineering sites, project download/artifact pages and primary manufacturer resources. Codeberg and SourceHut search indexing was blocked by robots; the registry surfaces were still rechecked directly.
- Source classes: repository hosts, alternative forges, specialist forums, mailing-list archives, personal engineering blogs, project hubs, build logs, low-SEO board indexes, university/lab pages, self-hosted and legacy archives, certification records, manufacturer hubs, datasheets, application notes and evaluation boards.
- Query families: topology/component; artifact-led KiCad/BOM/Gerber/calibration; host-specific alternative forge/forum/university; lineage/backlink and board-index traversal; language/legacy; and current manufacturer/part-lifecycle queries.
- Search lanes included VCO/DCO/VCF/VCA/OTA, envelopes/LFO/noise/S&H/waveshapers/ring modulation, mixer/panner/compressor/preamp, PT2399/BBD/FV-1, modern SSI/AS/ALFA/Coolaudio ICs, and digitally assisted calibration/preset routing.
- Post-shortlist lane 1 independently checked current ALFA, Sound Semiconductor, Coolaudio and TI material. It confirmed AS3397 availability, current SSI2140/2164/2190 documentation, current V3207/V3102 documents and active LM13700 status, but produced no additional open-hardware promotion.
- Post-shortlist lane 2 independently searched GitLab, Codeberg, SourceHut, Hackaday.io, electro-music, DIYStompboxes and older PT2399/BBD archives. It produced HOLDs and registry additions but no fifth candidate matching the four ranked items’ total evidence.

The minimum domain, source-class, query-family and candidate-pool thresholds were exceeded. Both independent post-shortlist lanes then returned no additional serious promotion, satisfying the diminishing-return/access-failure stop rule.

### Due-source revalidation and status changes

All 113 due rows were set to `last_verified=2026-11-16` with page-specific results. Status changes:

- `electro-music.com/forum/`: `active` → `moved`; HTTP 200 now resolves at `electro-music.org/forum/`.
- SourceHut projects: `active` → `blocked_by_tool`; HTTP 418.
- YuSynth modular index: `static_archive` → `degraded`; HTTP 503.
- ElectroSmash Time Manipulator: `active` → `degraded`; HTTP 503.
- CircuitSnips: `active` → `degraded`; HTTP 402.
- Rabid Audio chorus page: `active` → `dead`; repeated HTTP 404.
- theotherson/chorale: `active` → `moved`; repository redirects to `theotherson/chompi-chorale`.
- DIYStompboxes remained `degraded` (403); FreeStompboxes remained `blocked_by_tool` (403). Other due rows retained their prior status.

### Registry additions

Six reusable page-level sources were added to `data/hidden-gems-source-registry.csv`:

1. Final PolyUAnalog peer-reviewed article and supplementary package.
2. HardLabs PT2399 open-board topology index.
3. HardLabs HackableDelay source-artifact page.
4. HardLabs Block-PT2399 source-artifact page.
5. HardLabs MusicBrain VCF8-kern source-artifact page.
6. Hackaday Polyphonic Analog Synthesiser transistor-level build log.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
PhysicsDptAngers/polyUAnalog,STRONG_PASS,2026-07-14,2026-11-16,2026-12-16,published,MIT AS3397 RP2040 polyphonic analog architecture with complete KiCad firmware Gerbers BOM UF2 supplementary raw data ten-voice build and measured PI tuning PWM control filter and latency behavior; independent noise crosstalk PWM-sideband rail-loading and VCF-slope verification remain
benjiaomodular/HackableDelay,PASS,2026-11-16,2026-11-16,2026-12-16,published,CC BY 4.0 photographed PT2399 piezo-preamp teaching delay with native KiCad BOM current Gerbers and panel graphics; no noise bandwidth headroom delay-range overload or input-transient measurements
MarkWestbroek/MusicBrain,REF_PASS,2026-11-16,2026-11-16,2026-12-16,published,MIT unbuilt eight-voice SSI2140 pole-mixing VCF8 card with AD5754 cutoff control four-layer KiCad BOM and fabrication outputs; bus validation build calibration and all electrical measurements remain
apaleslimghost/synths,REF_PASS,2026-11-16,2026-11-16,2026-12-16,published,CERN-OHL-S Dolphins triple-PT2399 Eurorack effect with native KiCad and panel source; no Gerber release build guide current physical proof calibration or measurements and artwork is CC BY-NC-SA
```

Equivalent selected-project and shared hard/soft anti-repeat rows were added. Ordinary republication is blocked through 2026-12-16 absent a material revision.

## Next-run search debt

1. Recheck MusicBrain VCF8 only after PCB fabrication, bus validation and automated channel-matching/Bode results.
2. Recheck Dolphins only after a versioned fabrication package, verified build and clock-noise/bandwidth/feedback characterization.
3. Find a licensed built SSI2100 plus SSI2162 compressor/expander or BBD signal chain with editable EDA and measured tracking, clock leakage, SNR, attack/release and overload recovery.
4. Find a licensed SSI2190 or SSI2164 panner/mixer with DAC recall and measured noise, crosstalk, pan law, headroom and control feedthrough.
5. Revisit Hackaday’s transistor-level polyphonic project only after explicit hardware licensing and a working board or instrument.
6. Recover or replace the dead Rabid Audio chorus source; do not promote from cached schematics alone.
7. Independently reproduce PolyUAnalog PWM sidebands, VCF slope, inter-voice crosstalk, rail loading and multi-temperature calibration.

## Prompt improvement for next run

**What improved.** The run paired licence scope with current-revision physical evidence, preventing a rendered board, a fabricated older revision and a measured current revision from collapsing into the same “built” label. The final-article lane surfaced raw data and a candid VCF discrepancy that repository-only review had missed.

**What remained weak.** PT2399 indexes expose many well-licensed boards but rarely prove the current board was assembled or measured. Alternative-forge search remains uneven because Codeberg and SourceHut block automated indexing.

**Underused/noisy lanes.** University project pages are productive when final reports link source archives, but Hackaday and forum results frequently omit reusable licences. Board aggregators sometimes infer a BOM from the wrong path and must remain discovery metadata only.

**Proposed rule change.** Add `current_revision_evidence: measured_build | functional_build | fabricated_unassembled | source_only | unknown` beside physical evidence, measurement class and licence scope. This is a proposed scoring field, not a new hard gate.

**Regression test.** A source-only architecture with exceptional reuse value may still reach `REF_PASS`, while a photographed obsolete revision must not make an unbuilt current revision a `PASS`.

**Next-run prompt delta.** “Before scoring, bind licence scope, fabrication bundle, physical proof and measurements to the same named revision. Treat final papers and raw data as evidence upgrades, and aggregators only as discovery indexes.”

## Feedback / Tuning Questionnaire

Reply with codes such as `Q1=C Q2=A Q3=B`.

1. Next mix? A) reusable blocks; B) complete instruments; C) balanced.
2. Priority topology? A) VCO/VCF/VCA; B) BBD/PT2399/FV-1; C) mixers/preamps/compressors; D) drums/noise/waveshapers/ring mods.
3. Source-only current revision? A) `REF_PASS` allowed for exceptional architecture; B) HOLD until fabricated; C) require functional build.
4. Generic MIT/GPL hardware scope? A) allow `PASS` when clearly whole-project; B) cap at `REF_PASS`; C) require a hardware-specific licence.
5. Measurement priority? A) noise/THD/headroom; B) tracking/calibration/thermal; C) crosstalk/feedthrough/transients; D) equal weighting.
6. Digitally assisted analog priority? A) autotune/DAC trim; B) preset gain/routing; C) production-test fixtures; D) clock/bias control.
7. Source lane to expand? A) alternative forges; B) personal/self-hosted sites; C) forums/legacy archives; D) university/lab pages; E) manufacturer hubs.
8. Output depth? A) keep full engineering review; B) shorten ranks, preserve audit; C) expand schematics/calculation detail.
