# Supply Chain Security Reference

Comprehensive guide to preventing supply chain attacks during dependency installation and upgrades.

## Threat Landscape

Recent supply chain incidents demonstrate why hardening dependency workflows is critical:

| Incident | Year | Attack Vector | Impact |
|----------|------|---------------|--------|
| event-stream | 2018 | Malicious maintainer | Stole Bitcoin wallets |
| eslint-scope | 2018 | Stolen credentials | Published malicious versions |
| ua-parser-js | 2021 | Account takeover | Cryptomining + credential theft |
| node-ipc | 2022 | Protestware | Deleted files on Russian IPs |
| colors/faker | 2022 | Maintainer sabotage | Infinite loop DOS |
| Shai-Hulud | 2024 | Postinstall worm | Propagated via lifecycle scripts |
| Nx | 2025 | Compromised postinstall | Weaponized AI coding agents |

## Security Principles

### 1. Trust Nothing by Default

Every package — direct or transitive — is a potential attack vector. Configure package managers to block unsafe behavior and only allow what is explicitly reviewed.

### 2. Delay Before Installing

Newly published packages may contain malicious code discovered within hours or days. A cooldown period lets the community catch threats before they reach production.

### 3. Freeze and Validate

Lockfiles are the contract between development and production. Protect them from injection and validate their integrity in CI.

### 4. Minimize Attack Surface

Fewer dependencies = fewer potential vulnerabilities. Each transitive dependency inherits all risks of its own dependency tree.

### 5. Audit Before Trusting

Don't rely solely on npmjs.org — the displayed source code can differ from the actual tarball. Use security tools to audit packages before installation.

## Disabling Post-Install Scripts

Post-install scripts are the most common supply chain attack vector. They execute arbitrary code during `npm install` with full system access.

### npm

```bash
# Global config (recommended — applies to all projects)
npm config set ignore-scripts true
npm config set allow-git none

# Per-command
npm install --ignore-scripts --allow-git=none <package>

# .npmrc file
ignore-scripts=true
allow-git=none
```

Even with `--ignore-scripts`, git-based dependencies can ship `.npmrc` files that re-enable lifecycle scripts. Use `--allow-git=none` (npm CLI 11.10.0+) alongside `--ignore-scripts` to fully close this vector.

### Bun

Bun disables postinstall scripts by default and maintains an internal allow-list. Allow specific packages via `trustedDependencies` in `package.json`:

```json
{
  "trustedDependencies": [
    "esbuild",
    "sharp"
  ]
}
```

### pnpm (10.0+)

pnpm disables postinstall scripts by default since v10.0. Control which packages can run build scripts:

```yaml
# pnpm-workspace.yaml

# Preferred (pnpm 10.26+): single map of package → true/false
allowBuilds:
  esbuild: true
  fsevents: true
  nx@21.6.4 || 21.6.5: true
  core-js: false

# Legacy (still supported):
# onlyBuiltDependencies:
#   - esbuild
#   - fsevents

# Make unreviewed scripts a hard error (pnpm 10.3+)
strictDepBuilds: true
```

### Allowlist with @lavamoat/allow-scripts

For projects that need some post-install scripts, use `@lavamoat/allow-scripts` to create an auditable allowlist:

```bash
npm install --save-dev @lavamoat/allow-scripts
npx allow-scripts auto
```

This scans the dependency tree and creates a `package.json` entry listing which packages are permitted to run scripts, blocking all others.

## Lockfile Injection Prevention

### The Threat

Malicious actors can submit PRs that modify lockfiles to point to compromised packages or change the `resolved` URL + integrity hash to their own payload.

### Validation with lockfile-lint

```bash
npm install --save-dev lockfile-lint

# Validate npm lockfile
npx lockfile-lint \
  --path package-lock.json \
  --type npm \
  --allowed-hosts npm yarn \
  --validate-https

# Validate yarn lockfile
npx lockfile-lint \
  --path yarn.lock \
  --type yarn \
  --allowed-hosts npm yarn \
  --validate-https
```

### CI Integration

```json
{
  "scripts": {
    "lint:lockfile": "lockfile-lint --path package-lock.json --type npm --allowed-hosts npm --validate-https",
    "preinstall": "npm run lint:lockfile"
  }
}
```

### pnpm Specific Hardening

pnpm is inherently more resistant to lockfile injection:
- Doesn't maintain tarball sources that can be maliciously modified
- Won't install packages in the lockfile that aren't in `package.json`

Additional protection (pnpm 10.26+):

```yaml
# pnpm-workspace.yaml
# Block transitive deps from using exotic sources (git repos, tarball URLs)
blockExoticSubdeps: true
```

### Trust Policy (pnpm 10.21+)

Detect when a package's publish-time trust level has decreased — an early signal of account compromise:

```yaml
# pnpm-workspace.yaml
trustPolicy: no-downgrade

# Allow specific packages to bypass
trustPolicyExclude:
  - 'chokidar@4.0.3'

# Ignore check for packages published >30 days ago (pnpm 10.27+)
trustPolicyIgnoreAfter: 43200  # minutes (30 days)
```

Trust levels (strongest → weakest):
1. **Trusted Publisher** — published via OIDC/GitHub Actions
2. **Provenance** — published with npm provenance attestation
3. **Signatures** — registry signature present
4. **No evidence** — no trust signals

### Bun Lockfile Notes

Bun uses `bun.lock` (text-based, default since v1.2) or `bun.lockb` (binary). `lockfile-lint` does not currently support Bun lockfile formats. Monitor the [lockfile-lint repo](https://github.com/lirantal/lockfile-lint) for future support.

## Pre-Install Security Auditing

### npq — Pre-Install Package Auditor

[npq](https://github.com/lirantal/npq) audits packages before installation using multiple security "marshalls":

```bash
# Install globally
npm install -g npq

# Use instead of npm
npq install express

# Dry run (audit without installing)
npq install express --dry-run

# Shell alias for seamless integration
alias npm='npq-hero'
echo "alias npm='npq-hero'" >> ~/.zshrc

# Use with other package managers
NPQ_PKG_MGR=pnpm npq install fastify
NPQ_PKG_MGR=bun npq install fastify

# Permanent aliases for other PMs
alias pnpm="NPQ_PKG_MGR=pnpm npq-hero"
```

What npq validates:
- Vulnerability scanning (Snyk CVE database)
- Package age analysis (flags packages < 22 days old)
- Typosquatting detection
- Registry signature verification
- Provenance attestation checks
- Pre/post-install script warnings
- Package health (README, LICENSE, repo URL, downloads)
- Binary introduction warnings
- Deprecation status
- Maintainer domain validation (expired domains)

### Socket Firewall (sfw) — Real-Time Package Firewall

[sfw](https://socket.dev/blog/introducing-socket-firewall) intercepts package manager commands and blocks malicious packages:

```bash
# Install globally
npm install -g sfw

# Prefix any package manager command
sfw npm install express
sfw pnpm add express
sfw yarn add express
sfw pip install requests
sfw cargo fetch
```

What sfw checks:
- Malicious code detection
- Install script risks
- Typosquatting detection
- Dependency confusion attacks
- Known vulnerabilities
- Protestware and env variable access
- Network and filesystem access patterns

### Comparison

| Feature | npq | sfw | Socket CLI (`socket npm`) |
|---------|-----|-----|---------------------------|
| Analysis | Pre-install marshalls | Real-time deep analysis | Full transitive scan via npm integration |
| Data sources | Snyk CVE, npm metadata | Socket proprietary intelligence | Socket proprietary intelligence |
| Interactivity | Prompts before install | Blocks and prompts flagged packages | Prompts before installing flagged packages |
| PM support | npm, pnpm, Bun (env vars) | npm, yarn, pnpm, pip, uv, cargo | npm, npx (wrapper mode) |
| Open source | Yes | Client only | Client only (open source on GitHub) |
| Free tier | Yes | No | Yes (beta, default issues only) |
| CI integration | No | No | Yes (`socket ci`, `socket fix --autopilot`) |
| Package scoring | No | No | Yes (`socket package score`) |
| CVE auto-fixing | No | No | Yes (`socket fix`) |
| Requires auth | No | Yes | No for wrapper, Yes for scans/fix |

See `references/socket-cli-guide.md` for full Socket CLI documentation.

## Publisher Security

### Enable 2FA for npm Accounts

```bash
# Enable for auth + publishing
npm profile enable-2fa auth-and-writes

# Enable for auth only
npm profile enable-2fa auth-only
```

### Publish with Provenance Attestations

Provides cryptographic proof of where and how packages were built:

```yaml
# GitHub Actions
permissions:
  id-token: write
steps:
  - run: npm publish --provenance
```

Requires npm CLI 9.5.0+ and GitHub Actions or GitLab CI/CD.

### Publish with OIDC (Trusted Publishing)

Eliminates long-lived npm tokens by using short-lived OIDC tokens from CI:

```yaml
# GitHub Actions
permissions:
  id-token: write
steps:
  - run: npm publish
```

Configure trusted publisher on npmjs.com first. Automatically generates provenance attestations (OpenSSF compliant).

## Avoiding Blind Upgrades

### Anti-Patterns

```bash
# DANGEROUS — upgrades everything without review
npm update
npx npm-check-updates -u
```

Incidents like colors/faker and node-ipc demonstrate why blind upgrades are dangerous.

### Safe Alternatives

```bash
# Interactive — review each upgrade
npx npm-check-updates --interactive

# Use automated tools with security policies
# - Snyk: 21-day cooldown built-in
# - Dependabot: configurable cooldown
# - Renovate: minimumReleaseAge config
```

## Package Health Assessment

### Snyk Security Database

Before adopting any package, check [security.snyk.io](https://security.snyk.io):

```
https://security.snyk.io/package/npm/<package-name>
```

Provides: security vulnerabilities, popularity trends, maintenance activity, community signals.

### Don't Trust npmjs.org Alone

The npmjs.org website:
- Omits git and HTTPS-based dependencies from displayed `package.json`
- Source code display can drift from the actual installed tarball

Always inspect the actual tarball:

```bash
npm pack <package-name> --dry-run
npm pack <package-name>
tar -tzf <package-name>-<version>.tgz
```

## Dependency Tree Reduction

Replace common dependencies with native JavaScript:

```javascript
// Instead of lodash
const unique = [...new Set(array)];

// Instead of axios
const response = await fetch(url);

// Instead of utility libraries
const isEmpty = obj => Object.keys(obj).length === 0;
const clone = structuredClone(original);
```

Each dependency adds transitive attack surface. Evaluate necessity, maintenance burden, and bundle size before adding any dependency.
