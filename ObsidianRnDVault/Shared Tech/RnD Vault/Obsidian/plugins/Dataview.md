---
aliases: 
date_created: 2023-10-28 18:35:56
date_modified: 2023-10-28 18:35:56
id: dataview
name: Dataview
fileclass: plugin
description: Complex data views for the data-obsessed.
dependsOnSoftware:
  - "[[Obsidian]]"
version: 0.5.61
isDesktopOnly: false
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
---

# Dataview

Complex data views for the data-obsessed.

>[!help]- Docs
>
>```gate  
>https://blacksmithgu.github.io/obsidian-dataview/
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
>https://github.com/blacksmithgu/obsidian-dataview
>height:700
>profile:obsidian
>```

## Snippets

### List of backlinks not including outgoing links from this note

```dataview 
list 
where contains(this.file.inlinks, file.link) 
	and !contains(this.file.outlinks, file.link) 
```
