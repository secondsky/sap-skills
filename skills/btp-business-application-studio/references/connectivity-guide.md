# Connectivity Guide - Complete Troubleshooting Reference

## Table of Contents

1. [Overview](#overview)
2. [Destination Configuration](#destination-configuration)
3. [Cloud Connector Setup](#cloud-connector-setup)
4. [Troubleshooting Connectivity Issues](#troubleshooting-connectivity-issues)
5. [Specific System Scenarios](#specific-system-scenarios)
6. [Service Center](#service-center)
7. [Cloud Foundry Tools](#cloud-foundry-tools)
8. [Network Requirements](#network-requirements)
9. [Documentation Links](#documentation-links)

---

## Overview

SAP Business Application Studio dev spaces include a built-in web proxy for accessing:
- On-premise systems (ABAP, databases)
- On-premise Git repositories
- npm repositories
- External services

**Security Principle**: Always protect access to external systems including Private Artifact Repositories, on-premise systems, and trusted systems.

---

## Destination Configuration

### Required Properties (All Destinations)

```properties
WebIDEEnabled = true
HTML5.DynamicDestination = true
```

### WebIDEUsage Property by System Type

| System Type | WebIDEUsage Value | WebIDEAdditionalData |
|-------------|-------------------|---------------------|
| ABAP System | `odata_abap,dev_abap` | Do not set |
| SAP Cloud for Customer | `odata_c4c` | As required |
| Generic Service URL | `odata_gen` | As required |
| SAP Business Accelerator Hub | `apihub_sandbox` | As required |

### ABAP System Additional Properties

| Property | Value | Required |
|----------|-------|----------|
| `sap-client` | SAP client number (e.g., `100`) | Yes for ABAP |
| `WebIDEUsage` | `odata_abap,dev_abap` | Yes |
| URL | Host and port only (no path) | Yes |

### Creating Destinations

**Method 1: SAP BTP Cockpit**
1. Navigate to subaccount → Connectivity → Destinations
2. Click New Destination
3. Enter URL, authentication, and additional properties
4. Save and test with Check Connection

**Method 2: Service Center**
For OData services, use Service Center to discover and add services.

---

## Cloud Connector Setup

### Prerequisites
- Cloud Connector installed and connected to SAP BTP subaccount
- System URL exposed in Cloud Connector

### Configuration Requirements

1. **Virtual URL Match**: Cloud Connector virtual URL (host:port) must exactly match destination URL property
2. **Protocol**: Must be HTTP
3. **Internal URL**: Correct internal host and port for your network

### Required Path Access

Grant "Path and all sub-paths" access for:

```
/sap/opu/odata/     # OData services
/sap/bc/ui5_ui5/    # UI5 resources
/sap/bc/adt/        # ABAP Development Tools
/sap/bc/ui2/app_index/  # App index
```

### Finding Internal ABAP Port

1. Open SAP GUI transaction `/NSMICM`
2. Go to More → Go to → Services
3. Locate port for desired protocol

---

## Troubleshooting Connectivity Issues

### Step 1: Verify Destination in BTP Cockpit

1. Log into SAP BTP Cockpit
2. Navigate to subscribed subaccount
3. Go to Connectivity → Destinations
4. Verify destination exists with correct properties:
   - `WebIDEEnabled = true`
   - `HTML5.DynamicDestination = true`
   - Correct `WebIDEUsage` value
   - URL contains host:port only (no path)
5. Use Check Connection to test

### Step 2: Verify Destination from Dev Space

Run in terminal:

```bash
# Refresh destination list
curl localhost:8887/reload

# Generate destination list
curl $H2O_URL/api/listDestinations -o dests.json
```

Open `dests.json`, right-click → Format Document, and verify:
- Destination name matches exactly
- Host property points to correct URL
- Required properties present

### Step 3: Fiori-Specific Verification

1. Open Command Palette
2. Run `Fiori: Open Environment Check`
3. Select destination
4. Provide credentials if prompted
5. Save and view results in `/home/user/projects`

Report shows:
- All available destinations
- OData service catalog retrieval results
- Configuration issues

### Step 4: Cloud Connector Verification

In Cloud Connector:
1. Check Connectivity → Cloud Connectors in BTP Cockpit
2. Verify system virtual URL matches destination URL
3. Verify protocol is HTTP
4. Check Access Control grants required path access
5. Review Cloud Connector logs for errors

### Common Errors

#### "Tunnel handshake failed"

**Causes**:
- Proxy or network policy blocking connection
- No internet access to BAS connectivity service host

**Solutions**:
1. Verify network allows connection to connectivity service
2. Check connectivity service host for your region
3. See [SAP Note 3035686](https://me.sap.com/notes/3035686)

#### OData Service List Not Displayed

1. Test in internal network: `https://<system-url>/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/ServiceCollection`
2. Verify `sap-opu-iwfnd-catalogservice` service is active (transaction `/NSICF`)
3. Check destination credentials

#### Workbench Failed to Connect

Verify network allows websocket connections to SAP Business Application Studio.

---

## Specific System Scenarios

### SAP S/4HANA Cloud

1. Establish trust with SAP S/4HANA Cloud
2. Manually create destination in BTP subaccount
3. Follow: [Integrating SAP Business Application Studio](https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/22bc724fd51a4aa4a4d1c5854db7e026.html)

For Cloud Foundry deployment target, setup can be automated. See [Extending SAP S/4HANA Cloud](https://help.sap.com/docs/btp/sap-business-technology-platform/extending-sap-s-4hana-cloud-in-cloud-foundry-and-kyma-environment).

### On-Premise ABAP with Principal Propagation

Follow guides:
- [Configuring Principal Propagation](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/configuring-principal-propagation)
- [Principal Propagation in HTTPS Scenario](https://community.sap.com/t5/technology-blogs-by-sap/how-to-guide-principal-propagation-in-an-https-scenario/ba-p/13325048)

### SAPUI5 Extension Projects

For failures during preview or Add Extension wizard:

1. Locate failing request in browser network trace (filter `/sap/bc/`)
2. Get internal host:port from Cloud Connector
3. Test URL from internal network with internal host:port
4. Verify `/sap/bc/adt` service is active

---

## Service Center

### Access Methods

1. Click Service Center icon in activity bar
2. View → Open View → search "Service Center"
3. Click + in External Resources section of Storyboard

### Available Service Providers

| Provider | Purpose |
|----------|---------|
| **SAP System** | Systems from BAS subaccount |
| **SAP Business Accelerator Hub** | SAP products, packages, services, events |
| **Developer Hub** | Published products and services |
| **Unified Customer Landscape** | Registered S/4HANA Cloud systems |

### Capabilities

- Explore services, events, business objects, functions
- Use services as data sources
- Consume events and functions
- Create new services from business objects

---

## Cloud Foundry Tools

### Access

Open Command Palette, type `CF`

### Key Operations

**Login**:
1. Select authentication method
2. Enter credentials
3. Choose organization and space

**Target Management**:
- Create list of frequently used CF targets
- Switch targets with single click
- Reload target tree to refresh

**Service Instance Creation**:
- Marketplace services: Select service, plan, enter name
- User-provided services: For services not in marketplace

**Service Binding**:
- Binds service to locally run application
- Generates `.env` file with connection info
- Available via Command Palette or Targets view

---

## Network Requirements

### Outbound IP Addresses

Use outbound IPs when connecting FROM BAS to external services.

Example (eu10 region):
- 18.158.7.155
- 3.65.235.145
- (See availability docs for complete list)

### Inbound Connectivity

For firewall allowlisting:
- Connectivity service host: `https://connectivity.[region].applicationstudio.cloud.sap`
- Inbound IPs listed in availability documentation

For trial environments, use DNS resolution:
```bash
nslookup <connectivity_service_host>
```

### Performance Recommendation

Connect to the data center closest to your physical location.

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Connectivity Troubleshooting | https://help.sap.com/docs/bas/sap-business-application-studio/connectivity |
| Connecting to External Systems | https://help.sap.com/docs/bas/sap-business-application-studio/connecting-to-external-systems |
| Cloud Connector | https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector |
| Destination Configuration | https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/http-destinations |
| Availability/IP Addresses | https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability |
| Service Center | https://help.sap.com/docs/bas/sap-business-application-studio/explore-services-using-service-center |

### SAP Guided Answers

- [Configure SAP BTP Destination](https://ga.support.sap.com/dtp/viewer/index.html#/tree/3046/actions/45995:48363:53594:54336)
- [Validate Destination Configuration](https://ga.support.sap.com/dtp/viewer/index.html#/tree/3046/actions/45995:48363:53594:48364:51208)

### Support Components

| Issue Area | Component |
|------------|-----------|
| Connectivity | CA-BAS-CNSM |
| S/4HANA Cloud Extension | BC-SRV-APS-EXT-BAS |
| S/4HANA Cloud Setup | BC-SRV-APS-COM |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/btp-business-application-studio/tree/main/docs
