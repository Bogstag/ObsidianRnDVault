---
date_created: 2023-10-01 21:20:49
date_modified: 2023-10-13 17:01:53
description: Repository of projects.
document_type: dashboard
navbar_name: Projects
tags:
  - dashboard/planning
---
# Projects

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv,'"Planning"', true, 1, 4); 
```



## Big project
```button
name + Add Big project
type note(Planning/Projects/untitled project) template
action Planning/Projects/Project setup
templater true
```

## Current Projects

```dataviewjs
for (let group of dv.pages('"Planning/Projects"').groupBy(p => p.projects)) {
    let filteredRows = group.rows.filter(k => k['is_active'] === true);
    if (filteredRows.length > 0) {
        dv.table(["Project", "Description"], 
            filteredRows
                .sort(k => k.file.ctime, 'desc')
                .map(k => [
                "[[" + k.file.path + "|"+ k.file.folder.split('/')[k.file.folder.split('/').length-1] +"]]", 
                k['description']
                ]));
    } else {
        dv.paragraph("*No active projects*");
    }
}
```

## Past Projects

```dataviewjs
for (let group of dv.pages('"Planning/Projects"').groupBy(p => p.projects)) {
    let filteredRows = group.rows.filter(k => k['is_active'] === false);
    if (filteredRows.length > 0) {
        dv.table(["Project", "Description"], 
            filteredRows
                .sort(k => k.file.ctime, 'desc')
                .map(k => [
                "[[" + k.file.path + "|"+ k.file.folder.split('/')[k.file.folder.split('/').length-1] +"]]", 
                k['description']
                ]));
    } else {
        dv.paragraph("*No inactive projects*");
    }
}
```

---

```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv,'"Planning"', true, 1, 4); 
```
## Backup
```dataviewjs
for (let group of dv.pages('"Planning/Projects" and #dashboard and !#projects').groupBy(p => p.projects)) {
    let filteredRows = group.rows.filter(k => k['is_active'] === true);
    if (filteredRows.length > 0) {
        dv.table(["Project", "Description"], 
            filteredRows
                .sort(k => k.file.ctime, 'desc')
                .map(k => [
                "[[" + k.file.path + "|"+ k.file.folder.split('/')[k.file.folder.split('/').length-1] +"]]", 
                k['description']
                ]));
    } else {
        dv.paragraph("*No active projects*");
    }
}
```

## Past Projects

```dataviewjs
for (let group of dv.pages('"Planning/Projects" and #dashboard and !#projects').groupBy(p => p.projects)) {
    let filteredRows = group.rows.filter(k => k['is_active'] === false);
    if (filteredRows.length > 0) {
        dv.table(["Project", "Description"], 
            filteredRows
                .sort(k => k.file.ctime, 'desc')
                .map(k => [
                "[[" + k.file.path + "|"+ k.file.folder.split('/')[k.file.folder.split('/').length-1] +"]]", 
                k['description']
                ]));
    } else {
        dv.paragraph("*No inactive projects*");
    }
}
```
