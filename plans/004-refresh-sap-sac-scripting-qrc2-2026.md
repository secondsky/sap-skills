# Plan 004: Refresh sap-sac-scripting to QRC2 2026 and fix metadata drift

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 4dd1adc..HEAD -- plugins/sap-sac-scripting/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs (skill content currency + metadata consistency)
- **Planned at**: commit `4dd1adc`, 2026-06-11

## Why this matters

This is the most current of the SAC skills (verified 2026-03-07 against
QRC1 2026), but it has drifted internally: its newest "what's new" reference
files stop at Q4 2025 (2025.21/2025.23) even though the metadata claims
Q1 2026, the metadata says 63 reference files while the directory contains 64,
and QRC2 2026 has since shipped. Small inconsistencies in the
highest-traffic SAC skill erode trust in the metadata of the whole
marketplace; one QRC of scripting API changes is also missing.

## Current state

Relevant files (under `plugins/sap-sac-scripting/skills/sap-sac-scripting/`):

- `SKILL.md` — main skill file; metadata block below
- `references/` — **64** files (count via `ls | wc -l`), incl.
  `whats-new-2025.23.md` and `whats-new-q4-2025.md` (newest what's-new files)
- `templates/` — `common-patterns.js`, `planning-operations.js`

Excerpts as of commit `4dd1adc`:

`SKILL.md:6-17` (frontmatter metadata):
```yaml
metadata:
  version: 3.0.1
  last_verified: 2026-03-07
  sac_version: "Q1 2026 (2026.2)"
  api_reference_version: "2025.14 (OSE Q1 2026)"
  documentation_source: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
  reference_files: 63
  template_patterns: 56
  agents: 4
  commands: 4
  status: production
  known_issues: []
```

`SKILL.md:36` (Getting Started orientation block):
```
2. **Optimized Story Experience** — story-based scripting, OSE API (v2025.14)
```

`references/whats-new-q4-2025.md:1-6` (newest what's-new coverage):
```
# What's New in SAC Scripting - Q4 2025 (2025.21)
...
**Release**: Q4 2025 (Version 2025.21)
```

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
| Count reference files | `ls plugins/sap-sac-scripting/skills/sap-sac-scripting/references/ \| wc -l` | matches frontmatter `reference_files` |

## Research sources & access methods

**Critical constraint**: SAP web properties are NOT plain-fetchable —
help.sap.com `/docs`//`/whats-new` and sap.com pages are JS-rendered SPAs
(plain fetch returns empty shells), community.sap.com returns 403 to plain
HTTP, KBA pages are JS-rendered/possibly login-gated. **There is no GitHub
markdown mirror for SAC documentation** (SAP-docs org checked 2026-06-11).
All web research for this plan requires a JS-rendering scraper — in this
environment the Firecrawl MCP tools, e.g.:

```
mcp__mcp-server-firecrawl__firecrawl_scrape
  url: <source URL>
  formats: ["markdown"]
```

Plain WebFetch/curl will silently return useless shells — do not use them on
SAP URLs.

| Source | URL | Access |
|--------|-----|--------|
| SAP KBA "Hot Features 2026 QRC2" | https://userapps.support.sap.com/sap/support/knowledge/en/3739836 | firecrawl (may be login-gated → community mirrors) |
| SAC release highlights | https://www.sap.com/products/data-cloud/cloud-analytics/release-highlights.html | firecrawl |
| What's New in SAP Business Data Cloud (SAC section, filter API/scripting) | https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b | firecrawl |
| SAC Analytics Designer API reference (current OSE API version string) | linked from https://help.sap.com/docs/SAP_ANALYTICS_CLOUD | firecrawl |
| Existing what's-new files (format exemplar + prior coverage) | `plugins/sap-sac-scripting/.../references/whats-new-q4-2025.md`, `whats-new-2025.23.md` | local |

## Self-contained knowledge rule

The finished skill is consumed by AI harnesses that cannot fetch SAP URLs at
usage time. Every reference file you create or edit must inline the actual
knowledge (what the API/feature does, signatures, usage, constraints, code
example where the source provides one) — a section body must never be just
"see <URL>"; URLs are end-of-section citations only. Acceptance test: a
reader with no internet access gets complete guidance from the .md alone.

## Scope

**In scope** (the only files you should modify/create):

- `plugins/sap-sac-scripting/skills/sap-sac-scripting/SKILL.md`
- `references/whats-new-qrc2-2026.md` (create)
- `references/whats-new-2025.23.md` / `references/whats-new-q4-2025.md` —
  header note only, if needed, marking them as historical
- `plugins/sap-sac-scripting/skills/sap-sac-scripting/README.md` (only if it
  repeats stale versions)
- Files regenerated by `./scripts/sync-plugins.sh`

**Out of scope** (do NOT touch):

- The ~60 API reference files (`api-*.md`, `ose-api-*.md`, tech-object files)
  — unless a QRC2 2026 change *contradicts* one specific statement; then fix
  only that statement with a version tag
- `agents/`, `commands/`, `hooks/`, `.mcp.json`, `templates/*.js`
- Other plugins (plans 001–003 cover them)

## Git workflow

- Branch: `feat/sac-scripting-qrc2-2026`
- Commit style: conventional commits, e.g. `feat(sac-scripting): add QRC2 2026 what's-new, fix metadata drift`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 0: Verify research tooling

Test-scrape one SAP page with the Firecrawl tool (e.g. the SAC release
highlights URL) and confirm the result contains real release content (feature
names, version numbers), not an empty shell or cookie/JS notice.

**Verify**: scraped markdown contains "2026" and at least one feature
heading. If no JS-rendering scrape tool is available, STOP — SAC docs have no
JS-free fallback.

### Step 1: Research QRC2 2026 scripting changes

From the sources above, collect scripting-relevant changes in QRC2 2026 (and
any QRC1 2026 scripting items not already covered by the skill — check
`grep -rl "2026" plugins/sap-sac-scripting/skills/sap-sac-scripting/references/ | head`
to see what 2026 content already exists): new/changed script APIs, OSE API
version bump, composites scripting, planning scripting, export/tech objects.
Record the QRC2 2026 version number (`2026.NN`) and the current **OSE API
reference version string** (the skill currently says `2025.14`) from SAP
sources — both are needed in step 3; do not guess either.

**Verify**: you have the QRC2 2026 version number AND the current OSE API
version string, each from an SAP source URL, plus a dated change list
(possibly short — record an explicit "no changes" per area if so).

### Step 2: Create `references/whats-new-qrc2-2026.md`

Pattern on `references/whats-new-q4-2025.md` (H1 with release + version,
release date, documentation link, then numbered enhancement sections with
code examples where the source provides them). Contents: step 1 findings,
written under the **Self-contained knowledge rule** — each enhancement
section explains the API/feature and its usage inline (signature + example
where available), with source URLs as trailing citations only.

**Verify**: file exists; `head -5` shows the QRC2 2026 release/version header.

### Step 3: Update SKILL.md metadata and orientation text

Manual edits to the frontmatter block (`SKILL.md:6-17`, quoted above):

- `version: 3.0.1` → `3.1.0`
- `last_verified` → today's date
- `sac_version: "Q1 2026 (2026.2)"` → `"Q2 2026 (2026.NN)"` (step 1 value)
- `api_reference_version: "2025.14 (OSE Q1 2026)"` → current OSE API version
  string from step 1, labeled with QRC2 2026
- `reference_files: 63` → the actual count after step 2 (expected 65; confirm
  with the count command)

And in the body:

- `SKILL.md:36`: update the OSE API version in
  `OSE API (v2025.14)` to the step 1 value.
- Where the skill lists what's-new resources (search:
  `grep -n "whats-new" plugins/sap-sac-scripting/skills/sap-sac-scripting/SKILL.md`),
  add `whats-new-qrc2-2026.md`.

**Verify**: `./scripts/validate-frontmatter.sh` → exit 0;
`grep -n "reference_files: 63\|2025.14" plugins/sap-sac-scripting/skills/sap-sac-scripting/SKILL.md` → no matches.

### Step 4: Sync and validate

```bash
./scripts/sync-plugins.sh --dry-run
./scripts/sync-plugins.sh
./scripts/validate-frontmatter.sh
./scripts/validate-json-schemas.sh
./scripts/validate-reserved-words.sh
./scripts/validate-inventory.sh
node scripts/validate-bundled-resources.mjs
```

**Verify**: all exit 0 with success messages; `git status` shows changes only
in `plugins/sap-sac-scripting/` plus sync-regenerated files.

## Test plan

The validators are the test suite. Additionally:

- `ls plugins/sap-sac-scripting/skills/sap-sac-scripting/references/ | wc -l`
  equals the frontmatter `reference_files` value (this was the drift bug —
  re-check it last).
- Every claim in the new what's-new file carries the release version and a
  source URL citation.
- **Self-containment check**: read the new file imagining no internet access —
  every section delivers its guidance from the markdown alone.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `references/whats-new-qrc2-2026.md` exists
- [ ] `grep -rn "reference_files: 63" plugins/sap-sac-scripting/` → no matches, and the count command equals the new frontmatter value
- [ ] `grep -rn "Q1 2026 (2026.2)" plugins/sap-sac-scripting/skills/sap-sac-scripting/SKILL.md` → no matches
- [ ] All validators exit 0
- [ ] No modifications outside the in-scope list (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Drift check shows `plugins/sap-sac-scripting/` changed since `4dd1adc` and
  excerpts no longer match.
- No JS-rendering scrape tool (Firecrawl or equivalent) is available — SAC
  docs have no JS-free mirror; do NOT write thin or guessed content instead.
- You cannot determine the QRC2 2026 version number or the current OSE API
  version string from SAP sources scraped with a JS-capable tool (never guess
  either value).
- QRC2 2026 *removed or renamed* APIs documented in the `api-*.md` /
  `ose-api-*.md` files — report the affected files; deprecation sweeps across
  ~60 API files are a separate effort.
- The discrepancy hunt reveals the metadata `template_patterns: 56` is also
  wrong by a wide margin (>±10) — report rather than recount-and-fix, since
  "pattern" counting rules aren't documented.

## Maintenance notes

- The `reference_files` count drifts every time a file is added — whoever adds
  a reference must update it (consider proposing an inventory check in
  `validate-inventory.sh` as follow-up; explicitly out of scope here).
- Quarterly: extend with a new whats-new file per QRC; consider consolidating
  the four whats-new files into one rolling file at next major version
  (maintainer decision, deferred).
- Reviewer should scrutinize: the OSE API version string — it tracks a
  different numbering scheme (`2025.14`) than the SAC wave version
  (`2026.NN`); mixing them up is the likeliest error in this refresh.
