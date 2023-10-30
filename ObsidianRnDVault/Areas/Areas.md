---
date_created: 2023-10-07 00:34:07
date_modified: 2023-10-07 05:42:12
document_type: dashboard
include_in_navbar: true
tags:
- dashboard/Areas
---
# Areas

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, "#dashboard", false, 0, 1);
```


