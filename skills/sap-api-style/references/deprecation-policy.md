# SAP API Deprecation Policy

**Source**: https://github.com/SAP-docs/api-style-guide/blob/main/docs/api-deprecation-policy-65a10e3.md
**Last Verified**: 2025-11-21

---

## Table of Contents

1. [Overview](#overview)
2. [API Lifecycle States](#api-lifecycle-states)
3. [Timeline Requirements](#timeline-requirements)
4. [Required Metadata](#required-metadata)
5. [Stakeholder Responsibilities](#stakeholder-responsibilities)
6. [Deprecation Process](#deprecation-process)
7. [Decommission Process](#decommission-process)
8. [Best Practices](#best-practices)
9. [Examples](#examples)

---

## Overview

### Core Definition

A **deprecated API** "is no longer supported in future releases, and therefore not encouraged for use."

A **decommissioned API** has been fully retired and cannot be used in production.

### Key Principles

1. **Transparency**: Clearly communicate API lifecycle state to consumers
2. **Predictability**: Provide adequate notice before decommissioning
3. **Support**: Maintain deprecated APIs for minimum periods
4. **Documentation**: Update all documentation to reflect current state
5. **Migration Guidance**: Provide clear paths to successor APIs

---

## API Lifecycle States

SAP APIs use the `x-sap-stateInfo` attribute to define four lifecycle states:

### 1. Beta

**Definition**: Pre-production testing phase

**Characteristics**:
- Available for testing and evaluation
- May have incompatible changes without notice
- Not recommended for production use
- No support guarantees

**Use Case**: Early adopters testing new functionality

**Metadata**:
```yaml
x-sap-stateInfo:
  state: beta
```

### 2. Active

**Definition**: Live production-ready APIs

**Characteristics**:
- Fully supported for production use
- Backward compatibility maintained
- Default status (can be omitted from metadata)
- Full support and SLAs apply

**Use Case**: Standard production API usage

**Metadata**:
```yaml
x-sap-stateInfo:
  state: active
```

Or simply omit the attribute (active is default).

### 3. Deprecated

**Definition**: Live but replaced by an active successor

**Characteristics**:
- Still functional and supported (temporarily)
- Not recommended for new implementations
- Requires migration to successor API
- Support period defined (minimum 12 months)
- Must include deprecation date and successor information

**Use Case**: Legacy APIs being phased out

**Metadata**:
```yaml
x-sap-stateInfo:
  state: deprecated
  deprecationDate: "2024-01-15"
  successorApi: "NewAPIName v2.0"
```

### 4. Decommissioned

**Definition**: Retired from production

**Characteristics**:
- No longer functional
- Cannot be used in any environment
- Removed from documentation
- No support available

**Use Case**: Fully retired APIs

**Implementation**: Remove from artifact or mark in changelog

---

## Timeline Requirements

### Minimum Support Period After Deprecation

**12 months minimum** support period after deprecation announcement

**Calculation**:
- Starts from deprecation announcement date
- Continues until decommission date
- Allows customers adequate migration time

**Example Timeline**:
```
Jan 15, 2024: API deprecated (announcement)
Jan 15, 2025: Earliest decommission date (12 months later)
```

### Minimum Total Lifespan

**24 months minimum** total lifespan in active or deprecated status before decommissioning

**Calculation**:
- Starts from initial active release
- Includes time in active state + time in deprecated state
- Ensures reasonable API stability

**Example Timeline**:
```
Jan 1, 2022: API released (active)
Jan 1, 2024: API deprecated (24 months active)
Jan 1, 2025: Earliest decommission (12 months deprecated)

Alternative:
Jan 1, 2022: API released (active)
Jun 1, 2022: API deprecated (6 months active)
Jun 1, 2024: Earliest decommission (18 months deprecated, 24 total)
```

### Best Practice Timeline

SAP recommends:
- **Active period**: 18-36 months before deprecation
- **Deprecation period**: 12-24 months before decommission
- **Total lifespan**: 30+ months for production APIs

---

## Required Metadata

### OpenAPI Specification

APIs must include `x-sap-stateInfo` object in the OpenAPI specification file:

```yaml
openapi: 3.0.0
info:
  title: Employee Management API
  version: 1.5.0
  x-sap-stateInfo:
    state: deprecated
    deprecationDate: "2024-01-15"
    successorApi: "Employee Management API v2.0"
```

**Required Fields for Deprecated APIs**:
- `state`: Must be "deprecated"
- `deprecationDate`: ISO 8601 date format (YYYY-MM-DD)
- `successorApi`: Name and version of replacement API

### Artifact.json

APIs must include changelog entries in `artifact.json`:

```json
{
  "changelog": [
    {
      "state": "deprecated",
      "date": "2024-01-15",
      "version": "1.5.0",
      "notes": "Deprecated in favor of Employee Management API v2.0. Migration guide available at https://help.sap.com/migration-guide"
    },
    {
      "state": "active",
      "date": "2022-01-01",
      "version": "1.0.0",
      "notes": "Initial release"
    }
  ]
}
```

**Required Fields**:
- `state`: Current API state
- `date`: State change date (ISO 8601 format)
- `version`: API version at state change
- `notes`: Descriptive information about the change

---

## Stakeholder Responsibilities

### Product Owners

**Lifecycle Decisions**:
- Determine when to deprecate APIs
- Decide deprecation timelines
- Identify successor APIs
- Approve decommission schedules

**Metadata Configuration**:
- Ensure `x-sap-stateInfo` properly configured
- Maintain accurate `artifact.json` changelog
- Verify metadata consistency across systems

**Communication**:
- Announce deprecation through release notes
- Publish blog posts about major deprecations
- Notify affected customers directly
- Provide migration timelines

**Support Management**:
- Maintain support during deprecation period
- Allocate resources for customer migration assistance
- Track migration progress
- Coordinate decommission activities

### UA (User Assistance) Developers

**Documentation Updates**:
- Add deprecation notices to API documentation
- Update API reference pages with warnings
- Create prominent deprecation banners
- Link to successor API documentation

**Decommission Documentation**:
- Remove links to decommissioned APIs
- Archive old documentation appropriately
- Redirect old URLs to successor documentation
- Update navigation and search indices

**Source Code Tags**:
- Apply `@deprecated` tag in Javadoc/JSDoc comments
- Include deprecation reason and alternative
- Update inline documentation
- Add migration code examples

**Migration Guidance**:
- Create migration guides in release notes
- Document API differences
- Provide code migration examples
- Publish before-and-after comparisons

### Development Teams

**Code Maintenance**:
- Continue bug fixes during deprecation period
- Maintain security patches
- No new feature development
- Plan removal timeline

**Testing**:
- Maintain test coverage during deprecation
- Test successor API thoroughly
- Validate migration paths
- Monitor customer usage patterns

---

## Deprecation Process

### Step 1: Decision and Planning

1. **Assess API Usage**:
   - Review usage metrics and analytics
   - Identify affected customers
   - Estimate migration effort

2. **Define Successor**:
   - Identify replacement API
   - Document migration path
   - Create migration guide

3. **Set Timeline**:
   - Calculate minimum support period (12 months)
   - Verify total lifespan requirement (24 months)
   - Set deprecation and decommission dates

### Step 2: Update Metadata

1. **OpenAPI Specification**:
```yaml
x-sap-stateInfo:
  state: deprecated
  deprecationDate: "2024-01-15"
  successorApi: "NewAPI v2.0"
```

2. **Artifact.json**:
```json
{
  "changelog": [{
    "state": "deprecated",
    "date": "2024-01-15",
    "version": "1.5.0",
    "notes": "Deprecated. Use NewAPI v2.0. Migration guide: https://..."
  }]
}
```

3. **Source Code** (Java example):
```java
/**
 * Gets customer address.
 *
 * @deprecated As of version 1.5.0, replaced by
 *             {@link com.sap.newapi.Customer#getAddress()}
 *             Use the new API which provides enhanced address validation.
 */
@Deprecated
public Address getCustomerAddress() {
    // implementation
}
```

### Step 3: Documentation Updates

1. **API Reference**:
   - Add deprecation banner at top of page
   - Include deprecation date and successor
   - Link to migration guide

2. **Release Notes**:
   - Announce deprecation
   - Explain reason for deprecation
   - Provide migration timeline
   - Link to migration guide

3. **Migration Guide**:
   - Document API differences
   - Provide code examples
   - Explain migration steps
   - List breaking changes

### Step 4: Communication

1. **Announcement Channels**:
   - Release notes
   - Blog posts
   - Email to affected customers
   - In-app notifications (if applicable)

2. **Announcement Content**:
   - What is being deprecated
   - Why it's being deprecated
   - When it will be decommissioned
   - What to use instead
   - Where to find migration guidance

### Step 5: Support Period

1. **Maintain Support**:
   - Continue bug fixes
   - Provide security patches
   - Answer customer questions
   - Monitor migration progress

2. **Track Migration**:
   - Monitor API usage metrics
   - Identify customers still using deprecated API
   - Proactively contact stragglers
   - Offer migration assistance

---

## Decommission Process

### Prerequisites

Before decommissioning, verify:
- [ ] Minimum 12 months since deprecation announcement
- [ ] Minimum 24 months total lifespan
- [ ] All customers notified
- [ ] Migration guidance published
- [ ] Successor API available and stable
- [ ] Remaining usage is minimal

### Decommission Methods

#### Method 1: Remove Entire API Package

**For complete API removal**:

1. Delete artifact folder from repository
2. Commit and push changes
3. Republish to SAP API Business Hub (API will be removed)

**Example**:
```bash
# Remove the API directory
rm -rf apis/EmployeeManagement/1.0

# Commit removal
git add -A
git commit -m "Decommission EmployeeManagement API v1.0"
git push
```

#### Method 2: Remove Specific Endpoints

**For partial API removal**:

1. Edit `artifact.json`
2. Remove specific endpoint definitions
3. Update changelog with decommission notice
4. Commit and push changes

**Example** (`artifact.json`):
```json
{
  "changelog": [
    {
      "state": "decommissioned",
      "date": "2025-01-15",
      "version": "1.5.0",
      "notes": "Endpoint /legacy/customers decommissioned. Use /v2/customers instead."
    }
  ],
  "paths": {
    "/v2/customers": { ... }
    // Removed: "/legacy/customers"
  }
}
```

### Post-Decommission Actions

1. **Documentation Cleanup**:
   - Remove API from documentation site
   - Archive old documentation
   - Set up redirects to successor API
   - Update navigation menus

2. **URL Management**:
   - Configure HTTP 410 (Gone) responses for old endpoints
   - Include message pointing to successor API
   - Maintain redirects for reasonable period

3. **Communication**:
   - Publish decommission announcement
   - Send final notification to any remaining users
   - Update status pages

---

## Best Practices

### Planning

1. **Early Assessment**: Evaluate deprecation candidates during product planning
2. **Customer Impact**: Always consider customer migration effort
3. **Batch Deprecations**: Group related API deprecations together
4. **Version Strategy**: Use semantic versioning to signal breaking changes

### Communication

1. **Multiple Channels**: Announce through all available channels
2. **Advance Notice**: Provide notice well before minimum period
3. **Clear Messaging**: Explain what, why, when, and how
4. **Regular Reminders**: Send periodic reminders during deprecation period

### Documentation

1. **Prominent Warnings**: Make deprecation notices highly visible
2. **Complete Migration Guides**: Don't just say "use X instead" - explain how
3. **Code Examples**: Provide before/after code comparisons
4. **FAQs**: Answer common migration questions

### Technical

1. **Graceful Degradation**: Consider warning headers before hard removal
2. **Usage Tracking**: Monitor deprecated API usage
3. **Migration Tools**: Provide automated migration tools when feasible
4. **Backward Compatibility**: Maintain during deprecation period

---

## Examples

### Example 1: REST API Endpoint Deprecation

**OpenAPI Specification**:
```yaml
openapi: 3.0.0
info:
  title: Order Management API
  version: 2.1.0

paths:
  /orders/{orderId}:
    get:
      summary: Get order details
      deprecated: true
      description: |
        **DEPRECATED**: This endpoint is deprecated as of January 15, 2024.
        Use /v2/orders/{orderId} instead.

        This endpoint will be decommissioned on January 15, 2025.

        Migration guide: https://help.sap.com/order-api-migration
      x-sap-stateInfo:
        state: deprecated
        deprecationDate: "2024-01-15"
        successorApi: "/v2/orders/{orderId}"
      responses:
        '200':
          description: Order details (deprecated)
          headers:
            Warning:
              schema:
                type: string
              description: '299 - "Deprecated API. Use /v2/orders/{orderId}"'
```

### Example 2: Java Method Deprecation

```java
/**
 * Service for managing customer data.
 */
public class CustomerService {

    /**
     * Retrieves customer by ID.
     *
     * @param customerId the customer identifier
     * @return customer object
     * @throws NotFoundException if customer not found
     * @deprecated As of version 2.0.0 (deprecated January 15, 2024),
     *             replaced by {@link #getCustomerById(String)}
     *             The new method provides enhanced validation and
     *             supports additional customer types.
     *             This method will be removed in version 3.0.0
     *             (scheduled for January 15, 2025).
     *             Migration guide: https://help.sap.com/customer-api-migration
     */
    @Deprecated(since = "2.0.0", forRemoval = true)
    public Customer getCustomer(int customerId) throws NotFoundException {
        // Legacy implementation
        return legacyCustomerRetrieval(customerId);
    }

    /**
     * Retrieves customer by ID with enhanced validation.
     *
     * @param customerId the customer identifier (supports all formats)
     * @return customer object
     * @throws NotFoundException if customer not found
     * @throws ValidationException if customerId format invalid
     * @since 2.0.0
     */
    public Customer getCustomerById(String customerId)
            throws NotFoundException, ValidationException {
        // New implementation
        return enhancedCustomerRetrieval(customerId);
    }
}
```

### Example 3: Complete API Deprecation Timeline

**Timeline**: Document Management API

```
2022-01-01: API v1.0.0 released (active)
├─ State: active
├─ Full support and SLAs
└─ Production-ready

2023-06-15: API v2.0.0 released
├─ Enhanced features
├─ Better performance
└─ v1.0.0 remains active

2024-01-15: API v1.0.0 deprecated
├─ State: deprecated
├─ Deprecation announcement published
├─ Migration guide released
├─ Support continues
└─ x-sap-stateInfo updated

2024-07-15: 6-month reminder
├─ Email to remaining v1.0.0 users
├─ 6 months until decommission
└─ Migration assistance offered

2024-10-15: 3-month reminder
├─ Final migration push
├─ Direct contact to high-usage customers
└─ Migration tools provided

2025-01-15: API v1.0.0 decommissioned
├─ State: decommissioned
├─ Endpoints return HTTP 410 Gone
├─ Documentation removed
├─ Redirects to v2.0.0 documentation
└─ Final announcement published

Total Timeline:
- Active period: 24 months (Jan 2022 - Jan 2024)
- Deprecated period: 12 months (Jan 2024 - Jan 2025)
- Total lifespan: 36 months ✓ (exceeds 24-month minimum)
- Support after deprecation: 12 months ✓ (meets minimum)
```

---

## Reference

### External Standards

- **OpenAPI Specification**: https://spec.openapis.org/oas/v3.0.3
- **Semantic Versioning**: https://semver.org/
- **HTTP Status Codes**: https://httpstatuses.com/

### SAP Resources

- **SAP API Business Hub**: https://api.sap.com/
- **SAP Help Portal**: https://help.sap.com/

### Related Documentation

- API Naming Guidelines
- API Quality Checklist
- API Review Process
- Developer Guide Standards

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
