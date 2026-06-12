# XSUAA to IAS Migration — Complete Reference

**Source**: [SAP Help Portal - Migration of Authentication from XSUAA to IAS](https://help.sap.com/docs/business-network-global-track-and-trace/administration-solution-owner-test-tenants/migration-of-authentication-from-xsuaa-to-ias), [CAP IAS/XSUAA Guide](https://cap.cloud.sap/docs/guides/integration/platform/ias-xsuaa), [SAP Community - Cloud Identity Services](https://pages.community.sap.com/topics/cloud-identity-services)

---

## Overview

SAP is migrating SAP BTP authentication from XSUAA (SAP Authorization and Trust Management Service) to Cloud Identity Services (IAS). This is a strategic shift that enables new capabilities like Joule (SAP's AI assistant), centralized identity management, and policy-based authorization (AMS).

---

## Current SAP Recommendation

### For New Applications

- Use the **Identity service** of SAP BTP (not XSUAA)
- The Identity service automatically creates OIDC applications in IAS
- Use AMS for authorization (policy-based) instead of XSUAA scopes
- Configure via BTP cockpit: create an `identity` service instance instead of `xsuaa`

### For Existing XSUAA Applications

- **Coexistence is supported** — XSUAA and IAS can work side by side
- Migration is **incremental** — not a big-bang switch
- SAP recommends migrating authentication to IAS while keeping XSUAA for backward compatibility during transition
- Existing `xs-security.json` role templates remain functional

*Source: [SAP Community Q1 2026 Release Highlights](https://pages.community.sap.com/topics/cloud-identity-services), [adesso blog on SAP IAM strategy](https://blog.adesso-bc.com/saps-new-identity-and-access-management-strategy/)*

---

## Key Differences

| Aspect | XSUAA | IAS (via Identity Service) |
|--------|-------|---------------------------|
| Service name | `xsuaa` | `identity` |
| Token format | JWT (opaque with UAA claims) | JWT (OIDC standard claims) |
| Application creation | Manual in xs-security.json | Automatic via Identity service |
| User store | SAP ID Service or custom IdP | Identity Directory (IAS) |
| Authorization | Scopes and role templates | AMS policies (DCL) or role collections |
| Token issuer | `<subdomain>.authentication...` | `<tenant>.accounts.ondemand.com` |
| Protocol | OAuth 2.0 / UAA-specific | OIDC / SAML 2.0 (standard) |
| Admin console | BTP cockpit (Security) | IAS admin console |

---

## Migration Steps

### Phase 1: Establish IAS Tenant

1. Obtain an IAS tenant (bundled with SAP cloud solution or self-service via BTP cockpit)
2. Configure the IAS tenant:
   - Set up corporate IdP federation if needed
   - Configure conditional authentication
   - Set up user store (Identity Directory)

### Phase 2: Create Identity Service Instance

Replace the XSUAA service instance with an Identity service instance:

```bash
# Old (XSUAA)
cf create-service xsuaa application my-xsuaa -c xs-security.json

# New (Identity service)
cf create-service identity application my-identity -c identity-config.json
```

The `identity-config.json`:
```json
{
  "display-name": "My Application",
  "redirect-uris": ["https://myapp.cfapps.eu10.hana.ondemand.com/login/callback"],
  "post-logout-redirect-uris": ["https://myapp.cfapps.eu10.hana.ondemand.com"]
}
```

### Phase 3: Update Application Binding

```bash
# Unbind old XSUAA
cf unbind-service myapp my-xsuaa

# Bind new Identity service
cf bind-service myapp my-identity

# Restage
cf restage myapp
```

### Phase 4: Update Application Code

Key changes in application code:

1. **Token validation**: Update expected issuer and audience from XSUAA to IAS
2. **User attribute access**: Map from UAA claims to OIDC standard claims
3. **Role checking**: Transition from XSUAA scopes to role collections or AMS policies
4. **Approuter configuration**: Update authentication configuration to use the Identity service

### Phase 5: Migrate Authorization (if using AMS)

1. Define AMS policies in DCL based on existing `@restrict` annotations
2. Deploy policies with the application
3. Assign policies to users via IAS admin console
4. Verify authorization behavior matches XSUAA role collections

### Phase 6: Validate and Cut Over

1. Test all authentication flows (login, SSO, SLO, token refresh)
2. Verify user attributes are correctly mapped
3. Confirm role/authorization assignments work
4. Monitor for token validation errors
5. Remove XSUAA service instance once stable

---

## Coexistence

During migration, XSUAA and IAS can coexist:

- Applications can accept tokens from both XSUAA and IAS
- Role collections in BTP cockpit can include roles from both services
- Users can authenticate via either path
- Use the `IAS` trust configuration alongside the existing `sap.default` trust

---

## Role Collection Mapping

XSUAA role templates map to IAS authorization policies:

| XSUAA Concept | IAS/AMS Equivalent |
|---------------|-------------------|
| Role template (in xs-security.json) | Base authorization policy (DCL) |
| Role (from template) | Policy with restrictions |
| Role collection | Group in Identity Directory with policy assignment |
| Scope (`$XSAPPNAME.scope`) | DCL `USE` rule |

---

## Common Migration Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Token issuer mismatch | Application expects XSUAA issuer | Update `issuer` validation to accept IAS issuer URL |
| Missing user attributes | OIDC claims differ from UAA claims | Map attributes: `user_name` → `preferred_username`, `email` → `email` |
| Role collections empty | Roles not assigned in new system | Recreate role collection assignments using IAS groups or AMS policies |
| Redirect URI rejected | IAS app has different redirect URIs | Update redirect URIs in Identity service config or IAS app |
| 401 after migration | Token audience doesn't match | Verify the `aud` claim includes the new client ID |
| Approuter errors | Authentication config still points to XSUAA | Update `xs-app.json` or approuter env to use Identity service binding |

---

## SAP BTP Samples

The SAP-samples repository provides a reference implementation for IAS integration in a CAP multitenant SaaS application:

- [Central user management using SAP IAS](https://github.com/SAP-samples/btp-cap-multitenant-saas/blob/main/docu/3-advanced/2-central-user-management-ias/README.md)

This sample demonstrates:
- Creating an IAS instance from BTP cockpit
- Configuring trust between BTP subaccount and IAS
- User onboarding via IPS
- Application authentication with IAS
