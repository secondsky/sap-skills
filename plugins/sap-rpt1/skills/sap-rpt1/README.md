# SAP-RPT-1-OSS FI/CO Predictor

Source-verified local SAP-RPT-1-OSS workflow guidance for FI/CO prototype tabular prediction datasets.

## Capability Index

| Capability | Status |
|------------|--------|
| Commands | 2: `/rpt1-fico-prepare`, `/rpt1-fico-predict` |
| Agents | 0 |
| Hooks | No |
| MCP | No |
| LSP | No |
| Source Freshness | `last_verified`: 2026-06-18; public source/model/product-page review only. |
| Verification | Local model execution, hosted API, live tenant, and production finance workflow validation pending. |

Use this skill for:

- FI-AR payment default and late-payment risk experiments.
- FI-AP cash discount leakage and payment timing risk experiments.
- FI-GL journal anomaly and unusual posting risk experiments.
- CSV schema review, semantic finance column naming, target leakage checks, and governance review.

Do not use this skill as a hosted SAP-RPT API client, production finance approval workflow, or live SAP extractor.

Primary resources:

- `SKILL.md`
- `references/fico-use-cases.md`
- `references/data-governance.md`
- `references/source-review-2026-06-18.md`
- `scripts/fico_data_prep.py`
- `scripts/rpt1_oss_predict.py`
