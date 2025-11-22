# SAP BTP Integration Suite Skill - Progress Tracking

**Created**: 2025-11-22
**Last Updated**: 2025-11-22
**Status**: Initial Release Complete

---

## Files Created

### Core Files
- `SKILL.md` - Main skill file with YAML frontmatter and core content
- `README.md` - Auto-trigger keywords and documentation links
- `PROGRESS_TRACKING.md` - This file

### Reference Files (in `references/`) - 14 Files

**Core Development** (5 files):
- `cloud-integration.md` - iFlow development, steps, patterns (Complete)
- `adapters.md` - All 80+ adapter configurations (Complete)
- `scripting.md` - Groovy/JavaScript patterns and API (Complete)
- `api-management.md` - API proxy, 34 policies, Developer Hub (Complete)
- `security.md` - Authentication, keystores, certificates (Complete)

**Capabilities** (6 files):
- `edge-integration-cell.md` - Hybrid Kubernetes deployment (Complete)
- `event-mesh.md` - Topics, queues, brokers, EDA patterns (Complete)
- `integration-advisor-tpm.md` - B2B, MIGs, MAGs, TPM (Complete)
- `graph-odata.md` - Business Data Graph, OData provisioning (Complete)
- `data-space-integration.md` - Catena-X, EDC, data sovereignty (Complete)
- `migration-assessment.md` - PO migration, ISA-M methodology (Complete)

**Operations** (3 files):
- `operations-monitoring.md` - Monitoring, stores, connectivity (Complete)
- `content-transport.md` - TMS, CTS+, MTAR, export/import (Complete)
- `troubleshooting.md` - Error resolution, diagnostics (Complete)

### Templates (in `templates/`)
- `groovy-script-template.groovy` - Common script patterns
- `api-policy-template.xml` - All 34 API policy types

---

## Documentation Source

**Repository**: https://github.com/SAP-docs/sap-btp-integration-suite
**Branch**: main
**Documentation Path**: `/docs`

---

## Documentation Structure Overview

### Main Directories

| Directory | Description | File Count | Status |
|-----------|-------------|------------|--------|
| `/docs/ISuite` | Main Integration Suite documentation | 258 files | In Progress |
| `/docs/ci` | Cloud Integration capability | 750+ files | In Progress |
| `/docs/apim` | API Management capability | 251+ files | In Progress |

### CI (Cloud Integration) Subdirectories

| Subdirectory | Description | File Count | Status |
|--------------|-------------|------------|--------|
| `/docs/ci/Development` | Integration flow development | 566+ files | In Progress |
| `/docs/ci/Operations` | Monitoring & operations | 180 files | In Progress |
| `/docs/ci/InitialSetup` | Initial setup guides | TBD | Pending |
| `/docs/ci/SecurityCF` | Cloud Foundry security | TBD | Pending |
| `/docs/ci/SecurityNeo` | Neo environment security | TBD | Pending |
| `/docs/ci/IntegrationAdvisor` | Integration Advisor | TBD | Pending |
| `/docs/ci/IntegrationSettings` | Integration settings | TBD | Pending |
| `/docs/ci/ConnectionSetup` | Connection setup | TBD | Pending |
| `/docs/ci/WhatIsCloudIntegration` | Overview docs | TBD | Pending |
| `/docs/ci/WhatsNewInCloudIntegration` | Release notes | TBD | Pending |

### APIM (API Management) Subdirectories

| Subdirectory | Description | File Count | Status |
|--------------|-------------|------------|--------|
| `/docs/apim/API-Management` | Core API Management docs | 247 files | In Progress |
| `/docs/apim/APIM-Initial-Setup` | Setup guides | TBD | Pending |
| `/docs/apim/APIM-Migration` | Migration guides | TBD | Pending |

---

## Extraction Progress by Topic

### 1. Core Integration Suite Overview
- [ ] what-is-sap-integration-suite-5cc6987.md
- [ ] capabilities-of-sap-integration-suite-e1c5b90.md
- [ ] how-different-capabilities-in-sap-integration-suite-interact-b550bbd.md
- [ ] integration-capabilities-e32cede.md
- [ ] concepts-324507c.md
- [ ] terminology-and-glossary-fd1491d.md

**Reference File**: `references/integration-suite-overview.md`
**Status**: In Progress

### 2. Cloud Integration Capability
- [ ] cloud-integration-a33f27b.md
- [ ] system-scope-for-cloud-integration-8ea3822.md
- [ ] standard-deployment-in-the-cloud-ca5b233.md
- [ ] preparing-cloud-integration-07f81f2.md
- [ ] sap-cloud-integration-2fb0aa4.md (ci directory)

**CI/Development Files**:
- [ ] developing-integration-content-with-sap-cloud-integration-e6b43b4.md
- [ ] development-78d23d4.md
- [ ] getting-started-with-integration-flow-development-e5724cd.md
- [ ] elements-of-an-integration-flow-e49dbee.md
- [ ] creating-an-integration-flow-da53d93.md
- [ ] creating-an-integration-package-9126d79.md
- [ ] integration-flow-design-guidelines-6803389.md
- [ ] guidelines-to-design-enterprise-grade-integration-flows-a8cd981.md
- [ ] basic-concepts-of-integration-design-ca0f6f7.md

**Reference File**: `references/cloud-integration.md`
**Status**: Complete

### 3. Adapters (Cloud Integration)
- [ ] amqp-adapter-5cc1a71.md
- [ ] ariba-adapter-98da76c.md
- [ ] as2-adapter-d3af635.md
- [ ] as4-receiver-adapter-3a2fde8.md
- [ ] as4-sender-adapter-a448605.md
- [ ] ftp-adapter-4464f89.md
- [ ] http-receiver-adapter-2da452e.md
- [ ] https-sender-adapter-0ae4a78.md
- [ ] idoc-adapter-6042250.md
- [ ] jdbc-receiver-adapter-88be644.md
- [ ] jms-adapter-0993f2a.md
- [ ] kafka-adapter-3e7b995.md
- [ ] ldap-receiver-adapter-06a753f.md
- [ ] mail-adapter-f1145cc.md
- [ ] odata-adapter-2d82511.md
- [ ] odc-receiver-adapter-3cdbc29.md
- [ ] openconnectors-receiver-adapter-1a27cee.md
- [ ] processdirect-adapter-7445718.md
- [ ] rfc-receiver-adapter-5c76048.md
- [ ] salesforce-receiver-adapter-a548be9.md
- [ ] salesforce-sender-adapter-ba6420d.md
- [ ] elster-receiver-adapter-e374ef7.md
- [ ] amazonwebservices-receiver-adapter-bc7d1aa.md
- [ ] amazonwebservices-sender-adapter-16772e3.md
- [ ] facebook-receiver-adapter-3dcc408.md
- [ ] microsoft-dynamics-crm-receiver-adapter-ee724c8.md

**Reference File**: `references/adapters.md`
**Status**: Complete

### 4. Integration Flow Steps & Patterns
- [ ] define-content-modifier-8f04a70.md
- [ ] define-router-d7fddbd.md
- [ ] define-splitter-dabea9d.md
- [ ] define-aggregator-aa23816.md
- [ ] define-multicast-17de3ea.md
- [ ] define-filter-733f8dc.md
- [ ] define-request-reply-dc39fdd.md
- [ ] define-send-step-9b83f10.md
- [ ] define-poll-enrich-f8c8c1d.md
- [ ] define-content-enricher-8827f9f.md
- [ ] define-exception-subprocess-690e078.md
- [ ] define-data-store-operations-79f63a4.md
- [ ] define-message-persistence-steps-cd48445.md
- [ ] define-message-transformer-steps-e223071.md
- [ ] define-security-related-steps-0f71687.md
- [ ] define-validator-steps-20e23e7.md
- [ ] aggregator-5f5e01b.md
- [ ] content-based-routing-90f35f3.md
- [ ] content-enricher-0e7ba7f.md
- [ ] content-filter-6fd4a86.md
- [ ] scatter-gather-987eef2.md
- [ ] recipient-list-06594b9.md
- [ ] resequencer-068cfc7.md
- [ ] message-filter-bd52346.md
- [ ] composed-message-processor-353a119.md

**Reference File**: `references/cloud-integration.md` (Flow Steps section)
**Status**: Complete

### 5. Message Mapping & Transformation
- [ ] message-mapping-459ccdf.md
- [ ] message-mapping-ec59f97.md
- [ ] creating-message-mapping-as-a-flow-step-3d5cb7f.md
- [ ] creating-message-mapping-as-an-artifact-1d52a7b.md
- [ ] create-xslt-mapping-5ce1f15.md
- [ ] perform-an-xslt-mapping-c6bf239.md
- [ ] define-json-to-xml-converter-5a7c0cd.md
- [ ] define-xml-to-json-converter-a60a282.md
- [ ] define-xml-modifier-af16d64.md
- [ ] define-edi-to-xml-converter-6a3d12b.md
- [ ] define-xml-to-edi-converter-707973f.md
- [ ] conversion-rules-for-json-to-xml-conversion-232a9cf.md
- [ ] conversion-rules-for-xml-to-json-conversion-66d099d.md

**Reference File**: `references/cloud-integration.md` (Message Mapping section)
**Status**: Complete

### 6. Scripting (Groovy/JavaScript)
- [ ] developing-script-and-script-collection-e60f706.md
- [ ] creating-a-script-collection-824bff0.md
- [ ] creating-scripts-in-a-script-collection-ed9b52c.md
- [ ] consuming-a-script-collection-1b801fa.md
- [ ] deploying-a-script-collection-95cb2d9.md
- [ ] general-scripting-guidelines-fcbf0f2.md
- [ ] access-headers-and-properties-in-scripts-6bc5ed1.md
- [ ] access-secure-parameters-in-scripts-fdf4ce3.md
- [ ] access-url-get-parameters-in-scripts-7ad2ac9.md
- [ ] access-url-paths-in-scripts-f0620cb.md
- [ ] access-value-mappings-in-scripts-12536ee.md
- [ ] script-use-cases-148851b.md (and following files)

**Reference File**: `references/scripting.md`
**Status**: Complete

### 7. Security (Cloud Integration)
- [ ] apply-message-level-security-9036c0c.md
- [ ] apply-the-highest-security-standards-201fd43.md
- [ ] define-pgp-decryptor-d0dc511.md
- [ ] define-pgp-encryptor-7a07766.md
- [ ] define-pkcs-7-cms-decryptor-51d903b.md
- [ ] define-message-digest-e5d2867.md
- [ ] authentication-bd2fbd5.md
- [ ] managing-keystore-entries-2dc8942.md
- [ ] managing-pgp-keys-cd478a7.md
- [ ] managing-security-material-b8ccb53.md
- [ ] security-artifact-renewal-083fc8d.md
- [ ] All renewal-of-* files in Operations

**Reference File**: `references/security.md`
**Status**: Complete

### 8. API Management Capability
- [ ] api-management-1b17d18.md (ISuite)
- [ ] what-is-api-management-0aef763.md (APIM)
- [ ] components-of-api-management-24f1af0.md
- [ ] concepts-of-api-management-ae66eba.md
- [ ] important-concepts-of-api-management-414808b.md
- [ ] api-lifecycle-5e8ea7d.md
- [ ] api-management-service-plans-e064663.md
- [ ] api-services-007d50f.md
- [ ] api-management-faqs-2d16070.md
- [ ] sap-api-management-in-the-cloud-foundry-environment-7d8514b.md

**Reference File**: `references/api-management.md`
**Status**: Complete

### 9. API Proxy Development
- [ ] build-api-proxies-74c042b.md
- [ ] api-proxy-8962643.md
- [ ] api-proxy-structure-4dfd54a.md
- [ ] api-proxy-flows-variables-9a4fb46.md
- [ ] api-proxy-states-091cda4.md
- [ ] create-an-api-proxy-c0842d5.md
- [ ] different-methods-of-creating-an-api-proxy-4ac0431.md
- [ ] copy-an-api-proxy-23974d6.md
- [ ] edit-an-api-proxy-a64b952.md
- [ ] deploy-an-api-proxy-525f0dd.md
- [ ] test-api-proxies-3ba6151.md
- [ ] debug-an-api-proxy-fb2c7aa.md
- [ ] api-versioning-b3cda3b.md
- [ ] api-revisions-58097ac.md
- [ ] externally-managed-apis-848015d.md

**Reference File**: `references/api-proxy.md`
**Status**: Pending

### 10. API Policies
- [ ] policies-7e4f3e5.md
- [ ] policy-types-c918e28.md
- [ ] create-a-policy-c90b895.md
- [ ] create-a-policy-template-c5d1872.md
- [ ] policy-template-structure-a0210da.md
- [ ] access-control-3f72aea.md
- [ ] assign-message-523efe6.md
- [ ] caching-policies-c8bf1a5.md
- [ ] concurrent-rate-limit-8f22baa.md
- [ ] quota-1f742c1.md
- [ ] spike-arrest-bf441dc.md
- [ ] verify-api-key-4d15a04.md
- [ ] oauth-v2-0-09b5abb.md
- [ ] json-threat-protection-952cbd7.md
- [ ] xml-threat-protection-3de6615.md
- [ ] regular-expression-protection-0118f91.md
- [ ] message-validation-policy-e68da2f.md
- [ ] raise-fault-c7f2e8d.md
- [ ] service-callout-6b40873.md
- [ ] javascript-5b63ed7.md
- [ ] python-script-8703aa8.md

**Reference File**: `references/api-policies.md`
**Status**: Pending

### 11. Developer Hub (formerly Developer Portal)
- [ ] developer-hub-41f7c45.md
- [ ] activating-developer-hub-a0fb69b.md
- [ ] centralized-developer-hub-38422de.md
- [ ] user-roles-and-responsibilities-in-developer-hub-54b4607.md
- [ ] customize-the-visual-format-of-developer-hub-2eacd52.md
- [ ] registering-on-developer-hub-c85fafe.md
- [ ] onboarding-an-application-developer-786d107.md
- [ ] consume-apis-ea561e4.md
- [ ] create-a-product-d769622.md
- [ ] view-applications-feac368.md
- [ ] monetize-apis-fcdc89b.md

**Reference File**: `references/developer-hub.md`
**Status**: Pending

### 12. Edge Integration Cell
- [ ] what-is-edge-integration-cell-aee74bb.md
- [ ] hybrid-deployment-using-edge-integration-cell-7a6c267.md
- [ ] edge-integration-cell-runtime-scope-144c64a.md
- [ ] technical-landscape-edge-integration-cell-f60efc1.md
- [ ] setting-up-and-managing-edge-integration-cell-8f7abc2.md
- [ ] plan-your-setup-of-edge-integration-cell-217fed1.md
- [ ] prepare-your-kubernetes-cluster-46720c5.md
- [ ] deploy-edge-integration-cell-on-a-kubernetes-cluster-e1d44b6.md
- [ ] deploy-the-edge-integration-cell-solution-ab81b84.md
- [ ] activate-edge-integration-cell-a8e497f.md
- [ ] operating-edge-integration-cell-2af17b8.md
- [ ] upgrade-edge-integration-cell-27c3926.md
- [ ] backup-and-restore-edge-integration-cell-61cf37b.md
- [ ] troubleshooting-for-edge-integration-cell-816d9e4.md
- [ ] Kubernetes platform-specific guides (EKS, AKS, GKE, OpenShift, RKE2)

**Reference File**: `references/edge-integration-cell.md`
**Status**: Complete

### 13. Integration Advisor
- [ ] integration-advisor-3309fe0.md
- [ ] overview-of-sap-integration-advisor-f99fdaf.md
- [ ] terminology-glossary-for-sap-integration-advisor-9c221b4.md
- [ ] accessibility-features-in-integration-advisor-2b33756.md
- [ ] troubleshooting-for-integration-advisor-2de873e.md
- [ ] All files in `/docs/ci/IntegrationAdvisor/`

**Reference File**: `references/integration-advisor-tpm.md`
**Status**: Complete

### 14. Event Mesh
- [ ] event-mesh-3129673.md
- [ ] event-mesh-scope-4a89370.md
- [ ] what-are-events-9a5bf90.md
- [ ] what-are-event-brokers-f72428f.md
- [ ] what-are-topics-and-topic-subscriptions-1712c0d.md
- [ ] what-is-messaging-0ef235f.md
- [ ] understanding-event-driven-architecture-2604955.md
- [ ] topic-naming-syntax-62460b8.md
- [ ] glossary-for-event-mesh-501ba2d.md
- [ ] queues-99b7501.md
- [ ] access-the-message-service-abbb36a.md
- [ ] configure-a-message-client-867c517.md
- [ ] message-service-monitor-26a7894.md
- [ ] initiating-the-message-broker-61eb5dd.md
- [ ] creating-an-event-mesh-message-client-using-the-cloud-foundry-command-line-interface-23df43b.md
- [ ] webhook-subscriptions-58e3729.md

**Reference File**: `references/event-mesh.md`
**Status**: Complete

### 15. Trading Partner Management
- [ ] trading-partner-management-28fe3dc.md
- [ ] accessibility-features-in-sap-trading-partner-management-c17213a.md
- [ ] glossary-for-sap-trading-partner-management-81860a4.md
- [ ] troubleshooting-for-trading-partner-management-c5eaae5.md

**Reference File**: `references/integration-advisor-tpm.md` (TPM section)
**Status**: Complete

### 16. Integration Assessment
- [ ] integration-assessment-310067e.md
- [ ] what-is-integration-assessment-eeee253.md
- [ ] integration-assessment-process-5769fcd.md
- [ ] integration-assessment-apis-47847b5.md
- [ ] glossary-for-integration-assessment-5c29e9b.md
- [ ] sap-integration-solution-advisory-methodology-a2e17f3.md
- [ ] create-a-questionnaire-4dc1b9c.md
- [ ] questionnaires-da3f7d8.md
- [ ] create-a-scenario-evaluation-request-435ec61.md
- [ ] determine-an-integration-technology-69b6dae.md
- [ ] review-integration-technology-47439ac.md
- [ ] integration-styles-and-integration-use-case-patterns-770909d.md
- [ ] technology-mapping-a50d8d6.md

**Reference File**: `references/migration-assessment.md` (ISA-M section)
**Status**: Complete

### 17. Migration Assessment & Tooling
- [ ] what-is-migration-assessment-164b835.md
- [ ] migration-assessment-5c5e50e.md
- [ ] what-is-migration-tooling-1a3bfbc.md
- [ ] migration-tooling-6061016.md
- [ ] migration-approaches-9ddb257.md
- [ ] migration-patterns-40c080f.md
- [ ] known-limitations-of-migration-tooling-7a7552d4.md
- [ ] troubleshooting-for-migration-assessment-63430e2.md
- [ ] add-an-sap-process-orchestration-system-5f76723.md
- [ ] connecting-an-sap-process-orchestration-system-4120ecb.md
- [ ] supported-components-46b27d1.md
- [ ] supported-patterns-ad867ae.md
- [ ] modularizing-supported-patterns-59515e5.md
- [ ] pipeline-approach-efc40f8.md
- [ ] standard-approach-1b75b4a.md

**Reference File**: `references/migration-assessment.md`
**Status**: Complete

### 18. Data Space Integration
- [ ] data-space-integration-8bb6972.md
- [ ] what-is-data-space-integration-4edeee5.md
- [ ] concepts-in-data-space-integration-fcf96b2.md
- [ ] consuming-data-space-assets-5c0cdb8.md
- [ ] consuming-http-assets-735300c.md
- [ ] consuming-s3-and-azure-assets-4afdf5c.md
- [ ] discovering-offers-through-a-catalog-90f3619.md
- [ ] triggering-contract-negotiations-and-transferring-assets-with-edr-management-apis-eace95e.md
- [ ] using-apis-to-work-with-data-space-integration-411fd1e.md
- [ ] troubleshooting-for-data-space-integration-166fa88.md
- [ ] accessibility-features-in-data-space-integration-dc5c2ee.md

**Reference File**: `references/data-space-integration.md`
**Status**: Complete

### 19. Graph
- [ ] graph-e03300f.md
- [ ] what-is-graph-ad1c48d.md
- [ ] business-data-graph-894e28c.md
- [ ] custom-entities-af8dcd6.md
- [ ] mirrored-entities-07fdc7a.md
- [ ] unified-entities-9bcd2ec.md
- [ ] custom-odata-services-3c8a6ad.md
- [ ] configure-the-visibility-of-graph-navigator-f5bd17d.md
- [ ] troubleshooting-for-graph-2cfb06c.md

**Reference File**: `references/graph-odata.md`
**Status**: Complete

### 20. OData Provisioning
- [ ] odata-provisioning-d257fc3.md
- [ ] feature-matrix-for-odata-provisioning-f184bf1.md
- [ ] runtime-access-and-role-assignment-for-odata-provisioning-b46816c.md
- [ ] troubleshooting-for-odata-provisioning-cdcbaa2.md

**Reference File**: `references/graph-odata.md` (OData section)
**Status**: Complete

### 21. Operations & Monitoring
- [ ] operating-and-monitoring-cloud-integration-c401afc.md
- [ ] monitor-message-processing-314df3f.md
- [ ] message-processing-log-b32f8cd.md
- [ ] message-status-733a57b.md
- [ ] managing-message-queues-cdcce24.md
- [ ] managing-data-stores-ac39f1d.md
- [ ] managing-variables-ca93653.md
- [ ] managing-number-ranges-b6e17fa.md
- [ ] runtime-status-c14a7b1.md
- [ ] setting-log-levels-4e6d3fc.md
- [ ] tracing-the-execution-of-an-integration-flow-4ec27d3.md
- [ ] inspect-* files (resource inspection)
- [ ] perform-connectivity-tests-cc9f47a.md
- [ ] health-checks-and-recommended-actions-for-sap-integration-advisor-node-433e594.md
- [ ] system-monitoring-689a9a1.md
- [ ] operations-cockpit-ec0fc95.md
- [ ] application-monitoring-c9863ba.md
- [ ] component-monitor-49f487e.md
- [ ] alerting-fe8c67d.md
- [ ] monitor-the-health-of-certificates-using-sap-cloud-alm-7bd9d9f.md

**Reference File**: `references/operations-monitoring.md`
**Status**: Complete

### 22. Content Transport
- [ ] content-transport-cb7d2f1.md
- [ ] content-transport-e3c79d6.md
- [ ] content-transport-using-cloud-transport-management-d458b17.md
- [ ] content-transport-using-cts-3cdfb51.md
- [ ] content-transport-using-manual-export-and-import-fd23e14.md
- [ ] content-transport-using-mtar-download-c111710.md
- [ ] guidelines-and-best-practices-for-content-transport-8a8aa38.md
- [ ] enabling-content-transport-cloud-foundry-environment-452c677.md
- [ ] decision-help-for-choosing-the-right-content-transport-option-19e0e73.md
- [ ] transport-api-management-artifacts-via-sap-cloud-transport-management-service-2e4bc72.md

**Reference File**: `references/content-transport.md`
**Status**: Complete

### 23. Setup & Configuration
- [ ] initial-setup-17ab4a2.md
- [ ] initial-setup-64ac761.md
- [ ] initial-setup-b2bdea7.md
- [ ] activating-and-managing-capabilities-2ffb343.md
- [ ] activating-the-capability-b49ad35.md
- [ ] configuring-user-access-6ae0ff7.md
- [ ] configuring-user-access-to-sap-integration-suite-2c6214a.md
- [ ] assigning-role-collections-to-users-80bb02e.md
- [ ] create-a-role-collection-d9aade6.md
- [ ] comprehensive-breakdown-of-role-collections-in-api-management-f3049e2.md
- [ ] role-collections-in-api-management-7010b58.md
- [ ] connectivity-options-93d82e8.md
- [ ] connect-to-your-business-systems-ea9b75c.md
- [ ] before-you-start-1d116bd.md
- [ ] preparatory-steps-95366b2.md

**Reference File**: `references/setup-configuration.md`
**Status**: Pending

### 24. Troubleshooting
- [ ] troubleshooting-for-sap-integration-suite-8e77039.md
- [ ] troubleshooting-for-cloud-integration-37743c2.md
- [ ] troubleshooting-for-api-management-e765066.md
- [ ] troubleshooting-for-edge-integration-cell-816d9e4.md
- [ ] troubleshooting-adapters-b7a3906.md
- [ ] troubleshooting-integration-flows-c0052ae.md
- [ ] troubleshooting-message-mapping-cb5311a.md
- [ ] troubleshooting-sender-receiver-systems-c5c8328.md
- [ ] troubleshooting-transporting-content-bbfb41a.md
- [ ] troubleshooting-http-error-catalog-069b461.md
- [ ] troubleshooting-cloud-integration-public-apis-af02d40.md
- [ ] All fix-* files

**Reference File**: `references/troubleshooting.md`
**Status**: Complete

### 25. Best Practices & Guidelines
- [ ] best-practices-b16cf85.md
- [ ] integration-flow-design-guidelines-6803389.md
- [ ] guidelines-to-design-enterprise-grade-integration-flows-a8cd981.md
- [ ] guidelines-to-implement-specific-integration-patterns-eaf929e.md
- [ ] guidelines-and-best-practices-for-message-monitoring-6f598b4.md
- [ ] guidelines-and-best-practices-for-content-transport-8a8aa38.md
- [ ] guidelines-for-modifying-content-6a7c9a1.md
- [ ] guidelines-on-role-assignments-fc409e8.md
- [ ] handle-errors-gracefully-42c95f7.md
- [ ] optimize-memory-footprint-dc24074.md
- [ ] optimize-performance-491c80d.md
- [ ] optimize-integration-flow-design-for-streaming-396941a.md
- [ ] keep-readability-in-mind-578fa77.md
- [ ] run-an-integration-flow-under-well-defined-boundary-conditions-f8cf974.md
- [ ] apply-a-balanced-encapsulation-of-the-integration-logics-e010db3.md

**Reference File**: `references/best-practices.md`
**Status**: Pending

### 26. APIs & Programmatic Access
- [ ] api-documentation-e26b332.md
- [ ] api-services-007d50f.md
- [ ] accessing-api-management-apis-programmatically-24a2c37.md
- [ ] accessing-developer-hub-apis-programmatically-dabee6e.md
- [ ] creating-service-instance-and-service-key-to-enable-api-calling-749897f.md
- [ ] odata-api-a617d6f.md
- [ ] integration-assessment-apis-47847b5.md
- [ ] generating-integration-content-using-apis-6922c86.md

**Reference File**: `references/apis.md`
**Status**: Pending

### 27. Limits & Sizing
- [ ] limits-a61f1ce.md
- [ ] limits-in-api-management-f70f425.md
- [ ] sizing-guidelines-bcc6f62.md
- [ ] jms-resource-limits-and-optimizing-their-usage-4857054.md

**Reference File**: Included in main SKILL.md
**Status**: Pending

### 28. What's New & Release Notes
- [ ] what-s-new-for-sap-integration-suite-79cd682.md
- [ ] what-s-new-for-sap-api-management-cloud-foundry-d9d60be.md
- [ ] patch-release-notes-for-sap-integration-suite-58595b5.md
- [ ] patch-releases-for-api-management-6ddd927.md
- [ ] patch-releases-for-cloud-integration-and-related-components-023a472.md
- [ ] understanding-software-version-numbers-caad468.md

**Reference File**: Links only (frequently updated)
**Status**: Pending

---

## Reference Files Created

| File | Topics Covered | Status |
|------|----------------|--------|
| `cloud-integration.md` | CI capability, iFlows, flow steps, mapping, development | Complete |
| `adapters.md` | All 80+ adapter configurations | Complete |
| `scripting.md` | Groovy/JavaScript scripting patterns and API | Complete |
| `security.md` | Security configurations, keys, certificates, auth | Complete |
| `api-management.md` | APIM capability, policies, Developer Hub | Complete |
| `edge-integration-cell.md` | Hybrid/edge Kubernetes deployments | Complete |
| `event-mesh.md` | Event-driven architecture, topics, queues | Complete |
| `integration-advisor-tpm.md` | B2B integration, MIGs, MAGs, TPM | Complete |
| `graph-odata.md` | Business data graph, OData provisioning | Complete |
| `migration-assessment.md` | PO migration, ISA-M methodology | Complete |
| `data-space-integration.md` | Data space capabilities, Catena-X, EDC | Complete |
| `operations-monitoring.md` | Operations, monitoring, alerts | Complete |
| `content-transport.md` | Transport mechanisms (TMS, CTS+, MTAR) | Complete |
| `troubleshooting.md` | Error resolution, diagnostics | Complete |

---

## Templates Created

| Template | Purpose | Status |
|----------|---------|--------|
| `groovy-script-template.groovy` | Common Groovy script patterns and API usage | Complete |
| `api-policy-template.xml` | All 34 API policy types with XML examples | Complete |

---

## Documentation Links for Updates

### Official SAP Documentation
- **Main Repository**: https://github.com/SAP-docs/sap-btp-integration-suite
- **SAP Help Portal**: https://help.sap.com/docs/integration-suite
- **SAP Community**: https://community.sap.com/topics/cloud-platform-integration-suite

### ISuite Documentation
- **ISuite Folder**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite

### Cloud Integration Documentation
- **CI Folder**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci
- **Development**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Development
- **Operations**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Operations

### API Management Documentation
- **APIM Folder**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/apim
- **API-Management**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/apim/API-Management

---

## Notes

1. **File naming**: SAP uses a pattern of `descriptive-name-{hash}.md` where hash is a unique identifier
2. **Cross-references**: Many files reference other files in the documentation
3. **Progressive disclosure**: Core concepts in SKILL.md, details in reference files
4. **Update frequency**: Check GitHub commits for documentation updates

---

## Maintenance Guidelines

### Versioning Strategy

| Version Component | When to Increment | Example |
|-------------------|-------------------|---------|
| **Major** (X.0.0) | Breaking changes, major feature additions | New capability coverage |
| **Minor** (1.X.0) | New reference files, significant updates | Added event-mesh.md |
| **Patch** (1.0.X) | Bug fixes, typo corrections, minor updates | Fixed code examples |

### Recommended Update Cadence

| Frequency | Task |
|-----------|------|
| **Monthly** | Check SAP documentation for critical updates |
| **Quarterly** | Full review of all reference files against source docs |
| **Per SAP Release** | Update for new features, deprecations, breaking changes |
| **As Needed** | Address reported issues, community feedback |

### Maintainer Responsibilities

1. **Documentation Sync**
   - Monitor https://github.com/SAP-docs/sap-btp-integration-suite for commits
   - Review SAP release notes for Integration Suite updates
   - Update "Last Updated" dates when making changes

2. **Quality Assurance**
   - Verify code examples compile/run correctly
   - Test templates in actual Integration Suite environment
   - Validate links to external documentation

3. **Community Support**
   - Respond to GitHub issues within 1 week
   - Accept and review community PRs
   - Document known issues and workarounds

### Ownership

| Area | Responsibility |
|------|----------------|
| **Overall Skill** | SAP Skills Maintainers |
| **Cloud Integration** | Core team |
| **API Management** | Core team |
| **Event Mesh** | Core team |
| **Edge Integration Cell** | Core team |

---

**Last sync with source**: 2025-11-22
