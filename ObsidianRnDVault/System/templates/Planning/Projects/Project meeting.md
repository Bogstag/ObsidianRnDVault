---
fileclass: template
---
<%* tR = "" -%><%*
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
	let meetingFileNamePrefix = `${tp.file.creation_date("YYYY-MM-DD")}`;
	let title = await tp.system.prompt("Meeting title");
	if(title.length == 0){
		title = `untitled meeting (${tp.date.now("YYYY-MM-DD")})`;
	}
	await tp.file.rename(`${meetingFileNamePrefix} - ${title}`);
	let fileProjectRoot = fileObject.path.split("/")[0] + "/" + fileObject.path.split("/")[1] + "/" + fileObject.path.split("/")[2];
_%>
<% "---" %>
date_created: <% `${tp.date.now("YYYY-MM-DD")}` %>
date_modified: <% `${tp.date.now("YYYY-MM-DD")}` %>
document_type: meeting
project: <% `${fileObject.path.split("/")[2]}` %>
tags: <% `${fileObject.path.split("/")[2].toLowerCase().replaceAll(" ", "-").trim()}` %> meeting
obsidianUIMode: source
obsidianEditingMode: live
<% "---" %>
<% `[[${fileProjectRoot}/Home|Home]]` %> | <% `[[${fileProjectRoot}/Meetings/All Meetings|Meetings]]` %> | <% `[[${fileProjectRoot}/Notes/All Notes|Notes]]` %> | <% `[[${fileProjectRoot}/References|References]]` %>
# <% `${fileObject.basename}` %>
**Date and Time**
Date: <% tp.file.creation_date("YYYY-MM-DD") %>
Time: <% tp.file.creation_date("HH:mm") %>

**Overview**
Description:: <% `${title}` %> <% tp.file.cursor(1) %>

**Attendees**
- Robert Miller

## Notes


## Actions Items
*Add follow up actions / tasks*


---
<% `[[${fileProjectRoot}/Home|Home]]` %> | <% `[[${fileProjectRoot}/Meetings/All Meetings|Meetings]]` %> | <% `[[${fileProjectRoot}/Notes/All Notes|Notes]]` %> | <% `[[${fileProjectRoot}/References|References]]` %>
