/**
 * Example usage:
 * const SvgProgressBar = await self.require.import(
 * 			"System/Scripts/Templater/SvgProgressBar.mjs"
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
	getSvgProgressBar(progress, requestArgs) {
		const templateFields = this.getTemplateFields(progress, requestArgs);
		const svgProgressBar = this.createSvg(templateFields);

		return svgProgressBar;
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
		if (requestArgs.scale !== undefined && !Number.isNaN(requestArgs.scale)) {
			scale = parseInt(requestArgs.scale);
		}

		let progressWidth = title ? 60 : 90;
		if (requestArgs.width !== undefined && !Number.isNaN(requestArgs.width)) {
			progressWidth = parseInt(requestArgs.width);
		}

		return {
			height: requestArgs.height || 20, // TODO:: Remove wide, not my finest moment
			wrap: requestArgs.wrap || "svg",
			title: title,
			titleWidth: title ? 10 + 6 * title.length : 0,
			titleColor: requestArgs.color || "428bca",
			scale: scale,
			progress: progress,
			progressWidth: progressWidth,
			progressColor: this.getProgressColor(progress, scale),
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
	 * @param {*} unwrap
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	// getReturnTemplate(value, unwrap) {
	// 	let unwraped = unwrap;
	// 	let wraped = unwraped;

	// 	switch (value) {
	// 		case "img":
	// 			unwraped = this.doublesToSingles(unwraped);
	// 			unwraped = this.encodeSvg(unwraped);
	// 			wraped = `<img src = "data:image/svg+xml,${unwraped}" /> `;
	// 			return wraped;
	// 		case "url":
	// 			unwraped = this.doublesToSingles(unwraped);
	// 			unwraped = this.encodeSvg(unwraped);
	// 			wraped = `url("data:image/svg+xml,${unwraped}"); `;
	// 			return wraped;
	// 		case "svg":
	// 			return wraped;
	// 		default:
	// 			if (value.includes(".")) {
	// 				unwraped = this.doublesToSingles(unwraped);
	// 				unwraped = this.encodeSvg(unwraped);
	// 				const [first, second, third] = value.split(".");
	// 				wraped = `${first}.${second} (${third}, "data:image/svg+xml,${unwraped}")`;
	// 			}
	// 			return wraped;
	// 	}
	// }

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
		return `data:image/svg+${type},${svg}`;
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
	prefixImg(svg, type) {
		const svgDataType = prefixDataType(svg, type);
		return `<img src="${svgDataType}">`;
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	prefixUrlDoubleQuotes(svg) {
		return `url("${svg}")`;
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
		const svgSanitized = svg.replace(/>\s{1,}</g, ">< "); // One of more spaces between groups or tags
		return svgSanitized.replace(/\s{2,}/g, " "); // Double or more spaces
	}

	/**
	 *
	 *
	 * @param {*} svg
	 * @return {*}
	 * @memberof SvgProgressBar
	 */
	regexEncode(svg) {
		const svgStep1 = svg.replace(/>\s{1,}</g, ">< ");
		const svgStep2 = svgStep1.replace(/\s{2,}/g, " ");
		return svgStep2.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
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
			.replace(/[<>#%{}"]/g, (x) => `%${x.charCodeAt(0).toString(16)}`)
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
	createSvg(tF) {
		// Do calc outside of svg, minimize prettier error formating
		const svgCalc = {
			yTxt: tF.height / 2 + 4,
			yTxtShadow: tF.height / 2 + 5,
			xTxt: Math.floor(tF.progressWidth / 2) + tF.titleWidth,
			txtProg: `${tF.progress}${tF.suffix}`,
			totWidth: tF.titleWidth + tF.progressWidth,
			progWidth: Math.min(tF.progress / tF.scale, 1) * tF.progressWidth,
			fontSize: Math.max(tF.height / 2 - 5, 11),
		};

		const svgContent = `<svg width="${svgCalc.totWidth}" height="${
			tF.height
		}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="4" x="0" width="${
			svgCalc.totWidth
		}" height="${tF.height}" fill="#${tF.titleColor}"/><rect rx="4" x="${
			tF.titleWidth
		}" width="${tF.progressWidth}" height="${
			tF.height
		}" fill="#555" /><rect rx="4" x="${tF.titleWidth}" width="${
			svgCalc.progWidth
		}" height="${tF.height}" fill="${tF.progressColor}" />${
			tF.title
				? `<path fill="${tF.progressColor}" d="M${tF.titleWidth} 0h4v${tF.height}h-4z" />`
				: ""
		}<rect rx="4" width="${svgCalc.totWidth}" height="${
			tF.height
		}" fill="url(#a)" />${
			tF.title
				? `<g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${svgCalc.fontSize}"><text x="4" y="${svgCalc.yTxtShadow}" fill="#010101" fill-opacity=".3">${tF.title}</text><text x="4" y="${svgCalc.yTxt}">${tF.title}</text></g>`
				: ""
		}<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${
			svgCalc.fontSize
		}"><text x="${svgCalc.xTxt}" y="${
			svgCalc.yTxtShadow
		}" fill="#010101" fill-opacity=".3">${svgCalc.txtProg}</text><text x="${
			svgCalc.xTxt
		}" y="${svgCalc.yTxt}">${svgCalc.txtProg}</text></g></svg>`;

		//const tagSvg = this.getReturnTemplate(tF.wrap, svgContent);

		return svgContent;
	}
}
module.exports = SvgProgressBar;
