# Extensibility and Multitenancy Reference

**Source**:
- Multitenancy: https://cap.cloud.sap/docs/guides/multitenancy/
- Extensibility: https://cap.cloud.sap/docs/guides/extensibility/

## SaaS Multitenancy

### Enable Multitenancy

```sh
cds add multitenancy
```

This command:
- Adds `@sap/cds-mtxs` dependency
- Configures multitenancy profiles
- Creates MTX sidecar at `mtx/sidecar`
- Updates deployment descriptors

### Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Main App      │     │   MTX Sidecar   │
│  (CAP Services) │◄───►│ (Provisioning)  │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
         ┌─────────────────────┐
         │   Tenant Databases  │
         │  ┌───┐ ┌───┐ ┌───┐  │
         │  │T1 │ │T2 │ │T3 │  │
         │  └───┘ └───┘ └───┘  │
         └─────────────────────┘
```

### Local Testing

```sh
# Terminal 1: MTX Sidecar
cds watch mtx/sidecar

# Terminal 2: Main App
cds watch --with-mtx

# Terminal 3: Subscribe tenant
curl -X PUT http://localhost:4005/-/cds/saas-provisioning/tenant/t1
```

### Configuration

```json
{
  "cds": {
    "requires": {
      "multitenancy": true,
      "[production]": {
        "db": { "kind": "hana" },
        "auth": { "kind": "xsuaa" }
      }
    }
  }
}
```

### Tenant Events

```js
const LOG = cds.log('mtx');  // Use structured logging in production

// Subscribe handler
cds.on('subscribe', async (tenant) => {
  LOG.info(`Tenant ${tenant} subscribed`);
  // Initialize tenant-specific data
});

// Upgrade handler
cds.on('upgrade', async (tenant) => {
  LOG.info(`Tenant ${tenant} upgraded`);
  // Run migrations
});

// Unsubscribe handler
cds.on('unsubscribe', async (tenant) => {
  LOG.info(`Tenant ${tenant} unsubscribed`);
  // Cleanup
});
```

> **Note**: In production, use `cds.log()` for structured logging instead of `console.log`. This integrates with SAP BTP logging services and supports log levels.

### Production Deployment

```sh
# Add all required services
cds add hana,xsuaa,mta,multitenancy

# Build and deploy
mbt build
cf deploy mta_archives/*.mtar
```

### BTP Configuration

Required services:
- SAP HANA Cloud (HDI containers per tenant)
- XSUAA (with `tenant-mode: shared`)
- SaaS Provisioning Service

---

## SaaS Extensibility

### Enable Extensibility

```sh
cds add extensibility
```

### Provider Configuration

```json
{
  "cds": {
    "requires": {
      "extensibility": true
    },
    "mtx": {
      "extension-allowlist": [
        { "for": ["sap.capire.orders"] }
      ]
    }
  }
}
```

### Extension Restrictions

```json
{
  "cds": {
    "mtx": {
      "element-prefix": ["x_", "Z_"],
      "namespace-blocklist": ["internal.*"],
      "entity-allowlist": [
        { "for": ["my.bookshop.Books", "my.bookshop.Authors"] }
      ],
      "extensibility": {
        "max-fields": 10
      }
    }
  }
}
```

### Customer Extension Workflow

**1. Pull Base Model:**
```sh
cds pull --from https://my-saas-app.cfapps.eu10.hana.ondemand.com -u developer:
npm install
```

**2. Create Extension:**
```cds
// extensions/ext.cds
using { my.bookshop as base } from '.base/my-bookshop';

extend entity base.Books with {
  x_customField : String(100);
  x_priority    : Integer;
}

annotate base.Books with {
  x_customField @title: 'Custom Field';
};
```

**3. Test Locally:**
```sh
cds watch --port 4006
```

**4. Push to Test Tenant:**
```sh
cds push --to https://my-saas-app.cfapps.eu10.hana.ondemand.com -u test-dev:
```

**5. Push to Production:**
```sh
cds push --to https://my-saas-app.cfapps.eu10.hana.ondemand.com -u prod-user:
```

### Extension Types

**Data Model Extensions:**
```cds
// Add new fields
extend entity Books with {
  x_rating : Decimal(2,1);
  x_notes  : String(1000);
}

// Add new entities
@cds.autoexpose
entity x_BookCategories {
  key code : String(10);
  name     : String(100);
}

// Add associations
extend entity Books with {
  x_category : Association to x_BookCategories;
}
```

**Service Extensions:**
```cds
using { AdminService } from '.base/srv/admin-service';

extend service AdminService with {
  entity x_Reports as projection on x_CustomReports;
}
```

**UI Extensions:**
```cds
annotate AdminService.Books with @UI.LineItem: [
  ... up to { Value: price },
  { Value: x_customField, Label: 'Custom' },
  ...
];
```

### Authentication Helper

```sh
# Login and store credentials
cds login https://my-saas-app.cfapps.eu10.hana.ondemand.com

# Subsequent commands use stored credentials
cds pull
cds push

# Logout
cds logout
```

---

## Feature Toggles

### Configuration

```json
{
  "cds": {
    "features": {
      "audit_personal_data": true,
      "my_feature": false
    }
  }
}
```

### Usage in Handlers

```js
if (cds.env.features.my_feature) {
  // Feature-specific logic
}
```

### Tenant-Specific Toggles

```js
cds.on('serving', async (srv) => {
  srv.before('*', async (req) => {
    const tenant = req.tenant;
    const features = await getTenantFeatures(tenant);
    req.features = features;
  });
});
```

---

## Composition (Reuse)

### Creating Reusable Packages

```json
{
  "name": "@my-org/common-types",
  "version": "1.0.0",
  "cds": {
    "models": ["srv/", "db/"]
  }
}
```

```cds
// db/common.cds
namespace my.common;

type Money {
  amount   : Decimal(15,2);
  currency : Currency;
}

aspect audited {
  createdAt  : Timestamp;
  createdBy  : String(255);
  modifiedAt : Timestamp;
  modifiedBy : String(255);
}
```

### Using Reusable Packages

```sh
npm add @my-org/common-types
```

```cds
using { my.common } from '@my-org/common-types';

entity Orders {
  key ID    : UUID;
  total     : common.Money;
  // Includes amount and currency
}
```

### Extending Reused Definitions

```cds
using { my.common.audited } from '@my-org/common-types';

// Extend the aspect
extend aspect audited with {
  version : Integer default 1;
}
```

---

## Tenant Context Access

### Node.js

```js
// Current tenant
const tenant = cds.context.tenant;

// Tenant-specific query
this.on('READ', 'Orders', async (req) => {
  const tenant = req.tenant;
  return SELECT.from('Orders').where({ tenant_ID: tenant });
});
```

### Java

```java
@On(event = CqnService.EVENT_READ, entity = Orders_.CDS_NAME)
public void readOrders(CdsReadEventContext context) {
  String tenant = context.getUserInfo().getTenant();
  // Tenant-specific logic
}
```

---

## MTX Services

### Deployment Service
- Handles tenant provisioning
- Manages schema evolution
- Coordinates HDI deployments

### Model Provider Service
- Serves extended models
- Compiles tenant-specific CDS
- Manages extension cache

### Extension Service
- Activates extensions
- Validates extension safety
- Manages extension lifecycle
