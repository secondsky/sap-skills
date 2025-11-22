# Operations & Monitoring - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Operations
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Monitoring Overview](#monitoring-overview)
2. [Message Monitoring](#message-monitoring)
3. [Integration Content Management](#integration-content-management)
4. [Store Management](#store-management)
5. [Security Material Operations](#security-material-operations)
6. [Connectivity Testing](#connectivity-testing)
7. [Logging and Tracing](#logging-and-tracing)
8. [Alerting](#alerting)

---

## Monitoring Overview

The Integration Suite Monitor provides visibility into message processing, deployed content, and system health.

### Monitor Areas

```
Monitor → Integrations and APIs
    ├── Monitor Message Processing
    │   ├── All Integration Flows
    │   ├── All Artifacts
    │   └── Failed Messages
    ├── Manage Integration Content
    │   └── Deployed artifacts
    ├── Manage Security
    │   ├── Keystore
    │   ├── User Credentials
    │   ├── OAuth Credentials
    │   └── Known Hosts
    └── Manage Stores
        ├── Data Stores
        ├── Variables
        ├── Message Queues
        └── Number Ranges
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/operating-and-monitoring-cloud-integration-c401afc.md

---

## Message Monitoring

### Filtering Messages

| Filter | Options |
|--------|---------|
| Time | Past Minute, Hour, 24h, Week, Month, Custom |
| Status | Failed, Retry, Completed, Processing, Escalated, Cancelled, Discarded |
| Artifact | Integration Flow, OData API, SOAP API, REST API |
| ID | Message ID, Correlation ID |

### Message Status Types

| Status | Description | Action |
|--------|-------------|--------|
| **Completed** | Successfully processed | None needed |
| **Failed** | Processing error | Investigate error |
| **Retry** | Retry scheduled | Monitor retry |
| **Escalated** | Max retries exceeded | Manual intervention |
| **Processing** | Currently running | Wait for completion |
| **Cancelled** | Manually cancelled | Review if needed |
| **Discarded** | Intentionally dropped | Review discard reason |
| **Abandoned** | System cleanup | Review timeout settings |

### Message Details

| Section | Information |
|---------|-------------|
| Status | Processing time, error messages |
| Properties | Message ID, Correlation ID, Sender, Receiver |
| Custom Headers | User-defined properties |
| Logs | Log entries with levels |
| Attachments | MPL attachments (text, XML, etc.) |
| Artifact | Flow name, ID, package link |

### Error Analysis

1. **Open failed message** in monitor
2. **Review error message** in Status section
3. **Check logs** for detailed trace
4. **View attachments** for payload at failure
5. **Navigate to artifact** to review configuration

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/monitor-message-processing-314df3f.md

---

## Integration Content Management

### Deployed Artifacts View

| Information | Description |
|-------------|-------------|
| Artifact Name | Integration flow name |
| Status | Started, Error, Starting |
| Deployed On | Deployment timestamp |
| Deployed By | User who deployed |
| Version | Artifact version |

### Artifact Status Types

| Status | Description |
|--------|-------------|
| Started | Running successfully |
| Starting | Deployment in progress |
| Error | Deployment failed |
| Stopping | Being undeployed |

### Artifact Operations

| Operation | Description |
|-----------|-------------|
| Undeploy | Remove from runtime |
| Restart | Stop and start |
| Download | Get deployed artifact |
| Navigate | Go to design view |

### Endpoints

View endpoints for deployed artifacts:
- Sender endpoints (inbound URLs)
- Configured protocols
- Authentication requirements

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/manage-integration-content-09a7223.md

---

## Store Management

### Data Stores

Persistent storage for messages and variables.

**Operations**:
| Action | Description |
|--------|-------------|
| View entries | Browse stored data |
| Delete entry | Remove specific entry |
| Delete all | Clear entire store |
| Download | Export entry content |

**Monitoring Metrics**:
- Entry count
- Storage usage
- Overdue entries
- Last modified

### Variables

Runtime variables across integration flows.

**Types**:
| Type | Scope |
|------|-------|
| Local Variable | Single flow |
| Global Variable | Entire tenant |

**Operations**:
- View current values
- Download values
- Delete variables

### Message Queues

JMS queue management.

**Monitoring**:
- Queue depth (message count)
- Consumer count
- Dead letter messages

**Operations**:
| Action | Description |
|--------|-------------|
| Retry messages | Reprocess dead letters |
| Delete messages | Remove from queue |
| Move messages | Transfer between queues |

### Number Ranges

Unique identifier generation.

**Management**:
- View current values
- Reset counters
- Delete ranges

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/manage-stores-59f8e3a.md

---

## Security Material Operations

### Keystore Management

**View Operations**:
- List all entries
- View certificate details
- Check expiration dates

**Management Operations**:
| Operation | Description |
|-----------|-------------|
| Add Certificate | Import public certificate |
| Add Key Pair | Import private key + certificate |
| Rename Alias | Change entry name |
| Delete Entry | Remove from keystore |
| Download | Export certificate/keystore |

**Backup Operations**:
- Backup individual entries
- Restore from backup
- View backup history

### User Credentials

**Management**:
- Deploy new credentials
- Update existing credentials
- Delete credentials
- View deployment status

### OAuth Credentials

**Types Supported**:
- Client Credentials
- Authorization Code
- SAML Bearer Assertion

**Management**:
- Deploy OAuth configurations
- Update token settings
- Monitor token refresh

### Known Hosts (SSH)

**For SFTP connections**:
- Add known hosts
- Update host keys
- Remove hosts

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/manage-security-6e7c44c.md

---

## Connectivity Testing

### Test Types

| Test | Purpose |
|------|---------|
| TLS | Test HTTPS connectivity |
| SSH | Test SFTP connectivity |
| AMQP | Test message broker |
| Kafka | Test Kafka connectivity |
| Cloud Connector | Test on-premise access |
| FTP | Test FTP connectivity |
| IMAP | Test mail (receive) |
| POP3 | Test mail (receive) |
| SMTP | Test mail (send) |

### Running Connectivity Tests

1. **Navigate** to Monitor → Connectivity Tests
2. **Select** test type
3. **Enter** connection parameters
4. **Execute** test
5. **Review** results

### Test Parameters

| Parameter | Description |
|-----------|-------------|
| Host | Target hostname |
| Port | Target port |
| Authentication | Credentials type |
| Timeout | Connection timeout |

### Interpreting Results

| Result | Meaning |
|--------|---------|
| Success | Connection established |
| Authentication Failed | Wrong credentials |
| Connection Refused | Firewall/service down |
| Timeout | Network/routing issue |
| Certificate Error | TLS/SSL problem |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/performing-connectivity-tests-d5b2fae.md

---

## Logging and Tracing

### Log Levels

| Level | Information | Use Case |
|-------|-------------|----------|
| None | No logging | Production (minimal) |
| Error | Errors only | Production (standard) |
| Info | Key operations | Development |
| Debug | Detailed info | Troubleshooting |
| Trace | Full payload | Deep debugging |

### Setting Log Levels

**Per Artifact**:
1. Navigate to deployed artifact
2. Select Log Configuration
3. Set desired level
4. Apply changes

**Considerations**:
- Trace captures sensitive data
- Higher levels impact performance
- Revert after debugging

### Tracing Integration Flows

1. **Enable trace** on artifact
2. **Send test message**
3. **Open message** in monitor
4. **View trace details**:
   - Step-by-step execution
   - Payload at each step
   - Header values
   - Property values

### System Logs

**Access Methods**:
- Cloud Foundry logs via CLI
- Kibana (if configured)
- External logging services

**CF CLI Commands**:
```bash
cf logs <app-name> --recent
cf logs <app-name>  # streaming
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/setting-log-levels-4e6d3fc.md

---

## Alerting

### Alert Types

| Alert | Description |
|-------|-------------|
| Message Failed | Processing error |
| Certificate Expiring | Certificate near expiry |
| Queue Full | JMS queue at capacity |
| Deployment Failed | Artifact deployment error |

### Alert Configuration

**SAP Alert Notification Service**:
1. Subscribe to Alert Notification
2. Configure alert channels (email, webhook)
3. Set up alert rules
4. Define recipients

### External Monitoring Integration

**SAP Cloud ALM**:
- Central monitoring dashboard
- Cross-system visibility
- SLA monitoring

**Third-Party Tools**:
- Splunk (via external logging)
- Datadog
- New Relic

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/alerting-fe8c67d.md

---

## Resource Inspection

### Inspect Views

| View | Information |
|------|-------------|
| Data Store Usage | Storage consumption |
| Database Connections | Connection pool usage |
| Transaction Duration | Long-running transactions |
| Message Processing Logs | Log storage usage |

### Identifying Issues

**High Data Store Usage**:
- Review retention policies
- Clean up old entries
- Optimize store usage

**Connection Pool Exhaustion**:
- Identify leaking flows
- Optimize connection handling
- Increase pool if needed

**Long Transactions**:
- Review flow design
- Optimize database operations
- Consider async processing

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/inspect-a4d5e49.md

---

## Best Practices

### Monitoring

1. **Set up alerts** for failed messages
2. **Review daily** message processing stats
3. **Monitor certificate** expiration (30-day warning)
4. **Track resource** utilization trends

### Operations

1. **Schedule maintenance** windows
2. **Document procedures** for common tasks
3. **Automate** routine operations via APIs
4. **Test connectivity** after network changes

### Troubleshooting

1. **Start with logs** - check message processing log
2. **Enable trace** temporarily for debugging
3. **Test connectivity** to isolate issues
4. **Review recent changes** for root cause

---

## Related Documentation

- **Operating CI**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/operating-and-monitoring-cloud-integration-c401afc.md
- **Message Monitoring**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/monitor-message-processing-314df3f.md
- **Manage Security**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/manage-security-6e7c44c.md
- **Manage Stores**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/manage-stores-59f8e3a.md
- **Connectivity Tests**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/performing-connectivity-tests-d5b2fae.md
