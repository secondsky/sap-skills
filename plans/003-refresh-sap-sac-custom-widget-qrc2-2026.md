# Plan 003: Refresh sap-sac-custom-widget from SAC 2025.21 to QRC2 2026

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 4dd1adc..HEAD -- plugins/sap-sac-custom-widget/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs (skill content currency)
- **Planned at**: commit `4dd1adc`, 2026-06-11

## Why this matters

The custom-widget skill is pinned to SAC 2025.21 (verified 2025-12-27), more
than two quarterly releases behind. Custom widget development is tightly
coupled to the SAC release: the widget JSON schema, hosting options, lifecycle
behavior, and Script API surface evolve with QRCs, and the skill ships
templates (`templates/widget.json-complete`) that must remain valid against
the current schema. Stale version pins also undermine trust in the skill's
"errors_prevented" claims.

## Current state

Relevant files (under `plugins/sap-sac-custom-widget/skills/sap-sac-custom-widget/`):

- `SKILL.md` — main skill file; stale metadata
- `references/` — 8 reference files (dev guide topics, ECharts, add-ons, templates guide)
- `templates/` — `basic-widget.js`, `data-bound-chart.js`, `styling-panel.js`,
  `widget.json-complete`, `widget.json-minimal`

Excerpts as of commit `4dd1adc`:

`SKILL.md:6-14` (frontmatter metadata):
```yaml
metadata:
  version: 2.0.0
  last_verified: 2025-12-27
  sac_version: "2025.21"
  errors_prevented: 25+
  official_docs:
    - "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html"
    - "https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf"
  samples_repo: "https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets"
```

`SKILL.md:3` (description, excerpt): "... Includes Widget Add-On feature
(QRC Q4 2023+) and templates for widgets, charts, and KPI cards."

Repo conventions that apply:

- **CLAUDE.md (repo root) forbids automated refactoring**: manual
  Read/Edit/Write only, review each change.
- `metadata.version` is the per-skill content version; plugin.json `version`
  (2.2.2) is repo-global, managed by `./scripts/sync-plugins.sh` — never
  hand-edit plugin.json.
- Feature claims cite SAP Help / KBA / community URLs.

## Commands you will need

Run all from the repo root.

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Frontmatter validation | `./scripts/validate-frontmatter.sh` | exit 0, "All frontmatter valid" |
| Bundled-resource links | `node scripts/validate-bundled-resources.mjs` | exit 0, "Bundled resource validation passed" |
| Reserved words | `./scripts/validate-reserved-words.sh` | exit 0, "All files passed validation" |
| JSON schemas | `./scripts/validate-json-schemas.sh` | exit 0, "All validations passed" |
| Manifest/marketplace sync | `./scripts/sync-plugins.sh` (preview with `--dry-run` first) | exit 0, "Sync Complete" |
| Template JSON sanity | `python3 -m json.tool plugins/sap-sac-custom-widget/skills/sap-sac-custom-widget/templates/widget.json-complete` | exit 0 (valid JSON) |

## Research sources & access methods

**Critical constraint**: SAP web properties are NOT plain-fetchable —
help.sap.com `/docs`//`/whats-new` and sap.com pages are JS-rendered SPAs
(plain fetch returns empty shells), community.sap.com returns 403 to plain
HTTP, and KBA pages are JS-rendered/possibly login-gated. There is no GitHub
markdown mirror for SAC documentation. JS-rendered sources must be read with
a JS-rendering scraper — in this environment the Firecrawl MCP tools, e.g.:

```
mcp__mcp-server-firecrawl__firecrawl_scrape
  url: <source URL>
  formats: ["markdown"]
```

**Exception that makes this plan partly JS-free**: the Custom Widget
Developer Guide PDF is a direct `application/pdf` download (verified
2026-06-11: HTTP 200, no JS) — download it with plain fetch/curl and read it
with the Read tool (PDF page ranges supported). It is the PRIMARY source for
this plan.

| Source | URL | Access |
|--------|-----|--------|
| Custom Widget Developer Guide PDF (current release) | https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf | **plain fetch (primary)** |
| Custom widget help page (frontmatter `official_docs[0]`) | https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html | firecrawl |
| SAC release highlights | https://www.sap.com/products/data-cloud/cloud-analytics/release-highlights.html | firecrawl |
| What's New in SAP Business Data Cloud (SAC section) | https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b | firecrawl |
| SAP KBA "Hot Features 2026 QRC2" | https://userapps.support.sap.com/sap/support/knowledge/en/3739836 | firecrawl (may be login-gated) |
| Samples repo (frontmatter `samples_repo`) | https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets | plain fetch (GitHub API / raw) |

## Self-contained knowledge rule

The finished skill is consumed by AI harnesses that cannot fetch SAP URLs at
usage time. Every reference file you create or edit must inline the actual
guidance (what changed, how to use it, constraints, example) — a section body
must never be just "see <URL>"; URLs are end-of-section citations only.
Acceptance test: a reader with no internet access gets complete guidance from
the .md alone.

## Scope

**In scope** (the only files you should modify/create):

- `plugins/sap-sac-custom-widget/skills/sap-sac-custom-widget/SKILL.md`
- `references/advanced-topics.md` and `references/widget-addon-guide.md` —
  add dated 2026 subsections if research finds widget-relevant changes
- `references/json-schema-reference.md` — only if the widget JSON schema
  gained/changed properties since 2025.21
- `templates/widget.json-complete`, `templates/widget.json-minimal` — only if
  the schema changed (see STOP conditions)
- `plugins/sap-sac-custom-widget/skills/sap-sac-custom-widget/README.md`
  (only if it repeats stale version/date)
- Files regenerated by `./scripts/sync-plugins.sh`

**Out of scope** (do NOT touch):

- `agents/`, `commands/`, `hooks/` under `plugins/sap-sac-custom-widget/`
- `templates/*.js` — JavaScript templates stay unless a lifecycle function was
  renamed/removed by SAP (that's a STOP condition, not an edit)
- Other plugins, including `sap-sac-scripting` (plan 004)

## Git workflow

- Branch: `feat/sac-custom-widget-qrc2-2026`
- Commit style: conventional commits, e.g. `feat(sac-custom-widget): refresh to QRC2 2026`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Verify external links still resolve

Per the access-methods table — HTTP status alone proves nothing for the SPA
URLs:

- PDF (`official_docs[1]`): plain fetch; confirm `content-type:
  application/pdf` and that the downloaded file opens (Read tool shows the
  guide's title page).
- Help page (`official_docs[0]`): Firecrawl scrape; confirm the markdown
  contains custom-widget content (e.g. "custom widget" in the body), not an
  empty shell.
- `samples_repo`: plain fetch via GitHub API
  (`curl -s https://api.github.com/repos/SAP-samples/analytics-cloud-datasphere-community-content`
  → HTTP 200 JSON).

If one is dead, find the current equivalent and update the frontmatter entry
in step 3. If no JS-rendering scraper is available, the help-page check and
all `firecrawl` sources in step 2 are blocked — see STOP conditions.

**Verify**: each source yields its expected content as described above.

### Step 2: Research widget-relevant changes since 2025.21

Primary method (JS-free): download the current Developer Guide PDF (step 1)
and read the chapters on widget JSON metadata, lifecycle functions, data
binding, hosting, and Widget Add-Ons; compare against the skill's documented
claims (`references/json-schema-reference.md`, lifecycle functions
`onCustomWidgetBeforeUpdate`, `onCustomWidgetAfterUpdate`,
`onCustomWidgetResize`, `onCustomWidgetDestroy`, SAC-hosted resources,
integrity hashes/CSP).

Secondary (firecrawl): the release-highlights / What's New / KBA sources for
widget-related QRC1+QRC2 2026 items and for the **QRC2 2026 version number**
(`2026.NN`) — do not guess it. Custom widgets change less than planning — an
outcome of "no breaking changes, N additive features" is plausible and fine;
record it explicitly.

**Verify**: you have the QRC2 2026 version number and a (possibly short)
dated change list with URLs — or an explicit, sourced "no relevant changes"
statement per area.

### Step 3: Update SKILL.md

Manual edits:

1. Frontmatter (`SKILL.md:6-14`, quoted above):
   - `version: 2.0.0` → `2.1.0`
   - `last_verified` → today's date
   - `sac_version: "2025.21"` → QRC2 2026 version number from step 2
   - Replace any dead `official_docs`/`samples_repo` URL found in step 1
2. If step 2 found notable additions, add them to the relevant SKILL.md
   sections (e.g. hosting or add-on subsections) as one-liners with version
   tags, pointing into the references for detail.

**Verify**: `./scripts/validate-frontmatter.sh` → exit 0;
`grep -n "2025.21" plugins/sap-sac-custom-widget/skills/sap-sac-custom-widget/SKILL.md` → no matches.

### Step 4: Update references with dated 2026 subsections

For each step 2 finding, add a short dated subsection to the matching in-scope
reference file (`advanced-topics.md`, `widget-addon-guide.md`, or
`json-schema-reference.md`). Apply the **Self-contained knowledge rule**: each
subsection carries the actual behavior/usage/constraints inline, with the
source URL as a trailing citation. Keep each file's existing heading
structure; additive edits only. Skip entirely if step 2 found nothing
relevant.

**Verify**: `git diff --name-only` shows only in-scope files.

### Step 5: Validate templates against the current schema

Compare `templates/widget.json-complete` and `templates/widget.json-minimal`
against the current Developer Guide's metadata schema (from step 2 research).
If new *optional* properties exist, you may add them to
`widget.json-complete` with comments in `references/json-schema-reference.md`.
If any *existing* property in the templates is now invalid or renamed, STOP
(see STOP conditions).

**Verify**: `python3 -m json.tool` on both template files → exit 0.

### Step 6: Check README.md, sync, and validate

Update `README.md` only if it repeats stale version/date. Then:

```bash
./scripts/sync-plugins.sh --dry-run
./scripts/sync-plugins.sh
./scripts/validate-frontmatter.sh
./scripts/validate-json-schemas.sh
./scripts/validate-reserved-words.sh
./scripts/validate-inventory.sh
node scripts/validate-bundled-resources.mjs
```

**Verify**: all exit 0 with success messages; `git status` clean outside
in-scope + sync-regenerated files;
`grep -rn "2025-12-27" plugins/sap-sac-custom-widget/skills/` → no matches.

## Test plan

The validators are the test suite. Additionally:

- Every change statement added carries a version tag and source URL citation.
- **Self-containment check**: read each edited reference imagining no internet
  access — every section delivers its guidance from the markdown alone.
- Both `official_docs` URLs verified per step 1's per-source method (PDF
  content-type + readable; help page via Firecrawl content check — never by
  HTTP status alone).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -rn "sac_version: \"2025.21\"" plugins/sap-sac-custom-widget/` → no matches
- [ ] `grep -rn "last_verified: 2025-12-27" plugins/sap-sac-custom-widget/` → no matches
- [ ] `python3 -m json.tool` exits 0 on both `widget.json-*` templates
- [ ] All validators exit 0
- [ ] No modifications outside the in-scope list (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Drift check shows `plugins/sap-sac-custom-widget/` changed since `4dd1adc`
  and excerpts no longer match.
- The widget JSON metadata schema changed in a way that invalidates the
  existing templates (renamed/removed required properties) — template rework
  needs maintainer review of the 25+ documented error-preventions.
- A lifecycle function was renamed/deprecated by SAP — `templates/*.js`,
  `hooks/validator.*`, and three agents reference them; that's a coordinated
  change beyond this refresh.
- You cannot determine the QRC2 2026 version number from an SAP source.
- No JS-rendering scrape tool is available AND the Developer Guide PDF alone
  does not yield the needed information (the PDF covers the dev guide but not
  the QRC version number or what's-new list) — do not write thin or guessed
  content instead.

## Maintenance notes

- Quarterly: bump `sac_version`/`last_verified` each QRC even when nothing
  changed — the pin is the skill's trust signal.
- Reviewer should scrutinize: template edits (if any) against the official
  Developer Guide PDF, and that `errors_prevented: 25+` claims weren't
  invalidated by SAC behavior changes.
- Deferred: the hooks validator (`hooks/validator.mjs`) hardcodes lifecycle
  function names; if SAP ever changes them, the validator needs a matching
  update (out of scope here).
