import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const data = JSON.parse(readFileSync(path.join(dashboardRoot, "src", "data", "projects.json"), "utf8"));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const pushField = () => { row.push(field); field = ""; };
  const pushRow = () => {
    pushField();
    if (row.some((value) => value.length > 0)) rows.push(row);
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"') {
        if (text[index + 1] === '"') { field += '"'; index += 1; }
        else quoted = false;
      } else field += char;
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

function readCsv(relativePath) {
  return parseCsv(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function normalizeResource(value) {
  return String(value || "")
    .trim()
    .replace(/^https:\/\/github\.com\//i, "")
    .replace(/\.git$/i, "")
    .replace(/[)>.,;]+$/g, "");
}

function safeDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : "";
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
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
assert(missingCanonical.length === 0, `dashboard missing canonical resources: ${missingCanonical.join(", ")}`);

assert(data.sourceSummary.publishedRows === published.length, `published row count drift: ${data.sourceSummary.publishedRows} != ${published.length}`);
assert(data.sourceSummary.selectedRows === selected.length, `selected row count drift: ${data.sourceSummary.selectedRows} != ${selected.length}`);
assert(data.sourceSummary.commonIndexRows === common.length, `common-index row count drift: ${data.sourceSummary.commonIndexRows} != ${common.length}`);
assert(data.sourceSummary.codexRunFiles === codexRunFiles.length, `Codex run-file count drift: ${data.sourceSummary.codexRunFiles} != ${codexRunFiles.length}`);

const analogDir = path.join(repoRoot, "digests");
const digestFiles = readdirSync(analogDir).filter((name) => name.endsWith(".md")).sort();
const analogFiles = digestFiles.filter((name) => /^\d{4}-\d{2}-\d{2}-analog-audio-mine\.md$/.test(name));
const rankedDigestRepos = new Set();
for (const fileName of digestFiles.filter((name) => !name.includes("analog-audio-mine"))) {
  const text = readFileSync(path.join(analogDir, fileName), "utf8");
  const headingPattern = /^###\s+\d+[.)]?\s+(.+)$/gm;
  for (const match of text.matchAll(headingPattern)) {
    const heading = match[1];
    const link = heading.match(/\[[^\]]+\]\(https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)[^)]*\)/i);
    const codeResource = heading.match(/`([A-Za-z0-9_.-]+\/[A-Za-z0-9_.:+-]+)`/);
    const plainResource = heading.match(/(?:^|\s)([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)(?:\s|$)/);
    const resource = normalizeResource(link?.[1] || codeResource?.[1] || plainResource?.[1] || "");
    if (resource) rankedDigestRepos.add(resource.toLowerCase());
  }
}
for (const id of rankedDigestRepos) assert(idSet.has(id), `ranked digest repository missing from dashboard: ${id}`);
const rankedOnly = [...rankedDigestRepos].filter((id) => !canonical.has(id));

const analogRows = new Map();
let latestAnalogDate = "";
for (const fileName of analogFiles) {
  const text = readFileSync(path.join(analogDir, fileName), "utf8");
  const fallbackDate = safeDate(fileName);
  const blockPattern = /##\s+(?:Proposed\s+)?publication(?:-tracker)?\s+rows\s*\n+```csv\s*\n([\s\S]*?)```/gi;
  for (const match of text.matchAll(blockPattern)) {
    for (const row of parseCsv(match[1])) {
      const resource = normalizeResource(row.repo);
      if (!resource) continue;
      const date = safeDate(row.last_published) || fallbackDate;
      analogRows.set(resource.toLowerCase(), { resource, date, fileName });
      if (date > latestAnalogDate) latestAnalogDate = date;
    }
  }
}
assert(data.sourceSummary.analogDigestFiles === analogFiles.length, `analog digest count drift: ${data.sourceSummary.analogDigestFiles} != ${analogFiles.length}`);
assert(data.metrics.latestAnalogDate === latestAnalogDate, `latest Analog date drift: ${data.metrics.latestAnalogDate} != ${latestAnalogDate}`);
for (const [id, evidence] of analogRows) {
  const project = data.projects.find((item) => item.id === id);
  assert(project, `Analog publication missing from dashboard: ${evidence.resource}`);
  assert(project.digestStreams.includes("analog_weekly"), `Analog provenance missing for ${evidence.resource}`);
  assert(project.streams.includes("webgpt_daily"), `canonical WebGPT anti-repeat ownership lost for Analog publication ${evidence.resource}`);
  assert(project.digestDatesByStream.analog_weekly.includes(evidence.date), `Analog digest date missing for ${evidence.resource}`);
}

for (const project of data.projects) {
  for (const field of ["repositoryTypes", "hardwareEvidence", "mcuPlatforms", "languagesFrameworks", "effects", "classificationGaps"]) {
    assert(Array.isArray(project[field]), `${project.repo}: ${field} is not an array`);
  }
  assert(["high", "medium", "low"].includes(project.classificationConfidence), `${project.repo}: invalid classification confidence`);
  assert(project.digestDatesByStream && Array.isArray(project.digestDatesByStream.webgpt_daily) && Array.isArray(project.digestDatesByStream.codex_weekly) && Array.isArray(project.digestDatesByStream.analog_weekly), `${project.repo}: digest stream date provenance incomplete`);
}

for (const expected of ["C++", "Faust", "JUCE"]) {
  assert(data.languageFrameworkDistribution.some((point) => point.key === expected && point.count > 0), `requested framework filter has no classified records: ${expected}`);
}
assert(data.hardwareEvidenceDistribution.some((point) => point.key === "Editable EDA"), "hardware design evidence distribution missing Editable EDA");
assert(data.effectDistribution.some((point) => point.key === "Delay / Echo"), "effect distribution missing Delay / Echo");
assert(data.mcuPlatformDistribution.some((point) => point.key === "Daisy / STM32H7"), "MCU/platform distribution missing Daisy / STM32H7");

const lowConfidence = data.projects.filter((project) => project.classificationConfidence === "low");
assert(lowConfidence.length === data.metrics.lowConfidenceClassifications, "low-confidence metric does not match project records");
assert(lowConfidence.length === data.sourceSummary.lowConfidenceClassifications, "low-confidence source summary does not match project records");

console.log(`dashboard coverage: ${canonical.size}/${canonical.size} canonical resources represented; ${rankedDigestRepos.size} distinct ranked digest repos represented (${rankedOnly.length} ranked-only tracker-drift records); ${data.projects.length} total records`);
console.log(`analog provenance: ${analogRows.size} publication rows across ${analogFiles.length} recovered digests; latest ${latestAnalogDate}`);
console.log(`classification: ${lowConfidence.length} low-confidence records`);
if (lowConfidence.length) console.log(lowConfidence.map((project) => `  - ${project.repo}: ${project.classificationGaps.join("; ") || "thin evidence"}`).join("\n"));
