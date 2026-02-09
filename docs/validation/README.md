# Validation Documentation

This directory contains documentation for the sap-skills validation systems.

## Available Documentation

### [JSON Schema Validation](./json-schema-validation.md)

Complete guide to JSON schema validation for marketplace.json and plugin.json files.

**Quick Links**:
- [Setup Instructions](./json-schema-validation.md#setup)
- [Running Validation](./json-schema-validation.md#running-validation)
- [Common Errors](./json-schema-validation.md#common-validation-errors)
- [Troubleshooting](./json-schema-validation.md#troubleshooting)

## Quick Start

### 1. Install Dependencies

```bash
npm install -g ajv-cli ajv-formats
```

### 2. Enable Git Hooks

```bash
git config core.hooksPath .githooks
```

### 3. Run Validation

```bash
./scripts/validate-json-schemas.sh
```

## Validation Layers

| Layer | When | Blocks | Purpose |
|-------|------|--------|---------|
| **Pre-commit Hook** | Before commit | ✅ Yes | Catch errors immediately |
| **CI/CD Pipeline** | On push/PR | ✅ Yes | Safety net for bypassed hooks |

## Files Validated

- `.claude-plugin/marketplace.json` - Central marketplace registry
- `plugins/*/skills/*/.claude-plugin/plugin.json` - Individual plugin manifests

## Key Validations

### marketplace.json
- ✅ Required fields present
- ✅ GitHub noreply email format
- ✅ Source paths: `./plugins/{name}` (not `./`)
- ✅ License: GPL-3.0
- ✅ Category from allowed enum
- ✅ Version consistency

### plugin.json
- ✅ Name in kebab-case (required)
- ✅ All other fields optional
- ✅ Paths start with `./`
- ✅ Additional properties allowed

## Get Help

- **Validation errors**: See [Common Errors](./json-schema-validation.md#common-validation-errors)
- **Hook issues**: See [Troubleshooting](./json-schema-validation.md#troubleshooting)
- **CI failures**: Check GitHub Actions → "Validate JSON Schemas" job
- **Questions**: Open issue at https://github.com/secondsky/sap-skills/issues
