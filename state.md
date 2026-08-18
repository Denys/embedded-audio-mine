# Embedded Audio Mine — State

Last updated: 2026-08-18

This file is a continuity checkpoint. It does not replace `data/published-repo-log.csv`, ranked committed digests, or lane-specific decision logs.

## Weekly income + audio opportunity lane

### Current decision

**Selected commercial lane:** Real-Time Audio Capacity & Memory Admission Audit.

**Productized artifact:** `RTCAP-001` / `ResourceAdmissionReport`.

**Reason:** highest fit with hardware + embedded + DSP + verification; low initial capital; concrete B2B problem evidenced by current AMY memory-management work and FireFlow's measured cross-platform deadline limits; reusable inside Synth Harness.

### 2026-08-18 run

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

### Evidence inspected
- `data/published-repo-log.csv`
- `digests/2026-08-17-analog-audio-mine.md`
- AMY repository + 2026-08-16/17 oscillator-state allocation work
- FireFlow repository/README + current CPU/hardware roadmap
- Kastle 2 repository/README + 2026-08-14 changes
- USBSID-Pico repository/README + 2026-08-17 onboard-player changes
- Daisy Forum, Hackaday, and broader web discovery lanes

### Next single action
Create `RTCAP-001` with a reproducible benchmark schema and one sample audit on an existing Daisy engine.
