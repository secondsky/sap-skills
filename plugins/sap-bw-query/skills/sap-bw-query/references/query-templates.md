# QuerySpec templates

Starting-point `QuerySpec v1.1` files for the most common BW query shapes. Each template is a
syntactically valid spec that passes `bw_resolve_and_validate_spec` and raises no
warning-severity design-rule finding (BWQ001–BWQ012) as shipped — the values are
`UPPERCASE_PLACEHOLDER` tokens you replace with real provider, characteristic, key figure, and
period names before drafting.

The template files live in `references/query-templates/`.

## How to use a template

1. Copy the template JSON that matches your query shape to a working file.
2. Replace every `UPPERCASE_PLACEHOLDER` token (see each template below and the shared list) with
   real names from the target InfoProvider. Read `references/query-spec-v1.md` for field meaning
   and enum literals; do not add credentials to the file.
3. Review the filled spec with `/bw-query-spec-review <file>` — with a connection `alias` this also
   verifies every name against the provider metadata and returns the `bestPractices` findings.
4. When the review is clean, continue with `/bw-query-draft <file> create` (then `preview`, then
   `prepare-save`). A human confirms and finishes the native wizard; `bw_populate_query_editor`
   then builds the model and the human saves.

Templates model best practice, but they are not tuned to your data: always confirm characteristic
and key figure names, period ranges, and formula aggregation against the provider before saving.

## plan-actual-variance.json

Plan vs actual for a period with a variance column and zero suppression.

- **When to use**: a controlling report that puts a plan restricted key figure, an actual restricted
  key figure, and their variance side by side, broken down by one row characteristic.
- **Placeholders to replace**: `PLACEHOLDER_ROW_CHAR` (row breakdown, e.g. cost center),
  `PLACEHOLDER_AMOUNT_KF` (the base amount key figure), `PLACEHOLDER_VERSION_CHAR` (the
  version/category characteristic), `PLACEHOLDER_PLAN_VERSION` / `PLACEHOLDER_ACTUAL_VERSION` (the
  plan and actual version values), and the `ZVAR_FISCPER` default period. Confirm the exception
  aggregation on `ZCF_VARIANCE` (`aggregation.confirmed` is deliberately `false`).
- **Continue with**: `/bw-query-spec-review`, then `/bw-query-draft`.

## ytd-comparison.json

Year-to-date current year vs prior year by one row characteristic.

- **When to use**: a year-over-year comparison where two restricted key figures cover the
  current-year and prior-year `0CALMONTH` ranges.
- **Placeholders to replace**: `PLACEHOLDER_ROW_CHAR`, `PLACEHOLDER_AMOUNT_KF`,
  `PLACEHOLDER_CY_START` / `PLACEHOLDER_CY_END` (current-year YTD range),
  `PLACEHOLDER_PY_START` / `PLACEHOLDER_PY_END` (prior-year YTD range), and the `ZVAR_CURR_YEAR`
  default year. Keep the two ranges the same length so the comparison is like-for-like.
- **Continue with**: `/bw-query-spec-review`, then `/bw-query-draft`.

## top-n-analysis.json

Top 10 of a ranked characteristic by one key figure, with an optional free drilldown.

- **When to use**: a focus report that limits the drilldown to the largest contributors with a
  `TOP_N` condition assigned to the ranked characteristic.
- **Placeholders to replace**: `PLACEHOLDER_RANKED_CHAR` (the characteristic to rank),
  `PLACEHOLDER_MEASURE_KF` (the key figure to rank by), `PLACEHOLDER_FREE_CHAR` (an optional
  free-axis drilldown), and the `ZVAR_PERIOD` default period. Change the condition `threshold` (10)
  for a different N.
- **Continue with**: `/bw-query-spec-review`, then `/bw-query-draft`.

## reconciliation-totals.json

A tightly scoped single key figure control-total report for reconciliation.

- **When to use**: proving a total for one period and entity reconciles to a source ledger, with
  zero-balance rows kept visible (no zero suppression).
- **Placeholders to replace**: `PLACEHOLDER_GROUP_CHAR` (the reconciliation breakdown),
  `PLACEHOLDER_AMOUNT_KF` (the amount key figure), `PLACEHOLDER_ENTITY_CHAR` /
  `PLACEHOLDER_ENTITY_VALUE` (the entity filter, e.g. company code), and `PLACEHOLDER_PERIOD` on
  the `0CALMONTH` filter. `0CURTYPE = 10` (company-code currency) is a concrete default; adjust it
  to your currency type.
- **Continue with**: `/bw-query-spec-review`, then `/bw-query-draft`.

## Shared placeholders

Every template uses these target and evidence placeholders:

- `PLACEHOLDER_SYSTEM`, `PLACEHOLDER_CLIENT`, `PLACEHOLDER_PROJECT`, `PLACEHOLDER_PROVIDER` — the
  target `system`, three-digit `client`, Eclipse `project`, and InfoProvider technical name.
- `ZPLACEHOLDER_*` `technicalName` — the brand-new customer query name (keep the `Z`/`Y` prefix).
- `PLACEHOLDER_SPEC_SOURCE`, `PLACEHOLDER_SPEC_REFERENCE`, `PLACEHOLDER_DATE` — the specification
  or control-total evidence and the date it was checked.

## Sources

- The templates are repository-defined starting points; their shape follows QuerySpec v1.1 in
  `references/query-spec-v1.md` and is enforced by `mcp/src/query-spec.mjs`.
- The best-practice rules the templates satisfy are the BWQ001–BWQ012 catalog documented in
  `references/query-design-rules.md` and implemented in `mcp/src/query-rules.mjs`.
- Enum literals (operators, alert levels, zero-suppression modes) derive from the javap-verified
  BWMT 1.27.36 EEnums recorded in `references/bwmt-api-map.md`.
- Each template is checked for parse validity, `resolveAndValidateSpec` validity, and zero
  warning-severity rule findings by `tests/sap-bw-query/query-templates.test.mjs`.
