---
aliases: 
date_created: 2023-09-22 13:02:43
date_modified: 2023-10-31 01:49:45
dependsOnSoftware:
  - "[[Shared Tech/RnD Vault/Obsidian/Obsidian]]"
description: Create and use templates
fileclass: plugin
id: templater-obsidian
isDesktopOnly: false
name: Templater
tags: []
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
version: 1.16.0
---
# Templater

Create and use templates

```dataviewjs
dv.view("toc", {"level": 2, "heading": true, "dv": dv})
```

## Docs

>[!help]- Docs
>
>```gate  
>https://silentvoid13.github.io/Templater/
>height:700
>profile:obsidian
>```

## Repo

>[!bug]- Repo
>
>```gate  
>https://github.com/SilentVoid13/Templater
>height:700
>profile:obsidian
>```

## Templater Notes

### tp.config.run_mode

When launching templater is has a different RunMode depending on how it launched. It can be found in [Templater.ts](https://github.com/SilentVoid13/Templater/blob/9daa97e25cc46ba94eeaf983e93e5c99887f6530/src/core/Templater.ts#L137)

- 0 = CreateNewFromTemplate
	- Create new note from template command.
- 1 = AppendActiveFile
	- When launched from sidebar or Templater: Open Insert Template modal
- 2 = OverwriteFile
	- There is an existing note that you should overwrite. Used when Folder template is run.
- 3 = OverwriteActiveFile
	- Replace templates in the act command.
- 4 = DynamicProcessor
- 5 = StartupTemplate
	- I guess when running Startup Template.

## Snippets

### Adding tp and dv in classes, functions and scripts

```js
const dv = app.plugins.plugins.dataview.api
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object        

// Usally better to pass in dv for DataviewInlineApi, like this:
dv.view("toc", {"level": 2, "heading": true, "dv": dv})
```

### Full Class Example

```js
// in classFile.js
class main {
  constructor() {
    this.dv = app.plugins.plugins.dataview.api
    this.tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object
  }

  someFunction() {
    return this.tp.file.title
  }

  async anotherfunction() {
    return 'foo'
  }
}
module.exports = main
```

```js
// In obsidian in a template	
< %* //Manual edit to breakup tag
// Include the class
const yourClass = new tp.user.classFile()
// Execute a function
yourClass.someFunction()
% > //Manual edit to breakup tag
```

Source: [AlanG message obsidian forum](https://forum.obsidian.md/t/templater-how-to-import-js-function-from-one-file-into-other-file/47720/5)

### Prompt

```javascript
var retVal = await tp.system.prompt("Enter name : ");
document.write("You have entered : " + retVal);
```

### Chooser

```javascript
const choicesToChoose = await tp.system.suggester(["array", "for", "display"], ["return", "array", "yay"]);
```

### Notify

```js
new Notice("Hello world!");
```

### Create File

```javascript
tp.file.create_new(content, title, false);
```

### Update Content

```javascript
// Replace content
const content = tp.file.content;
var replaced = content.replace("status: to-read", "status: currently-reading")

// Write content
const tFile = tp.file.find_tfile(tp.file.title);
const newContent = replaced;
await app.vault.modify(tFile, replaced);
```

### Find/Replace Function

```js
async function findReplace(find, replace) {
// Replace content
const content = tp.file.content;
var replaced = content.replace(find, replace)

// Write content
const tFile = tp.file.find_tfile(tp.file.title);
const newContent = replaced;
await app.vault.modify(tFile, newContent);
}
```

### Move File

```js
const targetFolder = "Example";
if (tp.file.folder != targetFolder) { 
await tp.file.move('/' + targetFolder + '/' + tp.file.title)
}

```

### Append Content

```js
// append content
const filename = tp.date.now("YYYY-MM-DD")
const append = `* 📚Read [[${tp.file.title}]]`

const originalContent = await app.vault.read(tp.file.find_tfile(filename));
const contentNew = `${originalContent} ${append}`
await app.vault.modify(file, contentNew) 
```

### Appending to Dailies

```js
// Append to Daily
var dailyDate = "DATE"; //date of the daily note to append to/create (eg."2022-05-20" or 'tp.file.now("YYYY-MM-DD")'
const append = `* TEXT`; //text to append

const folder = app.vault.getAbstractFileByPath("20 Journals");
if (!tp.file.exists(dailyDate)) {
    await tp.file.create_new(append,dailyDate, false, folder)
new Notice('🆕Created new Daily!');
} else {
    const originalContent = await app.vault.read(tp.file.find_tfile(dailyDate));
    const contentNew = `${originalContent}\n${append}`
    await app.vault.modify(tp.file.find_tfile(dailyDate), contentNew)
new Notice('📌Appended to Daily!');
}
```

### Append with Template

```js
// Append to file
//------------------
// Edit this
var displayName = "Weekly";
var appendFile = "filename";
const append = "string";
var template = "12 Weekly Template";
var folder = "20 Journals"; //of template file
//------------------
// Set vars
template = tp.file.find_tfile(template);
folder = app.vault.getAbstractFileByPath(folder);
// Create if non-existent
if (!tp.file.exists(appendFile)) {
    await tp.file.create_new(template, appendFile, false, folder)
    new Notice(`🆕Created new ${displayName}!`);
}
// Append to file
const originalContent = await app.vault.read(tp.file.find_tfile(appendFile));
const contentNew = `${originalContent}\n${append}`
await app.vault.modify(tp.file.find_tfile(appendFile), contentNew)
new Notice(`📌Appended to ${displayName}`);
```

### Add to File

```javascript
// Add to Kanban
const file = tp.file.find_tfile("Books Kanban");
const newContent = "\n- [ ] [[" + tp.file.title + "]]";
const originalContent = await app.vault.read(file);
const content = `${originalContent} ${newContent}`
await app.vault.modify(file, content)
```

## Settings

```json
{
  "command_timeout": 5,
  "templates_folder": "System/Templates",
  "templates_pairs": [
    [
      "",
      ""
    ]
  ],
  "trigger_on_file_creation": true,
  "auto_jump_to_cursor": true,
  "enable_system_commands": false,
  "shell_path": "\"C:\\Program Files\\PowerShell\\7-preview\\pwsh.exe\"",
  "user_scripts_folder": "System/Scripts",
  "enable_folder_templates": true,
  "folder_templates": [
    {
      "folder": "Shared Tech/RnD Vault/Obsidian/plugins",
      "template": "System/Templates/fileclass/Add Obsidian plugin page.md"
    },
    {
      "folder": "Journal/Daily",
      "template": "System/Templates/Journal/Daily/Daily Journal Template.md"
    },
    {
      "folder": "Journal/Weekly",
      "template": "System/Templates/Journal/Weekly/Weekly Journal Template.md"
    }
  ],
  "syntax_highlighting": true,
  "syntax_highlighting_mobile": false,
  "enabled_templates_hotkeys": [
    "System/Templates/Tasks Menu.md",
    "System/Templates/New note picker.md"
  ],
  "startup_templates": [
    "System/Templates/Templater Startup script.md"
  ],
  "enable_ribbon_icon": true
}
```

## Examples from RunJS

### append_template_to_active_file

Apply / Append the Templater template.

>Obsidian Templater Template - Insert Callout
>https://gist.github.com/eoureo/e77ccd45e468e016b99fdd845fef37fd](https://gist.github.com/eoureo/e77ccd45e468e016b99fdd845fef37fd)

```js

this.app.workspace.setActiveLeaf(this.app.workspace.getLeaf());

let templater = this.app.plugins.plugins["templater-obsidian"].templater;

let file_path = "Templates/Insert Callout.md";
let template_file = this.app.vault.getAbstractFileByPath(file_path);
console.log(template_file);

// async append_template_to_active_file(template_file: TFile): Promise<void>
await templater.append_template_to_active_file(template_file);
```

### Get tp (current_functions_object )

Use tp to open Templater's dialog box.

```js RunJS="{n:'RunJS/Examples/Templater/Dialog',t:'s'}"

const leaf = app.workspace.getLeaf();
// app.workspace.setActiveLeaf(leaf);

const templater = this.app.plugins.plugins["templater-obsidian"].templater;

// if Templater is installed
if (templater) {
  // to create tp (templater.current_functions_object)
  const config = templater.create_running_config("", leaf.view.file, 1);
  const content = await templater.parse_template(config, "");
  const tp = templater.current_functions_object;

  let result = await tp.system.suggester(["one", "two", "three"], ["1", "2", "3"], false, "select?");
  new Notice("select:", result);
  console.log("select:", result);

  let name = await tp.system.prompt("What is your name?", "");
  new Notice("name:", name);
  console.log("name:", name);
}
```

## Resources

- 🔖 [DEMO: How to setup and run your first Templater JS "script" · Discussion #187 · SilentVoid13/Templater](https://github.com/SilentVoid13/Templater/discussions/187)
- 🔖 [Meg's Default Template · Discussion #259 · SilentVoid13/Templater](https://github.com/SilentVoid13/Templater/discussions/259) (prompt for "Untitled" notes)
- [how-to-use-templater-js-scripts - shabegom's Obsidian Tutorials](https://shbgm.ca/obsidian/docs/how-to-use-templater-js-scripts)
- [How to use Templater with class](https://github.com/SilentVoid13/Templater/discussions/1142)
