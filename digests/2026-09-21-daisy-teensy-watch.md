# Embedded Audio Mine — Daisy / Teensy Watch — 2026-09-21

## Executive summary

One item cleared the alert bar in this run: **Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper v2.0.0** — **STRONG_PASS**.

The September 20 release is not a cosmetic bump. It expands a Daisy Pod four-layer stereo looper into a concurrent three-engine instrument: the looper can now run alongside a 10-voice six-operator DX7-style engine built around `msfa` and a separate granular engine, while adding a Hann-windowed transport-freeze mode, SysEx/WAV import workflows, a shared delay bus, revised save formats, and a ready-to-flash `main.bin` asset. The repository also documents a QSPI boot/application layout, explicit ITCM placement for the audio callback, SD-card self-flashing, and on-device UI/state management.

No Teensy candidate found in the current PJRC pass cleared the same freshness + primary-evidence bar. Several interesting leads remain HOLD rather than being promoted on forum prose alone. Humanity survives another day without a five-item list manufactured from enthusiasm.

## Previous questionnaire feedback applied

None recorded in `data/prompt-evolution-state.yaml`.

## Pre-flight / discovery audit

- **Profile:** `daily_broad`, narrowed by the active Daisy/Teensy watch request rather than the repository's ordinary standalone-hardware daily focus.
- **Rules/state inspected:** `README.md`, `AGENTS.md`, `rules/digest-rules-v0.3.md`, `rules/hidden-gems-discovery-protocol.md`, `rules/common-anti-repeat-policy.md`, `rules/feedback-tuning-loop.md`, `data/prompt-evolution-state.yaml`, publication/selected/common anti-repeat state, and relevant prior digest/history hits.
- **Anti-repeat result:** no prior canonical hard/soft row was found for `Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper`. Its acknowledged upstream inspiration, `kooliha/Ouroboros_Loop_Station`, was published on 2026-05-25 and is long outside its 30-day repeat window; PZD is a distinct repository and v2.0.0 adds substantial independent firmware architecture.
- **Primary search surfaces:** Electro-Smith/Daisy community Projects & Examples, PJRC/Teensy Audio Projects, GitHub repositories/releases/commits, linked project/vendor/community pages, and alternative project/source leads.
- **Source classes covered:** specialist forums, code/release hosts, project/documentation sites, community/vendor pages, maker/project pages.
- **Query families:** current forum/activity scans; release/commit change searches; platform/topic queries for Daisy Pod/Seed and Teensy 4.x audio; artifact/build-path verification.
- **Candidate pool:** 10+ plausible Daisy/Teensy leads screened, including PZD, OndaKit, Hermetic Alchemy SDK, recent Daisy sampler/headphone/tool threads, current PJRC Audio Projects threads, and previously tracked Daisy/Teensy projects.
- **Non-GitHub coverage:** Daisy/PJRC forums plus project/community pages were searched independently; GitHub was used mainly for primary-artifact verification.
- **Stop-rule evidence:** after PZD qualified, additional Daisy-tool/framework and PJRC lanes were searched; none produced a second candidate with comparable freshness and primary evidence.
- **Questionnaire:** omitted for this non-interactive condition-watch run.

## Ranked entries

### 1) [Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper v2.0.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/releases/tag/v2.0.0) — **STRONG_PASS**

**Technical summary:**

A Daisy Pod four-layer stereo looper has become a small integrated performance workstation without abandoning the MCU/real-time model. v2.0.0 runs the looper alongside two independently switchable MIDI instruments: a 10-voice six-operator DX7-style engine based on Google's `msfa`, and a monophonic granular engine with independent Grain and Scan layers. It also adds a true transport-freeze mode based on a short Hann-windowed looping window rather than merely stopping an index or forcing feedback to unity.

**What materially changed on 2026-09-20:**

- added **Dexed**: six operators, 10 voices, 32 DX7 algorithms, SysEx import, algorithm visualization, macro controls and per-operator editing;
- added **Grains**: fixed-anchor and scanning granular layers, independent Fill/Gap/Direction, position jitter, scan-range Bounce/Wrap, rhythmic gating and broad WAV import/resampling support;
- added **Global Speed Freeze**: Normal / Scrub / Freeze transport states, with a small Hann-windowed held region and encoder-position scrubbing;
- added a shared delay bus alongside the existing shared reverb;
- bumped performance/granular save formats and explicitly rejects older incompatible saves rather than silently corrupting them;
- shipped a ready-to-flash `main.bin` release asset.

**Implementation highlights:**

- application runs from external **QSPI** via a separate Daisy bootloader; the README provides one-time bootloader setup plus SD-card or DFU application flashing;
- source build path is explicit: clone with submodules, `cd src && make`, producing `build/main.bin`;
- the audio callback is explicitly placed in **ITCM** with `DSY_ITCM_TEXT`;
- disabling the looper skips `LooperLayer::Process()` calls rather than merely muting output, so the looper, Dexed and Grains are genuine independent CPU levers;
- custom `libDaisy` fork + upstream DaisySP are pinned as submodules;
- the repository contains a dedicated Makefile, custom STM32H750 QSPI linker script, separate Dexed/SysEx sources, granular code, a large design note, and SD-card template assets.

**Hardware / electronics notes:**

This is primarily a firmware/system-architecture finding, not an open custom-hardware project. The target is the commercial **Daisy Pod**, extended with an SSD1306/SSD1309 I2C OLED on D11/D12 and a hand-wired FAT32 microSD socket. The author explicitly notes that the SD socket has no card-detect pin and hot-swapping is unreliable. There is no custom PCB/schematic package here to inherit.

**Why it matters:**

The useful material is not “three effects in one box.” It is the combination of memory placement, executable-image/boot workflow, independent engine admission, dense two-knob/two-button/encoder UI, persistent SD state, import/export, and several nontrivial time-domain algorithms on a constrained Daisy Pod. That makes it a better firmware architecture reference than the usual demo that spends half its engineering budget on a sine oscillator and calls it a synthesizer.

**Adaptation ideas:**

1. **Multi-Delay FREEZE:** inspect the short Hann-window transport-freeze implementation and state transitions as a reference for a time-domain FREEZE layer that is distinct from spectral freeze.
2. **Daisy test/release workflow:** borrow the external-QSPI application + ITCM hot-path split and SD-card update UX for field-test firmware where appropriate.
3. **CPU admission:** study its explicit per-engine enable/disable path as a small-scale model for bounded graph admission in a multi-FX runtime.
4. **Compact UI:** mine the page conventions, long/short-press semantics, file chooser consistency, preview/commit behavior and CPU-visible enable states for constrained pedal UIs.

**Quick engineering assessment:**

Strong firmware reference and immediately flashable project; weak as a hardware reference. The v2 architecture is substantial enough to merit promotion even though its upstream loop-buffer concept comes from Ouroboros. The most reusable pieces for this repository are the transport/freeze/granular state machines, memory/boot partitioning, and compact UI architecture rather than the complete product image.

**Caveats / verification gaps:**

- no independent CPU-load / deadline / audio-quality measurement was reproduced in this watch run;
- the hardware extension is hand-wired rather than a reusable PCB design;
- root source license is MIT and `msfa` is Apache-2.0, but the README also describes bundling thousands of real DX7 SysEx presets including Yamaha ROM content; redistribution/commercial rights for those data assets are **not proven by the root MIT license** and should be audited separately before reuse;
- build/flash path and source layout were inspected, but firmware was not compiled or flashed in this run.

**Primary sources:**

- Repository: https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper
- v2.0.0 release: https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/releases/tag/v2.0.0
- Daisy community thread: https://community.daisy.audio/t/pzd-daisy-pod-4-track-looper/2449

---

## HOLD / watchlist

| Item | Lane | Reason / smallest promotion action |
|---|---:|---|
| OndaKit | HOLD | Promising visual Daisy graph/codegen workflow with generated C++ and hardware support claims, but I did not resolve a public implementation repository/license or reproducible evidence deep enough for promotion. Promote after source/provenance and exported-project build behavior are independently inspectable. |
| Hermetic Modular `alchemy-sdk` | REF_PASS / watch | Strong MIT Daisy framework/bootloader and calibration architecture, but no sufficiently fresh September material update beat the alert threshold in this run. Recheck on the next tagged release or hardware revision. |
| PJRC “new reverb / VERBtrix” lead | HOLD | Forum/community signal exists, but no primary repository/release source was resolved well enough to verify code, license, build path and exact freshness. Promote only after locating the canonical artifact. |

## Rejected / not promoted

| Project/source group | Decision | Reason |
|---|---:|---|
| Previously published Daisy / Teensy projects | REJECT repeat | No verified material change inside the watch window strong enough to override canonical anti-repeat state. |
| Generic forum activity / support threads | REJECT | Activity alone is not a release, new architecture, new hardware target or reusable implementation artifact. |
| Manufacturer/core ecosystem chatter | REJECT / foundation only | No foundation update found that justified displacing the stronger independent/community item. |

## Tracker update rows

```csv
repo,lane,first_seen,last_published,repeat_eligible_after,status,notes
Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper,STRONG_PASS,2026-09-21,2026-09-21,2026-10-21,published,https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper ; v2.0.0 2026-09-20 adds concurrent Dexed 10-voice six-operator FM and Grains engines plus Hann-windowed transport freeze release binary QSPI boot and dense Pod UI; MIT code; Daisy Pod plus OLED and hand-wired SD; bundled preset provenance requires separate audit
```

## Prompt improvement for next run

- Preserve the very high bar for forum-only claims: a fresh thread is discovery evidence, not promotion evidence.
- Recheck PZD only for a future material release; it is now blocked by the 30-day window through 2026-10-21.
- Keep PJRC Audio Projects on a targeted primary-source follow-through pass, especially when a forum post points to a new library but omits a canonical repository.
- Continue hunting Daisy projects on the community forum that expose real callback/memory/UI implementation rather than only finished demos.
