---
include_in_navbar: true
navbar_name: Habits
tags:
  - dashboard/personal/habits
---

# Habits

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.createNavbar(app, dv, "#dashboard")
```
