# Operations and Monitoring Reference

Complete guidance for SAP BTP operations, monitoring, logging, and alerting.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/50-administration-and-ops

---

## Table of Contents

1. [Monitoring Overview](#monitoring-overview)
2. [SAP Cloud ALM](#sap-cloud-alm)
3. [Application Logging](#application-logging)
4. [Audit Logging](#audit-logging)
5. [Alert Notification](#alert-notification)
6. [Health Monitoring](#health-monitoring)
7. [Operating Model](#operating-model)
8. [Data Protection](#data-protection)

---

## Monitoring Overview

### Monitoring Stack

```
Application Layer
    ↓ Logs & Metrics
SAP Cloud Logging / Application Logging
    ↓ Analysis
SAP Cloud ALM / External Tools
    ↓ Alerts
SAP Alert Notification
    ↓ Channels
Email / Slack / ServiceNow / Cloud ALM
```

### Available Services

| Service | Purpose |
|---------|---------|
| **SAP Cloud ALM** | End-to-end application lifecycle management |
| **Application Logging** | Application log collection and analysis |
| **SAP Cloud Logging** | Observability across CF, Kyma, K8s |
| **Audit Log** | Security-relevant activity records |
| **Alert Notification** | Multi-channel alerting |

---

## SAP Cloud ALM

Enterprise application lifecycle management included with SAP Enterprise Support.

### Capabilities

| Feature | Description |
|---------|-------------|
| **Real User Monitoring** | End-user experience tracking |
| **Health Monitoring** | Application and service health |
| **Integration Monitoring** | Integration flow status |
| **Exception Monitoring** | Error detection and analysis |
| **Job Automation Monitoring** | Scheduled job tracking |
| **Business Process Monitoring** | Process KPIs |

### Setup

1. Activate SAP Cloud ALM in BTP Cockpit
2. Configure data collection agents
3. Set up monitoring dashboards
4. Configure alert rules

### Integration

```
SAP BTP Applications → SAP Cloud ALM
                     ← Alert Notification
```

---

## Application Logging

### Service Plans

| Plan | Features |
|------|----------|
| **lite** | Basic logging, limited retention |
| **standard** | Extended retention, advanced features |

### Setup

```bash
# Create service instance
cf create-service application-logs lite my-logs

# Bind to application
cf bind-service my-app my-logs

# Restage application
cf restage my-app
```

### Log Levels

| Level | Use Case |
|-------|----------|
| **ERROR** | Errors requiring attention |
| **WARN** | Warning conditions |
| **INFO** | General information |
| **DEBUG** | Debugging information |

### Viewing Logs

**CF CLI**:
```bash
# Recent logs
cf logs my-app --recent

# Tail logs
cf logs my-app

# Specific time range
cf logs my-app --recent | grep "ERROR"
```

**Kibana Dashboard**:
- Access via Application Logging service
- Create custom visualizations
- Set up log-based alerts

### Log Retention

| Plan | Retention |
|------|-----------|
| lite | 7 days |
| standard | Configurable |

---

## Audit Logging

Security-relevant chronological records for compliance and security.

### Audit Categories

| Category | Description |
|----------|-------------|
| `audit.data-access` | Sensitive personal data access |
| `audit.data-modification` | Sensitive data changes |
| `audit.security-events` | Login, logout, security events |
| `audit.configuration` | Security configuration changes |

### Service Plans

| Plan | Features | Retention | Cost |
|------|----------|-----------|------|
| **default** | BTP service audit data | 90 days | Included |
| **premium** | Custom app audit data | Configurable | Additional |

### Audit Log Retrieval

**Via Viewer**:
1. Subscribe to SAP Audit Log Viewer Service
2. Assign viewer roles
3. Access via BTP Cockpit

**Via API**:
```bash
curl -X GET "https://auditlog.cf.<region>.hana.ondemand.com/v2/auditlogrecords" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

### Writing Audit Logs (Custom Apps)

```javascript
// Node.js example
const auditLog = require('@sap/audit-logging');

const log = auditLog.v2(credentials);
await log.dataAccess({
  object: { type: 'customer', id: '12345' },
  attributes: ['email', 'phone'],
  accessChannel: 'API'
}).tenant('tenant-id').by('user@example.com').log();
```

---

## Alert Notification

Multi-channel alerting service for BTP events.

### Alert Channels

| Channel | Configuration |
|---------|---------------|
| **Email** | SMTP settings |
| **Slack** | Webhook URL |
| **Microsoft Teams** | Webhook URL |
| **ServiceNow** | Instance URL + credentials |
| **SAP Cloud ALM** | Direct integration |
| **Webhook** | Custom HTTP endpoint |

### Alert Configuration

```json
{
  "conditions": {
    "type": "CONDITION_TREE",
    "children": [
      {
        "type": "LEAF",
        "parameter": "eventType",
        "operator": "=",
        "value": "audit.security-events"
      }
    ]
  },
  "actions": [
    {
      "type": "EMAIL",
      "properties": {
        "destination": "alerts@example.com"
      }
    }
  ]
}
```

### Event Types

| Category | Events |
|----------|--------|
| **Application** | Start, stop, crash |
| **Service** | Binding changes, instance updates |
| **Security** | Authentication failures, role changes |
| **Platform** | Quota warnings, maintenance |

---

## Health Monitoring

### Application Health Checks

**Cloud Foundry**:
```yaml
# manifest.yml
applications:
- name: my-app
  health-check-type: http
  health-check-http-endpoint: /health
  health-check-timeout: 60
```

**Kyma**:
```yaml
# deployment.yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Health Endpoints

```javascript
// Express.js health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    checks: {
      database: checkDatabase(),
      cache: checkCache()
    }
  });
});
```

---

## Operating Model

### Shared Responsibility Model

| Area | SAP Responsibility | Customer Responsibility |
|------|-------------------|------------------------|
| **Platform** | Infrastructure, OS, patches | - |
| **Runtime** | CF/Kyma platform | Application code |
| **Services** | BTP service availability | Service configuration |
| **Security** | Platform security | Application security |
| **Data** | Encryption at rest | Data classification |
| **Backup** | Platform backups | Application backups |

### Cloud Foundry vs Kyma Differences

| Aspect | Cloud Foundry | Kyma |
|--------|---------------|------|
| **Security Patches** | SAP provisions patched versions | Customer creates new Docker images |
| **Container Security** | SAP hardened defaults | Customer configures per K8s recommendations |
| **Custom Databases** | SAP backup support | Customer manages backups |
| **User Management** | Subaccount level | Subaccount + Kyma RBAC |

### Go-Live Checklist

1. **Deploy to Production**
   - Production environment configured
   - All services bound
   - Environment variables set

2. **Configure Access**
   - Business users provisioned
   - Role collections assigned
   - SSO configured

3. **Set Up Monitoring**
   - Application logging enabled
   - Health checks configured
   - Alerts set up

4. **Document**
   - Runbooks created
   - Support contacts identified
   - Escalation paths defined

---

## Data Protection

### GDPR Compliance

SAP BTP provides technical features for data protection:

| Feature | Purpose |
|---------|---------|
| **Audit Logging** | Track data access |
| **Change Logging** | Record modifications |
| **Data Deletion** | Support erasure requests |
| **Consent Management** | Manage user consent |

### Personal Data Guidelines

**Avoid Personal Data In**:
- Account names
- Database names
- Tenant identifiers
- Technical field names

**Proper Handling**:
- Classify data sensitivity
- Implement access controls
- Enable audit logging
- Document processing activities

### User Data Locations

| User Type | Storage Location |
|-----------|-----------------|
| Global Account Users | Platform IdP or Cloud Identity Services |
| Platform Users | Multiple IdPs possible |
| Business Users | Cloud Identity Services or custom IdP |

### Data Subject Requests

1. **Access Requests**: Use audit logs to identify data access
2. **Deletion Requests**: Use deletion APIs or manual processes
3. **Portability**: Export via APIs

---

## Operational Commands

### CF Application Operations

```bash
# Restart application
cf restart my-app

# Scale instances
cf scale my-app -i 3

# View app events
cf events my-app

# SSH for debugging
cf ssh my-app

# Check environment
cf env my-app
```

### Kyma Operations

```bash
# Restart deployment
kubectl rollout restart deployment/my-app -n my-namespace

# Scale deployment
kubectl scale deployment my-app --replicas=3 -n my-namespace

# View events
kubectl get events -n my-namespace --sort-by='.lastTimestamp'

# Check pod status
kubectl describe pod <pod-name> -n my-namespace
```

---

## Related Documentation

- Operations: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/50-administration-and-ops
- Audit Logging: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/50-administration-and-ops/audit-logging-in-the-cloud-foundry-environment-f92c86a.md
- Operating Model: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/70-getting-support
- Data Protection: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/60-security/data-protection-and-privacy-7e513d3.md
