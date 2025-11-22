# Complete Features Reference

Comprehensive feature documentation for SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/tree/main/docs/features

---

## Core Features

### 1. Synchronization of Master Data

MDI operates as a central master data hub where applications synchronize local databases with the central system.

**Synchronization Phases**:
1. **Initial Load**: Applications perform initial data transfer to populate local systems
2. **Delta Loads**: Ongoing synchronization through REST Events API with change notifications

**Key Characteristics**:
- One tenant typically serves all applications in a landscape
- REST APIs standard; SOAP APIs additionally available for business partners
- Delta loading eventually delivers same information for every application with identical filter settings

### 2. Support for Initial Loads

**Initial Upload (Producing Clients)**
Applications that create/modify master data load their local records into MDI as part of initial upload.

**Initial Download (Consuming Clients)**
Applications receive initial master data copy from centralized service without affecting existing integration scenarios.

**Key Benefit**: Eliminates need to integrate with multiple different applications in a landscape.

### 3. Distribution Models

Centralized repositories for distribution settings within Business Data Orchestration.

**Components**:
- Model name and language-dependent description
- Object type and version specification
- Reference to SAP One Domain Model

**Connectivity Options**:
- One provider with multiple consumers
- Multiple providers with one consumer
- **Recommended**: Always connect only one provider with one consumer

**Current Limitation**: Only ABAP-based systems (S/4HANA, SAP Cloud Master Data Governance) can act as provider.

### 4. Filtering

Two filter types control data replication:

| Filter Type | Purpose |
|------------|---------|
| Object Selection Filters | Determine which records are replicated |
| Data Scope Filters | Control which parts of records are replicated |

**Benefits**:
- Reduces unnecessary data traffic
- Prevents irrelevant data replication
- Enables regional data boundaries

---

## Local ID Sharing

MDI maintains ID maps between global and local IDs with bidirectional lookup capability.

### Three Core APIs

| API | Purpose |
|-----|---------|
| RequestsAPI | Write local IDs and associated context to MDI |
| EventsAPI | Receive distributed local IDs and associated context |
| KeyMappingAPI | Bidirectional lookup between local and global IDs |

**Benefit**: Destination applications can understand and respond to received information within their operational frameworks.

---

## Multiwriter Scenarios

When multiple clients have write access to the same master data type:

### Conflict Prevention Mechanisms

**Patches**
Send patches instead of full updates to preserve unrelated data modifications.

**Optimistic Locking**
- System tracks version identifiers
- Client includes previously known version ID in update
- MDI rejects update if version ID doesn't match current version
- Client retrieves updated info and resubmits

**SOAP Limitation**: SOAP APIs for Business Partner do NOT support version IDs or optimistic locking.

---

## Multiversion Support

Applications can use different compatible versions of SAP One Domain Model without disrupting integrations.

**Example**:
- Application A transmits in version 3.0.0
- Application B receives in version 2.1.1

**Requirements**:
- Works only between compatible versions
- No breaking changes (e.g., no field removals)

**Limitation**: BusinessPartner v3.3.0 and v2.1.1 have restricted multiversion support for address data.

---

## Extensibility

Add custom fields and nodes to integration models.

### Extension Types

| Type | Description |
|------|-------------|
| Field-Level | Primitive types: String, Boolean, Date, DateTime, Double, Time, Integer, Decimal, UUID |
| Node-Level | Composition with relationship definitions (one/many) |

### Key Rules
- Extensions valid across compatible ODM versions
- **Cannot be updated or deleted once created**
- SOAP extensions limited to BusinessPartner and BusinessPartnerRelationship
- SOAP namespace prefix must begin with `extns`

### Activation Statuses
- activationInProgress
- activated
- failed

---

## Schema Validation

### What MDI Validates
- Data adherence to SAP One Domain Model integration models

### What MDI Does NOT Validate
- Referential integrity
- References pointing to existing records
- Code list entry validity

---

## Monitoring

Business Data Orchestration provides end-to-end monitoring via SAP Cloud ALM integration.

### Three Monitoring Views

| View | Purpose |
|------|---------|
| Landscape (Monitor Master Data Distribution) | All clients and connections graphically |
| Connection (Display Distribution Status) | Status between specific client pairs |
| Object (Locate Object) | Single object distribution status |

**Currently Available**: Connection view only

### Technical Architecture
1. Clients report SAP Passport Events to SAP Cloud ALM
2. BDO imports logging every 5 minutes
3. Data aggregated into distribution status reports

---

## REST Events (Complete List)

Events sent to SAP Cloud ALM during REST API operations:

| Event Code | Description | Details |
|------------|-------------|---------|
| ExistingInstanceId | Entity with given instance ID already exists | `[{id: instanceId}]` |
| EntityInstanceDoesNotExist | Entity with given instance ID does not exist | `[{id: instanceId}]` |
| ValidationError | Validation error during processing | `[{ValidationError: error message}]` |
| PatchFailed | Patch operation failed | `[{PatchFailed: error message}]` |
| InvalidPreviousVersionId | Invalid previous version ID | `[{id: instanceId}]` |
| UpdateOrDeleteOnDeletedInstance | Instance deleted, no longer supports operations | - |
| UpdateOrDeleteOnReplacedInstance | Instance replaced, no longer supports operations | - |
| MergeOnDeletedInstance | Instance not replaced, cannot be merged | `[{id: instanceId}]` |
| EntityInstanceReplacedByOtherInstance | Instance replaced by different instance | `[{id: instanceId},{replacedBy: instanceId}]` |
| DecodeError | Instance could not be decoded properly | - |
| UnexpectedStateError | Unexpected state condition | - |
| UnknownEntity | Unrecognized entity type | - |
| ReplacedError | Could not replace an event | `[{ReplacedFailure: error message}]` |
| ReplacementCycle | Cyclic references in replacedBy | - |
| InvalidLogicalKeys | Incorrect logical key structure | - |
| LocalIdError | LocalId operations malfunction | `{context, localId, status}` |
| NormalizationFailed | Could not normalize event | `[{NormalizationFailure: error message}]` |
| PrimaryMasterDataEventTooLarge | Internal record size exceeds limits | - |
| UnknownTenant | Unknown system for request | - |

---

## SOAP Events (Complete List)

### Inbound Event (1)
| Code | Description |
|------|-------------|
| BuPaDuplicateAddressId | Business Partner with given Address ID already exists |

### Outbound Success Events (6)
| Code | Description |
|------|-------------|
| BuPaSent | BusinessPartner successfully sent to destination |
| BuPaRelSent | BusinessPartnerRelationship successfully sent |
| KmSent | KeyMapping successfully sent |
| BuPaConfirmationSent | BusinessPartner confirmation sent |
| BuPaRelConfirmationSent | BusinessPartnerRelationship confirmation sent |
| KmConfirmationSent | KeyMapping confirmation sent |

### Confirmation Received Events (3)
| Code | Description |
|------|-------------|
| BupaConfirmationReceivedSuccessful | BusinessPartner confirmation processed successfully |
| BuPaRelConfirmationReceivedSuccessful | BusinessPartnerRelationship confirmation processed |
| KmConfirmationReceivedSuccessful | KeyMapping confirmation processed |

### Send Failure Events (9)
| Code | Description |
|------|-------------|
| BuPaSendFailed | Failed BusinessPartner transmission |
| BuPaRelSendFailed | Failed BusinessPartnerRelationship transmission |
| KmSendFailed | Failed KeyMapping transmission |
| BuPaSendFailedDestinationNotFound | Destination not configured |
| BuPaRelSendFailedDestinationNotFound | Destination not configured |
| KmSendFailedDestinationNotFound | Destination not configured |
| BuPaSendFailedHttpsSchemeExpected | HTTPS required (Internet ProxyType) |
| BuPaRelSendFailedHttpsSchemeExpected | HTTPS required (Internet ProxyType) |
| KmSendFailedHttpsSchemeExpected | HTTPS required (Internet ProxyType) |

### Wrong Scheme Configuration Events (6)
| Code | Description |
|------|-------------|
| BuPaSendFailedWrongSchemeConfigured | HTTP/HTTPS required (OnPremise ProxyType) |
| BuPaRelSendFailedWrongSchemeConfigured | HTTP/HTTPS required (OnPremise ProxyType) |
| KmSendFailedWrongSchemeConfigured | HTTP/HTTPS required (OnPremise ProxyType) |
| BuPaConfirmationFailedWrongSchemeConfigured | Wrong scheme for confirmation |
| BuPaRelConfirmationFailedWrongSchemeConfigured | Wrong scheme for confirmation |
| KmConfirmationFailedWrongSchemeConfigured | Wrong scheme for confirmation |

### Confirmation Send Failure Events (6)
| Code | Description |
|------|-------------|
| BuPaConfirmationSendFailed | Failed to send confirmation |
| BuPaRelConfirmationSendFailed | Failed to send confirmation |
| KmConfirmationSendFailed | Failed to send confirmation |
| BuPaConfirmationSendFailedHttpsSchemeExpected | HTTPS required for confirmation |
| BuPaRelConfirmationFailedHttpsSchemeExpected | HTTPS required for confirmation |
| KmConfirmationFailedHttpsSchemeExpected | HTTPS required for confirmation |

---

## SAP Data Privacy Integration

### Supported Capabilities

| Capability | Supported Objects | Description |
|------------|-------------------|-------------|
| Blocking | Business Partner (SOAP) | Maintain rules and trigger deletion when end of purpose reached. Uses SAP Data Retention Manager. |
| Business Context Management | Workforce Person only | Define business context, tag data with purpose, recalculate purpose during transfers |
| Information (reports/export) | **NOT SUPPORTED** | Generate reports, export data, trigger corrections |

---

## Read Access Logging

Tracks access to sensitive personal data via SAP Audit Log service.

### Key Annotations

| Annotation | Purpose |
|------------|---------|
| @AuditLog.Operation | Controls logging (Read, Insert, Update, Delete) |
| @PersonalData.FieldSemantics | When 'DataSubjectID', identifies data subject in logs |
| @PersonalData.IsPotentiallySensitive | Marks sensitive attributes for logging |

**Activation**: Only when sensitive personal data attributes are exposed to downstream systems.

---

## SOAP API for Business Partners

Compatible applications:
- SAP S/4HANA Cloud (public edition)
- SAP S/4HANA (on-premise)
- SAP Cloud for Customer
- SAP Marketing Cloud
- SAP Field Service Management
- SAP Configure Price Quote
- SAP Subscription Billing

*List is not exhaustive*

---

## Availability in Kingdom of Saudi Arabia

SAP Master Data Integration service (including SAP Master Data Orchestration) is available in the Kingdom of Saudi Arabia region.

---

## Documentation Links

- **Features**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/features
- **Distribution Models**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/distribution-models
- **Monitoring**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/monitoring
