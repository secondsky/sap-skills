# Cooldown Period Configuration Guide

Detailed configuration for delaying installation of newly published packages across all major package managers and CI/CD tools.

## Why a Cooldown Period?

Newly released packages may contain malicious code that the community discovers within hours or days. A cooldown period prevents installing versions before they've been vetted.

**Recommended minimum: 7 days** — balances security with developer productivity.

| Period | Risk Level | Use Case |
|--------|-----------|----------|
| 3 days | Aggressive | Catches most typosquatting; may miss delayed discoveries |
| 7 days | Recommended | Good balance; catches most supply chain incidents |
| 14 days | Conservative | Critical/production systems |
| 21 days | Paranoid | Matches Snyk's built-in default |

## Package Manager Configuration

### npm

```ini
# .npmrc — project-level
min-release-age=7
```

```bash
# Global config (all projects on machine)
npm config set min-release-age 7

# Per-command with dynamic date
npm install express --before="$(date -v -7d)"

# Per-command with specific date
npm install express --before=2025-01-01
```

Notes:
- `min-release-age` is persistent and works with all install commands
- `--before` requires manual date management; prefer `min-release-age` for automation

### Bun (1.3+)

```toml
# bunfig.toml
[install]
# Only install versions published at least 7 days ago
minimumReleaseAge = 604800  # seconds (7 days)

# Packages that bypass the cooldown
minimumReleaseAgeExcludes = ["@types/bun", "typescript"]
```

The `minimumReleaseAge` value is in **seconds**:
- 3 days = 259200
- 7 days = 604800
- 14 days = 1209600
- 21 days = 1814400

### pnpm (10.16+)

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080  # 7 days (in minutes)

# Packages that bypass the cooldown
minimumReleaseAgeExclude:
  - '@types/react'
  - typescript
```

The `minimumReleaseAge` value is in **minutes**:
- 3 days = 4320
- 7 days = 10080
- 14 days = 20160
- 21 days = 30240

### Yarn (4.10+)

```yaml
# .yarnrc.yml
# Only consider versions published at least 7 days ago
npmMinimalAgeGate: "7d"

# Packages that bypass the age gate (descriptors or glob patterns)
npmPreapprovedPackages:
  - "@types/react"
  - "typescript"
```

The `npmMinimalAgeGate` accepts human-readable durations: `"3d"`, `"7d"`, `"14d"`, `"21d"`.

## CI/CD Tool Configuration

### Dependabot

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    # Wait 7 days after a new version is published before creating a PR
    cooldown:
      default-days: 7
    open-pull-requests-limit: 5
```

### Renovate Bot

```json
{
  "extends": ["config:base"],
  "minimumReleaseAge": "7 days",
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true,
      "minimumReleaseAge": "7 days"
    },
    {
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "minimumReleaseAge": "14 days",
      "labels": ["major-update"]
    }
  ]
}
```

### Snyk

Snyk includes a built-in 21-day cooldown for automated dependency upgrade PRs. No configuration needed — it automatically avoids recommending versions less than 21 days old to prevent:

- Versions with functional bugs that get unpublished
- Versions from compromised accounts

To adjust, use Snyk's upgrade PR settings in the dashboard.

## Cooldown Exclusions

Some packages should bypass the cooldown because they are closely tied to the toolchain and need rapid updates:

### Common Exclusions

| Package | Reason |
|---------|--------|
| `@types/react` | Type definitions must match React version exactly |
| `@types/node` | Type definitions must match Node version |
| `typescript` | Build tooling; often needs same-day patches |
| `@types/bun` | Bun type definitions must match runtime version |
| `esbuild` | Build tool; security patches need fast rollout |
| `@cloudflare/workers-types` | Platform types must match runtime |

### Configuring Exclusions

**npm**: No built-in exclusion mechanism. Use `--before` flag manually for excluded packages.

**Bun**:
```toml
minimumReleaseAgeExcludes = ["@types/bun", "typescript", "esbuild"]
```

**pnpm**:
```yaml
minimumReleaseAgeExclude:
  - '@types/react'
  - typescript
  - esbuild
```

**Yarn**:
```yaml
npmPreapprovedPackages:
  - "@types/react"
  - "typescript"
  - "esbuild"
```

## Multi-PM Projects

For projects that support multiple package managers, ensure cooldown is configured in all relevant files:

| PM | Config File | Setting |
|----|------------|---------|
| npm | `.npmrc` | `min-release-age=7` |
| Bun | `bunfig.toml` | `minimumReleaseAge = 604800` |
| pnpm | `pnpm-workspace.yaml` | `minimumReleaseAge: 10080` |
| Yarn | `.yarnrc.yml` | `npmMinimalAgeGate: "7d"` |
| Dependabot | `.github/dependabot.yml` | `cooldown.default-days: 7` |
| Renovate | `renovate.json` | `"minimumReleaseAge": "7 days"` |

## Verifying Cooldown Is Active

```bash
# npm — check config
npm config get min-release-age

# Bun — verify bunfig.toml is loaded
cat bunfig.toml | grep minimumReleaseAge

# pnpm — verify workspace config
cat pnpm-workspace.yaml | grep minimumReleaseAge

# Yarn — verify config
cat .yarnrc.yml | grep npmMinimalAgeGate
```
