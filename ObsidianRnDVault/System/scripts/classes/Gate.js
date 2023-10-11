class Gate {
	constructor() {
		//this.app = app;
		//this.tp = tp;
	}

	async userGenerate(tp) {
		const clip = await tp.system.clipboard();
		const url = await tp.system.prompt("Enter URL:", clip, true);
		const height = await tp.system.prompt(
			"Enter height of frame:",
			"600",
			true,
		);
		const profile = await tp.system.suggester(
			["Public", "Private", "Work", "Other"],
			["public", "private", "work", "other"],
			true,
			"Select profile:",
		);

		let content = "```gate" + "\n";
		content += url + "\n";
		content += "height: " + height + "\n";
		content += "profile: " + profile + "\n";
		content += "```" + "\n";

		return content;
	}
}
