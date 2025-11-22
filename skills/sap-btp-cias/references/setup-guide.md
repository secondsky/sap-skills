# SAP BTP CIAS Setup Guide

Complete guide for subscribing to and configuring Cloud Integration Automation Service.

**Source**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs

---

## Prerequisites

### SAP BTP Subaccount Requirements

Your organization must have an SAP BTP subaccount in a supported region with licensed SAP products in scope.

### Supported Cloud Platforms and Regions

**Amazon Web Services (AWS)**:
| Region | Code | Location |
|--------|------|----------|
| Europe (Frankfurt) | EU10 | Germany |
| Europe (Frankfurt) EU Access | EU11 | Germany |
| US East | US10 | Virginia, USA |
| Australia | AP10 | Sydney |
| Japan | JP10 | Tokyo |
| Canada | CA10 | Montreal |

**Microsoft Azure**:
| Region | Code | Location |
|--------|------|----------|
| Europe | EU20 | Netherlands |
| China | CN20 | North 3 |

**Alibaba Cloud**:
| Region | Code | Location |
|--------|------|----------|
| China | CN40 | Shanghai |

---

## Subscription to Standard Plan (Application Access)

### Step-by-Step Process

1. **Login to SAP BTP Cockpit**
   - Access your global account in the cockpit
   - Navigate to your subaccount

2. **Create Subaccount** (if needed)
   - Set up subaccount in one of the supported regions listed above

3. **Access Service Marketplace**
   - Navigate to **Services** → **Service Marketplace**
   - View all entitled resources

4. **Filter for CIAS**
   - Use "All Types" filter
   - Select "Cloud Integration Automation Service" from dropdown
   - Additional filters available: environments, capabilities, status

5. **View Service Overview**
   - Select the service tile
   - Review Overview page with application details and available plans

6. **Initiate Creation**
   - Click **Create** button
   - Alternative: Click three dots on tile to create without viewing overview

7. **Select Standard Plan**
   - Choose **Standard** plan (subscription type)
   - Confirm creation

### Post-Subscription

- **Active status** indicates successful subscription
- **Go to Application** link activates once subscription is live
- Access via **Instances and Subscriptions** page or application column icon

> **Warning**: Deleting the application via three-dot menu results in complete data loss for that subaccount.

---

## Subscription to OAuth2 Plan (API Access)

Required for programmatic access and ABAP automation scenarios.

### Service Instance Creation

1. **Access Space in SAP BTP Cockpit**
   - Navigate to your Cloud Foundry space

2. **Open Service Marketplace**
   - Select **Services** → **Service Marketplace**

3. **Locate CIAS**
   - Find Cloud Integration Automation tile in Integration section

4. **Create Instance**
   - Click **Create**
   - Select **OAuth2** plan from popup
   - Choose runtime environment: "Other" or "Cloud Foundry"
   - Provide instance name
   - Create instance

Instance appears on the Instances page. All service instances within the same organization share the same data.

### Service Key Creation

Service keys enable standalone API calls without UI access.

#### Option 1: With mTLS Certificate

Use JSON parameters for certificate-based authentication:

```json
{
  "xsuaa": {
    "credential-type": "x509",
    "x509": {
      "key-length": 2048,
      "validity": 365,
      "validity-type": "DAYS"
    }
  }
}
```

> Maximum certificate validity is **1 year**.

#### Option 2: Without Certificate

- Provide service key name only
- Create key

### API Authentication

1. Retrieve generated client ID and client secret from service key
2. Create OAuth JWT token using these credentials
3. Use token to connect to Cloud Integration Automation service APIs

---

## Assigning Roles to Users

### Prerequisites

- Subaccount subscribed to CIAS in Cloud Foundry environment
- User has Security Admin access to subaccount

### Available Role Collections

Three role collections are automatically created during subscription:

| Role Collection | Role | Capabilities |
|-----------------|------|--------------|
| CIASIntegrationAdministrator | Integration Administrator | Full access to all tiles; plan scenarios; monitor; terminate |
| CIASIntegrationExpert | Integration Expert | My Inbox access; work on assigned tasks |
| CIASIntegrationMonitor | Integration Monitor | Read-only Scenario Execution Monitoring |

### Assignment Process

1. **Navigate to Role Collections**
   - Go to **Security** → **Role Collections** in left menu

2. **Select Role Collection**
   - Choose appropriate collection (e.g., CIASIntegrationAdministrator)

3. **Edit Users**
   - Click **Edit**
   - Go to **Users** tab
   - Add users via email ID or login user ID

4. **Alternative: Trust Configuration**
   - Add users through SAP IDP, custom IDP, or IAS tenant
   - Navigate to **Trust configuration** settings

### Multi-User Assignment

You can assign multiple users per role with comma-separated user IDs.

### Important Considerations

- User access depends on identity provider configured for subaccount
- CIAS supports any SAML assertion Name ID attribute
- Changing identity providers after subscription may disable access unless new users are managed by updated provider

---

## Destination Configuration

### Overview

Automation services use destinations configured in the consumer SAP BTP subaccount. The subaccount administrator manages destination creation with configuration data remaining exclusively in the consumer subaccount.

### Authorization

By default, a **Cloud Integration Automation Service Integration Administrator** has authorization to create destinations in the subscription subaccount.

### Security Requirements

- **Always use HTTPS** for secure communication
- Delete destinations after workflow completion (recommended)
- Users executing automation must have authorization on respective target systems

### Destination Creation Process

1. **Access CIAS Launchpad**
   - Open Cloud Integration Automation service application

2. **Navigate to My Inbox**
   - Open **My Inbox** tile

3. **Access System Components**
   - Expand relevant system under **Confirm System Components**

4. **Create Destination**
   - Click **Create Destination** link next to assign destination option

5. **Configure Destination**
   - **Name**: Valid identifier for the destination
   - **Description**: Details about destination purpose
   - **URL**: Target system host URL (use HTTPS)
   - **Authentication**: Appropriate method with credentials
   - **Type**: HTTP (default)

6. **Save Configuration**

### Editing Destinations

During scenario execution, Integration Administrators can modify or set destinations:

1. Navigate to **Targets** tab in **Scenario Execution Monitoring**
2. Click **Edit Destination** button
3. Select existing destination or create new one
4. Click **Save**

> Destination cannot be changed if already used in an automation task.

---

## Confirm System Components

System components are automatically populated from maintenance planner selections.

### Access Requirements

Only users with Admin role can view and complete this task.

### Confirmation Process

1. Review components listed
2. Assign destinations to system components as needed
3. For missing destinations: Create in SAP BTP subaccount and refresh

### Manual Property Entry

Some scenarios permit manually entering system properties when management system data isn't automatically displayed.

### Workflow Conflict Handling

When multiple integration workflows exist with identical system components, an execution lock activates.

**Resolution Options**:
- **Proceed**: Continue without resolving (manual resolution later)
- **Terminate**: End selected conflicting instances
- **Terminate Current Instance**: Stop the active workflow
- **Cancel**: Halt the operation

---

## Unsubscribe Process

### Who Can Unsubscribe

Only platform Administrators can delete subscriptions.

### Process

1. Navigate to **Instance and Subscription** in SAP BTP Cockpit
2. Locate CIAS subscription
3. Delete subscription

### Consequences

- Removes subscription from consumer subaccount
- Eliminates technical connection
- **Permanently deletes all transactional information**
- Data cannot be recovered once deleted

---

## Documentation Links

- Subscription Overview: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/subscription-to-cloud-integration-automation-service-b3a72d9.md
- Standard Plan: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/subscription-to-standard-plan-c8ed936.md
- OAuth2 Instance: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/create-instance-in-oauth2-service-plan-6187a7e.md
- Role Assignment: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/assigning-roles-to-the-users-9ad530a.md
- Destinations: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/destinations-496a763.md
