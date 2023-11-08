/**
 * Utils for strings
 *
 * @class StringUtils
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const StringUtils = tp.user.StringUtils;
 * StringUtils.toUpperCase("string")
 */
class StringUtils {
	constructor() {
		throw new Error("Cannot instantiate a utility class.");
	}

	/**
	 * Split string on the last slash.
	 * If no slash is found, return the whole string as the second part
	 *
	 * @static
	 * @param {string} str
	 * @return {(number|Array)} first and second part of the string.
	 * @memberof StringUtils
	 */
	static splitOnLastSlash(str) {
		const lastIndex = str.lastIndexOf("/");
		if (lastIndex === -1) {
			return [null, str];
		}
		const firstPart = str.substring(0, lastIndex);
		const secondPart = str.substring(lastIndex + 1);
		return [firstPart, secondPart];
	}

	static toUpperCase(str) {
		return str.toUpperCase();
	}

	static toLowerCase(str) {
		return str.toLowerCase();
	}
}
module.exports = StringUtils;
