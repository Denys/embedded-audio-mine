import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const dataPath = path.join(dashboardRoot, "src", "data", "projects.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));

function addValue(values, value) {
  if (value && !values.includes(value)) values.push(value);
}

function distribution(projects, getter, limit = 16) {
  const counts = new Map();
  for (const project of projects) {
    const raw = getter(project);
    for (const value of (Array.isArray(raw) ? raw : [raw])) {
      if (value) counts.set(value, (counts.get(value) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

for (const project of data.projects || []) {
  project.dafxDomains ||= [];
  const evidence = [
    project.repo,
    project.topic,
    project.notes,
    project.whySelected,
    project.contentSummary,
    ...(project.effects || []),
    ...(project.tags || []),
    ...(project.representativeFiles || []),
    ...(project.platforms || [])
  ].filter(Boolean).join(" ");

  // DAFX virtual-analog evidence commonly appears as WDF or “wave-digital”.
  // Keep this evidence-only: portability/adaptation proposals are deliberately excluded.
  if (/\bwdf\b|wave[- ]digital|wave digital filter/i.test(evidence)) {
    addValue(project.dafxDomains, "Virtual Analog");
  }
  project.dafxDomains = [...new Set(project.dafxDomains)].sort();
}

data.dafxDomainDistribution = distribution(
  data.projects,
  (project) => project.dafxDomains.length ? project.dafxDomains : ["Unclassified"]
);

writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log("finalized DAFX domains with WDF / wave-digital evidence support");
