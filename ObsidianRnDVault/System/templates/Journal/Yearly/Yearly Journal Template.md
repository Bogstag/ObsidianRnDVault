<%*
	date = tp.file.title // Starting date
	format = "YYYY" // Format of starting date
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
fileclass: Yearly
locale: <% locale %>
Parent:
- [[<% "Journal/Yearly" %>]]
tags:
- Journal/Yearly/<% tp.date.now(format, 0, date, format) %>
- calendar/<% tp.date.now(format, 0, date, format) %>
template: [[<% "System/templates/journal/Yeary Journal Template" %>|<% "Yeary Journal Template" %>]]
<% "---" %>
# <% tp.date.now(format, 0, Date, format) %>

<i data-timeline="<% tp.date.now("DDD", 0, date, format) %>"></i>
[[<% tp.date.now(format, -1, date, format) %>|↶ Förra året]] | [[<% tp.date.now(format, 1, date, format) %>|Nästa år ↷]]

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
