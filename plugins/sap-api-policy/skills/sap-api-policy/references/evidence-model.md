# Evidence Model — Intake, Sourcing, Confidence

How to decide what to ask, how to rank what you find, and how to turn it into an honest confidence
level. The goal is the strongest practical evidence **without** turning every run into a
questionnaire.

## Contents
- Intake triage (infer → classify → ask sparingly)
- Minimal blocker questions
- Scenario-specific question sets
- What never to ask for
- Evidence source hierarchy
- Evidence-strength labels
- Confidence rubric
- Evidence ledger fields
- Handling contradictions, gaps, and tool failures

## Intake triage

Do this in order, every run:

1. **Extract** all facts present in the prompt/attachments into the fact table (step 1 of the
   workflow).
2. **Infer** low-risk defaults from signals ("agent"/"MCP" → AI category; "replication"/"into
   Snowflake" → bulk; "API Hub ID"/"S/4HANA Cloud" → product/deployment) and **label them as
   assumptions** in the report.
3. **Classify** each still-missing fact:
   - `blocker` — without it the assessment *category* could flip. Ask.
   - `important` — assessment can proceed but confidence/specificity drops. Ask only if cheap.
   - `optional` — strengthens evidence; not needed for a first pass. Offer, don't insist.
   - `discoverable` — likely retrievable from tools (API Hub, SAP Docs, Notes, released-object
     data, ARC-1). Research first; don't ask the user.
4. **Ask at most one short blocker round** before researching (unless the user wants full intake).
   Then proceed.
5. If you proceed with gaps, say so plainly: *"I can do a first-pass assessment at lower confidence.
   The facts that would most tighten it are X and Y."*

**Ask first only if** there's no identifiable product/deployment; no identifiable
interface/object/endpoint *and* the use case is too broad to search; no business purpose (so
Documented Use can't be compared); ambiguous AI-agentic vs deterministic, or bulk vs transactional,
where the category flips; or the user wants high confidence but authenticated sources are
unavailable.

**Proceed without asking when** the user gave API Hub IDs / object names / Note IDs / endpoints /
doc links; missing facts are mostly `optional` (exact volume, contract text, runtime logs); or tools
can discover the gap.

## Minimal blocker questions

Pick only the ones that matter (3–5 max):
1. Which SAP product and deployment model? (S/4HANA Cloud Public, S/4HANA private cloud/on-prem
   (RISE), BTP, SuccessFactors, Ariba, Concur, …)
2. Which exact API/interface/object? (API Hub ID, endpoint path, OData service, event, CDS view,
   BAPI/RFC/function module, class/interface/table, ADT endpoint, or custom API name)
3. What business purpose / expected documented scenario? (integration, extension, migration,
   analytics, replication, AI-agent tool use, dev tooling)
4. Who/what calls it? (custom app, middleware, Integration Suite, third-party product, RPA bot, AI
   agent, MCP server, data pipeline, dev tool)
5. Read/write? inbound/outbound/bidirectional? one-off migration, periodic sync, real-time, or
   large-scale extraction/replication?

If only one question is possible: *"Which exact SAP product/deployment and API/interface are
involved, and what's the business purpose of the call?"*

## Scenario-specific question sets

Ask the blockers; offer the optionals as "answer any that are easy."

- **Published API / API Hub:** blockers — artifact ID/package/endpoint/name, product+version,
  intended operation/entity + purpose, expected volume if limits may bite. Optional — OAuth
  scopes/auth, sandbox vs production, deprecation/successor concerns. (Don't ask for specs if the
  API Hub tool is available — fetch them.)
- **ABAP object / custom API:** blockers — deployment model, object names/types (CLAS, INTF, DDLS,
  BDEF, SRVD, SRVB, TABL, FUNC, BAPI/RFC), SAP-standard vs partner vs custom namespace, whether the
  custom API wraps SAP-owned objects/tables. Optional — ATC/Clean Core results, API_STATE, package/
  software component, service binding/definition, transport history. (If ARC-1 is permitted, read
  metadata instead of asking.)
- **AI / agentic / MCP:** blockers — does an AI/LLM autonomously plan/select/sequence/execute SAP
  calls? which SAP APIs are exposed as tools? endorsed pathway (Integration Suite MCP Gateway /
  Joule / Agent Gateway / A2A) or custom/third-party gateway? human approval gate before writes/
  sensitive reads? Optional — tool manifest, identity model (named vs technical user, principal
  propagation), audit/tool-call logs, rate limits/allowlists. **"MCP server" alone is not endorsed** —
  ask whether it's customer-managed, SAP-provided, or fronted by Integration Suite.
- **Bulk / replication / analytics:** blockers — initial load vs delta vs full vs scrape vs
  operational; volume/frequency; source product+interface and target system; is an endorsed data
  pathway used (BDC + Delta Sharing, SLT, ODP-OData, analytical CDS/OData V4)? Optional — retention
  depth, personal/sensitive data, quotas/preconditions, retry/backpressure, analytics vs AI-training
  vs legal export.
- **Third-party / partner / middleware:** blockers — which product calls SAP, which SAP interface
  underneath, certified for *this* scenario or merely technically compatible, Published APIs only or
  scrape/UI-automation/private endpoints? Optional — certification scenario+date, architecture
  diagram, vendor docs naming the SAP APIs, gateway controls.
- **ADT / dev tooling:** blockers — strictly dev tooling or does it read/export business data or
  orchestrate runtime? which ADT functions (source read/write, ATC, activation, transport, data
  preview, SQL console, table contents)? SAP/Eclipse/abapGit/CI-CD/custom? Optional — real user
  identity + audit, whether writes/preview/SQL enabled, prod vs dev/test.
- **Existing / legacy interface:** blockers — productive or planned? exact undocumented/internal
  interface? any Note/ticket/doc covering it? published successor/migration path? Optional —
  operational/throttling history, replacement timeline, business criticality, SAP engagement status.

## What never to ask for

Passwords, API keys, bearer tokens, S-user credentials, client secrets, private keys, raw
production payloads, unredacted personal data, or full business records. Ask for **aggregate
counts, redacted summaries, and diagrams** instead. State this boundary if the user starts to
over-share.

## Evidence source hierarchy

Rank evidence in this order; a finding's authority comes from where it sits here:

1. **Applicable contract / SAP written authorization / SAP support-or-account answer / certification
   terms** — user-supplied only; you can cite and analyze, not produce.
2. **Current SAP API Policy + FAQ.**
3. **Product-specific SAP Documentation / SAP Help** (and dedicated portals: Ariba APIs Portal,
   Concur Developer Center, Cloudification Repository).
4. **SAP Business Accelerator Hub** artifact metadata, resources, specs, package docs.
5. **SAP Notes / KBAs** — especially ones that classify an interface as not permitted, unsupported,
   deprecated, obsolete, or name a successor.
6. **SAP Architecture Center** endorsed reference architectures + **SAP Discovery Center** service
   docs.
7. **Released-object tooling** — Cloudification Repository, `sap_search_objects` /
   `sap_get_object_details`, ATC Cloud Readiness/Clean Core, ARC-1 `API_STATE`.
8. **SAP Road Map Explorer** — *future availability only*; never current permission.
9. **Customer-owned evidence** — code, architecture docs, API registry, redacted logs/metrics,
   internal approvals, gateway/API-management policies.
10. **SAP Community / blogs / general web** — context and term discovery only. **Never** establishes
    Published-API status (Q23).

## Evidence-strength labels

Tag every key finding:
- `official explicit` — official SAP source states the point directly (e.g. API Hub lists the API;
  a Note says "prohibited").
- `official inferred` — official source supports it by reasonable inference, not verbatim.
- `tooling signal` — released-object state / ATC / API_STATE result.
- `customer-provided` — from the user's own evidence.
- `community / non-authoritative` — context only.

## Confidence rubric

Use exactly one confidence label: `high`, `medium`, or `low`. Do **not** output hybrids, numeric
scores, or ranges. If evidence sits between two labels, choose the lower label and explain the
upward/downward factors in prose.

| Confidence | Conditions |
| --- | --- |
| **high** | The decisive interface(s) verified via `official explicit` evidence (API Hub / product docs / a controlling SAP Note), Documented Use matches, controls checked, no unresolved red flag, and no material authenticated source was missing. |
| **medium** | Mostly `official explicit/inferred` but with a gap — e.g. exact rate limits unknown, version-specific behavior, one interface unverified, or one authenticated source unavailable. |
| **low** | Key evidence is `tooling signal`, `customer-provided`, or `community` only; or a material high-authority source (API Hub / SAP Notes) was unavailable; or core scenario facts were assumed. |

Drop confidence one level for each material missing high-authority source. Never report `high` if
the conclusion rests on a community source or an unverified assumption.

## Evidence ledger fields

Capture for every source consulted (this becomes the report's Evidence table):
`source_type` · `tool` (server/tool or web) · `query_or_input` · `artifact` (API ID / Note ID /
object / URL / roadmap ID) · `retrieved_at` · `key_finding` · `authority_level` (the strength label)
· `policy_relevance` (Published API / Documented Use / Specific Control / General Control / agentic
pathway / bulk / deprecation / unsupported / successor) · `confidence_impact` (raises / lowers /
neutral / gap).

## Handling contradictions, gaps, and tool failures

- **Higher authority wins.** A controlling SAP Note (5) beats a community post (10); a contract
  clause (1) beats everything — but you only *cite* user-supplied contract text, you don't infer it.
- **Missing source ≠ prohibited.** If an object isn't found in released-object data or API Hub,
  record an evidence gap and keep searching docs/Notes — don't auto-conclude "not allowed".
- **Authenticated-tool failure** (API Hub / SAP Notes / Roadmap / ARC-1): name exactly which
  evidence is missing, **do not** silently substitute lower-authority web/community evidence,
  continue with public official docs where possible, lower confidence if the gap is material, and
  give exact retry steps (see `tool-playbooks.md`).
- **Report the gaps.** Every report ends with the missing facts that would most improve confidence
  and the questions to put to SAP — phrased so optional facts don't sound mandatory.
