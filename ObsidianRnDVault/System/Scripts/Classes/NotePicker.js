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

		if (this.openNewNoteInSplit) {
			// console.debug("openNewNoteInSplit", await this.openNewNoteInSplit);
			this.openNoteInSplit();
		}

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

		return undefined;
	}

	async setFinalTitle() {
		// TODO:: This is not done
		if (this.selectedNote.title === "DONTASKUSER") {
			console.info("Template say DONT ASK USER", this.selectedNote.title);
			return undefined;
		}

		this.selectedNote.title =
			(await this.tp.system.prompt(
				"Name for the new file. Will use the current date/time if no value given.",
				this.selectedNote.title || "",
			)) || moment().format("YYYY-MM-DD HH꞉mm꞉ss");

		if (typeof this.selectedNote.title !== "string") {
			// Prompt was cancelled
			return undefined;
		}

		this.selectedNote.title = await this.makeSafeTitle(this.selectedNote.title);

		return undefined;
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

	async openNoteInSplit() {
		// Open the new file in a pane to the right
		const file = app.vault.getAbstractFileByPath(
			`${this.selectedNote.destinationFolder}/${this.selectedNote.title}.md`,
		);
		// Create the new leaf
		const newLeaf = app.workspace.getLeaf("split");
		await newLeaf.openFile(file);
		// Set the view to edit mode
		const view = newLeaf.getViewState();
		view.state.mode = "source";
		newLeaf.setViewState(view);
		// Give focus to the new leaf
		app.workspace.setActiveLeaf(newLeaf, { focus: true });
		// Move the cursor to the end of the new note
		app.workspace.activeLeaf.view.editor?.setCursor({ line: 999, ch: 0 });
	}

	/**
	 * Create a new note from a Templater template.
	 * @param {string} templatePath - Full vault path to the template file
	 * @param {string} newNoteName - this.Title / filename of the new note
	 * @param {string} destinationFolder - Full vault path to the destination folder
	 * @param {boolean} [this.openNew] - Optional: Open the new note after creating it, not recommended. Set in args on init.
	 */
	async createFromTemplate() {
		console.debug(
			"selectedNote.destinationFolder",
			this.selectedNote.destinationFolder,
		);
		console.debug("selectedNote.templatePath", this.selectedNote.templatePath);
		console.debug("selectedNote.title", this.selectedNote.title);
		console.debug("openNewNoteInSplit", this.openNewNoteInSplit);
		console.debug("addLink ", this.addLink);
		const tFolder = app.vault.getAbstractFileByPath(
			this.selectedNote.destinationFolder,
		);
		console.debug("tFolder", tFolder);
		console.debug(
			"!(this.addLink || this.openNewNoteInSplit)",
			!(this.addLink || this.openNewNoteInSplit),
		);
		const result = await this.tp.file.create_new(
			this.tp.file.find_tfile(this.selectedNote.templatePath),
			this.selectedNote.title,
			!(this.addLink || this.openNewNoteInSplit),
			tFolder,
		);
		console.debug("result ", result);
		return result;
	}

	/**
	 * Takes a note filename/title, and replaces any filesystem-unsafe characters
	 * with Unicode characters that look the same
	 * @param {string} unsafeTitle
	 * @returns {string}
	 */
	makeSafeTitle(title, retry = false) {
		const isValid = this.validateFileName(title);

		if (isValid) {
			return title;
		}
		if (retry) {
			console.error(`Cannot validate titel! ${title}`);
			new Notice("Title failed validation! Look in console for error!");

			return undefined;
		} else {
			const newTitle = this.makeFileNameValid(title);
			console.warn(`Title not valid! ${title}. Trying again with: ${newTitle}`);
			this.makeSafeTitle(newTitle, true);
		}
	}

	getFileNameValidator() {
		const rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
		const rg2 = /^\./; // cannot start with dot (.)
		const rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names

		return { rg1, rg2, rg3 };
	}

	validateFileName(fileName) {
		const { rg1, rg2, rg3 } = this.getFileNameValidator();

		return rg1.test(fileName) && !rg2.test(fileName) && !rg3.test(fileName);
	}

	makeFileNameValid(fileName) {
		const { rg1, rg2, rg3 } = this.getFileNameValidator();

		return fileName.replace(rg1, "").replace(rg2, "").replace(rg3, "");
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
		return undefined;
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
		const title = this.substituteMomentPlaceholder(meta.template_title);
		const templatePath = tFile.path;
		const destinationFolder = meta.template_destination_folder;

		return { label, title, templatePath, destinationFolder };
	}

	substituteMomentPlaceholder(templateTitle) {
		let title = templateTitle || "";
		const match = title.match(/MOMENT\((.*?)\)/);
		if (match) {
			title = title.replace(/(MOMENT\(.*?\))/, moment().format(match[1]));
		}

		return title;
	}
}
module.exports = NotePicker;
