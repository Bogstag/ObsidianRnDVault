async function mentionsTable(...args) {
	// Add a header of level X, e.g. input = 2 means header level 2
	const name = await dv.current().file.name.replace(/^@/, "");
	await dv.header(input, `Notes referencing ${name}`);
}
await dv.table(
	["Note", "Location"],
	dv
		.pages(`[[${dv.current().file.name}]]`)
		// Sort by YAML created field, but check whether there are multiple created dates
		.sort(
			(b) => moment(Array.isArray(b.created) ? b.created[0] : b.created),
			"desc",
		)
		.map((b) => [
			b.file.link,
			b.file.folder.replace(/\//g, " ‣ ").replace(/^\d+ (.+)/, "$1"),
		]),
);
mentionsTable(input);
