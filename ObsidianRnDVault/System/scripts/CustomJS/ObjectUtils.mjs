class ObjectUtils {
	/**
	 * @description Sort the first level of an object.
	 * @param {Object} obj The object to sort.
	 * @returns {Object} Sorted object.
	 * @memberof Utils
	 */
	sortObjectKeys(obj) {
		return Object.keys(obj)
			.sort()
			.reduce((acc, key) => {
				acc[key] = obj[key];
				return acc;
			}, {});
	}

	/**
	 * @description Recursively sort all levels of an object.
	 * @param {Object} obj The object to sort.
	 * @returns {Object} Sorted object.
	 * @memberof Utils
	 */
	sortObject(obj) {
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
