/**
 * Generates a progressbar
 *
 * Usage in Obsidian
 * ```dataviewjs
 * await dv.view('projectProgress', { width:400, height:20 })
 * ```
 * @param {object} args
 * @param {number} [args.progress=0] - The current progress Calculated from finished tasks else 0.
 */
async function projectProgress(args) {
	const tp =
		app.plugins.plugins["templater-obsidian"].templater
			.current_functions_object;
	const tasks = await args.dv.current().file.tasks;
	let percent = Math.round(
		(tasks.filter((x) => x.completed).length / tasks.length) * 100,
	);
	if (Number.isNaN(percent)) {
		percent = 0;
	}
	args.progress = percent;

	const svgProgressBar = await new tp.user.SvgProgressBar(args);

	dv.span(await svgProgressBar.getSvgProgressBar());
}
projectProgress(input);
