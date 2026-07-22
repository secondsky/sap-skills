# Tool Playbooks

How to gather evidence with the available MCP servers and web search. Tool names/parameters below
were verified against the server source on 2026-05-28; if a call signature has drifted, trust the
runtime's tool schema over this file.

## Contents
- Runtime self-check (do this first)
- Server coverage matrix
- SAP Docs MCP
- SAP API Hub MCP
- SAP Notes MCP
- SAP Roadmap MCP
- ARC-1 MCP
- Web search fallback
- Scenario → tool decision tree
- Authenticated-source failure handling

## Runtime self-check (do this first)

Tool availability changes between runtimes (Claude Code, Cursor, Codex) and between sessions —
**do not assume any server is present.** At the start of evidence gathering, note which of these
tool families actually exist in this session, then plan around the gaps:

- SAP Docs (public, no auth): `search`, `fetch`, `sap_search_objects`, `sap_get_object_details`,
  and — *only if their feature flags are enabled* — `sap_discovery_center_search`,
  `sap_discovery_center_service`, `ui5_version_diff`; also `sap_community_search`,
  `abap_feature_matrix`, `abap_lint`.
- SAP API Hub (authenticated): `categories`, `search`, `fetch`, `resources`, `spec`, `package`.
- SAP Notes (authenticated): `search`, `fetch`.
- SAP Roadmap (authenticated): `search`, `fetch_item`, `filters`, `periods`, `export_markdown`.
- ARC-1 (live SAP system): `SAPRead`, `SAPSearch`, `SAPContext`, `SAPDiagnose`, plus mutating tools
  that must stay disabled.

If a **high-authority** source for the scenario is missing (API Hub for a Published-API question,
SAP Notes for a "not permitted" question), say so up front and lower confidence — don't paper over
it with web results. A portable reference config that wires all five is at the repo root
(`.cursor/mcp.json.example`); the three authenticated servers (API Hub, Roadmap, Notes) live in the
`sap-mcp-servers` monorepo under `packages/{api-hub,roadmap,notes}`.

## Server coverage matrix

| Server | Best for | Auth | Not sufficient for |
| --- | --- | --- | --- |
| SAP Docs | product docs, Architecture Center / AI Golden Path, Discovery Center, released-object state, BTP/AI/ABAP docs | public / local index | contract terms, full API Hub specs when not indexed |
| SAP API Hub | proving an artifact is a Published API; status/version/auth/resources/spec | `api.sap.com` session | customer entitlement; productive limits unless documented |
| SAP Notes | explicit "not permitted"/unsupported/deprecated/successor statements | S-user / me.sap.com | broad tutorials; usable only if authenticated |
| SAP Roadmap | future replacement APIs, upcoming endorsed pathways | roadmaps.sap.com | **current** permission — never |
| ARC-1 | connected-system release, custom-API implementation/dependencies, API_STATE, ATC | live SAP via ADT | proof that policy permits an undocumented interface; business-data extraction |
| Web search | discovery + official-link finding | public | high-confidence policy conclusions from non-official sources |

## SAP Docs MCP

Accesses a local index (ABAP/ABAP-Cloud keyword docs, BTP, SAP AI, Architecture Center, CAP/UI5/
Cloud SDK, style guides) plus online SAP Help / Community / Software Heroes, SAP's Cloudification
released-object data, and Discovery Center.

| Tool | Use | Key inputs | Caveat |
| --- | --- | --- | --- |
| `search` | find product docs, API controls, AI/agentic architecture, BTP/Discovery docs | `query`, `k`, `includeOnline=true`, `includeSamples=false`, optional `sources` (e.g. `architecture-center`, `btp-cloud-platform`) | online is best-effort; community results = context only; `fetch` for citations |
| `fetch` | retrieve full official text for the evidence table | `id` from a `search` hit | don't fetch guessed IDs — search first |
| `sap_search_objects` | discover released/classic/internal/no-API status of ABAP objects | `query`, `system_type`, `clean_core_level`, `object_type`, `app_component`, `state` | strong for ABAP objects only; not proof of business-scenario Documented Use |
| `sap_get_object_details` | exact object state + successor + compliance verdict | `object_type`, `object_name`, `system_type`, `target_clean_core_level` | "not found" ≠ prohibited — record a gap and check docs/API Hub |
| `sap_discovery_center_search` / `_service` | endorsed BTP services (Integration Suite, API Management, AI Core, HANA Cloud, BDC) | `query` / `serviceId` | **feature-flag-gated — may be absent**; service existence ≠ API permission |
| `sap_community_search` | term/Note discovery, troubleshooting | symptom/interface terms | never Published-API proof |
| `abap_feature_matrix`, `ui5_version_diff`, `abap_lint` | ABAP feature availability / UI5 deprecation / local lint | feature/version/code | context only (`ui5_version_diff` is feature-flag-gated); not policy evidence |

Released-object reading: treat state `A` as strongest positive released-API evidence; `B` as
classic / private-cloud / on-prem context (not automatically public-cloud safe); `C`/`D`,
`notToBeReleased`, `noAPI`, or internal/stable as red flags.

Routing: "is this object released?" → `sap_get_object_details` (if type+name known) else
`sap_search_objects`. "is this API documented for this use?" → `search` then `fetch` on SAP Help /
Architecture Center. AI/MCP scenarios → search Architecture Center **AI Golden Path
(`https://architecture.learning.sap.com/docs/ai-golden-path`; `/docs/aigp` may appear as an alias
but verify it live)** and **A2A & MCP (`/docs/ref-arch/ca1d2a3e`)**.

## SAP API Hub MCP

Authenticated `api.sap.com` session (Playwright; env `SAP_USERNAME`, `SAP_PASSWORD`,
`API_HUB_BASE_URL`; `HEADFUL=true` for MFA). Read-only; does not expose your key or call business
endpoints.

| Tool | Use | Key inputs |
| --- | --- | --- |
| `categories` | discover valid `categoryKey`/artifact filters | none |
| `search` | find candidate Published-API artifacts | `q`, `categoryKey`, `artifactType`, `top`, `skip` |
| `fetch` | confirm status/version/direction/auth/docs/package | `id`, `kind` (`api`/`event`/`cdsview`/`artifact`/`package`), `artifactType`, `version` |
| `resources` | verify exact paths/operations/entities/channels/CDS fields without a huge spec | `id`, `kind`, `artifactType`, `version` |
| `spec` | exact endpoint/method/entity/security schema when the decision turns on it | `id`, `kind`, `format`, … |
| `package` | product/package scope + related published artifacts | `id`, `includeArtifacts`, `top` |

Verify a Published-API hypothesis in order: `categories` (if filters unknown) → `search` (by exact
ID *and* business term) → `fetch` best candidate → `resources` → `spec` only if exact shape matters
→ `package` for scope. Record active/deprecated/decommissioned status and the documented direction
(inbound vs outbound — don't collapse, per FAQ Q12). Package existence does not authorize every
related/hidden endpoint.

## SAP Notes MCP

Authenticated SAP Support Portal / me.sap.com (env `SAP_USERNAME`, `SAP_PASSWORD`, `AUTH_METHOD`;
`HEADFUL=true` for MFA). High-authority for explicit prohibitions.

| Tool | Use | Key inputs |
| --- | --- | --- |
| `search` | find Notes/KBAs by exact ID or SAP terms | `q`, `lang` |
| `fetch` | full Note content + validity + corrections + references | `id`, `lang`, `includeCorrections` |

Search exact IDs first (e.g. **3255746** ODP-RFC, **3475661** SLT, **3747787** supply-chain), then
interface terms + policy words: `<interface> not permitted | unsupported | obsolete | deprecated
successor | bulk extraction | rate limit`, and `ODP-RFC not permitted`. Fetch the top 2–3 only.
Treat a Note that says a mechanism "must not be used" or names a successor as decisive technical
evidence. If unauthenticated, record a high-impact gap and list the exact IDs/searches to retry.

## SAP Roadmap MCP

Authenticated roadmaps.sap.com (env `SAP_USERNAME`, `SAP_PASSWORD`, `ROADMAP_BASE_URL`,
`ROADMAP_DEFAULT_RANGE`). **Future planning only — never current permission.**

| Tool | Use | Key inputs |
| --- | --- | --- |
| `search` | future replacement APIs / endorsed pathways for a gap | `q`, `range`, `filters`, `markdown` |
| `fetch_item` | one deliverable's detail (**note: `fetch_item`, not `fetch`**) | `id` |
| `filters` / `periods` | discover filter IDs / period clustering | `q`, `range`, `filters` |
| `export_markdown` | a planning annex / gap roadmap | `q`, `range`, `filters`, `includeDetails` |

Use only after current API Hub/docs/Notes evidence is checked; label every finding
`future/planning evidence`; keep it out of the current-permission conclusion.

## ARC-1 MCP

Connects to a **live customer SAP system via ADT** (env `SAP_URL`/`SAP_USER`/`SAP_PASSWORD`/
`SAP_CLIENT`/`SAP_LANGUAGE`/`SAP_INSECURE` + many `SAP_ALLOW_*`/`SAP_FEATURE_*` gates). For this
skill keep it **read-only and metadata-only**: `SAP_ALLOW_WRITES=false`,
`SAP_ALLOW_DATA_PREVIEW=false`, `SAP_ALLOW_FREE_SQL=false`. **Only use it when the user explicitly
confirms it's appropriate for this run.**

| Tool | Safe use here | Avoid |
| --- | --- | --- |
| `SAPRead` | `SYSTEM`, `COMPONENTS` (release context); `API_STATE` (object release state); `SRVD`/`SRVB`/`BDEF`/`DDLS`/`CLAS`/`INTF`/`FUNC`/`DEVC` (custom-API implementation) | `TABLE_CONTENTS` — never for this skill |
| `SAPSearch` | locate custom APIs, service bindings, calls to suspect SAP objects | — |
| `SAPContext` | `deps`/`impact` — does a custom API wrap non-released SAP objects? blast radius | — |
| `SAPDiagnose` | `atc` (Clean Core / API-usage findings), `gateway_errors` | dumps/traces if they may expose business data |
| `SAPLint`, `SAPNavigate`, `SAPManage` (`probe`/`features`), `SAPTransport` (`history`/`check`) | code-quality / where-used / feature probe / change history as context | — |
| `SAPQuery`, `SAPWrite`, `SAPActivate`, `SAPGit` | not used | all mutating / SQL — disabled |

Custom OData/RAP API flow: `SAPSearch` for `SRVB`/`SRVD`/`BDEF`/`DDLS`/impl class → `SAPRead` them →
`SAPContext(deps/impact)` → `SAPDiagnose(atc)` → cross-check the underlying SAP objects via SAP Docs
released-object tools + API Hub. For a third-party/agent connection, use ARC-1 only to inventory the
SAP-facing custom layer and see whether it exposes business APIs, dev tooling, table reads, or
SQL-like access.

## Web search fallback

Use when an MCP source is unavailable, a page may have changed, a public URL needs discovery, or
the user wants the latest context. **Restrict policy conclusions to official domains:** `help.sap.com`,
`api.sap.com`, `architecture.learning.sap.com`, `discovery-center.cloud.sap`, `roadmaps.sap.com`,
`me.sap.com` / `launchpad.support.sap.com` (Notes, auth), `sap.com/documents`, official
`github.com/SAP/...`. Community/blogs/analyst pieces (e.g. lock-in commentary) are context only —
never proof of Published-API status (Q23). The Architecture Center was restructured in April 2026,
so verify any Architecture Center URL live rather than trusting a cached path.

Sources the current tool set does **not** cover (ask the user or note as a gap): customer contract /
order forms / service descriptions; SAP support tickets and account-team written approvals; SAP
Integration Suite runtime/API-Management logs; customer API registries / ADRs / security reviews;
Simplification Item Catalog and `/SDF/RC_START_CHECK` output unless the user provides it.

## Scenario → tool decision tree

- **Published API / API Hub artifact** (REST/OData/SOAP IDs, endpoints, events, CDS views, BAdIs,
  packages): API Hub `search`→`fetch`→`resources`→`spec`(if needed) → SAP Docs `search`/`fetch` for
  product limits → SAP Notes for deprecation/not-permitted.
- **ABAP object / Clean Core / custom wrapper:** SAP Docs `sap_get_object_details` (known object) /
  `sap_search_objects` (discovery) → ARC-1 `API_STATE` + `SAPSearch`/`SAPContext` (if connected) →
  `SAPDiagnose(atc)` → SAP Notes → API Hub for a released alternative.
- **AI / agentic / MCP / Joule:** SAP Docs `search`/`fetch` Architecture Center AI Golden Path
  (`/docs/ai-golden-path`; verify any `/docs/aigp` alias live) + A2A/MCP
  (`/docs/ref-arch/ca1d2a3e`) → API Hub for every SAP API exposed as a tool
  → Discovery Center for Integration Suite / MCP-Gateway-related services → user architecture (agent
  identity, tool manifest, approval gates, rate limits, audit, gateway).
- **Bulk / replication / scraping / analytics:** SAP Docs for product extraction/replication docs +
  Architecture Center **BDC Data Products** → Discovery Center (BDC, Datasphere, Integration Suite,
  SLT) → API Hub for exact extraction APIs/CDS views → SAP Notes for limitations → Roadmap for future
  only.
- **Unsupported / ambiguous / internal:** SAP Docs `search` + `sap_search_objects` → API Hub by all
  names + business terms → SAP Notes for the interface + "not permitted/unsupported/deprecated/
  successor" → ARC-1 metadata only if it's a customer wrapper → Roadmap for replacement. Default: no
  publication/doc found → `Needs SAP confirmation`, or `Likely not aligned` if red flags or a Note/
  ATC prohibition exists.

## Authenticated-source failure handling

When API Hub / SAP Notes / Roadmap / ARC-1 is unavailable or auth fails:
1. State exactly which evidence is missing.
2. Do **not** silently replace it with lower-authority web/community evidence.
3. Continue with public official docs where possible.
4. Give exact retry steps — API Hub: log in (MFA), `categories` then `search`; SAP Notes: refresh
   S-user/session, run the exact `search`/`fetch`; Roadmap: log in then `search`; ARC-1: set the SAP
   system env vars, keep preview/SQL/writes disabled.
5. Lower confidence if the missing source is material to the conclusion.
