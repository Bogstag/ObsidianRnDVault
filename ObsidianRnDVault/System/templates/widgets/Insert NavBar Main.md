---
dependsOnDvView: "[[System/scripts/CustomJS/Navbar.js|Navbar.js]]"
dependsOnPlugin: "[[Tech/Software/Client/Obsidian/plugins/CustomJS|CustomJS]]"
fileclass: template
--- 
TODO:: Fix ordering, sorting.
<%* tR = "" -%>
```dataviewjs
const {Navbar} = customJS;
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
