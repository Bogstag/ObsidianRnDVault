---
title: Templates
alias: templates
cssclasses:
  - row-alt
date_created: 2023-10-08 00:34:11
date_modified: 2023-10-08 00:34:20
include_in_navbar: true
tags:
  - system/dashboard/templates
---
# Templates

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv, "#system/dashboard", 2); 
```

List dependencys with exeptions of the most obvious like Templater, Dataview and Obsidian.

```dataviewjs
dv.view("System/scripts/dvViews/tableAllFilesInCurrentPath", { File: "file.link",	Templates: "dependsOnTemplate", Scripts: "dependsOnScript", dvViews: "dependsOnDvView", Plugin: "dependsOnPlugin" });
```



