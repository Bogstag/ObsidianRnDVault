---
aliases: []
date_created: 2023-09-16 00:01:40
date_modified: 2023-09-16 20:04:30
fileclass: software
supports: ["[[Shared Tech/RnD Vault/Obsidian/plugins/Custom File Explorer sorting]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/CustomJS]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Dataview]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Editor Syntax Highlight]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/ICS]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Jira Issue]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Linter]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Metadata Menu]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Modules]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Open Gate]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Periodic Notes]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Tasks]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Templater]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Settings Search]]", "[[Shared Tech/RnD Vault/Obsidian/plugins/Year Timeline]]"]
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
