---
cssclass: maxWidth, dashboard
date_created: 2023-10-07 01:08:52
date_modified: 2023-10-15 08:14:00
document_type: dashboard
include_in_navbar: true
tags:
  - dashboard/planning
---
# Planning

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
