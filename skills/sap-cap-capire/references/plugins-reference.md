# CAP Plugins Complete Reference

> Source: https://cap.cloud.sap/docs/plugins/

## All Available Plugins (15)

| # | Plugin | Node.js Package | Java Package | Purpose |
|---|--------|-----------------|--------------|---------|
| 1 | OData V2 Adapter | `@cap-js-community/odata-v2-adapter` | Built-in | Legacy OData V2 support |
| 2 | WebSocket | `@cap-js-community/websocket` | - | Real-time communication |
| 3 | UI5 Dev Server | `ui5-ecosystem-showcase/cds-plugin-ui5` | - | UI5 tooling integration |
| 4 | GraphQL Adapter | `@cap-js/graphql` | - | GraphQL protocol |
| 5 | Attachments | `@cap-js/attachments` | `cds-feature-attachments` | File management |
| 6 | SAP Document Mgmt | `@cap-js/sdm` | `cap-java/sdm` | CMIS repository |
| 7 | Audit Logging | `@cap-js/audit-logging` | Built-in | Personal data logging |
| 8 | Change Tracking | `@cap-js/change-tracking` | Built-in | Change history |
| 9 | Notifications | `@cap-js/notifications` | - | SAP Build WorkZone alerts |
| 10 | Telemetry | `@cap-js/telemetry` | Built-in | OpenTelemetry |
| 11 | ORD | `@cap-js/ord` | Built-in | Resource discovery |
| 12 | CAP Operator | `@cap-js/cap-operator-plugin` | Available | K8s lifecycle |
| 13 | Event Hub | `@cap-js/event-broker` | `cds-feature-event-hub` | S/4HANA events |
| 14 | Advanced Event Mesh | `@cap-js/advanced-event-mesh` | `cds-feature-advanced-event-mesh` | Cross-platform events |
| 15 | ABAP RFC | `@sap/cds-rfc` | - | RFC function modules |

---

## 1. OData V2 Adapter

Converts OData V2 requests to V4 for legacy UI support.

### Installation (Node.js)
```sh
npm add @cap-js-community/odata-v2-adapter
```

### Use Cases
- Legacy SAP UI5 applications
- Tree tables (require V2)
- Existing OData V2 consumers

### Configuration
```json
{
  "cds": {
    "odata_v2": {
      "path": "/odata/v2"
    }
  }
}
```

---

## 2. WebSocket

Real-time bidirectional communication via WebSocket or Socket.IO.

### Installation
```sh
npm add @cap-js-community/websocket
```

### Service Definition
```cds
@protocol: 'websocket'
service ChatService {
  function message(text: String) returns String;
  event received { text: String; }
}
```

### Client Usage
```js
const socket = io('/chat')
socket.emit('message', { text: 'Hello' })
socket.on('received', msg => console.log(msg))
```

---

## 3. UI5 Dev Server

Integrates UI5 tooling into CDS development server.

### Installation
```sh
npm add @syg-de/cds-plugin-ui5
```

### Features
- Serves dynamic UI5 resources
- Auto-transpiles TypeScript
- Hot module replacement

---

## 4. GraphQL Adapter

Generates GraphQL schema from CDS models.

### Installation
```sh
npm add @cap-js/graphql
```

### Configuration
```json
{
  "cds": {
    "protocols": {
      "graphql": {
        "path": "/graphql",
        "impl": "@cap-js/graphql"
      }
    }
  }
}
```

### Service Definition
```cds
@protocol: 'graphql'
service CatalogService {
  entity Books { ... }
}
```

### Features
- Automatic schema generation
- Queries and mutations
- GraphQL Playground at `/graphql`

---

## 5. Attachments

Out-of-the-box file handling with malware scanning.

### Installation
```sh
npm add @cap-js/attachments
```

### Usage
```cds
using { Attachments } from '@cap-js/attachments';

entity Incidents {
  key ID : UUID;
  attachments : Composition of many Attachments;
}
```

### Features
- Upload/download via OData
- Malware scanning integration
- Automatic Fiori annotations
- Streaming (prevents memory overload)
- Multiple storage backends
- Multitenancy support

### Storage Backends
```json
{
  "cds": {
    "requires": {
      "attachments": {
        "[production]": { "kind": "sdm" },     // SAP Document Management
        "[development]": { "kind": "db" }      // Database (default)
      }
    }
  }
}
```

### Java
```xml
<dependency>
  <groupId>com.sap.cds</groupId>
  <artifactId>cds-feature-attachments</artifactId>
</dependency>
```

---

## 6. SAP Document Management (SDM)

Stores attachments in SAP Document Management Service.

### Installation
```sh
npm add @cap-js/sdm
```

### Features
- CMIS-compliant repository
- Automatic repository provisioning
- File operations (upload, view, download, delete, rename)
- Malware scanning
- Multitenancy handling

### Usage
```cds
using { Attachments } from '@cap-js/sdm';

extend my.Incidents with {
  attachments : Composition of many Attachments;
}
```

---

## 7. Audit Logging

Logs personal data access for GDPR compliance.

### Installation
```sh
npm add @cap-js/audit-logging
```

### Configuration
```json
{
  "cds": {
    "requires": {
      "audit-log": {
        "[production]": { "kind": "audit-log-service" },
        "[development]": { "kind": "console" }
      }
    }
  }
}
```

### Annotations
```cds
annotate my.Customers with @PersonalData: {
  EntitySemantics: 'DataSubject',
  DataSubjectRole: 'Customer'
} {
  ID @PersonalData.FieldSemantics: 'DataSubjectID';
  name @PersonalData.IsPotentiallyPersonal;
  email @PersonalData.IsPotentiallyPersonal;
  creditCard @PersonalData.IsPotentiallySensitive;
}
```

### Features
- Automatic logging on annotated entities
- Console logging (development)
- SAP Audit Log Service (production)
- Transactional outbox

---

## 8. Change Tracking

Captures and displays entity change history.

### Installation
```sh
npm add @cap-js/change-tracking
```

### Usage
```cds
annotate my.Incidents {
  customer @changelog: [customer.name];
  title @changelog;
  status @changelog;
}
```

### Features
- Automatic change capture
- Fiori timeline integration
- Association tracking
- Configurable fields

### Java
Built-in feature with documentation.

---

## 9. Notifications

Publishes business notifications in SAP Build WorkZone.

### Installation
```sh
npm add @cap-js/notifications
```

### Usage
```js
const alert = await cds.connect.to('notifications')

await alert.notify({
  recipients: [userId],
  title: 'New Incident Created',
  description: incident.title,
  priority: 'HIGH'
})
```

### Features
- CAP Services API
- Console logging (development)
- Transactional outbox
- Notification templates with i18n
- Automatic lifecycle management

---

## 10. Telemetry

OpenTelemetry instrumentation for observability.

### Installation
```sh
npm add @cap-js/telemetry
```

### Configuration
```json
{
  "cds": {
    "requires": {
      "telemetry": {
        "kind": "to-cloud-logging"
      }
    }
  }
}
```

### Export Targets
| Target | Description |
|--------|-------------|
| `to-console` | Development output |
| `to-cloud-logging` | SAP Cloud Logging |
| `to-dynatrace` | Dynatrace |
| `to-jaeger` | Jaeger (Node.js only) |

### Features
- Automatic span creation
- Request tracing
- Performance metrics

---

## 11. ORD (Open Resource Discovery)

Generates ORD documents for metadata discovery.

### Installation
```sh
npm add @cap-js/ord
```

### Use Cases
- Static metadata catalogs
- Runtime system landscape inspection
- Service Provider Interface

---

## 12. CAP Operator for Kubernetes

Automates multitenant CAP app lifecycle on K8s.

### Installation
```sh
npm add @cap-js/cap-operator-plugin
```

### Features
- Generates customizable Helm charts
- Reduces manual K8s configuration
- Multitenant support

---

## 13. SAP Cloud Application Event Hub

Consumes events from SAP S/4HANA Cloud.

### Installation
```sh
npm add @cap-js/event-broker
```

### Usage
```js
const S4Bupa = await cds.connect.to('API_BUSINESS_PARTNER')

S4Bupa.on('BusinessPartner.Changed', async msg => {
  const { BusinessPartner } = msg.data
  // Handle event
})
```

### Java
```xml
<dependency>
  <groupId>com.sap.cds</groupId>
  <artifactId>cds-feature-event-hub</artifactId>
</dependency>
```

---

## 14. SAP Integration Suite, Advanced Event Mesh

Integrates non-SAP systems into event-driven architecture.

### Installation
```sh
npm add @cap-js/advanced-event-mesh
```

### Use Case
Cross-platform event management for heterogeneous environments.

### Java
```xml
<dependency>
  <groupId>com.sap.cds</groupId>
  <artifactId>cds-feature-advanced-event-mesh</artifactId>
</dependency>
```

---

## 15. ABAP RFC

Imports and calls RFC-enabled function modules.

### Installation
```sh
npm add @sap/cds-rfc
```

### Use Case
Direct integration with ABAP systems via RFC.

---

## Database Plugins

| Plugin | Package | Purpose |
|--------|---------|---------|
| SQLite | `@cap-js/sqlite` | Development database |
| SAP HANA | `@cap-js/hana` | Production database |
| PostgreSQL | `@cap-js/postgres` | Alternative production |

---

## Creating Custom Plugins

### Plugin Structure
```
my-plugin/
├── package.json
├── cds-plugin.js
└── lib/
    └── handlers.js
```

### package.json
```json
{
  "name": "@my-org/cds-plugin-custom",
  "cds": {
    "plugin": true
  }
}
```

### cds-plugin.js
```js
const cds = require('@sap/cds')

// Bootstrap hook
cds.on('bootstrap', app => {
  app.use('/custom', require('./lib/handlers'))
})

// Served hook
cds.on('served', async () => {
  console.log('Plugin initialized')
})

// Add service
cds.on('loaded', model => {
  // Modify model
})
```

### Handler Registration
```js
// Register for specific services
cds.on('serving', 'CatalogService', srv => {
  srv.on('READ', 'Books', async (req, next) => {
    // Custom logic
    return next()
  })
})
```

---

## Plugin Configuration Patterns

### Profile-Based
```json
{
  "cds": {
    "requires": {
      "my-plugin": {
        "[development]": { "kind": "mock" },
        "[production]": { "kind": "real" }
      }
    }
  }
}
```

### Service Binding
Plugins auto-detect VCAP_SERVICES bindings.

### Manual Credentials
```json
{
  "cds": {
    "requires": {
      "my-plugin": {
        "credentials": {
          "url": "https://api.example.com",
          "apiKey": "..."
        }
      }
    }
  }
}
```

---

## Community Resources

- **CAP JS Community**: https://github.com/cap-js-community
- **Best of CAP JS**: https://bestofcapjs.org/
- **SAP Community**: https://community.sap.com/

## Support

1. Open issue in plugin's GitHub repository
2. Ask question in SAP Community
3. Open incident via SAP Support Portal (official plugins only)
