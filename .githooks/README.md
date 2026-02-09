# Git Hooks

This directory contains custom git hooks for the sap-skills repository.

## Setup

After cloning the repository, enable the hooks:

```bash
git config core.hooksPath .githooks
```

## Available Hooks

### pre-commit

Validates JSON schema compliance before allowing commits.

**What it validates**:
- `.claude-plugin/marketplace.json` against marketplace schema
- All `plugin.json` files against plugin schema

**Requirements**:
- Node.js and npm installed
- ajv-cli: `npm install -g ajv-cli ajv-formats`

**Bypass** (not recommended):
```bash
git commit --no-verify
```

Note: Even if you bypass, CI will catch validation errors.

## Troubleshooting

**Hook not running**:
- Verify hooks path: `git config core.hooksPath`
- Check hook is executable: `ls -la .githooks/pre-commit`

**ajv-cli not found**:
```bash
npm install -g ajv-cli ajv-formats
```

**Permission denied**:
```bash
chmod +x .githooks/pre-commit
```
