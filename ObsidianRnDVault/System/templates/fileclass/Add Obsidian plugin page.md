<%*
	// Folder template for [[plugins]]
	let title = tp.file.title;
	if(title.toLowerCase().includes("untitled")){
		const {Plugins} = customJS;
		let pluginNames = await Plugins.getPluginNames(app);
		let selection = await tp.system.suggester(Object.values(pluginNames), Object.keys(pluginNames), true, "Select Plugin");
		plugin = await Plugins.getPluginMetadata(app, selection)
		console.log("plugin", plugin);
		title = plugin.manifest.name;
		if(title.length == 0){
			title = `untitled plugin (${tp.date.now("YYYY-MM-DD")})`;
		}
	} else {
		title = await tp.system.prompt("Plugin title", title);
	}
	const targetFolder = "Tech/Software/Obsidian/plugins";
	if (tp.file.folder != targetFolder) { 
		await tp.file.move('/' + targetFolder + '/' + tp.file.title)
	}
	await tp.file.rename(title);
	const filePath = tp.file.path(true);
	let fileObject = this.app.vault.getAbstractFileByPath(filePath);
_%>
<% "---" %>
aliases: 
date_created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
date_modified: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
id: <% plugin.manifest.id %>
name: <% plugin.manifest.name %>
fileclass: plugin
description: <% plugin.manifest.description %>
dependson: 
- "[[<% "Obsidian" %>]]"
tags: 
version: <% plugin.manifest.version %>
isDesktopOnly: <% plugin.manifest.isDesktopOnly %>
template: [[<% "System/templates/fileclass/Add Obsidian plugin page" %>]]
<% "---" %>

# <% plugin.manifest.name %>

<% plugin.manifest.description %>

## Docs

>[!help]- Docs
>
>```gate  
>https://github.com/Bogstag/ObsidianRnDVault
>height:700
>profile:obsidian
>```

## Repo

>[!bug]- Repo
>
>```gate  
>https://github.com/Bogstag/ObsidianRnDVault
>height:700
>profile:obsidian
>```

## Settings

```json
<% plugin.formatedSettings %>
```
