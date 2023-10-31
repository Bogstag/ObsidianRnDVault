---
fileclass: template
template_destination_folder: Planning/Projects
template_title: ProjectX
---
<%* tR = "" _%>
<% "---" %>
created: <% moment().format() %>
is_active: true
obsidianUIMode: source
obsidianEditingMode: live
<% "---" %>
# <% tp.file.title %>

#<%''%>project

> [!info]- Reminder, remove if not needed.
> The template structure is a suggestion. You only need a # project (no space between) and its a project.
> 
> ### Tags
> - Add the tag #waiting-on to the task if you are waiting on something.
> - Add the tag #someday to indicate it´s a low prio.
> 
> ### Prio
> - To mark any task as priority, add a 🔺 or ⏫ anywhere in the task text.
> - To mark a project as priority, add a #🔺 or #⏫ tag. All of the tasks in this project will be marked as priority automatically.
> 
> ### Exclude
> - You can exclude tasks under a heading by adding #exclude to that heading.
> 
> ### Sequence
> As default all task under a header is done in sequence. If you don't want that, you can include the 🟰 in the heading for that section.

```<%"dataviewjs"%>
await dv.view('projectProgress', { width:400, height:20, dv:dv })
```

## 🎯 Goals / Problem
What is your goal with this project?

## ✅ Succes criteria
When is the project done?

## 👷 Next step
What is the next step to start the journey towards the Goal. Layout a plan whit tasks.

### 📋 Tasks
You can use ALT + T to add or edit tasks, or you can use Shift + Alt + T, for a custom menu.

## 📈 Results
What was the result?

## 📓 Log