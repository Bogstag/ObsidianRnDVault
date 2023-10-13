---
alias:
- Windows PowerShell
- PowerShell Core
- PS
- Power Shell
- Monad Shell
- Microsoft Shell
- MSH
date_created: 2023-10-02 19:27:26
date_modified: 2023-10-13 04:32:42
wikidata entity id: Q840410
---
# Powershell

![PowerShell|50](https://upload.wikimedia.org/wikipedia/commons/a/af/PowerShell_Core_6.0_icon.png)
cross-platform command-line interface and scripting language for system and network administration

## Enviroment Variables

```powershell
$Env:UserDomain
$Env:ComputerName

Get-ChildItem -Path Env:
```

## List User Groups for Domain

```powershell
(whoami /groups /fo csv | convertfrom-csv)."group name" | findstr /c:"$Env:UserDomain" | Sort-Object

net user /domain $Env:UserName
```
