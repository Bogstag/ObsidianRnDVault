---
dependsOnScript: "[[System/scripts/Templater/getSeasonFromDate.js|getSeasonFromDate.js]]"
dependsOnPlugin:
  - "[[Tech/Software/Client/Obsidian/plugins/Year Timeline|Year Timeline]]"
  - "[[Tech/Software/Client/Obsidian/plugins/Tasks|Tasks]]"
  - "[[Tech/Software/Client/Obsidian/plugins/Jira Issue|Jira Issue]]"
  - "[[Tech/Software/Client/Obsidian/plugins/ICS|ICS]]"
  - "[[Tech/Software/Client/Obsidian/plugins/Open Gate|Open Gate]]"
fileclass: template
obsidianUIMode: source
obsidianEditingMode: live
---
<%* tR = "" -%>
<%*
	date = tp.file.title // Starting date
	format = "YYYY-MM-DD" // Format of starting date
	locale = "sv"
	moment.locale(locale)
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
_%>
<% "---" %>
nextDay: "<%"["%>[<% tp.date.now(format, 1, date, format) %>]]"
prevDay: "<%"["%>[<% tp.date.now(format, -1, date, format) %>]]"
date: <% tp.date.now(format, 0, date, format) %>
date_created: <% tp.file.creation_date() %>
date_modified: <% tp.file.creation_date() %>
dateformat: <% format %>
dayName: <% tp.date.now("dddd", 0, date, format) %>
fileclass: journal/daily
locale: <% locale %>
Parent:
- "<%"["%>[<% "Journal/Daily" %>]]"
- "<%"["%>[<% `Journal/Yearly/${tp.date.now("YYYY", 0, date, format)}` %>]]"
- "<%"["%>[<% `Journal/Weekly/${tp.date.now("gggg/gggg-[v]ww", 0, date, format)}` %>]]"
tags:
- Journal/Daily/<% tp.date.now("YYYY/MM/YYYY-MM-DD", 0, date, format) %>
- Calendar/<% tp.date.now("YYYY/MM-MMMM/DD-dddd", 0, date, format) %>
template: "<%"["%>[<% "System/templates/journal/Daily/Daily Journal Template" %>]]"
numberOfTasks: 0
numberOfCompletedTasks: 0
numberOfNotCompletedTasks: 0
season: <% tp.user.getSeasonFromDate(tp.date.now("YYYY-MM-DD", 1, date, format)) %>
<% "---" %>
# <% tp.date.now("dddd, DD MMMM, YYYY", 0, date, format) %>

<i data-timeline="<% tp.date.now("DDD", 0, date, format) %>"></i>
<%"["%>[<% `Journal/Yearly/${tp.date.now("YYYY", 0, date, format)}` %>|<% tp.date.now("YYYY", 0, date, format) %>]] - <%"["%>[<% `Journal/Weekly/${tp.date.now("gggg/gggg-[v]ww", 0, date, format)}` %>|<% tp.date.now("[v]ww", 0, date, format) %>]]
<%"["%>[<% tp.date.now(format, -1, date, format) %>| ↶ Igår]] | <%"["%>[<% tp.date.now(format, 1, date, format) %>| Imorgon ↷]]

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
- [ ] Stämpla in ➕<% moment().format("YYYY-MM-DD HH:mm:ss") %>
<%* if (tp.date.now("d") in [2,4]) { %>
- [ ] Prepare standup 📅<% moment().format("YYYY-MM-DD 09:30:00") %> ➕<% moment().format("YYYY-MM-DD HH:mm:ss") %>
<%* } -%>
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
- [ ] Tidsregistrera i slutet av veckan #Work/tidsregistrera/vecka 📅 <% tp.date.weekday("YYYY-MM-DD", 5) %> ➕<% moment().format("YYYY-MM-DD HH:mm:ss") %>
<%* } -%> 

- [ ] Stämpla ut ➕<% moment().format("YYYY-MM-DD HH:mm:ss") %>

>[!Info]- TidReg
>```gate  
>URL
>height:800
>profile:intern
>```
<%* if (tp.date.now("d") == 5) { %>
>[!Info]- TimeReporting
>```gate  
>URL
>height:800
>profile:intern
>```
<%* } -%> 
```dataviewjs
function callout(text, type, title = '', folded = '+') {
    const allText = `> [!${type}]${folded} ${title}\n` + text;
    const lines = allText.split('\n');
    return lines.join('\n> ') + '\n'
}

const currentFileName = dv.current().file.name;

const todo = `
not done
no happens date
group by function task.due.category.groupText
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + todo + '\n```', 'todo', 'Annat att göra', '-'));
```
