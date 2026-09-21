# Weekly Analog Audio Mine — 2026-09-21

Profile: `weekly_deep`  
Operational authority: current repository rules, trackers, recent digests and accessible weekly history  
Previous questionnaire feedback applied: none.

## Outcome

Four projects cleared the public-schematic, explicit-license, primary-artifact and 30-day anti-repeat gates. They span a complete CMOS teaching/performance instrument, a broad build-proven 5U analog system, a current university analog kick module and a tested SSI2130 VCO core. The pinned b:art Dual SSI2130 VCO Core was used only as a selected similarity anchor.

| Rank | Project | Lane | Why it matters |
|---:|---|---|---|
| 1 | [SCLW CMOS Synthesizer](https://github.com/SCLW/CMOS_Synthesizer) | `STRONG_PASS` | Complete CC BY logic instrument with editable EDA, Gerbers, BOM, mechanics, assembly material and repeated university workshop/performance builds |
| 2 | [JordanAceto/angelo_modular](https://github.com/JordanAceto/angelo_modular) | `PASS` | Rare whole-system 5U reference covering three VCO variants, filters, VCA, envelopes, noise, S&H, wavefolder, ring mod, utilities and power |
| 3 | [PoliTeK/PoliKick](https://github.com/PoliTeK/PoliKick) | `PASS` | Built, current university analog kick with bridged-T core, pitch envelope/CV, accent, tone, distortion, simulation and mechanical artifacts |
| 4 | [JordanAceto/SSI2130_VCO](https://github.com/JordanAceto/SSI2130_VCO) | `PASS` | Tested four-layer SSI2130 core with through-zero FM, sync, PWM and manufacturing outputs |

## Ranked projects

### 1. SCLW CMOS Synthesizer — `STRONG_PASS`

- Canonical source: [SCLW/CMOS_Synthesizer](https://github.com/SCLW/CMOS_Synthesizer)
- Discovery lane: university/lab project plus artifact-led CMOS instrument search
- Reviewed state: hardware v2 Rev B completed in May 2024; documentation release `v1.0.0` dated 2026-05-15
- Topology: eight CD4093 gated oscillators, four CD40106 sensor/master-clock oscillators, CD4070 XOR modulation, CD4051/CD4053 routing, CD4024 dividers, CD4022 sequencer, CD4018 odd dividers, a 24-stage CD4094 LFSR noise/pattern generator and an LM358 four-channel mono mixer.

#### Documented facts

- The complete project is explicitly licensed CC BY 4.0. It publishes editable Eagle schematic/board sources, section-level PDF schematics, a Gerber archive, BOM with supplier references, DXF/SVG/AI mechanics, photographs, assembly documentation and a versioned archival DOI.
- The university project records many physical units used in workshops and performance since 2024. This is considerably stronger build evidence than a single untested board render.
- The instrument accepts 9–18 V single-supply power, with 9–12 V recommended. The documented typical mono output is about 4 Vpp; the mixer provides master attenuation.
- The LFSR can enter an all-zero lock state. The repository supplies a separate CD4068/CD4070/CD4077 deadlock-prevention board and explicitly requires it for reliable operation.
- No published noise, THD, output-headroom, current-consumption, crosstalk or fan-out characterization was found.

#### Source completeness and license

`STRONG_PASS`, license status `verified_open_hardware`: circuit source, editable PCB, fabrication output, BOM, mechanics, documentation, repeat builds and permissive reuse evidence are all present. The mandatory LFSR correction is public rather than hidden as undocumented rework.

#### Engineering inference

- Fast CMOS edges, patch-wire loops and a large shared two-layer ground/power structure can inject clocks into oscillator control, LFSR and mixer nodes. Some bleed may be musically desirable, but production reuse should distinguish intentional cross-modulation from supply and ground coupling.
- The LM358 output stage on a single supply constrains high-frequency large-signal performance and clean headroom. A rail-to-rail or dual-rail audio stage would be preferable when interfacing modular-level bipolar signals.
- A 24-stage shift register, divider chains and multiple free-running oscillators create simultaneous switching current. Local decoupling, separated logic/audio return paths and a buffered external output are more important than the low nominal audio bandwidth suggests.

#### Layout, power, noise, thermal and assembly risks

- The approximately 278 × 186 mm two-layer board has long routes and many panel controls. Keep oscillator/clock returns out of the mixer summing reference and avoid routing sensor inputs beside the shift-register clock.
- Power entry needs polarity protection, a defined regulator/filter strategy and measured worst-case current over 9–18 V. CMOS thermal load is modest, but oscillator drift and logic thresholds can move with supply and temperature.
- Parts are mainstream 4000-series CMOS, LM358, 0805 passives and through-hole controls. Component availability is good; assembly burden is medium-high because the board and control count are large.

#### Adaptation ideas

1. Split the logic engine and audio mixer onto separately filtered rails, add buffered ±12 V-compatible I/O and publish idle/active spectra and crosstalk matrices.
2. Treat the oscillator/divider/LFSR fabric as a reusable patchable control/noise subsystem for analog VCO, VCF and drum voices.
3. Add digitally stored routing with protected analog switches while keeping direct patching as the deterministic fallback.
4. Integrate the deadlock detector into a revised main PCB and add a factory-test header for clocks, LFSR state and mixer channels.

#### Unresolved assumptions

- The Gerber archive and editable Eagle revision were not independently netlist-compared in this run.
- Output impedance, overload recovery, patch-point voltage limits and protection are not summarized numerically.
- The behavior of workshop builds over the full 9–18 V range is not quantitatively documented.

### 2. JordanAceto/angelo_modular — `PASS`

- Canonical source: [angelo_modular](https://github.com/JordanAceto/angelo_modular)
- Discovery lane: whole-system analog architecture and under-indexed personal hardware repositories
- Reviewed revision: repository head dated 2020-08-13
- Topology: twelve custom 5U modules: three CEM/AS3340 VCO variants, a voltage-controlled wavefolder/ring modulator, plug-in filter carrier, dual late-MS20 VCF, MIDI/CV plus audio input, dual DC mixer, VC LFO/noise/S&H source, dual Serge-style slope generator, dual STM32F405 ADSR, dual VCA and ±12 V supply.

#### Documented facts

- The repository is explicitly CC BY 4.0 and includes 47 editable KiCad schematic sheets, 14 PCB designs, 13 BOMs, 16 fabrication archives, individual manuals, calibration instructions, module current budgets and photographs of the complete instrument.
- VCO documentation includes tempco adjustment at test points, scale adjustment over roughly 30–500 Hz and high-frequency tracking trim. Other manuals cover filter self-oscillation, LFO/noise setup and module-specific bring-up.
- Representative documented rail loads include dual MS20 VCF at about +55/−55 mA, dual VCA at +25/−25 mA, dual slope at +35/−20 mA and dual digital ADSR at +70/−15 mA.
- Several revisions require explicit rework: reversed power-entry headers on two VCO boards, a pulse-width trace/via fault, cuts/jumpers on a dual-range VCO, added saw-spike capacitors, a modulation timing-capacitor footprint workaround and a filter-feedback potentiometer substitution.
- No current panel-CAD package or quantitative system noise, THD, crosstalk, tracking/temperature or power-supply rejection data was found.

#### Source completeness and license

`PASS`, license status `verified_open_hardware`: the system is built, licensed, documented and fabrication-rich. It is not `STRONG_PASS` because multiple published board sets have safety or functional rework and no corrected consolidated release exists.

#### Engineering inference

- The reversed power headers are high-consequence faults. Fabrication should start from corrected PCB sources, not the present Gerbers plus assembly-time memory of cuts and jumpers.
- The analog/digital ADSR, MIDI interface and shared ±12 V distribution need deliberate return-current control to prevent MCU and display activity from entering VCO/VCF references.
- A complete build has substantial cumulative current and connector count. Rail distribution, fuse protection, module-keying and worst-case startup should be treated as a system design rather than repeated per-module assumptions.

#### Layout, power, noise, thermal and assembly risks

- AS3340/CEM3340 and AS3320/CEM3320 substitutions need device-specific bias, waveform and stability checks. SSI2164/AS2164 filter/VCA options require thermal and control-feedthrough characterization.
- Parts remain broadly obtainable, but matched/temperature-sensitive oscillator parts, obsolete originals and the STM32F405 add sourcing and assembly tiers.
- The system is an advanced build: many PCBs, front-panel wiring, calibration steps and documented modifications make assembly error more likely than for a single-module reference.

#### Adaptation ideas

1. Correct and tag the PCB revisions, add keyed power headers and regenerate a reproducible manufacturing release.
2. Reuse the VCO/filter plug-in-card interfaces as a controlled comparison bed for AS3340, SSI2130, AS3320 and SSI2140 cores.
3. Add MCU frequency capture, bipolar DAC trims and EEPROM calibration to one oscillator while preserving the analog signal core.
4. Define a common factory-test connector and automated rail/current/audio tests for every module.

#### Unresolved assumptions

- The pictured complete system was not mapped board-by-board to every Gerber revision.
- Some filter and VCO circuits inherit established topologies; the CC BY repository license does not by itself prove rights in every antecedent design.
- Long-term power-header fixes and panel/mechanical reproducibility are not demonstrated.

### 3. PoliTeK/PoliKick — `PASS`

- Canonical source: [PoliTeK/PoliKick](https://github.com/PoliTeK/PoliKick); [PoliTeK university project page](https://politek.polito.it/projects/)
- Discovery lane: university/lab pages and current analog drum-voice search
- Reviewed revision: repository head dated 2026-07-22
- Topology: TR-808/Erica-EDU-derived fully analog kick with trigger conditioning, bridged-T resonator, pitch envelope and CV, accent, active low-pass tone shaping and switchable distortion.

#### Documented facts

- The repository README states MIT terms and publishes a circuit PDF, LTspice simulation, BOM with part numbers, PCB/panel archives, STEP/DXF mechanics, assembly manual and a photograph of the built module.
- It uses ±12 V, a TL074 plus common BC548/BC558 transistors and through-hole passives/controls. The documented trigger threshold is about 2.5 V; input and output resistances are listed as 100 kΩ and 1 kΩ. Pitch CV is explicitly not calibrated to 1 V/oct.
- The project page describes design, simulation and measurement activity, but the detailed technical report and quantitative plots were not found in the primary repository branch inspected.
- An obvious standalone Gerber release and directly inspectable editable PCB source were not identified; the project instead supplies compressed PCB/panel archives and manufacturing/mechanical outputs.

#### Source completeness and license

`PASS`, license status `stated_open_source_needs_scope_review`: the explicit MIT statement, public schematic, parts, simulation, physical build and mechanical/fabrication evidence clear the minimum gate. The classification is lower confidence than a repository with a dedicated hardware license file and explicit treatment of inherited circuitry.

#### Engineering inference

- Bridged-T pitch and decay interact, and the pitch envelope is sensitive to capacitor tolerance, leakage and transistor parameters. Unit-to-unit sound can vary even when every part is within ordinary tolerance.
- Accent, pitch CV and distortion can push the resonator/output chain into level-dependent behavior. Trigger amplitude and source impedance should be swept rather than validated at one logic level.
- Classic TR-808 and Erica EDU lineage warrants a careful rights and attribution audit before commercial reuse, despite the repository's MIT statement.

#### Layout, power, noise, thermal and assembly risks

- Keep the trigger edge and distortion switching returns away from the resonator node. Add test points for the conditioned trigger, pitch envelope, resonator and output filter.
- Current draw is documented only as below 100 mA rather than measured per rail. Thermal risk is low, but rail asymmetry and op-amp/transistor operating margins should be measured.
- Commodity through-hole parts make assembly relatively easy. Capacitor selection and pot mechanics matter more than fine-pitch soldering.

#### Adaptation ideas

1. Add DAC-controlled pitch, decay and drive with a per-unit calibration table while leaving the resonator entirely analog.
2. Publish tolerance Monte Carlo and measured sweeps for frequency, decay, accent gain, trigger threshold and temperature.
3. Release native EDA/Gerbers with test points, keyed power and a clarified hardware-license/lineage statement.

#### Unresolved assumptions

- The README's MIT statement may not clearly define hardware-documentation scope.
- PCB archive contents and correspondence to the photographed build were not independently reproduced.
- Noise, pitch repeatability, rail current and distortion spectra remain unquantified.

### 4. JordanAceto/SSI2130_VCO — `PASS`

- Canonical source: [SSI2130_VCO](https://github.com/JordanAceto/SSI2130_VCO)
- Discovery lane: modern synth IC and compact VCO-core search
- Reviewed revision: repository head dated 2022-06-04; repository marks the board tested and safe to order
- Topology: SSI2130 core with sine, triangle, saw and pulse outputs; three 1 V/oct inputs; through-zero linear FM conditioning around TL072, LM311 and 2N7002; selectable hard/soft sync and PWM.

#### Documented facts

- The repository is CC BY 4.0 and provides hierarchical editable KiCad, BOM, four-layer Gerbers, JLC assembly BOM/position files and a custom hand-solder footprint for the SSI2130 QFN.
- The board runs from ±12 V and documents approximately 30 mA per rail. It creates local ±5 V rails and uses LM4040 2.5 V/5 V references.
- The four-layer fabrication stack includes a dedicated inner ground layer. The repository publishes no carrier PCB, front panel, enclosure, calibration procedure or bench plots for tracking, drift, waveform distortion, noise, sync or FM linearity.
- The SSI2130 is a 4 × 4 mm QFN-32 at 0.4 mm pitch. The exposed pad must follow the manufacturer's electrical guidance and must not be treated as an automatic ground connection.

#### Source completeness and license

`PASS`, license status `verified_open_hardware`: circuit source, layout, BOM, assembly/fabrication files, explicit license and tested status are present. Missing mechanical integration and characterization keep it below `STRONG_PASS`.

#### Engineering inference

- Reference cleanliness, QFN thermal gradients and current-return placement will influence tuning and waveform behavior. The four-layer implementation is a sound starting point, but it does not replace temperature and supply sweeps.
- “Safe to order” proves basic hardware confidence, not 1 V/oct accuracy. A carrier must define trims, buffered output levels, CV protection, coarse/fine controls and a calibration workflow.
- The comparator/FET path for through-zero FM and sync can inject edges into the reference and analog ground unless carrier routing and decoupling are controlled.

#### Layout, power, noise, thermal and assembly risks

- Fine-pitch QFN plus a special exposed-pad requirement makes reflow, stencil control and inspection advisable. Hand assembly is possible but is not beginner-friendly.
- SSI2130 availability is specialized but current; TL072, LM311, 2N7002, LM4040 and 78L05/79L05-class parts are routine. Regulator thermal rise should be checked at the documented current.
- Preserve the reference, timing and waveform nodes from carrier digital traffic. Place frequency-counter or MCU capture buffers at the carrier edge rather than loading the core directly.

#### Adaptation ideas

1. Build a carrier with MCU frequency capture, bipolar DAC trims, temperature sensing and EEPROM-stored calibration coefficients.
2. Compare tracking, drift, FM and waveform purity directly against the pinned b:art Dual SSI2130 anchor under the same fixture.
3. Add a production test header and measured characterization for 20 Hz–20 kHz tracking, supply variation, thermal settling, sync and TZFM.

#### Unresolved assumptions

- The repository's output-amplitude wording is ambiguous and needs measurement at the final carrier connector.
- No evidence establishes long-term thermal tracking, batch spread or behavior at all modulation extremes.
- Exact SSI2130 exposed-pad assembly compliance was not verified from an assembled-board X-ray or thermal image.

## HOLD, rejected and duplicate pool

| Candidate | Disposition | Reason |
|---|---|---|
| [amesser-group/modular-fx](https://gitlab.com/amesser-group/modular-synth/modular-fx) | HOLD / `REF_PASS` candidate | Rare RP2040 four-channel sigma-delta/PDM mixed-signal effect with editable KiCad, firmware, simulations and a physical prototype; README says the initial prototype is still being built/tested, while BOM, Gerbers, consolidated license files and quantitative audio data are absent |
| [FAREKIND/VCO-SSI2131](https://github.com/FAREKIND/VCO-SSI2131) | REJECT / schematic gate | CC0 and a physical module are visible, but the repository listing exposes panel assets and photographs rather than the required public circuit/PCB source |
| [vitoria-b/little-angel-chorus](https://github.com/vitoria-b/little-angel-chorus) | HOLD / license | BBD chorus has editable KiCad, Gerbers and build evidence; no explicit reusable hardware license was found |
| [TG-Music Eagle projects](https://tg-music.neocities.org/src/content/eaglefiles) | HOLD / noncommercial lineage | Built BBD chorus/delay/phaser and other analog sources are downloadable under CC BY-NC 4.0, but commercial reuse is barred and clone lineage must be audited |
| [Mechlab Stereo Animator](https://www.mechlabindustries.com/eurorack-schematics/stereo-animator/) | HOLD / license | Built AS/SSI2164 stereo panner has schematic and BOM, but no explicit hardware license, PCB source, demonstration or measurement set |
| [clarionut/YuSynth-Panning-Mixer-Output](https://github.com/clarionut/YuSynth-Panning-Mixer-Output) | HOLD / license lineage | Useful editable implementation and photos, but explicit terms for this derivative were not verified |
| [clacktronics BYOM](https://github.com/clacktronics/EuroClack_BYOM_Modules) | HOLD / terms | Broad source permission is informal/nonstandard and upstream circuit lineage needs per-module audit |
| [Desval27/Invader](https://github.com/Desval27/Invader) | HOLD / untested | MIT SN76477 noise/drum design includes schematic, BOM and fabrication outputs but is explicitly untested |
| [DIYSynthMNL PT2399 Delay](https://github.com/DIYSynthMNL/Eurorack-PT2399-Delay) | HOLD / license | Excellent circuit analysis and public schematic, but no explicit license, PCB release, Gerbers or consolidated BOM |
| Sandelinos/Basari on Codeberg | HOLD / access | Analog kick/KiCad lead was indexed, but direct Codeberg access remained blocked; license and build status could not be verified at primary source |
| Toshi PT2399/BBD effects | HOLD / license | Strong self-hosted schematics, layouts and builds; explicit reusable hardware terms were not verified |
| [ArrestedLightning/mini-4ch-mixer](https://github.com/ArrestedLightning/mini-4ch-mixer) | HOLD / evidence | Circuit source exists, but license, tested build and measured performance did not clear the ranking gate |
| [Keuron/LinearVCA13700](https://github.com/Keuron/LinearVCA13700) | HOLD / evidence | Useful LM13700 VCA lead; fabrication, build, licensing and measurement evidence did not jointly clear the gate |
| `Polykit X1`, `Shmoergh Moduleur`, `Len42 VCO-2131`, `m0xpd/encore`, Fihdi modules and recent 2026-08-31/09-07/09-14 selections | DUPLICATE | Canonical trackers and recent digests keep them inside the hard 30-day window; no material revision justified an override |
| b:art Dual SSI2130 VCO Core | ANCHOR ONLY | Pinned project remained a comparison anchor, not a discovery |

## Discovery audit

### Coverage

- Profile: `weekly_deep`.
- Candidate pool: 24 plausible projects/foundations were logged before final ranking; four ranked.
- Domains searched: 36 distinct domains; 29 (81%) were outside GitHub. Coverage included GitLab, Codeberg, SourceHut, Hackaday.io, Mod Wiggler, SynthDIY/SDIY, electro-music, DIYStompboxes, FreeStompboxes, PedalPCB, Look Mum No Computer, personal engineering sites, OSHWA, university pages and manufacturer documentation.
- Source classes: repository hosts, alternative forges, specialist forums, mailing-list/legacy archives, personal engineering blogs, project/build hubs, self-hosted downloads, university/lab pages, certification records, curated link/RSS directories and manufacturer datasheet/application-note/evaluation-board hubs.
- Query families: SSI21xx/modern VCO; LM13700/OTA/VCA/VCF; BBD/PT2399/chorus/delay; drum/noise/percussion; mixer/panner/compressor/preamp; digitally assisted calibration/DAC/preset routing; artifact-led EDA/BOM/Gerber/license; alternative-forge/university/personal-site and lineage/backlink searches.

### Candidate ledger summary

The 24-candidate pool covered the four ranked projects plus modular-fx, FAREKIND SSI2131, little-angel chorus, TG-Music effects, Mechlab Stereo Animator, clarionut panner, Clacktronics BYOM, Invader, DIYSynthMNL delay, Sandelinos Basari, Toshi delay/chorus, mini-4ch-mixer, Hand-Turned Synthesis resources, open4umodular CGS18, LinearVCA13700, telec16 modular-synth, mixtee and prior/duplicate leads. Forum or aggregator posts were treated only as discovery signals; no item was promoted without primary artifacts.

### Due-source revalidation

- 61 due registry pages were revalidated and updated to `last_verified=2026-09-21`; no status crossed a threshold.
- Revalidated status mix: 47 `active`, seven `degraded`, four `static_archive` and three `blocked_by_tool`.
- Mod Wiggler, electro-music, DIYStompboxes and the SDIY directories remain degraded. Codeberg, SourceHut and FreeStompboxes remain blocked by the available research path. Their indexed results were used only as leads.
- Active forum, project, repository, manufacturer and link hubs were rechecked directly or through current indexed primary-page evidence. Personal/engineering pages not yet due under their 30-day cadence were not artificially refreshed.

### Registry additions

Eight reusable page-level sources were added to `data/hidden-gems-source-registry.csv`:

1. SCLW CMOS Synthesizer university source repository.
2. Angelo complete 5U modular source tree.
3. Jordan Aceto SSI2130 VCO core repository.
4. PoliTeK/PoliKick university analog drum project.
5. A Messer modular-fx GitLab project.
6. TG-Music Eagle source archive.
7. Toshi noiseless PT2399 delay project page.
8. Mechlab Stereo Animator project page.

### Post-shortlist lanes and stopping rule

1. Manufacturer/foundation lane: SSI2100/SSI2162 companding, SSI2190 mixing, SSI2130/2131, ALFA/Coolaudio V3205/V3207/V3102, Princeton PT2399 and primary application/evaluation material were searched after the four-item shortlist. No additional fabricated, licensed, measured open-hardware project emerged.
2. Alternative-forge/personal/university lane: independent GitLab, Codeberg, SourceHut, personal BBD/PT2399 pages and university analog-drum sources were searched. This produced modular-fx and Basari, but direct artifact verification left both on HOLD rather than expanding the ranked set.

The `weekly_deep` minimums were exceeded. The two independent post-shortlist lanes produced no additional gate-clearing item, satisfying the diminishing-return stopping rule.

## Tracker rows written with this digest

### `data/published-repo-log.csv`

```csv
SCLW/CMOS_Synthesizer,STRONG_PASS,2026-09-21,2026-09-21,2026-10-21,published,CC-BY patchable CMOS instrument with complete Eagle sources Gerbers BOM mechanics documentation and repeated university workshop builds; no quantitative audio characterization
JordanAceto/angelo_modular,PASS,2026-09-21,2026-09-21,2026-10-21,published,CC-BY complete 5U analog modular source with KiCad BOMs Gerbers manuals calibration current budgets and build evidence; several boards require documented cuts jumpers or component workarounds
PoliTeK/PoliKick,PASS,2026-09-21,2026-09-21,2026-10-21,published,MIT-stated built bridged-T analog kick with schematic simulation BOM PCB and panel archives and assembly documentation; upstream lineage license scope and quantitative measurements remain unresolved
JordanAceto/SSI2130_VCO,PASS,2026-09-21,2026-09-21,2026-10-21,published,CC-BY tested four-layer SSI2130 VCO core with editable KiCad BOM Gerbers assembly files through-zero FM and sync; carrier mechanics calibration procedure and bench measurements absent
```

### `data/selected-projects.csv`

```csv
SCLW/CMOS_Synthesizer,https://github.com/SCLW/CMOS_Synthesizer,selected,digest_ranked,"CMOS,9V-18V,University","logic-synth,lfsr,sequencer,xor,mixer,eagle,gerbers,mechanics,open-hardware",Build-proven university instrument combines patchable CMOS synthesis with unusually complete educational and manufacturing artifacts,Explore isolated logic and audio rails buffered modular I/O digitally stored routing and measured crosstalk and output behavior,verified,CC BY 4.0; install the mandatory LFSR deadlock add-on and characterize clock feedthrough headroom and noise
JordanAceto/angelo_modular,https://github.com/JordanAceto/angelo_modular,selected,digest_ranked,"Analog,5U,AS3340,AS3320,SSI2164,STM32F405","vco,vcf,vca,envelope,noise,slope,kicad,gerbers,calibration,open-hardware",Complete build-proven 5U system is a rare architecture-level reference spanning analog voice and utility functions,Reuse corrected card interfaces and add DAC trim autotune preset control factory tests and revised fabrication releases,verified,CC BY 4.0; audit every module erratum and regenerate boards before fabrication
PoliTeK/PoliKick,https://github.com/PoliTeK/PoliKick,selected,digest_ranked,"Analog,Eurorack,TL074","kick,bridged-t,accent,pitch-cv,distortion,university,simulation",Current built university drum project is a compact bridge between classic analog percussion and modifiable modern documentation,Add calibrated pitch and decay control velocity mapping test points and measured trigger amplitude and temperature consistency,needs_license_check,README states MIT; verify scope over hardware and inherited TR-808 and Erica-derived circuit material
JordanAceto/SSI2130_VCO,https://github.com/JordanAceto/SSI2130_VCO,selected,digest_ranked,"Analog,Eurorack,SSI2130","vco,through-zero-fm,sync,pwm,kicad,gerbers,qfn,open-hardware",Tested modern SSI2130 core offers a compact four-layer implementation for calibrated host and carrier experiments,Pair with MCU frequency capture DAC trim EEPROM calibration and measured tracking thermal and modulation characterization,verified,CC BY 4.0; no carrier panel calibration procedure or bench data and 0.4 mm QFN assembly is demanding
```

Equivalent hard and soft rows were added to `data/common-anti-repeat-index.csv`; the ranked projects are ineligible for re-publication through 2026-10-21 absent a material revision.

## Next-run search debt

1. Find a fabricated, licensed SSI2100 + SSI2162 compandor with editable EDA and measured tracking, clock leakage, SNR and overload recovery.
2. Find a licensed SSI2190 mixer with editable EDA, DAC-controlled routing and measured noise, crosstalk, headroom and control feedthrough.
3. Revisit modular-fx after completed prototype testing, BOM/Gerbers, normalized license files and analyzer data; resolve Basari through primary Codeberg access.
4. Target commercial-open BBD chorus/flanger/phaser hardware with current Coolaudio parts, clock filtering and measured noise rather than schematic-only clones.
5. Search for digitally assisted analog VCO/VCF calibration and preset routing on university pages, GitLab/self-hosted Git and personal sites outside GitHub.
6. Recheck little-angel, FAREKIND SSI2131 and Mechlab only for explicit licensing or newly published circuit/fabrication evidence.

## Prompt improvement for next run

Add a mandatory “revision safety” column to the candidate ledger. A project with fabricated boards should record whether the downloadable manufacturing release already incorporates every documented cut, jumper, reversed connector and component substitution. This prevents strong build evidence from masking a hazardous stale release.

## Feedback / Tuning Questionnaire

1. Preferred output mix next week? A) reusable circuit blocks; B) complete instruments; C) balanced mix.
2. Priority topology? A) VCO/VCF/VCA; B) BBD/PT2399/FV-1 effects; C) mixers/preamps/compressors; D) drums/noise/waveshapers.
3. License threshold? A) commercial open-hardware only; B) allow noncommercial `REF_PASS`; C) keep current strict ranking plus HOLD references.
4. Evidence emphasis? A) measurements/calibration; B) fabrication/mechanics; C) circuit novelty; D) revision safety; E) balanced.
5. Source emphasis? A) personal/self-hosted; B) forums/legacy archives; C) alternative forges; D) university/manufacturer.
6. Digitally assisted analog focus? A) autotune/DAC trims; B) preset routing/VCAs; C) factory test; D) delay/BBD calibration.
7. Should complete but errata-heavy systems remain rankable? A) yes with prominent warnings; B) `REF_PASS` only; C) HOLD until corrected fabrication files ship.
