---
date_created: 2023-10-15 05:23:36
date_modified: 2023-10-15 05:23:49
---
# Changes in Css Snippets

## [ui] Custom Separators.css
```css
.nav-folder-children > [class*=nav-]:has([data-path="Inbox"])::after,
.nav-folder-children > [class*=nav-]:has([data-path="Personal"])::after,
.nav-folder-children > [class*=nav-]:has([data-path="Attachments"])::after,
.nav-folder-children > [class*=nav-]:has([data-path="Shared Tech"])::after
{
    content:'';
    display:block;
    height:1px;
    width:calc(100% + 32px);
    background:var(--tab-outline-color);
    margin:var(--replete-custom-separators-vertical-padding) 0 var(--replete-custom-separators-vertical-padding) var(--replete-custom-separators-left-margin);
}
```