---
name: sap-btp-cloud-logging
description: |
  This skill provides comprehensive guidance for SAP Cloud Logging service on SAP BTP.
  Use when setting up Cloud Logging instances, configuring log ingestion from Cloud Foundry
  or Kyma runtimes, implementing OpenTelemetry observability, analyzing logs/metrics/traces
  in OpenSearch Dashboards, configuring SAML authentication, managing certificates, or
  troubleshooting ingestion issues. Covers service plans (dev/standard/large), all 4
  instance creation methods (BTP Cockpit, CF CLI, BTP CLI, Service Operator), all 4
  ingestion methods (Cloud Foundry, Kyma, OpenTelemetry, JSON API), and security best practices.
license: GPL-3.0
metadata:
  version: "1.1.0"
  last_verified: "2025-11-27"
  source_documentation: "[https://github.com/SAP-docs/btp-cloud-logging"](https://github.com/SAP-docs/btp-cloud-logging")
  sap_help_portal: "[https://help.sap.com/docs/cloud-logging"](https://help.sap.com/docs/cloud-logging")
---

# SAP BTP Cloud Logging Skill

## Table of Contents

- [Service Overview](#service-overview)
- [Service Plans](#service-plans)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Instance Creation Options](#instance-creation-options)
- [Configuration Parameters](#configuration-parameters)
  - [Full Configuration Example](#full-configuration-example)
- [Data Ingestion Methods](#data-ingestion-methods)
  - [1. Cloud Foundry Runtime](#1-cloud-foundry-runtime)
  - [2. Kyma Runtime](#2-kyma-runtime)
  - [3. OpenTelemetry API (OTLP)](#3-opentelemetry-api-otlp)
  - [4. JSON API](#4-json-api)
- [Certificate Management](#certificate-management)
  - [Certificate Validity](#certificate-validity)
- [Bundled Resources](#bundled-resources)
  - [Root CA Rotation (3-Step Process)](#root-ca-rotation-3-step-process)
- [OpenSearch Dashboards](#opensearch-dashboards)
  - [Access](#access)
  - [Pre-built Dashboards](#pre-built-dashboards)
  - [Custom Dashboards & Alerting](#custom-dashboards--alerting)
  - [Index Patterns Summary](#index-patterns-summary)
- [Security Best Practices](#security-best-practices)
  - [Security Recommendations](#security-recommendations)
  - [SAML Authentication Setup](#saml-authentication-setup)
- [Backup & Recovery](#backup--recovery)
  - [Automatic Backups](#automatic-backups)
  - [Restoration Process](#restoration-process)
- [Common Issues & Troubleshooting](#common-issues--troubleshooting)
- [Reference Files](#reference-files)
- [Documentation Links](#documentation-links)
  - [Official Sources](#official-sources)
  - [Related Documentation](#related-documentation)
- [Data Protection Notice](#data-protection-notice)

## Service Overview

SAP Cloud Logging is an instance-based observability service built on OpenSearch that stores, visualizes, and analyzes application logs, metrics, and traces from SAP BTP Cloud Foundry, Kyma, Kubernetes, and other runtime environments.

**Key Capabilities:**
- Ingest logs, metrics, and traces via OpenTelemetry (OTLP) or JSON API
- Ingest application and request logs from Cloud Foundry runtime
- Configure data retention (1-90 days)
- Visualize and analyze data in OpenSearch Dashboards
- Create custom dashboards and alerts
- SAML authentication via SAP Identity Authentication Service

---

## Service Plans

| Plan | Capacity | Use Case | Auto-Scaling |
|------|----------|----------|--------------|
| **dev** | 7.5 GB fixed | Evaluation only | No |
| **standard** | 75 GB - 375 GB | Production (100 logs/sec) | Yes |
| **large** | 750 GB - 3.75 TB | Production (1000 logs/sec) | Yes |

**Important:** Plan updates are not supported. Migration requires running instances in parallel.

---

## Quick Start

### Prerequisites
1. SAP BTP Global Account
2. Subaccount with Cloud Logging entitlement
3. (Recommended) SAP Cloud Identity Services tenant for SAML authentication

**Note for SAP Build Code Users:** If using SAP Build Code, follow the SAP Build Code Initial Setup instructions instead. Cloud Logging in SAP Build Code is available for **evaluation purposes only**.

### Instance Creation Options

Choose one method based on your workflow:

**Option 1: SAP BTP Cockpit (UI)**
1. Navigate to Subaccount → Instances and Subscriptions → Create
2. Select `cloud-logging` service and plan
3. Configure parameters (see Configuration section)
4. Create service key for credentials

**Option 2: Cloud Foundry CLI**
```bash
cf create-service cloud-logging standard my-cls-instance -c '{
  "retention_period": 14,
  "backend": { "max_data_nodes": 10 },
  "ingest": { "max_instances": 10 }
}'

# Wait for provisioning
cf services  # Check "last operation" status

# Create service key
cf create-service-key my-cls-instance my-cls-key
cf service-key my-cls-instance my-cls-key
```

**Option 3: SAP BTP CLI**
```bash
btp create services/instance \
  --subaccount <SUBACCOUNT_ID> \
  --name my-cls-instance \
  --offering-name "cloud-logging" \
  --plan-name standard \
  --parameters '{"retention_period": 14}'

# Create binding
btp create services/binding \
  --subaccount <SUBACCOUNT_ID> \
  --name my-cls-binding \
  --instance-name my-cls-instance

# Get credentials
btp get services/binding --name my-cls-binding --subaccount <SUBACCOUNT_ID>
```

**Option 4: SAP BTP Service Operator (Kubernetes/Kyma)**
```yaml
apiVersion: services.cloud.sap.com/v1
kind: ServiceInstance
metadata:
  name: cloud-logging-instance
  namespace: sap-cloud-logging-integration
spec:
  serviceOfferingName: cloud-logging
  servicePlanName: standard
  parameters:
    retentionPeriod: 14
---
apiVersion: services.cloud.sap.com/v1
kind: ServiceBinding
metadata:
  name: cls-binding
  namespace: sap-cloud-logging-integration
spec:
  serviceInstanceName: cloud-logging-instance
  secretName: sap-cloud-logging
```

---

## Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `retention_period` | int | 7 | Data retention in days (1-90) |
| `backend.max_data_nodes` | int | 10 | Max OpenSearch data nodes (2-10) |
| `dashboards.custom_label` | string | - | Dashboard identifier (max 20 chars) |
| `ingest.max_instances` | int | 10 | Max ingest instances for autoscaling (2-10) |
| `ingest.min_instances` | int | 2 | Min ingest instances (2-10) |
| `ingest_otlp.enabled` | bool | false | Enable OpenTelemetry Protocol ingestion |
| `feature_flags` | array | [] | Experimental features (e.g., `upgradeToOpenSearchV2`) |
| `rotate_root_ca` | bool | false | Trigger CA certificate rotation |
| `saml` | object | - | SAML authentication configuration |

### Full Configuration Example
```json
{
  "retention_period": 14,
  "feature_flags": ["upgradeToOpenSearchV2"],
  "dashboards": {
    "custom_label": "PROD-CLS"
  },
  "backend": {
    "max_data_nodes": 10
  },
  "ingest": {
    "max_instances": 10,
    "min_instances": 2
  },
  "ingest_otlp": {
    "enabled": true
  },
  "saml": {
    "enabled": true,
    "initiated": true,
    "admin_group": "CLS-Admins",
    "roles_key": "groups",
    "idp": {
      "metadata_url": "[https://<tenant>.accounts.ondemand.com/saml2/metadata",](https://<tenant>.accounts.ondemand.com/saml2/metadata",)
      "entity_id": "[https://<tenant>.accounts.ondemand.com"](https://<tenant>.accounts.ondemand.com")
    },
    "sp": {
      "entity_id": "cloud-logging-<instance-id>"
    }
  }
}
```

---

## Data Ingestion Methods

### 1. Cloud Foundry Runtime
Bind applications directly to the Cloud Logging instance:
```bash
cf bind-service <app-name> <cls-instance>
```

**Index Patterns:**
- `logs-cfsyslog-*` - Application logs
- `metrics-otel-v1-*` - Resource metrics

For user-provided services with mTLS, see `references/cf-ingestion.md`.

### 2. Kyma Runtime
Requires `telemetry` and `btp-operator` modules enabled:
```bash
# Create namespace
kubectl create namespace sap-cloud-logging-integration

# Deploy ServiceInstance and ServiceBinding (see templates above)
kubectl apply -n sap-cloud-logging-integration -f cls-instance.yaml
```

**Index Patterns:**
- `logs-json-istio-envoy-kyma*` - Istio access logs
- `logs-json-kyma*` - Application logs

### 3. OpenTelemetry API (OTLP)
Enable with `ingest_otlp.enabled: true`, then configure your application:

**Service Key Credentials:**
- `ingest-otlp-endpoint` - gRPC endpoint (hostname:443)
- `ingest-otlp-cert` - Client certificate (PEM)
- `ingest-otlp-key` - Private key (PKCS#8)
- `server-ca` - Server CA certificate

**Index Patterns:**
- `logs-otel-v1-*` - Logs
- `metrics-otel-v1-*` - Metrics
- `otel-v1-apm-span-*` - Traces
- `otel-v1-apm-service-map` - Service map

**Note:** Only gRPC protocol supported. Use OpenTelemetry Collector to convert http/protobuf or http/json.

For Java/Node.js automation libraries, see `references/opentelemetry-ingestion.md`.

### 4. JSON API
Send logs via HTTP with mTLS:
```bash
curl -X PUT "[https://<ingest-endpoint>/v1/ingest"](https://<ingest-endpoint>/v1/ingest") \
  --cert client.crt --key client.key \
  -H "Content-Type: application/json" \
  -d '[{"msg": "log message", "date": "2025-01-15T10:30:00Z"}]'
```

**Index Pattern:** `logs-json-*`

For Fluent Bit configuration, see `references/json-api-ingestion.md`.

---

## Certificate Management

### Certificate Validity
- Default: 90 days
- Configurable: 1-180 days via `certValidityDays` in binding parameters

### Root CA Rotation (3-Step Process)

**CAUTION:** Not following this process causes ingestion interruption.

1. **Create new CA:** Update instance with `"rotate_root_ca": true`
2. **Rebind all applications:** Create new bindings for each shipping mechanism
3. **Delete old CA:** Update instance with `"rotate_root_ca": false`

---

## OpenSearch Dashboards

### Access
1. Create service binding/key
2. Navigate to `dashboards-url` from credentials
3. Authenticate (SAML or basic auth)

### Pre-built Dashboards
- Cloud Foundry application performance
- Request latency and error rates
- Resource utilization metrics

### Custom Dashboards & Alerting
- Create custom dashboards for specific analysis needs
- Configure alerting based on observability data
- Integrate with **SAP Alert Notification for SAP BTP** for advanced alerting workflows

### Index Patterns Summary
| Source | Index Pattern |
|--------|---------------|
| CF Logs | `logs-cfsyslog-*` |
| CF Metrics | `metrics-otel-v1-*` |
| OTLP Logs | `logs-otel-v1-*` |
| OTLP Metrics | `metrics-otel-v1-*` |
| OTLP Traces | `otel-v1-apm-span-*` |
| JSON API | `logs-json-*` |
| Kyma Apps | `logs-json-kyma*` |
| Kyma Istio | `logs-json-istio-envoy-kyma*` |

**Note:** Attribute names use `@` instead of `.` due to OpenSearch/Lucene limitations.

---

## Security Best Practices

### Security Recommendations
- **BTP-CLS-0001:** Configure SAML authentication with Identity Authentication Service (critical)
- **BTP-CLS-0002:** Rotate service keys regularly; deletion doesn't automatically invalidate credentials
- **BTP-CLS-0003:** Review Kyma runtime and JSON API security configuration

**Note:** Only BTP-CLS-0001 (critical level) is currently reported to SAP Cloud ALM. Other recommendations must be manually verified.

### SAML Authentication Setup
1. Create SAML 2.0 application in SAP Identity Authentication
2. Configure "groups" attribute from Identity Directory
3. Set Name ID Format to "E-mail"
4. Enable request signing (recommended)
5. Configure `saml` parameters in instance configuration
6. The `admin_group` maps to `all_access` role

See `references/saml-authentication.md` for detailed setup.

---

## Backup & Recovery

### Automatic Backups
**Backed up:** OpenSearch settings, roles, role mappings, tenants, groups, security configs, saved objects, ISM policies
**Not backed up:** Alerts

### Restoration Process
Create SAP support ticket with component `BC-CP-CLS` including:
1. Dashboard URL
2. Instance configuration
3. Deprovisioning timestamp
4. Target restoration date (max 7 days)
5. Owner information
6. Business justification

---

## Common Issues & Troubleshooting

### Instance Creation Fails
- Verify entitlement in subaccount
- Check service plan availability in region
- Validate JSON configuration syntax

### Ingestion Not Working
- Verify binding credentials are current (check certificate expiry)
- For CF: Binding takes effect without restaging
- For OTLP: Ensure `ingest_otlp.enabled: true`
- Check network connectivity to ingest endpoint

### Dashboard Access Issues
- Verify SAML configuration if enabled
- Check user is in configured admin group
- Validate IdP metadata URL accessibility

### Certificate Expiration
- Default validity: 90 days
- Create new binding before expiration
- Consider root CA rotation if widespread

---

## Reference Files

For detailed information, see bundled reference files:

### Configuration & Setup
- `references/service-plans.md` (183 lines) - Service plans comparison and capacity planning
- `references/configuration-parameters.md` (270 lines) - Complete parameter reference with examples

### Ingestion Methods
- `references/cf-ingestion.md` (211 lines) - Cloud Foundry ingestion details
- `references/kyma-ingestion.md` (293 lines) - Kyma runtime integration
- `references/opentelemetry-ingestion.md` (363 lines) - OTLP setup with Java/Node.js automation
- `references/json-api-ingestion.md` (435 lines) - JSON API and Fluent Bit configuration

### Security & Authentication
- `references/saml-authentication.md` (329 lines) - SAML setup with Identity Authentication Service

---

## Documentation Links

### Official Sources
- **GitHub Docs:** [https://github.com/SAP-docs/btp-cloud-logging](https://github.com/SAP-docs/btp-cloud-logging)
- **SAP Help Portal:** [https://help.sap.com/docs/cloud-logging](https://help.sap.com/docs/cloud-logging)
- **Discovery Center:** [https://discovery-center.cloud.sap/serviceCatalog/cloud-logging](https://discovery-center.cloud.sap/serviceCatalog/cloud-logging)
- **Capacity Estimator:** Referenced in Discovery Center

## Bundled Resources

### Reference Documentation
- `references/cf-ingestion.md` - Cloud Foundry runtime ingestion guide
- `references/kyma-ingestion.md` - Kyma/Cloud Foundry Kyma runtime ingestion
- `references/opentelemetry-ingestion.md` - OpenTelemetry data ingestion
- `references/json-api-ingestion.md` - JSON API ingestion methods
- `references/saml-authentication.md` - SAML authentication configuration
- `references/service-plans.md` - Service plans comparison and selection

### Related Documentation
- **OpenSearch:** [https://opensearch.org/docs/latest/](https://opensearch.org/docs/latest/)
- **SAP Cloud Identity Services:** [https://help.sap.com/docs/cloud-identity](https://help.sap.com/docs/cloud-identity)
- **BTP Security Recommendations:** [https://help.sap.com/docs/btp/sap-btp-security-recommendations-c8a9bb59fe624f0981efa0eff2497d7d/sap-btp-security-recommendations](https://help.sap.com/docs/btp/sap-btp-security-recommendations-c8a9bb59fe624f0981efa0eff2497d7d/sap-btp-security-recommendations)

---

## Data Protection Notice

SAP Cloud Logging is **not designed** for personal or business-critical data. Take measures to prevent transmission of such data. Data is stored regionally but physical data center locations may differ from consumption locations within the same region.
