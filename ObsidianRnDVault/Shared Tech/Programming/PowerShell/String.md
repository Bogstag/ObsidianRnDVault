---
date_created: 2023-10-13 01:57:24
date_modified: 2023-10-13 02:08:53
---
# String

```PowerShell
"Hello world" | Get-Member
```

```PowerShell
$dest = Join-Path -Path $ENV:REPOS -ChildPath '/scoop'
=> D:\repos\scoop
$dest.substring(2).replace('\', '/')
=> /repos/scoop
```

## Join

[Join-String (Microsoft.PowerShell.Utility)](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/join-string?view=powershell-7.4)

```PowerShell
Join-String -Property Name -DoubleQuote -Separator ", "
```

If you are joining path, then use:

```PowerShell
Join-Path -Path "path/" -ChildPath "/childpath"
```
