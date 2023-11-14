/**
 * Class responsible for comunicating with Jira Agile Server REST API
 *
 * @class JiraServerApi
 *
 * @example
 * const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
 * const JiraServerApi = new tp.user.JiraServerApi();
 * const sprint = JiraServerApi.sprint();
 */
class JiraServerApi {
	/**
	 * Creates an instance of JiraServerApi.
	 * @memberof JiraServerApi
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
		this.baseUrl = this.jiraSecrets.server.baseUrl;
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
	 * @memberof JiraServerApi
	 */
	async createIssue(options = {}) {
		const defaultOptions = {
			fields: {
				project: {
					id: "10000",
				},
				summary: "something's wrong",
				issuetype: {
					id: "10000",
				},
				assignee: {
					name: "homer",
				},
				reporter: {
					name: "smithers",
				},
				labels: ["bugfix", "blitz_test"],
				timetracking: {
					originalEstimate: "10",
					remainingEstimate: "5",
				},
				description: "description",
				// biome-ignore lint/style/useNamingConvention: <explanation>
				customfield_30000: ["10000", "10002"],
				// biome-ignore lint/style/useNamingConvention: <explanation>
				customfield_80000: {
					value: "red",
				},
				// biome-ignore lint/style/useNamingConvention: <explanation>
				customfield_50000: "this is a text area. big text.",
			},
		};
		const finalOptions = { ...defaultOptions, ...options };
		await this.validateCreateIssue(finalOptions);

		const data = await this.request(url, "POST");

		return this.jsonUtils.groupByKeyField(data.values, "id");
	}

	async validateCreateIssue(data) {
		if (!data.fields || typeof data.fields !== "object") {
			errors.push("fields must be an object.");
		}

		if (data.update) {
			if (typeof data.update !== "object") {
				errors.push("update must be an object.");
			} else if (data.update.worklog && !Array.isArray(data.update.worklog)) {
				errors.push("update.worklog must be an array.");
			}
		}

		// Add more custom validations as needed

		if (errors.length === 0) {
			return true;
		} else {
			for (const error in errors) {
				console.error("validateCreateIssue: ", error);
			}
			new Notice("CreateIssue failed validation! Look in console for error!");
		}
	}

	/**
	 * @description Requests information from the server
	 * @param {string} url
	 * @param {string} [method="GET"]
	 * @param {boolean} [raw=false]
	 * @returns {json}
	 * @memberof JiraServerApi
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
module.exports = JiraServerApi;
