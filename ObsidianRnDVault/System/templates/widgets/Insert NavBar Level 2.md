---
dependsOnDvView: "[[System/scripts/CustomJS/Navbar.js|Navbar.js]]"
dependsOnPlugin: "[[Tech/Software/Client/Obsidian/plugins/CustomJS|CustomJS]]"
fileclass: template
---
<%* tR = "" -%>

```dataviewjs
const {Navbar} = customJS;
await Navbar.getDashboard(dv,'"Planning"', true, 1, 4); 
```