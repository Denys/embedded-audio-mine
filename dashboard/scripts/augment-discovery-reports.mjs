import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const dataPath = path.join(dashboardRoot, "src", "data", "projects.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));

function safeDate(value) { return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : ""; }
function minDate(a, b) { if (!a) return b || ""; if (!b) return a; return a < b ? a : b; }
function maxDate(a, b) { if (!a) return b || ""; if (!b) return a; return a > b ? a : b; }
function normalizeResource(value) { return String(value || "").trim().replace(/^https:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/[)>.,;]+$/g, "").replace(/\s*\/\s*/g, "/"); }
function repoUrl(repo) { return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) ? `https://github.com/${repo}` : ""; }
function uniq(values) { return [...new Set((values || []).filter(Boolean))]; }
function append(existing, next) {
  const clean = String(next || "").replace(/\s+/g, " ").trim();
  if (!clean) return existing || "";
  if (!existing) return clean;
  return existing.includes(clean) ? existing : `${existing} ${clean}`;
}
function addValue(array, value) { if (value && !array.includes(value)) array.push(value); }
function addValues(array, values) { for (const value of values || []) addValue(array, value); }

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

function emptyProject(repo, url = "") {
  const id = normalizeResource(repo).toLowerCase();
  return {
    id,
    repo: normalizeResource(repo),
    url: url || repoUrl(repo),
    streams: [],
    digestStreams: [],
    sourceFiles: [],
    recordTypes: [],
    lane: "",
    status: "",
    selectedStatus: "",
    origin: "",
    platforms: [],
    repositoryTypes: [],
    hardwareEvidence: [],
    mcuPlatforms: [],
    languagesFrameworks: [],
    effects: [],
    classificationConfidence: "low",
    classificationGaps: [],
    tags: [],
    firstSeen: "",
    lastPublished: "",
    repeatEligibleAfter: "",
    repeatState: "unknown",
    antiRepeatScope: "",
    notes: "",
    whySelected: "",
    similarityAnchorNotes: "",
    featureCount: 0,
    latestRank: null,
    rankHistory: {},
    digestDates: [],
    digestDatesByStream: { webgpt_daily: [], codex_weekly: [], analog_weekly: [], portable_weekly: [] },
    stars: null,
    forks: null,
    pushedAt: "",
    topic: "",
    score: null,
    statusTag: "",
    contentValue: "",
    contentSummary: "",
    representativeFiles: [],
    portabilityValue: "",
    portabilitySummary: "",
    portingScore: 0
  };
}

const projectsById = new Map();
for (const project of data.projects || []) {
  project.digestStreams = uniq(project.digestStreams);
  project.digestDatesByStream ||= {};
  project.digestDatesByStream.webgpt_daily ||= [];
  project.digestDatesByStream.codex_weekly ||= [];
  project.digestDatesByStream.analog_weekly ||= [];
  project.digestDatesByStream.portable_weekly ||= [];
  projectsById.set(project.id, project);
}

function getProject(repo, url = "") {
  const normalized = normalizeResource(repo);
  const id = normalized.toLowerCase();
  if (!id) return null;
  let project = projectsById.get(id);
  if (!project) {
    project = emptyProject(normalized, url);
    data.projects.push(project);
    projectsById.set(id, project);
  }
  if (url) project.url = url;
  return project;
}

function inferPortableFacets(project, item) {
  const paths = item.evidence?.sample_dsp_paths || [];
  const text = [item.topic, item.summary, item.value_reason, item.portability_reason, item.port_idea, ...paths].filter(Boolean).join(" ");
  if (/\bc\+\+\b|\.cpp\b|\.hpp\b|c\+\+\d*/i.test(text)) addValue(project.languagesFrameworks, "C++");
  if (/\brust\b|\.rs\b|cargo|no_std/i.test(text)) addValue(project.languagesFrameworks, "Rust");
  if (/(?:^|[\s,;/])c(?:[\s,;/]|$)|\.c\b|ansi c|c89|c99/i.test(text)) addValue(project.languagesFrameworks, "C");
  if (/\bfaust\b|\.dsp\b/i.test(text)) addValue(project.languagesFrameworks, "Faust");
  if (/\bjuce\b/i.test(text)) addValue(project.languagesFrameworks, "JUCE");
  if (/\bcmake\b/i.test(text)) addValue(project.languagesFrameworks, "CMake");
  if (/\bdaisy\b|stm32h7|cortex-m7/i.test(text)) addValue(project.mcuPlatforms, "Daisy / STM32H7");
  if (/\bteensy\b|imxrt1062/i.test(text)) addValue(project.mcuPlatforms, "Teensy 4.x");
  if (/\besp32\b|esp-idf/i.test(text)) addValue(project.mcuPlatforms, "ESP32");
  if (/\brp2040\b|raspberry pi pico(?!\s*2\b)/i.test(text)) addValue(project.mcuPlatforms, "RP2040 / Pico");
  if (/\brp2350\b|pico\s*2/i.test(text)) addValue(project.mcuPlatforms, "RP2350 / Pico 2");
  if (/\bjuce\b|vst3?|desktop|plugin/i.test(text) && !project.mcuPlatforms.length) addValue(project.mcuPlatforms, "Desktop / host CPU");

  if (/library|dsp primitives|dsp library|toolkit|headers?/i.test(text)) addValue(project.repositoryTypes, "DSP / software library");
  if (/\bjuce\b|vst3?|plugin/i.test(text)) addValue(project.repositoryTypes, "Desktop audio / plugin");
  if (/firmware|embedded|cortex-m|daisy|teensy|esp32|rp2040|rp2350/i.test(text) && !project.repositoryTypes.length) addValue(project.repositoryTypes, "Firmware / embedded software");
  if (/synth|instrument|sampler|looper/i.test(text) && !/library/i.test(text)) addValue(project.repositoryTypes, "Audio application / instrument");
  if (!project.repositoryTypes.length) addValue(project.repositoryTypes, "Unclassified");

  const effectPatterns = [
    ["Delay / Echo", /\bdelay\b|\becho\b|fractional delay/i],
    ["Reverb / Diffusion", /\breverb\b|\bfdn\b|diffusion/i],
    ["Dynamics / Gate", /compressor|limiter|envelope|noise gate|dynamics/i],
    ["EQ / Filter", /biquad|filter|svf|ladder|equalizer|tone stack/i],
    ["Drive / Distortion / Fuzz", /diode|clipper|distortion|overdrive|waveshap|saturat|wdf/i],
    ["Pitch / Shimmer", /pitch|hilbert|frequency shift|shimmer/i],
    ["Synthesis / Oscillator", /oscillator|synth|fm synth|padsynth|wavetable/i],
    ["Granular / Freeze", /granular|grain|freeze|stft|spectral/i],
    ["Looper / Sampler", /looper|sampler|sample playback/i]
  ];
  for (const [label, pattern] of effectPatterns) if (pattern.test(text)) addValue(project.effects, label);

  if (/daisy/i.test(text)) addValue(project.platforms, "Daisy");
  if (/teensy/i.test(text)) addValue(project.platforms, "Teensy");
  if (/faust/i.test(text)) addValue(project.platforms, "Faust");
  if (/dsp|filter|delay|reverb|oscillator/i.test(text)) addValue(project.platforms, "DSP Library");

  const gaps = [];
  if (!project.repositoryTypes.length || project.repositoryTypes.includes("Unclassified")) gaps.push("repository type");
  if (!project.languagesFrameworks.length) gaps.push("language / framework");
  if (!project.effects.length) gaps.push("audio function / effects");
  if (!project.mcuPlatforms.length) gaps.push("target MCU requires port profiling");
  project.classificationGaps = uniq([...(project.classificationGaps || []), ...gaps]);
  const evidenceSignals = paths.length + (item.value_reason ? 1 : 0) + (item.portability_reason ? 1 : 0);
  if (gaps.length <= 1 && evidenceSignals >= 3) project.classificationConfidence = "high";
  else if (gaps.length <= 2 && evidenceSignals >= 1 && project.classificationConfidence === "low") project.classificationConfidence = "medium";
}

function portableScore(project) {
  let score = 0;
  if (project.portabilityValue === "high") score += 28;
  if (project.portabilityValue === "medium") score += 16;
  if (project.representativeFiles.length) score += 12;
  score += Math.min(project.languagesFrameworks.length * 3, 12);
  score += Math.min(project.effects.length * 3, 15);
  if (project.pushedAt >= "2026-06-01") score += 8;
  if (project.digestStreams.length > 1) score += 14;
  return score;
}

// Analog Audio Mine reports are discovery provenance, even when a report's tracker CSV block omits the header.
const digestDir = path.join(repoRoot, "digests");
let latestAnalogDate = data.metrics?.latestAnalogDate || "";
let analogDigestFiles = 0;
if (existsSync(digestDir)) {
  for (const fileName of readdirSync(digestDir).filter((name) => /^\d{4}-\d{2}-\d{2}-analog-audio-mine\.md$/.test(name))) {
    analogDigestFiles += 1;
    const file = path.join(digestDir, fileName);
    const text = readFileSync(file, "utf8");
    const fallbackDate = safeDate(fileName);
    const blockPattern = /##\s+(?:Proposed\s+)?publication(?:[-\s]+tracker)?\s+rows\s*\n+(?:Rows applied[^\n]*\n+)?```csv\s*\n([\s\S]*?)```/gi;
    for (const match of text.matchAll(blockPattern)) {
      for (const row of parsePublicationRows(match[1])) {
        const project = getProject(row.repo);
        if (!project) continue;
        const date = safeDate(row.last_published) || fallbackDate;
        addValue(project.digestStreams, "analog_weekly");
        addValue(project.sourceFiles, path.relative(repoRoot, file).replaceAll(path.sep, "/"));
        addValue(project.recordTypes, "ranked_digest");
        addValue(project.digestDates, date);
        addValue(project.digestDatesByStream.analog_weekly, date);
        project.lane ||= row.lane || "";
        project.status ||= row.status || "";
        project.firstSeen = minDate(project.firstSeen, safeDate(row.first_seen) || date);
        project.lastPublished = maxDate(project.lastPublished, date);
        project.repeatEligibleAfter = maxDate(project.repeatEligibleAfter, safeDate(row.repeat_eligible_after));
        project.notes = append(project.notes, row.notes);
        latestAnalogDate = maxDate(latestAnalogDate, date);
      }
    }
  }
}

// Portable Weekly is a separate project-discovery report lane. It adds provenance and engineering evidence,
// but deliberately does not claim WebGPT/Codex canonical anti-repeat ownership.
const portableRunDir = path.join(repoRoot, "portable-weekly", "data", "runs");
let portableRunFiles = 0;
let latestPortableDate = "";
if (existsSync(portableRunDir)) {
  for (const fileName of readdirSync(portableRunDir).filter((name) => /^digest_\d{4}-\d{2}-\d{2}\.json$/.test(name)).sort()) {
    portableRunFiles += 1;
    const file = path.join(portableRunDir, fileName);
    const run = JSON.parse(readFileSync(file, "utf8"));
    const date = safeDate(run.date) || safeDate(fileName.replace(/^digest_/, ""));
    latestPortableDate = maxDate(latestPortableDate, date);
    for (const item of run.top_repos || run.selected || []) {
      const project = getProject(item.full_name, item.html_url);
      if (!project) continue;
      addValue(project.digestStreams, "portable_weekly");
      addValue(project.sourceFiles, path.relative(repoRoot, file).replaceAll(path.sep, "/"));
      addValue(project.recordTypes, "ranked_digest");
      addValue(project.digestDates, date);
      addValue(project.digestDatesByStream.portable_weekly, date);
      project.firstSeen = minDate(project.firstSeen, date);
      project.lastPublished = maxDate(project.lastPublished, date);
      if (Number.isFinite(Number(item.stars))) project.stars = Number(item.stars);
      if (Number.isFinite(Number(item.forks))) project.forks = Number(item.forks);
      project.pushedAt = maxDate(project.pushedAt, safeDate(item.last_push || item.pushed_at));
      project.topic ||= item.topic || "";
      if (Number.isFinite(Number(item.score))) project.score = Number(item.score);
      project.statusTag ||= item.rotation_status || item.status_tag || "";
      const portabilityClass = String(item.portability_class || "").toLowerCase();
      if (!project.portabilityValue) project.portabilityValue = portabilityClass === "direct" ? "high" : portabilityClass === "refactor" ? "medium" : portabilityClass ? "reference" : "";
      project.contentSummary = append(project.contentSummary, item.value_reason || item.summary || item.description);
      project.portabilitySummary = append(project.portabilitySummary, [item.portability_reason, item.port_idea].filter(Boolean).join(" "));
      project.notes = append(project.notes, item.note);
      addValues(project.representativeFiles, item.evidence?.sample_dsp_paths || item.representative_files || []);
      inferPortableFacets(project, item);
      project.portingScore = Math.max(Number(project.portingScore || 0), portableScore(project));
    }
  }
}

for (const project of data.projects) {
  project.digestStreams = uniq(project.digestStreams).sort();
  project.sourceFiles = uniq(project.sourceFiles).sort();
  project.recordTypes = uniq(project.recordTypes).sort();
  project.platforms = uniq(project.platforms).sort();
  project.repositoryTypes = uniq(project.repositoryTypes).sort();
  project.hardwareEvidence = uniq(project.hardwareEvidence).sort();
  project.mcuPlatforms = uniq(project.mcuPlatforms).sort();
  project.languagesFrameworks = uniq(project.languagesFrameworks).sort();
  project.effects = uniq(project.effects).sort();
  project.tags = uniq(project.tags).sort();
  project.digestDates = uniq(project.digestDates).sort();
  project.representativeFiles = uniq(project.representativeFiles).sort();
  for (const key of ["webgpt_daily", "codex_weekly", "analog_weekly", "portable_weekly"]) project.digestDatesByStream[key] = uniq(project.digestDatesByStream[key]).sort();
}

data.projects.sort((a, b) => Number(b.portingScore || 0) - Number(a.portingScore || 0) || String(b.lastPublished || "").localeCompare(String(a.lastPublished || "")) || a.repo.localeCompare(b.repo));
data.topPorting = data.projects.slice(0, 18);

function distribution(projects, getter, limit = 12) {
  const counts = new Map();
  for (const project of projects) {
    const raw = getter(project);
    for (const value of (Array.isArray(raw) ? raw : [raw])) if (value) counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count || a.key.localeCompare(b.key)).slice(0, limit);
}

data.laneDistribution = distribution(data.projects, (p) => p.lane || p.contentValue || "unclassified");
data.platformDistribution = distribution(data.projects, (p) => p.platforms.length ? p.platforms : ["unclassified"], 14);
data.repositoryTypeDistribution = distribution(data.projects, (p) => p.repositoryTypes, 12);
data.hardwareEvidenceDistribution = distribution(data.projects, (p) => p.hardwareEvidence.length ? p.hardwareEvidence : ["No explicit hardware evidence"], 12);
data.mcuPlatformDistribution = distribution(data.projects, (p) => p.mcuPlatforms.length ? p.mcuPlatforms : ["Unclassified"], 16);
data.languageFrameworkDistribution = distribution(data.projects, (p) => p.languagesFrameworks.length ? p.languagesFrameworks : ["Unclassified"], 18);
data.effectDistribution = distribution(data.projects, (p) => p.effects.length ? p.effects : ["Unclassified"], 20);
data.classificationConfidenceDistribution = distribution(data.projects, (p) => p.classificationConfidence, 3);
data.streamDistribution = distribution(data.projects, (p) => p.streams.length ? p.streams.join(" + ") : "digest-only");
data.provenanceDistribution = distribution(data.projects, (p) => p.digestStreams.length ? p.digestStreams : ["tracker-only"]);

const timelineMap = new Map();
for (const project of data.projects) {
  for (const [stream, dates] of Object.entries(project.digestDatesByStream)) {
    for (const date of dates) {
      if (!date) continue;
      if (!timelineMap.has(date)) timelineMap.set(date, { date, webgpt_daily: 0, codex_weekly: 0, analog_weekly: 0, portable_weekly: 0 });
      if (stream in timelineMap.get(date)) timelineMap.get(date)[stream] += 1;
    }
  }
}
data.timeline = [...timelineMap.values()].sort((a, b) => a.date.localeCompare(b.date));

const lowConfidence = data.projects.filter((project) => project.classificationConfidence === "low").length;
data.metrics.totalProjects = data.projects.length;
data.metrics.analogProjects = data.projects.filter((project) => project.digestStreams.includes("analog_weekly")).length;
data.metrics.portableProjects = data.projects.filter((project) => project.digestStreams.includes("portable_weekly")).length;
data.metrics.crossStreamProjects = data.projects.filter((project) => project.streams.length > 1 || project.digestStreams.length > 1).length;
data.metrics.lowConfidenceClassifications = lowConfidence;
data.metrics.latestAnalogDate = latestAnalogDate;
data.metrics.latestPortableDate = latestPortableDate;
data.metrics.generatedAt = new Date().toISOString();
data.sourceSummary.analogDigestFiles = analogDigestFiles;
data.sourceSummary.portableRunFiles = portableRunFiles;
data.sourceSummary.lowConfidenceClassifications = lowConfidence;

writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`augmented discovery reports: ${data.metrics.analogProjects} Analog projects across ${analogDigestFiles} reports; ${data.metrics.portableProjects} Portable projects across ${portableRunFiles} runs`);
console.log(`latest discovery provenance: Analog ${latestAnalogDate || "n/a"}; Portable ${latestPortableDate || "n/a"}`);
