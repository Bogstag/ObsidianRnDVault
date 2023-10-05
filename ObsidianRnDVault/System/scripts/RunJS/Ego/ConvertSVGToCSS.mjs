/**
 * @RunJS Ego/Convert/SVG/CSS
 */

export default class SvgConverter2 {
  static symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

  /**
   * Constructs a new SvgConverter object.
   * @param {string} svg - The SVG string to be converted.
   * @param {string} [quoteType="double"] - The type of quotes to be used in the URL.
   *                                         Allowed values are "double" or "single".
   * @throws {Error} If the quoteType is invalid.
   */
  constructor(svg, quoteType = "double") {
    if (["double", "single"].includes(quoteType)) {
      this.svg = svg;
      this.css = "";
      this.quoteType = quoteType;
      this.quotesInputs = this.quoteType === "double" ? '"' : "'";
      this.quotes = {
        level1: this.quotesInputs,
        level2: this.quoteType === "double" ? "'" : '"',
      };
      this.init();
    } else {
      throw new Error(
        "Invalid quoteType. Allowed values are 'double' or 'single'."
      );
    }
  }

  /**
   * Initializes the SvgConverter object.
   * @returns {string} The CSS background-image property with the encoded SVG URL.
   */
  init() {
    const namespaced = this.addNamespace(this.svg);
    const encodedSVG = this.encodeSVG(namespaced);
    this.css = `background-image: url(${this.quotes.level1}data:image/svg+xml,${encodedSVG}${this.quotes.level1});`;
  }

  /**
   * Adds the XML namespace to the SVG string if it is missing.
   * @param {string} data - The SVG string.
   * @returns {string} The SVG string with the added namespace.
   */
  addNamespace(data) {
    if (!data.includes("http://www.w3.org/2000/svg")) {
      data = data.replace(
        /<svg/g,
        `<svg xmlns=${this.quotes.level2}http://www.w3.org/2000/svg${this.quotes.level2}`
      );
    }
    return data;
  }

  /**
   * Encodes the SVG string for use in the URL.
   * @param {string} data - The SVG string.
   * @returns {string} The encoded SVG string.
   */
  encodeSVG(data) {
    if (this.quoteType === "double") {
      data = data.replace(/"/g, "'");
    } else {
      data = data.replace(/'/g, '"');
    }

    data = data.replace(/>\s{1,}</g, `><`);
    data = data.replace(/\s{2,}/g, ` `);

    return data.replace(this.symbols, encodeURIComponent);
  }
}
