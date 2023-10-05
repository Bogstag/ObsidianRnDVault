function getTFolder(folder) {
	return app.vault.getAbstractFileByPath(folder);
}

module.exports = getTFolder;

