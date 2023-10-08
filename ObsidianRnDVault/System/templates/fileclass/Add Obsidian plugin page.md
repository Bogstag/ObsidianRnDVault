---
dependsOnScript: "[[System/scripts/classes/Plugins.js|Plugins.js]]"
dependsOnPlugin:
  - "[[Tech/Software/Obsidian/plugins/CustomJS|CustomJS]]"
fileclass: template
---
<%* tR = "" -%>
<%* 
	const targetFolder = "Tech/Software/Obsidian/plugins";
	
	// Get list of installed plugins
	const { Plugins } = customJS;
	let pluginNames = await Plugins.getPluginNames(app);
	
	// Ask user to select one
	const selection = await tp.system.suggester(
		Object.values(pluginNames),
		Object.keys(pluginNames),
		true,
		"Select Plugin"
	);
	
	// Get manifesto
	plugin = await Plugins.getPluginMetadata(app, selection);
	title = plugin.manifest.name;
	console.log(plugin)
	// Finalise the note
	const fullPath = targetFolder + "/" + title;
	console.log(fullPath)
	if (!await tp.file.exists(fullPath + ".md")) {
		await tp.file.move(fullPath);
	}
_%>
<% "---" %>
aliases: 
date_created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
date_modified: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
id: <% plugin.manifest.id %>
name: <% plugin.manifest.name %>
fileclass: plugin
description: <% plugin.manifest.description %>
dependsOnSoftware: 
- "<%"["%>[Obsidian]]"
version: "<% plugin.manifest.version %>"
isDesktopOnly: <% plugin.manifest.isDesktopOnly %>
template: "<%"["%>[System/templates/fileclass/Add Obsidian plugin page|Add Obsidian plugin page]]"
<% "---" %>

# <% plugin.manifest.name %>

<% plugin.manifest.description %>

>[!help]- Docs
>
>```gate  
><% plugin.manifest.authorUrl %>
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
><% plugin.manifest.authorUrl %>
>height:700
>profile:obsidian
>```

## Settings

```json
	<% plugin.formatedSettings %>
```
