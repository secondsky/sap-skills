# Identity Authentication (IAS) — Complete Reference

**Source**: [SAP Cloud Identity Services Operation Guide](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/operation-guide), [SAP-docs GitHub Mirror](https://github.com/SAP-docs/btp-cloud-identity-services)

---

## Overview

Identity Authentication (IAS) is the cloud-based identity provider for SAP BTP applications. It handles user authentication, single sign-on, corporate IdP federation, and user store management. IAS supports both OIDC and SAML 2.0 protocols.

---

## Application Registration

### Creating an Application

1. Sign in to the IAS administration console at `https://<tenant>.accounts.ondemand.com/admin`
2. Navigate to **Applications & Resources** > **Applications**
3. Choose **Create Application**
4. Enter a **Display Name** and optional description
5. Choose the **Application Type**:
   - **OIDC** — for modern web/mobile apps, SAP BTP applications using the Identity service
   - **SAML 2.0** — for legacy integrations, SAP cloud solutions that use SAML assertions
6. Configure trust (see below)
7. Save

*Source: [Configuring Applications](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configuring-applications)*

### OIDC Application Configuration

For OIDC applications, configure:

| Setting | Description | Example |
|---------|-------------|---------|
| Redirect URIs | Allowed callback URLs after authentication | `https://myapp.cfapps.eu10.hana.ondemand.com/login/callback` |
| Post-Logout Redirect URIs | URLs the user is sent to after logout | `https://myapp.cfapps.eu10.hana.ondemand.com` |
| Client Authentication | How the client authenticates | Client secret or X.509 certificate |
| Access Token Format | JWT or reference token | JWT (default) |
| Refresh Token | Enable/disable refresh tokens | Enabled for web apps |

### SAML 2.0 Application Configuration

For SAML applications:

1. **Upload SP metadata** — the service provider's SAML metadata XML, or enter the entity ID and assertion consumer service URL manually
2. **Configure Name ID Format** — typically `email` or `persistent`
3. **Set signing** — choose whether IAS signs assertions
4. **Configure user attributes** — which attributes are sent in the assertion

### Identity Service Auto-Registration

When using the **SAP BTP Identity service** (replacing XSUAA), no manual IAS registration is needed. The process:

1. Create an Identity service instance in BTP:
   ```
   cf create-service identity application my-identity-service
   ```
2. Bind it to the application:
   ```
   cf bind-service myapp my-identity-service
   ```
3. The Identity service automatically creates an OIDC application in the IAS tenant linked to the subaccount

Each Identity service instance gets its own OAuth client with unique credentials (client ID + secret or X.509 certificate).

*Source: [Integrating the Service with the Identity Service of SAP BTP](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/integrating-service-with-identity-service-of-sap-btp)*

---

## Corporate Identity Provider Federation

IAS can delegate authentication to a corporate identity provider (IdP). IAS acts as a proxy between the application and the corporate IdP.

### Supported IdP Types

- **SAML 2.0** corporate IdPs (Azure AD, Okta, OneLogin, etc.)
- **OIDC** identity providers
- **Social identity providers** (Google, Facebook, LinkedIn, Apple)
- **Custom IdPs** via the IdP API

### Configuring a SAML 2.0 Corporate IdP

1. In the IAS admin console, go to **Applications & Resources** > **Corporate Identity Providers**
2. Choose **Add Corporate IdP** > **SAML 2.0**
3. Upload the corporate IdP's SAML metadata XML
4. Configure the binding (HTTP Redirect, HTTP POST)
5. Set up name ID format and user attribute mappings
6. Optionally configure **conditional authentication** rules (see below)

*Source: [Configure Trust with SAML 2.0 Corporate Identity Provider](https://github.com/SAP-docs/btp-cloud-identity-services/blob/main/docs/Operation-Guide/configure-trust-with-saml-2-0-corporate-identity-provider-33832e5.md)*

### Conditional Authentication

Conditional authentication routes users to different IdPs based on conditions:

| Condition | Use Case |
|-----------|----------|
| Email domain | Route `@company.com` users to corporate IdP |
| User type | Route employees to corporate IdP, consumers to IAS local store |
| User group | Route specific groups to specific IdPs |
| IP range | Enforce MFA for external networks |
| Authentication method | Apply risk-based rules |

Configure per-application: **Application** > **Authentication** > **Conditional Authentication**.

---

## User Store

IAS supports multiple user store options:

- **Identity Directory** — the default user store, part of SAP Cloud Identity Services. Provides SCIM 2.0 API, custom schemas, and the Global User ID.
- **Corporate user stores** — via IdP federation, users from Azure AD, SAP SuccessFactors, etc.
- **Local user store** — users created directly in IAS (registration, invite, CSV import)

### SCIM 2.0 API

The Identity Directory SCIM 2.0 API enables programmatic user management:

```
GET  /service/scim/Users              — List users
GET  /service/scim/Users/{id}         — Get user
POST /service/scim/Users              — Create user
PUT  /service/scim/Users/{id}         — Update user
DELETE /service/scim/Users/{id}       — Delete user
PATCH /service/scim/Users/{id}        — Partial update
```

Custom schemas can extend the user model with additional attributes.

---

## Authentication Methods

IAS supports multiple authentication methods, configurable per application:

| Method | Description |
|--------|-------------|
| Form-based | Username/password on IAS login page |
| SPNEGO/Kerberos | Windows integrated authentication |
| X.509 Client Certificate | Certificate-based authentication |
| Social | Google, Facebook, LinkedIn, Apple |
| Two-Factor (TOTP) | Time-based one-time password |
| Risk-Based | Enforce MFA based on IP, user group, user type |

---

## Tenant Model

IAS tenants are deployed on productive domains:
- `accounts.ondemand.com`
- `accounts.cloud.sap`

Tenants are obtained either:
- **Bundled** — with an SAP cloud solution (e.g., SAP SuccessFactors, SAP S/4HANA Cloud)
- **Self-service** — via SAP BTP cockpit, creating a Cloud Identity Services tenant

Regional availability spans AWS, Azure, Google Cloud, and Alibaba Cloud infrastructure.

*Source: [What Are Cloud Identity Services](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/what-is-identity-authentication)*
