```dataviewjs
let tasks = dv.pages('-"System"').file.tasks
let completedTasks = dv.pages('-"System"').file.tasks.where(t => t.completed)
let incompletedTasks = dv.pages('-"System"').file.tasks.where(t => !t.completed)

let percentCompleted = (completedTasks.length/tasks.length)*100

dv.el("div", `
<progress value="${(completedTasks.length/tasks.length)*100}" max="100"></progress>
<small>${Math.round((completedTasks.length/tasks.length)*100, 0)}% completed (${incompletedTasks.length} tasks remaining)</small>
`)
```
