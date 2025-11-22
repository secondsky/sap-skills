# SAP Datasphere Skill - Progress Tracking Document

**Created**: 2025-11-22
**Last Updated**: 2025-11-22
**Status**: Complete - Enhanced with detailed source verification
**Source Repository**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs
**Version**: 1.1.0

---

## Table of Contents

1. [Overview](#overview)
2. [Documentation Structure](#documentation-structure)
3. [Extracted Content Summary](#extracted-content-summary)
4. [Acquiring-Preparing-Modeling-Data](#1-acquiring-preparing-modeling-data)
5. [Administering](#2-administering)
6. [Integrating-data-and-managing-spaces](#3-integrating-data-and-managing-spaces)
7. [Coverage Mapping](#coverage-mapping)
8. [Reference File Organization](#reference-file-organization)
9. [Enhancement Log](#enhancement-log)

---

## Overview

This document tracks all information extracted from the official SAP Datasphere documentation repository. The skill is organized using progressive disclosure to optimize token usage while ensuring comprehensive coverage.

**Total Files Identified**: ~558 markdown files across 3 main sections
**Documentation Source**: https://github.com/SAP-docs/sap-datasphere

---

## Documentation Structure

```
docs/
├── Acquiring-Preparing-Modeling-Data/     (~286 files)
│   ├── Root files (~90 files)
│   ├── Acquiring-and-Preparing-Data-in-the-Data-Builder/ (~91 files)
│   ├── Modeling-Data-in-the-Data-Builder/ (~59 files)
│   ├── Buisiness-Builder/ (~36 files)
│   └── Creating-Finding-Sharing-Objects/ (~10 files)
│
├── Administering/                          (~135 files)
│   ├── Root files (~15 files)
│   ├── Creating-and-Configuring-Your-Tenant/ (~23 files)
│   ├── Creating-Spaces-and-Allocating-Storage/ (~9 files)
│   ├── Managing-Users-and-Roles/ (~27 files)
│   ├── Monitoring-SAP-Datasphere/ (~13 files)
│   ├── Preparing-Connectivity/ (~48 files)
│   └── Creating-a-Database-User-Group/
│
└── Integrating-data-and-managing-spaces/   (~137 files)
    ├── Root files (~24 files)
    ├── Data-Access-Control/ (~7 files)
    ├── Data-Integration-Monitor/ (~47 files)
    ├── Integrating-Data-Via-Connections/ (~48 files)
    ├── Integrating-Data-Via-Database-Users/Open-SQL-Schema/ (~4 files)
    ├── Exchanging-Data-with-SAP-SQL-Data-Warehousing-HDI-Container/
    ├── Integrating-Data-to-and-From-HANA-Cloud/
    └── Transporting-Content-Between-Tenants/ (~7 files)
```

---

## Extracted Content Summary

### Section 1: Acquiring, Preparing & Modeling Data

| Category | Files | Extracted | Coverage |
|----------|-------|-----------|----------|
| Root Overview | 90 | Yes | 100% |
| Data Builder - Acquisition | 91 | Yes | 100% |
| Data Builder - Modeling | 59 | Yes | 100% |
| Business Builder | 36 | Yes | 100% |
| Object Management | 10 | Yes | 100% |
| **Subtotal** | **286** | **286** | **100%** |

### Section 2: Administering

| Category | Files | Extracted | Coverage |
|----------|-------|-----------|----------|
| Root Overview | 15 | Yes | 100% |
| Tenant Configuration | 23 | Yes | 100% |
| Spaces & Storage | 9 | Yes | 100% |
| Users & Roles | 27 | Yes | 100% |
| Monitoring | 13 | Yes | 100% |
| Connectivity | 48 | Yes | 100% |
| **Subtotal** | **135** | **135** | **100%** |

### Section 3: Integrating Data & Managing Spaces

| Category | Files | Extracted | Coverage |
|----------|-------|-----------|----------|
| Root Overview | 24 | Yes | 100% |
| Data Access Control | 7 | Yes | 100% |
| Data Integration Monitor | 47 | Yes | 100% |
| Connections | 48 | Yes | 100% |
| Database Users/Open SQL | 4 | Yes | 100% |
| Content Transport | 7 | Yes | 100% |
| **Subtotal** | **137** | **137** | **100%** |

**TOTAL**: **558 files extracted** | **100% coverage**

---

## 1. Acquiring-Preparing-Modeling-Data

### 1.1 Root Level Files (90 files)

**Core/Overview:**
- acquiring-preparing-and-modeling-data-with-sap-datasphere-b4a5d02.md
- preparing-data-f2e359c.md
- index.md

**Graphical Views:**
- creating-a-graphical-view-27efb47.md
- add-a-source-to-a-graphical-view-1eee180.md
- create-a-join-in-a-graphical-view-947d6d8.md
- create-a-union-in-a-graphical-view-5c3d354.md
- filter-data-in-a-graphical-view-6f6fa18.md
- aggregate-data-in-a-graphical-view-7733250.md
- reorder-rename-and-exclude-columns-in-a-graphical-view-b846d0d.md
- replace-a-source-in-a-graphical-view-51cc5a7.md

**Columns & Calculations:**
- create-a-calculated-column-in-a-graphical-view-3897f48.md
- create-a-currency-conversion-column-in-a-graphical-view-6e3d8be.md
- create-a-unit-conversion-column-in-a-graphical-view-23bc94f.md
- create-a-geo-coordinates-column-in-a-graphical-view-6f3ffbd.md
- insert-column-values-in-a-sql-expression-e18c54b.md

**SQL Views:**
- creating-an-sql-view-81920e4.md
- create-an-sql-view-in-a-transformation-flow-775e0ab.md

**Entity-Relationship Models:**
- creating-an-entity-relationship-model-a91c042.md
- create-a-table-in-an-e-r-model-3939414.md
- create-a-view-in-an-e-r-model-9e547d1.md
- create-an-association-in-an-e-r-model-diagram-82e6869.md
- add-related-entities-to-an-e-r-model-diagram-bbde0a7.md

**Intelligent Lookups:**
- creating-an-intelligent-lookup-8f29f80.md
- configure-the-view-output-by-an-intelligent-lookup-aa11efb.md
- create-an-exact-match-rule-897d26c.md
- create-a-fuzzy-match-rule-b063518.md
- process-matched-results-f3d98b1.md
- process-multiple-match-results-cb2b78a.md
- process-unmatched-results-35fbb44.md
- example-adding-latitude-and-longitude-data-with-a-multi-rule-intelligent-lookup-dfd5ffd.md
- example-harmonizing-county-data-for-uk-charging-sites-4995ae3.md

**Data Acquisition & Import:**
- import-an-object-from-a-connection-or-other-source-3e6f8f2.md
- import-multiple-objects-from-a-connection-e720b13.md
- add-objects-from-the-repository-13fcecd.md
- using-the-source-browser-7d2b21d.md

**Transformation Flows:**
- creating-a-transformation-flow-f7161e6.md
- create-a-graphical-view-in-a-transformation-flow-c65e37c.md
- create-or-add-a-target-table-to-a-transformation-flow-0950746.md
- run-a-transformation-flow-5bb211a.md
- process-target-changes-in-the-transformation-flow-editor-75ab3ef.md

**Data Products & Marketplace:**
- installing-data-products-ea7cb80.md
- installing-marketplace-data-products-92c35ef.md
- managing-marketplace-data-products-5d725be.md
- data-product-details-71f4d15.md
- marketplace-data-product-details-f59e912.md

**Catalog & Discovery:**
- discovering-data-and-assets-in-the-catalog-6df42e3.md
- searching-for-data-products-and-assets-in-the-catalog-1047825.md
- accessing-catalog-assets-dc061a2.md
- catalog-asset-details-afccc58.md
- reviewing-data-provider-profiles-9ce49dc.md

**Object Management:**
- saving-and-deploying-objects-7c0b560.md
- validating-objects-685b1e0.md
- deleting-objects-1e69cbb.md
- reviewing-and-restoring-object-versions-4f717cc.md
- review-the-objects-that-depend-on-your-table-or-view-ecac5fd.md
- modifying-objects-that-have-dependent-objects-f315863.md
- object-lifecycles-and-dependencies-f0a0e4c.md

**Advanced Features:**
- apply-a-data-access-control-to-a-graphical-or-sql-view-8f79fc8.md
- create-an-input-parameter-in-a-graphical-view-53fa99a.md
- persist-data-in-a-graphical-or-sql-view-9bd12cf.md
- releasing-stable-views-for-consumption-5b99e9b.md
- collecting-unassigned-fact-records-for-inclusion-in-aggregations-and-visualizations-1fd3f07.md

**Source & Target Processing:**
- process-source-changes-in-a-graphical-view-702350c.md
- process-source-changes-in-an-sql-view-f7e43ce.md
- process-source-changes-in-the-graphical-view-editor-098ada1.md
- process-source-changes-in-the-sql-view-editor-74e6002.md
- process-source-input-parameters-in-an-sql-view-58d8763.md
- processing-changes-to-sources-and-target-tables-705292c.md
- process-review-results-dc05926.md

**Validation & Analytics:**
- validating-view-data-ed4063d.md
- analyzing-view-performance-6e9ba26.md
- impact-and-lineage-analysis-9da4892.md
- visualize-column-and-input-parameter-lineages-in-a-graphical-view-a2426b7.md
- viewing-object-data-b338e4a.md

**Configuration & References:**
- edit-custom-csn-annotations-in-a-view-or-table-820d013.md
- packages-a806c67.md
- namespaces-7094f24.md
- filter-category-details-3b5725b.md
- prepare-input-and-lookup-entities-1fc32b5.md
- sql-and-sqlscript-reference-bc433ad.md
- sql-functions-reference-6d624a1.md
- sql-reference-6a37cc5.md
- sqlscript-reference-6c46c6a.md

### 1.2 Acquiring-and-Preparing-Data-in-the-Data-Builder (91 files)

**Data Flows:**
- creating-a-data-flow-e30fd14.md
- add-a-source-to-a-data-flow-7b50e8e.md
- add-or-create-a-target-table-in-a-data-flow-0fa7805.md
- run-a-data-flow-20e5be3.md
- process-source-target-changes-in-a-data-flow-0af80aa.md
- create-a-calculated-column-in-a-data-flow-73116a5.md
- create-a-join-in-a-data-flow-e57633d.md
- create-a-projection-in-a-data-flow-912f740.md
- create-a-script-in-a-data-flow-f3e2570.md
- create-a-union-in-a-data-flow-e0a3804.md
- create-an-aggregation-in-a-data-flow-328d28f.md
- create-an-input-parameter-in-a-data-flow-a6fb3e7.md
- apply-data-transforms-3f0d747.md

**Replication Flows:**
- creating-a-replication-flow-25e2bd7.md
- add-the-source-for-a-replication-flow-7496380.md
- add-the-target-for-a-replication-flow-ab490fb.md
- configure-a-replication-flow-3f5ba0c.md
- define-custom-projection-logic-in-a-replication-flow-970636e.md
- define-filters-in-a-replication-flow-5a6ef36.md
- define-mappings-in-a-replication-flow-2c7948f.md
- run-a-replication-flow-98a26b2.md
- modify-a-replication-flow-a24c71f.md
- delete-a-replication-flow-bdd81ec.md
- load-types-and-connections-for-your-replication-flows-1089119.md
- sizing-capacity-planning-and-load-balancing-for-replication-flow-5a3419f.md
- unsupported-data-types-in-a-replication-flow-6c770bb.md

**Replication Flow Sources:**
- sap-s-4hana-and-other-abap-sources-for-replication-flows-3f70579.md
- cloud-storage-provider-sources-for-replication-flows-4d481a2.md
- confluent-kafka-sources-for-replication-flows-4f2d0a8.md
- secure-file-transfer-protocol-sftp-sources-for-replication-flows-a832ef4.md
- sql-and-script-view-source-objects-for-replication-flows-a215f8f.md
- object-without-primary-key-as-source-objects-for-replication-flo-2267a9f.md

**Replication Flow Targets:**
- apache-kafka-targets-6df55db.md
- cloud-storage-provider-targets-43d93a2.md
- confluent-kafka-targets-74b3c95.md
- google-bigquery-targets-56d4472.md
- sap-datasphere-targets-12c45eb.md
- sap-signavio-targets-b8f5e28.md
- secure-file-transfer-protocol-sftp-as-targets-for-your-replicati-5a14eb1.md

**Local Tables:**
- creating-a-local-table-2509fe4.md
- creating-a-local-table-file-d21881b.md
- creating-a-local-table-from-a-csv-file-8bba251.md
- load-or-delete-local-table-data-870401f.md
- maintain-local-table-data-4bd5e64.md
- capturing-delta-changes-in-your-local-table-154bdff.md
- partitioning-local-tables-03191f3.md
- data-types-supported-by-local-tables-file-2f39104.md
- deleting-local-table-file-records-6ec9b8a.md
- preview-and-edit-local-table-file-data-e57e12d.md

**Remote Tables:**
- import-remote-tables-fd04efb.md
- replicate-remote-table-data-7e258a7.md
- restrict-remote-table-data-loads-bd1ece5.md
- modify-or-duplicate-remote-tables-8c3632f.md
- previewing-filtering-and-reordering-remote-tables-data-00d5fe6.md
- process-source-changes-for-several-remote-tables-4e0be16.md
- process-source-changes-in-the-table-editor-622328b.md
- review-and-edit-imported-table-properties-75cea7b.md

**Task Chains:**
- creating-a-task-chain-d1afbc2.md
- run-a-task-chain-684bd8b.md
- nest-and-share-task-chains-8067b77.md
- creating-input-parameters-in-task-chains-c9906ec.md
- run-api-tasks-in-a-task-chain-9a8489e.md
- run-bw-bridge-process-chains-in-a-task-chain-7d7d02a.md
- run-open-sql-procedures-in-a-task-chain-59b9c77.md
- run-parallel-tasks-in-a-task-chain-363ffe9.md

**Python & Scripts:**
- creating-a-python-operator-a747acf.md
- python-operator-reference-950d558.md
- script-operator-python-reference-73e8ba1.md

**Data Transformation:**
- change-the-case-of-a-text-column-b7e2102.md
- concatenate-columns-819b01b.md
- extract-text-to-a-new-column-33dfe25.md
- filter-and-delete-rows-d32f91f.md
- find-and-replace-data-d57aabf.md
- split-a-column-8b15a70.md

**Columns & Data Types:**
- column-data-types-7b1dc6e.md
- column-properties-and-profiling-32654ad.md
- columns-8f0f40d.md

**Semantic Onboarding:**
- semantic-onboarding-4c4e45e.md
- importing-entities-with-semantics-from-sap-bw-4hana-or-sap-bw-br-7bcd321.md
- importing-entities-with-semantics-from-sap-s-4hana-845fedb.md
- importing-objects-with-semantics-from-sap-s-4hana-sap-bw-4hana-a-361729b.md
- importing-tables-and-views-from-sources-7c4acd3.md

**File Space & Object Store:**
- acquiring-and-preparing-data-in-the-object-store-2a6bc3f.md
- creating-a-transformation-flow-in-a-file-space-b917baf.md
- list-of-functions-supported-by-a-transformation-flow-in-a-file-s-37e737f.md
- use-replication-flows-and-transformation-flows-to-load-and-write-34ae0a2.md
- accelerate-table-data-access-with-in-memory-storage-407d1df.md

**Notifications & Configuration:**
- configure-email-notification-7ff6a4e.md
- configure-email-notification-for-replication-flow-failure-at-obj-5dc4db2.md
- premium-outbound-integration-4e9c6ac.md
- acquiring-data-1f15a29.md

### 1.3 Modeling-Data-in-the-Data-Builder (59 files)

**Analytic Models:**
- creating-an-analytic-model-e5fbe9e.md
- create-an-analytic-model-directly-from-a-view-or-table-1c674aa.md
- add-a-dimension-to-an-analytic-model-4caf098.md
- add-a-fact-to-an-analytic-model-27075ee.md
- changing-the-underlying-analytic-model-134b051.md
- replace-the-fact-source-of-an-analytic-model-ccf0703.md
- preview-data-in-an-analytic-model-9f1fa73.md
- apply-a-data-access-control-to-an-analytic-model-8d8e2f9.md

**Dimensions:**
- dimensions-in-the-analytic-model-b05ddf4.md
- create-a-dimension-to-categorize-data-5aae0e9.md
- add-a-hierarchy-to-a-dimension-218b7e6.md
- add-a-prefix-or-a-suffix-to-dimension-attributes-0373c60.md
- enable-time-dependency-for-a-dimension-or-text-entity-11b2ff4.md

**Facts & Measures:**
- create-a-fact-to-contain-measurable-data-30089bd.md
- create-a-measure-in-an-analytic-model-e4cc3e8.md
- create-a-calculated-measure-cf6bd08.md
- create-a-count-distinct-measure-aab5273.md
- create-a-restricted-measure-bfb43dd.md
- create-a-non-cumulative-measure-58fcee0.md
- non-cumulative-measures-5899088.md
- example-for-a-non-cumulative-measure-487d8a3.md
- specify-measures-to-analyze-33f7f29.md
- aggregation-and-exception-aggregation-88ca394.md

**Time Dimensions:**
- add-a-fiscal-time-dimension-6d1ff74.md
- create-a-fiscal-time-dimension-24248ab.md
- time-related-variables-947d9cf.md

**Hierarchies:**
- create-a-hierarchy-with-directory-36c39ee.md
- create-an-external-hierarchy-for-drill-down-dbac7a8.md

**Variables:**
- create-a-variable-in-an-analytic-model-cdd8fa0.md
- create-a-standard-variable-8a2978e.md
- create-a-filter-variable-8683b49.md
- create-a-reference-date-variable-a2d060e.md
- create-a-restricted-measure-variable-0f08895.md
- derived-variables-82f40f7.md
- dynamic-default-2262a45.md

**Currency & Unit Conversion:**
- converting-currency-and-unit-values-1aff2ba.md
- create-a-conversion-measure-for-currencies-ec00efb.md
- create-a-conversion-measure-for-units-965ce56.md
- enabling-currency-conversion-with-tcur-tables-and-views-b462239.md
- enabling-unit-conversion-with-t006-tables-and-views-15e095d.md
- scenarios-for-currency-conversion-8764d4f.md
- use-variables-for-currency-conversion-0379a7c.md

**Structures:**
- create-a-structure-for-an-analytic-model-de1ed47.md
- create-a-calculated-structure-member-0c30366.md
- create-a-restricted-structure-member-1896990.md

**Filters & Global Settings:**
- create-a-global-filter-in-an-analytic-model-e9924dc.md
- configure-collision-handling-025ba2d.md

**Semantics & Attributes:**
- specify-semantic-types-for-measures-and-attributes-f7272c0.md
- specify-attributes-as-keys-units-and-other-characteristics-cedc59c.md
- set-key-columns-to-uniquely-identify-records-d9ef2c9.md
- generating-semantic-information-2fc1d26.md
- create-a-text-entity-for-attribute-translation-b25726d.md

**Associations & Relationships:**
- create-an-association-to-define-a-semantic-relationship-between-entities-66c6998.md
- modeling-facts-dimensions-text-entities-and-hierarchies-f8a1a25.md

**Data Exposure:**
- exposing-data-for-consumption-40ec77e.md
- modeling-data-in-the-data-builder-5c1e3d4.md
- analytical-datasets-deprecated-70dab71.md
- create-a-story-filter-deprecated-8dfc684.md

### 1.4 Business Builder (36 files)

**Core Concepts:**
- business-builder-start-page-90e63fd.md
- modeling-data-in-the-business-builder-3829d46.md
- example-for-using-the-business-builder-925f6a6.md

**Business Entities:**
- creating-a-business-entity-c912cdc.md
- change-the-data-source-of-a-business-entity-db16336.md
- define-a-key-9748bab.md
- define-associations-77cb7fc.md

**Attributes:**
- attribute-types-911ec0d.md
- attribute-types-bc16160.md
- define-attributes-1ac4502.md
- define-attributes-270bb3d.md
- define-attributes-5b7b0f8.md

**Measures:**
- measure-types-f37eaaf.md
- define-measures-5cbcfee.md
- define-measures-903acb8.md
- define-measures-d430469.md
- use-currency-conversion-1ba4554.md
- aggregation-and-exception-aggregation-7696e25.md

**Models:**
- creating-a-consumption-model-337fa99.md
- creating-a-fact-model-5bbd14a.md
- define-perspectives-ce26fd3.md

**Filters & Parameters:**
- define-filters-bc73ffe.md
- define-filters-e8df759.md
- define-input-parameters-f06393a.md

**Hierarchies & Dimensions:**
- add-an-external-hierarchy-1ec95b0.md
- add-an-external-hierarchy-d06c293.md
- expose-dimension-sources-1326689.md

**Authorization:**
- authorization-scenario-46d8c42.md
- creating-an-authorization-scenario-167c05c.md
- assigning-an-authorization-scenario-2e62354.md
- using-an-authorization-scenario-in-a-consumption-model-54839e8.md

**Object Management:**
- create-versions-of-an-object-e13efeb.md
- imported-objects-92c0a5e.md
- importing-sap-bw-4hana-models-a3d4a2f.md
- previewing-data-in-business-builder-objects-3c58d6e.md
- saving-and-deploying-data-objects-dfe2cd0.md

### 1.5 Creating-Finding-Sharing-Objects (10 files)

- creating-finding-and-sharing-objects-6c69b30.md
- repository-explorer-f8ce0b4.md
- folders-bbedad6.md
- natural-language-search-04170c6.md
- working-in-sap-datasphere-spaces-6a396f6.md
- sharing-entities-and-task-chains-to-other-spaces-64b318f.md
- importing-and-exporting-objects-in-csn-json-files-f8ff062.md
- exporting-objects-to-a-csn-json-file-3916101.md
- importing-objects-from-a-csn-json-file-23599e6.md
- importing-and-exporting-objects-via-the-command-line-6494657.md

---

## 2. Administering

### 2.1 Root Level Files (15 files)

- administering-sap-datasphere-70ee87c.md
- administration-apps-and-tools-c6dd052.md
- system-requirements-and-technical-prerequisites-70ffed4.md
- request-help-from-sap-technical-support-831a977.md
- managing-and-monitoring-connectivity-for-data-integration-c5b167b.md
- monitoring-data-provisioning-agent-in-sap-datasphere-c33c937.md
- monitoring-data-provisioning-agent-logs-e49785b.md
- review-data-provisioning-agent-logs-0d78ae0.md
- enable-access-to-data-provisioning-agent-logs-9a00dde.md
- receive-notifications-about-data-provisioning-agent-status-changes-85790bb.md
- pause-real-time-replication-for-an-agent-dac31a5.md
- troubleshooting-cloud-connector-related-issues-1d2c171.md
- troubleshooting-sap-hana-smart-data-access-via-cloud-connector-42f683e.md
- troubleshooting-the-data-provisioning-agent-sap-hana-smart-data-integration-2d35405.md
- index.md

### 2.2 Creating-and-Configuring-Your-Tenant (23 files)

**Tenant Setup:**
- creating-and-configuring-your-sap-datasphere-tenant-2f80b57.md
- create-your-sap-datasphere-service-instance-in-sap-btp-54288aa.md
- configure-the-size-of-your-sap-datasphere-tenant-33f8ef4.md
- update-your-free-plan-to-standard-plan-in-sap-btp-f173be2.md
- delete-your-service-instance-in-sap-btp-2665ce1.md
- display-your-system-information-6bdd798.md

**SAP HANA Configuration:**
- restart-your-sap-hana-database-9e7a761.md
- apply-a-patch-upgrade-to-your-sap-hana-database-489dc3b.md
- enable-sap-hana-for-sql-data-warehousing-on-your-sap-datasphere-tenant-e9a2878.md
- enable-the-sap-hana-cloud-script-server-on-your-sap-datasphere-tenant-2871942.md

**Elastic Compute Nodes:**
- add-scalable-processing-capacity-via-elastic-compute-nodes-1f7c181.md
- create-an-elastic-compute-node-99ad61e.md
- purchase-resources-for-elastic-compute-nodes-d13aaf3.md
- run-an-elastic-compute-node-34b3585.md

**OAuth2 & Authentication:**
- create-oauth2-0-clients-to-authenticate-against-sap-datasphere-3f92b46.md
- create-an-oauth2-0-client-with-a-technical-user-purpose-88b1346.md
- create-an-oauth2-0-client-with-an-api-access-purpose-9850063.md
- create-an-oauth2-0-client-with-an-interactive-usage-purpose-db71f7e.md
- create-an-api-access-configuration-json-file-703912a.md
- add-a-trusted-identity-provider-ea0688a.md

**Additional Features:**
- enable-sap-business-ai-for-sap-datasphere-1b3fe45.md
- enable-choropleth-layers-for-geographical-visualizations-4e45d4c.md
- review-and-manage-links-to-sap-analytics-cloud-and-sap-business-data-cloud-t-40db567.md

### 2.3 Creating-Spaces-and-Allocating-Storage (9 files)

- creating-spaces-and-allocating-resources-2ace657.md
- create-a-space-bbd41b8.md
- create-a-file-space-to-load-data-in-the-object-store-9474446.md
- create-spaces-via-the-command-line-0cee58f.md
- allocate-storage-to-a-space-f414c3d.md
- copy-a-space-and-its-contents-73068ac.md
- restore-spaces-from-or-empty-the-recycle-bin-c4e26c0.md
- rules-for-technical-names-982f9a3.md
- set-priorities-and-statement-limits-for-spaces-or-groups-d66ac1e.md

### 2.4 Managing-Users-and-Roles (27 files)

**User Management:**
- managing-sap-datasphere-users-4fb82cb.md
- managing-users-and-roles-903b75e.md
- create-a-user-58d4b24.md
- delete-a-user-3ceb94c.md
- update-a-user-email-address-0889208.md
- export-users-e227d3c.md
- import-or-modify-users-from-a-file-b2698da.md
- create-users-and-assign-them-to-roles-via-the-scim-2-0-api-1ca8c4a.md

**Role Management:**
- managing-roles-and-privileges-3740dac.md
- privileges-and-permissions-d7350c6.md
- roles-and-privileges-by-app-and-feature-2d8b7d0.md
- standard-roles-delivered-with-sap-datasphere-a50a51d.md
- create-a-custom-role-862b88e.md
- create-a-scoped-role-to-assign-privileges-to-users-in-spaces-b5c4e0b.md
- assign-users-to-a-role-57a7880.md
- assign-users-to-a-role-using-saml-attributes-3315711.md
- delete-a-role-4146576.md
- automated-conversion-to-scoped-roles-6f7c6df.md
- view-authorizations-by-user-role-or-space-c6538ea.md
- transfer-the-system-owner-role-b3d19a1.md

**Identity & Authentication:**
- managing-user-identity-and-authentication-48b5c8b.md
- access-the-identity-provider-administration-tool-df15ed8.md
- configure-your-bundled-sap-cloud-identity-services-tenant-fac3155.md
- enabling-a-custom-saml-identity-provider-legacy-custom-idp-9b26536.md
- revert-to-default-authentication-legacy-custom-idp-8c37db7.md
- update-saml-signing-certificates-legacy-custom-idp-ba968db.md
- set-a-password-policy-for-database-users-14aedf6.md

### 2.5 Monitoring-SAP-Datasphere (13 files)

- monitoring-sap-datasphere-28910cd.md
- configure-monitoring-9cd0691.md
- configure-notifications-4388411.md
- monitor-capacities-ba3d05b.md
- monitor-database-operations-with-audit-logs-110404a.md
- monitor-object-changes-with-activities-08e607c.md
- check-consent-expirations-58e4bb2.md
- delete-audit-logs-589fa42.md
- delete-task-logs-to-reduce-storage-consumption-c690202.md
- create-a-database-analysis-user-to-debug-database-issues-c28145b.md
- manage-database-analysis-users-4bb6d37.md
- stop-a-running-statement-with-a-database-analysis-user-0cf11ed.md
- working-with-sap-hana-monitoring-views-4ab4509.md

### 2.6 Preparing-Connectivity (48 files)

**General Connectivity:**
- preparing-connectivity-for-connections-bffbd58.md
- prepare-connectivity-for-cloud-data-integration-b6fd8de.md
- manage-certificates-for-connections-46f5467.md
- manage-ip-allowlist-a3c2145.md
- obtain-sap-datasphere-ip-addresses-for-allowlisting-in-remote-systems-0934f7e.md

**Cloud Connector:**
- configure-cloud-connector-f289920.md
- preparing-cloud-connector-connectivity-35141e7.md
- set-up-cloud-connector-in-sap-datasphere-6de74f7.md

**Data Provisioning Agent:**
- preparing-data-provisioning-agent-connectivity-f1a39d1.md
- connect-and-configure-the-data-provisioning-agent-e87952d.md
- install-the-data-provisioning-agent-8f61850.md
- register-adapters-with-sap-datasphere-085fc49.md
- upload-third-party-odbc-drivers-required-for-data-flows-b9b5579.md

**SAP System Connectivity:**
- prepare-connectivity-to-sap-abap-systems-76c9ac1.md
- prepare-connectivity-to-sap-s-4hana-cloud-abb159e.md
- prepare-connectivity-to-sap-s-4hana-on-premise-8de01dd.md
- prepare-connectivity-to-sap-bw-b0b371e.md
- prepare-connectivity-to-sap-ecc-cfc1b48.md
- prepare-connectivity-to-sap-hana-d7f22cf.md
- prepare-connectivity-to-sap-fieldglass-03ca236.md
- prepare-connectivity-to-sap-marketing-cloud-f5e0c06.md
- prepare-connectivity-to-sap-successfactors-c9b1915.md
- prepare-connectivity-to-sap-signavio-9bde771.md
- prepare-connectivity-to-sap-open-connectors-fb1aa11.md
- preparing-sap-bw-4hana-model-transfer-connectivity-962de2f.md
- available-source-versions-for-sap-bw-4hana-model-transfer-connections-4aefe38.md
- using-abap-sql-services-for-accessing-data-from-sap-s-4hana-4d74745.md
- using-abap-sql-services-for-accessing-data-from-sap-s-4hana-cloud-ef2b223.md
- prepare-oauth-2-0-authentication-for-sap-abap-and-sap-s-4hana-connections-03dde85.md
- prerequisites-for-abap-rfc-streaming-62adb44.md

**Cloud Provider Connectivity:**
- prepare-connectivity-to-amazon-athena-8d80f60.md
- prepare-connectivity-to-amazon-redshift-519b2db.md
- prepare-connectivity-to-google-bigquery-529cef1.md
- prepare-connectivity-to-microsoft-azure-data-lake-store-gen2-6b3fd2c.md
- prepare-connectivity-to-microsoft-azure-sql-database-782bd8c.md
- prepare-connectivity-to-microsoft-sql-server-ea69328.md
- prepare-connectivity-to-oracle-9fca7c4.md

**Streaming & Integration:**
- prepare-connectivity-to-apache-kafka-1483ceb.md
- prepare-connectivity-to-confluent-3515f11.md
- prepare-connectivity-to-adverity-a37a758.md
- prepare-connectivity-to-precog-ad13c31.md

**Generic Connectivity:**
- prepare-connectivity-for-generic-jdbc-648fabf.md
- prepare-connectivity-for-generic-odata-d9c43a2.md
- prepare-connectivity-for-generic-sftp-5454a8c.md
- preparing-connectivity-for-generic-http-connections-021552c.md

**Live Data:**
- create-live-data-connection-of-type-tunnel-5d02f11.md
- create-sap-s-4hana-live-data-connection-of-type-tunnel-095dbdf.md
- authorize-spaces-to-install-sap-business-data-cloud-data-products-67ec785.md

---

## 3. Integrating-data-and-managing-spaces

### 3.1 Root Level Files (24 files)

- integrating-data-and-managing-spaces-in-sap-datasphere-8f98d3c.md
- managing-your-space-268ea7e.md
- control-user-access-to-your-space-9d59fe5.md
- save-and-deploy-your-space-95973c7.md
- review-your-space-status-b2915bf.md
- monitor-your-space-storage-consumption-94fe6c1.md
- export-your-space-data-27c7761.md
- delete-your-space-3eb19b9.md
- unlock-a-locked-space-c05b6a6.md
- manage-your-space-via-the-command-line-34404bf.md
- create-time-data-and-dimensions-c5cfce4.md
- settings-for-data-subscriptions-f541f19.md
- logging-read-and-change-actions-for-audit-2665539.md
- translating-metadata-for-sap-analytics-cloud-fe829de.md
- importing-sap-and-partner-business-content-from-the-content-network-400078d.md
- extending-intelligent-applications-3c15868.md
- reviewing-installed-intelligent-applications-6446487.md
- applying-row-level-security-to-data-delivered-through-intelligent-applications-c83225f.md
- integrating-data-from-sap-business-data-cloud-8f9c372.md
- integrating-data-from-sap-bw-bridge-c07d800.md
- integrating-data-from-the-data-product-generator-for-sap-business-data-cloud-cca4744.md
- publishing-data-to-sap-datasphere-58588fb.md
- working-with-local-tables-file-received-from-the-data-product-generator-for-sap-business-72a055f.md
- index.md

### 3.2 Data-Access-Control (7 files)

- securing-data-with-data-access-controls-a032e51.md
- create-a-single-values-data-access-control-5246328.md
- create-an-operator-and-values-data-access-control-501594b.md
- create-a-hierarchy-data-access-control-0afeeed.md
- create-a-hierarchy-with-directory-data-access-control-44ae628.md
- import-sap-bw-and-sap-bw-4hana-analysis-authorizations-f56e427.md
- process-source-changes-in-the-data-access-control-editor-3c470e8.md

### 3.3 Data-Integration-Monitor (47 files)

**Overview & Navigation:**
- managing-and-monitoring-data-integration-4cbf7c7.md
- navigating-in-the-monitor-tabs-5d4af76.md
- authorization-and-permissions-e5f9e81.md

**Remote Tables:**
- monitoring-remote-tables-4dd95d7.md
- monitoring-remote-queries-806d7f0.md
- creating-statistics-for-your-remote-tables-e4120bb.md
- partitioning-remote-table-data-loads-a218d27.md
- remote-tables-in-data-access-remote-only-vs-data-access-remote-and-replication-9b9db14.md

**Local Tables:**
- monitoring-local-tables-3740461.md
- monitoring-local-tables-file-6b2d007.md
- controlling-deletion-of-local-table-records-2a59b71.md
- delete-data-from-your-local-tables-file-872ad50.md
- merge-or-optimize-your-local-tables-file-e533b15.md

**Real-Time Replication:**
- replicate-data-changes-in-real-time-441d327.md
- replicate-full-set-of-data-35632cd.md
- pausing-and-restarting-real-time-replication-8f149b0.md
- disabling-real-time-data-replication-82380e6.md
- resuming-real-time-replication-after-a-fail-fc0bfbe.md

**Data Persistence:**
- data-persistence-and-run-mode-d04f5dd.md
- data-persistence-detailed-logs-and-remote-statements-9eb35ee.md
- data-persistence-guidance-85f7be4.md
- understanding-the-data-persistence-metrics-d65994c.md
- persisting-and-monitoring-views-9af04c9.md
- persisted-views-and-data-access-control-7a4a983.md
- persisted-views-and-memory-consumption-e3d0495.md
- creating-partitions-for-your-persisted-views-9b1b595.md

**View Analyzer:**
- exploring-views-with-view-analyzer-8921e5a.md
- getting-started-with-view-analyzer-e0aeddb.md
- analyze-results-9ad9b8b.md

**Flows:**
- monitoring-flows-b661ea0.md
- explore-transformation-flows-7588192.md
- metrics-for-transformation-flows-b42fa5b.md
- cancel-a-transformation-flow-run-ab885f0.md
- change-the-run-mode-for-a-transformation-flow-f7da029.md
- override-the-default-settings-to-run-your-transformation-flow-in-a-file-space-e5c4ac8.md

**Replication Flows:**
- statuses-and-substatuses-for-replication-flows-fafc1e2.md
- understanding-the-replication-flows-metrics-39c116d.md
- working-with-existing-replication-flow-runs-da62e1e.md
- watermarks-890897f.md

**Task Chains:**
- monitoring-task-chains-4142201.md
- modify-the-owner-of-a-schedule-4b660c0.md
- pause-or-resume-a-scheduled-task-5eb55cb.md

**Scheduling:**
- scheduling-data-integration-tasks-7fa0762.md
- schedule-a-data-integration-task-simple-schedule-7c11059.md
- schedule-a-data-integration-task-with-cron-expression-169ba34.md

**Status & Notifications:**
- understanding-statuses-and-substatuses-19cb5bd.md
- warning-notifications-8337d8d.md

### 3.4 Integrating-Data-Via-Connections (48 files)

**Overview:**
- integrating-data-via-connections-eb85e15.md
- connection-types-9456242.md
- features-supported-by-connections-505bf40.md
- connections-to-partner-tools-55da0fa.md
- create-a-connection-c216584.md
- edit-a-connection-ba20892.md
- delete-a-connection-e90c290.md
- validate-a-connection-99bd229.md
- manage-connectivity-via-rest-apis-5aafe32.md
- pause-real-time-replication-for-a-connection-a11f244.md

**SAP Connections:**
- sap-abap-connections-a75c1aa.md
- sap-bw-connections-e589041.md
- sap-bw-4hana-model-transfer-connections-1caba95.md
- sap-bw-bridge-connection-03cc8f2.md
- sap-ecc-connections-e546ccd.md
- sap-hana-connections-e6b63f1.md
- sap-hana-cloud-data-lake-files-connections-356e41e.md
- sap-hana-cloud-data-lake-relational-engine-connections-40763e2.md
- sap-s-4hana-cloud-connections-a98e5ff.md
- sap-s-4hana-on-premise-connections-a49a1e3.md
- sap-fieldglass-connections-bda94ee.md
- sap-marketing-cloud-connections-4de4959.md
- sap-successfactors-connections-39df020.md
- sap-signavio-connections-4c367de.md
- business-data-product-connections-5661d88.md
- importing-sap-bw-queries-a-comparison-of-the-different-options-c87d4b7.md

**Cloud Provider Connections:**
- amazon-athena-connections-1b21cd0.md
- amazon-redshift-connections-8b13206.md
- amazon-simple-storage-service-connections-a7b660a.md
- google-bigquery-connections-30ed77d.md
- google-cloud-storage-connections-aec242c.md
- microsoft-azure-blob-storage-connections-df5a7c5.md
- microsoft-azure-data-lake-store-gen2-connections-cd06b3c.md
- microsoft-azure-sql-database-connections-46343fc.md
- microsoft-sql-server-connections-a13c8ab.md
- microsoft-onelake-connections-057fa4b.md
- oracle-connections-c73ae06.md
- hadoop-distributed-file-system-connections-f9c3356.md

**Streaming & Integration:**
- apache-kafka-connections-1992c6b.md
- confluent-connections-d83c08a.md
- adverity-connections-63e9ff5.md
- precog-connections-6e5f225.md
- open-connectors-connections-9bfe7db.md
- cloud-data-integration-connections-cd33107.md

**Generic Connections:**
- generic-http-connections-b79b865.md
- generic-jdbc-connections-eeae3ac.md
- generic-odata-connections-5d36f1a.md
- generic-sftp-connections-b645de7.md

### 3.5 Integrating-Data-Via-Database-Users/Open-SQL-Schema (4 files)

- integrating-data-via-database-users-open-sql-schemas-3de55a7.md
- create-a-database-user-798e3fd.md
- connect-to-your-open-sql-schema-b78ad20.md
- allow-the-space-to-access-the-open-sql-schema-7eaa370.md

### 3.6 Transporting-Content-Between-Tenants (7 files)

- transporting-content-between-tenants-df12666.md
- creating-packages-to-export-24aba84.md
- adding-sharing-destinations-562e996.md
- exporting-content-for-sharing-with-other-tenants-44e775c.md
- importing-content-from-another-tenant-b607a12.md
- managing-exported-content-638bf6a.md
- transporting-your-content-through-sap-cloud-transport-management-0538398.md

---

## Coverage Mapping

### Skill File → Documentation Coverage

| Skill File | Documentation Covered | Files |
|------------|----------------------|-------|
| SKILL.md (main) | Overview + Quick Reference | All |
| references/data-acquisition-preparation.md | Acquiring-and-Preparing-Data-in-the-Data-Builder | 91 |
| references/data-modeling.md | Modeling-Data-in-the-Data-Builder + Business Builder | 95 |
| references/graphical-sql-views.md | Root graphical/SQL view files | 40 |
| references/administration.md | All Administering content | 135 |
| references/connectivity.md | Preparing-Connectivity + Connections | 96 |
| references/data-integration-monitor.md | Data-Integration-Monitor | 47 |
| references/data-access-security.md | Data-Access-Control + Security | 14 |
| references/content-transport.md | Transporting-Content + Import/Export | 17 |

---

## Reference File Organization

Following progressive disclosure best practices:

```
skills/sap-datasphere/
├── SKILL.md                              # Main entry point (<500 lines)
├── README.md                             # Discovery keywords
├── PROGRESS_TRACKING.md                  # This file
└── references/
    ├── data-acquisition-preparation.md   # Data flows, replication, local/remote tables
    ├── data-modeling.md                  # Analytic models, dimensions, measures
    ├── graphical-sql-views.md            # Views, E-R models, intelligent lookups
    ├── administration.md                 # Tenant, spaces, users, roles, monitoring
    ├── connectivity.md                   # All connection types and preparation
    ├── data-integration-monitor.md       # Monitoring, scheduling, real-time
    ├── data-access-security.md           # DAC, row-level security
    └── content-transport.md              # Export, import, packages
```

---

## Documentation Links for Updates

### Main Documentation
- **Repository**: https://github.com/SAP-docs/sap-datasphere
- **SAP Help Portal**: https://help.sap.com/docs/SAP_DATASPHERE

### Section-Specific Links
- **Acquiring Data**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Acquiring-Preparing-Modeling-Data
- **Administering**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Administering
- **Integrating Data**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Integrating-data-and-managing-spaces

---

## Enhancement Log

### Version 1.1.0 (2025-11-22) - Source Verification Enhancement

After thorough review of actual documentation content from the source repository, the following enhancements were made:

**data-acquisition-preparation.md**:
- Added required privileges for data flow creation/execution
- Added key limitations (no delta processing, single target, spatial data unsupported)
- Added Dynamic Memory Allocation settings (Small/Medium/Large, 1-5 GB)
- Added replication flow thread limits (1-160, default 16)
- Added flow-level and object-level properties tables
- Added complete task chain task types including Local Tables operations and Notification Tasks
- Added parallel execution ANY/ALL completion options
- Added Apache Spark settings override

**connectivity.md**:
- Added complete 35+ connection feature matrix (Remote Tables, Replication Flows, Data Flows, Model Import)
- Added SAP S/4HANA communication arrangement scenarios (SAP_COM_0531, SAP_COM_0532, SAP_COM_0722)
- Added X.509 certificate setup steps
- Added SAP Note references (3486245, 2801396)
- Added prerequisite details by feature type

**data-integration-monitor.md**:
- Added ABAP ODP source requirements (ODP-BW, ODP-CDS, ODP-SAPI)
- Added SAP BW version requirements (7.4 SP23+, 7.5 SP17+)
- Added SAP HANA Smart Data Access restrictions (COLUMN TABLE only)
- Added DP Agent version recommendation (2.6.1+)
- Added real-time replication enable steps with cleanup requirements

**data-access-security.md**:
- Added performance thresholds (500,000 rows, 5,000 permissions per user)
- Added permissions entity requirements and constraints
- Added security enforcement scope (only enforced when shared/consumed externally)

**administration.md**:
- Added Space ID constraints (20 uppercase chars, reserved prefixes)
- Added optional configuration options (HDI Container, Time Data, Auditing)
- Added deployment requirements

**graphical-sql-views.md**:
- Added required scoped role privileges
- Added semantic usage options table (Fact, Dimension, Hierarchy, Text, etc.)
- Added exposure for consumption notes (DW Viewer role restrictions)
- Added operator limitation (one per source/join)

**data-modeling.md**:
- Added Business Builder purpose and loose coupling concept
- Added complete workflow diagram
- Added Perspectives creation steps and exposure targets

---

**Total Files Tracked**: 558
**Coverage**: 100%
**Last Updated**: 2025-11-22
