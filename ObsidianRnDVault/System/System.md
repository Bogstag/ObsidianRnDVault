---
date_created: 2023-10-07 06:08:28
date_modified: 2023-10-28 19:55:33
include_in_navbar: true
obsidianUIMode: preview
tags:
  - dashboard/system
  - system/dashboard
---
# System

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#system/dashboard", 	false, 1, 2);
```
