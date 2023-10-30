/**
 * Navbar class for creating navigation bars in Obsidian.
 * This class provides utility methods for creating a navigation bar based on tags or folder paths.
 * It also allows to filter the pages to be shown in the navigation bar.
 */
class Navbar {
	/**
	 * Create a navigation item based on the given page.
	 * @param {{ file: { frontmatter: { navbar_name?: string }, name: string, path: string }}} page - The page object from DataView.
	 * @param {string} currentPagePath - The path of the current page.
	 * @return {string} - The navigation item as a Markdown link.
	 */
	createNavItem(page, currentPagePath) {
		const displayName = page.file.frontmatter.navbar_name ?? page.file.name;
		const link = `[[${page.file.link.path}|${displayName}]]`;

		return currentPagePath === page.file.path ? `**${link}**` : link;
	}

	/**
	 * Create a navigation bar based on tags.
	 * This method fetches all pages that match a given tag and includes them in a navigation bar.
	 * @param {Object} dv - The DataView instance.
	 * @param {string} query - The query to filter tags by.
	 * @param {boolean} isFolder - If it is a tag or folder search.
	 * @param {number} minlevel - The minimum level of tag hierarchy to consider.
	 * @param {number} maxlevel - The maximum level of tag hierarchy to consider.
	 * @param {Object} notes - Pagelist with filtred notes to process
	 * @return {Promise<void>} - A promise that resolves when the navigation bar is created.
	 */
	createNavbarByTag(dv, query, isFolder, minlevel, maxlevel, notes) {
		let dashboardCategory = "dashboard";
		let minLevel = minlevel;
		let maxLevel = maxlevel;

		if (query.startsWith("#system/dashboard")) {
			dashboardCategory = "system";
			minLevel += 1;
			maxLevel += 1;
		}

		return notes.filter((page) => {
			if (!page.file.frontmatter.tags) {
				return false;
			}
			const fm = page.file.frontmatter;

			if (fm?.tags) {
				return fm.tags.some((t) => {
					const s = t.split("/");
					return (
						t.startsWith(dashboardCategory) &&
						minLevel < s.length &&
						maxLevel <= s.length
					);
				});
			}
			return false;
		});
	}

	/**
	 * Create a navigation bar based on folder paths.
	 * This method fetches all pages that are within a given folder and includes them in a navigation bar.
	 * @param {Object} dv - The DataView instance.
	 * @param {string} query - The query to filter folders by.
	 * @param {string} isFolder - The folder path to filter pages by.
	 * @param {number} minLevel - The minimum folder level to consider.
	 * @param {number} maxLevel - The maximum folder level to consider.
	 * @param
	 * @return {Promise<void>} - A promise that resolves when the navigation bar is created.
	 */
	createNavbarByFolder(dv, query, isFolder, minLevel, maxLevel, notes) {
		return notes.filter((page) => {
			return true; // Replace with actual condition
		});
	}

	/**
	 * Common filtering function to fetch and filter pages based on various parameters.
	 *
	 * @param {Object} dv - DataView instance to use for fetching pages.
	 * @param {boolean} [query=false] - Whether to perform a DataView query to filter pages.
	 * @param {boolean} [isFolder=false] - Whether to consider folder paths in the filtering.
	 * @param {number} [minLevel=0] - Minimum hierarchical level to include in the result.
	 * @param {number} [maxLevel=1] - Maximum hierarchical level to include in the result.
	 * @return {Array} - Array of filtered pages.
	 * @memberof Navbar
	 */
	getDashboard(
		dv,
		query = false,
		isFolder = false,
		minLevel = 0,
		maxLevel = 1,
	) {
		if (minLevel >= maxLevel) {
			new Notice("minLevel should be lower to maxLevel, not more or equal.");
		}

		if (maxLevel - minLevel < 1) {
			new Notice("It must be one level between min and max level.");
		}

		const notes = dv.pages(query);

		const filteredNotes = notes.filter((page) => {
			let filter = page.file.frontmatter.include_in_navbar === true;

			if (minLevel === 0) {
				filter = filter && page.file.name === page.file.folder;
			}

			return filter;
		});

		let navNotes;
		if (isFolder) {
			navNotes = this.createNavbarByFolder(
				dv,
				query,
				isFolder,
				minLevel,
				maxLevel,
				filteredNotes,
			);
		}

		if (!isFolder) {
			navNotes = this.createNavbarByTag(
				dv,
				query,
				isFolder,
				minLevel,
				maxLevel,
				filteredNotes,
			);
		}

		const navbar = this.createNavbar(dv, navNotes);

		return dv.paragraph(navbar);
	}

	/**
	 * Filters an array of pages based on minimum and maximum hierarchical levels.
	 *
	 * @param {Array} pages - An array of page objects to filter.
	 * @param {number} minLevel - The minimum hierarchical level to include in the result.
	 * @param {number} maxLevel - The maximum hierarchical level to include in the result.
	 * @return {Array} - An array of pages that meet the filtering criteria.
	 * @memberof Navbar
	 */

	filterPages(pages, minLevel, maxLevel) {
		const filteredByTags = createNavbarByTag(pages, minLevel, maxLevel);
		const filteredByFolders = createNavbarByFolder(pages);
		const commonFiltered = commonFilter(pages, minLevel);

		// Combine these filtered lists as needed
		// This is just an example; modify as necessary
		return [...filteredByTags, ...filteredByFolders, ...commonFiltered];
	}

	/**
	 * Generates and returns a navigation bar using DataView and an array of notes.
	 *
	 * @param {*} dv - The DataView instance.
	 * @param {Array} notes - An array of note objects to be included in the navigation bar.
	 * @return {string} - The generated navigation bar as a Markdown-formatted string.
	 * @memberof Navbar
	 */
	createNavbar(dv, pages) {
		let navItem;
		const currentPagePath = dv.current().file.path;
		const nav = [];
		for (const page of pages) {
			if (page.file.name.toLowerCase() === "home") {
				nav.unshift(this.createNavItem(page, currentPagePath));
				continue;
			}
			navItem = this.createNavItem(page, currentPagePath);
			nav.push(navItem);
		}

		if (nav.length === 0) {
			return "No pages found";
		}

		return nav.join(" | ");
	}
}
module.exports = Navbar;
