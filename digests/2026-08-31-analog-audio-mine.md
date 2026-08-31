# Weekly Analog Audio Mine — 2026-08-31

Profile: `weekly_deep`  
Operational authority: current repository rules and trackers  
Previous questionnaire feedback applied: no explicit questionnaire answers were recorded; the established weekly analog/mixed-signal scope was preserved without importing the daily standalone-device gates.

## Outcome

Four previously unpublished projects cleared the schematic, licensing, evidence, and 30-day anti-repeat gates. Two are unusually complete enough for `STRONG_PASS`; one is a fabrication-complete `PASS` with a known control-range issue; one is a useful `REF_PASS` whose latest revision still lacks a build. A May 2026 BBD compandor application note is recorded separately as a `FOUNDATION_UPDATE`, not as open hardware.

| Rank | Project | Lane | Why it matters |
|---:|---|---|---|
| 1 | [alanbog/3374-VCO](https://github.com/alanbog/3374-VCO) | `STRONG_PASS` | Rare, fully manufacturable dual CEM3374 replacement with explicit open-hardware licensing and comparative hardware tests |
| 2 | [ojg/thatmicpre](https://github.com/ojg/thatmicpre) | `STRONG_PASS` | Measured, multi-builder THAT1510/1512 microphone preamp with rack/desktop sources, panels, and fabrication files |
| 3 | [barnabywalters/Schraeg](https://github.com/barnabywalters/Schraeg) | `PASS` | V2164 multimode VCF with voltage-controlled resonance and FM, complete fabrication assets, and documented errata |
| 4 | [ThomHPL/Open80017a](https://github.com/ThomHPL/Open80017a) | `REF_PASS` | Licensed LM13700-based Roland 80017A VCF/VCA replacement; the tested v0.1 establishes feasibility, while current v0.2 remains unbuilt |

The pinned b:art Dual SSI2130 VCO Core remained a selected similarity anchor only and was not treated as a discovery.

## Ranked projects

### 1. alanbog/3374-VCO — `STRONG_PASS`

- Canonical source: [3374-VCO repository](https://github.com/alanbog/3374-VCO)
- Discovery lane: legacy-replacement lineage plus digitally calibrated analog oscillator search
- Reviewed revision: `c51ad49ca9e30f6f03a61f7abbc2d49ef34aee02` (2025-01-19)
- Topology: two temperature-compensated triangle-core VCO channels replacing one CEM3374; triangle and saw outputs on both channels; hard sync on channel A; DAC-driven frequency control and a temperature-compensation voltage intended for host calibration

#### Documented facts

- The repository contains hierarchical editable KiCad schematic and PCB sources, a bill of materials, Gerbers, drill data, pick-and-place/assembly outputs, a schematic PDF, final assembly instructions, a populated-board photograph, and a dedicated test report.
- The hardware source is licensed under CERN-OHL-P-2.0. This is explicit open-hardware evidence, not an inference from source visibility.
- The design replaces the obsolete dual CEM3374 used in the Fender Chroma Polaris and certain Oberheim instruments. It operates from +12 V and a -5 V or -6 V rail.
- The test report records operation in a Chroma Polaris running firmware revision 8. Frequency-versus-DAC behavior was compared with an original CEM3374 and accepted by the Polaris auto-calibration routine.
- At 20 °C the clone's temperature-compensation output was measured at about 2.30 V, versus about 2.47 V for the original part. The report states a target slope of approximately +3400 ppm/°C using a TMP6131 thermistor and matched dual transistors.
- One-hour measurements in the report show both original and replacement oscillators drifting slightly upward. For the clone, representative channel-A readings moved from 110.6 to 111.5 Hz, 442.4 to 444.7 Hz, and 1770 to 1779 Hz. The report suggests supply drift as a possible cause; it does not prove it.
- The report includes waveform captures from 27.5 Hz through 7.04 kHz. The replacement avoids the original part's negative saw spikes but produces a longer sync transient, reported at roughly 12 µs to about 8 V.
- Revision 1 corrects a low-note tuning problem relevant to Oberheim use, but the repository explicitly says the corrected board had not yet been tested in an Oberheim host.

#### Source completeness and license

`STRONG_PASS`: schematic, editable EDA, BOM, fabrication/assembly outputs, build evidence, comparative tests, and CERN-OHL-P-2.0 are all present. The most important remaining gap is independent or multi-host validation, not source completeness.

#### Electrical and calibration assessment

- The architecture is more than a pin adapter: it recreates the exponential conversion, integration/reset, waveform generation, temperature signal, and host-facing behavior with modern parts.
- Host auto-calibration materially reduces the burden of absolute transistor, capacitor, and DAC-transfer tolerances. It does not remove the need to verify temperature slope, supply sensitivity, or channel interaction.
- The longer sync transient is likely benign inside the original filtered signal path, as the report argues, but could become audible, alias-prone, or EMI-relevant if the raw node is repurposed or buffered differently.
- The report's drift data are useful but insufficient to separate supply drift, thermal settling, reference drift, and oscillator-core drift. A controlled temperature chamber sweep and simultaneous rail/reference logging are still needed.

#### Layout, power, grounding, noise, and thermal risks

- The matched transistor pairs and TMP6131 must experience a representative common temperature. Copper heating gradients, airflow, host-board heat, and assembly placement can bias the compensation voltage.
- DAC-reference and supply noise can become pitch modulation. Decoupling, reference-return routing, and separation from digital calibration traffic deserve oscilloscope and phase-noise checks.
- Compact mixed-signal switching around the DG4053E may inject charge into timing or sync nodes. The Vishay device is a current precision multiplexer family, but layout-specific coupling remains unmeasured.
- The board is a legacy-footprint replacement, so connector orientation, component height, airflow, clearance, and rail sequencing must be verified in each host.

#### Parts availability and assembly burden

- The design avoids the obsolete CEM3374 itself. Diodes Inc. still lists the intrinsically matched [DMMT3904W](https://www.diodes.com/part/view/DMMT3904W), and Vishay maintains the [DG4053E product family](https://www.vishay.com/en/product/69685/).
- Exact live stock was not exhaustively audited. The multi-package SMD build, matched-pair/thermistor thermal behavior, and legacy mechanical envelope make this an advanced assembly rather than a beginner module.

#### Adaptation ideas

1. Convert the replacement into a reusable dual voice-card core with a small MCU, precision DAC, per-channel temperature sensor, and stored calibration tables.
2. Add automated cold-to-hot sweeps, rail logging, and versioned calibration data with CRC and board serial binding.
3. Buffer and characterize the sync output for modern modular levels; provide a selectable pulse shaper if the host does not filter the transient.
4. Compare the core directly with SSI2130/SSI2131 approaches using the pinned b:art design and selected Len42 VCO-2131 as anchors.

#### Unresolved assumptions

- Oberheim compatibility of revision 1 is not yet demonstrated.
- The attribution of the observed long-term drift to supply movement is plausible but unproven.
- Production yield, oscillator-to-oscillator crosstalk, phase noise, and temperature extremes are not quantified.

### 2. ojg/thatmicpre — `STRONG_PASS`

- Canonical source: [ThatMicPre repository](https://github.com/ojg/thatmicpre)
- Corroboration: [DIYAudio design/build thread](https://www.diyaudio.com/community/threads/thatmicpre-an-open-source-mic-preamp.356317/)
- Reviewed revision: `c9735275db939b22bd7b8fc5899793add46f3683` (2024-11-06)
- Topology: THAT1510/THAT1512-family instrumentation microphone preamplifier with 12-position switched gain, 48 V phantom power, polarity inversion, and impedance-balanced output; desktop and rack variants are provided

#### Documented facts

- Editable KiCad projects are present for desktop and rack builds, with Gerber packages, interactive BOMs, assembly drawings, front-panel PCB/label sources, photographs, and third-party build evidence.
- The project is explicitly licensed CC BY-SA 4.0.
- The 12-position rotary switch selects nominal gain from 0 to 60 dB using precision resistor networks. The documentation allows THAT1510, THAT1512, SSM2019, or INA217-family front ends with performance differences.
- Published project specifications include approximately 10 Hz–100 kHz -3 dB bandwidth, +20 dBu maximum output at 0.1% THD at 1 kHz, THD+N below 0.005% at +18 dBu over a 20 Hz–20 kHz measurement bandwidth, and 48 V DC at up to 30 mA.
- The published 60 dB EIN results with a 150 Ω source are -128.3 dBu for THAT1510 and -128.6 dBu for THAT1512, unweighted over roughly 20 Hz–22 kHz. The repository also includes frequency-response, THD+N, noise, band-pass-noise, and CMRR plots.
- The output is impedance balanced rather than actively differential. Input protection includes series/phantom resistors, coupling capacitors, and clamp diodes; local analog rails are derived from the 48 V supply with zener regulation.
- THAT Corporation currently provides product and design documentation for the [THAT1510/1512 preamplifier family](https://thatcorp.com/that-1510-1512-low-noise-high-performance-audio-preamplifiers/).

#### Source completeness and license

`STRONG_PASS`: unusually complete editable sources, two mechanics/form-factor paths, fabrication files, panels, measurements, built examples, community corroboration, and an explicit share-alike license. No firmware is required.

#### Electrical and calibration assessment

- The switched resistor approach provides repeatable gain and removes potentiometer tracking uncertainty, but absolute gain and channel matching depend on resistor tolerance and switch/contact resistance.
- Phantom-power CMRR depends strongly on the matching of the two 6.8 kΩ feed resistors and on input-capacitor leakage. Those components should be matched and screened if the design is used in a production front end.
- The strong published audio measurements make this a better foundation than a schematic-only preamp. They do not substitute for IEC-style RF immunity, ESD, phantom hot-plug, short-circuit, reverse-polarity, and cable-discharge tests.
- The zener-derived local rails are economical. Their noise, temperature rise, dissipation, and interaction with phantom load should be measured on the actual enclosure and 48 V source.

#### Layout, power, grounding, noise, and thermal risks

- Chassis bond, XLR shell, circuit ground, and Pin 1 practice will decide real-world hum and RF behavior. The published “no measurable hum” result does not cover arbitrary rack wiring.
- Phantom switching can create large asymmetrical input transients if contacts or feed resistors do not track. A mute/relay sequence and hot-plug capture would improve robustness.
- Large bipolar input capacitors add leakage, tolerance, aging, and dielectric behavior. Their voltage rating and charge state matter during phantom faults.
- The high-gain front end should be kept away from switch LEDs, digital control, mains transformers, DC/DC converters, and display returns in any adaptation.

#### Parts availability and assembly burden

- THAT1510/1512 remain documented by the manufacturer. The alternative SSM2019/INA217 path reduces single-source dependency but must be measured separately rather than assumed equivalent.
- The through-hole implementation and comprehensive assembly aids are approachable, but the rotary switch, matched precision resistors, front-panel mechanics, 48 V safety margins, and low-noise grounding demand careful sourcing and test discipline.

#### Adaptation ideas

1. Add relay muting, phantom sequencing, and a digitally controlled gain stage for preset recall while preserving the analog signal path.
2. Use it as a calibrated balanced analog front end for an audio analyzer, field recorder, or high-dynamic-range codec board.
3. Replace the impedance-balanced output with a characterized active balanced driver where long cables and adverse common-mode conditions justify it.
4. Create a production test fixture for gain, EIN, CMRR, phantom current, hot-plug transient, and rail-current screening.

#### Unresolved assumptions

- The published measurements appear to be project-author measurements; calibration traceability and unit-to-unit distribution are not stated.
- RF immunity, ESD, phantom fault survival, and multi-chassis grounding behavior remain unverified.
- Community concerns are discovery signals, not established faults unless reproduced against the current revision.

### 3. barnabywalters/Schraeg — `PASS`

- Canonical source: [Schräg repository](https://github.com/barnabywalters/Schraeg)
- Reviewed revision: `96ba81135c3614d0b74c01cc8d4b7d3477593afd` (2022-01-21)
- Topology: V2164-based multimode filter derived with permission from Bastl Cinnamon; independent 2-pole low-pass and high-pass outputs, a 1-pole band-pass output, self-oscillation, voltage-controlled resonance, FM/fine tuning, and two character switches

#### Documented facts

- The repository contains editable KiCad schematic and PCB source, a schematic PDF, BOM CSV, Gerber/drill files, interactive BOM, SVG/DXF and KiCad panel graphics, simulations, finished-build photographs, and an external successful-builder report.
- The repository explicitly applies CC BY-SA 4.0 to the schematic, PCB, and graphics and documents permission from Bastl for the derivative.
- Two V2164 cells unused in the Cinnamon lineage are repurposed for voltage-controlled resonance and additional frequency modulation.
- The design runs from ±12 V and includes reverse-polarity protection, polyfuses, and LM4040-derived references. The frequency-control path includes a scale trimmer intended for approximately 1 V/octave behavior.
- The repository documents a corrected LM4040 symbol/trace error in v0.2.1; older boards require a physical bodge or angled installation.
- A builder reports that an attenuverter issue prevents the resonance CV input from reaching the full range and also limits FM depth. This is a known functional caveat, not merely an inference.

#### Source completeness and license

`PASS`: it is license-clear, buildable, fabrication-complete, and independently built. It does not reach `STRONG_PASS` because the known control-range defect remains and no quantitative noise, THD, cutoff tracking, control feedthrough, or temperature results were found.

#### Electrical and calibration assessment

- A 2164 cell is a strong fit for exponential control and resonance gain, but cell-to-cell control-law and temperature behavior still need characterization if precise 1 V/octave self-oscillation is expected.
- The character switches deliberately change nonlinear behavior. Maximum input and feedback levels should be mapped against clipping, oscillation start/stop hysteresis, and output DC offset.
- Sound Semiconductor describes the current [SSI2164](https://www.soundsemiconductor.com/downloads/ssi2164datasheet.pdf) as suitable for voltage-controlled filters, but substituting it for the board's V2164 should not be treated as transparent: biasing, control range, compensation, and Class-A/AB operating details require revalidation.

#### Layout, power, grounding, noise, and thermal risks

- Four TL074 packages plus the quad VCA, references, switches, jacks, and 0603 passives form a dense, one-sided hand-assembly build. Rework around the VCA and reference network can alter leakage and thermal gradients.
- FM and resonance CV paths adjacent to audio/integrator nodes can produce control feedthrough. Oscillation and high resonance also increase the risk of rail and reference coupling.
- Bridge-style input protection consumes headroom and changes return-current paths; confirm rails and reference voltages under reverse-power and hot-plug conditions.

#### Parts availability and assembly burden

- SSI2164 remains a current documented alternative family. The exact Coolaudio V2164 supply position was not independently confirmed during this run.
- SMD 0603 assembly, the dense rear layout, panel alignment, and known historical bodges raise the burden to intermediate/advanced despite comprehensive files.

#### Adaptation ideas

1. Correct the attenuverter range and quantify resonance-CV and FM depth before respinning.
2. Add DAC control for cutoff and resonance, then store per-unit scale/offset corrections for self-oscillation tracking.
3. Compare SSI2164 operating modes for noise/distortion versus current consumption and characterize control feedthrough.
4. Extract the spare-VCA voltage-controlled resonance technique as a reusable cell for multimode and state-variable filters.

#### Unresolved assumptions

- A present-day fabrication from the current repository state has not been independently verified in this run.
- SSI2164 drop-in behavior and the exact source status of V2164 are unresolved.
- Frequency tracking, resonance stability, and temperature behavior are undocumented.

### 4. ThomHPL/Open80017a — `REF_PASS`

- Canonical source: [Open80017a repository](https://github.com/ThomHPL/Open80017a)
- Lineage page: [80017A VCF/VCA teardown](https://obsoletetechnology.wordpress.com/projects/80017a-vcfvca-teardown/)
- Reviewed revision: `5561ee3ea8eaa6299c9ce0c79df4df43658f9efa` (2025-06-06)
- Topology: compact Roland 80017A replacement using LM13700 OTA stages, TL072 buffering/control functions, PMOS devices, and matched PNP control conversion; implements the legacy four-pole VCF and VCA interface

#### Documented facts

- The repository contains editable KiCad schematic and four-layer PCB files, rendered and PDF schematics, an interactive BOM, LTspice models/simulations, a changelog, and CERN-OHL-S-2.0.
- Version 0.1 was assembled and tested in a Juno-106. The author reports no audible difference from an original 80017A.
- The v0.1 PMOS buffer footprint was wrong and required a bodge. Version 0.2 corrects the footprints but is explicitly unbuilt and untested.
- The design uses three LM13700 packages, a TL072, four ZVP1320F PMOS devices, a matched PNP pair, and compact legacy-pinout mechanics.
- TI currently marks the [LM13700](https://www.ti.com/product/LM13700) active. Diodes Inc. lists the specified [ZVP1320F](https://www.diodes.com/part/view/ZVP1320F) as not recommended for new designs, creating a concrete sourcing risk.

#### Source completeness and license

`REF_PASS`: strong schematic/EDA/simulation/license evidence and a successfully tested earlier revision, but the current files lack a verified build and the repository does not include a ready Gerber manufacturing package or quantitative characterization.

#### Electrical and calibration assessment

- This is a repair-oriented legacy replacement, not a characterized general-purpose Eurorack filter. The host voice-calibration and signal levels matter.
- Audible equivalence in one Juno-106 is valuable feasibility evidence but does not quantify cutoff law, resonance, VCA bleed, DC offsets, channel matching, THD, noise, or temperature behavior.
- OTA transconductance spread and integrator-capacitor tolerance will affect cutoff and resonance. The matched control pair and local thermal layout may reduce error, but no chamber or multi-unit data were located.

#### Layout, power, grounding, noise, and thermal risks

- The compact four-layer legacy footprint concentrates OTA heat, control currents, audio nodes, and host returns. Ground-plane placement and thermal-via intent are visible design choices, not proof of stability.
- Substituting the NRND PMOS part can change capacitance, leakage, threshold, and buffer behavior. A replacement must be validated in the filter loop rather than only by DC pin equivalence.
- Socket/parasitic behavior and host-board contamination are material in Juno repair applications, especially for high-impedance filter nodes.

#### Parts availability and assembly burden

- LM13700 is active, and TL072/matched small-signal pairs are broadly available. ZVP1320F is NRND and is the clearest lifecycle concern.
- The miniature four-layer board, dense SMD placement, legacy pins, and required host A/B testing make assembly advanced. Generate and inspect a controlled fabrication release before ordering v0.2.

#### Adaptation ideas

1. Build a v0.2 validation fixture that sweeps cutoff CV, resonance, input level, and VCA control against a known-good original hybrid.
2. Evaluate current-production PMOS substitutions with loop stability, leakage, and distortion measurements.
3. Add per-voice digitally stored cutoff/VCA offsets in a polyphonic retrofit controller.
4. Separate the four-pole OTA-C core from the legacy footprint for use as a modern voice-card filter, while retaining explicit calibration hooks.

#### Unresolved assumptions

- The corrected v0.2 is not yet build-proven.
- The Juno-106 listening result does not establish compatibility across all 80017A host instruments.
- Gerbers, production tolerances, and a quantitative acceptance test are absent.

## Foundation update

### Sound Semiconductor AN703 — `FOUNDATION_UPDATE`

- Primary source: [AN703: A High-Performance Compandor](https://www.soundsemiconductor.com/downloads/AN703.pdf), Rev. 1.0, May 2026
- Related part: [SSI2100 BBD data sheet](https://www.soundsemiconductor.com/downloads/ssi2100datasheet.pdf)
- Topology: feedback compressor plus feed-forward expander around the two cells of an SSI2162 exponential VCA, with TL072-class op amps, full-wave Schottky rectifiers, and peak-detector time constants; intended to surround an SSI2100 BBD and its filters

Documented facts: the note maps a nominal -80 to +20 dBu input range into approximately -64 to -14 dBu for a BBD, then expands it back; it gives complete schematics, design equations, transfer curves, a 5–10 ms attack estimate, an approximately 66 ms release for the shown 200 kΩ/330 nF network, and a gain trim for matching the complementary halves. It also plots the predicted/measured-system SNR benefit across BBD clock frequency.

Engineering inference: this is a timely foundation for modern BBD chorus/delay designs because the complementary exponential VCA cells permit better tailoring than legacy fixed-function compandors. Detector diode mismatch, VCA control offsets, op-amp headroom, and compressor/expander time-constant mismatch can cause breathing, level error, and distortion. BBD clock feedthrough and reconstruction/anti-alias filters remain system problems outside the compandor schematic.

Unresolved assumptions: the application note is copyrighted manufacturer documentation, not an open-hardware license; no editable PCB/BOM/fabrication package or independent build was located. It is therefore not ranked as an open-source project.

Recommended adaptation: build a licensed original PCB around SSI2100 + SSI2162, isolate the BBD clock return, instrument the gain trim, and sweep noise, THD, overload recovery, tracking error, and clock frequency. Consider a small MCU only for calibration measurement and nonvolatile trim guidance; keep the audio path and gain cells analog.

### Secondary foundation watch: AN702

[AN702: A Flexible One-Knob Compressor](https://www.soundsemiconductor.com/downloads/AN702.pdf), also Rev. 1.0 May 2026, supplies a complete SSI2160 compressor schematic with component guidance for guitar/consumer, +4 dBu, Eurorack-like, ±12 V, and single-supply contexts. It remains a reference design rather than open hardware and was not separately promoted.

## HOLD, rejected, and duplicate pool

| Candidate | Disposition | Reason |
|---|---|---|
| [orange-dot/mamut-epm-hw-](https://github.com/orange-dot/mamut-epm-hw-) | HOLD | CERN-OHL-S and unusually deep ngspice/design notes, but explicitly a simulation/study platform; no completed audio PCB, build, or measurements |
| [StudioKAT/VintageDualVCA](https://github.com/StudioKAT/VintageDualVCA) | HOLD | Visible licensed schematic and manufactured module evidence, but no editable EDA, BOM, or fabrication source in the repository |
| [diysynth/EURORACK-MODULES](https://github.com/diysynth/EURORACK-MODULES) | HOLD | Broad CC-BY-SA collection with schematics, BOMs, photographs, and audio examples; much source is raster/PDF and artifact/license completeness varies by module |
| [carr-james/eurorack-blocks](https://github.com/carr-james/eurorack-blocks) | HOLD | Promising reusable KiCad/control infrastructure, but no explicit license was located and the current focus is mostly CV/gate/control rather than complete audio paths |
| [spirit532/studio_mic](https://github.com/spirit532/studio_mic) | HOLD | MIT KiCad microphone preamp and build evidence, but no comparable measurement set and less complete product evidence than ThatMicPre |
| [torigurafu/THAT1512-Mic-Pre](https://github.com/torigurafu/THAT1512-Mic-Pre) | HOLD | Unlicense and KiCad source found; test/build evidence and measurements are too thin for promotion |
| Polykit microphone preamp | HOLD | Useful project lead; exact hardware-license scope and primary manufacturing evidence remain unresolved |
| [TOILmodular/EurorackMultiStagePhaser](https://github.com/TOILmodular/EurorackMultiStagePhaser) | HOLD | Rich BOM/Gerber/build material, but GPL scope for hardware source and present revision validation need a dedicated lineage audit |
| [UNH µModules](https://scholars.unh.edu/honors/956/) | HOLD | Current 2026 university project with a CC-BY thesis, schematics, BOM/cost, and a built seven-module system; no separate editable EDA/fabrication bundle or explicit hardware-source license located |
| [jypma/modsynth](https://github.com/jypma/modsynth) | HOLD | Fabrication-rich analog module collection; explicit hardware license remains missing and it was already held on 2026-07-20 without material revision |
| Fihdi SVF12 and MiniDrumkit | DUPLICATE | Ranked on 2026-08-24; no material revision since that run |
| Fabric Astronaut Pathos Mixer | DUPLICATE | Ranked on 2026-08-24; no material revision |
| TouchTone555 | DUPLICATE | Ranked on 2026-08-24; no material revision |
| crowselectromusic/HEAR | HOLD | Licensed DC-coupled panning mixer, but current Gerbers remain explicitly untested |
| openaudiotools/mixtee | HOLD | Excellent CERN-OHL-P architecture; still explicitly pre-prototype |
| North Coast MSK 007 / MSK 009 | HOLD | Compelling filter circuits; exact individual source-package licenses remain unverified |
| brer-rabbit/zoxnoxious | REJECT | Inside the 30-day anti-repeat window and no material revision found |
| DIYSynthMNL 2164 Quad VCA | REJECT | Previously published; no material revision |
| bristol-communal-modular/dual-2164-vca | REJECT | Previously published; no material revision |
| craigyjp/AS2164-4P-filter | REJECT | Previously published; no material revision |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned selected similarity anchor, not a new discovery |

Candidate-pool size: 25 named projects/resources, with four ranked, two manufacturer notes, and 19 held/rejected/duplicate/anchor entries. Every ranked item was checked against `published-repo-log.csv`, `selected-projects.csv`, `common-anti-repeat-index.csv`, recent digests, and accessible weekly history; none of the four appeared in prior publication state.

## Hidden-gems discovery audit

### Start-of-run revalidation

- 38 dynamic registry pages were due and revalidated before ranking.
- No status changed.
- Degraded pages retained after fresh checks: Mod Wiggler returned HTTP 403; electro-music loaded only through stale/cached evidence; DIYStompboxes failed direct client access.
- Blocked pages retained: FreeStompboxes remained unavailable; Codeberg remained blocked by robots handling; SourceHut direct access failed.
- GitLab, Hackaday, LMNC, PedalPCB, Synth-DIY Central, self-hosted Gitea, and the remaining due project/repository hubs loaded sufficiently to retain their status.
- Sound Semiconductor and THAT manufacturer sources were also checked in the active component/reference lane, though their prior registry rows were not yet due under the 90-day static/reference interval.

### Coverage

- Profile: `weekly_deep`.
- Page-level surfaces inspected or revalidated this run: 48 across 38 distinct domains.
- Non-GitHub ratio by distinct domain: 37/38, or 97.4%. GitHub was still used for primary artifacts after off-platform discovery and query work.
- Source classes: repository hosts; alternative/self-hosted forges; specialist forums; mailing-list archives; personal engineering pages; project/build hubs; legacy/static archives; manufacturer application notes/datasheets; university repositories; curated link directories.
- Query families: topology/component; artifact/license-led; host-specific; forum-specific; manufacturer/application-note; lineage/backlink; university/academic; legacy terminology/download-page search.
- Priority terms exercised included VCO, CEM3374, SSI213x, V2164/SSI2164, LM13700, OTA-C, VCF/VCA, mic preamp, compressor/compandor, BBD/SSI2100, PT2399, calibration, Gerber, KiCad, BOM, and test report.
- Explicit platform checks included GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, Synth-DIY, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal sites, university pages, project hubs, and primary manufacturer resources.

### Independent post-shortlist lanes and stop rule

After the initial four-project shortlist, research continued through:

1. An alternative-forge/self-hosted lane covering GitLab, Codeberg, SourceHut, and Gitea. It produced no additional serious analog-audio candidate; Codeberg and SourceHut access limitations were recorded.
2. A forum/university/lineage lane covering specialist build threads, Synth-DIY archives, UNH's 2026 µModules thesis, and legacy replacement backlinks. It strengthened evidence for ThatMicPre and Open80017a but produced no fifth project that passed licensing and artifact gates.

These were two consecutive independent batches without a new promotable project, after the profile minimums had been exceeded, so the diminishing-return stop rule was met. The manufacturer lane did produce AN703, but it was deliberately classified as a foundation update because it lacks open-hardware licensing and a fabrication package.

## Registry additions and updates

Ten reusable page-level sources were added:

1. `https://github.com/alanbog/3374-VCO`
2. `https://github.com/ojg/thatmicpre`
3. `https://www.diyaudio.com/community/threads/thatmicpre-an-open-source-mic-preamp.356317/`
4. `https://obsoletetechnology.wordpress.com/projects/80017a-vcfvca-teardown/`
5. `https://github.com/ThomHPL/Open80017a`
6. `https://github.com/barnabywalters/Schraeg`
7. `https://www.soundsemiconductor.com/downloads/AN702.pdf`
8. `https://www.soundsemiconductor.com/downloads/AN703.pdf`
9. `https://thatcorp.com/design-notes/`
10. `https://scholars.unh.edu/honors/956/`

Exact descriptions, status, verification results, and caveats are stored in `data/hidden-gems-source-registry.csv`. The same file records all 38 due-page `last_verified`, `verification_result`, and note updates.

## Publication tracker rows

Rows applied to `data/published-repo-log.csv`:

```csv
alanbog/3374-VCO,STRONG_PASS,2026-08-31,2026-08-31,2026-09-30,published,CERN-OHL-P dual CEM3374 replacement with editable KiCad full manufacturing package host auto-calibration comparative test report and documented Oberheim-validation gap
ojg/thatmicpre,STRONG_PASS,2026-08-31,2026-08-31,2026-09-30,published,CC-BY-SA THAT1510/1512 microphone preamp with rack and desktop KiCad Gerbers panels measurements and multi-builder evidence; phantom and RF fault testing remain
barnabywalters/Schraeg,PASS,2026-08-31,2026-08-31,2026-09-30,published,CC-BY-SA V2164 multimode VCF with editable KiCad BOM Gerbers panel and build evidence; known attenuverter range issue and absent quantitative characterization
ThomHPL/Open80017a,REF_PASS,2026-08-31,2026-08-31,2026-09-30,published,CERN-OHL-S LM13700 Roland 80017A VCF/VCA replacement with simulations and tested v0.1; corrected v0.2 remains unbuilt and ZVP1320F is NRND
Sound Semiconductor/AN703,FOUNDATION_UPDATE,2026-08-31,2026-08-31,2026-09-30,published,May 2026 SSI2162 compandor reference for SSI2100 BBD systems with schematics equations and SNR guidance; copyrighted application note not open hardware
```

## Selected-project rows

Two exceptional similarity anchors were applied to `data/selected-projects.csv`:

```csv
alanbog/3374-VCO,https://github.com/alanbog/3374-VCO,selected,digest_ranked,"Analog,DAC-calibrated host","dual-vco,cem3374-replacement,tempco,matched-pairs,kicad,factory-test,cern-ohl",Rare complete modern dual-VCO replacement with host auto-calibration full manufacturing assets and comparative testing,Find digitally calibrated analog oscillator cores with per-unit trims temperature characterization automated sweeps and legacy-host compatibility,verified,CERN-OHL-P; Polaris-tested revision 1 but Oberheim validation and controlled temperature/supply attribution remain open
ojg/thatmicpre,https://github.com/ojg/thatmicpre,selected,digest_ranked,"Analog,THAT1510,THAT1512","mic-preamp,phantom-power,balanced-audio,measurements,kicad,open-hardware",Unusually complete and measured low-noise analog front end with multiple form factors panels manufacturing files and independent builds,Find precision analog audio front ends with switched or digital gain preset control protection tests calibrated measurements and production mechanics,verified,CC BY-SA 4.0; verify phantom hot-plug RF immunity chassis Pin-1 behavior and zener-rail noise before reuse
```

The common anti-repeat index was refreshed with hard publication rows for all five published entries and soft selected-reference rows for the two anchors.

## Next-run search debt

1. Find a fabricated SSI2100 + SSI2162 implementation of AN703 or an equivalent modern BBD compandor with editable PCB source and measured compressor/expander tracking.
2. Recheck Open80017a for a v0.2 build, Gerber release, PMOS substitution plan, and quantitative A/B sweep.
3. Recheck Schräg for an attenuverter correction or fork and for measured resonance-CV/FM range.
4. Search digitally assisted analog calibration outside GitHub: DAC trims, temperature sensors, auto-tune fixtures, per-voice NVM, routing/preset matrices, and factory-test data.
5. Revisit alternative-forge lanes when Codeberg/SourceHut access improves; use mirrors, feeds, and author pages without promoting from search snippets.
6. Mine university capstones for linked editable EDA and explicit hardware-source licensing, beginning with µModules rather than treating a thesis CC license as a hardware license.
7. Look for current-production substitutes and validated redesigns for ZVP1320F and older V2164/CEM/SSM/Coolaudio dependencies.

## Feedback questionnaire

1. Should legacy synth-repair replacements remain eligible for the main ranking when they are not generic modules?
2. Should measured microphone preamps and balanced line interfaces receive the same priority as synth voice circuits?
3. Should `FOUNDATION_UPDATE` manufacturer notes appear every week when genuinely new, or only when a buildable open implementation also exists?
4. Is `REF_PASS` the right lane for a tested earlier revision when the current PCB revision is explicitly unbuilt?
5. Should NRND support parts such as ZVP1320F be a hard HOLD, or remain a disclosed adaptation risk?
6. Would a compact matrix comparing license, EDA, fabrication, build, calibration, and measurements be more useful than the present per-project prose?
7. Should selected-project anchors be limited to one per run unless a project is exceptional across a different subsystem class?
8. Which next-run debt should lead: BBD/compandor hardware, digitally calibrated oscillators, or precision analog front ends?
