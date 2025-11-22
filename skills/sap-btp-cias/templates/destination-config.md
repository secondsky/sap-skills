# CIAS Destination Configuration Templates

Templates for configuring destinations in Cloud Integration Automation Service.

---

## Basic HTTP Destination

### Configuration

| Property | Value | Notes |
|----------|-------|-------|
| Name | `<SYSTEM_ID>_DEST` | Use meaningful identifier |
| Type | `HTTP` | Default |
| Description | Integration destination for [System Name] | Purpose description |
| URL | `https://<hostname>:<port>` | Always use HTTPS |
| Proxy Type | `Internet` | For cloud systems |
| Authentication | See options below | Based on requirements |

---

## Authentication Options

### Basic Authentication

```
Authentication: BasicAuthentication
User: <technical_user>
Password: <password>
```

**Use when**:
- Simple username/password authentication
- Technical user with limited scope
- Development/testing environments

**Security note**: Store credentials securely; delete destination after workflow completion.

### OAuth2 Client Credentials

```
Authentication: OAuth2ClientCredentials
Client ID: <client_id>
Client Secret: <client_secret>
Token Service URL: https://<auth_server>/oauth/token
```

**Use when**:
- Machine-to-machine authentication
- SAP BTP services integration
- API access scenarios

### OAuth2 User Token Exchange

```
Authentication: OAuth2UserTokenExchange
Client ID: <client_id>
Client Secret: <client_secret>
Token Service URL: https://<auth_server>/oauth/token
```

**Use when**:
- User context required in target system
- Principal propagation needed

### Client Certificate

```
Authentication: ClientCertificateAuthentication
Key Store Location: <path_to_keystore>
Key Store Password: <keystore_password>
```

**Use when**:
- mTLS required
- High-security environments
- Production systems

---

## Destination Templates by Target System

### SAP S/4HANA Cloud

```
Name: S4HC_<TENANT_ID>
Type: HTTP
URL: https://<tenant>.s4hana.ondemand.com
Proxy Type: Internet
Authentication: OAuth2SAMLBearerAssertion
Audience: https://<tenant>.s4hana.ondemand.com
Client Key: <client_key>
Token Service URL: https://<tenant>.s4hana.ondemand.com/sap/bc/sec/oauth2/token
Token Service User: <communication_user>
Token Service Password: <password>
```

### SAP S/4HANA On-Premise (via Cloud Connector)

```
Name: S4OP_<SYSTEM_ID>
Type: HTTP
URL: http://<virtual_host>:<virtual_port>
Proxy Type: OnPremise
Location ID: <cloud_connector_location_id>
Authentication: BasicAuthentication
User: <system_user>
Password: <password>
```

### SAP SuccessFactors

```
Name: SFSF_<COMPANY_ID>
Type: HTTP
URL: https://<datacenter>.successfactors.com
Proxy Type: Internet
Authentication: OAuth2SAMLBearerAssertion
Audience: www.successfactors.com
Client Key: <api_key>
Token Service URL: https://<datacenter>.successfactors.com/oauth/token
Token Service User: <admin_user>
Token Service Password: <password>
```

### SAP Integration Suite (CPI)

```
Name: CPI_<TENANT_ID>
Type: HTTP
URL: https://<tenant>.it-cpi<region>.cfapps.<region>.hana.ondemand.com
Proxy Type: Internet
Authentication: OAuth2ClientCredentials
Client ID: <client_id>
Client Secret: <client_secret>
Token Service URL: https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token
```

### SAP BTP ABAP Environment

```
Name: ABAP_ENV_<SYSTEM_ID>
Type: HTTP
URL: https://<system_id>.abap.<region>.hana.ondemand.com
Proxy Type: Internet
Authentication: OAuth2ClientCredentials
Client ID: <client_id>
Client Secret: <client_secret>
Token Service URL: https://<system_id>.authentication.<region>.hana.ondemand.com/oauth/token
```

### SAP Ariba

```
Name: ARIBA_<REALM_ID>
Type: HTTP
URL: https://<datacenter>.ariba.com
Proxy Type: Internet
Authentication: OAuth2ClientCredentials
Client ID: <application_key>
Client Secret: <shared_secret>
Token Service URL: https://api.ariba.com/v2/oauth/token
```

### SAP Concur

```
Name: CONCUR_<ENTITY_ID>
Type: HTTP
URL: https://<datacenter>.concursolutions.com
Proxy Type: Internet
Authentication: OAuth2ClientCredentials
Client ID: <client_id>
Client Secret: <client_secret>
Token Service URL: https://<datacenter>.concursolutions.com/oauth2/v0/token
```

---

## Additional Properties

### Common Additional Properties

| Property | Value | Purpose |
|----------|-------|---------|
| `sap-client` | `<client_number>` | ABAP system client |
| `HTML5.DynamicDestination` | `true` | Dynamic destination resolution |
| `WebIDEEnabled` | `true` | Enable for BAS/WebIDE |
| `WebIDEUsage` | `odata_abap` | OData service usage |

### Example with Additional Properties

```
Name: S4HC_PROD
Type: HTTP
URL: https://my-tenant.s4hana.ondemand.com
Proxy Type: Internet
Authentication: OAuth2SAMLBearerAssertion
[Authentication details...]

Additional Properties:
  sap-client: 100
  HTML5.DynamicDestination: true
```

---

## Security Best Practices

### Do

- Always use HTTPS for URLs
- Use technical/service users with minimal required permissions
- Rotate credentials regularly
- Delete destinations after workflow completion
- Document destination purpose in description

### Don't

- Store production credentials in non-production environments
- Share destination credentials across teams
- Use personal user credentials
- Leave unused destinations active
- Skip certificate validation in production

---

## Troubleshooting

### Destination Not Found in Dropdown

1. Verify destination exists in subaccount
2. Check URL matches tenant Host Base URL exactly
3. Confirm destination type is HTTP
4. Refresh dropdown after creation

### Authentication Failures

1. Verify credentials are correct
2. Check token service URL accessibility
3. Confirm user has required authorizations in target system
4. Review audit logs for specific error

### Connection Timeouts

1. Check Cloud Connector status (for on-premise)
2. Verify network connectivity
3. Confirm target system is available
4. Review timeout settings

---

## Documentation Links

- Destinations: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/destinations-496a763.md
- Destination Creation: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/destination-creation-b2cd7e9.md
- SAP BTP Destinations: https://help.sap.com/docs/btp/sap-business-technology-platform/destination
