# Socket CLI Guide

Comprehensive reference for using Socket CLI to secure dependency upgrades with proactive scanning, automated CVE fixing, and CI enforcement.

## Installation & Authentication

```bash
npm install -g socket
```

### Authentication

```bash
# Interactive login (stores token locally)
socket login

# Or set API token via environment variable
export SOCKET_SECURITY_API_TOKEN=your-token-here

# Or per-command
SOCKET_SECURITY_API_TOKEN=xyz socket scan create --report
```

Generate API tokens at: https://socket.dev/settings/api-keys

Required permissions vary per command (see each section below).

### Free vs Authenticated Features

| Feature | Free (No Token) | Authenticated |
|---------|-----------------|---------------|
| `socket npm` / `socket npx` | Yes (beta, default issues only) | Yes |
| `socket wrapper on/off` | Yes | Yes |
| `socket package shallow` | No | Yes (1 unit/pkg) |
| `socket package score` (deep) | No | Yes (1 unit/pkg) |
| `socket scan create` | No | Yes (1 unit) |
| `socket scan report` | No | Yes (2 units) |
| `socket ci` | No | Yes (1 unit + report) |
| `socket fix` | No | Yes (101 units) |
| `socket optimize` | No | Yes |

## Package Assessment

Evaluate packages before adding or upgrading them.

### Shallow Score (package only)

Quick assessment of a single package excluding its dependencies:

```bash
socket package shallow npm express
socket package shallow npm express@4.18.2

# Multiple packages, mixed ecosystems
socket package shallow pkg:npm/express pkg:pypi/requests

# Output formats
socket package shallow npm express --json
socket package shallow npm express --markdown
```

Returns scores for: Supply Chain Risk, Maintenance, Quality, Vulnerabilities, License.
Also lists detected alerts with severity levels.

### Deep Score (package + all transitives)

Full assessment including all transitive dependencies:

```bash
socket package score npm eslint
socket package score npm eslint --markdown

# Specify exact version via purl
socket package score 'pkg:npm/[email protected]'
```

The deep score reflects the minimum score across all transitive dependencies. A package with a high shallow score can have a low deep score if one of its dependencies is risky.

### When to Use Each

| Scenario | Use | Why |
|----------|-----|-----|
| Quick check before installing | `shallow` | Fast, evaluates just the target |
| Evaluating a major upgrade | `score` (deep) | Catches transitive supply chain risks |
| CI policy gate | `scan` (not package) | Evaluates your whole project |
| Comparing two packages | `shallow` | Quick side-by-side comparison |

## Project Scanning

Scan your entire project for security issues.

### Create a Scan

```bash
# Basic scan (auto-detects manifest files)
socket scan create

# Scan with policy report (recommended)
socket scan create --report

# Associate with repo/branch (for dashboard)
socket scan create --repo=my-project --branch=main --default-branch --report

# JSON output for automation
socket scan create --report --json

# Markdown output for sharing
socket scan create --report --markdown
```

A scan uploads manifest files (package.json, requirements.txt, etc.) to Socket for analysis. No source code is sent.

**API requirements**: 1 unit + `full-scans:create` permission. Report adds 2 units + `full-scans:list` + `security-policy:read`.

### CI Gate: `socket ci`

Shorthand for `socket scan create --report`. Creates a scan and exits with code 0 if the project passes your org's security policy, non-zero otherwise:

```bash
socket ci
```

Use in CI pipelines to block merges that introduce security policy violations.

### Scan Reports

```bash
# View scan report with alert folding
socket scan report <SCAN_ID> --fold=version --json

# Include license policy
socket scan report <SCAN_ID> --license --markdown

# Quick health check (just true/false)
socket scan report <SCAN_ID> --short
```

Fold levels: `none` (every occurrence) → `file` → `version` (recommended) → `pkg`.

## Scan Diffs

Compare two scans to see exactly what changed between upgrades:

```bash
socket scan diff <SCAN_ID_BEFORE> <SCAN_ID_AFTER>

# JSON for automation
socket scan diff <ID1> <ID2> --json > scan-delta.json

# Markdown for PR comments
socket scan diff <ID1> <ID2> --markdown
```

Shows packages added, removed, and changed — plus any new or resolved alerts.

**API requirements**: 1 unit + `full-scans:list` permission.

## Automated CVE Fixing: `socket fix`

Automatically upgrade vulnerable dependencies to secure versions with intelligent upgrade planning.

### Basic Usage

```bash
# Fix all fixable vulnerabilities
socket fix

# Fix specific CVEs
socket fix --id GHSA-hhq3-ff78-jv3g
socket fix --id CVE-2021-23337

# Multiple IDs
socket fix --id GHSA-xxxx-xxxx-xxxx,GHSA-yyyy-yyyy-yyyy
socket fix --id GHSA-xxxx --id GHSA-yyyy

# Fix in specific project directory
socket fix ./path/to/project
```

### Cooldown-Aligned Fixing

Align with your cooldown policy using `--minimum-release-age`:

```bash
# Only fix with packages vetted for at least 7 days (matches recommended cooldown)
socket fix --minimum-release-age 7d

# Conservative: 14 days
socket fix --minimum-release-age 14d

# Aggressive: 3 days
socket fix --minimum-release-age 3d
```

Time formats: `1h` (hours), `3d` (days), `2w` (weeks).

### Conservative Options

```bash
# Don't suggest major version upgrades (less risk of breakage)
socket fix --no-major-updates

# Preview changes without applying them
socket fix --no-apply-fixes

# Output suggested fixes to file
socket fix --no-apply-fixes --output-file suggested-fixes.json

# Show which direct deps introduce transitive CVEs
socket fix --show-affected-direct-dependencies --output-file fixes.json

# Pin to exact versions instead of preserving ranges
socket fix --range-style pin
```

### CI/PR Mode (Autopilot)

Run in GitHub Actions to automatically create fix PRs:

```bash
# Create PRs for fixable CVEs (auto-merge if checks pass)
socket fix --autopilot

# Limit number of PRs per run
socket fix --autopilot --pr-limit 5
```

Required environment variables for CI:
- `SOCKET_CLI_GITHUB_TOKEN` (or `GITHUB_TOKEN`) — for PR creation
- `SOCKET_CLI_GIT_USER_NAME` — git commit author name
- `SOCKET_CLI_GIT_USER_EMAIL` — git commit author email
- `SOCKET_CLI_API_TOKEN` — Socket API token

**API requirements**: 101 units + `full-scans:create` + `packages:list` permissions.

### Output Formats

```bash
socket fix --json
socket fix --markdown > security-fixes.md
```

## Dependency Optimization: `socket optimize`

Apply `@socketregistry` overrides to patch known issues without changing direct dependency versions:

```bash
# Apply overrides
socket optimize

# Pin overrides to exact versions
socket optimize --pin

# Production dependencies only
socket optimize --prod

# For a specific project
socket optimize ./path/to/project
```

This adds `overrides` (npm/pnpm) or `resolutions` (yarn) to your package.json that redirect vulnerable transitive dependencies to Socket's secure patches.

## Safe Install Wrappers

### `socket npm` and `socket npx`

Run npm/npx through Socket to check packages before installation:

```bash
# Install with Socket protection
socket npm install express
socket npm install -g typescript

# Run commands safely
socket npx create-react-app my-app
```

These wrappers intercept the actual npm/npx resolution, check all resolved packages against Socket's database, and prompt before installing flagged packages.

**Beta limitations**: Uses default issue set only (not configurable without auth). Windows limited to WSL.

### System-Wide Wrapper: `socket wrapper`

Enable automatic interception of all npm/npx commands on your system:

```bash
# Enable (creates shell aliases)
socket wrapper on

# Disable
socket wrapper off
```

After enabling, any `npm install ...` command automatically runs through Socket. Requires restarting your shell or sourcing your RC file (e.g., `source ~/.zshrc`).

### Manual Shell Aliases

```bash
# Add to ~/.zshrc or ~/.bashrc
alias npm="socket-npm"
alias npx="socket-npx"

# zsh autocompletions
compdef _npm socket-npm

# bash autocompletions
$(complete -p npm | sed 's/npm$/socket-npm/')
```

### Combining with npq

npq (pre-install auditor) can use socket-npm as its package manager:

```bash
NPQ_PKG_MGR=socket-npm npq install express
```

Note: `socket npm` performs full transitive analysis and integrates into npm's install flow, so it's more thorough than npq's checks. Running both may be redundant.

## Project Configuration: `socket.json`

Store per-project defaults to avoid repeating flags:

```bash
# Interactive setup
socket scan setup
```

Creates `socket.json` in the project root:

```json
{
  "repo": "my-project",
  "branch": "main",
  "defaultBranch": true
}
```

After setup, `socket scan create` automatically uses these values. Flags still override config.

Commit `socket.json` to share defaults with your team, or add to `.gitignore` for personal use.

## Alert Categories Quick Reference

Socket detects issues across five categories:

### Supply Chain Risk (most critical for upgrades)
- **malware** — Known malicious package
- **didYouMean** — Possible typosquat (similar name to popular package)
- **gptMalware** — AI-detected malware
- **troll** — Protestware or potentially unwanted behavior
- **obfuscatedFile** — Obfuscated code detected
- **installScripts** — Pre/post-install scripts present
- **manifestConfusion** — Mismatch between package.json and tarball

### Vulnerability
- **criticalCVE**, **cve**, **mediumCVE**, **mildCVE** — Known CVEs by severity

### Quality
- **deprecated** — Package is deprecated
- **unmaintained** — No recent maintenance activity
- **unpopularPackage** — Very low download counts

### Maintenance
- Part of quality category; signals inactive packages

### License
- **noLicenseFound** — No license file detected
- **copyleftLicense** — Copyleft license may restrict usage
- **nonpermissiveLicense** — Non-permissive terms

## Proactive Upgrade Workflow with Socket CLI

Integrate Socket into every stage of dependency management:

```
1. PRE-UPGRADE:   socket scan create --report          → baseline scan
2. EVALUATE:      socket package score npm <pkg>@<ver>  → assess target safety
3. SAFE INSTALL:  socket npm install <pkg>              → block malicious packages
4. POST-UPGRADE:  socket scan create --report          → verify no regressions
5. DIFF:          socket scan diff <before> <after>     → see exactly what changed
6. FIX:           socket fix --minimum-release-age 7d   → auto-fix any new CVEs
7. OPTIMIZE:      socket optimize                       → apply security overrides
```

### Quick Reference: Command Cheat Sheet

| Command | Purpose | Auth Required |
|---------|---------|---------------|
| `socket npm install <pkg>` | Install with malware check | No (beta) |
| `socket npx <cmd>` | Run with malware check | No (beta) |
| `socket wrapper on` | Auto-protect all npm/npx | No |
| `socket package shallow npm <pkg>` | Quick package score | Yes |
| `socket package score npm <pkg>` | Deep score (with transitives) | Yes |
| `socket scan create --report` | Full project scan | Yes |
| `socket scan diff <id1> <id2>` | Compare two scans | Yes |
| `socket ci` | CI gate (scan + policy check) | Yes |
| `socket fix` | Auto-fix CVEs | Yes |
| `socket fix --minimum-release-age 7d` | Fix with cooldown alignment | Yes |
| `socket fix --no-major-updates` | Fix without major bumps | Yes |
| `socket fix --no-apply-fixes` | Preview fixes without applying | Yes |
| `socket fix --autopilot` | CI auto-fix with PR creation | Yes |
| `socket optimize` | Apply security overrides | Yes |
| `socket login` | Store API token locally | — |
| `socket scan setup` | Create socket.json defaults | — |

## Supported Ecosystems

Socket CLI supports:
- **JavaScript/TypeScript**: npm, pnpm (v6+), Yarn (classic + berry), Bun
- **Python**: pip, uv (requirements.txt, uv.lock)
- **Java**: Maven, Gradle (with gradle.lockfile)
- **Ruby**: RubyGems
- **Go**: go.sum/go.mod
- **Rust**: Cargo
- **C#**: NuGet (packages.lock.json coming soon)

`socket npm` / `socket npx` wrappers only work with npm. For other package managers, use `socket scan create` for analysis and `socket fix` for remediation.
