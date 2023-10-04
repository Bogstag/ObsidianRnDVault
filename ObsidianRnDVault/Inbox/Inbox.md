---
date_created: 2023-07-07 00:00:00
date_modified: 2023-10-04 09:01:32
dateformat: "yyyy-MM-dd"
description: Process incoming data and information.
document_type: inbox
locale: en
tags:
  - inbox
---

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv);
```

# Inbox

```dataviewjs
var format = dv.current().dateformat || 'yyyy-MM-dd';
var locale = dv.current().locale || 'en';
dv.table(
    ['Note', 'Created', 'Untouched'],
    dv.pages()
        .where(p => p.file.name != dv.current().file.name
            && p.file.folder.includes(dv.current().file.folder))
        .sort(p => p.file.mtime, 'desc')
        .map(p => [
            p.file.link,
            p.file.ctime.setLocale(locale).toFormat(format),
            p.file.mtime.toRelative({locale:locale,unit:'days'})])
)
```
