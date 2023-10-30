class NavbarSmall {
	createNavbar(dv) {
		const nav = [];
		let navItem;

		const pages = dv
			.pages("#dashboard")
			.sort((page) => page.file.folder, "asc");

		for (const page of pages) {
			navItem = "";

			if (!page.file.frontmatter.include_in_navbar) {
				continue;
			}

			navItem = `[[${page.file.link.path}|${
				page.file.frontmatter.navbar_name ?? page.file.name
			}]]`;

			if (dv.current().file.path === page.file.path) {
				navItem = `**${navItem}**`;
			}

			nav.push(navItem);
		}

		return dv.paragraph(nav.join(" | "));
	}
}
module.exports = NavbarSmall;
