# Administration Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Administering

---

## Table of Contents

1. [Tenant Configuration](#tenant-configuration)
2. [Spaces and Storage](#spaces-and-storage)
3. [Users and Roles](#users-and-roles)
4. [Identity and Authentication](#identity-and-authentication)
5. [Monitoring](#monitoring)
6. [Elastic Compute Nodes](#elastic-compute-nodes)
7. [Data Provisioning Agent](#data-provisioning-agent)
8. [System Maintenance](#system-maintenance)

---

## Tenant Configuration

### Creating a Tenant

**SAP BTP Service Instance**:
1. Access SAP BTP Cockpit
2. Navigate to Subaccount
3. Create SAP Datasphere service instance
4. Configure initial sizing

**Plan Options**:
| Plan | Description |
|------|-------------|
| Free | Trial with limitations |
| Standard | Production use |

### Configuring Tenant Size

**Capacity Parameters**:
- Storage (GB)
- In-memory (GB)
- Compute units

**Sizing Recommendations**:
| Use Case | Storage | Memory |
|----------|---------|--------|
| Small | 256 GB | 32 GB |
| Medium | 1 TB | 128 GB |
| Large | 4 TB+ | 512 GB+ |

### System Information

**Display System Info**:
- System > About
- View tenant ID
- Check version
- Monitor capacity usage

### SAP HANA Configuration

**Enable Script Server**:
1. System > Configuration
2. Enable SAP HANA Cloud Script Server
3. Required for Python, R, AFL

**Enable SQL Data Warehousing**:
1. System > Configuration
2. Enable SAP HANA SQL Data Warehousing
3. Allows HDI container deployment

### Additional Features

**Enable SAP Business AI**:
- AI-powered features
- Intelligent recommendations
- Natural language queries

**Enable Choropleth Layers**:
- Geographic visualizations
- Map-based analytics

### OAuth 2.0 Configuration

**Client Types**:
| Type | Purpose |
|------|---------|
| Technical User | System-to-system integration |
| API Access | REST API calls |
| Interactive Usage | User authentication |

**Creating OAuth Client**:
1. System > Security > OAuth 2.0 Clients
2. Create new client
3. Configure client type
4. Note client ID and secret

**API Access Configuration**:
```json
{
  "clientid": "sb-xxx",
  "clientsecret": "xxx",
  "url": "https://xxx.authentication.xxx.hana.ondemand.com",
  "apiurl": "https://xxx.hana.ondemand.com"
}
```

### Trusted Identity Providers

Add external IdP for authentication:
1. System > Security > Identity Providers
2. Add trusted IdP
3. Configure SAML settings
4. Map user attributes

---

## Spaces and Storage

### Creating Spaces

**Standard Space**:
1. Space Management > Create
2. Enter space name
3. Configure storage
4. Assign users

**File Space**:
1. Space Management > Create File Space
2. Configure object store
3. Set data lake connection

### Space Properties

**Initial Creation Fields**:
| Property | Specifications |
|----------|----------------|
| Space Name | Maximum 30 characters; allows spaces and special characters |
| Space ID | Maximum 20 UPPERCASE letters/numbers; underscores only |
| Storage Type | SAP HANA Database (Disk and In-Memory) |

**General Settings (Read-Only)**:
- Space Status (newly-created spaces are active)
- Space Type (SAP Datasphere only)
- Created By/On timestamps
- Deployment Status and Deployed On

**Optional Configuration**:
| Setting | Description |
|---------|-------------|
| Data Access | Exposure for consumption defaults |
| Database User | Create for external tool connections |
| HDI Container | Associate HDI container |
| Time Data | Generate standardized time tables/dimensions |
| Auditing | Enable read/change action logging |

**Deployment**: Spaces require deployment after creation and re-deployment after modifications.

### Technical Naming Rules (Space ID)

**Valid Space IDs**:
- UPPERCASE letters, numbers, underscores only
- Maximum 20 characters
- No spaces or special characters

**Reserved Prefixes (Avoid)**:
- `_SYS` - System reserved
- `DWC_` - Datasphere reserved
- `SAP_` - SAP reserved

**Example**: `SALES_ANALYTICS_2024`

### Storage Allocation

**Allocate Storage**:
1. Open space settings
2. Set disk storage (GB)
3. Set in-memory storage (GB)
4. Save changes

**Storage Types**:
| Type | Use | Performance |
|------|-----|-------------|
| Disk | Persistent data | Standard |
| In-Memory | Hot data | High |
| Object Store | Large files | Cost-effective |

### Space Priorities

**Priority Levels**:
1. High: Critical workloads
2. Medium: Standard workloads
3. Low: Background tasks

**Statement Limits**:
- Maximum memory per query
- Query timeout
- Concurrent connections

### Space Operations

**Copy Space**:
1. Space Management
2. Select source space
3. Copy with/without data
4. New space name

**Delete Space**:
1. Remove all objects
2. Remove all users
3. Delete space

**Restore from Recycle Bin**:
1. System > Recycle Bin
2. Select deleted space
3. Restore or permanently delete

### Command Line Management

**datasphere CLI**:
```bash
# Login
datasphere login

# List spaces
datasphere spaces list

# Create space
datasphere spaces create --name my_space --storage 100

# Delete space
datasphere spaces delete --name my_space
```

---

## Users and Roles

### User Management

**Creating Users**:
1. Security > Users
2. Create user
3. Enter email
4. Assign roles

**User Properties**:
| Property | Description |
|----------|-------------|
| Email | Login identifier |
| First Name | Display name |
| Last Name | Display name |
| Manager | Reporting structure |

### Role Types

**Global Roles**:
- Apply across all spaces
- System-level permissions

**Scoped Roles**:
- Space-specific permissions
- Object-level access

### Standard Roles

| Role | Description |
|------|-------------|
| DW Administrator | Full system access |
| DW Space Administrator | Space management |
| DW Integrator | Data integration |
| DW Modeler | Data modeling |
| DW Viewer | Read-only access |

### Role Privileges

**System Privileges**:
- Lifecycle: Deploy, monitor, transport
- User Management: Create, assign users
- Security: Manage access controls

**Space Privileges**:
- Create Objects
- Read Objects
- Update Objects
- Delete Objects
- Share Objects

### Creating Custom Roles

1. Security > Roles > Create
2. Enter role name
3. Select privileges
4. Assign to users

### Scoped Roles

**Creating Scoped Role**:
1. Security > Roles > Create Scoped
2. Define base privileges
3. Assign spaces
4. Assign users

**Scope Options**:
- All spaces
- Selected spaces
- Space categories

### Role Assignment

**Direct Assignment**:
- Security > Users > Assign Roles

**SAML Attribute Mapping**:
- Map IdP attributes to roles
- Automatic role assignment
- Dynamic membership

### SCIM 2.0 API

**User Provisioning**:
```http
POST /api/v1/scim/Users
Content-Type: application/json

{
  "userName": "user@example.com",
  "name": {
    "givenName": "John",
    "familyName": "Doe"
  },
  "emails": [{"value": "user@example.com"}]
}
```

### View Authorizations

**By User**:
- All roles assigned
- All spaces accessible
- Effective permissions

**By Role**:
- All users with role
- Permission details

**By Space**:
- All users in space
- Role breakdown

---

## Identity and Authentication

### SAP Cloud Identity Services

**Bundled IdP**:
- Included with SAP Datasphere
- Basic user management
- SAML 2.0 support

**Configuration**:
1. Access Identity Authentication admin
2. Configure application
3. Set user attributes
4. Enable SSO

### Custom SAML Identity Provider

**Requirements**:
- SAML 2.0 compliant IdP
- Metadata exchange
- Attribute mapping

**Setup**:
1. Export Datasphere SAML metadata
2. Import to IdP
3. Export IdP metadata
4. Import to Datasphere
5. Configure attribute mapping

**SAML Attributes**:
| Attribute | Purpose |
|-----------|---------|
| email | User identification |
| firstName | Display name |
| lastName | Display name |
| groups | Role assignment |

### Certificate Management

**SAML Signing Certificates**:
- Update before expiration
- Coordinate with IdP
- Test after update

### Database User Password Policy

**Policy Settings**:
- Minimum length
- Complexity requirements
- Expiration period
- History depth

---

## Monitoring

### Capacity Monitoring

**Monitor**:
- Storage usage
- Memory consumption
- Compute utilization

**Alerts**:
- Configure thresholds
- Email notifications
- Automatic warnings

### Audit Logs

**Database Audit Logs**:
- DDL operations (CREATE, ALTER, DROP)
- DML operations (SELECT, INSERT, UPDATE, DELETE)
- Login/logout events

**Configuration**:
1. System > Audit
2. Enable audit logging
3. Select event types
4. Set retention period

**Delete Audit Logs**:
- Manual deletion
- Scheduled cleanup
- Retention-based removal

### Activity Logs

**Tracked Activities**:
- Object creation
- Object modification
- Object deletion
- Deployments

### Task Logs

**Task Types Logged**:
- Data flows
- Replication flows
- Transformation flows
- Task chains

**Log Management**:
- View execution history
- Download logs
- Delete old logs

### Notifications

**Configure Notifications**:
1. User profile > Notifications
2. Select event types
3. Choose delivery method

**Notification Types**:
- Task completion
- Task failure
- System alerts
- Capacity warnings

### Database Analysis Users

**Create Analysis User**:
1. System > Monitoring
2. Create database analysis user
3. Grant analysis privileges
4. Connect with SQL tools

**Analysis Capabilities**:
- Query monitoring views
- Analyze execution plans
- Debug performance issues

**Stop Running Statements**:
```sql
-- Find running statements
SELECT * FROM M_ACTIVE_STATEMENTS;

-- Cancel statement
ALTER SYSTEM CANCEL SESSION 'connection_id';
```

### SAP HANA Monitoring Views

**System Views**:
| View | Purpose |
|------|---------|
| M_ACTIVE_STATEMENTS | Running queries |
| M_CONNECTIONS | Active connections |
| M_SERVICE_MEMORY | Memory usage |
| M_VOLUME_IO | I/O statistics |

---

## Elastic Compute Nodes

### Overview

Elastic compute nodes provide additional processing capacity for intensive workloads.

### Creating Elastic Compute Node

1. System > Elastic Compute Nodes
2. Create new node
3. Configure capacity
4. Set warm-up schedule

### Node Configuration

| Parameter | Description |
|-----------|-------------|
| Node Name | Identifier |
| Capacity | Processing units |
| Warm-up Time | Pre-start minutes |
| Auto-shutdown | Idle timeout |

### Running Elastic Compute

**Start Node**:
1. Select node
2. Start manually or schedule
3. Wait for warm-up
4. Execute workloads

**Assign Workloads**:
- Data flows
- Transformation flows
- Specific queries

### Resource Purchase

**Capacity Units**:
- Billed by consumption
- Pre-purchase options
- Monitor usage

---

## Data Provisioning Agent

### Installation

**Requirements**:
- Java 11+
- Network access to sources
- Network access to Datasphere

**Installation Steps**:
1. Download agent from SAP
2. Install on-premise server
3. Configure connection
4. Register with Datasphere

### Configuration

**Agent Properties**:
```properties
# Connection settings
datasphere.tenant.url=https://xxx.hana.ondemand.com
datasphere.agent.name=dp_agent_01

# Performance settings
datasphere.threads.max=10
datasphere.batch.size=10000
```

### Adapter Registration

**Register Adapters**:
1. System > Data Provisioning
2. Select agent
3. Register adapter
4. Configure connection

**Supported Adapters**:
- ABAP ODP
- HANA SDI
- File adapters
- Database adapters

### Agent Monitoring

**Status Monitoring**:
- Connection status
- Replication status
- Error logs

**Log Access**:
1. Enable log access
2. View logs in Datasphere
3. Download for analysis

### Pause Replication

**Pause Agent**:
- Maintenance window
- Network issues
- Source system updates

**Resume Agent**:
- Verify connectivity
- Check queue status
- Resume replication

---

## System Maintenance

### HANA Database Operations

**Restart Database**:
1. System > HANA Cloud
2. Restart database
3. Wait for recovery
4. Verify connections

**Apply Patch Upgrades**:
1. Review available patches
2. Schedule maintenance window
3. Apply patch
4. Validate functionality

### Support Requests

**Request SAP Support**:
1. System > Support
2. Create incident
3. Provide details
4. Attach logs

**Required Information**:
- Tenant ID
- Error messages
- Steps to reproduce
- Screenshots/logs

---

## Documentation Links

- **Tenant Configuration**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/2f80b57
- **Space Management**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/2ace657
- **User Management**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/4fb82cb
- **Monitoring**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/28910cd

---

**Last Updated**: 2025-11-22
