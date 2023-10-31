---
dependsOnScript: "[[System/Scripts/Classes/Plugins.js|Plugins.js]]"
fileclass: template
---
<%* tR = "" _%>
<%* 
	const targetFolder = "Shared Tech/RnD Vault/Obsidian/plugins";

	// Get list of installed plugins
	const Plugins = new tp.user.Plugins(tp);
	
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

	// Finalise the note
	const fullPath = targetFolder + "/" + title;

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
template: "<%"["%>[System/Templates/fileclass/Add Obsidian plugin page|Add Obsidian plugin page]]"
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
><% plugin.manifest.fundingUrl %>
>height:700
>profile:obsidian
>```

