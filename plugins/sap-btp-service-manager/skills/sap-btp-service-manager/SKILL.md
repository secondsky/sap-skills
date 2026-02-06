---
name: sap-btp-service-manager
description: |
  This skill provides comprehensive knowledge for SAP Service Manager on SAP Business Technology Platform (BTP). It should be used when managing service instances, bindings, brokers, and platforms across Cloud Foundry, Kyma, Kubernetes, and other environments. Use when provisioning services via SMCTL CLI, BTP CLI, or REST APIs, configuring OAuth2 authentication, working with the SAP BTP Service Operator in Kubernetes, troubleshooting service consumption issues, or implementing cross-environment service management.

  Keywords: SAP Service Manager, BTP, service instances, service bindings, SMCTL, service broker, OSBAPI, Cloud Foundry, Kyma, Kubernetes, service-manager, service-operator-access, subaccount-admin, OAuth2, X.509, service marketplace, service plans, rate limiting, cf create-service, btp create services/instance, ServiceInstance CRD, ServiceBinding CRD
license: GPL-3.0
metadata:
  version: 1.1.1
  last_verified: 2025-11-27
  documentation_source: "https://github.com/SAP-docs/sap-btp-service-manager"
  documentation_files_analyzed: 80+
  reference_files: 6
  template_files: 5
  status: production
  important_notes: SMCLI repository archived (2025-09-30) - Go installation recommended
---

# SAP BTP Service Manager Skill

## Related Skills

- **sap-btp-cloud-platform**: Use for platform fundamentals, service understanding, and BTP integration
- **sap-btp-best-practices**: Use for production deployment patterns and service management guidelines
- **sap-btp-connectivity**: Use for destination configuration when services require connectivity setup
- **sap-cap-capire**: Use for CAP service provisioning and binding management

Comprehensive skill for managing services across SAP BTP environments using SAP Service Manager.

---

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Cloud Foundry Operations](#cloud-foundry-operations)
- [Kubernetes Operations](#kubernetes-operations)
- [SMCTL CLI Reference](#smctl-cli-reference)
- [API Reference](#api-reference)
- [Bundled Resources](#bundled-resources)

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

**⚠️ Important**: The SMCLI repository was archived on September 30, 2025. While the tool remains functional, consider migration strategies for long-term SAP BTP workflows.

**Recommended Method (Go)**:
```bash
# Install via Go (preferred approach)
go install github.com/Peripli/service-manager-cli@latest

# Add to PATH (if not already)
export PATH=$PATH:$(go env GOPATH)/bin
smctl --version
```

**Alternative Method (Prebuilt Binary)**:
```bash
# Download from: [https://github.com/Peripli/service-manager-cli/releases/latest](https://github.com/Peripli/service-manager-cli/releases/latest)
tar -xzf smctl-*.tar.gz && chmod +x smctl
sudo mv smctl /usr/local/bin/ && smctl --version
```

**Note**: While the prebuilt binary method remains functional, the Go installation approach is officially recommended. Consider evaluating SAP's native BTP CLI as an alternative for new deployments.

### 2. Login
```bash
# Interactive login
smctl login -a [https://service-manager.cfapps.<region>.hana.ondemand.com](https://service-manager.cfapps.<region>.hana.ondemand.com) \
  --param subdomain=<subdomain>

# Client credentials
smctl login -a [https://service-manager.cfapps.<region>.hana.ondemand.com](https://service-manager.cfapps.<region>.hana.ondemand.com) \
  --param subdomain=<subdomain> --auth-flow client-credentials \
  --client-id <id> --client-secret <secret>
```

### 3. Basic Operations
```bash
# Browse services
smctl marketplace

# Create instance (async)
smctl provision my-instance <service> <plan>

# Create binding
smctl bind my-instance my-binding
```

---

## Core Concepts

### Service Manager Architecture

SAP Service Manager is the **central registry for service brokers and platforms** in SAP BTP.

**Primary Resources**:
- **Platforms** - OSBAPI-enabled systems where applications run
- **Service Brokers** - Intermediaries advertising service catalogs
- **Service Instances** - Individual service instantiations
- **Service Bindings** - Access credentials for instances
- **Service Plans** - Capability sets offered by services
- **Service Offerings** - Service advertisements from brokers

### Service Manager Plans

| Plan | Purpose | Scopes |
|------|---------|--------|
| **subaccount-admin** | Full management | 10 scopes (manage + read) |
| **subaccount-audit** | Read-only monitoring | 6 scopes |
| **container** | Isolated management | 7 scopes |

### Roles

- **Subaccount Service Administrator** - Full CRUD on resources
- **Subaccount Service Viewer** - Read-only access (Feature Set B)

---

## Cloud Foundry Operations

### Service Instance & Binding

**Via Cockpit**: Services > Instances > Create > Select service/plan > Cloud Foundry runtime

**Via CF CLI**:
```bash
# Create instance
cf create-service <service> <plan> <instance-name>

# Bind to app
cf bind-service <app-name> <instance-name>

# Create service key (external access)
cf create-service-key <instance-name> <key-name>
```

---

## Kubernetes Operations

### Prerequisites
- Kubernetes cluster with kubectl v1.7+
- Helm v3.1.2+
- SMCTL v1.10.1+

### Setup Service Operator

**1. Install cert-manager**:
```bash
kubectl apply -f [https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml](https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml)
```

**2. Create Service Manager resources**:
```bash
smctl provision sm-operator service-manager service-operator-access --mode sync
smctl bind sm-operator sm-operator-binding --mode sync
smctl get-binding sm-operator-binding -o json
```

**3. Deploy operator**:
```bash
helm repo add sap-btp-operator [https://sap.github.io/sap-btp-service-operator/](https://sap.github.io/sap-btp-service-operator/)
helm install sap-btp-operator sap-btp-operator/sap-btp-operator \
  --namespace sap-btp-operator --create-namespace \
  --set manager.secret.clientid=<id> \
  --set manager.secret.clientsecret=<secret>
```

### Create Resources

**ServiceInstance**:
```yaml
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceInstance
metadata:
  name: my-service-instance
spec:
  serviceOfferingName: <service-offering>
  servicePlanName: <plan-name>
```

**ServiceBinding**:
```yaml
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceBinding
metadata:
  name: my-binding
spec:
  serviceInstanceName: my-service-instance
```

**Reference**: See `references/kubernetes-operator.md` for complete guide.

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

`[https://service-manager.cfapps.<region>.hana.ondemand.com/v1/`](https://service-manager.cfapps.<region>.hana.ondemand.com/v1/`)

### Rate Limiting

Three concurrent tiers enforced:
- **Level 1**: All APIs - 10,000/hour, 1,000/minute
- **Level 2**: Resource-specific - 1,000-6,000/hour
- **Level 3**: Instance operations - 50-6,000/hour

HTTP 429 returned with `Retry-After` header when limits exceeded.

### Filtering

Query parameters:
- `fieldQuery` - Filter by resource attributes
- `labelQuery` - Filter by resource labels
- Operators: `eq`, `ne`, `in`, `contains`, etc.

**Reference**: See `references/rate-limiting-filtering.md` for complete rate limits and filtering details.

---

## SMCTL Command Reference

### Key Commands
| Category | Commands | Description |
|----------|----------|-------------|
| **Authentication** | `login`, `logout` | Manage sessions |
| **Instances** | `provision`, `deprovision`, `list-instances` | Service instance lifecycle |
| **Bindings** | `bind`, `unbind`, `list-bindings` | Service binding management |
| **Brokers** | `register-broker`, `update-broker` | Service broker operations |
| **Platforms** | `register-platform`, `list-platforms` | Platform registration |
| **Marketplace** | `marketplace` | Browse service offerings |

### Common Flags
- `--mode sync/async` - Execution mode (default: async)
- `-c, --parameters` - JSON configuration
- `-o, --output` - Output format (json, yaml, text)
- `-v, --verbose` - Detailed output

**Reference**: See `references/smctl-commands.md` for complete command reference with all flags and examples.

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

## Bundled Resources

### Templates (5 files)
Ready-to-use templates in `templates/` directory:
- **service-instance-cf.json** - Cloud Foundry instance parameters
- **service-binding-cf.json** - Cloud Foundry binding parameters
- **service-instance-k8s.yaml** - Kubernetes ServiceInstance CRD
- **service-binding-k8s.yaml** - Kubernetes ServiceBinding CRD
- **oauth-token-request.sh** - OAuth2 token retrieval script

### Reference Documentation (7 files)
Detailed documentation in `references/` directory:
1. **api-reference.md** - Complete API endpoints, operations, and examples
2. **smctl-commands.md** - Full SMCTL CLI reference with all flags and usage
3. **btp-cli-commands.md** - Comprehensive BTP CLI command reference
4. **kubernetes-operator.md** - Service Operator setup, CRDs, migration guide
5. **rate-limiting-filtering.md** - Rate limits, filtering, and best practices
6. **roles-permissions.md** - Plans, roles, scopes, and authorization details
7. **service-catalog-legacy.md** - Legacy svcat and broker proxy setup (deprecated)

### Quick Reference Templates



---

## Official Documentation Links

### Primary Resources
- **GitHub Docs**: [https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs](https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs)
- **SAP Help Portal**: [https://help.sap.com/docs/service-manager](https://help.sap.com/docs/service-manager)
- **SMCTL Releases**: [https://github.com/Peripli/service-manager-cli/releases](https://github.com/Peripli/service-manager-cli/releases)
- **Service Operator**: [https://github.com/SAP/sap-btp-service-operator](https://github.com/SAP/sap-btp-service-operator)

### API Documentation
- **Swagger UI**: `[https://service-manager.cfapps.<region>.hana.ondemand.com/swaggerui/swagger-ui.html`](https://service-manager.cfapps.<region>.hana.ondemand.com/swaggerui/swagger-ui.html`)
- **Regions**: [https://help.sap.com/docs/btp/sap-business-technology-platform/regions-and-api-endpoints-available-for-cloud-foundry-environment](https://help.sap.com/docs/btp/sap-business-technology-platform/regions-and-api-endpoints-available-for-cloud-foundry-environment)

### Related Documentation
- **BTP Cockpit**: [https://cockpit.btp.cloud.sap/](https://cockpit.btp.cloud.sap/)
- **cert-manager**: [https://cert-manager.io/docs/installation/kubernetes/](https://cert-manager.io/docs/installation/kubernetes/)
- **Kyma Services**: [https://help.sap.com/docs/btp/sap-business-technology-platform/using-services-in-kyma-environment](https://help.sap.com/docs/btp/sap-business-technology-platform/using-services-in-kyma-environment)

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

**License**: GPL-3.0
**Version**: 1.1.1
**Maintained by**: E.J.
**Repository**: [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
