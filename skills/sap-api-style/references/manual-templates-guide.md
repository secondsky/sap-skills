# Manual REST and OData API Documentation Templates Guide

**Source**: [https://github.com/SAP-docs/api-style-guide/tree/main/docs/50-manually-written-rest-and-odata](https://github.com/SAP-docs/api-style-guide/tree/main/docs/50-manually-written-rest-and-odata)

**Last Verified**: 2025-11-21

**Attribution**: Content derived from [SAP API Style Guide](https://github.com/SAP-docs/api-style-guide) (Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))

**Changes**: Consolidated from multiple source files, reorganized for progressive disclosure, added examples and templates.

**Purpose**: Comprehensive reference for manually documenting REST and OData APIs with standardized templates and best practices

---

## TABLE OF CONTENTS

1. [Overview of Manual Documentation](#overview-of-manual-documentation)
2. [When to Use Manual Templates](#when-to-use-manual-templates)
3. [REST API Templates](#rest-api-templates)
4. [OData API Templates](#odata-api-templates)
5. [Template Comparison Table](#template-comparison-table)
6. [Best Practices](#best-practices)
7. [Complete Working Examples](#complete-working-examples)
8. [Field-by-Field Requirements](#field-by-field-requirements)
9. [Hierarchical Linking Guidance](#hierarchical-linking-guidance)

---

## OVERVIEW OF MANUAL DOCUMENTATION

### What Is Manual API Documentation?

Manual API documentation is custom-written reference content created when:
- Auto-generated documentation doesn't meet product requirements
- API documentation needs to be integrated into developer guides
- Custom documentation structure and presentation is required
- Documentation control and customization is a priority

### Auto-Generated vs Manual Documentation

| Aspect | Auto-Generated | Manual |
|--------|---|---|
| **Source** | OpenAPI specs, code annotations | Written documentation files |
| **Customization** | Limited to spec structure | Full control over structure and content |
| **Maintenance** | Updates with code changes | Manual synchronization needed |
| **Location** | Separate documentation portal | Integrated into guides |
| **Use Case** | Standard API catalogs | Custom developer guides |
| **Completeness** | Technical accuracy guaranteed | Requires careful review |

### Key Principle: Two-Tier Organization

Both REST and OData manual documentation follow a hierarchical approach:
1. **Level 1**: Overview (service/resource grouping)
2. **Level 2+**: Detailed documentation (methods/resources/operations)

This prevents redundancy and improves navigation.

---

## WHEN TO USE MANUAL TEMPLATES

Use manual documentation templates when:

1. **Documentation Doesn't Match Product Needs**
   - Auto-generated structure doesn't align with your service
   - Need custom grouping and organization

2. **Integration into Developer Guides**
   - API documentation must be embedded in larger guides
   - Single-document strategy preferred over separate catalogs

3. **Custom Presentation Requirements**
   - Need specific formatting or layout
   - Want to control example placement and detail level

4. **Complex Multi-Part Services**
   - Large services with many related resources
   - Clear hierarchy needed for navigation

5. **Regulatory or Compliance Requirements**
   - Documentation control is mandatory
   - Version tracking within guides is essential

---

## REST API TEMPLATES

### Overview: REST Two-Level Structure

REST API documentation uses a 2-level hierarchy:
- **Level 1: REST API Overview** - Documents related REST methods for same resource
- **Level 2: REST API Method** - Documents individual REST methods/endpoints

### REST API Overview Template (Level 1)

The Overview Template documents a set of related REST methods that apply to the same resource or service.

#### Template Sections

##### 1. Title and Introduction

**Format**: Descriptive title of the REST API or resource
**Description**: Short description of the REST API or set of REST methods that apply to the same resource

**Example Title**:
```
Employees REST API
```

**Example Description**:
```
Provides methods to retrieve, create, update, and delete employee records.
Supports querying employees by department, status, and other criteria.
```

##### 2. Base Information

**Base URI**
- Absolute endpoint where API is hosted
- Example: `[https://api.example.com/v1/employees`](https://api.example.com/v1/employees`)
- Include protocol, host, and path prefix

**Permissions**
- Required roles/permissions to access API
- List by operation type (read, write, delete)
- Example: "Requires HR_MANAGER or ADMIN role"

**Additional Context**
- Notes about API usage and scope
- Any prerequisites for calling the API

**Template Structure**:
```
## Base Information

Base URI: [Absolute URI, e.g., [https://api.example.com/v1]](https://api.example.com/v1])

Permissions: [Required permissions, e.g., ROLE_USER, ROLE_ADMIN]

Additional Notes: [Any important context about the API]
```

##### 3. Methods Section

**Purpose**: Catalog all available HTTP methods for the resource

**Table Structure**:
| HTTP Method | Action | URI |
|---|---|---|
| [GET/POST/PUT/DELETE/PATCH] | [Link to detailed method doc] | [Relative URI] |

**Detailed Example**:
| HTTP Method | Action | URI |
|---|---|---|
| GET | [List All Employees](#list-all-employees) | `/employees` |
| GET | [Get Employee by ID](#get-employee-by-id) | `/employees/{employeeId}` |
| POST | [Create Employee](#create-employee) | `/employees` |
| PUT | [Update Employee](#update-employee) | `/employees/{employeeId}` |
| DELETE | [Delete Employee](#delete-employee) | `/employees/{employeeId}` |

**Best Practices**:
- Actions should be links to detailed method documentation
- URIs are relative to Base URI
- Order by operation type (GET, POST, PUT, DELETE, PATCH)
- Use consistent URI naming conventions

##### 4. Common Request Headers Documentation

**Purpose**: Document HTTP headers used in requests to the API

**Table Structure**:
| Header Name | Required | Description |
|---|---|---|
| [Header name] | [Yes/No] | [Description with possible/default values] |

**Common Headers Example**:
| Header Name | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token for authentication. Format: `Authorization: Bearer {token}` |
| Content-Type | Yes | Media type of request body. Value: `application/json` |
| Accept | No | Preferred response format. Default: `application/json` |
| X-Request-ID | No | Optional request ID for tracking. Any UUID format accepted |

**Field Descriptions**:
- **Header Name**: Exact header name as expected (case-sensitive)
- **Required**: Yes if header must be present, No if optional
- **Description**: Explain purpose, format, constraints, and default values if applicable

##### 5. Common Response Headers Documentation

**Purpose**: Document HTTP headers that appear in responses

**Table Structure**:
| Header Name | Description |
|---|---|
| [Header name] | [Purpose and possible values] |

**Common Response Headers Example**:
| Header Name | Description |
|---|---|
| Content-Type | Type of response body. Value: `application/json` |
| X-Total-Count | Total number of resources available (for paginated responses) |
| X-RateLimit-Remaining | Number of API calls remaining in current rate limit window |
| Location | URL of newly created resource (returned by POST operations creating resources) |

##### 6. Status Codes Section

**Purpose**: Catalog all possible HTTP status codes returned by the API

**Table Structure**:
| Status Code | Result Description |
|---|---|
| [2xx/3xx/4xx/5xx] | [What this status means in context of your API] |

**Common Status Codes Example**:

Success Codes:
| Status Code | Result Description |
|---|---|
| 200 OK | Request successful. Response body contains requested data |
| 201 Created | Resource successfully created. Location header contains URL to new resource |
| 204 No Content | Request successful. No response body returned (typically for DELETE) |

Error Codes:
| Status Code | Result Description |
|---|---|
| 400 Bad Request | Invalid request format or missing required fields |
| 401 Unauthorized | Authentication required or token invalid/expired |
| 403 Forbidden | Authenticated but insufficient permissions for resource |
| 404 Not Found | Requested resource doesn't exist |
| 409 Conflict | Request conflicts with current state (e.g., duplicate creation) |
| 500 Internal Server Error | Server encountered unexpected error |

#### Complete REST Overview Template Example

```markdown
# Employees REST API

Provides methods to retrieve, create, update, and delete employee records.
Supports querying employees by department, status, organizational hierarchy,
and other criteria.

## Base Information

**Base URI**: `[https://api.example.com/v1/employees`](https://api.example.com/v1/employees`)

**Permissions**: ROLE_HR_USER (read), ROLE_HR_MANAGER (write/delete)

**Additional Notes**:
- All requests require Bearer token authentication
- API supports pagination with `limit` and `offset` parameters
- Rate limit: 1000 requests per hour

## Methods

| HTTP Method | Action | URI |
|---|---|---|
| GET | [List all employees](#get-employees-list) | `/employees` |
| GET | [Get employee by ID](#get-employee) | `/employees/{employeeId}` |
| POST | [Create new employee](#post-employee) | `/employees` |
| PUT | [Update employee](#put-employee) | `/employees/{employeeId}` |
| PATCH | [Partially update employee](#patch-employee) | `/employees/{employeeId}` |
| DELETE | [Delete employee](#delete-employee) | `/employees/{employeeId}` |

## Common Request Headers

| Header Name | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token for authentication. Format: `Authorization: Bearer {token}` |
| Content-Type | Yes | Media type for request body. Value: `application/json` |
| Accept | No | Preferred response format. Default: `application/json` |
| X-Request-ID | No | Optional request tracking ID. Any UUID format |
| If-Match | No | ETag for optimistic locking (for PUT/PATCH). Example: `"abc123def456"` |

## Common Response Headers

| Header Name | Description |
|---|---|
| Content-Type | Type of response body. Value: `application/json` |
| X-Total-Count | Total number of available resources (paginated responses) |
| X-RateLimit-Remaining | Remaining API calls in current rate limit window |
| ETag | Entity tag for caching and optimistic locking |
| Location | URL of newly created resource (201 Created responses) |
| Retry-After | Seconds to wait before retrying (429 Too Many Requests) |

## Status Codes

**Success Codes**:
| Status Code | Result Description |
|---|---|
| 200 OK | Request successful. Response contains employee data |
| 201 Created | Employee successfully created. Location header contains new employee URL |
| 204 No Content | Deletion successful. No response body returned |

**Error Codes**:
| Status Code | Result Description |
|---|---|
| 400 Bad Request | Invalid request format or missing required fields. Check error details |
| 401 Unauthorized | Authentication token missing, invalid, or expired |
| 403 Forbidden | Authenticated but insufficient permissions for operation |
| 404 Not Found | Employee with specified ID doesn't exist |
| 409 Conflict | Employee email already exists or data conflict prevents operation |
| 500 Internal Server Error | Server error. Contact support if issue persists |
```

---

### REST API Method Template (Level 2)

The Method Template documents individual REST API methods/endpoints with detailed information.

#### Template Sections

##### 1. Title and Introduction

**Format**: Action + Resource
**Content**: Brief description of what the method does

**Examples**:
- "List All Employees"
- "Get Employee by ID"
- "Create New Employee"
- "Update Employee"
- "Delete Employee"

**Description Template**:
```
Brief description of the REST method's purpose and primary function.
Include what the method retrieves, creates, modifies, or deletes.
```

**Example Description**:
```
Retrieves a complete list of all employees in the system with support
for filtering, sorting, and pagination.
```

##### 2. Usage Section

**Purpose**: Explain when and how to use this method

**Content**:
- Additional information about the method
- Functionality details beyond the summary
- When to use this method vs. alternatives
- Any important prerequisites or constraints

**Template**:
```
## Usage

Use this method when [explain scenario].

Key points:
- [Important characteristic or constraint]
- [Related method if applicable]
- [Performance consideration if relevant]
```

**Example**:
```
## Usage

Use this method to retrieve all employee records with optional filtering
and pagination.

Key points:
- Supports filtering by multiple fields using query parameters
- Returns paginated results (default: 20 per page, max: 100)
- Results sorted by employee ID unless otherwise specified
- Related method: GET /employees/{employeeId} for specific employee
```

##### 3. Request Details Section

**3.1 Request Line**
```
[HTTP METHOD] [Relative URI Path]

GET /employees
GET /employees/{employeeId}
POST /employees
```

**3.2 HTTP Method Specification**
- Exact HTTP method: GET, POST, PUT, PATCH, DELETE
- Must match operation being documented

**3.3 Permission Requirements**
- Required role or permission
- Related to operation type (read, write, delete)

**Template**:
```
Permission: [Required role, e.g., ROLE_HR_USER for read, ROLE_HR_MANAGER for write]
```

**3.4 Common Request Headers Reference**
- Reference headers documented in Overview
- Note any method-specific header requirements

**Template**:
```
Refer to [Common Request Headers](#common-request-headers) in overview.

Additional method-specific headers: [List any specific headers]
```

**3.5 Parameter Documentation**

**Table Structure**:
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| [Name] | Required/Optional | [Type] | [Description of purpose and constraints] | [Path/Query/Body/Header] |

**Detailed Parameter Examples**:

*Path Parameters* (required):
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| employeeId | Required | String | Unique employee identifier. Pattern: `E[0-9]{5}` | Path |

*Query Parameters* (optional filtering/pagination):
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| limit | Optional | Integer | Maximum results per page. Range: 1-100. Default: 20 | Query |
| offset | Optional | Integer | Number of results to skip for pagination. Default: 0 | Query |
| department | Optional | String | Filter by department code. Example: "SALES" | Query |
| status | Optional | String | Filter by employee status. Valid: "ACTIVE", "INACTIVE", "LEAVE" | Query |
| sortBy | Optional | String | Sort field. Valid: "name", "hireDate", "salary" | Query |

*Request Body* (for POST/PUT):
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| firstName | Required | String | Employee's first name. Length: 1-50 characters | Body |
| lastName | Required | String | Employee's last name. Length: 1-50 characters | Body |
| email | Required | String | Corporate email. Must be unique. Format: valid email | Body |
| department | Required | String | Department code. Example: "SALES" | Body |
| hireDate | Optional | String | Hire date in YYYY-MM-DD format. Example: "2024-01-15" | Body |
| salary | Optional | Decimal | Annual salary in USD. Minimum: 20000 | Body |

**Parameter Field Descriptions**:
- **Parameter Name**: Exact name as expected in request
- **Requirement**: Required or Optional
- **Data Type**: string, integer, boolean, number, date, array, object
- **Description**: Explain purpose, format requirements, valid values, constraints
- **Location**: Path (URI), Query (URL params), Body (request payload), Header

**3.6 Request Body Example**

**For POST/PUT/PATCH**: Include JSON structure

**Template**:
```
## Request Body

[JSON example with actual data structures]

## Request Example

[Complete curl or HTTP request example]
```

**Example**:
```
## Request Body

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

## Request Example

```
POST /employees HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
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
```

##### 4. Response Information Section

**4.1 HTTP Status Codes and Descriptions**

**Table Structure**:
| Status Code | Description |
|---|---|
| [Code] | [What this code means for this operation] |

**Common Response Status Codes Example**:

For GET method:
| Status Code | Description |
|---|---|
| 200 OK | List successfully retrieved. Response body contains employee array |
| 401 Unauthorized | Authentication token missing or invalid |
| 403 Forbidden | Insufficient permissions to access employee data |
| 500 Internal Server Error | Server error. Contact support |

For POST method:
| Status Code | Description |
|---|---|
| 201 Created | Employee successfully created. Location header contains new employee URL |
| 400 Bad Request | Invalid request format. Check firstName, lastName, email, department |
| 401 Unauthorized | Authentication token missing or invalid |
| 409 Conflict | Employee with specified email already exists |
| 500 Internal Server Error | Server error. Contact support |

**4.2 Response Body Example**

**For successful response**:
```json
{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "hireDate": "2024-01-15",
  "salary": 95000.00,
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z",
  "lastModified": "2024-01-15T10:30:00Z"
}
```

**4.3 Response Example with Headers**

**Template**:
```
HTTP/1.1 [Status Code] [Status Message]
Content-Type: application/json
Location: [Relevant URLs for created resources]
X-Total-Count: [Total count for paginated responses]

[Response body JSON]
```

**Example for POST (201 Created)**:
```
HTTP/1.1 201 Created
Content-Type: application/json
Location: [https://api.example.com/v1/employees/E12346](https://api.example.com/v1/employees/E12346)

{
  "employeeId": "E12346",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "hireDate": "2024-01-15",
  "salary": 95000.00,
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Complete REST Method Template Example

```markdown
## Get Employee by ID

Retrieves complete employee information for a specific employee including
personal data, organizational assignments, and compensation details.

### Usage

Use this method to retrieve full details of a specific employee when you know
their employee ID. Returns all employee information in a single request.

Key points:
- Returns complete employee profile
- Requires valid employee ID in path
- Related method: GET /employees for listing all employees

### Request

GET /employees/{employeeId}

Permission: ROLE_HR_USER (read access)

#### Path Parameters

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| employeeId | Required | String | Unique employee identifier. Pattern: `E[0-9]{5}`. Example: "E12345" | Path |

#### Request Headers

Refer to [Common Request Headers](#common-request-headers) in overview.

### Response

#### Status Codes

| Status Code | Description |
|---|---|
| 200 OK | Employee successfully retrieved. Response body contains complete employee data |
| 401 Unauthorized | Authentication token missing, invalid, or expired |
| 403 Forbidden | Authenticated but insufficient permissions to access this employee |
| 404 Not Found | No employee found with provided employeeId |
| 500 Internal Server Error | Server error. Contact support if issue persists |

#### Response Body

```json
{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "jobTitle": "Senior Software Engineer",
  "manager": {
    "employeeId": "E10001",
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "hireDate": "2020-06-01",
  "salary": 120000.00,
  "currency": "USD",
  "status": "ACTIVE",
  "officeLocation": "San Francisco",
  "createdAt": "2020-06-01T09:00:00Z",
  "lastModified": "2024-01-15T14:30:00Z"
}
```

#### Response Example

```
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Remaining: 998

{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "department": "ENGINEERING",
  "hireDate": "2020-06-01",
  "salary": 120000.00,
  "status": "ACTIVE"
}
```

#### Error Response Example (404 Not Found)

```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "NOT_FOUND",
    "message": "No employee found with ID E99999",
    "details": {
      "resourceType": "Employee",
      "providedId": "E99999"
    }
  }
}
```
```

#### REST Method Template Structure Checklist

- [ ] Title (action + resource)
- [ ] Introduction/description
- [ ] Usage section with key points
- [ ] Request line (HTTP METHOD + URI)
- [ ] Permission requirements
- [ ] Common headers reference
- [ ] Parameter documentation table
- [ ] Parameter location (Path/Query/Body/Header)
- [ ] Request body example (for POST/PUT/PATCH)
- [ ] Complete request example
- [ ] Status codes with descriptions
- [ ] Response body example (JSON structure)
- [ ] Complete response example with headers
- [ ] Error response example(s)

---

### REST API Templates - Usage Guidelines

#### Two-Level Organization

**Level 1 - Overview Template**:
- Use for overview of related REST API methods that apply to the same resource or belong to the same service
- Contains shared information (base URI, permissions, common headers)
- Includes method list with links to detailed documentation

**Level 2 - Method Template**:
- Use for documenting individual REST API endpoints
- Contains method-specific details
- Should not repeat information from Overview

#### Best Practices for REST Templates

1. **Organize by Resource or Service**
   - Group related methods under unified overview documentation
   - Don't treat each endpoint in isolation
   - Example: All employee methods together, all department methods together

2. **Separate Common from Specific Information**
   - Place authentication, base URLs, common parameters in Overview
   - Reserve Method templates for endpoint-specific content
   - Reduces redundancy and improves maintainability

3. **Maintain Clear Navigation**
   - Overview documents must include list of methods with links to detailed docs
   - Method docs should link back to Overview
   - Help users navigate between related endpoints

4. **Consistent Structure**
   - Follow standardized templates exactly
   - Ensures documentation quality across API
   - Developers become familiar with format

5. **Complete Parameter Documentation**
   - Always specify parameter location (Path/Query/Body/Header)
   - Include constraints (min/max, patterns, valid values)
   - Document default values
   - Explain what each parameter controls

6. **Contextual Status Code Descriptions**
   - Don't just list codes—explain what they mean for THIS method
   - Example: "200 OK: Employee successfully retrieved with full profile"
   - Not just: "200 OK: Request successful"

7. **Real Examples**
   - Provide working request/response examples
   - Use realistic data that matches parameter documentation
   - Show common use cases and error scenarios

---

## OData API TEMPLATES

### Overview: OData Three-Level Structure

OData API documentation uses a 3-level hierarchy:
- **Level 1: OData Service Overview** - Describes entire OData service
- **Level 2: OData Resource** - Documents individual resources/entity sets
- **Level 3: OData Operation** - Documents single operations on resources

---

### OData Service Overview Template (Level 1)

The Service Overview Template documents a complete OData service with metadata and resource listing.

#### Template Sections

##### 1. Title and Introduction

**Format**: Service Name
**Content**: Brief description of the OData service

**Example Title**:
```
Employees OData Service
```

**Example Description**:
```
Provides OData v4 API for accessing and managing employee data including
personal information, organizational assignments, and compensation details.
Supports full CRUD operations with complex filtering and navigation.
```

##### 2. Overview Section

**2.1 OData Version**

Specify which OData version(s) the service supports:
```
OData Version: 4.0 | 3.0 | 2.0
```

Different versions have different capabilities:
- **OData 4.0**: Latest version with modern features
- **OData 3.0**: Older but widely supported version
- **OData 2.0**: Legacy version (limited features)

**Example**:
```
OData Version: 4.0 (with 3.0 backward compatibility available via `/odata/v3` endpoint)
```

**2.2 Root URI**

Absolute URI where OData service is accessible:
```
Root URI: [Absolute service path]
```

Include:
- Protocol (https://)
- Host
- Service path
- Example: `[https://api.example.com/odata/v4/employees`](https://api.example.com/odata/v4/employees`)

**Example**:
```
Root URI: `[https://api.example.com/odata/v4`](https://api.example.com/odata/v4`)

Service endpoints:
- Employees: `/odata/v4/Employees`
- Departments: `/odata/v4/Departments`
- Compensation: `/odata/v4/Compensation`
```

**2.3 Permissions and Roles**

Required permissions to access the OData service:
```
Required Permissions: [List roles and what they allow]
```

**Example**:
```
Required Permissions:
- ROLE_HR_USER: Read access to all resources
- ROLE_HR_MANAGER: Read and write access to employee data
- ROLE_FINANCE: Read access to compensation data only
```

**2.4 OData Feature Support Matrix**

Document which OData features the service supports:

| Feature | Supported | Notes |
|---|---|---|
| Filtering ($filter) | Yes | All comparison operators supported |
| Ordering ($orderby) | Yes | Ascending and descending |
| Paging ($top, $skip) | Yes | Maximum 1000 records per request |
| Selection ($select) | Yes | Choose specific properties |
| Expansion ($expand) | Yes | Limited to 2 levels deep |
| Functions | Yes | Custom business logic operations |
| Actions | No | Not implemented in this version |
| Batch Requests | No | Each request handled individually |
| Metadata Filtering | Yes | Via $metadata endpoint |

**Template**:
```
## OData Feature Support

| Feature | Supported | Notes |
|---|---|---|
| [Feature name] | Yes/No/Partial | [Any specific details or constraints] |
```

##### 3. Entity Data Model Section

**3.1 Entity Relationship Diagram**

Document the data model visually or with description:
```
Include diagram or detailed description of entity relationships:
- Entity types
- Navigation properties
- Associations
```

**Example Description**:
```
The service includes the following entity types:
- Employee: Contains personal and employment information
  - Has relationship to Department (Navigation: Department)
  - Has relationship to Manager (Navigation: Manager)
  - Has relationship to Compensation (Navigation: Compensation)

- Department: Contains organization structure
  - Has relationship to Employees (Navigation: Employees)
  - Has relationship to Parent Department (Navigation: ParentDepartment)

- Compensation: Contains salary and benefits
  - Has relationship to Employee (Navigation: Employee)
```

**3.2 Service Metadata URI**

Endpoint to retrieve service metadata:
```
Service Metadata URI: [Root URI]/$metadata
```

The $metadata endpoint provides:
- Entity definitions and properties
- Navigation properties and relationships
- OData function and action definitions
- Service capabilities

**Example**:
```
Service Metadata URI: `[https://api.example.com/odata/v4/$metadata`](https://api.example.com/odata/v4/$metadata`)

This endpoint returns the complete service definition in CSDL (Common Schema Definition Language) format.
Useful for code generation and understanding the full service structure.
```

**3.3 Additional Model Notes**

Any important information about the data model:
- Property constraints
- Complex types
- Computed properties
- Inheritance structures

**Example**:
```
## Additional Model Notes

- All timestamps are in UTC format (ISO 8601)
- Employee IDs follow pattern: E[0-9]{5}
- Salary values are in local currency as specified in Compensation entity
- Department hierarchies can nest up to 10 levels deep
```

##### 4. Resources Section

**Purpose**: List all entity sets available in the service

**Table Structure** (can have multiple tables organized by category):

| Resource Name | Description | Path |
|---|---|---|
| [Entity Set Name] | [Description of what resource contains] | [Relative path] |

**Detailed Example**:

| Resource Name | Description | Path |
|---|---|---|
| [Employees](#odata-resource-employees) | Collection of all employees in system | `/Employees` |
| [Departments](#odata-resource-departments) | Organization departments and structure | `/Departments` |
| [Compensation](#odata-resource-compensation) | Employee salary and benefits data | `/Compensation` |

**Formatting Guidelines**:
- Resource names should be links to detailed resource documentation
- Descriptions should be concise but informative
- Paths are relative to root URI
- Organized alphabetically or by category

#### Complete OData Service Overview Template Example

```markdown
# Employees OData Service

Provides OData v4 API for accessing and managing employee data including
personal information, organizational assignments, compensation details, and
organizational hierarchy. Supports full CRUD operations with complex filtering
and advanced query capabilities.

## Overview

**OData Version**: 4.0 (with backward compatibility for 3.0 via separate endpoints)

**Root URI**: `[https://api.example.com/odata/v4`](https://api.example.com/odata/v4`)

**Required Permissions**:
- ROLE_HR_USER: Read access to all resources
- ROLE_HR_MANAGER: Read and write access to employee and department data
- ROLE_FINANCE: Read access to compensation data
- ROLE_ADMIN: Full read/write access to all resources

## OData Feature Support

| Feature | Supported | Notes |
|---|---|---|
| Filtering ($filter) | Yes | All OData comparison operators, logical operators |
| Ordering ($orderby) | Yes | Single and multiple field ordering, ascending/descending |
| Paging ($top, $skip) | Yes | Max 1000 records per request, default 50 |
| Selection ($select) | Yes | Choose specific properties to reduce payload |
| Expansion ($expand) | Yes | Navigate relationships, limited to 3 levels deep |
| Counting ($count) | Yes | Get total record count |
| Functions | Yes | Custom business functions supported |
| Actions | Partial | Limited action support for specific operations |
| Batch Requests | Yes | Multiple operations in single request |
| Media Resources | No | File upload/download not supported |

## Entity Data Model

The service manages the following entity relationships:

**Employee Entity**:
- Contains employee personal and employment data
- Navigates to Department (organization assignment)
- Navigates to Manager (reporting relationship)
- Navigates to Compensation (salary/benefits)
- Properties: EmployeeID, FirstName, LastName, Email, HireDate, Status, etc.

**Department Entity**:
- Contains organization structure
- Navigates to Employees (all members)
- Navigates to Parent Department (hierarchy)
- Properties: DepartmentID, Name, Manager, Location, Cost Center, etc.

**Compensation Entity**:
- Contains salary and benefits information
- Navigates to Employee
- Properties: CompensationID, EmployeeID, BaseSalary, Currency, Benefits, etc.

**Service Metadata URI**: `[https://api.example.com/odata/v4/$metadata`](https://api.example.com/odata/v4/$metadata`)

The metadata endpoint returns the complete service definition. Use for understanding
entity properties, relationships, and available operations.

## Resources

| Resource Name | Description | Path |
|---|---|---|
| [Employees](#employees-resource) | All employees in the system | `/Employees` |
| [Departments](#departments-resource) | Organization departments and structure | `/Departments` |
| [Compensation](#compensation-resource) | Employee compensation and benefits | `/Compensation` |

## Additional Information

- All timestamps use UTC format (ISO 8601)
- Employee IDs follow pattern: E[0-9]{5} (example: E12345)
- Salary values in specified currency (see Compensation entity)
- Department hierarchies can nest up to 10 levels
- Maximum request payload: 10 MB
- Rate limit: 1000 requests per hour per user
```

---

### OData Resource Template (Level 2)

The Resource Template documents individual resources/entity sets within the OData service.

#### Template Sections

##### 1. Title and Introduction

**Format**: Resource Name
**Content**: Description of what the resource represents and contains

**Example Title**:
```
Employees Resource
```

**Example Description**:
```
Collection of all employees in the system. Provides access to employee master
data including personal information, organizational assignments, employment
status, and related compensation information.
```

**Additional Context**:
```
This resource represents the complete employee dataset. Use for querying,
creating, updating, and managing employee records. Navigation properties
allow access to related departments, managers, and compensation details.
```

##### 2. Resource Path and Permissions

**Resource Path**:
```
Path: [Relative path to entity set]

Example: `/Employees`
```

**Complete addressing**:
```
Absolute path: [Root URI] + [Resource Path]
Example: `[https://api.example.com/odata/v4/Employees`](https://api.example.com/odata/v4/Employees`)
```

**Individual Resource Addressing**:
```
Addressing specific resource: [Resource]\([Key])

Example: `/Employees('E12345')`
Example: `/Employees(EmployeeID='E12345')`
```

**Required Permissions**:
```
Read: [Required role]
Write/Create: [Required role]
Update: [Required role]
Delete: [Required role]
```

**Template**:
```
## Resource Information

**Resource Path**: `/Employees`

**Absolute URI**: `[https://api.example.com/odata/v4/Employees`](https://api.example.com/odata/v4/Employees`)

**Key Property**: EmployeeID

**Individual Resource**: `/Employees('E12345')`

**Required Permissions**:
- Read: ROLE_HR_USER or higher
- Create: ROLE_HR_MANAGER or higher
- Update: ROLE_HR_MANAGER or higher
- Delete: ROLE_ADMIN only
```

##### 3. Operations Section

Document all operations available on the resource, organized by type:

###### 3.1 CRUD Operations

Standard Create, Read, Update, Delete operations:

| HTTP Method | Action | URI | Description |
|---|---|---|---|
| GET | [Read Collection](#operation-get-employees) | `/Employees` | Retrieve all employees |
| GET | [Read Single](#operation-get-employee) | `/Employees('E12345')` | Retrieve specific employee |
| POST | [Create](#operation-create-employee) | `/Employees` | Create new employee |
| PUT | [Replace](#operation-replace-employee) | `/Employees('E12345')` | Replace entire employee |
| PATCH | [Update](#operation-update-employee) | `/Employees('E12345')` | Partial update employee |
| DELETE | [Delete](#operation-delete-employee) | `/Employees('E12345')` | Delete employee |

###### 3.2 Custom Operations

Non-standard operations (Actions and Functions):

| Operation Type | Operation Name | URI | Description |
|---|---|---|---|
| Function | [Get Manager](#function-get-manager) | `/Employees('E12345')/GetManager()` | Get employee's manager |
| Function | [Get Reports](#function-get-reports) | `/Employees('E12345')/GetDirectReports()` | Get direct reports |
| Action | [Promote](#action-promote) | `/Employees('E12345')/Promote` | Promote employee (custom action) |
| Action | [Deactivate](#action-deactivate) | `/Employees('E12345')/Deactivate` | Deactivate employee (custom action) |

**Formatting**:
- Operations should be links to detailed operation documentation
- Include HTTP method, operation name, and URI
- Separate CRUD from custom operations for clarity

##### 4. Common Headers Section

**Request Headers**:
| Header Name | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token for authentication |
| Content-Type | Yes | `application/json` for POST/PUT/PATCH |
| Accept | No | Preferred response format, default: `application/json` |
| Prefer | No | OData preferences, e.g., `return=representation` |

**Response Headers**:
| Header Name | Description |
|---|---|
| Content-Type | Response format (application/json) |
| ETag | Entity tag for optimistic concurrency |
| Preference-Applied | Indicates which Prefer header was applied |

##### 5. Status and Error Codes Section

| Status Code | Description |
|---|---|
| 200 OK | Request successful, response body contains data |
| 201 Created | Resource successfully created |
| 204 No Content | Operation successful, no response body (DELETE, update with no return) |
| 400 Bad Request | Invalid request format or OData query syntax |
| 401 Unauthorized | Authentication token missing or invalid |
| 403 Forbidden | Insufficient permissions for operation |
| 404 Not Found | Resource with specified key doesn't exist |
| 409 Conflict | Resource already exists or data conflict |
| 500 Internal Server Error | Server error |

#### Complete OData Resource Template Example

```markdown
## Employees Resource

Collection of all employees in the system. Provides access to employee master
data including personal information, organizational assignments, employment
status, and compensation information.

### Resource Information

**Resource Path**: `/Employees`

**Absolute URI**: `[https://api.example.com/odata/v4/Employees`](https://api.example.com/odata/v4/Employees`)

**Key Property**: EmployeeID

**Individual Resource URI**: `/Employees('E12345')`

**Required Permissions**:
- Read: ROLE_HR_USER or higher
- Create: ROLE_HR_MANAGER or higher
- Update: ROLE_HR_MANAGER or higher
- Delete: ROLE_ADMIN only

**Resource Properties**:
- EmployeeID (string): Unique employee identifier
- FirstName (string): Employee's first name
- LastName (string): Employee's last name
- Email (string): Corporate email address
- HireDate (date): Date employee joined
- Status (string): Employment status (ACTIVE, INACTIVE, LEAVE)
- DepartmentID (string): FK to Department
- ManagerID (string): FK to Manager
- Salary (decimal): Annual salary
- CreatedAt (datetime): Resource creation timestamp
- LastModified (datetime): Last modification timestamp

### Operations

#### CRUD Operations

| HTTP Method | Action | URI |
|---|---|---|
| GET | [Retrieve all employees](#get-employees) | `/Employees` |
| GET | [Retrieve specific employee](#get-single-employee) | `/Employees('{EmployeeID}')` |
| POST | [Create new employee](#create-employee) | `/Employees` |
| PUT | [Replace entire employee](#replace-employee) | `/Employees('{EmployeeID}')` |
| PATCH | [Update employee](#update-employee) | `/Employees('{EmployeeID}')` |
| DELETE | [Delete employee](#delete-employee) | `/Employees('{EmployeeID}')` |

#### Navigation Properties

| Navigation | Target | Description |
|---|---|---|
| Department | Department | Navigate to employee's department |
| Manager | Employee | Navigate to employee's manager |
| DirectReports | Employee (collection) | Navigate to direct reports |
| Compensation | Compensation | Navigate to compensation record |

#### Custom Functions and Actions

| Type | Name | URI | Description |
|---|---|---|---|
| Function | GetManager | `/Employees('{EmployeeID}')/GetManager()` | Get employee's direct manager |
| Function | GetDirectReports | `/Employees('{EmployeeID}')/GetDirectReports()` | Get all direct reports |
| Function | GetCompensation | `/Employees('{EmployeeID}')/GetCompensation()` | Get compensation details |
| Action | Promote | `/Employees('{EmployeeID}')/Promote` | Promote employee (requires ROLE_HR_MANAGER) |

### Common Headers

**Request Headers**:
| Header Name | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token. Format: `Authorization: Bearer {token}` |
| Content-Type | Yes for POST/PUT/PATCH | Value: `application/json` |
| Accept | No | Preferred response format. Default: `application/json` |
| Prefer | No | OData preferences. Example: `return=representation` |
| If-Match | No | ETag for optimistic concurrency (PUT/PATCH) |

**Response Headers**:
| Header Name | Description |
|---|---|
| Content-Type | Response format: `application/json` |
| ETag | Entity tag for optimistic concurrency control |
| Preference-Applied | Indicates which Prefer preference was applied |
| OData-Version | OData protocol version |

### Status and Error Codes

**Success Codes**:
| Status Code | Description |
|---|---|
| 200 OK | Query successful. Response contains employee data |
| 201 Created | Employee successfully created. Location header contains new URL |
| 204 No Content | Operation successful (update/delete). No response body |

**Error Codes**:
| Status Code | Description |
|---|---|
| 400 Bad Request | Invalid OData query syntax or request format |
| 401 Unauthorized | Authentication token missing, invalid, or expired |
| 403 Forbidden | Insufficient permissions for operation |
| 404 Not Found | Employee with specified ID doesn't exist |
| 409 Conflict | Employee already exists or data constraint violation |
| 500 Internal Server Error | Server error. Contact support |

### Examples

#### Query all employees:
```
GET /Employees HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Accept: application/json
```

#### Query with filtering and selection:
```
GET /Employees?$filter=Status eq 'ACTIVE' and Department eq 'SALES'&$select=EmployeeID,FirstName,LastName,Email HTTP/1.1
```

#### Query with paging:
```
GET /Employees?$top=50&$skip=100 HTTP/1.1
```

#### Get specific employee with navigation:
```
GET /Employees('E12345')?$expand=Department,Manager HTTP/1.1
```
```

---

### OData Operation Template (Level 3)

The Operation Template documents individual operations on OData resources with complete details.

#### Template Sections

##### 1. Title and Introduction

**Format**: Operation Name (HTTP Method + Resource + Operation)
**Content**: Brief description of the operation

**Examples**:
- "Create New Employee (POST)"
- "Get Employee by ID (GET)"
- "Update Employee (PATCH)"
- "Get Employee's Manager (Function)"

**Description**:
```
Brief summary of what the operation does, what it requires, and what it returns.
Include business context if relevant.
```

**Example**:
```
Creates a new employee record in the system with provided information.
Automatically assigns employee ID and initializes default values.
```

##### 2. Operation Details

**2.1 Operation Description**

Explain when and why to use this operation:
- Primary use case
- Important prerequisites
- Related operations
- Any special behaviors

**Template**:
```
Use this operation to [describe scenario].

Key points:
- [Important characteristic]
- [Related operation if applicable]
- [Performance note if relevant]
```

##### 3. Request Section

**3.1 URI (Absolute or Relative)**

Complete URI for the operation:
```
[HTTP Method] [Path]

Example: POST /Employees
Example: GET /Employees('E12345')
Example: PATCH /Employees('E12345')
```

**3.2 Operation Type**

Classify the operation:
```
Operation Type: [CRUD/Function/Action]
- CRUD: Standard Create, Read, Update, Delete operations
- Function: Reusable function that returns data
- Action: Operation that performs business logic
```

**3.3 HTTP Method**

Exact HTTP method:
```
HTTP Method: GET | POST | PUT | PATCH | DELETE
```

**3.4 Required Permissions**

Who can call this operation:
```
Required Permission: [Role or permission level]

Example: ROLE_HR_MANAGER for write operations
```

**3.5 Request Headers Table**

| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| [Header] | [Yes/No] | [Values] | [Description with format/examples] |

**Example**:
| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| Authorization | Yes | `Bearer {token}` | OAuth2 authentication token |
| Content-Type | Yes (POST/PUT/PATCH) | `application/json` | Media type of request body |
| Accept | No | `application/json` | Preferred response format |
| Prefer | No | `return=representation` | Return created resource in response (optional) |
| If-Match | No | `{ETag}` | ETag for optimistic concurrency (conditional update) |

**3.6 Request Parameters Table**

All parameters passed to the operation:

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| [Name] | Required/Optional | [Type] | [Description with constraints/valid values] | [Path/Query/Body/Header] |

**Organized by Location**:

*Path Parameters* (in URI):
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| EmployeeID | Required | String | Employee unique identifier. Pattern: `E[0-9]{5}` | Path |

*Query Parameters* (for GET with filtering):
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| $filter | Optional | String | OData filter expression. Example: `FirstName eq 'John'` | Query |
| $orderby | Optional | String | Sort order. Example: `HireDate desc` | Query |
| $top | Optional | Integer | Maximum records (1-1000). Default: 50 | Query |
| $skip | Optional | Integer | Records to skip for paging. Default: 0 | Query |
| $select | Optional | String | Properties to include. Example: `FirstName,LastName,Email` | Query |

*Request Body* (for POST/PUT/PATCH):
| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| FirstName | Required | String | Employee's first name (1-50 chars) | Body |
| LastName | Required | String | Employee's last name (1-50 chars) | Body |
| Email | Required | String | Corporate email (must be unique) | Body |
| Department | Required | String | Department code | Body |
| HireDate | Optional | Date | Hire date (YYYY-MM-DD format) | Body |
| Salary | Optional | Decimal | Annual salary (min: 20000) | Body |

##### 4. Request Example

Complete request with headers and body:

**Simple GET Request**:
```http
GET /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

**Filtered GET Request**:
```http
GET /Employees?$filter=Status eq 'ACTIVE' and Department eq 'SALES'&$select=EmployeeID,FirstName,LastName HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

**POST Request with Body**:
```http
POST /Employees HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Salary": 95000.00
}
```

**PATCH Request (Partial Update)**:
```http
PATCH /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
If-Match: "abc123def456"

{
  "Department": "SALES",
  "Salary": 105000.00
}
```

##### 5. Response Section

**5.1 Response Headers Table**

| Header Name | Description | Example Value |
|---|---|---|
| Content-Type | Media type of response body | `application/json` |
| ETag | Entity tag for caching/concurrency | `"abc123def456"` |
| Location | URL of created/modified resource | `/Employees('E12346')` |
| OData-Version | OData protocol version | `4.0` |

**5.2 Status and Error Codes Table**

| Status Code | Description | Response Body |
|---|---|---|
| 200 OK | [Success description] | [Entity or data returned] |
| 201 Created | [Success description] | [Entity in response] |
| 204 No Content | [Success description] | Empty body |
| 400 Bad Request | [Error description] | Error details |
| 401 Unauthorized | [Error description] | Error message |

**5.3 Response Payload Example**

Success response body with actual data structure:

```json
{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Status": "ACTIVE",
  "Salary": 95000.00,
  "CreatedAt": "2024-01-15T10:30:00Z",
  "LastModified": "2024-01-15T10:30:00Z",
  "Department@odata.navigationLink": "[https://api.example.com/odata/v4/Departments('ENG](https://api.example.com/odata/v4/Departments('ENG)')",
  "Manager@odata.navigationLink": "[https://api.example.com/odata/v4/Employees('E10001](https://api.example.com/odata/v4/Employees('E10001)')"
}
```

##### 6. Complete Response Example with Headers

**For POST (201 Created)**:
```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: [https://api.example.com/odata/v4/Employees('E12346](https://api.example.com/odata/v4/Employees('E12346)')
ETag: "abc123def456"
OData-Version: 4.0

{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Status": "ACTIVE",
  "Salary": 95000.00,
  "CreatedAt": "2024-01-15T10:30:00Z"
}
```

**For GET (200 OK)**:
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
  "Salary": 95000.00,
  "Status": "ACTIVE"
}
```

**For Error Response (400 Bad Request)**:
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "INVALID_DATA",
    "message": "Request body validation failed",
    "details": [
      {
        "field": "Email",
        "issue": "Email already exists",
        "value": "john.doe@company.com"
      },
      {
        "field": "Salary",
        "issue": "Minimum salary is 20000",
        "value": "15000"
      }
    ]
  }
}
```

#### Complete OData Operation Template Example

```markdown
### Create New Employee (POST)

Creates a new employee record in the system with provided information.
Automatically assigns unique employee ID and initializes default values
(status: ACTIVE, creation timestamp).

#### Usage

Use this operation when adding a new employee to the system. Required fields
include first name, last name, email, and department. Optional fields like
hire date and salary can be provided.

Key points:
- Automatically generates unique EmployeeID
- Email must be unique across system
- Returns created employee in response body (if Prefer header included)
- Triggers HR workflow notifications
- Related operations: PATCH for updates, GET for retrieval

#### Request

**URI**: POST /Employees

**Operation Type**: CRUD (Create)

**HTTP Method**: POST

**Required Permission**: ROLE_HR_MANAGER or ROLE_ADMIN

#### Request Headers

| Header Name | Required | Possible Values | Description |
|---|---|---|---|
| Authorization | Yes | `Bearer {token}` | OAuth2 authentication token required |
| Content-Type | Yes | `application/json` | Media type of request body |
| Accept | No | `application/json` | Preferred response format |
| Prefer | No | `return=representation` | Return created resource in response (optional) |

#### Request Parameters

**Request Body Parameters** (all in JSON body):

| Parameter Name | Requirement | Data Type | Description | Location |
|---|---|---|---|---|
| FirstName | Required | String | Employee's first name. Length: 1-50 characters | Body |
| LastName | Required | String | Employee's last name. Length: 1-50 characters | Body |
| Email | Required | String | Corporate email. Must be unique. Format: valid email address | Body |
| Department | Required | String | Department code. Example: "ENGINEERING" | Body |
| HireDate | Optional | Date | Hire date in YYYY-MM-DD format. Example: "2024-01-15" | Body |
| Salary | Optional | Decimal | Annual salary in USD. Minimum: 20000. Example: 95000.00 | Body |
| Status | Optional | String | Employment status. Default: "ACTIVE". Valid: "ACTIVE", "INACTIVE", "LEAVE" | Body |

#### Request Example

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

#### Response

**Response Headers**:

| Header Name | Description | Example Value |
|---|---|---|
| Content-Type | Response body media type | `application/json` |
| Location | URL of newly created employee | `[https://api.example.com/odata/v4/Employees('E12346](https://api.example.com/odata/v4/Employees('E12346)')` |
| ETag | Entity tag for caching/concurrency | `"abc123def456"` |
| OData-Version | OData protocol version | `4.0` |

**Status Codes**:

| Status Code | Description |
|---|---|
| 201 Created | Employee successfully created. Location header contains URL to new resource |
| 400 Bad Request | Validation failed. Email might already exist or missing required fields |
| 401 Unauthorized | Authentication token missing, invalid, or expired |
| 403 Forbidden | Insufficient permissions. Requires ROLE_HR_MANAGER or higher |
| 409 Conflict | Employee with email already exists in system |
| 500 Internal Server Error | Server error. Contact support if issue persists |

**Response Payload Example** (201 Created):

```json
{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Status": "ACTIVE",
  "Salary": 95000.00,
  "CreatedAt": "2024-01-15T10:30:00Z",
  "LastModified": "2024-01-15T10:30:00Z"
}
```

**Complete Response Example**:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: [https://api.example.com/odata/v4/Employees('E12346](https://api.example.com/odata/v4/Employees('E12346)')
ETag: "abc123def456"
OData-Version: 4.0

{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Department": "ENGINEERING",
  "HireDate": "2024-01-15",
  "Status": "ACTIVE",
  "Salary": 95000.00,
  "CreatedAt": "2024-01-15T10:30:00Z",
  "LastModified": "2024-01-15T10:30:00Z"
}
```

**Error Response Example** (400 Bad Request):

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_FAILED",
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
        "issue": "Salary must be at least 20000",
        "value": "15000"
      }
    ]
  }
}
```

**Error Response Example** (409 Conflict):

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "DUPLICATE_EMPLOYEE",
    "message": "Employee with email john.doe@company.com already exists",
    "details": {
      "existingEmployeeId": "E10001",
      "existingEmployeeName": "John Doe",
      "email": "john.doe@company.com"
    }
  }
}
```
```

#### OData Operation Template Checklist

- [ ] Title (operation type + resource + operation name)
- [ ] Introduction/description
- [ ] Usage section with key points
- [ ] Request URI (absolute or relative)
- [ ] Operation type (CRUD/Function/Action)
- [ ] HTTP method
- [ ] Required permissions
- [ ] Request headers table with requirement status
- [ ] Request parameters table with data type and location
- [ ] Complete request example with headers and body
- [ ] Response headers table
- [ ] Status codes with descriptions
- [ ] Response payload example (JSON structure)
- [ ] Complete response example with headers
- [ ] Error response example(s)

---

### OData API Templates - Usage Guidelines

#### Three-Level Organization

**Level 1 - Service Overview**:
- Use for overview of an entire OData service
- Contains service purpose, metadata, supported OData versions
- Lists all available resources with links
- Documents OData feature support matrix
- Appropriate for entire service documentation

**Level 2 - Resource Documentation**:
- Use for individual resources/entity sets within the service
- Contains resource-specific information
- Lists all operations on the resource (CRUD and custom)
- Links to detailed operation documentation
- Organizes navigation properties and relationships

**Level 3 - Operation Details**:
- Use for documenting single operations on resources
- Contains operation-specific request/response information
- Includes request parameters, headers, status codes
- Provides complete request/response examples
- Detailed error handling and edge cases

#### Best Practices for OData Templates

1. **Hierarchical Organization**
   - Structure documentation from broad service down to granular operations
   - Service overview → Resource → Operation
   - Each level references next through links
   - Users navigate from general to specific information

2. **Contextual Information at Each Level**

   **Service Level**:
   - Overall service purpose
   - Supported OData versions and features
   - Service metadata endpoint
   - Permissions required across service
   - Entity relationships and data model

   **Resource Level**:
   - Resource-specific permissions
   - All operations on resource (CRUD + custom)
   - Navigation properties
   - Links to detailed operation docs

   **Operation Level**:
   - Operation-specific details
   - Exact request/response format
   - Complete working examples
   - Error scenarios with examples

3. **Clear Cross-Linking**
   - Service overview links to resources
   - Resources link to operations
   - Operations link back to resources/service
   - Related operations cross-referenced

4. **Complete Filtering Examples**
   - Show $filter syntax examples
   - Document filter operators supported
   - Explain navigation expansion ($expand)
   - Demonstrate paging ($top, $skip)
   - Show property selection ($select)

5. **Navigation Property Documentation**
   - List all navigation properties per resource
   - Show how to expand relationships
   - Document related resources
   - Include examples of navigation URIs

6. **Consistent Terminology**
   - Use exact property names from metadata
   - Match terminology across levels
   - Explain OData-specific concepts
   - Define custom functions/actions clearly

7. **Real Working Examples**
   - Every operation should have working examples
   - Show request with headers and body
   - Include complete response with headers
   - Demonstrate error scenarios
   - Use realistic data matching property types

8. **Error Handling**
   - Document all possible status codes per operation
   - Provide context-specific error descriptions
   - Include error response examples
   - Explain how to handle and recover from errors

---

## TEMPLATE COMPARISON TABLE

### REST vs OData Structure

| Aspect | REST | OData |
|--------|------|-------|
| **Hierarchy** | 2 levels: Overview + Method | 3 levels: Service + Resource + Operation |
| **Entity Naming** | Plural (e.g., `/employees`) | Entity Set (e.g., `/Employees`) |
| **Documentation Structure** | Resource-focused | Service-focused with deep hierarchy |
| **Filtering** | Custom query parameters | Standardized OData $filter, $orderby |
| **Paging** | limit/offset or page params | $top, $skip parameters |
| **Selection** | Custom implementation | $select parameter (standard) |
| **Navigation** | Via nested endpoints | Via $expand property (standard) |
| **Metadata** | Optional, no standard location | Required at $metadata endpoint |
| **Status Code Usage** | Full range (2xx, 3xx, 4xx, 5xx) | Primarily 200, 201, 400, 401, 403, 404, 500 |
| **Best Use Case** | General-purpose APIs | Data-centric services and entity operations |
| **Version Support** | N/A | Multiple versions (2.0, 3.0, 4.0) |

### Template Requirements Comparison

| Requirement | REST Overview | REST Method | OData Service | OData Resource | OData Operation |
|---|---|---|---|---|---|
| Base URI | Required | Inherited | Required | Inherited | Inherited |
| Permissions | Required | Optional | Required | Required | Required |
| Status Codes | Complete list | Per-method | General list | General list | Per-operation |
| Parameters table | N/A | Required | N/A | N/A | Required |
| Examples | Optional | Highly recommended | N/A | Suggested | Required |
| Metadata reference | N/A | N/A | Required | Optional | N/A |
| Navigation info | N/A | N/A | Listed | Links table | References |
| OData features | N/A | N/A | Support matrix | N/A | N/A |

---

## BEST PRACTICES

### Documentation Quality Standards

1. **Completeness**
   - Document every method/operation
   - Include all status codes with context
   - Provide request and response examples
   - Explain error scenarios

2. **Clarity**
   - Use simple, direct language
   - Avoid technical jargon without explanation
   - Provide context for business logic
   - Explain constraints and limitations

3. **Consistency**
   - Follow template structure exactly
   - Use consistent terminology throughout
   - Maintain consistent formatting
   - Organize information predictably

4. **Accuracy**
   - Verify all examples work as documented
   - Keep parameter information current
   - Update when API behavior changes
   - Test scenarios before documenting

5. **Navigation**
   - Provide clear links between levels
   - Help users find related information
   - Cross-reference related operations
   - Use consistent anchor names

### Template Customization Guidelines

These are generic templates that should be customized:

1. **Remove Irrelevant Sections**
   - If API doesn't use authentication, simplify permission docs
   - If no custom headers, remove from template
   - If no custom functions/actions, remove from OData resource

2. **Add Missing Details**
   - Include any API-specific features
   - Add custom headers or parameters unique to your API
   - Document business rules specific to your service
   - Include rate limits, quotas, or special constraints

3. **Organize by Your Structure**
   - Group related methods logically
   - Use categories that match your service design
   - Include index/navigation appropriate for your docs
   - Reference your actual service endpoints

4. **Match Your Standards**
   - Use your company's style guide
   - Follow your documentation conventions
   - Match your existing documentation structure
   - Incorporate your terminology

### Common Pitfalls to Avoid

1. **Incomplete Examples**
   - Always include complete request with headers
   - Show both success and error responses
   - Use realistic, non-dummy data
   - Include actual status codes

2. **Generic Status Descriptions**
   - Not just "400 Bad Request"
   - Explain what was wrong with this operation
   - Provide guidance on how to fix
   - Use operation-specific context

3. **Missing Parameter Details**
   - Always include parameter location (Path/Query/Body)
   - Document constraints (min/max, format, valid values)
   - Explain defaults
   - Show example values

4. **Undocumented Relationships**
   - For OData: List all navigation properties
   - Show examples of navigation URIs
   - Explain cardinality (one-to-one, one-to-many)
   - Document expansion examples

5. **Unclear Permission Requirements**
   - Be specific about required roles
   - Explain why permission is needed
   - Note if different operations need different permissions
   - Provide guidance for permission assignment

6. **Missing Error Cases**
   - Document ALL possible error codes
   - Explain conditions that trigger each error
   - Provide examples of error responses
   - Explain how to handle and prevent errors

---

## COMPLETE WORKING EXAMPLES

### Complete REST API Documentation Example

**File**: employees-rest-api.md

```markdown
# Employees REST API

Complete REST API for managing employee records in the company system.

## Base Information

**Base URI**: `[https://api.example.com/v1/employees`](https://api.example.com/v1/employees`)

**Permissions**:
- Read: ROLE_HR_USER
- Write/Delete: ROLE_HR_MANAGER
- Admin: ROLE_ADMIN

## Methods

| HTTP Method | Action | URI |
|---|---|---|
| GET | [List Employees](#list-employees) | `/employees` |
| GET | [Get Employee](#get-employee) | `/employees/{employeeId}` |
| POST | [Create Employee](#create-employee) | `/employees` |
| PATCH | [Update Employee](#update-employee) | `/employees/{employeeId}` |
| DELETE | [Delete Employee](#delete-employee) | `/employees/{employeeId}` |

## Common Request Headers

| Header Name | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token. Format: `Authorization: Bearer {token}` |
| Content-Type | Yes | `application/json` |
| Accept | No | Preferred format. Default: `application/json` |

## Common Response Headers

| Header Name | Description |
|---|---|
| Content-Type | Always `application/json` |
| X-Total-Count | Total available records for paginated queries |
| ETag | Entity version for caching |

## Status Codes

| Status Code | Description |
|---|---|
| 200 OK | Success with response body |
| 201 Created | Resource created successfully |
| 204 No Content | Success without response body |
| 400 Bad Request | Invalid request format |
| 401 Unauthorized | Authentication required |
| 404 Not Found | Resource doesn't exist |
| 409 Conflict | Resource conflict (duplicate) |
| 500 Internal Server Error | Server error |

---

## List Employees

Returns paginated list of all employees.

GET /employees

### Parameters

| Name | Required | Type | Description | Location |
|---|---|---|---|---|
| limit | No | Integer | Results per page (1-100, default 20) | Query |
| offset | No | Integer | Records to skip (default 0) | Query |
| department | No | String | Filter by department code | Query |
| status | No | String | Filter by status (ACTIVE, INACTIVE, LEAVE) | Query |

### Request Example

```
GET /employees?limit=50&offset=0&status=ACTIVE HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json
X-Total-Count: 5000

{
  "employees": [
    {
      "employeeId": "E12345",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "department": "ENGINEERING",
      "status": "ACTIVE"
    },
    {
      "employeeId": "E12346",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "department": "SALES",
      "status": "ACTIVE"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 5000
  }
}
```

---

## Get Employee

Retrieves complete employee details by ID.

GET /employees/{employeeId}

### Parameters

| Name | Required | Type | Description | Location |
|---|---|---|---|---|
| employeeId | Yes | String | Employee ID (E[0-9]{5}) | Path |

### Request Example

```
GET /employees/E12345 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "department": "ENGINEERING",
  "jobTitle": "Senior Engineer",
  "hireDate": "2020-06-01",
  "salary": 120000,
  "status": "ACTIVE",
  "manager": {
    "employeeId": "E10001",
    "name": "Jane Smith"
  },
  "createdAt": "2020-06-01T09:00:00Z",
  "lastModified": "2024-01-15T14:30:00Z"
}
```

### Error Response (404 Not Found)

```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "NOT_FOUND",
    "message": "Employee E99999 not found"
  }
}
```

---

## Create Employee

Creates a new employee record.

POST /employees

### Parameters

| Name | Required | Type | Description | Location |
|---|---|---|---|---|
| firstName | Yes | String | First name (1-50 chars) | Body |
| lastName | Yes | String | Last name (1-50 chars) | Body |
| email | Yes | String | Unique email address | Body |
| department | Yes | String | Department code | Body |
| jobTitle | Yes | String | Job title | Body |
| hireDate | No | Date | Hire date (YYYY-MM-DD) | Body |
| salary | No | Decimal | Annual salary (min: 20000) | Body |

### Request Example

```
POST /employees HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "firstName": "Michael",
  "lastName": "Johnson",
  "email": "michael@example.com",
  "department": "SALES",
  "jobTitle": "Sales Manager",
  "hireDate": "2024-01-15",
  "salary": 95000
}
```

### Response

```
HTTP/1.1 201 Created
Content-Type: application/json
Location: [https://api.example.com/v1/employees/E12347](https://api.example.com/v1/employees/E12347)

{
  "employeeId": "E12347",
  "firstName": "Michael",
  "lastName": "Johnson",
  "email": "michael@example.com",
  "department": "SALES",
  "jobTitle": "Sales Manager",
  "hireDate": "2024-01-15",
  "salary": 95000,
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Error Response (409 Conflict)

```
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "DUPLICATE_EMAIL",
    "message": "Email already exists",
    "details": {
      "email": "michael@example.com",
      "existingEmployeeId": "E10001"
    }
  }
}
```

---

## Update Employee

Updates employee information (partial update).

PATCH /employees/{employeeId}

### Parameters

| Name | Required | Type | Description | Location |
|---|---|---|---|---|
| employeeId | Yes | String | Employee ID | Path |
| Any field | No | Various | Fields to update (firstName, lastName, department, etc) | Body |

### Request Example

```
PATCH /employees/E12345 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "department": "SALES",
  "jobTitle": "Sales Director",
  "salary": 130000
}
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "employeeId": "E12345",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "department": "SALES",
  "jobTitle": "Sales Director",
  "salary": 130000,
  "status": "ACTIVE",
  "lastModified": "2024-01-20T15:45:00Z"
}
```

---

## Delete Employee

Marks employee as inactive (soft delete).

DELETE /employees/{employeeId}

### Parameters

| Name | Required | Type | Description | Location |
|---|---|---|---|---|
| employeeId | Yes | String | Employee ID | Path |

### Request Example

```
DELETE /employees/E12346 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response

```
HTTP/1.1 204 No Content
```

### Error Response (403 Forbidden)

```
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": {
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Only admins can delete employees",
    "requiredRole": "ROLE_ADMIN",
    "yourRole": "ROLE_HR_MANAGER"
  }
}
```
```

### Complete OData API Documentation Example

**File**: employees-odata-service.md

```markdown
# Employees OData Service

Comprehensive OData v4 service for employee data management.

## Overview

**OData Version**: 4.0

**Root URI**: `[https://api.example.com/odata/v4`](https://api.example.com/odata/v4`)

**Permissions**:
- Read: ROLE_HR_USER
- Write: ROLE_HR_MANAGER
- Admin: ROLE_ADMIN

## OData Features

| Feature | Supported | Notes |
|---|---|---|
| $filter | Yes | All comparison operators |
| $orderby | Yes | Single and multi-field |
| $top/$skip | Yes | Max 1000 per request |
| $select | Yes | Choose specific properties |
| $expand | Yes | Limited to 3 levels |
| $count | Yes | Get total count |

## Entity Data Model

**Employees**: Employee personal and employment data
**Departments**: Organization structure
**Compensation**: Salary and benefits

## Resources

| Resource | Description | Path |
|---|---|---|
| [Employees](#employees-resource) | All employees | `/Employees` |
| [Departments](#departments-resource) | Organization | `/Departments` |

---

## Employees Resource

Collection of all employees.

### Resource Information

**Path**: `/Employees`

**Key**: EmployeeID

**Permissions**:
- Read: ROLE_HR_USER
- Write: ROLE_HR_MANAGER

### Operations

| Method | Action | URI |
|---|---|---|
| GET | Query all | `/Employees` |
| GET | Get one | `/Employees('E12345')` |
| POST | Create | `/Employees` |
| PATCH | Update | `/Employees('E12345')` |
| DELETE | Delete | `/Employees('E12345')` |

### Examples

#### Query employees:

```
GET /Employees?$filter=Status eq 'ACTIVE'&$orderby=LastName HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}

Response (200 OK):
{
  "value": [
    {
      "EmployeeID": "E12345",
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "john@example.com",
      "Status": "ACTIVE"
    }
  ]
}
```

#### Create employee:

```
POST /Employees HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json
Prefer: return=representation

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john@example.com",
  "Department": "ENGINEERING"
}

Response (201 Created):
{
  "EmployeeID": "E12346",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john@example.com",
  "Department": "ENGINEERING",
  "Status": "ACTIVE",
  "CreatedAt": "2024-01-15T10:30:00Z"
}
```

#### Update employee:

```
PATCH /Employees('E12345') HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "Department": "SALES"
}

Response (204 No Content):
```
```

---

## FIELD-BY-FIELD REQUIREMENTS

### REST API Overview Template Fields

| Field | Required | Type | Notes |
|---|---|---|---|
| Title | Yes | String | API name |
| Introduction | Yes | String | Brief description |
| Base URI | Yes | String | Absolute endpoint URL |
| Permissions | Yes | List | Required roles/permissions |
| Methods Table | Yes | Table | All HTTP methods + URIs |
| Request Headers Table | Conditional | Table | Document if headers used |
| Response Headers Table | Conditional | Table | Document if headers returned |
| Status Codes Table | Yes | Table | All possible response codes |

### REST API Method Template Fields

| Field | Required | Type | Notes |
|---|---|---|---|
| Title | Yes | String | Action + Resource |
| Introduction | Yes | String | What method does |
| Usage | Yes | String | When/why to use |
| HTTP Method | Yes | Enum | GET, POST, PUT, PATCH, DELETE |
| URI Path | Yes | String | Relative or absolute |
| Permission | Yes | String | Required role |
| Parameters Table | Conditional | Table | If parameters exist |
| Request Example | Yes | Code Block | Complete with headers |
| Status Codes | Yes | Table | Per-method codes |
| Response Body | Yes | JSON/Code | Example response |
| Response Example | Yes | Code Block | Full response with headers |
| Error Examples | Yes | Code Block | At least one error case |

### OData Service Overview Template Fields

| Field | Required | Type | Notes |
|---|---|---|---|
| Title | Yes | String | Service name |
| Introduction | Yes | String | Service purpose |
| OData Version | Yes | String | 2.0, 3.0, or 4.0 |
| Root URI | Yes | String | Service endpoint |
| Permissions | Yes | List | Required roles |
| Feature Support Matrix | Yes | Table | Supported OData features |
| Entity Data Model | Yes | Description/Diagram | Data structure |
| Service Metadata URI | Yes | String | $metadata endpoint |
| Resources Table | Yes | Table | Available entity sets |

### OData Resource Template Fields

| Field | Required | Type | Notes |
|---|---|---|---|
| Title | Yes | String | Resource name |
| Introduction | Yes | String | Resource purpose |
| Resource Path | Yes | String | Entity set path |
| Absolute URI | Yes | String | Complete endpoint |
| Key Property | Yes | String | Identifier property |
| Permissions | Yes | List | Per-operation permissions |
| CRUD Operations Table | Yes | Table | GET, POST, PUT, PATCH, DELETE |
| Navigation Properties | Conditional | Table | If applicable |
| Custom Operations | Conditional | Table | Functions/Actions |
| Common Headers | Yes | Table | Request/response headers |
| Status Codes | Yes | Table | All possible codes |

### OData Operation Template Fields

| Field | Required | Type | Notes |
|---|---|---|---|
| Title | Yes | String | Operation name + type |
| Introduction | Yes | String | Operation purpose |
| Description | Yes | String | When/why to use |
| URI | Yes | String | Full operation path |
| Operation Type | Yes | Enum | CRUD, Function, Action |
| HTTP Method | Yes | Enum | GET, POST, PUT, PATCH, DELETE |
| Permission | Yes | String | Required role |
| Request Headers | Yes | Table | All headers |
| Request Parameters | Yes | Table | With location info |
| Request Example | Yes | Code Block | Complete HTTP request |
| Response Headers | Yes | Table | Response headers |
| Status Codes | Yes | Table | Per-operation codes |
| Response Body | Yes | JSON | Example response data |
| Response Example | Yes | Code Block | Full response with headers |
| Error Examples | Conditional | Code Block | Common error cases |

---

## HIERARCHICAL LINKING GUIDANCE

### REST API Linking Strategy

**Level 1 (Overview) → Level 2 (Methods)**

In Overview document:
```markdown
## Methods

| HTTP Method | Action | URI |
|---|---|---|
| GET | [List all employees](#list-employees) | `/employees` |
| GET | [Get employee by ID](#get-employee-by-id) | `/employees/{employeeId}` |
| POST | [Create employee](#create-employee) | `/employees` |
| PATCH | [Update employee](#update-employee) | `/employees/{employeeId}` |
| DELETE | [Delete employee](#delete-employee) | `/employees/{employeeId}` |
```

In Method documents (Level 2):
```markdown
## Update Employee

*See parent documentation*: [Employees REST API](#employees-rest-api)

*Related methods*:
- [Get Employee](#get-employee)
- [List Employees](#list-employees)
```

### OData Linking Strategy

**Level 1 (Service) → Level 2 (Resources) → Level 3 (Operations)**

In Service Overview (Level 1):
```markdown
## Resources

| Resource Name | Description | Path |
|---|---|---|
| [Employees](#employees-resource) | All employees | `/Employees` |
| [Departments](#departments-resource) | Departments | `/Departments` |
```

In Resource Document (Level 2):
```markdown
## Employees Resource

*Parent*: [Employees OData Service](#employees-odata-service)

### Operations

| Method | Operation | URI |
|---|---|---|
| GET | [Query all](#odata-operation-query-employees) | `/Employees` |
| POST | [Create](#odata-operation-create-employee) | `/Employees` |
```

In Operation Document (Level 3):
```markdown
## Create Employee (POST)

**Resource**: [Employees](#employees-resource)

**Service**: [Employees OData Service](#employees-odata-service)

**Related Operations**:
- [Query Employees](#operation-query-employees)
- [Get Employee](#operation-get-single-employee)
- [Update Employee](#operation-update-employee)
```

### Anchor Naming Conventions

**For Consistency and Reliability:**

- REST Overview: `#rest-api-[resource-name]`
  - Example: `#rest-api-employees`

- REST Methods: `#[verb]-[resource]` or `#[operation-name]`
  - Example: `#list-employees`, `#create-employee`, `#get-employee-by-id`

- OData Service: `#odata-service-[service-name]`
  - Example: `#odata-service-employees`

- OData Resource: `#odata-resource-[resource-name]`
  - Example: `#odata-resource-employees`

- OData Operation: `#odata-operation-[action]`
  - Example: `#odata-operation-create-employee`, `#odata-operation-query-employees`

### Cross-Document Linking

**When Documentation Spans Multiple Files:**

Use absolute paths:
```markdown
See \[Employees REST API](../rest-apis/employees.md#rest-api-employees)
for complete REST method documentation.
```

Or use markdown anchor syntax:
```markdown
See \[Employees REST API](rest-apis/employees.md) for complete REST documentation.
```

---

## REFERENCES & OFFICIAL STANDARDS

**Official SAP API Style Guide Section 50**:
[https://github.com/SAP-docs/api-style-guide/tree/main/docs/50-manually-written-rest-and-odata](https://github.com/SAP-docs/api-style-guide/tree/main/docs/50-manually-written-rest-and-odata)

**Individual Files Consolidated:**
1. manually-written-rest-and-odata-api-reference-49b7204.md - Overview
2. rest-api-overview-template-e888f14.md - REST Level 1 Template
3. rest-api-method-template-d48b7e8.md - REST Level 2 Template
4. using-rest-api-templates-b393567.md - REST Usage Guidelines
5. odata-service-overview-template-d47f0cb.md - OData Level 1 Template
6. odata-resource-template-745fbaa.md - OData Level 2 Template
7. odata-operation-template-d7d9b26.md - OData Level 3 Template
8. using-odata-api-templates-49a7cd7.md - OData Usage Guidelines

**Related SAP Documentation**:
- [Section 30 - REST and OData API Documentation](https://github.com/SAP-docs/api-style-guide/tree/main/docs/30-rest-and-odata-api-documentation)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OData Specification](https://www.odata.org/documentation/)
- [SAP API Business Hub](https://api.sap.com/)

**Last Verified**: 2025-11-21

**Compliance**: Follows official SAP API Style Guide standards for manual REST and OData API documentation

---

**End of Manual REST and OData API Documentation Templates Guide**
