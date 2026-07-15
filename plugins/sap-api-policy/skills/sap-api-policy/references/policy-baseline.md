# Policy Baseline

Stable interpretation rules distilled from **SAP API Policy v.4.2026a** (the 2-page policy) and the
**API Policy FAQ v1.2, May 2026** (53 Q&As). Every report should still cite the live policy/FAQ
version used, because SAP can revise them. `Q##` below = FAQ question number; quote it when it
materially supports a finding.

## Contents
- The policy in five clauses
- Three definitions that decide most cases
- Red-flag taxonomy
- Scenario rules (with FAQ anchors)
- Named endorsed pathways (what to recommend instead)
- Concrete "not permitted" / control examples (SAP Notes)
- Why this skill is never definitive

## The policy in five clauses

- **§1.1 Published APIs / Documented Use.** APIs published on the **SAP Business Accelerator Hub**
  *or otherwise identified in product-specific Documentation* are "Published APIs", available for
  the purposes that Documentation describes ("Documented Use") — integrate, extend, synchronize,
  exchange data, trigger events, similar business scenarios.
- **§1.2 Non-Published APIs.** Customer/third-party apps **must not** access APIs that are not
  Published — *in particular* those labeled internal, private, or similar, or bound to SAP-reserved
  clients (e.g. SAP reserved-client namespaces in S/4HANA) — **except** as permitted by
  Documentation or otherwise authorized by SAP. Explicit carve-out: **customers may use
  custom-developed ABAP interfaces in private cloud and on-premise deployments.** These non-published
  interfaces may change/be removed without notice. **Customers/partners must verify each endpoint
  used for Documented Use is a Published API.**
- **§2.1 Specific API Controls** (per API, in Documentation/API Hub): rate limits & quotas,
  deprecation schedules, data ingress/egress quotas, **limits & preconditions for bulk
  extraction/replication**, other security/technical requirements.
- **§2.2 General API Controls.**
  - **2.2.1** prohibits API use for (a) competitive analysis, (b) functions/scenarios outside
    Documented Use unless authorized by SAP, (c) anything creating risk to system performance,
    stability, or security.
  - **2.2.2** prohibits — *except through SAP-endorsed architectures, data services, or
    service-specific pathways expressly intended for it* — (a) interaction/integration with
    (semi-)autonomous or generative **AI systems that plan, select, or execute sequences of API
    calls**, and (b) **scraping, harvesting, or systematic and/or large-scale data
    extraction/replication**.
- **§3 Monitoring & remedies.** SAP may monitor usage (metadata, not payload — Q16) and throttle,
  suspend, or terminate access for non-compliance. Customers must **not bypass controls** via
  intermediary services, custom code, proxies, gateways, impersonation, or similar. Enforcement
  posture is "monitoring and dialogue over penalties"; for existing integrations SAP intends to make
  contact before throttling (Q11, Q19). **§4** the policy does **not** limit legally
  required data export — data portability, switching, or legal record retention — and customers
  retain the right to access **their own data**. This is a genuine counterweight in data-access and
  extraction cases, but it is **not** blanket permission: the *mechanism* still has to be a Published
  API or an endorsed data pathway (so "it's our data" does not by itself license ODP-RFC or raw table
  reads).

## Three definitions that decide most cases

- **"Documented Use"** = using an API as described in the applicable product Documentation. **Unless
  that Documentation says otherwise, §2.1 controls apply** (Q48). Monitoring, test automation,
  migration, and operations are only in scope if the Documentation covers them — if unclear, that is
  a `Needs SAP confirmation`, not an assumption.
- **"Permitted by Documentation"** = use cases explicitly described in product-specific
  Documentation, **including product Help Portal pages, SAP Notes, and Configuration Guides** (Q50).
  So an SAP Note or config guide *can* be the publication evidence — not only API Hub.
- **"Otherwise authorized by SAP"** = authorization paths beyond explicit Documentation, **such as an
  SAP-endorsed reference architecture** (Q51). An Architecture Center endorsed pattern can therefore
  legitimize an otherwise-unlisted path (this is the hook for the agentic/bulk pathways below).

## Red-flag taxonomy (push toward `Likely not aligned` / `Needs SAP confirmation`)

- Interface is **internal/private/"Confidential and Proprietary"** designated, or in an
  SAP-reserved client namespace (Q23, Q27).
- Interface **not** in API Hub, product docs, or a dedicated product portal (Ariba APIs Portal,
  Concur Developer Center, Cloudification Repository) — and only "tolerated" historically → **"at
  own risk", not supported** (Q23, Q24).
- An **SAP Note or ATC check flags it "not permitted"** (e.g. ODP-RFC) → must not be used (Q22–24).
- Use is for **competitive analysis**, or outside the documented scenario, or risks
  performance/stability/security (§2.2.1).
- **Autonomous/generative AI** plans/selects/executes SAP API call sequences without an endorsed
  governance layer (§2.2.2a, Q17, Q34–37).
- **Scraping / harvesting / systematic or large-scale extraction or replication** outside an
  endorsed data pathway (§2.2.2b, Q13, Q38).
- Any design whose purpose or effect is to **bypass a control** (proxy, gateway, custom wrapper,
  impersonation, retry storms, splitting load across technical users) (§3, Q27).

## Scenario rules (with FAQ anchors)

- **Third-party tools / iPaaS / middleware / SAP Integration Suite.** The policy applies regardless
  of tooling (Q14). The compliance criterion is **the SAP API surface used and the usage pattern, not
  the integration platform** (Q32). Integration Suite is *an* endorsed channel, **not the only**
  compliant one (Q32, Q43). Third-party iPaaS consuming Published APIs within §2.2 controls is
  aligned (Q22, Q41).
- **Deterministic RPA.** Rule-based RPA executing **pre-defined, deterministic** call sequences
  *without* autonomous reasoning / AI planning / LLM decision-making is **not in scope of §2.2.2**
  (Q40) — but remains subject to the rest of the policy (Published API, controls, stability).
- **Custom (Z/Y) APIs.** Customer-namespace ABAP interfaces, customer OData via SAP Gateway, custom
  CDS, custom RFCs are **customer-owned and not per se prohibited** (Q23, Q26, Q27, Q31). But their
  compliant use is **determined by the underlying SAP objects they call** — those calls must follow
  the same policy, and a custom API **must not be built to circumvent** General/Specific Controls
  (Q27, Q31). Governance the customer is expected to keep: internal API inventory, Clean Core
  classification of underlying objects (ATC Cloud Readiness Check + Cloudification Repository Viewer),
  standard dev governance (Q28).
- **ADT / developer tooling.** ADT APIs are **SAP-internal**, usable **only through endorsed
  development channels** — SAP ABAP Development Tools in Eclipse, abapGit, SAP-provided dev tools,
  CI/CD on SAP-published tooling, and **custom developer utilities built on the documented Eclipse
  Java SDK** (Q33). A **read-only developer assistant** — including a customer-run MCP server feeding
  Claude/Codex — that reads **source code, DDIC metadata, function-module/interface signatures, and
  where-used** is developer tooling, not business-data access; and a read-only dev assistant is
  **not** §2.2.2(a) agentic, because it is not autonomously planning/selecting/executing *business*
  API call sequences. The controlling line is **dev metadata/source vs. business data**: ADT APIs are
  **not** for reading application tables, exporting business data, SQL against the backend,
  business-data integration or runtime orchestration, agentic-AI workflows on business data, or
  substituting for business APIs (Q33). Table-content preview and freestyle SQL are red flags.
  **Z-RFC caveat:** a custom Z-RFC reached through such tooling can return business data or wrap
  non-released objects — *that* part leaves the dev-tooling carve-out and must be verified
  object-by-object, so a dev assistant that calls Z-RFCs is `Needs SAP confirmation` until those RFCs
  are shown to expose only development metadata. (Reading standard SAP code a developer can already
  see, e.g. to have an LLM explain a function module, is ordinary developer assistance.)
- **Outbound events / callbacks.** The policy governs **inbound** API use. Outbound interfaces
  (event notifications/callbacks **from** SAP to external endpoints) are **out of scope** and governed
  separately by product Documentation (Q12). Do not classify a callback as an inbound violation —
  point to product docs instead.
- **Existing / legacy integrations.** Not retroactively invalidated as an enforcement action; where
  SAP finds a specific security/stability risk it gives advance notice and migration support. Most
  undocumented usage stays "at own risk" — usable but possibly without stability/support guarantees
  (Q24). If a Note/policy/ATC explicitly prohibits it, that overrides tolerance.
- **Partner / certified solutions.** SAP won't revoke completed certifications, but **renewals are
  contingent** on current Integration Certification guidelines, and **certification ≠ compliance in a
  specific customer's live landscape** — the customer is ultimately responsible (Q52, Q53).
  Certification validates a scenario in a test environment, not every deployment.
- **RISE.** Remediation of customer-built integrations that rely on non-published APIs is **not
  automatically in standard RISE scope** — it's the customer's responsibility unless specific
  contractual provisions are agreed (Q29). Flag this for RISE-context scenarios.
- **Read vs write.** No blanket rule; the intended use of each interface is whatever its product
  Documentation says (Q46).
- **Customer's own data / legally-required export.** In data-access and extraction cases, surface §4
  and the customer's right to their own data as a real counterweight — don't frame "extraction" as
  uniformly forbidden. But it does not override the *mechanism* rule: access still has to use a
  Published API or an endorsed data pathway (BDC/Delta Sharing, SLT, analytical CDS/OData V4), not a
  prohibited interface. Weigh it; don't overstate it as blanket permission.

## Named endorsed pathways (recommend a concrete alternative, not "an endorsed pathway")

When a scenario falls under §2.2.2 or large-scale data, point to the specific endorsed option and
verify it live against Architecture Center / Discovery Center / API Hub:

| Need | Endorsed pathway (FAQ) |
| --- | --- |
| External AI agent calling SAP business capabilities | **MCP Gateway on SAP Integration Suite** — customer-managed, governed entry point with auth, rate limiting, audit (Q35, Q37, Q39) |
| Cross-vendor / multi-agent orchestration | **Agent2Agent (A2A) protocol** via Joule + the **Agent Gateway**; A2A is an open Linux-Foundation standard, SAP is a launch partner (Q22, Q35, Q39, Q41) |
| AI agents as developer tooling | SAP-published, themselves-endorsed MCP servers: **CAP MCP Server, UI5 MCP Server, Fiori Elements MCP Server** (Q37) |
| Foundation models for SAP AI | **SAP AI Core / Generative AI Hub** (OpenAI, Anthropic, Google, Amazon + SAP models) (Q36) |
| Bulk / analytical data to a lake/warehouse | **SAP Business Data Cloud + Delta Sharing** (open protocol; zero-copy when co-located on same hyperscaler/region) (Q36, Q38) |
| Partner data platform integration | **BDC Connect**; premium partnerships incl. Databricks, Snowflake, Microsoft, Google, AWS (Q22, Q38) |
| Real-time replication | **SLT** (documented use permitted; existing limits apply; see SAP Note 3475661) (Q38) |
| Analytical access below full replication | **Analytical CDS Views / OData V4 analytical services** with filtering, aggregation, `$apply`, in API Hub (Q38) |
| A documented API simply doesn't exist | Raise the gap via the **SAP Customer Influence portal** (Q44); engage SAP account/support (Q20, Q21) |

Self-assessment tooling to point the user at: **ABAP Test Cockpit (ATC) with Cloud Readiness Check**
(finds dependencies on non-published interfaces), **SAP Integration Assessment** (Integration Suite
capability, ISA-M — discovers/analyzes the integration landscape to find high-risk patterns, Q30),
**S/4HANA Simplification Item Catalog** and **`/SDF/RC_START_CHECK`** (flag obsolete/not-supported/
removed objects; prohibited interfaces surface here, Q10).

When citing the Architecture Center AI guidance, prefer the currently rendering public URL
`https://architecture.learning.sap.com/docs/ai-golden-path`. Treat older/shorter aliases such as
`/docs/aigp` as discoverable aliases only and verify them live before putting them in a report.

## Concrete "not permitted" / control examples (SAP Notes — verify current text live via SAP Notes MCP)

- **ODP-RFC** — the canonical "not permitted for non-SAP tooling" case. **SAP Note 3255746** (Q22).
  Quoted prohibition (Q23): *"Any use of ODP-RFC by customer or third-party applications to access
  SAP ABAP applications that contain … PI_BASIS, SAP BW, SAP BW/4HANA … on-premise or in
  private-cloud setup is prohibited."* Customers using ODP-RFC via third-party platforms should
  contact their account executive for a migration path. Use this as the worked example of
  `Likely not aligned`.
- **SLT maintenance / supported use** — **SAP Note 3475661** (Q38).
- **Supply-chain security framing** (why ungoverned MCP is risky) — **SAP Note 3747787** (Mini
  Shai-Hulud) (Q34).

## Why this skill is never definitive

SAP was asked directly whether there would be a **binding decision matrix or concrete examples** to
pre-clear an integration/automation approach (Q49). SAP declined — the AI Golden Path and Architecture
Center give *directional* guidance, and uncertain cases route to the customer's SAP contact (Q48,
Q49, Q50). So the honest ceiling for any automated assessment is **well-sourced, confidence-rated
evidence plus the right escalation questions** — which is exactly this skill's output.
