# SAP BTP Service Manager Skill

**Status**: Production Ready
**Last Updated**: 2025-11-22
**Version**: 1.0.0

---

## Overview

Comprehensive Claude Code skill for managing SAP BTP services across Cloud Foundry, Kyma, Kubernetes, and other environments using SAP Service Manager.

This skill provides detailed knowledge for:
- Service instance and binding lifecycle management
- SMCTL and BTP CLI command reference
- Service Manager REST API operations
- Kubernetes Service Operator setup and configuration
- OAuth2 authentication (including X.509 certificates)
- Rate limiting and query filtering
- Cross-environment service consumption

---

## Auto-Trigger Keywords

### Primary Keywords
- SAP Service Manager
- BTP service instance
- BTP service binding
- SMCTL CLI
- service-manager service
- service-operator-access plan

### Secondary Keywords
- smctl login
- smctl provision
- smctl bind
- smctl marketplace
- btp create services/instance
- btp create services/binding
- ServiceInstance CRD
- ServiceBinding CRD
- SAP BTP Service Operator
- service broker registration
- platform registration
- subaccount-admin plan
- subaccount-audit plan
- container plan

### Technology Keywords
- OSBAPI
- Open Service Broker API
- cf create-service
- cf bind-service
- cf create-service-key
- kubectl apply serviceinstance
- kubectl apply servicebinding
- cert-manager BTP
- Helm sap-btp-operator

### Error Keywords
- HTTP 429 rate limit service manager
- service instance creation failed BTP
- service binding credentials missing
- smctl login failed
- OAuth2 token service manager
- X.509 certificate BTP authentication
- service-operator-access plan not found
- svcat to BTP migration

---

## What This Skill Does

1. **Service Instance Management**
   - Create, update, delete service instances
   - Configure parameters and labels
   - Handle async operations

2. **Service Binding Management**
   - Create bindings for applications
   - Generate service keys
   - Configure X.509 credentials

3. **Platform & Broker Management**
   - Register platforms (Kubernetes, custom)
   - Register service brokers
   - Manage offerings and plans

4. **CLI Command Reference**
   - Complete SMCTL command guide
   - BTP CLI service commands
   - CF CLI integration

5. **Kubernetes Integration**
   - SAP BTP Service Operator setup
   - ServiceInstance/ServiceBinding CRDs
   - Migration from Service Catalog (svcat)

6. **API Reference**
   - All REST API endpoints
   - Rate limiting details
   - Query filtering operators

---

## Known Issues Prevented

| Issue | Prevention | Source |
|-------|------------|--------|
| Rate limit (429) errors | Document all three rate limit tiers | [rate-limiting-97be679.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/rate-limiting-97be679.md) |
| Service not in marketplace | Explain entitlement/quota requirements | [creating-service-instances-in-cloud-foundry-6d6846d.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/creating-service-instances-in-cloud-foundry-6d6846d.md) |
| X.509 authentication fails | Provide certificate configuration examples | [bind-f53ff26.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/bind-f53ff26.md) |
| Async operation timeout | Explain sync/async modes and status polling | [provision-b327b66.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/provision-b327b66.md) |
| K8s operator not starting | Include cert-manager prerequisite | [setup-e977f23.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/setup-e977f23.md) |
| Instance deletion fails | Document binding/key removal prerequisites | [deleting-service-instances-753463e.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/deleting-service-instances-753463e.md) |
| Invalid filter query | Provide operator reference with examples | [filtering-parameters-and-operators-3331c6e.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/filtering-parameters-and-operators-3331c6e.md) |
| 2FA login issues | Explain password+passcode concatenation | [logging-in-to-sap-service-manager-22dea57.md](https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/logging-in-to-sap-service-manager-22dea57.md) |

---

## When to Use This Skill

**Use when:**
- Creating service instances on SAP BTP
- Binding services to applications
- Setting up service access from Kubernetes
- Managing service brokers and platforms
- Troubleshooting service provisioning
- Automating service management via CLI/API
- Configuring OAuth2/X.509 authentication

**Do NOT use when:**
- Working with specific SAP service configurations (use service-specific skills)
- Managing SAP BTP account/subaccount settings (use btp-account skill)
- Deploying applications (use CF/Kyma deployment skills)

---

## Skill Structure

```
sap-btp-service-manager/
├── SKILL.md                          # Main skill content
├── README.md                         # This file
├── PROGRESS_TRACKING.md              # Documentation coverage tracking
├── references/
│   ├── api-reference.md              # Complete API endpoints
│   ├── smctl-commands.md             # Full SMCTL CLI reference
│   ├── btp-cli-commands.md           # Full BTP CLI reference
│   ├── kubernetes-operator.md        # Service Operator guide
│   ├── rate-limiting-filtering.md    # Limits and query operators
│   ├── roles-permissions.md          # Plans, roles, scopes
│   └── service-catalog-legacy.md     # Legacy svcat/broker proxy (deprecated)
└── templates/
    ├── service-instance-cf.json      # CF instance parameters
    ├── service-binding-cf.json       # CF binding parameters
    ├── service-instance-k8s.yaml     # K8s ServiceInstance CRD
    ├── service-binding-k8s.yaml      # K8s ServiceBinding CRD
    └── oauth-token-request.sh        # OAuth2 token script
```

---

## Token Efficiency

| Scenario | Without Skill | With Skill | Savings |
|----------|---------------|------------|---------|
| SMCTL setup & login | ~8k tokens | ~2k tokens | ~75% |
| K8s operator setup | ~12k tokens | ~4k tokens | ~67% |
| Service instance creation | ~5k tokens | ~1.5k tokens | ~70% |
| API filtering query | ~4k tokens | ~1k tokens | ~75% |
| **Average** | **~7k tokens** | **~2k tokens** | **~70%** |

---

## Quick Usage

```bash
# Install SMCTL
# Download from: https://github.com/Peripli/service-manager-cli/releases

# Login
smctl login -a https://service-manager.cfapps.eu10.hana.ondemand.com \
  --param subdomain=my-subaccount

# List available services
smctl marketplace

# Create service instance
smctl provision my-instance xsuaa application --mode sync

# Create binding
smctl bind my-instance my-binding --mode sync

# View binding credentials
smctl get-binding my-binding -o json
```

---

## Documentation Sources

- **GitHub Docs**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs
- **SAP Help Portal**: https://help.sap.com/docs/service-manager
- **Service Operator**: https://github.com/SAP/sap-btp-service-operator
- **SMCTL Releases**: https://github.com/Peripli/service-manager-cli/releases
- **Swagger API**: `https://service-manager.cfapps.<region>.hana.ondemand.com/swaggerui/swagger-ui.html`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-22 | Initial release |

---

## Maintenance

**Quarterly Tasks**:
- Verify SMCTL CLI version compatibility
- Check for new API endpoints
- Update rate limits if changed
- Test Kubernetes operator with latest Helm chart
- Review SAP Help Portal for updates

**Next Review**: 2026-02-22

---

## License

MIT

---

## Contributing

Repository: https://github.com/secondsky/sap-skills

Follow the skill creation guidelines in [QUICK_WORKFLOW.md](../../QUICK_WORKFLOW.md).
