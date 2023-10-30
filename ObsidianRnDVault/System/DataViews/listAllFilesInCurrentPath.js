// await dv.view("System/DataViews/listAllFilesInCurrentPath")
async function listAllFilesInCurrentPath(...args) {
	const currentFile = dv.current().file;
	let currentFolder = currentFile.folder;

	if (currentFolder === "") {
		currentFolder = "/";
	}

	const lsFolder = await app.vault
		.getFiles()
		.filter((file) => file.path.includes(currentFile.folder))
		.filter((file) => file.path !== currentFile.path)
		.map((file) =>
			dv.fileLink(
				file.path,
				false,
				file.path.replace(`${currentFile.folder}/`, ""),
			),
		)
		.sort((a, b) =>
			a.display.toLowerCase().localeCompare(b.display.toLowerCase(), "sv"),
		);
	// TODO:: Would be nice if the list was split and grouped by sub folder.
	dv.list(lsFolder);
}
listAllFilesInCurrentPath(input);
