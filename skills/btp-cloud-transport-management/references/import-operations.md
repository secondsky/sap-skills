# SAP Cloud Transport Management - Import Operations Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/tree/main/docs/30-using-import-queue

---

## Import Queue Overview

The import queue is the primary interface for managing transport requests in a transport node.

### Access Methods

1. **Via Home Screen**: Transport Nodes > Select node
2. **Via Landscape Visualization**: Select node > "Go to this node's import queue"

### Queue Interface Components

**Header Section**:
- Transport node name and description
- Forward Mode assignment
- Content Type (if assigned)
- Destination (if assigned)
- Application Type and Region Key (from destination)

**Tabs**:
- **Import Queue**: Transport requests with search/filter/actions
- **Node Details**: General node information and scheduling
- **Transport Routes**: Associated routes

---

## Prerequisites

| Action | Required Role(s) |
|--------|-----------------|
| Import all requests | ImportOperator |
| Import selected requests | TransportOperator OR ImportSelectedOperator |
| Add files | Administrator OR ExportOperator |
| Forward requests | Administrator OR TransportOperator |
| Reset requests | Administrator OR TransportOperator |
| Schedule imports | TransportOperator |
| Enable automatic import | Administrator OR TransportOperator |

---

## Adding Files to Import Queue

**Prerequisites**:
- Administrator or ExportOperator role
- "Allow Upload to Node" enabled on transport node
- Supported content types: MTA, XSC DU, or Application Content
- **Not supported**: BTP ABAP manual uploads

**Constraints**:
- Maximum file size: 1 GB (500 MB on free plan)
- Subscription-level quota applies
- Automatic deletion: 30 days after import completion (unless Initial, Repeatable, or Fatal)

### Procedure

1. Select **Add** in the import queue
2. Complete the dialog:

| Field | Details |
|-------|---------|
| Transport Description | Describes the upload |
| Content Type | Auto-selected if destination exists; otherwise select |
| File | `.mtar` (MTA), `.tgz` (XSC DU), `.zip` (Application Content) |

3. Select **OK**
4. Monitor progress via upload indicator
5. Transport request automatically added to queue

---

## Import Methods

### Import All

Executes all transport requests sequentially as they appear in the queue.

**Note**: Includes requests not visible due to filter settings.

**Eligible Statuses**: Initial, Fatal, Repeatable

**Result**: Succeeded status (or error status if failed)

### Import Selected

Import specific transport requests.

**Availability**: All content types **except** BTP ABAP

**Warning**: May cause inconsistencies if dependent requests aren't imported.

### Import Upto (BTP ABAP Only)

Imports all requests up to a specific transport request.

**Behavior with identical software component references**:
- Only selected request content imports
- Previous requests receive Skipped status

**Error**: Displayed if relevant requests hidden by filters

---

## Forward Transport Requests

Manual forwarding of requests to target nodes.

**Prerequisites**:
- Administrator or TransportOperator role
- Forward Mode set to **Manual** on transport node
- Archive attached to transport request
- Status: Error, Skipped, Succeeded, or Warning

**Selection Order**: Requests forward in selection order, influencing target queue order.

### Status Transitions Upon Forwarding

| Original Status | New Status |
|-----------------|------------|
| Initial | Initial |
| Deleted, Error, Fatal, Skipped, Succeeded, Warning | Repeatable |
| Repeatable | Repeatable |

**Note**: Forwarding requires intact archive; retention periods vary by plan.

---

## Reset Transport Requests

Reset requests to repeat imports.

**Eligible Statuses**: Error, Skipped, or Succeeded

**Result**: Status changes to **Repeatable**

### Procedure

1. Select transport requests in import queue
2. Select **Reset**
3. Requests now have Repeatable status, available for re-import

---

## Schedule Imports

Automate imports at defined intervals.

**Prerequisites**:
- TransportOperator role
- Regular import allowed in queue
- Access from import queue or Landscape Visualization Properties panel

### Import Patterns

**Daily Pattern**:
- Select time interval: "Every hour", "Four times per day", etc.

**Weekly Pattern**:
- Select weekly interval: "Every week", "Every second week", etc.
- Set Execution Time (start time)
- Choose specific days

### Activation

- Schedules are **inactive** by default
- Select **Active** checkbox to enable

### Visual Indicators

- **IMPORT SCHEDULE DETECTED** button in queue header
- Shows job status and next execution time

### Auto-Deactivation Rule

Schedules automatically deactivate after:
- 3 consecutive fatal failures
- Over a period of at least 3 weeks

Affected nodes appear in **Import Schedules** section on home screen.

---

## Enable Automatic Import

Immediate processing of all importable requests when new requests arrive.

**Prerequisites**:
- Administrator or TransportOperator role
- Importing not disabled in node

**Warning**: Activating immediately processes all requests with Initial, Fatal, or Repeatable statuses.

### Effects When Enabled

**Visual**:
- "AUTOMATIC IMPORT ENABLED" label in node header

**Functional**:
- Existing importable requests processed immediately
- New requests trigger automatic background imports (Import All)
- Failed imports retried when new requests arrive
- Manual importing removed from queue
- Enable button converts to disable

**System**:
- Existing import schedules become inactive
- Action logged as "Automatic Import Enabled" = true
- Landscape Visualization shows "Import Automatically" = Yes

---

## Transport Request Statuses

### Import Statuses (in Import Queues)

| Status | Description | Importable |
|--------|-------------|------------|
| Initial | Added but not imported | Yes |
| Running | Import in progress | No |
| Succeeded | Import successful | No |
| Warning | Completed with warnings | No |
| Error | Failed due to error | No |
| Fatal | Failed due to fatal error | Yes |
| Skipped | Intentionally skipped | No |
| Repeatable | Reset for re-import | Yes |
| Deleted | Removed from queue | No |
| Transient | Tested modifiable request, then released | No |

### Lifecycle Statuses (in Transport Requests Overview)

| Status | Description |
|--------|-------------|
| Modifiable | Request can be edited |
| Released | In at least one queue with non-archived/deleted status |
| Deleted | Deleted from all queues |
| Archived | Cleaned up by retention policy |

### Lifecycle Status Transitions

```
                    ┌─────────────┐
                    │  Modifiable │ ← Created
                    └──────┬──────┘
                           │ Test (optional)
                           ▼
                    ┌─────────────┐
                    │   Released  │ ← After Release or direct export
                    └──────┬──────┘
                           │ Delete from all queues
                           ▼
                    ┌─────────────┐
                    │   Deleted   │
                    └──────┬──────┘
                           │ Retention period expires
                           ▼
                    ┌─────────────┐
                    │   Archived  │
                    └─────────────┘
```

**Key Points**:
- Modifiable → Released: Occurs on **Release** action or when first exported via API
- Released → Deleted: Only when removed from **all** import queues
- Deleted → Archived: Automatic after retention period (7-30 days)

---

## Transport Request Details View

### Header Section

- Lifecycle status indicator
- Transport request ID
- Creation date and user
- Content type
- File size
- Testing status (modifiable requests)
- "Imports Failed" link (navigates to affected nodes)

### Tabs

**Tracking Tab** (default):
- Landscape canvas with nodes and routes
- Color-coded import status indicators
- Node info: ID and forward mode
- Context menu for node actions
- "Test Nodes" frame (modifiable only)

**Action Logs Tab**:
- Reverse chronological action listing
- Fields: node name, action type, user, status, last changed
- Anonymized users for archived actions
- Clickable rows open detailed logs
- Covers deleted nodes

**Content Tab**:
- File details: URI, name, version, filename
- Add/remove content (modifiable requests)
- Rearrange files (multiple files)
- Click file row to display MD5 hash
- Module listing for `.mtar` files
- Object metadata (software component, commit ID, branch)

### Display Options in Import Queue

**Request Fields Displayed**:
- Transport Request ID
- Mode (Final or Test)
- Description
- Owner
- Status
- Entry Node
- Timestamp

**Icons**:
- **Paperclip**: Shows attached file names; for `.mtar` shows modules
- **Log icon**: Opens log for request in current node

**MTA Operation Logs**:
- For MTA on Cloud Foundry: logs link to MTA deploy operation logs
- **Expiry**: 3 days (no CF CLI access needed)

---

## Modifiable Transport Requests

Allow efficient management of multiple files in a single request.

### Create Modifiable Request

**Prerequisites**:
- Access to transport requests overview
- ExportOperator role for source node

**Procedure**:

1. Select **Create** from overview
2. Complete dialog:
   - **Source Node**: Choose from nodes with uploads enabled
   - **Upload in Source Node**: If checked, imports to source; if unchecked, exports to follow-on nodes
   - **Content Type**: Must match source node
   - **Description**: Request details
3. Select **Create** (creates empty request)

### "Upload in Source Node" Decision Table

| Scenario | Upload in Source Node | Result |
|----------|----------------------|--------|
| Need to deploy in DEV first, then promote | ✓ Checked | Content imports to DEV, then forwards to TEST/PROD |
| Content already deployed in DEV, need to sync TEST/PROD | ☐ Unchecked | Content skips DEV, goes directly to follow-on nodes |
| Hotfix that needs to reach production ASAP | ☐ Unchecked | Bypasses source node; use with caution |
| Standard development flow (DEV→TEST→PROD) | ✓ Checked | Full pipeline deployment |
| CI/CD pipeline deploying pre-tested artifacts | ☐ Unchecked | Artifacts already validated; direct promotion |

**Important**: When unchecked, the source node serves only as the entry point; no import occurs there.

### Add Files

1. Click transport request row
2. Navigate to **Content** tab
3. Select **Add**
4. Browse and select file (must match content type)
5. Choose **Upload**

**Capabilities**:
- Multiple files without limit
- Remove and rearrange before testing
- Request invisible in import queues until Test mode

### Test Modifiable Requests

**Prerequisites**:
- Access to modifiable transport request detail view
- ImportOperator role for all target nodes

**Test Scope** (via Tracking tab):
- If "Upload in Source Node" selected: source + first-level follow-on nodes
- If not selected: only first-level follow-on nodes

**Modify Test Scope**:
- Add nodes via context menu (in-between nodes auto-included)
- Cannot select final production node
- Remove nodes via delete in context menu

**Procedure**:
1. Choose **Test** to open dialog
2. Optionally select "Import Automatically" checkbox
3. Execute **Test** and refresh

**Results**:
- Request enters queues in Initial status, Test mode
- Forward mode governs subsequent routing
- Failed imports show "Imports Failed" link
- Request remains modifiable during testing

### Release Modifiable Requests

**Prerequisites**:
- TransportOperator role minimum

**Procedure**:
1. Select **Release**
2. Confirm dialog

**Results**:
- Status transitions to **Released**
- Request becomes immutable
- First-level nodes: Initial status, Final mode
- Previously tested nodes: Transient status, Test mode (for audit)

**Important**: Objects imported during test remain in tenant - not automatically removed.

### Delete Transport Requests

Mass delete from all import queues.

**Prerequisites**: TransportOperator role for all tenant nodes

**Procedure**:
1. Select requests in Transport Requests overview
2. Confirm deletion dialog

**Results**:
- Deleted from all import queues in tenant
- Files immediately removed from storage
- **Irreversible** - cannot restore deleted requests

---

## MTA Extension Descriptors

Upload `.mtaext` files to customize MTA deployments for specific transport nodes.

**Prerequisites**:
- TransportOperator role
- Cloud Foundry transport node with Content Type "Multi-Target Application"

### File Specifications

- **Extension**: `.mtaext`
- **Purpose**: Complement deployment descriptors, customize MTA deployment per node

### Matching Conditions

MTA extension descriptors match when:
1. MTA ID matches `extends:` parameter in descriptor
2. Version binding matches imported MTA version

### Version Binding

| Binding | Behavior |
|---------|----------|
| `*` (asterisk) | Applies to all MTA versions (default) |
| Specific (e.g., `1.4.2`) | Applies only to that version |

**Note**: Cannot use wildcards (e.g., `1.4.*`). Specific bindings take precedence over universal.

### Key Constraints

- Descriptors are **NOT forwarded** to target nodes
- Must upload separately in each import queue
- Can upload before or after MTA addition to queue

### Operations

- Add via **Browse** or direct input
- View content via magnifying glass icon
- Download existing descriptors
- Remove from queue
- Check availability via paperclip icon

### Audit Trail

Upload/deletion actions logged in transport action logs.

---

## Search and Filter Options

### Search Methods

- **Description Search**: Enter any character string
- **Request ID Search**: Enter complete ID

### Filter Criteria

**Status Filter**:
- Default: Initial, Repeatable, Fatal, Running
- Succeeded/Error entries auto-delete after retention period on next import

**Date Range Filter**:
- Default: Last 7 days
- Alternative presets available
- Timestamp = time of last status change

**Custom Date Filter**:
- Use calendar picker
- Click first and last date
- Grays out preset option when active
- Delete dates to restore preset

**Reset**: Choose **Restore** to reset all filters to defaults

---

## Remove Transport Requests

Remove specific requests from a single import queue.

**Prerequisites**:
- Administrator or TransportOperator role
- Access to the specific import queue

### Procedure

1. Select transport requests
2. Execute **Remove**

### Results

- Status changes to **Deleted**
- Removed from this import queue only
- When removed from ALL queues: automatic cleanup deletes physical file

**Note**: For mass deletion across all queues, use **Delete** from Transport Requests overview.

---

## Disable Import

Temporarily prevent imports in a transport node.

**Prerequisites**:
- Administrator or TransportOperator role
- Access to the import queue

### Procedure

1. Select **Disable Import**
2. Optionally provide reason
3. Confirm

### Effects When Disabled

**Import Execution**:
- No imports executed (including scheduled)
- Other operations continue (file additions work)

**Forwarding**:
- Manual forwarding allowed
- Automatic forwarding from preceding nodes continues

**Visual Indicators**:
- Header displays **Import Disabled** message
- Hover shows disable reason
- Action logged in Landscape Action Logs

**Re-enable**: Select **Enable Import**

---

## Storage Capacity

> **Cross-reference**: For storage administration, retention configuration, and freeing space, see `administration.md` → Storage Management section.

### Limits by Plan

| Plan | Total Capacity | File Limit | Retention |
|------|----------------|------------|-----------|
| Standard | 50 GB | 1 GB | 1-30 days (default 30) |
| Free | 500 MB | 500 MB | 1-7 days (default 7) |

### Partner-Managed Edition

| Plan | Total Capacity | File Limit | Retention |
|------|----------------|------------|-----------|
| Standard | 10 GB | 400 MB | 1-30 days |
| Free | 500 MB | 400 MB | 1-7 days |

### Automatic Cleanup

Files deleted when:
- Requests reach final status (Deleted, Error, Skipped, Succeeded, Warning)
- Retention period elapsed since last action
- Exception: Deleted status requests cleaned immediately

Files **NOT** deleted if status is: Fatal, Initial, Repeatable, Running

### Capacity Alerts

- Warning at 85% usage
- No uploads when maximum reached
- Manual deletion frees space

---

## Documentation Links

- Import Queue: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/30-using-import-queue/using-the-import-queue-3c4b6f3.md
- Import Requests: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/30-using-import-queue/import-transport-requests-d2005d5.md
- Add Files: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/30-using-import-queue/add-files-to-import-queues-c3c87cb.md
- Schedule Imports: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/30-using-import-queue/schedule-imports-110a7a4.md
- Automatic Import: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/30-using-import-queue/enable-automatic-import-9171d39.md
- Request Statuses: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/40-using-request-overview/statuses-of-transport-requests-3a8259e.md
