/**
 * Class responsible for comunicating with Jira Agile Server REST API
 *
 * @class JiraAgileApi
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const JiraAgileApi = new tp.user.JiraAgileApi();
 * const sprint = JiraAgileApi.sprint();
 */
class JiraAgileApi {
	/**
	 * Creates an instance of JiraAgileApi.
	 * @memberof JiraAgileApi
	 */
	constructor() {
		const tp =
			app.plugins.plugins["templater-obsidian"].templater
				.current_functions_object;
		const secret = tp.user.secrets;
		secret.api(this, "jira");

		this.jsonUtils = tp.user.JsonUtils;
		this.headers = {
			authorization: `Bearer ${this.jiraSecrets.bearerToken}`,
			"Content-Type": "application/json",
			accept: "application/json",
		};
		this.baseUrl = this.jiraSecrets.agile.baseUrl;
	}

	/**
	 * Retrieves sprints from Jira based on specified criteria.
	 *
	 * @param {Object} [options={}] The options for filtering the sprints.
	 * @param {number} [options.startAt] The starting index of the returned sprints. Base index: 0.
	 * @param {number} [options.maxResults] The maximum number of sprints to return per page.
	 * @param {string} [options.state="active,future"] Filters results to sprints in specified states. Valid values: 'future', 'active', 'closed'. You can define multiple states separated by commas, e.g., 'state=active,closed'. If no state is set, it returns sprints in all states.
	 *
	 * @returns {Object} An object containing sprint details, keyed by sprint ID.
	 * @memberof JiraAgileApi
	 */

	async sprint(options = {}) {
		const defaultOptions = { state: "active,future" };
		const finalOptions = { ...defaultOptions, ...options };
		const params = new URLSearchParams(finalOptions).toString();

		const boardId = this.jiraSecrets.team.board.id;
		const url = `board/${boardId}/sprint?${params}`;
		const data = await this.request(url);

		return this.jsonUtils.groupByKeyField(data.values, "id");
	}

	validateData(data) {
		// Implement validation logic
		// Return true if validation passes, false otherwise
		return true; // Placeholder
	}
	/**
	 * @description Requests information from the server
	 * @param {string} url
	 * @param {string} [method="GET"]
	 * @param {boolean} [raw=false]
	 * @returns {json}
	 * @memberof JiraAgileApi
	 */
	async request(url, method = "GET", data = {}, raw = false) {
		const fullUrl = new URL(url, this.baseUrl);
		const options = {
			url: fullUrl.href,
			method: method,
			headers: this.headers,
		};

		if (["POST", "PATCH"].includes(method)) {
			if (!this.validateData(data)) {
				throw new Error("Validation failed");
			}
			options.body = JSON.stringify(data);
		}

		try {
			const response = await requestUrl(options);
			if (raw) {
				return response;
			}

			return await response.json;
		} catch (error) {
			console.error(
				"There was a problem with the fetch operation:",
				error,
			);
			throw error;
		}
	}
}
module.exports = JiraAgileApi;
