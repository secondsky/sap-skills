---
name: sap-btp-build-work-zone-advanced
description: |
  Develops and administers SAP Build Work Zone, advanced edition digital workplace solutions. Use when creating workspaces, workpages, and collaborative sites, developing UI Integration Cards in SAP Business Application Studio, building content packages and workspace templates, integrating with Microsoft 365/Teams/SharePoint/Google Drive, configuring chatbots and webhooks, implementing SCIM API user provisioning, setting up OData business records, managing themes and branding, configuring role-based access and SSO, troubleshooting deployment issues, or working with the Administration Console.
license: MIT
---

# SAP Build Work Zone, Advanced Edition

This skill provides comprehensive guidance for implementing SAP Build Work Zone, advanced edition - a digital workplace platform for unified access to business applications, processes, and collaboration.

## When to Use This Skill

Use this skill when:
- Creating workspaces, workpages, and collaborative sites
- Developing UI Integration Cards in SAP Business Application Studio
- Building and deploying content packages
- Creating workspace templates
- Integrating with Microsoft 365, Teams, SharePoint, or Google Drive
- Configuring chatbots using SAP Conversational AI
- Implementing webhooks for event notifications
- Setting up SCIM API for user provisioning
- Configuring OData-based business records
- Managing themes and branding
- Configuring role-based access and SSO
- Working with the Administration Console

## Platform Overview

SAP Build Work Zone, advanced edition is a digital workplace platform that:
- Provides unified access to SAP and third-party business applications
- Enables collaborative workspaces with feeds, blogs, wikis, and forums
- Supports role-based navigation with Single Sign-On (SSO)
- Works across web browsers, mobile apps, and responsive web UI
- Integrates with cloud, hybrid, and on-premise applications

## Core Concepts

### Workspaces
Separate sections with dedicated pages and feeds for team communication and collaboration within specific user groups.

### Workpages
Customizable pages that can be configured with widgets, cards, and applications.

### UI Integration Cards
Design patterns displaying concise information in limited-space containers. Follow SAPUI5 card specifications (minimum version 1.87.0; newer versions supported and recommended for latest features).

### Content Packages
Collections of artifacts (cards, workflows, workspace templates) bundled in ZIP files for distribution.

### Workspace Templates
Pre-built frameworks enabling workspace creation with minimum modification.

## Development Environment Setup

### Prerequisites
1. SAP BTP subscription to SAP Build Work Zone, advanced edition
2. SAP Business Application Studio subscription
3. Workzone_Admin role collection assignment
4. Destination to content repository configured

### Dev Space Setup
```
1. Open SAP Business Application Studio
2. Create new dev space
3. Select "Development Tools for SAP Build Work Zone, Advanced Edition" extension
4. Start the dev space
```

## UI Integration Cards Development

### Creating a UI Card

1. Open SAP Business Application Studio
2. Select "New Project From Template"
3. Choose "UI Integration Card"
4. Configure:
   - **Project Name**: Your identifier
   - **Card Sample**: Template selection
   - **NameSpace**: Used for Card ID (namespace.projectname)
   - **Card Title/Subtitle**: Display text
   - **Mobile Compatibility**: Enable for mobile support

### Card Types
- List Cards
- Object Cards
- Table Cards
- Timeline Cards
- Analytical Cards
- Calendar Cards
- Component Cards

For complete card development, see `references/ui-integration-cards.md`.

## Content Packages

### Supported Artifacts
- UI Integration Cards
- Workflows
- Workspace templates
- Exported workspace configurations
- Homepage configurations

### Package Types
- **Centrally-provided**: Auto-available to all customers, non-customizable
- **Local packages**: Custom packages uploaded by administrators

### Development Flow
```
Create in BAS → Build package → Deploy → Install in Admin Console
```

For complete content package guide, see `references/content-packages.md`.

## Workspace Templates

Templates enable users to create workspaces with predefined layouts and widgets.

### Creating Templates
1. Design workspace structure
2. Define widget layouts
3. Configure default settings
4. Package and deploy

For template development, see `references/workspace-templates.md`.

## Chatbot Integration

### Options
1. **Custom chatbots**: Build using SAP Conversational AI (https://cai.tools.sap/)
2. **Pre-built chatbot**: Fork and configure the SAP Build Work Zone chatbot

### Configuration Steps
1. Fork chatbot in SAP Conversational AI
2. Connect using SAP Jam Collaboration connector
3. Register OAuth client in Admin Console
4. Configure alias account for bot posting
5. Set up push notifications and webhooks

For chatbot configuration, see `references/chatbots.md`.

## API Reference

### SCIM API

**Endpoint**: `/api/v1/scim`

**Authentication**: 2-legged OAuth using "Workzone API Client"

**Rate Limits**:
| Limit Type | Value |
|------------|-------|
| Hourly limit | 10,000 requests/tenant |
| Burst limit | 200 requests/minute |

**Headers**:
- `X-RateLimit-Limit`: Maximum hourly requests
- `X-RateLimit-Remaining`: Available requests
- `X-RateLimit-Reset`: Seconds until reset

**Content-Type**: `application/json` (required for POST/PUT)

### OData API

SAP Build Work Zone uses OData v2 with v4 extensions.

**Format**: XML (AtomPub) or JSON

For complete API reference, see `references/api-reference.md`.

## Administration Console

Access via: User Actions menu → Administration

### Key Sections
- **Users**: Manage internal/external users, user lists
- **Authentication**: SAML IdP, OAuth clients, SSO
- **Theming**: Assign themes, customize email templates
- **Areas & Workspaces**: Home pages, workspace settings
- **Integrations**: Microsoft Teams, mobile apps, chatbots
- **Features**: Enable/disable site features
- **Compliance**: Content administration, monitoring
- **Analytics**: Usage reports, adoption metrics

## Feature Management

### Compliance Features
- **Compliance Monitor**: Flags content with compliance dictionary terms
- **Profanity Monitor**: Marks items with profanity violations
- **Unscannable Filter**: Flags non-scannable files

### Content Features
- File sharing, feed sharing
- Content rating
- Wikis, blogs, knowledge bases
- Video/audio uploads
- PDF viewing

### Integration Features
- API access
- Microsoft Teams integration
- Office 365 SharePoint integration
- Google Drive integration

## External Integrations

| Integration | Purpose |
|-------------|---------|
| Microsoft Teams | Collaboration, notifications |
| Office 365 SharePoint | Document sharing, sites |
| Google Drive | Cloud storage |
| SAP SuccessFactors | HR integration |
| SAP Cloud for Customer | CRM integration |
| SAP Task Center | Unified task management |
| SAP Build Process Automation | Workflow automation |

## Security

### Authentication
- SAML Identity Providers
- OAuth 2.0 clients
- Single Sign-On (SSO)
- Trusted Certificate Authorities

### Key Considerations
- Role-based access control
- HTTP security headers (clickjacking, XSS protection)
- Content provider security guidelines
- Audit logging for security events

For security configuration, see `references/security.md`.

## Webhooks

Track platform events and send notifications to third-party applications.

### Configuration
1. Define events to monitor
2. Configure callback URLs
3. Set up authentication tokens
4. Handle push notifications

## Theming and Branding

### Options
- Assign themes to site
- Customize email templates
- Local themes (partial UI coverage)
- Theme Manager for custom branding

## Reports and Analytics

### Available Reports
- Activity Summary (week/month)
- User Contribution
- Workspace Activity
- Content Views
- Compliance Report
- Kudo Details
- Search Summary
- Expertise Report

### Third-Party Analytics
Integration with external analytics platforms supported.

## Troubleshooting

### Common Issues
| Issue | Solution |
|-------|----------|
| HTTP 503 | Service maintenance, retry later |
| Rate limit exceeded | Check X-RateLimit headers, wait for reset |
| OAuth authentication failure | Verify Workzone API Client credentials |
| Card not displaying | Check SAPUI5 version compatibility |

For troubleshooting guide, see `references/troubleshooting.md`.

## Reference Files

- `references/ui-integration-cards.md` - Card development guide
- `references/content-packages.md` - Content package development
- `references/workspace-templates.md` - Template creation
- `references/chatbots.md` - Chatbot configuration
- `references/api-reference.md` - SCIM and OData APIs
- `references/security.md` - Security configuration
- `references/integrations.md` - External integrations
- `references/troubleshooting.md` - Error resolution

## Documentation Links

- **SAP Help Portal**: https://help.sap.com/docs/build-work-zone-advanced-edition
- **GitHub Docs**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced
- **SAP API Hub**: https://api.sap.com/ (search "SAP Cloud Portal Service")
- **OData API Docs**: https://jam2.sapjam.com
- **SAPUI5 Card Explorer**: https://ui5.sap.com/test-resources/sap/ui/integration/demokit/cardExplorer/

---

**Last Updated**: 2025-11-22
**Documentation Version**: Based on SAP documentation as of November 2025
