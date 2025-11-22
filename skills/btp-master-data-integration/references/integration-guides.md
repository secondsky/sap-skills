# System Integration Guides

Detailed integration instructions for connecting applications to SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/tree/main/docs/integration

## SAP S/4HANA Cloud

### Supported Objects (20)
Bank, Budget Period, Business Partner, Business Partner Relationship, Company Code, Cost Center, Equipment, Exchange Rate, Functional Area, Functional Location, Fund, Funds Center, Grant, Plant, Product, Product Group, Project Controlling Object, Workforce

### Connection Steps

1. **Create Service Instance**
   - Plan: `sap-integration`
   - Application attribute: `"s4"`

2. **Create Communication Arrangement SAP_COM_0659**
   - Retrieve service binding from BTP Cockpit
   - System auto-populates arrangement details

3. **Enable Business Data Orchestration (SAP_COM_0594)**
   - Inbound only communication arrangement
   - Create dedicated inbound communication user

4. **Configure BTP Destination**
   - Use service URL and inbound user credentials

5. **Manage Distribution Models**
   - Configure push or pull models as needed

### Important Notes
- Single S/4HANA Cloud system cannot connect to multiple MDI tenants
- Reference SAP Note 3087667 for Business Partner integration

**Documentation**: https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/

---

## SAP S/4HANA On-Premise

### Supported Objects (14)
Bank, Business Partner, Business Partner Relationship, Company Code, Cost Center, Equipment, Exchange Rate, Functional Location, Plant, Product, Product Group, Project Controlling Object, Workforce Person

### Configuration Steps (Transaction: drfimg)

**Step 1: Technical Settings**
1. Define new business system using subdomain from BTP Cockpit
2. Add entry 986 for Business Partner with Relationships
3. Configure "Replication via Services" as communication channel
4. Add entry 1376 if key mapping replication needed

**Step 2: Replication Model Setup**
1. Create new replication model with description
2. Assign outbound implementation: `986_3 Outbound Impl. for BP/REL via Services`
3. Designate target systems
4. Set PACK_SIZE_BULK parameter
5. Activate replication model

### Important Notes
- Single S/4HANA system cannot connect to multiple MDI tenants
- Follow PDF guide in SAP Note 3065614
- Service plan: `s4hana-onpremise` (PAID)

**Documentation**: https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE

---

## SAP SuccessFactors

### Employee Central
**Supported Objects**: Bank, Company Code, Cost Center, Exchange Rate, Job Classification, Organizational Unit, Workforce

### Employee Central Payroll
**Supported Objects**: Cost Center, Public Sector Management Data

**Documentation**: https://help.sap.com/docs/SAP_SUCCESSFACTORS_EMPLOYEE_CENTRAL

---

## SAP Ariba

### Supported Objects (9)
1. Business Partner-Supplier
2. Company Code
3. Cost Center
4. Exchange Rate
5. Plant
6. Product
7. Product Group
8. Project Controlling Object
9. Purchasing Organization

**Documentation**: https://help.sap.com/docs/ariba

---

## SAP Fieldglass

### Supported Objects (5)
1. Workforce
2. Cost Center
3. Business Partner-Supplier
4. Job Classification
5. Organizational Unit

**Documentation**: https://help.sap.com/docs/SAP_FIELDGLASS

---

## SAP Customer Experience (CX)

Includes multiple services:

### SAP Cloud for Customer
**Special Configuration**: Partner Determination Logic Upload

C4C does not support reflexive partner functions (sold to party, ship to party, bill to party, payer).

**Solution**: Upload partner determination configuration via REST API

**Endpoint**: `POST https://one-mds.cfapps.{region}.hana.ondemand.com/businesspartner/v0/configuration/ConfigurationUpload`

**Template**: SAP Note 2987243

**Required Configurations**:
1. Customer partner determination procedures
2. Customer partner functions in procedure
3. Customer partner determination procedure assignment
4. Customer partner functions
5. Customer account group partner function assignment
6. Customer partner function assignment

### SAP Commerce Cloud
**Documentation**: https://help.sap.com/docs/SAP_COMMERCE_INTEGRATIONS

### SAP Customer Data Cloud
**Documentation**: https://help.sap.com/docs/SAP_CUSTOMER_DATA_CLOUD

### SAP Customer Data Platform
**Documentation**: https://help.sap.com/docs/SAP_CUSTOMER_DATA_PLATFORM

### SAP Marketing Cloud
**Primary Object**: Business Partner
**Documentation**: https://help.sap.com/docs/SAP_MARKETING_CLOUD

---

## SAP Subscription Billing

### Supported Objects
- Business Partner
- Product

**Documentation**: https://help.sap.com/docs/SAP_SUBSCRIPTIONBILLING

---

## SAP Field Service Management

### Supported Objects
- Business Partner
- Product
- Product Group
- Equipment
- Functional Location
- Workforce Person

**Documentation**: https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT

---

## SAP Entitlement Management

### Supported Objects
- Business Partner
- Product

**Documentation**: https://help.sap.com/docs/SAP_ENTITLEMENT_MANAGEMENT

---

## SAP Order Management Foundation (OMF)

### Supported Objects
- Business Partner

**Documentation**: https://help.sap.com/docs/SAP_ORDER_MANAGEMENT_FOUNDATION

---

## SAP Master Data Governance (MDG)

### Current Limitation
Support limited to **pure replication scenario** from MDG to MDI only.

### Capabilities with MDG
- **Consolidation**: Merge master data for analytics
- **Central Governance**: Product development, supplier management workflows
- **Data Quality Management**: Establish and track quality metrics

**Documentation**: https://help.sap.com/docs/SAP_MASTER_DATA_GOVERNANCE

---

## SAP ECC and Non-SAP Applications

Use **SAP Integration Suite** with Master Data Integration Adapter.

### Key Features
- Maps application-specific models to SAP One Domain Model
- Special support for MDI service integration
- JSON schemas from SAP Business Accelerator Hub

### Resources
- Discovery Center Mission: Synchronize cost centers across ECC, Integration Suite, MDI, SuccessFactors
- MDI Receiver Adapter: https://help.sap.com/docs/cloud-integration/sap-cloud-integration/master-data-integration-adapter

**Documentation**: https://help.sap.com/docs/SAP_INTEGRATION_SUITE

---

## General Connection Prerequisites

For all integrations:

1. **Service Instance** (one per application)
2. **Service Binding** for credentials
3. **businessSystemId** configured (if using SOAP)
4. **writePermissions** for entity types
5. **Distribution Model** activated

## Key SAP Notes

| Note | Description |
|------|-------------|
| 2659038 | Reduced data model scope handling |
| 2733112 | DRF configuration |
| 2987243 | Partner determination template |
| 3065614 | S/4HANA On-Premise PDF guide |
| 3087667 | S/4HANA Cloud BP integration |
| 3344090 | Service degradation reference |
