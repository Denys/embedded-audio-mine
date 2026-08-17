# Weekly Analog Audio Mine — 2026-08-10

> Recovery note: this canonical snapshot was reconstructed from the published run result after the original scratch artifact was pruned. It preserves the ranked findings, caveats, discovery audit, registry commit, and tracker decisions without adding new research claims.

Four projects cleared the schematic gate.

## Ranked discoveries

### 1. MiniOSC v2.1 — PASS

**Canonical:** [repository](https://github.com/benjiaomodular/MiniOSC) · [project details](https://benjiaomodular.com/post/2024-09-20-miniosc-v2/)

- CC BY-SA 4.0 CD40106 VCO with editable KiCad, BOM, fabrication files, revision errata, and four reported builds.
- Main weakness: no measured pitch or thermal tracking.
- Outputs can reach approximately 20 Vpp, requiring explicit downstream headroom/protection review.

### 2. North Coast MSK 015 Quad VCA — REF_PASS

**Canonical:** [project](https://northcoastsynthesis.com/products/msk-015-quad-vca.html) · [SDIY sources](https://northcoastsynthesis.com/synth-diy-projects/)

- Production-proven AS3360 quad VCA supporting linear/exponential response, panning, crossfading, ring modulation, and mid/side processing.
- Public schematic and PCB source were available.
- Held below PASS because the exact license of the individual source archive still required inspection.

### 3. CAT’s Eurosynth — REF_PASS

**Canonical:** [repository](https://github.com/mzuelch/CATs-Eurosynth)

- Large CC BY-NC-SA analog collection containing working VCF, VCA, ADSR, S&H, phaser, noise, ringfolder, and utility projects with editable KiCad and prototype Gerbers.
- Reproducibility and upstream license lineage need module-by-module verification.

### 4. LP-01 OTA Low-Pass Filter — REF_PASS

**Canonical:** [repository](https://github.com/rjhelms/lp-01_ota_low_pass_filter)

- Compact CC BY-SA 4.0 LM13700 MS-20-style VCF with editable schematic, PCB, panel, and iBOM.
- No completed build, calibration procedure, or measurements were found.

## HOLD and duplicates

- Ampelope was the strongest HOLD: an STM32G431-controlled AS3364 quad VCA/envelope architecture without an explicit license.
- Previously ranked analog projects inside the 30-day window remained excluded by the common anti-repeat policy.

## Discovery audit and persistence

- Profile: `weekly_deep`.
- 22 project candidates across more than 32 domains; more than 80% outside GitHub.
- Seven query families and ten source classes; alternative-forge and primary-semiconductor lanes completed after shortlisting.
- 26 due registry pages revalidated with no status changes; seven reusable sources added.
- Registry commit: [`1113f0c`](https://github.com/Denys/embedded-audio-mine/commit/1113f0c6255c24a6655be968fb5aa115b8d5f7e9).

## Publication rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status
benjiaomodular/MiniOSC,PASS,2026-08-10,2026-08-10,2026-09-09,published
northcoastsynthesis.com/msk-015-quad-vca,REF_PASS,2026-08-10,2026-08-10,2026-09-09,published
mzuelch/CATs-Eurosynth,REF_PASS,2026-08-10,2026-08-10,2026-09-09,published
rjhelms/lp-01_ota_low_pass_filter,REF_PASS,2026-08-10,2026-08-10,2026-09-09,published
```

Selected-project promotions: MiniOSC and MSK 015.
