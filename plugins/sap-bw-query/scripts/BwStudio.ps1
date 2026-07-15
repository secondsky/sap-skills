[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("Status", "Deploy", "Launch", "Rollback", "Diagnostics")]
    [string]$Action,

    [switch]$Json,
    [string]$ArtifactPath,
    [string]$ManifestPath,
    [string]$SignaturePath,
    [string]$TrustPolicyPath,
    [string]$ReleaseChannelUrl,
    [string]$TargetVersion,
    [string]$WorkspacePath,
    [string]$ConnectionAlias
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Get-StudioHome {
    if ($env:BW_AUTOMATION_HOME) {
        return [System.IO.Path]::GetFullPath($env:BW_AUTOMATION_HOME)
    }
    return Join-Path $env:LOCALAPPDATA "BWAutomationStudio"
}

function Write-Result([hashtable]$Value) {
    if ($Json) {
        $Value | ConvertTo-Json -Depth 12 -Compress
    }
    else {
        $Value | ConvertTo-Json -Depth 12
    }
}

function Get-ActivationRecords([string]$StudioRoot) {
    $activationRoot = Join-Path $StudioRoot "activations"
    if (-not (Test-Path -LiteralPath $activationRoot -PathType Container)) {
        return @()
    }

    $records = @()
    foreach ($file in Get-ChildItem -LiteralPath $activationRoot -File -Filter "*.json" | Sort-Object Name) {
        try {
            $record = Get-Content -Raw -LiteralPath $file.FullName | ConvertFrom-Json
            if ($record.version) { $records += $record }
        }
        catch {
            # Append-only journals can contain an incomplete final write after a crash.
        }
    }
    return $records
}

function Get-Status([string]$StudioRoot) {
    $records = @(Get-ActivationRecords $StudioRoot)
    $active = if ($records.Count -gt 0) { $records[-1] } else { $null }
    $versionsRoot = Join-Path $StudioRoot "versions"
    $versions = if (Test-Path -LiteralPath $versionsRoot -PathType Container) {
        @(Get-ChildItem -LiteralPath $versionsRoot -Directory | Select-Object -ExpandProperty Name)
    }
    else { @() }

    return @{
        installed = ($null -ne $active)
        activeVersion = if ($active) { $active.version } else { $null }
        versions = $versions
        home = $StudioRoot
        requiresAdministrator = $false
        deletionPolicy = "append-only; automated deletion and cleanup are unavailable"
    }
}

function New-Directory([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        [System.IO.Directory]::CreateDirectory($Path) | Out-Null
    }
}

function Save-HttpsDownload([string]$Uri, [string]$Destination) {
    $parsed = $null
    if (-not [System.Uri]::TryCreate($Uri, [System.UriKind]::Absolute, [ref]$parsed) -or $parsed.Scheme -ne "https") {
        throw "Approved release downloads require HTTPS"
    }
    & curl.exe --fail --location --proto "=https" --tlsv1.2 --connect-timeout 30 --max-time 3600 --silent --show-error --output $Destination $parsed.AbsoluteUri
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $Destination -PathType Leaf)) {
        throw "Approved release download failed"
    }
}

function ConvertFrom-Base64Url([string]$Value) {
    $base64 = $Value.Replace("-", "+").Replace("_", "/")
    switch ($base64.Length % 4) {
        2 { $base64 += "==" }
        3 { $base64 += "=" }
    }
    return [System.Convert]::FromBase64String($base64)
}

function Get-ExtendedPath([string]$Path) {
    $fullPath = [System.IO.Path]::GetFullPath($Path)
    if ($fullPath.StartsWith("\\?\", [System.StringComparison]::Ordinal)) { return $fullPath }
    if ($fullPath.StartsWith("\\", [System.StringComparison]::Ordinal)) {
        return "\\?\UNC\" + $fullPath.Substring(2)
    }
    return "\\?\" + $fullPath
}

function Get-NormalizedSha512([string]$Path) {
    $stream = [System.IO.File]::OpenRead((Get-ExtendedPath $Path))
    $algorithm = [System.Security.Cryptography.SHA512]::Create()
    try {
        $hash = $algorithm.ComputeHash($stream)
        return [System.BitConverter]::ToString($hash).Replace("-", "").ToLowerInvariant()
    }
    finally {
        $stream.Dispose()
        $algorithm.Dispose()
    }
}

function Get-BridgePipeName([string]$StudioRoot) {
    $algorithm = [System.Security.Cryptography.SHA256]::Create()
    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($StudioRoot.ToLowerInvariant())
        $hex = [System.BitConverter]::ToString($algorithm.ComputeHash($bytes)).Replace("-", "").ToLowerInvariant()
        return "bw-automation-$($hex.Substring(0, 16))"
    }
    finally {
        $algorithm.Dispose()
    }
}

function Resolve-SafeChild([string]$Root, [string]$RelativePath) {
    if ([string]::IsNullOrWhiteSpace($RelativePath) -or [System.IO.Path]::IsPathRooted($RelativePath)) {
        throw "Bundle contains an unsafe path"
    }
    $normalized = $RelativePath.Replace("/", [System.IO.Path]::DirectorySeparatorChar)
    $candidate = [System.IO.Path]::GetFullPath((Join-Path $Root $normalized))
    $prefix = [System.IO.Path]::GetFullPath($Root).TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
    if (-not $candidate.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Bundle contains an unsafe path"
    }
    return $candidate
}

function Test-ArchivePaths([string]$Path) {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [System.IO.Compression.ZipFile]::OpenRead($Path)
    try {
        foreach ($entry in $archive.Entries) {
            $name = $entry.FullName.Replace("\", "/")
            if ($name.StartsWith("/") -or $name.Contains(":") -or $name -match "(^|/)\.\.(/|$)") {
                throw "Bundle archive contains an unsafe entry"
            }
        }
    }
    finally {
        $archive.Dispose()
    }
}

function Test-ManifestSignature([string]$ManifestFile, [string]$SignatureFile, [string]$PolicyFile) {
    foreach ($requiredPath in @($ManifestFile, $SignatureFile, $PolicyFile)) {
        if (-not (Test-Path -LiteralPath $requiredPath -PathType Leaf)) {
            throw "Required signed-release input is missing"
        }
    }

    $manifestBytes = [System.IO.File]::ReadAllBytes($ManifestFile)
    $manifest = [System.Text.Encoding]::UTF8.GetString($manifestBytes) | ConvertFrom-Json
    $policy = Get-Content -Raw -LiteralPath $PolicyFile | ConvertFrom-Json
    if ($manifest.schemaVersion -ne 1 -or $policy.schemaVersion -ne 1) {
        throw "Unsupported release trust schema"
    }
    $key = @($policy.keys | Where-Object { $_.id -eq $manifest.keyId })
    if ($key.Count -ne 1 -or $key[0].algorithm -ne "RSA-SHA256") {
        throw "Release signer is not trusted"
    }

    $parameters = New-Object System.Security.Cryptography.RSAParameters
    $parameters.Modulus = ConvertFrom-Base64Url $key[0].modulus
    $parameters.Exponent = ConvertFrom-Base64Url $key[0].exponent
    $rsa = [System.Security.Cryptography.RSA]::Create()
    try {
        $rsa.ImportParameters($parameters)
        $signature = [System.Convert]::FromBase64String((Get-Content -Raw -LiteralPath $SignatureFile).Trim())
        $valid = $rsa.VerifyData(
            $manifestBytes,
            $signature,
            [System.Security.Cryptography.HashAlgorithmName]::SHA256,
            [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
        )
        if (-not $valid) { throw "Release manifest signature is invalid" }
    }
    finally {
        $rsa.Dispose()
    }
    return $manifest
}

function New-Activation([string]$StudioRoot, [string]$Version, [string]$Kind, [string]$ManifestSha512) {
    $root = Join-Path $StudioRoot "activations"
    New-Directory $root
    $timestamp = [DateTime]::UtcNow.ToString("yyyyMMddTHHmmssfffffffZ")
    $record = [ordered]@{
        schemaVersion = 1
        version = $Version
        action = $Kind
        timestamp = [DateTime]::UtcNow.ToString("o")
        manifestSha512 = $ManifestSha512
    }
    $path = Join-Path $root "$timestamp-$([Guid]::NewGuid().ToString('N')).json"
    [System.IO.File]::WriteAllText($path, ($record | ConvertTo-Json -Compress), [System.Text.UTF8Encoding]::new($false))
    return $record
}

function Resolve-ReleaseInputs([string]$StudioRoot) {
    if ($ArtifactPath) {
        if (-not $ManifestPath) { throw "Local deployment requires the adjacent build manifest" }
        return @{
            artifact = [System.IO.Path]::GetFullPath($ArtifactPath)
            manifest = [System.IO.Path]::GetFullPath($ManifestPath)
            signature = if ($SignaturePath) { [System.IO.Path]::GetFullPath($SignaturePath) } else { $null }
            policy = if ($TrustPolicyPath) { [System.IO.Path]::GetFullPath($TrustPolicyPath) } else { $null }
            origin = "local"
        }
    }

    $pluginRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
    $offlineRoot = Join-Path $pluginRoot "assets\releases"
    if (Test-Path -LiteralPath $offlineRoot -PathType Container) {
        $offlineManifest = @(Get-ChildItem -LiteralPath $offlineRoot -File -Filter "*.manifest.json" | Sort-Object Name -Descending | Select-Object -First 1)
        if ($offlineManifest.Count -eq 1) {
            $data = Get-Content -Raw -LiteralPath $offlineManifest[0].FullName | ConvertFrom-Json
            return @{
                artifact = Join-Path $offlineRoot $data.artifactFileName
                manifest = $offlineManifest[0].FullName
                signature = "$($offlineManifest[0].FullName).sig"
                policy = if ($TrustPolicyPath) { [System.IO.Path]::GetFullPath($TrustPolicyPath) } else { Join-Path $pluginRoot "config\trusted-publishers.json" }
                origin = "local"
            }
        }
    }

    if (-not $ReleaseChannelUrl) { throw "No verified offline artifact or release channel was provided" }
    if (-not $TrustPolicyPath) { throw "Online deployment requires a local trust policy" }
    $downloadRoot = Join-Path (Join-Path $StudioRoot "downloads") ([Guid]::NewGuid().ToString("N"))
    New-Directory $downloadRoot
    $channelPath = Join-Path $downloadRoot "channel.json"
    Save-HttpsDownload $ReleaseChannelUrl $channelPath
    $channel = Get-Content -Raw -LiteralPath $channelPath | ConvertFrom-Json
    foreach ($field in @("artifactUrl", "manifestUrl", "signatureUrl")) {
        if (-not $channel.$field) { throw "Release channel is incomplete" }
    }
    $downloadArtifact = Join-Path $downloadRoot "bundle.zip"
    $downloadManifest = Join-Path $downloadRoot "bundle.manifest.json"
    $downloadSignature = Join-Path $downloadRoot "bundle.manifest.sig"
    Save-HttpsDownload $channel.artifactUrl $downloadArtifact
    Save-HttpsDownload $channel.manifestUrl $downloadManifest
    Save-HttpsDownload $channel.signatureUrl $downloadSignature
    return @{
        artifact = $downloadArtifact
        manifest = $downloadManifest
        signature = $downloadSignature
        policy = [System.IO.Path]::GetFullPath($TrustPolicyPath)
        origin = "remote"
    }
}

function Resolve-ManifestTrust($Inputs) {
    if (-not (Test-Path -LiteralPath $Inputs.manifest -PathType Leaf)) { throw "Bundle manifest is missing" }
    $manifest = Get-Content -Raw -LiteralPath $Inputs.manifest | ConvertFrom-Json
    if ($manifest.keyId -eq "LOCAL-UNSIGNED") {
        if ($Inputs.origin -ne "local") { throw "Unsigned bundles are accepted only from a local file" }
        return @{ manifest = $manifest; trustMode = "local-hash-and-inventory" }
    }
    return @{
        manifest = Test-ManifestSignature $Inputs.manifest $Inputs.signature $Inputs.policy
        trustMode = "signed-release"
    }
}

function Install-Studio([string]$StudioRoot) {
    $inputs = Resolve-ReleaseInputs $StudioRoot
    $trust = Resolve-ManifestTrust $inputs
    $manifest = $trust.manifest
    if ($manifest.platform -ne "windows-x64" -or -not $manifest.version) {
        throw "Release platform or version is not supported"
    }
    if ([System.IO.Path]::GetFileName($inputs.artifact) -ne $manifest.artifactFileName -and $ArtifactPath) {
        throw "Artifact filename does not match the manifest"
    }
    if ((Get-NormalizedSha512 $inputs.artifact) -ne $manifest.artifactSha512.ToLowerInvariant()) {
        throw "Bundle archive hash verification failed"
    }
    Test-ArchivePaths $inputs.artifact

    $versionsRoot = Join-Path $StudioRoot "versions"
    New-Directory $versionsRoot
    $versionRoot = Join-Path $versionsRoot $manifest.version
    if (-not (Test-Path -LiteralPath $versionRoot -PathType Container)) {
        $stagingParent = Join-Path $StudioRoot "staging"
        New-Directory $stagingParent
        $stagingRoot = Join-Path $stagingParent "$($manifest.version)-$([Guid]::NewGuid().ToString('N'))"
        New-Directory $stagingRoot
        & tar.exe -xf $inputs.artifact -C $stagingRoot
        if ($LASTEXITCODE -ne 0) { throw "Bundle archive extraction failed" }
        $lockPath = Join-Path $stagingRoot "bundle.lock.json"
        if (-not (Test-Path -LiteralPath $lockPath -PathType Leaf)) { throw "Bundle lock is missing" }
        $lock = Get-Content -Raw -LiteralPath $lockPath | ConvertFrom-Json
        if ($lock.schemaVersion -ne 1 -or $lock.bundleVersion -ne $manifest.version -or $lock.platform -ne "windows-x64") {
            throw "Bundle lock does not match the release manifest"
        }
        foreach ($file in $lock.files) {
            $filePath = Resolve-SafeChild $stagingRoot $file.path
            if (-not [System.IO.File]::Exists((Get-ExtendedPath $filePath))) { throw "Bundle inventory file is missing" }
            if ((Get-NormalizedSha512 $filePath) -ne $file.sha512.ToLowerInvariant()) { throw "Bundle inventory hash verification failed" }
        }
        foreach ($entrypoint in @($lock.entrypoints.eclipse, $lock.entrypoints.java, $lock.entrypoints.node, $lock.entrypoints.mcp)) {
            $entrypointPath = Resolve-SafeChild $stagingRoot $entrypoint
            if (-not [System.IO.File]::Exists((Get-ExtendedPath $entrypointPath))) { throw "Bundle entrypoint is missing" }
        }
        Move-Item -LiteralPath $stagingRoot -Destination $versionRoot
    }

    $manifestSha = Get-NormalizedSha512 $inputs.manifest
    New-Activation $StudioRoot $manifest.version "deploy" $manifestSha | Out-Null
    return @{
        deployed = $true
        verified = $true
        version = $manifest.version
        home = $StudioRoot
        appendOnly = $true
        trustMode = $trust.trustMode
    }
}

function Set-Rollback([string]$StudioRoot, [string]$Version) {
    if ([string]::IsNullOrWhiteSpace($Version)) { throw "TargetVersion is required" }
    $versionRoot = Join-Path (Join-Path $StudioRoot "versions") $Version
    if (-not (Test-Path -LiteralPath $versionRoot -PathType Container)) { throw "Requested rollback version is not installed" }
    New-Activation $StudioRoot $Version "rollback" "" | Out-Null
    $status = Get-Status $StudioRoot
    $status.rollbackRecorded = $true
    return $status
}

function Start-Studio([string]$StudioRoot) {
    $status = Get-Status $StudioRoot
    if (-not $status.installed) { throw "BW Automation Studio is not deployed" }
    $versionRoot = Join-Path (Join-Path $StudioRoot "versions") $status.activeVersion
    $lock = Get-Content -Raw -LiteralPath (Join-Path $versionRoot "bundle.lock.json") | ConvertFrom-Json
    $eclipse = Resolve-SafeChild $versionRoot $lock.entrypoints.eclipse
    $java = Resolve-SafeChild $versionRoot $lock.entrypoints.java
    $workspace = if ($WorkspacePath) { [System.IO.Path]::GetFullPath($WorkspacePath) } else { Join-Path $StudioRoot "workspace" }
    New-Directory $workspace
    $pipeName = Get-BridgePipeName $StudioRoot
    $launchArguments = @("-vm", $java, "-noPwdStore", "-data", $workspace, "-consoleLog", "-vmargs", "-Dbw.automation.pipe=$pipeName")
    if ($ConnectionAlias) { $launchArguments += "-Dbw.automation.connectionAlias=$ConnectionAlias" }
    Start-Process -FilePath $eclipse -ArgumentList $launchArguments | Out-Null
    return @{ launched = $true; version = $status.activeVersion; workspace = $workspace; passwordStorageDisabled = $true }
}

function Get-Diagnostics([string]$StudioRoot) {
    $status = Get-Status $StudioRoot
    $stagingRoot = Join-Path $StudioRoot "staging"
    $downloadRoot = Join-Path $StudioRoot "downloads"
    return @{
        status = $status
        retainedStagingDirectories = if (Test-Path -LiteralPath $stagingRoot) { @(Get-ChildItem -LiteralPath $stagingRoot -Directory).Count } else { 0 }
        retainedDownloadDirectories = if (Test-Path -LiteralPath $downloadRoot) { @(Get-ChildItem -LiteralPath $downloadRoot -Directory).Count } else { 0 }
        cleanupAvailable = $false
        note = "Incomplete and previous artifacts are retained because automated deletion is permanently unavailable."
    }
}

$studioRoot = Get-StudioHome

switch ($Action) {
    "Status" { Write-Result (Get-Status $studioRoot) }
    "Deploy" { Write-Result (Install-Studio $studioRoot) }
    "Launch" { Write-Result (Start-Studio $studioRoot) }
    "Rollback" { Write-Result (Set-Rollback $studioRoot $TargetVersion) }
    "Diagnostics" { Write-Result (Get-Diagnostics $studioRoot) }
}
