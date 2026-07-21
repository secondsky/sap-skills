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

After a successful build, the builder also copies the release ZIP and its manifest (plus the detached `.sig` and `trusted-publishers.release.json` files when the build is signed) to the local user Desktop (`%USERPROFILE%\Desktop`, created if missing). This is deliberately the local Desktop and not the OneDrive-redirected Desktop, so large bundles are not synced to the cloud. If that Desktop is itself OneDrive-managed (for example under Known Folder Move), the builder refuses to auto-publish there, warns, and leaves the artifacts in the output directory. Pass `-PublishDirectory <path>` to retarget the copy (including to a synced folder if you want that, which is always honored when requested explicitly), or `-SkipPublish` to disable it entirely. This step is best-effort: a copy failure only emits a warning and never fails the build, and the authoritative artifacts always remain in the builder's output directory. After publishing, the builder opens Windows File Explorer on the output directory with the release ZIP selected so you can see the built app; suppress it with `-SkipExplorer`, and it is skipped automatically in CI or non-interactive sessions.

## Sources

- Pinned upstream URLs, official checksum sources, and verification status are recorded in `bundle/bundle-source-lock.json` and `docs/project/sap-bw-query-source-review-2026-07-13.md`.
