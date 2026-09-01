import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, "..");
const dataPath = path.join(dashboardRoot, "src", "data", "projects.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));

for (const project of data.projects || []) {
  project.dafxDomains ||= [];
  const structuredEvidence = [
    project.repo,
    ...(project.effects || []),
    ...(project.tags || []),
    ...(project.representativeFiles || [])
  ].join(" ");

  // WDF names frequently occur behind separators (`chowdsp_wdf`, `wdft/...`).
  // Treat the literal technique token as Virtual Analog evidence without consulting report/adaptation prose.
  if (/wdf/i.test(structuredEvidence) && !project.dafxDomains.includes("Virtual Analog")) {
    project.dafxDomains.push("Virtual Analog");
    project.dafxDomains.sort();
  }
}

const counts = new Map();
for (const project of data.projects || []) {
  const domains = project.dafxDomains?.length ? project.dafxDomains : ["Unclassified"];
  for (const domain of domains) counts.set(domain, (counts.get(domain) || 0) + 1);
}
data.dafxDomainDistribution = [...counts.entries()]
  .map(([key, count]) => ({ key, count }))
  .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
  .slice(0, 16);

writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log("normalized WDF evidence into the DAFX Virtual Analog domain");
