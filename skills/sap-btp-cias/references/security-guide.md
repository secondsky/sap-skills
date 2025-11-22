# SAP BTP CIAS Security Guide

Comprehensive security documentation for Cloud Integration Automation Service.

**Source**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs

---

## Security Architecture Overview

Security is vital for Cloud Integration Automation Service as it handles integration setup between SAP products. The service comprises components provisioned into customer subaccounts via the SAP BTP cross-subaccount subscription concept.

### Core Architecture Components

| Component | Description |
|-----------|-------------|
| **CIAS Runtime** | Backbone framework that renders integration tasks |
| **CIAS Planning** | UI application to plan integration scenarios |
| **CIAS Inbox** | UI application to access tasks for end-users |
| **CIAS Monitoring** | UI application for scenario implementation monitoring |
| **Managed System** | System to be configured during integration scenario |
| **CIAS Automation Runtime** | Calls configuration APIs of managed systems |

### Security Features

- Valid user identity required in configured identity provider
- Backend connectivity calls protected against cross-site request forgery (XSRF)
- Role-based access through SAP BTP authorization framework
- Credential Store service for sensitive data (inaccessible to external parties)

---

## Identity Provider and Identity Management

### Authentication Flow

Cloud Integration Automation service depends on an Identity Provider (IdP) for identity management and authentication. The IdP must be configured within the customer subaccount.

**Key Points**:
- All requests authenticated against consumer subaccount identity provider
- Authorization enforced against role assignments in subaccount
- Users must exist in respective identity provider for feature access
- Organizations can replace default SAP Cloud Identity Authentication service with corporate IdP

### Target System Requirements

When using destinations pointing to target systems:
- Users in destinations must be authenticated by IdP configured in target systems
- Users must be authorized by target system IdP

### SAML Support

CIAS supports any SAML assertion Name ID attribute.

### IdP Change Considerations

Changing identity providers after subscription may disable application access unless new users are managed by the updated provider.

---

## Roles and Authorizations

### Role-Based Access Control

CIAS implements role-based access through SAP BTP's standard authorization framework. Users and groups receive assignment to consumer roles from their respective consumer subaccounts.

### Role Definitions

#### Integration Administrator
**Role Collection**: `CIASIntegrationAdministrator`

**Capabilities**:
- Access My Inbox application
- Access Scenario Execution Monitoring
- Access Plan for Integration
- Plan integration scenarios and generate workflows
- Review workflow execution plans (landscape confirmation, role assignments, scope selection)
- Monitor workflow execution
- Terminate scenarios

#### Integration Expert
**Role Collection**: `CIASIntegrationExpert`

**Capabilities**:
- Access My Inbox application
- Work on assigned tasks

#### Integration Monitor
**Role Collection**: `CIASIntegrationMonitor`

**Capabilities**:
- Read-only access to Scenario Execution Monitoring application

### Role Assignment

Navigate to **SAP BTP Cockpit** → **Security** → **Role Collection** within consumer subaccount.

**Process**:
1. Select appropriate role collection
2. Click Edit → Users tab
3. Add users via email ID or login user ID
4. Alternatively use Trust configuration for SAP IDP, custom IDP, or IAS tenant

---

## Security Restrictions

### Subaccount Prerequisites

- SAP BTP subaccount name must be present
- Subaccount must be subscribed to Cloud Integration Automation service

### User ID Requirements

User identifications for workflow invocation must exist in the SAP BTP subaccount specified during planning.

### Transaction Limits

**Maximum 15 running transactions (workflows)** per Cloud Integration Automation service consumer subaccount.

### Data Deletion Behavior

Deleting a transaction in maintenance planner does **not** automatically delete associated data in CIAS. Manual deletion in CIAS required.

---

## Data Protection and Privacy

### Database Storage

Service provider maintains database containing:
- Email IDs linked to subscriptions
- SAP BTP consumer subaccount names
- Selected systems and tenants for integration setups

### Log Management

| Aspect | Policy |
|--------|--------|
| Personal Data in Logs | Logs do not store user-related personal data |
| Log Retention | Logs remain for 90 days, then deleted |
| Audit Logs | Follow SAP BTP Audit Log retention policy |

### Data Deletion

**No self-service option** for deleting email IDs or transactional data.

To delete data:
1. Create support request to component **BC-INS-CIT-RT**
2. Include in ticket:
   - Email ID requiring removal
   - SAP BTP consumer subaccount name

---

## Sensitive Data Handling

### Credential Storage

CIAS requires sensitive information input to automate certain integration tasks. This data undergoes secure storage within the **Credential Store service** in the Cloud Integration Automation service provider account.

**Security Features**:
- Data inaccessible to external parties
- Secure encryption at rest
- Access limited to automation processes

**Reference**: https://help.sap.com/viewer/601525c6e5604e4192451d5e7328fa3c/Cloud/en-US/02e8f7d1016740b8adf68690f36df142.html

---

## Audit Logging

### Overview

Cloud Integration Automation service maintains security-related events and user actions through the Audit Log service.

### Features

- View all audit log entries for your subaccount
- Security events documented automatically
- User actions tracked and logged

### Data Retention

Audit log entries follow SAP BTP Audit Log data retention policy for deletion procedures.

---

## Destination Security

### Configuration Data

- Destination configuration data remains exclusively in consumer subaccount
- Service accesses configurations during automation execution for restricted timeframe

### Security Requirements

- **Always use HTTPS** for secure communication
- Delete destinations after workflow completion (recommended)
- Users executing automation must have authorization on target systems

### Authorization

By default, Integration Administrator has authorization to create destinations. Deletion or modification of existing destinations is not permitted through CIAS.

---

## Glossary of Security Terms

| Term | Definition |
|------|------------|
| **Personal Data** | Any information relating to an identified or identifiable natural person including names, identification numbers, location data, and physical/physiological/genetic/mental/economic/cultural/social identity factors |
| **Sensitive Personal Data** | Racial/ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric information, professional secrecy data, criminal/administrative offense records, insurance/financial account information |
| **Blocking** | Restricting access to data for which primary business purpose has ended |
| **Consent** | Records showing whether data subject granted, withdrew, or denied consent for data usage |
| **Residence Period** | Time between business end and end-of-purpose when data remains accessible for subsequent processes |
| **Retention Period** | Time from last business activity through data deletion, subject to applicable laws |

---

## Browser Support

Supported browsers on Windows:
- Mozilla Firefox (ESR and latest)
- Google Chrome (latest)

---

## Documentation Links

- Security Overview: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/security-9e8f7c2.md
- Security Architecture: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/security-architecture-df15122.md
- Security Restrictions: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/security-restrictions-3538ec5.md
- Identity Provider: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/identity-provider-and-identity-management-1508b49.md
- Data Protection: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/data-protection-and-privacy-22abc39.md
- Audit Logging: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/audit-logging-639f869.md
- SAP BTP Security Guide: https://help.sap.com/docs/btp/sap-business-technology-platform/security
