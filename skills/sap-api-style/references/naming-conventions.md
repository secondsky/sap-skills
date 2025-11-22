# API Naming Conventions Reference

**Source**: SAP API Style Guide v2021.01 | https://github.com/SAP-docs/api-style-guide

**Last Updated**: 2025-11-21

**Attribution**: Content derived from [SAP API Style Guide](https://github.com/SAP-docs/api-style-guide) (Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))

**Changes**: Consolidated from multiple source files, reorganized for progressive disclosure, added examples and templates.

**Scope**: REST APIs, OData APIs, Java, JavaScript, .NET, and C/C++ libraries

---

## Table of Contents

1. [Core Naming Principles](#core-naming-principles)
2. [General API Naming Rules](#general-api-naming-rules)
3. [Word Combination Conventions](#word-combination-conventions)
4. [Acronym Guidelines](#acronym-guidelines)
5. [REST and OData Naming](#rest-and-odata-naming)
6. [Native Library Naming](#native-library-naming)
7. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
8. [Reference Tables](#reference-tables)
9. [Naming Decision Trees](#naming-decision-trees)
10. [Best Practices Summary](#best-practices-summary)

---

## Core Naming Principles

### 1. Clarity and Consistency

**Principle**: Names must be immediately understandable to developers without requiring additional context.

- Use correctly spelled American English words
- Avoid ambiguous abbreviations
- Maintain consistent terminology across entire API
- Use meaningful, descriptive names (not single letters except in loops)

**Example - Clarity**:
```
✅ GOOD:   orders, customerAddress, createInvoice
❌ BAD:    o, cAddr, ci
❌ BAD:    usr_acct (mixed conventions), CUSTOMR (misspelled)
```

### 2. Language-Specific Conventions

**Principle**: Names must follow established conventions for their specific language/platform.

| Language | Convention | Scope |
|----------|-----------|-------|
| REST/OData URI | kebab-case or lowerCamelCase | Resource names, query parameters |
| Java | lowerCamelCase (methods), UpperCamelCase (classes) | Methods, packages, interfaces |
| JavaScript | lowerCamelCase (methods), UpperCamelCase (classes) | Functions, classes, namespaces |
| .NET | UpperCamelCase (methods), UpperCamelCase (classes) | Methods, classes, namespaces |
| C/C++ | lowercase_with_underscores (functions) | Functions, macros, enums |

### 3. Grammatical Correctness

**Principle**: Names should follow proper English grammar rules.

- Use nouns for entities: `customer`, `order`, `product`
- Use verbs for actions: `create`, `update`, `delete`, `validate`
- Use adjectives for attributes: `active`, `archived`, `disabled`
- Complete phrases are better than fragments

**Example - Grammar**:
```
✅ GOOD:   isActive, getCustomerByID, updateOrderStatus
❌ BAD:    activ (incomplete), getcustomer (no camelCase), order_updated (past tense for getter)
```

### 4. Avoidance of Implementation Details

**Principle**: Names should reflect intent and business purpose, not technical implementation.

- Don't expose internal architecture in names
- Don't use technology-specific terms in business-facing APIs
- Names should remain valid even if implementation changes

**Example - Implementation Details**:
```
✅ GOOD:   getEmployeeData (what it does)
❌ BAD:    getEmployeeDataFromDatabase (reveals implementation)
❌ BAD:    fetchXmlResponse (technical details)
```

---

## General API Naming Rules

### API Name Rules

**Rule 1: Don't Include "API" in the Name**

- The word "API" is implied by context
- Adding "API" is redundant and clutters naming

**Examples**:
```
✅ GOOD:   "Customer Orders"
❌ BAD:    "Customer Orders API"
❌ BAD:    "Customer Orders APIs"

✅ GOOD:   "Employee Management"
❌ BAD:    "Employee Management REST API"
```

**Rule 2: Capitalize Words Properly**

- Use Title Case for multi-word API names
- Capitalize each significant word
- Maintain consistent capitalization throughout documentation

**Examples**:
```
✅ GOOD:   "Purchase Order Processing"
❌ BAD:    "purchase order processing" (all lowercase)
❌ BAD:    "Purchase order processing" (inconsistent)
❌ BAD:    "PURCHASE ORDER PROCESSING" (all caps)
```

**Rule 3: Exclude Technical Specifics**

- Don't specify REST, OData, SOAP, GraphQL in API name
- Don't specify version in API name (use versioning metadata)
- Don't expose protocol details

**Examples**:
```
✅ GOOD:   "Document Approval"
❌ BAD:    "Document Approval REST API"
❌ BAD:    "Document Approval OData v4"
❌ BAD:    "Document Approval v2"
```

**Rule 4: Avoid Verbs and Prepositions**

- API names should be nouns or noun phrases (except in rare cases)
- Verbs belong in method/operation names
- Prepositions should be minimized

**Examples**:
```
✅ GOOD:   "Invoice Management"
❌ BAD:    "Creating Invoices"
❌ BAD:    "Manage for Invoices"

✅ GOOD:   "Purchase Requisitions"
❌ BAD:    "Retrieving Purchase Requisitions"
```

**Rule 5: Omit "SAP" Prefix**

- "SAP" is context that users already know
- Including it adds no value and increases verbosity
- Reserve for disambiguation only

**Examples**:
```
✅ GOOD:   "Human Capital Management Employees"
❌ BAD:    "SAP Human Capital Management Employees"

✅ GOOD:   "Travel Management"
❌ BAD:    "SAP Travel Management"
```

---

## Word Combination Conventions

### 1. camelCase (Lower Camel Case)

**Definition**: First word lowercase, subsequent words capitalized, no separators.

**Usage**:
- REST/OData query parameters
- REST/OData request/response fields
- Java methods, parameters, variables
- JavaScript functions, variables, object properties
- .NET and C++ variable names (some cases)

**Pattern**: `firstWordLowerRestWordsCapitalized`

**Examples**:
```
✅ customerAddress
✅ getOrderStatus
✅ isActiveUser
✅ totalAmountDue
✅ createPurchaseOrder

❌ customeraddress (no capitalization)
❌ GetOrderStatus (wrong language - PascalCase)
❌ get_order_status (wrong convention - snake_case)
```

**Word Boundaries**:
- Start new word with capital letter
- No spaces, hyphens, or underscores
- Numbers typically stay attached: `oauth2Token` not `oAuth2Token`
- Acronyms handled specially (see [Acronym Guidelines](#acronym-guidelines))

### 2. PascalCase (Upper Camel Case)

**Definition**: First word capitalized, subsequent words capitalized, no separators.

**Usage**:
- REST/OData resource names (preferred in many contexts)
- Java class names, interface names, enum names
- JavaScript class names, constructors
- .NET class names, namespace segments, method names
- C/C++ class names, enum names

**Pattern**: `FirstWordCapitalizedRestWordsCapitalized`

**Examples**:
```
✅ CustomerAddress
✅ GetOrderStatus
✅ IsActiveUser
✅ TotalAmountDue
✅ CreatePurchaseOrder

❌ customeraddress (no capitalization)
❌ customerAddress (wrong style - camelCase)
❌ CUSTOMER_ADDRESS (wrong convention - UPPER_CASE)
```

### 3. kebab-case (Hyphenated Case)

**Definition**: All lowercase words separated by hyphens.

**Usage**:
- REST/OData URI paths (alternative to camelCase)
- REST query parameter names (when not camelCase)
- HTTP header names (some conventions)
- Command-line options
- URLs and file paths

**Pattern**: `first-word-lowercase-rest-words-lowercase-separated-by-hyphens`

**Examples**:
```
✅ customer-address
✅ order-status
✅ is-active-user
✅ total-amount-due
✅ /orders/{order-id}/items/{item-id}

❌ Customer-Address (wrong capitalization)
❌ customer_address (wrong separator - underscore)
❌ customerAddress (wrong style - camelCase)
```

### 4. snake_case (Underscore Case)

**Definition**: All lowercase words separated by underscores.

**Usage**:
- C/C++ function names, variable names
- Python function names, variable names (less common in SAP APIs)
- Database column names (typically)
- Constants combined with uppercase (see [Constants](#constants))

**Pattern**: `first_word_lowercase_rest_words_lowercase_separated_by_underscores`

**Examples**:
```
✅ customer_address
✅ get_order_status
✅ is_active_user
✅ total_amount_due

❌ CustomerAddress (wrong convention - PascalCase)
❌ customer-address (wrong separator - hyphen)
❌ customerAddress (wrong style - camelCase)
```

### 5. UPPER_CASE (Constant Case)

**Definition**: All uppercase words separated by underscores.

**Usage**:
- Constants (any language)
- Macros and preprocessor directives
- Enum values
- Static final fields

**Pattern**: `FIRST_WORD_UPPERCASE_REST_WORDS_UPPERCASE_SEPARATED_BY_UNDERSCORES`

**Examples**:
```
✅ MAX_LENGTH
✅ DEFAULT_TIMEOUT
✅ API_VERSION
✅ HTTP_STATUS_OK

❌ MaxLength (wrong convention - PascalCase)
❌ max_length (wrong case - not uppercase)
❌ MAX-LENGTH (wrong separator - hyphen)
```

---

## Acronym Guidelines

### When to Use Acronyms

**Use acronyms when**:
- Widely recognized in industry: `HTTP`, `REST`, `OData`, `OAuth`, `JSON`
- Shorter and clearer than full form: `ID` (vs. identifier)
- Standard SAP terminology: `SAP`, `ERP`, `HCM`, `S/4HANA`
- Product/system names: `HANA`, `Ariba`, `Concur`

**Avoid acronyms when**:
- Rarely used or highly specialized
- Abbreviation is longer than full word: `auth` (not standard abbreviation)
- Creates ambiguity: `AP` (could mean many things)
- Not commonly used in documentation
- Would make name less readable

### Acronym Capitalization Rules

#### 2-3 Letter Acronyms in camelCase

**Rule**: Treat as single word
- First word camelCase: lowercase acronym
- Subsequent words camelCase: uppercase acronym (sometimes)

**Examples**:
```
✅ httpStatusCode (HTTP is first word, lowercase h)
✅ getHttpResponse (HTTP is not first word, stays HTTP or httpResponse depending on style)
✅ jsonSchema (JSON is first word, lowercase j)
✅ parseJsonData (JSON not first word)

❌ HTTPStatusCode (all uppercase - wrong for camelCase)
❌ httpstatusCode (lowercase status - consistency issue)
```

**Best Practice**: For clarity with acronyms, prefer:
- `httpStatusCode` not `HTTPStatusCode`
- `jsonParser` not `JSONParser` or `jsonparser`

#### 4+ Letter Acronyms in camelCase

**Rule**: Treat as regular word, capitalize normally
- First word: lowercase
- Subsequent words: capitalize first letter

**Examples**:
```
✅ oauthToken
✅ getOauthToken
✅ odata4Service
✅ parseOdataResponse

❌ OAUTHToken (all uppercase - hard to read)
❌ oauthtoken (no capitalization on subsequent word)
```

#### Acronyms in PascalCase

**Rule**: Capitalize all letters of acronym when starting word
- If acronym is entire name: all caps
- If acronym starts compound word: capitalize only first letter, rest lowercase

**Examples**:
```
✅ HTTPHandler (acronym at start of PascalCase)
✅ JsonParser (four+ letters - first letter capital only)
✅ OAuthToken (four+ letters - but commonly seen as OAuth)
✅ RestClient (REST as first part)

❌ HttpHandler (HTTP should be uppercase when first)
❌ JSONParser (all caps looks wrong in PascalCase)
```

#### Acronyms at End of Name

**Rule**: Always capitalize fully

**Examples**:
```
✅ customerID (ID not Id)
✅ processingXML (XML not Xml)
✅ jsonToXML (XML not Xml)
✅ parseJSON (JSON not Json)

❌ customerId (wrong casing of acronym)
❌ processingXml (wrong casing)
```

#### Special Cases

**Known Pattern: ID**

Special handling for "ID" (identifier):
```
✅ customerID (in camelCase context)
✅ getByID
✅ recordID
✅ setID

Note: Some style guides use "Id" in PascalCase, but "ID" is more common in SAP
```

**Known Pattern: HTTP/HTTPS**

```
✅ httpRequest
✅ httpsConnection
✅ getHttpStatus (or getHttpStatus)

NOT: httpRequest (though acceptable), HTTPSConnection
```

---

## REST and OData Naming

### Resource Naming

**Rule 1: Use Plural Forms for Collections**

- Collections of items: plural noun
- Single items/operations: singular noun
- Consistency throughout API

**Examples**:
```
✅ /orders (collection of orders)
✅ /orders/{orderId} (specific order)
✅ /orders/{orderId}/items (collection of items in order)
✅ /orders/{orderId}/items/{itemId} (specific item)

❌ /order (should be plural for collection)
❌ /orders/{orderId}/item (should be plural for collection)
```

**Rule 2: Use Correct Grammatical Form**

- Nouns should be concrete: `customer`, `product`, `invoice`
- Avoid gerunds (verb forms): `creating` (not preferred)
- Avoid verbs entirely: HTTP methods provide the verb

**Examples**:
```
✅ /suppliers (noun)
✅ /purchase-orders (noun)
✅ /inventory (noun, singular for mass noun)

❌ /get-suppliers (verb + noun - verb should be HTTP method)
❌ /creating-orders (verb form not appropriate)
```

**Rule 3: Use American English Spelling**

- Consistent with SAP documentation standards
- Examples: `color` not `colour`, `organization` not `organisation`

**Examples**:
```
✅ /organizations
✅ /capitalExpenditures
✅ /licenses

❌ /organisations
❌ /capitalExpenditures (British: expenditures)
❌ /licences (British)
```

**Rule 4: Avoid Technical Jargon in Resource Names**

- Focus on business entities and concepts
- Hide implementation from API consumers

**Examples**:
```
✅ /employees (business entity)
✅ /payroll (business concept)

❌ /employee-records (too specific to implementation)
❌ /payroll-database (reveals database concept)
❌ /emp-pay (too abbreviated)
```

### Parameter Naming

**Rule 1: Use camelCase for Query and Body Parameters**

- Consistency with most API conventions
- Readability in JSON/code context

**Examples**:
```
✅ GET /orders?customerId=123&orderStatus=PENDING
✅ {"firstName": "John", "lastName": "Doe"}
✅ /employees?includeTerminated=false

❌ GET /orders?customer_id=123 (snake_case)
❌ {"first-name": "John"} (kebab-case)
```

**Rule 2: Use Descriptive Parameter Names**

- Full words better than abbreviations
- Context in parameter name

**Examples**:
```
✅ customerId (clear - refers to customer)
✅ createdStartDate (clear - start of date range)
✅ includeInactiveRecords

❌ cId (abbreviation not clear)
❌ startDt (abbreviation unclear)
❌ incInact (abbreviated - hard to read)
```

**Rule 3: Common Parameter Naming Patterns**

| Parameter Type | Naming Pattern | Examples |
|---|---|---|
| ID/Identifier | `{entityName}Id` | `customerId`, `invoiceId`, `supplierId` |
| Filter | `{fieldName}` or `filter{FieldName}` | `status`, `orderStatus`, `filterByStatus` |
| Sorting | `sort`, `sortBy`, `orderBy` | `sortBy=dateCreated`, `orderBy=name` |
| Pagination | `pageSize`, `pageNumber`, `offset`, `limit` | `pageSize=50`, `offset=100`, `limit=25` |
| Boolean flags | `is{Condition}`, `include{Item}` | `isActive`, `includeArchived`, `includePrices` |
| Dates | `{action}{Noun}Date` | `createdDate`, `startDate`, `endDate` |
| Range | `{field}{StartEnd}` | `priceStart`, `priceEnd`, `dateFrom`, `dateTo` |
| Search | `search`, `query`, `keyword` | `search=john`, `query=invoice` |

### URI Structure

**Rule 1: Use Forward Slashes for Hierarchy**

- Clear parent-child relationships
- Reflect data model structure

**Examples**:
```
✅ /companies/{companyId}/departments/{deptId}/employees/{empId}
✅ /orders/{orderId}/items/{itemId}
✅ /projects/{projectId}/tasks/{taskId}/subtasks

❌ /companies/departments/employees (no IDs, ambiguous)
❌ /employee/{empId}/order/{orderId} (illogical relationship)
```

**Rule 2: Use Path Parameters for Resource Identification**

- IDs and specific resource selection in path
- Filtering and options in query parameters

**Examples**:
```
✅ /orders/{orderId}/items (path for hierarchy)
✅ /orders?customerId=123&status=PENDING (query for filtering)
✅ DELETE /orders/{orderId} (path for specific resource)

❌ /orders?id=123 (ID should be in path for REST)
❌ /orders/{status}/{date} (filtering should use query params)
```

**Rule 3: Keep URIs Readable and Concise**

- Logical, predictable structure
- Easy to remember and construct
- Not excessively deep (3-4 levels typically good)

**Examples**:
```
✅ /products/{id}/reviews
✅ /customers/{id}/orders/{orderId}/items

❌ /api/v1/resources/products/by-id/{id}/related/reviews (too verbose)
❌ /p/{id}/r (too abbreviated)
```

**Rule 4: Avoid Verbs in URIs (Use HTTP Methods Instead)**

- Verbs belong in HTTP methods
- Nouns belong in URIs

**Examples**:
```
✅ POST /orders (create order)
✅ PUT /orders/{id} (update order)
✅ DELETE /orders/{id} (delete order)
✅ GET /orders (list orders)

❌ POST /createOrder (verb in URI)
❌ GET /listOrders (verb in URI)
❌ DELETE /removeOrder/{id} (verb in URI)
```

### HTTP Method Usage

**Standard HTTP Methods and When to Use**:

| Method | Purpose | Idempotent | Cacheable | Resource |
|--------|---------|-----------|-----------|----------|
| `GET` | Retrieve resource | Yes | Yes | Safe read |
| `POST` | Create new resource | No | No | Collection |
| `PUT` | Replace entire resource | Yes | No | Specific item |
| `PATCH` | Partial update | No (usually) | No | Specific item |
| `DELETE` | Remove resource | Yes | No | Specific item |
| `HEAD` | Like GET but no body | Yes | Yes | Specific item |
| `OPTIONS` | Describe communication options | Yes | No | Any |

**Examples**:
```
✅ GET /orders (retrieve list)
✅ POST /orders (create new order)
✅ GET /orders/{id} (retrieve specific order)
✅ PUT /orders/{id} (replace entire order)
✅ PATCH /orders/{id} (partial update)
✅ DELETE /orders/{id} (delete order)

❌ GET /createOrder (use POST instead)
❌ POST /orders/{id} (use PUT or PATCH for update)
❌ GET /deleteOrder/{id} (use DELETE instead)
```

### camelCase Rules in REST APIs

**When to Use camelCase in REST**:
- Query parameters: `?customerId=123&orderStatus=PENDING`
- JSON request/response bodies
- Field names in payloads

**Examples**:
```
✅ GET /orders?customerId=123
✅ {
     "customerId": 123,
     "orderStatus": "PENDING",
     "totalAmount": 500.00,
     "lineItems": []
   }

❌ GET /orders?customer_id=123 (snake_case - not camelCase)
❌ {
     "customer-id": 123 (kebab-case - not camelCase)
   }
```

**When camelCase May Not Apply in URIs**:
- Some organizations prefer kebab-case for URIs
- Be consistent within your organization
- Parameter names in query strings: use camelCase (most common)

---

## Native Library Naming

### Java APIs

#### Classes and Interfaces

**Interfaces** (Java-specific):
- Use descriptive noun-based names in UpperCamelCase
- Do NOT use "I" prefix (discouraged in Java style guides)
- Examples: `Comparable`, `Serializable`, `DataProvider`, `EventListener`
- If disambiguation is needed, use descriptive suffixes: `DataProviderInterface` (rare)

**Abstract Classes**:
- Start with "Abstract": `AbstractProcessor`, `AbstractFactory`
- Use descriptive noun: `AbstractConnectionPool`

**Regular Classes**:
- UpperCamelCase: `CustomerOrder`, `PaymentProcessor`
- Noun phrase or single noun

**Exceptions**:
- End with "Exception": `InvalidOrderException`, `PaymentProcessingException`
- Extend appropriate exception base class

**Examples**:
```
✅ public class CustomerOrder { }
✅ public interface IProperty { }
✅ public abstract class AbstractProcessor { }
✅ public class InvalidOrderException extends Exception { }

❌ public class Customer_Order { } (snake_case)
❌ public interface PropertyInterface { } (redundant)
❌ public class customerOrder { } (lowerCamelCase for class)
```

#### Methods

**Naming Convention**: lowerCamelCase, verb/verb phrase

**Getters**: `get` + property name
**Setters**: `set` + property name
**Boolean queries**: `is` + condition, `has` + item, `can` + action

**Examples**:
```
✅ public String getCustomerName() { }
✅ public void setCustomerName(String name) { }
✅ public boolean isActive() { }
✅ public boolean hasChildren() { }
✅ public boolean canDelete() { }
✅ public List<Order> getActiveOrders() { }
✅ public void processPayment(Payment payment) { }

❌ public String GetCustomerName() { } (PascalCase for method)
❌ public boolean active() { } (no is/has prefix)
❌ public void get_customer_name() { } (snake_case)
❌ public String getCustomer_Name() { } (mixed conventions)
```

#### Parameters

**Naming Convention**: lowerCamelCase, noun/noun phrase

**Rule**: Descriptive names even if short variable scope

**Examples**:
```
✅ public void processOrder(Order order, Customer customer, Date dueDate) { }
✅ public String concatenate(String first, String second) { }
✅ public boolean validate(PaymentRequest request, AccountInfo account) { }

❌ public void processOrder(Order o, Customer c, Date d) { } (single letters)
❌ public String concatenate(String s1, String s2) { } (generic)
```

#### Constants

**Naming Convention**: UPPER_CASE with underscores

**Rule**: All caps, underscores between words

**Examples**:
```
✅ public static final int MAX_BATCH_SIZE = 100;
✅ public static final String DEFAULT_ENCODING = "UTF-8";
✅ public static final long TIMEOUT_MILLISECONDS = 5000L;

❌ public static final int maxBatchSize = 100; (lowerCamelCase)
❌ public static final String default-encoding = "UTF-8"; (kebab-case)
```

#### Java Packages

**Naming Convention**: Lowercase, dot-separated, reversed domain format

**Rule**: `com.{company}.{product}.{module}`

**Examples**:
```
✅ com.sap.portal.directory
✅ com.sap.btp.environment
✅ com.sap.hana.database
✅ org.springframework.framework (third-party example)

❌ Com.SAP.Portal.Directory (wrong case)
❌ com.sap.Portal.Directory (mixed case)
❌ SAP.Portal.Directory (no reverse domain)
```

### JavaScript APIs

#### Classes and Constructors

**Naming Convention**: UpperCamelCase

**Examples**:
```
✅ class CustomerOrder { }
✅ class PaymentProcessor { }
✅ function DataProvider() { } (constructor function)

❌ class customerOrder { } (lowerCamelCase)
❌ class Customer_Order { } (snake_case)
```

#### Functions and Methods

**Naming Convention**: lowerCamelCase, verb/verb phrase

**Getters**: `get` + property name or direct property access
**Boolean queries**: `is` + condition, `has` + item, `can` + action

**Examples**:
```
✅ function processOrder(order) { }
✅ function getCustomerName() { }
✅ function isActive() { }
✅ function hasChildren() { }
✅ const validatePayment = (payment) => { }

❌ function ProcessOrder(order) { } (PascalCase)
❌ function process_order(order) { } (snake_case)
```

#### Variables and Properties

**Naming Convention**: lowerCamelCase

**Examples**:
```
✅ const customerName = "John";
✅ let totalAmount = 0;
✅ this.isProcessing = false;
✅ const defaultTimeout = 5000;

❌ const customer_name = "John"; (snake_case)
❌ const CUSTOMER_NAME = "John"; (UPPER_CASE)
```

#### Constants

**Naming Convention**: UPPER_CASE with underscores (or lowerCamelCase if scoped to module)

**Examples**:
```
✅ const MAX_BATCH_SIZE = 100;
✅ const DEFAULT_ENCODING = "UTF-8";
✅ const TIMEOUT_MILLISECONDS = 5000;

❌ const maxBatchSize = 100; (for module-level constants)
```

#### JavaScript Namespaces

**Naming Convention**: Nested objects or modules following package conventions

**Examples**:
```
✅ sap.portal.directory
✅ sap.hana.database
✅ sap.btp.cf.deploy

✅ // Using ES6 modules
   export const portalDirectory = { }
   export const hanaDatabase = { }

❌ SAP.Portal.Directory (all caps)
❌ sap_portal_directory (snake_case)
```

### .NET APIs

#### Classes and Interfaces

**Interfaces**:
- Start with capital "I": `IProperty`, `IResource`, `IIterator`
- Use noun phrases: `IDataProvider`, `IEventListener`
- UpperCamelCase throughout

**Abstract Classes**:
- Start with "Abstract": `AbstractProcessor`, `AbstractFactory`
- Use descriptive noun

**Classes**:
- UpperCamelCase: `CustomerOrder`, `PaymentProcessor`
- Noun or noun phrase

**Exceptions**:
- End with "Exception": `InvalidOrderException`, `PaymentProcessingException`

**Examples**:
```
✅ public class CustomerOrder { }
✅ public interface IProperty { }
✅ public abstract class AbstractProcessor { }
✅ public class InvalidOrderException : Exception { }

❌ public class Customer_Order { } (snake_case)
❌ public interface Property { } (no I prefix)
```

#### Methods and Properties

**Naming Convention**: UpperCamelCase (verb/verb phrase)

**Rule**: Different from Java - use UpperCamelCase even for methods

**Examples**:
```
✅ public string GetCustomerName() { }
✅ public void SetCustomerName(string name) { }
✅ public bool IsActive { get; set; }
✅ public List<Order> GetActiveOrders() { }
✅ public void ProcessPayment(Payment payment) { }

❌ public string getCustomerName() { } (lowerCamelCase in Java style)
❌ public bool isActive { } (property should be UpperCamelCase)
```

#### Properties (C#)

**Naming Convention**: UpperCamelCase, noun/noun phrase

**Examples**:
```
✅ public string CustomerName { get; set; }
✅ public bool IsActive { get; private set; }
✅ public int OrderCount { get; }
✅ public DateTime CreatedDate { get; set; }

❌ public string customerName { } (lowerCamelCase)
❌ public bool is_active { } (snake_case)
```

#### Parameters

**Naming Convention**: lowerCamelCase

**Examples**:
```
✅ public void ProcessOrder(Order order, Customer customer, DateTime dueDate) { }
✅ public string Concatenate(string first, string second) { }

❌ public void ProcessOrder(Order Order, Customer Customer) { }
❌ public void ProcessOrder(Order o, Customer c) { }
```

#### Constants

**Naming Convention**: UPPER_CASE with underscores or UpperCamelCase (often UpperCamelCase in .NET)

**Examples**:
```
✅ public const int MaxBatchSize = 100;
✅ public const string DefaultEncoding = "UTF-8";
✅ public const int DEFAULT_TIMEOUT_MILLISECONDS = 5000;

❌ public const int max_batch_size = 100;
❌ public const string defaultEncoding = "UTF-8"; (lowerCamelCase for constants is less common)
```

#### .NET Namespaces

**Naming Convention**: UpperCamelCase, dot-separated

**Rule**: Reflects company/organization and logical grouping

**Examples**:
```
✅ Sap.Data.Hana
✅ Sap.Portal.Directory
✅ Sap.BusinessTechnology.Platform
✅ Microsoft.AspNetCore.Mvc

❌ sap.data.hana (lowercase)
❌ Sap_Data_Hana (underscores)
❌ SAP.DATA.HANA (all caps)
```

### C/C++ APIs

#### Functions

**Naming Convention**: lowercase_with_underscores

**Examples**:
```
✅ void process_order(order_t* order);
✅ char* get_customer_name(customer_t* customer);
✅ bool validate_payment(payment_t* payment);
✅ struct list* create_order_list();

❌ void ProcessOrder(order_t* order); (PascalCase)
❌ void processOrder(order_t* order); (camelCase)
```

#### Macros

**Naming Convention**: UPPER_CASE with underscores

**Examples**:
```
✅ #define MAX_BUFFER_SIZE 1024
✅ #define DEFAULT_TIMEOUT_MS 5000
✅ #define SAP_ORDER_VERSION "1.0"

❌ #define maxBufferSize 1024 (camelCase)
❌ #define max-buffer-size 1024 (kebab-case)
```

#### Type Definitions (typedef)

**Naming Convention**: lowercase_with_underscores, often with `_t` suffix

**Examples**:
```
✅ typedef struct { ... } customer_t;
✅ typedef int order_id_t;
✅ typedef enum { ... } payment_status_t;

❌ typedef struct { ... } Customer;
❌ typedef struct { ... } CUSTOMER;
```

#### Enums

**Values**: UPPER_CASE with underscores

**Examples**:
```
✅ enum payment_status {
     PAYMENT_STATUS_PENDING,
     PAYMENT_STATUS_APPROVED,
     PAYMENT_STATUS_REJECTED
   };

❌ enum payment_status {
     Pending,
     Approved,
     Rejected
   };
```

#### Variables

**Naming Convention**: lowercase_with_underscores

**Examples**:
```
✅ int customer_count = 0;
✅ char* customer_name;
✅ bool is_active = true;
✅ size_t buffer_size = 1024;

❌ int customerCount = 0; (camelCase)
❌ char* CustomerName; (PascalCase)
```

#### Constants

**Naming Convention**: UPPER_CASE with underscores

**Examples**:
```
✅ #define DEFAULT_BUFFER_SIZE 1024
✅ const int MAX_CONNECTIONS = 100;
✅ static const char* SAP_VERSION = "1.0";

❌ const int maxConnections = 100; (camelCase)
❌ #define max_buffer_size 1024 (lowercase - not constant)
```

---

## Common Mistakes to Avoid

### Naming Mistakes

#### 1. Inconsistent Casing

**Problem**: Using different casing conventions for similar elements.

```
❌ BAD:
{
  "customerName": "John",
  "customer_age": 30,
  "CustomerStatus": "ACTIVE"
}

✅ GOOD:
{
  "customerName": "John",
  "customerAge": 30,
  "customerStatus": "ACTIVE"
}
```

**Why**: Inconsistency confuses developers, makes code harder to remember, increases errors.

**How to Fix**: Choose one convention and apply consistently throughout API.

---

#### 2. Abbreviations Without Clear Meaning

**Problem**: Using abbreviations that are unclear or non-standard.

```
❌ BAD:
GET /emps/{empId}/depts/{deptId}
{
  "eaddr": "john@company.com",
  "sal": 50000,
  "yrHired": 2020
}

✅ GOOD:
GET /employees/{employeeId}/departments/{departmentId}
{
  "emailAddress": "john@company.com",
  "salary": 50000,
  "yearHired": 2020
}
```

**Why**: Abbreviations require documentation and memory burden.

**How to Fix**: Use full words unless abbreviation is universally known (ID, HTTP, REST).

---

#### 3. Single-Letter Variable Names

**Problem**: Using single letters for variables, parameters, or endpoints.

```
❌ BAD:
public Order p(Customer c, Item i) {
  int q = i.getQty();
  return new Order(c, i, q);
}

GET /o?c=123&s=PENDING

✅ GOOD:
public Order processOrder(Customer customer, Item item) {
  int quantity = item.getQuantity();
  return new Order(customer, item, quantity);
}

GET /orders?customerId=123&status=PENDING
```

**Why**: Single letters provide no context and make code unmaintainable.

**How to Fix**: Use full descriptive names even for loop variables in public APIs.

---

#### 4. Non-English or Misspelled Words

**Problem**: Using non-English or incorrectly spelled words.

```
❌ BAD:
{
  "custmer": "John",         // misspelled "customer"
  "adress": "123 Main St",   // misspelled "address"
  "telefone": "555-1234"     // non-English "telephone"
}

✅ GOOD:
{
  "customer": "John",
  "address": "123 Main St",
  "telephone": "555-1234"
}
```

**Why**: Misspellings create confusion and inconsistency.

**How to Fix**: Use American English spelling and standard dictionaries. Spell-check before publishing.

---

#### 5. Including "API" or "Service" in Name

**Problem**: Redundantly including "API", "Service", "System", etc. in API names.

```
❌ BAD:
- "Customer Orders API"
- "Invoice Management Service"
- "Payment Processing System APIs"

✅ GOOD:
- "Customer Orders"
- "Invoice Management"
- "Payment Processing"
```

**Why**: These terms are implied by context. Adding them increases verbosity without adding value.

**How to Fix**: Remove technical terms. Use business entity or concept names.

---

#### 6. Including "SAP" in Business API Names

**Problem**: Prefixing API names with "SAP" when context is already clear.

```
❌ BAD:
- "SAP Human Capital Management"
- "SAP Finance Reporting"
- "SAP Supply Chain"

✅ GOOD:
- "Human Capital Management"
- "Finance Reporting"
- "Supply Chain"
```

**Why**: "SAP" is already known context. Reduces clarity.

**How to Fix**: Use only when necessary for disambiguation.

---

#### 7. Mixing Naming Conventions

**Problem**: Mixing camelCase, snake_case, and PascalCase in same element.

```
❌ BAD:
GET /order_items?customer_ID=123&OrderStatus=PENDING
{
  "order_id": "123",
  "itemCount": 5,
  "total-amount": 500
}

✅ GOOD:
GET /orderItems?customerId=123&orderStatus=PENDING
{
  "orderId": "123",
  "itemCount": 5,
  "totalAmount": 500
}
```

**Why**: Mixed conventions are confusing and violate language-specific standards.

**How to Fix**: Choose convention per language and apply consistently.

---

#### 8. Verbs in Resource Names

**Problem**: Using verbs or verb phrases for resource names instead of relying on HTTP methods.

```
❌ BAD:
GET /getOrders
POST /createOrder
PUT /updateOrder/{id}
DELETE /removeOrder/{id}

✅ GOOD:
GET /orders
POST /orders
PUT /orders/{id}
DELETE /orders/{id}
```

**Why**: HTTP methods provide verbs. Duplicating creates redundancy.

**How to Fix**: Use nouns for resources, HTTP methods for actions.

---

#### 9. Acronym Casing Issues

**Problem**: Inconsistent capitalization of acronyms.

```
❌ BAD:
{
  "HTTPStatus": 200,
  "JsonFormat": "compact",
  "oAuthToken": "abc123",
  "restfulAPI": "v2"
}

✅ GOOD:
{
  "httpStatus": 200,
  "jsonFormat": "compact",
  "oauthToken": "abc123",
  "restfulAPI": "v2" (or "restfulApi" depending on style guide)
}
```

**Why**: Inconsistent acronym casing looks unprofessional and confuses developers.

**How to Fix**: Apply acronym rules consistently (see [Acronym Guidelines](#acronym-guidelines)).

---

#### 10. Past Tense for Present Actions

**Problem**: Using past tense for methods/operations that perform present actions.

```
❌ BAD:
public void orderCreated(Order order) { }
public void getOrderProcessed() { }
public void validatePaymentSubmitted() { }

✅ GOOD:
public void createOrder(Order order) { }
public void getProcessedOrder() { }
public void validatePaymentSubmission() { }
```

**Why**: APIs describe what they do now, not what was done.

**How to Fix**: Use present tense for method names.

---

#### 11. Unclear Boolean Naming

**Problem**: Using unclear or inverted boolean names.

```
❌ BAD:
GET /orders?notCancelled=true
public boolean disabled;
public boolean noErrors;

✅ GOOD:
GET /orders?status=ACTIVE
public boolean isActive;
public boolean hasErrors;
```

**Why**: Boolean names should be clear and positive. Double negatives are confusing.

**How to Fix**: Use "is", "has", or "can" prefixes with positive conditions.

---

#### 12. Underscore Overuse

**Problem**: Using underscores excessively or in wrong places.

```
❌ BAD:
public void get_customer_address_by_id(long _cust_id) { }
GET /api/v1/resources/_/orders?_sort=_date

✅ GOOD:
public void getCustomerAddressById(long customerId) { }
GET /api/v1/orders?sort=date
```

**Why**: Excessive underscores reduce readability.

**How to Fix**: Use underscores only for constants and snake_case contexts (C/C++).

---

### REST/OData Specific Mistakes

#### 13. Inconsistent Plural/Singular

**Problem**: Mixing singular and plural forms in collections.

```
❌ BAD:
GET /orders/{id}/item
GET /products
GET /supplier/{id}/contact

✅ GOOD:
GET /orders/{id}/items
GET /products
GET /suppliers/{id}/contacts
```

**Why**: Inconsistency breaks URI patterns and confuses developers.

**How to Fix**: Always use plural for collections, singular for individual items.

---

#### 14. Query Parameters in Path

**Problem**: Putting filtering/query logic in path instead of query parameters.

```
❌ BAD:
GET /orders/PENDING/2024-01-01
GET /employees/ACTIVE/NEW_YORK

✅ GOOD:
GET /orders?status=PENDING&createdDate=2024-01-01
GET /employees?status=ACTIVE&location=NEW_YORK
```

**Why**: Query parameters are semantic home for filtering/sorting.

**How to Fix**: Use path for resource identification, query parameters for filtering.

---

#### 15. Inconsistent ID Naming

**Problem**: Using different ID names for same entity.

```
❌ BAD:
GET /orders/{orderId}
GET /orders/{orderId}/items/{id}
GET /orders/{order_id}/customer/{customerId}

✅ GOOD:
GET /orders/{orderId}
GET /orders/{orderId}/items/{itemId}
GET /orders/{orderId}/customer/{customerId}
```

**Why**: Inconsistent ID naming breaks predictability.

**How to Fix**: Use `{entityName}Id` pattern consistently.

---

### Native Library Specific Mistakes

#### 16. Method Names Without Verbs

**Problem**: Methods named as nouns instead of verb phrases.

```
❌ BAD (Java):
public void order(Customer customer) { }
public String address() { }

✅ GOOD (Java):
public void createOrder(Customer customer) { }
public String getAddress() { }
```

**Why**: Methods perform actions, so verb phrases are more semantic.

**How to Fix**: Use verb/verb phrase for method names.

---

#### 17. Inconsistent Getter/Setter Naming

**Problem**: Using inconsistent patterns for accessors.

```
❌ BAD (Java):
public String getName() { }
public void setName(String value) { }
public void age(int years) { }         // not a getter
public int retrieveAge() { }           // inconsistent

✅ GOOD (Java):
public String getName() { }
public void setName(String name) { }
public int getAge() { }
public void setAge(int age) { }
```

**Why**: Consistent accessor patterns aid discoverability and reduce learning curve.

**How to Fix**: Use `get`/`set` pattern consistently for properties.

---

#### 18. Class Names as Verbs

**Problem**: Using verb phrases for class names instead of noun phrases.

```
❌ BAD:
public class CreateOrder { }
public class ProcessPayment { }
public class ValidateAddress { }

✅ GOOD:
public class OrderProcessor { }
public class PaymentProcessor { }
public class AddressValidator { }

// Or if returning result:
public class Order { }
public class Payment { }
public class Address { }
```

**Why**: Classes are entities/concepts (nouns), not actions (verbs).

**How to Fix**: Use noun-based class names, potentially with descriptive suffix (-Processor, -Handler, -Factory, etc.).

---

#### 19. Interface Naming (Language-Specific)

**C#/.NET Convention**: Use "I" prefix for interfaces.

```
✅ GOOD (.NET):
public interface IDataProvider { }
public interface IOrderRepository { }
```

**Java Convention**: Do NOT use "I" prefix (actively discouraged).

```
✅ GOOD (Java):
public interface DataProvider { }
public interface OrderRepository { }
public interface Comparable { }
```

**C++ Convention**: Follow project style guide (no universal rule).
- Preferred: Descriptive names or Abstract/Factory prefixes
- Examples: `DataProvider`, `AbstractProvider`, `ProviderFactory`

**Why**: Different languages have different established conventions. Java style guides (including Google Java Style Guide, Oracle conventions) discourage the "I" prefix as redundant.

**How to Fix**: Apply language-specific conventions:
- **C#/.NET**: Add "I" prefix
- **Java**: Use descriptive names without prefix
- **C++**: Follow project style guide

---

#### 20. Parameter Names That Repeat Class Name

**Problem**: Using same name for parameter as containing class.

```
❌ BAD (Java):
public class Order {
  public void setOrder(Order order) { }
  public Order getOrder() { }
}

✅ GOOD (Java):
public class Order {
  // Properties, not duplicate parameter names
  public int id;
  public String status;

  // Methods with clear parameter names
  public void update(Order newOrder) { }
  public static Order fromJson(String json) { }
}
```

**Why**: Parameter names should distinguish intent, not repeat class context.

**How to Fix**: Use descriptive parameter names that clarify purpose (newOrder, updatedOrder, etc.).

---

## Reference Tables

### Complete Naming Convention Matrix

| Element | Java | JavaScript | .NET | C/C++ | REST URI | REST JSON |
|---------|------|-----------|------|-------|----------|-----------|
| **Classes** | `UpperCamelCase` | `UpperCamelCase` | `UpperCamelCase` | `lowercase_snake` | N/A | N/A |
| **Interfaces** | `IUpperCamelCase` | `IUpperCamelCase` | `IUpperCamelCase` | `lowercase_snake` | N/A | N/A |
| **Methods** | `lowerCamelCase` | `lowerCamelCase` | `UpperCamelCase` | `lowercase_snake` | N/A | N/A |
| **Functions** | N/A | `lowerCamelCase` | N/A | `lowercase_snake` | N/A | N/A |
| **Properties** | `lowerCamelCase` | `lowerCamelCase` | `UpperCamelCase` | `lowercase_snake` | N/A | camelCase |
| **Variables** | `lowerCamelCase` | `lowerCamelCase` | `lowerCamelCase` | `lowercase_snake` | N/A | N/A |
| **Parameters** | `lowerCamelCase` | `lowerCamelCase` | `lowerCamelCase` | `lowercase_snake` | camelCase | camelCase |
| **Constants** | `UPPER_CASE` | `UPPER_CASE` | `UpperCamelCase` | `UPPER_CASE` | N/A | N/A |
| **Enums** | `UpperCamelCase` (type), `UPPER_CASE` (values) | `UpperCamelCase` (type), `UPPER_CASE` (values) | `UpperCamelCase` (type), `UpperCamelCase` (values) | `enum` name, `UPPER_CASE` (values) | N/A | N/A |
| **Resources** | N/A | N/A | N/A | N/A | Plural noun | N/A |
| **Query Params** | N/A | N/A | N/A | N/A | camelCase | N/A |
| **Packages** | `com.company.product` | `module.namespace` | `Company.Product` | `company_module` | N/A | N/A |

### Common Pattern Templates

#### API Naming Patterns

| Pattern | Template | Example |
|---------|----------|---------|
| **Business Entity** | Noun phrase | "Customer Orders", "Supplier Management" |
| **Business Process** | Noun phrase | "Invoice Approval", "Payment Processing" |
| **Business Concept** | Noun phrase | "Budgeting", "Forecasting", "Consolidation" |
| **Technical Layer** | Noun + type | Not recommended - avoid in names |

#### URI Pattern Templates

| Use Case | Pattern | Example |
|----------|---------|---------|
| **Collection** | `/resources` | `/orders`, `/employees` |
| **Specific Item** | `/resources/{id}` | `/orders/{orderId}` |
| **Sub-resource** | `/resources/{id}/subresources` | `/orders/{orderId}/items` |
| **Sub-resource Item** | `/resources/{id}/subresources/{id}` | `/orders/{orderId}/items/{itemId}` |
| **Query** | `/resources?param=value` | `/orders?status=PENDING` |
| **Filter + Sort** | `/resources?filter&sort` | `/orders?customerId=123&sort=date` |
| **Pagination** | `/resources?pageNumber&pageSize` | `/orders?pageNumber=1&pageSize=50` |

#### Method Naming Pattern Templates

**Java/JavaScript**:

| Action | Template | Example |
|--------|----------|---------|
| Create | `create{Entity}` | `createOrder()`, `createInvoice()` |
| Retrieve | `get{Entity}` | `getOrder()`, `getOrderList()` |
| Update | `update{Entity}` | `updateOrder()`, `updateOrderStatus()` |
| Delete | `delete{Entity}` | `deleteOrder()` |
| Check | `is{Condition}` | `isActive()`, `isValid()` |
| Check | `has{Property}` | `hasChildren()`, `hasError()` |
| Find | `find{Entity}By{Property}` | `findOrderByCustomerId()` |
| Process | `process{Entity}` | `processPayment()`, `processOrder()` |
| Validate | `validate{Entity}` | `validateOrder()`, `validatePayment()` |

**.NET/C++**:

| Action | Template | Example |
|--------|----------|---------|
| Create | `Create{Entity}` | `CreateOrder()`, `CreateInvoice()` |
| Retrieve | `Get{Entity}` | `GetOrder()`, `GetOrderList()` |
| Update | `Update{Entity}` | `UpdateOrder()`, `UpdateOrderStatus()` |
| Delete | `Delete{Entity}` | `DeleteOrder()` |
| Process | `Process{Entity}` | `ProcessPayment()`, `ProcessOrder()` |

#### Parameter Naming Pattern Templates

| Concept | Pattern | Example |
|---------|---------|---------|
| **Identifier** | `{entity}Id` | `customerId`, `orderId`, `invoiceId` |
| **Status/Type** | `{entity}Status` | `orderStatus`, `paymentStatus` |
| **Boolean flag** | `is{Condition}` | `isActive`, `isArchived` |
| **Boolean flag** | `include{Item}` | `includeDetail`, `includeTax` |
| **Date range** | `{field}Start`, `{field}End` | `dateStart`, `dateEnd` |
| **Date range** | `{field}From`, `{field}To` | `dateFrom`, `dateTo` |
| **Search** | `search`, `query`, `keyword` | `search=john`, `query=invoice` |
| **Sorting** | `sortBy`, `sort`, `order` | `sortBy=date`, `order=asc` |
| **Pagination** | `pageNumber`, `pageSize`, `offset`, `limit` | `pageNumber=1`, `limit=50` |
| **Filtering** | `filter{Property}` | `filterByStatus`, `filterByDate` |

---

## Naming Decision Trees

### Choosing Casing Convention

```
┌─ What language/platform?
│
├─ REST/OData API URIs
│  └─ camelCase or kebab-case?
│     ├─ camelCase: Common in JSON APIs, matches JSON fields
│     └─ kebab-case: Readable, human-friendly URIs
│
├─ REST/OData JSON Fields
│  └─ Use: camelCase (standard)
│
├─ Java
│  ├─ Classes? → UpperCamelCase
│  ├─ Methods/Variables? → lowerCamelCase
│  ├─ Constants? → UPPER_CASE
│  └─ Packages? → lowercase.dot.separated
│
├─ JavaScript
│  ├─ Classes? → UpperCamelCase
│  ├─ Functions/Variables? → lowerCamelCase
│  ├─ Constants? → UPPER_CASE
│  └─ Modules? → lowercase.dot.separated or camelCase
│
├─ .NET (C#)
│  ├─ Classes/Methods/Properties? → UpperCamelCase
│  ├─ Private fields? → _privateFieldName or lowerCamelCase
│  ├─ Constants? → UpperCamelCase or UPPER_CASE
│  └─ Namespaces? → Company.Product.Module
│
└─ C/C++
   ├─ Functions/Variables? → lowercase_snake_case
   ├─ Macros/Constants? → UPPER_CASE
   ├─ Types/Structs? → lowercase_snake_case_t (with _t suffix)
   └─ Enums? → UPPER_CASE values
```

### Choosing Resource Naming Pattern

```
┌─ What are you naming?
│
├─ REST/OData Resource
│  ├─ Collection?
│  │  └─ Use plural noun: /orders, /employees, /suppliers
│  │
│  ├─ Individual item?
│  │  └─ Use singular with ID: /orders/{orderId}
│  │
│  └─ Sub-resource?
│     └─ Parent/children hierarchy: /orders/{orderId}/items
│
├─ Query Parameter
│  ├─ Filtering by status?
│  │  └─ Use field name: status, orderStatus
│  │
│  ├─ Filtering by ID?
│  │  └─ Use: {entityName}Id, e.g., customerId
│  │
│  ├─ Pagination?
│  │  └─ Use standard: pageNumber, pageSize, offset, limit
│  │
│  └─ Boolean flag?
│     └─ Use is/include prefix: isActive, includeTax
│
└─ Native Library API
   ├─ Public class?
   │  └─ Noun/Noun phrase: OrderProcessor, PaymentHandler
   │
   ├─ Method?
   │  └─ Verb/Verb phrase: processOrder(), getCustomerName()
   │
   ├─ Parameter?
   │  └─ Noun/Noun phrase: customer, paymentAmount, orderDate
   │
   └─ Constant?
      └─ UPPER_CASE: MAX_BATCH_SIZE, DEFAULT_TIMEOUT
```

### Choosing Between Verb Patterns

```
┌─ What action do you need?
│
├─ Create new entity
│  └─ Use: create{Entity}() or POST /resources
│
├─ Get/Read entity
│  └─ Use: get{Entity}() or GET /resources/{id}
│
├─ Update entity
│  └─ Use: update{Entity}() or PUT/PATCH /resources/{id}
│
├─ Delete entity
│  └─ Use: delete{Entity}() or DELETE /resources/{id}
│
├─ Process/Handle entity
│  └─ Use: process{Entity}(), handle{Entity}()
│
├─ Validate entity
│  └─ Use: validate{Entity}()
│
├─ Find entity by condition
│  └─ Use: find{Entity}By{Property}()
│
├─ Check boolean condition
│  ├─ Is something true?
│  │  └─ Use: is{Condition}() - returns boolean
│  │
│  ├─ Does entity have something?
│  │  └─ Use: has{Item}() - returns boolean
│  │
│  └─ Can we do something?
│     └─ Use: can{Action}() - returns boolean
│
└─ Transform/Convert
   └─ Use: to{Format}(), from{Format}(), parse{Type}()
```

---

## Best Practices Summary

### 10 Golden Rules of API Naming

**1. Be Descriptive**
- Names should be self-documenting
- Developer should understand purpose without documentation
- Avoid cryptic abbreviations

**2. Be Consistent**
- Use same conventions across entire API
- Don't mix camelCase and snake_case
- Maintain consistent terminology

**3. Be Language-Appropriate**
- Follow conventions of target language
- Java uses camelCase for methods; .NET uses UpperCamelCase
- REST APIs use camelCase or kebab-case for URIs

**4. Use English (American)**
- Standard spelling: "color" not "colour"
- Consistent with international SAP documentation
- Aids translation and localization

**5. Use Nouns for Things, Verbs for Actions**
- Entities: nouns (Customer, Order, Invoice)
- Operations: verbs (create, update, delete, process)
- Resources: plural nouns (/orders, /employees)

**6. Avoid Technical Jargon in Business APIs**
- Focus on business concepts
- Hide implementation details
- Use terms users understand

**7. Don't Include Redundant Words**
- No "API" in API names
- No "REST" in REST API names
- No "Object" after class names
- No "Manager" or "Handler" unless it adds meaning

**8. Use Standard Patterns**
- Follow established conventions in your domain
- Use pattern templates for consistency
- Document chosen patterns

**9. Review with Users**
- Ensure names make sense to API consumers
- Validate technical accuracy
- Get feedback from diverse team members

**10. Keep It Simple**
- Shorter names are better (if still clear)
- Avoid unnecessary complexity
- Regular words over technical jargon

### Checklist Before Publishing

```
Naming Conventions Pre-Publication Checklist:

[ ] API Name
    [ ] No "API" suffix
    [ ] Proper title case capitalization
    [ ] No technical specifics (REST, OData, v2)
    [ ] No "SAP" prefix (unless needed for disambiguation)
    [ ] Uses nouns, not verbs/prepositions

[ ] Resource Names (REST/OData)
    [ ] Plural forms for collections
    [ ] Singular + ID for individual items
    [ ] American English spelling
    [ ] Consistent across all resources
    [ ] No verbs in URI paths

[ ] Parameter Names
    [ ] Consistent casing (camelCase recommended)
    [ ] Descriptive names (not abbreviated)
    [ ] Follows pattern for type: {entity}Id, is{Condition}, etc.
    [ ] No duplicate names across API

[ ] Method/Function Names
    [ ] Language-appropriate casing
    [ ] Verb/verb phrase format
    [ ] Consistent patterns: get/set, create/delete
    [ ] Clear intent without documentation

[ ] Class/Type Names
    [ ] Noun/noun phrase format
    [ ] Language-appropriate casing
    [ ] Interfaces prefixed with "I" (where applicable)
    [ ] Abstract classes marked clearly

[ ] Parameter Names
    [ ] Descriptive (no single letters in APIs)
    [ ] Follows language conventions
    [ ] Consistent across similar methods

[ ] Constants
    [ ] UPPER_CASE with underscores
    [ ] Meaningful names
    [ ] Grouped logically

[ ] Acronyms
    [ ] Only well-known acronyms used
    [ ] Consistent capitalization
    [ ] Follows language-specific rules

[ ] Overall
    [ ] No mixed conventions in same API
    [ ] Consistent terminology
    [ ] Reviewed by team/stakeholders
    [ ] Matches official standards (SAP API Style Guide)
```

---

## Quick Reference by Scenario

### Scenario 1: Building a REST API

**Steps**:
1. Name API using business concept (no "API" suffix)
2. Name resources using plural nouns
3. Use camelCase for query parameters and JSON fields
4. Use HTTP methods for verbs (GET, POST, PUT, DELETE)
5. Use {entityId} pattern for path parameters
6. Use camelCase for request/response fields

**Example**:
```
API Name: "Purchase Orders"

Resources:
GET /purchaseOrders                    // list
POST /purchaseOrders                   // create
GET /purchaseOrders/{orderId}          // get one
PUT /purchaseOrders/{orderId}          // update
DELETE /purchaseOrders/{orderId}       // delete

Query Parameters:
GET /purchaseOrders?supplierId=123&status=PENDING&limit=50

JSON Fields:
{
  "orderId": "PO-2024-001",
  "supplierId": 123,
  "orderDate": "2024-01-15",
  "totalAmount": 5000.00,
  "orderStatus": "PENDING"
}
```

### Scenario 2: Writing Java API

**Steps**:
1. Classes: UpperCamelCase nouns
2. Methods: lowerCamelCase verb phrases
3. Parameters: lowerCamelCase nouns
4. Constants: UPPER_CASE with underscores
5. Packages: lowercase.dot.separated
6. Interfaces: IUpperCamelCase

**Example**:
```java
package com.sap.procurement.orders;

public interface IOrderService {
    Order createOrder(Customer customer, List<OrderItem> items);
    Order getOrder(String orderId);
    void updateOrderStatus(String orderId, OrderStatus status);
    void deleteOrder(String orderId);
    boolean isOrderValid(Order order);
}

public class OrderProcessor {
    public static final int MAX_ORDER_SIZE = 100;
    public static final long DEFAULT_TIMEOUT_MS = 5000L;

    public void processOrder(Order order, Supplier supplier) {
        // implementation
    }

    private boolean validateOrder(Order order) {
        // implementation
    }
}
```

### Scenario 3: Documenting .NET API

**Steps**:
1. Classes/Methods/Properties: UpperCamelCase
2. Parameters: lowerCamelCase
3. Constants: UpperCamelCase
4. Namespaces: Company.Product.Module
5. Interfaces: IInterfaceName

**Example**:
```csharp
namespace Sap.Procurement.Orders
{
    public interface IOrderService
    {
        Order CreateOrder(Customer customer, List<OrderItem> items);
        Order GetOrder(string orderId);
        void UpdateOrderStatus(string orderId, OrderStatus status);
        void DeleteOrder(string orderId);
        bool IsOrderValid(Order order);
    }

    public class OrderProcessor
    {
        public const int MaxOrderSize = 100;
        public const long DefaultTimeoutMs = 5000L;

        public void ProcessOrder(Order order, Supplier supplier)
        {
            // implementation
        }

        private bool ValidateOrder(Order order)
        {
            // implementation
        }
    }
}
```

### Scenario 4: Writing JavaScript API

**Steps**:
1. Classes: UpperCamelCase
2. Functions/Methods: lowerCamelCase
3. Variables: lowerCamelCase
4. Constants: UPPER_CASE
5. Namespaces: module.namespace or nested objects

**Example**:
```javascript
// sap/procurement/orders/OrderService.js

class OrderService {
    constructor() {
        this.MAX_ORDER_SIZE = 100;
        this.DEFAULT_TIMEOUT_MS = 5000;
    }

    createOrder(customer, items) {
        // implementation
    }

    getOrder(orderId) {
        // implementation
    }

    updateOrderStatus(orderId, status) {
        // implementation
    }

    deleteOrder(orderId) {
        // implementation
    }

    isOrderValid(order) {
        // implementation
    }
}

module.exports = OrderService;
```

---

## Resources and References

### Official Standards
- **SAP API Style Guide**: https://github.com/SAP-docs/api-style-guide
- **OpenAPI Specification 3.0.3**: https://spec.openapis.org/oas/v3.0.3
- **OData v4.01**: https://www.odata.org/documentation/
- **Oracle Javadoc Guide**: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html
- **JSDoc 3**: https://jsdoc.app/
- **Microsoft .NET Guidelines**: https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines
- **Google Java Style Guide**: https://google.github.io/styleguide/javaguide.html
- **Airbnb JavaScript Style Guide**: https://github.com/airbnb/javascript
- **C++ Guidelines**: https://isocpp.github.io/CppCoreGuidelines/

### Related Documentation
- **REST API Best Practices**: https://restfulapi.net/
- **OData Best Practices**: https://www.odata.org/blog/
- **Naming Conventions Survey**: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintained By**: SAP Skills Team
**License**: MIT
