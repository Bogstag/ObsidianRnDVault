class SvgProgressBar {
	constructor(options = {}) {
		this.titleColor = options.color || "428bca";
		this.height = parseInt(options.height) || 20;
		this.progress = options.progress || 0;
		this.scale = parseInt(options.scale) || 100;
		this.suffix = options.suffix || "%";
		this.title = options.title || "Progress";
		this.progressWidth = parseInt(options.width) || 200;
		this.titleWidth = this.calculateTitleWidth(this.title);
		this.progressColor = this.getProgressColor(this.progress, this.scale);
	}

	calculateTitleWidth(title) {
		return 10 + 6 * title.length;
	}

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

	generateRect(x, width, color) {
		return `<rect rx="4" x="${x}" width="${width}" height="${this.height}" fill="${color}" />`;
	}

	generateText(x, y, text, fontSize, isShadow = false) {
		const shadowProps = isShadow ? ' fill="#010101" fill-opacity=".3"' : "";
		return `<text x="${x}" y="${y}"${shadowProps}>${text}</text>`;
	}

	getSvgProgressBar() {
		// Common calculations
		const svgCalc = this.calculateDimensions();

		// Start with an array of SVG components
		const svgComponents = [
			this.generateRect(0, svgCalc.totWidth, `#${this.titleColor}`),
			this.generateRect(this.titleWidth, this.progressWidth, "#555"),
			this.generateRect(this.titleWidth, svgCalc.progWidth, this.progressColor),
			// ... other components
		];

		// Add title if it exists
		if (this.title) {
			svgComponents.push(
				this.generateText(4, svgCalc.yTxt, this.title, svgCalc.fontSize),
			);
			svgComponents.push(
				this.generateText(
					4,
					svgCalc.yTxtShadow,
					this.title,
					svgCalc.fontSize,
					true,
				),
			);
		}

		// Add progress text
		svgComponents.push(
			this.generateText(
				svgCalc.xTxt,
				svgCalc.yTxt,
				svgCalc.txtProg,
				svgCalc.fontSize,
			),
		);
		svgComponents.push(
			this.generateText(
				svgCalc.xTxt,
				svgCalc.yTxtShadow,
				svgCalc.txtProg,
				svgCalc.fontSize,
				true,
			),
		);

		// Combine components into a single SVG element
		const svgContent = `<svg width="${svgCalc.totWidth}" height="${
			this.height
		}" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">${svgComponents.join(
			"",
		)}</svg>`;

		return svgContent;
	}

	calculateDimensions() {
		// Perform and return all SVG related calculations here.
		return {
			yTxt: this.height / 2 + 4,
			yTxtShadow: this.height / 2 + 5,
			xTxt: Math.floor(this.progressWidth / 2) + this.titleWidth,
			txtProg: `${this.progress} ${this.suffix}`,
			totWidth: this.titleWidth + this.progressWidth,
			progWidth: Math.min(this.progress / this.scale, 1) * this.progressWidth,
			fontSize: Math.max(this.height / 2 - 5, 11),
		};
	}
}
module.exports = SvgProgressBar;
// Usage example:
// const progressBar = new SvgProgressBar({ title: 'My Progress', scale: 100, progress: 50 });
// const svgContent = progressBar.getSvgProgressBar();
// console.log('Generated SVG:', svgContent);
