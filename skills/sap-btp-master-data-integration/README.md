# SAP BTP Master Data Integration Skill

A comprehensive Claude Code skill for configuring and integrating SAP Master Data Integration (MDI) service on SAP Business Technology Platform.

## Keywords

**Service Names**:
SAP Master Data Integration, MDI, One MDS, Master Data Orchestration, Business Data Orchestration, BDO

**Technologies**:
SAP BTP, Business Technology Platform, Cloud Foundry, XSUAA, OAuth2, mTLS, X.509, SOAP, REST API

**Data Models**:
SAP One Domain Model, ODM, Business Partner, Cost Center, Workforce Person, Product, Company Code, Plant, Exchange Rate, Equipment, Purchasing Organization

**Integrated Systems**:
S/4HANA Cloud, S/4HANA On-Premise, SAP SuccessFactors, SAP Ariba, SAP Fieldglass, SAP Commerce Cloud, SAP Cloud for Customer, SAP Marketing Cloud, SAP Subscription Billing, SAP Field Service Management, SAP Entitlement Management, SAP Master Data Governance, MDG, SAP Integration Suite, SAP ECC

**Use Cases**:
- master data replication
- master data synchronization
- master data hub
- central master data
- distribution model
- data distribution
- client configuration
- tenant management
- key mapping
- BP relationship
- business partner replication
- SOAP API business partner
- multiwriter scenario
- multiversion support
- initial load
- delta synchronization

**Configuration Topics**:
- businessSystemId
- writePermissions
- globalTenantId
- logSys
- service instance
- service binding
- communication arrangement
- SAP_COM_0659
- SAP_COM_0594
- destination configuration
- distribution model maintenance

**Error Keywords**:
- delta token expired
- change request rejected
- mandatory partner function missing
- destination not found
- HTTPS scheme expected
- tenant deletion
- validation error
- patch failed

## When to Use This Skill

Use this skill when:

1. **Setting up MDI** - Creating tenants, configuring subaccounts, understanding prerequisites
2. **Connecting applications** - Integrating S/4HANA, SuccessFactors, Ariba, or other SAP applications
3. **Configuring distribution** - Setting up distribution models, filters, data scope
4. **Working with SOAP APIs** - Business partner replication, confirmations, key mapping
5. **Troubleshooting** - Resolving replication errors, monitoring issues, authentication problems
6. **Extending MDI** - Adding custom fields, creating extensions, generating WSDL
7. **Security configuration** - OAuth2, mTLS, credential management, read access logging

## Skill Structure

```
sap-btp-master-data-integration/
├── SKILL.md                          # Main skill instructions
├── README.md                         # This file (discovery keywords)
├── PROGRESS_TRACKING.md              # Documentation extraction tracking
└── references/
    ├── glossary-and-pricing.md       # Complete glossary, pricing, maintenance windows
    ├── setup-guide-complete.md       # Prerequisites, tenant management, version history
    ├── integration-models.md         # Complete ODM types and versions
    ├── integration-guides.md         # System-specific integration guides
    ├── soap-api-reference.md         # SOAP web services with field mappings
    ├── features-complete.md          # All features, REST/SOAP events, APIs
    ├── security-and-privacy.md       # Security, data protection, filtering
    ├── extensibility.md              # Custom extensions, WSDL generation
    └── monitoring.md                 # Monitoring and troubleshooting
```

## Progressive Disclosure

**Level 1 - Metadata** (~100 tokens)
- Skill name and description always in context
- Keywords trigger skill loading

**Level 2 - SKILL.md** (<500 lines)
- Core concepts and quick reference
- Decision trees for common scenarios
- Setup workflows
- System limitations
- Common configurations

**Level 3 - Reference Files** (loaded on demand)
- Detailed integration guides per system
- Complete SOAP API specifications
- Full security documentation
- Extensibility deep dive

## Documentation Sources

| Source | URL |
|--------|-----|
| Primary Documentation | https://help.sap.com/docs/master-data-integration |
| GitHub Source | https://github.com/SAP-docs/sap-btp-master-data-integration |
| API Catalog | https://api.sap.com (filter: SAP Master Data Integration) |
| Discovery Center | https://discovery-center.cloud.sap/serviceCatalog/master-data-integration |

## Coverage

This skill extracts and organizes content from **90 documentation files** across 8 categories:

| Category | Files | Topics |
|----------|-------|--------|
| About This Service | 8 | Overview, glossary, integration models, pricing, limitations |
| Development | 11 | SOAP APIs, endpoints, web services, confirmations |
| Features | 16 | Synchronization, distribution, monitoring, extensibility |
| Initial Setup | 27 | Tenants, clients, authentication, configuration |
| Integration | 18 | S/4HANA, SuccessFactors, Ariba, CX, and more |
| Security | 7 | Guidelines, data protection, filtering, logging |
| Monitoring | 1 | Troubleshooting workflow |
| What's New | 2 | Updates and archive |

## Maintenance

**Last Updated**: 2025-11-22
**Source Repository**: https://github.com/SAP-docs/sap-btp-master-data-integration
**Review Schedule**: Quarterly

To update this skill:
1. Check source repository for changes
2. Fetch updated documentation
3. Update PROGRESS_TRACKING.md
4. Update relevant reference files
5. Update SKILL.md if core concepts change

## License

MIT
