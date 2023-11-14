/**
 * Class responsible for comunicating with Sonarr REST API
 *
 * @class SonarrApi
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const SonarrApi = new tp.user.SonarrApi();
 * const something = SonarrApi.getSomething();
 */
class SonarrApi {
	/**
	 * Creates an instance of SonarrApi.
	 * @memberof SonarrApi
	 */
	constructor() {
		const tp =
			app.plugins.plugins["templater-obsidian"].templater
				.current_functions_object;
		const secret = tp.user.secrets;
		secret.api(this, "sonarr");

		this.headers = {
			"Content-Type": "application/json",
			accept: "application/json",
			"X-Api-Key": this.sonarrSecrets.key,
		};
		this.baseURL = this.sonarrSecrets.baseUrl;
	}

	async request(url, method = "GET", data = {}, options = {}, raw = false) {
		const fullUrl = new URL(url, this.baseUrl);
		const defaultOptions = {
			url: fullUrl.href,
			method: method,
			headers: this.headers,
		};
		const finalOptions = { ...defaultOptions, ...options };

		if (["POST", "PATCH"].includes(method)) {
			if (!this.validateData(data)) {
				throw new Error("Validation failed");
			}
			options.body = JSON.stringify(data);
		}

		try {
			const response = await fetch(finalOptions);
			if (raw) {
				return response;
			}

			return await response.json;
		} catch (error) {
			console.error("Request failed:", error);
			throw error;
		}
	}

	validateData(data) {
		// Implement validation logic
		// Return true if validation passes, false otherwise
		return true; // Placeholder
	}

	async getMissing(options = {}) {
		const defaultOptions = {
			includeSeries: true,
			pageSize: 100,
			sortkey: "seriesId",
			sortDirection: "ascending",
			includeImages: false,
			monitored: true,
		};
		const finalOptions = { ...defaultOptions, ...options };
		const params = new URLSearchParams(finalOptions).toString();
		const url = `wanted/missing?${params}`;
		
		const data = await this.request(url);
		return data.values;
	}
}
module.exports = SonarrApi;
