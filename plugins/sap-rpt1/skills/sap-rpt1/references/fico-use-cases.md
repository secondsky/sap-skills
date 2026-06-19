# FI/CO Use Cases for SAP-RPT-1-OSS

## Sources

Derived from public SAP-RPT-1-OSS source/model review and general SAP FI/CO table knowledge. Validate all table and field choices against the target SAP release and customer configuration before using real data.

## Scope

This reference provides FI/CO tabular prediction patterns for prototype and research workflows. It is not an extractor, production scoring service, hosted API client, or compliance approval workflow.

## Use-Case Matrix

| Area | Use case | Typical target | Common S/4HANA starting points | ECC fallback starting points | Leakage warning |
|------|----------|----------------|---------------------------------|------------------------------|-----------------|
| FI-AR | Payment default / late payment | `paid_late`, `days_late`, `default_flag` | ACDOCA, customer master, clearing/payment extracts | BSID, BSAD, BKPF, BSEG, KNA1 | Do not use fields updated after due date or clearing. |
| FI-AP | Payment block / payment timing | `blocked_at_payrun`, `late_payment` | ACDOCA, vendor master, payment proposal extracts | BSIK, BSAK, BKPF, BSEG, LFA1 | Do not use later payment-run decisions as features. |
| FI-AP | Cash discount leakage | `discount_lost`, `discount_amount_lost` | ACDOCA, payment terms, baseline/due-date fields | BSIK, BSAK, BKPF, BSEG, LFB1 | Do not use final clearing/payment date if predicting before payment. |
| FI-GL | Journal anomaly | `manual_review_flag`, `reversal_flag`, `outlier_flag` | ACDOCA, journal header metadata | BKPF, BSEG, SKA1, SKB1 | Do not train on later audit decisions unless time-split. |
| CO | Cost center overrun | `overrun_flag`, `overrun_amount` | Universal journal actuals plus plan/budget extracts | COEP, COSS, COSP, CSKS, CSKT | Do not use actuals posted after the forecast date. |
| CO | Internal order overrun | `overrun_flag`, `remaining_budget_risk` | Universal journal actuals plus order/budget extracts | COEP, AUFK, BPGE, BPJA | Do not use final settlement outcomes as pre-period features. |
| CO/PS | Project budget overrun | `overrun_flag`, `estimate_at_completion_error` | Universal journal actuals plus project/budget extracts | PRPS, PROJ, COEP, BPGE, BPJA | Do not use later milestone or settlement status. |
| CO-PA | Profitability / margin anomaly | `margin_anomaly_flag`, `low_margin_flag` | Margin/profitability extracts plus ACDOCA | CE1*, CE2*, CE3*, CE4* by operating concern | Do not use final period adjustments for earlier prediction points. |
| Treasury/FI | Cash forecast risk | `cash_shortfall_flag`, `forecast_error` | AR/AP open items, bank/cash extracts | AR/AP open item tables plus bank statement extracts | Do not use actual cash movements after forecast date. |
| FI-AR | Dispute risk | `dispute_created`, `dispute_escalated` | AR open items plus dispute extracts | AR open items plus FSCM/dispute extracts if available | Do not use dispute resolution data as pre-dispute features. |
| FI-AR/Credit | Credit risk | `credit_block`, `default_flag`, `risk_class_change` | AR history plus credit exposure extracts | AR open/cleared items plus credit master/exposure extracts | Do not use future block decisions or collection outcomes. |

## Detailed Recipe: FI-AR Payment Default

### Prediction Point

Use invoice state as of a defined date before or on due date. State whether the score is created at posting, before due date, after due date, or before collections review.

### Candidate Target

- `paid_late`
- `days_late`
- `default_flag`

### Candidate Features

- Company code.
- Customer account group or risk segment.
- Payment terms.
- Document type.
- Baseline date bucket.
- Due date bucket.
- Invoice amount bucket.
- Currency-normalized amount.
- Historical customer delay rate calculated only from prior invoices.
- Prior dispute count calculated only before the as-of date.
- Prior dunning count calculated only before the as-of date.

### Leakage-Prone Fields

- Clearing date after due date.
- Clearing document.
- Final payment status.
- Dunning level assigned after the prediction point.
- Dispute resolution status.
- Collection outcome.
- Write-off indicator created after the prediction point.

### Minimum Validation

Use a time-based split. Compare metrics by company code and customer segment. Review false positives with finance owners before treating any score as actionable.

## Detailed Recipe: FI-AP Cash Discount Leakage

### Prediction Point

Use invoice state at posting time, approval time, or before payment proposal. Do not mix prediction points in the same dataset unless each row has an explicit as-of timestamp.

### Candidate Target

- `discount_lost`
- `discount_amount_lost`

### Candidate Features

- Vendor account group or risk segment.
- Payment terms.
- Baseline date bucket.
- Discount window days.
- Invoice approval age.
- Amount bucket.
- Company code.
- Purchasing group if available before the prediction point.
- Historical vendor processing delay calculated only from prior invoices.

### Leakage-Prone Fields

- Actual clearing date if prediction is before payment.
- Payment run result.
- Final cash discount taken or lost amount.
- Later payment block changes.
- Reversal or correction postings after prediction point.

### Minimum Validation

Use historical periods for training and later periods for validation. Review results by company code, vendor group, and payment terms.

## Detailed Recipe: FI-GL Journal Anomaly

### Prediction Point

Use journal state at posting time or before period close review. Record whether the target is rule-generated, auditor-labeled, or generated from later reversals.

### Candidate Target

- `manual_review_flag`
- `reversal_flag`
- `outlier_flag`

### Candidate Features

- Company code.
- Ledger.
- Fiscal period.
- Document type.
- Posting key pattern.
- Account group.
- Amount bucket.
- Manual vs interface origin if available at posting time.
- Posting time and posting day pattern.
- Sanitized text/category features only when approved.

### Leakage-Prone Fields

- Later reversal document.
- Audit decision.
- Manual investigation notes.
- Period-close adjustment flags created after posting.
- Workflow approval outcome if not known at prediction point.

### Minimum Validation

Use time-based validation and review by document type, account group, posting origin, and company code. Treat scores as review prioritization only.
