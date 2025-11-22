# SAP Build Work Zone API Reference

Complete API reference for SCIM, OData, and Webhook APIs in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## API Documentation Resources

| Resource | URL |
|----------|-----|
| SAP API Hub | https://api.sap.com/ (SAP Cloud Portal Service) |
| OData API Docs | https://jam2.sapjam.com/work_zone/ODataDocs/ui |
| Webhook Reference | https://jam2.sapjam.com/work_zone/ODataDocs/webhook_reference |

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

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum hourly requests |
| `X-RateLimit-Remaining` | Available requests |
| `X-RateLimit-Reset` | Seconds until reset |

### Content Type

All POST/PUT requests require:
```
Content-Type: application/json
```

### User Filtering

Supported filter: `SCIM.userName eq <value>`

### SCIM Operations

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List Users | `/api/v1/scim/Users` | GET |
| Get User | `/api/v1/scim/Users/{id}` | GET |
| Create User | `/api/v1/scim/Users` | POST |
| Update User | `/api/v1/scim/Users/{id}` | PUT |
| Delete User | `/api/v1/scim/Users/{id}` | DELETE |

### User Lists

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List User Lists | `/api/v1/scim/Groups` | GET |
| Get User List | `/api/v1/scim/Groups/{id}` | GET |
| Create User List | `/api/v1/scim/Groups` | POST |
| Update User List | `/api/v1/scim/Groups/{id}` | PUT |

### Maintenance Windows

During maintenance, API returns:
```
HTTP 503 Service Unavailable
```

---

## OData API

### Overview

SAP Build Work Zone uses OData v2 protocol with support for OData v4 query syntax (e.g., advanced `$filter`, `$select` expressions).

**Protocol**: OData v2 (with v4 query operator extensions)

**Format**: XML (AtomPub) or JSON

**Base URL**: `/api/v1/OData`

### Authentication

Same OAuth flow as SCIM API.

### Key Endpoints

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Groups | `/api/v1/OData/Groups` | Workspace management |
| Members | `/api/v1/OData/Members` | User management |
| ContentItems | `/api/v1/OData/ContentItems` | Content operations |
| Feeds | `/api/v1/OData/Feeds` | Feed operations |
| FeedEntries | `/api/v1/OData/FeedEntries` | Feed entries |

### Query Options

| Option | Example |
|--------|---------|
| $select | `$select=Id,Name` |
| $filter | `$filter=Name eq 'Value'` |
| $orderby | `$orderby=Created desc` |
| $top | `$top=10` |
| $skip | `$skip=20` |
| $expand | `$expand=Members` |

### Business Records

Configure OData annotations to display external business records:

1. Create OData metadata file with annotations
2. Register in Administration Console
3. Configure display annotations
4. Map to business record types

---

## Webhooks

### Overview

Track platform events and send notifications to external applications.

### Webhook URL Format

```
https://<host-url>/api/v2/ai/webhook
```

### Configuration

1. Register webhook URL in Administration Console
2. Configure events to monitor
3. Set authentication tokens
4. Test webhook delivery

### Event Types

| Category | Events |
|----------|--------|
| Workspace | Created, updated, deleted |
| Content | Created, modified, deleted |
| User | Joined, left, updated |
| Feed | Posted, commented, liked |

### Payload Structure

```json
{
  "action": "perform_actions",
  "context": {
    "senderId": "user_id"
  },
  "parameters": {
    // Event-specific parameters
  }
}
```

---

## Chatbot API

### Available Template Variables

When configuring chatbot webhooks, the following template variables are available:

| Variable | Description |
|----------|-------------|
| `{{participant_data.jamId}}` | Current user's Jam/Work Zone ID |
| `{{participant_data.email}}` | Current user's email address |
| `{{participant_data.firstName}}` | Current user's first name |
| `{{participant_data.lastName}}` | Current user's last name |
| `{{conversation_id}}` | Current conversation identifier |
| `{{memory.variableName}}` | Custom memory variable from bot |

### Webhook Actions

| Action | Description |
|--------|-------------|
| `perform_actions` | Execute platform actions |
| `ui5_card` | Render UI Integration Cards |

### Create Workspace Example

```json
{
  "action": "perform_actions",
  "context": { "senderId": "{{participant_data.jamId}}" },
  "parameters": {
    "actionName": "create_workspace",
    "name": "Workspace Name",
    "is_private": false
  }
}
```

### Render Card Example

```json
{
  "action": "ui5_card",
  "context": { "senderId": "{{participant_data.jamId}}" },
  "parameters": {
    "cardId": "sap.card.id",
    "widgetType": "sapCard"
  }
}
```

---

## Authentication

### OAuth 2.0 Setup

1. Create OAuth client in Administration Console
2. Configure client credentials grant
3. Obtain access token
4. Include in Authorization header

### Token Request

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={client_id}
&client_secret={client_secret}
```

### API Request

```http
GET /api/v1/OData/Groups
Authorization: Bearer {access_token}
```

---

## Alias Accounts

For system-level API access:

1. Create alias account in Administration Console
2. Navigate to API Access section
3. Add OAuth2 Access Token
4. Select OAuth client
5. Use token for automated API calls

---

**Documentation Links**:
- SAP API Hub: https://api.sap.com/
- OData Docs: https://jam2.sapjam.com/work_zone/ODataDocs/ui
- Webhook Reference: https://jam2.sapjam.com/work_zone/ODataDocs/webhook_reference
- SAP Help Portal: https://help.sap.com/docs/build-work-zone-advanced-edition
