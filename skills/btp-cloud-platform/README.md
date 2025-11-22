# SAP BTP Cloud Platform Skill

Comprehensive SAP Business Technology Platform reference for cloud development, deployment, and operations.

## Overview

This skill provides production-ready guidance for all aspects of SAP BTP, covering the three runtime environments (Cloud Foundry, Kyma, ABAP), account management, security, connectivity, and operations.

## When to Use This Skill

Use this skill when:

- **Setting up BTP accounts**: Global accounts, directories, subaccounts, entitlements
- **Working with Cloud Foundry**: Orgs, spaces, buildpacks, service bindings, CF CLI
- **Deploying to Kyma**: Kubernetes, modules, serverless functions, Helm charts
- **Developing in ABAP environment**: RAP, CDS, ADT, Fiori integration
- **Managing entitlements and quotas**: Commercial models, service plans
- **Configuring identity providers**: SAP Cloud Identity Services, XSUAA, trust
- **Implementing authentication/authorization**: Role collections, trust configuration
- **Using BTP tools**: btp CLI, CF CLI, kubectl, Terraform
- **Deploying multi-target applications**: MTA structure, deployment
- **Setting up connectivity**: Destinations, Cloud Connector, principal propagation
- **Implementing CI/CD**: SAP Continuous Integration and Delivery, pipelines
- **Extending SAP solutions**: S/4HANA Cloud, SuccessFactors, formations
- **Troubleshooting BTP services**: Common issues, error resolution

## Keywords

SAP BTP, SAP Business Technology Platform, Cloud Foundry, CF, Kyma, ABAP environment, subaccount, global account, directory, entitlements, quotas, btp CLI, CF CLI, MTA, multi-target application, XSUAA, SAP Authorization and Trust Management, Cloud Identity Services, Identity Authentication, destinations, Cloud Connector, service binding, buildpack, Kubernetes, serverless, RAP, CDS, CAP, SAP Cloud Application Programming Model, CI/CD, SAP Continuous Integration and Delivery, extensions, formations, trial account, free tier, enterprise account, consumption-based, subscription-based, CPEA, BTPEA, regions, availability zones, high availability, disaster recovery, audit logging, role collections, platform users, business users, Neo environment, service broker, space, org, namespace, Helm, Docker, Istio, API Gateway, Eventing, create subaccount, deploy application, configure trust, bind service, scale application, deploy MTA, create destination, setup Cloud Connector, configure XSUAA, assign role collection

## Source Documentation

- **Main Repository**: https://github.com/SAP-docs/btp-cloud-platform
- **SAP Help Portal**: https://help.sap.com/docs/btp
- **SAP Discovery Center**: https://discovery-center.cloud.sap/
- **BTP Best Practices**: https://github.com/SAP-docs/btp-best-practices-guide

## Skill Structure

```
btp-cloud-platform/
├── SKILL.md              # Main skill content (584 lines)
├── README.md             # This file
├── PROGRESS_TRACKING.md  # Documentation coverage tracking
└── references/           # 13 comprehensive reference files
    ├── glossary.md           # Complete terminology (40+ terms)
    ├── cloud-foundry.md      # CF environment, CLI, buildpacks
    ├── kyma.md               # Kyma modules, Kubernetes, serverless
    ├── abap.md               # ABAP environment, RAP, CDS, ADT
    ├── security.md           # Authentication, XSUAA, role collections
    ├── connectivity.md       # Destinations, Cloud Connector
    ├── development.md        # MTA, CAP, Application Router, CI/CD
    ├── tools.md              # btp CLI, CF CLI, kubectl, Terraform
    ├── extensions.md         # S/4HANA, SuccessFactors, formations
    ├── administration.md     # Account management, entitlements
    ├── operations.md         # Monitoring, logging, alerting, health
    ├── regions-endpoints.md  # All regions and API endpoints
    └── troubleshooting.md    # Common issues and solutions
```

## Coverage

This skill extracts and organizes content from **1683 documentation files** in the official SAP BTP documentation repository, with **13 reference files** totaling **7,000+ lines**:

| Section | Coverage | Reference File |
|---------|----------|----------------|
| Platform Concepts | 100% | `SKILL.md` |
| Account Model & Entitlements | 100% | `administration.md` |
| Cloud Foundry Environment | 95% | `cloud-foundry.md` |
| Kyma Environment | 95% | `kyma.md` |
| ABAP Environment | 95% | `abap.md` |
| Security & Identity | 95% | `security.md` |
| Extensions & Formations | 90% | `extensions.md` |
| Regions & Endpoints | 100% | `regions-endpoints.md` |
| Development Patterns | 90% | `development.md` |
| Connectivity | 90% | `connectivity.md` |
| Operations & Monitoring | 90% | `operations.md` |
| Tools & CLI | 95% | `tools.md` |
| Troubleshooting | 85% | `troubleshooting.md` |

## Token Efficiency

| Scenario | Without Skill | With Skill | Savings |
|----------|---------------|------------|---------|
| BTP account setup | ~15k tokens | ~4k tokens | 73% |
| CF deployment | ~10k tokens | ~3k tokens | 70% |
| Security configuration | ~12k tokens | ~4k tokens | 67% |
| **Average** | **~12k tokens** | **~4k tokens** | **~67%** |

## Maintenance

- **Last Verified**: 2025-11-22
- **Next Review**: 2026-02-22 (Quarterly)
- **Source Sync**: Check [PROGRESS_TRACKING.md](PROGRESS_TRACKING.md) for coverage details

## Related Skills

- `sap-btp-best-practices` - Enterprise architecture and governance
- `sap-cap` - Cloud Application Programming Model development
- `btp-cloud-transport-management` - Transport and deployment management
- `btp-job-scheduling` - Job scheduling service
- `btp-service-manager` - Service instance management

## License

MIT
