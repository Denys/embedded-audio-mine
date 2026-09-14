# Weekly Analog Audio Mine — 2026-09-14

Profile: `weekly_deep`  
Operational authority: current repository rules, trackers, recent digests and weekly history  
Previous questionnaire feedback applied: none.

## Outcome

Four projects cleared the public-schematic, explicit-license, primary-artifact and 30-day anti-repeat gates. One is a buildable voltage-controlled PT2399 module; one is an unusually deep mixed-signal preservation reference still awaiting PCB implementation; two are compact passive mixer designs with complementary mechanical and balanced-line reuse value. No item is repeated from the last 30 days, and the pinned b:art Dual SSI2130 VCO Core remains a similarity anchor only.

| Rank | Project | Lane | Why it matters |
|---:|---|---|---|
| 1 | [m0xpd/encore](https://github.com/m0xpd/encore) | `PASS` | Built CC BY-SA PT2399 Eurorack delay with CV over delay, feedback and wet level, plus a patchable feedback loop and unusually candid errata |
| 2 | [hankdraco/SIDapticus](https://github.com/hankdraco/sidapticus) | `REF_PASS` | CERN-OHL-P dual-SID mixed-signal reference with hierarchical KiCad, BOM, firmware, rail protection, sequencing and scope evidence |
| 3 | [MakerVan MatrixMix](https://wiki.makervan.de/wiki/MatrixMix) | `PASS` | OSHWA-certified, editable and mechanically complete passive 4×4 matrix mixer with extension and stereo/sync routing |
| 4 | [Second Order Harmonics Audio Summer](https://github.com/SecondOrderHarmonics/audio-summer_dsub25-to-combo-xlrtrs) | `PASS` | CC0, fabrication-ready passive balanced DB25-to-dual-bus summer with BOM, Gerbers, drill data and photographed hardware |

## Ranked projects

### 1. m0xpd/encore — `PASS`

- Canonical source: [encore repository](https://github.com/m0xpd/encore)
- Discovery lane: personal-project/repository traversal followed by PT2399 artifact inspection
- Reviewed revision: `6f8dad9cc66c438e32afa5e0f4a1bcb5a70efeea` (2023-10-18)
- Topology: PT2399 delay with a second-order input filter, PT2399 internal filter stages, fourth-order Butterworth output filter, voltage-controlled resistance for delay time, LM13700 VCAs for repeats and wet level, and parallel internal plus patchable external feedback paths.

#### Documented facts

- The project is explicitly licensed CC BY-SA 4.0 and publishes main/control schematics and board layouts in editable Eagle format, a main-board BOM, a KiCad front-panel project and a completed-module photograph.
- The two electronic PCBs mate through two 20-way headers. The finished module is documented as 12 HP, 38 mm deep, and drawing 36.5 mA from +12 V plus 12.5 mA from −12 V.
- Delay time, repeats and wet level accept manual and CV control. A send/return loop allows filtering, cross-coupled delays and other processing inside the recursion path.
- The author explicitly records two defects: the present PCBs overhang the panel's left edge by about 1 mm, and the output-filter input loads the preceding PT2399 filter because a buffer stage was omitted.
- No released Gerber package, complete control-board BOM, calibration sequence or measured delay range, frequency response, noise, THD, clock leakage or CV feedthrough data was found.

#### Source completeness and license

`PASS`, license status `verified_open_hardware`: public schematics, editable EDA, parts evidence, panel source, physical build and explicit modification/redistribution terms are present. Missing fabrication outputs and quantitative characterization keep it below `STRONG_PASS`.

#### Engineering inference

- The documented filter-loading interaction will shift the intended fourth-order response and make the effective reconstruction curve dependent on the PT2399 output network. A unity-gain buffer or a recalculated high-impedance stage should precede any production reuse.
- PT2399 delay time is strongly nonlinear with its timing resistance; long settings raise noise and artifacts. CV current limiting and a hard minimum resistance are prudent to keep pin 6 within safe operating behavior.
- PT2399 clock current and its local 5 V rail can contaminate LM13700 control and audio nodes. Local regulation/filtering, tight decoupling, and deliberate analog/digital return routing matter more than the modest module current suggests.
- High loop gain can self-oscillate. Any digitally stored repeat setting needs bounded gain, a defined startup state and testing with an open or externally driven feedback return.

#### Layout, power, noise, thermal and assembly risks

- Keep the PT2399 clock/timing node and regulator return away from high-impedance filter and VCA-control nodes. Separate panel/control currents from audio returns until a deliberate star or plane connection.
- The low dissipation does not imply zero thermal sensitivity: timing and OTA control behavior can drift with local regulator and IC heating, though acoustic/noise variation is the larger practical risk.
- PT2399 parts are broadly available but clone quality varies. LM13700 and TL074-family parts remain mainstream. The THT two-board build is serviceable, but legacy Eagle files, missing Gerbers and header alignment raise fabrication burden.

#### Adaptation ideas

1. Add the missing buffer, publish measured filter overlays and create a modern KiCad/Gerber/BOM release.
2. Replace or parallel the timing VCR with a calibrated digital potentiometer; measure PT2399 pin-5 clock frequency and store a monotonic delay-time table in NVM.
3. Substitute SSI2164/2162 cells for repeats and wet VCAs, then characterize control feedthrough, noise and loop-gain law.
4. Add selectable low/high-pass networks in the exposed feedback loop, protection on every external loop node, and factory test pads for rails, clock and gain.

#### Unresolved assumptions

- The photographed hardware's exact main/control-board revisions are not tagged as a reproducible release.
- Stability across all external feedback-loop loads and maximum CV excursions is unverified.
- Signal levels, headroom and protection at the Eurorack jacks are not summarized numerically.

### 2. hankdraco/SIDapticus — `REF_PASS`

- Canonical source: [SIDapticus repository](https://github.com/hankdraco/sidapticus)
- Discovery lane: newly released mixed-signal hardware plus digitally controlled analog voice search
- Reviewed revision: `f9229761c90d731e583817e0d33df83b8b190f01` (2026-08-23)
- Topology: ESP32-S3 directly drives one or two real MOS 6581/8580 SID chips at a 1 MHz PHI2 clock; cascaded linear rails, supervisor-controlled power sequencing, active bleeders and TL431/BT151 crowbars protect the chips; TL074 stages buffer/filter the analog output and H11F1 photo-FET optocouplers select stereo/wide-mono/dual-mono routing.

#### Documented facts

- Hardware is licensed CERN-OHL-P-2.0 and firmware/documentation MIT. Hierarchical editable KiCad schematics, a PDF export, BOM, ESP-IDF source, detailed design documents, scope captures and a working breadboard are public.
- 6581 and 8580 sockets have independently selected 12 V/9 V analog rails. The design documents the 6581's required 1 kΩ output load and the 8580 case where that load must be omitted to avoid clipping.
- A 1 kΩ/10 nF first-order output network gives an approximately 16 kHz corner before the op-amp stage. The analog section uses a 15 V single supply and op-amp-generated virtual ground.
- Direct 3.3 V ESP32 signaling was physically verified with an 8580 and SwinSID. The author explicitly says 6581 and ARMSID have not yet been empirically verified in this prototype.
- Open-breadboard regulator case temperatures are reported not to exceed 70 °C with heatsinks. Scope captures verify sequencing, discharge and bus timing; they do not constitute noise, THD, crosstalk or frequency-response measurements.
- No PCB layout, Gerbers, enclosure/mechanics or released assembly package exists; the project calls itself a laboratory reference prototype.

#### Source completeness and license

`REF_PASS`, license status `verified_open_hardware`: licensing, circuit source, BOM, firmware, proof hardware and targeted measurements are unusually strong. It is not immediately fabricable as a board and therefore cannot reach `PASS` under the present evidence.

#### Engineering inference

- A 70 °C regulator case on an open breadboard leaves limited enclosure margin. A PCB should replace cascaded linear drops where safe, include copper/heatsink calculations, and test worst-case dual-chip plus Wi-Fi load at elevated ambient.
- Direct 3.3 V logic may work nominally, but margin should be checked against each SID revision's worst-case VIH, ESP32 VOH at configured drive/current, ringing and temperature. Optional footprints for level translators or series damping would de-risk a production board.
- The virtual ground is part of the audio reference and must not be tied casually to externally grounded equipment. Output coupling, sleeve/chassis return and fault paths need explicit definition.
- H11F1 on-resistance, transfer spread, nonlinearity and temperature can affect level matching and crosstalk. The no-phase-jump strategy of keeping both SIDs digitally synchronized is elegant, but the analog switching still needs measured mute leakage and transients.

#### Layout, power, noise, thermal and assembly risks

- Preserve the project's sequencing/bleeder/crowbar intent while giving each crowbar a verified fuse/current-limited source; a crowbar without controlled upstream current can trade chip protection for overheated wiring.
- Put the SID clock/bus and ESP32/Wi-Fi currents over controlled return planes and isolate them from SID output, filter capacitor and virtual-ground nodes. Validate RF burst noise while serving the web UI and during OTA writes.
- Genuine SID chips are scarce, expensive and electrically variable. H11F1 and through-hole regulators are sourceable but less universal than commodity op amps. More than ninety parts, two SID variants, five heatsinks and high-consequence jumper choices make assembly advanced.

#### Adaptation ideas

1. Produce a four-layer PCB with keyed 6581/8580 configuration, interlocked rail selection, replaceable SID daughtercards and probeable protection rails.
2. Add per-channel audio ADC measurement for startup self-test, gain matching and closed-loop H11F1 routing verification without digitizing the normal signal path.
3. Capture THD+N, idle/busy spectra, crosstalk, output headroom, filter response and thermal data for both SID generations and replacement chips.
4. Add selectable level-shifter footprints and series termination, then publish PVT timing and voltage-margin evidence.

#### Unresolved assumptions

- 6581 and ARMSID direct-drive compatibility is theoretical in the current evidence set.
- Long-term breadboard contact resistance, crowbar fault energy and enclosed thermal behavior are not established.
- “Low-noise” and “clean” audio descriptions are author observations, not analyzer measurements.

### 3. MakerVan MatrixMix — `PASS`

- Canonical source: [MatrixMix project page](https://wiki.makervan.de/wiki/MatrixMix) and [source repository](https://github.com/makervan/matrixmix)
- Certification: [OSHWA DE000158](https://certification.oshwa.org/de000158.html), certified 2025-10-13
- Discovery lane: OSHWA list traversal to a one-person engineering wiki
- Reviewed revision: `8f7130f57940c0f8dffb9775e91888a7735f9e99` (2026-03-30); documented hardware version 0.3
- Topology: passive four-input/four-output resistive matrix using sixteen 50 kΩ logarithmic pots and sixteen 10 kΩ summing resistors, with board-extension headers and configurable second-contact routing for mono, stereo or Pocket Operator-style sync.

#### Documented facts

- Hardware and documentation are CC BY-SA 4.0, independently recorded by OSHWA. Editable legacy KiCad schematic/PCB, panel DXF/OpenSCAD, parts list, photos and revision history are public.
- Version 0.1 had reversed pot direction and a 10 kΩ-pot/10 kΩ-resistor combination that would not fully attenuate. Version 0.2 changed to 50 kΩ pots with 10 kΩ mixing resistors; version 0.3 corrected sync pinout and added stereo options.
- The project is marked stable and sold as hardware, providing credible build evidence. The author explicitly warns that moving one control can alter other-channel loudness because the network is unbuffered.
- No Gerber release, insertion-loss/input-output-impedance model, noise/bleed/crosstalk data, maximum-level specification or DC-blocking/protection scheme was found.

#### Source completeness and license

`PASS`, license status `verified_open_hardware`: editable electrical and mechanical source, an explicit hardware license, OSHWA record, BOM and real builds are present. The source can be fabricated after generating outputs, but the passive network's electrical behavior needs system-level qualification.

#### Engineering inference

- Effective source and load impedances vary with every knob and connected device. Passive attenuation, interaction and crosstalk rise as boards are chained; an extension is not electrically equivalent to simply adding more independent inputs.
- DC offsets on connected gear can cause scratch/click noise at the pot wipers. AC coupling or defined DC-safe usage should be added for a general audio product.
- Stereo/sync jumpers can join second contacts from otherwise unrelated equipment. Keyed configuration, series protection and clearer current/voltage limits would reduce mispatch risk.

#### Layout, power, noise, thermal and assembly risks

- There is no powered rail or meaningful self-heating. Hum susceptibility is dominated by cable shields, enclosure bonding, high/variable impedances and loop area across sixteen controls.
- All parts are commodity through-hole. Assembly is electrically easy but mechanically repetitive: sixteen pots, eight jacks and a large panel require accurate alignment.

#### Adaptation ideas

1. Use the extension headers for a unity-gain buffered output card with RF filtering and DC blocking, retaining a selectable passive mode.
2. Add SSI2164 or LM13700 cells after each crosspoint for CV control and preset recall; keep the original resistor matrix as a graceful unpowered fallback.
3. Publish SPICE/load sweeps and measured insertion loss, channel interaction, crosstalk and maximum level for typical synth, line and Pocket Operator impedances.

#### Unresolved assumptions

- The repository's current legacy KiCad sources were not matched to a versioned Gerber set.
- Chained-board behavior and sync-bus fault tolerance are undocumented.

### 4. Second Order Harmonics Audio Summer — `PASS`

- Canonical source: [audio-summer_dsub25-to-combo-xlrtrs](https://github.com/SecondOrderHarmonics/audio-summer_dsub25-to-combo-xlrtrs)
- Discovery lane: small open-hardware organization and self-hosted manufacturer lead traversal
- Reviewed revision: `653afc01c2699b52748dee4a45b08037f5a5a440` (2026-01-09); schematic revision 1.0 dated 2023-02-08
- Topology: the eight balanced Tascam-wired DB25 channels are divided into two passive four-channel balanced summing buses. Each hot/cold leg sums through 5.1 kΩ isolated resistor-array elements to a combo XLR/TRS output; 50 kΩ shunts define the two balanced bus outputs.

#### Documented facts

- The project is dedicated under CC0 1.0. It includes a public SVG/PNG schematic, UTF-16 BOM, netlist, Gerbers, drill files, 3D OBJ, board renders and photographs of complete hardware.
- The BOM identifies one DB25 connector, two XLR/TRS combo jacks, four KOA 4×5.1 kΩ resistor arrays and two 50 kΩ resistors.
- The repository does not publish editable schematic or PCB source. No enclosure drawing, assembly guide, channel-map test, insertion-loss calculation or measured impedance, noise, crosstalk, common-mode behavior and level limits were found.

#### Source completeness and license

`PASS`, license status `verified_open_hardware`: CC0, a circuit-equivalent schematic/netlist, complete fabrication data and photographed builds clear the gate. Lack of editable EDA and electrical characterization are significant reuse costs, but do not prevent direct fabrication.

#### Engineering inference

- With four nominally low-impedance sources feeding each bus through 5.1 kΩ per leg, insertion loss and output impedance depend on how many channels are driven and the receiving input impedance. A microphone preamp or high-gain balanced receiver may be required to restore level.
- The network assumes genuinely impedance-balanced or differential sources and a balanced receiver. Tying active output legs together through summing resistors is normally benign, but source fault current, phantom power and incompatible unbalanced adapters need explicit testing.
- Resistor-array ratio tracking is useful for CMRR, yet connector pinout, trace symmetry and the destination input dominate real common-mode rejection. The nominal ±10% 50 kΩ shunts do not provide precision bus termination.

#### Layout, power, noise, thermal and assembly risks

- The passive board has no thermal concern and contributes only resistor Johnson noise, but the gain subsequently required can make that noise and external hum audible.
- DB25 shield/chassis treatment and pin-1 behavior are more important than a generic ground pour. Phantom power must be blocked or explicitly made safe before connecting the buses to mic inputs.
- Assembly is low component count, but the mixed THT/0603-array board and large connectors require controlled soldering and mechanical strain relief. Exact connector substitutes must match the uncommon footprints.

#### Adaptation ideas

1. Add an open, measured balanced makeup amplifier with THAT124x/INA-family receiver or discrete instrumentation topology, RF/ESD protection and optional transformer isolation.
2. Publish editable KiCad source reconstructed from the netlist, a DB25 channel-map continuity fixture and enclosure CAD.
3. Characterize loss, bus impedance, crosstalk and CMRR for one-to-four active inputs and several destination impedances.

#### Unresolved assumptions

- The schematic/netlist and supplied Gerbers were not independently netlist-compared in this run.
- Safe behavior with phantom-powered inputs, electronically balanced outputs and unbalanced adapters is undocumented.

## HOLD, rejected and duplicate pool

| Candidate | Disposition | Reason |
|---|---|---|
| [PocketMidi/KB1](https://github.com/PocketMidi/KB1) | HOLD / scope | Excellent CERN-OHL-S/OSHWA ESP32-S3 keyboard with KiCad, Gerbers, BOM, mechanics and speakers, but it is primarily a MIDI controller and its analog audio path is secondary and unmeasured |
| [VALKYRIEiSr/PulseChord](https://github.com/VALKYRIEiSr/PulseChord) | HOLD / scope | CERN-OHL-P analog haptic belt has Eagle, BOM, Gerbers, mechanics and a build, but uses off-board power-amplifier modules and lacks electrical/thermal measurements; peripheral to core audio circuitry |
| [Dogone23/FV1-Audio-Module](https://github.com/Dogone23/FV1-Audio-Module) | HOLD | FV-1/EEPROM EasyEDA source and built photos are useful, but the README's CERN-OHL-P claim conflicts with the repository's MIT-only license file; no BOM/Gerbers/measurements |
| [JordanAceto/quad_bass_lead_drum_generator](https://github.com/JordanAceto/quad_bass_lead_drum_generator) | HOLD | Rare four-voice SN76477 drum architecture and physical build, but no license; author says values are guessed/missing and the schematic likely contains errors |
| [SlowProject/Eurorack-Dual_VCA](https://github.com/SlowProject/Eurorack-Dual_VCA) | HOLD | LM13700 schematic, BOM, Gerbers and built photos, but no explicit hardware license or editable EDA |
| [F113X/2399-Digital-Delay-Line](https://github.com/F113X/2399-Digital-Delay-Line) | HOLD | Built PT2399 module with useful source and documented input/filter errata, but no verified explicit hardware license or complete manufacturing release |
| [citixen/pt2399_tap_euro](https://github.com/citixen/pt2399_tap_euro) | HOLD / calibration reference | Clever Teensy/MCP41xxx routine measures PT2399 pin-5 clock and stores a deduplicated resistance-delay map in EEPROM, but it is unfinished, unlicensed and lacks a complete audio schematic/PCB |
| [jakeson21/compressor-pedal](https://github.com/jakeson21/compressor-pedal) | HOLD | Editable KiCad separates volume detector and gain control, but no license, BOM, build or measurement evidence |
| [OSHWA EG000004 high-power audio amplifier](https://certification.oshwa.org/eg000004.html) | HOLD | CC BY-SA certification and linked EasyEDA artifacts exist, but primary OSHWLab retrieval was blocked and no reliable measured/build evidence was verified |
| GitLab Lyle/Delay | HOLD | Indexed PT2399/KiCad lead redirected to sign-in; primary files and license could not be verified |
| [diysynth/EURORACK-MODULES](https://github.com/diysynth/EURORACK-MODULES) | HOLD | Broad CC BY-SA analog collection remains useful, but source formats, measurements and fabrication completeness vary by module |
| [crowselectromusic/HEAR](https://github.com/crowselectromusic/HEAR) | HOLD | Licensed DC-coupled panning mixer remains explicitly untested at its current Gerber revision |
| [b:ond digitally assisted analog VCO](https://www.reddit.com/r/synthdiy/comments/1upz0xz/i_have_made_a_digitallyassisted_analog_vco_with/) | HOLD | Fresh 2026 discovery signal claims a published analog-core schematic, but no complete canonical hardware package/license was independently located; forum evidence is not promotion authority |
| Recent WebGPT ranked projects | DUPLICATE | 2026-08-17, 2026-08-31 and 2026-09-07 rows remain blocked until their recorded dates absent a material revision |
| Recent Codex/portable ranked projects | DUPLICATE | RE04, Faust, Protoseed, Samplotron, grajek, DualVCA, AmbientSynth, cyfaust, LoopSmith and nest-audio-pcb remain inside the shared 30-day window |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned revision 3.0 was used for similarity, source and calibration quality; it is not a new discovery |

## Discovery audit

### Coverage

- Profile: `weekly_deep`.
- Candidate pool: 22 plausible projects/foundations were logged before ranking; four ranked.
- Domains searched: 35 distinct domains; 29 (83%) were outside GitHub. Coverage included GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SynthDIY/SDIY, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, OSHWA, MakerVan, F113X, SignalFunctionSet, Second Order Harmonics and primary manufacturer sites.
- Source classes: repository hosts, specialist forums, mailing-list/legacy archives, personal engineering blogs, project/build hubs, self-hosted documentation, OSHWA records, link/RSS directories, university sources, vendor communities and manufacturer datasheets/application notes/evaluation boards.
- Query families: topology/component; PT2399/BBD/OTA; artifact-led schematic/KiCad/Eagle/BOM/Gerber; explicit hardware-license/OSHWA; digitally assisted calibration/DAC/digital-pot/NVM; alternative-forge host-specific; forum/lineage/backlink; manufacturer design-note/evaluation-board.

### Due-source revalidation

- 71 due registry pages were revalidated and updated to `last_verified=2026-09-14`; no status crossed a threshold.
- Mod Wiggler, electro-music, DIYStompboxes, SDIY directories and several legacy personal pages remain `degraded`; they were used only for indexed discovery signals.
- Codeberg, SourceHut and FreeStompboxes remain `blocked_by_tool` after non-retryable direct-access failures. GitLab remained searchable but some project pages redirected to sign-in.
- Active project hubs, OSHWA, Sound Semiconductor, ALFA RPAR, THAT design notes, PedalPCB, Hackaday, Look Mum No Computer and current primary repositories were rechecked directly or through current indexed evidence.

### Registry additions

Seven reusable page-level sources were added:

1. m0xpd/encore PT2399 source repository.
2. hankdraco/SIDapticus protected-SID reference repository.
3. Second Order Harmonics passive audio-summer repository.
4. MakerVan MatrixMix engineering project page.
5. F113X 2399 Digital Delay Line self-hosted documentation.
6. SignalFunctionSet DIY build index.
7. PocketMidi KB1 OSHWA certification page.

### Post-shortlist lanes and stopping rule

1. Modern analog-IC/manufacturer lane: SSI2100/SSI2162 companding, SSI2190 mixers, SSI2164 cells, ALFA/Coolaudio and manufacturer/application-note hubs were searched after the four-item shortlist. The June 2026 SSI2100 data sheet is a useful foundation, but no newly fabricated, licensed and measured SSI2100+SSI2162 or SSI2190 open-hardware design emerged.
2. Digitally assisted/alternative-forge lane: digital-pot PT2399 calibration, analog-VCO autotune/DAC trim, per-unit NVM, GitLab, Codeberg, SourceHut and Hackaday were searched independently. It yielded the citixen calibration reference and b:ond lead, but neither cleared complete-primary-artifact and license gates.

The `weekly_deep` floors were exceeded. Both independent post-shortlist batches produced no additional publishable project, satisfying the diminishing-return stopping rule.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
m0xpd/encore,PASS,2026-09-14,2026-09-14,2026-10-14,published,CC-BY-SA built PT2399 Eurorack delay with Eagle sources main-board BOM KiCad panel voltage-controlled delay feedback and wet paths plus documented loading and panel-overhang errata
hankdraco/sidapticus,REF_PASS,2026-09-14,2026-09-14,2026-10-14,published,CERN-OHL-P dual-SID ESP32-S3 reference with hierarchical KiCad BOM firmware protected sequenced rails audio routing breadboard proof and targeted scope evidence; no PCB fabrication release or full audio measurements
makervan/matrixmix,PASS,2026-09-14,2026-09-14,2026-10-14,published,OSHWA CC-BY-SA passive 4x4 matrix mixer with editable KiCad panel CAD BOM photos revision errata stereo sync and expansion routing; no Gerbers or electrical measurements
SecondOrderHarmonics/audio-summer_dsub25-to-combo-xlrtrs,PASS,2026-09-14,2026-09-14,2026-10-14,published,CC0 passive balanced DB25 dual-bus summer with schematic netlist BOM Gerbers drill 3D model and photographed hardware; no editable EDA or loss impedance crosstalk and phantom-safety measurements
```

### `data/selected-projects.csv`

```csv
m0xpd/encore,https://github.com/m0xpd/encore,selected,digest_ranked,"Analog,Eurorack,PT2399,LM13700","delay,cv-control,feedback-loop,eagle,panel,open-hardware,errata",Built open delay exposes three analog voltage-control paths a patchable recursion loop and candid filter and mechanical flaws,Develop calibrated digitally recallable PT2399 delay tables quiet clock partitioning measured filters and safe external feedback paths,verified,CC BY-SA 4.0; no Gerbers complete BOM calibration or quantitative measurements
hankdraco/sidapticus,https://github.com/hankdraco/sidapticus,selected,digest_ranked,"ESP32-S3,MOS6581,MOS8580,TL074,H11F1","mixed-signal,sid,protection,power-sequencing,crowbar,kicad,firmware,open-hardware",Exceptional safety-first mixed-signal reference preserves scarce analog voice chips with deep circuit and timing evidence,Reuse rail sequencing fault protection direct-bus validation and digitally synchronized analog routing in protected voice-card designs,verified,CERN-OHL-P hardware and MIT firmware; breadboard only with no PCB layout or full audio characterization
makervan/matrixmix,https://github.com/makervan/matrixmix,selected,digest_ranked,"Analog,Passive,Desktop","matrix-mixer,kicad,oshwa,open-hardware,mechanics,revision-errata",Certified editable passive matrix is a clean basis for buffered VCA and preset-controlled mixer experiments,Compare passive interaction against buffered SSI2164 or LM13700 expansions and publish load-aware measurements,verified,CC BY-SA 4.0 and OSHWA DE000158; no Gerbers or quantitative performance data
SecondOrderHarmonics/audio-summer_dsub25-to-combo-xlrtrs,https://github.com/SecondOrderHarmonics/audio-summer_dsub25-to-combo-xlrtrs,selected,digest_ranked,"Analog,Passive,Balanced,DB25","balanced-summing,cc0,gerbers,bom,netlist,manufacturing",Minimal fabricated balanced summer exposes a reusable professional-audio interconnect and passive bus reference,Add measured balanced makeup gain phantom safety chassis grounding and editable KiCad source,verified,CC0; fabrication-ready but no editable EDA enclosure or electrical characterization
```

## Next-run search debt

1. Find a fabricated licensed SSI2100 + SSI2162 compandor with editable EDA and measured compander tracking, clock leakage, SNR and overload recovery.
2. Revisit b:ond only after a canonical complete hardware repository and explicit license appear; prioritize closed-loop VCO calibration, bipolar DAC trims and temperature sweeps outside GitHub.
3. Seek an open SSI2190 mixer with editable EDA, DAC-controlled routing and measured noise, crosstalk, headroom and control feedthrough.
4. Target licensed BBD chorus/flanger/phaser and analog drum voices on personal sites, GitLab/self-hosted Git and university archives rather than more schematic-only GitHub collections.
5. Recheck Open80017a v0.2, Schräg's attenuverter fix, HEAR's tested Gerbers and MAMUT hardware only for material revisions.
6. Resolve Dogone23's hardware-license mismatch, F113X licensing and the three inaccessible alternative-forge candidates.

## Prompt improvement for next run

Require an explicit candidate-evidence ledger during discovery with one row per candidate for license, schematic, editable EDA, fabrication, build and measurement status. This will make HOLD decisions auditable earlier and reduce time spent re-opening attractive but license-incomplete repositories.

## Feedback / Tuning Questionnaire

1. Preferred output mix next week? A) reusable circuit blocks; B) complete instruments; C) balanced mix.
2. Priority topology? A) VCO/VCF/VCA; B) BBD/PT2399/FV-1 effects; C) mixers/preamps/compressors; D) drums/noise/waveshapers.
3. License threshold? A) commercial open-hardware only; B) allow noncommercial `REF_PASS`; C) keep current strict ranking plus HOLD references.
4. Evidence emphasis? A) measurements/calibration; B) fabrication/mechanics; C) circuit novelty; D) balanced.
5. Source emphasis? A) personal blogs/self-hosted; B) forums/legacy archives; C) alternative forges; D) manufacturer/university.
6. Digitally assisted analog focus? A) autotune/DAC trims; B) preset routing/VCAs; C) factory test; D) PT2399/BBD calibration.
7. Passive designs? A) keep ranking strong passive references; B) HOLD unless measured; C) only when they include an active expansion path.
