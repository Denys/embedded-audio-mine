# Weekly Analog Audio Mine — 2026-10-26

## Previous questionnaire feedback applied

No explicit questionnaire answers were recorded after the previous analog digest. The stable ranking, licensing, physical-evidence, source-diversity, and anti-repeat rules therefore remained unchanged.

## Outcome

Four projects cleared the promotion gate. The top project is a material revision of a 2026-10-12 HOLD: its 2026-10-21 report adds prototype measurements, thermal evidence, revision notes, and a refreshed fabrication package. The other ranks are newly verified low-SEO projects. “Documented” below means present in the primary artifacts; “inference” is engineering judgment; “unresolved” marks assumptions that still need bench work.

| Rank | Project | Lane | Physical evidence | Measurement class | Principal limit |
|---:|---|---|---|---|---|
| 1 | [dmsd-lab/AMP8611](https://github.com/dmsd-lab/AMP8611) | **STRONG_PASS / material revision** | Assembled v1 prototype and completed amplifier photographs | Author bench electrical, clipping, burst-power, offset, and thermal observations | Released v2.x PCB is described as an optimized revision of the tested v1, not independently built and measured |
| 2 | [Richard Holmes Ringer](https://gitlab.com/rsholmes/ringer) | **PASS** | Assembled module photograph and demonstration video | Calibration procedure; no quantitative audio sweep | AD633 cost plus unmeasured offset, carrier rejection, feedthrough, noise, and overload behavior |
| 3 | [Richard Holmes Analog Output Audio Mixer](https://gitlab.com/rsholmes/audiomixer) | **PASS** | Assembled front/back photographs | Current draw only | No noise, headroom, clipping, crosstalk, frequency-response, or output-drive data |
| 4 | [heolfief/MiniMood](https://github.com/heolfief/minimood) | **REF_PASS** | None verified; repository says WIP | Circuit calculations and PSpice output, not a complete measured build | No completed build, calibration, native fabrication release, or integrated audio characterization |

The pinned b:art Dual SSI2130 VCO Core remained a selected similarity anchor only.

## 1. dmsd-lab/AMP8611 — STRONG_PASS / material revision

**Lane:** current licensed repository, low-SEO board index, and primary component documentation.

**Canonical source:** [AMP8611 repository](https://github.com/dmsd-lab/AMP8611); inspected head `f8f288b` dated 2026-10-21.

**Topology.** The system combines a two-input analog selector, PGA2311 digitally controlled stereo gain, STM32G070 user/control logic, an optional MCP4261/OPA1678 tone-control board, and two LM3886TF class-AB output stages. The selector uses 74HCT4052 devices with OPA1678 buffering in a series-shunt arrangement. Local LM317L/LM337L regulation supplies the preamp; the power stage uses a 2×20 VAC transformer for 4 Ω operation or 2×25 VAC for 8 Ω operation.

**Documented source, licence, and build facts.** The root declares CERN-OHL-S-2.0. Native KiCad schematic and PCB sources exist for the preamp, tone board, and amplifier; each board has BOM/placement/netlist exports and a fabrication ZIP. STM32 firmware is included as `FW.zip`. The 10-page 2026-10-21 report documents an assembled v1 prototype, photographs, startup procedure, measured channel output offsets of −1.2 mV and −2.0 mV, clipping captures, burst tests into 3.7 Ω, and a 30-minute high-density-music thermal test. The report states approximately 75 °C at the heatsink near the IC and 80 °C at the mounting screw at 25 °C ambient, and says the tested v1 met intended function. It explicitly calls released v2 a minor optimized revision. TI currently marks both [LM3886](https://www.ti.com/product/LM3886) and [PGA2311](https://www.ti.com/product/PGA2311) active.

**Electrical and calibration assessment.** The PGA2311 eliminates a mechanical stereo-pot tracking problem and provides deterministic 0.5 dB steps. The published 95 dB input-channel isolation, 10 Hz–350 kHz preamp bandwidth, 45 W/channel output, and 20 Hz–90 kHz system bandwidth are author specifications; only the report’s plotted tests and observations were inspected, not independently reproduced. The document’s warning to validate the optional speaker-protection circuit before fitting the amplifier IC is material. There is no user calibration beyond assembly checks and firmware step mapping.

**Layout, power, grounding, noise, and thermal risk — engineering inference.** This is the only ranked project carrying mains-derived high-power rails. Chassis earth, fuse selection, transformer primary insulation, connector touch safety, star-return strategy, speaker-return currents, and fault energy deserve a full safety review. The measured 80 °C mounting point leaves limited enclosure/ambient margin; v2 layout changes should be thermally revalidated at continuous power, reactive loads, and worst-case mains. Fast STM32/display edges near PGA2311 and high-impedance selector nodes create plausible control-feedthrough and ground-modulation paths. The report’s “subjectively quiet” observation is useful but is not an FFT noise floor, A-weighted SNR, THD+N sweep, IMD, or crosstalk measurement.

**Parts availability and assembly burden.** The active LM3886 and PGA2311 reduce lifecycle risk, and the report provides substitutions for OPA1678, CD74HCT4052, regulators, logic, and bulk capacitors. Assembly is nevertheless high burden: mains wiring, large transformer and heatsinks, three PCBs, high-current speaker wiring, firmware programming, and safe enclosure work. This is not an entry-level build.

**Adaptation ideas.** Reuse the PGA2311/selector preamp as a standalone preset-capable analog front end; add relay mute and fault telemetry around volume/input changes; expose a MIDI or USB preset protocol; and create an automated fixture for gain-step accuracy, selector isolation, output offset, noise, THD+N, IMD, clipping recovery, and thermal derating. Preserve the analog path while using the MCU for calibration logs and protection-state capture.

**Unresolved assumptions and caveats.** The released v2.x hardware has not been shown as a fully assembled, measured unit. Source-to-fabrication netlists were not independently compared. Safety compliance, reactive-load stability, protection-trip behavior, turn-on/off transients, and long-duration thermal margin remain unresolved.

**Primary sources:** [repository](https://github.com/dmsd-lab/AMP8611), [source-artifact index](https://www.hardlabs.io/boards/dmsd-lab--amp8611--pga2311-3), [LM3886](https://www.ti.com/product/LM3886), [PGA2311](https://www.ti.com/product/PGA2311).

## 2. Richard Holmes Ringer — PASS

**Lane:** GitLab alternative forge plus personal engineering documentation.

**Canonical source:** [rsholmes/ringer](https://gitlab.com/rsholmes/ringer); inspected head `8a5caac` dated 2024-02-03.

**Topology.** Ringer uses an AD633 precision four-quadrant multiplier with three DC-coupled inputs. It implements `2×b×A×B/10 + c×C`, where the B and C paths have bipolar attenuverters. Depending on patching it operates as an audio ring modulator/multiplier, a CV-controlled amplifier, or a two-channel attenuverting mixer. A TL074 buffers and sums signals, an LM4040-5 provides the normalled 5 V reference, and two trimmers null A/B offsets. The module runs on ±12 V and documents 24 mA on +12 V and 16 mA on −12 V.

**Documented source, licence, and build facts.** The project is CC0-1.0. It includes native KiCad schematic/PCB/panel source, schematic and layout PDFs, a full BOM, main-board and panel Gerbers/drill files, LTspice simulations, build notes, offset calibration, a photographed assembled module, and a demonstration video. The first-run silkscreen omissions are documented and corrected in current source. Analog Devices marks the [AD633](https://www.analog.com/en/products/ad633.html) in production and documents 4-quadrant operation, typical output-referred noise below 100 µV RMS over 10 Hz–10 kHz, 1 MHz bandwidth, and ±8 V to ±18 V supplies.

**Electrical and calibration assessment.** The provided procedure nulls A and B path offsets against 0 V and 5 V inputs. Normalled 5 V inputs make the module immediately useful as a VCA/attenuverter, while ±8 V is identified as the approximate accurate input range. The AD633’s nominal 10 V scale and the external factor-of-two stage recover unity-like gain for ±5 V synth signals. Documentation is unusually clear about signal math and calibration, but it does not report measured carrier suppression, residual DC, gain error, bandwidth, or noise for the finished module.

**Layout, power, grounding, noise, and thermal risk — engineering inference.** Multiplier carrier feedthrough and DC offsets will be sensitive to op-amp offset, pot centering, grounding, input source impedance, and calibration temperature. The AD633 is robust but expensive, so the input buffer and 1 kΩ protection choices are sensible. Route A/B symmetrically, keep the 5 V reference and trimmer returns quiet, and avoid panel-ground currents through multiplier reference nodes. Thermal dissipation is modest; drift and feedthrough matter more than heat.

**Parts availability and assembly burden.** AD633, TL074, and LM4040 remain active, but the AD633 dominates cost. Through-hole parts and two-layer Gerbers keep assembly moderate. Calibration requires a stable 5 V/DC or square-wave source and a DMM or scope.

**Adaptation ideas.** Add relay or analog-switch range selection; expose a fine digital offset trim using a low-noise DAC and store calibration coefficients; characterize carrier suppression versus frequency and temperature; or duplicate the multiplier for true stereo/vector amplitude modulation.

**Unresolved assumptions and caveats.** No production run, independent build, analyzer measurements, or environmental drift data were found. CC0 covers the authored repository; the documentation’s inspiration links are functional/design context and should remain attributed.

**Primary sources:** [GitLab repository](https://gitlab.com/rsholmes/ringer), [engineering article](https://www.richholmes.xyz/analogoutput/2024-01-08_ringer/), [AD633 product page](https://www.analog.com/en/products/ad633.html).

## 3. Richard Holmes Analog Output Audio Mixer — PASS

**Lane:** GitLab alternative forge.

**Canonical source:** [rsholmes/audiomixer](https://gitlab.com/rsholmes/audiomixer); inspected head `70de333` dated 2024-02-02.

**Topology.** A TL072 implements a three-input inverting summing mixer followed by a master level/output stage and two identical outputs. Each input uses a panel slide attenuator. The circuit is powered from ±12 V and is documented at 4 mA per rail. The audio paths are DC-coupled, making the circuit potentially useful for both audio and sufficiently slow control signals, subject to offset/headroom verification.

**Documented source, licence, and build facts.** The project is CC0-1.0. Native KiCad schematic, PCB, and panel source are present, along with BOM, schematic/layout PDFs, two board-revision Gerber sets, FR-4 and aluminium panel fabrication files, a gerber-generation script, mechanical build notes, and completed-module photographs. The build notes specify pot/jack alignment and the panel/board spacer stack. TI marks [TL072](https://www.ti.com/product/TL072) active and offers the newer pin-compatible TL072H family.

**Electrical and calibration assessment.** No calibration is required. The simple passive input attenuation plus op-amp summing architecture is easy to audit and modify. However, the documentation does not state nominal input impedance, maximum clean input/output level, sum-bus gain, output impedance, capacitive-load stability, or DC offset. Current draw is the only numerical bench result.

**Layout, power, grounding, noise, and thermal risk — engineering inference.** Three long panel controls and two stacked PCBs make jack/pot ground routing, shield reference, and channel coupling more important than the low component count suggests. The TL072 is comfortable on ±12 V but is not rail-to-rail; simultaneous hot inputs can clip the sum even when each input alone is clean. Output duplication should be checked for load interaction and cable capacitance. Thermal risk is negligible; hiss, hum, crosstalk, and overload recovery are the meaningful unknowns.

**Parts availability and assembly burden.** The TL072 and passives are commodity parts. The two-board/panel mechanical stack and slide-pot sourcing are the main burdens; otherwise the design is approachable through-hole construction.

**Adaptation ideas.** Convert one output to a cue/headphone driver, add per-channel AC/DC coupling selection, use an SSI2164 or SSI2190 front end for CV/preset-controlled levels, and publish swept gain/headroom/noise/crosstalk results. A small MCU can recall analog levels without entering the audio path if VCAs are added.

**Unresolved assumptions and caveats.** No independent build, quantitative performance data, or input-overvoltage protection was verified. “DC-coupled” is an inference from the inspected schematic, not a stated precision-CV specification.

**Primary sources:** [GitLab repository](https://gitlab.com/rsholmes/audiomixer), [TL072 product page](https://www.ti.com/product/TL072).

## 4. heolfief/MiniMood — REF_PASS

**Lane:** university project repository plus low-SEO source-artifact mirror.

**Canonical source:** [heolfief/minimood](https://github.com/heolfief/minimood); inspected head `57c695c` dated 2020-10-08.

**Topology.** MiniMood is an STM32F446 mixed-signal instrument. Firmware generates three polyphonic digital voices at 12 bits/44.1 kHz, with USB-device/host MIDI and DIN MIDI. The output then passes through an MCP6002-based analog low-pass VCF, an RC4558 Tube-Screamer-style diode-clipping/tone stage, and an LM4808 stereo headphone amplifier. Two OLEDs, buttons, and potentiometers provide the interface; an LFO can modulate the analog filter.

**Documented source, licence, and build facts.** The root README points to GPL-3.0 for the whole project. Hierarchical KiCad source includes main, MCU, MIDI, power, VCF/effects, HMI, and headphone sheets plus a routed PCB and mechanical models. PSpice projects and results exist for the VCF and distortion. Firmware and the STM32CubeIDE project are public. BoardRepo exposes generated fabrication, BOM, and 3D views, but the canonical repository does not carry a native Gerber release. The README explicitly says “WORK IN PROGRESS”; no completed assembled unit or measured system was verified. TI currently marks [LM4808](https://www.ti.com/product/LM4808) active.

**Electrical and calibration assessment.** The headphone sheet includes output-power calculations and recognizes the LM4808’s useful distortion/power limit. The analog VCF and clipping stage are single-supply circuits around a bias reference, so bias stability, DAC common-mode level, coupling, and filter-control range need integrated testing. There is no calibration or measurement procedure for cutoff response, distortion transfer, DAC images, output power, channel match, or MIDI/control latency.

**Layout, power, grounding, noise, and thermal risk — engineering inference.** USB host/device traffic, OLED updates, STM32 clock edges, a low-resolution DAC path, high-gain clipping, and headphone return current share one compact board. Partitioning digital return, analog bias, headphone ground, and filter-control routing is the critical risk. The headphone stage’s theoretical power calculation does not prove thermal, clipping, or load stability across real headphones. The project’s age also raises toolchain/library migration effort.

**Parts availability and assembly burden.** STM32F446, MCP6002, RC4558, and LM4808 are mainstream families, but the dense STM32/QFP and surface-mount board is a higher-burden assembly than the two analog modules above. OLED/module mechanics and legacy KiCad/STM32CubeIDE migration add work.

**Adaptation ideas.** Use the analog VCF/distortion/headphone chain as a digitally generated oscillator test bed; add DAC-controlled filter calibration, per-unit cutoff mapping, saved presets, and separate analog/digital ground-current measurement points. Upgrade the DAC resolution while retaining the analog downstream path.

**Unresolved assumptions and caveats.** The repository name/spec calls the instrument mixed digital/analog, but physical build evidence, full BOM ownership, current fabrication files, acoustic performance, and end-to-end validation remain absent. GPL scope is declared for the project, but a hardware-specific licence is not used; this is why the item is `REF_PASS` rather than `PASS`.

**Primary sources:** [repository](https://github.com/heolfief/minimood), [BoardRepo artifact view](https://boardrepo.com/heolfief/minimood), [LM4808 product page](https://www.ti.com/product/LM4808).

## HOLD, rejected, duplicate, and foundation pool

| Candidate | Disposition | Reason |
|---|---|---|
| [rsholmes/pmf](https://gitlab.com/rsholmes/pmf) | HOLD / lineage and revision | Excellent pole-mixing CEM3320 VCF source, calibration, tolerance analysis, Gerbers, and built v1; current revisions/daughterboard are unbuilt and upstream Electric Druid circuit-rights scope needs a cleaner audit |
| [rsholmes/arpenvfol](https://gitlab.com/rsholmes/arpenvfol) | HOLD / derivative lineage | Built, documented ARP-derived envelope follower and preamps, but the exact reuse permissions across ARP, CGS, and cited preamp sources were not resolved |
| [afhinestrosa/ewi-analog-synth](https://github.com/afhinestrosa/ewi-analog-synth) | HOLD / physical evidence | MIT LM13700 breath-controlled oscillator/timbre source with KiCad, LTspice, BOM, placement, and Gerbers; no assembled build, calibration, or quantitative audio evidence found |
| [michi71/PicoVintageSynthCollection](https://github.com/Michi71/PicoVintageSynthCollection) | HOLD / analog relevance | Exceptional GPL RP2350/PCM5102 source and built 10 HP hardware, but the analog contribution is codec/module interfacing rather than an analog signal-processing design |
| [OpenMic PL000029](https://certification.oshwa.org/pl000029.html) | HOLD / source completeness | OSHWA-certified CC BY-SA USB microphone dated 2026-10-03, but the linked page did not expose editable circuit/fabrication source or useful electrical/acoustic characterization |
| [diysynth/EURORACK-MODULES](https://github.com/diysynth/EURORACK-MODULES) | HOLD / unchanged | Broad CC BY-SA collection with schematics, BOMs, Gerbers, photographs, and demos; module-level formats, editable-source availability, and measurement completeness still vary and no material revision followed earlier HOLDs |
| [Nick Jeglin LM13700 VCA](https://www.hardlabs.io/boards/nickajeglin--eurorack-pcbs--vca) | REJECT / no licence | KiCad and BOM are public and a build photo exists, but the canonical repository has no reusable licence |
| [Len42 SSI2164 4×VCA](https://www.hardlabs.io/boards/len42--synth--vca-4) | REJECT / no licence | Strong topology and editable source, but HardLabs confirms the repository has no licence |
| [OSHWLab OTA State Variable Filter](https://oshwlab.com/ashok.fernandez/ota-state-variable-filter) | HOLD / platform licence and evidence | Public LM13700 schematic is a useful lead; explicit reusable hardware terms, completed-build proof, and measurements were not independently established |
| [OSHWLab Origami](https://oshwlab.com/estorm/origami) | HOLD / noncommercial and evidence | Interesting mostly analog modulation/wavefolding synth, but platform terms prohibit commercial use and physical/measurement evidence is weak |
| [OSHWLab Auto Wah](https://oshwlab.com/vibratollc/Auto-Wah) | HOLD / platform licence and evidence | LM13700 envelope-controlled filter lead; no independently verified explicit licence file, build package, or measured response |
| [Darśana 64-knob Pico 2 synth](https://hackaday.io/project/204220-64-knob-virtual-analog-synth-on-pico-2) | HOLD / licence and analog relevance | Built mixed-signal control/DAC hardware with candid output-noise note, but primary reusable licence and full editable board source were not verified; signal processing is virtual analog |
| [Spark Lab](https://spark-lab.net/) | HOLD / moved or incomplete | Homepage claims CERN-OHL-S KiCad audio hardware, but the current projects page and linked repository path returned 404 |
| [AMP8611 prior HOLD](https://github.com/dmsd-lab/AMP8611) | MATERIAL REVISION | Superseded by rank 1: 2026-10-13 through 2026-10-21 source/test updates crossed the build-and-measurement threshold |
| Windfisch analog-synth, JordanAceto VCF plug-ins, Pandore, Castor & Pollux, zoxnoxious, MiniVCA, and other tracked ranks | DUPLICATE | Already published; no separate material revision justified ordinary republication |
| THAT 300/320/340, TI LM13700, SSI21xx application notes and evaluation boards | FOUNDATION ONLY | Primary component and lifecycle evidence informed engineering assessment but does not establish open hardware |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned selected similarity anchor, not a discovery |

## Discovery audit

### Coverage and stopping rule

- Profile: `weekly_deep`.
- Candidate pool: 22 plausible projects or foundations; four ranked.
- Due-source pass: 86 pages across 54 distinct domains. Fifty-three of those 54 domains (98%) were outside GitHub; broader discovery added HardLabs, PCBKit, OSHWA, BoardRepo, GitLab project pages, Hackaday.io, OSHWLab, manufacturer sites, and personal engineering pages.
- Required venues searched: GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SDIY/SynthDIY resources, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal engineering sites, self-hosted pages, project mirrors, and primary manufacturer resources. Codeberg and SourceHut search-engine queries were blocked by robots during the independent post-shortlist lane; their current hub status was still tested directly.
- Source classes: specialist forums, forum sections, repository hosts, alternative forges, personal engineering blogs, personal project pages, project hubs/mirrors, link directories, certification pages, manufacturer/document hubs, application notes, evaluation boards, university projects, vendor/community build pages, and legacy archives.
- Query families: modern SSI/AS/ALFA/Coolaudio ICs; LM13700/OTA/VCA/VCF; PT2399/BBD/FV-1 delay and modulation; mixer/panner/preamp/compressor; VCO/DCO/envelope/LFO/noise/S&H/waveshaper/ring mod; digitally controlled analog gain/routing/calibration; licence/artifact-led KiCad/BOM/Gerber queries; and alternative-forge/personal/university/legacy searches.
- Post-shortlist lane 1 independently checked current Sound Semiconductor, THAT, TI, ADI, ALFA, and Coolaudio material. It confirmed current LM3886/PGA2311/AD633/TL07x/LM4040/LM4808 status and the THAT-array lifecycle problem, but produced no additional open-hardware promotion.
- Post-shortlist lane 2 independently searched SourceHut, Codeberg, GitLab, OSHWLab, BoardRepo, PCBKit, personal pages, and university/project artifacts. It produced registry additions and HOLDs but no fifth project matching the top four’s total evidence.

The minimum domain, source-class, query-family, and candidate-pool thresholds were exceeded. Both independent post-shortlist lanes then returned no additional serious promotion, satisfying the diminishing-return/access-failure stop rule.

### Due-source revalidation

Eighty-six due pages were set to `last_verified=2026-10-26`. Eighty-three returned HTTP 200 directly. SourceHut recovered from `blocked_by_tool` to `active`. Codeberg’s explorer returned HTTP 421 and moved from `active` to `degraded`; current indexed leads remained available. DIYStompboxes returned HTTP 403 and remains `degraded`. FreeStompboxes returned HTTP 403 and remains `blocked_by_tool`. The other due pages retained their previous status.

### Registry additions

Nine reusable page-level sources were added to `data/hidden-gems-source-registry.csv`:

1. HardLabs AMP8611/PREAMP2311 source-artifact index.
2. GitLab Analog Output Audio Mixer project.
3. GitLab Ringer analog multiplier project.
4. BoardRepo MiniMood artifact mirror.
5. BoardRepo EWI analog-synth artifact mirror.
6. PCBKit board library/licence index.
7. OSHWA OpenMic certification page.
8. North Coast Synthesis THAT-array end-of-life notice, recovered from unmerged 2026-10-19 research history.
9. PCBWay Audio DIWHY vactrol envelope-follower page, recovered from unmerged 2026-10-19 research history.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
dmsd-lab/AMP8611,STRONG_PASS,2026-10-12,2026-10-26,2026-11-25,published,CERN-OHL-S digitally controlled PGA2311 preamp and LM3886 stereo amplifier with native KiCad BOM fabrication firmware assembled v1 prototype offset clipping burst-power and thermal evidence; released v2.x optimization still needs full build and measurement
rsholmes/ringer,PASS,2026-10-26,2026-10-26,2026-11-25,published,CC0 built AD633 four-quadrant multiplier ring-mod VCA and attenuverting mixer with KiCad Gerbers BOM panel simulations video and offset calibration; quantitative carrier rejection feedthrough noise gain and drift remain unmeasured
rsholmes/audiomixer,PASS,2026-10-26,2026-10-26,2026-11-25,published,CC0 built TL072 three-input dual-output analog mixer with editable KiCad BOM main and panel Gerbers mechanics and photographs; no noise headroom clipping crosstalk response or output-drive measurements
heolfief/minimood,REF_PASS,2026-10-26,2026-10-26,2026-11-25,published,GPL WIP STM32F446 mixed-signal synthesizer with hierarchical KiCad analog VCF RC4558 distortion LM4808 headphone output PSpice and firmware; no completed build native fabrication release calibration or integrated measurements
```

### `data/selected-projects.csv`

```csv
dmsd-lab/AMP8611,https://github.com/dmsd-lab/AMP8611,selected,digest_ranked,"Analog,Mixed-Signal,PGA2311,LM3886,STM32G070","preamp,power-amplifier,digital-volume,input-selector,tone-control,kicad,measurements,open-hardware",Rare source-complete amplifier system now joins digitally controlled analog gain with prototype electrical clipping power and thermal evidence,Reuse the preamp as a preset analog front end and add automated gain isolation THD IMD noise transient protection and thermal validation,verified,CERN-OHL-S-2.0; measured v1 prototype but released v2.x PCB still needs a complete build safety review and independent bench verification
rsholmes/ringer,https://gitlab.com/rsholmes/ringer,selected,digest_ranked,"Analog,Kosmo,AD633,TL074,LM4040","ring-mod,multiplier,vca,attenuverter,cv,kicad,gerbers,calibration,cc0",Built precision four-quadrant multiplier is a rare reusable analog audio and CV computation block with complete fabrication and calibration source,Add low-noise DAC offset trim stereo multiplication and measured carrier rejection feedthrough bandwidth noise gain error and drift,verified,CC0-1.0; AD633 cost dominates and quantitative finished-module measurements are absent
rsholmes/audiomixer,https://gitlab.com/rsholmes/audiomixer,selected,digest_ranked,"Analog,Kosmo,TL072","mixer,dual-output,slider,kicad,gerbers,panel,cc0",Complete built utility mixer offers a compact auditable source and mechanical baseline for analog summing experiments,Add AC/DC selection SSI2164 or SSI2190 preset control cue output and measured noise headroom clipping crosstalk response and load stability,verified,CC0-1.0; current draw is documented but quantitative audio performance and input protection are not
heolfief/minimood,https://github.com/heolfief/minimood,selected,digest_ranked,"STM32F446,Mixed-Signal,MCP6002,RC4558,LM4808","synth,analog-vcf,distortion,headphone,midi,kicad,firmware,gpl",University instrument source exposes a full digital-oscillator to analog-filter distortion and headphone chain suitable for calibration experiments,Add higher-resolution DAC quiet analog bias partitioning per-unit filter mapping preset calibration and full integrated noise distortion response and output-power tests,needs_build_verification,GPL-3.0 project; WIP with no completed build native Gerber release calibration procedure or system measurements
```

Equivalent hard and soft rows were added to `data/common-anti-repeat-index.csv`. Ordinary republication is blocked through 2026-11-25 absent another material revision.

## Next-run search debt

1. Find a licensed, built SSI2100 plus SSI2162 compressor/expander or BBD signal chain with editable EDA and measured tracking, clock leakage, SNR, attack/release, and overload recovery.
2. Find a licensed SSI2190 or SSI2164 panner/mixer with DAC recall and measurements for noise, crosstalk, pan law, headroom, and control feedthrough.
3. Recheck AMP8611 only after a complete v2.x build, protection/fault tests, and analyzer-grade THD+N/IMD/noise/crosstalk measurements.
4. Resolve rsholmes PMF and ARP-envelope-follower upstream circuit rights before promotion; do not infer that a root CC0 file clears every cited circuit.
5. Recheck EWI analog synth only after assembled-build, calibration, and acoustic/electrical evidence appears.
6. Find current open hardware using digitally measured or DAC-trimmed analog VCO/VCF calibration, with source code and temperature/tracking data.
7. Revisit Codeberg after HTTP 421 clears; keep SourceHut direct search active after this run’s recovery.

## Prompt improvement for next run

**What improved.** The physical-evidence and measurement classes prevented a photographed board, a measured v1 prototype, an unbuilt revision, and a simulation-only project from collapsing into the same “built” label. The material-revision gate correctly elevated AMP8611 only after dated evidence crossed the earlier HOLD threshold.

**What remained weak.** Alternative-forge search exposed many source-complete projects whose root licence does not clearly resolve upstream circuit lineage. Manufacturer searches improved risk assessment but still rarely lead to open hardware.

**Underused/noisy lanes.** SourceHut and Codeberg search-engine access failed despite direct hub tests; OSHWLab yields many platform-labelled “open source” projects without sufficiently explicit licence provenance or physical evidence. Search-engine results for “open source PCB” routinely overstate unlicensed public designs.

**Proposed rule change.** Add `licence_scope_class: hardware_specific | whole_project_generic | platform_only | absent` beside the existing physical and measurement classes. A generic GPL/MIT root may remain rankable as `REF_PASS` when it explicitly covers the project, but derivative circuits with unresolved upstream rights remain HOLD. This is a proposal, not a permanent hard rule.

**Regression test.** The new class must not hide useful GPL/MIT reference designs such as MiniMood, and it must not promote unlicensed designs merely because HardLabs or OSHWLab describes them as open source.

**Next-run prompt delta.** “For every serious candidate record physical-evidence class, measurement class, licence-scope class, and upstream-lineage status before scoring. Treat aggregator labels as discovery metadata only.”

## Feedback / Tuning Questionnaire

Reply with codes such as `Q1=C Q2=A Q3=B`.

1. Next mix? A) reusable blocks; B) complete instruments; C) balanced.
2. Priority topology? A) VCO/VCF/VCA; B) BBD/PT2399/FV-1; C) mixers/preamps/compressors; D) drums/noise/waveshapers/ring mods.
3. Generic GPL/MIT on hardware? A) allow `PASS` with clear whole-project scope; B) cap at `REF_PASS`; C) hardware-specific licences only.
4. Derivative circuit lineage? A) rank with explicit caveat; B) `REF_PASS` maximum; C) HOLD until upstream rights are resolved.
5. Minimum physical evidence for `PASS`? A) assembled and functional; B) bare PCB plus complete fabrication source; C) retain total-evidence scoring.
6. Measurement priority? A) noise/THD/headroom; B) tracking/calibration/thermal; C) crosstalk/feedthrough/transients; D) equal weighting.
7. Digitally assisted analog priority? A) autotune/DAC trim; B) preset gain/routing; C) production-test fixtures; D) BBD clock/bias control.
8. Source lane to expand? A) alternative forges; B) personal/self-hosted sites; C) forums/legacy archives; D) university/lab pages; E) manufacturer hubs.
