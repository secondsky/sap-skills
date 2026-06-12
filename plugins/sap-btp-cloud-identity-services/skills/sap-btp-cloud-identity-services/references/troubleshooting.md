# Troubleshooting — Complete Reference

**Source**: [Monitoring and Troubleshooting](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/monitoring-and-troubleshooting), [Getting Support](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/getting-support), [Configure Trust](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configure-trust)

---

## Trust Configuration Errors

### Error: "No trusted identity provider found"

**Symptoms**: Users see "No trusted identity provider found for the given request" when accessing an application.

**Causes**:
1. The application's trust configuration is missing or incomplete
2. The BTP subaccount has no trust to the IAS tenant
3. The IAS application doesn't have the correct SP metadata or redirect URIs

**Solutions**:
1. In IAS admin console, verify the application exists under **Applications & Resources** > **Applications**
2. Check the trust configuration:
   - For SAML: Verify SP metadata is uploaded correctly
   - For OIDC: Verify redirect URIs match the application callback URL exactly
3. In BTP cockpit, go to **Security** > **Trust Configuration** and verify the IAS tenant is listed
4. If using the Identity service, rebind the service instance:
   ```bash
   cf unbind-service myapp my-identity
   cf bind-service myapp my-identity
   cf restage myapp
   ```

### Error: "SAML assertion validation failed"

**Symptoms**: SAML assertion rejected by the service provider.

**Causes**:
1. Clock drift between IAS and the service provider
2. Assertion expired (default lifetime is short)
3. Signing certificate mismatch

**Solutions**:
1. Verify system clocks are synchronized (NTP)
2. In IAS admin console, check assertion lifetime settings under the application's SAML configuration
3. Verify the IAS signing certificate matches what the SP expects:
   - Download IAS signing certificate from **Applications & Resources** > **Tenant Settings** > **SAML 2.0 Configuration**
   - Upload to the service provider's trusted IdP certificates

---

## Token Validation Failures

### Error: "Invalid token" or "401 Unauthorized"

**Symptoms**: Backend service rejects the JWT token.

**Diagnosis steps**:
1. Decode the JWT token (use jwt.io or base64 decode the payload)
2. Check the following claims:

| Claim | Expected Value | Common Issue |
|-------|---------------|--------------|
| `iss` (issuer) | `https://<tenant>.accounts.ondemand.com` | Wrong issuer (XSUAA vs IAS) |
| `aud` (audience) | The OAuth client ID | Client ID mismatch after migration |
| `exp` (expiration) | Future timestamp | Token expired; check clock sync |
| `sub` (subject) | User identifier | Missing or incorrect subject mapping |
| `scope` | Expected OAuth scopes | Scopes not assigned in role collection |

### Error: "Audience mismatch"

**Symptoms**: Token `aud` claim doesn't include the expected client ID.

**Causes**:
1. The application uses a different client ID than what's in the token
2. Migration from XSUAA to Identity service changed the client ID
3. The token was issued for a different IAS application

**Solutions**:
1. Verify the binding credentials:
   ```bash
   cf env myapp
   # Check the clientid in VCAP_SERVICES
   ```
2. Ensure the backend service validates against the correct audience
3. If using multiple IAS applications, ensure the correct one is configured

### Error: "Issuer mismatch"

**Symptoms**: Token `iss` claim doesn't match the expected issuer URL.

**Causes**:
1. Migration from XSUAA to IAS changed the issuer URL
2. Wrong IAS tenant is configured
3. Custom domain configuration changes the issuer

**Solutions**:
1. Update the application's expected issuer to match IAS:
   - XSUAA issuer: `https://<subdomain>.authentication.<region>.hana.ondemand.com/oauth/token`
   - IAS issuer: `https://<tenant>.accounts.ondemand.com`
2. During migration, support both issuers during the transition period
3. Check the Identity service binding credentials for the correct issuer URL

---

## Redirect URI Errors

### Error: "Invalid redirect URI" or "redirect_uri_mismatch"

**Symptoms**: After authentication, users see an error instead of being redirected back to the application.

**Causes**:
1. The redirect URI in the IAS application doesn't match the callback URL
2. Missing trailing slash or different protocol (http vs https)
3. Port number mismatch

**Solutions**:
1. In IAS admin console, go to the application > **Trust** > **Redirect URIs**
2. Add all valid redirect URIs:
   ```
   https://myapp.cfapps.eu10.hana.ondemand.com/login/callback
   https://myapp.cfapps.eu10.hana.ondemand.com/
   ```
3. Ensure exact match including protocol, host, path, and trailing slashes
4. For the Identity service, configure redirect URIs in the service instance config

---

## Missing Role Collections

### Error: User has no access despite correct authentication

**Symptoms**: User authenticates successfully but gets 403 Forbidden on protected resources.

**Causes**:
1. Role collections not assigned to the user
2. Role templates not mapped correctly (XSUAA migration issue)
3. AMS policies not assigned to the user's group

**Solutions**:
1. In BTP cockpit, go to **Security** > **Role Collections**
2. Verify the user has the required role collection assigned
3. For AMS, check the IAS admin console > **Authorization Policies** for policy assignments
4. Check user group membership in the Identity Directory

---

## SAML vs OIDC Pitfalls

### SAML-Specific Issues

| Issue | Solution |
|-------|----------|
| Name ID format mismatch | Configure the expected format in IAS app > Subject Name Identifier |
| Assertion consumer URL wrong | Update SP metadata or enter ACS URL manually |
| Attribute statements missing | Configure user attributes in IAS app > Assertions |
| Session timeout too short | Adjust in IAS app > Authentication > Session settings |

### OIDC-Specific Issues

| Issue | Solution |
|-------|----------|
| ID token missing claims | Configure scopes in IAS app > Trust > Scopes |
| Access token too large | Reduce claims; use reference tokens instead of JWT |
| Refresh token not issued | Enable refresh tokens in IAS app > Trust |
| PKCE verification failed | Ensure the approuter/client uses the correct code verifier |

---

## Provisioning Troubleshooting

### Provisioning Job Stuck or Failed

1. Check job logs in IPS admin console
2. Verify source/target system connectivity
3. Check for rate limits (configure `ips.max.retry.count`)
4. Review transformation logs for mapping errors
5. Enable `ips.trace.failed.entity.requests` for detailed failure logging

### Users Not Syncing

1. Verify the source system filter (`ips.sql.condition`) isn't too restrictive
2. Check transformation mappings for required attributes
3. Ensure the target system's SCIM endpoint is accessible
4. Verify delta read is supported by the source system

---

## Diagnostic Tools

### IAS Admin Console

- **Monitoring** > **Audit Logs**: Authentication events, configuration changes
- **Monitoring** > **Usage Statistics**: Login metrics, application usage
- **Applications** > **[App]** > **Authentication**: View authentication methods and logs

### BTP Cockpit

- **Security** > **Trust Configuration**: Verify IdP trust
- **Security** > **Role Collections**: Verify role assignments
- **Instances and Subscriptions**: Verify service bindings

### Token Inspection

Decode JWT tokens to verify claims:
```bash
# Decode token payload
echo "<token-payload>" | base64 -d | jq .
```

Key claims to verify:
- `iss`, `aud`, `sub`, `exp`, `iat`
- `scope`, `xs.user.attributes` (XSUAA), `user_attributes` (IAS)
- `tenant` (for multi-tenant apps)

*Source: [Getting Support](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/getting-support)*
