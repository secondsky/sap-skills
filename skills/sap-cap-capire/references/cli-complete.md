# CAP CLI - Complete Command Reference

**Source**: https://cap.cloud.sap/docs/cli/

## Table of Contents
- [Project Commands](#project-commands)
- [Build & Deploy Commands](#build--deploy-commands)
- [Development Commands](#development-commands)
- [Database Commands](#database-commands)
- [Service Commands](#service-commands)
- [Utility Commands](#utility-commands)
- [Configuration](#configuration)
- [Advanced Options](#advanced-options)

## Project Commands

### cds init
Create a new CAP project

```sh
# Basic project
cds init [project-name]

# With sample data and HANA support
cds init my-bookshop --add sample,hana

# With TypeScript
cds init my-project --add typescript

# With multiple features
cds init my-app --add sample,hana,xsuaa,mta,multitenancy
```

**Features Available**:
- `sample` - Add sample bookshop model
- `hana` - Add SAP HANA database support
- `sqlite` - Add SQLite for development
- `xsuaa` - Add authentication service
- `mta` - Add Multi-Target Application support
- `approuter` - Add approuter for HTML5 apps
- `multitenancy` - Add SaaS multitenancy support
- `typescript` - Add TypeScript support
- ` Fiori` - Add Fiori templates

### cds add
Add capabilities to existing project

```sh
# Add features to existing project
cds add hana
cds add xsuaa
cds add typescript
cds add multitenancy
cds add mta
cds add approuter

# Add multiple features
cds add hana,xsuaa,mta
```

## Build & Deploy Commands

### cds build
Build project for deployment

```sh
# Build all targets
cds build

# Build specific target
cds build --for hana
cds build --for production

# Clean build
cds build --clean
```

### cds deploy
Deploy database schema

```sh
# Deploy to configured database
cds deploy

# Deploy to HANA
cds deploy --to hana

# Deploy with auto-migration
cds deploy --to hana --auto-migrate

# Dry run (show SQL without executing)
cds deploy --to hana --dry
```

### cds compile
Compile CDS models

```sh
# Compile to CSN
cds compile db/schema.cds

# Compile to SQL
cds compile db/schema.cds --to sql

# Compile to EDMX (OData)
cds compile srv/cat-service.cds --to edmx

# Compile to YAML
cds compile db/schema.cds --to yaml

# Compile with flavor
cds compile srv/cat-service.cds --to edmx --flavor v4
```

## Development Commands

### cds watch
Start development server with live reload

```sh
# Start with default port
cds watch

# Start on specific port
cds watch --port 4004

# Start with HANA
cds watch --profile development,hana

# Start with in-memory database
cds watch --in-memory

# Start with custom profile
cds watch --profile my-profile
```

### cds serve
Start production server

```sh
# Start server
cds serve

# Serve specific service
cds serve all
cds serve CatalogService

# Serve with custom port
cds serve --port 4004
```

### cds run
Run custom scripts

```sh
# Run with custom entry point
cds run my-script.js

# Run with environment variables
cds run --env NODE_ENV=production
```

## Database Commands

### cds migrate
Run database migrations

```sh
# Run all pending migrations
cds migrate

# Migrate to HANA
cds migrate --to hana

# Dry run migration
cds migrate --to hana --dry
```

### cds load
Load initial data

```sh
# Load all CSV data
cds load

# Load specific CSV
cds load db/data/my.bookshop-Books.csv

# Load with CSV import options
cds load --delim ";" --quote '"'
```

### cds diff
Compare database schemas

```sh
# Compare model with database
cds diff

# Diff specific entity
cds diff Books

# Diff in SQL format
cds diff --to sql
```

## Service Commands

### cds bind
Bind external services

```sh
# Bind to external OData service
cds bind ExternalService --to https://api.example.com

# Bind with credentials
cds bind ExternalService --to-cred '{"url":"https://api.example.com"}'
```

### cds tunnel
Create tunnel to remote services

```sh
# Create tunnel
cds tunnel

# Tunnel to specific service
cds tunnel --to my-service
```

## Utility Commands

### cds env
Show configuration

```sh
# Show all environment
cds env

# Show specific setting
cds env get requires.db.kind

# Set environment variable
cds env set requires.db.kind hana

# Show effective configuration
cds env get --effective
```

### cds version
Show version information

```sh
# Show version
cds version

# Show detailed version info
cds version --full
```

### cds help
Show help information

```sh
# General help
cds help

# Help for specific command
cds help watch
cds help deploy
```

### cds repl
Interactive CAP shell

```sh
# Start REPL
cds repl

# REPL with preloaded entities
cds repl srv/cat-service
```

### cds plugins
Manage CLI plugins

```sh
# List installed plugins
cds plugins

# Install plugin
npm install -g @cap-js-community/odata-v2-adapter

# Show plugin help
cds help odata-v2
```

## Configuration

### Profiles
```sh
# Use specific profile
cds watch --profile production

# Use multiple profiles
cds watch --profile development,hana

# Set default profile in package.json
{
  "cds": {
    "profiles": {
      "development": {
        "requires": {
          "db": { "kind": "sqlite" }
        }
      },
      "production": {
        "requires": {
          "db": { "kind": "hana" }
        }
      }
    }
  }
}
```

### Environment Variables
```sh
# Set database URL
export CDS_requires_db_credentials_url=postgresql://user:pass@host:5432/db

# Set service bindings
export CDS_requires_myService_credentials='{"url":"https://api.example.com"}'

# Set profile
export NODE_ENV=production
export CDS_ENV=production

# Set custom properties
export CDS_custom_prop=value
```

### Configuration Files
```json
// .cdsrc.json
{
  "requires": {
    "db": {
      "kind": "sqlite",
      "credentials": {
        "url": ":memory:"
      }
    },
    "[production]": {
      "db": {
        "kind": "hana",
        "credentials": {
          "url": "hana-url"
        }
      }
    }
  },
  "build": {
    "target": "gen",
    "tasks": [{
      "for": "hana",
      "src": "db"
    }]
  }
}
```

## Advanced Options

### Watch Options
```sh
# Watch specific folders
cds watch --watch db srv

# Exclude files from watching
cds watch --exclude node_modules

# Live reload on changes
cds watch --livereload

# Open browser on start
cds watch --open
```

### Deploy Options
```sh
# Deploy with custom model
cds deploy db/schema.cds --to hana

# Deploy with auto-healing
cds deploy --to hana --auto-heal

# Deploy with cascading deletes
cds deploy --to hana --cascading

# Deploy in verbose mode
cds deploy --to hana --verbose
```

### Compile Options
```sh
# Compile with specific output format
cds compile db/schema.cds --to json --output model.json

# Compile with imports
cds compile db/schema.cds --to sql --with-imports

# Compile for specific flavor
cds compile srv/cat-service.cds --to edmx --flavor v4
```

### Build Options
```sh
# Build for production
cds build --production

# Build without minification
cds build --no-minify

# Build with inline sourcemaps
cds build --sourceMap

# Build for custom target
cds build --target ./dist
```

## Plugin Commands

### OData V2 Adapter
```sh
# Install V2 adapter
npm install -g @cap-js-community/odata-v2-adapter

# Run V2 adapter
cds odata-v2

# Run with custom port
cds odata-v2 --port 4005
```

### GraphQL Adapter
```sh
# Install GraphQL adapter
npm install @cap-js/graphql

# Run GraphQL server
cds watch --graphql

# GraphQL endpoint: http://localhost:4004/graphql
```

### Fiori Tools
```sh
# Install Fiori tools
npm install -g @sap/ux-ui5-tooling

# Generate Fiori app
cds watch --fiori

# Launch Fiori Preview
cds launch --open /preview
```

## Development Workflow Examples

### Initial Project Setup
```sh
# Create new project
cds init my-bookshop --add sample,hana

# Install dependencies
npm install

# Start development
cds watch
```

### Adding New Features
```sh
# Add authentication
cds add xsuaa

# Add multitenancy
cds add multitenancy

# Add TypeScript
cds add typescript

# Rebuild
npm run build
```

### Database Management
```sh
# Load initial data
cds load

# Deploy to HANA
cds deploy --to hana

# Check for differences
cds diff --to sql
```

### Deployment Preparation
```sh
# Build for production
cds build --production

# Create MTA archive
mbt build

# Deploy to Cloud Foundry
cf deploy mta_archives/my-app_1.0.0.mtar
```

## Troubleshooting

### Common Issues
```sh
# Clear build cache
rm -rf node_modules/.cache
cds build --clean

# Check configuration
cds env get --effective

# Test database connection
cds deploy --to hana --dry

# Check model compilation
cds compile db/schema.cds
```

### Debug Mode
```sh
# Enable debug logs
DEBUG=cds* cds watch

# Verbose output
cds deploy --to hana --verbose

# Show effective config
cds env get --effective
```

## Best Practices

### Development
- Use `cds watch` for development with live reload
- Use SQLite for local development
- Use profiles for different environments
- Keep models in `db/` and services in `srv/`

### Deployment
- Always run `cds build` before deployment
- Use `cds deploy --dry` to check SQL before execution
- Use MTA for Cloud Foundry deployment
- Include `cds build` in CI/CD pipeline

### Performance
- Use `cds compile --to sql` to review generated SQL
- Use `--no-minify` for debugging production builds
- Use `--cascading` carefully in production
- Monitor build times for large models

**Last Updated**: 2025-11-27
**CAP Version**: 9.4.x
**Documentation**: https://cap.cloud.sap/docs/cli/
