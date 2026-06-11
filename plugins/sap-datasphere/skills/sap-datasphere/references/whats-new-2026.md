# What's New in SAP Datasphere and SAP Business Data Cloud 2026

## Overview

This document covers the major features and enhancements released for SAP Datasphere and SAP Business Data Cloud during 2026. SAP Datasphere follows a continuous delivery model with releases approximately every two weeks. Starting in 2025, SAP publishes Datasphere release notes under the SAP Business Data Cloud What's New page.

**Official What's New (BDC)**: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

**Official What's New (Datasphere)**: https://help.sap.com/whats-new/48017b2cc4834fc6b6cae87097bd9e4d

## Q1 2026 Highlights

### Task Chains: Task Ports, Auto-Retry, and REST API Management (2026.02+)

Three major task chain enhancements shipped in January 2026:

**Task Ports** allow controlling task flow based on success or failure outcomes. The new _Ignore Error_ feature lets you disregard a specific task's status from the overall chain evaluation, maintaining workflow continuity and customizing execution paths.

**Auto-Retry** allows up to three automatic retries for a failed task in a chain, improving resilience without manual intervention.

**REST API Task Management** enables running task chains and retrieving task logs via REST APIs (no CLI required). A new CLI command provides flexible log retrieval.

```yaml
Task Chain with Ports:
  Steps:
    1. Refresh Data Flow:
        Port: success → step 2
        Port: failure → step 3
    2. Send Notification (on success)
    3. Log Error and Continue (on failure)
        Ignore Error: true
```

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-january/ba-p/14320094

### Technical User for Scheduling (2026.02+)

Assign a technical user to schedule data integration tasks. This minimizes the number of users managing schedules and prevents failed schedules caused by expired consent and authorization.

Source: https://help.sap.com/docs/PRODUCTS/d4185d7d9a634d06a5459c214792c67e/4b660c0395454bd0923f732eef4ee4b2.html

### Analytic Model: YTD, QTD, MTD, %GrandTotal Functions (2026.02+)

New standard functions available in the expression editor for calculated measures, restricted measures, and structures: `YTD()`, `QTD()`, `MTD()`, and `%GrandTotal`.

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-january/ba-p/14320094

### Replication Flow: Multi-Step Scenarios (2026.02+)

Reuse a target local table from one replication flow as a source in another replication flow. This automatically creates relationships between flows, enabling multi-step replication and distribution of data from Datasphere to multiple downstream systems.

### Replication Flow: Parquet Format for Cloud Storage (2026.02+)

Replicate data stored in Parquet files from Amazon S3, Google Cloud Storage, and Azure Data Lake Gen2.

### Partitioning of Local Tables with Data (2026.02+)

Create partitions on existing local tables that already contain data (HANA Cloud storage and compute). Choose from three deployment options: automatic after deployment, automatic at scheduled time, or manual at a later time.

### Longer Technical Names (2026.02+)

Increased maximum length for technical names:
- Views, tables, E/R models: 100 characters
- Analytic Models: 60 characters
- Columns: 100 characters
- Input parameters: 100 characters

### BW Modernization Milestones (2026.02+)

- Catalog metadata extraction for SAP BW 7.5
- Data lineage from SAC stories down to BW 7.5 objects
- Scenario Generator: semantical import of BW 7.5 and BW/4HANA InfoProvider with dependencies
- Multiple target support and mass handling of BW InfoProviders
- Requires BWMT 1.27 and SAP Note 3692414

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-january/ba-p/14320094

### BDC Data Product Lifecycle Improvements (Q1 2026)

Throughout Q1 2026, SAP introduced several BDC data product management enhancements:

- **Data Product Statuses** (2026.04): More granular product statuses aligned with the catalog for detailed lifecycle tracking (February 2026)
- **Multi-Source Intelligent Application Installation**: Install a single intelligent application multiple times for different source systems, each creating its own ingestion space (February 2026)
- **Commercial Entitlement Protection**: Automatic uninstallation/deactivation no longer occurs on entitlement expiry; only the BDC cockpit user can uninstall (February 2026)
- **Data Composer**: SAP Datasphere, Data Composer service for harmonizing data from multiple data products into unified customer profiles using deterministic or probabilistic identity resolution (March 2026)

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

### New Data Centers (Q1 2026)

BDC expanded to:
- Frankfurt EU Access (EU11) — February 2026
- Dammam SA30/SA31 (Saudi Arabia) — February 2026
- Switzerland EU Access (CH20), Australia AP20, Singapore AP21 — March 2026

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

## Q2 2026 Highlights

### Update Action for Installed Data Products (2026.08+)

Data products installed in a Datasphere space now have an **Update** action button when new minor versions are released, streamlining version management.

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-april/ba-p/14389008

### BDC Cockpit Data Product Monitoring (2026.08+)

Enhanced monitoring in the BDC Cockpit provides full pipeline status at every step for SAP-managed data product pipelines, making it easy to identify exactly where issues occur.

### Local Table Partitioning for Existing Tables (2026.08+)

Partition existing SAP-managed local tables in standard spaces that already contain data, useful for large-volume tables where partitioning was not possible at creation.

Source: https://help.sap.com/docs/PRODUCTS/d4185d7d9a634d06a5459c214792c67e/03191f36e9144b2aaa47b8c9eea039c1.html

### Spark Configuration (2026.08+)

Configurable Apache Spark application resource limits per task activity in each file space. You can change default configurations and create custom ones. Note: new defaults may allocate fewer resources (see SAP Note 3726059).

Source: https://help.sap.com/docs/PRODUCTS/d4185d7d9a634d06a5459c214792c67e/0cf1015768e44324b4088da4c5ebd8ca.html

### Cloud Connector Support for Google BigQuery (2026.08+)

Configure private connectivity for Google BigQuery connections through the Cloud Connector, routing data traffic through secure tunnels rather than the public internet.

Source: https://help.sap.com/docs/PRODUCTS/d4185d7d9a634d06a5459c214792c67e/30ed77de13864368bdc596099b37ed70.html

### Task Chains: Delete All/Filtered Records (2026.08+)

Task chains now support **Delete All Records** and **Delete Filtered Records** deletion types for both local tables and Local Tables (file).

### Semantic Onboarding of Calc Views from HANA Cloud (2026.11+)

Import calculation views from SAP HANA Cloud as remote tables while preserving semantic information. Prerequisite: source HANA Cloud version QRC 1/2026 or higher; Datasphere database version 2025.50+; deploy with SAP Business Data Cloud Integration Mode set to **Flat View** or **Construction Kit**.

Source: https://help.sap.com/docs/PRODUCTS/d4185d7d9a634d06a5459c214792c67e/b37282c4c0d142e3bca256a46cd40278.html

### Analytic Model: Inherited and Local Properties (2026.08+)

For analytic models using another analytic model as source, you can toggle **Show Inherited Elements** in the properties panel to distinguish between local and inherited elements.

### Improved Monitoring Tool Navigation (2026.08+)

Consolidated monitoring menu with sections: System and Spaces, Capacities Monitoring, Task Logs, Expensive Statement Logs, Elastic Compute Nodes, and Data Integration.

### End-to-End Data Observability and Monitoring (2026.10+)

BDC Cockpit provides visibility into data pipeline health, system connectivity, and data-product-specific processing information. Admins and data engineers can proactively identify issues and monitor installation/activation progress.

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

### Data Protection and Privacy Tags in the Catalog (2026.09+)

System-defined tag hierarchy automatically identifies data products containing personal data or sensitive personal data during metadata extraction.

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

### BDC Data Product Metadata in SAP Databricks (2026.09+)

Access semantic metadata directly in Unity Catalog when sharing data products from BDC to SAP Databricks.

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

### Run Replication Flows with Delta Load at Scheduled Times (2026.11+)

Schedule replication flows that use delta-enabled objects by setting Delta Load Run to "At Scheduled Time". The flow processes all available delta records and completes after each run.

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-may/ba-p/14408387

### Bulk Assignment of Schedule Owner for Task Chains (2026.11+)

Assign a schedule owner to multiple task chains at once, eliminating one-by-one configuration for larger environments.

### Analyze Lineage Graph with Runtime Metrics (2026.11+)

Runtime Metrics tool analyzes the full lineage graph of a view, including all underlying source objects — not just the view in isolation.

### Transport Runtime Settings for Flows and Views (2026.11+)

Transformation flow runtime settings (HANA run modes, batch configs, Spark settings) and view persistency runtime settings can now be included in transport packages for consistent behavior across environments.

### Variables in Analytic Models (2026.11+)

When using an analytic model as a source for another analytic model, you can customize its variables — rename, change default values, use in restricted measures and calculations.

### SAP Snowflake and BDC Connect for Snowflake (GA, May 2026)

SAP Snowflake generally available as a solution extension for BDC. Full Snowflake Business Critical Edition, provisioned via SAP for Me, with zero-copy access to SAP data products. BDC Connect for Snowflake adds bidirectional data sharing on AWS.

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/announcing-general-availability-of-sap-snowflake-and-sap-business-data/ba-p/14386550

### Enhanced SAC Asset Type Support in Catalog (2026.12+)

Catalog can now extract metadata for SAC asset types including Add-in Workbook, Analysis Workbook, Composite, Content Link, Dataset, and Uploaded File.

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

### New Data Centers (Q2 2026)

- Japan/Osaka (JP30), Brazil (BR30), Australia (AP30) — April 2026
- Databricks live in Australia (AP20) and Singapore (AP21) — May 2026
- BDC Connect live in Frankfurt (EU11) and Switzerland (CH20) — May 2026

Source: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b

## SAPPHIRE 2026 Announcements (May 2026)

Key announcements from SAPPHIRE Orlando:

- **SAP Business AI Platform**: BTP + BDC + Business Transformation Management converge with the SAP Knowledge Graph
- **SAP HANA Cloud natively in BDC**: Unified in-memory engine alongside Databricks and Snowflake
- **MDG and Reltio in BDC**: Master Data Governance as BDC component; Reltio for AI-based entity resolution
- **Joule Agents**: Natural language creation of data products, analytic models, and planning structures
- **BDC Connect for Amazon Athena**: Planned H2 2026

Source: https://community.sap.com/t5/technology-blog-posts-by-sap/sap-business-data-cloud-and-datasphere-news-in-may/ba-p/14408387

## Resources

- **BDC What's New**: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b
- **Datasphere What's New**: https://help.sap.com/whats-new/48017b2cc4834fc6b6cae87097bd9e4d
- **Monthly Community Blog Series**: https://community.sap.com/t5/technology-blog-posts-by-sap/bg-p/technology-blog-sap (search "Business Data Cloud and Datasphere News")
- **SAP Datasphere Help**: https://help.sap.com/docs/SAP_DATASPHERE
- **SAP Community Datasphere**: https://community.sap.com/topics/datasphere
- **SAP Road Map Explorer**: https://roadmaps.sap.com

## Version Information

This document covers releases through version **2026.12** (June 2026).

Check your tenant version:
1. Go to **System** > **About**
2. Note the version number
3. Compare with feature release versions above
