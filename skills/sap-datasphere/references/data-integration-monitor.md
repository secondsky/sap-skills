# Data Integration Monitor Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Integrating-data-and-managing-spaces/Data-Integration-Monitor

---

## Table of Contents

1. [Monitor Overview](#monitor-overview)
2. [Remote Tables Monitoring](#remote-tables-monitoring)
3. [Local Tables Monitoring](#local-tables-monitoring)
4. [Real-Time Replication](#real-time-replication)
5. [Data Persistence](#data-persistence)
6. [View Analyzer](#view-analyzer)
7. [Flow Monitoring](#flow-monitoring)
8. [Task Chain Monitoring](#task-chain-monitoring)
9. [Scheduling](#scheduling)
10. [Statuses and Notifications](#statuses-and-notifications)

---

## Monitor Overview

The Data Integration Monitor provides visibility into data integration activities.

### Accessing the Monitor

1. Navigate to Data Integration Monitor
2. Select space
3. Choose monitor tab

### Monitor Tabs

| Tab | Purpose |
|-----|---------|
| Remote Tables | Virtual and replicated tables |
| Local Tables | Locally stored tables |
| Views | Persisted view data |
| Flows | Data/replication/transformation flows |
| Task Chains | Orchestrated tasks |

### Authorization and Permissions

**Required Privileges**:
- DW Integrator role (full access)
- DW Modeler role (limited access)
- Custom roles with monitor privileges

---

## Remote Tables Monitoring

### Remote Table Status

| Status | Description |
|--------|-------------|
| Available | Ready for queries |
| Replicating | Data loading |
| Error | Replication failed |
| Paused | Replication paused |

### Data Access Modes

**Remote Only**:
- Queries execute on source
- No local storage
- Real-time data

**Remote and Replication**:
- Data copied locally
- Faster queries
- Scheduled refresh

### Replication Operations

**Full Replication**:
1. Select remote table
2. Start replication
3. Monitor progress
4. Verify completion

**Replicate Full Set**:
- Initial load
- Complete refresh
- Scheduled full loads

**Replicate Data Changes**:
- Delta replication
- Real-time changes
- CDC-based

### Partitioning Data Loads

**Configure Partitions**:
1. Select remote table
2. Define partition column
3. Set partition values
4. Load partitions

**Partition Benefits**:
- Parallel loading
- Selective refresh
- Reduced memory

### Statistics

**Create Statistics**:
1. Select remote table
2. Create statistics
3. Schedule refresh

**Statistics Benefits**:
- Query optimization
- Better execution plans
- Improved performance

### Monitoring Remote Queries

**Query Metrics**:
- Execution time
- Rows returned
- Network latency
- Resource usage

---

## Local Tables Monitoring

### Local Table Status

| Status | Description |
|--------|-------------|
| Active | Table available |
| Loading | Data being loaded |
| Error | Load failed |

### Data Operations

**Load Data**:
- From files
- From data flows
- From replication flows

**Delete Data**:
- Full truncate
- Selective delete
- Partition delete

### Record Deletion Control

**Deletion Options**:
- Allow deletion
- Prevent deletion
- Soft delete

### Local Tables (File)

**Object Store Tables**:
- Parquet format
- Delta Lake support
- Optimized storage

**Operations**:
| Operation | Description |
|-----------|-------------|
| Merge | Combine delta files |
| Optimize | Compact files |
| Delete | Remove data |

**Merge Operations**:
1. Select table
2. Run merge
3. Verify results

---

## Real-Time Replication

### Source Requirements

**Connection Support**:
Real-time/trigger-based replication depends on the connection type. Check connection documentation for support.

**Source Object Requirements**:
- Objects must be enabled for Change Data Capture (CDC)
- If previously deployed without real-time capability, re-deploy the table
- Source views: **Not supported**
- ABAP Dictionary tables: **Not supported**

### ABAP ODP Source Requirements

**ODP-BW** (SAP BW sources):
Only InfoProviders with change logs:
| Object Type | Requirements |
|-------------|--------------|
| DataStore objects (advanced) - ADSO | Data activation with change log |
| Standard DataStore objects (classic) - ODSO | Must have change log |
| InfoObjects | Must support delta |

**Version Requirements**: SAP BW 7.4 SP23+ or SAP BW 7.5 SP17+

**ODP-CDS** (CDS views):
- All ABAP CDS views with primary key AND delta-enabled
- **Important**: Filters must apply to primary key fields only
- Non-key field filters risk inconsistent deletion propagation

**ODP-SAPI** (Extractors):
- Delta-enabled extractors with primary keys
- ADD* methods excluded

### SAP HANA Smart Data Access Requirements

- Remote objects must be **COLUMN TABLE** type
- Row Tables: **Not supported**
- Virtual Tables: **Not supported**
- Some data types and table features restricted
- Replication **cannot be paused**

### SAP HANA CDI Adapter

- Recommended: DP Agent version 2.6.1 or higher

### Enabling Real-Time

**Enable Steps**:
1. Navigate to Data Integration Monitor
2. Select relevant space
3. Access Remote Tables section
4. Select target remote table
5. If switching from scheduled to real-time:
   - Execute "Remove Replicated Data" first
   - Clear existing replica
   - Delete existing schedule
6. Select "Enable Real-Time Data Replication"

**Important**: No logs are generated when data is replicated in real-time mode

### Replication Status

| Status | Description |
|--------|-------------|
| Active | Receiving changes |
| Paused | Temporarily stopped |
| Error | Replication failed |
| Initial Load | Loading base data |

### Pausing and Resuming

**Pause Replication**:
- Maintenance windows
- Source system changes
- Performance tuning

**Resume Replication**:
1. Verify source availability
2. Check queue status
3. Resume replication
4. Monitor catch-up

### Recovery After Failure

**Automatic Recovery**:
- Reconnection attempts
- Queue recovery
- Delta catch-up

**Manual Recovery**:
1. Identify failure cause
2. Fix underlying issue
3. Resume or restart
4. Verify data consistency

### Watermarks

**Watermark Tracking**:
- Current position in change stream
- Last processed change
- Recovery point

**View Watermarks**:
1. Select replicated table
2. View watermark details
3. Monitor lag

---

## Data Persistence

### Persisting Views

**Enable Persistence**:
1. Open view properties
2. Enable persistence
3. Configure schedule
4. Deploy

### Run Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| Full | Complete refresh | Initial/reset |
| Delta | Incremental refresh | Regular updates |
| Clean Up | Remove stale data | Maintenance |

### Persistence Metrics

**Monitor Metrics**:
- Last run time
- Duration
- Rows processed
- Storage used

### Detailed Logs

**View Logs**:
1. Select persisted view
2. Open run history
3. View detailed logs

**Log Information**:
- SQL statements
- Execution times
- Error messages
- Row counts

### Memory Consumption

**Monitor Memory**:
- Current usage
- Peak usage
- Trend analysis

**Optimization**:
- Partition data
- Schedule off-peak
- Reduce scope

### Partitioning Persisted Views

**Create Partitions**:
1. Define partition column
2. Set partition scheme
3. Configure retention
4. Deploy

**Partition Schemes**:
- Range (date-based)
- Hash (value-based)
- List (explicit values)

### Data Access Control Integration

Persisted views respect data access controls:
- Row-level security applied
- User context evaluated
- Cached securely

---

## View Analyzer

### Getting Started

**Access View Analyzer**:
1. Data Integration Monitor
2. Views tab
3. Select view
4. Open analyzer

### Analysis Features

**Execution Plan**:
- Query decomposition
- Join analysis
- Filter pushdown

**Performance Metrics**:
- Execution time
- Memory usage
- I/O statistics

### Exploring Views

**Analyze View**:
1. Select view
2. Run analysis
3. Review results

**Analysis Output**:
- Execution plan visualization
- Performance recommendations
- Optimization suggestions

### Analyze Results

**Result Interpretation**:
| Metric | Good | Warning | Critical |
|--------|------|---------|----------|
| Exec Time | <1s | 1-10s | >10s |
| Memory | <1GB | 1-10GB | >10GB |
| Rows | Expected | +/-20% | >2x expected |

---

## Flow Monitoring

### Data Flow Monitoring

**Monitor Data Flows**:
1. Flows tab
2. Select data flow
3. View run history

**Run Metrics**:
- Start/end time
- Duration
- Rows processed
- Status

### Transformation Flow Monitoring

**Monitor Transformation Flows**:
1. Select transformation flow
2. View executions
3. Analyze metrics

**Metrics**:
| Metric | Description |
|--------|-------------|
| Duration | Total run time |
| Rows Inserted | New records |
| Rows Updated | Changed records |
| Rows Deleted | Removed records |

**Change Run Mode**:
- Full refresh
- Delta processing
- Truncate and reload

**Cancel Running Flow**:
1. Select running flow
2. Cancel execution
3. Review partial results

### Replication Flow Monitoring

**Monitor Replication Flows**:
1. Select replication flow
2. View status
3. Check metrics

**Replication Metrics**:
- Objects replicated
- Rows per object
- Last update time
- Error count

**Statuses and Substatuses**:
| Status | Substatus | Meaning |
|--------|-----------|---------|
| Running | Initial Load | First-time load |
| Running | Delta | Processing changes |
| Error | Connection Failed | Connectivity issue |
| Error | Authorization | Permission denied |

**Working with Existing Runs**:
- View run history
- Compare runs
- Identify trends

### File Space Operations

**Override Default Settings**:
- Custom parallelism
- Memory limits
- File formats

---

## Task Chain Monitoring

### Monitor Task Chains

**View Task Chains**:
1. Task Chains tab
2. Select chain
3. View executions

**Execution Details**:
- Task sequence
- Individual task status
- Duration per task
- Error details

### Schedule Management

**Modify Schedule Owner**:
1. Select scheduled chain
2. Transfer ownership
3. Confirm change

**Pause/Resume Scheduled Tasks**:
- Pause: Temporarily stop
- Resume: Continue schedule

### Task Chain Metrics

| Metric | Description |
|--------|-------------|
| Total Duration | End-to-end time |
| Task Count | Number of tasks |
| Success Rate | Completed/total |
| Avg Task Duration | Average per task |

---

## Scheduling

### Simple Schedules

**Schedule Types**:
| Type | Pattern |
|------|---------|
| Daily | Every day at time |
| Weekly | Specific days |
| Monthly | Specific dates |

**Create Schedule**:
1. Select object
2. Add schedule
3. Configure timing
4. Activate

### Cron Expressions

**Cron Format**:
```
┌───────────── second (0-59)
│ ┌───────────── minute (0-59)
│ │ ┌───────────── hour (0-23)
│ │ │ ┌───────────── day of month (1-31)
│ │ │ │ ┌───────────── month (1-12)
│ │ │ │ │ ┌───────────── day of week (0-7)
│ │ │ │ │ │
* * * * * *
```

**Examples**:
```
0 0 6 * * ?     # Daily at 6:00 AM
0 0 */4 * * ?   # Every 4 hours
0 30 8 * * MON  # Monday at 8:30 AM
0 0 0 1 * ?     # First of month midnight
```

### Schedule Management

**View Schedules**:
- Active schedules
- Next run time
- Last run status

**Modify Schedules**:
- Change timing
- Pause/resume
- Delete schedule

---

## Statuses and Notifications

### Understanding Statuses

**Object Status**:
| Status | Color | Meaning |
|--------|-------|---------|
| Completed | Green | Successful |
| Running | Blue | In progress |
| Warning | Yellow | Partial success |
| Error | Red | Failed |

**Substatus Details**:
- Detailed error information
- Actionable guidance
- Related logs

### Warning Notifications

**Configure Warnings**:
1. User profile
2. Notification settings
3. Select events

**Warning Types**:
- Execution warnings
- Capacity warnings
- Expiration warnings

### Email Notifications

**Configure Email**:
1. Set up email
2. Select events
3. Choose recipients

**Events**:
- Task completion
- Task failure
- Schedule events
- System alerts

---

## Documentation Links

- **Monitor Overview**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/4cbf7c7
- **Remote Tables**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/4dd95d7
- **Real-Time Replication**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/441d327
- **View Analyzer**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/8921e5a
- **Scheduling**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/7fa0762

---

**Last Updated**: 2025-11-22
