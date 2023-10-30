---
aliases: 
date_created: 2023-10-06 18:34:34
date_modified: 2023-10-06 18:34:34
id: obsidian-year-timeline
name: Year Timeline
fileclass: plugin
description: Create a year timeline in your notes.
dependsOnSoftware:
  - "[[Shared Tech/RnD Vault/Obsidian/Obsidian]]"
tags: 
version: 1.0.0
isDesktopOnly: false
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
---

# Year Timeline

> [!attention]+ Manually
> Manually installed.

Create a year timeline in your notes.

>[!help]- Docs
>
>```gate  
>https://github.com/taneltm/obsidian-year-timeline
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
>https://github.com/taneltm/obsidian-year-timeline
>height:700
>profile:obsidian
>```

## Settings

```json
	{
  "customMarkers": [],
  "dailyNoteIntegration": {
    "enabled": false,
    "format": "YYYY-MM-DD",
    "directory": ""
  },
  "dayMarker": {
    "style": "circle",
    "line": {
      "color": "#CC0000",
      "width": 2
    },
    "circle": {
      "color": "#e40bf4",
      "border": "#000000",
      "borderWidth": 2,
      "radius": 34
    },
    "emoji": {
      "character": "🔻",
      "offsetX": 0,
      "offsetY": 0,
      "scale": 1.05
    }
  },
  "timeline": {
    "style": "solid",
    "solid": {
      "january": {
        "name": "Januari",
        "color": "#A7BFD4"
      },
      "february": {
        "name": "Februari",
        "color": "#B3D1E6"
      },
      "march": {
        "name": "Mars",
        "color": "#A5D5CD"
      },
      "april": {
        "name": "April",
        "color": "#C4E1B9"
      },
      "may": {
        "name": "Maj",
        "color": "#B8DCB6"
      },
      "june": {
        "name": "Juni",
        "color": "#DBE5B6"
      },
      "july": {
        "name": "Juli",
        "color": "#FFE080"
      },
      "august": {
        "name": "Augusti",
        "color": "#F6DAA1"
      },
      "september": {
        "name": "September",
        "color": "#F5CDA7"
      },
      "october": {
        "name": "Oktober",
        "color": "#F5B57C"
      },
      "november": {
        "name": "November",
        "color": "#CBAE99"
      },
      "december": {
        "name": "December",
        "color": "#C7D8E6"
      }
    },
    "gradient": {
      "angle": 0,
      "colors": []
    },
    "custom": "<svg\n  xmlns='http://www.w3.org/2000/svg'\n  viewBox='0 -100 3760 200'>\n  <title>Timeline 2022</title>\n  <defs>\n    <style>\n      .labels text {\n        font-size: 50px;\n      }\n    </style>\n  </defs>\n  <g class='bars'>\n    <rect fill='#A7BFD4' x='0' width='310' height='25'></rect>\n    <rect fill='#B3D1E6' x='320' width='280' height='25'></rect>\n    <rect fill='#A5D5CD' x='610' width='310' height='25'></rect>\n    <rect fill='#C4E1B9' x='930' width='300' height='25'></rect>\n    <rect fill='#B8DCB6' x='1240' width='310' height='25'></rect>\n    <rect fill='#DBE5B6' x='1560' width='300' height='25'></rect>\n    <rect fill='#FFE080' x='1870' width='310' height='25'></rect>\n    <rect fill='#F6DAA1' x='2190' width='310' height='25'></rect>\n    <rect fill='#F5CDA7' x='2510' width='300' height='25'></rect>\n    <rect fill='#F5B57C' x='2820' width='310' height='25'></rect>\n    <rect fill='#CBAE99' x='3140' width='300' height='25'></rect>\n    <rect fill='#C7D8E6' x='3450' width='310' height='25'></rect>\n  </g>\n  <g class='labels' style='font-size:50px;' text-anchor='start'>\n    <text fill='#CCE0E2' x='0' y='80'>January</text>\n    <text fill='#CCE0E2' x='320' y='80'>February</text>\n    <text fill='#CCE0E2' x='610' y='80'>March</text>\n    <text fill='#CCE0E2' x='930' y='80'>April</text>\n    <text fill='#CCE0E2' x='1240' y='80'>May</text>\n    <text fill='#CCE0E2' x='1560' y='80'>June</text>\n    <text fill='#CCE0E2' x='1870' y='80'>July</text>\n    <text fill='#CCE0E2' x='2190' y='80'>August</text>\n    <text fill='#CCE0E2' x='2510' y='80'>September</text>\n    <text fill='#CCE0E2' x='2820' y='80'>October</text>\n    <text fill='#CCE0E2' x='3140' y='80'>November</text>\n    <text fill='#CCE0E2' x='3450' y='80'>December</text>\n  </g>\n</svg>"
  }
}
```
