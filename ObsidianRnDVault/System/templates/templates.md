# Templates
List dependencys with exeptions of the most obvious like Templater, Dataview and Obsidian.


```dataviewjs
dv.view("System/scripts/dvViews/tableAllFilesInCurrentPath", { File: "file.link",	Templates: "dependsOnTemplate", Scripts: "dependsOnScript", dvViews: "dependsOnDvView", Plugin: "dependsOnPlugin" });
```