# Data Privacy & Security Reference

> Source: https://cap.cloud.sap/docs/guides/security/, https://cap.cloud.sap/docs/guides/data-privacy/

## Security Overview

CAP applications require security configuration for:
- Authentication (who is the user?)
- Authorization (what can they access?)
- Data protection (how is data secured?)

---

## Authentication

### XSUAA Integration

SAP Authorization and Trust Management Service (XSUAA).

```json
// package.json
{
  "cds": {
    "requires": {
      "auth": {
        "[production]": { "kind": "xsuaa" }
      }
    }
  }
}
```

### xs-security.json

```json
{
  "xsappname": "bookshop",
  "tenant-mode": "dedicated",
  "scopes": [
    { "name": "$XSAPPNAME.Admin", "description": "Admin access" },
    { "name": "$XSAPPNAME.User", "description": "User access" }
  ],
  "role-templates": [
    {
      "name": "Admin",
      "description": "Admin role",
      "scope-references": ["$XSAPPNAME.Admin"]
    },
    {
      "name": "User",
      "description": "User role",
      "scope-references": ["$XSAPPNAME.User"]
    }
  ]
}
```

### IAS Integration

SAP Cloud Identity Services.

```json
{
  "cds": {
    "requires": {
      "auth": {
        "[production]": { "kind": "ias" }
      }
    }
  }
}
```

### Mock Authentication (Development)

```json
{
  "cds": {
    "requires": {
      "auth": {
        "[development]": { "kind": "mocked", "users": {
          "alice": { "roles": ["Admin"] },
          "bob": { "roles": ["User"] }
        }}
      }
    }
  }
}
```

---

## Authorization

### @requires Annotation

Restrict service/entity access to users with specific roles.

```cds
@requires: 'Admin'
service AdminService { ... }

@requires: ['Admin', 'Manager']
entity SensitiveData { ... }

// Pseudo roles
@requires: 'authenticated-user'  // Any authenticated user
@requires: 'system-user'         // Technical users only
```

### @restrict Annotation

Fine-grained access control.

```cds
entity Orders @(restrict: [
  { grant: 'READ', to: 'User' },
  { grant: ['READ', 'WRITE'], to: 'Admin' },
  { grant: 'READ', where: 'buyer = $user' }
]) { ... }
```

### Grant Operations

| Operation | Description |
|-----------|-------------|
| `READ` | SELECT queries |
| `WRITE` | INSERT, UPDATE, DELETE |
| `CREATE` | INSERT only |
| `UPDATE` | UPDATE only |
| `DELETE` | DELETE only |
| `*` | All operations |

### Where Conditions

```cds
// User-specific data
{ grant: 'READ', where: 'createdBy = $user' }

// Attribute-based
{ grant: 'READ', where: 'country = $user.country' }

// Exists check
{ grant: 'READ', where: 'exists assignedUsers[user = $user]' }
```

### Pseudo Variables

| Variable | Description |
|----------|-------------|
| `$user` | Current user ID |
| `$user.<attr>` | User attribute |
| `$now` | Current timestamp |
| `$tenant` | Current tenant |

### Instance-Based Authorization

```cds
entity Projects @(restrict: [
  { grant: '*', to: 'Admin' },
  { grant: 'READ', where: 'members.user = $user' },
  { grant: 'WRITE', where: 'owner = $user' }
]) {
  key ID: UUID;
  owner: User;
  members: Association to many ProjectMembers;
}
```

---

## Data Privacy

### Overview

CAP supports GDPR compliance through:
- Right of Access (Personal Data Management)
- Right to be Forgotten (Data Retention Management)
- Transparency (Audit Logging)

### @PersonalData Annotations

#### Entity Semantics

```cds
// Data Subject - identifies a person
annotate Customers with @PersonalData: {
  EntitySemantics: 'DataSubject',
  DataSubjectRole: 'Customer'
};

// Data Subject Details - info about person, doesn't identify alone
annotate Addresses with @PersonalData: {
  EntitySemantics: 'DataSubjectDetails'
};

// Other - related data with personal info
annotate Orders with @PersonalData: {
  EntitySemantics: 'Other'
};
```

#### Field Annotations

```cds
annotate Customers with {
  // Required: identifies the data subject
  ID @PersonalData.FieldSemantics: 'DataSubjectID';

  // Personal information
  firstName @PersonalData.IsPotentiallyPersonal;
  lastName @PersonalData.IsPotentiallyPersonal;
  email @PersonalData.IsPotentiallyPersonal;
  phone @PersonalData.IsPotentiallyPersonal;
  dateOfBirth @PersonalData.IsPotentiallyPersonal;

  // Sensitive information (triggers access audits)
  creditCard @PersonalData.IsPotentiallySensitive;
  healthInfo @PersonalData.IsPotentiallySensitive;
}
```

### Complete Example

```cds
using { cuid, managed } from '@sap/cds/common';

entity Customers : cuid, managed {
  firstName   : String(100);
  lastName    : String(100);
  email       : String(255);
  phone       : String(50);
  dateOfBirth : Date;
  addresses   : Composition of many Addresses on addresses.customer = $self;
}

entity Addresses : cuid {
  customer : Association to Customers;
  street   : String(200);
  city     : String(100);
  country  : String(3);
  zip      : String(20);
}

// Privacy annotations
annotate Customers with @PersonalData: {
  EntitySemantics: 'DataSubject',
  DataSubjectRole: 'Customer'
} {
  ID @PersonalData.FieldSemantics: 'DataSubjectID';
  firstName @PersonalData.IsPotentiallyPersonal;
  lastName @PersonalData.IsPotentiallyPersonal;
  email @PersonalData.IsPotentiallyPersonal;
  phone @PersonalData.IsPotentiallyPersonal;
  dateOfBirth @PersonalData.IsPotentiallyPersonal;
}

annotate Addresses with @PersonalData: {
  EntitySemantics: 'DataSubjectDetails'
} {
  customer @PersonalData.FieldSemantics: 'DataSubjectID';
  street @PersonalData.IsPotentiallyPersonal;
  city @PersonalData.IsPotentiallyPersonal;
  zip @PersonalData.IsPotentiallyPersonal;
}
```

---

## Audit Logging

### Setup

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

### Automatic Logging

When entities are annotated with `@PersonalData`, CAP automatically logs:
- Read access to personal data
- Modifications to personal data
- Access to sensitive data

### Programmatic Audit Logging

```js
const audit = await cds.connect.to('audit-log')

// Log data access
await audit.log('dataAccess', {
  dataSubject: { type: 'Customer', id: { ID: customerId } },
  dataObject: { type: 'Customer' },
  attributes: ['firstName', 'lastName', 'email']
})

// Log data modification
await audit.log('dataModification', {
  dataSubject: { type: 'Customer', id: { ID: customerId } },
  dataObject: { type: 'Customer' },
  attributes: [
    { name: 'email', old: 'old@email.com', new: 'new@email.com' }
  ]
})
```

---

## Security Best Practices

### Service Exposure

```cds
// Only expose what's needed
service CatalogService {
  @readonly entity Books as projection on db.Books {
    ID, title, author, price  // Exclude internal fields
  };
}

// Separate admin service
@requires: 'Admin'
service AdminService {
  entity Books as projection on db.Books;
}
```

### Input Validation

```js
this.before('CREATE', 'Orders', req => {
  const { quantity, price } = req.data
  if (quantity <= 0) req.reject(400, 'Quantity must be positive')
  if (price < 0) req.reject(400, 'Price cannot be negative')
})
```

### SQL Injection Prevention

CAP automatically protects against SQL injection when using CQL.

```js
// Safe - parameterized
const books = await SELECT.from(Books).where({ author_ID: authorId })

// Safe - tagged template
const books = await SELECT.from(Books).where`author_ID = ${authorId}`

// Avoid string concatenation
// DON'T: `SELECT * FROM Books WHERE author_ID = '${authorId}'`
```

### CORS Configuration

```json
{
  "cds": {
    "server": {
      "cors": {
        "origin": ["https://myapp.example.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "credentials": true
      }
    }
  }
}
```

### Helmet Integration (Node.js)

```js
// server.js
const helmet = require('helmet')

cds.on('bootstrap', app => {
  app.use(helmet())
})
```

---

## Multitenancy Security

### Tenant Isolation

CAP automatically isolates tenant data:
- Each tenant has separate database schema/container
- JWT tokens contain tenant information
- Authorization is tenant-aware

### Cross-Tenant Access Prevention

```cds
// Automatic tenant filtering
entity TenantData @cds.autoexpose {
  key ID: UUID;
  // tenant column added automatically
}
```

### Tenant-Aware Services

```js
this.on('READ', 'Data', async req => {
  // req.tenant contains current tenant ID
  const tenant = req.tenant
  // CAP automatically filters by tenant
})
```

---

## Consuming Services Security

### Destination Configuration

```json
{
  "cds": {
    "requires": {
      "API_BUSINESS_PARTNER": {
        "kind": "odata-v2",
        "credentials": {
          "destination": "S4HANA",
          "path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER"
        }
      }
    }
  }
}
```

### Authentication Methods

| Method | Description |
|--------|-------------|
| Basic | Username/password |
| OAuth2ClientCredentials | M2M authentication |
| OAuth2UserTokenExchange | User token forwarding |
| OAuth2JWTBearer | JWT bearer assertion |
| PrincipalPropagation | SAP principal propagation |

### Token Forwarding

```json
{
  "credentials": {
    "destination": "S4HANA",
    "forwardAuthToken": true
  }
}
```
