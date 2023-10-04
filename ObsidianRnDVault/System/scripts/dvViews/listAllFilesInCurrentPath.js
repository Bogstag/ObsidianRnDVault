let currentFile = dv.current().file;
let currentFolder = currentFile.folder;

if (currentFolder == "") currentFolder = "/";

const lsFolder = app.vault
	.getFiles()
	.filter((file) => file.path.includes(currentFile.folder))
	.filter((file) => file.path != currentFile.path)
	.map((file) =>
		dv.fileLink(
			file.path,
			false,
			file.path.replace(currentFile.folder + "/", "")
		)
	)
	.sort((a, b) =>
		a.display.toLowerCase().localeCompare(b.display.toLowerCase(), "sv")
	);

dv.list(lsFolder);
