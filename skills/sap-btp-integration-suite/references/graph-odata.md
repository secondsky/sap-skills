# Graph & OData Provisioning - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Graph Overview](#graph-overview)
2. [Business Data Graph](#business-data-graph)
3. [Entity Types](#entity-types)
4. [Querying Graph](#querying-graph)
5. [Extensibility](#extensibility)
6. [OData Provisioning Overview](#odata-provisioning-overview)
7. [OData Service Registration](#odata-service-registration)
8. [Limits and Quotas](#limits-and-quotas)

---

## Graph Overview

Graph is a capability that provides a unified API to access business data across SAP systems as a semantically connected data graph.

### Key Benefits

- **Single API** for multiple SAP systems
- **Unified data model** across S/4HANA, Sales Cloud, SuccessFactors
- **Query languages** OData V4 and GraphQL
- **No data caching** - queries route to source systems
- **Scalable multitenant** architecture

### How It Works

```
┌─────────────────┐
│  Applications   │
│  (OData/GraphQL)│
└────────┬────────┘
         │
┌────────▼────────┐
│     Graph       │
│  Business Data  │
│     Graph       │
└────────┬────────┘
         │
┌────────┴────────────────────────────┐
│                                      │
▼                ▼                    ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐
│ S/4HANA  │ │  Sales   │ │SuccessFactors│
│  Cloud   │ │  Cloud   │ │              │
└──────────┘ └──────────┘ └──────────────┘
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-is-graph-ad1c48d.md

---

## Business Data Graph

The Business Data Graph consolidates data entities from SAP systems into one curated, semantically connected data model.

### SAP-Managed Graph

SAP provides a baseline data graph with:
- Pre-defined entity relationships
- Standard data models
- Cross-system navigation

### Supported Data Sources

| System | Entity Examples |
|--------|-----------------|
| S/4HANA Cloud | BusinessPartner, SalesOrder, Product |
| Sales Cloud | Account, Opportunity, Lead |
| SuccessFactors | Employee, Position, Department |

### Graph Navigator

Visual tool for exploring the data graph:
- Browse entities and relationships
- View entity properties
- Test queries
- Explore navigation paths

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/graph-e03300f.md

---

## Entity Types

### Unified Entities

Entities that aggregate data from multiple systems into a single view.

**Example**: Customer entity combining:
- S/4HANA BusinessPartner
- Sales Cloud Account
- SuccessFactors Employee (as contact)

### Mirrored Entities

Direct representation of source system entities without transformation.

### Custom Entities

User-defined entities that extend the standard graph:
- Custom data sources
- Custom properties
- Custom relationships

### Entity Properties

| Property Type | Description |
|---------------|-------------|
| Primitive | String, Number, Boolean, Date |
| Navigation | Links to other entities |
| Complex | Structured nested types |

**Documentation**:
- Unified: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/unified-entities-9bcd2ec.md
- Mirrored: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/mirrored-entities-07fdc7a.md
- Custom: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/custom-entities-af8dcd6.md

---

## Querying Graph

### OData V4 Queries

Standard OData query syntax:

```
GET /graph/api/v1/sap.graph/Customer
GET /graph/api/v1/sap.graph/Customer('1001')
GET /graph/api/v1/sap.graph/Customer?$filter=country eq 'US'
GET /graph/api/v1/sap.graph/Customer?$select=name,email
GET /graph/api/v1/sap.graph/Customer?$expand=orders
```

### Query Options

| Option | Description |
|--------|-------------|
| `$filter` | Filter results |
| `$select` | Select properties |
| `$expand` | Include related entities |
| `$orderby` | Sort results |
| `$top` | Limit results |
| `$skip` | Pagination offset |

### GraphQL Queries

```graphql
query {
  Customer(id: "1001") {
    name
    email
    orders {
      orderNumber
      totalAmount
    }
  }
}
```

### Navigation

Traverse entity relationships:

```
# OData - Get customer's orders
GET /graph/api/v1/sap.graph/Customer('1001')/orders

# OData - Get order's line items
GET /graph/api/v1/sap.graph/SalesOrder('ORDER001')/items
```

---

## Extensibility

### Custom Data Sources

Add non-SAP data to the graph:

1. **Register data source** connection
2. **Define entity mappings**
3. **Configure authentication**
4. **Test connectivity**

### Projections

Customize existing entities:
- Add/remove properties
- Rename entities
- Filter data
- Define transformations

### Compositions

Create new entities from existing ones:
- Combine entities
- Define relationships
- Create computed properties

### Projection Definition (JSON)

```json
{
  "projections": [
    {
      "name": "MyCustomer",
      "source": "sap.graph.Customer",
      "properties": {
        "include": ["id", "name", "email"],
        "exclude": ["internalNotes"]
      },
      "filter": "status eq 'ACTIVE'"
    }
  ]
}
```

---

## OData Provisioning Overview

OData Provisioning exposes SAP Business Suite data as OData services on BTP without requiring an on-premise SAP Gateway hub.

### Key Features

- **Expose business data** as OData services
- **No Gateway hub** installation required
- **Reduced TCO** with cloud-managed service
- **Multi-device access** through standard protocol

### Architecture

```
┌─────────────────┐
│   Application   │
│   (OData V2/V4) │
└────────┬────────┘
         │
┌────────▼────────┐
│     OData       │
│   Provisioning  │
│     (BTP)       │
└────────┬────────┘
         │ Cloud Connector
┌────────▼────────┐
│   SAP Business  │
│   Suite (ECC)   │
│   (On-Premise)  │
└─────────────────┘
```

### Prerequisites

| Requirement | Description |
|-------------|-------------|
| Cloud Connector | Connect to on-premise |
| Backend components | IW_BEP 200 or SAP_GWFND |
| Service plan | Appropriate IS service plan |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/odata-provisioning-d257fc3.md

---

## OData Service Registration

### Register Service

1. **Navigate** to OData Provisioning in Integration Suite
2. **Add system** connection via Cloud Connector
3. **Select services** to expose
4. **Configure** service settings
5. **Activate** service

### Service Settings

| Setting | Description |
|---------|-------------|
| Service Name | External service identifier |
| Backend System | Source system connection |
| Authentication | User propagation, technical user |
| Cache Settings | Response caching options |

### Runtime Access

Configure user access:
1. **Create role collection** for OData access
2. **Assign users** or user groups
3. **Map roles** to service operations

### Service URL Pattern

```
https://<tenant>.integrationsuite.cfapps.<region>.hana.ondemand.com
  /odata/v4/<service-name>/<entity-set>
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/runtime-access-and-role-assignment-for-odata-provisioning-b46816c.md

---

## Limits and Quotas

### Graph Limits

| Limit | Value | Scope |
|-------|-------|-------|
| Business data graphs | 500 | Per global account |
| Business data graphs | 50 | Per subaccount |
| Services per graph | 5,000 | Per graph |
| Service metadata size | 50 MB | Per service |
| Extensions | 100 | Per subaccount |
| Projection definitions | 100 | Per extension |
| Projection file size | 1 MB | Per file |

### OData Provisioning Limits

| Limit | Value |
|-------|-------|
| Services | Based on service plan |
| Connections | Based on service plan |
| Request size | 50 MB |
| Response size | 50 MB |

### Error Handling

When limits are exceeded:
- Graph returns error response
- Check quota usage in cockpit
- Request quota increase if needed

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/limits-a61f1ce.md

---

## Best Practices

### Graph Usage

1. **Use projections** to limit data exposure
2. **Select specific properties** to reduce payload
3. **Implement pagination** for large result sets
4. **Cache** where appropriate in applications

### OData Provisioning

1. **Secure services** with proper authentication
2. **Monitor usage** through BTP cockpit
3. **Optimize queries** to reduce backend load
4. **Use filters** to limit data transfer

### Performance

1. **Avoid deep navigation** (>3 levels)
2. **Batch requests** when possible
3. **Use $select** to limit properties
4. **Implement client-side caching**

---

## Related Documentation

- **Graph Overview**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-is-graph-ad1c48d.md
- **Business Data Graph**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/business-data-graph-894e28c.md
- **OData Provisioning**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/odata-provisioning-d257fc3.md
- **Graph Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-graph-2cfb06c.md
- **Limits**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/limits-a61f1ce.md
