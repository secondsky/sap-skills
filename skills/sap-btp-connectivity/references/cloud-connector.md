# Cloud Connector - Complete Reference

**Source**: https://github.com/SAP-docs/btp-connectivity/blob/main/docs/1-connectivity-documentation/cloud-connector-e6c7616.md

---

## Overview

The Cloud Connector is an on-premise agent that acts as a reverse invoke proxy between on-premise networks and SAP BTP. It enables secure tunneling without exposing on-premise systems directly to the internet.

### Key Features
- Fine-grained access control
- Automatic connection recovery
- Audit logging
- High availability support
- HTTP, RFC, LDAP, and TCP protocols

---

## Installation

### Supported Platforms

| Platform | Installer | Portable |
|----------|-----------|----------|
| Windows (x86-64) | MSI | ZIP |
| Linux (x86-64) | RPM/DEB | TAR.GZ |
| Linux (PowerPC LE) | RPM | TAR.GZ |
| macOS (ARM64) | - | TAR.GZ |

### Production Installation (Installer)

**Windows:**
```powershell
# Download MSI from SAP Tools
# Run installer as Administrator
# Service registered as "SAP Cloud Connector"
```

**Linux (RPM):**
```bash
sudo rpm -i sapcc-<version>-linux-x64.rpm
# Service: scc_daemon
sudo systemctl start scc_daemon
sudo systemctl enable scc_daemon
```

**Linux (DEB):**
```bash
sudo dpkg -i sapcc-<version>-linux-x64.deb
sudo systemctl start scc_daemon
sudo systemctl enable scc_daemon
```

### Development Installation (Portable)

```bash
# Extract archive to empty directory
unzip sapcc-<version>-linux-x64.zip -d /opt/scc-portable

# Set JAVA_HOME
export JAVA_HOME=/path/to/jdk

# Start manually
cd /opt/scc-portable
./go.sh  # Linux/macOS
go.bat   # Windows
```

**Portable Limitations:**
- Cannot run as background service
- No automatic upgrades
- Not for production use

---

## Initial Configuration

### Access Administration UI

```
URL: https://<hostname>:8443
Default Port: 8443 (HTTPS)
```

### Default Credentials

```
Username: Administrator
Password: manage
```

**CRITICAL SECURITY REQUIREMENT**: Complete password change before proceeding to subaccount configuration.

### Setup Wizard

1. Accept license agreement
2. **Change administrator password** (mandatory - do not skip)
3. Select installation mode:
   - **Master**: Primary instance
   - **Shadow**: Backup for high availability
4. Add optional description
5. Add first subaccount

---

## Subaccount Configuration

### Add Subaccount

1. Navigate to **Connector > Define Subaccount**
2. Enter:
   - **Region**: SAP BTP region (e.g., `cf.eu10.hana.ondemand.com`)
   - **Subaccount**: Technical name (subaccount ID)
   - **Display Name**: Friendly name
   - **Subaccount User**: Email of BTP user
   - **Password**: BTP password
   - **Location ID**: Optional identifier for multiple connectors

### Connection Status Indicators

| Color | Meaning |
|-------|---------|
| Green | Connected and valid |
| Yellow | Warning (certificate expiring) |
| Red | Error or disconnected |

---

## Access Control

### Backend System Types

| Type | Supported Protocols |
|------|---------------------|
| ABAP System | HTTP(S), RFC(S), TCP(S) |
| SAP Gateway | HTTP(S), RFC(S), TCP(S) |
| SAP HANA | HTTP(S), TCP(S) |
| Other SAP System | HTTP(S), TCP(S) |
| Non-SAP System | HTTP(S), TCP(S), LDAP(S) |
| SAP Application Server Java | HTTP(S) |

### HTTP Access Control

1. **Add System Mapping**
   - Virtual Host: Name exposed to cloud applications
   - Internal Host: Actual hostname in on-premise network
   - Virtual Port: Port exposed (typically 443)
   - Internal Port: Actual port
   - Protocol: HTTP or HTTPS

2. **Add Resources**
   - Path: URL path to expose
   - Policy:
     - `Path Only`: Exact path match
     - `Path and All Sub-Paths`: Path and children
   - Access Policy: Allowed or Denied

### RFC Access Control

1. **Add System Mapping**
   - Virtual Host: Name for RFC destinations
   - Internal Host: SAP system hostname
   - Virtual Port: Instance number × 100 + 33 (e.g., 3300 for instance 00)
   - Protocol: RFC or RFC/SNC

2. **Optionally restrict function modules**

### LDAP Access Control

1. **Add System Mapping**
   - Virtual Host/Port
   - Internal Host/Port
   - Protocol: LDAP or LDAPS

---

## High Availability

### Master-Shadow Architecture

```
                    ┌─────────────────┐
                    │   SAP BTP       │
                    │   Cloud Region  │
                    └────────┬────────┘
                             │ Tunnel
                    ┌────────┴────────┐
         ┌──────────┤   Connectivity   ├──────────┐
         │          │     Service      │          │
         │          └─────────────────┘          │
         │                                        │
    ┌────┴────┐                              ┌────┴────┐
    │ Master  │◄─────── Config Sync ────────►│ Shadow  │
    │   CC    │                              │   CC    │
    └────┬────┘                              └────┬────┘
         │                                        │
         └────────────┬──────────────────────────┘
                      │
              On-Premise Systems
```

### Configuration

**Master Instance:**
1. Select "Master" during initial setup
2. Configure normally

**Shadow Instance:**
1. Select "Shadow" during initial setup
2. Enter Master hostname and port
3. Shadow connects to Master and syncs configuration

### Failover Behavior

1. Shadow monitors Master via ping checks
2. If Master unreachable, Shadow becomes active
3. Shadow takes over tunnel connection
4. When Master recovers, manual switchback may be needed

**Warning**: Network issues between Master and Shadow can cause split-brain scenarios.

**Split-Brain Recovery**:
1. Stop both instances immediately
2. Check logs to identify which instance was most recently active
3. Designate one as Master, one as Shadow
4. Clear state on the Shadow instance if needed
5. Restart both in correct roles (Master first)
6. Verify configuration sync completes successfully

---

## Sizing Recommendations

### Master Instance

| Scenario | CPU | Memory | Disk |
|----------|-----|--------|------|
| Small (< 100 req/s) | 2 cores | 4 GB | 50 GB |
| Medium (100-500 req/s) | 4 cores | 8 GB | 100 GB |
| Large (> 500 req/s) | 8 cores | 16 GB | 200 GB |

### Shadow Instance

- Same as Master for failover capability

### Server Requirements

- **Minimum**: 3 servers (dev, prod master, prod shadow)
- **Recommended**: Separate physical hardware for master/shadow
- Consider disaster recovery instances

---

## Monitoring

### Windows Service Status
```powershell
sc query "SAP Cloud Connector"
```

### Linux Daemon Status
```bash
systemctl status scc_daemon
# or
service scc_daemon status
```

### Administration UI

1. **Subaccount Dashboard**: Connection states
2. **Hardware Metrics**: CPU, memory, disk
3. **Performance Monitor**: Request statistics
4. **Audit Logs**: Configuration changes and access

### Monitoring APIs

Cloud Connector exposes REST APIs for external monitoring tools:
- Health check endpoints
- Performance metrics
- Connection status

---

## Audit Logging

### Configuration

1. Navigate to **Configuration > Audit**
2. Set audit level:
   - **Off**: No logging
   - **Security**: Authentication and authorization events
   - **All**: Complete audit trail (recommended for production)

### Log Management

- Logs stored locally
- Configure rotation and archival
- Export for SIEM integration

---

## Backup and Restore

### Configuration Backup

**Via UI:**
1. Navigate to **Configuration > Backup**
2. Click **Download Backup**
3. Save encrypted backup file

**Via REST API:**
```bash
curl -X GET "https://localhost:8443/api/v1/configuration/backup" \
  -H "Authorization: Basic <credentials>" \
  --output backup.zip
```

### Restore

1. Fresh install on new machine
2. Navigate to **Configuration > Backup**
3. Upload backup file
4. Restart Cloud Connector

---

## Security Guidelines

### Network Deployment
- Deploy in DMZ
- Under IT department control
- Firewall between Cloud Connector and internal systems

### OS-Level Protection
- Restrict OS access to administrators
- Dedicate machine to Cloud Connector
- Enable hard-drive encryption
- Enable OS audit logging

### Administration UI
- Change default password immediately
- Configure LDAP for user management
- Replace self-signed certificate
- Restrict UI access to localhost (high-security)

### Protocols
- Use HTTPS for HTTP connections
- Use SNC for RFC connections
- Use LDAPS for LDAP connections

---

## Common Operations

### Upgrade

1. Download new version
2. Stop Cloud Connector service
3. Run installer (configuration preserved)
4. Start service
5. Verify functionality

### Certificate Renewal

1. Navigate to **Configuration > On Premise > System Certificate**
2. Generate new CSR or upload new certificate
3. If using Cloud Connector CA: renew via subaccount dashboard

### Change Administrator Password

1. Navigate to **Configuration > User Interface**
2. Enter current password
3. Enter new password
4. Click **Change Password**

---

## Troubleshooting

### Cannot Connect to Subaccount

1. Verify region URL
2. Check firewall allows outbound HTTPS (port 443)
3. Verify credentials
4. Check proxy settings if behind corporate proxy

### Access Denied to Resource

1. Verify system mapping exists
2. Check resource path matches
3. Verify policy allows access
4. Check virtual host/port in destination

### Performance Issues

1. Check hardware metrics
2. Increase JVM heap if needed
3. Review access control rules (too permissive can cause overhead)
4. Consider additional instances

---

## Documentation Links

- Cloud Connector Overview: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector
- Installation: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/installation
- Initial Configuration: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/initial-configuration
- High Availability: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/high-availability-setup
- Security Guidelines: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/security-guidelines
- FAQ: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/frequently-asked-questions

---

**Last Updated**: 2025-11-22
