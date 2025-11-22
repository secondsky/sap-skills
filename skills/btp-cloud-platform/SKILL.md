---
name: btp-cloud-platform
description: |
  Comprehensive SAP Business Technology Platform (BTP) reference for cloud development, deployment, and operations. Use when setting up BTP accounts (global accounts, directories, subaccounts), working with Cloud Foundry environment (orgs, spaces, buildpacks, service bindings), deploying to Kyma environment (Kubernetes, modules, serverless functions), developing in ABAP environment (RAP, CDS, ADT), managing entitlements and quotas, configuring identity providers (SAP Cloud Identity Services, XSUAA), implementing authentication and authorization (role collections, trust configuration), using btp CLI or CF CLI, deploying multi-target applications (MTA), setting up connectivity (destinations, Cloud Connector), implementing CI/CD pipelines (SAP Continuous Integration and Delivery), extending SAP solutions (S/4HANA Cloud, SuccessFactors), or troubleshooting BTP services. Covers all three runtime environments with production-tested patterns.

  Keywords: SAP BTP, SAP Business Technology Platform, Cloud Foundry, CF, Kyma, ABAP environment, subaccount, global account, directory, entitlements, quotas, btp CLI, CF CLI, MTA, multi-target application, XSUAA, SAP Authorization and Trust Management, Cloud Identity Services, Identity Authentication, destinations, Cloud Connector, service binding, buildpack, Kubernetes, serverless, RAP, CDS, CAP, SAP Cloud Application Programming Model, CI/CD, SAP Continuous Integration and Delivery, extensions, formations, trial account, free tier, enterprise account, consumption-based, subscription-based, CPEA, BTPEA, regions, availability zones, high availability, disaster recovery, audit logging, role collections, platform users, business users, Neo environment, service broker, space, org, namespace, Helm, Docker, Istio, API Gateway, Eventing
license: MIT
metadata:
  version: "1.0.0"
  last_verified: "2025-11-22"
  source: "https://github.com/SAP-docs/btp-cloud-platform"
---

# SAP BTP Cloud Platform

Comprehensive reference for SAP Business Technology Platform covering all runtime environments, account management, security, and operations.

## Quick Reference

**Documentation Source**: https://github.com/SAP-docs/btp-cloud-platform
**SAP Help Portal**: https://help.sap.com/docs/btp
**SAP Discovery Center**: https://discovery-center.cloud.sap/
**Progress Tracking**: See `PROGRESS_TRACKING.md` for coverage details

---

## 1. Platform Overview

SAP Business Technology Platform integrates five technology portfolios:
- **Application Development**: Build cloud-native applications
- **Process Automation**: Automate business processes
- **Integration**: Connect SAP and third-party systems
- **Data & Analytics**: Turn data into insights
- **Artificial Intelligence**: Embed AI capabilities

### Suite Qualities

| Quality | Description |
|---------|-------------|
| **User Experience** | SAP Fiori for consistent UI across solutions |
| **Security & Identity** | Cloud Identity Services for SSO |
| **Data Integration** | Master Data Integration, APIs, events |
| **Analytics** | Embedded insights in SAP solutions |
| **Task Management** | SAP Task Center for unified tasks |
| **Lifecycle Management** | SAP for Me, SAP Cloud ALM |

---

## 2. Account Model

### Hierarchy

```
Global Account (contract with SAP)
├── Directory (optional, up to 5 levels)
│   ├── Subaccount (region-specific)
│   │   ├── Cloud Foundry: Org → Spaces
│   │   ├── Kyma: Cluster → Namespaces
│   │   └── ABAP: System instance
│   └── Subaccount
└── Subaccount
```

### Key Entities

| Entity | Description | Key Points |
|--------|-------------|------------|
| **Global Account** | Contract realization with SAP | Region-independent, manages entitlements |
| **Directory** | Organizational container | Up to 7 levels deep, optional entitlement management |
| **Subaccount** | Deployment target | Region-specific, hosts apps and services |
| **Labels** | Metadata tags | Up to 10 values per label, for filtering/reporting |

### Account Types

| Type | Purpose | Limitations |
|------|---------|-------------|
| **Trial** | 90-day free exploration | 4GB app memory, 10 routes, 40 services, apps stop daily |
| **Enterprise** | Production use | Based on commercial contract |
| **Free Tier** | Long-term testing | Service-specific limits, no SLA |

---

## 3. Environments

SAP BTP offers four runtime environments at the subaccount level:

### Cloud Foundry Environment

Open PaaS with polyglot application support:

```bash
# CLI setup
cf login -a https://api.cf.<region>.hana.ondemand.com

# Deploy application
cf push my-app

# Bind service
cf bind-service my-app my-service-instance
```

**Features**:
- Multiple buildpacks (Java, Node.js, Python, Go, PHP)
- Spaces for environment separation (dev/test/prod)
- Automatic scaling and load balancing
- SAP HANA extended application services integration

**Structure**: Subaccount → Org (1:1) → Spaces

### Kyma Environment

Managed Kubernetes runtime based on open-source Kyma:

**Default Modules**:
- `istio` - Service mesh
- `api-gateway` - API exposure and security
- `btp-operator` - SAP BTP service consumption

**Optional Modules**:
- `serverless` - Function deployment
- `eventing` - CloudEvents pub/sub
- `application-connector` - External system integration
- `telemetry` - Logs and traces collection
- `keda` - Event-driven autoscaling

**Structure**: Subaccount → Cluster (1:1) → Namespaces

### ABAP Environment

Cloud ABAP development platform:

**Features**:
- ABAP RESTful Application Programming Model (RAP)
- Core Data Services (CDS)
- SAP Fiori integration
- ABAP Development Tools for Eclipse (ADT)
- 1:1 SAP HANA database per system

**Use Cases**:
- Extend SAP S/4HANA Cloud
- Build new cloud applications
- Transform existing ABAP custom code

### Neo Environment

**Status**: Sunsetting December 31, 2028
**Recommendation**: Migrate to multi-cloud foundation (CF/Kyma)

---

## 4. Commercial Models

### Consumption-Based

Access all eligible services with flexible usage:

| Flavor | Description |
|--------|-------------|
| **SAP BTPEA** | BTP Enterprise Agreement |
| **CPEA** | Cloud Platform Enterprise Agreement |
| **Pay-As-You-Go** | Billed for exact usage |

**Benefits**: Switch services on/off, access all current and future eligible services

### Subscription-Based

Fixed cost for selected services:
- Pay irrespective of consumption
- Services specified in contract
- Additional services require contract modification

**Best Practice**: Use consumption-based for pilots, subscription for stable workloads.

---

## 5. Entitlements and Quotas

### Definitions

| Term | Description |
|------|-------------|
| **Entitlement** | Right to provision and consume a service plan |
| **Quota** | Numeric quantity of consumption allowed |
| **Service Plan** | Variant of a service (e.g., t-shirt sizes) |

### Quota Types

- **Fixed**: Upper limit for consumption (subscription model)
- **Unlimited**: No limit, billed by usage (consumption model)

### Distribution Flow

```
Global Account Entitlements
    ↓
Directory (reserves quota)
    ↓
Subaccount (consumes quota)
    ↓
CF Space (optional space quotas)
```

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

### Administration Tools

| Tool | Use Case |
|------|----------|
| **SAP BTP Cockpit** | Web-based administration |
| **btp CLI** | Terminal/automation scripting |
| **REST APIs** | Programmatic administration |
| **Terraform Provider** | Infrastructure as Code |
| **SAP Automation Pilot** | Low-code automation |

### Development Tools

| Tool | Use Case |
|------|----------|
| **SAP Business Application Studio** | Web-based IDE (VS Code based) |
| **SAP Build** | Low-code/no-code development |
| **SAP Cloud SDK** | Java/JavaScript development |
| **ADT for Eclipse** | ABAP development |

### Kubernetes/Kyma Tools

- `kubectl` - Kubernetes CLI
- `kubelogin` - OIDC authentication
- `Helm` - Package management
- `Pack` (Paketo) - Cloud Native Buildpacks
- `Docker Desktop` - Container development

### CLI Quick Reference

```bash
# btp CLI - global account operations
btp login --url https://cpcli.cf.<region>.hana.ondemand.com
btp list accounts/subaccount
btp create accounts/subaccount --display-name "Dev"
btp assign security/role-collection "Subaccount Administrator" --to-user user@example.com

# CF CLI - application operations
cf login -a https://api.cf.<region>.hana.ondemand.com
cf target -o my-org -s my-space
cf push my-app
cf services
cf bind-service my-app my-service

# Kyma - kubectl operations
kubectl get pods -n my-namespace
kubectl apply -f deployment.yaml
kubectl logs -f deployment/my-app
```

---

## 9. Security Essentials

### Authentication

**Recommended Setup**:
```
Corporate IdP → SAP Cloud Identity Services → SAP BTP
```

**SAP Authorization and Trust Management Service (XSUAA)**:
- OAuth 2.0 authorization server
- Role-based access control
- Application security descriptors (xs-security.json)

### Trust Configuration

1. Configure Identity Authentication tenant
2. Establish trust in subaccount
3. Map role collections to IdP groups
4. Assign users via role collections

### Security Best Practices

- Use TLS 1.2 or higher (mandatory)
- Enable MFA for administrators
- Maintain backup administrators in default IdP
- Use provisioning over federation for production
- Implement audit logging

---

## 10. Connectivity

### Destinations

Connect to remote systems without hardcoding URLs:

```json
{
  "Name": "my-destination",
  "Type": "HTTP",
  "URL": "https://my-backend.example.com",
  "Authentication": "OAuth2SAMLBearerAssertion",
  "ProxyType": "Internet"
}
```

**Authentication Methods**:
- `NoAuthentication` - Public APIs
- `BasicAuthentication` - Testing only
- `OAuth2ClientCredentials` - Service-to-service
- `OAuth2SAMLBearerAssertion` - User propagation
- `PrincipalPropagation` - On-premise with Cloud Connector

### Cloud Connector

Secure tunnel for on-premise connectivity:
- No inbound firewall ports required
- Fine-grained access control
- Supports RFC, HTTP protocols
- Enables principal propagation
- One configuration per subaccount

---

## 11. Development Patterns

### Programming Models

| Model | Language | Use Case |
|-------|----------|----------|
| **CAP** | Java/Node.js/TypeScript | Enterprise services, domain-driven |
| **ABAP Cloud** | ABAP | Cloud-ready ABAP, RAP |

### Multi-Target Applications (MTA)

Package multiple modules for deployment:

```yaml
# mta.yaml
_schema-version: '3.1'
ID: my-app
version: 1.0.0

modules:
  - name: my-app-srv
    type: nodejs
    path: srv
    requires:
      - name: my-app-db

  - name: my-app-ui
    type: html5
    path: app

resources:
  - name: my-app-db
    type: org.cloudfoundry.managed-service
    parameters:
      service: hana
      service-plan: hdi-shared
```

### Application Router

Single entry point for applications:
- Static content serving
- User authentication
- URL rewriting
- Request forwarding to microservices

---

## 12. CI/CD

### SAP Continuous Integration and Delivery

Managed CI/CD service supporting:
- Cloud Foundry applications (Fiori, CAP)
- SAP Fiori for ABAP Platform
- SAP Integration Suite artifacts

### Pipeline Setup

1. Activate service in BTP cockpit
2. Assign Administrator/Developer roles
3. Configure repository credentials
4. Add code repository (GitHub, GitLab, Bitbucket, Azure Repos)
5. Create and configure CI/CD jobs

### Delivery Options

| Content Type | CI/CD | Cloud Transport Mgmt |
|--------------|-------|---------------------|
| Java, HTML5, CAP | Yes | Yes |
| Kyma apps | Yes | - |
| Cloud Integration | In development | Yes |
| SAP Build Work Zone | - | Yes |

---

## 13. Extensions

### Extension Architecture

Build loosely coupled extensions for SAP solutions:

```
SAP Solution (S/4HANA, SuccessFactors)
    ↓ APIs & Events
SAP BTP Extension
    ↓
Custom Business Logic
```

### System Registration

1. Register systems in global account
2. Create formations (logical groupings)
3. Enable API/event exchange
4. Deploy extensions

### Supported Solutions

| Runtime | Extensible Solutions |
|---------|---------------------|
| **Cloud Foundry** | S/4HANA Cloud, Marketing Cloud, SuccessFactors |
| **Kyma** | Above + Commerce Cloud, Field Service Management |

---

## 14. High Availability and Resilience

### Resilience Strategies

| Strategy | Description |
|----------|-------------|
| **Multi-AZ** | Deploy across availability zones |
| **Multi-Region** | Deploy across geographic regions |
| **In-Metro DR** | Synchronous replication within region |

### Failover Implementation

1. Deploy in two data centers
2. Keep applications synchronized (CI/CD)
3. Define failover detection (5xx errors, timeouts)
4. Plan failback procedure

### In-Metro DR SLAs

- **RPO**: Maximum 5 minutes data loss
- **RTO**: Service restoration within 2 hours

---

## 15. Operations and Monitoring

### Monitoring Tools

| Tool | Purpose |
|------|---------|
| **SAP Cloud ALM** | Real user monitoring, health monitoring |
| **SAP Cloud Logging** | Observability across CF, Kyma |
| **SAP Alert Notification** | Multi-channel notifications |
| **Audit Log Viewer** | Activity tracking |

### Best Practices

- Deploy multiple application instances
- Implement Application Autoscaler
- Use blue-green deployment for updates
- Set up automated alerting
- Regular compliance verification

---

## 16. Support

### Getting Support

- **SAP for Me**: https://me.sap.com/
- **SAP Community**: https://community.sap.com/
- **Support Components**: BC-CP-* (component codes)

### Operating Model

SAP manages:
- Platform software updates
- Infrastructure monitoring
- BTP service monitoring
- Global account provisioning

You manage:
- Account strategy and configuration
- Application development and security
- Role assignments and integrations
- Application monitoring

---

## References

For detailed guidance, see the reference files in the `references/` directory:

- `glossary.md` - Complete terminology reference (40+ terms)
- `cloud-foundry.md` - CF-specific development and administration
- `kyma.md` - Kyma runtime, modules, and Kubernetes patterns
- `abap.md` - ABAP environment, RAP, CDS development
- `security.md` - Authentication, authorization, identity management
- `connectivity.md` - Destinations, Cloud Connector, integration
- `development.md` - Development patterns, MTA, Application Router
- `administration.md` - Account management, btp CLI commands
- `operations.md` - Monitoring, alerting, logging
- `extensions.md` - SAP solution extensions, formations
- `tools.md` - CLI references, development tools
- `troubleshooting.md` - Common issues and solutions
- `regions-endpoints.md` - Region-specific API endpoints

---

## Source Documentation

**Update this skill by checking**:
- https://github.com/SAP-docs/btp-cloud-platform
- https://help.sap.com/docs/btp
- https://discovery-center.cloud.sap/

**Last Verified**: 2025-11-22
