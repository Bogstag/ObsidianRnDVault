/**
 * Class for starting a chain of events
 * Idea and a lot of code comes from https://github.com/alangrainger/obsidian-gtd
 *
 * @class Init
 */

class Init {
	constructor() {
		this.dv = app.plugins.plugins.dataview.api;
		this.tp =
			app.plugins.plugins[
				"templater-obsidian"
			].templater.current_functions_object;
	}

	/**
	 * Attach the functions to the target, usually this.
	 *
	 * @param {*} target
	 * @memberof Init
	 */
	async attach(target) {
		target.app = await app;
		target.dv = await app.plugins.plugins.dataview.api;
		target.tp =
			await app.plugins.plugins["templater-obsidian"].templater
				.current_functions_object;

		target.page = await target.dv.page(target.tp.file.path(true));
		target.file = await target.page.file;
		target.view = await app.workspace.activeLeaf.view;
		target.sleep = async (ms) => {
			await new Promise((resolve) => setTimeout(resolve, ms));
		};
		const noteCreator = this.importNoteCreator();
		await noteCreator.attachFunctions(target);
	}

	async importNoteCreator() {
		const { noteCreator } = await import("./NoteCreator.js");
		return noteCreator;
		// Use the NoteCreator module here
	}
}
module.exports = Init;
