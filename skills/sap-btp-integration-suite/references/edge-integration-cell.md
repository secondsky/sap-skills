# Edge Integration Cell - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Deployment Guide](#deployment-guide)
5. [Operations](#operations)
6. [Troubleshooting](#troubleshooting)

---

## Overview

Edge Integration Cell is an optional hybrid integration runtime that enables:
- **Design in cloud**: Use Integration Suite web UI
- **Deploy on-premise**: Run in private Kubernetes cluster
- **Data sovereignty**: Data stays within private landscape

### Use Cases

1. **Security/Compliance Requirements**
   - Sensitive data must stay behind firewall
   - Regulatory data residency requirements
   - No data transit over internet

2. **SAP Process Orchestration Migration**
   - Modernize to Integration Suite
   - Keep existing network topology
   - Gradual migration path

3. **Hybrid Architecture**
   - Mix cloud and edge deployment
   - Centralized design and monitoring
   - Distributed execution

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-is-edge-integration-cell-aee74bb.md

---

## Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SAP BTP Cloud                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              SAP Integration Suite                        │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │   │
│  │  │   Design    │ │   Monitor   │ │  Security Material  │ │   │
│  │  │   Studio    │ │   (Logs)    │ │   (Keystore Sync)   │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS (Outbound only)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Customer Private Landscape                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Kubernetes Cluster                           │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │           Edge Integration Cell                      │ │   │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐  │ │   │
│  │  │  │   Runtime   │ │   Worker    │ │   Security    │  │ │   │
│  │  │  │   Engine    │ │   Pods      │ │   Manager     │  │ │   │
│  │  │  └─────────────┘ └─────────────┘ └───────────────┘  │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                             │                                    │
│              ┌──────────────┴──────────────┐                    │
│              ▼                              ▼                    │
│      ┌─────────────┐                ┌─────────────┐             │
│      │   Sender    │                │  Receiver   │             │
│      │   System    │                │   System    │             │
│      └─────────────┘                └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### Supported Kubernetes Platforms

| Platform | Documentation |
|----------|---------------|
| Amazon EKS | https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/prepare-for-deployment-on-amazon-elastic-kubernetes-service-eks-6f95afa.md |
| Azure AKS | https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/prepare-for-deployment-on-azure-kubernetes-service-aks-a3c3a9c.md |
| Google GKE | https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/prepare-for-deployment-on-google-kubernetes-engine-gke-24a1e56.md |
| Red Hat OpenShift | https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/prepare-for-deployment-on-red-hat-openshift-ocp-21ae0fd.md |
| SUSE Rancher RKE2 | https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/prepare-for-deployment-on-suse-rancher-kubernetes-engine-rke2-0359e5c.md |

---

## Prerequisites

### Kubernetes Cluster Requirements

| Requirement | Specification |
|-------------|---------------|
| Kubernetes Version | 1.23+ |
| Worker Nodes | Minimum 4 |
| CPU per Node | 4 vCPU minimum |
| Memory per Node | 16 GB minimum |
| Storage | 100 GB+ persistent volume |
| Ingress Controller | Required (NGINX, etc.) |

### Network Requirements

| Requirement | Description |
|-------------|-------------|
| Outbound HTTPS | To SAP BTP (*.hana.ondemand.com) |
| DNS | Resolvable cluster DNS |
| Load Balancer | For ingress traffic |
| Firewall Rules | Allow outbound 443 to SAP |

### SAP BTP Requirements

| Requirement | Description |
|-------------|-------------|
| Integration Suite License | With Edge Integration Cell entitlement |
| BTP Subaccount | Cloud Foundry enabled |
| Role Collections | Edge Integration Cell Administrator |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/plan-your-setup-of-edge-integration-cell-217fed1.md

---

## Deployment Guide

### Step 1: Prepare Kubernetes Cluster

Platform-specific preparation:

```bash
# Example: Create namespace
kubectl create namespace sap-integration

# Verify cluster resources
kubectl get nodes -o wide
kubectl top nodes
```

### Step 2: Activate Edge Integration Cell

1. Navigate to Integration Suite
2. Go to Settings → Integrations
3. Enable Edge Integration Cell
4. Note the activation token

### Step 3: Deploy Edge Lifecycle Management Bridge

```bash
# Download and deploy the bridge
# Follow SAP-provided instructions for your platform
```

### Step 4: Add Edge Node

1. In Integration Suite, go to Settings → Edge Nodes
2. Click "Add Edge Node"
3. Provide:
   - Name
   - Kubernetes context
   - Namespace

### Step 5: Deploy Edge Integration Cell Solution

1. Select the edge node
2. Click "Deploy Solution"
3. Configure:
   - Resource allocation
   - Ingress settings
   - Storage class

### Step 6: Configure Keystore Synchronization

1. Navigate to Security Material
2. Configure which keystores to sync
3. Verify synchronization status

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/deploy-the-edge-integration-cell-solution-ab81b84.md

---

## Operations

### Deploy Integration Content

1. Design integration flow in cloud
2. Navigate to Manage Integration Content
3. Select target: Edge Integration Cell
4. Click Deploy

### Monitor

**From Cloud**:
- Message processing logs (centralized)
- Runtime status
- Certificate expiration

**On Cluster**:
```bash
# Check pod status
kubectl get pods -n sap-integration

# View logs
kubectl logs -n sap-integration <pod-name>

# Check resources
kubectl top pods -n sap-integration
```

### Keystore Management

**Synchronization**:
- Cloud keystores sync to edge
- Automatic sync at intervals
- Manual sync trigger available

**Local Keystores**:
- Edge-specific certificates
- Not synced to cloud
- Managed via API/CLI

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/manage-keystore-for-edge-integration-cell-39eb101.md

### Upgrade

1. Check for available updates in Integration Suite
2. Review release notes
3. Initiate upgrade from cloud UI
4. Monitor rollout progress

```bash
# Monitor upgrade
kubectl get pods -n sap-integration -w
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/upgrade-edge-integration-cell-27c3926.md

### Backup and Restore

**Backup**:
- Export integration content
- Backup keystore entries
- Document configuration

**Restore**:
- Redeploy solution if needed
- Restore keystores
- Redeploy integration content

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/backup-and-restore-edge-integration-cell-61cf37b.md

---

## Troubleshooting

### Common Issues

| Issue | Resolution |
|-------|------------|
| Pods not starting | Check resources, image pull |
| Keystore sync failed | Verify connectivity, permissions |
| Deployment failed | Check logs, storage availability |
| Connection timeout | Verify firewall, DNS resolution |

### Diagnostic Commands

```bash
# Check pod status
kubectl get pods -n sap-integration -o wide

# Describe failing pod
kubectl describe pod <pod-name> -n sap-integration

# View pod logs
kubectl logs <pod-name> -n sap-integration --tail=100

# Check events
kubectl get events -n sap-integration --sort-by='.lastTimestamp'

# Check persistent volumes
kubectl get pv,pvc -n sap-integration
```

### Log Locations

| Log Type | Access |
|----------|--------|
| Runtime Logs | Kubernetes pod logs |
| Message Logs | Integration Suite Monitor |
| System Logs | Cloud Foundry logs |

### Connectivity Test

```bash
# Test outbound connectivity
kubectl run -it --rm test --image=curlimages/curl \
  --restart=Never -n sap-integration -- \
  curl -v https://your-btp-url.hana.ondemand.com
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-edge-integration-cell-816d9e4.md

---

## Runtime Scope

### Supported Features
Most Cloud Integration features supported with some exceptions.

### Not Supported
- Neo environment features
- Some deprecated adapters
- Certain legacy configurations

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/edge-integration-cell-runtime-scope-144c64a.md

---

## Related Documentation

- **Overview**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/what-is-edge-integration-cell-aee74bb.md
- **Planning**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/plan-your-setup-of-edge-integration-cell-217fed1.md
- **Operations**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/operating-edge-integration-cell-2af17b8.md
- **Troubleshooting**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/troubleshooting-for-edge-integration-cell-816d9e4.md
