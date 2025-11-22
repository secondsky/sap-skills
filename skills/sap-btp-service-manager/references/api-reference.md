# SAP Service Manager API Reference

**Base URI**: `https://service-manager.cfapps.<region>.hana.ondemand.com/v1/`

**Documentation**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs/Service-Consumption/SAP-Service-Manager

---

## Authentication

### User Access Tokens
- Represent named users
- Scopes derived from assigned roles
- Obtained via password or SSO flow

### Client Access Tokens
- Represent technical clients
- Scopes derived from service plan
- Obtained via client credentials flow

### Token Retrieval

```bash
curl '<uaa_url>/oauth/token' -X POST \
  -H 'Accept: application/json' \
  -d 'grant_type=client_credentials&client_id=<clientid>&client_secret=<clientsecret>'
```

**Response**:
```json
{
  "access_token": "<access_token>",
  "token_type": "bearer",
  "expires_in": 43199,
  "scope": "<xsappname>.job.read <xsappname>.event.read"
}
```

**Usage**: Include `Authorization: Bearer <access_token>` header in all requests.

---

## API Groups

### 1. Platforms API

**Base**: `/v1/platforms`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/platforms` | List all registered platforms |
| GET | `/v1/platforms/{platformID}` | Get specific platform |
| POST | `/v1/platforms` | Register new platform |
| PATCH | `/v1/platforms/{platformID}` | Update platform |
| DELETE | `/v1/platforms/{platformID}` | Unregister platform |

**Platform Registration Request**:
```json
{
  "name": "my-platform",
  "type": "kubernetes",
  "description": "My K8s cluster"
}
```

**Platform Response**:
```json
{
  "id": "platform-id",
  "name": "my-platform",
  "type": "kubernetes",
  "description": "My K8s cluster",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z",
  "credentials": {
    "basic": {
      "username": "generated-user",
      "password": "generated-pass"
    }
  }
}
```

---

### 2. Service Brokers API

**Base**: `/v1/service_brokers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/service_brokers` | List all brokers |
| GET | `/v1/service_brokers/{brokerID}` | Get specific broker |
| POST | `/v1/service_brokers` | Register broker |
| PATCH | `/v1/service_brokers/{brokerID}` | Update broker |
| DELETE | `/v1/service_brokers/{brokerID}` | Delete broker |

**Broker Registration Request**:
```json
{
  "name": "my-broker",
  "broker_url": "https://broker.example.com",
  "description": "My service broker",
  "credentials": {
    "basic": {
      "username": "broker-user",
      "password": "broker-pass"
    }
  }
}
```

---

### 3. Service Instances API

**Base**: `/v1/service_instances`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/service_instances` | List all instances |
| GET | `/v1/service_instances/{instanceID}` | Get specific instance |
| POST | `/v1/service_instances` | Create instance |
| PATCH | `/v1/service_instances/{instanceID}` | Update instance |
| DELETE | `/v1/service_instances/{instanceID}` | Delete instance |

**Create Instance Request**:
```json
{
  "name": "my-instance",
  "service_plan_id": "plan-guid",
  "parameters": {
    "key1": "value1"
  },
  "labels": {
    "environment": ["production"]
  }
}
```

**Instance Response**:
```json
{
  "id": "instance-id",
  "name": "my-instance",
  "service_plan_id": "plan-guid",
  "platform_id": "platform-id",
  "context": {},
  "parameters": {},
  "labels": {},
  "ready": true,
  "usable": true,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z",
  "last_operation": {
    "type": "create",
    "state": "succeeded"
  }
}
```

**Query Parameters**:
- `fieldQuery`: Filter by field values
- `labelQuery`: Filter by label values
- `max_items`: Limit results
- `token`: Pagination token

---

### 4. Service Bindings API

**Base**: `/v1/service_bindings`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/service_bindings` | List all bindings |
| GET | `/v1/service_bindings/{bindingID}` | Get specific binding |
| POST | `/v1/service_bindings` | Create binding |
| DELETE | `/v1/service_bindings/{bindingID}` | Delete binding |

**Create Binding Request**:
```json
{
  "name": "my-binding",
  "service_instance_id": "instance-id",
  "parameters": {
    "credential-type": "x509"
  }
}
```

**Binding Response** (Default Credentials):
```json
{
  "id": "binding-id",
  "name": "my-binding",
  "service_instance_id": "instance-id",
  "credentials": {
    "clientid": "client-id",
    "clientsecret": "client-secret",
    "url": "https://service.example.com",
    "sm_url": "https://service-manager.cfapps.region.hana.ondemand.com"
  },
  "ready": true,
  "created_at": "2025-01-01T00:00:00Z"
}
```

**Binding Response** (X.509 Credentials):
```json
{
  "credentials": {
    "clientid": "client-id",
    "certificate": "-----BEGIN CERTIFICATE-----...",
    "key": "-----BEGIN RSA PRIVATE KEY-----...",
    "certurl": "https://cert.auth.url"
  }
}
```

---

### 5. Service Plans API

**Base**: `/v1/service_plans`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/service_plans` | List all plans |
| GET | `/v1/service_plans/{planID}` | Get specific plan |

**Plan Response**:
```json
{
  "id": "plan-id",
  "name": "subaccount-admin",
  "description": "Full administrative access",
  "free": false,
  "bindable": true,
  "service_offering_id": "offering-id",
  "catalog_id": "catalog-id",
  "catalog_name": "subaccount-admin",
  "metadata": {}
}
```

---

### 6. Service Offerings API

**Base**: `/v1/service_offerings`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/service_offerings` | List all offerings |
| GET | `/v1/service_offerings/{offeringID}` | Get specific offering |

**Offering Response**:
```json
{
  "id": "offering-id",
  "name": "service-manager",
  "description": "SAP Service Manager",
  "bindable": true,
  "broker_id": "broker-id",
  "catalog_id": "catalog-id",
  "catalog_name": "service-manager"
}
```

---

### 7. Operations API

**Base**: `/v1/{resourceType}/{resourceID}/operations`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/{type}/{id}/operations/{opID}` | Get operation status |

**Path Parameters**:
- `resourceType`: `platforms`, `service_brokers`, `service_bindings`, `service_instances`
- `resourceID`: Resource identifier
- `operationID`: Operation identifier

**Operation Response**:
```json
{
  "id": "operation-id",
  "type": "create",
  "state": "in progress",
  "resource_id": "resource-id",
  "resource_type": "service_instances",
  "description": "Provisioning service instance",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

**Operation States**:
- `in progress` - Operation running
- `succeeded` - Operation completed successfully
- `failed` - Operation failed

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 202 | Accepted (async operation started) |
| 400 | Bad request (invalid parameters) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not found |
| 409 | Conflict (resource already exists) |
| 422 | Unprocessable entity |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## Async Operations

POST, PATCH, and DELETE operations on instances and bindings are async by default.

**Response** (202 Accepted):
```json
{
  "id": "resource-id",
  "last_operation": {
    "type": "create",
    "state": "in progress"
  }
}
```

**Headers**:
- `Location`: `/v1/service_instances/{id}/operations/{opId}` - Poll this URL

**Polling**:
```bash
# Initial request
POST /v1/service_instances
# Response: 202 with Location header

# Poll status
GET /v1/service_instances/{id}/operations/{opId}
# Repeat until state is "succeeded" or "failed"
```

---

## Swagger UI

Access interactive API documentation:

`https://service-manager.cfapps.<region>.hana.ondemand.com/swaggerui/swagger-ui.html`

**Example Regions**:
- EU10 (Frankfurt): `eu10.hana.ondemand.com`
- US10 (US East): `us10.hana.ondemand.com`
- AP10 (Australia): `ap10.hana.ondemand.com`

---

## Documentation Links

- **API Groups**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/sap-service-manager-api-groups-9b97aee.md
- **Service Instances**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/instances-23af00d.md
- **Service Bindings**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/service-bindings-392eb36.md
- **Platforms**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/platforms-7610c08.md
- **Brokers**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/brokers-743f3f7.md
