---
dependsOnPlugin: "[[Tech/Resources/Software/Obsidian/plugins/Tasks|Tasks]]"
fileclass: template
---
<%* tR = "" -%>
<%*
	date = tp.file.title
	format = "gggg-[v]ww"
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
_%>
<% "---" %>
nextWeek: "<%"["%>[<% tp.date.now(format, 7, date, format) %>]]"
prevWeek: "<%"["%>[<% tp.date.now(format, -7, tp.file.title, format) %>]]"
date_created: <% tp.file.creation_date() %>
date_modified: <% tp.file.creation_date() %>
dateformat: <% format %>
fileclass: journal/weekly
locale: <% locale %>
<% tp.date.weekday("dddd", 0, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 0, date, format) %>
<% tp.date.weekday("dddd", 1, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 1, date, format) %>
<% tp.date.weekday("dddd", 2, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 2, date, format) %>
<% tp.date.weekday("dddd", 3, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 3, date, format) %>
<% tp.date.weekday("dddd", 4, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 4, date, format) %>
<% tp.date.weekday("dddd", 5, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 5, date, format) %>
<% tp.date.weekday("dddd", 6, date, format) %>: <% tp.date.weekday("YYYY-MM-DD", 6, date, format) %>
Parent:
- "<%"["%>[<% "Journal/Weekly" %>]]"
- "<%"["%>[<% `Journal/Yearly/${tp.date.now("gggg", 0, date, format)}` %>]]"
tags:
- Journal/Weekly/<% tp.date.now("gggg/gggg-[v]ww", 0, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 0, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 1, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 2, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 3, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 4, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 5, date, format) %>
- calendar/<% tp.date.weekday("YYYY/MM-MMMM/DD-dddd", 6, date, format) %>
template: "<%"["%>[<% "System/templates/journal/Weekly/Weekly Work Journal Template" %>|<% "Weekly Work Journal Template" %>]]"
<% "---" %>
# <% tp.date.now(format, 0, date, format) %>

<%"["%>[<% tp.date.now(format, -7, date, format) %>| ↶ Föregående vecka]] | <%"["%>[<% tp.date.now(format, 7, date, format) %>| Nästa vecka ↷]]

## ✍️ Summary

- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 0, date, format) %>|<% tp.date.weekday("dddd", 0, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 0, date, format) %>#✍️]]
- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 1, date, format) %>|<% tp.date.weekday("dddd", 1, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 1, date, format) %>#✍️]]
- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 2, date, format) %>|<% tp.date.weekday("dddd", 2, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 2, date, format) %>#✍️]]
- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 3, date, format) %>|<% tp.date.weekday("dddd", 3, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 3, date, format) %>#✍️]]
- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 4, date, format) %>|<% tp.date.weekday("dddd", 4, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 4, date, format) %>#✍️]]
- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 5, date, format) %>|<% tp.date.weekday("dddd", 5, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 5, date, format) %>#✍️]]
- <%"["%>[<% tp.date.weekday("YYYY-MM-DD", 6, date, format) %>|<% tp.date.weekday("dddd", 6, date, format) %>]]
  !<%"["%>[<% tp.date.weekday("YYYY-MM-DD", 6, date, format) %>#✍️]]

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
due before this week
group by due
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + late + '\n```', 'missing', 'Försenat'));

const todoThisWeek = `
not done
happens this week
group by happens
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + todoThisWeek + '\n```', 'todo', 'Att göra denna veckan'));

const todo = `
not done
no happens date
group by folder
filename does not include ${currentFileName}
`;
dv.paragraph(callout('```tasks\n' + todo + '\n```', 'todo', 'Att göra', '-'));

const done = `
done this week
group by done
filename does not include ${currentFileName}
`;

dv.paragraph(callout('```tasks\n' + done + '\n```', 'done', 'Slutförda denna veckan', '-'));
````
