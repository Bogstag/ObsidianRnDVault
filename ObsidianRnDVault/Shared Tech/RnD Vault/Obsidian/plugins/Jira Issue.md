---
aliases: 
date_created: 2023-10-13 13:13:28
date_modified: 2023-10-13 13:21:05
dependsOnSoftware:
  - "[[Shared Tech/RnD Vault/Obsidian/Obsidian]]"
description: This plugin allows you to track the progress of Atlassian Jira issues from your Obsidian notes.
fileclass: plugin
id: obsidian-jira-issue
isDesktopOnly: false
name: Jira Issue
template: "[[System/TemplatesNotes/Obsidian plugin page|Obsidian plugin page]]"
version: 1.54.0
---

# Jira Issue

This plugin allows you to track the progress of Atlassian Jira issues from your Obsidian notes.

>[!help]- Docs
>
>```gate  
>https://marc0l92.github.io/obsidian-jira-issue/
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
>https://github.com/marc0l92/obsidian-jira-issue
>height:700
>profile:obsidian
>```
## toc
```dataviewjs
dv.view("toc", {"level": 2, "heading": true})
```

## Issue

This fence component allows to insert a section where you can put several issues references.

![jira-issue1](https://marc0l92.github.io/obsidian-jira-issue/assets/images/jira-issue1-82537daed7f3f35126f5922f0b35fe49.png)

This markdown fence is meant to be used to store many references that may not be related but you want to keep track of them.

You can input issues one per line and they can be referenced using the key or the Jira Issue URL. You can also insert comments in this fence in order to give some context to those potentially unrelated issues.

Example:

````
```jira-issue
AAA-111
AAA-222
https://my.jira-server.com/browse/BBB-333
# This is a comment
```
````

JIRA:IKA-178

This fence component allows to insert a table that displays the results of a Jira query. The syntax to write the query is described in the official JQL Documentation.

## Basic usage[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#basic-usage "Direct link to heading")

The basic usage of this block is to put the query directly in the fence. Example:

```jira-search
resolution = Unresolved AND assignee in ("66128748") ORDER BY Rank ASC
```

The columns displayed in the table can be configured in the settings.�[See more](https://marc0l92.github.io/obsidian-jira-issue/docs/configuration/search-default-columns)

## Advanced usage[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#advanced-usage "Direct link to heading")

It is possible to describe in each jira-search fence how the search results are rendered using the following keyworkds:

| Keyword | Description                                      | Default                     | Values               |
|---------|--------------------------------------------------|-----------------------------|----------------------|
| type    | Rendering mode of the search results             | TABLE                       | TABLE or LIST        |
| query   | Query to use with Jira to retrieve the results   |                             |                      |
| limit   | Maximum number of items to display               | Use value from settings     | Integer number       |
| columns | List of columns to render (Available columns)    | Use value from settings     | Comma separated list |
| account | Explicitly select an account providing the alias | Try all account by priority | Account alias        |

Example:

````
```jira-searchtype: TABLEquery: status = 'In Progress' order by priority DESClimit: 15columns: KEY, SUMMARY, -ASSIGNEE, -REPORTER, STATUSaccount: Default```
````

## Standard fields[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#standard-fields "Direct link to heading")

The plugin is able to render as columns the following Jira standard fields:

```
KEY, SUMMARY, DESCRIPTION, TYPE, CREATED, UPDATED, REPORTER, ASSIGNEE, PRIORITY, STATUS, DUE_DATE,RESOLUTION, RESOLUTION_DATE, PROJECT, ENVIRONMENT, LABELS, FIX_VERSIONS, COMPONENTS,AGGREGATE_TIME_ESTIMATE, AGGREGATE_TIME_ORIGINAL_ESTIMATE, AGGREGATE_TIME_SPENT,TIME_ESTIMATE, TIME_ORIGINAL_ESTIMATE, TIME_SPENT, AGGREGATE_PROGRESS, PROGRESS, LAST_VIEWED,DEV_STATUS
```

- Columns names are case insensitive
- If the column starts with�`-`, the compact mode is used

Example:

````
```jira-searchquery: status = 'In Progress' order by priority DESCcolumns: key, -key, type, -type, reporter, -reporter, created, -created```
````

![Compact Columns](https://marc0l92.github.io/obsidian-jira-issue/assets/images/compactColumns-5f97f6f49b80ce66ae63fb89e321aa40.png)

## Custom fields[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#custom-fields "Direct link to heading")

Jira non standard fields (a.k.a. custom fields) can be inserted using the�`$`�symbol.

Example:

````
```jira-searchquery: status = 'In Progress' order by priority DESCcolumns: key, summary, $Epic Link, $Global Rank, $12313422, -$12313499```
````

It is possible to provide the ID number of the custom field or its name.

## Link to notes[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#link-to-notes "Direct link to heading")

The special column�`NOTES`�can be used with�`jira-search`�tables to create a column that shows all the notes that start with the issue key.

Example:

````
```jira-searchquery: status = 'In Progress' order by priority DESCcolumns: key, summary, status, notes```
````

![Notes Column](https://marc0l92.github.io/obsidian-jira-issue/assets/images/notesColumn-346b369190fa770027364a0804774c0e.png)

This column is useful to connect the issues with your notes about them. The note title must start with the issue key but it can also contains other letters after that. Examples:

```
AAA-123AAA-123 User story summaryAAA-123 Custom string
```

If no notes are found, a�`?`�button will be shown in order to allow the creation of a new note directly from this table.

### Frontmatter[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#frontmatter "Direct link to heading")

You can also access the frontmatter section of the linked notes using the�[jsonpath](https://github.com/dchester/jsonpath)�syntax after the column�`NOTES`. Example:

```
query: status = 'In Progress' order by priority DESCcolumns: key, notes, notes.title, notes.status, notes.tags, notes.tags[0], notes..book[?(@.price<30 && @.category=="fiction")]
```

## Footer[?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#footer "Direct link to heading")

At the bottom of each search table you have several information:

- Total results of the query
- Alias of the account used
- Last execution date
- Refresh results button

![searchFooter](data:image/png;base64,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)

## Search

### Config

Default columns: KEY, SUMMARY, CREATED, UPDATED, REPORTER, ASSIGNEE, -PRIORITY, STATUS

### Jira Search

This fence component allows to insert a table that displays the results of a Jira query.
The syntax to write the query is described in the official JQL Documentation.

#### Basic Usage

The basic usage of this block is to put the query directly in the fence. Example:

````
```jira-search
resolution = Unresolved AND assignee = currentUser() AND status = 'In Progress' order by priority DESC
```
````

The columns displayed in the table can be configured in the settings.

#### Advanced Usage

It is possible to describe in each jira-search fence how the search results are rendered using the following keyworkds:

| Keyword | Description | Default | Values |
| :- | :- | :- | :- |
| `type` | Rendering mode of the search results | `TABLE` | `TABLE` or `LIST` |
| `query` | Query to use with Jira to retrieve the results |  |  |
| `limit` | Maximum number of items to display | Use value from settings | Integer number |
| `columns` | List of columns to render ([Available columns](#standard-columns)) | Use value from settings | Comma separated list |
| `account` | Explicitly select an account providing the alias | Try all account by priority | Account alias |

Example:

````
```jira-search
type: TABLE
query: status = 'In Progress' order by priority DESC
limit: 15
columns: KEY, SUMMARY, -ASSIGNEE, -REPORTER, STATUS
account: Default
```
````

#### Standard Fields

The plugin is able to render as columns the following Jira standard fields:

```
KEY, SUMMARY, DESCRIPTION, TYPE, CREATED, UPDATED, REPORTER, ASSIGNEE, PRIORITY, STATUS, DUE_DATE,
RESOLUTION, RESOLUTION_DATE, PROJECT, ENVIRONMENT, LABELS, FIX_VERSIONS, COMPONENTS,
AGGREGATE_TIME_ESTIMATE, AGGREGATE_TIME_ORIGINAL_ESTIMATE, AGGREGATE_TIME_SPENT,
TIME_ESTIMATE, TIME_ORIGINAL_ESTIMATE, TIME_SPENT, AGGREGATE_PROGRESS, PROGRESS, LAST_VIEWED,
DEV_STATUS
```

- Columns names are case insensitive
- If the column starts with `-`, the compact mode is used

Example:

````
```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, -key, type, -type, reporter, -reporter, created, -created
```
````

#### Custom Fields

Jira non standard fields (a.k.a. custom fields) can be inserted using the `$` symbol.

Example:

````
```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, summary, $Epic Link, $Global Rank, $12313422, -$12313499
```
````

It is possible to provide the ID number of the custom field or its name.

#### Link to Notes

The special column `NOTES` can be used with `jira-search` tables to create a column that shows all the notes that start with the issue key.

Example:

````
```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, summary, status, notes
```
````

This column is useful to connect the issues with your notes about them. The note title must start with the issue key but it can also contains other letters after that.
Examples:

```
AAA-123
AAA-123 User story summary
AAA-123 Custom string
```

If no notes are found, a `?` button will be shown in order to allow the creation of a new note directly from this table.

#### Frontmatter

You can also access the frontmatter section of the linked notes using the [jsonpath](https://github.com/dchester/jsonpath) syntax after the column `NOTES`. Example:

```jira-search
query: status = 'In Progress' AND assignee = currentUser() order by priority DESC
columns: key, notes, notes.title, notes.status, notes.tags, notes.tags[0]
```

#### Footer

At the bottom of each search table you have several information:

- Total results of the query
- Alias of the account used
- Last execution date
- Refresh results button

## Count

This fence component allows to insert a counter of the issues found as result of a jira query.

![jira-count1](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAlCAYAAACJdC37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOwSURBVHhe7Zo9SFtRFMf/xg/QxVqKpgVBKhTE2qHW2qIuBgfp4JAsumRROioVlwwOHVyCYmddAsV2SAYpVKRoBy02dKuKEBC0glqJTdqhFvNh7305L4nJi0nwNk0u9ycXz3nv3Sw/z7lH8souGFBIi4l+KyRFCZYcJVhylGDJyUmwGsOKh3xn4iun6FA4ilDoAuHIBaJRuSxXVYQoKi1MJpO2ysvLtZWNjILD4Qv8/hORTqxOqQrW4ZIrKyuzSjZs0VzpeSgqrVwZiEajiEQilGXG+AxmXrlgRXETDocpyoyh4LIyChQlj/o3SXKUYMlRgiVHvGD/NibtK+inNb9F12XC54HN5oGP0gRBrE3b4FwPUs4eddvYs7Tc6TuM9ohEqODAhzX0j59h0GXBEq2uo20E6L5odlz/4w+ICXn3huIUfCt4tUGxhg/fzfNwu93amoIjXWTaHrEIFLwHz+tqzLgeoYWucFr6WlFHsRQwIZ87RzFIaQIuHhgd66Sccw893TcoBurNyfc4RnvEIk7wlh+e3luX5KbCK05v3f0vE5WdWonJeSzew7y+z7UXv/5iFfA4L3/Wv8UHjwMY6G6gPEFwfY6Jt6CNciNOjr24W58Qnsue6yJMcODoDB13ailLRxOC5njrXnj6A0MkKxsepx9d2r5mWFcPsOxnncFuwUwvYJ1g1ycL0yV8bmZ3ysrqMoXTNcx5n2AkqVrTYOe2Y38UFn1zLnsEIExw3e1qfDn8SVkqAXzbr8WMvYly9nxfI5Plxw7lV2Gd0Nt+E7p6z3FwrCUFJbjuxCI7T61pdllVPz/BwHgPMqnSBq2vbXDHn8m+RxTiWrS5Gh05Cis9fFiZ9cI7O0wTsQNv2I/D5sTS+0WKY5PysP4cTcxc7uYDNmTZEn8ZwfWr94gk47dJwV/5f9uiteF9MxbiLTOAZdchHttbcay3aKpiPnEPHTZqeXLMh7V5+y7AWu/w/dhnfmqPxZzkPPVePlRd69skVoG2TbS509s1r/Q5jGCCt17Whp0fGzCRJNeIS3vypKamhiJjBE7RsXNRO1v1gcjOJqVnMdkt9ocY29+ND1lDGzexQLJj7Vq/xw5YdrbmQkt7bYGHrDw5PYH3rYOqntb0GpudC4fQCi4lrlfBxUNBK1hRfCjBkmMoOM/3uhRFjHEFl7EzqlIVd7FTUVFBUWYMLfIXOrhgk0m92lGs8JfuchGsXpstMYS9NquQA3XQSo4SLDlKsOQowZKjBEuOEiw1wF/kjqfFLSrz5gAAAABJRU5ErkJggg==)

This component may be used to monitor the progress of a project or to display statistics on a dashboard note.

Example:

````
```jira-countproject = REF AND status changed to (Done, "Won't Fix", Archived, "Can't Reproduce", "PM Validated") after -14d```
````

## [Advanced Usage?](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-count#advanced-usage "Direct link to heading")

It is possible to specify additional attribute to this component

| Keyword | Description                                      | Default                     | Values        |
|---------|--------------------------------------------------|-----------------------------|---------------|
| query   | Query to use with Jira to retrieve the results   |                             | string        |
| label   | Message to write near the counter                | 'Count'                     | string        |
| account | Explicitly select an account providing the alias | Try all account by priority | Account alias |

Example:

````
```jira-countquery: status = 'In Progress' order by priority DESClabel: Issues to completeaccount: Default```
````
