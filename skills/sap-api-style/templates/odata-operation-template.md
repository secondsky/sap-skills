# OData Operation Template

## How to Use This Template

**Purpose**: Document individual OData operations (CRUD, functions, actions) with complete request/response details.

**When to Use**:
- Creating detailed documentation for a specific OData operation
- Documenting CRUD operations with full request/response examples
- Documenting custom functions and actions
- Detailed operation documentation linked from Resource template

**Instructions**:
1. Replace all [bracketed text] with your actual operation information
2. Include complete, working HTTP request examples
3. Show real response examples with actual data and status codes
4. Document all possible status codes for this specific operation
5. Include both success and error response examples
6. Test the operation and verify all examples work
7. Remove optional sections if not applicable

**Cross-Reference**: Use with [OData Resource Template](#odata-resource-template) for resource context and [OData Service Overview Template](#odata-service-overview-template) for service-level info.

**Template Structure**:
- Title & Introduction
- Operation Details (type, HTTP method, permission)
- Request (headers, parameters, body, examples)
- Response (headers, status codes, body, examples)

---

## [Operation Name] ([HTTP Method])

[Provide comprehensive description of what this operation does. Include:
- What action is performed
- What is returned (if applicable)
- When to use this operation
- Important behaviors or side effects]

**Example**:
"Creates a new employee record in the system with provided information.
Automatically assigns unique employee ID and initializes default values
(status: ACTIVE, creation timestamp). Triggers HR workflow notifications."

---

## Usage

[Explain when and why to use this operation, including:
- Primary use cases and scenarios
- When to use alternative operations
- Important prerequisites or constraints
- Any special behaviors or workflows]

Use this operation to [describe scenario].

Key points:
- [Important characteristic or constraint]
- [Related operation if applicable]
- [Performance consideration if relevant]
- [Workflow impact or side effect if relevant]

**Example**:
"Use this operation when adding a new employee to the system. Required fields
include first name, last name, email, and department. Optional fields like
hire date and salary can be provided.

Key points:
- Automatically generates unique EmployeeID
- Email must be unique across system
- Returns created employee in response body (if Prefer header included)
- Triggers HR workflow notifications to department manager
- Related operations: PATCH for updates, GET for retrieval"

---

## Request

### Operation Details

**URI**: [HTTP Method] [Path]

**Example**: `POST /Employees`, `GET /Employees('E12345')`, `PATCH /Employees('E12345')`

**Operation Type**: [CRUD/Function/Action]

| Aspect | Value |
|---|---|
| HTTP Method | [GET/POST/PUT/PATCH/DELETE] |
| Operation Type | [CRUD (standard)/Function (returns data)/Action (performs action)] |
| Resource | [Resource name] |
| Full URI Pattern | [Complete URI pattern with placeholders] |

**Example**:
```
| Aspect | Value |
|---|---|
| HTTP Method | POST |
| Operation Type | CRUD (Create) |
| Resource | Employees |
| Full URI Pattern | POST /Employees |
```

### Required Permission

**Permission**: [Required role or permission level]

[Explanation of what this permission allows and why it's required]

**Example**:
"Permission: ROLE_HR_MANAGER or ROLE_ADMIN

Only users with ROLE_HR_MANAGER or higher role can create employees.
Lower roles like ROLE_HR_USER cannot call this operation."

### Request Headers

| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| [Header] | [Yes/No] | [Values] | [Description with format/examples] |

**Example**:
```
| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| Authorization | Yes | Bearer {token} | OAuth2 authentication token. Format: Bearer {token}. Required for all operations. |
| Content-Type | Yes (POST/PUT/PATCH) | application/json | Media type of request body. Required for operations with request body. Value: application/json |
| Accept | No | application/json | Preferred response format. Default: application/json. Optional: specify other formats if supported. |
| Prefer | No | return=representation, return=minimal | OData preference. return=representation: include created/updated entity in response. return=minimal: response without body (faster). |
| If-Match | No | {ETag} | ETag for optimistic concurrency control. Format: quoted string (e.g., "abc123"). Required for safe concurrent updates on PUT/PATCH. |
| X-Request-ID | No | UUID | Optional request tracking ID. Format: any valid UUID. Example: 123e4567-e89b-12d3-a456-426614174000 |
```

### Request Parameters

[Document all parameters passed to the operation, organized by location.]

#### Path Parameters

[If operation uses path parameters in URI]

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| [Name] | Required/Optional | [Type] | [Description with constraints, pattern, valid values] | Path |

**Example**:
```
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| EmployeeID | Required | String | Employee unique identifier. Pattern: E[0-9]{5}. Example: "E12345" | Path |
```

#### Query Parameters

[If operation uses query parameters]

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| $filter | Optional | String | OData filter expression for query. Example: FirstName eq 'John'. Used only in GET collection operations. | Query |
| $orderby | Optional | String | Sort order. Example: HireDate desc, LastName asc. Used in GET collection operations. | Query |
| $top | Optional | Integer | Maximum records to return (1-1000). Default: 50. Used for pagination. | Query |
| $skip | Optional | Integer | Records to skip for pagination. Default: 0. Used with $top. | Query |
| $select | Optional | String | Properties to include in response. Example: FirstName,LastName,Email. Reduces payload size. | Query |
| $expand | Optional | String | Navigate relationships and include related data. Example: Department,Manager. Limited to 3 levels deep. | Query |

**Detailed Example for POST**:
```
[No query parameters for POST operations - all data in request body]
```

**Detailed Example for GET with Collection**:
```
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| $filter | Optional | String | Filter expression. Example: $filter=Status eq 'ACTIVE' and Salary gt 100000 | Query |
| $orderby | Optional | String | Sort fields. Example: $orderby=HireDate desc,LastName asc | Query |
| $top | Optional | Integer | Max results (1-1000, default: 50). Example: $top=100 | Query |
| $skip | Optional | Integer | Records to skip for pagination. Example: $skip=200 | Query |
| $select | Optional | String | Properties to include. Example: $select=FirstName,LastName,Email | Query |
| $expand | Optional | String | Include related data. Example: $expand=Department,Manager | Query |
| $count | Optional | Boolean | Include total count. Returns entities with @odata.count. Value: true. Example: ?$count=true. Note: Path /Employees/$count returns only integer count. | Query |
```

#### Request Body

[For POST/PUT/PATCH operations with request body]

**Format**: [JSON structure with all properties]

**Required Fields**: [List of required fields]

**Optional Fields**: [List of optional fields]

| Property Name | Requirement | Data Type | Description | Constraints |
|---|---|---|---|---|
| [Property] | Required/Optional | [Type] | [Description] | [Min/max, format, valid values] |

**Example**:
```
Request body structure:

{
  "FirstName": "string",
  "LastName": "string",
  "Email": "string",
  "Department": "string",
  "HireDate": "date",
  "Salary": "decimal"
}

Required Fields: FirstName, LastName, Email, Department

Optional Fields: HireDate, Salary

| Property Name | Requirement | Data Type | Description | Constraints |
|---|---|---|---|---|
| FirstName | Required | String | Employee's first name | 1-50 characters, alphanumeric + spaces |
| LastName | Required | String | Employee's last name | 1-50 characters, alphanumeric + spaces |
| Email | Required | String | Corporate email address | Must be unique, valid email format (RFC 5321) |
| Department | Required | String | Department code | Valid: "SALES", "ENGINEERING", "FINANCE", "HR", "OPERATIONS" |
| HireDate | Optional | Date | Hire date in YYYY-MM-DD format | Cannot be future date, ISO 8601 format |
| Salary | Optional | Decimal | Annual salary in USD | Minimum: 20000, maximum: 10000000, 2 decimal places |
```

### Request Example

[Provide complete, working HTTP request with all headers and body.]

**Template**:
```http
[HTTP METHOD] [Path]?[Query Parameters] HTTP/1.1
Host: [Host]
Authorization: Bearer [token]
Content-Type: application/json
[Additional Headers]

[Request body if applicable]
```

#### Example - GET Collection with Filtering

```http
GET /Employees?$filter=Status eq 'ACTIVE' and Department eq 'ENGINEERING'&$orderby=LastName asc&$top=50&$skip=0 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
```

#### Example - GET Single Resource

```http
GET /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
```

#### Example - POST (Create)

```http
POST /Employees HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Prefer: return=representation

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Salary": 95000.00
}
```

#### Example - PATCH (Update)

```http
PATCH /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
If-Match: "abc123def456"

{
  "Department": "SALES",
  "Salary": 105000.00
}
```

#### Example - PUT (Replace)

```http
PUT /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "SALES",
  "HireDate": "2024-01-15",
  "Salary": 105000.00
}
```

#### Example - DELETE

```http
DELETE /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Response

### Response Headers

| Header Name | Description | Possible Values |
|---|---|---|
| [Header] | [What this header contains] | [Example values] |

**Example**:
```
| Header Name | Description | Possible Values |
|---|---|---|
| Content-Type | Response body media type | application/json |
| Location | URL of created/modified resource | https://api.example.com/odata/v4/Employees('E12346') |
| ETag | Entity tag for caching and concurrency control | "abc123def456" |
| OData-Version | OData protocol version used | 4.0 |
| Preference-Applied | Which Prefer preference was applied | return=representation, return=minimal |
```

### Status Codes

| Status Code | Description | Conditions | Response Body |
|---|---|---|---|
| [Code] | [What status means] | [When this occurs] | [Type of response body] |

**Example for GET (200 OK)**:
```
| Status Code | Description | Conditions | Response Body |
|---|---|---|---|
| 200 OK | Request successful | Entity/collection retrieved | Entity or collection data |
| 401 Unauthorized | Authentication required | Missing/invalid token | Error object |
| 403 Forbidden | Insufficient permissions | User lacks required role | Error object |
| 404 Not Found | Resource doesn't exist | Invalid ID/key | Error object |
| 500 Internal Server Error | Server error | Unhandled exception | Error object |
```

**Example for POST (201 Created)**:
```
| Status Code | Description | Conditions | Response Body |
|---|---|---|---|
| 201 Created | Resource created successfully | Valid request, auto-generated ID | Created entity (if Prefer: return=representation) |
| 400 Bad Request | Validation error | Invalid data, missing required field | Error object with details |
| 401 Unauthorized | Authentication required | Missing/invalid token | Error object |
| 403 Forbidden | Insufficient permissions | User lacks ROLE_HR_MANAGER | Error object |
| 409 Conflict | Duplicate/constraint violation | Email already exists | Error object with details |
| 500 Internal Server Error | Server error | Database error | Error object |
```

**Example for PATCH (204 No Content or 200 OK)**:
```
| Status Code | Description | Conditions | Response Body |
|---|---|---|---|
| 204 No Content | Update successful | Default response without Prefer header | Empty body |
| 200 OK | Update successful | Prefer: return=representation | Updated entity data |
| 400 Bad Request | Validation error | Invalid field values | Error object |
| 401 Unauthorized | Authentication required | Missing/invalid token | Error object |
| 403 Forbidden | Insufficient permissions | User lacks required role | Error object |
| 404 Not Found | Resource doesn't exist | Invalid ID | Error object |
| 412 Precondition Failed | Optimistic concurrency failure | If-Match ETag mismatch | Error object |
| 500 Internal Server Error | Server error | Database error | Error object |
```

### Response Body (Successful)

[Document the successful response body structure, including all properties.]

```json
{
  "[property]": "[value or type]",
  "[property]": "[value or type]"
}
```

**Example for GET Single (200 OK)**:
```json
{
  "EmployeeID": "E12345",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2020-06-01",
  "Salary": 120000.00,
  "Status": "ACTIVE",
  "CreatedAt": "2020-06-01T09:00:00Z",
  "LastModified": "2024-01-15T14:30:00Z"
}
```

**Example for GET Collection (200 OK)**:
```json
{
  "value": [
    {
      "EmployeeID": "E12345",
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "john.doe@company.com",
      "Status": "ACTIVE"
    },
    {
      "EmployeeID": "E12346",
      "FirstName": "Jane",
      "LastName": "Smith",
      "Email": "jane.smith@company.com",
      "Status": "ACTIVE"
    }
  ]
}
```

**Example for POST (201 Created)**:
```json
{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Salary": 95000.00,
  "Status": "ACTIVE",
  "CreatedAt": "2024-01-15T10:30:00Z",
  "LastModified": "2024-01-15T10:30:00Z"
}
```

---

## Complete Response Examples

### Success Response (200 OK - GET)

```http
HTTP/1.1 200 OK
Content-Type: application/json
ETag: "abc123def456"
OData-Version: 4.0

{
  "EmployeeID": "E12345",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2020-06-01",
  "Salary": 120000.00,
  "Status": "ACTIVE",
  "CreatedAt": "2020-06-01T09:00:00Z",
  "LastModified": "2024-01-15T14:30:00Z"
}
```

### Success Response (201 Created - POST)

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://api.example.com/odata/v4/Employees('E12346')
ETag: "def789ghi123"
OData-Version: 4.0

{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Salary": 95000.00,
  "Status": "ACTIVE",
  "CreatedAt": "2024-01-15T10:30:00Z",
  "LastModified": "2024-01-15T10:30:00Z"
}
```

### Success Response (204 No Content - PATCH)

```http
HTTP/1.1 204 No Content
```

### Success Response (Collection - GET with $top/$skip)

```http
HTTP/1.1 200 OK
Content-Type: application/json
OData-Version: 4.0

{
  "value": [
    {
      "EmployeeID": "E12345",
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "john.doe@company.com",
      "Department": "ENGINEERING",
      "Status": "ACTIVE"
    },
    {
      "EmployeeID": "E12346",
      "FirstName": "Jane",
      "LastName": "Smith",
      "Email": "jane.smith@company.com",
      "Department": "SALES",
      "Status": "ACTIVE"
    }
  ]
}
```

---

## Error Response Examples

### Error Response (400 Bad Request)

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed. See details for specific errors",
    "details": [
      {
        "field": "Email",
        "issue": "Email already exists in system",
        "value": "john.doe@company.com",
        "existingEmployeeId": "E10001"
      },
      {
        "field": "Salary",
        "issue": "Minimum salary must be at least 20000",
        "value": "15000"
      }
    ]
  }
}
```

### Error Response (401 Unauthorized)

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Authentication token missing, invalid, or expired",
    "details": {
      "reason": "Bearer token not provided in Authorization header"
    }
  }
}
```

### Error Response (403 Forbidden)

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": {
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Insufficient permissions for this operation",
    "details": {
      "requiredRole": "ROLE_HR_MANAGER",
      "userRole": "ROLE_HR_USER",
      "operation": "Create Employee"
    }
  }
}
```

### Error Response (404 Not Found)

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "NOT_FOUND",
    "message": "Requested resource not found",
    "details": {
      "resourceType": "Employee",
      "providedId": "E99999",
      "suggestion": "Verify the employee ID exists and hasn't been deleted"
    }
  }
}
```

### Error Response (409 Conflict - Duplicate)

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "DUPLICATE_EMAIL",
    "message": "Employee with provided email already exists",
    "details": {
      "email": "john.doe@company.com",
      "existingEmployeeId": "E10001",
      "existingEmployeeName": "John Doe"
    }
  }
}
```

### Error Response (500 Internal Server Error)

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Server encountered an unexpected error",
    "details": {
      "traceId": "550e8400-e29b-41d4-a716-446655440000",
      "timestamp": "2024-01-15T14:30:00Z",
      "suggestion": "Contact support with provided trace ID"
    }
  }
}
```

---

## Special Cases / Additional Notes

[Document any special behaviors, edge cases, or implementation notes]

**Example**:
- Soft delete: Employee records are marked with Status='TERMINATED', not physically deleted
- Automatic fields: EmployeeID, CreatedAt, and LastModified are auto-generated
- Optimistic concurrency: Use If-Match header with ETag to prevent lost updates
- Batch operations: This operation can be included in a $batch request
- Rate limiting: This operation counts as 1 request toward rate limit

---

## Related Operations

- [Resource Overview](#odata-resource-[name])
- [Service Overview](#odata-service-[name])
- [Related Operation 1](#odata-operation-[name])
- [Related Operation 2](#odata-operation-[name])

---

**Template Version**: 1.0
**Last Updated**: 2025-11-21
**Compliance**: SAP API Style Guide Section 50
