/*
Insert a table-of-contents anywhere with:

```dataviewjs
dv.view('toc')
```

You can specify some optional parameters:

```dataviewjs
dv.view('toc', {
    style: '-', // change to bullet style instead of number style
    level: 2, // start at level number X (ignore the levels preceeding that)
    heading: false // disable the "Table of contents" heading
})
```
Credits to AlanG https://share.note.sx/3tddklv6
*/
const startAtLevel = input?.level || 2;
const content = await dv.io.load(dv.current().file.path);
const counter = [0, startAtLevel];
let numbers = [1];
const toc = content
	.match(new RegExp(`^#{${startAtLevel},} \\S.*`, "mg"))
	.map((heading) => {
		const [_, level, text] = heading.match(/^(#+) (.+)$/);
		const link = `${dv.current().file.path}#${text}`;
		if (level.length > counter[1]) {
			counter[0]++;
			numbers[counter[0]] = 1;
		} else if (level.length < counter[1]) {
			counter[0] = Math.max(0, counter[0] - 1);
			numbers[counter[0]]++;
			numbers = numbers.slice(0, counter[0] + 1);
		}
		counter[1] = level.length;
		return (
			"\t".repeat(counter[0]) +
			`${input?.style || `${numbers[numbers.length - 1]}.`} [[${link}|${text}]]`
		);
	});
if (input?.heading !== false) {
	dv.header(2, "Table of contents");
}
dv.paragraph(toc.join("\n"));
