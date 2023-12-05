---
date_created: 2023-10-14 15:23:36
date_modified: 2023-10-14 15:52:03
tags:
  - programming/PowerShell
  - fileSystem/linkType/softLinks
  - fileSystem/linkType/hardLinks
  - fileSystem/linkType/symbolicLinks
  - fileSystem/linkType/junctions
  - os/Windows
---
# Soft and Hard Links in PowerShell

Check existing LinkType

>[!attention]+ Recurse
>-recurse checks everything in the path, incuding subfolders and files. Remove it to check in current folder.
>
>```PowerShell
>Get-ChildItem .\ -recurse | ?{$_.LinkType} | select FullName,LinkType,Target | Format-List
>```
