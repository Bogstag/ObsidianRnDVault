---
dependsOnPlugin: "[[Tech/Resources/Software/Obsidian/plugins/Periodic Notes|Periodic Notes]]"
fileclass: template
---
<%* tR = "" -%>
<%*
	moment.locale("sv")

	// Weekly
	if (app.plugins.plugins["periodic-notes"].settings.weekly.enabled) {
		let weeklyFolder = app.plugins.plugins["periodic-notes"].settings.weekly.folder;
		let weeklyFormat = app.plugins.plugins["periodic-notes"].settings.weekly.format;
		const weeklyPath = `${weeklyFolder}/${moment().format(weeklyFormat)}`;
		
		if (!await tp.file.exists(weeklyPath + ".md")) {
			[weeklyFolder, weeklyFormat] = tp.user.splitOnLastSlash(weeklyPath);
			const weeklyTemplate = tp.file.find_tfile(app.plugins.plugins["periodic-notes"].settings.weekly.template);
			await tp.file.create_new(weeklyTemplate, weeklyFormat, false, app.vault.getAbstractFileByPath(weeklyFolder));
		};
	}

	// Monthly
	if (app.plugins.plugins["periodic-notes"].settings.monthly.enabled) {
		let monthlyFolder = app.plugins.plugins["periodic-notes"].settings.monthly.folder;
		let monthlyFormat = app.plugins.plugins["periodic-notes"].settings.monthly.format;
		const monthlyPath = `${monthlyFolder}/${moment().format(monthlyFormat)}`;
		
		if (!await tp.file.exists(monthlyPath + ".md")) {
			[monthlyFolder, monthlyFormat] = tp.user.splitOnLastSlash(monthlyPath);
			const monthlyTemplate = tp.file.find_tfile(app.plugins.plugins["periodic-notes"].settings.monthly.template);
			await tp.file.create_new(monthlyTemplate, monthlyFormat, false, app.vault.getAbstractFileByPath(monthlyFolder));
		};
	}
	
	// quarterly
	if (app.plugins.plugins["periodic-notes"].settings.quarterly.enabled) {
		let quarterlyFolder = app.plugins.plugins["periodic-notes"].settings.quarterly.folder;
		let quarterlyFormat = app.plugins.plugins["periodic-notes"].settings.quarterly.format;
		const quarterlyPath = `${quarterlyFolder}/${moment().format(quarterlyFormat)}`;
		
		if (!await tp.file.exists(quarterlyPath + ".md")) {
			[quarterlyFolder, quarterlyFormat] = tp.user.splitOnLastSlash(quarterlyPath);
			const quarterlyTemplate = tp.file.find_tfile(app.plugins.plugins["periodic-notes"].settings.quarterly.template);
			await tp.file.create_new(quarterlyTemplate, quarterlyFormat, false, app.vault.getAbstractFileByPath(quarterlyFolder));
		};
	}
	
	// yearly
	if (app.plugins.plugins["periodic-notes"].settings.yearly.enabled) {
		let yearlyFolder = app.plugins.plugins["periodic-notes"].settings.yearly.folder;
		let yearlyFormat = app.plugins.plugins["periodic-notes"].settings.yearly.format;
		const yearlyPath = `${yearlyFolder}/${moment().format(yearlyFormat)}`;
		
		if (!await tp.file.exists(yearlyPath + ".md")) {
			[yearlyFolder, yearlyFormat] = tp.user.splitOnLastSlash(yearlyPath);
			const yearlyTemplate = tp.file.find_tfile(app.plugins.plugins["periodic-notes"].settings.yearly.template);
			await tp.file.create_new(yearlyTemplate, yearlyFormat, false, app.vault.getAbstractFileByPath(yearlyFolder));
		};
	}
%>