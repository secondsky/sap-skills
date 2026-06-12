# Application Integration Patterns — Complete Reference

**Source**: [Integrating the Service with the Identity Service of SAP BTP](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/integrating-service-with-identity-service-of-sap-btp), [CAP IAS/XSUAA Guide](https://cap.cloud.sap/docs/guides/integration/platform/ias-xsuaa), [SAP-docs GitHub Mirror](https://github.com/SAP-docs/btp-cloud-identity-services)

---

## Overview

This reference covers common patterns for integrating SAP Cloud Identity Services (IAS/AMS) with BTP applications, including SAPUI5 frontends, CAP backends, and service-to-service communication.

---

## Pattern 1: Approuter + IAS

The SAP Application Router (approuter) handles authentication for SAPUI5/Fiori applications. With IAS, the approuter delegates authentication to IAS via the Identity service.

### Architecture

```
Browser → Approuter → IAS (OIDC auth)
                     ↓
              Backend service (CAP/Java/Node.js)
```

### Configuration

1. Create an Identity service instance:
   ```bash
   cf create-service identity application my-identity -c config.json
   ```

2. Bind to the approuter:
   ```bash
   cf bind-service my-approuter my-identity
   ```

3. The approuter automatically:
   - Redirects unauthenticated users to IAS login
   - Handles the OIDC callback
   - Stores the JWT token in the session
   - Propagates the user identity to backend services

### xs-app.json (approuter configuration)

```json
{
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/api/(.*)$",
      "target": "$1",
      "destination": "backend-service",
      "authenticationType": "xsuaa"
    },
    {
      "source": "^(.*)$",
      "target": "$1",
      "authenticationType": "xsuaa"
    }
  ]
}
```

When using the Identity service, `authenticationType: "xsuaa"` works because the Identity service is backward-compatible with XSUAA token format in the approuter.

---

## Pattern 2: CAP + IAS/AMS

CAP applications integrate with IAS through the Identity service binding. CAP automatically handles token validation and user context.

### Node.js CAP Setup

1. Create an Identity service instance (see Pattern 1)
2. Bind it to the CAP application
3. CAP reads the binding and configures authentication

CAP uses the `@restrict` annotation for authorization:

```cds
using { cuid, managed } from '@sap/cds/common';

entity Books {
  key ID : Integer;
  title  : String;
  @restrict: [
    { grant: ['READ'], where: 'createdBy = $user' }
  ]
}
```

### CAP with AMS Policies

When deploying with AMS support, CAP converts `@restrict` annotations to DCL policies:

1. The `@restrict` → DCL conversion happens at build time
2. DCL policies are deployed alongside the application
3. Policies appear in the IAS admin console for refinement
4. Administrators assign policies to users/groups

### Java CAP Setup

For Java CAP applications, configure the Identity service in `application.yaml`:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://<tenant>.accounts.ondemand.com
```

Bind the Identity service instance to the Java application deployed on SAP BTP.

*Source: [CAP IAS/XSUAA Guide](https://cap.cloud.sap/docs/guides/integration/platform/ias-xsuaa)*

---

## Pattern 3: SAPUI5 Frontend + IAS

SAPUI5 applications authenticate through the approuter, which handles the IAS OIDC flow. The SAPUI5 app receives the user context from the approuter session.

### Key Considerations

- **User info**: Access via `sap.ushell.Container.getService("UserInfo")` in Fiori Launchpad
- **CSRF token**: Fetch from the backend service endpoint before POST/PUT/DELETE requests
- **Token refresh**: The approuter handles token refresh automatically
- **Logout**: Use the approuter's `/do/logout` endpoint

### SAPUI5 Manifest Configuration

Ensure the app communicates through the approuter (relative paths), not directly to IAS:

```json
{
  "sap.app": {
    "dataSources": {
      "mainService": {
        "uri": "/api/v2/catalog/",
        "type": "OData"
      }
    }
  }
}
```

---

## Pattern 4: mTLS / Certificate-Based Service-to-Service

For service-to-service authentication where no user context is needed, use X.509 client certificates with the Identity service.

### Creating a Certificate Binding

```bash
cf create-service-key my-identity my-key -c '{
  "certificate-type": "X.509",
  "key-length": 2048
}'
```

Or provide an existing certificate when binding:

```bash
cf bind-service myapp my-identity -c '{
  "certificate": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  "key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
}'
```

### Using Certificate Authentication

The binding provides:
- `clientid` — the OAuth client ID
- `certificate` — the X.509 certificate
- `key` — the private key
- `url` — the token endpoint (IAS)
- `certurl` — certificate-based token endpoint

Use the certificate to obtain an access token:

```bash
curl --cert client.crt --key client.key \
  -X POST "https://<tenant>.accounts.ondemand.com/oauth2/token" \
  -d "grant_type=client_credentials&client_id=<clientid>"
```

### Use Cases

- Backend microservices calling other services
- Cron jobs accessing BTP services
- Automated pipelines deploying to BTP
- Service mesh authentication

---

## Pattern 5: Principal Propagation with IAS

When a BTP application needs to call a backend system on behalf of the logged-in user:

1. The approuter provides the user's JWT token
2. The application exchanges the JWT token for a token accepted by the backend
3. Use the SAP Connectivity service for on-premise backends (via Cloud Connector)

The Identity service supports principal propagation through:
- **OAuth2JWTBearer** authentication in destination service
- **OAuth2UserTokenExchange** for token exchange flows
- The approuter handles user token propagation automatically

For detailed connectivity configuration, see the `sap-btp-connectivity` skill.

---

## Pattern 6: Multi-Tenant SaaS with IAS

For multi-tenant SaaS applications on SAP BTP:

1. Each subscriber gets their own IAS tenant (or uses their existing corporate IdP)
2. The SaaS application uses the Identity service with tenant-aware bindings
3. Trust is established between the subscriber's IAS tenant and the provider subaccount
4. AMS policies can be customized per subscriber

Key configuration:
- Provider account: Identity service instance with `application` plan
- Subscriber account: IAS tenant linked to the provider's application
- User assignment: Via IAS admin console or SCIM API

*Source: [SAP-samples BTP CAP Multitenant SaaS](https://github.com/SAP-samples/btp-cap-multitenant-saas/blob/main/docu/3-advanced/2-central-user-management-ias/README.md)*
