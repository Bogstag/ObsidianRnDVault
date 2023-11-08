---
date_created: 2023-11-04 14:31:31
date_modified: 2023-11-05 18:27:48
---
# Building My First Utility Functions

I have tried to build myself a module in obsidian without creating a plugin for my self. (at this point i think it maybe more simpler road to go that route.) But who does not like a challenge.

So after much time I think I have a solution, without using any other plugins. But Templater is as close you can get to be a 100% dependency to this solution.

## Script Files

This is my script folder

```text
📦Scripts  
 ┣ 📂Classes  
 ┃ ┣ 📜PeriodicNotesHelper.js  
 ┃ ┗ 📜SvgProgressBar.js  
 ┣ 📂Functions  
 ┃ ┣ 📜ensureTitle.js  
 ┃ ┣ 📜getSeasonFromDate.js  
 ┃ ┣ 📜getTFolder.js   
 ┃ ┗ 📜splitOnLastSlash.js  
 ┣ 📂Utils  
 ┃ ┣ 📜index.cjs  
 ┃ ┗ 📜strings.cjs  
 ┗ 📜Scripts.md
```

So i placed the Utils folder at the same level as the other folder. Nice to have separation. Templaters script folder is Scripts at the top.

### Utils Files

The main reason behind me using cjs, is not to get the "module" feeling. It is that Templater don't care about us. If you change the files to .js, Templater will start giving us errors. I was thinking about putting all files outside Templaters script folder. But it has some strange things happening when I last tried it. I think is haunted.

#### strings.cjs

Simple exports two properties. Nothing fancy.

```js
module.exports.splitOnLastSlash = (str) => {
	const lastIndex = str.lastIndexOf("/");
	// If no slash is found, return the whole string as the second part
	if (lastIndex === -1) {
		return [null, str];
	}
	const firstPart = str.substring(0, lastIndex);
	const secondPart = str.substring(lastIndex + 1);
	return [firstPart, secondPart];
};
module.exports.uppercase = (str) => str.toUpperCase();
```

#### index.cjs

So this is the base Module. It imports the strings and just reexport it. Then you create new functions you don't want to change a lot of other files, just to get it out. So with this solution i can add any new functions to strings and it will be directly available.

```js
const strings = require(`${app.vault.adapter.basePath}\\System\\Scripts\\Utils\\strings.cjs`);

module.exports = function useUtils() {
	return { ...strings };
};
```

### Using the Module

I took help of the old trusted PeriodicNotesHelper and did some testing in the constructor.

```js
// So forst import the module with require.
const useUtils = require(`${app.vault.adapter.basePath}\\System\\Scripts\\Utils\\index.cjs`);
/** 
* => useUtils ƒ useUtils() {
*	    return { ...strings };
* }
*/
const util = useUtils();

// Test the functions if they work.
const test = "somePath/toAfile";
console.debug(util.uppercase(test)); // => "SOMEPATH/TOAFILE"
console.debug(util.splitOnLastSlash(test)); // => [ "somePath", "toAfile" ]
// Success! 👍
```

## Summary

I works, so now back to coding and test some more and start to use it to see what it can do in production :)
