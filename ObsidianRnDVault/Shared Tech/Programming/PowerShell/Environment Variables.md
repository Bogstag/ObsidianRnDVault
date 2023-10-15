---
date_created: 2023-10-14 16:21:29
date_modified: 2023-10-14 16:21:48
---
# Environment Variables in PowerShell

Environment Variables can be used in PowerShell with the prefix `$env:`.

More on [[Shared Tech/OS/Windows/environment-variables|Environment Variables in Windows]]

```powershell
# Get
$Env:UserDomain
$Env:ComputerName
$Env:$PROFILE
Get-ChildItem -Path Env:

# Set
$Env:<variable-name> = "<new-value>"

# Add path
$Env:Path += ';C:\Tools'

# Use in terminal
Set-Location $env:repos
Write-Output $PROFILE # PowerShell profile

# Using the System.Environment methods
[Environment]::GetEnvironmentVariable('Foo')
[Environment]::SetEnvironmentVariable('Foo','Bar')
[Environment]::SetEnvironmentVariable('Foo','') # Removes

```
