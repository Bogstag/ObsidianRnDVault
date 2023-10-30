class Plugins {
	constructor(tp) {
		this.tp = tp;
	}

	listInstalledPlugins(app, navbar) {
		// Get all plugins
		const plugins = app.plugins.plugins;
		const pluginKeys = Object.keys(plugins);
		for (const pluginKey of pluginKeys) {
			navbar.appendChild(
				createEl("div", {
					text: plugins[pluginKey].manifest.name,
				}),
			);
		}

		return 0;
	}

	getPluginNames(app) {
		// TODO:: This should be able to return all data so getPluginMetadata dont have to.
		const plugins = app.plugins.plugins;
		const pluginKeys = Object.keys(plugins);
		const pluginNames = [];
		for (const pluginKey of pluginKeys) {
			pluginNames[pluginKey] = plugins[pluginKey].manifest.name;
		}

		return pluginNames;
	}

	async getPluginMetadata(app, pluginId) {
		const objectUtils = new this.tp.user.ObjectUtils();

		const plugin = app.plugins.plugins[pluginId];
		if (!plugin) {
			throw new Error("Plugin not found! Make sure its installed and enabled!");
		}

		const settings = plugin.settings;
		let sortedSettings = null;
		if (settings) {
			sortedSettings = await objectUtils.sortObjectKeys(settings);
		}

		const metadata = {
			manifest: plugin.manifest,
			settings: plugin.settings,
			//To many times you get an error. TODO:: function that get this data only.
			//formatedSettings: JSON.stringify(sortedSettings, null, 2),
		};

		return metadata;
	}
}
module.exports = Plugins;
