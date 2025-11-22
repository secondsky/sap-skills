# REST and OData API Documentation Guide

**Attribution & License**:
- **Upstream Source**: [SAP API Style Guide](https://github.com/SAP-docs/api-style-guide)
- **Source Commit**: main branch as of 2025-11-21
- **Upstream License**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Creative Commons Attribution 4.0 International - permits sharing and adaptation with attribution)
- **Content Usage**: Core documentation and examples are derived from the upstream repository. Material has been consolidated from multiple files (section 30), reorganized for progressive disclosure architecture, and enhanced with additional examples and cross-references for Claude Code skill usage.

**Source**: https://github.com/SAP-docs/api-style-guide/tree/main/docs/30-rest-and-odata-api-documentation

**Last Verified**: 2025-11-21

**Comprehensive Reference**: All 12 markdown files from section 30 consolidated and organized

---

## TABLE OF CONTENTS

1. [Overview of REST and OData APIs](#overview-of-rest-and-odata-apis)
2. [SAP API Business Hub Documentation Requirements](#sap-api-business-hub-documentation-requirements)
3. [General Guidelines for Descriptions](#general-guidelines-for-descriptions)
4. [Package Descriptions](#package-descriptions)
5. [API Details (OpenAPI Info Object)](#api-details-openapi-info-object)
6. [Operations Documentation](#operations-documentation)
7. [Parameters Documentation](#parameters-documentation)
8. [Responses Documentation](#responses-documentation)
9. [Components and Definitions](#components-and-definitions)
10. [Security Schemes](#security-schemes)
11. [Tags](#tags)
12. [External Documentation](#external-documentation)
13. [Complete Examples](#complete-examples)
14. [Best Practices Summary](#best-practices-summary)
15. [Character Limit Reference Table](#character-limit-reference-table)
16. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## OVERVIEW OF REST AND OData APIs

### What Are REST APIs?

**REST (Representational State Transfer)** is an architectural style for building web services that enables:
- Cross-platform CRUD (Create, Read, Update, Delete) operations over HTTP
- Stateless client-server communication
- Resource-oriented design using URIs
- Standard HTTP methods (GET, POST, PUT, DELETE, PATCH)

**Key Characteristics**:
- Resources represented as URIs (e.g., `/users`, `/orders/{orderID}`)
- Stateless interactions
- HTTP methods define operations
- JSON or XML as primary data formats
- Standard HTTP status codes for responses

### What Are OData APIs?

**OData (Open Data Protocol)** is a RESTful web protocol for querying and updating data with:
- Standardized query syntax for filtering, sorting, and paging
- Consistent metadata structure
- Support for complex operations
- Strong typing and validation
- Three major versions: v2.0, v3.0, v4.01

**Key Characteristics**:
- Metadata-driven architecture
- Query language for complex data operations
- CRUD operations over HTTP
- Standard status codes and error handling
- EDM (Entity Data Model) for type definitions

### Documentation Approaches

| Aspect | REST | OData |
|--------|------|-------|
| **Specification Standard** | OpenAPI 3.0.3 (Swagger) | OData Specification (OASIS) |
| **Data Format** | JSON, XML | JSON, XML |
| **Query Language** | Custom parameters | OData Query Language |
| **Metadata** | OpenAPI Schema | OData EDM |
| **Versioning** | Via URL path or header | Via URL path or OData version |
| **Primary Use** | General-purpose APIs | Data-centric APIs |

### Documentation Standards Source

Both REST and OData APIs in SAP systems follow the official **SAP API Style Guide** standards:

**Repository**: https://github.com/SAP-docs/api-style-guide/tree/main/docs/30-rest-and-odata-api-documentation

**Key Files**:
- REST/OData API Documentation Overview
- OpenAPI Specification Guidelines
- SAP API Business Hub Requirements
- Naming Conventions

---

## SAP API BUSINESS HUB DOCUMENTATION REQUIREMENTS

### What Is SAP API Business Hub?

**SAP API Business Hub** (https://api.sap.com/) is the central platform for discovering, exploring, and consuming SAP APIs. It serves as the primary documentation and distribution channel for SAP's REST and OData APIs.

### Hub-Specific Requirements

#### Package Information

Packages are the top-level organizational unit in the SAP API Business Hub.

**Required Elements**:

1. **Package Title**
   - Reflects the product or product line
   - Proper capitalization with meaningful words
   - Include development phase if applicable: "(Alpha)", "(Beta)"
   - Examples:
     - "SAP SuccessFactors Employee Central"
     - "SAP Concur Expense (Beta)"
     - "SAP S/4HANA Cloud – Purchase Requisition API"

2. **Short Description**
   - Maximum: **250 characters** (excluding spaces)
   - Begins with **imperative verb**: "Create", "Build", "Manage", "Configure", "Query"
   - No period at the end
   - Must be distinct from title and unique among packages
   - Clear and benefit-focused language
   - Examples:
     - "Create, read, and update employees in the Employee Central system" (66 chars)
     - "Manage expense reports, receipts, and reimbursements in Concur" (63 chars)

3. **Overview Description**
   - 2-3 sentences providing deeper context
   - Addresses customers directly: "Use this package to...", "Integrate your application..."
   - Explains what the package enables
   - No Markdown formatting currently supported
   - Line breaks use `\n` escape sequence
   - Examples:
     - "Use this package to query and manage employee data in your HR systems. The API provides comprehensive access to employee records, benefits, and organizational structures. Integration with your custom applications enables real-time HR data synchronization."

4. **Target Users/Use Cases**
   - HR: "Human Resources departments managing employee lifecycle"
   - Finance: "Finance teams automating expense management"
   - Integration: "Systems integrators building HR-centric solutions"

### API Business Hub Metadata Fields

#### In OpenAPI Specification

**Supported Fields**:

```yaml
info:
  title: "API Name"                        # max 80 chars
  version: "1.0.0"
  x-sap-shortText: "High-level description"  # max 180 chars
  description: "Long description"         # 1-2 sentences
  x-sap-stateInfo:                        # For deprecated APIs
    state: "active|deprecated|decommissioned|beta"
    deprecationDate: "2024-01-15"
    successorApi: "NewAPIName"
```

**Custom Extensions**:
- `x-sap-shortText`: Brief description for catalog display (max 180 chars)
- `x-sap-stateInfo`: Lifecycle state information
- `x-sap-extensible`: Flag indicating extensibility
- `x-sap-apiType`: "REST" or "OData"

### Publishing Workflow

1. **Prepare Documentation**
   - Complete OpenAPI specification with all required fields
   - Create package metadata
   - Write descriptions following guidelines

2. **Submit to Business Hub**
   - Package structure validated
   - API specifications reviewed
   - Business metadata processed

3. **Quality Review**
   - User Assistance (UA) reviews all descriptions
   - Terminology consistency checked
   - Documentation completeness verified

4. **Publication**
   - APIs appear in searchable catalog
   - Documentation accessible to developers
   - Links and examples functional

---

## GENERAL GUIDELINES FOR DESCRIPTIONS

### Core Principles

#### 1. Clarity and Conciseness

**Principle**: Descriptions must be clear, precise, and free of jargon.

- Use simple, direct language
- Avoid technical acronyms unless necessary
- Define unfamiliar terms
- Use active voice where appropriate
- Keep sentences relatively short

**Avoid**:
- ❌ "The ephemeral context datum manifests transient materialization paradigms"
- ✅ "Temporary data that doesn't persist after the request"

#### 2. Correct Spelling and Grammar

**Requirements**:
- Use American English spelling (e.g., "color", not "colour")
- Check for grammar errors
- Maintain consistent terminology across API
- Spell out acronyms on first use: "REST (Representational State Transfer)"

**Tools**:
- Spell checkers
- Grammar checkers (Grammarly, built-in IDE tools)
- Consistency checkers

#### 3. Formatting Standards

**Capitalization**:
- Start sentences with capital letters
- End sentences with periods
- Proper nouns always capitalized
- "API", "HTTP", "REST", "OData" in all caps

**Formatting Examples**:
- ✅ "Retrieves the user profile. Maximum request timeout is 30 seconds."
- ❌ "retrieves the user profile. maximum request timeout is 30 seconds."

#### 4. Imperative vs. Descriptive Language

**Imperative Form** (for operations):
- Start with action verb in third-person singular
- Examples: "Creates a new order", "Retrieves employee data", "Updates the configuration"
- Avoid: "This operation creates..." or "The API creates..."

**Descriptive Form** (for data types, properties):
- Use noun phrases
- Examples: "The unique order identifier", "User email address", "Product inventory count"

### Description Length Guidelines

| Element | Recommended | Maximum | Notes |
|---------|-------------|---------|-------|
| API Title | 50-80 chars | 80 | Should fit single line in most contexts |
| x-sap-shortText | 100-180 chars | 180 | High-level overview for catalog |
| Operation Summary | 50-150 chars | 255 | Appears in quick reference |
| Operation Description | 100-300 chars | No limit | Additional context beyond summary |
| Parameter Description | 30-100 chars | No limit | Concise explanation of purpose |
| Response Description | 50-150 chars | No limit | Context-specific outcome description |
| Component Description | 50-200 chars | No limit | Data structure explanation |

### Common Description Patterns

#### For Operations (HTTP Endpoints)

**Pattern 1: Simple CRUD Operation**
```
Summary: "Retrieves a single user by ID"
Description: "Fetches complete user profile information including contact details, preferences, and account status."
```

**Pattern 2: Complex Operation**
```
Summary: "Searches for orders with advanced filtering"
Description: "Executes a search query returning orders matching specified criteria. Supports filtering by date range, status, customer, and amount. Results paginated with configurable page size."
```

**Pattern 3: Action/Function**
```
Summary: "Approves a pending document"
Description: "Changes document status from pending to approved and notifies relevant stakeholders. Requires manager-level permissions."
```

#### For Parameters

**Pattern 1: Simple Parameter**
```
"userId": "The unique identifier of the user"
```

**Pattern 2: Parameter with Constraints**
```
"pageSize": "Maximum number of results per page (minimum: 1, maximum: 100, default: 20)"
```

**Pattern 3: Optional Parameter**
```
"includeDetails": "If true, includes detailed breakdown; if false, returns summary only (optional, defaults to false)"
```

#### For Responses

**Pattern 1: Success Response**
```
"200 OK": "Order successfully created. Returns the new order with assigned ID and creation timestamp."
```

**Pattern 2: Error Response - Generic**
```
"400 Bad Request": "Invalid request format or missing required fields. Check error details for specific violations."
```

**Pattern 3: Error Response - Context-Specific**
```
"409 Conflict": "Cannot process order because inventory for product is insufficient. Current stock: 5 units, requested: 10 units."
```

---

## PACKAGE DESCRIPTIONS

### Package-Level Documentation Structure

#### Layer 1: Package Title

**Purpose**: High-level identification in SAP API Business Hub catalog

**Requirements**:
- Reflects product or service line
- Proper capitalization
- Concise but descriptive
- Include version or phase identifier if applicable

**Examples**:
- "SAP SuccessFactors Learning Management"
- "SAP Concur Expense Management API (v2.1)"
- "SAP Cloud Application Programming Model (CAP) Services"
- "SAP S/4HANA Cloud – Materials Management (Beta)"

**Prohibited Elements**:
- ❌ "API" or "REST API" in title
- ❌ "SAP" prefix when redundant with context
- ❌ Technical specifications (e.g., "OpenAPI 3.0.3")
- ❌ Version in standard semantic format alone

#### Layer 2: Short Description

**Purpose**: Catalog display, search results, quick overview

**Specifications**:
- Maximum: **250 characters** (not counting spaces)
- Begins with imperative verb
- No period at end
- Unique across package catalog
- Benefit-focused

**Verb Selection**:

| Use Case | Verbs | Examples |
|----------|-------|----------|
| Data Management | Create, Read, Update, Delete, Manage, Query | "Manage employee records and benefits" |
| Integration | Integrate, Connect, Synchronize, Link | "Integrate your expense system with Cloud Concur" |
| Configuration | Configure, Set up, Establish, Define | "Configure your HR system organization structure" |
| Reporting | Generate, Create, Build, Report | "Generate financial reports and analysis" |
| Process | Execute, Process, Perform, Automate | "Automate purchase order workflows" |

**Examples**:

```
Package: SAP SuccessFactors Employee Central
Short: "Create, update, and query employee records including personal information, assignments, and compensation data"
(Chars: 119)

Package: SAP Concur Travel
Short: "Manage travel requests, bookings, and expenses with policy compliance and approval workflows"
(Chars: 92)

Package: SAP Business Technology Platform – Cloud Integration
Short: "Build integration scenarios connecting cloud and on-premise applications with monitoring and message processing"
(Chars: 109)
```

#### Layer 3: Overview Description

**Purpose**: Detailed context for package understanding

**Specifications**:
- 2-3 sentences
- Addresses customer audience directly
- Explains capabilities and benefits
- Uses `\n` for line breaks (not Markdown)
- Provides use case context

**Structure Pattern**:
```
Sentence 1: What the package enables
Sentence 2: Primary capabilities and features
Sentence 3: Key benefits or integration possibilities
```

**Example**:

```
Package: SAP Cloud Application Programming Model (CAP)

Overview Description:
"Use this package to build cloud-native applications with a streamlined development model.
CAP provides a unified programming model for Node.js and Java, database abstraction, and built-in enterprise features like authentication and authorization.
Integrate with SAP S/4HANA, Fiori elements, and third-party systems while maintaining productivity and scalability."

(With literal \n line breaks in metadata)
```

#### Layer 4: Categorization and Keywords

**Purpose**: Discoverability and searchability

**Categories**:
- Solution area (e.g., "Human Capital Management", "Finance")
- API type (e.g., "REST", "OData")
- Integration type (e.g., "Cloud", "On-Premise", "Hybrid")
- Industry vertical (if applicable)

**Keywords** (for internal tagging):
- Primary domain: "Employee Management", "Expense Management", "Integration"
- Technical tags: "REST", "OData", "JSON", "XML"
- Use case tags: "CRUD Operations", "Query-Heavy", "Real-Time Sync"
- Audience tags: "Enterprise", "ISV", "Integration"

### Complete Package Documentation Template

```yaml
info:
  title: "SAP [Product Name]"
  version: "1.0.0"

x-sap-package:
  title: "SAP [Product Name]"
  shortDescription: "[Imperative verb] [main capability] and [secondary capability]
                    with [key feature]. (max 250 chars)"
  overviewDescription: |
    Use this package to [main benefit]. [Product Name] enables [primary capabilities].
    [Integration possibilities and key advantages].

  categories:
    - solutionArea: "Human Capital Management"
    - apiType: "REST"
    - deploymentMode: "Cloud"

  keywords:
    - "Employee Management"
    - "REST API"
    - "CRUD Operations"
    - "Real-Time Synchronization"
```

---

## API DETAILS (OPENAPI INFO OBJECT)

### OpenAPI Info Object Structure

The `info` object in OpenAPI 3.0.3 specification defines metadata about the API itself.

#### Required Fields

##### 1. Title

**Field**: `title`

**Purpose**: Official name of the API

**Specifications**:
- Maximum: **80 characters**
- Required field
- Appears in documentation headers and catalog
- Distinct from package title
- Does not include "API" suffix (implied)

**Naming Rules**:
- Use natural language
- Capitalize main words
- Exclude technical specifications
- Exclude "SAP" prefix if redundant
- Exclude REST/OData/API type indicators

**Examples**:

| Good | Avoid |
|------|-------|
| "Employee Central" | "SAP EC API" |
| "Purchase Order Management" | "Purchase Order REST API" |
| "Document Approval" | "Document Approval OpenAPI 3.0.3" |
| "Flight Search" | "Flights-Booking-API-v2" |
| "Travel Request" | "SAP Travel Request API (REST)" |

**Character Count Check**:
```
"Employee Central" = 17 characters (GOOD)
"Document Management System Integration API" = 43 characters (GOOD)
"SAP SuccessFactors Employee Central Human Resources System Integration Platform" = 78 characters (ACCEPTABLE)
```

##### 2. Version

**Field**: `version`

**Purpose**: API version number

**Specifications**:
- Follows semantic versioning: `MAJOR.MINOR.PATCH`
- Examples: `1.0.0`, `2.3.1`, `1.5.0-beta`
- Changes with API updates and breaking changes

**Versioning Strategy**:

| Version Change | Scenario | Update |
|----------------|----------|--------|
| MAJOR | Breaking changes to API contract | `1.0.0` → `2.0.0` |
| MINOR | New functionality (backward compatible) | `1.0.0` → `1.1.0` |
| PATCH | Bug fixes (backward compatible) | `1.0.0` → `1.0.1` |

**Examples**:
```yaml
version: "1.0.0"        # Initial release
version: "1.1.0"        # Added new endpoints
version: "1.1.1"        # Fixed validation bug
version: "2.0.0"        # Major revision with breaking changes
```

#### Optional but Highly Recommended Fields

##### 3. x-sap-shortText

**Field**: `x-sap-shortText`

**Purpose**: High-level, concise API description for SAP API Business Hub display

**Specifications**:
- Maximum: **180 characters**
- SAP-specific extension (custom field)
- Appears in catalog search results
- Distinct from overview description
- Action-oriented language

**Guidelines**:
- Starts with strong action verb or noun phrase
- Communicates primary use case
- Accessible to business and technical audiences
- No technical jargon unless universal

**Examples**:

```
API: Employee Central
x-sap-shortText: "Query and manage employee master data, assignments, and compensation information"
(Chars: 82)

API: Expense Report
x-sap-shortText: "Create, submit, and approve employee expense reports with real-time policy validation"
(Chars: 88)

API: Travel Request
x-sap-shortText: "Manage business travel requests and integrate with external travel reservation systems"
(Chars: 84)
```

##### 4. Description

**Field**: `description`

**Purpose**: Detailed explanation of API purpose and scope

**Specifications**:
- 1-2 sentences maximum
- Provides context beyond short text
- Explains primary use case
- Can reference external documentation
- May include Markdown formatting

**Writing Pattern**:
```
"[API Purpose]. [Primary Capabilities and Integration Points]."

Example:
"This API enables human resource management systems to query and modify employee master data.
It provides access to personal information, organizational assignments, compensation, and benefits data with real-time synchronization."
```

**Examples**:

```yaml
description: |
  Provides query and modification capabilities for employee
  master data in SAP SuccessFactors. Supports synchronization
  with external HRIS systems and talent management applications.

description: |
  Manages purchase order creation, modification, and tracking
  for SAP S/4HANA procurement. Enables integration with supplier
  systems and logistics providers for real-time order visibility.
```

#### Lifecycle and State Information

##### 5. x-sap-stateInfo

**Field**: `x-sap-stateInfo`

**Purpose**: Indicates API lifecycle state (for deprecated APIs)

**Structure**:
```yaml
x-sap-stateInfo:
  state: "active|beta|deprecated|decommissioned"
  deprecationDate: "YYYY-MM-DD"
  successorApi: "NewAPIName"
  plannedDecommissionDate: "YYYY-MM-DD"
  moreInformation: "https://help.sap.com/..."
```

**State Values**:

| State | Meaning | Support | Timeline |
|-------|---------|---------|----------|
| `active` | Fully supported, production-ready | Full | Ongoing |
| `beta` | Pre-release, may have breaking changes | Limited | Until stable release |
| `deprecated` | Supported but will be removed | Full | Minimum 12 months |
| `decommissioned` | No longer supported | None | Historical reference only |

**Usage**:

```yaml
# Active API (default)
x-sap-stateInfo:
  state: "active"

# Beta API
x-sap-stateInfo:
  state: "beta"
  moreInformation: "https://api.sap.com/feedback/employee-central-v2"

# Deprecated API
x-sap-stateInfo:
  state: "deprecated"
  deprecationDate: "2024-01-15"
  successorApi: "Employee Central v2"
  plannedDecommissionDate: "2025-01-15"
  moreInformation: "https://help.sap.com/migration-guide"
```

#### Complete Info Object Example

```yaml
openapi: 3.0.3
info:
  title: "Employee Central"
  version: "1.5.3"
  x-sap-shortText: "Query and manage employee master data, assignments, and compensation"
  description: |
    This API provides comprehensive access to employee master data in
    SAP SuccessFactors Employee Central. It enables creation, retrieval,
    and modification of employee records with support for organizational
    assignments, compensation details, and benefit information.

  contact:
    name: "SAP SuccessFactors Support"
    url: "https://help.sap.com/successfactors"
    email: "support@sap.com"

  license:
    name: "SAP Developer License"
    url: "https://www.sap.com/legal"

  x-sap-stateInfo:
    state: "active"
```

---

## OPERATIONS DOCUMENTATION

### What Are Operations?

**Operations** are HTTP methods applied to API endpoints that define specific actions:
- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Replace existing data
- **PATCH**: Partially update data
- **DELETE**: Remove data

Each operation requires documentation explaining its purpose, parameters, and responses.

### Operation-Level Documentation

#### Required Elements

##### 1. Operation Summary

**Field**: `summary`

**Purpose**: One-line description appearing in API reference view

**Specifications**:
- Maximum: **255 characters**
- Required for all operations
- Clear action-oriented language
- Appears in operation list/index
- Sufficient to understand operation alone

**Guidelines**:
- Starts with action verb (Gets, Creates, Updates, Deletes, Searches)
- Includes primary object and action
- Avoids repetition of path/method
- No period at end (optional but preferred)
- No second-person language

**Examples**:

```
GET /employees/{id}
Summary: "Retrieve a single employee by ID"

POST /employees
Summary: "Create a new employee record"

PATCH /employees/{id}
Summary: "Update specific employee fields"

DELETE /employees/{id}
Summary: "Delete an employee record"

POST /employees/search
Summary: "Search employees by multiple criteria"
```

##### 2. Operation Description

**Field**: `description`

**Purpose**: Supplementary details beyond summary

**Specifications**:
- Only include if additional context needed
- 1-3 sentences maximum
- Omit if summary sufficient
- Markdown formatting supported
- Provide business context or technical constraints

**Guidelines**:
- Begins with action verb (direct third-person form)
- **Avoid**: "This operation...", "This method...", "The API..."
- Explains special behaviors or side effects
- Mentions business constraints or prerequisites
- References related operations if helpful
- Explains pagination or filtering logic (if not in parameters)

**Examples**:

```
GET /employees/{id}
Description: (omit - summary sufficient)

POST /employees
Description: "Triggers automatic workflow notifications to
             manager and HR department. Returns 201 Created
             with Location header pointing to new resource."

PATCH /employees/{id}
Description: "Only updates fields specified in request body.
             Omitted fields remain unchanged. Requires manager
             approval for salary changes."

POST /employees/search
Description: "Supports complex filtering with operators.
             Results automatically sorted by match relevance.
             Maximum 10,000 results per request."
```

### Operation Structure in OpenAPI

```yaml
paths:
  /employees:
    post:
      summary: "Create a new employee record"
      description: |
        Creates a new employee in the system. Automatically
        assigns employee ID and sends notification to HR.
        Requires valid company and department codes.

      operationId: "createEmployee"
      tags:
        - "Employees"

      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Employee"

      responses:
        '201':
          description: "Employee successfully created"
        '400':
          description: "Invalid employee data"
        '409':
          description: "Employee already exists"
```

### Different Operation Types

#### Read Operations (GET)

**Summary Pattern**:
```
"Retrieve [resource]"
"Get [resource]"
"List [resources]"
"Search [resources]"
```

**Examples**:
- "Retrieve a single employee by ID"
- "List all open purchase orders"
- "Search employees by name and department"
- "Get expense report details"

#### Create Operations (POST)

**Summary Pattern**:
```
"Create [new resource]"
"Submit [resource]"
"Post [action]"
```

**Examples**:
- "Create a new employee record"
- "Submit an expense report"
- "Post a new comment on document"
- "Create purchase order"

#### Update Operations (PUT, PATCH)

**Summary Pattern**:
```
"Update [resource]"
"Replace [resource]"
"Modify [resource]"
"Change [specific field]"
```

**Examples**:
- "Update employee information"
- "Replace entire purchase order"
- "Modify employee salary"
- "Update travel request status"

#### Delete Operations (DELETE)

**Summary Pattern**:
```
"Delete [resource]"
"Remove [resource]"
"Cancel [resource]"
```

**Examples**:
- "Delete employee record"
- "Remove purchase order"
- "Cancel travel request"
- "Delete document attachment"

---

## PARAMETERS DOCUMENTATION

### Parameter Overview

**Parameters** are options passed with API requests to control behavior:
- Filtering criteria
- Sorting preferences
- Pagination settings
- Authentication tokens
- Custom headers
- Request body content

### Parameter Location Types

| Location | Usage | Example |
|----------|-------|---------|
| **path** | Resource identifier in URL | `/employees/{employeeId}` |
| **query** | Filter/sort parameters | `?department=HR&sort=name` |
| **header** | Authentication/metadata | `Authorization: Bearer token` |
| **cookie** | Session/preference data | `sessionId=abc123` |
| **body** | Request payload (JSON/XML) | POST body with resource data |

### Required Parameter Documentation

For each parameter, document:

#### 1. Parameter Name

**Specifications**:
- Exactly matches API specification
- Case-sensitive
- Clear, meaningful names
- Follows naming conventions (camelCase for REST, PascalCase for OData)

**Examples**:
```
✓ employeeId, firstName, departmentCode
✗ emp_id, EmployeeID, employee-id (inconsistent with conventions)
```

#### 2. Location (in)

**Field**: `in`

**Values**: `path`, `query`, `header`, `cookie`, `body`

**Determines**: How parameter is passed in request

#### 3. Required Status

**Field**: `required`

**Values**: `true` or `false`

**Determines**: Whether parameter must be included

#### 4. Data Type

**Field**: `schema.type`

**Common Types**:
- `string`: Text values
- `integer`: Whole numbers
- `number`: Decimal numbers
- `boolean`: true/false values
- `array`: Multiple values
- `object`: Complex structures

#### 5. Description

**Field**: `description`

**Requirements**:
- Concise noun phrase describing purpose
- Maximum 100 characters for brevity
- Explains what parameter controls
- Mentions constraints (min/max, options, defaults)
- No ending period

**Examples**:

```yaml
# Simple parameter
parameters:
  - name: employeeId
    in: path
    required: true
    schema:
      type: string
    description: "The unique employee identifier"

  - name: department
    in: query
    required: false
    schema:
      type: string
    description: "Filter by department code (optional)"

  - name: pageSize
    in: query
    required: false
    schema:
      type: integer
      minimum: 1
      maximum: 100
      default: 20
    description: "Number of records per page (1-100, default 20)"

  - name: sortBy
    in: query
    required: false
    schema:
      type: string
      enum: [name, date, status]
    description: "Sort field: name, date, or status"
```

### Parameter Documentation Patterns

#### Simple Parameters

```yaml
- name: "status"
  in: "query"
  required: false
  schema:
    type: "string"
  description: "Filter by status value"
```

#### Parameters with Constraints

```yaml
- name: "pageSize"
  in: "query"
  required: false
  schema:
    type: "integer"
    minimum: 1
    maximum: 100
  description: "Results per page (minimum 1, maximum 100)"
```

#### Parameters with Enumeration

```yaml
- name: "sortOrder"
  in: "query"
  required: false
  schema:
    type: "string"
    enum: ["ascending", "descending"]
  description: "Sort order: ascending or descending"
```

#### Optional Parameters with Defaults

```yaml
- name: "includeDetails"
  in: "query"
  required: false
  schema:
    type: "boolean"
    default: false
  description: "Include detailed information (defaults to false)"
```

#### Array Parameters

```yaml
- name: "departments"
  in: "query"
  required: false
  schema:
    type: "array"
    items:
      type: "string"
  description: "Filter by multiple departments (comma-separated)"
```

### Documentation Quality Guidelines

#### ✅ Good Parameter Descriptions

```
"The unique employee identifier"
"Filter by status (Open, In Progress, Closed)"
"Number of results per page (1-100, default 20)"
"Search query string (minimum 2 characters)"
"Include subordinate employee records (optional, defaults to false)"
```

#### ❌ Poor Parameter Descriptions

```
"ID"                                    # Too vague
"The status"                           # Obvious, doesn't add value
"This parameter filters results"       # Doesn't explain what it filters
"Required to be provided"              # Type already indicates required
"See documentation"                    # No helpful information
```

### Parameter Organization

**Recommended Order in Documentation**:
1. Path parameters (required)
2. Query parameters (often optional filters)
3. Header parameters
4. Cookie parameters
5. Body parameters (request payload)

**Within Each Category**:
- Required parameters first
- Optional parameters after
- Alphabetical by name within sub-category

---

## RESPONSES DOCUMENTATION

### Response Overview

**Responses** describe what the API returns for different scenarios:
- Success codes (2xx)
- Client errors (4xx)
- Server errors (5xx)

Each response includes status code and description of outcome.

### Response Structure

#### 1. HTTP Status Code

**Purpose**: Indicates success or type of failure

**Common Status Codes for REST APIs**:

| Code | Status | Use Case |
|------|--------|----------|
| **2xx** | **Success** | Request processed successfully |
| 200 | OK | GET, PATCH success; data returned |
| 201 | Created | POST successful; new resource created |
| 202 | Accepted | Async operation queued for processing |
| 204 | No Content | DELETE, POST success; no body |
| **3xx** | **Redirection** | Client action needed for completion |
| 301 | Moved Permanently | Resource permanently moved |
| 304 | Not Modified | Data unchanged since last request |
| **4xx** | **Client Error** | Invalid request or missing data |
| 400 | Bad Request | Invalid format or missing required field |
| 401 | Unauthorized | Authentication required or invalid |
| 403 | Forbidden | Authenticated but insufficient permission |
| 404 | Not Found | Requested resource doesn't exist |
| 409 | Conflict | Request conflicts with current state |
| **5xx** | **Server Error** | Server processing failed |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Server temporarily unavailable |

#### 2. Response Description

**Field**: `description`

**Requirements**:
- Required for every response code
- Explains outcome in plain language
- Context-specific, not generic
- Describes returned data (if applicable)
- Mentions implications of status

**Guidelines**:
- Begins with capital letter
- **Avoid generic descriptions**: "No content", "Not found"
- **Use specific descriptions**: "Product out of stock", "Employee record not found"
- Mentions returned format (JSON, empty body)
- Explains business context

#### 3. Response Body

**Field**: `content`

**Includes**:
- Media type (application/json, application/xml)
- Schema definition
- Example response data

### Response Documentation Patterns

#### Success Response (200 OK)

```yaml
responses:
  '200':
    description: "Employee data successfully retrieved with full profile information"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Employee"
        example:
          employeeId: "E12345"
          firstName: "John"
          lastName: "Doe"
          department: "Engineering"
          status: "Active"
```

#### Created Response (201 Created)

```yaml
responses:
  '201':
    description: "Employee successfully created. Location header contains URL to new resource"
    headers:
      Location:
        description: "URL of newly created employee"
        schema:
          type: "string"
          example: "/employees/E12346"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Employee"
```

#### No Content Response (204 No Content)

```yaml
responses:
  '204':
    description: "Employee record successfully deleted. No response body"
```

#### Async Response (202 Accepted)

```yaml
responses:
  '202':
    description: "Delete request accepted. Processing occurs asynchronously. Check job status via Location header"
    headers:
      Location:
        description: "URL to check processing status"
        schema:
          type: "string"
          example: "/jobs/job-12345"
```

#### Bad Request Response (400)

```yaml
responses:
  '400':
    description: "Request validation failed. Check error details for specific field violations"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          errorCode: "INVALID_INPUT"
          message: "Validation failed"
          details:
            - field: "email"
              issue: "Invalid email format"
            - field: "birthDate"
              issue: "Date must be in YYYY-MM-DD format"
```

#### Conflict Response (409)

```yaml
responses:
  '409':
    description: "Cannot process request because record already exists. Provide valid unique values"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          errorCode: "DUPLICATE_RECORD"
          message: "Employee with email john@example.com already exists"
          conflictingField: "email"
          existingRecordId: "E99999"
```

#### Not Found Response (404)

```yaml
responses:
  '404':
    description: "Requested employee not found. Verify employee ID is correct"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          errorCode: "NOT_FOUND"
          message: "No employee found with ID E99999"
          resourceType: "Employee"
          providedId: "E99999"
```

#### Unauthorized Response (401)

```yaml
responses:
  '401':
    description: "Authentication required or token expired. Provide valid Authorization header with Bearer token"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          errorCode: "UNAUTHORIZED"
          message: "Bearer token is missing or invalid"
```

#### Forbidden Response (403)

```yaml
responses:
  '403':
    description: "Insufficient permissions to access this resource. Contact administrator for access"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          errorCode: "FORBIDDEN"
          message: "You do not have permission to update employee records"
          requiredRole: "HR_Manager"
          yourRole: "HR_User"
```

### Response Documentation Best Practices

#### ✅ Effective Response Descriptions

```
"Employee successfully created with assigned ID. Location header contains URL to new resource."
"Product is out of stock. Check available inventory levels in the system."
"Invalid request format. Email field must be in user@example.com format."
"Insufficient permissions. Only managers can approve documents. Contact HR for role assignment."
"Order cannot be modified because it's already been shipped. Contact customer service for options."
```

#### ❌ Poor Response Descriptions

```
"OK"                                              # Too generic
"No content"                                      # Doesn't explain context
"Bad request"                                     # Doesn't explain what's bad
"Not found"                                       # Doesn't explain what wasn't found
"Error"                                           # No helpful information
"See error details"                               # Doesn't describe status code
```

### Response Error Handling

#### Standard Error Response Schema

```yaml
components:
  schemas:
    Error:
      type: object
      required:
        - errorCode
        - message
      properties:
        errorCode:
          type: string
          description: "Machine-readable error code for programmatic handling"
          example: "INVALID_INPUT"
        message:
          type: string
          description: "Human-readable error message"
          example: "Email field is required and must be valid"
        details:
          type: array
          description: "Detailed information about each error"
          items:
            type: object
            properties:
              field:
                type: string
                description: "Field that caused the error"
              issue:
                type: string
                description: "Specific problem with the field"
        timestamp:
          type: string
          format: date-time
          description: "When error occurred"
```

#### Error Response Documentation Template

```yaml
responses:
  '400':
    description: "[Brief status]. [Explanation of what went wrong]. [How to fix]"
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          errorCode: "[SPECIFIC_CODE]"
          message: "[Context-specific message]"
          details: [...]
```

---

## COMPONENTS AND DEFINITIONS

### What Are Components?

**Components** (in OpenAPI 3.0) define reusable data structures:
- Request/response body schemas
- Parameter definitions
- Response headers
- Security schemes
- Examples

Also called **Definitions** in OpenAPI 2.0 (Swagger).

### Schema Documentation

#### Schema Object Structure

```yaml
components:
  schemas:
    Employee:
      type: object
      required:
        - employeeId
        - firstName
        - lastName
      properties:
        employeeId:
          type: string
          description: "Unique employee identifier assigned by system"
          example: "E12345"

        firstName:
          type: string
          description: "Employee's first name"
          minLength: 1
          maxLength: 50
          example: "John"

        lastName:
          type: string
          description: "Employee's last name"
          minLength: 1
          maxLength: 50
          example: "Doe"

        emailAddress:
          type: string
          format: email
          description: "Corporate email address (must be unique)"
          example: "john.doe@company.com"

        department:
          type: string
          enum: ["Engineering", "Sales", "HR", "Finance"]
          description: "Department assignment. Valid values: Engineering, Sales, HR, Finance"
          example: "Engineering"

        salary:
          type: number
          format: double
          description: "Annual salary in USD (minimum $20,000)"
          minimum: 20000
          example: 85000.00

        isActive:
          type: boolean
          description: "Whether employee is currently active (true) or inactive (false)"
          default: true
          example: true
```

#### Component Description Guidelines

**For Objects (Complex Types)**:
- Brief description of what the object represents
- Explain primary purpose
- Mention key characteristics

**For Properties (Fields)**:
- Concise description of property meaning
- Explain constraints (min/max, format, allowed values)
- Provide example value
- Mention relationships to other fields

**Naming Conventions**:

| Schema Type | Naming | Examples |
|-------------|--------|----------|
| **Request Body** | Use operation-specific name | `CreateEmployeeRequest`, `UpdateEmployeeRequest` |
| **Response Body** | Use resource name | `Employee`, `Order`, `Document` |
| **Collection** | Plural form | `Employees`, `Orders`, `Documents` |
| **Error** | Error-specific name | `ValidationError`, `NotFoundError` |

#### Complete Schema Example

```yaml
Employee:
  type: object
  description: "Represents an employee in the system with personal and professional information"
  required:
    - employeeId
    - firstName
    - lastName
    - email
    - department
  properties:
    employeeId:
      type: string
      description: "System-assigned unique identifier"
      pattern: "^E[0-9]{5}$"
      example: "E12345"

    firstName:
      type: string
      description: "Employee's first name"
      minLength: 1
      maxLength: 50
      example: "John"

    lastName:
      type: string
      description: "Employee's surname"
      minLength: 1
      maxLength: 50
      example: "Doe"

    email:
      type: string
      format: email
      description: "Unique corporate email address"
      example: "john.doe@company.com"

    dateOfBirth:
      type: string
      format: date
      description: "Birth date in YYYY-MM-DD format (optional)"
      example: "1985-03-15"

    department:
      type: string
      enum: ["Engineering", "Sales", "HR", "Finance"]
      description: "Department assignment"
      example: "Engineering"

    manager:
      type: object
      description: "Reference to manager (optional)"
      properties:
        managerId:
          type: string
          description: "Manager's employee ID"
          example: "E10001"
        managerName:
          type: string
          description: "Manager's full name"
          example: "Jane Smith"

    joinDate:
      type: string
      format: date
      description: "Date employee joined company"
      example: "2020-06-01"

    isActive:
      type: boolean
      description: "Active employment status"
      default: true
      example: true

    tags:
      type: array
      description: "Custom tags for employee classification"
      items:
        type: string
      example: ["key-employee", "retention-focus"]
```

### Component Usage Documentation

#### Referenced in Requests

```yaml
paths:
  /employees:
    post:
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateEmployeeRequest"
```

#### Referenced in Responses

```yaml
paths:
  /employees/{employeeId}:
    get:
      responses:
        '200':
          description: "Employee data successfully retrieved"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Employee"
```

#### Referenced in Parameters

```yaml
parameters:
  - name: filter
    in: query
    description: "Filter expression using employee properties"
    schema:
      $ref: "#/components/schemas/EmployeeFilter"
```

### Enum Documentation

```yaml
components:
  schemas:
    EmployeeStatus:
      type: string
      enum:
        - Active
        - Inactive
        - OnLeave
        - Terminated
      description: "Employment status. Valid values: Active (currently employed), Inactive (on leave without pay), OnLeave (paid leave), Terminated (employment ended)"
```

---

## SECURITY SCHEMES

### What Are Security Schemes?

**Security Schemes** define how APIs authenticate requests:
- Bearer tokens (OAuth 2.0)
- API keys
- Basic authentication
- OpenID Connect

### Common SAP API Security Schemes

#### 1. OAuth 2.0 Bearer Token

**Use Case**: Cloud applications, third-party integrations

**Flow Type**: Client Credentials, Authorization Code, etc.

**Documentation**:

```yaml
components:
  securitySchemes:
    OAuth2ClientCredentials:
      type: oauth2
      description: "OAuth 2.0 Client Credentials flow for server-to-server authentication"
      flows:
        clientCredentials:
          tokenUrl: "https://auth.sap.com/oauth/token"
          refreshUrl: "https://auth.sap.com/oauth/refresh"
          scopes:
            "employees:read": "Read employee data"
            "employees:write": "Create/modify employee data"
            "employees:delete": "Delete employee records"
```

#### 2. API Key Authentication

**Use Case**: Simple API access, testing

**Documentation**:

```yaml
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: "API key authentication for direct API access. Obtain key from SAP API Business Hub"
```

#### 3. Basic Authentication

**Use Case**: Legacy systems, simple auth

**Documentation**:

```yaml
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
      description: "HTTP Basic authentication using username:password encoded in Authorization header"
```

#### 4. OpenID Connect

**Use Case**: Enterprise single sign-on

**Documentation**:

```yaml
components:
  securitySchemes:
    OpenIDConnect:
      type: openIdConnect
      openIdConnectUrl: "https://auth.sap.com/.well-known/openid-configuration"
      description: "OpenID Connect authentication for enterprise environments"
```

### Security Scheme Application

#### Apply to All Operations

```yaml
security:
  - OAuth2ClientCredentials:
      - "employees:read"
      - "employees:write"
```

#### Apply to Specific Operations

```yaml
paths:
  /employees:
    get:
      security:
        - OAuth2ClientCredentials:
            - "employees:read"
      # ...

    post:
      security:
        - OAuth2ClientCredentials:
            - "employees:write"
      # ...
```

### Security Documentation Best Practices

#### ✅ Good Security Documentation

```
"OAuth 2.0 Client Credentials flow for server-to-server authentication.
Obtain access token from https://auth.sap.com/oauth/token using your client credentials.
Include token in Authorization header: Authorization: Bearer <token>"
```

#### ❌ Poor Security Documentation

```
"OAuth 2.0"                          # Too vague
"Use authentication"                 # No details
"See SAP documentation"              # No specifics
```

---

## TAGS

### What Are Tags?

**Tags** are labels that group related operations for organization in documentation:
- Organize operations by resource type
- Create documentation structure
- Improve API navigation

### Tag Definition and Usage

#### Tag Object Structure

```yaml
tags:
  - name: "Employees"
    description: "Operations for managing employee records including creation, retrieval, updates, and deletions"
    externalDocs:
      description: "Employee Management Guide"
      url: "https://help.sap.com/employees"

  - name: "Departments"
    description: "Operations for querying and managing department structures and assignments"
    externalDocs:
      description: "Organization Guide"
      url: "https://help.sap.com/departments"

  - name: "Compensation"
    description: "Operations for managing salary, benefits, and compensation-related data"
```

#### Applying Tags to Operations

```yaml
paths:
  /employees:
    post:
      tags:
        - "Employees"
      summary: "Create a new employee"
      # ...

  /employees/{employeeId}:
    get:
      tags:
        - "Employees"
      summary: "Retrieve employee details"
      # ...

    patch:
      tags:
        - "Employees"
      summary: "Update employee information"
      # ...

  /employees/{employeeId}/compensation:
    get:
      tags:
        - "Compensation"
      summary: "Get employee compensation details"
      # ...
```

### Tag Documentation Guidelines

#### Tag Name

**Requirements**:
- Clear, noun-based names (not verbs)
- Follows resource/domain structure
- Singular or plural consistently
- Capitalized properly

**Examples**:

```
✓ "Employees", "Orders", "Travel Requests", "Expenses"
✗ "Create Employee", "Get Orders", "employee management"
```

#### Tag Description

**Requirements**:
- 1-2 sentences explaining tag's scope
- Explains what operations it contains
- Lists related operations or domains
- Provides context for developers

**Examples**:

```
"Operations for managing employee records including personal information, assignments, and employment status"

"CRUD operations for purchase orders including creation, approval workflows, and fulfillment tracking"

"Query and manage organizational structure, department hierarchies, and cost center allocations"
```

### Tag Organization Patterns

#### Pattern 1: Resource-Based Tags

```yaml
tags:
  - name: "Employees"
  - name: "Departments"
  - name: "Compensation"
  - name: "Benefits"
```

#### Pattern 2: Domain-Based Tags

```yaml
tags:
  - name: "Human Resources"
  - name: "Procurement"
  - name: "Finance"
  - name: "Supply Chain"
```

#### Pattern 3: Operation-Based Tags

```yaml
tags:
  - name: "Read Operations"
  - name: "Write Operations"
  - name: "Administrative Operations"
```

---

## EXTERNAL DOCUMENTATION

### What Is External Documentation?

**External Documentation** links from API specification to:
- General guides and tutorials
- Use case documentation
- API governance policies
- Related documentation resources

### Two Levels of External Documentation

#### 1. Top-Level External Documentation

**Scope**: Entire API

**Location**: OpenAPI root level

```yaml
externalDocs:
  description: "Complete API documentation and guides"
  url: "https://help.sap.com/employee-central"
```

#### 2. Operation-Level External Documentation

**Scope**: Individual operations

**Location**: Per-operation specification

```yaml
paths:
  /employees:
    post:
      externalDocs:
        description: "Step-by-step guide to onboarding new employees"
        url: "https://help.sap.com/guides/employee-onboarding"
```

### External Documentation Best Practices

#### ✅ Effective Links

```
Description: "Employee creation workflow"
URL: "https://help.sap.com/employee-central/guide/create-employee"

Description: "API rate limiting and quotas"
URL: "https://help.sap.com/employee-central/guide/rate-limits"

Description: "Error codes and troubleshooting"
URL: "https://help.sap.com/employee-central/guide/errors"
```

#### ❌ Poor Links

```
Description: "Documentation"                          # Too vague
URL: "https://help.sap.com"                          # Root-level, not specific

Description: "Click here"                             # Not descriptive
URL: "https://help.sap.com/some-page"               # No context

Description: "Employee API"                           # Obvious
URL: "https://help.sap.com/different-product"       # Wrong product
```

### Common External Documentation Topics

| Topic | When to Link | Example URL |
|-------|--------------|-------------|
| **Getting Started** | Root API level | `/guides/getting-started` |
| **Authentication** | Security schemes section | `/guides/authentication` |
| **Rate Limiting** | Root API level | `/guides/rate-limits` |
| **Error Handling** | Error responses | `/guides/error-codes` |
| **Use Cases** | Related operation groups | `/guides/use-cases/payroll` |
| **Data Mapping** | Complex schemas | `/guides/field-mapping` |
| **Migration Guide** | Deprecated APIs | `/guides/migration-v1-to-v2` |

---

## COMPLETE EXAMPLES

### Example 1: Simple REST API - Employee Management

```yaml
openapi: 3.0.3

info:
  title: "Employee Central"
  version: "1.0.0"
  x-sap-shortText: "Create, retrieve, and manage employee records with assignment and compensation data"
  description: |
    This API provides comprehensive access to employee master data in SAP SuccessFactors.
    Enables creation, retrieval, and modification of employee records with support for
    organizational assignments and compensation information.

  contact:
    name: "SAP Support"
    url: "https://help.sap.com"

externalDocs:
  description: "Employee Central Guide"
  url: "https://help.sap.com/employee-central"

servers:
  - url: "https://api.sap.com/employeecentral"
    description: "Production environment"

components:
  securitySchemes:
    OAuth2:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: "https://auth.sap.com/oauth/token"
          scopes:
            "employees:read": "Read employee data"
            "employees:write": "Create/modify employee data"

  schemas:
    Employee:
      type: object
      description: "Employee master data record"
      required:
        - employeeId
        - firstName
        - lastName
        - email
      properties:
        employeeId:
          type: string
          description: "System-assigned unique employee identifier"
          example: "E12345"
        firstName:
          type: string
          description: "First name"
          minLength: 1
          maxLength: 50
          example: "John"
        lastName:
          type: string
          description: "Last name"
          minLength: 1
          maxLength: 50
          example: "Doe"
        email:
          type: string
          format: email
          description: "Corporate email address"
          example: "john.doe@company.com"
        department:
          type: string
          description: "Department assignment"
          example: "Engineering"
        hireDate:
          type: string
          format: date
          description: "Date employee joined company"
          example: "2020-06-01"

    Error:
      type: object
      required:
        - errorCode
        - message
      properties:
        errorCode:
          type: string
          description: "Error code identifier"
        message:
          type: string
          description: "Error description"

security:
  - OAuth2:
      - "employees:read"
      - "employees:write"

tags:
  - name: "Employees"
    description: "Operations for managing employee records"

paths:
  /employees:
    get:
      tags:
        - "Employees"
      summary: "List all employees"
      description: "Retrieves all employees with optional filtering and pagination"
      parameters:
        - name: department
          in: query
          description: "Filter by department"
          schema:
            type: string
        - name: pageSize
          in: query
          description: "Number of results per page (default 20)"
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: "Successfully retrieved employee list"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Employee"
        '401':
          description: "Authentication required"
        '500':
          description: "Server error"

    post:
      tags:
        - "Employees"
      summary: "Create new employee"
      description: "Creates a new employee record. Automatically assigns employee ID and sends notifications"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Employee"
      responses:
        '201':
          description: "Employee successfully created"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Employee"
        '400':
          description: "Invalid employee data"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        '409':
          description: "Employee already exists with provided email"

  /employees/{employeeId}:
    get:
      tags:
        - "Employees"
      summary: "Retrieve employee by ID"
      description: "Fetches complete employee record including all assignments and compensation details"
      parameters:
        - name: employeeId
          in: path
          required: true
          description: "Employee ID"
          schema:
            type: string
      responses:
        '200':
          description: "Employee details retrieved successfully"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Employee"
        '404':
          description: "Employee not found"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

    patch:
      tags:
        - "Employees"
      summary: "Update employee information"
      description: "Modifies employee record. Only specified fields are updated. Requires manager approval for salary changes"
      parameters:
        - name: employeeId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Employee"
      responses:
        '200':
          description: "Employee successfully updated"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Employee"
        '404':
          description: "Employee not found"

    delete:
      tags:
        - "Employees"
      summary: "Delete employee record"
      description: "Removes employee from system. Marks as inactive rather than physical deletion"
      parameters:
        - name: employeeId
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: "Employee successfully deleted"
        '404':
          description: "Employee not found"
```

### Example 2: OData API - Purchase Orders

```yaml
openapi: 3.0.3

info:
  title: "Purchase Orders"
  version: "1.0.0"
  x-sap-shortText: "Query and manage purchase orders with approval workflows and supplier integration"
  description: |
    OData API providing access to purchase order data in SAP S/4HANA.
    Enables querying, creating, and modifying purchase orders with real-time
    approval tracking and supplier status management.
  x-sap-apiType: "OData"

externalDocs:
  description: "Purchase Order Documentation"
  url: "https://help.sap.com/purchase-orders"

servers:
  - url: "https://api.sap.com/s4hana/odata/v4/purchaseorders"
    description: "S/4HANA OData v4 endpoint"

components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
      description: "HTTP Basic authentication"

  schemas:
    PurchaseOrder:
      type: object
      description: "Purchase order document"
      properties:
        ID:
          type: string
          description: "Purchase order unique identifier"
        PurchaseOrderNumber:
          type: string
          description: "Human-readable PO number"
        SupplierName:
          type: string
          description: "Name of supplying vendor"
        OrderDate:
          type: string
          format: date
          description: "Date PO was created"
        Amount:
          type: number
          description: "Total PO amount in local currency"
        Status:
          type: string
          enum: ["Draft", "Submitted", "Approved", "Rejected", "Received"]
          description: "Current PO status in approval workflow"
        Items:
          type: array
          description: "Individual line items"
          items:
            type: object
            properties:
              LineNumber:
                type: string
              Material:
                type: string
              Quantity:
                type: number
              UnitPrice:
                type: number

security:
  - BasicAuth: []

paths:
  /PurchaseOrders:
    get:
      summary: "Query purchase orders"
      description: "Retrieves purchase orders with OData filtering and paging. Supports $filter, $orderby, $top, $skip"
      parameters:
        - name: "$filter"
          in: query
          description: "OData filter expression (e.g., Status eq 'Approved')"
          schema:
            type: string
        - name: "$orderby"
          in: query
          description: "OData orderby expression (e.g., OrderDate desc)"
          schema:
            type: string
        - name: "$top"
          in: query
          description: "Number of records to return (maximum 1000)"
          schema:
            type: integer
        - name: "$skip"
          in: query
          description: "Number of records to skip for pagination"
          schema:
            type: integer
      responses:
        '200':
          description: "Successfully retrieved purchase orders"
          content:
            application/json:
              schema:
                type: object
                properties:
                  value:
                    type: array
                    items:
                      $ref: "#/components/schemas/PurchaseOrder"

    post:
      summary: "Create purchase order"
      description: "Creates new purchase order. Validates supplier and material masters. Triggers initial approval workflow"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PurchaseOrder"
      responses:
        '201':
          description: "Purchase order created successfully"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PurchaseOrder"
        '400':
          description: "Invalid PO data or missing required fields"

  /PurchaseOrders('{ID}'):
    get:
      summary: "Get purchase order details"
      description: "Retrieves complete purchase order with all line items and approval history"
      parameters:
        - name: ID
          in: path
          required: true
          description: "Purchase order ID"
          schema:
            type: string
      responses:
        '200':
          description: "Purchase order details"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PurchaseOrder"
```

---

## BEST PRACTICES SUMMARY

### Documentation Quality Principles

#### 1. Clarity First

- Write descriptions for developers without API context
- Use simple, direct language
- Define technical terms
- Provide practical examples

#### 2. Completeness

- Document every operation, parameter, and response
- Include all status codes (success and error)
- Explain what data is returned
- Describe error scenarios

#### 3. Consistency

- Use consistent terminology across API
- Follow naming conventions strictly
- Maintain uniform description style
- Organize information predictably

#### 4. Context-Specificity

- Avoid generic error descriptions
- Explain business context
- Describe constraints and limitations
- Mention prerequisites or requirements

#### 5. Usability

- Organize information logically
- Group related operations with tags
- Cross-reference related endpoints
- Provide practical examples

### Writing Quality Checklist

Before publishing API documentation, verify:

- [ ] Every operation has meaningful summary (max 255 chars)
- [ ] Operation descriptions provide supplementary context
- [ ] All parameters documented with clear descriptions
- [ ] Every status code explained with context-specific description
- [ ] Success responses show data structure and example
- [ ] Error responses explain what went wrong and how to fix
- [ ] API title clear and follows naming rules (max 80 chars)
- [ ] x-sap-shortText compelling and benefit-focused (max 180 chars)
- [ ] Package descriptions use imperative verbs
- [ ] All schemas documented with descriptions
- [ ] Security requirements clearly stated
- [ ] Tags organized logically with descriptions
- [ ] External links functional and relevant
- [ ] Spelling and grammar correct (American English)
- [ ] No sensitive data in examples
- [ ] Terminology consistent throughout
- [ ] Complex concepts explained simply

---

## CHARACTER LIMIT REFERENCE TABLE

### Quick Reference: Character Limits for All API Elements

| Element | Max Chars | Notes | Example |
|---------|-----------|-------|---------|
| **API Title** | 80 | OpenAPI info.title | "Employee Central" (17 chars) |
| **x-sap-shortText** | 180 | SAP-specific high-level description | "Create, update, and query..." (82 chars) |
| **Operation Summary** | 255 | Appears in operation list | "Retrieve employee by ID" (23 chars) |
| **Package Title** | No strict limit | Catalog display | "SAP SuccessFactors..." |
| **Package Short Desc** | 250 | Not counting spaces | Typical 60-120 chars |
| **Parameter Name** | Language dependent | Matches spec | "employeeId" |
| **Parameter Desc** | No strict limit | Recommended 30-100 | "Employee unique identifier" |
| **Property Desc** | No strict limit | Recommended 30-80 | "User email address" |
| **Error Description** | No strict limit | Recommended 50-150 | "Cannot process order..." |
| **Enum Value Desc** | No strict limit | Recommended 30-80 | "Active employment status" |

### Practical Counting Examples

**For Package Short Description (max 250 chars, not counting spaces)**:

```
Original: "Create, update, and query employee records including personal
           information, organizational assignments, and compensation data"

Count (no spaces): Create,update,andqueryemployeerecordsincludingpersonal...
Character count: 119 ✓ (GOOD - well under 250)
```

**For x-sap-shortText (max 180 chars)**:

```
Original: "Query and manage employee master data, assignments, and
           compensation information with real-time synchronization"

Count: 118 characters ✓ (GOOD - under 180 limit)
```

**For Operation Summary (max 255 chars)**:

```
Original: "Searches for matching orders with advanced filtering by date,
           status, and amount with results pagination"

Count: 118 characters ✓ (GOOD - under 255 limit)
```

---

## ANTI-PATTERNS TO AVOID

### Naming Anti-Patterns

#### ❌ Including Technical Specifics

```
"SAP Employee Central REST API v2.0"
```

**Problem**: Technical specifications shouldn't be in name
**Fix**: "Employee Central"

#### ❌ Using API Type in Name

```
"Purchase Order OData Service"
```

**Problem**: API type is implicit
**Fix**: "Purchase Orders"

#### ❌ Starting with SAP Prefix

```
"SAP Human Resources Employee Management"
```

**Problem**: Redundant context
**Fix**: "Employee Management" (in HR context)

#### ❌ Using Verbs Instead of Nouns

```
"Managing Employee Data"
```

**Problem**: Not a clear entity name
**Fix**: "Employee Data" or "Employee Management"

---

### Description Anti-Patterns

#### ❌ Second-Person Language

```
❌ "You can create a new employee"
✅ "Creates a new employee"

❌ "You need to provide the employee ID"
✅ "Requires employee ID in path parameter"
```

#### ❌ Repeating Summary Information

```
Operation Summary: "Creates a new order"

❌ Description: "This operation creates a new order in the system"
✅ Description: "Automatically assigns order number and sends confirmation to customer"
```

#### ❌ Generic Error Descriptions

```
❌ "Bad Request"
❌ "Not Found"
❌ "Server Error"

✅ "Email field must be in user@example.com format"
✅ "No employee found with ID E99999"
✅ "Database temporarily unavailable. Try again in 60 seconds"
```

#### ❌ Including Implementation Details

```
❌ "Calls internal service to validate employee"
✅ "Validates employee against company records"

❌ "Queries three database tables and joins results"
✅ "Retrieves complete employee profile with all departments"
```

#### ❌ Vague Language

```
❌ "Handles employee information"
✅ "Creates, updates, and deletes employee records"

❌ "Returns data"
✅ "Returns array of employees matching search criteria"

❌ "May fail in some cases"
✅ "Returns 409 Conflict if employee email already exists"
```

---

### Parameter Documentation Anti-Patterns

#### ❌ Obvious Descriptions

```
❌ "The employeeId"
❌ "The status field"
❌ "Required parameter"

✅ "The unique employee identifier"
✅ "Employment status (Active, Inactive, OnLeave)"
✅ "Employee ID required in URL path"
```

#### ❌ Missing Constraints

```
❌ "Number of results per page"
✅ "Number of results per page (minimum 1, maximum 100, default 20)"

❌ "Search query"
✅ "Search query (minimum 2 characters, case-insensitive)"

❌ "Filter value"
✅ "Filter by status (valid values: Open, Closed, Pending)"
```

#### ❌ Inconsistent Formatting

```
❌ Parameter 1: "The employee identifier"
❌ Parameter 2: "department code"
❌ Parameter 3: "Is Active Status"

✅ Parameter 1: "Employee unique identifier"
✅ Parameter 2: "Department code"
✅ Parameter 3: "Active employee status (true/false)"
```

---

### Response Documentation Anti-Patterns

#### ❌ No Context

```
❌ "OK"
❌ "Created"
❌ "Bad Request"

✅ "Employee successfully created. Location header contains URL to new resource"
✅ "Employee record not found. Verify employee ID is correct"
✅ "Email field must be valid format (user@example.com)"
```

#### ❌ Missing Error Explanation

```
❌ 400 Bad Request: "Bad request"
✅ 400 Bad Request: "Invalid request format. Email must be in user@example.com format"

❌ 404 Not Found: "Not found"
✅ 404 Not Found: "No employee found with ID E99999"

❌ 409 Conflict: "Conflict"
✅ 409 Conflict: "Cannot process because inventory insufficient. Available: 5 units, Requested: 10 units"
```

#### ❌ Inconsistent Response Structure

```
❌ Some 201 responses show created resource
❌ Some 201 responses show empty body

✅ Consistent structure across all creation endpoints
✅ Document what's returned in each case
```

---

### Schema Documentation Anti-Patterns

#### ❌ Missing Property Descriptions

```
❌ properties:
    employeeId: {}
    name: {}
    email: {}

✅ properties:
    employeeId:
      description: "System-assigned unique identifier"
    name:
      description: "Employee full name"
    email:
      description: "Corporate email address"
```

#### ❌ Not Explaining Constraints

```
❌ salary:
    type: number

✅ salary:
    type: number
    description: "Annual salary in USD"
    minimum: 20000
    example: 85000.00
```

#### ❌ Unclear Enum Values

```
❌ status:
    enum: ["A", "I", "L"]

✅ status:
    enum: ["Active", "Inactive", "OnLeave"]
    description: "Employee status. Active = currently employed, Inactive = no longer employed, OnLeave = temporary leave"
```

---

### Organization Anti-Patterns

#### ❌ Inconsistent Tag Usage

```
❌ Operation 1: tags: ["Employees"]
❌ Operation 2: tags: ["Employee"]
❌ Operation 3: tags: ["Employee Management"]

✅ All operations consistently use: ["Employees"]
```

#### ❌ Missing Related Links

```
❌ No cross-references between related operations
✅ Link GET to POST, PUT, DELETE for same resource

❌ Orphaned operations with no tag
✅ Every operation tagged for organization
```

#### ❌ Poor External Documentation

```
❌ externalDocs:
    description: "Documentation"
    url: "https://help.sap.com"

✅ externalDocs:
    description: "Employee onboarding workflow guide"
    url: "https://help.sap.com/guides/employee-onboarding"
```

---

### Security Anti-Patterns

#### ❌ Unclear Security Requirements

```
❌ No security schemes defined

✅ Clear OAuth 2.0 configuration with token URL and scopes

❌ Security scheme documented but not applied to operations

✅ Security applied to all operations and documented
```

#### ❌ Generic Scope Names

```
❌ scopes:
    "api": "API access"
    "read": "Read access"

✅ scopes:
    "employees:read": "Read employee data"
    "employees:write": "Create and modify employee data"
    "employees:delete": "Delete employee records"
```

---

### Example Anti-Patterns

#### ❌ Unrealistic Examples

```
❌ Example with fake/obvious data that doesn't match real API
❌ Example missing required fields
❌ Example with incorrect data types

✅ Real-world example with all required fields
✅ Data types match schema definition
✅ Values realistic and properly formatted
```

#### ❌ Missing Examples

```
❌ No request body example for POST operation
❌ No error response example
❌ No filtering/pagination example

✅ Complete request and response examples
✅ Show both success and error scenarios
✅ Demonstrate complex features
```

---

## REFERENCES & OFFICIAL STANDARDS

**Official SAP API Style Guide Section 30**:
https://github.com/SAP-docs/api-style-guide/tree/main/docs/30-rest-and-odata-api-documentation

**OpenAPI 3.0.3 Specification**:
https://spec.openapis.org/oas/v3.0.3

**OData Specification**:
https://www.odata.org/documentation/

**SAP API Business Hub**:
https://api.sap.com/

**All 12 Files Extracted & Consolidated**: 2025-11-21

**Compliance**: Follows official SAP API Style Guide and OpenAPI specifications

---

**End of REST and OData API Documentation Guide**
