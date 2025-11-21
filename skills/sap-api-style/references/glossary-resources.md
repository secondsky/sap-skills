# Glossary and External Resources

**Source**: https://github.com/SAP-docs/api-style-guide/
**Last Verified**: 2025-11-21

---

## Table of Contents

1. [Glossary](#glossary)
2. [External Resources](#external-resources)
3. [SAP-Specific Resources](#sap-specific-resources)
4. [Quick Reference](#quick-reference)

---

## Glossary

### A

**API (Application Programming Interface)**
An interface provided by an application for interacting with other applications. Enables software programs to exchange information across organizational boundaries by selectively exposing functionality.

**API Documentation Comment**
Combines descriptions and block tags in source code for generating API reference documentation. Used by documentation generators like Javadoc, JSDoc, and Doxygen.

**API Documentation Generators**
Tools like Javadoc, JSDoc, Doxygen, and Swagger that extract comments from source code and produce structured documentation.

### C

**Code Sample File**
A complete, working example demonstrating API features that ships with SDKs. More comprehensive than code snippets, showing real-world implementation patterns.

**Code Snippet**
Several lines of code illustrating API method usage. Typically embedded in documentation to demonstrate specific functionality.

**Component (OpenAPI)**
Reusable object definitions in OpenAPI Specification 3.0+ (called "Definitions" in version 2.0). Includes schemas, parameters, responses, examples, etc.

### D

**Decommissioned**
APIs that have been fully retired and cannot be used in production. Final state in API lifecycle.

**Definition (OpenAPI)**
See **Component**. Term used in OpenAPI Specification 2.0 for reusable objects.

**Demo Application**
A basic implementation provided with SDKs showing main API capabilities and typical usage patterns.

**Deprecated**
API elements no longer supported in future releases, marked with the `x-sap-stateInfo` attribute or `@deprecated` tag. Not encouraged for use but still functional.

**Documentation Tag**
Special marker instructing documentation generators how to format comment sections. Examples: `@param`, `@return`, `<summary>`, `\file`.

### E

**Entity (OData)**
Typed data object in OData Entity Data Model (EDM). Examples: Customer, Employee, Order.

**Entity Data Model (EDM)**
Structured data description in OData protocol defining entities, entity sets, relationships, and operations.

**Entity Set (OData)**
Named collection of entities. Example: "Customers" is an entity set containing Customer entities.

**Exception**
Documented errors occurring during method execution, typically using `@throws`, `@exception`, or `<exception>` tags.

### M

**Metadata (OData)**
XML document describing the structure of an OData service. Accessible at `$metadata` endpoint (e.g., `https://api.sap.com/odata/$metadata`).

### O

**OData (Open Data Protocol)**
A REST-based protocol for querying and updating data, built on HTTP, Atom/XML, and JSON standards. Maintained by OASIS Open.

**Operation (REST/OData)**
HTTP method (GET, PUT, POST, DELETE, PATCH) for manipulating endpoints or performing actions on resources.

**OpenAPI Specification**
Community-driven open specification for RESTful APIs under the OpenAPI Initiative. Version 3.0.3 is current standard.

### P

**Parameter**
Option passed with a path, such as filtering criteria, sorting options, or pagination controls. Can appear in path, query, header, body, or formData.

**Partner APIs**
APIs created by SAP partners for customers, published on the SAP API Business Hub.

**Path (REST/OData)**
Endpoint or resource in API URLs. Examples: `/users`, `/users/{id}`, `/orders/{orderId}/items`.

**Private APIs**
APIs restricting access to vendors, partners, or selected customers. Not publicly available.

**Public APIs**
APIs available in the public domain that become vendor-client contracts. Require careful versioning and deprecation management.

### R

**Resource (REST/OData)**
Concept or object that users want to control through HTTP requests. Identified by URIs and manipulated using HTTP methods.

**Response**
HTTP status code combined with outcome description, optionally including response body with data or error information.

**REST API (Representational State Transfer)**
Architectural style enabling cross-platform CRUD operations over HTTP. Focuses on resources rather than actions.

**Return Type/Value**
Data returned by methods, documented using `@return`, `@returns`, or `<returns>` tags.

### S

**Schema (OpenAPI)**
Data structure definition describing request/response formats. Defines properties, types, required fields, and validation rules.

**SPI (Service Provider Interface)**
Vendor-defined interface intended for third-party implementation, extending or customizing API functionality.

### X

**x-sap-stateInfo**
SAP-specific OpenAPI extension attribute defining API lifecycle state: beta, active, deprecated, or decommissioned.

---

## External Resources

### API Standards & Specifications

#### OpenAPI Specification

**URL**: https://spec.openapis.org/oas/v3.0.3

**Description**: The standard for RESTful APIs. A community-driven open specification within the OpenAPI Initiative for describing HTTP APIs in a machine-readable format.

**Use For**:
- REST API specification structure
- OpenAPI document format
- API schema definitions
- Operation documentation

**Current Version**: 3.0.3 (3.1.0 available)

#### OData Specification

**URL**: https://www.odata.org/documentation/

**Description**: The standard for OData maintained by OASIS Open. Defines protocol for querying and updating data over HTTP.

**Use For**:
- OData service structure
- EDM (Entity Data Model) design
- Query operation syntax
- OData conventions

**Supported Versions**: 4.01, 3.0, 2.0

### Documentation Tools

#### Java - Javadoc

**URL**: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html

**Description**: Oracle's guidance on "How to Write Doc Comments for the Javadoc Tool" through their Technology Network.

**Use For**:
- Java API documentation
- Javadoc tag reference
- Documentation comment format
- Tool usage and configuration

**Official Oracle Reference**: https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javadoc.html

#### JavaScript - JSDoc

**URL**: https://jsdoc.app/

**Description**: JSDoc 3 documentation generator available on GitHub. Comprehensive tag reference and examples.

**Use For**:
- JavaScript API documentation
- JSDoc tag syntax
- TypeScript documentation
- Node.js project documentation

**Tag Reference**: https://jsdoc.app/index.html#block-tags

**Markdown Support**: https://jsdoc.app/about-including-markdown.html

#### Microsoft .NET

**C# XML Documentation**
**URL**: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/

**Description**: Microsoft's official guidance for C# XML documentation comments.

**Use For**:
- .NET API documentation
- XML comment syntax
- Visual Studio integration
- IntelliSense support

**.NET Naming Guidelines**
**URL**: https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines

**Description**: Microsoft's official naming conventions for .NET libraries.

**Use For**:
- .NET naming standards
- PascalCase/camelCase usage
- Namespace organization
- Framework design guidelines

#### C/C++ - Doxygen

**URL**: https://www.doxygen.nl/

**Description**: Documentation generator supporting multiple languages including C++, C#, PHP, Java, and Python.

**Use For**:
- C/C++ API documentation
- Multi-language documentation
- Diagram generation
- Cross-platform documentation

**Manual**: https://www.doxygen.nl/manual/

#### Python - Sphinx

**URL**: https://www.sphinx-doc.org/

**Description**: Documentation generator for Python with reStructuredText support.

**Use For**:
- Python API documentation
- Python package documentation
- Technical documentation
- ReadTheDocs integration

### SAP-Specific Resources

#### SAP API Business Hub

**URL**: https://api.sap.com/

**Description**: Central repository for SAP's REST and OData API references. Provides interactive API exploration, testing, and documentation.

**Use For**:
- Publishing REST/OData APIs
- Discovering SAP APIs
- Testing API endpoints
- Downloading API specifications

**Login Required**: SAP account needed for full access

#### SAP Help Portal

**URL**: https://help.sap.com/

**Description**: Comprehensive SAP product documentation and help resources.

**Use For**:
- Product documentation
- Technical guides
- Configuration guides
- Release notes

#### SAP Developer Center

**URL**: https://developers.sap.com/

**Description**: Resources for SAP developers including tutorials, code samples, and developer guides.

**Use For**:
- Getting started tutorials
- Code samples
- Developer community
- Learning paths

**Tutorial Navigator**: https://developers.sap.com/tutorial-navigator.html

#### SAP Community

**URL**: https://community.sap.com/

**Description**: SAP's community platform for asking questions, sharing knowledge, and connecting with other developers.

**Use For**:
- Community support
- Best practices
- Code sharing
- Networking

#### SAP Business Accelerator Hub (formerly API Business Hub)

**URL**: https://api.sap.com/

**Description**: Updated name for SAP API Business Hub. Provides APIs, events, and integrations.

**Use For**:
- API discovery and exploration
- Integration content
- Pre-built integrations
- API package management

---

## SAP-Specific Resources

### SAP API Style Guide Repository

**URL**: https://github.com/SAP-docs/api-style-guide

**Description**: Official SAP API Style Guide source repository containing all documentation standards.

**Contents**:
- API naming guidelines
- REST/OData documentation standards
- Java/JavaScript/.NET documentation
- Manual template guidelines
- Deprecation policy
- Quality processes

**Last Updated**: 2021.01

**Clone Command**:
```bash
git clone https://github.com/SAP-docs/api-style-guide.git
```

### SAP BTP (Business Technology Platform)

**Cockpit**: https://cockpit.sap.com/

**Documentation**: https://help.sap.com/docs/BTP

**API Documentation**: Available through SAP API Business Hub

### SAP Integration Suite

**URL**: https://help.sap.com/docs/INTEGRATION_SUITE

**Includes**:
- API Management
- Integration Advisor
- Open Connectors
- API Designer (bundled with Integration Suite)

**Use For**:
- Creating and managing APIs
- API design and development
- Integration patterns
- API lifecycle management

### SAP NetWeaver

**JavaScript API Example**: Available through SAP NetWeaver documentation

**URL**: https://help.sap.com/docs/SAP_NETWEAVER

**Use For**:
- JavaScript API patterns
- NetWeaver-specific documentation
- Portal development

---

## Quick Reference

### By Language/Technology

| Language/Tech | Standard | Tool | Documentation |
|---------------|----------|------|---------------|
| **Java** | Javadoc | javadoc | [Oracle Javadoc](https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html) |
| **JavaScript** | JSDoc 3 | jsdoc | [JSDoc](https://jsdoc.app/) |
| **.NET (C#)** | XML Comments | DocFX, Sandcastle | [Microsoft XML Docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/) |
| **C/C++** | Doxygen | doxygen | [Doxygen Manual](https://www.doxygen.nl/manual/) |
| **Python** | reStructuredText | Sphinx | [Sphinx](https://www.sphinx-doc.org/) |
| **REST** | OpenAPI 3.0.3 | Swagger, Redoc | [OpenAPI Spec](https://spec.openapis.org/oas/v3.0.3) |
| **OData** | OData 4.01 | Various | [OData.org](https://www.odata.org/) |

### By Documentation Type

| Documentation Type | Primary Resource | Secondary Resource |
|-------------------|------------------|-------------------|
| **REST API Reference** | OpenAPI Spec | SAP API Business Hub |
| **OData API Reference** | OData Spec | SAP API Business Hub |
| **Java API Reference** | Javadoc Guide | SAP Naming Guidelines |
| **JavaScript API Reference** | JSDoc Guide | SAP Naming Guidelines |
| **.NET API Reference** | Microsoft XML Docs | SAP Naming Guidelines |
| **Developer Guides** | SAP Developer Center | SAP Help Portal |
| **Tutorials** | SAP Tutorial Navigator | SAP Community |
| **Code Samples** | SAP API Business Hub | GitHub |

### By Task

| Task | Resource | URL |
|------|----------|-----|
| **Find SAP APIs** | SAP API Business Hub | https://api.sap.com/ |
| **Learn SAP Development** | SAP Developer Center | https://developers.sap.com/ |
| **Read Product Docs** | SAP Help Portal | https://help.sap.com/ |
| **Ask Questions** | SAP Community | https://community.sap.com/ |
| **Design REST APIs** | OpenAPI Spec | https://spec.openapis.org/ |
| **Design OData APIs** | OData Spec | https://www.odata.org/ |
| **Write Java Docs** | Javadoc Guide | https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html |
| **Write JS Docs** | JSDoc Guide | https://jsdoc.app/ |
| **Write .NET Docs** | Microsoft Docs | https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/ |
| **Generate C++ Docs** | Doxygen | https://www.doxygen.nl/ |

---

## Version Information

### API Standard Versions

| Standard | Current Version | Previous Versions | Status |
|----------|----------------|-------------------|--------|
| **OpenAPI** | 3.0.3 | 2.0 (Swagger), 3.1.0 | Active |
| **OData** | 4.01 | 4.0, 3.0, 2.0 | Active |
| **Javadoc** | Java 17 | Java 8, 11 | Active |
| **JSDoc** | 3.x | 2.x | Active |
| **.NET XML** | .NET 6+ | .NET Framework, .NET Core | Active |
| **Doxygen** | 1.9+ | 1.8.x | Active |

### SAP API Style Guide Versions

| Version | Date | Key Changes |
|---------|------|-------------|
| **2021.01** | January 2021 | API Designer clarification, expanded description guidelines |
| **Initial** | Earlier | Base standards established |

---

## Related SAP Documentation

### Official SAP Standards Documents

1. **SAP API Style Guide** - This complete skill reference
2. **SAP Naming Conventions** - naming-conventions.md
3. **SAP Quality Processes** - quality-processes.md
4. **SAP Deprecation Policy** - deprecation-policy.md
5. **SAP Developer Guides** - developer-guides.md

### SAP Cloud Documentation

- **SAP BTP**: https://help.sap.com/docs/BTP
- **SAP Cloud Foundry**: https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/
- **SAP Kyma**: https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/

### SAP Development Tools

- **SAP Business Application Studio**: https://help.sap.com/docs/BAS
- **SAP Web IDE**: (Deprecated - migrating to Business Application Studio)
- **SAP HANA Cloud**: https://help.sap.com/docs/HANA_CLOUD

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
