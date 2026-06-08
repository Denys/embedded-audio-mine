# Common Anti-Repeat Policy

This policy coordinates the WebGPT daily stream and the Codex weekly stream without forcing them into one digest format.

## Streams

| Stream | Archive | Canonical state |
|---|---|---|
| WebGPT daily | `digests/YYYY-MM-DD.md` | `data/published-repo-log.csv`, `data/selected-projects.csv` |
| Codex weekly | `codex-weekly/digests/YYYY-MM-DD.md` | `codex-weekly/data/repo_feature_history.json`, `codex-weekly/data/runs/` |
| Shared cross-check | none | `data/common-anti-repeat-index.csv` |

## Hard and soft evidence

Hard anti-repeat evidence means a repo or resource was actually published as a ranked digest item. Hard evidence blocks the same repo or resource for 30 days unless there is a meaningful update.

Hard evidence sources:

- `data/published-repo-log.csv`
- ranked entries in `digests/*.md`
- `codex-weekly/data/repo_feature_history.json`
- ranked entries in `codex-weekly/digests/*.md`
- explicitly recorded fallback publication records when a digest could not be committed

Soft evidence means a project is selected, watched, related infrastructure, or a similarity anchor. Soft evidence does not automatically block publication, but it must be checked before publishing.

Soft evidence sources:

- `data/selected-projects.csv`
- selected-reference rows in `data/common-anti-repeat-index.csv`
- watch or related-infrastructure notes in either stream

## Pre-publication check

Before either stream publishes a ranked item:

1. Search `data/common-anti-repeat-index.csv` for the same repo, renamed repo, project URL, or obvious resource name.
2. Search the other stream's canonical state file.
3. Search the newest digest Markdown files in both streams.
4. If the item has hard evidence inside the last 30 days, hold it unless a meaningful update exists.
5. If the item has soft evidence, decide whether it is a duplicate, related infrastructure, or a useful adjacent project.
6. If publishing despite a related recent item, state the new implementation value in the digest note.

## Meaningful update test

The 30-day block can be overridden only when at least one of these is true:

- new release or tagged firmware asset
- new hardware target or board support
- new DSP algorithm, signal path, or synthesis feature
- major architecture change
- build, flashing, or documentation improvement that changes practical reuse value
- source files now verify claims that were previously unverified

Do not override the block for stars, generic activity, README-only edits, topic changes, or weak similarity language.

## Updating the common index

`data/common-anti-repeat-index.csv` is derived from stream-specific records. It is not the only source of truth.

Refresh it after any of these changes:

- WebGPT daily publishes a digest item.
- WebGPT daily adds or changes a selected-project row.
- Codex weekly publishes a digest item.
- Codex weekly updates `repo_feature_history.json`.

If the common index disagrees with a canonical state file, trust the canonical state file and regenerate the common index.
