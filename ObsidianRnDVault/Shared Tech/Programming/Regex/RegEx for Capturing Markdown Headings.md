---
date_created: 2023-10-14 00:20:13
date_modified: 2023-10-14 01:34:27
summary: A regular expression (RegExp) for capturing Markdown headings and their content.
tags:
  - Programming
  - Programming/RegEx
  - Programming/JavaScript
  - Markdown
  - Text Parsing
title: RegExp for Capturing Markdown Headings
---
# Regexp for Better Toc

Trying to match the test data at the bottom of post, its from the TOC, it was working fine until i did a note with links beside the headers, like this:

```text
## Header [](www.example.com)

The Toc responded with links like this:

[[Tech/Software/Client/Obsidian/plugins/Jira Issue.md#Frontmatter[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#frontmatter "Direct link to heading")|Frontmatter[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#frontmatter "Direct link to heading")]]
```

The original Regexp was this:

```regexp
/^(#+) (.+)$/
```

The first try was a bust, but i keep it here because of good explainations and good reference.

## First Try

```regex
^(#+)\s+([^\[]+)
```

Here's how it works:

- `^` matches the start of the line.
- `(#+)` captures one or more `#` symbols in the first capture group.
- `\s+` matches one or more whitespace characters (like spaces or tabs).
- `([^\[]+)` captures one or more characters that are not `[` in the second capture group.

Here's an example using JavaScript to demonstrate the regular expression:

```javascript
const text = `
# Jira Issue
## Issue
## Basi4usage[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#basic-usage "Direct link to heading")
## [Advanced usage​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#advanced-usage "Direct link to heading")
`;

const regex = /^(#+)\s+([^\[]+)/gm;
let match;

while ((match = regex.exec(text)) !== null) {
    console.log(`Group 1: ${match[1]}, Group 2: ${match[2].trim()}`);
}
```

This will output:

```plaintext
Group 1: #, Group 2: Jira Issue
Group 1: ##, Group 2: Issue
Group 1: ##, Group 2: Basi4usage
```

The `gm` flags at the end of the regular expression mean "global" and "multiline," which allows the expression to match across multiple lines.

## Final Try

The first try captured all testdata but the "Advance usage", these two it totaly missed. To handle the case where the title is in square brackets, you can modify the regular expression like this:

```regex
^(#+)\s+([^(\[]+|\[[^\]]+\])
```

Here's how it works:

- `^` matches the start of the line.
- `(#+)` captures one or more `#` symbols in the first capture group.
- `\s+` matches one or more whitespace characters (like spaces or tabs).
- `([^(\[]+|\[[^\]]+\])` captures either one or more characters that are not `[` or `(`, or captures the content between `[` and `]`.

Here's a JavaScript example:

```javascript
const text = `
# Jira Issue
## Issue
## Basi4usage[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#basic-usage "Direct link to heading")
## [Advanced usage​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#advanced-usage "Direct link to heading")
## [Advanced Usage​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-count#advanced-usage "Direct link to heading")
`;

const regex = /^(#+)\s+([^(\[]+|\[[^\]]+\])/gm;
let match;

while ((match = regex.exec(text)) !== null) {
    console.log(`Group 1: ${match[1]}, Group 2: ${match[2].trim()}`);
}
```

This should produce:

```plaintext
Group 1: #, Group 2: Jira Issue
Group 1: ##, Group 2: Issue
Group 1: ##, Group 2: Basi4usage
Group 1: ##, Group 2: [Advanced usage​]
Group 1: ##, Group 2: [Advanced Usage​]
```

This should capture the title even if it's inside square brackets.

DONE!

It is not flawless the "Advance usage" is till a problem and links to the dont work and looks like this:

```html
<a data-tooltip-position="top" aria-label="Tech/Software/Client/Obsidian/plugins/Jira Issue.md > [Advanced Usage​]" data-href="Tech/Software/Client/Obsidian/plugins/Jira Issue.md#[Advanced Usage​]" href="Tech/Software/Client/Obsidian/plugins/Jira Issue.md#[Advanced Usage​]" class="internal-link" target="_blank" rel="noopener">[Advanced Usage​</a>
```

## The Test Data

```text
# Jira Issue

## Issue
## Basi4usage[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#basic-usage "Direct link to heading")
## [Advanced usage​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#advanced-usage "Direct link to heading")

## Standard& fields[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#standard-fields "Direct link to heading")
## Custom fields[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#custom-fields "Direct link to heading")
## Link to notes[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#link-to-notes "Direct link to heading")
### Frontmatter[​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-search#frontmatter "Direct link to heading")
## Search
### Config

### Jira Search
#### Basic Usage
#### Advanced Usage

#### Standard Fields
#### Custom Fields
#### Link to Notes

#### Frontmatter
#### Footer
## Count
## [Advanced Usage​](https://marc0l92.github.io/obsidian-jira-issue/docs/components/jira-count#advanced-usage "Direct link to heading")
```
