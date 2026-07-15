# QuerySpec v1

## Required fields

- `version`: exactly `1`.
- `target`: `system`, three-digit `client`, Eclipse `project`, and provider technical name.
- `technicalName`: a brand-new uppercase BW query name.
- `axes.rows` and `axes.columns`: characteristics, structures, formulas, or key figures by technical name.
- `businessPurpose`: the decision or analysis the query supports.
- `acceptanceCriteria`: measurable reconciliation/output checks.
- `evidence`: specification or control-total references; an empty array is allowed but reported as a gap.

Optional fields cover description, free axis, key figures, filters, variables, hierarchies, formulas, conditions, exceptions, display, and aggregation.

Every object is closed: unknown properties are rejected. Credential-like keys are rejected before validation.

## Gap codes

| Code | Meaning | Resolution |
| --- | --- | --- |
| `AMBIGUOUS_FILTER` | Characteristic/operator/value range is incomplete | Supply exact inclusions, exclusions, intervals, and variable bindings |
| `UNDEFINED_VARIABLE` | No value, default, or runtime binding | Define prompt/default/binding behavior |
| `MISSING_ACCEPTANCE_CRITERIA` | Result cannot be objectively checked | Add control totals and expected layout/variable cases |
| `AGGREGATION_UNSPECIFIED` | Provider default may not match business logic | Confirm exception/local aggregation |
| `MISSING_EVIDENCE` | No traceable source/control reference | Add approved specification and reconciliation evidence |

`HIGH_AXIS_CARDINALITY` is a semantics-preserving layout suggestion only when moving optional drilldowns to the free axis. `UNRESTRICTED_PROVIDER` is semantics-changing and always requires user approval.

## Minimal example

```json
{
  "version": 1,
  "target": {
    "system": "BWD",
    "client": "100",
    "project": "BWD_100",
    "provider": "ZCUBE_SALES"
  },
  "technicalName": "Z_SALES_MONTHLY_NEW",
  "axes": {
    "rows": [{ "technicalName": "0CUSTOMER", "kind": "characteristic" }],
    "columns": [{ "technicalName": "0NETSALES", "kind": "keyFigure" }]
  },
  "filters": [{ "characteristic": "0CALMONTH", "operator": "EQ", "value": "202607" }],
  "businessPurpose": "Reconcile monthly net sales by customer",
  "acceptanceCriteria": ["Net sales reconcile to the approved July control total"],
  "evidence": [{ "source": "Approved query specification", "reference": "BW-SALES-2026-07", "checkedAt": "2026-07-13" }]
}
```

Do not add authentication data to this document or any QuerySpec.

## Sources

- QuerySpec v1 is the repository-defined automation contract; its schema and gap rules are implemented in `mcp/src/query-spec.mjs` and covered by executable tests.
