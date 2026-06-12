---
status: complete
priority: p3
issue_id: "007"
tags: [docs, repository, enhancement]
dependencies: []
---

# Refresh Stale Repository Guidance Counts

## Problem Statement

The top-level project guidance partially updated plugin counts to 35, but some category and generator counts still reflect the older inventory. This can mislead future contributors when they use `CLAUDE.md` as the source of truth.

## Findings

- [CLAUDE.md](/Users/eddie/github-repos/sap-skills/CLAUDE.md:92) correctly says 35 plugins.
- [CLAUDE.md](/Users/eddie/github-repos/sap-skills/CLAUDE.md:99) still says SAP BTP Platform has 14 skills, while [README.md](/Users/eddie/github-repos/sap-skills/README.md:89) lists SAP BTP Platform as 15.
- [CLAUDE.md](/Users/eddie/github-repos/sap-skills/CLAUDE.md:102) still says Core Technologies has 7 skills, while [README.md](/Users/eddie/github-repos/sap-skills/README.md:128) lists Core Technologies as 8.
- [CLAUDE.md](/Users/eddie/github-repos/sap-skills/CLAUDE.md:113) says `generate-marketplace.sh` aggregates 34 root plugin manifests, but `./scripts/validate-inventory.sh` reports 35 root plugin manifests and 35 marketplace plugins.

## Proposed Solutions

1. Update the stale counts in `CLAUDE.md`.
   - Pros: Fast and correct.
   - Cons: Counts can drift again.
2. Replace category counts with wording that points to `README.md` or `validate-inventory.sh`.
   - Pros: Reduces duplicated inventory facts.
   - Cons: Less immediately informative.

## Recommended Action

Use option 2 where possible, because the repo already has generated/validated inventory sources.

## Acceptance Criteria

- [x] `CLAUDE.md` no longer conflicts with `README.md` and `validate-inventory.sh`.
- [x] BTP/Core category counts are either correct or removed from duplicated prose.
- [x] The generator description does not state 34 root manifests.

## Work Log

### 2026-06-12 - Review Finding

**By:** Codex

**Actions:**
- Compared `CLAUDE.md` counts with `README.md`.
- Ran `./scripts/validate-inventory.sh`.

**Learnings:**
- Validation inventory is correct; only hand-maintained guidance text drifted.

### 2026-06-12 - Implementation and Review

**By:** Codex

**Actions:**
- Replaced duplicated category counts in `CLAUDE.md` with pointers to `README.md` and `./scripts/validate-inventory.sh`.
- Removed the stale `34 root plugin manifests` wording from the marketplace generator description.
- Ran `./scripts/validate-inventory.sh`; it reported 35 plugins, 35 root plugin manifests, 0 nested manifests, and 35 marketplace plugins.
- Ran targeted `rg` for stale category counts and `34 root` wording.

**Learnings:**
- Pointing maintainers to validated inventory sources should reduce future count drift in top-level guidance.
