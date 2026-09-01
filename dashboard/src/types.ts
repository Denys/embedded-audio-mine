export type StreamKey = "webgpt_daily" | "codex_weekly";
export type DigestStreamKey = StreamKey | "analog_weekly" | "portable_weekly";

export type RepeatState = "blocked" | "eligible" | "soft" | "unknown";
export type ClassificationConfidence = "high" | "medium" | "low";

export interface ProjectRecord {
  id: string;
  repo: string;
  url: string;
  streams: StreamKey[];
  digestStreams: DigestStreamKey[];
  sourceFiles: string[];
  recordTypes: string[];
  lane: string;
  status: string;
  selectedStatus: string;
  origin: string;
  platforms: string[];
  repositoryTypes: string[];
  hardwareEvidence: string[];
  mcuPlatforms: string[];
  languagesFrameworks: string[];
  effects: string[];
  dafxDomains: string[];
  classificationConfidence: ClassificationConfidence;
  classificationGaps: string[];
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
  digestDatesByStream: Record<DigestStreamKey, string[]>;
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
  analog_weekly: number;
  portable_weekly: number;
}

export interface DashboardMetrics {
  totalProjects: number;
  codexProjects: number;
  webgptProjects: number;
  analogProjects: number;
  portableProjects: number;
  crossStreamProjects: number;
  hardBlocks: number;
  softReferences: number;
  repeatEligible: number;
  selectedReferences: number;
  lowConfidenceClassifications: number;
  latestCodexDate: string;
  latestWebgptDate: string;
  latestAnalogDate: string;
  latestPortableDate: string;
  generatedAt: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  projects: ProjectRecord[];
  topPorting: ProjectRecord[];
  laneDistribution: DistributionPoint[];
  platformDistribution: DistributionPoint[];
  repositoryTypeDistribution: DistributionPoint[];
  hardwareEvidenceDistribution: DistributionPoint[];
  mcuPlatformDistribution: DistributionPoint[];
  languageFrameworkDistribution: DistributionPoint[];
  effectDistribution: DistributionPoint[];
  dafxDomainDistribution: DistributionPoint[];
  classificationConfidenceDistribution: DistributionPoint[];
  streamDistribution: DistributionPoint[];
  provenanceDistribution: DistributionPoint[];
  timeline: TimelinePoint[];
  sourceSummary: {
    publishedRows: number;
    selectedRows: number;
    commonIndexRows: number;
    codexRunFiles: number;
    portableRunFiles: number;
    rankedDigestEntries: number;
    analogDigestFiles: number;
    lowConfidenceClassifications: number;
  };
}
