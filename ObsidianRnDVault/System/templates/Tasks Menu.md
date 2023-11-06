---
dependsOnScript: "[[System/Scripts/Functions/templater_tasks.js|templater_tasks.js]]"
fileclass: template
--- 
<%*
// Opens a menu to handle tasks.
const tasks = new tp.user.templater_tasks()
return await tasks.openMenu()
%>
