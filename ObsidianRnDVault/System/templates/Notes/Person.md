---
created: 2023-10-08T03:58:57+02:00
template_title: 👤
template_destination_folder: People
obsidianUIMode: source
obsidianEditingMode: live
dependsOnDvView: System/DataViews/mentionsTable.js
---
<%* tR = "" _%>
<% "---" %>
name: <% tp.file.title.replace('@', '') %>
tags: person
created: <% moment().format() %>
meeting_date: <% moment().format('YYYY-MM-DD') %>
obsidianUIMode: source
obsidianEditingMode: live
<% "---" %>
# <% tp.file.title.replace('👤', '') %>
 
```dataviewjs
await dv.view("System/DataViews/mentionsTable", 3)
```
