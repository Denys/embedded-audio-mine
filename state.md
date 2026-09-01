# Embedded Audio Mine — State

Last updated: 2026-09-01

This file is a continuity checkpoint. It does not replace `data/published-repo-log.csv`, ranked committed digests, or lane-specific decision logs.

## Weekly income + audio opportunity lane

### Current decision

**Selected commercial lane:** RP2350 Audio Integrity & Productization Sprint, extended with MIDI / Control-Plane Determinism.

**Current productized artifacts:** `RP2350-AUDIO-QUAL-001` + `MIDICTRL-001`.

**Reason:** do not abandon the previous measurable RP2350 qualification offer. Add a tightly scoped control-plane module covering MIDI clock jitter, CC/transport stress, queue pressure, ownership conflicts and recovery. Fresh KOSMOS2 work on 2026-08-31 demonstrates the exact class of multi-part control bugs this audit is meant to catch.

### 2026-09-01 run

#### Ranked income ideas
1. MIDI / Control-Plane Determinism Audit
2. Artist-Specific Signature Pedal Firmware Sprint
3. Constrained AI Preset & Sound-Design Data Engine
4. Embedded FM Patch Migration / Compatibility Pack

#### Ranked projects
1. `tronstoner/NitroTron3` — STRONG_PASS / new-to-mine product-grade Daisy firmware reference
2. `plantssystem/KOSMOS2` — PASS / material update on 2026-08-31
3. `bbw1081/DaisySeed-MultiFXPedal` + `bbw1081/Guitar-Preset-AI` — REF_PASS / multi-effect preset + AI reference
4. `Saisana299/Cranberry-Synth` — REF_PASS / new-to-mine Teensy 4.1 FM architecture

#### HOLD / rejected
- `etrautmann/echo-state-module` — HOLD: very interesting Daisy + dual AD5734R Eurorack hardware with KiCad/BOM, but no verified licence and no fresh implementation evidence.
- `TuriSc/Diapasonix` — not re-ranked: prior HOLD and no commits found since 2026-08-01.
- TŒRN, Tiliqua, Moduleur and Phantasmagoria — strong prior discoveries, but already published and no material current change justified another weekly slot.
- Thin RP2350/Daisy repository searches were rejected when they lacked licence, build evidence or meaningful source depth.

#### Anti-repeat block
Do not re-rank these before 2026-10-01 unless a material firmware, hardware, architecture, release, build, measurement, or documentation update is verified:
- `tronstoner/NitroTron3`
- `plantssystem/KOSMOS2`
- `bbw1081/DaisySeed-MultiFXPedal`
- `bbw1081/Guitar-Preset-AI`
- `Saisana299/Cranberry-Synth`

Existing recent blocks remain in force for:
- `risgk/digital-synth-pra32-u2`
- `willbearfruits/daisypatcher`
- `syntonos/VAMP`
- `hugelton/BirdsBoard`
- `LouDnl/USBSID-Pico`
- `bastl-instruments/kastle2`
- `shorepine/amy`
- `mcbronkowitch/fireflow`
- Hoopi
- TouchedOutSynth / Sampler
- Hermetic Modular Alchemy Lab / SDK
- pico_spdif_recorder
- Daisy Seed3
- Synthux-Academy/Audrey-II
- PhysicsDptAngers/polyUAnalog
- nyh-workshop/pico2dexed
- scooberts/MultiFX_Board + Firmware
- TTeuber/StompLink
- johnnyclem/daisy-studio
- Michi71/PicoVintageSynthCollection
- peculis/SPinSynth-T-LCD

#### Evidence inspected
- current repository `README.md`, `AGENTS.md`, `rules/digest-rules-v0.3.md`, hidden-gems protocol, `state.md`, publication/anti-repeat history
- KOSMOS2 README, repository layout and 2026-08-31 commits
- NitroTron3 README and v0.5.1 release assets
- DaisySeed-MultiFXPedal README, repository layout and 2026-08-26 parts-list commits
- Guitar-Preset-AI README and repository metadata
- Cranberry-Synth README and commit history
- echo-state-module repository metadata
- non-GitHub discovery lanes including Daisy Forum, PJRC Forum/PJRC projects, Hackaday.io, Crowd Supply, Cleveland Music Co., Synthux, Zynthian, TŒRN and Shmøergh
- Codeberg and SourceHut searches were blocked by robots and were not treated as verified

#### Canonical report
`work_products/weekly-income/2026-09-01.md`

#### Next single action
Create `MIDICTRL-001.md` as an optional module of `RP2350-AUDIO-QUAL-001`, with 24-PPQN jitter, transport state, CC flood, queue watermark/drop count, control ownership collisions, UI/display stress and a 60-minute soak.

---

### 2026-08-25 run

#### Previous decision

**Selected commercial lane:** RP2350 Audio Integrity & Productization Sprint.

**Productized artifact:** `RP2350-AUDIO-QUAL-001`.

**Reason:** strongest current combination of hardware/audio-DSP fit, measurable differentiation, low initial capital and short B2B path to revenue; fresh PRA32-U2 work exposes concrete latency, smoothing, DAC/clock/toolchain and audio-integrity problems that general firmware porting does not solve.

#### Ranked income ideas
1. RP2350 Audio Integrity & Productization Sprint
2. Eurorack CV/Gate Front-End Qualification Pack
3. Cross-Target DSP Parity CI Pack
4. Sampler Storage & Power-Loss Reliability Sprint
5. Bounded Local-AI DSP Graph Assistant Integration

#### Ranked projects
1. `risgk/digital-synth-pra32-u2` — STRONG_PASS / material update
2. `willbearfruits/daisypatcher` — STRONG_PASS
3. `syntonos/VAMP` — PASS / early hardware project
4. `hugelton/BirdsBoard` — REF_PASS / new-to-tracker hidden gem

#### HOLD / rejected
- `ghostintranslation/drone` — HOLD: RP2350 firmware source and UF2 are present, but primary hardware source is not yet published; `hardware/` currently contains only a placeholder.
- Recent PJRC/Teensy and maker/media candidates were not promoted when they were already in the anti-repeat window or lacked stronger primary evidence than the ranked projects.

#### Anti-repeat block
Do not re-rank these before 2026-09-24 unless a material firmware, hardware, architecture, release, build, measurement, or documentation update is verified:
- `risgk/digital-synth-pra32-u2`
- `willbearfruits/daisypatcher`
- `syntonos/VAMP`
- `hugelton/BirdsBoard`

Recent items still blocked by previous runs / digests:
- `LouDnl/USBSID-Pico`
- `bastl-instruments/kastle2`
- `shorepine/amy`
- `mcbronkowitch/fireflow`
- Hoopi
- TouchedOutSynth / Sampler
- Hermetic Modular Alchemy Lab / SDK
- pico_spdif_recorder
- Daisy Seed3
- Synthux-Academy/Audrey-II
- PhysicsDptAngers/polyUAnalog
- nyh-workshop/pico2dexed
- scooberts/MultiFX_Board + Firmware
- TTeuber/StompLink
- johnnyclem/daisy-studio
- Michi71/PicoVintageSynthCollection
- peculis/SPinSynth-T-LCD
- mohoyt/as3340_vco
- wntrblm/Helium
- GuitarML/GuitarPedalPCBs
- benjiaomodular/MiniVCA

### Evidence inspected
- current `README.md`, `state.md`, and `data/common-anti-repeat-index.csv`
- PRA32-U2 README, v2.20.0/v2.19.0 change history and CC0 license
- Daisypatcher README and v0.5.6 release
- VAMP README, repository layout, actual KiCad source and GPLv3 license
- BirdsBoard README, firmware/hardware/license model
- Ghost In Translation Drone README plus current firmware/hardware directory contents
- non-GitHub discovery lanes including PJRC/Teensy and maker/media searches

### Canonical report
`work_products/weekly-income/2026-08-25.md`

### Next single action
Create `RP2350-AUDIO-QUAL-001` and one reproducible Pico 2 + PCM5102A sample audit measuring latency, dropout/overrun count, mute/pop transient, idle spectrum/spurs, level/headroom, USB/MIDI stress and a 30–60 minute soak.

---

### 2026-08-18 run

#### Previous decision

**Selected commercial lane:** Real-Time Audio Capacity & Memory Admission Audit.

**Productized artifact:** `RTCAP-001` / `ResourceAdmissionReport`.

**Reason:** highest fit with hardware + embedded + DSP + verification; low initial capital; concrete B2B problem evidenced by current AMY memory-management work and FireFlow's measured cross-platform deadline limits; reusable inside Synth Harness.

#### Ranked income ideas
1. Real-Time Audio Capacity & Memory Admission Audit
2. Embedded DSP Desktop Twin / VCV Validation Sprint
3. Firmware Release + Hardware-Revision Compatibility Pack
4. Vintage Audio-IC Digital Control & Qualification Sprint

#### Ranked projects
1. `LouDnl/USBSID-Pico` — STRONG_PASS / material update
2. `bastl-instruments/kastle2` — STRONG_PASS
3. `shorepine/amy` — PASS / material update
4. `mcbronkowitch/fireflow` — REF_PASS

#### HOLD / rejected
- `pcvalen2003/RP2350_polysynth` — HOLD: thin documentation, no license, no build/measurement evidence.
- `seanwayland/Natorsynth` — REJECT: repository description says Daisy-to-JUCE port, but README remains the generic Pamplejuce template; evidence insufficient.

#### Anti-repeat block
Do not re-rank these before 2026-09-15 unless a material firmware, hardware, architecture, release, build, or documentation update is verified:
- `LouDnl/USBSID-Pico`
- `bastl-instruments/kastle2`
- `shorepine/amy`
- `mcbronkowitch/fireflow`

Recent items still blocked by previous runs / digests:
- Hoopi
- TouchedOutSynth / Sampler
- Hermetic Modular Alchemy Lab / SDK
- pico_spdif_recorder
- Daisy Seed3
- Synthux-Academy/Audrey-II
- PhysicsDptAngers/polyUAnalog
- nyh-workshop/pico2dexed
- scooberts/MultiFX_Board + Firmware
- TTeuber/StompLink
- johnnyclem/daisy-studio
- Michi71/PicoVintageSynthCollection
- peculis/SPinSynth-T-LCD
- mohoyt/as3340_vco
- wntrblm/Helium
- GuitarML/GuitarPedalPCBs
- benjiaomodular/MiniVCA

#### Evidence inspected
- `data/published-repo-log.csv`
- `digests/2026-08-17-analog-audio-mine.md`
- AMY repository + 2026-08-16/17 oscillator-state allocation work
- FireFlow repository/README + current CPU/hardware roadmap
- Kastle 2 repository/README + 2026-08-14 changes
- USBSID-Pico repository/README + 2026-08-17 onboard-player changes
- Daisy Forum, Hackaday, and broader web discovery lanes

#### Next single action
Create `RTCAP-001` with a reproducible benchmark schema and one sample audit on an existing Daisy engine.
