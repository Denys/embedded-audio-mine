# Weekly Analog Audio Mine — 2026-07-20

> Recovery note: this canonical snapshot was reconstructed from the published run result after the original scratch artifact was pruned. It preserves the ranked findings, caveats, discovery audit, registry commit, and tracker decisions without adding new research claims.

Three projects cleared the weekly analog-hardware gate. Shmøergh Moduleur was the strongest current complete system, Mutable Instruments Ambika the strongest reusable licensed voice-card architecture, and Solisynth a useful but unverified CERN-OHL circuit collection.

## Ranked discoveries

### 1. Shmøergh Moduleur — PASS

**Canonical:** [project](https://www.shmoergh.com/moduleur/) · [repository](https://github.com/shmoergh/moduleur)

- Complete ±12 V modular instrument: dual saw-core VCOs, diode-ladder VCF, ADSR/VCA, DC mixer/compressor, sample-and-hold/bitcrusher, LFO, output utilities, and Pico/Pico 2 Brain.
- Editable hardware, schematics, Gerbers, BOMs, panels, enclosure files, simulations, calibration, firmware, and completed-instrument evidence were available.
- The Core/UI split and breakable default-patch backplane are reusable architectural patterns.
- Main risks: switching-converter/Pico noise, CV-reference integrity, compressor feedthrough, VCF headroom, and unverified multi-unit tracking.
- Hardware is CC BY-NC 4.0, therefore noncommercial/restricted rather than unrestricted open hardware.

**Adaptation:** combine the analog Core with low-noise DAC-derived pitch control, automated tuning, and relay/analog-switch preset routing.

### 2. Mutable Instruments Ambika — PASS

**Canonical:** [repository](https://github.com/pichenettes/ambika) · [technical notes](https://pichenettes.github.io/mutable-instruments-diy-archive/ambika/technotes/)

- Mature six-voice hybrid polysynth host with MIDI, SD storage, individual outputs, and interchangeable analog VCF/VCA voice cards.
- Supplied cards use LM13700 or SSM2164 four-pole filters and an SSM2164 two-pole state-variable filter.
- PCB layouts, schematics, BOMs, assembly, mechanics, simulations, calibration, and firmware were present. Hardware is CC BY-SA 3.0; firmware is GPL-3.0.
- Documentation records regulator/wall-wart hum and 7805 thermal issues.
- Original SSM2164 is obsolete; SSI2164, V2164, and AS2164 substitutions require control-law, compensation, feedthrough, and supply validation.

**Adaptation:** modernize the conductor and power supply while keeping independently testable voice cards and stored per-voice filter/VCA trims.

### 3. lucwei/solisynth-main — REF_PASS

**Canonical:** [repository](https://github.com/lucwei/solisynth-main)

- CERN-OHL-S-2.0 collection containing an analog VCO, four-channel SSM2164 VCA, and stereo mixer.
- Editable KiCad board/panel sources were present; the VCO and mixer included BOM/iBOM material.
- No releases, calibration procedure, measurements, Gerbers, or finished-build evidence were found.
- The VCO uses TL07x devices, BCM847BS matched NPNs, MMBFJ111, and a dedicated temperature-compensation part.

**Adaptation:** treat it as a characterization project: automated tracking/thermal sweeps, SSI2164/AS2164 migration, added test points, KiBot outputs, and a revisioned production bundle.

## Significant HOLDs

- North Coast MSK 015 Quad VCA and MSK 013 Middle Path VCO: strong built sources, held because the individual-project license could not be verified.
- David Haillant Simple VCO 1.1: current schematic/iBOM/tempco/calibration notes, but no explicit hardware license or editable EDA download.
- Music Thing Workshop System: mature build evidence, but public board sources and explicit hardware licensing were not located.
- `jypma/modsynth` and Sandelinos LM13700 VCA: held for missing licenses.
- DIYSynthMNL PT2399 Delay: repeat-eligible but without a material revision.
- b:art Dual SSI2130 VCO Core: anchor only.

## Discovery audit and persistence

- Profile: `weekly_deep`.
- 20 project candidates across more than 32 domains; more than 80% outside GitHub.
- Ten source classes and seven query families; alternative-forge and independent PT2399/BBD/manufacturer lanes completed after shortlisting.
- Codeberg and SourceHut were robots-blocked; FreeStompboxes blocked; DIYStompboxes and SDIY degraded.
- The source registry was updated and read back after commit [`11c854e`](https://github.com/Denys/embedded-audio-mine/commit/11c854e1ac4c9a82fad33b8c7b4c4bd91574feea).

## Publication rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status
shmoergh/moduleur,PASS,2026-07-20,2026-07-20,2026-08-19,published
pichenettes/ambika,PASS,2026-07-20,2026-07-20,2026-08-19,published
lucwei/solisynth-main,REF_PASS,2026-07-20,2026-07-20,2026-08-19,published
```

Selected-project promotions: Moduleur and Ambika.
