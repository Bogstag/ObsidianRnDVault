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

	static removeByKeyValuePair(array, key, value) {
		return array.filter((object) => object[key] !== value);
	}
}
module.exports = ArrayUtils;
