/**
 * Class responsible for comunicating with Jira Agile Server REST API
 *
 * @class JiraApi
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const jiraApi = new tp.user.JiraAPI();
 * const futureSprint = jiraApi.futureSprint;
 */
class JiraApi {
	/**
	 * Creates an instance of JiraApi.
	 * @memberof JiraApi
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
		this.baseUrl = this.jiraSecrets.baseUrl;
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
	 * @memberof JiraApi
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

	/**
	 * @description Requests information from the server
	 * @param {string} url
	 * @param {string} [method="GET"]
	 * @param {boolean} [raw=false]
	 * @returns {json}
	 * @memberof JiraApi
	 */
	async request(url, method = "GET", raw = false) {
		const fullUrl = new URL(url, this.baseUrl);
		const options = {
			url: fullUrl.href,
			method: method,
			headers: this.headers,
		};

		try {
			const response = await requestUrl(options);
			if (raw) {
				return response;
			}

			return await response.json;
		} catch (error) {
			console.error(
				"There was a problem with the fetch operation:",
				error.message,
			);
			throw error;
		}
	}
}
module.exports = JiraApi;
