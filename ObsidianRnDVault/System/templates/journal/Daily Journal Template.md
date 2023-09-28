<%*
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
_%>
<% "---" %>
After: [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]
Before: [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]]
date_created: <% tp.file.creation_date() %>
date_modified: <% tp.file.creation_date() %>
<% tp.file.include("[[DateDimension]]") %>
fileclass: daily
Parent: 
- [[<% "Journal/Daily" %>]]
- [[<% `Journal/Yearly/${tp.date.now("YYYY")}` %>]]
- [[<% `Journal/Weekly/${tp.date.now("GGGG")}/${tp.date.now("GGGG-[v]WW")}` %>]]
tags:
- journal/daily/<% tp.date.now("YYYY") %>/<% tp.date.now("MM") %>/<% tp.date.now("DD") %>
- calendar/<% tp.date.now("YYYY") %>/<% tp.date.now("MM") %>/<% tp.date.now("DD") %>
template: [[<% "System/templates/journal/Daily Journal Template" %>|<% "Daily Journal Template" %>]]
<% "---" %>

# <% tp.date.now("dddd, DD MMMM, YYYY") %>

<i data-timeline="<% tp.date.now("DDD", 0, tp.file.title) %>"></i>
[[<% `Journal/Yearly/${tp.date.now("YYYY")}` %>|<% tp.date.now("YYYY") %>]] - [[<% `Journal/Weekly/${tp.date.now("GGGG")}/${tp.date.now("GGGG-[v]WW")}` %>|<% tp.date.now("[v]WW") %>]]
[[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>| << ]] | [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>| >> ]] 

## 📝Notes
- <% tp.file.cursor(1) %>

## ✅ Tasks