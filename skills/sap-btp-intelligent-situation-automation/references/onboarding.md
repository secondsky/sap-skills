# Onboarding Guide - SAP BTP Intelligent Situation Automation

**Source**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation/tree/main/docs
**Last Verified**: 2025-11-22

---

## Overview

Onboarding connects your SAP S/4HANA or SAP S/4HANA Cloud system to Intelligent Situation Automation on SAP BTP. This enables real-time situation events to flow from S/4HANA to BTP for automated processing.

## Prerequisites

- Administrator role assignment
- Intelligent Situation Automation subscription active
- Event Mesh service instance created with service key

---

## Onboarding Activities

Four activities must be completed:

1. **Expose Situation Handling APIs** - Enable API access in S/4HANA
2. **Configure Destinations on SAP BTP** - Point BTP to your S/4HANA system
3. **Set Up Communication With SAP BTP** - Configure Event Mesh integration
4. **Onboard S/4HANA System** - Complete onboarding via application

---

## 1. Expose Situation Handling APIs

### SAP S/4HANA Cloud

Create communication arrangements for these scenarios:

| Communication Scenario | Code | Purpose |
|-----------------------|------|---------|
| Business Situation Integration | SAP_COM_0345 | Read situation data |
| Business Situation Master Data Integration | SAP_COM_0376 | Read situation type data |

**Steps**:
1. Log into SAP S/4HANA Cloud
2. Navigate to **Communication Management**
3. Create communication arrangement for SAP_COM_0345
4. Create communication arrangement for SAP_COM_0376
5. Note the authentication credentials

**Reference**: See [SAP S/4HANA Cloud Communication Management](https://help.sap.com/docs/S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa)

### SAP S/4HANA (On-Premise)

Expose and activate these APIs:

| API | Purpose |
|-----|---------|
| Business Situation - Read | Access situation instances |
| Business Situation Type - Read | Access situation type definitions |

**Steps**:
1. Log into SAP S/4HANA GUI
2. Enter transaction `/IWFND/MAINT_SERVICE`
3. Choose **Add Service** to publish the Business Situation - Read OData service
4. Select the appropriate system alias and activate the service
5. Repeat for Business Situation Type - Read OData service

**Additional Requirement**: Install and configure SAP Cloud Connector to enable BTP access to on-premise system.

**Reference**: See [Activate and Maintain Services](https://help.sap.com/docs/SAP_S4HANA/684cffda9cbc4187ad7dad790b03b983) and [Activate OData Services for APIs](https://help.sap.com/docs/SAP_S4HANA/684cffda9cbc4187ad7dad790b03b983/fb3f3ce1a8b14b53a7fb4f847c920afc.html)

---

## 2. Configure Destinations on SAP BTP

### Create Destination

1. Open SAP BTP Cockpit
2. Navigate to your subaccount
3. Go to **Connectivity** → **Destinations**
4. Click **New Destination**
5. Configure destination pointing to S/4HANA system

### Destination URL Requirements

**Critical**: The URL must contain **only the base URL** of the SAP S/4HANA system.

| ✅ Correct | ❌ Incorrect |
|-----------|-------------|
| `https://my-s4hana.company.com` | `https://my-s4hana.company.com/sap/opu/odata/` |
| `https://my-s4hana.s4hana.ondemand.com` | `https://my-s4hana.company.com/api/v1` |

### Subaccount Constraints

**Important Limitation**: A single subaccount must connect to **one** SAP S/4HANA or SAP S/4HANA Cloud system only.

- All destinations in a subaccount must reference the **same** S/4HANA system
- You cannot mix destinations to different S/4HANA systems

### Connecting to a Different System

If you need to connect to a different S/4HANA system:

| Option | Action |
|--------|--------|
| Option A | Create a **separate subaccount** for the new system |
| Option B | **Unsubscribe** from ISA and **resubscribe** with new destination |

---

## 3. Set Up Communication With SAP BTP

Communication uses the Business Event Handling framework with SAP Event Mesh.

### Create Event Mesh Service Instance

Ensure the Event Mesh instance exists in the same subaccount as ISA subscription.

**Topic Rules Configuration**:
```json
{
  "topicRules": {
    "publishFilter": [],
    "subscribeFilter": ["saas/isa/cons/*"]
  }
}
```

### Create Event Mesh Service Key

1. Open Event Mesh service instance
2. Navigate to **Service Keys**
3. Click **Create Service Key**
4. Save credentials for event channel setup

### Create Event Channel

#### SAP S/4HANA Cloud

Use communication scenario SAP_COM_0092 (Enterprise Event Enablement):

1. Create communication arrangement for SAP_COM_0092
2. Use Event Mesh service key credentials
3. Set **Topic Space**: `saas/isa/cons`

#### SAP S/4HANA (On-Premise)

Follow the on-premise event channel creation procedure using Event Mesh service key.

### Maintain Outbound Event Topic Bindings

Bind these topics as **outbound topics**:

| Topic Pattern |
|---------------|
| `sap/s4/beh/businesssituation/v1/BusinessSituation/*` |
| `sap/s4/beh/businesssituationtype/v1/BusinessSituationType/*` |

#### SAP S/4HANA Cloud
Use the Maintain Outbound Event Topic Bindings application.

#### SAP S/4HANA (On-Premise)
Use the on-premise topic binding maintenance procedure.

---

## 4. Onboard S/4HANA System

### Prerequisites

- SituationAutomationAdminUser role assigned
- Destination configured and accessible
- Event channel configured with topic bindings

### Using the Onboard System Application

**Step 1**: Launch Application
- Access the *Onboard System* application from your BTP subscription

**Step 2**: Add New System
- Click **Add** to start adding a new system

**Step 3**: Select Destination
- Choose the destination from the list that points to your S/4HANA system

**Step 4**: Test Connection
- Click **Check Connection** to verify connectivity
- Ensure the test passes before proceeding

**Step 5**: Enter System Details
- **Name**: Enter a descriptive system name
- **Description**: Add system description

**Step 6**: Create System
- Click **Create** to initiate onboarding

**Step 7**: Monitor Progress
- Watch the progress indicator
- Status transitions: **Pending** → **Successful** or **Failed**

### Onboarding Status

| Status | Meaning |
|--------|---------|
| Pending | Onboarding in progress |
| Successful | System onboarded and ready |
| Failed | Onboarding encountered errors |

### Troubleshooting Failed Onboarding

If onboarding fails:

1. **Hover over info icon** to see error details
2. **Fix the issue** based on error message
3. Click **Retry** to attempt onboarding again

**Common Issues**:
- Destination URL incorrect (not base URL only)
- Event channel not configured
- Topic bindings missing
- Authentication credentials invalid

**Persistent Failures**: After multiple retry attempts, create an incident under component **CA-SIT-ATM**.

### Editing Onboarded System

To modify system details:

1. Click the **edit icon** next to the onboarded system
2. Update name or description
3. **Note**: Destination must still point to the same system
4. Click **Save**

---

## Verification Checklist

After onboarding, verify:

- [ ] APIs exposed in S/4HANA (SAP_COM_0345, SAP_COM_0376)
- [ ] Destination configured with base URL only
- [ ] Event Mesh service instance in same subaccount
- [ ] Event channel created with correct topic space
- [ ] Topic bindings for BusinessSituation and BusinessSituationType
- [ ] System shows "Successful" status in Onboard System app

---

## Event Flow Diagram

```
S/4HANA                    Event Mesh                BTP (ISA)
   │                           │                        │
   │ Business Situation Event  │                        │
   ├──────────────────────────►│                        │
   │                           │ saas/isa/cons/*        │
   │                           ├───────────────────────►│
   │                           │                        │
   │                           │                        │ Process Situation
   │                           │                        │ Execute Actions
   │                           │                        │
```

---

## External Resources

For a complete list of SAP documentation links and document IDs, see `references/external-links.md`.

Key resources:
- **Cloud Connector**: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf
- **Event Mesh**: https://help.sap.com/docs/SAP_EM

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-22
