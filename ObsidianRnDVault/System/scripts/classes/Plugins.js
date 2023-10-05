class Plugins {
	listInstalledPlugins(app, navbar) {
		// Get all plugins
		let plugins = app.plugins.plugins;
		let pluginKeys = Object.keys(plugins);
		for (let pluginKey of pluginKeys) {
			navbar.appendChild(
				createEl("div", {
					text: plugins[pluginKey]["manifest"]["name"],
				})
			);
		}

		return 0;
	}

	getPluginNames(app) {
		// TODO:: This should be able to return all data so getPluginMetadata dont have to.
		let plugins = app.plugins.plugins;
		let pluginKeys = Object.keys(plugins);
		let pluginNames = [];
		for (let pluginKey of pluginKeys) {
			pluginNames[pluginKey] = plugins[pluginKey].manifest.name;
		}

		return pluginNames;
	}

	async getPluginMetadata(app, pluginId) {
		const utilsClass = await self.require.import(
			"System/scripts/UtilityClasses/ObjectUtils.mjs"
		);
		const ObjectUtils = utilsClass.default;
		const utilsInstance = new ObjectUtils();

		let plugin = app.plugins.plugins[pluginId];
		if (!plugin) {
			throw new Error("Plugin not found! Make sure its installed and enabled!");
		}
		let settings = plugin.settings;

		const sortedSettings = utilsInstance.sortObjectKeys(settings);

		let metadata = {
			manifest: plugin.manifest,
			settings: plugin.settings,
			formatedSettings: JSON.stringify(sortedSettings, null, 2),
		};

		return metadata;
	}
}
