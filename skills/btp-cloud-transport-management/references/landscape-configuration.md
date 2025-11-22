# SAP Cloud Transport Management - Landscape Configuration Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/tree/main/docs/20-configure-landscape

---

## Overview

Before transporting content between environments, configure your transport landscape:

1. Create transport destinations (target endpoints)
2. Create transport nodes (source/target points)
3. Create transport routes (connections between nodes)

---

## Transport Nodes

### Definition

Transport nodes represent source or target endpoints of deployment processes (e.g., Cloud Foundry spaces, ABAP environments).

### Node Types

#### Physical Nodes

- Reference actual source or target endpoints
- Have content type and destination assigned
- Perform actual deployments

#### Virtual Nodes

- Don't reference physical endpoints
- Serve as placeholders in hybrid scenarios
- Aggregate transport requests
- Distribute to connected nodes
- Result in "Skipped" status when imported

---

### Creating Transport Nodes

**Prerequisites**:
- Administrator or LandscapeOperator role
- Transport destinations configured
- Optional: Alert Notification service destination

**Access Points**:
- Landscape Visualization screen (plus icon)
- Transport Landscape Wizard
- Transport Nodes screen (plus icon)

---

### Node Configuration Fields

#### Basic Fields

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Case-sensitive identifier |
| Description | No | Additional context |
| Tags | No | Categorization (display on Transport Nodes screen only) |

**Name Requirement**: When using SAP Content Agent service, node name must match `sourceSystemId` parameter in destination.

---

#### Behavioral Fields

| Field | Default | Description |
|-------|---------|-------------|
| Allow Upload to Node | Off | Enable file uploads for local archives and API uploads |
| Perform Notification | Off | Enable alerts (requires ALERT_NOTIFICATION_SERVICE destination) |
| Controlled By SAP Solution Manager | Off | Disable manual imports; controlled via Solution Manager |
| Virtual Node | Off | No physical endpoint, content type, or imports |

---

#### Forward Mode

Controls when transport requests forward to target nodes.

| Mode | Behavior |
|------|----------|
| **Pre-Import** (default) | Forward when import starts, before importing |
| **Post-Import** | Forward after import, regardless of success |
| **On Success** | Forward only after successful import (Skipped, Succeeded, Warning) |
| **Manual** | User must select Forward button |

---

#### Content Type

Required for target nodes. Options:

| Type | Description | File Format |
|------|-------------|-------------|
| Multitarget Application (MTA) | Cloud Foundry applications | `.mtar` |
| BTP ABAP | ABAP environment references | N/A (reference-based) |
| Application Content | Application-specific content | `.zip`, application-specific |
| XSC Delivery Unit | SAP HANA XS classic | `.tgz` |

**Note**: Optional for source nodes.

---

#### Destination

Required for target nodes. Links to configured transport destination.

**Access**: Direct link to Destinations editor for creation/editing.

---

#### Deployment Strategy (MTA + Cloud Foundry Only)

| Strategy | Behavior |
|----------|----------|
| **default** | Stops old version before deploying new |
| **blue-green** | Zero-downtime deployment; testing phase auto-skipped |

**Not available**: In Transport Landscape Wizard.

---

### Node Tags

**Purpose**: Categorize and organize nodes.

**Behavior**:
- Create new tags or assign existing
- Remove via X icon
- Display only on Transport Nodes screen
- Deleted when removed from single-node association
- Deleted when associated node deleted

---

## Transport Routes

### Definition

Routes connect transport nodes, defining the flow of transport requests through the landscape.

### Constraint

- A node can be **source** for multiple routes
- A node can be **target** for only **one** route

### Creating Transport Routes

**Prerequisites**:
- Administrator or LandscapeOperator role
- Transport nodes configured

**Access Points**:
- Landscape Visualization screen (Create Route button or side menu)
- Transport Landscape Wizard
- Transport Nodes screen (plus icon)

**Procedure**:
1. Enter route name
2. Optionally add description
3. Select source node
4. Select target node

---

## Transport Landscape Wizard

### Purpose

Simplified configuration for simple transport landscapes.

### Prerequisites

- Administrator or LandscapeOperator role
- Transport destinations configured

### Procedure

**Step 1**: Select template (number of nodes)
- Example: DEV + PROD (2 nodes)
- Example: DEV + TEST + PROD (3 nodes)

**Step 2**: Click **Next**

**Step 3**: Configure each node
- Enter node details
- Reference Create Transport Nodes guidelines

**Step 4**: Customize routes (optional)
- Modify auto-generated route names
- Add descriptions

**Step 5**: Click **Next** to view generation steps

**Step 6**: Review Summary
- View created nodes and routes
- Access individual entities via links

**Step 7**: Click **Finish**

### Results

- Transport nodes created
- Transport routes established
- Options to edit entities afterward

### Limitations

- Not available:
  - Deployment Strategy configuration
  - Controlled By SAP Solution Manager
  - Virtual Node option

---

## Sample Configuration Scenario

### Use Case

Transport content archives directly within an application (e.g., SAP Integration Suite).

### Setup

**Environments**: DEV, TEST, PROD subaccounts

**Content**: `.mtar` files (Integration Suite content)

### Configuration Elements

| Element | Location | Purpose |
|---------|----------|---------|
| Transport Destinations | SAP BTP Cockpit (TMS subaccount) | Point to TEST and PROD endpoints |
| Transport Nodes | TMS Service | DEV, TEST, PROD nodes |
| Transport Routes | TMS Service | DEV→TEST, TEST→PROD |
| Source Destination | DEV environment | Connect to TMS for export |

### Process Flow

1. User selects content for transport in DEV
2. Application exports to TMS via destination
3. Transport request created in TEST queue
4. Import to TEST (manual or automatic)
5. With Pre-Import forward: Request forwards to PROD queue
6. Import to PROD

### Alternative: Local File Upload

If no export integration in source:
1. Download archive locally
2. Upload to TMS via import queue
3. Import to target environments

---

## Landscape Visualization

### Access

Home Screen > Landscape Visualization

**Prerequisites**:
- Transport destinations configured
- Administrator or LandscapeOperator role

### Node Status Indicators

| Indicator | Meaning |
|-----------|---------|
| Red + error icon | Overall status is Error or Fatal |
| Orange + warning icon | Import ended with warnings |
| Green + success icon | All imports successful |

**Additional Icons**:
- Import Scheduler icon: Scheduled imports active
- Automatic Import icon: Auto-import enabled
- Dashed line: Virtual transport node

### Icon Bar Operations

| Function | Description |
|----------|-------------|
| Plus icon | Create new transport node |
| Route icon | Create transport route |
| Refresh | Update graph, show changes by other users |
| Export | Save landscape config to `.zip` file |
| Import | Restore landscape from exported `.zip` |
| Search | Find nodes/routes by character string |
| Legend | Show color coding |

### Export/Import Landscape Configuration

**Export**: Saves complete landscape to `.zip` file

**Import Prerequisites**:
- File unchanged and under 10 MB
- TMS version must match export version
- No duplicate nodes/routes allowed
- Cannot import partial landscapes
- Destinations require separate manual maintenance

### Context Menus

**Node Options**:
- Display node details/properties
- Access node's import queue
- Create routes from node
- Delete node

**Route Options**:
- View properties (description, source, target)
- Delete route

---

## Landscape Action Logs

Track all landscape configuration changes.

### Access

Home Screen > Landscape Action Logs

### Information Columns

| Column | Description |
|--------|-------------|
| Entity Type | Node, Route, Job, Archive, Wizard |
| Action Type | Create, Edit, Delete |
| Affected Object | Clickable link (except Wizard/Delete) |
| Changed By | User email/name |

### Filtering

Filter by:
- Entity Type
- Action Type
- Changed By
- Changed On (date picker)

### Detail View

Click row to see:
- **Old value**: Previous state
- **New value**: Current state
- Create/Delete show "None" for old/new respectively
- Import schedules use cron expression format

---

## Best Practices

### Node Naming

- Use consistent naming convention
- Include environment (DEV, TEST, PROD)
- Match `sourceSystemId` for Content Agent integrations

### Forward Mode Selection

| Scenario | Recommended Mode |
|----------|------------------|
| Standard pipeline | Pre-Import |
| Quality gates | Manual |
| Continuous deployment | On Success |
| Full visibility | Post-Import |

### Virtual Nodes

Use for:
- Aggregating requests from multiple sources
- Star topology (hub-and-spoke) configurations
- Hybrid cloud/on-premise scenarios

### Tags

Use for:
- Environment classification (Production, Non-Production)
- Team ownership
- Content type grouping

---

## Common Patterns

### Two-Node (DEV → PROD)

```
DEV ──route──> PROD
```

### Three-Node (DEV → TEST → PROD)

```
DEV ──route1──> TEST ──route2──> PROD
```

### Star Topology (Hub)

```
        ──route1──> PROD-EU
DEV-HUB ──route2──> PROD-US
        ──route3──> PROD-APAC
```

### Multi-Source

```
DEV-A ──route1──>
                   TEST ──route3──> PROD
DEV-B ──route2──>
```

---

## Import Failure Scenarios

Understanding how failures propagate through the landscape helps in troubleshooting and recovery.

### Failure Impact by Forward Mode

| Forward Mode | On Import Failure | Impact on Downstream Nodes |
|--------------|-------------------|---------------------------|
| Pre-Import | Failure after forwarding | Request already in downstream queues (Initial status) |
| Post-Import | Failure before forwarding | Request NOT forwarded; stays in current queue only |
| On Success | Failure prevents forwarding | Request NOT forwarded; downstream unaffected |
| Manual | N/A (user controls) | User decides when/whether to forward |

### Recovery Actions

| Scenario | Action | Result |
|----------|--------|--------|
| Import failed, request in downstream queues | Fix issue, re-import current node | Downstream nodes unaffected; import when ready |
| Import failed, request NOT forwarded | Fix issue, re-import, forward manually (if Manual mode) | Request propagates after successful import |
| Persistent failure | Reset to Repeatable status | Allows retry; original file must exist (within retention) |

### Cascade Failure Prevention

**Recommendation**: Use **On Success** forward mode for production-critical landscapes to prevent partially deployed content from reaching downstream nodes.

---

## Topology Pattern Decision Guide

Select topology based on organizational and deployment requirements.

### When to Use Each Pattern

| Pattern | Use When | Avoid When |
|---------|----------|------------|
| **Two-Node (DEV→PROD)** | Small teams, rapid deployment, non-critical apps | Regulatory compliance required, need testing stage |
| **Three-Node (DEV→TEST→PROD)** | Standard enterprise deployment, quality gates needed | Very small projects, time-critical hotfixes |
| **Star/Hub (Hub→Multiple Targets)** | Multi-region deployment, centralized control | Independent regional teams, different release cycles |
| **Multi-Source** | Multiple dev teams, feature branches | Need strict order of deployment, interdependent features |

### Topology Selection Criteria

1. **Regulatory Requirements**: Add TEST/QA nodes for audit trails
2. **Team Structure**: Multi-source for independent teams
3. **Geographic Distribution**: Star topology for multi-region
4. **Release Cadence**: Simpler topology for faster releases
5. **Risk Tolerance**: More nodes = more validation gates

---

## Documentation Links

- Configuring Landscape: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/20-configure-landscape/configuring-the-landscape-3e7b042.md
- About Transport Nodes: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/20-configure-landscape/about-transport-nodes-7cd4a78.md
- Create Nodes: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/20-configure-landscape/create-transport-nodes-f71a4d5.md
- Create Routes: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/20-configure-landscape/create-transport-routes-dddb749.md
- Landscape Wizard: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/20-configure-landscape/use-the-transport-landscape-wizard-f14192e.md
- Sample Scenario: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/20-configure-landscape/sample-configuration-scenario-22e1ed6.md
