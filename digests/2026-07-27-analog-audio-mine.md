# Weekly Analog Audio Mine — 2026-07-27

> Recovery note: this canonical snapshot was reconstructed from the published run result after the original scratch artifact was pruned. It preserves the ranked findings, caveats, discovery audit, registry commit, and tracker decisions without adding new research claims.

Four projects cleared the weekly gate. Winterbloom Castor & Pollux and Neptune were the strongest findings because they combine editable hardware, automated production testing, explicit hardware licensing, and real manufacturing evidence.

## Ranked discoveries

### 1. Winterbloom Castor & Pollux — STRONG_PASS

**Canonical:** [repository](https://github.com/wntrblm/Castor_and_Pollux) · [OSHWA US001060](https://certification.oshwa.org/us001060.html)

- Dual Juno-inspired digitally controlled analog oscillator with editable KiCad, firmware, factory calibration/test software, hardware stress testing, field errata, CERN-OHL-P-2.0 licensing, and OSHWA certification.
- The reusable value is the production workflow around the analog core: per-unit calibration, persistent correction data, USB servicing, and factory fixtures.
- Main risks: digital/reference coupling, control-update spurs, thermal tracking, and calibration-table integrity.
- The documented swapped-ramp-table erratum supports adding calibration schema versioning and CRC validation.

### 2. Winterbloom Neptune — STRONG_PASS

**Canonical:** [repository](https://github.com/wntrblm/Neptune) · [OSHWA US002605](https://certification.oshwa.org/us002605.html)

- DC-coupled resonant diode-ladder filter with independent low-pass/high-pass inputs, spectral crossfade, and voltage-controlled Salt feedback distortion.
- Editable KiCad, simulations, automated-test hardware, factory software, CERN-OHL-P-2.0 licensing, and production certification were present.
- Documented caveats include output offset up to approximately ±2 V, approximate cutoff tracking, and potentially large/device-dependent levels under resonance and Salt feedback.
- Swept noise, THD, offset, and self-oscillation characterization are required before adaptation.

### 3. Bleep Sound Double MS20 VCF — REF_PASS

**Canonical:** [project](https://bleepsound.github.io/ms20_vcf_double/) · [repository](https://github.com/BleepSound/ms20-vcf-double)

- Two tested LM13700 MS-20-style low/high-pass filters with normalled CV and series audio routing.
- Schematics, editable KiCad, BOM, KiBot automation, Gerbers, and CC BY-SA 4.0 terms were present.
- Promotion was limited by unresolved licensing lineage from the Barton-derived circuit.
- Engineering priorities: channel cutoff matching, resonance yield, supply coupling, CV feedthrough, and crosstalk.

### 4. littleBits Circuit Design Archive — REF_PASS

**Canonical:** [repository](https://github.com/littlebitselectronics/eagle-files)

- CERN-OHL-1.2 Eagle sources for a manufactured 5 V synth ecosystem: oscillator, MS-20-style filter, envelope, random source, mixer, sequencer, speaker output, and PT2399 delay.
- Valuable as a compact low-voltage reference, but not a direct clone target.
- Magnetic connectors, branding, trade dress, and patents are separately reserved; BOMs, measurements, calibration, Gerbers, and revision mapping are incomplete.
- Any adaptation should replace the mechanical interface, migrate to current EDA, and revalidate virtual-ground and PT2399 clock-noise behavior.

## Discovery audit and persistence

- Profile: `weekly_deep`.
- 22 project candidates across more than 32 domains; more than 80% outside GitHub.
- Ten source classes and seven query families, followed by independent alternative-forge and PT2399/BBD/OTA/manufacturer lanes.
- The source registry was updated and verified after commit [`e61df979`](https://github.com/Denys/embedded-audio-mine/commit/e61df9796e5e162d7a5ea792ff4f9e9dc8beeb5b).
- Six reusable source pages were added and 28 due dynamic pages revalidated; DMME changed from active to degraded.

## Publication rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status
wntrblm/Castor_and_Pollux,STRONG_PASS,2026-07-27,2026-07-27,2026-08-26,published
wntrblm/Neptune,STRONG_PASS,2026-07-27,2026-07-27,2026-08-26,published
BleepSound/ms20-vcf-double,REF_PASS,2026-07-27,2026-07-27,2026-08-26,published
littlebitselectronics/eagle-files,REF_PASS,2026-07-27,2026-07-27,2026-08-26,published
```

Selected-project promotions: Castor & Pollux and Neptune.
