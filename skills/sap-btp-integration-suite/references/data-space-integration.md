# Data Space Integration - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Eclipse Dataspace Connector](#eclipse-dataspace-connector)
4. [Contract Negotiation](#contract-negotiation)
5. [Asset Management](#asset-management)
6. [Data Transfer](#data-transfer)
7. [Supported Data Spaces](#supported-data-spaces)

---

## Overview

Data Space Integration enables secure, sovereign data exchange between data space participants in a reliable and controlled manner.

### Key Features

- **Sovereign data exchange** between participants
- **Policy enforcement** for data access control
- **Standardized protocols** (IDS standard)
- **SAP and non-SAP** application support
- **Harmonized monitoring** and configuration

### Benefits

| Benefit | Description |
|---------|-------------|
| Data Sovereignty | Control over data sharing policies |
| Interoperability | Standard-based exchange |
| Security | Encrypted, authenticated transfer |
| Compliance | Policy-enforced access |
| Auditability | Full transaction logging |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-is-data-space-integration-4edeee5.md

---

## Core Concepts

### International Data Spaces (IDS)

IDS represents "a uniform standard for data sharing that can be applied in any professional and private areas" based on European Privacy Policy principles.

### Data Space

A data space is "a virtual place that enables sovereign data governance, based on interoperable standardized components, among involved persons and companies."

Data spaces typically organize around:
- Industries (automotive, manufacturing)
- Topics (sustainability, supply chain)
- Regions (European data spaces)

### Participants

| Role | Description |
|------|-------------|
| Provider | Offers data assets |
| Consumer | Requests data assets |
| Broker | Facilitates discovery (optional) |
| Clearing House | Logs transactions (optional) |

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Data Space                              │
│  ┌─────────────┐                      ┌─────────────┐       │
│  │   Provider  │  ←── Contract ───→   │  Consumer   │       │
│  │   (SAP IS)  │     Negotiation     │   (SAP IS)  │       │
│  │             │                      │             │       │
│  │  ┌───────┐  │                      │  ┌───────┐  │       │
│  │  │ Asset │  │ ════ Transfer ════▶ │  │ Asset │  │       │
│  │  └───────┘  │                      │  └───────┘  │       │
│  └─────────────┘                      └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/concepts-in-data-space-integration-fcf96b2.md

---

## Eclipse Dataspace Connector

Data Space Integration is built on Eclipse Dataspace Connector (EDC), an open-source framework.

### EDC Capabilities

| Capability | Description |
|------------|-------------|
| Data Querying | Discover available assets |
| Data Exchange | Transfer data between participants |
| Policy Enforcement | Apply access policies |
| Monitoring | Track transfers and usage |
| Auditing | Log all transactions |

### EDC Components

```
┌─────────────────────────────────────┐
│     Eclipse Dataspace Connector     │
├─────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐   │
│  │  Identity   │  │   Catalog   │   │
│  │  Service    │  │   Service   │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │  Transfer   │  │   Policy    │   │
│  │  Service    │  │   Engine    │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
```

---

## Contract Negotiation

### Negotiation Process

```
1. Provider creates Asset + Policy → Contract Definition
                    ↓
2. Contract Offers generated from definitions
                    ↓
3. Consumer discovers offers in catalog
                    ↓
4. Consumer initiates negotiation
                    ↓
5. Negotiation iterations (accept/counter/reject)
                    ↓
6. Agreement finalized → Contract established
```

### Contract Components

| Component | Description |
|-----------|-------------|
| Asset | Data being shared |
| Policy | Access rules and constraints |
| Offer | Provider's terms |
| Agreement | Final accepted terms |

### Policy Types

| Policy | Description |
|--------|-------------|
| Access Policy | Who can access |
| Usage Policy | How data can be used |
| Contract Policy | Terms of agreement |

### Policy Examples

```json
{
  "policy": {
    "permissions": [
      {
        "action": "USE",
        "constraints": [
          {
            "leftOperand": "PURPOSE",
            "operator": "EQ",
            "rightOperand": "ANALYTICS"
          }
        ]
      }
    ]
  }
}
```

---

## Asset Management

### Asset Types

| Type | Description |
|------|-------------|
| HTTP | REST API endpoints |
| S3 | AWS S3 storage |
| Azure | Azure Blob storage |
| File | File-based transfer |

### Creating Assets

1. **Define asset** metadata
2. **Configure** data source
3. **Set** access policies
4. **Publish** to catalog

### Asset Structure

```json
{
  "asset": {
    "id": "asset-001",
    "properties": {
      "name": "Product Catalog",
      "description": "Product master data",
      "contentType": "application/json"
    }
  },
  "dataAddress": {
    "type": "HttpData",
    "baseUrl": "https://api.example.com/products"
  }
}
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/consuming-data-space-assets-5c0cdb8.md

---

## Data Transfer

### Transfer Types

| Type | Description |
|------|-------------|
| HTTP | REST-based transfer |
| S3 | Object storage transfer |
| Azure Blob | Azure storage transfer |

### Transfer Process

1. **Initiate** transfer request
2. **Authenticate** with data space
3. **Apply** contract policies
4. **Execute** data transfer
5. **Confirm** completion

### HTTP Asset Transfer

```
Consumer                  Provider
   │                         │
   │──── Transfer Request ──▶│
   │                         │
   │◀─── EDR (Endpoint) ─────│
   │                         │
   │──── GET /data ─────────▶│
   │     (with EDR token)    │
   │                         │
   │◀─── Data Response ──────│
   │                         │
```

### EDR Management

Endpoint Data Reference (EDR) provides secure access to assets:
- Time-limited tokens
- Policy-enforced access
- Automatic refresh

**Documentation**:
- HTTP Assets: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/consuming-http-assets-735300c.md
- S3/Azure Assets: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/consuming-s3-and-azure-assets-4afdf5c.md

---

## Supported Data Spaces

### Currently Supported

| Data Space | Industry | Description |
|------------|----------|-------------|
| Catena-X | Automotive | Automotive supply chain |

### Catena-X Overview

Catena-X is the automotive industry data space for:
- Supply chain visibility
- Quality management
- Sustainability tracking
- Circular economy

### Catena-X Integration

```
┌──────────────────────────────────────┐
│           Catena-X Network           │
│  ┌────────────────────────────────┐  │
│  │    SAP Integration Suite       │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │ Data Space Integration   │  │  │
│  │  │  - Asset Management      │  │  │
│  │  │  - Contract Negotiation  │  │  │
│  │  │  - Data Transfer         │  │  │
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## API Access

### EDR Management APIs

Programmatic access to Data Space Integration:

| Operation | Description |
|-----------|-------------|
| List offers | Browse available assets |
| Negotiate | Initiate contract negotiation |
| Get EDR | Obtain data reference |
| Transfer | Execute data transfer |

### API Example

```bash
# Get contract offers
GET /api/v1/catalog/offers

# Initiate negotiation
POST /api/v1/negotiations
{
  "offerId": "offer-123",
  "policy": {...}
}

# Get EDR for transfer
GET /api/v1/edr/{agreementId}
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/using-apis-to-work-with-data-space-integration-411fd1e.md

---

## Configuration

### Prerequisites

| Requirement | Description |
|-------------|-------------|
| BTP Subaccount | Cloud Foundry enabled |
| Data Space membership | Registered participant |
| Integration Suite | With Data Space entitlement |

### Setup Steps

1. **Enable** Data Space Integration capability
2. **Configure** data space connection
3. **Register** as participant
4. **Set up** identity provider
5. **Create** assets and policies

### Monitoring

Track data space activities:
- Contract negotiations
- Active agreements
- Data transfers
- Policy violations

---

## Best Practices

### Policy Design

1. **Be specific** about permitted uses
2. **Set time limits** on agreements
3. **Require purpose** declarations
4. **Log all access** for audit

### Asset Management

1. **Document** asset metadata thoroughly
2. **Version** assets appropriately
3. **Test** access before publishing
4. **Monitor** consumption patterns

### Security

1. **Use strong authentication**
2. **Encrypt** data in transit
3. **Audit** all transactions
4. **Review** policies regularly

---

## Troubleshooting

### Common Issues

| Issue | Resolution |
|-------|------------|
| Negotiation failed | Check policy compatibility |
| Transfer timeout | Verify network connectivity |
| Access denied | Review contract terms |
| Invalid EDR | Request new EDR token |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-data-space-integration-166fa88.md

---

## Related Documentation

- **Overview**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-is-data-space-integration-4edeee5.md
- **Concepts**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/concepts-in-data-space-integration-fcf96b2.md
- **Consuming Assets**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/consuming-data-space-assets-5c0cdb8.md
- **APIs**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/using-apis-to-work-with-data-space-integration-411fd1e.md
- **Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-data-space-integration-166fa88.md
