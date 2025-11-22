# Security and Roles Guide - SAP BTP Intelligent Situation Automation

**Source**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation/tree/main/docs
**Last Verified**: 2025-11-22

---

## Overview

Intelligent Situation Automation uses role-based access control through SAP BTP role templates and role collections. Users must be assigned appropriate role collections to access application features.

---

## Role Templates

Intelligent Situation Automation provides two role templates:

| Role Template | Purpose | Attributes |
|---------------|---------|------------|
| SituationAutomationKeyUser | Key user for daily operations | None |
| SituationAutomationAdminUser | Admin user for system management | None |

**Note**: Since these templates have no attributes, corresponding roles are created automatically. Templates with attributes require manual role creation with specified attribute values.

---

## SituationAutomationKeyUser

### Purpose
Key user access for managing situation automation on a daily basis.

### Access Level
Full application access including all operational tiles.

### Available Tiles

| Tile | Function |
|------|----------|
| **Manage Situation Actions** | Create and manage custom actions |
| **Manage Situation Automation** | Configure automation rules and conditions |
| **Situation Dashboard** | View situation overview and status |
| **Analyze Situations** | Analyze resolution flows and outcomes |
| **Delete Data Context** | Manage data retention and cleanup |
| **Explore Related Situations** | View relationships between situations |

### Typical Users
- Business process owners
- Operations managers
- Situation analysts
- Automation administrators

---

## SituationAutomationAdminUser

### Purpose
Admin access for system onboarding and technical configuration.

### Access Level
Limited to system onboarding tasks only.

### Available Functions

| Function | Description |
|----------|-------------|
| Onboard System | Add and configure S/4HANA systems |
| Edit System | Modify onboarded system details |
| Retry Onboarding | Retry failed onboarding attempts |

### Typical Users
- System administrators
- Technical architects
- Initial setup personnel

---

## RuleRepositorySuperUser

### Purpose
Business rules management for authoring automation rules.

### Origin
This role comes from SAP Business Rules service, not Intelligent Situation Automation.

### Requirement
Key users who need to author rules must have both:
- SituationAutomationKeyUser
- RuleRepositorySuperUser

---

## Role Collections

### What Are Role Collections?

Role collections bundle one or more roles from one or more applications. They provide a convenient way to assign multiple permissions at once.

### Creating Role Collections

1. Navigate to SAP BTP Cockpit
2. Go to your subaccount
3. Navigate to **Security** → **Role Collections**
4. Click **Create**
5. Enter name and description
6. Add roles from role templates

### Recommended Role Collections

| Role Collection Name | Included Roles | Target Users |
|---------------------|----------------|--------------|
| ISA Key Users* | SituationAutomationKeyUser, RuleRepositorySuperUser | Business users |
| ISA Administrators* | SituationAutomationAdminUser | Technical admins |

*Example names; customize based on your organization's naming conventions.

**Reference**: See [Building Roles and Role Collections for Applications](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/eaa6a26291914b348e875a00b6beb729.html)

---

## Assigning Role Collections to Users

### Prerequisites

Users must exist in one of:
- SAP ID service
- Identity Authentication service (IAS)
- Another configured identity provider (IdP)

### Assignment Methods

| Identity Provider | Assignment Method |
|-------------------|-------------------|
| SAP ID service | Individual user assignment only |
| Identity Authentication | Individual users OR user groups |
| Other IdP | Individual users OR user groups |

### Individual User Assignment

1. Navigate to SAP BTP Cockpit
2. Go to your subaccount
3. Navigate to **Security** → **Users**
4. Select the user
5. Click **Assign Role Collection**
6. Select appropriate role collection
7. Confirm assignment

### User Group Assignment (IAS/Custom IdP)

1. Navigate to SAP BTP Cockpit
2. Go to your subaccount
3. Navigate to **Security** → **Role Collections**
4. Select the role collection
5. Go to **User Groups** tab
6. Add user group from IdP
7. All users in group receive the role collection

---

## Required Role Collections by User Type

### For Key Users (Daily Operations)

| Role Collection | Required |
|-----------------|----------|
| SituationAutomationKeyUser | Yes |
| RuleRepositorySuperUser | Yes (for rule authoring) |

### For Admin Users (Setup Only)

| Role Collection | Required |
|-----------------|----------|
| SituationAutomationAdminUser | Yes |

---

## Trust and Federation

### Identity Provider Configuration

For detailed guidance on configuring trust with identity providers, see SAP BTP documentation for Trust and Federation with Identity Providers.

### Common Configurations

| Configuration | Use Case |
|---------------|----------|
| SAP ID service | Default BTP identity provider |
| SAP Cloud Identity Services | Enterprise SSO integration |
| Corporate IdP (SAML/OIDC) | Integration with existing IdP |

---

## Authorization Flow

```
User Login
    │
    ▼
Identity Provider
    │
    ▼
BTP Authentication
    │
    ▼
Role Collection Check
    │
    ├─── SituationAutomationKeyUser ───► Access operational tiles
    │
    └─── SituationAutomationAdminUser ──► Access onboarding only
```

---

## Best Practices

### Role Assignment

- ✅ Create dedicated role collections for your organization
- ✅ Use descriptive names for role collections
- ✅ Document which users/groups have which roles
- ✅ Assign minimum necessary roles (least privilege)
- ✅ Use group-based assignment when possible (with IAS)

### Security

- ✅ Review role assignments regularly
- ✅ Remove roles when users change responsibilities
- ✅ Separate admin and key user roles
- ✅ Track changes via audit logs

### Common Mistakes

- ❌ Assigning SituationAutomationAdminUser to all users
- ❌ Forgetting RuleRepositorySuperUser for rule authors
- ❌ Not removing roles when users leave
- ❌ Over-permissioning for convenience

---

## Troubleshooting Access Issues

### "Server Error" on Application Access

**Symptom**: Error message when accessing Manage Situation Automation app

**Cause**: User not assigned required role collection

**Solution**: Assign SituationAutomationKeyUser role collection to the user

### Cannot Access Onboard System

**Symptom**: Onboard System app not visible or accessible

**Cause**: Missing admin role

**Solution**: Assign SituationAutomationAdminUser role collection

### Cannot Create/Edit Rules

**Symptom**: Rule authoring functions unavailable

**Cause**: Missing rule repository role

**Solution**: Assign RuleRepositorySuperUser role collection in addition to SituationAutomationKeyUser

---

## External Links

For a comprehensive list of SAP documentation links with document IDs, see `references/external-links.md`.

Key resources for role and security management:
- **Building Roles and Role Collections**: https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/eaa6a26291914b348e875a00b6beb729.html
- **Trust Configuration**: https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/cb1bc8f1bd5c482e891063960d7acd78.html
- **Authorization Management**: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/6373bb7a96114d619bfdfdc6f505d1b9.html

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-22
