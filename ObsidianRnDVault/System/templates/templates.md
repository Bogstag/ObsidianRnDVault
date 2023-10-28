---
title: Templates
alias: templates
cssclasses:
  - row-alt
date_created: 2023-10-08 00:34:11
date_modified: 2023-10-08 00:34:20
include_in_navbar: true
obsidianUIMode: preview
tags:
  - system/dashboard/templates
---
# Templates

```dataviewjs
const { Navbar } = customJS;
console.log(Navbar)
await Navbar.getDashboard(dv, "#system/dashboard", 	false, 0, 1);
```

List dependencys with exeptions of the most obvious like Templater, Dataview and Obsidian.

```dataviewjs
dv.view("System/scripts/DataViews/tableAllFilesInCurrentPath", { File: "file.link",	Templates: "dependsOnTemplate", Scripts: "dependsOnScript", DataViews: "dependsOnDvView", Plugin: "dependsOnPlugin" });
```



