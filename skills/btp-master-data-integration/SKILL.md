---
name: btp-master-data-integration
description: |
  Configures and integrates SAP Master Data Integration (MDI) service on SAP Business Technology Platform. Use when setting up MDI tenants, connecting applications (S/4HANA, SuccessFactors, Ariba, Fieldglass, etc.), configuring distribution models, SOAP APIs for business partners, extensibility, or troubleshooting master data replication. Covers One Domain Model integration, Business Data Orchestration, client authentication (OAuth2, mTLS), and security configurations.
license: MIT
---

# SAP BTP Master Data Integration

SAP Master Data Integration (MDI) is a central master data hub on SAP BTP that enables applications to synchronize local master data databases with a centralized repository.

## Quick Reference

### What MDI Does
- Replicates master data between connected applications
- Supports 34 master data types via SAP One Domain Model
- Provides filtering to control data distribution scope
- Enables extensibility with custom fields

### What MDI Does NOT Do
- Consolidation (use SAP Master Data Governance)
- Data quality control
- Central governance workflows
- Referential integrity validation

## Core Concepts

### Key Terms
| Term | Definition |
|------|------------|
| Tenant | Isolated MDI environment per subaccount with own database and configs |
| Client | Application that integrates with MDI (producing or consuming) |
| Producing Client | Sends change requests to MDI (upstream/writing client) |
| Consuming Client | Receives change events from MDI (downstream/reading client) |
| Distribution Model | Configuration controlling which data replicates where |
| Change Token | Unique identifier per change request (max 36 chars) |

### Integration Models (SAP One Domain Model)

**Business Partner** - v2.1.1, v3.3.0 (multiversion support restricted for address data)
**Finance** - Cost Center v3.1.0, Exchange Rate v4.0.0, Bank v3.0.0
**Workforce** - Person v5.0.0, Job Classification v4.0.0, Organizational Unit v4.0.0
**Procurement** - Purchasing Organization v4.0.0, Purchasing Group v6.0.0
**Assets** - Equipment v5.1.0, Functional Location v5.0.0
**Products** - Product v5.0.0, Product Group v5.0.0

For complete list see `references/integration-models.md`

## Decision Trees

### Which Service Plan?

```
Is application SAP-branded cloud?
├─ Yes → sap-integration plan (FREE)
└─ No → Is it SAP S/4HANA On-Premise?
         ├─ Yes → s4hana-onpremise plan (PAID - storage + bandwidth)
         └─ No → Use SAP Integration Suite with MDI Adapter
```

### Which Authentication Method?

```
Mutual-TLS with X.509 certificates available?
├─ Yes → Use mTLS (RECOMMENDED)
│        credential-type: x509
│        Configure validity: DAYS/MONTHS/YEARS
└─ No → Use Client Credentials Grant (DEFAULT)
         Uses client_id/client_secret pairs
```

### REST vs SOAP API?

```
Master data type is Business Partner?
├─ Yes → SOAP API available for:
│        - Business Partner replication
│        - BP Relationship replication
│        - Key Mapping replication
│        - Confirmations
└─ No → REST API (Events API, Requests API, KeyMapping API)
```

## Setup Workflow

### 1. Prerequisites
- SAP BTP global enterprise account (no trial/free tier)
- Subaccount in supported region: EU10, US10, AP10, AP11
- Cloud Foundry space within subaccount
- User with BusinessConfigurationAdmin role

### 2. Create Tenant
```
1. Create subaccount in available region
2. Subscribe to SAP Master Data Integration Tenant application
3. One tenant maximum per subaccount
4. Separate tenants for dev/test/prod recommended
```

### 3. Connect Application
```
1. Create service instance (one per application - MANDATORY)
2. Choose service plan (sap-integration or s4hana-onpremise)
3. Set 'application' attribute (e.g., "s4" for S/4HANA Cloud)
4. Create service binding for credentials
5. Configure writePermissions for entity types
```

### 4. Configure Distribution Model
```
1. Access Business Data Orchestration UI
2. Create distribution model (provider → consumer)
3. Set filters (object selection + data scope)
4. Activate model
```

## System Limitations

| Limit | Value |
|-------|-------|
| Change Request Size | 256 KB (512 KB for Business Partner) |
| Master Data Record Size | 512 KB |
| Change Token Length | 36 characters max |
| Delta Token Validity | 28 days |
| SOAP Payload Size | 10 MB |
| Change Token Characters | a-z, A-Z, 0-9, -, _ |

## Client Configuration Attributes

### businessSystemId
- Required for SOAP API integration
- Max 60 characters, unique per tenant
- Must match SenderBusinessSystemID in SOAP messages

### writePermissions
```json
"writePermissions": [
  { "entityType": "sap.odm.finance.costobject.CostCenter" },
  { "entityType": "sap.odm.businesspartner.BusinessPartner" }
]
```

### globalTenantId
- Identifies last significant writer on Events API
- 1-40 characters: alphanumeric, -, ., _, ~
- Configure only if application documentation requires it

### logSys
- Logical system of last significant writer
- Max 10 characters
- Configure only if application documentation requires it

## SOAP Endpoints

Base URL: `https://one-mds.cfapps.{region}.hana.ondemand.com/businesspartner/v0/soap/`

| Purpose | Endpoint |
|---------|----------|
| BP Inbound | BusinessPartnerBulkReplicateRequestIn |
| BP Confirmation | BusinessPartnerBulkReplicateRequestConfIn |
| BP Relationship Inbound | BusinessPartnerRelationshipBulkReplicateRequestIn |
| BP Relationship Confirmation | BusinessPartnerRelationshipBulkReplicateRequestConfirmIn |
| Key Mapping Inbound | KeyMappingBulkReplicateRequestIn |
| Key Mapping Confirmation | KeyMappingBulkReplicateRequestConfirmIn |

Authentication: Basic (clientid:clientsecret with tenantId param) or OAuth

## Destination Naming Convention (SOAP)

For business system ID `SYSTEMID`:
- `SYSTEMID_BPOUTBOUND` - Business Partner replication
- `SYSTEMID_BPCONFIRM` - Business Partner confirmation
- `SYSTEMID_BPRELOUTBOUND` - Relationship replication
- `SYSTEMID_BPRELCONFIRM` - Relationship confirmation
- `SYSTEMID_KMOUTBOUND` - Key Mapping replication
- `SYSTEMID_KEYMAPCONFIRM` - Key Mapping confirmation

## Common Integration Scenarios

### SAP S/4HANA Cloud
- 20 supported objects including Business Partner, Cost Center, Product
- Communication Arrangement: SAP_COM_0659 (MDI), SAP_COM_0594 (BDO)
- Single system cannot connect to multiple MDI tenants

### SAP S/4HANA On-Premise
- 14 supported objects
- Uses drfimg transaction for configuration
- Outbound implementation: 986_3 for BP/REL via Services
- Requires SAP Note 3065614

### SAP SuccessFactors
- Employee Central: Bank, Company Code, Cost Center, Workforce
- Employee Central Payroll: Cost Center, Public Sector Management

### SAP Ariba
- 9 categories: Business Partner-Supplier, Company Code, Cost Center, etc.

For detailed integration guides see `references/integration-guides.md`

## Security Best Practices

1. **Always use HTTPS** - All MDI and XSUAA communications
2. **Validate certificates** - Never disable certificate validation
3. **Rotate compromised credentials** - Delete service key, create new one
4. **Minimal permissions** - Grant only necessary writePermissions
5. **Separate subaccounts** - Isolate MDI from unrelated BTP services

## Troubleshooting

### Delta Token Expired (28 days)
Clients must perform initial load if unable to sync within 28 days.

### Change Request Rejected (Size)
Reduce payload size below 256 KB (512 KB for Business Partner).

### Missing Mandatory Partner Function
Configure partner determination logic in MDI for C4C → S/4HANA scenarios.
Template available in SAP Note 2987243.

### Platform Status
Check SAP Trust Center: https://www.sap.com/about/cloud-trust-center/

### Support Component
`BC-CP-CF-ONEMDS`

## Reference Files

For detailed information:
- `references/glossary-and-pricing.md` - Complete glossary, pricing tiers, qualifying apps, maintenance windows
- `references/integration-models.md` - Complete ODM types and versions
- `references/integration-guides.md` - System-specific setup guides
- `references/soap-api-reference.md` - SOAP web services with complete field mappings
- `references/features-complete.md` - All features, REST/SOAP events, Local ID APIs, Data Privacy
- `references/security-and-privacy.md` - Security, data protection, filtering
- `references/extensibility.md` - Custom extensions and WSDL generation
- `references/monitoring.md` - Business Data Orchestration monitoring

## Documentation Sources

**Primary Documentation**: https://help.sap.com/docs/master-data-integration
**GitHub Source**: https://github.com/SAP-docs/btp-master-data-integration
**API Catalog**: https://api.sap.com (filter: SAP Master Data Integration)
**SAP Discovery Center**: https://discovery-center.cloud.sap/serviceCatalog/master-data-integration
