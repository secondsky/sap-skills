# Development Reference

Development patterns and best practices for SAP BTP applications.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/30-development

---

## Table of Contents

1. [Multi-Target Applications](#multi-target-applications)
2. [Application Router](#application-router)
3. [CAP Development](#cap-development)
4. [Service Bindings](#service-bindings)
5. [CI/CD Pipelines](#cicd-pipelines)
6. [Deployment Strategies](#deployment-strategies)

---

## Multi-Target Applications

### MTA Structure

```
my-app/
├── mta.yaml              # MTA descriptor
├── srv/                  # Backend service
│   ├── package.json
│   └── src/
├── app/                  # Frontend
│   └── webapp/
├── db/                   # Database artifacts
│   └── src/
└── xs-security.json      # Security config
```

### mta.yaml Template

```yaml
_schema-version: "3.1"
ID: my-app
version: 1.0.0
description: My SAP BTP Application

parameters:
  enable-parallel-deployments: true

build-parameters:
  before-all:
    - builder: custom
      commands:
        - npm install --production

modules:
  # Backend service
  - name: my-app-srv
    type: nodejs
    path: srv
    parameters:
      buildpack: nodejs_buildpack
      memory: 256M
    build-parameters:
      builder: npm
    requires:
      - name: my-app-db
      - name: my-app-auth
    provides:
      - name: srv-api
        properties:
          srv-url: ${default-url}

  # Database deployer
  - name: my-app-db-deployer
    type: hdb
    path: db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: my-app-db

  # UI module
  - name: my-app-ui
    type: html5
    path: app
    build-parameters:
      builder: custom
      commands:
        - npm run build
      supported-platforms: []

  # App Router
  - name: my-app-approuter
    type: approuter.nodejs
    path: approuter
    parameters:
      disk-quota: 256M
      memory: 256M
    requires:
      - name: my-app-auth
      - name: srv-api
        group: destinations
        properties:
          name: srv-api
          url: ~{srv-url}
          forwardAuthToken: true

resources:
  # HDI Container
  - name: my-app-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared

  # XSUAA
  - name: my-app-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
```

### Build and Deploy

```bash
# Build MTA archive
mbt build

# Deploy
cf deploy mta_archives/my-app_1.0.0.mtar

# Deploy with options
cf deploy my-app.mtar --strategy blue-green
```

---

## Application Router

### Purpose

- Single entry point for applications
- User authentication
- Static content serving
- URL routing to microservices
- Session management

### xs-app.json

```json
{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "sessionTimeout": 30,
  "routes": [
    {
      "source": "^/api/(.*)$",
      "target": "$1",
      "destination": "srv-api",
      "authenticationType": "xsuaa",
      "csrfProtection": true
    },
    {
      "source": "^/(.*)$",
      "target": "$1",
      "localDir": "webapp",
      "authenticationType": "xsuaa"
    }
  ]
}
```

### Authentication Types

| Type | Description |
|------|-------------|
| `xsuaa` | Require authentication |
| `none` | No authentication |
| `basic` | Basic auth (dev only) |

### Route Properties

| Property | Description |
|----------|-------------|
| `source` | Regex pattern for incoming URL |
| `target` | Rewritten path |
| `destination` | Destination name |
| `localDir` | Serve from local directory |
| `csrfProtection` | Enable CSRF tokens |
| `scope` | Required authorization scope |

### Environment Variables

```json
{
  "destinations": [
    {
      "name": "srv-api",
      "url": "https://my-srv.cfapps.eu10.hana.ondemand.com",
      "forwardAuthToken": true
    }
  ]
}
```

---

## CAP Development

### Project Setup

```bash
# Create new project
cds init my-project

# Add features
cds add hana
cds add xsuaa
cds add mta
```

### Service Definition (CDS)

```cds
// srv/catalog-service.cds
using { my.bookshop as my } from '../db/schema';

service CatalogService {
  @readonly entity Books as projection on my.Books;
  entity Orders as projection on my.Orders;
}
```

### Data Model

```cds
// db/schema.cds
namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  author : Association to Authors;
  stock  : Integer;
}

entity Authors {
  key ID : Integer;
  name   : String;
  books  : Association to many Books on books.author = $self;
}

entity Orders {
  key ID : UUID;
  book   : Association to Books;
  amount : Integer;
}
```

### Service Implementation

```javascript
// srv/catalog-service.js
module.exports = cds.service.impl(async function() {
  const { Books, Orders } = this.entities;

  this.before('CREATE', 'Orders', async (req) => {
    const { book_ID, amount } = req.data;
    const book = await SELECT.one.from(Books).where({ ID: book_ID });
    if (book.stock < amount) {
      req.error(409, 'Not enough stock');
    }
  });

  this.after('CREATE', 'Orders', async (order, req) => {
    await UPDATE(Books)
      .set({ stock: { '-=': order.amount } })
      .where({ ID: order.book_ID });
  });
});
```

### Running Locally

```bash
# Start with watch
cds watch

# With specific profile
cds watch --profile hybrid

# Deploy to database
cds deploy --to hana
```

---

## Service Bindings

### Accessing Bound Services

**Environment Variable (VCAP_SERVICES)**:
```javascript
const vcap = JSON.parse(process.env.VCAP_SERVICES);
const hanaCredentials = vcap.hana[0].credentials;
```

**Using @sap/xsenv**:
```javascript
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

const hanaCredentials = xsenv.serviceCredentials({ tag: 'hana' });
```

**Using CAP**:
```javascript
// Automatic binding via cds.requires in package.json
const db = await cds.connect.to('db');
```

### package.json (CAP)

```json
{
  "cds": {
    "requires": {
      "db": {
        "kind": "hana",
        "credentials": {
          "binding": "db"
        }
      },
      "auth": {
        "kind": "xsuaa"
      }
    }
  }
}
```

---

## CI/CD Pipelines

### SAP Continuous Integration and Delivery

Pipeline types:
1. Cloud Foundry - Fiori, CAP
2. SAP Fiori for ABAP Platform
3. SAP Integration Suite Artifacts

### Pipeline Configuration

```yaml
# .pipeline/config.yml
general:
  buildTool: mta
  mtaBuildTool: cloudMbt

stages:
  Build:
    npmExecuteBefore:
      dockerImage: 'node:18'

  Integration:
    credentials:
      cfCredentialsId: cf-credentials

  Release:
    cfSpace: prod
    cfCredentialsId: cf-credentials
```

### GitHub Actions Example

```yaml
name: Deploy to BTP

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build MTA
        run: npx mbt build

      - name: Deploy to CF
        env:
          CF_API: ${{ secrets.CF_API }}
          CF_USER: ${{ secrets.CF_USER }}
          CF_PASSWORD: ${{ secrets.CF_PASSWORD }}
        run: |
          cf login -a $CF_API -u $CF_USER -p $CF_PASSWORD -o $CF_ORG -s $CF_SPACE
          cf deploy mta_archives/*.mtar -f
```

---

## Deployment Strategies

### Rolling Deployment (Default)

Replace instances one by one:
```bash
cf push my-app
```

### Blue-Green Deployment

Zero-downtime with instant rollback:

```bash
# Deploy new version
cf push my-app-new -f manifest.yml

# Map production route
cf map-route my-app-new cfapps.eu10.hana.ondemand.com -n my-app

# Unmap from old
cf unmap-route my-app cfapps.eu10.hana.ondemand.com -n my-app

# Delete old version
cf delete my-app -f

# Rename
cf rename my-app-new my-app
```

**With MTA**:
```bash
cf deploy my-app.mtar --strategy blue-green
```

### Canary Deployment

Gradual traffic shift:
```bash
# Deploy canary with different route
cf push my-app-canary -f manifest-canary.yml

# Gradually shift traffic (manual or with load balancer)
```

---

## Related Documentation

- Development Guide: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/30-development
- CAP Documentation: https://cap.cloud.sap/docs/
- MTA Guide: https://help.sap.com/docs/btp/sap-business-technology-platform/multitarget-applications
