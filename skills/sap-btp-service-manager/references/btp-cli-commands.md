# BTP CLI Service Manager Commands

The SAP BTP CLI (`btp`) provides service management commands as an alternative to SMCTL.

**Documentation**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs/Service-Consumption/SAP-Service-Manager

---

## Prerequisites

1. Install BTP CLI: https://tools.hana.ondemand.com/#cloud
2. Login: `btp login`
3. Set target: `btp target --subaccount <subaccount-id>`

---

## Service Instance Commands

### btp create services/instance

Create a new service instance.

**Syntax**:
```bash
btp create services/instance [parameters]
```

**Required Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID (skip if target set) |
| `-s, --service <name>` | Service name |
| `-p, --plan <id>` | Service plan ID |

**Optional Parameters**:
| Parameter | Description |
|-----------|-------------|
| `--parameters <json>` | JSON configuration |
| `-l, --labels <json>` | Labels as JSON |

**Label Format**:
```json
{"<label_name>": ["<label_value>"]}
```
- Keys: max 100 chars, alphanumeric + `.` `_` `-`
- Values: arrays of unique strings, max 255 chars each

**Examples**:
```bash
# Basic creation
btp create services/instance \
  --subaccount abc-123 \
  --service xsuaa \
  --plan application

# With parameters
btp create services/instance \
  --subaccount abc-123 \
  --service hana \
  --plan hdi-shared \
  --parameters '{"database_id":"db-123"}'

# With labels
btp create services/instance \
  --subaccount abc-123 \
  --service xsuaa \
  --plan application \
  --labels '{"environment":["production"],"team":["platform"]}'
```

---

### btp get services/instance

Get details of a service instance.

**Syntax**:
```bash
btp get services/instance <instance-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<instance-id>` | Service instance ID |
| `-sa, --subaccount <id>` | Subaccount ID |
| `--show-parameters` | Display configuration parameters |

**Example**:
```bash
btp get services/instance inst-123 \
  --subaccount abc-123 \
  --show-parameters
```

---

### btp list services/instance

List all service instances.

**Syntax**:
```bash
btp list services/instance [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `--labels-filter <query>` | Filter by labels (e.g., `landscape eq 'production'`) |
| `--fields-filter <query>` | Filter by fields (e.g., `usable eq 'true'`) |

**Example**:
```bash
btp list services/instance --subaccount abc-123 --fields-filter "ready eq 'true'"
```

---

### btp update services/instance

Update a service instance.

**Syntax**:
```bash
btp update services/instance [parameters]
```

**Required Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID (skip if target set) |
| `-s, --service` or `-n, --name <name>` | Service instance name |
| `-id <id>` | Service instance ID |

**Optional Parameters**:
| Parameter | Description |
|-----------|-------------|
| `--new-name <name>` | New name for the instance |
| `-p, --plan <id>` | New service plan ID |
| `--plan-name <name>` | New service plan name |
| `--parameters <json>` | New parameters as JSON |
| `-l, --labels <json>` | New labels |

**Note**: Plan updates only available if additional plans exist and are entitled.

---

### btp delete services/instance

Delete a service instance.

**Syntax**:
```bash
btp delete services/instance <instance-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<instance-id>` | Service instance ID |
| `-sa, --subaccount <id>` | Subaccount ID |
| `--confirm` | Skip confirmation |

---

## Service Binding Commands

### btp create services/binding

Create a service binding.

**Syntax**:
```bash
btp create services/binding [parameters]
```

**Required Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `-b, --binding <name>` or `-n, --name <name>` | Binding name |
| `-si, --service-instance <id>` or `--instance-name <name>` | Service instance |

**Optional Parameters**:
| Parameter | Description |
|-----------|-------------|
| `--parameters <json>` | Binding parameters |
| `-l, --labels <json>` | Labels |

**Examples**:
```bash
# Basic binding
btp create services/binding \
  --subaccount abc-123 \
  --binding my-binding \
  --service-instance inst-123

# With X.509 credentials
btp create services/binding \
  --subaccount abc-123 \
  --name my-binding \
  --instance-name my-instance \
  --parameters '{"credential-type":"x509"}'
```

---

### btp get services/binding

Get binding details.

**Syntax**:
```bash
btp get services/binding <binding-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<binding-id>` | Binding ID |
| `-sa, --subaccount <id>` | Subaccount ID |
| `--show-parameters` | Display parameters |

---

### btp list services/binding

List all bindings.

**Syntax**:
```bash
btp list services/binding [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `--labels-filter <query>` | Filter by labels (e.g., `purpose eq 'backing services'`) |
| `--fields-filter <query>` | Filter by fields (e.g., `ready eq 'true'`) |

---

### btp delete services/binding

Delete a binding.

**Syntax**:
```bash
btp delete services/binding <binding-id> [parameters]
```

---

## Platform Commands

### btp list services/platform

List all registered platforms.

**Syntax**:
```bash
btp list services/platform [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `--labels-filter <query>` | Filter by labels |
| `--fields-filter <query>` | Filter by fields |

---

### btp get services/platform

Get platform details.

**Syntax**:
```bash
btp get services/platform <platform-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<platform-id>` | Platform ID |
| `-sa, --subaccount <id>` | Subaccount ID |

**Output**: ID, Name, Type, Description, URL, Created, Updated, Labels

---

### btp register services/platform

Register a new platform (Kubernetes only).

**Syntax**:
```bash
btp register services/platform [parameters]
```

**Required Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `-n, --name <name>` | Platform name (alphanumeric + hyphens, must be unique) |
| `-t, --type <type>` | Platform type (only `kubernetes` supported) |

**Optional Parameters**:
| Parameter | Description |
|-----------|-------------|
| `--id <id>` | Custom platform ID (globally unique) |
| `-d, --description <desc>` | Description |
| `-l, --labels <json>` | Labels as JSON |

**Example**:
```bash
btp register services/platform \
  --subaccount abc-123 \
  --name my-k8s \
  --type kubernetes \
  --description "Production cluster"
```

**Output**: Platform credentials (username/password) returned on success.

---

### btp update services/platform

Update a platform.

**Syntax**:
```bash
btp update services/platform <platform-id> [parameters]
```

---

### btp unregister services/platform

Unregister a platform.

**Syntax**:
```bash
btp unregister services/platform <platform-id> --subaccount <id>
```

---

## Broker Commands

### btp list services/broker

List all registered brokers.

**Syntax**:
```bash
btp list services/broker [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `--labels-filter <query>` | Filter by labels |
| `--fields-filter <query>` | Filter by fields |

**Output**: ID, Name, Description, Broker URL, Created, Updated, Labels

---

### btp get services/broker

Get broker details.

**Syntax**:
```bash
btp get services/broker <broker-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<broker-id>` | Broker ID |
| `-sa, --subaccount <id>` | Subaccount ID |

**Output**: ID, Name, Description, Broker URL, Created, Updated, Labels

---

### btp register services/broker

Register a service broker.

**Syntax**:
```bash
btp register services/broker [parameters]
```

**Required Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `-n, --name <name>` | Broker name (alphanumeric + hyphens, must be unique) |
| `--url <url>` | Broker URL |
| `-u, --user <user>` | Auth username |
| `-p, --password <pass>` | Auth password |

**Optional Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-d, --description <desc>` | Description |
| `-l, --labels <json>` | Labels as JSON |

**Label Format**:
- Keys: max 100 chars, alphanumeric + `.` `_` `-`
- Values: arrays of strings, max 255 chars each, no newlines

---

### btp unregister services/broker

Unregister a broker.

**Syntax**:
```bash
btp unregister services/broker <broker-id> --subaccount <id>
```

---

## Offering Commands

### btp list services/offering

List available service offerings.

**Syntax**:
```bash
btp list services/offering [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `--environment <env>` | Filter by environment: `cloudfoundry` or `kubernetes` |
| `--labels-filter <query>` | Filter by labels (e.g., `environment eq 'test'`) |
| `--fields-filter <query>` | Filter by fields |

**Note**: Without `--environment`, returns services consumable through Service Manager bindings.

---

### btp get services/offering

Get offering details.

**Syntax**:
```bash
btp get services/offering <offering-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<offering-id>` | Offering ID |
| `-sa, --subaccount <id>` | Subaccount ID |

---

## Plan Commands

### btp list services/plan

List available service plans.

**Syntax**:
```bash
btp list services/plan [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `-sa, --subaccount <id>` | Subaccount ID |
| `--environment <env>` | Filter by environment: `cloudfoundry` or `kubernetes` |
| `--labels-filter <query>` | Filter by labels |
| `--fields-filter <query>` | Filter by fields |

---

### btp get services/plan

Get plan details.

**Syntax**:
```bash
btp get services/plan <plan-id> [parameters]
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<plan-id>` | Plan ID |
| `-sa, --subaccount <id>` | Subaccount ID |

---

## Common Patterns

### Set Target (Skip Subaccount on Each Command)

```bash
# Set target once
btp target --subaccount abc-123

# Now commands don't need --subaccount
btp list services/instance
btp create services/instance --service xsuaa --plan application
```

### JSON Output

```bash
btp --format json list services/instance
```

### Parameters from File

```bash
btp create services/instance \
  --service hana \
  --plan hdi-shared \
  --parameters @params.json
```

---

## SMCTL vs BTP CLI Comparison

| Operation | SMCTL | BTP CLI |
|-----------|-------|---------|
| Login | `smctl login` | `btp login` |
| Create instance | `smctl provision` | `btp create services/instance` |
| Delete instance | `smctl deprovision` | `btp delete services/instance` |
| Create binding | `smctl bind` | `btp create services/binding` |
| List instances | `smctl list-instances` | `btp list services/instance` |
| Marketplace | `smctl marketplace` | `btp list services/offering` |

**Recommendation**: Use SMCTL for Service Manager-specific operations; use BTP CLI for unified BTP management.

---

## Documentation Links

- **Create Instance**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/create-services-instance-5a44ad8.md
- **Create Binding**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/create-services-binding-7cf9dc5.md
- **Get Instance**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/get-services-instance-adb4c54.md
- **Platform Commands**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/platforms-7610c08.md
