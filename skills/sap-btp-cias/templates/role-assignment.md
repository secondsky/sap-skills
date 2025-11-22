# CIAS Role Assignment Templates

Templates and procedures for assigning roles in Cloud Integration Automation Service.

---

## Role Collections Overview

Three role collections are automatically created during CIAS subscription:

| Role Collection | Role | Purpose |
|-----------------|------|---------|
| `CIASIntegrationAdministrator` | Integration Administrator | Full access and administration |
| `CIASIntegrationExpert` | Integration Expert | Task execution |
| `CIASIntegrationMonitor` | Integration Monitor | Read-only monitoring |

---

## Role Assignment Templates

### Template: Integration Administrator Assignment

**Use for**: IT administrators, solution architects, integration leads

**Capabilities granted**:
- Access My Inbox application
- Access Plan for Integration
- Access Scenario Execution Monitoring
- Plan integration scenarios and generate workflows
- Review workflow execution plans
- Monitor workflow execution
- Terminate scenarios
- Create destinations

**Assignment procedure**:
```
1. Navigate to SAP BTP Cockpit > [Subaccount] > Security > Role Collections
2. Select: CIASIntegrationAdministrator
3. Click: Edit
4. Go to: Users tab
5. Add users: [email1@domain.com, email2@domain.com]
6. Click: Save
```

**Typical recipients**:
- Integration architects
- BTP administrators
- Project leads
- System administrators

---

### Template: Integration Expert Assignment

**Use for**: Functional consultants, configuration specialists, implementation team members

**Capabilities granted**:
- Access My Inbox application
- Work on assigned tasks
- Execute manual and automated tasks
- Add comments to tasks

**Assignment procedure**:
```
1. Navigate to SAP BTP Cockpit > [Subaccount] > Security > Role Collections
2. Select: CIASIntegrationExpert
3. Click: Edit
4. Go to: Users tab
5. Add users: [email1@domain.com, email2@domain.com]
6. Click: Save
```

**Typical recipients**:
- Functional consultants
- Configuration specialists
- Implementation team members
- Subject matter experts

---

### Template: Integration Monitor Assignment

**Use for**: Project managers, auditors, stakeholders needing visibility

**Capabilities granted**:
- Read-only access to Scenario Execution Monitoring
- View task status
- View execution progress

**Assignment procedure**:
```
1. Navigate to SAP BTP Cockpit > [Subaccount] > Security > Role Collections
2. Select: CIASIntegrationMonitor
3. Click: Edit
4. Go to: Users tab
5. Add users: [email1@domain.com, email2@domain.com]
6. Click: Save
```

**Typical recipients**:
- Project managers
- Internal auditors
- Quality assurance
- Stakeholders requiring visibility

---

## Multi-User Assignment

### Comma-Separated Assignment

You can assign multiple users per role with comma-separated user IDs:

```
Users: user1@domain.com, user2@domain.com, user3@domain.com
```

### Bulk Assignment via Trust Configuration

For large teams, use Trust Configuration:

1. Navigate to **Security** → **Trust Configuration**
2. Select identity provider (SAP IDP, Custom IDP, or IAS tenant)
3. Map groups to role collections
4. Users in mapped groups automatically receive roles

---

## Identity Provider Integration

### SAP Cloud Identity Services (Default)

```
Trust Configuration:
  Identity Provider: SAP Cloud Identity Services
  Domain: accounts.sap.com

User Format: <email>@<domain>
Example: john.doe@company.com
```

### Corporate Identity Provider (Custom IDP)

```
Trust Configuration:
  Identity Provider: Corporate SAML IDP
  Metadata: [Upload IDP metadata XML]

User Format: Per corporate IDP configuration
SAML Attribute: NameID (any supported format)
```

### SAP Identity Authentication Service (IAS)

```
Trust Configuration:
  Identity Provider: IAS Tenant
  Tenant URL: https://<tenant>.accounts.ondemand.com

User Format: <email> or <user_id>
```

---

## Workflow User Assignment Template

When invoking workflows via Plan for Integration or Maintenance Planner:

### Initial Task Assignment

**Field**: SAP BTP Workflow Users

**Format**: Comma-separated list of user IDs

**Requirements**:
- Users must have access to specified SAP BTP subaccount
- Users must be in configured identity provider
- At least one user required

**Template**:
```
Workflow Users: admin@company.com, lead@company.com, consultant@company.com
```

### Role-Based User Identification

During workflow execution, view role assignments:

1. Open task in My Inbox
2. Click role name in Task Instructions
3. View:
   - Role description
   - Complete list of assigned users

---

## Task Claiming Behavior

### Multi-User Task Assignment

When multiple users are assigned to a task:

1. Any assigned user can click **Claim** to lock the task
2. Task marked as **Reserved** for all other assigned users
3. Padlock icon appears next to claiming user in monitoring
4. Only claiming user can complete the task

### Best Practices

- Coordinate team assignments to avoid conflicts
- Use Integration Monitor role for stakeholders needing visibility
- Assign Integration Expert to implementation team members
- Reserve Integration Administrator for lead personnel

---

## Role Assignment Checklist

### Before Assignment

- [ ] Verify subaccount is subscribed to CIAS
- [ ] Confirm identity provider is configured
- [ ] Identify users requiring each role level
- [ ] Verify user IDs exist in identity provider

### During Assignment

- [ ] Use correct role collection name
- [ ] Add users via email ID or login user ID
- [ ] Save changes after each modification
- [ ] Verify assignment in Role Collection details

### After Assignment

- [ ] Have users test application access
- [ ] Verify appropriate tiles are visible
- [ ] Confirm task visibility in My Inbox
- [ ] Check Scenario Execution Monitoring access (if applicable)

---

## Troubleshooting Role Issues

### User Cannot Access Application

1. Verify role collection assignment
2. Check identity provider user exists
3. Confirm user is logging in with correct credentials
4. Review trust configuration settings

### User Cannot See Expected Tiles

| Missing Tile | Required Role |
|--------------|---------------|
| My Inbox | Administrator or Expert |
| Plan for Integration | Administrator only |
| Scenario Execution Monitoring | Administrator or Monitor |

### User Cannot Claim Tasks

1. Verify user has Expert or Administrator role
2. Check if another user has already claimed the task
3. Confirm user is assigned to the specific task

### Access Denied After IdP Change

1. Add users to new identity provider
2. Reassign role collections
3. Verify SAML attribute mapping
4. Test login with updated credentials

---

## Documentation Links

- Roles and Authorizations: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/roles-and-authorizations-917f842.md
- Role Assignment: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/role-assignment-cd6b96b.md
- Assigning Roles to Users: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/assigning-roles-to-the-users-9ad530a.md
- Identity Provider: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/identity-provider-and-identity-management-1508b49.md
