/*
 * String module.
 * @module Utils/index
 * @see module:Utils/index
 *
 * @type {functions}
 */
const strings = require(`${app.vault.adapter.basePath}\\System\\Scripts\\Utils\\strings.cjs`);

/**
 * Function that collects all utils so its usable in unison.
 * And then sends it out in the world.
 *
 * @return {functions} Usefull utility functions
 */
module.exports = function useUtils() {
	return { ...strings };
};

/**
 * Thinking of trying to use this names for some of the modules.
 * From Obsidian API (https://github.com/obsidianmd/obsidian-api)
 * App, the global object that owns everything else. You can access this via this.app inside your plugin.
 * Vault, the interface that lets you interact with files and folders in the vault.
 * Workspace, the interface that lets you interact with panes on the screen.
 * MetadataCache, the interface that contains cached metadata about each markdown file, including headings, links, embeds, tags, and blocks.
 */
