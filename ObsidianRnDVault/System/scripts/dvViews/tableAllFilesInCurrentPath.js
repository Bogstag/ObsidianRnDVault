/**
 * You can call this with this:
 * await dv.view("System/scripts/dvViews/tableAllFilesInCurrentPath", { File: "file.link",	Template: "dependsOnTemplate", Script: "dependsOnScript", dvView: "dependsOnDvView"});
 * First args should be file.link
 *
 * @param {*} args
 */

function tableAllFilesInCurrentPath(args) {
	console.log("foo is called with args", args);
	const tableTitles = Object.keys(args);
	const propertiesToFetch = Object.values(args);

	let currentFile = dv.current().file;
	let currentFolder = currentFile.folder;

	if (currentFolder == "") currentFolder = "/";

	function processPropertyValue(value) {
		// If the value is an array
		if (Array.isArray(value)) {
			return value
				.flat()
				.map((script) => script.substring(script.lastIndexOf("/") + 1));
		}
		// If the value is an object with a path property
		else if (value && value.path) {
			return value.path;
		}
		// Otherwise, return the value as-is

		return value;
	}

	let pages = dv.pages('"' + currentFolder + '"').map((b) => {
		return propertiesToFetch.map((property) => {
			if (property == "file.link") {
				return b.file.link;
			}
			// Using reduce to access nested properties
			const value = property
				.split(".")
				.reduce((o, key) => (o && o[key] !== "undefined" ? o[key] : null), b);
			return processPropertyValue(value);
		});
	});

	dv.table(tableTitles, pages);
}
tableAllFilesInCurrentPath(input);
