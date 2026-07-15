# Portable deployment and trust

## User deployment

Run from the installed plugin root:

```powershell
./scripts/BwStudio.ps1 -Action Status -Json
./scripts/BwStudio.ps1 -Action Deploy -ArtifactPath <bundle.zip> -ManifestPath <manifest.json> -Json
./scripts/BwStudio.ps1 -Action Launch -Json
```

That local command requires no installation, administrator rights, Java, Node, Eclipse, or signing setup. Online deployment uses `-ReleaseChannelUrl <approved-channel.json>` plus a local pinned `-TrustPolicyPath` and remains signature-gated.

For local files, the deployer verifies archive SHA-512, platform/version, safe archive paths, bundle lock, every inventoried file, and all entrypoints before appending activation. Remote downloads additionally verify an RSA-SHA256 manifest signature.

Install location defaults to `%LOCALAPPDATA%\BWAutomationStudio`. No administrator rights, registry edits, machine `PATH`, package installation, or file associations are used.

## Append-only behavior

- Each deployment uses a new download/staging directory.
- Installed versions are immutable.
- Activation and rollback add timestamped records.
- Failed/old data is retained for manual inspection.
- No uninstall or cleanup command exists.

## Publisher setup

`config/trusted-publishers.json` is irrelevant for local use. It is needed only if a team later enables a shared remote download channel.

`bundle/Build-BwStudio.ps1` produces the runnable Eclipse/BWMT/JRE/Node/MCP bundle, per-file lock, CycloneDX SBOM, build provenance, and artifact manifest. The resulting local ZIP runs without a signature; detached signing is optional for remote distribution.

## Sources

- Pinned upstream URLs, official checksum sources, and verification status are recorded in `bundle/bundle-source-lock.json` and `docs/project/sap-bw-query-source-review-2026-07-13.md`.
