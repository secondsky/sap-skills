# Content Transport - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Development
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Transport Options](#transport-options)
3. [Cloud Transport Management](#cloud-transport-management)
4. [CTS+ Transport](#cts-transport)
5. [MTAR Download](#mtar-download)
6. [Manual Export/Import](#manual-exportimport)
7. [Best Practices](#best-practices)

---

## Overview

Content transport enables reuse of integration content across multiple tenants by exporting from source and importing to target.

### Use Cases

- **Development → Test → Production** promotion
- **Tenant-to-tenant** content sharing
- **Backup and restore** scenarios
- **Multi-region** deployment

### Key Constraints

| Constraint | Description |
|------------|-------------|
| Environment | Cannot transport between Neo and CF |
| Draft status | Cannot transport draft artifacts |
| Access policies | Protected artifacts restricted |
| Externalized parameters | Values unchanged during transport |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-e3c79d6.md

---

## Transport Options

### Option Comparison

| Option | Automation | Setup | Use Case |
|--------|------------|-------|----------|
| Cloud Transport Management | High | Complex | Enterprise DevOps |
| CTS+ | High | Complex | SAP landscape |
| MTAR Download | Medium | Moderate | Flexible deployment |
| Manual Export/Import | Low | Simple | Ad-hoc, small scale |

### Decision Flow

```
Need automated DevOps pipeline?
├── Yes → Cloud Transport Management
└── No
    ├── Have CTS+ infrastructure?
    │   ├── Yes → CTS+
    │   └── No → MTAR Download or Manual
    └── Small scale / ad-hoc?
        ├── Yes → Manual Export/Import
        └── No → MTAR Download
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/decision-help-for-choosing-the-right-content-transport-option-19e0e73.md

---

## Cloud Transport Management

SAP Cloud Transport Management Service provides automated transport across landscapes.

### Architecture

```
┌──────────────────────────────────────────────────┐
│          Cloud Transport Management               │
├──────────────────────────────────────────────────┤
│  Source Node → Transport Route → Destination Node │
│    (DEV)                            (PRD)         │
└──────────────────────────────────────────────────┘
```

### Setup Steps

1. **Subscribe** to Cloud Transport Management Service
2. **Create service instance** in BTP cockpit
3. **Configure source node** (source tenant)
4. **Configure destination node** (target tenant)
5. **Create transport route** connecting nodes
6. **Enable transport** in Integration Suite

### Configuration

**Source Node**:
- Integration Suite tenant
- Export permissions
- Content Agent service

**Destination Node**:
- Target Integration Suite tenant
- Import permissions
- Deployment credentials

**Transport Route**:
- Source → Destination mapping
- Route name
- Description

### Transport Process

1. **Select content** in Integration Suite
2. **Export to transport** queue
3. **Approve transport** in TMS
4. **Import** to destination
5. **Verify** deployment

### Node Configuration (JSON)

```json
{
  "name": "DEV_Integration",
  "description": "Development tenant",
  "type": "SAP_CPI",
  "url": "https://dev-tenant.it-cpitrial.cfapps.eu10.hana.ondemand.com",
  "credentials": {
    "type": "OAuth",
    "clientId": "...",
    "clientSecret": "..."
  }
}
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-using-cloud-transport-management-d458b17.md

---

## CTS+ Transport

SAP Change and Transport System extended for cloud content.

### Prerequisites

- CTS+ system configured
- Transport domain setup
- RFC connectivity to cloud

### Setup

1. **Configure CTS+** transport domain
2. **Create transport routes** to cloud targets
3. **Set up destination** in SAP Solution Manager
4. **Enable CTS+ transport** in Integration Suite

### Transport Process

1. **Create transport request** in CTS+
2. **Export content** from Integration Suite
3. **Release transport** request
4. **Import** at target via CTS+

### Use Cases

- Organizations with existing CTS+ infrastructure
- Integrated with SAP Change Management
- Enterprise transport governance

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-using-cts-3cdfb51.md

---

## MTAR Download

Download content as Multi-Target Application Archive for flexible deployment.

### Process

1. **Select content** to export
2. **Download MTAR** file
3. **Upload to** CTS+ or Cloud Transport Management
4. **Deploy** to target tenant

### MTAR Structure

```
my-content.mtar
├── META-INF/
│   ├── MANIFEST.MF
│   └── mtad.yaml
├── package1/
│   ├── integration-flow1.iflw
│   └── mapping1.mmap
└── package2/
    └── integration-flow2.iflw
```

### Deployment Options

| Option | Description |
|--------|-------------|
| CTS+ | Upload to transport request |
| TMS | Upload to transport node |
| CF Deploy | Direct CF deployment |

### Neo Environment

MTAR can be deployed directly to target tenant via SAP Cloud Platform Solutions:
1. Navigate to Solutions
2. Upload MTAR
3. Deploy to tenant

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-using-mtar-download-c111710.md

---

## Manual Export/Import

Direct export and import without transport infrastructure.

### Export Process

1. **Navigate** to Design workspace
2. **Select package** to export
3. **Click Export**
4. **Download** .zip file

### Import Process

1. **Navigate** to Design workspace
2. **Click Import**
3. **Select** .zip file
4. **Choose** import options
5. **Import** content

### Import Options

| Option | Description |
|--------|-------------|
| Create new | Create as new package |
| Overwrite | Replace existing |
| Skip existing | Keep existing, add new |

### Exported Content

| Content Type | Included |
|--------------|----------|
| Integration Flows | Yes |
| Value Mappings | Yes |
| Script Collections | Yes |
| Message Mappings | Yes |
| OData APIs | Yes |
| REST APIs | Yes |

### Not Exported

| Content Type | Reason |
|--------------|--------|
| Security Material | Security risk |
| Deployed state | Runtime-specific |
| Monitoring data | Tenant-specific |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-using-manual-export-and-import-fd23e14.md

---

## API Management Transport

### Transportable Content

| Content Type | Method |
|--------------|--------|
| API Proxies | TMS / Manual |
| Products | TMS / Manual |
| API Providers | TMS / Manual |
| Key Value Maps | TMS / Manual |
| Certificates | Special handling |

### Transport via TMS

1. **Configure** API Management for TMS
2. **Export** API artifacts
3. **Transport** via TMS route
4. **Import** to target

### Certificate Transport

Certificates require special handling:
1. Export certificate references (not keys)
2. Import references to target
3. Upload actual certificates separately

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/transport-api-management-artifacts-via-sap-cloud-transport-management-service-2e4bc72.md

---

## Selective Transport

### Individual Artifact Transport

Transport specific artifacts instead of entire packages:

1. **Select artifact** in package
2. **Export** individual item
3. **Transport** or download
4. **Import** to target

### Restrictions

| Condition | Transport Allowed |
|-----------|-------------------|
| Draft status | No |
| Access policy protected | No |
| Referenced artifacts | Must include dependencies |

### Handling Dependencies

When transporting artifacts with dependencies:
1. **Include** all referenced artifacts
2. **Verify** references exist in target
3. **Transport** in correct order

---

## Best Practices

### Transport Strategy

1. **Define landscape** (DEV → QA → PRD)
2. **Choose transport method** based on scale
3. **Automate** where possible
4. **Document** transport procedures

### Content Management

1. **Use packages** to group related content
2. **Version** artifacts meaningfully
3. **Test** in lower environment first
4. **Validate** after transport

### Externalized Parameters

Externalized parameters retain source values:
1. **Document** parameter differences
2. **Update** after transport if needed
3. **Use environment-specific** configuration

### Pre-Shipped Content

Standard SAP content is not updated during transport:
1. **Update separately** from SAP
2. **Track versions** independently
3. **Test compatibility** after updates

---

## Troubleshooting

### Common Issues

| Issue | Resolution |
|-------|------------|
| Transport fails | Check permissions, connectivity |
| Content missing | Verify export includes all dependencies |
| Deployment error | Check target tenant configuration |
| Version conflict | Resolve conflicts manually |

### Error Resolution

1. **Check transport logs** in TMS
2. **Verify credentials** for source/target
3. **Confirm connectivity** between systems
4. **Review artifact** compatibility

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-transporting-content-bbfb41a.md

---

## Related Documentation

- **Content Transport Overview**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-e3c79d6.md
- **Decision Help**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/decision-help-for-choosing-the-right-content-transport-option-19e0e73.md
- **TMS Transport**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/content-transport-using-cloud-transport-management-d458b17.md
- **Best Practices**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/guidelines-and-best-practices-for-content-transport-8a8aa38.md
