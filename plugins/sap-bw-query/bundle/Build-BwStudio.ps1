[CmdletBinding()]
param(
    [string]$OutputDirectory = (Join-Path $PSScriptRoot "output"),
    [string]$CacheDirectory = (Join-Path $env:LOCALAPPDATA "BWAutomationStudioBuildCache"),
    [string]$SigningPrivateKeyPath,
    [string]$SigningKeyId,
    [string]$PublishDirectory = (Join-Path $env:USERPROFILE 'Desktop'),
    [switch]$SkipPublish,
    [switch]$SkipExplorer
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$pluginRoot = Split-Path -Parent $PSScriptRoot
$lockPath = Join-Path $PSScriptRoot "bundle-source-lock.json"
$sourceLock = Get-Content -Raw -LiteralPath $lockPath | ConvertFrom-Json
if ($sourceLock.schemaVersion -ne 1 -or $sourceLock.platform -ne "windows-x64") { throw "Unsupported bundle source lock" }
if ($sourceLock.bwmt.repository -match "/latest") { throw "Moving update sites are forbidden" }
if ($sourceLock.bwmt.installUnits -notcontains "com.sap.bw.feature.query.feature.group/1.27.36") { throw "Exact BWMT Query Designer unit is required" }

function New-Directory([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) { [System.IO.Directory]::CreateDirectory($Path) | Out-Null }
}

function Test-OneDrivePath([string]$Path) {
    if ([string]::IsNullOrWhiteSpace($Path)) { return $false }
    $full = [System.IO.Path]::GetFullPath($Path)
    foreach ($root in @($env:OneDrive, $env:OneDriveCommercial, $env:OneDriveConsumer)) {
        if (-not [string]::IsNullOrWhiteSpace($root)) {
            $normalized = $root.TrimEnd("\")
            if ($full.Equals($normalized, [System.StringComparison]::OrdinalIgnoreCase) -or $full.StartsWith($normalized + "\", [System.StringComparison]::OrdinalIgnoreCase)) { return $true }
        }
    }
    return $full -match '\\OneDrive( |$|\\|-)'
}

function Get-Hash([string]$Path, [string]$Algorithm) {
    $instance = if ($Algorithm -eq "SHA512") { [System.Security.Cryptography.SHA512]::Create() } else { [System.Security.Cryptography.SHA256]::Create() }
    $stream = [System.IO.File]::OpenRead($Path)
    try { return [System.BitConverter]::ToString($instance.ComputeHash($stream)).Replace("-", "").ToLowerInvariant() }
    finally { $stream.Dispose(); $instance.Dispose() }
}

function Test-DownloadHash([string]$Path, [string]$Algorithm, [string]$Expected) {
    if ((Get-Hash $Path $Algorithm) -ne $Expected.ToLowerInvariant()) { throw "Executable dependency hash verification failed" }
}

function Get-LockedDownload($Component) {
    New-Directory $CacheDirectory
    $target = Join-Path $CacheDirectory $Component.fileName
    $sha512Property = $Component.PSObject.Properties["sha512"]
    $sha256Property = $Component.PSObject.Properties["sha256"]
    if ($sha512Property -and $sha512Property.Value) {
        $algorithm = "SHA512"
        $expected = $sha512Property.Value
    }
    elseif ($sha256Property -and $sha256Property.Value) {
        $algorithm = "SHA256"
        $expected = $sha256Property.Value
    }
    else {
        throw "Locked executable dependency has no supported hash"
    }
    if (-not (Test-Path -LiteralPath $target -PathType Leaf)) {
        $partial = Join-Path $CacheDirectory "$($Component.fileName).$([Guid]::NewGuid().ToString('N')).partial"
        & curl.exe --fail --location --silent --show-error --output $partial $Component.url
        if ($LASTEXITCODE -ne 0) { throw "Locked dependency download failed" }
        Test-DownloadHash $partial $algorithm $expected
        Move-Item -LiteralPath $partial -Destination $target
    }
    Test-DownloadHash $target $algorithm $expected
    return $target
}

function Expand-SingleRoot([string]$Archive, [string]$Destination) {
    $entries = @(& tar.exe -tf $Archive)
    if ($LASTEXITCODE -ne 0 -or $entries.Count -eq 0) { throw "Locked dependency archive could not be inspected" }
    $roots = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
    foreach ($entry in $entries) {
        $normalized = "$entry".Replace("\", "/")
        if ([string]::IsNullOrWhiteSpace($normalized)) { continue }
        if ($normalized.StartsWith("/") -or $normalized -match "^[A-Za-z]:" -or $normalized.Split("/") -contains "..") {
            throw "Locked dependency archive contains an unsafe path"
        }
        $segments = @($normalized.Split("/", [System.StringSplitOptions]::RemoveEmptyEntries))
        if ($segments.Count -gt 0) { $roots.Add($segments[0]) | Out-Null }
    }
    if ($roots.Count -ne 1) { throw "Expected a single archive root" }
    New-Directory $Destination
    & tar.exe -xf $Archive -C $Destination --strip-components=1
    if ($LASTEXITCODE -ne 0) { throw "Locked dependency extraction failed" }
}

function Copy-Tree([string]$Source, [string]$Destination) {
    New-Directory $Destination
    Copy-Item -Path (Join-Path $Source "*") -Destination $Destination -Recurse
}

New-Directory $OutputDirectory
$workRoot = Join-Path $env:TEMP "bwa-$([Guid]::NewGuid().ToString('N'))"
$stage = Join-Path $workRoot "bundle"
New-Directory $stage

$eclipseArchive = Get-LockedDownload $sourceLock.eclipse
$jreArchive = Get-LockedDownload $sourceLock.sapMachineJre
$jdkArchive = Get-LockedDownload $sourceLock.sapMachineJdk
$nodeArchive = Get-LockedDownload $sourceLock.node

Expand-SingleRoot $eclipseArchive (Join-Path $stage "eclipse")
Expand-SingleRoot $jreArchive (Join-Path $stage "jre")
Expand-SingleRoot $jdkArchive (Join-Path $workRoot "jdk")
Expand-SingleRoot $nodeArchive (Join-Path $stage "node")

$jdkRoot = Join-Path $workRoot "jdk"
$eclipseRoot = Join-Path $stage "eclipse"
$director = Join-Path $eclipseRoot "eclipsec.exe"
$java = Join-Path $jdkRoot "bin\java.exe"
$installUnits = @($sourceLock.eclipse.prerequisiteUnits) + @($sourceLock.bwmt.installUnits)
$installUnits = $installUnits -join ","
$repositories = @($sourceLock.eclipse.repository, $sourceLock.bwmt.repository) -join ","
$previousErrorActionPreference = $ErrorActionPreference
try {
    # Eclipse writes harmless JVM warnings to stderr; capture them without
    # allowing Windows PowerShell to convert them into terminating errors.
    $ErrorActionPreference = "Continue"
    $installOutput = & $director -nosplash -vm $java -application org.eclipse.equinox.p2.director `
        -repository $repositories -installIU $installUnits -destination $eclipseRoot `
        -profile $sourceLock.eclipse.profile -profileProperties org.eclipse.update.install.features=true -roaming 2>&1
    $installExitCode = $LASTEXITCODE
}
finally {
    $ErrorActionPreference = $previousErrorActionPreference
}
if ($installExitCode -ne 0) { throw "BWMT p2 installation failed:`n$($installOutput -join [Environment]::NewLine)" }

try {
    $ErrorActionPreference = "Continue"
    $installed = & $director -nosplash -vm $java -application org.eclipse.equinox.p2.director `
        -destination $eclipseRoot -profile $sourceLock.eclipse.profile -listInstalledRoots 2>&1
    $listExitCode = $LASTEXITCODE
}
finally {
    $ErrorActionPreference = $previousErrorActionPreference
}
if ($listExitCode -ne 0 -or ($installed -join "`n") -notmatch "com\.sap\.bw\.feature\.query\.feature\.group[/= ]+1\.27\.36") {
    throw "Exact BWMT Query Designer installation was not proven"
}

$eclipsePluginRoot = Join-Path $pluginRoot "eclipse\plugins\com.sap.bw.automation"
$sourceRoot = Join-Path $eclipsePluginRoot "src"
$classes = Join-Path $workRoot "eclipse-plugin-classes"
New-Directory $classes
$sources = Get-ChildItem -LiteralPath $sourceRoot -Recurse -Filter "*.java" | Select-Object -ExpandProperty FullName
& (Join-Path $jdkRoot "bin\javac.exe") --release 21 -encoding UTF-8 --source-path $sourceRoot `
    -classpath "$eclipseRoot\plugins\*" -d $classes $sources
if ($LASTEXITCODE -ne 0) { throw "BW Automation Eclipse plug-in compilation failed" }
$pluginJar = Join-Path $eclipseRoot "plugins\com.sap.bw.automation_0.3.0.jar"
& (Join-Path $jdkRoot "bin\jar.exe") cfm $pluginJar (Join-Path $eclipsePluginRoot "META-INF\MANIFEST.MF") `
    -C $classes . -C $eclipsePluginRoot plugin.xml
if ($LASTEXITCODE -ne 0) { throw "BW Automation Eclipse plug-in packaging failed" }
$bundlesInfo = Join-Path $eclipseRoot "configuration\org.eclipse.equinox.simpleconfigurator\bundles.info"
if (-not (Test-Path -LiteralPath $bundlesInfo -PathType Leaf)) { throw "Eclipse bundle registry is missing" }
$automationBundleEntry = "com.sap.bw.automation,0.3.0,plugins/com.sap.bw.automation_0.3.0.jar,4,true"
if (-not (Select-String -LiteralPath $bundlesInfo -SimpleMatch $automationBundleEntry -Quiet)) {
    [System.IO.File]::AppendAllText($bundlesInfo, [Environment]::NewLine + $automationBundleEntry, [System.Text.UTF8Encoding]::new($false))
}

& npm.cmd --prefix (Join-Path $pluginRoot "mcp") ci --ignore-scripts
if ($LASTEXITCODE -ne 0) { throw "MCP dependency installation failed" }
& npm.cmd --prefix (Join-Path $pluginRoot "mcp") run build
if ($LASTEXITCODE -ne 0) { throw "MCP bundle build failed" }
New-Directory (Join-Path $stage "mcp")
Copy-Item -LiteralPath (Join-Path $pluginRoot "mcp\dist\server.mjs") -Destination (Join-Path $stage "mcp\server.mjs")
if (Test-Path -LiteralPath (Join-Path $pluginRoot "mcp\dist\server.LICENSE.txt")) {
    Copy-Item -LiteralPath (Join-Path $pluginRoot "mcp\dist\server.LICENSE.txt") -Destination (Join-Path $stage "mcp\server.LICENSE.txt")
}
New-Directory (Join-Path $stage "scripts")
Copy-Item -LiteralPath (Join-Path $pluginRoot "scripts\BwStudio.ps1") -Destination (Join-Path $stage "scripts\BwStudio.ps1")
Copy-Item -LiteralPath (Join-Path $pluginRoot "scripts\Start-BwMcp.ps1") -Destination (Join-Path $stage "scripts\Start-BwMcp.ps1")
Copy-Item -LiteralPath (Join-Path $PSScriptRoot "THIRD_PARTY_NOTICES.md") -Destination (Join-Path $stage "THIRD_PARTY_NOTICES.md")
Copy-Item -LiteralPath $lockPath -Destination (Join-Path $stage "bundle-source-lock.json")

$evidenceRoot = Join-Path $stage "evidence"
New-Directory $evidenceRoot
$sbom = [ordered]@{
    bomFormat = "CycloneDX"
    specVersion = "1.5"
    version = 1
    metadata = @{ timestamp = [DateTime]::UtcNow.ToString("o"); component = @{ type = "application"; name = "BW Automation Studio"; version = $sourceLock.bundleVersion } }
    components = @(
        @{ type = "application"; name = "Eclipse SDK"; version = $sourceLock.eclipse.version },
        @{ type = "framework"; name = "SAP BW Modeling Tools"; version = $sourceLock.bwmt.version },
        @{ type = "framework"; name = "SapMachine JRE"; version = $sourceLock.sapMachineJre.version },
        @{ type = "framework"; name = "Node.js"; version = $sourceLock.node.version },
        @{ type = "library"; name = "@modelcontextprotocol/sdk"; version = $sourceLock.mcp.sdk },
        @{ type = "application"; name = "com.sap.bw.automation"; version = $sourceLock.eclipsePlugin.version }
    )
}
[System.IO.File]::WriteAllText((Join-Path $evidenceRoot "sbom.cdx.json"), ($sbom | ConvertTo-Json -Depth 10), [System.Text.UTF8Encoding]::new($false))
$provenance = [ordered]@{
    schemaVersion = 1
    createdAt = [DateTime]::UtcNow.ToString("o")
    sourceLockSha512 = Get-Hash $lockPath "SHA512"
    buildHost = "windows-x64"
    passwordStorageLaunchArgument = "-noPwdStore"
    signedReleaseRequiredForRemoteDeployment = $true
    localDeploymentVerification = "archive-sha512-and-per-file-sha512-inventory"
}
[System.IO.File]::WriteAllText((Join-Path $evidenceRoot "build-provenance.json"), ($provenance | ConvertTo-Json -Depth 6), [System.Text.UTF8Encoding]::new($false))

$files = @()
foreach ($file in Get-ChildItem -LiteralPath $stage -Recurse -File | Sort-Object FullName) {
    $relative = $file.FullName.Substring($stage.Length + 1).Replace("\", "/")
    if ($relative -eq "bundle.lock.json") { continue }
    $files += [ordered]@{ path = $relative; sha512 = Get-Hash $file.FullName "SHA512" }
}
$bundleLock = [ordered]@{
    schemaVersion = 1
    bundleVersion = $sourceLock.bundleVersion
    platform = "windows-x64"
    components = @{ eclipse = $sourceLock.eclipse.version; bwmt = $sourceLock.bwmt.version; java = $sourceLock.sapMachineJre.version; node = $sourceLock.node.version }
    entrypoints = @{ eclipse = "eclipse/eclipse.exe"; java = "jre/bin/javaw.exe"; node = "node/node.exe"; mcp = "mcp/server.mjs" }
    files = $files
}
[System.IO.File]::WriteAllText((Join-Path $stage "bundle.lock.json"), ($bundleLock | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))

$artifactName = "bw-automation-studio-$($sourceLock.bundleVersion)-windows-x64.zip"
$artifact = Join-Path $OutputDirectory $artifactName
if (Test-Path -LiteralPath $artifact) { throw "Release artifact already exists; use a new output directory" }
& tar.exe -a -cf $artifact -C $stage .
if ($LASTEXITCODE -ne 0) { throw "Release archive creation failed" }
$manifest = [ordered]@{
    schemaVersion = 1
    version = $sourceLock.bundleVersion
    platform = "windows-x64"
    artifactFileName = $artifactName
    artifactSha512 = Get-Hash $artifact "SHA512"
    keyId = if ($SigningKeyId) { $SigningKeyId } else { "LOCAL-UNSIGNED" }
}
$manifestPath = Join-Path $OutputDirectory "$artifactName.manifest.json"
[System.IO.File]::WriteAllText($manifestPath, ($manifest | ConvertTo-Json -Compress), [System.Text.UTF8Encoding]::new($false))

if ($SigningPrivateKeyPath -and $SigningKeyId) {
    $signaturePath = "$manifestPath.sig"
    $releaseTrustPath = Join-Path $OutputDirectory "trusted-publishers.release.json"
    & node.exe (Join-Path $PSScriptRoot "sign-bundle.mjs") $manifestPath $SigningPrivateKeyPath $SigningKeyId $signaturePath $releaseTrustPath
    if ($LASTEXITCODE -ne 0) { throw "Release signing failed" }
}
else {
    Write-Host "Local runnable build created. Remote distribution requires signing."
}

$published = @()
$publishSkippedReason = $null
$zipShortcut = $null
if (-not $SkipPublish -and $PublishDirectory) {
    try {
        $publishExplicit = $PSBoundParameters.ContainsKey('PublishDirectory')
        $publishOneDrive = Test-OneDrivePath $PublishDirectory
        if ($publishOneDrive -and -not $publishExplicit) {
            $publishSkippedReason = "ONEDRIVE_MANAGED"
            Write-Warning "Skipping auto-publish: the default Desktop '$PublishDirectory' is OneDrive-managed and large bundles should not sync to the cloud. The build succeeded and the artifacts remain in '$OutputDirectory'; pass an explicit -PublishDirectory to override."
        }
        else {
            if ($publishOneDrive) {
                Write-Warning "Publish target '$PublishDirectory' appears to be OneDrive-managed; publishing there because it was requested explicitly via -PublishDirectory."
            }
            New-Directory $PublishDirectory
            $publishSources = @($artifact, $manifestPath, "$manifestPath.sig", (Join-Path $OutputDirectory "trusted-publishers.release.json"))
            $publishedArtifact = $null
            foreach ($source in $publishSources) {
                if (Test-Path -LiteralPath $source -PathType Leaf) {
                    $destination = Join-Path $PublishDirectory (Split-Path -Leaf $source)
                    Copy-Item -LiteralPath $source -Destination $destination -Force
                    $published += $destination
                    if ($source -eq $artifact) { $publishedArtifact = $destination }
                }
            }
            # The 1 GB ZIP stays on the (local) publish directory to avoid a cloud upload, but the
            # user's VISIBLE desktop is often OneDrive-redirected. Drop a small .lnk there pointing
            # at the local ZIP so it is visible/clickable while only a few KB sync. Non-fatal.
            $visibleDesktop = [Environment]::GetFolderPath("Desktop")
            if ($publishedArtifact -and -not [string]::IsNullOrWhiteSpace($visibleDesktop)) {
                try {
                    New-Directory $visibleDesktop
                    if ([System.IO.Path]::GetFullPath($visibleDesktop) -ne [System.IO.Path]::GetFullPath($PublishDirectory)) {
                        $shell = New-Object -ComObject WScript.Shell
                        try {
                            $linkPath = Join-Path $visibleDesktop ((Split-Path -Leaf $publishedArtifact) + ".lnk")
                            $shortcut = $shell.CreateShortcut($linkPath)
                            $shortcut.TargetPath = $publishedArtifact
                            $shortcut.WorkingDirectory = (Split-Path -Parent $publishedArtifact)
                            $shortcut.Description = "SAP BW Automation Studio bundle ($artifactName)"
                            $shortcut.Save()
                            $zipShortcut = $linkPath
                        }
                        finally {
                            [System.Runtime.InteropServices.Marshal]::ReleaseComObject($shell) | Out-Null
                        }
                    }
                }
                catch {
                    Write-Warning "Creating the visible-desktop shortcut to the bundle ZIP failed ($($_.Exception.Message)); the build and local publish succeeded."
                }
            }
        }
    }
    catch {
        $published = @()
        Write-Warning "Publishing build artifacts to '$PublishDirectory' failed ($($_.Exception.Message)); the build itself succeeded and the files remain in '$OutputDirectory'."
    }
}

$explorerOpened = $false
if (-not $SkipExplorer -and -not $env:CI -and [Environment]::UserInteractive) {
    try {
        Start-Process -FilePath explorer.exe -ArgumentList "/select,`"$artifact`""
        $explorerOpened = $true
    }
    catch {
        Write-Warning "Opening File Explorer on '$OutputDirectory' failed ($($_.Exception.Message)); the build itself succeeded and the artifacts remain there."
    }
}

[ordered]@{ artifact = $artifact; manifest = $manifestPath; signed = [bool]($SigningPrivateKeyPath -and $SigningKeyId); workRoot = $workRoot; published = @($published); publishDirectory = if ($SkipPublish) { $null } else { $PublishDirectory }; publishSkippedReason = $publishSkippedReason; zipShortcut = $zipShortcut; explorerOpened = $explorerOpened } | ConvertTo-Json
