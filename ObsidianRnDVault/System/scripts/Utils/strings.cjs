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
module.exports = function splitOnLastSlash(str) {
	const lastIndex = str.lastIndexOf("/");
	// If no slash is found, return the whole string as the second part
	if (lastIndex === -1) {
		return [null, str];
	}
	const firstPart = str.substring(0, lastIndex);
	const lastPart = str.substring(lastIndex + 1);
	return [firstPart, lastPart];
};
