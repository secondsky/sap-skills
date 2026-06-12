# SAP Business Data Cloud

## Overview

SAP Business Data Cloud (BDC) is SAP's unified data and analytics platform that brings together SAP Datasphere, SAP Analytics Cloud, SAP HANA Cloud, and curated data products under a single SaaS offering. Launched at SAP Business Unleashed on February 13, 2025, with controlled commercial availability expanding through 2025 and 2026, BDC provides an integrated environment for data management, analytics, planning, and enterprise AI.

**Official Help Portal**: https://help.sap.com/docs/business-data-cloud

## What is SAP Business Data Cloud

SAP Business Data Cloud is a SaaS solution that combines multiple SAP data and analytics products into a single, unified platform:

| Component | Role in BDC |
|-----------|-------------|
| **SAP Datasphere** | Data warehouse, semantic layer, data modeling, and integration hub |
| **SAP Analytics Cloud** | Analytics, planning, and business intelligence |
| **SAP HANA Cloud** | In-memory database engine for transactional, analytical, and multi-model workloads |
| **SAP Databricks** | Advanced AI/ML, data science, and data engineering (Databricks integrated into SAP landscape) |
| **SAP Snowflake** | Zero-copy bidirectional data sharing with Snowflake platform (GA May 2026) |
| **Data Products** | Curated, governed data packages from SAP and partner sources |
| **Intelligent Applications** | Pre-built analytical solutions delivered as SAP Analytics Cloud stories |

BDC is managed through the **BDC Cockpit**, which provides administrators with visibility into data product pipelines, system connectivity, installation/activation progress, and overall platform health.

**Official product page**: https://www.sap.com/products/data-cloud.html

## Where Datasphere Fits

SAP Datasphere remains the **data foundation** within BDC. For developers and data engineers, Datasphere continues to function as the primary workspace for:

- **Data modeling** (views, tables, analytic models)
- **Data integration** (replication flows, transformation flows, data flows, task chains)
- **Semantic layer** (business entities, consumption models)
- **Data products** (creating, publishing, and consuming governed data products)
- **Catalog and governance** (metadata, lineage, glossary)

**What does NOT change for Datasphere developers:**
- Existing Datasphere tenants, spaces, objects, and connections continue to work
- The Datasphere UI, CLI, and APIs remain the primary developer interface
- Data Builder and Business Builder tools are unchanged
- Connection types, security model, and administration are the same

**What changes for Datasphere developers in a BDC formation:**
- Access to **curated data products** from SAP applications (e.g., S/4HANA) through the BDC catalog
- Ability to share data products to **SAP Databricks** and **SAP Snowflake** via zero-copy Delta Sharing
- Integration with **intelligent applications** — pre-built analytics that combine data products with Datasphere modeling and SAC stories
- Enhanced **monitoring** through the BDC Cockpit for SAP-managed data pipelines
- Access to **SAP Datasphere, Data Composer** — a service for harmonizing data from multiple data products into unified customer profiles
- **Semantic onboarding** of HANA Cloud calculation views with preserved metadata (2026.11+)

## Data Products in BDC vs. Datasphere Data Marketplace

The Datasphere **Data Marketplace** (covered in `references/data-products-marketplace.md`) allows Datasphere tenants to share and consume data products between spaces and tenants. BDC extends this model:

| Aspect | Datasphere Data Marketplace | BDC Data Products |
|--------|----------------------------|-------------------|
| Scope | Space-to-space, tenant-to-tenant | Cross-platform (Datasphere, Databricks, Snowflake, external) |
| Sources | Customer-created data products | SAP application data products + customer-created |
| Sharing | Within Datasphere | Zero-copy via Delta Sharing to multiple platforms |
| Management | Datasphere UI | BDC Cockpit + Datasphere UI |
| Intelligent Apps | Not applicable | Pre-built apps combining data products + analytics |

BDC data products are installed into Datasphere spaces and can be consumed in views and analytic models just like marketplace data products. The key addition is that BDC provides **SAP-managed data products** from source systems like S/4HANA, along with the infrastructure to share them to SAP Databricks and SAP Snowflake.

**Data product lifecycle in BDC** (as of Q2 2026):
- Individual data product management (activate, deactivate, update independently of packages)
- Pre-installation/activation/update validation checks
- Data product status tracking with granular lifecycle states
- Association with intelligent applications and data packages

## SAP Databricks Integration

SAP Databricks brings the Databricks Data Intelligence Platform natively into the SAP landscape, fully integrated with BDC:

**Key capabilities:**
- **Provisioned via SAP for Me** — no separate Databricks account required
- **Zero-copy data product sharing** from BDC catalog to Databricks Unity Catalog
- **Semantic metadata in Unity Catalog** — BDC data product metadata (business names, descriptions, lineage) is accessible directly in Databricks (GA April 2026)
- **Bidirectional sharing** — data products can flow from Databricks back to BDC
- **Databricks' full AI/ML stack** available on SAP data with business context preserved

**SAP Databricks documentation**: https://docs.databricks.com/sap/en/

**BDC Connect for Databricks** enables bidirectional data sharing between existing Enterprise Databricks instances and BDC, using the same Delta Sharing protocol as the native SAP Databricks integration.

> **Related external skills**: If your task involves working *inside*
> Databricks (notebooks, Unity Catalog, Spark jobs, SAP Databricks in BDC),
> the Databricks agent skills plugin covers that side:
> https://github.com/databricks/databricks-agent-skills — offer the user to
> install it; never install it unprompted.

## BDC Connect Partner Integration

BDC Connect extends BDC's data fabric to partner platforms:

| Partner | Status | Capability |
|---------|--------|------------|
| **SAP Databricks** | GA | Native integration + BDC Connect for Enterprise Databricks |
| **SAP Snowflake** | GA (May 2026) | Bidirectional zero-copy data sharing on AWS |
| **BDC Connect for Snowflake** | GA (May 2026) | For existing Snowflake customers |
| **Amazon Athena** | Planned H2 2026 | Bidirectional zero-copy integration |

**BDC Connect provisioning**: https://help.sap.com/docs/SAP_BUSINESS_DATA_CLOUD/f7acf8c9dad54e99b5ce5ebc633ed8e1/ccbd8fe7c2394009b546b73b1dd6c164.html

## SAPPHIRE 2026 Announcements

At SAPPHIRE Orlando (May 2026), SAP announced significant BDC direction:

- **SAP Business AI Platform**: BTP + BDC + Business Transformation Management converging into a unified AI platform with the SAP Knowledge Graph at its core
- **SAP HANA Cloud natively in BDC**: HANA Cloud becomes a core BDC component for transactional, analytical, and multi-model workloads
- **MDG and Reltio in BDC**: SAP Master Data Governance added as a BDC component; Reltio acquisition brings AI-based entity resolution and MCP support
- **Joule Agents**: Data products, analytic models, and planning structures creatable through natural language
- **SAP Certified Data Architect**: New certification program covering data strategy for the agentic AI era

## Official Resources

- **BDC Help Portal**: https://help.sap.com/docs/business-data-cloud
- **BDC What's New**: https://help.sap.com/whats-new/31c53b47cac6482d89f167a1d2a4a50b
- **BDC Onboarding Guide**: https://help.sap.com/docs/SAP_BUSINESS_DATA_CLOUD/9b36d0ac59f24cbeb45617e36a7680fc
- **BDC Feature Scope**: https://help.sap.com/docs/SAP_BUSINESS_DATA_CLOUD/be7aeed9fd524097a626867e7e9bf151
- **SAP Datasphere Help**: https://help.sap.com/docs/SAP_DATASPHERE
- **Datasphere What's New**: https://help.sap.com/whats-new/48017b2cc4834fc6b6cae87097bd9e4d
- **SAP Architecture Center - BDC**: https://architecture.learning.sap.com/docs/ref-arch/a07a316077/3
- **Monthly Community Blog**: https://community.sap.com/t5/technology-blog-posts-by-sap/bg-p/technology-blog-sap (search "Business Data Cloud and Datasphere News")
