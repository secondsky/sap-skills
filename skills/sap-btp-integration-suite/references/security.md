# Security - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Security Overview](#security-overview)
2. [Authentication Methods](#authentication-methods)
3. [Keystore Management](#keystore-management)
4. [Credential Artifacts](#credential-artifacts)
5. [Message-Level Security](#message-level-security)
6. [Certificate Management](#certificate-management)
7. [Security Best Practices](#security-best-practices)

---

## Security Overview

### Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
├─────────────────────────────────────────────────────────────┤
│  Transport Layer (TLS/SSL)                                   │
│  ├─ Server certificates                                      │
│  ├─ Client certificates (mTLS)                               │
│  └─ Cipher suites                                            │
├─────────────────────────────────────────────────────────────┤
│  Authentication Layer                                        │
│  ├─ Basic authentication                                     │
│  ├─ OAuth 2.0                                                │
│  ├─ Client certificate                                       │
│  ├─ SAML assertion                                           │
│  └─ Principal propagation                                    │
├─────────────────────────────────────────────────────────────┤
│  Message Layer                                               │
│  ├─ Encryption (PGP, PKCS#7)                                 │
│  ├─ Digital signatures                                       │
│  └─ Message digest                                           │
├─────────────────────────────────────────────────────────────┤
│  Access Control                                              │
│  ├─ Role collections                                         │
│  ├─ Access policies                                          │
│  └─ Endpoint protection                                      │
└─────────────────────────────────────────────────────────────┘
```

### Security Material Types

| Type | Purpose | Storage |
|------|---------|---------|
| Keystore | Certificates and keys | Keystore artifact |
| User Credentials | Username/password | Credential artifact |
| Secure Parameters | Sensitive config values | Secure store |
| OAuth Credentials | OAuth tokens | Credential artifact |
| PGP Keys | Encryption/signing keys | Keyring artifact |
| SSH Keys | SFTP authentication | Keystore artifact |

---

## Authentication Methods

### Inbound Authentication (Senders calling Integration Suite)

#### Basic Authentication
Username/password in HTTP header.

**Configuration**:
1. Create service instance for process integration
2. Assign `ESBMessaging.send` role
3. Use service key credentials

#### Client Certificate Authentication
X.509 certificate verification.

**Configuration**:
1. Import client CA certificate to keystore
2. Configure sender adapter for client certificate
3. Map certificate to user (Neo) or use role-based auth (CF)

#### OAuth 2.0
Token-based authentication.

**Grant Types**:
- Client Credentials (machine-to-machine)
- Authorization Code (user-delegated)
- SAML Bearer Assertion (SSO scenarios)

### Outbound Authentication (Integration Suite calling receivers)

#### Basic Authentication
```
Adapter → Authentication: Basic
       → Credential Name: [UserCredential artifact]
```

#### Client Certificate
```
Adapter → Authentication: Client Certificate
       → Private Key Alias: [Keystore alias]
```

#### OAuth 2.0 Client Credentials
```
Adapter → Authentication: OAuth2 Client Credentials
       → Token Service URL: https://oauth.example.com/token
       → Client ID: [from credential]
       → Client Secret: [from credential]
```

#### Principal Propagation
Forward user identity to backend systems.

**Scenarios**:
- SAP to SAP Cloud Identity
- Cloud Foundry to on-premise
- Subaccount to subaccount

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/basic-authentication-outbound-f26152c.md

---

## Keystore Management

### Keystore Structure

```
Tenant Keystore
├── SAP Keys (managed by SAP)
│   ├── sap_cloudintegrationcertificate  (client cert)
│   └── sap_cloudintegrationca           (CA cert)
├── Customer Keys
│   ├── my_client_key        (private key + cert)
│   ├── partner_ca_cert      (CA certificate)
│   └── backend_server_cert  (server certificate)
└── Key History
    └── Rotated keys for reference
```

### Key Types

| Type | Content | Use Case |
|------|---------|----------|
| Key Pair | Private key + certificate | Client authentication, signing |
| Certificate | Public certificate only | Server validation, CA trust |
| SSH Key | SSH private/public key | SFTP authentication |

### Keystore Operations

**Upload Certificate**:
1. Navigate to Monitor → Manage Security → Keystore
2. Click Add → Certificate
3. Upload .cer/.crt/.pem file
4. Assign alias

**Upload Key Pair**:
1. Navigate to Keystore
2. Click Add → Key Pair
3. Upload .p12/.pfx file with password
4. Assign alias

**Renew Certificate**:
1. Upload new certificate with new alias
2. Update adapter configurations
3. Test connectivity
4. Delete old certificate after validation

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/managing-keystore-entries-2dc8942.md

---

## Credential Artifacts

### User Credentials

Store username/password combinations.

**Deployment**:
1. Navigate to Monitor → Manage Security → Security Material
2. Click Add → User Credentials
3. Enter name, user, password
4. Deploy

**Usage in Adapter**:
```
Authentication: Basic
Credential Name: MyCredential
```

### OAuth2 Credentials

Store OAuth client credentials.

**Types**:
- Client Credentials Grant
- Authorization Code Grant
- SAML Bearer Assertion

**Configuration**:
- Token Service URL
- Client ID
- Client Secret
- Scope (optional)
- Token refresh settings

### Secure Parameters

Store sensitive configuration values.

**Deployment**:
1. Navigate to Security Material
2. Click Add → Secure Parameter
3. Enter name and value
4. Deploy

**Access in Script**:
```groovy
def secureStore = ITApiFactory.getService(SecureStoreService.class, null)
def value = secureStore.getSecureParameter("ParameterName")
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/managing-security-material-b8ccb53.md

---

## Message-Level Security

### Encryption

#### PGP Encryption
Encrypt payload using OpenPGP standard.

**Encryptor Step**:
| Parameter | Description |
|-----------|-------------|
| Public Key Alias | Recipient's public key |
| Algorithm | AES-256, etc. |
| Armor | ASCII armor output |

**Decryptor Step**:
| Parameter | Description |
|-----------|-------------|
| Private Key Alias | Your private key |
| Signatures Required | Verify sender signature |

#### PKCS#7/CMS Encryption
Enterprise encryption standard.

**Supported Algorithms**:
- AES (128, 192, 256 bit)
- 3DES
- DES (legacy, not recommended)

### Digital Signatures

#### XML Digital Signature
Sign/verify XML documents.

**Algorithms**:
- RSA-SHA256 (recommended)
- RSA-SHA1 (legacy)
- ECDSA

**Elements**:
- Enveloped signature
- Enveloping signature
- Detached signature

#### PKCS#7/CMS Signature
Sign binary/text content.

### Message Digest

Calculate hash of message content.

**Algorithms**:
- SHA-256 (recommended)
- SHA-1 (legacy)
- MD5 (not recommended)

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/apply-message-level-security-9036c0c.md

---

## Certificate Management

### Certificate Types

| Certificate | Purpose |
|-------------|---------|
| Server Certificate | Identify server to clients |
| Client Certificate | Identify client to servers |
| CA Certificate | Trust anchor for validation |
| Signing Certificate | Digital signature creation |
| Encryption Certificate | Message encryption |

### Certificate Lifecycle

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Request │ → │ Issue   │ → │ Active  │ → │ Renew   │
│   CSR   │   │  Cert   │   │  Usage  │   │ Before  │
│         │   │         │   │         │   │ Expiry  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
                                               │
                                               ▼
                                          ┌─────────┐
                                          │ Replace │
                                          │  & Test │
                                          └─────────┘
```

### Certificate Renewal Best Practices

1. **Monitor Expiration**
   - Set alerts for 30-day warning
   - Track all certificates in inventory

2. **Prepare New Certificate**
   - Generate or request before expiry
   - Use same key type and size

3. **Staged Rollout**
   - Import with new alias
   - Update configurations
   - Test in lower environments

4. **Validate**
   - Verify connectivity
   - Check signature validation
   - Confirm encryption/decryption

5. **Cleanup**
   - Remove old certificate after validation
   - Update documentation

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/security-artifact-renewal-083fc8d.md

---

## Security Best Practices

### General

1. **Use HTTPS everywhere**
   - No unencrypted HTTP
   - TLS 1.2+ only

2. **Rotate credentials regularly**
   - Passwords: 90 days
   - Certificates: Before expiry
   - API keys: As needed

3. **Principle of least privilege**
   - Minimal role assignments
   - Specific permissions only

4. **Audit and monitor**
   - Enable audit logging
   - Monitor security events
   - Review access regularly

### Integration Flow Security

1. **Never hardcode credentials**
   ```groovy
   // BAD
   def password = "mypassword"

   // GOOD
   def cred = secureStore.getUserCredential("MyCredential")
   ```

2. **Don't log sensitive data**
   ```groovy
   // BAD
   log.info("Password: ${password}")

   // GOOD
   log.info("Authentication configured")
   ```

3. **Validate input data**
   - Check payload structure
   - Validate against schema
   - Sanitize user input

4. **Use secure credential artifacts**
   - User Credentials for passwords
   - Secure Parameters for config
   - OAuth artifacts for tokens

### API Management Security

1. **Always authenticate APIs**
   - API keys at minimum
   - OAuth 2.0 preferred

2. **Apply threat protection**
   - JSON/XML threat policies
   - Regular expression validation
   - Input validation

3. **Implement rate limiting**
   - Quota policies
   - Spike arrest
   - Concurrent limits

4. **Use CORS carefully**
   - Restrict origins
   - Limit methods
   - Validate headers

---

## Related Documentation

- **Security Guidelines**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/apply-the-highest-security-standards-201fd43.md
- **Keystore Management**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/managing-keystore-entries-2dc8942.md
- **Certificate Renewal**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/security-artifact-renewal-083fc8d.md
- **PGP Keys**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/managing-pgp-keys-cd478a7.md
- **OAuth Configuration**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Operations/deploying-an-oauth2-client-credentials-artifact-801b106.md
