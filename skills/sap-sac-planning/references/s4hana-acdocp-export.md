# Exporting SAC Native Planning Data to SAP S/4HANA ACDOCP

Guide for exporting SAP Analytics Cloud native planning data to SAP S/4HANA ACDOCP table using the SAC Data Export Service.

**Source**: [ZPARTNER - SAC Export Native Planning to SAP S/4HANA ACDOCP](https://www.zpartner.eu/sac-export-native-planning-to-sap-s-4hana-acdocp/) by Andreas Theodoridis (July 2025)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Configuration Steps](#configuration-steps)
4. [Dimension Mapping Requirements](#dimension-mapping-requirements)
5. [Export Scope and Behavior](#export-scope-and-behavior)
6. [Troubleshooting](#troubleshooting)
7. [SAP Documentation Links](#sap-documentation-links)

---

## Architecture Overview

The integration uses the SAC Data Export Service to push planning data from SAC to S/4HANA's ACDOCP table (central storage for ERP plan data).

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SAP Analytics Cloud                          │
│  ┌───────────────────┐    ┌─────────────────────────────────────┐  │
│  │ Native Planning   │───>│ Data Export Service                 │  │
│  │ Model             │    │ (Data Management workspace)         │  │
│  └───────────────────┘    └──────────────┬──────────────────────┘  │
└──────────────────────────────────────────┼──────────────────────────┘
                                           │ HTTPS
                                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        SAP Cloud Connector                           │
│                     (for on-premise S/4HANA)                         │
└──────────────────────────────────────────┬───────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        SAP S/4HANA                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ API_PLPACDOCPDATA_SRV (OData Service)                         │  │
│  └──────────────────────────────────────┬────────────────────────┘  │
│                                          │                           │
│  ┌───────────────────────────────────────▼───────────────────────┐  │
│  │ ACDOCP Table (Plan Data Storage)                              │  │
│  └───────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

**Required Components**:
1. SAC Native Planning Model
2. S/4HANA Connection (configured in SAC)
3. SAC Data Export Service (OData via Cloud Connector)
4. SAP S/4HANA ACDOCP table

---

## Prerequisites

### SAC Planning Model Configuration

| Requirement | Details |
|-------------|---------|
| **Legacy Mode** | Must be enabled on the planning model (prerequisite for export) |
| **Version Dimension** | Required; only public versions can be exported |
| **Date Dimension** | Required (FiscalYearPeriod or Fiscal Year + Fiscal Period) |

To enable Legacy Mode:
1. Open planning model in Modeler
2. Go to Model Preferences
3. Enable "Legacy Planning Model" option

### S/4HANA Configuration

| Component | Transaction/Action |
|-----------|-------------------|
| **OData Service** | Activate `API_PLPACDOCPDATA_SRV` in `/IWFND/MAINT_SERVICE` |
| **Master Data Services** | Additional OData services may be required for master data access |
| **Cloud Connector** | Configure for on-premise S/4HANA connectivity |

### SAC Connection Setup

Create an Import Data Connection to S/4HANA:
1. Go to Connections in SAC
2. Create new connection to S/4HANA system
3. Configure Cloud Connector settings (for on-premise)

---

## Configuration Steps

### Step 1: Create Data Export Job

1. Open the planning model in SAC
2. Navigate to **Data Management** workspace
3. Click **Create** → **Data Export Job**
4. Select the configured S/4HANA OData endpoint

### Step 2: Configure Dimension Mapping

Map SAC dimensions to S/4HANA ACDOCP fields:

| SAC Dimension | S/4HANA Field | Notes |
|---------------|---------------|-------|
| Version (Plan Category) | RVERS | Only public versions can be exported |
| Date (FiscalYearPeriod) | FISCPER / FISCYEAR + FISCPERIOD | Can use combined or separate fields |
| Account | RACCT | G/L Account (required) |
| Measure | Target Measure | Only ONE measure per export job |
| Cost Center | RCNTR | Must be linked to exported company code |
| Company Code | RBUKRS | Required for validation |

**Important**: Only valid combinations of dimension members will be exported. For example, cost centers must be linked to the company code in the export scope.

### Step 3: Set Filters

Configure filters to define the export scope:
- Select source data (members to export)
- Set target data selection
- **Note**: Filters cannot be changed after export job creation—name jobs descriptively!

### Step 4: Define Export Scope

Select dimensions to include in export scope:
- **FiscalYearPeriod**: Mandatory
- **PlanningCategory (Version)**: Mandatory
- Additional dimensions as needed

All members of marked dimensions will be overwritten if data is available.

### Step 5: Schedule or Run Export

- Run manually for testing
- Schedule for automated execution
- Name exports descriptively for tracking

---

## Export Scope and Behavior

### Overwrite Behavior

Exported data **overwrites existing data within the defined scope**:

```
Export Scope Example:
- CostCenter: 17101101
- FiscalYearPeriod: 2025
- PlanningCategory: Plan

Result: All Plan data for CostCenter 17101101 in 2025 is replaced
```

### Delta Records

From a technical perspective, S/4HANA generates **delta records** when data changes:

| Scenario | SAC Value | ACDOCP Result |
|----------|-----------|---------------|
| Initial export | 1000 | Record created: 1000 |
| Value changed | 1500 | Delta record: +500 (total: 1500) |
| Value set to 0 | 0 | Delta record: -1500 (total: 0) |

### Deletion Behavior

**Critical**: Deleting data in SAC does NOT delete data in ACDOCP:
- Deleted SAC values remain in ACDOCP until overwritten
- To remove values, set them to 0 in SAC and re-export
- Only exported data overwrites existing ACDOCP data

---

## Troubleshooting

### "Access Denied" for Master Data

**Symptom**: Error when selecting master data in target data selection

**Cause**: Missing OData services for master data access

**Solution**:
1. Check OData error log: Transaction `/IWFND/ERROR_LOG`
2. Identify missing services from error details
3. Activate required OData services in `/IWFND/MAINT_SERVICE`

### Field Mapping Errors

**Symptom**: Data rejection during export

**Cause**: Mismatches between SAC dimension values and S/4HANA valid combinations

**Solution**:
1. Download error details file from export job
2. Verify dimension member combinations are valid in S/4HANA
3. Ensure cost centers are linked to correct company codes
4. Check G/L accounts exist in target ledger

### Version Export Fails

**Symptom**: Cannot select version for export

**Cause**: Only public versions can be exported

**Solution**:
1. Publish private version before export
2. Use standardized version names (e.g., PLAN, FORECAST) that exist in ACDOCP

### Export Job Not Visible

**Symptom**: Cannot find export option in Data Management

**Cause**: Legacy mode not enabled

**Solution**: Enable Legacy Planning Model in model preferences

---

## SAP Documentation Links

### Official SAP Resources

| Resource | Link |
|----------|------|
| **KBA: Import/Export Job Checkpoints** | [SAP Note 3220268](https://userapps.support.sap.com/sap/support/knowledge/en/3220268) (S-User required) |
| **Cloud Connector Setup** | [SAP Help - Import Data Connection to S/4HANA](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/63140f17362947fe8bcd9c6960db23bc.html) |
| **Exporting Plan Data to S/4HANA** | [SAP Help - Export Planning Data](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE_UPA/e9090901b1e24f4d9d04f6f206abecd8/efee7f7a47844876a80565d50f1cffcd.html) |
| **OData Services for Export** | [SAP Help - OData Services](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE_UPA/e9090901b1e24f4d9d04f6f206abecd8/15447e5bda934be28f3b16cfb456fb23.html) |

### Quick Reference

```
Key OData Service: API_PLPACDOCPDATA_SRV
Error Log Transaction: /IWFND/ERROR_LOG
Service Activation: /IWFND/MAINT_SERVICE
ACDOCP Verification: SE16N
```

---

## Summary

| Aspect | Key Point |
|--------|-----------|
| **Prerequisites** | Legacy mode ON, API_PLPACDOCPDATA_SRV activated |
| **Version Requirement** | Only public versions can be exported |
| **Measure Limit** | One target measure per export job |
| **Mandatory Scope** | FiscalYearPeriod + PlanningCategory always required |
| **Overwrite Behavior** | Exported data replaces existing within scope |
| **Deletions** | Set to 0 and re-export; deletions don't propagate automatically |

---

**License**: MIT  
**Last Updated**: 2025-11-22  
**Repository**: https://github.com/secondsky/sap-skills
