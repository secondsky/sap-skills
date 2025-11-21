# Developer and Service Guides

**Source**: https://github.com/SAP-docs/api-style-guide/tree/main/docs/60-developer-or-service-guide
**Last Verified**: 2025-11-21

---

## Table of Contents

1. [Overview](#overview)
2. [Purpose and Scope](#purpose-and-scope)
3. [Content Structure Guidelines](#content-structure-guidelines)
4. [Topic Types and Conventions](#topic-types-and-conventions)
5. [Content Selection Guidelines](#content-selection-guidelines)
6. [Code Sample Standards](#code-sample-standards)
7. [Best Practices](#best-practices)
8. [Examples](#examples)

---

## Overview

Developer and service guides are supplementary resources that explain how to use APIs, SDKs, and development platforms alongside API references.

### Relationship to API Reference Documentation

| Documentation Type | Purpose | Content |
|-------------------|---------|---------|
| **API Reference** | Technical specification | Auto-generated docs, parameters, responses, methods |
| **Developer Guide** | Practical usage | Concepts, tutorials, scenarios, best practices |

**Key Principle**: Developer guides complement API references by providing context, examples, and practical guidance that cannot be auto-generated.

---

## Purpose and Scope

### What Developer Guides Include

1. **Conceptual Information**
   - Goal, scope, and capabilities of an API
   - Architectural diagrams explaining API structure
   - System context and integration points
   - Business scenarios and use cases

2. **Code Quality Practices**
   - Secure programming guidelines
   - Resilience patterns and error handling
   - Performance optimization techniques
   - Best practices for API consumption

3. **Access & Setup**
   - Security requirements and authentication
   - Initial setup and configuration
   - Environment preparation
   - Prerequisites and dependencies

4. **Practical Usage**
   - Typical tasks and scenarios
   - Workflows combining multiple API calls
   - Sample code and tutorials
   - Common integration patterns

### Variability Across Products

Developer guides vary significantly in:
- **Scope**: From single API to entire platform
- **Complexity**: From simple tutorials to comprehensive system documentation
- **Depth**: From quick-start guides to architectural deep-dives
- **Audience**: From beginners to advanced developers

**Important Note**: Due to this variability, a one-size-fits-all standard is impractical. These guidelines provide flexible frameworks that technical writers adapt based on product needs and target audience.

---

## Content Structure Guidelines

### Fundamental Information Design

Developer guides should follow these structural principles:

1. **Separation by Type**
   - Separate chapters for **concepts**, **tasks**, and **reference** material
   - Clear boundaries between information types
   - Logical progression from concepts → tasks → reference

2. **Task-Oriented Approach**
   - Enable rapid developer task completion
   - Focus on practical outcomes
   - "How do I...?" questions should be easily answerable

3. **Consistent Title Conventions**
   - Use standardized titling patterns (see Topic Types below)
   - Maintain consistency throughout documentation
   - Make topics easily scannable

---

## Topic Types and Conventions

### Topic Type Matrix

| Type | Purpose | Title Format | Example | Content |
|------|---------|--------------|---------|---------|
| **Concept** | Introductions, overviews, background information | Noun phrase | "SAP HANA Cloud", "OAuth 2.0 Authentication" | Explains what something is, why it matters, how it works |
| **Reference** | API documentation, tables, specifications, syntax | Noun phrase | "SAP HANA Cloud JavaScript Reference", "API Endpoints" | Lists methods, parameters, configuration options |
| **Complex Task** | Tutorials, multi-step procedures with code | Gerund phrase (-ing) | "Developing SAP HANA Cloud Applications", "Building a Fiori App" | Step-by-step tutorials with code samples |
| **Detailed Task** | Single tasks with code samples | Gerund phrase (-ing) | "Creating an Application Project", "Configuring OAuth" | Specific how-to instructions |

### Title Examples by Type

**Concept Topics**:
- ✅ "API Authentication Overview"
- ✅ "Understanding OData Query Options"
- ✅ "SAP Cloud Platform Architecture"
- ❌ "How to Understand OAuth" (task format for concept)

**Reference Topics**:
- ✅ "Environment Variables Reference"
- ✅ "Configuration Parameters"
- ✅ "Error Code Catalog"
- ❌ "Configuring Environment Variables" (task format for reference)

**Task Topics**:
- ✅ "Implementing OAuth 2.0 Authentication"
- ✅ "Creating Your First API Request"
- ✅ "Deploying to Cloud Foundry"
- ❌ "OAuth Implementation" (noun phrase for task)

---

## Content Selection Guidelines

### Collaborate with Product Owners

**Key Principle**: "Don't try to cover all of the APIs in your product."

Work with product teams to:
1. **Identify Priority APIs**: Focus on most commonly used or business-critical APIs
2. **Define Key Use Cases**: Document typical scenarios, not every possibility
3. **Target Audience Needs**: Write for your primary developer persona
4. **Balance Coverage vs. Depth**: Deep coverage of important topics beats shallow coverage of everything

### Content Scope Decisions

#### Include:
- ✅ Customer-relevant information
- ✅ Business scenarios and use cases
- ✅ Integration patterns and workflows
- ✅ Authentication and security guidance
- ✅ Error handling patterns
- ✅ Performance best practices
- ✅ Migration guides for version changes

#### Exclude:
- ❌ Internal implementation details
- ❌ Duplicate SAP API Business Hub information
- ❌ Every possible API method (focus on common ones)
- ❌ Internal architecture not relevant to consumers
- ❌ Debugging information for SAP internal teams

### Depth vs. Breadth

**Guideline**: "Don't write a novel, keep the topics short and concise."

- **Short Topics**: 300-800 words for most topics
- **Long Tutorials**: 1000-2000 words maximum
- **Complex Topics**: Break into smaller, manageable subtopics
- **Progressive Disclosure**: Link to detailed information rather than including everything

### Diagram Guidelines

**Use Clear Diagrams**:
- Avoid excessive complexity
- Remove internal-only information
- Adapt internal architectural diagrams for external audiences
- Focus on customer-relevant flows and interactions

**Avoid Redundancy**:
- Don't duplicate diagrams unnecessarily
- Use one clear diagram instead of multiple similar ones
- Reference existing diagrams when appropriate

---

## Code Sample Standards

### Quality Requirements

All code samples must meet these criteria:

#### 1. Compilable Without Errors

**Requirement**: "Must compile without errors"

- Test all code before publication
- Verify with actual compiler/interpreter
- Include necessary imports and dependencies
- Handle version-specific syntax

**Bad Example** ❌:
```java
// This won't compile - missing imports
Customer customer = getCustomer();
```

**Good Example** ✅:
```java
import com.sap.customer.Customer;
import com.sap.customer.CustomerService;

CustomerService service = new CustomerService();
Customer customer = service.getCustomer("12345");
```

#### 2. Concise and Focused

**Requirement**: "Concise, containing only API-relevant code"

- Show only code necessary to demonstrate the concept
- Remove boilerplate unrelated to the API
- Focus on the API call itself and essential context

**Bad Example** ❌:
```java
public class CustomerExample {
    private static final Logger logger = LogManager.getLogger();
    private Configuration config;
    private MetricsCollector metrics;

    public CustomerExample() {
        this.config = new Configuration();
        this.metrics = new MetricsCollector();
        logger.info("Initializing example...");
    }

    public void demonstrateAPI() {
        logger.debug("Starting API call");
        metrics.startTimer();
        try {
            // Actual API usage buried in boilerplate
            Customer customer = api.getCustomer("12345");
            logger.debug("Customer retrieved: " + customer.getName());
        } catch (Exception e) {
            logger.error("Failed", e);
            metrics.recordError();
        } finally {
            metrics.stopTimer();
        }
    }
}
```

**Good Example** ✅:
```java
// Get a customer by ID
Customer customer = api.getCustomer("12345");
System.out.println("Customer: " + customer.getName());

// Error handling
try {
    customer = api.getCustomer("invalid");
} catch (NotFoundException e) {
    System.out.println("Customer not found");
}
```

#### 3. Sufficient Comments

**Requirement**: "Include sufficient comments for clarity"

- Explain **why**, not just **what**
- Comment complex logic or API-specific requirements
- Don't over-comment obvious code

**Bad Example** ❌:
```java
// Create customer service
CustomerService service = new CustomerService();
// Get customer
Customer customer = service.getCustomer("12345");
// Print customer name
System.out.println(customer.getName());
```

**Good Example** ✅:
```java
// Initialize service with default authentication
CustomerService service = new CustomerService();

// Retrieve customer by SAP customer number
// Note: Customer ID must be numeric string format
Customer customer = service.getCustomer("12345");

// Display full legal name (formatted by locale)
System.out.println(customer.getName());
```

#### 4. Easy Copy-Paste

**Requirement**: "Enable easy copy-paste into code editors"

- Use standard formatting (not proprietary)
- Include necessary context (imports, variables)
- Avoid line breaks in strings when possible
- Use consistent indentation

**Bad Example** ❌:
```java
Customer customer = api.
    getCustomer(
        "12345"
    );  // Awkward formatting
```

**Good Example** ✅:
```java
Customer customer = api.getCustomer("12345");
```

### Code Sample Patterns

#### Pattern 1: Basic API Call

```javascript
// Simple GET request example
const response = await fetch('https://api.sap.com/customers/12345', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});

const customer = await response.json();
console.log(customer);
```

#### Pattern 2: Error Handling

```java
try {
    Customer customer = service.getCustomer(customerId);
    processCustomer(customer);
} catch (NotFoundException e) {
    // Customer doesn't exist - handle gracefully
    logger.warn("Customer not found: " + customerId);
    return Optional.empty();
} catch (UnauthorizedException e) {
    // Authentication failed - refresh token
    refreshAuthToken();
    return getCustomerWithRetry(customerId);
}
```

#### Pattern 3: Complete Workflow

```python
# Complete workflow: Authenticate, retrieve, update customer

# Step 1: Authenticate
auth_token = authenticate(api_key, secret)

# Step 2: Retrieve customer data
customer = api.get_customer(
    customer_id="12345",
    auth_token=auth_token
)

# Step 3: Update customer information
customer['email'] = 'new.email@example.com'

# Step 4: Save changes
result = api.update_customer(
    customer_id="12345",
    data=customer,
    auth_token=auth_token
)

print(f"Update successful: {result['status']}")
```

---

## Best Practices

### 1. Progressive Learning

Structure content for developers at different skill levels:

**Beginner Level**:
- Quick start guides
- Simple, complete examples
- Step-by-step tutorials
- Heavy use of code samples

**Intermediate Level**:
- Common integration patterns
- Best practices
- Error handling strategies
- Performance optimization

**Advanced Level**:
- Complex workflows
- Custom extensions
- Advanced configuration
- Architecture patterns

### 2. Practical Focus

**Emphasize**:
- Real-world scenarios
- Working code examples
- Common pitfalls and solutions
- Typical workflows

**De-emphasize**:
- Theoretical concepts without application
- Every possible parameter combination
- Rarely-used features
- Internal implementation details

### 3. Tutorial Format for Complex Tasks

For complex multi-step processes:

1. **Break into Smaller Subtopics**: Each subtopic covers one logical step
2. **Clear Prerequisites**: State what readers need before starting
3. **Expected Outcomes**: Show what success looks like
4. **Troubleshooting**: Include common issues and solutions

**Example Structure**:
```
Tutorial: Building Your First Fiori Application
├── Prerequisites
│   ├── Required tools
│   ├── Account setup
│   └── Sample data
├── Part 1: Creating the Project
│   ├── Initialize project
│   ├── Configure manifest
│   └── Verify setup
├── Part 2: Building the UI
│   ├── Create view
│   ├── Add controls
│   └── Test locally
├── Part 3: Adding Data Binding
│   ├── Configure OData service
│   ├── Bind to controls
│   └── Test with real data
├── Part 4: Deployment
│   ├── Build for production
│   ├── Deploy to Cloud
│   └── Verify deployment
└── Troubleshooting
    ├── Common build errors
    ├── Connection issues
    └── Getting help
```

### 4. Avoid Duplication with API Business Hub

**Don't Duplicate**:
- ❌ API endpoint listings (available in API Business Hub)
- ❌ Parameter descriptions (auto-generated)
- ❌ Response schema definitions

**Do Provide**:
- ✅ Deeper analysis of when to use which endpoint
- ✅ Integration patterns combining multiple endpoints
- ✅ Business context for API usage
- ✅ Migration guides and version comparisons

### 5. Maintain and Update

- **Regular Reviews**: Update guides when APIs change
- **Version Notices**: Clearly indicate which API version guide applies to
- **Deprecation Warnings**: Mark outdated content prominently
- **Feedback Loops**: Collect and incorporate developer feedback

---

## Examples

### Example 1: Concept Topic

**Title**: "Understanding SAP OAuth 2.0 Authentication"

**Structure**:
```markdown
# Understanding SAP OAuth 2.0 Authentication

## What is OAuth 2.0?

OAuth 2.0 is an authorization framework that enables applications
to obtain limited access to user accounts on SAP services.

## Why Use OAuth 2.0?

- **Security**: Never expose user passwords to third-party applications
- **Limited Access**: Grant specific permissions, not full account access
- **Revocable**: Users can revoke access anytime
- **Standard**: Industry-standard protocol supported across SAP services

## How It Works

[Diagram: OAuth 2.0 Flow]

1. Application requests authorization
2. User grants permission
3. Application receives access token
4. Application uses token to access resources

## Grant Types

SAP supports three OAuth 2.0 grant types:

### Authorization Code (Recommended)
Best for server-side web applications...

### Client Credentials
Best for machine-to-machine communication...

### Refresh Token
Used to obtain new access tokens...

## Next Steps

- [Implementing OAuth 2.0 Authentication](#) (Task Guide)
- [OAuth Configuration Reference](#) (Reference)
```

### Example 2: Task Topic

**Title**: "Implementing OAuth 2.0 Client Credentials Flow"

**Structure**:
```markdown
# Implementing OAuth 2.0 Client Credentials Flow

This guide shows how to implement OAuth 2.0 authentication using
the Client Credentials grant type for server-to-server communication.

## Prerequisites

- SAP BTP account
- OAuth client ID and secret
- Node.js 14+ installed

## Step 1: Obtain Client Credentials

1. Log in to SAP BTP Cockpit
2. Navigate to Security → OAuth Clients
3. Click "Create New Client"
4. Copy client ID and secret

## Step 2: Request Access Token

```javascript
const fetch = require('node-fetch');

async function getAccessToken() {
  const credentials = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch('https://auth.sap.com/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&scope=read write'
  });

  const data = await response.json();
  return data.access_token;
}
```

## Step 3: Use Token for API Requests

```javascript
async function callAPI() {
  const token = await getAccessToken();

  const response = await fetch('https://api.sap.com/resource', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}
```

## Step 4: Handle Token Expiration

Tokens expire after 1 hour. Implement token refresh:

```javascript
let cachedToken = null;
let tokenExpiry = null;

async function getValidToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  // Request new token
  cachedToken = await getAccessToken();
  tokenExpiry = now + (3600 * 1000); // 1 hour

  return cachedToken;
}
```

## Troubleshooting

### "Invalid client credentials"
- Verify client ID and secret are correct
- Ensure credentials are base64 encoded properly

### "Insufficient scope"
- Check that your OAuth client has required scopes
- Request appropriate scopes in token request

## Next Steps

- [OAuth 2.0 Best Practices](#)
- [Authorization Code Flow](#)
- [Token Management Strategies](#)
```

### Example 3: Reference Topic

**Title**: "OAuth Configuration Parameters"

**Structure**:
```markdown
# OAuth Configuration Parameters

Complete reference for OAuth 2.0 configuration options.

## Token Endpoint

**URL**: `https://auth.sap.com/oauth/token`

## Request Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `grant_type` | Yes | OAuth grant type | `client_credentials` |
| `client_id` | Yes | OAuth client identifier | `sb-client-12345` |
| `client_secret` | Yes | OAuth client secret | `abc123...` |
| `scope` | No | Requested permissions | `read write` |

## Response Format

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

## Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `invalid_client` | Invalid credentials | Verify client ID/secret |
| `invalid_grant` | Grant type not supported | Use supported grant type |
| `invalid_scope` | Scope not available | Request valid scopes |
```

---

## Reference

### SAP Resources

- **SAP Help Portal**: https://help.sap.com/
- **SAP API Business Hub**: https://api.sap.com/
- **SAP Community**: https://community.sap.com/

### Related Documentation

- API Reference Documentation Standards
- API Quality Checklist
- Code Sample Guidelines

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
