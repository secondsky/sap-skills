# Connectivity Reference

Complete guidance for SAP BTP connectivity including destinations and Cloud Connector.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/30-development

---

## Table of Contents

1. [Destinations Overview](#destinations-overview)
2. [Authentication Methods](#authentication-methods)
3. [Cloud Connector](#cloud-connector)
4. [Principal Propagation](#principal-propagation)
5. [Destination Service API](#destination-service-api)

---

## Destinations Overview

Destinations abstract connection details from application code:

### Benefits

- Separation of configuration from code
- Secure credential storage
- Runtime resolution of connection details
- Central management in BTP Cockpit

### Destination Types

| Type | Description |
|------|-------------|
| **HTTP** | REST APIs, web services |
| **RFC** | SAP RFC connections |
| **LDAP** | Directory services |
| **Mail** | SMTP connections |

### Proxy Types

| Proxy | Use Case |
|-------|----------|
| **Internet** | Cloud services, public APIs |
| **OnPremise** | On-premise systems via Cloud Connector |
| **PrivateLink** | AWS/Azure private connectivity |

---

## Authentication Methods

### NoAuthentication

Public APIs without authentication:

```json
{
  "Name": "public-api",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "ProxyType": "Internet",
  "Authentication": "NoAuthentication"
}
```

### BasicAuthentication

Username/password (testing only):

```json
{
  "Name": "basic-auth",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "ProxyType": "Internet",
  "Authentication": "BasicAuthentication",
  "User": "username",
  "Password": "password"
}
```

### OAuth2ClientCredentials

Service-to-service:

```json
{
  "Name": "oauth2-client",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "ProxyType": "Internet",
  "Authentication": "OAuth2ClientCredentials",
  "clientId": "my-client-id",
  "clientSecret": "my-client-secret",
  "tokenServiceURL": "https://auth.example.com/oauth/token"
}
```

### OAuth2SAMLBearerAssertion

User propagation to cloud services:

```json
{
  "Name": "saml-bearer",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "ProxyType": "Internet",
  "Authentication": "OAuth2SAMLBearerAssertion",
  "audience": "https://audience.example.com",
  "clientKey": "my-client-id",
  "tokenServiceURL": "https://auth.example.com/oauth/token",
  "tokenServiceURLType": "Dedicated",
  "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PreviousSession"
}
```

### OAuth2JWTBearer

Token exchange (preferred over OAuth2UserTokenExchange):

```json
{
  "Name": "jwt-bearer",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "ProxyType": "Internet",
  "Authentication": "OAuth2JWTBearer",
  "clientId": "my-client-id",
  "clientSecret": "my-client-secret",
  "tokenServiceURL": "https://auth.example.com/oauth/token"
}
```

### PrincipalPropagation

On-premise with Cloud Connector:

```json
{
  "Name": "onprem-pp",
  "Type": "HTTP",
  "URL": "http://virtualhost:port",
  "ProxyType": "OnPremise",
  "Authentication": "PrincipalPropagation",
  "CloudConnectorLocationId": "location1"
}
```

### ClientCertificateAuthentication

mTLS:

```json
{
  "Name": "mtls",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "ProxyType": "Internet",
  "Authentication": "ClientCertificateAuthentication",
  "KeyStoreLocation": "keystore.p12",
  "KeyStorePassword": "password"
}
```

> **Note**: The keystore file (`.p12` or `.jks`) must be uploaded to the destination
> configuration in BTP Cockpit before referencing it. Upload via: Connectivity →
> Destinations → destination properties → Upload and Delete Certificates.

### Authentication Method Compatibility

| Method | Internet | OnPremise | Private Link |
|--------|----------|-----------|--------------|
| NoAuthentication | Yes | Yes | Yes |
| BasicAuthentication | Yes | Yes | Yes |
| OAuth2ClientCredentials | Yes | No | Yes |
| OAuth2SAMLBearerAssertion | Yes | No | Yes |
| OAuth2JWTBearer | Yes | No | Yes |
| PrincipalPropagation | No | Yes | No |
| ClientCertificateAuthentication | Yes | Yes | Yes |

---

## Cloud Connector

### Overview

Lightweight on-premise agent providing:
- Secure tunnel to SAP BTP
- No inbound firewall ports required
- Fine-grained access control
- Principal propagation support

### Installation

1. Download from SAP Software Download Center
2. Install on on-premise network
3. Configure connection to SAP BTP subaccount
4. Define accessible resources

### Architecture

```
SAP BTP Application
    ↓ (HTTPS)
Connectivity Service
    ↓ (TLS tunnel)
Cloud Connector (on-premise)
    ↓ (HTTP/RFC)
On-Premise System
```

### Configuration Scopes

| Scope | Configuration |
|-------|---------------|
| **Subaccount** | One Cloud Connector per subaccount |
| **Location ID** | Multiple connectors per subaccount |
| **Access Control** | Resource-level permissions |

### Virtual Host Mapping

Map internal systems to virtual hosts:

```
Virtual Host: sap-erp-virtual:443
    → Internal System: erp.internal.company.com:443
```

### Access Control

Define which resources are accessible:

| Setting | Description |
|---------|-------------|
| **Protocol** | HTTP, HTTPS, RFC |
| **Internal Host** | Actual system hostname |
| **Virtual Host** | Exposed hostname to BTP |
| **Path** | URL path prefix |
| **Method** | HTTP methods allowed |

### High Availability

**Architecture**:
- **Master connector**: Active, handles all traffic
- **Shadow connector**: Standby, monitors master health
- Automatic failover if master becomes unavailable

**Setup**:
1. Install Cloud Connector on two separate hosts
2. Configure first as master (connects to BTP)
3. Configure second as shadow (points to master)
4. Shadow automatically takes over if master fails

**Configuration**:
```
Master: cc-master.internal.company.com:8443
Shadow: cc-shadow.internal.company.com:8443
    → Points to master for health checks
    → Same subaccount/location ID configuration
```

**Best Practices**:
- Deploy master and shadow on different physical hosts
- Use different network segments if possible
- Monitor both instances via Cloud Connector admin UI
- Test failover periodically

### Monitoring

- Connection status in BTP Cockpit
- Audit logs
- Performance metrics

---

## Principal Propagation

### On-Premise via Cloud Connector

Forward user identity to on-premise systems:

```
User authenticates → BTP App → Cloud Connector → On-Premise
                     (SAML)    (X.509 cert)     (user context)
```

**Requirements**:
1. Cloud Connector with SNC or X.509
2. Destination with `PrincipalPropagation`
3. On-premise system configured for SSO

### SAP System Configuration

For SAP ERP/S4:
1. Configure trusted certificate in STRUST
2. Enable SSO in SICF
3. Map certificate subject to user

### Cloud-to-Cloud

Use `OAuth2SAMLBearerAssertion` or `OAuth2JWTBearer`:

```javascript
// Using SAP Cloud SDK
const destination = await getDestination('my-destination');
const response = await executeHttpRequest(destination, {
  method: 'GET',
  url: '/api/resource'
});
```

---

## Destination Service API

### Get Destination

```bash
# Get single destination
curl -X GET "https://destination-configuration.cfapps.<region>.hana.ondemand.com/destination-configuration/v1/destinations/<name>" \
  -H "Authorization: Bearer <token>"
```

### Response

```json
{
  "owner": {
    "SubaccountId": "...",
    "InstanceId": "..."
  },
  "destinationConfiguration": {
    "Name": "my-destination",
    "Type": "HTTP",
    "URL": "https://api.example.com",
    "Authentication": "OAuth2ClientCredentials",
    "ProxyType": "Internet"
  },
  "authTokens": [
    {
      "type": "Bearer",
      "value": "...",
      "expires_in": "3600"
    }
  ]
}
```

### Using in Applications

**Node.js (CAP/Cloud SDK)**:
```javascript
const { getDestination, executeHttpRequest } = require('@sap-cloud-sdk/core');

const destination = await getDestination('my-destination');
const response = await executeHttpRequest(destination, {
  method: 'GET',
  url: '/api/resource'
});
```

**Java (Cloud SDK)**:
```java
HttpDestination destination = DestinationAccessor
    .getDestination("my-destination")
    .asHttp();

HttpClient client = HttpClientAccessor.getHttpClient(destination);
HttpResponse response = client.execute(new HttpGet("/api/resource"));
```

---

## Related Documentation

- Connectivity Service: https://help.sap.com/docs/connectivity
- Cloud Connector: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector
- Destinations: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/30-development
