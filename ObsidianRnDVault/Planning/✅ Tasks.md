---
date_created: 2023-10-08 03:59:52
date_modified: 2023-10-14 21:37:28
include_in_navbar: true
obsidianUIMode: preview
# obsidianEditingMode: live
# obsidianUIMode: source
numberOfTasks: 0
numberOfCompletedTasks: 0
numberOfNotCompletedTasks: 0
tags:
  - dashboard/planning
---
# Master Task List
```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
const Navbar = new tp.user.Navbar
await Navbar.getDashboard(dv, '"Planning"', true, 1, 2); 
```

```dataviewjs
// TODO:: Do a view of this
let tasks = dv.pages('-"System"').file.tasks
let completedTasks = dv.pages('-"System"').file.tasks.where(t => t.completed)
let incompletedTasks = dv.pages('-"System"').file.tasks.where(t => !t.completed)

let percentCompleted = (completedTasks.length/tasks.length)*100

dv.el("div", `
<progress value="${(completedTasks.length/tasks.length)*100}" max="100"></progress>
<small>${Math.round((completedTasks.length/tasks.length)*100, 0)}% completed (${incompletedTasks.length} tasks remaining)</small>
`)
```

```dataviewjs
dv.view('tasks')
```
