# Rate Limiting and Filtering Reference

Complete reference for SAP Service Manager API rate limits and query filtering.

**Documentation**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs/Service-Consumption/SAP-Service-Manager

---

## Rate Limiting

SAP Service Manager implements **three concurrent rate limiting levels**. Exceeding any tier triggers throttling, even if other allowances remain.

### Identification

Callers identified by:
- Username (for user tokens)
- OAuth Client ID (for client tokens)

### Level 1: All APIs Combined

| Limit Type | Value |
|------------|-------|
| Per Hour | 10,000 requests |
| Per Minute | 1,000 requests |

Applies to all API endpoints combined.

---

### Level 2: Resource-Specific Limits

| Endpoint | Per Hour | Per Minute |
|----------|----------|------------|
| `/v1/service_bindings` | 6,000 | 600 |
| `/v1/service_offerings` | 1,000 | 100 |
| `/v1/service_plans` | 1,000 | 100 |

---

### Level 3: Method-Specific Limits

| Operation | Endpoint | Per Hour | Per Minute |
|-----------|----------|----------|------------|
| CREATE | `/v1/service_instances` | - | 50 |
| UPDATE | `/v1/service_instances` | 6,000 | 600 |
| DELETE | `/v1/service_instances` | 6,000 | 600 |

**Note**: CREATE has a stricter minute limit (50/min) to prevent provisioning storms.

---

### Rate Limit Error Response

**HTTP Status**: `429 Too Many Requests`

**Response Headers**:
| Header | Description |
|--------|-------------|
| `Retry-After` | When to retry (HTTP-date format) |

**HTTP-date Format**: `Sun, 06 Nov 1994 08:49:37 GMT`

**Example Response**:
```json
{
  "error": "rate_limit_exceeded",
  "description": "Request rate limit exceeded. Please retry after the time specified in the Retry-After header."
}
```

---

### Best Practices for Rate Limits

1. **Implement Exponential Backoff**:
```javascript
async function withRetry(fn, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429) {
        const retryAfter = error.headers['retry-after'];
        const waitTime = retryAfter ?
          new Date(retryAfter) - Date.now() :
          Math.pow(2, i) * 1000;
        await sleep(waitTime);
      } else {
        throw error;
      }
    }
  }
}
```

2. **Batch Operations**: Group related operations where possible

3. **Cache Responses**: Cache listing responses (offerings, plans)

4. **Stagger Requests**: Distribute requests over time

5. **Monitor Usage**: Track request counts to stay within limits

---

## Filtering

The SAP Service Manager APIs support filtering via query parameters on GET (list) endpoints.

### Query Parameter Types

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `fieldQuery` | Filter by field values | `type eq 'kubernetes'` |
| `labelQuery` | Filter by label values | `environment eq 'dev'` |

Both can be combined; results must match both criteria.

---

### Supported Literal Types

| Type | Format | Example |
|------|--------|---------|
| String | Single quotes | `'my-value'` |
| Boolean | Unquoted | `true`, `false` |
| Integer | Digits with optional sign | `42`, `-7`, `+100` |
| Date-time | ISO 8601 | `2025-01-15T10:30:00Z` |

**String Escaping**: Double single quotes for embedded quotes (`'it''s valid'`)

---

### Field Query Operators

#### Universal Operators (Field & Label Queries)

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equal | `name eq 'my-instance'` |
| `en` | Equal or null | `broker_id en 'abc-123'` |
| `ne` | Not equal | `type ne 'kubernetes'` |
| `in` | In list | `plan_name in ('small','medium')` |
| `notin` | Not in list | `status notin ('failed','pending')` |
| `and` | Logical AND | `type eq 'cf' and ready eq true` |
| `contains` | Substring match | `name contains 'prod'` |

#### Field-Only Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `gt` | Greater than | `created_at gt '2025-01-01T00:00:00Z'` |
| `ge` | Greater than or equal | `version ge 2` |
| `lt` | Less than | `updated_at lt '2025-06-01T00:00:00Z'` |
| `le` | Less than or equal | `retries le 3` |

---

### Filterable Resources

| Resource | Supports fieldQuery | Supports labelQuery |
|----------|---------------------|---------------------|
| Platforms | Yes | Yes |
| Service Brokers | Yes | Yes |
| Service Instances | Yes | Yes |
| Service Bindings | Yes | Yes |
| Service Plans | Yes | No |
| Service Offerings | Yes | No |

---

### Common Field Names

#### Service Instances
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Instance ID |
| `name` | String | Instance name |
| `service_plan_id` | String | Plan ID |
| `platform_id` | String | Platform ID |
| `ready` | Boolean | Readiness status |
| `usable` | Boolean | Usability status |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

#### Service Bindings
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Binding ID |
| `name` | String | Binding name |
| `service_instance_id` | String | Associated instance |
| `ready` | Boolean | Readiness status |
| `created_at` | DateTime | Creation timestamp |

#### Platforms
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Platform ID |
| `name` | String | Platform name |
| `type` | String | Platform type |

---

### Query Examples

#### Single Field Filter

```
GET /v1/service_instances?fieldQuery=ready eq true
```

#### Multiple Conditions (AND)

```
GET /v1/service_instances?fieldQuery=ready eq true and usable eq true
```

#### In List

```
GET /v1/service_instances?fieldQuery=service_plan_id in ('plan-1','plan-2','plan-3')
```

#### Date Range

```
GET /v1/service_instances?fieldQuery=created_at gt '2025-01-01T00:00:00Z' and created_at lt '2025-02-01T00:00:00Z'
```

#### String Contains

```
GET /v1/service_instances?fieldQuery=name contains 'production'
```

#### Label Query

```
GET /v1/service_instances?labelQuery=environment eq 'production'
```

#### Combined Field and Label Query

```
GET /v1/service_instances?fieldQuery=ready eq true&labelQuery=team eq 'platform'
```

#### Complex Query

```
GET /v1/service_instances?fieldQuery=broker_id eq 'abc-123' and plan_name in ('small','medium') and ready eq true&labelQuery=environment eq 'dev'
```

---

### URL Encoding

Special characters must be URL-encoded:

| Character | Encoded |
|-----------|---------|
| Space | `%20` or `+` |
| Single quote | `%27` |
| Comma | `%2C` |
| Colon | `%3A` |

**Example**:
```
# Original
fieldQuery=name eq 'my instance'

# Encoded
fieldQuery=name%20eq%20%27my%20instance%27
```

---

### Pagination

List endpoints support pagination:

| Parameter | Description |
|-----------|-------------|
| `max_items` | Maximum results per page |
| `token` | Continuation token |

**Response**:
```json
{
  "items": [...],
  "num_items": 50,
  "token": "next-page-token"
}
```

**Usage**:
```
GET /v1/service_instances?max_items=50
GET /v1/service_instances?max_items=50&token=<token-from-previous>
```

---

### Syntax Rules

1. **String literals** require single quotes
2. **Boolean literals** must not be quoted
3. **Literals cannot use brackets** (except in `in`/`notin` lists)
4. **Embedded quotes** use double single quotes (`''`)
5. **Whitespace** around operators is optional but recommended
6. **Case sensitivity**: Field names are case-sensitive

---

### Error Handling

**Invalid Query Syntax**:
```json
{
  "error": "InvalidQuery",
  "description": "Invalid fieldQuery syntax at position 15"
}
```

**Unknown Field**:
```json
{
  "error": "InvalidField",
  "description": "Field 'invalid_field' is not supported for filtering"
}
```

---

## Documentation Links

- **Rate Limiting**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/rate-limiting-97be679.md
- **Filtering**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/filtering-parameters-and-operators-3331c6e.md
