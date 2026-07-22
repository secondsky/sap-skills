# Inventory / Scan Mode

Use this when the user isn't asking about one scenario but wants to **triage many interfaces at
once** — "which of these APIs are allowed?", "scan our integration landscape", "give us the list of
permitted APIs", or hands over a list of objects/services. There is **no SAP-published master list of
permitted APIs**, so the honest deliverable is a **timestamped, evidence-based inventory** that
classifies each interface and flags what still needs a full per-scenario assessment.

## Inputs
- A list of interfaces/objects: API Hub IDs, OData/SOAP service names, event names, CDS views,
  RFC/BAPI/function modules, ABAP classes/interfaces/tables, custom Z/Y objects.
- Optional but important: target deployment (public cloud / private cloud / on-prem) — release status
  differs by system type, so ask or assume-and-label.
- Better when available: an ABAP where-used / custom-code scan (ATC Cloud Readiness, or ARC-1
  dependency analysis) to discover what custom code actually calls.
- Object names/metadata only — never ask for business data.

## Procedure (per interface)
1. **Classify the type**, then pick the authority:
   - REST/OData/SOAP/event/CDS expected to be public → **API Hub** `search`→`fetch` (Published?
     status/version/direction).
   - ABAP object (CLAS/INTF/TABL/DDLS/FUNC/BAPI) → **released-object tools** `sap_get_object_details`
     (known) or `sap_search_objects` (discovery) for the target `system_type`.
   - Any candidate → **SAP Notes** search for an explicit prohibition, an "if really needed" hedge, or
     a successor.
2. **Map to a status** (vocabulary below).
3. **Record the source + retrieval date** for every row.

## Status vocabulary
| Status | Meaning | Typical signal |
| --- | --- | --- |
| `Published` | On SAP Business Accelerator Hub for Documented Use | API Hub artifact, Active |
| `Released (A)` | Released API, Clean Core level A | released-object state A |
| `Classic (B)` | Classic API — private-cloud/on-prem context, not automatically public-cloud safe | level B / classicAPI |
| `Internal/Stable (C)` | Internal; not for customer use | level C / notToBeReleased |
| `No API (D)` | No released API | level D / noAPI |
| `Prohibited` | Explicitly not permitted | SAP Note (e.g. ODP-RFC 3255746) |
| `Discouraged` | Allowed only under conditions / "if really needed" | hedged Note (e.g. RFC_READ_TABLE 382318) |
| `Not found` | No evidence either way | gap — do not infer prohibited |

## Output
Lead with a one-line **portfolio verdict** using the report template's `Assessment:` + `Confidence:`
labels — each label stands alone (exactly one of the four / one of high·medium·low), with the reason
in a **separate sentence**, never appended to the label. For example: `**Assessment:** Likely not
aligned` followed by *"2 of 5 interfaces are prohibited or internal — see the table."* Then the table:

| Interface | Type | Target system | Status | Evidence (source · ID/URL · retrieved) | Documented alternative | Needs full assessment? |
| --- | --- | --- | --- | --- | --- | --- |

Then a short note and the standard top/bottom disclaimer.

## Caveats (state these every time)
- This is **evidence-as-of-date, not an SAP-sanctioned allowlist** — SAP can update the
  repository/API Hub, and only SAP or the contract is authoritative.
- A `Published`/`Released` status is **necessary, not sufficient**: the *usage pattern* still
  matters — volume/bulk (§2.2.2b), agentic execution (§2.2.2a), and Documented Use must still be
  checked per scenario for any row you would actually rely on.
- SAP's own equivalents are the **ABAP Test Cockpit Cloud Readiness Check** and the **Cloudification
  Repository Viewer** (https://sap.github.io/abap-atc-cr-cv-s4hc/) — point the user there for an
  authoritative, tool-maintained view; use **SAP Integration Assessment** for landscape-level
  discovery.
- For `Not found`, `Discouraged`, or custom-wrapper rows, recommend a full per-scenario assessment
  rather than a one-word verdict.
