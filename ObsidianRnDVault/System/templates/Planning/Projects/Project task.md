---
fileclass: template
---
<%* tR = "" -%>
<%*
	let title = tp.file.title;
	if(title.toLowerCase().includes("untitled")){
		title = await tp.system.prompt("Task title");
		if(title.length == 0){
			title = `untitled task (${tp.date.now("YYYY-MM-DD")})`;
		}
	} else {
		title = await tp.system.prompt("Task title", title);
	}
	await tp.file.rename(title);
	
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
	let fileProjectRoot = fileObject.path.split("/")[0] + "/" + fileObject.path.split("/")[1] + "/" + fileObject.path.split("/")[2];
	let description = await tp.system.prompt("Description");
	
_%>
<% "---" %>
date_created: <% `${tp.date.now("YYYY-MM-DD")}` %>
date_modified: <% `${tp.date.now("YYYY-MM-DD")}` %>
fileclass: project/task
project: <% `${fileObject.path.split("/")[2]}` %>
tags: <% `${fileObject.path.split("/")[2].toLowerCase().replaceAll(" ", "-").trim()}` %>
obsidianUIMode: source
obsidianEditingMode: live
<% "---" %>
<% `[[${fileProjectRoot}/Home|Home]]` %> | <% `[[${fileProjectRoot}/Meetings/All Meetings|Meetings]]` %> | <% `[[${fileProjectRoot}/Notes/All Notes|Notes]]` %> | <% `[[${fileProjectRoot}/References|References]]` %>
# <% `${fileObject.basename}` %>
**Overview**
Description:: <% `${description}` %>

## Content
<% tp.file.cursor(1) %>




---
<% `[[${fileProjectRoot}/Home|Home]]` %> | <% `[[${fileProjectRoot}/Meetings/All Meetings|Meetings]]` %> | <% `[[${fileProjectRoot}/Notes/All Notes|Notes]]` %> | <% `[[${fileProjectRoot}/References|References]]` %>