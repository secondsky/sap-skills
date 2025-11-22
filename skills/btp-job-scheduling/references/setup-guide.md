# SAP BTP Job Scheduling Service - Setup Guide

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Service Plans](#service-plans)
3. [Create Service Instance - BTP Cockpit](#create-service-instance---btp-cockpit)
4. [Create Service Instance - CF CLI](#create-service-instance---cf-cli)
5. [Create Service Instance - Kyma Dashboard](#create-service-instance---kyma-dashboard)
6. [XSUAA Configuration](#xsuaa-configuration)
7. [Complete Setup Workflow](#complete-setup-workflow)

---

## Prerequisites

### Account Requirements

| Requirement | Description |
|-------------|-------------|
| Global Account | SAP BTP global account |
| Subaccount | At least one subaccount with CF or Kyma enabled |
| Administrator Role | Global account administrator |
| Quota | Purchased quota for Job Scheduling and XSUAA services |

### Service Entitlements

| Service | Plan | Purpose |
|---------|------|---------|
| SAP Job Scheduling Service | standard | Job scheduling functionality |
| SAP Authorization and Trust Management (XSUAA) | application | OAuth 2.0 authentication |

### Cloud Foundry Requirements

- Created a Cloud Foundry space
- Assigned as Space Developer in your space
- Application deployed with exposed action endpoint
- Application and service in the same CF space (co-location required)

### Kyma Requirements

- Kyma environment enabled in subaccount
- Namespace created
- One of these roles:
  - `SAP_Job_Scheduling_Service_Admin`
  - `SAP_Job_Scheduling_Service_Viewer`

---

## Service Plans

### Standard Plan

The only available plan for SAP Job Scheduling Service.

| Feature | Value |
|---------|-------|
| Authentication | OAuth 2.0 |
| Service Name | `jobscheduler` |
| Plan Name | `standard` |
| Custom Parameters | None required (see below) |

**Note (November 2024 Update):** The `enable-xsuaa-support` property now **defaults to enabled**. No additional parameters are required during service instance creation. Previously, this had to be explicitly set.

---

## Create Service Instance - BTP Cockpit

### Prerequisites

- Logged on to SAP BTP cockpit
- Quota assigned to subaccount

### Step-by-Step Instructions

**Step 1: Access Service Marketplace**

1. Navigate to your subaccount
2. Go to **Services** → **Service Marketplace**
3. Locate **Job Scheduling Service**

**Step 2: Create Instance**

1. Click on Job Scheduling Service tile
2. Open **Actions** menu
3. Select **Create**
4. New Instance wizard launches

**Step 3: Configure Instance**

| Field | Value |
|-------|-------|
| Service Plan | standard (only option) |
| Instance Name | Your custom name (e.g., `my-jobscheduler`) |
| Parameters | None available |

**Step 4: Complete Creation**

1. Click **Next** through Parameters step (no customization available)
2. Review details
3. Click **Create**

**Step 5: Bind to Application**

1. Go to **Service Instances**
2. Select your new instance
3. Click **Bind Application**
4. Select your deployed Cloud Foundry application

---

## Create Service Instance - CF CLI

### Prerequisites

- CF CLI installed
- Logged into Cloud Foundry (`cf login`)
- Application deployed

### Commands

**1. Verify Service Availability:**

```bash
cf marketplace
```

Look for `jobscheduler` in the output.

**2. Create Service Instance:**

```bash
cf create-service jobscheduler standard my-jobscheduler
```

**3. Bind Service - Basic:**

```bash
cf bind-service my-app my-jobscheduler
```

**4. Bind Service - With X.509 Certificate:**

Create `parameters.json`:
```json
{
  "credential-type": "x509",
  "x509": {
    "key-length": 2048,
    "validity": 7,
    "validity-type": "DAYS"
  }
}
```

Bind with parameters:
```bash
cf bind-service my-app my-jobscheduler -c parameters.json
```

**5. Restage Application:**

```bash
cf restage my-app
```

**6. Verify Binding:**

```bash
cf env my-app
```

Check `VCAP_SERVICES` for `jobscheduler` credentials.

### VCAP_SERVICES Structure

**Standard Binding (clientsecret):**

```json
{
  "jobscheduler": [{
    "credentials": {
      "url": "https://jobscheduler-rest.cfapps.eu10.hana.ondemand.com",
      "uaa": {
        "url": "https://xxx.authentication.eu10.hana.ondemand.com",
        "clientid": "sb-xxx",
        "clientsecret": "xxx"
      }
    }
  }]
}
```

**X.509 Binding:**

```json
{
  "jobscheduler": [{
    "credentials": {
      "url": "https://jobscheduler-rest.cfapps.eu10.hana.ondemand.com",
      "uaa": {
        "certurl": "https://xxx.authentication.cert.eu10.hana.ondemand.com",
        "clientid": "sb-xxx",
        "certificate": "-----BEGIN CERTIFICATE-----\n...",
        "key": "-----BEGIN RSA PRIVATE KEY-----\n..."
      }
    }
  }]
}
```

---

## Create Service Instance - Kyma Dashboard

### Prerequisites

- Logged on to SAP BTP cockpit
- Kyma environment enabled

### Step-by-Step Instructions

**Step 1: Access Kyma Dashboard**

1. Navigate to your subaccount
2. Click **Link to Dashboard** in Kyma Environment section

**Step 2: Select Namespace**

1. Choose your target namespace

**Step 3: Create Service Instance**

1. Go to **Service Instances** section
2. Click **Create**
3. Fill in details:

| Field | Value |
|-------|-------|
| Service Name | `jobscheduler` |
| Plan | `standard` |
| Instance Name | Your custom name |

**Step 4: Create Service Binding**

1. Navigate to **Service Bindings**
2. Click **Create**
3. Select your service instance
4. Provide binding name

**Step 5: Mount Service in Application**

Connect the service binding to your application deployment using SAP BTP Operator module.

### Kyma-Specific Notes

- Use SAP BTP Operator for service management
- Service bindings mounted as Kubernetes secrets
- Refer to Kyma documentation for detailed deployment patterns

---

## XSUAA Configuration

### Purpose

XSUAA provides OAuth 2.0 authentication for job action endpoints. Job Scheduling Service needs scope grants to call protected endpoints.

### xs-security.json Template

```json
{
  "xsappname": "my-app",
  "tenant-mode": "dedicated",
  "scopes": [
    {
      "name": "$XSAPPNAME.JOBSCHEDULER",
      "description": "Job Scheduler Scope",
      "grant-as-authority-to-apps": [
        "$XSSERVICENAME(my-jobscheduler)"
      ]
    }
  ],
  "authorities": [
    "$XSAPPNAME.JOBSCHEDULER"
  ]
}
```

### Key Configuration Elements

| Element | Description |
|---------|-------------|
| `$XSAPPNAME` | Automatically replaced with app name |
| `$XSSERVICENAME(instance)` | References Job Scheduling instance |
| `grant-as-authority-to-apps` | Grants scope to Job Scheduling service |

### Apply Configuration

**Create XSUAA Instance:**

```bash
cf create-service xsuaa application my-xsuaa -c xs-security.json
```

**Update Existing Instance:**

```bash
cf update-service my-xsuaa -c xs-security.json
```

**Bind XSUAA to Application:**

```bash
cf bind-service my-app my-xsuaa
cf restage my-app
```

### Scope Grant Workflow

1. Application defines scope in `xs-security.json`
2. Scope granted to Job Scheduling service via `grant-as-authority-to-apps`
3. Job Scheduling obtains token from UAA with granted scope
4. Job Scheduling includes token when calling action endpoint
5. Application validates token using bound XSUAA instance

---

## Complete Setup Workflow

### Recommended Order

```
1. Deploy Application
   └─ Expose action endpoint (HTTPS)

2. Create XSUAA Instance
   └─ Configure xs-security.json with scope grants
   └─ cf create-service xsuaa application my-xsuaa -c xs-security.json

3. Bind XSUAA to Application
   └─ cf bind-service my-app my-xsuaa

4. Create Job Scheduling Instance
   └─ cf create-service jobscheduler standard my-jobscheduler

5. Bind Job Scheduling to Application
   └─ cf bind-service my-app my-jobscheduler

6. Restage Application
   └─ cf restage my-app

7. Create Jobs via REST API or Dashboard
```

### Verification Checklist

- [ ] Application deployed and accessible
- [ ] Action endpoint exposed and working
- [ ] XSUAA instance created with correct scopes
- [ ] XSUAA bound to application
- [ ] Job Scheduling instance created
- [ ] Job Scheduling bound to application
- [ ] Application restaged
- [ ] VCAP_SERVICES contains both services
- [ ] Can obtain OAuth token successfully
- [ ] Can access Job Scheduling dashboard

### Common Setup Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Service not found | Missing entitlement | Add quota to subaccount |
| 401 Unauthorized | Missing scope grant | Update xs-security.json |
| 403 Forbidden | Wrong space | Ensure co-location |
| Instance not visible | Not bound | Bind service to app |

---

## External References

### SAP Documentation
- **Initial Setup**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/initial-setup
- **Getting Started**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/getting-started
- **XSUAA Documentation**: https://help.sap.com/docs/btp/sap-business-technology-platform/security

### Source Files
- `initial-setup-0adb655.md`
- `create-a-service-instance-in-sap-btp-cockpit-e267ab6.md`
- `create-a-service-instance-using-cf-cli-cb56f9e.md`
- `create-a-service-instance-in-the-kyma-dashboard-224a49a.md`
- `getting-started-02e4e8b.md`
