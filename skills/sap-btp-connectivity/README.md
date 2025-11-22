# SAP BTP Connectivity Skill

![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-green)
![Last Updated: 2025-11-22](https://img.shields.io/badge/Last%20Updated-2025--11--22-blue)
![Documentation: 383 files](https://img.shields.io/badge/Documentation-383%20files-orange)

---

## Overview

This skill provides comprehensive knowledge for SAP BTP Connectivity, covering all components needed for secure cloud-to-cloud, cloud-to-on-premise, and on-premise-to-cloud connectivity.

### Components Covered

- **Destination Service**: Manage connection metadata, authentication, routing
- **Connectivity Service**: Enable Kubernetes on-premise connectivity
- **Cloud Connector**: Secure tunnel for on-premise systems
- **Connectivity Proxy**: Kubernetes component for on-premise access
- **Transparent Proxy**: Unified destination access in Kubernetes

---

## Auto-Trigger Keywords

### Primary Keywords
- SAP BTP Connectivity
- Destination Service
- Cloud Connector
- Connectivity Proxy
- Transparent Proxy
- Principal Propagation

### Secondary Keywords
- SAP BTP destination
- on-premise connectivity
- hybrid connectivity
- OAuth2SAMLBearerAssertion
- OAuth2ClientCredentials
- PrincipalPropagation
- service channel
- SOCKS5 proxy
- RFC destination
- LDAP destination
- TCP destination
- Kyma connectivity
- Cloud Foundry connectivity
- reverse proxy tunnel
- virtual host mapping
- access control configuration

### Error-Based Keywords
- HTTP 405 connectivity proxy
- HTTP 407 proxy authentication
- HTTP 503 Cloud Connector
- destination not found
- principal propagation failed
- Cloud Connector connection failed
- cannot connect to subaccount
- access denied resource

---

## What This Skill Does

### Provides Knowledge For

1. **Destination Configuration**
   - HTTP, RFC, LDAP, MAIL, TCP destinations
   - 17+ authentication types
   - Internet, OnPremise, PrivateLink proxy types

2. **Cloud Connector Setup**
   - Installation on Windows, Linux, macOS
   - Access control configuration
   - High availability (master-shadow)
   - Security best practices

3. **Kubernetes/Kyma Connectivity**
   - Connectivity Proxy installation and configuration
   - Transparent Proxy setup and usage
   - Destination Custom Resources
   - Service channels

4. **Authentication Flows**
   - OAuth2ClientCredentials
   - OAuth2SAMLBearerAssertion
   - OAuth2JWTBearer
   - Principal Propagation
   - Client certificates

5. **REST API Usage**
   - Destination Service endpoints
   - Token retrieval
   - CRUD operations
   - Multitenancy support

---

## When to Use This Skill

### Use When

- Creating or modifying BTP destinations
- Setting up Cloud Connector for on-premise access
- Implementing user propagation between systems
- Deploying connectivity in Kubernetes/Kyma
- Troubleshooting connectivity errors
- Configuring OAuth authentication for destinations
- Setting up high availability for Cloud Connector
- Implementing multitenancy for destinations

### Do Not Use When

- Configuring SAP Integration Suite flows (use integration-suite skill)
- Setting up BTP identity and access (use btp-iam skill)
- Developing CAP applications (use sap-cap skill)
- Working with SAPUI5/Fiori (use sapui5 skill)

---

## Known Issues Prevented

| Issue | Without Skill | With Skill | Source |
|-------|---------------|------------|--------|
| 405 on Connectivity Proxy | Common | Prevented | HTTP vs HTTPS usage |
| Missing Proxy-Authorization | Common | Prevented | Header configuration |
| Cloud Connector split-brain | Possible | Prevented | HA best practices |
| Token caching failures | Possible | Prevented | Resilience patterns |
| Principal propagation errors | Common | Prevented | JWT header guidance |
| Certificate expiration | Possible | Prevented | Renewal procedures |

---

## Token Efficiency Metrics

| Scenario | Without Skill | With Skill | Savings |
|----------|---------------|------------|---------|
| Destination setup | ~8k tokens | ~2.5k tokens | ~69% |
| Cloud Connector config | ~10k tokens | ~3k tokens | ~70% |
| Kubernetes proxy setup | ~12k tokens | ~4k tokens | ~67% |
| Troubleshooting | ~6k tokens | ~2k tokens | ~67% |
| **Average** | **~9k tokens** | **~3k tokens** | **~67%** |

---

## Quick Usage Examples

### Create HTTP Destination

```
"Create an HTTP destination named 'my-api' with OAuth2ClientCredentials authentication"
```

### Set Up Cloud Connector

```
"How do I install and configure Cloud Connector for Windows?"
```

### Deploy Connectivity Proxy

```
"Help me deploy Connectivity Proxy in my Kubernetes cluster"
```

### Troubleshoot Connection

```
"I'm getting HTTP 503 when connecting to my on-premise system"
```

---

## Skill Contents

```
sap-btp-connectivity/
├── SKILL.md                              # Main skill file (~600 lines)
├── README.md                             # This file
├── PROGRESS_TRACKING.md                  # Documentation extraction status
├── references/
│   ├── http-destinations.md              # HTTP destination properties
│   ├── rfc-destinations.md               # RFC destination & pooling
│   ├── mail-tcp-ldap-destinations.md     # Mail, TCP, LDAP config
│   ├── authentication-types.md           # All 17+ auth types
│   ├── cloud-connector.md                # Cloud Connector setup
│   ├── kubernetes-connectivity.md        # Kubernetes proxies
│   ├── destination-service-api.md        # REST API reference
│   ├── advanced-configuration.md         # MTA, chaining, ZTIS
│   ├── java-sdk-development.md           # Java APIs, JCo, SAP Cloud SDK
│   └── troubleshooting.md                # Common issues
└── templates/
    ├── destination-http-oauth.json       # HTTP destination templates
    ├── destination-onpremise.json        # On-premise templates
    ├── connectivity-proxy-values.yaml    # Helm values
    └── transparent-proxy-values.yaml     # Helm values
```

---

## Documentation Sources

### Official SAP Documentation
- **Main**: https://help.sap.com/docs/connectivity
- **GitHub**: https://github.com/SAP-docs/btp-connectivity (383 files)

### SAP Business Accelerator Hub
- **Destination API**: https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination

### Release Notes
- **What's New**: https://help.sap.com/whats-new/cf0cb2cb149647329b5d02aa96303f56

---

## Version Information

| Component | Documented Version | Last Verified |
|-----------|-------------------|---------------|
| Cloud Connector | 2.x | 2025-11-22 |
| Connectivity Proxy | Latest | 2025-11-22 |
| Transparent Proxy | 1.9.0 | 2025-11-22 |
| Destination Service | v1 API | 2025-11-22 |

---

## Maintenance Schedule

- **Quarterly**: Check for SAP documentation updates
- **On Release**: Update for major version changes
- **Continuous**: Address reported issues

---

## Related Skills

- `sap-btp-setup`: BTP account and subaccount configuration
- `sap-cap`: Cloud Application Programming Model
- `sap-integration-suite`: Integration flows
- `sap-btp-security`: IAM and authentication

---

**Last Updated**: 2025-11-22
**Next Review**: 2026-02-22
**Maintainer**: SAP Skills Team
