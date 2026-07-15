# SAP BW Query Automation Source Review

Review date: 2026-07-13

Scope: public source/package evidence, a complete Windows x64 bundle build, Eclipse plug-in compilation, signed local deployment, and automated safety tests. No live SAP BW system or enterprise SSO connection was used.

## Locked distribution inputs

| Component | Locked version | Source and integrity evidence |
| --- | --- | --- |
| Eclipse | Eclipse Modeling Tools 2026-06 R / Eclipse 4.40 | [Eclipse package](https://www.eclipse.org/downloads/packages/release/2026-06/r/eclipse-modeling-tools), fixed [2026-06 repository](https://download.eclipse.org/releases/2026-06), SHA-512 `bd618ccbfa4e5d0f11c8ebee2ff22f59aad1824875a792887b26a12977d725d18438515d558b651000e86ed3c51dd16e33ffd5f47dabebe7423dad1e80f8f025` |
| SAP BW Modeling Tools | 1.27.36 | Fixed [SAP 2026-06 update site](https://tools.hana.ondemand.com/2026-06), exact IU `com.sap.bw.feature.query.feature.group/1.27.36` |
| SapMachine JRE | 21.0.11 | [SAP SapMachine release](https://github.com/SAP/SapMachine/releases/tag/sapmachine-21.0.11), SHA-256 `b7bf063bd473c4656ce5ab2ae1e65bfaa88ae611cfc5f6e20a779e5395abe3a8` |
| SapMachine build JDK | 21.0.11 | Same release, SHA-256 `32d8d2b5d8fe4c761a625d6d8f51cd5e3cf3e427c715f8c8a828c668e00839be` |
| Node.js | 24.18.0 | [Node.js fixed distribution](https://nodejs.org/dist/v24.18.0/), SHA-256 `0ae68406b42d7725661da979b1403ec9926da205c6770827f33aac9d8f26e821` |
| MCP SDK / esbuild | 1.29.0 / 0.28.1 | Exact package-lock pins; `npm ci` reported zero vulnerabilities for the plug-in package on 2026-07-13 |

The Eclipse Modeling Tools package is intentional. The smaller Eclipse SDK 4.40 archive did not contain all EMF features required by SAP ADT/BWMT. The EPP profile is pinned as `epp.package.modeling`; the builder refuses a different profile or moving `latest` repository.

## Local build and deployment evidence

- `Build-BwStudio.ps1` assembled `bw-automation-studio-0.1.0-windows-x64.zip` on Windows without administrator rights.
- The artifact size was 1,049,207,848 bytes. Its generated manifest recorded SHA-512 `db694a2faf8dd45efaf1a5d892e43c169499ddd27c821e98101e3b30459ec7c400cdb9c3bc77b216577ea331808c6e5411a5f4c32ca2d158ff28aed284f4e608`.
- The per-file bundle lock covered 7,107 files and the four required entrypoints: Eclipse, SapMachine, Node, and the MCP server.
- The staged and deployed installation contained `com.sap.bw.qd.model_1.27.36.jar`, `com.sap.bw.qd.ui_1.27.36.jar`, and the compiled `com.sap.bw.automation_0.1.0.jar` with `AutomationView`, `BridgeLoop`, and `plugin.xml`.
- An ephemeral 3072-bit RSA validation key signed a copy of the release manifest. The deployer verified the detached signature, archive SHA-512, safe paths, every file hash, and all entrypoints in a non-admin temp path containing spaces.
- Diagnostics reported append-only version `0.1.0` active, automated cleanup unavailable, bundled Node `v24.18.0`, and SapMachine `21.0.11`.

The release trust file committed in the plug-in remains empty and fail-closed. An enterprise release is deployable only after CI receives an organization-controlled private signing key and publishes the corresponding public JWK policy.

## Safety evidence

The test suite covers nested/case-insensitive password keys, suspected credential text, absence of secret echoing, closed JSON schemas, the exact tool allow-list, append-only deployment and rollback, corrupt artifact rejection, connection metadata without credentials, named-pipe method allow-listing, QuerySpec gap analysis, local draft state transitions, collision blocking, Eclipse UI color classes, BWMT capability gating, and absence of delete/overwrite/transport/raw-command surfaces.

The save boundary remains deliberately split: MCP may only prepare a brand-new-query save request; the user must confirm the bound system/client/provider/name/specification hash in Eclipse and manually finish SAP's native wizard. The automation never invokes the final save command.

## Evidence boundary

This review does not claim live BW provider discovery, existing-query reads against a tenant, native SAP login behavior, SNC/SSO success, authorization behavior, transport behavior, query execution correctness, or backend query creation. Those remain release gates for an authorized BW sandbox. Existing-query inspection is fail-closed and limited to safely visible BW Query Designer editors until a tested BWMT adapter proves a broader read API for the locked version.
