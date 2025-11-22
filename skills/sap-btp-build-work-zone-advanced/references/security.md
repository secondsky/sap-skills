# SAP Build Work Zone Security Guide

Security configuration for SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## Authentication Methods

### SAML Identity Providers

Configure trusted SAML IdPs for SSO:

1. Navigate to Administration Console
2. Go to Authentication > SAML Trusted IdPs
3. Add IdP metadata

### OAuth Clients

Register OAuth clients for API access:

1. Go to Authentication > OAuth Clients
2. Create new client
3. Configure scopes and permissions

### Single Sign-On (SSO)

SSO is enabled through:
- SAML federation
- SAP Cloud Identity Services
- Corporate IdP integration

---

## Access Control

### Role Collections

Key roles:
- `Workzone_Admin` - Full administration
- `Workzone_User` - Standard access
- `Workzone_HR_Admin` - HR integration

### Workspace Permissions

- Owner
- Admin
- Member
- Viewer

---

## HTTP Security Headers

Configure security headers to protect against common web vulnerabilities.

### Recommended Headers

| Header | Value | Protection |
|--------|-------|------------|
| X-Frame-Options | SAMEORIGIN | Clickjacking |
| Content-Security-Policy | default-src 'self' | XSS, content injection |
| X-Content-Type-Options | nosniff | MIME-type sniffing |
| X-XSS-Protection | 1; mode=block | Cross-site scripting |
| Strict-Transport-Security | max-age=31536000 | Protocol downgrade |

### Example Configuration

```
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Configuration Location

Security headers are typically configured at:
- BTP Application Router (xs-app.json)
- SAP Cloud Connector
- Load balancer/reverse proxy level

> **Note**: For API security including OAuth flows and token handling, see `references/api-reference.md`.

---

## Compliance Features

### Compliance Monitor
Flags content matching compliance dictionary terms.

### Profanity Monitor
Detects and flags profanity violations.

### Content Administration
Review and manage flagged content.

---

## Audit Logging

Security events logged include:
- Authentication attempts
- Permission changes
- Content modifications
- Administrative actions

For detailed audit logging configuration, see `references/auditing.md`.

---

**Documentation Links**:
- Security Guide: https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/security
- SAP Cloud Identity: https://help.sap.com/docs/cloud-identity-services
