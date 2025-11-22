# SAP BTP Job Scheduling Service - Security Guide

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs/50---Security
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Security Overview](#security-overview)
2. [OAuth 2.0 Authentication](#oauth-20-authentication)
3. [XSUAA Configuration](#xsuaa-configuration)
4. [Scope Management](#scope-management)
5. [Credential Rotation](#credential-rotation)
6. [Data Protection](#data-protection)
7. [Best Practices](#best-practices)

---

## Security Overview

### Authentication Methods

| Service Plan | Authentication | Protocol |
|--------------|----------------|----------|
| lite | HTTP Basic Auth | HTTPS |
| standard | OAuth 2.0 | HTTPS |

### Security Architecture

```
┌─────────────────┐    OAuth Token    ┌──────────────────┐
│  Job Scheduling │ ───────────────── │   Your App       │
│     Service     │                   │ (Action Endpoint)│
└────────┬────────┘                   └────────┬─────────┘
         │                                     │
         │ Token Request                       │ Token Validation
         │                                     │
         └──────────────┬──────────────────────┘
                        │
               ┌────────┴────────┐
               │      XSUAA      │
               │ (Token Issuer)  │
               └─────────────────┘
```

### Key Security Features

- OAuth 2.0 protected communication for API access
- OAuth 2.0 protected job action endpoint invocation
- Token-based authentication with configurable scopes
- Support for X.509 certificate-based authentication
- Credential rotation via binding/unbinding

---

## OAuth 2.0 Authentication

### Token Flow for Job Execution

1. **Job Scheduling requests token** from XSUAA using service credentials
2. **XSUAA validates credentials** and returns access token with granted scopes
3. **Job Scheduling calls action endpoint** with Bearer token in Authorization header
4. **Application validates token** using bound XSUAA instance
5. **Application processes request** if token is valid

### Token Acquisition

**Client Credentials Flow (clientsecret):**

```bash
curl -X POST "https://<uaa-url>/oauth/token" \
  -H "Authorization: Basic $(echo -n '<clientid>:<clientsecret>' | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials"
```

**Certificate-Based Authentication:**

```bash
curl -X POST "https://<certurl>/oauth/token" \
  --cert /path/to/certificate.pem \
  --key /path/to/key.pem \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=<clientid>"
```

### Token Response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 43199,
  "scope": "uaa.resource my-app.JOBSCHEDULER",
  "jti": "abc123..."
}
```

### Token Caching

- Tokens cached for up to **12 hours**
- Scope changes may take time to propagate
- If scope names change, cached tokens may cause errors

---

## XSUAA Configuration

### xs-security.json Structure

```json
{
  "xsappname": "<application-name>",
  "tenant-mode": "dedicated",
  "scopes": [
    {
      "name": "$XSAPPNAME.JOBSCHEDULER",
      "description": "Job Scheduler Scope",
      "grant-as-authority-to-apps": [
        "$XSSERVICENAME(<jobscheduler-instance-name>)"
      ]
    }
  ],
  "authorities": [
    "$XSAPPNAME.JOBSCHEDULER"
  ]
}
```

### Configuration Elements

| Element | Purpose |
|---------|---------|
| `xsappname` | Unique application identifier |
| `tenant-mode` | Multitenancy mode (dedicated/shared) |
| `scopes` | OAuth scopes definition |
| `grant-as-authority-to-apps` | Grant scope to other services |
| `authorities` | Scopes the app can request |

### Variable Substitution

| Variable | Resolves To |
|----------|-------------|
| `$XSAPPNAME` | Value of `xsappname` field |
| `$XSSERVICENAME(name)` | Service instance identifier |

### Create/Update XSUAA Instance

**Create:**

```bash
cf create-service xsuaa application my-xsuaa -c xs-security.json
```

**Update:**

```bash
cf update-service my-xsuaa -c xs-security.json
```

**Bind:**

```bash
cf bind-service my-app my-xsuaa
cf restage my-app
```

---

## Scope Management

### Granting Scopes to Job Scheduling

The `grant-as-authority-to-apps` property enables Job Scheduling to obtain your application's scopes:

```json
{
  "scopes": [{
    "name": "$XSAPPNAME.JOBSCHEDULER",
    "description": "Job Scheduler Scope",
    "grant-as-authority-to-apps": [
      "$XSSERVICENAME(my-jobscheduler)"
    ]
  }]
}
```

### Multiple Scopes

Grant multiple scopes if your application requires different permissions:

```json
{
  "scopes": [
    {
      "name": "$XSAPPNAME.JobRead",
      "description": "Read job data",
      "grant-as-authority-to-apps": ["$XSSERVICENAME(my-jobscheduler)"]
    },
    {
      "name": "$XSAPPNAME.JobWrite",
      "description": "Write job data",
      "grant-as-authority-to-apps": ["$XSSERVICENAME(my-jobscheduler)"]
    }
  ]
}
```

### Verifying Scope Grants

**Get Token Manually:**

```bash
# Get token using Job Scheduling credentials
curl -X POST "<job-scheduler-uaa-url>/oauth/token" \
  -H "Authorization: Basic $(echo -n '<clientid>:<clientsecret>' | base64)" \
  -d "grant_type=client_credentials"
```

**Decode Token (jwt.io or similar):**

Check the `scope` claim includes your granted scopes.

### Troubleshooting Scope Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Scope not in token | Not granted | Update xs-security.json |
| 401 on action endpoint | Token invalid | Verify XSUAA binding |
| Scope grant delayed | Token caching | Wait up to 12 hours |

---

## Credential Rotation

### Process Overview

Credentials are binding-level, meaning new credentials are created each time you bind the service.

### Rotation Steps

**1. Unbind Service:**

```bash
cf unbind-service my-app my-jobscheduler
```

**2. Rebind Service:**

```bash
cf bind-service my-app my-jobscheduler
```

**3. Restage Application:**

```bash
cf restage my-app
```

### Key Points

| Aspect | Behavior |
|--------|----------|
| Old credentials | Invalidated immediately on unbind |
| New credentials | Generated automatically on rebind |
| Token requests | Will fail with old credentials after unbind |
| Downtime | Brief during restage |

### X.509 Certificate Rotation

For certificate-based bindings:

```bash
# Unbind
cf unbind-service my-app my-jobscheduler

# Rebind with new certificate parameters
cf bind-service my-app my-jobscheduler -c parameters.json

# Restage
cf restage my-app
```

Certificate parameters.json:

```json
{
  "credential-type": "x509",
  "x509": {
    "key-length": 2048,
    "validity": 30,
    "validity-type": "DAYS"
  }
}
```

### Zero-Downtime Rotation (Advanced)

For production systems requiring zero downtime:

1. Create second service binding (if supported)
2. Update application to use new binding
3. Remove old binding

---

## Data Protection

### Personal Data Handling

The Job Scheduling service does **not** provide technical capabilities to support collection, processing, and storage of personal data.

### Fields NOT Intended for Personal Data

| Field | Risk |
|-------|------|
| Job names | Visible in logs and dashboard |
| Schedule descriptions | Stored in service database |
| Response message text | Stored in run logs |
| Custom data payloads | Passed to action endpoints |

### Compliance Considerations

- Data protection requires case-by-case evaluation
- Organizations must assess specific legal requirements
- SAP does not provide legal advice
- System landscape configuration affects compliance

### Run Log Retention

- Run logs automatically deleted after **15 days**
- Download logs before deletion if needed for compliance
- Consider data classification before including sensitive info

---

## Best Practices

### HTTPS Requirements

- **Always use HTTPS** for action endpoints in production
- HTTP allowed only for development/testing
- Dashboard enforces HTTPS requirement for job creation

### Scope Naming

- Use descriptive, consistent scope names
- Include purpose in scope descriptions
- Follow naming conventions: `$XSAPPNAME.<PurposeDescription>`

### Credential Management

| Practice | Recommendation |
|----------|----------------|
| Storage | Never hardcode credentials |
| Rotation | Rotate quarterly minimum |
| X.509 | Prefer certificates over secrets |
| Validity | Set appropriate certificate validity |

### Token Validation

Implement proper token validation in action endpoints:

```javascript
const xsenv = require('@sap/xsenv');
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');

// Configure passport with XSUAA
const services = xsenv.getServices({ uaa: { tag: 'xsuaa' } });
passport.use(new JWTStrategy(services.uaa));

// Protect endpoint
app.post('/api/process',
  passport.authenticate('JWT', { session: false }),
  (req, res) => {
    // Validate specific scope
    if (!req.authInfo.checkScope('$XSAPPNAME.JOBSCHEDULER')) {
      return res.status(403).send('Forbidden');
    }
    // Process request
  }
);
```

**Required packages:**
```bash
npm install @sap/xsenv @sap/xssec passport
```

### Cloud Foundry Tasks

- CF tasks use Cloud Foundry UAA (CFUAA), not XSUAA
- XSUAA binding not required for CF task creation
- Space Developer role required for task management

---

## Security Checklist

### Initial Setup

- [ ] XSUAA instance created with xs-security.json
- [ ] Scopes defined with appropriate descriptions
- [ ] `grant-as-authority-to-apps` configured for Job Scheduling
- [ ] XSUAA bound to application before Job Scheduling
- [ ] Application restaged after bindings

### Action Endpoint

- [ ] HTTPS enabled (required for production)
- [ ] Token validation implemented
- [ ] Scope verification in endpoint handler
- [ ] Error handling for auth failures

### Ongoing Operations

- [ ] Credential rotation scheduled (quarterly)
- [ ] Token caching behavior understood
- [ ] Run log retention policy defined
- [ ] Personal data handling documented

---

## External References

### SAP Documentation
- **Security Overview**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/security
- **Secure Access**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/secure-access
- **XSUAA Documentation**: https://help.sap.com/docs/btp/sap-business-technology-platform/security

### Source Files
- `security-9fb8213.md`
- `secure-access-745ca50.md`
- `define-and-grant-scopes-to-sap-job-scheduling-service-08933d3.md`
- `credential-rotation-ed3bf28.md`
