# SMCTL Command Reference

Service Manager Control (SMCTL) is the CLI for SAP Service Manager.

**Installation**: https://github.com/Peripli/service-manager-cli/releases/latest

**Documentation**: https://github.com/SAP-docs/btp-service-manager/tree/main/docs/Service-Consumption/SAP-Service-Manager

---

## Global Flags

Available on all commands:

| Flag | Description |
|------|-------------|
| `--config <path>` | Path to config.json (default: `$HOME/.sm/config.json`) |
| `-v, --verbose` | Enable verbose output |
| `-h, --help` | Display help |

---

## Authentication Commands

### smctl login

Authenticate to SAP Service Manager.

**Syntax**:
```bash
smctl login [flags]
```

**Aliases**: `login`, `l`

**Required Flags**:
| Flag | Description |
|------|-------------|
| `-a, --url <url>` | Base URL for SAP Service Manager |
| `--param subdomain=<value>` | Subaccount subdomain (required) |

**Optional Flags**:
| Flag | Description |
|------|-------------|
| `-u, --user <user>` | User ID |
| `-p, --password <pass>` | Password |
| `--auth-flow <flow>` | `password` (default) or `client-credentials` |
| `--client-id <id>` | Client ID for client-credentials flow |
| `--client-secret <secret>` | Client secret |
| `--cert <path>` | Path to certificate file (X.509) |
| `--key <path>` | Path to private key file (X.509) |
| `--skip-ssl-validation` | Skip SSL verification (not recommended) |

**Examples**:
```bash
# Interactive password login
smctl login -a https://service-manager.cfapps.eu10.hana.ondemand.com \
  --param subdomain=my-subaccount

# Client credentials (default)
smctl login -a https://service-manager.cfapps.eu10.hana.ondemand.com \
  --param subdomain=my-subaccount \
  --auth-flow client-credentials \
  --client-id abc123 \
  --client-secret xyz789

# Client credentials (X.509)
smctl login -a https://service-manager.cfapps.eu10.hana.ondemand.com \
  --param subdomain=my-subaccount \
  --auth-flow client-credentials \
  --client-id abc123 \
  --cert /path/to/cert.pem \
  --key /path/to/key.pem
```

**2FA Note**: If 2FA enabled, append passcode to password (e.g., `Password1234` + `5678` = `Password12345678`)

**Session**: Expires after 30 minutes of inactivity.

---

### smctl logout

End current session.

**Syntax**:
```bash
smctl logout
```

---

## Instance Commands

### smctl provision

Create a service instance.

**Syntax**:
```bash
smctl provision [name] [offering] [plan] [flags]
```

**Arguments**:
| Argument | Description |
|----------|-------------|
| `name` | Instance name |
| `offering` | Service offering name |
| `plan` | Service plan name |

**Flags**:
| Flag | Description |
|------|-------------|
| `-b, --broker-name <name>` | Broker name (if offering name conflicts) |
| `--mode <mode>` | `sync` or `async` (default: async) |
| `-c, --parameters <json>` | JSON configuration parameters |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Examples**:
```bash
# Basic provisioning (async)
smctl provision my-instance xsuaa application

# Sync mode
smctl provision my-instance xsuaa application --mode sync

# With parameters
smctl provision my-instance hana hdi-shared \
  -c '{"database_id":"abc-123"}'

# JSON output
smctl provision my-instance xsuaa application -o json
```

---

### smctl deprovision

Delete a service instance.

**Syntax**:
```bash
smctl deprovision [name] [flags]
```

**Flags**:
| Flag | Description |
|------|-------------|
| `-f, --force` | Delete without confirmation |
| `-id <id>` | Instance ID (if name not unique) |
| `--mode <mode>` | `sync` or `async` (default: async) |

**Examples**:
```bash
# Interactive deletion
smctl deprovision my-instance

# Force delete (no confirmation)
smctl deprovision my-instance -f

# Sync mode
smctl deprovision my-instance --mode sync -f
```

---

### smctl list-instances

List all service instances.

**Syntax**:
```bash
smctl list-instances [flags]
```

**Aliases**: `list-instances`, `li`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Output columns**: ID, Name, Service Plan, Platform, Created, Updated, Ready, Usable, Labels

---

### smctl get-instance

Get details of a specific instance.

**Syntax**:
```bash
smctl get-instance [name] [flags]
```

**Aliases**: `get-instance`, `gi`

**Flags**:
| Flag | Description |
|------|-------------|
| `-id <id>` | Instance ID (if name not unique) |
| `--show-instance-params` | Show service instance configuration parameters |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Examples**:
```bash
# Basic retrieval
smctl get-instance sample-instance

# With configuration parameters
smctl get-instance sample-instance --show-instance-params

# JSON output
smctl get-instance sample-instance -o json
```

**Output**: ID, Name, Service Plan ID, Platform ID, Created, Updated, Ready, Usable, Labels, Last Operation

---

## Binding Commands

### smctl bind

Create a service binding.

**Syntax**:
```bash
smctl bind [instance-name] [binding-name] [flags]
```

**Flags**:
| Flag | Description |
|------|-------------|
| `--mode <mode>` | `sync` or `async` (default: async) |
| `-c, --parameters <json>` | JSON configuration |
| `-id <id>` | Instance ID (if name not unique) |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Examples**:
```bash
# Basic binding
smctl bind my-instance my-binding

# With X.509 credentials
smctl bind my-instance my-binding -c '{"credential-type":"x509"}'

# X.509 with custom validity
smctl bind my-instance my-binding -c '{
  "credential-type": "x509",
  "key-length": 4096,
  "validity-type": "MONTHS",
  "validity": 6
}'

# Sync mode
smctl bind my-instance my-binding --mode sync
```

**X.509 Parameters**:
| Parameter | Default | Description |
|-----------|---------|-------------|
| `credential-type` | - | Set to `x509` for certificate auth |
| `key-length` | 2048 | Private key length in bytes |
| `validity-type` | DAYS | `DAYS`, `MONTHS`, or `YEARS` |
| `validity` | 7 | Number of validity units |

---

### smctl unbind

Delete a service binding.

**Syntax**:
```bash
smctl unbind [instance-name] [binding-name] [flags]
```

**Flags**:
| Flag | Description |
|------|-------------|
| `-f, --force` | Delete without confirmation |
| `--mode <mode>` | `sync` or `async` (default: async) |
| `-id <id>` | Binding ID (if name not unique) |

---

### smctl list-bindings

List all service bindings.

**Syntax**:
```bash
smctl list-bindings [flags]
```

**Aliases**: `list-bindings`, `lsb`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

---

### smctl get-binding

Get details of a specific binding (includes credentials).

**Syntax**:
```bash
smctl get-binding [name] [flags]
```

**Aliases**: `get-binding`, `gsb`

**Flags**:
| Flag | Description |
|------|-------------|
| `-id <id>` | Binding ID (if name not unique) |
| `--show-binding-params` | Show service binding configuration parameters |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Examples**:
```bash
# Basic retrieval
smctl get-binding sample-binding

# With binding parameters
smctl get-binding sample-binding --show-binding-params

# JSON output
smctl get-binding sample-binding -o json
```

**Output**: ID, Name, Instance Name, Credentials, Created, Updated, Ready, Labels, Last Operation

---

## Broker Commands

### smctl register-broker

Register a service broker.

**Syntax**:
```bash
smctl register-broker [name] [url] <description> [flags]
```

**Aliases**: `register-broker`, `rb`

**Required Flags**:
| Flag | Description |
|------|-------------|
| `-b, --basic <user:pass>` | Basic auth credentials |

**Optional Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Example**:
```bash
smctl register-broker my-broker https://broker.example.com "My broker" \
  -b admin:password123
```

---

### smctl update-broker

Update a registered broker.

**Syntax**:
```bash
smctl update-broker [name] <json_broker> [flags]
```

**Aliases**: `update-broker`, `ub`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Example**:
```bash
smctl update-broker broker '{"name": "new-name", "description": "new-description", "broker_url": "http://broker.com", "credentials": { "basic": { "username": "admin", "password": "admin" }}}'
```

---

### smctl list-brokers

List all registered brokers.

**Syntax**:
```bash
smctl list-brokers [flags]
```

**Aliases**: `list-brokers`, `lb`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Output columns**: ID, Name, URL, Description, Created, Updated

---

### smctl delete-broker

Delete one or more registered brokers.

**Syntax**:
```bash
smctl delete-broker [name] <name2> <name3> ... [flags]
```

**Aliases**: `delete-broker`, `db`

**Flags**:
| Flag | Description |
|------|-------------|
| `-f, --force` | Delete without confirmation |

**Example**:
```bash
smctl delete-broker sample-broker-1
# Output: Broker with name: sample-broker-1 successfully deleted
```

---

## Platform Commands

### smctl register-platform

Register a platform.

**Syntax**:
```bash
smctl register-platform [name] [type] <description> [flags]
```

**Aliases**: `register-platform`, `rp`

**Flags**:
| Flag | Description |
|------|-------------|
| `-i, --id <id>` | Custom platform ID (auto-generated if omitted) |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Example**:
```bash
smctl register-platform my-k8s-cluster kubernetes "Production K8s cluster"
```

---

### smctl update-platform

Update a registered platform.

**Syntax**:
```bash
smctl update-platform [name] <json_platform> [flags]
```

**Aliases**: `update-platform`, `up`

**Flags**:
| Flag | Description |
|------|-------------|
| `--regenerate-credentials` | Generate new credentials (old credentials become invalid) |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Example**:
```bash
smctl update-platform platform '{"name": "new-name", "description": "new-description", "type": "new-type"}'
```

**Note**: When using `--regenerate-credentials`, old credentials can no longer be used.

---

### smctl list-platforms

List all registered platforms.

**Syntax**:
```bash
smctl list-platforms [flags]
```

**Aliases**: `list-platforms`, `lp`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Output columns**: ID, Name, Type, Description, Created, Updated

---

### smctl delete-platform

Delete one or more platforms.

**Syntax**:
```bash
smctl delete-platform <name1> <name2> ... <nameN> [flags]
```

**Aliases**: `delete-platform`, `dp`

**Flags**:
| Flag | Description |
|------|-------------|
| `-f, --force` | Delete without confirmation |
| `--cascade-delete` | Delete asynchronously with cascade (returns operation URL) |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Examples**:
```bash
# Standard deletion
smctl delete-platform sample-platform
# Output: Platform with name: sample-platform successfully deleted

# Cascade delete (async)
smctl delete-platform sample-platform --cascade-delete
# Returns: smctl status /v1/platforms/{id}/operations/{operation-id}
```

**Note**: Cascade delete schedules an async operation; use `smctl status` to monitor.

---

## Marketplace Commands

### smctl marketplace

List available service offerings and plans.

**Syntax**:
```bash
smctl marketplace [flags]
```

**Aliases**: `marketplace`, `m`

**Flags**:
| Flag | Description |
|------|-------------|
| `-s, --service <name>` | Show plans for specific service |
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Examples**:
```bash
# List all offerings
smctl marketplace

# List plans for specific service
smctl marketplace -s xsuaa
```

---

### smctl list-offerings

List all service offerings associated with the Service Manager.

**Syntax**:
```bash
smctl list-offerings [flags]
```

**Aliases**: `list-offerings`, `lo`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Example**:
```bash
smctl list-offerings
smctl lo -o json
```

**Output columns**: ID, Name, Description, Broker ID, Ready, Labels

---

### smctl list-plans

List all service plans associated with the Service Manager.

**Syntax**:
```bash
smctl list-plans [flags]
```

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Example**:
```bash
smctl list-plans
smctl list-plans -o json
```

**Output columns**: ID, Name, Description, Offering ID, Ready, Labels

---

## Status Commands

### smctl status

Check async operation status.

**Syntax**:
```bash
smctl status <operation-url>
```

**Example**:
```bash
# After async provision
smctl status /v1/service_instances/abc-123/operations/op-456
```

---

## Other Commands

### smctl help

Display help for any command.

**Syntax**:
```bash
smctl help [command]
smctl [command] --help
```

### smctl info

Display information about the connected SAP Service Manager instance.

**Syntax**:
```bash
smctl info [flags]
```

**Aliases**: `info`, `i`

**Flags**:
| Flag | Description |
|------|-------------|
| `-o, --output <format>` | `json`, `yaml`, or `text` |

**Output**: Service Management URL and authenticated user account.

---

### smctl version

Display SMCTL version information.

**Syntax**:
```bash
smctl version [flags]
```

**Aliases**: `version`, `v`

**Example**:
```bash
smctl version
# Output: Service Management Client 0.0.1
```

---

## Documentation Links

- **Installation**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/installing-the-service-manager-control-smctl-command-line-tool-93532bd.md
- **Login**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/login-a8ed7cf.md
- **Provision**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/provision-b327b66.md
- **Bind**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/bind-f53ff26.md
- **Get Instance**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/get-instance-24fb85c.md
- **Get Binding**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/get-binding-8495036.md
- **List Offerings**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/list-offerings-8a0659f.md
- **List Plans**: https://github.com/SAP-docs/btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/list-plans-b0e4863.md
- **GitHub Releases**: https://github.com/Peripli/service-manager-cli/releases
