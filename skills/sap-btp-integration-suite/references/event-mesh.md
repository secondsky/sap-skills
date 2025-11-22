# Event Mesh - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Topics](#topics)
4. [Queues](#queues)
5. [Event Brokers](#event-brokers)
6. [Message Clients](#message-clients)
7. [Webhook Subscriptions](#webhook-subscriptions)
8. [Best Practices](#best-practices)

---

## Overview

Event Mesh is a capability within SAP Integration Suite that enables event-driven architecture (EDA) for publishing and consuming business events across your enterprise ecosystem.

**Key Benefits**:
- Decouple producers from consumers
- Enable real-time event processing
- Scale independently
- Support async communication patterns

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/event-mesh-3129673.md

---

## Core Concepts

### What is an Event?

An event represents "a change in the state of data" - something that happens in a system that other systems may need to know about.

**Examples**:
- Order created in e-commerce system
- Temperature sensor reading changed
- Customer record updated in CRM
- Payment processed

### Event-Driven Architecture (EDA)

EDA helps enterprises "act on new data in near-real time" by:
- Publishing events when state changes occur
- Subscribing to events of interest
- Processing events asynchronously
- Decoupling system dependencies

### Event Messages

Events generate messages to communicate event data between systems. Messages contain:
- Event type/topic
- Payload (event data)
- Metadata (timestamp, source, etc.)

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-are-events-9a5bf90.md

---

## Topics

Topics classify event messages using a hierarchical structure.

### Topic Structure

Format: `level1/level2/level3/.../levelN`

**Example**:
```
sales/orders/created
sales/orders/updated
sales/orders/cancelled
inventory/stock/updated
inventory/stock/depleted
```

### Topic Naming Rules

| Rule | Requirement |
|------|-------------|
| Length | Maximum 150 characters |
| Characters | Alphanumeric, underscore, period, hyphen |
| Segments | Minimum 2, maximum 20 |
| Separator | Forward slash (/) only |
| Start/End | Cannot start or end with / |
| Empty segments | Not allowed |

### Topic Wildcards

**Asterisk (*)**: Matches entire subtree, must be at end
```
sales/*          → matches sales/orders, sales/returns, etc.
sales/orders/*   → matches sales/orders/created, sales/orders/updated
```

**Plus (+)**: Matches single segment
```
sales/+/created  → matches sales/orders/created, sales/returns/created
+/orders/+       → matches sales/orders/created, purchases/orders/updated
```

### Topic Subscriptions

Queues subscribe to topics to receive matching events:

```
Subscription: sales/*/created
Matches:
  ✓ sales/orders/created
  ✓ sales/returns/created
  ✓ sales/quotes/created
  ✗ sales/orders/updated
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-are-topics-and-topic-subscriptions-1712c0d.md

---

## Queues

Queues are endpoints that persist messages for consumers.

### Queue Definition

"A queue is an endpoint configured with topic subscriptions that can publish messages to and consume messages from."

### Queue Types

| Type | Description | Use Case |
|------|-------------|----------|
| **EXCLUSIVE** | Only one consumer can access at a time | Serial processing, single consumer |
| **NON-EXCLUSIVE** | Multiple consumers can access | Parallel processing, load balancing |

### Queue Workflow

```
1. Producer → publishes message → Event Mesh
2. Event Mesh → matches topic → stores in queue
3. Queue → retains message → until consumed
4. Consumer → connects → receives message
5. Consumer → acknowledges → message removed
```

### Queue Features

- Subscribe to multiple topics
- Persist messages until consumed
- Support guaranteed delivery
- Enable message acknowledgment
- Allow dead-letter handling

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/queues-99b7501.md

---

## Event Brokers

### Definition

An event broker is "middleware that mediates the communication of event messages between producers and consumers using the various message exchange patterns."

### Broker Functions

1. **Receive** events from producers
2. **Route** based on topics/subscriptions
3. **Store** for persistence
4. **Deliver** to subscribers
5. **Acknowledge** successful delivery

### Deployment Options

| Type | Description |
|------|-------------|
| Hardware appliance | Physical messaging hardware |
| Software | On-premise software installation |
| Cloud SaaS | SAP Event Mesh service |

### Message Exchange Patterns

| Pattern | Description |
|---------|-------------|
| Publish/Subscribe | One-to-many distribution |
| Point-to-Point | One-to-one delivery |
| Request/Reply | Synchronous with response |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-are-event-brokers-f72428f.md

---

## Message Clients

Message clients connect applications to Event Mesh.

### Creating a Message Client

**Via BTP Cockpit**:
1. Navigate to Event Mesh service
2. Create message client instance
3. Configure queue subscriptions
4. Generate credentials

**Via CF CLI**:
```bash
cf create-service enterprise-messaging default my-event-mesh \
  -c '{"emname": "my-client", "options": {"management": true, "messaging": true}}'
```

### Client Configuration

```json
{
  "emname": "my-message-client",
  "namespace": "company/department/app",
  "rules": {
    "topicRules": {
      "publishFilter": ["${namespace}/*"],
      "subscribeFilter": ["${namespace}/*", "shared/*"]
    },
    "queueRules": {
      "publishFilter": ["${namespace}/*"],
      "subscribeFilter": ["${namespace}/*"]
    }
  }
}
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/configure-a-message-client-867c517.md

---

## Webhook Subscriptions

Enable HTTP-based event delivery without persistent connections.

### How Webhooks Work

```
1. Event published → Event Mesh
2. Event Mesh → matches subscription
3. Event Mesh → HTTP POST → Webhook URL
4. Webhook endpoint → processes event
5. Endpoint → returns 2xx → acknowledged
```

### Webhook Configuration

| Parameter | Description |
|-----------|-------------|
| URL | Target endpoint for events |
| Topic subscription | Topics to receive |
| Authentication | Basic, OAuth, Certificate |
| Retry policy | Retry on failure |

### Webhook vs Queue Consumption

| Aspect | Webhook | Queue |
|--------|---------|-------|
| Connection | HTTP push | Protocol connection |
| Persistence | Limited | Full |
| Ordering | Not guaranteed | Guaranteed |
| Throughput | Lower | Higher |
| Simplicity | Higher | Lower |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/webhook-subscriptions-58e3729.md

---

## Integration with Cloud Integration

### AMQP Adapter

Connect iFlows to Event Mesh using AMQP adapter.

**Sender Adapter** (consume events):
```
Adapter Type: AMQP
Transport Protocol: WebSocket
Host: messaging-service-host
Queue Name: queue:my-queue
Authentication: OAuth2 Client Credentials
```

**Receiver Adapter** (publish events):
```
Adapter Type: AMQP
Transport Protocol: WebSocket
Host: messaging-service-host
Topic: topic/my/event
Authentication: OAuth2 Client Credentials
```

### Event-Driven iFlow Pattern

```
┌──────────────┐    ┌────────────────┐    ┌──────────────┐
│  Event Mesh  │ →  │  iFlow (AMQP)  │ →  │   Backend    │
│    Queue     │    │   Processing   │    │    System    │
└──────────────┘    └────────────────┘    └──────────────┘
```

---

## Best Practices

### Topic Design

1. **Use hierarchical structure**
   ```
   organization/domain/entity/action
   acme/sales/order/created
   ```

2. **Be specific but not too granular**
   - Good: `sales/orders/created`
   - Too broad: `sales/event`
   - Too specific: `sales/orders/created/usa/region1/store5`

3. **Use consistent naming conventions**
   - lowercase
   - no spaces
   - descriptive names

### Queue Design

1. **One queue per consumer type**
   - Order processing queue
   - Analytics queue
   - Audit queue

2. **Use dead-letter queues**
   - Handle failed messages
   - Enable retry analysis

3. **Set appropriate TTL**
   - Time-to-live for messages
   - Prevent queue overflow

### Error Handling

1. **Acknowledge after processing**
   - Don't acknowledge before work is done
   - Use transactions when needed

2. **Implement retry logic**
   - Exponential backoff
   - Maximum retry count

3. **Use dead-letter handling**
   - Route failed messages
   - Enable investigation

---

## Glossary

| Term | Definition |
|------|------------|
| **Event** | Change in system state |
| **Topic** | Hierarchical event classification |
| **Queue** | Persistent message endpoint |
| **Subscription** | Topic pattern for queue |
| **Producer** | Application publishing events |
| **Consumer** | Application receiving events |
| **Broker** | Middleware routing events |
| **Webhook** | HTTP-based event delivery |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/glossary-for-event-mesh-501ba2d.md

---

## Related Documentation

- **Event Mesh Overview**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/event-mesh-3129673.md
- **Events**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-are-events-9a5bf90.md
- **Event Brokers**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-are-event-brokers-f72428f.md
- **Topics**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-are-topics-and-topic-subscriptions-1712c0d.md
- **Queues**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/queues-99b7501.md
- **Topic Syntax**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/topic-naming-syntax-62460b8.md
