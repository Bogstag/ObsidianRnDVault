/**
 * Navbar class for creating navigation bars in Obsidian.
 */
class Navbar {
	/**
	 * Create a navigation item based on the given page.
	 * @param {Object} page - The page object from DataView.
	 * @param {Object} dv - The DataView instance.
	 * @return {string} - The navigation item as a Markdown link.
	 */
	createNavItem(page, dv) {
		let navItem = "";
		if (page.file.frontmatter["include_in_navbar"]) {
			if (dv.current().file.path === page.file.path) {
				if (page.file.frontmatter["navbar_name"] === undefined) {
					navItem = `**[[${page.file.link.path}|${page.file.name}]]**`;
				} else {
					navItem = `**[[${page.file.link.path}|${page.file.frontmatter["navbar_name"]}]]**`;
				}
			} else {
				if (page.file.frontmatter["navbar_name"] === undefined) {
					navItem = `[[${page.file.link.path}|${page.file.name}]]`;
				} else {
					navItem = `[[${page.file.link.path}|${page.file.frontmatter["navbar_name"]}]]`;
				}
			}
		}
		return navItem;
	}

	/**
	 * Create a navigation bar based on given parameters.
	 * @param {Object} app - The Obsidian app instance.
	 * @param {Object} dv - The DataView instance.
	 * @param {string} [tag=false] - The tag to filter pages by.
	 * @param {number} [max_level=2] - Maximum depth of tags to include.
	 * @return {string} - The navigation bar as a Markdown paragraph.
	 */
	createNavbar(app, dv, tag = false, max_level = 2) {
		let nav = [];

		if (!tag) {
			tag = "#dashboard";
		} else if (tag.startsWith("#system/")) {
			tag = "#system/dashboard";
			max_level += 1;
		}

		let dashboardCategory = "dashboard";
		if (tag.startsWith("#system/")) {
			dashboardCategory = "system";
		}

		// Assuming dv.pages(tag).values is the array you want to sort
		let pagesArray = dv.pages(tag).values;
		let pages = pagesArray.sort((a, b) => {
			const tagA = a.tags.find((t) => t.startsWith(dashboardCategory));
			const tagB = b.tags.find((t) => t.startsWith(dashboardCategory));
			return tagA.localeCompare(tagB);
		});

		// Check if there is more than one main dashboard
		const mainDashboards = pages.filter((page) =>
			page.tags.includes(dashboardCategory)
		);

		// Removing main dashboards from the original pages array
		const remainingPages = pages.filter(
			(page) => !page.tags.includes(dashboardCategory)
		);

		mainDashboards.sort((a, b) => {
			return a.navbar_name.localeCompare(b.navbar_name);
		});

		for (let mainDashboard of mainDashboards) {
			let navItem = this.createNavItem(mainDashboard, dv);
			if (navItem) {
				nav.push(navItem);
			}
		}

		// Error handling for empty array
		if (remainingPages.length === 0) {
			return "No pages found for the given tag.";
		}

		for (let page of remainingPages) {
			let tags = page.tags.find((t) => t.startsWith(dashboardCategory));
			let pageLevel;
			if (tags.includes("/")) {
				pageLevel = tags.split("/").length;
			} else {
				pageLevel = 1;
			}
			if (pageLevel <= max_level) {
				let navItem = this.createNavItem(page, dv);
				if (navItem) {
					nav.push(navItem);
				}
			}
		}

		return dv.paragraph(nav.join(" | "));
	}
}
