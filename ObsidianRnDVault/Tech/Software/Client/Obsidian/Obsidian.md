---
aliases: []
date_created: 2023-09-16 00:01:40
date_modified: 2023-09-16 20:04:30
fileclass: software
supports: ["[[Tech/Software 1/Obsidian/plugins/CustomJS]]", "[[Tech/Software 1/Obsidian/plugins/ICS]]", "[[Tech/Software 1/Obsidian/plugins/Jira Issue]]", "[[Tech/Software 1/Obsidian/plugins/Metadata Menu]]", "[[Tech/Software 1/Obsidian/plugins/Linter]]", "[[Tech/Software 1/Obsidian/plugins/Open Gate]]", "[[Tech/Software 1/Obsidian/plugins/Periodic Notes]]", "[[Tech/Software 1/Obsidian/plugins/Tasks]]", "[[Tech/Software 1/Obsidian/plugins/Templater]]", "[[Tech/Software 1/Obsidian/plugins/Year Timeline]]", "[[Tech/Software 1/Obsidian 1/plugins/QuickAdd]]"]
  - "[[Tech/Software 1/Obsidian/plugins/ICS]]"
  - "[[Tech/Software 1/Obsidian/plugins/Jira Issue]]"
  - "[[Tech/Software 1/Obsidian/plugins/Metadata Menu]]"
  - "[[Tech/Software 1/Obsidian/plugins/Linter]]"
  - "[[Tech/Software 1/Obsidian/plugins/Open Gate]]"
  - "[[Tech/Software 1/Obsidian/plugins/Periodic Notes]]"
  - "[[Tech/Software 1/Obsidian/plugins/Tasks]]"
  - "[[Tech/Software 1/Obsidian/plugins/Templater]]"
  - "[[Tech/Software 1/Obsidian/plugins/Year Timeline]]"
tags: []
supports_test: 
---

# Obsidian

```dataviewjs
let plugins = dv.current().file.frontmatter.supports
if (plugins) {
	dv.header(2, 'Plugins')
	dv.list(plugins);
}
```
