---
status: complete
priority: p1
issue_id: "001"
tags: [validation, marketplace, sap-ai-core]
dependencies: []
---

# Remove Reserved Word From SAP AI Core Marketplace Metadata

## Problem Statement

`npm run validate` fails because the regenerated SAP AI Core manifest and marketplace entry contain the reserved word `Claude` in the plugin description. This blocks the repository validation suite and violates the reserved words policy in `CLAUDE.md`.

## Findings

- `npm run validate` exits 1 during `./scripts/validate-reserved-words.sh`.
- [plugins/sap-ai-core/.claude-plugin/plugin.json](/Users/eddie/github-repos/sap-skills/plugins/sap-ai-core/.claude-plugin/plugin.json:3) contains `Claude 4.5/4.7 Opus/Sonnet` in the generated description.
- [plugins/sap-ai-core/skills/sap-ai-core/SKILL.md](/Users/eddie/github-repos/sap-skills/plugins/sap-ai-core/skills/sap-ai-core/SKILL.md:4) is the source description, so regenerating manifests will reintroduce the failure until this source is changed.
- [.claude-plugin/marketplace.json](/Users/eddie/github-repos/sap-skills/.claude-plugin/marketplace.json:85) contains the same generated description.

## Proposed Solutions

1. Replace the provider-specific model text with a generic phrase such as `Anthropic model families`.
   - Pros: Keeps the description stable and passes validation.
   - Cons: Less specific than naming individual model families.
2. Remove model-family names from the frontmatter description and leave specifics in reference docs.
   - Pros: Avoids future marketplace validation and model-drift issues.
   - Cons: Slightly less searchable in marketplace metadata.

## Recommended Action

Use option 2. Keep marketplace/plugin descriptions concise and move volatile model inventory into `references/model-providers.md`, where SAP Note 3437766 and model discovery guidance already belong.

## Acceptance Criteria

- [x] `plugins/sap-ai-core/skills/sap-ai-core/SKILL.md` frontmatter description contains no reserved words.
- [x] `./scripts/sync-plugins.sh` regenerates `plugins/sap-ai-core/.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` without reintroducing the word.
- [x] `npm run validate` passes the reserved-word step.

## Work Log

### 2026-06-12 - Review Finding

**By:** Codex

**Actions:**
- Ran `npm run validate`.
- Confirmed schema validation passed, then reserved-word validation failed on SAP AI Core manifest and marketplace description.

**Learnings:**
- The source of the generated failure is the SAP AI Core SKILL.md frontmatter, not only the generated JSON files.

### 2026-06-12 - Implementation and Review

**By:** Codex

**Actions:**
- Removed provider-specific model inventory containing a reserved marketplace word from `plugins/sap-ai-core/skills/sap-ai-core/SKILL.md` frontmatter.
- Ran `./scripts/sync-plugins.sh --dry-run`, then `./scripts/sync-plugins.sh` to regenerate SAP AI Core plugin metadata and marketplace metadata.
- Reviewed generated diffs in `plugins/sap-ai-core/.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`.
- Ran `./scripts/validate-reserved-words.sh` and confirmed generated metadata passes.

**Learnings:**
- The clean source description regenerates clean plugin and marketplace descriptions; no hand-editing of generated JSON was needed.
