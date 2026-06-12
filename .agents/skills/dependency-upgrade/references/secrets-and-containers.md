# Dev Environment Hardening: Secrets & Containers

Isolate dependency execution and protect sensitive data from supply chain attacks.

## Dev Containers

Running `npm install` on a host machine exposes the entire system to malicious packages. Dev containers limit blast radius.

### Basic Setup

Create `.devcontainer/devcontainer.json`:

```json
{
  "name": "Node.js Dev Container",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/1password:1": {}
  },
  "postCreateCommand": "npm ci",
  "customizations": {
    "vscode": {
      "extensions": ["dbaeumer.vscode-eslint"]
    }
  }
}
```

### Hardened Setup

```jsonc
{
  "name": "Node.js Hardened Dev Container",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "runArgs": [
    "--security-opt=no-new-privileges:true",
    "--cap-drop=ALL",
    "--cap-add=CHOWN",
    "--cap-add=SETUID",
    "--cap-add=SETGID"
  ],
  "containerEnv": {
    "NODE_OPTIONS": "--disable-proto=delete"
  },
  "postCreateCommand": "npm ci"
}
```

Security controls:
- `no-new-privileges:true` — prevents privilege escalation
- `--cap-drop=ALL` — drops all Linux capabilities
- Minimal capabilities added back: `CHOWN`, `SETUID`, `SETGID` (needed for npm)
- `--disable-proto=delete` — hardens JavaScript prototype chain

### What This Prevents

When a malicious package executes during `npm install`:
- **Without container**: Access to all files, SSH keys, env vars, other projects
- **With container**: Confined to container filesystem, no host access

## Secrets Management

### The Problem with .env Files

Plaintext secrets in `.env` files are accessible to any code running in the process:

```bash
# DANGEROUS — plaintext secrets
DATABASE_PASSWORD=my-secret-password
API_KEY=sk-1234567890abcdef
```

Supply chain attacks can read `process.env` or scan for `.env` files on the filesystem.

### 1Password CLI Integration

```bash
# Install 1Password CLI
brew install 1password-cli

# Use secret references in .env
DATABASE_PASSWORD=op://vault/database/password
API_KEY=op://vault/project/api-key

# Run with secret injection
op run -- npm start

# With explicit env file
op run --env-file="./.env" -- node --env-file="./.env" server.js
```

Secret references are resolved at runtime with additional authentication (Touch ID on macOS). The actual secret values never exist in files.

### Infisical Integration

```bash
# Install Infisical CLI
brew install infisical

# Use secret references
DATABASE_PASSWORD=infisical://project/env/api-key

# Run with secret injection
infisical run -- npm start
```

### Bun-Specific Notes

```bash
# Bun supports .env files natively
# Use with secret manager:
op run -- bun run dev

# Bun also supports --env-file flag
op run -- bun --env-file=./.env run dev
```

## Resources

- [Do Not Use Secrets in Environment Variables](https://www.nodejs-security.com/blog/do-not-use-secrets-in-environment-variables-and-here-is-how-to-do-it-better)
- [1Password Secrets Automation](https://developer.1password.com/docs/cli/get-started/)
- [Infisical Getting Started](https://infisical.com/blog/stop-using-env-files)
- [Dev Containers with 1Password for Node.js](https://www.nodejs-security.com/blog/mitigate-supply-chain-security-with-devcontainers-and-1password-for-nodejs-local-development)
