<%*
	locale = "sv"
	moment.locale(locale)
	
	let weeklyFormat = tp.date.now(app.plugins.plugins["periodic-notes"].settings.weekly.format);
	let weeklyFolder = app.plugins.plugins["periodic-notes"].settings.weekly.folder;

	if (await !tp.file.exists(`${weeklyFolder}/${weeklyFormat}`)) {
	  const weeklyTemplate = tp.file.find_tfile(app.plugins.plugins["periodic-notes"].settings.weekly.template);
	  console.log("weeklyTemplate", weeklyTemplate);
	  
	  await tp.file.create_new(weeklyTemplate, weeklyFormat, false, app.vault.getAbstractFileByPath(weeklyFolder));
	};

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