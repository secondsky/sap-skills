# Dev Space Setup Template

## How to Use This Template

- **Purpose**: Create and configure a dev space for SAP Business Application Studio
- **When to Use**: Starting a new development project
- **Instructions**: Follow the checklist for your dev space type

---

## Dev Space Creation Checklist

### Pre-Creation

- [ ] Verify subscription to SAP Business Application Studio
- [ ] Confirm `Business_Application_Studio_Developer` role assigned
- [ ] Check available dev space quota (Standard: 10, Free/Trial: 2)
- [ ] Determine appropriate dev space type for project

### Creation Steps

1. [ ] Open SAP Business Application Studio
2. [ ] Click **Create Dev Space**
3. [ ] Enter dev space name (e.g., `[project-name]-dev`)
4. [ ] Select dev space type (see below)
5. [ ] Select additional extensions (optional)
6. [ ] Click **Create Dev Space**
7. [ ] Wait for status to change from STARTING to RUNNING

---

## Dev Space Type Selection Guide

### Choose SAP Fiori when:
- [ ] Building SAP Fiori Elements applications
- [ ] Creating freestyle SAPUI5 applications
- [ ] Migrating from SAP Web IDE
- [ ] Deploying to Cloud Foundry, ABAP Cloud, or on-premise

**Recommended Extensions**: SAPUI5 Adaptation Project (if extending apps)

### Choose Full Stack Cloud Application when:
- [ ] Building CAP applications with Node.js or Java
- [ ] Creating S/4HANA Cloud extensions
- [ ] Need both backend services and Fiori frontend
- [ ] Using CDS modeling

**Recommended Extensions**: SAP HANA Database Explorer

### Choose Full-Stack Application Using Productivity Tools when:
- [ ] Using low-code development approach
- [ ] Building cross-platform (desktop + mobile) apps
- [ ] Rapid application development required

### Choose SAP HANA Native Application when:
- [ ] Building native HANA applications
- [ ] Creating calculation views
- [ ] Developing SQLScript procedures
- [ ] Working with analytical models

**Note**: Verify HANA Cloud allows BAS IP addresses

### Choose SAP Mobile Application when:
- [ ] Building native iOS applications
- [ ] Building native Android applications
- [ ] Using Mobile Development Kit (MDK)
- [ ] Creating SAP Mobile Cards

### Choose Basic when:
- [ ] Minimal tooling needed
- [ ] Testing custom extensions
- [ ] Resource-constrained environment

---

## Post-Creation Configuration

### Git Configuration

```bash
# Set up Git identity
git config --global user.name "[Your Name]"
git config --global user.email "[your.email@example.com]"

# Clone repository
git clone https://github.com/[org]/[repo].git
```

### Cloud Foundry Login

```bash
# Login to Cloud Foundry
cf login -a https://api.cf.[region].hana.ondemand.com

# Verify target
cf target
```

### Verify Tools

```bash
# Check Node.js (for CAP/Fiori)
node --version

# Check npm
npm --version

# Check CF CLI
cf --version

# Check MBT (MTA Build Tool)
mbt --version
```

---

## Project Initialization Templates

### SAP Fiori Elements Project

```bash
# Using Fiori generator
yo @sap/fiori

# Or from command palette
# Fiori: Open Application Generator
```

### CAP Node.js Project

```bash
# Create new CAP project
cds init [project-name]

# Add sample data
cd [project-name]
cds add samples
```

### CAP Java Project

```bash
# Create new CAP Java project
cds init [project-name] --add java

cd [project-name]
mvn clean install
```

### HANA Native Project

```bash
# From command palette
# SAP HANA: Create SAP HANA Database Project
```

---

## Resource Limits by Plan

| Resource | Standard | Free | Trial |
|----------|----------|------|-------|
| Storage | 10 GB | 4 GB | 4 GB |
| Projects | 50 | - | - |
| Running | 2 | 1 | 1 |

### Monitor Resources

```bash
# Check disk usage
df -h

# Check inode usage
df -ih

# List large files
du -sh * | sort -h
```

---

## Troubleshooting New Dev Spaces

### Dev Space Stuck in STARTING

1. Wait 5 minutes
2. If persists, contact support with workspace ID

### Dev Space in STOPPED (can't start)

**Cause**: Reached running dev space limit

**Solution**:
1. Stop another running dev space
2. Then start desired dev space

### Extension Installation Failed

1. Check extension compatibility
2. Review installation logs
3. Report to component CA-BAS-DT

---

## Backup & Recovery

### Before Major Changes

```bash
# Commit all changes to Git
git add .
git commit -m "Backup before [action]"
git push origin [branch]
```

### Download Dev Space Content

1. Open Dev Space Manager
2. Click download icon on dev space
3. Save tar.gz file locally

### Restore to New Dev Space

1. Create new dev space
2. Start dev space
3. Upload tar file to `/home/user/projects`
4. Extract: `tar xvzf [filename.tar.gz]`

---

## Extension Management

### Add Extensions to Existing Dev Space

1. Stop dev space
2. Click Edit icon in Dev Space Manager
3. Select additional extensions
4. Save and restart dev space

### Remove Extensions

1. Stop dev space
2. Click Edit icon
3. Deselect extensions to remove
4. Save and restart dev space

---

## Session Management (Trial Only)

**Session Timeout**: 1 hour of inactivity

**Inactivity Deletion**: 30 days without running

### Best Practices

- Commit changes frequently
- Push to remote Git before ending session
- Document in-progress work

---

**Documentation Links**:
- [Working in the Dev Space Manager](https://help.sap.com/docs/bas/sap-business-application-studio/working-in-dev-space-manager)
- [Dev Space Types](https://help.sap.com/docs/bas/sap-business-application-studio/dev-space-types)
