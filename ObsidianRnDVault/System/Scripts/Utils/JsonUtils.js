/**
 * Utils for Json
 *
 * @class JsonUtils
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const JsonUtils = tp.user.JsonUtils;
 * JsonUtils.removeOneByValue(arr, value);
 */
class JsonUtils {
	constructor() {
		throw new Error("Cannot instantiate a utility class.");
	}
	/**
	 * Removes properties with object values from a JSON object.
	 * @param {Object} jsonObj - The JSON object to process.
	 * @returns {Object} A new JSON object with no object properties.
	 * @example
	 * let jsonObj = { a: 1, b: { c: 2 }, d: 3 };
	 * let cleanedObj = JsonUtils.removeObjects(jsonObj); // { a: 1, d: 3 }
	 */
	static removeObjects(jsonObj) {
		const result = {};
		for (const [key, value] of Object.entries(jsonObj)) {
			if (typeof value !== "object" || value === null) {
				result[key] = value;
			}
		}
		return result;
	}

	/**
	 * Removes a specified branch from a JSON object.
	 * @param {Object} jsonObj - The JSON object to process.
	 * @param {string} branchName - The branch name to remove.
	 * @returns {Object} The JSON object without the specified branch.
	 * @example
	 * let jsonObj = { a: 1, b: { c: 2 }, d: 3 };
	 * let prunedObj = JsonUtils.pruneBranch(jsonObj, 'b'); // { a: 1, d: 3 }
	 */
	static pruneBranch(jsonObj, branchName) {
		if (Object.prototype.hasOwnProperty.call(jsonObj, branchName)) {
			const { [branchName]: _, ...rest } = jsonObj;
			return rest;
		}
		return { ...jsonObj };
	}

	/**
	 * Sorts a JSON object by its keys or values.
	 * @param {Object} jsonObj - The JSON object to sort.
	 * @param {string} sortBy - The criteria to sort by ('key' or 'value').
	 * @param {string} [order='asc'] - The order to sort by ('asc' or 'desc').
	 * @returns {Object} The sorted JSON object.
	 * @example
	 * let jsonObj = { a: 3, c: 1, b: 2 };
	 * let sortedByKey = JsonUtils.sortJSON(jsonObj, 'key'); // { a: 3, b: 2, c: 1 }
	 * let sortedByValue = JsonUtils.sortJSON(jsonObj, 'value'); // { c: 1, b: 2, a: 3 }
	 */
	static sortJson(jsonObj, sortBy, order = "asc") {
		const entries = Object.entries(jsonObj);
		const compareFunction = (a, b) => {
			let comparison = 0;
			if (sortBy === "value") {
				comparison = a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
			} else {
				comparison = a[0].localeCompare(b[0]);
			}
			return order === "asc" ? comparison : comparison * -1;
		};
		const sortedEntries = entries.sort(compareFunction);
		return Object.fromEntries(sortedEntries);
	}

	/**
	 * Reorders a JSON object based on a new key order provided.
	 * @param {Object} jsonObj - The JSON object to reorder.
	 * @param {string[]} newOrder - An array of keys representing the new order.
	 * @returns {Object} The reordered JSON object.
	 * @example
	 * let jsonObj = { a: 1, b: 2, c: 3 };
	 * let newOrder = ['c', 'a', 'b'];
	 * let reorderedObj = JsonUtils.reorderKeys(jsonObj, newOrder); // { c: 3, a: 1, b: 2 }
	 */
	static reorderKeys(jsonObj, newOrder) {
		const newObj = {};
		for (const key of newOrder) {
			if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
				newObj[key] = jsonObj[key];
			}
		}
		return newObj;
	}

	/**
	 * Merges multiple JSON objects into one.
	 * @param {...Object} jsonObjs - The JSON objects to merge.
	 * @returns {Object} The merged JSON object.
	 * @example
	 * let jsonObj1 = { a: 1 };
	 * let jsonObj2 = { b: 2 };
	 * let mergedObj = JsonUtils.mergeJSON(jsonObj1, jsonObj2); // { a: 1, b: 2 }
	 */
	static mergeJson(...jsonObjs) {
		return Object.assign({}, ...jsonObjs);
	}
}
module.exports = JsonUtils;
