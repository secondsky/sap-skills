---
name: sap-btp-best-practices
description: |
  Comprehensive SAP Business Technology Platform (BTP) best practices for enterprise cloud architecture, account management, security, deployment, and operations. Use when planning SAP BTP implementations, setting up account hierarchies (global accounts, directories, subaccounts), configuring Cloud Foundry or Kyma environments, implementing authentication with SAP Cloud Identity Services, designing CI/CD pipelines with SAP Continuous Integration and Delivery, establishing governance models, building Platform Engineering teams, implementing failover strategies, or managing the complete application lifecycle on SAP BTP.
license: MIT
metadata:
  version: "1.2.0"
  last_verified: "2025-11-22"
  source: "https://github.com/SAP-docs/btp-best-practices-guide"
  reference_files: 8
---

# SAP BTP Best Practices

Production-ready guidance for SAP Business Technology Platform implementation based on official SAP documentation.

## Quick Reference

**Source Documentation**: https://github.com/SAP-docs/btp-best-practices-guide
**SAP Help Portal**: https://help.sap.com/docs/btp/btp-administrators-guide
**Progress Tracking**: See `PROGRESS_TRACKING.md` for coverage details

---

## 1. Platform Fundamentals

### Account Hierarchy

SAP BTP uses a hierarchical account structure:

```
Global Account (contract with SAP)
├── Directory (optional, up to 5 levels)
│   ├── Subaccount (region-specific, where apps run)
│   │   ├── Cloud Foundry Org → Spaces
│   │   └── Kyma Cluster → Namespaces
│   └── Subaccount
└── Subaccount
```

**Key Principles**:
- Global accounts represent contracts with SAP, typically one per commercial model
- Directories group subaccounts for management, billing, or compliance purposes (up to 7 levels deep)
- Subaccounts are deployed in specific regions and enable runtime environments
- Use labels for virtual grouping and reporting (Dev/Test/Prod, cost centers)

### Administrative Responsibilities

| Level | Key Responsibilities |
|-------|---------------------|
| **Global Account** | Appoint administrators; manage entitlements and quotas for distribution |
| **Directory** | Manage member access; oversee entitlements (if enabled) |
| **Subaccount** | Assign business roles; manage member access |

**Recommendation**: Appoint substitute administrators at each level to ensure continuity.

### Environments

| Environment | Use Case | Key Features |
|-------------|----------|--------------|
| **Cloud Foundry** | Polyglot apps | Multiple buildpacks, spaces for organization |
| **Kyma** | Cloud-native K8s | Open-source Kyma, namespaces, service mesh |
| **ABAP** | ABAP extensions | RAP, cloud-ready ABAP development |
| **Neo** | Legacy (migrate away) | HTML5, Java, HANA XS - transitioning to multi-cloud |

### Commercial Models

- **Consumption-Based** (BTPEA/CPEA/Pay-As-You-Go): Flexible access to all services, best for pilots
- **Subscription-Based**: Fixed-cost for established use cases with known service needs

**Best Practice**: Use consumption-based for flexibility during pilots, subscription for stable workloads.

---

## 2. Account Model Setup

### Recommended Account Structures

**Simple Model (3 subaccounts)**:
```
Global Account
├── Dev Subaccount
├── Test Subaccount
└── Prod Subaccount
```
Best for: Initial implementations, single team, <3 projects

**Directory Model (scalable)**:
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
| Subaccount | Natural language allowed | "HR Development" |
| Subdomain | Lowercase, hyphens, ≤63 chars | `hr-dev-acme` |
| CF Org | Include company identifier | `acme-hr-dev` |
| CF Space | Consistent across stages | `hr-recruiting` |
| Kyma Namespace | Lowercase, hyphens | `hr-recruiting-dev` |

**Derive CF org/Kyma cluster names from subaccount names for consistency.**

### Cloud Foundry Staged Development

```
Dev Subaccount → CF Org: acme-hr-dev
├── Space: recruiting
├── Space: payroll
└── Space: benefits

Test Subaccount → CF Org: acme-hr-test
├── Space: recruiting (same names!)
└── ...

Prod Subaccount → CF Org: acme-hr-prod
├── Space: recruiting
└── ...
```

**Configuration by Level**:
| Feature | Subaccount | Space |
|---------|-----------|-------|
| Business user groups | Yes | No |
| Cloud Connector tunnels | Yes | No |
| Trust/roles settings | Yes | No |
| Quota assignment | Mandatory | Optional |

### Kyma Staged Development

**Recommendation**: Minimum 2 subaccounts:
1. Dev/Test combined (namespaces separate environments)
2. Production (isolated)

Each subaccount = one Kubernetes cluster. Use namespaces to separate projects within clusters.

---

## 3. Security and Authentication

### Identity Provider Setup

**Always use SAP Cloud Identity Services - Identity Authentication** for SAP BTP.

```
Corporate IdP → Identity Authentication (proxy) → SAP BTP
                                                 ├── Platform Users (global account trust)
                                                 └── Business Users (subaccount trust)
```

**Onboarding Steps**:
1. Add multiple administrators across time zones
2. Enable MFA for administrator accounts
3. Configure monitoring and security alerts
4. Set up Identity Authentication as proxy to corporate IdP

**Critical**: Maintain backup administrators in default provider (SAP ID Service) for recovery.

### Authorization Methods

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **Provisioning** | Production, many users | Centralized roles, automated offboarding | Sync delay |
| **Federation** | Simpler scenarios | Real-time, simpler setup | Doesn't scale, orphaned users |
| **Manual** | Testing only | Quick setup | Not scalable |

**Recommendation**: Use provisioning for production when feasible.

### Platform User Access

| Team | Dev | Test | Prod |
|------|-----|------|------|
| Cloud Development Team | Full access | No access | No access |
| Platform Engineering Team | No access | Full access | Full access |

For sensitive production scenarios, use:
- Automated pipelines with technical users
- Temporary firefighter access with audit trails
- Special accounts with controlled credential distribution

### Destination Authentication

**Recommended Methods**:
- `PrincipalPropagation` - SAP systems (on-premise)
- `OAuth2SAMLBearerAssertion` - Third-party systems
- `OAuth2JWTBearer` - User token exchange (preferred over OAuth2UserTokenExchange)

**Avoid in Production**: `BasicAuthentication`, `OAuth2Password` (testing only)

**Detailed Reference**: See `references/security-and-authentication.md` for complete destination authentication methods, Kyma RBAC manifests, identity lifecycle management, and mTLS certificate extraction.

---

## 4. Connectivity

### Remote System Access

**Internet Services**: Use destinations with appropriate authentication
**On-Premise Systems**: Use destinations + Cloud Connector

**Destinations provide**:
- Separation of application code from configuration
- Secure credential and certificate storage
- Runtime resolution of connection details

### Cloud Connector

Lightweight on-premise agent establishing secure tunnel to SAP BTP:
- No inbound firewall ports required
- Fine-grained access control
- Supports RFC, HTTP protocols
- Enables principal propagation
- Configurable from SAP BTP cockpit

**Note**: Each subaccount requires separate Cloud Connector configuration.

---

## 5. Governance and Teams

### Required Teams

**Platform Engineering Team (Center of Excellence)**:
- Manages cloud landscape infrastructure
- Handles account operations, build infrastructure
- Creates governance and compliance guidelines
- Enables developers with reduced cognitive load
- **Does NOT** manage individual application lifecycles

**Cloud Development Teams**:
- Follow DevOps approach (develop AND operate)
- Responsible for application lifecycle
- Regular maintenance (e.g., UI component compatibility every 6 months)

### Essential Documentation

1. **Onboarding Document**: Organization, app identifiers, go-live timeline, technology stack, repository location
2. **Security Document**: Data sensitivity, policies, authentication framework, audit procedures
3. **Services Catalog**: Templates for destinations, builds, access provisioning, database schemas

### Onboarding Process

Every new application tracked by Platform Engineering should document:
- Business rationale and owner
- User accessibility scope
- System integration details
- Testing approach
- Repository location (keep code OUTSIDE SAP BTP to prevent accidental deletion)

---

## 6. Development

### Programming Models

**SAP Cloud Application Programming Model (CAP)**:
- Framework of languages, libraries, and tools
- Supports Java, JavaScript, TypeScript
- Enterprise-grade services and data models

**ABAP Cloud**:
- Modern ABAP for cloud-ready applications
- RAP (RESTful ABAP Programming Model)
- Extensions for ABAP-based products

### Development Lifecycle Phases

1. **Explore**: Identify business opportunity, set up team roles
2. **Discover**: Identify use cases, understand technology options
3. **Design**: User experience design, domain-driven design for modularization
4. **Deliver**: Set up landscape, develop following recommendations
5. **Run and Scale**: Gather feedback, optimize, operate

---

## 7. AI Development Best Practices

SAP BTP provides AI capabilities through **SAP AI Core** for both Generative AI (LLMs, RAG) and Narrow AI (classical ML).

**Repository**: [SAP-samples/sap-btp-ai-best-practices](https://github.com/SAP-samples/sap-btp-ai-best-practices)  
**Documentation**: https://btp-ai-bp.docs.sap/

| Category | Best Practices |
|----------|----------------|
| **Generative AI** | Secure model access, prompt templates, RAG systems, content filtering, PII data masking |
| **Narrow AI** | Regression models, anomaly detection, predictive analytics |
| **AI Services** | SAP Document AI, SAP Translation Hub |

**Key Patterns**:
- Use SAP AI Core service keys for secure authentication
- Implement data masking before sending PII to external models
- Build RAG with SAP HANA Cloud Vector Engine
- Configure content filtering for AI outputs
- Monitor model drift in production

**Use Cases**: 20+ end-to-end samples including agentic chatbots, PDF extraction, intelligent procurement, anomaly detection, and email agents.

**Detailed Reference**: See `references/ai-development-best-practices.md` for patterns, code examples, and complete use cases catalog.

---

## 8. Deployment and Delivery

### Deployment Methods

**Cloud Foundry/Neo**:
- Package as Multitarget Application (MTA) archive
- Deploy via: BTP Cockpit, CF CLI, Business Application Studio

**Kyma**:
- Package in Docker images (Dockerfile or Cloud Native Buildpacks)
- Use Helm charts for production
- Deploy via SAP Continuous Integration and Delivery

### Delivery Options Matrix

| Content Type | CI/CD | Cloud Transport Mgmt | CTS+ |
|--------------|-------|---------------------|------|
| Java, HTML5, CAP | Recommended | Recommended | - |
| Cloud Integration | In development | Recommended | - |
| HANA Cloud artifacts | Recommended | Recommended | - |
| SAP Build Work Zone | - | Recommended | - |
| Kyma apps | Recommended | - | - |

### CI/CD Approaches

**SAP Continuous Integration and Delivery**:
- Low expertise required
- Ready-to-use infrastructure
- Direct SAP support
- Best for: Typical SAP customers

**Project "Piper"**:
- Medium-to-high expertise required
- High flexibility
- Requires Jenkins infrastructure
- Open-source community support

**Best Practice**: Combine CI/CD with SAP Cloud Transport Management for governance + agility.

**Detailed Reference**: See `references/deployment-and-delivery.md` for MTA descriptor templates, CI/CD pipeline configurations, transport landscape setup, and environment-specific deployment guides.

---

## 9. High Availability and Failover

### Multi-Region Architecture

Deploy applications across multiple regions with custom domain and load balancer:

```
Custom Domain URL
       │
    Load Balancer (health checks)
       ├── Region 1 (active)
       └── Region 2 (passive or active)
```

### Failover Implementation (Active/Passive)

**Four Core Principles**:

1. **Deploy in Two Data Centers**: Choose regions near users and backend systems
2. **Keep Applications Synchronized**: Via CI/CD pipeline or Cloud Transport Management
3. **Define Failover Detection**: Monitor for error codes (5xx), response timeouts
4. **Plan Failback**: Visually differentiate environments, user-driven return

**Legal Consideration**: Cross-region deployment may have data processing restrictions.

### Reference Use Cases

| Scenario | Implementation |
|----------|----------------|
| SAP Build Work Zone + Azure Traffic Manager | Discovery Center mission available |
| SAP Build Work Zone + Amazon Route 53 | GitHub resources available |
| CAP + SAP HANA Cloud multi-zone | GitHub repository |
| CAP + Amazon Aurora read replica | GitHub repository |
| SAP Cloud Integration + Azure Traffic Manager | Discovery Center mission |

---

## 10. Data Backup and Resilience

### SAP-Managed Backups

| Service | Backup | Notes |
|---------|--------|-------|
| SAP HANA Cloud | Continuous | Database recovery supported |
| PostgreSQL (Hyperscaler) | 14-day retention | Point-in-time restore |
| Redis | No persistence | No backup support |
| Object Store | No native backup | Use versioning, deletion protection |

### Runtime Backup Strategies

| Runtime | Strategy |
|---------|----------|
| Cloud Foundry | Multi-AZ replication within region |
| Kyma | Managed K8s snapshots (excludes volumes) |
| Neo | Cross-region data copies |

### Customer Responsibilities

You must backup your own service configurations. SAP does not manage these backups.

---

## 11. Operations and Monitoring

### Go-Live Checklist

1. Deploy to production environment
2. Establish go-live timeframes (avoid quarter-end for non-emergencies)
3. Embed apps in SAP Fiori Launchpad via SAP BTP Portal
4. Provision business users through Identity provider
5. Configure role collections for authorization

### Monitoring Tools

**SAP Cloud ALM** (included in Enterprise Support):
- Real User Monitoring
- Health Monitoring
- Integration and Exception Monitoring
- Job Automation Monitoring

**SAP Cloud Logging**: Observability across CF, Kyma, Kubernetes

**SAP Alert Notification**: Multi-channel notifications (email, chat, ticketing, Cloud ALM)

### CDN Best Practices (for global users)

- Enforce HTTPS-only connections
- Implement location-based access controls
- Use gzip compression
- Cache static content, exclude dynamic resources
- Never cache CSRF tokens

---

## 12. Cost Management

### Monitoring and Governance

1. Check *Costs and Usage* in BTP cockpit monthly
2. Provide minimal required entitlements to subaccounts
3. Use labels for cost filtering and allocation
4. Set up automated alerts via Usage Data Management + Alert Notification

### Contract Strategies

- Consolidate subscription contracts into one global account
- Use hybrid accounts for mixed workloads
- Note: Consumption credits are non-transferable between global accounts

---

## 13. Maintenance and Retirement

### Ongoing Maintenance

- Regular testing against library/platform updates
- Ongoing compliance verification
- Bug fixes focused on user experience
- Incorporate user feedback
- Implement automated alerting
- Use blue-green deployment or Feature Flags for updates

### Application Retirement

When retiring applications:
1. Undeploy the application
2. Delete related service instances
3. Remove destinations, role collections, platform content
4. Meet data retention obligations
5. Document decommissioning

### Neo Migration

SAP recommends migrating from Neo to multi-cloud foundation for closer integration with AWS, GCP, and Azure.

---

## Administration Tools

| Tool | Use Case |
|------|----------|
| **SAP BTP Cockpit** | GUI for all admin tasks |
| **btp CLI** | Terminal/automation scripting |
| **REST APIs** | Programmatic administration |
| **Terraform Provider** | Infrastructure as Code (IaC) |
| **SAP Automation Pilot** | Low-code/no-code automation |

---

## Shared Responsibility Model

**SAP Manages**:
- Platform software updates and patches
- Infrastructure and OS monitoring
- BTP service monitoring
- Capacity management and incidents
- Global account provisioning
- HANA database operations
- Kyma `kyma-system` namespace

**You Manage**:
- Global account strategy and subaccount configuration
- Application development, deployment, and security
- Role assignments and integrations
- Application monitoring and health checks
- Open source vulnerability scanning
- Triggering HANA revision updates

---

## References

For detailed guidance, see the reference files in the `references/` directory:
- `account-models.md` - Detailed account structure patterns and naming conventions
- `security-and-authentication.md` - Complete security guidance and destination methods
- `deployment-and-delivery.md` - CI/CD and transport management details
- `failover-and-resilience.md` - Multi-region and failover implementation
- `operations-and-monitoring.md` - Go-live and monitoring procedures
- `governance-and-teams.md` - Team structure and processes
- `templates-and-examples.md` - **Complete code templates**: Kubernetes RBAC manifests, MTA descriptors, Helm charts, CI/CD configs, multi-region GitHub links
- `ai-development-best-practices.md` - **AI patterns**: Generative AI, RAG, content filtering, 20+ use cases catalog

---

## Source Documentation

**Update this skill by checking**:
- https://github.com/SAP-docs/btp-best-practices-guide
- https://help.sap.com/docs/btp/btp-administrators-guide
- SAP Discovery Center: https://discovery-center.cloud.sap/

**Last Verified**: 2025-11-21
