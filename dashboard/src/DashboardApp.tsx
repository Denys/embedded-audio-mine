import { useMemo, useState } from "react";
import rawData from "./data/projects.json";
import type { DashboardData, DigestStreamKey, ProjectRecord, StreamKey } from "./types";

const data = rawData as DashboardData;
const nf = new Intl.NumberFormat("en-US");
const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "2-digit" });

const canonicalStreamLabels: Record<StreamKey, string> = {
  webgpt_daily: "WebGPT tracker",
  codex_weekly: "Codex Weekly"
};

const digestStreamLabels: Record<DigestStreamKey, string> = {
  webgpt_daily: "WebGPT Daily",
  codex_weekly: "Codex Weekly",
  analog_weekly: "Analog Weekly",
  portable_weekly: "Portable Weekly"
};

function formatDate(value: string) {
  if (!value) return "n/a";
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : dateFmt.format(date);
}

function uniq(values: string[][]) {
  return [...new Set(values.flat().filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function haystack(project: ProjectRecord) {
  return [
    project.repo,
    project.lane,
    project.status,
    project.notes,
    project.whySelected,
    project.contentSummary,
    project.portabilitySummary,
    ...project.platforms,
    ...project.repositoryTypes,
    ...project.hardwareEvidence,
    ...project.mcuPlatforms,
    ...project.languagesFrameworks,
    ...project.effects,
    ...project.dafxDomains,
    ...project.tags,
    ...project.representativeFiles,
    ...project.classificationGaps
  ].join(" ").toLowerCase();
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <label className="eam-filter">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="all">All</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TagGroup({ label, values, empty = "Unclassified" }: { label: string; values: string[]; empty?: string }) {
  return (
    <div className="eam-tag-group">
      <strong>{label}</strong>
      <div className="eam-tags">
        {values.length ? values.map((value) => <span key={value}>{value}</span>) : <em>{empty}</em>}
      </div>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="eam-metric">
      <span>{label}</span>
      <strong>{typeof value === "number" ? nf.format(value) : value}</strong>
      <small>{note}</small>
    </div>
  );
}

function Distribution({ title, points, onPick }: { title: string; points: { key: string; count: number }[]; onPick?: (key: string) => void }) {
  const max = Math.max(1, ...points.map((point) => point.count));
  return (
    <section className="eam-card eam-distribution">
      <header><h2>{title}</h2></header>
      <div className="eam-bars">
        {points.slice(0, 10).map((point) => (
          <button key={point.key} type="button" onClick={() => onPick?.(point.key)}>
            <span>{point.key}</span>
            <i><b style={{ width: `${Math.max(3, (point.count / max) * 100)}%` }} /></i>
            <strong>{point.count}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectDetail({ project }: { project: ProjectRecord | undefined }) {
  if (!project) return <aside className="eam-card eam-detail"><p>No project matches the active filters.</p></aside>;
  return (
    <aside className="eam-card eam-detail">
      <div className="eam-detail-head">
        <div>
          <span className={`eam-confidence ${project.classificationConfidence}`}>{project.classificationConfidence} confidence</span>
          <h2>{project.repo}</h2>
        </div>
        {project.url && <a href={project.url} target="_blank" rel="noreferrer">Open source ↗</a>}
      </div>
      <p className="eam-summary">{project.whySelected || project.contentSummary || project.notes || "No detailed summary is present in the canonical state."}</p>
      <dl className="eam-facts">
        <div><dt>Canonical streams</dt><dd>{project.streams.map((stream) => canonicalStreamLabels[stream]).join(" + ") || "none"}</dd></div>
        <div><dt>Discovery-report provenance</dt><dd>{project.digestStreams.map((stream) => digestStreamLabels[stream]).join(" + ") || "tracker only"}</dd></div>
        <div><dt>Lane</dt><dd>{project.lane || project.contentValue || "unclassified"}</dd></div>
        <div><dt>Repeat state</dt><dd>{project.repeatState}{project.repeatEligibleAfter ? ` · ${formatDate(project.repeatEligibleAfter)}` : ""}</dd></div>
        <div><dt>Last seen</dt><dd>{formatDate(project.lastPublished)}</dd></div>
        <div><dt>Porting score</dt><dd>{project.portingScore}</dd></div>
      </dl>
      <TagGroup label="DAFX technique domain" values={project.dafxDomains} />
      <TagGroup label="Repository type" values={project.repositoryTypes} />
      <TagGroup label="Hardware evidence" values={project.hardwareEvidence} empty="No explicit hardware evidence" />
      <TagGroup label="MCU / platform" values={project.mcuPlatforms} />
      <TagGroup label="Language / framework" values={project.languagesFrameworks} />
      <TagGroup label="Implemented / documented audio functions" values={project.effects} />
      {project.classificationGaps.length > 0 && (
        <p className="eam-gap"><strong>Classification gaps:</strong> {project.classificationGaps.join(", ")}</p>
      )}
      <details>
        <summary>Source ledger</summary>
        <ul>{project.sourceFiles.map((file) => <li key={file}>{file}</li>)}</ul>
      </details>
    </aside>
  );
}

export function DashboardApp() {
  const projects = data.projects;
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState("all");
  const [repoType, setRepoType] = useState("all");
  const [hardware, setHardware] = useState("all");
  const [mcu, setMcu] = useState("all");
  const [language, setLanguage] = useState("all");
  const [effect, setEffect] = useState("all");
  const [dafx, setDafx] = useState("all");
  const [repeat, setRepeat] = useState("all");
  const [confidence, setConfidence] = useState("all");
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");

  const repoTypes = useMemo(() => uniq(projects.map((project) => project.repositoryTypes)), [projects]);
  const hardwareOptions = useMemo(() => uniq(projects.map((project) => project.hardwareEvidence)).concat("No explicit hardware evidence"), [projects]);
  const mcuOptions = useMemo(() => uniq(projects.map((project) => project.mcuPlatforms)).concat("Unclassified"), [projects]);
  const languageOptions = useMemo(() => uniq(projects.map((project) => project.languagesFrameworks)).concat("Unclassified"), [projects]);
  const effectOptions = useMemo(() => uniq(projects.map((project) => project.effects)).concat("Unclassified"), [projects]);
  const dafxOptions = useMemo(() => uniq(projects.map((project) => project.dafxDomains)).concat("Unclassified"), [projects]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (needle && !haystack(project).includes(needle)) return false;
      if (stream !== "all") {
        const provenanceOnly = stream === "analog_weekly" || stream === "portable_weekly";
        const streamMatch = provenanceOnly
          ? project.digestStreams.includes(stream as DigestStreamKey)
          : project.streams.includes(stream as StreamKey);
        if (!streamMatch) return false;
      }
      if (repoType !== "all" && !project.repositoryTypes.includes(repoType)) return false;
      if (hardware !== "all") {
        if (hardware === "No explicit hardware evidence" && project.hardwareEvidence.length) return false;
        if (hardware !== "No explicit hardware evidence" && !project.hardwareEvidence.includes(hardware)) return false;
      }
      if (mcu !== "all") {
        if (mcu === "Unclassified" && project.mcuPlatforms.length) return false;
        if (mcu !== "Unclassified" && !project.mcuPlatforms.includes(mcu)) return false;
      }
      if (language !== "all") {
        if (language === "Unclassified" && project.languagesFrameworks.length) return false;
        if (language !== "Unclassified" && !project.languagesFrameworks.includes(language)) return false;
      }
      if (effect !== "all") {
        if (effect === "Unclassified" && project.effects.length) return false;
        if (effect !== "Unclassified" && !project.effects.includes(effect)) return false;
      }
      if (dafx !== "all") {
        if (dafx === "Unclassified" && project.dafxDomains.length) return false;
        if (dafx !== "Unclassified" && !project.dafxDomains.includes(dafx)) return false;
      }
      if (repeat !== "all" && project.repeatState !== repeat) return false;
      if (confidence !== "all" && project.classificationConfidence !== confidence) return false;
      return true;
    });
  }, [confidence, dafx, effect, hardware, language, mcu, projects, query, repeat, repoType, stream]);

  const selected = filtered.find((project) => project.id === selectedId) ?? filtered[0];

  function clearFilters() {
    setQuery("");
    setStream("all");
    setRepoType("all");
    setHardware("all");
    setMcu("all");
    setLanguage("all");
    setEffect("all");
    setDafx("all");
    setRepeat("all");
    setConfidence("all");
  }

  return (
    <div className="eam-shell">
      <header className="eam-hero">
        <div>
          <p className="eam-kicker">Embedded Audio Mine · current project-discovery state</p>
          <h1>Found projects and engineering facets</h1>
          <p>Published/selected trackers plus ranked project-discovery reports, with DAFX technique classification and anti-repeat ownership kept separate from report provenance.</p>
        </div>
        <div className="eam-freshness">
          <span>WebGPT {formatDate(data.metrics.latestWebgptDate)}</span>
          <span>Codex {formatDate(data.metrics.latestCodexDate)}</span>
          <span>Analog {formatDate(data.metrics.latestAnalogDate)}</span>
          <span>Portable {formatDate(data.metrics.latestPortableDate)}</span>
          <small>generated {new Date(data.metrics.generatedAt).toLocaleString()}</small>
        </div>
      </header>

      <section className="eam-metrics">
        <Metric label="Current records" value={data.metrics.totalProjects} note={`${data.sourceSummary.publishedRows} canonical publication rows`} />
        <Metric label="Common anti-repeat" value={data.sourceSummary.commonIndexRows} note="canonical shared-index rows represented" />
        <Metric label="Analog provenance" value={data.metrics.analogProjects} note={`${data.sourceSummary.analogDigestFiles} weekly project reports`} />
        <Metric label="Portable provenance" value={data.metrics.portableProjects} note={`${data.sourceSummary.portableRunFiles} retained weekly runs + feature history`} />
        <Metric label="Hard blocks" value={data.metrics.hardBlocks} note="repeat window active" />
        <Metric label="Needs classification" value={data.metrics.lowConfidenceClassifications} note="low-confidence inferred metadata" />
      </section>

      <section className="eam-card eam-controls">
        <label className="eam-search"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="repo, DAFX, hardware, MCU, Faust, delay…" /></label>
        <FilterSelect label="Report / provenance" value={stream} options={["webgpt_daily", "codex_weekly", "analog_weekly", "portable_weekly"]} onChange={setStream} />
        <FilterSelect label="DAFX technique" value={dafx} options={dafxOptions} onChange={setDafx} />
        <FilterSelect label="Repository type" value={repoType} options={repoTypes} onChange={setRepoType} />
        <FilterSelect label="Hardware evidence" value={hardware} options={hardwareOptions} onChange={setHardware} />
        <FilterSelect label="MCU / platform" value={mcu} options={mcuOptions} onChange={setMcu} />
        <FilterSelect label="Language / framework" value={language} options={languageOptions} onChange={setLanguage} />
        <FilterSelect label="Audio effect / function" value={effect} options={effectOptions} onChange={setEffect} />
        <FilterSelect label="Repeat state" value={repeat} options={["blocked", "eligible", "soft", "unknown"]} onChange={setRepeat} />
        <FilterSelect label="Classification" value={confidence} options={["high", "medium", "low"]} onChange={setConfidence} />
        <button className="eam-clear" type="button" onClick={clearFilters}>Clear filters</button>
      </section>

      <section className="eam-grid">
        <div className="eam-main">
          <section className="eam-card eam-table-card">
            <header><div><h2>Project atlas</h2><p>{nf.format(filtered.length)} of {nf.format(projects.length)} records match.</p></div></header>
            <div className="eam-table-wrap">
              <table>
                <thead><tr><th>Repository / resource</th><th>Score</th><th>Type</th><th>MCU / platform</th><th>Stack</th><th>Effects</th><th>DAFX</th><th>Last seen</th><th>Repeat</th></tr></thead>
                <tbody>
                  {filtered.map((project) => (
                    <tr key={project.id} className={selected?.id === project.id ? "selected" : ""} onClick={() => setSelectedId(project.id)}>
                      <td><strong>{project.repo}</strong><small>{project.streams.map((value) => canonicalStreamLabels[value]).join(" + ") || project.digestStreams.map((value) => digestStreamLabels[value]).join(" + ") || "tracker evidence"}</small></td>
                      <td>{project.portingScore}</td>
                      <td>{project.repositoryTypes.slice(0, 2).join(" · ") || "Unclassified"}</td>
                      <td>{project.mcuPlatforms.slice(0, 2).join(" · ") || "Unclassified"}</td>
                      <td>{project.languagesFrameworks.slice(0, 2).join(" · ") || "Unclassified"}</td>
                      <td>{project.effects.slice(0, 2).join(" · ") || "Unclassified"}</td>
                      <td>{project.dafxDomains.slice(0, 2).join(" · ") || "Unclassified"}</td>
                      <td>{formatDate(project.lastPublished)}</td>
                      <td><span className={`eam-repeat ${project.repeatState}`}>{project.repeatState}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="eam-distributions">
            <Distribution title="DAFX technique domains" points={data.dafxDomainDistribution} onPick={setDafx} />
            <Distribution title="Repository types" points={data.repositoryTypeDistribution} onPick={setRepoType} />
            <Distribution title="MCU / platform" points={data.mcuPlatformDistribution} onPick={setMcu} />
            <Distribution title="Languages / frameworks" points={data.languageFrameworkDistribution} onPick={setLanguage} />
            <Distribution title="Effects / audio functions" points={data.effectDistribution} onPick={setEffect} />
          </div>
        </div>
        <ProjectDetail project={selected} />
      </section>

      <footer className="eam-footer">
        <p>Source state: {data.sourceSummary.publishedRows} publication rows · {data.sourceSummary.selectedRows} selected rows · {data.sourceSummary.commonIndexRows} common anti-repeat rows · {data.sourceSummary.codexRunFiles} Codex run files · {data.sourceSummary.analogDigestFiles} Analog project reports · {data.sourceSummary.portableRunFiles} Portable run files.</p>
        <p>DAFX domains are technique-level inferences from implementation evidence and documented effects; they do not replace project lanes or verification confidence. Non-project reports remain excluded.</p>
      </footer>
    </div>
  );
}
