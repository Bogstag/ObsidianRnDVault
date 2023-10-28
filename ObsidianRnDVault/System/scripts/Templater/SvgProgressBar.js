/**
 * Example usage:
 * const SvgProgressBar = await self.require.import(
 * 			"System/scripts/Templater/SvgProgressBar.mjs"
 * 		);
 * const svgGenerator = new SvgProgressBar();
 * const progress = 50;
 * const requestArgs = { title: 'My Progress', scale: 100 };
 * const templateFields = svgGenerator.getTemplateFields(progress, requestArgs);
 * const svgContent = svgGenerator.getSvgProgressBar(progress, requestArgs);
 * console.log('Generated SVG:', svgContent);
 *
 * @class SvgProgressBar
 * @classdesc A class for generating SVGs to represent progress bars.
 */
class SvgProgressBar {
	/**
	 * @method
	 * @description Generate the SVG content for the progress bar.
	 * @param {number} [progress=0] - The current progress value. If scale is 100, then 50 is 50%.
	 * @param {object} requestArgs - The request arguments.
	 * @param {boolean} [requestArgs.height=false] - True gets you more height.
	 * @param {string} [requestArgs.title=''] - Text on bar.
	 * @param {color} [requestArgs.color=428bca] - Color of text on bar, without the #.
	 * @param {number} [requestArgs.scale=100] - The request arguments.
	 * @param {number} [requestArgs.width] - Width of bar.
	 * @param {string} [requestArgs.suffix='%'] - THe suffix of progress.
	 * @param {string} [requestArgs.wrap='svg'] - Whant kind of wrapping do tyou want?
	 * 	Valid options are:
	 * 		'svg': returns SVG string (no wrapper),
	 * 		'img': returns HTML img tag,
	 * 		'url': returns data url,
	 * 		'dv.el.{div}': returns a dv.el with user selected {element}.
	 * @returns {string} - The SVG content.
	 * @memberof SvgProgressBar
	 */
	getSvgProgressBar(progress = 0, requestArgs) {
		const templateFields = this.getTemplateFields(progress, requestArgs);
		const SvgProgressBar = this.createSVG(templateFields);

		return SvgProgressBar;
	}

	/**
	 * @method
	 * @description Get the template fields to be used in the SVG.
	 * @param {number} progress - The current progress value.
	 * @param {Object} requestArgs - The request arguments.
	 * @returns {Object} - An object containing template fields.
	 * @memberof SvgProgressBar
	 */
	getTemplateFields(progress, requestArgs) {
		const title = requestArgs.title;

		//const returnTemplate = getReturnTemplate(requestArgs.wrap);

		let scale = 100;
		if (requestArgs.scale !== undefined && !isNaN(requestArgs.scale)) {
			scale = parseInt(requestArgs.scale);
		}

		let progressWidth = title ? 60 : 90;
		if (requestArgs.width !== undefined && !isNaN(requestArgs.width)) {
			progressWidth = parseInt(requestArgs.width);
		}

		return {
			height: requestArgs.height || 20, // TODO:: Remove wide, not my finest moment
			wrap: requestArgs.wrap || "svg",
			title: title,
			title_width: title ? 10 + 6 * title.length : 0,
			title_color: requestArgs.color || "428bca",
			scale: scale,
			progress: progress,
			progress_width: progressWidth,
			progress_color: this.getProgressColor(progress, scale),
			suffix: requestArgs.suffix || "%",
		};
	}

	/**
	 *
	 *
	 * @param {*} a
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	stripquotes(a) {
		if (a.charAt(0) === '"' && a.charAt(a.length - 1) === '"') {
			return a.substr(1, a.length - 2);
		}
		return a;
	}

	/**
	 *
	 *
	 * @param {*} value
	 * @param {*} unwraped
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	getReturnTemplate(value, unwraped) {
		let wraped = unwraped;

		switch (value) {
			case "img":
				unwraped = this.doublesToSingles(unwraped);
				unwraped = this.encodeSvg(unwraped);
				wraped = `<img src = "data:image/svg+xml,${unwraped}" /> `;
				return wraped;
			case "url":
				unwraped = this.doublesToSingles(unwraped);
				unwraped = this.encodeSvg(unwraped);
				wraped = `url("data:image/svg+xml,${unwraped}"); `;
				return wraped;
			case "svg":
				return wraped;
			default:
				if (value.includes(".")) {
					unwraped = this.doublesToSingles(unwraped);
					unwraped = this.encodeSvg(unwraped);
					const [first, second, third] = value.split(".");
					wraped = `${first}.${second} (${third}, "data:image/svg+xml,${unwraped}")`;
				}
				return wraped;
		}
	}

	/**
	 *
	 *
	 * @param {*} svgContent
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	encodeSvgImage(svgContent) {
		const svg = decodeURI(svgContent);
		const svgout = this.stripquotes(svg);

		return svgout;
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	doublesToSingles(svg) {
		return svg.replace(/"/g, "'");
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @param {*} type
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	prefixDataType(svg, type) {
		return "data:image/svg+" + type + "," + svg;
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	singlesToDoubles(svg) {
		return svg.replace(/'/g, '"');
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @param {*} type
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	prefixIMG(svg, type) {
		svg = prefixDataType(svg, type);
		return '<img src="' + svg + '">';
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	prefixURLDoubleQuotes(svg) {
		return 'url("' + svg + '")';
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	removeNewlines(svg) {
		return svg.replace(/(\r\n|\n|\r)/gm, " "); // New lines
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	removeWhitespace(svg) {
		svg = svg.replace(/>\s{1,}</g, `>< `); // One of more spaces between groups or tags
		return svg.replace(/\s{2,}/g, ` `); // Double or more spaces
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	regexEncode(svg) {
		svg = svg.replace(/>\s{1,}</g, `>< `);
		svg = svg.replace(/\s{2,}/g, ` `);
		return svg.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
	}

	/**
	 *
	 *
	 * @param {*} svgString
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	encodeSvg(svgString) {
		return svgString
			.replace(
				"<svg",
				~svgString.indexOf("xmlns")
					? "<svg"
					: '<svg xmlns="http://www.w3.org/2000/svg"',
			)
			.replace(/[<>#%{}"]/g, (x) => "%" + x.charCodeAt(0).toString(16))
			.replace(/\s+/g, " ");
	}

	/**
	 * @method
	 * @description Determine the color of the progress bar based on the progress.
	 * @param {number} progress - The current progress value.
	 * @param {number} scale - The maximum value of progress.
	 * @returns {string} - The color for the progress bar.
	 * @memberof SvgProgressBar
	 */
	getProgressColor(progress, scale) {
		const ratio = progress / scale;

		if (ratio < 0.3) {
			return "#d9534f";
		}
		if (ratio < 0.7) {
			return "#f0ad4e";
		}

		return "#5cb85c";
	}

	/**
	 * @method
	 * @description Render a SVG by replacing placeholders with values from the templateFields.
	 * @param {object} tF - templateFields with values to insert in SVG.
	 * @return {string} - The content with values of the renderd SVG.
	 * @memberof SvgProgressBar
	 */
	createSVG(tF) {
		// Do calc outside of svg, minimize prettier error formating
		const svgCalc = {
			y_txt: tF.height / 2 + 4,
			y_txt_shadow: tF.height / 2 + 5,
			x_txt: Math.floor(tF.progress_width / 2) + tF.title_width,
			txt_prog: `${tF.progress}${tF.suffix}`,
			tot_width: tF.title_width + tF.progress_width,
			prog_width: Math.min(tF.progress / tF.scale, 1) * tF.progress_width,
			font_size: Math.max(tF.height / 2 - 5, 11),
		};

		const svgContent = `<svg width="${svgCalc.tot_width}" height="${
			tF.height
		}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="4" x="0" width="${
			svgCalc.tot_width
		}" height="${tF.height}" fill="#${tF.title_color}"/><rect rx="4" x="${
			tF.title_width
		}" width="${tF.progress_width}" height="${
			tF.height
		}" fill="#555" /><rect rx="4" x="${tF.title_width}" width="${
			svgCalc.prog_width
		}" height="${tF.height}" fill="${tF.progress_color}" />${
			tF.title
				? `<path fill="${tF.progress_color}" d="M${tF.title_width} 0h4v${tF.height}h-4z" />`
				: ""
		}<rect rx="4" width="${svgCalc.tot_width}" height="${
			tF.height
		}" fill="url(#a)" />${
			tF.title
				? `<g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${svgCalc.font_size}"><text x="4" y="${svgCalc.y_txt_shadow}" fill="#010101" fill-opacity=".3">${tF.title}</text><text x="4" y="${svgCalc.y_txt}">${tF.title}</text></g>`
				: ""
		}<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${
			svgCalc.font_size
		}"><text x="${svgCalc.x_txt}" y="${
			svgCalc.y_txt_shadow
		}" fill="#010101" fill-opacity=".3">${
			svgCalc.txt_prog
		}</text><text x="${svgCalc.x_txt}" y="${svgCalc.y_txt}">${
			svgCalc.txt_prog
		}</text></g></svg>`;

		//const tagSvg = this.getReturnTemplate(tF.wrap, svgContent);

		return svgContent;
	}
}
module.exports = SvgProgressBar;
