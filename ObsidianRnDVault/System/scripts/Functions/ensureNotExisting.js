// Not really needed use only:
// const exists = await tp.file.exists(fullPath);
module.exports = async function (tp, fullPath) {
	// fullPath e.g. MyFolder/SubFolder/MyFile.md
	const exists = await tp.file.exists(fullPath);
	if (exists) {
		new tp.obsidian.Notice(
			"Note already exist, remove it before trying again.",
		);
		await this.app.workspace.activeLeaf.openFile(
			this.app.vault.getAbstractFileByPath(fullPath),
		);
		return false;
	}

	return true;
};
