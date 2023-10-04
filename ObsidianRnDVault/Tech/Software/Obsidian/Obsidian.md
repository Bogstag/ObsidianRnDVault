---
aliases: []
date_created: 2023-09-16 00:01:40
date_modified: 2023-09-16 20:04:30
fileclass: software
supports: 
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
