---
date_created: 2023-10-05 09:00:00
date_modified: 2023-10-14 23:03:05
---
# Object Keys and Values

## Example

```js
getInstalledPlugins(app) {
	let plugins = app.plugins.plugins;
	let pluginKeys = Object.keys(plugins);
	let result = [];
	for (let pluginKey of pluginKeys) {
		result[pluginKey] = plugins[pluginKey].manifest.name;
	}

	return {
		result: result,
		plugins: plugins,
	};
}

let output = getInstalledPlugins(appInstance);
console.log(output.result);  // This will log your custom result object
console.log(output.plugins); // This will log the original plugins object

output.result is like this array:
alx-folder-note: "AidenLx's Folder Note"
buttons: "Buttons"
cm-editor-syntax-highlight-obsidian: "Editor Syntax Highlight"
cmdr: "Commander"
custom-sort: "Custom File Explorer sorting"

Object.keys(result) // Returns alx-folder-note
Object.values(result) // Returns AidenLx's Folder Note

let givenKey = someFunctionThatReturnsTheKey();
let correspondingValue = result[givenKey]; 
// correspondingValue = AidenLx's Folder Note

let givenValue = someFunctionThatReturnsTheValue();
let correspondingKey = Object.keys(plugins).find(key => plugins[key] === givenValue);
// correspondingKey = alx-folder-note
```

## Sort This Object by Its Keys, only First Level

```js
const sortedData = Object.keys(data)
    .sort()
    .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
    }, {});
```

## Recursive Function that Sorts All Levels of a Nested Object

```js
function sortObject(obj) {
    if (typeof obj !== 'object' || obj === null) return obj; // Return if not object or null

    if (Array.isArray(obj)) return obj.map(sortObject); // Return sorted array if obj is array

    // Sort object keys
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
            acc[key] = sortObject(obj[key]);
            return acc;
        }, {});
}

const sortedNestedData = sortObject(data);
```

This function will sort all keys of a nested JSON object.
