# SAP CAP-Capire Skill

A comprehensive Claude Code skill for SAP Cloud Application Programming Model (CAP) development.

## Overview

This skill provides guidance for building enterprise-grade applications using SAP CAP framework. It covers the complete development lifecycle from project initialization to production deployment.

## When to Use This Skill

Use this skill when:

- **Creating CAP projects**: `cds init`, project structure, configuration
- **Defining data models**: CDS entity definitions, types, associations, compositions
- **Implementing services**: Service definitions, projections, actions, functions
- **Writing event handlers**: Before/on/after handlers, validation, business logic
- **Working with databases**: SQLite, SAP HANA, PostgreSQL configuration
- **Building Fiori UIs**: UI annotations, drafts, value helps, field control
- **Deploying applications**: Cloud Foundry, Kyma, MTA builds
- **Implementing security**: Authorization, authentication, XSUAA
- **Enabling multitenancy**: SaaS applications, MTX, tenant isolation
- **Using messaging**: Event emission, subscriptions, messaging services
- **Integrating plugins**: Attachments, audit logging, change tracking

## Keywords

### Core Technologies
- SAP CAP
- Cloud Application Programming Model
- CDS
- CDL (Conceptual Definition Language)
- CQL (Conceptual Query Language)
- CSN (Core Schema Notation)
- Capire

### Development
- cds init
- cds watch
- cds add
- cds deploy
- cds serve
- cds build
- cds-dk
- @sap/cds
- @sap/cds-dk
- Node.js CAP
- Java CAP
- TypeScript CAP
- cds-typer

### Data Modeling
- CDS entities
- CDS aspects
- CDS types
- managed associations
- compositions
- cuid
- managed aspect
- temporal data
- localized data
- @sap/cds/common

### Services
- CDS services
- service projections
- OData services
- REST services
- GraphQL CAP
- actions
- functions
- event handlers
- before handlers
- after handlers

### Databases
- SAP HANA
- SQLite
- PostgreSQL
- H2
- HDI container
- cds deploy
- database configuration
- @cap-js/sqlite
- @cap-js/hana
- @cap-js/postgres

### Fiori Integration
- Fiori Elements
- UI annotations
- @UI.LineItem
- @UI.HeaderInfo
- @UI.Facets
- @UI.FieldGroup
- draft handling
- @odata.draft.enabled
- value help
- field control

### Security
- @requires
- @restrict
- authorization
- authentication
- XSUAA
- xs-security.json
- roles
- grants

### Deployment
- Cloud Foundry
- CF deployment
- Kyma
- MTA
- mta.yaml
- cds up
- mbt build
- cf deploy
- approuter

### Multitenancy
- SaaS
- multitenancy
- MTX
- @sap/cds-mtxs
- tenant isolation
- subscription

### Messaging
- CAP messaging
- event emission
- srv.emit
- messaging service
- enterprise-messaging
- file-based-messaging
- Event Mesh

### Plugins
- @cap-js/attachments
- @cap-js/audit-logging
- @cap-js/change-tracking
- @cap-js/telemetry
- @cap-js/graphql
- OData V2 adapter

### Common Errors
- CDS compilation error
- OData error
- HANA deployment error
- Authorization error
- Draft error
- Validation error
- Service binding error

## Directory Structure

```
sap-cap-capire/
├── SKILL.md                        # Main skill file
├── README.md                       # This file
├── EXTRACTION_PROGRESS.md          # Documentation extraction tracking
├── references/
│   ├── cdl-syntax.md               # Complete CDL syntax reference
│   ├── cql-queries.md              # CQL query language reference
│   ├── annotations-reference.md    # All annotations reference
│   ├── event-handlers-nodejs.md    # Node.js handler patterns
│   ├── deployment-cf.md            # Cloud Foundry deployment
│   └── fiori-integration.md        # Fiori Elements integration
└── templates/
    ├── bookshop-schema.cds         # Data model template
    ├── catalog-service.cds         # Service definition template
    ├── service-handler.js          # Node.js handler template
    ├── service-handler.ts          # TypeScript handler template
    ├── fiori-annotations.cds       # Fiori annotations template
    └── package.json                # Project configuration template
```

## Documentation Links

- **CAP Documentation**: https://cap.cloud.sap/docs/
- **CAP GitHub**: https://github.com/cap-js/docs
- **SAP Samples**: https://github.com/SAP-samples/cloud-cap-samples
- **CDS Language**: https://cap.cloud.sap/docs/cds/
- **Node.js Runtime**: https://cap.cloud.sap/docs/node.js/
- **Java Runtime**: https://cap.cloud.sap/docs/java/
- **Plugins**: https://cap.cloud.sap/docs/plugins/

## Version Information

- **Skill Version**: 1.0.0
- **CAP Version**: @sap/cds 8.x
- **Last Verified**: 2025-11-22

## License

MIT
