# Cloud Foundry Deployment Reference

**Source**: https://cap.cloud.sap/docs/guides/deployment/to-cf

## Prerequisites

### Required Tools
```sh
# Install CAP development kit
npm i -g @sap/cds-dk

# Install Cloud MTA Build Tool
npm i -g mbt

# Cloud Foundry CLI
# Download from: https://github.com/cloudfoundry/cli/releases

# Install CF plugins
cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org
cf install-plugin -f multiapps
cf install-plugin -f html5-plugin
```

### BTP Requirements
- SAP BTP account with Cloud Foundry environment
- SAP HANA Cloud instance (provisioned and running)
- Space developer role in target space

## Project Preparation

### Add Production Capabilities
```sh
# Add SAP HANA support
cds add hana

# Add authentication
cds add xsuaa

# Add deployment descriptor
cds add mta

# Add application router (optional)
cds add approuter

# All at once
cds add hana,xsuaa,mta,approuter
```

### Generated Files

After `cds add hana,xsuaa,mta`:
```
project/
├── db/
│   └── src/                    # HANA artifacts
├── mta.yaml                    # Deployment descriptor
├── xs-security.json            # XSUAA config
└── package.json                # Updated with HANA config
```

## mta.yaml Structure

### Complete Example
```yaml
_schema-version: '3.1'
ID: bookshop
version: 1.0.0
description: Bookshop Application

parameters:
  enable-parallel-deployments: true

build-parameters:
  before-all:
    - builder: custom
      commands:
        - npm ci
        - npx cds build --production

modules:
  # CAP Server
  - name: bookshop-srv
    type: nodejs
    path: gen/srv
    parameters:
      buildpack: nodejs_buildpack
      memory: 256M
    build-parameters:
      builder: npm
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
      memory: 256M
    requires:
      - name: bookshop-db

  # App Router (optional)
  - name: bookshop-app
    type: approuter.nodejs
    path: app/router
    parameters:
      memory: 256M
      disk-quota: 256M
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
      config:
        xsappname: bookshop-${org}-${space}
        tenant-mode: dedicated
```

## xs-security.json

### Generated Configuration
```json
{
  "xsappname": "bookshop",
  "tenant-mode": "dedicated",
  "scopes": [
    {
      "name": "$XSAPPNAME.admin",
      "description": "Admin"
    }
  ],
  "role-templates": [
    {
      "name": "admin",
      "scope-references": ["$XSAPPNAME.admin"]
    }
  ],
  "oauth2-configuration": {
    "redirect-uris": [
      "https://*.cfapps.*.hana.ondemand.com/**"
    ]
  }
}
```

### Generate from CDS
```sh
cds compile srv --to xsuaa > xs-security.json
```

## Build Process

### Build for Production
```sh
# Clean and build
cds build --production

# Or with MTA build tool
mbt build
```

### Build Output
```
gen/
├── srv/                    # Server bundle
│   ├── package.json
│   └── srv/
└── db/                     # Database artifacts
    └── src/
        ├── .hdiconfig
        ├── schema.cds
        └── csv/
```

## Deployment

### Login to CF
```sh
cf login -a https://api.cf.<region>.hana.ondemand.com
# Select org and space

# Or with SSO
cf login --sso
```

### Deploy MTA
```sh
# Full deployment
cf deploy mta_archives/bookshop_1.0.0.mtar

# Or shortcut
cds up
```

### Incremental Deployment
```sh
# Deploy specific module
cf deploy mta_archives/bookshop_1.0.0.mtar -m bookshop-srv

# Skip unchanged modules
cf deploy --skip-unmodified
```

## Service Bindings

### Bind Services Manually
```sh
# Create HDI container
cf create-service hana hdi-shared bookshop-db

# Create XSUAA instance
cf create-service xsuaa application bookshop-auth -c xs-security.json

# Bind to app
cf bind-service bookshop-srv bookshop-db
cf bind-service bookshop-srv bookshop-auth
```

### Check Bindings
```sh
cf env bookshop-srv
```

## Environment Configuration

### Production package.json
```json
{
  "cds": {
    "requires": {
      "[production]": {
        "db": {
          "kind": "hana",
          "impl": "@cap-js/hana"
        },
        "auth": {
          "kind": "xsuaa"
        }
      }
    }
  }
}
```

### Profile Selection
```sh
# Automatic in Cloud Foundry
NODE_ENV=production

# Or explicit
cds.env=production cds serve
```

## App Router Configuration

### xs-app.json
```json
{
  "welcomeFile": "index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/api/(.*)$",
      "target": "$1",
      "destination": "srv-api",
      "authenticationType": "xsuaa"
    },
    {
      "source": "^(.*)$",
      "target": "$1",
      "service": "html5-apps-repo-rt",
      "authenticationType": "xsuaa"
    }
  ]
}
```

## Multitenancy Deployment

### Additional Configuration
```sh
cds add multitenancy
cds add mtx
```

### mta.yaml Additions
```yaml
modules:
  - name: bookshop-mtx
    type: nodejs
    path: mtx/sidecar
    requires:
      - name: bookshop-db
      - name: bookshop-auth
      - name: bookshop-registry
      - name: bookshop-sm

resources:
  - name: bookshop-registry
    type: org.cloudfoundry.managed-service
    parameters:
      service: saas-registry
      service-plan: application
      config:
        appName: bookshop
        xsappname: bookshop
        appUrls:
          getDependencies: ~{mtx-api/mtx-url}/-/cds/saas-provisioning/dependencies
          onSubscription: ~{mtx-api/mtx-url}/-/cds/saas-provisioning/tenant/{tenantId}
          onSubscriptionAsync: true
          onUnSubscriptionAsync: true
          callbackTimeoutMillis: 300000

  - name: bookshop-sm
    type: org.cloudfoundry.managed-service
    parameters:
      service: service-manager
      service-plan: container
```

## Troubleshooting

### View Logs
```sh
cf logs bookshop-srv --recent
cf logs bookshop-srv  # Stream
```

### Check App Status
```sh
cf apps
cf app bookshop-srv
```

### Restart App
```sh
cf restart bookshop-srv
cf restage bookshop-srv  # After env changes
```

### SSH into Container
```sh
cf ssh bookshop-srv
```

### Common Issues

**HANA Connection Failed**
```sh
# Check HDI container
cf service bookshop-db

# Check binding
cf env bookshop-srv | grep VCAP_SERVICES
```

**Authentication Errors**
```sh
# Regenerate xs-security.json
cds compile srv --to xsuaa > xs-security.json

# Update XSUAA instance
cf update-service bookshop-auth -c xs-security.json
```

**Memory Issues**
```yaml
# Increase in mta.yaml
parameters:
  memory: 512M
```

## CI/CD Integration

### Basic Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to CF

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npx mbt build

      - name: Deploy
        run: |
          cf login -a ${{ secrets.CF_API }} -u ${{ secrets.CF_USER }} -p ${{ secrets.CF_PASSWORD }} -o ${{ secrets.CF_ORG }} -s ${{ secrets.CF_SPACE }}
          cf deploy mta_archives/*.mtar -f
```
