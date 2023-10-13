---
date_created: 2023-10-07 06:04:48
date_modified: 2023-10-11 11:43:36
include_in_navbar: true
tags:
  - dashboard/journal
---
# Journal

```dataviewjs
const {Navbar} = customJS;
//await Navbar.createNavbar(app, dv, "#dashboard", 0, 1);
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
