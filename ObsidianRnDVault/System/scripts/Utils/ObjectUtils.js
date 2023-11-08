/**
 * Utils for objects
 *
 * @class ObjectUtils
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const ObjectUtils = tp.user.ObjectUtils;
 * ObjectUtils.sortObjectKeys(obj);
 */
class ObjectUtils {
	constructor() {
		throw new Error("Cannot instantiate a utility class.");
	}

	/**
	 * Sort the first level of an object.
	 * 
	 * @static
	 * @param {Object} obj The object to sort.
	 * @returns {Object} Sorted object.
	 * @memberof ObjectUtils
	 */
	static sortObjectKeys(obj) {
		return Object.keys(obj)
			.sort()
			.reduce((acc, key) => {
				acc[key] = obj[key];
				return acc;
			}, {});
	}

	/**
	 * Recursively sort all levels of an object.
	 * 
	 * @static
	 * @param {Object} obj The object to sort.
	 * @returns {Object} Sorted object.
	 * @memberof ObjectUtils
	 */
	static sortObject(obj) {
		if (typeof obj !== "object" || obj === null) {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.map(this.sortObject);
		}

		return Object.keys(obj)
			.sort()
			.reduce((acc, key) => {
				acc[key] = this.sortObject(obj[key]);
				return acc;
			}, {});
	}
}
module.exports = ObjectUtils;
