---
date_created: 2023-10-03 12:26:19
date_modified: 2023-10-03 20:07:31
---
# Scripts

```dataviewjs
await dv.view("System/scripts/dvViews/listAllFilesInCurrentPath")
```


```
dataviewjs
dv.list(app.vault.getFiles()
	.filter(file => file.path.includes("System/scripts"))
	.filter(file => file.path != "System/scripts/scripts.md")
	.map(file => dv.fileLink(file.path, false, file.path.replace("System/scripts/", "")))
	.sort((a, b) => a.display.toLowerCase().localeCompare(b.display.toLowerCase(), 'sv')))
```

