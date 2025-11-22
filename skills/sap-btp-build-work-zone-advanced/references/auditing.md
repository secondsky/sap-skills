# Auditing and Logging Guide

Complete guide for auditing and logging in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## Overview

SAP Build Work Zone logs security events across multiple functional areas for compliance and troubleshooting purposes.

---

## Log Event Categories

### Assets

Tracks asset lifecycle events:
- Asset creation
- Asset modification
- Asset deletion
- Context changes
- Tenant changes
- Change details recorded

### CDM Store Service

Records data management events:
- Batch operations
- Data deletion
- Entity management
- Import operations
- Transport activities

### Content Package Manager

Logs content package lifecycle:
- Package installation
- Package upgrade
- Package uninstallation
- Tenant cleanup operations

### Content Repository

Monitors repository changes:
- Asset additions
- Asset removals

### OData Service

Security event logging:
- Unauthorized access attempts
- Access violations

### Provisioning Service

Documents provisioning events:
- Tenant offboarding operations

### Role Mapping

Tracks identity management:
- Role lifecycle management
- User lifecycle management
- Role assignments
- Role deletions
- User assignments

### Site Configuration & Storage

Records site changes:
- Configuration changes
- Site operations
- Settings modifications

### SPC Service

Logs provisioning tasks:
- Task creation
- Task deletion
- Status updates

### Work Zone HR Runtime Approuter

Captures security events:
- Origin validation failures
- HTTP method violations

---

## Log Entry Structure

Each log entry captures:

| Field | Description |
|-------|-------------|
| `by` | Trigger user (who made the change) |
| `tenant` | Tenant information |
| `timestamp` | Time of change |
| `operation` | Type and status of operation |
| `entity` | Entity identifiers and context |
| `old` | Before state (for modifications) |
| `new` | After state (for modifications) |
| `locale` | Locale information |

---

## Configuration Diff Logging

Configuration changes are logged with:
- Site diff information
- Instance identifiers
- Before/after configuration values
- Enables audit trail reconstruction

---

## Accessing Logs

### Administration Console

Location: Administration Console → Compliance & Security → Audit Reports

### Log Export

- Export audit data for analysis
- Configure log retention periods
- Filter by event type
- Filter by date range

---

## Compliance Features

### Content Administration

- Review flagged content
- Manage content reports
- Configure moderation rules

### Compliance Dictionary

- Define compliance terms
- Configure detection rules
- Manage violations

### Profanity Monitoring

- Enable profanity detection
- Configure word lists
- Review flagged content

---

## Best Practices

### Security Monitoring

1. Regularly review unauthorized access attempts
2. Monitor role assignment changes
3. Track configuration modifications
4. Set up alerts for critical events

### Compliance

1. Configure appropriate retention periods
2. Export logs for external analysis
3. Document access patterns
4. Review audit trails periodically

---

**Documentation Links**:
- Auditing: https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/auditing-and-logging
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced
