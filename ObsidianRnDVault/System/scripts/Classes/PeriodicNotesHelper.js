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
 * @example
 * const periodicNotesHelper = new tp.user.PeriodicNotesHelper();
 * periodicNotesHelper.init();
 * TODO:: Add some more JSDoc
 */
class PeriodicNotesHelper {
	constructor(openNew) {
		this.openNew = openNew; // Whether to open or not the newly created file. Not recommended: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html#tpfilecreate_newtemplate-tfile--string-filename-string-open_new-boolean--false-folder-tfolder
		this.tp =
			app.plugins.plugins[
				"templater-obsidian"
			].templater.current_functions_object;

		const useUtils = require(`${app.vault.adapter.basePath}\\System\\Scripts\\Utils\\index.cjs`);
		console.debug("useUtils", useUtils);
		const util = useUtils();
		console.debug("util", util);
		const test = "hej/hälsad";
		console.debug(util.uppercase(test));
		console.debug(util.splitOnLastSlash(test));
	}

	getDefaults() {
		const createPeriodicNotes = {
			daily: false,
			weekly: true,
			monthly: true,
			quarterly: true,
			yearly: true,
		};
		return createPeriodicNotes;
	}

	async init(createPeriodicNotes) {
		const periodsToCreate = await this.checkPeriodCreation(
			createPeriodicNotes || this.getDefaults(),
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

	checkPeriodCreation(createPeriodicNotes) {
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

	getPeriodicNoteSettings(period) {
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

	async createPeriodicNote(noteFolder, noteFormat, templatePath) {
		const filePath = `${noteFolder}/${moment().format(noteFormat)}`;

		if (await this.tp.file.exists(`${filePath}.md`)) {
			console.info(`${filePath}.md already exists`);
			return undefined;
		} else {
			await this.createNewNote(filePath, templatePath);
			return undefined;
		}
	}

	async createNewNote(filePath, templatePath) {
		console.debug(filePath);
		const [path, note] = await this.tp.user.splitOnLastSlash(filePath);
		console.debug([path, note]);
		const template = await this.tp.file.find_tfile(templatePath);
		const result = await this.tp.file.create_new(
			template,
			note,
			this.openNew,
			app.vault.getAbstractFileByPath(path),
		);
		console.info(`Created ${result.path}`);
		new Notice(`${result.path} was created`);
		return undefined;
	}
}
module.exports = PeriodicNotesHelper;
