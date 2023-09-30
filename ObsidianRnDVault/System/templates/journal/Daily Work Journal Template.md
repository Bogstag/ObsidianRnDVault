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
template: [[<% "System/templates/journal/Daily Work Journal Template" %>|<% "Daily Work Journal Template" %>]]
<% "---" %>

# <% tp.date.now("dddd, DD MMMM, YYYY") %>

<i data-timeline="<% tp.date.now("DDD", 0, tp.file.title) %>"></i>
[[<% `Journal/Yearly/${tp.date.now("YYYY")}` %>|<% tp.date.now("YYYY") %>]] - [[<% `Journal/Weekly/${tp.date.now("GGGG")}/${tp.date.now("GGGG-[v]WW")}` %>|<% tp.date.now("[v]WW") %>]]
[[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>| ↶ Igår ]] | [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>| Imorgon ↷ ]] 

## 🎯
```jira-search
type: TABLE
query: assignee in (currentUser()) AND sprint in openSprints() ORDER BY priority DESC
columns: -TYPE, KEY, PRIORITY, SUMMARY, -STATUS, LABELS, -REPORTER, UPDATED, NOTES, -DEV_STATUS
account: Default
```

## 📝Notes
- <% tp.file.cursor(1) %>

## ✅ Tasks
<%*
  const ics = await app.plugins.getPlugin('ics');
  const events = await ics.getEvents();
  var mdArray = [];
  events.forEach((e) => {
	if (e.summary == "[object Object] (recurring)") {
		return;
	} else if (e.location == "undefined") {
		mdArray.push(`- [ ] ⏰${e.time}-${e.endTime} 📓${e.summary.val} #meeting`)
	} else {
		mdArray.push(`- [ ] ⏰${e.time}-${e.endTime} 📓${e.summary.val} 🏠${e.location} #meeting`)
	}
  })
  tR += mdArray.sort().join("\n")
-%>
<%* if (tp.date.now("d") == 5) { %>
- [ ] Tidsregistrera i slutet av veckan #tidsregistrera/vecka 📅 <% tp.date.weekday("YYYY-MM-DD", 5) %>
<%* } -%> 
- [ ] Stämpla in
- [ ] Stämpla ut
- [ ] 

>[!Info]- TidReg
>```gate  
>https://###TidReg###/
>height:800
>profile:intern
>```
<%* if (tp.date.now("d") == 5) { %>
>[!Info]- TimeReporting
>```gate  
>https://###TimeReporting###/Reporting.aspx
>height:800
>profile:intern
>```
<%* } -%> 
