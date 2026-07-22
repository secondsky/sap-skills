# SAP API Policy — Evidence Assessment – Skill

**Version**: 2.3.2
**Last Updated**: 2026-07-14

---

## Capability Index

| Capability | Status |
|------------|--------|
| Commands | No |
| Agents | No |
| Hooks | No |
| MCP | No (self-checks for optional SAP Docs / API Hub / Notes / Roadmap / ARC-1 servers at runtime) |
| LSP | No |
| Source Freshness | `last_verified`: 2026-07-14; baselined against SAP API Policy v.4.2026a + FAQ v1.2 (May 2026). |
| Verification | `npm run validate`; SAP source/runtime checks pending unless documented in the source-verification ledger. |

## What this skill does

Assesses whether an SAP API/interface usage scenario appears aligned with the **SAP API Policy
v.4.2026a** (and its FAQ v1.2, May 2026). It gathers evidence from official SAP sources and the
user's own facts, then produces a conservative, sourced, confidence-rated **technical** assessment —
explicitly **not** legal, contractual, or final SAP compliance advice. Every report carries a
disclaimer at top and bottom and routes legal/commercial/roadmap questions to the right SAP channel.

Output is one of four categories — `Likely aligned`, `Likely not aligned`, `Needs SAP confirmation`,
`Not assessable from provided facts` — plus a `high`/`medium`/`low` confidence label, an evidence
ledger, residual risk, and concrete questions to raise with SAP.

## When it triggers

Whenever someone asks whether a way of calling SAP is allowed/compliant, e.g.:

- Published API vs internal/private/"confidential" API status; "Documented Use"
- Third-party tool / iPaaS / middleware / RPA bot / AI agent / MCP server calling SAP APIs
- Agentic or generative-AI access to SAP; bulk extraction / replication into a lake/warehouse
- Custom Z/Y OData or RFC/BAPI wrappers and Clean Core; ADT / developer-tooling boundaries
- ODP-RFC and other "not permitted" interfaces; partner Integration Certification; RISE remediation
- Plus implicit phrasings: "are we allowed to…", "is it compliant to…", "can we connect X to SAP…"

## Reference files (progressive disclosure)

| File | Purpose |
|------|---------|
| `references/policy-baseline.md` | Stable interpretation rules: the policy in five clauses, key definitions, red flags, scenario rules, endorsed pathways, "not permitted" examples |
| `references/evidence-model.md` | Intake triage, blocker/optional question sets, evidence source hierarchy, strength labels, confidence rubric, evidence ledger |
| `references/tool-playbooks.md` | Per-server MCP playbooks (SAP Docs, API Hub, Notes, Roadmap, ARC-1), scenario→tool decision tree, auth-failure handling |
| `references/report-template.md` | The required report structure with top/bottom disclaimers and per-category example wording |
| `references/inventory-scan-mode.md` | Batch mode: triage many interfaces at once into a timestamped, evidence-based inventory |

## Related skills

- **sap-datasphere** / **sap-hana-cloud-data-intelligence** — bulk/analytical data pathways (BDC, Delta Sharing, SLT) referenced as endorsed alternatives
- **sap-abap** / **sap-abap-cds** — custom ABAP objects, Clean Core classification, released-object status
- **sap-cap-capire** — CAP/OData service design and the SAP-endorsed CAP MCP server
