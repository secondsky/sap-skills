# Seamless Planning with SAP Datasphere

## Overview

Seamless Planning is a new integration paradigm between SAP Analytics Cloud (SAC) and SAP Datasphere that unifies planning logic with enterprise-grade data storage and governance. Introduced in late 2025, it represents a significant shift in how planning data is managed.

**Key Concept**: SAC remains the planning experience and calculation engine while Datasphere becomes the authoritative and governed persistence layer for plan data and master data.

---

## Architecture

### Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SAP Analytics Cloud                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Planning Logic  │  │ Version Mgmt    │  │ Data Actions    │ │
│  │ & Calculations  │  │ & Edit Mode     │  │ & Multi Actions │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                              │                                   │
│                    Direct Persistence                           │
│                              │                                   │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SAP Datasphere                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Fact Tables     │  │ Dimension       │  │ Analytical      │ │
│  │ (Plan Data)     │  │ Tables          │  │ Models          │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│  Enterprise Data Governance & Reusability                       │
└─────────────────────────────────────────────────────────────────┘
```

### What Stays in SAC

- Planning calculations and formulas
- Version management logic
- Data actions and multi actions
- Calendar and workflow processes
- User interface and experience

### What Moves to Datasphere

- Fact data (planning transactions)
- Public dimension tables
- Physical storage of plan data
- Data governance and security
- Cross-system data integration

---

## Key Benefits

| Benefit | Description |
|---------|-------------|
| **Unified Planning Data** | Centralized storage ensures consistency across systems and workflows |
| **Direct Persistence** | Changes in SAC planning flows instantly reflect in Datasphere—no manual exports |
| **Optimized SAC Resources** | Offloading storage reduces SAC's memory and storage footprint |
| **Enterprise Reusability** | Datasphere's modeling and transformation extend to planning data |
| **Real-Time Analysis** | Live plan vs. actuals reporting without data duplication |
| **Governed Data** | Enterprise-grade security and governance on planning data |

---

## Prerequisites

### 1. SAC Tenant on SAP HANA Cloud

The SAC tenant must be provisioned on SAP HANA Cloud infrastructure.

**Verification**: Navigate to **System → About** in SAC and confirm the HANA Cloud version is listed.

### 2. Tenant Co-Location and 1:1 Linkage

- Both SAC and Datasphere tenants must reside in the **same SAP data center region**
- A **1:1 tenant relationship** is required—each SAC tenant links to exactly one Datasphere tenant

**Configuration**: **System → Administration → Tenant Links** in both SAC and Datasphere

### 3. Consistent Identity Provider (IdP)

- Both tenants should use the **same SAML-based Identity Provider**
- Ensures consistent user identity mapping across SAC and Datasphere

### 4. System Owner Credentials

- Tenant linkage requires authentication using a **system owner account** on both platforms
- Account must have **administrative privileges** to authorize cross-tenant integration

### 5. User Role Assignment in Datasphere Space

SAC users who need to create, edit, or expose planning models must be granted appropriate **space-level roles** in Datasphere:

| Role | Capability |
|------|------------|
| **DW Modeler** | Create and edit models in the space |
| **DW Integrator** | Import and export data |
| **DW Space Administrator** | Manage space settings and members |

Without these roles, Datasphere will not appear as a selectable data storage location in SAC.

---

## Configuration Workflow

### Step 1: Create a New Planning Model with Datasphere Storage

When creating a new model in SAC:

1. Navigate to **Modeler → Create New Model**
2. Select **Planning Model**
3. In **Data Storage Location**, select a **Datasphere Space**

```
┌─────────────────────────────────────┐
│ Create New Model                    │
├─────────────────────────────────────┤
│ Model Type: Planning Model          │
│                                     │
│ Data Storage Location:              │
│ ┌─────────────────────────────────┐ │
│ │ ○ SAP Analytics Cloud (default) │ │
│ │ ● SAP Datasphere Space:         │ │
│ │   [Finance_Planning_Space    ▼] │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Note**: The model is created as a **Planning Measure-based model** by default when using Datasphere persistence.

### Step 2: Configure Dimensions and Measures

Configure dimensions as normal. Public dimensions will be stored in Datasphere as dimension tables.

### Step 3: Expose Model to Datasphere

In **Model Details**, enable the option to expose the underlying fact table in the chosen Datasphere space.

**What Gets Created in Datasphere**:

| Object Type | Location | Description |
|-------------|----------|-------------|
| **Fact Object** | Datasphere Space | Read-only view of planning data |
| **Physical Table** | `sap.sac.<GUID>` | Actual storage for transactional data |
| **Dimension Tables** | Shared across Space | Public dimensions as reusable tables |

### Step 4: Execute Planning in SAC

Planning operations continue normally in SAC:

- Data entry in stories and applications
- Data actions and multi actions
- Version management and publishing
- Calendar workflows and approvals

All changes are **automatically persisted to Datasphere** without manual export.

---

## Planning Scenarios

### Actual vs. Plan Analysis

With Seamless Planning, actual vs. plan reporting becomes streamlined:

1. **Actuals**: Live connection from source systems (ERP, CRM) to Datasphere
2. **Plan Data**: Native planning in SAC, persisted to same Datasphere space
3. **Analysis**: Join actuals and plan in Datasphere Analytical Models
4. **Visualization**: Consume in SAC or other tools

### Cross-Model Planning

**Constraint**: All models involved in cross-model operations must be in the **same Datasphere space**.

This applies to:
- Data actions with cross-model copy steps
- Multi actions spanning multiple models
- Shared public dimensions

### Extended Modeling in Datasphere

Build custom calculations and transformations in Datasphere:

1. Create a **Datasphere View** on exposed SAC fact tables
2. Add calculations, joins, or aggregations
3. Create an **Analytical Model** on the view
4. Visualize in SAC for enhanced planning insights

---

## Limitations and Considerations

### Current Constraints

| Constraint | Description |
|------------|-------------|
| **Cross-Model in Same Space** | All models for cross-model operations must be in same Datasphere space |
| **Shared Public Dimensions** | Dimensions must be in same space as models using them |
| **Currency Rate Tables** | Must reside in same space as models referencing them |
| **Hierarchies** | SAC hierarchies are not exposed to Datasphere; must be recreated natively |
| **Import Models Only** | Seamless Planning only supports import data models |

### Hierarchy Handling

Hierarchies defined in SAC are **not automatically exposed** to Datasphere. If hierarchical structures are required for modeling or reporting:

1. Reconstruct hierarchies natively within Datasphere
2. Ensure alignment with underlying data model and semantic layer
3. Use Datasphere's hierarchy features for parent-child relationships

---

## SAP Business Data Cloud (BDC) Context

Seamless Planning is foundational to SAP Business Data Cloud, enabling:

- **Planning-enabled intelligent applications** combining analytics with actionable workflows
- **Extended platform support** including SAP Databricks
- **Data products** consumption directly within planning processes
- **Governed, reusable, scalable** planning assets

---

## Best Practices

### Model Design

1. **Plan for space organization** - Group related models in same Datasphere space
2. **Use public dimensions** - Enable sharing across models
3. **Design for governance** - Leverage Datasphere's security features

### Performance

1. **Filter data appropriately** - Reduce data volumes for faster operations
2. **Use Datasphere aggregations** - Pre-aggregate for reporting where possible
3. **Monitor resource usage** - Track SAC and Datasphere consumption

### Migration

When migrating existing SAC planning models to Seamless Planning:

1. **Create new model** with Datasphere storage (no direct migration path)
2. **Export/import data** from existing models
3. **Recreate data actions** pointing to new model
4. **Update stories and applications** to use new model

---

## Troubleshooting

### Datasphere Not Appearing as Storage Option

**Check**:
1. Tenant linkage configured correctly?
2. User has required Datasphere space roles?
3. Both tenants in same data center region?
4. Using same Identity Provider?

**Reference**: SAP KBA 3515100 for detailed error resolution

### Data Not Persisting

**Check**:
1. Model configured for Datasphere storage?
2. User has write permissions in Datasphere space?
3. Connection between tenants active?
4. No errors in job monitoring?

### Cross-Model Operations Failing

**Check**:
1. All involved models in same Datasphere space?
2. Public dimensions in same space?
3. Currency rate tables accessible?

---

## 2026 Enhancements (QRC2 2026 / 2026.8+)

### Data Import Service API: Master Data into Datasphere Public Dimensions

The Data Import Service API now supports importing master data into public dimensions stored in SAP Datasphere. This extends programmatic master data maintenance to Datasphere-managed dimensions used in seamless planning models.

**Use case**: Automate master data synchronization from source systems (e.g., S/4HANA) into Datasphere public dimensions consumed by seamless planning models, without manual UI operations.

Source: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US

### Data Import Service API: External Fact Data to Private Versions

The Data Import Service API now allows importing external fact data — from sources other than SAC and Datasphere — into an existing private version of a seamless planning model. This enables loading data from third-party planning tools or market data providers directly into SAC private versions for comparison and validation before publishing.

Source: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US

### Automatic Smart Insights Top Contributors

For seamless planning models, progressive loading of Top Contributors is now enabled automatically when dimensions or hierarchy levels exceed 20. No configuration required. Not supported for non-additive measures.

Source: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US

---

## Official Documentation Links

- **Seamless Planning Help**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/6d81dcce234b417e8afb8450abab785e.html
- **Datasphere Live Connection**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/ad4281e2875949f0b4d45d1072ff4c38.html
- **SAP Roadmap Explorer**: https://roadmaps.sap.com/board?q=seamless%20planning
- **SAP KBA 3515100**: Troubleshooting Seamless Planning errors
- **SAP Community Blog**: https://community.sap.com/t5/technology-blog-posts-by-sap/understanding-seamless-planning/ba-p/14273093

---

**Version**: 1.1.0
**Last Updated**: 2026-06-11
**SAC Version**: 2026.8
