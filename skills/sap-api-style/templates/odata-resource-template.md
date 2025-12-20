# OData Resource Template

## How to Use This Template

**Purpose**: Document individual OData resources (entity sets) within a service with all available operations.

**When to Use**:
- Creating detailed documentation for a specific OData entity set/resource
- Documenting all CRUD operations on a resource
- Listing navigation properties and custom functions/actions
- Linking from Service Overview to specific resource documentation

**Instructions**:
1. Replace all [bracketed text] with your actual resource information
2. Verify all operations against service metadata
3. Document navigation properties with cardinality (1:1, 1:N)
4. Include permission requirements for each operation type
5. List custom functions and actions with brief descriptions
6. Remove optional sections if not applicable

**Cross-Reference**: Use with [OData Service Overview Template](#odata-service-overview-template) for service context and [OData Operation Template](#odata-operation-template) for detailed operation docs.

**Template Structure**:
- Title & Introduction
- Resource Information (path, key, permissions)
- Operations (CRUD, navigation, custom)
- Common Headers
- Status and Error Codes
- Examples

---

## [Resource Name] Resource

[Provide clear description of what this resource represents and contains. Include:
- What business entity or data domain it covers
- Primary use cases
- Relationship to other resources
- Scope or limitations]

**Example**:
"Collection of all employees in the system. Provides access to employee master
data including personal information, organizational assignments, employment
status, and related compensation information. Navigation properties allow
access to related departments, managers, and compensation details."

### Additional Context

[Any important information about this resource]

This resource represents [explain domain/purpose]. Use for [primary use cases].
Navigation properties allow [explain relationships].

---

## Resource Information

### Resource Path

**Path**: `[Relative path to entity set, e.g., /Employees]`

[Explanation of resource path]

### Absolute URI

**Absolute URI**: `[Root URI]/[Resource Path]`

**Example**: `[https://api.example.com/odata/v4/Employees`](https://api.example.com/odata/v4/Employees`)

### Key Property

**Key Property**: [Property name that uniquely identifies each resource]

[Description of key property and format/pattern]

**Example**:
```
Key Property: EmployeeID
Type: String
Format: E followed by 5 digits
Pattern: E[0-9]{5}
Example: E12345
```

### Individual Resource Addressing

[How to address/access a single resource by key]

**URI Pattern**: `[Resource Path]\('{[Key Value]}')`

**Examples**:
- `/Employees('E12345')` - Address by string key
- `/Employees(EmployeeID='E12345')` - Explicit property name
- `[https://api.example.com/odata/v4/Employees('E12345](https://api.example.com/odata/v4/Employees('E12345)')` - Absolute URI

### Required Permissions

[Document permissions for different operation types on this resource]

| Operation Type | Required Permission | Description |
|---|---|---|
| Read/Query | [Role] | [What permission is needed and what it allows] |
| Create (POST) | [Role] | [Permission required] |
| Update (PUT/PATCH) | [Role] | [Permission required] |
| Delete | [Role] | [Permission required] |

**Example**:
```
| Operation Type | Required Permission | Description |
|---|---|---|
| Read/Query | ROLE_HR_USER | Read-only access to all employee data |
| Create (POST) | ROLE_HR_MANAGER | Create new employee records |
| Update (PUT/PATCH) | ROLE_HR_MANAGER | Modify existing employee data |
| Delete | ROLE_ADMIN | Delete employee records (limited to admins) |
```

### Resource Properties

[Complete list of all properties available on this resource]

| Property Name | Data Type | Description | Example | Notes |
|---|---|---|---|---|
| [Property] | [Type] | [Description] | [Example value] | [Nullable, constraints, etc.] |

**Example**:
```
| Property Name | Data Type | Description | Example | Notes |
|---|---|---|---|---|
| EmployeeID | String | Unique employee identifier | E12345 | Key property, not null |
| FirstName | String | Employee's first name | John | 1-50 characters, required |
| LastName | String | Employee's last name | Doe | 1-50 characters, required |
| Email | String | Corporate email address | john.doe@company.com | Must be unique, required |
| HireDate | Date | Employment start date | 2024-01-15 | ISO 8601 format, optional |
| Status | String | Employment status | ACTIVE | Values: ACTIVE, INACTIVE, ON_LEAVE, TERMINATED |
| Salary | Decimal | Annual salary | 95000.00 | Nullable, 2 decimal places |
| CreatedAt | DateTime | Record creation timestamp | 2024-01-15T10:30:00Z | UTC, auto-set |
| LastModified | DateTime | Last modification timestamp | 2024-01-15T14:30:00Z | UTC, auto-updated |
```

---

## Operations

### CRUD Operations

Standard Create, Read, Update, Delete operations available on this resource:

| HTTP Method | Operation | URI | Description |
|---|---|---|---|
| GET | [Read Collection](#operation-read-collection) | `[Resource]` | Retrieve all resources |
| GET | [Read Single](#operation-read-single) | `[Resource]\('{Key}')` | Retrieve specific resource |
| POST | [Create](#operation-create) | `[Resource]` | Create new resource |
| PUT | [Replace](#operation-replace) | `[Resource]\('{Key}')` | Replace entire resource |
| PATCH | [Update](#operation-update) | `[Resource]\('{Key}')` | Partial update resource |
| DELETE | [Delete](#operation-delete) | `[Resource]\('{Key}')` | Delete resource |

**Example**:
```
| HTTP Method | Operation | URI | Description |
|---|---|---|---|
| GET | [Query all employees](#operation-read-collection) | `/Employees` | Retrieve all employees with optional filtering and paging |
| GET | [Get single employee](#operation-read-single) | `/Employees\('{EmployeeID}')` | Retrieve specific employee by ID |
| POST | [Create employee](#operation-create) | `/Employees` | Create new employee record |
| PUT | [Replace employee](#operation-replace) | `/Employees\('{EmployeeID}')` | Replace entire employee record |
| PATCH | [Update employee](#operation-update) | `/Employees\('{EmployeeID}')` | Partial update of employee fields |
| DELETE | [Delete employee](#operation-delete) | `/Employees\('{EmployeeID}')` | Delete/deactivate employee |
```

### Navigation Properties

[If resource has relationships to other entities, document navigation properties]

**Navigation Properties**:

| Navigation Name | Target Entity | Cardinality | Description |
|---|---|---|---|
| [Property] | [Entity] | [1:1 / 1:N] | [Description of relationship] |

**Example**:
```
| Navigation Name | Target Entity | Cardinality | Description |
|---|---|---|---|
| Department | Department | 1:1 | Navigate to employee's department |
| Manager | Employee | 1:1 | Navigate to employee's manager (another employee) |
| DirectReports | Employee | 1:N | Navigate to employees reporting to this employee |
| Compensation | Compensation | 1:1 | Navigate to compensation details |
```

**How to Use Navigation Properties**:

Using `$expand` to include related data:
```
GET /Employees?$expand=Department HTTP/1.1

Returns employee(s) with embedded Department entity data.
```

Using `$expand` with `$select` to limit properties:
```
GET /Employees?$expand=Department($select=DepartmentID,Name) HTTP/1.1

Returns employee(s) with only specific Department properties included.
```

Multi-level expansion:
```
GET /Employees?$expand=Department,Manager($expand=Department) HTTP/1.1

Includes Department for the employee and Department for the manager.
Maximum expansion depth: [specify limit, e.g., 3 levels]
```

### Custom Functions and Actions

[If resource supports custom functions or actions, document them]

| Operation Type | Name | URI | Description |
|---|---|---|---|
| [Function/Action] | [Name] | [URI Pattern] | [Description] |

**Example**:
```
| Operation Type | Name | URI | Description |
|---|---|---|---|
| Function | GetManager | `/Employees('{EmployeeID}')/GetManager()` | Get the direct manager of an employee |
| Function | GetDirectReports | `/Employees('{EmployeeID}')/GetDirectReports()` | Get all direct reports of an employee |
| Action | Promote | `/Employees('{EmployeeID}')/Promote` | Promote employee to next level (requires payload with details) |
| Action | Deactivate | `/Employees('{EmployeeID}')/Deactivate` | Mark employee as inactive |
```

**Detailed Function/Action Information**:

For each custom operation, provide:
- Purpose and use case
- Request parameters (if any)
- Return type
- Permission requirements
- Example request/response

---

## Common Headers

### Request Headers

| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| [Header] | [Yes/No] | [Values] | [Description with format/examples] |

**Example**:
```
| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| Authorization | Yes | Bearer {token} | OAuth2 authentication token in format: Authorization: Bearer {token} |
| Content-Type | Yes (POST/PUT/PATCH) | application/json | Media type of request body for create/update operations |
| Accept | No | application/json | Preferred response format. Default: application/json. Value: application/json |
| Prefer | No | return=representation, return=minimal | OData preference. return=representation: include created/updated resource. return=minimal: response without body. |
| If-Match | No | {ETag} | ETag value for optimistic concurrency control on PUT/PATCH. Example: "abc123def456". Prevents lost-update problem. |
| X-Request-ID | No | UUID | Request tracking ID for logging and debugging. Any valid UUID format. Optional but recommended. |
```

### Response Headers

| Header Name | Description | Example Value |
|---|---|---|
| [Header] | [What this header contains] | [Example] |

**Example**:
```
| Header Name | Description | Example Value |
|---|---|---|
| Content-Type | Response body media type | application/json |
| ETag | Entity tag for caching and optimistic concurrency | "abc123def456" |
| Location | URL of newly created resource (201 responses) | [https://api.example.com/odata/v4/Employees('E12346](https://api.example.com/odata/v4/Employees('E12346)') |
| OData-Version | OData protocol version | 4.0 |
| Preference-Applied | Which Prefer header preference was applied | return=representation |
```

---

## Status and Error Codes

### Common Status Codes

| Status Code | Description | Typical Scenarios |
|---|---|---|
| [Code] | [Description] | [When this occurs] |

**Example**:
```
Success Codes:

| Status Code | Description | Typical Scenarios |
|---|---|---|
| 200 OK | Request successful. Response body contains requested data. | GET operations, POST with Prefer: return=representation |
| 201 Created | Resource successfully created. Location header contains new resource URL. | POST operations creating new entity |
| 204 No Content | Request successful. No response body returned. | DELETE operations, PUT/PATCH with Prefer: return=minimal |

Error Codes:

| Status Code | Description | Typical Scenarios |
|---|---|---|
| 400 Bad Request | Invalid request format, syntax, or OData query error. Response includes error details. | Malformed filter syntax, missing required fields, invalid data types |
| 401 Unauthorized | Authentication token missing, invalid, or expired. | Missing Authorization header, invalid token, expired token |
| 403 Forbidden | Authenticated but insufficient permissions for operation. | User lacks required role, permission denied for operation |
| 404 Not Found | Requested resource doesn't exist. | Invalid resource ID/key, deleted resource |
| 409 Conflict | Request conflicts with current state (duplicate, constraint violation). | Duplicate key/email, unique constraint violation, data conflict |
| 500 Internal Server Error | Server encountered unexpected error. | Unhandled server exception, database error |
```

---

## Examples

### Query All Resources

Retrieve all resources with optional filtering, selection, ordering, and pagination:

**Request**:
```http
GET /[ResourceName]?$filter=[filter]&$select=[properties]&$orderby=[property]&$top=[limit]&$skip=[offset] HTTP/1.1
Host: [host]
Authorization: Bearer {token}
Accept: application/json
```

**Example - Get all active employees, sorted by name, limit 20**:
```http
GET /Employees?$filter=Status eq 'ACTIVE'&$select=EmployeeID,FirstName,LastName,Email&$orderby=LastName asc&$top=20&$skip=0 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
```

**Response** (200 OK):
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
      "Email": "john.doe@company.com"
    },
    {
      "EmployeeID": "E12346",
      "FirstName": "Jane",
      "LastName": "Smith",
      "Email": "jane.smith@company.com"
    }
  ]
}
```

### Query Single Resource

Retrieve a single resource by key:

**Request**:
```http
GET /[ResourceName]('{Key}') HTTP/1.1
Host: [host]
Authorization: Bearer {token}
Accept: application/json
```

**Example**:
```http
GET /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
```

**Response** (200 OK):
```http
HTTP/1.1 200 OK
Content-Type: application/json
ETag: "abc123def456"

{
  "EmployeeID": "E12345",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2020-06-01",
  "Salary": 120000.00,
  "Status": "ACTIVE"
}
```

### Query with Navigation Expansion

Include related entity data:

**Request**:
```http
GET /Employees('E12345')?$expand=Department,Manager($select=FirstName,LastName) HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Accept: application/json
```

**Response** (200 OK):
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "EmployeeID": "E12345",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": {
    "DepartmentID": "ENG",
    "Name": "Engineering",
    "Location": "San Francisco"
  },
  "Manager": {
    "FirstName": "Jane",
    "LastName": "Smith"
  },
  "Status": "ACTIVE"
}
```

### Create Resource

Create a new resource:

**Request**:
```http
POST /[ResourceName] HTTP/1.1
Host: [host]
Authorization: Bearer {token}
Content-Type: application/json
Prefer: return=representation

[Request body with resource properties]
```

**Example**:
```http
POST /Employees HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Prefer: return=representation

{
  "FirstName": "Michael",
  "LastName": "Johnson",
  "Email": "michael.johnson@company.com",
  "Department": "SALES",
  "HireDate": "2024-01-15",
  "Salary": 85000.00
}
```

**Response** (201 Created):
```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: [https://api.example.com/odata/v4/Employees('E12347](https://api.example.com/odata/v4/Employees('E12347)')

{
  "EmployeeID": "E12347",
  "FirstName": "Michael",
  "LastName": "Johnson",
  "Email": "michael.johnson@company.com",
  "Department": "SALES",
  "HireDate": "2024-01-15",
  "Salary": 85000.00,
  "Status": "ACTIVE",
  "CreatedAt": "2024-01-15T10:30:00Z"
}
```

### Update Resource

Partially update a resource using PATCH:

**Request**:
```http
PATCH /[ResourceName]('{Key}') HTTP/1.1
Host: [host]
Authorization: Bearer {token}
Content-Type: application/json
If-Match: "{ETag}"

[Request body with properties to update]
```

**Example - Update salary and department**:
```http
PATCH /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
If-Match: "abc123def456"

{
  "Department": "ENGINEERING",
  "Salary": 125000.00
}
```

**Response** (204 No Content):
```http
HTTP/1.1 204 No Content
```

### Delete Resource

Delete a resource:

**Request**:
```http
DELETE /[ResourceName]('{Key}') HTTP/1.1
Host: [host]
Authorization: Bearer {token}
```

**Example**:
```http
DELETE /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (204 No Content):
```http
HTTP/1.1 204 No Content
```

---

## Related Documentation

- **Parent Service**: [Service Name](#[service-anchor])
- **Detailed Operations**:
  - [Create](#odata-operation-create)
  - [Read](#odata-operation-read)
  - [Update](#odata-operation-update)
  - [Delete](#odata-operation-delete)
- **Related Resources**: [Other Resource Name](#)

---

**Template Version**: 1.0
**Last Updated**: 2025-11-21
**Compliance**: SAP API Style Guide Section 50
