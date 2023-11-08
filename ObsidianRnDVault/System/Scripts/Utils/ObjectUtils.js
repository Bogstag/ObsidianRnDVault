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

	/**
	 * Returns a new object with unique values.
	 * @param {Object} obj - The object to deduplicate values.
	 * @returns {Object} A new object containing only unique values.
	 * @example
	 * let obj = { a: 1, b: 2, c: 1 };
	 * let uniqueObj = ObjectUtils.uniqueValues(obj); // { a: 1, b: 2 }
	 */
	static uniqueValues(obj) {
		const unique = new Set();
		const uniqueObj = {};
		for (const [key, value] of Object.entries(obj)) {
			if (!unique.has(value)) {
				unique.add(value);
				uniqueObj[key] = value;
			}
		}
		return uniqueObj;
	}

	/**
	 * Removes keys from an object.
	 * @param {Object} obj - The object to process.
	 * @param {string|string[]} keys - The key or keys to remove.
	 * @returns {Object} A new object with the specified keys removed.
	 * @example
	 * let obj = { a: 1, b: 2, c: 3 };
	 * let newObj = ObjectUtils.removeKeys(obj, ['a', 'b']); // { c: 3 }
	 */
	static removeKeys(obj, keys) {
		const keysToRemove = Array.isArray(keys) ? keys : [keys];
		const newObj = { ...obj };
		for (const key of keysToRemove) {
			delete newObj[key];
		}
		return newObj;
	}

	/**
	 * Filters an object based on a predicate function.
	 * @param {Object} obj - The object to filter.
	 * @param {Function} predicate - The function called per iteration.
	 * @returns {Object} A new object with key-value pairs that meet the condition.
	 * @example
	 * let obj = { a: 1, b: 2, c: 3 };
	 * let filteredObj = ObjectUtils.filter(obj, ([key, value]) => value > 1); // { b: 2, c: 3 }
	 */
	static filter(obj, predicate) {
		const filteredObj = {};
		for (const [key, value] of Object.entries(obj)) {
			if (predicate([key, value])) {
				filteredObj[key] = value;
			}
		}
		return filteredObj;
	}

	/**
	 * Maps an object to another with the same keys but transformed values.
	 * @param {Object} obj - The object to map.
	 * @param {Function} transform - The function to transform each value.
	 * @returns {Object} A new object with the same keys but transformed values.
	 * @example
	 * let obj = { a: 1, b: 2, c: 3 };
	 * let mappedObj = ObjectUtils.mapValues(obj, value => value * 2); // { a: 2, b: 4, c: 6 }
	 */
	static mapValues(obj, transform) {
		const mappedObj = {};
		for (const [key, value] of Object.entries(obj)) {
			mappedObj[key] = transform(value);
		}
		return mappedObj;
	}
}
module.exports = ObjectUtils;
