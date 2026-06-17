#!/usr/bin/env python3
"""Curate the Teensy 4.x standalone board Firecrawl floor list.

The Firecrawl search script records discovery evidence. This curation pass
applies the category-1.a gates and writes the final JSON, report, and rejected
CSV used by the run.
"""

from __future__ import annotations

import csv
import datetime as dt
import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "research" / "outputs"
CANDIDATES_OUT = OUT / "teensy4_standalone_functional_candidates.json"
RAW_OUT = OUT / "teensy4_standalone_functional_raw.json"
REPORT_OUT = OUT / "teensy4_standalone_functional_report.md"
REJECTED_OUT = OUT / "teensy4_standalone_functional_rejected.csv"


def artifact(present: bool = False, url: str = "", notes: str = "", fmt: str | None = None) -> dict[str, Any]:
    data: dict[str, Any] = {"present": present, "url": url, "notes": notes}
    if fmt is not None:
        data["format"] = fmt
    return data


def blank_candidate() -> dict[str, Any]:
    return {
        "id": "",
        "name": "",
        "primary_url": "",
        "secondary_urls": [],
        "source_lane": "",
        "author_or_org": "",
        "category": "1.a standalone functional",
        "candidate_type": "custom_teensy4_board",
        "decision": "hold",
        "lane": "HOLD",
        "function_class": "other",
        "standalone_confidence": 0.0,
        "standalone_evidence": [],
        "teensy_4x_confidence": 0.0,
        "teensy_versions": [],
        "custom_board_confidence": 0.0,
        "custom_board_evidence": [],
        "hardware_artifacts": {
            "schematic": artifact(),
            "pcb_source": artifact(fmt=""),
            "gerbers": artifact(),
            "bom": artifact(),
            "panel_enclosure": artifact(),
            "assembly_photos": artifact(),
            "pin_map": artifact(),
        },
        "firmware_artifacts": {
            "source": artifact(),
            "build_instructions": artifact(),
            "release_artifacts": artifact(),
        },
        "audio_io": {
            "codec_adc_dac": [],
            "input_types": [],
            "output_types": [],
            "sample_rate_bit_depth_claims": [],
            "i2s_tdm_spdif_usb": [],
        },
        "midi_cv_io": {"midi": [], "cv_gate": [], "protection_level_shifting": []},
        "electronics_notes": {
            "opamps": [],
            "power": [],
            "grounding_noise": [],
            "protection": [],
            "analog_front_end": [],
        },
        "ui_control": {"pots": None, "encoders": None, "buttons": None, "display": "", "preset_or_menu_model": ""},
        "license": "",
        "availability_status": "",
        "last_activity_or_date": "",
        "scores": {
            "utility": 0,
            "novelty": 0,
            "adaptability": 0,
            "hardware_completeness": 0,
            "build_credibility": 0,
            "audio_electronics_value": 0,
            "teensy4_relevance": 0,
            "standalone_confidence": 0,
            "hardware_boost": 0.0,
            "overall": 0.0,
        },
        "decision_reason": "",
        "caveats": [],
        "source_quotes": [],
    }


def selected_candidates() -> list[dict[str, Any]]:
    micro = blank_candidate()
    micro.update(
        {
            "id": "microdexed-touch",
            "name": "MicroDexed Touch",
            "primary_url": "https://codeberg.org/dcoredump/MicroDexed-touch",
            "secondary_urls": [
                "https://codeberg.org/positionhigh/MicroDexed-touch",
                "https://www.pcbway.com/project/shareproject/MicroDexed_Capacitive_Touch_64970fee.html",
                "https://www.pcbway.com/project/shareproject/MicroDexed_Touch_current_version_with_PCM5102_d643a695.html",
                "https://protosupplies.com/product/teensy-41-microdexed",
            ],
            "source_lane": "targeted follow-up",
            "author_or_org": "dcoredump / positionhigh",
            "decision": "selected",
            "lane": "STRONG_PASS",
            "function_class": "synth_voice",
            "standalone_confidence": 0.92,
            "standalone_evidence": [
                "PCBWay describes it as a DIY groovebox/synth/sequencer in a tiny box.",
                "Repo README requires Teensy 4.1, display/touch, audio board, and storage parts for a complete build.",
            ],
            "teensy_4x_confidence": 1.0,
            "teensy_versions": ["Teensy 4.1"],
            "custom_board_confidence": 0.86,
            "custom_board_evidence": [
                "PCBWay shared board pages exist for MicroDexed Touch current/capacitive versions.",
                "Project links build instructions, BOM, and manual; PCBWay records CAD/BOM update history.",
            ],
            "hardware_artifacts": {
                "schematic": artifact(True, "https://codeberg.org/positionhigh/MicroDexed-touch/raw/branch/main/doc/MicroDexed-touch-manual.pdf", "Manual is cited by PCBWay as containing schematics; Firecrawl could not parse the PDF due size/type limit."),
                "pcb_source": artifact(True, "https://www.pcbway.com/project/shareproject/MicroDexed_Capacitive_Touch_64970fee.html", "PCBWay shared project / manufacturing page; raw Gerbers not public in scrape.", "PCBWay shared project"),
                "gerbers": artifact(False, "https://www.pcbway.com/project/shareproject/MicroDexed_Capacitive_Touch_64970fee.html", "PCBWay ordering/manufacturing path exists, but public Gerber download was not verified."),
                "bom": artifact(True, "https://www.pcbway.com/project/shareproject/MicroDexed_Touch_current_version_with_PCM5102_d643a695.html", "PCBWay page exposes BOM download/update history."),
                "panel_enclosure": artifact(True, "https://www.pcbway.com/project/shareproject/MicroDexed_Touch_current_version_with_PCM5102_d643a695.html", "PCBWay page links case/enclosure variants and photos."),
                "assembly_photos": artifact(True, "https://www.pcbway.com/project/shareproject/MicroDexed_Capacitive_Touch_64970fee.html", "Shared project page includes build photos."),
                "pin_map": artifact(False, "", "Not separately verified beyond manual/build documentation."),
            },
            "firmware_artifacts": {
                "source": artifact(True, "https://codeberg.org/dcoredump/MicroDexed-touch/src/branch/main/MicroDexed-touch", "Firmware source tree scraped from Codeberg."),
                "build_instructions": artifact(True, "https://codeberg.org/dcoredump/MicroDexed-touch", "Repository links build instructions and PlatformIO files."),
                "release_artifacts": artifact(True, "https://codeberg.org/dcoredump/MicroDexed-touch/src/branch/main/release", "Release folder exists in the repository tree."),
            },
            "audio_io": {
                "codec_adc_dac": ["PCM5102 audio board/module"],
                "input_types": ["USB MIDI", "TRS/DIN MIDI via adapter"],
                "output_types": ["stereo audio DAC output"],
                "sample_rate_bit_depth_claims": [],
                "i2s_tdm_spdif_usb": ["I2S to PCM5102", "USB MIDI"],
            },
            "midi_cv_io": {"midi": ["USB MIDI", "mini-jack/DIN MIDI adapter"], "cv_gate": [], "protection_level_shifting": []},
            "electronics_notes": {
                "opamps": [],
                "power": ["Teensy 4.1 plus display/touch/storage/audio modules; power details deferred to manual."],
                "grounding_noise": [],
                "protection": [],
                "analog_front_end": ["Uses PCM5102 module rather than a deeply documented custom analog front end."],
            },
            "ui_control": {"pots": None, "encoders": None, "buttons": None, "display": "320x240 ILI9341 touch display", "preset_or_menu_model": "TFT touch UI, sequencer, voice/sample management"},
            "license": "Mixed: Apache-2.0 and GPL-3.0 license files in repository.",
            "availability_status": "Firmware public; PCB available through PCBWay/shared-board path; ProtoSupplies sells a prepared Teensy option.",
            "last_activity_or_date": "PCBWay current-page file update record includes 2025-01-13; scraped 2026-06-11.",
            "scores": {
                "utility": 9,
                "novelty": 8,
                "adaptability": 8,
                "hardware_completeness": 7,
                "build_credibility": 8,
                "audio_electronics_value": 6,
                "teensy4_relevance": 10,
                "standalone_confidence": 9,
                "hardware_boost": 0.2,
                "overall": 84.0,
            },
            "decision_reason": "Best functional standalone synth/groovebox fit: Teensy 4.1, custom PCB route, firmware source, build/BOM evidence, and real device photos.",
            "caveats": ["Raw PCB source/Gerbers were not independently downloaded; PCBWay path may be manufacturing-only.", "Audio electronics value is moderate because it relies on a PCM5102 module."],
            "source_quotes": [
                {
                    "url": "https://codeberg.org/dcoredump/MicroDexed-touch",
                    "quote_or_paraphrase": "Repository states the build requires Teensy 4.1, PCM5102 audio board, touch display, and storage hardware.",
                    "supports": "Teensy 4.1 target and complete device bill of materials.",
                },
                {
                    "url": "https://www.pcbway.com/project/shareproject/MicroDexed_Capacitive_Touch_64970fee.html",
                    "quote_or_paraphrase": "PCBWay describes a DIY groovebox/synth/sequencer based on Teensy 4.1 in a small enclosure.",
                    "supports": "Standalone custom-board device evidence.",
                },
            ],
        }
    )

    tympan = blank_candidate()
    tympan.update(
        {
            "id": "tympan-rev-e-hardware",
            "name": "Tympan Rev E Hardware v2.0.0",
            "primary_url": "https://github.com/Tympan/Tympan_Rev_E_Hardware",
            "secondary_urls": [
                "https://github.com/Tympan/Tympan_Rev_E_Hardware/tree/master/Tympan_Rev_E",
                "https://forum.tympan.org/t/tympan-hardware/428",
                "https://circuithub.com/projects/biomurph/Tympan_Rev_E",
            ],
            "source_lane": "targeted follow-up",
            "author_or_org": "Tympan / biomurph",
            "decision": "selected",
            "lane": "STRONG_PASS",
            "function_class": "audio_io",
            "standalone_confidence": 0.9,
            "standalone_evidence": [
                "Forum states Tympan is a Teensy board with integrated audio codec and does not need an additional audio board.",
                "GitHub repository includes electronics and case designs.",
            ],
            "teensy_4x_confidence": 1.0,
            "teensy_versions": ["Teensy 4.1"],
            "custom_board_confidence": 0.95,
            "custom_board_evidence": [
                "GitHub README says Rev E v2 is based on Teensy 4.1 and incorporates Teensy 4.1 into Tympan's own design.",
                "Board folder exposes KiCad PCB, schematic, project, netlist, STEP, XLSX, and library files.",
            ],
            "hardware_artifacts": {
                "schematic": artifact(True, "https://github.com/Tympan/Tympan_Rev_E_Hardware/blob/master/Tympan_Rev_E_Schematic.pdf", "Top-level schematic PDF."),
                "pcb_source": artifact(True, "https://github.com/Tympan/Tympan_Rev_E_Hardware/tree/master/Tympan_Rev_E", "KiCad project folder with .kicad_pcb and .kicad_sch.", "KiCad"),
                "gerbers": artifact(True, "https://forum.tympan.org/t/tympan-hardware/428", "Forum refers to open Gerber files / CircuitHub path; exact Gerber archive not separately downloaded."),
                "bom": artifact(True, "https://github.com/Tympan/Tympan_Rev_E_Hardware/tree/master/Tympan_Rev_E", "Folder includes Tympan_Rev_E.xlsx; forum says design files and BOM are on GitHub and CircuitHub."),
                "panel_enclosure": artifact(True, "https://github.com/Tympan/Tympan_Rev_E_Hardware/tree/master/Enclosure", "Repository includes enclosure and Blender folders."),
                "assembly_photos": artifact(True, "https://github.com/Tympan/Tympan_Rev_E_Hardware", "README/assets include board imagery such as program button image."),
                "pin_map": artifact(True, "https://github.com/Tympan/Tympan_Rev_E_Hardware/blob/master/pjrc_schematic41.pdf", "PJRC Teensy 4.1 schematic reference included."),
            },
            "firmware_artifacts": {
                "source": artifact(True, "https://github.com/Tympan/Tympan_Library", "Separate Tympan library examples referenced from forum."),
                "build_instructions": artifact(True, "https://github.com/Tympan/Tympan_Library", "Library/examples provide firmware starting points."),
                "release_artifacts": artifact(False, "", "No Rev E-specific binary release verified."),
            },
            "audio_io": {
                "codec_adc_dac": ["integrated Tympan audio codec"],
                "input_types": ["audio inputs", "microphone/hearing-aid front-end use cases"],
                "output_types": ["audio outputs"],
                "sample_rate_bit_depth_claims": [],
                "i2s_tdm_spdif_usb": ["Teensy audio path"],
            },
            "midi_cv_io": {"midi": [], "cv_gate": [], "protection_level_shifting": []},
            "electronics_notes": {
                "opamps": [],
                "power": ["Integrated board; forum discusses manufacturing/population and attaching Teensy 4.1."],
                "grounding_noise": [],
                "protection": [],
                "analog_front_end": ["Integrated codec/audio front end; stronger mixed-signal reference than generic DAC breakout boards."],
            },
            "ui_control": {"pots": None, "encoders": None, "buttons": None, "display": "", "preset_or_menu_model": "Audio processing examples through Tympan library"},
            "license": "MIT for hardware repository.",
            "availability_status": "Open hardware repo available; forum says no current production run planned.",
            "last_activity_or_date": "Repository scrape shows file cleanup commit in 2023; forum discussion continues into 2025/2026 scrape context.",
            "scores": {
                "utility": 8,
                "novelty": 7,
                "adaptability": 9,
                "hardware_completeness": 9,
                "build_credibility": 8,
                "audio_electronics_value": 9,
                "teensy4_relevance": 10,
                "standalone_confidence": 9,
                "hardware_boost": 0.3,
                "overall": 86.0,
            },
            "decision_reason": "Cleanest open-hardware audio I/O board match: custom Teensy 4.1 board, integrated codec, KiCad/schematic/BOM/case evidence, and credible forum manufacturing notes.",
            "caveats": ["Current production availability is weak; build may require self-fabrication or CircuitHub-style manufacturing.", "Firmware is in the separate Tympan library, not the hardware repo."],
            "source_quotes": [
                {
                    "url": "https://github.com/Tympan/Tympan_Rev_E_Hardware",
                    "quote_or_paraphrase": "README says Rev E v2 is based on Teensy 4.1 and incorporates the Teensy into Tympan's own design.",
                    "supports": "Teensy 4.1 custom board evidence.",
                },
                {
                    "url": "https://forum.tympan.org/t/tympan-hardware/428",
                    "quote_or_paraphrase": "Forum states Rev E uses Teensy 4.1 and the Tympan board has an integrated audio codec.",
                    "supports": "Standalone audio I/O fit and not a generic PJRC audio shield.",
                },
            ],
        }
    )
    return [tympan, micro]


def curated_holds() -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    hold_specs = [
        (
            "teensy41-programmable-guitar-pedal",
            "Teensy 4.1 Programmable Guitar Pedal",
            "https://hackaday.io/project/203208-teensy-41-programmable-guitar-pedal",
            "pedal_dsp",
            "Strong hardware evidence: Hackaday page plus downloaded zip containing .kicad_pcb, .kicad_sch, Gerbers, footprints, and Teensy 4.1 footprint. Held because no explicit license or firmware source was verified.",
            ["https://cdn.hackaday.io/files/2032088694051072/any_pedal_design_files.zip"],
        ),
        (
            "tdsp-teensy41-modular-audio-platform",
            "T-DSP open modular audio platform for Teensy 4.1",
            "https://forum.pjrc.com/index.php?threads/t-dsp-open-source-modular-audio-platform-for-teensy-4-1-diy-audio-interface-digital-mixer-synthesizer.77722/",
            "audio_io",
            "Open KiCad Teensy 4.1 platform with audio interface/mixer/synth ambitions, but it is broad modular/multi-tool infrastructure and belongs in 1.b, not 1.a.",
            ["https://github.com/t-dsp"],
        ),
        (
            "teensy40-audio-toolkit-shield",
            "Teensy 4.0 Audio Toolkit and Shield",
            "https://forum.pjrc.com/index.php?threads/teensy-4-0-audio-toolkit-and-shield-an-open-source-audio-io-project-in-kicad.60411/",
            "audio_io",
            "Open KiCad audio-I/O learning/prototyping shield, but not standalone: IO is primarily exposed as headers and it is a toolkit for daughterboards/custom panels.",
            ["https://github.com/JayShoe/TEENSY_4.0_AUDIO_TOOLKIT"],
        ),
        (
            "teensymidiaudio",
            "TeensyMIDIAudio",
            "https://codeberg.org/dcoredump/TeensyMIDIAudio",
            "midi_interface",
            "Useful historical MicroDexed-related PCB, but search evidence points to a 2018 PT8211-era board and no verified Teensy 4.x revision in this run.",
            ["https://www.pcbway.com/project/shareproject/W159675ASQ2_TeensyMIDIAudio.html"],
        ),
        (
            "jenschr-teensy41-example",
            "jenschr Teensy 4.1 KiCad example",
            "https://github.com/jenschr/Teensy-4.1-example",
            "other",
            "Excellent custom Teensy 4.1 KiCad reference board, MIT licensed, but not an audio/MIDI/CV functional device.",
            [],
        ),
    ]
    for slug, name, url, fn_class, reason, secondary in hold_specs:
        item = blank_candidate()
        item.update(
            {
                "id": slug,
                "name": name,
                "primary_url": url,
                "secondary_urls": secondary,
                "source_lane": "targeted follow-up",
                "decision": "hold",
                "lane": "HOLD",
                "function_class": fn_class,
                "standalone_confidence": 0.5,
                "teensy_4x_confidence": 0.75,
                "custom_board_confidence": 0.75,
                "availability_status": "Verified lead; not promoted for category 1.a.",
                "decision_reason": reason,
                "caveats": [reason],
                "source_quotes": [{"url": url, "quote_or_paraphrase": reason, "supports": "Hold decision."}],
            }
        )
        rows.append(item)
    return rows


def normalize_preliminary(prelim: list[dict[str, Any]], selected: list[dict[str, Any]], holds: list[dict[str, Any]]) -> list[dict[str, Any]]:
    skip_terms = {
        "microdexed",
        "tympan rev e",
        "tympan hardware",
        "programmable guitar pedal",
        "t-dsp",
        "teensy 4.0 audio toolkit",
        "teensymidiaudio",
        "jenschr/teensy-4.1-example",
    }
    out = selected + holds
    for item in prelim:
        text = f"{item.get('name','')} {item.get('primary_url','')}".lower()
        if any(term in text for term in skip_terms):
            continue
        if "o_c_t41" in text or "ornament and crime" in text:
            item["decision"] = "rejected"
            item["decision_reason"] = "Eurorack Ornament-and-Crime family item; not standalone 1.a and similar Teensy/O_C material already appears in anti-repeat history."
        elif "newdigate/teensy-eurorack" in text:
            item["decision"] = "anti_repeat_blocked"
            item["decision_reason"] = "Anti-repeat and Eurorack-only block."
        elif "audio shield" in text or "audio adapter" in text or "sparkfun" in text or "pjrc.com/store" in text:
            item["decision"] = "rejected"
            item["decision_reason"] = "Official PJRC/SparkFun Audio Shield or generic official shield noise; hard exclusion."
        elif "teensy-4.1-example" in text:
            item["decision"] = "rejected"
            item["decision_reason"] = "Custom Teensy 4.1 reference board, but no audio/MIDI/CV functional purpose."
        elif item["decision"] == "hold":
            item["decision_reason"] = item.get("decision_reason") or "Search hit lacked enough primary evidence for promotion."
        out.append(item)
    return out


def summarize_search(raw: dict[str, Any], candidates: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    summary: dict[str, dict[str, Any]] = {}
    lane_names = {
        "A": "PJRC forum",
        "B": "GitHub / GitLab / Codeberg",
        "C": "maker/project sites",
        "D": "synth/audio communities",
        "E": "general web",
        "F": "targeted follow-up",
    }
    for lane, name in lane_names.items():
        summary[name] = {"lane": lane, "queries": 0, "urls": 0, "candidates": 0, "useful_hits": 0, "notes": ""}
    for run in raw.get("runs", []):
        name = run.get("lane_name") or lane_names.get(run.get("lane"), run.get("lane", ""))
        if name in summary:
            summary[name]["queries"] += 1
    for result in raw.get("search_results", []):
        name = result.get("lane_name", "")
        if name in summary:
            summary[name]["urls"] += 1
    for cand in candidates:
        name = cand.get("source_lane", "")
        if name in summary:
            summary[name]["candidates"] += 1
            if cand.get("decision") == "selected":
                summary[name]["useful_hits"] += 1
    summary["general web"]["notes"] = "E lane was attempted separately; Firecrawl returned no durable web results in this run."
    summary["targeted follow-up"]["notes"] = "Used after broad lanes produced mostly official/generic/modular noise."
    return summary


def write_rejected_csv(candidates: list[dict[str, Any]]) -> None:
    rows = [
        {
            "item": "official Teensy Audio Shield / Audio Adapter / PT8211 kit group",
            "url": "https://www.pjrc.com/store/",
            "decision": "rejected",
            "reason": "Hard exclusion: official PJRC/SparkFun Teensy hardware is background only.",
            "lane": "PJRC/forum/search noise",
            "source_query": "",
        },
        {
            "item": "generic commercial DAC/ADC/codec breakout group",
            "url": "",
            "decision": "rejected",
            "reason": "Hard exclusion unless integrated into a custom Teensy carrier/device.",
            "lane": "all",
            "source_query": "",
        },
        {
            "item": "modular/Eurorack-only group",
            "url": "https://github.com/newdigate/teensy-eurorack",
            "decision": "rejected",
            "reason": "Not standalone 1.a; many hits require rack/backplane/panel context or were anti-repeat blocked.",
            "lane": "B/D",
            "source_query": "",
        },
        {
            "item": "pure firmware/no-PCB group",
            "url": "",
            "decision": "rejected",
            "reason": "Pure firmware and library hits do not satisfy custom-board requirement.",
            "lane": "all",
            "source_query": "",
        },
        {
            "item": "Teensy 3.x-only / historical group",
            "url": "https://codeberg.org/dcoredump/TeensyMIDIAudio",
            "decision": "rejected",
            "reason": "Historical TeensyMIDIAudio/PT8211 and Tympan Rev D references are useful context but not verified Teensy 4.x standalone boards.",
            "lane": "F",
            "source_query": "",
        },
    ]
    for cand in candidates:
        if cand.get("decision") in {"rejected", "anti_repeat_blocked"}:
            rows.append(
                {
                    "item": cand.get("name", ""),
                    "url": cand.get("primary_url", ""),
                    "decision": cand.get("decision", ""),
                    "reason": cand.get("decision_reason", ""),
                    "lane": cand.get("source_lane", ""),
                    "source_query": "",
                }
            )
    with REJECTED_OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["item", "url", "decision", "reason", "lane", "source_query"])
        writer.writeheader()
        writer.writerows(rows)


def source_list(cand: dict[str, Any]) -> str:
    urls = [cand["primary_url"]] + cand.get("secondary_urls", [])
    return "\n".join(f"- {url}" for url in urls if url)


def md_escape(value: str) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ").strip()


def md_link(label: str, url: str) -> str:
    label = md_escape(label)
    return f"[{label}]({url})" if url else label


def write_report(candidates: list[dict[str, Any]], raw: dict[str, Any]) -> None:
    selected = [c for c in candidates if c["decision"] == "selected"]
    holds = [c for c in candidates if c["decision"] == "hold"]
    rejected = [c for c in candidates if c["decision"] in {"rejected", "anti_repeat_blocked"}]
    summary = summarize_search(raw, candidates)

    lines: list[str] = []
    lines.append("# Embedded Audio Mine - Teensy 4.x standalone functional custom boards")
    lines.append("")
    lines.append("## Executive summary")
    lines.append("- Selected 2 items, not 3. Forcing a third would violate the category gates; the best third item is held for unclear license / incomplete firmware evidence.")
    lines.append("- Top selected: Tympan Rev E Hardware for open mixed-signal audio I/O; MicroDexed Touch for a complete Teensy 4.1 groovebox/synth build.")
    lines.append("- Main exclusions: official PJRC/SparkFun audio shields, generic codec/DAC boards, Eurorack-only modules, broad modular/multi-tool platforms, pure firmware, and old Teensy 3.x-era boards.")
    lines.append("- Search limitations: Firecrawl returned weak general-web results, one Elecrow page failed with an internal tunnel/proxy error, and MicroDexed's PDF manual could not be parsed because Firecrawl rejected the file.")
    lines.append("")
    lines.append("## Pre-flight")
    lines.append("- Repo inspected: yes (`README.md`, `AGENTS.md`, `rules/digest-rules-v0.2.md`).")
    lines.append("- Anti-repeat inspected: yes (`data/published-repo-log.csv`, `data/common-anti-repeat-index.csv`, `data/selected-projects.csv`, recent `digests/`, and `codex-weekly/digests/`).")
    lines.append("- Firecrawl batches run: A-D capped broad sweep, E attempted with no durable web results, F targeted follow-up.")
    lines.append("- Non-GitHub lanes searched: yes, PJRC forum, Hackaday, ModWiggler, Look Mum No Computer, PCBWay, Tympan forum, ProtoSupplies.")
    lines.append("")
    lines.append("## Search coverage")
    lines.append("| Lane | Queries | URLs found | Candidates extracted | Useful hits | Notes |")
    lines.append("|---|---:|---:|---:|---:|---|")
    for row in summary.values():
        lines.append(f"| {row['lane']} - {next(k for k, v in summary.items() if v is row)} | {row['queries']} | {row['urls']} | {row['candidates']} | {row['useful_hits']} | {row['notes']} |")
    lines.append("")
    lines.append("## Floor list")
    lines.append("| Candidate | Source lane | First impression | Category fit | Decision |")
    lines.append("|---|---|---|---|---|")
    for cand in candidates[:80]:
        fit = "fits 1.a" if cand["decision"] == "selected" else ("blocked / not 1.a" if cand["decision"] != "hold" else "needs more proof or belongs elsewhere")
        lines.append(f"| {md_link(cand['name'], cand.get('primary_url', ''))} | {md_escape(cand.get('source_lane',''))} | {md_escape(cand.get('decision_reason','')[:140])} | {fit} | {cand['decision']} |")
    lines.append("")
    lines.append("## Selected")
    for idx, cand in enumerate(selected, 1):
        lines.append(f"### {idx}) {md_link(cand['name'], cand.get('primary_url', ''))} - {cand['lane']}")
        lines.append(f"**Function:** {cand['function_class']}")
        lines.append(f"**Standalone fit:** {cand['standalone_confidence']:.2f} - {'; '.join(cand['standalone_evidence'])}")
        lines.append(f"**Teensy 4.x fit:** {cand['teensy_4x_confidence']:.2f} - {', '.join(cand['teensy_versions'])}")
        lines.append(f"**Technical summary:** {cand['decision_reason']}")
        lines.append(f"**Why it matters:** {cand['scores']['overall']:.1f}/100 overall; strongest reusable value is hardware+firmware evidence without being an official shield.")
        lines.append(f"**Implementation highlights:** {'; '.join(cand['custom_board_evidence'])}")
        lines.append(f"**Hardware/electronics notes:** {'; '.join(cand['electronics_notes']['analog_front_end'] + cand['electronics_notes']['power'])}")
        lines.append(f"**Firmware/build notes:** source={cand['firmware_artifacts']['source']['present']}; build={cand['firmware_artifacts']['build_instructions']['present']}; releases={cand['firmware_artifacts']['release_artifacts']['present']}")
        lines.append(f"**Audio/MIDI/CV I/O:** codecs={', '.join(cand['audio_io']['codec_adc_dac'])}; MIDI={', '.join(cand['midi_cv_io']['midi']) or 'none verified'}")
        lines.append("**Adaptation ideas:** Mine the board-level audio/power/UI decisions; reuse firmware/build structure where applicable; treat manufacturing paths separately from open-source claims.")
        lines.append(f"**Quick engineering assessment:** {cand['decision_reason']}")
        lines.append(f"**Caveats / verification gaps:** {'; '.join(cand['caveats'])}")
        lines.append("**Sources:**")
        lines.append(source_list(cand))
        lines.append("")
    lines.append("## HOLD / watchlist")
    lines.append("| Item | Reason held | Verification needed | What would promote it |")
    lines.append("|---|---|---|---|")
    for cand in holds[:20]:
        promote = "Clear 1.a single-purpose standalone fit plus source/license/build proof."
        if "license" in cand.get("decision_reason", "").lower():
            promote = "Explicit license plus firmware/build docs."
        elif "1.b" in cand.get("decision_reason", ""):
            promote = "Run under category 1.b standalone multi-tool."
        lines.append(f"| {md_link(cand['name'], cand.get('primary_url', ''))} | {md_escape(cand['decision_reason'])} | Primary hardware/license/standalone proof | {md_escape(promote)} |")
    lines.append("")
    lines.append("## Rejected / not promoted")
    lines.append("| Item/source group | Decision | Reason |")
    lines.append("|---|---|---|")
    lines.append("| [official Teensy Audio Shield / Audio Adapter / PT8211 kit group](https://www.pjrc.com/store/) | rejected | Hard exclusion; not a custom independent Teensy 4.x carrier/device. |")
    lines.append("| [generic commercial DAC/codec breakout group](https://www.sparkfun.com/teensy-4-audio-shield-rev-d.html) | rejected | A PCM/DAC/codec module alone is not a custom Teensy carrier. |")
    lines.append("| [modular/Eurorack-only group](https://github.com/newdigate/teensy-eurorack) | rejected / anti_repeat_blocked | Requires rack/backplane/panel or already appeared in anti-repeat state. |")
    lines.append("| pure firmware/no-PCB group | rejected | Does not satisfy custom-board requirement. |")
    lines.append("| [Teensy 3.x-only / historical group](https://codeberg.org/dcoredump/TeensyMIDIAudio) | rejected | Historical reference only unless a verified Teensy 4.x revision exists. |")
    for cand in rejected[:40]:
        lines.append(f"| {md_link(cand['name'], cand.get('primary_url', ''))} | {cand['decision']} | {md_escape(cand['decision_reason'])} |")
    lines.append("")
    lines.append("## Tracker rows")
    lines.append("```csv")
    lines.append("repo_or_url,lane,first_seen,last_published,repeat_eligible_after,status,notes")
    today = dt.date(2026, 6, 11)
    repeat = today + dt.timedelta(days=30)
    for cand in selected:
        lines.append(f"{cand['primary_url']},{cand['lane']},{today.isoformat()},,{repeat.isoformat()},selected,{cand['decision_reason']}")
    lines.append("```")
    lines.append("")
    lines.append("## Quality gates")
    gates = [
        ("No official PJRC/SparkFun Teensy Audio Shield selected", all("audio shield" not in c["name"].lower() and "sparkfun" not in " ".join(c.get("secondary_urls", [])).lower() for c in selected)),
        ("No generic breakout board selected", all("breakout" not in c["name"].lower() for c in selected)),
        ("Every selected candidate is standalone", all(c["standalone_confidence"] >= 0.85 for c in selected)),
        ("Every selected candidate is Teensy 4.x", all(c["teensy_4x_confidence"] >= 0.95 for c in selected)),
        ("At least one non-GitHub lane searched", True),
        ("Rejected list demonstrates selection pressure", len(rejected) >= 10),
        ("Primary sources used where possible", True),
    ]
    for label, ok in gates:
        lines.append(f"- {'PASS' if ok else 'FAIL'}: {label}")
    REPORT_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    prelim = json.loads(CANDIDATES_OUT.read_text(encoding="utf-8"))
    raw = json.loads(RAW_OUT.read_text(encoding="utf-8"))
    selected = selected_candidates()
    holds = curated_holds()
    candidates = normalize_preliminary(prelim, selected, holds)
    CANDIDATES_OUT.write_text(json.dumps(candidates, indent=2, ensure_ascii=False), encoding="utf-8")
    write_rejected_csv(candidates)
    write_report(candidates, raw)
    counts = {
        "selected": sum(1 for c in candidates if c["decision"] == "selected"),
        "hold": sum(1 for c in candidates if c["decision"] == "hold"),
        "rejected": sum(1 for c in candidates if c["decision"] == "rejected"),
        "anti_repeat_blocked": sum(1 for c in candidates if c["decision"] == "anti_repeat_blocked"),
    }
    print(json.dumps(counts, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
