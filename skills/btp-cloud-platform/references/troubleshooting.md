# Troubleshooting Reference

Common issues and solutions for SAP BTP.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/60-security

---

## Table of Contents

1. [Authentication Issues](#authentication-issues)
2. [Authorization Issues](#authorization-issues)
3. [Trust Configuration Issues](#trust-configuration-issues)
4. [Token Issues](#token-issues)
5. [XSUAA Issues](#xsuaa-issues)
6. [Cloud Foundry Issues](#cloud-foundry-issues)
7. [Kyma Issues](#kyma-issues)
8. [Connectivity Issues](#connectivity-issues)
9. [Service Instance Issues](#service-instance-issues)

---

## Authentication Issues

### Login Screen Shows "SAP HANA XS Advanced"

**Cause**: Application using wrong login endpoint

**Solution**:
1. Check xs-app.json authentication configuration
2. Verify XSUAA service binding
3. Ensure correct UAA URL in environment

### Identity Provider Could Not Process Authentication Request

**Cause**: Trust configuration mismatch

**Solution**:
1. Verify trust configuration in subaccount
2. Check IdP SAML/OIDC metadata is current
3. Ensure certificates are not expired
4. Verify assertion consumer service URL

### Access Is Denied or Forbidden

**Causes**:
- Missing role assignments
- Incorrect scope configuration
- User not in required group

**Solutions**:
1. Check user role collection assignments
2. Verify application scopes in xs-security.json
3. Check IdP group mappings
4. Verify trust configuration

### AuthnRequest Expired

**Cause**: Time synchronization issue between IdP and BTP

**Solution**:
1. Sync IdP server time with NTP
2. Check for clock skew > 5 minutes
3. Verify SAML response timestamps

---

## Authorization Issues

### Cannot Add Role Templates to Predefined Role Collections

**Cause**: Predefined role collections are immutable

**Solution**:
1. Create custom role collection
2. Add desired role templates
3. Assign custom role collection to users

### User Has Role But Still Gets 403

**Causes**:
- Scope not checked in application
- Cache not refreshed
- Wrong role collection assigned

**Solutions**:
1. Verify application checks correct scope
2. Clear browser cache, re-login
3. Check role collection contains required roles
4. Verify role template references correct scopes

### Missing Administrator Access

**Cause**: No administrator assigned to account

**Solutions**:
1. Contact SAP support if locked out
2. Use emergency administrator in default IdP
3. Check SAP ID Service access

---

## Trust Configuration Issues

### 409 Error When Deleting Custom Identity Provider

**Cause**: Trust configuration still in use

**Solution**:
1. Remove all user assignments from this IdP
2. Delete shadow users from this IdP origin
3. Then delete trust configuration

### Subdomain Does Not Map to Valid Identity Zone

**Cause**: Invalid or non-existent subaccount subdomain

**Solutions**:
1. Verify subdomain in subaccount settings
2. Check UAA URL format
3. Ensure subaccount exists and is active

### IAS Application Reference Not Created

**Cause**: Identity Authentication tenant issue

**Solutions**:
1. Verify Identity Authentication subscription
2. Check trust configuration status
3. Re-establish trust if needed

### Trust Establishment Issues

**Common causes**:
- Expired certificates
- Incorrect metadata
- Network issues

**Solutions**:
1. Re-download IdP metadata
2. Update trust configuration
3. Verify network connectivity to IdP

---

## Token Issues

### 400 Error: OAuth Token Call Not Successful

**Causes**:
- Invalid client credentials
- Wrong token endpoint
- Expired client secret

**Solutions**:
1. Verify client ID and secret
2. Check token service URL
3. Regenerate service key if needed

### Token Retrieval Fails with 401

**Causes**:
- Invalid credentials
- Token expired
- Wrong authentication method

**Solutions**:
1. Check client credentials in service binding
2. Verify token not expired
3. Use correct grant type

### Invalid Redirect URI

**Cause**: Callback URL not registered in XSUAA

**Solution**:
1. Add redirect URI to xs-security.json:
```json
{
  "oauth2-configuration": {
    "redirect-uris": [
      "https://myapp.cfapps.eu10.hana.ondemand.com/**"
    ]
  }
}
```
2. Update service instance
3. Restage application

---

## XSUAA Issues

### No Client with Requested ID

**Cause**: Service instance not found or wrong client ID

**Solutions**:
1. Verify XSUAA service instance exists
2. Check VCAP_SERVICES for correct credentials
3. Ensure binding is active

### XSUAA Limits Exceeded

**Limits**:
- 100 role templates per application
- 100 scopes per application
- 50 attributes per application

**Solution**: Consolidate roles and scopes

### Sharing Service Instance Issues

**Solutions**:
1. Verify instance supports sharing
2. Check cross-subaccount trust
3. Use service instance sharing API

---

## Cloud Foundry Issues

### Application Won't Start

**Common causes**:
- Out of memory
- Port binding issues
- Missing dependencies
- Buildpack errors

**Debugging**:
```bash
# View logs
cf logs my-app --recent

# Check events
cf events my-app

# SSH for debugging
cf ssh my-app
```

### Service Binding Failed

**Causes**:
- Service not available in space
- Quota exceeded
- Service broker error

**Solutions**:
1. Check marketplace availability
2. Verify quota assignments
3. Check service broker status

### Requested Route Does Not Exist

**Causes**:
- Route not mapped
- Application stopped
- Wrong domain

**Solutions**:
1. Map route: `cf map-route my-app cfapps.eu10.hana.ondemand.com -n my-hostname`
2. Start application
3. Verify domain is correct

### Push Fails with Timeout

**Solutions**:
1. Increase timeout: `cf push -t 180`
2. Check buildpack compatibility
3. Reduce application size
4. Check staging logs

---

## Kyma Issues

### Pod Not Starting

**Debugging**:
```bash
# Check pod status
kubectl describe pod <pod-name> -n <namespace>

# View events
kubectl get events -n <namespace> --sort-by='.lastTimestamp'

# Check logs
kubectl logs <pod-name> -n <namespace>
```

**Common causes**:
- Image pull errors
- Resource limits
- Configuration errors

### Service Binding Not Working (BTP Operator)

**Causes**:
- BTP Operator module not installed
- Incorrect service instance name
- Namespace issues

**Solutions**:
1. Verify BTP Operator module enabled
2. Check ServiceInstance status
3. Verify namespace labels

### API Rule Not Working

**Debugging**:
```bash
kubectl get apirules -n <namespace>
kubectl describe apirule <name> -n <namespace>
```

**Common causes**:
- Wrong host configuration
- Authentication configuration issues
- Istio gateway issues

---

## Connectivity Issues

### Destination Not Found

**Causes**:
- Destination not created
- Wrong destination name
- Missing binding

**Solutions**:
1. Create destination in subaccount
2. Verify exact name match
3. Bind destination service to app

### Cloud Connector Not Connected

**Causes**:
- Network issues
- Certificate expired
- Configuration error

**Solutions**:
1. Check Cloud Connector status
2. Verify certificates
3. Check firewall rules
4. Review Cloud Connector logs

### Principal Propagation Failing

**Causes**:
- Trust not configured
- Certificate mapping incorrect
- Backend system configuration

**Solutions**:
1. Verify trust chain complete
2. Check certificate subject mapping
3. Configure backend for SSO

---

## Service Instance Issues

### Instance Creation Failed

**Common causes**:
- Quota exceeded
- Invalid parameters
- Service plan unavailable

**Debugging**:
```bash
# CF CLI
cf service my-service

# Check marketplace
cf marketplace -e <service>
```

### Extension Service Instance Failed

**For S/4HANA Extensibility**:
1. Verify system registration complete
2. Check communication arrangement syntax
3. Verify entitlements assigned

**For SuccessFactors Extensibility**:
1. Verify system registration
2. Check technical user credentials
3. Verify SSO configuration if used

---

## Debugging Commands

### Cloud Foundry

```bash
# Application info
cf app my-app
cf env my-app

# Logs
cf logs my-app --recent
cf logs my-app

# Events
cf events my-app

# SSH
cf ssh my-app
cf ssh my-app -c "cat /proc/meminfo"

# Services
cf services
cf service my-service
```

### Kyma/Kubernetes

```bash
# Pod debugging
kubectl get pods -n <ns>
kubectl describe pod <pod> -n <ns>
kubectl logs <pod> -n <ns>
kubectl exec -it <pod> -n <ns> -- /bin/sh

# Service debugging
kubectl get svc -n <ns>
kubectl describe svc <svc> -n <ns>

# Events
kubectl get events -n <ns> --sort-by='.lastTimestamp'

# Resource status
kubectl get all -n <ns>
```

### Token Debugging

```bash
# Decode JWT
echo "<token>" | cut -d. -f2 | base64 -d | jq

# Test token endpoint
curl -X POST "https://<uaa-url>/oauth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -u "client_id:client_secret"
```

---

## Related Documentation

- Security Troubleshooting: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/60-security/troubleshooting-for-sap-authorization-and-trust-management-service-c33d777.md
- Extensions Troubleshooting: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/40-extensions/troubleshooting-for-sap-s-4hana-cloud-extensibility-service-3725f59.md
- Getting Support: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/70-getting-support
