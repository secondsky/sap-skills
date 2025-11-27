---
name: sap-api-style
description: |
  This skill provides comprehensive guidance for documenting SAP APIs following official SAP API Style Guide standards.
  It should be used when creating or reviewing API documentation for REST, OData, Java, JavaScript, .NET, or C/C++ APIs.

  The skill covers naming conventions, documentation comments, OpenAPI specifications, quality checklists, deprecation policies,
  and manual documentation templates. It ensures consistency with SAP API Business Hub standards and industry best practices.

  Keywords: SAP API, REST, OData, OpenAPI, Swagger, Javadoc, JSDoc, XML documentation, API Business Hub, API naming,
  API deprecation, x-sap-stateInfo, Entity Data Model, EDM, documentation tags, API quality, API templates
license: GPL-3.0
metadata:
  version: "1.1.0"
  last_verified: "2025-11-27"
  source_version: "2025.01"
  source_commit: "902247f3afb6a0cb3fa110b284bb5d93a65c1268"
  source_license: "CC-BY-4.0"
---

# SAP API Style Guide

## Table of Contents

1. [Overview](#overview)
2. [When to Use This Skill](#when-to-use-this-skill)
3. [Quick Decision Tree](#quick-decision-tree)
4. [Core Principles](#core-principles)
5. [Quick Reference Tables](#quick-reference-tables)
6. [Templates Available](#templates-available)
7. [Reference Files](#reference-files)
8. [Instructions for Use](#instructions-for-use)
9. [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)
10. [External Resources](#external-resources)
11. [Updates and Maintenance](#updates-and-maintenance)

## Overview

This skill provides comprehensive guidance for documenting SAP APIs according to official SAP API Style Guide standards. It covers all major API types and documentation approaches used across the SAP ecosystem.

**Documentation Source**: https://github.com/SAP-docs/api-style-guide (76 files extracted)

**Last Verified**: 2025-11-21

## When to Use This Skill

Use this skill when:

- **Creating API documentation** for REST, OData, Java, JavaScript, .NET, or C/C++ APIs
- **Writing OpenAPI specifications** for SAP API Business Hub
- **Reviewing API names** for SAP naming convention compliance
- **Documenting API parameters, responses, operations** with proper formatting
- **Creating manual API documentation** using SAP templates
- **Writing documentation comments** in source code (Javadoc, JSDoc, XML comments)
- **Implementing API deprecation** following SAP lifecycle policies
- **Developing developer guides** or service documentation
- **Performing quality checks** on API documentation
- **Publishing APIs** to SAP API Business Hub

## Quick Decision Tree

### What Type of API?

```
REST/OData API
├─ Auto-generated (OpenAPI/Swagger)?
│  └─ references/rest-odata-openapi-guide.md
│     • OpenAPI specification standards
│     • Package, API, operation descriptions
│     • Parameters, responses, components
│     • SAP API Business Hub requirements
│
└─ Manually written?
   └─ references/manual-templates-guide.md
      • REST templates (2-level: overview → method)
      • OData templates (3-level: service → resource → operation)
      • Complete field requirements
      • templates/ directory for ready-to-use files

Native Library API
├─ Java → references/java-javascript-dotnet-guide.md
├─ JavaScript → references/java-javascript-dotnet-guide.md
├─ .NET (C#) → references/java-javascript-dotnet-guide.md
└─ C/C++ → references/java-javascript-dotnet-guide.md
    • Documentation comments structure
    • Language-specific tags
    • Templates for classes, methods, enums
    • Complete code examples
```

### What Task?

```
Naming
└─ references/naming-conventions.md
   • REST/OData naming (resources, parameters, URIs)
   • Native library naming (classes, methods, constants)
   • Common mistakes to avoid

Writing Descriptions
└─ references/rest-odata-openapi-guide.md
   • Package descriptions
   • API details (info object)
   • Operations, parameters, responses

Quality Assurance
└─ references/quality-processes.md
   • Complete API Quality Checklist
   • Review workflows
   • Development team guidelines

Deprecating APIs
└─ references/deprecation-policy.md
   • Lifecycle states (beta, active, deprecated, decommissioned)
   • Timeline requirements (12+ months support)
   • Required metadata (x-sap-stateInfo)

Developer Guides
└─ references/developer-guides.md
   • Structure guidelines
   • Content selection
   • Code sample standards
```

## Core Principles

### 1. Consistency Across SAP APIs

All SAP API documentation follows consistent conventions:
- **Naming**: Language-specific (camelCase, PascalCase, kebab-case)
- **Structure**: Hierarchical with clear navigation
- **Formatting**: Sentences start with capitals, end with periods
- **Language**: American English

### 2. API-Type-Specific Standards

| API Type | Standard | Tool | Documentation |
|----------|----------|------|---------------|
| REST | OpenAPI 3.0.3 | Swagger | [Spec](https://spec.openapis.org/) |
| OData | v4.01, v3.0, v2.0 | Various | [OData.org](https://www.odata.org/) |
| Java | Javadoc | javadoc | [Oracle](https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html) |
| JavaScript | JSDoc 3 | jsdoc | [JSDoc.app](https://jsdoc.app/) |
| .NET | XML Comments | DocFX | [Microsoft](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/) |
| C/C++ | Doxygen | doxygen | [Doxygen.nl](https://www.doxygen.nl/) |

### 3. Progressive Disclosure

Documentation organized hierarchically:
- **High-level overviews** provide context and navigation
- **Detailed references** cover specific APIs, methods, operations
- **Examples and templates** demonstrate practical usage

### 4. Quality Standards

All documentation must:
- ✅ Be reviewed by User Assistance (UA) developers
- ✅ Use consistent naming and terminology
- ✅ Include complete parameter and response descriptions
- ✅ Avoid sensitive data in examples
- ✅ Provide working code examples
- ✅ Maintain accurate links and cross-references

## Quick Reference Tables

### Character Limits

| Element | Limit | Use Case |
|---------|-------|----------|
| API Title | 80 | `info.title` in OpenAPI |
| API Short Text | 180 | `x-sap-shortText` |
| Package Short Desc | 250 | Package tile description |
| Operation Summary | 255 | Operation summary line |
| Description | 1024 | General descriptions |

### API Naming Rules

**General Rules** (all API types):
- ❌ Don't include "API" in name: ~~"Custom Forms API"~~ → ✅ "Custom Forms"
- ❌ Don't include "SAP" prefix: ~~"SAP Document Approval"~~ → ✅ "Document Approval"
- ❌ Don't use verbs: ~~"Configuring Portal"~~ → ✅ "Portal Configuration"
- ✅ Capitalize words properly
- ✅ Avoid technical specifics (REST, OData, etc.)

See `references/naming-conventions.md` for complete language-specific rules.

### Common Documentation Tags

**Java/JavaScript**:
- `@param <name> <description>` - Parameter documentation
- `@return <description>` - Return value
- `@throws <class> <description>` - Exception
- `@deprecated <description>` - Deprecation notice

**.NET**:
- `<summary>` - Brief description
- `<param name="">` - Parameter
- `<returns>` - Return value
- `<exception cref="">` - Exception

See `references/java-javascript-dotnet-guide.md` for complete tag reference.

### API Lifecycle States

| State | Definition | Support | Metadata Required |
|-------|-----------|---------|-------------------|
| **Beta** | Pre-production testing | No guarantees | `state: beta` |
| **Active** | Production-ready (default) | Full support | Optional |
| **Deprecated** | Replaced by successor | 12+ months | `state`, `deprecationDate`, `successorApi` |
| **Decommissioned** | Fully retired | None | Document removal |

See `references/deprecation-policy.md` for complete timeline and process requirements.

## Templates Available

Ready-to-use templates in `templates/` directory:

### REST API Templates (2-Level)
1. **rest-api-overview-template.md** - Resource-level overview
2. **rest-api-method-template.md** - Individual endpoint details

### OData API Templates (3-Level)
1. **odata-service-overview-template.md** - Complete service overview
2. **odata-resource-template.md** - Individual resource/entity set
3. **odata-operation-template.md** - Specific operation details

All templates include:
- Clear "How to Use" instructions
- [Placeholder text] for customization
- Complete section structure
- Working examples
- Inline guidance

## Reference Files

### Complete Guides Available

1. **rest-odata-openapi-guide.md** (2,800 lines)
   - Complete OpenAPI specification guidelines
   - Package, API, operation descriptions
   - Parameters, responses, components
   - Security schemes, tags, external docs
   - Character limits and anti-patterns

2. **manual-templates-guide.md** (2,765 lines)
   - REST API templates (2-level hierarchy)
   - OData API templates (3-level hierarchy)
   - Complete template structures
   - Field-by-field requirements
   - Best practices and examples

3. **naming-conventions.md** (2,059 lines)
   - REST/OData naming rules (resources, parameters, URIs)
   - Native library naming (classes, methods, constants, packages)
   - Language-specific conventions
   - Common mistakes with fixes
   - Decision trees and reference tables

4. **quality-processes.md** (1,774 lines)
   - Complete API Quality Checklist
   - Review workflows (developer + UA collaboration)
   - Development team guidelines
   - Common review findings and solutions
   - Process flowcharts

5. **java-javascript-dotnet-guide.md** (1,517 lines)
   - Documentation comments structure
   - Language-specific tags (Java, JavaScript, .NET, C/C++)
   - Templates for classes, methods, enums
   - Complete code examples
   - Best practices by language

6. **developer-guides.md** (704 lines)
   - Guide structure standards
   - Topic types (concept, reference, task)
   - Content selection criteria
   - Code sample standards (compilable, concise, commented)
   - Best practices

7. **deprecation-policy.md** (664 lines)
   - API lifecycle states (beta, active, deprecated, decommissioned)
   - Timeline requirements (12+ months support, 24+ months lifespan)
   - Required metadata (x-sap-stateInfo, artifact.json)
   - Decommission process
   - Complete examples

8. **glossary-resources.md** (472 lines)
   - Complete terminology definitions (API, OData, OpenAPI, etc.)
   - External resource links (standards, tools, SAP resources)
   - Quick reference tables
   - Tool documentation links

9. **PROGRESS_TRACKING.md** (333 lines)
   - Content extraction and organization tracking
   - Source file mapping from SAP documentation
   - Consolidation and adaptation notes

## Bundled Resources

This skill includes comprehensive documentation and templates organized for optimal use:

### Reference Guides (`references/`)
- 9 detailed reference files (10,861 total lines)
- Complete coverage of SAP API Style Guide standards
- Progressive disclosure architecture for efficient loading

### Template Files (`templates/`)
1. **rest-api-overview-template.md** (217 lines) - Level 1 REST overview
2. **rest-api-method-template.md** (477 lines) - Level 2 REST method details
3. **odata-service-overview-template.md** (411 lines) - Level 1 OData service
4. **odata-resource-template.md** (557 lines) - Level 2 OData resource
5. **odata-operation-template.md** (681 lines) - Level 3 OData operation

Total: 2,343 lines of ready-to-use templates

## Instructions for Use

### Step 1: Identify API Type

Determine if you're documenting REST, OData, Java, JavaScript, .NET, or C/C++ API.

### Step 2: Choose Approach

**Auto-Generated**: Write documentation comments in source code → Use appropriate tags → Submit for review

**Manual**: Select template from `templates/` → Customize [placeholders] → Follow hierarchy → Validate with checklist

### Step 3: Apply Standards

Consult appropriate reference file:
- **Naming**: `naming-conventions.md`
- **Descriptions**: `rest-odata-openapi-guide.md` or `java-javascript-dotnet-guide.md`
- **Quality**: `quality-processes.md`
- **Deprecation**: `deprecation-policy.md`

### Step 4: Quality Check

Before publishing:
1. Review against API Quality Checklist (`quality-processes.md`)
2. Verify naming conventions (`naming-conventions.md`)
3. Check character limits (see Quick Reference Tables above)
4. Validate no sensitive data in examples
5. Test all code examples
6. Verify links work
7. Obtain UA developer review

### Step 5: Publish

- **REST/OData**: Submit to SAP API Business Hub
- **Java/JavaScript/.NET**: Generate with appropriate tool (Javadoc, JSDoc, DocFX)
- **Developer Guides**: Publish to SAP Help Portal or product documentation

## Common Pitfalls to Avoid

**Naming**:
- ❌ Including "API": ~~"Custom Forms APIs"~~ → ✅ "Custom Forms"
- ❌ Using "SAP" prefix: ~~"SAP Document Approval"~~ → ✅ "Document Approval"
- ❌ Using verbs: ~~"Configuring Portal"~~ → ✅ "Portal Configuration"

**Descriptions**:
- ❌ Second person: ~~"This operation creates..."~~ → ✅ "Creates a new user"
- ❌ Generic responses: ~~"No content"~~ → ✅ "Product is out of stock"
- ❌ Repeating summary in description

**Documentation**:
- ❌ Skipping UA review
- ❌ Including sensitive data in examples
- ❌ Missing required tags
- ❌ Inconsistent terminology

See individual reference files for complete anti-patterns and fixes.

## External Resources

### Standards
- **OpenAPI Specification**: https://spec.openapis.org/oas/latest.html
- **OData v4.01**: https://www.odata.org/documentation/
- **Javadoc**: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html
- **JSDoc 3**: https://jsdoc.app/
- **Doxygen**: https://www.doxygen.nl/

### SAP Resources
- **SAP API Business Hub**: https://api.sap.com/
- **SAP Developer Center**: https://developers.sap.com/
- **SAP Help Portal**: https://help.sap.com/
- **SAP Community**: https://community.sap.com/

### Source
- **SAP API Style Guide**: https://github.com/SAP-docs/api-style-guide

## Updates and Maintenance

**Source Version**: SAP API Style Guide 2025.01 (verified against commit 902247f)

**Recent Changes**:
- Source repository updated 2025-10-28
- Reference file line counts verified and updated
- Added comprehensive Table of Contents for navigation
- Added Bundled Resources section for content discovery

**To Update This Skill**:
1. Check source repository for changes: https://github.com/SAP-docs/api-style-guide
2. Review "What's New in the Style Guide"
3. Update affected reference files
4. Update templates if standards changed
5. Update "Last Verified" date

**Quarterly Review Recommended**: Check for updates every 3 months

**Next Review**: 2026-02-27

---

**Skill Version**: 1.1.0
**Last Updated**: 2025-11-27
**License**: GPL-3.0
**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
