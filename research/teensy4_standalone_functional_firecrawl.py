#!/usr/bin/env python3
"""Firecrawl-assisted discovery workflow for Teensy 4.x standalone boards.

This script is intentionally conservative: search results are evidence leads,
not promotion proof. It records raw Firecrawl data, builds an anti-repeat set
from the Embedded Audio Mine repo, and emits a preliminary candidate/reject
floor list for manual primary-source verification.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import os
import re
import subprocess
import sys
from collections import Counter, OrderedDict
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse, urlunparse


ROOT = Path(__file__).resolve().parents[1]
PROMPTS = ROOT / "research" / "prompts" / "teensy4_standalone_functional_queries.txt"
OUT = ROOT / "research" / "outputs"
RAW_OUT = OUT / "teensy4_standalone_functional_raw.json"
CANDIDATES_OUT = OUT / "teensy4_standalone_functional_candidates.json"
REJECTED_OUT = OUT / "teensy4_standalone_functional_rejected.csv"

LANE_NAMES = OrderedDict(
    [
        ("A", "PJRC forum"),
        ("B", "GitHub / GitLab / Codeberg"),
        ("C", "maker/project sites"),
        ("D", "synth/audio communities"),
        ("E", "general web"),
        ("F", "targeted follow-up"),
    ]
)

HARD_EXCLUSION_PATTERNS = [
    ("official_teensy_audio_shield", re.compile(r"\b(audio adapter|audio shield|rev d|pt8211)\b", re.I)),
    ("sparkfun_official", re.compile(r"\bsparkfun\b", re.I)),
    ("generic_breakout", re.compile(r"\b(breakout|evaluation board|eval board|module)\b", re.I)),
    ("eurorack_only", re.compile(r"\b(eurorack|10hp|4hp|rack power|modular)\b", re.I)),
    ("teensy_3x_only", re.compile(r"\bteensy\s*3\.[0-9]\b", re.I)),
    ("pure_firmware_hint", re.compile(r"\b(library|firmware only|audio library|example code)\b", re.I)),
]


def slugify(value: str, max_len: int = 88) -> str:
    value = value.lower()
    value = re.sub(r"https?://", "", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return (value or "item")[:max_len]


def canonical_url(url: str) -> str:
    parsed = urlparse(url.strip())
    host = parsed.netloc.lower()
    path = re.sub(r"/+$", "", parsed.path)
    query = parse_qs(parsed.query)
    keep_query = {}
    for key in ("threads", "p", "node-id"):
        if key in query:
            keep_query[key] = query[key]
    clean_query = ""
    if keep_query:
        clean_query = "&".join(f"{k}={v[0]}" for k, v in sorted(keep_query.items()))
    return urlunparse((parsed.scheme or "https", host, path, "", clean_query, ""))


def github_repo_slug(url: str) -> str | None:
    parsed = urlparse(url)
    host = parsed.netloc.lower()
    if host not in {"github.com", "www.github.com"}:
        return None
    parts = [p for p in parsed.path.split("/") if p]
    if len(parts) >= 2:
        return f"{parts[0]}/{parts[1]}"
    return None


def read_queries(path: Path) -> list[dict[str, str]]:
    queries: list[dict[str, str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        lane, query = line.split("\t", 1)
        queries.append({"lane": lane, "lane_name": LANE_NAMES.get(lane, lane), "query": query})
    return queries


def run_command(cmd: list[str], timeout: int) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=ROOT,
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=timeout,
    )


def firecrawl_cmd() -> list[str]:
    direct = "firecrawl.cmd" if os.name == "nt" else "firecrawl"
    if shutil_which(direct):
        return [direct]
    npx = "npx.cmd" if os.name == "nt" else "npx"
    return [npx, "-y", "firecrawl-cli@latest"]


def shutil_which(command: str) -> str | None:
    from shutil import which

    return which(command)


def firecrawl_status() -> dict[str, Any]:
    proc = run_command(firecrawl_cmd() + ["--status"], timeout=90)
    return {
        "ok": proc.returncode == 0,
        "stdout": proc.stdout.strip(),
        "stderr": proc.stderr.strip(),
        "command": " ".join(firecrawl_cmd() + ["--status"]),
    }


def run_searches(
    queries: list[dict[str, str]],
    limit: int,
    max_queries_per_lane: int | None,
    lane_filter: set[str] | None,
    timeout: int,
) -> list[dict[str, Any]]:
    OUT.mkdir(parents=True, exist_ok=True)
    lane_counts: Counter[str] = Counter()
    raw_runs: list[dict[str, Any]] = []
    for entry in queries:
        lane = entry["lane"]
        if lane_filter and lane not in lane_filter:
            continue
        if max_queries_per_lane is not None and lane_counts[lane] >= max_queries_per_lane:
            continue
        lane_counts[lane] += 1
        query = entry["query"]
        out_file = OUT / f"firecrawl_search_{lane}_{lane_counts[lane]:02d}_{slugify(query)}.json"
        cmd = firecrawl_cmd() + ["search", query, "--limit", str(limit), "--json", "-o", str(out_file)]
        started = dt.datetime.now(dt.timezone.utc).isoformat()
        proc = run_command(cmd, timeout=timeout)
        payload: Any = None
        if out_file.exists():
            try:
                payload = json.loads(out_file.read_text(encoding="utf-8"))
            except json.JSONDecodeError as exc:
                payload = {"parse_error": str(exc), "raw_path": str(out_file)}
        raw_runs.append(
            {
                "lane": lane,
                "lane_name": entry["lane_name"],
                "query": query,
                "command": " ".join(cmd),
                "output_file": str(out_file.relative_to(ROOT)),
                "started_at": started,
                "returncode": proc.returncode,
                "stdout": proc.stdout.strip(),
                "stderr": proc.stderr.strip(),
                "payload": payload,
            }
        )
    return raw_runs


def extract_search_items(raw_runs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    seen: set[str] = set()
    for run in raw_runs:
        payload = run.get("payload") or {}
        web = (((payload.get("data") or {}).get("web")) if isinstance(payload, dict) else None) or []
        for item in web:
            url = item.get("url", "")
            if not url:
                continue
            canon = canonical_url(url)
            key = canon.lower()
            if key in seen:
                continue
            seen.add(key)
            rows.append(
                {
                    "query": run["query"],
                    "lane": run["lane"],
                    "lane_name": run["lane_name"],
                    "title": item.get("title", ""),
                    "url": url,
                    "canonical_url": canon,
                    "snippet": item.get("description") or item.get("snippet") or "",
                    "position": item.get("position"),
                    "crawl_status": "search_result_only",
                }
            )
    return rows


def read_csv_rows(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def build_anti_repeat() -> dict[str, Any]:
    hard: set[str] = set()
    soft: set[str] = set()
    sources: list[dict[str, str]] = []

    published = ROOT / "data" / "published-repo-log.csv"
    for row in read_csv_rows(published):
        repo = (row.get("repo") or "").strip()
        if repo:
            hard.add(repo.lower())
            sources.append({"resource": repo, "source": str(published.relative_to(ROOT)), "scope": "hard"})

    common = ROOT / "data" / "common-anti-repeat-index.csv"
    for row in read_csv_rows(common):
        resource = (row.get("resource") or "").strip()
        scope = (row.get("anti_repeat_scope") or "").strip().lower()
        if resource and scope == "hard":
            hard.add(resource.lower())
            sources.append({"resource": resource, "source": str(common.relative_to(ROOT)), "scope": "hard"})
        elif resource:
            soft.add(resource.lower())

    selected = ROOT / "data" / "selected-projects.csv"
    for row in read_csv_rows(selected):
        project = (row.get("project") or "").strip()
        if project:
            soft.add(project.lower())
            sources.append({"resource": project, "source": str(selected.relative_to(ROOT)), "scope": "soft"})

    digest_paths = list((ROOT / "digests").glob("*.md")) + list((ROOT / "codex-weekly" / "digests").glob("*.md"))
    repo_pattern = re.compile(r"github\.com/([A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+)")
    for path in digest_paths:
        if path.name.lower() == "readme.md":
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for match in repo_pattern.finditer(text):
            repo = match.group(1)
            hard.add(repo.lower())
            sources.append({"resource": repo, "source": str(path.relative_to(ROOT)), "scope": "hard"})

    return {"hard": sorted(hard), "soft": sorted(soft), "sources": sources}


def exclusion_reason(item: dict[str, Any], anti_repeat: dict[str, Any]) -> str | None:
    text = " ".join([item.get("title", ""), item.get("snippet", ""), item.get("url", "")])
    repo = github_repo_slug(item.get("url", ""))
    if repo and repo.lower() in set(anti_repeat["hard"]):
        return "anti_repeat_blocked"
    for label, pattern in HARD_EXCLUSION_PATTERNS:
        if pattern.search(text):
            return label
    if "pjrc.com/store" in item.get("url", "").lower():
        return "official_teensy_hardware"
    return None


def candidate_from_item(item: dict[str, Any], anti_repeat: dict[str, Any]) -> dict[str, Any]:
    reason = exclusion_reason(item, anti_repeat)
    decision = "rejected" if reason and reason != "anti_repeat_blocked" else ("anti_repeat_blocked" if reason else "hold")
    title = item.get("title") or item.get("canonical_url")
    repo = github_repo_slug(item.get("url", ""))
    stable = repo or title
    return {
        "id": slugify(stable),
        "name": title,
        "primary_url": item.get("canonical_url") or item.get("url"),
        "secondary_urls": [],
        "source_lane": item.get("lane_name", ""),
        "author_or_org": (repo.split("/")[0] if repo else ""),
        "category": "1.a standalone functional",
        "candidate_type": "custom_teensy4_board",
        "decision": decision,
        "lane": "HOLD" if decision == "hold" else "REJECT",
        "function_class": "other",
        "standalone_confidence": 0.0,
        "standalone_evidence": [],
        "teensy_4x_confidence": 0.4 if re.search(r"Teensy\s*4", item.get("snippet", "") + title, re.I) else 0.0,
        "teensy_versions": [],
        "custom_board_confidence": 0.2 if re.search(r"\b(PCB|KiCad|Gerber|board)\b", item.get("snippet", "") + title, re.I) else 0.0,
        "custom_board_evidence": [],
        "hardware_artifacts": {
            "schematic": {"present": False, "url": "", "notes": ""},
            "pcb_source": {"present": False, "url": "", "format": "", "notes": ""},
            "gerbers": {"present": False, "url": "", "notes": ""},
            "bom": {"present": False, "url": "", "notes": ""},
            "panel_enclosure": {"present": False, "url": "", "notes": ""},
            "assembly_photos": {"present": False, "url": "", "notes": ""},
            "pin_map": {"present": False, "url": "", "notes": ""},
        },
        "firmware_artifacts": {
            "source": {"present": False, "url": "", "notes": ""},
            "build_instructions": {"present": False, "url": "", "notes": ""},
            "release_artifacts": {"present": False, "url": "", "notes": ""},
        },
        "audio_io": {
            "codec_adc_dac": [],
            "input_types": [],
            "output_types": [],
            "sample_rate_bit_depth_claims": [],
            "i2s_tdm_spdif_usb": [],
        },
        "midi_cv_io": {"midi": [], "cv_gate": [], "protection_level_shifting": []},
        "electronics_notes": {"opamps": [], "power": [], "grounding_noise": [], "protection": [], "analog_front_end": []},
        "ui_control": {"pots": None, "encoders": None, "buttons": None, "display": "", "preset_or_menu_model": ""},
        "license": "",
        "availability_status": "unverified search hit",
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
        "decision_reason": reason or "Search hit needs primary-source verification before promotion.",
        "caveats": ["Search result only; not promoted without primary-source evidence."],
        "source_quotes": [
            {
                "url": item.get("url", ""),
                "quote_or_paraphrase": item.get("snippet", ""),
                "supports": "Discovery lead only.",
            }
        ],
    }


def write_preliminary_outputs(raw_runs: list[dict[str, Any]], anti_repeat: dict[str, Any]) -> dict[str, Any]:
    search_items = extract_search_items(raw_runs)
    candidates = [candidate_from_item(item, anti_repeat) for item in search_items]
    raw_payload = {
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        "repo": str(ROOT),
        "firecrawl_status": firecrawl_status(),
        "anti_repeat": {"hard_count": len(anti_repeat["hard"]), "soft_count": len(anti_repeat["soft"])},
        "runs": raw_runs,
        "search_results": search_items,
    }
    RAW_OUT.write_text(json.dumps(raw_payload, indent=2, ensure_ascii=False), encoding="utf-8")
    CANDIDATES_OUT.write_text(json.dumps(candidates, indent=2, ensure_ascii=False), encoding="utf-8")
    with REJECTED_OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["item", "url", "decision", "reason", "lane", "source_query"])
        writer.writeheader()
        for candidate in candidates:
            if candidate["decision"] in {"rejected", "anti_repeat_blocked"}:
                writer.writerow(
                    {
                        "item": candidate["name"],
                        "url": candidate["primary_url"],
                        "decision": candidate["decision"],
                        "reason": candidate["decision_reason"],
                        "lane": candidate["source_lane"],
                        "source_query": "",
                    }
                )
    return {"search_items": len(search_items), "candidates": len(candidates)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--search", action="store_true", help="Run Firecrawl searches from the query file.")
    parser.add_argument("--limit", type=int, default=5, help="Firecrawl results per query.")
    parser.add_argument("--max-queries-per-lane", type=int, default=None, help="Conservative lane cap for trial runs.")
    parser.add_argument("--lanes", default="", help="Comma-separated lane letters, e.g. A,B,C.")
    parser.add_argument("--timeout", type=int, default=120, help="Timeout per Firecrawl search command.")
    parser.add_argument("--no-write", action="store_true", help="Run searches but do not assemble aggregate outputs.")
    args = parser.parse_args()

    queries = read_queries(PROMPTS)
    lane_filter = {lane.strip().upper() for lane in args.lanes.split(",") if lane.strip()} or None
    anti_repeat = build_anti_repeat()
    OUT.mkdir(parents=True, exist_ok=True)

    raw_runs: list[dict[str, Any]] = []
    if args.search:
        raw_runs = run_searches(
            queries=queries,
            limit=args.limit,
            max_queries_per_lane=args.max_queries_per_lane,
            lane_filter=lane_filter,
            timeout=args.timeout,
        )
    else:
        for path in sorted(OUT.glob("firecrawl_search_*.json")):
            raw_runs.append(
                {
                    "lane": path.name.split("_")[2],
                    "lane_name": LANE_NAMES.get(path.name.split("_")[2], ""),
                    "query": "",
                    "command": "",
                    "output_file": str(path.relative_to(ROOT)),
                    "started_at": "",
                    "returncode": 0,
                    "stdout": "",
                    "stderr": "",
                    "payload": json.loads(path.read_text(encoding="utf-8")),
                }
            )

    if args.no_write:
        return 0
    summary = write_preliminary_outputs(raw_runs, anti_repeat)
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
