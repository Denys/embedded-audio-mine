# Embedded Audio Mine - Porting Radar

Local dashboard for scanning projects from the WebGPT daily and Codex weekly digest streams.

## Run

```bash
npm install
npm run dev
```

The data snapshot is rebuilt before `dev` and `build` from the repository files one level above this folder.

## Data Sources

- `../data/published-repo-log*.csv`
- `../data/selected-projects.csv`
- `../data/common-anti-repeat-index.csv`
- `../digests/*.md`
- `../codex-weekly/data/repo_feature_history.json`
- `../codex-weekly/data/runs/digest_*.json`
- `../codex-weekly/digests/*.md`

The dashboard keeps WebGPT daily and Codex weekly as separate stream evidence while showing merged project records for porting and reuse triage.
