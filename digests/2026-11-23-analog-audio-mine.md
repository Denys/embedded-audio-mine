# Weekly Analog Audio Mine — 2026-11-23

## Result

Four projects cleared the promotion gates. `trope-oshw/anthracite` is the only `STRONG_PASS`: it joins a shipped product, complete manufacturing source, explicit hardware and firmware licensing, and unusually useful electrical measurements. The HAGIWO SSI2190 filter bank and eHandPan are `PASS` with material but bounded source or measurement gaps. The Super Synthesis library is retained as `REF_PASS`: it is a valuable CC0 circuit reference with current production continuity, but most production designs are not editable manufacturing packages.

The pinned b:art Dual SSI2130 VCO Core was used only as the selected similarity anchor. The 2026-11-16 PolyUAnalog, HackableDelay, MusicBrain VCF8 and Dolphins selections remained blocked by the 30-day rule; no material revision satisfying their recorded exception criteria was found.

## Ranked discoveries

### 1. trope-oshw/anthracite — STRONG_PASS

- **Lane / canonical source:** production open-hardware pedal; <https://github.com/trope-oshw/anthracite>; current source revision `31b4ebc` dated 2026-11-13, release v1.1.0 dated 2026-11-11.
- **Topology:** all-analog fuzz signal path with selectable approximately 13 kΩ, 24 kΩ and 44 kΩ input impedance at 1 kHz; relay/analog-switch bypass and routing under an STM32F030C8 MIDI-control board; bipolar switch rails; approximately 1 kΩ output impedance.
- **Documented source completeness and licence:** three native KiCad 10 board projects, self-contained libraries, schematic PDFs, BOM CSVs with manufacturer and LCSC references, fabrication/order files per release, enclosure STEP/DXF/PDF, panel source, firmware source/build path and a released firmware image with hash. Hardware and enclosure are CERN-OHL-S-2.0; firmware is GPL-3.0-or-later; documentation is under a CERN documentation licence and media/data are CC BY-SA. The `Anthracite` mark is excluded, but the project explicitly permits compatible commercial derivatives under another name.
- **Documented electrical evidence:** the manual reports bypass THD near 0.03% at 1 kHz and 1 Vpp, A-weighted residual noise no higher than 2.1 µV (about -111.3 dBu, including the measurement system), roughly 39–65 dB gain, input/output impedance, current consumption near 70 mA, and before/after switch-pop data. Revision 1.1 doubles the JFET gate resistors to 200 MΩ and reports a further 4.9–6.3 dB pop reduction. Shipped-product photographs and release artifacts establish `current_revision_evidence=measured_build`.
- **Engineering inference:** the 200 MΩ nodes make flux residue, board contamination, humidity, solder-mask surface resistance and JFET/diode leakage first-order production variables. Four-layer mixed analog/digital construction, MIDI edges, charge-pump or switched bipolar rails and relay/switch currents deserve conducted-noise and radiated-coupling tests beyond the published static noise result. Thermal drift and high-level intermodulation remain uncharacterized.
- **Parts and assembly:** the STM32F030C8 remains an active volume part with manufacturer longevity commitment into 2036. The multi-board four-layer stack, custom mechanics and fine-pitch digital assembly are moderate-to-high burden. Confirm the exact 2SK880/JFET source and approved substitutions before a build.
- **Adaptation value:** reuse the switch-pop measurement method, impedance selection and release engineering for a recallable preamp, compressor input or digitally routed analog pedal. Add environmental leakage coupons, high-level THD+N/IMD, power-supply rejection, MIDI burst coupling and temperature tests.
- **Unresolved assumptions:** the published measurements are author measurements, not independent certification; they do not establish EMC, safety, high-level distortion, all-temperature leakage or long-term relay/switch reliability.
- **Primary sources:** repository and releases; <https://docs.trope-oshw.org/Anthracite/Anthracite__v1.0__%E5%8F%96%E6%89%B1%E8%AA%AC%E6%98%8E%E6%9B%B8/>; <https://pcbkit.io/boards/github.com/trope-oshw/anthracite/>; <https://trope-oshw.org/blog/2026/10/07/anthracite/>; <https://www.st.com/en/microcontrollers-microprocessors/stm32f030c8.html>.

### 2. HAGIWO SSI2190 6-band Voltage Controlled Filter Bank — PASS

- **Lane / canonical source:** personal engineering page; <https://note.com/solder_state/n/ne96e9a88201c> (published 2026-05-17; demonstrated 2026-05-16).
- **Topology:** six parallel band-pass filters nominally centered at 60 Hz, 180 Hz, 540 Hz, 1.6 kHz, 4.8 kHz and 14.4 kHz with Q about 1.4. Their outputs feed the six channels of an SSI2190 voltage-controlled mixer; each band has a manual level and bipolar CV path. The 3U/8 HP module is approximately 20 mm deep and lists +12 V 35 mA / -12 V 30 mA consumption.
- **Documented source completeness and licence:** a 415 kB public schematic is explicitly released under CC0. The page includes assembly notes, photographs, a working video, power protection and operating limits. Gerbers/JLCPCB production data and BOM are Patreon-only, and no public editable circuit EDA was verified. `current_revision_evidence=functional_build`.
- **Documented electrical evidence:** the author specifies AC coupling, approximately 10 Vpp audio input, bipolar CV, 1% or tighter input pull-down resistors to control SSI2190 bias error, and a 10 kΩ shunt used to approximate a logarithmic response. The author warns that the 10 µF output capacitor thins bass into low-impedance loads and that the output is not for headphones.
- **Engineering inference:** calculate the output high-pass pole against the intended next-stage impedance and increase or buffer the coupling capacitor if the load can be low. SSOP SSI2190 assembly, six parallel filter paths, long control summing nodes and shared rails create gain-matching, feedthrough and crosstalk risks. The manufacturer’s typical noise/THD/feedthrough values describe the IC evaluation condition, not this built module.
- **Parts and assembly:** the SSI2190 is the specialized part; the author reports hand soldering it. Remaining parts are ordinary op amps, passives and Eurorack mechanics. Assembly is medium burden, but reproducing the exact board requires non-public fabrication material.
- **Adaptation value:** a strong seed for a digitally recalled formant bank, voltage-controlled graphic equalizer or spectral panner. Add a DAC per control, buffered DC-coupled or correctly dimensioned output, band calibration test points, mute sequencing and automated sweep/level matching.
- **Unresolved assumptions:** no measured band response, Q spread, summed headroom, noise, THD, CV law, control feedthrough, crosstalk, temperature behavior or overload recovery was found. Public reproducibility stops at the schematic.
- **Primary sources:** <https://note.com/solder_state/n/ne96e9a88201c>; <https://www.soundsemiconductor.com/downloads/ssi2190datasheet.pdf>; <https://www.soundsemiconductor.com/downloads/evb2190.pdf>.

### 3. dfourer/eHandPan — PASS

- **Lane / canonical source:** university/open-instrument mixed-signal hardware; <https://github.com/dfourer/eHandPan>; paper <https://arxiv.org/abs/2608.10185>.
- **Topology:** fourteen piezo playing surfaces are multiplexed through CD4067-class acquisition into an ESP32-S3. The instrument drives LEDs through 74HC595 devices and plays samples through a UDA1334A-class I²S DAC; MIDI and Wi-Fi are available. A separate Arduino variant is retained.
- **Documented source completeness and licence:** hardware is CERN-OHL-P-2.0, firmware MIT and documentation CC BY 4.0. The repository contains a public KiCad schematic, Gerbers and drills, firmware source and binaries, assembly documentation and physical construction files; a finished instrument, video, workshops and the paper supply build evidence. A `.kicad_pcb` editable board and standalone BOM were not found even though the paper describes editable PCB design. Sample-content rights are separate. `current_revision_evidence=measured_build`.
- **Documented electrical evidence:** the paper records raw piezo excursions up to roughly 17 V and a protection/attenuation network that keeps the observed ADC signal around 2.6 V. It compares sensing configurations and describes the scan/trigger pipeline. Informal loop/processing figures are not a controlled end-to-end latency measurement.
- **Engineering inference:** a 14:1 analog mux needs enough acquisition settling time for source impedance and ADC sample capacitance; channel charge injection and adjacent-pad mechanical coupling can cause false triggers. Piezo inputs require robust ESD, clamp-current and connector hot-plug validation. Wi-Fi, ESP32, LED and I²S currents share an enclosure with high-impedance sensing and audio output, so partitioning, return-current control and sampling during quiet windows matter.
- **Parts and assembly:** commodity ESP32-S3, CMOS mux/shift registers and an off-the-shelf I²S DAC reduce lifecycle risk. Fourteen sensors, a large mechanical shell, harness/DB25 wiring and calibration dominate the build. The assembly guide warns about connection order; treat the connector as non-hot-pluggable until proven otherwise.
- **Adaptation value:** reuse the protected piezo front end, per-pad calibration and open enclosure method for analog/digital drum modules. A Eurorack adaptation should add buffered per-channel acquisition, deterministic scan timing, radio-disable mode, supply/ground separation and open-licensed sample assets.
- **Unresolved assumptions:** no controlled system-latency distribution, false-trigger rate, adjacent-pad crosstalk, input-noise floor, ESD immunity, long-term sensor stability, audio THD/noise or independent reproduction was found.
- **Primary sources:** <https://github.com/dfourer/eHandPan>; <https://arxiv.org/abs/2608.10185>; repository assembly and fabrication artifacts.

### 4. Super Synthesis / Puget Audio analog library — REF_PASS

- **Lane / canonical source:** maintained production reference library; <https://github.com/supersynthesis/eurorack>; current support hub <https://puget.audio/support/>.
- **Topology:** the family includes an LM13700 two-input TVCA with deliberately accessible tanh distortion, an analog voltage-controlled attack/decay envelope with end-of-cycle output and approximately 0–6 V envelope, state-variable filters, VCAs, a scanner and utilities.
- **Documented source completeness and licence:** the repository is CC0. Production modules generally expose PDF schematics and editable Illustrator panel sources. Puget Audio currently offers kits/assembled modules and generated build guides/visual BOMs that reduce guide/source drift. Native DipTrace, BOM and Gerber material exists for some unreleased designs, but that does not establish the production modules as editable manufacturing packages. `current_revision_evidence=functional_build` for the family, with source-to-current-production correspondence unresolved.
- **Documented electrical evidence:** product pages and build guides establish the intended function and controls. No quantitative noise, THD, CV feedthrough, gain law, response, envelope timing tolerance or temperature data was found. Published TVCA current-draw figures conflict between retailers, so neither value is treated as authoritative.
- **Engineering inference:** the TVCA is useful precisely because OTA nonlinearity is exposed, but an adaptation needs input-level definition, control-current limiting, offset/feedthrough trimming and measured headroom. Envelope timing and EOC thresholds need characterization across capacitor leakage and transistor/op-amp spread. Do not infer that an old PDF exactly matches the board currently shipped by a successor manufacturer.
- **Parts and assembly:** LM13700 and common op amps/passives are broadly available. Kits reduce assembly uncertainty, but source-only fabrication from the public production folders is not supported because editable circuit EDA, Gerbers and machine-readable BOMs are generally absent.
- **Adaptation value:** a permissive reference source for VCA, envelope, filter and scanner topology selection. Re-enter only after checking the CC0 schematic against a purchased/current board, then publish clean-room editable EDA, a controlled BOM and bench data.
- **Unresolved assumptions:** exact current-production correspondence, board revisions, calibration, current draw and quantitative audio performance require direct confirmation.
- **Primary sources:** <https://github.com/supersynthesis/eurorack>; <https://puget.audio/support/>; <https://puget.audio/product/tvca/>; <https://puget.audio/product/eg/>; <https://www.signalfunctionset.com/product/sfs-tvca/>.

## HOLD, rejected and duplicate log

| Candidate | Outcome | Reason |
|---|---|---|
| Karolina Gontarek DIY Audio Compressor | HOLD | Built hardware, native KiCad, FreeCAD enclosure, plots, test points and candid wiring fixes are valuable, but no explicit reusable hardware licence was located. |
| `christosthp/Mono-TL072-Audio-Analog-VCA-Compressor` | HOLD | Schematic/PCB and lab results exist; no explicit hardware licence was verified. |
| `bosco-drg/Analog-Compressor-Pedal` | HOLD / repeat lead | No material resolution of the prior licence, calibration and transfer/noise/attack-release measurement blockers. |
| `gtfields13/PSX011_SSI2100_Demo_Board` and SSI2100 forum prototypes | HOLD | Working/reworked leads exist, but no explicit hardware licence or finished compressor/expander measurements; forum prototypes include an initial reversed-input error. |
| `vitoria-b/little-angel-chorus` | HOLD | Built KiCad/Gerber chorus lead; explicit licence and BBD circuit-lineage rights remain unresolved. |
| `diysynth/EURORACK-MODULES` | HOLD / unchanged | Licensed build artifacts exist, but source completeness, measurements and prior HOLD criteria did not materially change. |
| `bubbajfett/kicad-guitar-pedals` LM13700 DynaComp | HOLD | Schematic is marked unbuilt; upstream lineage and licence scope are unclear. |
| `rsholmes/vcapf` | HOLD | Useful GitLab LM13700 filter lead; current-revision build and quantitative evidence were insufficient for promotion. |
| `Pandore` | DUPLICATE | Already published 2026-07-05; no new physical bring-up or material hardware evidence. |
| zlosynth Kaseta | DUPLICATE | Already present in accessible weekly history; no qualifying material revision found. |
| SSI2190 EVB, SSI2100/SSI2162 notes and TI LM13700 applications | FOUNDATION ONLY | Primary manufacturer references, not independently licensed open hardware projects. |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned selected similarity anchor by instruction; not a new discovery. |

## Discovery audit — `weekly_deep`

- **Due source revalidation:** 96 registry pages met the 7/30/90-day cadence and were rechecked. Fifty-four due GitHub repository surfaces also passed `git ls-remote HEAD`. Status changes: Mod Wiggler `active → degraded`; Codeberg explorer `degraded → blocked_by_tool`; YuSynth `degraded → active`; CircuitSnips `degraded → active`. DIYStompboxes remained degraded, FreeStompboxes and SourceHut remained blocked, electro-music and the historical CHORALE URL remained moved, and intermittent project-level GitLab retrievals were marked degraded rather than dead.
- **Registry growth:** eight reusable page-level sources were added: Anthracite repository and engineering manual, HAGIWO SSI2190 article, Puget Audio support hub, Super Synthesis repository, eHandPan repository and paper, and Karolina Gontarek’s compressor page.
- **Distinct domains:** 37 searched; 31 (83.8%) were outside GitHub.
- **Source classes:** 13 — specialist forum, forum archive, personal engineering page, project hub, repository host, alternative forge, university paper/lab, manufacturer application note, datasheet/evaluation-board hub, fabrication index, support/build-guide hub, legacy archive and commercial/community project page.
- **Query families:** 8 — topology/component, exact-chip, artifact/licence, host-specific alternative-forge, forum/legacy, language/personal-site, backlink/lineage and manufacturer/lifecycle.
- **Candidate pool:** 22 distinct project or foundation leads were reviewed: Anthracite; HAGIWO SSI2190 bank; eHandPan; Super Synthesis production family; Super Synthesis unreleased EDA folders; Karolina compressor; christosthp compressor; bosco compressor; gtfields SSI2100 board; SSI2100 forum mini-board; Little Angel chorus; diysynth modules; bubbajfett DynaComp; rsholmes VCAPF; Pandore; Kaseta; DIYSynthMNL saturation; Shmoergh analog synth; `afhinestrosa/ewi-analog-synth`; SSI2190 EVB; SSI2100/SSI2162 manufacturer material; and TI LM13700 applications.
- **Required named surfaces:** GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SynthDIY/SDIY, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal sites, manufacturer hubs and GitHub were all searched or revalidated. Tool blocks are recorded in the registry rather than silently treated as empty results.
- **First additional lane — manufacturer/component:** Sound Semiconductor SSI2100, SSI2162 and SSI2190 resources, the SSI2190 EVB, TI LM13700 status and ST STM32F030 lifecycle were checked. This improved device-risk assessment but produced no fifth licensed project.
- **Second additional lane — alternative forge/forum/legacy:** GitLab LM13700 projects, forum SSI2100 prototypes, Codeberg/SourceHut indexed leads, DIYStompboxes/PedalPCB and legacy chorus/compressor paths were pursued. Only HOLDs resulted.
- **Stop rule:** after the four-item shortlist, two independent lanes and two further batches produced no new candidate that passed schematic, licence, build/source and anti-repeat gates. The run stopped on documented diminishing return, not on reaching four items.

## Exact tracker rows written

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status
trope-oshw/anthracite,STRONG_PASS,2026-11-23,2026-11-23,2026-12-23,published
HAGIWO/SSI2190-6Band-VC-Filter-Bank,PASS,2026-11-23,2026-11-23,2026-12-23,published
dfourer/eHandPan,PASS,2026-11-23,2026-11-23,2026-12-23,published
supersynthesis/eurorack,REF_PASS,2026-11-23,2026-11-23,2026-12-23,published
```

Four corresponding selected-project rows and eight common anti-repeat rows were added. The implemented `current_revision_evidence` values are `measured_build`, `functional_build`, `measured_build` and `functional_build`, respectively.

## Registry additions

```csv
url,domain,page_name,status
https://github.com/trope-oshw/anthracite,github.com,Anthracite open-source MIDI fuzz pedal,active
https://docs.trope-oshw.org/Anthracite/Anthracite__v1.0__%E5%8F%96%E6%89%B1%E8%AA%AC%E6%98%8E%E6%9B%B8/,docs.trope-oshw.org,Anthracite engineering manual,active
https://note.com/solder_state/n/ne96e9a88201c,note.com,HAGIWO SSI2190 six-band voltage-controlled filter bank,active
https://puget.audio/support/,puget.audio,Puget Audio build guides and source support,active
https://github.com/supersynthesis/eurorack,github.com,Super Synthesis CC0 Eurorack source library,active
https://github.com/dfourer/eHandPan,github.com,eHandPan open electronic handpan,active
https://arxiv.org/abs/2608.10185,arxiv.org,eHandPan research paper,active
https://caroleq.github.io/Compressor/,caroleq.github.io,Karolina Gontarek DIY audio compressor,active
```

## Next-run search debt

1. Find a fully public editable SSI2190 implementation with BOM, Gerbers and measured noise, THD, control feedthrough, headroom and CV law; HAGIWO remains blocked until these appear.
2. Find a licensed current compressor with editable EDA and measured threshold, ratio, knee, attack, release, noise and headroom; recheck the Karolina and christosthp projects only if explicit hardware licensing appears.
3. Continue university/lab, self-hosted Git and personal-site searches for digitally calibrated analog VCO/VCF hardware with DAC trim firmware, multi-temperature tracking data and fabrication files.
4. Verify whether the Super Synthesis PDF circuits exactly correspond to current Puget Audio boards and reconcile conflicting TVCA current-draw figures.
5. Seek an independent eHandPan build and quantify mux settling, adjacent-pad crosstalk, end-to-end latency, ESD behavior and radio/LED supply coupling.
6. Revisit the prior SSI2100, licensed BBD/compander, SSI2164/SSI2190 recallable mixer and Rabid Audio chorus debts only on material artifact or measurement changes.

## Feedback and rule-state review

No explicit `weekly_analog` questionnaire answers were present, so selection weights were not silently changed. The proposed `current_revision_evidence` field was retained and used: it separated measured current boards from functional-build and reference-only evidence without excluding exceptional reference architectures. No candidate hardware was fabricated and no author measurements were represented as independent measurements.
