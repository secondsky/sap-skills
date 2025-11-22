# Extensions Reference

Complete guidance for extending SAP solutions using SAP BTP.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/40-extensions

---

## Table of Contents

1. [Extensions Overview](#extensions-overview)
2. [Formations](#formations)
3. [System Registration](#system-registration)
4. [S/4HANA Cloud Extensions](#s4hana-cloud-extensions)
5. [SuccessFactors Extensions](#successfactors-extensions)
6. [Event Mesh Integration](#event-mesh-integration)
7. [Configuration Files](#configuration-files)
8. [Troubleshooting](#troubleshooting)

---

## Extensions Overview

SAP BTP enables loosely coupled extensions without disrupting core SAP solution processes.

### Extension Capabilities

| Capability | Description |
|------------|-------------|
| **API Access** | Consume SAP solution APIs |
| **Event Consumption** | React to SAP solution events |
| **UI Extensions** | Extend SAP Fiori interfaces |
| **Side-by-Side** | Build companion apps |

### Supported SAP Solutions

| Solution | Cloud Foundry | Kyma |
|----------|---------------|------|
| SAP S/4HANA Cloud | Yes | Yes |
| SAP SuccessFactors | Yes | Yes |
| SAP Marketing Cloud | Yes | Yes |
| SAP Commerce Cloud | - | Yes |
| SAP Field Service Management | - | Yes |
| SAP Customer Experience | - | Yes |

### Extension Architecture

```
SAP Solution (S/4HANA, SuccessFactors)
    ↓ APIs & Events
SAP BTP (Unified Customer Landscape)
    ↓ Formations
Extension Application (CF or Kyma)
```

---

## Formations

Formations are logical groupings of SAP systems for common business scenarios.

### Formation Types

| Type | Purpose |
|------|---------|
| **Business Scenario** | Group systems for specific use cases |
| **Service Integration** | Connect to BTP services |
| **Extensibility** | Enable extension development |

### Formation Status

| Status | Description |
|--------|-------------|
| **Ready** | Successfully configured |
| **Draft** | Incomplete, missing systems |
| **Action Required** | Needs additional setup |
| **Synchronizing** | Systems syncing in background |
| **Error** | Sync failed, needs resync |

### Creating Formations

1. Navigate to **System Landscape > Formations** in BTP Cockpit
2. Click **Create Formation**
3. Enter unique name (max 128 chars)
4. Select formation type
5. Add registered systems
6. Review and confirm

### Formation Management

```
BTP Cockpit → System Landscape → Formations
├── Create Formation
├── Add Systems
├── Finalize Formation
├── Resynchronize (on error)
└── Delete Formation
```

---

## System Registration

Register SAP systems to enable extensions.

### Registration Process

1. **Generate Token**: Create registration token in BTP Cockpit
2. **Configure System**: Use token in SAP solution admin
3. **Verify Connection**: Check system status in BTP

### System Types

| System Type | Registration Method |
|-------------|---------------------|
| SAP S/4HANA Cloud | Registration token |
| SAP SuccessFactors | Registration token |
| SAP Marketing Cloud | Registration token |
| Third-party Systems | Manual configuration |
| SAP BTP Applications | Service instance |

### Register S/4HANA Cloud System

```
BTP Cockpit → System Landscape → Systems
├── Add System
├── System Type: SAP S/4HANA Cloud
├── Generate Token
└── Complete in S/4HANA Cloud Admin
```

### Register SuccessFactors System

```
BTP Cockpit → System Landscape → Systems
├── Add System
├── System Type: SAP SuccessFactors
├── Generate Token
└── Complete in SuccessFactors Provisioning
```

---

## S/4HANA Cloud Extensions

### Extension Setup Steps

1. **Register System** in global account
2. **Configure Entitlements** for subaccounts
3. **Create Service Instance** (api-access or messaging plan)
4. **Build Extension** in CF or Kyma

### Service Plans

| Plan | Purpose |
|------|---------|
| `api-access` | Consume S/4HANA APIs |
| `messaging` | Consume S/4HANA events |

### API Access Configuration

```json
{
  "systemName": "MY_S4HANA_SYSTEM",
  "communicationArrangement": {
    "communicationArrangementName": "MY_ARRANGEMENT",
    "scenarioId": "SAP_COM_0008",
    "inboundAuthentication": "OAuth2SAMLBearerAssertion",
    "outboundAuthentication": "BasicAuthentication",
    "outboundServices": [
      {
        "name": "Business Partner (A2X)",
        "isServiceActive": true
      }
    ]
  }
}
```

### Supported Authentication

| Method | Use Case |
|--------|----------|
| BasicAuthentication | Simple scenarios |
| OAuth2SAMLBearerAssertion | User propagation |
| OAuth2ClientCredentials | Service-to-service |
| NoAuthentication | Public APIs |

### Event Consumption

1. Configure SAP Event Mesh entitlements
2. Create Event Mesh service instance
3. Create S/4HANA extensibility instance (messaging plan)
4. Subscribe to events

---

## SuccessFactors Extensions

### Extension Setup

1. **Register System** in global account
2. **Configure SSO** (optional)
3. **Configure Entitlements**
4. **Create Service Instance**

### SSO Configuration

```
SuccessFactors → Identity Authentication → SAP BTP
```

Steps:
1. Configure SuccessFactors as trusted IdP in BTP
2. Configure subaccount as trusted service provider in SuccessFactors
3. Test SSO flow

### API Access

```json
{
  "systemName": "MY_SFSF_SYSTEM",
  "technicalUser": "TECHNICAL_USER",
  "technicalUserSecret": "xxx"
}
```

---

## Event Mesh Integration

### Event Mesh Architecture

```
SAP Solution → Event Mesh → Extension App
              (CloudEvents)
```

### Event Mesh Service Plans

| Plan | Purpose |
|------|---------|
| `default` | Standard eventing |
| `development` | Non-production |

### Event Mesh Descriptor

```json
{
  "emname": "my-event-mesh",
  "namespace": "my/namespace",
  "rules": {
    "queueRules": {
      "publishFilter": ["${namespace}/*"],
      "subscribeFilter": ["${namespace}/*"]
    },
    "topicRules": {
      "publishFilter": ["${namespace}/*"],
      "subscribeFilter": ["${namespace}/*"]
    }
  }
}
```

### Create Queues and Subscribe

```bash
# Create queue
cf create-service-key my-event-mesh my-key

# Subscribe to topic
# Use Event Mesh UI or REST API
```

---

## Configuration Files

### Communication Arrangement JSON

```json
{
  "communicationArrangementName": "MY_ARRANGEMENT",
  "scenarioId": "SAP_COM_0008",
  "inboundAuthentication": "OAuth2SAMLBearerAssertion",
  "outboundAuthentication": "BasicAuthentication",
  "inboundServices": [
    {
      "serviceName": "Business Partner API",
      "isServiceActive": true
    }
  ],
  "outboundServices": [
    {
      "name": "Business Partner (A2X)",
      "isServiceActive": true
    }
  ]
}
```

### Communication Arrangement YAML

```yaml
communicationArrangementName: MY_ARRANGEMENT
scenarioId: SAP_COM_0008
inboundAuthentication: OAuth2SAMLBearerAssertion
outboundAuthentication: BasicAuthentication
inboundServices:
  - serviceName: Business Partner API
    isServiceActive: true
outboundServices:
  - name: Business Partner (A2X)
    isServiceActive: true
```

### API Access Configuration

```json
{
  "systemName": "MY_SYSTEM",
  "communicationArrangement": {
    "communicationArrangementName": "INBOUND_COMM_ARRANGEMENT",
    "scenarioId": "SAP_COM_0008",
    "inboundAuthentication": "OAuth2SAMLBearerAssertion"
  }
}
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Service instance creation failed | Check entitlements, verify system registration |
| Event consumption not working | Verify Event Mesh configuration, check topic subscriptions |
| API access denied | Check communication arrangement, verify authentication |
| System not visible | Verify registration token was used, check system status |

### S/4HANA Extensibility Issues

| Error | Resolution |
|-------|------------|
| Instance creation failed (no message) | Check communication arrangement JSON syntax |
| Messaging plan unavailable | Configure Event Mesh entitlements first |
| API authentication failed | Verify OAuth configuration in S/4HANA |

### SuccessFactors Issues

| Error | Resolution |
|-------|------------|
| OData destination not working | Verify technical user credentials |
| SSO not working | Check trust configuration both sides |
| Instance creation failed | Verify system registration complete |

---

## Region Limitations

Extensions functionality is **NOT available** in:
- China (Shanghai) region
- Government Cloud (US) region

---

## Related Documentation

- Extensions: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/40-extensions/extensions-08b1eff.md
- Formations: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/40-extensions/automating-integrations-using-formations-68b04fa.md
- S/4HANA Extensions: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/40-extensions/extending-sap-s-4hana-cloud-in-the-cloud-foundry-and-kyma-environment-40b9e6c.md
- SuccessFactors Extensions: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/40-extensions/extending-sap-successfactors-in-the-cloud-foundry-and-kyma-environment-9e33934.md
