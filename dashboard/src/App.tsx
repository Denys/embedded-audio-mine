import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  ChartLine,
  Cpu,
  Database,
  Funnel,
  GithubLogo,
  Heartbeat,
  MagnifyingGlass,
  Pause,
  Play,
  Pulse,
  Radio,
  Sparkle,
  Stack,
  Timer,
  WarningCircle
} from "@phosphor-icons/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from "@tanstack/react-table";
import rawData from "./data/projects.json";
import type { DashboardData, DistributionPoint, ProjectRecord, StreamKey } from "./types";

const data = rawData as unknown as DashboardData;
const numberFormat = new Intl.NumberFormat("en-US");
const dateFormat = new Intl.DateTimeFormat("en-GB", { month: "short", day: "2-digit", year: "numeric" });
const HIGHLIGHT_INTERVAL_MS = 30_000;
const HIGHLIGHT_WORD_LIMIT = 72;
const HIGHLIGHT_PROJECT_LIMIT = 8;

const streamLabels: Record<StreamKey, string> = {
  codex_weekly: "Codex Weekly",
  webgpt_daily: "WebGPT Daily"
};

const columnHelper = createColumnHelper<ProjectRecord>();

function formatNumber(value: number | null | undefined) {
  return typeof value === "number" ? numberFormat.format(value) : "n/a";
}

function formatDate(value: string) {
  if (!value) return "n/a";
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date);
}

function firstSentence(value: string, fallback = "No summary available.") {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  return clean.length > 150 ? `${clean.slice(0, 147)}...` : clean;
}

function sentence(value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const normalized = `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
  return /[.!?]$/.test(normalized) ? normalized : `${normalized}.`;
}

function limitWords(value: string, maxWords: number, fallback = "No concise highlight available yet.") {
  const words = value.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (!words.length) return fallback;
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function wordCount(value: string) {
  return value.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
}

function highlightNarrative(project: ProjectRecord) {
  const parts = [
    sentence(project.whySelected),
    sentence(project.portabilitySummary),
    sentence(project.contentSummary),
    project.platforms.length ? `Surface: ${project.platforms.slice(0, 6).join(", ")}.` : "",
    project.representativeFiles.length ? `Evidence: ${project.representativeFiles.slice(0, 3).join(", ")}.` : ""
  ];
  const uniqueParts = parts.filter(Boolean).filter((part, index, list) => list.indexOf(part) === index);
  return limitWords(uniqueParts.join(" "), HIGHLIGHT_WORD_LIMIT);
}

function projectSearchText(project: ProjectRecord) {
  return [
    project.repo,
    project.status,
    project.selectedStatus,
    project.origin,
    project.notes,
    project.whySelected,
    project.contentSummary,
    project.portabilitySummary,
    project.platforms.join(" "),
    project.tags.join(" "),
    project.representativeFiles.join(" "),
    project.sourceFiles.join(" ")
  ]
    .join(" ")
    .toLowerCase();
}

function streamText(streams: StreamKey[]) {
  return streams.map((stream) => streamLabels[stream]).join(" + ");
}

function AppSignalField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = { width: 0, height: 0 };
    const nodes = Array.from({ length: 48 }, (_, index) => ({
      x: (index * 137) % 1000,
      y: (index * 251) % 700,
      vx: ((index % 5) - 2) * 0.08,
      vy: (((index + 2) % 7) - 3) * 0.06,
      r: 1.1 + (index % 4) * 0.35
    }));
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      rect.width = Math.max(1, box.width);
      rect.height = Math.max(1, box.height);
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, rect.width, rect.height);
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "rgba(124, 255, 178, 0.08)";
      context.lineWidth = 1;

      for (let x = 0; x < rect.width; x += 76) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x + Math.sin(frame * 0.006 + x) * 12, rect.height);
        context.stroke();
      }

      for (const node of nodes) {
        if (!reduceMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = rect.width + 20;
          if (node.x > rect.width + 20) node.x = -20;
          if (node.y < -20) node.y = rect.height + 20;
          if (node.y > rect.height + 20) node.y = -20;
        }
        context.beginPath();
        context.fillStyle = "rgba(124, 255, 178, 0.34)";
        context.arc(node.x % rect.width, node.y % rect.height, node.r, 0, Math.PI * 2);
        context.fill();
      }

      context.strokeStyle = "rgba(124, 255, 178, 0.12)";
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x % rect.width) - (b.x % rect.width);
          const dy = (a.y % rect.height) - (b.y % rect.height);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 155) {
            context.globalAlpha = Math.max(0, 1 - distance / 155) * 0.42;
            context.beginPath();
            context.moveTo(a.x % rect.width, a.y % rect.height);
            context.lineTo(b.x % rect.width, b.y % rect.height);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className="signal-field" ref={canvasRef} aria-hidden="true" />;
}

function MetricTile({
  icon,
  label,
  value,
  detail,
  tone = "default",
  active = false,
  onClick
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "hot" | "cool";
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`metric-tile ${tone} ${active ? "active" : ""}`}
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
    >
      <div className="metric-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </motion.button>
  );
}

function ProjectHighlightWindow({
  projects,
  currentIndex,
  isPaused,
  onStep,
  onSelect,
  onTogglePause
}: {
  projects: ProjectRecord[];
  currentIndex: number;
  isPaused: boolean;
  onStep: (direction: -1 | 1) => void;
  onSelect: (index: number) => void;
  onTogglePause: () => void;
}) {
  const project = projects[currentIndex];
  if (!project) return null;

  const narrative = highlightNarrative(project);
  const estimatedSeconds = Math.ceil((wordCount(narrative) / 150) * 60);

  return (
    <section className="panel highlight-window" aria-label="Looped project highlights">
      <div className="highlight-topline">
        <div>
          <span className="eyebrow">
            <Sparkle size={15} weight="fill" />
            Project Highlights
          </span>
          <h2>{project.repo}</h2>
        </div>
        <div className="highlight-controls">
          <span className="source-pill">
            <Timer size={14} weight="bold" />
            30 sec loop
          </span>
          <button
            className="icon-button"
            type="button"
            aria-label="Previous project highlight"
            title="Previous project highlight"
            onClick={() => onStep(-1)}
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={isPaused ? "Resume project highlights" : "Pause project highlights"}
            title={isPaused ? "Resume project highlights" : "Pause project highlights"}
            onClick={onTogglePause}
          >
            {isPaused ? <Play size={18} weight="bold" /> : <Pause size={18} weight="bold" />}
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Next project highlight"
            title="Next project highlight"
            onClick={() => onStep(1)}
          >
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      </div>

      <div className="highlight-progress" aria-hidden="true">
        <span key={project.id} className={isPaused ? "paused" : ""} />
      </div>

      <div className="highlight-layout">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="highlight-copy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="highlight-title" type="button" onClick={() => onSelect(currentIndex)}>
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
              <strong>{project.repo}</strong>
              <ArrowSquareOut size={16} weight="bold" />
            </button>
            <p>{narrative}</p>
            <dl className="highlight-stats">
              <div>
                <dt>Porting</dt>
                <dd>{project.portingScore}</dd>
              </div>
              <div>
                <dt>Latest rank</dt>
                <dd>{project.latestRank ?? "n/a"}</dd>
              </div>
              <div>
                <dt>Read fit</dt>
                <dd>{estimatedSeconds}s</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>

        <div className="highlight-selector" aria-label="Choose project highlight">
          {projects.map((item, index) => (
            <button
              key={item.id}
              className={index === currentIndex ? "active" : ""}
              type="button"
              onClick={() => onSelect(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.repo}</b>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DistributionBars({
  title,
  points,
  limit = 7,
  selectedKey = "all",
  onSelect
}: {
  title: string;
  points: DistributionPoint[];
  limit?: number;
  selectedKey?: string;
  onSelect?: (key: string) => void;
}) {
  const max = Math.max(...points.map((point) => point.count), 1);
  return (
    <section className="panel distribution-panel">
      <div className="panel-heading">
        <h2>{title}</h2>
      </div>
      <div className="bar-list">
        {points.slice(0, limit).map((point) => (
          <button
            className={`bar-row ${selectedKey === point.key ? "active" : ""}`}
            key={point.key}
            type="button"
            onClick={() => onSelect?.(point.key)}
          >
            <span>{point.key}</span>
            <div className="bar-track">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: point.count / max }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <b>{point.count}</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function TimelineStrip({
  selectedDate,
  onSelectDate
}: {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  const points = data.timeline.slice(-22);
  const max = Math.max(...points.map((point) => point.codex_weekly + point.webgpt_daily), 1);
  const width = 640;
  const height = 130;
  const step = points.length > 1 ? width / (points.length - 1) : width;
  const path = points
    .map((point, index) => {
      const value = point.codex_weekly + point.webgpt_daily;
      const x = index * step;
      const y = height - (value / max) * 104 - 14;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <section className="panel timeline-panel">
      <div className="panel-heading">
        <div>
          <h2>Digest Velocity</h2>
          <p>Recent project mentions across both streams.</p>
        </div>
        <span className="source-pill">{points.length} dates</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Recent digest project volume">
        <defs>
          <linearGradient id="lineGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#7cffb2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7cffb2" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${width} ${height} L 0 ${height} Z`} fill="rgba(124, 255, 178, 0.07)" />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGlow)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {points.map((point, index) => {
          const value = point.codex_weekly + point.webgpt_daily;
          const x = index * step;
          const y = height - (value / max) * 104 - 14;
          return (
            <circle
              key={point.date}
              className={selectedDate === point.date ? "active" : ""}
              cx={x}
              cy={y}
              r="6"
              fill="#7cffb2"
              opacity={selectedDate === point.date ? 1 : 0.85}
              role="button"
              tabIndex={0}
              aria-label={`Filter projects seen on ${formatDate(point.date)}`}
              onClick={() => onSelectDate(point.date)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onSelectDate(point.date);
              }}
            />
          );
        })}
      </svg>
    </section>
  );
}

function SignalRadar({ project }: { project: ProjectRecord }) {
  const axes: Array<[string, number]> = [
    ["Streams", Math.min(project.streams.length / 2, 1)],
    ["Porting", Math.min(project.portingScore / 220, 1)],
    ["Evidence", project.representativeFiles.length ? 0.92 : project.contentSummary ? 0.62 : 0.28],
    ["Platforms", Math.min(project.platforms.length / 6, 1)],
    ["History", Math.min(project.featureCount / 5, 1)]
  ];
  const radius = 74;
  const center = 86;
  const points = axes
    .map(([, value], index) => {
      const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
      const r = radius * value;
      return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
    })
    .join(" ");

  return (
    <div className="radar-card">
      <svg viewBox="0 0 172 172" role="img" aria-label={`Porting radar for ${project.repo}`}>
        {[0.33, 0.66, 1].map((scale) => (
          <polygon
            key={scale}
            points={axes
            .map((_, index) => {
                const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
                const r = radius * scale;
                return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(243, 241, 232, 0.12)"
          />
        ))}
        <motion.polygon
          points={points}
          fill="rgba(124, 255, 178, 0.18)"
          stroke="#7cffb2"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.88, transformOrigin: "center" }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        />
      </svg>
      <div className="radar-labels">
        {axes.map(([label, value]) => (
          <span key={label}>
            {label} <b>{Math.round(value * 100)}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function DetailPanel({
  project,
  onSurfaceSelect,
  onTextSearch
}: {
  project: ProjectRecord;
  onSurfaceSelect: (surface: string) => void;
  onTextSearch: (value: string) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={project.id}
        className="panel detail-panel"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="detail-topline">
          <span>{streamText(project.streams)}</span>
          <strong>{project.repeatState}</strong>
        </div>
        <h2>{project.repo}</h2>
        <p className="detail-summary">
          {firstSentence(project.portabilitySummary || project.whySelected || project.contentSummary || project.notes)}
        </p>
        <SignalRadar project={project} />
        <dl className="detail-grid">
          <div>
            <dt>Porting score</dt>
            <dd>{project.portingScore}</dd>
          </div>
          <div>
            <dt>Latest rank</dt>
            <dd>{project.latestRank ?? "n/a"}</dd>
          </div>
          <div>
            <dt>Feature count</dt>
            <dd>{project.featureCount || "n/a"}</dd>
          </div>
          <div>
            <dt>Repeat eligible</dt>
            <dd>{formatDate(project.repeatEligibleAfter)}</dd>
          </div>
        </dl>
        <div className="tag-cloud">
          {[...project.platforms, ...project.tags].slice(0, 12).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => (project.platforms.includes(tag) ? onSurfaceSelect(tag) : onTextSearch(tag))}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="detail-section">
          <h3>Implementation Evidence</h3>
          {project.representativeFiles.length ? (
            <ul className="file-list">
              {project.representativeFiles.slice(0, 5).map((file) => (
                <li key={file}>
                  <button type="button" onClick={() => onTextSearch(file)}>
                    {file}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="quiet">No representative source files recorded in the current state.</p>
          )}
        </div>
        <div className="detail-section">
          <h3>Source Ledger</h3>
          <ul className="source-list">
            {project.sourceFiles.slice(0, 6).map((file) => (
              <li key={file}>
                <button type="button" onClick={() => onTextSearch(file)}>
                  {file}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {project.url && (
          <a className="repo-link" href={project.url} target="_blank" rel="noreferrer">
            <GithubLogo size={18} weight="bold" />
            Open repository
            <ArrowSquareOut size={16} weight="bold" />
          </a>
        )}
      </motion.aside>
    </AnimatePresence>
  );
}

function ProjectTable({
  projects,
  selectedId,
  onSelect,
  onLaneSelect,
  onRepeatSelect,
  onSurfaceSelect
}: {
  projects: ProjectRecord[];
  selectedId: string;
  onSelect: (project: ProjectRecord) => void;
  onLaneSelect: (lane: string) => void;
  onRepeatSelect: (repeat: string) => void;
  onSurfaceSelect: (surface: string) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "portingScore", desc: true }]);
  const columns = useMemo(
    () => [
      columnHelper.accessor("repo", {
        header: "Repository",
        cell: (info) => {
          const project = info.row.original;
          return (
            <div className="repo-cell">
              <strong>{project.repo}</strong>
              <span>{streamText(project.streams)}</span>
            </div>
          );
        }
      }),
      columnHelper.accessor("portingScore", {
        header: "Score",
        cell: (info) => <span className="score-cell">{info.getValue()}</span>
      }),
      columnHelper.accessor("lane", {
        header: "Lane",
        cell: (info) => {
          const lane = info.getValue() || info.row.original.contentValue || "unclassified";
          return (
            <button
              className="chip"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onLaneSelect(lane);
              }}
            >
              {lane}
            </button>
          );
        }
      }),
      columnHelper.accessor("platforms", {
        header: "Porting Surface",
        enableSorting: false,
        cell: (info) => (
          <div className="inline-tags">
            {info
              .getValue()
              .slice(0, 4)
              .map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSurfaceSelect(platform);
                  }}
                >
                  {platform}
                </button>
              ))}
          </div>
        )
      }),
      columnHelper.accessor("lastPublished", {
        header: "Last Seen",
        cell: (info) => formatDate(info.getValue())
      }),
      columnHelper.accessor("repeatState", {
        header: "Repeat",
        cell: (info) => (
          <button
            className={`state-chip ${info.getValue()}`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRepeatSelect(info.getValue());
            }}
          >
            {info.getValue()}
          </button>
        )
      })
    ],
    [onLaneSelect, onRepeatSelect, onSurfaceSelect]
  );

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <h2>Project Atlas</h2>
          <p>{numberFormat.format(projects.length)} merged records from both streams.</p>
        </div>
        <span className="source-pill">TanStack Table</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <button
                      type="button"
                      disabled={!header.column.getCanSort()}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : ""}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const project = row.original;
              return (
                <tr
                  key={project.id}
                  className={project.id === selectedId ? "selected" : ""}
                  onClick={() => onSelect(project)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {!projects.length && (
          <div className="empty-state">
            <Stack size={28} weight="duotone" />
            <strong>No matching projects</strong>
            <span>Relax one filter or clear the search query.</span>
          </div>
        )}
      </div>
    </section>
  );
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
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function App() {
  const allProjects = data.projects;
  const [search, setSearch] = useState("");
  const [stream, setStream] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [repeat, setRepeat] = useState("all");
  const [lane, setLane] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [crossOnly, setCrossOnly] = useState(false);
  const highlightProjects = useMemo(() => data.topPorting.slice(0, HIGHLIGHT_PROJECT_LIMIT), []);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isHighlightPaused, setIsHighlightPaused] = useState(false);
  const [selectedId, setSelectedId] = useState(highlightProjects[0]?.id ?? allProjects[0]?.id ?? "");

  const platforms = useMemo(() => data.platformDistribution.map((point) => point.key).filter((item) => item !== "unclassified"), []);

  const selectFirstProject = useCallback(
    (predicate: (project: ProjectRecord) => boolean) => {
      const project = allProjects.find(predicate);
      if (project) setSelectedId(project.id);
    },
    [allProjects]
  );

  const clearFilters = useCallback(() => {
    setSearch("");
    setStream("all");
    setPlatform("all");
    setRepeat("all");
    setLane("all");
    setDateFilter("all");
    setCrossOnly(false);
    if (allProjects[0]) setSelectedId(allProjects[0].id);
  }, [allProjects]);

  const resetFacetFilters = useCallback(() => {
    setSearch("");
    setStream("all");
    setPlatform("all");
    setRepeat("all");
    setLane("all");
    setDateFilter("all");
    setCrossOnly(false);
  }, []);

  const applyTextSearch = useCallback((value: string) => {
    setSearch(value);
    setPlatform("all");
    setLane("all");
    setDateFilter("all");
    setCrossOnly(false);
    selectFirstProject((project) => projectSearchText(project).includes(value.toLowerCase()));
  }, [selectFirstProject]);

  const applySurface = useCallback((surface: string) => {
    const next = platform === surface ? "all" : surface;
    setSearch("");
    setPlatform(next);
    setLane("all");
    setDateFilter("all");
    setCrossOnly(false);
    if (next !== "all") selectFirstProject((project) => project.platforms.includes(next));
  }, [platform, selectFirstProject]);

  const applyLane = useCallback((nextLane: string) => {
    const next = lane === nextLane ? "all" : nextLane;
    setSearch("");
    setLane(next);
    setDateFilter("all");
    setCrossOnly(false);
    if (next !== "all") selectFirstProject((project) => project.lane === next || project.contentValue === next);
  }, [lane, selectFirstProject]);

  const applyRepeat = useCallback((nextRepeat: string) => {
    const next = repeat === nextRepeat ? "all" : nextRepeat;
    setSearch("");
    setRepeat(next);
    setDateFilter("all");
    setCrossOnly(false);
    if (next !== "all") selectFirstProject((project) => project.repeatState === next);
  }, [repeat, selectFirstProject]);

  const applyStream = useCallback((nextStream: string) => {
    setStream(nextStream);
    setDateFilter("all");
    setCrossOnly(false);
    if (nextStream === "all") {
      if (allProjects[0]) setSelectedId(allProjects[0].id);
    } else {
      selectFirstProject((project) => project.streams.includes(nextStream as StreamKey));
    }
  }, [allProjects, selectFirstProject]);

  const applyMetricFilter = useCallback(
    (filter: "all" | "blocked" | "soft" | "cross" | "eligible") => {
      resetFacetFilters();
      if (filter === "blocked" || filter === "soft" || filter === "eligible") setRepeat(filter);
      if (filter === "cross") setCrossOnly(true);
      if (filter === "all" && allProjects[0]) setSelectedId(allProjects[0].id);
      if (filter === "blocked" || filter === "soft" || filter === "eligible") {
        selectFirstProject((project) => project.repeatState === filter);
      }
      if (filter === "cross") selectFirstProject((project) => project.streams.length > 1);
    },
    [allProjects, resetFacetFilters, selectFirstProject]
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allProjects.filter((project) => {
      if (stream !== "all" && !project.streams.includes(stream as StreamKey)) return false;
      if (platform !== "all" && !project.platforms.includes(platform)) return false;
      if (repeat !== "all" && project.repeatState !== repeat) return false;
      if (lane !== "all" && project.lane !== lane && project.contentValue !== lane) return false;
      if (dateFilter !== "all" && project.lastPublished !== dateFilter && !project.digestDates.includes(dateFilter)) return false;
      if (crossOnly && project.streams.length < 2) return false;
      if (!query) return true;
      return projectSearchText(project).includes(query);
    });
  }, [allProjects, crossOnly, dateFilter, lane, platform, repeat, search, stream]);

  const selectedProject = allProjects.find((project) => project.id === selectedId) ?? filteredProjects[0] ?? allProjects[0];

  const selectHighlight = useCallback(
    (nextIndex: number) => {
      if (!highlightProjects.length) return;
      const normalizedIndex = (nextIndex + highlightProjects.length) % highlightProjects.length;
      const nextProject = highlightProjects[normalizedIndex];
      setHighlightIndex(normalizedIndex);
      setSelectedId(nextProject.id);
    },
    [highlightProjects]
  );

  const stepHighlight = useCallback(
    (direction: -1 | 1) => {
      selectHighlight(highlightIndex + direction);
    },
    [highlightIndex, selectHighlight]
  );

  useEffect(() => {
    if (!selectedId && selectedProject) setSelectedId(selectedProject.id);
  }, [selectedId, selectedProject]);

  useEffect(() => {
    if (isHighlightPaused || highlightProjects.length <= 1) return;
    const timer = window.setTimeout(() => selectHighlight(highlightIndex + 1), HIGHLIGHT_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [highlightIndex, highlightProjects.length, isHighlightPaused, selectHighlight]);

  return (
    <div className="app-shell">
      <AppSignalField />
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark">
            <Pulse size={24} weight="fill" />
          </span>
          <div>
            <h1>Embedded Audio Mine</h1>
            <p>Porting Radar</p>
          </div>
        </div>
        <div className="freshness-strip">
          <Radio size={18} weight="bold" />
          <span>Codex {formatDate(data.metrics.latestCodexDate)}</span>
          <span>WebGPT {formatDate(data.metrics.latestWebgptDate)}</span>
        </div>
      </header>

      <main className="dashboard-grid">
        <aside className="left-rail">
          <section className="panel stream-panel">
            <h2>Streams</h2>
            <button className={stream === "all" ? "active" : ""} onClick={() => applyStream("all")} type="button">
              <Database size={18} /> All projects <b>{data.metrics.totalProjects}</b>
            </button>
            <button
              className={stream === "webgpt_daily" ? "active" : ""}
              onClick={() => applyStream("webgpt_daily")}
              type="button"
            >
              <Heartbeat size={18} /> WebGPT Daily <b>{data.metrics.webgptProjects}</b>
            </button>
            <button
              className={stream === "codex_weekly" ? "active" : ""}
              onClick={() => applyStream("codex_weekly")}
              type="button"
            >
              <GithubLogo size={18} /> Codex Weekly <b>{data.metrics.codexProjects}</b>
            </button>
          </section>

          <DistributionBars
            title="Porting Surfaces"
            points={data.platformDistribution}
            limit={8}
            selectedKey={platform}
            onSelect={applySurface}
          />
          <section className="panel source-panel">
            <div className="panel-heading">
              <h2>Source Readback</h2>
            </div>
            <dl>
              <button type="button" onClick={clearFilters}>
                <span>Published CSV rows</span>
                <b>{formatNumber(data.sourceSummary.publishedRows)}</b>
              </button>
              <button type="button" onClick={() => applyTextSearch("selected")}>
                <span>Selected references</span>
                <b>{formatNumber(data.sourceSummary.selectedRows)}</b>
              </button>
              <button type="button" onClick={() => applyTextSearch("common")}>
                <span>Common index rows</span>
                <b>{formatNumber(data.sourceSummary.commonIndexRows)}</b>
              </button>
              <button type="button" onClick={() => applyStream("codex_weekly")}>
                <span>Codex run files</span>
                <b>{formatNumber(data.sourceSummary.codexRunFiles)}</b>
              </button>
            </dl>
          </section>
        </aside>

        <section className="main-stage">
          <ProjectTable
            projects={filteredProjects}
            selectedId={selectedProject.id}
            onSelect={(project) => setSelectedId(project.id)}
            onLaneSelect={applyLane}
            onRepeatSelect={applyRepeat}
            onSurfaceSelect={applySurface}
          />

          <div className="support-deck">
            <section className="command-bar">
              <div className="search-box">
                <MagnifyingGlass size={18} weight="bold" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search repos, platforms, firmware notes, source evidence"
                />
              </div>
              <FilterSelect
                label="Platform"
                value={platform}
                options={platforms}
                onChange={(value) => {
                  setPlatform(value);
                  setDateFilter("all");
                  setCrossOnly(false);
                }}
              />
              <FilterSelect
                label="Repeat"
                value={repeat}
                options={["blocked", "eligible", "soft", "unknown"]}
                onChange={(value) => {
                  setRepeat(value);
                  setDateFilter("all");
                  setCrossOnly(false);
                }}
              />
              <button className="clear-button" type="button" onClick={clearFilters}>
                <Funnel size={17} weight="bold" />
                Clear
              </button>
            </section>

            <motion.section
              className="metrics-grid"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } }
              }}
            >
              {[
                {
                  icon: <Database size={22} weight="duotone" />,
                  label: "Merged Projects",
                  value: formatNumber(data.metrics.totalProjects),
                  detail: "daily and weekly evidence",
                  active: !search && stream === "all" && platform === "all" && repeat === "all" && lane === "all" && dateFilter === "all" && !crossOnly,
                  onClick: () => applyMetricFilter("all")
                },
                {
                  icon: <WarningCircle size={22} weight="duotone" />,
                  label: "Hard Blocks",
                  value: formatNumber(data.metrics.hardBlocks),
                  detail: "repeat window active",
                  tone: "hot" as const,
                  active: repeat === "blocked",
                  onClick: () => applyMetricFilter("blocked")
                },
                {
                  icon: <Stack size={22} weight="duotone" />,
                  label: "Soft References",
                  value: formatNumber(data.metrics.softReferences + data.metrics.selectedReferences),
                  detail: "watch and related infra",
                  active: repeat === "soft",
                  onClick: () => applyMetricFilter("soft")
                },
                {
                  icon: <ChartLine size={22} weight="duotone" />,
                  label: "Cross Stream",
                  value: formatNumber(data.metrics.crossStreamProjects),
                  detail: "seen by both lanes",
                  tone: "cool" as const,
                  active: crossOnly,
                  onClick: () => applyMetricFilter("cross")
                },
                {
                  icon: <Cpu size={22} weight="duotone" />,
                  label: "Repeat Eligible",
                  value: formatNumber(data.metrics.repeatEligible),
                  detail: "safe to revisit",
                  active: repeat === "eligible",
                  onClick: () => applyMetricFilter("eligible")
                }
              ].map((metric) => (
                <motion.div key={metric.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                  <MetricTile {...metric} />
                </motion.div>
              ))}
            </motion.section>

            <ProjectHighlightWindow
              projects={highlightProjects}
              currentIndex={highlightIndex}
              isPaused={isHighlightPaused}
              onStep={stepHighlight}
              onSelect={selectHighlight}
              onTogglePause={() => setIsHighlightPaused((paused) => !paused)}
            />

            <div className="insight-grid">
              <TimelineStrip
                selectedDate={dateFilter}
                onSelectDate={(date) => {
                  const next = dateFilter === date ? "all" : date;
                  setSearch("");
                  setDateFilter(next);
                  setCrossOnly(false);
                  if (next !== "all") {
                    selectFirstProject((project) => project.lastPublished === next || project.digestDates.includes(next));
                  }
                }}
              />
              <DistributionBars title="Lane Mix" points={data.laneDistribution} limit={6} selectedKey={lane} onSelect={applyLane} />
            </div>
          </div>
        </section>

        <DetailPanel project={selectedProject} onSurfaceSelect={applySurface} onTextSearch={applyTextSearch} />
      </main>
    </div>
  );
}
