---
date_created: 2023-10-04 22:36:22
date_modified: 2023-10-04 22:37:59
---
# RunJS Examples

```js RunJS="{n:'RunJS/Examples/Write/append',t:'s'}"
// import { appendAtHeading } from 'Write/writeAtHeading';
import { appendAtHeading } from 'RunJS/Utils';
import { moment } from 'obsidian';

const filePath = "pages/Test - Add Text.md";
const heading = "Heading 1-2-3";
const text = "Hello, World!\n" + moment().format() + "\n";

await appendAtHeading(this.app, filePath, heading, text, true);
// await writeAtHeading(this.app, filePath, heading, text, "append", true);
```

```js RunJS="{n:'RunJS/Examples/Write/insert',t:'s'}"
// import { insertAtHeading } from 'Write/writeAtHeading';
import { insertAtHeading } from 'RunJS/Utils';
import { moment } from 'obsidian';

const filePath = "pages/Test - Add Text.md";
const heading = "Heading 1-2-3";
const text = "\nHello, World!\n" + moment().format();

await insertAtHeading(this.app, filePath, heading, text, true);
// await writeAtHeading(this.app, filePath, heading, text, "insert", true);
```

```js RunJS="{n:'RunJS/Examples/Write/replace',t:'s'}"
// import { replaceAtHeading } from 'Write/writeAtHeading';
import { replaceAtHeading } from 'RunJS/Utils';
import { moment } from 'obsidian';

const filePath = "pages/Test - Add Text.md";
const heading = "Heading 1-2-3";
const text = "\nHello, World!\n" + moment().format() + "\n";

await replaceAtHeading(this.app, filePath, heading, text);
// await writeAtHeading(this.app, filePath, heading, text, "replace");
```

```js RunJS="{n:'RunJS/Examples/Event/code-menu/Copy code name'}"
const [menu, code] = arguments;

menu.addItem((item) => {
  menu.dom.appendChild(item.dom);
  item.setTitle("Copy code name")
    .setIcon("lucide-copy")
    .setSection("runjs-codelist-view")
    .onClick(async () => {
      window.navigator.clipboard.writeText(code.name);
    });
});
```

```js RunJS="{n:'RunJS/Examples/Event/code-menu/Open object modal'}"
const [menu, code] = arguments;

if (code.type === "script") return;

menu.addItem((item) => {
  menu.dom.appendChild(item.dom);
  item.setTitle("Open object modal")
    .setIcon("lucide-puzzle")
    .setSection("runjs-codelist-view")
    .onClick(async () => {
      const module = await this.import(code.name);
      this.openObjectModal(module);
    });
});
```

```js RunJS="{n:'RunJS/Examples/RunJS/Dialog-alert',t:'s'}"
/**
 * alert
 * 
 * async alert(message: string): Promise<void>
 */
// await this.alert("Hello, World!"); // O.K.

let runJS = this.app.plugins.plugins["runjs"];
await runJS.alert("Hello, World!");
```

```js RunJS="{n:'RunJS/Examples/RunJS/Dialog-confirm',t:'s'}"
/**
 * confirm
 * 
 * async confirm(message: string): Promise<boolean>
 */
// let return_value = await this.confirm("Are you ready?"); // O.K.

let runJS = this.app.plugins.plugins["runjs"];
let return_value = await this.confirm("Are you ready?");

await this.alert("Your answer: " + return_value);
// console.log("return_value:", return_value);
```

```js RunJS="{n:'RunJS/Examples/RunJS/Dialog-prompt',t:'s'}"
/**
 * prompt
 * 
 * async prompt(message: string, messagDefault: string = "", placeholder: string = "", multiLine: boolean = false): Promise<string | null>
 */
let return_value = await this.prompt("What is your name? (input text)" , "", "Enter your name here", false);

await this.alert("return_value: " + return_value);

// multiple line
let return_value2 = await this.prompt("What is your comment? (textarea)" , "", "Enter your comment here", true);

await this.alert("Your answer: " + return_value2);
```

```js RunJS="{n:'RunJS/Examples/RunJS/Dialog-suggest',t:'s'}"
/**
 * suggest
 * 
 * async suggest(message: string, list: string[], placeholder: string = ""): Promise<string | null>
 */
let return_value = await this.suggest("Select one", ["one", "two", "three", "four", "five"] , "select");

await this.alert("Your answer: " + return_value);
```

```js RunJS="{n:'RunJS/Examples/Event/file-menu/Open with VSCode'}"
// on_8 - Developer Documentation  
// https://docs.obsidian.md/Reference/TypeScript+API/Workspace/on_8  
// on(name: 'file-menu', callback: (menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf) => any, ctx?: any): EventRef;
import { openVSCode } from "VSCode/openVSCode";

const [menu, file, source, leaf] = arguments;

menu.addItem((item) => {
  menu.dom.appendChild(item.dom);
  item.setTitle("Open with VSCode")
    .setIcon("document")
    .setSection("runjs-codelist-view")
    .onClick(async () => {
      const url = require('url');

      let filePath = url.fileURLToPath(app.vault.adapter.getFilePath(file.path).href);
      openVSCode(filePath);
    });
});
```

```js RunJS="{n:'RunJS/Examples/Event/file-menu/Copy file path'}"
const [menu, file, source, leaf] = arguments;

menu.addItem((item) => {
  menu.dom.appendChild(item.dom);
  item.setTitle("Copy file path")
    .setIcon("lucide-copy")
    .setSection("runjs-codelist-view")
    .onClick(async () => {
      window.navigator.clipboard.writeText(file.path);
    });
});
```

```js RunJS="{n:'RunJS/Examples/Event/editor-menu/Open with VSCode - selection'}"
// on_9 - Developer Documentation  
// https://docs.obsidian.md/Reference/TypeScript+API/Workspace/on_9  
// on(name: 'editor-menu', callback: (menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo) => any, ctx?: any): EventRef;
const [menu, editor, info, leaf] = arguments;

menu.addItem((item) => {
  item
    .setTitle("Open with VSCode - selection")
    .setIcon("document")
    .onClick(async () => {
      this.runCodeByName("Open with/VSCode - selection");
    });
});
  
```

```js RunJS="{n:'RunJS/Examples/frontmatter/Toggle cssclass width-100',t:'s'}"
/*
 * processFrontMatter(file: TFile, fn: (frontmatter: any) => void): Promise<void>;
 * 
 * processFrontMatter - Developer Documentation  
 * {@link https://docs.obsidian.md/Reference/TypeScript+API/FileManager/processFrontMatter}
 * 
 * FileManager | Obsidian Plugin Developer Docs  
 * {@link https://marcus.se.net/obsidian-plugin-docs/reference/typescript/classes/FileManager#processfrontmatter}  
 */
const frontmatterName = "cssclass";
const frontMatterValue = "width-100";

const leaf = this.app.workspace.getLeaf();
this.app.workspace.setActiveLeaf(leaf);

const file = leaf.view.file;

this.app.fileManager.processFrontMatter(file, (frontMatter) => {
	let frontMatterKey = frontMatter[frontmatterName];
	if(frontMatterKey?.split(/\s+/).contains(frontMatterValue)) {
		let splits = frontMatterKey.split(/\s+/);
		splits.splice(splits.indexOf(frontMatterValue), 1);
		frontMatterKey = splits.join(" ");
	}
	else {
		if(frontMatterKey) frontMatterKey += " " + frontMatterValue;
		else frontMatterKey = frontMatterValue;
	}
	frontMatter[frontmatterName] = frontMatterKey;
});
```

```js RunJS="{n:'RunJS/Examples/frontmatter/Set Now to Modified Date',t:'s'}"
const frontmatterName = "date modified";

const now = new Date();
const year = now.getFullYear();
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const date = ("0" + now.getDate()).slice(-2);
const hours = ("0" + now.getHours()).slice(-2);
const minutes = ("0" + now.getMinutes()).slice(-2);
const seconds = ("0" + now.getSeconds()).slice(-2);

const frontMatterValue = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

const leaf = this.app.workspace.getLeaf();
this.app.workspace.setActiveLeaf(leaf);

const file = leaf.view.file;

this.app.fileManager.processFrontMatter(file, (frontMatter) => {
	frontMatter[frontmatterName] = frontMatterValue;
});
```

```js RunJS="{n:'RunJS/Examples/Edit/insertCallout 0',t:'s'}"
import { insertCallout } from 'RunJS/Utils';
insertCallout(this.app, 0);
```

```js RunJS="{n:'RunJS/Examples/Edit/insertCallout 1',t:'s'}"
import { insertCallout } from 'RunJS/Utils';
insertCallout(this.app, 1);
```

```js RunJS="{n:'RunJS/Examples/Edit/insertCallout 2',t:'s'}"
import { insertCallout } from 'RunJS/Utils';
insertCallout(this.app, 2);
```

```js RunJS="{n:'RunJS/Examples/Edit/insertCallout 3',t:'s'}"
import { insertCallout } from 'RunJS/Utils';
insertCallout(this.app, 3);
```

```js RunJS="{n:'RunJS/Examples/Daily notes/Add list (HH:MM) to Today',t:'s'}"
/**
 * Add list (HH:MM) to Today's daily note.
 * 
 * "- 08:30 "
 */
const now = new Date();

let hours = ("0" + now.getHours()).slice(-2);
let minutes = ("0" + now.getMinutes()).slice(-2);

const todayNote = await this.app.internalPlugins.plugins["daily-notes"].instance.getDailyNote();

let todayLeaf;
let firstDailyNoteLeaf;
let aLeaf = this.app.workspace.getLeaf();

if (aLeaf.view.file == todayNote) {
  todayLeaf = aLeaf;
} else {
  this.app.workspace.iterateAllLeaves(leaf=>{
    if (leaf.view.file == todayNote) {
      todayLeaf = leaf;
    } else if (firstDailyNoteLeaf == undefined && todayNote.parent.path == leaf.view?.file?.parent.path) {
      firstDailyNoteLeaf = leaf;
    }
  });

  if (todayLeaf == undefined && firstDailyNoteLeaf != undefined) {
    todayLeaf = firstDailyNoteLeaf;
  }

  if (todayLeaf) await this.app.workspace.setActiveLeaf(todayLeaf);
  else todayLeaf = aLeaf;

  let commands = this.app.internalPlugins.plugins["daily-notes"].commands;
  commands.find(c => c.id=="daily-notes")?.callback();

  for(var i = 0; i < 30; i++) {
    aLeaf = this.app.workspace.getLeaf();
    if (aLeaf.view.file == todayNote) {
      todayLeaf = aLeaf;
      break;
    }
    await sleep(100);
  }
}

let editor = todayLeaf.view?.editor;
if (editor) {
  let viewState = todayLeaf.getViewState();
  viewState.state.mode = "source";
  todayLeaf.setViewState(viewState);
  await sleep(100);
  let textNew = "- " + hours + ":" + minutes + " ";
  let textNewLength = textNew.length;
  let lastLine = editor.lastLine();
  let lastLineText = editor.getLine(lastLine);
  if(lastLineText != "" && !/^\s*\-\s*$/.test(lastLineText)) {
    lastLine += 1;
    textNew = "\n" + textNew;
  }
  editor.setLine(lastLine, textNew);
  editor.focus();
  editor.setCursor(lastLine, textNewLength);
} else {
  new Notice("No editor!")
}
```

Open today's daily note - simple

```js RunJS="{n:'RunJS/Examples/Daily notes/Today - simple',t:'s'}"
/**
 * Open today's daily note - simple
 */
let commands = this.app.internalPlugins.plugins["daily-notes"].commands;

commands.find(c => c.id=="daily-notes")?.callback();
```

Open today's daily note

```js RunJS="{n:'RunJS/Examples/Daily notes/Today',t:'s'}"
/**
 * Open today's daily note
 */
import * as obsidian from 'obsidian';

const aLeaf = this.app.workspace.getLeaf();

const dailyNotes = this.app.internalPlugins.plugins["daily-notes"];
const todayNote = await dailyNotes.instance.getDailyNote();

let todayLeaf;
let firstDailyNoteLeaf;

if (aLeaf.view.file == todayNote) {
  return;
} else {
  this.app.workspace.iterateAllLeaves(leaf=>{
    if (leaf.view.file == todayNote) {
      todayLeaf = leaf;
    } else if (firstDailyNoteLeaf == undefined && leaf.view.file?.parent != null && todayNote.parent.path == leaf.view.file.parent.path) {
      firstDailyNoteLeaf = leaf;
    }
  });
}

if (todayLeaf != undefined) {
  this.app.workspace.setActiveLeaf(todayLeaf);
  return;
} else if (firstDailyNoteLeaf != undefined) {
  await this.app.workspace.setActiveLeaf(firstDailyNoteLeaf);
}

dailyNotes.commands.find(c => c.id=="daily-notes")?.callback();
```

Open previous daily note - simple

```js RunJS="{n:'RunJS/Examples/Daily notes/Previous - simple',t:'s'}"
/**
 * Open previous daily note - simple
 */
const leaf = this.app.workspace.getLeaf();
this.app.workspace.setActiveLeaf(leaf);

const dailyNotes = this.app.internalPlugins.plugins["daily-notes"];
const name = leaf.view.file.basename;
const format = dailyNotes.instance.options.format ?? "YYYY-MM-DD";

const commands = dailyNotes.commands;

if(window.moment(name, format, true).isValid()) {
  commands.find(c => c.id=="daily-notes:goto-prev")?.checkCallback(false);
}
else {
  commands.find(c => c.id=="daily-notes")?.callback();
}
```

Open previous daily note

```js RunJS="{n:'RunJS/Examples/Daily notes/Previous',t:'s'}"
/**
 * Open previous daily note
 */
const aLeaf = this.app.workspace.getLeaf();

const dailyNotes = this.app.internalPlugins.plugins["daily-notes"];
const todayNote = await dailyNotes.instance.getDailyNote();

let todayLeaf;
let firstDailyNoteLeaf;

if (aLeaf.view.file == todayNote) {
  todayLeaf = aLeaf;
} else {
  this.app.workspace.iterateAllLeaves(leaf=>{
    if (leaf.view.file == todayNote) {
      todayLeaf = leaf;
    } else if (firstDailyNoteLeaf == undefined && leaf.view.file?.parent != null && todayNote.parent.path == leaf.view.file.parent.path) {
      firstDailyNoteLeaf = leaf;
    }
  });
}

if (todayLeaf != undefined) {
  await this.app.workspace.setActiveLeaf(todayLeaf);
} else if (firstDailyNoteLeaf != undefined) {
  await this.app.workspace.setActiveLeaf(firstDailyNoteLeaf);
}

dailyNotes.commands.find(c => c.id=="daily-notes:goto-prev")?.checkCallback(false);
```

Open next daily note - simple

```js RunJS="{n:'RunJS/Examples/Daily notes/Next - simple',t:'s'}"
/**
 * Open next daily note - simple
 */
const leaf = this.app.workspace.getLeaf();
this.app.workspace.setActiveLeaf(leaf);

const dn = this.app.internalPlugins.plugins["daily-notes"];
const name = leaf.view.file.basename;
const format = dn.instance.options.format ?? "YYYY-MM-DD";

const commands = dn.commands;

if(window.moment(name, format, true).isValid()) {
  commands.find(c => c.id=="daily-notes:goto-next")?.checkCallback(false);
}
else {
  commands.find(c => c.id=="daily-notes")?.callback();
}
```

Open next daily note

```js RunJS="{n:'RunJS/Examples/Daily notes/Next',t:'s'}"
/**
 * Open next daily note
 */
const aLeaf = this.app.workspace.getLeaf();

const dailyNotes = this.app.internalPlugins.plugins["daily-notes"];
const todayNote = await dailyNotes.instance.getDailyNote();

let todayLeaf;
let firstDailyNoteLeaf;

if (aLeaf.view.file == todayNote) {
  todayLeaf = aLeaf;
} else {
  this.app.workspace.iterateAllLeaves(leaf=>{
    if (leaf.view.file == todayNote) {
      todayLeaf = leaf;
    } else if (firstDailyNoteLeaf == undefined && leaf.view.file?.parent != null && todayNote.parent.path == leaf.view.file.parent.path) {
      firstDailyNoteLeaf = leaf;
    }
  });
}

if (todayLeaf != undefined) {
  await this.app.workspace.setActiveLeaf(todayLeaf);
} else if (firstDailyNoteLeaf != undefined) {
  await this.app.workspace.setActiveLeaf(firstDailyNoteLeaf);
}

dailyNotes.commands.find(c => c.id=="daily-notes:goto-next")?.checkCallback(false);
```

```js RunJS="{n:'RunJS/Examples/Edit/Two Spaces: Insert',t:'s'}"
/**
 * Insert two spaces at the beginning of selected lines
 * 선택된 줄들의 첫 머리에 공백 두 개 넣기
 */
let view = this.app.workspace.getActiveFileView();
let editor = view?.editor;

if(editor) {
  let listSelection = editor.listSelections()[0];
  
  let line_start;
  let line_end;
  if(listSelection.anchor.line > listSelection.head.line) {
    line_start = listSelection.head.line;
    line_end = listSelection.anchor.line;
  }
  else {
    line_start = listSelection.anchor.line;
    line_end = listSelection.head.line;
  }
  
  for(let line = line_start; line <= line_end; line++) {
    editor.setLine(line, "  " + editor.getLine(line));
  }
}
else {
  new Notice("Error: No Editor.");
}
```

```js RunJS="{n:'RunJS/Examples/Edit/Two Spaces: Remove',t:'s'}"
/**
 * Remove two spaces at the beginning of selected lines
 * 선택된 줄들의 첫 머리에 공백 두 개 지우기
 */
let view = this.app.workspace.getActiveFileView();
let editor = view?.editor;

if(editor) {
  let listSelection = editor.listSelections()[0];
  
  let line_start;
  let line_end;
  if(listSelection.anchor.line > listSelection.head.line) {
    line_start = listSelection.head.line;
    line_end = listSelection.anchor.line;
  }
  else {
    line_start = listSelection.anchor.line;
    line_end = listSelection.head.line;
  }
  
  for(let line = line_start; line <= line_end; line++) {
    editor.setLine(line, editor.getLine(line).replace(/^\s{1,2}/,""));
  }
}
else {
  new Notice("Error: No Editor.");
}
```

JS Comment

```js RunJS="{n:'RunJS/Examples/Edit/JS comment: toggle',t:'s'}"
/**
 * Selected lines - JS Comment toggle "// "
 * 선택된 줄들 - 자바스크립트 주석 전환(토글) "// "
 */

let view = this.app.workspace.getActiveFileView();
let editor = view?.editor;

if(editor) {
  let listSelection = editor.listSelections()[0];
  
  let line_start;
  let line_end;
  if(listSelection.anchor.line > listSelection.head.line) {
    line_start = listSelection.head;
    line_end = listSelection.anchor;
  }
  else {
    line_start = listSelection.anchor;
    line_end = listSelection.head;
  }
  line_start.ch = 0;
  line_end.ch = editor.getLine(line_end.line).length;
  let lines = editor.getRange(line_start, line_end).split("\n");
  
  let spaces;
  let isAllCommented = true;
  for(let line of lines) {
    let match = line.match(/^(\s*)(\/\/)?/);
    if(isAllCommented && line.trim() != "" && match[2] == undefined) {
      isAllCommented = false;
    }
    if(spaces == undefined) {
      spaces = match[1];
      continue;
    }
    if(spaces.length > match[1].length) spaces = spaces.slice(0, match[1].length);
    for(let ch = 0; ch < spaces.length; ch++) {
      if(spaces[ch] != match[1][ch]) {
        spaces = spaces.slice(0, ch);
        break;
      }
    }
  }
  
  let spaces_length  = spaces.length;
  if(isAllCommented) {
    let regExp = /^(\s*)\/\/\s?/;
    for(let l = 0; l < lines.length; l++) {
      lines[l] = spaces + lines[l].slice(spaces_length).replace(regExp, "$1");
    }
  }
  else {
    for(let l = 0; l < lines.length; l++) {
      lines[l] = spaces + "// " + lines[l].slice(spaces_length);
    }
  }
  
  editor.replaceRange(lines.join("\n"), line_start, line_end);
}
else {
  new Notice("Error: No Editor.");
}
```

```js RunJS="{n:'RunJS/Examples/Edit/URL: path To FileURL',t:'s'}"
/**
pathToFileURL

D:\data\my notes (1)\home.md
file:///D:/data/my%20notes%20(1)/home.md

[](D:\data\my notes\home.md)
[](file:///D:/data/my%20notes/home.md)
 */
const url = require('url');
import { getSelection, setSelection, replaceSelection } from 'RunJS/Utils';

let selection = await getSelection(this.app);

if(selection.length == 0) return;

let match = selection.match(/\]\((.*)\)/);

// Replace link in Markdown format
// Markdown 형식의 링크를 바꿈
if(match) {
  replaceSelection(this.app, /\]\((.*)\)/g, (m) => {
    let match = m.match(/\]\((.*)\)/);
    let str_new = url.pathToFileURL(match[1]);
    return "](" + str_new + ")";
  });
  return;
}

// Replace the entire selected text
// 선택된 전체 텍스트를 바꿈
let url_new = url.pathToFileURL(selection);
setSelection(this.app, url_new.toString());
```

```js RunJS="{n:'RunJS/Examples/Event/Add command icon'}"
import { ItemView, setIcon } from 'obsidian';

this.app.workspace.iterateAllLeaves((leaf) => {
    console.log("Add command icon");
    if (!(leaf.view instanceof ItemView)) return;		
    if (!(leaf.view?.headerEl)) return;
    
    const commandId = "my_icon";
    
    // to avoid duplication
    const olds = leaf.view.headerEl.querySelectorAll("#" + commandId);
    Array.from(olds).forEach(el => {
      el.remove();
    });
    
    const span = leaf.view.headerEl.createSpan({
            cls:"clickable-icon my_commanders",
            attr:{
              id: commandId,
              title:"My Command Icon",
              style:"margin-left: 8px; color: red"
            }
          });
    setIcon(span, "lucide-heart-handshake"); // Copy from icon list
    span.addEventListener("click", () => {
      // this.alert("hello!!"); // O.K.
      
      // run another code of RunJS
      // this.runCodeByName("Open with/VSCode"); // O.K.
      
      // run another codemmand of Obsidian
      // Replace id ""app:open-help"" with something else
      // To see the list of commands:
      //        Developer tools(Ctrl + Shift + I) - console
      //        input "app.commands.commands"
      this.app.commands.executeCommandById("app:open-help"); // O.K.
    });
    
    // change the insertion position
    leaf.view.forwardButtonEl.parentElement.appendChild(span);
  }
);
```

```js RunJS="{n:'RunJS/Examples/Obsidian/Open icon modal',t:'s'}"
// const runJS = app.plugins.plugins["runjs"]; // Avoid using global app instance (for debugging purposes)
const runJS = this;

// runJS.openIconModal(); // only to see

// Save result to clipboard
runJS.openIconModal(icon => {
	window.navigator.clipboard.writeText(icon);
	new Notice("Copied: " + icon);
});
```
