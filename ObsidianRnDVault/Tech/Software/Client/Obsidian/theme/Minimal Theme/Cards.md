---
cssclasses:
  - list-cards
  - row-alt
date_created: 2023-10-03 09:12:41
date_modified: 2023-10-03 09:21:54
tags:
  - Obsidian
  - minimalTheme
  - cssclasses
---
# Cards

```dataviewjs
let pages = dv.pages('"System/templates"');

// Create a new array to store the sorted groups
let sortedGroups = [];

// Set the initial header level
let headerLevel = 1;

// Iterate through the groups, and push the "Templates" group first
for (let group of pages.groupBy(b => b.file.folder.replace(/^Templates\//, ""))) {
    if (group.key === 'Templates') {
        sortedGroups.unshift(group);
    } else {
        sortedGroups.push(group);
    }
}

for (let group of sortedGroups) {
    // Split the group key by '/' to check the number of subfolders
    let subfolders = group.key.split('/');
    // Increase the header level for each subfolder
    headerLevel += subfolders.length - 1;
    dv.header(headerLevel, group.key);
    dv.list(group.rows.file.link); 
    // Reset the header level for the next group
    headerLevel = 1;
}
```

## Helper classes

To use Cards, add the `cards` or `list-cards` [helper class](https://minimal.guide/features/helper-classes) on a note.

|Class|Description|
|:--|:--|
|`cards`|Set all Dataview tables to card layout|
|`list-cards`|Set all bullet lists to card layout|
|`table-100`|Cards block fills 100% of the pane width|
|`table-max`|Cards block fills the max line width|
|`table-wide`|Cards block fills the wide line width|
|`cards-align-bottom`|Align the last element of a card to the bottom|
|`cards-cover`|Images are resized to fill the defined space|
|`cards-16-9`|Fit images in cards to 16:9 ratio|
|`cards-1-1`|Fit images in cards to 1:1 ratio (square)|
|`cards-2-1`|Fit images in cards to 2:1 ratio|
|`cards-2-3`|Fit images in cards to 2:3 ratio|
|`cards-cols-1` to `8`|Force a specific number of columns (from 1 to 8)|
