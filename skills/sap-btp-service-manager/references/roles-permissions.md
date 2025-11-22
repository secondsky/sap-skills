# SAP Service Manager Roles and Permissions

Complete reference for SAP Service Manager plans, roles, and scopes.

**Documentation**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs/Service-Consumption/SAP-Service-Manager

---

## Service Manager Plans

Three broker plans with different access levels:

### 1. subaccount-admin

**Purpose**: Full administrative access to manage all resources in a subaccount.

**Use Case**: Administrators who need to create, update, and delete all service resources.

**Scopes** (10 total):

| Scope | Description |
|-------|-------------|
| `subaccount_broker_manage` | Create, update, delete brokers |
| `subaccount_broker_read` | Read broker information |
| `subaccount_platform_manage` | Create, update, delete platforms |
| `subaccount_platform_read` | Read platform information |
| `subaccount_service_instance_manage` | Create, update, delete instances |
| `subaccount_service_instance_read` | Read instance information |
| `subaccount_service_binding_manage` | Create, delete bindings |
| `subaccount_service_binding_read` | Read binding information |
| `subaccount_service_plan_read` | Read service plans |
| `subaccount_service_offering_read` | Read service offerings |

---

### 2. subaccount-audit

**Purpose**: Read-only access for monitoring and auditing.

**Use Case**: Auditors, monitoring systems, and read-only dashboards.

**Scopes** (6 total):

| Scope | Description |
|-------|-------------|
| `subaccount_broker_read` | Read broker information |
| `subaccount_platform_read` | Read platform information |
| `subaccount_service_instance_read` | Read instance information |
| `subaccount_service_binding_read` | Read binding information |
| `subaccount_service_plan_read` | Read service plans |
| `subaccount_service_offering_read` | Read service offerings |

**Note**: No manage/write permissions.

---

### 3. container

**Purpose**: Isolated access scoped to individual service instances.

**Use Case**: Applications that need to manage their own bindings without access to other resources.

**Visibility Rules**:
- Instances created via container credentials are visible from:
  - The container instance itself
  - Instances of subaccount-* plans
- NOT visible from other container instances

**Scopes** (7 total):

| Scope | Description |
|-------|-------------|
| `container_service_instance_manage` | Manage container-scoped instances |
| `container_service_instance_read` | Read container-scoped instances |
| `container_service_binding_manage` | Manage container-scoped bindings |
| `container_service_binding_read` | Read container-scoped bindings |
| `subaccount_service_plan_read` | Read service plans |
| `subaccount_service_offering_read` | Read service offerings |
| `subaccount_resource_read` | Read subaccount resources |

---

## Role Collections

### Subaccount Service Administrator

**Description**: Full management access to service resources in the subaccount.

**Permissions** (10):
- Manage and read brokers
- Manage and read platforms
- Manage and read service instances
- Manage and read service bindings
- Read service plans
- Read service offerings

**Assignment**:
1. Navigate to subaccount > Security > Trust Configuration
2. Select SAP ID Service
3. Enter user email
4. Click Show Assignments > Add User
5. Assign Role Collection > Subaccount Service Administrator

---

### Subaccount Service Viewer (Feature Set B)

**Description**: Read-only access to service resources.

**Permissions** (6):
- Read brokers
- Read platforms
- Read service instances
- Read service bindings
- Read service plans
- Read service offerings

**Note**: Available only in Feature Set B subaccounts.

---

## Plan Selection Guide

| Scenario | Recommended Plan |
|----------|------------------|
| Administrative automation | subaccount-admin |
| CI/CD pipelines | subaccount-admin |
| Monitoring dashboards | subaccount-audit |
| Security auditing | subaccount-audit |
| Application self-service | container |
| Isolated microservices | container |

---

## Scope Matrix

| Scope | subaccount-admin | subaccount-audit | container |
|-------|------------------|------------------|-----------|
| Broker manage | Yes | No | No |
| Broker read | Yes | Yes | No |
| Platform manage | Yes | No | No |
| Platform read | Yes | Yes | No |
| Instance manage (subaccount) | Yes | No | No |
| Instance manage (container) | No | No | Yes |
| Instance read (subaccount) | Yes | Yes | No |
| Instance read (container) | No | No | Yes |
| Binding manage (subaccount) | Yes | No | No |
| Binding manage (container) | No | No | Yes |
| Binding read (subaccount) | Yes | Yes | No |
| Binding read (container) | No | No | Yes |
| Plan read | Yes | Yes | Yes |
| Offering read | Yes | Yes | Yes |

---

## API Scope Requirements

### Platforms API

| Operation | Required Scope |
|-----------|----------------|
| List platforms | `subaccount_platform_read` |
| Get platform | `subaccount_platform_read` |
| Register platform | `subaccount_platform_manage` |
| Update platform | `subaccount_platform_manage` |
| Delete platform | `subaccount_platform_manage` |

### Brokers API

| Operation | Required Scope |
|-----------|----------------|
| List brokers | `subaccount_broker_read` |
| Get broker | `subaccount_broker_read` |
| Register broker | `subaccount_broker_manage` |
| Update broker | `subaccount_broker_manage` |
| Delete broker | `subaccount_broker_manage` |

### Instances API

| Operation | Required Scope (subaccount) | Required Scope (container) |
|-----------|----------------------------|---------------------------|
| List instances | `subaccount_service_instance_read` | `container_service_instance_read` |
| Get instance | `subaccount_service_instance_read` | `container_service_instance_read` |
| Create instance | `subaccount_service_instance_manage` | `container_service_instance_manage` |
| Update instance | `subaccount_service_instance_manage` | `container_service_instance_manage` |
| Delete instance | `subaccount_service_instance_manage` | `container_service_instance_manage` |

### Bindings API

| Operation | Required Scope (subaccount) | Required Scope (container) |
|-----------|----------------------------|---------------------------|
| List bindings | `subaccount_service_binding_read` | `container_service_binding_read` |
| Get binding | `subaccount_service_binding_read` | `container_service_binding_read` |
| Create binding | `subaccount_service_binding_manage` | `container_service_binding_manage` |
| Delete binding | `subaccount_service_binding_manage` | `container_service_binding_manage` |

### Plans & Offerings API

| Operation | Required Scope |
|-----------|----------------|
| List plans | `subaccount_service_plan_read` |
| Get plan | `subaccount_service_plan_read` |
| List offerings | `subaccount_service_offering_read` |
| Get offering | `subaccount_service_offering_read` |

---

## Token Scope Verification

**Check token scopes**:
```bash
# Decode JWT token (without verification)
echo "<access_token>" | cut -d'.' -f2 | base64 -d | jq '.scope'
```

**Expected format**:
```json
{
  "scope": [
    "<xsappname>.subaccount_service_instance_manage",
    "<xsappname>.subaccount_service_instance_read",
    ...
  ]
}
```

---

## Best Practices

1. **Principle of Least Privilege**: Use audit plan for read-only needs
2. **Container Isolation**: Use container plan for application self-service
3. **Separate Credentials**: Different credentials for different environments
4. **Rotate Credentials**: Regular rotation of client secrets
5. **Audit Access**: Monitor who has admin access
6. **X.509 for Production**: Use certificate auth in production

---

## Documentation Links

- **Broker Plans**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/sap-service-manager-broker-plans-917a8a7.md
- **Roles**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/sap-service-manager-roles-d95fbe7.md
- **Role Assignment**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/assign-the-subaccount-service-administrator-collection-0735965.md
