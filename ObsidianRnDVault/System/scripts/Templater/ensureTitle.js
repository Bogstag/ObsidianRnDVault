module.exports = async (tp, newTitle = false) => {
	let title = tp.file.title;

	if (newTitle) {
		if (title == newTitle) {
			return title;
		}

		await tp.file.rename(newTitle);
		return newTitle;
	}

	if (title.toLowerCase().includes("untitled")) {
		title = await tp.system.prompt("Title", title);
	}

	if (title.length == 0) {
		// Assume everything has been breaking bad
		title = `unknown (${tp.date.now("YYYY-MM-DD")})`;
	}

	await tp.file.rename(title);

	return title;
};
