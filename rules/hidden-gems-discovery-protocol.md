# Hidden-Gems Discovery Protocol

This protocol is mandatory for both discovery streams:

- Analog Audio Mine weekly: use the `weekly_deep` profile.
- Embedded Audio Mine daily: use the `daily_broad` profile.

Its purpose is to prevent GitHub anchoring, first-good-enough stopping, and loss of low-SEO sources between runs.

## Persistent source memory

Canonical registry:

`data/hidden-gems-source-registry.csv`

The registry is page-level, not merely domain-level. One row represents one useful landing page, forum section, project index, blog/category page, file archive, manufacturer document hub, application note, or other repeatable discovery surface.

Required fields are defined by the CSV header. Keep descriptions short but discriminating: say what the page contains and why it is useful. Do not confuse discovery value with evidence authority; forums and aggregators may be excellent discovery sources while still requiring primary-artifact verification.

## Mandatory start-of-run gate

Complete this phase before ranking candidates:

1. Inspect the registry, task-specific rules, publication trackers, selected projects, common anti-repeat index, recent digests, and relevant weekly history.
2. Revalidate known dynamic pages that are due:
   - forums, feeds, project hubs, repository-host searches: every 7 days;
   - personal blogs, project/category indexes: every 30 days;
   - static archives, app notes, datasheet hubs: every 90 days, or immediately when linked evidence fails.
3. Update `last_verified`, `status`, `verification_result`, and `notes` for checked rows. Preserve dead, moved, blocked, or degraded pages; do not silently delete history.
4. Discover new low-SEO sources before project selection. Use search, page-link traversal, blogrolls, forum signatures, link/resource pages, citations in schematics/build logs, RSS/feed links, self-hosted downloads, and project-author domains.
5. Add every reusable new source page to the registry during this discovery phase, even when it yields no promotable project in the current run.
6. If repository writes are unavailable, emit exact CSV rows and updates in the final response and state that persistence failed. Never claim the registry was updated unless the write succeeded.

Allowed `status` values:

- `active`
- `degraded`
- `blocked_by_tool`
- `moved`
- `dead`
- `static_archive`
- `unverified`

## Search profiles

### `weekly_deep`

Before stopping, satisfy all of these unless a tool/access failure is documented:

- search at least 12 distinct domains;
- cover at least 6 source classes;
- use at least 4 independent query families;
- make at least 60% of searched domains non-GitHub;
- inspect at least 15 plausible candidates before final ranking;
- continue for at least 2 additional independent search lanes after the first 3–5 publishable candidates appear;
- attempt to add at least 3 reusable source pages to the registry; zero additions are acceptable only with a documented discovery log showing the attempts.

### `daily_broad`

Before stopping, satisfy all of these unless a tool/access failure is documented:

- search at least 7 distinct domains;
- cover at least 4 source classes;
- use at least 3 independent query families;
- make at least 50% of searched domains non-GitHub;
- inspect at least 10 plausible candidates before final ranking;
- continue for at least 1 additional independent search lane after the first 3–5 publishable candidates appear;
- attempt to add at least 1 reusable source page to the registry; zero additions are acceptable only with a documented discovery log.

Source classes include:

- code/repository hosts;
- specialist forums and mailing-list archives;
- personal engineering blogs;
- project hubs and build-log platforms;
- self-hosted downloads and legacy archives;
- manufacturer datasheets, application notes, evaluation boards, and design files;
- university/lab pages;
- vendor/community project pages;
- RSS feeds, blogrolls, and curated link directories.

GitHub may be searched, but it must not dominate the discovery budget. Search GitLab, Codeberg, SourceHut, self-hosted Git, Hackaday.io, forums, personal sites, project download pages, and manufacturer documentation independently rather than only following GitHub links.

## Query diversification

Rotate query families and record them in the run:

- topology and component: OTA-C, ladder, state-variable, expo converter, tempco, BBD clock, PT2399 pin 6, codec front end;
- artifact-led: `filetype:pdf`, `filetype:zip`, KiCad/Eagle/Altium filenames, BOM, Gerber, calibration, test points;
- host-specific: forum sections, personal domains, GitLab/Codeberg/SourceHut, university pages;
- lineage/backlink: references, forks, derivatives, build reports, author pages, blogrolls;
- language/legacy: alternate terminology, spelling variants, translated terms, older static HTML and download directories.

Do not count superficial rewordings of the same search as independent query families.

## Candidate-pool and stopping rule

Do not stop at the first good projects. Maintain a candidate pool with at least:

- candidate name and canonical URL;
- discovery source page;
- source/evidence available;
- anti-repeat state;
- provisional lane;
- promotion blocker.

Only stop when the profile minimums are met and either:

- two consecutive independent search batches produce no new serious candidate; or
- remaining lanes are blocked/inaccessible and the failures are recorded.

Ranking quality still wins: the pool minimum does not require publishing filler.

## Evidence and promotion

Discovery sources are leads, not proof. Before promotion, verify the best available primary artifacts: schematic, editable EDA, BOM, fabrication files, firmware/source, releases/commits, measurements, calibration/build reports, and license text.

Separate:

- documented fact;
- engineering inference;
- unresolved assumption.

Never call source-available hardware open source without explicit license evidence.

## Required discovery audit

Every digest must include:

- profile used;
- domains and source classes searched;
- query families used;
- candidate-pool size;
- new registry rows;
- revalidated rows and status changes;
- blocked/dead/moved pages;
- stop-rule evidence;
- next-run search debt.

The audit can be concise, but it must be specific enough to show that broad research actually occurred.
