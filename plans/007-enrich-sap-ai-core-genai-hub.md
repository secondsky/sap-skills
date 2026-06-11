# Plan 007: Enrich and refresh sap-ai-core's Generative AI Hub coverage

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 4dd1adc..HEAD -- plugins/sap-ai-core/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (soft link to plan 005 — see Maintenance notes)
- **Category**: docs (skill content currency)
- **Planned at**: commit `4dd1adc`, 2026-06-11

## Why this matters

The maintainer considered a standalone "Generative AI Hub" plugin and decided
against it (2026-06-11): `sap-ai-core` already dedicates ~2,000 lines to the
GenAI Hub across four reference files, so a new plugin would duplicate it.
The decision instead: **enrich and refresh that existing coverage**. The
skill was last verified 2026-02-25; the GenAI Hub's model catalog and
orchestration capabilities churn faster than any other part of the AI stack
(new models and modules arrive roughly monthly), and the maintainer wants
prompt-registry and AI Launchpad prompt-experimentation coverage
strengthened. This also gives plan 005's new Python skill a current platform
reference to point at.

## Current state

Relevant files (under `plugins/sap-ai-core/skills/sap-ai-core/`):

- `SKILL.md` — main skill file
- `references/generative-ai-hub.md` — 464 lines; headings include Overview,
  Global Scenarios, Model Providers (Azure OpenAI `azure-openai`, SAP-Hosted
  Open Source `aicore-opensource`, Google Vertex AI `gcp-vertexai`, AWS
  Bedrock `aws-bedrock`, Mistral AI `aicore-mistralai`, IBM `aicore-ibm`),
  "API: List Available Models", "Deploying a Model", "Using the Harmonized API"
- `references/orchestration-modules.md` — 579 lines
- `references/model-providers.md` — 389 lines
- `references/grounding-rag.md` — 549 lines
- `references/ai-launchpad-guide.md`, `references/advanced-features.md`,
  `references/api-reference.md`, `references/ml-operations.md`
- `templates/` — `deployment-config.json`, `orchestration-workflow.json`,
  `tool-definition.json`

Excerpt as of commit `4dd1adc` — `SKILL.md:5-9` (frontmatter metadata):

```yaml
metadata:
  version: "1.1.1"
  last_verified: "2026-02-25"
  production_tested: "Yes, examples verified against SAP documentation"
```

Repo conventions that apply:

- **CLAUDE.md (repo root) forbids automated refactoring**: manual
  Read/Edit/Write only, review each change.
- `metadata.version` is the per-skill content version (bump minor for content
  additions); plugin.json `version` is repo-global, managed by
  `./scripts/sync-plugins.sh` — never hand-edit plugin.json.
- Reserved-words policy: the frontmatter `description` must not contain
  "official", "anthropic", or "claude" (the GenAI Hub model catalog includes
  Anthropic models — name model families in the *body* only, the way the
  existing references do).
- Feature claims cite SAP Help / SAP Note / community URLs as citations.

## Research sources & access methods

**Critical constraint**: help.sap.com is a JS-rendered SPA — plain fetch
returns empty shells. **There is no SAP-docs GitHub markdown mirror for AI
Core** (checked 2026-06-11: `SAP-docs/sap-ai-core` → 404). help.sap.com
content must be read with a JS-rendering scraper — in this environment the
Firecrawl MCP tools, e.g.:

```
mcp__mcp-server-firecrawl__firecrawl_scrape
  url: <source URL>
  formats: ["markdown"]
```

| Source | URL / method | Access |
|--------|--------------|--------|
| SAP AI Core help (Generative AI Hub, orchestration, prompt registry sections) | https://help.sap.com/docs/sap-ai-core | firecrawl |
| SAP AI Launchpad help (prompt experimentation) | https://help.sap.com/docs/ai-launchpad | firecrawl |
| Model catalog SAP Note (lists currently available generative AI models; community posts reference SAP Note 3437766 — verify the current number via firecrawl_search before citing; SAP Notes themselves may be login-gated → fall back to community mirrors) | via `mcp__mcp-server-firecrawl__firecrawl_search` | firecrawl |
| SAP-samples: GenAI Hub samples (orchestration/grounding usage patterns) | https://github.com/SAP-samples/btp-gen-ai-hub-sdk-samples , https://github.com/SAP-samples/generative-ai-codejam | plain fetch (raw.githubusercontent / GitHub API) |
| Existing skill content (baseline to diff against) | `plugins/sap-ai-core/skills/sap-ai-core/references/` | local |

## Self-contained knowledge rule

The finished skill is consumed by AI harnesses that cannot fetch SAP URLs at
usage time. Every addition must inline the actual knowledge (capability
descriptions, configuration JSON, API payloads, constraints) — a section body
must never be just "see <URL>"; URLs are end-of-section citations only.
Acceptance test: a reader with no internet access gets complete guidance from
the .md alone.

## Commands you will need

Run all from the repo root.

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Frontmatter validation | `./scripts/validate-frontmatter.sh` | exit 0, "All frontmatter valid" |
| Bundled-resource links | `node scripts/validate-bundled-resources.mjs` | exit 0, "Bundled resource validation passed" |
| Reserved words | `./scripts/validate-reserved-words.sh` | exit 0, "All files passed validation" |
| JSON schemas | `./scripts/validate-json-schemas.sh` | exit 0, "All validations passed" |
| Inventory | `./scripts/validate-inventory.sh` | exit 0, "Inventory validation passed." |
| Manifest/marketplace sync | `./scripts/sync-plugins.sh` (preview with `--dry-run` first) | exit 0, "Sync Complete" |
| Template JSON sanity | `python3 -m json.tool plugins/sap-ai-core/skills/sap-ai-core/templates/orchestration-workflow.json` | exit 0 |

## Scope

**In scope** (the only files you should modify):

- `plugins/sap-ai-core/skills/sap-ai-core/SKILL.md` (metadata + small body
  updates where sections summarize the refreshed references)
- `references/generative-ai-hub.md` (model catalog + harmonized API currency)
- `references/orchestration-modules.md` (new/changed modules since 2026-02-25)
- `references/model-providers.md` (provider/model currency)
- `references/ai-launchpad-guide.md` (prompt experimentation + prompt
  registry coverage — extend here rather than creating a new file, unless the
  prompt-registry content exceeds ~150 lines, in which case create
  `references/prompt-registry.md` and register it in SKILL.md Bundled
  Resources)
- `plugins/sap-ai-core/skills/sap-ai-core/README.md` (only if it repeats
  stale version/date)
- Files regenerated by `./scripts/sync-plugins.sh`

**Out of scope** (do NOT touch):

- `references/grounding-rag.md`, `references/ml-operations.md`,
  `references/api-reference.md`, `references/advanced-features.md` — unless a
  finding *contradicts* a specific statement; then fix only that statement
- `templates/*.json` — unless the orchestration config schema changed (STOP
  condition below)
- `plugins/sap-cloud-sdk-ai/` and the plan-005 plugin — SDK-level content
  lives there, not here
- Creating a new plugin — explicitly rejected by the maintainer in favor of
  this enrichment

## Git workflow

- Branch: `feat/sap-ai-core-genai-hub-refresh`
- Commit style: conventional commits, e.g. `feat(sap-ai-core): refresh GenAI Hub model catalog and orchestration modules`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 0: Verify research tooling

Test-scrape https://help.sap.com/docs/sap-ai-core with the Firecrawl tool and
confirm the markdown contains real product content (e.g. "generative AI hub",
"orchestration"), not an empty shell.

**Verify**: scraped content contains those strings. If no JS-rendering scrape
tool is available, the SAP-samples repos alone cannot establish the current
model catalog — STOP.

### Step 1: Research GenAI Hub changes since 2026-02-25

From the sources table, collect with dates/sources:

1. **Model catalog**: currently available models per provider; new providers;
   deprecated/retired models. Diff against the six provider sections in
   `references/generative-ai-hub.md` and `references/model-providers.md`.
2. **Orchestration modules**: any modules or module options added/changed
   since 2026-02-25 (e.g. translation, filtering options, structured output,
   tool calling). Diff against `references/orchestration-modules.md` headings.
3. **Prompt registry**: current capabilities (create/version/reference
   prompts, API usage) — depth sufficient for a dedicated section.
4. **AI Launchpad prompt experimentation**: current GenAI Hub UI workflows
   (prompt editor, comparison, deployment from Launchpad).

**Verify**: a written change list exists for areas 1–2 (explicit "no changes
found, checked <source>" entries are acceptable) and a capability summary for
areas 3–4, every item with a source you actually read (scraped markdown or
samples file).

### Step 2: Update the model/provider references

Manual edits to `references/generative-ai-hub.md` and
`references/model-providers.md`: update provider/model lists per step 1,
marking deprecated models as deprecated (don't silently delete — users may
still run them), and date-tag additions ("available since <month> 2026").
Apply the Self-contained knowledge rule.

**Verify**: `git diff --stat` touches only the two files;
`node scripts/validate-bundled-resources.mjs` → exit 0.

### Step 3: Update orchestration coverage

Manual edits to `references/orchestration-modules.md` per step 1 area 2:
new modules/options as dated sections with configuration examples (match the
file's existing example style). If the orchestration config JSON schema
changed in a way that affects `templates/orchestration-workflow.json`, STOP
(see STOP conditions).

**Verify**: `python3 -m json.tool plugins/sap-ai-core/skills/sap-ai-core/templates/orchestration-workflow.json` → exit 0 (template untouched and still valid).

### Step 4: Strengthen prompt-registry and Launchpad experimentation coverage

Extend `references/ai-launchpad-guide.md` with the step 1 areas 3–4 content:
a prompt-registry section (lifecycle, API usage, orchestration integration)
and a prompt-experimentation section (UI workflow). If prompt-registry
content exceeds ~150 lines, split into `references/prompt-registry.md` and
add it to SKILL.md "Bundled Resources".

**Verify**: `grep -n "prompt registry\|Prompt Registry" plugins/sap-ai-core/skills/sap-ai-core/references/*.md` → ≥ 3 matches;
`node scripts/validate-bundled-resources.mjs` → exit 0.

### Step 5: Update SKILL.md metadata and summaries

- Frontmatter: `version: "1.1.1"` → `"1.2.0"`; `last_verified` → today's
  date. Keep `production_tested` truthful: if you verified examples only
  against documentation (not a live tenant), the existing wording "examples
  verified against SAP documentation" stays accurate — do not upgrade it.
- Body: where SKILL.md sections summarize models/orchestration (e.g. the
  Model Providers and Orchestration sections), align the summaries with the
  refreshed references.

**Verify**: `./scripts/validate-frontmatter.sh` → exit 0;
`grep -n "last_verified: \"2026-02-25\"" plugins/sap-ai-core/skills/sap-ai-core/SKILL.md` → no matches.

### Step 6: Sync and validate

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
in `plugins/sap-ai-core/` plus sync-regenerated files.

## Test plan

The validators are the test suite. Additionally:

- Every model/module claim added carries a date or "available since" tag and
  a source citation.
- **Self-containment check**: read each edited reference imagining no
  internet access — model lists, module configs, and prompt-registry usage
  must be complete in the markdown.
- Reserved-words check passes even though the body may name Anthropic model
  families (`./scripts/validate-reserved-words.sh` checks name/description
  fields).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -rn "last_verified: \"2026-02-25\"" plugins/sap-ai-core/` → no matches
- [ ] `grep -n "version: \"1.2.0\"" plugins/sap-ai-core/skills/sap-ai-core/SKILL.md` → 1 match
- [ ] Prompt-registry coverage exists (grep from step 4 → ≥ 3 matches)
- [ ] All validators exit 0
- [ ] No modifications outside the in-scope list (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Drift check shows `plugins/sap-ai-core/` changed since `4dd1adc` and the
  excerpts no longer match.
- No JS-rendering scrape tool is available (no JS-free mirror exists for AI
  Core docs) — do not write thin or guessed content instead.
- The orchestration configuration schema changed such that
  `templates/orchestration-workflow.json` or
  `templates/deployment-config.json` would become invalid — template changes
  need maintainer review against live-tenant behavior.
- Research reveals SAP has restructured the GenAI Hub offering itself
  (renamed/merged) such that the skill's framing would need to change —
  maintainer decision.

## Maintenance notes

- The model catalog churns monthly; quarterly refreshes should re-diff the
  provider sections first — it's the highest-drift content in the repo.
- Soft link to plan 005: the new Python skill (sap-cloud-sdk-ai-python)
  should point its platform-level questions at these refreshed references;
  if 005 lands after this plan, no extra work — its Related Skills section
  already references sap-ai-core.
- Reviewer should scrutinize: that deprecated models are marked rather than
  deleted, and that `production_tested` wording wasn't inflated.
- Deferred: re-testing examples against a live AI Core tenant (the metadata
  wording deliberately claims documentation-verification only).
