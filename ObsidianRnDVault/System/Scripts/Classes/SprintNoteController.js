class SprintNoteController {
	constructor(jiraApi, noteManager) {
		this.jiraApi = jiraApi;
		this.noteManager = noteManager;
	}

	async updateSprintNotes() {
		// Fetch sprint data
		const sprints = await this.jiraApi.sprint();

		// Update notes for each sprint
		for (const sprint in sprints) {
			this.noteManager.createOrUpdateNote(sprint);
		}
	}
}
module.exports = SprintNoteController;
