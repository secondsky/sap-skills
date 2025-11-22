# Graphs and Pipelines Guide

Complete guide for graph/pipeline development in SAP Data Intelligence.

## Table of Contents

1. [Overview](#overview)
2. [Graph Concepts](#graph-concepts)
3. [Creating Graphs](#creating-graphs)
4. [Running Graphs](#running-graphs)
5. [Monitoring](#monitoring)
6. [Error Recovery](#error-recovery)
7. [Scheduling](#scheduling)
8. [Advanced Topics](#advanced-topics)
9. [Best Practices](#best-practices)

---

## Overview

Graphs (also called pipelines) are the core execution unit in SAP Data Intelligence.

**Definition:**
A graph is a network of operators connected via typed input/output ports for data transfer.

**Key Features:**
- Visual design in Modeler
- Two generations (Gen1, Gen2)
- Execution monitoring
- Error recovery (Gen2)
- Scheduling

---

## Graph Concepts

### Operator Generations

**Gen1 Operators:**
- Legacy operator model
- Process-based execution
- Manual error handling
- Broad compatibility

**Gen2 Operators:**
- Enhanced error recovery
- State management with snapshots
- Native multiplexing
- Better performance

**Critical Rule:** Cannot mix Gen1 and Gen2 operators in the same graph.

### Ports and Data Types

**Port Types:**
- Input ports: Receive data
- Output ports: Send data
- Typed connections

**Common Data Types:**
- string, int32, int64, float32, float64
- blob (binary data)
- message (structured data)
- table (tabular data)
- any (flexible type)

### Graph Structure

```
[Source Operator] ─── port ──→ [Processing Operator] ─── port ──→ [Target Operator]
     │                                │                                │
  Output Port                  In/Out Ports                      Input Port
```

---

## Creating Graphs

### Using the Modeler

1. **Create New Graph**
   - Open Modeler
   - Click "+" to create graph
   - Select graph name and location

2. **Add Operators**
   - Browse operator repository
   - Drag operators to canvas
   - Or search by name

3. **Connect Operators**
   - Drag from output port to input port
   - Verify type compatibility
   - Configure connection properties

4. **Configure Operators**
   - Select operator
   - Set parameters in Properties panel
   - Configure ports if needed

5. **Validate Graph**
   - Click Validate button
   - Review warnings and errors
   - Fix issues before running

### Graph-Level Configuration

**Graph Data Types:**
Create custom data types for the graph:

```json
{
  "name": "CustomerRecord",
  "properties": {
    "id": "string",
    "name": "string",
    "amount": "float64"
  }
}
```

**Graph Parameters:**
Define runtime parameters:

```
Parameters:
  - name: source_path
    type: string
    default: /data/input/
  - name: batch_size
    type: int32
    default: 1000
```

### Groups and Tags

**Groups:**
- Organize operators visually
- Share Docker configuration
- Resource allocation

**Tags:**
- Label operators
- Filter and search
- Documentation

---

## Running Graphs

### Execution Methods

**Manual Execution:**
1. Open graph in Modeler
2. Click "Run" button
3. Configure runtime parameters
4. Monitor execution

**Programmatic Execution:**
Via Pipeline API or Data Workflow operators.

### Execution Model

**Process Model:**
- Each operator runs as process
- Communication via ports
- Coordinated by main engine

**Gen2 Features:**
- Snapshot checkpoints
- State recovery
- Exactly-once semantics (configurable)

### Runtime Parameters

Pass parameters at execution:

```
source_path = /data/2024/january/
batch_size = 5000
target_table = SALES_JAN_2024
```

### Resource Configuration

**Memory/CPU:**
```json
{
  "resources": {
    "requests": {
      "memory": "1Gi",
      "cpu": "500m"
    },
    "limits": {
      "memory": "4Gi",
      "cpu": "2000m"
    }
  }
}
```

---

## Monitoring

### Graph Status

| Status | Description |
|--------|-------------|
| Pending | Waiting to start |
| Running | Actively executing |
| Completed | Finished successfully |
| Failed | Error occurred |
| Dead | Terminated unexpectedly |
| Stopping | Shutdown in progress |

### Operator Status

| Status | Description |
|--------|-------------|
| Initializing | Setting up |
| Running | Processing data |
| Stopped | Finished or stopped |
| Failed | Error in operator |

### Monitoring Dashboard

**Available Metrics:**
- Messages processed
- Processing time
- Memory usage
- Error counts

**Access:**
1. Open running graph
2. Click "Monitor" tab
3. View real-time statistics

### Diagnostic Information

**Collect Diagnostics:**
1. Select running/failed graph
2. Click "Download Diagnostics"
3. Review logs and state

**Archive Contents:**
- execution.json (execution details)
- graphs.json (graph definition)
- events.json (execution events)
- Operator logs
- State snapshots

---

## Error Recovery

### Gen2 Error Recovery

**Automatic Recovery:**
1. Enable in graph settings
2. Configure snapshot interval
3. System recovers from last snapshot

**Configuration:**
```json
{
  "autoRecovery": {
    "enabled": true,
    "snapshotInterval": "60s",
    "maxRetries": 3
  }
}
```

### Snapshots

**What's Saved:**
- Operator state
- Message queues
- Processing position

**When Snapshots Occur:**
- Periodic (configured interval)
- On operator request
- Before shutdown

### Delivery Guarantees

| Mode | Description |
|------|-------------|
| At-most-once | May lose messages |
| At-least-once | May duplicate messages |
| Exactly-once | No loss or duplication |

**Gen2 Default:** At-least-once with recovery.

### Manual Error Handling

**In Script Operators:**
```python
def on_input(msg_id, header, body):
    try:
        result = process(body)
        api.send("output", api.Message(result))
    except Exception as e:
        api.logger.error(f"Processing error: {e}")
        api.send("error", api.Message({
            "error": str(e),
            "input": body
        }))
```

---

## Scheduling

### Schedule Graph Executions

**Cron Expression Format:**
```
┌───────────── second (0-59)
│ ┌───────────── minute (0-59)
│ │ ┌───────────── hour (0-23)
│ │ │ ┌───────────── day of month (1-31)
│ │ │ │ ┌───────────── month (1-12)
│ │ │ │ │ ┌───────────── day of week (0-6, Sun=0)
│ │ │ │ │ │
* * * * * *
```

**Examples:**
```
0 0 * * * *     # Every hour
0 0 0 * * *     # Daily at midnight
0 0 0 * * 1     # Every Monday
0 0 6 1 * *     # 6 AM on first of month
0 */15 * * * *  # Every 15 minutes
```

### Creating Schedule

1. Open graph
2. Click "Schedule"
3. Configure cron expression
4. Set timezone
5. Activate schedule

### Managing Schedules

**Actions:**
- View scheduled runs
- Pause schedule
- Resume schedule
- Delete schedule
- View execution history

---

## Advanced Topics

### Native Multiplexing (Gen2)

Connect one output to multiple inputs:

```
[Source] ─┬──→ [Processor A]
          ├──→ [Processor B]
          └──→ [Processor C]
```

Or multiple outputs to one input:

```
[Source A] ──┐
[Source B] ──┼──→ [Processor]
[Source C] ──┘
```

### Graph Snippets

Reusable graph fragments:

1. **Create Snippet:**
   - Select operators
   - Right-click > "Save as Snippet"
   - Name and save

2. **Use Snippet:**
   - Drag snippet to canvas
   - Configure parameters
   - Connect to graph

### Parameterization

**Substitution Variables:**
```
${parameter_name}
${ENV.VARIABLE_NAME}
${SYSTEM.TENANT}
```

**In Operator Config:**
```
File Path: ${source_path}/data_${DATE}.csv
Connection: ${target_connection}
```

### Import/Export

**Export Graph:**
```
1. Select graph
2. Right-click > Export
3. Include data types (optional)
4. Save as .zip
```

**Import Graph:**
```
1. Right-click in repository
2. Import > From file
3. Select .zip file
4. Map dependencies
```

---

## Best Practices

### Graph Design

1. **Clear Data Flow**: Left-to-right, top-to-bottom
2. **Meaningful Names**: Descriptive operator names
3. **Group Related Operators**: Use groups for organization
4. **Document**: Add descriptions to operators
5. **Validate Often**: Check during development

### Performance

1. **Minimize Cross-Engine Communication**
2. **Use Appropriate Batch Sizes**
3. **Configure Resources**: Memory and CPU
4. **Enable Parallel Processing**: Where applicable
5. **Monitor and Tune**: Use metrics

### Error Handling

1. **Enable Auto-Recovery** (Gen2)
2. **Configure Appropriate Snapshot Interval**
3. **Implement Error Ports**: Route errors
4. **Log Sufficiently**: Debug information
5. **Test Failure Scenarios**: Validate recovery

### Maintenance

1. **Version Control**: Use graph versioning
2. **Document Changes**: Change history
3. **Test Before Deploy**: Validate thoroughly
4. **Monitor Production**: Watch for issues
5. **Clean Up**: Remove unused graphs

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Port type mismatch | Incompatible types | Use converter operator |
| Graph won't start | Resource constraints | Adjust resource config |
| Slow performance | Cross-engine overhead | Optimize operator placement |
| Recovery fails | Corrupt snapshot | Clear state, restart |
| Schedule not running | Incorrect cron | Verify expression |

### Diagnostic Steps

1. Check graph status
2. Review operator logs
3. Download diagnostics
4. Check resource usage
5. Verify connections

---

## Documentation Links

- **Using Graphs**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/using-graphs
- **Creating Graphs**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/using-graphs/creating-graphs
- **Graph Examples**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/repositoryobjects/data-intelligence-graphs

---

**Last Updated**: 2025-11-22
