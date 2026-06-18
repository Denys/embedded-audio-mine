export type StreamKey = "webgpt_daily" | "codex_weekly";

export type RepeatState = "blocked" | "eligible" | "soft" | "unknown";

export interface ProjectRecord {
  id: string;
  repo: string;
  url: string;
  streams: StreamKey[];
  sourceFiles: string[];
  recordTypes: string[];
  lane: string;
  status: string;
  selectedStatus: string;
  origin: string;
  platforms: string[];
  tags: string[];
  firstSeen: string;
  lastPublished: string;
  repeatEligibleAfter: string;
  repeatState: RepeatState;
  antiRepeatScope: string;
  notes: string;
  whySelected: string;
  similarityAnchorNotes: string;
  featureCount: number;
  latestRank: number | null;
  rankHistory: Record<string, number>;
  digestDates: string[];
  stars: number | null;
  forks: number | null;
  pushedAt: string;
  topic: string;
  score: number | null;
  statusTag: string;
  contentValue: string;
  contentSummary: string;
  representativeFiles: string[];
  portabilityValue: string;
  portabilitySummary: string;
  portingScore: number;
}

export interface DistributionPoint {
  key: string;
  count: number;
}

export interface TimelinePoint {
  date: string;
  webgpt_daily: number;
  codex_weekly: number;
}

export interface DashboardMetrics {
  totalProjects: number;
  codexProjects: number;
  webgptProjects: number;
  crossStreamProjects: number;
  hardBlocks: number;
  softReferences: number;
  repeatEligible: number;
  selectedReferences: number;
  latestCodexDate: string;
  latestWebgptDate: string;
  generatedAt: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  projects: ProjectRecord[];
  topPorting: ProjectRecord[];
  laneDistribution: DistributionPoint[];
  platformDistribution: DistributionPoint[];
  streamDistribution: DistributionPoint[];
  timeline: TimelinePoint[];
  sourceSummary: {
    publishedRows: number;
    selectedRows: number;
    commonIndexRows: number;
    codexRunFiles: number;
    markdownRepoMentions: number;
  };
}
