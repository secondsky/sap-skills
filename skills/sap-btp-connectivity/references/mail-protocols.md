# Mail Protocol Configuration Reference

Detailed configuration for mail destinations (SMTP, IMAP, POP3) and their secure variants.

**Source**: https://github.com/SAP-docs/btp-connectivity/tree/main/docs/1-connectivity-documentation

---

## Supported Protocols

| Protocol | Secure Variant | Default Port | Description |
|----------|----------------|--------------|-------------|
| SMTP | SMTPS | 25/587 | Outgoing mail (sending) |
| IMAP | IMAPS | 143/993 | Incoming mail (read/manage) |
| POP3 | POP3S | 110/995 | Incoming mail (download) |

---

## SMTP Configuration

### Required Properties

```
Name: <destination-name>
Type: MAIL
ProxyType: Internet | OnPremise
Authentication: BasicAuthentication | OAuth2ClientCredentials | OAuth2RefreshToken | OAuth2AuthorizationCode
mail.smtp.host: <smtp-server-address>
```

### Standard Properties

| Property | Description | Example |
|----------|-------------|---------|
| `mail.transport.protocol` | Transport protocol | `smtp` |
| `mail.smtp.host` | SMTP server address | `smtp.example.com` |
| `mail.smtp.port` | SMTP port (default: 587) | `587` |
| `mail.smtp.auth` | Enable authentication | `true` |
| `mail.smtp.starttls.enable` | Enable STARTTLS | `true` |
| `mail.user` | Username for authentication | `user@example.com` |
| `mail.password` | Password (if BasicAuth) | `****` |
| `mail.smtp.from` | Sender email address | `sender@example.com` |

### SMTPS Properties (TLS/SSL)

| Property | Description | Example |
|----------|-------------|---------|
| `mail.transport.protocol` | Secure transport | `smtps` |
| `mail.smtps.host` | SMTPS server address | `smtp.example.com` |
| `mail.smtps.port` | SMTPS port (default: 465) | `465` |
| `mail.smtps.auth` | Enable authentication | `true` |
| `mail.smtps.ssl.enable` | Enable SSL | `true` |

### Port Guidelines

- **Port 25**: Traditional SMTP (often blocked by ISPs)
- **Port 587**: Submission port with STARTTLS (recommended)
- **Port 465**: SMTPS with implicit TLS

---

## IMAP Configuration

### Required Properties

```
Name: <destination-name>
Type: MAIL
ProxyType: Internet | OnPremise
Authentication: BasicAuthentication | NoAuthentication
mail.imap4.host: <imap-server-address>
```

### Standard Properties

| Property | Description | Example |
|----------|-------------|---------|
| `mail.store.protocol` | Store protocol | `imap` |
| `mail.imap4.host` | IMAP server address | `imap.example.com` |
| `mail.imap4.port` | IMAP port (default: 143) | `143` |
| `mail.imap4.auth` | Enable authentication | `true` |
| `mail.user` | Username | `user@example.com` |
| `mail.password` | Password | `****` |
| `mail.imap4.from` | Email address | `user@example.com` |
| `mail.transport.protocol` | Protocol for sending | `imap` |

### IMAPS Properties (TLS/SSL)

| Property | Description | Example |
|----------|-------------|---------|
| `mail.store.protocol` | Secure store | `imaps` |
| `mail.imaps.host` | IMAPS server address | `imap.example.com` |
| `mail.imaps.port` | IMAPS port (default: 993) | `993` |
| `mail.imaps.ssl.enable` | Enable SSL | `true` |
| `mail.imaps.starttls.enable` | Enable STARTTLS | `true` |

---

## POP3 Configuration

### Required Properties

```
Name: <destination-name>
Type: MAIL
ProxyType: Internet | OnPremise
Authentication: BasicAuthentication | NoAuthentication
mail.pop3.host: <pop3-server-address>
```

### Standard Properties

| Property | Description | Example |
|----------|-------------|---------|
| `mail.store.protocol` | Store protocol | `pop3` |
| `mail.pop3.host` | POP3 server address | `pop3.example.com` |
| `mail.pop3.port` | POP3 port (default: 110) | `110` |
| `mail.pop3.auth` | Enable authentication | `true` |
| `mail.user` | Username | `user@example.com` |
| `mail.password` | Password | `****` |

### POP3S Properties (TLS/SSL)

| Property | Description | Example |
|----------|-------------|---------|
| `mail.store.protocol` | Secure store | `pop3s` |
| `mail.pop3s.host` | POP3S server address | `pop3.example.com` |
| `mail.pop3s.port` | POP3S port (default: 995) | `995` |
| `mail.pop3s.ssl.enable` | Enable SSL | `true` |

---

## Authentication Options

### BasicAuthentication

```json
{
  "Name": "my-mail-destination",
  "Type": "MAIL",
  "ProxyType": "Internet",
  "Authentication": "BasicAuthentication",
  "User": "user@example.com",
  "Password": "<password>",
  "mail.smtp.host": "smtp.example.com",
  "mail.smtp.port": "587",
  "mail.smtp.auth": "true"
}
```

### OAuth2ClientCredentials

```json
{
  "Name": "my-mail-destination",
  "Type": "MAIL",
  "ProxyType": "Internet",
  "Authentication": "OAuth2ClientCredentials",
  "clientId": "<client-id>",
  "clientSecret": "<client-secret>",
  "tokenServiceURL": "https://auth.example.com/oauth/token",
  "tokenServiceURLType": "Dedicated",
  "mail.smtp.host": "smtp.example.com",
  "mail.smtp.port": "587"
}
```

### OAuth2RefreshToken

```json
{
  "Name": "my-mail-destination",
  "Type": "MAIL",
  "ProxyType": "Internet",
  "Authentication": "OAuth2RefreshToken",
  "clientId": "<client-id>",
  "clientSecret": "<client-secret>",
  "tokenServiceURL": "https://auth.example.com/oauth/token",
  "refreshToken": "<refresh-token>",
  "mail.imap4.host": "imap.example.com"
}
```

---

## On-Premise Mail Destinations

For on-premise mail servers accessed via Cloud Connector:

```json
{
  "Name": "onprem-mail",
  "Type": "MAIL",
  "ProxyType": "OnPremise",
  "Authentication": "BasicAuthentication",
  "User": "mailuser",
  "Password": "<password>",
  "mail.smtp.host": "virtual-smtp-host",
  "mail.smtp.port": "25",
  "CloudConnectorLocationId": "my-location"
}
```

**Requirements**:
- Cloud Connector with access control configured for mail server
- Virtual host mapping in Cloud Connector
- TCP protocol enabled in access control

---

## Kubernetes/Transparent Proxy

### Consuming SMTP via Transparent Proxy

The Transparent Proxy performs SOCKS5 handshake automatically for on-premise mail connections.

**Multitenancy Support**:
```yaml
apiVersion: destination.connectivity.api.sap/v1
kind: Destination
metadata:
  name: smtp-destination
  annotations:
    transparent-proxy.connectivity.api.sap/tenant-subdomains: "tenant1,tenant2"
spec:
  destinationRef:
    name: my-smtp-destination
```

Creates separate Kubernetes services per tenant:
- `smtp-destination-tenant1.<namespace>`
- `smtp-destination-tenant2.<namespace>`

---

## Protocol Comparison

| Feature | SMTP | IMAP | POP3 |
|---------|------|------|------|
| **Purpose** | Send | Read/Manage | Download |
| **Message Storage** | N/A | Server-side | Client-side |
| **Folder Support** | N/A | Yes | No |
| **Sync Capability** | N/A | Full sync | Download only |
| **Best For** | Sending emails | Multi-device access | Single device |

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Connection refused | Wrong port | Verify port number |
| Authentication failed | Wrong credentials | Check user/password |
| SSL handshake error | Certificate issue | Verify TLS/SSL config |
| Timeout | Firewall blocking | Check network rules |

### Port Verification

```bash
# Test SMTP connectivity
telnet smtp.example.com 587

# Test IMAP connectivity
telnet imap.example.com 993

# Test with OpenSSL
openssl s_client -connect smtp.example.com:465
```

---

## Cloud Connector Limitation

**Important**: Mail (SMTP, IMAP, POP3) communication is **not supported** through Cloud Connector for internet-to-on-premise scenarios. Cloud Connector only supports:
- HTTP/HTTPS
- RFC/RFC-SNC
- TCP (via SOCKS5)
- LDAP/LDAPS

For on-premise mail, use TCP destinations with SOCKS5 proxy.

---

**Last Updated**: 2025-11-22
**Source Files**:
- smtp-426527a.md, smtps-897df97.md
- imap-6037066.md, imaps-ceb84cb.md
- pop3-387e3e4.md, pop3s-76db66c.md
- mail-destinations-584bc93.md, mail-destinations-e3de817.md
