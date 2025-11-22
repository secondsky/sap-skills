# SAP HANA CLI - HDI Container Management

**Source**: https://github.com/SAP-samples/hana-developer-cli-tool-example

HDI (HANA Deployment Infrastructure) containers provide isolated runtime environments for database artifacts.

---

## HDI Command Overview

| Command | Purpose |
|---------|---------|
| `activateHDI` | Enable HDI service |
| `adminHDI` | Assign HDI admin privileges |
| `adminHDIGroup` | Manage group administrators |
| `containers` | List containers |
| `createContainer` | Create new container |
| `createContainerUsers` | Create access users |
| `dropContainer` | Remove container |
| `createGroup` | Create container group |
| `dropGroup` | Remove container group |

---

## Activate HDI Service

Enable HDI for a database tenant.

```bash
# Activate HDI
hana-cli activateHDI

# For specific tenant
hana-cli activateHDI [tenant]
```

**Prerequisites**: SYSTEM user or equivalent privileges.

---

## HDI Administration

### Assign HDI Admin

```bash
# Make user an HDI administrator
hana-cli adminHDI [user]
```

### Group Administration

```bash
# Add group administrator
hana-cli adminHDIGroup [group] [user]
```

---

## Container Operations

### List Containers

```bash
# List all containers
hana-cli containers

# With aliases
hana-cli cont
hana-cli listContainers

# Filter by container name pattern
hana-cli containers -c "MY_APP*"

# Filter by group
hana-cli containers -g "DEV_GROUP"

# Limit results
hana-cli containers -l 50
```

**Options**:
| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| container | c | * | Container filter pattern |
| containerGroup | g | * | Group filter pattern |
| limit | l | 200 | Maximum results |

**Output**: Container name, group, schema, creator, creation timestamp (UTC).

**UI Alternative**:
```bash
hana-cli containersUI
```

### Create Container

```bash
# Create new container
hana-cli createContainer [container] [group]

# Example
hana-cli createContainer MY_APP_HDI DEV_GROUP
```

### Create Container Users

Creates the standard HDI access users for a container.

```bash
# Create users for container
hana-cli createContainerUsers [container]

# Example
hana-cli createContainerUsers MY_APP_HDI
```

**Users Created**:
- Runtime user (read/execute)
- Design-time user (deploy artifacts)
- Admin user (full access)

### Drop Container

```bash
# Remove container
hana-cli dropContainer [container]

# Example
hana-cli dropContainer MY_APP_HDI
```

**Warning**: This permanently deletes all artifacts in the container.

---

## Container Groups

### Create Group

```bash
# Create container group
hana-cli createGroup [group]

# Example
hana-cli createGroup DEV_GROUP
```

### Drop Group

```bash
# Remove container group
hana-cli dropGroup [group]

# Example
hana-cli dropGroup DEV_GROUP
```

**Note**: Group must be empty before deletion.

---

## HANA Cloud HDI Instances

For SAP HANA Cloud, use cloud-specific commands:

```bash
# List Cloud HDI instances
hana-cli hanaCloudHDIInstances

# UI version
hana-cli hanaCloudHDIInstancesUI
```

---

## HDI Container Workflow

### Typical Development Workflow

1. **Enable HDI** (if not enabled):
   ```bash
   hana-cli activateHDI
   ```

2. **Create group** (optional organization):
   ```bash
   hana-cli createGroup MY_PROJECT_GROUP
   ```

3. **Create container**:
   ```bash
   hana-cli createContainer MY_APP_HDI MY_PROJECT_GROUP
   ```

4. **Create users**:
   ```bash
   hana-cli createContainerUsers MY_APP_HDI
   ```

5. **Verify**:
   ```bash
   hana-cli containers -c "MY_APP*"
   ```

### Cleanup Workflow

1. **List containers**:
   ```bash
   hana-cli containers
   ```

2. **Drop container**:
   ```bash
   hana-cli dropContainer MY_APP_HDI
   ```

3. **Drop group** (if empty):
   ```bash
   hana-cli dropGroup MY_PROJECT_GROUP
   ```

---

## HDI Connection in default-env.json

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hdi-container",
      "label": "hana",
      "credentials": {
        "host": "hostname",
        "port": "443",
        "user": "MY_APP_HDI_RT",
        "password": "RuntimeUserPassword",
        "schema": "MY_APP_HDI",
        "hdi_user": "MY_APP_HDI_DT",
        "hdi_password": "DesignTimePassword",
        "certificate": "-----BEGIN CERTIFICATE-----..."
      }
    }]
  }
}
```

---

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| HDI not activated | Service disabled | Run `activateHDI` |
| Cannot create container | Insufficient privileges | Get HDI admin rights |
| Container exists | Name conflict | Use unique name |
| Cannot drop group | Group not empty | Drop containers first |

---

*Reference: https://github.com/SAP-samples/hana-developer-cli-tool-example*
