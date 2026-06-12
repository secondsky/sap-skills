---
status: complete
priority: p2
issue_id: "005"
tags: [sap-datasphere, business-data-cloud, correctness]
dependencies: []
---

# Correct SAP Business Data Cloud Announcement Date

## Problem Statement

The new Datasphere Business Data Cloud reference says BDC was announced in late 2025, but SAP sources say SAP Business Data Cloud launched with the SAP Business Unleashed event on February 13, 2025. The current wording is factually wrong and may confuse the 2025/2026 chronology.

## Findings

- [plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md](/Users/eddie/github-repos/sap-skills/plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md:5) says BDC was announced in late 2025.
- Firecrawl search found SAP Community result `SAP Business Data Cloud and what it means for SAP Datasphere`, whose description states BDC launched with SAP Business Unleashed on February 13, 2025.
- Firecrawl search found SAP Community `SAP Business Data Cloud - FAQs`, whose description also states BDC launched on February 13, 2025.
- Firecrawl search found SAP News coverage from February 2025 discussing SAP Business Data Cloud and Databricks.

## Proposed Solutions

1. Replace `Announced in late 2025` with `Launched in February 2025`.
   - Pros: Directly corrects the false date.
   - Cons: Does not capture controlled availability nuance.
2. Use fuller wording: `Launched at SAP Business Unleashed on February 13, 2025, with controlled commercial availability expanding through 2025 and 2026`.
   - Pros: More precise and preserves rollout context.
   - Cons: Slightly longer overview sentence.

## Recommended Action

Use option 2 to avoid over-simplifying the launch vs. availability timeline.

## Acceptance Criteria

- [x] `business-data-cloud.md` no longer says BDC was announced in late 2025.
- [x] The replacement wording cites or aligns with SAP's February 13, 2025 launch timeline.
- [x] Related Datasphere/SAC planning references are checked for contradictory BDC launch chronology.

## Work Log

### 2026-06-12 - Review Finding

**By:** Codex

**Actions:**
- Spot-checked the BDC date claim with Firecrawl search restricted to SAP/community domains.
- Located the incorrect local line in the new Datasphere BDC reference.

**Learnings:**
- The BDC technical framing is useful, but the launch date in the overview needs correction.

### 2026-06-12 - Implementation and Review

**By:** Codex

**Actions:**
- Updated the BDC overview in `plugins/sap-datasphere/skills/sap-datasphere/references/business-data-cloud.md` to use the February 13, 2025 SAP Business Unleashed launch timeline with availability nuance.
- Ran targeted `rg` checks for `Announced in late 2025`, `late 2025`, `February 13, 2025`, and `Business Unleashed` across Datasphere skill docs, docs, and plans.
- Verified the only remaining stale phrasing is historical context inside this completed todo record.

**Learnings:**
- The replacement keeps the distinction between launch timing and the later 2025/2026 availability rollout.
