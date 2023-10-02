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

Happiness::
Productivity::
Relationships::
Focus::

### 📜 Events

Biggest Personal Milestone::
Biggest Career Milestone::

### 🚀 Projects

### 🏢 Career

### 📅 Future plan

### ✅ Action

Be thorough in planning!

### 📚 To read

### 📗 Already read

## ❓ Yearly quiz

### 🔙 Past year

1. Do you have a word for the year?
1. What was the biggest Personal Milestone?
1. What did you discover about yourself?
1. When did fear hold you back?
1. Where did you practice courage?
1. What surprised you?
1. How have you taken care of yourself physically?
1. How have you taken care of yourself mentally?
1. How have you taken care of yourself emotionally?
1. What are you ready to begin?
1. What are you ready to end?
1. How has this year impacted your priorities?
1. How has this year impacted your home life?
1. How has this year impacted your relationships?
1. How has this year impacted your work life?

### ⏭ Next year

1. What are you looking forward to in the next year?
1. What are you feeling apprehensive about?
1. What area of your life do you most want to develop in the next year?
1. Where do you want to be in your head?
1. Where do you want to be in your heart?
1. What are your priorities for the next year?
1. I will make more time for:
1. I will learn about:
1. I will say NO to:
1. I will say YES to:
