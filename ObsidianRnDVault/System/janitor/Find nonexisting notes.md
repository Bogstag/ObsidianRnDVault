---
date_created: 2023-10-03 22:02:58
date_modified: 2023-10-04 08:59:19
---
# Find nonexisting notes

```dataviewjs
let r = Object.entries(dv.app.metadataCache.unresolvedLinks)
		.filter(([k,v])=>Object.keys(v).length)
		.flatMap(([k,v]) => Object.keys(v).map(x=>dv.fileLink(x)))
dv.list([...new Set(r)])
```

## By Tags

```dataviewjs
//how many links a non existing file should have at minimum
const count = 1;

console.log("#Journal/Daily", dv.pagePaths("#Journal/Daily"));
//specify the full path here.
const filesPath = [];
filesPath.push(
	...dv.pagePaths("#Journal"),
  ...dv.pagePaths("#dashboard")
);
console.log("filesPath", filesPath);
let ignoredExisting = []
for (let i = 0; i < filesPath.length; i++) {
    ignoredExisting+= '"' + filesPath[i] + '"' + ','
}
//keep these in lower case.
const ignoredNonExisiting = ["your non exisiting notes", "here is note that does not exist"];

let d = {};
function process(k, v) {
  Object.keys(v).forEach(function (x) {
    if(!ignoredNonExisiting.includes(x.toLowerCase())) {
        x = dv.fileLink(x);
        if (d[x]==undefined) { d[x] = []; }
        if(!ignoredExisting.includes(k)) {
            d[x].push(dv.fileLink(k));
        }
    }
  });
}

Object.entries(dv.app.metadataCache.unresolvedLinks)
    .filter(([k,v]) => Object.keys(v).length)
    .forEach(([k,v]) => process(k, v));
    
dv.table(["Non existing notes", "Linked from"],
         Object.entries(d)
         .filter(([k, v]) => v.length >= count)
	     .sort((a, b) => b[1].length - a[1].length)
         .map(([k,v]) => [k, v.join(" • ")]));
```
