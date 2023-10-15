---
fileclass: template
---
<%* tR = "" -%>
<%*
	date = tp.file.title // Starting date
	format = "YYYY" // Format of starting date
	locale = "sv"
	moment.locale(locale)
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
_%>
<% "---" %>
nextYear: "<%"["%>[<% tp.date.now(format, 366, date, format) %>]]"
prevYear: "<%"["%>[<% tp.date.now(format, -366, date, format) %>]]"
date: <% tp.date.now(format, 0, date, format) %>
date_created: <% tp.file.creation_date() %>
date_modified: <% tp.file.creation_date() %>
dateformat: <% format %>
fileclass: journal/yearly
locale: <% locale %>
Parent:
- "<%"["%>[<% "Journal/Yearly" %>]]"
tags:
- Journal/Yearly/<% tp.date.now(format, 0, date, format) %>
- Calendar/<% tp.date.now(format, 0, date, format) %>
template: "<%"["%>[<% "System/templates/journal/Yeary/Yeary Journal Template" %>|<% "Yeary Journal Template" %>]]"
<% "---" %>
# <% tp.date.now(format, 0, date, format) %>

<%"["%>[<% tp.date.now(format, -366, date, format) %>|↶ Förra året]] | <%"["%>[<% tp.date.now(format, 366, date, format) %>|Nästa år ↷]]

## 🔃 Reflection

### 💯 Rating 0 -10

### 📜 Events

### 🚀 Projects

### 🏢 Career

### 📅 Future plan

### ✅ Action

### 📚 To read

### 📗 Already read

## ❓ Yearly quiz

### 🔙 Past year

### ⏭ Next year