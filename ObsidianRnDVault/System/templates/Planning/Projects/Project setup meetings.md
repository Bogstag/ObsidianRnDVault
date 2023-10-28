---
fileclass: template
---
<%* tR = "" -%><%*
	await tp.file.rename("All Meetings");
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
	let fileProjectRoot = fileObject.path.split("/")[0] + "/" + fileObject.path.split("/")[1] + "/" + fileObject.path.split("/")[2];
_%>
<% "---" %>
date_created: <% `${tp.date.now("YYYY-MM-DD")}` %>
date_modified: <% `${tp.date.now("YYYY-MM-DD")}` %>
document_type: meetings
project: <% `${fileObject.path.split("/")[2]}` %>
description: List of project meetings.
tags: <% `${fileObject.path.split("/")[2].toLowerCase().replaceAll(" ", "-").trim()}` %> meetings
obsidianUIMode: preview
<% "---" %>
<% `[[${fileProjectRoot}/Home|Home]]` %> | <% `**[[${fileProjectRoot}/Meetings/All Meetings|Meetings]]**` %> | <% `[[${fileProjectRoot}/Notes/All Notes|Notes]]` %> | <% `[[${fileProjectRoot}/References|References]]` %>
# Meetings
**Create meeting**
```button
name + Add meeting
type note(<% `${fileProjectRoot}` %>/Meetings/untitled meeting) template
action <% `${fileProjectRoot}` %>/Project meeting
templater true
```
```dataviewjs
for (let group of dv.pages('"<% `${fileProjectRoot}` %>/Meetings" and !#meetings').groupBy(p => p.meeting)) {
	dv.table(["Name", "Description", "Date created"], 
		group.rows 
			.sort(k => k.file.ctime, 'desc')
			.map(k => [
			k.file.link, 
			k['description'],
			k.file.ctime.year+"-"+k.file.ctime.month+"-"+k.file.ctime.day
			]))}
```

---
<% `[[${fileProjectRoot}/Home|Home]]` %> | <% `**[[${fileProjectRoot}/Meetings/All Meetings|Meetings]]**` %> | <% `[[${fileProjectRoot}/Notes/All Notes|Notes]]` %> | <% `[[${fileProjectRoot}/References|References]]` %>