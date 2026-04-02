---
name: sap-btp-integration-suite
description: "Enterprise integration solutions using SAP Integration Suite on BTP. Covers Cloud Integration (iFlows), API Management, Event Mesh, Edge Integration Cell, Integration Advisor, Trading Partner Management, and Migration Assessment. Use for building integration flows, managing API proxies, event-driven architectures, B2B/EDI integrations, hybrid deployments, adapter configuration, Groovy/JavaScript message processing, and troubleshooting."


license: GPL-3.0
metadata:
  version: 1.1.0
  last_verified: 2025-11-27
  documentation_source: [https://github.com/SAP-docs/sap-btp-integration-suite](https://github.com/SAP-docs/sap-btp-integration-suite)
  sap_help_portal: [https://help.sap.com/docs/integration-suite](https://help.sap.com/docs/integration-suite)
  status: production
  keywords: [sap integration suite, cloud integration, cpi, iflow, api management, apim, event mesh, edge integration cell, integration advisor, trading partner management, b2b integration, edi integration, migration assessment, graph, odata provisioning, message mapping, groovy script, adapter configuration, sftp adapter, http adapter, odata adapter, rfc adapter, amqp adapter, kafka adapter, jms queue, data store, idempotent processing]

allowed-tools:
  - Read
  - Bash
  - Glob
  - Grep
  - WebFetch
  - WebSearch
---

# SAP BTP Integration Suite Development

## Table of Contents
- [Quick Reference](#quick-reference)
- [Capability Overview](#capability-overview)
- [Cloud Integration Development](#cloud-integration-development)
- [API Management Development](#api-management-development)
- [Event Mesh](#event-mesh)
- [Edge Integration Cell](#edge-integration-cell)
- [Integration Advisor](#integration-advisor)
- [Trading Partner Management](#trading-partner-management)
- [Migration Assessment](#migration-assessment)
- [Bundled Resources](#bundled-resources)

## Quick Reference

| Capability | Purpose | Key Artifact |
|------------|---------|--------------|
| Cloud Integration | A2A/B2B/B2G integration | Integration Flow (iFlow) |
| API Management | API lifecycle & governance | API Proxy |
| Event Mesh | Event-driven architecture | Topics & Queues |
| Edge Integration Cell | Hybrid deployment | Kubernetes runtime |
| Integration Advisor | B2B mapping automation | MIG/MAG |
| Trading Partner Management | Partner onboarding | Agreements |
| Graph | Unified data API | Business Data Graph |
| Integration Assessment | Technology selection | ISA-M |
| Migration Assessment | PO migration planning | Extraction & Analysis |

---

## Capability Overview

### Cloud Integration
Build and run integration flows across cloud, on-premise, and hybrid landscapes for A2A, B2B, and B2G scenarios. Supports 80+ adapters and real-time message processing.

**Core Components**:
- Integration Flows (iFlows) - Visual message processing pipelines
- Adapters - Protocol/application connectors (SFTP, HTTP, OData, RFC, AMQP, Kafka, etc.)
- Message Mapping - Graphical/XSLT/Groovy transformations
- Data Stores & Variables - Persistence for stateful processing
- Security Material - Keystores, credentials, PGP keys

### API Management
Complete API lifecycle management with security, traffic control, and developer engagement.

**Core Components**:
- API Proxies - Facade layer for backend services
- Policies (34 types) - Security, traffic, mediation rules
- Developer Hub - API portal for developers
- Products - API bundles with access control
- Analytics - Usage metrics and insights

### Event Mesh
Publish and consume business events across your enterprise ecosystem for event-driven architectures.

### Edge Integration Cell
Hybrid runtime for processing data within private landscapes while designing in the cloud. Deploy on Kubernetes (EKS, AKS, GKE, OpenShift, RKE2).

### Integration Advisor
AI-powered B2B content development supporting UN/EDIFACT, SAP IDoc, ASC X12. Creates Message Implementation Guidelines (MIGs) and Mapping Guidelines (MAGs).

### Trading Partner Management
Streamline B2B relationships with partner profiles, agreement templates, and automated runtime artifact generation. Supports AS2, SFTP, FTP protocols.

---

## Cloud Integration Development

### Integration Flow Structure

```
Sender → [Adapter] → Integration Process → [Adapter] → Receiver
                           ↓
              ┌────────────┴────────────┐
              │  Message Processing     │
              │  - Content Modifier     │
              │  - Router/Filter        │
              │  - Mapping              │
              │  - Splitter/Aggregator  │
              │  - Script               │
              │  - External Call        │
              └─────────────────────────┘
```

### Common Flow Steps

| Category | Steps |
|----------|-------|
| Routing | Router, Filter, Multicast, Recipient List |
| Transformation | Content Modifier, Mapping, Converter, Script |
| Splitting | General Splitter, Iterating Splitter, EDI Splitter |
| Persistence | Data Store, Write Variable, JMS Send |
| External | Request Reply, Send, Poll Enrich, Content Enricher |
| Security | Encryptor, Decryptor, Signer, Verifier |
| Error Handling | Exception Subprocess, Escalation Event |

### Adapter Categories

**Protocol Adapters**: HTTP, HTTPS, SFTP, FTP, AMQP, JMS, Kafka, AS2, AS4, SOAP, OData
**Application Adapters**: SuccessFactors, Ariba, Salesforce, ServiceNow, Workday
**Database Adapters**: JDBC (Oracle, SQL Server, PostgreSQL, HANA, DB2)
**Cloud Adapters**: AWS (S3, SQS, SNS), Azure (Service Bus, Storage), Google Cloud

### Scripting Guidelines

**Prefer standard steps over scripts**. When scripting is necessary:

```groovy
// Access message body
def body = message.getBody(String.class)

// Access headers
def header = message.getHeader("HeaderName", String.class)

// Access properties
def prop = message.getProperty("PropertyName")

// Modify body
message.setBody(newBody)

// Add header
message.setHeader("NewHeader", "value")

// Logging (use SLF4J)
def log = org.slf4j.LoggerFactory.getLogger("script")
log.info("Processing message")
```

**Best Practices**:
- Use `XmlSlurper.parse(Object)` instead of `parseText(String)` for large payloads
- Use `StringBuilder` for string concatenation
- Never use `TimeZone.setDefault()` (VM-wide impact)
- Never write credentials to headers (tracing exposes them)

---

## API Management Development

### API Proxy Structure

```
Client → Proxy Endpoint → [Policies] → Target Endpoint → Backend
              ↓                              ↓
         PreFlow                        PreFlow
         Conditional Flows              Conditional Flows
         PostFlow                       PostFlow
              ↓                              ↓
         Fault Rules                    Fault Rules
```

### Policy Categories

| Category | Policies |
|----------|----------|
| Security | OAuth 2.0, Verify API Key, Basic Auth, SAML, Access Control |
| Traffic | Quota, Spike Arrest, Concurrent Rate Limit, Response Cache |
| Mediation | Assign Message, Extract Variables, JSON/XML Transform, XSL Transform |
| Extension | JavaScript, Python Script, Service Callout |
| Threat Protection | JSON/XML Threat Protection, Regular Expression Protection |
| Logging | Message Logging, Statistics Collector |

### Common Policy Attributes

```xml
<PolicyName enabled="true" continueOnError="false" async="false">
  <!-- Policy configuration -->
</PolicyName>
```

---

## Message Quality of Service

### Exactly-Once Processing

Use when duplicates must be prevented:

1. **JMS Queues** - Transactional message storage
2. **Idempotent Process Call** - Duplicate detection via ID mapping
3. **Data Store** - Persistent message tracking

### Idempotent Pattern

```
Sender → [ID Mapping] → Check Duplicate → Process → [ID Mapping Complete]
                              ↓ (duplicate)
                         Return Cached Response
```

---

## Edge Integration Cell

### Deployment Requirements

- Kubernetes cluster (EKS, AKS, GKE, OpenShift, RKE2)
- Minimum: 4 worker nodes, 4 vCPU, 16GB RAM each
- Storage: 100GB+ persistent volume
- Network: Ingress controller, DNS configuration

### Workflow

1. Activate Edge Integration Cell in Integration Suite
2. Prepare Kubernetes cluster (platform-specific)
3. Deploy Edge Lifecycle Management Bridge
4. Deploy Edge Integration Cell solution
5. Configure keystore synchronization
6. Deploy integration content

---

## Troubleshooting

### Common Issues

| Issue | Resolution |
|-------|------------|
| Adapter connection failed | Check credentials, firewall, Cloud Connector |
| Message mapping error | Validate source/target structures, check XPath |
| Timeout | Increase adapter timeout, optimize mapping |
| Memory issues | Stream large payloads, reduce logging |
| Duplicate messages | Implement idempotent processing |
| Keystore sync failed | Verify certificate validity, check permissions |

### Monitoring Hierarchy

```
Integration Suite → Monitor → Integrations and APIs
    ├── Message Processing → All Integration Flows
    ├── Manage Integration Content → Deployed Artifacts
    ├── Manage Security → Keystores, Credentials
    └── Manage Stores → Data Stores, Variables, Queues
```

---

## Limits Reference

| Resource | Limit |
|----------|-------|
| Integration flows per tenant | Varies by plan |
| JMS queues | 30 per tenant (standard) |
| Data stores | 100MB total storage |
| Message processing log retention | 30 days |
| Attachment size | 40MB |
| API proxies (APIM) | Based on service plan |
| Business data graphs | 500/account, 50/subaccount |

---

## Bundled Resources

### Reference Documentation
Detailed guides available in `references/` directory:

**Core Development**:
- `cloud-integration.md` - iFlow development, steps, patterns, best practices
- `adapters.md` - All 80+ adapter configurations (HTTP, SFTP, OData, RFC, etc.)
- `scripting.md` - Groovy/JavaScript patterns, APIs, and templates
- `api-management.md` - API proxy development, 34 policies, Developer Hub
- `security.md` - Authentication, keystores, certificates, credentials

**Capabilities**:
- `edge-integration-cell.md` - Hybrid Kubernetes deployment guide
- `event-mesh.md` - Topics, queues, brokers, webhooks, EDA patterns
- `integration-advisor-tpm.md` - B2B integration, MIGs, MAGs, partner management
- `graph-odata.md` - Business Data Graph, OData provisioning
- `data-space-integration.md` - Catena-X, EDC, sovereign data exchange
- `migration-assessment.md` - PO migration, ISA-M, technology mapping

**Operations**:
- `operations-monitoring.md` - Message monitoring, stores, connectivity tests
- `content-transport.md` - TMS, CTS+, MTAR, manual export/import
- `troubleshooting.md` - Error resolution, diagnostics, HTTP error catalog

### Templates
Ready-to-use templates in `templates/` directory:
- `groovy-script-template.groovy` - Common script patterns
- `api-policy-template.xml` - Policy configuration template

---

## Documentation Links

### Official Sources
- **GitHub Repository**: [https://github.com/SAP-docs/sap-btp-integration-suite](https://github.com/SAP-docs/sap-btp-integration-suite)
- **SAP Help Portal**: [https://help.sap.com/docs/integration-suite](https://help.sap.com/docs/integration-suite)
- **SAP Community**: [https://community.sap.com/topics/cloud-platform-integration-suite](https://community.sap.com/topics/cloud-platform-integration-suite)
- **SAP Business Accelerator Hub**: [https://api.sap.com/](https://api.sap.com/)

### Capability-Specific
- **Cloud Integration**: [https://help.sap.com/docs/cloud-integration](https://help.sap.com/docs/cloud-integration)
- **API Management**: [https://help.sap.com/docs/sap-api-management](https://help.sap.com/docs/sap-api-management)
- **Event Mesh**: [https://help.sap.com/docs/event-mesh](https://help.sap.com/docs/event-mesh)
- **Integration Advisor**: [https://help.sap.com/docs/integration-advisor](https://help.sap.com/docs/integration-advisor)

### Release Notes
- **What's New**: Check `what-s-new-for-sap-integration-suite-79cd682.md` in documentation
- **Patch Releases**: Check `patch-release-notes-for-sap-integration-suite-58595b5.md`
