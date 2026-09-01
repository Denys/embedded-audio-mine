import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const data = JSON.parse(readFileSync(path.join(dashboardRoot, "src", "data", "projects.json"), "utf8"));

function safeDate(value) { return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : ""; }
function normalizeResource(value) { return String(value || "").trim().replace(/^https:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/[)>.,;]+$/g, "").replace(/\s*\/\s*/g, "/"); }
function assert(condition, message) { if (!condition) throw new Error(message); }
function maxDate(a, b) { if (!a) return b || ""; if (!b) return a; return a > b ? a : b; }

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
const publicationHeaders = ["repo", "lane", "first_seen", "last_published", "repeat_eligible_after", "status", "notes"];
function parsePublicationRows(text) {
  const clean = String(text || "").trim();
  if (!clean) return [];
  const firstLine = clean.split(/\r?\n/, 1)[0];
  return parseCsv(/^repo\s*,/i.test(firstLine) ? clean : `${publicationHeaders.join(",")}\n${clean}`);
}

const byId = new Map(data.projects.map((project) => [project.id, project]));
for (const project of data.projects) {
  assert(project.digestDatesByStream && Array.isArray(project.digestDatesByStream.portable_weekly), `${project.repo}: portable discovery provenance missing`);
  assert(Array.isArray(project.dafxDomains), `${project.repo}: DAFX domains missing`);
  assert(!project.sourceFiles.some((file) => file.startsWith("work_products/weekly-income/")), `${project.repo}: weekly-income report leaked into project dashboard`);
}

const digestDir = path.join(repoRoot, "digests");
const analogFiles = existsSync(digestDir) ? readdirSync(digestDir).filter((name) => /^\d{4}-\d{2}-\d{2}-analog-audio-mine\.md$/.test(name)).sort() : [];
let analogRows = 0;
let latestAnalog = "";
for (const fileName of analogFiles) {
  const text = readFileSync(path.join(digestDir, fileName), "utf8");
  const fallbackDate = safeDate(fileName);
  const blockPattern = /##\s+(?:Proposed\s+)?publication(?:[-\s]+tracker)?\s+rows\s*\r?\n(?:Rows applied[^\n]*\r?\n)?\s*```csv\s*\r?\n([\s\S]*?)```/gi;
  for (const match of text.matchAll(blockPattern)) {
    for (const row of parsePublicationRows(match[1])) {
      const id = normalizeResource(row.repo).toLowerCase();
      if (!id) continue;
      analogRows += 1;
      const date = safeDate(row.last_published) || fallbackDate;
      latestAnalog = maxDate(latestAnalog, date);
      const project = byId.get(id);
      assert(project, `Analog report finding missing from dashboard: ${row.repo}`);
      assert(project.digestStreams.includes("analog_weekly"), `Analog provenance missing for ${row.repo}`);
      assert(project.digestDatesByStream.analog_weekly.includes(date), `Analog report date missing for ${row.repo}: ${date}`);
    }
  }
}
assert(data.sourceSummary.analogDigestFiles === analogFiles.length, `Analog report count drift: ${data.sourceSummary.analogDigestFiles} != ${analogFiles.length}`);
assert(data.metrics.latestAnalogDate === latestAnalog, `latest Analog report drift: ${data.metrics.latestAnalogDate} != ${latestAnalog}`);
assert(latestAnalog >= "2026-08-31", `2026-08-31 Analog report regression: latest date ${latestAnalog} is unexpectedly older`);

const portableHistoryFile = path.join(repoRoot, "portable-weekly", "data", "repo_feature_history.json");
const rawPortableHistory = JSON.parse(readFileSync(portableHistoryFile, "utf8"));
const portableHistory = rawPortableHistory.repos || rawPortableHistory;
let portableHistoryRepos = 0;
let latestPortable = "";
for (const [repo, info] of Object.entries(portableHistory)) {
  if (!info || typeof info !== "object" || (!Array.isArray(info.appearance_dates) && !info.last_featured && !info.ranks)) continue;
  portableHistoryRepos += 1;
  const project = byId.get(normalizeResource(repo).toLowerCase());
  assert(project, `Portable feature-history repository missing from dashboard: ${repo}`);
  assert(project.digestStreams.includes("portable_weekly"), `Portable history provenance missing for ${repo}`);
  assert(project.sourceFiles.includes("portable-weekly/data/repo_feature_history.json"), `Portable history source ledger missing for ${repo}`);
  const dates = [...new Set([...(info.appearance_dates || []), ...Object.keys(info.ranks || {})].map(safeDate).filter(Boolean))];
  for (const date of dates) {
    latestPortable = maxDate(latestPortable, date);
    assert(project.digestDatesByStream.portable_weekly.includes(date), `Portable history date missing for ${repo}: ${date}`);
  }
  latestPortable = maxDate(latestPortable, safeDate(info.last_featured));
}

const portableRunDir = path.join(repoRoot, "portable-weekly", "data", "runs");
const portableFiles = existsSync(portableRunDir) ? readdirSync(portableRunDir).filter((name) => /^digest_\d{4}-\d{2}-\d{2}\.json$/.test(name)).sort() : [];
let portableFindings = 0;
for (const fileName of portableFiles) {
  const run = JSON.parse(readFileSync(path.join(portableRunDir, fileName), "utf8"));
  const date = safeDate(run.date) || safeDate(fileName.replace(/^digest_/, ""));
  latestPortable = maxDate(latestPortable, date);
  for (const item of run.top_repos || run.selected || []) {
    portableFindings += 1;
    const id = normalizeResource(item.full_name).toLowerCase();
    const project = byId.get(id);
    assert(project, `Portable run finding missing from dashboard: ${item.full_name}`);
    assert(project.digestStreams.includes("portable_weekly"), `Portable provenance missing for ${item.full_name}`);
    assert(project.digestDatesByStream.portable_weekly.includes(date), `Portable report date missing for ${item.full_name}: ${date}`);
    assert(project.sourceFiles.includes(`portable-weekly/data/runs/${fileName}`), `Portable source ledger missing ${fileName} for ${item.full_name}`);
  }
}
assert(data.sourceSummary.portableRunFiles === portableFiles.length, `Portable run count drift: ${data.sourceSummary.portableRunFiles} != ${portableFiles.length}`);
assert(data.metrics.latestPortableDate === latestPortable, `latest Portable report drift: ${data.metrics.latestPortableDate} != ${latestPortable}`);
assert(data.metrics.portableProjects === data.projects.filter((project) => project.digestStreams.includes("portable_weekly")).length, "Portable project metric mismatch");
assert(data.metrics.portableProjects >= portableHistoryRepos, `Portable project coverage ${data.metrics.portableProjects} < history repositories ${portableHistoryRepos}`);
assert(data.metrics.analogProjects === data.projects.filter((project) => project.digestStreams.includes("analog_weekly")).length, "Analog project metric mismatch");
assert(data.provenanceDistribution.some((point) => point.key.includes("portable_weekly")), "Portable provenance missing from distribution");

const analogFixture = byId.get("alanbog/3374-vco");
assert(analogFixture?.digestDatesByStream.analog_weekly.includes("2026-08-31"), "2026-08-31 Analog provenance regression");

const q = byId.get("cycfi/q");
assert(q?.digestDatesByStream.portable_weekly.includes("2026-08-29"), "2026-08-29 Portable provenance regression");
assert(q?.portabilityValue === "medium", `cycfi/q should keep newest Refactor=>medium classification, got ${q?.portabilityValue}`);
assert(!q?.mcuPlatforms.includes("Daisy / STM32H7"), "cycfi/q portability prose leaked Daisy/STM32H7 into implementation facets");

const voiceOfFaust = byId.get("magnetophon/voiceoffaust");
assert(voiceOfFaust?.portabilityValue === "high", `VoiceOfFaust should keep newest Direct=>high classification, got ${voiceOfFaust?.portabilityValue}`);

for (const id of ["rheslip/daisysp_teensy", "bseverns/seedbox"]) {
  const project = byId.get(id);
  assert(project, `portable gap regression fixture missing: ${id}`);
  assert(!project.classificationGaps.includes("MCU / platform"), `${id}: resolved MCU gap survived augmentation`);
  assert(!project.classificationGaps.includes("audio function / effects"), `${id}: resolved effect gap survived augmentation`);
}

const voxGenesis = byId.get("mdt516/voxgenesis");
assert(voxGenesis, "port-suggestion leakage fixture missing: mdt516/voxGenesis");
assert(!voxGenesis.mcuPlatforms.includes("Daisy / STM32H7"), "voxGenesis port idea leaked Daisy into implementation facets");
assert(!voxGenesis.mcuPlatforms.includes("Teensy 4.x"), "voxGenesis port idea leaked Teensy into implementation facets");
assert(voxGenesis.classificationGaps.includes("target MCU requires port profiling"), "voxGenesis should retain target-MCU porting gap");

const hvcc = byId.get("wasted-audio/hvcc");
assert(hvcc, "structured-evidence fixture missing: Wasted-Audio/hvcc");
assert(hvcc.languagesFrameworks.includes("Python"), "hvcc lost structured Python repository-language evidence");
assert(!hvcc.mcuPlatforms.includes("Daisy / STM32H7"), "hvcc report prose leaked Daisy into current MCU support");
assert(!hvcc.mcuPlatforms.includes("Teensy 4.x"), "hvcc report prose leaked Teensy into current MCU support");

const mlSynthTools = byId.get("marcel-licence/ml_synthtools");
assert(mlSynthTools?.languagesFrameworks.includes("C"), "ML_SynthTools lost structured C language evidence");

const crossStreamRank = byId.get("shawlty/daisy-eurorack-audio-module");
assert(crossStreamRank, "cross-stream rank regression fixture missing");
assert(crossStreamRank.lastPublished >= "2026-06-09", "cross-stream fixture lost newer Codex publication date");
assert(crossStreamRank.latestRank === 8, `cross-stream latest rank should remain Codex rank 8, got ${crossStreamRank.latestRank}`);

assert(Array.isArray(data.dafxDomainDistribution) && data.dafxDomainDistribution.length > 1, "DAFX domain distribution missing");
assert(data.dafxDomainDistribution.some((point) => point.key === "Filters & Delays" && point.count > 0), "DAFX Filters & Delays domain missing");
assert(q?.dafxDomains.includes("Filters & Delays"), "cycfi/q lost DAFX Filters & Delays classification");
const wdf = byId.get("chowdhury-dsp/chowdsp_wdf");
assert(wdf?.dafxDomains.includes("Virtual Analog"), "chowdsp_wdf lost DAFX Virtual Analog classification");
assert(wdf?.dafxDomains.includes("Nonlinear Processing"), "chowdsp_wdf lost DAFX Nonlinear Processing classification");

console.log(`project discovery coverage: ${analogRows} Analog publication rows across ${analogFiles.length} reports; ${portableHistoryRepos} Portable history repositories + ${portableFindings} retained run occurrences across ${portableFiles.length} runs`);
console.log(`latest project reports: Analog ${latestAnalog || "n/a"}; Portable ${latestPortable || "n/a"}`);
console.log(`DAFX taxonomy: ${data.dafxDomainDistribution.filter((point) => point.key !== "Unclassified").length} populated technique domains`);
console.log("structured-evidence, rank-recency, DAFX, and non-project exclusion regressions: PASS");
