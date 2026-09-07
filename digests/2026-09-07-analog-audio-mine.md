# Weekly Analog Audio Mine — 2026-09-07

Profile: `weekly_deep`  
Operational authority: current repository rules and trackers  
Questionnaire state: no new explicit feedback; the established analog/mixed-signal scope and evidence gates remain unchanged.

## Outcome

Four projects cleared the public-schematic, explicit-license, evidence and 30-day anti-repeat gates. One is a production source package strong enough for `STRONG_PASS`; one is a build-proven `PASS`; two are `REF_PASS` designs whose source value is real but whose verification or manufacturing completeness is limited. The SSI2190 evaluation board is included separately as a manufacturer foundation update, not as open hardware.

| Rank | Project | Lane | Why it matters |
|---:|---|---|---|
| 1 | [Cleveland Music Co. Open Source Pedals](https://github.com/clevelandmusicco/open-source-pedals) | `STRONG_PASS` | Production-used fuzz/overdrive/DSP-pedal sources with editable Eagle, fabrication/assembly files, enclosure mechanics and commercial CC BY-SA reuse |
| 2 | [kzalesak/Digisynth](https://github.com/kzalesak/Digisynth) | `PASS` | Build-proven TAPR-OHL pocket 40106 instrument with editable KiCad, Gerbers and an exceptionally useful circuit/operation manual |
| 3 | [MatthewATaylor/Modular-Synth-Hardware](https://github.com/MatthewATaylor/Modular-Synth-Hardware) | `REF_PASS` | MIT KiCad library spanning VCO, ladder and Sallen-Key VCFs, VCA, triple PT2399 delay, noise and utilities |
| 4 | [kweiwen/vermiliad](https://github.com/kweiwen/vermiliad) | `REF_PASS` | Licensed, built Raspberry Pi/WM8731 mixed-signal module with MCP3008 CV input and analog vactrol wet/dry path |

The pinned b:art Dual SSI2130 VCO Core remained a selected similarity anchor only. Befaco Pony VCO was rejected as too similar to that anchor, and all 2026-08-31 ranked items remained inside their repeat window.

## Ranked projects

### 1. Cleveland Music Co. Open Source Pedals — `STRONG_PASS`

- Canonical source: [open-source-pedals repository](https://github.com/clevelandmusicco/open-source-pedals)
- Primary focus reviewed: [The Why](https://github.com/clevelandmusicco/open-source-pedals/tree/main/the-why) and [The Heights](https://github.com/clevelandmusicco/open-source-pedals/tree/main/the-heights)
- Discovery lane: OSHWA/link-directory traversal plus artifact-led pedal search
- Reviewed revision: `d128145407931f273000ef2ec0bb7d3c7c7a1ada` (2026-01-02)
- Topology: The Why is a modern SMT implementation of the four-transistor Big Muff family with two diode-clipping stages and passive tone shaping; The Heights is a medium-gain op-amp overdrive with interactive gain/voice and passive treble roll-off. The same repository also supplies the three-board Daisy Seed Hothouse platform.

#### Documented facts

- The repository explicitly publishes its hardware under CC BY-SA 4.0 and states that sharing, modification and commercial manufacture are allowed subject to attribution and ShareAlike. Branding and artwork are excluded.
- Eagle `.sch`, `.brd` and project-library files are accompanied by PDF/PNG schematics, fabrication ZIPs, JLCPCB BOM/CPL files, and verified enclosure drill templates. The author says the BOM/CPL and drill assets were used for real production.
- The Why includes a fabrication ZIP, placement file, a David Gilmour-style BOM, through-hole completion guidance and photographs. Its author reports at least five successful builds using the source.
- The Heights includes its editable board/schematic/library, schematic renders, Gerbers, BOM/CPL and a tested Tayda drill template.
- Most passives are SMT; electrolytics, potentiometers, LEDs, switches and some optional tone capacitors remain through-hole. The documentation names C0G/NP0 signal-path capacitors where practical.
- No quantitative noise, frequency-response, current-consumption, clipping-transfer, EMI or environmental data were found.

#### Source completeness and license

`STRONG_PASS`: the combination of editable design source, public schematic, BOM/placement, tested fabrication outputs, mechanics, explicit commercial hardware licensing and repeated production evidence is exceptional. The lane is not a blanket endorsement of every directory: Superior still marks I/O and switching/filter documentation “coming soon,” while Hothouse is a mixed-signal platform rather than an analog effect.

#### Engineering inference

- The Why's high cumulative gain and hard clipping make BJT current gain, diode forward voltage and capacitor dielectric/tolerance audible design variables. Its BOM is a reproducible starting point, not a guarantee that alternate Muff variants will share level, noise or tone.
- A quiet half-supply reference, short return paths and local rail decoupling are important because four gain stages can turn bias/reference contamination into hum or oscillation.
- JLCPCB placement data materially reduce assembly burden, but substitute-part parasitics and transistor gain bins can shift clipping symmetry and noise. A production adaptation should characterize several assembled units rather than trust nominal values.
- Pedal I/O, bypass switching, reverse-polarity protection, ESD and supply surge behavior are system-level concerns; the effect PCB alone does not establish them.

#### Layout, power, grounding, noise and thermal risks

- High-impedance input nodes and the first transistor stage should be isolated from LED/switch current loops and DC/DC supplies. Enclosure/chassis grounding and jack returns determine real-world hum performance.
- Dense SMT is favorable for short loops but makes flux residue and leakage more relevant near high-impedance bias nodes. The large through-hole electrolytic and board-mounted pots create mechanical stress points.
- The clipping transistors dissipate little power, so temperature rise is not a primary risk; device-to-device temperature coefficient and hFE spread are more relevant than self-heating.

#### Parts and assembly

MMBT3904-class transistors, small-signal diodes, commodity op amps and passives are broadly replaceable, but exact JLCPCB stock was not audited. A preassembled SMT board leaves only four through-hole parts on The Why, while hand assembly of 0603/0805/1206 parts is intermediate work. Eagle 9.6.2 is proprietary but the preferred editable format is present.

#### Adaptation ideas

1. Turn The Why into a digitally recallable analog fuzz by using relays or low-leakage analog switches for capacitor/diode networks and a motorized or digitally sensed control layer.
2. Add test pads and a factory fixture for bias points, gain, idle current, noise, oscillation and sweep response.
3. Port the boards to KiCad while retaining reference designators and publish alternate, measured BOM personalities.
4. Reuse Hothouse's split I/O/switching architecture around an analog core, keeping digital and LED returns away from the first gain stage.

#### Unresolved assumptions

- Unit-to-unit distributions, EMC/ESD robustness and power-fault behavior are undocumented.
- The rights to historical circuit ideas and trademarks are distinct from the explicit license on this implementation; branding restrictions must be respected.
- Fabrication files are stated to be tested with JLCPCB; equivalence at other fabs is unverified.

### 2. kzalesak/Digisynth — `PASS`

- Canonical source: [Digisynth repository](https://github.com/kzalesak/Digisynth)
- Discovery lane: low-SEO open-hardware directory and 40106/noise-instrument search
- Reviewed revision: `73e7ea6c78ff8c09ca64c407e824b03fa318ad8e` (2021-11-09)
- Topology: two CD40106 Schmitt-inverter RC oscillators with switchable capacitor/resistor controls, light/resistive inputs, oscillator sync, square and capacitor-node triangle-like outputs, passive selection/mixing, output divider and power-decay effects from a selectable reservoir capacitor.

#### Documented facts

- The project states TAPR Open Hardware License coverage and invites PCB reproduction and experimentation.
- Editable KiCad 5 schematic, PCB, cache/library and project files are present with ready Gerber/drill outputs.
- The long manual explains the oscillator, parallel capacitance/resistance behavior, photoresistor and touch/pencil/water control, passive mixer, stereo routing, sync, square/triangle access and decay effect.
- A completed instrument photograph and oscilloscope examples provide build and waveform evidence.
- The output divider is described as reducing the roughly 9 V logic signal to about 1 V. The design intentionally has no ultrasonic output filter.
- No consolidated BOM, calibration procedure, enclosure file, current measurement, noise/THD data or formal output-load/protection specification was found.

#### Source completeness and license

`PASS`: circuit source, editable EDA, Gerbers, explicit hardware license, build evidence and unusually strong operating documentation are present. It falls short of `STRONG_PASS` because production parts/mechanics, calibration and quantitative safety/electrical testing are absent.

#### Engineering inference

- CD40106 thresholds, supply voltage, capacitor leakage and resistor/LDR variation dominate frequency. This is intentionally an experimental sound source, not a temperature-stable or volt-per-octave oscillator.
- A passive mixer can couple oscillators and make amplitude or tuning interaction part of the sound. Buffering would improve predictability but change that behavior.
- Fast CMOS edges and unfiltered ultrasonic operation can create aliasing, RF emissions and potentially stress or annoy downstream transducers. A switchable low-pass/output buffer is prudent outside a workshop context.
- Exposed resistive controls should use current limiting and ESD protection if adapted for public or repeated use.

#### Layout, power, grounding, noise and thermal risks

- Keep timing capacitors and high-impedance inverter inputs away from output-edge return currents. Provide close IC decoupling and a controlled audio-return path.
- Battery droop deliberately changes behavior; a regulated supply will change both pitch and decay effects. Document the intended source impedance before redesign.
- RC oscillators are thermally and process sensitive, but self-heating is small. LDR aging, illumination geometry and component tolerance are larger repeatability risks.

#### Parts and assembly

The CD40106, passives, pots, jumpers and generic photoresistors make the core accessible. LDR availability and light response vary by region and chemistry. The single-board mixed through-hole build is approachable; importing old KiCad files and sourcing exact mechanical controls are the likely friction points.

#### Adaptation ideas

1. Add a buffered active mixer, selectable anti-ultrasonic filter, AC-coupled protected output and level standardization.
2. Measure both oscillators with a small MCU and select capacitor banks or digital-pot trims for saved coarse tunings while leaving the sound path analog.
3. Replace exposed touch pads with protected resistive/CV interfaces and add a patchable sync matrix.
4. Publish a classroom BOM, enclosure and acceptance test while preserving the TAPR-OHL source path.

#### Unresolved assumptions

- The exact Gerber revision corresponding to the pictured build is not version-tagged.
- Output behavior into headphones, line inputs and powered speakers is not characterized.
- Current draw, battery life, ESD survival and ultrasonic amplitude are unknown.

### 3. MatthewATaylor/Modular-Synth-Hardware — `REF_PASS`

- Canonical source: [Modular-Synth-Hardware repository](https://github.com/MatthewATaylor/Modular-Synth-Hardware)
- Discovery lane: curated Eurorack directory followed by artifact-tree inspection
- Reviewed revision: `ab299e307ce4d1542d4d570eaacfb3e2dfcfec2e` (2022-05-25)
- Topology: Thomas Henry VCO-1-derived oscillator with triangle/sine/PWM/saw and linear/exponential FM; Moog-style transistor-ladder VCF; René Schmitz MS-20-style Sallen-Key VCF; YuSynth-derived dual VCA; triple PT2399 delay; white-noise source; DC mixer; power and control utilities.

#### Documented facts

- A repository-level MIT license is present.
- Module directories contain editable hierarchical KiCad schematics and PCB source, panel PCBs, and CSV/XML parts exports. Public schematics therefore satisfy the promotion gate.
- The VCO documents LFO/audio ranges and four waveforms; the VCF documents resonance-CV and resonance-level compensation; the delay exposes individual and master delay-time CV plus daisy chaining.
- The project names upstream design sources in module READMEs.
- No Gerber release, assembly manual, calibration procedure, completed-hardware photograph, audio demonstration or quantitative measurements were located.

#### Source completeness and license

`REF_PASS`: it is a rare broad, editable and explicitly licensed analog system source. The grade is capped because build state is undocumented and the MIT file does not, by itself, resolve whether every upstream-derived circuit and imported artifact can be relicensed under MIT. Reusers should audit each named lineage.

#### Engineering inference

- The VCO will depend on matched/thermally coupled exponential-converter devices, timing-capacitor stability and a documented trim sequence that is currently missing.
- A transistor ladder needs device matching and headroom checks; resonance and DC behavior can vary materially with transistor spread and supply/reference errors.
- Three PT2399 clocks plus CV control create a strong clock-feedthrough and supply-noise problem. Separate local 5 V regulation/filtering, clock-current returns and audio reconstruction filtering should be treated as core design work.
- CSV/XML exports are useful parts evidence but are not a released purchasing BOM with manufacturer part numbers and substitutions.

#### Layout, power, grounding, noise and thermal risks

- The oscillator's expo pair and temperature-sensitive elements need controlled thermal placement and isolation from regulators, LEDs and warm digital delay devices.
- Ladder-filter currents, PT2399 clock returns and noise-generator avalanche current should not share sensitive VCO/VCF reference paths.
- Panel PCBs help mechanics, but connector keying, reverse-power protection, module current and inter-board grounding are not summarized.

#### Parts and assembly

TL07x-class op amps, discrete transistors and PT2399 devices remain widely obtainable, but PT2399 clone quality and exact transistor matching need screening. Multiple boards, panel alignment and analog calibration make the collection intermediate-to-advanced. There is no verified turnkey fabrication package.

#### Adaptation ideas

1. Select one module at a time, resolve its source lineage, generate versioned Gerbers/BOMs and build a measured reference unit.
2. Add DAC trim and stored calibration to the VCO, logging rails and temperature during automated octave sweeps.
3. Respin the triple delay with isolated 5 V islands, synchronized or deliberately decorrelated clocks, and measured anti-alias/reconstruction filters.
4. Create a common Eurorack power/grounding standard and automated acceptance fixture across the library.

#### Unresolved assumptions

- No current revision is proven built.
- Upstream licensing compatibility is unresolved module by module.
- Noise, THD, crosstalk, cutoff/pitch tracking, supply current and thermals are undocumented.

### 4. kweiwen/vermiliad — `REF_PASS`

- Canonical source: [Vermiliad repository](https://github.com/kweiwen/vermiliad)
- Discovery lane: mixed-signal CV/codec search via independent project directories
- Reviewed revision: `b9daeeec4dc1172ccad69e1a20fd4d9d4724a5eb` (2023-12-08)
- Topology: Raspberry Pi real-time Pure Data processor with WM8731 I²S codec adapter, MCP3008 SPI CV acquisition through op-amp range translation, Eurorack-level input/output conditioning, and vactrol-controlled analog dry/wet mixing.

#### Documented facts

- The README explicitly licenses hardware CC BY-SA 3.0 and code MIT.
- Editable Eagle adapter and motherboard schematics/boards, PDF schematics, Illustrator panel source, MCP3008 C++ code and Pure Data patches are public.
- Hardware photographs, board renders and demonstration videos show talk-through, pitch-shifting echo and granular feedback-delay-network processing.
- The author reports replacing a Python/UDP CV path with C++, reducing stated memory/CPU load and reaching an approximately 0.1 ms acquisition loop; this is author-reported software-loop performance, not end-to-end audio/CV latency.
- No BOM, Gerbers, assembly package, calibration sequence, codec performance measurements, CV input limits or current budget were found.

#### Source completeness and license

`REF_PASS`: explicit hardware/software licenses, editable board source and working hardware clear the basic gate. Missing fabrication/parts releases, stale platform assumptions and absent electrical characterization keep it in reference status.

#### Engineering inference

- Pi processor, SPI and I²S currents beside codec and CV conditioning can couple clocks into audio and control signals. Partitioned returns, codec-local low-noise regulation and measurement under CPU/storage load are essential.
- MCP3008 accuracy, reference noise and op-amp offset constrain control repeatability. Input protection and calibrated gain/offset are required for arbitrary Eurorack CV.
- Vactrol dry/wet control provides galvanically simple analog gain variation but brings large device spread, hysteresis, aging and slow response; preset recall will be approximate unless closed-loop measured.
- The old kernel/board bring-up path may not work unchanged on current Raspberry Pi hardware.

#### Layout, power, grounding, noise and thermal risks

- Keep codec analog ground and anti-alias nodes away from Pi, SPI and regulator switching loops; join domains at a deliberate return point.
- Raspberry Pi thermal load and supply bursts can modulate shared rails. Brownout, startup pops, rail sequencing and SD-card activity need bench capture.
- Eurorack-level conversion must tolerate patching transients and out-of-range bipolar CV; the published overview does not establish protection limits.

#### Parts and assembly

Raspberry Pi availability is much better than during earlier shortages, but exact model/kernel compatibility was not requalified. WM8731 packages, vactrols and board-to-board mechanics create more sourcing risk than MCP3008 or generic op amps. Fine-pitch codec assembly and mixed-signal bring-up are advanced without a BOM or fabrication release.

#### Adaptation ideas

1. Port to a current compute module and modern supported codec while preserving the split adapter/motherboard architecture.
2. Add precision ADC/reference, protected CV inputs, per-channel DAC trims and nonvolatile calibration.
3. Replace or close-loop the vactrol with a characterized VCA/crossfader for repeatable presets.
4. Publish latency, noise, THD+N, crosstalk, CV gain/offset and power-transient tests under worst-case DSP load.

#### Unresolved assumptions

- Current kernel/I²S compatibility and end-to-end latency are unverified.
- No quantitative proof separates audio-clock, Pi-supply and analog-front-end performance.
- Fabrication reproducibility, vactrol substitution and protection margins are unknown.

## Foundation update

### Sound Semiconductor EVB2190 — `FOUNDATION_UPDATE`

- Primary source: [EVB2190 SSI2190 Evaluation Board User Guide](https://www.soundsemiconductor.com/downloads/evb2190.pdf), Rev. 1.0, March 2025
- Device source: [SSI2190 data sheet](https://www.soundsemiconductor.com/downloads/ssi2190datasheet.pdf), Rev. 2.0, December 2024
- Topology: six independent differential OTA inputs with individual control voltages summed to the SSI2190 mix output, followed by an inverting output stage; headers expose audio, external CV, reference and feedback experiments.

Documented facts: the guide publishes a full schematic, through-hole-oriented BOM, connector map and ±12 V bench setup. The SSOP SSI2190 is the only surface-mount component on the evaluation board. The data sheet specifies six voltage-controlled mixer channels and shows digitally assisted trim/control use, including DAC-driven CV applications.

Engineering inference: the board is a high-value starting point for panners, morphing mixers, preset routing and multi-channel analog automation. Summing headroom, CV-DAC noise, reference return impedance, channel crosstalk, control feedthrough and output-op-amp stability should be measured before shrinking it. A bipolar DAC or filtered PWM/ΣΔ control layer could provide stored level/routing presets while keeping the signal path analog.

Unresolved assumptions: the documents are copyrighted manufacturer references, not an open-hardware license. No editable EDA, fabrication package, independent build report or board-level noise/THD/crosstalk data was found. It is not ranked as an open-source project.

## HOLD, rejected and duplicate pool

| Candidate | Disposition | Reason |
|---|---|---|
| [jypma/modsynth](https://github.com/jypma/modsynth) | HOLD | Excellent KiCad/KiBot/BOM/build package for AS3340, PT2399, VCA, VCF and mixers, but no repository-wide hardware license; several modules have upstream lineage requiring separate rights checks |
| [DIY Synth Manila PT2399 Delay](https://github.com/DIYSynthMNL/Eurorack-PT2399-Delay) | HOLD | Recent built KiCad project with calibration, Falstad and STL, but explicitly no license, BOM or Gerbers; documentation flags R24 as 100 kΩ on the board versus 220 kΩ in the title note |
| [OpenCEM3340](https://github.com/xnotox/CEM3340) | HOLD | OSHWA record and extensive Proteus schematic/Gerber/BOM assets exist, but the certification says hardware license “Other” and no clear repository LICENSE was found |
| [Synthex VCF](https://certification.oshwa.org/de000003.html) | HOLD | OSHWA-certified lead, but the Bitbucket primary source did not render reliably enough for artifact inspection |
| [Befaco Crush Delay V3](https://www.befaco.org/crush-delay-v3/) | RESTRICTED_REF | Feature-rich manufactured PT2399 design with schematic/BOM/manual, but Befaco's [licensing policy](https://www.befaco.org/licensign/) is CC BY-NC-SA and no editable EDA was found |
| [Befaco Pony VCO](https://www.befaco.org/pony-vco/) | DUPLICATE | SSI2130 VCO is too close to the pinned b:art Dual SSI2130 VCO Core; retained only as a comparison source |
| [Befaco Pony VCF](https://www.befaco.org/pony-vcf/) | REJECT | Useful SSI2144 product/manual lead, but no public schematic link was found on the project page, so it fails the promotion gate |
| [zero-emission/Eurorack 4×3 Matrix](https://github.com/zero-emission/Eurorack) | HOLD | Built editable mixer source and BOM, but repository GPL-3.0 and design-file CC BY-SA notices create hardware-license ambiguity |
| [polykit/microphone-preamp](https://github.com/polykit/microphone-preamp) | HOLD | INA217/phantom KiCad, BOM, Gerbers and photo are useful; no explicit license found |
| [polykit/adsr-3310-8](https://github.com/polykit/adsr-3310-8) | HOLD | Eight-channel AS3310/CEM3310 envelope hardware is unusually relevant, but no license and no completed BOM/measurement set were found |
| [atepn24-lab/Modular-Analog-Synthesizer](https://github.com/atepn24-lab/Modular-Analog-Synthesizer) | REJECT | Author reports only sequencer and wavefolder working; VCO/VCF/VCA failures plus no hardware license block promotion |
| [ohmbre/ohmbre](https://github.com/ohmbre/ohmbre) | HOLD | Public schematic/PCB and panel lead, but no explicit hardware license found |
| [Triton Delay](https://www.freestompboxes.org/) | HOLD | Forum snippets indicate downloadable open files, but the primary forum/artifacts remained inaccessible; discovery signal only |
| 2026-08-31 ranked set | DUPLICATE | 3374-VCO, ThatMicPre, Schräg, Open80017a and AN703 remain ineligible until 2026-09-30 absent material revisions |
| 2026-08-24 chat-published set | DUPLICATE | Pathos, TouchTone555, Fihdi SVF12 and MiniDrumkit were not reused inside 30 days |

## Discovery audit

### Coverage

- Profile: `weekly_deep`.
- Candidate pool: 24 plausible projects or manufacturer foundations were logged before ranking; four ranked and one foundation update survived.
- Domains searched: 34 distinct domains; 28 (82%) were outside GitHub. These included `gitlab.com`, `codeberg.org`, `sr.ht`, `bitbucket.org`, `hackaday.io`, `modwiggler.com`, `synth-diy.org`, `electro-music.com`, `diystompboxes.com`, `freestompboxes.org`, `forum.pedalpcb.com`, `lookmumnocomputer.discourse.group`, `sdiy.info`, `certification.oshwa.org`, `befaco.org`, `soundsemiconductor.com`, `thatcorp.com`, `alfatriode.lv`, `princeton.com.tw`, `eddybergman.com`, `nonlinearcircuits.com`, `electricdruid.net`, `northcoastsynthesis.com`, `diysynthmnl.github.io`, `russellmcc.com`, `circuitsalad.com`, `scholars.unh.edu`, `wiki.makervan.de` and `github.com`.
- Source classes: repository hosts, alternative-forge profiles, specialist forums, mailing-list archives, personal engineering sites, project hubs, OSHWA certification records, link/RSS directories, manufacturer application notes/evaluation boards, university pages and legacy/self-hosted downloads.
- Query families: topology/component; PT2399/BBD/OTA; artifact-led schematic/KiCad/BOM/Gerber; explicit hardware-license/OSHWA; mixed-signal calibration/DAC trim/preset control; alternative-forge host-specific; forum/lineage/backlink; manufacturer application-note/evaluation-board.

### Due-source revalidation

- 58 due dynamic registry pages were rechecked and updated to `last_verified=2026-09-07`; no threshold-crossing status change occurred.
- `modwiggler.com`, `electro-music.com`, `diystompboxes.com`, several `sdiy.info` directories, Sandelinos and DMME remain `degraded`.
- `codeberg.org`, `sr.ht` and `freestompboxes.org` remain `blocked_by_tool` after non-retryable direct-access failures. Indexed results were treated as leads only.
- Eddy Bergman, Look Mum No Computer, Hackaday, GitLab, Befaco, Nonlinear Circuits, DIY Synth Manila and primary manufacturer hubs retained `active` after direct or indexed current-page checks.

### Registry additions

Ten reusable page-level sources were added:

1. Cleveland Music Co. open-source pedals repository.
2. kzalesak/Digisynth repository.
3. MatthewATaylor modular-hardware collection.
4. kweiwen/Vermiliad mixed-signal platform.
5. newdigate/eurorack-awesome curated directory.
6. jypma/modsynth fabrication-rich module collection.
7. SSI EVB2190 evaluation-board guide.
8. Befaco Crush Delay V3 project/document page.
9. DIY Synth Manila PT2399 Delay repository.
10. OpenCEM3340 OSHWA certification record.

### Post-shortlist lanes and stopping rule

1. Manufacturer/application-note lane: SSI2190/SSI2131/SSI216x plus THAT2162/2180/4305 resources were searched. It produced the EVB2190 foundation update but no newly licensed open-hardware project.
2. Alternative-forge/PT2399/BBD lane: GitLab, Codeberg, SourceHut and Bitbucket were searched independently. It produced no promotable candidate; Codeberg and SourceHut remained blocked, and reachable GitLab/Bitbucket leads failed license or primary-artifact verification.

The profile floors were exceeded. The two independent post-shortlist batches produced no additional publishable project, satisfying the diminishing-return stopping rule.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
clevelandmusicco/open-source-pedals,STRONG_PASS,2026-09-07,2026-09-07,2026-10-07,published,CC-BY-SA production pedal sources with editable Eagle full fabrication and assembly files enclosure mechanics repeated builds and explicit commercial reuse
kzalesak/Digisynth,PASS,2026-09-07,2026-09-07,2026-10-07,published,TAPR-OHL CD40106 pocket synth with editable KiCad Gerbers built photo and extensive circuit manual; no consolidated BOM calibration or measurements
MatthewATaylor/Modular-Synth-Hardware,REF_PASS,2026-09-07,2026-09-07,2026-10-07,published,MIT KiCad VCO VCF VCA PT2399 noise and mixer collection with parts exports; build evidence fabrication release measurements and upstream license audit remain absent
kweiwen/vermiliad,REF_PASS,2026-09-07,2026-09-07,2026-10-07,published,CC-BY-SA mixed-signal Raspberry Pi WM8731 MCP3008 and vactrol platform with Eagle and build demos; BOM Gerbers calibration and current bring-up missing
Sound Semiconductor/EVB2190,FOUNDATION_UPDATE,2026-09-07,2026-09-07,2026-10-07,published,March 2025 SSI2190 six-input voltage-controlled mixer evaluation board with schematic BOM and user guide; copyrighted reference without editable EDA or open-hardware license
```

### `data/selected-projects.csv`

```csv
clevelandmusicco/open-source-pedals,https://github.com/clevelandmusicco/open-source-pedals,selected,digest_ranked,"Analog,Pedal,Daisy Seed","fuzz,overdrive,mixed-signal,eagle,gerbers,bom,cpl,enclosure,production,open-hardware",Production-used commercial-friendly pedal sources combine rare electrical manufacturing and mechanical completeness,Mine production analog effects for characterized component variants factory tests digitally recallable switching and mixed-signal I/O partitioning,verified,CC BY-SA 4.0 hardware; branding excluded; Superior daughterboard documentation is incomplete
kzalesak/Digisynth,https://github.com/kzalesak/Digisynth,selected,digest_ranked,"CD40106,9V","lunetta,rc-oscillator,noise-instrument,kicad,gerbers,tapr-ohl,workshop",Build-proven low-cost instrument pairs modifiable source hardware with unusually clear circuit teaching documentation,Find simple analog sound generators that can gain safe outputs measured limits and optional digital tuning assistance,verified,TAPR OHL; no consolidated BOM enclosure calibration or quantitative measurements
MatthewATaylor/Modular-Synth-Hardware,https://github.com/MatthewATaylor/Modular-Synth-Hardware,selected,digest_ranked,"Analog,Eurorack,PT2399","vco,vcf,vca,delay,noise,mixer,kicad,mit",Broad editable analog module library exposes reusable cores and panel-level integration in one source tree,Select individual cores for lineage audit measured builds fabrication releases grounding standards and DAC-assisted calibration,needs_license_check,MIT repository; upstream-derived module rights and present build state need per-module verification
kweiwen/vermiliad,https://github.com/kweiwen/vermiliad,selected,digest_ranked,"Raspberry Pi,WM8731,MCP3008","mixed-signal,codec,cv-input,vactrol,pure-data,eagle,open-hardware",Built licensed platform demonstrates a practical analog CV and wet-dry shell around programmable Linux DSP,Find digitally assisted analog audio platforms with protected calibrated CV quiet clock partitioning repeatable VCAs and preset control,verified,Hardware CC BY-SA 3.0 and code MIT; no BOM Gerbers calibration measurements or current kernel bring-up
```

## Next-run search debt

1. Find a fabricated, licensed SSI2100 + SSI2162 compandor with editable PCB source and measured compressor/expander tracking.
2. Search non-GitHub digitally assisted analog calibration: bipolar DAC trims, autotune fixtures, per-voice NVM, closed-loop vactrol/VCA control and production test.
3. Seek a licensed open SSI2190 project with editable EDA, DAC-controlled routing and measured noise/crosstalk/headroom.
4. Recheck Open80017a v0.2, Schräg attenuverter correction, MAMUT hardware progress and UNH editable-source availability only for material revisions.
5. Resolve jypma module-lineage licenses, OpenCEM3340's “Other” OSHWA license and Synthex VCF's inaccessible Bitbucket artifacts.
6. Target personal-language/legacy lanes for BBD chorus/phaser, drum voices and SSI2140/2144 filters with build measurements rather than more schematic-only repositories.
