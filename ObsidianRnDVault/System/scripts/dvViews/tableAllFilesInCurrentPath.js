/**
 * You can call this with this:
 * await dv.view("System/scripts/dvViews/tableAllFilesInCurrentPath", { File: "file.link",	Template: "dependsOnTemplate", Script: "dependsOnScript", dvView: "dependsOnDvView"});
 * First args should be file.link
 *
 * @param {*} args
 */

function tableAllFilesInCurrentPath(args) {
	//console.log("tableAllFilesInCurrentPath is called with", args);

	const tableTitles = Object.keys(args);
	const propertiesToFetch = Object.values(args);

	let currentFile = dv.current().file;
	let currentFolder = currentFile.folder;

	if (currentFolder == "") currentFolder = "/";

	function setDisplay(Link) {
		Link.display = Link.path.substring(Link.path.lastIndexOf("/") + 1);
		displayEnd = Link.display.substring(Link.display.length - 3);
		if (displayEnd == ".md") {
			Link.display = Link.display.substring(0, Link.display.length - 3);
		}
	}

	function processPropertyValue(Link) {
		if (Link == undefined) {
			return null;
		}

		// If the value is an array
		if (Array.isArray(Link)) {
			Link.flat().map((Link) => setDisplay(Link));
			return Link;
		}

		// If the value is an object with a path property
		else if (Link && Link.path) {
			setDisplay(Link);
			return Link;
		}

		// Otherwise, return the value as-is
		return value;
	}

	let pages = dv
		.pages('"' + currentFolder + '"')
		.filter((file) => file.file.path != currentFile.path)
		.map((b) => {
			return propertiesToFetch.map((property) => {
				if (property == "file.link") {
					return b.file.link;
				}
				// Using reduce to access nested properties
				const value = property
					.split(".")
					.reduce(
						(o, key) =>
							o && o[key] !== "undefined" ? o[key] : null,
						b,
					);

				return processPropertyValue(value);
			});
		});
	// TODO:: Would be nice if the table was split and grouped by sub folder.
	dv.table(tableTitles, pages);
}
tableAllFilesInCurrentPath(input);
