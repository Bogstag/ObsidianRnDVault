/**
 * @class NoteCreator
 *
 * @classdesc A class that represents a Note Creator.
 */
class NoteCreator {
	/**
	 * Attaches functions to target.
	 *
	 * @param {ThisParameterType} target
	 * @memberof NoteCreator
	 */
	attachFunctions(target) {
		/**
		 * Create a new file from a template, and return the link or open the file
		 * @param {string} templatePath
		 * @param {string} newNoteName
		 * @param {string} destinationFolder - Path to the destination folder. Defaults to current folder
		 * @param {boolean} openNewNote - Open the note in a new window, or return a link
		 * @returns wikilink to the new note
		 */
		target.createFromTemplate = async (
			templatePath,
			newNoteName,
			destinationFolder,
			openNewNote,
		) => {
			await target.tp.file.create_new(
				target.tp.file.find_tfile(templatePath),
				newNoteName,
				openNewNote,
				app.vault.getAbstractFileByPath(
					destinationFolder || target.tp.file.folder(true),
				),
			);
			return openNewNote ? "" : `[[${newNoteName}]]`;
		};

		/**
		 * Returns true if file is in editing mode
		 * @returns {boolean}
		 */
		target.isEditMode = () => {
			const curr = app.workspace.activeLeaf.getViewState();
			return curr.state.mode === "source";
		};

		/**
		 * Set file to edit or read mode
		 * @param {boolean} canEdit
		 */
		target.setEditMode = (canEdit) => {
			const curr = app.workspace.activeLeaf.getViewState();
			curr.state.mode = canEdit ? "source" : "preview";
			app.workspace.activeLeaf.setViewState(curr);
			if (canEdit) {
				target.view.editor?.focus();
			}
		};

		/**
		 * Get the text contents of a file, specified by string path
		 * @param {string} [path] Optional path, otherwise use current file
		 */
		target.getContents = async (path) => {
			const file = app.vault.getAbstractFileByPath(
				path || target.tp.file.path(true),
			);
			return app.vault.read(file);
		};

		/**
		 * Replace the contents of a file
		 * @param {string} contents The new file contents
		 * @param {string} [path] Optional path, otherwise use current file
		 * @returns {*} I do not know TODO:: Figure it out!
		 */
		target.setContents = async (contents, path) => {
			const file = app.vault.getAbstractFileByPath(
				path || target.tp.file.path(true),
			);
			return app.vault.modify(file, contents);
		};

		/**
		 * Get the text of the current line, or false if not in editing mode
		 * @returns {false|string} Text of current line or false.
		 */
		target.getCurrentLine = () => {
			if (target.isEditMode()) {
				const lineNumber = target.view.editor.getCursor().line;
				return target.view.editor.getLine(lineNumber);
			}
			// Not in edit mode, current line is unknowable
			return false;
		};

		/**
		 * set the text of the current line, if in editing mode
		 * @param {string}
		 * @returns {boolean}
		 */
		target.setCurrentLine = (newLineContent) => {
			if (target.isEditMode()) {
				const lineNumber = target.view.editor.getCursor().line;
				target.view.editor.setLine(lineNumber, newLineContent);
				// move cursor to end of line
				target.view.editor.setCursor({
					line: lineNumber,
					ch: newLineContent.length,
				});

				return true;
			}
			// Not in edit mode, current line is unknowable
			return false;
		};

		/**
		 * Opens the file at the specified path in the target's workspace.
		 *
		 * @param {string} path - The path of the file to open.
		 * @return {Promise} A Promise that resolves when the file is opened.
		 */
		target.goToFile = async (path) => {
			const file = app.vault.getAbstractFileByPath(path);
			if (path !== target.file.path) {
				await app.workspace.getLeaf(false).openFile(file);
			}
		};
	}
}
module.exports = NoteCreator;
