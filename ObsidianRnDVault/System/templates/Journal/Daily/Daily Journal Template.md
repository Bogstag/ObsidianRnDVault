---
dependsOnScript: "[[System/scripts/functions/getSeasonFromDate.js|getSeasonFromDate.js]]"
dependsOnPlugin:
  - "[[Tech/Software/Obsidian/plugins/Year Timeline|Year Timeline]]"
  - "[[Tech/Software/Obsidian/plugins/Tasks|Tasks]]"
fileclass: template
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
- calendar/<% tp.date.now("YYYY/MM-MMMM/DD-dddd", 0, date, format) %>
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

## ✍️

- <% tp.file.cursor(1) %>

## ✅

````dataviewjs
function callout(text, type, title = '', folded = '+') {
    const allText = `> [!${type}]${folded} ${title}\n` + text;
    const lines = allText.split('\n');
    return lines.join('\n> ') + '\n'
}

const currentFileName = dv.current().file.name;

const late = `
not done
due before today
group by due
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + late + '\n```', 'missing', 'Försenat'));

const todoThisWeek = `
not done
happens today
group by happens
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + todoThisWeek + '\n```', 'todo', 'Att göra idag'));

const todo = `
not done
no happens date
group by folder
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + todo + '\n```', 'todo', 'Att göra', '-'));

const done = `
done today
group by done
filename does not include ${currentFileName}
`;

dv.paragraph(callout('```tasks\n' + done + '\n```', 'done', 'Slutförda idag', '-'));
````
