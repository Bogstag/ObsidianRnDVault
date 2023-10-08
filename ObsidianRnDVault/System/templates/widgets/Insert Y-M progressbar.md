---
dependsOnScript: "[[System/scripts/functions/makeProgressBar.js|makeProgressBar.js]]"
fileclass: template
---
<%* tR = "" -%>
<%*
	let fileCreated = tp.file.creation_date("YYYY-MM-DD");
	let dayNum = moment(fileCreated).dayOfYear();
	let fileDateNum = moment(fileCreated).format("D");
	let numDays = moment(fileCreated).daysInMonth();
	
	tR += tp.user.makeProgressBar(dayNum, 365, size=33,filledChar = "█", unFilledChar = "◽", label="Year");
	tR += "\n";
	tR += tp.user.makeProgressBar(fileDateNum, numDays, size=numDays, filledChar = "█", unFilledChar = "◽", label="Month");
_%>
