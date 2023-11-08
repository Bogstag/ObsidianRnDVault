---
date_created: 2023-11-05 14:08:20
date_modified: 2023-11-07 21:34:07
---
# JavaScript with Obsidian

Keeping forgetting this like this so i need to write it down.

## Obsidian API

### getAbstractFileByPath

[In Obsidian API](https://github.com/obsidianmd/obsidian-api/blob/791214a68d0dc322b88e5abce617bdf603cc2a2d/obsidian.d.ts#L4006)

```js
/**
     * Get a file or folder inside the vault. If you need a file, you should test the returned object with `instanceof TFile`. Otherwise, if you need a folder, you should test it with `instanceof TFolder`.
     * @param path - vault absolute path to the folder or file, with extension, case sensitive.
     * @returns the abstract file, if it's found.
     * @public
     */
    getAbstractFileByPath(path: string): TAbstractFile | null;
```
