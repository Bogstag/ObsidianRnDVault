---
date_created: 2023-10-01 21:20:49
date_modified: 2023-10-01 21:35:39
description: Repository of projects.
document_type: dashboard
include_in_navbar: true
navbar_name: Projects
tags:
  - dashboard/planning/projects
---
# Projects

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv); 
```

List of all current and past projects

```button
name + Add project
type note(Planning/Projects/untitled project) template
action project/Project setup
templater true
class tailwind-button-white
```

## Current projects

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

## Past projects

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

---

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv); 
```
