# Operational Guides Reference

Network architecture, connectivity directions, solution management, and operational best practices.

**Source**: https://github.com/SAP-docs/btp-connectivity/tree/main/docs/1-connectivity-documentation

---

## Network Zones

### Zone Architecture

Organizations typically divide networks into security zones:

| Zone | Security Level | Typical Systems |
|------|---------------|-----------------|
| **Internet** | External/Untrusted | Public services |
| **DMZ** | Perimeter | Firewalls, proxies |
| **Intranet** | Internal/Trusted | Business applications |
| **Secure Zone** | High Security | Databases, core systems |

### Cloud Connector Deployment Options

**Option 1: DMZ Deployment**
```
Internet → Firewall → [Cloud Connector in DMZ] → Firewall → Intranet
```

**Benefits**:
- Centralized IT operation
- External-facing service exposure
- Enhanced security perimeter

**Requirements**:
- Internet access to SAP BTP region hosts (direct or HTTPS proxy)
- Network access to internal backend systems

**Option 2: Intranet Deployment**
```
Internet → Firewall → DMZ → Firewall → [Cloud Connector in Intranet]
```

**Benefits**:
- Line of business operational control
- Direct access to internal systems
- Simpler internal network configuration

**Requirements**:
- Direct, transparent connectivity to backend systems
- Outbound HTTPS to SAP BTP

### Network Requirements

**Standard Ports**:

| Protocol | Port | Direction | Purpose |
|----------|------|-----------|---------|
| HTTPS | 443 | Outbound | BTP connectivity |
| HTTP | 80 | Outbound | (Optional) redirect |

**RFC Communication**:

| Port Type | Port Number | Description |
|-----------|-------------|-------------|
| Gateway | 33+instance (e.g., 3300) | RFC gateway |
| Message Server | Arbitrary | Load balancing |
| Dispatcher | 32+instance | Work process |

**Database Connectivity (HANA JDBC)**:
- Arbitrary outbound port required
- Configurable in HANA connection properties

### Firewall Configuration

Cloud Connector requires transparent access to:
- SAP BTP region hosts (see regional host list)
- Backend systems on configured ports
- Optional: HTTPS proxy server

**Important**: Mail (SMTP) is **not supported** through Cloud Connector.

---

## Connectivity Directions

### Inbound Connectivity (Cloud-to-On-Premise)

**Architecture**:
```
SAP BTP → Cloud Connector Tunnel → On-Premise Systems
```

**Key Characteristics**:
- Reverse invoke proxy model
- Cloud Connector administrator controls tunnel
- TLS encryption with mutual authentication
- Subaccount isolation enforced

**Security Features**:
- Explicit resource exposure (deny by default)
- Virtual host mapping hides physical infrastructure
- Application-level access restrictions
- Comprehensive audit logging

**Supported Protocols**:
- HTTP/HTTPS
- RFC (with SNC option)

**Configuration**:
1. Install Cloud Connector
2. Connect to BTP subaccount
3. Configure access control for target systems
4. Create destinations with `ProxyType: OnPremise`

### Outbound Connectivity (On-Premise-to-Cloud)

**Architecture**:
```
On-Premise Tools → Cloud Connector Tunnel → SAP BTP (HANA DB)
```

**Primary Use Case**:
Database tunnel for JDBC/ODBC access to cloud databases.

**Supported Tools**:
- SAP Lumira
- SAP BusinessObjects Enterprise (BOE)
- SAP Data Services
- Any JDBC/ODBC client

**Protocol Limitation**:
> The database tunnel only allows JDBC and ODBC connections. Reuse for other protocols is not possible.

**Security**:
- Same TLS + mutual authentication as inbound
- Audit logging of all activities

**Required Users**:

| User Type | Purpose | Managed By |
|-----------|---------|------------|
| Platform User | Tunnel establishment | BTP subaccount |
| Database User | HANA access | HANA role/privilege |

---

## Solution Management Integration

### Overview

Integrate Cloud Connector with SAP Solution Management for monitoring and operations.

### Prerequisites

- SAP Host Agent installed on Cloud Connector host
- Cloud Connector 2.x or later
- Solution Manager system configured

### Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `hostAgentPath` | String | Host agent directory (optional) |
| `enabled` | Boolean | Enable/disable integration |
| `dsrEnabled` | Boolean | Enable Detailed System Report |

### REST API Operations

**Get Current Configuration**:
```bash
curl -X GET "https://localhost:8443/api/v1/configuration/connector/solutionManagement" \
  -H "Authorization: Basic ${auth}" \
  -k
```

**Enable Solution Management**:
```bash
curl -X POST "https://localhost:8443/api/v1/configuration/connector/solutionManagement" \
  -H "Authorization: Basic ${auth}" \
  -H "Content-Type: application/json" \
  -d '{"enabled": true, "dsrEnabled": true}' \
  -k
```

**Disable Solution Management**:
```bash
curl -X DELETE "https://localhost:8443/api/v1/configuration/connector/solutionManagement" \
  -H "Authorization: Basic ${auth}" \
  -k
```

**Download Registration File**:
```bash
curl -X GET "https://localhost:8443/api/v1/configuration/connector/solutionManagement/registrationFile" \
  -H "Authorization: Basic ${auth}" \
  -o registration.xml \
  -k
```

### HA Environment Notes

- Configuration on shadow modifies settings only
- Activation requires master instance
- Master changes propagate to shadow automatically

---

## Operational Modes (Kubernetes)

### Standard Mode

Default deployment mode:
- Single namespace operation
- Standard Kubernetes RBAC
- Operator manages resources in deployment namespace

### Managed Namespaces Mode

For multi-tenant Kubernetes clusters:

```yaml
# Connectivity Proxy configuration
config:
  managedNamespaces:
    enabled: true
    namespaces:
      - tenant-a
      - tenant-b
      - shared-services
```

**Features**:
- Operator watches multiple namespaces
- Tenant isolation preserved
- Centralized proxy deployment

---

## Release and Maintenance Strategy

### Cloud Connector Releases

**Release Cadence**:
- Major versions: ~annually
- Minor versions: quarterly
- Patch versions: as needed

**Support Timeline**:
- Current version: Full support
- N-1 version: Maintenance support
- N-2 and older: Best effort / end of support

### Upgrade Recommendations

1. Review release notes for breaking changes
2. Test in non-production first
3. Plan downtime window (typically <30 min)
4. Backup configuration before upgrade
5. Verify connectivity after upgrade

### Kubernetes Proxy Releases

**Helm Chart Updates**:
```bash
# Check for updates
helm search repo sapse/connectivity-proxy --versions

# Upgrade
helm upgrade connectivity-proxy \
  oci://registry-1.docker.io/sapse/connectivity-proxy \
  --version <new-version> \
  -f values.yaml
```

---

## UI Configuration

### Change UI Port

Default: `8443`

**Linux/macOS**:
```bash
# Edit configuration
vi /opt/sap/scc/config.ini

# Add or modify
[https]
port = 9443

# Restart service
service scc_daemon restart
```

**Windows**:
```
# Edit configuration
notepad C:\SAP\scc\config.ini

# Add or modify
[https]
port = 9443

# Restart service (as Administrator)
net stop "SAP Cloud Connector"
net start "SAP Cloud Connector"
```

### Login Screen Customization

Configure in Cloud Connector UI:
- **Configuration > UI Settings > Login Screen**

Customizable elements:
- Company logo
- Welcome message
- Custom CSS
- Footer text

### Theming

Cloud Connector supports SAP Fiori theming:
- Default: SAP Belize
- Custom themes: Import via UI Settings

---

## LDAP User Administration

### Configuration

Enable LDAP for Cloud Connector user management:

1. **Configuration > User Interface > User Management**
2. Select "LDAP" as authentication method
3. Configure LDAP server settings:

```
ldap.server.host = ldap.company.com
ldap.server.port = 636
ldap.server.ssl = true
ldap.base.dn = dc=company,dc=com
ldap.user.dn = cn=scc-user,ou=services,dc=company,dc=com
ldap.user.password = ****
ldap.user.search.filter = (&(objectClass=user)(sAMAccountName={0}))
ldap.group.search.filter = (&(objectClass=group)(member={0}))
```

### LDAP Best Practices

- Use LDAPS (port 636) for encrypted connections
- Create dedicated service account for binding
- Use specific search filters to limit scope
- Map Cloud Connector roles to LDAP groups:
  - `scc-admin` → Full administration
  - `scc-support` → Monitoring only
  - `scc-display` → Read-only access

---

## Named Cloud Connector Users

### Configuration

Assign named users for audit trail clarity:

1. **Configuration > Access Control > Named Users**
2. Add users with specific roles:

| Role | Permissions |
|------|-------------|
| Administrator | Full access |
| Support | Monitoring, logs |
| Display | Read-only |

### LDAP Group Mapping

```
Administrator = CN=SCC-Admins,OU=Groups,DC=company,DC=com
Support = CN=SCC-Support,OU=Groups,DC=company,DC=com
Display = CN=SCC-Viewers,OU=Groups,DC=company,DC=com
```

---

## Advanced Configuration

### Tunnel Connection Settings

**Configuration > Cloud Connector > Advanced Settings**

| Setting | Default | Description |
|---------|---------|-------------|
| Keep-Alive Interval | 60s | Heartbeat frequency |
| Reconnect Delay | 30s | Wait before reconnect |
| Connection Timeout | 30s | Initial connect timeout |
| Max Connections | 100 | Connection pool size |

### Custom Regions

For private cloud deployments:

```
region.custom.name = Private Cloud
region.custom.host = connectivity.private.company.com
region.custom.port = 443
```

### Firewall Rule Configuration

**SAP BTP Destination Service IPs**:

Contact SAP Support for region-specific IP ranges for firewall whitelisting.

**General Pattern**:
```
# Allow outbound to BTP
ALLOW tcp/443 -> *.hana.ondemand.com
ALLOW tcp/443 -> *.authentication.<region>.hana.ondemand.com
```

---

## Automatic Resource Pickup

### Kubernetes Configuration

Transparent Proxy can automatically detect destination changes:

```yaml
# Transparent Proxy values
config:
  destinationRefresh:
    enabled: true
    interval: 300  # seconds
```

### Event-Based Pickup

Configure webhook notifications:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: transparent-proxy-config
data:
  destination-webhook: "true"
  webhook-url: "http://callback-service/destination-update"
```

---

**Last Updated**: 2025-11-22
**Source Files**:
- network-zones-7b9d90c.md, network-zones-88efb23.md
- inbound-connectivity-90932cf.md
- outbound-connectivity-a2ca4e8.md
- solution-management-integration-1dfef61.md
- configure-solution-management-integration-3a058a2.md
- operational-modes-148bbad.md
- managed-namespaces-mode-6588a65.md
- release-and-maintenance-strategy-7c3b531.md
- change-the-ui-port-ca5af74.md
- configure-login-screen-information-916df5b.md
- theming-e7e8197.md
- use-ldap-for-user-administration-120ceec.md
- configure-named-cloud-connector-users-3859e50.md
- automatic-pickup-on-resource-changes-78ddb8f.md
