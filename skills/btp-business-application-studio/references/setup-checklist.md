# Setup Checklist - Complete Reference

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup Steps](#setup-steps)
4. [Role Assignment](#role-assignment)
5. [Optional Configurations](#optional-configurations)
6. [Build & Deploy Prerequisites](#build--deploy-prerequisites)
7. [Verification](#verification)
8. [Documentation Links](#documentation-links)

---

## Overview

This checklist covers setting up SAP Business Application Studio for development.

**Important Notes**:
- SAP Build Code users: Follow [SAP Build Code Initial Setup](https://help.sap.com/docs/build_code) instead
- Trial account users: Refer to [Getting Started with a Trial Account](https://help.sap.com/docs/bas/sap-business-application-studio/getting-started-with-trial-account)

---

## Prerequisites

### Required

| Requirement | Description |
|-------------|-------------|
| SAP BTP Global Account | Active global account access |
| Cloud Foundry Environment | Subaccount must use CF environment |
| Administrator Access | Subaccount administrator privileges |
| Supported Browser | Mozilla Firefox, Google Chrome, or Microsoft Edge (latest versions) |

### Recommended

| Requirement | Description |
|-------------|-------------|
| Identity Provider | SAML 2.0 compliant IdP for custom authentication |
| Git Repository | Public or corporate Git for version control |
| Cloud Foundry Space | At least 1 space per development team |

---

## Setup Steps

### Step 1: Create a Subaccount

1. Log into SAP BTP Cockpit
2. Navigate to your global account
3. Create new subaccount with Cloud Foundry environment
4. Select region based on [BAS availability](https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability)

**Region Recommendation**: Choose data center closest to your physical location for best performance.

### Step 2: Configure Entitlements

1. In global account, go to Entitlements
2. Click Configure Entitlements → Add Service Plans
3. Search for "SAP Business Application Studio"
4. Select appropriate service plan:
   - `standard` - Productive development
   - `free` - Evaluation (no SLA)
   - `build-code` - AI-based development (requires Build Code)
5. Save changes

### Step 3: Subscribe to the Service

1. Navigate to your subaccount
2. Go to Instances and Subscriptions
3. Click Create
4. Search for "SAP Business Application Studio"
5. Select plan and create subscription

### Step 4: Assign Roles

1. Navigate to Security → Role Collections
2. Select `Business_Application_Studio_Developer`
3. Click Edit
4. Add user(s) by email address
5. Select Identity Provider
6. Save

**For Administrators**: Also assign administrator role collection.

---

## Role Assignment

### Available Roles

| Role Collection | Purpose | Capabilities |
|-----------------|---------|--------------|
| `Business_Application_Studio_Developer` | Development access | Create/manage dev spaces, develop applications |
| `Business_Application_Studio_Administrator` | Administration | Export/delete user data, restart dev spaces |
| `Business_Application_Studio_Extension_Deployer` | Extension deployment | Create and deploy custom extensions |

### Assignment Process

1. Navigate to Security → Role Collections in SAP BTP Cockpit
2. Select or create role collection
3. Click Edit
4. Enter user email address
5. Select Identity Provider (e.g., SAP ID Service, custom IdP)
6. Save changes

**Note**: Users needing both development and administration require both role collections assigned.

### China (Shanghai) Region

Create new role collections before assigning permissions (pre-built collections not available).

---

## Optional Configurations

### Step 5: Configure Identity Provider (Optional)

For custom IdP with assertion-based attribute mapping:

1. Navigate to Security → Trust Configuration
2. Add trusted identity provider
3. Configure attribute mappings
4. Test authentication flow

### Step 6: Connect Git Repositories (Optional)

**Public Repositories**:
- No additional configuration needed
- Clone directly from dev space

**Corporate Repositories**:
1. Administrator configures destination to corporate Git
2. Set up authentication (Personal Access Tokens recommended)
3. Configure Cloud Connector if on-premise

**Authentication Recommendation**: Use Personal Access Tokens (PATs) instead of passwords, refresh regularly.

### Step 7: Create Cloud Foundry Spaces (Optional)

1. Navigate to Cloud Foundry → Spaces in subaccount
2. Create new space
3. Recommendation: At least 1 space per development team working on same project

### Step 8: Assign Team Members (Optional)

Enable developer access to Cloud Foundry:

1. Navigate to Cloud Foundry → Space Members
2. Add developers with appropriate roles:
   - Space Developer
   - Space Manager (for team leads)

---

## Build & Deploy Prerequisites

### General Requirements

1. Log into Cloud Foundry account from dev space

### SAP HANA Cloud Applications

| Requirement | Action |
|-------------|--------|
| Entitlement | Add "SAP HANA Cloud, SAP HANA Schemas & HDI Containers" |
| Database | Create SAP HANA Cloud instance via HANA Cloud Central |
| Admin Tools | Subscribe to SAP HANA Cloud Administration Tools |

**Trial Account Special**: In database wizard, select "Allow all IP addresses" in Advanced Settings.

### Trial/Free Plan Requirements

| Requirement | Action |
|-------------|--------|
| Work Zone | Add "SAP Build Work Zone, standard edition" entitlement and subscribe |
| Role | Assign `Launchpad_Admin` role collection |
| CF Runtime | Add Cloud Foundry Runtime entitlements (adjustable based on needs) |

---

## Verification

### Test Access

1. Open SAP Business Application Studio URL
2. Authenticate with assigned identity
3. Verify Dev Space Manager loads
4. Create test dev space

### Test Development

1. Create dev space with appropriate type
2. Start dev space
3. Verify tools and extensions load
4. Test Git connectivity (if configured)

### Test Deployment (Optional)

1. Create simple project from template
2. Build project
3. Log into Cloud Foundry
4. Deploy to CF space
5. Verify application runs

---

## Quick Reference

### URLs

| Resource | Pattern |
|----------|---------|
| BAS Access | `https://<subaccount>.eu10.applicationstudio.cloud.sap` (varies by region) |
| BTP Cockpit | `https://cockpit.btp.cloud.sap` |
| Discovery Center | `https://discovery-center.cloud.sap/serviceCatalog/business-application-studio` |

### Key Commands

```bash
# Cloud Foundry Login
cf login -a <api-endpoint>

# Check CF Target
cf target

# List Services
cf services
```

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Setup Guide | https://help.sap.com/docs/bas/sap-business-application-studio/set-up-sap-business-application-studio |
| Subscription Guide | https://help.sap.com/docs/bas/sap-business-application-studio/subscribe-to-sap-business-application-studio |
| Role Assignment | https://help.sap.com/docs/bas/sap-business-application-studio/manage-authorizations-and-roles |
| Trial Account Setup | https://help.sap.com/docs/bas/sap-business-application-studio/getting-started-with-trial-account |
| Availability | https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability |
| Build & Deploy | https://help.sap.com/docs/bas/sap-business-application-studio/build-and-deploy |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/btp-business-application-studio/tree/main/docs
