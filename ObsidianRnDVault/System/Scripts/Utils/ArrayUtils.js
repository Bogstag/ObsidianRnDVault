/**
 * Utils for arrays
 *
 * @class ArrayUtils
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const ArrayUtils = tp.user.ArrayUtils;
 * ArrayUtils.removeOneByValue(arr, value);
 */
class ArrayUtils {
	constructor() {
		throw new Error("Cannot instantiate a utility class.");
	}

	/**
	 * Removes one item from array matching value.
	 *
	 * @example
	 * removeOneByValue([1,2,3], 2) => [1,3]
	 *
	 * @static
	 * @param {Array} arr
	 * @param {*} value
	 * @return {Array}
	 * @memberof ArrayUtils
	 */
	static removeOneByValue(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	static filterObjectsByValue() {
		myArray = myArray.filter(function (obj) {
			return obj.id !== id;
		});
	}

	static removeAllByValue() {
		return arr.filter((item) => item !== value);
	}

	static removeAllByValue2(arr, value) {
		let i = 0;
		while (i < arr.length) {
			if (arr[i] === value) {
				arr.splice(i, 1);
			} else {
				++i;
			}
		}
		return arr;
	}

	/**
	 * Returns a new array with unique values.
	 * @param {Array} array - The array to deduplicate.
	 * @returns {Array} A new array containing only unique values from the input array.
	 * @example
	 * let arr = [1, 2, 2, 3];
	 * let uniqueArr = ArrayUtils.unique(arr); // [1, 2, 3]
	 */
	static unique(array) {
		return [...new Set(array)];
	}

	/**
	 * Flattens an array of arrays into a single array.
	 * @param {Array<Array>} array - The array of arrays to flatten.
	 * @returns {Array} A new, flat array.
	 * @example
	 * let nestedArr = [[1, 2], [3, 4]];
	 * let flatArr = ArrayUtils.flatten(nestedArr); // [1, 2, 3, 4]
	 */
	static flatten(array) {
		return array.reduce((acc, val) => acc.concat(val), []);
	}

	/**
	 * Splits an array into chunks of a specified size.
	 * @param {Array} array - The array to split.
	 * @param {number} size - The size of every chunk.
	 * @returns {Array<Array>} A new array containing chunks of the original array.
	 * @example
	 * let arr = [1, 2, 3, 4, 5];
	 * let chunkedArr = ArrayUtils.chunk(arr, 2); // [[1, 2], [3, 4], [5]]
	 */
	static chunk(array, size) {
		const chunkedArr = [];
		for (let i = 0; i < array.length; i += size) {
			chunkedArr.push(array.slice(i, i + size));
		}
		return chunkedArr;
	}

	/**
	 * Randomly shuffles the elements of an array.
	 * @param {Array} array - The array to shuffle.
	 * @returns {Array} The shuffled array.
	 * @example
	 * let arr = [1, 2, 3, 4, 5];
	 * let shuffledArr = ArrayUtils.shuffle(arr); // arr is shuffled
	 */
	static shuffle(array) {
		let currentIndex = array.length;
		let randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}
		return array;
	}

	/**
	 * Removes elements from an array that meet a certain condition.
	 * @param {Array} array - The array to filter.
	 * @param {Function} predicate - The function called per iteration.
	 * @returns {Array} A new array with the elements that do not meet the condition.
	 * @example
	 * let arr = [1, 2, 3, 4, 5];
	 * let filteredArr = ArrayUtils.remove(arr, (x) => x % 2 === 0); // [1, 3, 5]
	 */
	static remove(array, predicate) {
		return array.filter((element) => !predicate(element));
	}

	/**
	 * Removes all elements from an array of objects that have a specific key-value pair.
	 * @param {Array<Object>} array - The array of objects to filter.
	 * @param {string} key - The key to check against.
	 * @param {*} value - The value to check against.
	 * @returns {Array<Object>} A new array with objects that do not have the key-value pair.
	 * @example
	 * let arr = [{a: 1}, {a: 2}, {b: 1}];
	 * let newArr = ArrayUtils.removeByKeyValuePair(arr, 'a', 1); // [{a: 2}, {b: 1}]
	 */
	static removeByKeyValuePair(array, key, value) {
		return array.filter((object) => object[key] !== value);
	}

	/**
	 * Removes one or more keys from all objects in an array.
	 * @param {Array<Object>} array - The array of objects to process.
	 * @param {string|string[]} keys - The key or keys to remove from each object.
	 * @returns {Array<Object>} A new array of objects with the specified keys removed.
	 * @example
	 * let arr = [{a: 1, b: 2}, {a: 3, b: 4}];
	 * let newArr = ArrayUtils.removeKeys(arr, 'a'); // [{b: 2}, {b: 4}]
	 */
	static removeKeys(array, keys) {
		const keysToRemove = Array.isArray(keys) ? keys : [keys];
		return array.map((object) => {
			const newObj = { ...object };
			for (const key of keysToRemove) {
				delete newObj[key];
			}
			return newObj;
		});
	}

	/**
	 * Sorts an array of objects by a specific key in ascending or descending order.
	 * @param {Array<Object>} array - The array to sort.
	 * @param {string} key - The key to sort by.
	 * @param {string} [order="asc"] - The order to sort by (asc or desc).
	 * @returns {Array<Object>} The sorted array.
	 * @example
	 * let arr = [{a: 2}, {a: 1}, {a: 3}];
	 * let sortedArrAsc = ArrayUtils.sortByKey(arr, 'a'); // [{a: 1}, {a: 2}, {a: 3}]
	 * let sortedArrDesc = ArrayUtils.sortByKey(arr, 'a', 'desc'); // [{a: 3}, {a: 2}, {a: 1}]
	 */
	static sortByKey(array, key, order = "asc") {
		// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
		return array.sort((a, b) => {
			let valueA = a[key];
			let valueB = b[key];

			if (valueA === undefined) {
				valueA =
					order === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
			}
			if (valueB === undefined) {
				valueB =
					order === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
			}

			if (Number.isNaN(Number(valueA)) || Number.isNaN(Number(valueB))) {
				// For non-numerical values
				valueA = String(valueA);
				valueB = String(valueB);
				return order === "asc"
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			} else {
				// For numerical values
				return order === "asc" ? valueA - valueB : valueB - valueA;
			}
		});
	}
}
module.exports = ArrayUtils;
