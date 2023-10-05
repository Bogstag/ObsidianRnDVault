<%* 
	// dependsOnTemplate:: [[System/templates/fileclass/Add Obsidian plugin page]]
	// dependsOnScript:: [[System/scripts/classes/Plugins.js]]
	const targetFolder = "Tech/Software/Obsidian/plugins";
	const tFolder = app.vault.getAbstractFileByPath(targetFolder);
	console.log("tp.config1", tp.config);
	// Get list of installed plugins
	const { Plugins } = customJS;
	let pluginNames = await Plugins.getPluginNames(app);
	console.log("pluginNames", pluginNames);
	// Ask user to select one
	const selection = await tp.system.suggester(
		Object.values(pluginNames),
		Object.keys(pluginNames),
		true,
		"Select Plugin"
	);
	console.log("selection", selection);
	// Get manifesto
	plugin = await Plugins.getPluginMetadata(app, selection);
	console.log("plugin", plugin);
	title = plugin.manifest.name;
	console.log("title", title);
	const fullPath = "targetFolder" + "/" + title + ".md";
	console.log("fullPath", fullPath);
	await tp.user.ensureNotExisting(tp, fullPath);
	await tp.user.ensureCorrectFolder(tp, targetFolder);
	await tp.user.ensureTitle(tp, title);
	
	console.log("tp.config2", tp.config);

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
- [[<% "Obsidian" %>]]
tags: 
version: <% plugin.manifest.version %>
isDesktopOnly: <% plugin.manifest.isDesktopOnly %>
template: [[<% tp.config.template_file.name %>]]
<% "---" %>

# <% plugin.manifest.name %>

<% plugin.manifest.description %>

>[!help]- Docs
>
>```gate  
>https://github.com/Bogstag/ObsidianRnDVault
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
