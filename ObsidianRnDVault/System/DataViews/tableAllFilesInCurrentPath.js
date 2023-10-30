/**
 * You can call this with this:
 * await dv.view("System/DataViews/tableAllFilesInCurrentPath", { File: "file.link",	Template: "dependsOnTemplate", Script: "dependsOnScript", dvView: "dependsOnDvView"});
 * First args should be file.link
 *
 * @param {*} args
 */

async function tableAllFilesInCurrentPath(args) {

	const tableTitles = Object.keys(args);
	const propertiesToFetch = Object.values(args);

	const currentFile = dv.current().file;
	let currentFolder = currentFile.folder;

	if (currentFolder === "") {
		currentFolder = "/";
	}

	function setDisplay(link) {
		link.display = link.path.substring(link.path.lastIndexOf("/") + 1);
		displayEnd = link.display.substring(link.display.length - 3);
		if (displayEnd === ".md") {
			link.display = link.display.substring(0, link.display.length - 3);
		}
	}

	function processPropertyValue(link) {
		if (link == null) {
			return null;
		}

		// If the value is an array
		if (Array.isArray(link)) {
			link.flat().map((link) => setDisplay(link));
			return link;
		}

		// If the value is an object with a path property
		if (link?.path) {
			setDisplay(link);
			return link;
		}

		// Otherwise, return the value as-is
		return value;
	}

	const pages = await dv
		.pages(`"${currentFolder}"`)
		.filter((file) => file.file.path !== currentFile.path)
		.map((b) => {
			return propertiesToFetch.map((property) => {
				if (property === "file.link") {
					return b.file.link;
				}
				// Using reduce to access nested properties
				const value = property
					.split(".")
					.reduce((o, key) => (o && o[key] !== "undefined" ? o[key] : null), b);

				return processPropertyValue(value);
			});
		});
	// TODO:: Would be nice if the table was split and grouped by sub folder.
	dv.table(tableTitles, pages);
}
tableAllFilesInCurrentPath(input);
