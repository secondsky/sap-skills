# Subengines Development Guide

Complete guide for developing operators with subengines in SAP Data Intelligence.

## Table of Contents

1. [Overview](#overview)
2. [Subengine Architecture](#subengine-architecture)
3. [Python Subengine](#python-subengine)
4. [Node.js Subengine](#nodejs-subengine)
5. [C++ Subengine](#c-subengine)
6. [FlowAgent Subengine](#flowagent-subengine)
7. [Performance Optimization](#performance-optimization)
8. [Best Practices](#best-practices)

---

## Overview

Subengines enable operators to run on different runtimes within SAP Data Intelligence.

**Supported Subengines:**
- **Python 3.9**: Data science and ML workflows
- **Node.js**: JavaScript-based processing
- **C++**: High-performance native operators
- **ABAP**: ABAP Pipeline Engine (source systems)
- **FlowAgent**: Database connectivity

**Key Benefits:**
- Language flexibility
- Performance optimization
- Specialized libraries
- Same-engine process sharing

---

## Subengine Architecture

### Execution Model

```
Main Engine (Coordinator)
    ├── Python Subengine Process
    │   ├── Python Operator 1
    │   └── Python Operator 2 (same process)
    │
    ├── Node.js Subengine Process
    │   └── JavaScript Operator
    │
    └── Native Engine Process
        └── Native Operator
```

### Communication

**Same Engine Communication:**
- In-memory data transfer
- No serialization overhead
- Optimal performance

**Cross-Engine Communication:**
- Serialization required
- Inter-process communication
- Higher latency

### Engine Selection

The optimizer selects engines to minimize communication:

```
Graph: [Python Op A] -> [Python Op B] -> [JS Op C]

Execution:
- Ops A and B: Same Python process
- Op C: Separate Node.js process
- Data serialized between B and C
```

---

## Python Subengine

The most commonly used subengine for data processing and ML.

### Python 3.9 Operator (Gen2)

**Creating Python Operator:**

```python
# Operator script

def on_input(msg_id, header, body):
    """Process incoming message."""
    import pandas as pd

    # Process data
    df = pd.DataFrame(body)
    result = df.groupby('category').sum()

    # Send output
    api.send("output", api.Message(result.to_dict()))

# Register callback
api.set_port_callback("input", on_input)
```

### API Reference

**Message Handling:**
```python
# Set port callback
api.set_port_callback("port_name", callback_function)

# Send message
api.send("port_name", api.Message(body, attributes={}))

# Create message with attributes
msg = api.Message(
    body={"data": values},
    attributes={"source": "python"}
)
```

**Configuration Access:**
```python
# Get configuration parameter
value = api.config.param_name

# Get with default
value = getattr(api.config, 'param_name', default_value)
```

**Logging:**
```python
api.logger.info("Processing started")
api.logger.warning("Potential issue detected")
api.logger.error("Error occurred")
```

### State Management

```python
# Initialize state
state = {"counter": 0, "cache": {}}

def on_input(msg_id, header, body):
    global state
    state["counter"] += 1

    # Process with state
    if body["id"] in state["cache"]:
        result = state["cache"][body["id"]]
    else:
        result = process(body)
        state["cache"][body["id"]] = result

    api.send("output", api.Message(result))

api.set_port_callback("input", on_input)
```

### Using External Libraries

```python
# Pre-installed libraries available
import pandas as pd
import numpy as np
import sklearn
import tensorflow
import torch

# Custom libraries via Dockerfile
# (see Creating Dockerfiles section)
```

### Managed Connections

Access database connections from Python:

```python
def on_input(msg_id, header, body):
    # Get connection
    conn = api.get_connection("HANA_CONNECTION")

    # Execute query
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TABLE")
    rows = cursor.fetchall()

    api.send("output", api.Message(rows))
```

---

## Node.js Subengine

JavaScript-based operator development.

### Creating Node.js Operator

```javascript
// Operator script using @sap/vflow-sub-node-sdk
const { Operator } = require("@sap/vflow-sub-node-sdk");

// Get operator instance
const operator = Operator.getInstance();

// Set up input port handler
operator.getInPort("input").onMessage((ctx) => {
    // Process message
    const data = ctx.body;
    const result = processData(data);

    // Send to output port
    operator.getOutPort("output").send(result);
});

function processData(data) {
    // Transform data
    return data.map((item) => {
        return {
            id: item.id,
            value: item.value * 2
        };
    });
}
```

### API Reference

**Message Handling:**
```javascript
const { Operator } = require("@sap/vflow-sub-node-sdk");
const operator = Operator.getInstance();

// Set port callback
operator.getInPort("port_name").onMessage((ctx) => {
    // Access message body via ctx.body
    const data = ctx.body;
    // Process message
});

// Send to output port
operator.getOutPort("output").send(data);

// Send to specific named port
operator.getOutPort("port_name").send(data);
```

**Configuration:**
```javascript
const operator = Operator.getInstance();

// Access config
const paramValue = operator.config.paramName;
```

**Logging:**
```javascript
const operator = Operator.getInstance();

// Use operator logger
operator.logger.info("Information message");
operator.logger.debug("Debug message");
operator.logger.error("Error message");
```

### Node.js Data Types

| SAP DI Type | Node.js Type |
|-------------|--------------|
| string | String |
| int32 | Number |
| int64 | BigInt |
| float32 | Number |
| float64 | Number |
| blob | Buffer |
| message | Object |

### Safe Integer Handling

```javascript
// Large integers may lose precision
// Use BigInt for int64 values
const { Operator } = require("@sap/vflow-sub-node-sdk");
const operator = Operator.getInstance();

operator.getInPort("input").onMessage((ctx) => {
    const value = BigInt(ctx.body.largeNumber);
    // Process safely
});
```

### Node Modules

```javascript
// Built-in modules available
var fs = require('fs');
var path = require('path');
var https = require('https');

// Custom modules via Dockerfile
```

---

## C++ Subengine

High-performance native operator development.

### Getting Started

1. Install C++ SDK
2. Create operator class
3. Implement interfaces
4. Compile and upload

### Operator Implementation

```cpp
// custom_operator.h

#include "sdi/subengine.h"
#include "sdi/operator.h"

class CustomOperator : public sdi::BaseOperator {
public:
    CustomOperator(const sdi::OperatorConfig& config);

    void init() override;
    void start() override;
    void shutdown() override;

private:
    void onInput(const sdi::Message&amp; msg);

    std::string m_parameter;
};
```

```cpp
// custom_operator.cpp

#include "custom_operator.h"

CustomOperator::CustomOperator(const sdi::OperatorConfig& config)
    : BaseOperator(config) {
    m_parameter = config.get<std::string>("parameter");
}

void CustomOperator::init() {
    registerPortCallback("input",
        [this](const sdi::Message&amp; msg) { onInput(msg); });
}

void CustomOperator::start() {
    LOG_INFO("Operator started");
}

void CustomOperator::onInput(const sdi::Message&amp; msg) {
    // Process message
    auto data = msg.body<std::vector<int>>();

    // Transform
    for (auto& val : data) {
        val *= 2;
    }

    // Send output
    send("output", sdi::Message(data));
}

void CustomOperator::shutdown() {
    LOG_INFO("Operator shutdown");
}
```

### Building and Uploading

```bash
# Build
mkdir build && cd build
cmake ..
make

# Package
tar -czvf operator.tar.gz libcustom_operator.so manifest.json

# Upload via System Management
```

---

## FlowAgent Subengine

Database connectivity subengine.

### Purpose

FlowAgent provides:
- Database connection pooling
- Efficient data transfer
- Native database drivers

### Supported Databases

- SAP HANA
- SAP IQ
- Microsoft SQL Server
- Oracle
- PostgreSQL
- MySQL
- DB2

### FlowAgent Operators

Pre-built operators using FlowAgent:

- **SQL Consumer**: Execute SELECT queries
- **SQL Executor**: Execute DDL/DML
- **Table Consumer**: Read tables
- **Table Producer**: Write tables

### Configuration

```
Connection: Database Connection ID
SQL Statement: SELECT * FROM SALES WHERE YEAR = 2024
Batch Size: 10000
Fetch Size: 5000
```

---

## Performance Optimization

### Minimize Cross-Engine Communication

```
Bad:
[Python A] -> [JS B] -> [Python C] -> [JS D]
(4 serialization points)

Good:
[Python A] -> [Python C] -> [JS B] -> [JS D]
(2 serialization points)
```

### Batch Processing

```python
# Process in batches
def on_input(msg_id, header, body):
    batch = []
    batch.append(body)

    if len(batch) >= 1000:
        process_batch(batch)
        batch.clear()
```

### Memory Management

```python
# Stream large data
def on_input(msg_id, header, body):
    import pandas as pd

    # Process in chunks
    for chunk in pd.read_csv(body, chunksize=10000):
        result = process(chunk)
        api.send("output", api.Message(result))
```

### Connection Pooling

```python
# Reuse connections
_connection = None

def get_connection():
    global _connection
    if _connection is None:
        _connection = api.get_connection("DB_CONN")
    return _connection
```

---

## Best Practices

### Operator Design

1. **Single Responsibility**: One task per operator
2. **Stateless When Possible**: Easier recovery
3. **Handle Errors Gracefully**: Try-catch with logging
4. **Clean Up Resources**: Close connections, files

### Code Organization

```python
# Good: Modular code

def validate_input(data):
    """Validate input data."""
    if not data:
        raise ValueError("Empty input")
    return True

def transform_data(data):
    """Transform data."""
    # Transformation logic
    return result

def on_input(msg_id, header, body):
    try:
        validate_input(body)
        result = transform_data(body)
        api.send("output", api.Message(result))
    except Exception as e:
        api.logger.error(f"Error: {e}")
        api.send("error", api.Message({"error": str(e)}))
```

### Testing

1. **Unit Test Logic**: Test functions independently
2. **Integration Test**: Test with sample data
3. **Performance Test**: Verify throughput

### Documentation

```python
def on_input(msg_id, header, body):
    """
    Process incoming sales data.

    Input Schema:
        - order_id: string
        - amount: float
        - date: string (YYYY-MM-DD)

    Output Schema:
        - order_id: string
        - processed_amount: float
        - quarter: int
    """
    # Implementation
```

---

## Documentation Links

- **Subengines Overview**: [https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/subengines](https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/subengines)
- **Python Subengine**: [https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/blob/main/docs/modelingguide/subengines/create-operators-with-the-python-subengine-7e8f7d2.md](https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/blob/main/docs/modelingguide/subengines/create-operators-with-the-python-subengine-7e8f7d2.md)
- **Node.js Subengine**: [https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/subengines](https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/subengines) (Node.js SDK files)
- **C++ Subengine**: [https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/blob/main/docs/modelingguide/subengines/working-with-the-c-subengine-to-create-operators-d8f634c.md](https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/blob/main/docs/modelingguide/subengines/working-with-the-c-subengine-to-create-operators-d8f634c.md)

---

**Last Updated**: 2025-11-22
