# Plan 001: Refresh sap-datasphere to mid-2026 and add SAP Business Data Cloud coverage

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 4dd1adc..HEAD -- plugins/sap-datasphere/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs (skill content currency)
- **Planned at**: commit `4dd1adc`, 2026-06-11

## Why this matters

The `sap-datasphere` skill's content is frozen at November 2025: its newest
what's-new reference explicitly states it covers releases "through version
2025.24 (November 2025)" and the skill was last verified 2025-12-28. SAP
Datasphere ships roughly every two weeks, so ~7 months of releases are
missing. More importantly, SAP has reframed Datasphere (together with SAP
Analytics Cloud and curated data products) under the **SAP Business Data
Cloud (BDC)** umbrella — SAP now publishes all Datasphere release news under
"What's New in SAP Business Data Cloud" — and this skill mentions BDC only in
passing. Users asking the skill about current Datasphere capabilities get
outdated guidance and no orientation to SAP's strategic data platform
direction.

## Current state

Relevant files (all under `plugins/sap-datasphere/skills/sap-datasphere/`):

- `SKILL.md` — main skill file, ~703 lines; stale metadata and no BDC section
- `references/whats-new-2025.md` — covers releases through 2025.24 (Nov 2025)
- `references/` — 15 reference files total (see SKILL.md "Bundled Resources")

Excerpts as of commit `4dd1adc`:

`SKILL.md:5-8` (frontmatter metadata):
```yaml
metadata:
  version: 2.1.0
  last_verified: 2025-12-28
  keywords: [sap datasphere, data warehouse cloud, dwc, data builder, ...]
```

`SKILL.md:703` (footer):
```
**Version**: 2.1.0 | **Last Verified**: 2025-12-28
```

`SKILL.md:595` (Bundled Resources list, item 13):
```
13. **`references/whats-new-2025.md`** - Q1-Q4 2025 features, Generic HTTP, REST API tasks, deprecations
```

`references/whats-new-2025.md` (near end of file):
```
This document covers releases through version **2025.24** (November 2025).
```

`SKILL.md:43-45` (Overview — no BDC mention):
```
SAP Datasphere is SAP's cloud-native data warehouse solution on SAP Business
Technology Platform (BTP). This skill provides comprehensive guidance for data
acquisition, preparation, modeling, administration, and integration.
```

`SKILL.md:620-622` (MCP integration section):
```
This skill integrates with the **SAP Datasphere MCP Server**
(@mariodefe/sap-datasphere-mcp) providing 45 tools for live tenant interaction.
```

Repo conventions that apply:

- **CLAUDE.md (repo root) forbids automated refactoring** of skill content:
  no sed/awk/scripted rewrites; use Read/Edit/Write manually and review each
  change.
- Skill metadata convention (see any plugin SKILL.md): `metadata.version` is
  the per-skill content version (bump minor for content additions);
  `last_verified` is the date content was checked against the live product.
  The plugin.json `version` (2.2.2) is a separate, repo-global version managed
  by `./scripts/sync-plugins.sh` — do not hand-edit plugin.json.
- Feature claims should cite SAP Help Portal / SAP Note / community URLs
  (repo quality standard).

## Commands you will need

Run all from the repo root.

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Frontmatter validation | `./scripts/validate-frontmatter.sh` | exit 0, "All frontmatter valid" |
| Bundled-resource links | `node scripts/validate-bundled-resources.mjs` | exit 0, "Bundled resource validation passed" |
| Reserved words | `./scripts/validate-reserved-words.sh` | exit 0, "All files passed validation" |
| JSON schemas | `./scripts/validate-json-schemas.sh` | exit 0, "All validations passed" |
| Manifest/marketplace sync (preview) | `./scripts/sync-plugins.sh --dry-run` | exit 0, "DRY RUN complete" |
| Manifest/marketplace sync (apply) | `./scripts/sync-plugins.sh` | exit 0, "Sync Complete" |
| CLI version check (read-only) | `npm view @sap/datasphere-cli version` | prints a semver |
| MCP package check (read-only) | `npm view @mariodefe/sap-datasphere-mcp version` | prints a semver |

## Suggested executor toolkit

- Web search + web fetch for research (step 1). Primary sources:
  - What's New in SAP Business Data Cloud (covers Datasphere):
    https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b
  - Monthly SAP community blog series "SAP Business Data Cloud and Datasphere
    News in <Month>" (e.g. https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-january/ba-p/14320094)
  - SAP Datasphere help: https://help.sap.com/docs/SAP_DATASPHERE
- `plugin-dev:skill-development` skill (if available) for SKILL.md structure
  conventions.

## Scope

**In scope** (the only files you should modify/create):

- `plugins/sap-datasphere/skills/sap-datasphere/SKILL.md`
- `plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md` (create)
- `plugins/sap-datasphere/skills/sap-datasphere/references/whats-new-2026.md` (create)
- `plugins/sap-datasphere/skills/sap-datasphere/README.md` (only if it repeats the stale version/date)
- Files regenerated by `./scripts/sync-plugins.sh` (plugin.json files, `.claude-plugin/marketplace.json`) — regenerated, not hand-edited

**Out of scope** (do NOT touch, even though they look related):

- `references/whats-new-2025.md` — keep as historical record, unchanged
- The other 13 reference files — unless a 2026 release *contradicts* a
  specific statement in them; in that case fix only the contradicted line and
  note it in your report
- `plugins/sap-datasphere/.mcp.json`, `hooks/`, `agents/`, `commands/` — MCP
  and component configs are not part of this refresh
- `plugins/sap-sac-planning/` — its seamless-planning content is handled by
  plan 002

## Git workflow

- Branch: `feat/datasphere-bdc-refresh` (repo uses `feat/...`, `fix/...`,
  `feature/...` branches)
- Commit style: conventional commits, e.g. `feat(datasphere): add BDC reference and 2026 what's-new` (matches `git log` examples like `feat(abap): add ABAP 7.40 version compatibility annotations`)
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Research Datasphere releases Dec 2025 – present

Using the URLs in "Suggested executor toolkit", collect Datasphere features
released after 2025.24 (November 2025) through the current month. For each
feature record: name, release version/month, one-paragraph description, and
the source URL. Also collect: what SAP Business Data Cloud is (architecture:
Datasphere + SAP Analytics Cloud + curated data products + SAP Databricks),
and how SAP positions Datasphere within it.

**Verify**: you have (a) a dated feature list with ≥1 entry per quarter for
Q1 2026 and Q2 2026 with source URLs, and (b) a BDC summary citing at least
one help.sap.com page. If the What's New portal and the community blogs are
both inaccessible, STOP.

### Step 2: Create `references/business-data-cloud.md`

New file at `plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md`.
Structure it like the existing reference files (start with an H1, short
overview, then sections; see `references/catalog-governance.md` as a pattern).
Required sections:

- What is SAP Business Data Cloud (components, architecture)
- Where Datasphere fits (what changes / does not change for Datasphere developers)
- Data products in BDC vs. Datasphere data marketplace (relate to the existing
  `references/data-products-marketplace.md` content)
- SAP Databricks integration (overview level)
- Official resources (What's New URL above, BDC help portal entry page)

**Verify**: `node scripts/validate-bundled-resources.mjs` → exit 0 (file is
not yet referenced, so this just confirms nothing broke).

### Step 3: Create `references/whats-new-2026.md`

New file with the same structure as `references/whats-new-2025.md` (H1, short
overview noting the continuous delivery model, quarterly sections, version
table at the end). Content: the feature list from step 1, grouped by quarter.
End with a "Version Information" section stating the newest release version
covered (e.g. "through version 2026.NN (<month> 2026)") — use the actual
version number found in step 1, do not guess.

**Verify**: `grep -c "2026" plugins/sap-datasphere/skills/sap-datasphere/references/whats-new-2026.md` → ≥ 10.

### Step 4: Update SKILL.md

All edits manual (CLAUDE.md directive). Changes:

1. Overview section (current text at `SKILL.md:43-45`, quoted above): add a
   short paragraph positioning Datasphere as the data-foundation component of
   SAP Business Data Cloud, pointing to `references/business-data-cloud.md`.
2. Bundled Resources section: under "Best Practices & Updates" renumber/add
   entries for `whats-new-2026.md` and add `business-data-cloud.md` (place it
   in a sensible group, e.g. with marketplace/governance or its own
   "Platform Context" line). Keep the existing numbered-list style.
3. File-structure listing near `SKILL.md:677-691`: add the two new files to
   the `references/` tree.
4. Frontmatter: `metadata.version: 2.1.0` → `2.2.0`; `last_verified` → today's
   date; append to `keywords`: `business data cloud`, `bdc`, `sap databricks`.
5. Footer line (`SKILL.md:703`): update to `**Version**: 2.2.0 | **Last Verified**: <today>`.
6. If `references/whats-new-2025.md` is described as the *current* what's-new
   anywhere in SKILL.md prose, reword to historical ("2025 archive").

**Verify**: `./scripts/validate-frontmatter.sh` → exit 0; and
`grep -n "business-data-cloud.md\|whats-new-2026.md" plugins/sap-datasphere/skills/sap-datasphere/SKILL.md` → ≥ 2 matches.

### Step 5: Verify external dependencies still exist

Read-only checks:

- `npm view @sap/datasphere-cli version` → prints a version. If the install
  instruction in SKILL.md (`npm install -g @sap/datasphere-cli`, around line
  427) no longer matches the package name, STOP and report.
- `npm view @mariodefe/sap-datasphere-mcp version` → prints a version. If the
  package is gone or deprecated, STOP and report (the MCP section and
  `.mcp.json` would need a decision from the maintainer, which is out of
  scope).

**Verify**: both commands print a semver.

### Step 6: Check README.md for stale duplicates

`plugins/sap-datasphere/skills/sap-datasphere/README.md` may repeat the
version/date or reference-file list. If it does, update those lines to match
SKILL.md. If it doesn't, leave it untouched.

**Verify**: `grep -n "2025-12-28\|2\.1\.0" plugins/sap-datasphere/skills/sap-datasphere/README.md` → no matches.

### Step 7: Sync manifests and run all validators

```bash
./scripts/sync-plugins.sh --dry-run   # review output
./scripts/sync-plugins.sh
./scripts/validate-frontmatter.sh
./scripts/validate-json-schemas.sh
./scripts/validate-reserved-words.sh
./scripts/validate-inventory.sh
node scripts/validate-bundled-resources.mjs
```

**Verify**: every command exits 0 with its success message (see command
table). `git status` shows changes only in `plugins/sap-datasphere/`,
`.claude-plugin/marketplace.json`, and possibly other plugin.json files that
the sync script regenerates (if the sync touches unrelated plugin.json files
with content changes beyond formatting, STOP — that signals the generator
changed behavior).

## Test plan

This repo has no unit tests for skill content; the validators above are the
test suite. Additionally:

- Self-review the two new reference files against their source URLs: every
  feature claim must carry a release version (e.g. "2026.04+") and be backed
  by a URL listed in the file's resources section.
- Confirm no reserved words ("official", "anthropic", "claude") were added to
  the SKILL.md `description` field: `./scripts/validate-reserved-words.sh` → exit 0.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md` exists
- [ ] `plugins/sap-datasphere/skills/sap-datasphere/references/whats-new-2026.md` exists
- [ ] `grep -rn "last_verified: 2025-12-28" plugins/sap-datasphere/` → no matches
- [ ] `grep -n "Business Data Cloud" plugins/sap-datasphere/skills/sap-datasphere/SKILL.md` → ≥ 2 matches
- [ ] All five validators + `node scripts/validate-bundled-resources.mjs` exit 0
- [ ] `git status` shows no modifications outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows `plugins/sap-datasphere/` changed since `4dd1adc` and
  the "Current state" excerpts no longer match.
- Research (step 1) reveals SAP has renamed/merged Datasphere itself (not just
  the umbrella branding) such that the skill's `name` or core framing would
  need to change — that's a maintainer decision.
- `@mariodefe/sap-datasphere-mcp` or `@sap/datasphere-cli` no longer exists on npm.
- Accurate 2026 content would require rewriting more than 3 of the existing
  reference files — report the list instead of doing it.

## Maintenance notes

- This skill should be re-verified quarterly (repo CLAUDE.md maintenance
  cycle); the next sweep should extend `whats-new-2026.md` rather than create
  a new file mid-year.
- Reviewer should scrutinize: that BDC claims are dated and sourced (BDC is
  evolving fast), and that the Overview still leads with Datasphere (the
  skill's subject), not BDC marketing.
- Deferred: a standalone `sap-business-data-cloud` plugin. Revisit when BDC
  exposes a substantial developer-facing API surface beyond Datasphere/SAC.
- Plan 002 (sap-sac-planning) touches seamless planning with Datasphere; if
  both land, the two skills' descriptions of seamless planning should agree.

---

## Post-execution addendum (2026-06-11)

This plan was executed before the repo's research-source policy was tightened.
Two small follow-ups remain; an executor picking this up should do ONLY these,
then set the index row to DONE.

**Context — why this addendum exists**: SAP web properties (help.sap.com
`/docs` and `/whats-new`, sap.com, community.sap.com) are JS-rendered or
bot-blocked; plain HTTP fetch returns empty shells or 403. They are readable
only with a JS-rendering scraper (e.g. the Firecrawl MCP tools:
`mcp__mcp-server-firecrawl__firecrawl_scrape` with markdown format). The same
applies to the AI harness *using* the skill later — so reference files must
inline the knowledge itself, with URLs as citations only. For future
Datasphere refreshes, prefer the JS-free markdown mirror
`github.com/SAP-docs/sap-datasphere` (verified to exist; fetch via
`raw.githubusercontent.com`) and use Firecrawl only for What's New pages.

**Follow-up 1 — self-containment verification** of the files this plan
produced:

- `references/business-data-cloud.md` and `references/whats-new-2026.md`:
  confirm every section body contains the actual guidance (feature behavior,
  usage, constraints) and no section's substance is just a URL. A reader with
  no internet access must still get complete guidance. (Spot-checked at
  planning time and looked good — this is a confirmation pass, not a rewrite.)

**Follow-up 2 — Databricks external-skills pointer**: in
`references/business-data-cloud.md`, in/near the SAP Databricks section, add a
short "Related external skills" note following this pattern:

```markdown
> **Related external skills**: If your task involves working *inside*
> Databricks (notebooks, Unity Catalog, Spark jobs, SAP Databricks in BDC),
> the Databricks agent skills plugin covers that side:
> https://github.com/databricks/databricks-agent-skills — offer the user to
> install it; never install it unprompted.
```

**Verify**: `grep -n "databricks-agent-skills" plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md`
→ 1 match; `node scripts/validate-bundled-resources.mjs` → exit 0.
