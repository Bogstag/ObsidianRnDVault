---
fileclass: template
template_destination_folder: Planning/Projects
---
<%* tR = "" _%>
<% "---" %>
created: <% moment().format() %>
is_active: true
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

```dataviewjs
await dv.view('project-progress', {width:400, height:20})
```
## 🎯 Goals / Problem

## 👷 Next step
What is the next step to start the journey towards the Goal. You can use ALT + T to add or edit tasks, or you can use Shift + Alt + T, for a custom menu.

### 📋 Tasks

## ✅ Succes criteria
When have is the project done?

## 📈 Results
What was the result?

## 📓 Log