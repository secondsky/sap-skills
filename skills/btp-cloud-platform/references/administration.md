# Administration Reference

Complete guidance for SAP BTP account administration and operations.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/50-administration-and-ops

---

## Table of Contents

1. [Account Administration](#account-administration)
2. [Entitlement Management](#entitlement-management)
3. [User and Role Management](#user-and-role-management)
4. [Default Role Collections](#default-role-collections)
5. [Environment Management](#environment-management)
6. [Service Management](#service-management)
7. [Monitoring and Logging](#monitoring-and-logging)
8. [Backup and Recovery](#backup-and-recovery)

---

## Account Administration

### Global Account Operations

```bash
# List subaccounts
btp list accounts/subaccount

# Get global account details
btp get accounts/global-account

# Update global account
btp update accounts/global-account --display-name "New Name"
```

### Subaccount Operations

```bash
# Create subaccount
btp create accounts/subaccount \
  --display-name "Development" \
  --subdomain dev-acme \
  --region eu10 \
  --subaccount-admins admin@example.com

# Update subaccount
btp update accounts/subaccount <id> \
  --display-name "New Name" \
  --description "Updated description"

# Delete subaccount
btp delete accounts/subaccount <id>

# Move subaccount to directory
btp move accounts/subaccount <id> --to-directory <dir-id>
```

### Directory Operations

```bash
# Create directory
btp create accounts/directory \
  --display-name "Business Unit A" \
  --directory-features ENTITLEMENTS,AUTHORIZATIONS

# List directories
btp list accounts/directory

# Delete directory
btp delete accounts/directory <id>
```

### Labels

```bash
# Add label to subaccount
btp add accounts/label --subaccount <id> \
  --name "Environment" --value "Development"

# List labels
btp list accounts/label --subaccount <id>

# Remove label
btp remove accounts/label --subaccount <id> --name "Environment"
```

---

## Entitlement Management

### View Entitlements

```bash
# Global account entitlements
btp list accounts/entitlement

# Subaccount assignments
btp list accounts/entitlement --subaccount <id>
```

### Assign Entitlements

```bash
# Assign to subaccount
btp assign accounts/entitlement \
  --to-subaccount <id> \
  --for-service hana-cloud \
  --plan hana \
  --amount 1

# Assign to directory
btp assign accounts/entitlement \
  --to-directory <id> \
  --for-service xsuaa \
  --plan application \
  --amount 10
```

### Common Services to Assign

| Service | Plan | Description | Availability |
|---------|------|-------------|--------------|
| `cloudfoundry` | `standard` | CF runtime | All CF regions |
| `kymaruntime` | `aws` / `azure` / `gcp` | Kyma runtime | Selected regions only |
| `abap` | `standard` | ABAP environment | Selected regions only |
| `hana-cloud` | `hana` | HANA Cloud database | All regions |
| `xsuaa` | `application` | Authorization service | All regions |
| `destination` | `lite` | Destination service | All regions |
| `connectivity` | `lite` | Connectivity service | All regions |
| `application-logs` | `lite` | Application logging | All regions |

> **Note**: Services marked "Selected regions only" require checking regional availability in BTP Cockpit
> or SAP Discovery Center before assignment. Kyma/ABAP availability varies by IaaS provider and region.

---

## User and Role Management

### User Operations

```bash
# Assign user to role collection
btp assign security/role-collection "Subaccount Administrator" \
  --to-user user@example.com \
  --of-idp sap.ids

# Remove user from role collection
btp unassign security/role-collection "Subaccount Administrator" \
  --from-user user@example.com \
  --of-idp sap.ids

# List role collection assignments
btp list security/role-collection
```

### Group Mapping

```bash
# Map IdP group to role collection
btp assign security/role-collection "Developers" \
  --to-group "BTP_Developers" \
  --of-idp my-corporate-idp

# Remove group mapping
btp unassign security/role-collection "Developers" \
  --from-group "BTP_Developers" \
  --of-idp my-corporate-idp
```

### Trust Configuration

```bash
# List trust configurations
btp list security/trust

# Get trust details
btp get security/trust <idp-origin>
```

---

## Default Role Collections

### Global Account Level

| Role Collection | Description |
|-----------------|-------------|
| **Global Account Administrator** | Full access to global account, entitlements, subaccounts |
| **Global Account Viewer** | Read-only access to global account |

### Directory Level

| Role Collection | Description |
|-----------------|-------------|
| **Directory Administrator** | Manage directory, entitlements, subaccounts |
| **Directory Viewer** | Read-only access to directory |

### Subaccount Level

| Role Collection | Description |
|-----------------|-------------|
| **Subaccount Administrator** | Full access to subaccount |
| **Subaccount Viewer** | Read-only access to subaccount |
| **Subaccount Service Administrator** | Manage service brokers |
| **Cloud Connector Administrator** | Manage Cloud Connector |
| **Destination Administrator** | Manage destinations and trust |
| **Connectivity and Destination Administrator** | Combined CC + destinations |

### Cloud Foundry Roles

| Role | Description |
|------|-------------|
| **Org Manager** | Manage org settings, spaces, quotas |
| **Org Auditor** | View-only access to org |
| **Space Manager** | Manage space settings, members |
| **Space Developer** | Deploy apps, manage services |
| **Space Auditor** | View-only access to space |

---

## Environment Management

### Cloud Foundry

```bash
# Create CF environment
btp create accounts/environment-instance \
  --subaccount <id> \
  --environment cloudfoundry \
  --plan standard \
  --landscape eu10-004

# List environments
btp list accounts/environment-instance --subaccount <id>

# Delete environment
btp delete accounts/environment-instance <env-id> --subaccount <id>
```

### Kyma

```bash
# Create Kyma environment
btp create accounts/environment-instance \
  --subaccount <id> \
  --environment kyma \
  --plan aws \
  --parameters '{"name":"my-kyma"}'

# Get Kyma kubeconfig
# Download from BTP Cockpit or use Kyma Dashboard
```

---

## Service Management

### Service Instances

```bash
# Discover available services and plans
cf marketplace

# CF CLI - Create service instance
cf create-service <service> <plan> <name> -c '<parameters>'

# CF CLI - List services
cf services

# CF CLI - Update service
cf update-service <name> -p <new-plan> -c '<parameters>'

# CF CLI - Delete service
cf delete-service <name>
```

### Service Bindings

```bash
# Bind to app
cf bind-service <app> <service> -c '<parameters>'

# Create service key (for external access)
cf create-service-key <service> <key-name>

# View service key
cf service-key <service> <key-name>
```

### Service Broker Management

```bash
# Register service broker
cf create-service-broker <name> <user> <password> <url>

# List brokers
cf service-brokers

# Delete broker
cf delete-service-broker <name>
```

---

## Monitoring and Logging

### SAP Cloud ALM

Integration for:
- Real User Monitoring
- Health Monitoring
- Integration Monitoring
- Exception Monitoring
- Job Automation Monitoring

### Application Logging

```bash
# CF - View logs
cf logs <app> --recent
cf logs <app>  # tail

# Subscribe to Application Logging service
cf create-service application-logs lite my-logs
cf bind-service my-app my-logs
```

### Audit Logging

Access via:
- SAP Audit Log Viewer Service (subscription)
- Audit Log Retrieval API

```bash
# API access
curl -X GET "https://auditlog.cf.<region>.hana.ondemand.com/v2/auditlogrecords" \
  -H "Authorization: Bearer <token>"
```

### Alert Notification

Configure alerts for:
- Application events
- Service events
- Platform events

Channels:
- Email
- Slack
- ServiceNow
- SAP Cloud ALM

---

## Backup and Recovery

### SAP-Managed Backups

| Service | Backup | Recovery |
|---------|--------|----------|
| SAP HANA Cloud | Continuous | Point-in-time restore |
| PostgreSQL (Hyperscaler) | 14-day retention | Point-in-time restore |
| Redis | No persistence | N/A |
| Object Store | Versioning available | Manual |

### Customer Responsibilities

You must backup:
- Service configurations
- Destination settings
- Trust configurations
- Application configurations
- Custom code (Git repositories)

### Kyma Backup

- Managed Kubernetes snapshots
- Excludes persistent volumes
- Use Velero for volume backups

### Cloud Foundry Apps

- No built-in backup
- Keep code in external Git
- Export service configurations
- Document environment variables

---

## Automation

### Terraform Provider

```hcl
provider "btp" {
  globalaccount = "my-global-account"
}

resource "btp_subaccount" "dev" {
  name      = "Development"
  subdomain = "dev-acme"
  region    = "eu10"
}

resource "btp_subaccount_entitlement" "cf" {
  subaccount_id = btp_subaccount.dev.id
  service_name  = "APPLICATION_RUNTIME"
  plan_name     = "MEMORY"
  amount        = 1
}
```

### SAP Automation Pilot

Low-code automation for:
- Scheduled operations
- Event-triggered workflows
- Multi-step procedures

---

## Related Documentation

- Administration: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/50-administration-and-ops
- btp CLI: https://help.sap.com/docs/btp/btp-cli-command-reference/btp-cli-command-reference
- Terraform: https://registry.terraform.io/providers/SAP/btp/latest/docs
