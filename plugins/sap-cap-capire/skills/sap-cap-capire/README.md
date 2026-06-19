# SAP CAP-Capire Skill

A comprehensive AI coding assistant skill for SAP Cloud Application Programming Model (CAP) development.

## Capability Index

| Capability | Status |
|------------|--------|
| Commands | 5: `/cap-cds-reference`, `/cap-deployment-checklist`, `/cap-mcp-tools`, `/cap-setup-wizard`, `/cap-troubleshooter` |
| Agents | 4: `cap-cds-modeler`, `cap-performance-debugger`, `cap-project-architect`, `cap-service-developer` |
| Hooks | Yes: `hooks/hooks.json` |
| MCP | Yes: `.mcp.json` |
| LSP | Yes: `.lsp.json` |
| Source Freshness | `last_verified`: 2026-02-22; CAP MCP/LSP package freshness noted separately in audit report. |
| Verification | `npm run validate`; live CAP tenant/deployment checks pending unless project evidence exists. |

## LSP Usage By Harness

CAP LSP support requires a Node runtime and `@sap/cds-lsp` installed through an approved project-local devDependency, user-local npm prefix, or enterprise-managed toolchain, with `cds-lsp` available on PATH. The bundled launcher fixes Windows npm `.cmd` shim resolution without bundling or installing the SAP package.

- Claude Code: the installed plugin uses `.lsp.json` as its optional LSP activation file.
- Codex, OpenCode, editors, and other LSP-capable clients: configure the LSP command manually as `node <sap-cap-capire-plugin-root>/lsp/cds-lsp-launcher.mjs --stdio`.
- No LSP integration: use this Markdown skill, bundled references, `rg`, and CAP CLI checks directly.

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

### MCP Integration
- MCP
- Model Context Protocol
- @cap-js/mcp-server
- search_model
- search_docs
- CSN model search
- semantic documentation search
- AI-assisted CAP development
- model discovery
- CAP documentation query

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
├── SKILL.md                        # Main skill file (342 lines)
├── README.md                       # This file
├── references/                     # 22 comprehensive reference files
│   ├── annotations-reference.md    # UI annotations reference (10K lines)
│   ├── cdl-syntax.md               # Complete CDL syntax reference (503 lines)
│   ├── cql-queries.md              # CQL query language guide
│   ├── csn-cqn-cxn.md              # Core Schema Notation and query APIs
│   ├── data-privacy-security.md    # GDPR and security implementation
│   ├── databases.md                # Database configuration and deployment
│   ├── deployment-cf.md            # Cloud Foundry deployment details
│   ├── event-handlers-nodejs.md    # Node.js event handler patterns
│   ├── extensibility-multitenancy.md # SaaS multitenancy implementation
│   ├── fiori-integration.md        # Fiori Elements and UI integration
│   ├── java-runtime.md             # Java runtime support
│   ├── localization-temporal.md    # i18n and temporal data
│   ├── nodejs-runtime.md           # Node.js runtime reference
│   ├── plugins-reference.md        # CAP plugins and extensions
│   ├── tools-complete.md           # Complete CLI tools reference
│   ├── consuming-services-deployment.md # Service consumption patterns
│   ├── service-definitions.md      # Service definition patterns
│   ├── event-handlers-patterns.md  # Event handling patterns
│   ├── cql-patterns.md             # CQL usage patterns
│   ├── cli-complete.md             # Complete CLI reference
│   ├── mcp-integration.md          # MCP server setup and usage guide (new)
│   └── mcp-use-cases.md            # Illustrative MCP workflow scenarios (new)
└── templates/                      # 8 practical template files
    ├── bookshop-schema.cds         # Complete data model example
    ├── catalog-service.cds         # Service definition template
    ├── fiori-annotations.cds       # UI annotations example
    ├── mta.yaml                    # Multi-target application descriptor
    ├── package.json                # Project configuration template
    ├── service-handler.js          # Node.js handler template
    ├── service-handler.ts          # TypeScript handler template
    └── xs-security.json            # XSUAA security configuration
```

## Documentation Links

- **CAP Documentation**: [https://cap.cloud.sap/docs/](https://cap.cloud.sap/docs/)
- **CAP GitHub**: [https://github.com/cap-js/docs](https://github.com/cap-js/docs)
- **SAP Samples**: [https://github.com/SAP-samples/cloud-cap-samples](https://github.com/SAP-samples/cloud-cap-samples)
- **CDS Language**: [https://cap.cloud.sap/docs/cds/](https://cap.cloud.sap/docs/cds/)
- **Node.js Runtime**: [https://cap.cloud.sap/docs/node.js/](https://cap.cloud.sap/docs/node.js/)
- **Java Runtime**: [https://cap.cloud.sap/docs/java/](https://cap.cloud.sap/docs/java/)
- **Plugins**: [https://cap.cloud.sap/docs/plugins/](https://cap.cloud.sap/docs/plugins/)

## Version Information

- **Skill Version**: 2.1.0
- **CAP Version**: @sap/cds 9.4.x
- **MCP Version**: @cap-js/mcp-server 0.0.5
- **Last Verified**: 2026-02-22

## License

GPL-3.0
