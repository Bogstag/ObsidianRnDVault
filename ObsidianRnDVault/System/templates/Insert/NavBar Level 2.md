---
dependsOnDvView: "[[System/Scripts/Classes/Navbar.js|Navbar.js]]"
fileclass: template
---
<%* tR = "" -%>

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv,'"Planning"', true, 1, 4); 
```
