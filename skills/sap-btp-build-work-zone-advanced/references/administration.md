# Administration Console Guide

Complete guide for administering SAP Build Work Zone, advanced edition through the Administration Console.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## Overview

The Administration Console provides centralized management for all aspects of SAP Build Work Zone, advanced edition including users, content, security, and integrations.

---

## Core Administrative Areas

### Overview & Dashboard

Key information and metrics:
- License usage statistics
- Product version information
- Daily operational metrics
- Initial setup tasks

### User Management

#### Internal Users
- Add and edit user profiles
- Generate activity reports
- Grant admin privileges
- Manage user settings

#### External Users
- Configure external user access
- Manage non-company users
- Set access restrictions

#### User Lists
- Create imported user lists
- Invite multiple users to workspaces
- Configure dynamic user lists
- Set list attributes

#### Alias Accounts
- Create organizational representative accounts
- Configure system users for integrations
- Manage chatbot accounts

#### SCIM Provisioning
- Manage company administrators via API
- Configure automated user provisioning

---

## Authentication & Authorization

### SAML Configuration

#### Trusted Identity Providers (IDPs)
1. Navigate to Authentication > SAML Trusted IDPs
2. Add IdP metadata
3. Configure attribute mapping
4. Test SSO connection

#### Local Identity Provider
Configure for internal authentication needs

#### Local Service Provider
Setup for third-party integration

### Role Collections

| Role Collection | Purpose |
|-----------------|---------|
| Workzone_Admin | Full administration access |
| Workzone_User | Standard user access |
| Workzone_Area_Admin | Area administration |
| Workzone_External_User | External user access |
| Workzone_HR_Admin | HR integration administration |

### Role Types

| Type | Description |
|------|-------------|
| Default Roles | Auto-assigned during onboarding (cannot be removed) |
| Local Roles | Manually created for app access |
| Remote Roles | From external content providers |

---

## Theming & Branding

### Theme Manager
- Assign existing themes
- Create custom themes
- Configure default theme

### Local Theme Designer
- Site-specific styling
- Custom CSS configuration
- Brand color settings

### Email Templates
- Customize notification appearance
- Configure email branding
- Set template content

---

## Area & Workspace Configuration

### Administrative Areas
- Create organizational groupings
- Configure area permissions
- Manage area content

### Home Page
- Design landing page
- Configure widgets and feeds
- Set announcements
- Manage quick links

### User Profiles
- Customize profile fields
- Configure profile visibility
- Set profile requirements

### Content Templates
- Blog templates
- Wiki templates
- Custom content types

### Workspace Templates
- Install prebuilt templates
- Create custom templates
- Manage template availability

---

## UI Integration

### Content Packages
Location: UI Integration > Content Packages

- View available packages
- Install/uninstall packages
- Manage package versions
- Configure package content

### Cards
Enable UI Integration Cards for user pages:
- Configure card availability
- Manage card permissions
- Monitor card usage

### Widget Builders
Create custom HTML widgets:
- Define widget structure
- Configure widget settings
- Deploy custom widgets

---

## External Integrations

### Microsoft Teams
- Configure Teams connection
- Set up SSO integration
- Manage channel mappings

### Mobile Apps
- Configure mobile settings
- Manage app distribution
- Set mobile policies

### External Solutions
- Configure third-party integrations
- Manage API connections
- Set integration permissions

### OAuth Clients
- Register OAuth clients
- Configure client scopes
- Manage client secrets

### Chatbot Configuration
- Enable chatbot launcher
- Configure bot connections
- Manage bot permissions

### Webhook Notifications
- Configure event triggers
- Set notification endpoints
- Manage webhook security

### Extensions Catalog
- Browse available extensions
- Install extensions
- Configure extension settings

---

## Feature Management

### Feature Enablement

Control platform features:
- Kudos customization
- Hashtags auto-completion
- Knowledge Base categories
- Forum settings
- Feed options

### Feature Settings
- Enable/disable features
- Configure feature behavior
- Set feature permissions

---

## Compliance & Security

### Terms of Service
- Configure external ToS
- Set custom ToS content
- Manage ToS acceptance

### Content Administration
- Review flagged content
- Manage content reports
- Configure moderation rules

### Compliance Dictionary
- Define compliance terms
- Configure detection rules
- Manage violations

### Profanity Monitor
- Enable profanity detection
- Configure word lists
- Manage flagged content

### Security Settings
- Configure HTTP headers
- Set session policies
- Manage access controls

### Audit Logging
- View audit reports
- Export audit data
- Configure log retention

---

## Analytics

### Usage Reports
- User activity metrics
- Content engagement stats
- Workspace analytics
- Adoption metrics

### Report Types

| Report | Description |
|--------|-------------|
| Activity Summary | Weekly/monthly activity |
| Company User Detail | User-level metrics |
| Compliance Report | Compliance status |
| Content Report | Content statistics |

### Third-Party Analytics
- Configure analytics integration
- Set tracking parameters
- Export analytics data

---

## Best Practices

### Regular Maintenance

1. **Review user access** - Audit permissions quarterly
2. **Monitor compliance** - Check flagged content regularly
3. **Update themes** - Keep branding current
4. **Review integrations** - Verify external connections

### Security Recommendations

1. **Enable SSO** - Use SAML authentication
2. **Configure audit logging** - Track administrative actions
3. **Review OAuth clients** - Audit API access
4. **Set HTTP headers** - Enable security headers

---

**Documentation Links**:
- Administration: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced
