# JSON Schema Validation

This document describes the JSON schema validation system for marketplace.json and plugin.json files.

## Overview

The sap-skills repository uses JSON Schema validation to ensure all marketplace and plugin manifests follow the correct structure and patterns. Validation occurs at two levels:

1. **Local Git Hooks** - Validates changes before commit (pre-commit hook)
2. **CI/CD Pipeline** - Validates all PRs and pushes to main branch (GitHub Actions)

## Setup

### Prerequisites

```bash
# Install Node.js (required for ajv-cli)
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm
# Windows: Download from https://nodejs.org

# Install ajv-cli globally
npm install -g ajv-cli ajv-formats
```

### Enable Git Hooks

After cloning the repository, enable the custom git hooks:

```bash
git config core.hooksPath .githooks
```

This configures git to use the hooks in `.githooks/` directory.

## Validation Schemas

### marketplace.json Schema

Location: `schemas/marketplace.schema.json`

**Required fields**:
- `name` - Marketplace name (kebab-case)
- `version` - Semantic version (MAJOR.MINOR.PATCH)
- `description` - Marketplace description (10-500 chars)
- `repository` - GitHub repository URL (HTTPS only)
- `metadata` - Marketplace metadata object
  - `version` - Must match top-level version
  - `last_updated` - ISO 8601 date (YYYY-MM-DD)
  - `total_skills` - Total number of plugins
  - `categories` - Array of category strings
- `plugins` - Array of plugin objects

**Plugin object fields**:
- `name` - Plugin name (kebab-case)
- `source` - Plugin path (must be `./plugins/{plugin-name}`)
- `description` - Full plugin description (50-5000 chars)
- `version` - Semantic version (must match metadata.version)
- `category` - Single category from allowed enum
- `keywords` - Array of lowercase search keywords (3-50)
- `license` - Must be "GPL-3.0"

**Key validations**:
- ✅ GitHub noreply email format: `{user_id}+{username}@users.noreply.github.com`
- ✅ Standard email format also supported
- ✅ Source path must be `./plugins/{plugin-name}` (prevents cache bloat)
- ✅ Category enum: abap, ai, btp, cap, data-analytics, hana, tooling, ui-development
- ✅ Version consistency between top-level and metadata

### plugin.json Schema

Location: `schemas/plugin.schema.json`

**Required fields**:
- `name` - Plugin name (kebab-case)

**Optional fields** (official Claude Code spec):
- `version` - Semantic version
- `description` - Plugin description
- `author` - Author object or string
- `homepage` - Plugin homepage URL
- `repository` - Repository URL or object
- `license` - SPDX license identifier
- `keywords` - Search keywords array
- `category` - Primary category
- `commands` - Custom command paths
- `agents` - Custom agent paths
- `hooks` - Custom hooks.json path
- `mcpServers` - Custom .mcp.json path

**Key validations**:
- ✅ Name must be kebab-case (official Claude Code requirement)
- ✅ All paths must be relative with `./` prefix
- ✅ Author supports both object and string formats (npm convention)
- ✅ Repository supports both URL and object formats
- ✅ Additional properties allowed (Claude Code compatible)

## Running Validation

### Manual Validation

```bash
# Validate all JSON files
./scripts/validate-json-schemas.sh

# Validate just marketplace.json
npm run validate:marketplace

# Validate just plugin.json files
npm run validate:plugins
```

### Pre-Commit Hook

The pre-commit hook automatically runs when you commit changes to JSON files:

```bash
git add .claude-plugin/marketplace.json
git commit -m "fix: update marketplace metadata"

# If validation fails, the commit will be blocked
# Fix the errors and try again

# To bypass (not recommended):
git commit --no-verify -m "bypass validation"
```

**Note**: Even if you bypass the hook, CI will catch validation errors.

### CI/CD Pipeline

GitHub Actions automatically validates JSON files on:
- Every push to main branch
- Every pull request to main branch

Check the "Validate JSON Schemas" job in the Actions tab.

## Common Validation Errors

### marketplace.json Errors

#### Invalid source path
```
Error: data/plugins/0/source must match pattern "^\\./plugins/[a-z][a-z0-9]*(-[a-z0-9]+)*$"
```

**Fix**: Change `"source": "./"` to `"source": "./plugins/{plugin-name}"`

#### Invalid email format
```
Error: data/owner/email must match anyOf schema
```

**Fix**: Use GitHub noreply format: `{user_id}+{username}@users.noreply.github.com`

#### Version mismatch
```
Error: metadata.version must match top-level version
```

**Fix**: Ensure both versions are identical (without pre-release tags)

#### Invalid category
```
Error: data/plugins/0/category must be equal to one of the allowed values
```

**Fix**: Use one of: abap, ai, btp, cap, data-analytics, hana, tooling, ui-development

### plugin.json Errors

#### Invalid name format
```
Error: data/name must match pattern "^[a-z][a-z0-9]*(-[a-z0-9]+)*$"
```

**Fix**: Use kebab-case: `sap-cap-capire` (lowercase, hyphens only)

#### Missing required field
```
Error: data must have required property 'name'
```

**Fix**: Add the required `name` field to plugin.json

## Testing Validation

### Test with valid changes

```bash
# Make valid change
vim .claude-plugin/marketplace.json

# Commit should succeed
git add .claude-plugin/marketplace.json
git commit -m "test: valid change"
# ✅ Pre-commit validation passed
```

### Test with invalid changes

```bash
# Introduce error (e.g., invalid email)
vim .claude-plugin/marketplace.json
# Change email to: "email": "invalid@email"

# Commit should fail
git add .claude-plugin/marketplace.json
git commit -m "test: invalid change"
# ❌ Pre-commit validation failed
# Error: data/owner/email must match anyOf schema

# Fix the error
vim .claude-plugin/marketplace.json
# Change back to valid email

# Commit should now succeed
git add .claude-plugin/marketplace.json
git commit -m "fix: correct email format"
# ✅ Pre-commit validation passed
```

## Troubleshooting

### Hook not running

**Problem**: Pre-commit hook doesn't execute

**Solutions**:
1. Verify hooks path: `git config core.hooksPath`
2. Check hook is executable: `ls -la .githooks/pre-commit`
3. Make executable: `chmod +x .githooks/pre-commit`

### ajv-cli not found

**Problem**: `ajv: command not found`

**Solution**:
```bash
npm install -g ajv-cli ajv-formats
```

### Validation passes locally but fails in CI

**Problem**: Hook bypassed with `--no-verify`

**Solution**: CI always validates, so fix the errors reported by CI and push again

### Permission denied errors

**Problem**: Cannot execute validation script

**Solution**:
```bash
chmod +x scripts/validate-json-schemas.sh
chmod +x .githooks/pre-commit
```

## Benefits

### Local Git Hooks (First Line of Defense)
- **Instant feedback** - Errors in seconds, not minutes
- **Prevents invalid commits** - Bad data never enters Git history
- **Educates developers** - Clear error messages teach correct patterns
- **No waiting** - No need to wait for CI to catch issues

### CI/CD Pipeline (Safety Net)
- **Prevents errors** - Invalid data caught automatically
- **Catches hook bypasses** - Ensures nothing slips through
- **Enforces consistency** - All 32 plugins follow same structure
- **Blocks merges** - Invalid PRs cannot be merged

### Overall System Benefits
- **Maintainable** - JSON Schema is declarative and easy to update
- **Self-documenting** - Schemas serve as structure documentation
- **Aligned with spec** - Based on official Claude Code standards
- **Fast feedback** - Local (seconds) → CI (minutes) → Review
- **Zero false positives** - Strict schemas prevent ambiguity

## Schema Maintenance

### Updating Schemas

When updating validation rules:

1. **Edit schema files**:
   - `schemas/marketplace.schema.json`
   - `schemas/plugin.schema.json`

2. **Test changes**:
   ```bash
   ./scripts/validate-json-schemas.sh
   ```

3. **Document changes**:
   - Update this README
   - Update error examples if needed

4. **Commit and push**:
   ```bash
   git add schemas/
   git commit -m "feat: update JSON schema validation rules"
   git push
   ```

### Adding New Validations

To add new validation rules:

1. Identify the validation requirement
2. Update the appropriate schema file
3. Add pattern, enum, or format constraint
4. Test with valid and invalid data
5. Document the new validation in this README

## Further Reading

- [JSON Schema Documentation](https://json-schema.org/)
- [ajv-cli Documentation](https://github.com/ajv-validator/ajv-cli)
- [Claude Code Plugin Spec](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)
- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
