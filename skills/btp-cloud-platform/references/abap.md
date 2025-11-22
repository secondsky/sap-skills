# ABAP Environment Reference

Complete guidance for SAP BTP ABAP environment development and administration.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/10-concepts

---

## Table of Contents

1. [ABAP Environment Overview](#abap-environment-overview)
2. [Service Plans and Metering](#service-plans-and-metering)
3. [System Creation](#system-creation)
4. [Development Tools](#development-tools)
5. [Programming Model](#programming-model)
6. [Communication Management](#communication-management)
7. [Lifecycle Management](#lifecycle-management)
8. [Integration](#integration)

---

## ABAP Environment Overview

The ABAP environment enables cloud ABAP development on SAP BTP.

### Key Features

- Latest ABAP platform cloud release
- SAP HANA database (1:1 per system)
- ABAP RESTful Application Programming Model (RAP)
- Core Data Services (CDS)
- SAP Fiori integration
- Released objects approach for APIs

### Use Cases

| Use Case | Description |
|----------|-------------|
| **Extensions** | Extend S/4HANA Cloud, SuccessFactors |
| **New Apps** | Build cloud-native ABAP applications |
| **Transformation** | Move existing ABAP to cloud |
| **Side-by-Side** | Complement SAP solutions |

### Architecture

```
ABAP System Instance
├── ABAP Runtime (Memory: ABAP Compute Units)
├── SAP HANA Database (Storage: HANA Compute Units)
├── Fiori Launchpad
└── Web Access (ADT, Launchpad)
```

---

## Service Plans and Metering

### Service Plans

| Plan | Use Case | Requirements |
|------|----------|--------------|
| **free** | Proof of concept | Auto-stops nightly, no SLA |
| **standard** | Dev/Test/Prod | Min 2 HANA CU + 1 ABAP CU |
| **saas_oem** | Multitenancy SaaS | Min 2 HANA CU + 1 ABAP CU |

### Compute Units

**ABAP Compute Unit (ACU)**:
- Configures runtime memory
- Measured in 16 GB blocks
- Volatile memory for application execution
- Billed hourly

**HANA Compute Unit (HCU)**:
- Configures persistent storage
- Measured in 16 GB blocks
- Retains data after restart
- Billed hourly

### Entitlement Requirements

For standard plan, assign all three:
1. `abap` service with `standard` plan
2. `abap_compute_unit` with quantity
3. `hana_compute_unit` with quantity

### Minimum Configuration

| Component | Minimum |
|-----------|---------|
| HANA Compute Units | 2 |
| ABAP Compute Units | 1 |
| Total Memory | 48 GB (32 HANA + 16 ABAP) |

### Free Plan Limitations

- Auto-stops every night
- Manual restart via Landscape Portal
- Community support only
- No SLA
- Limited resources

---

## System Creation

### Prerequisites

1. Subaccount with Cloud Foundry enabled
2. ABAP environment entitlements assigned
3. Space created

### Create via BTP Cockpit

1. Navigate to **Subaccount > Cloud Foundry > Spaces**
2. Open target space
3. Click **SAP HANA Cloud** or **Service Marketplace**
4. Find **ABAP environment**
5. Create instance with parameters:

```json
{
  "admin_email": "admin@example.com",
  "description": "Development System",
  "is_development_allowed": true,
  "sapsystemname": "DEV",
  "size_of_runtime": 1,
  "size_of_persistence": 4
}
```

### Create via CF CLI

```bash
cf create-service abap standard my-abap-system -c '{
  "admin_email": "admin@example.com",
  "description": "Development System",
  "is_development_allowed": true,
  "sapsystemname": "DEV",
  "size_of_runtime": 1,
  "size_of_persistence": 4
}'
```

### System Parameters

| Parameter | Description |
|-----------|-------------|
| `admin_email` | Initial admin user email |
| `sapsystemname` | 3-char system ID |
| `is_development_allowed` | Enable dev features |
| `size_of_runtime` | ABAP Compute Units |
| `size_of_persistence` | HANA Compute Units |

---

## Development Tools

### ABAP Development Tools (ADT)

Eclipse-based IDE for ABAP development:

1. Install Eclipse (latest supported version)
2. Install ADT plugin from SAP update site
3. Connect to ABAP system

**ADT Update Site**: https://tools.hana.ondemand.com/latest

### ADT Features

- ABAP Editor with code completion
- CDS Editor
- Debugger
- Unit Test Runner
- Transport Management
- Git Integration (abapGit)

### Connecting ADT

1. **File > New > ABAP Cloud Project**
2. Select **SAP BTP, ABAP Environment**
3. Enter service key or use browser login
4. Select system and log in

### Service Key for ADT

```bash
cf create-service-key my-abap-system my-key
cf service-key my-abap-system my-key
```

### Web Access

| Component | URL Pattern |
|-----------|-------------|
| Fiori Launchpad | `https://<system>.abap.<region>.hana.ondemand.com/` |
| SAP GUI for HTML | Via Fiori Launchpad |
| ADT | Via Eclipse with service key |

---

## Programming Model

### ABAP RESTful Application Programming Model (RAP)

Modern ABAP development approach:

```
CDS Data Model → Behavior Definition → Service Definition → Service Binding
```

### CDS Data Model

```abap
@AccessControl.authorizationCheck: #CHECK
define root view entity ZI_Product
  as select from zproduct
{
  key product_id as ProductId,
      product_name as ProductName,
      @Semantics.amount.currencyCode: 'Currency'
      price as Price,
      currency as Currency
}
```

### Behavior Definition

```abap
managed implementation in class zbp_i_product unique;
strict ( 2 );

define behavior for ZI_Product alias Product
persistent table zproduct
lock master
authorization master ( instance )
{
  create;
  update;
  delete;

  field ( readonly ) ProductId;
  field ( mandatory ) ProductName;

  validation validateProduct on save { create; update; }
  determination setDefaults on modify { create; }
}
```

### Service Definition

```abap
@EndUserText.label: 'Product Service'
define service ZUI_PRODUCT {
  expose ZI_Product as Product;
}
```

### Service Binding

Create via ADT:
1. Right-click service definition
2. New > Service Binding
3. Select binding type (OData V2/V4, UI)
4. Activate and publish

---

## Communication Management

### Communication Scenarios

Predefined integration patterns:

| Type | Description |
|------|-------------|
| **Inbound** | External calls to ABAP |
| **Outbound** | ABAP calls external systems |

### Communication Arrangement

```
Communication Scenario → Communication System → Communication User
```

### Creating Outbound Communication

1. Create Communication System (target system details)
2. Create Outbound Communication User (credentials)
3. Create Communication Arrangement (link scenario + system)

### HTTP Destination

```abap
DATA(lo_destination) = cl_http_destination_provider=>create_by_comm_arrangement(
  comm_scenario  = 'Z_MY_SCENARIO'
  service_id     = 'Z_MY_SERVICE'
).

DATA(lo_client) = cl_web_http_client_manager=>create_by_http_destination( lo_destination ).
DATA(lo_response) = lo_client->execute( if_web_http_client=>get ).
```

---

## Lifecycle Management

### Software Components

Git-based source code management:

```
Software Component (Git repo)
├── Package 1
│   ├── Classes
│   ├── CDS Views
│   └── Services
└── Package 2
```

### Transport Management

| Transport Type | Use |
|----------------|-----|
| **Workbench** | Development objects |
| **Customizing** | Configuration |

### Release and Import

1. Release transport request in source system
2. Export via gCTS or Cloud Transport Management
3. Import to target system

### Landscape Configuration

```
Development → Test → Production
     ↓           ↓          ↓
   Clone      Import     Import
```

---

## Integration

### Integrated SAP BTP Services

| Service | Integration |
|---------|-------------|
| SAP Destination Service | Connectivity |
| SAP Build Work Zone | Launchpad |
| SAP Build Process Automation | Workflows |
| SAP Forms by Adobe | PDF forms |
| SAP Cloud Identity Services | Authentication |

### Fiori Elements

Automatic UI generation from CDS annotations:

```abap
@UI.headerInfo: {
  typeName: 'Product',
  typeNamePlural: 'Products',
  title: { type: #STANDARD, value: 'ProductName' }
}
@UI.lineItem: [{ position: 10, label: 'Product ID' }]
@UI.identification: [{ position: 10 }]
ProductId,
```

---

## Regions

### Available Regions

| Region | Provider | Technical Name |
|--------|----------|----------------|
| EU (Frankfurt) | AWS | eu10 |
| US East | AWS | us10 |
| Japan (Tokyo) | AWS | jp10 |
| Australia (Sydney) | AWS | ap10 |
| Singapore | AWS | ap11 |
| EU (Netherlands) | Azure | eu20 |
| US West | Azure | us20 |
| Japan (Tokyo) | Azure | jp20 |

Full list: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/regions-and-api-endpoints-for-the-abap-environment-879f373.md

---

## Related Documentation

- ABAP Environment: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/abap-environment-11d6265.md
- Service Plans: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/service-plans-and-metering-for-sap-btp-abap-environment-b7f5a93.md
- Getting Started: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/20-getting-started/getting-started-in-the-abap-environment-2ffdd24.md
- SAP Help Portal: https://help.sap.com/docs/btp/sap-business-technology-platform/abap-environment
