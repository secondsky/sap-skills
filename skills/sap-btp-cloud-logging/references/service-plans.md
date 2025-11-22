# SAP Cloud Logging - Service Plans Reference

**Source:** https://github.com/SAP-docs/btp-cloud-logging/blob/main/docs/service-plans-a9d2d1b.md
**Last Updated:** 2025-11-22

---

## Overview

SAP Cloud Logging offers three service plans with varying ingestion and storage capabilities. Plan updates are **not supported**; migration requires running instances in parallel and migrating data.

**Important:** Service plans impact pricing. Check the Discovery Center and SAP Cloud Logging Capacity Unit Estimator for current pricing.

---

## Service Plans Comparison

| Feature | dev | standard | large |
|---------|-----|----------|-------|
| **Purpose** | Evaluation only | Production | Enterprise Production |
| **Auto-scaling** | No | Yes | Yes |
| **Data Replication** | No | Yes | Yes |
| **Net Storage** | 7.5 GB (fixed) | 75 GB - 375 GB | 750 GB - 3.75 TB |
| **Suitable for Production** | No | Yes | Yes |

---

## Development Plan (`dev`)

**Purpose:** Evaluation and testing only. **Not suitable for production workloads.**

### Characteristics
- No auto-scaling capability
- No data replication (single point of failure)
- Limited ingestion throughput
- Fixed 7.5 GB storage capacity
- Cannot exceed capacity for load testing

### Use Cases
- Initial evaluation of Cloud Logging features
- Development environment testing
- Proof of concept implementations

### Limitations
- **Not recommended for load testing** beyond the 7.5 GB capacity
- Service quality may degrade under load
- Data loss possible due to lack of replication

---

## Standard Plan (`standard`)

**Purpose:** Production workloads with moderate log volumes.

### Characteristics
- Data replication included
- Automatic scaling of net storage: **75 GB to 375 GB**
- Time-based and disk-utilization-based data curation
- Oldest indices removed when maximum capacity reached

### Capacity Estimates
At **100 logs per second** (2 kB each):
- Minimum retention: ~8 days (at max ingestion)
- Maximum retention: ~43 days (at scaled storage)

### Net Storage Concept
"Net storage capacity" refers to usable disk space up to the watermark, **excluding replica space**. The actual provisioned storage is higher to accommodate replication.

---

## Large Plan (`large`)

**Purpose:** Enterprise production workloads with high log volumes.

### Characteristics
- Data replication included
- Automatic scaling of net storage: **750 GB to 3.75 TB**
- Time-based and disk-utilization-based data curation
- Oldest indices removed when maximum capacity reached

### Capacity Estimates
At **1000 logs per second** (2 kB each):
- Minimum retention: ~8 days (at max ingestion)
- Maximum retention: ~43 days (at scaled storage)

---

## Important Notes

### Service Quality Degradation

**Warning:** Service quality may degrade if load exceeds non-scaled disk capacity within one day. Plan your capacity based on expected peak loads.

### Plan Migration

Plan updates are **not supported**. Migration checklist:

1. Create new instance → Run parallel → Migrate configs/dashboards
2. Update bindings → Verify ingestion → Delete old instance

**Critical:** Test thoroughly in parallel before removing the old instance.

### Pricing Considerations

Configuration parameters that affect pricing:
- `backend.max_data_nodes` (storage scaling)
- `ingest.max_instances` (ingestion scaling)
- `retention_period` (data retention)

Check the SAP Discovery Center for:
- Regional availability
- Infrastructure provider details
- Current pricing

---

## Regional Availability

Service availability varies by region. Check the SAP Discovery Center for:
- Available regions
- Infrastructure providers (AWS, Azure, GCP)
- Region-specific limitations

**Discovery Center:** https://discovery-center.cloud.sap/serviceCatalog/cloud-logging

---

## Capacity Planning

### Estimating Storage Requirements

Use the SAP Cloud Logging Capacity Unit Estimator to calculate:
- Required plan based on log volume
- Expected retention period
- Estimated costs

### Formula
```
Daily Storage = (logs_per_second × 86400 × avg_log_size_kb) / 1024 / 1024 GB
Retention Days = Net Storage / Daily Storage
```

### Example Calculations

| Logs/sec | Log Size | Daily Volume | Standard Retention | Large Retention |
|----------|----------|--------------|-------------------|-----------------|
| 100 | 2 kB | ~17 GB | 4-22 days | 44-220 days |
| 500 | 2 kB | ~86 GB | 1-4 days | 9-44 days |
| 1000 | 2 kB | ~173 GB | <1-2 days | 4-22 days |

**Note:** Actual retention depends on data compression and index overhead.

---

## Best Practices

### Choosing the Right Plan

1. **dev**: Only for evaluation, never for production
2. **standard**: Most production workloads (up to 375 GB)
3. **large**: High-volume enterprise workloads (up to 3.75 TB)

### Optimizing Costs

1. Set appropriate `retention_period` (don't over-retain)
2. Configure `max_data_nodes` based on actual needs
3. Use log filtering to reduce unnecessary ingestion
4. Monitor storage utilization regularly

### Monitoring Capacity

1. Check storage utilization in OpenSearch Dashboards
2. Set alerts for high disk usage
3. Monitor index sizes and retention
4. Plan capacity increases before hitting limits

---

## Documentation Links

- **Source:** https://raw.githubusercontent.com/SAP-docs/btp-cloud-logging/main/docs/service-plans-a9d2d1b.md
- **Discovery Center:** https://discovery-center.cloud.sap/serviceCatalog/cloud-logging
- **Capacity Estimator:** Available via Discovery Center
