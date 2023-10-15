---
aliases: 
date_created: 2023-10-08 00:37:04
date_modified: 2023-10-08 00:38:10
dependsOnSoftware:
  - "[[Shared Tech/RnD Vault/Obsidian/Obsidian]]"
description: Create/manage your daily, weekly, and monthly notes
fileclass: plugin
id: periodic-notes
isDesktopOnly: false
name: Periodic Notes
template: "[[System/templates/fileclass/Add Obsidian plugin page|Add Obsidian plugin page]]"
version: 0.0.17
---
# Periodic Notes

Create/manage your daily, weekly, and monthly notes

>[!bug]- Repo
>
>```gate  
>https://github.com/liamcain/obsidian-periodic-notes
>height:700
>profile:obsidian
>```

## Settings

```json
	{
  "daily": {
    "format": "YYYY/MM/YYYY-MM-DD",
    "template": "System/templates/Journal/Daily/Daily Journal Template.md",
    "folder": "Journal/Daily",
    "enabled": true
  },
  "hasMigratedDailyNoteSettings": false,
  "hasMigratedWeeklyNoteSettings": false,
  "monthly": {
    "format": "",
    "template": "",
    "folder": "Journal/",
    "enabled": false
  },
  "quarterly": {
    "format": "",
    "template": "",
    "folder": ""
  },
  "showGettingStartedBanner": false,
  "weekly": {
    "format": "gggg/gggg-[v]ww",
    "template": "System/templates/Journal/Weekly/Weekly Journal Template.md",
    "folder": "Journal/Weekly",
    "enabled": true
  },
  "yearly": {
    "format": "YYYY",
    "template": "System/templates/Journal/Yearly/Yearly Journal Template.md",
    "folder": "Journal/Yearly",
    "enabled": true
  }
}
```
