---
name: sap-rpt1
description: |
  SAP-RPT-1-OSS local tabular prediction workflows for FI/CO prototype datasets.
  Use when preparing SAP finance CSV exports for classification or regression
  experiments with source-verified setup, leakage checks, and governance review.
license: GPL-3.0
allowed-tools:
  - Read
  - Bash
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.4.0"
  model_source: "SAP/sap-rpt-1-oss"
  python_version: "3.11"
  last_verified: "2026-06-18"
  requires_huggingface_login: true
  verification_scope: "public source/model/product-page review only"
---

# SAP-RPT-1-OSS FI/CO Predictor Skill

Use SAP-RPT-1-OSS for local, source-reviewed tabular prediction experiments on FI/CO CSV extracts. Keep this skill scoped to prototype and research workflows; do not present predictions as production finance, credit, audit, payment, or compliance decisions.

## When to Use This Skill

Use this skill when preparing or reviewing SAP finance tabular data for local SAP-RPT-1-OSS experiments, especially:

- FI-AR payment default or late-payment risk classification/regression.
- FI-AP cash discount leakage or payment timing risk prediction.
- FI-GL journal anomaly or unusual posting review prioritization.
- Time-safe feature preparation, target leakage checks, and governance review for FI/CO CSV datasets.
- Local SAP-RPT-1-OSS setup planning where Hugging Face access, Python 3.11, and GPU limits need to be explained before execution.

Do not use this skill as a hosted SAP-RPT API integration guide, production scoring service, SAP AI Core deployment guide, or live SAP extraction workflow.

## Quick Start

1. Confirm the task is a local prototype using synthetic or approved masked FI/CO CSV data.
2. Read `references/data-governance.md` before touching real finance data.
3. Choose one prediction point and one target column. Define what was known at that point in time.
4. Select the Python executable from an approved Python 3.11 environment. On Windows this might be `py -3.11` or `.venv\Scripts\python.exe`; on macOS/Linux this might be `python3.11` or `.venv/bin/python`.
5. Use `scripts/fico_data_prep.py --dry-run --input "<file.csv>" --target <column>` to inspect schema and leakage risks.
6. Use `scripts/rpt1_oss_predict.py --dry-run --input "<file.csv>" --target <column>` to review local SAP-RPT-1-OSS prerequisites.
7. Add `--encoding <encoding>` or `--delimiter ';'` when enterprise CSV exports are not UTF-8 comma-delimited.
8. Run local inference only after explicit user request, Hugging Face access, license review, and an explicit output path or stdout mode.

## FI/CO Use-Case Matrix

Detailed v1 recipes live in `references/fico-use-cases.md`.

| Area | V1 depth | Typical target | First reference |
|------|----------|----------------|-----------------|
| FI-AR | Detailed | `paid_late`, `days_late`, `default_flag` | Payment default / late payment |
| FI-AP | Detailed | `discount_lost`, `discount_amount_lost` | Cash discount leakage |
| FI-GL | Detailed | `manual_review_flag`, `reversal_flag`, `outlier_flag` | Journal anomaly |
| CO/PS/CO-PA/FI | Starter only | Overrun, margin, cash, dispute, credit risk | Use-case matrix rows only |

## Data Preparation Patterns

Prefer source extracts already flattened to one row per prediction object, such as one invoice, one vendor invoice, one journal line, or one journal document. Rename technical SAP fields into semantic column names before inference; SAP-RPT-1-OSS uses column names and values as part of the tabular context.

Use S/4HANA starting points such as ACDOCA plus relevant master data and process extracts where available. Use ECC fallback tables only as starting points, not universal truth. Never assume table availability, field semantics, or release behavior without checking the target system.

## Target Leakage Rules

Define the as-of date before selecting features. Exclude fields created or updated after that prediction point.

Common leakage examples:

- Clearing date, clearing document, payment run result, or final payment status when predicting before payment.
- Dunning, dispute, collection, write-off, or audit outcomes created after the prediction point.
- Reversal or investigation flags created after a journal posting.
- Actuals, settlements, or period-close adjustments posted after a forecast date.

## Governance Checklist

Before using real FI/CO data, confirm business owner approval, legal/compliance approval, field minimization, masking of personal and bank-related data, time-based validation splits, documented target definitions, and human review. Use `references/data-governance.md` as the minimum checklist.

Do not use predictions as the sole basis for payment blocking, credit decisions, collections action, write-offs, audit conclusions, or control sign-off.

For Windows, macOS, Linux, and managed non-admin workstations, use `references/enterprise-portability.md` before suggesting setup or execution commands. Prefer user-writable virtual environments, approved cache locations, quoted paths, and explicit output locations.

## Bundled Resources

- `references/source-review-2026-06-18.md`: public source/model/product-page review and open upstream issue list.
- `references/fico-use-cases.md`: detailed FI-AR, FI-AP, and FI-GL recipes plus starter matrix rows.
- `references/data-governance.md`: minimum data governance and model-card checklist.
- `references/enterprise-portability.md`: Windows, macOS, Linux, non-admin, proxy/cache, and CSV export guidance.
- `scripts/fico_data_prep.py`: read-only CSV schema, target, and leakage inspection helper.
- `scripts/rpt1_oss_predict.py`: opt-in local inference wrapper for SAP-RPT-1-OSS.
- `assets/*.csv`: synthetic FI/CO sample datasets only.

## Known Issues

Treat upstream SAP-RPT-1-OSS issues as source-reviewed limitations, not fixed behavior. See `references/source-review-2026-06-18.md` for issue numbers and titles reviewed from `SAP-samples/sap-rpt-1-oss`.

Local inference can download gated model artifacts, populate local caches, require Hugging Face authentication, and require substantial memory. Commands bundled with this plugin must not run inference directly.

## Source and Verification Notes

Sources reviewed: SAP-samples `sap-rpt-1-oss`, Hugging Face `SAP/sap-rpt-1-oss`, and the SAP product page for SAP-RPT.

Verification scope is public source/model/product-page review only. Live SAP tenant validation, live SAP system validation, hosted SAP-RPT API validation, local inference benchmark validation, and production finance workflow validation were not performed.

Product boundary:

- SAP-RPT-1-OSS is the local open model workflow documented here.
- Hosted SAP-RPT-1 playground is product context only and is not bundled as a client.
- SAP-RPT-1.5 is future product context from the 2026-06-18 source review and must not be described as currently available in this skill.

## Related Skills

- **sap-ai-core**: Use for SAP AI Core deployment and runtime architecture patterns.
- **sap-cloud-sdk-ai**: Use for SAP Cloud SDK AI integration patterns and hosted AI service usage.
- **sap-hana-ml**: Use for SAP HANA-native machine learning workflows.
- **sap-sqlscript**: Use for SQLScript-based data extraction and feature preparation.
