# QuerySpec v1 (revision 1.1)

## Required fields

- `version`: exactly `1`.
- `target`: `system`, three-digit `client`, Eclipse `project`, and provider technical name.
- `technicalName`: a brand-new uppercase BW query name.
- `axes.rows` and `axes.columns`: characteristics, structures, formulas, or key figures by technical name.
- `businessPurpose`: the decision or analysis the query supports.
- `acceptanceCriteria`: measurable reconciliation/output checks.
- `evidence`: specification or control-total references; an empty array is allowed but reported as a gap.

Every object is closed: unknown properties are rejected. Credential-like keys are rejected before validation.

## Optional element definitions (revision 1.1)

Revision 1.1 replaces the former empty placeholder objects with real shapes. `version`
stays `1`; existing v1 specs remain valid with one deliberate tightening: a `keyFigures`
entry now requires `technicalName` (an empty `{}` entry was previously accepted but
meaningless). Enum literal values mirror the BWMT 1.27.36 EEnums recorded in
`bwmt-api-map.md`; the Eclipse-side builder re-verifies each literal against the live
`QueryPackage` before applying it.

| Field | Shape |
| --- | --- |
| `keyFigures[]` | `technicalName` (required), `kind` = `basic\|restricted\|calculated\|formula`, `description`, `baseKeyFigure` + `restrictions[]` (restricted), `formula.expression` + `formula.operands[]` (calculated/formula), `aggregation.exception`/`referenceCharacteristic`, `display.decimals`/`scaling`/`emphasize`/`hidden` |
| `keyFigures[].restrictions[]` | `characteristic` (required), `operator` (`EQUAL`, `NOT_EQUAL`, `LESS_THAN`, `GREATER_THAN`, `LESS_EQUAL`, `GREATER_EQUAL`, `BETWEEN`, `NOT_BETWEEN`, `CONTAINS_PATTERN`, `NOT_PATTERN`), `values[]` or `variable`, `high`, `excluding` |
| `structures[]` | `technicalName` (required), `kind` = `keyFigure\|characteristic`, `members[]` (required, non-empty; provider key figures, `keyFigures` entries, or `formulas` entries by name). A structure must also be placed on an axis with `kind: "structure"` |
| `hierarchies[]` | `characteristic` + `hierarchyName` (required), `version`, `displayLevel`, `expandToLevel` |
| `formulas[]` | `technicalName` + `expression` (required), `description`, `exceptionAggregation`, `referenceCharacteristic` |
| `conditions[]` | `keyFigure` + `operator` + `threshold` (required), `thresholdHigh` (required for `BETWEEN`/`NOT_BETWEEN`), `characteristics[]`, `active`. Operators: `EQUAL`, `NOT_EQUAL_TO`, `LESS_THAN`, `GREATER_THAN`, `LESS_EQUAL`, `GREATER_EQUAL`, `BETWEEN`, `NOT_BETWEEN`, `TOP_N`, `BOTTOM_N`, `TOP`, `BOTTOM`, `TOP_SUM`, `BOTTOM_SUM` |
| `exceptions[]` | `alertLevel` + `operator` + `threshold` (required), `keyFigure`, `thresholdHigh`, `affectsDataCells`, `active`. Alert levels `GOOD1`–`GOOD3`, `CRITICAL1`–`CRITICAL3`, `BAD1`–`BAD3` |
| `display` | `zeroSuppression.rows`/`columns` (booleans) + `zeroSuppression.mode` (`FOR_RESULTS_ONLY`\|`FOR_ALL_VALUES`), `suppressRepeatedKeyValues`, `signPresentation`, `resultPosition` |
| `aggregation` | `confirmed` (boolean), `notes` |
| `variables[]` | `technicalName` (required), `value`/`defaultValue`/`binding`, `characteristic`, `processingType`, `representation`, `readyForInput` |

Cross-reference rules (validation errors): axis technical names must be unique; an axis
element with `kind: "structure"`/`"formula"` must match a `structures`/`formulas`
definition; every defined structure must be placed on an axis; `conditions`/`exceptions`
must reference a key figure that is on an axis or defined in `keyFigures`/`formulas`;
a restricted key figure needs `baseKeyFigure` and at least one restriction; each
restriction needs `values` or a `variable`.

## Metadata-verified validation

`bw_resolve_and_validate_spec` accepts an optional `alias`. When supplied, the handler
fetches InfoProvider metadata through `bw_describe_provider` (read-only) and verifies
every referenced name against the provider. The result then carries
`metadataChecked: true` and `readyForDraft` reflects blocking gaps.

## Gap codes

| Code | Severity | Meaning | Resolution |
| --- | --- | --- | --- |
| `UNKNOWN_CHARACTERISTIC` | blocking | Name is not a characteristic of the provider | Use a provider characteristic (see `bw_describe_provider`) |
| `UNKNOWN_KEY_FIGURE` | blocking | Name is not a provider key figure or local definition | Use a provider key figure or define it under `keyFigures`/`formulas` |
| `FILTER_ON_KEY_FIGURE` | blocking | Filter targets a key figure | Filter on characteristics; restrict key figures via `keyFigures[].restrictions` |
| `KEY_FIGURE_AS_CHARACTERISTIC` | blocking | Key figure used where a characteristic is required | Correct the element kind or name |
| `HIERARCHY_UNAVAILABLE` | blocking | Characteristic has no hierarchies in the provider | Remove the hierarchy or pick a hierarchy-bearing characteristic |
| `AMBIGUOUS_FILTER` | warning | Characteristic/operator/value range is incomplete | Supply exact inclusions, exclusions, intervals, and variable bindings |
| `UNDEFINED_VARIABLE` | warning | No value, default, or runtime binding | Define prompt/default/binding behavior |
| `MISSING_ACCEPTANCE_CRITERIA` | warning | Result cannot be objectively checked | Add control totals and expected layout/variable cases |
| `AGGREGATION_UNSPECIFIED` | info | Provider default may not match business logic | Confirm exception/local aggregation |
| `MISSING_EVIDENCE` | info | No traceable source/control reference | Add approved specification and reconciliation evidence |
| `METADATA_UNAVAILABLE` | info | Names were not verified against the provider | Rerun validation with `alias` while the studio is connected |

`readyForDraft` is `true` only when the spec is valid and no blocking gap remains.
`HIGH_AXIS_CARDINALITY` is a semantics-preserving layout suggestion only when moving optional drilldowns to the free axis. `UNRESTRICTED_PROVIDER` is semantics-changing and always requires user approval.

## Example with a restricted key figure, structure, and zero suppression

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
    "columns": [{ "technicalName": "ZSTR_SALES", "kind": "structure" }]
  },
  "structures": [
    { "technicalName": "ZSTR_SALES", "kind": "keyFigure", "members": ["0NETSALES", "ZRK_SALES_DE"] }
  ],
  "keyFigures": [
    {
      "technicalName": "ZRK_SALES_DE",
      "kind": "restricted",
      "description": "Net sales Germany",
      "baseKeyFigure": "0NETSALES",
      "restrictions": [{ "characteristic": "0COUNTRY", "operator": "EQUAL", "values": ["DE"] }]
    }
  ],
  "filters": [{ "characteristic": "0CALMONTH", "operator": "EQ", "value": "202607" }],
  "display": { "zeroSuppression": { "rows": true, "columns": false, "mode": "FOR_ALL_VALUES" } },
  "businessPurpose": "Reconcile monthly net sales by customer with a Germany split",
  "acceptanceCriteria": ["Net sales reconcile to the approved July control total"],
  "evidence": [{ "source": "Approved query specification", "reference": "BW-SALES-2026-07", "checkedAt": "2026-07-13" }]
}
```

Do not add authentication data to this document or any QuerySpec.

## Sources

- QuerySpec v1 is the repository-defined automation contract; its schema and gap rules are implemented in `mcp/src/query-spec.mjs` and covered by executable tests.
- Enum literal values derive from the javap-verified BWMT 1.27.36 EEnums documented in `bwmt-api-map.md`.
