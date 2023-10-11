---
aliases: 
date_created: 2023-10-06 18:56:29
date_modified: 2023-10-11 06:22:08
dependsOnSoftware:
  - "[[Tech/Software/Client/Obsidian/Obsidian]]"
description: Task management for Obsidian
fileclass: plugin
id: obsidian-tasks-plugin
isDesktopOnly: false
name: Tasks
tags:
  - 
template: "[[System/templates/fileclass/Add Obsidian plugin page|Add Obsidian plugin page]]"
version: 4.9.0
---
# Tasks

```dataviewjs
dv.view("toc", {"level": 2, "heading": true})
```

Task management for Obsidian

>[!help]- Docs
>
>```gate  
>https://publish.obsidian.md/tasks/Introduction
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
>https://github.com/obsidian-tasks-group/obsidian-tasks
>height:700
>profile:obsidian
>```

## Quick Reference Filters

[Quick Reference - Tasks User Guide - Obsidian Publish](https://publish.obsidian.md/tasks/Quick+Reference)

| [Filters](https://publish.obsidian.md/tasks/Queries/Filters) | [Sort](https://publish.obsidian.md/tasks/Queries/Sorting) | [Group](https://publish.obsidian.md/tasks/Queries/Grouping) | [Display](https://publish.obsidian.md/tasks/Queries/Layout) |
| --- | --- | --- | --- |
| `done`  <br>`not done` | `sort by status` | `group by status` |     |
| `done (before, after, on) <date>`  <br>`done (before, after, in) ...`  <br>`... YYYY-MM-DD YYYY-MM-DD`  <br>`... (last, this, next) (week, month, quarter, year)`  <br>`... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)`  <br>`has done date`  <br>`no done date`  <br>`done date is invalid` | `sort by done` | `group by done` | `hide done date` |
| `status.name (includes, does not include) <string>`  <br>`status.name (regex matches, regex does not match) /regex/i` | `sort by status.name` | `group by status.name` |     |
| `status.type (is, is not) (TODO, DONE, IN_PROGRESS, CANCELLED, NON_TASK)` | `sort by status.type` | `group by status.type` |     |
| `created (before, after, on) <date>`  <br>`created (before, after, in) ...`  <br>`... YYYY-MM-DD YYYY-MM-DD`  <br>`... (last, this, next) (week, month, quarter, year)`  <br>`... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)`  <br>`has created date`  <br>`no created date`  <br>`created date is invalid` | `sort by created` | `group by created` | `hide created date` |
| `starts (before, after, on) <date>`  <br>`starts (before, after, in) ...`  <br>`... YYYY-MM-DD YYYY-MM-DD`  <br>`... (last, this, next) (week, month, quarter, year)`  <br>`... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)`  <br>`has start date`  <br>`no start date`  <br>`start date is invalid` | `sort by start` | `group by start` | `hide start date` |
| `scheduled (before, after, on) <date>`  <br>`scheduled (before, after, in) ...`  <br>`... YYYY-MM-DD YYYY-MM-DD`  <br>`... (last, this, next) (week, month, quarter, year)`  <br>`... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)`  <br>`has scheduled date`  <br>`no scheduled date`  <br>`scheduled date is invalid` | `sort by scheduled` | `group by scheduled` | `hide scheduled date` |
| `due (before, after, on) <date>`  <br>`due (before, after, in) ...`  <br>`... YYYY-MM-DD YYYY-MM-DD`  <br>`... (last, this, next) (week, month, quarter, year)`  <br>`... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)`  <br>`has due date`  <br>`no due date`  <br>`due date is invalid` | `sort by due` | `group by due` | `hide due date` |
| `happens (before, after, on) <date>`  <br>`happens (before, after, in) ...`  <br>`... YYYY-MM-DD YYYY-MM-DD`  <br>`... (last, this, next) (week, month, quarter, year)`  <br>`... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)`  <br>`has happens date`  <br>`no happens date` | `sort by happens` | `group by happens` |     |
| `is recurring`  <br>`is not recurring` | `sort by recurring` | `group by recurring` |     |
| `recurrence (includes, does not include) <string>`  <br>`recurrence (regex matches, regex does not match) /regex/i` |     | `group by recurrence` | `hide recurrence rule` |
| `priority is (above, below, not)? (low, none, medium, high)` | `sort by priority` | `group by priority` | `hide priority` |
|     | `sort by urgency` | `group by urgency` | `show urgency` |
| `path (includes, does not include) <path>`  <br>`path (regex matches, regex does not match) /regex/i` | `sort by path` | `group by path` |     |
| `root (includes, does not include) <root>`  <br>`root (regex matches, regex does not match) /regex/i` |     | `group by root` |     |
| `folder (includes, does not include) <folder>`  <br>`folder (regex matches, regex does not match) /regex/i` |     | `group by folder` |     |
| `filename (includes, does not include) <filename>`  <br>`filename (regex matches, regex does not match) /regex/i` | `sort by filename` | `group by filename` |     |
| `heading (includes, does not include) <string>`  <br>`heading (regex matches, regex does not match) /regex/i` | `sort by heading` | `group by heading` |     |
|     |     | `group by backlink` | `hide backlink` |
| `description (includes, does not include) <string>`  <br>`description (regex matches, regex does not match) /regex/i` | `sort by description` |     |     |
| `has tags`  <br>`no tags`  <br>`tag (includes, does not include) <tag>`  <br>`tags (include, do not include) <tag>`  <br>`tag (regex matches, regex does not match) /regex/i`  <br>`tags (regex matches, regex does not match) /regex/i` | `sort by tag`  <br>`sort by tag <tag_number>` | `group by tags` |     |
| [Combining Filters](https://publish.obsidian.md/tasks/Queries/Combining+Filters) |     |     |     |
| `(filter 1) AND (filter 2)` |     |     |     |
| `(filter 1) OR (filter 2)` |     |     |     |
| `NOT (filter 1)` |     |     |     |
| `(filter 1) XOR (filter 2)` |     |     |     |
| `(filter 1) AND NOT (filter 2)` |     |     |     |
| `(filter 1) OR NOT (filter 2)` |     |     |     |
| `(filter 1) AND ((filter 2) OR (filter 3))` |     |     |     |
| **Other Filter Options** |     |     |     |
| `exclude sub-items` |     |     |     |
| `limit to <number> tasks`  <br>`limit <number>` |     |     |     |
| **Other Layout Options** |     |     |     |
| `hide edit button` |     |     |     |
| `hide task count` |     |     |     |
| `short mode` |     |     |     |
| **Other Instructions** |     |     |     |
| `explain` |     |     |     |
| `# comment` |     |     |     |

## Custom Checkboxes for Minimal Theme

[Theme - Minimal Theme](https://github.com/kepano/obsidian-minimal)

Available checkbox icons: <https://minimal.guide/Block+types/Checklists>

Test note in Tasks Demo vault: [Demo styling for Minimal Theme](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/main/resources/sample_vaults/Tasks-Demo/Styling/Theme%20-%20Minimal%20Theme.md)

### Supported Statuses

- [ ] `space` to-do
- [/] `/` incomplete
- [x] `x` done
- [-] `-` canceled
- [>] `>` forwarded
- [<] `<` scheduling
- [?] `?` question
- [!] `!` important
- [*] `*` star
- ["] `"` quote
- [l] `l` location
- [b] `b` bookmark
- [i] `i` information
- [S] `S` savings
- [I] `I` idea
- [p] `p` pros
- [c] `c` cons
- [f] `f` fire
- [k] `k` key
- [w] `w` win
- [u] `u` up
- [d] `d` down

### Status Grouped by status.type

```tasks
path includes Custom Checkboxes
group by status.type
sort by description
short mode
```
