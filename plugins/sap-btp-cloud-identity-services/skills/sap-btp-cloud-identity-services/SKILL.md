---
name: sap-btp-cloud-identity-services
description: |
  SAP Cloud Identity Services for BTP applications: Identity Authentication (IAS), Identity Provisioning (IPS), and Authorization Management (AMS). Use when configuring authentication for BTP apps, setting up OIDC or SAML app registrations, federating corporate identity providers, establishing subaccount trust, provisioning users, writing AMS authorization policies, migrating from XSUAA to IAS-based authentication, or troubleshooting token and trust errors.
license: GPL-3.0
metadata:
  version: 1.0.0
  last_verified: "2026-06-12"
  documentation_source: https://help.sap.com/docs/cloud-identity-services
  ias_docs: https://github.com/SAP-docs/btp-cloud-identity-services
  integration_guide: https://help.sap.com/viewer/b95c3d5bab324a3a8409eee5267a5b75/Cloud/en-US/27947dfb325047018603446439050a6b.html
  cap_ias_guide: https://cap.cloud.sap/docs/guides/integration/platform/ias-xsuaa
---

# SAP Cloud Identity Services

SAP Cloud Identity Services are a group of services on SAP BTP that manage identity and access across cloud and on-premise systems. They provide single sign-on, user provisioning, and policy-based authorization.

The services comprise:

- **Identity Authentication (IAS)** — cloud-based authentication, SSO (OIDC/SAML 2.0), corporate IdP federation, conditional authentication, and user store management. Acts as the identity provider for SAP BTP applications.
- **Identity Provisioning (IPS)** — identity lifecycle management as a service. Synchronizes users and groups between source and target systems (SAP and non-SAP) with full and delta read modes, real-time provisioning, and transformation support.
- **Identity Directory** — the central user store. Provides SCIM 2.0 REST API, custom schemas, and generates the Global User ID distributed by IPS to SAP cloud applications.
- **Authorization Management (AMS)** — policy-based authorization for BTP applications. Developers define policies in Data Control Language (DCL); administrators refine and assign them via the administration console.

## Related Skills

- **sap-btp-connectivity** — destination service and connection authentication mechanics (OAuth client credentials, principal propagation through Cloud Connector)
- **sap-cap-capire** — CAP application-level auth usage (role templates, @requires annotations, cds deploy with xs-security.json)
- **sap-btp-best-practices** — high-level security governance and production deployment patterns
- **sap-btp-cloud-platform** — BTP account setup, subaccount configuration, service instance creation

## When to Use This Skill

- Registering an OIDC or SAML 2.0 application in IAS
- Configuring corporate identity provider federation (IdP proxy)
- Establishing trust between a BTP subaccount and an IAS tenant
- Setting up Identity Provisioning source/target systems and jobs
- Writing or refining AMS authorization policies (DCL)
- Migrating from XSUAA to IAS-based authentication
- Troubleshooting token validation, audience, or issuer mismatch errors
- Configuring conditional authentication (risk-based, MFA)
- Integrating IAS with the SAP BTP Identity service (automatic OIDC app creation)

## Quick Reference

| Service | Purpose | Key Objects |
|---------|---------|-------------|
| IAS | Authentication & SSO | Applications (OIDC/SAML), IdPs, conditional auth, user store |
| IPS | User/group provisioning | Source systems, target systems, proxy systems, transformations, jobs |
| Identity Directory | User persistence | Users, groups, custom schemas, Global User ID |
| AMS | Policy-based authorization | Authorization policies, DCL rules, policy templates, restrictions |

## Identity Authentication (IAS)

IAS is the entry point for authentication in SAP BTP applications. It supports OIDC and SAML 2.0 protocols, acts as an identity provider or a proxy to corporate IdPs, and provides conditional authentication based on user attributes, email domain, user group, or IP range.

### Application Registration

Register applications in the IAS admin console under **Applications and Resources** > **Applications**. Each application defines:
- **Application Type** — OIDC or SAML 2.0
- **Trust Configuration** — SP metadata upload (SAML) or redirect URIs (OIDC)
- **Authentication** — method, conditional rules, IdP selection
- **User Attributes** — which attributes are sent in tokens/assertions

When using the **SAP BTP Identity service** (`xsuaa` replacement), the service instance automatically creates an OIDC application in IAS. No manual registration is needed.

### Corporate IdP Federation

IAS can act as a proxy: end users authenticate at a corporate IdP (Azure AD, Okta, etc.), and IAS bridges the token for SAP applications. Configure under **Applications and Resources** > **Corporate Identity Providers**.

For details, see `references/identity-authentication.md`.

## Identity Provisioning (IPS)

IPS synchronizes users and groups between systems. It supports source, target, and proxy system types with configurable transformations and scheduling.

### Key Concepts

- **Source systems** — read users/groups from (e.g., SAP SuccessFactors, Azure AD, SAP S/4HANA Cloud)
- **Target systems** — write users/groups to (e.g., IAS tenant, SAP BTP XSUAA, SAP Analytics Cloud)
- **Proxy systems** — hybrid scenarios where IPS reads from one system and writes through another
- **Transformations** — JSON-based attribute mappings between source and target schemas
- **Jobs** — scheduled or on-demand provisioning runs (full or delta read)
- **Real-time provisioning** — immediate entity propagation from source to target

For details, see `references/identity-provisioning.md`.

## Authorization Management (AMS)

AMS enables policy-based, instance-level authorization for BTP applications. Developers define authorization policies in **Data Control Language (DCL)** — an SQL-like language — and deploy them with the application. Administrators refine policies in the IAS admin console.

### Policy Lifecycle

1. **Developer** defines policies in DCL and deploys with the application
2. **Base policies** appear in the IAS admin console under **Authorization Policies**
3. **Administrator** creates custom policies (copies of base) with refined restrictions
4. **Administrator** assigns policies to users via groups

### DCL Example

```sql
DEFINE POLICY SalesOrderAccess
  AS (SELECT FROM SalesOrder
      WHERE buyer = CONTEXT('userIdentityLogonName')
      OR region = CONTEXT('userAttributes.region'));
```

For details, see `references/authorization-management.md`.

## XSUAA to IAS Migration

SAP is migrating BTP authentication from XSUAA (SAP Authorization and Trust Management Service) to Cloud Identity Services. The recommended posture:

- **New BTP applications**: Use the **Identity service** (BTP service) + IAS. The Identity service automates OIDC application creation in IAS.
- **Existing XSUAA applications**: Coexistence is supported. Migration is incremental — SAP recommends migrating authentication to IAS while keeping XSUAA for backward compatibility.
- **Authorization**: SAP is replacing XSUAA scope-based authorization with AMS policy-based authorization for new applications. Existing role-collection patterns remain supported.

For the full migration guide, see `references/xsuaa-to-ias-migration.md`.

## Trust Configuration

Trust between BTP subaccounts and IAS is established automatically when using the Identity service. For manual configurations:

- **SAML 2.0**: Upload SP metadata XML to the IAS application trust configuration
- **OIDC**: Configure redirect URIs, post-logout URIs, and client authentication

### BTP Subaccount Trust

In the BTP cockpit, under **Security** > **Trust Configuration**, the IAS tenant appears after establishing the service binding. The Identity service creates the trust automatically.

For details, see `references/troubleshooting.md` and `references/app-integration-patterns.md`.

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid redirect URI` | Redirect URI in IAS app doesn't match the approuter callback URL | Add the exact URI (including protocol and trailing slash) in IAS app > Trust > Redirect URIs |
| `Token audience mismatch` | Token `aud` claim doesn't include the expected client ID | Verify the application's client ID matches the one in IAS; check the Identity service binding |
| `Trust not established` | BTP subaccount has no trust to the IAS tenant | Re-bind the Identity service instance or manually add IAS as trust configuration in BTP cockpit |
| `Missing role collections` | User has no roles assigned in BTP | Assign role collections in BTP cockpit > Security > Role Collections, or configure AMS policies |
| `401 on service-to-service call` | Client credentials invalid or missing | Regenerate client secret/certificate; verify binding credentials |
| `SAML assertion expired` | Clock drift between IdP and IAS | Synchronize system clocks; check IAS tenant SAML settings |
| `Provisioning job failed` | Source/target system connection issue | Check system properties, certificates, and connectivity in IPS admin console |
| `Issuer mismatch in token` | IAS tenant URL changed or wrong tenant | Verify the `iss` claim matches the IAS tenant URL configured in the BTP trust |

## Bundled Resources

1. `references/identity-authentication.md` — IAS app registration, OIDC/SAML configuration, corporate IdP federation, conditional authentication, user store
2. `references/identity-provisioning.md` — IPS source/target/proxy systems, jobs, transformations, real-time provisioning, troubleshooting
3. `references/authorization-management.md` — AMS policy language (DCL), policy lifecycle, CAP/BTP integration, instance-based authorization
4. `references/xsuaa-to-ias-migration.md` — XSUAA vs IAS decision guide, coexistence, migration steps, role-collection mapping
5. `references/app-integration-patterns.md` — Approuter + IAS, CAP + IAS/AMS, SAPUI5 frontends, mTLS/certificate auth for service-to-service
6. `references/troubleshooting.md` — Trust errors, token validation failures, audience/issuer mismatches, SAML vs OIDC pitfalls

## Documentation Links

- [SAP Cloud Identity Services](https://help.sap.com/docs/cloud-identity-services) — main documentation
- [What Are Cloud Identity Services](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/what-is-identity-authentication) — service overview
- [Operation Guide](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/operation-guide) — administration console guide
- [Configuring Authorization Policies](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configuring-authorization-policies) — AMS administration
- [Configuring Provisioning Systems](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configuring-provisioning-systems) — IPS setup
- [Identity Service of SAP BTP](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/integrating-service-with-identity-service-of-sap-btp) — automatic IAS integration
- [CAP IAS/XSUAA Guide](https://cap.cloud.sap/docs/guides/integration/platform/ias-xsuaa) — CAP framework integration
- [SAP-docs GitHub Mirror](https://github.com/SAP-docs/btp-cloud-identity-services) — plain markdown documentation
