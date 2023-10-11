---
date_created: 2023-07-11 00:00:00
date_modified: 2023-10-03 11:21:43
---
§
>[!note] Note
>This this page is for viewing markdown formatting and is good to have for testing things like Linters. Also its hard to remember everything and this is a good reference.

```dataviewjs
dv.view("toc", {"level": 2, "heading": true})
```

# Header 1

Above TOC is starting at level 2, what is why this Header 1 is not listed.

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

---

## Paragraph Text

Paragraph text

**Paragraph bold text**

_Paragraph italic text_

---

## Lists

**Bulleted List**

- List item 1
- List item 2
	- List item 2.1
	- List item 2.2
- List item 3

**Numbered List**

1. List item a
1. List item b
	1. List item b1
	1. List item b2
1. List item c

**Task List**

- [x] Task 1 ✅ 2023-07-14
- [x] Task 2 ✅ 2023-07-23
	- [x] Nested task 2.1 ✅ 2023-07-23
	- [x] Nested task 2.2 ✅ 2023-07-14
- [x] Task 3 ✅ 2023-07-23

---

## Tags

#journal #notes

---

## Links

Internal link: [[Home/Home]]
External link: [google.com](https://www.google.com/)

---

## Tables

| First name | Last name | Email                      |
| ---------- | --------- | -------------------------- |
| John       | Doe       | john.doe@example.com       |
| Muffin     | Poppies   | muffin.poppies@example.com |
| Jane       | Doe       | jane.doe@example.com       |

---

## Images

TODO:: Disappears in reading view
![[example-image-02.png|200]]

>[!blank-container|center] Relationship of Data, Information and Intelligence
>![[example-image-01.png|232]]
>_Example of [simple linear regression](https://en.wikipedia.org/wiki/Simple_linear_regression "Simple linear regression"), which has one independent variable_

### Img HTML Tag

Do not look good in reading view
TODO:: Make HTML img tag look god in reading view
<img src="https://icon.horse/icon/icon-sets.iconify.design" height="50" width="50" title="icon-sets.iconify.design favicon">

### Svg Viewbox Wrapper

<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><image href="https://icon.horse/icon/icon-sets.iconify.design" height="50" width="50" /></svg>

---

## Code

**Inline Code**
The variable `myvar` is set to the value of `100`.

**Code Block**

```python
import numpy as np
def calc(a):
	return np.sqrt(a)*3

test = calc(12)
```

_This is my code_

## Math and Formulas

$$g=g_0 \frac{R^2}{\left( R + z \right)^2} = \frac{g_0}{\left(1 + z/R \right)^2} $$

Where,
$g$ = Relative gravity at specified distance.
$g_0$ = [[Surface Gravity |Surface gravity of object]].
$R$ = Radius of the object. (typically equatorial radius of the body).
$z$ = Distance above the object's surface.

## Callouts

>[!note] Note
>This is a note callout...

>[!help]- Help
>This is a expandable help callout, if you change the - to + then is expanded by default.

## Embed

### Image

- Embedd and resize a external image
	- ![Obsidian help image|200](https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/Attachments/obsidian-lockup-help.svg)
- Linked external image
	- [![Obsidian help image|200x50](https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/Attachments/obsidian-lockup-help.svg)](https://help.obsidian.md/Linking+notes+and+files/Embedding+files)

## Inline Images

>[!blank-container|right-medium] Relationship of Data, Information and Intelligence
>![[example-image-01.png|right-medium | 464]]
>_Example of [simple linear regression](https://en.wikipedia.org/wiki/Simple_linear_regression "Simple linear regression"), which has one independent variable_

The **general linear model** or **general multivariate regression model** is a compact way of simultaneously writing several [multiple linear regression](https://en.wikipedia.org/wiki/Multiple_linear_regression "Multiple linear regression") models. In that sense it is not a separate statistical [linear model](https://en.wikipedia.org/wiki/Linear_model "Linear model"). The various multiple linear regression models may be compactly written as $Y=XB + U$

The general linear model incorporates a number of different statistical models: ANOVA, ANCOVA, MANOVA, MANCOVA, ordinary linear regression, _t_-test and _F_-test. The general linear model is a generalization of multiple linear regression to the case of more than one dependent variable. If **Y**, **B**, and **U** were column vectors, the matrix equation above would represent multiple linear regression.

Risus in hendrerit gravida rutrum. Tempor orci eu lobortis elementum. Tellus integer feugiat scelerisque varius morbi enim nunc. Tellus orci ac auctor augue mauris augue neque. A erat nam at lectus urna duis convallis convallis. At erat pellentesque adipiscing commodo elit at imperdiet dui. Elementum curabitur vitae nunc sed velit dignissim sodales ut eu. Amet porttitor eget dolor morbi non arcu risus quis. Mauris pellentesque pulvinar pellentesque habitant morbi. Ante in nibh mauris cursus mattis molestie a iaculis. Ullamcorper a lacus vestibulum sed arcu non. Est ullamcorper eget nulla facilisi etiam dignissim diam. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Ultrices dui sapien eget mi proin sed libero enim.

>[!blank-container|left-medium] Relationship of Data, Information and Intelligence
>![[example-image-01.png|left-medium | 464]]
>_Example of [simple linear regression](https://en.wikipedia.org/wiki/Simple_linear_regression "Simple linear regression"), which has one independent variable_

Purus in massa tempor nec feugiat. Placerat orci nulla pellentesque dignissim enim sit. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Lobortis feugiat vivamus at augue eget arcu dictum varius. Mauris vitae ultricies leo integer malesuada nunc. Elit pellentesque habitant morbi tristique. Pharetra vel turpis nunc eget lorem. Eros donec ac odio tempor orci. Lectus urna duis convallis convallis tellus. Eget duis at tellus at. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Tortor aliquam nulla facilisi cras.
