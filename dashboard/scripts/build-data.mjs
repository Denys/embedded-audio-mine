import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const outPath = path.join(dashboardRoot, "src", "data", "projects.json");
const today = new Date().toISOString().slice(0, 10);

const platformPatterns = [
  ["Daisy", /\bdaisy\b|daisy seed|patch init/i],
  ["Teensy", /\bteensy\b|sgtl5000/i],
  ["ESP32", /\besp32\b|esp32s2|esp32s3|esp-idf/i],
  ["RP2040", /\brp2040\b|\bpico\b/i],
  ["RP2350", /\brp2350\b|pico 2/i],
  ["STM32", /\bstm32\b|stm32h7|stm32f4|stm32f7/i],
  ["Eurorack", /\beurorack\b|modular/i],
  ["USB Audio", /\busb audio\b|\buac2\b|usb-audio/i],
  ["MIDI", /\bmidi\b|sysex/i],
  ["WebUSB", /\bwebusb\b/i],
  ["Web Serial", /\bweb serial\b|webserial/i],
  ["Codec", /\bcodec\b|wm8731|tlv320|sgtl5000|cs4272|es8388|pcm3060/i],
  ["SSI", /ssi2130|ssi2131|ssi2140|ssi2144|ssi2164|ssi2190/i],
  ["Faust", /\bfaust\b/i],
  ["Hardware", /\bpcb\b|schematic|kicad|gerber|hardware/i],
  ["DSP Library", /\bdsp\b|filter|fft|reverb|delay|oscillator/i],
  ["Firmware", /\bfirmware\b|arduino|platformio|cmake|makefile/i]
];

function rel(file) {
  return path.relative(repoRoot, file).replaceAll(path.sep, "/");
}

function readText(file) {
  return readFileSync(file, "utf8");
}

function readJson(file) {
  return JSON.parse(readText(file));
}

function readCsv(file) {
  return parse(readText(file), {
    columns: true,
    bom: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true
  });
}

function safeDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)
    ? value.slice(0, 10)
    : "";
}

function minDate(a, b) {
  if (!a) return b || "";
  if (!b) return a;
  return a < b ? a : b;
}

function maxDate(a, b) {
  if (!a) return b || "";
  if (!b) return a;
  return a > b ? a : b;
}

function normalizeResource(value) {
  return String(value || "")
    .trim()
    .replace(/^https:\/\/github\.com\//i, "")
    .replace(/\.git$/i, "")
    .replace(/[)>.,;]+$/g, "");
}

function repoUrl(repo) {
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)
    ? `https://github.com/${repo}`
    : "";
}

function splitTerms(value) {
  if (!value) return [];
  return String(value)
    .split(/[;,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function addSet(target, values) {
  for (const value of values) {
    if (value) target.add(value);
  }
}

function appendText(existing, next) {
  const clean = String(next || "").trim();
  if (!clean) return existing || "";
  if (!existing) return clean;
  return existing.includes(clean) ? existing : `${existing} ${clean}`;
}

const records = new Map();

function getRecord(resource) {
  const repo = normalizeResource(resource);
  if (!repo) return null;
  const key = repo.toLowerCase();
  if (!records.has(key)) {
    records.set(key, {
      id: key,
      repo,
      url: repoUrl(repo),
      streams: new Set(),
      sourceFiles: new Set(),
      recordTypes: new Set(),
      platforms: new Set(),
      tags: new Set(),
      digestDates: new Set(),
      representativeFiles: new Set(),
      rankHistory: {},
      lane: "",
      status: "",
      selectedStatus: "",
      origin: "",
      firstSeen: "",
      lastPublished: "",
      repeatEligibleAfter: "",
      antiRepeatScope: "",
      notes: "",
      whySelected: "",
      similarityAnchorNotes: "",
      featureCount: 0,
      latestRank: null,
      stars: null,
      forks: null,
      pushedAt: "",
      topic: "",
      score: null,
      statusTag: "",
      contentValue: "",
      contentSummary: "",
      portabilityValue: "",
      portabilitySummary: ""
    });
  }
  return records.get(key);
}

function inferPlatforms(record) {
  const text = [
    record.repo,
    record.notes,
    record.whySelected,
    record.similarityAnchorNotes,
    record.contentSummary,
    record.portabilitySummary,
    record.topic,
    Array.from(record.tags).join(" ")
  ].join(" ");

  for (const [label, pattern] of platformPatterns) {
    if (pattern.test(text)) record.platforms.add(label);
  }
}

let publishedRows = 0;
let selectedRows = 0;
let commonIndexRows = 0;
let markdownRepoMentions = 0;

const dataDir = path.join(repoRoot, "data");
for (const fileName of readdirSync(dataDir).filter((name) => /^published-repo-log.*\.csv$/.test(name))) {
  const file = path.join(dataDir, fileName);
  for (const row of readCsv(file)) {
    publishedRows += 1;
    const record = getRecord(row.repo);
    if (!record) continue;
    record.streams.add("webgpt_daily");
    record.sourceFiles.add(rel(file));
    record.recordTypes.add("published");
    record.lane ||= row.lane || "";
    record.status ||= row.status || "";
    record.firstSeen = minDate(record.firstSeen, safeDate(row.first_seen));
    record.lastPublished = maxDate(record.lastPublished, safeDate(row.last_published));
    record.repeatEligibleAfter = maxDate(record.repeatEligibleAfter, safeDate(row.repeat_eligible_after));
    record.notes = appendText(record.notes, row.notes);
  }
}

const selectedFile = path.join(dataDir, "selected-projects.csv");
for (const row of readCsv(selectedFile)) {
  selectedRows += 1;
  const record = getRecord(row.project);
  if (!record) continue;
  record.streams.add("webgpt_daily");
  record.sourceFiles.add(rel(selectedFile));
  record.recordTypes.add("selected_reference");
  record.selectedStatus ||= row.status || "";
  record.origin ||= row.origin || "";
  record.status ||= row.status || "";
  addSet(record.platforms, splitTerms(row.platforms));
  addSet(record.tags, splitTerms(row.tags));
  record.url ||= row.url || repoUrl(record.repo);
  record.whySelected = appendText(record.whySelected, row.why_selected);
  record.similarityAnchorNotes = appendText(record.similarityAnchorNotes, row.similarity_anchor_notes);
  record.notes = appendText(record.notes, row.notes);
}

const commonIndexFile = path.join(dataDir, "common-anti-repeat-index.csv");
for (const row of readCsv(commonIndexFile)) {
  commonIndexRows += 1;
  const record = getRecord(row.resource);
  if (!record) continue;
  if (row.source_stream === "codex_weekly") record.streams.add("codex_weekly");
  if (row.source_stream === "webgpt_daily") record.streams.add("webgpt_daily");
  record.sourceFiles.add(row.source_file || rel(commonIndexFile));
  record.recordTypes.add(row.record_type || "");
  record.antiRepeatScope ||= row.anti_repeat_scope || "";
  record.status ||= row.status || "";
  record.firstSeen = minDate(record.firstSeen, safeDate(row.first_seen));
  record.lastPublished = maxDate(record.lastPublished, safeDate(row.last_published));
  record.repeatEligibleAfter = maxDate(record.repeatEligibleAfter, safeDate(row.repeat_eligible_after));
  record.notes = appendText(record.notes, row.notes);
}

const historyFile = path.join(repoRoot, "codex-weekly", "data", "repo_feature_history.json");
const history = readJson(historyFile);
for (const [repo, info] of Object.entries(history.repos || {})) {
  const record = getRecord(repo);
  if (!record) continue;
  record.streams.add("codex_weekly");
  record.sourceFiles.add(rel(historyFile));
  record.recordTypes.add("published");
  record.featureCount = Math.max(record.featureCount, Number(info.feature_count || 0));
  record.firstSeen = minDate(record.firstSeen, safeDate(info.appearance_dates?.[0]));
  record.lastPublished = maxDate(record.lastPublished, safeDate(info.last_featured));
  for (const [date, rank] of Object.entries(info.ranks || {})) {
    record.rankHistory[date] = Number(rank);
    record.digestDates.add(date);
  }
  if (info.last_featured && info.ranks?.[info.last_featured]) {
    record.latestRank = Number(info.ranks[info.last_featured]);
  }
}

const runDir = path.join(repoRoot, "codex-weekly", "data", "runs");
let codexRunFiles = 0;
for (const fileName of readdirSync(runDir).filter((name) => /^digest_\d{4}-\d{2}-\d{2}\.json$/.test(name))) {
  codexRunFiles += 1;
  const file = path.join(runDir, fileName);
  const run = readJson(file);
  for (const item of run.selected || []) {
    const record = getRecord(item.full_name);
    if (!record) continue;
    record.streams.add("codex_weekly");
    record.sourceFiles.add(rel(file));
    record.recordTypes.add("published");
    record.url ||= item.html_url || repoUrl(record.repo);
    record.stars = Number.isFinite(Number(item.stars)) ? Number(item.stars) : record.stars;
    record.forks = Number.isFinite(Number(item.forks)) ? Number(item.forks) : record.forks;
    record.pushedAt = maxDate(record.pushedAt, safeDate(item.pushed_at));
    record.topic ||= item.topic || "";
    record.score = Number.isFinite(Number(item.score)) ? Number(item.score) : record.score;
    record.statusTag ||= item.status_tag || "";
    record.contentValue ||= item.content_value || "";
    record.contentSummary = appendText(record.contentSummary, item.content_summary);
    record.portabilityValue ||= item.portability_value || "";
    record.portabilitySummary = appendText(record.portabilitySummary, item.portability_summary);
    addSet(record.representativeFiles, item.representative_files || []);
    record.lastPublished = maxDate(record.lastPublished, safeDate(run.date));
    record.firstSeen = minDate(record.firstSeen, safeDate(run.date));
    if (item.rank) {
      record.rankHistory[run.date] = Number(item.rank);
      record.latestRank = Number(item.rank);
    }
    record.digestDates.add(run.date);
  }
}

function addMarkdownMentions(folder, stream) {
  const dir = path.join(repoRoot, folder);
  for (const fileName of readdirSync(dir).filter((name) => name.endsWith(".md"))) {
    const file = path.join(dir, fileName);
    const text = readText(file);
    const date = safeDate(fileName);
    const matches = text.matchAll(/github\.com[/:]([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/gi);
    for (const match of matches) {
      markdownRepoMentions += 1;
      const record = getRecord(match[1]);
      if (!record) continue;
      record.streams.add(stream);
      record.sourceFiles.add(rel(file));
      record.recordTypes.add("markdown_mention");
      if (date) record.digestDates.add(date);
      record.firstSeen = minDate(record.firstSeen, date);
      record.lastPublished = maxDate(record.lastPublished, date);
      record.url ||= repoUrl(record.repo);
    }
  }
}

addMarkdownMentions("digests", "webgpt_daily");
addMarkdownMentions(path.join("codex-weekly", "digests"), "codex_weekly");

function repeatState(record) {
  if (record.repeatEligibleAfter) {
    return record.repeatEligibleAfter >= today ? "blocked" : "eligible";
  }
  if (record.antiRepeatScope === "soft" || record.recordTypes.has("selected_reference")) return "soft";
  return "unknown";
}

function scoreRecord(record) {
  let value = 0;
  if (record.streams.size > 1) value += 36;
  if (record.lane === "STRONG_PASS") value += 28;
  if (record.lane === "PASS") value += 20;
  if (record.lane === "REF_PASS") value += 14;
  if (record.contentValue === "strong") value += 24;
  if (record.contentValue === "medium") value += 14;
  if (record.portabilityValue === "high") value += 28;
  if (record.portabilityValue === "medium") value += 16;
  if (/selected/.test(record.selectedStatus)) value += 16;
  if (/related_infrastructure/.test(record.selectedStatus)) value += 12;
  if (/watch/.test(record.selectedStatus)) value += 8;
  value += Math.min(record.featureCount * 5, 25);
  value += Math.min(record.platforms.size * 4, 28);
  if (record.representativeFiles.size) value += 12;
  if (/firmware|hardware|codec|usb|i2s|webusb|web serial|midi|daisy|teensy|esp32|rp2040|stm32/i.test(record.notes + record.contentSummary + record.portabilitySummary)) {
    value += 18;
  }
  if (record.repeatState === "eligible") value += 8;
  if (record.repeatState === "blocked") value -= 6;
  if (record.stars) value += Math.min(Math.log10(record.stars + 1) * 4, 18);
  if (record.lastPublished && record.lastPublished >= "2026-06-01") value += 8;
  return Math.round(value);
}

for (const record of records.values()) {
  inferPlatforms(record);
  record.repeatState = repeatState(record);
  record.portingScore = scoreRecord(record);
}

function distribution(projects, getter, limit = 12) {
  const counts = new Map();
  for (const project of projects) {
    const values = getter(project);
    for (const value of Array.isArray(values) ? values : [values]) {
      if (!value) continue;
      counts.set(value, (counts.get(value) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

function serialize(record) {
  return {
    ...record,
    streams: [...record.streams].sort(),
    sourceFiles: [...record.sourceFiles].sort(),
    recordTypes: [...record.recordTypes].filter(Boolean).sort(),
    platforms: [...record.platforms].sort(),
    tags: [...record.tags].sort(),
    digestDates: [...record.digestDates].sort(),
    representativeFiles: [...record.representativeFiles].sort()
  };
}

const projects = [...records.values()]
  .map(serialize)
  .sort((a, b) => b.portingScore - a.portingScore || b.lastPublished.localeCompare(a.lastPublished) || a.repo.localeCompare(b.repo));

const latestCodexDate = projects.reduce((latest, project) => project.streams.includes("codex_weekly") ? maxDate(latest, project.lastPublished) : latest, "");
const latestWebgptDate = projects.reduce((latest, project) => project.streams.includes("webgpt_daily") ? maxDate(latest, project.lastPublished) : latest, "");

const timelineMap = new Map();
for (const project of projects) {
  for (const date of project.digestDates.length ? project.digestDates : [project.lastPublished]) {
    if (!date) continue;
    if (!timelineMap.has(date)) timelineMap.set(date, { date, webgpt_daily: 0, codex_weekly: 0 });
    const point = timelineMap.get(date);
    if (project.streams.includes("webgpt_daily")) point.webgpt_daily += 1;
    if (project.streams.includes("codex_weekly")) point.codex_weekly += 1;
  }
}

const dashboardData = {
  metrics: {
    totalProjects: projects.length,
    codexProjects: projects.filter((project) => project.streams.includes("codex_weekly")).length,
    webgptProjects: projects.filter((project) => project.streams.includes("webgpt_daily")).length,
    crossStreamProjects: projects.filter((project) => project.streams.length > 1).length,
    hardBlocks: projects.filter((project) => project.repeatState === "blocked").length,
    softReferences: projects.filter((project) => project.repeatState === "soft").length,
    repeatEligible: projects.filter((project) => project.repeatState === "eligible").length,
    selectedReferences: projects.filter((project) => project.recordTypes.includes("selected_reference")).length,
    latestCodexDate,
    latestWebgptDate,
    generatedAt: new Date().toISOString()
  },
  projects,
  topPorting: projects.slice(0, 18),
  laneDistribution: distribution(projects, (project) => project.lane || project.contentValue || "unclassified"),
  platformDistribution: distribution(projects, (project) => project.platforms.length ? project.platforms : ["unclassified"], 14),
  streamDistribution: distribution(projects, (project) => project.streams.join(" + ")),
  timeline: [...timelineMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
  sourceSummary: {
    publishedRows,
    selectedRows,
    commonIndexRows,
    codexRunFiles,
    markdownRepoMentions
  }
};

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(dashboardData, null, 2)}\n`, "utf8");
console.log(`wrote ${rel(outPath)} with ${projects.length} projects`);
