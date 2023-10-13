---
date_created: 2023-09-14 01:12:57
date_modified: 2023-10-01 14:55:35
include_in_navbar: true
tags: 
  - dashboard/planning
---
# Task / todo dashboard

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

```dataviewjs
function callout(text, type, title = '', folded = '+') {
    const allText = `> [!${type}]${folded} ${title}\n` + text;
    const lines = allText.split('\n');
    return lines.join('\n> ') + '\n'
}

const currentFileName = dv.current().file.name;

const late = `
not done
due before today
sort by due
`;
dv.paragraph(callout('```tasks\n' + late + '\n```', 'missing', 'Försenat'));

const todoThisWeek = `
not done
happens this week
sort by happens
`;
dv.paragraph(callout('```tasks\n' + todoThisWeek + '\n```', 'todo', 'Glöm inte bort att göra'));

const todo = `
not done
no happens date
group by folder
`;
dv.paragraph(callout('```tasks\n' + todo + '\n```', 'todo', 'Att göra'));

const done = `
done this month
sort by done
group by folder
`;

dv.paragraph(callout('```tasks\n' + done + '\n```', 'done', 'Slutförda denna månaden', '-'));
```