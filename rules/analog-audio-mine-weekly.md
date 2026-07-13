# Analog Audio Mine — Weekly automation prompt

## Mission

Run a weekly discovery and engineering-triage pass for **high-value open-source analog and mixed-signal audio hardware**. Mine buildable or reusable circuit blocks for synthesizers, Eurorack, pedals, drum machines, mixers, controllers, test tools, and standalone musical devices.

This is not a popularity feed and must not become a parade of Mutable Instruments clones, beginner fuzz schematics, or pretty panels with no source files. Prefer obscure projects with engineering depth and adaptation value.

## Seed / similarity anchor

Use this manually selected reference as a quality anchor, not as a new finding:

- b:art instruments — Dual SSI2130 VCO Core, pinned revision 3.0:
  https://github.com/bartinstruments/open-source/tree/9f0f518136be096b3a93d50db7dc8bb48f528e18/DUAL%20SSI2130%20VCO%20CORE

Why it is an anchor: dual reusable analog core, KiCad sources, buffered waveform outputs, TZFM/TZPM support, calibration and measurement nodes, MCU-assisted trim paths, and explicit open-hardware licensing.

## Scope

Prioritize:

- VCO, DCO, VCF, VCA, OTA, envelope, LFO, noise, S&H, waveshaper, ring modulator, mixer, panner, compressor, distortion, preamp, phaser, chorus, analog delay, spring-driver/recovery, and analog drum voice circuits;
- SSI2130/2131/2140/2144/2164/2190, LM13700, AS/ALFA/Coolaudio synth ICs, matched transistor pairs, OTAs, VCAs, BBDs, PT2399, FV-1 hybrids, codecs and ADC/DAC front ends where the analog circuitry is substantial;
- digitally assisted analog designs: MCU calibration, auto-tune, DAC-controlled trims, digitally switched routing, preset recall, calibration tables, frequency measurement, and hybrid voice cards;
- Eurorack, desktop synth, pedal, modular subassembly, voice-card, and reusable carrier/submodule architectures;
- complete hardware source: schematic, PCB layout, BOM, fabrication files, panel/enclosure, calibration procedure, test points, measurements, or build reports.


## Hidden-gems discovery gate

Before candidate selection, read and execute:

- `rules/hidden-gems-discovery-protocol.md`
- `data/hidden-gems-source-registry.csv`

Use the `weekly_deep` profile. The source-registry discovery/revalidation phase is mandatory and must occur before ranking. Update the registry during every run, including new reusable pages and status changes for known dynamic resources. Do not stop after finding 3–5 good candidates; satisfy the profile coverage and stopping rule first. Include the required discovery audit in the weekly digest.

## Mandatory source expansion

Do **not** limit research to GitHub. Search several independent lanes each run:

1. GitHub plus release history and repository files.
2. GitLab, Codeberg, SourceHut, self-hosted Git, and project download pages.
3. Mod Wiggler, SynthDIY, electro-music, DIYStompboxes, PedalPCB, Look Mum No Computer community, PJRC/Daisy forums when analog hardware is involved.
4. Hackaday.io, personal engineering blogs, university/lab pages, archived project sites, and maker build logs.
5. Manufacturer datasheets, evaluation boards, application notes, and official design files from Sound Semiconductor, THAT, Alfa RPAR, Coolaudio, Spin Semiconductor, Analog Devices, TI, onsemi, ST, and similar vendors.

Forums are discovery signals. Promote only after checking primary artifacts such as schematics, EDA files, BOMs, releases, measurements, build logs, or manufacturer documentation.

## Search strategy

Use typo-tolerant and topology-specific searches. Rotate queries weekly rather than repeating one generic phrase. Examples:

- `open source analog synthesizer KiCad schematic BOM calibration`
- `SSI2130 OR SSI2131 VCO PCB schematic open hardware`
- `SSI2140 OR SSI2144 filter KiCad Eurorack`
- `SSI2164 VCA mixer open hardware schematic`
- `LM13700 OTA VCF VCA envelope PCB source`
- `through zero VCO TZFM schematic KiCad`
- `analog drum voice open source PCB BOM`
- `BBD chorus flanger open hardware schematic`
- `PT2399 delay modulation PCB source calibration`
- `digitally assisted analog synth auto tune DAC calibration`
- `site:modwiggler.com open source schematic PCB VCO VCF VCA`
- `site:hackaday.io analog synth KiCad BOM`
- `site:gitlab.com eurorack analog hardware schematic`
- `site:codeberg.org synthesizer hardware kicad`

Also search by discriminating circuit details: expo converter, tempco, matched pair, integrator core, state-variable filter, ladder filter, Sallen-Key, OTA-C, current-in/current-out, wavefolder, precision rectifier, CV summing, reference voltage, rail generation, protection, calibration, and test fixture.

## Open-source and evidence gate

A promoted item must have at least a public schematic or equivalent circuit source. Give strong preference to editable EDA files and explicit hardware licenses.

Classify license status as:

- `verified_open_hardware`
- `source_available_license_unclear`
- `documentation_only`
- `noncommercial_or_restricted`
- `closed_or_unavailable`

Do not call a project open source merely because a PDF schematic is visible. If the license is unclear, state it and normally place the item in HOLD unless the technical reference value is exceptional.

## Repository-aware anti-repeat

Before ranking, inspect the current `Denys/embedded-audio-mine` state where access exists:

- `README.md`
- latest file under `rules/`, including this prompt
- `data/published-repo-log.csv`
- `data/selected-projects.csv`
- `data/common-anti-repeat-index.csv`
- recent ranked digests in `digests/`
- relevant Codex weekly history

Do not repeat an item published within 30 days unless there is a meaningful update: revised PCB, new schematic/BOM, measurements, calibration procedure, supported IC/hardware, release, license clarification, or substantial build documentation.

The b:art Dual SSI2130 VCO Core is already a selected similarity anchor. Do not present it as a newly discovered ranked item unless a later revision adds material engineering value.

## Engineering review requirements

For every serious candidate, inspect and report:

- functional topology and unusual circuit choices;
- supply rails, current draw, signal levels, headroom, input/output impedance, and CV/gate ranges where documented;
- critical component tolerances, tempco/matching, trims, references, and calibration sequence;
- noise, distortion, tracking, bandwidth, bleed, stability, and thermal risks where evidence exists;
- power, grounding, protection, analog/digital partitioning, and likely PCB-layout sensitivities;
- parts availability, obsolete or counterfeit-prone parts, package difficulty, and realistic assembly burden;
- completeness of schematic, PCB, BOM, Gerbers, panel, firmware, test points, measurements, and build instructions;
- concrete adaptation ideas for the user's synth, Eurorack, pedal, and digitally assisted analog projects.

Never invent measurements. Distinguish documented facts, engineering inference, and assumptions.

## Ranking

Use:

`utility × novelty × adaptability`

Apply extra weight to:

- reusable submodule boundaries;
- complete editable hardware sources;
- modern or unusual analog IC use;
- digitally assisted calibration/control;
- measured performance and calibration data;
- practical manufacturability and available parts;
- independent/community projects hidden outside major repositories.

Lanes:

- `STRONG_PASS`: verified source, credible build evidence, complete hardware, immediate adaptation value.
- `PASS`: buildable and technically useful, with minor gaps.
- `REF_PASS`: exceptional circuit/reference value but not immediately fabricable.
- `HOLD`: interesting but blocked by missing source, unclear license, unverified build, unavailable parts, or repeat status.
- `FOUNDATION_UPDATE`: meaningful new manufacturer datasheet, eval board, application note, or reference design.

## Weekly output

Produce 3–5 ranked items when quality supports it. Do not force filler.

For each item include:

1. Project and lane.
2. Technical summary.
3. Why it matters.
4. Circuit and implementation highlights.
5. Hardware-source completeness and license status.
6. Engineering assessment.
7. Adaptation ideas.
8. Caveats and verification gaps.
9. Primary sources.

End with:

- HOLD/watchlist;
- rejected and duplicate candidates with reasons;
- sources and search lanes attempted;
- tracker rows for any published items;
- optional `selected-projects.csv` rows for exceptional anchors;
- one concise note on how the next weekly search should improve.

If direct repository persistence is unavailable, return a complete Markdown report and proposed CSV rows. Never claim a file, commit, or tracker update occurred unless it actually did.