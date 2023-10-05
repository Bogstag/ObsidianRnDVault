module.exports = async function (tp, fullPath) {
	// fullPath e.g. MyFolder/SubFolder/MyFile.md
	if (await tp.file.exists(fullPath)) {
		new tp.obsidian.Notice(
			"Note already exist, remove it before trying again."
		);
		return false;
	}

	return true;
};
