# templates

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