const SvgProgressBar = await require.import(
	"System/scripts/functions/SvgProgressBar.js",
);
const svgGenerator = new SvgProgressBar();

let progress = false;
if (input === parseInt(input, 10)) {
	// If this is true, then we assume that user only sent us progress.
	progress = input;
} else {
	progress = input?.progress;
}

const tasks = dv.current().file.tasks;
const percent = Math.round(
	(tasks.filter((x) => x.completed).length / tasks.length) * 100,
);

const requestArgs = {
	wrap: input?.wrap || "svg",
	width: input?.width,
	height: input?.height || 20,
	title: input?.title || "Progress",
	title_color: input?.color || "428bca",
	scale: input?.scale || 100,
	progress: progress || percent,
	suffix: input?.suffix || "%",
};

const svgContent = svgGenerator.getSvgProgressBar(
	requestArgs.progress,
	requestArgs,
);

dv.span(svgContent);
