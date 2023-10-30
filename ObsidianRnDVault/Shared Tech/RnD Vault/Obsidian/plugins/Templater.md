---
aliases: 
date_created: 2023-09-22 13:02:43
date_modified: 2023-10-05 03:05:39
dependsOnSoftware:
  - "[[Shared Tech/RnD Vault/Obsidian/Obsidian]]"
description: Create and use templates
fileclass: plugin
id: templater-obsidian
isDesktopOnly: false
name: Templater
tags:
  - 
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
version: 1.16.0
---
# Templater

Create and use templates

```dataviewjs
dv.view("toc", {"level": 2, "heading": true})
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

## Templater notes

### tp.config.run_mode

When launching templater is has a different RunMode depending on how it launched. It can be found in [Templater.ts](https://github.com/SilentVoid13/Templater/blob/9daa97e25cc46ba94eeaf983e93e5c99887f6530/src/core/Templater.ts#L137) and [this is a small RunMode test](https://www.typescriptlang.org/play?ssl=24&ssc=43&pln=10&pc=1#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBFHsRCgR5cACy8G4KAA3ooSiUAMKTBQAOUgEgAYmxEDhIIgFnVILxWWyKgQiDwKrB6np+ZjJdKSgB5PRkCQ2SCq9xStmgbXfPXySCK5UGtXGtkAERODEQ6lobAsgkE8DI9pKxFQjlQ7AIIrFjFsigAvsEEJxve4AtB4MwABQAIgADOn+DTOPTGQFOR4eXzBUgw+KFABKADcijjCcgSZTGYAjDnqXSGc3ZfLuNbdLb3HWG40my20+mAEydvMF5tm3X6w2QUeN+CJ5NTgDMc+7haXFoUg5VavX483ze3GYALPv8z2Ak7OC63R79N6yBf41fJxmAFYHwXAIAyDENKwjNd62CYocGaDwyC8RAfWcYF2BoL43DMZh2AYZhJRMaB1ESBhgT0EQvHTABRVYXQWfR0ySbF03ABxUAAcmEXkJHTIIVE1L5dSEQiCKOQMyAUVxpDwUAnBQnRhiwfQUAQRBoWES4sIkH1ohEAwOGxcUWDYLhuCCEogA).

#### 0 = CreateNewFromTemplate

Templater: Create new note from template command.

```js
// Template Overwrites Target

tp.config.active_file
	.basename // "ActiveNote"
	.name // "ActiveNote.md"
	.active_file.path // "Folder/ActiveNote.md"

tp.config.target_file
	.basename // "Untitled"
	.name // "Untitled.md"
	.target_file.path // "Inbox/Untitled.md"
	
tp.config.template_file
	.basename // "Template"
	.name // "Template.md"
	.template_file.path // "System/TemplateFolder/Template.md"
```

#### 1 = AppendActiveFile

When launched from sidebar or Templater: Open Insert Template modal

```js
// The active file is the target

// same as tp.config.active_file
tp.config.target_file
	.basename // "Untitled"
	.name // "Untitled.md"
	.target_file.path // "Inbox/Untitled.md"

tp.config.template_file
	.basename // Template name
	.name // Template name with ext (.md)
	.template_file.path // Template full path incl ext (.md)
```

#### 2 = OverwriteFile

There is an existing note that you should overwrite. Used when Folder template is run.

```js
// Template Overwrites Target

tp.config.active_file
	.basename // "ActiveNote"
	.name // "ActiveNote.md"
	.active_file.path // "Folder/ActiveNote.md"

tp.config.target_file
	.basename // "Untitled"
	.name // "Untitled.md"
	.target_file.path // "Inbox/Untitled.md"
	
tp.config.template_file
	.basename // "Template"
	.name // "Template.md"
	.template_file.path // "System/TemplateFolder/Template.md"
```

#### 3 = OverwriteActiveFile

Templater: Replace templates in the act command.

```js
// Its all the same

// same as tp.config.template_file
// same as tp.config.active_file
tp.config.target_file
	.basename // "Untitled"
	.name // "Untitled.md"
	.target_file.path // "Inbox/Untitled.md"
```

#### 4 = DynamicProcessor

#### 5 = StartupTemplate

I guess when running Startup Template.

## Snippets

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

### Create file

```javascript
tp.file.create_new(content, title, false);
```

### Update content

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

### Move file

```js
const targetFolder = "Example";
if (tp.file.folder != targetFolder) { 
await tp.file.move('/' + targetFolder + '/' + tp.file.title)
}

```

### Append content

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

### Append with template

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

### Add to file

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
  "templates_folder": "System/templates",
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
  "user_scripts_folder": "System/scripts/Templater",
  "enable_folder_templates": true,
  "folder_templates": [
    {
      "folder": "Tech/Software/Obsidian/plugins",
      "template": "System/templates/fileclass/Add Obsidian plugin page.md"
    },
    {
      "folder": "Journal/Daily",
      "template": "System/templates/Journal/Daily/Daily Journal Template.md"
    },
    {
      "folder": "Journal/Weekly",
      "template": "System/templates/Journal/Weekly/Weekly Journal Template.md"
    },
    {
      "folder": "Inbox",
      "template": "System/templates/Test/test templater.md"
    }
  ],
  "syntax_highlighting": true,
  "syntax_highlighting_mobile": false,
  "enabled_templates_hotkeys": [],
  "startup_templates": [
    "System/templates/Templater Startup script.md"
  ],
  "enable_ribbon_icon": true
}
```

## RunJS Examples

### append_template_to_active_file

Let's apply the Templater template (link below) I created.

>Obsidian Templater Template - Insert Callout
>https://gist.github.com/eoureo/e77ccd45e468e016b99fdd845fef37fd](https://gist.github.com/eoureo/e77ccd45e468e016b99fdd845fef37fd)

```js RunJS="{n:'RunJS/Examples/Templater/Insert Callout',t:'s'}"

this.app.workspace.setActiveLeaf(this.app.workspace.getLeaf());

let templater = this.app.plugins.plugins["templater-obsidian"].templater;

let file_path = "Templates/Insert Callout.md";
let template_file = this.app.vault.getAbstractFileByPath(file_path);
console.log(template_file);

// async append_template_to_active_file(template_file: TFile): Promise<void>
await templater.append_template_to_active_file(template_file);
```

### Get Tp (current_functions_object )

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
