---
fileclass: template
template_destination_folder: Work/Meetings
---
<%* tR = "" _%>
<%* 
	tag = "#Work/Meeting/Standup"
-%>
<%*
	// meeting_folder = "... /👥 Meeting/Standup/"
	// tp.file.move(meeting_folder + tp.file.title)
-%>
# <% tp.file.title.slice(11) %>

---
Attendees::
Links: [[<%''%>🏃 Actions]]
Tags: <% tag %>
Date: <% tp.file.title.slice(0, 11) %>
---

## 🏃 Actions



## 📝 Notes

Me:
- Yesterday
	- 
- Today
	- 
- Stuck
	- 
- Help
	- 

## 🧐 Preparation

- [ ] Prepare meeting: <% tp.file.title.slice(11) %> 🗓<% tp.file.title.slice(0, 11) %>

Go from top right to bottom left. Highest priority first. What should we do to finish the epic?

Assist:
- Can you use any <u>help</u>, and from who?
- Where are you <u>stuck</u>?
- What do you <u>need</u> to finish this task?
- What is the <u>outcome</u> you're looking for?
- What needs <u>feedback</u>?
- Are you working on anything that <u>wasn't planned</u>?
- ⚠️ Mention the issue, but do not dive into details

Wrap up:
- Who has a <u>win</u> they want to share?
- What would make you feel <u>accomplished</u> today?