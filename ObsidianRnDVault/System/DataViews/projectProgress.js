async function projectProgress(...args) {
	const svgProgressBar = await require.import(
		"System/Scripts/Templater/SvgProgressBar.js",
	);
	const svgGenerator = new svgProgressBar();

	let progress = false;
	if (input === parseInt(input, 10)) {
		// If this is true, then we assume that user only sent us progress.
		progress = input?.progress;
	}

	const tasks = await dv.current().file.tasks;
	const percent = Math.round(
		(tasks.filter((x) => x.completed).length / tasks.length) * 100,
	);

	const requestArgs = {
		wrap: input?.wrap || "svg",
		width: input?.width,
		height: input?.height || 20,
		title: input?.title || "Progress",
		titleColor: input?.color || "428bca",
		scale: input?.scale || 100,
		progress: progress || percent,
		suffix: input?.suffix || "%",
	};

	const svgContent = await svgGenerator.getSvgProgressBar(
		requestArgs.progress,
		requestArgs,
	);

	dv.span(svgContent);
}
projectProgress(input);
