# Weekly Embedded DSP and Audio Hardware GitHub Digest

## Goal

Produce a ranked, deduplicated markdown digest of the 10 most active and promising GitHub repositories in embedded DSP, embedded audio, and audio hardware, then update the local state files in this folder.

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
- Exclude permanent false positives such as `pyannote/pyannote-audio`.
- Do not rely on repository name, GitHub description, topics, or README claims alone. Before a repo can enter the Top 10, inspect its actual repository contents.
- Favor repositories that are clearly relevant to embedded DSP, firmware, eurorack or modular synthesis, standalone audio hardware, pedals, audio PCBs, audio IC based designs, or computer-first synth/effect/audio DSP code with realistic Daisy Seed or Teensy 4 portability.
- Include hardware-first projects when they are clearly about audio hardware or modular or standalone instruments, even if firmware is not the main content.
- Highlight only repositories with concrete implementation value: source code, buildable firmware, DSP/audio algorithms, hardware design files, tests, examples, or usable integration assets.
- Respect the repeat-frequency rules in `repo_feature_history.json`.

## Done When

- The current run digest markdown file exists in the root folder.
- The root folder contains only the newest two digest markdown files.
- Older digest markdown files have been moved into `Past_Weeks/`.
- `digest_YYYY-MM-DD.json`, `latest_results.json`, `diff_YYYY-MM-DD.json`, `repo_feature_history.json`, and `run_state.json` are updated.
- The digest includes the Top 10 table, Highlights and Reuse Ideas, and the Previously Featured status table.
- Every Top 10 repo has content-verification evidence from actual repository files, not just README or search metadata.

---

## Step 1 - Discover local state

1. Determine `today` in local time and format it as `YYYY-MM-DD`.
2. Find every digest markdown file matching `????-??-?? - Weekly Embedded DSP GitHub Digest.md` in:
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
| `teensy+audio` | Teensy audio |
| `daisy+seed+audio` | Daisy Seed |
| `stm32+dsp+audio` | STM32 DSP |
| `esp32+audio+dsp` | ESP32 audio |
| `mutable+instruments+dsp` | Mutable Instruments |
| `eurorack+dsp+microcontroller` | Eurorack DSP |
| `JUCE+audio+effects` | JUCE effects |
| `embedded+neural+audio` | Embedded neural |
| `embedded+machine+learning+audio` | Embedded ML audio |
| `microcontroller+dsp+synth` | MCU synth |
| `JUCE+synthesizer` | Computer-first synth |
| `audio+plugin+dsp` | Computer-first effects |
| `VST+audio+effect` | Computer-first effects |
| `software+synthesizer+dsp` | Computer-first synth |
| `FAUST+audio+dsp` | Computer-first DSP |
| `SSI2130+eurorack` | Audio IC hardware |
| `SSI2131+synth` | Audio IC hardware |
| `SSI2140+eurorack` | Audio IC hardware |
| `SSI2144+filter` | Audio IC hardware |
| `SSI2164+vca` | Audio IC hardware |
| `SSI2190+delay` | Audio IC hardware |

For each repository item:

- Skip if `fork == true`.
- Extract:
  - `full_name`
  - `html_url`
  - `stargazers_count`
  - `forks_count`
  - `pushed_at` truncated to `YYYY-MM-DD`
  - `description`
  - `default_branch`
  - query topic label
- Track whether the repo matched an audio IC query.

## Step 4 - Inspect repository contents and value

Before a repository can enter the Top 10, inspect its actual contents. Do not stop at README text.

For every candidate that could plausibly survive scoring and rotation:

1. Fetch the repository tree for its default branch where available:

```bash
curl -s "https://api.github.com/repos/OWNER/REPO/git/trees/DEFAULT_BRANCH?recursive=1" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28"
```

2. If the tree endpoint fails or is incomplete, use the contents API or repository zipball as a fallback.
3. Inspect the file list and, when necessary, open representative source, firmware, schematic, PCB, build, and test files.
4. Record:
   - source file count
   - hardware design file count
   - build/config files present
   - representative implementation files
   - value grade: `strong`, `medium`, `low`, `none`, or `unverified`
   - one concise content evidence summary
   - portability grade: `high`, `medium`, or `low`
   - one concise Daisy Seed or Teensy 4 portability and added-value judgment

Use these value grades:

- `strong`: buildable firmware/app or hardware repository with multiple real implementation files, audio/DSP paths, hardware design files, or tests.
- `medium`: small but concrete firmware, DSP, hardware, or integration project with usable implementation code.
- `low`: narrow demo or early project with some real audio/DSP/hardware code, but limited reuse value. Include only if fewer than 10 stronger candidates survive.
- `none`: README-only, description-only, default PlatformIO/Arduino scaffold, empty `setup()`/`loop()`, placeholder folders, generated boilerplate with no project-specific audio/DSP/hardware implementation, or claims of FFT/neural/audio hardware without matching source files.
- `unverified`: content could not be inspected. Do not include unless the repo has strong prior digest history and enough local evidence to justify the risk; otherwise exclude.

Examples of exclusion evidence:

- a README claims neural audio, FFT, distributed processing, or hardware support, but the repo only contains a default scaffold
- dependencies mention an audio library, but source code does not instantiate or use audio/DSP objects
- only generated vendor/framework files exist, with no project-specific audio path, DSP algorithm, schematic, PCB, test, or integration code

## Step 5 - Filter for actual fit

Keep repositories that are clearly relevant to at least one of these buckets:

- embedded audio DSP firmware
- microcontroller based synths or effects
- eurorack, modular, pedal, or standalone audio hardware
- audio PCB, KiCad, codec, filter, VCA, oscillator, or delay hardware
- JUCE based effects or tools that are directly reusable for embedded audio workflows
- computer-first synth, effect, plugin, or FAUST DSP projects whose algorithm code can realistically be separated from UI/host code and ported to Daisy Seed or Teensy 4
- embedded ML or neural audio that is realistically adaptable to embedded audio devices

Drop repositories that are clearly not a fit, including:

- speech or diarization frameworks with no embedded audio device angle
- generic datasets
- books, notes, or course materials with no code or hardware build value
- generic desktop audio tooling with no obvious embedded or hardware reuse angle
- repos with `none` or `unverified` content value
- repos where README/description claims are not backed by actual source or hardware files

Permanent exclusions:

- `pyannote/pyannote-audio`

## Step 6 - Score and deduplicate

For each remaining repository, compute:

```text
days_since_push = (today - pushed_at).days
recency_bonus = 50 if days_since_push <= 7 else 20 if days_since_push <= 30 else 0
ic_bonus = 40 if the repo matched an SSI audio IC query or its text mentions one of SSI2130, SSI2131, SSI2140, SSI2144, SSI2164, SSI2190 else 0
hardware_bonus = 20 if the description or repo text clearly suggests audio hardware, eurorack, modular, pcb, board, codec, vca, vcf, oscillator, or delay hardware else 0
score = stars * 2 + forks * 3 + recency_bonus + ic_bonus + hardware_bonus
```

Drop repositories where:

- `stars == 0`
- `forks == 0`
- `days_since_push > 14`
- and there is no audio IC or hardware signal strong enough to justify inclusion

Deduplicate by `full_name` and keep the highest scoring entry.

## Step 7 - Apply rotation rules

Load the previous digest date and the prior featured repos if a previous digest exists.

Apply these rules in order:

1. If a repo is permanently excluded, remove it.
2. If a repo was in the immediately previous digest and `pushed_at` is not newer than the previous digest date, exclude it from the Top 10 and track it for the Previously Featured table as `No change`.
3. If a repo has fewer than 3 lifetime digest appearances in `repo_feature_history.json` and it was featured within the last 30 days, exclude it even if it has new activity.
4. If a repo has 3 or more lifetime digest appearances, allow it to appear more than once in a rolling 30-day window only when `pushed_at` is newer than its most recent featured date.
5. If a repo survives the rules above and was also in the previous digest with new activity, tag it as `Re-entry: updated`.
6. If a repo is completely new to digest history, tag it as `New`.

If strict filtering leaves fewer than 8 strong candidates, relax only the low-score cutoff. Do not relax the permanent exclusion or repeat-frequency rules.

## Step 8 - Build the Previously Featured status table

For each repo from the previous digest Top 10:

- Mark `Updated` if its current `pushed_at` is newer than the previous digest date.
- Otherwise mark `No change`.
- If current metadata is unavailable, keep the previous digest date and mark `No fresh data`.

## Step 9 - Write the markdown digest

Write:

```text
YYYY-MM-DD - Weekly Embedded DSP GitHub Digest.md
```

Use this structure:

```markdown
# YYYY-MM-DD - Weekly Embedded DSP GitHub Digest

> Scope: Teensy audio - Daisy Seed - STM32 DSP - ESP32 audio - Mutable Instruments-inspired - Eurorack DSP - JUCE effects - Embedded ML or neural audio - Audio IC hardware
> Ranking: stars x 2 + forks x 3 + recency bonus + hardware bonuses
> Rotation: previous digest repos need fresh activity; repos with fewer than 3 total digest appearances cannot repeat inside 30 days

---

## Top 10 Repos

| # | Repo | Stars | Last Push | Topic | Note |
|---|------|-------|-----------|-------|------|
| 1 | [owner/repo](url) | N | YYYY-MM-DD | topic | NEW / RE-ENTRY: updated / AUDIO-IC hardware / VALUE: strong |

---

## Highlights & Reuse Ideas

**1. [owner/repo](url)** Stars N - pushed YYYY-MM-DD
> One sentence description.

Content evidence: One concise sentence naming the real source, hardware, test, or integration files that justify inclusion.

Portability judgment: One concise sentence stating whether the added value for Daisy Seed or Teensy 4 is high, medium, or low and why.

Reuse idea: One concrete reuse idea tailored to embedded DSP, Daisy Seed, Teensy 4.1, STM32H7, ESP32-S3, JUCE, eurorack modules, hardware bring-up, audio PCB work, or SSI audio IC based designs.

---

## Previously Featured - Updates This Week

| Repo | Last Push | Status |
|------|-----------|--------|
| [UPDATED] [owner/repo](url) | YYYY-MM-DD | Updated |
| [NO CHANGE] [owner/repo](url) | YYYY-MM-DD | No change |

---

*Generated: DD Month YYYY - GitHub REST API - N/21 queries successful - ~N unique non-fork repos evaluated - content and portability judged before selection*
```

Keep the prose concise. Avoid filler. Make reuse ideas concrete.

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
6. For each selected repo in `digest_YYYY-MM-DD.json` and `latest_results.json`, include:
   - `content_value`
   - `content_summary`
   - `portability_value`
   - `portability_summary`
   - representative content evidence where available

## Step 11 - Final checks

- Confirm the root folder now holds only the newest two digest markdown files.
- Confirm older digest markdown files are in `Past_Weeks/`.
- Confirm the Top 10 list contains no forks and no permanently excluded repos.
- Confirm the 30-day repeat rule was applied to repos with fewer than 3 prior appearances.
- Confirm audio IC hardware repositories were actively considered through the SSI query set.
- Confirm every Top 10 repo has actual content value from repository files.
- Confirm every Top 10 repo has a concrete Daisy Seed or Teensy 4 portability and added-value judgment.
- Confirm no Top 10 repo was selected solely from README, description, dependency list, or topic metadata.
- Confirm the markdown digest and all JSON state files were written successfully.

## Error handling

- If GitHub returns `API rate limit exceeded`, wait 60 seconds and retry once for that query.
- If a state file is missing or malformed, repair it from the local digest markdown history where possible.
- If previous digest metadata cannot be reconstructed, continue and note the limitation in the footer.
