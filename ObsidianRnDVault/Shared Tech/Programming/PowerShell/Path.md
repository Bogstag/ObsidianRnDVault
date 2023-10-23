---
date_created: 2023-10-13 02:09:36
date_modified: 2023-10-13 02:10:01
---
# Path

> [!important]- Note
> PowerShell uses aliases to allow you a familiar way to work with provider paths. Commands such as `dir` and `ls` are now aliases for [Get-ChildItem](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem?view=powershell-7.3), `cd` is an alias for [Set-Location](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-location?view=powershell-7.3). and `pwd` is an alias for [Get-Location](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-location?view=powershell-7.3).


```PowerShell
$CurrentDir = Get-Location
Set-Location $dest
Get-ChildItems C:\
Test-Path -Path $dest
```