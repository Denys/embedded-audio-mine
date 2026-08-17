# Standalone Open-Hardware Daily Profile

Use this profile when the Embedded Audio Mine daily task is explicitly focused on **standalone open-source audio hardware**.

It supplements the normal daily rules and hidden-gems discovery protocol. It does not replace them and does not narrow the Analog Audio Mine weekly stream.

## Goal

Find non-obvious standalone synths, grooveboxes, samplers, drum machines, pedals, loopers, audio appliances, and unusual embedded sound devices whose hardware can actually be studied, rebuilt, and adapted.

The preference is for complete physical instruments with meaningful controls, not bare processor boards or famous open-source classics rediscovered for the hundredth time.

## Strict standalone definition

A ranked project should operate as a substantially complete device using ordinary external infrastructure such as:

- DC, USB, or battery power;
- audio/MIDI connections;
- headphones, amplifier, speakers, or an external MIDI controller when appropriate.

It should include its own practical control/UI path and a credible enclosure/panel or finished-device implementation.

### Not ranked as standalone

- Eurorack-only modules requiring a case and ±12 V bus;
- generic development shields/carriers;
- bare codec/DAC/ADC boards;
- controller boards that need several unrelated boards to become an instrument;
- incomplete hardware prototypes without a credible usable-device path.

Good Eurorack or carrier projects may appear under `Bonus findings` or `REF_PASS` when their engineering value is unusually strong, but they do not occupy standalone ranked positions.

Compute modules such as Teensy, Daisy, STM32 modules, ESP32 modules, or Raspberry Pi are acceptable when they are integrated into a coherent complete device design rather than presented as the device by themselves.

## Open-hardware promotion gate

For ranked hardware, verify as many of these as the project type requires, with the first four treated as hard evidence:

1. Public schematic or equivalent circuit source.
2. Editable PCB source or verified fabrication/Gerber files sufficient to reproduce the board.
3. BOM or sufficiently complete part/value evidence to rebuild the hardware.
4. Explicit hardware license that permits modification and redistribution; do not treat non-commercial restrictions as clean open-source hardware.
5. Firmware/source and plausible build/flash path when firmware is part of the device.
6. Panel/enclosure/mechanical files, assembly notes, calibration, or test evidence where applicable.

A project page, photo, render, store listing, or PCBWay/OSH Park ordering page is a discovery lead, not sufficient proof.

### License classification

Use:

- `verified_open_hardware`
- `source_available_license_unclear`
- `documentation_only`
- `noncommercial_or_restricted`
- `closed_or_unavailable`

Normally:

- `verified_open_hardware` may rank;
- `source_available_license_unclear` is HOLD unless reference value is exceptional;
- `noncommercial_or_restricted` is not eligible for the strict ranked open-hardware lane;
- documentation-only and closed hardware are rejected from this profile.

## Novelty / obvious-project gate

Do not spend ranked discovery slots on obvious classics merely because they are complete.

Examples of reference-only families include official Mutable Instruments projects and other widely known canonical open-source synths unless there is a material new revision or a genuinely obscure adaptation with independent engineering value.

Use obvious projects as:

- comparison anchors;
- similarity references;
- rejected/duplicate examples;
- historical architecture context.

Completeness cannot compensate for near-zero novelty in this profile.

## Physical-control boost

Strongly boost complete, usable control surfaces:

- pots;
- encoders;
- buttons and switches;
- sliders/faders;
- grids/keypads;
- touch/ribbon/expressive surfaces;
- displays with a coherent performance workflow.

Also boost:

- integrated audio/MIDI I/O;
- codec/DAC/ADC and analog-front-end engineering;
- power/grounding/protection notes;
- panel/enclosure files;
- calibration and manufacturing/test notes.

A board-only project may still be valuable as REF/HOLD, but should not outrank a comparably strong complete instrument.

## Images / photos

For every ranked item and serious HOLD candidate, try to locate a representative project image.

Classify image provenance as:

- `official_project_photo_or_render`
- `maintainer_build_photo`
- `third_party_build_photo`
- `no_reliable_image_found`

Images improve evaluation of UI/mechanics but never substitute for source files, license evidence, or build proof.

## Ranking

Base model remains:

`utility × novelty × adaptability`

For this profile, apply strong supporting weight to:

`hardware completeness × standalone usefulness × control-surface value`

Do not force 3–5 ranked items. One or two high-confidence findings are preferable to filler.

## Required output additions

In addition to the standard digest contract, include:

- why each ranked item qualifies as standalone;
- exact open-hardware evidence and license classification;
- physical-control/UI summary;
- photo availability/provenance;
- `Bonus findings` for valuable non-standalone hardware;
- HOLD/watchlist with the exact promotion blocker;
- rejected/not-promoted items grouped by reason;
- serious analysed resources and search lanes;
- proposed tracker rows only for actual ranked items.

Do not mark proposed tracker rows as persisted or published until the canonical repository write has been completed and verified.