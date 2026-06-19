# Data Governance Checklist

## Sources

Derived summary for FI/CO prototype workflow governance. Validate against the customer's data protection, finance control, and AI governance requirements before using real data.

## Required Before Using Real FI/CO Data

- Confirm business owner approval.
- Confirm legal/compliance approval for the intended experiment.
- Use synthetic data for examples and demos.
- Minimize exported fields.
- Remove or mask personal data.
- Remove or mask bank details, payment references, free-text fields, and sensitive commercial terms.
- Do not include secrets, SAP connection strings, credentials, or access tokens.
- Define an as-of date for every prediction target.
- Use time-based train/validation/test splits.
- Document target definition and label creation.
- Document excluded leakage fields.
- Validate model behavior with finance and control owners.
- Keep human review in the decision loop.
- Do not use predictions as the sole basis for payment blocking, credit decisions, collections action, write-offs, audit conclusions, or control sign-off.
- Record retention, access, and deletion controls.
- Record known limitations and unverified assumptions.

## Minimum Model Card Notes for Local Experiments

- Data source and extraction date.
- Prediction point.
- Target definition.
- Feature cutoff logic.
- Validation split logic.
- Metrics by company code or controlling area where applicable.
- Known bias or coverage gaps.
- Human review workflow.
- License/access assumptions.
- Whether live SAP tenant/system validation was performed.

## Review Questions

- Was every feature known at the prediction point?
- Was any downstream decision, clearing status, payment result, reversal, or audit outcome included as a feature?
- Can the finance owner explain the target and intended action?
- Are sample rows synthetic or approved masked data?
- Is the output used for prioritization and review rather than automatic decisioning?
