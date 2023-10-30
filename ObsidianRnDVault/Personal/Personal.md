---
date_created: 2023-10-07 02:31:12
date_modified: 2023-10-13 17:22:53
include_in_navbar: false
tags:
  - dashboard/personal
---
# Personal

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
