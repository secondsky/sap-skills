# SAP Cloud Transport Management - Destination Configuration Reference

**Source**: https://github.com/SAP-docs/sap-btp-cloud-transport-management/tree/main/docs/20-configure-landscape

---

## Overview

Transport destinations contain the connection details for remote communication. They are created in the SAP BTP Cockpit of the subaccount where you subscribe to SAP Cloud Transport Management.

**Important**: SAP Cloud Transport Management only supports **HTTPS** destinations.

**Location**: SAP BTP Cockpit > Connectivity > Destinations > Create > From Scratch

---

## Destination Types

### 1. Destination to TMS Service (Source Environment)

Required when applications export content directly to TMS.

**Purpose**: Enable source environment to call TMS export API

**Fixed Names by Application**:
- SAP Cloud Integration: `TransportManagementService`
- SAP Build Work Zone: `ctms_destination`
- Other applications: Check specific documentation

| Field | Value | Notes |
|-------|-------|-------|
| Name | `TransportManagementService` | Application-dependent fixed name |
| Type | HTTP | |
| Description | Optional | |
| URL | Service key `uri` value | Addresses TMS instance |
| Proxy Type | Internet | |
| Authentication | OAuth2ClientCredentials | Required |
| Client ID | Service key `uaa.clientid` | |
| Client Secret | Service key `uaa.clientsecret` | |
| Token Service URL Type | Dedicated | |
| Token Service URL | Service key `uaa.url` + `/oauth/token` | Authentication service endpoint |

**Additional Properties**:
| Property | Value |
|----------|-------|
| `sourceSystemId` | Source transport node name |

---

### 2. MTA Deployment on Cloud Foundry - Basic Authentication

**Identity Provider Support**:
- **Default**: Authenticates against SAP Identity Service (SAP ID users only)
- **Custom IAS Tenant**: Can be enabled by SAP upon request
  - When enabled: Supports only **local IAS-managed users**
  - Does **NOT** support federated users (users from corporate identity providers)
  - Contact SAP Support to enable custom IAS tenant authentication

| Field | Value | Notes |
|-------|-------|-------|
| Name | User-defined | |
| Type | HTTP | |
| Description | Optional | |
| Proxy Type | Internet | |
| Authentication | BasicAuthentication | |
| User | Platform user email | Must have SpaceDeveloper role |
| Password | User's password | |

**URL Options**:

**Option A - Using Organization and Space Names**:
```
https://deploy-service.cf.<domain>/slprot/<myorg>/<myspace>/slp
```
- `<domain>`: From Cloud Foundry API endpoint (subaccount Overview)
- URL-encode special characters:
  - Space → `%20`
  - Comma → `%2C`
  - Plus → `%2B`
  - Slash → `%2F`

Example:
```
https://deploy-service.cf.eu10-004.hana.ondemand.com/slprot/TestOrg/TestSpace/slp
```

**Option B - Using Space GUID** (Recommended):
```
https://deploy-service.cf.<domain>/slprot/<my-space-guid>/slp
```
- Retrieve GUID: `cf space <my-space-name> --guid`
- Benefits:
  - GUIDs follow standard formatting
  - HTTP-compatible (no encoding needed)
  - Stable even if org/space names change

Example:
```
https://deploy-service.cf.eu10-004.hana.ondemand.com/slprot/977a24d6-2eaf-432d-a3e1-5294451551a3/slp
```

**User Requirements**:
- Valid Cloud Foundry environment user
- `SpaceDeveloper` role in target space
- Platform user (required for multi-content deployment)
- Not subject to Data Protection and Privacy requirements
- Technical user recommended (avoids password rotation)

---

### 3. MTA Deployment on Cloud Foundry - OAuth2Password Authentication

**Use when**: Custom identity provider for platform users

**Authentication Flow**: UAA returns JWT token, used for Cloud Deployment Service API calls

| Field | Value | Notes |
|-------|-------|-------|
| Name | User-defined | |
| Type | HTTP | |
| Description | Optional | |
| URL | Same as Basic Auth options | |
| Proxy Type | Internet | |
| Authentication | OAuth2Password | |
| User | Platform user email | SpaceDeveloper role required |
| Password | User's password | |
| Client ID | `cf` | Fixed value |
| Client Secret | (empty) | Not required |
| Token Service URL | `https://login.cf.<domain>` | Replace `api` with `login` from API endpoint |

**Custom Identity Provider**:
- Add `origin` property in Additional Properties
- Custom provider must be registered
- Automated logon must be enabled

---

### 4. SAP Content Agent Service Destination

**Use when**: Transporting SAP Cloud Integration or API Management content together

**Prerequisites**:
- Service instance and key created in target subaccount
- SAP Content Agent service deployed

| Field | Value |
|-------|-------|
| Name | User-defined |
| Type | HTTP |
| URL | Content Agent service URL from service key |
| Proxy Type | Internet |
| Authentication | OAuth2ClientCredentials |
| Client ID | From service key |
| Client Secret | From service key |
| Token Service URL | From service key + `/oauth/token` |

---

### 5. BTP ABAP Environment Destination

**Prerequisites**:
- Communication scenario `SAP_COM_0948` instance in target ABAP environment
- Communication system with inbound communication user
- "User ID and Password" authentication configured

| Field | Value | Notes |
|-------|-------|-------|
| Name | User-defined | |
| Type | HTTP | |
| Description | Optional | |
| Proxy Type | Internet | |
| Authentication | BasicAuthentication | |
| User | Inbound communication user from `SAP_COM_0948` | |
| Password | Communication user password | |

**URL Pattern**:
```
https://<service-instance>.abap.<region>.hana.ondemand.com/sap/opu/odata4/sap/a4c_mswc_api/srvd_a2x/sap/manage_software_components/0001/
```

**Trust Settings**:
- Use default client truststore (SAP-provided certificates)
- Alternative: Custom certificates via destination certificate configuration

**API**: Uses `MANAGE_SOFTWARE_COMPONENTS` API with `SAP_COM_0948`, supports import of all transport requests.

---

### 6. XSC Delivery Unit Destination

**Use when**: Transporting SAP HANA XS classic delivery units

| Field | Value | Notes |
|-------|-------|-------|
| Name | User-defined | |
| Type | HTTP | |
| Proxy Type | Internet | |
| Authentication | BasicAuthentication | |
| User | Platform user | Deployment operations user |
| Password | User password | |

**URL Pattern**:
```
https://<host>/sap/hana/xs/lm/slp/slp.xsjs
```

**Example**:
```
https://demoabcd12345.hana.ondemand.com/sap/hana/xs/lm/slp/slp.xsjs
```

**Host Discovery**: Find host in SAP HANA Cockpit or Web-based Development Workbench

---

### 7. Application Content Destination

**Use when**: Transporting application-specific content formats

| Field | Value | Notes |
|-------|-------|-------|
| Name | User-defined | |
| Type | HTTP | |
| URL | Application-specified | Check application documentation |
| Authentication | OAuth2ClientCredentials | Typical; varies by application |
| Client ID | From target service instance | |
| Client Secret | From target service instance | |
| Token Service URL | Example: `https://ts.authentication.sap.hana.ondemand.com` | |

**Note**: URL and authentication vary by application. Consult specific application documentation.

---

### 8. Neo Environment MTA Deployment (Deprecated)

> **⚠️ Legacy Only**: SAP BTP Neo environment is end-of-life (EOL). Use only for existing Neo environments still in operation. **Cloud Foundry is the standard platform for all new implementations.** Plan migration to Cloud Foundry for long-term support.

**Use when**: Transporting MTAs to existing SAP BTP Neo environments (legacy systems only)

| Field | Value | Notes |
|-------|-------|-------|
| Name | User-defined | |
| Type | HTTP | |
| Proxy Type | Internet | |
| Authentication | BasicAuthentication | |
| User | Neo platform user | Must have Operating Solutions roles |
| Password | User password | |

**URL Pattern**:
```
https://slservice.<landscape-host>/slservice/slp/basic/<Neo-subaccount-technical-name>/slp
```

**Example**:
```
https://slservice.eu1.hana.ondemand.com/slservice/slp/basic/a123c4567b/slp
```

**User Requirement**: Must be valid Neo environment user with roles per "Operating Solutions" documentation.

---

## Verification

Use **Check Connection** to validate URL accessibility.

**Important**: Successful connection check doesn't guarantee deployment success. Conduct test deployments to confirm full functionality.

---

## Common Configuration Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Not Found` | Wrong CF domain | Match domain to CF API endpoint |
| `Not Found` | Special characters not encoded | Use space GUID or URL-encode |
| `Forbidden` | Missing SpaceDeveloper role | Add role to user |
| `Forbidden` | Wrong identity provider | Use OAuth2Password with correct origin |

---

## Documentation Links

- Create Transport Destinations: https://github.com/SAP-docs/sap-btp-cloud-transport-management/blob/main/docs/20-configure-landscape/create-transport-destinations-c9905c1.md
- TMS Service Destination: https://github.com/SAP-docs/sap-btp-cloud-transport-management/blob/main/docs/20-configure-landscape/create-destinations-to-sap-cloud-transport-management-service-795f733.md
- Basic Auth: https://github.com/SAP-docs/sap-btp-cloud-transport-management/blob/main/docs/20-configure-landscape/creating-destinations-using-sap-cloud-deployment-service-with-basic-authentication-6b7c9d8.md
- OAuth2Password: https://github.com/SAP-docs/sap-btp-cloud-transport-management/blob/main/docs/20-configure-landscape/creating-destinations-using-sap-cloud-deployment-service-with-oauth2password-authenticati-a26a721.md
- Content Agent Service: https://github.com/SAP-docs/sap-btp-cloud-transport-management/blob/main/docs/20-configure-landscape/creating-destinations-using-sap-content-agent-service-3f895ed.md
- ABAP Environment: https://github.com/SAP-docs/sap-btp-cloud-transport-management/blob/main/docs/20-configure-landscape/creating-destinations-for-deployment-of-references-of-sap-btp-abap-environment-3014453.md
