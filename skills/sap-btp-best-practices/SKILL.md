---
name: sap-btp-best-practices
description: |
  Production-ready SAP BTP best practices for enterprise architecture, account management, security, and operations. Use when planning BTP implementations, setting up account hierarchies, configuring environments, implementing authentication, designing CI/CD pipelines, establishing governance, building Platform Engineering teams, implementing failover strategies, or managing application lifecycle on SAP BTP.

  Keywords: SAP BTP, account hierarchy, global account, directory, subaccount, Cloud Foundry, Kyma, ABAP, SAP Identity Authentication, CI/CD, governance, Platform Engineering, failover, multi-region, SAP BTP best practices
license: GPL-3.0
metadata:
  version: "1.3.0"
  last_verified: "2025-11-27"
---

# SAP BTP Best Practices

Production-ready SAP BTP implementation guidance based on official SAP documentation.

**Quick Links**:
- **Official Guide**: https://github.com/SAP-docs/btp-best-practices-guide
- **SAP Help Portal**: https://help.sap.com/docs/btp/btp-administrators-guide
- **Progress Tracking**: `PROGRESS_TRACKING.md`

---

## Table of Contents

1. [Platform Fundamentals](#platform-fundamentals)
2. [Account Model Setup](#account-model-setup)
3. [Security and Authentication](#security-and-authentication)
4. [Connectivity](#connectivity)
5. [Governance and Teams](#governance-and-teams)
6. [Development](#development)
7. [AI Development](#ai-development)
8. [Deployment and Delivery](#deployment-and-delivery)
9. [High Availability and Failover](#high-availability-and-failover)
10. [Operations and Monitoring](#operations-and-monitoring)
11. [Cost Management](#cost-management)
12. [Bundled Resources](#bundled-resources)

---

## Platform Fundamentals

### Account Hierarchy

```
Global Account (SAP contract)
├── Directory (optional, up to 7 levels)
│   └── Subaccount (region-specific, apps run here)
│       ├── Cloud Foundry Org → Spaces
│       └── Kyma Cluster → Namespaces
└── Subaccount
```

**Key Points**:
- Global account = contract with SAP (one per commercial model)
- Directory = groups subaccounts (max 7 levels deep)
- Subaccount = deployed in specific region, enables runtimes
- Use labels for virtual grouping (Dev/Test/Prod, cost centers)

### Environments

| Environment | Use Case | Key Features |
|-------------|----------|--------------|
| **Cloud Foundry** | Polyglot apps | Multiple buildpacks, spaces |
| **Kyma** | Cloud-native K8s | Open-source, namespaces |
| **ABAP** | ABAP extensions | RAP, cloud-ready ABAP |
| **Neo** | Legacy | **Migrate away** - HTML5, Java, HANA XS |

### Commercial Models

- **Consumption-Based** (BTPEA/CPEA): Flexible access, best for pilots
- **Subscription-Based**: Fixed-cost for known service needs

**Best Practice**: Start with consumption-based, move to subscription for stable workloads.

---

## Account Model Setup

### Simple Model (3 subaccounts)
```
Global Account
├── Dev Subaccount
├── Test Subaccount
└── Prod Subaccount
```
Best for: Initial implementations, single team, <3 projects

### Directory Model (scalable)
```
Global Account
├── Directory: HR
│   ├── hr-dev / hr-test / hr-prod
├── Directory: Sales
│   ├── sales-dev / sales-test / sales-prod
└── Directory: Central IT
    ├── api-management
    └── shared-services
```
Best for: Multiple teams, cost allocation, complex governance

### Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Subaccount | Natural language | "HR Development" |
| Subdomain | Lowercase, hyphens | `hr-dev-acme` |
| CF Org | Company prefix | `acme-hr-dev` |
| CF Space | Consistent across stages | `hr-recruiting` |

**Tip**: Derive CF org/Kyma names from subaccount names for consistency.

---

## Security and Authentication

### Identity Provider Setup

**Always use SAP Cloud Identity Services - Identity Authentication**

```
Corporate IdP → Identity Authentication (proxy) → SAP BTP
```

**Critical Steps**:
1. Add multiple administrators (different time zones)
2. Enable MFA for all admins
3. Configure security alerts
4. Set up backup admins in SAP ID Service

### Authorization Methods

| Method | Best For | Notes |
|--------|----------|-------|
| **Provisioning** | Production, many users | Centralized roles, automated offboarding |
| **Federation** | Simple scenarios | Real-time sync, but doesn't scale well |
| **Manual** | Testing only | Quick setup, not production-ready |

### Destination Authentication

**Recommended**:
- `PrincipalPropagation` - SAP on-premise systems
- `OAuth2SAMLBearerAssertion` - Third-party systems
- `OAuth2JWTBearer` - User token exchange

**Avoid in Production**:
- `BasicAuthentication`
- `OAuth2Password`

**See**: `references/security-and-authentication.md` for complete guidance

---

## Connectivity

### Remote System Access

- **Internet Services**: Destinations with authentication
- **On-Premise Systems**: Destinations + Cloud Connector

### Cloud Connector

- Lightweight on-premise agent
- Secure tunnel to SAP BTP (no inbound ports)
- Fine-grained access control
- Supports RFC and HTTP protocols
- Enables principal propagation

**Note**: Each subaccount needs separate Cloud Connector config.

---

## Governance and Teams

### Required Teams

**Platform Engineering Team (Center of Excellence)**:
- Manages cloud landscape infrastructure
- Handles account operations, build infrastructure
- Creates governance and compliance guidelines
- **Does NOT** manage individual application lifecycles

**Cloud Development Teams**:
- Follow DevOps (develop AND operate)
- Responsible for application lifecycle
- Regular maintenance (e.g., UI updates every 6 months)

### Essential Documentation

1. **Onboarding Doc**: Organization, app IDs, timeline, tech stack
2. **Security Doc**: Data sensitivity, policies, auth framework
3. **Services Catalog**: Templates for destinations, builds, schemas

---

## Development

### Programming Models

**SAP CAP (Cloud Application Programming Model)**:
- Framework with languages, libraries, tools
- Supports Java, JavaScript, TypeScript
- Enterprise-grade services and data models

**ABAP Cloud**:
- Modern ABAP for cloud-ready apps
- RAP (RESTful ABAP Programming Model)
- Extensions for ABAP-based products

### Development Lifecycle

1. **Explore**: Business opportunity, team roles
2. **Discover**: Use cases, technology options
3. **Design**: UX design, domain-driven design
4. **Deliver**: Landscape setup, development
5. **Run and Scale**: Feedback, optimization

---

## AI Development

SAP BTP provides AI capabilities through **SAP AI Core** for:
- **Generative AI** (LLMs, RAG)
- **Narrow AI** (classical ML)

**Key Resources**:
- Repository: [SAP-samples/sap-btp-ai-best-practices](https://github.com/SAP-samples/sap-btp-ai-best-practices)
- Documentation: https://btp-ai-bp.docs.sap/

**Best Practices**:
- Use service keys for secure authentication
- Implement PII data masking
- Build RAG with SAP HANA Cloud Vector Engine
- Configure content filtering
- Monitor model drift

**Use Cases**: 20+ samples including chatbots, PDF extraction, procurement.

**See**: `references/ai-development-best-practices.md` for patterns and examples

---

## Deployment and Delivery

### Deployment Methods

**Cloud Foundry/Neo**:
- Package as MTA archive
- Deploy via: BTP Cockpit, CF CLI, Business Application Studio

**Kyma**:
- Docker images (Dockerfile or Cloud Native Buildpacks)
- Helm charts for production
- Deploy via SAP Continuous Integration and Delivery

### CI/CD Approaches

**SAP Continuous Integration and Delivery**:
- Low expertise required
- Ready-to-use infrastructure
- Direct SAP support

**Project "Piper"**:
- High expertise required
- Jenkins-based
- Open-source community support

**Best Practice**: Combine CI/CD with SAP Cloud Transport Management for governance + agility.

**See**: `references/deployment-and-delivery.md` for detailed configs

---

## High Availability and Failover

### Multi-Region Architecture

```
Custom Domain URL
       │
    Load Balancer
       ├── Region 1 (active)
       └── Region 2 (passive/active)
```

### Failover Implementation

**Four Core Principles**:

1. **Deploy in Two Regions**: Near users and backend systems
2. **Keep Synced**: CI/CD pipeline or Cloud Transport Management
3. **Define Detection**: Monitor 5xx errors, timeouts
4. **Plan Failback**: Visual differentiation, user-driven

**Legal**: Check cross-region data processing restrictions.

**See**: `references/failover-and-resilience.md` for implementation details

---

## Operations and Monitoring

### Go-Live Checklist

1. Deploy to production
2. Set go-live timeframe (avoid quarter-end)
3. Embed in SAP Fiori Launchpad
4. Provision business users
5. Configure role collections

### Monitoring Tools

**SAP Cloud ALM** (Enterprise Support):
- Real User Monitoring
- Health Monitoring
- Integration and Exception Monitoring
- Job Automation Monitoring

**SAP Cloud Logging**:
- Observability across CF, Kyma, Kubernetes

**SAP Alert Notification**:
- Multi-channel notifications (email, chat, ticketing)

---

## Cost Management

### Best Practices

1. Check *Costs and Usage* monthly
2. Provide minimal required entitlements
3. Use labels for cost allocation
4. Set up automated alerts (Usage Data Management + Alert Notification)

### Contract Strategies

- Consolidate subscriptions in one global account
- Use hybrid accounts for mixed workloads
- Note: Consumption credits non-transferable between global accounts

---

## Bundled Resources

This skill provides comprehensive reference documentation:

### Account & Governance
- **`references/account-models.md`** (11K lines)
  - Detailed account structure patterns
  - Naming conventions and examples
  - Cost allocation strategies

- **`references/governance-and-teams.md`** (13K lines)
  - Platform Engineering team structure
  - Onboarding processes
  - Documentation templates

### Security & Connectivity
- **`references/security-and-authentication.md`** (13K lines)
  - Complete auth methods comparison
  - Destination configuration
  - Kyma RBAC manifests
  - Identity lifecycle management

### Deployment & Operations
- **`references/deployment-and-delivery.md`** (10K lines)
  - MTA descriptor templates
  - CI/CD pipeline configs
  - Transport management setup

- **`references/operations-and-monitoring.md`** (11K lines)
  - Go-live procedures
  - Monitoring setup guides
  - Troubleshooting checklists

### High Availability
- **`references/failover-and-resilience.md`** (12K lines)
  - Multi-region architecture
  - Load balancer configurations
  - Failover automation scripts

### Templates & Examples
- **`references/templates-and-examples.md`** (18K lines)
  - Complete code templates
  - Kubernetes RBAC manifests
  - MTA descriptors
  - Helm charts
  - CI/CD configs

### AI Development
- **`references/ai-development-best-practices.md`** (6K lines)
  - Generative AI patterns
  - RAG implementation
  - 20+ use cases catalog

### Progress Tracking
- **`PROGRESS_TRACKING.md`**
  - Implementation status
  - Coverage details
  - Validation checklists

---

## Administration Tools

| Tool | Use Case |
|------|----------|
| **SAP BTP Cockpit** | GUI for all admin tasks |
| **btp CLI** | Terminal/automation scripting |
| **REST APIs** | Programmatic administration |
| **Terraform Provider** | Infrastructure as Code |
| **SAP Automation Pilot** | Low-code/no-code automation |

---

## Shared Responsibility Model

**SAP Manages**:
- Platform software updates/patches
- Infrastructure and OS monitoring
- BTP service monitoring
- Capacity management and incidents
- Global account provisioning
- HANA database operations
- Kyma `kyma-system` namespace

**You Manage**:
- Global account strategy and subaccount config
- Application development, deployment, security
- Role assignments and integrations
- Application monitoring and health checks
- Open source vulnerability scanning
- Triggering HANA revision updates

---

**Last Updated**: 2025-11-27
**Review Progress**: See SAP_SKILLS_REVIEW_PROGRESS.md
**Next Review**: 2026-02-27 (quarterly)
