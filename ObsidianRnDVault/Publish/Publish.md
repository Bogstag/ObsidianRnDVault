---
include_in_navbar: true
tags:
  - dashboard/publish
---

# Publish

```dataviewjs
const {Navbar} = customJS;
//await Navbar.createNavbar(app, dv, "#dashboard", 0, 1);
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
