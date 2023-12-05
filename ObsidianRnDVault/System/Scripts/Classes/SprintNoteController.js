class SprintNoteController {
	constructor() {
		const tp =
			app.plugins.plugins["templater-obsidian"].templater
				.current_functions_object;
		this.JiraAgileApi = new tp.user.JiraAgileApi();
		this.NoteManager = new tp.user.NoteManager();
	}

	async createOrUpdateSprintNote() {
		// Fetch sprint data
		const sprints = await this.JiraAgileApi.sprint();

		for (const sprint in sprints) {
			dv.pages("#Metadata/sprint")
			// Check if note exist
			// If exists update info
			// If not Create note, inject template
		}
	}

	async updateSprintNote() {}

	async createSprintNote() {}
}
module.exports = SprintNoteController;
