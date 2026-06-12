# Identity Provisioning (IPS) — Complete Reference

**Source**: [Configuring Provisioning Systems](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configuring-provisioning-systems), [SAP Cloud Identity Services Operation Guide](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/operation-guide)

---

## Overview

Identity Provisioning (IPS) synchronizes users and groups between SAP and non-SAP systems. It supports source, target, and proxy system types, with configurable transformations, scheduling, and real-time provisioning.

---

## System Types

### Source Systems

Source systems read entities (users, groups, roles) from an identity provider. Supported source systems include:

- SAP SuccessFactors
- SAP S/4HANA Cloud
- SAP Analytics Cloud
- SAP BTP (XSUAA/IAS)
- Microsoft Entra ID (Azure AD)
- Okta
- LDAP directories
- SAP Identity Management 8.0
- Custom SCIM systems

### Target Systems

Target systems write entities to an identity consumer. Supported target systems include:

- SAP Cloud Identity Services (IAS tenant)
- SAP BTP XSUAA subaccounts
- SAP Analytics Cloud
- SAP SuccessFactors
- SAP S/4HANA Cloud
- Microsoft Entra ID
- Custom SCIM systems

### Proxy Systems

Proxy systems enable hybrid scenarios where IPS reads from one system and writes through another. Use cases:
- On-premise system connectivity through Cloud Connector
- Multi-hop provisioning chains

---

## Configuration

### Adding a System

1. Sign in to the IAS administration console
2. Navigate to **Identity Provisioning** section
3. Choose **Add System**
4. Select system type (Source, Target, or Proxy)
5. Choose the connector (e.g., SAP SuccessFactors, Azure AD)
6. Configure properties (host URL, authentication, credentials)
7. Optionally configure transformations
8. Save

### System Properties

Each system has key-value properties that control behavior:

| Property | Purpose |
|----------|---------|
| `ips.sql.condition` | Filter entities (SQL-like WHERE clause) |
| `ips.trace.failed.entity.requests` | Enable detailed logging for failures |
| `ips.max.retry.count` | Retry count for failed operations |
| `ips.delete.existed.before` | Delete target entities before full sync |
| `ips.skip.deactivation` | Skip user deactivation during provisioning |

*Source: [Manage Properties](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/manage-properties)*

### Transformations

Transformations map attributes between source and target schemas. IPS provides a graphical editor and a JSON text editor.

Transformation example (simplified):

```json
{
  "user": {
    "mappings": [
      {
        "sourcePath": "$.userName",
        "targetPath": "$.userName"
      },
      {
        "sourcePath": "$.name.givenName",
        "targetPath": "$.name.givenName"
      },
      {
        "sourcePath": "$.emails[0].value",
        "targetPath": "$.emails[0].value"
      },
      {
        "constant": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
        "targetPath": "$.schemas[1]"
      }
    ]
  }
}
```

*Source: [Manage Transformations](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/manage-transformations)*

---

## Provisioning Jobs

### Full Read

The default mode. Reads all entities from the source and syncs to the target. Prevents data loss but may be slow for large systems.

### Delta Read

Reads only changed entities since the last run. Faster but requires source system support for change tracking.

### Starting a Job

Jobs can be started:
- **Manually** — from the IPS admin console or via API
- **Scheduled** — configured as recurring jobs

API example:
```
POST /ips/rest/v1/tenants/{tenantId}/jobs/run
{
  "sourceSystemId": "source-id",
  "targetSystemId": "target-id",
  "readMode": "FULL"
}
```

*Source: [Start and Stop Provisioning Jobs](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/start-and-stop-provisioning-jobs)*

---

## Real-Time Provisioning

Real-time provisioning immediately propagates entity changes from source to target without waiting for a scheduled job.

Enable per-source system in the IPS admin console under the system's real-time provisioning settings.

Requirements:
- Source system must support change notifications
- The Identity Directory must be configured as a target

*Source: [Configuring Real-Time Provisioning](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/real-time-provisioning)*

---

## Deleted Entity Management

IPS handles entity deletion with configurable behavior:

- **Delete in target** — when an entity is deleted from the source, it is deleted from the target
- **Deactivate in target** — entity is deactivated rather than deleted
- **Ignore** — source deletions are not propagated

Configure via system properties or the **Manage Deleted Entities** option in the console.

---

## Certificates

IPS supports certificate-based authentication for secure communication with provisioning systems. Manage certificates in the IPS admin console:

- Upload X.509 certificates for systems requiring mutual TLS
- Configure certificate rotation
- Monitor certificate expiration

*Source: [Manage Certificates](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/manage-certificates)*

---

## Troubleshooting Provisioning

| Issue | Cause | Solution |
|-------|-------|----------|
| Job fails to start | Invalid system properties | Verify host URL, credentials, and connectivity |
| Partial sync | Rate limits on target | Configure `ips.max.retry.count`; use delta read |
| Missing users in target | Filter too restrictive | Review `ips.sql.condition` on source system |
| Duplicate users | Missing unique identifier mapping | Add `userName` or `externalId` to transformation |
| Transformation error | Invalid JSON or wrong path | Use the graphical editor to validate mappings |
| Certificate expired | TLS handshake failure | Rotate certificates in Manage Certificates |
| Connector version outdated | API changes | Update connector version in system settings |

*Source: [Handle Failed Operations](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/handle-failed-operations)*
