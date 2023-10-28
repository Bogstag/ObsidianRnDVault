/**
 * Insert a table-of-contents anywhere with:
 * ```dataviewjs
 * dv.view('toc')
 * ```
 *
 * You can specify some optional parameters:
 * ```dataviewjs
 * dv.view('toc', { style: '-', level: 2, heading: true })
 * ```
 *
 * @input {string} [style=] - '-' not set make it numberd list .
 * @input {number} [level=2] - On witch level to start from and ignore the levels preceeding that.
 * @input {bool} [heading=false] - Set to true to enable the "Table of contents" heading
 */
function generateToc(content, startAtLevel, style, i = 0) {
	return content
		.match(new RegExp(`^#{${startAtLevel},} \\S.*`, "mg"))
		.map((heading) => {
			const [_, level, text] = heading.match(/^(#+)\s+([^([]+|\[[^\]]+\])/);

			const link = `${dv.current().file.path}#${text}`;

			return (
				"\t".repeat(level.length - startAtLevel) +
				`${input?.style || "1."} [[${link}|${text}]]`
			);
		});
}

const startAtLevel = input?.level || 2;
const style = input?.style || "1.";
const content = await dv.io.load(dv.current().file.path);
const toc = generateToc(content, startAtLevel, style);

if (input?.heading !== false) {
	dv.header(2, "Table of contents");
}

dv.paragraph(toc.join("\n"));
