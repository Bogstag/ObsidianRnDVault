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
date_modified: 2023-10-14 16:25:11
wikidata entity id: Q840410
---
# PowerShell

![PowerShell|50](https://upload.wikimedia.org/wikipedia/commons/a/af/PowerShell_Core_6.0_icon.png)
cross-platform command-line interface and scripting language for system and network administration

[PowerShell Documentation - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/)
```dataviewjs
dv.view("toc", {"level": 2, "heading": true, "dv": dv})
```

## Examples

### List User Groups for Domain

```powershell
(whoami /groups /fo csv | convertfrom-csv)."group name" | findstr /c:"$Env:UserDomain" | Sort-Object

net user /domain $Env:UserName
```

### List All Installed Fonts

```powershell
(New-Object System.Drawing.Text.InstalledFontCollection).Families
```
