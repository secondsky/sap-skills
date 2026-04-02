---
name: sap-btp-connectivity
description: "SAP BTP Connectivity skill covering Destination Service, Connectivity Service, Cloud Connector, Connectivity Proxy, and Transparent Proxy for Kubernetes. Use when configuring destinations (HTTP, RFC, LDAP, MAIL, TCP), setting up cloud-to-on-premise connectivity, implementing OAuth and principal propagation, deploying connectivity proxies in Kubernetes/Kyma, troubleshooting connectivity errors (405, 407, 503), or configuring multitenancy."
license: GPL-3.0
metadata:
  version: "1.1.0"
  last_verified: "2025-11-27"
  keywords: [SAP BTP, Connectivity, Destination Service, Cloud Connector, Connectivity Proxy, Transparent Proxy, Kyma, Kubernetes, OAuth, Principal Propagation, RFC, LDAP, on-premise, hybrid connectivity, service channels, SOCKS5, reverse proxy, tunnel]
---

# SAP BTP Connectivity Skill

## Related Skills

- **sap-btp-cloud-platform**: Use for platform fundamentals, BTP account setup, and integration patterns
- **sap-btp-best-practices**: Use for implementation guidance, security best practices, and production deployment
- **sap-cap-capire**: Use for CAP service connectivity, destination consumption, and secure API access
- **sap-fiori-tools**: Use for configuring Fiori app destinations and frontend connectivity
- **sap-abap**: Use when connecting to ABAP systems via RFC or implementing principal propagation

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Connectivity Scenarios](#connectivity-scenarios)
4. [Destination Types](#destination-types)
5. [Authentication Configuration](#authentication-configuration)
6. [Cloud Connector Setup](#cloud-connector-setup)
7. [Kubernetes/Kyma Connectivity](#kuberneteskyma-connectivity)
8. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
9. [Security Best Practices](#security-best-practices)
10. [Critical Rules](#critical-rules)
11. [Bundled Resources](#bundled-resources)

---

## Overview

SAP BTP Connectivity provides secure access from SAP BTP applications to remote services across cloud, on-premise, and VPC environments.

### Core Components

| Component | Purpose |
|-----------|---------|
| **Destination Service** | Manages connection metadata, authentication, routing |
| **Connectivity Service** | Enables Kubernetes workloads via Cloud Connector |
| **Cloud Connector** | Reverse proxy for secure on-premise tunneling |
| **Connectivity Proxy** | Kubernetes component for on-premise access |
| **Transparent Proxy** | Kubernetes component for unified destination access |

**Supported Environments**: Cloud Foundry, ABAP Environment, Kyma  
**Supported Protocols**: HTTP/HTTPS, RFC, TCP (SOCKS5), LDAP/LDAPS, Mail

---

## Quick Start

### Create HTTP Destination (Cloud Foundry)

1. Navigate: **Connectivity > Destinations** in BTP Cockpit
2. Select: **Create > From Scratch**
3. Configure:
   ```
   Name: my-destination
   Type: HTTP
   URL: [https://api.example.com](https://api.example.com)
   ProxyType: Internet
   Authentication: OAuth2ClientCredentials
   clientId: <your-client-id>
   clientSecret: <your-client-secret>
   tokenServiceURL: [https://auth.example.com/oauth/token](https://auth.example.com/oauth/token)
   ```

### Set Up Cloud Connector

1. Download from [SAP Tools](https://tools.hana.ondemand.com/#cloud)
2. Access: `[https://localhost:8443`](https://localhost:8443`)
3. Login: `Administrator` / `manage` (change immediately)
4. Add subaccount connection

### Access Destination in Application (Node.js)

```javascript
const { getDestination } = require('@sap-cloud-sdk/connectivity');
const destination = await getDestination({ destinationName: 'my-destination' });
```

---

## Connectivity Scenarios

### Cloud-to-Cloud
```
ProxyType: Internet
Authentication: OAuth2ClientCredentials | OAuth2SAMLBearerAssertion
```

### Cloud-to-On-Premise
```
ProxyType: OnPremise
Authentication: BasicAuthentication | PrincipalPropagation
```
Requires Cloud Connector installation in on-premise network.

### On-Premise-to-Cloud (Service Channels)
For on-premise systems accessing SAP BTP services via Cloud Connector.

---

## Destination Types

| Type | Use Case | ProxyType | Common Authentication |
|------|----------|-----------|----------------------|
| **HTTP** | REST/OData APIs | Internet/OnPremise | OAuth2, Basic, Certificates |
| **RFC** | SAP systems | OnPremise | Basic, PrincipalPropagation |
| **LDAP** | Directory services | Internet | Basic, NoAuth |
| **MAIL** | Email protocols | Internet | Basic, NoAuth |
| **TCP** | Generic TCP | OnPremise | Basic |

**Detailed configuration**: See `references/http-destinations.md`, `references/rfc-destinations.md`, `references/mail-tcp-ldap-destinations.md`

---

## Authentication Configuration

### OAuth2ClientCredentials (Service-to-Service)
```
Authentication: OAuth2ClientCredentials
clientId: <client-id>
clientSecret: <client-secret>
tokenServiceURL: [https://auth.example.com/oauth/token](https://auth.example.com/oauth/token)
```

### OAuth2SAMLBearerAssertion (User Propagation)
```
Authentication: OAuth2SAMLBearerAssertion
audience: <target-audience>
clientKey: <client-key>
tokenServiceURL: [https://auth.example.com/oauth2/token](https://auth.example.com/oauth2/token)
KeyStoreLocation: <certificate-location>
```

### PrincipalPropagation (On-Premise SSO)
```
Authentication: PrincipalPropagation
ProxyType: OnPremise
```
Requires Cloud Connector X.509 certificate generation.

**Complete reference**: `references/authentication-types.md` (all 17+ types)

---

## Cloud Connector Setup

### Installation
- **Production**: Windows MSI/Linux RPM packages (service registration)
- **Development**: Portable archive (manual execution)

### Initial Configuration
1. Access UI: `[https://<hostname>:8443`](https://<hostname>:8443`)
2. Login: `Administrator` / `manage`
3. **Change password immediately**
4. Select mode: Master or Shadow
5. Add subaccount connection

### Access Control
Configure on-premise resource access:
- **Backend Types**: ABAP System, SAP Gateway, Non-SAP System, SAP HANA
- **HTTP Access Control**: System mapping + resource paths + policies

### High Availability
- **Master-Shadow**: Primary + backup with synchronized config
- **Requirements**: Stable network, separate machines, identical versions

**Complete guide**: `references/cloud-connector.md`

---

## Kubernetes/Kyma Connectivity

### Connectivity Proxy
Enables Kubernetes workloads to access on-premise systems.

**Installation**:
```bash
helm install connectivity-proxy \
  oci://registry-1.docker.io/sapse/connectivity-proxy \
  --version <version> --namespace <namespace> -f values.yaml
```

### Transparent Proxy
Exposes BTP destinations as Kubernetes Services.

**Installation**:
```bash
helm install transparent-proxy \
  oci://registry-1.docker.io/sapse/transparent-proxy \
  --version <version> --namespace <namespace> -f values.yaml
```

**Usage**: Create Destination Custom Resource, access as Kubernetes Service.

**Complete configuration**: `references/kubernetes-connectivity.md`

---

## Common Issues & Troubleshooting

### HTTP Error Codes

| Code | Cause | Solution |
|------|-------|----------|
| **400** | Malformed request | Check request syntax |
| **401** | Authentication failure | Verify credentials/tokens |
| **405** | HTTPS instead of HTTP | Use `[http://`](http://`) with port 20003 |
| **407** | Missing authorization | Add `Proxy-Authorization: Bearer <token>` |
| **503** | Cloud Connector offline | Check CC connection and Location ID |

### Cloud Connector Issues

**Cannot connect to subaccount**:
- Verify region host URL
- Check firewall allows outbound HTTPS
- Verify subaccount credentials

**Access denied to resource**:
- Check access control configuration
- Verify virtual host mapping
- Check resource path policy

**Complete troubleshooting**: `references/troubleshooting.md`

---

## Security Best Practices

### Cloud Connector
- Deploy in DMZ under IT control
- Change default password immediately
- Configure LDAP for user management
- Enable audit logging (All level for production)
- Deploy high availability (master + shadow)

### Destinations
- Use OAuth over basic authentication
- Store credentials in Destination Service, not code
- Enable TLS for all connections
- Use mTLS for enhanced security

---

## Critical Rules

### Always Do
- Change Cloud Connector default password immediately
- Use HTTPS for all external connections
- Configure access control before exposing resources
- Enable audit logging in production
- Cache tokens and destinations appropriately

### Never Do
- Expose Cloud Connector UI to internet
- Store credentials in application code
- Skip access control configuration
- Modify Cloud Connector Tomcat config files
- Run multiple master instances (split-brain)

---

## Bundled Resources

### Configuration References
- `references/http-destinations.md` - Complete HTTP destination properties
- `references/rfc-destinations.md` - RFC destination properties and pooling
- `references/mail-tcp-ldap-destinations.md` - Mail, TCP, LDAP configuration
- `references/authentication-types.md` - All 17+ authentication configurations

### Setup & Configuration
- `references/cloud-connector.md` - Cloud Connector setup and configuration
- `references/kubernetes-connectivity.md` - Connectivity Proxy and Transparent Proxy
- `references/destination-service-api.md` - REST API reference

### Advanced Topics
- `references/advanced-configuration.md` - MTA, config.json, chaining, ZTIS
- `references/identity-propagation-scenarios.md` - ABAP, NetWeaver Java, custom IDP
- `references/operational-guides.md` - Network zones, solution management
- `references/connectivity-alternatives-and-config.md` - Reverse proxy, user roles, RFC config

### Development & SDK
- `references/java-sdk-development.md` - Java APIs, JCo, SAP Cloud SDK
- `references/mail-protocols.md` - SMTP, IMAP, POP3 configuration

### Templates
- `templates/destination-http-oauth.json` - HTTP destination with OAuth template
- `templates/destination-onpremise.json` - On-premise destination template
- `templates/connectivity-proxy-values.yaml` - Helm values for Connectivity Proxy
- `templates/transparent-proxy-values.yaml` - Helm values for Transparent Proxy

---

## Documentation Links

- **Official SAP Documentation**: [https://help.sap.com/docs/connectivity](https://help.sap.com/docs/connectivity)
- **GitHub Repository**: [https://github.com/SAP-docs/btp-connectivity](https://github.com/SAP-docs/btp-connectivity)
- **Destination API**: [https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination](https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination)
- **Release Notes**: [https://help.sap.com/whats-new/cf0cb2cb149647329b5d02aa96303f56](https://help.sap.com/whats-new/cf0cb2cb149647329b5d02aa96303f56)

---

**Last Updated**: 2025-11-27  
**Next Review**: 2026-02-27  
**Source**: [https://github.com/SAP-docs/btp-connectivity](https://github.com/SAP-docs/btp-connectivity) (383 files, 352+ analyzed)
