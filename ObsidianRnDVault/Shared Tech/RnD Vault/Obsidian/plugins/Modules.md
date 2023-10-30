---
aliases: 
date_created: 2023-10-28 02:51:05
date_modified: 2023-10-28 02:51:05
id: modules
name: Modules
fileclass: plugin
description: Load JavaScript and related languages like TypeScript modules from the vault and the Internet.
dependsOnSoftware:
  - "[[Obsidian]]"
version: 2.4.0
isDesktopOnly: false
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
---

# Modules

Load JavaScript and related languages like TypeScript modules from the vault and the Internet.

>[!bug]- Repo
>
>```gate  
>https://github.com/polyipseity/obsidian-modules
>height:700
>profile:obsidian
>```

## Access to obsidian API

Turn on "Expose internal modules" in plugin settings and use the following code. For future references, require("obsidian") will return an object containing everything in obsidian.d.ts. You just need to access them by name, like require("obsidian").Modal for Modal.
```js
const { Modal } = await require.import("obsidian");
export class MyModal extends Modal {
  // custom modal code
}

//Then you can use it:
const { MyModal } = await require.import("path/to/script.js");
new MyModal(app).open();
```



