class NotePicker {
	templateSuggestions;
	selectedNote;
	folderNoteLabelValue = "Notes";
	/**
	 * Creates an instance of NotePicker.
	 * @param {Array} templatesFolders Array of folders that contain your templates.
	 * @param {boolean} [openNew=true] Open the new note after creating it.
	 * @param {boolean} [openNewNoteInSplit=false] Set this to true if you want the new note to open in a split to the right.
	 * @param {boolean} [addLink=false] If note template_title is set to "DONTASKUSER", do you want to add link to new note in current note? If template_title is set to something else you get prompted and can change this later.
	 * @memberof NotePicker
	 */
	constructor(
		templatesFolders,
		openNew,
		openNewNoteInSplit = false,
		addLink = false,
	) {
		this.templatesFolders = templatesFolders;
		if (!templatesFolders) {
			throw new Error("Must set templatesFolders");
		}
		this.openNewNoteInSplit = openNewNoteInSplit;
		this.addLink = addLink;
		this.openNew = !(this.addLink || this.openNewNoteInSplit);
		this.tp =
			app.plugins.plugins[
				"templater-obsidian"
			].templater.current_functions_object;
		this.ArrayUtils = this.tp.user.ArrayUtils;
		this.noteManager = new this.tp.user.NoteManager();
	}

	async init() {
		// console.debug("init notePicker", this.templatesFolders);

		await this.getTemplateSuggestions();
		// console.debug("getTemplateSuggestions", await this.templateSuggestions);

		await this.askUserToSelectNote();
		// console.debug("askUserToSelectNote", await this.templateSuggestions);

		await this.setFinalTitle();
		// console.debug("setFinalTitle", await this.selectedNote.title);

		await this.askUserAboutAddingLink();
		// console.debug("askUserAboutAddingLink", await this.addLink);

		const result = this.createFromTemplate();

		return result;
	}

	async askUserToSelectNote() {
		this.selectedNote = await this.tp.system.suggester(
			this.templateSuggestions.map((x) => x.label),
			this.templateSuggestions,
		);
		if (!this.selectedNote) {
			console.error("Nothing got selected, exiting...", this.selectedNote);
			throw new Error("User abort by not selecting a note.");
		}

		if (!this.selectedNote.destinationFolder) {
			this.selectedNote.destinationFolder = this.tp.file.folder(true);
		}
	}

	async setFinalTitle() {
		if (this.selectedNote.title === "DONTASKUSER") {
			console.info("Template say DONT ASK USER", this.selectedNote.title);
		}

		this.selectedNote.title =
			(await this.tp.system.prompt(
				"Name for the new file. Will use the current date/time if no value given.",
				this.selectedNote.title || "",
			)) || moment().format("YYYY-MM-DD HH꞉mm꞉ss");

		if (typeof this.selectedNote.title !== "string") {
			// Prompt was cancelled
		}
	}

	async askUserAboutAddingLink() {
		if (this.addLink) {
			this.addLink = await this.tp.system.suggester(
				["Yes", "No"],
				[true, false],
				false,
				"Insert link in the current file? (Escape = no)",
			);
		}
	}

	/**
	 * Create a new note from a Templater template.
	 * @param {string} templatePath - Full vault path to the template file
	 * @param {string} newNoteName - this.Title / filename of the new note
	 * @param {string} destinationFolder - Full vault path to the destination folder
	 * @param {boolean} [this.openNew] - Optional: Open the new note after creating it, not recommended. Set in args on init.
	 */
	async createFromTemplate() {
		let noteMeta = {};
		if (this.openNewNoteInSplit) {
			noteMeta = await this.noteManager.createNewNoteOpenInSplit(
				this.selectedNote.templatePath,
				this.selectedNote.title,
				this.selectedNote.destinationFolder,
			);
		} else {
			noteMeta = await this.noteManager.createFromTemplate(
				this.selectedNote.templatePath,
				this.selectedNote.title,
				this.selectedNote.destinationFolder,
				!(this.addLink || this.openNewNoteInSplit),
			);
		}

		return noteMeta;
	}

	async getTemplateFiles() {
		const templateFiles = [];
		for (const folder of this.templatesFolders) {
			const files = (await app.vault.adapter.list(folder))?.files || [];
			files.sort((a, b) => a.localeCompare(b)); // Sort alphabetically
			this.ArrayUtils.removeByKeyValuePair(
				files,
				"label",
				this.folderNoteLabelValue,
			);
			templateFiles.push(...files);

			return templateFiles;
		}
	}

	getMetaDataOld(templateFiles) {
		if (!templateFiles) {
			return [];
		}

		const templates = templateFiles.map((path) => {
			const file = app.vault.getAbstractFileByPath(path);
			const meta = app.metadataCache.getFileCache(file)?.frontmatter || {};
			let title = meta.template_title || "";
			// Date/time placeholder replacement
			const match = title.match(/MOMENT\((.*?)\)/);
			if (match) {
				title = title.replace(/(MOMENT\(.*?\))/, moment().format(match[1]));
			}

			return {
				label: file.basename,
				title,
				templatePath: file.path,
				destinationFolder: meta.template_destination_folder,
			};
		});

		return templates;
	}

	async getTemplateSuggestions() {
		const templateFiles = await this.getTemplateFiles();
		this.templateSuggestions = await this.getMetaData(templateFiles);
		console.debug("this.templateSuggestions", this.templateSuggestions);
	}

	async makeSuggestion() {
		return await this.tp.system.suggester(
			templates.map((x) => x.label),
			templates,
		);
	}

	async getMetaData(templateFiles) {
		if (!templateFiles) {
			return [];
		}

		return await templateFiles.map((path) => this.createMetadataObject(path));
	}

	createMetadataObject(path) {
		const tFile = app.vault.getAbstractFileByPath(path);
		const meta = app.metadataCache.getFileCache(tFile)?.frontmatter || {};
		const label = tFile.basename;
		const title = this.noteManager.substituteMomentPlaceholder(
			meta.template_title,
		);
		const templatePath = tFile.path;
		const destinationFolder = meta.template_destination_folder;

		return { label, title, templatePath, destinationFolder };
	}
}
module.exports = NotePicker;
