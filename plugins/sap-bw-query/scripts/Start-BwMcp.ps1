[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$studioRoot = if ($env:BW_AUTOMATION_HOME) {
    [System.IO.Path]::GetFullPath($env:BW_AUTOMATION_HOME)
}
else {
    Join-Path $env:LOCALAPPDATA "BWAutomationStudio"
}

$activationRoot = Join-Path $studioRoot "activations"
if (-not (Test-Path -LiteralPath $activationRoot -PathType Container)) {
    throw "BW Automation Studio is not deployed. Run the password-safe deployment command first."
}

$records = @()
foreach ($file in Get-ChildItem -LiteralPath $activationRoot -File -Filter "*.json" | Sort-Object Name) {
    try {
        $record = Get-Content -Raw -LiteralPath $file.FullName | ConvertFrom-Json
        if ($record.version) { $records += $record }
    }
    catch {
        # Ignore an incomplete append-only record left by an interrupted write.
    }
}
if ($records.Count -eq 0) { throw "No valid BW Automation Studio activation exists." }

$active = $records[-1]
$versionRoot = Join-Path (Join-Path $studioRoot "versions") $active.version
$lockPath = Join-Path $versionRoot "bundle.lock.json"
if (-not (Test-Path -LiteralPath $lockPath -PathType Leaf)) { throw "Active bundle.lock.json is missing." }
$lock = Get-Content -Raw -LiteralPath $lockPath | ConvertFrom-Json

function Resolve-BundlePath([string]$RelativePath) {
    if ([System.IO.Path]::IsPathRooted($RelativePath)) { throw "Bundle entrypoint is unsafe." }
    $candidate = [System.IO.Path]::GetFullPath((Join-Path $versionRoot $RelativePath.Replace("/", [System.IO.Path]::DirectorySeparatorChar)))
    $prefix = [System.IO.Path]::GetFullPath($versionRoot).TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
    if (-not $candidate.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) { throw "Bundle entrypoint is unsafe." }
    return $candidate
}

$node = Resolve-BundlePath $lock.entrypoints.node
$server = Resolve-BundlePath $lock.entrypoints.mcp
if (-not (Test-Path -LiteralPath $node -PathType Leaf) -or -not (Test-Path -LiteralPath $server -PathType Leaf)) {
    throw "Portable Node or MCP entrypoint is missing."
}

$env:BW_AUTOMATION_HOME = $studioRoot
$bundledStudioScript = Join-Path $versionRoot "scripts\BwStudio.ps1"
if (Test-Path -LiteralPath $bundledStudioScript -PathType Leaf) { $env:BW_STUDIO_SCRIPT = $bundledStudioScript }
& $node $server
exit $LASTEXITCODE
