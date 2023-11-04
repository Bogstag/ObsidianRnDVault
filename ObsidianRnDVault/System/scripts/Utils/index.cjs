/*
 * String module.
 * @module Utils/index
 * @see module:Utils/index
 *
 * @type {functions}
 */
const strings = require(`${app.vault.adapter.basePath}\\System\\Scripts\\Utils\\strings.cjs`);

/**
 * Function that collects all utils so its usable in unison.
 * And then sends it out in the world.
 *
 * @return {functions} Usefull utility functions
 */
module.exports = function useUtils() {
	return { ...strings };
};
