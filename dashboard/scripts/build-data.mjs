import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  ["Raspberry Pi", /raspberry pi|\brpi\b|bare-metal pi|linux audio appliance/i],
  ["FPGA", /\bfpga\b|verilog|vhdl|ice40|gowin|tang nano|artix/i],
  ["Eurorack", /\beurorack\b|modular/i],
  ["USB Audio", /\busb audio\b|\buac2\b|usb-audio/i],
  ["MIDI", /\bmidi\b|sysex/i],
  ["WebUSB", /\bwebusb\b/i],
  ["Web Serial", /\bweb serial\b|webserial/i],
  ["Codec", /\bcodec\b|wm8731|tlv320|sgtl5000|cs4272|cs42448|es8388|pcm3060|pcm5102|pcm1808|ak4619/i],
  ["SSI", /ssi2130|ssi2131|ssi2140|ssi2144|ssi2164|ssi2190/i],
  ["Faust", /\bfaust\b/i],
  ["Hardware", /\bpcb\b|schematic|kicad|gerber|hardware/i],
  ["DSP Library", /\bdsp\b|filter|fft|reverb|delay|oscillator/i],
  ["Firmware", /\bfirmware\b|arduino|platformio|cmake|makefile/i]
];

const mcuPatterns = [
  ["Daisy / STM32H7", /\bdaisy\b|daisy seed|patch submodule|stm32h750/i],
  ["Teensy 4.x", /teensy\s*4(?:\.0|\.1|\.x)?|imxrt1062/i],
  ["Teensy 3.x", /teensy\s*3(?:\.2|\.5|\.6|\.x)?/i],
  ["RP2350 / Pico 2", /\brp2350\b|pico\s*2/i],
  ["RP2040 / Pico", /\brp2040\b|raspberry pi pico|\bpico\b/i],
  ["ESP32", /\besp32(?:-s2|-s3|-c3)?\b|esp-idf/i],
  ["STM32", /\bstm32(?:h7|f7|f4|l4|f1|u3|h743|h750|l476)?\b|blackpill|bluepill/i],
  ["Raspberry Pi / SBC", /raspberry pi|\brpi\b|linux audio|bare-metal pi|\bsbc\b/i],
  ["FPGA", /\bfpga\b|verilog|vhdl|ice40|gowin|tang nano|artix|cmod a7/i],
  ["AVR / ATmega", /\batmega\b|\bavr\b|arduino nano|arduino uno/i],
  ["SAMD", /\bsamd(?:21|51)?\b|atsamd/i],
  ["nRF", /\bnrf52\b|\bnrf52840\b/i]
];

const languageFrameworkPatterns = [
  ["C++", /\bc\+\+\b|\.cpp\b|\.hpp\b/i],
  ["C", /(?:^|[\s,;/])c(?:[\s,;/]|$)|\.c\b|\bc firmware\b/i],
  ["Rust", /\brust\b|\.rs\b|cargo/i],
  ["Python", /\bpython\b|micropython|circuitpython/i],
  ["JavaScript / TypeScript", /javascript|typescript|\bnode\.?js\b|\breact\b|web ui|browser/i],
  ["Arduino", /\barduino\b|teensyduino/i],
  ["PlatformIO", /\bplatformio\b/i],
  ["CMake", /\bcmake\b/i],
  ["Make", /\bmakefile\b|\bgnu make\b/i],
  ["Faust", /\bfaust\b|\.dsp\b/i],
  ["JUCE", /\bjuce\b/i],
  ["libDaisy / DaisySP", /libdaisy|daisysp|daisy seed/i],
  ["Teensy Audio", /pjrc audio|teensy audio|audiostream|sgtl5000/i],
  ["ESP-IDF", /esp-idf/i],
  ["Pico SDK", /pico sdk|pico-sdk/i],
  ["Zephyr", /\bzephyr\b/i],
  ["Pure Data", /pure data|\bplugdata\b|\.pd\b/i],
  ["Max / Gen", /max\/gen|max gen|gen~/i],
  ["LV2", /\blv2\b/i],
  ["VST / VST3", /\bvst3?\b/i],
  ["CircuitPython", /circuitpython/i],
  ["MicroPython", /micropython/i],
  ["Verilog / VHDL", /\bverilog\b|\bvhdl\b/i]
];

const hardwareEvidencePatterns = [
  ["Schematic", /schematic|schdoc|circuit diagram/i],
  ["Editable EDA", /kicad|eagle files?|altium|easyeda|fritzing|pcb source|schdoc|pcbdoc/i],
  ["PCB / Gerbers", /\bpcb\b|gerber|fabrication files?|fab files?|board files?|jlcpcb/i],
  ["BOM", /\bbom\b|ibom|bill of materials|interactive bom/i],
  ["Panel / Enclosure", /front[- ]panel|\bpanel\b|enclosure|freecad|\.step\b|\bstep files?\b|\bstl\b|\bdxf\b|mechanical|case files?/i],
  ["Calibration / Test", /calibrat|factory test|test jig|test fixture|bench[- ]tested|measurements?|characteri[sz]ation|production test/i],
  ["Open-Hardware Evidence", /cern-ohl|oshwa|open hardware|cc by-sa|cc-by-sa|cc by 4\.0|hardware license/i]
];

const effectPatterns = [
  ["Delay / Echo", /\bdelay\b|\becho\b|slapback|ping[- ]pong/i],
  ["Reverb / Diffusion", /\breverb\b|\bfdn\b|dattorro|diffusion|plate reverb|spring reverb/i],
  ["Chorus", /\bchorus\b|ensemble/i],
  ["Flanger", /\bflanger\b|flanging/i],
  ["Phaser", /\bphaser\b|phase shifter|allpass stages?/i],
  ["Tremolo / Rotary", /\btremolo\b|rotary speaker|leslie/i],
  ["Drive / Distortion / Fuzz", /overdrive|distortion|\bfuzz\b|waveshap|saturat|tube screamer|rat combination/i],
  ["Dynamics / Gate", /compressor|limiter|noise gate|\bgate\b|dynamics/i],
  ["EQ / Filter", /\beq\b|equalizer|equaliser|\bfilter\b|\bvcf\b|low[- ]pass|high[- ]pass|band[- ]pass|shelf|tone stack/i],
  ["Pitch / Shimmer", /pitch shift|pitch-shift|shimmer|harmoni[sz]er/i],
  ["Granular / Freeze", /granular|grain|spectral freeze|\bfreeze\b/i],
  ["Looper / Sampler", /\blooper\b|\bsampler\b|sample playback|recording loop/i],
  ["Synthesis / Oscillator", /\bsynth(?:esizer|esis)?\b|\boscillator\b|\bvco\b|wavetable|\bfm synth|physical model/i],
  ["VCA / Mixer", /\bvca\b|voltage controlled amplifier|\bmixer\b|crossfader|panner/i],
  ["Sequencer / Clock", /sequencer|arpeggiator|midi clock|clock generator/i],
  ["MIDI / CV Utility", /midi[- ]to[- ]cv|midi\/cv|cv\/gate|control voltage|midi controller|faderbank/i]
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

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    if (row.some((value) => value.length > 0)) rows.push(row);
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      pushField();
    } else if (char === "\n") {
      pushRow();
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field.length || row.length) pushRow();
  if (!rows.length) return [];

  const headers = rows[0].map((value) => value.trim());
  return rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, String(values[index] ?? "").trim()]))
  );
}

function readCsv(file) {
  return parseCsv(readText(file));
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
  const clean = String(next || "").replace(/\s+/g, " ").trim();
  if (!clean) return existing || "";
  if (!existing) return clean;
  return existing.includes(clean) ? existing : `${existing} ${clean}`;
}

function markdownToText(value) {
  return String(value || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
      digestStreams: new Set(),
      sourceFiles: new Set(),
      recordTypes: new Set(),
      platforms: new Set(),
      repositoryTypes: new Set(),
      hardwareEvidence: new Set(),
      mcuPlatforms: new Set(),
      languagesFrameworks: new Set(),
      effects: new Set(),
      tags: new Set(),
      digestDates: new Set(),
      digestDatesByStream: { webgpt_daily: new Set(), codex_weekly: new Set(), analog_weekly: new Set() },
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
      portabilitySummary: "",
      classificationConfidence: "low",
      classificationGaps: []
    });
  }
  return records.get(key);
}

function evidenceText(record) {
  return [
    record.repo,
    record.notes,
    record.whySelected,
    record.contentSummary,
    record.topic,
    Array.from(record.tags).join(" "),
    Array.from(record.platforms).join(" "),
    Array.from(record.representativeFiles).join(" ")
  ].join(" ");
}

function inferPlatforms(record) {
  const text = evidenceText(record);
  for (const [label, pattern] of platformPatterns) {
    if (pattern.test(text)) record.platforms.add(label);
  }
}

function inferClassifications(record) {
  const text = evidenceText(record);

  for (const [label, pattern] of mcuPatterns) {
    if (pattern.test(text)) record.mcuPlatforms.add(label);
  }
  for (const [label, pattern] of languageFrameworkPatterns) {
    if (pattern.test(text)) record.languagesFrameworks.add(label);
  }
  for (const [label, pattern] of hardwareEvidencePatterns) {
    if (pattern.test(text)) record.hardwareEvidence.add(label);
  }
  for (const [label, pattern] of effectPatterns) {
    if (pattern.test(text)) record.effects.add(label);
  }

  const hasHardware = record.hardwareEvidence.size > 0 || /analog|eurorack|hardware|module|pedal pcb|audio board|carrier|front[- ]end/i.test(text);
  const hasFirmware = /firmware|arduino|platformio|cmake|makefile|libdaisy|daisysp|teensy|esp-idf|pico sdk|source code/i.test(text);
  const isDesktop = /\bjuce\b|\bvst3?\b|\bau plugin\b|desktop|macos|windows|linux plugin/i.test(text);
  const isLibrary = /\blibrary\b|sdk|framework|dsp primitives|dsp library|audio library/i.test(text);
  const isTooling = /tooling|editor|simulator|codegen|code generator|flasher|programmer|web ui|dashboard|bridge|debug/i.test(text);
  const isApplication = /synth|groovebox|drum machine|pedal|looper|sampler|sequencer|audio appliance|module/i.test(text);
  const isComposite = /\+|:hardware-family|:modules\//i.test(record.repo);
  const isExternalResource = !record.url && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.:+-]+$/.test(record.repo);

  if (isComposite) record.repositoryTypes.add("Composite / family");
  if (hasHardware && hasFirmware) record.repositoryTypes.add("Hardware + firmware");
  else if (hasHardware) record.repositoryTypes.add("Hardware / circuit");
  if (isDesktop) record.repositoryTypes.add("Desktop audio / plugin");
  if (isLibrary) record.repositoryTypes.add("DSP / software library");
  if (hasFirmware && !hasHardware) record.repositoryTypes.add("Firmware / embedded software");
  if (isTooling) record.repositoryTypes.add("Tooling / framework");
  if (isApplication && !isDesktop) record.repositoryTypes.add("Audio application / instrument");
  if (isExternalResource) record.repositoryTypes.add("Reference / external resource");
  if (!record.repositoryTypes.size) record.repositoryTypes.add("Unclassified");

  if (!record.mcuPlatforms.size) {
    if (/analog|ssi21|as33|lm13700|pt2399|vca|vcf|vco|op[- ]amp|class-d|discrete/i.test(text)) {
      record.mcuPlatforms.add("Analog / no MCU stated");
    } else if (isDesktop) {
      record.mcuPlatforms.add("Desktop / host CPU");
    }
  }

  const gaps = [];
  if (record.repositoryTypes.has("Unclassified")) gaps.push("repository type");
  if (!record.hardwareEvidence.size && hasHardware) gaps.push("hardware evidence");
  if (!record.mcuPlatforms.size) gaps.push("MCU / platform");
  if (!record.languagesFrameworks.size && !record.mcuPlatforms.has("Analog / no MCU stated")) gaps.push("language / framework");
  if (!record.effects.size) gaps.push("audio function / effects");
  record.classificationGaps = gaps;

  const evidenceSignals = [
    record.notes,
    record.whySelected,
    record.contentSummary,
    record.portabilitySummary,
    Array.from(record.tags).join(" "),
    Array.from(record.representativeFiles).join(" ")
  ].filter((value) => String(value || "").trim()).length;

  if (gaps.length <= 1 && evidenceSignals >= 2) record.classificationConfidence = "high";
  else if (gaps.length <= 2 && evidenceSignals >= 1) record.classificationConfidence = "medium";
  else record.classificationConfidence = "low";
}

let publishedRows = 0;
let selectedRows = 0;
let commonIndexRows = 0;
let rankedDigestEntries = 0;
let analogDigestFiles = 0;

const analogPublicationEvidence = new Map();
const latestDigestDates = { webgpt_daily: "", codex_weekly: "", analog_weekly: "" };

function addRankedDigestEntry(resource, { stream, file, date, lane = "", url = "", summary = "" }) {
  const record = getRecord(resource);
  if (!record) return;
  rankedDigestEntries += 1;
  record.digestStreams.add(stream);
  if (stream === "codex_weekly") record.streams.add("codex_weekly");
  if (stream === "webgpt_daily") record.streams.add("webgpt_daily");
  record.sourceFiles.add(rel(file));
  record.recordTypes.add("ranked_digest");
  record.lane ||= lane;
  record.url ||= url || repoUrl(record.repo);
  record.firstSeen = minDate(record.firstSeen, date);
  record.lastPublished = maxDate(record.lastPublished, date);
  if (date) {
    record.digestDates.add(date);
    record.digestDatesByStream[stream].add(date);
    latestDigestDates[stream] = maxDate(latestDigestDates[stream], date);
  }
  record.notes = appendText(record.notes, summary);
}

function parseDigestRankings() {
  const dailyDir = path.join(repoRoot, "digests");
  for (const fileName of readdirSync(dailyDir).filter((name) => name.endsWith(".md"))) {
    const file = path.join(dailyDir, fileName);
    const text = readText(file);
    const date = safeDate(fileName);
    const isAnalog = fileName.includes("analog-audio-mine");
    const stream = isAnalog ? "analog_weekly" : "webgpt_daily";
    if (isAnalog) analogDigestFiles += 1;

    if (isAnalog) {
      const blockPattern = /##\s+(?:Proposed\s+)?publication(?:-tracker)?\s+rows\s*\n+```csv\s*\n([\s\S]*?)```/gi;
      for (const match of text.matchAll(blockPattern)) {
        for (const row of parseCsv(match[1])) {
          const resource = normalizeResource(row.repo);
          if (!resource) continue;
          const evidenceDate = safeDate(row.last_published) || date;
          analogPublicationEvidence.set(resource.toLowerCase(), { date: evidenceDate, file: rel(file) });
          addRankedDigestEntry(resource, {
            stream,
            file,
            date: evidenceDate,
            lane: row.lane || ""
          });
        }
      }
      // Analog recovery digests persist canonical publication rows. Do not also create
      // a second record from the human-facing heading when that heading names a parent repo.
      continue;
    }

    const headingPattern = /^###\s+(\d+)[.)]?\s+(.+)$/gm;
    const headingMatches = [...text.matchAll(headingPattern)];
    for (let index = 0; index < headingMatches.length; index += 1) {
      const match = headingMatches[index];
      const heading = match[2];
      const link = heading.match(/\[[^\]]+\]\((https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)[^)]*)\)/i);
      const codeResource = heading.match(/`([A-Za-z0-9_.-]+\/[A-Za-z0-9_.:+-]+)`/);
      const plainResource = heading.match(/(?:^|\s)([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)(?:\s|$)/);
      const resource = normalizeResource(link?.[2] || codeResource?.[1] || plainResource?.[1] || "");
      if (!resource) continue;
      const lane = heading.match(/\b(STRONG_PASS|REF_PASS|PASS|HOLD|FOUNDATION_UPDATE)\b/)?.[1] || "";
      const blockStart = match.index ?? 0;
      const blockEnd = headingMatches[index + 1]?.index ?? text.length;
      const summary = markdownToText(text.slice(blockStart, Math.min(blockEnd, blockStart + 2200)));
      addRankedDigestEntry(resource, {
        stream,
        file,
        date,
        lane,
        url: link?.[1] || "",
        summary
      });
    }
  }
}

parseDigestRankings();

const dataDir = path.join(repoRoot, "data");
const publishedFile = path.join(dataDir, "published-repo-log.csv");
for (const row of readCsv(publishedFile)) {
  publishedRows += 1;
  const record = getRecord(row.repo);
  if (!record) continue;
  const analogEvidence = analogPublicationEvidence.get(record.id);
  const isAnalogPublication = analogEvidence && analogEvidence.date === safeDate(row.last_published);
  if (isAnalogPublication) record.digestStreams.add("analog_weekly");
  // Preserve canonical anti-repeat stream semantics: this tracker is WebGPT-owned even when
  // the publication provenance came from the Analog Audio Mine lane.
  record.streams.add("webgpt_daily");
  record.sourceFiles.add(rel(publishedFile));
  record.recordTypes.add("published");
  record.lane ||= row.lane || "";
  record.status ||= row.status || "";
  record.firstSeen = minDate(record.firstSeen, safeDate(row.first_seen));
  record.lastPublished = maxDate(record.lastPublished, safeDate(row.last_published));
  record.repeatEligibleAfter = maxDate(record.repeatEligibleAfter, safeDate(row.repeat_eligible_after));
  record.notes = appendText(record.notes, row.notes);
}

const selectedFile = path.join(dataDir, "selected-projects.csv");
for (const row of readCsv(selectedFile)) {
  selectedRows += 1;
  const record = getRecord(row.project);
  if (!record) continue;
  if (analogPublicationEvidence.has(record.id)) record.digestStreams.add("analog_weekly");
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
  if (row.source_stream === "webgpt_daily") {
    record.streams.add("webgpt_daily");
    const analogEvidence = analogPublicationEvidence.get(record.id);
    const mirrorsAnalogPublication = analogEvidence && analogEvidence.date === safeDate(row.last_published);
    if (mirrorsAnalogPublication) record.digestStreams.add("analog_weekly");
  }
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
  record.digestStreams.add("codex_weekly");
  record.sourceFiles.add(rel(historyFile));
  record.recordTypes.add("published");
  record.featureCount = Math.max(record.featureCount, Number(info.feature_count || 0));
  record.firstSeen = minDate(record.firstSeen, safeDate(info.appearance_dates?.[0]));
  record.lastPublished = maxDate(record.lastPublished, safeDate(info.last_featured));
  for (const [date, rank] of Object.entries(info.ranks || {})) {
    record.rankHistory[date] = Number(rank);
    record.digestDates.add(date);
    record.digestDatesByStream.codex_weekly.add(date);
    latestDigestDates.codex_weekly = maxDate(latestDigestDates.codex_weekly, date);
  }
  if (info.last_featured && info.ranks?.[info.last_featured]) {
    record.latestRank = Number(info.ranks[info.last_featured]);
  }
}

const runDir = path.join(repoRoot, "codex-weekly", "data", "runs");
let codexRunFiles = 0;
if (existsSync(runDir)) {
  for (const fileName of readdirSync(runDir).filter((name) => /^digest_\d{4}-\d{2}-\d{2}\.json$/.test(name))) {
    codexRunFiles += 1;
    const file = path.join(runDir, fileName);
    const run = readJson(file);
    for (const item of run.selected || []) {
      const record = getRecord(item.full_name);
      if (!record) continue;
      record.streams.add("codex_weekly");
      record.digestStreams.add("codex_weekly");
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
      record.digestDatesByStream.codex_weekly.add(run.date);
      latestDigestDates.codex_weekly = maxDate(latestDigestDates.codex_weekly, safeDate(run.date));
    }
  }
}

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
  if (record.digestStreams.size > 1) value += 14;
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
  value += Math.min(record.hardwareEvidence.size * 3, 18);
  value += Math.min(record.languagesFrameworks.size * 2, 12);
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
  inferClassifications(record);
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
    digestStreams: [...record.digestStreams].sort(),
    sourceFiles: [...record.sourceFiles].sort(),
    recordTypes: [...record.recordTypes].filter(Boolean).sort(),
    platforms: [...record.platforms].sort(),
    repositoryTypes: [...record.repositoryTypes].sort(),
    hardwareEvidence: [...record.hardwareEvidence].sort(),
    mcuPlatforms: [...record.mcuPlatforms].sort(),
    languagesFrameworks: [...record.languagesFrameworks].sort(),
    effects: [...record.effects].sort(),
    tags: [...record.tags].sort(),
    digestDates: [...record.digestDates].sort(),
    digestDatesByStream: Object.fromEntries(
      Object.entries(record.digestDatesByStream).map(([stream, dates]) => [stream, [...dates].sort()])
    ),
    representativeFiles: [...record.representativeFiles].sort()
  };
}

const projects = [...records.values()]
  .map(serialize)
  .sort((a, b) => b.portingScore - a.portingScore || b.lastPublished.localeCompare(a.lastPublished) || a.repo.localeCompare(b.repo));

const latestCodexDate = latestDigestDates.codex_weekly;
const latestWebgptDate = latestDigestDates.webgpt_daily;
const latestAnalogDate = latestDigestDates.analog_weekly;

const timelineMap = new Map();
for (const project of projects) {
  for (const [stream, dates] of Object.entries(project.digestDatesByStream)) {
    for (const date of dates) {
      if (!date) continue;
      if (!timelineMap.has(date)) timelineMap.set(date, { date, webgpt_daily: 0, codex_weekly: 0, analog_weekly: 0 });
      timelineMap.get(date)[stream] += 1;
    }
  }
}

const dashboardData = {
  metrics: {
    totalProjects: projects.length,
    codexProjects: projects.filter((project) => project.streams.includes("codex_weekly")).length,
    webgptProjects: projects.filter((project) => project.streams.includes("webgpt_daily")).length,
    analogProjects: projects.filter((project) => project.digestStreams.includes("analog_weekly")).length,
    crossStreamProjects: projects.filter((project) => project.streams.length > 1 || project.digestStreams.length > 1).length,
    hardBlocks: projects.filter((project) => project.repeatState === "blocked").length,
    softReferences: projects.filter((project) => project.repeatState === "soft").length,
    repeatEligible: projects.filter((project) => project.repeatState === "eligible").length,
    selectedReferences: projects.filter((project) => project.recordTypes.includes("selected_reference")).length,
    lowConfidenceClassifications: projects.filter((project) => project.classificationConfidence === "low").length,
    latestCodexDate,
    latestWebgptDate,
    latestAnalogDate,
    generatedAt: new Date().toISOString()
  },
  projects,
  topPorting: projects.slice(0, 18),
  laneDistribution: distribution(projects, (project) => project.lane || project.contentValue || "unclassified"),
  platformDistribution: distribution(projects, (project) => project.platforms.length ? project.platforms : ["unclassified"], 14),
  repositoryTypeDistribution: distribution(projects, (project) => project.repositoryTypes, 12),
  hardwareEvidenceDistribution: distribution(projects, (project) => project.hardwareEvidence.length ? project.hardwareEvidence : ["No explicit hardware evidence"], 12),
  mcuPlatformDistribution: distribution(projects, (project) => project.mcuPlatforms.length ? project.mcuPlatforms : ["Unclassified"], 16),
  languageFrameworkDistribution: distribution(projects, (project) => project.languagesFrameworks.length ? project.languagesFrameworks : ["Unclassified"], 18),
  effectDistribution: distribution(projects, (project) => project.effects.length ? project.effects : ["Unclassified"], 20),
  classificationConfidenceDistribution: distribution(projects, (project) => project.classificationConfidence, 3),
  streamDistribution: distribution(projects, (project) => project.streams.length ? project.streams.join(" + ") : "digest-only"),
  provenanceDistribution: distribution(projects, (project) => project.digestStreams.length ? project.digestStreams : ["tracker-only"]),
  timeline: [...timelineMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
  sourceSummary: {
    publishedRows,
    selectedRows,
    commonIndexRows,
    codexRunFiles,
    rankedDigestEntries,
    analogDigestFiles,
    lowConfidenceClassifications: projects.filter((project) => project.classificationConfidence === "low").length
  }
};

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(dashboardData, null, 2)}\n`, "utf8");
console.log(`wrote ${rel(outPath)} with ${projects.length} project/resource records`);
console.log(`classification confidence: ${dashboardData.metrics.lowConfidenceClassifications} low-confidence records`);
