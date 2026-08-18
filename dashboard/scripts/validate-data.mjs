import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const data = JSON.parse(readFileSync(path.join(dashboardRoot, "src", "data", "projects.json"), "utf8"));

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  const pushField = () => { row.push(field); field = ""; };
  const pushRow = () => { pushField(); if (row.some((value) => value.length)) rows.push(row); row = []; };
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"') { if (text[index + 1] === '"') { field += '"'; index += 1; } else quoted = false; }
      else field += char;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ",") pushField();
    else if (char === "\n") pushRow();
    else if (char !== "\r") field += char;
  }
  if (field.length || row.length) pushRow();
  if (!rows.length) return [];
  const headers = rows[0].map((value) => value.trim());
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, String(values[index] ?? "").trim()])));
}
function readCsv(relativePath) { return parseCsv(readFileSync(path.join(repoRoot, relativePath), "utf8")); }
function normalizeResource(value) { return String(value || "").trim().replace(/^https:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/[)>.,;]+$/g, "").replace(/\s*\/\s*/g, "/"); }
function safeDate(value) { return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : ""; }
function assert(condition, message) { if (!condition) throw new Error(message); }
function extractHeadingResources(heading, block) {
  const resources = new Set();
  const add = (value) => { const normalized = normalizeResource(value); if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(normalized)) resources.add(normalized); };
  for (const match of heading.matchAll(/https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/gi)) add(match[1]);
  for (const match of heading.matchAll(/`([A-Za-z0-9_.-]+\s*\/\s*[A-Za-z0-9_.-]+)`/g)) add(match[1]);
  for (const match of heading.matchAll(/(?:^|[\s+(])([A-Za-z0-9_.-]+\s*\/\s*[A-Za-z0-9_.-]+)(?=\s|\+|—|-|$)/g)) add(match[1]);
  if (!resources.size) for (const match of String(block || "").matchAll(/https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/gi)) { add(match[1]); if (resources.size >= 2) break; }
  return [...resources];
}
function compositeResource(resources) {
  if (resources.length < 2) return "";
  const parsed = resources.map((resource) => resource.split("/"));
  if (!parsed.every(([owner]) => owner.toLowerCase() === parsed[0][0].toLowerCase())) return "";
  return `${parsed[0][0]}/${parsed.map(([, repo]) => repo).join("+")}`;
}

const published = readCsv("data/published-repo-log.csv");
const selected = readCsv("data/selected-projects.csv");
const common = readCsv("data/common-anti-repeat-index.csv");
const history = JSON.parse(readFileSync(path.join(repoRoot, "codex-weekly", "data", "repo_feature_history.json"), "utf8"));
const runDir = path.join(repoRoot, "codex-weekly", "data", "runs");
const codexRunFiles = readdirSync(runDir).filter((name) => /^digest_\d{4}-\d{2}-\d{2}\.json$/.test(name));

const canonical = new Set();
for (const row of published) canonical.add(normalizeResource(row.repo).toLowerCase());
for (const row of selected) canonical.add(normalizeResource(row.project).toLowerCase());
for (const row of common) canonical.add(normalizeResource(row.resource).toLowerCase());
for (const repo of Object.keys(history.repos || {})) canonical.add(normalizeResource(repo).toLowerCase());
canonical.delete("");

const ids = data.projects.map((project) => project.id);
const idSet = new Set(ids);
assert(idSet.size === ids.length, `duplicate project ids: ${ids.length - idSet.size}`);
const missingCanonical = [...canonical].filter((id) => !idSet.has(id));
assert(!missingCanonical.length, `dashboard missing canonical resources: ${missingCanonical.join(", ")}`);
assert(data.sourceSummary.publishedRows === published.length, `published row count drift: ${data.sourceSummary.publishedRows} != ${published.length}`);
assert(data.sourceSummary.selectedRows === selected.length, `selected row count drift: ${data.sourceSummary.selectedRows} != ${selected.length}`);
assert(data.sourceSummary.commonIndexRows === common.length, `common-index row count drift: ${data.sourceSummary.commonIndexRows} != ${common.length}`);
assert(data.sourceSummary.codexRunFiles === codexRunFiles.length, `Codex run-file count drift: ${data.sourceSummary.codexRunFiles} != ${codexRunFiles.length}`);

const digestDir = path.join(repoRoot, "digests");
const digestFiles = readdirSync(digestDir).filter((name) => name.endsWith(".md")).sort();
const analogFiles = digestFiles.filter((name) => /^\d{4}-\d{2}-\d{2}-analog-audio-mine\.md$/.test(name));
const rankedComponents = new Set();
const rankedComposites = new Set();
for (const fileName of digestFiles.filter((name) => !name.includes("analog-audio-mine"))) {
  const text = readFileSync(path.join(digestDir, fileName), "utf8");
  const headingPattern = /^#{2,3}\s+\d+[.)]?\s+(.+)$/gm;
  const matches = [...text.matchAll(headingPattern)];
  for (let index = 0; index < matches.length; index += 1) {
    const heading = matches[index][1];
    if (!/\b(STRONG_PASS|REF_PASS|PASS|HOLD|FOUNDATION_UPDATE)\b/.test(heading)) continue;
    const start = matches[index].index ?? 0, end = matches[index + 1]?.index ?? text.length;
    const resources = extractHeadingResources(heading, text.slice(start, end));
    for (const resource of resources) rankedComponents.add(resource.toLowerCase());
    const composite = compositeResource(resources); if (composite) rankedComposites.add(composite.toLowerCase());
  }
}
for (const id of rankedComponents) assert(idSet.has(id), `ranked digest repository missing from dashboard: ${id}`);
for (const id of rankedComposites) assert(idSet.has(id), `ranked digest composite missing from dashboard: ${id}`);
const rankedOnly = [...new Set([...rankedComponents, ...rankedComposites])].filter((id) => !canonical.has(id));

const analogRows = new Map();
let latestAnalogDate = "";
for (const fileName of analogFiles) {
  const text = readFileSync(path.join(digestDir, fileName), "utf8"), fallbackDate = safeDate(fileName);
  const blockPattern = /##\s+(?:Proposed\s+)?publication(?:-tracker)?\s+rows\s*\n+```csv\s*\n([\s\S]*?)```/gi;
  for (const match of text.matchAll(blockPattern)) for (const row of parseCsv(match[1])) {
    const resource = normalizeResource(row.repo); if (!resource) continue;
    const date = safeDate(row.last_published) || fallbackDate;
    analogRows.set(resource.toLowerCase(), { resource, date });
    if (date > latestAnalogDate) latestAnalogDate = date;
  }
}
assert(data.sourceSummary.analogDigestFiles === analogFiles.length, `analog digest count drift: ${data.sourceSummary.analogDigestFiles} != ${analogFiles.length}`);
assert(data.metrics.latestAnalogDate === latestAnalogDate, `latest Analog date drift: ${data.metrics.latestAnalogDate} != ${latestAnalogDate}`);
for (const [id, evidence] of analogRows) {
  const project = data.projects.find((item) => item.id === id);
  assert(project, `Analog publication missing from dashboard: ${evidence.resource}`);
  assert(project.digestStreams.includes("analog_weekly"), `Analog provenance missing for ${evidence.resource}`);
  assert(project.streams.includes("webgpt_daily"), `canonical WebGPT anti-repeat ownership lost for ${evidence.resource}`);
  assert(project.digestDatesByStream.analog_weekly.includes(evidence.date), `Analog digest date missing for ${evidence.resource}`);
}

for (const project of data.projects) {
  for (const field of ["repositoryTypes", "hardwareEvidence", "mcuPlatforms", "languagesFrameworks", "effects", "classificationGaps"]) assert(Array.isArray(project[field]), `${project.repo}: ${field} is not an array`);
  assert(["high", "medium", "low"].includes(project.classificationConfidence), `${project.repo}: invalid classification confidence`);
  assert(project.digestDatesByStream && Array.isArray(project.digestDatesByStream.webgpt_daily) && Array.isArray(project.digestDatesByStream.codex_weekly) && Array.isArray(project.digestDatesByStream.analog_weekly), `${project.repo}: digest provenance incomplete`);
}
for (const expected of ["C++", "Faust", "JUCE"]) assert(data.languageFrameworkDistribution.some((point) => point.key === expected && point.count > 0), `requested framework filter has no records: ${expected}`);
assert(data.hardwareEvidenceDistribution.some((point) => point.key === "Editable EDA"), "hardware evidence distribution missing Editable EDA");
assert(data.effectDistribution.some((point) => point.key === "Delay / Echo"), "effect distribution missing Delay / Echo");
assert(data.mcuPlatformDistribution.some((point) => point.key === "Daisy / STM32H7"), "MCU distribution missing Daisy / STM32H7");

const lunchbeat = data.projects.find((project) => project.id === "buranelectrix/lunchbeat-pcb");
assert(lunchbeat, "lunchbeat regression fixture missing");
assert(!lunchbeat.mcuPlatforms.includes("RP2350 / Pico 2"), "adaptation idea leaked RP2350 into lunchbeat implementation facets");
assert(!lunchbeat.effects.includes("Looper / Sampler"), "adaptation idea leaked sample playback into lunchbeat implementation facets");
const pico2 = data.projects.find((project) => project.id === "ice458/pico_synthesizer");
assert(pico2?.mcuPlatforms.includes("RP2350 / Pico 2"), "Pico 2 fixture lost RP2350 classification");
assert(!pico2?.mcuPlatforms.includes("RP2040 / Pico"), "Pico 2 incorrectly classified as RP2040");
const h2Fixture = data.projects.find((project) => project.id === "emeb/dspod");
assert(h2Fixture?.digestDatesByStream.webgpt_daily.includes("2026-06-26"), "H2 ranked heading provenance was not parsed");
const compositePart = data.projects.find((project) => project.id === "westlicht/performer-hardware");
assert(compositePart?.digestDatesByStream.webgpt_daily.includes("2026-06-15"), "composite ranked-entry companion repository missing");

const lowConfidence = data.projects.filter((project) => project.classificationConfidence === "low");
assert(lowConfidence.length === data.metrics.lowConfidenceClassifications, "low-confidence metric mismatch");
assert(lowConfidence.length === data.sourceSummary.lowConfidenceClassifications, "low-confidence source-summary mismatch");

console.log(`dashboard coverage: ${canonical.size}/${canonical.size} canonical resources represented; ${rankedComponents.size} ranked repository components + ${rankedComposites.size} composites represented (${rankedOnly.length} ranked-only records); ${data.projects.length} total records`);
console.log(`analog provenance: ${analogRows.size} publication rows across ${analogFiles.length} recovered digests; latest ${latestAnalogDate}`);
console.log(`classification: ${lowConfidence.length} low-confidence records; speculative-adaptation and Pico2 regressions PASS`);
if (lowConfidence.length) console.log(lowConfidence.map((project) => `  - ${project.repo}: ${project.classificationGaps.join("; ") || "thin evidence"}`).join("\n"));
