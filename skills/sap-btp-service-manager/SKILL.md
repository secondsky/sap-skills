---
name: sap-btp-service-manager
description: |
  This skill provides comprehensive knowledge for SAP Service Manager on SAP Business Technology Platform (BTP). It should be used when managing service instances, bindings, brokers, and platforms across Cloud Foundry, Kyma, Kubernetes, and other environments. Use when provisioning services via SMCTL CLI, BTP CLI, or REST APIs, configuring OAuth2 authentication, working with the SAP BTP Service Operator in Kubernetes, troubleshooting service consumption issues, or implementing cross-environment service management.

  Keywords: SAP Service Manager, BTP, service instances, service bindings, SMCTL, service broker, OSBAPI, Cloud Foundry, Kyma, Kubernetes, service-manager, service-operator-access, subaccount-admin, OAuth2, X.509, service marketplace, service plans, rate limiting, cf create-service, btp create services/instance, ServiceInstance CRD, ServiceBinding CRD
license: MIT
metadata:
  version: 1.0.0
  last_updated: 2025-11-22
  documentation_source: https://github.com/SAP-docs/sap-btp-service-manager
  documentation_files_analyzed: 80+
  reference_files: 6
  template_files: 5
  status: production
---

# SAP BTP Service Manager Skill

Comprehensive skill for managing services across SAP BTP environments using SAP Service Manager.

---

## When to Use This Skill

Use this skill when working on tasks involving:

**Service Instance Management**:
- Creating service instances in Cloud Foundry, Kyma, Kubernetes, or other environments
- Provisioning services via SAP BTP cockpit, SMCTL CLI, or BTP CLI
- Configuring service parameters and labels
- Deleting service instances and managing lifecycle

**Service Binding Management**:
- Creating bindings to deliver credentials to applications
- Binding service instances to Cloud Foundry applications
- Creating service keys for external client access
- Managing Kubernetes ServiceBinding CRDs

**Platform & Broker Management**:
- Registering platforms (OSBAPI-enabled systems)
- Registering service brokers
- Managing broker catalogs and offerings
- Updating and deleting platform/broker registrations

**Authentication & Authorization**:
- Configuring OAuth2 client credentials
- Working with X.509 certificate authentication
- Assigning Subaccount Service Administrator role
- Managing service manager plans and scopes

**Kubernetes/Kyma Integration**:
- Setting up SAP BTP Service Operator
- Creating ServiceInstance and ServiceBinding CRDs
- Migrating from Service Catalog (svcat) to SAP BTP Service Operator
- Installing cert-manager for operator communication

**API & CLI Operations**:
- Using SMCTL command-line interface
- Using BTP CLI for service management
- Working with Service Manager REST APIs
- Filtering and querying service resources

**Troubleshooting**:
- Debugging service provisioning failures
- Resolving binding credential issues
- Handling rate limiting (HTTP 429)
- Checking async operation status

---

## Quick Start

### 1. Install SMCTL CLI

Download from GitHub releases:
```bash
# Download latest release
# https://github.com/Peripli/service-manager-cli/releases/latest

# Extract and add to PATH (Linux/Mac)
tar -xzf smctl-*.tar.gz
chmod +x smctl
sudo mv smctl /usr/local/bin/

# Verify installation
smctl --version
```

### 2. Login to Service Manager

```bash
# Password-based login (interactive)
smctl login -a https://service-manager.cfapps.<region>.hana.ondemand.com \
  --param subdomain=<your-subdomain>

# With 2FA: Append passcode to password (e.g., Password1234 + 5678 = Password12345678)

# Client credentials login
smctl login -a https://service-manager.cfapps.<region>.hana.ondemand.com \
  --param subdomain=<your-subdomain> \
  --auth-flow client-credentials \
  --client-id <clientid> \
  --client-secret <clientsecret>

# X.509 certificate login
smctl login -a https://service-manager.cfapps.<region>.hana.ondemand.com \
  --param subdomain=<your-subdomain> \
  --auth-flow client-credentials \
  --client-id <clientid> \
  --cert /path/to/cert.pem \
  --key /path/to/key.pem
```

### 3. Browse Marketplace

```bash
# List all available services
smctl marketplace

# Get details for specific service
smctl marketplace -s <service-name>
```

### 4. Create Service Instance

```bash
# Async mode (default)
smctl provision my-instance <service-offering> <plan-name>

# Sync mode (waits for completion)
smctl provision my-instance <service-offering> <plan-name> --mode sync

# With parameters
smctl provision my-instance <service-offering> <plan-name> \
  -c '{"key1":"value1","key2":"value2"}'
```

### 5. Create Service Binding

```bash
# Create binding
smctl bind my-instance my-binding

# With X.509 credentials
smctl bind my-instance my-binding -c '{"credential-type":"x509"}'

# Check binding credentials
smctl get-binding my-binding
```

---

## Core Concepts

### SAP Service Manager Architecture

SAP Service Manager is the **central registry for service brokers and platforms** in SAP BTP. It manages six primary resources:

| Resource | Description |
|----------|-------------|
| **Platforms** | OSBAPI-enabled systems where applications run |
| **Service Brokers** | Intermediaries advertising service catalogs |
| **Service Instances** | Individual instantiations of services |
| **Service Bindings** | Access credentials for service instances |
| **Service Plans** | Capability sets offered by services |
| **Service Offerings** | Service advertisements from brokers |

### Service Manager Plans

Three broker plans with different access levels:

| Plan | Purpose | Key Scopes |
|------|---------|------------|
| **subaccount-admin** | Full resource management | 10 scopes (manage + read) |
| **subaccount-audit** | Read-only monitoring | 6 scopes (read-only) |
| **container** | Isolated container management | 7 scopes (limited scope) |

### Roles

| Role | Description |
|------|-------------|
| **Subaccount Service Administrator** | Full CRUD on subaccount resources |
| **Subaccount Service Viewer** | Read-only access (Feature Set B) |

---

## Cloud Foundry Operations

### Create Service Instance

**Via Cockpit**:
1. Navigate to Services > Instances and Subscriptions
2. Click Create
3. Select service and plan
4. Choose Cloud Foundry as runtime
5. Select organization and space
6. Enter CLI-friendly name (max 32 chars, alphanumeric + . _ -)
7. Configure JSON parameters (optional)
8. Review and create

**Via CF CLI**:
```bash
# Create instance
cf create-service <service> <plan> <instance-name>

# With parameters
cf create-service <service> <plan> <instance-name> -c '{"param":"value"}'

# Check status
cf service <instance-name>
```

### Bind to Application

```bash
# Bind instance to app
cf bind-service <app-name> <instance-name>

# View credentials
cf env <app-name>
# Look in VCAP_SERVICES > service-manager
```

### Create Service Key (External Access)

```bash
# Create key
cf create-service-key <instance-name> <key-name>

# View key credentials
cf service-key <instance-name> <key-name>
```

### User-Provided Services

For services not in marketplace:
```bash
# Via cockpit: Cloud Foundry > Spaces > [space] > Services > Service Instances > Create User-Provided Service Instance
```

---

## Kubernetes Operations

### Prerequisites

- Kubernetes cluster with kubeconfig
- kubectl v1.7+
- Helm v3.1.2+
- SMCTL v1.10.1+
- SAP Service Manager subscription

### Setup SAP BTP Service Operator

**1. Install cert-manager**:
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml
```

**2. Create Service Manager Instance**:
```bash
# Create instance with service-operator-access plan
smctl provision sm-operator service-manager service-operator-access --mode sync

# Create binding
smctl bind sm-operator sm-operator-binding --mode sync

# Get credentials
smctl get-binding sm-operator-binding -o json
```

**3. Deploy Operator via Helm**:
```bash
# Add Helm repo
helm repo add sap-btp-operator https://sap.github.io/sap-btp-service-operator/

# Install with credentials
helm install sap-btp-operator sap-btp-operator/sap-btp-operator \
  --namespace sap-btp-operator --create-namespace \
  --set manager.secret.clientid=<clientid> \
  --set manager.secret.clientsecret=<clientsecret> \
  --set manager.secret.sm_url=<sm_url> \
  --set manager.secret.tokenurl=<url>/oauth/token
```

### Create ServiceInstance CRD

```yaml
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceInstance
metadata:
  name: my-service-instance
spec:
  serviceOfferingName: <service-offering>
  servicePlanName: <plan-name>
  externalName: my-service-instance-external
  parameters:
    key1: val1
    key2: val2
```

```bash
kubectl apply -f service-instance.yaml
kubectl get serviceinstances
```

### Create ServiceBinding CRD

```yaml
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceBinding
metadata:
  name: my-binding
spec:
  serviceInstanceName: my-service-instance
```

```bash
kubectl apply -f service-binding.yaml
kubectl get servicebindings
kubectl get secrets  # Credentials stored in secret with binding name
```

**Reference**: See `references/kubernetes-operator.md` for complete setup and migration guide.

---

## BTP CLI Operations

Alternative to SMCTL using the unified BTP CLI:

```bash
# Create instance
btp create services/instance \
  --subaccount <subaccount-id> \
  --service <service-name> \
  --plan <plan-id> \
  --parameters '{"key":"value"}' \
  --labels '{"env":["dev"]}'

# Get instance details
btp get services/instance <instance-id> \
  --subaccount <subaccount-id> \
  --show-parameters

# Create binding
btp create services/binding \
  --subaccount <subaccount-id> \
  --binding <binding-name> \
  --service-instance <instance-id>

# Platform management
btp list services/platform --subaccount <id>
btp register services/platform --subaccount <id> --name <name> --type <type>
btp unregister services/platform <platform-id> --subaccount <id>
```

---

## API Operations

### Retrieve OAuth2 Token

```bash
curl '<uaa_url>/oauth/token' -X POST \
  -H 'Accept: application/json' \
  -d 'grant_type=client_credentials&client_id=<clientid>&client_secret=<clientsecret>'
```

Response:
```json
{
  "access_token": "<token>",
  "token_type": "bearer",
  "expires_in": 43199,
  "scope": "<xsappname>.job.read <xsappname>.event.read"
}
```

### API Base URI

`https://service-manager.cfapps.<region>.hana.ondemand.com/v1/`

### Rate Limiting

Three concurrent tiers:

| Level | Scope | Limits |
|-------|-------|--------|
| 1 | All APIs | 10,000/hour, 1,000/minute |
| 2 | `/v1/service_bindings` | 6,000/hour, 600/minute |
| 2 | `/v1/service_offerings` | 1,000/hour, 100/minute |
| 2 | `/v1/service_plans` | 1,000/hour, 100/minute |
| 3 | CREATE `/v1/service_instances` | 50/minute |
| 3 | UPDATE `/v1/service_instances` | 6,000/hour, 600/minute |
| 3 | DELETE `/v1/service_instances` | 6,000/hour, 600/minute |

**HTTP 429** returned when exceeded with `Retry-After` header.

### Filtering

Use `fieldQuery` and `labelQuery` parameters:

```bash
# Field filtering
?fieldQuery=broker_id eq 'abc-123' and plan_name in ('small','medium')

# Label filtering
?labelQuery=environment eq 'dev'
```

**Operators**: `eq`, `ne`, `gt`, `ge`, `lt`, `le`, `in`, `notin`, `contains`, `en` (equal or null)

**Reference**: See `references/rate-limiting-filtering.md` for complete details.

---

## SMCTL Command Reference

### Authentication
| Command | Description |
|---------|-------------|
| `smctl login` | Authenticate to Service Manager |
| `smctl logout` | End session |

### Instances
| Command | Alias | Description |
|---------|-------|-------------|
| `smctl provision` | - | Create service instance |
| `smctl deprovision` | - | Delete service instance |
| `smctl list-instances` | `li` | List all instances |
| `smctl get-instance` | - | Get instance details |

### Bindings
| Command | Alias | Description |
|---------|-------|-------------|
| `smctl bind` | - | Create service binding |
| `smctl unbind` | - | Delete service binding |
| `smctl list-bindings` | `lsb` | List all bindings |
| `smctl get-binding` | - | Get binding details |

### Brokers
| Command | Alias | Description |
|---------|-------|-------------|
| `smctl register-broker` | `rb` | Register service broker |
| `smctl update-broker` | - | Update broker |
| `smctl list-brokers` | - | List brokers |
| `smctl delete-broker` | - | Remove broker |

### Platforms
| Command | Alias | Description |
|---------|-------|-------------|
| `smctl register-platform` | `rp` | Register platform |
| `smctl update-platform` | - | Update platform |
| `smctl list-platforms` | - | List platforms |
| `smctl delete-platform` | - | Remove platform |

### Marketplace
| Command | Alias | Description |
|---------|-------|-------------|
| `smctl marketplace` | `m` | List offerings and plans |

### Common Flags
| Flag | Description |
|------|-------------|
| `--mode sync/async` | Execution mode (default: async) |
| `-c, --parameters` | JSON configuration |
| `-o, --output` | Format: json, yaml, text |
| `-v, --verbose` | Detailed output |
| `--config` | Custom config path |

**Reference**: See `references/smctl-commands.md` for complete command reference.

---

## Common Operations

### Check Async Operation Status

```bash
# Get operation URL from provision/bind response
smctl status /v1/service_instances/<id>/operations/<op-id>
```

API:
```
GET /v1/{resourceType}/{resourceID}/operations/{operationID}
```

Response states: `in progress`, `succeeded`, `failed`

### Delete Service Instance

**Prerequisites**:
1. Remove all service bindings
2. Remove all service keys
3. Instance not bound to applications

```bash
# Force delete without confirmation
smctl deprovision my-instance -f

# Sync mode
smctl deprovision my-instance --mode sync
```

**Note**: Kyma/Kubernetes instances cannot be deleted from BTP cockpit.

### Assign Administrator Role

1. Navigate to subaccount > Security > Trust Configuration > SAP ID Service
2. Enter user email
3. Click Show Assignments > Add User
4. Assign Role Collection > Select "Subaccount Service Administrator"

---

## Troubleshooting

### Issue: Cannot see service in marketplace

**Check**:
1. Service entitlement added to subaccount?
2. Quota assigned (enterprise accounts)?
3. Correct region selected?

### Issue: Instance creation fails

**Check**:
1. Valid plan selected?
2. Parameters JSON syntax correct?
3. Quota not exceeded?
4. Required dependencies provisioned?

**Debug**:
```bash
smctl get-instance <name> -o json
# Check "last_operation" for error details
```

### Issue: Rate limit exceeded (HTTP 429)

**Solution**:
1. Check `Retry-After` header
2. Implement exponential backoff
3. Batch operations where possible
4. Consider caching responses

### Issue: Binding credentials missing

**Check**:
1. Binding completed successfully?
2. Correct binding name referenced?
3. Secret created (Kubernetes)?

```bash
# SMCTL
smctl get-binding <name> -o json

# Kubernetes
kubectl get secrets <binding-name> -o yaml
```

### Issue: X.509 authentication fails

**Check**:
1. Certificate not expired?
2. Correct certificate/key pair?
3. Certificate chain complete?
4. Client ID matches certificate?

---

## Best Practices

### 1. Use Sync Mode for Scripts
```bash
smctl provision my-instance service plan --mode sync
```

### 2. Label Resources
```bash
smctl provision my-instance service plan \
  -c '{}' \
  --labels '{"environment":"production","team":"platform"}'
```

### 3. Use Service Keys for External Access
Instead of binding to apps, create service keys for external clients.

### 4. Implement Retry Logic
For async operations, poll status with exponential backoff.

### 5. Choose Appropriate Plans
- `subaccount-admin`: Full management
- `subaccount-audit`: Read-only monitoring
- `container`: Isolated per-instance access

### 6. Secure Credentials
- Rotate service keys periodically
- Use X.509 for production
- Store credentials in secret managers

---

## Templates

Ready-to-use templates in `templates/` directory:

1. **service-instance-cf.json** - Cloud Foundry instance parameters
2. **service-binding-cf.json** - Cloud Foundry binding parameters
3. **service-instance-k8s.yaml** - Kubernetes ServiceInstance CRD
4. **service-binding-k8s.yaml** - Kubernetes ServiceBinding CRD
5. **oauth-token-request.sh** - OAuth2 token retrieval script

---

## Reference Files

Detailed documentation in `references/` directory:

1. **api-reference.md** - Complete API endpoints and operations
2. **smctl-commands.md** - Full SMCTL CLI reference with all flags
3. **btp-cli-commands.md** - Full BTP CLI reference
4. **kubernetes-operator.md** - Service Operator setup, CRDs, migration
5. **rate-limiting-filtering.md** - Rate limits and query operators
6. **roles-permissions.md** - Plans, roles, and scopes
7. **service-catalog-legacy.md** - Legacy svcat and broker proxy setup (deprecated)

---

## Official Documentation Links

### Primary Resources
- **GitHub Docs**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs
- **SAP Help Portal**: https://help.sap.com/docs/service-manager
- **SMCTL Releases**: https://github.com/Peripli/service-manager-cli/releases
- **Service Operator**: https://github.com/SAP/sap-btp-service-operator

### API Documentation
- **Swagger UI**: `https://service-manager.cfapps.<region>.hana.ondemand.com/swaggerui/swagger-ui.html`
- **Regions**: https://help.sap.com/docs/btp/sap-business-technology-platform/regions-and-api-endpoints-available-for-cloud-foundry-environment

### Related Documentation
- **BTP Cockpit**: https://cockpit.btp.cloud.sap/
- **cert-manager**: https://cert-manager.io/docs/installation/kubernetes/
- **Kyma Services**: https://help.sap.com/docs/btp/sap-business-technology-platform/using-services-in-kyma-environment

---

## Instructions for Claude

When using this skill:

1. **Identify the environment** - Cloud Foundry, Kyma, Kubernetes, or Other
2. **Choose appropriate tool** - SMCTL, BTP CLI, CF CLI, kubectl, or cockpit
3. **Use correct authentication** - OAuth2, X.509, or interactive
4. **Check rate limits** - Implement retry logic for bulk operations
5. **Verify async completion** - Poll status for provision/bind operations
6. **Reference templates** - Use provided templates for common operations
7. **Check reference files** - Detailed information in references/ directory

**For Cloud Foundry**: Use `cf` CLI or cockpit
**For Kubernetes**: Use ServiceInstance/ServiceBinding CRDs
**For Other environments**: Use SMCTL or BTP CLI
**For API access**: Retrieve OAuth2 token first

When troubleshooting:
- Check operation status for async operations
- Verify credentials and permissions
- Review rate limits if getting 429 errors
- Check prerequisites (entitlements, quotas, dependencies)

---

**License**: MIT
**Version**: 1.0.0
**Maintained by**: SAP Skills Maintainers
**Repository**: https://github.com/secondsky/sap-skills
