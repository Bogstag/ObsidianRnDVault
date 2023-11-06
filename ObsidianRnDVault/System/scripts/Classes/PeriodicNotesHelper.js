/**
 * Creates missing notes from the Periodic Notes plugin.
 * Runs as a Templater Startup script.
 * Usually not needed for Daily notes.
 * The variable createPeriodicNotes serves two functions.
 * 	1. What periods to check.
 * 	2. If period is missing, create note or not.
 * This only prevents enabled notes to not be created.
 * If it is disabled in plugin, this will not enable it.
 *
 * @class PeriodicNotesHelper
 *
 * @example
 * const periodicNotesHelper = new tp.user.PeriodicNotesHelper();
 * periodicNotesHelper.init();
 *
 */
class PeriodicNotesHelper {
	/**
	 * Creates an instance of PeriodicNotesHelper.
	 *
	 * @constructor
	 * @param {boolean} [openNew=false] Whether to open or not the newly created file. Not recommended: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html#tpfilecreate_newtemplate-tfile--string-filename-string-open_new-boolean--false-folder-tfolder
	 * @memberof PeriodicNotesHelper
	 */
	constructor(openNew) {
		this.openNew = openNew;
		this.tp =
			app.plugins.plugins[
				"templater-obsidian"
			].templater.current_functions_object;
	}

	/**
	 * Default setting for the helper if no other is provided by the user.
	 *
	 * @default
	 * @memberof PeriodicNotesHelper
	 */
	defaults = {
		daily: false,
		weekly: true,
		monthly: true,
		quarterly: true,
		yearly: true,
	};
	/**
	 * Init the creation process.
	 * You can call all the functions from the outside and archive the same result.
	 * The init starts with receiving object with settings to use.
	 * It ends after everything in the settings object has been checked and possibly created.
	 *
	 * @param {object} createPeriodicNotes An object with settings for this run.
	 * @memberof PeriodicNotesHelper
	 */
	async init(createPeriodicNotes) {
		const periodsToCreate = await this.checkPeriodCreation(
			createPeriodicNotes || this.defaults,
		);

		for (const period of periodsToCreate) {
			const periodSettings = await this.getPeriodicNoteSettings(period);
			if (periodSettings?.create) {
				await this.createPeriodicNote(
					periodSettings.noteFolder,
					periodSettings.noteFormat,
					periodSettings.templatePath,
				);
			}
		}
	}

	/**
	 * Checks the object to see witch of the periods the user want to check/create.
	 *
	 * @param {object} createPeriodicNotes An object with settings for this run.
	 * @return {Array} A array with all the periods to run/check.
	 * @memberof PeriodicNotesHelper
	 */
	async checkPeriodCreation(createPeriodicNotes) {
		const periodsToCreate = [];

		for (const period of Object.keys(createPeriodicNotes)) {
			if (createPeriodicNotes[period]) {
				periodsToCreate.push(period);
			} else {
				console.info(`Skipping ${period} note.`);
			}
		}

		return periodsToCreate;
	}

	/**
	 * Checks the settings of the Periodic Notes Plugin.
	 * If the period is disabled, then skip that period.
	 * It also gets folder, note format and what template to use when creating note.
	 *
	 * @param {string} period What period to get configuration for.
	 * @return {object} With the current configuration for that period.
	 * @memberof PeriodicNotesHelper
	 */
	async getPeriodicNoteSettings(period) {
		const isEnabled =
			app.plugins.plugins["periodic-notes"].settings[period].enabled;

		if (isEnabled) {
			const noteFolder =
				app.plugins.plugins["periodic-notes"].settings[period].folder;
			const noteFormat =
				app.plugins.plugins["periodic-notes"].settings[period].format;
			const templatePath =
				app.plugins.plugins["periodic-notes"].settings[period].template;
			if (isEnabled && noteFolder && noteFormat && templatePath) {
				return {
					create: isEnabled,
					noteFolder: noteFolder,
					noteFormat: noteFormat,
					templatePath: templatePath,
				};
			}
			const error = {
				period: period,
				isEnabled: isEnabled,
				noteFolder: noteFolder,
				noteFormat: noteFormat,
				templatePath: templatePath,
			};
			console.error(
				`Error: ${period} is enabled, but something is wrong!`,
				error,
			);
			new Notice(`Error for ${period}. Check console and plugin settings.`);
			return undefined;
		}
		console.info(`${period} is not enabled in Periodic Notes plugin.`);
		return undefined;
	}

	/**
	 * A function that has the coordination to check if all is ok and then creates the note.
	 * The parameters has the same values as you can see in the settings for the plugin.
	 *
	 * @param {string} noteFolder Setting in the plugin for format of the folder.
	 * @param {string} noteFormat Setting in the plugin for format of the note.
	 * @param {string} templatePath Path to the template to use when creating the note.
	 * @return {undefined} None
	 * @memberof PeriodicNotesHelper
	 */
	async createPeriodicNote(noteFolder, noteFormat, templatePath) {
		const filePath = `${noteFolder}/${moment().format(noteFormat)}`;

		const fileExists = await this.fileExists(filePath);

		if (!fileExists) {
			const [path, note] = await this.tp.user.splitOnLastSlash(filePath);

			const tFolder = await this.checkPathExists(path);

			await this.createNewNote(tFolder, note, templatePath);
		}
		return undefined;
	}

	/**
	 * Checks to see if there is a note already created, if no note is found then we can create a new one.
	 *
	 * @param {string} filePath Full path and the note (without ext ".md"). Combination of folder and note in plugin settings.
	 * @return {object} If the file exists then the object has values. If not is empty. This is used as a boolean.
	 * @memberof PeriodicNotesHelper
	 */
	async fileExists(filePath) {
		const fileExists = await this.tp.file.exists(`${filePath}.md`);
		if (fileExists) {
			console.info(`${filePath}.md already exists`);
		}
		return fileExists;
	}

	/**
	 * Checks if the path / folders for the note exists or not. If not, create the folders.
	 * @external TFolder
	 * @see external:TFolder {@link https://github.com/obsidianmd/obsidian-api/blob/791214a68d0dc322b88e5abce617bdf603cc2a2d/obsidian.d.ts#L3890|Obsidian API TFolder}
	 *
	 * @param {string} path Full path to the note.
	 * @return {external:TFolder} Object with information about the folder.
	 * @see
	 * @memberof PeriodicNotesHelper
	 */
	async checkPathExists(path) {
		let tFolder = app.vault.getAbstractFileByPath(path);

		if (!tFolder) {
			console.info(`${path} folder missing.`);
			tFolder = await this.createFolder(path);
		}

		return tFolder;
	}

	/**
	 * Creates a folder.
	 * @external TFolder
	 * @see external:TFolder {@link https://github.com/obsidianmd/obsidian-api/blob/791214a68d0dc322b88e5abce617bdf603cc2a2d/obsidian.d.ts#L3890|Obsidian API TFolder}
	 *
	 * @param {string} path Full path to the folder / note.
	 * @return {external:TFolder} Object with information about the folder.
	 * @memberof PeriodicNotesHelper
	 */
	async createFolder(path) {
		const tFolder = await app.vault.createFolder(path);

		if (!tFolder) {
			console.error(
				`Can not create ${path}. Try creating it manually. app.vault.createFolder result: `,
				tFolder,
			);
			new Notice(
				`${path} dont exist and it cannot be created. Check console and file structure.`,
				0,
			);
			throw new Error(`Cant create folder with path: ${path}`);
		}

		return tFolder;
	}

	/**
	 * Creates the note.
	 * @external TFolder
	 * @see external:TFolder {@link https://github.com/obsidianmd/obsidian-api/blob/791214a68d0dc322b88e5abce617bdf603cc2a2d/obsidian.d.ts#L3890|Obsidian API TFolder}
	 *
	 * @param {external:TFolder} tFolder Object with information about the folder.
	 * @param {string} note Name of the note.
	 * @param {string} templatePath Full path and name of the template to use.
	 * @return {undefined} None
	 * @memberof PeriodicNotesHelper
	 */
	async createNewNote(tFolder, note, templatePath) {
		const templateFileT = await this.tp.file.find_tfile(templatePath);

		const result = await this.tp.file.create_new(
			templateFileT,
			note,
			this.openNew,
			tFolder,
		);
		console.info(`Created ${result.path}`);
		new Notice(`${result.path} was created`);
		return undefined;
	}
}
module.exports = PeriodicNotesHelper;
