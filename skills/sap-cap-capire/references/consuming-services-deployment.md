# Consuming Services & Deployment Reference

> Source: https://cap.cloud.sap/docs/guides/using-services, https://cap.cloud.sap/docs/guides/deployment/

## Consuming External Services

CAP enables consumption of remote services through uniform APIs.

### Import External APIs

```sh
# Download from SAP Business Accelerator Hub or export from CAP
cds import <file> --as cds

# Supported formats
cds import api.edmx --as cds          # OData V2/V4
cds import api.json --as cds          # OpenAPI
cds import events.json --as cds       # AsyncAPI
```

Files are placed in `srv/external/`.

### Local Mocking

```sh
# Add mock data
srv/external/data/API_BUSINESS_PARTNER-A_BusinessPartner.csv

# Run with mocking (no HTTP)
cds watch

# Run with mock service (realistic OData)
cds mock API_BUSINESS_PARTNER
```

### Querying Remote Services

**Node.js:**
```js
const bupa = await cds.connect.to('API_BUSINESS_PARTNER')

// Simple query
const partners = await bupa.run(
  SELECT.from('A_BusinessPartner').limit(100)
)

// With filter
const filtered = await bupa.run(
  SELECT.from('A_BusinessPartner')
    .where({ BusinessPartnerCategory: '1' })
)
```

**Java:**
```java
@Autowired
CqnService bupa;

public List<Row> getPartners() {
    return bupa.run(Select.from("A_BusinessPartner").limit(100))
               .listOf(Row.class);
}
```

### Building Mashups

**Expose Remote Entities:**
```cds
using { API_BUSINESS_PARTNER as bupa } from './external/API_BUSINESS_PARTNER';

service MyService {
  // Projection on remote entity
  entity BusinessPartners as projection on bupa.A_BusinessPartner {
    BusinessPartner,
    BusinessPartnerFullName,
    BusinessPartnerCategory
  };
}
```

**Associate Local to Remote:**
```cds
entity Orders {
  key ID : UUID;
  customer : Association to bupa.A_BusinessPartner;
}
```

**Custom Handler for Navigation:**
```js
this.on('READ', 'Orders', async (req, next) => {
  const orders = await next()

  // Fetch customer data from remote
  const bupa = await cds.connect.to('API_BUSINESS_PARTNER')
  for (const order of orders) {
    if (order.customer_BusinessPartner) {
      order.customer = await bupa.run(
        SELECT.one.from('A_BusinessPartner')
          .where({ BusinessPartner: order.customer_BusinessPartner })
      )
    }
  }
  return orders
})
```

### Destination Configuration

**package.json:**
```json
{
  "cds": {
    "requires": {
      "API_BUSINESS_PARTNER": {
        "kind": "odata-v2",
        "[production]": {
          "credentials": {
            "destination": "S4HANA",
            "path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER"
          }
        }
      }
    }
  }
}
```

**Authentication Methods:**
| Method | Use Case |
|--------|----------|
| Basic | Username/password |
| OAuth2ClientCredentials | Machine-to-machine |
| OAuth2UserTokenExchange | User context propagation |
| PrincipalPropagation | SAP Cloud Connector |

---

## Cloud Foundry Deployment

### Prerequisites

```sh
# Install MTA build tool
npm i -g mbt

# Install CF CLI plugin
cf install-plugin multiapps
```

### Setup

```sh
cds add mta              # Generate mta.yaml
cds add xsuaa            # Add authentication
cds add hana             # Add HANA database
cds add approuter        # Add App Router
```

### Build & Deploy

```sh
# Build MTA archive
mbt build

# Deploy to CF
cf deploy mta_archives/*.mtar
```

### mta.yaml Structure

```yaml
_schema-version: "3.1"
ID: bookshop
version: 1.0.0

parameters:
  enable-parallel-deployments: true

modules:
  # CAP Service Module
  - name: bookshop-srv
    type: nodejs
    path: gen/srv
    parameters:
      memory: 256M
      disk-quota: 1024M
    requires:
      - name: bookshop-db
      - name: bookshop-auth
    provides:
      - name: srv-api
        properties:
          srv-url: ${default-url}

  # Database Deployer
  - name: bookshop-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: bookshop-db

  # App Router
  - name: bookshop-app
    type: approuter.nodejs
    path: app
    parameters:
      memory: 256M
    requires:
      - name: srv-api
        group: destinations
        properties:
          name: srv-api
          url: ~{srv-url}
          forwardAuthToken: true
      - name: bookshop-auth

resources:
  # HDI Container
  - name: bookshop-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared

  # XSUAA
  - name: bookshop-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
```

### xs-security.json

```json
{
  "xsappname": "bookshop",
  "tenant-mode": "dedicated",
  "scopes": [
    { "name": "$XSAPPNAME.Admin", "description": "Admin" }
  ],
  "role-templates": [
    {
      "name": "Admin",
      "scope-references": ["$XSAPPNAME.Admin"]
    }
  ]
}
```

---

## Kyma/Kubernetes Deployment

### Prerequisites

- Kyma-enabled BTP account
- kubectl, helm, pack CLI tools
- Container registry access
- HANA Cloud instance

### Setup

```sh
cds add hana
cds add xsuaa
cds add kyma
```

### Deploy

```sh
cds up --to k8s -n <namespace>
```

### Helm Chart Structure

```
chart/
├── Chart.yaml
├── values.yaml
├── values.schema.json
└── templates/
```

### values.yaml

```yaml
global:
  imagePullSecret:
    name: docker-registry
  domain: <cluster-domain>
  image:
    registry: <registry>

srv:
  image:
    repository: bookshop-srv
    tag: latest
  bindings:
    db:
      serviceInstanceName: bookshop-db
    auth:
      serviceInstanceName: bookshop-auth
  resources:
    limits:
      memory: 512Mi
      cpu: 500m
  env:
    NODE_ENV: production

db-deployer:
  image:
    repository: bookshop-db-deployer
  bindings:
    db:
      serviceInstanceName: bookshop-db
```

### Service Bindings

```yaml
# Using service instance
bindings:
  db:
    serviceInstanceName: bookshop-db

# Using existing secret
bindings:
  db:
    fromSecret: my-db-secret
```

### Backend Destinations

```yaml
srv:
  backendDestinations:
    srv-api:
      service: srv
    ui5:
      external: true
      url: https://ui5.sap.com
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy to CF

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build MTA
        run: |
          npm i -g mbt
          mbt build

      - name: Deploy to CF
        env:
          CF_API: ${{ secrets.CF_API }}
          CF_USER: ${{ secrets.CF_USER }}
          CF_PASSWORD: ${{ secrets.CF_PASSWORD }}
          CF_ORG: ${{ secrets.CF_ORG }}
          CF_SPACE: ${{ secrets.CF_SPACE }}
        run: |
          cf login -a $CF_API -u $CF_USER -p $CF_PASSWORD -o $CF_ORG -s $CF_SPACE
          cf deploy mta_archives/*.mtar -f
```

### GitLab CI

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm i -g mbt
    - mbt build
  artifacts:
    paths:
      - mta_archives/

deploy:
  stage: deploy
  image: ppiper/cf-cli
  script:
    - cf login -a $CF_API -u $CF_USER -p $CF_PASSWORD -o $CF_ORG -s $CF_SPACE
    - cf deploy mta_archives/*.mtar -f
```

---

## Health Checks

### Configuration

```json
{
  "cds": {
    "server": {
      "health": {
        "path": "/-/health",
        "timeout": 5000
      }
    }
  }
}
```

### Kubernetes Probes

```yaml
srv:
  health:
    liveness:
      path: /-/health
      initialDelaySeconds: 30
      periodSeconds: 10
    readiness:
      path: /-/health
      initialDelaySeconds: 5
      periodSeconds: 5
```

---

## Multitenancy Deployment

### Setup

```sh
cds add multitenancy
cds add extensibility
```

### mta.yaml Additions

```yaml
resources:
  - name: bookshop-registry
    type: org.cloudfoundry.managed-service
    parameters:
      service: saas-registry
      service-plan: application
      config:
        xsappname: bookshop
        appUrls:
          getDependencies: ~{srv-api/srv-url}/-/cds/saas-provisioning/dependencies
          onSubscription: ~{srv-api/srv-url}/-/cds/saas-provisioning/tenant/{tenantId}

  - name: bookshop-sm
    type: org.cloudfoundry.managed-service
    parameters:
      service: service-manager
      service-plan: container
```

### Tenant Provisioning

CAP automatically handles:
- Database schema creation per tenant
- Service binding per tenant
- Tenant isolation

---

## SAP Event Mesh Integration

### Configuration

```json
{
  "cds": {
    "requires": {
      "messaging": {
        "[production]": {
          "kind": "enterprise-messaging"
        }
      }
    }
  }
}
```

### mta.yaml

```yaml
resources:
  - name: bookshop-messaging
    type: org.cloudfoundry.managed-service
    parameters:
      service: enterprise-messaging
      service-plan: default
```

### Namespace Prefixing

```json
{
  "cds": {
    "requires": {
      "messaging": {
        "publishPrefix": "$namespace/",
        "subscribePrefix": "$namespace/"
      }
    }
  }
}
```

---

## Hybrid Testing

Test with cloud services locally.

### Setup

```sh
# Bind to cloud services (creates .cdsrc-private.json with credentials)
cds bind --to bookshop-db
cds bind --to bookshop-auth

# Run with hybrid profile
cds watch --profile hybrid
```

### default-env.json

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "credentials": {
        "host": "...",
        "port": "...",
        "user": "...",
        "password": "..."
      }
    }]
  }
}
```

Add `default-env.json` to `.gitignore`.
