# Destination Configuration Templates

## How to Use This Template

- **Purpose**: Configure SAP BTP destinations for SAP Business Application Studio connectivity
- **When to Use**: Connecting to ABAP systems, OData services, or external systems
- **Instructions**: Replace `[bracketed values]` with your specific configuration

---

## Template 1: ABAP On-Premise System

Use for connecting to SAP S/4HANA, ECC, or other on-premise ABAP systems.

```properties
# Basic Configuration
Name = [DESTINATION_NAME]
Type = HTTP
URL = https://[virtual-host]:[port]
ProxyType = OnPremise
Authentication = [BasicAuthentication | PrincipalPropagation | NoAuthentication]

# Required for BAS
WebIDEEnabled = true
HTML5.DynamicDestination = true

# ABAP-Specific
WebIDEUsage = odata_abap,dev_abap
sap-client = [CLIENT_NUMBER]

# For BasicAuthentication
User = [USERNAME]
Password = [PASSWORD]
```

### Notes
- URL must be host:port only (no path)
- Virtual host/port must match Cloud Connector configuration
- sap-client is required for ABAP systems

---

## Template 2: SAP S/4HANA Cloud

Use for connecting to SAP S/4HANA Cloud public edition.

```properties
# Basic Configuration
Name = [DESTINATION_NAME]
Type = HTTP
URL = https://[tenant].s4hana.ondemand.com
ProxyType = Internet
Authentication = OAuth2SAMLBearerAssertion

# Required for BAS
WebIDEEnabled = true
HTML5.DynamicDestination = true

# S/4HANA Cloud Specific
WebIDEUsage = odata_abap,dev_abap

# OAuth Configuration
tokenServiceURL = https://[tenant].s4hana.ondemand.com/sap/bc/sec/oauth2/token
clientKey = [CLIENT_ID]
tokenServiceUser = [TOKEN_SERVICE_USER]
tokenServicePassword = [TOKEN_SERVICE_PASSWORD]
```

### Additional Steps
1. Establish trust with SAP S/4HANA Cloud
2. Create Communication Arrangement
3. See: [Integrating SAP Business Application Studio](https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/22bc724fd51a4aa4a4d1c5854db7e026.html)

---

## Template 3: SAP BTP ABAP Environment

Use for connecting to SAP BTP ABAP Environment (Steampunk).

```properties
# Basic Configuration
Name = [DESTINATION_NAME]
Type = HTTP
URL = https://[abap-env-instance].abap.[region].hana.ondemand.com
ProxyType = Internet
Authentication = OAuth2UserTokenExchange

# Required for BAS
WebIDEEnabled = true
HTML5.DynamicDestination = true

# ABAP Environment Specific
WebIDEUsage = odata_abap,dev_abap

# OAuth Configuration
tokenServiceURLType = Dedicated
tokenServiceURL = [TOKEN_SERVICE_URL]
clientId = [CLIENT_ID]
clientSecret = [CLIENT_SECRET]
```

---

## Template 4: Generic OData Service

Use for connecting to any OData service.

```properties
# Basic Configuration
Name = [DESTINATION_NAME]
Type = HTTP
URL = https://[service-host]/[path]
ProxyType = Internet
Authentication = [BasicAuthentication | OAuth2ClientCredentials | NoAuthentication]

# Required for BAS
WebIDEEnabled = true
HTML5.DynamicDestination = true

# Generic OData
WebIDEUsage = odata_gen

# Optional: Additional data
WebIDEAdditionalData = [additional_data]
```

---

## Template 5: SAP Business Accelerator Hub (Sandbox)

Use for connecting to SAP Business Accelerator Hub sandbox APIs.

```properties
# Basic Configuration
Name = [DESTINATION_NAME]
Type = HTTP
URL = https://sandbox.api.sap.com
ProxyType = Internet
Authentication = NoAuthentication

# Required for BAS
WebIDEEnabled = true
HTML5.DynamicDestination = true

# API Hub Specific
WebIDEUsage = apihub_sandbox

# API Key Header
URL.headers.APIKey = [YOUR_API_KEY]
```

### Notes
- Get API key from SAP Business Accelerator Hub
- No authentication needed (API key in header)

---

## Template 6: SAP Cloud for Customer (C4C)

Use for connecting to SAP Cloud for Customer.

```properties
# Basic Configuration
Name = [DESTINATION_NAME]
Type = HTTP
URL = https://[tenant].crm.ondemand.com
ProxyType = Internet
Authentication = BasicAuthentication

# Required for BAS
WebIDEEnabled = true
HTML5.DynamicDestination = true

# C4C Specific
WebIDEUsage = odata_c4c

# Credentials
User = [USERNAME]
Password = [PASSWORD]
```

---

## Verification Checklist

After creating a destination, verify:

- [ ] Destination name matches what you'll use in dev space
- [ ] `WebIDEEnabled = true` is set
- [ ] `HTML5.DynamicDestination = true` is set
- [ ] Correct `WebIDEUsage` value for system type
- [ ] URL format is correct (host:port for on-premise)
- [ ] Authentication credentials are valid
- [ ] Check Connection succeeds in BTP Cockpit

### From Dev Space Terminal

```bash
# Refresh destinations
curl localhost:8887/reload

# List destinations
curl $H2O_URL/api/listDestinations -o dests.json
```

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Destination not visible | Restart dev space after creating destination |
| Connection fails | Verify Cloud Connector for on-premise systems |
| OData catalog empty | Check sap-client value for ABAP systems |
| Authentication errors | Verify credentials and token service URLs |

---

**Documentation Links**:
- [Connecting to External Systems](https://help.sap.com/docs/bas/sap-business-application-studio/connecting-to-external-systems)
- [HTTP Destinations](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/http-destinations)
