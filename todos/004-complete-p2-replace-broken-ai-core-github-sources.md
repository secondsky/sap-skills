---
status: complete
priority: p2
issue_id: "004"
tags: [sap-ai-core, documentation, citations]
dependencies: []
---

# Replace Broken SAP AI Core GitHub Source Links

## Problem Statement

Updated SAP AI Core references cite a `SAP-docs/sap-artificial-intelligence` GitHub markdown mirror for SAP AI Core pages, but spot-checked links return 404. The plan README explicitly warned that no plain GitHub markdown mirror exists for SAP AI Core documentation, so these citations are unreliable for future reviewers and users.

## Findings

- [plans/README.md](/Users/eddie/github-repos/sap-skills/plans/README.md:52) states no GitHub markdown mirror exists for SAC or AI Core documentation.
- [plugins/sap-ai-core/skills/sap-ai-core/references/model-providers.md](/Users/eddie/github-repos/sap-skills/plugins/sap-ai-core/skills/sap-ai-core/references/model-providers.md:460) links `supported-models-509e588.md`; `curl -L -s -o /dev/null -w '%{http_code}'` returned `404`.
- [plugins/sap-ai-core/skills/sap-ai-core/references/model-providers.md](/Users/eddie/github-repos/sap-skills/plugins/sap-ai-core/skills/sap-ai-core/references/model-providers.md:461) links `generative-ai-hub-7db524e.md`; the same check returned `404`.
- [plugins/sap-ai-core/skills/sap-ai-core/references/generative-ai-hub.md](/Users/eddie/github-repos/sap-skills/plugins/sap-ai-core/skills/sap-ai-core/references/generative-ai-hub.md:496) and [plugins/sap-ai-core/skills/sap-ai-core/references/generative-ai-hub.md](/Users/eddie/github-repos/sap-skills/plugins/sap-ai-core/skills/sap-ai-core/references/generative-ai-hub.md:497) repeat the broken links.
- Firecrawl scrape of `https://help.sap.com/docs/sap-ai-core/generative-ai/supported-models` succeeded and returned the current supported-models guidance.

## Proposed Solutions

1. Replace broken GitHub mirror links with canonical `help.sap.com/docs/sap-ai-core/...` URLs.
   - Pros: Matches the accessible source used during review.
   - Cons: Requires Firecrawl-class tooling for future plain-text extraction.
2. Remove per-page source links and cite only SAP Help Portal plus SAP Note 3437766.
   - Pros: Less risk of page slug churn.
   - Cons: Less direct for readers who want a specific source.

## Recommended Action

Use option 1. Keep direct SAP Help URLs and note that JS-rendered pages require Firecrawl or equivalent tooling for extraction.

## Acceptance Criteria

- [x] The updated `sap-ai-core` references no longer cite 404 GitHub mirror URLs for SAP AI Core pages.
- [x] The references cite canonical SAP Help URLs and SAP Note 3437766 where model availability/rates are discussed.
- [x] A spot-check of the replacement URLs returns usable content via Firecrawl or HTTP status checks.

## Work Log

### 2026-06-12 - Review Finding

**By:** Codex

**Actions:**
- Searched changed SAP AI Core references for GitHub mirror citations.
- Spot-checked representative GitHub links with `curl`.
- Scraped the canonical SAP Help supported-models page with Firecrawl.

**Learnings:**
- The content itself includes the right model discovery endpoint, but its source links point at a non-existent mirror.

### 2026-06-12 - Implementation and Review

**By:** Codex

**Actions:**
- Replaced broken SAP AI Core GitHub mirror links in `model-providers.md` and `generative-ai-hub.md` with canonical SAP Help URLs.
- Kept SAP Note 3437766 references for token rates, limits, and deprecation details.
- Ran `rg` for the broken URL slugs and mirror repository across the edited files; it returned no matches.
- Spot-checked both SAP Help replacement URLs with `curl -L -I`; both returned HTTP 200.

**Learnings:**
- SAP Help pages return a JS shell over plain HTTP, so future content extraction may still need browser or Firecrawl-style tooling.
