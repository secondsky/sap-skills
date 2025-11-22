# Identity Propagation Scenarios Reference

Advanced identity propagation configurations for ABAP systems, NetWeaver Java, and custom identity providers.

**Source**: https://github.com/SAP-docs/btp-connectivity/tree/main/docs/1-connectivity-documentation

---

## Overview

Identity propagation enables SSO between SAP BTP and backend systems by forwarding user identity through short-lived X.509 certificates.

### Propagation Types

| Type | Description |
|------|-------------|
| **Principal Propagation** | Propagate logged-in user identity |
| **Technical User Propagation** | Propagate technical service user |

### Supported Backend Systems

- SAP ABAP systems (HTTPS, RFC)
- SAP NetWeaver AS Java
- SAP Web Dispatcher (as proxy)
- Third-party systems (with X.509 support)

---

## Identity Propagation to ABAP Systems

### HTTPS Configuration

**Prerequisites**:
- Cloud Connector installed and connected
- System certificate configured in Cloud Connector
- Access control for target ABAP system

**Steps**:

1. **Export Cloud Connector Certificate**:
   - Cloud Connector UI > Configuration > On Premise > System Certificate
   - Download the certificate

2. **Import to ABAP Trust Store**:
   - Transaction `STRUST`
   - Import certificate to `SSL Server Standard`

3. **Configure Certificate Mapping**:
   - Transaction `CERTRULE`
   - Create rule to map certificate subject to ABAP user

4. **Destination Configuration**:
   ```
   Authentication: PrincipalPropagation
   ProxyType: OnPremise
   ```

### RFC Configuration

**Prerequisites**:
- Cloud Connector with SNC PSE configured
- SNC enabled on ABAP system

**Steps**:

1. **Configure SNC PSE in Cloud Connector**:
   - Cloud Connector UI > Configuration > On Premise > SNC

2. **Export SNC Certificate**:
   - Download PSE certificate from Cloud Connector

3. **Import to ABAP SNC Trust**:
   - Transaction `STRUST` > SNC (SAPCryptolib)

4. **Configure SNC Parameters**:
   ```
   jco.client.snc_mode: 1
   jco.client.snc_partnername: p:<ABAP-SNC-Name>
   jco.client.snc_qop: 9
   ```

### Rule-Based Certificate Mapping

Configure in ABAP transaction `CERTRULE`:

| Field | Description | Example |
|-------|-------------|---------|
| **Rule Type** | Mapping algorithm | `Certificate Subject` |
| **Subject Pattern** | X.509 subject filter | `CN=*, OU=Cloud Connector` |
| **User Field** | Field to extract | `CN` |
| **User Mapping** | How to resolve user | `Direct` or `Alias` |

**Example Rules**:

```
# Direct mapping from CN
Subject: CN=${USER}, OU=SCC
User: ${USER}

# Email-based mapping
Subject: EMAIL=${EMAIL}
User: Resolve via SM30 table
```

### Short-Term vs Long-Term Certificates

| Aspect | Short-Term | Long-Term |
|--------|------------|-----------|
| **Validity** | Minutes to hours | Days to months |
| **Use Case** | Principal Propagation | Technical User |
| **Rotation** | Automatic | Manual renewal |
| **Security** | Higher (ephemeral) | Lower (persistent) |

---

## Identity Propagation to NetWeaver Java

### Prerequisites

- SAP NetWeaver Administrator access
- Cloud Connector administrator access
- SSL access point configuration

### Configuration Steps

**1. Import Cloud Connector Certificate**:
- SAP NetWeaver Administrator > Security > Certificates and Keys
- Import system certificate to "Trusted CAs" keystore

**2. Configure ICM SSL Access Point**:
- Create new SSL access point
- Generate Certificate Signing Request (CSR)
- Import certificate chain:
  - CSR response
  - Root CA certificate
  - Cloud Connector certificate
- Restart ICM

**3. Add ClientCertLoginModule**:
- SAP NetWeaver Administrator > Configuration > Security
- Add `ClientCertLoginModule` to policy configuration

**4. Define User Mapping Rules**:

```
# Map from certificate subject
Rule Type: Subject Name Field
Field: CN
Target: User ID

# Map from SubjectAlternativeName
Rule Type: Certificate V3 Extension
Extension: SubjectAlternativeName
Target: User ID

# Certificate filter
Rule Type: Client Certificate Filter
Issuer: CN=Cloud Connector CA
```

### ICM Verification

```bash
# Check ICM trusts certificate
sapcontrol -nr <instance> -function ICMGetThreadList

# Verify SSL configuration
disp+work -v
```

---

## Custom Identity Provider Configuration

### SSO Passcode Method

When using a custom IDP for Cloud Connector subaccount configuration:

**Step 1: Construct SSO URL**
```
https://<subdomain>.authentication.<region>.hana.ondemand.com/passcode
```

Example:
```
https://mycompany.authentication.eu10.hana.ondemand.com/passcode
```

**Step 2: Obtain Passcode**
- Navigate to SSO URL in browser
- Authenticate with custom IDP
- Copy generated one-time passcode

**Step 3: Configure Cloud Connector**
```
Username: $SAP-CP-SSO-PASSCODE$
Password: <one-time-passcode>
```

### Alternative: Authentication Data File

Cloud Connector 2.17+ supports authentication data file import:

1. Generate file in BTP Cockpit
2. Download authentication data
3. Cloud Connector UI > Configuration > Import
4. Select authentication data file

---

## IAS Token Propagation

### IAS-Signed SAML Bearer Assertion

**Flow**:
1. User authenticates to SAP Identity Authentication Service (IAS)
2. IAS issues signed SAML assertion
3. Destination Service exchanges for OAuth token
4. Token used for target system access

**Destination Configuration**:
```json
{
  "Name": "ias-saml-destination",
  "Type": "HTTP",
  "URL": "https://target-system.example.com",
  "Authentication": "OAuth2SAMLBearerAssertion",
  "ProxyType": "Internet",
  "audience": "https://target-system.example.com",
  "clientKey": "<service-key>",
  "tokenServiceURL": "https://target.authentication.region.hana.ondemand.com/oauth/token",
  "KeyStoreLocation": "ias-signing-cert.p12",
  "KeyStorePassword": "<password>"
}
```

### IAS-Generated SAML to OAuth2 Chain

**Predefined Chain Configuration**:
```
Authentication: OAuth2SAMLBearerAssertion
ChainType: IAS_SAML_TO_OAUTH2
```

**Flow**:
1. BTP app requests destination with IAS token
2. Destination Service validates IAS token
3. Generates SAML assertion from IAS claims
4. Exchanges SAML for OAuth2 token
5. Returns destination with access token

---

## OAuth2UserTokenExchange

### Token Exchange Flow

**Prerequisites**:
- User token with `uaa.user` scope
- OAuth2UserTokenExchange destination configured

**Header Configuration**:

| Scenario | Authorization Header | User Token Exchange Header |
|----------|---------------------|---------------------------|
| Provider Tenant | User JWT | (empty) |
| Subscriber → Provider Dest | Access Token | Subscriber JWT |
| Subscriber → Subscriber Dest | Subscriber Access Token | Subscriber JWT |

### Implementation

```bash
# Provider tenant token exchange
curl -X GET "${uri}/destination-configuration/v1/destinations/${destName}" \
  -H "Authorization: Bearer ${userJwt}"

# Subscriber to provider destination
curl -X GET "${uri}/destination-configuration/v1/destinations/${destName}" \
  -H "Authorization: Bearer ${accessToken}" \
  -H "X-user-token: ${subscriberUserJwt}"
```

---

## Sequential User Propagation Chain

### Concept

Chain multiple authentication methods for complex SSO scenarios.

**Example: BTP → IAS → On-Premise**

1. User authenticates to BTP via IAS
2. IAS token exchanged for SAML assertion
3. SAML propagated to on-premise via Cloud Connector
4. On-premise validates and maps user

### Configuration

```json
{
  "Name": "sequential-chain-dest",
  "Type": "HTTP",
  "URL": "https://onprem.internal:443",
  "Authentication": "OAuth2SAMLBearerAssertion",
  "ProxyType": "OnPremise",
  "chainConfig": {
    "step1": "IAS_TOKEN_VALIDATION",
    "step2": "SAML_ASSERTION_GENERATION",
    "step3": "PRINCIPAL_PROPAGATION"
  }
}
```

---

## Propagation via SAP Web Dispatcher

### Architecture

```
BTP App → Cloud Connector → Web Dispatcher → ABAP Backend
```

### Web Dispatcher Configuration

```
# icm/server_port_0
wdisp/ssl_enable = 1
wdisp/ssl_client_sni = 1

# Client certificate forwarding
icm/HTTP/client_cert_header = SSL_CLIENT_CERT
```

### Trust Chain Setup

1. Import Cloud Connector certificate to Web Dispatcher trust store
2. Configure certificate forwarding to backend
3. Backend validates certificate from trusted Web Dispatcher

---

## Communication Behavior Parameters

### JCo Connection Parameters

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `jco.client.trace` | 0, 1 | 0 | Enable protocol traces |
| `jco.client.codepage` | 4-digit | 1100 | Character encoding |
| `jco.client.delta` | 0, 1 | 1 | Table delta management |
| `jco.client.serialization_format` | rowBased, columnBased | rowBased | RFC serialization |
| `jco.client.network` | LAN, WAN | LAN | Network type hint |

### Codepage Considerations

When passwords contain special characters:
- Default `1100` (iso-8859-1) may not support all characters
- Use appropriate codepage for your locale:
  - `1160` - UTF-8
  - `8000` - Japanese
  - `8300` - Korean

---

## Troubleshooting

### Certificate Issues

| Symptom | Cause | Solution |
|---------|-------|----------|
| Certificate not trusted | Missing in trust store | Import to STRUST/ICM |
| User not found | Mapping rule mismatch | Check CERTRULE patterns |
| SNC handshake failed | PSE not configured | Verify SNC setup |
| Token expired | Short-term cert timeout | Check system clocks |

### Debugging

**Cloud Connector**:
```
Audit Log Level: All
Connection/Traffic Traces: Enabled (temporarily)
```

**ABAP**:
```
Transaction: SMICM > Services > ICM Trace
Transaction: SLDCHECK > SSL Trace
```

**NetWeaver Java**:
```
Log Configuration: Security > Authentication
Trace Level: DEBUG
```

---

**Last Updated**: 2025-11-22
**Source Files**:
- configuring-identity-propagation-to-an-abap-system-6705cc3.md
- configuring-identity-propagation-to-sap-netweaver-as-for-java-2e96287.md
- use-a-custom-idp-for-subaccount-configuration-2022612.md
- exchanging-user-jwts-via-oauth2usertokenexchange-destinations-39d4265.md
- ias-signed-saml-bearer-assertion-a1ecea9.md
- sequential-user-propagation-chain-13f633e.md
- parameters-influencing-communication-behavior-cce126a.md
