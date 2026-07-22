# BW query design rules

The best-practices rule engine (`mcp/src/query-rules.mjs`) reviews a BW query against a
shared catalog of design rules. The same rules run over two inputs:

- a **draft spec** (`QuerySpec v1`), through `bw_resolve_and_validate_spec` (the additive
  `bestPractices` array), before any backend object exists; and
- an **open query**, through `bw_review_query`, which deep-reads the query model
  (`bw_read_query_model`) and evaluates the live definition read-only.

Both paths are read-only. Nothing is created, changed, or saved. A rule that needs a fact
the current source cannot express (for example, exception aggregation is not recoverable
from the deep-read model) is skipped silently for that source rather than guessed.

Every finding carries a `ruleId`, a `severity` (`warning` or `info`), an optional `path`
to the offending element, a `message` naming that element, and a `rationale`. Warnings mark
likely performance, correctness, or governance problems; info findings are advisory.

All numeric thresholds below (8 rows, 15 free characteristics, 15 structure members) are
**heuristics** chosen for typical enterprise queries. They are not SAP-mandated limits and
can be tuned in `mcp/src/query-rules.mjs` (the `RULES` array) to match a customer's own
query-design standards.

---

## BWQ001 — NO_TIME_RESTRICTION (warning)

**Draft spec:** fires when no time characteristic (technical name matching `^0CAL` or
`^0FISC`, e.g. `0CALMONTH`, `0FISCPER`) carries a restriction anywhere — not in the global
filter, not as a restriction on a key figure, and not through a variable bound to it.

**Open query:** fires when the deep-read model shows no filter selection, key-figure
restriction, or variable on any `0CAL*`/`0FISC*` characteristic.

**Why it matters:** without a period restriction the OLAP processor can read the entire
history in the InfoProvider, inflating the working set, the database read, and the query
runtime. A bounded time selection (a fixed filter or, better, a prompt variable) is one of
the most effective levers for BW query performance and is a standard query-design
recommendation.

**How to resolve:** add a filter or an input-ready variable on the relevant time
characteristic (calendar or fiscal period/year), or restrict the key figures to the
required periods. Confirm the business scope before narrowing.

## BWQ002 — ROWS_OVERLOAD (warning)

**Draft spec / open query:** fires when more than 8 characteristics sit in the rows
drilldown. Structures are not counted as characteristics.

**Why it matters:** the number of characteristics in the default drilldown multiplies the
size of the initial result set and the cost of the first render. Deep default drilldowns
are a common cause of slow first data.

**How to resolve:** keep only the characteristics the query must show by default in rows,
and move optional drilldowns to the free axis so users add them on demand.

## BWQ003 — FREE_OVERLOAD (info)

**Draft spec / open query:** fires when more than 15 characteristics sit on the free axis.

**Why it matters:** free characteristics are not all rendered at once, so this is a
usability concern rather than a hard performance one; a very long navigation list makes the
query hard to understand and to drive.

**How to resolve:** trim characteristics that no consumer navigates to, or split the query
by subject area.

## BWQ004 — CONDITION_BROAD_ASSIGNMENT (warning)

**Draft spec:** fires when a condition has no explicit characteristic assignment (the spec
`characteristics` list is empty) while at least two characteristics sit on rows and columns
combined.

**Open query:** fires when a condition's assignment is `ALL_INDEPENDENTLY` (evaluate for
all characteristics independently), or is unset with no assigned characteristics, under the
same two-characteristic condition. Inactive conditions are ignored.

**Why it matters:** a condition evaluated for all characteristics independently changes
which rows it keeps or hides as the drilldown changes. With more than one characteristic on
the axes, the result can differ from the intended "top N per one characteristic" behaviour
and surprise consumers.

**How to resolve:** pin the condition to the characteristic(s) it is meant to rank or
filter (its characteristic assignment), and confirm the evaluation behaviour against the
expected drilldown.

## BWQ005 — EXCEPTION_ON_CHA_CELLS (info)

**Draft spec:** fires when an exception sets `affectsDataCells: false`.

**Open query:** fires when the deep-read exception reports `affectsDataCells === false`.

**Why it matters:** an exception that does not affect data cells only colours characteristic
cells. That is occasionally intended, but more often a data-cell alert was meant, so it is
worth confirming.

**How to resolve:** confirm whether the alert should highlight the key-figure (data) cells;
if so, enable data-cell evaluation for the exception.

## BWQ006 — FORMULA_WITHOUT_EXCEPTION_AGGREGATION (warning)

**Draft spec:** fires when a calculated or formula key figure (or a standalone formula) has
no exception aggregation defined.

**Open query:** skipped. The deep-read model does not reliably expose exception aggregation,
so this rule does not run against a live query (it applies to specs only).

**Why it matters:** calculated and formula key figures aggregate with the standard
aggregation by default. Ratios, prices, averages, and counts that must aggregate over a
reference characteristic (for example "last value per period" or "count of materials")
produce wrong result rows and totals without an exception aggregation.

**How to resolve:** define the exception aggregation (function and reference characteristic)
for the calculated/formula key figure, and verify the totals against a known control figure.

## BWQ007 — HIERARCHY_WITHOUT_LEVEL (info)

**Draft spec:** fires when a hierarchy is activated (a `hierarchies[]` entry, or an axis
element that switches on a hierarchy) without a display level or an expand-to level.

**Open query:** fires when a characteristic in the deep-read model has a hierarchy assigned
but no display level.

**Why it matters:** a presentation hierarchy without an initial level defaults to full
expansion. On deep hierarchies this hurts both readability and initial rendering
performance.

**How to resolve:** set an initial display or expand-to level so the hierarchy opens
collapsed to a sensible depth.

## BWQ008 — ZERO_SUPPRESSION_ALL_VALUES (info)

**Draft spec / open query:** fires when the zero-suppression mode is `FOR_ALL_VALUES`
(compared case- and underscore-insensitively, because the live model may report a differently
cased literal).

**Why it matters:** suppressing zeros for all values re-evaluates every cell and can hide
rows that are legitimately zero, which occasionally removes rows a consumer expects to see.
`FOR_RESULTS_ONLY` is usually the safer default.

**How to resolve:** confirm that suppressing every zero value (not only zero result rows) is
intended; otherwise switch to results-only suppression.

## BWQ009 — DUPLICATE_MEMBER_RESTRICTIONS (warning)

**Draft spec:** fires when two or more members of a key-figure structure resolve to
restricted key figures with an identical restriction signature (the same set of
`{characteristic, operator, values, excluding}` restrictions).

**Open query:** fires when two or more members of a structure serialize to the identical set
of restriction groups. The key-figure selection group itself is ignored (the base measure
group carries no restricting tokens, and the technical key-figure selectors `1KYFNM`/`4KYFNM`
are excluded), so only the restricting characteristics are compared. Members with no
restriction never count as duplicates.

**Why it matters:** the same characteristic restriction repeated across several key figures
drifts out of sync when one copy is edited and prompts more than once when it should prompt
once. A shared restricted key figure or a reusable variable keeps the definitions
consistent.

**How to resolve:** extract the shared restriction into one reusable restricted key figure,
or bind the restriction to a single variable referenced by each member.

## BWQ010 — NAMING_CONVENTION (info)

**Draft spec / open query:** fires when the query technical name does not start with `Z` or
`Y`. Skipped when the name is empty or unknown for the source.

**Why it matters:** `Z*` and `Y*` are the customer namespace. Custom queries kept in that
namespace are recognizable as customer objects and are protected from being overwritten by
SAP-delivered content during upgrades.

**How to resolve:** rename the query into the customer namespace (`Z`/`Y` prefix), following
the local naming standard.

## BWQ011 — UNRESTRICTED_QUERY (warning)

**Draft spec / open query:** fires when the query has no filters at all and no restricted
members — that is, no characteristic carries any narrowing restriction (filter value or
variable, key-figure restriction, or a variable bound to it). An empty shell with no axis
content yet is not judged.

**Why it matters:** a query with no restriction reads the whole InfoProvider. Beyond the
time-specific BWQ001, this catches the broader case of a query that will scan everything —
a performance and, on large providers, a stability risk.

**How to resolve:** add a global filter, an input-ready variable, or restricted key figures
that reflect the intended business scope before running against production data.

## BWQ012 — STRUCTURE_OVERLOAD (warning)

**Draft spec:** fires when a key-figure structure has more than 15 members.

**Open query:** fires when a structure (whose kind the model cannot confirm as a
characteristic structure) has more than 15 members.

**Why it matters:** a wide key-figure structure multiplies the number of computed cells and
produces a very wide result, increasing both OLAP cost and render time.

**How to resolve:** split the structure by subject area, remove unused members, or move
rarely used key figures into a separate query.

---

## Sources

These rules encode general SAP BW and SAP BW/4HANA query-design and performance practices,
not specific SAP Note prescriptions. No SAP Note numbers are cited to avoid fabricating
references; the underlying concepts (time-restricted selections, drilldown/structure size,
exception aggregation for calculated key figures, condition characteristic assignment,
exception scope, zero-suppression modes, hierarchy display levels, restricted-key-figure and
variable reuse, and the customer `Z`/`Y` namespace) are documented in the public SAP query
design, OLAP runtime, and Query Monitor (RSRT) material on the SAP Help Portal and discussed
in the SAP Community.

- SAP Help Portal (SAP BW/4HANA and SAP BW query design, analysis, and OLAP runtime
  documentation): https://help.sap.com/
- SAP Community (BW query design and performance topics): https://community.sap.com/

Thresholds in the rules above are heuristics and are tunable in the `RULES` array of
`mcp/src/query-rules.mjs`; adjust them to a customer's own query-design standards rather
than treating them as fixed SAP limits.
