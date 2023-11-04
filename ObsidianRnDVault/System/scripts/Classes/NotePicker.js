class NotePicker {
	constructor(args) {
		this.templatesFolders = args.templatesFolders;
		this.openNewNoteInSplit = args.openNewNoteInSplit;
		this.addLink = args.addLink;
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
	 * @param {string} dF - Full vault path to the destination folder
	 * @param {boolean} [openNewNote] - Optional: Open the new note after creating it
	 */
	async createFromTemplate(templatePath, newNoteName, dF, openNewNote = false) {
		const destinationFolder = dF || this.tp.file.folder(true);

		const newFile = await this.tp.file.create_new(
			this.tp.file.find_tfile(templatePath),
			newNoteName,
			openNewNote,
			app.vault.getAbstractFileByPath(destinationFolder),
		);

		// No need as i wipe old frontmatter in note template
		// TODO:: decide if this should go or move
		// Remove the template properties from the new file
		// await app.fileManager.processFrontMatter(newFile, (frontmatter) => {
		// 	frontmatter.template_destination_folder = undefined;
		// 	frontmatter.template_title = undefined;
		// });

		return openNewNote ? "" : `[[${newNoteName}]]`;
	}

	/**
	 * Takes a note filename/title, and replaces any filesystem-unsafe characters
	 * with Unicode characters that look the same
	 * @param {string} unsafeTitle
	 * @returns {string}
	 */
	makeFilesystemSafeTitle(unsafeTitle) {
		// https://stackoverflow.com/questions/10386344/how-to-get-a-file-in-windows-with-a-colon-in-the-filename
		// some replacements: ” ‹ › ⁎ ∕ ⑊ ＼︖ ꞉ ⏐
		let title = unsafeTitle.replace(/:/g, "꞉");
		title = title.replace(/\//g, "∕");

		return title;
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

	getMetaData(templateFiles) {
		if (!templateFiles) {
			return [];
		}

		return templateFiles.map((path) => this.createMetadataObject(path));
	}

	createMetadataObject(path) {
		const file = app.vault.getAbstractFileByPath(path);
		const meta = app.metadataCache.getFileCache(file)?.frontmatter || {};
		console.log("meta", meta);
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
