# Glossary, Pricing, and Service Scope

Complete glossary, pricing details, and service scope for SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/tree/main/docs/about-this-service

---

## Complete Glossary

### Change Event
An event about changes to the master data database published by SAP Master Data Integration service. Clients usually process change events to update their databases.

### Change Operation
An identifier for a specific command type to be executed on a master data record. Example values include `create`, `patch` or `delete`.

### Change Request
A command sent by a client to Master Data Integration service to create, modify, or delete a master data record in the master data database.

### Client
An application or service that integrates with SAP Master Data Integration to synchronize its master data database with the master data database of the SAP Master Data Integration tenant.

### Producing Client
A client that sends change requests or SOAP messages to the SAP Master Data Integration service.
- **Synonyms**: Upstream client, Sending client, Writing client

### Consuming Client
A client that receives change events or SOAP messages from the SAP Master Data Integration service.
- **Synonyms**: Downstream client, Receiving client, Reading client

### Key Mapping
The linking of the identifying keys of object instances that represent identical real-world objects in different clients. You can maintain one or more keys in each client.

### Master Data Record
Data or information about a real-world object. A master data record can, for instance, describe a specific cost center or a specific business partner.

### Master Data Type
The type of master data entities. For example, cost center, bank etc.
- **Synonyms**: Master Data Object, Business Object, Entity Type

### Tenant
SAP Master Data Integration service is a multitenant cloud service. Each tenant of SAP Master Data Integration maintains its own data that is not shared with other tenants. Each tenant in particular has its own master data database, tenant configurations, and client configurations.

---

## Pricing Structure

### Service Plans

| Plan | Target | Cost | Requirements |
|------|--------|------|--------------|
| sap-integration | SAP-branded cloud applications | FREE | Default on all BTP global accounts |
| s4hana-onpremise | SAP S/4HANA On-Premise only | PAID | CPEA-enabled BTP global account |

### Paid Tier Metrics (s4hana-onpremise)
- **Storage**: Per GB of stored master data
- **Bandwidth**: Per GB of data transferred

### Hybrid Scenario Billing
Usage for storage is charged only for those master data records that are NOT consumed by any SAP-branded cloud application.

---

## Qualifying SAP-Branded Cloud Applications (Free Tier)

The following 18 SAP cloud applications integrate at no additional cost:

| # | Application |
|---|-------------|
| 1 | SAP Ariba |
| 2 | SAP Cloud for Customer |
| 3 | SAP Commerce Cloud |
| 4 | SAP Concur |
| 5 | SAP Configure Price Quote |
| 6 | SAP Customer Data Cloud |
| 7 | SAP Emarsys Account Engagement |
| 8 | SAP Field Service Management |
| 9 | SAP Fieldglass |
| 10 | SAP Integration Suite |
| 11 | SAP Marketing Cloud |
| 12 | SAP Master Data Governance (cloud edition) |
| 13 | SAP S/4HANA Cloud (private edition) |
| 14 | SAP S/4HANA Cloud (public edition) |
| 15 | SAP S/4HANA Cloud for Projects/Resource Management |
| 16 | SAP Subscription Billing |
| 17 | SAP SuccessFactors Employee Central |
| 18 | SAP SuccessFactors Employee Central Payroll |

**Note**: SAP ECC integrates through SAP Integration Suite's Cloud Integration capability at no additional charge.

---

## Service Scope and Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| Master Data Replication | Replicate master data between two or more clients |
| Filtering | Configure via Business Data Orchestration to manage replication scope |
| Extensibility | Extend master data objects with custom fields and entities |

### Environment Details

| Property | Value |
|----------|-------|
| Environment | Cloud Foundry |
| Documentation Language | English only |
| Infrastructure | Partner-owned IaaS technologies |
| Regional Availability | Consult SAP Discovery Center |

---

## Maintenance Windows

All times in Coordinated Universal Time (UTC):

| Region | Day | Time (UTC) | Duration |
|--------|-----|------------|----------|
| MENA | Friday | 7:00 PM | 2 hours |
| APJ (Asia Pacific Japan) | Saturday | 3:00 PM | 2 hours |
| Europe | Saturday | 10:00 PM | 2 hours |
| Americas | Sunday | 4:00 AM | 2 hours |

**Major Upgrades**: Up to 4 times annually

---

## Service Level Agreement

### Reference Documents
1. **Service Level Agreement for SAP Cloud Services** - Defines downtime, credits, and update windows
2. **SAP Business Technology Platform Supplement** - Service-specific deviations
3. **General Terms and Conditions for SAP Cloud Services** - Remedies for SLA failures

### Compliance
Master Data Integration adheres to SAP's global data protection and privacy guidelines. Review Data Processing Agreement for your specific region via the SAP Trust Center.

---

## Data Center Availability

SAP Master Data Integration is **remote consumable**. Applications can integrate with an MDI tenant across different data centers.

### Supported Regions (Service Instance)
- Europe (Frankfurt) - EU10
- US East (VA) - US10
- Australia (Sydney) - AP10
- Singapore - AP11

### Subscription Limitation
When connecting via subscriptions only (not recommended), both the application and the MDI tenant must be in:
- Same SAP BTP subaccount
- Same data center

For current regional availability, consult [SAP Discovery Center](https://discovery-center.cloud.sap/serviceCatalog/master-data-integration).

---

## Blog Posts

**SAP Master Data Integration — sharing and synchronizing master data in the integrated Intelligent Suite**
- URL: https://blogs.sap.com/2020/07/21/sap-cloud-platform-master-data-integration-sharing-and-synchronizing-master-data-in-the-integrated-intelligent-suite/
- Published: July 21, 2020

---

## BTP Booster Setup

The BTP Booster automates MDI configuration through a wizard.

### Automated Tasks
1. Creates/reuses BTP subaccount
2. Establishes Cloud Foundry Organization
3. Provisions SAP BTP space
4. Creates MDI service instance and service key
5. Subscribes to Business Data Orchestration application
6. Assigns IdP users to admin/developer roles
7. Creates role collections for Business Data Orchestration

### Access
1. Navigate to global account in BTP Cockpit
2. Select **Boosters** from left menu
3. Choose **Set up SAP Master Data Integration**
4. Click Start → Next → Finish

### Troubleshooting
Support Component: `BC-CP-CF-ONEMDS`

---

## Documentation Links

- **Feature Scope**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/feature-scope-description
- **Pricing**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/pricing
- **Glossary**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/glossary
- **SAP Discovery Center**: https://discovery-center.cloud.sap/serviceCatalog/master-data-integration
- **SAP Trust Center**: https://www.sap.com/about/trust-center.html
