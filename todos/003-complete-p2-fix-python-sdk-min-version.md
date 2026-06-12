---
status: complete
priority: p2
issue_id: "003"
tags: [sap-cloud-sdk-ai-python, python, correctness]
dependencies: []
---

# Fix SAP Cloud SDK for AI Python Minimum Version

## Problem Statement

The Python SDK skill says `sap-ai-sdk-gen` supports Python 3.8+, but current PyPI metadata for `sap-ai-sdk-gen` 6.10.0 requires Python `>=3.9`. Users on Python 3.8 would be guided into an unsupported install path.

## Findings

- `curl -fsSL https://pypi.org/pypi/sap-ai-sdk-gen/json | jq -r '.info.requires_python'` returned `>=3.9`.
- [plugins/sap-cloud-sdk-ai-python/skills/sap-cloud-sdk-ai-python/references/getting-started-auth.md](/Users/eddie/github-repos/sap-skills/plugins/sap-cloud-sdk-ai-python/skills/sap-cloud-sdk-ai-python/references/getting-started-auth.md:41) says the SDK requires Python 3.8+.
- [plugins/sap-cloud-sdk-ai-python/skills/sap-cloud-sdk-ai-python/references/troubleshooting.md](/Users/eddie/github-repos/sap-skills/plugins/sap-cloud-sdk-ai-python/skills/sap-cloud-sdk-ai-python/references/troubleshooting.md:241) lists 6.10.0 as Python 3.8+.
- [plugins/sap-cloud-sdk-ai-python/skills/sap-cloud-sdk-ai-python/references/troubleshooting.md](/Users/eddie/github-repos/sap-skills/plugins/sap-cloud-sdk-ai-python/skills/sap-cloud-sdk-ai-python/references/troubleshooting.md:242) lists 6.x as Python 3.8+.

## Proposed Solutions

1. Update all 6.x/6.10.0 guidance to Python 3.9+.
   - Pros: Matches PyPI and avoids unsupported environments.
   - Cons: Does not document older package compatibility.
2. Add a compatibility table that distinguishes old `generative-ai-hub-sdk` from new `sap-ai-sdk-gen`.
   - Pros: Helpful for migrations.
   - Cons: More content to maintain.

## Recommended Action

Use option 1 now. Add older-package compatibility only if users actually need migration support for Python 3.8 projects.

## Acceptance Criteria

- [x] All `sap-ai-sdk-gen` 6.x references state Python 3.9+ or `>=3.9`.
- [x] No changed Python SDK reference claims 6.x/6.10.0 supports Python 3.8+.
- [x] The package metadata check against PyPI is documented in the work log or source notes.

## Work Log

### 2026-06-12 - Review Finding

**By:** Codex

**Actions:**
- Queried PyPI JSON metadata for `sap-ai-sdk-gen`.
- Searched the Python skill for Python version claims.

**Learnings:**
- The package rename guidance is correct, but the minimum Python version drifted from the current package metadata.

### 2026-06-12 - Implementation and Review

**By:** Codex

**Actions:**
- Updated `getting-started-auth.md` and `troubleshooting.md` so current `sap-ai-sdk-gen` 6.x guidance says Python 3.9+.
- Ran `curl -fsSL https://pypi.org/pypi/sap-ai-sdk-gen/json | jq -r '.info.version, .info.requires_python'`, which returned `6.10.0` and `>=3.9`.
- Ran the targeted stale 3.8 grep; only the unchanged 5.x compatibility row still mentions 3.8+.

**Learnings:**
- The 5.x row remains intentionally unchanged because this todo only verified current 6.x package metadata.
