# BW Automation Studio third-party components

The release bundle is assembled from separately licensed components. Distribution owners must review and retain the licences included by each component before publishing an internal artifact.

- Eclipse Platform/SDK 4.40 — Eclipse Public License 2.0.
- SAP BW Modeling Tools 1.27.36 — SAP licence terms presented by the SAP update site.
- SapMachine 21.0.11 — GPL-2.0 with Classpath Exception and component notices.
- Node.js 24.18.0 — Node.js licence and bundled third-party notices.
- Model Context Protocol SDK 1.29.0 and bundled npm dependencies — licences recorded by the generated build metadata/SBOM.
- BW Automation plug-in and deployment sources — repository licence.

No third-party binary is committed to this repository. The release pipeline retrieves exact locked artifacts and records their hashes in the final bundle inventory.
