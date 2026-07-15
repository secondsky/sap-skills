# Report Template

Use this structure for every assessment. Keep the disclaimer at **both** the top and bottom — it is
the defining property of this skill, not boilerplate. Fill only the policy-analysis sections that
apply to the scenario; drop the rest rather than padding.

## Template

```markdown
# SAP API Policy — Evidence Assessment

> **Not legal or final SAP advice.** This is an evidence-based *technical* assessment. Only SAP, the
> applicable contract, or SAP support/account/legal channels can give a binding answer for a
> specific customer landscape. SAP does not publish a binary compliant/not-compliant decision matrix
> (API Policy FAQ Q49); this report gets as close as the evidence allows and flags what to confirm
> with SAP.

**Assessment:** <Likely aligned | Likely not aligned | Needs SAP confirmation | Not assessable from provided facts>
**Confidence:** <high | medium | low>  ·  **Date:** <YYYY-MM-DD>
**Policy baseline:** SAP API Policy v.4.2026a + FAQ v1.2 (May 2026), plus the live sources listed below.

## Scenario facts
<fact table: product · deployment · version · interface(s) · consumer/tool · data direction · usage pattern · AI/automation flags · evidence supplied. Mark each row provided / inferred(assumption) / missing.>

## Interface inventory
| Capability | Interface (ID/type) | Endpoint/object | Provider | Publication evidence | Status | Controls | Successor |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Evidence
| Source | Type | Tool/query | Finding | Authority | Relevance | Retrieved |
| --- | --- | --- | --- | --- | --- | --- |

## Policy analysis
### Published API / Documented Use
### Specific API Controls (rate/quota/deprecation/ingress-egress/bulk/security)
### General Controls (competitive analysis / out-of-scope use / system risk)
### AI / agentic / MCP / automation        <!-- omit if N/A -->
### Large-scale data / replication          <!-- omit if N/A -->
### Custom APIs / Clean Core                <!-- omit if N/A -->
### Outbound events / callbacks             <!-- include only if relevant; see note below -->

## Red flags
## Missing information (and what would most improve confidence)
## Questions for SAP / internal governance
## Recommended next steps
## Endorsed alternative (if a path is not aligned)

> **Reminder:** evidence-based technical assessment only — not legal/contractual advice and not a
> final SAP compliance decision. Confirm the specifics with SAP through the questions above.
```

## Outbound events / callbacks branch

If the scenario is an **outbound** interface (SAP emits an event/callback to an external endpoint),
do not run it through inbound-API analysis. State that the inbound API Policy is out of scope for
outbound flows (FAQ Q12) and that the relevant governance is the product's own event/extensibility
Documentation — then point there. This usually resolves to `Needs SAP confirmation` against product
docs rather than a policy violation.

## Example wording per category

Calibrate tone to the evidence; never harden an inference into a verdict.
The `Assessment:` value must be **exactly one of the four categories with nothing appended** — no
parentheticals or qualifiers; put nuance in the analysis below, not in the label.
Use exactly one confidence label (`high`, `medium`, or `low`). If the evidence feels
between two labels, choose the lower one and explain that the direction is strong but one source or
fact is missing.

- **Likely aligned** — *"The `<API>` is published on SAP Business Accelerator Hub (`<url>`, status
  Active, retrieved `<date>`) and product documentation describes `<this use>` as Documented Use. At
  ~`<volume>` it stays within the documented rate limits found. No General-Control red flags
  identified. Confidence is medium because the exact production quota wasn't verifiable without tenant access."*
- **Likely not aligned** — *"`<interface>` is ODP-RFC, which SAP Note 3255746 classifies as not
  permitted for customer/third-party access to the listed components (`official explicit`). The
  documented alternative is `<SLT / BDC + Delta Sharing>`. This needs migration before production
  use."*
- **Needs SAP confirmation** — *"No API Hub artifact or product-doc page was found for `<interface>`,
  and SAP Notes were unavailable this run (auth gap). Whether this is 'permitted by Documentation' or
  'otherwise authorized by SAP' (e.g. an endorsed reference architecture) can't be settled from
  available evidence. Raise `<these questions>` with your SAP account/support contact; a documented
  gap can also be filed via the SAP Customer Influence portal."*
- **Not assessable from provided facts** — *"The exact SAP interface and deployment model weren't
  provided and aren't discoverable from the prompt, so the scenario can't be placed in a policy
  category yet. The two facts that would unblock a first-pass assessment are `<X>` and `<Y>`."*

Keep `Missing information` and `Questions for SAP` phrased so that **optional** facts read as
"would strengthen this," not "required" — a useful first-pass result should still stand on its own.
