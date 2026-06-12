---
status: complete
priority: p3
issue_id: "006"
tags: [sap-datasphere, documentation, enhancement]
dependencies: []
---

# Clean Up SAP Datasphere Bundled Resource Inventory

## Problem Statement

The Datasphere skill's bundled resource list duplicates the newly added 2026/BDC references and has numbering that jumps backward. Its README also says there are 4 slash commands even though the plugin has 5. This is not a runtime bug, but it makes the skill inventory less trustworthy for users and maintainers.

## Findings

- [plugins/sap-datasphere/skills/sap-datasphere/SKILL.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/SKILL.md:598) lists `references/whats-new-2026.md`.
- [plugins/sap-datasphere/skills/sap-datasphere/SKILL.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/SKILL.md:601) lists `references/business-data-cloud.md`.
- [plugins/sap-datasphere/skills/sap-datasphere/SKILL.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/SKILL.md:604) restarts numbering at 14 under MCP Integration.
- [plugins/sap-datasphere/skills/sap-datasphere/SKILL.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/SKILL.md:606) and [plugins/sap-datasphere/skills/sap-datasphere/SKILL.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/SKILL.md:607) list the same two new references again.
- [plugins/sap-datasphere/skills/sap-datasphere/README.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/README.md:3) says 4 slash commands, while `find plugins/sap-datasphere/commands -name '*.md'` counts 5.

## Proposed Solutions

1. Deduplicate the resource list and renumber it 1 through 17.
   - Pros: Minimal cleanup, preserves the current inventory style.
   - Cons: Manual numbering can drift again.
2. Use bullets instead of numbered lists for grouped resource inventories.
   - Pros: Avoids future renumbering errors.
   - Cons: Slight style change from nearby skills.

## Recommended Action

Use option 2 if consistent with repo style; otherwise use option 1 and add a quick reviewer check for duplicate `references/*.md` entries.

## Acceptance Criteria

- [x] Each Datasphere reference file appears once in the bundled resource inventory.
- [x] The inventory no longer has duplicated numbers.
- [x] The README component count says 5 slash commands.
- [x] The Datasphere reference count remains 17.

## Work Log

### 2026-06-12 - Review Finding

**By:** Codex

**Actions:**
- Cross-checked SKILL.md reference mentions against actual reference files.
- Counted command files under `plugins/sap-datasphere/commands`.

**Learnings:**
- The new reference files exist and are linked, but the surrounding inventory text needs cleanup.

### 2026-06-12 - Implementation and Review

**By:** Codex

**Actions:**
- Removed duplicate Datasphere resource inventory entries and renumbered MCP Integration entries to 16 and 17.
- Updated the Datasphere README summary and command lists to include 5 slash commands and `/datasphere-mcp-tools`.
- Ran `find plugins/sap-datasphere/skills/sap-datasphere/references -name '*.md' | wc -l`, which returned 17.
- Ran `find plugins/sap-datasphere/commands -name '*.md' | sort` and confirmed 5 command files.

**Learnings:**
- The existing numbered-list style could be preserved safely once the duplicate entries were removed.
