# SOAP API Reference

Complete reference for SOAP-based integrations with SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/btp-master-data-integration/tree/main/docs/development

## Endpoint Base URL

```
https://one-mds.cfapps.{region}.hana.ondemand.com/businesspartner/v0/soap/
```

Regions: eu10, us10, ap10, ap11

## Authentication Methods

### Basic Authentication
```
Username: clientid
Password: clientsecret
URL Param: ?tenantId=<identityzone>
```

Example:
```
https://one-mds.cfapps.eu10.hana.ondemand.com:443/businesspartner/v0/soap/BusinessPartnerBulkReplicateRequestIn?tenantId=<identityzone>
```

### OAuth Authentication
Use bearer token from XSUAA service.

## Available Endpoints

All endpoints use HTTP POST:

| Endpoint | Purpose |
|----------|---------|
| BusinessPartnerBulkReplicateRequestIn | BP inbound replication |
| BusinessPartnerBulkReplicateRequestConfIn | BP confirmation inbound |
| BusinessPartnerRelationshipBulkReplicateRequestIn | BP relationship inbound |
| BusinessPartnerRelationshipBulkReplicateRequestConfirmIn | BP relationship confirmation |
| KeyMappingBulkReplicateRequestIn | Key mapping inbound |
| KeyMappingBulkReplicateRequestConfirmIn | Key mapping confirmation |

**HEAD Request Support**: SOAP endpoints support HEAD requests for connectivity verification with SOAMANAGER.

---

## Business Partner Replication Service

**Service Name**: `BusinessPartnerSUITEBulkReplicateRequest_In`

### Service Nodes

| Node | Description |
|------|-------------|
| BusinessPartner | Core partner identity and classification |
| Person | Natural person demographic details |
| Organization | Legal entity attributes |
| Identification | ID documents and credentials |
| BankDetails | Payment account information |
| TaxNumber | Tax identification records |
| Role | Functional business assignments |
| Business Partner Group | Multi-entity groupings |
| Address Data | Contact and location details |
| Customer | Sales and account parameters |
| Supplier | Procurement specifications |

### Key BusinessPartner Node Fields

| Field | Description |
|-------|-------------|
| UUID | System identifier in receiver (optional) |
| CategoryCode | Partner classification (organization/person/group) |
| BlockedIndicator | Central blocking status |
| ReleasedIndicator | Business process eligibility |

### Address Data Includes
- Postal addresses (street, city, postal code)
- Communication channels (phone, email, fax, web)
- Validity periods for each contact method

### Customer Information Contains
- Account group and corporate grouping
- Sales/billing/delivery blocking reasons
- Tax classifications and industry codes
- Condition groups (up to 5 variants)

### Mandatory Fields
- BankAccountID (bank details)
- ID (bank account identifier)

---

## Business Partner Relationship Service

**Service Name**: `BusinessPartnerRelationshipSUITEBulkReplicateRequest_In`

### Service Nodes

**BusinessPartnerRelationship**
- Role codes characterizing relationship features
- Validity periods
- UUID references
- Default indicators

**ContactPerson**
- Workplace addresses
- Communications
- Functional roles

### Supported Identifiers

| ID Type | Supported |
|---------|-----------|
| Business Partner UUID | Yes |
| Business Partner Internal ID | Yes |
| Relationship Business Partner UUID | Yes |
| Relationship Business Partner Internal ID | Yes |
| Receiver Business Partner UUID | Yes |
| Receiver Business Partner Internal ID | Yes |
| Receiver Relationship BP UUID | Yes |
| Receiver Relationship BP Internal ID | Yes |
| IAM ID | No |
| External ID | No |

---

## Key Mapping Service

**Service Name**: `KeyMappingBulkReplicateRequest_In`

### Key Parameters

| Parameter | Description |
|-----------|-------------|
| BusinessSystemID | Source system identifier |
| TypeCode | Business object type (147=BP, 197=material) |
| ObjectIdentifierSet | Collection of object identifiers |
| ObjectIdentifier | Type code + key value combination |
| DefiningSchemeCode | Object Identifier Type Code (OITC) |
| KeyValue | ID value defined in target system |
| changeOrdinalNumber | Sequencing for incremental updates |
| actionCode | create/change/remove operations |

### IAM ID Support
Use DefiningSchemaCode value `CDC_IAM_ID` for IAM ID.

---

## Confirmation Services

### Business Partner Confirmation
**Service Name**: `BusinessPartnerSUITEBulkReplicateConfirmation_In`

### Nodes
- **BusinessPartner**: UUID, InternalID, ReceiverUUID, ExternalID, ReceiverInternalID
- **Customer**: InternalID, ReceiverInternalID
- **Supplier**: InternalID, ReceiverInternalID

All parameters optional.

### BP Relationship Confirmation
**Service Name**: `BusinessPartnerRelationshipSUITEBulkReplicateConfirmation_In`

### Key Mapping Confirmation
**Service Name**: `KeyMappingBulkReplicateConfirmation_In`

**MappingGroup Parameters**: BusinessSystemID, TypeCode, ObjectIdentifierSet, ObjectIdentifier, DefiningSchemeCode, KeyValue

---

## Partial Data Handling

Prevents data loss during SOAP outbound processing to S/4HANA or MDG.

### Protected Scenarios

| Scenario | Protection |
|----------|------------|
| Limited Entity Support | Unsupported entities not overwritten |
| Reduced Attribute Scope | Partial attributes preserved |
| Incomplete Entity Instances | Missing instances not deleted |
| Unsupported Roles | Role-specific data preserved |

### Configuration Requirements
- Maintain exclude-filters on connected system
- Maintain include-filters on connected system
- Reference SAP Notes: 2659038, 2733112, 3087667

---

## Destination Configuration

### Naming Convention

For businessSystemId `SYSTEMID`:

| Destination Name | Purpose |
|-----------------|---------|
| SYSTEMID_BPOUTBOUND | Business Partner replication |
| SYSTEMID_BPCONFIRM | Business Partner confirmation |
| SYSTEMID_BPRELOUTBOUND | Relationship replication |
| SYSTEMID_BPRELCONFIRM | Relationship confirmation |
| SYSTEMID_KMOUTBOUND | Key Mapping replication |
| SYSTEMID_KEYMAPCONFIRM | Key Mapping confirmation |

### Destination Settings

| Property | Value |
|----------|-------|
| Type | HTTP |
| Authentication | OAuth2, Basic, or Client Certificate |

### URL Sources

**S/4HANA Cloud**: Inbound services URL from SAP_COM_0008 communication arrangement

**S/4HANA On-Premise**: Hostname + Calculated Access URL from SOAManager

### Limit
Maximum 6 destinations per unique client connection.

---

## SOAP Events (SAP Cloud ALM)

### Successful Operations
- BuPaConfirmationSent
- BuPaSent
- BuPaRelConfirmationSent
- BuPaRelSent
- KmConfirmationSent
- KmSent

### Send Failures
- BuPaSendFailed / BuPaRelSendFailed / KmSendFailed
- BuPaSendFailedDestinationNotFound
- BuPaSendFailedHttpsSchemeExpected
- BuPaSendFailedWrongSchemeConfigured

### Confirmation Failures
- BuPaConfirmationSendFailed
- BuPaConfirmationSendFailedHttpsSchemeExpected
- BuPaConfirmationFailedWrongSchemeConfigured

### Inbound Events
- BuPaDuplicateAddressId (only inbound event)

### Confirmation Received
- BupaConfirmationReceivedSuccessful
- BuPaRelConfirmationReceivedSuccessful
- KmConfirmationReceivedSuccessful

---

## Distribution Model Configuration (SOAP)

### Constraints
- BP Relationship model requires active Business Partner model
- Cannot deactivate BP model if active BP Relationship model exists

### Configuration Steps

1. Navigate to Master Data Integration (Orchestration)
2. Access Fiori Launchpad → Manage Distribution Model
3. Create model: Provider = SAP Master Data Integration
4. Set consumer = businessSystemId
5. Select Business Object Type: `sap.odm.businesspartner.BusinessPartner`
6. Set Package Size (max recommended: 50)
7. Select API: `MDI_SOAP_BUSINESS_PARTNER`
8. Configure scheduling

### Available Filters
- Authorization groups
- Country codes
- Customer information
- Supplier details

---

## API Documentation

**SAP Business Accelerator Hub**: https://api.sap.com (filter: SAP Master Data Integration)

Note: Hub specifications are not tenant-specific and exclude custom extensions.

---

## Detailed Business Partner Service Nodes

### 1. BusinessPartner Node (Core)

| Field | Description | Necessity |
|-------|-------------|-----------|
| UUID | System identifier in receiver (empty on first replication) | Optional |
| CategoryCode | Organization/Natural person/Group classification | Optional |
| BlockedIndicator | Central blocking status | Optional |
| ReleasedIndicator | Business process eligibility | Optional |
| AuthorizationGroup | Authorization group assignment | Optional |
| ContactPermission | Contact permission controls | Optional |

### 2. Person Node (Natural Persons)

**Demographics**:
- Gender, Nationality, BirthDate, BirthPlace, DeathDate

**Communication Preferences**:
- VerbalCommunicationLanguageCode, WrittenCommunicationLanguageCode

**Personal Details**:
- MaritalStatus, Employer, Occupation

**Name Components**:
- GivenName, FamilyName, MiddleName, NickName, BirthName
- AcademicTitle, Prefix, Suffix (multiple supported)

### 3. Organization Node (Legal Entities)

| Field | Description |
|-------|-------------|
| FoundationDate | Date of establishment |
| LiquidationDate | Date of dissolution |
| LegalFormCode | Legal form classification |
| GlobalLocationNumber | GLN identifier |
| Name1-4 | Multi-line name fields |
| IndustrySector | Industry with classification system codes |

### 4. Identification Node

| Field | Description | Necessity |
|-------|-------------|-----------|
| IDNumber | Identification number | Optional |
| IDTypeCode | Type classification | Optional |
| EntryDate | Date of entry | Optional |
| ValidityStartDate/EndDate | Validity period | Optional |
| CountryCode | Geographic validity | Optional |
| RegionCode | Regional validity | Optional |
| IssuingAuthority | Authority reference | Optional |

### 5. BankDetails Node

| Field | Description | Necessity |
|-------|-------------|-----------|
| BankAccountID | Bank account identifier | **Mandatory** |
| ID | Account ID | **Mandatory** |
| CountryCode | Bank country | Optional |
| BankRoutingID | Routing number | Optional |
| IBAN | International bank account number | Optional |
| AccountHolderName | Name on account | Optional |
| ValidityStartDate/EndDate | Validity period | Optional |

### 6. TaxNumber Node

| Field | Description |
|-------|-------------|
| TaxIDNumber | Tax identification number |
| TaxNumberTypeCode | Type categorization |
| Multiple tax numbers supported per entity |

### 7. Role Node

| Field | Description |
|-------|-------------|
| RoleCode | Business function assignment |
| ValidityStartDate | Role start date |
| ValidityEndDate | Role end date |
| Multiple concurrent roles supported |

### 8. Business Partner Group Node

| Field | Description |
|-------|-------------|
| GroupTypeCode | Group type classification |
| PrimaryGroupName | Primary group identifier |
| SecondaryGroupName | Secondary group identifier |
| FormOfAddress | Address form specification |

### 9. Address Data Node (Comprehensive)

**Communication Elements**:

| Element | Fields |
|---------|--------|
| Email | Address, ValidityStartDate/EndDate, DefaultIndicator |
| Phone | CountryCode, SubscriberID, Extension, SMSCapability |
| Fax | CountryCode, DialingCode, Number |
| Website | URI, URITypeCode |
| Preferences | CommunicationLanguageCode, CommunicationMedium |

**Postal Components**:

| Category | Fields |
|----------|--------|
| Street | StreetName, StreetPrefix, StreetSuffix |
| Building | HouseNumber, HouseNumberSupplement, Building, Floor, RoomNumber |
| Postal | PostalCode (Street), POBoxPostalCode |
| Location | City, Region, County, District, CountryCode |
| Additional | CareOfName, TimeZone, TaxJurisdiction, TransportationZone |

**PO Box Address**:
- POBox, POBoxDeviatingCity, POBoxDeviatingRegion
- POBoxDeviatingCountry, DeliveryServiceType

**Script Variants**:
- AddressRepresentationCode (different character sets)

**Priority Rule**: When both CompanyPostalCode and POBoxPostalCode exist, CompanyPostalCode takes precedence.

### 10. Customer Node (Sales & Distribution)

**Classification**:
| Field | Description |
|-------|-------------|
| AccountGroupCode | Customer account group |
| CustomerGroupCode | Customer grouping |
| NielsenRegionCode | Nielsen region |
| IndustryCode1-5 | Industry classifications (up to 5) |
| BusinessTypeCode | Business type designation |

**Business Controls**:
| Field | Description |
|-------|-------------|
| OrderBlockReasonCode | Order blocking reason |
| BillingBlockReasonCode | Billing blocking reason |
| DeliveryBlockReasonCode | Delivery blocking reason |
| SalesSupportBlockReasonCode | Sales support block |
| PostingBlockReasonCode | Posting block |
| CentralDeletionFlag | Central deletion indicator |

**Financial**:
| Field | Description |
|-------|-------------|
| TaxGroupCode | Tax classification |
| AnnualSalesVolume | Annual sales with currency |
| AnnualSalesVolumeYear | Reference year |
| VATLiabilityIndicator | VAT liability |
| EqualizationTaxRelevance | Equalization tax |

**Condition Groups**: ConditionGroup1-5 (pricing)

**Extension Fields**: ExtensionCode1-10 (custom codes)

**Sales Arrangements**:
| Field | Description |
|-------|-------------|
| Incoterms | Delivery terms |
| TransferLocation | Transfer point |
| PartialDeliveryControl | Partial delivery settings |
| CompleteDeliveryControl | Complete delivery settings |
| SalesOrganizationGrouping | Sales org grouping |
| PriceGroupCode | Price group |
| CurrencyCode | Transaction currency |
| SalesGroupCode | Sales group |

### 11. Supplier Node (Procurement)

Similar structure to Customer node with procurement-specific attributes:
- Purchasing organization assignments
- Vendor classification codes
- Payment terms and conditions
- Procurement blocking reasons

---

## BP Relationship Service Detail

### BusinessPartnerRelationship Node

| Field | Description | Necessity |
|-------|-------------|-----------|
| RoleCode | Relationship category | Optional |
| StartDate | Validity start | Optional |
| EndDate | Validity end | Optional |
| RelationshipBusinessPartnerUUID | Related partner UUID | Optional |
| DefaultIndicator | Default when multiple exist | Optional |

### ContactPerson Node

**Contact Details**:
- BusinessPartnerFunctionalAreaCode (department)
- ContactPersonNote (comments)
- VIPReasonCode (importance indicator)
- BusinessPartnerFunctionTypeCode (job function)
- PowerOfAttorneyTypeCode (authority level)

**Receiver IDs**:
- SupplierContactPersonID
- CustomerContactPersonID

**Workplace Address**:
- DepartmentName, FunctionalTitle
- Building, Floor, Room
- CorrespondenceShortName

**Communication** (same structure as Address Data):
- Email, Telephone, Facsimile, WebURL

---

## Documentation Links

- **SOAP APIs**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/soap-apis-for-business-partners
- **Endpoints**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/endpoints-for-soap-replication
- **Partial Data Handling**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/support-for-partial-data-handling
