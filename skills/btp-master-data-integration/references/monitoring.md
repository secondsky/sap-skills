# Monitoring and Troubleshooting

Monitoring configuration and troubleshooting guidance for SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/tree/main/docs/monitoring-and-troubleshooting

## Business Data Orchestration Monitoring

### Overview
End-to-end monitoring of master data distribution across your landscape through SAP Cloud ALM integration.

### Three Monitoring Perspectives

| View | Name | Purpose |
|------|------|---------|
| Landscape | Monitor Master Data Distribution | All clients and connections graphically |
| Connection | Display Distribution Status | Status between specific client pairs |
| Object | Locate Object | Distribution status for single objects |

### Landscape View
- Displays all clients and connections graphically
- Colors indicate status: failed, warning, success
- Sizing represents object volume

### Connection View
- Status between specific client pairs
- Individual object distributions
- Filterable by status
- Detailed warning/error messages
- **Currently available view**

### Object View
- Single master data object status
- Shows involved systems
- Individual processing statuses

---

## Technical Architecture

### SAP Cloud ALM Integration

1. Clients report message processing as **SAP Passport Events** to SAP Cloud ALM
2. Events contain logging data on object processing status
3. Business Data Orchestration imports logging every **5 minutes**
4. Data aggregated into distribution status reports

### Key Distinction
- **SAP Cloud ALM**: Message-oriented technical monitoring
- **Business Data Orchestration**: Master data object oriented, distribution model-driven

---

## Configuration Requirements

### 1. Subscribe to SAP Cloud ALM

### 2. Register Clients
Enable SAP Passport Event acceptance for all participating clients.

### 3. Configure Mapping
Map between:
- Master Data Integration service instances
- SAP Cloud ALM services

**Documentation**: https://help.sap.com/docs/cloud-alm/setup-administration/business-data-orchestration

---

## Alerting

Use SAP Cloud ALM's **Integration & Exception Monitoring** for alerting functionality.

---

## Error Resolution

After issues resolve:
1. Identify failed object distribution
2. Use retriggering capability
3. Verify successful reprocessing

---

## Critical Recommendations

**Do NOT**:
- Disable SAP Passport Events in SAP Cloud ALM
- Filter SAP Passport Events

**Why**: Comprehensive monitoring requires complete event collection.

---

## REST Events (SAP Cloud ALM)

Events sent during REST API operations:

| Event | Description |
|-------|-------------|
| ExistingInstanceId | Entity with given instance ID already exists |
| EntityInstanceDoesNotExist | Entity with given instance ID does not exist |
| ValidationError | Validation error during processing |
| PatchFailed | Patch operation failed |
| InvalidPreviousVersionId | Invalid previous version ID |
| UpdateOrDeleteOnDeletedInstance | Instance deleted, no longer supports operations |
| UpdateOrDeleteOnReplacedInstance | Instance replaced, no longer supports operations |
| MergeOnDeletedInstance | Instance not replaced, cannot be merged |
| EntityInstanceReplacedByOtherInstance | Instance replaced by different instance |
| DecodeError | Instance could not be decoded |
| UnexpectedStateError | Unexpected state condition |
| UnknownEntity | Unrecognized entity type |
| ReplacedError | Could not replace an event |
| ReplacementCycle | Cyclic reference in replacements |
| InvalidLogicalKeys | Incorrect logical key structure |
| LocalIdError | LocalId operations malfunction |
| NormalizationFailed | Could not normalize event |
| PrimaryMasterDataEventTooLarge | Internal record size exceeds limits |
| UnknownTenant | Unknown system for request |

---

## SOAP Events (SAP Cloud ALM)

### Successful Operations
- BuPaConfirmationSent
- BuPaSent
- BuPaRelConfirmationSent
- BuPaRelSent
- KmConfirmationSent
- KmSent

### Confirmation Received
- BupaConfirmationReceivedSuccessful
- BuPaRelConfirmationReceivedSuccessful
- KmConfirmationReceivedSuccessful

### Send Failures
- BuPaSendFailed / BuPaRelSendFailed / KmSendFailed
- *DestinationNotFound variants
- *HttpsSchemeExpected variants
- *WrongSchemeConfigured variants

### Confirmation Failures
- BuPaConfirmationSendFailed
- BuPaRelConfirmationSendFailed
- KmConfirmationSendFailed
- *HttpsSchemeExpected variants
- *WrongSchemeConfigured variants

### Inbound Event
- BuPaDuplicateAddressId (only inbound event)

---

## Troubleshooting Workflow

### Step 1: Check Platform Status
Visit SAP Trust Center: https://www.sap.com/about/cloud-trust-center/cloud-status.html

### Step 2: Consult Guided Answers
Use SAP Guided Answers tool for troubleshooting scenarios:
https://ga.support.sap.com/dtp/viewer/index.html#/tree/3124/actions/48440

### Step 3: Contact Support
If problems persist, contact SAP Support.

**Support Component**: `BC-CP-CF-ONEMDS`

---

## Common Issues and Solutions

### Delta Token Expired

**Symptom**: Error response from Events API

**Cause**: Client not synchronized within 28 days

**Solution**: Perform initial load

---

### Change Request Rejected (Size)

**Symptom**: Request rejected

**Cause**: Payload exceeds size limit

**Limits**:
- Standard: 256 KB
- Business Partner: 512 KB

**Solution**: Reduce payload size, use patches for incremental updates

---

### Master Data Record Too Large

**Symptom**: Request rejected

**Cause**: Resulting record exceeds 512 KB

**Solution**: Multiple smaller change requests cannot exceed this limit when combined

---

### Invalid Change Token

**Symptom**: Request rejected

**Cause**: Token violates constraints

**Constraints**:
- Max 36 characters
- Characters: a-z, A-Z, 0-9, -, _
- Must be unique per request and client

**Solution**: Generate compliant tokens

---

### Destination Not Found

**Symptom**: *DestinationNotFound SOAP event

**Cause**: Destination not configured or misconfigured

**Solution**:
1. Verify destination exists in BTP Cockpit
2. Check naming convention: `{businessSystemId}_{purpose}`
3. Verify authentication configuration

---

### HTTPS Scheme Expected

**Symptom**: *HttpsSchemeExpected SOAP event

**Cause**: HTTP used instead of HTTPS

**Solution**: Update destination URL to HTTPS

---

### Missing Mandatory Partner Function

**Symptom**: "Mandatory partner function xx is missing for sales area"

**Cause**: C4C does not support reflexive partner functions

**Solution**: Upload partner determination configuration
- Template: SAP Note 2987243
- Endpoint: `/businesspartner/v0/configuration/ConfigurationUpload`

---

### Tenant Deletion Warning

**Symptom**: Error when deleting last service instance

**Cause**: Protection against accidental tenant deletion

**Solution**: Set `enableTenantDeletion: true` in update parameters

---

## Data Export Request

For personal data stored in MDI:
1. Open customer ticket
2. Component: `BC-CP-CF-ONEMDS`
3. Request data export

---

## Useful Resources

| Resource | URL |
|----------|-----|
| SAP Trust Center | https://www.sap.com/about/cloud-trust-center/ |
| Guided Answers | https://ga.support.sap.com/dtp/viewer/index.html |
| Support Portal | https://support.sap.com/ |
| Cloud ALM | https://help.sap.com/docs/cloud-alm |
| API Hub | https://api.sap.com |
