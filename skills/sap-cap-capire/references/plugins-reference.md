# CAP Plugins Reference

**Source**: https://cap.cloud.sap/docs/plugins/

## Available Plugins

### @cap-js Plugins (SAP Maintained)

| Plugin | Package | Purpose |
|--------|---------|---------|
| **Attachments** | `@cap-js/attachments` | File upload/download with malware scanning |
| **Audit Logging** | `@cap-js/audit-logging` | Track data access for personal data |
| **Change Tracking** | `@cap-js/change-tracking` | Automatic change history |
| **Telemetry** | `@cap-js/telemetry` | OpenTelemetry instrumentation |
| **GraphQL** | `@cap-js/graphql` | GraphQL adapter |
| **SQLite** | `@cap-js/sqlite` | SQLite database driver |
| **HANA** | `@cap-js/hana` | SAP HANA database driver |
| **PostgreSQL** | `@cap-js/postgres` | PostgreSQL database driver |

### Community Plugins

| Plugin | Package | Purpose |
|--------|---------|---------|
| **OData V2** | `@cap-js-community/odata-v2-adapter` | OData V2 protocol support |

## Attachments Plugin

### Installation
```sh
npm add @cap-js/attachments
```

### Usage
```cds
using { Attachments } from '@cap-js/attachments';

entity Products {
  key ID : UUID;
  name : String;
  attachments : Composition of many Attachments;
}
```

### Features
- File upload/download via OData
- Malware scanning (optional)
- Multiple storage backends (S3, Azure Blob, SDM)
- Streaming support

### Configuration
```json
{
  "cds": {
    "requires": {
      "attachments": {
        "[production]": {
          "kind": "sdm"
        }
      }
    }
  }
}
```

## Audit Logging Plugin

### Installation
```sh
npm add @cap-js/audit-logging
```

### Usage
```cds
using { PersonalData } from '@cap-js/audit-logging';

@PersonalData.EntitySemantics: #DataSubject
entity Customers {
  key ID : UUID;
  @PersonalData.IsPotentiallyPersonal
  name : String;
  @PersonalData.IsPotentiallySensitive
  email : String;
}
```

### Features
- Automatic logging of personal data access
- GDPR compliance support
- Transactional outbox for reliability
- Cloud and local logging

### Configuration
```json
{
  "cds": {
    "requires": {
      "audit-log": {
        "[production]": {
          "kind": "audit-log-to-console"
        }
      }
    }
  }
}
```

## Change Tracking Plugin

### Installation
```sh
npm add @cap-js/change-tracking
```

### Usage
```cds
using { changelog } from '@cap-js/change-tracking';

@changelog: [name, description]
entity Products : changelog {
  key ID : UUID;
  name : String;
  description : String;
  price : Decimal;
}
```

### Features
- Automatic change history capture
- UI integration with timeline view
- Configurable tracked fields
- Association tracking

### Configuration
```cds
// Track specific fields
@changelog: [name, price]
entity Products { ... }

// Track all fields
@changelog
entity Products { ... }
```

## Telemetry Plugin

### Installation
```sh
npm add @cap-js/telemetry
```

### Features
- OpenTelemetry instrumentation
- Automatic span creation
- Multiple exporters (Jaeger, Dynatrace, Cloud Logging)
- Request tracing

### Configuration
```json
{
  "cds": {
    "requires": {
      "telemetry": {
        "kind": "to-console"
      }
    }
  }
}
```

### Exporters
- `to-console` - Console output (development)
- `to-cloud-logging` - SAP BTP Cloud Logging
- `to-dynatrace` - Dynatrace
- `to-jaeger` - Jaeger

## GraphQL Plugin

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

### Usage
```cds
@protocol: 'graphql'
service CatalogService { ... }
```

### Features
- Automatic schema generation from CDS
- Query and mutation support
- Subscriptions (with websocket)
- GraphQL playground

## OData V2 Adapter

### Installation
```sh
npm add @cap-js-community/odata-v2-adapter
```

### Features
- Transparent V2 to V4 translation
- Legacy UI support
- Batch request handling

### Configuration
```json
{
  "cds": {
    "requires": {
      "odata_v2": {
        "impl": "@cap-js-community/odata-v2-adapter",
        "path": "/odata/v2"
      }
    }
  }
}
```

## Creating Custom Plugins

### Plugin Structure
```
my-plugin/
├── package.json
├── cds-plugin.js     # Plugin entry point
└── lib/
    └── handlers.js
```

### package.json
```json
{
  "name": "@my-org/cds-plugin-foo",
  "cds": {
    "plugin": true
  }
}
```

### cds-plugin.js
```js
const cds = require('@sap/cds');

cds.on('served', async () => {
  // Plugin initialization
  console.log('Plugin loaded');
});

// Register handlers
cds.on('bootstrap', (app) => {
  app.use('/custom', require('./lib/handlers'));
});
```

## Plugin Configuration Patterns

### Profile-Based
```json
{
  "cds": {
    "requires": {
      "my-plugin": {
        "[development]": {
          "kind": "mock"
        },
        "[production]": {
          "kind": "real"
        }
      }
    }
  }
}
```

### Service Binding
Plugins automatically detect VCAP_SERVICES bindings in Cloud Foundry/Kyma.

### Manual Configuration
```json
{
  "cds": {
    "requires": {
      "my-plugin": {
        "kind": "custom",
        "credentials": {
          "url": "https://api.example.com",
          "apiKey": "..."
        }
      }
    }
  }
}
```

## Plugin Best Practices

1. **Use cds-plugin technique** for automatic registration
2. **Provide mock implementations** for development
3. **Document annotations** clearly
4. **Handle errors gracefully** with proper status codes
5. **Use transactional outbox** for reliability
6. **Support both Node.js and Java** where possible
