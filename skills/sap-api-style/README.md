# SAP API Style Guide – Skill

**Version**: 1.0.0
**License**: MIT
**Last Updated**: 2025-11-21
**Source**: https://github.com/SAP-docs/api-style-guide

---

## Overview

Documents SAP APIs following official SAP API Style Guide standards for REST, OData, Java, JavaScript, .NET, and C/C++ APIs.

## Auto-Trigger Keywords

This skill automatically activates when you mention:

### API Types
- REST API documentation
- OData API documentation
- OData service documentation
- Java API documentation
- JavaScript API documentation
- .NET API documentation
- C# API documentation
- C++ API documentation
- OpenAPI specification
- Swagger documentation
- Javadoc
- JSDoc
- XML documentation comments
- Doxygen documentation

### SAP-Specific
- SAP API Business Hub
- SAP API naming
- SAP API standards
- SAP API deprecation
- SAP API quality
- SAP API review
- SAP developer guide
- SAP service guide
- SAP REST API
- SAP OData service
- SAP Cloud Platform API
- SAP BTP API
- SAP Integration Suite

### Documentation Tasks
- API naming conventions
- API documentation comments
- API reference documentation
- API parameter documentation
- API response documentation
- OpenAPI info object
- OpenAPI components
- OpenAPI paths
- OpenAPI security
- OData entity model
- OData EDM
- OData metadata
- Entity Data Model

### Quality & Processes
- API quality checklist
- API review process
- API documentation standards
- API deprecation policy
- API lifecycle management
- x-sap-stateInfo
- API versioning
- API decommission

### Documentation Elements
- @param tag
- @return tag
- @throws tag
- @deprecated tag
- summary tag
- description tag
- package description
- method documentation
- class documentation
- interface documentation
- operation documentation
- endpoint documentation
- parameter description
- response description
- error code documentation
- status code documentation

### Templates
- REST API template
- OData API template
- API overview template
- API method template
- OData service template
- OData resource template
- OData operation template
- manual API documentation
- API documentation template

---

## When to Use

Use this skill when:

- **Creating REST or OData API documentation** for SAP systems
- **Writing OpenAPI specifications** for SAP API Business Hub
- **Documenting Java, JavaScript, .NET, or C/C++ APIs** with proper tags
- **Reviewing API names** for SAP naming convention compliance
- **Writing documentation comments** in source code (Javadoc, JSDoc, XML)
- **Creating manual API documentation** using SAP templates
- **Implementing API deprecation** following SAP policies
- **Performing quality checks** on API documentation
- **Publishing APIs** to SAP API Business Hub
- **Developing developer guides** for SAP services

---

## Key Features

### Comprehensive Coverage

- ✅ **REST API Documentation** (OpenAPI 3.0.3)
- ✅ **OData API Documentation** (v4.01, v3.0, v2.0)
- ✅ **Java API Documentation** (Javadoc)
- ✅ **JavaScript API Documentation** (JSDoc)
- ✅ **.NET API Documentation** (XML comments)
- ✅ **C/C++ API Documentation** (Doxygen)

### Reference Files (8 Comprehensive Guides)

1. **REST/OData OpenAPI Guide** (73KB, 2,794 lines)
   - Complete OpenAPI specification guidelines
   - Package, API, operation descriptions
   - Parameters, responses, components
   - SAP API Business Hub requirements

2. **Manual Templates Guide** (79KB, 2,761 lines)
   - REST API templates (2-level hierarchy)
   - OData API templates (3-level hierarchy)
   - Complete template structures
   - Field-by-field requirements

3. **Naming Conventions** (53KB, 2,042 lines)
   - REST/OData naming rules
   - Native library naming standards
   - Language-specific conventions
   - Common mistakes to avoid

4. **Quality & Review Processes** (53KB, 1,769 lines)
   - API Quality Checklist
   - Review workflows
   - Development team guidelines
   - Common review findings

5. **Java/JavaScript/.NET Guide** (Comprehensive)
   - Documentation comments structure
   - Language-specific tags
   - Templates for classes, methods, enums
   - Complete code examples

6. **Deprecation Policy** (Complete)
   - API lifecycle states
   - Timeline requirements
   - Metadata specifications
   - Decommission process

7. **Developer Guides** (Complete)
   - Guide structure standards
   - Content selection criteria
   - Code sample requirements
   - Topic type conventions

8. **Glossary & Resources** (Complete)
   - Complete terminology
   - External resource links
   - Tool references
   - Quick reference tables

### Template Files (5 Ready-to-Use Templates)

1. **REST API Overview Template** (Level 1)
2. **REST API Method Template** (Level 2)
3. **OData Service Overview Template** (Level 1)
4. **OData Resource Template** (Level 2)
5. **OData Operation Template** (Level 3)

### Progressive Disclosure

- **SKILL.md**: Quick decision trees and overview
- **References**: Detailed guidelines loaded when needed
- **Templates**: Ready-to-customize documentation templates

---

## Quick Start

### For REST APIs

```
1. Choose template: REST API Overview (Level 1)
2. Customize: Replace [placeholders] with your API info
3. Create methods: Use REST API Method template (Level 2)
4. Review: Check against API Quality Checklist
5. Publish: Submit to SAP API Business Hub
```

### For OData Services

```
1. Choose template: OData Service Overview (Level 1)
2. Document resources: Use OData Resource template (Level 2)
3. Document operations: Use OData Operation template (Level 3)
4. Review: Verify Entity Data Model (EDM)
5. Publish: Submit with $metadata endpoint
```

### For Java/JavaScript/.NET APIs

```
1. Write documentation comments in source code
2. Use appropriate tags (@param, @return, @throws, etc.)
3. Follow naming conventions for language
4. Submit for UA review early
5. Generate and verify output
```

---

## Skill Structure

```
sap-api-style/
├── SKILL.md                           # Main skill file
├── README.md                          # This file
│
├── references/                        # Detailed reference guides
│   ├── rest-odata-openapi-guide.md   # REST/OData OpenAPI docs
│   ├── manual-templates-guide.md     # Manual template reference
│   ├── java-javascript-dotnet-guide.md # Native library docs
│   ├── naming-conventions.md         # Naming standards
│   ├── quality-processes.md          # Quality & review processes
│   ├── deprecation-policy.md         # API lifecycle management
│   ├── developer-guides.md           # Developer guide standards
│   ├── glossary-resources.md         # Glossary & external resources
│   └── PROGRESS_TRACKING.md          # Content extraction tracking
│
└── templates/                         # Ready-to-use templates
    ├── rest-api-overview-template.md
    ├── rest-api-method-template.md
    ├── odata-service-overview-template.md
    ├── odata-resource-template.md
    └── odata-operation-template.md
```

---

## Examples

### Example 1: REST API Naming

❌ **Incorrect**:
- "SAP Document Approval REST API"
- "Get Customer Data"
- "employee-service"

✅ **Correct**:
- "Document Approval"
- "getCustomerData"
- "employeeService"

### Example 2: Operation Description

❌ **Incorrect**:
```yaml
description: "This operation creates a new customer in the system"
```

✅ **Correct**:
```yaml
summary: "Create customer"
description: "Creates a new customer with provided details. Returns customer ID on success."
```

### Example 3: Deprecation

```yaml
x-sap-stateInfo:
  state: deprecated
  deprecationDate: "2024-01-15"
  successorApi: "Customer Management API v2.0"
```

---

## Character Limits Quick Reference

| Element | Limit | Use Case |
|---------|-------|----------|
| API Title | 80 | `info.title` |
| API Short Text | 180 | `x-sap-shortText` |
| Package Short Desc | 250 | Package tile description |
| Operation Summary | 255 | Operation summary line |
| Description | 1024 | General descriptions |

---

## External Resources

### Standards
- OpenAPI Specification 3.0.3: https://spec.openapis.org/oas/v3.0.3
- OData v4.01: https://www.odata.org/documentation/
- Javadoc Tool: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html
- JSDoc 3: https://jsdoc.app/
- Doxygen: https://www.doxygen.nl/

### SAP Resources
- SAP API Business Hub: https://api.sap.com/
- SAP Developer Center: https://developers.sap.com/
- SAP Help Portal: https://help.sap.com/
- SAP Community: https://community.sap.com/

### Source
- SAP API Style Guide: https://github.com/SAP-docs/api-style-guide

---

## Token Efficiency

This skill saves massive token overhead by:

- **Preventing trial-and-error** in API documentation formatting
- **Providing templates** instead of generating from scratch
- **Progressive disclosure** loading only relevant content
- **Reference lookup** instead of explaining standards repeatedly

**Estimated Savings**: 60-70% reduction in tokens vs. manual documentation creation

---

## Compliance

✅ Follows SAP official standards (verified 2025-11-21)
✅ Aligned with OpenAPI Specification 3.0.3
✅ Supports OData v4.01, v3.0, v2.0
✅ Compatible with SAP API Business Hub requirements
✅ Includes SAP-specific extensions (x-sap-stateInfo)

---

## Updates

### Version 1.0.0 (2025-11-21)

**Initial Release**:
- Complete extraction of 76 SAP API Style Guide files
- 8 comprehensive reference guides
- 5 ready-to-use templates
- Full coverage of REST, OData, Java, JavaScript, .NET, C/C++
- Progressive disclosure structure
- Production-tested templates

**Next Quarterly Review**: 2026-02-21

---

## Contributing

This skill is maintained as part of the SAP Skills repository:
- Repository: https://github.com/secondsky/sap-skills
- Issues: https://github.com/secondsky/sap-skills/issues
- License: MIT

---

## License

MIT License - See LICENSE file for details

---

**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
**Skill Version**: 1.0.0
**Last Verified Against SAP Standards**: 2025-11-21
