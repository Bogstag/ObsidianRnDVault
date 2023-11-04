/**
 * Example usage:
 * const svgProgressBar = require(`${app.vault.adapter.basePath}/System/Scripts/Classes/SvgProgressBar.js`);
 * const progressBar = new svgProgressBar();
 *
 * const args = { title: 'My Progress', scale: 100, progress: 50 };
 * const svgContent = progressBar.getSvgProgressBar(args);
 * console.log('Generated SVG:', svgContent);
 *
 * @class SvgProgressBar
 * @classdesc A class for generating SVGs to represent progress bars.
 */
class SvgProgressBar {
	/**
	 * @constructor
	 * @description Generate the SVG content for the progress bar.
	 * @param {object} args - The request arguments.
	 * @param {number} [args.progress=0] - The current progress value. If scale is 100, then 50 is 50%.
	 * @param {boolean} [args.height=false] - True gets you more height.
	 * @param {string} [args.title="Progress"] - Text on bar.
	 * @param {color} [args.color=428bca] - Color of text on bar, without the #.
	 * @param {number} [args.scale=100] - The request arguments.
	 * @param {number} [args.width] - Width of bar.
	 * @param {string} [args.suffix='%'] - THe suffix of progress.
	 *
	 * @returns {string} - The SVG content.
	 * @memberof SvgProgressBar
	 */
	constructor(args) {
		// console.log("Class args", args);
		this.titleColor = args.color || "428bca";
		this.height = parseInt(args.height) || 20;
		this.progress = args.progress || 0;
		this.scale = parseInt(args.scale) || 100;
		this.suffix = args.suffix || "%";
		this.title = args.title || "Progress";
		this.progressWidth = parseInt(args.width) || 200;

		this.titleWidth = 10 + 6 * this.title.length;
		this.progressColor = this.getProgressColor(this.progress, this.scale);
		// TODO:: lot of unused code
		// TODO:: add another svg.
		// TODO:: Create a better class.
		// TODO:: Look into createSvg
	}

	/**
	 * @method getProgressColor
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
	 * @method getSvgProgressBar
	 * @description Render, finalize and return a SVG Progressbar.
	 * @return {SVGElement} - String containing the progressbar.
	 * @memberof SvgProgressBar
	 */
	getSvgProgressBar() {
		// Do calc outside of svg, minimize formating / linting errors.
		const svgCalc = {
			yTxt: this.height / 2 + 4,
			yTxtShadow: this.height / 2 + 5,
			xTxt: Math.floor(this.progressWidth / 2) + this.titleWidth,
			txtProg: `${this.progress} ${this.suffix}`,
			totWidth: this.titleWidth + this.progressWidth,
			progWidth: Math.min(this.progress / this.scale, 1) * this.progressWidth,
			fontSize: Math.max(this.height / 2 - 5, 11),
		};

		const svgContent = `<svg width="${svgCalc.totWidth}" height="${
			this.height
		}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="4" x="0" width="${
			svgCalc.totWidth
		}" height="${this.height}" fill="#${this.titleColor}"/><rect rx="4" x="${
			this.titleWidth
		}" width="${this.progressWidth}" height="${
			this.height
		}" fill="#555" /><rect rx="4" x="${this.titleWidth}" width="${
			svgCalc.progWidth
		}" height="${this.height}" fill="${this.progressColor}" />${
			this.title
				? `<path fill="${this.progressColor}" d="M${this.titleWidth} 0h4v${this.height}h-4z" />`
				: ""
		}<rect rx="4" width="${svgCalc.totWidth}" height="${
			this.height
		}" fill="url(#a)" />${
			this.title
				? `<g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${svgCalc.fontSize}"><text x="4" y="${svgCalc.yTxtShadow}" fill="#010101" fill-opacity=".3">${this.title}</text><text x="4" y="${svgCalc.yTxt}">${this.title}</text></g>`
				: ""
		}<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${
			svgCalc.fontSize
		}"><text x="${svgCalc.xTxt}" y="${
			svgCalc.yTxtShadow
		}" fill="#010101" fill-opacity=".3">${svgCalc.txtProg}</text><text x="${
			svgCalc.xTxt
		}" y="${svgCalc.yTxt}">${svgCalc.txtProg}</text></g></svg>`;

		return svgContent;
	}
}
module.exports = SvgProgressBar;
