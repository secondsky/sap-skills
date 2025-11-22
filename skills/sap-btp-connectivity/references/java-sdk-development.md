# Java APIs and SDK Development - Complete Reference

**Source**: https://github.com/SAP-docs/btp-connectivity/tree/main/docs/1-connectivity-documentation

---

## Overview

SAP BTP Connectivity provides Java APIs for destination access, though SAP Cloud SDK is recommended for new developments.

---

## API Status

| API | Status | Environment |
|-----|--------|-------------|
| ConnectivityConfiguration | Support-only | Cloud Foundry |
| AuthenticationHeaderProvider | Support-only | Cloud Foundry |
| SAP Cloud SDK | **Recommended** | Cloud Foundry, Kyma |
| Transparent Proxy | **Recommended** | Kubernetes, Kyma |

**Support-only**: Bug fixes and security patches only; no new features planned.

---

## Maven Dependencies

### Connectivity API Extension

```xml
<dependency>
    <groupId>com.sap.cloud.connectivity.apiext</groupId>
    <artifactId>com.sap.cloud.connectivity.apiext</artifactId>
    <version>${connectivity-apiext.version}</version>
    <scope>provided</scope>
</dependency>
```

### JCo (Java Connector for RFC)

```xml
<dependency>
    <groupId>com.sap.cloud</groupId>
    <artifactId>neo-java-web-api</artifactId>
    <version>4.108.9</version>
    <scope>provided</scope>
</dependency>
```

### SAP Cloud SDK (Recommended)

```xml
<dependency>
    <groupId>com.sap.cloud.sdk.cloudplatform</groupId>
    <artifactId>cloudplatform-connectivity</artifactId>
</dependency>
```

---

## ConnectivityConfiguration API

Retrieve destination configurations via JNDI lookup.

### Setup

**context.xml:**
```xml
<Resource name="connectivityConfiguration"
    type="com.sap.core.connectivity.api.configuration.ConnectivityConfiguration"
    factory="com.sap.core.connectivity.api.jndi.ServiceObjectFactory"/>
```

**manifest.yml:**
```yaml
env:
  USE_CONNECTIVITY_APIEXT: true
services:
  - my-xsuaa
  - my-destination-service
  - my-connectivity-service
```

### Usage

```java
import com.sap.core.connectivity.api.configuration.ConnectivityConfiguration;
import com.sap.core.connectivity.api.configuration.DestinationConfiguration;

// JNDI Lookup
Context ctx = new InitialContext();
ConnectivityConfiguration config = (ConnectivityConfiguration)
    ctx.lookup("java:comp/env/connectivityConfiguration");

// Get destination
DestinationConfiguration destConfig =
    config.getConfiguration("my-destination");

// Access properties
String authType = destConfig.getProperty("Authentication");
Map<String, String> allProps = destConfig.getAllProperties();

// Get keystore for SSL/TLS
KeyStore keyStore = destConfig.getKeyStore();
KeyStore trustStore = destConfig.getTrustStore();
```

### Priority Order

When destinations exist at multiple levels:
1. Instance/Subscription level (highest)
2. Subaccount level (lowest)

---

## AuthenticationHeaderProvider API

Retrieve prepared authentication headers for target systems.

### Setup

**context.xml:**
```xml
<Resource name="myAuthHeaderProvider"
    type="com.sap.core.connectivity.api.authentication.AuthenticationHeaderProvider"
    factory="com.sap.core.connectivity.api.jndi.ServiceObjectFactory"/>
```

### Usage

```java
import com.sap.core.connectivity.api.authentication.AuthenticationHeaderProvider;
import com.sap.core.connectivity.api.authentication.AuthenticationHeader;

// JNDI Lookup
AuthenticationHeaderProvider authProvider = (AuthenticationHeaderProvider)
    ctx.lookup("java:comp/env/myAuthHeaderProvider");

// Principal Propagation (On-Premise SSO)
AuthenticationHeader ppHeader = authProvider.getPrincipalPropagationHeader();

// OAuth2 SAML Bearer Assertion
List<AuthenticationHeader> samlHeaders =
    authProvider.getOAuth2SAMLBearerAssertionHeaders(destConfig);

// OAuth2 Client Credentials
AuthenticationHeader ccHeader =
    authProvider.getOAuth2ClientCredentialsHeader(destConfig);
```

### Token Caching

- Tokens cached automatically
- Auto-refresh before expiration
- No manual cache management needed

---

## JCo (Java Connector) for RFC

### Sample Servlet

```java
import com.sap.conn.jco.*;

@WebServlet("/rfc-demo")
public class JCoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            // Get destination
            JCoDestination destination =
                JCoDestinationManager.getDestination("JCoDemoSystem");

            // Get function
            JCoFunction function = destination.getRepository()
                .getFunction("STFC_CONNECTION");

            if (function == null) {
                throw new RuntimeException("Function not found");
            }

            // Set import parameters
            function.getImportParameterList()
                .setValue("REQUTEXT", "Hello from Cloud!");

            // Execute
            function.execute(destination);

            // Get export parameters
            String echoText = function.getExportParameterList()
                .getString("ECHOTEXT");
            String respText = function.getExportParameterList()
                .getString("RESPTEXT");

            // Output
            resp.getWriter().println("Echo: " + echoText);
            resp.getWriter().println("Response: " + respText);

        } catch (JCoException e) {
            throw new ServletException("RFC error: " + e.getMessage(), e);
        }
    }
}
```

### Working with Tables

```java
// Get table parameter
JCoTable companyCodeTable = function.getTableParameterList()
    .getTable("COMPANYCODE_LIST");

// Iterate rows
while (companyCodeTable.nextRow()) {
    String compCode = companyCodeTable.getString("COMP_CODE");
    String compName = companyCodeTable.getString("COMP_NAME");
    System.out.println(compCode + ": " + compName);
}

// Add rows to input table
JCoTable inputTable = function.getTableParameterList().getTable("INPUT_DATA");
inputTable.appendRow();
inputTable.setValue("FIELD1", "value1");
inputTable.setValue("FIELD2", "value2");
```

### Connection Pool Access

```java
// Check pool statistics
JCoDestination dest = JCoDestinationManager.getDestination("MyDest");
dest.getPoolStatistics(); // Returns pool usage info
```

---

## SAP Cloud SDK (Recommended)

### Get Destination

```java
import com.sap.cloud.sdk.cloudplatform.connectivity.DestinationAccessor;
import com.sap.cloud.sdk.cloudplatform.connectivity.HttpDestination;

// Simple lookup
HttpDestination destination = DestinationAccessor
    .getDestination("my-destination")
    .asHttp();

// With user propagation
HttpDestination destWithUser = DestinationAccessor
    .getDestination("my-destination")
    .asHttp()
    .withUserToken();
```

### Execute HTTP Request

```java
import com.sap.cloud.sdk.cloudplatform.connectivity.HttpClientAccessor;

HttpClient client = HttpClientAccessor.getHttpClient(destination);
HttpResponse response = client.execute(new HttpGet("/api/resource"));
```

### Node.js (SAP Cloud SDK)

```javascript
const { getDestination } = require('@sap-cloud-sdk/connectivity');

// Get destination
const destination = await getDestination({
    destinationName: 'my-destination',
    jwt: userJwt  // For user propagation
});

// Use with HTTP client
const response = await axios.get(destination.url + '/api/resource', {
    headers: destination.headers
});
```

---

## Application Router Setup

Required for multitenancy and user-specific service calls with JCo.

### manifest.yml

```yaml
applications:
  - name: approuter
    path: approuter
    buildpacks:
      - nodejs_buildpack
    memory: 120M
    env:
      NODE_TLS_REJECT_UNAUTHORIZED: 0
      destinations: >
        [{
          "name": "backend",
          "url": "https://backend-app.cfapps.eu10.hana.ondemand.com",
          "forwardAuthToken": true
        }]
    services:
      - my-xsuaa
```

### xs-app.json

```json
{
  "welcomeFile": "/index.html",
  "routes": [
    {
      "source": "^/api/(.*)$",
      "destination": "backend",
      "authenticationType": "xsuaa"
    }
  ]
}
```

---

## WebSocket RFC (Internet)

For direct RFC connections without Cloud Connector (S/4HANA 1909+):

### Configuration

```properties
jco.destination.proxy_type=Internet
jco.client.wshost=s4hana.example.com
jco.client.wsport=443
jco.client.tls=1
jco.client.tls_trust_all=0
jco.client.tls_trust_store_location=truststore.jks
jco.client.tls_trust_store_password=<password>
```

### Supported Systems

- SAP S/4HANA Cloud
- SAP BTP ABAP Environment
- SAP S/4HANA On-Premise 1909+

---

## Communication Behavior Parameters

| Property | Description | Default |
|----------|-------------|---------|
| `jco.client.trace` | Enable protocol traces (0/1) | 0 (off) |
| `jco.client.codepage` | SAP codepage (4-digit) | 1100 |
| `jco.client.delta` | Table delta management (0/1) | 1 (on) |
| `jco.client.serialization_format` | rowBased or columnBased | rowBased |
| `jco.client.network` | WAN or LAN | LAN |

---

## Encryption Keys

### Customer-Specific Encryption Keys (CSEK)

- Default encryption with SAP-managed keys
- No configuration required
- All properties encrypted except Name and FragmentName

### Customer-Managed Keys (CMK)

- Dual encryption: CSEK + customer key
- Requires SAP Data Custodian Key Management
- Full control: grant, revoke, rotate, delete keys

### Unencrypted Metadata

- Destination Name
- FragmentName
- Creation/modification timestamps
- Owning subaccount info

---

## Connectivity via Reverse Proxy (Not Recommended)

Alternative to Cloud Connector with significant drawbacks:

| Aspect | Reverse Proxy | Cloud Connector |
|--------|---------------|-----------------|
| Internet exposure | Yes (vulnerable) | No |
| DoS protection | Limited | Protected |
| RFC support | WebSocket only (S/4HANA 1909+) | Full RFC |
| Principal propagation | Difficult | Native support |
| Setup complexity | High | Low |
| IP filtering | Single IP only | Granular |

**Recommendation**: Use Cloud Connector instead.

---

## Documentation Links

- Destination Java APIs: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/destination-java-apis
- ConnectivityConfiguration: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/connectivityconfiguration-api
- AuthenticationHeaderProvider: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/authenticationheaderprovider-api
- SAP Cloud SDK: https://sap.github.io/cloud-sdk/

---

**Last Updated**: 2025-11-22
