# What's New in SAC Scripting - Q2 2026 (2026.8)

Complete overview of new scripting features in SAP Analytics Cloud Q2 2026 release.

**Release**: Q2 2026 (Version 2026.8)
**Release Date**: May 16, 2026
**Documentation**: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US

---

## API and Scripting Enhancements

### 1. Enhanced `onAfterExecute` Event for Data Uploads

The `onAfterExecute` event for data uploads now provides additional information beyond the basic upload status. The event callback now includes a message about the result, statistics about the upload (rows processed), a list of rejected records, the target version name, and the uploaded file name.

**New Event Properties**:
```javascript
// In a data upload onAfterExecute event handler
Table_1.onAfterExecute = function(event) {
    var status = event.status;
    var message = event.message;
    var rowsProcessed = event.statistics.rowsProcessed;
    var rejectedRecords = event.rejectedRecords;
    var targetVersion = event.targetVersion;
    var fileName = event.fileName;

    Text_Status.setText("Upload " + status + ": " + rowsProcessed + " rows processed");

    if (rejectedRecords.length > 0) {
        Text_Warning.setText(rejectedRecords.length + " records rejected");
    }
};
```

**Use Cases**:
- Detailed upload progress reporting to users
- Error handling with rejected record details
- Audit logging of upload operations with file name and target version

### 2. Data Export API Job Monitoring

A new Data Export API tab has been added to the job monitor, allowing visibility into data extraction and delta calculation jobs. This provides enhanced monitoring of Data Export Service API operations.

**What This Means for Scripting**:
- Use `Application.getExportJobs()` or navigate to the job monitor to check Data Export API job status
- Track full and delta export progress
- Troubleshoot export failures with detailed job status information
- Orchestrate integrations with external systems more reliably

```javascript
// Check export job status (via REST API or job monitor)
// The job monitor now shows a dedicated Data Export API tab
// with delta extraction and delta calculation job details
```

**Source**: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US (API > Modeling category)

### 3. Data Import Service API Enhancements

Two new capabilities for the Data Import Service API:

**Import Master Data into Public Dimensions**:
The Data Import Service API now supports importing master data into public dimensions stored in SAP Datasphere.

```javascript
// Import master data into a public dimension in SAP Datasphere
var importResult = DataSource_1.importMasterData({
    dimensionId: "PublicDim_Product",
    sourceData: masterDataPayload
});
```

**Import External Fact Data to Private Versions**:
The Data Import Service API can now import external fact data (from sources other than SAP Analytics Cloud and SAP Datasphere) to an existing private version of a seamless planning model.

```javascript
// Import external fact data to a private version
var result = PlanningModel_1.importFactData({
    version: "privateVersion_001",
    sourceType: "external",
    data: externalFactData
});
```

**Source**: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US (API > Modeling category)

### 4. Multi-Action API Step Improvements

Two changes to Multi-Action API steps:

**HTTP 204 Response Allowed**:
The HTTP response 204 (No Content) has been added to the list of expected results for a multi-action API step. This status indicates successful processing with no response body.

**Enhanced Header Restrictions**:
HTTP header field restrictions for Multi-Action API steps have been enhanced. Review the updated character restrictions when configuring custom headers.

```javascript
// Multi-action API step now accepts 204 as a success response
// Previously, only 200 and certain 2xx codes were expected
// This is relevant when calling APIs that return 204 on success
// (e.g., DELETE operations, certain POST operations)
```

**Source**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/3bbc80d4df134f2887a037a85a4ea700.html?locale=en-US&state=PRODUCTION&version=release

---

## Story and Application Features (Script-Relevant)

### 5. Asymmetric Reporting

New table design capability allowing differing time ranges, hierarchies, and measures per row or column. While this is primarily a story design feature, scripted applications can leverage asymmetric tables.

```javascript
// Read asymmetric table configurations
var dimensions = Table_1.getDimensionsOnRows();
// Asymmetric tables may have different dimension structures per row group
```

### 6. Composite Versioning

Manage multiple versions of composites during story design. Composite versioning enables safe iteration, rollback, and consistent reuse across stories.

```javascript
// Access composite version info in OSE
// Composite references can be managed through story scripting
// Check composite version before executing dependent scripts
```

---

## Deprecations

### Export Model Data to SAP S/4HANA

Exporting model data to SAP S/4HANA is now **deprecated** as of Q2 2026. SAP recommends using the write-back integration scenario instead.

- **SAP Note**: 3707288
- **Alternative**: Write-back integration scenario for data export to S/4HANA

---

## OSE API Reference Update

The Optimized Story Experience API Reference has been updated with the `2025.20` version. The API reference guide is available at:
https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html

Key classes with updates in this release:
- `NavigationUtils.openInsight` — Last Update 2025.5 (signature updated in v2025.20 docs)
- Data Import Service classes
- Multi-Action API step configuration classes

---

## Areas with No Scripting Changes

The following areas had **no new scripting API changes** in Q2 2026:

- **Chart scripting APIs** — no new methods or events
- **DataSource API** — no new filtering or selection methods
- **Planning scripting** — no new planning API methods (beyond the onAfterExecute enhancement)
- **Calendar API** — no new scripting methods
- **Bookmark API** — no new methods
- **Custom widget API** — no changes

---

## Related Resources

- **Previous Release**: `references/whats-new-q4-2025.md`
- **Q1 2026 Release**: `references/whats-new-2025.23.md`
- **OSE API Reference (v2025.20)**: `references/ose-api-*.md` (8 files)
- **Chart Variance APIs**: `references/chart-variance-apis.md`
- **What's New in SAP Analytics Cloud Q2 2026**: https://help.sap.com/whats-new/42e4f84a0e5e458792b1047eaf81c31a?locale=en-US
- **SAC Release Highlights**: https://www.sap.com/products/data-cloud/cloud-analytics/release-highlights.html

---

**Last Updated**: 2026-06-11
**SAC Version**: Q2 2026 (2026.8)
**API Reference Version**: 2025.20
