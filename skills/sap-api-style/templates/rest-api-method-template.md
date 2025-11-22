# REST API Method Template

## How to Use This Template

**Purpose**: Document individual REST API methods/endpoints with complete request and response details.

**When to Use**:
- Creating documentation for a specific REST method (GET, POST, PUT, PATCH, DELETE)
- Detailed endpoint documentation linked from Overview template
- Providing exact parameter requirements and response examples

**Instructions**:
1. Replace all [bracketed text] with your actual content
2. Include complete, working HTTP request examples
3. Show real response examples with actual status codes
4. Document all possible status codes for this specific method
5. Test the endpoint and verify all examples work
6. Remove optional sections if not applicable

**Cross-Reference**: Use with [REST API Overview Template](#rest-api-overview-template) for shared information.

**Template Structure**:
- Title & Introduction
- Usage section
- Request Details (method, permission, headers, parameters)
- Request Example(s)
- Response Details (status codes, body examples)
- Response Examples (success and error cases)

---

## [Action Verb] [Resource Name]

[Provide a clear, concise description of what this method does. Include:
- Primary action performed
- What is retrieved, created, modified, or deleted
- Primary use case
- Key limitations or behaviors]

**Example**:
"Retrieves a complete list of all employees in the system with support for
filtering, sorting, and pagination. Returns employee summary data by default."

### Usage

[Explain when and why to use this method, including:
- Specific scenarios where this method is appropriate
- When to use alternative methods instead
- Important prerequisites or constraints
- Any special behaviors or side effects]

Use this method when [explain primary scenario].

Key points:
- [Important characteristic, constraint, or behavior]
- [Related method or alternative, if applicable]
- [Performance consideration, size limit, or special note]
- [Business logic or workflow impact, if relevant]

**Example**:
"Use this method to retrieve all employee records with optional filtering
and pagination.

Key points:
- Supports filtering by multiple fields using query parameters
- Returns paginated results (default: 20 per page, max: 100 per page)
- Results sorted by employee ID unless otherwise specified via sortBy (e.g., sortBy=employeeId or sortBy=-employeeId for desc)
- Related method: GET /employees/{employeeId} for retrieving specific employee data
- Performance: Large result sets should use pagination to avoid timeout"

---

## Request

### Request Line

```
[HTTP METHOD] [Relative URI Path]
```

**Example**:
```
GET /employees
GET /employees/{employeeId}
POST /employees
PUT /employees/{employeeId}
PATCH /employees/{employeeId}
DELETE /employees/{employeeId}
```

### HTTP Method

**Method**: [GET/POST/PUT/PATCH/DELETE]

[Brief explanation of what this HTTP method does in this context]

**Method Details**:
- GET: Retrieves resource(s) without modifying server state
- POST: Creates new resource with provided data
- PUT: Replaces entire resource with new data
- PATCH: Partially updates resource (merge semantics)
- DELETE: Deletes or deactivates resource

### Permission Requirement

**Permission**: [Required role/permission for this method]

[Explanation of what this permission allows or why it's required]

**Example**:
"Permission: ROLE_HR_MANAGER (read access)

Users with ROLE_HR_MANAGER or higher can call this method.
Lower roles like ROLE_HR_USER cannot access this endpoint."

### Common Request Headers

Refer to [Common Request Headers](#common-request-headers) in the API Overview.

[List any method-specific headers not covered in Overview]

**Additional headers for this method** (if applicable):
- [Header name]: [Description specific to this method]

**Example**:
"Refer to Common Request Headers in overview.

Additional method-specific headers:
- X-Employee-View: Optional header to specify detail level ('summary', 'full', default: 'summary')"

### Path Parameters

[If method has path parameters, include table. Otherwise, state "None".]

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| [Name] | Required/Optional | [Type] | [Detailed description with constraints, pattern, valid values] | Path |

**Example**:

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| employeeId | Required | String | Unique employee identifier. Format: E followed by 5 digits. Pattern: `E[0-9]{5}`. Example: "E12345" | Path |

### Query Parameters

[If method accepts query parameters, include table. Otherwise, state "None".]

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| [Name] | Required/Optional | [Type] | [Description with constraints, valid values, defaults] | Query |

**Example**:

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| limit | Optional | Integer | Maximum results per page. Range: 1-100. Default: 20. Example: "50" | Query |
| offset | Optional | Integer | Number of results to skip for pagination. Default: 0. Used with limit for pagination. | Query |
| department | Optional | String | Filter by department code. Valid: "SALES", "ENGINEERING", "FINANCE", "HR", "OPERATIONS". Example: "SALES" | Query |
| status | Optional | String | Filter by employee status. Valid: "ACTIVE", "INACTIVE", "LEAVE", "TERMINATED". Default: all statuses. | Query |
| sortBy | Optional | String | Sort field. Valid: "name", "hireDate", "department", "salary". Default: "name". Use - prefix for descending (e.g., "-hireDate") | Query |

### Request Body

[For POST/PUT/PATCH methods, document request body structure. For GET/DELETE, state "None".]

**For POST/PUT/PATCH**:

```json
{
  "[property]": "[value or type]",
  "[property]": "[value or type]"
}
```

**Example**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "hireDate": "2024-01-15",
  "salary": 95000.00
}
```

**Field Descriptions**:

| Field Name | Requirement | Data Type | Description |
|---|---|---|---|
| [Name] | Required/Optional | [Type] | [Description with constraints, format, valid values, length, min/max] |

**Example**:

| Field Name | Requirement | Data Type | Description |
|---|---|---|---|
| firstName | Required | String | Employee's first name. Length: 1-50 characters. Alphanumeric and spaces only. |
| lastName | Required | String | Employee's last name. Length: 1-50 characters. Alphanumeric and spaces only. |
| email | Required | String | Corporate email address. Must be unique across system. Must be valid email format (RFC 5322). |
| department | Required | String | Department code. Valid: "SALES", "ENGINEERING", "FINANCE", "HR", "OPERATIONS". Example: "ENGINEERING" |
| hireDate | Optional | Date (YYYY-MM-DD) | Hire date of employee. Format: ISO 8601 date. Cannot be future date. Example: "2024-01-15" |
| salary | Optional | Decimal | Annual salary in USD. Minimum: 20000. Maximum: 10000000. Two decimal places. Example: 95000.00 |

---

## Response

### Status Codes

[Document all HTTP status codes that can be returned by this specific method.]

| Status Code | Description |
|---|---|
| [Code] | [What this status means in context of this specific operation] |

**Example for GET method**:

| Status Code | Description |
|---|---|
| 200 OK | Request successful. Response body contains employee data matching query. |
| 400 Bad Request | Invalid query parameters or malformed request. Check parameter values and format. |
| 401 Unauthorized | Authentication token missing, invalid, or expired. Obtain new token via authentication service. |
| 403 Forbidden | Authenticated but insufficient permissions. User lacks ROLE_HR_USER required for read access. |
| 404 Not Found | No employee found with specified ID (for single-resource GET). |
| 429 Too Many Requests | Rate limit exceeded. Wait for X-RateLimit-Reset time before retrying. |
| 500 Internal Server Error | Server encountered unexpected error. Contact support if issue persists. |

**Example for POST method**:

| Status Code | Description |
|---|---|
| 201 Created | Employee successfully created. Location header contains URL to new employee. Response includes created employee data. |
| 400 Bad Request | Validation failed. Check email uniqueness, required fields, field formats, and value constraints. |
| 401 Unauthorized | Authentication token missing, invalid, or expired. |
| 403 Forbidden | Insufficient permissions. Requires ROLE_HR_MANAGER or higher. |
| 409 Conflict | Employee with this email already exists. Email must be unique. |
| 500 Internal Server Error | Server error. Contact support. |

### Response Headers

| Header Name | Description | Example Value |
|---|---|---|
| [Header name] | [What this header contains] | [Example value] |

**Example**:

| Header Name | Description | Example Value |
|---|---|---|
| Content-Type | Media type of response body | `application/json` |
| X-Total-Count | Total available records (for paginated responses) | `5000` |
| X-RateLimit-Remaining | API calls remaining in rate limit window | `998` |
| Location | URL of created/modified resource (201, 200 responses) | `https://api.example.com/v1/employees/E12346` |
| ETag | Entity tag for caching and optimistic locking | `"abc123def456"` |

### Response Body

[Document the successful response body structure.]

**For successful request**:

```json
{
  "[property]": "[value]",
  "[property]": "[value]"
}
```

**Example**:

```json
{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "jobTitle": "Senior Software Engineer",
  "hireDate": "2020-06-01",
  "salary": 120000.00,
  "status": "ACTIVE",
  "createdAt": "2020-06-01T09:00:00Z",
  "lastModified": "2024-01-15T14:30:00Z"
}
```

---

## Examples

### Complete Request Example

[Provide full HTTP request with all headers and body.]

```http
[HTTP METHOD] [Path]?[Query Parameters] HTTP/1.1
Host: [Host from Base URI]
Authorization: Bearer [token]
Content-Type: application/json
[Additional Headers]

[Request Body (if applicable)]
```

**Example for GET**:

```http
GET /employees?limit=20&offset=0&status=ACTIVE HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
```

**Example for POST**:

```http
POST /employees HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "hireDate": "2024-01-15",
  "salary": 95000.00
}
```

**Example for PATCH**:

```http
PATCH /employees/E12345 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
If-Match: "abc123def456"

{
  "department": "SALES",
  "salary": 105000.00
}
```

### Complete Response Example (Success)

```http
HTTP/1.1 [Status Code] [Status Message]
Content-Type: application/json
[Response Headers]

[Response Body]
```

**Example for 200 OK**:

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Remaining: 998
ETag: "abc123def456"

{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "jobTitle": "Senior Software Engineer",
  "hireDate": "2020-06-01",
  "salary": 120000.00,
  "status": "ACTIVE",
  "createdAt": "2020-06-01T09:00:00Z",
  "lastModified": "2024-01-15T14:30:00Z"
}
```

**Example for 201 Created**:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://api.example.com/v1/employees/E12346

{
  "employeeId": "E12346",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "hireDate": "2024-01-15",
  "status": "ACTIVE",
  "salary": 95000.00,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Error Response Examples

**Example for 400 Bad Request**:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "issue": "Email already exists",
        "value": "john.doe@company.com"
      },
      {
        "field": "salary",
        "issue": "Minimum salary is 20000",
        "value": "15000"
      }
    ]
  }
}
```

**Example for 404 Not Found**:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "NOT_FOUND",
    "message": "Employee not found",
    "details": {
      "resourceType": "Employee",
      "providedId": "E99999"
    }
  }
}
```

**Example for 409 Conflict**:

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "DUPLICATE_EMPLOYEE",
    "message": "Employee with email already exists",
    "details": {
      "email": "john.doe@company.com",
      "existingEmployeeId": "E10001"
    }
  }
}
```

---

## Related Methods

- [Parent Overview](#[rest-api-resource-name])
- [Related Method 1](#[method-anchor])
- [Related Method 2](#[method-anchor])

---

**Template Version**: 1.0
**Last Updated**: 2025-11-21
**Compliance**: SAP API Style Guide Section 50
