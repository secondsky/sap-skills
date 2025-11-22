# Extensibility

Custom extensions for SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/blob/main/docs/initial-setup-and-administration/extensibility-7612e09.md

## Overview

SAP Master Data Integration enables custom extensions to integration models through field and node additions for master data objects like Business Partner, Product, and Workforce Person.

## Why Extensibility?

Standard SAP software covers many processes, but customer landscapes have specific requirements:
- Control business processes with custom attributes
- Enable distribution based on custom fields
- Support analytics functions

## Configuration Methods

### UI Method
Use **Manage Business Object Type** in Business Data Orchestration

### API Method
Extensibility APIs for direct implementation, particularly for composition-based extensions.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Role | ExtensionDeveloper |
| Access | Assigned via BTP Cockpit role collections |

## Extension Principles

### Version Compatibility
- Extensions valid across compatible One Domain Model versions
- Extension in v2.0.0 applies to v3.0.0 automatically
- Does NOT apply to earlier versions

### Immutability
**Critical**: Extension fields cannot be updated or deleted once created.

### Scope
Extensions exist only within MDI. Ensure upstream and downstream applications support the extended fields.

---

## Extension Types

### Field-Level Extensions

Supported primitive types:

| Type | Additional Parameters |
|------|----------------------|
| String | Length constraints |
| Boolean | - |
| Date | - |
| DateTime | - |
| Double | - |
| Time | - |
| Integer | - |
| Decimal | Precision, scale |
| UUID | - |

### Node-Level Extensions (Composition)

Create new entity types within the extended model:

| Property | Description |
|----------|-------------|
| type | "Composition" |
| relationship | "one" or "many" |
| fields | Array of embedded fields |

---

## SOAP Integration Extensions

### Supported Entities
- BusinessPartner
- BusinessPartnerRelationship

### Namespace Requirement
Namespace prefix must begin with `extns`

### soapParameters.target
Specifies corresponding SOAP model field name for cross-system mapping.

---

## Extension API Workflow

### 1. Create Extension

```http
POST /extensibility/v1/businessObjectTypes/{type}/extensions
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "customField",
  "type": "String",
  "length": 100
}
```

### 2. Check Activation Status

| Status | Description |
|--------|-------------|
| activationInProgress | Extension being processed |
| activated | Ready for use |
| failed | Activation error |

### 3. Generate Extended WSDL

After successful activation:

```http
PUT /extensibility/v1/wsdl/generate
```

### 4. Retrieve WSDL

```http
GET /extensibility/v1/wsdl/{serviceName}
```

Use for integration documentation and client configuration.

---

## Extension Examples

### Simple Field Extension

```json
{
  "name": "customerPriority",
  "type": "String",
  "length": 20
}
```

### Composition Extension (Node)

```json
{
  "name": "customAddresses",
  "type": "Composition",
  "relationship": "many",
  "fields": [
    {
      "name": "addressType",
      "type": "String",
      "length": 10
    },
    {
      "name": "isPrimary",
      "type": "Boolean"
    }
  ]
}
```

---

## Using Extensions in Distribution Models

Created extensions can be used as filter criteria:
1. Access Distribution Model configuration
2. Select extended fields in filter conditions
3. Apply object selection or data scope filters

---

## Deprecation Notice

| API | Status | Timeline |
|-----|--------|----------|
| Extensibility v0 API | Deprecated | Q2 2022 |
| Extensibility v1 API | Current | Use this |

---

## Best Practices

1. **Plan extensions carefully** - Cannot be modified or deleted
2. **Coordinate with applications** - Ensure upstream/downstream support
3. **Use consistent naming** - Follow organization conventions
4. **Document extensions** - Track all custom fields
5. **Test thoroughly** - Validate in non-production first
6. **Use appropriate types** - Match business requirements

---

## Limitations

- Extensions cannot be updated after creation
- Extensions cannot be deleted
- SOAP extensions limited to BusinessPartner and BusinessPartnerRelationship
- Namespace must start with `extns` for SOAP
- Custom extensions not included in API Business Accelerator Hub specifications
