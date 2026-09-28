# Weekly Analog Audio Mine — 2026-09-28

Profile: `weekly_deep`  
Operational authority: current repository rules, trackers, recent digests and accessible weekly history  
Previous questionnaire feedback applied: none.

## Outcome

Four projects cleared the public-circuit, explicit-license, primary-artifact and 30-day anti-repeat gates. The strongest result is a newly prototyped, code-generated phantom-powered condenser microphone. The remaining set adds a production semi-modular pocket synth, a fabricated Eurorack panning/headphone mixer and a rare CC0 dual-BBD flanger reference. The pinned b:art Dual SSI2130 VCO Core was used only as a selected similarity anchor.

| Rank | Project | Lane | Why it matters |
|---:|---|---|---|
| 1 | [koshizuow/open-condenser-mic](https://github.com/koshizuow/open-condenser-mic) | `STRONG_PASS` | CERN-OHL-P microphone source generates schematic, PCB, BOM/CPL and fabrication data from code and backs the design with SPICE, CI checks and a physical prototype |
| 2 | [poetaster/moat — Keep v4](https://github.com/poetaster/moat) | `PASS` | Production analog pocket synth with editable Fritzing, Gerbers, BOM, panel mechanics, build instructions, photographs and audio examples |
| 3 | [kraakenstuff/Hands-of-Svarog](https://github.com/kraakenstuff/Hands-of-Svarog) | `PASS` | Built MIT-licensed 6 HP four-input panning mixer and stereo headphone driver with editable KiCad, interactive BOM, panel and fabrication files |
| 4 | [low-poly-studio/flanger-build-docs](https://github.com/low-poly-studio/flanger-build-docs) | `REF_PASS` | CC0 dual-MN3207/3208 flanger with schematic, BOM, assembly, calibration and enclosure guidance; unusually useful BBD reference despite source-package gaps |

## Ranked projects

### 1. koshizuow/open-condenser-mic — `STRONG_PASS`

- Canonical source: [open-condenser-mic](https://github.com/koshizuow/open-condenser-mic)
- Discovery lane: current artifact-led microphone/preamp search plus personal-project backlinking
- Reviewed revision: `beacc0f`, 2026-09-23, which adds a new prototype photograph
- Topology: 48 V phantom input, CD40106B 100 kHz oscillator, three-stage active Dickson charge pump, approximately 68 V high-voltage rail, approximately 55 V capsule polarization, OPA1641 JFET-input amplifier, optional presence shelf and Neutrik NTE10/3 transformer-balanced output.

#### Documented facts

- The repository is explicitly CERN-OHL-P-2.0. Python generators are the preferred editable source for the KiCad project, schematic and two-layer 36 × 93 mm PCB; separate scripts generate default and high-gain/presence BOM and placement variants. CI is configured to generate fabrication artifacts and run net-consistency, ERC and DRC checks.
- A physical prototype and transformer-wiring photograph are published. The design documents approximately 2.4–3 mA phantom draw, a 67.3 V filtered high-voltage rail, approximately 55 V capsule polarization and two nominal gain configurations.
- Published performance plots are simulations, not bench measurements: charge-pump startup, behavioral frequency response and input-referred noise. The claimed high-voltage ripple is a calculation/simulation result rather than an analyzer capture.
- The default response model is within approximately ±1 dB from 200 Hz to 20 kHz. The optional 6.2 kΩ/12 nF network models a +2.6 dB shelf above roughly 2.1 kHz.
- Generated KiCad, BOM/CPL and Gerber outputs are not committed at the reviewed revision. Reproduction depends on Python, KiCad 9 and the documented CI/generation path.

#### Source completeness and license

`STRONG_PASS`, license status `verified_open_hardware`: explicit permissive hardware licensing, executable circuit/layout source, generation instructions, simulations, automated design checks and prototype evidence are present. The rank stops short of calling it production-characterized because committed release artifacts and real acoustic/electrical measurements are absent.

#### Engineering inference

- A 100 kHz charge pump inside a high-impedance condenser microphone is the central noise risk. The 1 MΩ/470 nF high-voltage filter gives large modeled attenuation, but electric-field coupling, diode current spikes and ground/chassis paths will not be captured fully by the simplified simulations.
- The 100 MΩ capsule-bias path makes leakage, flux residue, humidity and PCB cleanliness first-order production variables. Guarding and clean high-voltage spacing deserve physical testing.
- Transformer coupling solves output balance and isolation elegantly, but the reversed NTE10/3 winding choice changes output level and source impedance. Phantom asymmetry, cable capacitance and preamp loading should be swept.

#### Layout, power, grounding, noise, thermal and assembly risks

- Keep the oscillator/charge-pump loop compact and distant from the capsule node and op-amp input. Chassis bonding at the four grounded mounting pads must not create an uncontrolled XLR-pin-1 path.
- BZT52C68 clamp tolerance, capacitor leakage and diode reverse behavior affect polarization voltage and startup. The 68 V node requires cleaning and safe probing despite low current.
- OPA1641 is currently active, and Neutrik still lists the NTE10/3. The transformer and capsule are off-BOM customer items and dominate cost and mechanical variability. Mostly SMD assembly is moderate; transformer flying leads and high-impedance cleaning make final assembly more demanding than the board size suggests.

#### Adaptation ideas

1. Add a quiet MCU-free test fixture that records phantom current, polarization startup, output common-mode balance and clock spur level for every board.
2. Compare the transformer output against a modern electronically balanced driver while preserving the same capsule/front-end board.
3. Add guarded test points and a removable capsule interface so bias leakage, capsule capacitance and humidity can be characterized independently.
4. Publish generated release assets with hashes and measured sensitivity, self-noise, THD, maximum SPL, CMRR and RFI rejection.

#### Unresolved assumptions

- The photographed prototype was not independently correlated to a tagged release artifact or full measurement report.
- Capsule compatibility is described broadly, but diaphragm leakage, capacitance and polarization ratings vary materially.
- ERC/DRC CI success and exact generated manufacturing files were not independently reproduced in this run because KiCad 9 with `pcbnew` was not available in the research environment.

### 2. poetaster/moat — Keep v4 — `PASS`

- Canonical source: [poetaster/moat](https://github.com/poetaster/moat); [author's Keep page and audio](https://poetaster.org/keep/keep/)
- Discovery lane: personal engineering sites, commercial-open instrument pages and legacy analog IC searches
- Reviewed revision: `4081a45`, 2026-07-07
- Topology: CD40106 Schmitt-trigger audio/LFO oscillators, CD4040 ripple-counter sequencing, XR2206 function generator with FM/AM and sine-to-triangle shaping, simple filtering, LED/LDR vactrol control and patchable semi-modular routing.

#### Documented facts

- The repository carries GPL-3.0, editable Fritzing source, Gerbers and drill/placement files, panel SVG/Fritzing source, CSV/ODS BOM, build photographs, an ODT first-steps guide and audio examples.
- The README explicitly says Keep v4 is in production and warns not to use the older Moat files. It records historical physical builds and current kit sales.
- Keep v4 adds AM-input waveshaping, changes sequencer-mix order and exposes additional CD4040 divider outputs. The circuit is powered from a 9 V battery/single supply and uses DIY LED/LDR optocouplers.
- No quantitative oscillator range, output level/impedance, supply current, noise, distortion, crosstalk, control bleed, vactrol response or temperature data were found.

#### Source completeness and license

`PASS`, license status `verified_repository_license`: buildable design source, fabrication files, BOM, mechanics, instructions, physical production and GPL terms are present. GPL is not a purpose-built hardware licence, so redistribution should preserve the repository's source and notice terms and avoid assuming broader rights in named third-party inspirations.

#### Engineering inference

- The CD40106 oscillators and CD4040 divider will move with battery voltage, logic threshold and temperature. This suits the instrument's experimental character but is inappropriate for precision pitch without regulation and calibration.
- LED/LDR vactrols vary widely in resistance, memory and decay. Their mismatch will dominate AM/filter response and cross-unit consistency.
- The XR2206 is a legacy/discontinued original part with clone and counterfeit risk. Substitution can alter amplitude, distortion and control law enough to require a new calibration and possibly component changes.

#### Layout, power, grounding, noise, thermal and assembly risks

- The shared single-supply logic/audio return can carry oscillator and divider edges into the XR2206 and output. Decouple every CMOS package locally and separate LED current returns from small-signal ground.
- Fritzing is editable but less review-friendly than hierarchical KiCad for netlist auditing. Validate the v4 Gerbers against the intended Fritzing source before ordering.
- Assembly burden is medium-high: two boards/panel, many controls and headers, DIY vactrols and mechanical alignment. Thermal risk is low; battery droop and contact resistance are more relevant.

#### Adaptation ideas

1. Replace the XR2206 section with a characterized modern analog VCO/function-generator submodule while keeping the 40106/4040 modulation fabric.
2. Add regulated analog and logic rails, buffered modular-level I/O and current-limited patch points.
3. Use a small MCU only for vactrol characterization, calibration storage or digitally recalled patch switching; keep the audio generation analog.
4. Publish a v4 manufacturing manifest that separates current source files from deprecated Moat/Keep revisions.

#### Unresolved assumptions

- The GPL file does not explicitly enumerate hardware-document scope.
- The production claim and photos establish physical builds, but the exact pictured revision was not netlist-compared to every v4/v6 Gerber directory.
- XR2206 source quality and acceptable clone behavior are not documented.

### 3. kraakenstuff/Hands-of-Svarog — `PASS`

- Canonical source: [Hands-of-Svarog](https://github.com/kraakenstuff/Hands-of-Svarog)
- Discovery lane: under-indexed personal Eurorack repositories and mixer/panner searches
- Reviewed revision: `8ec319f`, 2021-04-04
- Topology: four attenuated inputs, two two-channel groups, one pan control per group, TL072 buffering/summing, separate NJM2068 left/right headphone-output stages, output coupling capacitors and ±12 V Eurorack power.

#### Documented facts

- The repository has an MIT license, editable KiCad schematic and PCB, an interactive HTML BOM, main-board and 6 HP panel Gerbers, artwork sources and a photograph of a finished module.
- The author identifies the J3RK forum panning/headphone circuit as the schematic basis, adds two inputs, substitutes NJM2068 for OPA2604 and changes output-stage 33 kΩ resistors to 12 kΩ for the available headphones.
- Input level controls are A100k; group pan controls are B10k. The output stages include 100 Ω series resistors, 220 µF coupling capacitors and small compensation capacitors.
- No current consumption, gain law, input/output impedance summary, maximum headphone load, output power, noise, crosstalk, pan law, bleed, thermal or stability measurements were found.

#### Source completeness and license

`PASS`, license status `verified_repository_license_with_lineage_caveat`: the repository's hardware documents are MIT-licensed and fabrication-complete with physical build evidence. The upstream J3RK forum circuit's licensing was not independently established, so commercial derivative work should resolve that lineage rather than relying solely on the repository notice.

#### Engineering inference

- Driving low-impedance headphones through NJM2068 stages and 100 Ω output resistors limits level and damping; the 12 kΩ feedback choice should not be treated as a universal headphone-load optimization.
- The 220 µF coupling capacitors set a load-dependent bass corner. Capacitance, ESR and polarity stress should be checked at startup and under asymmetric loads.
- Panning two summed groups instead of four independent channels is compact and musical, but it constrains spatial control. Pot-law mismatch and resistor tolerance will determine center gain and image stability.

#### Layout, power, grounding, noise, thermal and assembly risks

- Headphone return current must not share a narrow path with the input-jack or pan-reference ground. Measure crosstalk and ground modulation at maximum safe load.
- Schottky rail protection and local 100 nF/10 µF decoupling are present. The design lacks documented rail fusing/current limits and output short-circuit tests.
- TL072 remains easy to source. Nisshinbo lists NJM2068 but identifies the family as not recommended for new designs; qualify NJM8068 or another stable low-noise dual for a new revision. Through-hole controls plus modest SMD density make assembly moderate.

#### Adaptation ideas

1. Replace the passive group pan network with an SSI2164/SSI2190 equal-power panner and add digitally stored pan/mute states.
2. Separate line output from a current-capable headphone driver and publish load, temperature and short-circuit testing.
3. Add balanced or impedance-balanced line outputs, cue switching and a measured noise/crosstalk matrix.
4. Preserve the compact panel but expose group insert/send-return points for patchable feedback and effects.

#### Unresolved assumptions

- The photographed unit's exact fabrication revision and sustained headphone-load performance were not verified.
- The upstream forum schematic's rights and attribution requirements remain unresolved.
- The interactive BOM contains values and placements, but no supplier-qualified procurement list or substitution guidance is supplied.

### 4. low-poly-studio/flanger-build-docs — `REF_PASS`

- Canonical source: [flanger-build-docs](https://github.com/low-poly-studio/flanger-build-docs)
- Discovery lane: BBD/chorus/flanger searches, commercial-open pedal documentation and Coolaudio manufacturer cross-checking
- Reviewed revision: `d2b3c89`, 2023-02-15
- Topology: dual parallel MN3207/MN3208 bucket-brigade paths clocked by MN3102 devices, dry/wet/feedback mixing, LFO modulation, switchable second BBD line and true-bypass daughterboard.

#### Documented facts

- The complete repository is dedicated to CC0. It publishes a high-resolution schematic PDF, CSV/table BOM, PCB-layout image, assembly sequence, wiring guidance, enclosure recommendations, a wet-path bias calibration step and component-level modification notes.
- The two BBD positions may mix MN3207 and MN3208 devices; the second delay line is footswitchable. The author recommends a 1590BBT/1590C-class enclosure.
- Calibration consists of adjusting the main 100 kΩ trimmer for maximum flanging without wet-signal distortion. The documentation exposes optional dry, feedback and output-level resistor changes plus a feedback low-pass capacitor.
- Editable schematic/PCB source, Gerbers, drill template, netlist, measured clock range, delay sweep, bandwidth, noise, THD, clock feedthrough and independent completed-build evidence were not found.

#### Source completeness and license

`REF_PASS`, license status `verified_open_documentation`: CC0 and public circuit source clear the licensing and schematic gates, while the lack of editable EDA/fabrication data and quantitative verification prevents a normal buildability `PASS`.

#### Engineering inference

- BBD bias has a narrow clean window and interacts with signal level, supply and device spread. A single subjective trim step is insufficient for repeatable production.
- Dual BBD/clock sections increase clock-current and heterodyne risks. If their clocks are not synchronized or intentionally related, intermodulation can fall in the audible band.
- Anti-alias and reconstruction filters, companding absence/presence and feedback gain will dominate noise and overload behavior. These need measured transfer functions rather than assumed clone behavior.

#### Layout, power, grounding, noise, thermal and assembly risks

- Partition clock generators and BBD rails from the input and recovery amplifiers; route complementary clock traces as short, balanced aggressors and give the bias reference a quiet return.
- Original Panasonic BBDs are scarce and counterfeit-prone. Coolaudio currently documents V3207 and V3102 substitutes, but pin-compatible does not guarantee identical bias, clock feedthrough, insertion loss or noise.
- The high part count, two BBD paths, off-board wiring and enclosure constraints make this an advanced pedal build even though the through-hole parts are serviceable.

#### Adaptation ideas

1. Re-capture the circuit in KiCad with V3207/V3102 footprints, test points at both clock phases and BBD input/output, and separated analog/clock power filtering.
2. Add a low-noise compander option based on SSI2100/SSI2162 and measure improvement against the uncompanded path.
3. Digitally measure BBD clock frequency and store per-unit bias/sweep endpoints without moving the audio path into DSP.
4. Publish analyzer sweeps for delay range, frequency response, noise, THD, clock spur, headroom and feedback stability.

#### Unresolved assumptions

- The original commercial-board layout and the published schematic were not independently netlist-compared.
- The documentation does not establish how many units were completed or whether the current files incorporate every production revision.
- Modern Coolaudio substitutions need empirical rebiasing and filter verification.

## HOLD, rejected and duplicate pool

| Candidate | Disposition | Reason |
|---|---|---|
| [bosco-drg/Analog-Compressor-Pedal](https://github.com/bosco-drg/Analog-Compressor-Pedal) | HOLD / license | Excellent 2026 student source with editable KiCad, LTspice, simulations and PCB photos, but no explicit hardware or repository license was found |
| [rockola/triton-delay](https://github.com/rockola/triton-delay) | HOLD / build evidence | CC BY-SA PT2399 delay has editable KiCad, PDF schematic and Gerbers, but BOM/build/calibration evidence is thin and the upstream forum lineage could not be directly checked because FreeStompboxes remained blocked |
| [marangisto/Kick-808](https://github.com/marangisto/Kick-808) | HOLD / evidence and lineage | MIT KiCad, Gerbers, LTspice and panel mechanics are useful; repository documentation is a one-line clone label with no BOM, calibration, measurements or direct build report, and TR-808 lineage needs care |
| [rabid.audio Bass Chorus](https://rabid.audio/projects/chorus-pedal/) | HOLD / pre-prototype | CC BY-SA MN3207/LM13700 design log has strong filter/LFO calculations, but the author explicitly says breadboard confirmation, final schematic changes and PCB design are still pending |
| [Bleep Sound Quad VCA](https://bleepsound.github.io/quad_vca/) | HOLD / evidence | Public SSI2164/AS2164 source package is promising, but current build revision, license scope and quantitative channel/bleed evidence did not jointly clear this run's gate |
| [ohdsp/AmpTwo](https://github.com/ohdsp/AmpTwo) | HOLD / untested | TAPR-OHL dual stereo headphone amplifier has KiCad, BOM, Gerbers and placement data, but the repository explicitly labels the hardware untested |
| [TOIL Modular phaser](https://www.toilmodular.com/phaser/) | HOLD / upstream restriction | Built GPL repository and fabrication files are strong; the circuit derives from MFOS material whose reuse terms are noncommercial, so the repo license does not resolve the hardware lineage |
| [polykit microphone preamp](https://github.com/polykit/microphone-preamp) | HOLD / license | Useful transformer-input discrete/op-amp preamp source, but explicit reusable hardware licensing was not verified |
| [UCI Synthesizer Blocks](https://projects.eng.uci.edu/projects/2025-2026/synthesizer-blocks) | HOLD / source and license | Current university project reports fabricated and validated waveform, mixer, filter, VCA, LFO and speaker blocks; downloadable EDA/fabrication sources and hardware license were not located |
| [UNH µModules](https://scholars.unh.edu/honors/956/) | DUPLICATE HOLD | Rechecked in the post-shortlist university lane; the thesis is CC BY, but a separate editable manufacturing package and hardware-source license remain absent since the 2026-08-31 review |
| [amesser-group/modular-fx](https://gitlab.com/amesser-group/modular-synth/modular-fx) | HOLD / unchanged | RP2040 sigma-delta/PDM mixed-signal prototype still lacks completed testing, consolidated BOM/Gerbers/license files and analyzer data |
| Sandelinos/Basari on Codeberg | HOLD / access | Indexed analog-kick lead remained inaccessible at primary source; license, circuit package and build state could not be verified |
| little-angel chorus, FAREKIND SSI2131, HEAR, Open80017a and Schraeg | HOLD / unchanged or repeat | No material license, fabrication or measurement revision cleared the existing blocker; Open80017a and Schraeg also remain inside the 30-day window through 2026-09-30 |
| Recent 2026-09-07, 2026-09-14 and 2026-09-21 ranked projects | DUPLICATE | Canonical trackers keep them inside the hard 30-day anti-repeat window; no material revision justified an override |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | The pinned project remained a comparison anchor, not a discovery |

## Discovery audit

### Coverage

- Profile: `weekly_deep`.
- Candidate pool: 27 plausible projects or foundations were inspected before final ranking; four ranked.
- Domains searched: 38 distinct domains; 31 (82%) were outside GitHub. Coverage included GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SynthDIY/SDIY, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal engineering sites, university pages, OSHWA/project hubs and primary manufacturer resources.
- Source classes: repository hosts, alternative forges, specialist forums, mailing-list/legacy archives, personal engineering blogs, project/build hubs, self-hosted downloads, university/lab pages, certification records, curated link/RSS directories and manufacturer datasheet/application-note/evaluation-board hubs.
- Query families: SSI21xx/modern VCO and VCA; LM13700/OTA/VCA/VCF; BBD/PT2399/chorus/flanger/delay; drum/noise/percussion; mixer/panner/compressor/preamp/microphone; digitally assisted calibration/DAC/preset routing; artifact-led EDA/BOM/Gerber/license; alternative-forge/university/personal-site and lineage/backlink searches.

### Candidate ledger summary

The 27-candidate pool included the four ranked projects plus Analog Compressor Pedal, Triton Delay, Kick-808, Rabid Audio Bass Chorus, Bleep Quad VCA, AmpTwo, TOIL Phaser, Polykit microphone preamp, UCI Synthesizer Blocks, UNH µModules, midilab µMODULAR, jypma modsynth, DIYSynthMNL PT2399, Modular-FX, Basari, mixtee, Mechlab Stereo Animator, Little Angel Chorus, FAREKIND SSI2131, HEAR, Open80017a, Schraeg and current manufacturer foundations. Forums and aggregators were discovery signals only; no item was promoted without primary artifacts.

### Due-source revalidation

- 76 due registry rows were revalidated and updated to `last_verified=2026-09-28`; no status crossed a threshold.
- Revalidated status mix: 61 `active`, seven `degraded`, five `static_archive` and three `blocked_by_tool`.
- Mod Wiggler, electro-music, DIYStompboxes and SDIY directory surfaces remain degraded. Codeberg, SourceHut and FreeStompboxes remain blocked by the available research path. Indexed results from those sources were used only as leads.
- Current active project hubs, repository searches, manufacturer indexes and due personal pages were rechecked directly or through current indexed primary-page evidence. No page was confirmed moved or dead.

### Registry additions

Seven reusable page-level sources were added to `data/hidden-gems-source-registry.csv`:

1. koshizuow's code-generated condenser-microphone repository.
2. Poetaster's Keep author/project page.
3. Imogen Wren dual-BBD flanger build-document repository.
4. Hands of Svarog panning/headphone mixer repository.
5. Rabid Audio's calculated bass-chorus design log.
6. UCI's 2025–2026 Synthesizer Blocks capstone page.
7. Sound Semiconductor's live downloads index.

### Post-shortlist lanes and stopping rule

1. Manufacturer/foundation lane: current SSI2100/SSI2160/2162/2190 documents, Coolaudio V3207/V3102, TI LM13700 and Analog Devices dynamics references were searched after the four-item shortlist. This confirmed active parts and current foundations but produced no additional licensed, built open-hardware candidate.
2. Alternative-forge/university/personal lane: independent GitLab, Codeberg, university-capstone and personal BBD/compressor searches were run after the shortlist. The lane resurfaced µModules and found UCI Synthesizer Blocks, Rabid Audio Bass Chorus and GitLab leads, but each remained blocked by license, downloadable-source, prototype or direct-access gaps.

The profile floors were exceeded, and two consecutive independent post-shortlist batches produced no additional gate-clearing project. This satisfies the documented diminishing-return stop rule.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
koshizuow/open-condenser-mic,STRONG_PASS,2026-09-28,2026-09-28,2026-10-28,published,CERN-OHL-P code-generated phantom-powered condenser microphone with prototype executable KiCad/BOM/fabrication source SPICE and CI checks; generated release artifacts and real acoustic/electrical measurements are absent
poetaster/moat,PASS,2026-09-28,2026-09-28,2026-10-28,published,GPL Keep v4 production analog pocket synth with Fritzing Gerbers BOM mechanics instructions photographs and audio; XR2206 sourcing and quantitative characterization remain weak
kraakenstuff/Hands-of-Svarog,PASS,2026-09-28,2026-09-28,2026-10-28,published,MIT built four-input panning and stereo headphone module with KiCad interactive BOM panel and Gerbers; upstream forum lineage NJM2068 lifecycle and load measurements remain unresolved
low-poly-studio/flanger-build-docs,REF_PASS,2026-09-28,2026-09-28,2026-10-28,published,CC0 dual-MN3207/3208 flanger schematic BOM assembly calibration and enclosure reference; no editable EDA fabrication files independent build proof or measurements
```

### `data/selected-projects.csv`

```csv
koshizuow/open-condenser-mic,https://github.com/koshizuow/open-condenser-mic,selected,digest_ranked,"Analog,Phantom,OPA1641,CD40106,NTE10/3","microphone,preamp,charge-pump,transformer,code-generated-kicad,simulation,open-hardware",Executable open-hardware source and prototype make a rare modern condenser-microphone reference,Measure charge-pump spur self-noise THD CMRR RFI humidity leakage and capsule-dependent sensitivity then add a repeatable production fixture,verified,CERN-OHL-P; generated manufacturing assets are CI outputs and real acoustic/electrical characterization is missing
poetaster/moat,https://github.com/poetaster/moat,selected,digest_ranked,"Analog,Standalone,CD40106,CD4040,XR2206","pocket-synth,semi-modular,sequencer,vactrol,fritzing,gerbers,production",Production semi-modular instrument combines simple analog blocks into an unusually adaptable standalone system,Modernize the legacy oscillator regulate and partition rails characterize vactrols and publish a clean current v4 manufacturing manifest,verified,GPL-3.0 repository; hardware scope is implicit and XR2206 sourcing plus quantitative measurements remain open
kraakenstuff/Hands-of-Svarog,https://github.com/kraakenstuff/Hands-of-Svarog,selected,digest_ranked,"Analog,Eurorack,TL072,NJM2068","panner,mixer,headphone,kicad,gerbers,panel,open-hardware",Compact build-proven source is a practical base for measured VCA panning cue and headphone-output experiments,Replace passive pan with SSI2164 or SSI2190 control separate line and headphone outputs and characterize load noise crosstalk and thermal behavior,needs_lineage_check,MIT repository; resolve J3RK forum schematic lineage and replace NRND NJM2068 before commercial adaptation
low-poly-studio/flanger-build-docs,https://github.com/low-poly-studio/flanger-build-docs,selected,digest_ranked,"Analog,Pedal,MN3207,MN3208,MN3102","flanger,bbd,dual-delay,calibration,bom,cc0",Rare unrestricted dual-BBD circuit and build guide is a valuable reconstruction and companding benchmark,Recapture in KiCad for V3207/V3102 add SSI2100/2162 companding clock isolation bias test points and analyzer characterization,verified,CC0 documentation; no editable EDA fabrication release independent build verification or measurements
```

Equivalent hard and soft rows were added to `data/common-anti-repeat-index.csv`; these projects are ineligible for re-publication through 2026-10-28 absent a material revision.

## Next-run search debt

1. Find a fabricated, licensed SSI2100 + SSI2162 compandor/BBD effect with editable EDA and measured tracking, clock leakage, SNR and overload recovery.
2. Find a licensed SSI2190 or SSI2164 panner/mixer with editable EDA, DAC-controlled recall and measured noise, crosstalk, pan law, headroom and control feedthrough.
3. Revisit Rabid Audio Bass Chorus after breadboard proof and PCB release; compare it directly with the CC0 dual-BBD flanger and current V3207/V3102 behavior.
4. Seek a complete, current analog compressor with explicit hardware licensing, build evidence, attack/release calibration and measured transfer curves; recheck Bosco's project only if licensing appears.
5. Continue university, GitLab, self-hosted and personal-site searches for digitally assisted analog VCO/VCF calibration and preset routing with downloadable design source.
6. Resolve Hands of Svarog/J3RK lineage, test a current headphone-driver substitution and verify Keep v4's exact production Gerber/source pairing.

## Prompt improvement for next run

Add a mandatory `measurement_class` field to the candidate ledger with values `simulated`, `bench_electrical`, `acoustic`, `listening_only` or `none`. This run exposed how easily polished simulation plots can look like measured performance. Promotion remains possible without measurements, but the digest must never blend simulation, calculation and bench evidence.

## Feedback / Tuning Questionnaire

1. Preferred output mix next week? A) reusable circuit blocks; B) complete instruments; C) balanced mix.
2. Priority topology? A) VCO/VCF/VCA; B) BBD/PT2399/FV-1 effects; C) mixers/preamps/compressors/microphones; D) drums/noise/waveshapers.
3. License threshold? A) commercial open-hardware only; B) allow repository licences such as GPL/MIT with caveats; C) keep current strict ranking plus HOLD references.
4. Measurement threshold? A) bench measurements required for `PASS`; B) simulation may support `PASS` with build evidence; C) current balanced policy.
5. Source emphasis? A) personal/self-hosted; B) forums/legacy archives; C) alternative forges; D) universities/manufacturers.
6. Digitally assisted analog focus? A) autotune/DAC trims; B) preset routing/VCAs; C) production test/calibration fixtures; D) delay/BBD clock and bias calibration.
7. Should derivative circuits with explicit repository licences but unresolved upstream lineage remain rankable? A) yes with prominent warning; B) `REF_PASS` only; C) HOLD until lineage is resolved.
