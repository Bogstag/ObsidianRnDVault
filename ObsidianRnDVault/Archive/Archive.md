---
date_created: 2023-10-07 06:08:28
date_modified: 2023-10-07 06:09:39
include_in_navbar: true
tags:
  - dashboard/archive
---
# Archive

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
