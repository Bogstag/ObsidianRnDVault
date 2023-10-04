---
date_created: 2023-10-02 19:40:55
date_modified: 2023-10-02 19:55:45
---
# Multi column

>Docs: [Multi Column | Modular CSS Layout (efemkay.github.io)](https://efemkay.github.io/obsidian-modular-css-layout/multi-column/)
>CSS snippet file: [MCL Multi Column.css](https://github.com/efemkay/obsidian-modular-css-layout/blob/main/MCL%20Multi%20Column.css)

## Overview

![](https://raw.githubusercontent.com/efemkay/obsidian-modular-css-layout/main/docs/assets/hero-mc-callout.png)

### How to use / basic syntax

Here’s an example markdown

```markdown
> [!multi-column]
>
>> [!note]+ Work
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ Personal
>> your notes or lists here. using markdown formatting
>
>> [!summary]+ Charity
>> your notes or lists here. using markdown formatting
```

### Fixed width option for `[!multi-column]`

- `[!multi-column|center-fixed]` - for align to the center
- `[!multi-column|left-fixed]` - for align to the left
- `[!multi-column|right-fixed]` - for align to the right

Here’s an example markdown

```
> [!multi-column|center-fixed]
>
>> [!blank-container]
>> ![[icon 1.jpg]]
>
>> [!blank-container]
>> ![[icon 2.jpg]]
>
>> [!blank-container]
>> ![[icon 3.jpg]]
```

### No wrap option for `[!multi-column]`

To create no wrap multi column, use the following syntax i.e. `[!multi-column|no-wrap]`.

Here’s an example markdown

```
> [!multi-column|no-wrap]
>
>> [!note]+ Work
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ Personal
>> your notes or lists here. using markdown formatting
>
>> [!summary]+ Charity
>> your notes or lists here. using markdown formatting
```

Width Control (different width for sub-callout) for now is not valid for No-Wrap Multi Column. Columns will be mostly follow the minimum width.

### Width control

do NOT apply to `[!multi-column]` callout itself.

- `min-0` - to override and disable min width set in Style Settings
- `wide-2` - give callout twice the size
- `wide-3` - three times the size
- `wide-4` - four times the size
- `wide-5` - five times the size

Here’s an example markdown

```
> [!multi-column]
>
>> [!note|wide-3]+ Work
>> your notes or lists here. using markdown formatting
>
>> [!warning|wide-2]+ Personal
>> your notes or lists here. using markdown formatting
>
>> [!summary|min-0]+ Charity
>> your notes or lists here. using markdown formatting
```

## Examples

### [](https://efemkay.github.io/obsidian-modular-css-layout/multi-column/02-multi-column-callout/#standard-multi-column-callout)Standard multi-column callout

>![](https://github.com/efemkay/obsidian-modular-css-layout/blob/main/docs/assets/mc-callout-standard.png?raw=true)
>
>```
>>[!multi-column]
>>
>>>[!note]+ Use Case
>>>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
>>>##### User Case Background
>>>Vitae nunc sed velit dignissim sodales. In cursus turpis massa tincidunt dui ut ornare lectus.
>>
>>>[!warning]+ Resources
>>>#### Requirement
>>>- Lorem ipsum dolor sit amet
>>>- Vitae nunc sed velit dignissim sodales.
>>>- In cursus turpis massa tincidunt dui ut ornare lectus.
>>
>>>[!todo]+
>>>- [x] Define Use Case
>>>- [ ] Craft User Story
>>>- [ ] Develop draft sketches
>```

---

---

### [](https://efemkay.github.io/obsidian-modular-css-layout/multi-column/02-multi-column-callout/#icon-links-dashboard-using-fixed-width-option)ICON Links dashboard using fixed width option

>![example of list column](https://raw.githubusercontent.com/efemkay/obsidian-modular-css-layout/main/docs/assets/mc-callout-fixed-width.png)
>
>```
>>[!multi-column|center-fixed-small]
>>
>>>[!blank|center]
>>>[![lightbulb icon|80](https://img.icons8.com/ios/250/FFFFFF/light-on.png) <br/>Interests](target%20note.md)
>>>
>>>[![macbook icon|80](https://img.icons8.com/ios/250/FFFFFF/macbook.png) <br/>Technology](target%20note.md)
>>
>>>[!blank|center]
>>>[![brain icon|80](https://img.icons8.com/ios/250/FFFFFF/brain.png) <br/>Life & Wisdom](target%20note.md)
>>>
>>>[![briefcase icon|80](https://img.icons8.com/ios/250/FFFFFF/business.png) <br/>Work](target%20note.md)
>>
>>>[!blank|center]
>>>[![running icon|80](https://img.icons8.com/ios/250/FFFFFF/sports-mode.png) <br/>Health](target%20note.md)
>>>
>>>[![home icon|80](https://img.icons8.com/ios/250/FFFFFF/house-with-a-garden.png) <br/>Family](target%20note.md)
>
>```

---

### [](https://efemkay.github.io/obsidian-modular-css-layout/multi-column/02-multi-column-callout/#example-screenshot---multi-column-callout-with-width-control)EXAMPLE Screenshot - multi column callout with width control

![](https://raw.githubusercontent.com/efemkay/obsidian-modular-css-layout/main/docs/assets/mc-callout-width-control.png)
