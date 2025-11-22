# Setup Guide - SAP BTP Intelligent Situation Automation

**Source**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation/tree/main/docs
**Last Verified**: 2025-11-22

---

## Technical Prerequisites

### Supported SAP Systems

| System | Minimum Version | Notes |
|--------|-----------------|-------|
| SAP S/4HANA Cloud | Current | Full cloud-native support |
| SAP S/4HANA | 2021 FPS0 | On-premise, requires Cloud Connector |

### Administrator Requirements

You must have administrator role assignments for:
- SAP BTP global account
- SAP BTP subaccount (for subscription)
- SAP S/4HANA system (for API configuration)

---

## Additional Services

### Event Mesh Requirement

**Critical**: You must enable Event Mesh for your SAP BTP subaccount before subscribing to Intelligent Situation Automation.

Event Mesh enables:
- Real-time event communication between S/4HANA and BTP
- Business situation event publishing
- Situation type synchronization

**Documentation**: https://help.sap.com/docs/SAP_EM

### Event Mesh Service Instance

Create the Event Mesh instance in the **same subaccount** where you subscribe to Intelligent Situation Automation.

---

## Network Requirements

### Region Selection

| Setting | Value | Notes |
|---------|-------|-------|
| **Region** | Europe (Frankfurt) | Required for ISA |
| **Technical ID** | cf-eu10 | Use this in configurations |
| **Provider** | AWS | Amazon Web Services |
| **Environment** | Cloud Foundry | BTP CF environment |

**Documentation**: See SAP Help for available regions and hosts.

### Internet Connectivity

Ensure network access to:
- SAP BTP Cloud Foundry endpoints
- SAP Event Mesh endpoints
- Your S/4HANA system (via Cloud Connector for on-premise)

---

## Browser Support

Intelligent Situation Automation supports the standard browsers supported by SAP BTP.

**Reference**: [Feature Scope Description for SAP BTP, Cloud Foundry, ABAP, and Kyma Environments (PDF)](https://help.sap.com/http.svc/rc/5e8107bf49684962b897217040398007/Cloud/en-US/SAP_Cloud_Platform_FSD.pdf)

Consult the FSD document for specific browser versions and settings.

---

## Subscription Process

### Prerequisites Checklist

Before subscribing, ensure:
- [ ] Global account configured
- [ ] Administrator role assigned for global account
- [ ] Subaccount created in cf-eu10 region
- [ ] Event Mesh enabled in subaccount

### Step 1: Create Subaccount

Create a new subaccount with these settings:

| Setting | Value |
|---------|-------|
| Region | Europe (Frankfurt) |
| Technical ID | cf-eu10 |
| Environment | Cloud Foundry |

### Step 2: Configure Entitlements

1. Navigate to your global account in BTP Cockpit
2. Go to **Entitlements** → **Subaccount Assignments**
3. Select your subaccount
4. Add entitlement for **Intelligent Situation Automation**
5. Select the **standard** plan

### Step 3: Subscribe to Service

1. Navigate to your subaccount
2. Go to **Services** → **Service Marketplace**
3. Find **Intelligent Situation Automation**
4. Click **Create**
5. Select **standard** plan
6. Complete the subscription

### Subscription Plans

| Plan | Purpose |
|------|---------|
| standard | Production use with full features |

---

## Event Mesh Configuration

### Create Service Instance

1. Navigate to your subaccount
2. Go to **Services** → **Instances and Subscriptions**
3. Click **Create**
4. Select **Event Mesh**
5. Configure topic rules:

```json
{
  "topicRules": {
    "publishFilter": [],
    "subscribeFilter": ["saas/isa/cons/*"]
  }
}
```

### Create Service Key

After creating the service instance:

1. Open the Event Mesh service instance
2. Go to **Service Keys**
3. Click **Create Service Key**
4. Save the credentials for S/4HANA configuration

The service key credentials are needed to:
- Create the event channel in S/4HANA
- Configure SAP_COM_0092 communication scenario

---

## Post-Subscription Steps

After successful subscription:

1. **Assign Roles**: Grant SituationAutomationAdminUser to administrators
2. **Configure Destinations**: Create destination to your S/4HANA system
3. **Expose APIs**: Configure communication arrangements in S/4HANA
4. **Set Up Event Communication**: Create event channel and topic bindings
5. **Onboard System**: Use Onboard System app to complete setup

See `references/onboarding.md` for detailed onboarding steps.

---

## Verification Checklist

After setup, verify:

- [ ] Subscription status shows "Subscribed"
- [ ] Event Mesh instance created in same subaccount
- [ ] Event Mesh service key generated
- [ ] Subaccount region is cf-eu10
- [ ] Administrator roles assigned

---

## Troubleshooting Setup Issues

### Subscription Fails

**Possible Causes**:
- Missing entitlements
- Wrong region selected
- Quota exceeded

**Resolution**:
1. Verify entitlements are assigned to subaccount
2. Ensure subaccount is in cf-eu10 region
3. Check quota limits

### Event Mesh Instance Creation Fails

**Possible Causes**:
- Event Mesh not entitled
- Topic rules syntax error

**Resolution**:
1. Add Event Mesh entitlement
2. Verify JSON syntax in topic rules

---

## External Links

- **SAP BTP Documentation**: https://help.sap.com/docs/BTP
- **Event Mesh Documentation**: https://help.sap.com/docs/SAP_EM
- **Subscription Guide**: https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/7a3e39622be14413b2a4df7c02ca1170.html

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-22
