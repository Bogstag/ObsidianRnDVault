---
created: 2023-10-08T03:58:57+02:00
template_title: "MOMENT(YYYY-MM-DD)꞉ Meeting with "
template_destination_folder: Work/Meetings
---
<%* tR = "" _%>
<% "---" %>
created: <% moment().format() %>
meeting_date: <% moment().format('YYYY-MM-DD') %>
tags: Work/Meeting
meeting_with: <% tp.file.title.slice(25) %>
obsidianUIMode: source
obsidianEditingMode: live
<% "---" %>
# <% tp.file.title.slice(12) %>

## Points to cover

- 