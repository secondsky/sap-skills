# Service Plans and Restrictions - Complete Reference

## Table of Contents

1. [Overview](#overview)
2. [Service Plans](#service-plans)
3. [Plan Restrictions Comparison](#plan-restrictions-comparison)
4. [Standard Plan Details](#standard-plan-details)
5. [Free Plan Details](#free-plan-details)
6. [Trial Plan Details](#trial-plan-details)
7. [Build-Code Plan Details](#build-code-plan-details)
8. [Changing Plans](#changing-plans)
9. [Metering](#metering)
10. [Documentation Links](#documentation-links)

---

## Overview

SAP Business Application Studio offers four service plans for different use cases. Each plan has specific resource limits optimized for standard SAP application development.

**Key Principle**: Computing resources (CPU, memory, storage) are limited and optimized for serving standard SAP application development use-cases.

**Important**: SAP Build Code users should refer to Build Code-specific restrictions.

---

## Service Plans

| Plan | Purpose | Support |
|------|---------|---------|
| **Standard** | Productive development in pre-configured dev spaces | Full SAP support |
| **Free** | Evaluation with restrictions | Community support only, no SLAs |
| **Trial** | Evaluation with time limits | Community support only, no SLAs |
| **Build-Code** | AI-based development with Joule | Requires SAP Build Code subscription |

### Subscription Rules

- Each subaccount supports only **one subscription**
- Multiple plans require separate subaccounts
- Plan changes require formal transition process

---

## Plan Restrictions Comparison

| Restriction | Standard | Free | Trial |
|-------------|----------|------|-------|
| **Max Dev Spaces** | 10 | 2 | 2 |
| **Running Simultaneously** | 2 | 1 | 1 |
| **Storage per Dev Space** | 10 GB | 4 GB | 4 GB |
| **Max Projects per Dev Space** | 50 | - | - |
| **Max Open Projects/MTA Modules** | 20 | - | - |
| **Java Classes per Compilation** | 1000 (27k lines) | - | - |
| **HANA Artifacts per Compilation** | 1000 | - | - |
| **Session Timeout** | - | - | 1 hour |
| **Inactivity Deletion** | - | - | 30 days |
| **Max Deployments (Productivity Tools)** | - | 2 | 2 |
| **Joule AI Requests** | Monthly quota | Monthly quota | 3-month allocation |

---

## Standard Plan Details

### Purpose
Productive development in pre-configured dev spaces with full SAP support.

### Resource Limits

| Resource | Limit |
|----------|-------|
| Dev spaces | Up to 10 |
| Running simultaneously | Up to 2 |
| Storage per dev space | 10 GB |
| Projects per dev space | 50 |
| Open projects/MTA modules | 20 at once |
| Java classes per compilation | 1000 (up to 27,000 lines) |
| HANA database artifacts | 1000 per compilation |

### AI Features
Monthly quota for Joule AI requests.

### Performance Notes

- Approaching limits may impact performance
- Exceeding thresholds means "performance can't be assured by the SAP Business Application Studio product license"
- Recommendation: Select data center geographically closer to your location

### Deletion Limits

| Limit | Value |
|-------|-------|
| Max deletions | 100 dev spaces |
| Retention period | 30 days |

---

## Free Plan Details

### Purpose
Evaluation with restrictions. Community support only, not subject to SLAs.

### Resource Limits

| Resource | Limit |
|----------|-------|
| Dev spaces | Up to 2 |
| Running simultaneously | 1 |
| Storage per dev space | 4 GB |
| Deployments (Productivity Tools) | 2 maximum |

### AI Features
Limited monthly quota of AI requests per user for Joule.

### Important Limitations

- **No Cloud Foundry subscription included**
- To deploy applications:
  1. Deploy to subaccount with existing CF subscription, OR
  2. Add CF subscription to current subaccount (free or paid)

### Deletion Limits

| Limit | Value |
|-------|-------|
| Max deletions | 50 dev spaces |
| Retention period | 14 days |

### Terms
Governed by SAP Business Technology Platform Supplement.

---

## Trial Plan Details

### Purpose
Evaluation with time-based limitations. Community support only, not subject to SLAs.

### Resource Limits

| Resource | Limit |
|----------|-------|
| Dev spaces | Up to 2 |
| Running simultaneously | 1 |
| Storage per dev space | 4 GB |
| Deployments (Productivity Tools) | 2 maximum |

### Time Limits

| Limit | Value |
|-------|-------|
| Session timeout | 1 hour of inactivity |
| Inactivity deletion | 30 consecutive days without running |

### AI Features
Limited quota allocated for 3 months at trial start.

### Regional Restrictions
SAP Build Code functionality restricted to **US10 region** for trial users.

### Terms
Governed by SAP Business Technology Platform Supplement.

---

## Build-Code Plan Details

### Purpose
Productive AI-based development with Joule integration.

### Prerequisites
- Subaccount must be subscribed to **SAP Build Code**

### Features
- AI-assisted development capabilities
- Joule integration
- All standard plan features

---

## Changing Plans

### Prerequisites
- Subaccount administrator access
- Understanding of data implications

### Process

1. Evaluate target plan restrictions
2. Back up critical dev space content to Git
3. Follow plan change procedures in SAP BTP Cockpit
4. Verify access after transition

### Considerations

- Dev spaces exceeding new plan limits may need adjustment
- Storage reduction may require cleanup
- Running dev space limits apply immediately

---

## Metering

### Metric

**Users**: Individuals authorized to access the Cloud Service, including those accessing platform applications.

### Additional Information

- SAP BTP Service Description Guide, Section 36
- Commercial Information Glossary for definitions

---

## Regional Availability

SAP Business Application Studio is available across multiple regions:

### AWS Regions
- Europe: eu10, eu11, eu12 (Frankfurt)
- US: us10, us10-trial (East), us11 (West)
- Asia-Pacific: Sydney, Singapore, Seoul, Tokyo
- Americas: Canada, Brazil

### Azure Regions
- Europe: Netherlands, Switzerland
- US: Washington, Virginia
- Asia-Pacific: Sydney, Singapore, Japan
- Americas: Brazil

### Google Cloud Regions
- Australia, US Central, India, Israel, Europe, Saudi Arabia

**Recommendation**: Connect to data center closest to physical location for best performance.

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Service Plans and Metering | https://help.sap.com/docs/bas/sap-business-application-studio/service-plans-and-metering |
| Standard Plan Restrictions | https://help.sap.com/docs/bas/sap-business-application-studio/standard-plan-restrictions |
| Free Plan Restrictions | https://help.sap.com/docs/bas/sap-business-application-studio/free-plan-restrictions |
| Trial Plan Restrictions | https://help.sap.com/docs/bas/sap-business-application-studio/trial-plan-restrictions |
| Availability | https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability |
| Discovery Center | https://discovery-center.cloud.sap/serviceCatalog/business-application-studio |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/btp-business-application-studio/tree/main/docs
