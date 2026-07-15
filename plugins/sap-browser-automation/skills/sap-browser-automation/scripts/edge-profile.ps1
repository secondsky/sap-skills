[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('CloneLaunch', 'LaunchExisting', 'Status', 'Stop')]
  [string]$Action,

  [string]$SourceUserData = (Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\User Data'),

  [ValidatePattern('^(Default|Profile [0-9]+)$')]
  [string]$ProfileName = 'Default',

  [string]$AutomationRoot = (Join-Path $env:LOCALAPPDATA 'Codex\SAP-Automation-Edge'),

  [string]$TargetUrl,

  [string]$EdgeExecutable,

  [ValidateRange(2, 120)]
  [int]$StartupTimeoutSeconds = 20,

  [switch]$Headless
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

function Get-FullPath {
  param([Parameter(Mandatory = $true)][string]$Path)
  return [System.IO.Path]::GetFullPath([Environment]::ExpandEnvironmentVariables($Path))
}

function Get-EdgeExecutable {
  param([string]$RequestedPath)

  if ($RequestedPath) {
    $explicitPath = Get-FullPath $RequestedPath
    if (-not (Test-Path -LiteralPath $explicitPath -PathType Leaf)) {
      throw "Requested Microsoft Edge executable was not found: $explicitPath"
    }
    return $explicitPath
  }

  $candidates = @()
  if (${env:ProgramFiles(x86)}) {
    $candidates += (Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe')
  }
  if ($env:ProgramFiles) {
    $candidates += (Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe')
  }
  if ($env:LOCALAPPDATA) {
    $candidates += (Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\Application\msedge.exe')
  }

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate -PathType Leaf) { return (Get-FullPath $candidate) }
  }
  throw "Microsoft Edge was not found. Checked: $($candidates -join ', ')"
}

function Get-EdgeProcessesForRoot {
  param([Parameter(Mandatory = $true)][string]$Root)

  $fullRoot = Get-FullPath $Root
  $escapedRoot = [Regex]::Escape($fullRoot)
  return @(Get-CimInstance Win32_Process -Filter "Name = 'msedge.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -and $_.CommandLine -match $escapedRoot })
}

function Assert-SourceProfileClosed {
  param([Parameter(Mandatory = $true)][string]$Root)

  $fullRoot = Get-FullPath $Root
  $normalRoot = Get-FullPath (Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\User Data')
  if ([string]::Equals($fullRoot, $normalRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    if (Get-Process msedge -ErrorAction SilentlyContinue) {
      throw 'Close all Microsoft Edge windows before cloning the normal Edge profile.'
    }
    return
  }

  $sourceProcesses = @(Get-EdgeProcessesForRoot $fullRoot)
  if ($sourceProcesses.Count -gt 0) {
    throw "Close the Edge instance using source profile: $fullRoot"
  }
}

function Assert-AutomationProfileStopped {
  param([Parameter(Mandatory = $true)][string]$Root)

  $automationProcesses = @(Get-EdgeProcessesForRoot $Root)
  if ($automationProcesses.Count -gt 0) {
    throw "An Edge process is already using the automation profile: $Root"
  }
}

function Copy-ProfileToEmptyDestination {
  param(
    [Parameter(Mandatory = $true)][string]$SourceRoot,
    [Parameter(Mandatory = $true)][string]$SourceProfileName,
    [Parameter(Mandatory = $true)][string]$DestinationRoot
  )

  $source = Get-FullPath $SourceRoot
  $destination = Get-FullPath $DestinationRoot
  if ([string]::Equals($source, $destination, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'Source and destination user-data directories must be different.'
  }

  $localState = Join-Path $source 'Local State'
  $sourceProfile = Join-Path $source $SourceProfileName
  if (-not (Test-Path -LiteralPath $localState -PathType Leaf)) {
    throw "Missing Edge Local State: $localState"
  }
  if (-not (Test-Path -LiteralPath $sourceProfile -PathType Container)) {
    throw "Missing Edge profile: $sourceProfile"
  }

  Assert-SourceProfileClosed $source
  Assert-AutomationProfileStopped $destination

  if (Test-Path -LiteralPath $destination) {
    $existing = @(Get-ChildItem -LiteralPath $destination -Force -ErrorAction Stop | Select-Object -First 1)
    if ($existing.Count -gt 0) {
      throw "AutomationRoot is non-empty. Use -Action LaunchExisting or choose a new destination: $destination"
    }
  }

  $staging = "$destination.clone-$([Guid]::NewGuid().ToString('N'))"
  try {
    New-Item -ItemType Directory -Path $staging -Force | Out-Null
    Copy-Item -LiteralPath $localState -Destination (Join-Path $staging 'Local State') -Force
    Copy-Item -LiteralPath $sourceProfile -Destination (Join-Path $staging $SourceProfileName) -Recurse -Force

    if (Test-Path -LiteralPath $destination) {
      Remove-Item -LiteralPath $destination -Force
    } else {
      $parent = Split-Path -Parent $destination
      if ($parent) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
    }
    Move-Item -LiteralPath $staging -Destination $destination
  } finally {
    if (Test-Path -LiteralPath $staging) {
      Remove-Item -LiteralPath $staging -Recurse -Force
    }
  }
}

function Get-ProfileStatus {
  param([Parameter(Mandatory = $true)][string]$Root)

  $fullRoot = Get-FullPath $Root
  $activePortFile = Join-Path $fullRoot 'DevToolsActivePort'
  if (-not (Test-Path -LiteralPath $activePortFile -PathType Leaf)) {
    return [pscustomobject]@{
      running = $false
      loopback = $false
      port = $null
      processId = $null
      profileRoot = $fullRoot
    }
  }

  $lines = @(Get-Content -LiteralPath $activePortFile -ErrorAction Stop)
  $port = 0
  if ($lines.Count -lt 2 -or -not [int]::TryParse($lines[0], [ref]$port) -or $port -le 0) {
    return [pscustomobject]@{
      running = $false
      loopback = $false
      port = $null
      processId = $null
      profileRoot = $fullRoot
    }
  }

  $listener = @(Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
    Where-Object { $_.LocalAddress -eq '127.0.0.1' -or $_.LocalAddress -eq '::1' } |
    Select-Object -First 1)
  if ($listener.Count -eq 0) {
    return [pscustomobject]@{
      running = $false
      loopback = $false
      port = $port
      processId = $null
      profileRoot = $fullRoot
    }
  }

  $owner = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener[0].OwningProcess)" -ErrorAction SilentlyContinue
  $belongsToProfile = $owner -and $owner.CommandLine -and $owner.CommandLine -match [Regex]::Escape($fullRoot)
  return [pscustomobject]@{
    running = [bool]$belongsToProfile
    loopback = [bool]$belongsToProfile
    port = $port
    processId = if ($belongsToProfile) { [int]$listener[0].OwningProcess } else { $null }
    profileRoot = $fullRoot
  }
}

function Start-AutomationEdge {
  param(
    [Parameter(Mandatory = $true)][string]$Root,
    [Parameter(Mandatory = $true)][string]$SelectedProfile,
    [string]$Url,
    [string]$RequestedEdge,
    [int]$TimeoutSeconds,
    [switch]$UseHeadless
  )

  $fullRoot = Get-FullPath $Root
  $profilePath = Join-Path $fullRoot $SelectedProfile
  if (-not (Test-Path -LiteralPath $profilePath -PathType Container)) {
    throw "Missing automation Edge profile: $profilePath"
  }
  Assert-AutomationProfileStopped $fullRoot

  $activePortFile = Join-Path $fullRoot 'DevToolsActivePort'
  if (Test-Path -LiteralPath $activePortFile) {
    Remove-Item -LiteralPath $activePortFile -Force
  }

  $edge = Get-EdgeExecutable $RequestedEdge
  $arguments = @(
    '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=0',
    "--user-data-dir=`"$fullRoot`"",
    "--profile-directory=`"$SelectedProfile`"",
    '--no-first-run',
    '--no-default-browser-check'
  )
  if ($UseHeadless) {
    $arguments += '--headless=new'
    $arguments += '--disable-gpu'
  }
  if ($Url) { $arguments += "`"$Url`"" }
  $argumentLine = $arguments -join ' '

  if ($UseHeadless) {
    Start-Process -FilePath $edge -ArgumentList $argumentLine -WindowStyle Hidden | Out-Null
  } else {
    Start-Process -FilePath $edge -ArgumentList $argumentLine | Out-Null
  }

  $deadline = [DateTime]::UtcNow.AddSeconds($TimeoutSeconds)
  do {
    Start-Sleep -Milliseconds 250
    $status = Get-ProfileStatus $fullRoot
    if ($status.running) {
      return [pscustomobject]@{
        action = $Action
        running = $true
        loopback = $status.loopback
        port = $status.port
        processId = $status.processId
        profileRoot = $fullRoot
        profileName = $SelectedProfile
        targetUrl = $Url
      }
    }
  } while ([DateTime]::UtcNow -lt $deadline)

  throw "Edge did not expose a verified loopback DevToolsActivePort within $TimeoutSeconds seconds: $fullRoot"
}

function Stop-AutomationEdge {
  param([Parameter(Mandatory = $true)][string]$Root)

  $fullRoot = Get-FullPath $Root
  $processes = @(Get-EdgeProcessesForRoot $fullRoot)
  foreach ($process in $processes) {
    Stop-Process -Id $process.ProcessId -Force -ErrorAction SilentlyContinue
  }

  $deadline = [DateTime]::UtcNow.AddSeconds(10)
  while ([DateTime]::UtcNow -lt $deadline) {
    $remaining = @(Get-EdgeProcessesForRoot $fullRoot)
    if ($remaining.Count -eq 0) { break }
    Start-Sleep -Milliseconds 200
  }

  $activePortFile = Join-Path $fullRoot 'DevToolsActivePort'
  if (Test-Path -LiteralPath $activePortFile) {
    Remove-Item -LiteralPath $activePortFile -Force -ErrorAction SilentlyContinue
  }
  return [pscustomobject]@{
    action = 'Stop'
    running = $false
    loopback = $false
    port = $null
    processId = $null
    profileRoot = $fullRoot
    profileName = $ProfileName
    targetUrl = $null
  }
}

$AutomationRoot = Get-FullPath $AutomationRoot

switch ($Action) {
  'CloneLaunch' {
    Copy-ProfileToEmptyDestination -SourceRoot $SourceUserData -SourceProfileName $ProfileName -DestinationRoot $AutomationRoot
    $result = Start-AutomationEdge -Root $AutomationRoot -SelectedProfile $ProfileName -Url $TargetUrl -RequestedEdge $EdgeExecutable -TimeoutSeconds $StartupTimeoutSeconds -UseHeadless:$Headless
  }
  'LaunchExisting' {
    $result = Start-AutomationEdge -Root $AutomationRoot -SelectedProfile $ProfileName -Url $TargetUrl -RequestedEdge $EdgeExecutable -TimeoutSeconds $StartupTimeoutSeconds -UseHeadless:$Headless
  }
  'Status' {
    $status = Get-ProfileStatus $AutomationRoot
    $result = [pscustomobject]@{
      action = 'Status'
      running = $status.running
      loopback = $status.loopback
      port = $status.port
      processId = $status.processId
      profileRoot = $status.profileRoot
      profileName = $ProfileName
      targetUrl = $null
    }
  }
  'Stop' {
    $result = Stop-AutomationEdge $AutomationRoot
  }
}

$result | ConvertTo-Json -Depth 5 -Compress
