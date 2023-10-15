---
date_created: 2023-10-08 14:17:29
date_modified: 2023-10-08 14:18:12
---
# Code snippets

## Change frontmatter after note created

```js
// Add this at the end of your template file

// Remove some template properties from the newly created note.
// The reason for the timeout is to wait until after the new note exists in your vault.
setTimeout(() => {
  // Get the path to the new file
  const newFile = tp.file.find_tfile(tp.file.path(true))
  // Process the frontmatter
  app.fileManager.processFrontMatter(newFile, (frontmatter) => {
    // and delete the properties you don't want
    delete frontmatter['Some frontmatter field']
  })
}, 300)
```
