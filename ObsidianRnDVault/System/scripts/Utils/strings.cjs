/**
 * String module.
 * @module Utils/strings
 * @see module:Utils/strings
 */

/**
 * Takes a string (usually a path).
 * Split the string based on last forward slash.
 *
 * @example
 * const str = "/System/Folder/markdown.md"
 * firstPart = "/System/Folder"
 * lastPart = "markdown.md"
 *
 * @param {string} str path or something else with forwardslashes.
 * @return {Array} [firstPart, lastPart] See example.
 */
module.exports.splitOnLastSlash = (str) => {
	const lastIndex = str.lastIndexOf("/");
	// If no slash is found, return the whole string as the second part
	if (lastIndex === -1) {
		return [null, str];
	}
	const firstPart = str.substring(0, lastIndex);
	const secondPart = str.substring(lastIndex + 1);
	return [firstPart, secondPart];
};
module.exports.uppercase = (str) => str.toUpperCase();
