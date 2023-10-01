<%*
	date = tp.file.title // Starting date
	format = "YYYY-MM-DD" // Format of starting date
	locale = "sv"
	moment.locale(locale)
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
_%>
<% "---" %>
After: [[<% tp.date.now(format, 1, date, format) %>]]
Before: [[<% tp.date.now(format, -1, date, format) %>]]
date: <% tp.date.now(format, 0, date, format) %>
date_created: <% tp.file.creation_date() %>
date_modified: <% tp.file.creation_date() %>
dateformat: <% format %>
dayName: <% tp.date.now("dddd", 0, date, format) %>
fileclass: daily
locale: <% locale %>
Parent: 
- [[<% "Journal/Daily" %>]]
- [[<% `Journal/Yearly/${tp.date.now("YYYY", 0, date, format)}` %>]]
- [[<% `Journal/Weekly/${tp.date.now("gggg/gggg-[v]ww", 0, date, format)}` %>]]
tags:
- Journal/Daily/<% tp.date.now("YYYY/MM/YYYY-MM-DD", 0, date, format) %>
- calendar/<% tp.date.now("YYYY/MM-MMMM/DD-dddd", 0, date, format) %>
template: [[<% "System/templates/journal/Daily Work Journal Template" %>|<% "Daily Work Journal Template" %>]]
<% "---" %>
# <% tp.date.now("dddd, DD MMMM, YYYY", 0, date, format) %>

<i data-timeline="<% tp.date.now("DDD", 0, date, format) %>"></i>
[[<% `Journal/Yearly/${tp.date.now("YYYY", 0, date, format)}` %>|<% tp.date.now("YYYY", 0, date, format) %>]] - [[<% `Journal/Weekly/${tp.date.now("gggg/gggg-[v]ww", 0, date, format)}` %>|<% tp.date.now("[v]ww", 0, date, format) %>]]
[[<% tp.date.now(format, -1, date, format) %>| ↶ Igår ]] | [[<% tp.date.now(format, 1, date, format) %>| Imorgon ↷ ]] 

## 🎯

```jira-search
type: TABLE
query: assignee in (currentUser()) AND sprint in openSprints() ORDER BY priority DESC
columns: -TYPE, KEY, PRIORITY, SUMMARY, -STATUS, LABELS, -REPORTER, UPDATED, NOTES, -DEV_STATUS
account: Default
```

## ✍️

- <% tp.file.cursor(1) %>

## ✅

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
<%* if (tp.date.now("d", 0, date, format) == 5) { %>
- [ ] Tidsregistrera i slutet av veckan #tidsregistrera/vecka 📅 <% tp.date.weekday(format, 5, date, format) %>
<%* } -%> 
- [ ] Stämpla in
- [ ] Stämpla ut
- [ ] 

```dataviewjs
let pages = dv.pages('"Journal"');

dv.taskList(
	pages
	.where(p => (dv.date(p.file.name) <= dv.date(dv.current().file.name) + dv.duration('3 days')) && !dv.equal(dv.date(p.file.name),dv.date(dv.current().file.name)))
	.sort(p => p.file.name, 'asc')
	.file
	.tasks
	.where(t => !t.completed))
```

>[!Info]- TidReg
>```gate  
>https://###TidReg###/
>height:800
>profile:work
>```

<%* if (tp.date.now("d") == 5) { %>
>[!Info]- TimeReporting
>```gate  
>https://###TimeReporting###/
>height:800
>profile:work
>```
<%* } -%> 
