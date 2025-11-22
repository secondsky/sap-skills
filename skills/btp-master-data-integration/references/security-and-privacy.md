# Security and Data Privacy

Security guidelines, data protection, and privacy configurations for SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/tree/main/docs/security

## Security Guidelines

### Transport Layer Security
MDI relies on SAP BTP infrastructure with TLS protection for all connections.

### Credential Protection
- Store credentials securely at all times
- Credentials allow read/write access to company master data
- Rotate any compromised credentials immediately

### HTTPS Enforcement
All communications must use HTTPS:
- Client applications to MDI
- MDI to XSUAA
- Destination Service configurations
- Manual debugging requests

### Certificate Validation
- Always validate HTTPS certificates
- Never disable certificate validation
- Disabled validation allows credential interception and traffic monitoring

### Credential Rotation Process
When credentials are compromised:
1. Delete compromised service key from service instance
2. Generate new service key
3. Reconfigure clients with new credentials

### Security Incident Reporting
Report security issues through SAP Security Management portal.

---

## Authentication Methods

### OAuth2 Client Credentials (Default)
Binding-level client ID and client secret created automatically.

### XSUAA-managed Certificates
System generates private keys and certificates:

| Parameter | Default | Options |
|-----------|---------|---------|
| key-length | 2048 bytes | |
| validity-type | DAYS | DAYS, MONTHS, YEARS |
| validity | 7 days | |

```json
{
  "xsuaa": {
    "credential-type": "x509",
    "x509": {
      "key-length": 2048,
      "validity": 7,
      "validity-type": "DAYS"
    }
  }
}
```

**Important**: Authentication only works while certificate is valid. Renewal requires recreating service binding.

### Externally-managed Certificates
User-provided certificates with options:

| Parameter | Default | Description |
|-----------|---------|-------------|
| ensure-uniqueness | false | Enforce certificate uniqueness across instances |
| certificate-pinning | true | When false, allows simplified rotation by DN comparison |

### Token Endpoints
- Client credentials: `<uaa.url>/oauth/token`
- X.509: `<uaa.certurl>/oauth/token`

### Credential Update Process
1. Create new service binding
2. Update client configuration
3. Delete old service binding
4. Do NOT delete service instance (disconnects client)

---

## Business User Authentication

### Passcode Flow (Recommended)
1. Visit XSUAA URL passcode endpoint
2. Obtain code
3. Exchange via POST request with service instance credentials

### Password Flow
Direct authentication with username/password plus service instance credentials.

### Required Roles

| Role | Purpose |
|------|---------|
| BusinessConfigurationAdmin | Configuration tasks |
| ExtensionDeveloper | Extensibility tasks |

---

## Data Protection and Privacy

### SAP's Role
SAP provides compliance features but does not advise on best methods for specific organizations or regions.

### Key Principles
- Data protection involves legal requirements and privacy concerns
- Case-by-case assessment required
- SAP does not provide legal advice
- Compliance often extends beyond product features

### Integration with SAP Data Privacy Integration

**Supported Capabilities**:

| Capability | Objects | Integration |
|------------|---------|-------------|
| Blocking | Business Partner | Via SOAP API, SAP Data Retention Manager |
| Business Context Management | Workforce Person | Purpose recalculation, expiration identification |
| Information (reports/export) | **NOT SUPPORTED** | |

---

## Deletion of Master Data

### Retention and Lifecycle Management

Master data retention and deletion are **customer-configurable** via SAP Information Lifecycle Management (ILM) and Retention Management.

**Key Points**:
- Retention periods are defined by customer policy, not fixed by SAP
- Blocking and residence rules are set per customer requirements
- Delta token expiry depends on customer-configured retention settings
- Clients must perform full reload if retention settings result in token expiration

### General Master Data Deletion
1. Client triggers deletion through MDI
2. Service processes deletion per configured retention policy
3. Service notifies all downstream clients
4. Each client removes data from local systems per their retention settings

### Business Partner Deletion
Uses SAP Data Retention Manager with ILM controls:
- Triggered when personal data processing no longer required per policy
- Blocking requests initiate the deletion workflow
- SAP S/4HANA clients can initiate via Data Retention Manager
- Retention periods governed by ILM residence rules

### Client Disconnection
- Data not automatically removed when client disconnects
- Apply ILM/retention policies to manage data lifecycle
- Proactively identify and delete unneeded data per policy
- Consider impact on remaining connected clients

---

## Filtering

### Purpose
Controls which event information clients receive through LOG API.

### Configuration
Filters registered per client (service instance) in Cloud Foundry.

### Filter Levels
1. **Object-instance level**: Which records are replicated
2. **Data scope level**: Which parts of records are replicated

### Filter Behavior
- Activated filters apply to all following LOG API responses
- New include/exclude messages generated when visibility changes
- New filter automatically deactivates previous filter

### Distribution Models
Configure filters through Business Data Orchestration:
- Object Selection Filters
- Data Scope Filters

### Benefits
- Reduces unnecessary data traffic
- Prevents irrelevant data replication (e.g., customer data to non-sales units)
- Enables regional data boundaries

---

## Read Access Logging

Tracks access to sensitive personal data via SAP Audit Log service.

### Key Annotations

**@AuditLog.Operation**
Controls logging behavior for Read, Insert, Update, Delete operations.
- Read-access logging enabled by default when annotation absent
- Set `read: false` to disable

**@PersonalData.FieldSemantics**
When set to `DataSubjectID`:
- Attribute value identifies data subject in log entries
- Multiple annotated attributes all recorded
- Falls back to instance ID if attribute not transmitted

**@PersonalData.IsPotentiallySensitive**
- Marks attributes as sensitive personal data
- Attribute names appear in log entries
- **No log entry written if no attribute has this annotation**

### Activation Condition
Read-access logging activates only when:
- Attributes representing sensitive personal data
- Are actually exposed to downstream systems

---

## Data Export

For personal data export:
1. Open customer ticket
2. Component: `BC-CP-CF-ONEMDS`
3. Request data export

---

## Schema Validation

### What MDI Validates
- Data adherence to SAP One Domain Model integration models

### What MDI Does NOT Validate
- Referential integrity
- References within master data records pointing to existing records
- Code list entry validity

**Implication**: Organizations must independently verify cross-references.

---

## Security Best Practices Checklist

- [ ] Use HTTPS for all communications
- [ ] Validate certificates (never disable)
- [ ] Store credentials securely
- [ ] Grant minimal writePermissions
- [ ] Rotate compromised credentials immediately
- [ ] Separate MDI subaccounts from other services
- [ ] Configure read-access logging for sensitive data
- [ ] Implement proper filtering to limit data exposure
- [ ] Document data retention policies
- [ ] Establish deletion procedures for disconnecting clients
