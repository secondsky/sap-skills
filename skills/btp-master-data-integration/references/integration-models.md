# SAP One Domain Model Integration Models

Complete reference for master data types supported by SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/blob/main/docs/about-this-service/integration-models-8882bf9.md

## Asset Management

| Entity | Version | Notes |
|--------|---------|-------|
| Equipment | v5.1.0 | |
| Functional Location | v5.0.0 | |

## Business Partner

| Entity | Version | Notes |
|--------|---------|-------|
| Business Partner | v2.1.1, v3.3.0 | Multiversion support restricted for address data replication |
| Business Partner Relationship | v2.2.0 | |

## Finance & Accounting

| Entity | Version | Notes |
|--------|---------|-------|
| Exchange Rate | v4.0.0 | |
| Symbolic General Ledger Account | v6.1.0 | |
| Bank | v3.0.0 | |
| Cost Center | v3.1.0 | 6 backward-compatible versions |
| Project Controlling Object | v3.1.0 | |
| Sales Controlling Object | v4.0.0 | |

## Public Sector Finance

| Entity | Version | Notes |
|--------|---------|-------|
| Budget Period | v1.1.0 | |
| Functional Area | v1.1.0 | |
| Fund | v1.1.0 | |
| Funds Center | v1.1.0 | |
| Grant | v1.1.0 | |

## Organizational Units

| Entity | Version | Notes |
|--------|---------|-------|
| Company Code | v4.0.0 | |
| Plant | v4.0.0 | |

## Procurement

| Entity | Version | Notes |
|--------|---------|-------|
| Purchasing Category | v4.0.0 | |
| Purchasing Group | v6.0.0 | |
| Purchasing Organization | v4.0.0 | |

## Products & Projects

| Entity | Version | Notes |
|--------|---------|-------|
| Product | v5.0.0 | |
| Product Group | v5.0.0 | |
| Project Service Organization | v7.0.0 | |

## Real Estate (all v7.0.0)

| Entity | Version |
|--------|---------|
| Contract | v7.0.0 |
| Rentable Object | v7.0.0 |
| Usable Object | v7.0.0 |
| Architecture Object | v7.0.0 |

## Workforce

| Entity | Version | Notes |
|--------|---------|-------|
| Person | v5.0.0 | |
| Job Classification | v4.0.0 | |
| Organizational Unit | v4.0.0 | |
| Capability (3 models) | v3.0.0 | |

## Data Privacy

| Entity | Version |
|--------|---------|
| Data Controller | v2.0.0 |
| Purpose | v2.0.0 |
| Purpose2DataController | v2.0.0 |

## Multiversion Support

MDI enables applications to use different compatible versions of the SAP One Domain Model without disrupting integrations.

**How It Works**:
- Application A transmits data in version 3.0.0
- Application B receives data in version 2.1.1
- Works only between compatible versions (no breaking changes)

**Benefits**:
- Decouples development cycles of SAP and non-SAP applications
- Allows incremental upgrades
- Reduces implementation complexity

**Limitations**:
- Only works between versions without breaking changes (e.g., no field removals)
- BusinessPartner v3.3.0 and v2.1.1 have restricted multiversion support for address data

## ODM Entity Name Format

writePermissions use fully qualified ODM entity names:

```
sap.odm.{domain}.{subdomain}.{EntityName}
```

Examples:
- `sap.odm.finance.costobject.CostCenter`
- `sap.odm.businesspartner.BusinessPartner`
- `sap.odm.procurement.orgunit.PurchasingOrganization`
- `sap.odm.workforce.foundation.WorkforcePerson`

## Documentation Links

- **Integration Models**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/integration-models
- **SAP One Domain Model**: https://api.sap.com/sap-one-domain-model
