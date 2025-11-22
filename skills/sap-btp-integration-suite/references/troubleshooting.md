# Troubleshooting - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Monitoring Overview](#monitoring-overview)
2. [Message Processing Errors](#message-processing-errors)
3. [Adapter Issues](#adapter-issues)
4. [Mapping Errors](#mapping-errors)
5. [Security Issues](#security-issues)
6. [Deployment Issues](#deployment-issues)
7. [Performance Issues](#performance-issues)
8. [API Management Issues](#api-management-issues)
9. [HTTP Error Catalog](#http-error-catalog)

---

## Monitoring Overview

### Accessing Monitoring

```
Integration Suite → Monitor → Integrations and APIs
    ├── Monitor Message Processing
    │   ├── All Integration Flows
    │   ├── All Artifacts
    │   └── By specific criteria
    ├── Manage Integration Content
    │   └── Deployed artifacts status
    ├── Manage Security
    │   ├── Keystore
    │   ├── User Credentials
    │   └── Security Material
    └── Manage Stores
        ├── Data Stores
        ├── Variables
        ├── Message Queues
        └── Number Ranges
```

### Message Status Types

| Status | Meaning |
|--------|---------|
| **Completed** | Successfully processed |
| **Failed** | Processing failed with error |
| **Retry** | Failed, retry scheduled |
| **Escalated** | Exceeded retry limit |
| **Processing** | Currently processing |
| **Discarded** | Intentionally discarded |

### Log Levels

| Level | Information Captured |
|-------|---------------------|
| **None** | No logging |
| **Error** | Errors only |
| **Info** | Standard operations |
| **Debug** | Detailed debugging |
| **Trace** | Full message content (use sparingly) |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/monitor-message-processing-314df3f.md

---

## Message Processing Errors

### Common Error Types

#### 1. Connection Refused
**Symptom**: Cannot connect to target system
**Causes**:
- Target system down
- Firewall blocking
- Wrong hostname/port
- Cloud Connector not running

**Resolution**:
1. Verify target URL is correct
2. Check firewall rules
3. Verify Cloud Connector status
4. Test connectivity manually

#### 2. Connection Timeout
**Symptom**: Request times out waiting for response
**Causes**:
- Slow backend response
- Network latency
- Timeout too short
- Large payload processing

**Resolution**:
1. Increase adapter timeout
2. Optimize backend processing
3. Check network path
4. Consider async processing

#### 3. Authentication Failed
**Symptom**: 401/403 errors
**Causes**:
- Wrong credentials
- Expired tokens
- Missing permissions
- Certificate issues

**Resolution**:
1. Verify credential artifact
2. Check token expiration
3. Verify user permissions
4. Update certificates

#### 4. Certificate Errors
**Symptom**: SSL/TLS handshake failures
**Causes**:
- Expired certificate
- Untrusted CA
- Hostname mismatch
- Wrong certificate chain

**Resolution**:
1. Check certificate expiration
2. Import CA certificate to keystore
3. Verify hostname in certificate
4. Ensure complete certificate chain

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-cloud-integration-37743c2.md

---

## Adapter Issues

### SFTP/FTP Adapter

| Issue | Cause | Resolution |
|-------|-------|------------|
| Connection refused | Firewall, wrong port | Check connectivity, verify port |
| Authentication failed | Wrong credentials/key | Update credential artifact |
| File not found | Wrong path, permissions | Verify path, check permissions |
| Permission denied | User lacks access | Grant necessary permissions |
| Timeout | Slow network, large files | Increase timeout, check network |

### HTTP/HTTPS Adapter

| Issue | Cause | Resolution |
|-------|-------|------------|
| 400 Bad Request | Malformed request | Validate payload format |
| 401 Unauthorized | Invalid credentials | Check authentication config |
| 403 Forbidden | Missing permissions | Verify user/role access |
| 404 Not Found | Wrong URL | Verify endpoint URL |
| 500 Server Error | Backend issue | Check backend logs |
| 502 Bad Gateway | Proxy/LB issue | Check proxy configuration |
| 503 Service Unavailable | Backend overloaded | Retry later, check backend |
| Connection refused | Firewall, service down | Check connectivity |

### OData Adapter

| Issue | Cause | Resolution |
|-------|-------|------------|
| Metadata error | Wrong URL, version | Verify service URL/version |
| Entity not found | Wrong entity name | Check entity set name |
| Filter error | Invalid OData filter | Validate filter syntax |
| Pagination issues | Large result sets | Enable pagination |

### JMS Adapter

| Issue | Cause | Resolution |
|-------|-------|------------|
| Queue full | Too many messages | Check consumers, increase capacity |
| Message lost | Transaction rollback | Check error handling |
| Connection error | Broker issue | Check JMS broker status |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-adapters-b7a3906.md

---

## Mapping Errors

### Common Mapping Issues

#### Structure Mismatch
**Symptom**: Mapping execution fails
**Resolution**:
1. Verify source/target structures match schema
2. Check for missing mandatory fields
3. Validate namespace declarations

#### XPath Errors
**Symptom**: XPath expression returns empty/wrong result
**Resolution**:
1. Test XPath in isolation
2. Verify namespace prefixes
3. Check element names for typos
4. Use absolute paths for clarity

#### Null Pointer Exception
**Symptom**: NPE in mapping
**Resolution**:
1. Check for missing optional elements
2. Add null checks in functions
3. Provide default values

#### XSLT Errors
**Symptom**: XSLT transformation fails
**Resolution**:
1. Validate XSLT syntax
2. Check namespace handling
3. Verify template matching
4. Test with sample data

### Debugging Mappings

1. Enable trace logging
2. Add Content Modifier before mapping
3. Log intermediate values
4. Use local testing with sample data

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-message-mapping-cb5311a.md

---

## Security Issues

### Keystore Problems

| Issue | Resolution |
|-------|------------|
| Certificate not found | Import certificate to keystore |
| Certificate expired | Update with valid certificate |
| Private key missing | Import key pair, not just certificate |
| Wrong alias | Verify alias name in adapter config |
| Keystore sync failed | Check Edge Integration Cell connectivity |

### Credential Issues

| Issue | Resolution |
|-------|------------|
| Credential not found | Deploy credential artifact |
| Wrong password | Update credential artifact |
| OAuth token expired | Refresh token, check token URL |
| Certificate-based auth failed | Verify client certificate |

### Security Artifact Renewal

**Process**:
1. Prepare new certificate/key
2. Import to keystore (new alias)
3. Update adapter configuration
4. Test with new credentials
5. Remove old certificate (after validation)

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/security-artifact-renewal-083fc8d.md

---

## Deployment Issues

### Integration Flow Deployment

| Issue | Cause | Resolution |
|-------|-------|------------|
| Deployment failed | Syntax error | Check flow configuration |
| Resource not found | Missing artifact reference | Deploy referenced artifacts |
| Configuration error | Invalid parameters | Validate externalized parameters |
| Timeout | Complex flow | Simplify or split flow |
| Already exists | Duplicate ID | Use unique artifact ID |

### Debugging Deployment

1. Check deployment status in Monitor
2. Review deployment logs
3. Verify all referenced artifacts exist
4. Check runtime configuration
5. Validate adapter configurations

### Common Resolution Steps

1. **Undeploy** existing version
2. **Fix** the identified issue
3. **Save** the changes
4. **Deploy** again
5. **Verify** in monitoring

---

## Performance Issues

### Symptoms and Causes

| Symptom | Possible Causes |
|---------|-----------------|
| Slow processing | Large payloads, complex mappings |
| High memory usage | XmlSlurper.parseText, string concat |
| Timeouts | Backend latency, insufficient timeout |
| Queue backup | Consumer too slow, too many messages |

### Performance Optimization

1. **Streaming**
   - Use stream-based processing
   - Avoid loading entire payload into memory

2. **Mapping Optimization**
   - Reduce transformation complexity
   - Use XSLT for complex XML transforms
   - Cache repeated lookups

3. **Adapter Configuration**
   - Set appropriate timeouts
   - Use connection pooling
   - Enable compression where supported

4. **Flow Design**
   - Split large flows into smaller units
   - Use async processing where appropriate
   - Implement parallel processing

### Resource Monitoring

```
Monitor → Manage Stores → Inspect
├── Data Store Usage
├── Database Connection Usage
├── Transaction Usage
└── Monitoring Storage Usage
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/inspect-a4d5e49.md

---

## API Management Issues

### API Proxy Errors

| Error | Cause | Resolution |
|-------|-------|------------|
| 401 Invalid API Key | Wrong/expired key | Verify API key |
| 403 Access Denied | Policy restriction | Check access control policies |
| 429 Too Many Requests | Rate limit exceeded | Check quota/spike arrest |
| 500 Internal Error | Proxy misconfiguration | Debug proxy, check policies |
| 502 Bad Gateway | Backend unreachable | Verify target endpoint |
| 504 Gateway Timeout | Backend too slow | Increase timeout |

### Policy Debugging

1. Use **Debug** feature in API proxy
2. Check policy execution order
3. Verify policy conditions
4. Check variable values
5. Review fault rules

### Common Policy Issues

| Policy | Issue | Resolution |
|--------|-------|------------|
| Quota | Wrong counter | Check quota type and key |
| OAuth | Token validation failed | Verify token, check scope |
| Cache | Stale data | Check cache key, TTL |
| Transform | Format error | Validate input/output |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-api-management-e765066.md

---

## HTTP Error Catalog

### 4xx Client Errors

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 400 | Bad Request | Malformed payload, invalid syntax |
| 401 | Unauthorized | Missing/invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Wrong URL, resource doesn't exist |
| 405 | Method Not Allowed | Wrong HTTP method |
| 408 | Request Timeout | Client too slow |
| 409 | Conflict | Resource state conflict |
| 413 | Payload Too Large | Message exceeds limit |
| 415 | Unsupported Media Type | Wrong Content-Type |
| 429 | Too Many Requests | Rate limit exceeded |

### 5xx Server Errors

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 500 | Internal Server Error | Processing failure |
| 502 | Bad Gateway | Backend unreachable |
| 503 | Service Unavailable | Service overloaded |
| 504 | Gateway Timeout | Backend too slow |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-http-error-catalog-069b461.md

---

## Diagnostic Checklist

### Before Escalating

1. **Check Message Processing Log**
   - Error details
   - Stack trace
   - Payload at failure point

2. **Verify Configuration**
   - Adapter settings
   - Credentials
   - Certificates

3. **Test Connectivity**
   - Use connectivity test feature
   - Test endpoints independently
   - Check Cloud Connector

4. **Review Recent Changes**
   - Deployment history
   - Configuration changes
   - Certificate updates

5. **Check Resource Limits**
   - JMS queue capacity
   - Data store storage
   - Message size limits

---

## Related Documentation

- **Cloud Integration Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-cloud-integration-37743c2.md
- **API Management Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-api-management-e765066.md
- **Adapter Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-adapters-b7a3906.md
- **Edge Integration Cell Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-edge-integration-cell-816d9e4.md
- **HTTP Error Catalog**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-http-error-catalog-069b461.md
