# Weekly Analog Audio Mine — 2026-08-17

> Recovery note: this canonical snapshot was reconstructed from the published run result after the original scratch artifact was pruned. It preserves the ranked findings, caveats, discovery audit, registry commit, and tracker decisions without adding new research claims.

Four projects cleared the evidence gate.

## Ranked discoveries

### 1. mohoyt/as3340_vco — PASS

**Canonical:** [repository](https://github.com/mohoyt/as3340_vco) · [ALFA AS3340 reference](https://www.alfatriode.lv/eng/sc/AS3340.php)

- Fabrication-complete CERN-OHL-P AS3340 VCO with editable KiCad, iBOM, Gerbers, panel, calibration notes, and one working build.
- Remaining switch-footprint and mechanical-density issues prevented a stronger rating.

### 2. Winterbloom Helium — STRONG_PASS

**Canonical:** [repository](https://github.com/wntrblm/Helium) · [technical documentation](https://helium.wntr.dev/)

- Precision buffered multiples and adder with editable hardware, Gerbers, self-source documentation, production evidence, and automated bipolar factory testing.
- Functional electronics are CERN-OHL-P; panel artwork is restricted.

### 3. GuitarML/GuitarPedalPCBs — REF_PASS

**Canonical:** [repository](https://github.com/GuitarML/GuitarPedalPCBs)

- Current MIT-licensed KiCad collection containing a tested boost and Tube Screamer/Rat combination.
- Strong mechanical/build evidence, but the combination pedal lacks a revisioned BOM and manufacturing bundle.

### 4. benjiaomodular/MiniVCA — REF_PASS

**Canonical:** [repository](https://github.com/benjiaomodular/MiniVCA)

- Compact MIT-licensed LM13700 VCA with editable KiCad and fabrication outputs.
- Revision 1.2 remains explicitly unverified, without measurements, complete BOM, or calibration procedure.

## Discovery audit and persistence

- Profile: `weekly_deep`.
- 22 candidates across more than 32 domains; over 85% outside GitHub.
- Two independent post-shortlist lanes found no stronger eligible hardware.
- 30 due registry pages revalidated; electro-music changed from active to degraded.
- Four source pages added: N8 Synth tutorials, CircuitSnips, Befaco, and GuitarML’s analog PCB collection.
- Registry commit: [`0d914e9`](https://github.com/Denys/embedded-audio-mine/commit/0d914e99983ee7454d15bc6690fe6614cffbc4f3).

## Publication rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status
mohoyt/as3340_vco,PASS,2026-08-17,2026-08-17,2026-09-16,published
wntrblm/Helium,STRONG_PASS,2026-08-17,2026-08-17,2026-09-16,published
GuitarML/GuitarPedalPCBs,REF_PASS,2026-08-17,2026-08-17,2026-09-16,published
benjiaomodular/MiniVCA,REF_PASS,2026-08-17,2026-08-17,2026-09-16,published
```

Selected-project promotions: AS3340 VCO and Helium.
