// Predicate Start
module.exports = function predicate() {
	/**
	 * Check if number is negative
	 *
	 * @example
	 * negative(-5); // true
	 * negative(0); // false
	 * negative(5); // false
	 *
	 * @param {number} x
	 * @return {boolean}
	 */
	function negative(x) {
		return x < 0;
	}
	predicate.negative = negative;

	/**
	 * Check if number is positive
	 *
	 * @example
	 * positive(-5); // false
	 * positive(0); // false
	 * positive(5); // true
	 *
	 * @param {number} x
	 * @return {boolean}
	 */
	function positive(x) {
		return x > 0;
	}
	predicate.positive = positive;

	/**
	 * Check if number something else then zero.
	 *
	 * @example
	 * nonzero(-5); // true
	 * nonzero(0); // false
	 * nonzero(5); // true
	 *
	 * @type {boolean}
	 */
	const nonzero = or(negative, positive);
	predicate.nonzero = nonzero;

	/**
	 * OR Predicate combinator. Is x, p1 OR p2?
	 *
	 * @example
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	 * data.filter(or(less(3), greater(6))); // [ 1, 2, 7, 8, 9 ]
	 *
	 * @param {function} p1 Predicate 1
	 * @param {function} p2 Predicate 2
	 * @return {boolean}
	 */
	function or(p1, p2) {
		return function (x) {
			return p1(x) || p2(x);
		};
	}
	predicate.or = or;

	/**
	 * AND Predicate combinator. Is x, p1 AND p2?
	 *
	 * @example
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	 * data.filter(and(less(6), greater(3))); // [ 4, 5 ]
	 *
	 * @param {function} p1 Predicate 1
	 * @param {function} p2 Predicate 2
	 * @return {boolean}
	 */
	function and(p1, p2) {
		return function (x) {
			return p1(x) && p2(x);
		};
	}
	predicate.and = and;

	/**
	 * NOT Predicate. Is x, NOT p?
	 *
	 * @example
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	 * data.filter(not(greater(3))); // [ 1, 2, 3 ]
	 *
	 * @param {function} p Predicate
	 * @return {boolean}
	 */
	function not(p) {
		return function (x) {
			return !p(x);
		};
	}
	predicate.not = not;

	/**
	 * less Predicate. Is x less then y?
	 *
	 * @example
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	 * data.filter(less(3)); // [ 1, 2 ]
	 *
	 * @param {number} x
	 * @return {boolean}
	 */
	function less(x) {
		return function (y) {
			return y < x;
		};
	}
	predicate.less = less;

	/**
	 * Greater Predicate. Is x greater then y?
	 *
	 * @example
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	 * data.filter(greater(3)); // [ 4, 5, 6, 7, 8, 9 ]
	 *
	 * @param {*} x
	 * @return {*}
	 */
	function greater(x) {
		return function (y) {
			return y > x;
		};
	}
	predicate.greater = greater;

	/**
	 * Example of how to combine predicates.
	 *
	 * @example
	 * inWeirdRange(3); // false
	 * inWeirdRange(7); // true
	 *
	 * @example
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	 * data.filter(inWeirdRange); // [ 1, 2, 7 ]
	 *
	 * @type {boolean}
	 */
	const inWeirdRange = or(less(3), and(greater(6), less(8)));
};
