---
dependsOnDvView: "[[System/DataViews/projectProgress.js|projectProgress.js]]"
fileclass: template
---
<%* tR = "" -%>
```dataviewjs
await dv.view('projectProgress', {progress:100, suffix: "%", width:200, height:23, title:"Progress", title_color:"9D67C1", scale:200})
```
