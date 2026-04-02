---
name: sap-btp-cloud-platform
description: "Comprehensive SAP Business Technology Platform (BTP) reference for cloud development, deployment, and operations. Use when setting up BTP accounts, working with Cloud Foundry environment, deploying to Kyma (Kubernetes, serverless), developing in ABAP environment (RAP, CDS), managing entitlements and quotas, configuring identity providers (XSUAA), using btp CLI or CF CLI, deploying multi-target applications (MTA), setting up connectivity (destinations, Cloud Connector), implementing CI/CD pipelines, extending SAP solutions, or troubleshooting BTP services. Covers all three runtime environments."
license: GPL-3.0
metadata:
  version: "1.1.0"
  last_verified: "2025-11-27"
  source: "[https://github.com/SAP-docs/sap-btp-cloud-platform"](https://github.com/SAP-docs/sap-btp-cloud-platform")
  keywords: [SAP BTP, Business Technology Platform, Cloud Foundry, Kyma, ABAP environment, subaccount, global account, entitlements, btp CLI, CF CLI, MTA, multi-target application, XSUAA, Cloud Identity Services, destinations, Cloud Connector, service binding, Kubernetes, serverless, RAP, CDS, CAP, CI/CD, extensions, trial account, free tier, enterprise account, CPEA, BTPEA, role collections, Neo environment, Helm, Docker, Istio, API Gateway, Eventing]
---

# SAP BTP Cloud Platform

## Related Skills

- **sap-btp-best-practices**: Use for architectural best practices, account setup guidance, and production deployment patterns
- **sap-cap-capire**: Use for CAP application development on BTP Cloud Foundry or Kyma environments
- **sap-fiori-tools**: Use for deploying Fiori applications to BTP or configuring BTP destinations
- **sap-ai-core**: Use when implementing AI/ML workloads on BTP or setting up AI services
- **sap-abap**: Use when working with ABAP Environment on BTP or extending S/4HANA Cloud
- **sap-btp-connectivity**: Use for setting up secure connections to on-premise systems via Cloud Connector
- **sap-btp-service-manager**: Use for programmatic service instance management on BTP

Comprehensive reference for SAP Business Technology Platform covering all runtime environments, account management, security, and operations.

**Documentation Source**: [https://github.com/SAP-docs/sap-btp-cloud-platform](https://github.com/SAP-docs/sap-btp-cloud-platform)
**SAP Help Portal**: [https://help.sap.com/docs/btp](https://help.sap.com/docs/btp)
**SAP Discovery Center**: [https://discovery-center.cloud.sap/](https://discovery-center.cloud.sap/)

## Table of Contents
- [1. Platform Overview](#1-platform-overview)
- [2. Account Model](#2-account-model)
- [3. Environments](#3-environments)
- [4. Commercial Models](#4-commercial-models)
- [5. Entitlements and Quotas](#5-entitlements-and-quotas)
- [6. Regions and Infrastructure](#6-regions-and-infrastructure)
- [7. User Management](#7-user-management)
- [8. Tools](#8-tools)
- [9. Security Essentials](#9-security-essentials)
- [10. Connectivity](#10-connectivity)
- [11. Development Patterns](#11-development-patterns)
- [12. CI/CD](#12-cicd)
- [13. Extensions](#13-extensions)
- [14. High Availability and Resilience](#14-high-availability-and-resilience)
- [15. Operations and Monitoring](#15-operations-and-monitoring)
- [16. Support](#16-support)
- [Bundled Resources](#bundled-resources)
- [Source Documentation](#source-documentation)

## 1. Platform Overview

SAP BTP integrates five technology portfolios: Application Development, Process Automation, Integration, Data & Analytics, and AI. Provides suite qualities: SAP Fiori UX, Cloud Identity Services, Master Data Integration, embedded analytics, SAP Task Center, and SAP Cloud ALM.

---

## 2. Account Model

### Hierarchy
```
Global Account → Directory (optional) → Subaccount (region-specific)
                                    ↓ CF: Org → Spaces
                                    ↓ Kyma: Cluster → Namespaces
                                    ↓ ABAP: System instance
```

### Key Entities
- **Global Account**: Contract with SAP, region-independent, manages entitlements
- **Directory**: Organizational container, up to 7 levels, optional entitlement management
- **Subaccount**: Region-specific deployment target hosting apps and services
- **Labels**: Metadata tags (up to 10 values per label)

### Account Types
- **Trial**: 90-day free exploration (4GB memory, 10 routes, 40 services, daily stops)
- **Enterprise**: Production use based on commercial contract
- **Free Tier**: Long-term testing with service-specific limits, no SLA

---

## 3. Environments

SAP BTP offers four runtime environments at the subaccount level:

### Cloud Foundry Environment
Open PaaS with polyglot support. Features: multiple buildpacks (Java, Node.js, Python, Go, PHP), spaces for separation, auto-scaling, SAP HANA integration.
```bash
cf login -a [https://api.cf.<region>.hana.ondemand.com](https://api.cf.<region>.hana.ondemand.com)
cf push my-app
cf bind-service my-app my-service-instance
```
**Structure**: Subaccount → Org (1:1) → Spaces

### Kyma Environment
Managed Kubernetes runtime based on open-source Kyma.
- **Default Modules**: istio (service mesh), api-gateway, btp-operator
- **Optional Modules**: serverless, eventing, application-connector, telemetry, keda
**Structure**: Subaccount → Cluster (1:1) → Namespaces

### ABAP Environment
Cloud ABAP development with RAP, CDS, SAP Fiori integration, ADT, 1:1 SAP HANA database per system.
**Use Cases**: Extend S/4HANA Cloud, build new cloud applications, transform ABAP custom code

### Neo Environment
**Status**: Sunsetting December 31, 2028. **Recommendation**: Migrate to CF/Kyma.

---

## 4. Commercial Models

### Consumption-Based
Access all eligible services with flexible usage. Flavors: SAP BTPEA, CPEA, Pay-As-You-Go. Benefits: Switch services on/off, access current and future services.

### Subscription-Based
Fixed cost for selected services, pay irrespective of consumption. Additional services require contract modification.

**Best Practice**: Use consumption-based for pilots, subscription for stable workloads.

## 5. Entitlements and Quotas

### Definitions
- **Entitlement**: Right to provision and consume a service plan
- **Quota**: Numeric quantity of consumption allowed
- **Service Plan**: Variant of a service (e.g., t-shirt sizes)

### Quota Types
- **Fixed**: Upper limit (subscription model)
- **Unlimited**: No limit, billed by usage (consumption model)

### Distribution Flow
Global Account → Directory (reserves) → Subaccount (consumes) → CF Space (optional)

---

## 6. Regions and Infrastructure

### Region Providers

| Provider | Examples |
|----------|----------|
| **SAP** | eu10, us10, ap10 |
| **AWS** | eu10, us10, ap10, ap11, ap12 |
| **Azure** | eu20, us20, ap20, jp20 |
| **Google Cloud** | us30, in30 |
| **Alibaba Cloud** | cn40 |

### Key Considerations

- Each subaccount assigned to exactly one region
- Multi-region requires separate deployments
- EU Access available in specific regions for compliance
- API endpoints vary by region instance

### Availability Zones

Multi-AZ deployment for high availability:
- Isolated power, network, cooling
- Automatic failover within region
- Both CF and Kyma support multi-AZ

---

## 7. User Management

### User Types

| Type | Description | Example |
|------|-------------|---------|
| **Platform Users** | Manage BTP infrastructure | Developers, administrators |
| **Business Users** | Use deployed applications | End users, customers |

### Identity Providers

| Provider | Use Case |
|----------|----------|
| **SAP ID Service** | Default, SAP community users |
| **SAP Cloud Identity Services** | Recommended for production |
| **Corporate IdP** | Via Identity Authentication proxy |

### Authorization Flow

```
Identity Provider
    ↓
SAP BTP (Shadow Users)
    ↓
Role Collections
    ↓
Application/Service Access
```

---

## 8. Tools

### Key Tools Overview
- **Administration**: SAP BTP Cockpit (web), btp CLI (automation), REST APIs, Terraform, SAP Automation Pilot
- **Development**: SAP Business Application Studio (VS Code-based), SAP Build (low-code), SAP Cloud SDK (Java/JS), ADT for Eclipse (ABAP)
- **Kubernetes/Kyma**: kubectl, kubelogin (OIDC), Helm, Pack (buildpacks), Docker Desktop

### Essential CLI Commands
```bash
# btp CLI
btp login --url [https://cpcli.cf.<region>.hana.ondemand.com](https://cpcli.cf.<region>.hana.ondemand.com)
btp list accounts/subaccount
btp create accounts/subaccount --display-name "Dev"
btp assign security/role-collection "Subaccount Administrator" --to-user user@example.com

# CF CLI
cf login -a [https://api.cf.<region>.hana.ondemand.com](https://api.cf.<region>.hana.ondemand.com)
cf target -o my-org -s my-space
cf push my-app
cf bind-service my-app my-service

# kubectl
kubectl get pods -n my-namespace
kubectl apply -f deployment.yaml
kubectl logs -f deployment/my-app
```

---

## 9. Security Essentials

### Authentication
**Recommended**: Corporate IdP → SAP Cloud Identity Services → SAP BTP

**XSUAA** provides OAuth 2.0 authorization, role-based access control, and application security descriptors (xs-security.json).

### Trust Configuration
1. Configure Identity Authentication tenant
2. Establish trust in subaccount
3. Map role collections to IdP groups
4. Assign users via role collections

### Best Practices
- Use TLS 1.2+ (mandatory)
- Enable MFA for administrators
- Maintain backup administrators in default IdP
- Use provisioning over federation for production
- Implement audit logging

## 10. Connectivity

### Destinations
Connect to remote systems without hardcoding URLs. Key authentication methods:
- `NoAuthentication` (public APIs)
- `OAuth2ClientCredentials` (service-to-service)
- `OAuth2SAMLBearerAssertion` (user propagation)
- `PrincipalPropagation` (on-premise with Cloud Connector)

### Cloud Connector
Secure tunnel for on-premise connectivity with no inbound firewall ports, fine-grained access control, RFC/HTTP support, and principal propagation.

---

## 11. Development Patterns

### Programming Models
- **CAP**: Java/Node.js/TypeScript for enterprise services, domain-driven development
- **ABAP Cloud**: Cloud-ready ABAP with RAP

### Multi-Target Applications (MTA)
Package multiple modules for deployment. Core structure includes modules (app types: nodejs, html5) and resources (services like hana).

### Application Router
Single entry point providing static content serving, user authentication, URL rewriting, and request forwarding to microservices.

## 12. CI/CD

### SAP Continuous Integration and Delivery
Managed service supporting Cloud Foundry apps (Fiori, CAP), SAP Fiori for ABAP Platform, and SAP Integration Suite artifacts.

### Pipeline Setup
1. Activate service in BTP cockpit
2. Assign Administrator/Developer roles
3. Configure repository credentials
4. Add code repository (GitHub, GitLab, Bitbucket, Azure Repos)
5. Create and configure CI/CD jobs

### Delivery Options
- **CI/CD**: Java/HTML5/CAP, Kyma apps (Cloud Integration in development)
- **Cloud Transport Mgmt**: Java/HTML5/CAP, Cloud Integration, SAP Build Work Zone

---

## 13. Extensions

### Extension Architecture
Build loosely coupled extensions: SAP Solution → APIs & Events → SAP BTP Extension → Custom Business Logic

### System Registration
1. Register systems in global account
2. Create formations (logical groupings)
3. Enable API/event exchange
4. Deploy extensions

### Supported Solutions
- **Cloud Foundry**: S/4HANA Cloud, Marketing Cloud, SuccessFactors
- **Kyma**: Above + Commerce Cloud, Field Service Management

## 14. High Availability and Resilience

### Resilience Strategies
- **Multi-AZ**: Deploy across availability zones
- **Multi-Region**: Deploy across geographic regions
- **In-Metro DR**: Synchronous replication within region

### Failover Implementation
1. Deploy in two data centers
2. Keep applications synchronized (CI/CD)
3. Define failover detection (5xx errors, timeouts)
4. Plan failback procedure

### SLAs
- **RPO**: Maximum 5 minutes data loss
- **RTO**: Service restoration within 2 hours

## 15. Operations and Monitoring

### Key Tools
- **SAP Cloud ALM**: Real user and health monitoring
- **SAP Cloud Logging**: Observability across CF, Kyma
- **SAP Alert Notification**: Multi-channel notifications
- **Audit Log Viewer**: Activity tracking

### Best Practices
- Deploy multiple application instances
- Implement Application Autoscaler
- Use blue-green deployment for updates
- Set up automated alerting
- Regular compliance verification

---

## 16. Support

### Getting Support
- **SAP for Me**: [https://me.sap.com/](https://me.sap.com/)
- **SAP Community**: [https://community.sap.com/](https://community.sap.com/)
- **Support Components**: BC-CP-* (component codes)

### Operating Model
- **SAP manages**: Platform software updates, infrastructure monitoring, BTP service monitoring, global account provisioning
- **You manage**: Account strategy, application development and security, role assignments and integrations, application monitoring

## Bundled Resources

### Reference Documentation
For detailed guidance, see the 13 reference files:
- `references/glossary.md` - Complete terminology (40+ terms)
- `references/cloud-foundry.md` - CF development and administration
- `references/kyma.md` - Kyma runtime and Kubernetes patterns
- `references/abap.md` - ABAP environment, RAP, CDS
- `references/security.md` - Authentication, authorization, identity
- `references/connectivity.md` - Destinations, Cloud Connector
- `references/development.md` - Development patterns, MTA, Application Router
- `references/administration.md` - Account management, btp CLI
- `references/operations.md` - Monitoring, alerting, logging
- `references/extensions.md` - SAP solution extensions, formations
- `references/tools.md` - CLI references, development tools
- `references/troubleshooting.md` - Common issues and solutions
- `references/regions-endpoints.md` - Region-specific API endpoints

## Source Documentation
- [https://github.com/SAP-docs/sap-btp-cloud-platform](https://github.com/SAP-docs/sap-btp-cloud-platform)
- [https://help.sap.com/docs/btp](https://help.sap.com/docs/btp)
- [https://discovery-center.cloud.sap/](https://discovery-center.cloud.sap/)

**Last Verified**: 2025-11-27
