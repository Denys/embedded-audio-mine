# Embedded Audio Mine — Audio Mining for MIDI — 2026-06-16

## Persistence note

Recovered from the project chat titled `Audio Mining for MIDI`, shown in the project chat list dated 2026-06-16. The prompt focused on custom MIDI controllers and asked to avoid already-posted items. Exact original prose was not fully recoverable, but the corrected project set was recovered from project context.

Ranked entries below are treated as published for anti-repeat. Canonical tracker and common anti-repeat index were updated in the 2026-06-17 repair pass.

## Pre-flight state

- Search focus: custom MIDI controllers, MIDI/CV controllers, Daisy/Teensy-adjacent control boards, control-surface extension hardware.
- Anti-repeat correction: `bkshepherd/DaisySeedProjects` was already published and is not re-added here.
- Corrected recovered project set: `DMME-NL/RP2040-DSP-Public`, `16n-faderbank/16nx + 16next_firmware`, `tomarus/midi2cv`, `da-penguin-guy/Virgil-Controller`.
- Original repository write status: no repository write recovered from the chat.

## Ranked entries

### 1) `DMME-NL/RP2040-DSP-Public` — **PASS**

**Technical summary:** recovered as a custom-controller / RP2040-DSP-oriented candidate from the corrected mining run.

**Why it matters:** relevant to the user’s control-board direction because it is RP2040-oriented and was kept after anti-repeat correction.

**Platform relevance:** RP2040 / embedded control / MIDI-controller-adjacent hardware.

**Caveats / verification gaps:** repository visibility and exact URL were not confirmed during this repair pass; keep source re-check mandatory before using this as evidence.

---

### 2) `16n-faderbank/16nx` + `16next_firmware` — **STRONG_PASS**

**Technical summary:** 16n-family next-generation faderbank/controller direction. Also recovered in the 2026-06-13 control-extension digest.

**Why it matters:** strong fit for physical-control hardware with faders and MIDI/CV-oriented workflows.

**Anti-repeat note:** canonical tracker records `first_seen=2026-06-13`, `last_published=2026-06-16`, and `repeat_eligible_after=2026-07-16`.

**Caveats / verification gaps:** verify maintained fork, hardware files, and firmware branch before fabrication.

---

### 3) `tomarus/midi2cv` — **PASS**

**Technical summary:** MIDI-to-CV controller/utility candidate recovered from the corrected custom-controller mining run.

**Why it matters:** directly relevant to MIDI/CV bridging and compact controller utility design.

**Platform relevance:** MIDI/CV controller utility.

**Caveats / verification gaps:** re-check source/hardware completeness before treating it as buildable.

---

### 4) `da-penguin-guy/Virgil-Controller` — **PASS**

**Technical summary:** custom MIDI/controller candidate recovered from the corrected mining run.

**Why it matters:** kept after anti-repeat correction as a non-generic controller/control-surface candidate.

**Platform relevance:** MIDI controller / embedded control hardware.

**Caveats / verification gaps:** exact hardware files and build maturity need re-check.

## HOLD / watchlist

| Item | Lane | Reason |
|---|---:|---|
| `bkshepherd/DaisySeedProjects` | HOLD/REJECT | Already published earlier in the canonical tracker; not re-added. |
| `t-dsp/t-dsp_tac5212_audio_shield_adaptor` + `t-dsp_software` | HOLD | Strong similarity anchor for control/audio extension boards; not included in the corrected recovered ranked set. |

## Rejected / not promoted

| Project/source group | Decision | Reason |
|---|---:|---|
| Already-published tracker items | Reject | Anti-repeat. |
| Generic MIDI sketches without hardware/control-surface evidence | Reject | Too thin for this mining objective. |

## Tracker update rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
DMME-NL/RP2040-DSP-Public,PASS,2026-06-16,2026-06-16,2026-07-16,published,Recovered 2026-06-16 Audio Mining for MIDI row; RP2040 DSP custom-controller candidate; repository URL/source re-check needed
16n-faderbank/16nx+16next_firmware,STRONG_PASS,2026-06-13,2026-06-16,2026-07-16,published,Recovered 2026-06-13 and 2026-06-16 digest row; 16n-family faderbank controller firmware and hardware direction; source re-check recommended
tomarus/midi2cv,PASS,2026-06-16,2026-06-16,2026-07-16,published,Recovered 2026-06-16 Audio Mining for MIDI row; MIDI to CV controller utility candidate; source re-check recommended
da-penguin-guy/Virgil-Controller,PASS,2026-06-16,2026-06-16,2026-07-16,published,Recovered 2026-06-16 Audio Mining for MIDI row; custom MIDI controller candidate; source re-check recommended
```
