/**
 * A class that represents a Note Manager.
 * Some code and inspiration from:
 * - [Obsidian-RunJS]{@link https://github.com/eoureo/obsidian-runjs} and [Obsidian-RunJS]{@link https://gist.github.com/eoureo/e5cb83afac9c9e39d7f909a3cae7ecf2}.
 * - [alan grainger]{@link https://github.com/alangrainger/obsidian-gtd}
 *
 * @class NoteManager
 *
 * @example
 * const tp = app.plugins.plugins["templater-obsidian"].templater.current_functions_object;
 * const NoteManager = new tp.user.NoteManager();
 */
class NoteManager {
	/**
	 * Creates an instance of NoteManager.
	 *
	 * @memberof NoteManager
	 */
	constructor() {
		this.tp =
			app.plugins.plugins[
				"templater-obsidian"
			].templater.current_functions_object;
		this.dv = app.plugins.plugins.dataview.api;
	}

	/**
	 * Appends text at the specified heading in a file.
	 *
	 * @param {App} app The Obsidian application instance.
	 * @param {string} filePath The file path.
	 * @param {string} heading The heading to append at.
	 * @param {string} text The text to append.
	 * @param {boolean} [deleteBlankLine=false] Whether to delete a blank line before the appended text.
	 * @returns {Promise<void>} A promise that resolves when the text has been appended.
	 * @memberof NoteManager
	 */
	async appendAtHeading(app, filePath, heading, text, deleteBlankLine) {
		await writeAtHeading(
			app,
			filePath,
			heading,
			text,
			"append",
			deleteBlankLine,
		);
	}

	/**
	 * Appends text to the end of a segment in an array.
	 *
	 * @param {string[]} lines The array of lines.
	 * @param {number} segmentEndIndex The end index of the segment.
	 * @param {string} text The text to append.
	 * @param {boolean} [removeEmptyLine=false] Whether to remove an empty line at the end of the segment.
	 * @memberof NoteManager
	 */
	appendTextToArraySegment(lines, segmentEndIndex, text, removeEmptyLine) {
		lines.splice(segmentEndIndex + 1, 0, text);
		if (removeEmptyLine && lines[segmentEndIndex] === "") {
			lines.splice(segmentEndIndex, 1);
		}
	}

	/**
	 * A function that appends text to a file.
	 *
	 * @param {App} app The instance of the Obsidian application.
	 * @param {string} filePath The file path.
	 * @param {string} text The text to append.
	 * @returns {Promise<void>} An asynchronous function that appends text to a file.
	 * @example
	 * const app = this.app; // new App();
	 * const filePath = "path/to/file.md";
	 * const text = "New text";
	 * await appendToFile(app, filePath, text);
	 * console.log("Text successfully appended.");
	 * @memberof NoteManager
	 */
	async appendToFile(app, filePath, text) {
		const tFile = app.vault.getAbstractFileByPath(filePath);
		//console.log("tFile:", tFile);
		if (tFile instanceof this.tp.obsidian.TFile) {
			app.vault.append(tFile, text);
		}
	}

	/**
	 * Calculates the end index of a segment in an array.
	 *
	 * @param {Object[]} array The array to calculate the segment end index in.
	 * @param {number} startIndex The start index of the segment.
	 * @param {function} comparisonFunction A function to determine the end of the segment.
	 * @returns {number} The calculated end index of the segment.
	 * @memberof NoteManager
	 */
	calculateSegmentEndIndex(array, startIndex, comparisonFunction) {
		let endIndex;
		for (let i = startIndex + 1; i < array.length; i++) {
			if (comparisonFunction(array[startIndex], array[i])) {
				endIndex = i - 1;
				break;
			}
		}
		return endIndex === undefined ? array.length : endIndex;
	}

	/**
	 * Checks if the path / folders for the note exists or not. If not, create the folders.
	 * @external TFolder
	 * @see external:TFolder {@link https://docs.obsidian.md/Reference/TypeScript+API/TFolder|Obsidian API TFolder}
	 *
	 * @param {string} path Full path to the note.
	 * @return {external:TFolder} Object with information about the folder.
	 * @memberof PeriodicNotesHelper
	 */
	async createFolderIfMissing(destinationFolder) {
		const path = destinationFolder || this.tp.file.folder(true);
		let tFolder = app.vault.getAbstractFileByPath(path);

		if (!tFolder) {
			console.info(`${path} folder missing.`);
			tFolder = await app.vault.createFolder(path);
			if (tFolder) {
				console.info(`Created ${tFolder.path}`);
			}
		}

		return tFolder;
	}

	/**
	 * Create a new file from a template, and return the link or open the file
	 * @param {string} templatePath Path to template
	 * @param {string} newNoteName Name of the new note
	 * @param {string} [destinationFolder] Path to the destination folder. Defaults to current folder
	 * @param {boolean} [openNewNote] Open the note in a new window, or return a link
	 * @returns {object} New note metadata. A summary of the metadata below.
	 * @returns {string} returns.noteName - The name of the note.
	 * @returns {boolean} returns.openNewNote - If the new note should be opened or not after it was created.
	 * @returns {TFile} returns.tFile - Object of type TFile from Obsidian API, containing details about the file. See {@link https://docs.obsidian.md/Reference/TypeScript+API/TFile}.
	 * @returns {TFolder} returns.tFolder - Object of type TFolder from Obsidian API, containing details about the folder. See {@link https://docs.obsidian.md/Reference/TypeScript+API/TFolder}.
	 * @returns {TFile} returns.template - Object of type TFile from Obsidian API, containing details about the template. See {@link https://docs.obsidian.md/Reference/TypeScript+API/TFile}.
	 * @memberof NoteManager
	 */
	async createFromTemplate(
		templatePath,
		newNoteName,
		destinationFolder,
		openNewNote,
	) {
		const template = await this.tp.file.find_tfile(templatePath);
		const tFolder = await this.createFolderIfMissing(destinationFolder);
		const validNoteName = await this.generateValidNoteName(newNoteName);

		const tFile = await this.tp.file.create_new(
			template,
			validNoteName,
			openNewNote,
			tFolder,
		);

		const noteMeta = {
			noteName: validNoteName,
			openNewNote: openNewNote,
			template: template,
			tFile: tFile,
			tFolder: tFolder,
		};

		return noteMeta;
	}

	/**
	 * Creates a markdown table from a 2D array.
	 * Keeps columns the same width even when they contain multibyte characters such.
	 *
	 * @example
	 * const array = [
	 *  ['Header 1', 'Header 2', 'Header 3'],
	 *  ['Data 1', 'Data 2', 'Column 3'],
	 *  ['Cell 4', 'Cell 5', 'Data 6']
	 * ];
	 * const markdownTable = createMarkdownTable(array);
	 * console.log(markdownTable);
	 *
	 * @param {Array<Array<any>>} array The input array representing the table data.
	 * @returns {string} The generated markdown table.
	 * @memberof NoteManager
	 */
	createMarkdownTable(array) {
		const columnWidths = [];

		// Calculate the maximum width of each column
		for (let i = 0; i < array[0].length; i++) {
			let maxWidth = 0;

			for (let j = 0; j < array.length; j++) {
				const cellLength = getStringLength(array[j][i]);
				maxWidth = Math.max(maxWidth, cellLength);
			}

			columnWidths.push(maxWidth);
		}

		let table = "";

		// create header
		for (let i = 0; i < array[0].length; i++) {
			table += `| ${padString(array[0][i], columnWidths[i])} `;
		}

		table += "|\n";

		// create header divider
		for (let i = 0; i < array[0].length; i++) {
			table += `| ${"-".repeat(columnWidths[i])} `;
		}

		table += "|\n";

		// create data row
		for (let i = 1; i < array.length; i++) {
			for (let j = 0; j < array[i].length; j++) {
				table += `| ${padString(array[i][j], columnWidths[j])} `;
			}

			table += "|\n";
		}

		return table;
	}

	/**
	 * Create a new file from a template, and return wikilink to new note.
	 * @param {string} templatePath Path to template
	 * @param {string} newNoteName Name of the new note
	 * @param {string} [destinationFolder] Path to the destination folder. Defaults to current folder
	 * @returns {string} wikilink to the new note
	 * @memberof NoteManager
	 */
	async createNewNoteInsertWikilink(
		templatePath,
		newNoteName,
		destinationFolder,
	) {
		const noteMeta = await this.createFromTemplate(
			templatePath,
			newNoteName,
			destinationFolder,
			false,
		);
		return `[[${noteMeta.tFile.path}|${noteMeta.noteName}]]`;
	}

	/**
	 * Create a new file from a template, and return wikilink to new note.
	 * @param {string} templatePath Path to template
	 * @param {string} newNoteName Name of the new note
	 * @param {string} [destinationFolder] Path to the destination folder. Defaults to current folder
	 * @returns {object} New note metadata
	 * @memberof NoteManager
	 */
	async createNewNoteOpenInSplit(templatePath, newNoteName, destinationFolder) {
		const noteMeta = await this.createFromTemplate(
			templatePath,
			newNoteName,
			destinationFolder,
			false,
		);

		// Create the new leaf
		const newLeaf = app.workspace.getLeaf("split");
		// Open file in new leaf
		await newLeaf.openFile(noteMeta.tFile);
		// Set the view to edit mode
		const view = newLeaf.getViewState();
		view.state.mode = "source";
		await newLeaf.setViewState(view);
		// Give focus to the new leaf
		app.workspace.setActiveLeaf(newLeaf, { focus: true });
		// Move the cursor to the end of the new note
		app.workspace.activeLeaf.view.editor?.setCursor({ line: 999, ch: 0 });

		return { ...noteMeta, newLeaf: newLeaf, view: view };
	}

	/**
	 * Checks if a file with the specified extension exists.
	 *
	 * @param {string} path - The file path, including file extension ".md".
	 * @return {Promise<boolean>} - True if the file exists, false otherwise.
	 */
	async noteExists(path) {
		return await this.tp.file.exists(path);
	}

	/**
	 * Generates a full file path by appending a Markdown extension to the note name and prefixing it with the folder path.
	 *
	 * @param {string} folder - The folder path where the file will be located.
	 * @param {string} noteName - The name of the file (without an extension).
	 * @param {string} [extension='.md'] - The file extension to check, defaults to '.md'.
	 * @returns {string} The full file path with the '.md' extension.
	 */
	generateFullPathWithExt(folder, noteName, extension = ".md") {
		let filePath = `${folder}/${noteName}`;

		// Append the extension if filePath is a string and doesn't end with the extension
		if (!noteName.endsWith(extension)) {
			filePath += extension;
		}

		return filePath;
	}

	// /**

	//  * Generates a random three-digit number as a string.
	//  *
	//  * This function creates a random integer between 0 and 999, inclusive,
	//  * and formats it to ensure it is always three digits long, with leading zeros if necessary.
	//  *
	//  * @returns {string} A string representing a randomly generated three-digit number.
	//  * @memberof NoteManager
	//  */
	// generateStringWithThreeRandomDigits() {
	// 	const randomNumber = Math.floor(Math.random() * 1000); // Generate a number between 0 and 999
	// 	const formattedNumber = String(randomNumber).padStart(3, "0"); // Format to 3 digits
	// 	return formattedNumber;
	// }

	/**
	 * Validate the note name. Validation by force, removes any invalid characters and file names.
	 *
	 * @param {string} noteName Name of the note.
	 * @return {string} A valid note name.
	 * @memberof NoteManager
	 */
	generateValidNoteName(noteName) {
		let validNoteName = "";
		validNoteName = this.substituteMomentPlaceholder(noteName);
		const rg1 = /[\:\*\?\"\<\>\|\/\\]+/g; // forbidden characters \ / : * ? " < > |
		const rg2 = /^\./; // cannot start with dot (.)
		const rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names

		validNoteName = validNoteName.replace(rg1, "");
		validNoteName = validNoteName.replace(rg2, "");
		validNoteName = validNoteName.replace(rg3, "");

		// validNoteName = this.getUniqueFileName(tFolder, validNoteName);

		return validNoteName;
	}

	/**
	 * Get the text contents of a file, specified by string path
	 * @param {string} [path] Optional path, otherwise use current file
	 * @memberof NoteManager
	 */
	getContents(path) {
		const file = app.vault.getAbstractFileByPath(
			path || this.tp.file.path(true),
		);
		return app.vault.read(file);
	}

	/**
	 * Get the text of the current line, or false if not in editing mode
	 * @returns {false|string} Text of current line or false.
	 * @memberof NoteManager
	 */
	getCurrentLine() {
		if (this.isEditMode()) {
			const lineNumber = this.view.editor.getCursor().line;
			return this.view.editor.getLine(lineNumber);
		}
		// Not in edit mode, current line is unknowable
		return false;
	}

	/**
	 * Retrieves the selected text in the editor.
	 *
	 * @param {App} app The instance of the Obsidian application.
	 * @returns {Promise<string>} A promise that resolves with the selected text, or an empty string if no selection is found.
	 * @memberof NoteManager
	 */
	async getSelection(app) {
		const view = app.workspace.getActiveFileView();
		const editor = view?.editor;
		if (editor) {
			const selection = editor.getSelection();

			if (selection) {
				return selection;
			} else {
				return "";
			}
		} else {
			new Notice("Error: No Editor.");
		}
	}

	/**
	 * Function to calculate the width of a string
	 *
	 * Calculates the length of a string considering ASCII characters to have a width of 1, and all other characters to have a width of 2.
	 * @param {string} str The input string.
	 * @returns {number} The length of the string.
	 * @memberof NoteManager
	 */
	getStringLength(str) {
		let length = 0;
		const newString = new String(str);

		for (let i = 0; i < newString.length; i++) {
			const codePoint = newString.codePointAt(i);

			// ASCII characters are in the range 0-127
			if (codePoint >= 0 && codePoint <= 127) {
				length += 1;
			} else {
				length += 2;
			}
		}

		return length;
	}

	// /**
	//  * Checks if a file exists in the specified folder and generates a new name if it does.
	//  *
	//  * @param {string} tFolder The folder path where the file is to be checked.
	//  * @param {string} validNoteName The name of the file to check.
	//  * @returns {string} Returns the original validNoteName if the file does not exist, otherwise returns a modified name (prefixed with 'new_').
	//  * @memberof NoteManager
	//  */
	// async getUniqueFileName(tFolder, validNoteName) {
	// 	const filePath = this.generateFullPathWithExt(tFolder, validNoteName);
	// 	const fileExists = await this.tp.file.exists(filePath);
	// 	if (fileExists) {
	// 		console.info(`${filePath} already exists`);
	// 		const randomNumber = this.generateStringWithThreeRandomDigits();
	// 		return `new_${randomNumber}_${validNoteName}`;
	// 	}
	// 	return validNoteName;
	// }

	/**
	 * Opens the file at the specified path in the target's workspace.
	 *
	 * @param {string} path The path of the file to open.
	 * @return {Promise} A Promise that resolves when the file is opened.
	 * @memberof NoteManager
	 */
	goToFile(path) {
		const file = app.vault.getAbstractFileByPath(path);
		if (path !== this.file.path) {
			app.workspace.getLeaf(false).openFile(file);
		}
	}

	/**
	 * Inserts text at the specified heading in a file.
	 *
	 * @param {App} app The Obsidian application instance.
	 * @param {string} filePath The file path.
	 * @param {string} heading The heading to insert at.
	 * @param {string} text The text to insert.
	 * @param {boolean} [deleteBlankLine=false] Whether to delete a blank line before the inserted text.
	 * @returns {Promise<void>} A promise that resolves when the text has been inserted.
	 * @memberof NoteManager
	 */
	async insertAtHeading(app, filePath, heading, text, deleteBlankLine) {
		await writeAtHeading(
			app,
			filePath,
			heading,
			text,
			"insert",
			deleteBlankLine,
		);
	}

	/**
	 * Inserts text into an array at a specified index.
	 *
	 * @param {string[]} lines The array of lines.
	 * @param {number} insertIndex The index to insert the text at.
	 * @param {string} text The text to insert.
	 * @param {boolean} [removeEmptyLine=false] Whether to remove an empty line at the insert index.
	 * @memberof NoteManager
	 */
	insertTextInArray(lines, insertIndex, text, removeEmptyLine = false) {
		if (removeEmptyLine && lines[insertIndex] === "") {
			lines.splice(insertIndex, 1);
		}
		lines.splice(insertIndex, 0, text);
	}

	/**
	 * Returns true if file is in editing mode
	 * @returns {boolean}
	 * @memberof NoteManager
	 */
	isEditMode() {
		const curr = app.workspace.activeLeaf.getViewState();
		return curr.state.mode === "source";
	}

	/**
	 * Pad a string to a given width
	 *
	 * @param {string} str The input string.
	 * @param {number} width The desired width.
	 * @returns {string} The padded string.
	 * @memberof NoteManager
	 */
	padString(str, width) {
		const diff = width - getStringLength(str.toString());
		if (diff > 0) {
			return `${str}${" ".repeat(diff)}`;
		}
		return str;
	}

	/**
	 * Replaces text at the specified heading in a file.
	 *
	 * @param {App} app The Obsidian application instance.
	 * @param {string} filePath The file path.
	 * @param {string} heading The heading to replace at.
	 * @param {string} text The text to replace.
	 * @param {boolean} [deleteBlankLine=false] Whether to delete a blank line before the replaced text.
	 * @returns {Promise<void>} A promise that resolves when the text has been replaced.
	 * @memberof NoteManager
	 */
	async replaceAtHeading(app, filePath, heading, text, deleteBlankLine) {
		await writeAtHeading(
			app,
			filePath,
			heading,
			text,
			"replace",
			deleteBlankLine,
		);
	}

	/**
	 * Replaces a segment of lines in an array with new text.
	 *
	 * @param {string[]} lines The array of lines.
	 * @param {number} startIndex The start index of the segment.
	 * @param {number} endIndex The end index of the segment.
	 * @param {string} text The text to replace the segment with.
	 * @memberof NoteManager
	 */
	replaceSegmentInArray(lines, startIndex, endIndex, text) {
		lines.splice(startIndex, endIndex - startIndex + 1, text);
	}

	/**
	 * Replaces the selected text in the editor with a new substring.
	 *
	 * @param {App} app The instance of the Obsidian application.
	 * @param {string} substr The substring or regular expression pattern to be replaced.
	 * @param {string|Function} substr_new The new substring or a function to generate the replacement.
	 * @returns {Promise<void>} A promise that resolves when the replacement is complete.
	 * @memberof NoteManager
	 */
	async replaceSelection(app, substr = "", substrNew = "") {
		if (substr === "" && substrNew === "") {
			return;
		}

		const view = app.workspace.getActiveFileView();
		const editor = view?.editor;
		if (editor) {
			const selection = editor.getSelection();

			if (selection) {
				editor.replaceSelection(selection.replace(substr, substrNew));
			} else {
				const tFile = app.workspace.getActiveFile();

				const content = await app.vault.read(tFile);
				const contentNew = content.replace(substr, substrNew);

				if (content !== contentNew) {
					app.vault.modify(tFile, contentNew);
				}
			}
		} else {
			new Notice("Error: No Editor.");
		}
	}

	/**
	 * Replace the contents of a file
	 * @param {string} contents The new file contents
	 * @param {string} [path] Optional path, otherwise use current file
	 * @returns {*} I do not know TODO:: Figure it out!
	 * @memberof NoteManager
	 */
	setContents(contents, path) {
		const file = app.vault.getAbstractFileByPath(
			path || this.tp.file.path(true),
		);
		return app.vault.modify(file, contents);
	}

	/**
	 * set the text of the current line, if in editing mode
	 * @param {string} newLineContent Text to be inserted
	 * @returns {boolean}
	 * @memberof NoteManager
	 */
	setCurrentLine(newLineContent) {
		if (this.isEditMode()) {
			const lineNumber = this.view.editor.getCursor().line;
			this.view.editor.setLine(lineNumber, newLineContent);
			// move cursor to end of line
			this.view.editor.setCursor({
				line: lineNumber,
				ch: newLineContent.length,
			});

			return true;
		}
		// Not in edit mode, current line is unknowable
		return false;
	}

	/**
	 * Set file to edit or read mode
	 * @param {boolean} canEdit
	 * @memberof NoteManager
	 */
	setEditMode(canEdit) {
		const curr = app.workspace.activeLeaf.getViewState();
		curr.state.mode = canEdit ? "source" : "preview";
		app.workspace.activeLeaf.setViewState(curr);
		if (canEdit) {
			this.view.editor?.focus();
		}
	}

	/**
	 * Sets the selected text in the editor to the specified text.
	 *
	 * @param {App} app The instance of the Obsidian application.
	 * @param {string} text The text to set as the selection.
	 * @returns {Promise<void>} A promise that resolves when the selection is set.
	 * @memberof NoteManager
	 */
	async setSelection(app, text) {
		const view = app.workspace.getActiveFileView();
		const editor = view?.editor;
		if (editor) {
			editor.replaceSelection(text);
		} else {
			new Notice("Error: No Editor.");
		}
	}

	/**
	 * Replace one or more moment placeholder with real date.
	 * MOMENT(YYYY-MM-DD) get replaced with result of:
	 * moment().format("YYYY-MM-DD")
	 * This means that no note name can contain this string: moment().
	 *
	 * @param {string} noteName
	 * @return {string} A note name with real date instead of placeholder.
	 * @memberof NoteManager
	 */
	substituteMomentPlaceholder(noteName) {
		if (!noteName) {
			return;
		}
		return noteName.replace(/MOMENT\((.*?)\)/g, (match, format) => {
			// Replace each 'MOMENT(format)' with the formatted date
			return moment().format(format);
		});
	}

	/**
	 * Writes (append, insert, replace) text at the specified heading in a file.
	 *
	 * @param {string} filePath The file path.
	 * @param {string} heading The heading to write at.
	 * @param {string} text The text to write.
	 * @param {string} [where="append"] The position to write: "append", "insert", or "replace".
	 * @param {boolean} [deleteBlankLine=false] Whether to delete a blank line before the inserted text.
	 * @returns {Promise<void>} A promise that resolves when the text has been written.
	 * @memberof NoteManager
	 */
	async writeAtHeading(
		filePath,
		heading,
		text,
		where = "append",
		deleteBlankLine = false,
	) {
		const tFile = app.vault.getAbstractFileByPath(filePath);

		if (tFile instanceof this.tp.obsidian.TFile) {
			const fileCache = app.metadataCache.getFileCache(tFile);

			for (let hI = 0; hI < fileCache.headings.length; hI++) {
				const cacheHeading = fileCache.headings[hI];
				if (cacheHeading.heading === heading) {
					const lines = (await app.vault.read(tFile)).split("\n");
					const startLine = cacheHeading.position.start.line + 1;
					const endLine = this.calculateSegmentEndIndex(
						fileCache.headings,
						hI,
						(start, next) => start.level >= next.level,
					);

					switch (where) {
						case "insert": {
							this.insertTextInArray(lines, startLine, text, deleteBlankLine);
							break;
						}
						case "replace": {
							this.replaceSegmentInArray(lines, startLine, endLine, text);
							break;
						}
						//case "append":
						default: {
							this.appendTextToArraySegment(
								lines,
								startLine,
								endLine,
								text,
								deleteBlankLine,
							);
							break;
						}
					}

					await app.vault.modify(tFile, lines.join("\n"));
					break; // Exit the loop once the heading is processed
				}
			}
		}
	}
}
module.exports = NoteManager;
