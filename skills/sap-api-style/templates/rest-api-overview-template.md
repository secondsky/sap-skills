# REST API Overview Template

## How to Use This Template

**Purpose**: Document a set of related REST API methods that apply to the same resource or service.

**When to Use**:
- Creating documentation for a REST API with multiple methods on the same resource
- Need to document common properties shared by multiple endpoints
- Want to provide an organized reference for all methods on a resource

**Instructions**:
1. Replace all [bracketed text] with your actual content
2. Remove sections marked "Optional" if not applicable to your API
3. Provide complete examples with real data
4. Ensure all HTTP methods, URIs, and status codes are accurate
5. Test all documented features before publishing

**Template Structure**:
- Title & Introduction (~100 words)
- Base Information (URI, permissions, context)
- Methods Table (all HTTP methods for the resource)
- Common Request Headers
- Common Response Headers
- Status Codes

**Token Tip**: This overview prevents repetition in detailed method docs, saving ~40% of documentation tokens while improving clarity.

---

## [Resource Name] REST API

[Provide a brief 2-3 sentence description of what this REST API does. Include:
- Main purpose of the API
- What resources or operations it manages
- Key capabilities (list, create, update, delete, etc.)
- Any special features or scope]

**Example**:
"Provides methods to retrieve, create, update, and delete employee records.
Supports querying employees by department, status, and other criteria.
Fully supports pagination, filtering, and sorting."

## Base Information

**Base URI**: `[Absolute URI where API is hosted, e.g., https://api.example.com/v1/employees]`

**Permissions**:
- [Read/Query operations]: [Required role, e.g., ROLE_HR_USER]
- [Write/Create operations]: [Required role, e.g., ROLE_HR_MANAGER]
- [Delete operations]: [Required role, e.g., ROLE_ADMIN]

**Example**:
- Read: ROLE_HR_USER (can list and view employees)
- Write: ROLE_HR_MANAGER (can create and modify employees)
- Delete: ROLE_ADMIN (can permanently delete employees)

**Additional Notes**:
- [Any important API usage notes, e.g., "All requests require Bearer token authentication"]
- [Pagination information, e.g., "API supports pagination with limit and offset parameters"]
- [Rate limiting info, e.g., "Rate limit: 1000 requests per hour"]
- [Special behaviors, e.g., "Soft deletes only - employee records are marked inactive, not removed"]

## Methods

The following table lists all HTTP methods available for this resource:

| HTTP Method | Action | URI |
|---|---|---|
| [GET/POST/PUT/PATCH/DELETE] | [Link to detailed method documentation](#[anchor-link]) | [Relative URI path] |
| [HTTP Method] | [Link](#[anchor]) | [Path] |

**Example**:

| HTTP Method | Action | URI |
|---|---|---|
| GET | [List All Employees](#list-all-employees) | `/employees` |
| GET | [Get Employee by ID](#get-employee-by-id) | `/employees/{employeeId}` |
| POST | [Create Employee](#create-employee) | `/employees` |
| PUT | [Update Employee (Full Replace)](#update-employee) | `/employees/{employeeId}` |
| PATCH | [Update Employee (Partial)](#update-employee-partial) | `/employees/{employeeId}` |
| DELETE | [Delete Employee](#delete-employee) | `/employees/{employeeId}` |

**Formatting Guidelines**:
- Order methods by HTTP verb (GET, POST, PUT, PATCH, DELETE)
- Make "Action" column links to detailed method documentation
- Use consistent URI naming (e.g., `{employeeId}` for path parameters)
- URI is relative to Base URI

## Common Request Headers

The following headers are used in requests to this API:

| Header Name | Required | Description |
|---|---|---|
| [Header name] | [Yes/No] | [Description with possible values and format] |

**Example**:

| Header Name | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token for authentication. Format: `Authorization: Bearer {token}`. Obtain token from authentication service. |
| Content-Type | Yes | Media type of request body. Value: `application/json`. Required for POST, PUT, PATCH requests. |
| Accept | No | Preferred response format. Value: `application/json`. Default if not specified: `application/json`. |
| X-Request-ID | No | Optional request ID for tracking and debugging. Format: UUID (e.g., `123e4567-e89b-12d3-a456-426614174000`). Any valid UUID accepted. |
| If-Match | No | ETag for optimistic locking on PUT/PATCH requests. Format: quoted string (e.g., `"abc123def456"`). Required when implementing concurrent update protection. |

**Field Descriptions**:
- **Header Name**: Exact header name (case-sensitive)
- **Required**: Yes if must be present; No if optional
- **Description**: Purpose, accepted values, format, constraints, and default values

## Common Response Headers

The following headers appear in responses from this API:

| Header Name | Description |
|---|---|
| [Header name] | [Purpose and possible values] |

**Example**:

| Header Name | Description |
|---|---|
| Content-Type | Type of response body. Always `application/json`. |
| X-Total-Count | Total number of available resources (included in paginated responses). Example: `5000` |
| X-RateLimit-Limit | Maximum API calls allowed in rate limit window. Example: `1000` |
| X-RateLimit-Remaining | Number of API calls remaining in current window. Example: `998` |
| X-RateLimit-Reset | Timestamp when rate limit resets (Unix seconds). Example: `1642123456` |
| Location | URL of newly created resource (included in 201 Created responses). Format: Absolute URL. Example: `https://api.example.com/v1/employees/E12346` |
| ETag | Entity tag for caching and optimistic locking. Format: Quoted string. Example: `"abc123def456"` |

## Status Codes

All HTTP status codes that can be returned by methods in this API are documented below:

**Success Codes**:

| Status Code | Result Description |
|---|---|
| 200 OK | Request successful. Response body contains requested data. |
| 201 Created | Resource successfully created. Location header contains URL to new resource. Response body typically contains created object. |
| 204 No Content | Request successful. No response body returned. Typically for DELETE operations or updates with `Prefer: return=minimal`. |

**Error Codes**:

| Status Code | Result Description |
|---|---|
| 400 Bad Request | Invalid request format, syntax, or validation failure. Response body contains error details. Check request format, required fields, and parameter values. |
| 401 Unauthorized | Authentication required or authentication token invalid/expired. Obtain new token or verify Bearer token format. |
| 403 Forbidden | Authenticated but insufficient permissions for operation. Request ROLE_[appropriate role] permission assignment. |
| 404 Not Found | Requested resource doesn't exist. Verify resource ID/URI and that resource hasn't been deleted. |
| 409 Conflict | Request conflicts with current resource state (e.g., duplicate email, unique constraint violation). Resource may already exist or data constraint prevents operation. |
| 410 Gone | Resource previously existed but is now deleted. Resource cannot be recovered. |
| 429 Too Many Requests | Rate limit exceeded. See X-RateLimit-Reset header for when to retry. Implement exponential backoff. |
| 500 Internal Server Error | Server encountered unexpected error. Contact support if issue persists. |
| 503 Service Unavailable | Service temporarily unavailable (maintenance, overload). Retry after delay. See Retry-After header if present. |

**Common Error Response Body Structure**:

```json
{
  "error": {
    "code": "[Error code identifier]",
    "message": "[Human-readable error message]",
    "details": {
      "[field or property]": "[specific error detail]"
    }
  }
}
```

---

## Additional Information

### Rate Limiting

[Document rate limiting policy if applicable]
- Limit: [requests per time period, e.g., 1000 requests per hour]
- Tracking: [Rate limit headers used for tracking]
- Handling: [What happens when limit exceeded and how to recover]

### Pagination

[Document pagination approach if applicable]
- Query Parameters: [e.g., limit and offset]
- Default Size: [default number of results]
- Maximum Size: [maximum allowed per request]
- Response Structure: [how pagination info appears in response]

### Filtering and Sorting

[Document if API supports query-based filtering/sorting]
- Filtering Syntax: [explain parameter format]
- Sortable Fields: [list fields that support sorting]
- Example: [provide sample filter/sort query]

### Error Handling Best Practices

- Always check status code before processing response body
- Implement exponential backoff for retryable errors (5xx, 429)
- Parse error response for details about what went wrong
- Log error codes and messages for debugging
- Distinguish between client errors (4xx) and server errors (5xx)

---

## Related Documentation

- [API Style Guide - Manual REST and OData Documentation](https://github.com/SAP-docs/api-style-guide)
- [OAuth 2.0 Authentication](https://oauth.net/2/)
- [HTTP Status Codes Reference](https://httpwg.org/specs/rfc7231.html#status.codes)

**Template Version**: 1.0
**Last Updated**: 2025-11-21
**Compliance**: SAP API Style Guide Section 50
