class NotePicker {
	constructor(args) {
		this.templatesFolders = args.templatesFolders;
		this.openNewNoteInSplit = args.openNewNoteInSplit;
		this.addLink = args.addLink;
		this.openNew = args.openNew;
		this.tp =
			app.plugins.plugins[
				"templater-obsidian"
			].templater.current_functions_object;
		console.log("NotePicker constructor klar", args);
	}

	/**
	 * Create a new note from a Templater template.
	 * @param {string} templatePath - Full vault path to the template file
	 * @param {string} newNoteName - Title / filename of the new note
	 * @param {string} destinationFolder - Full vault path to the destination folder
	 * @param {boolean} [this.openNew] - Optional: Open the new note after creating it, not recommended. Set in args on init.
	 */
	async createFromTemplate(
		templatePath,
		newNoteName,
		destinationFolder,
		openNewNote = false,
	) {
		const folder = app.vault.getAbstractFileByPath(
			destinationFolder || this.tp.file.folder(true),
		);
		return await this.tp.file.create_new(
			this.tp.file.find_tfile(templatePath),
			newNoteName,
			this.openNew,
			folder,
		);
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

		return this.getMetaData(templateFiles);
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
		const file = app.vault.getAbstractFileByPath(path);
		const meta = app.metadataCache.getFileCache(file)?.frontmatter || {};
		const label = file.basename;
		const title = this.substituteMomentPlaceholder(meta.template_title);
		const templatePath = file.path;
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
