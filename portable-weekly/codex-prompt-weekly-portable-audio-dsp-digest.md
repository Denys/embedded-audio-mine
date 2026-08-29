# Weekly Portable Audio DSP GitHub Digest

## Goal

Produce a ranked, deduplicated markdown digest of the 10 most promising GitHub repositories containing computer-first synths, effects, or reusable audio DSP building blocks that are realistically portable to Daisy Seed or Teensy 4 class firmware, then update the local state files in this folder.

## Context

- Current working directory is this digest project folder.
- Digest markdown files live in the root folder and in `Past_Weeks/`.
- The root folder should hold only the newest two digest markdown files: the current digest and the immediately previous digest.
- `repo_feature_history.json` is the long-term state file for repeat-frequency control.
- `run_state.json` is the run metadata file.
- `latest_results.json` is the latest ranked candidate snapshot.
- `digest_YYYY-MM-DD.json` stores the selected top 10 for the current run.
- `diff_YYYY-MM-DD.json` stores the delta against the previous digest.

## Constraints

- Use GitHub repository search through `curl` and the public REST API.
- Run queries sequentially and sleep 2 seconds between requests.
- Skip forks.
- Favor repositories with actual DSP source code, not just presets, binaries, patch packs, or UI shells.
- Search for computer-native audio software, not only firmware-ready repositories.
- The portability question is not "does it already run on Daisy or Teensy?" The portability question is "does the DSP core have a realistic path into microcontroller firmware without dragging desktop-only assumptions with it?"
- Respect the repeat-frequency rules in `repo_feature_history.json`.

## Portable means

Treat Daisy Seed and Teensy 4.x as the baseline targets:

- Cortex-M7 class MCUs with single-precision FPU and tight real-time budgets
- practical targets are mono or stereo algorithms at 44.1 kHz or 48 kHz
- typical audio block sizes are small and latency-sensitive
- SRAM is limited; external SDRAM or PSRAM may exist but should not be assumed
- no desktop OS, no plugin host, no GUI toolkit, no GPU, no swap, no background daemon model

Classify portability this way:

- `Direct`: a portable DSP core is already visible and the repo mostly needs hardware I/O, parameter plumbing, and light memory cleanup.
- `Refactor`: the DSP looks portable, but host wrappers, allocation patterns, or dependency entanglement need moderate extraction work.
- `Stretch`: the algorithm is interesting but would likely require significant simplification, external memory, or major restructuring. Use this only if the value is unusually high.

Do not feature repositories when the evidence says they are effectively non-portable because they rely on one or more of these:

- plugin-host, DAW, or GUI frameworks in the DSP hot path
- heavy dynamic allocation, locks, or worker threads tied to audio processing
- mandatory filesystem streaming, networking, or operating-system services
- x86-only SIMD, GPU compute, or other desktop-specific acceleration
- large neural models, long convolution engines, or spectral workloads with no credible MCU-sized path

## Added value means

A repo is worth featuring only when it offers at least one strong value signal:

- a synth or effect algorithm that is not already trivial to get from DaisySP or Teensy Audio
- a notably strong implementation of a familiar building block such as filters, oscillators, envelopes, delay structures, modulation, nonlinear processing, or physical modeling
- a clean separation between DSP core and host code that makes it a good extraction target
- unusually clear educational or reference value for firmware DSP work
- a permissive license that makes porting materially easier

If a repo is merely portable but adds little beyond stock embedded libraries, rank it lower or drop it.

## Done When

- The current run digest markdown file exists in the root folder.
- The root folder contains only the newest two digest markdown files.
- Older digest markdown files have been moved into `Past_Weeks/`.
- `digest_YYYY-MM-DD.json`, `latest_results.json`, `diff_YYYY-MM-DD.json`, `repo_feature_history.json`, and `run_state.json` are updated.
- Every featured repo has a portability class, added-value note, and concrete porting angle.

---

## Step 1 - Discover local state

1. Determine `today` in local time and format it as `YYYY-MM-DD`.
2. Find every digest markdown file matching `????-??-?? - Weekly Portable Audio DSP GitHub Digest.md` in:
   - the root folder
   - `Past_Weeks/`
3. Sort those digest files by date ascending.
4. Identify the most recent digest dated before `today`. That is the previous digest.
5. Load:
   - `repo_feature_history.json` if it exists
   - `run_state.json` if it exists
   - the previous digest markdown file if one exists
6. If `repo_feature_history.json` is missing or malformed, bootstrap it from the existing digest markdown files by parsing the Top 10 table entries from each digest.

## Step 2 - Normalize digest placement

Before or after writing the new digest, ensure the root folder contains only the newest two digest markdown files.

- The root folder should end with:
  - the current digest markdown file
  - the immediately previous digest markdown file
- Every older digest markdown file must be moved into `Past_Weeks/`.
- Do not move JSON state files.

## Step 3 - Fetch GitHub data

Use this exact request pattern:

```bash
curl -s "https://api.github.com/search/repositories?q=QUERY&sort=updated&order=desc&per_page=20" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28"
```

Run the queries below sequentially with a 2-second sleep between requests.

| Query | Topic label |
|---|---|
| `juce+synth` | JUCE synth |
| `juce+audio+effect` | JUCE effect |
| `vst3+synth+c%2B%2B` | VST3 synth |
| `vst3+audio+effect+c%2B%2B` | VST3 effect |
| `audio+dsp+library+c%2B%2B` | DSP library |
| `virtual+analog+synth+c%2B%2B` | Virtual analog |
| `wavetable+synth+c%2B%2B` | Wavetable synth |
| `fm+synth+audio+c%2B%2B` | FM synth |
| `granular+synth+c%2B%2B` | Granular |
| `physical+modeling+synth+c%2B%2B` | Physical modeling |
| `filter+audio+dsp+c%2B%2B` | Filters |
| `oscillator+envelope+lfo+audio+c%2B%2B` | Core building blocks |
| `delay+reverb+chorus+audio+c%2B%2B` | Time-domain effects |
| `waveshaper+distortion+audio+c%2B%2B` | Nonlinear effects |
| `faust+synth` | Faust synth |
| `faust+effect` | Faust effect |
| `daisy+audio+dsp` | Daisy reference |
| `teensy+audio+dsp` | Teensy reference |

For each repository item:

- Skip if `fork == true`.
- Extract:
  - `full_name`
  - `html_url`
  - `stargazers_count`
  - `forks_count`
  - `pushed_at` truncated to `YYYY-MM-DD`
  - `description`
  - query topic label

## Step 4 - Shortlist for evidence gathering

1. Deduplicate by `full_name`, keeping the highest-signal match.
2. Drop obvious non-fits:
   - preset packs, sample packs, or patch collections
   - binary-only releases
   - generic DAW utilities with no DSP source
   - datasets, papers, lecture notes, or course repos without reusable code
3. Keep a working shortlist of roughly 20 strongest candidates.
4. For each shortlist candidate, gather more evidence by fetching:
   - repo metadata from `https://api.github.com/repos/OWNER/REPO`
   - the default-branch README through raw GitHub content if available
5. Use the README, file layout, and metadata to judge actual portability and added value. Do not rank finalists on search metadata alone.

## Step 5 - Judge actual fit

Keep repositories that are clearly relevant to at least one of these buckets:

- computer-first synth engines or effects whose DSP core could live in firmware
- reusable building blocks for oscillators, filters, envelopes, modulation, nonlinear processing, delay, or physical modeling
- DSP libraries or reference implementations that can seed Daisy or Teensy ports
- Faust projects whose generated or generator-side DSP is realistically extractable to MCU firmware

Drop repositories that are clearly not a fit, including:

- repos where the interesting part is mostly GUI, DAW integration, or plugin-host infrastructure
- repos whose README or file tree suggests the DSP core is inseparable from JUCE, VST, AU, iPlug, Electron, or similar host layers
- repos whose algorithmic footprint looks unrealistic for MCU firmware without drastic simplification
- abandoned demos with little code or no real reuse value

## Step 6 - Score portability and value

For each remaining repository, compute:

```text
days_since_push = (today - pushed_at).days
recency_bonus = 40 if days_since_push <= 7 else 20 if days_since_push <= 30 else 0
language_bonus = 20 if the usable DSP core is mainly C, C++, Faust, or embedded-friendly Rust else 5 if the core is portable in principle else 0
separation_bonus = 30 if the DSP core is already well separated from host or UI code else 10 if extraction looks realistic else -20
realtime_bonus = 20 if the design appears friendly to fixed-size blocks, low allocation, and MCU real-time constraints else 0
license_bonus = 15 for MIT, BSD, ISC, Apache, Zlib, or similarly permissive licenses; 5 for LGPL or MPL; 0 for unknown; -20 for restrictive or noncommercial licensing
value_bonus = 25 if it adds a distinctive algorithm or high-quality building block beyond stock DaisySP or Teensy primitives else 10 if it is mostly educational but still reusable else 0
desktop_penalty = -40 if desktop-only dependencies remain in the DSP path
resource_penalty = -35 if RAM, flash, FFT, convolution, or model-size demands look unrealistic for Daisy Seed or Teensy 4.x without major simplification
score = stars * 2 + forks * 3 + recency_bonus + language_bonus + separation_bonus + realtime_bonus + license_bonus + value_bonus + desktop_penalty + resource_penalty
```

Also assign:

- `portability_class`: `Direct`, `Refactor`, or `Stretch`
- `portability_reason`: one sentence naming the main evidence
- `value_reason`: one sentence explaining why the port would be useful

Drop repositories when:

- `portability_class` would be worse than `Stretch`
- the main value claim is weak or redundant
- licensing makes real reuse unattractive

## Step 7 - Apply rotation rules

Load the previous digest date and the prior featured repos if a previous digest exists.

Apply these rules in order:

1. If a repo is permanently excluded, remove it.
2. If a repo was in the immediately previous digest and `pushed_at` is not newer than the previous digest date, exclude it from the Top 10 and track it for the Previously Featured table as `No change`.
3. If a repo has fewer than 3 lifetime digest appearances in `repo_feature_history.json` and it was featured within the last 30 days, exclude it even if it has new activity.
4. If a repo has 3 or more lifetime digest appearances, allow it to appear more than once in a rolling 30-day window only when `pushed_at` is newer than its most recent featured date.
5. If a repo survives the rules above and was also in the previous digest with new activity, tag it as `Re-entry: updated`.
6. If a repo is completely new to digest history, tag it as `New`.

If strict filtering leaves fewer than 8 strong candidates, relax only the score floor. Do not relax portability or repeat-frequency rules.

## Step 8 - Build the Previously Featured status table

For each repo from the previous digest Top 10:

- Mark `Updated` if its current `pushed_at` is newer than the previous digest date.
- Otherwise mark `No change`.
- If current metadata is unavailable, keep the previous digest date and mark `No fresh data`.

## Step 9 - Write the markdown digest

Write:

```text
YYYY-MM-DD - Weekly Portable Audio DSP GitHub Digest.md
```

Use this structure:

```markdown
# YYYY-MM-DD - Weekly Portable Audio DSP GitHub Digest

> Scope: computer-first synths, effects, DSP libraries, and building blocks with realistic Daisy Seed or Teensy 4.x portability
> Ranking: stars x 2 + forks x 3 + recency + portability + value - desktop penalties
> Portability: Direct = mostly ready, Refactor = extractable, Stretch = high-value but costly
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Portability | Note |
|---|------|-------|-----------|-------|-------------|------|
| 1 | [owner/repo](url) | N | YYYY-MM-DD | topic | Direct | NEW - concise reason |

---

## Highlights & Port Ideas

**1. [owner/repo](url)** Stars N - pushed YYYY-MM-DD - Portability Direct
> One sentence description.

Why it ports: One concrete sentence grounded in the repo structure or README.

Added value: One concrete sentence explaining the MCU payoff.

Port idea: One concrete port direction for Daisy Seed, Teensy 4.1, STM32H7, or i.MX RT firmware.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [owner/repo](url) | YYYY-MM-DD | Updated |
| [NO CHANGE] [owner/repo](url) | YYYY-MM-DD | No change |

---

*Generated: DD Month YYYY - GitHub REST API - N/18 queries successful - ~N unique non-fork repos evaluated*
```

Keep the prose concise. Avoid filler. Make the portability and value claims concrete and falsifiable.

## Step 10 - Update JSON outputs

1. Write `digest_YYYY-MM-DD.json` with the selected Top 10 repos and their scores.
2. Overwrite `latest_results.json` with the same selected Top 10 payload.
3. Write `diff_YYYY-MM-DD.json` with:
   - `date`
   - `added`
   - `removed`
   - `changed`
4. Update `run_state.json` with:
   - `last_run_utc`
   - `run_count`
   - `latest_digest_date`
   - `latest_digest_file`
   - `previous_digest_file`
   - `history_seeded_from_markdown`
   - `project_rules_version`
5. Update `repo_feature_history.json` by appending the current digest date and rank for each featured repo, then refreshing:
   - `feature_count`
   - `last_featured`
   - `appearance_dates`
   - `ranks`

## Step 11 - Final checks

- Confirm the root folder now holds only the newest two digest markdown files.
- Confirm older digest markdown files are in `Past_Weeks/`.
- Confirm the Top 10 list contains no forks and no obviously desktop-only picks.
- Confirm the 30-day repeat rule was applied to repos with fewer than 3 prior appearances.
- Confirm every featured repo has a portability class and a real added-value claim.
- Confirm the markdown digest and all JSON state files were written successfully.

## Step 12 - Publish to GitHub

After the local checks pass, publish the portable lane to the default branch of
`Denys/embedded-audio-mine` under `portable-weekly/`:

- copy every portable digest Markdown snapshot into `portable-weekly/digests/`;
- copy `repo_feature_history.json`, `latest_results.json`, and `run_state.json`
  into `portable-weekly/data/`;
- copy each `digest_YYYY-MM-DD.json` and `diff_YYYY-MM-DD.json` into
  `portable-weekly/data/runs/`;
- keep this runbook at `portable-weekly/codex-prompt-weekly-portable-audio-dsp-digest.md`;
- commit and push the complete update, preferably as one atomic commit;
- fetch the remote digest and `run_state.json` after publication and verify that
  their date and content match the local run.

Do not report the run as successful when only the local artifacts exist. If Git
credentials are unavailable, use the authenticated GitHub connector. If neither
publication route works, report the exact blocker and mark the run incomplete.

## Error handling

- If GitHub returns `API rate limit exceeded`, wait 60 seconds and retry once for that query.
- If a state file is missing or malformed, repair it from the local digest markdown history where possible.
- If previous digest metadata cannot be reconstructed, continue and note the limitation in the footer.
