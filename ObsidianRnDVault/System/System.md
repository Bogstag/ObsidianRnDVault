---
date_created: 2023-10-07 06:08:28
date_modified: 2023-10-07 06:10:52
include_in_navbar: true
tags: 
  - dashboard/system
  - system/dashboard
---
# System

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv, "#dashboard", 2); 
```

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv, "#system/dashboard", 2); 
```