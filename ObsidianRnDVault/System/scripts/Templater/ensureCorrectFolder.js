module.exports = async (tp, targetFolder = false) => {
	if (tp.file.folder !== targetFolder) {
		await tp.file.move(`/${targetFolder}/${tp.file.title}`);
	}

	return title;
};
