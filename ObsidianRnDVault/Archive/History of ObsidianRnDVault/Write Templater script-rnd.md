---
aliases: []
date_created: 2023-09-18 20:17:45
date_modified: 2023-09-18 23:31:13
tags: []
---

# Write Templater script

## Plan

1. Templater Custom Script:
	 - Create a new JavaScript file in your designated `Scripts` folder (as per Templater's settings) for the Templater script.
	 - Within this script, use the `obsidian.requestUrl` function to get data from your API.
	 - Extract the necessary data from the API response.
	 - Return the extracted data so it can be used in the template.

1. Templater Configuration:
	 - Ensure Templater settings are pointing to the correct `Scripts` folder.
	 - In your template, call the script you created using the `tp.user.script_name` syntax to fetch and insert the data.

1. Note Creation Process:
	 - When you create a new note using the specific template, Templater will run the script to fetch data from the API and then insert it into the note.

## Implementation

### 1. Templater Custom Script

Create a new script, say `fetchAPIdata.js`, inside your `Scripts` folder:

```javascript
const obsidian = require('obsidian');

async function fetchAPIdata() {
    // Define your API endpoint
    const endpoint = "YOUR_API_ENDPOINT_HERE";

    // Fetch data using obsidian.requestUrl
    const response = await obsidian.requestUrl(endpoint);

    // Extract necessary information
    const data = JSON.parse(response);
    const username = data.username;
    const email = data.email;
    // Add any other data points you need

    // Return the necessary data
    return {
        username: username,
        email: email
    };
}

module.exports = fetchAPIdata;
```

### 3. Templater Configuration

In your template:

```markdown
<%* 
    const data = await tp.user.fetchAPIdata();
%>

### Username
<% `${data.username}` %>

### Email
<% `${data.email}` %>

<!-- Add other template content as needed -->
```

### 4. Note Creation Process

Every time you create a note using this template, Templater will fetch data from the API and insert the `username` and `email` (and any other data points you've specified) into the note.

## Notes

### CommonJS

CommonJS allows you to export multiple values (functions, objects, etc.) from a module. While Templater expects a single function to be exported from a script, this doesn't mean you can't have multiple functions within the script. You just need to ensure that only one of them is exported.

Here's how you can structure a script with multiple functions but export only one:

```javascript
// Define a helper function
function helperFunction(data) {
    // Do something with the data
    return transformedData;
}

// Define the main function which will be exported
async function mainFunction() {
    // Use the helper function
    const result = helperFunction(someData);
    
    // Continue processing
    // …

    return finalResult;
}

// Export the main function
module.exports = mainFunction;
```

In this example, `helperFunction` is a function that exists only within the script and is not accessible from outside the module. Only `mainFunction` is exported and thus can be accessed when this module is `require`d in another module or when Templater invokes the script.

If you want to export multiple values, you can export an object:

```javascript
module.exports = {
    mainFunction: mainFunction,
    anotherFunction: anotherFunction
};
```

## Result

### Templater template

```markdown
<%* 
    const series = await tp.user.fetchSonarrMissing();
%>

# Missing episodes per serie
<%* series.forEach(serie => { 
    tR += `## ${serie.title}\n\n| SE | Title | Air Date |\n|----|-------|----------|--------|\n`;
    serie.episodes.forEach(episode => { 
        tR += `| ${episode.seNumber} | ${episode.title} | ${episode.airDate} |\n`;
    });
}); %>
```

### Templater script

```javascript
const obsidian = require("obsidian");

function formatSeasonEpisode(seasonNumber, episodeNumber) {
	let formattedVariable =
		"S" +
		String(seasonNumber).padStart(2, "0") +
		"E" +
		String(episodeNumber).padStart(2, "0");
	return formattedVariable;
}

function processJsonRecords(records) {
	const seriesMap = {};
	for (const episode of records) {
		const seriesId = episode.series.id;
		if (!seriesMap[seriesId]) {
			seriesMap[seriesId] = {
				id: seriesId,
				title: episode.series.title,
				episodes: [],
			};
		}

		const episodeData = {
			airDate: episode.airDate,
			seNumber: formatSeasonEpisode(
				episode.seasonNumber,
				episode.episodeNumber
			),
			id: episode.id,
			title: episode.title,
			tvdbId: episode.tvdbId,
		};

		seriesMap[seriesId].episodes.push(episodeData);
	}
	console.log("Object.values(seriesMap)", Object.values(seriesMap));
	return Object.values(seriesMap);
}

async function fetchAPIdata() {
	// Define your API endpoint

	const options = {
		url: "XXX",
		method: "GET",
		headers: {
			"X-Api-Key": "XXX",
		},
	};

	// Fetch data using obsidian.requestUrl
	const response = await obsidian.requestUrl(options);
	console.log("response", response.json.records);
	let output = processJsonRecords(response.json.records);

	console.log("output", output);

	// Add any other data points you need

	// Return the necessary data
	return output;
}

module.exports = fetchAPIdata;

```

## Summary

A stupid way of doing this kind of operations on a whole page, its hard to update. But it works, so some progress and a lot of new knowledge.
