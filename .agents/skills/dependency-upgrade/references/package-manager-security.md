# Package Manager Security Hardening

Per-package-manager security configuration covering post-install scripts, deterministic installs, and supply chain protections.

## npm

### Disable Lifecycle Scripts

```ini
# .npmrc
ignore-scripts=true
allow-git=none
```

```bash
# Global
npm config set ignore-scripts true
npm config set allow-git none
```

`--allow-git=none` (npm CLI 11.10.0+) prevents git-based dependencies from shipping `.npmrc` files that re-enable lifecycle scripts, closing a bypass vector.

### Deterministic Installs

```bash
# CI/CD — strict lockfile adherence
npm ci
npm ci --only=production

# Never use npm install in CI
```

`npm ci`:
- Deletes `node_modules` before installing
- Requires `package-lock.json` to exist
- Fails if lockfile is out of sync with `package.json`
- Installs exact versions from lockfile only

### Lockfile Validation

```bash
npm install --save-dev lockfile-lint

npx lockfile-lint \
  --path package-lock.json \
  --type npm \
  --allowed-hosts npm yarn \
  --validate-https
```

### Cooldown

```ini
# .npmrc
min-release-age=7
```

## Bun

### Post-Install Script Control

Bun disables postinstall scripts by default. Allow specific packages via `package.json`:

```json
{
  "trustedDependencies": [
    "esbuild",
    "sharp"
  ]
}
```

### Deterministic Installs

```bash
# Frozen lockfile mode (CI)
bun install --frozen-lockfile
```

### Cooldown

```toml
# bunfig.toml
[install]
minimumReleaseAge = 604800  # 7 days in seconds
minimumReleaseAgeExcludes = ["@types/bun", "typescript"]
```

### Lockfile Notes

Bun uses `bun.lock` (text, default since v1.2) or `bun.lockb` (binary). `lockfile-lint` does not support Bun lockfile formats currently.

## pnpm

### Post-Install Script Control (10.0+)

pnpm disables postinstall scripts by default since v10.0.

```yaml
# pnpm-workspace.yaml

# Preferred (pnpm 10.26+)
allowBuilds:
  esbuild: true
  fsevents: true
  nx@21.6.4 || 21.6.5: true
  core-js: false

# Legacy (still supported)
# onlyBuiltDependencies:
#   - esbuild
#   - fsevents

# Hard error on unreviewed scripts (pnpm 10.3+)
strictDepBuilds: true
```

### Trust Policy (pnpm 10.21+)

Detect when a package's trust level has decreased — early signal of account compromise:

```yaml
# pnpm-workspace.yaml
trustPolicy: no-downgrade

trustPolicyExclude:
  - 'chokidar@4.0.3'
  - 'webpack@4.47.0 || 5.102.1'

# Ignore packages published >30 days ago (pnpm 10.27+)
trustPolicyIgnoreAfter: 43200  # minutes
```

Trust levels (strongest → weakest):
1. Trusted Publisher (OIDC/GitHub Actions)
2. Provenance (npm provenance attestation)
3. Signatures (registry signature)
4. No evidence

### Block Exotic Transitive Dependencies (pnpm 10.26+)

```yaml
# pnpm-workspace.yaml
blockExoticSubdeps: true
```

Prevents transitive dependencies from using git repos or direct tarball URLs. Only direct dependencies in `package.json` may use exotic sources.

### Deterministic Installs

```bash
# Frozen lockfile (CI)
pnpm install --frozen-lockfile
```

### Lockfile Security

pnpm is inherently more resistant to lockfile injection:
- Doesn't maintain modifiable tarball sources
- Won't install lockfile packages not declared in `package.json`
- `pnpm-lock.yaml` format is more resistant to injection

### Cooldown

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080  # 7 days in minutes
minimumReleaseAgeExclude:
  - '@types/react'
  - typescript
```

## Yarn

### Deterministic Installs

```bash
# Validate lockfile did not mutate
yarn install --immutable --immutable-cache
```

### Cooldown (Yarn 4.10+)

```yaml
# .yarnrc.yml
npmMinimalAgeGate: "7d"
npmPreapprovedPackages:
  - "@types/react"
  - "typescript"
```

### Lockfile Validation

```bash
npx lockfile-lint \
  --path yarn.lock \
  --type yarn \
  --allowed-hosts npm yarn \
  --validate-https
```

## Deno

### Deterministic Installs

```bash
deno install --frozen
```

### Lockfile

Deno uses `deno.lock`. Ensure it's committed to version control.

## Cross-PM Cheat Sheet

| Feature | npm | Bun | pnpm | Yarn | Deno |
|---------|-----|-----|------|------|------|
| Disable scripts | `ignore-scripts=true` | Default off | Default off (10.0+) | N/A | N/A |
| Script allowlist | `@lavamoat/allow-scripts` | `trustedDependencies` | `allowBuilds` | N/A | N/A |
| Frozen install | `npm ci` | `--frozen-lockfile` | `--frozen-lockfile` | `--immutable` | `--frozen` |
| Cooldown | `min-release-age` | `minimumReleaseAge` (sec) | `minimumReleaseAge` (min) | `npmMinimalAgeGate` | N/A |
| Lockfile format | `package-lock.json` | `bun.lock` / `bun.lockb` | `pnpm-lock.yaml` | `yarn.lock` | `deno.lock` |
| Lockfile lint | `lockfile-lint` | Not supported | `lockfile-lint` | `lockfile-lint` | N/A |
| Trust policy | N/A | N/A | `trustPolicy` (10.21+) | N/A | N/A |
| Block exotic deps | N/A | N/A | `blockExoticSubdeps` (10.26+) | N/A | N/A |
| Lockfile to commit | `package-lock.json` | `bun.lock` | `pnpm-lock.yaml` | `yarn.lock` | `deno.lock` |

## Committing Lockfiles

Always commit lockfiles to version control:

```bash
git add package-lock.json      # npm
git add bun.lock                # Bun
git add pnpm-lock.yaml          # pnpm
git add yarn.lock               # Yarn
git add deno.lock               # Deno
```

Never add lockfiles to `.gitignore`. They are the source of truth for reproducible installs.
