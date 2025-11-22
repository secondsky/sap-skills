# Git Operations - Complete Reference

## Table of Contents

1. [Overview](#overview)
2. [Git Views](#git-views)
3. [Repository Management](#repository-management)
4. [Basic Operations](#basic-operations)
5. [Branch Management](#branch-management)
6. [Git Stash](#git-stash)
7. [Authentication](#authentication)
8. [Corporate Git Repositories](#corporate-git-repositories)
9. [Gerrit Integration](#gerrit-integration)
10. [Troubleshooting](#troubleshooting)
11. [Documentation Links](#documentation-links)

---

## Overview

SAP Business Application Studio provides integrated Git capabilities through built-in tools. Key points:

- Only **HTTPS connections** supported (SSH not available for on-premise)
- Built-in web proxy for on-premise Git access
- Two interface options: Simplified Git View and Advanced Git View (Source Control)

**Best Practice**: Always connect projects to Git repositories for long-term persistence.

---

## Git Views

### Simplified Git View

Default view for basic Git operations. Access via Simplified Git icon in activity bar.

**Capabilities**:
- Clone repositories
- Create and manage branches
- Commit, pull, push operations
- Conflict resolution
- Pending changes management

### Advanced Git View (Source Control)

Full-featured Git interface. Enable by right-clicking activity bar → deselect Simplified Git → select Source Control.

**Components**:

| Section | Purpose |
|---------|---------|
| Menu Toolbar | Toggle views, commit, refresh, history, more actions |
| Message Section | Enter commit descriptions |
| Staged Changes | Files ready for commit |
| Changes | Modified but unstaged files |
| Amend Section | Modify existing commits |

**Status Bar Indicators**:
- `*` - Unstaged changes (dirty)
- `+` - Staged changes
- `!` - Conflicts
- `↑↓` - Ahead/behind commit counts

**File Status Indicators**:
- **A** - Newly staged file
- **U** - Unstaged file with changes
- **M** - Modified file
- **C** - Copied (blue) or conflicted (red)
- **D** - Deleted file

**Visual Change Indicators** (Editor Gutter):
- Red triangle - Deleted lines
- Green bar - Added lines
- Blue bar - Modified lines

---

## Repository Management

### Cloning Repositories

**Method 1: Terminal**
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```

**Method 2: Command Palette**
1. Open Command Palette
2. Type `Git: Clone`
3. Enter repository URL
4. Select destination folder
5. Provide credentials if required

### Opening Projects

Projects appear in file explorer within workspace or as standalone folders.

---

## Basic Operations

### Stage and Unstage Changes

**Stage All**: Click stage all icon in Changes section
**Stage Individual**: Click `+` icon next to file
**Unstage All**: Click unstage all in Staged Changes
**Unstage Individual**: Click `-` icon next to file

### Commit Changes

1. Stage files
2. Enter commit message
3. Press `Ctrl+Enter` or click checkmark

**Commit Types**:

| Type | Description |
|------|-------------|
| Standard Commit | Save changes to local repository |
| Commit (Amend) | Add changes to the last commit |
| Commit (Signed Off) | Add sign-off line certifying authorship |

### Push Changes

Incorporates all unsynced committed changes into remote branch.

```bash
git push
```

Or use Source Control menu → Push

### Pull Changes

Downloads and merges remote changes into local repository.

```bash
git pull
```

Or use Source Control menu → Pull

### Fetch Changes

Downloads objects and references without merging.

```bash
git fetch
```

Then merge or rebase manually.

### Merge Changes

Incorporate all changes from one branch into another.

1. Checkout target branch
2. Source Control menu → Merge
3. Select source branch

### Discard Changes

Removes all changes from active branch. **Warning**: This cannot be undone.

### View Diffs

Double-click modified file to open diff editor showing:
- Index version (left)
- Working tree version (right)

---

## Branch Management

### Create Branch

```bash
git branch <branch-name>
```

Or click branch name in status bar → Create new branch

### Switch Branch

```bash
git checkout <branch-name>
```

Or use Command Palette: `Git: Checkout`

### List Branches

```bash
git branch        # Local branches
git branch -a     # All branches including remote
```

### Default Branch

For migrating from `master` to `main`, refer to Git documentation for default branch configuration.

---

## Git Stash

Temporarily store work-in-progress changes.

### Stash Operations

| Operation | Description |
|-----------|-------------|
| **Stash** | Record current state and return to clean working directory |
| **Pop Stash** | Apply and remove single stash entry |
| **Pop Latest Stash** | Apply and remove most recent stash |
| **Apply Stash** | Apply stash but keep it in stash list |
| **Apply Latest Stash** | Apply most recent stash, keep in list |
| **Drop Stash** | Remove single stash entry |

**Note**: If conflicts occur during pop, entry remains in stash. Resolve conflicts manually, then drop stash.

---

## Authentication

### Basic Authentication

Two credential management approaches:

| Method | Description |
|--------|-------------|
| Credential Cache | Cache in memory for short period |
| Credential Store | Store indefinitely in dev space file |

**Security Recommendation**: Use Personal Access Tokens (PATs) instead of passwords. Refresh PATs regularly.

### OAuth Authentication (GitHub)

1. Connect to GitHub triggers popup with verification code
2. Copy code and open GitHub
3. Paste and authorize code
4. Configure persistence (per session or per dev space)

**Preferences**:
- `sapbas.git.github.oauth` - GitHub.com OAuth
- `sapbas.git.github.enterprise.oauth` - Enterprise GitHub

### Azure DevOps

Generate PAT from Azure DevOps and use as password during clone.

---

## Corporate Git Repositories

### Prerequisites

1. Cloud Connector installed and configured
2. Destination created in SAP BTP cockpit
3. Administrator configuration complete

### Cloud Connector Setup

| Setting | Value |
|---------|-------|
| Back-end Type | Non-SAP System |
| Protocol | HTTPS |
| Internal Host/Port | Your Git system's network details |
| Virtual Host/Port | Can match internal settings |
| Principal Type | None |

**Resource Access**:
- URL Path: `/`
- Access Policy: Path and all sub-paths

### Destination Configuration

```properties
ProxyType = OnPremise
WebIDEEnabled = true
HTML5.DynamicDestination = true
HTML5.Timeout = 60000  # Optional
```

### GitHub Enterprise OAuth

Create OAuth app with Device Flow enabled, add `GitHubEnterpriseClientID` property to destination.

### Certificate Requirements

Upload Git server certificate to Cloud Connector if using certificate-based authentication.

---

## Gerrit Integration

Gerrit provides code review before commits reach the repository.

### Configuration Steps

1. **Enable Gerrit**: File → Preferences → Settings → Extensions → Sapbas → Check "Whether gerrit is enabled"

2. **Add Properties** (from Gerrit administrator):
   - hookPath
   - protocol
   - hostname

3. **Clone Repository**

4. **Commit Changes**: Use Commit (Amend)

5. **Push to Gerrit**: SOURCE CONTROL menu → More Actions → Push to Gerrit

---

## Troubleshooting

### HTTP 502 Error on Clone

**Error**: `fatal: unable to access 'https://...': Received HTTP code 502 from proxy after CONNECT`

**Solution**: Set up Cloud Connector and configure Git to work with Gerrit.

### Refresh Destinations

After creating destinations, refresh in dev space:

```bash
curl http://localhost:8887/reload
```

### Use Correct URL

Always use the exact same host and port as defined in the destination URL property.

### Branch Default Name Migration

When migrating from `master` to `main`:

```bash
git branch -m master main
git push -u origin main
```

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Git Source Control | https://help.sap.com/docs/bas/sap-business-application-studio/git-source-control |
| Git Commands | https://help.sap.com/docs/bas/sap-business-application-studio/git-commands |
| Git Stash | https://help.sap.com/docs/bas/sap-business-application-studio/git-stash |
| Cloning Repositories | https://help.sap.com/docs/bas/sap-business-application-studio/cloning-repositories |
| Corporate Git | https://help.sap.com/docs/bas/sap-business-application-studio/connecting-to-corporate-git-repository |
| Git Authentication | https://help.sap.com/docs/bas/sap-business-application-studio/providing-authentication-to-git |
| Gerrit Setup | https://help.sap.com/docs/bas/sap-business-application-studio/setting-up-git-to-work-with-gerrit |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/sap-btp-business-application-studio/tree/main/docs
