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
template: "<%"["%>[<% "System/templates/journal/Daily/Daily Work Journal Template" %>]]"
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
<%*
    const ics = await app.plugins.getPlugin('ics');
    
    let eventsToday = await ics.getEvents();
    
    function injectCustomEvents(eventsToday, customEvents, first = false) {
        for (customEvent of customEvents) {
            const newEvent = {
                "time": customEvent.startTime || "",
                "endTime": customEvent.endTime || "",
                "icsName": customEvent.icsName || "Custom",
                "summary": {
                    "params": {
                        "LANGUAGE": "sv"
                    },
                    "val": customEvent.summary || ""
                },
                "description": customEvent.description || "",
                "location": customEvent.location|| ""
            }
            if (first) {
                eventsToday.unshift(newEvent);
            } else {
                eventsToday.push(newEvent);
            }
        }
        return eventsToday;
    }
    // Inject custom template into events array, that have a start and end time
    const customEvents = [];
    // Template customs.push({startTime: "00:00", endTime: "00:00", summary: "", description:"", location: ""})
    if (tp.date.now("d") === 2 || tp.date.now("d") === 4) {
        customEvents.push({startTime: "08:45", endTime: "09:00", summary: "Prepare standup"})
    }
    if (customEvents) {
        eventsToday = injectCustomEvents(eventsToday, customEvents)
    }
    // We sort array by start time
    eventsToday = eventsToday.sort((a, b) => a.time.replace(":", "") - b.time.replace(":", ""))
    // Inject the first task of the day. No need for time.
    // We add from the front so the order should be correct order.
    // existing events in arr: events[3,4]
    // correctOrder: First,2 unshift into first[] = first[2,First]
    // first[2,First] unshift into events[3,4] = events[First,2,3,4]
    const firstCustoms = [];
    firstCustoms.unshift({summary: "Check in #Work/tidsregistrera"})
    eventsToday = injectCustomEvents(eventsToday, firstCustoms, true)
    // Inject last tasks of the day last. No need for time.
    // This should also be in correct order. Last task last.
    // existing events in arr: events[1,2,3,4]
    // correctOrder: 5,Last push into last[] = last[5,Last]
    // last[5,Last] push into events[1,2,3,4] = events[1,2,3,4,5,Last]
    const lastCustoms = [];
    if (tp.date.now("d") == 5) {
        lastCustoms.push({summary: "Tidsregistrera i slutet av veckan", description:`#Work/tidsregistrera/vecka 📅 ${tp.date.weekday("YYYY-MM-DD", 5)} ➕ ${moment().format("YYYY-MM-DD")}`})
    }
    lastCustoms.push({summary: "Check out #Work/tidsregistrera"})
    eventsToday = injectCustomEvents(eventsToday, lastCustoms)
    // Now we can clean, format into markdown and display the list.
    let mdArray = [];
    for (const e of eventsToday) {
        let summary = ""
        if (e.summary) {
            if (e.summary.val) {
                summary = "💬" + e.summary.val;
            }
        }
        
        if (e.time === "23:00" || e.time === "00:00" || e.time === "01:00") {
            //Assume its a all day event
            mdArray.push(`- ${summary} `)
            continue;
        }
        
        let location = "";
        if (e.location) {
            if (e.location.toLowerCase().includes("skype")) {
                location = "💻"
            } else {
                location = "🪑" + e.location
            }
        }
        
        let description = ""
        if (e.description) {
            description = e.description.replace(/[\r\n]+/gm, " ");
            description = description.trim();
            description = description.substring(0, 70)
            if (description.length > 5) {
                description = "\n\t\t" + description
            }
        }
        
        let tid = ""
        let end = ""
        if (e.endTime) {
            end = `-${e.endTime}`
        }
        if (e.time) {
            tid = `⏰${e.time}${end}`    
        }
        
        //One line, description handles the new line.
        mdArray.push(`- [ ] ${tid} ${summary}${location}${description}`)
    }
    //console.log(mdArray.join("\n"));
    tR += mdArray.join("\n")
-%>	

## 📚
>[!Info]- TidReg
>```gate  
>URL
>height: 800
>profile: intern
>```
<%* if (tp.date.now("d") == 5) { %>
>[!Info]- TimeReporting
>```gate  
>URL
>height: 800
>profile: intern
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
