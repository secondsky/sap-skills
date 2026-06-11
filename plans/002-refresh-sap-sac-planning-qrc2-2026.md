# Plan 002: Refresh sap-sac-planning from SAC 2025.25 to QRC2 2026

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 4dd1adc..HEAD -- plugins/sap-sac-planning/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (soft link to plan 001 — see Maintenance notes)
- **Category**: docs (skill content currency)
- **Planned at**: commit `4dd1adc`, 2026-06-11

## Why this matters

SAP Analytics Cloud ships quarterly (QRC releases). This skill is pinned to
SAC 2025.25 and was last verified 2025-12-27 — two QRC releases behind
(QRC1 2026 and QRC2 2026 have shipped). Planning is one of SAC's
fastest-moving areas (AI for Planning & Analytics, seamless planning with
Datasphere, composites). Users currently get guidance and an API-reference
link pinned to a superseded release.

## Current state

Relevant files (under `plugins/sap-sac-planning/skills/sap-sac-planning/`):

- `SKILL.md` — main skill file; stale metadata, "2025.25" labels, "New in 2025" grouping
- `references/` — 24 reference files (planning topics)
- `templates/` — 3 checklist/table templates

Excerpts as of commit `4dd1adc`:

`SKILL.md:6-13` (frontmatter metadata):
```yaml
metadata:
  version: 1.4.0
  last_verified: 2025-12-27
  sac_version: "2025.25"
  documentation_source: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7"
  api_reference: "https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/2025.25/en-US/index.html"
  reference_files: 24
  status: production
```

`SKILL.md:22` (section heading):
```
## Reference Add-Ons (2025.25)
```

`SKILL.md:28` (bullet inside Reference Add-Ons):
```
- **New in 2025**: `references/seamless-planning-datasphere.md`, `references/bpc-live-connection.md`, `references/value-driver-trees.md`, `references/data-action-tracing.md`
```

Repo conventions that apply:

- **CLAUDE.md (repo root) forbids automated refactoring**: no sed/awk/scripted
  rewrites; use Read/Edit/Write manually and review each change.
- `metadata.version` is the per-skill content version (bump minor for content
  additions); plugin.json `version` (2.2.2) is repo-global and managed by
  `./scripts/sync-plugins.sh` — never hand-edit plugin.json.
- Feature claims cite SAP Help / SAP KBA / community URLs.

## Commands you will need

Run all from the repo root.

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Frontmatter validation | `./scripts/validate-frontmatter.sh` | exit 0, "All frontmatter valid" |
| Bundled-resource links | `node scripts/validate-bundled-resources.mjs` | exit 0, "Bundled resource validation passed" |
| Reserved words | `./scripts/validate-reserved-words.sh` | exit 0, "All files passed validation" |
| JSON schemas | `./scripts/validate-json-schemas.sh` | exit 0, "All validations passed" |
| Manifest/marketplace sync | `./scripts/sync-plugins.sh` (preview with `--dry-run` first) | exit 0, "Sync Complete" |
| Count reference files | `ls plugins/sap-sac-planning/skills/sap-sac-planning/references/ \| wc -l` | matches `reference_files` in frontmatter |

## Research sources & access methods

**Critical constraint**: SAP web properties are NOT plain-fetchable.
help.sap.com `/docs` and `/whats-new` pages and sap.com pages are JS-rendered
SPAs (plain fetch returns an empty shell); community.sap.com returns 403 to
plain HTTP clients; SAP KBA pages are JS-rendered and may be login-gated.
**There is no GitHub markdown mirror for SAC documentation** (the SAP-docs
GitHub org has none — verified 2026-06-11). All research for this plan
therefore requires a JS-rendering scraper. In this environment that is the
Firecrawl MCP toolset — e.g.:

```
mcp__mcp-server-firecrawl__firecrawl_scrape
  url: <source URL>
  formats: ["markdown"]
```

and `mcp__mcp-server-firecrawl__firecrawl_search` for discovery. Plain
WebFetch/curl will silently return useless shells — do not use them on SAP
URLs.

| Source | URL | Access |
|--------|-----|--------|
| SAP KBA "Hot Features 2026 QRC2" | https://userapps.support.sap.com/sap/support/knowledge/en/3739836 | firecrawl (may also be login-gated → use the community mirrors below instead) |
| SAC release highlights | https://www.sap.com/products/data-cloud/cloud-analytics/release-highlights.html | firecrawl |
| Community blog "Sneak Peek … Q2 2026" | https://community.sap.com/t5/technology-blog-posts-by-sap/sneak-peek-in-to-sap-analytics-cloud-release-for-q2-2026/ba-p/14384997 | firecrawl (403 to plain HTTP) |
| What's New in SAP Business Data Cloud (SAC section, filter Planning) | https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b | firecrawl |
| Existing skill what's-new files (format exemplars) | `plugins/sap-sac-planning/.../references/`, `plugins/sap-sac-scripting/.../references/whats-new-q4-2025.md` | local |

Also useful: `plugin-dev:skill-development` skill (if available) for SKILL.md
conventions.

## Self-contained knowledge rule

The finished skill is consumed by AI harnesses that **cannot fetch SAP URLs
at usage time** (same JS constraint). Therefore every reference file you
create or edit must inline the actual knowledge: what the feature does, how
to use it, parameters/limits, and an example where the source provides one.
A section body must never be just "see <URL>" — URLs appear only as
end-of-section `Source:` citations. Acceptance test: a reader with no
internet access gets complete guidance from the .md alone.

## Scope

**In scope** (the only files you should modify/create):

- `plugins/sap-sac-planning/skills/sap-sac-planning/SKILL.md`
- `plugins/sap-sac-planning/skills/sap-sac-planning/references/whats-new-2026-planning.md` (create)
- Existing reference files ONLY where a QRC1/QRC2 2026 change contradicts or
  extends them; expected candidates: `references/seamless-planning-datasphere.md`,
  `references/ai-planning-analytics.md`, `references/version-management.md`,
  `references/multi-actions.md`
- `plugins/sap-sac-planning/skills/sap-sac-planning/README.md` (only if it repeats stale version/date)
- Files regenerated by `./scripts/sync-plugins.sh`

**Out of scope** (do NOT touch):

- `agents/`, `commands/`, `hooks/` under `plugins/sap-sac-planning/`
- `templates/` — checklists are version-agnostic
- `plugins/sap-sac-scripting/` (plan 004) and `plugins/sap-datasphere/` (plan 001)
- Rewriting reference files wholesale — additive, dated updates only

## Git workflow

- Branch: `feat/sac-planning-qrc2-2026`
- Commit style: conventional commits, e.g. `feat(sac-planning): refresh to QRC2 2026`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 0: Verify research tooling

Test-scrape one SAP page with the Firecrawl tool (e.g. the SAC release
highlights URL from the sources table) and confirm the result contains real
release content (feature names, version numbers), not an empty shell or a
cookie/JS notice.

**Verify**: scraped markdown contains the string "2026" and at least one
feature heading. If no JS-rendering scrape tool is available in your
environment, STOP — there is no JS-free fallback for SAC documentation.

### Step 1: Research SAC QRC1 + QRC2 2026 planning features

From the sources in "Research sources & access methods", collect planning-relevant
changes in QRC1 2026 and QRC2 2026: data actions / multi actions, version
management, AI for Planning & Analytics, seamless planning with Datasphere,
composites in planning context, calendar/workflow changes. Record for each:
feature, QRC + version number, description, source URL. Also record the exact
**version number of QRC2 2026** (the `2026.NN` wave number stated by the KBA
or release highlights) — several edits below need it; do not guess it.

**Verify**: you have the QRC2 2026 version number from an SAP source, and ≥ 5
dated planning features across the two QRCs, each with a URL.

### Step 2: Create `references/whats-new-2026-planning.md`

New file at `plugins/sap-sac-planning/skills/sap-sac-planning/references/whats-new-2026-planning.md`.
Pattern the structure on an existing reference (H1 title, overview, sections
per QRC, resources section at the end; see `references/data-action-tracing.md`
for tone/format). Contents: the step 1 findings, grouped by QRC1 2026 / QRC2
2026. Apply the **Self-contained knowledge rule**: each feature entry must
describe what it does, how to use it, and constraints — with its version
number, and the source URL only as a trailing citation.

**Verify**: `grep -c "QRC" plugins/sap-sac-planning/skills/sap-sac-planning/references/whats-new-2026-planning.md` → ≥ 2.

### Step 3: Update affected existing references

For each step 1 finding that contradicts or materially extends one of the
in-scope candidate references, add a short dated subsection or amend the
specific stale statement (e.g. seamless-planning capabilities added in 2026,
new AI planning features). Each edit must carry the release version
("QRC2 2026 / 2026.NN+") and keep the file's existing structure. If a finding
fits no existing file, it stays only in `whats-new-2026-planning.md`.

**Verify**: `git diff --name-only` shows edits only to files in the in-scope
candidate list (plus SKILL.md/new file from other steps).

### Step 4: Update SKILL.md

Manual edits:

1. Frontmatter (`SKILL.md:6-13`, quoted above):
   - `version: 1.4.0` → `1.5.0`
   - `last_verified` → today's date
   - `sac_version: "2025.25"` → the QRC2 2026 version number from step 1 (format `"2026.NN"`)
   - `api_reference`: replace the `/2025.25/` path segment with the new
     version; confirm the resulting URL by scraping it with Firecrawl and
     checking the content is the Analytics Designer API reference for the new
     version (do NOT rely on HTTP status — help.sap.com is an SPA that
     returns 200 shells for any path). If the versioned URL pattern no longer
     works, link the unversioned "latest" API reference page instead and note
     it in your report.
   - `reference_files: 24` → `25` (after step 2) — confirm with the count
     command from the table.
2. `SKILL.md:22`: `## Reference Add-Ons (2025.25)` → `## Reference Add-Ons (2026)`.
3. `SKILL.md:28`: keep the "New in 2025" bullet but retitle it
   `**Added in 2025**`; add a new bullet
   `**New in 2026**: references/whats-new-2026-planning.md` (same list style).
4. Table of Contents and any section listing reference files: add the new file.

**Verify**: `./scripts/validate-frontmatter.sh` → exit 0;
`grep -n "2025.25" plugins/sap-sac-planning/skills/sap-sac-planning/SKILL.md` → no matches.

### Step 5: Check README.md for stale duplicates

If `plugins/sap-sac-planning/skills/sap-sac-planning/README.md` repeats the
version/date/SAC version, update to match. Otherwise leave untouched.

**Verify**: `grep -rn "2025-12-27\|2025\.25" plugins/sap-sac-planning/skills/sap-sac-planning/README.md` → no matches.

### Step 6: Sync manifests and run all validators

```bash
./scripts/sync-plugins.sh --dry-run
./scripts/sync-plugins.sh
./scripts/validate-frontmatter.sh
./scripts/validate-json-schemas.sh
./scripts/validate-reserved-words.sh
./scripts/validate-inventory.sh
node scripts/validate-bundled-resources.mjs
```

**Verify**: all exit 0 with their success messages. `git status` shows changes
only in `plugins/sap-sac-planning/` plus sync-regenerated files.

## Test plan

The validators are the test suite. Additionally:

- Every new feature statement in `whats-new-2026-planning.md` and in amended
  references carries a version tag (`2026.NN` or `QRC1/QRC2 2026`) and a
  source URL as citation.
- **Self-containment check**: read each new/edited reference imagining no
  internet access — every section must deliver its guidance from the markdown
  alone; no section body may consist mainly of a link.
- The updated `api_reference` URL was verified by Firecrawl scrape showing the
  API reference content for the new version (not by HTTP status).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `references/whats-new-2026-planning.md` exists
- [ ] `grep -rn "sac_version: \"2025.25\"" plugins/sap-sac-planning/` → no matches
- [ ] `grep -rn "last_verified: 2025-12-27" plugins/sap-sac-planning/` → no matches
- [ ] `ls plugins/sap-sac-planning/skills/sap-sac-planning/references/ | wc -l` equals the frontmatter `reference_files` value
- [ ] All validators exit 0
- [ ] No modifications outside the in-scope list (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Drift check shows `plugins/sap-sac-planning/` changed since `4dd1adc` and
  excerpts no longer match.
- No JS-rendering scrape tool (Firecrawl or equivalent) is available — SAC
  docs have no JS-free mirror; do NOT write thin or guessed content instead.
- You cannot determine the QRC2 2026 version number from an SAP source
  (do not invent one).
- The KBA/release notes reveal a *breaking* change to planning APIs that
  invalidates code samples in `references/api-reference.md` or
  `references/api-snippets.md` — those are large files; report the affected
  sections instead of rewriting them.
- Accurate updates would require touching more than the 4 candidate reference
  files listed in Scope.

## Maintenance notes

- Quarterly: next QRC refresh should extend `whats-new-2026-planning.md`.
- Soft link to plan 001: both this skill and `sap-datasphere` describe
  seamless planning with Datasphere. If plan 001 also landed, skim
  `plugins/sap-datasphere/.../references/business-data-cloud.md` and ensure
  the two skills don't contradict each other on seamless planning; reconcile
  in *this* plugin's file if they do.
- Reviewer should scrutinize: that `sac_version` matches what the KBA calls
  QRC2 2026, and that no existing reference content was deleted (additive
  refresh).
