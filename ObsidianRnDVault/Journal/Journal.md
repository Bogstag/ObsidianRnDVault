---
date_created: 2023-10-07 06:04:48
date_modified: 2023-10-11 11:43:36
include_in_navbar: true
tags:
  - dashboard/journal
---
# Journal

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv,'"Journal"', true, 1, 4); 
```
