# SAP BTP Best Practices Skill

Comprehensive best practices for SAP Business Technology Platform (BTP) implementation, covering enterprise cloud architecture, account management, security, deployment, and operations.

## Overview

This skill provides production-ready guidance for SAP BTP implementations based on the official SAP BTP Administrator's Guide and Best Practices documentation.

**Source Documentation**: [https://github.com/SAP-docs/btp-best-practices-guide](https://github.com/SAP-docs/btp-best-practices-guide)

**Version**: 1.1.0
**Last Verified**: 2025-11-21

---

## Keywords for Discovery

### Platform and Architecture
- SAP BTP
- SAP Business Technology Platform
- BTP architecture
- BTP account model
- global account
- subaccount
- directory
- BTP cockpit
- btp CLI
- multi-cloud
- Cloud Foundry
- CF environment
- Kyma
- Kyma environment
- ABAP environment
- Neo environment
- BTP region
- BTP services
- entitlements
- quotas

### Account Management
- account hierarchy
- account structure
- subaccount setup
- directory structure
- account model
- naming conventions
- BTP naming
- staged development
- dev test prod
- development subaccount
- production subaccount
- CF spaces
- Kyma namespaces
- labels
- account administration

### Security and Authentication
- SAP Cloud Identity Services
- Identity Authentication
- IAS
- identity provider
- IdP configuration
- SSO
- single sign-on
- principal propagation
- user federation
- identity provisioning
- identity lifecycle
- platform users
- business users
- role collections
- RBAC
- role-based access control
- authorization
- authentication
- MFA
- multifactor authentication
- SAP ID Service
- trust configuration
- destination authentication
- OAuth
- SAML

### Connectivity
- Cloud Connector
- destinations
- remote systems
- on-premise connectivity
- hybrid connectivity
- mTLS
- certificates
- destination service
- connectivity service
- API management

### Deployment and Delivery
- MTA
- multitarget application
- deployment
- CI/CD
- continuous integration
- continuous delivery
- SAP Continuous Integration and Delivery
- Project Piper
- transport management
- SAP Cloud Transport Management
- CTS+
- Helm charts
- Docker
- containerization
- buildpacks

### Operations and Monitoring
- SAP Cloud ALM
- monitoring
- alerting
- Alert Notification Service
- Job Scheduling Service
- Cloud Logging
- health monitoring
- real user monitoring
- observability
- automation
- SAP Automation Pilot
- go-live
- operations

### High Availability and Resilience
- failover
- high availability
- HA
- disaster recovery
- multi-region
- active passive
- active active
- data backup
- resilience
- redundancy
- load balancing

### Governance and Teams
- Platform Engineering Team
- Cloud Development Team
- Center of Excellence
- CoE
- governance model
- onboarding
- knowledge transfer
- DevOps
- shared responsibility
- cost management
- billing
- compliance
- data protection
- GDPR

### Commercial Models
- consumption-based
- subscription-based
- BTPEA
- CPEA
- Pay-As-You-Go
- free tier
- enterprise account

### Integration
- SAP Cloud Integration
- integration testing
- OPA5
- SAPUI5 testing
- Cloud Integration Automation

### Lifecycle Management
- application lifecycle
- maintenance
- retirement
- Neo migration
- updates
- blue-green deployment
- feature flags

### AI and Machine Learning
- SAP AI Core
- generative AI BTP
- RAG BTP
- LLM BTP
- prompt engineering SAP
- content filtering AI
- data masking PII
- anomaly detection BTP
- SAP Document AI
- AI use cases BTP
- agentic AI SAP
- vector embeddings SAP
- SAP HANA Cloud Vector Engine

---

## Use This Skill When

1. **Planning SAP BTP Implementation**
   - Setting up a new SAP BTP landscape
   - Designing account hierarchy
   - Choosing commercial models
   - Planning team structure

2. **Configuring Account Structure**
   - Creating directories and subaccounts
   - Setting up staged development environments
   - Defining naming conventions
   - Managing entitlements and quotas

3. **Implementing Security**
   - Configuring SAP Cloud Identity Services
   - Setting up authentication
   - Implementing authorization
   - Configuring destinations and Cloud Connector

4. **Deploying Applications**
   - Building MTA archives
   - Setting up CI/CD pipelines
   - Configuring transport management
   - Deploying to Cloud Foundry or Kyma

5. **Operating BTP Landscape**
   - Setting up monitoring
   - Configuring alerts
   - Managing costs
   - Planning go-live

6. **Implementing High Availability**
   - Designing multi-region architecture
   - Implementing failover
   - Planning disaster recovery

7. **Building AI Solutions**
   - Implementing generative AI with SAP AI Core
   - Building RAG systems
   - Configuring content filtering and PII protection
   - Deploying anomaly detection models

---

## Skill Contents

### Main File
- `SKILL.md` - Core best practices organized by lifecycle phase (~4000 words)

### Reference Files (Progressive Disclosure)
Located in `references/` directory:
- `account-models.md` - Detailed account structure patterns and examples
- `security-and-authentication.md` - Complete security guidance
- `deployment-and-delivery.md` - CI/CD and transport management details
- `failover-and-resilience.md` - Multi-region and failover implementation
- `operations-and-monitoring.md` - Go-live and monitoring procedures
- `governance-and-teams.md` - Team structure and processes
- `templates-and-examples.md` - **Complete code templates**: Kubernetes RBAC manifests, MTA descriptors, Helm charts, CI/CD pipeline configs, multi-region GitHub links
- `ai-development-best-practices.md` - **AI patterns**: Generative AI, RAG, content filtering, 20+ use cases catalog

### Tracking

---

## Source Documentation

This skill is based on content from:

**Primary Source**:
- [https://github.com/SAP-docs/btp-best-practices-guide](https://github.com/SAP-docs/btp-best-practices-guide)

**SAP Help Portal**:
- [https://help.sap.com/docs/btp/btp-administrators-guide](https://help.sap.com/docs/btp/btp-administrators-guide)

**Related Resources**:
- SAP Discovery Center: [https://discovery-center.cloud.sap/](https://discovery-center.cloud.sap/)
- SAP Developer Center: [https://developers.sap.com/](https://developers.sap.com/)
- SAP Community: [https://community.sap.com/](https://community.sap.com/)

---

## Updates and Maintenance

### Update Schedule
- **Quarterly Review**: Check for documentation updates
- **On SAP Release**: Review for new features and changes
- **Next Review**: 2026-02-21

### How to Update
1. Check source repository for changes
3. Update relevant files in skill
4. Update version in `SKILL.md` frontmatter

---

## License

GPL-3.0 License - See repository LICENSE file.

---

## Related Skills

- `sap-cap` - SAP Cloud Application Programming Model
- `sap-fiori` - SAP Fiori development
- `sap-cloud-foundry` - Cloud Foundry specific guidance
- `sap-kyma` - Kyma environment specific guidance
- `sap-hana-cloud` - SAP HANA Cloud development

---

*Maintained by: E.J.*
*Repository: [https://github.com/secondsky/sap-skills*](https://github.com/secondsky/sap-skills*)
