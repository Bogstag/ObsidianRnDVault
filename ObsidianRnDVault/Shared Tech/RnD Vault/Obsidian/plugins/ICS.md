---
aliases: 
date_created: 2023-10-08 01:27:20
date_modified: 2023-10-08 01:28:40
dependsOnSoftware:
  - "[[Shared Tech/RnD Vault/Obsidian/Obsidian]]"
description: Parse multiple ICS files to include in your notes. Designed for Daily Notes and the Day Planner format. Through templates you can customize it for other use cases.
fileclass: plugin
id: ics
isDesktopOnly: false
name: ICS
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
version: 1.1.3
---
# ICS

Parse multiple ICS files to include in your notes. Designed for Daily Notes and the Day Planner format. Through templates you can customize it for other use cases.

>[!bug]- Repo
>
>```gate  
>https://github.com/muness/obsidian-ics
>height:700
>profile:obsidian
>```

## Settings

```json
	null
```

## Examples

### Get Events from Ics Plugin

```js RunJS:{n:"Ego/Examples/ICS/Get events from ics",t:"s"} 
var events = await app.plugins.getPlugin('ics').getEvents("2023-09-05");

events = events.sort((a, b) => {
  if (a.time < b.time) {
    return -1;
  }
});

var mdArray = [];
events.forEach((e) => {
	if (e.summary == "[object Object] (recurring)") {
		return;
	} else {
		mdArray.push(`- [ ] ?${e.time} ??${e.summary.val} ??${e.location}`)
	}
})

console.log(mdArray);
```

### Att Anv�ndas Av Templater

```js RunJS:{n:"Ego/Examples/ICS/Templater - Get events from ics",t:"s"}
(async () => {
  var events = await app.plugins.getPlugin('ics').getEvents();
  var mdArray = [];
  events.forEach((e) => {

	if (e.summary == "[object Object] (recurring)") {
		return;
	} else if (!e.location) {
		mdArray.push(`- [ ] ?${e.time} ??${e.summary.val} #meeting`)
	} else {
		mdArray.push(`- [ ] ?${e.time} ??${e.summary.val} ??${e.location} #meeting`)
	}
  })

  return mdArray.sort().join("\n")}
)()
```

### Referens Event JSON

```json
[
    {
        "time": "02:00",
        "icsName": "Outlook",
        "summary": "[object Object] (recurring)",
        "description": "Flashback\n",
        "format": {
            "icsName": false,
            "summary": true,
            "description": false
        }
    },
    {
        "time": "09:00",
        "icsName": "Outlook",
        "summary": "[object Object] (recurring)",
        "description": "\n\n",
        "format": {
            "icsName": false,
            "summary": true,
            "description": false
        }
    },
    {
        "time": "09:30",
        "icsName": "Outlook",
        "summary": {
            "params": {
                "LANGUAGE": "sv"
            },
            "val": "Morning meeting"
        },
        "description": " SKYPE LINK",
        "format": {
            "icsName": false,
            "summary": true,
            "description": false
        },
        "location": "Room 1"
    },
    {
        "time": "11:00",
        "icsName": "Outlook",
        "summary": "[object Object] (recurring)",
        "description": "\n",
        "format": {
            "icsName": false,
            "summary": true,
            "description": false
        }
    },
    {
        "time": "12:00",
        "icsName": "Outlook",
        "summary": {
            "params": {
                "LANGUAGE": "sv"
            },
            "val": "Working Time"
        },
        "description": "Time to work",
        "format": {
            "icsName": false,
            "summary": true,
            "description": false
        },
        "location": "Its not a meeting is a time blocker"
    },
    {
        "time": "14:00",
        "icsName": "Outlook",
        "summary": "[object Object] (recurring)",
        "description": "\n\n",
        "format": {
            "icsName": false,
            "summary": true,
            "description": false
        }
    }
]
```
