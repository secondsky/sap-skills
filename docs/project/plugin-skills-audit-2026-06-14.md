# Plugin Skills Audit - 2026-06-14

This report records the quality audit performed for the 35 packaged skills under
`plugins/*/skills/*`. It is intentionally separate from packaged skill content so
installable plugins do not carry audit-only artifacts.

## Automated Baseline

- `npm run validate` passed before the audit started.
- `./scripts/validate-frontmatter.sh --quiet` passed before the audit started.
- `npm view @ui5/cli version` returned `4.0.55` on 2026-06-14.
- `npm view @ui5/linter version` returned `1.22.0` on 2026-06-14.

## Fixed Defects

- Corrected `sapui5-linter` command typo from `ui5ling` to `ui5lint`.
- Removed packaged backup file `sap-cap-capire/skills/sap-cap-capire/SKILL.md.backup`.
- Normalized all skill `metadata.version` values to repository release `2.3.0`.
- Standardized missing UI5 metadata from `lastUpdated`/`last_updated` to `last_verified`.
- Removed Markdown-link corruption from fenced code examples.
- Added explicit routing coverage across all 35 skills: related skills, when-to-use guidance, quick-start/reference guidance, bundled-resource pointers, troubleshooting/common issues, and source/verification notes.

## Stale Verification Handling

The following skills still require live source or production re-verification before
their `metadata.last_verified` date can be advanced. Do not update these dates
without checking the current SAP source, package source, or a real SAP/BTP system.

| Skill | Current `last_verified` | Age on 2026-06-14 | Required follow-up |
|---|---:|---:|---|
| `sap-api-style` | 2026-02-25 | 109 days | Re-check SAP API Style Guide sources and templates. |
| `sap-btp-best-practices` | 2025-11-27 | 199 days | Re-check SAP BTP best-practices documentation and production guidance. |
| `sap-btp-build-work-zone-advanced` | 2025-11-27 | 199 days | Re-check SAP Build Work Zone advanced edition docs and templates. |
| `sap-btp-business-application-studio` | 2025-11-27 | 199 days | Re-check BAS subscription, dev-space, and runtime guidance. |
| `sap-btp-cias` | 2025-11-27 | 199 days | Re-check CIAS role, subscription, and integration workflow guidance. |
| `sap-btp-cloud-logging` | 2025-11-27 | 199 days | Re-check Cloud Logging service plans, ingestion, and SAML guidance. |
| `sap-btp-cloud-platform` | 2025-11-27 | 199 days | Re-check BTP account, runtime, CLI, and entitlement guidance. |
| `sap-btp-cloud-transport-management` | 2025-11-27 | 199 days | Re-check Transport Management setup, API, and CI/CD integration guidance. |
| `sap-btp-connectivity` | 2025-11-27 | 199 days | Re-check Destination Service, Cloud Connector, and connectivity proxy guidance. |
| `sap-btp-developer-guide` | 2025-11-27 | 199 days | Re-check BTP developer guide sources, CAP deployment, and runtime versions. |
| `sap-btp-integration-suite` | 2025-11-27 | 199 days | Re-check Integration Suite capabilities and Edge Integration Cell guidance. |
| `sap-btp-intelligent-situation-automation` | 2025-11-27 | 199 days | Confirm archived/legacy status and any required data-export instructions. |
| `sap-btp-job-scheduling` | 2025-11-27 | 199 days | Re-check Job Scheduling REST API, service plans, and security requirements. |
| `sap-btp-master-data-integration` | 2025-11-27 | 199 days | Re-check MDI onboarding, distribution models, and SOAP/API guidance. |
| `sap-btp-service-manager` | 2025-11-27 | 199 days | Re-check Service Manager, SMCTL, and broker/platform workflows. |
| `sap-cap-capire` | 2026-02-22 | 112 days | Re-check CAP release notes, CLI behavior, and MCP integration guidance. |
| `sap-fiori-tools` | 2026-02-26 | 108 days | Re-check Fiori tools generation, preview, and deployment guidance. |
| `sap-hana-cli` | 2025-11-26 | 200 days | Re-check hana-cli package behavior, command list, and HANA Cloud workflows. |
| `sap-hana-cloud-data-intelligence` | 2025-11-27 | 199 days | Re-check Data Intelligence Cloud pipeline/operator guidance. |
| `sap-hana-ml` | 2025-11-27 | 199 days | Re-check hana-ml package version and PAL/APL guidance. |

## Validation Policy

`scripts/validate-skill-quality.mjs` enforces that new packaged skill content does
not regress on metadata consistency, stale verification tracking, backup files,
audit artifacts, required routing sections, or Markdown-corrupted code examples.
