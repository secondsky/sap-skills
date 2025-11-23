# CAP Tools Complete Reference

> Source: https://cap.cloud.sap/docs/tools/

## CDS Editors & IDEs

### SAP Business Application Studio (BAS)

Cloud-based IDE with pre-installed CAP tools:
- Create dev space with "Full Stack Cloud Application" type
- Includes CAP Tools, Java Tools, MTA Tools
- Trial dev spaces deleted after 30 days of inactivity

### Visual Studio Code

Install SAP CDS Language Support extension from marketplace.

**Recommended Extensions:**
- REST Client
- SQLite Viewer
- Rainbow CSV
- ESLint

### IntelliJ IDEA

SAP CDS Language Support plugin supports:
- Community Edition
- Ultimate Edition
- WebStorm

### Editor Features (LSP-Based)

| Feature | Description |
|---------|-------------|
| Syntax Coloring | Keywords, annotations, identifiers |
| Code Completion | Context-aware suggestions |
| Snippets | namespace, service, entity, etc. |
| Formatting | Document, selection, on-save, on-paste |
| Hover Info | Doc comments, @title/@description |
| Navigation | Go to definition, references |
| Quick Fixes | Auto-generate using statements |
| Translation | Properties, JSON, CSV support |

### VS Code Settings

| Setting | Default | Purpose |
|---------|---------|---------|
| Workspace Validation Mode | ActiveEditorOnly | Performance for large models |
| OData Support | On | Extended annotation support |
| Scan CSN | Off | Include compiled CSN files |
| Import Artifact Quickfix | Off | Auto-import proposals |

---

## CDS Command Line Interface

### Installation

```sh
npm i -g @sap/cds-dk
```

### Core Commands

```sh
# Project initialization
cds init <project>                    # Create new project
cds init --add java                   # Java project
cds add <facet>                       # Add capabilities

# Development
cds watch                             # Dev server with auto-reload
cds serve <service>                   # Serve specific service
cds run                               # Production server
cds repl                              # Interactive REPL

# Building
cds build                             # Build for deployment
cds build --production                # Production build
cds deploy                            # Deploy to database

# Compilation
cds compile <model>                   # Compile to CSN
cds compile <model> --to sql          # Generate SQL DDL
cds compile <model> --to edmx         # Generate OData EDMX
cds compile <model> --to yaml         # Output as YAML

# Import
cds import <api>                      # Import external API
cds import <api> --as cds             # Convert to CDS

# Other
cds env                               # Show configuration
cds version                           # Show versions
cds help                              # Show help
```

### cds add Facets

```sh
cds add hana                          # SAP HANA database
cds add xsuaa                         # Authentication
cds add approuter                     # App Router
cds add mta                           # MTA deployment
cds add cf-manifest                   # CF manifest
cds add kyma                          # Kyma/K8s deployment
cds add helm                          # Helm charts
cds add lint                          # ESLint configuration
cds add typer                         # TypeScript types
cds add typescript                    # TypeScript support
cds add multitenancy                  # Multitenancy
cds add extensibility                 # SaaS extensibility
cds add toggles                       # Feature toggles
cds add sample                        # Sample content
cds add data                          # Sample data
```

---

## CDS Lint

ESLint plugin for CDS model validation.

### Setup

```sh
cds add lint
```

### Running

```sh
cds lint                              # Run linting
DEBUG=lint cds lint                   # Show ESLint command
```

### Configuration

```json
{
  "rules": {
    "@sap/cds/valid-csv-header": ["warn", "show"],
    "@sap/cds/auth-no-empty-restrictions": "error"
  }
}
```

### Available Rules

| Rule | Description |
|------|-------------|
| `assoc2many-ambiguous-key` | Ambiguous keys in to-many |
| `auth-no-empty-restrictions` | Empty @restrict |
| `auth-restrict-grant-service` | Grant on services |
| `auth-use-requires` | Prefer @requires |
| `auth-valid-restrict-grant` | Valid grant values |
| `auth-valid-restrict-keys` | Valid restrict keys |
| `auth-valid-restrict-to` | Valid restrict.to |
| `auth-valid-restrict-where` | Valid restrict.where |
| `extension-restrictions` | Extension restrictions |
| `latest-cds-version` | CDS version check |
| `no-cross-service-import` | Cross-service imports |
| `no-db-keywords` | Database keywords |
| `no-dollar-prefixed-names` | Dollar-prefixed names |
| `no-java-keywords` | Java reserved words |
| `no-join-on-draft` | JOIN on draft entities |
| `no-shared-handler-variable` | Shared handler variables |
| `sql-cast-suggestion` | SQL cast suggestions |
| `sql-null-comparison` | NULL comparisons |
| `start-elements-lowercase` | Element naming |
| `start-entities-uppercase` | Entity naming |
| `valid-csv-header` | CSV header validation |

---

## CDS Typer

TypeScript type generation from CDS models.

### Setup

```sh
cds add typer
```

### Usage

```sh
# CLI generation
npx @cap-js/cds-typer "*" --outputDirectory @cds-models

# Auto-generation via VS Code
# Types generated on .cds file save
```

### Configuration (cds.env)

```json
{
  "typer": {
    "outputDirectory": "@cds-models"
  }
}
```

### Using Generated Types

```ts
import { Books } from '#cds-models/sap/capire/bookshop'

// In handlers
service.before('CREATE', Books, ({ data }) => {
  // data is typed as Books
})

// In queries
SELECT(Books, b => {
  b.author(a => a.ID.as('author_id'))
})
```

### Naming Control

```cds
@singular: 'Book'
@plural: 'Books'
entity my.Books { ... }
```

### Build Integration

```json
// package.json
{
  "scripts": {
    "build": "npx @cap-js/cds-typer '*' --outputDirectory @cds-models && cds build"
  }
}
```

Add `@cds-models` to `.gitignore`.

---

## CDS Source Formatter

### Installation

```sh
npm i -g @sap/cds-lsp
```

### Usage

```sh
format-cds --help                     # Show help
format-cds --init                     # Create config file
format-cds <paths>                    # Format files
format-cds -f <paths>                 # Force overwrite
```

### Configuration (.cdsprettier.json)

```json
{
  "alignAfterKey": true,
  "alignAnnotations": true,
  "alignPreAnnotations": true,
  "cqlKeywordCapitalization": "upper",
  "keepEmptyBracketsTogether": true,
  "tabSize": 2
}
```

---

## CAP Console

Native desktop app for CAP development.

### Features

- Auto-detects local CAP projects
- Real-time health metrics
- Dynamic log viewing
- Application controls (start/stop/restart)
- BTP deployment wizard
- Environment switching

### Plugin Installation

```sh
# Node.js
npm install @cap-js/console

# Java (srv/pom.xml)
<dependency>
  <groupId>com.sap.cds</groupId>
  <artifactId>cds-feature-console</artifactId>
</dependency>
```

### Limitations

- No microservices support
- No MTX support
- No Kyma support

---

## CAP Notebooks

Interactive CDS development in VS Code.

### File Format

`*.capnb` files with:
- REPL-style cells
- IPython-style magic commands
- Persistent code storage

### Commands

```
%quickref                             # Quick reference
%load <file>                          # Load CDS file
%run <query>                          # Execute CQL
```

---

## Compilation API (Node.js)

### cds.compile()

```js
// File-based (async)
let csn = await cds.compile(['db', 'srv'])
let csn = await cds.compile('*')

// In-memory (sync)
let csn = cds.compile('entity Foo {}')

// Options
let csn = await cds.compile('*', {
  flavor: 'inferred',     // 'parsed' | 'inferred'
  min: true,              // Minify output
  docs: true,             // Preserve comments
  locations: true,        // Keep $location
  messages: []            // Collect messages
})
```

### Output Processors

```js
// To various formats
cds.compile.to.json(csn)              // JSON
cds.compile.to.yaml(csn)              // YAML
cds.compile.to.cdl(csn)               // CDL source
cds.compile.to.sql(csn)               // SQL DDL
cds.compile.to.edmx(csn)              // OData EDMX
cds.compile.to.hana(csn)              // HANA artifacts
cds.compile.to.asyncapi(csn)          // AsyncAPI

// SQL dialects
cds.compile.to.sql(csn, { dialect: 'sqlite' })
cds.compile.to.sql(csn, { dialect: 'postgres' })
cds.compile.to.sql(csn, { dialect: 'h2' })
cds.compile.to.sql(csn, { dialect: 'hana' })
```

### Parsing APIs

```js
cds.parse.cdl('entity Foo {}')        // Parse CDL
cds.parse.cql('SELECT from Books')    // Parse CQL
cds.parse.expr('price > 100')         // Parse expression
```

### Utility Functions

```js
await cds.load(['db', 'srv'])         // Load and compile
cds.minify(csn)                       // Remove unused
cds.resolve('*')                      // Resolve paths
```

---

## Reflection API (Node.js)

### cds.linked() / cds.reflect()

```js
let linked = cds.linked(csn)
// or
let linked = cds.reflect(csn)
```

### LinkedCSN Methods

```js
// Access definitions
linked.definitions                    // All definitions
linked.services                       // Service definitions
linked.entities                       // Entity definitions

// Query definitions
linked.each('entity')                 // Iterator
linked.all('entity')                  // Array
linked.find('entity', e => e.name === 'Books')
linked.foreach('entity', e => console.log(e.name))
```

### Definition Classes

```js
// Type checking
def instanceof cds.entity
def instanceof cds.service
def instanceof cds.struct
def instanceof cds.Association

// Properties
def.name                              // Fully qualified name
def.kind                              // Definition kind
def.elements                          // Child elements
def.keys                              // Key elements
def.associations                      // Association elements
def.compositions                      // Composition elements
```

---

## Server Bootstrap (Node.js)

### cds.server()

```js
// Default server
module.exports = cds.server

// Custom server
module.exports = async (o) => {
  // Custom setup
  o.port = 3000
  return cds.server(o)
}
```

### Lifecycle Events

```js
cds.on('bootstrap', app => {
  // Add Express middleware
  app.use(myMiddleware)
})

cds.on('loaded', model => {
  // Model loaded
})

cds.on('serving', service => {
  // Before service served
})

cds.on('served', services => {
  // All services ready
})

cds.on('listening', server => {
  // HTTP server listening
})

cds.on('shutdown', () => {
  // Cleanup
})
```

### Configuration

```json
{
  "cds": {
    "server": {
      "cors": true,
      "index": true,
      "body_parser": {
        "limit": "100kb"
      }
    }
  }
}
```
