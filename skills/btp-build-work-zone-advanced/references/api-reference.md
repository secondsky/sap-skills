# SAP Build Work Zone API Reference

API reference for SCIM and OData APIs in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/btp-build-work-zone-advanced

---

## SCIM API

### Overview

SAP Build Work Zone implements SCIM 2.0 for user provisioning.

**Endpoint**: `/api/v1/scim`

**Authentication**: 2-legged OAuth using "Workzone API Client"

### Rate Limits

| Limit Type | Value |
|------------|-------|
| Hourly limit | 10,000 requests/tenant |
| Burst limit | 200 requests/minute |

### Response Headers

- `X-RateLimit-Limit`: Maximum hourly requests
- `X-RateLimit-Remaining`: Available requests
- `X-RateLimit-Reset`: Seconds until reset

### Content Type

All POST/PUT requests require:
```
Content-Type: application/json
```

### User Filtering

Supported filter: `SCIM.userName eq <value>`

### Maintenance Windows

During maintenance, API returns:
```
HTTP 503 Service Unavailable
```

---

## OData API

### Overview

SAP Build Work Zone uses OData v2 with v4 extensions.

**Format**: XML (AtomPub) or JSON

### Authentication

Same OAuth flow as SCIM API.

### Key Endpoints

- `/api/v1/OData/Groups` - Workspace management
- `/api/v1/OData/Members` - User management
- `/api/v1/OData/ContentItems` - Content operations

### Business Records

Configure OData annotations to display external business records:

1. Create OData metadata file
2. Register in Administration Console
3. Configure display annotations

---

## Webhooks

### Overview

Track platform events and send notifications to external applications.

### Configuration

1. Register webhook URL in Administration Console
2. Configure events to monitor
3. Set authentication tokens

### Event Types

- Workspace events
- Content events
- User events
- Feed events

---

**Documentation Links**:
- SAP API Hub: https://api.sap.com/ (SAP Cloud Portal Service)
- OData Docs: https://jam2.sapjam.com
