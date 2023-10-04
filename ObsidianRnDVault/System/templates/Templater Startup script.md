<%*
	locale = "sv"
	moment.locale(locale)

	function splitOnLastSlash(str) {
    const lastIndex = str.lastIndexOf('/');
    // If no slash is found, return the whole string as the second part
    if (lastIndex === -1) {
	     return [null, str];
    }
		const firstPart = str.substring(0, lastIndex);
    const secondPart = str.substring(lastIndex + 1);
    return [firstPart, secondPart];
	}
	
	if (app.plugins.plugins["periodic-notes"].settings.weekly.enabled) {
		let weeklyFolder = app.plugins.plugins["periodic-notes"].settings.weekly.folder;
		let weeklyFormat = app.plugins.plugins["periodic-notes"].settings.weekly.format;
		const weeklyPath = `${weeklyFolder}/${moment().format(weeklyFormat)}`;
		
		if (!await tp.file.exists(weeklyPath)) {
			[weeklyFolder, weeklyFormat] = splitOnLastSlash(weeklyPath);
			const weeklyTemplate = tp.file.find_tfile(app.plugins.plugins["periodic-notes"].settings.weekly.template);
			await tp.file.create_new(weeklyTemplate, weeklyFormat, false, app.vault.getAbstractFileByPath(weeklyFolder));
		};
	}

	/**
	let mnth = tp.date.now('MM MMMM');
	if (!tp.file.exists('[[Personal/Journal/' + yr + '/' + qrtr + '/' + mnth + '/' + mnth + ']]')) {
	  template = tp.file.find_tfile('Periodic Note - Monthly');
	  await tp.file.create_new(template, yr + '/' + qrtr + '/' + mnth + '/' + mnth);
	};
	
	let qrtr = tp.date.now('Qo [Quarter]');
	if (!tp.file.exists('[[Personal/Journal/' + yr + '/' + qrtr + '/' + qrtr + ']]')) {
	  template = tp.file.find_tfile('Periodic Note - Quarterly');
	  await tp.file.create_new(template, yr + '/' + qrtr + '/' + qrtr);
	};
	
	let yr = tp.date.now('YYYY');
	if (!tp.file.exists('[[Personal/Journal/' + yr + '/' + yr + ']]')) {
	  template = tp.file.find_tfile('Periodic Note - Yearly');
	  await tp.file.create_new(template, yr + '/' + yr);
	};
	*/
%>