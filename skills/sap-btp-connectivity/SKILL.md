---
name: sap-btp-connectivity
description: |
  This skill provides comprehensive knowledge for SAP BTP Connectivity, including the Destination Service, Connectivity Service, Cloud Connector, Connectivity Proxy, and Transparent Proxy for Kubernetes. It should be used when configuring destinations, setting up cloud-to-on-premise connectivity, implementing principal propagation, deploying connectivity proxies in Kubernetes/Kyma environments, or troubleshooting connectivity issues.

  Use this skill when:
  - Creating or configuring SAP BTP destinations (HTTP, RFC, LDAP, MAIL, TCP)
  - Setting up Cloud Connector for on-premise connectivity
  - Implementing OAuth authentication flows for destinations
  - Configuring principal propagation or user propagation
  - Deploying Connectivity Proxy or Transparent Proxy in Kubernetes
  - Troubleshooting connectivity errors (405, 407, 503)
  - Setting up high availability for Cloud Connector
  - Configuring multitenancy for destinations

  Keywords: SAP BTP, Connectivity, Destination Service, Cloud Connector, Connectivity Proxy, Transparent Proxy, Kyma, Kubernetes, OAuth, Principal Propagation, RFC, LDAP, on-premise, hybrid connectivity, service channels, SOCKS5, reverse proxy, tunnel
license: MIT
---

# SAP BTP Connectivity Skill

## Overview

SAP BTP Connectivity provides secure access from SAP BTP applications to remote services, whether on the internet, in on-premise networks, or in virtual private clouds (VPC).

### Core Components

| Component | Purpose |
|-----------|---------|
| **Destination Service** | Manages connection metadata, authentication, and routing |
| **Connectivity Service** | Enables Kubernetes workloads to connect via Cloud Connector |
| **Cloud Connector** | Reverse invoke proxy for secure on-premise tunneling |
| **Connectivity Proxy** | Kubernetes component for on-premise connectivity |
| **Transparent Proxy** | Kubernetes component for unified destination access |

### Supported Environments

- Cloud Foundry
- ABAP Environment
- Kyma (Kubernetes)

### Supported Protocols

- HTTP/HTTPS
- RFC (SAP systems 4.6C+)
- TCP (via SOCKS5)
- LDAP/LDAPS
- SMTP, IMAP, POP3 (mail)

---

## Quick Start

### Create an HTTP Destination (Cloud Foundry)

1. Navigate to **Connectivity > Destinations** in BTP Cockpit
2. Select **Create > From Scratch**
3. Configure:
   ```
   Name: my-destination
   Type: HTTP
   URL: https://api.example.com
   ProxyType: Internet
   Authentication: OAuth2ClientCredentials
   clientId: <your-client-id>
   clientSecret: <your-client-secret>
   tokenServiceURL: https://auth.example.com/oauth/token
   ```

### Set Up Cloud Connector

1. Download from [SAP Tools](https://tools.hana.ondemand.com/#cloud)
2. Install and access: `https://localhost:8443`
3. Default credentials: `Administrator` / `manage`
4. Change password immediately
5. Add subaccount connection

### Access Destination in Application (Node.js)

```javascript
const { getDestination } = require('@sap-cloud-sdk/connectivity');

const destination = await getDestination({ destinationName: 'my-destination' });
// Use destination.url, destination.authentication, etc.
```

---

## Connectivity Scenarios

### Cloud-to-Cloud

SAP BTP application connects to cloud-based services.

```
ProxyType: Internet
Authentication: OAuth2ClientCredentials | OAuth2SAMLBearerAssertion
```

For user propagation between cloud apps, use `OAuth2SAMLBearerAssertion`.

### Cloud-to-On-Premise

SAP BTP application connects to on-premise systems via Cloud Connector.

```
ProxyType: OnPremise
Authentication: BasicAuthentication | PrincipalPropagation
```

Requires:
- Cloud Connector installed in on-premise network
- Access control configured for target systems
- Location ID (if multiple Cloud Connectors)

### On-Premise-to-Cloud (Service Channels)

On-premise systems access SAP BTP services via Cloud Connector service channels.

Use cases:
- RFC calls to ABAP Cloud systems
- Database tools accessing SAP HANA Cloud
- Kubernetes workloads exposed to on-premise

---

## Destination Types

### HTTP Destinations

See `references/http-destinations.md` for complete property reference.

**Required Properties:**
- `Name`: Unique identifier
- `Type`: `HTTP`
- `URL`: Target endpoint
- `ProxyType`: `Internet` | `OnPremise` | `PrivateLink`
- `Authentication`: One of 17+ types

**Common Authentication Types:**
| Type | Use Case |
|------|----------|
| `NoAuthentication` | Public APIs |
| `BasicAuthentication` | Username/password |
| `OAuth2ClientCredentials` | Service-to-service |
| `OAuth2SAMLBearerAssertion` | User propagation (cloud-to-cloud) |
| `PrincipalPropagation` | User propagation (cloud-to-on-premise) |
| `ClientCertificateAuthentication` | X.509 certificate |

### RFC Destinations

For ABAP function module calls. See `references/rfc-destinations.md`.

**Required Properties:**
- `Type`: `RFC`
- `ProxyType`: `OnPremise` (typically)
- Target system configuration (host, client, system number)
- User logon properties

### LDAP Destinations

For directory service access. See `references/ldap-destinations.md`.

**Required Properties:**
- `Type`: `LDAP`
- `URL`: `ldap://hostname:389` or `ldaps://hostname:636`
- `Authentication`: `NoAuthentication` | `BasicAuthentication`

### MAIL Destinations

For email protocols. See `references/mail-destinations.md`.

**Required Properties:**
- `Type`: `MAIL`
- `mail.smtp.host` / `mail.imap4.host` / `mail.pop3.host`
- `Authentication`: `NoAuthentication` | `BasicAuthentication`

### TCP Destinations

For generic TCP connections via SOCKS5.

**Required Properties:**
- `Type`: `TCP`
- Target host and port
- `ProxyType`: `OnPremise`

---

## Authentication Configuration

### OAuth2ClientCredentials

```
Authentication: OAuth2ClientCredentials
clientId: <client-id>
clientSecret: <client-secret>
tokenServiceURL: https://auth.example.com/oauth/token
```

Token caching: Automatic with auto-renewal before expiration.

### OAuth2SAMLBearerAssertion (User Propagation)

```
Authentication: OAuth2SAMLBearerAssertion
audience: <target-audience>
clientKey: <client-key>
tokenServiceURL: https://auth.example.com/oauth2/token
KeyStoreLocation: <certificate-location>
```

Requires user JWT in request context.

### OAuth2JWTBearer

```
Authentication: OAuth2JWTBearer
clientId: <client-id>
clientSecret: <client-secret>
tokenServiceURL: https://auth.example.com/oauth/token
```

Exchanges user token for new access token.

### PrincipalPropagation (On-Premise SSO)

```
Authentication: PrincipalPropagation
ProxyType: OnPremise
```

Requires Cloud Connector configuration for X.509 certificate generation.

See `references/authentication-types.md` for all 17+ authentication types.

---

## Cloud Connector

### Installation

**Production (Installer):**
- Windows: MSI installer with service registration
- Linux: RPM/DEB packages with daemon setup
- Runs as background service with auto-start

**Development (Portable):**
- Extract archive, run manually
- No admin privileges required
- Not for production use

### Initial Configuration

1. Access UI: `https://<hostname>:8443`
2. Default login: `Administrator` / `manage`
3. **Change password immediately**
4. Select mode: Master or Shadow
5. Add first subaccount

### Access Control

Configure which on-premise resources are accessible:

**Backend Types:**
| Type | Protocols |
|------|-----------|
| ABAP System | HTTP(S), RFC(S), TCP(S) |
| SAP Gateway | HTTP(S), RFC(S), TCP(S) |
| Non-SAP System | HTTP(S), TCP(S), LDAP(S) |
| SAP HANA | HTTP(S), TCP(S) |

**HTTP Access Control:**
1. Add system mapping (virtual host → internal host)
2. Add resources (URL paths with policy)
3. Policy: `Path Only` or `Path and All Sub-Paths`

### High Availability

Master-Shadow architecture:
- **Master**: Primary instance handling connections
- **Shadow**: Backup instance with synchronized config
- Automatic failover if master becomes unreachable

**Requirements:**
- Stable network between master and shadow
- Separate physical/virtual machines
- Identical Cloud Connector versions

See `references/cloud-connector.md` for complete configuration.

---

## Kubernetes/Kyma Connectivity

### Connectivity Proxy

Enables Kubernetes workloads to access on-premise systems.

**Installation (Helm):**
```bash
helm install connectivity-proxy \
  oci://registry-1.docker.io/sapse/connectivity-proxy \
  --version <version> \
  --namespace <namespace> \
  -f values.yaml
```

**Required Configuration:**
- Connectivity Service instance credentials
- `config.integration.connectivityService` settings

### Transparent Proxy

Exposes BTP destinations as Kubernetes Services.

**Installation (Helm):**
```bash
helm install transparent-proxy \
  oci://registry-1.docker.io/sapse/transparent-proxy \
  --version <version> \
  --namespace <namespace> \
  -f values.yaml
```

**Usage:**
1. Create Destination Custom Resource:
   ```yaml
   apiVersion: destination.connectivity.api.sap/v1
   kind: Destination
   metadata:
     name: my-destination
   spec:
     destinationRef:
       name: my-btp-destination
   ```
2. Access via Kubernetes Service: `http://my-destination.<namespace>`

### Service Channels (On-Premise-to-Cloud)

Expose Kubernetes workloads to on-premise:

```yaml
apiVersion: servicemapping.connectivityproxy.sap.com/v1
kind: ServiceMapping
metadata:
  name: my-service
spec:
  type: TCP  # or RFC
  subaccountId: <subaccount-id>
  serviceId: my-virtual-host
  internalAddress: my-service.namespace:8080
```

See `references/kubernetes-connectivity.md` for complete guide.

---

## Destination Service REST API

### Get Access Token

```bash
curl -X POST "${url}/oauth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  --data-urlencode "client_id=${clientId}" \
  --data-urlencode "client_secret=${clientSecret}"
```

### List Destinations

```bash
curl -X GET "${uri}/destination-configuration/v1/subaccountDestinations" \
  -H "Authorization: Bearer ${access_token}"
```

### Find Destination (with Authentication)

```bash
curl -X GET "${uri}/destination-configuration/v1/destinations/${destName}" \
  -H "Authorization: Bearer ${access_token}"
```

Returns destination configuration with `authTokens` array containing retrieved tokens.

### Use Destination Fragments

```bash
curl -X GET "${uri}/destination-configuration/v1/destinations/${destName}" \
  -H "Authorization: Bearer ${access_token}" \
  -H "X-Fragment-Name: my-fragment"
```

See `references/destination-service-api.md` for complete API reference.

---

## Multitenancy

### Visibility Levels

| Level | Scope |
|-------|-------|
| **Subaccount** | All apps in subaccount |
| **Service Instance** | Apps using specific instance |
| **Subscription** | Tenant-specific in SaaS apps |

### Subscription-Level Destinations

For SaaS applications with tenant-specific configurations:

1. Get subscriber token using provider credentials
2. Create destination via REST API with subscriber context
3. Access using subscriber token

---

## Security Best Practices

### Cloud Connector

1. **Deploy in DMZ** under IT control
2. **Restrict OS access** to administrators only
3. **Change default password** immediately
4. **Configure LDAP** for user management
5. **Replace self-signed certificate** with company CA
6. **Enable audit logging** (`All` level for production)
7. **Deploy high availability** (master + shadow)
8. **Separate instances** for prod vs dev/test

### Destinations

1. Use **OAuth** over basic authentication when possible
2. Store credentials in **Destination Service**, not application code
3. Enable **TLS** for all connections
4. Use **mTLS** for enhanced security
5. Configure **appropriate timeouts**

### Protocol Security

| Protocol | Security |
|----------|----------|
| HTTP → HTTPS | TLS encryption |
| RFC → RFC/SNC | SNC encryption |
| LDAP → LDAPS | TLS encryption |

---

## Resilience Recommendations

### Caching

- **Access tokens**: Cache for validity period
- **Destinations**: Cache 3-5 minutes
- **Use stale cache** if refresh fails

### Retry Logic

Implement retries with exponential backoff:
```javascript
const delays = [2000, 4000, 8000, 16000]; // ms
```

### Timeouts

- **Connect timeout**: 2-5 seconds
- **Read timeout (service)**: ~30 seconds
- **Read timeout (business)**: Scenario-dependent

### Circuit Breaker

Reduce load on failing dependencies:
- Open circuit after N failures
- Attempt recovery after timeout
- Close circuit on success

---

## Common Issues & Troubleshooting

### HTTP Error Codes

| Code | Cause | Solution |
|------|-------|----------|
| **405** | HTTPS instead of HTTP | Use `http://` with port 20003 |
| **407** | Missing authorization | Add `Proxy-Authorization: Bearer <token>` |
| **503** | Cloud Connector offline | Check CC connection and Location ID |

### Cloud Connector Issues

**Cannot connect to subaccount:**
- Verify region host URL
- Check firewall allows outbound HTTPS
- Verify subaccount credentials

**Access denied to resource:**
- Check access control configuration
- Verify virtual host mapping
- Check resource path policy

### Transparent Proxy Issues

Check error response headers:
- `x-error-message`: Error description
- `x-error-origin`: Component that failed
- `x-request-id`: Correlation ID for logs

### Log Retrieval

**Cloud Connector:**
```bash
# Windows
sc query "SAP Cloud Connector"

# Linux
service scc_daemon status
```

**Connectivity Proxy:**
```bash
kubectl logs statefulset/connectivity-proxy
kubectl exec <pod> -it -- change-log-level DEBUG
```

See `references/troubleshooting.md` for complete troubleshooting guide.

---

## Critical Rules

### Always Do

- Change Cloud Connector default password immediately
- Use HTTPS for all external connections
- Configure access control before exposing resources
- Enable audit logging in production
- Test failover in HA setups
- Cache tokens and destinations appropriately
- Implement retry logic with backoff

### Never Do

- Expose Cloud Connector UI to internet
- Store credentials in application code
- Skip access control configuration
- Modify Cloud Connector Tomcat config files
- Run multiple master instances (split-brain)
- Use portable installation in production

---

## Reference Files

| File | Content |
|------|---------|
| `references/http-destinations.md` | Complete HTTP destination properties |
| `references/rfc-destinations.md` | RFC destination properties and pooling |
| `references/mail-tcp-ldap-destinations.md` | Mail, TCP, LDAP destination configuration |
| `references/authentication-types.md` | All 17+ authentication configurations |
| `references/cloud-connector.md` | Cloud Connector setup and configuration |
| `references/kubernetes-connectivity.md` | Connectivity Proxy and Transparent Proxy |
| `references/destination-service-api.md` | REST API reference |
| `references/advanced-configuration.md` | MTA, config.json, chaining, ZTIS |
| `references/java-sdk-development.md` | Java APIs, JCo, SAP Cloud SDK |
| `references/mail-protocols.md` | SMTP, IMAP, POP3 configuration |
| `references/identity-propagation-scenarios.md` | ABAP, NetWeaver Java, custom IDP |
| `references/operational-guides.md` | Network zones, solution management |
| `references/troubleshooting.md` | Common issues and solutions |
| `templates/destination-http-oauth.json` | HTTP destination with OAuth template |
| `templates/destination-onpremise.json` | On-premise destination template |
| `templates/connectivity-proxy-values.yaml` | Helm values for Connectivity Proxy |
| `templates/transparent-proxy-values.yaml` | Helm values for Transparent Proxy |

---

## Documentation Links

### Official SAP Documentation
- **Main**: https://help.sap.com/docs/connectivity
- **GitHub**: https://github.com/SAP-docs/btp-connectivity

### SAP Business Accelerator Hub
- **Destination API**: https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination

### Release Notes
- **What's New**: https://help.sap.com/whats-new/cf0cb2cb149647329b5d02aa96303f56

---

**Last Updated**: 2025-11-22
**Next Review**: 2026-02-22
**Source**: https://github.com/SAP-docs/btp-connectivity (383 files, 343+ analyzed)
