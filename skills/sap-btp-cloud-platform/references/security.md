# Security Reference

Complete security guidance for SAP BTP including authentication, authorization, and identity management.

**Source**: https://github.com/SAP-docs/sap-btp-cloud-platform/tree/main/docs/60-security

---

## Table of Contents

1. [Security Overview](#security-overview)
2. [Identity Providers](#identity-providers)
3. [Trust Configuration](#trust-configuration)
4. [Authorization](#authorization)
5. [XSUAA Configuration](#xsuaa-configuration)
6. [Role Collections](#role-collections)
7. [Principal Propagation](#principal-propagation)
8. [Audit Logging](#audit-logging)
9. [Security Best Practices](#security-best-practices)

---

## Security Overview

### User Types

| Type | Description | Authentication |
|------|-------------|----------------|
| **Platform Users** | Manage BTP infrastructure | Global account/subaccount trust |
| **Business Users** | Use deployed applications | Application-level trust |

### Security Layers

```
Identity Provider (Source of Truth)
    ↓
SAP Cloud Identity Services (Proxy/Direct)
    ↓
SAP BTP (Shadow Users)
    ↓
Role Collections → Application Access
```

### Encryption

- TLS 1.2 or higher mandatory
- TLS 1.0/1.1 not supported
- TLS 1.3 available via Custom Domain Manager
- HTTPS required for all communication

---

## Identity Providers

### SAP ID Service (Default)

- Default identity provider for SAP BTP
- Manages SAP Community users
- Suitable for testing and trial accounts
- Not recommended for production

### SAP Cloud Identity Services

**Recommended for production**:
- Identity Authentication for authentication
- Identity Provisioning for user sync
- Corporate IdP integration via proxy

### Identity Provider Architecture

```
Corporate IdP (SAML/OIDC)
    ↓
SAP Cloud Identity Services - Identity Authentication
    ↓
SAP BTP Platform (Trust Configuration)
    ↓
Applications (XSUAA)
```

### Identity Authentication Onboarding

1. Get Identity Authentication tenant
2. Add multiple administrators (different time zones)
3. Enable MFA for administrators
4. Configure security monitoring
5. Set up corporate IdP proxy (optional)
6. Establish trust with SAP BTP

---

## Trust Configuration

### Subaccount Trust Setup

**For Platform Users**:
```
Global Account → Trust Configuration → Add Identity Provider
```

**For Business Users**:
```
Subaccount → Trust Configuration → New Trust Configuration
```

### OIDC Trust Configuration

```json
{
  "name": "my-corporate-idp",
  "type": "oidc",
  "origin": "my-idp-origin",
  "config": {
    "issuer": "https://idp.example.com",
    "clientId": "my-client-id",
    "clientSecret": "***",
    "authorizationEndpoint": "https://idp.example.com/authorize",
    "tokenEndpoint": "https://idp.example.com/token",
    "userInfoEndpoint": "https://idp.example.com/userinfo"
  }
}
```

### SAML Trust Configuration

**Setup Steps**:
1. Export SAML metadata XML from your IdP
2. In BTP Cockpit: Subaccount → Trust Configuration → New Trust Configuration
3. Upload IdP metadata (contains signing certificate, endpoints)
4. Configure attribute mapping (email, groups, custom attributes)
5. Download BTP SAML metadata for IdP registration
6. Test authentication flow

**Metadata Exchange**:
```
IdP Metadata → BTP              BTP Metadata → IdP
- Entity ID                     - Entity ID
- SSO URL                       - Assertion Consumer URL
- Signing Certificate           - Signing Certificate
- NameID format                 - Supported bindings
```

**Certificate Handling**:
- IdP certificates expire—monitor and update before expiry
- BTP auto-generates service provider certificate
- For certificate renewal: upload new IdP metadata with updated certificate
- Grace period allows both old and new certificates during transition

---

## Authorization

### Authorization Methods

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **Provisioning** | Production, many users | Centralized, automated offboarding | Sync delay |
| **Federation** | Simple scenarios | Real-time, simple setup | Orphaned users |
| **Manual** | Testing only | Quick setup | Not scalable |

### Provisioning (Recommended)

```
Identity Directory → Identity Provisioning → SAP BTP
```

Benefits:
- Automated user lifecycle management
- Central role assignment
- Immediate offboarding

### Federation

User attributes from IdP mapped to roles at runtime:
- No user sync required
- Real-time attribute updates
- Risk of orphaned shadow users

---

## XSUAA Configuration

### xs-security.json

Application security descriptor:

```json
{
  "xsappname": "my-app",
  "tenant-mode": "dedicated",
  "scopes": [
    {
      "name": "$XSAPPNAME.Read",
      "description": "Read access"
    },
    {
      "name": "$XSAPPNAME.Write",
      "description": "Write access"
    },
    {
      "name": "$XSAPPNAME.Admin",
      "description": "Admin access"
    }
  ],
  "attributes": [
    {
      "name": "Country",
      "description": "User country",
      "valueType": "string"
    }
  ],
  "role-templates": [
    {
      "name": "Viewer",
      "description": "Read-only user",
      "scope-references": ["$XSAPPNAME.Read"]
    },
    {
      "name": "Editor",
      "description": "Read-write user",
      "scope-references": ["$XSAPPNAME.Read", "$XSAPPNAME.Write"]
    },
    {
      "name": "Administrator",
      "description": "Full access",
      "scope-references": ["$XSAPPNAME.Read", "$XSAPPNAME.Write", "$XSAPPNAME.Admin"]
    }
  ],
  "role-collections": [
    {
      "name": "MyApp_Viewer",
      "description": "View my-app data",
      "role-template-references": ["$XSAPPNAME.Viewer"]
    }
  ]
}
```

### Service Instance Creation

```bash
# Cloud Foundry
cf create-service xsuaa application my-xsuaa -c xs-security.json

# Kyma (ServiceInstance)
kubectl apply -f - <<EOF
apiVersion: services.cloud.sap.com/v1
kind: ServiceInstance
metadata:
  name: my-xsuaa
spec:
  serviceOfferingName: xsuaa
  servicePlanName: application
  parameters:
    xsappname: my-app
    tenant-mode: dedicated
    scopes:
    - name: \$XSAPPNAME.Read
      description: Read access
EOF
```

---

## Role Collections

### Structure

```
Role Collection
├── Role 1 (from Role Template)
│   └── Scopes
├── Role 2
└── Users/Groups assigned
```

### Creating Role Collections

**Via BTP Cockpit**:
1. Navigate to Subaccount → Security → Role Collections
2. Create new role collection
3. Add roles from application role templates
4. Assign users or groups

**Via btp CLI**:
```bash
# Assign user to role collection
btp assign security/role-collection "MyApp_Viewer" \
  --to-user user@example.com \
  --of-idp my-idp-origin

# List role collections
btp list security/role-collection
```

### Group Mapping

Map IdP groups to role collections:

```bash
btp assign security/role-collection "MyApp_Viewer" \
  --to-group "AppViewers" \
  --of-idp my-idp-origin
```

---

## Principal Propagation

Forward user identity to backend systems:

### On-Premise via Cloud Connector

```
User → SAP BTP App → Cloud Connector → On-Premise System
        (SAML assertion)      (X.509 certificate)
```

**Destination Configuration**:
```json
{
  "Name": "my-onprem-system",
  "Type": "HTTP",
  "URL": "http://virtualhost:port",
  "ProxyType": "OnPremise",
  "Authentication": "PrincipalPropagation"
}
```

### Cloud-to-Cloud

```
User → SAP BTP App → SAP Cloud Service
        (OAuth2SAMLBearerAssertion)
```

**Destination Configuration**:
```json
{
  "Name": "my-cloud-service",
  "Type": "HTTP",
  "URL": "https://api.example.com",
  "Authentication": "OAuth2SAMLBearerAssertion",
  "audience": "https://audience.example.com",
  "tokenServiceURL": "https://token.example.com/oauth/token"
}
```

---

## Audit Logging

### Enabling Audit Log

1. Subscribe to SAP Audit Log Viewer Service
2. Configure audit log retention
3. Access via BTP Cockpit or API

### Audit Categories

| Category | Description |
|----------|-------------|
| **Security Events** | Login attempts, authorization changes |
| **Data Access** | Read operations on sensitive data |
| **Data Modification** | Create, update, delete operations |
| **Configuration Changes** | System configuration updates |

### Audit Log Retrieval API

```bash
# Get audit logs
curl -X GET "https://auditlog.cf.<region>.hana.ondemand.com/v2/auditlogrecords" \
  -H "Authorization: Bearer <token>"
```

---

## Security Best Practices

### Identity Management

1. **Use SAP Cloud Identity Services** for production
2. **Enable MFA** for all administrators
3. **Maintain backup administrators** in default IdP
4. **Use provisioning** over federation for user lifecycle

### Access Control

1. **Principle of least privilege** - minimal required access
2. **Regular access reviews** - remove unused permissions
3. **Avoid generic admin accounts** - individual accountability
4. **Document role assignments** - audit trail

### Platform Access

| Environment | Dev Access | Prod Access |
|-------------|------------|-------------|
| Development | Cloud Dev Team | No access |
| Production | No access | Platform Engineering |

### Application Security

1. **Validate all inputs** - prevent injection attacks
2. **Use XSUAA** for authentication
3. **Implement authorization checks** - scope validation
4. **Enable audit logging** - track access
5. **Encrypt sensitive data** - at rest and in transit

### Credential Management

1. **Use destinations** - never hardcode URLs/credentials
2. **Rotate secrets regularly** - service keys, passwords
3. **Use service bindings** - credentials via VCAP_SERVICES
4. **Secure credential store** - for application secrets

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check token, verify trust configuration |
| 403 Forbidden | Check role assignments, scope requirements |
| Invalid redirect URI | Update callback URL in XSUAA config |
| Token expired | Implement token refresh logic |

### Debug Token

```bash
# Decode JWT token
echo "<token>" | cut -d. -f2 | base64 -d | jq
```

---

## Related Documentation

- Security Overview: https://github.com/SAP-docs/sap-btp-cloud-platform/blob/main/docs/60-security/security-e129aa2.md
- XSUAA: https://github.com/SAP-docs/sap-btp-cloud-platform/blob/main/docs/60-security/sap-authorization-and-trust-management-service-6373bb7.md
- Troubleshooting: https://github.com/SAP-docs/sap-btp-cloud-platform/blob/main/docs/60-security/troubleshooting-for-sap-authorization-and-trust-management-service-c33d777.md
