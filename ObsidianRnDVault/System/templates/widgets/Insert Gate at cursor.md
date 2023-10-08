---
dependsOnScript: "[[System/scripts/classes/Gate.js|Gate.js]]"
dependsOnPlugin: "[[Tech/Software/Obsidian/plugins/CustomJS|CustomJS]]"
fileclass: template
---
<%* tR = "" -%>
<%* 
 const { Gate } = customJS
 tR += await Gate.userGenerate(tp);
%>