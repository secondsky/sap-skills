# API Management - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/apim/API-Management
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [API Proxy Structure](#api-proxy-structure)
3. [Creating API Proxies](#creating-api-proxies)
4. [Policies Reference](#policies-reference)
5. [Developer Hub](#developer-hub)
6. [Analytics](#analytics)
7. [Best Practices](#best-practices)

---

## Overview

API Management provides complete API lifecycle management including:
- API design and creation
- Security and access control
- Traffic management
- Analytics and monitoring
- Developer engagement

**Core Components**:
| Component | Purpose |
|-----------|---------|
| API Proxy | Facade for backend services |
| Policies | Runtime behavior rules |
| Products | API bundles for subscription |
| Developer Hub | Developer portal |
| Analytics | Usage insights |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/what-is-api-management-0aef763.md

---

## API Proxy Structure

### Flow Architecture

```
                         API Proxy
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Client Request                                             │
│       ↓                                                     │
│  ┌─────────────────────┐    ┌─────────────────────┐        │
│  │   Proxy Endpoint    │    │   Target Endpoint   │        │
│  ├─────────────────────┤    ├─────────────────────┤        │
│  │  PreFlow            │    │  PreFlow            │        │
│  │    ↓                │    │    ↓                │        │
│  │  Conditional Flows  │ →→ │  Conditional Flows  │ →→ Backend
│  │    ↓                │    │    ↓                │        │
│  │  PostFlow           │    │  PostFlow           │        │
│  │    ↓                │    │    ↓                │        │
│  │  FaultRules         │    │  FaultRules         │        │
│  └─────────────────────┘    └─────────────────────┘        │
│                                                             │
│  Backend Response                                           │
│       ↓                                                     │
│  (Flows execute in reverse for response)                    │
│       ↓                                                     │
│  Client Response                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Proxy Endpoint
Handles incoming client requests.

**Configuration**:
- Virtual host and base path
- Route rules
- Request/response policies
- Fault handling

### Target Endpoint
Connects to backend services.

**Configuration**:
- Backend URL
- Load balancing
- Health monitoring
- Connection settings

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/api-proxy-structure-4dfd54a.md

---

## Creating API Proxies

### Methods

1. **From API Provider**
   - Connect to SAP or non-SAP systems
   - Import API definitions automatically

2. **From URL**
   - Direct target endpoint URL
   - Manual configuration

3. **From API Designer**
   - Design OpenAPI specification
   - Generate proxy from design

4. **From Existing Proxy**
   - Copy and modify existing proxy
   - Clone for similar use cases

5. **From Cloud Integration**
   - Expose iFlow endpoints as APIs
   - Apply API policies to integration flows

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/different-methods-of-creating-an-api-proxy-4ac0431.md

### API Versioning

**Strategies**:
- URI versioning: `/v1/resource`
- Header versioning: `X-API-Version: 1`
- Query parameter: `?version=1`

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/api-versioning-b3cda3b.md

### API Revisions

Create non-destructive updates:
- Draft revisions for testing
- Deploy specific revisions
- Rollback to previous versions

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/api-revisions-58097ac.md

---

## Policies Reference

### Common Attributes

All policies support:
```xml
<PolicyName enabled="true" continueOnError="false" async="false">
  <!-- Configuration -->
</PolicyName>
```

| Attribute | Description |
|-----------|-------------|
| `enabled` | Policy active (true/false) |
| `continueOnError` | Continue on failure |
| `async` | Execute asynchronously |

### Security Policies

#### Verify API Key
```xml
<VerifyAPIKey>
  <APIKey ref="request.header.x-api-key"/>
</VerifyAPIKey>
```

#### OAuth 2.0
Supports grant types:
- Client Credentials
- Authorization Code
- Password
- Implicit

```xml
<OAuthV2 name="OAuth-Validate">
  <Operation>VerifyAccessToken</Operation>
</OAuthV2>
```

#### Basic Authentication
```xml
<BasicAuthentication name="BasicAuth">
  <Operation>Decode</Operation>
  <User ref="request.header.username"/>
  <Password ref="request.header.password"/>
</BasicAuthentication>
```

#### SAML Assertion
Validate SAML tokens for SSO scenarios.

#### Access Control
IP-based access restrictions.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/verify-api-key-4d15a04.md

### Traffic Management Policies

#### Quota
Limit API calls over time periods.
```xml
<Quota name="CheckQuota">
  <Interval>1</Interval>
  <TimeUnit>month</TimeUnit>
  <Allow count="1000"/>
</Quota>
```

**Types**:
- Default: Fixed allocation
- FlexQuota: Dynamic allocation
- Calendar: Time-based periods

#### Spike Arrest
Prevent traffic spikes.
```xml
<SpikeArrest name="SpikeControl">
  <Rate>30pm</Rate>
</SpikeArrest>
```

**Rate formats**: `Xpm` (per minute), `Xps` (per second)

#### Concurrent Rate Limit
Limit simultaneous connections.

#### Response Cache
Cache backend responses.
```xml
<ResponseCache name="CacheResponse">
  <CacheKey>
    <KeyFragment ref="request.uri"/>
  </CacheKey>
  <ExpirySettings>
    <TimeoutInSec>3600</TimeoutInSec>
  </ExpirySettings>
</ResponseCache>
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/quota-1f742c1.md

### Mediation Policies

#### Assign Message
Modify request/response.
```xml
<AssignMessage name="SetHeaders">
  <Set>
    <Headers>
      <Header name="X-Custom">value</Header>
    </Headers>
  </Set>
  <AssignTo>request</AssignTo>
</AssignMessage>
```

#### Extract Variables
Extract data from messages.
```xml
<ExtractVariables name="ExtractData">
  <JSONPayload>
    <Variable name="userId">
      <JSONPath>$.user.id</JSONPath>
    </Variable>
  </JSONPayload>
</ExtractVariables>
```

#### JSON to XML / XML to JSON
Format conversion.

#### XSL Transform
Apply XSLT transformations.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/assign-message-523efe6.md

### Extension Policies

#### JavaScript
Custom logic with JavaScript.
```xml
<Javascript name="CustomLogic">
  <ResourceURL>jsc://script.js</ResourceURL>
</Javascript>
```

#### Python Script
Custom logic with Python.

#### Service Callout
Call external services.
```xml
<ServiceCallout name="CallService">
  <HTTPTargetConnection>
    <URL>https://service.example.com</URL>
  </HTTPTargetConnection>
</ServiceCallout>
```

### Threat Protection Policies

#### JSON Threat Protection
```xml
<JSONThreatProtection name="JSONProtect">
  <ArrayElementCount>20</ArrayElementCount>
  <ContainerDepth>10</ContainerDepth>
  <ObjectEntryCount>15</ObjectEntryCount>
  <StringValueLength>500</StringValueLength>
</JSONThreatProtection>
```

#### XML Threat Protection
Prevent XML bombs and malformed XML.

#### Regular Expression Protection
Block injection attacks.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/json-threat-protection-952cbd7.md

### Fault Handling

#### Raise Fault
Generate custom errors.
```xml
<RaiseFault name="InvalidRequest">
  <FaultResponse>
    <Set>
      <StatusCode>400</StatusCode>
      <ReasonPhrase>Bad Request</ReasonPhrase>
      <Payload contentType="application/json">
        {"error": "Invalid input"}
      </Payload>
    </Set>
  </FaultResponse>
</RaiseFault>
```

### Logging Policies

#### Message Logging
Log to external systems.

#### Statistics Collector
Collect custom metrics.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/policy-types-c918e28.md

---

## Developer Hub

### Overview
Self-service portal for API discovery and subscription.

**Features**:
- API documentation
- Interactive testing
- Application registration
- Subscription management
- Analytics dashboard

### Products
Bundle APIs for subscription.

**Configuration**:
- Included APIs
- Rate plans
- Access control
- Custom attributes

### Applications
Developer registrations for API access.

**Workflow**:
1. Developer registers on portal
2. Creates application
3. Subscribes to products
4. Receives API key/credentials
5. Accesses APIs

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/developer-hub-41f7c45.md

---

## Analytics

### Dashboard Views
- API usage trends
- Response times
- Error rates
- Developer activity
- Geographic distribution

### Custom Reports
Create custom analytics with:
- Dimensions (what to measure)
- Measures (how to aggregate)
- Filters (what to include)

### Statistics Collector Policy
Capture custom metrics in API flows.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/api-analytics-6766dc3.md

---

## Best Practices

### Security
1. Always use API keys or OAuth
2. Apply threat protection policies
3. Validate input data
4. Use HTTPS only
5. Implement rate limiting

### Performance
1. Cache responses where appropriate
2. Use compression
3. Minimize policy chain length
4. Stream large payloads

### Design
1. Use consistent naming conventions
2. Version APIs properly
3. Document all endpoints
4. Use policy templates for reuse
5. Test with API debugger

### Operations
1. Monitor analytics regularly
2. Set up alerts for errors
3. Review quota usage
4. Keep certificates updated

---

## Variables Reference

### Request Variables
```
request.header.{name}
request.queryparam.{name}
request.path
request.uri
request.verb
```

### Response Variables
```
response.header.{name}
response.status.code
response.content
```

### Flow Variables
```
proxy.basepath
proxy.pathsuffix
target.url
error.message
error.status.code
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/variable-references-4f8993f.md

---

## Related Documentation

- **Policies Guide**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/policies-7e4f3e5.md
- **Policy Types**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/policy-types-c918e28.md
- **API Proxy**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/apim/API-Management/api-proxy-8962643.md
- **Developer Hub**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/developer-hub-41f7c45.md
