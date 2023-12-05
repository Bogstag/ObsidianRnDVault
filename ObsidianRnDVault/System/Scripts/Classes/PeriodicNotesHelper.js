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
		this.noteManager = new this.tp.user.NoteManager();
	}

	/**
	 * Init the creation process.
	 * You can call all the functions from the outside and archive the same result.
	 * The init starts with receiving object with settings to use.
	 * It ends after everything in the settings object has been checked and possibly created.
	 *
	 * @param {object} options An object with settings for this run.
	 * @param {number} [options.daily=false] Option to create daily notes.
	 * @param {number} [options.weekly=true] Option to create weekly notes.
	 * @param {number} [options.monthly=true] Option to create monthly notes.
	 * @param {number} [options.quarterly=true] Option to create quarterly notes.
	 * @param {number} [options.yearly=true] Option to create yearly notes.
	 * @memberof PeriodicNotesHelper
	 */
	async init(options = {}) {
		// TODO:: It creates new notes every start, but it already exists notes. For yearly and Weekly notes.
		const defaultOptions = {
			daily: false,
			weekly: true,
			monthly: true,
			quarterly: true,
			yearly: true,
		};
		const finalOptions = { ...defaultOptions, ...options };

		const periodsToCreate = await this.checkPeriodCreation(finalOptions);

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
		}
		console.info(`${period} is not enabled in Periodic Notes plugin.`);
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
		const [path, note] = await this.tp.user.splitOnLastSlash(filePath);

		const result = await this.noteManager.createFromTemplate(
			templatePath,
			note,
			path,
			this.openNew,
		);
		console.info(`Created ${result.tFile.path}`);
		new Notice(`${result.tFile.path} was created`);
	}
}
module.exports = PeriodicNotesHelper;
