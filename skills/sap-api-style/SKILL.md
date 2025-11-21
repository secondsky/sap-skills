---
name: sap-api-style
description: |
  This skill provides comprehensive guidance for documenting SAP APIs following official SAP API Style Guide standards.
  It should be used when creating or reviewing API documentation for REST, OData, Java, JavaScript, .NET, or C/C++ APIs.

  The skill covers naming conventions, documentation comments, OpenAPI specifications, quality checklists, deprecation policies,
  and manual documentation templates. It ensures consistency with SAP API Business Hub standards and industry best practices.

  Keywords: SAP API, REST, OData, OpenAPI, Swagger, Javadoc, JSDoc, XML documentation, API Business Hub, API naming,
  API deprecation, x-sap-stateInfo, Entity Data Model, EDM, documentation tags, API quality, API templates
license: MIT
---

# SAP API Style Guide

## Overview

This skill provides comprehensive guidance for documenting SAP APIs according to official SAP API Style Guide standards. It covers all major API types and documentation approaches used across the SAP ecosystem.

**Documentation Source**: https://github.com/SAP-docs/api-style-guide

**Last Verified**: 2025-11-21

## When to Use This Skill

Use this skill when:

- **Creating API documentation** for REST, OData, Java, JavaScript, .NET, or C/C++ APIs
- **Writing OpenAPI specifications** for SAP API Business Hub
- **Reviewing API names** and ensuring they follow SAP naming conventions
- **Documenting API parameters, responses, or operations** with proper formatting
- **Creating manual API documentation** using SAP templates
- **Writing documentation comments** in source code (Javadoc, JSDoc, XML comments)
- **Implementing API deprecation** following SAP lifecycle policies
- **Developing developer guides** or service documentation
- **Performing quality checks** on API documentation
- **Publishing APIs** to SAP API Business Hub
- **Ensuring compliance** with SAP API documentation standards

## Quick Decision Tree

### 1. What Type of API Are You Documenting?

```
REST/OData API
├─ Auto-generated (OpenAPI/Swagger)?
│  └─ See: references/rest-odata-openapi-guide.md
│
└─ Manually written?
   └─ See: references/manual-templates-guide.md
      ├─ REST templates
      └─ OData templates (3-level hierarchy)

Native Library API
├─ Java?
│  └─ See: references/java-javascript-dotnet-guide.md (Java section)
│
├─ JavaScript?
│  └─ See: references/java-javascript-dotnet-guide.md (JavaScript section)
│
├─ .NET (C#)?
│  └─ See: references/java-javascript-dotnet-guide.md (.NET section)
│
└─ C/C++?
   └─ See: references/java-javascript-dotnet-guide.md (C/C++ section)
```

### 2. What Documentation Task Are You Performing?

```
Naming APIs
└─ See: references/naming-conventions.md
   ├─ REST/OData naming rules
   └─ Native library naming rules

Writing Descriptions
└─ See: references/rest-odata-openapi-guide.md (Descriptions section)
   ├─ Package descriptions
   ├─ API details
   ├─ Operations
   ├─ Parameters
   └─ Responses

Quality Assurance
└─ See: references/quality-processes.md
   ├─ API Quality Checklist
   ├─ Review Process
   └─ Development Team Guidelines

Deprecating APIs
└─ See: references/deprecation-policy.md
   ├─ Lifecycle states
   ├─ Timeline requirements
   └─ Metadata requirements

Creating Developer Guides
└─ See: references/developer-guides.md
   ├─ Structure guidelines
   ├─ Content selection
   └─ Code sample standards
```

## Core Principles

### 1. Consistency Across All SAP APIs

All SAP API documentation must follow consistent conventions to facilitate developer adoption. This includes:

- **Naming**: Use meaningful, clear names following language-specific conventions (camelCase, PascalCase, kebab-case)
- **Structure**: Organize documentation hierarchically with clear navigation
- **Formatting**: Start sentences with capital letters, end with periods
- **Language**: Use correctly spelled American English

### 2. API-Type-Specific Guidelines

Different API types require different documentation approaches:

| API Type | Documentation Approach | Key Tool/Standard |
|----------|------------------------|-------------------|
| REST | OpenAPI Specification 3.0.3 | Swagger/OpenAPI |
| OData | OData v4.01, v3.0, v2.0 | OASIS Open standard |
| Java | Javadoc comments | Oracle Javadoc tool |
| JavaScript | JSDoc comments | JSDoc 3 |
| .NET | XML documentation comments | Microsoft .NET standards |
| C/C++ | Doxygen comments | Doxygen tool |

### 3. Progressive Disclosure

Organize information hierarchically:

- **High-level overviews** provide context and navigation
- **Detailed references** cover specific APIs, methods, or operations
- **Examples and templates** demonstrate practical usage

### 4. Quality Standards

All API documentation must meet quality criteria:

- ✅ Reviewed by User Assistance (UA) developers
- ✅ Consistent naming and terminology
- ✅ Complete parameter and response descriptions
- ✅ Proper security considerations (no sensitive data in examples)
- ✅ Working code examples
- ✅ Accurate links and cross-references

## Documentation Workflows

### For Auto-Generated API Documentation

1. **Developers**: Write documentation comments in source code
2. **Developers**: Add appropriate tags (@param, @return, @throws, etc.)
3. **Developers**: Submit for UA review early in development cycle
4. **UA Team**: Review API names and descriptions for clarity
5. **UA Team**: Verify consistency and correctness
6. **Developers**: Implement feedback
7. **Both**: Validate generated output

**Key Requirement**: "Submit APIs for review as early as possible; late submissions put the review at risk."

### For Manually Written API Documentation

1. **Developers**: Prepare API specifications
2. **UA Developers**: Create documentation using SAP templates
3. **UA Developers**: Work with product teams on content
4. **Both**: Review and validate documentation
5. **UA Developers**: Publish to appropriate channels

**Available Templates**:
- REST API Overview Template (Level 1)
- REST API Method Template (Level 2)
- OData Service Overview Template (Level 1)
- OData Resource Template (Level 2)
- OData Operation Template (Level 3)

See `references/manual-templates-guide.md` for complete template details.

## Common Documentation Elements

### Package Descriptions (SAP API Business Hub)

**Package Title**:
- Reflect product or product line
- Capitalize words properly
- Include development phase: "(Alpha)" or "(Beta)" if applicable
- Example: "SAP SuccessFactors Employee Central"

**Short Description**:
- Maximum 250 characters
- Begin with imperative verb ("Create", "Build", "Manage")
- No period at the end
- Must be distinct from title

**Overview Description**:
- 2-3 sentences providing deeper context
- Address customers directly
- Line breaks using `\n` (no Markdown formatting currently)

### API Details (OpenAPI info Object)

Required fields:
- `title`: API name (max 80 characters)
- `version`: API release number
- `x-sap-shortText`: High-level description (max 180 characters)
- `description`: Long description (1-2 sentences)

### Operations Documentation

**Summary** (max 255 characters):
- Short operation summary appearing in API Reference view

**Description**:
- Begin with direct action verb (third-person: adds, creates, updates, gets, deletes)
- **Avoid** "This operation/method..."
- Include only supplementary information beyond summary
- Omit if no additional details needed

### Parameters

Required information:
- Parameter name
- Location (`in`): path, query, header, body, formData
- Required status (true/false)
- Data type
- Description (concise noun phrase)

### Responses

Document:
- Success codes with context-specific descriptions
- Known error codes with clear explanations
- **Avoid generic messages**: Use "Product is out of stock" not "No content"

## Naming Conventions

### REST and OData APIs

**Resources**:
- Use correctly spelled American English words
- lowerCamelCase or UpperCamelCase
- Plural for collections, singular for individual items
- Forward slashes separate resources in URIs
- Example: `/orders/{orderID}/items`

**Avoid**:
- Abbreviations and acronyms
- Concatenated values (`grossOrNet`)
- Yes/no for booleans (use `true/false`)
- Verbs in resource names (HTTP methods provide verbs)

### Native Library APIs

| Element | Convention | Example |
|---------|-----------|---------|
| Interfaces/Classes | UpperCamelCase noun/noun phrase | `RuleDefinition` |
| Interfaces | Start with capital "I" | `IProperty` |
| Abstract Classes | Start with "Abstract" | `AbstractProcessor` |
| Methods (Java/JS) | lowerCamelCase verb/verb phrase | `getCustomerAddress` |
| Methods (.NET/C++) | UpperCamelCase verb/verb phrase | `LoadDataset` |
| Parameters | lowerCamelCase noun/noun phrase | `userName` |
| Constants | UPPER_CASE with underscores | `MAX_LENGTH` |
| Java Packages | Lowercase, dot-separated, reversed domain | `com.sap.portal.directory` |
| .NET Namespaces | UpperCamelCase, dot-separated | `Sap.Data.Hana` |

**API Names (General)**:
- Don't include "API" in the name
- Capitalize words properly
- Exclude technical specifics (REST, OData, etc.)
- Avoid verbs/prepositions
- Omit "SAP" prefix
- Example: "Document Approval" not "SAP Document Approval REST API"

## Documentation Tags by Language

### Java & JavaScript Common Tags

**Block Tags**:
- `@param <name> <description>`: Parameter documentation
- `@return <description>`: Return value documentation
- `@throws <class> <description>`: Exception documentation
- `@deprecated <description>`: Deprecation notice
- `@see <reference>`: Cross-reference
- `@since <version>`: Version introduced
- `@version <version-number>`: Version information

**Inline Tags**:
- `{@code text}`: Code formatting (no HTML interpretation)
- `{@link package.class#member label}`: Hyperlink to documentation
- `{@linkplain package.class#member label}`: Plain text link
- `{@literal text}`: Literal text (no HTML interpretation)
- `{@value package.class#field}`: Constant value reference

For complete tag details, see `references/java-javascript-dotnet-guide.md`

### .NET Tags

**Primary Tags** (XML format):
- `<summary>`: Brief description
- `<param name="">`: Parameter documentation
- `<returns>`: Return value documentation
- `<exception cref="">`: Exception documentation
- `<remarks>`: Additional information
- `<example>`: Code examples
- `<see cref="">`: Cross-reference

### C/C++ Tags (Doxygen)

**Primary Tags**:
- `\file`: File-level documentation
- `\mainpage`: Main documentation page
- `\namespace`: Namespace documentation
- Standard tags: `\param`, `\return`, `\see`, etc.

## API Deprecation Policy

### Lifecycle States

Use `x-sap-stateInfo` attribute:

- **Beta**: Pre-production, potential incompatible changes
- **Active**: Production-ready (default status)
- **Deprecated**: Live but replaced by active successor
- **Decommissioned**: Retired from production

### Timeline Requirements

- **Minimum 12 months** support after deprecation announcement
- **Minimum 24 months** total lifespan in active/deprecated status before decommissioning

### Required Metadata

**OpenAPI Specification**:
```yaml
x-sap-stateInfo:
  state: deprecated
  deprecationDate: "2024-01-15"
  successorApi: "NewAPIName"
```

**Artifact.json**:
```json
{
  "changelog": [{
    "state": "deprecated",
    "date": "2024-01-15",
    "version": "1.5.0",
    "notes": "Deprecated in favor of NewAPIName"
  }]
}
```

For complete policy details, see `references/deprecation-policy.md`

## Quality Checklist

Before publishing API documentation:

### Auto-Generated Documentation

**Creating/Editing Specification Files**:
- [ ] Appropriate documentation tags for API type
- [ ] All required documentation comments present
- [ ] Clear, precise parameter descriptions
- [ ] Examples illustrating complex concepts
- [ ] No sensitive data in samples (addresses, credentials, etc.)

**Reviewing Specification Files**:
- [ ] Consistent description style and detail levels
- [ ] Tags consistently grouped and ordered
- [ ] UA developer reviewed all API names and descriptions
- [ ] All formatting correct and complete
- [ ] Documentation generates without errors
- [ ] All links function correctly
- [ ] Rendered output matches expectations

### Manually Written Documentation

**Completeness**:
- [ ] All API elements have descriptions and tags
- [ ] All required and relevant optional tags present
- [ ] Clear purpose, functionality, and usage communication
- [ ] Examples and cross-references included where appropriate

**Correctness and Consistency**:
- [ ] UA developer reviewed names and descriptions
- [ ] Uniform scope, quantity, and style across similar elements
- [ ] Consistent tag grouping and ordering
- [ ] Correct HTML formatting throughout

**Publication**:
- [ ] All links direct to intended pages
- [ ] Generated output functions as expected

For complete checklist, see `references/quality-processes.md`

## Templates Available

This skill includes ready-to-use templates for manual API documentation:

### REST API Templates

1. **REST API Overview** (`templates/rest-api-overview.md`)
   - Base URI
   - Permissions
   - Methods table
   - Common headers
   - Status codes

2. **REST API Method** (`templates/rest-api-method.md`)
   - Method description
   - Request details (URL, HTTP method, permissions)
   - Parameters
   - Request/response examples
   - Status codes

### OData API Templates

1. **OData Service Overview** (`templates/odata-service-overview.md`)
   - OData version
   - Root URI
   - Permissions
   - Feature support matrix
   - Entity Data Model
   - Resources listing

2. **OData Resource** (`templates/odata-resource.md`)
   - Resource description
   - CRUD operations
   - Custom operations (actions/functions)
   - Common headers
   - Status codes

3. **OData Operation** (`templates/odata-operation.md`)
   - URI and operation type
   - HTTP method
   - Permissions
   - Request/response details
   - Parameters
   - Examples

## Glossary of Key Terms

- **API Documentation Comment**: Combined descriptions and block tags in source code for generating API reference docs
- **Code Snippet**: Several lines of code illustrating API method usage
- **Deprecated**: API element no longer supported, marked with `x-sap-stateInfo` attribute
- **Operation**: HTTP method (GET, PUT, POST, DELETE) for manipulating endpoints
- **Parameter**: Option passed with a path (filtering, sorting criteria)
- **Path**: Endpoint or resource (e.g., `/users` or `/users/{id}`)
- **Response**: HTTP status code combined with outcome description
- **REST API**: Enables cross-platform CRUD operations over HTTP
- **Return Type/Value**: Data returned by methods

For complete glossary, see `references/glossary-resources.md`

## External Resources

Official standards and tools:

- **OpenAPI Specification 3.0.3**: https://spec.openapis.org/oas/v3.0.3
- **OData v4.01**: https://www.odata.org/documentation/
- **SAP API Business Hub**: https://api.sap.com/
- **Javadoc Tool**: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html
- **JSDoc 3**: https://jsdoc.app/
- **Doxygen**: https://www.doxygen.nl/
- **Microsoft .NET XML Comments**: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/

## Reference Files

For detailed guidance, consult these reference files:

1. **REST/OData OpenAPI Documentation** (`references/rest-odata-openapi-guide.md`)
   - Complete OpenAPI specification guidelines
   - Package, API, operation descriptions
   - Parameters, responses, components
   - Security schemes, tags, external docs
   - SAP API Business Hub requirements

2. **Manual Documentation Templates** (`references/manual-templates-guide.md`)
   - REST API templates (2-level hierarchy)
   - OData API templates (3-level hierarchy)
   - Template usage guidelines
   - Field descriptions and requirements

3. **Java/JavaScript/.NET Documentation** (`references/java-javascript-dotnet-guide.md`)
   - Documentation comments structure
   - Language-specific tags
   - Templates for classes, methods, enums, constants
   - Code examples

4. **Naming Conventions** (`references/naming-conventions.md`)
   - REST/OData naming rules
   - Native library naming rules
   - Common mistakes to avoid
   - Examples and anti-patterns

5. **Quality & Review Processes** (`references/quality-processes.md`)
   - API Quality Checklist
   - Review workflows
   - Development team guidelines
   - Best practices

6. **Deprecation Policy** (`references/deprecation-policy.md`)
   - API lifecycle states
   - Timeline requirements
   - Metadata specifications
   - Decommission process

7. **Developer Guides** (`references/developer-guides.md`)
   - Guide structure guidelines
   - Content selection criteria
   - Code sample standards
   - Topic type conventions

8. **Glossary & Resources** (`references/glossary-resources.md`)
   - Complete terminology definitions
   - External resource links
   - Tool references

## Instructions for Use

### Step 1: Identify Your API Type

Determine whether you're documenting:
- REST API (auto-generated or manual)
- OData API (auto-generated or manual)
- Java API
- JavaScript API
- .NET API
- C/C++ API

### Step 2: Choose Documentation Approach

**Auto-Generated**:
1. Write documentation comments in source code
2. Use appropriate tags for your language
3. Follow naming conventions strictly
4. Include examples for complex concepts
5. Submit for UA review early

**Manual**:
1. Select appropriate template from `templates/` directory
2. Customize template with your API details
3. Follow hierarchical structure (Level 1 → Level 2 → Level 3)
4. Link between levels for navigation
5. Validate against quality checklist

### Step 3: Apply Naming Conventions

Consult `references/naming-conventions.md` for:
- API names (no "API" suffix, capitalized, no "SAP" prefix)
- Resource names (plural for collections, camelCase)
- Method names (verb phrases, language-specific casing)
- Parameter names (noun phrases, camelCase)
- Constant names (UPPER_CASE with underscores)

### Step 4: Write Descriptions

Follow these rules:
- Start with capital letter, end with period
- Use third-person for APIs: "Creates a new order" (not "This API creates...")
- Use imperative for tasks: "Create a new order"
- Avoid implementation details
- Don't repeat information across sections
- Provide context-specific messages (not generic status descriptions)

### Step 5: Quality Check

Before publishing:
1. Review against API Quality Checklist (`references/quality-processes.md`)
2. Verify all required tags present
3. Check for security issues (no sensitive data in examples)
4. Validate consistent terminology
5. Test all code examples compile/run correctly
6. Verify all links work
7. Obtain UA developer review

### Step 6: Handle Deprecation (if applicable)

When deprecating APIs:
1. Set `x-sap-stateInfo` attribute to `deprecated`
2. Include `deprecationDate` and `successorApi`
3. Update `artifact.json` changelog
4. Plan 12+ month support period
5. Publish migration guidance
6. After support period, decommission properly

## Common Pitfalls to Avoid

### Naming
- ❌ Including "API" in API names: "Custom Forms APIs"
- ✅ Correct: "Custom Forms"

- ❌ Using technical details: "Supplier Data REST API"
- ✅ Correct: "Supplier Data"

- ❌ Using verbs: "Configuring Portal"
- ✅ Correct: "Portal Configuration"

### Descriptions
- ❌ "This operation creates a new user"
- ✅ "Creates a new user"

- ❌ Generic response: "No content"
- ✅ Context-specific: "Product is out of stock"

- ❌ Repeating summary in description
- ✅ Provide supplementary information or omit description

### Documentation Structure
- ❌ Mixing parameter descriptions in operation descriptions
- ✅ Separate parameter table with individual descriptions

- ❌ Including implementation details
- ✅ Focus on customer-relevant information

### Quality Issues
- ❌ Skipping UA review
- ✅ Submit early for review and implement feedback

- ❌ Including sensitive data in examples
- ✅ Use sanitized, generic example data

## Updates and Maintenance

This skill is based on the SAP API Style Guide (version 2021.01):

**Source Repository**: https://github.com/SAP-docs/api-style-guide/tree/main/docs

**To update this skill**:
1. Check the source repository for changes
2. Review "What's New in the Style Guide?" for updates
3. Update affected reference files
4. Update templates if standards changed
5. Test updated templates with real examples
6. Update "Last Verified" date

**Quarterly Review Recommended**: Check for SAP API Style Guide updates every 3 months

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-11-21
**License**: MIT
**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
